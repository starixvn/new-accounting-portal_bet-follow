"use strict";
/* jshint camelcase: false,
unused: vars */
var sharedScriptManager;
var SharedScriptManager = function () {
    var self = this;
    self.Enums = {
        MessageType: {
            Success: 1,
            Warning: 2,
            Error: 3
        }
    };

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

    self.showMessage = function (containerId, message, messageType) {
        var element = $("#" + containerId);
        element.removeClass("alertboxerr")
            .removeClass("alertboxscc")
            .removeClass("alertboxwrn")
            .removeClass("display-none");
        var messageDiv = element.find("div");
        messageDiv.empty()
            .html(message);
        switch (messageType) {
            case sharedScriptManager.Enums.MessageType.Success:
                element.addClass("alertboxscc");
                setTimeout(function () {
                    sharedScriptManager.hideMessage(containerId);
                }, 3000);
                break;
            case sharedScriptManager.Enums.MessageType.Error:
                element.addClass("alertboxerr");
                break;
            case sharedScriptManager.Enums.MessageType.Warning:
                element.addClass("alertboxwrn");
                break;
        }
    };
    self.hideMessage = function (containerId) {
        var element = $("#" + containerId);
        element.addClass("display-none");
    };
};

sharedScriptManager = new SharedScriptManager();
