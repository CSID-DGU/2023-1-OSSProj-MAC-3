package OSSP.demo.repository;

import OSSP.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

<<<<<<< Updated upstream
public interface UserRepository extends JpaRepository<User, Long> {
    /* Security */
=======
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
>>>>>>> Stashed changes
    Optional<User> findByStudentId(String studentId);

    /* 중복 검사> 중복인 경우 true, 중복되지 않은경우 false 리턴 */
    boolean existsByStudentId(String studentId);
}