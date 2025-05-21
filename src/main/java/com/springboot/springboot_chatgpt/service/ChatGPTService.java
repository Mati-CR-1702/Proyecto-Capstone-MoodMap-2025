package com.springboot.springboot_chatgpt.service;

import com.springboot.springboot_chatgpt.dto.request.chatAi.ChatGPTRequest;
import com.springboot.springboot_chatgpt.dto.request.chatAi.ChatGPTResponse;
import com.springboot.springboot_chatgpt.dto.request.chatAi.PromptRequest;
import com.springboot.springboot_chatgpt.dto.response.chat.ChatResponseWithSession;
import com.springboot.springboot_chatgpt.entity.ChatMessage;
import com.springboot.springboot_chatgpt.entity.ChatReport;
import com.springboot.springboot_chatgpt.entity.ChatSession;
import com.springboot.springboot_chatgpt.entity.User;
import com.springboot.springboot_chatgpt.repository.ChatMessageRepository;
import com.springboot.springboot_chatgpt.repository.ChatReportRepository;
import com.springboot.springboot_chatgpt.repository.ChatSessionRepository;
import com.springboot.springboot_chatgpt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatGPTService {

    private final RestClient restCLient;
    private final UserRepository userRepository;
    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatReportRepository chatReportRepository;

    public ChatGPTService(RestClient restClient,
                          UserRepository userRepository,
                          ChatSessionRepository chatSessionRepository,
                          ChatMessageRepository chatMessageRepository,
                          ChatReportRepository chatReportRepository) {
        this.restCLient = restClient;
        this.userRepository = userRepository;
        this.chatSessionRepository = chatSessionRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.chatReportRepository = chatReportRepository;
    }

    @Value("${openapi.api.prompt}")
    private String systemPrompt;

    @Value("${openapi.api.key}")
    private String apiKey;

    @Value("${openapi.api.model}")
    private String model;

    @Transactional
    public ChatResponseWithSession getChatResponse(PromptRequest promptRequest) {

        User user = userRepository.findById(promptRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ChatSession session;
        if (promptRequest.getSessionId() == null) {
            session = new ChatSession();
            session.setUser(user);
            session.setStartedAt(LocalDateTime.now());
            chatSessionRepository.save(session);
        } else {
            session = chatSessionRepository.findById(promptRequest.getSessionId())
                    .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));
        }

        String userMessage = promptRequest.getMessages().get(0).getContent();

        //  Guardar mensaje del usuario
        ChatMessage userMsg = new ChatMessage();
        userMsg.setSession(session);
        userMsg.setMessage(userMessage);
        userMsg.setFromUser(true);
        userMsg.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(userMsg);

        // CHAT CON AI
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
                model,
                List.of(
                        new ChatGPTRequest.Message("system", systemPrompt),
                        new ChatGPTRequest.Message("user", userMessage)
                )
        );

        ChatGPTResponse response = restCLient.post()
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(chatGPTRequest)
                .retrieve()
                .body(ChatGPTResponse.class);

        String aiResponse = response.choices().get(0).message().content();

        //  Guardar respuesta de la IA
        ChatMessage aiMsg = new ChatMessage();
        aiMsg.setSession(session);
        aiMsg.setMessage(aiResponse);
        aiMsg.setFromUser(false); //
        aiMsg.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(aiMsg);

        return new ChatResponseWithSession(aiResponse, session.getId());
    }

    @Transactional
    public void generarReporte(Long sessionId) {
        ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        List<ChatMessage> mensajes = chatMessageRepository.findBySession_Id(sessionId);

        if (mensajes.isEmpty()) return;

        String fullChat = mensajes.stream()
                .map(m -> (m.isFromUser() ? "Usuario: " : "IA: ") + m.getMessage())
                .collect(Collectors.joining("\n"));

        String prompt = """
            Resume la siguiente conversación entre un usuario y una IA, destacando:
            - Emociones expresadas
            - Temas principales
            - Palabras o frases que puedan indicar alerta emocional
            - Un posible diagnóstico preliminar o recomendación general

            Conversación:
            """ + fullChat;

        String resumen = openAiSummarize(prompt);

        ChatReport report = new ChatReport();
        report.setSession(session);
        report.setSummary(resumen);
        report.setGeneratedAt(LocalDateTime.now());
        chatReportRepository.save(report);

        session.setEndedAt(LocalDateTime.now());
        chatSessionRepository.save(session);
    }

    private String openAiSummarize(String prompt) {
        ChatGPTRequest request = new ChatGPTRequest(
                model,
                List.of(
                        new ChatGPTRequest.Message("system", "Actúa como un terapeuta clínico y genera un resumen psicológico."),
                        new ChatGPTRequest.Message("user", prompt)
                )
        );

        ChatGPTResponse response = restCLient.post()
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(request)
                .retrieve()
                .body(ChatGPTResponse.class);

        return response.choices().get(0).message().content();
    }

}
