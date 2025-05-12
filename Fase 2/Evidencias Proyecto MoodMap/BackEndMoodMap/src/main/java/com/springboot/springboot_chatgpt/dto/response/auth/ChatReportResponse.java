package com.springboot.springboot_chatgpt.dto.response.auth;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatReportResponse {

    private Long sessionId;
    private String summary;
    private LocalDateTime generatedAt;

}
