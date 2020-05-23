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

        /// <summary>
        ///  Gets a list of posts in chronological order (without duplicates), starting at the newest Post
        /// </summary>
        /// <param name="search"></param> If present, only posts with a title, description or wikipedia article 
        /// title which contain the search string, or posts with wikipedia url which equals the search string will
        /// be returned
        /// <param name="postType"></param> If present, only posts with a PostType equal to the inputted string will
        /// be returned
        /// <param name="limit"></param> The number of posts to retrieve (default: uses GetPostDefaultLimit value in 
        /// appsettings.json)
        /// <param name="after_id"></param> The last retrieved PostId (default: will start chronological stream at newest post)
        /// <returns></returns> Ok in the case that the request was successful, and Not found in the case that the posts were
        /// not found
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

        /// <summary>
        /// Get a singular post matching the post id provided
        /// </summary>
        /// <param name="postId"></param> The id of the post you want retrieved from the database
        /// <returns></returns>  Ok in the case that the request was successful, and Not found in the case that the posts were
        /// not found
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

        /// <summary>
        /// The endpoint creates a post given the postDto object
        /// </summary>
        /// <param name="postDto"></param>
        /// <returns></returns> Internal server error in the case that the request could not be processed.
        /// Created in the case of the request being succsfull, wherein the URI in the location header is the 
        /// location of the newly created post, and in the body an updated postDto is returned.
        [Authorize]
        [HttpPost("Post")]
        public IActionResult CreatePost([FromBody]PostDto postDto)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
            try
            {
                 PostDto updatedPostDto = _service.CreatePost(postDto, userId);

                return Created($"/post/{updatedPostDto.PostType}/{updatedPostDto.PostId}/{updatedPostDto.Title}", updatedPostDto.PostId);
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

        /// <summary>
        /// Deletes the post given the postId of the post
        /// </summary>
        /// <param name="postId"></param> The postId of the post that has to be deleted
        /// <returns></returns> Ok in the case that the post was deleted successfully, Not found in the case that the post 
        /// was not found
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

        /// <summary>
        /// The endpoint gets the posts created by the authenticated user making the request
        /// </summary>
        /// <param name="limit"></param> The number of posts to retrieve (default: uses GetPostDefaultLimit 
        /// value in appsettings.json)
        /// <param name="after_id"></param> The last retrieved PostId (default: will start stream at the most 
        /// recently created post)
        /// <returns></returns>
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
