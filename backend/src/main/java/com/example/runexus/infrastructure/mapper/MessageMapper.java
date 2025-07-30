package com.example.runexus.infrastructure.mapper;

import com.example.runexus.application.dto.MessageInput;
import com.example.runexus.domain.models.Message;
import com.example.runexus.infrastructure.persistence.entity.MessageEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    Message inputToDomain(MessageInput input);

    MessageEntity domainToEntity(Message domain);

    Message entityToDomain(MessageEntity entity);

    @AfterMapping
    default void enrichWithSenderInfo(MessageEntity entity, @MappingTarget Message message) {
        if (entity.getSender() != null) {
            message.setSenderName(entity.getSender().getName());
            message.setSenderId(entity.getSender().getUserId()); // ekstra güvence
        }
    }

}

