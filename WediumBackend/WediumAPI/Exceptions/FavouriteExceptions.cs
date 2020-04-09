using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class FavouriteNotFoundException : Exception
    {
        public FavouriteNotFoundException() : base() { }
        public FavouriteNotFoundException(string message) : base(message) { }
        public FavouriteNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected FavouriteNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class FavouriteAlreadyExistsException : Exception
    {
        public FavouriteAlreadyExistsException() : base() { }
        public FavouriteAlreadyExistsException(string message) : base(message) { }
        public FavouriteAlreadyExistsException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected FavouriteAlreadyExistsException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
