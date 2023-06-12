package OSSP.demo.entity;

import OSSP.demo.model.FileVersionDto;
import OSSP.demo.service.security.AesEncryptor;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileVersion extends TimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileVersionId;

    @Convert(converter = AesEncryptor.class)
    private String commitMessage;

    @Column(length = 65000)
//    @Convert(converter = AesEncryptor.class)
    private String s3FileVersionUrl;

    //파일 합본 여부
    private Boolean combination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fileId")
    @Convert(converter = AesEncryptor.class)
    private File file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    @Convert(converter = AesEncryptor.class)
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
