﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WediumAPI.Dto;
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

        /// <summary>
        /// Gets the list of PostTypes
        /// </summary>
        /// <returns></returns> Ok with the post types in the body of the request
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<PostTypeDto>> Get()
        {
            return Ok(_service.GetPostTypes());
        }
    }
}
