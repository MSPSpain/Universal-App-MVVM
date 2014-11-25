(function (g, WinJS, Helpers) {
    "use strict";
    var Demo = WinJS.Class.define(
        function () {
            this.property = 'Demo model';
        },

        {
        }
    );

    WinJS.Namespace.define("Models", {
        Demo: Demo
    });
})(this, WinJS, Helpers);

