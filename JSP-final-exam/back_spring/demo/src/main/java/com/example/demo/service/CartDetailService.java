package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.CartDetail;
import com.example.demo.repository.CartDetailRepository;

@Service
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;

    public CartDetailService(CartDetailRepository cartDetailRepository) {
        this.cartDetailRepository = cartDetailRepository;
    }

    public ResponseEntity<List<CartDetail>> findCartDetailById(String user_id) {
        return cartDetailRepository.findCartDetailById(user_id);
    }

    public void addBooktoCart(String user_id, int book_id, int quantity) {
        cartDetailRepository.insertCartDetail(user_id, book_id, quantity);
    }

    public void upadteQuantityByCount(int item_id, int count) {
        cartDetailRepository.updateQuantityByCount(item_id, count);
    }

    public boolean isExistsForID(String user_id, int book_id) {
        return cartDetailRepository.isExistsForID(user_id, book_id);
    }

    public void deleteCartById(String user_id, int item_id) {
        cartDetailRepository.deleteCartById(user_id, item_id);
    }

    public ResponseEntity<Integer> totalPrice(String user_id) {
        return cartDetailRepository.totalPrice(user_id);
    }
}
