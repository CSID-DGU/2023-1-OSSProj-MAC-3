package OSSP.demo.controller;

import OSSP.demo.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final FileUploadService fileUploadService;

//    @PostMapping("/upload")
////    public String uploadFile(@RequestPart MultipartFile multipartFile){
////        return fileUploadService.upload
////    }
}
