package com.cdac.quizonline.service.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.quizonline.dto.AttemptDTO;
import com.cdac.quizonline.dto.UserAnswerDTO;
import com.cdac.quizonline.model.Account;
import com.cdac.quizonline.model.Attempt;
import com.cdac.quizonline.model.Question;
import com.cdac.quizonline.model.Quiz;
import com.cdac.quizonline.repository.AccountRepository;
import com.cdac.quizonline.repository.AttemptRepository;
import com.cdac.quizonline.repository.QuestionRepository;
import com.cdac.quizonline.repository.QuizRepository;
import com.cdac.quizonline.service.AttemptService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttemptServiceImpl implements AttemptService {

    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AccountRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    public AttemptDTO submitQuiz(UserAnswerDTO userAnswerDTO) throws Exception {
        Quiz quiz = quizRepository.findById(userAnswerDTO.getQuizId())
                .orElseThrow(() -> new Exception("Quiz not found with id: " + userAnswerDTO.getQuizId()));

        Account user = userRepository.findById(Math.toIntExact(userAnswerDTO.getUserId()))
                .orElseThrow(() -> new Exception("User not found with id: " + userAnswerDTO.getUserId()));

        // Start and end time check removed

        List<Question> questions = questionRepository.findByQuiz_QuizId(quiz.getQuizId());
        Map<Long, String> correctAnswersMap = questions.stream()
                .collect(Collectors.toMap(Question::getQuestionId, Question::getCorrectAnswer));

        int score = 0;
        if (userAnswerDTO.getAnswers() != null) {
            for (Map.Entry<Long, String> entry : userAnswerDTO.getAnswers().entrySet()) {
                Long questionId = entry.getKey();
                String userAnswer = entry.getValue();
                String correctAnswer = correctAnswersMap.get(questionId);

                if (correctAnswer != null && userAnswer != null && userAnswer.equalsIgnoreCase(correctAnswer)) {
                    score++;
                }
            }
        }

        Attempt attempt = new Attempt();
        attempt.setQuiz(quiz);
        attempt.setUser(user);
        attempt.setAnswersFromMap(userAnswerDTO.getAnswers());
        attempt.setScore(score);
        attempt.setTimestamp(LocalDateTime.now());

        Attempt savedAttempt = attemptRepository.save(attempt);

        AttemptDTO attemptDTO = modelMapper.map(savedAttempt, AttemptDTO.class);
        attemptDTO.setAnswers(savedAttempt.getAnswersAsMap());
        return attemptDTO;
    }

    public AttemptDTO getAttemptById(Long id) throws Exception {
        Attempt attempt = attemptRepository.findById(id)
                .orElseThrow(() -> new Exception("Attempt not found with id: " + id));
        AttemptDTO attemptDTO = modelMapper.map(attempt, AttemptDTO.class);
        attemptDTO.setAnswers(attempt.getAnswersAsMap());
        return attemptDTO;
    }

    public List<AttemptDTO> getAttemptsByUserId(Long userId) {
        List<Attempt> attempts = attemptRepository.findByUser_UserId(userId);
        return attempts.stream()
                .map(attempt -> {
                    AttemptDTO dto = modelMapper.map(attempt, AttemptDTO.class);
                    dto.setAnswers(attempt.getAnswersAsMap());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<AttemptDTO> getAttemptsByQuizId(Long quizId) {
        List<Attempt> attempts = attemptRepository.findByQuiz_QuizId(quizId);
        return attempts.stream()
                .map(attempt -> {
                    AttemptDTO dto = modelMapper.map(attempt, AttemptDTO.class);
                    dto.setAnswers(attempt.getAnswersAsMap());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
