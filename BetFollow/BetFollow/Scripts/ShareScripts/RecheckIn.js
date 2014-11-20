
/*jshint unused: vars */
var recheckIn;
var RecheckIn = function () {
    var self = this;
    self.RecheckinXHR = null;
    self.udpateOnlineStatus = function () {
        if (self.RecheckinXHR != null) {
            self.RecheckinXHR.abort();
        }

        self.RecheckinXHR = $.ajax({
            type: "POST",
            url: window.rootUrl + "UserLogin/CheckUserOnlineStatus",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '',
            success: function (rs) {
                if (rs != null && rs.ErrCode != null) {
                    if (rs.ErrCode > 0) {
                        self.openConfirmPopup();
                    }

                    return false;
                }
                else {
                    self.openConfirmPopup();
                    return false;
                }
            },
            error: function () {
                self.openConfirmPopup();
                return false;
            },
            complete: function () {
                self.RecheckinXHR = null;
            }
        });
    };

    self.openConfirmPopup = function () {
        $("#dialog:ui-dialog").dialog("destroy");

        $("#divErrorPoup").html('Another session has been logged in or your session is expired. Forced to logout!');
        $("#divErrorPoup").dialog({
            width: 480,
            height: 140,
            zIndex: 500,
            resizable: false,
            modal: true,
            title: 'Alert',
            position: [300, 120],
            close: function (event, ui) {
                window.location.href = accUrlDefault;
            },
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        window.location.href = accUrlDefault;
                        $(this).dialog("close");
                    }
                }
            ]
        });

        $(".ui-dialog-buttonpane .ui-button-text").html("OK");
        return false;
    }
};

recheckIn = new RecheckIn();
setInterval(function () {
    recheckIn.udpateOnlineStatus()
}, 20000);











