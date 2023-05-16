package OSSP.demo.service.user;

import OSSP.demo.entity.User;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.UserDto;
import OSSP.demo.repository.UserRepository;
import OSSP.demo.service.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class UserJoinService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> signup(UserDto.UserJoinRequestDto userDto) {
        User user = User.builder()
                .studentId(userDto.getStudentId())
                .password(encoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .dept(userDto.getDept())
                .build(); // UserDto -> User
        User registerdUser; // 회원가입 처리 후 결과를 받음
        // 회원가입 처리
        try {
            registerdUser = join(user);
        } catch (IllegalArgumentException e) {
            // 회원가입 실패 시, 예외 메시지를 받아서 ResponseDto에 담아 반환
            ResponseDto responseErrorDto = getResponseErrorDto(e);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        // 회원가입 성공 시, 회원 정보를 받아서 ResponseDto에 담아 반환
        UserDto responseUserDto = getResponseUserDto(registerdUser);
        return ResponseEntity.ok().body(responseUserDto);
    }

    private static ResponseDto getResponseErrorDto(IllegalArgumentException e) {
        Map<String, String> joinResult = new HashMap<>();
        joinResult.put("valid_join", e.getMessage());
        ResponseDto responseDto = ResponseDto.builder().error(joinResult).build();
        return responseDto;
    }

    private static UserDto getResponseUserDto(User registerdUser) {
        UserDto responseDto = new UserDto().builder()
                .id(registerdUser.getId())
                .studentId(registerdUser.getStudentId())
                .name(registerdUser.getName())
                .dept(registerdUser.getDept())
                .build();
        return responseDto;
    }

    // 유효성 검사
    @Transactional(readOnly = true) // 읽기 전용 트랜잭션
    public Map<String, String> validateHandling(Errors errors) {
        // 유효성 검사, 중복 검사에 실패한 필드 목록을 받음
        Map<String, String> validatorResult = new HashMap<>();
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }
        return validatorResult;
    }

    // 회원가입 처리
    public User join(final User user) {
        // 유효성 검사
        if (user == null || user.getStudentId() == null) {
            throw new IllegalArgumentException("유저 정보가 없습니다.");
        }
        final String studentId = user.getStudentId();
        // 중복 검사
        if (userRepository.existsByStudentId(studentId)) {
            throw new IllegalArgumentException("이미 존재하는 학번입니다.");
        }
        return userRepository.save(user);
    }
}