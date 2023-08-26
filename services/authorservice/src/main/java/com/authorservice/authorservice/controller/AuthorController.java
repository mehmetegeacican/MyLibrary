package com.authorservice.authorservice.controller;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.request.AuthorRequest;
import com.authorservice.authorservice.request.converter.AuthorRequestConverter;
import com.authorservice.authorservice.service.AuthorService;
import jakarta.validation.Valid;
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

    private final AuthorRequestConverter authorRequestConverter;

    public AuthorController(AuthorService authorService, AuthorDtoConverter authorDtoConverter, AuthorRequestConverter authorRequestConverter) {
        this.authorService = authorService;
        this.authorDtoConverter = authorDtoConverter;
        this.authorRequestConverter = authorRequestConverter;
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



    @PostMapping
    public ResponseEntity<Map<String,String>> postAuthor(@Valid @RequestBody AuthorRequest authorRequest){
        Author authorEntity = authorRequestConverter.convertToEntity(authorRequest);
        Author createdAuthor = authorService.createAuthor(authorEntity);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Author Inserted Successfully");
        return ResponseEntity.ok().body(responseBody);
    }
}