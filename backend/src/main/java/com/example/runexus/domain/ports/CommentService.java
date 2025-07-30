package com.example.runexus.domain.ports;

import com.example.runexus.domain.models.Comment;

import java.util.List;


public interface CommentService {
    List<Comment> findCommentByEntryId(Long entryId);

    Comment createComment(Comment comment);
    boolean deleteComment(Long commentId, Long userId);
    void likeComment(Long commentId, Long userId);


}
