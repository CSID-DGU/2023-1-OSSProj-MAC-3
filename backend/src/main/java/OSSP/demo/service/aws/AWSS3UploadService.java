package OSSP.demo.service.aws;

import OSSP.demo.S3Component;
import OSSP.demo.service.file.UploadService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@RequiredArgsConstructor
@Service
public class AWSS3UploadService implements UploadService {

    private final AmazonS3 amazonS3;
    private final S3Component component;


    @Override
    public PutObjectResult uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName) {
        return amazonS3.putObject(new PutObjectRequest(component.getBucket(), fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    @Override
    public String getFileUrl(String fileName) {
        return amazonS3.getUrl(component.getBucket(), fileName).toString();
    }
}
