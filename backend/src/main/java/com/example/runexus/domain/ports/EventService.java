package com.example.runexus.domain.ports;

import com.example.runexus.domain.models.Event;

import java.util.List;
import java.util.Optional;


public interface EventService {
    Event createEvent(Event event);
    Event updateEvent(Long eventId, Event event);
    boolean deleteEvent(Long eventId, Long userId);

    void joinEvent(Long eventId, Long userId);
    void leaveEvent(Long eventId, Long userId);

    List<Event> getAllEvents();
    Optional<Event> getEventById(Long eventId);
    List<Event> getEventByUserId(Long userId);
    //new
    List<Event> findEventsByUserId(Long userId);
    List<Event> findJoinedEventsByUserId(Long userId);





}

