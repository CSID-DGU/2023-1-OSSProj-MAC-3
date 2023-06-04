package OSSP.demo.repository;

import OSSP.demo.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    //해당 팀의 Notice 조회
    List<Notice> findByTeamId(Long teamId);

    boolean existsByTeamId(Long teamId);
}
