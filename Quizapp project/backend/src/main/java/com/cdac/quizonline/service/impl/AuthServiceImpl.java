package com.cdac.quizonline.service.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.quizonline.dto.LoginInfoDTO;
import com.cdac.quizonline.form.account.RegisterRequest;
import com.cdac.quizonline.model.Account;
import com.cdac.quizonline.model.Token;
import com.cdac.quizonline.repository.AccountRepository;
import com.cdac.quizonline.service.AccountService;
import com.cdac.quizonline.service.AuthService;
import com.cdac.quizonline.service.EmailService;
import com.cdac.quizonline.service.JWTTokenService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AccountService accountService;

    @Autowired
    private JWTTokenService jwtTokenService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Override
    public LoginInfoDTO login(String username) {
        Account user = accountService.getAccountByUsername(username);
        LoginInfoDTO dto = modelMapper.map(user, LoginInfoDTO.class);
        dto.setAccessToken(jwtTokenService.generateJWTToken(username));
        Token refreshToken = jwtTokenService.generateRefreshToken(user);
        dto.setRefreshToken(refreshToken.getKey());
        return dto;
    }

    @Override
    @Transactional
    public Account registerNewAccount(RegisterRequest registerRequest) {
        if (accountRepository.existsByUsername(registerRequest.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }
        if (accountRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // Prevent registering multiple Admins
        if ("ADMIN".equalsIgnoreCase(registerRequest.getRole())
                && accountRepository.existsByRole("ADMIN")) {
            throw new IllegalArgumentException("An Admin account already exists. You cannot register another Admin.");
        }

        Account account = new Account();
        account.setUsername(registerRequest.getUsername());
        account.setEmail(registerRequest.getEmail());
        account.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        account.setVerificationToken(UUID.randomUUID().toString());
        account.setTokenExpiryDate(LocalDateTime.now().plusHours(24));
        account.setEnabled(true);

        String role = (registerRequest.getRole() == null || registerRequest.getRole().isEmpty())
                ? "USER"
                : registerRequest.getRole().toUpperCase();
        account.setRole(role);

        Account savedAccount = accountRepository.save(account);

        return savedAccount;
    }

    @Override
    public boolean verifyEmail(String token) {
        Optional<Account> accountOptional = accountRepository.findByVerificationToken(token);
        if (accountOptional.isEmpty()) {
            return false;
        }

        Account account = accountOptional.get();

        if (account.getTokenExpiryDate() != null &&
                account.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            account.setVerificationToken(null);
            account.setTokenExpiryDate(null);
            accountRepository.save(account);
            return false;
        }

        account.setEnabled(true);
        account.setVerificationToken(null);
        account.setTokenExpiryDate(null);
        accountRepository.save(account);
        return true;
    }

    @Override
    public boolean isAccountEnabled(String email) {
        Optional<Account> accountOptional = accountRepository.findByUsername(email);
        return accountOptional.map(Account::isEnabled).orElse(false);
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }
}
