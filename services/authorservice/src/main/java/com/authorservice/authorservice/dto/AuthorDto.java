package com.authorservice.authorservice.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthorDto {
    private Long id;
    private String name;
    private String info;
}
