package com.banking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.banking.entity.Transaction;
import com.banking.service.TransactionService;
import com.banking.service.TransactionServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransactionController {

	@Autowired
	TransactionService transactionService;

	@GetMapping("/transfer/{accountId}")
	public List<Transaction> accountDetail(@PathVariable Long accountId) {
		return transactionService.getAccountDetail(accountId);

	}

	@GetMapping("/transferDetails/{transactionId}")
	public List<Transaction> accountTransferDetail(@PathVariable Long transactionId) {
		return transactionService.getTransferAccountDetail(transactionId);

	}

}
