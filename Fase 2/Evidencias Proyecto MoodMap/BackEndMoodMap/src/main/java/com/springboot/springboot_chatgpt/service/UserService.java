package com.springboot.springboot_chatgpt.service;


import com.springboot.springboot_chatgpt.dto.request.profile.UpdateProfileRequest;
import com.springboot.springboot_chatgpt.entity.User;
import com.springboot.springboot_chatgpt.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, BCryptPasswordEncoder bCryptPasswordEncoder1) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder1;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        
        if (user.getSecretAnswer() != null) {
            user.setSecretAnswer(bCryptPasswordEncoder.encode(user.getSecretAnswer()));
        }

        return userRepository.save(user);
    }

    public  User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id){
        userRepository.deleteById(id);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUserProfile(String currentUsername, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(currentUsername);

        if (user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getUsername() != null) user.setUsername(request.getUsername());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        }

        if (request.getSecretQuestion() != null) user.setSecretQuestion(request.getSecretQuestion());

        if (request.getSecretAnswer() != null && !request.getSecretAnswer().isEmpty()) {
            user.setSecretAnswer(bCryptPasswordEncoder.encode(request.getSecretAnswer()));
        }

        return userRepository.save(user);
    }

}
