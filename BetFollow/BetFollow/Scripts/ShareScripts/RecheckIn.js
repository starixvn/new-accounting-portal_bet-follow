
/*jshint unused: vars */
var recheckIn;
var RecheckIn = function () {
    var self = this;
    self.udpateOnlineStatus = function () {
        $.ajax({
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
            }, error: function () {
                self.openConfirmPopup();
                return false;
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
            close: function (event, ui) {
                top.location.href = accUrlDefault;
            },
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        top.location.href = accUrlDefault;
                        $(this).dialog("close");
                    }
                }
            ]
        });
        return false;
    }
};

recheckIn = new RecheckIn();
setInterval(function () {
    recheckIn.udpateOnlineStatus()
}, 20000);











