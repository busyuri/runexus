package com.example.runexus.application.controllers;

import com.example.runexus.domain.models.Notification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.runexus.domain.ports.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody Notification notification) {
        notificationService.sendNotificationToUser(
                notification.getUserId(),
                notification.getTitle(),
                notification.getMessage()
        );
        return ResponseEntity.ok("Bildirim gönderildi.");
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Okundu olarak işaretlendi.");
    }
}

