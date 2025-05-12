package com.springboot.springboot_chatgpt.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class ChatReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private ChatSession session;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private LocalDateTime generatedAt;
}
