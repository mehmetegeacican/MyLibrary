package com.authorservice.authorservice.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthorRequest {
    private String name;
    private String info;
    private Long userId;
}
