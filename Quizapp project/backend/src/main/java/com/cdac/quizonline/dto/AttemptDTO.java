package com.cdac.quizonline.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class AttemptDTO {
    private Long attemptId;
    private Long quizId;
    private Long userId;
    private Map<Long, String> answers; 
    private Integer score;
    private LocalDateTime timestamp;
}