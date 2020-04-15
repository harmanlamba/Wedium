using System;
using System.Collections.Generic;
using System.Linq;
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
        public ActionResult<List<PostDto>> Get(int? limit = null, int? after_id = null)
        {
            if (limit.HasValue && limit.Value < 0)
            {
                return BadRequest();
            }

            try
            {
                IEnumerable<PostDto> postDtoList = _service.GetPosts(limit, after_id);

                return Ok(postDtoList);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
