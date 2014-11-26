namespace MVVMtpl.Services
{
    using System;
    using System.Threading.Tasks;
    using Windows.Storage;

    public class StorageService
    {
        public void saveSetting(string setting, string value)
        {
            var roamingData = Windows.Storage.ApplicationData.Current.RoamingSettings;
            roamingData.Values[setting] = value;
        }

        public void deleteSetting(string setting)
        {
            var roamingData = Windows.Storage.ApplicationData.Current.RoamingSettings;
            roamingData.Values[setting] = null;
        }

        public void clearSettings()
        {
            var roamingData = Windows.Storage.ApplicationData.Current.RoamingSettings;
            roamingData.Values.Clear();
        }

        public async Task saveTextFile(StorageFolder folder, string data, string key = null)
        {
            StorageFile myFile;
            if (key == null)
            {
                myFile = await folder.CreateFileAsync("myData.txt", CreationCollisionOption.OpenIfExists);
            }
            else
            {
                myFile = await folder.CreateFileAsync(key + ".txt", CreationCollisionOption.OpenIfExists);
            }

            await FileIO.WriteTextAsync(myFile, data);
        }

        public async Task saveAppendTextFile(StorageFolder folder, string data, string key = null)
        {
            StorageFile myFile;
            if (key == null)
            {
                myFile = await folder.CreateFileAsync("myData.txt", CreationCollisionOption.OpenIfExists);
            }
            else
            {
                myFile = await folder.CreateFileAsync(key + ".txt", CreationCollisionOption.OpenIfExists);
            }
            await FileIO.AppendTextAsync(myFile, data);
            await FileIO.AppendTextAsync(myFile, Environment.NewLine);
        }

        public async Task<string> loadTextFile(StorageFolder folder, string key = null)
        {
            StorageFile myFile;
            try
            {
                if (key == null)
                {
                    myFile = await folder.GetFileAsync("myData.txt");
                }
                else
                {
                    myFile = await folder.GetFileAsync(key + ".txt");
                }
            }
            catch
            {
                myFile = null;
            }

            string text = "";
            if (myFile != null)
            {
                text = await FileIO.ReadTextAsync(myFile);
            }

            return text;
        }

        public async Task clearTextFile(StorageFolder folder, string key = null)
        {
            StorageFile myFile;
            if (key == null)
            {
                myFile = await folder.CreateFileAsync("myData.txt", CreationCollisionOption.OpenIfExists);
            }
            else
            {
                myFile = await folder.CreateFileAsync(key + ".txt", CreationCollisionOption.OpenIfExists);
            }

            await FileIO.WriteTextAsync(myFile, "");
        }

        public ApplicationDataContainer getRoamingSettings()
        {
            return ApplicationData.Current.RoamingSettings;
        }

        public StorageFolder getLocalFolder()
        {
            return ApplicationData.Current.LocalFolder;
        }

        public StorageFolder getTempFolder()
        {
            return ApplicationData.Current.TemporaryFolder;
        }

        //If device does't have SD card, returns LocalFolder
        public async Task<StorageFolder> getSdFolder()
        {
            StorageFolder firstCard = getLocalFolder();
            var devices = Windows.Storage.KnownFolders.RemovableDevices;
            var sdCards = await devices.GetFoldersAsync();
            firstCard = sdCards[0];
            return firstCard;
        }

        public StorageFolder getPicturesKnownFolders()
        {
            return KnownFolders.PicturesLibrary;
        }

        public StorageFolder getVideosKnownFolders()
        {
            return KnownFolders.VideosLibrary;
        }

        public StorageFolder getMusicKnownFolders()
        {
            return KnownFolders.MusicLibrary;
        }

        public StorageFolder getDocumentsKnownFolders()
        {
            return KnownFolders.DocumentsLibrary;
        }
    }
}
