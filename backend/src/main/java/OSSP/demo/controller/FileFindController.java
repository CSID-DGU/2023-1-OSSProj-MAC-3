package OSSP.demo.controller;

import OSSP.demo.service.find.FileFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileFindController {

    private FileFindService fileFindService;

    //기본 페이지 - 파일별로 최신 파일이 보일 수 있도록 페이징
//    @GetMapping("/find/allFile")
//    public String findFile(Pageable pageable, @AuthenticationPrincipal String studentId){
//        return fileFindService.findAllFile();
//
//    }
}
