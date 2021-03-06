﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Dto
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public int? ParentCommentId { get; set; }
        public string Body { get; set; }
        public int CommentTypeId { get; set; }
        public IEnumerable<CommentDto> InverseParentComment { get; set; }

        // PostLike
        public int NumberOfLikes { get; set; }
        public bool? IsCommentLiked { get; set; }
    }
}
