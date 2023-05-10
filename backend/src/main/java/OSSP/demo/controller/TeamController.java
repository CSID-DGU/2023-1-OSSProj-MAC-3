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
    public ResponseEntity getTeams(@AuthenticationPrincipal String username) {
        return teamService.getTeams(username);
    }

    @GetMapping("/{teamId}")
    public ResponseEntity getTeam(@AuthenticationPrincipal String username, @PathVariable Long teamId) {
        return teamService.getTeam(username, teamId);
    }

    @PostMapping
    public ResponseEntity createTeam(@AuthenticationPrincipal String username, @RequestBody TeamDto.TeamRequestDto teamDto) {
        return teamService.createTeam(username, teamDto.getTeamName());
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity deleteTeam(@AuthenticationPrincipal String username, @PathVariable Long teamId) {
        return teamService.deleteTeam(username, teamId);
    }

    @PostMapping("/invitation")
    public ResponseEntity sendInvitation(@AuthenticationPrincipal String username, @RequestBody InvitationDto.InvitationRequestDto invitationDto) {
        return invitationService.sendInvitations(username, invitationDto);
    }

    @GetMapping("/invitation")
    public ResponseEntity getInvitation(@AuthenticationPrincipal String username) {
        return invitationService.getInvitations(username);
    }

    @PutMapping("/invitation/{invitationId}/accept")
    public ResponseEntity acceptInvitation(@AuthenticationPrincipal String username, @PathVariable Long invitationId) {
        return invitationService.acceptInvitation(username, invitationId);
    }

    @PutMapping ("/invitation/{invitationId}/reject")
    public ResponseEntity rejectInvitation(@AuthenticationPrincipal String username, @PathVariable Long invitationId) {
        return invitationService.rejectInvitation(username, invitationId);
    }

    @DeleteMapping("/invitation/{invitationId}")
    public ResponseEntity deleteInvitation(@AuthenticationPrincipal String username, @PathVariable Long invitationId) {
        return invitationService.deleteInvitation(username, invitationId);
    }
}
