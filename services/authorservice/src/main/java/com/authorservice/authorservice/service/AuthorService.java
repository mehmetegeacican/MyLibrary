package com.authorservice.authorservice.service;


import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.repository.AuthorRepository;
import com.authorservice.authorservice.request.AuthorRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    /**
     * Save Function for Creating a New Author
     * @param author
     * @return
     */
    public Author createAuthor(Author author){
        boolean nameExists = authorRepository.existsByNameIgnoreCase(author.getName());
        if(nameExists){
            throw new IllegalStateException("The Author with the given name already exist");
        }
        return this.authorRepository.save(author);
    }


    public void updateAuthor(Long id, Author editedAuthor) {
        boolean authorExists = authorRepository.existsById(id);
        if (authorExists) {
            Author author = authorRepository.getReferenceById(id);
            if (author.getName() != null && !Objects.equals(author.getName(), editedAuthor.getName())) {
                author.setName(editedAuthor.getName());
            }
            if (author.getInfo() != null && !Objects.equals(author.getInfo(), editedAuthor.getInfo())) {
                author.setInfo(editedAuthor.getInfo());
            }
        }
        else{
            throw new IllegalStateException("Author does not exist!");
        }
    }
}
