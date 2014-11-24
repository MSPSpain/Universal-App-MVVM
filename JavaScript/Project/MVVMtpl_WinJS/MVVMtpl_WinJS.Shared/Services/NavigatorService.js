(function (g, WinJS, nav) {
    "use strict";

    //TODO improve this

    var NavigatorService = WinJS.Class.define(
        function () {
            this.routingDictionary = Services.NavigatorServicesConfiguration;
        },

        {
            navigate: function (viewModelName, parameters) {
                return nav.navigate(this.routingDictionary[viewModelName], parameters);
            },
            navigateOnResume: function (url, parameters) {
                return nav.navigate(url, parameters);
            },
            isActive: function (url) {
                return nav.location === url;
            },
            canGoBack: function () {
                return nav.canGoBack;
            },
            back: function () {
                nav.back();
            },
            canGoForward: function () {
                return nav.canGoForward;
            },
            forward: function () {
                nav.forward();
            },
            nav: function () {
                return nav;
            }
        }
    );

    WinJS.Namespace.define("Services", {
        NavigatorService: NavigatorService
    });
})(this, WinJS, WinJS.Navigation);
