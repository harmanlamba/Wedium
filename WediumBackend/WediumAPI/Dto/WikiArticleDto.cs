using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Dto
{
    public class WikiArticleDto
    {
        public string Url { get; set; }
        public DateTime ArticleDate { get; set; }
        public string ArticleBody { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleImageUrl { get; set; }
    }
}

