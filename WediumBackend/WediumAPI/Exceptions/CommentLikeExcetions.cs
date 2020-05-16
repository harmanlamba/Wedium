using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class CommentLikeNotFoundException : Exception
    {
        public CommentLikeNotFoundException() : base() { }
        public CommentLikeNotFoundException(string message) : base(message) { }
        public CommentLikeNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected CommentLikeNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class CommentLikeAlreadyExistsException : Exception
    {
        public CommentLikeAlreadyExistsException() : base() { }
        public CommentLikeAlreadyExistsException(string message) : base(message) { }
        public CommentLikeAlreadyExistsException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected CommentLikeAlreadyExistsException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
