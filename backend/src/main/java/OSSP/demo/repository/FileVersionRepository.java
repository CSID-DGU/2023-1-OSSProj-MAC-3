package OSSP.demo.repository;

import OSSP.demo.entity.FileVersion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileVersionRepository extends JpaRepository<FileVersion, Long> {

    FileVersion findByFileVersionIdAndFile_FileId(Long fileId, Long fileVersionId);
}
