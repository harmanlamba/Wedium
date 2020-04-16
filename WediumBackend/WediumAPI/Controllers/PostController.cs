using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public ActionResult<List<PostDto>> Get(int? limit = null, int? after_id = null)
        {
            if (limit.HasValue && limit.Value < 0)
            {
                return BadRequest();
            }

            try
            {
                IEnumerable<PostDto> postDtoList = _service.GetPosts(limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("Post")]
        public IActionResult CreatePost([FromBody]PostDto postDto)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError; 
            try
            {
                _service.CreatePost(postDto, userId);

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (AggregateException e)
            {
                e.Handle((x) =>
                {
                    if (x is WikiArticleNotFoundException)
                    {
                        statusCode = HttpStatusCode.NotFound;

                        return true;
                    }

                    return false; 
                });
            }

            return StatusCode((int)statusCode);
        }

        [Authorize]
        [HttpDelete("Delete/{postId}")]
        public IActionResult DeletePost(int postId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
            try
            {
                _service.DeletePost(postId, userId);

                return Ok();
            }
            catch (AggregateException e)
            {
                e.Handle((x) =>
                {
                    if (x is PostNotValidUserException)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                        return true;
                    } 
                    else if (x is PostNotFoundException)
                    {
                        statusCode = HttpStatusCode.NotFound;
                        return true;
                    }
                    return false;
                });
            }

            return StatusCode((int) statusCode);
        }
    }
}
