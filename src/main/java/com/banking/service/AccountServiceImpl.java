package com.banking.service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.entity.Account;
import com.banking.exception.ApplicationException;
import com.banking.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

	private static Logger logger = Logger.getLogger(AccountServiceImpl.class.getName());

	@Autowired
	AccountRepository accountRepository;

	@Override
	public Account getAccountDetails(Long accountId) throws ApplicationException {
		Account account = accountRepository.findByAccountId(accountId);
		logger.info("Inside account details method");
		if (account == null) {
			//logger.log(Level.SEVERE, "Invalid Account");
			throw new ApplicationException("Account Details not found");
		}

		return account;
	}

	@Override
	public List<Account> getbeneficiary(Long accountId) {
		logger.info("Inside get beneficiary method");
		List<Account> accountList = accountRepository.findByAccountIdNotLike(accountId);
		return accountList;
	}
}
