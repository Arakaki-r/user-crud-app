package com.ryota.hello.controller;

import com.ryota.hello.dto.LoginRequest;
import com.ryota.hello.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if ("admin".equals(request.getUsername()) &&
            "admin".equals(request.getPassword())) {

            String token = jwtUtil.generateToken(request.getUsername());

            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401)
                .body(Map.of("message", "Invalid login"));
    }
}