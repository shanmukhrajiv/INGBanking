package com.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.banking.entity.Account;
import com.banking.exception.ApplicationException;
import com.banking.service.AccountService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountControlller {

	@Autowired
	AccountService accountService;

	@GetMapping("/account/{accountId}")
	public ResponseEntity<Account> getAccount(@PathVariable Long accountId) throws ApplicationException{
		
		Account account = accountService.getAccountDetails(accountId);
		
		return new ResponseEntity<Account>(account,HttpStatus.OK );
		
	}
}
