package com.cdac.quizonline.service;



import java.util.List;

import com.cdac.quizonline.dto.AttemptDTO;
import com.cdac.quizonline.dto.UserAnswerDTO;

public interface AttemptService {
    AttemptDTO submitQuiz(UserAnswerDTO userAnswerDTO) throws Exception;
    AttemptDTO getAttemptById(Long id) throws Exception;
    List<AttemptDTO> getAttemptsByUserId(Long userId);
    List<AttemptDTO> getAttemptsByQuizId(Long quizId);
}