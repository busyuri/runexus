package com.example.runexus.domain.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class Comment {

    private Long id;
    private Long userId;
    private Long entryId;
    private String content;
    private LocalDateTime commentDate;
    private int likeCount;


    private Set<Long> likedUserIds;


    public Comment() {
        this.commentDate = LocalDateTime.now();
        this.likeCount = 0;
    }


    public Comment(Long id, Long userId, Long entryId, String content, int likeCount, LocalDateTime commentDate) {

        this.id = id;
        this.userId = userId;
        this.entryId = entryId;
        this.content = content;
        this.commentDate = commentDate != null ? commentDate : LocalDateTime.now();
        this.likeCount = likeCount;

        this.likedUserIds = new HashSet<>();
    }


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

    public LocalDateTime getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(LocalDateTime commentDate) {
        this.commentDate = commentDate;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }


    public Set<Long> getLikedUserIds() {
        return likedUserIds;
    }

    public void setLikedUserIds(Set<Long> likedUserIds) {
        this.likedUserIds = likedUserIds;
    }
}
