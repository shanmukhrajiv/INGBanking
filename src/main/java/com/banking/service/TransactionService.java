package com.banking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.banking.entity.Transaction;

@Service
public interface TransactionService {

	List<Transaction> getAccountDetail(Long accountId);

	List<Transaction> getTransferAccountDetail(Long transactionId);

}
