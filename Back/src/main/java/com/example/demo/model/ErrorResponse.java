package com.example.demo.model;

import java.sql.Timestamp;

public class ErrorResponse {

  private Timestamp timestamp;
  private String message;
  private int status;
  private String error;

  public Timestamp getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Timestamp timestamp) {
    this.timestamp = timestamp;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public ErrorResponse(String message, int status, String error) {
    this.timestamp = new Timestamp(System.currentTimeMillis());
    this.message = message;
    this.status = status;
    this.error = error;
  }

}
