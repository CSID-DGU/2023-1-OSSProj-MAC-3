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

    //system uuid로 중복 없는 id 생성
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;

    // 고유한 키로 학번 사용
    @Column(nullable = false, length = 10, unique = true)
    private String studentId;

    @Column(nullable = false, length = 20)
    private String dept;

    @Column(nullable = false, length = 10)
    private String name;

    // 암호화된 비밀번호 저장하기 위해 길이를 100으로 설정
    @Column(length = 100)
    private String password;
}