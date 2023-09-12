package com.authorservice.authorservice.repository;

import com.authorservice.authorservice.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Long> {

    boolean existsByNameIgnoreCaseAndUserId(String name, Long userId);

    List<Author> findAllByUserId(Long userId);
}
