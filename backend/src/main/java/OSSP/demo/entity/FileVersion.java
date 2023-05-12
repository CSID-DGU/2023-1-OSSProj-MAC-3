package OSSP.demo.entity;

import OSSP.demo.model.FileVersionDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileVersionId;

    private String commitMessage;

    @Column(length = 1000)
    private String s3FileVersionUrl;

    //파일 합본 여부
    private Boolean combination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fileId")
    private File file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @Builder
    public FileVersion(String commitMessage, String s3FileVersionUrl, Boolean combination){
        this.commitMessage=commitMessage;
        this.s3FileVersionUrl=s3FileVersionUrl;
//        this.file=file;
        this.combination=combination;
//        this.member=member;
    }

    // ==연관관계 편의 메서드 ==
    public void setFile(File file){
        this.file = file;

        if(!file.getFileVersionList().contains(this)){
            file.getFileVersionList().add(this);
        }
    }

    public void setMember(Member member){
        this.member=member;

        if(!member.getFileVersions().contains(this)){
            member.getFileVersions().add(this);
        }
    }
}
