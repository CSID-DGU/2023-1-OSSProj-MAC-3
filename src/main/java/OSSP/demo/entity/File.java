package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File extends TimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long file_Id;

    private String commit_Message;

    private String S3_Url;

    private String file_Name;

    //단방향
    @ManyToOne
    @JoinColumn(name = "member_Id")
    private Member member;

    @Builder
    public File(String commit_Message, String file_Name, Member member){
        this.commit_Message = commit_Message;
        this.file_Name = file_Name;
        this.member = member;
    }
}
