package com.springboot.springboot_chatgpt.controller;


import com.springboot.springboot_chatgpt.dto.response.auth.ChatReportResponse;
import com.springboot.springboot_chatgpt.entity.ChatReport;
import com.springboot.springboot_chatgpt.repository.ChatReportRepository;
import com.springboot.springboot_chatgpt.repository.ChatSessionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin("*")
public class ChatReportController {

    private final ChatReportRepository chatReportRepository;
    private final ChatSessionRepository chatSessionRepository;

    public ChatReportController(ChatReportRepository chatReportRepository,
                                    ChatSessionRepository chatSessionRepository) {
        this.chatReportRepository = chatReportRepository;
        this.chatSessionRepository = chatSessionRepository;
    }

    //  Obtener todos los reportes de un usuario
    @GetMapping("/usuario/{userId}")
    public List<ChatReportResponse> getReportesPorUsuario(@PathVariable int userId) {
        return chatSessionRepository.findByUser_Id(userId).stream()
                .map(session -> chatReportRepository.findBySession_Id(session.getId()))
                .filter(report -> report != null)
                .map(report -> new ChatReportResponse(
                        report.getSession().getId(),
                        report.getSummary(),
                        report.getGeneratedAt()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/detalle/{sessionId}")
    public ChatReportResponse getReportePorSesion(@PathVariable Long sessionId) {
        ChatReport report = chatReportRepository.findBySession_Id(sessionId);
        if (report == null) {
            throw new RuntimeException("Reporte no encontrado");
        }
        return new ChatReportResponse(
                report.getSession().getId(),
                report.getSummary(),
                report.getGeneratedAt()
        );
    }
}
