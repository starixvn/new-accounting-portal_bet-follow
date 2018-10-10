
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
            url: window.rootUrl + "UserLogin/ReCheckLogIn",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: '',
            success: function (rs) {
                if (rs) {
                    alert('Another session has been logged in or your session is expired. Forced to logout!');
                    window.location.href = window.rootUrl + "UserLogin/LogOut";
                }
            },
            error: function (request, status, error) {
                var result = $.parseJSON(request.responseText);
                if (result.code == 999999) {
                    window.location.href = window.rootUrl + "Common/Offline";
                }
            },
            complete: function () {
                self.RecheckinXHR = null;
            }
        });
    };

};

recheckIn = new RecheckIn();
setInterval(function () {
    recheckIn.udpateOnlineStatus()
}, 20000);











