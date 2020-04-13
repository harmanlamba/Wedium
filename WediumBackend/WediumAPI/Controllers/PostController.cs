using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
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

        [AllowAnonymous]
        [HttpGet("Get")]
        public ActionResult<List<PostDto>> Get()
        {
            return Ok(_service.GetPosts(null));
        }

        [AllowAnonymous]
        [HttpGet("Get/{postId}")]
        public ActionResult<List<PostDto>> Get(int postId)
        {
            return Ok(_service.GetPosts(postId));
        }

        [Authorize]
        [HttpPost("Post")]
        public IActionResult CreatePost([FromBody]PostDto postDto)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                _service.CreatePost(postDto, userId);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (AggregateException e)
            {
                if(e.InnerException.GetType() == typeof(WikiArticleNotFoundException))
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [Authorize]
        [HttpDelete("Delete")]
        public IActionResult DeletePost([FromBody]PostDto postDto)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            bool hasDeleted = _service.DeletePost(postDto, userId);

            if (hasDeleted)
            {
                return Ok();
            }

            return Unauthorized();
        }
    }
}
