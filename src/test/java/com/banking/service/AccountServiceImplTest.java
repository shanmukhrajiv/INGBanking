package com.banking.service;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.banking.entity.Account;
import com.banking.repository.AccountRepository;

import junit.framework.Assert;

@RunWith(MockitoJUnitRunner.class)
public class AccountServiceImplTest {

	@InjectMocks
	AccountServiceImpl accountServiceImpl;

	@Mock
	AccountRepository accountRepository;

	static Account account = new Account();

	@BeforeClass
	public static void setUp() {
		account.setAccountId(123L);
		account.setAccountHolderName("Jyothi");
		account.setAddress("Karanataka");
		account.setCity("BLR");
		account.setEmail("jyothi@gmail");
		account.setPhoneNumber(998372L);
		account.setCreatedBy("lakskham");
		account.setModifiedBy("kabliesh");
		account.setBalance(12000);
	}

	@Test
	public void testAccount() {
		Mockito.when(accountRepository.findByAccountId(account.getAccountId())).thenReturn(account);
		Account actval = accountServiceImpl.getAccountDetails(account.getAccountId());
		Assert.assertEquals("Jyothi", actval.getAccountHolderName());

	}

}
