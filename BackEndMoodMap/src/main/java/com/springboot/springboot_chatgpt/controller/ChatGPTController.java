//C:\Users\fabio\OneDrive\Escritorio\Proyecto-Capstone-MoodMap-2025-main\Fase 2\Evidencias Proyecto MoodMap\BackEndMoodMap\src\main\java\com\springboot\springboot_chatgpt\controller\ChatGPTController.java
package com.springboot.springboot_chatgpt.controller;

import com.springboot.springboot_chatgpt.dto.request.chatAi.PromptRequest;
import com.springboot.springboot_chatgpt.service.ChatGPTService;
import org.springframework.web.bind.annotation.*;

//cambiar posteriormente
@CrossOrigin("*")
@RestController
public class ChatGPTController {

    private final ChatGPTService chatGPTService;

    public ChatGPTController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping("/api/chat")
    public String chat(@RequestBody PromptRequest promptRequest) {
        System.out.println("LLEGÓ AL CONTROLADOR");
        System.out.println("Modelo: " + promptRequest.getModel());
        System.out.println("Primer mensaje: " + promptRequest.getMessages().get(0).getContent());
        return chatGPTService.getChatResponse(promptRequest);
    }
}
