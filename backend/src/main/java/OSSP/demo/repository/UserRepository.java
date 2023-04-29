package OSSP.demo.repository;

import OSSP.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findByStudentId(String studentId);
    Boolean existsByStudentId(String studentId);
}
