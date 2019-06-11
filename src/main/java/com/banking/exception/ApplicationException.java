package com.banking.exception;

public class ApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1691742324787003683L;
	
	private String errorMessage;
	
	public ApplicationException(String errorMessage, Throwable error) {
		super(errorMessage, error);
		this.setErrorMessage(errorMessage);
	}

	public ApplicationException(String errorMessage) {
		super(errorMessage);
		this.setErrorMessage(errorMessage);
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
	

}
