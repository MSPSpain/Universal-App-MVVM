using System;
using System.Collections.ObjectModel;
using MVVMtpl.Base;
using MVVMtpl.Services;
using System.Windows.Input;
using GalaSoft.MvvmLight.Command;
using System.Threading.Tasks;

namespace MVVMtpl.ViewModels
{
    public class MainViewModel : ObservableObject
    {
        private int count = 0;
        private NavigationService navigationService;
        private StorageService storageService;
        private NetworkService networkService;
        private MessagingService messagingService;
        public ICommand NavigateToCommand { get; set; }
        public ICommand CreateFileCommand { get; set; }
        public ICommand ReadFileCommand { get; set; }
        public ICommand ClearFileCommand { get; set; }
        public ICommand NumberMessageCommand { get; set; }
        

        private string message;
        public string Message { get { return message; } set { Set(ref message, value); } }

        public MainViewModel(NavigationService navigationService, NetworkService networkService,
                                StorageService storageService, MessagingService messagingService)
        {
            this.navigationService = navigationService;
            this.storageService = storageService;
            this.networkService = networkService;
            this.messagingService = messagingService;
            
            //Message = "Dynamic text 1";
            Message = networkService.IsOnline().ToString();
            //storageService.save_myFile("hola");
            //storageService.save_myFile("que");
            //storageService.save_myFile("tal");

            CreateFileCommand = new RelayCommand(CreateFileExecute);
            ReadFileCommand = new RelayCommand(ReadFileExecute);
            ClearFileCommand = new RelayCommand(ClearFileExecute);
            NavigateToCommand = new RelayCommand(NavigateToExample);
            NumberMessageCommand = new RelayCommand(NumberMessageExecute);
        }

        private void NavigateToExample()
        {
            this.navigationService.NavigateTo<ExampleViewModel>();
        }

        private async void CreateFileExecute()
        {
            await storageService.saveAppendTextFile(storageService.getLocalFolder(),"hola");
        }

        private async void ReadFileExecute()
        {
            Message = await storageService.loadTextFile(storageService.getLocalFolder());
        }

        private async void ClearFileExecute()
        {
            await storageService.clearTextFile(storageService.getLocalFolder());
        }

        private void NumberMessageExecute()
        {
            this.messagingService.Send(typeof(int), this.count++);
        }


    }
}
