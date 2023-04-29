package OSSP.demo.service.security;

import OSSP.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Value;

import java.util.Date;

public class TokenProvider {
    @Value("${jwt.secretKey}")
    private String secretKey;

    public String create(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 1000 * 60 * 30);
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .setSubject(user.getStudentId())
                .setIssuer("demo app")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public String validateAndGetStudentId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
