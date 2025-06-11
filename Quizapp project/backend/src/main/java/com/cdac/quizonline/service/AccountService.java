package com.cdac.quizonline.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.cdac.quizonline.model.Account;

public interface AccountService extends UserDetailsService {
    Account getAccountByUsername (String username);

}
