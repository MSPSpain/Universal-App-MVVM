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
