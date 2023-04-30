package OSSP.demo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

// 회원가입 검증 위한 학번 데이터
@Getter
@RequiredArgsConstructor
public enum StudentId {
    STUDENT_ID_MIN(2016000000),
    STUDENT_ID_MAX(2024000000);

    private final int value;

    public int getValue() {
        return value;
    }
}
