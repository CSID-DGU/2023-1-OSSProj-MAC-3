package OSSP.demo.repository;

import OSSP.demo.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    //파일이름(요청한 파일)으로 파일을 찾는 메서드.
    File findFileByFileName(String fileName);
}
