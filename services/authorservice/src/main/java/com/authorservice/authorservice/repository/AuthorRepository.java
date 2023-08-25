package com.authorservice.authorservice.repository;

import com.authorservice.authorservice.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author,Long> {
}
