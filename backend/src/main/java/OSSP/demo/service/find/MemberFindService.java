package OSSP.demo.service.find;

import OSSP.demo.entity.Member;
import OSSP.demo.repository.MemberRepository;
import com.amazonaws.services.kms.model.NotFoundException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberFindService {

    private final MemberRepository memberRepository;


    //member id로 조회
    public Member findById(Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new NotFoundException(String.format("member를 찾지 못했습니다.")));
        return member;

    }
}
