package com.example.runexus.infrastructure.mapper;

import com.example.runexus.application.dto.UserInput;
import com.example.runexus.domain.models.User;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User entityToDomain(UserEntity userEntity);

    UserEntity domainToEntity(User domain);

    User inputToDomain(UserInput input);
}
