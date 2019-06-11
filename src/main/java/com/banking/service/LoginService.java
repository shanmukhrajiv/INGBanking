package com.banking.service;

import org.springframework.stereotype.Service;

import com.banking.dto.LoginDto;
import com.banking.entity.Login;

@Service
public interface LoginService {

	Login validateLogin(LoginDto loginDto);

}
