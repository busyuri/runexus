package com.example.runexus.application.controllers;

import com.example.runexus.application.dto.UserInput;
import com.example.runexus.domain.enums.Role;
import com.example.runexus.domain.models.User;
import com.example.runexus.domain.ports.UserService;
import com.example.runexus.infrastructure.mapper.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }


    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserInput userInput) {
        User updated = userService.updateUser(userId, userMapper.inputToDomain(userInput));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        boolean deleted = userService.deleteUser(userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/change-password")
    public ResponseEntity<User> changePassword(
            @PathVariable Long userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword
    ) {
        User updated = userService.changePassword(userId, oldPassword, newPassword);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Eski şifre yanlış
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.getAllUsersByRole(role));
    }

    @GetMapping("/pace")
    public ResponseEntity<List<User>> getUsersByPace(@RequestParam double pace) {
        return ResponseEntity.ok(userService.getAllUsersByPace(pace));
    }

}
