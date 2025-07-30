package com.example.runexus.infrastructure.persistence.exceptions;

public class ElementNotFoundException extends RuntimeException {
    public ElementNotFoundException() {
        super("Element not found.");
    }
}
