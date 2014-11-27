(function (g, WinJS) {
    "use strict";

    var DemoViewModel = WinJS.Class.derive(WinJS.ObservableObject,
        function () {
            this.dependencies = "navigatorService, networkService";
            this.observe();

            WinJS.Messenger.on('changedCount', this.changedCount, this);
        },

        {
            obs: {
                hello: 'Hello world!',
                count: 0,
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
            },

            changedCount: function (newCount) {
                this.obs.count = newCount;
            }
        }
    );

    WinJS.Namespace.define("ViewModels", {
        DemoViewModel: DemoViewModel
    });
})(this, WinJS);
