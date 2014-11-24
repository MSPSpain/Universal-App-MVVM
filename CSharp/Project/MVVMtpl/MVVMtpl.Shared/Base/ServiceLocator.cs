namespace MVVMtpl.Base
{
    using Microsoft.Practices.Unity;
    using MVVMtpl.Services;    
    using MVVMtpl.ViewModels;
    public class ServiceLocator
    {
        /// <summary>
        /// Unity container
        /// </summary>
        private UnityContainer container = new UnityContainer();

        /// <summary>
        /// Register all Services an ViewModels <see cref="ServiceLocator"/>
        /// </summary>
        public ServiceLocator()
        {
            // Services
            this.container.RegisterType<NavigationService>();
            this.container.RegisterType<NetworkService>();
            this.container.RegisterType<StorageService>();

            // ViewModels
            this.container.RegisterType<MainViewModel>();
            this.container.RegisterType<ExampleViewModel>();

        }

        /// <summary>
        /// Gets an instance of <see cref="MainViewModel"/>
        /// </summary>
        public MainViewModel MainViewModel
        {
            get { return this.container.Resolve<MainViewModel>(); }
        }

        /// <summary>
        /// Gets an instance of <see cref="ExampleViewModel"/>
        /// </summary> 
        public ExampleViewModel ExampleViewModel
        {
            get { return this.container.Resolve<ExampleViewModel>(); }
        }
    }
}