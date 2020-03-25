﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WediumAPI.Models;

namespace WediumAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        public readonly WediumContext _db;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<TestController> _logger;

        //public TestController(ILogger<TestController> logger)
        //{
        //    _logger = logger;
        //}

        public TestController(WediumContext db)
        {
            _db = db;
        }



        [HttpGet]
        public ActionResult Get()
        {

            User testUser = new User
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@user.com",
                Username = "testUser",
                Password = "supersecretpassword"
            };


            _db.User.Add(testUser);
            _db.SaveChanges();

            var user = _db.User.FirstOrDefault(u => u.FirstName == "Test user");
            _db.User.Remove(user);
            _db.SaveChanges();


            return Ok(new
            {
                Date = "today",
                TemperatureC = 5,
                Summary = true
            });
        }
    }
}
