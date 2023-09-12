package com.authorservice.authorservice.request.converter;

import com.authorservice.authorservice.model.Author;
import com.authorservice.authorservice.request.AuthorRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthorRequestConverter {

    public Author convertToEntity(AuthorRequest authorRequest){
        return Author.builder()
                .name(authorRequest.getName())
                .info(authorRequest.getInfo())
                .userId(authorRequest.getUserId())
                .build();
    }
}
