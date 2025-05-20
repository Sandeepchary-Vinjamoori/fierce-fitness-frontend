
package com.scarface.fitness.controller;

import com.scarface.fitness.dto.AuthResponse;
import com.scarface.fitness.dto.LoginRequest;
import com.scarface.fitness.dto.SignupRequest;
import com.scarface.fitness.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/session")
    public ResponseEntity<String> getSession() {
        // This endpoint would verify if the user's session is still valid
        return ResponseEntity.ok("Valid session");
    }
}
