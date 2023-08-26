package com.authorservice.authorservice.controller;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.request.AuthorRequest;
import com.authorservice.authorservice.request.converter.AuthorRequestConverter;
import com.authorservice.authorservice.service.AuthorService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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


    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getSpecificAuthor(@PathVariable("id") Long id) throws Exception{
        Optional<Author> authorOptional = authorService.getAuthorById(id);
        if (authorOptional.isPresent()) {
            Author author = authorOptional.get();
            return ResponseEntity.status(HttpStatus.OK).body(authorDtoConverter.convertToDto(author));
        } else {
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Author not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }
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
        Map<String, String> responseBody = new HashMap<>();
        if(authorEntity.getName().isEmpty()){
            responseBody.put("message", "Author Name can not be empty");
            return ResponseEntity.status(400).body(responseBody);
        }
        Author createdAuthor = authorService.createAuthor(authorEntity);
        responseBody.put("message", "Author Inserted Successfully");
        return ResponseEntity.status(201).body(responseBody);
    }


    @Transactional
    @PutMapping(path = "/{authorId}")
    public ResponseEntity<Map<String,String>> putAuthor(
            @PathVariable("authorId") Long id,
            @RequestBody AuthorRequest editedAuthor
    ){
        Author entity = authorRequestConverter.convertToEntity(editedAuthor);
        Map<String, String> responseBody = new HashMap<>();
        if(editedAuthor.getName().isEmpty()){
            responseBody.put("message", "Name can not be empty");
            return ResponseEntity.badRequest().body(responseBody);
        }
        authorService.updateAuthor(id,entity);
        responseBody.put("message", "Author Updated Successfully");
        return ResponseEntity.ok().body(responseBody);
    }
}
