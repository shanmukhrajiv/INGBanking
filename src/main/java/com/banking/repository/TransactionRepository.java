package com.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.banking.entity.Account;
import com.banking.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	@Query(value = "select * from transaction where from_acc = ?1", nativeQuery = true)
	List<Transaction> findByAccountId(Long accountId);

	Transaction findByTransactionId(Long transactionId);

	Account findByFromAccountAccountId(Long fromAccount);

	Account findByToAccountAccountId(Long toAccount);

}
