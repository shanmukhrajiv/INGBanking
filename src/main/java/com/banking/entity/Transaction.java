package com.banking.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Transaction implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long transactionId;
	@ManyToOne
	@JoinColumn(name="fromAcc")
	private Account fromAccount;
	@ManyToOne
	@JoinColumn(name="toAcc")
	private Account toAccount;
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
	public Account getFromAccount() {
		return fromAccount;
	}
	public void setFromAccount(Account fromAccount) {
		this.fromAccount = fromAccount;
	}
	public Account getToAccount() {
		return toAccount;
	}
	public void setToAccount(Account toAccount) {
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
		return "Transaction [transactionId=" + transactionId + ", fromAccount=" + fromAccount + ", toAccount="
				+ toAccount + ", transferType=" + transferType + ", transactionDate=" + transactionDate + ", comment="
				+ comment + ", beforeAccountBalance=" + beforeAccountBalance + ", transferAmount=" + transferAmount
				+ ", afterAccountBalance=" + afterAccountBalance + "]";
	}
	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}
}
