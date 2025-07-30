package com.example.runexus.domain.ports;

import com.example.runexus.domain.models.Entry;

import java.util.List;
import java.util.Optional;


public interface EntryService {
    Optional<Entry> findEntryById(Long entryId);
    List<Entry> findJournalByUserId(Long userId);
    List<Entry> findAllEntries();

    Entry createEntry(Entry entry);
    boolean deleteEntry(Long entryId, Long userId);
    Entry updateEntry(Long entryId, Entry entry);
}
