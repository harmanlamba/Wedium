using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface ICommentService
    {
        public bool CheckExists(int commentId);
        public IEnumerable<CommentDto> GetCommentsForPost(int postId, int? userId);
        public (CommentDto commentDto, PostDto post) CreateComment(CommentDto commentDto, int? userId);
    }
}
