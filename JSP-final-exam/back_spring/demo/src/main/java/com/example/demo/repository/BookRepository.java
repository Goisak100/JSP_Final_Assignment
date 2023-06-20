package com.example.demo.repository;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Book;

@Repository
public class BookRepository {
    
    private final JdbcTemplate jdbcTemplate;

    public BookRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Book> getBookRowMapper = (result, rowNumber) -> {
        return new Book(
            result.getInt("id"),
            result.getString("name"),
            result.getString("author"),
            result.getString("translator"),
            result.getString("publisher"),
            result.getString("publicationDate"),
            result.getInt("price"),
            result.getString("imageUrl")
        );
    };

    public ResponseEntity<List<Book>> getBook() {
        String sql = "select id, name, author, translator, publisher, publicationDate, price, imageUrl from books";
        List<Book> result = jdbcTemplate.query(sql, getBookRowMapper);
        return ResponseEntity.ok().body(result);
    }

    private final RowMapper<Book> getBookDetailRowMapper = (result, rowNumber) -> {
        return new Book(
            result.getInt("id"),
            result.getString("name"),
            result.getString("author"),
            result.getString("translator"),
            result.getString("publisher"),
            result.getString("publicationDate"),
            result.getInt("price"),
            result.getString("imageUrl"),
            result.getString("introduce")
        );
    };

    public ResponseEntity<Book> getBookDetail(int id) {
        String sql = "SELECT * FROM books where id = ?";
        Book result = jdbcTemplate.queryForObject(sql, getBookDetailRowMapper, id);
        return ResponseEntity.ok().body(result);
    }

    public void addBook(Book book) {
        String sql = "insert into books(name, author, translator, publisher, publicationDate, price, imageUrl, introduce)"
                    + " values(?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
            book.getName(),
            book.getAuthor(),
            book.getTranslator(),
            book.getPublisher(),
            book.getPublicationDate(),
            book.getPrice(),
            book.getImageUrl(),
            book.getIntroduce());
    }

    public void removeBook(int book_id) {
        String sql = "delete from books where id = ?";
        jdbcTemplate.update(sql, book_id);
    }

    public void updateBookDetail(Book book) {
        String sql = "update books set name = ?, author = ?, translator = ?, publisher = ?, publicationDate = ?, price = ?, imageUrl = ?, introduce = ? where id = ?";
        jdbcTemplate.update(sql,
            book.getName(),
            book.getAuthor(),
            book.getTranslator(),
            book.getPublisher(),
            book.getPublicationDate(),
            book.getPrice(),
            book.getImageUrl(),
            book.getIntroduce(),
            book.getId());
    }

    public String getImageUrlById(int book_id) {
        String sql = "select imageUrl from books where id = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return rs.getString("imageUrl");
        }, book_id);
    }
}