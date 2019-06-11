package com.banking.service;

import org.mockito.Mockito;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import com.banking.entity.Account;
import com.banking.entity.Login;
import com.banking.repository.LoginRepository;
import junit.framework.Assert;

import com.banking.dto.LoginDto;

@RunWith(MockitoJUnitRunner.class)
public class LoginServiceImplTest {
	@InjectMocks
	LoginServiceImpl loginServiceImpl;
	@Mock
	LoginRepository loginRepository;
	static Login login = new Login();
	static Account account = new Account();

	static LoginDto loginDto = new LoginDto();

	@BeforeClass
	public static void setUp() {

		loginDto.setAccountId(1L);
		loginDto.setPassword("xyz");
		login.setPassword(loginDto.getPassword());

		account.setAccountId(1L);
		account.setAccountHolderName("Jyothi");
		account.setAddress("Karanataka");
		account.setBalance(50000);
		account.setCity("BLR");
		account.setCreatedBy("xyz");
		account.setEmail("xyz@gmail");
		account.setModifiedBy("qwe");
		account.setPhoneNumber(992612L);

		login.setAccount(account);
	}

	@Test
	public void testLogin() {
		Mockito.when(loginRepository.findByAccountAccountIdAndPassword(loginDto.getAccountId(), loginDto.getPassword())).thenReturn(login);
		Login actval = loginServiceImpl.validateLogin(loginDto);
		Assert.assertEquals("xyz", actval.getPassword());
	}
}
