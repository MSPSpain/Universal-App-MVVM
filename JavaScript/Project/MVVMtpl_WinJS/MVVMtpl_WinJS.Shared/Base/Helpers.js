(function (g, WinJS) {
    "use strict";

    var Helpers = WinJS.Class.define(
        function () { },
        {},
        // Static
        {
            // Decimal to Hexadecimal
            decToHex: function (decimal) {
                return decimal.toString(16);
            },

            // Hexadeciaml to Decimal
            hexToDec: function (hexadecimal) {
                return parseInt(hexadecimal,16);
            }
        }
    );

    WinJS.Namespace.define("Helpers", Helpers);
})(this, WinJS);
