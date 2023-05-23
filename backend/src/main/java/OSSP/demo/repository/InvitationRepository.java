package OSSP.demo.repository;

import OSSP.demo.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    boolean existsByLeaderIdAndFellowIdAndTeamId(long parseLong, long parseLong1, long parseLong2);

    Invitation findByLeaderIdAndFellowIdAndTeamId(Long leaderId, Long fellowId, Long teamId);

    boolean existsByFellowId(Long fellowId);

    Object findByFellowId(Long fellowId);

    List<Invitation> findAllByFellowId(Long fellowId);

    List<Invitation> findByTeamId(Long teamId);
}
