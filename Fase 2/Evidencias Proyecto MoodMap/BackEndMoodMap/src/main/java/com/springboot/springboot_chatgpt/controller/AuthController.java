package com.springboot.springboot_chatgpt.controller;

import com.springboot.springboot_chatgpt.dto.request.login.LoginRequest;
import com.springboot.springboot_chatgpt.dto.request.login.ResetPasswordRequest;
import com.springboot.springboot_chatgpt.dto.response.auth.AuthResponse;
import com.springboot.springboot_chatgpt.entity.User;
import com.springboot.springboot_chatgpt.repository.UserRepository;
import com.springboot.springboot_chatgpt.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserRepository userRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String normalizedUsername = request.getUsername().trim().toLowerCase();

        User user = userRepository.findByUsername(normalizedUsername);

        if (user == null || !bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Usuario o contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName()
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/secret-question")
    public ResponseEntity<String> getSecretQuestion(@RequestParam String username) {
        User user = userRepository.findByUsername(username.trim().toLowerCase());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.getSecretQuestion());
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername().trim().toLowerCase());

        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        if (!bCryptPasswordEncoder.matches(request.getSecretAnswer(), user.getSecretAnswer())) {
            return ResponseEntity.status(401).body("Respuesta secreta incorrecta");
        }

        user.setPassword(bCryptPasswordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Contraseña actualizada exitosamente");
    }






}
