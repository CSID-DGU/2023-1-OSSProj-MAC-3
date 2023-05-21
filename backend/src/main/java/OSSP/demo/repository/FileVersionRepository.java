package OSSP.demo.repository;

import OSSP.demo.entity.FileVersion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileVersionRepository extends JpaRepository<FileVersion, Long> {

    FileVersion findByFileVersionIdAndFile_FileId(Long fileId, Long fileVersionId);

    Page<FileVersion> findByFile_FileIdOrderByCreatedDateDesc(Long fileId, Pageable pageable);
}
