package OSSP.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "teamId")
    private Team team;

    @OneToMany(mappedBy = "member")
    List<File> fileList = new ArrayList<>();

    @Builder
    public Member(User user, Team team){
        this.user = user;
        this.team = team;
    }

//    // ==연관관계 편의 메서드==
//    public void setUser(User user){
//        this.user=user;
//        user.getMembers().add(this);
//    }
//
//    public void setTeam(Team team){
//        this.team=team;
//        user.getMembers().add(this);
//    }
//
//    public void addFileItem(File file){
//        fileList.add(file);
//        file.setMember(this);
//    }
}
