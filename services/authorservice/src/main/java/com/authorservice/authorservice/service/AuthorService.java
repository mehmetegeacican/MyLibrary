package com.authorservice.authorservice.service;


import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<Author> getAuthorList(Long userId){
        return authorRepository.findAllByUserId(userId).stream()
                .sorted((a1, a2) -> a1.getId().compareTo(a2.getId()))
                .collect(Collectors.toList());
    }


    /**
     * Retrieves an Author from the ID
     * @param id
     * @return
     */
    public Optional<Author> getAuthorById(Long id) {
        return this.authorRepository.findById(id);
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
        boolean nameExists = authorRepository.existsByNameIgnoreCaseAndUserId(author.getName(), author.getUserId());
        if(nameExists){
            return null;
        }
        return this.authorRepository.save(author);
    }

    /**
     * Helper Function to find if there is going to be duplicates
     * @param id
     * @param editedAuthor
     * @return
     */
    public boolean areAuthorsWithSameNameExist(Long id, Author editedAuthor) {
        // Query the repository for authors with the same name as the edited author
        List<Author> authorsWithSameName = authorRepository.findByNameIgnoreCaseAndUserId(editedAuthor.getName(), editedAuthor.getUserId());

        // Remove the author being edited from the list
        authorsWithSameName.removeIf(author -> author.getId().equals(id));

        // If there are any authors left in the list, there are authors with the same name
        return !authorsWithSameName.isEmpty();
    }


    /**
     * Updates the Function
     * @param id
     * @param editedAuthor
     */
    public void updateAuthor(Long id, Author editedAuthor) {
        boolean authorExists = authorRepository.existsById(id);
        if (authorExists) {
            Author author = authorRepository.getReferenceById(id);
            if(areAuthorsWithSameNameExist(id,editedAuthor)){
                throw new IllegalStateException("There is already another user with the entered name!");
            }
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
