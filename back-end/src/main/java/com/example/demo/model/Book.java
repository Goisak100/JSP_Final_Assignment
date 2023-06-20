package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book {
    private int id;
    private String name;
    private String author;
    private String translator;
    private String publisher;
    private String publicationDate;
    private int price;
    private String imageUrl;
    private String introduce;

    public Book(int id, String name, String author, String translator, String publisher, String publicationDate, int price, String imageUrl) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.translator = translator;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}