﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Mappers;
using WediumAPI.Models;

namespace WediumAPI.Services
{
    public class PostService : IPostService
    {
        private readonly WediumContext _db;
        private readonly IWikiMediaApiService _wikiMediaApiService; 
        private readonly Options _options;

        private readonly string WIKIARTICLE_DEFAULT_THUMBNAIL;

        public PostService(WediumContext wediumContext, IWikiMediaApiService wikiMediaApiService, IOptions<Options> options)
        {
            _db = wediumContext;
            _wikiMediaApiService = wikiMediaApiService;
            _options = options.Value;

            Settings GetDefaultThumbnailSettings = _db.Settings
                .First(s => s.Key == "WIKIARTICLE_DEFAULT_THUMBNAIL");

            WIKIARTICLE_DEFAULT_THUMBNAIL = GetDefaultThumbnailSettings.Value;
        }

        public IEnumerable<PostDto> GetPosts(int? userId, string search, string postType, int? limit, int? afterId)
        {
            IQueryable<Post> postListQuery = _db.Post
                .Include(p => p.PostType)
                .Include(p => p.WikiArticle)
                .AsQueryable();

            // Applies afterId query if present
            if (afterId.HasValue)
            {
                // Check post with after_id as the id value exists
                Post queryInputPost = _db.Post
                    .FirstOrDefault(p => p.PostId == afterId);

                if (queryInputPost == null)
                {
                    throw new PostNotFoundException();
                }

                // Gets all posts in chronological order after after_id
                postListQuery = postListQuery
                    .Where(p => p.Date < queryInputPost.Date);
            }

            // Applies smart-search of searchString if present
            if (!string.IsNullOrEmpty(search))
            {
                postListQuery = postListQuery
                    .Where(p => p.Title.Contains(search) || p.Description.Contains(search) || p.WikiArticle.ArticleTitle.Contains(search) || p.WikiArticle.Url.Equals(search));
            }

            // Applies PostType filter if present
            if (!string.IsNullOrEmpty(postType))
            {
                postListQuery = postListQuery
                    .Where(p => p.PostType.PostTypeValue.Equals(postType));
            }

            // Adds 1 to limit to efficiently calculate hasMore of last element in list (while ensuring correctness if posttype/search filters present)
            int limitApplied = (limit.HasValue ? limit.Value : _options.GetPostDefaultLimit) + 1;

            postListQuery = postListQuery
                .OrderByDescending(p => p.Date)
                .Take(limitApplied);

            postListQuery.Select(p => p.User).Load();
            postListQuery.SelectMany(p => p.PostLike).Load();
            postListQuery.SelectMany(p => p.Favourite).Load();

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(postListQuery, userId).ToList();

            if (postDtoList.Count() == limitApplied)
            {
                postDtoList = postDtoList.SkipLast(1);
            }
            else if (postDtoList.Any())
            {
                PostDto lastPost = postDtoList.Last();
                lastPost.HasMore = false;
            }

            return postDtoList;
        }

        public PostDto GetPost(int postId, int? userId)
        {
            Post post = _db.Post
                .Where(p => p.PostId == postId)
                .Include(p => p.PostType)
                .Include(p => p.WikiArticle)
                .Include(p => p.User)
                .Include(p => p.Favourite)
                .Include(p => p.PostLike)
                .FirstOrDefault(p => p.PostId == postId) ?? throw new PostNotFoundException();
           
            return PostMapper.ToDtoIncludeWikiArticle(post, userId);
        }

        public bool CheckExists(int postId)
        {
            return _db.Post
                .Any(p => p.PostId == postId);
        }

        public PostDto CreatePost(PostDto postDto, int userId)
        {
            WikiArticle wikiArticle;
            string articleImageUrl = null;

            try
            {
                articleImageUrl = _wikiMediaApiService.GetWikiThumbnailAsync(postDto.ArticleTitle).Result;
            }
            catch (AggregateException e)
            {
                e.Handle((x) =>
                {
                    if (x is WikiArticleThumbnailNotFoundException)
                    {
                        articleImageUrl = WIKIARTICLE_DEFAULT_THUMBNAIL;

                        return true;
                    }

                    return false;
                });
            }

            wikiArticle = new WikiArticle()
            {
                Url = postDto.ArticleUrl,
                ArticleDate = _wikiMediaApiService.GetWikiLatestDateAsync(postDto.ArticleTitle).Result,
                ArticleBody = _wikiMediaApiService.GetWikiContentAsync(postDto.ArticleTitle).Result.Query.Pages.Values.First().Extract,
                ArticleTitle = postDto.ArticleTitle,
                ArticleImageUrl = articleImageUrl
            };
           
            _db.WikiArticle.Add(wikiArticle);
            _db.SaveChanges();

            PostType postType = _db.PostType.First(pt => pt.PostTypeValue == postDto.PostType);
            Post post = new Post()
            {
                UserId = userId,
                Date = DateTime.Now,
                WikiArticleId = wikiArticle.WikiArticleId,
                Title = postDto.Title,
                Description = postDto.Description,
                PostTypeId = postType.PostTypeId
            };

            _db.Post.Add(post);
            _db.SaveChanges();

            return PostMapper.ToDtoPostUrl(post);
        }

        public void DeletePost(int postId, int userId)
        {
            Post post = _db.Post.FirstOrDefault(p => p.PostId == postId);

            if (post == null)
            {
                throw new PostNotFoundException();
            }

            if (post.UserId == userId)
            {
                _db.Post.Remove(post);
                _db.SaveChanges();
            }
            else
            {
                throw new PostNotValidUserException();
            }
        }

        public IEnumerable<PostDto> GetCreatedPosts(int userId, int? limit, int? afterId)
        {
            IQueryable<Post> postQuery = _db.Post
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.Date);

            // Applies afterId query if present
            if (afterId.HasValue)
            {
                // Check post with after_id as the id value exists
                Post queryInputPost = postQuery
                    .FirstOrDefault(p => p.PostId == afterId);

                if (queryInputPost == null)
                {
                    throw new PostNotFoundException();
                }

                // Gets all posts in the order they were postliked after after_id (newest to oldest)
                postQuery = postQuery
                    .Where(p => p.Date < queryInputPost.Date);
            }

            // Adds 1 to limit to efficiently calculate hasMore of last element in list
            int limitApplied = (limit.HasValue ? limit.Value : _options.GetPostDefaultLimit) + 1;

            IQueryable<Post> createdPosts = postQuery
                .Take(limitApplied)
                .Include(p => p.PostType)
                .Include(p => p.WikiArticle);

            createdPosts.Select(p => p.User).Load();
            createdPosts.Select(p => p.Favourite).Load();
            createdPosts.Select(p => p.PostLike).Load();

            IEnumerable<PostDto> postDtoList = PostMapper.ToDto(createdPosts, userId).ToList();

            if (postDtoList.Count() == limitApplied)
            {
                postDtoList = postDtoList.SkipLast(1);
            }
            else if (postDtoList.Any())
            {
                PostDto lastPost = postDtoList.Last();
                lastPost.HasMore = false;
            }

            return postDtoList;
        }
    }
}
