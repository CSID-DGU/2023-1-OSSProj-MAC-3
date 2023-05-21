package OSSP.demo.service.file;

import OSSP.demo.model.FilePagingResponseDto;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FileFindService {

    private final FileRepository fileRepository;
    private final FileVersionRepository fileVersionRepository;

    public Page<FilePagingResponseDto> findAllFile(Pageable pageable, String studentId, Long teamId){
        return fileRepository.findByTeamIdOrderByUpdateDateDesc(teamId, pageable)
                .map(FilePagingResponseDto::from);
    }

    public Page<FilePagingResponseDto> findAllFileVersion(Pageable pageable, String studentId, Long teamId, Long fileId){
        return fileVersionRepository.findByFile_FileIdOrderByCreatedDateDesc(fileId, pageable)
                .map(FilePagingResponseDto::from);
    }
}
