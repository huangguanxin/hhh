package com.eshop.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor(
            "eshop-jwt-secret-key-256bits-long!!" .getBytes());
    private final long expiration = 24 * 60 * 60 * 1000; // 24h

    /** 生成 Token */
    public String generate(Long userId, String username) {
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("username", username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    /** 从 Token 获取 userId */
    public Long getUserId(String token) {
        return Long.parseLong(parse(token).getSubject());
    }

    /** 验证 Token */
    public boolean validate(String token) {
        try {
            parse(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims parse(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
    }
}
