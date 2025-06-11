package com.cdac.quizonline.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.quizonline.dto.TokenDTO;
import com.cdac.quizonline.form.account.RegisterRequest;
import com.cdac.quizonline.form.login.LoginForm;
import com.cdac.quizonline.model.Account;
import com.cdac.quizonline.service.AuthService;
import com.cdac.quizonline.service.JWTTokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "api/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JWTTokenService jwtTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginForm loginForm){
        if (!authService.isAccountEnabled(loginForm.getUsername())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your account has not been verified. Please check your email to activate it.");
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok( authService.login(loginForm.getUsername()));
    }

    @GetMapping("/refreshtoken")
    public TokenDTO refreshToken(String refreshToken) {
        return jwtTokenService.getNewToken(refreshToken);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
          
            authService.registerNewAccount(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful! Please check your email to verify your account.");
        } catch (IllegalArgumentException e) {
           
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
          
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration: " + e.getMessage());
        }
    }

    
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            boolean isVerified = authService.verifyEmail(token);
            if (isVerified) {
                return ResponseEntity.ok("Email verification successful! You can log in now.");
            } else {
                return ResponseEntity.badRequest().body("Verification token is invalid or has expired.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during email verification:  " + e.getMessage());
        }
    }
}


