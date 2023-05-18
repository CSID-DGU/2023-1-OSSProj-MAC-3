package OSSP.demo.model;

import OSSP.demo.entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeRequest {
    private String content;

    public Notice toEntity(){
        return Notice.builder()
                .content(content)
                .build();
    }
}
