package com.banking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.entity.Account;
import com.banking.exception.ApplicationException;
import com.banking.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService{

	
	@Autowired
    AccountRepository accountRepository;

    @Override
    public Account getAccountDetails(Long accountId) throws ApplicationException {
        Account account = accountRepository.findByAccountId(accountId);
        
        if (account == null) {
            throw new ApplicationException("Account Details not found");
        }

        return account;
    }
    
    @Override
    public List<Account> getbeneficiary(Long accountId) {
        
        List<Account> accountList = accountRepository.findByAccountIdNotLike(accountId);
        return accountList;
    }
}
