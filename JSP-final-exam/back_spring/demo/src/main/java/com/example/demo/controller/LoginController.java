package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.TokenService;
import com.example.demo.service.UserService;


@RestController
@RequestMapping("/api")
public class LoginController {
    
    @Value("${security.jwt.secretKey}")
    private String SECRET_KEY;

    private final UserService userService;
    private final TokenService tokenService;

    public LoginController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping("/processLogin")
    public ResponseEntity<Map<String, String>> processLogin(@RequestBody User user) {

        boolean isLoginSuccess = userService.isVerifyUser(user);
        if (!isLoginSuccess) {
            Map<String, String> hashMap = new HashMap<>();
            hashMap.put("result", "로그인 실패");
            return ResponseEntity.badRequest().body(hashMap);
        }

        String token = "";
        if (user.getId().equals("isakgo")) {
            token = tokenService.createAdminToken(user);
        } else {
            token = tokenService.createToken(user);
        }

        String role = tokenService.extraRoleFromToken(token);

        // 이후 token에서 역할을 추출한 후, 토큰과 함께 반환
        Map<String, String> hashMap = new HashMap<>();
        hashMap.put("token", token);
        hashMap.put("role", role);
        return ResponseEntity.ok().body(hashMap);
    }
}


// 오늘 해야 할 거 다시 정리
// 1. JWT로 토큰 생성 후 반환
// 2. JWT 토큰을 session storage에 저장
// 3. JWT 토큰에 따른 react 측의 UI 헤더를 갱신
// 4. 특정 페이지에 접근할 때 session storage에 토큰을 가지고 있는지 체크 -> 없으면 로그인 페이지로 이동
// 5. 요청을 보냈을 때 해당 토큰이 유효한지 서버에서 확인해야 한다.

// 6. 로그인 페이지 만들기
// 7. 회원가입 페이지 만들기
// 8. 로그아웃 기능 만들기