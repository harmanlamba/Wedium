using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class PostLike
    {
        public int PostLikeId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }

        public virtual Post Post { get; set; }
        public virtual User User { get; set; }
    }
}
