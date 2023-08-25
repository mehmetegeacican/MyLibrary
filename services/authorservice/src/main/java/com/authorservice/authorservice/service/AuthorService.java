package com.authorservice.authorservice.service;


import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository){
        this.authorRepository = authorRepository;
    }

    /**
     * Gets All Authors
     * @return
     */
    public List<Author> getAuthorList(){
        return this.authorRepository.findAll();
    }
}
