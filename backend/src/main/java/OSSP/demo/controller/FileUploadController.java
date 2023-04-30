package OSSP.demo.controller;

//import OSSP.demo.dto.FileInfoReq;
import OSSP.demo.dto.FileInfoReq;
import OSSP.demo.service.upload.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/{memberId}/upload")
    public String uploadFile(@PathVariable Long memberId, @RequestPart MultipartFile file, FileInfoReq fileInfoReq){
        return fileUploadService.uploadImage(memberId, file, fileInfoReq);
    }
}
