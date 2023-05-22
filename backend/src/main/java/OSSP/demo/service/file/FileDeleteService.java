package OSSP.demo.service.file;

import OSSP.demo.model.ResponseDto;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;


@RequiredArgsConstructor
@Service
@Slf4j
public class FileDeleteService {

    private final FileVersionRepository fileVersionRepository;
    private final FileRepository fileRepository;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    // 파일 전체 삭제(하위 버전도 같이 삭제)
    public ResponseEntity deleteAll(String studentId, Long fileId) {
        try {
            String keyName = fileRepository.findById(fileId).get().getTransFileName(); //keyName이 파일 이름
            String deleteUrl = fileRepository.findById(fileId).get().getS3FileUrl();
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, keyName));
            fileRepository.deleteById(fileId); //db에서 삭제.
            return ResponseEntity.ok().body(Collections.singletonMap("delete_file_result", "파일버전 전체 삭제를 성공했습니다."));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("delete_file", "파일 전체 삭제에 실패했습니다.")));
        }
    }

    @Transactional
    // 파일 버전 하나 삭제
    public ResponseEntity deleteOne(String studentId, Long fileVersionId){
        try {
            String keyName = fileVersionRepository.findById(fileVersionId).get().getFile().getTransFileName();
            String deleteUrl = fileVersionRepository.findById(fileVersionId).get().getS3FileVersionUrl();

            String versionId = deleteUrl.substring(deleteUrl.indexOf("=") + 1);
            amazonS3Client.deleteVersion(bucket, keyName, versionId);

            fileVersionRepository.deleteById(fileVersionId);
            return ResponseEntity.ok().body(Collections.singletonMap("delete_fileVersion_result", "한개의 파일 버전 삭제를 성공했습니다."));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("delete_fileVersion", "파일 버전 삭제에 실패했습니다.")));
        }
    }
}
