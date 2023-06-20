package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class 파일업로드관련코드 {

    @GetMapping("/findImageUrl")
    public ResponseEntity<String> findFile(@RequestParam("fileName") String fileName) {

        // 여기에서 DB가 조회한 url을 바로 반환한다.
        return ResponseEntity.ok("http://localhost:8080/resources/" + fileName + ".jpg");
    }
}


// @Value("${file.upload-dir}")
// private String uploadDir;

// 업로드는 나중에 문제이다. 이미지 변경도 나중이다. 삭제도 나중이다. 일단 출력부터 되어야지.
    // @PostMapping("/upload")
    // public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    //     try {
    //         byte[] bytes = file.getBytes();
    //         Path path = Paths.get(uploadDir + file.getOriginalFilename());
    //         System.out.println(path);
    //         Files.write(path, bytes);

    //         return new ResponseEntity<>("File uploaded successfully.", HttpStatus.OK);
    //     } catch(IOException ex) {
    //         return new ResponseEntity<>("Failed to upload file.", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }