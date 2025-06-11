package com.cdac.quizonline.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "`quiz`")
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @Lob
    @Column(nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private Long duration; // in seconds

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attempt> attempts;
}
