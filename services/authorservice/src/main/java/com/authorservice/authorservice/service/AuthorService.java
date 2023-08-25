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

    /**
     * Service Function to Delete an Author via ID
     * @param id
     */
    public void deleteAuthor(Long id) {
        boolean idExists = authorRepository.existsById(id);
        if(idExists){
            authorRepository.deleteById(id);
        }
        else {
            throw new IllegalStateException("The ID does not exist");
        }
    }
}
