using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;

namespace WediumAPI.Mappers
{
    public class CommentMapper
    {
        public static CommentDto ToDto(Comment comment, int? userId)
        {
            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                UserName = comment.User.FirstName + " " + comment.User.LastName,
                Date = comment.Date,
                ParentCommentId = comment.ParentCommentId,
                Body = comment.Body,
                CommentTypeId = comment.CommentTypeId,
                InverseParentComment = ToDto(comment.InverseParentComment.Reverse(), userId),

                // Comment Like
                NumberOfLikes = comment.CommentLike.Count,
                IsCommentLiked = (userId != -1) ? (bool?)comment.CommentLike.Any(c => c.UserId == userId) : null,
            };
        }

        public static IEnumerable<CommentDto> ToDto(IEnumerable<Comment> commentList, int? userId)
        {
            return commentList.Select(c => ToDto(c, userId));
        }

        public static Comment FromDto(CommentDto commentDto)
        {
            return new Comment
            {
                PostId = commentDto.PostId,
                UserId = commentDto.UserId,
                ParentCommentId = commentDto.ParentCommentId,
                Body = commentDto.Body,
                Date = DateTime.Now,
                CommentTypeId = commentDto.CommentTypeId
            };
        }
    }
}
