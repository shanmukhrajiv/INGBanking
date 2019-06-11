
package com.banking.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.banking.dto.TransactionDto;
import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.repository.AccountRepository;
import com.banking.repository.TransactionRepository;

import junit.framework.Assert;

@RunWith(MockitoJUnitRunner.class)
public class TransactionServiceImplTest {

	@InjectMocks
	TransactionServiceImpl transactionServiceImpl;

	@Mock
	TransactionRepository transactionRepository;
	
	@Mock
	AccountRepository accountRepository;

	static Transaction transaction = new Transaction();

	static Account account = new Account();
	static Transaction transaction1 = new Transaction();
	static Account account1 = new Account();
	static List<Transaction> lst = new ArrayList<Transaction>();
	static TransactionDto  transactionDto = new TransactionDto();

	@BeforeClass
	public static void setUp() {
		transaction.setTransactionId(11L);
		transaction.setAfterAccountBalance(5000.00);
		transaction.setBeforeAccountBalance(6000.00);
		transaction.setComment("home rent");
		transaction.setTransactionDate(new Date());
		transaction.setTransferAmount(200);
		transaction.setTransferType("Debit");

		account.setAccountId(1L);
		account.setAccountHolderName("Jyothi");
		account.setAddress("Karanataka");
		account.setBalance(50000);
		account.setCity("BLR");
		account.setCreatedBy("xyz");
		account.setEmail("xyz@gmail");
		account.setModifiedBy("qwe");
		account.setPhoneNumber(992612L);

		account1.setAccountId(2L);
		account1.setAccountHolderName("ROhit");
		account1.setAddress("Karanataka");
		account1.setBalance(50000);
		account1.setCity("BLR");
		account1.setCreatedBy("xyz");
		account1.setEmail("xyz@gmail");
		account1.setModifiedBy("qwe");
		account1.setPhoneNumber(992612L);

		transaction1.setAfterAccountBalance(1200);
		transaction1.setBeforeAccountBalance(1000);
		transaction1.setComment("transfer");
		transaction1.setFromAccount(account);
		transaction1.setToAccount(account1);
		transaction1.setTransactionId(123L);
		transaction1.setTransferAmount(120);
		transaction1.setTransferType("debit");

		lst.add(transaction1);
		
		transactionDto.setAfterAccountBalance(1100);
		transactionDto.setBeforeAccountBalance(1200);
		transactionDto.setComment("transfer");
		transactionDto.setFromAccount(1L);
		transactionDto.setToAccount(2L);
		transactionDto.setTransactionId(12L);
		transactionDto.setTransferAmount(120);
		transactionDto.setTransferType("debit");
		

	}

	@Test
	public void testGetTransferAccountDetail() {
		Mockito.when(transactionRepository.findByTransactionId(11L)).thenReturn(transaction);
		Transaction trans = transactionServiceImpl.getTransferAccountDetail(11L);
		Assert.assertEquals(200.0, trans.getTransferAmount());
	}

	@Test
	public void testGetAccountDetail() {
		Mockito.when(transactionRepository.findByAccountId(account.getAccountId())).thenReturn(lst);
		List<Transaction> actval = transactionServiceImpl.getAccountDetail(account.getAccountId());
		Assert.assertEquals(1, actval.size());

	}
	
	@Test
	public void testTransferMoney() {
		Mockito.when(accountRepository.findByAccountId(1L)).thenReturn(account);
		Mockito.when(accountRepository.findByAccountId(2L)).thenReturn(account);
		Transaction actval3= transactionServiceImpl.transferMoney(transactionDto);
		Assert.assertEquals(120.0, actval3.getTransferAmount());
	}
	
}
