package OSSP.demo.service.security;

import OSSP.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

// JWT 토큰 생성 및 검증을 위한 클래스
@Slf4j
@Service
public class TokenProvider {
    // application.yml에 설정한 jwt.secretKey를 가져옴
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    // 토큰 생성
    public Map<String, String> create(User user) {
        Date now = new Date(); // 현재 시간
        Date accessTokenValidity = new Date(now.getTime() + 1000 * 60 * 5); // 5분 뒤 만료
        Date refreshTokenValidity = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7일 뒤 만료
        String refreshToken = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // HS256 알고리즘, secretKey로 서명
                .setSubject(user.getStudentId())
                .setIssuer("demo app")
                .setIssuedAt(now)
                .compact();
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        vop.set(user.getId().toString(), refreshToken, refreshTokenValidity.getTime() - now.getTime(), TimeUnit.MILLISECONDS);
        String accessToken = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // HS256 알고리즘, secretKey로 서명
                .setSubject(user.getStudentId())
                .setIssuer("demo app")
                .setIssuedAt(now)
                .setExpiration(accessTokenValidity)
                .compact();
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    public String validateAndGetStudentId(String token) throws Exception {
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
    }

    public String validateRefreshTokenAndGetStudentId(String token) throws Exception {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            throw new Exception("Refresh Token is invalid");
        }
    }
}
