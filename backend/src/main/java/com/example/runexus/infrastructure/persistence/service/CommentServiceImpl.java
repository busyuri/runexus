package com.example.runexus.infrastructure.persistence.service;

import com.example.runexus.domain.models.Comment;
import com.example.runexus.domain.ports.CommentService;
import com.example.runexus.domain.ports.NotificationService;
import com.example.runexus.infrastructure.mapper.*;
import com.example.runexus.infrastructure.persistence.entity.*;
import com.example.runexus.infrastructure.persistence.exceptions.CannotLikeOwnCommentException;
import com.example.runexus.infrastructure.persistence.exceptions.CommentAlreadyLikedException;
import com.example.runexus.infrastructure.persistence.exceptions.ElementNotFoundException;
import com.example.runexus.infrastructure.persistence.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final NotificationService notificationService;
    private final EntryRepository entryRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository, NotificationService notificationService, EntryRepository entryRepository, CommentMapper commentMapper, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.notificationService = notificationService;
        this.entryRepository = entryRepository;
        this.commentMapper = commentMapper;
        this.userRepository = userRepository;
    }

    @Override
    public List<Comment> findCommentByEntryId(Long entryId) {
        return commentRepository.findByEntryId(entryId)
                .stream()
                .map(commentMapper::entityToDomain)
                .collect(Collectors.toList());
    }


    @Override
    @Transactional
    public Comment createComment(Comment comment) {
        CommentEntity savedEntity = commentRepository.save(commentMapper.domainToEntity(comment));
        Comment createdComment = commentMapper.entityToDomain(savedEntity);


        EntryEntity entry = entryRepository.findById(comment.getEntryId()).orElse(null);

        if (entry != null && !entry.getUserId().equals(comment.getUserId())) {
            notificationService.sendNotificationToUser(
                    entry.getUserId(),
                    "New Comment",
                    "Someone commented on your post!" + comment.getContent()
            );
        }

        return createdComment;
    }


    @Override
    public boolean deleteComment(Long commentId, Long userId) {
        Optional<CommentEntity> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isPresent()) {
            CommentEntity comment = optionalComment.get();

            if (!comment.getUserId().equals(userId)) {

                return false;
            }

            commentRepository.deleteById(commentId);
            return true;

        } else {

            return false;
        }
    }


    @Override
    public void likeComment(Long commentId, Long userId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ElementNotFoundException());

        if (comment.getUserId().equals(userId)) {
            throw new CannotLikeOwnCommentException();
        }

        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) return;

        UserEntity user = optionalUser.get();
        if (comment.getLikedUsers().contains(user)) {
            throw new CommentAlreadyLikedException();
        }

        comment.getLikedUsers().add(user);
        comment.setLikeCount(comment.getLikeCount() + 1);
        commentRepository.save(comment);
    }


}
