using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface ICommentService
    {
        public bool CheckExists(int commentId);
    }
}
