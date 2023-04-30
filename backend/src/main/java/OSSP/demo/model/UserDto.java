package OSSP.demo.model;

import OSSP.demo.entity.Dept;
import OSSP.demo.entity.StudentId;
import lombok.*;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


//UserDto 내부에 UserJoinRequestDto를 Static 클래스로 두어 관리, UserJoinRequestDto는 회원가입 시 필요한 정보 검증
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String token;
    private Long id;
    private String studentId;
    private String password;
    private String name;
    private String dept;

    //회원가입시 필요한 정보 검증
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserJoinRequestDto {
        private Dept deptData;
        private StudentId studentIdData;


        private Long id;

        @NotBlank(message = "학번을 입력해주세요.")
        private String studentId;

        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;

        @NotBlank(message = "이름을 입력해주세요.")
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "이름은 특수문자를 제외한 2~10자리여야 합니다.")
        private String name;

        @NotBlank(message = "학과를 선택해주세요.")
        private String dept;

        //학번이 범위 내에 있는지 검증
        @AssertTrue(message = "학번이 등록되어있지 않습니다.")
        private boolean isValidStudentId() {
            int studentIdValue = Integer.parseInt(studentId);
            return studentIdValue >= studentIdData.STUDENT_ID_MIN.getValue() && studentIdValue <= studentIdData.STUDENT_ID_MAX.getValue();
        }

        //학과가 목록에 있는지 검증
        @AssertTrue(message = "학과를 입력해주세요.")
        public boolean isDeptValid() {
            return deptData.getDeptList().contains(dept);
        }
    }
}
