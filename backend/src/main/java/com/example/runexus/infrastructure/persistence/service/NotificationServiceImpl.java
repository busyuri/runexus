package com.example.runexus.infrastructure.persistence.service;

import com.example.runexus.domain.models.Notification;
import com.example.runexus.domain.ports.NotificationService;
import com.example.runexus.infrastructure.mapper.NotificationMapper;
import com.example.runexus.infrastructure.persistence.entity.NotificationEntity;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import com.example.runexus.infrastructure.persistence.repository.NotificationRepository;
import com.example.runexus.infrastructure.persistence.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository,
                                   NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.notificationMapper = notificationMapper;
    }

    @PostConstruct
    public void testNotification() {
        Long testUserId = 1L;

        NotificationEntity notification = new NotificationEntity();
        notification.setUserId(testUserId);
        notification.setTitle("Sommer is coming!");
        notification.setMessage("Would you like to join some running events?");
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

    }

    @Override
    public void sendNotificationToUser(Long userId, String title, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        System.out.println("Bildirim gönderiliyor: " + userId);

        notificationRepository.save(notificationMapper.domainToEntity(notification));
    }

    @Override
    public void sendNotificationToUsers(List<Long> userIds, String title, String message) {
        for (Long userId : userIds) {
            sendNotificationToUser(userId, title, message);
        }
    }

    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId)
                .stream()
                .map(notificationMapper::entityToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Long notificationId) {
        Optional<NotificationEntity> opt = notificationRepository.findById(notificationId);
        opt.ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }


}

