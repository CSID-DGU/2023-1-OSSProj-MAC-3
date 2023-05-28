package OSSP.demo.model;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeResponse {

    private Long noticeId;
    private String noticeContent;
}
