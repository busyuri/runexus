package com.example.runexus.infrastructure.mapper;

import com.example.runexus.application.dto.EntryInput;
import com.example.runexus.domain.models.Entry;
import com.example.runexus.infrastructure.persistence.entity.EntryEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EntryMapper {

    Entry entityToDomain(EntryEntity entity);
    EntryEntity domainToEntity(Entry domain);

    Entry inputToDomain(EntryInput input);
}
