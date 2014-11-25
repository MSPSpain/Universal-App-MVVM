(function (g, WinJS) {
    "use strict";

    var applicationData = Windows.Storage.ApplicationData.current; 
    var roamingSettings = applicationData.roamingSettings;
    var localStorage = g.localStorage;
    var sessionStorage = g.sessionStorage;
    var storage = Windows.Storage;
    var localFolder = storage.ApplicationData.current.localFolder;
    var fileIO = storage.FileIO;


    var StorageService = WinJS.Class.define(
        function () {},

        {

            // LocalStorage 
            local: {
                JSON: function (key, data) {
                    if (data) {
                        localStorage[key] = JSON.stringify(data);
                    } else {
                        if (!localStorage[key]) {
                            return null;
                        }
                        return JSON.parse(localStorage[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        localStorage[key] = data;
                    } else {
                        return localStorage[key];
                    }
                }
            },

            // SessionStorage 
            session: {
                JSON: function (key, data) {
                    if (data) {
                        sessionStorage[key] = JSON.stringify(data);
                    } else {
                        if (!sessionStorage[key]) {
                            return null;
                        }
                        return JSON.parse(sessionStorage[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        sessionStorage[key] = data;
                    } else {
                        return sessionStorage[key];
                    }
                }
            },

            // Roaming 
            roaming: {
                JSON: function (key, data) {
                    if (data) {
                        roamingSettings.values[key] = JSON.stringify(data);
                    } else {
                        if (!roamingSettings.values[key]) {
                            return null;
                        }
                        return JSON.parse(roamingSettings.values[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        roamingSettings.values[key] = data;
                    } else {
                        return roamingSettings.values[key];
                    }
                }
            },

            // Folder
            folder: {
                setAsync: function (name) {
                    return localFolder.createFolderAsync();
                },

                getAsync: function (name) {
                    return localFolder.getFolderAsync(name);
                }
            },

            // File
            file: {
                setAsync: function (name, replace) {
                    replace = replace || storage.CreationCollisionOption.replaceExisting;
                    return localFolder.createFileAsync(name, replace );
                },

                // path: Windows.Storage.KnownFolders.picturesLibrary
                getAsync: function (name) {
                    return localFolder.getFileAsync(name);
                },

                deleteAsync: function (file) {
                    return file.deleteAsync();
                },

                appendTextAsync: function (file, text) {
                    return fileIO.appendTextAsync(file, text);
                },

                writeTextAsync: function (file, text) {
                    return fileIO.writeTextAsync(file, text);
                },

                readTextAsync: function (file) {
                    return fileIO.readTextAsync(file);
                },

                writeBytesAsync: function (file, text) {
                    var buffer = getBufferFromString(text); 
                    return fileIO.writeBufferAsync(file, buffer);
                },

                readBytesAsync: function (file) {
                    return fileIO.readBufferAsync(file);
                },
                
                copyAsync: function (file, newName, path, replace) {
                    return file.copyAsync(path || localFolder, newName, replace || storage.NameCollisionOption.replaceExisting);
                }
            }
        }
    );

    WinJS.Namespace.define("Services", {
        StorageService: StorageService
    });
})(this, WinJS);
