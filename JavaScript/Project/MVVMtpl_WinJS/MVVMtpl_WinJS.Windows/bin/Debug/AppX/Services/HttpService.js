(function (g, WinJS) {
    "use strict";

    var xhr = function (type, url, options) {
        return WinJS.xhr({
            url: url,
            type: type,
            headers: null || options.headers,
            user: null || options.user,
            password: null || options.password,
            responseType: 'json' || options.response,
            data: {} || options.data,
            customRequestInitializer: function () { } || options.customRequestInitializer
        });
    }

    var HttpService = WinJS.Class.define(
        function () {

        },

        {
            get: function (url, options) {
                return xhr('GET', url, options);
            },

            post: function (url, options) {
                return xhr('POST', url, options);
            }
        }
    );

    WinJS.Namespace.define("Services", {
        HttpService: HttpService
    });
})(this, WinJS);

