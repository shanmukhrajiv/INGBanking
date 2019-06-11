package com.banking.service;

import org.springframework.stereotype.Service;

import com.banking.entity.Account;
import com.banking.exception.ApplicationException;

@Service
public interface AccountService {

	Account getAccountDetails(Long accountId) throws ApplicationException;

}
