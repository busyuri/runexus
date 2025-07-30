package com.example.runexus.application.controllers;

import com.example.runexus.infrastructure.persistence.repository.CommentRepository;
import com.example.runexus.infrastructure.persistence.repository.EntryRepository;
import com.example.runexus.infrastructure.persistence.repository.EventRepository;
import com.example.runexus.infrastructure.persistence.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dev")
public class DevController {

    private final CommentRepository commentRepository;
    private final EntryRepository entryRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public DevController(CommentRepository commentRepository,
                         EntryRepository entryRepository,
                         UserRepository userRepository, EventRepository eventRepository) {
        this.commentRepository = commentRepository;
        this.entryRepository = entryRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @DeleteMapping("/reset")
    public ResponseEntity<String> resetDatabase() {
        eventRepository.deleteAll();
        commentRepository.deleteAll();
        entryRepository.deleteAll();
         // eğer varsa
        userRepository.deleteAll();
        return ResponseEntity.ok("Veritabanı sıfırlandı.");
    }
}
