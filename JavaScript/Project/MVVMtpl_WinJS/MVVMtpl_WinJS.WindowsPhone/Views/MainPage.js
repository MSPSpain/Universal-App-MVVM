(function (g, WinJS) {
    "use strict";

    WinJS.UI.Pages.define(Views.MainPage, {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var viewModel = ViewModels.mainViewModel;

            WinJS.Binding.processAll(element, viewModel);

            // Appbar status (only phone)
            document.querySelector('.appbar').winControl.showOnlyCommands([]);
        }
    });
})(this, WinJS);

