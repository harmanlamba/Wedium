﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class CommentService : ICommentService
    {
        private WediumContext _db;
        
        public CommentService(WediumContext database)
        {
            _db = database;
        }

        public IEnumerable<CommentDto> GetCommentsForPost(int postId, int? userId)
        {
            Post post = _db.Post.FirstOrDefault(p => p.PostId == postId) ?? throw new PostNotFoundException();

            IEnumerable<Comment> commentListQuery = _db.Comment
                .Where(c => c.PostId == postId & c.ParentCommentId == null)
                .Include(c => c.User)
                .Include(c => c.InverseParentComment)
                .ThenInclude(c => c.User)
                .ThenInclude(c => c.CommentLike)
                .Include(c => c.CommentType)
                .Include(c => c.CommentLike);   

            return CommentMapper.ToDto(commentListQuery, userId);
        }

        public (CommentDto commentDto, PostDto post) CreateComment(CommentDto commentDto, int? userId)
        {
            Post post = _db.Post
                .Where(p => p.PostId == commentDto.PostId)
                .Include(p => p.PostType)
                .FirstOrDefault() ?? throw new PostNotFoundException();

            Comment comment = CommentMapper.FromDto(commentDto);
            comment.UserId = (int) userId;
         
            _db.Comment.Add(comment);
            _db.SaveChanges();

            Comment commentWithJoin = _db.Comment
                .Where(c => c.CommentId == comment.CommentId)
                .Include(c => c.User)
                .Include(c => c.CommentType)
                .First();
          
            return (CommentMapper.ToDto(commentWithJoin, userId), PostMapper.ToDtoPostUrl(post));
        }

        public bool CheckExists(int commentId)
        {
            return _db.Comment
                .Any(c => c.CommentId == commentId);
        }
    }
}
