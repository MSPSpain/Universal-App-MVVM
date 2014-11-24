using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;

namespace MVVMtpl.Services
{
    public class StorageService
    {
        public async Task save_myFile(string data, string key = null)
        {
            var localFolder = Windows.Storage.ApplicationData.Current.LocalFolder;
            StorageFile myFile;
            if (key == null)
            {
                myFile = await localFolder.CreateFileAsync("myData.txt", CreationCollisionOption.OpenIfExists);
            }
            else
            {
                myFile = await localFolder.CreateFileAsync(key + ".txt", CreationCollisionOption.OpenIfExists);
            }
            await FileIO.AppendTextAsync(myFile, data);
            //await FileIO.WriteTextAsync(myFile, data);
            await FileIO.AppendTextAsync(myFile, Environment.NewLine);
        }

        public async Task<string> load_myFile(string key = null)
        {
            var localFolder = Windows.Storage.ApplicationData.Current.LocalFolder;
            StorageFile myFile;
            if (key == null)
            {
                myFile = await localFolder.GetFileAsync("myData.txt");
            }
            else
            {
                myFile = await localFolder.GetFileAsync(key + ".txt");
            }

            string text = "";
            if (myFile != null)
            {
                text = await FileIO.ReadTextAsync(myFile);
            }

            return text;
        }

        public async Task clear_myFile(string key = null)
        {
            var localFolder = Windows.Storage.ApplicationData.Current.LocalFolder;
            StorageFile myFile;
            if (key == null)
            {
                myFile = await localFolder.CreateFileAsync("myData.txt", CreationCollisionOption.OpenIfExists);
            }
            else
            {
                myFile = await localFolder.CreateFileAsync(key + ".txt", CreationCollisionOption.OpenIfExists);
            }
            
            await FileIO.WriteTextAsync(myFile, "");            
        }
    

    }
}
