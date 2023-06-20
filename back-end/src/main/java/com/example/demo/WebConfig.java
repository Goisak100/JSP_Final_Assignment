package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로 패턴 허용
                .allowedOriginPatterns("*") // 허용할 오리진들
                .allowedMethods("*") // 모든 HTTP 메소드 허용
                .allowCredentials(true) // 쿠키 및 자격 증명 허용
                .maxAge(3600); // 사전 전달 요청(Preflight)의 캐시 시간 설정
    }
}
