package OSSP.demo.service.team;

import OSSP.demo.entity.Invitation;
import OSSP.demo.entity.Member;
import OSSP.demo.entity.Role;
import OSSP.demo.model.InvitationDto;
import OSSP.demo.repository.InvitationRepository;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.TeamRepository;
import OSSP.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class InvitationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    InvitationRepository invitationRepository;
    @Autowired
    MemberRepository memberRepository;

    public ResponseEntity sendInvitations(String studentId, InvitationDto.InvitationRequestDto invitationDto) {
        if (!userRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("send_invitation", "사용자 정보가 존재하지 않습니다."));
        }
        Long leaderId = userRepository.findByStudentId(studentId).get().getId();
        if (!memberRepository.existsByUserIdAndTeamId(leaderId, invitationDto.getTeamId())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("send_invitation", "팀장이 아닙니다."));
        }
        if (invitationDto.getFellowIds().isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("send_invitation", "초대할 사용자가 존재하지 않습니다."));
        }
        List<InvitationDto> invitationDtoList = new ArrayList<>();
        for (Long fellowId : invitationDto.getFellowIds()) {
            if (memberRepository.existsByUserIdAndTeamId(fellowId, invitationDto.getTeamId())) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("send_invitation", "이미 팀에 가입된 사용자가 포함되어 있습니다."));
            }
            if (invitationRepository.existsByLeaderIdAndFellowIdAndTeamId(leaderId, fellowId, invitationDto.getTeamId())) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("send_invitation", "이미 초대된 사용자가 포함되어 있습니다."));
            }
            Invitation invitation = Invitation.builder()
                    .leader(userRepository.findById(leaderId).get())
                    .fellow(userRepository.findById(fellowId).get())
                    .team(teamRepository.findById(invitationDto.getTeamId()).get())
                    .build();
            invitationRepository.save(invitation);
            InvitationDto invitationResponseDto = InvitationDto.builder()
                    .id(invitation.getId())
                    .leaderId(invitation.getLeader().getId())
                    .fellowId(invitation.getFellow().getId())
                    .teamId(invitation.getTeam().getId())
                    .build();
            invitationDtoList.add(invitationResponseDto);
        }
        return ResponseEntity.ok().body(Collections.singletonMap("send_invitations", invitationDtoList));
    }

    public ResponseEntity getInvitations(String studentId) {
        if (!userRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("get_invitations", "사용자 정보가 존재하지 않습니다."));
        }
        Long fellowId = userRepository.findByStudentId(studentId).get().getId();
        if (!invitationRepository.existsByFellowId(fellowId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("get_invitations", "초대된 팀이 존재하지 않습니다."));
        }
        List<Invitation> invitations = invitationRepository.findAllByFellowId(fellowId);
        List<InvitationDto> invitationDtoList = new ArrayList<>();
        for (Invitation invitation : invitations) {
            InvitationDto invitationResponseDto = InvitationDto.builder()
                    .id(invitation.getId())
                    .leaderId(invitation.getLeader().getId())
                    .fellowId(invitation.getFellow().getId())
                    .teamId(invitation.getTeam().getId())
                    .build();
            invitationDtoList.add(invitationResponseDto);
        }
        return ResponseEntity.ok().body(Collections.singletonMap("get_invitations", invitationDtoList));
    }

    public ResponseEntity acceptInvitation(String studentId, Long invitationId) {
        if (!userRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("accept_invitation", "사용자 정보가 존재하지 않습니다."));
        }
        Long memberId = userRepository.findByStudentId(studentId).get().getId();
        if (!invitationRepository.existsById(invitationId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("accept_invitation", "초대 정보가 존재하지 않습니다."));
        }
        Invitation invitation = invitationRepository.findById(invitationId).get();
        if (invitation.getFellow().getId() != memberId) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("accept_invitation", "초대된 사용자가 아닙니다."));
        }
        if (memberRepository.existsByUserIdAndTeamId(memberId, invitation.getTeam().getId())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("accept_invitation", "이미 팀에 가입된 사용자입니다."));
        }
        invitation.setIsAccepted(true);
        Member member = new Member(invitation.getFellow(), invitation.getTeam(), Role.Member);
        memberRepository.save(member);
        InvitationDto invitationResponseDto = InvitationDto.builder()
                .id(invitation.getId())
                .leaderId(invitation.getLeader().getId())
                .fellowId(invitation.getFellow().getId())
                .teamId(invitation.getTeam().getId())
                .isAccepted(invitation.getIsAccepted())
                .build();
        return ResponseEntity.ok().body(Collections.singletonMap("accept_invitation", invitationResponseDto));
    }


    public ResponseEntity rejectInvitation(String studentId, Long invitationId) {
        if (!userRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("reject_invitation", "사용자 정보가 존재하지 않습니다."));
        }
        Long memberId = userRepository.findByStudentId(studentId).get().getId();
        if (!invitationRepository.existsById(invitationId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("reject_invitation", "초대 정보가 존재하지 않습니다."));
        }
        Invitation invitation = invitationRepository.findById(invitationId).get();
        if (invitation.getFellow().getId() != memberId) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("reject_invitation", "초대된 사용자가 아닙니다."));
        }
        if (invitation.getIsAccepted()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("reject_invitation", "이미 수락된 초대입니다."));
        }
        invitation.setIsAccepted(false);
        InvitationDto invitationResponseDto = InvitationDto.builder()
                .id(invitation.getId())
                .leaderId(invitation.getLeader().getId())
                .fellowId(invitation.getFellow().getId())
                .teamId(invitation.getTeam().getId())
                .isAccepted(invitation.getIsAccepted())
                .build();
        return ResponseEntity.ok().body(Collections.singletonMap("reject_invitation", invitationResponseDto));
    }

    public ResponseEntity deleteInvitation(String studentId, Long invitationId) {
        if (!userRepository.existsByStudentId(studentId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("delete_invitation", "사용자 정보가 존재하지 않습니다."));
        }
        Long leaderId = userRepository.findByStudentId(studentId).get().getId();
        if (!invitationRepository.existsById(invitationId)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("delete_invitation", "초대 정보가 존재하지 않습니다."));
        }
        Invitation invitation = invitationRepository.findById(invitationId).get();
        if (invitation.getLeader().getId() != leaderId) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("delete_invitation", "초대한 사용자가 아닙니다."));
        }
        invitationRepository.deleteById(invitationId);
        return ResponseEntity.ok().body(Collections.singletonMap("delete_invitation", "초대가 삭제되었습니다."));
    }
}
