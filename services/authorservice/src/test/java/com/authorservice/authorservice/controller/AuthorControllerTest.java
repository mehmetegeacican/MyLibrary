package com.authorservice.authorservice.controller;

import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.service.AuthorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@WebMvcTest
@ExtendWith(MockitoExtension.class)
class AuthorControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AuthorService authorService;

    @MockBean
    private AuthorDtoConverter authorDtoConverter;

    private AuthorController authorController;


    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
        authorController = new AuthorController(authorService,authorDtoConverter);
    }
    @Test
    void getAllAuthors() throws Exception{
        //Given
        Author a1 = new Author(1L,"A1","info 1");
        Author a2 = new Author(2L,"A2","info 2");
        List<Author> aList = new ArrayList<>(Arrays.asList(a1,a2));
        List<AuthorDto> authorDtoList = new ArrayList<>();
        authorDtoList.add(authorDtoConverter.convertToDto(a1));
        authorDtoList.add(authorDtoConverter.convertToDto(a2));
        //When
        Mockito.when(authorService.getAuthorList()).thenReturn(aList);
        Mockito.when(authorDtoConverter.convertToDto(aList)).thenReturn(authorDtoList);
        ResponseEntity<List<AuthorDto>> response = authorController.getAllAuthors();
        //Then
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(authorDtoList,response.getBody());
        //Verify
        Mockito.verify(authorService,Mockito.times(1)).getAuthorList();
        Mockito.verify(authorDtoConverter,Mockito.times(1)).convertToDto(aList);
    }
}