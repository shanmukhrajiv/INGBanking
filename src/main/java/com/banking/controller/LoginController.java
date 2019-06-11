package com.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.dto.LoginDto;
import com.banking.entity.Login;
import com.banking.exception.ApplicationException;
import com.banking.service.LoginService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoginController {
	@Autowired
	LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<Login> validateLoginUser(@RequestBody LoginDto loginDto) throws ApplicationException {
		Login login = loginService.validateLogin(loginDto);
		return new ResponseEntity<Login>(login, HttpStatus.OK);
	}
}
