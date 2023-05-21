package OSSP.demo.model;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class InvitationDto {
    private Long invitationId;
    private Long teamId;
    private Long leaderId;
    private Long fellowId;
    private Boolean isAccepted;

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class InvitationRequestDto {
        private Long teamId;
        private Long leaderId;
        private List<Long> fellowIds;
    }
}