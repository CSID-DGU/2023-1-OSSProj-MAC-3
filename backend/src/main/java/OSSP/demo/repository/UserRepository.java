package OSSP.demo.repository;

import OSSP.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /* Security */

    Optional<User> findByStudentId(String studentId);

    /* 중복 검사> 중복인 경우 true, 중복되지 않은경우 false 리턴 */
    boolean existsByStudentId(String studentId);

    boolean existsByStudentIdIn(List<String> members);
}