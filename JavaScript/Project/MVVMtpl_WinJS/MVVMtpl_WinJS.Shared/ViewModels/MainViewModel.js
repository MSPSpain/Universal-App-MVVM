(function (g, WinJS) {
    "use strict";

    var MainViewModel = WinJS.Class.define(
        function () {
            this.dependencies = "navigatorService";
            this.navigateCommand = new WinJS.RelayCommand(this.navigateToDemo, this);
            this.countCommand = new WinJS.RelayCommand(this.changeCount, this);
        },

        {
            count: 0,

            navigateToDemo: function () {
                this.navigatorService.navigate("DemoViewModel");
            },

            changeCount: function () {
                this.count++;
                WinJS.Messenger.trigger('changedCount', this.count);
            }
        }
    );

    WinJS.Namespace.define("ViewModels", {
        MainViewModel: MainViewModel
    });
})(this, WinJS);
