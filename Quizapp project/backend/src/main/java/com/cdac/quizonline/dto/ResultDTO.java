package com.cdac.quizonline.dto;


import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ResultDTO {
    private Long attemptId;
    private Long userId;
    private String userName; 
    private Long quizId;
    private String quizTitle; 
    private Integer score;
    private LocalDateTime timestamp;
    private Map<Long, String> userAnswers; 
    private Map<Long, String> correctAnswers; 
    private Map<Long, String> questionTexts; 
    private Integer totalQuestions; 
}