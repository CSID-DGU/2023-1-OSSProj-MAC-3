package OSSP.demo.model;

import OSSP.demo.entity.Role;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TeamDto {
    private String teamId;
    private String teamName;
    private List<TeamFellowDto> teamFellow;

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class TeamRequestDto {
        private String teamName;
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class TeamFellowDto {
        private String studentId;
        private String name;
        private Role role;
    }
}
