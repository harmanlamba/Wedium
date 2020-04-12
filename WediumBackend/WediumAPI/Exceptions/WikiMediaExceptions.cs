using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class WikiArticleNotFoundException : Exception
    {
        public WikiArticleNotFoundException() : base() { }
        public WikiArticleNotFoundException(string message) : base(message) { }
        public WikiArticleNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected WikiArticleNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
