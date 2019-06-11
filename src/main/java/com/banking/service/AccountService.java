package com.banking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.banking.entity.Account;
import com.banking.exception.ApplicationException;

@Service
public interface AccountService {

	Account getAccountDetails(Long accountId) throws ApplicationException;
	
	List<Account> getbeneficiary(Long accountId);
}
