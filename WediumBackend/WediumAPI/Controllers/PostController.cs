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
        public ActionResult<List<PostDto>> Get(string search, string postType, int? limit = null, int? after_id = null)
        {
            if (limit.HasValue && limit.Value < 0)
            {
                return BadRequest();
            }

            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int? userId = TryGetUserId(identity);

            try
            {
                IEnumerable<PostDto> postDtoList = _service.GetPosts(userId, search, postType, limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        [AllowAnonymous]
        [HttpGet("Get/{postId}")]
        public ActionResult<PostDto> Get(int postId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int? userId = TryGetUserId(identity);

            try
            {
                PostDto postDto = _service.GetPost(postId,userId);
                return Ok(postDto);
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
                (int postId, string Uri) = _service.CreatePost(postDto, userId);

                return Created(Uri, postId);
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

            try
            {
                _service.DeletePost(postId, userId);

                return Ok();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
            catch (PostNotValidUserException)
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpGet("GetCreated")]
        public ActionResult<List<PostDto>> GetCreatedPosts(int? limit = null, int? after_id = null)
        {
            if (limit.HasValue && limit.Value < 0)
            {
                return BadRequest();
            }

            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                IEnumerable<PostDto> postDtoList = _service.GetCreatedPosts(userId, limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        private int? TryGetUserId(ClaimsIdentity identity)
        {
            Claim claim = identity.FindFirst(ClaimTypes.NameIdentifier);
            int? userId = claim == null ? null : (int?)int.Parse(claim.Value);

            return userId;
        }
    }
}
