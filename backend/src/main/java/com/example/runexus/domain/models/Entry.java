package com.example.runexus.domain.models;

import java.time.LocalDate;
import java.util.List;

public class Entry {

    private Long id;
    private Long userId;
    private String title;
    private String description;
    private LocalDate entryDate;
    private List<Comment> commentList;

    public Entry() {
        this.entryDate = LocalDate.now();
    }

    public Entry(Long id, Long userId, String title, String description, LocalDate entryDate, List<Comment> commentList) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.entryDate = (entryDate != null) ? entryDate : LocalDate.now();
        this.commentList = commentList;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
        this.entryDate = entryDate;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }
}
