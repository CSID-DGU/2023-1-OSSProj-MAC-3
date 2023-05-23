package OSSP.demo.controller;

import OSSP.demo.entity.Invitation;
import OSSP.demo.model.InvitationDto;
import OSSP.demo.model.TeamDto;
import OSSP.demo.service.team.InvitationService;
import OSSP.demo.service.team.TeamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("team")
public class TeamController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity getTeams(@AuthenticationPrincipal String studentId) {
        return teamService.getTeams(studentId);
    }

    @GetMapping("/{teamId}/user")
    public ResponseEntity getUserListFilteredByTeam(@AuthenticationPrincipal String studentId, @PathVariable long teamId) {
        return teamService.getUserListFilteredByTeam(studentId, teamId);
    }

    @GetMapping("/{teamId}")
    public ResponseEntity getTeam(@AuthenticationPrincipal String studentId, @PathVariable Long teamId) {
        return teamService.getTeam(studentId, teamId);
    }

    @PostMapping
    public ResponseEntity createTeam(@AuthenticationPrincipal String studentId, @RequestBody TeamDto.TeamRequestDto teamDto) {
        return teamService.createTeam(studentId, teamDto.getTeamName());
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity deleteTeam(@AuthenticationPrincipal String studentId, @PathVariable Long teamId) {
        return teamService.deleteTeam(studentId, teamId);
    }

    @PostMapping("/{teamId}/invitation")
    public ResponseEntity sendInvitation(@AuthenticationPrincipal String studentId, @PathVariable Long teamId, @RequestBody InvitationDto.InvitationRequestDto invitationDto) {
        return invitationService.sendInvitations(studentId, teamId, invitationDto);
    }

    @GetMapping("/invitation")
    public ResponseEntity getInvitation(@AuthenticationPrincipal String studentId) {
        return invitationService.getInvitations(studentId);
    }

    @PutMapping("/invitation/{invitationId}/accept")
    public ResponseEntity acceptInvitation(@AuthenticationPrincipal String studentId, @PathVariable Long invitationId) {
        return invitationService.acceptInvitation(studentId, invitationId);
    }

    @PutMapping ("/invitation/{invitationId}/reject")
    public ResponseEntity rejectInvitation(@AuthenticationPrincipal String studentId, @PathVariable Long invitationId) {
        return invitationService.rejectInvitation(studentId, invitationId);
    }

    @DeleteMapping("/invitation/{invitationId}")
    public ResponseEntity deleteInvitation(@AuthenticationPrincipal String studentId, @PathVariable Long invitationId) {
        return invitationService.deleteInvitation(studentId, invitationId);
    }
}
