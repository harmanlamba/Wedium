using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class CommentLike
    {
        public int CommentLikeId { get; set; }
        public int CommentId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }

        public virtual Comment Comment { get; set; }
        public virtual User User { get; set; }
    }
}
