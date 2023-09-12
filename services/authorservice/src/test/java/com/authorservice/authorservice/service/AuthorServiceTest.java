package com.authorservice.authorservice.service;

import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.repository.AuthorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class AuthorServiceTest {



    @BeforeEach
    void  SetUp(){
        MockitoAnnotations.openMocks(this);
        authorService = new AuthorService(authorRepository);
    }
    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private AuthorService authorService;

    @Test
    void getAuthorList() {
        //Given
        Author a = new Author(1L,"A","A",1L);
        Author b = new Author(2L,"B","B",1L);
        List<Author> test = Arrays.asList(a,b);
        //When
        Mockito.when(authorRepository.findAllByUserId(1L)).thenReturn(test);
        //Then
        assertEquals(authorService.getAuthorList(1L),test);
        Mockito.verify(authorRepository,Mockito.times(1)).findAllByUserId(1L);
    }

    @Test
    void getAuthorById() {
        //Given
        Author a = new Author(1L,"A","A",1l);
        //When
        Mockito.when(authorRepository.findById(1L)).thenReturn(Optional.of(a));
        //Then
        assertEquals(authorService.getAuthorById(1L),Optional.of(a));
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).findById(1L);
    }

    @Test
    void deleteAuthor() {
        //Given
        Author a = new Author(1L,"A","A",1l);
        //When
        Mockito.when(authorRepository.existsById(1L)).thenReturn(true);
        Mockito.doNothing().when(authorRepository).deleteById(1L);
        //Then
        authorService.deleteAuthor(1L);
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsById(1L);
        Mockito.verify(authorRepository,Mockito.times(1)).deleteById(1L);
    }

    @Test
    void deleteAuthorNonExistingId() throws Exception{
        //When
        Mockito.when(authorRepository.existsById(1L)).thenReturn(false);
        //Then
        assertThrows(IllegalStateException.class, () -> authorService.deleteAuthor(1L));
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsById(1L);
        Mockito.verify(authorRepository,Mockito.times(0)).deleteById(1L);
    }
    @Test
    void createAuthor() {
        //Given
        Author createdAuthor = new Author(1L,"A","A",1l);
        //When
        Mockito.when(authorRepository.existsByNameIgnoreCase("A")).thenReturn(false);
        Mockito.when(authorRepository.save(createdAuthor)).thenReturn(createdAuthor);
        //Then
        authorService.createAuthor(createdAuthor);
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsByNameIgnoreCase("A");
        Mockito.verify(authorRepository,Mockito.times(1)).save(createdAuthor);
    }


    @Test
    void createAuthorWithExistingName(){
        //Given
        Author createdAuthor = new Author(1L,"A","A",1l);
        //When
        Mockito.when(authorRepository.existsByNameIgnoreCase("A")).thenReturn(true);
        //Then
        authorService.createAuthor(createdAuthor);
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsByNameIgnoreCase("A");
        Mockito.verify(authorRepository,Mockito.times(0)).save(createdAuthor);

    }
    @Test
    void updateAuthor() {
        //Given
        Author existingauthor = new Author(1L,"A","A",1l);
        Author updatedAuthor = new Author(1L,"B","B",1l);
        //When
        Mockito.when(authorRepository.existsById(1L)).thenReturn(true);
        Mockito.when(authorRepository.getReferenceById(1L)).thenReturn(existingauthor);
        authorService.updateAuthor(1L,updatedAuthor);
        //Then
        assertEquals(updatedAuthor.getName(),existingauthor.getName());
        assertEquals(updatedAuthor.getInfo(),existingauthor.getInfo());
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsById(1L);
        Mockito.verify(authorRepository,Mockito.times(1)).getReferenceById(1L);
    }

    @Test
    void UpdateAuthorException() {
        //Given
        Author updatedAuthor = new Author(1L,"B","B",1l);
        //When
        Mockito.when(authorRepository.existsById(1L)).thenReturn(false);
        //Then
        assertThrows(IllegalStateException.class, () -> authorService.updateAuthor(1L,updatedAuthor));
        //Verify
        Mockito.verify(authorRepository,Mockito.times(1)).existsById(1L);

    }
}