package com.springboot.springboot_chatgpt.dto.request.profile;


import lombok.Data;

@Data
public class UpdateProfileRequest {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String secretQuestion;
    private String secretAnswer;
}
