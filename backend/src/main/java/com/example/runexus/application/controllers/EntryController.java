package com.example.runexus.application.controllers;

import com.example.runexus.application.dto.*;
import com.example.runexus.infrastructure.mapper.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.runexus.domain.models.*;
import com.example.runexus.domain.ports.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entries")
public class EntryController {

    private final EntryService entryService;
    private final EntryMapper entryMapper;

    public EntryController(EntryService entryService, EntryMapper entryMapper) {
        this.entryService = entryService;
        this.entryMapper = entryMapper;
    }

    @PostMapping
    public ResponseEntity<Entry> createEntry(@RequestBody EntryInput entryInput) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(entryService.createEntry(entryMapper.inputToDomain(entryInput)));
    }

    @DeleteMapping("/{entryId}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long entryId, @RequestParam Long userId) {
        boolean deleted = entryService.deleteEntry(entryId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{entryId}")
    public ResponseEntity<Entry> getEntryById(@PathVariable Long entryId) {
        return entryService.findEntryById(entryId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @GetMapping
    public ResponseEntity<List<Entry>> getAllEntries() {
        return ResponseEntity.ok(entryService.findAllEntries());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Entry>> getEntriesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(entryService.findJournalByUserId(userId));
    }

    @PutMapping("/{entryId}")
    public ResponseEntity<Entry> updateEntry(@PathVariable Long entryId, @RequestBody EntryInput input) {
        Entry updated = entryService.updateEntry(entryId, entryMapper.inputToDomain(input));
        return ResponseEntity.ok(updated);
    }


}
