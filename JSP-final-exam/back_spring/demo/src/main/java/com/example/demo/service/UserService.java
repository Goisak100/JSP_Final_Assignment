package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User findUserById(String id) {
        return userRepository.findUserById(id);
    }

    public boolean isVerifyUser(User user) {
        User findUser = findUserById(user.getId());
        if (findUser == null) {
            throw new NullPointerException("findUser variable value is null");
        }

        if (!findUser.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("유저의 비밀번호가 일치하지 않음");
        }

        return true;
    }

    public void insertUser(User user) {
        userRepository.insertUser(user);
    }
}