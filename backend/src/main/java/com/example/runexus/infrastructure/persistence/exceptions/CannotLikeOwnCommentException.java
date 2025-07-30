package com.example.runexus.infrastructure.persistence.exceptions;

public class CannotLikeOwnCommentException extends RuntimeException {
  public CannotLikeOwnCommentException() {
    super("You cannot like your own comment.");
  }
}
