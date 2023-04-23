package OSSP.demo.repository;

import OSSP.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    /* Security */
    Optional<User> findByStudent_Id(String student_Id);

    /* 중복 검사> 중복인 경우 true, 중복되지 않은경우 false 리턴 */
    boolean existsByStudent_Id(String student_Id);
}
