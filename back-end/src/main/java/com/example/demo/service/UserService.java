package com.example.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.controller.config.PasswordConfig;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordConfig passwordConfig;

    public UserService(UserRepository userRepository, PasswordConfig passwordConfig) {
        this.userRepository = userRepository;
        this.passwordConfig = passwordConfig;
    }

    private User findUserById(String id) {
        return userRepository.findUserById(id);
    }

    public boolean isVerifyUser(User user) {
        User findUser = findUserById(user.getId());
        if (findUser == null) {
            throw new NullPointerException("findUser variable value is null");
        }

        Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder(
            passwordConfig.getSaltLength(),
            passwordConfig.getHashLength(),
            passwordConfig.getParallelism(),
            passwordConfig.getMemory(),
            passwordConfig.getIterations()
        );

        String springBouncyHash = argon2PasswordEncoder.encode(user.getPassword());

        if (!argon2PasswordEncoder.matches(springBouncyHash, findUser.getPassword())) {
            throw new IllegalArgumentException("유저의 비밀번호가 일치하지 않음");
        }

        return true;
    }

    public void insertUser(User user) {
        Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder(
            passwordConfig.getSaltLength(),
            passwordConfig.getHashLength(),
            passwordConfig.getParallelism(),
            passwordConfig.getMemory(),
            passwordConfig.getIterations()
        );
        String springBouncyHash = argon2PasswordEncoder.encode(user.getPassword());
        user.setPassword(springBouncyHash);
        userRepository.insertUser(user);
    }

    public ResponseEntity<Boolean> isIdExists(String id) {
        boolean result = userRepository.isIdExists(id);
        return ResponseEntity.ok().body(result);
    }
}