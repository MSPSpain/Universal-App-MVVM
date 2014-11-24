namespace MVVMtpl.Services
{
    using System;
    using System.Collections.Generic;
    using Windows.UI.Xaml;
    using Windows.UI.Xaml.Controls;
    using Windows.UI.Xaml.Media.Animation;
    using Windows.UI.Xaml.Navigation;    

    /// <summary>
    /// Service to navigate between views
    /// </summary>
    public class NavigationService
    {
        /// <summary>
        /// Dictionary with configuration
        /// </summary>
        public IDictionary<Type, Type> routingDictionary { get; private set; }

        /// <summary>
        /// Constructor where I get the configuration
        /// </summary>
        public NavigationService()
        {
            var config = new NavigationServiceConfiguration();
            routingDictionary = config.routingDictionary;
        }

        /// <summary>
        /// Navigate to specific page
        /// </summary>
        /// <typeparam name="TDest">Type of destination page</typeparam>
        /// <param name="context">Optional context to share to the page</param>
        public void NavigateTo<TDest>(object context = null)
        {
            Frame rootFrame = Window.Current.Content as Frame;
            if (context == null)
            {
                rootFrame.Navigate(routingDictionary[typeof(TDest)]);
            }
            else
            {
                rootFrame.Navigate(this.routingDictionary[typeof(TDest)], context);
            }
        }

        public void NavigateBack()
        {
            Frame rootFrame = Window.Current.Content as Frame;
            if (rootFrame.CanGoBack)
            {
                rootFrame.GoBack();
            }
        }
    }
}