package com.springboot.springboot_chatgpt.dto.response.chat;

public class ChatResponseWithSession {
    private String response;
    private Long sessionId;

    public ChatResponseWithSession(String response, Long sessionId) {
        this.response = response;
        this.sessionId = sessionId;
    }

    public String getResponse() {
        return response;
    }

    public Long getSessionId() {
        return sessionId;
    }
}
