package OSSP.demo.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import lombok.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, length = 10, unique = true)
    private String studentId;

    @Column(nullable = false, length = 20, unique = false)
    private String dept;

    @Column(nullable = false, length = 10, unique = false)
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Member> members = new ArrayList<>();

    @Column(length = 100)
    private String password;

    @Builder
    public User(String name, String password, String dept, String studentId){
        this.name = name;
        this.password = password;
        this.dept = dept;
        this.studentId = studentId;
    }
}