using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class Favourite
    {
        public int FavouriteId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }

        public virtual Post Post { get; set; }
        public virtual User User { get; set; }
    }
}
