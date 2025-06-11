package com.cdac.quizonline.service;

import java.util.Optional;

import com.cdac.quizonline.dto.LoginInfoDTO;
import com.cdac.quizonline.form.account.RegisterRequest;
import com.cdac.quizonline.model.Account;

public interface AuthService {
    LoginInfoDTO login(String username);
    Account registerNewAccount(RegisterRequest registerRequest);
    boolean verifyEmail(String token);
    boolean isAccountEnabled(String email);
    Optional<Account> findByEmail(String email);
}

