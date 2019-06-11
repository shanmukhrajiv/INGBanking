package com.banking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.dto.TransactionDto;
import com.banking.entity.Transaction;
import com.banking.exception.ApplicationException;
import com.banking.service.TransactionService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransactionController {

	@Autowired
	TransactionService transactionService;

	@GetMapping("/accountDetail/{accountId}")
	public List<Transaction> accountDetail(@PathVariable Long accountId) {
		return transactionService.getAccountDetail(accountId);

	}    
    @GetMapping("/transfer")
    public Transaction transfer(@RequestBody TransactionDto transactionDto) throws ApplicationException {
        Transaction transaction = transactionService.transferMoney(transactionDto);
        return transaction;
    }

	@GetMapping("/transferDetails/{transactionId}")
	public Transaction accountTransferDetail(@PathVariable Long transactionId) {
		return transactionService.getTransferAccountDetail(transactionId);

	}

}
