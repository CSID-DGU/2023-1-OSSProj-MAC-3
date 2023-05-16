package OSSP.demo.controller;

import OSSP.demo.service.delete.FileDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileDeleteController {

    private final FileDeleteService fileDeleteService;

    @DeleteMapping("/delete/file/{fileId}")
    public ResponseEntity deleteAll(@PathVariable Long fileId){
        return fileDeleteService.deleteAll(fileId);
    }

    @DeleteMapping("/delete/fileVersion/{fileVersionId}")
    public ResponseEntity deleteOne(@PathVariable Long fileVersionId){
        return fileDeleteService.deleteOne(fileVersionId);
    }
}
