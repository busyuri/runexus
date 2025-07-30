package com.example.runexus.infrastructure.persistence.repository;

import com.example.runexus.infrastructure.persistence.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findByUserId(Long userId);

    @Query(value = """
        SELECT e.* FROM events e
        INNER JOIN user_event_joined ue ON e.event_id = ue.event_id
        WHERE ue.user_id = :userId
    """, nativeQuery = true)
    List<EventEntity> findJoinedEventsByUserId(@Param("userId") Long userId);


}

