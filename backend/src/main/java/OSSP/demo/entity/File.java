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
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String fileName;

    @OneToMany(mappedBy = "file")
    private List<FileVersion> fileVersionList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;


    @Builder
    public File (String fileName, Member member){
        this.fileName=fileName;
        this.member=member;
    }


    //== 연관관계 편의메서드 ==

    public void setMember(Member member){
        this.member = member;
    }

    public void addFileVersion(FileVersion fileVersion){
        fileVersionList.add(fileVersion);
        fileVersion.setFile(this);
    }
}