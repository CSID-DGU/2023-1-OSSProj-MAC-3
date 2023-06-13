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
    행정학전공("행정학전공"),
    전자전기공학부("전자전기공학부"),
    일본학과("일본학과"),
    컴퓨터공학전공("컴퓨터공학전공"),
    수학과("수학과"),
    사회학전공("사회학전공"),
    의생명공학과("의생명공학과"),
    통계학과("통계학과"),
    식품생명공학과("식품생명공학과"),
    생명과학과("생명과학과"),
    영어통번역학전공("영어통번역학전공"),
    교육학과("교육학과"),
    영화영상학과("영화영상학과"),
    건축공학전공("건축공학전공"),
    수학교육과("수학교육과"),
    산업시스템공학과("산업시스템공학과");

    private final String name;
    public static List<String> getDeptList() {
        return Arrays.stream(values())
                .map(Dept::getName)
                .collect(Collectors.toList());
    }
}