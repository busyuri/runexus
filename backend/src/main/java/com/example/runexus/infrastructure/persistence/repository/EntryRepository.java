package com.example.runexus.infrastructure.persistence.repository;

import com.example.runexus.infrastructure.persistence.entity.EntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepository  extends JpaRepository<EntryEntity, Long> {
    List<EntryEntity> findByUserId(Long userId);
}
