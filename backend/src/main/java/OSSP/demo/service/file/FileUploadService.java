package OSSP.demo.service.file;

import OSSP.demo.entity.*;
import OSSP.demo.model.FileVersionDto;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.UserRepository;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;

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
    public ResponseEntity uploadImage(String studentId, Long teamId, MultipartFile uploadFile,
                                      FileVersionDto fileVersionDto){
        try {
            User finduser = userRepository.findByStudentId(studentId).get();

            //현재 사용자 조회
            Member member = memberRepository.findByUserIdAndTeamId(finduser.getId(), teamId).get();

            // 파일 이름 추출
            String fileName = uploadFile.getOriginalFilename();
            String fileFirstName = fileName.substring(0, fileName.lastIndexOf("."));
            System.out.println(fileFirstName);
            String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
            System.out.println(fileExtension);
            //여러 팀에서 같은 이름으로 파일을 올릴 수 있기 때문에 유니크한 이름으로 s3에 저장하고, db에는 file원래 이름으로 저장.
            String fileNamePlusTeam = fileFirstName+"temaId_"+teamId+"."+fileExtension;
            System.out.println(fileNamePlusTeam);

            // fileRepository에 현재 업로드 하는 파일과 같은 이름의 파일을 조회
            File findfile = fileRepository.findFileByTransFileName(fileNamePlusTeam);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(uploadFile.getSize()); //파일 크기
            objectMetadata.setContentType(uploadFile.getContentType()); // 파일 확장자
            String versionId;

            try (InputStream inputStream = uploadFile.getInputStream()) {
                //아래 라인을 통해 s3에 업로드 되는 파일의 Object 정보를 받아옴.
                PutObjectResult putObjectResult = s3Service.uploadFile(inputStream, objectMetadata, fileNamePlusTeam); // s3에 파일 업로드.
                versionId = putObjectResult.getVersionId(); //버전id를 받아옴
            } catch (IOException e) {
                throw new IllegalArgumentException(String.format("파일 변환 중 에러가 발생하였습니다. (%s)", fileNamePlusTeam));
            }

            String url = s3Service.getFileUrl(fileNamePlusTeam); //업로드 파일 url 반환.

            // 파일이 없을시,
            if (findfile == null) {
                System.out.println(member);
                //파일 객체 생성
                File file = File.builder().
                        realFileName(fileName).
                        transFileName(fileNamePlusTeam).
                        build();
                fileRepository.save(file);
                findfile = file;
            }

            findfile.setMember(member, url);

            // FileVersion에 업로드한 파일을 저장.
            FileVersion fileVersion = FileVersion.builder(). //컬럼으로 팀장이 합본을 올린것을 알 수 있도록 불리안으로 컬럼하나 생성.
                    commitMessage(fileVersionDto.getCommitMessage()).
                    combination(fileVersionDto.getCombination()).
                    s3FileVersionUrl(url + "?versionId=" + versionId). //각 버전별 url
//                            file(findfile).
                    build();

            fileVersion.setFile(findfile);
            fileVersion.setMember(member);

            fileVersionRepository.save(fileVersion);

            FileVersionDto fileVersionDto1 = FileVersionDto.builder().
                    commitMessage(fileVersionDto.getCommitMessage()).
                    combination(fileVersionDto.getCombination()).
                    s3Url(url + "?versionId=" + versionId).build();

            return ResponseEntity.ok().body(fileVersionDto1);
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("upload_file", "파일 업로드에 실패했습니다.")).build());
        }
    }
}
