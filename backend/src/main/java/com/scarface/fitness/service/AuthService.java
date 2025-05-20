
package com.scarface.fitness.service;

import com.scarface.fitness.dto.AuthResponse;
import com.scarface.fitness.dto.LoginRequest;
import com.scarface.fitness.dto.SignupRequest;
import com.scarface.fitness.model.Profile;
import com.scarface.fitness.model.User;
import com.scarface.fitness.repository.UserRepository;
import com.scarface.fitness.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        Profile profile = Profile.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .build();

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .profile(profile)
                .build();

        profile.setUser(user);
        
        userRepository.save(user);
        
        String token = jwtService.generateToken(user);
        
        return AuthResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user);
        
        return AuthResponse.builder()
                .token(token)
                .user(user)
                .build();
    }
}
