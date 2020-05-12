using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Exceptions;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class CommentLikeService : ICommentLikeService
    {
        private readonly WediumContext _db;
        private readonly ICommentService _commentService;

        public CommentLikeService(WediumContext wediumContext, ICommentService commentService)
        {
            _db = wediumContext;
            _commentService = commentService;
        }

        public void CreateCommentLike(int userId, int commentId)
        {
            if (!_commentService.CheckExists(commentId))
            {
                throw new CommentNotFoundException();
            }

            if (_db.CommentLike.Any(c => c.UserId == userId && c.CommentId == commentId))
            {
                throw new CommentLikeAlreadyExistsException();
            }

            CommentLike commentLike = new CommentLike
            {
                CommentId = commentId,
                UserId = userId,
                Date = DateTime.Now
            };

            _db.CommentLike.Add(commentLike);
            _db.SaveChanges();
        }

        public void DeleteCommentLike(int userId, int commentId)
        {
            if (!_commentService.CheckExists(commentId))
            {
                throw new CommentNotFoundException();
            }

            CommentLike commentLike = _db.CommentLike
                .FirstOrDefault(c => c.UserId == userId && c.CommentId == commentId);

            if (commentLike == null)
            {
                throw new CommentLikeNotFoundException();
            }

            _db.CommentLike.Remove(commentLike);
            _db.SaveChanges();
        }
    }
}
