package OSSP.demo.controller;

import OSSP.demo.model.FilePagingResponseDto;
import OSSP.demo.service.file.FileFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileFindController {

    private final FileFindService fileFindService;

    //기본 페이지 - 파일별로 최신 파일이 보일 수 있도록 페이징
    @GetMapping("/team/{teamId}/file")
    public ResponseEntity findFile(@AuthenticationPrincipal String studentId, @PathVariable Long teamId){
        return fileFindService.findAllFile(studentId, teamId);
    }

    //파일 버전 페이징
    @GetMapping("/team/{teamId}/file/{fileId}")
    public ResponseEntity findFileVersion(@AuthenticationPrincipal String studentId, @PathVariable Long teamId, @PathVariable Long fileId) {
        return fileFindService.findAllFileVersion(studentId, teamId, fileId);
    }
}
