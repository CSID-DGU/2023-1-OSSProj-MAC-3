package OSSP.demo.controller;

import OSSP.demo.model.FileVersionDto;
import OSSP.demo.service.file.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/team/{teamId}/file/upload")
    public ResponseEntity uploadFile(@AuthenticationPrincipal String studentId, @PathVariable Long teamId, @RequestPart MultipartFile file,
                                     @RequestPart FileVersionDto fileVersionDto){
        return fileUploadService.uploadImage(studentId, teamId, file, fileVersionDto);
    }
}
