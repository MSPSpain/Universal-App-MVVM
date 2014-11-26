(function (g, WinJS) {
    "use strict";

    var DemoViewModel = WinJS.Class.derive(WinJS.ObservableObject,
        function () {
            this.dependencies = "navigatorService, networkService";
            this.observe();
        },

        {
            obs: {
                hello: 'Hello world!',
                connection: false
            },

            ready: function() {
                // Dependencies loaded
                this.checkInternet();
            },

            checkInternet: function () {
                var self = this;
                setInterval(function () {
                    self.obs.connection = self.networkService.isOnline();
                }, 1000);
            }
                
        }
    );

    WinJS.Namespace.define("ViewModels", {
        DemoViewModel: DemoViewModel
    });
})(this, WinJS);
