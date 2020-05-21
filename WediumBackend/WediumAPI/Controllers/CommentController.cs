using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WediumAPI.Dto;
using WediumAPI.Exceptions;
using WediumAPI.Models;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentService _service;
        public CommentController(ICommentService commentService)
        {
            _service = commentService;
        }

        [AllowAnonymous]
        [HttpGet("Get/{postId}")]
        public ActionResult<IEnumerable<CommentDto>> GetCommentsForPost(int postId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<CommentDto> comments;

            try
            {
                comments = _service.GetCommentsForPost(postId, userId);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }

            return Ok(comments.Reverse());
        }

        [Authorize]
        [HttpPost("Post")]
        public ActionResult CreateComment(CommentDto commentDto)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

            PostDto postDto = null;
            CommentDto serviceCommentDto = null;

            try
            {
                (serviceCommentDto, postDto) = _service.CreateComment(commentDto, userId);
            }
            catch (PostNotFoundException)
            {
                return Conflict();
            }

            return Created($"/post/{postDto.PostType}/{postDto.PostId}/{postDto.Title}#{serviceCommentDto.CommentId}", serviceCommentDto);
        }
    }
}
