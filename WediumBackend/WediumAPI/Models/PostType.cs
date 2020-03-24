using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class PostType
    {
        public PostType()
        {
            Post = new HashSet<Post>();
        }

        public int PostTypeId { get; set; }
        public string PostTypeValue { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
