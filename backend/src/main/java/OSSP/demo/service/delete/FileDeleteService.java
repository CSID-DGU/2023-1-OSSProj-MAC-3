package OSSP.demo.service.delete;

import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class FileDeleteService {

    private final FileVersionRepository fileVersionRepository;
    private final FileRepository fileRepository;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    // 파일 전체 삭제(하위 버전도 같이 삭제)
    public String deleteAll(Long fileId){
        String keyName = fileRepository.findById(fileId).get().getFileName(); //keyName이 파일 이름
        String deleteUrl = fileRepository.findById(fileId).get().getS3FileUrl();
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, keyName));
        fileRepository.deleteById(fileId); //db에서 삭제.
        return deleteUrl;
    }

    @Transactional
    // 파일 버전 하나 삭제
    public String deleteOne(Long fileVersionId){
        String keyName = fileVersionRepository.findById(fileVersionId).get().getFile().getFileName();
        String deleteUrl = fileVersionRepository.findById(fileVersionId).get().getS3FileVersionUrl();

        String versionId = deleteUrl.substring(deleteUrl.indexOf("=") + 1);
        amazonS3Client.deleteVersion(bucket, keyName,versionId);

        fileVersionRepository.deleteById(fileVersionId);
        return deleteUrl;
    }
}
