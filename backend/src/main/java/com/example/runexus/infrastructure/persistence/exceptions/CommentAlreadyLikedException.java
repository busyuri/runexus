package com.example.runexus.infrastructure.persistence.exceptions;

public class CommentAlreadyLikedException extends RuntimeException {
  public CommentAlreadyLikedException() {
    super("Comment already liked by this user.");
  }
}

