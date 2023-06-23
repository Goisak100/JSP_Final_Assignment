package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class RegisterController {
    
    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/processRegister")
    public void processRegister(@RequestBody User user) {
        userService.insertUser(user);
    }

    @PostMapping("/isIdExists")
    public ResponseEntity<Boolean> isIdExists(@RequestParam("id") String id) {
        return userService.isIdExists(id);
    }
}