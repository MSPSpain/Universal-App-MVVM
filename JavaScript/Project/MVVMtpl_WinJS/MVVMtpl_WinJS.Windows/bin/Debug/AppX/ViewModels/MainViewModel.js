(function (g, WinJS) {
    "use strict";

    var MainViewModel = WinJS.Class.define(
        function () {
            this.dependencies = "navigatorService";
            this.navigateCommand = new WinJS.RelayCommand(this.navigateToDemo, this);
        },

        {
            ready: function() {
                // Dependencies loaded
            },

            navigateToDemo: function () {
                this.navigatorService.navigate("DemoViewModel");
            }
        }
    );

    WinJS.Namespace.define("ViewModels", {
        MainViewModel: MainViewModel
    });
})(this, WinJS);
