package com.banking.dto;

public class LoginDto {

	
	private Long accountId;
	private String password;
	
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "LoginDto [accountId=" + accountId + ", password=" + password + "]";
	}
}

