using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WediumAPI;
using WediumAPI.Helper;
using WediumAPI.Models;
using WediumTestSuite.Helper;

namespace WediumTestSuite
{
    public class ORMTest
    {
        private DbContextOptions<WediumContext> _wediumContextOptions;

        [SetUp]
        public void SetUp()
        {
            TestServerHandler server = new TestServerHandler();

            _wediumContextOptions = server.getWediumContextOptions();
        }

        [Test]
        public void PersistanceTest()
        {
            // Adding a User to the DB
            User testUser = new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@user.com"
            };

            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                try
                {
                    db.User.Add(testUser);
                    db.SaveChanges();

                    var user = db.User.FirstOrDefault(u => u.FirstName == "Test");
                    Assert.AreEqual(testUser.FirstName, user.FirstName);
                    Assert.AreEqual(testUser.LastName, user.LastName);
                    Assert.AreEqual(testUser.Email, user.Email);

                    user.FirstName = "Updated Firstname";
                    user.LastName = "Updated Lastname";

                    db.SaveChanges();

                    Assert.AreEqual("Updated Firstname", user.FirstName);
                    Assert.AreEqual("Updated Lastname", user.LastName);
                }
                finally
                {
                    // Deleting the User from the database
                    db.User.Remove(testUser);
                    db.SaveChanges();

                    var removedUser = db.User.FirstOrDefault(u => u.FirstName == "Test user");
                    Assert.AreEqual(null, removedUser);
                }
            }
        }

        [Test]
        public void JoinTest()
        {
            User testUser = new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@user.com"
            };

            WikiArticle testArticle = new WikiArticle
            {
                Url = "http://test",
                ArticleDate = DateTime.Now,
                ArticleBody = "Test Body",
                ArticleTitle = "Test Title"
            };

            using (WediumContext db = new WediumContext(_wediumContextOptions))
            {
                var postType = db.PostType.First();

                Post testPost = new Post
                {
                    Date = DateTime.Now,
                    Title = "Urzababa The Great",
                    Description = "The Life of Urzababa",
                    PostTypeId = postType.PostTypeId
                };

                Favourite testFavourite = new Favourite
                {
                    Date = DateTime.Now
                };

                db.User.Add(testUser);
                db.WikiArticle.Add(testArticle);
                db.SaveChanges();

                WikiArticle wikiArticle = db.WikiArticle.First(wa => wa.ArticleDate == testArticle.ArticleDate);
                testPost.WikiArticleId = wikiArticle.WikiArticleId;

                User user = db.User.First(u => u.Email == testUser.Email);
                testPost.UserId = user.UserId;

                db.Post.Add(testPost);
                db.SaveChanges();

                Post post = db.Post.First(p => p.Title == testPost.Title);
                testFavourite.PostId = post.PostId;
                testFavourite.UserId = user.UserId;

                db.Favourite.Add(testFavourite);
                db.SaveChanges();

                Favourite favourite = db.Favourite.First(f => f.Date == testFavourite.Date);
                Assert.AreEqual(testUser.UserId, favourite.UserId);
                Assert.AreEqual(testPost.PostId, favourite.PostId);
            }
        }
    }
}
