package com.example.runexus.infrastructure.persistence.service;

import com.example.runexus.domain.enums.Role;
import com.example.runexus.domain.models.User;
import com.example.runexus.domain.ports.UserService;
import com.example.runexus.infrastructure.mapper.UserMapper;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import com.example.runexus.infrastructure.persistence.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User registerUser(User user) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new IllegalStateException("Bu email adresi zaten kayıtlı: " + user.getEmail());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == Role.VISITOR || user.getRole() == null) {
            user.setRole(Role.REGISTERED);
        }

        UserEntity savedEntity = userRepository.save(userMapper.domainToEntity(user));
        return userMapper.entityToDomain(savedEntity);
    }



    @Override
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(userEntity -> passwordEncoder.matches(password, userEntity.getPassword()))
                .map(userMapper::entityToDomain);
    }

    @Override
    public boolean deleteUser(Long userId) {
        if(userRepository.existsById(userId)){
            userRepository.deleteById(userId);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public User updateUser(Long userId, User user) {
        Optional<UserEntity> existingOpt = userRepository.findById(userId);
        if (existingOpt.isEmpty()) {
            throw new IllegalStateException("User not found");
        }

        UserEntity existing = existingOpt.get();

        // Sadece güncellenen alanları değiştir
        existing.setName(user.getName());
        existing.setSurname(user.getSurname());
        existing.setGender(user.getGender());
        existing.setBirthday(user.getBirthday());
        existing.setAge(user.getAge());
        existing.setPace(user.getPace());
        existing.setProfilePicture(user.getProfilePicture());


        UserEntity saved = userRepository.save(existing);
        return userMapper.entityToDomain(saved);
    }




    @Override
    public User changePassword(Long userId, String oldPassword, String newPassword) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return null;
        }

        UserEntity user = optionalUser.get();

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return null;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        UserEntity updatedUser = userRepository.save(user);

        return userMapper.entityToDomain(updatedUser);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(userMapper::entityToDomain);
    }

    @Override
    public List<User> getAllUsersByRole(Role role) {
        return userRepository.findByRole(role)
                .stream()
                .map(userMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getAllUsersByPace(double pace) {
        return userRepository.findByPace(pace)
                .stream()
                .map(userMapper::entityToDomain)
                .collect(Collectors.toList());
    }
}
