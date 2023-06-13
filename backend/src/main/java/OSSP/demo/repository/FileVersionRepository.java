package OSSP.demo.repository;

import OSSP.demo.entity.FileVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileVersionRepository extends JpaRepository<FileVersion, Long> {

    FileVersion findByFileVersionIdAndFile_FileId(Long fileId, Long fileVersionId);

    List<FileVersion> findByFile_FileIdOrderByCreatedDateDesc(Long fileId);
}
