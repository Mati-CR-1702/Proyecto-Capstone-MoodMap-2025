package com.springboot.springboot_chatgpt.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ChatSession session;

    @Column(columnDefinition = "TEXT")
    private String message;

    private boolean fromUser;

    private LocalDateTime timestamp;
}
