package com.example.demo.utility;

import java.nio.charset.StandardCharsets;
import java.security.Key;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

public class JwtUtil {

    private static String SECRET_KEY = "wcL9j01ir23NgiffvYLo2cwtHR7auPW0OGK02C6RlbQ=";

    public static boolean validateToken(String token) {

        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("토큰이 유효하지 않습니다.");
            return false;
        }
    }

    public static String extraUserIdFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
            return claims.getSubject();
        } catch (SignatureException ex) {
            System.out.println("유저 이름을 추출할 수 없음");
            return null;
        }
    }

    public static String extraRoleFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
            return claims.get("role", String.class);
        } catch (SignatureException ex) {
            System.out.println("토큰에서 역할을 추출할 수 없음");
            return null;
        }
    }

    public static String extraTokenFromAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader != null &&
            authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7);
            }
        return null;
    }
}
