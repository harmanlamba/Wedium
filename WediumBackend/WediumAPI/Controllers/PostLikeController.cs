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
            catch(PostLikeAlreadyExistsException){
                return Ok();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

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
