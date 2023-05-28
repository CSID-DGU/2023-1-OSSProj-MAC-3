package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File extends TimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String s3FileUrl;

    private String realFileName;
    private String transFileName;
    private String commitMessage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamId")
    private Team team;

    @OneToMany(mappedBy = "file", cascade = CascadeType.ALL)
    private List<FileVersion> fileVersionList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;


    @Builder
    public File(String realFileName, String transFileName, String  s3FileUrl, String commitMessage) {
        this.realFileName = realFileName;
        this.transFileName = transFileName;
        this.s3FileUrl = s3FileUrl;
        this.commitMessage = commitMessage;
    }


//    == 연관관계 편의메서드 ==

    public void setMember(Member member){
        this.member = member;
        this.team = member.getTeam();


        if(!member.getFileList().contains(this)){
            member.getFileList().add(this);
        }
    }

    public void setS3FileUrl(String s3FileUrl){
        this.s3FileUrl=s3FileUrl;
    }

    public void setCommitMessage(String commitMessage) {
        this.commitMessage = commitMessage;
    }

    public void addFileVersion(FileVersion fileVersion){
        this.fileVersionList.add(fileVersion);

        if(fileVersion.getFile()!=this){
            fileVersion.setFile(this);
        }
    }
}
