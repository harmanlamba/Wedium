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

                //Post Wiki Article Image
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

        public static PostDto ToDtoIncludeWikiArticle(Post post, int? userId)
        {
            PostDto postDto = ToDto(post, userId);

            // Wiki Article
            postDto.ArticleBody = post.WikiArticle.ArticleBody;
            postDto.ArticleTitle = post.WikiArticle.ArticleTitle;
            postDto.ArticleUrl = post.WikiArticle.Url;
            

            return postDto;
        }

        public static IEnumerable<PostDto> ToDto(IEnumerable<Post> postList, int? userId)
        {
            return postList.Select(p => ToDto(p, userId));
        }
    }
}
