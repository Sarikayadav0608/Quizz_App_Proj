package com.cdac.quizonline.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cdac.quizonline.model.Account;
import com.cdac.quizonline.model.Token;

public interface TokenRepository extends JpaRepository<Token, Integer>, JpaSpecificationExecutor<Token> {
    void deleteTokenByAccount(Account user);
    Token findTokenByKey(String key);

}
