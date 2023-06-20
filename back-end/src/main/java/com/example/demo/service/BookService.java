package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;

@Service
public class BookService {
    
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public ResponseEntity<List<Book>> getBook() {
        return bookRepository.getBook();
    }

    public ResponseEntity<Book> getBookDetail(int id) {
        return bookRepository.getBookDetail(id);
    }

    public void addBook(Book book) {
        bookRepository.addBook(book);
    }

    public void removeBook(int book_id) {
        bookRepository.removeBook(book_id);
    }

    public void updateBookDetail(Book book) {
        bookRepository.updateBookDetail(book);
    }

    public String getImageUrlById(int book_id) {
        return bookRepository.getImageUrlById(book_id);
    }
}
