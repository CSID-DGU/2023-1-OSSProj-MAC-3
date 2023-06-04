package OSSP.demo.entity;

import OSSP.demo.service.security.AesEncryptor;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @Convert(converter = AesEncryptor.class)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamId")
    @Convert(converter = AesEncryptor.class)
    private Team team;

    @OneToMany(mappedBy = "member")
    List<File> fileList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<FileVersion> fileVersions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Convert(converter = AesEncryptor.class)
    private Role role;


    @Builder
    public Member(User user, Team team, Role role){
        this.user = user;
        this.team = team;
        this.role = role;
    }
}
