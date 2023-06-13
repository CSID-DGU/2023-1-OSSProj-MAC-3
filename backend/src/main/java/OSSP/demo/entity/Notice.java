package OSSP.demo.entity;

import OSSP.demo.service.security.AesEncryptor;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends TimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @Convert(converter = AesEncryptor.class)
    private String content;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    private Long teamId;

    @Builder
    public Notice(String content){
        this.content=content;
    }

    public void setMember(Member member){
        this.member=member;
        this.teamId=member.getTeam().getId();
    }

    public void updateContent(String content, Member member){
        this.content=content;
        this.member =member;
    }
}
