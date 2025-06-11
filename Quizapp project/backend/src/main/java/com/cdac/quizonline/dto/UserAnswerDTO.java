package com.cdac.quizonline.dto;

import lombok.Data;
import java.util.Map;

@Data
public class UserAnswerDTO {
    private Long quizId;
    private Long userId; 
    private Map<Long, String> answers; 
}