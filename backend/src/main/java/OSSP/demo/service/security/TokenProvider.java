package OSSP.demo.service.security;

import OSSP.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

// JWT 토큰 생성 및 검증을 위한 클래스
@Slf4j
@Service
public class TokenProvider {
    // application.yml에 설정한 jwt.secretKey를 가져옴
    @Value("${jwt.secretKey}")
    private String secretKey;

    // 토큰 생성
    public String create(User user) {
        Date now = new Date(); // 현재 시간
        Date validity = new Date(now.getTime() + 1000 * 60 * 30); // 30분 뒤 만료
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, secretKey) // HS256 알고리즘, secretKey로 서명
                .setSubject(user.getStudentId())
                .setIssuer("demo app")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    // 토큰 검증, studentId 반환, 검증 실패 시 null 반환
    public String validateAndGetStudentId(String token) {
        Claims claims = Jwts.parser() // secretKey로 토큰을 파싱
                .setSigningKey(secretKey)
                .parseClaimsJws(token)// 파싱된 토큰에서 claims를 얻음
                .getBody();
        return claims.getSubject();
    }

    // 토큰 만료 검증
    public boolean validateTimeToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        Date expirationDate = claims.getExpiration(); // 토큰 만료 시간
        return expirationDate.after(new Date()); // 토큰 만료 시간이 현재 시간보다 뒤인지 검증
    }
}
