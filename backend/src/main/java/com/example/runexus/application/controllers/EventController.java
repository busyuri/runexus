package com.example.runexus.application.controllers;

import com.example.runexus.application.dto.EventInput;
import com.example.runexus.domain.models.Event;
import com.example.runexus.domain.ports.EventService;
import com.example.runexus.infrastructure.mapper.EventMapper;

import com.example.runexus.infrastructure.persistence.entity.EventEntity;
import com.example.runexus.infrastructure.persistence.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;
    private final EventRepository eventRepository; //new

    //new
    public EventController(EventService eventService, EventMapper eventMapper, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventMapper = eventMapper;
        this.eventRepository= eventRepository;
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody EventInput eventInput) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(eventService.createEvent(eventMapper.inputToDomain(eventInput)));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long eventId, @RequestBody EventInput eventInput) {
        Event updatedEvent = eventService.updateEvent(eventId, eventMapper.inputToDomain(eventInput));
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        boolean deleted = eventService.deleteEvent(eventId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{eventId}/join")
    public ResponseEntity<Void> joinEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        eventService.joinEvent(eventId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{eventId}/leave")
    public ResponseEntity<Void> leaveEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        eventService.leaveEvent(eventId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/myevents")
    public ResponseEntity<List<Event>> getMyEvents(@RequestParam Long userId) {
        List<Event> createdEvents = eventService.getEventByUserId(userId); // Kullanıcının oluşturduğu etkinlikler
        List<Event> joinedEvents = eventService.findJoinedEventsByUserId(userId); // Katıldığı etkinlikler

        // Aynı etkinlik ID'sine sahip olanları tekrar etmesin diye filtrele
        Set<Long> createdIds = createdEvents.stream()
                .map(Event::getEventId)
                .collect(Collectors.toSet());

        List<Event> onlyJoinedEvents = joinedEvents.stream()
                .filter(event -> !createdIds.contains(event.getEventId()))
                .toList();

        // Oluşturduklarını ve katıldıklarını birleştir
        createdEvents.addAll(onlyJoinedEvents);

        return ResponseEntity.ok(createdEvents);

    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(eventService.getEventByUserId(userId));
    }

    @GetMapping("/joined")
    public ResponseEntity<List<Event>> getJoinedEvents(@RequestParam Long userId) {
        List<Event> joinedEvents = eventService.findJoinedEventsByUserId(userId);
        return ResponseEntity.ok(joinedEvents);
    }


    @GetMapping("/{id}/participantCount")
    public ResponseEntity<Integer> getCount(@PathVariable Long id) {
        EventEntity event = eventRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(event.getJoinedUsers().size());
    }


}

