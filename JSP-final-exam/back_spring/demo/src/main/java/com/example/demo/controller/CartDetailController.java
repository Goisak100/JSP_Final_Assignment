package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CartDetail;
import com.example.demo.service.CartDetailService;
import com.example.demo.service.TokenService;

@RestController
@RequestMapping("/api")
public class CartDetailController {
    private final CartDetailService cartDetailService;
    private final TokenService tokenService;

    public CartDetailController(CartDetailService cartDetailService, TokenService tokenService) {
        this.cartDetailService = cartDetailService;
        this.tokenService = tokenService;
    }

    @GetMapping("/findCartDetailById")
    public ResponseEntity<List<CartDetail>> findCartDetailById(
        @RequestHeader("Authorization") String authorizationHeader) {
            String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
            String user_id = "";
            if (tokenService.validateToken(token)) {
                user_id = tokenService.extraUserIdFromToken(token);
            }

            return cartDetailService.findCartDetailById(user_id);
    }

    @PostMapping("/addBookToCart")
    public void addBookToCart(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("book_id") int book_id,
        @RequestParam("quantity") int quantity
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        String user_id = "";
        if (tokenService.validateToken(token)) {
            user_id = tokenService.extraUserIdFromToken(token);
        }

        if (cartDetailService.isExistsForID(user_id, book_id)) {
            return;
        }

        cartDetailService.addBooktoCart(user_id, book_id, quantity);
    }

    @PostMapping("/updateQuantityByCount")
    public void updateQuantityByCount(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("item_id") int item_id,
        @RequestParam("count") int count
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        if (!tokenService.validateToken(token)) {
            return;
        }

        cartDetailService.upadteQuantityByCount(item_id, count);
    }

    @PostMapping("/deleteCartById")
    public void deleteCartById(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("item_id") int item_id
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        String user_id = "";
        if (tokenService.validateToken(token)) {
            user_id = tokenService.extraUserIdFromToken(token);
        }

        cartDetailService.deleteCartById(user_id, item_id);
    }

    @PostMapping("/totalPrice")
    public ResponseEntity<Integer> totalPrice(
        @RequestHeader("Authorization") String authorizationHeader) {
            String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
            String user_id = "";
            if (tokenService.validateToken(token)) {
                user_id = tokenService.extraUserIdFromToken(token);
            }

            return cartDetailService.totalPrice(user_id);
        }
}