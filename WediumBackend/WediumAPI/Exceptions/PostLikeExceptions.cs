using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class PostLikeNotFoundException : Exception
    {
        public PostLikeNotFoundException() : base() { }
        public PostLikeNotFoundException(string message) : base(message) { }
        public PostLikeNotFoundException(string message, Exception inner) : base(message,inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected PostLikeNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class PostLikeAlreadyExistsException : Exception
    {
        public PostLikeAlreadyExistsException() : base() { }
        public PostLikeAlreadyExistsException(string message) : base(message) { }
        public PostLikeAlreadyExistsException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected PostLikeAlreadyExistsException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
