package OSSP.demo.controller;

import OSSP.demo.model.FileVersionDto;
import OSSP.demo.service.upload.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/{memberId}/upload")
    public String uploadFile(@PathVariable Long memberId, @RequestPart MultipartFile file, @RequestPart FileVersionDto fileVersionDto){
        return fileUploadService.uploadImage(memberId, file, fileVersionDto);
    }
}
