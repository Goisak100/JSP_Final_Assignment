package com.example.demo.controller.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@ConfigurationProperties(prefix = "argon2.password.config")
@Getter
public class PasswordConfig {
    private int saltLength;
    private int hashLength;
    private int parallelism;
    private int memory;
    private int iterations;
}