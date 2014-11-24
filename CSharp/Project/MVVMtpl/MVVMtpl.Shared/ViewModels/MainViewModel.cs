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
        private NavigationService navigationService;
        private StorageService storageService;
        private NetworkService networkService;
        public ICommand NavigateToCommand { get; set; }
        public ICommand CreateFileCommand { get; set; }
        public ICommand ReadFileCommand { get; set; }
        public ICommand ClearFileCommand { get; set; }
        

        private string message;
        public string Message { get { return message; } set { Set(ref message, value); } }

        public MainViewModel(NavigationService navigationService, NetworkService networkService, StorageService storageService)
        {
            this.navigationService = navigationService;
            this.storageService = storageService;
            this.networkService = networkService;
            
            //Message = "Dynamic text 1";
            Message = networkService.IsOnline().ToString();
            //storageService.save_myFile("hola");
            //storageService.save_myFile("que");
            //storageService.save_myFile("tal");

            CreateFileCommand = new RelayCommand(CreateFileExecute);
            ReadFileCommand = new RelayCommand(ReadFileExecute);
            ClearFileCommand = new RelayCommand(ClearFileExecute);
            NavigateToCommand = new RelayCommand(NavigateToExample);
        }

        private void NavigateToExample()
        {
            this.navigationService.NavigateTo<ExampleViewModel>();
        }

        private async void CreateFileExecute()
        {
            await storageService.save_myFile("hola");
        }

        private async void ReadFileExecute()
        {
            Message = await storageService.load_myFile();
        }

        private async void ClearFileExecute()
        {
            await storageService.clear_myFile();
        }


    }
}
