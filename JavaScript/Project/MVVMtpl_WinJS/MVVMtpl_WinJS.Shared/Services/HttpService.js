(function (g, WinJS) {
    "use strict";

    var xhr = function (type, url, options) {
        return WinJS.xhr({
            url: url,
            type: type,
            headers: options.headers || null,
            user: options.user || null,
            password: options.password || null,
            responseType: 'json' || options.response,
            data: options.data || {},
            customRequestInitializer: function () { } || options.customRequestInitializer
        });
    }

    var HttpService = WinJS.Class.define(
        function () {

        },

        {
            get: function (url, options) {
                options = options || {};
                return xhr('GET', url, options);
            },

            post: function (url, options) {
                options = options || {};
                return xhr('POST', url, options);
            }
        }
    );

    WinJS.Namespace.define("Services", {
        HttpService: HttpService
    });
})(this, WinJS);

