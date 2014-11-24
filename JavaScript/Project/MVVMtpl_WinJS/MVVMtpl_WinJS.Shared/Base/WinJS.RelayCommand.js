(function (g, WinJS) {
    "use strict";

    var RelayCommand = WinJS.Class.define(
        function (callback, scope) {
            var functionCallback = function (event) {
                return callback.call(scope, event, this.elements || null);
            };

            WinJS.Utilities.markSupportedForProcessing(functionCallback);
            return functionCallback;
        }
    );

    WinJS.Namespace.define("WinJS", {
        RelayCommand: RelayCommand
    });
})(this, WinJS);
