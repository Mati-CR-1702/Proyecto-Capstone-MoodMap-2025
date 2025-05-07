package com.springboot.springboot_chatgpt.service;

import com.springboot.springboot_chatgpt.dto.request.chatAi.ChatGPTRequest;
import com.springboot.springboot_chatgpt.dto.request.chatAi.ChatGPTResponse;
import com.springboot.springboot_chatgpt.dto.request.chatAi.PromptRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class ChatGPTService {

    private final RestClient restClient;

    public ChatGPTService(RestClient restClient) {
        this.restClient = restClient;
    }

    @Value("${openapi.api.prompt}")
    private String systemPrompt;

    @Value("${openapi.api.key}")
    private String apiKey;

    @Value("${openapi.api.model}")
    private String model;

    public String getChatResponse(PromptRequest promptRequest) {
        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
            promptRequest.getModel(),
            List.of(
                new ChatGPTRequest.Message("system", systemPrompt),
                new ChatGPTRequest.Message("user", promptRequest.getMessages().get(0).getContent())
            )
        );

        try {
            ChatGPTResponse response = restClient.post()
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(chatGPTRequest)
                .retrieve()
                .body(ChatGPTResponse.class);

            return response.choices().get(0).message().content();
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED ||
                e.getStatusCode() == HttpStatus.FORBIDDEN ||
                e.getResponseBodyAsString().contains("insufficient_quota")) {
                return "Lo sentimos, el terapeuta no está disponible.";
            } else {
                throw e;
            }
        }
    }
}
