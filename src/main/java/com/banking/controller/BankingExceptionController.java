package com.banking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.banking.dto.Message;
import com.banking.exception.ApplicationException;


@ControllerAdvice
public class BankingExceptionController {
	
	@ExceptionHandler(value = ApplicationException.class)
	   public ResponseEntity<Message> exception(ApplicationException exception) {
		Message message = new Message();
		message.setMessage(exception.getErrorMessage());
		return new ResponseEntity<Message>(message, HttpStatus.NOT_FOUND);
	   }

}
