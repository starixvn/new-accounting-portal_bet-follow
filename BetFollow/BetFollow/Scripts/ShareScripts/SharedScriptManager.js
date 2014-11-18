"use strict";
/* jshint camelcase: false,
unused: vars */
var sharedScriptManager;
var SharedScriptManager = function () {
    var self = this;
    self.getIeVersion = function () {
        var version = -1; // Return value assumes failure.
        if (window.navigator.userAgent.indexOf("MSIE") > 0) {
            var usrAgent = navigator.userAgent;
            var reg = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (reg.exec(usrAgent) != null) {
                version = parseFloat(RegExp.$1);
            }
        }

        return version;
    };
};

sharedScriptManager = new SharedScriptManager();
