package OSSP.demo.controller;

import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.UserDto;
import OSSP.demo.service.user.UserJoinService;
import OSSP.demo.service.user.UserLoginService;
import OSSP.demo.service.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserJoinService userJoinService;
    @Autowired
    private UserLoginService userLoginService;
    @Autowired
    private UserService userService;

    // 회원가입 서비스,  @Valid: DTO에 정의한 대로 검증, Errors: 검증 결과를 담아줌
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto.UserJoinRequestDto userDto, Errors errors) {
        // 검증 결과 에러가 있으면
        if (errors.hasErrors()) {
            // 에러 메시지를 담은 ResponseDto를 반환
            ResponseDto responseDto = ResponseDto.builder().error(userJoinService.validateHandling(errors)).build();
            return ResponseEntity.badRequest().body(responseDto);
        }
        // 에러가 없으면
        // 회원가입 서비스를 통해 회원가입을 시도하고, 결과를 반환
        return userJoinService.getResponseEntity(userDto);
    }

    // 로그인 서비스, @RequestBody: 요청 바디를 읽어서 UserDto에 매핑
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto userDto) {
        // 로그인 서비스를 통해 로그인을 시도하고, 결과를 반환
        return userLoginService.getResponseEntity(userDto);
    }
    @GetMapping
    public ResponseEntity getUser(@AuthenticationPrincipal String studentId) {
        return userService.getUser(studentId);
    }

    @GetMapping("/all")
    public ResponseEntity getUserList(@AuthenticationPrincipal String studentId) {
        return userService.getUserList(studentId);
    }
}
