package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDetail {
    private int id;
    private String imageUrl;
    private String name;
    private int price;
    private int quantity;
}