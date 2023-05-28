package OSSP.demo.controller;

import OSSP.demo.service.file.FileDownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FileDownloadController {

    private final FileDownloadService fileDownloadService;

    //파일 버전 다운로드
    @GetMapping("/team/{teamId}/fileDownload/{fileId}/{fileVersionId}")
    public ResponseEntity downloadFileVersion(@AuthenticationPrincipal String studentId, @PathVariable Long fileId, @PathVariable Long fileVersionId, @PathVariable Long teamId){
        return fileDownloadService.downloadFileVersion(studentId, fileId, fileVersionId, teamId);
    }

    //파일 다운로드
    @GetMapping("/team/{teamId}/fileDownload/{fileId}")
    public ResponseEntity downloadFile(@AuthenticationPrincipal String studentId, @PathVariable Long fileId, @PathVariable Long teamId){
        return fileDownloadService.downloadFile(studentId, fileId, teamId);
    }
}
