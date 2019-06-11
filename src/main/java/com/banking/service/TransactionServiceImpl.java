package com.banking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static com.banking.dto.IngApplicationContants.Credit;
import static com.banking.dto.IngApplicationContants.Debit;

import com.banking.dto.TransactionDto;
import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.exception.ApplicationException;
import com.banking.repository.AccountRepository;
import com.banking.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	AccountRepository accountRepository;

	@Override
	public List<Transaction> getAccountDetail(Long accountId) {
		return transactionRepository.findByAccountId(accountId);
	}

	@Override
	public Transaction getTransferAccountDetail(Long transactionId) {
		return transactionRepository.findByTransactionId(transactionId);
	}

	public Transaction transferMoney(TransactionDto transactionDto) {
		Account fromAccount = transactionRepository.findByFromAccountAccountId(transactionDto.getFromAccount());
		Account toAccount = transactionRepository.findByToAccountAccountId(transactionDto.getToAccount());

		if (fromAccount != null && toAccount != null) {
			if (fromAccount.getBalance() >= transactionDto.getTransferAmount()) {
				Transaction fromAccountTransaction = new Transaction();
				fromAccountTransaction.setFromAccount(fromAccount);
				fromAccountTransaction.setToAccount(toAccount);
				fromAccountTransaction.setTransferAmount(transactionDto.getTransferAmount());
				fromAccountTransaction.setComment(transactionDto.getComment());
				fromAccountTransaction.setTransferType(Debit);
				transactionRepository.save(fromAccountTransaction);

				Account debitAcc = accountRepository.findByAccountId(fromAccount.getAccountId());
				debitAcc.setBalance(debitAcc.getBalance() - transactionDto.getTransferAmount());
				accountRepository.save(debitAcc);

				Transaction toAccountTransaction = new Transaction();
				toAccountTransaction.setFromAccount(toAccount);
				toAccountTransaction.setToAccount(fromAccount);
				toAccountTransaction.setTransferAmount(transactionDto.getTransferAmount());
				toAccountTransaction.setComment(transactionDto.getComment());
				toAccountTransaction.setTransferType(Credit);
				transactionRepository.save(toAccountTransaction);
				return fromAccountTransaction;
			} else {
				throw new ApplicationException("Insuffient Balance!!");
			}
		} else {
			throw new ApplicationException("Invalid Account!! Please use valid account for transfer");
		}
	}
}
