namespace MVVMtpl.Services
{
    using System;
    using GalaSoft.MvvmLight.Messaging;

    /// <summary>
    /// Used to send messages between different parts of the app (e.g. from view models to views)
    /// </summary>
    public class MessagingService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MessagingService"/> class
        /// </summary>
        public MessagingService()
        {
        }

        /// <summary>
        /// Sends a message without content
        /// </summary>
        /// <param name="token">The type of the message</param>
        public void Send(object token)
        {
            Messenger.Default.Send<object>(null, token);
        }

        /// <summary>
        /// Sends a message with content
        /// </summary>
        /// <param name="token">The type of the message</param>
        /// <param name="message">The content of the message</param>
        public void Send(object token, object message)
        {
            Messenger.Default.Send<object>(message, token);
        }

        /// <summary>
        /// Registers a recipient to receive a message
        /// </summary>
        /// <param name="recipient">The recipient that will receive the message</param>
        /// <param name="token">The type of the message</param>
        /// <param name="action">The action that will be executed when the message is received</param>
        public void Register(object recipient, object token, Action<object> action)
        {
            Messenger.Default.Register<object>(recipient, token, action);
        }

        /// <summary>
        /// Unregisters a recipient from receiving a message
        /// </summary>
        /// <param name="recipient">The recipient that was receiving the message</param>
        /// <param name="token">The type of the message</param>
        /// <param name="action">The action that was being executed when the message was received</param>
        public void Unregister(object recipient, object token, Action<object> action)
        {
            Messenger.Default.Unregister<object>(recipient, token, action);
        }
    }
}
