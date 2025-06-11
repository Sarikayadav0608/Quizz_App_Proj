package com.cdac.quizonline.service;

import org.springframework.data.crossstore.ChangeSetPersister;

import com.cdac.quizonline.dto.QuestionDTO;
import com.cdac.quizonline.model.Question;

import java.util.List;
import java.util.Optional;


public interface IQuestionService {

    QuestionDTO createQuestion(QuestionDTO questionDTO) throws Exception;
    QuestionDTO getQuestionById(Long id) throws Exception;
    List<QuestionDTO> getQuestionsByQuizId(Long quizId);
    QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) throws Exception;
    void deleteQuestion(Long id) throws Exception;

}
