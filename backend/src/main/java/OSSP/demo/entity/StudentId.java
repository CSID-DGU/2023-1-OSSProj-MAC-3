package OSSP.demo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

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
