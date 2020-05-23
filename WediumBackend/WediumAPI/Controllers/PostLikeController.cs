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
    public class PostLikeController : ControllerBase
    {
        private readonly IPostLikeService _service;

        public PostLikeController(IPostLikeService service)
        {
            _service = service;
        }

        /// <summary>
        /// The endpoint likes the post associated with the inputted PostId for the authenticated user making the request
        /// </summary>
        /// <param name="postLikeDto"></param>
        /// <returns></returns> Created if the postLike was successfully created. Ok in the case of the postLike already 
        /// existing. Not found in the case of the post not being found.
        [Authorize]
        [HttpPost("Post")]
        public IActionResult Create([FromBody]PostLikeDto postLikeDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.CreatePostLike(userId, postLikeDto.PostId);

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (PostLikeAlreadyExistsException)
            {
                return Ok();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// This endpoint deletes a PostLike with the inputted PostId for the authenticated user making the request
        /// </summary>
        /// <param name="postLikeDto"></param>
        /// <returns></returns> Ok in the case of successfully deleting the PostLike. No content in the case of the 
        /// PostLike not being found/existing. Not Found in the case of the post not being found
        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete([FromBody]PostLikeDto postLikeDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.DeletePostLike(userId, postLikeDto.PostId);

                return Ok();
            }
            catch (PostLikeNotFoundException)
            {
                return NoContent();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// The endpoint gets the Liked posts of the authenticated user making the request
        /// </summary>
        /// <param name="limit"></param> The number of posts to retrieve (default: uses GetPostDefaultLimit value 
        /// in appsettings.json)
        /// <param name="after_id"></param> The last retrieved PostId (default: will start stream at the most recently liked post)
        /// <returns></returns>Ok in the case that the request was successful. Not found in the case of the post not being found.
        [Authorize]
        [HttpGet("Get")]
        public ActionResult<List<PostDto>> Get(int? limit = null, int? after_id = null)
        {
            if (limit.HasValue && limit.Value < 0)
            {
                return BadRequest();
            }

            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                IEnumerable<PostDto> postDtoList = _service.GetLikedPosts(userId, limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
