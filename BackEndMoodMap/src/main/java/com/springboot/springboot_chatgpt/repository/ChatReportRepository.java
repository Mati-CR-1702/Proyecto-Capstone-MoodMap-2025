package com.springboot.springboot_chatgpt.repository;

import com.springboot.springboot_chatgpt.entity.ChatReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatReportRepository extends JpaRepository<ChatReport, Long> {
    ChatReport findBySession_Id(Long sessionId);
}
