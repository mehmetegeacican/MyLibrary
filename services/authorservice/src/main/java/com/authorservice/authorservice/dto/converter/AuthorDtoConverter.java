package com.authorservice.authorservice.dto.converter;


import com.authorservice.authorservice.dto.AuthorDto;
import com.authorservice.authorservice.model.Author;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthorDtoConverter {


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
                .info(authorParam.getInfo())
                .userId(authorParam.getUserId())
                .build();
    }

    public List<AuthorDto> convertToDto(List<Author> authorList){
        return authorList.stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }
}
