package OSSP.demo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Dept {
    건설환경공학과("건설환경공학과"),
    멀티미디어공학과("멀티미디어공학과"),
    산업시스템공학과("산업시스템공학과");

    private final String name;
    public static List<String> getDeptList() {
        return Arrays.stream(values())
                .map(Dept::getName)
                .collect(Collectors.toList());
    }
}