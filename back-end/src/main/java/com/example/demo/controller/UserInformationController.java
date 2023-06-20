package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserInformation;
import com.example.demo.service.TokenService;
import com.example.demo.service.UserInformationService;

@RestController
@RequestMapping("/api")
public class UserInformationController {
    private final UserInformationService userInformationService;
    private final TokenService tokenService;

    public UserInformationController(UserInformationService userInformationService, TokenService tokenService) {
        this.userInformationService = userInformationService;
        this.tokenService = tokenService;
    }

    @PostMapping("/findUserInformationById")
    public ResponseEntity<UserInformation> findUserInformationById(
        @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        String userId = "";
        if (tokenService.validateToken(token)) {
            userId = tokenService.extraUserIdFromToken(token);
        }

        return userInformationService.findUserInformationById(userId);
    }

    @PostMapping("/updateUserInformationById")
    public void updateUserInformationById(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("address") String address,
        @RequestParam("addressDetail") String addressDetail,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        String userId = "";
        if (tokenService.validateToken(token)) {
            userId = tokenService.extraUserIdFromToken(token);
        }

        UserInformation userInformation = new UserInformation(userId, address, addressDetail, phoneNumber);
        userInformationService.updateUserInformationById(userInformation);
    }

    // orderId기반으로 주문자의 정보를 가져오는 방법이 필요하다.
    @PostMapping("/getUserInformationByOrderId")
    public ResponseEntity<UserInformation> getUserInformationByOrderId(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("orderId") int orderId)
    {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.badRequest().build();
        }
        
        ResponseEntity<UserInformation> result = userInformationService.getUserInformationByOrderId(orderId);
        return result;
    }
}
