(function (g, WinJS) {
    "use strict";

    var applicationData = Windows.Storage.ApplicationData.current; 
    var roamingSettings = applicationData.roamingSettings; 
    var storage = Windows.Storage;
    var localFolder = storage.ApplicationData.current.localFolder;
    var fileIO = storage.FileIO;


    var StorageService = WinJS.Class.define(
        function () {
            this.localStorage = g.localStorage;
            this.sessionStorage = g.sessionStorage;
            this.roamingSettings = g.roamingSettings;
        },

        {

            // LocalStorage 
            local: {
                JSON: function (key, data) {
                    if (data) {
                        this.localStorage[key] = JSON.stringify(data);
                    } else {
                        return JSON.parse(this.localStorage[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        this.localStorage[key] = data;
                    } else {
                        return this.localStorage[key];
                    }
                }
            },

            // SessionStorage 
            session: {
                JSON: function (key, data) {
                    if (data) {
                        this.sessionStorage[key] = JSON.stringify(data);
                    } else {
                        return JSON.parse(this.sessionStorage[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        this.sessionStorage[key] = data;
                    } else {
                        return this.sessionStorage[key];
                    }
                }
            },

            // Roaming 
            roaming: {
                JSON: function (key, data) {
                    if (data) {
                        this.roamingSettings.values[key] = JSON.stringify(data);
                    } else {
                        return JSON.parse(this.roamingSettings.values[key]);
                    }
                },

                string: function (key, data) {
                    if (data) {
                        this.roamingSettings.values[key] = data;
                    } else {
                        return this.roamingSettings.values[key];
                    }
                }
            },

            // Folder
            folder: {
                create: function (name, path) {
                    if (path) {
                        return path.createFolderAsync(name);
                    }
                    return localFolder.createFolderAsync();
                },

                get: function (name, path) {
                    if (path) {
                        return path.getFolderAsync(name);
                    }
                    return localFolder.getFolderAsync(name);
                }
            },

            // File
            file: {
                create: function (name, replace, path) {
                    replace = replace || storage.CreationCollisionOption.replaceExisting;
                    if (path) {
                        return path.createFileAsync(name, replace);
                    }
                    return localFolder.createFileAsync(name, replace );
                },

                // path: Windows.Storage.KnownFolders.picturesLibrary
                get: function (name, path) {
                    if (path) {
                        return path.getFileAsync(name);
                    }
                    return localFolder.getFileAsync(name);
                },

                remove: function (file) {
                    return file.deleteAsync();
                },

                writeText: function (file, text) {
                    return fileIO.appendTextAsync(file, text);
                },

                readText: function (file) {
                    return fileIO.readTextAsync(file);
                },

                writeBytes: function (file, text) {
                    var buffer = getBufferFromString(text); 
                    return fileIO.writeBufferAsync(file, buffer);
                },

                readBytes: function (file) {
                    return fileIO.readBufferAsync(file);
                },
                
                copy: function (file, newName, path, replace) {
                    return file.copyAsync(path || localFolder, newName, replace || storage.NameCollisionOption.replaceExisting);
                }
            }
        }
    );

    WinJS.Namespace.define("Services", {
        StorageService: StorageService
    });
})(this, WinJS);
