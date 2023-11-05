package com.authorservice.authorservice.repository;

import com.authorservice.authorservice.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Long> {

    boolean existsByNameIgnoreCaseAndUserId(String name, Long userId);

    List<Author> findAllByUserId(Long userId);

    List<Author> findByNameAndUserId(String name,Long userId);
}
