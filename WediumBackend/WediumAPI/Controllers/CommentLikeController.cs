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

        /// <summary>
        /// The endpoint creates comment likes given a commentLikeDto object
        /// </summary>
        /// <param name="commentLikeDto"></param>
        /// <returns></returns> Ok in the case the comment was sucessfully liked, and a Not Found in the case 
        /// the comment was not found
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

        /// <summary>
        /// The endpoint deletes/removes a comment like from the comment given the commentLikeDto
        /// </summary>
        /// <param name="commentLikeDto"></param>
        /// <returns></returns> Ok in the case that the comment like was successfully deleted. No Content in the case
        /// that comment like was not found, and Not Found in the case that the comment was not found
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
