package OSSP.demo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TeamDto {
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
    }
}
