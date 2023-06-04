package OSSP.demo.service.security;

import OSSP.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

// JWT 토큰 생성 및 검증을 위한 클래스
@Slf4j
@Service
public class TokenProvider {
    // application.yml에 설정한 jwt.secretKey를 가져옴
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // 토큰 생성
    public String create(User user) {
        Date now = new Date(); // 현재 시간
        Date validity = new Date(now.getTime() + 1000 * 60 * 30); // 30분 뒤 만료
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // HS256 알고리즘, secretKey로 서명
                .setSubject(user.getStudentId())
                .setIssuer("demo app")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public String validateAndGetStudentId(String token, HttpServletResponse response) throws IOException {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();

            if (expirationDate.before(currentDate)) {
                throw new ExpiredJwtException(null, null, "Token has expired");
            }

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}
