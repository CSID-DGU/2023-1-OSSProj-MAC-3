package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends TimeEntity{

    @Id
    @GeneratedValue
    private Long notice_Id;

    private String content;

    private String status;

    @ManyToOne
    @JoinColumn(name = "member_Id")
    private Member member;

    @Builder
    public Notice(String content, String status){
        this.content = content;
        this.status = status;
    }
}
