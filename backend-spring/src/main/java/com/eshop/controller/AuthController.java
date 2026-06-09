package com.eshop.controller;

import com.eshop.common.Result;
import com.eshop.entity.User;
import com.eshop.security.JwtUtil;
import com.eshop.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    /** 登录 */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody LoginReq req) {
        User user = userService.login(req.username, req.password);
        String token = jwtUtil.generate(user.getId(), user.getUsername());
        return Result.ok(Map.of(
            "token", token,
            "userId", user.getId(),
            "username", user.getUsername(),
            "nickname", user.getNickname()
        ));
    }

    public static class LoginReq {
        public String username;
        public String password;
    }
}
