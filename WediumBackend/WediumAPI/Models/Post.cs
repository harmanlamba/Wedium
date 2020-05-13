using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class Post
    {
        public Post()
        {
            Comment = new HashSet<Comment>();
            Favourite = new HashSet<Favourite>();
            PostLike = new HashSet<PostLike>();
        }

        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int WikiArticleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PostTypeId { get; set; }

        public virtual PostType PostType { get; set; }
        public virtual User User { get; set; }
        public virtual WikiArticle WikiArticle { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Favourite> Favourite { get; set; }
        public virtual ICollection<PostLike> PostLike { get; set; }
    }
}
