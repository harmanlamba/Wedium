using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WediumAPI.Dto;
using WediumAPI.Models;

namespace WediumAPI.Mappers
{
    public class PostMapper
    {
        public static PostDto ToDto(Post post, int? userId)
        {
            return new PostDto
            {
                PostId = post.PostId,
                Date = post.Date,
                Title = post.Title,
                Description = post.Description,

                // User
                Username = $"{post.User.FirstName} {post.User.LastName}",

                // Post Type
                PostType = post.PostType.PostTypeValue,

                // Wiki Article
                ArticleBody = post.WikiArticle.ArticleBody,
                ArticleTitle = post.WikiArticle.ArticleTitle,
                ArticleUrl = post.WikiArticle.Url,
                ArticleImageUrl = post.WikiArticle.ArticleImageUrl,

                // PostLikes
                NumberOfLikes = post.PostLike.Count,
                IsPostLiked = userId.HasValue ? (bool?)post.PostLike.Any(pl => pl.UserId == userId.Value) : null,

                // Favourite
                IsFavourited = userId.HasValue ? (bool?)post.Favourite.Any(f => f.UserId == userId.Value) : null,

                // For Pagination
                HasMore = true
            };
        }

        public static IEnumerable<PostDto> ToDto(IEnumerable<Post> postList, int? userId)
        {
            return postList.Select(p => ToDto(p, userId));
        }
    }
}
