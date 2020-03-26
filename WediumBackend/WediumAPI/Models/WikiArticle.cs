using System;
using System.Collections.Generic;

namespace WediumAPI.Models
{
    public partial class WikiArticle
    {
        public WikiArticle()
        {
            Post = new HashSet<Post>();
        }

        public int WikiArticleId { get; set; }
        public string Url { get; set; }
        public string ArticleAuthor { get; set; }
        public DateTime ArticleDate { get; set; }
        public string ArticleBody { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
