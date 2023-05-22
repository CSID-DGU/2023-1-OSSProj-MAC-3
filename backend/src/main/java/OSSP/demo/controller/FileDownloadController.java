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

    @GetMapping("/team/{teamId}/file/{fileId}/{fileVersionId}")
    public ResponseEntity downloadFile(@AuthenticationPrincipal String studentId, @PathVariable Long fileId, @PathVariable Long fileVersionId){
        return fileDownloadService.downloadImage(studentId, fileId, fileVersionId);
    }
}
