package OSSP.demo.service.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

// Spring Security 설정을 위한 클래스
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter; // jwtAuthenticationFilter는 토큰을 검증하고 인증

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()//cors 허용
                .and()
                .csrf().disable() //csrf 토큰 비활성화
                .httpBasic().disable() //기본 설정 사용 안함
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//세션 사용 안함
                .and()
                .authorizeRequests().antMatchers("/", "/auth/**", "/{memberId}/upload", "/download/{fileId}/{fileVersionId}",
                "/delete/file/{fileId}", "/delete/fileVersion/{fileVersionId}").permitAll()//해당 url은 인증 없이 접근 가능
                .anyRequest().authenticated(); //그 외의 url은 인증 필요
        http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class); //jwtAuthenticationFilter를 CorsFilter 전에 추가
    }
}