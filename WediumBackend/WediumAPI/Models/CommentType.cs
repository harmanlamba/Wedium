using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class CommentType
    {
        public CommentType()
        {
            Comment = new HashSet<Comment>();
        }

        public int CommentTypeId { get; set; }
        public string CommentTypeValue { get; set; }

        public virtual ICollection<Comment> Comment { get; set; }
    }
}
