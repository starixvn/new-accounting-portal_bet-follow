"use strict";
var menuManager;
var MenuManager = function () {
    var self = this;
    var self = this;
    self.Enums = {
    };
    self.DOMElements = {
        RightContent: null,
        DashboardMenu: null,
        SubMenu: null
    };
    self.initPage = function () {
        self.cacheDOMElements();
        self.bindEvents();
    };
    self.cacheDOMElements = function () {
        self.DOMElements.RightContent = $(".rightcontent");
        self.DOMElements.SubMenu = parent.$('#divSubMenu');
    };
    self.bindEvents = function () {
    };

    self.goToURL = function (frameId, url) {
        $("#" + frameId).attr({
            src: url
        });
    };
    self.setActiveClassForSubMenu = function () {
        var breadscrumbMenuName = arguments;
        var breadscrumbMenuNameLength = arguments ? breadscrumbMenuName.length : 0;
        var parentMenuName = "";
        var lastMenu = "";
        if (breadscrumbMenuNameLength) {
            lastMenu = breadscrumbMenuName[breadscrumbMenuNameLength - 1];
            for (var i = 0; i < breadscrumbMenuNameLength - 1; i++) {
                parentMenuName += '<li>' + breadscrumbMenuName[i] + '</li>';
            }
        }

        var activeMenu =
            '<ul class="breadcrumbsMenu list-inline list-unstyled">\
                <li><span class="icon-home touchable-element"></span></li>' +
                parentMenuName +
                '<li class="active">' + lastMenu + '</li>\
            </ul>';

        self.DOMElements.SubMenu.html(activeMenu);
        self.DOMElements.SubMenu.find(".breadcrumbsMenu .icon-home").click(function () {
            self.goToHomePage();
        });
    };
    self.goToHomePage = function () {
        $("#centerFr").attr({
            src: window.rootUrl + "Home/BlankPage"
        });
    };
};

menuManager = new MenuManager();