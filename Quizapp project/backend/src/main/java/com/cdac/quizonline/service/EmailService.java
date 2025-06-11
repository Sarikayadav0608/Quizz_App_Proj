package com.cdac.quizonline.service;

public interface EmailService {
    void sendVerificationEmail(String toEmail, String verificationLink);
}
