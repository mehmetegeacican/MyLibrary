package com.authorservice.authorservice.controller;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.request.AuthorRequest;
import com.authorservice.authorservice.request.converter.AuthorRequestConverter;
import com.authorservice.authorservice.service.AuthorService;
import io.jsonwebtoken.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.Instant;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {

    private final AuthorService authorService;
    private final AuthorDtoConverter authorDtoConverter;

    private final AuthorRequestConverter authorRequestConverter;

    @Value("${SECRET_KEY}")
    private String secretKey;

    public AuthorController(AuthorService authorService, AuthorDtoConverter authorDtoConverter, AuthorRequestConverter authorRequestConverter) {
        this.authorService = authorService;
        this.authorDtoConverter = authorDtoConverter;
        this.authorRequestConverter = authorRequestConverter;
    }


    @GetMapping("/all/{id}")
    public ResponseEntity<List<AuthorDto>> getAllAuthors(@RequestHeader("Authorization") String token,@PathVariable("id") Long userId) {
        if (token == null || isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return new ResponseEntity<List<AuthorDto>>(
                authorDtoConverter.convertToDto(authorService.getAuthorList(userId)), HttpStatus.OK
        );
    }



    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getSpecificAuthor(@RequestHeader("Authorization") String token,@PathVariable("id") Long id) throws Exception{
        if (token == null || isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
    public ResponseEntity<Map<String, String>> deleteAuthor(@RequestHeader("Authorization") String token,@PathVariable("id") Long id){
        if (token == null || isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        authorService.deleteAuthor(id);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Author Deleted Successfully");
        return ResponseEntity.ok().body(responseBody);
    }




    @PostMapping
    public ResponseEntity<Map<String,String>> postAuthor(@RequestHeader("Authorization") String token,@Valid @RequestBody AuthorRequest authorRequest){
        if (token == null || isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Author authorEntity = authorRequestConverter.convertToEntity(authorRequest);
        Map<String, String> responseBody = new HashMap<>();
        if(authorEntity.getName().isEmpty()){
            responseBody.put("message", "Author Name can not be empty");
            return ResponseEntity.status(400).body(responseBody);
        }
        if(authorEntity.getUserId() == null){
            responseBody.put("message", "User ID can not be empty");
            return ResponseEntity.status(400).body(responseBody);
        }
        Author createdAuthor = authorService.createAuthor(authorEntity);
        if(createdAuthor == null){
            responseBody.put("message", "You can not add an already existing author");
            return ResponseEntity.status(400).body(responseBody);
        }

        responseBody.put("message", "Author Inserted Successfully");
        return ResponseEntity.status(201).body(responseBody);
    }



    @Transactional
    @PutMapping(path = "/{authorId}")
    public ResponseEntity<Map<String,String>> putAuthor(
            @RequestHeader("Authorization") String token,
            @PathVariable("authorId") Long id,
            @RequestBody AuthorRequest editedAuthor
    ){
        if (token == null || isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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

    private boolean isValidToken(String token){
        try {

            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .build().parseClaimsJwt(token)
                    .getBody();
            Date expiration = claims.getExpiration();
            Date now = new Date();
            return expiration != null && !expiration.before(now);
        }catch (Exception e){
            return false;
        }
    }
}
