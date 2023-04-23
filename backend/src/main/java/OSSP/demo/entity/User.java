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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_Id;

    @Column(nullable = false, length = 10, unique = true)
    private int student_Id;

    @Column(nullable = false, length = 20, unique = false)
    private String dept;

    @Column(nullable = false, length = 10, unique = false)
    private String name;

    @Column(length = 50)
    private String password;

    @Builder
    public User(String name, String password, String dept, int student_Id){
        this.name = name;
        this.password = password;
        this.dept = dept;
        this.student_Id = student_Id;
    }


}
