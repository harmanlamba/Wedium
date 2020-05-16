using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class CommentNotFoundException : Exception
    {
        public CommentNotFoundException() : base() { }
        public CommentNotFoundException(string message) : base(message) { }
        public CommentNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected CommentNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
