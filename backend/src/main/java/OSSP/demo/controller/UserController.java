package OSSP.demo.controller;

import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.UserDto;
import OSSP.demo.service.UserJoinService;
import OSSP.demo.service.UserLoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("auth")
public class UserController {

    @Autowired
    private UserJoinService userJoinService;
    @Autowired
    private UserLoginService userLoginService;

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
}