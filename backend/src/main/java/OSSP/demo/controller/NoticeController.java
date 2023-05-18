package OSSP.demo.controller;

import OSSP.demo.model.NoticeRequest;
import OSSP.demo.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/{teamId}/notice")
    public ResponseEntity findAll(@AuthenticationPrincipal String studentId, @PathVariable Long teamId){
        return noticeService.findAll(studentId, teamId);
    }

    @PostMapping("/{teamId}/notice")
    public ResponseEntity writeNotice(@AuthenticationPrincipal String studentId, @PathVariable Long teamId,
                                      @RequestBody NoticeRequest noticeRequest){
        return noticeService.write(studentId, teamId, noticeRequest);
    }

    @PutMapping("/{teamId}/{noticeId}")
    public ResponseEntity updateNotice(@AuthenticationPrincipal String studentId,
                                       @PathVariable Long teamId, @PathVariable Long noticeId,
                                       @RequestBody NoticeRequest noticeRequest){
        return noticeService.update(studentId, teamId, noticeId, noticeRequest);
    }

    @DeleteMapping("/{teamId}/{noticeId}")
    public ResponseEntity deleteNotice(@AuthenticationPrincipal String studentId,
                                       @PathVariable Long teamId, @PathVariable Long noticeId){
        return noticeService.delete(studentId, teamId, noticeId);
    }

}
