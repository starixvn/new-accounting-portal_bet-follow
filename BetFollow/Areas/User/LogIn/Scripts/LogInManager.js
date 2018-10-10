"use strict";
/* global sharedScriptManager, CryptoJS */
/* jshint unused: vars */

var LoginManager = LoginManager || {};

var LoginManager = {
    checkBrowser: function () {
        var msieVersion = sharedScriptManager.getIeVersion();
        if (msieVersion !== -1 && msieVersion < 8.0) {
            var warnPnl = $('#not-supported-browser-panel');
            if (warnPnl.css('display') === 'none') {
                warnPnl.css('display', 'block');
            }
        }
    },

    trimString: function (stringValue) {
        return stringValue.replace(/^\s+|\s+$/g, '');
        //return stringValue.replace(/^\s*/, '').replace(/\s*$/, '');
    },

    scrollScreen: function (target, times, duration) {
        for (var i = times, j = 0; i >= 0; i--) {
            setTimeout('$("' + target + '").css("left", "-' + i + '0px")', j++ * duration);
            setTimeout('$("' + target + '").css("left", "' + i + '0px")', j++ * duration);
        }
    },

    encyptPassword: function () {
        var pwdInDb = CryptoJS.CfsEnCode($('#password').val()); // if (lrf) pwd = CryptoJS.SHA1(pwd)
        var hashPassword = CryptoJS.SHA256(pwdInDb);

        // replace plaintext value by the hash value.
        $('#password').val(hashPassword);
    },

    validateInput: function () {
        $('#username').val(LoginManager.trimString($('#username').val()));
        $('#username').removeClass('err');
        $('#password').removeClass('err');

        if ($('#username').val().length === 0) {
            $('#username').addClass('err');
            LoginManager.scrollScreen('#username', 0, 100);

            return false;
        }

        if ($('#password').val().length === 0) {
            $('#password').addClass('err');
            LoginManager.scrollScreen('#password', 0, 100);

            return false;
        }

        return true;
    },

    blockComponent: function () {
        $('#username').removeClass('err');
        $('#password').removeClass('err');
        $('#btnSubmit').attr('disabled', true);
    },

    doEnter: function (evt, action) {
        /*jshint evil:true */
        if ($.browser.msie) {
            if (window.event.keyCode === 13) {
                eval(action);
            }
        } else {
            if (evt.keyCode === 13) {
                eval(action);
            }
        }
    },

    doLogin: function () {
        $('#msg').css('display', 'none');

        if (!LoginManager.validateInput()) {
            return false;
        }

        LoginManager.blockComponent();
        LoginManager.encyptPassword();
        document.forms[0].submit();

        return true;
    },

    initComponent: function () {
        $('#username').focus();

        $('#password').keydown(function (evt) {
            LoginManager.doEnter(evt, 'LoginManager.doLogin()');
        });

    },

    init: function () {
        LoginManager.checkBrowser(); // check if the client's browser is supported
        LoginManager.initComponent();
        if ($('#inner-msg').html().length > 0) {
            $('#msg').css('display', 'block');
            LoginManager.scrollScreen('#msg', 0, 100);
        }
        else {
            $('#msg').css('display', 'none');
        }
    }
};

$(document).ready(function () {
    LoginManager.init();
});