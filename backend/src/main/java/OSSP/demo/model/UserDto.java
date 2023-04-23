package OSSP.demo.model;

import OSSP.demo.entity.User;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 * request, response DTO 클래스를 하나로 묶어 InnerStaticClass로 한 번에 관리
 */
public class UserDto {

    /** 회원 Service 요청(Request) DTO 클래스 */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Request {

        @Range(min = 2016000000, max = 2023999999, message = "학번은 2016000000~2023999999 사이의 숫자여야 합니다.")
        private int studentId;

        @AssertTrue(message = "학과를 선택해주세요.")
        public boolean isDeptValid() {
            List<String> deptList = Arrays.asList(new String[]{"건설환경공학과", "멀티미디어공학과", "산업시스템공학과"});
            return deptList.contains(dept);
        }

        private String dept;

        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "이름은 특수문자를 제외한 2~10자리여야 합니다.")
        @NotBlank(message = "이름은 필수 입력 값입니다.")
        private String name;

        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;

        public User toEntity() {
            User user = User.builder()
                    .student_Id(studentId)
                    .dept(dept)
                    .name(name)
                    .password(password)
                    .build();
            return user;
        }

        /**
         * 인증된 사용자 정보를 세션에 저장하기 위한 클래스
         * 세션을 저장하기 위해 User 엔티티 클래스를 직접 사용하게 되면 직렬화를 해야 하는데,
         * 엔티티 클래스에 직렬화를 넣어주면 추후에 다른 엔티티와 연관관계를 맺을시
         * 직렬화 대상에 다른 엔티티까지 포함될 수 있어 성능 이슈 우려가 있기 때문에
         * 세션 저장용 Dto 클래스 생성
         * */
        @Getter
        public static class Response implements Serializable {

            private final Long id;
            private final Integer studentId;
            private final String dept;
            private final String name;
            private final String password;

            /* Entity -> dto */
            public Response(User user) {
                this.id = user.getUser_Id();
                this.studentId = user.getStudent_Id();
                this.dept = user.getDept();
                this.name = user.getName();
                this.password = user.getPassword();
            }
        }

    }
}