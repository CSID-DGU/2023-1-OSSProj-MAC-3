package OSSP.demo.service.file;

import OSSP.demo.entity.File;
import OSSP.demo.entity.FileVersion;
import OSSP.demo.entity.Member;
import OSSP.demo.entity.User;
import OSSP.demo.model.FilePagingResponseDto;
import OSSP.demo.model.NoticeResponse;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.repository.FileRepository;
import OSSP.demo.repository.FileVersionRepository;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FileFindService {

    private final FileRepository fileRepository;
    private final FileVersionRepository fileVersionRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    public ResponseEntity findAllFile(String studentId, Long teamId){
        try {
            User user = userRepository.findByStudentId(studentId).get();
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).orElse(null);
            if (member==null){
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("get_files", "올바른 사용자가 아닙니다.")).build());
            }
            List<File> files = fileRepository.findByTeamIdOrderByUpdateDateDesc(teamId);
            List<FilePagingResponseDto> responseDto = files.stream()
                    .map(f -> new FilePagingResponseDto(f))
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(Collections.singletonMap("get_files", responseDto));
        } catch (Exception e){
            log.error(e.getMessage());
            ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_files", "파일 전체 조회에 실패했습니다.")).build();
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
    }

    public ResponseEntity findAllFileVersion( String studentId, Long teamId, Long fileId){
        try {
            User user = userRepository.findByStudentId(studentId).get();
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).orElse(null);
            if (member==null){
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("get_fileVersions", "올바른 사용자가 아닙니다.")).build());
            }
            List<FileVersion> fileVersions = fileVersionRepository.findByFile_FileIdOrderByCreatedDateDesc(fileId);
            List<FilePagingResponseDto> responseDto = fileVersions.stream()
                    .map(fv -> new FilePagingResponseDto(fv))
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(Collections.singletonMap("get_fileVersions", responseDto));
        } catch (Exception e){
            log.error(e.getMessage());
            ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_fileVersions", "파일버전 조회에 실패했습니다.")).build();
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
    }
}
