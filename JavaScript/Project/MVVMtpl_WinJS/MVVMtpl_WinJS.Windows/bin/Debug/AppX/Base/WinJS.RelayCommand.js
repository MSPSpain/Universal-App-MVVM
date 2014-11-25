(function (g, WinJS) {
    "use strict";

    var canExecute = WinJS.Binding.as({
        free: true
    });

    var RelayCommand = WinJS.Class.define(
        function (callback, scope) {
            var self = this;
            this.element = null;

            this.execute = function () {
                self.element = this;
                if (self.canExecute) {
                    if (this.elements) {
                        var args = Array.prototype.slice.call(arguments, 0);
                        args.push(this.elements);
                        return callback.apply(scope, args);
                    } else {
                        return callback.apply(scope, arguments);
                    }
                } else {
                    return false;
                }
            };

            this._canExecute.bind('free', function (enabled) {
                if (self.element) {
                    if (enabled) {
                        self.element.classList.remove('bind-disabled');
                    } else {
                        self.element.classList.add('bind-disabled');
                    }
                }
            });

            WinJS.Utilities.markSupportedForProcessing(this.execute);
        }, {
            _canExecute: WinJS.Binding.as({
                free: true
            }),

            canExecute: {
                get: function () {
                    return this._canExecute.free;
                },

                set: function (value) {
                    this._canExecute.free = value;
                }
            }

        }
    );

    WinJS.Namespace.define("WinJS", {
        RelayCommand: RelayCommand
    });
})(this, WinJS);
