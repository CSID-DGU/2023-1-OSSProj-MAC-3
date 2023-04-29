package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FileVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileVersion;

    private String commitMessage;

    @Column(length = 1000)
    private String s3Url;

    @ManyToOne
    @JoinColumn(name = "fileId")
    private File file;


}
