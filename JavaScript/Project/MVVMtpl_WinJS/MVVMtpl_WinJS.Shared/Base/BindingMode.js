

(function (g, WinJS) {
    "use strict";

    // Two Way Binding https://github.com/winjs/winjs/issues/233#issuecomment-62929292
    var twoway = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
        WinJS.Binding.defaultBind(source, sourceProps, dest, destProps);
        dest.oninput = function () {
            var d = dest[destProps[0]];
            var s = eval("source." + sourceProps.join("."))
            if (s !== d) eval("source." + sourceProps.join(".") + " = d");
        }
    });

    WinJS.Namespace.define("Binding.Mode", {
        twoway: twoway
    });

    g.Command = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
        WinJS.Binding.defaultBind(source, sourceProps, dest, destProps);
        dest[destProps[0]] = function () {
            source[sourceProps[0]].execute();
        }
    });
})(this, WinJS);
