package com.example.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.UserInformation;
import com.example.demo.repository.UserInformationRepository;

@Service
public class UserInformationService {
    private final UserInformationRepository userInformationRepository;

    public UserInformationService(UserInformationRepository userInformationRepository) {
        this.userInformationRepository = userInformationRepository;
    }

    public ResponseEntity<UserInformation> findUserInformationById(String userId) {
        return userInformationRepository.findUserInformationById(userId);
    }
    
    public void updateUserInformationById(UserInformation userInformation) {
        if (userInformationRepository.isExistsUserInformation(userInformation)) {
            userInformationRepository.updateUserInformationById(userInformation);
        } else {
            userInformationRepository.insertUesrInformation(userInformation);
        }
    }

    public ResponseEntity<UserInformation> getUserInformationByOrderId(int orderId) {
        UserInformation result = userInformationRepository.getUserInformationByOrderId(orderId);
        return ResponseEntity.ok().body(result);
    }
}