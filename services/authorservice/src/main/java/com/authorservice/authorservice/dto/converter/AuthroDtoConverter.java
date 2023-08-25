package com.authorservice.authorservice.dto.converter;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.model.Author;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthroDtoConverter {


    /**
     * Converts an Author Model to DTO
     * @param authorParam
     * @return
     */
    public AuthorDto convertToDto(Author authorParam) {
        Long idParam = (authorParam.getId() != null) ? authorParam.getId() : 0L;
        return AuthorDto.builder()
                .id(idParam)
                .name(authorParam.getName())
                .build();
    }

    public List<AuthorDto> convertToDto(List<Author> authorList){
        return authorList.stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }
}
