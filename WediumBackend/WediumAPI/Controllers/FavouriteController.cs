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
    public class FavouriteController : ControllerBase
    {
        private readonly IFavouriteService _service;

        public FavouriteController(IFavouriteService service)
        {
            _service = service;
        }

        /// <summary>
        /// The endpoint favorites a post for a user given the favoriteDto object
        /// </summary>
        /// <param name="favouriteDto"></param>
        /// <returns></returns> Ok in the case that the post was favourited successfully, and Not Found in the case 
        /// that the post was not found
        [Authorize]
        [HttpPost("Post")]
        public IActionResult Create([FromBody]FavouriteDto favouriteDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.CreateFavourite(userId, favouriteDto.PostId);

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (FavouriteAlreadyExistsException)
            {
                return Ok();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// The endpoint removes a favourite for a user given the favouriteDto object
        /// </summary>
        /// <param name="favouriteDto"></param>
        /// <returns></returns> Ok in the case that the post was unfavourited for the user. No Content in the case that 
        /// the favourited post was not found, and Not Found in the case that the post was not found.
        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete([FromBody]FavouriteDto favouriteDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.DeleteFavourite(userId, favouriteDto.PostId);

                return Ok();
            }
            catch (FavouriteNotFoundException)
            {
                return NoContent();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// The endpoint gets the Favourited posts of the authenticated user making the request
        /// </summary>
        /// <param name="limit"></param> The number of posts to retrieve (default: uses GetPostDefaultLimit value in appsettings.json)
        /// <param name="after_id"></param> The last retrieved PostId (default: will start stream at the most recently favourited post)
        /// <returns></returns> Ok in the case that the list of posts was retrieved correctly. Not Found in the case that 
        /// the posts were not found.
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
                IEnumerable<PostDto> postDtoList = _service.GetFavouritedPosts(userId, limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
