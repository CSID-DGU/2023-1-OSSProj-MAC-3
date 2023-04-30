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
    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> getResponseEntity(UserDto userDto) {
        User user = authenticateStudentId(userDto.getStudentId());
        if (user == null) {
            String message = "학번이 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        if (!encoder.matches(userDto.getPassword(), user.getPassword())) {
            String message = "비밀번호가 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        final String token = tokenProvider.create(user);
        final UserDto responseUserDto = getResponseUserDto(userDto, user, token);
        return ResponseEntity.ok().body(responseUserDto);
    }


    private static ResponseDto getResponseErrorDto(String message) {
        Map<String, String> loginResult = new HashMap<>();
        loginResult.put("valid_login", message);
        ResponseDto responseDto = ResponseDto.builder().error(loginResult).build();
        return responseDto;
    }

    private static UserDto getResponseUserDto(UserDto userDto, User user, String token) {
        final UserDto responseUserDto = userDto.builder()
                .id(user.getId())
                .studentId(user.getStudentId())
                .token(token)
                .name(user.getName())
                .dept(user.getDept())
                .build();
        return responseUserDto;
    }

    public User authenticateStudentId(final String studentId) {
        return userRepository.findByStudentId(studentId)
                .orElse(null);
    }
}
