package OSSP.demo.service;

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

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class UserLoginService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;
    // 비밀번호 암호화위한 encoder
    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> getResponseEntity(UserDto userDto) {
        User user = authenticateStudentId(userDto.getStudentId()); // 학번으로 유저 찾기
        if (user == null) { // 유저가 없으면 에러
            String message = "학번이 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        if (!encoder.matches(userDto.getPassword(), user.getPassword())) { // 유저가 있으면 비밀번호가 맞는지 확인, 틀리면 에러
            String message = "비밀번호가 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        final String token = tokenProvider.create(user); // 토큰 생성
        final UserDto responseUserDto = getResponseUserDto(userDto, user, token); // 유저 정보를 담은 dto 생성
        return ResponseEntity.ok().body(responseUserDto); // dto 반환
    }


    private static ResponseDto getResponseErrorDto(String message) { // 에러 메시지를 담은 dto 생성
        Map<String, String> loginResult = new HashMap<>();
        loginResult.put("valid_login", message);
        ResponseDto responseDto = ResponseDto.builder().error(loginResult).build();
        return responseDto;
    }

    private static UserDto getResponseUserDto(UserDto userDto, User user, String token) { // 유저 정보를 담은 dto 생성
        final UserDto responseUserDto = userDto.builder()
                .id(user.getId())
                .studentId(user.getStudentId())
                .token(token)
                .name(user.getName())
                .dept(user.getDept())
                .build();
        return responseUserDto;
    }

    public User authenticateStudentId(final String studentId) { // 학번으로 유저 찾기
        return userRepository.findByStudentId(studentId)
                .orElse(null);
    }
}
