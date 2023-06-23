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

        System.out.println("유저 입력 아이디: " + user.getId());
        System.out.println("유저 입력 비먼: " + user.getPassword());

        boolean isLoginSuccess = userService.isVerifyUser(user);
        if (!isLoginSuccess) {
            Map<String, String> hashMap = new HashMap<>();
            hashMap.put("result", "로그인 실패");
            return ResponseEntity.badRequest().body(hashMap);
        }

        String token = "";
        if (user.getId().equals("admin")) {
            token = tokenService.createAdminToken(user);
        } else {
            token = tokenService.createToken(user);
        }

        String role = tokenService.extraRoleFromToken(token);

        Map<String, String> hashMap = new HashMap<>();
        hashMap.put("token", token);
        hashMap.put("role", role);
        return ResponseEntity.ok().body(hashMap);
    }
}