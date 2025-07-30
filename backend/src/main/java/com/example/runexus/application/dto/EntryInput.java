package com.example.runexus.application.dto;

import java.time.LocalDate;

public class EntryInput {

    private Long userId;
    private String title;
    private String description;
    private LocalDate entryDate;

    public EntryInput() {
        this.entryDate = LocalDate.now(); // otomatik tarih
    }

    public EntryInput(Long userId, String title, String description) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.entryDate = LocalDate.now(); // otomatik tarih
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = (entryDate != null) ? entryDate : LocalDate.now();
    }
}

