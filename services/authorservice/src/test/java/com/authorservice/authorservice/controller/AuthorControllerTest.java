package com.authorservice.authorservice.controller;

import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.dto.converter.AuthorDtoConverter;
import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.request.AuthorRequest;
import com.authorservice.authorservice.request.converter.AuthorRequestConverter;
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
import java.util.Map;

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

    @MockBean
    private AuthorRequestConverter authorRequestConverter;

    private AuthorController authorController;




    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
        authorController = new AuthorController(authorService,authorDtoConverter, authorRequestConverter);
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

    @Test
    void deleteAuthor() throws Exception {
        //Given
        Long authorId = 1L;
        Mockito.doNothing().when(authorService).deleteAuthor(authorId);
        //When
        ResponseEntity<Map<String, String>> response = authorController.deleteAuthor(authorId);
        //Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Map<String, String> responseBody = response.getBody();
        assertNotNull(responseBody);
        assertEquals("Author Deleted Successfully", responseBody.get("message"));
        //Verify
        Mockito.verify(authorService,Mockito.times(1)).deleteAuthor(authorId);
    }

    @Test
    void postAuthor() throws Exception{
        // Given
        AuthorRequest request = AuthorRequest.builder().name("a1").info("i1").build();
        Author createdAuthor = new Author(1L,"a1","i1");
        AuthorDto createdAuthorDto = new AuthorDto(1L,"a1","i1");
        //When
        Mockito.when(authorRequestConverter.convertToEntity(request)).thenReturn(createdAuthor);
        Mockito.when(authorService.createAuthor(createdAuthor)).thenReturn(createdAuthor);
        Mockito.when(authorDtoConverter.convertToDto(createdAuthor)).thenReturn(createdAuthorDto);
        ResponseEntity<Map<String,String>> response = authorController.postAuthor(request);
        //Then
        assertEquals(HttpStatus.CREATED,response.getStatusCode());
        Map<String, String> responseBody = response.getBody();
        assertNotNull(responseBody);
        assertEquals("Author Inserted Successfully", responseBody.get("message"));
        //Verify
        Mockito.verify(authorRequestConverter,Mockito.times(1)).convertToEntity(request);
        Mockito.verify(authorService,Mockito.times(1)).createAuthor(createdAuthor);
        Mockito.verify(authorDtoConverter,Mockito.times(0)).convertToDto(createdAuthor);
    }


    @Test
    void postAuthorEmptyName() throws Exception{
        //Given
        AuthorRequest request = AuthorRequest.builder().name("").info("i1").build();
        Author createdAuthor = new Author(1L,"","i1");
        AuthorDto createdAuthorDto = new AuthorDto(1L,"a1","i1");
        //When
        Mockito.when(authorRequestConverter.convertToEntity(request)).thenReturn(createdAuthor);
        Mockito.when(authorService.createAuthor(createdAuthor)).thenReturn(createdAuthor);
        Mockito.when(authorDtoConverter.convertToDto(createdAuthor)).thenReturn(createdAuthorDto);
        ResponseEntity<Map<String,String>> response = authorController.postAuthor(request);
        //Then
        assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
        Map<String, String> responseBody = response.getBody();
        assertNotNull(responseBody);
        assertEquals("Author Name can not be empty", responseBody.get("message"));
        //Verify
        Mockito.verify(authorRequestConverter,Mockito.times(1)).convertToEntity(request);
        Mockito.verify(authorService,Mockito.times(0)).createAuthor(createdAuthor);
        Mockito.verify(authorDtoConverter,Mockito.times(0)).convertToDto(createdAuthor);

    }
    @Test
    void putAuthor() {
        //Given
        AuthorRequest request = AuthorRequest.builder().name("a1").info("i1").build();
        Author createdAuthor = new Author(1L,"a1","i1");
        AuthorDto createdAuthorDto = new AuthorDto(1L,"a1","i1");
        //When
        Mockito.when(authorRequestConverter.convertToEntity(request)).thenReturn(createdAuthor);
        Mockito.when(authorDtoConverter.convertToDto(createdAuthor)).thenReturn(createdAuthorDto);
        Mockito.doNothing().when(authorService).updateAuthor(1L,createdAuthor);
        ResponseEntity<Map<String,String>> response = authorController.putAuthor(1L,request);
        assertEquals(HttpStatus.OK,response.getStatusCode());
        Map<String, String> responseBody = response.getBody();
        //Then
        assertNotNull(responseBody);
        assertEquals("Author Updated Successfully", responseBody.get("message"));
        //Verify
        Mockito.verify(authorRequestConverter,Mockito.times(1)).convertToEntity(request);
        Mockito.verify(authorService,Mockito.times(1)).updateAuthor(1L,createdAuthor);
        Mockito.verify(authorDtoConverter,Mockito.times(0)).convertToDto(createdAuthor);
    }

    @Test
    void putAuthorEmptyName(){
        //Given
        AuthorRequest request = AuthorRequest.builder().name("").info("i1").build();
        Author createdAuthor = new Author(1L,"","i1");
        AuthorDto createdAuthorDto = new AuthorDto(1L,"","i1");
        //When
        Mockito.when(authorRequestConverter.convertToEntity(request)).thenReturn(createdAuthor);
        Mockito.when(authorDtoConverter.convertToDto(createdAuthor)).thenReturn(createdAuthorDto);
        Mockito.doNothing().when(authorService).updateAuthor(1L,createdAuthor);
        ResponseEntity<Map<String,String>> response = authorController.putAuthor(1L,request);
        assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
        Map<String, String> responseBody = response.getBody();
        //Then
        assertNotNull(responseBody);
        assertEquals("Name can not be empty", responseBody.get("message"));
        //Verify
        Mockito.verify(authorRequestConverter,Mockito.times(1)).convertToEntity(request);
        Mockito.verify(authorService,Mockito.times(0)).updateAuthor(1L,createdAuthor);
        Mockito.verify(authorDtoConverter,Mockito.times(0)).convertToDto(createdAuthor);

    }
}