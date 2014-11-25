(function (g, di) {
    "use strict";

    // Dependencies generator 
    // Services and ViewModels Locator
    var dictx = di.createContext();

    // Services
    dictx.register("navigatorService", Services.NavigatorService);
    dictx.register("networkService", Services.NetworkService);
    dictx.register("storageService", Services.StorageService);
    dictx.register("httpService", Services.HttpService);

    // ViewModels
    dictx.register("mainViewModel", ViewModels.MainViewModel);
    dictx.register("demoViewModel", ViewModels.DemoViewModel);

    // Initialize
    dictx.initialize();

    // Override each ViewModel with instance
    ViewModels.mainViewModel = dictx.get('mainViewModel');
    ViewModels.demoViewModel = dictx.get('demoViewModel');

})(this, di);
