using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class Comment
    {
        public Comment()
        {
            CommentLike = new HashSet<CommentLike>();
            InverseParentComment = new HashSet<Comment>();
        }

        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int? ParentCommentId { get; set; }
        public string Body { get; set; }
        public int CommentTypeId { get; set; }

        public virtual CommentType CommentType { get; set; }
        public virtual Comment ParentComment { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<CommentLike> CommentLike { get; set; }
        public virtual ICollection<Comment> InverseParentComment { get; set; }
    }
}
