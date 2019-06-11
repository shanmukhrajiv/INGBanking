package com.banking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.entity.Transaction;
import com.banking.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	TransactionRepository transactionRepository;

	@Override
	public List<Transaction> getAccountDetail(Long accountId) {
		return transactionRepository.findByAccountId(accountId);
	}
	

}
