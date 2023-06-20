package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;
import com.example.demo.service.OrderService;
import com.example.demo.service.TokenService;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;
    private final TokenService tokenService;

    public OrderController(OrderService orderService, TokenService tokenService) {
        this.orderService = orderService;
        this.tokenService = tokenService;
    }

    @PostMapping("/order")
    public void order(
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

        orderService.order(userId, address, addressDetail, phoneNumber);
    }

    @PostMapping("/getAllOrders")
    public ResponseEntity<List<Order>> getAllOrders(
        @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        String userId = "";
        if (tokenService.validateToken(token)) {
            userId = tokenService.extraUserIdFromToken(token);
        }
        
        return orderService.getAllOrders(userId);
    }

    @PostMapping("/getOrderDetails")
    public ResponseEntity<List<OrderDetail>> getOrderDetails(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("orderId") int orderId
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.badRequest().build();
        }

        return orderService.getOrderDetails(orderId);
    }
}
