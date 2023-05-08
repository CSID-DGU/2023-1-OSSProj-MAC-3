package OSSP.demo.controller;

import OSSP.demo.model.FileVersionDto;
import OSSP.demo.service.upload.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/{teamId}/upload")
    public String uploadFile(@AuthenticationPrincipal String studentId, @PathVariable Long teamId, @RequestPart MultipartFile file,
                             @RequestPart FileVersionDto fileVersionDto){
        return fileUploadService.uploadImage(studentId, teamId, file, fileVersionDto);
    }
}
