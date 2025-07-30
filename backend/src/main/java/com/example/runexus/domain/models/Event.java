package com.example.runexus.domain.models;

import java.time.LocalDate;
import java.util.List;

public class Event {

    private Long eventId;
    private Long userId;
    private String title;
    private String description;
    private int participantLimit;
    private boolean isFull;
    private LocalDate eventDate;


    public Event() {
        this.isFull = false;
    }

    public Event(Long eventId, Long userId, String title, String description, int participantLimit, boolean isFull, LocalDate eventDate, List<User> participantList) {
        this.eventId = eventId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.participantLimit = participantLimit;
        this.isFull = isFull;
        this.eventDate = eventDate;
    }

    // Getters and Setters

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
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

    public int getParticipantLimit() {
        return participantLimit;
    }

    public void setParticipantLimit(int participantLimit) {
        this.participantLimit = participantLimit;
    }

    public boolean isFull() {
        return isFull;
    }

    public void setFull(boolean full) {
        isFull = full;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

}
