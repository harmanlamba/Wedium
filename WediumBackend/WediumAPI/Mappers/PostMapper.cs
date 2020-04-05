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
        public static PostDto ToDto(Post post)
        {
            return new PostDto
            {
                PostId = post.PostId,
                Date = post.Date,
                Title = post.Title,
                Description = post.Description,
                Username = post.User.Username,

                // Post Type
                PostType = post.PostType.PostTypeValue,

                // Wiki Article
                ArticleBody = post.WikiArticle.ArticleBody,
                ArticleTitle = post.WikiArticle.ArticleTitle,
                ArticleUrl = post.WikiArticle.Url,
                ArticleImageUrl = post.WikiArticle.ArticleImageUrl
            };
        }

        public static IEnumerable<PostDto> ToDto(IEnumerable<Post> postList)
        {
            return postList.Select(p => ToDto(p));
        }
    }
}
