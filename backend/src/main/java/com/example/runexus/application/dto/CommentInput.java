package com.example.runexus.application.dto;

public class CommentInput {

    private Long userId;
    private Long entryId;
    private String content;

    public CommentInput() {}

    public CommentInput(Long userId, Long entryId, String content) {
        this.userId = userId;
        this.entryId = entryId;
        this.content = content;
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEntryId() {
        return entryId;
    }

    public void setEntryId(Long entryId) {
        this.entryId = entryId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
