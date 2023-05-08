package OSSP.demo.service.upload;

import OSSP.demo.entity.File;
import OSSP.demo.entity.FileVersion;
import OSSP.demo.entity.Member;
import OSSP.demo.entity.User;
import OSSP.demo.model.FileVersionDto;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.UserRepository;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RequiredArgsConstructor
@Service
@Slf4j
public class FileUploadService {

    private final UploadService s3Service;
    private final FileVersionRepository fileVersionRepository;
    private final FileRepository fileRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    //Multipart를 통해 전송된 파일을 업로드 하는 메소드
    @Transactional
    public String uploadImage(String studentId, Long teamId, MultipartFile uploadFile,
                              FileVersionDto fileVersionDto){

        User finduser = userRepository.findByStudentId(studentId).get();
        System.out.println(finduser);

        //현재 사용자 조회
        Member member = memberRepository.findByUserIdAndTeamId(finduser.getId(), teamId).get();
        System.out.println(member);
        // 파일 이름 추출
        String fileName = uploadFile.getOriginalFilename();

        // fileRepository에 현재 업로드 하는 파일과 같은 이름의 파일을 조회
        File findfile = fileRepository.findFileByFileName(uploadFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(uploadFile.getSize()); //파일 크기
        objectMetadata.setContentType(uploadFile.getContentType()); // 파일 확장자
        String versionId;

        try (InputStream inputStream = uploadFile.getInputStream()) {
            //아래 라인을 통해 s3에 업로드 되는 파일의 Object 정보를 받아옴.
            PutObjectResult putObjectResult = s3Service.uploadFile(inputStream, objectMetadata, fileName); // s3에 파일 업로드.
            versionId = putObjectResult.getVersionId(); //버전id를 받아옴
        } catch (IOException e) {
            throw new IllegalArgumentException(String.format("파일 변환 중 에러가 발생하였습니다. (%s)", fileName));
        }

        String url = s3Service.getFileUrl(fileName); //업로드 파일 url 반환.

        // 파일이 없을시,
        if (findfile == null) {
            System.out.println(member);
            //파일 객체 생성
            File file = File.builder().
                    fileName(fileName).
                    member(member).
                    s3FileUrl(url).
                    build();
            fileRepository.save(file);
            findfile = file;
        }

        // FileVersion에 업로드한 파일을 저장.
        FileVersion fileVersion = FileVersion.builder(). //컬럼으로 팀장이 합본을 올린것을 알 수 있도록 불리안으로 컬럼하나 생성.
                commitMessage(fileVersionDto.getCommitMessage()).
                combination(fileVersionDto.getCombination()).
                s3FileVersionUrl(url + "?versionId=" + versionId). //각 버전별 url
                        file(findfile).
                build();

        fileVersionRepository.save(fileVersion);
        return url+"?versionId="+versionId;
    }
}
