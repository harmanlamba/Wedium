using System;
using WediumAPI.Models;

namespace WediumAPI.Dto
{
    public class PostDto
    {
        public int PostId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        
        // User
        public string Username { get; set; }

        // Post Type
        public string PostType { get; set; }

        // Wiki Article
        public string ArticleUrl { get; set; }
        public string ArticleBody { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleImageUrl { get; set; }

        // PostLike
        public int NumberOfLikes { get; set; }

        // For Pagination
        public bool HasMore { get; set; }
    }
}
