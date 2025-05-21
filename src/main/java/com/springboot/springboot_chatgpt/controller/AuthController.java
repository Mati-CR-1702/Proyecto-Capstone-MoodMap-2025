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

        System.out.println("(+) Login recibido:");
        System.out.println("Username: " + request.getUsername());
        System.out.println("Password: " + request.getPassword());

        User user = userRepository.findByUsername(request.getUsername().toLowerCase());

        if (user == null || !bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("(x) Usuario no encontrado.");
            return ResponseEntity.status(401).body("Usuario o contraseña incorrecta");
        } else {
            System.out.println("(+) Usuario encontrado: " + user.getUsername());
            System.out.println("(+) Contraseña almacenada (hash): " + user.getPassword());
            boolean match = bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword());
            System.out.println("(?) ¿Coincide la contraseña?: " + match);

            if (!match) {
                return ResponseEntity.status(401).body("Usuario o contraseña incorrecta");
            }
        }

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername()
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/secret-question")
    public ResponseEntity<String> getSecretQuestion(@RequestParam String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.getSecretQuestion());
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername());

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
