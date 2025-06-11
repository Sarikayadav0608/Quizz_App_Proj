package com.cdac.quizonline.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.quizonline.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
