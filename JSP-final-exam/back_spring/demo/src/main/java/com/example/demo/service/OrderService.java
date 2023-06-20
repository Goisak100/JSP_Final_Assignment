package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;
import com.example.demo.repository.CartDetailRepository;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartDetailRepository cartDetailRepository;

    public OrderService(OrderRepository orderRepository, CartDetailRepository cartDetailRepository) {
        this.orderRepository = orderRepository;
        this.cartDetailRepository = cartDetailRepository;
    }

    @Transactional
    public void order(String userId, String address, String addressDetail, String phoneNumber) {
            orderRepository.insertOrder(userId, address, addressDetail, phoneNumber);
            orderRepository.insertOrderDetail(userId);
            cartDetailRepository.deleteCartById(userId);
    }

    public ResponseEntity<List<Order>> getAllOrders(String userId) {
        List<Order> result = orderRepository.getAllOrders(userId);
        return ResponseEntity.ok().body(result);
    }

    public ResponseEntity<List<OrderDetail>> getOrderDetails(int orderId) {
        List<OrderDetail> result = orderRepository.getOrderDetails(orderId);
        return ResponseEntity.ok().body(result);
    }
}
