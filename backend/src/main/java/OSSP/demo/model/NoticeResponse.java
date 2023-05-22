package OSSP.demo.model;

import OSSP.demo.entity.Notice;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeResponse {

    private Long id;
    private String content;

    public NoticeResponse(Notice notice){
        id = notice.getNoticeId();
        content = notice.getContent();
    }
}
