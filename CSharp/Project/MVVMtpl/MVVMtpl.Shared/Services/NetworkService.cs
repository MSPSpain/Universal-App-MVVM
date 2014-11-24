

namespace MVVMtpl.Services
{
    using System;
    using System.Collections.Generic;
    using System.Net.NetworkInformation;
    using System.Text;
    using Windows.Networking.Connectivity;

    public class NetworkService
    {
        public bool IsOnline()
        {
            var internetProfile = NetworkInformation.GetInternetConnectionProfile();
            return internetProfile != null &&
                internetProfile.GetNetworkConnectivityLevel() == NetworkConnectivityLevel.InternetAccess;            
        }

    }
}
