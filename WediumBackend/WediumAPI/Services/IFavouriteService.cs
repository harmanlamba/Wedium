using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Services
{
    public interface IFavouriteService
    {
        public void AddFavourite(int userId, int postId);
        public void RemoveFavourite(int userId, int postId);
    }
}
