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

        /// <summary>
        /// This endpoint gets a list of comments for a post
        /// </summary>
        /// <param name="postId"></param> The postId of the comment for which the comments will be retrieved
        /// <returns></returns> The list of comments that are associated to the postId provided. It is important
        /// to note that in the case that no comments are present an empty list is returned.
        [AllowAnonymous]
        [HttpGet("Get/{postId}")]
        public ActionResult<IEnumerable<CommentDto>> GetCommentsForPost(int postId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int? userId = TryGetUserId(identity); 

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

        /// <summary>
        /// The endpoint creates a comment, given its respective commentDto object
        /// </summary>
        /// <param name="commentDto"></param>
        /// <returns></returns> On sucessfully creating the Comment returns the URI of the comment in the location 
        /// header and a updated commentDto in the body.
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

        private int? TryGetUserId(ClaimsIdentity identity)
        {
            Claim claim = identity.FindFirst(ClaimTypes.NameIdentifier);
            int? userId = claim == null ? null : (int?)int.Parse(claim.Value);

            return userId;
        }
    }
}
