package OSSP.demo.model;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeResponse {

    private Long id;
    private String content;
}
