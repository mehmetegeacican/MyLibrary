package com.authorservice.authorservice.controller;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.service.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
