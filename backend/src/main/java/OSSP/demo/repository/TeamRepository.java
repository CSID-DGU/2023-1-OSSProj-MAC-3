package OSSP.demo.repository;

import OSSP.demo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findById(Long teamId);
    boolean existsById(Long teamId);
}
