(function (g, WinJS) {
    "use strict";

    var DemoViewModel = WinJS.Class.derive(WinJS.ObservableObject,
        function () {
            this.dependencies = "navigatorService";
            this.observe();
        },

        {
            obs: {
                hello: 'Hello world!'
            },

            ready: function() {
                // Dependencies loaded
            }
        }
    );

    WinJS.Namespace.define("ViewModels", {
        DemoViewModel: DemoViewModel
    });
})(this, WinJS);
