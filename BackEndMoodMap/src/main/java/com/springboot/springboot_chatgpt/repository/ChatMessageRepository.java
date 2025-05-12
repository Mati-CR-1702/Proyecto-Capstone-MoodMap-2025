package com.springboot.springboot_chatgpt.repository;

import com.springboot.springboot_chatgpt.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySession_Id(Long sessionId);
}
