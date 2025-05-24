package com.springboot.springboot_chatgpt.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String username;

    private String password;
    private String secretQuestion;
    private String secretAnswer;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatSession> chatSessions;

    @PrePersist
    @PreUpdate
    private void normalizeUsername() {
        if (this.username != null) {
            this.username = this.username.trim().toLowerCase();
        }
    }
}
