package com.example.runexus.domain.ports;

import com.example.runexus.domain.models.Notification;

import java.util.List;

public interface NotificationService {
    void sendNotificationToUser(Long userId, String title, String message);
    void sendNotificationToUsers(List<Long> userIds, String title, String message);
    List<Notification> getNotificationsByUserId(Long userId);
    void markAsRead(Long notificationId);
}
