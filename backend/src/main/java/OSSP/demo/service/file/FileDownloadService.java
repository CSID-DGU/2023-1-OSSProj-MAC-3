package OSSP.demo.service.file;

import OSSP.demo.entity.FileVersion;
import OSSP.demo.model.FileVersionDto;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.repository.FileVersionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;


@RequiredArgsConstructor
@Service
@Slf4j
public class FileDownloadService {

    private final FileVersionRepository fileVersionRepository;

    @Transactional
    public ResponseEntity downloadImage(String studentId, Long fileId, Long fileVersionId) {
        //findby조건을 달때, 해당 레포지토리의 pk부터 달아야함.
        try {
            FileVersion findFile = fileVersionRepository.findByFileVersionIdAndFile_FileId(fileVersionId, fileId);
            FileVersionDto fileVersionDto = FileVersionDto.builder().
                    s3Url(findFile.getS3FileVersionUrl()).
                    fileName(findFile.getFile().getRealFileName()).build();
            //프론트 단에서 이름을 원래 이름으로(dto에 있는이름으로 바꿔서 다운)
            return ResponseEntity.ok().body(fileVersionDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("download_file", "파일 다운로드에 실패했습니다.")));
        }

    }
}
