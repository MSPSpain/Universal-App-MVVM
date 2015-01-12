using System;
using System.Collections.ObjectModel;
using MVVMtpl.Base;
using System.Windows.Input;
using GalaSoft.MvvmLight.Command;
using MVVMtpl.Services;

namespace MVVMtpl.ViewModels
{
    public class ExampleViewModel : ObservableObject
    {
        private NavigationService navigationService;
        private MessagingService messagingService;

        private string message;
        private int number = 0;
        public string Message { get { return message; } set { Set(ref message, value); } }
        public int Number { get { return number; } set { Set(ref number, value); } }

        public ICommand NavigateBackCommand { get; set; }

        public ExampleViewModel(NavigationService navigationService, MessagingService messagingService)
        {
            Message = "Example text 2";
            this.navigationService = navigationService;
            this.messagingService = messagingService;

            //messagingService.Register();

            NavigateBackCommand = new RelayCommand(NavigateBackExecute);
        }

        private void NavigateBackExecute()
        {
            this.navigationService.NavigateBack();
        }
    }
}
