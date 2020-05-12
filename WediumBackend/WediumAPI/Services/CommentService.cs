using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class CommentService : ICommentService
    {
        private readonly WediumContext _db;

        public CommentService(WediumContext wediumContext)
        {
            _db = wediumContext;
        }

        public bool CheckExists(int commentId)
        {
            return _db.Comment
                .Any(c => c.CommentId == commentId);
        }
    }
}
