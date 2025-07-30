package com.example.runexus.domain.ports;

import com.example.runexus.domain.enums.Role;
import com.example.runexus.domain.models.User;

import java.util.List;
import java.util.Optional;


public interface UserService {
    User registerUser(User user);
    Optional<User> loginUser(String email, String password);
    boolean deleteUser(Long userId);
    User updateUser(Long userId, User user);
    User changePassword(Long userId, String oldPassword, String newPassword);

    List<User> getAllUsers();
    Optional<User> getUserById(Long userId);
    List<User> getAllUsersByRole(Role role);
    List<User> getAllUsersByPace(double pace);

}
