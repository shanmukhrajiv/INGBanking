package com.banking.service;

import java.util.ArrayList;
import java.util.List;

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

	static Account account1 = new Account();
	static List<Account> lst = new ArrayList<Account>();

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
		lst.add(account);
		account1.setAccountId(124L);
		account1.setAccountHolderName("Rohit");
		account1.setAddress("Karanataka");
		account1.setCity("BLR");
		account1.setEmail("jyothi@gmail");
		account1.setPhoneNumber(998372L);
		account1.setCreatedBy("lakskham");
		account1.setModifiedBy("kabliesh");
		account1.setBalance(12000);
		lst.add(account1);
	}

	@Test
	public void testAccount() {
		Mockito.when(accountRepository.findByAccountId(account.getAccountId())).thenReturn(account);
		Account actval = accountServiceImpl.getAccountDetails(account.getAccountId());
		Assert.assertEquals("Jyothi", actval.getAccountHolderName());

	}

	@Test
	public void testGetbeneficiary() {
		Mockito.when(accountRepository.findByAccountIdNotLike(account.getAccountId())).thenReturn(lst);
		List<Account> actval1 = accountServiceImpl.getbeneficiary(account.getAccountId());
		Assert.assertEquals(2, actval1.size());
	}

}
