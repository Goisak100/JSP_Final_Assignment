package com.example.demo.controller;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import com.example.demo.service.TokenService;

@RestController
@RequestMapping("/api/book")
public class BookController {
    
    private final BookService bookService;
    private final TokenService tokenService;

    public BookController(BookService bookService, TokenService tokenService) {
        this.bookService = bookService;
        this.tokenService = tokenService;
    }

    @GetMapping("/getBook")
    public ResponseEntity<List<Book>> getBook() {
        return bookService.getBook();
    }

    @GetMapping("/getBookDetail")
    public ResponseEntity<Book> getBookDetail(@RequestParam("id") int id) {
        return bookService.getBookDetail(id);
    }

    @PostMapping("/addBook")
    public void addBook(
        @RequestHeader("Authorization") String authorizationheader,
        @RequestParam("image") MultipartFile image,
        @RequestParam("name") String name,
        @RequestParam("author") String author,
        @RequestParam("translator") String translator,
        @RequestParam("publisher") String publisher,
        @RequestParam("publicationDate") String publicationDate,
        @RequestParam("price") int price,
        @RequestParam("imageUrl") String imageUrl,
        @RequestParam("introduce") String introduce
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationheader);
        if (!tokenService.validateToken(token)) {
            return;
        }

        try {
            Path path = Paths.get("demo\\src\\main\\resources\\static\\images/", imageUrl);
            Files.write(path, image.getBytes());
            Thread.sleep(500);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        imageUrl = "http://158.247.246.106:8080/resources/" + imageUrl;
        Book book = new Book(0, name, author, translator, publisher, publicationDate, price, imageUrl, introduce);
        bookService.addBook(book);
    }

    @PostMapping("/removeBook")
    public void removeBook(
        @RequestHeader("Authorization") String authorizationHeader,
        @RequestParam("book_id") int book_id
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(authorizationHeader);
        if (!tokenService.validateToken(token)) {
            return;
        }

        String imageUrl = bookService.getImageUrlById(book_id);
        bookService.removeBook(book_id);

        File file = new File("demo/src/main/resources/static/images/" + 
            imageUrl.substring(imageUrl.lastIndexOf("/")));
        file.delete();
    }

    @PostMapping("/updateBookDetail")
    public void updateBookDetail(
        @RequestHeader("Authorization") String autorizationHeader,
        @RequestParam("image") MultipartFile image,
        @RequestParam("id") int id,
        @RequestParam("name") String name,
        @RequestParam("author") String author,
        @RequestParam("translator") String translator,
        @RequestParam("publisher") String publisher,
        @RequestParam("publicationDate") String publicationDate,
        @RequestParam("price") int price,
        @RequestParam("imageUrl") String imageUrl,
        @RequestParam("introduce") String introduce,
        @RequestParam("oldImageUrl") String oldImageUrl
    ) {
        String token = tokenService.extraTokenFromAuthorizationHeader(autorizationHeader);
        if (!tokenService.validateToken(token)) {
            return;
        }
        imageUrl = "http://158.247.246.106:8080/resources/" + imageUrl;
        Book book = new Book(id, name, author, translator, publisher, publicationDate, price, imageUrl, introduce);
        bookService.updateBookDetail(book);

        if (!oldImageUrl.equals(imageUrl)) {
             try {
                File file = new File("demo/src/main/resources/static/images/" + 
                    oldImageUrl.substring(oldImageUrl.lastIndexOf("/")));
                if(file.exists()) {
                    if(file.delete()) {
                        System.out.println("파일 삭제 성공");
                    } else {
                        System.out.println("파일 삭제 실패");
                    }
                } else {
                    System.out.println("파일이 존재하지 않습니다.");
                }
                Path path = Paths.get("demo/src/main/resources/static/images/" +
                    imageUrl.substring(imageUrl.lastIndexOf("/")));
                Files.write(path, image.getBytes());
                Thread.sleep(500);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}