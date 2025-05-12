package com.springboot.springboot_chatgpt.controller;

import com.springboot.springboot_chatgpt.dto.request.chatAi.PromptRequest;
import com.springboot.springboot_chatgpt.dto.response.ChatResponseWithSession;
import com.springboot.springboot_chatgpt.service.ChatGPTService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatGPTController {

    private final ChatGPTService chatGPTService;

    public ChatGPTController(ChatGPTService chatGPTService){
        this.chatGPTService = chatGPTService;
    }

    @PostMapping
    public ChatResponseWithSession chat (@RequestBody PromptRequest promptRequest){
        return chatGPTService.getChatResponse(promptRequest);
    }

    // NUEVO ENDPOINT para cerrar sesión y generar reporte
    @PostMapping("/cerrar-sesion/{sessionId}")
    public String cerrarSesionYGenerarReporte(@PathVariable Long sessionId) {
        chatGPTService.generarReporte(sessionId);
        return "Sesión cerrada y reporte generado con éxito.";
    }
}
