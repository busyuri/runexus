package com.example.runexus.application.controllers;


import com.example.runexus.application.dto.CommentInput;
import com.example.runexus.domain.models.Comment;
import com.example.runexus.domain.models.Entry;
import com.example.runexus.domain.ports.CommentService;
import com.example.runexus.infrastructure.mapper.CommentMapper;
import com.example.runexus.infrastructure.persistence.exceptions.CannotLikeOwnCommentException;
import com.example.runexus.infrastructure.persistence.exceptions.CommentAlreadyLikedException;
import com.example.runexus.infrastructure.persistence.exceptions.ElementNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentInput commentInput) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(commentService.createComment(commentMapper.inputToDomain(commentInput)));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        boolean deleted = commentService.deleteComment(commentId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{commentId}/like")
    public ResponseEntity<Void> likeComment(@PathVariable Long commentId, @RequestParam Long userId) {
        try {
            commentService.likeComment(commentId, userId);
            return ResponseEntity.ok().build(); // 200 OK
        } catch (CommentAlreadyLikedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict
        } catch (CannotLikeOwnCommentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (ElementNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        }
    }


    @GetMapping("/entry/{entryId}")
    public ResponseEntity<List<Comment>> getCommentsByEntry(@PathVariable Long entryId) {
        return ResponseEntity.ok(commentService.findCommentByEntryId(entryId));
    }
}

