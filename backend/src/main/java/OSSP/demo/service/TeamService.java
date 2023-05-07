package OSSP.demo.service;

import OSSP.demo.entity.Member;
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

    public ResponseEntity getTeams(String username) {
        Long userId = userRepository.findByStudentId(username).get().getId();
        if (memberRepository.existsByUserId(userId)) {
            List<Member> userMembers = memberRepository.findByUserId(userId);
            List<TeamDto> teamDtoList = new ArrayList<>();
            for (Member userMember : userMembers) {
                Team team = userMember.getTeam();
                List<Member> teamMember = team.getMembers();
                List<TeamDto.TeamMemberDto> teamMembers = new ArrayList<>();
                for (Member m : teamMember) {
                    teamMembers.add(TeamDto.TeamMemberDto.builder().studentId(m.getUser().getStudentId()).name(m.getUser().getName()).build());
                }
                teamDtoList.add(TeamDto.builder().teamName(team.getTeamName()).teamMembers(teamMembers).build());
            }
            ResponseDto responseTeamDto = ResponseDto.<TeamDto>builder().data(teamDtoList).build();
            return ResponseEntity.ok().body(responseTeamDto);
        }
        Map<String, String> error = new HashMap<>();
        error.put("get_teams", "팀이 존재하지 않습니다.");
        ResponseDto responseErrorDto = ResponseDto.builder().error(error).build();
        return ResponseEntity.badRequest().body(responseErrorDto);
    }

    @Transactional
    public ResponseEntity createTeam(String username, String teamName, List<String> members) {
        try {
            if (!userRepository.existsByStudentId(username)) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("create_team", "존재하지 않는 학번입니다.")).build());
            }
            if (!userRepository.existsByStudentIdIn(members)) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("create_team", "존재하지 않는 학번이 있습니다.")).build());
            }
            Long userId = userRepository.findByStudentId(username).get().getId();
            Team team = new Team(teamName);
            teamRepository.save(team);
            Member member = new Member(userRepository.findById(userId).get(), team);
            memberRepository.save(member);
            for (String memberName : members) {
                Long memberId = userRepository.findByStudentId(memberName).get().getId();
                memberRepository.save(new Member(userRepository.findById(memberId).get(), team));
            }
            ResponseDto responseTeamDto = ResponseDto.<Team>builder().data(Collections.singletonList(team)).build();
            return ResponseEntity.ok().body(responseTeamDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("create_team", "팀 생성에 실패했습니다.")).build());
        }
    }

    @Transactional
    public ResponseEntity deleteTeam(String username, Long teamId) {
        try {
            Long userId = userRepository.findByStudentId(username).get().getId();
            Optional<Team> optionalTeam = teamRepository.findById(teamId);
            if (optionalTeam.isPresent()) {
                Team team = optionalTeam.get();
                List<Member> members = memberRepository.findByTeamId(teamId);
                if (members.size()>1) {
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