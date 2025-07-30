package com.example.runexus.infrastructure.persistence.service;

import com.example.runexus.domain.models.Entry;
import com.example.runexus.domain.ports.EntryService;
import com.example.runexus.infrastructure.mapper.EntryMapper;
import com.example.runexus.infrastructure.persistence.entity.EntryEntity;
import com.example.runexus.infrastructure.persistence.repository.EntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EntryServiceImpl implements EntryService {

    private final EntryRepository entryRepository;
    private final EntryMapper entryMapper;

    public EntryServiceImpl(EntryRepository entryRepository, EntryMapper entryMapper) {
        this.entryRepository = entryRepository;
        this.entryMapper = entryMapper;
    }


    @Override
    public Optional<Entry> findEntryById(Long entryId) {
        return entryRepository.findById(entryId)
                .map(entryMapper::entityToDomain);
    }

    @Override
    public List<Entry> findJournalByUserId(Long userId) {
        return entryRepository.findByUserId(userId)
                .stream()
                .map(entryMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Entry> findAllEntries() {
        return entryRepository.findAll()
                .stream()
                .map(entryMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Entry createEntry(Entry entry) {
        EntryEntity savedEntryEntity = entryRepository.save(entryMapper.domainToEntity(entry));
        return entryMapper.entityToDomain(savedEntryEntity);
    }

    @Override
    public boolean deleteEntry(Long entryId, Long userId) {
        Optional<EntryEntity> optionalEntry = entryRepository.findById(entryId);

        if (optionalEntry.isPresent()) {
            EntryEntity entry = optionalEntry.get();

            if (!entry.getUserId().equals(userId)) {
                return false;
            }

            entryRepository.deleteById(entryId);
            return true;

        } else {
            return false;
        }
    }

    @Override
    public Entry updateEntry(Long entryId, Entry updatedEntry) {
        Optional<EntryEntity> optional = entryRepository.findById(entryId);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("Entry not found");
        }

        EntryEntity existing = optional.get();
        existing.setTitle(updatedEntry.getTitle());
        existing.setDescription(updatedEntry.getDescription());
        existing.setEntryDate(updatedEntry.getEntryDate());

        EntryEntity saved = entryRepository.save(existing);
        return entryMapper.entityToDomain(saved);
    }


}
