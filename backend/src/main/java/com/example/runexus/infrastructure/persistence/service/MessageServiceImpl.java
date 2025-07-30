package com.example.runexus.infrastructure.persistence.service;

import com.example.runexus.application.dto.MessageInput;
import com.example.runexus.domain.models.Message;
import com.example.runexus.domain.ports.MessageService;
import com.example.runexus.infrastructure.mapper.MessageMapper;
import com.example.runexus.infrastructure.persistence.entity.MessageEntity;
import com.example.runexus.infrastructure.persistence.entity.UserEntity;
import com.example.runexus.infrastructure.persistence.repository.MessageRepository;
import com.example.runexus.infrastructure.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.messageMapper = messageMapper;
    }

    @Override
    public Message createMessage(Message input) {


        MessageEntity entity = messageMapper.domainToEntity(input);


        UserEntity sender = userRepository.findById(input.getSenderId())
                .orElseThrow(() -> new RuntimeException("Gönderen kullanıcı bulunamadı: " + input.getSenderId()));

        UserEntity receiver = userRepository.findById(input.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Alıcı kullanıcı bulunamadı: " + input.getReceiverId()));


        entity.setSender(sender);
        entity.setReceiver(receiver);
        entity.setSentAt(LocalDateTime.now());
        entity.setRead(false);


        MessageEntity saved = messageRepository.save(entity);


        return messageMapper.entityToDomain(saved);
    }

    @Override
    public List<Message> getMessagesBetweenUsers(Long userId1, Long userId2) {
        UserEntity user1 = new UserEntity();
        user1.setUserId(userId1);

        UserEntity user2 = new UserEntity();
        user2.setUserId(userId2);

        List<MessageEntity> messages = messageRepository
                .findBySenderAndReceiverOrReceiverAndSenderOrderBySentAtAsc(user1, user2, user2, user1);

        return messages.stream()
                .map(messageMapper::entityToDomain)
                .collect(Collectors.toList());
    }


    @Override
    public Message sendMessage(MessageInput input) {
        Message message = new Message();

        try {
            Long senderId = Long.parseLong(input.getSenderId());
            Long receiverId = Long.parseLong(input.getReceiverId());

            message.setSenderId(senderId);
            message.setReceiverId(receiverId);
            message.setContent(input.getContent());

            return createMessage(message);

        } catch (NumberFormatException e) {
            throw new RuntimeException("Geçersiz kullanıcı ID formatı (Long değil): " + e.getMessage());
        }
    }

    @Override
    public List<Message> getUnreadMessagesForUser(Long userId) {
        UserEntity receiver = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User is not found."));

        List<MessageEntity> unread = messageRepository.findByReceiverAndReadFalseOrderBySentAtDesc(receiver);
        return unread.stream()
                .map(messageMapper::entityToDomain)
                .collect(Collectors.toList());
    }


    @Override
    public void markMessageAsRead(Long messageId) {
        MessageEntity message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Mesaj bulunamadı"));

        message.setRead(true);
        messageRepository.save(message);
    }




}
