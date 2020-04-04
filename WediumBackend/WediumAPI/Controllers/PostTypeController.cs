using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WediumAPI.DTO;
using WediumAPI.Services;

namespace WediumAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTypeController : ControllerBase
    {
        private readonly IPostTypeService _service; 

        public PostTypeController(IPostTypeService service)
        {
            _service = service;
        }

        [HttpGet("Get")]
        public ActionResult<List<PostTypeDTO>> Get()
        {
            return Ok(_service.GetPostTypes());
        }
    }
}
