package OSSP.demo.entity;

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
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamId")
    private Team team;

    @OneToMany(mappedBy = "member")
    List<File> fileList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<FileVersion> fileVersions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;


    @Builder
    public Member(User user, Team team, Role role){
        this.user = user;
        this.team = team;
        this.role = role;
    }
}
