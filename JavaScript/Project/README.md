# Project documentation

##Index
1. [Introduction](#introduction) 
2. [MVVM Pattern](#mvvm-pattern) 
3. [Shared Project](#shared-projects) 
    - [default.js](#defaultjs) 
    - [Vendor](#vendor) 
    - [Base](#base) 
    - [AppConfig](#appconfig) 
    - [Services](#services) 
    - [ViewModels](#viewmodels) 
    - [Models](#models) 
4. [Windows Project](#windows-project) 
    - [default.html](#defaulthtml) 
    - [Views](#views) 
5. [Windows Phone Project](#windows-phone-project) 
    - [default.html](#wp-defaulthtml)
    - [Views](#wp-views)
6. [Gulp Project](#gulp-project) 

## Introduction
This template helps you to make Universal Apps based in MVVM Pattern with HTML5, this template don't teach you anything about MVVM but learn about this pattern and after that return here and enjoy coding!
## MVVM pattern
Model-View View-Model is a design pattern, you can learn about this pattern [in the documentation](http://msdn.microsoft.com/en-us/library/gg405484.aspx).
![MVVM Example](http://i.imgur.com/TMp4RsZ.png)
## Shared Projects
### default.js
This file is exactly the same than default Visual Studio template.
### Vendor
Here we have our template dependencies, navigate.js (same as VS default template) and [di.js](https://github.com/NickQiZhu/di.js) for dependency injection.
### Base
There are specific libraries for our template, made by us.

You can modify each of this files if you want, but we recommend this:

**Don't touch:**

- WinJS.Messenger
- WinJS.ObservableObject
- WinJS.RelayCommand

**Please, modify if you want:**

- Helpers (Namespace to put our helpders)
- BindingMode (To add diferent Binding Modes, for default Command, Binding.Mode.twoway)
### AppConfig
In this folder we have our app configuration, you can edit these files:

- [NavigatorService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/NavigatorService.js)
- [ServicesLocator](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/ServicesLocator.js)
- [ViewsDictionary](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/ViewsDictionary.js)

You will learn more about the files along the following lines.

### Services
You can find public services and folder to use with localservices, you can learn about these services in the code.

- [HttpService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/Services/HttpService.js)
- [NavigatorService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/Services/NavigatorService.js)
- [NetworkService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/Services/NetworkService.js)
- [StorageService](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/Services/StorageService.js)

To make new Service

1. Create Service
**Shared/Services/MyService.js**
```
(function (g, WinJS) {
    "use strict";

    var MyService = WinJS.Class.define(
        
    );

    WinJS.Namespace.define("Services", {
        MyService: MyService
    });
})(this, WinJS);

```

2. Register the Service
**[Shared/AppConfig/ServicesLocator.js](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/ServicesLocator.js)**

```
dictx.register("myService", Services.MyService);
```

### ViewModels
To make new ViewModel:

1. Create ViewModel file and code:
**Shared/ViewModels/MainViewModel.js**

```
(function (g, WinJS) {
    "use strict";

    var MainViewModel = WinJS.Class.define(
        function () {
            this.dependencies = "navigatorService, myService";
        },

        {
            ready: function () {
                // Dependencies loaded
                this.navigatorService.navigate('OtherViewModel');
            },
        }
    );

    WinJS.Namespace.define("ViewModels", {
        MainViewModel: MainViewModel
    });
})(this, WinJS);

```

2. Register the ViewModel
**[Shared/AppConfig/ServicesLocator.js](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/ServicesLocator.js)**

```
dictx.register("mainViewModel", ViewModels.MainViewModel);
ViewModels.mainViewModel = dictx.get('mainViewModel');
```
### Models
To make new Model:

1. Create Model file and code:
**Shared/Models/Demo.js**

```
(function (g, WinJS, Helpers) {
    "use strict";
    var Demo = WinJS.Class.define(
        function () {
            this.property = 'Demo model';
        },

        {
        }
    );

    WinJS.Namespace.define("Models", {
        Demo: Demo
    });
})(this, WinJS, Helpers);
```

## Windows Project
### default.html
You only need to modify `#contenhost` including your first view, for example `Views.MainPage`:
```
<div id="contenthost" 
    data-win-control="Application.PageControlNavigator" 
    data-win-options="{home: Views.MainPage}">
</div>
```

### Views
Here we have out views, for each view you need and html and js file.

1. Create View html file and code:
**Windows/Views/MainPage.html**

```
<div>My Page</div>

```

2. Create View js file and code:
**Windows/Views/MainPage.js**
*Important: Each View has a ViewModel see the code*

```
(function (g, WinJS) {
    "use strict";

    WinJS.UI.Pages.define(Views.MainPage, {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var viewModel = ViewModels.mainViewModel;

            WinJS.Binding.processAll(element, viewModel);

        }
    });
})(this, WinJS);



```

3. Register the view in ViewsDictionary:
**[Shared/AppConfig/ViewsDictionary.js](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/ViewsDictionary.js)**

```
MainPage: "/Views/MainPage.html",

```

4. Associate the view to the view-model in NavigatorConfiguration:
**[Shared/AppConfig/NavigatorService.js](https://github.com/MSPSpain/Universal-App-MVVM/blob/master/JavaScript/Project/MVVMtpl_WinJS/MVVMtpl_WinJS.Shared/AppConfig/NavigatorService.js)**

```
MainViewModel: Views.MainPage

```



## Windows Phone Project
<a name="wp-defaulthtml" />
### default.html
<a name="wp-views" />
### Views
##Gulp Project