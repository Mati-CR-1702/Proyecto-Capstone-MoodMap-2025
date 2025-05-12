package com.springboot.springboot_chatgpt.repository;

import com.springboot.springboot_chatgpt.entity.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    List<ChatSession> findByUser_Id(int userId);

}
