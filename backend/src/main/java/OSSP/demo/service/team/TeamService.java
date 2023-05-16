package OSSP.demo.service.team;

import OSSP.demo.entity.Member;
import OSSP.demo.entity.Role;
import OSSP.demo.entity.Team;
import OSSP.demo.entity.User;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.TeamDto;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.TeamRepository;
import OSSP.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
public class TeamService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;

    public ResponseEntity getTeam(String studentId, Long teamId) {
        if (userRepository.existsByStudentId(studentId)) {
            Long userId = userRepository.findByStudentId(studentId).get().getId();
            if (memberRepository.existsByUserIdAndTeamId(userId, teamId)
                    && teamRepository.existsById(teamId)) {
                Team team = teamRepository.findById(teamId).get();
                List<Member> members = memberRepository.findByTeamId(teamId);
                List<TeamDto.TeamFellowDto> teamMemberDto = new ArrayList<>();
                for (Member member : members) {
                    teamMemberDto.add(TeamDto.TeamFellowDto.builder()
                            .studentId(member.getUser().getStudentId())
                            .name(member.getUser().getName())
                            .role(member.getRole())
                            .build());
                }
                TeamDto teamResponseDto = TeamDto.builder().teamName(team.getTeamName()).teamFellow(teamMemberDto).build();
                return ResponseEntity.ok().body(teamResponseDto);
            }
            ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_team", "팀 정보가 존재하지 않습니다.")).build();
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_team", "사용자 정보가 존재하지 않습니다.")).build();
        return ResponseEntity.badRequest().body(responseErrorDto);
    }

    public ResponseEntity getTeams(String studentId) {
        if (userRepository.existsByStudentId(studentId)) {
            Long userId = userRepository.findByStudentId(studentId).get().getId();
            if (memberRepository.existsByUserId(userId)) {
                List<Member> userMembers = memberRepository.findByUserId(userId);
                Map<String, String> teams = new HashMap();
                for (Member userMember : userMembers) {
                    teams.put(userMember.getTeam().getId().toString(), userMember.getTeam().getTeamName());
                }
                return ResponseEntity.ok().body(teams);
            }
            ResponseDto responseTeamIdsNullDto = ResponseDto.<String>builder().build();
            return ResponseEntity.badRequest().body(responseTeamIdsNullDto);
        }
        ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_team_ids", "사용자 정보가 존재하지 않습니다.")).build();
        return ResponseEntity.badRequest().body(responseErrorDto);
    }

    @Transactional
    public ResponseEntity createTeam(String studentId, String teamName) {
        try {
            if (!userRepository.existsByStudentId(studentId)) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("create_team", "존재하지 않는 학번입니다.")).build());
            }
            Long userId = userRepository.findByStudentId(studentId).get().getId();
            Team team = new Team(teamName);
            teamRepository.save(team);
            Member member = new Member(userRepository.findById(userId).get(), team, Role.Leader);
            memberRepository.save(member);
            ResponseDto responseTeamDto = ResponseDto.<Team>builder().data(Collections.singletonList(team)).build();
            return ResponseEntity.ok().body(responseTeamDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("create_team", "팀 생성에 실패했습니다.")).build());
        }
    }

    @Transactional
    public ResponseEntity deleteTeam(String studentId, Long teamId) {
        try {
            Long userId = userRepository.findByStudentId(studentId).get().getId();
            Optional<Team> optionalTeam = teamRepository.findById(teamId);
            if (optionalTeam.isPresent()) {
                Team team = optionalTeam.get();
                List<Member> members = memberRepository.findByTeamId(teamId);
                if (members.size() > 1) {
                    Map<String, String> error = new HashMap<>();
                    error.put("delete_team", "팀에 가입한 멤버가 2명 이상입니다.");
                    ResponseDto<Team> responseErrorDto = ResponseDto.<Team>builder().error(error).build();
                    return ResponseEntity.badRequest().body(responseErrorDto);
                }
                if (members.isEmpty()) {
                    Map<String, String> error = new HashMap<>();
                    error.put("delete_team", "해당 팀에 가입한 멤버가 없습니다.");
                    ResponseDto<Team> responseErrorDto = ResponseDto.<Team>builder().error(error).build();
                    return ResponseEntity.badRequest().body(responseErrorDto);
                }
                List<User> users = new ArrayList<>();
                for (Member member : members) {
                    users.add(member.getUser());
                }
                if (users.contains(userRepository.findById(userId).get())) {
                    for (Member member : members) {
                        memberRepository.delete(member);
                    }
                    teamRepository.delete(team);
                    return ResponseEntity.ok().body(Collections.singletonMap("delete_team_result", "팀 삭제에 성공했습니다."));
                } else {
                    Map<String, String> error = new HashMap<>();
                    error.put("delete_team", "해당 팀에 가입한 멤버가 아닙니다.");
                    ResponseDto<Team> responseErrorDto = ResponseDto.<Team>builder().error(error).build();
                    return ResponseEntity.badRequest().body(responseErrorDto);
                }
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("delete_team", "해당 팀이 존재하지 않습니다.");
                ResponseDto<Team> responseErrorDto = ResponseDto.<Team>builder().error(error).build();
                return ResponseEntity.badRequest().body(responseErrorDto);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return ResponseEntity.badRequest().body(ResponseDto.<Team>builder().error(Collections.singletonMap("delete_team", "팀 삭제에 실패했습니다.")).build());
    }
}