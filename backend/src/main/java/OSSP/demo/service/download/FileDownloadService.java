package OSSP.demo.service.download;

import OSSP.demo.entity.FileVersion;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class FileDownloadService {

    private final FileVersionRepository fileVersionRepository;

    @Transactional
    public String downloadImage(Long fileId, Long fileVersionId) {
        //findby조건을 달때, 해당 레포지토리의 pk부터 달아야함.
        FileVersion findFile = fileVersionRepository.findByFileVersionIdAndFile_FileId(fileVersionId, fileId);
        return findFile.getS3FileVersionUrl();
    }
}
