# Project documentation

##Index
1. [Introduction](#introduction) 
2. [MVVM Pattern](#mvvm-pattern) 
3. [Shared Project](#shared-projects) 
    * [Base](#base) 
    * [Services](#services) 
    * [ViewModels](#viewmodels) 
    * [Models](#models) 
4. [Windows Project](#windows-project) 
    * [Assets](#assets) 
    * [Views](#views) 
5. [Windows Phone Project](#windows-phone-project) 
    * [Assets](#wp-assets)
    * [Views](#wp-views)

## Introduction
This template helps you to make Universal Apps based in MVVM Pattern with C#, this template don't teach you anything about MVVM, you must learn about this pattern by your own and after that return here and start developing easily!
## MVVM pattern
Model-View View-Model is a design pattern, you can learn about this pattern [in the documentation](http://msdn.microsoft.com/en-us/library/gg405484.aspx).
![MVVM Example](http://i.imgur.com/TMp4RsZ.png)
## Shared Projects
### Base
There are specific libraries for our template, made by us.

You can modify each of this files if you want, but we recommend this:

**Don't touch:**

* ObservableObject.cs

**Modify:**

* ServiceLocator.cs

    Here you must declare each ViewModel and Service, and initialize them whith its corresponding view.

### Services
You can find public services and folder to use with localservices, you can learn about these services in the code.

- [HttpService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/HttpService.cs)
- [NavigationService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/NavigationService.cs)
- [NavigationServiceConfiguration](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/NavigationServiceConfiguration.cs)
- [NetworkService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/NetworkService.cs)
- [StorageService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/StorageService.cs)

To make new Service

1. Create Service **Shared/Services/MyService.cs**
```
namespace MVVMtpl.Services
{
    public class MyService
    {
        public MyService()
        {
        }
    }
}
```

2. Register the Service
**[Shared/Base/ServiceLocator.cs](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Base/ServiceLocator.cs)**

```
this.container.RegisterType<MyService>();
```
### ViewModels
To make new ViewModel:

1. Create ViewModel file and code:
**Shared/ViewModels/NewViewModel.cs**
```
namespace MVVMtpl.ViewModels
{
    public class NewViewModel : ObservableObject
    {
        public NewViewModel()
        {
        }
    }
}
```
2. Register the ViewModel
**[Shared/Base/ServiceLocator.cs](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Base/ServiceLocator.cs)**

```
this.container.RegisterType<NewViewModel>();

public NewViewModel NewViewModel
{
    get { return this.container.Resolve<NewViewModel>(); }
}
```
### Models
To make new Model:

1. Create Model file and code:
**Shared/Models/MyModel.cs**
```
namespace MVVMtpl.Model
{
    public class MyModel : ObservableObject
    {
        private string property;

       public MyModel()
       {
       }

       public string Property
       {
            get { return this.property; }
            set { this.SetProperty(ref this.property, value); }
       }
    }
}

```
## Windows Project
### Assets
Here we have the specific application resources such as pictures or media files.
### Views
Here we have our views.

1. Create the View file:
**Windows/Views/NewPage.xaml**

2. Associate the view with the viewmodel in the View file
```
DataContext="{Binding NewViewModel, Source={StaticResource Locator}}"
```
3. Associate the view to the view-model in NavigationServiceConfiguration:
**[Shared/AppConfig/NavigationServiceConfiguration.cs](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/NavigationServiceConfiguration.cs)**
```
{ typeof(NewViewModel), typeof(NewPage) }
```
## Windows Phone Project
<a name="wp-assets" />
### Assets
Here we have the specific application resources such as pictures or media files.
### Views
Here we have our views.

1. Create the View file:
**Windows/Views/NewPage.xaml**

2. Associate the view with the viewmodel in the View file
```
DataContext="{Binding NewViewModel, Source={StaticResource Locator}}"
```
3. Associate the view to the view-model in NavigationServiceConfiguration:
**[Shared/AppConfig/NavigationServiceConfiguration.cs](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/CSharp/Project/MVVMtpl/MVVMtpl.Shared/Services/NavigationServiceConfiguration.cs)**
```
{ typeof(NewViewModel), typeof(NewPage) }
```





