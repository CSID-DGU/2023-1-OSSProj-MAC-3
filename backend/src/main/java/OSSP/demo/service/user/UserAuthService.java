package OSSP.demo.service.user;

import OSSP.demo.entity.User;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.UserDto;
import OSSP.demo.repository.UserRepository;
import OSSP.demo.service.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class UserAuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;
    // 비밀번호 암호화위한 encoder
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public ResponseEntity<?> signin(UserDto userDto) {
        User user = authenticateStudentId(userDto.getStudentId()); // 학번으로 유저 찾기
        if (user == null) { // 유저가 없으면 에러
            String message = "학번이 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) { // 유저가 있으면 비밀번호가 맞는지 확인, 틀리면 에러
            String message = "비밀번호가 올바르지 않습니다.";
            ResponseDto responseErrorDto = getResponseErrorDto(message);
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
        final Map<String, String> tokens = tokenProvider.create(user); // 토큰 생성
        final UserDto responseUserDto = getResponseUserDto(user, tokens); // 유저 정보를 담은 dto 생성
        return ResponseEntity.ok().body(responseUserDto); // dto 반환
    }


    private static ResponseDto getResponseErrorDto(String message) { // 에러 메시지를 담은 dto 생성
        Map<String, String> loginResult = new HashMap<>();
        loginResult.put("valid_login", message);
        ResponseDto responseDto = ResponseDto.builder().error(loginResult).build();
        return responseDto;
    }

    private static UserDto getResponseUserDto(User user, Map<String, String> tokens) { // 유저 정보를 담은 dto 생성
        final UserDto responseUserDto = UserDto.builder()
                .id(user.getId())
                .studentId(user.getStudentId())
                .refreshToken(tokens.get("refreshToken"))
                .accessToken(tokens.get("accessToken"))
                .expiresAt(tokens.get("expiresAt"))
                .name(user.getName())
                .dept(user.getDept())
                .build();
        return responseUserDto;
    }

    public User authenticateStudentId(final String studentId) { // 학번으로 유저 찾기
        return userRepository.findByStudentId(studentId)
                .orElse(null);
    }

    public ResponseEntity<?> refresh(String refreshToken) {
        try {
            String studentId = tokenProvider.validateRefreshTokenAndGetStudentId(refreshToken);
            User user = userRepository.findByStudentId(studentId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("refresh", "사용자가 존재하지 않습니다.")).build());
            }
            String userId = user.getId().toString();
            if (redisTemplate.opsForValue().get(userId) == null) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("refresh", "refresh token이 만료되었습니다.")).build());
            }
            String redisRefreshToken = redisTemplate.opsForValue().get(userId);
            if (!refreshToken.equals(redisRefreshToken)) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("refresh", "refresh token이 유효하지 않습니다.")).build());
            }
            final Map<String, String> tokens = tokenProvider.create(user);
            UserDto responseUserDto = getResponseUserDto(user, tokens);
            return ResponseEntity.ok().body(responseUserDto);
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("refresh", "refresh token 발급에 실패했습니다.")).build());
        }
    }

    public ResponseEntity<?> signout(String studentId) {
        try {
            User user = userRepository.findByStudentId(studentId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("signout", "사용자가 존재하지 않습니다.")).build());
            }
            String userId = user.getId().toString();
            if (redisTemplate.opsForValue().get(userId) == null) {
                return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("signout", "refresh token이 존재하지 않습니다.")).build());
            }
            redisTemplate.delete(userId);
            return ResponseEntity.ok().body(Collections.singletonMap("signout", "로그아웃에 성공했습니다."));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(ResponseDto.builder().error(Collections.singletonMap("signout", "로그아웃에 실패했습니다.")).build());
        }
    }
}
