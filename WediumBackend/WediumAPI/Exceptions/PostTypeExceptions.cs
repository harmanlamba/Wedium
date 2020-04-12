using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WediumAPI.Exceptions
{
    public class PostTypeNotFoundException : Exception
    {
        public PostTypeNotFoundException() : base() { }
        public PostTypeNotFoundException(string message) : base(message) { }
        public PostTypeNotFoundException(string message, Exception inner) : base(message, inner) { }

        //Constructor for serialisation when the exception propagates from a remoting server to the client
        protected PostTypeNotFoundException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
