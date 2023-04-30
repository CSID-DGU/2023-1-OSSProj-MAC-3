package OSSP.demo.entity;

<<<<<<< Updated upstream
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
=======
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
>>>>>>> Stashed changes
import java.util.List;

@Getter
@Entity
<<<<<<< Updated upstream
@NoArgsConstructor(access = AccessLevel.PROTECTED)
=======
@Data
@Getter
@Table(name = "user")
>>>>>>> Stashed changes
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< Updated upstream
    private Long userId;
=======
    private Long id;
>>>>>>> Stashed changes

    @Column(nullable = false, length = 10, unique = true)
    private int studentId;

    @Column(nullable = false, length = 20, unique = false)
    private String dept;

    @Column(nullable = false, length = 10, unique = false)
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Member> members = new ArrayList<>();

    @Column(length = 50)
    private String password;

    @Builder
    public User(String name, String password, String dept, int studentId){
        this.name = name;
        this.password = password;
        this.dept = dept;
        this.studentId = studentId;
    }
}