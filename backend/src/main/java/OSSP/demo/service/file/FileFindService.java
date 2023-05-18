package OSSP.demo.service.file;

import OSSP.demo.entity.File;
import OSSP.demo.model.FilePagingResponseDto;
import OSSP.demo.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FileFindService {

    private final FileRepository fileRepository;

    public Page<FilePagingResponseDto> findAllFile(Pageable pageable, Long teamId){
        return fileRepository.findByTeamIdOrderByUpdateDateDesc(teamId, pageable)
                .map(FilePagingResponseDto::from);
    }
}
