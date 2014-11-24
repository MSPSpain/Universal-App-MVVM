(function (g, WinJS) {
    "use strict";

    var networkInfo = Windows.Networking.Connectivity.NetworkInformation; 
    var networkConnectivityInfo = Windows.Networking.Connectivity.NetworkConnectivityLevel; 

    var NetworkService = WinJS.Class.define(
        function () {
        },

        {
            isOnline: function() { 
                var connectionProfile = networkInfo.getInternetConnectionProfile(); 
                if (connectionProfile === null) { 
                    return false; 
                }

                var networkConnectivityLevel = connectionProfile.getNetworkConnectivityLevel(); 
                if (networkConnectivityLevel === networkConnectivityInfo.none 
                || networkConnectivityLevel === networkConnectivityInfo.localAccess 
                || networkConnectivityLevel === networkConnectivityInfo.constrainedInternetAccess) { 

                    return false;
                } 

                return true; 
            }, 

        }
    );

    WinJS.Namespace.define("Services", {
        NetworkService: NetworkService
    });
})(this, WinJS);
