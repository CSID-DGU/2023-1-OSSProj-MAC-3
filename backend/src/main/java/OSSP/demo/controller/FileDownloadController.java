package OSSP.demo.controller;

import OSSP.demo.service.download.FileDownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FileDownloadController {

    private final FileDownloadService fileDownloadService;

    @GetMapping("download/{fileId}/{fileVersionId}")
    public String downloadFile(@PathVariable Long fileId, @PathVariable Long fileVersionId){
        return fileDownloadService.downloadImage(fileId, fileVersionId);
    }
}
