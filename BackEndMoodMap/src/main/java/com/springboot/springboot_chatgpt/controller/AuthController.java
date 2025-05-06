package com.springboot.springboot_chatgpt.controller;

import com.springboot.springboot_chatgpt.dto.request.login.LoginRequest;
import com.springboot.springboot_chatgpt.dto.request.login.ResetPasswordRequest;
//import com.springboot.springboot_chatgpt.dto.response.auth.AuthResponse;
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
        User user = userRepository.findByUsername(request.getUsername());

        if (user == null || !bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Usuario o contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(user);

        // Incluye información del usuario en la respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername()
        ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody User request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.status(400).body("El nombre de usuario ya existe");
        }

        request.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        request.setSecretAnswer(bCryptPasswordEncoder.encode(request.getSecretAnswer())); // si lo estás encriptando

        userRepository.save(request);
        return ResponseEntity.ok("Usuario registrado exitosamente");
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
