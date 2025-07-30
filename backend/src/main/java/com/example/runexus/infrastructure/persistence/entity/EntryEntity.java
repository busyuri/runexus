package com.example.runexus.infrastructure.persistence.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name= "entries")
public class EntryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;
    private String description;
    private LocalDate entryDate;

    @Transient //transient olursa database e girmicek ???
    private List<CommentEntity> commentEntityList;


    public EntryEntity() {
        this.entryDate = LocalDate.now();
    }

    public EntryEntity(Long id, Long userId, String title, String description, LocalDate entryDate) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.entryDate = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long entryId) {
        this.id = entryId;
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

    public void setTitle(String entryTitle) {
        this.title = entryTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String entryDescription) {
        this.description = entryDescription;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public List<CommentEntity> getCommentList() {
        return commentEntityList;
    }

    public void setCommentList(List<CommentEntity> commentEntityList) {
        this.commentEntityList = commentEntityList;
    }
}
