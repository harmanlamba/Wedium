using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using WediumAPI.Models;

namespace WediumTestSuite.Helper
{
    public static class MockDBContextInitializer
    {
        public static void InitializeDB(DbContextOptions<WediumContext> options)
        {
            using (WediumContext db = new WediumContext(options))
            {
                foreach (Settings setting in InitialSettings())
                {
                    db.Settings.Add(setting);
                }

                foreach (PostType postType in InitialPostTypes())
                {
                    db.PostType.Add(postType);
                }

                foreach (User user in InitialUsers())
                {
                    db.User.Add(user);
                }

                foreach (WikiArticle wikiArticle in InitialWikiArticles())
                {
                    db.WikiArticle.Add(wikiArticle);
                }

                foreach (Post post in InitializePosts())
                {
                    db.Post.Add(post);
                }

                foreach (CommentType commentType in InitializeCommentTypes())
                {
                    db.CommentType.Add(commentType);
                }

                foreach (Comment comment in InitializeComments())
                {
                    db.Comment.Add(comment);
                }

                db.SaveChanges();
            }
        }

        public static Settings[] InitialSettings()
        {
            return new Settings[]
            {
                new Settings
                {
                    Key = "WIKIMEDIA_GET_CONTENT_ENDPOINT",
                    Value = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts"
                },
                new Settings
                {
                    Key = "WIKIMEDIA_GET_THUMBNAIL_ENDPOINT",
                    Value = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=300"
                },
                new Settings
                {
                    Key = "WIKIMEDIA_GET_LATEST_DATE_ENDPOINT",
                    Value = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=timestamp&rvdir=older&format=json"
                },
                new Settings
                {
                    Key = "WIKIARTICLE_DEFAULT_THUMBNAIL",
                    Value = "https://image.flaticon.com/icons/svg/570/570975.svg"
                }
            };
        }

        public static PostType[] InitialPostTypes()
        {
            return new PostType[]
            {
                new PostType
                {
                    PostTypeId = 1,
                    PostTypeValue = "Culture"
                },
                new PostType
                {
                    PostTypeId = 2,
                    PostTypeValue = "Nature"
                }
            };
        }

        public static User[] InitialUsers()
        {
            return new User[]
            {
                new User
                {
                    UserId = 1,
                    FirstName = "FirstNameTest1",
                    LastName = "LastNameTest1",
                    Email = "EmailTest1"
                },
                new User
                {
                    UserId = 2,
                    FirstName = "FirstNameTest2",
                    LastName = "LastNameTest2",
                    Email = "EmailTest2"
                }
            };
        }

        public static WikiArticle[] InitialWikiArticles()
        {
            return new WikiArticle[]
            {
                new WikiArticle
                {
                    WikiArticleId = 1,
                    Url = "URLTest1",
                    ArticleDate = DateTime.Now,
                    ArticleBody = "BodyTest1",
                    ArticleTitle = "TitleTest1",
                    ArticleImageUrl = "ImageTest1"
                },
                new WikiArticle
                {
                    WikiArticleId = 2,
                    Url = "URLTest2",
                    ArticleDate = DateTime.Now,
                    ArticleBody = "BodyTest2",
                    ArticleTitle = "TitleTest2",
                    ArticleImageUrl = "ImageTest2"
                },
                new WikiArticle
                {
                    WikiArticleId = 3,
                    Url = "URLTest3",
                    ArticleDate = DateTime.Now,
                    ArticleBody = "BodyTest3",
                    ArticleTitle = "TitleTest3",
                    ArticleImageUrl = "ImageTest3"
                },
                new WikiArticle
                {
                    WikiArticleId = 4,
                    Url = "URLTest4",
                    ArticleDate = DateTime.Now,
                    ArticleBody = "BodyTest4",
                    ArticleTitle = "TitleTest4",
                    ArticleImageUrl = "ImageTest4"
                }
            };
        }

        public static Post[] InitializePosts()
        {
            return new Post[]
            {
                new Post
                {
                    PostId = 1,
                    UserId = 1,
                    Date = DateTime.Now,
                    WikiArticleId = 1,
                    Title = "TitleTest1",
                    Description = "DescriptionTest1",
                    PostTypeId = 1
                },
                new Post
                {
                    PostId = 2,
                    UserId = 1,
                    Date = DateTime.Now,
                    WikiArticleId = 2,
                    Title = "TitleTest2",
                    Description = "DescriptionTest2",
                    PostTypeId = 2
                },
                new Post
                {
                    PostId = 3,
                    UserId = 2,
                    Date = DateTime.Now,
                    WikiArticleId = 3,
                    Title = "TitleTest3",
                    Description = "DescriptionTest3",
                    PostTypeId = 1
                },
                new Post
                {
                    PostId = 4,
                    UserId = 2,
                    Date = DateTime.Now,
                    WikiArticleId = 4,
                    Title = "TitleTest4",
                    Description = "DescriptionTest4",
                    PostTypeId = 1
                },
                new Post
                {
                    PostId = 5,
                    UserId = 1,
                    Date = DateTime.Now,
                    WikiArticleId = 1,
                    Title = "TitleTest5",
                    Description = "DescriptionTest5",
                    PostTypeId = 1
                }
            };
        }

        public static CommentType[] InitializeCommentTypes()
        {
            return new CommentType[]
            {
                new CommentType
                {
                    CommentTypeId = 1,
                    CommentTypeValue = "Statement"
                }
            };
        }

        public static Comment[] InitializeComments()
        {
            return new Comment[]
            {
                new Comment
                {
                    CommentId = 1,
                    PostId = 1,
                    UserId = 1,
                    Date = DateTime.Now,
                    ParentCommentId = null,
                    Body = "CommentTest1",
                    CommentTypeId = 1
                }
            };
        }
    }
}
