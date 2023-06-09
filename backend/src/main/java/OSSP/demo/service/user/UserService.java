package OSSP.demo.service.user;

import OSSP.demo.entity.User;
import OSSP.demo.model.ResponseDto;
import OSSP.demo.model.UserDto;
import OSSP.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity getUser(String studentId) {
        try {
            if (!userRepository.existsByStudentId(studentId)) {
                ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_user", "사용자가 존재하지 않습니다")).build();
                return ResponseEntity.badRequest().body(responseErrorDto);
            }
            User user = userRepository.findByStudentId(studentId).get();
            UserDto userDto = UserDto.builder()
                    .id(user.getId())
                    .studentId(user.getStudentId())
                    .name(user.getName())
                    .dept(user.getDept())
                    .build();
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_user", "사용자를 불러오는데 실패했습니다")).build();
            return ResponseEntity.badRequest().body(responseErrorDto);
        }

    }

    public ResponseEntity getUserList(String studentId) {
        try {
            List<User> users = userRepository.findAll();
            List<UserDto> userDtoList = new ArrayList<>();
            for (User user : users) {
                UserDto userDto = UserDto.builder()
                        .id(user.getId())
                        .studentId(user.getStudentId())
                        .name(user.getName())
                        .dept(user.getDept())
                        .build();
                userDtoList.add(userDto);
            }
            return ResponseEntity.ok(Collections.singletonMap("get_user_list", userDtoList));
        } catch (Exception e) {
            log.error(e.getMessage());
            ResponseDto responseErrorDto = ResponseDto.builder().error(Collections.singletonMap("get_user_list", "사용자 목록을 불러오는데 실패했습니다")).build();
            return ResponseEntity.badRequest().body(responseErrorDto);
        }
    }
}
