package com.cdac.quizonline.service;

import java.util.List;
import java.util.Optional;

import com.cdac.quizonline.dto.QuizDTO;
import com.cdac.quizonline.model.Quiz;

public interface QuizService {
    QuizDTO createQuiz(QuizDTO quiz);
    QuizDTO getQuizById(Long id) throws Exception;
    List<QuizDTO> getAllQuizes();
    QuizDTO updateQuiz(Long id, QuizDTO quiz) throws Exception;
    void deleteQuiz(Long id) throws Exception;

    List<QuizDTO> getActiveQuizes();
}
