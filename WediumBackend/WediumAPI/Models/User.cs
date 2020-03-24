using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class User
    {
        public User()
        {
            Comment = new HashSet<Comment>();
            CommentLike = new HashSet<CommentLike>();
            Favourite = new HashSet<Favourite>();
            Post = new HashSet<Post>();
            PostLike = new HashSet<PostLike>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }

        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<CommentLike> CommentLike { get; set; }
        public virtual ICollection<Favourite> Favourite { get; set; }
        public virtual ICollection<Post> Post { get; set; }
        public virtual ICollection<PostLike> PostLike { get; set; }
    }
}
