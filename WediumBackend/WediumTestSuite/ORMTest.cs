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
        private WediumContext _db;

        [SetUp]
        public void SetUp()
        {
            _db = DatabaseContextResolver.GetDatabaseContext();
        }

        [Test]
        public void PersistanceTest()
        {
            // Adding a User to the DB
            User testUser = new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@user.com",
                Username = "testUser",
                Password = "supersecretpassword"
            };

            try
            {
                _db.User.Add(testUser);
                _db.SaveChanges();
               
                var user = _db.User.FirstOrDefault(u => u.FirstName == "Test");
                Assert.AreEqual(testUser.FirstName, user.FirstName);
                Assert.AreEqual(testUser.LastName, user.LastName);
                Assert.AreEqual(testUser.Email, user.Email);
                Assert.AreEqual(testUser.Username, user.Username);
                Assert.AreEqual(testUser.Password, user.Password);
                
                user.FirstName = "Updated Firstname";
                user.LastName = "Updated Lastname";
                
                _db.SaveChanges();
                
                Assert.AreEqual("Updated Firstname", user.FirstName);
                Assert.AreEqual("Updated Lastname", user.LastName);
            }
            finally
            {
                // Deleting the User from the database
                _db.User.Remove(testUser);
                _db.SaveChanges();

                var removedUser = _db.User.FirstOrDefault(u => u.FirstName == "Test user");
                Assert.AreEqual(null, removedUser);
            }
        }

        [Test]
        public void JoinTest()
        {
            User testUser = new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@user.com",
                Username = "testUser",
                Password = "supersecretpassword"
            };

            WikiArticle testArticle = new WikiArticle
            {
                Url = "http://test",
                ArticleAuthor = "Sangra Spider",
                ArticleDate = DateTime.Now,
                ArticleBody = "Test Body"
            };

            var postType = _db.PostType.First();

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

            try
            {
                _db.User.Add(testUser);
                _db.WikiArticle.Add(testArticle);
                _db.SaveChanges();

                WikiArticle wikiArticle = _db.WikiArticle.First(wa => wa.ArticleDate == testArticle.ArticleDate);
                testPost.WikiArticleId = wikiArticle.WikiArticleId;

                User user = _db.User.First(u => u.Username == testUser.Username);
                testPost.UserId = user.UserId;

                _db.Post.Add(testPost);
                _db.SaveChanges();

                Post post = _db.Post.First(p => p.Title == testPost.Title);
                testFavourite.PostId = post.PostId;
                testFavourite.UserId = user.UserId;

                _db.Favourite.Add(testFavourite);
                _db.SaveChanges();

                Favourite favourite = _db.Favourite.First(f => f.Date == testFavourite.Date);
                Assert.AreEqual(testUser.UserId, favourite.UserId);
                Assert.AreEqual(testPost.PostId, favourite.PostId);
            }
            finally
            {
                // Deleting created data
                _db.Favourite.Remove(testFavourite);
                _db.Post.Remove(testPost);
                _db.User.Remove(testUser);
                _db.WikiArticle.Remove(testArticle);
                _db.SaveChanges();
            }
        }
    }
}
