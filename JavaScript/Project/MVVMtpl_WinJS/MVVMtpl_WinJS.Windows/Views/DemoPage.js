(function (g, WinJS) {
    "use strict";

    var appbar;

    WinJS.UI.Pages.define(Views.DemoPage, {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var viewModel = ViewModels.demoViewModel;

            WinJS.Binding.processAll(element, viewModel);

            // Change appbar depending of internet
            appbar = document.querySelector('.appbar').winControl;
            viewModel.obs.bind('connection', this.onChangeConnection);
            this.onChangeConnection(viewModel.obs.connection);
            appbar.show();

        },

        onChangeConnection: function (connection) {
            if (connection) {
                appbar.hideCommands(['offlineCommand']);
                appbar.showCommands(['onlineCommand']);
            } else {
                appbar.hideCommands(['onlineCommand']);
                appbar.showCommands(['offlineCommand']);

            }
        }
    });
})(this, WinJS);