using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WediumAPI.Dto;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _service;

        public PostController(IPostService service)
        {
            _service = service;
        }

        [HttpGet("Get")]
        public ActionResult<List<PostDto>> Get()
        {
            return Ok(_service.GetPosts(null));
        }

        [HttpGet("Get/{postId}")]
        public ActionResult<List<PostDto>> Get(int postId)
        {
            return Ok(_service.GetPosts(postId));
        }
    }
}
