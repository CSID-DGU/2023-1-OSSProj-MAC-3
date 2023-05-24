package OSSP.demo.controller;

import OSSP.demo.service.file.FileDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileDeleteController {

    private final FileDeleteService fileDeleteService;

    @DeleteMapping("/team/{teamId}/file/{fileId}")
    public ResponseEntity deleteAll(@AuthenticationPrincipal String studentId, @PathVariable Long fileId, @PathVariable Long teamId){
        return fileDeleteService.deleteAll(studentId, fileId, teamId);
    }

    @DeleteMapping("/team/{teamId}/file/fileVersion/{fileVersionId}")
    public ResponseEntity deleteOne(@AuthenticationPrincipal String studentId, @PathVariable Long fileVersionId, @PathVariable Long teamId){
        return fileDeleteService.deleteOne(studentId, fileVersionId, teamId);
    }
}
