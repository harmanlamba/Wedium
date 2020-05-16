using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;

namespace WediumAPI.Services
{
    public interface ICommentService
    {
        public IEnumerable<CommentDto> GetCommentsForPost(int postId);
        public (int,PostDto) CreateComment(CommentDto commentDto, int? userId);
    }
}
