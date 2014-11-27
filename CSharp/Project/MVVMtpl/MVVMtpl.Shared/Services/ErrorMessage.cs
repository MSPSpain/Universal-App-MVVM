namespace MVVMtpl.Services
{
    using System;
    public class ErrorMessage
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorMessage"/> class
        /// </summary>
        /// <param name="title">The title of the error message</param>
        /// <param name="message">The text of the error message</param>
        public ErrorMessage(string title, string message)
            : this(title, message, null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorMessage"/> class
        /// </summary>
        /// <param name="title">The title of the error message</param>
        /// <param name="message">The text of the error message</param>
        /// <param name="exception">The exception object associated to the error message</param>
        public ErrorMessage(string title, string message, Exception exception)
        {
            this.Title = title;
            this.Message = message;
            this.Exception = exception;
        }

        /// <summary>
        /// Gets or sets the title of the error message
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the text of the error message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets the Exception object associated with the error message
        /// </summary>
        public Exception Exception { get; set; }
    }
}
