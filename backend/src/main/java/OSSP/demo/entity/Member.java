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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "teamId")
    private Team team;

    @OneToMany(mappedBy = "member")
    List<File> fileList = new ArrayList<>();

    @Builder
    public Member (Long memberId, User user, Team team){
        this.memberId = memberId;
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
