package com.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.banking.dto.LoginDto;
import com.banking.entity.Login;
import com.banking.exception.ApplicationException;
import com.banking.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	LoginRepository loginRepository;

	private static Logger logger = Logger.getLogger(LoginServiceImpl.class.getName());

	@Override
	public Login validateLogin(LoginDto loginDto) {
		logger.log(Level.FINE, "suceess", "");
		logger.info("Inside login validation method");
		Login login = new Login();
		try {
			login = loginRepository.findByAccountAccountIdAndPassword(loginDto.getAccountId(), loginDto.getPassword());
			if (login == null)
				//logger.log(Level.SEVERE, "Invalid Login user");
				throw new ApplicationException("Invalid User!!");
		} catch (Exception e) {
			throw new ApplicationException("Invalid User");
		}
		return login;
	}

}
