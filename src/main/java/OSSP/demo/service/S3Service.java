package OSSP.demo.service;

import com.amazonaws.services.s3.AmazonS3;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor //기본생성자를 만듦으로써 외부 생성을 막아둠.
public class S3Service {
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.bucket}") //@Value의 패키지가 lombok이 아닌 beans.factory 여야한다.
    private String bucketName;




}

