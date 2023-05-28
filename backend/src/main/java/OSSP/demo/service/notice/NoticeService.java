package OSSP.demo.service.notice;

import OSSP.demo.entity.Member;
import OSSP.demo.entity.Notice;
import OSSP.demo.entity.User;
import OSSP.demo.model.NoticeResponse;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.repository.MemberRepository;
import OSSP.demo.repository.NoticeRepository;
import OSSP.demo.repository.TeamRepository;
import OSSP.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    //각 메서드마다 올바르지 않은 사용자(팀이 아닌 사람이 생성한)에 대해 예외처리
    @Transactional(readOnly = true)
    public ResponseEntity findAll(String studentId, Long teamId) {

        User user = userRepository.findByStudentId(studentId).get();
        try {
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).get();
            List<Notice> notices = noticeRepository.findByTeamId(teamId);

            List<NoticeResponse> responseDto = new ArrayList<>();
            for (Notice notice : notices) {
                NoticeResponse dto = NoticeResponse.builder()
                        .noticeId(notice.getNoticeId())
                        .noticeContent(notice.getContent())
                        .build();
                responseDto.add(dto);
            }
            return ResponseEntity.ok().body(Collections.singletonMap("get_notices", responseDto));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("get_notice", "공지사항 조회에 실패했습니다.(올바르지 않은 사용자)")).build());
        }
    }

    @Transactional
    public ResponseEntity write(String studentId, Long teamId, NoticeRequest noticeRequest){
        User user = userRepository.findByStudentId(studentId).get();
        try{
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).get();
            Notice notice = noticeRequest.toEntity();
            notice.setMember(member);
            noticeRepository.save(notice);
            NoticeResponse dto = NoticeResponse.builder()
                    .noticeId(notice.getNoticeId())
                    .noticeContent(notice.getContent())
                    .build();
            return ResponseEntity.ok().body(Collections.singletonMap("write_notice", "공지사항을 생성했습니다."));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("write_notice", "공지사항 생성에 실패했습니다.(올바르지 않은 사용자)")).build());

        }

    }

    @Transactional
    public ResponseEntity update(String studentId, Long teamId, Long noticeId, NoticeRequest noticeRequest) {
        User user = userRepository.findByStudentId(studentId).get();
        try {
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).get();
            Notice findNotice = noticeRepository.findById(noticeId).get();
            Notice notice = noticeRequest.toEntity();
            findNotice.updateContent(notice.getContent(), member);

            NoticeResponse dto = NoticeResponse.builder()
                    .noticeId(findNotice.getNoticeId())
                    .noticeContent(findNotice.getContent())
                    .build();

            return ResponseEntity.ok().body(Collections.singletonMap("update_notice", "공지사항을 수정했습니다."));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("update_notice", "공지사항 수정에 실패했습니다.(올바르지 않은 사용자)")).build());
        }
    }

    @Transactional
    public ResponseEntity delete(String studentId, Long teamId, Long noticeId){
        User user = userRepository.findByStudentId(studentId).get();
        try {
            Member member = memberRepository.findByUserIdAndTeamId(user.getId(), teamId).get();
            noticeRepository.deleteById(noticeId);
            return ResponseEntity.ok().body(Collections.singletonMap("delete_notice", "공지사항 삭제에 성공했습니다."));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("delete_notice", "삭제를 실패했습니다.")).build());
        }

    }



}
