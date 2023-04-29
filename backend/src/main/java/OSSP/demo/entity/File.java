package OSSP.demo.entity;

import lombok.AccessLevel;
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

}
