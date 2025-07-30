package com.example.runexus.infrastructure.persistence.repository;

import com.example.runexus.domain.enums.Role;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
    

    //Optional<UserEntity> findByEmailAndPassword(String email, String password);

    List<UserEntity> findByRole(Role role);

    List<UserEntity> findByPaceBetween(double minPace, double maxPace);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByPace(double pace);
}
