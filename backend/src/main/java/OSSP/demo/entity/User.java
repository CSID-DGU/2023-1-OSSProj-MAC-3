package OSSP.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;

    @Column(name= "studentid", nullable = false, length = 10, unique = true)
    private String studentId;

    @Column(nullable = false, length = 20)
    private String dept;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(length = 100)
    private String password;
}