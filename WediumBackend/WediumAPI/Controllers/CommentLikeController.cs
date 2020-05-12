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
    public class CommentLikeController : ControllerBase
    {
        private readonly ICommentLikeService _service;

        public CommentLikeController(ICommentLikeService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost("Post")]
        public IActionResult Create([FromBody]CommentLikeDto commentLikeDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.CreateCommentLike(userId, commentLikeDto.CommentId);

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (CommentLikeAlreadyExistsException)
            {
                return Ok();
            }
            catch (CommentNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete([FromBody]CommentLikeDto commentLikeDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.DeleteCommentLike(userId, commentLikeDto.CommentId);

                return Ok();
            }
            catch (CommentLikeNotFoundException)
            {
                return NoContent();
            }
            catch (CommentNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
