package com.banking.dto;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class TransactionDto {

	private Long transactionId;
	private Long fromAccount;
	private Long toAccount;
	private String transferType;
	@Temporal(TemporalType.DATE)
	private Date transactionDate;

	private String comment;
	private double beforeAccountBalance;
	private double transferAmount;
	private double afterAccountBalance;

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Long getFromAccount() {
		return fromAccount;
	}

	public void setFromAccount(Long fromAccount) {
		this.fromAccount = fromAccount;
	}

	public Long getToAccount() {
		return toAccount;
	}

	public void setToAccount(Long toAccount) {
		this.toAccount = toAccount;
	}

	public String getTransferType() {
		return transferType;
	}

	public void setTransferType(String transferType) {
		this.transferType = transferType;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public double getBeforeAccountBalance() {
		return beforeAccountBalance;
	}

	public void setBeforeAccountBalance(double beforeAccountBalance) {
		this.beforeAccountBalance = beforeAccountBalance;
	}

	public double getTransferAmount() {
		return transferAmount;
	}

	public void setTransferAmount(double transferAmount) {
		this.transferAmount = transferAmount;
	}

	public double getAfterAccountBalance() {
		return afterAccountBalance;
	}

	public void setAfterAccountBalance(double afterAccountBalance) {
		this.afterAccountBalance = afterAccountBalance;
	}

	@Override
	public String toString() {
		return "TransactionDto [transactionId=" + transactionId + ", fromAccount=" + fromAccount + ", toAccount="
				+ toAccount + ", transferType=" + transferType + ", transactionDate=" + transactionDate + ", comment="
				+ comment + ", beforeAccountBalance=" + beforeAccountBalance + ", transferAmount=" + transferAmount
				+ ", afterAccountBalance=" + afterAccountBalance + "]";
	}

	public TransactionDto() {
		super();
		// TODO Auto-generated constructor stub
	}
}
