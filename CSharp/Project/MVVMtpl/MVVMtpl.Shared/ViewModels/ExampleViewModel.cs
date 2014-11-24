using System;
using System.Collections.ObjectModel;
using MVVMtpl.Base;

namespace MVVMtpl.ViewModels
{
    public class ExampleViewModel : ObservableObject
    {
        private string message;
        public string Message { get { return message; } set { Set(ref message, value); } }

        public ExampleViewModel()
        {
            Message = "Example text 2";
        }
    }
}
