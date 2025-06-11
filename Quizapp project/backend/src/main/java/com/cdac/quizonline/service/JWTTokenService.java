package com.cdac.quizonline.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

import com.cdac.quizonline.dto.TokenDTO;
import com.cdac.quizonline.model.Account;
import com.cdac.quizonline.model.Token;

public interface JWTTokenService {
    
    String generateJWTToken(String username);
    Authentication parseTokenToUserInformation(HttpServletRequest request);
    // this function use in each request
    Token generateRefreshToken(Account user);
    Boolean isRefreshTokenValid(String refreshToken);
    TokenDTO getNewToken(String refreshToken);

}
