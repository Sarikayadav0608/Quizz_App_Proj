package com.cdac.quizonline.dto;


import lombok.Data;
import java.util.Map;

@Data
public class QuestionDTO {
    private Long questionId;
    private Long quizId;
    private String questionText;
    private Map<String, String> options; 
    private String correctAnswer;
}