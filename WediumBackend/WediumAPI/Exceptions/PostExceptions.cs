using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class PostNotFoundException : Exception
    {
        public PostNotFoundException() : base() { }
        public PostNotFoundException(string message) : base(message) { }
        public PostNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected PostNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class PostNotValidUserException : Exception
    {
        public PostNotValidUserException() : base() { }
        public PostNotValidUserException(string message) : base(message) { }
        public PostNotValidUserException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected PostNotValidUserException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
