package OSSP.demo.repository;

import OSSP.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByUserId(Long userId);
    Boolean existsByUserId(Long userId);
    List<Member> findByTeamId(Long teamId);

    boolean existsByUserIdAndTeamId(Long userId, Long parseLong);
}
