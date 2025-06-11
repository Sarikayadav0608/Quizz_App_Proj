package com.cdac.quizonline.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.quizonline.model.Question;

import java.net.ContentHandler;
import java.util.List;



public interface QuestionRepository  extends JpaRepository<Question, Long> {


    List<Question> findByQuiz_QuizId(Long quizId);
}
