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
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long team_Id;

    private String team_name;

    @OneToMany(mappedBy = "member")
    private List<Member> members = new ArrayList<>();

    @Builder
    public Team(String team_name, List<Member> members){
        this.team_name=team_name;
        this.members = members;
    }
}
