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


        [Authorize]
        [HttpPost("Post")]
        public IActionResult Create([FromBody]FavouriteDto favouriteDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.AddFavourite(userId, favouriteDto.PostId);

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

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete([FromBody]FavouriteDto favouriteDto)
        {
            try
            {
                ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
                int userId = int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value);

                _service.RemoveFavourite(userId, favouriteDto.PostId);

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



    }
}