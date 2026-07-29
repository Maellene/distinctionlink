package com.example.distinctionlink.dto;

import com.example.distinctionlink.model.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private User.Role role;
}