using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface IFavouriteService
    {
        public void CreateFavourite(int userId, int postId);
        public void DeleteFavourite(int userId, int postId);
    }
}
