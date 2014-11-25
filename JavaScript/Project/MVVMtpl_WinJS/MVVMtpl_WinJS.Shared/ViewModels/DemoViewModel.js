(function (g, WinJS) {
    "use strict";

    var DemoViewModel = WinJS.Class.define(
        function () {
            this.dependencies = "navigatorService";
        },

        {
            ready: function() {
                // Dependencies loaded
            }
        }
    );

    WinJS.Namespace.define("ViewModels", {
        DemoViewModel: DemoViewModel
    });
})(this, WinJS);
