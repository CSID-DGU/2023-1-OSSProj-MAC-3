package OSSP.demo.controller;

import OSSP.demo.model.TeamDto;
import OSSP.demo.service.TeamService;
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

    @GetMapping
    public ResponseEntity getTeam(@AuthenticationPrincipal String username) {
        return teamService.getTeams(username);
    }

    @PostMapping
    public ResponseEntity createTeam(@AuthenticationPrincipal String username, @RequestBody TeamDto.TeamRequestDto teamDto) {
        return teamService.createTeam(username, teamDto.getTeamName(), teamDto.getTeamMembers());
    }

    @PostMapping("/{teamId}")
    public ResponseEntity deleteTeam(@AuthenticationPrincipal String username, @PathVariable Long teamId) {
        return teamService.deleteTeam(username, teamId);
    }
}
