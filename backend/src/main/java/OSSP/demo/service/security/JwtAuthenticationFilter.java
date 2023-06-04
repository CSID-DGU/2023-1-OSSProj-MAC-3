package OSSP.demo.service.security;

import OSSP.demo.model.ResponseDto;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

// 토큰을 검증하고 SecurityContext에 저장하는 역할
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private TokenProvider tokenProvider; // 토큰 생성 및 검증

    // 토큰을 검증하고 SecurityContext에 저장, 토큰이 없거나 올바르지 않으면 401 에러
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);
            log.info("필터가 동작합니다.");
            if (token != null && !token.equalsIgnoreCase("null")) {
                String studentId = tokenProvider.validateAndGetStudentId(token); // 토큰에서 학번 추출
                log.info("학번: {}", studentId);
                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        studentId,
                        null,
                        AuthorityUtils.NO_AUTHORITIES); // 토큰에서 추출한 학번으로 인증 객체 생성
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // 인증 객체에 요청 정보 추가
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext(); // SecurityContext 생성
                securityContext.setAuthentication(authentication); // SecurityContext에 인증 객체 저장
                SecurityContextHolder.setContext(securityContext); // SecurityContextHolder에 SecurityContext 저장
            }
        } catch (ExpiredJwtException e) {
            // 토큰이 만료된 경우 401 Unauthorized 상태 코드 반환
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었습니다.");
            return;
        } catch (Exception e) {
            // 그 외의 예외 발생 시 401 Unauthorized 상태 코드 반환
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증에 실패하였습니다.");
            return;
        }
        filterChain.doFilter(request, response); // 다음 필터로 넘어감
    }


    // 헤더에서 토큰 추출
    private String parseBearerToken(HttpServletRequest request) {
        // 헤더에 토큰이 없거나 올바르지 않으면 null 반환
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            log.warn("헤더에 토큰이 없거나 올바르지 않습니다.");
            return null;
        }
        // 헤더에서 토큰 추출
        return header.substring(7);
    }
}
