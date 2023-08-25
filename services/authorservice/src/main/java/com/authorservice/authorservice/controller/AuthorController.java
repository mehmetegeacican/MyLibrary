package com.authorservice.authorservice.controller;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.service.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {

    private final AuthorService authorService;
    private final AuthorDtoConverter authorDtoConverter;

    public AuthorController(AuthorService authorService, AuthorDtoConverter authorDtoConverter) {
        this.authorService = authorService;
        this.authorDtoConverter = authorDtoConverter;
    }

    @GetMapping("/all")
    public ResponseEntity<List<AuthorDto>> getAllAuthors() {
        return new ResponseEntity<List<AuthorDto>>(
                authorDtoConverter.convertToDto(authorService.getAuthorList()), HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Map<String, String>> deleteAuthor(@PathVariable("id") Long id){
        authorService.deleteAuthor(id);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Author Deleted Successfully");
        return ResponseEntity.ok().body(responseBody);
    }
}
