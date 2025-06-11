package com.cdac.quizonline.service;

import java.util.List;

import com.cdac.quizonline.dto.ResultDTO;

public interface ResultService {
    ResultDTO getResultByAttemptId(Long attemptId) throws Exception;
    List<ResultDTO> getResultsByUserId(Long userId);
    List<ResultDTO> getResultsByQuizId(Long quizId);
    
}