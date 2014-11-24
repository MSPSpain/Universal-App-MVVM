(function (g, WinJS) {
    "use strict";
    
    /**
     * Derive from this class to get and ObservableObject
     */
    var ObservableObject = WinJS.Class.define(
        function () {
        },

        {
            observe: function () {
                this.obs = WinJS.Binding.as(this.obs || this.observables);
            }
        }


    );

    WinJS.Namespace.define("WinJS", {
        ObservableObject: ObservableObject
    });
})(this, WinJS);
