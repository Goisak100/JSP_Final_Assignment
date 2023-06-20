package com.example.demo.service;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.utility.JwtUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    @Value("${security.jwt.secretKey}")
    private String SECRET_KEY;

    public String createToken(User user) {
        
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        
        return Jwts.builder()
            .setSubject(user.getId())
            .claim("role", "user")
            .signWith(key)
            .compact();
    }

    public String createAdminToken(User user) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        
        return Jwts.builder()
            .setSubject(user.getId())
            .claim("role", "admin")
            .signWith(key)
            .compact();
    }

    public boolean validateToken(String token) {
        return JwtUtil.validateToken(token);
    }

    public String extraUserIdFromToken(String token) {
        return JwtUtil.extraUserIdFromToken(token);
    }

    public String extraRoleFromToken(String token) {
        return JwtUtil.extraRoleFromToken(token);
    }

    public String extraTokenFromAuthorizationHeader(String authorizationHeader) {
        return JwtUtil.extraTokenFromAuthorizationHeader(authorizationHeader);
    }
}