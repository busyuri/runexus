package com.example.runexus.infrastructure.mapper;

import com.example.runexus.domain.models.Notification;
import com.example.runexus.infrastructure.persistence.entity.NotificationEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationEntity domainToEntity(Notification domain);

    Notification entityToDomain(NotificationEntity entity);
}

