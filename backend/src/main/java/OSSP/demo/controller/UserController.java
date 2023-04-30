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

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto.UserJoinRequestDto userDto, Errors errors) {
        if (errors.hasErrors()) {
            ResponseDto responseDto = ResponseDto.builder().error(userJoinService.validateHandling(errors)).build();
            return ResponseEntity.badRequest().body(responseDto);
        }
        return userJoinService.getResponseEntity(userDto);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto userDto) {
        return userLoginService.getResponseEntity(userDto);
    }
}
