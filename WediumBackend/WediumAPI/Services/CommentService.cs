using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<CommentDto> GetCommentsForPost(int postId)
        {
            Post post = _db.Post.FirstOrDefault(p => p.PostId == postId) ?? throw new PostNotFoundException();

            IQueryable<Comment> commentListQuery = _db.Comment
                .AsQueryable()
                .Where(c => c.PostId == postId);

            return CommentMapper.ToDto(commentListQuery.ToList());
        }

        public (int,PostDto) CreateComment(CommentDto commentDto, int? userId)
        {
            Post post = _db.Post
                .Where(p => p.PostId == commentDto.PostId)
                .Include(p => p.PostType)
                .FirstOrDefault() ?? throw new PostNotFoundException();

            Comment comment = CommentMapper.FromDto(commentDto);
            comment.UserId = (int) userId;
         
            _db.Comment.Add(comment);
            _db.SaveChanges();
          
            return (comment.CommentId, PostMapper.ToDtoPostUrl(post));
        }
    }
}
