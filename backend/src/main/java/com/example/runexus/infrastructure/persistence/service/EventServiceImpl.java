package com.example.runexus.infrastructure.persistence.service;


import com.example.runexus.domain.models.Event;
import com.example.runexus.domain.ports.EventService;
import com.example.runexus.domain.ports.NotificationService;
import com.example.runexus.infrastructure.mapper.EventMapper;
import com.example.runexus.infrastructure.persistence.entity.EventEntity;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import com.example.runexus.infrastructure.persistence.repository.EventRepository;
import com.example.runexus.infrastructure.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final EventMapper eventMapper;

    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository, NotificationService notificationService, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.eventMapper = eventMapper;
    }


    @Override
    public Event createEvent(Event event) {
        EventEntity savedEntity = eventRepository.save(eventMapper.domainToEntity(event));
        Event createdEvent = eventMapper.entityToDomain(savedEntity);

        
        List<Long> allUserIds = userRepository.findAll().stream()
                .filter(user -> !user.getUserId().equals(event.getUserId())) 
                .map(UserEntity::getUserId)
                .collect(Collectors.toList());

        notificationService.sendNotificationToUsers(
                allUserIds,
                "New Event: " + createdEvent.getTitle(),
                "New Event is created. Would you like to join?"
        );

        return createdEvent;
    }


    @Override
    public Event updateEvent(Long eventId, Event event) {
        EventEntity updatedEventEntity = eventMapper.domainToEntity(event);
        updatedEventEntity.setEventId(eventId);
        return eventMapper.entityToDomain(eventRepository.save(updatedEventEntity));
    }

    @Override
    public boolean deleteEvent(Long eventId, Long userId) {
        Optional<EventEntity> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            EventEntity event = optionalEvent.get();

            if (!event.getUserId().equals(userId)) {
                return false;
            }

            eventRepository.deleteById(eventId);
            return true;
        }
        return false;
    }

    @Override
    public void joinEvent(Long eventId, Long userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        Optional<EventEntity> optionalEvent = eventRepository.findById(eventId);

        if (optionalUser.isEmpty() || optionalEvent.isEmpty()) return;

        UserEntity user = optionalUser.get();
        EventEntity event = optionalEvent.get();

        Set<EventEntity> joinedEvents = user.getJoinedEvents();

        boolean alreadyJoined = joinedEvents.contains(event);
        if (alreadyJoined) return;

        long currentParticipants = userRepository.findAll().stream()
                .filter(u -> u.getJoinedEvents().contains(event))
                .count();

        if (currentParticipants >= event.getParticipantLimit()) {
            throw new IllegalStateException("Event is full");
        }

        joinedEvents.add(event);
        userRepository.save(user);
    }

    @Override
    public void leaveEvent(Long eventId, Long userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        Optional<EventEntity> optionalEvent = eventRepository.findById(eventId);

        if (optionalUser.isEmpty() || optionalEvent.isEmpty()) return;

        UserEntity user = optionalUser.get();
        EventEntity event = optionalEvent.get();

        boolean removed = user.getJoinedEvents().remove(event);
        if (removed) {
            userRepository.save(user);
        }
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .peek(entity -> entity.setParticipantCount(entity.getJoinedUsers().size()))
                .map(eventMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId)
                .map(eventMapper::entityToDomain);
    }

    @Override
    public List<Event> getEventByUserId(Long userId) {
        return eventRepository.findByUserId(userId)
                .stream()
                .map(eventMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    //new
    @Override
    public List<Event> findEventsByUserId(Long userId) {
        List<EventEntity> entities = eventRepository.findByUserId(userId);
        return entities.stream()
                .map(eventMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Event> findJoinedEventsByUserId(Long userId) {
        List<EventEntity> entities = eventRepository.findJoinedEventsByUserId(userId);
        return entities.stream()
                .peek(entity -> entity.setParticipantCount(entity.getJoinedUsers().size()))
                .map(eventMapper::entityToDomain)
                .collect(Collectors.toList());
    }




}

