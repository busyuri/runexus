package com.example.runexus.infrastructure.mapper;

import com.example.runexus.application.dto.EventInput;
import com.example.runexus.domain.models.Event;
import com.example.runexus.infrastructure.persistence.entity.EventEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventMapper {

    Event entityToDomain(EventEntity eventEntity);

    EventEntity domainToEntity(Event domain);

    Event inputToDomain(EventInput input);
}
