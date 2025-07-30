package com.example.runexus.application.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class EventInput implements Serializable {

    private Long userId;
    private String title;
    private String description;
    private int participantLimit;
    private LocalDate eventDate;

    public EventInput() {
        this.eventDate = LocalDate.now(); // Otomatik tarih
    }

    public EventInput(Long userId, String title, String description, int participantLimit) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.participantLimit = participantLimit;
        this.eventDate = LocalDate.now(); // Otomatik tarih
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

    public int getParticipantLimit() {
        return participantLimit;
    }

    public void setParticipantLimit(int participantLimit) {
        this.participantLimit = participantLimit;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    // setEventDate metodu ister kaldır ister LocalDate.now() sabit kalsın
    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate != null ? eventDate : LocalDate.now();
    }
}

