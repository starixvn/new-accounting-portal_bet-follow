$(document).ready(function () {
    autoFollowBet.initPage();
});

var autoFollowBet = {
    Tables: {
        dropdownFollowType: null,
        TextboxUsername: null,
        TextboxFollower: null,
        dropdownSource: null,
        dropdownBAEnabled: null,
        errorMessage: null,
        reportGrid: null,
        reportGridBody: null,
        addNewFollowedCustomerDialog: null,
        buttonAddNewFollowedCustomer: null,
        reportGridPagination: null,
        dropdownCustomer: null
    },
    followTypeEnums: {
        LiveStatus: 0,
        LiveStatus_Live: 1,
        LiveStatus_NonLive: 0,
        LiveStatus_All: '%',

        HDP: 1,
        HDP_Follow: 1,
        HDP_NotFollow: 0,
        HDP_All: '%',

        _1stHDP: 2,
        _1stHDP_Follow: 1,
        _1stHDP_NotFollow: 0,
        _1stHDP_All: '%',

        OverUnder: 3,
        OverUnder_Follow: 1,
        OverUnder_NotFollow: 0,
        OverUnder_All: '%',

        _1stOverUnder: 4,
        _1stOverUnder_Follow: 1,
        _1stOverUnder_NotFollow: 0,
        _1stOverUnder_All: '%'
    },
    updateFollowEnums: {
        notFollow: 0,
        follow: 1,
        notUpdate: 2
    },
    CachedData: {
        FollowTypes: null,
        FollowedCustomerList: null,
        editIcon: '../Content/site/Images/icn_edit.png',
        saveIcon: '../Content/site/Images/Save.png',
        undoIcon: '../Content/site/Images/undo.png',
        deleteIcon: '../Content/site/Images/icn_del.png',
        getListInfoParams: {
            Username: null,
            Follower: null,
            BAStatus: null,
            Source: null,
            LiveStatus: null,

            HDP: null,
            _1stHDP: null,
            OverUnder: null,
            _1stOverUnder: null
        },
        deleteInfoParams: {
            Username: null,
            RowId: null
        },
        updateInfoParams: {
            RowId: null,
            Username: null,
            Follower: null,
            SourceId: null,
            Source: null,
            Rate: null,
            LiveStatus: null,
            FollowedHDP: null,
            Followed1stHDP: null,
            FollowedOverUnder: null,
            Followed1stOverUnder: null
        },
        gridHeight: $(window).height() - 180,
        gridWidth: 1112,
        pageIndex: 0,
        totalItems: 0,
        pageSize: 50,
        defaultFollowerName: "BARM001"
    },
    initPage: function () {
        autoFollowBet.cacheDOMElement();
        autoFollowBet.getFollowType();
        autoFollowBet.Tables.addNewFollowedCustomerDialog =
        autoFollowBet.Tables.addNewFollowedCustomerDialog.dialog({
            title: viewResources.Add_New_Followed_Customer,
            autoOpen: false,
            height: 200,
            width: 600,
            modal: true
        });

        autoFollowBet.bindingEvent();
    },
    cacheDOMElement: function () {
        autoFollowBet.Tables.TextboxUsername = $("#textbox-username");
        autoFollowBet.Tables.TextboxFollower = $("#textbox-follower");
        autoFollowBet.Tables.dropdownSource = $("#dropdown-source");
        autoFollowBet.Tables.dropdownBAEnabled = $("#dlStatus");
        autoFollowBet.Tables.errorMessage = $("#errormessage");
        autoFollowBet.Tables.reportGrid = $("#autofollowbet-grid");
        autoFollowBet.Tables.reportGridBody = $("#autofollowbet-gridbody");
        autoFollowBet.Tables.reportGridPagination = autoFollowBet.Tables.reportGrid.find(".pagination");

        autoFollowBet.Tables.addNewFollowedCustomerDialog = $('#dialog-addnewfollowedcustomer');
        autoFollowBet.Tables.buttonAddNewFollowedCustomer = $('#button-addnewfollowedcustomer');

        autoFollowBet.Tables.resultMessage_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('#resultmessage-adddialog');
        autoFollowBet.Tables.textboxUsername_AddDialog = $('#textbox-username-addnewdialog');
        autoFollowBet.Tables.textboxRate_AddDialog = $('#textbox-rate-addnewdialog');
        autoFollowBet.Tables.textboxFollower_AddDialog = $('#textbox-follower-addnewdialog');
        autoFollowBet.Tables.buttonSubmit_AddDialog = $('#buttonsubmit-addnewdialog');

        autoFollowBet.Tables.liveHdpStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive .hdpstatus');
        autoFollowBet.Tables.live1stHDPStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1sthdpstatus');
        autoFollowBet.Tables.liveOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive .overunderstatus');
        autoFollowBet.Tables.live1stOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1stoverunderstatus');
        autoFollowBet.Tables.dropdownAddLiveOdds = $('#dropdown-live-odds-adddialog');
        autoFollowBet.Tables.noneLiveHdpStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive .hdpstatus');
        autoFollowBet.Tables.noneLive1stHDPStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1sthdpstatus');
        autoFollowBet.Tables.noneLiveOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive .overunderstatus');
        autoFollowBet.Tables.noneLive1stOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1stoverunderstatus');
        autoFollowBet.Tables.dropdownAddNoneLiveOdds = $('#dropdown-nonelive-odds-adddialog');
        autoFollowBet.Tables.dropdownCustomer = $('#dropdown-customer');
    },
    getFollowType: function () {
        autoFollowBet.blockUI();
        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/FollowTypes",
            null,
            autoFollowBet.renderFollowType,
            autoFollowBet.renderFollowType,
            autoFollowBet.unblockUI,
            true);
    },
    blockUI: function () {
        try {
            BlockUI();
        }
        catch (e) {
        }
    },
    unblockUI: function () {
        try {
            jQuery.unblockUI();
        }
        catch (e) {
        }
    },
    renderFollowType: function (result) {
        autoFollowBet.CachedData.FollowTypes = result;
        var followTypeEnums = autoFollowBet.followTypeEnums;
        autoFollowBet.Tables.dropdownFollowType = $("#dropdown-followtype");
        var ddwnFollowTypes = [];
        if (result && result.length > 0) {
            var optionLength = result.length;
            var prefixId = 'dropdown-followType';
            for (var i = 0; i < optionLength; i++) {
                var followType = result[i];
                var subTypesLength = followType.ChildsInfo.length;
                var subType = [];
                for (var j = 0; j < subTypesLength; j++) {
                    var info = followType.ChildsInfo[j];
                    subType.push({
                        id: prefixId + followType.Id + "_" + info.Id,
                        value: info.Id,
                        text: info.Name,
                        checked: true,
                        enable: true,
                        cssClass: "",
                        items: []
                    });
                }

                ddwnFollowTypes.push({
                    id: prefixId + followType.Id,
                    value: followType.Id,
                    text: followType.Name,
                    checked: true,
                    enable: true,
                    cssClass: "",
                    items: subType
                });
            }
        }

        autoFollowBet.Tables.dropdownFollowType.fanexMultiSelect(
        {
            minWidth: 180,
            maxHeight: 450,
            shadow: true,
            showHeader: true,
            isCheckAll: true,
            showFooter: false,
            showTooltip: false,
            checkAllText: viewResources.All,
            isUsedCustomCheckAllText: true,
            customCheckAllText: viewResources.All,
            noItemText: viewResources.No_type_found,
            selectedList: 3,
            listData: ddwnFollowTypes
        });

        autoFollowBet.Tables.dropdownFollowType = $("#dropdown-followtype");
    },
    callAjax: function (reportHandler,
        url,
        requestParams,
        successFunction,
        errorFunction,
        completeFunction,
        isKeepingMessage) {
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: requestParams ? JSON.stringify(requestParams) : null,
            beforeSend: function () {
            },
            success: function (rs) {
                if (successFunction && typeof (successFunction) == 'function') {
                    successFunction.call(reportHandler, rs);
                }
            },
            error: function (jqXHR, event, ajaxSettings) {
                if (errorFunction && typeof (errorFunction) == 'function') {
                    errorFunction.call(reportHandler);
                }
            },
            complete: function () {
                if (completeFunction && typeof (completeFunction) == 'function') {
                    completeFunction();
                }
            }
        });
    },
    bindingEvent: function () {
        autoFollowBet.Tables.buttonAddNewFollowedCustomer.unbind("click");
        autoFollowBet.Tables.buttonAddNewFollowedCustomer.click(function () {
            autoFollowBet.ShowAddNewFollowedCustomerDialog();
        });

        autoFollowBet.Tables.buttonSubmit_AddDialog.unbind("click");
        autoFollowBet.Tables.buttonSubmit_AddDialog.click(function () {
            autoFollowBet.addNewFollowedCustomer();
        });
    },
    GetAutoFollowedBet: function () {
        autoFollowBet.blockUI();
        var postParams = autoFollowBet.getListInfoParams();
        autoFollowBet.CachedData.getListInfoParams = postParams;
        sharedScriptManager.hideMessage("errormessage");
        if (!autoFollowBet.validateSelectInfoParams(postParams)) {
            autoFollowBet.unblockUI();
            return;
        }

        autoFollowBet.CachedData.pageIndex = 0;
        autoFollowBet.CachedData.pageSize = 50;
        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/AutoFollowedBetCustomers",
            postParams,
            autoFollowBet.renderFollowBetResult,
            autoFollowBet.renderFollowBetResult,
            autoFollowBet.unblockUI,
            false);
    },
    getListInfoParams: function () {
        return {
            Username: autoFollowBet.Tables.TextboxUsername.val(),
            Follower: $.trim(autoFollowBet.Tables.TextboxFollower.val()),
            BAStatus: autoFollowBet.Tables.dropdownBAEnabled.val(),
            Source: autoFollowBet.Tables.dropdownSource.val(),
            LiveStatus: autoFollowBet.GetLiveStatusParam(),

            HDP: autoFollowBet.GetHDPParam(),
            _1stHDP: autoFollowBet.Get1stHDPParam(),
            OverUnder: autoFollowBet.GetOverUnderParam(),
            _1stOverUnder: autoFollowBet.Get1stOverUnderParam(),
            IsAgent: autoFollowBet.Tables.dropdownCustomer.val()
        };
    },
    GetLiveStatusParam: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var groupId = "#dropdown-followType" + followTypeEnums.LiveStatus;
        if ($(groupId).attr("checked")) {
            return followTypeEnums.LiveStatus_All.toString();
        }

        var paramList = [];

        if ($(groupId + "_" + followTypeEnums.LiveStatus_Live).attr("checked")) {
            paramList.push(followTypeEnums.LiveStatus_Live);
        }

        if ($(groupId + "_" + followTypeEnums.LiveStatus_NonLive).attr("checked")) {
            paramList.push(followTypeEnums.LiveStatus_NonLive);
        }

        return paramList.join(",");
    },
    GetHDPParam: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var groupId = "#dropdown-followType" + followTypeEnums.HDP;
        if ($(groupId).attr("checked")) {
            return followTypeEnums.HDP_All.toString();
        }

        var paramList = [];
        if ($(groupId + "_" + followTypeEnums.HDP_Follow).attr("checked")) {
            paramList.push(followTypeEnums.HDP_Follow);
        }

        if ($(groupId + "_" + followTypeEnums.HDP_NotFollow).attr("checked")) {
            paramList.push(followTypeEnums.HDP_NotFollow);
        }

        return paramList.join(",");
    },
    Get1stHDPParam: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var groupId = "#dropdown-followType" + followTypeEnums._1stHDP;
        if ($(groupId).attr("checked")) {
            return followTypeEnums._1stHDP_All.toString();
        }

        var paramList = [];
        if ($(groupId + "_" + followTypeEnums._1stHDP_Follow).attr("checked")) {
            paramList.push(followTypeEnums._1stHDP_Follow);
        }

        if ($(groupId + "_" + followTypeEnums._1stHDP_NotFollow).attr("checked")) {
            paramList.push(followTypeEnums._1stHDP_NotFollow);
        }

        return paramList.join(",");
    },
    GetOverUnderParam: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var groupId = "#dropdown-followType" + followTypeEnums.OverUnder;
        if ($(groupId).attr("checked")) {
            return followTypeEnums.OverUnder_All.toString();
        }

        var paramList = [];
        if ($(groupId + "_" + followTypeEnums.OverUnder_Follow).attr("checked")) {
            paramList.push(followTypeEnums.OverUnder_Follow);
        }

        if ($(groupId + "_" + followTypeEnums.OverUnder_NotFollow).attr("checked")) {
            paramList.push(followTypeEnums.OverUnder_NotFollow);
        }

        return paramList.join(",");
    },
    Get1stOverUnderParam: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var groupId = "#dropdown-followType" + followTypeEnums._1stOverUnder;
        if ($(groupId).attr("checked")) {
            return followTypeEnums._1stOverUnder_All.toString();
        }

        var paramList = [];
        if ($(groupId + "_" + followTypeEnums._1stOverUnder_Follow).attr("checked")) {
            paramList.push(followTypeEnums._1stOverUnder_Follow);
        }

        if ($(groupId + "_" + followTypeEnums._1stOverUnder_NotFollow).attr("checked")) {
            paramList.push(followTypeEnums._1stOverUnder_NotFollow);
        }

        return paramList.join(",");
    },
    validateSelectInfoParams: function (postParams) {
        sharedScriptManager.hideMessage("errormessage");
        if (postParams.LiveStatus.length == 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_LiveStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams.HDP.length == 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_HDPStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1stHDP.length == 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1stHDPStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams.OverUnder.length == 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_OverUnderStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1stOverUnder.length == 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1stOverUnderStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        return true;
    },
    renderFollowBetResult: function (result) {
        autoFollowBet.CachedData.FollowedCustomerList = result;
        var arr = [];
        var rowHTML;
        autoFollowBet.CachedData.totalItems = (result && result.length > 0 ? result.length : 0);
        if (autoFollowBet.CachedData.totalItems) {
            var resultLength = result.length;
            var indexRange = autoFollowBet.getIndexRange(autoFollowBet.CachedData.pageIndex);
            var rowIndex = 0;
            var isEvenRow = true;
            for (var i = 0; i < resultLength; i++) {
                var followInfo = result[i];
                if (!followInfo.IsDeleted &&
                    indexRange.startIndex <= rowIndex &&
                    rowIndex <= indexRange.endIndex) {
                    rowHTML = autoFollowBet.renderFollowBetRow(rowIndex, isEvenRow, followInfo);
                    arr.push(rowHTML);
                    isEvenRow = !isEvenRow;
                }

                rowIndex++;
            }

            autoFollowBet.Tables.reportGridBody.html(arr.join(''));
            autoFollowBet.Tables.reportGrid.removeClass("display-none")
                .reRenderScroller(autoFollowBet.CachedData.gridWidth, autoFollowBet.CachedData.gridHeight, true);
            autoFollowBet.initPager(autoFollowBet.CachedData.totalItems, autoFollowBet.CachedData.pageSize, autoFollowBet.CachedData.pageIndex);
        }
        else {
            var rowHTML = '<tr>\
                                <td colspan="11" style="border-right: 0px none">\
                                    <div class="c b" style="width: 1030px">' + viewResources.No_Info + '</div>\
                                </td>\
                            </tr>';
            autoFollowBet.Tables.reportGridBody.html(rowHTML);
            autoFollowBet.Tables.reportGridPagination.html('&nbsp;');
            autoFollowBet.Tables.reportGrid.removeClass("display-none")
                .reRenderScroller(autoFollowBet.CachedData.gridWidth, autoFollowBet.CachedData.gridHeight, true);
        }
    },
    getIndexRange: function (currentPage) {
        var pageSize = parseInt(autoFollowBet.CachedData.pageSize);
        var startIndex = (currentPage * pageSize);
        var endIndex = startIndex + pageSize - 1;
        if (endIndex > autoFollowBet.CachedData.totalItems) {
            endIndex = autoFollowBet.CachedData.totalItems;
        }

        return {
            startIndex: startIndex,
            endIndex: endIndex
        };
    },
    renderFollowBetRow: function (rowId, isEvenRow, followInfo) {
        var numberChildRow = followInfo.AutoFollowBetDetail.length;
        var aaa = 0;
        var cssClass = isEvenRow ? 'bgeven' : '';
        var htmlRow = '';

        for (var i = 0; i < numberChildRow; i++) {
            var followBetByLiveStatus = followInfo.AutoFollowBetDetail[i];
            var liveStatus = followBetByLiveStatus.FollowedLive;
            var liveStatusClass = liveStatus ? 'live' : 'none-live';

            if (i == 0) {
                htmlRow += '<tr class="' + cssClass + ' followInfo_' + rowId + ' ' + liveStatusClass + '">\
                <td rowspan="' + numberChildRow + '"><div class="col120 c">' + followInfo.UserName + '</div></td>\
                <td rowspan="' + numberChildRow + '"><div class="col80 c">' + (followInfo.Source ? "Auto" : "Manual") + '</div></td>\
                <td rowspan="' + numberChildRow + '" class="td-labelrate col80"><div class="col80 c labelrate">' + followInfo.Rate + '</div></td>\
                <td><div class="col90 c">' + (followBetByLiveStatus.FollowedLive ? "Live" : "Non-Live") + '</div></td>\
                <td><div class="col80 c"><select class="dropdown-odds editablefield" disabled="disabled">' + autoFollowBet.generateDropdownOddsOptions(followBetByLiveStatus.Odds) + '</select></div></td>\
                <td class="c col60">\
                        <div class="c col60"><input class="hdpstatus editablefield" type="checkbox" disabled="disabled"' +
                            (followBetByLiveStatus.FollowedHandicap ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalfhdpstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedFirstHalfHandicap ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="overunderstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedOverUnder ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalfoverunderstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedFirstHalfOverUnder ? ' checked = "checked"' : '') + '/></div>\
                </td>\
                <td rowspan="' + numberChildRow + '" class="td-labelfollower col120"><div class="col120 c labelfollower">' + followInfo.Follower + '</div></td>\
                <td rowspan="' + numberChildRow + '" class="col70 c"><div class="col70 c ' + (followInfo.BAStatus ? "checkStatus" : "") + '"></div></td>\
                <td rowspan="' + numberChildRow + '" class="col70 c"><div class="col70 c ' + (followInfo.IsAgent ? "checkStatus" : "") + '"></div></td>\
                <td rowspan="' + numberChildRow + '"><div class="col70 c">\
                    <img class="editcontrol editicon" src="'
                     + autoFollowBet.CachedData.editIcon + '" onclick="autoFollowBet.beginEditFollowInfo(' + rowId + ')"\
                     title="' + viewResources.Edit + '" />\
                     <img class="saveicon editcontrol display-none" src="'
                     + autoFollowBet.CachedData.saveIcon + '" onclick="autoFollowBet.updateFollowInfo(' + rowId + ')"\
                     title="' + viewResources.Save + '" />\
                     <img class="undoicon editcontrol display-none" src="'
                     + autoFollowBet.CachedData.undoIcon + '" onclick="autoFollowBet.undoEditFollowInfo(' + rowId + ')"\
                     title="' + viewResources.Cancel + '" />\
                 </div></td>\
                 <td rowspan="' + numberChildRow + '"><div class="col50 c">\
                    <img class="deleteicon editicon" src="'
                     + autoFollowBet.CachedData.deleteIcon + '" onclick="autoFollowBet.deleteFollowInfo(' + rowId + ')"\
                     title="' + viewResources.Delete + '" />\
                 </div></td>\
                </tr>';
            }
            else {
                htmlRow += '<tr class="' + cssClass + ' followInfo_' + rowId + ' ' + liveStatusClass + '">\
                <td><div class="col90 c">' + (followBetByLiveStatus.FollowedLive ? "Live" : "Non-Live") + '</div></td>\
                <td><div class="col80 c"><select class="dropdown-odds editablefield" disabled="disabled">' + autoFollowBet.generateDropdownOddsOptions(followBetByLiveStatus.Odds) + '</select></div></td>\
                <td><div class="c col60"><input class="hdpstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedHandicap ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalfhdpstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedFirstHalfHandicap ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="overunderstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedOverUnder ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalfoverunderstatus editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.FollowedFirstHalfOverUnder ? ' checked = "checked"' : '') + '/></div>\
                </td></tr>';
            }
        }

        return htmlRow;
    },
    generateDropdownOddsOptions: function (oddsValue) {
        var options =
            '<option value="0.1" ' + (oddsValue === 0.1 ? 'selected="selected"' : '') + '>0.1</option>' +
            '<option value="0.09" ' + (oddsValue === 0.09 ? 'selected="selected"' : '') + '>0.09</option>' +
            '<option value="0.08" ' + (oddsValue === 0.08 ? 'selected="selected"' : '') + '>0.08</option>' +
            '<option value="0.07" ' + (oddsValue === 0.07 ? 'selected="selected"' : '') + '>0.07</option>' +
            '<option value="0.06" ' + (oddsValue === 0.06 ? 'selected="selected"' : '') + '>0.06</option>' +
            '<option value="0.05" ' + (oddsValue === 0.05 ? 'selected="selected"' : '') + '>0.05</option>' +
            '<option value="0.04" ' + (oddsValue === 0.04 ? 'selected="selected"' : '') + '>0.04</option>' +
            '<option value="0.03" ' + (oddsValue === 0.03 ? 'selected="selected"' : '') + '>0.03</option>' +
            '<option value="0.02" ' + (oddsValue === 0.02 ? 'selected="selected"' : '') + '>0.02</option>' +
            '<option value="0.01" ' + (oddsValue === 0.01 ? 'selected="selected"' : '') + '>0.01</option>' +
            '<option value="0" ' + (oddsValue === 0 ? 'selected="selected"' : '') + '>0</option>' +
            '<option value="-0.01" ' + (oddsValue === -0.01 ? 'selected="selected"' : '') + '>-0.01</option>' +
            '<option value="-0.02" ' + (oddsValue === -0.02 ? 'selected="selected"' : '') + '>-0.02</option>' +
            '<option value="-0.03" ' + (oddsValue === -0.03 ? 'selected="selected"' : '') + '>-0.03</option>' +
            '<option value="-0.04" ' + (oddsValue === -0.04 ? 'selected="selected"' : '') + '>-0.04</option>' +
            '<option value="-0.05" ' + (oddsValue === -0.05 ? 'selected="selected"' : '') + '>-0.05</option>' +
            '<option value="-0.06" ' + (oddsValue === -0.06 ? 'selected="selected"' : '') + '>-0.06</option>' +
            '<option value="-0.07" ' + (oddsValue === -0.07 ? 'selected="selected"' : '') + '>-0.07</option>' +
            '<option value="-0.08" ' + (oddsValue === -0.08 ? 'selected="selected"' : '') + '>-0.08</option>' +
            '<option value="-0.09" ' + (oddsValue === -0.09 ? 'selected="selected"' : '') + '>-0.09</option>' +
            '<option value="-0.1" ' + (oddsValue === -0.1 ? 'selected="selected"' : '') + '>-0.1</option>';
        return options;
    },
    initPager: function (totalItem, itemsPerPage, currentPage) {
        var pagingOption = {
            start_per_page: 50,
            step_per_page: 50,
            max_items_per_page: 500,
            item_per_page_arr: [50, 100, 200, 500],
            callback: autoFollowBet.pageSelectCallback,
            items_per_page: itemsPerPage,
            current_page: currentPage
        };

        autoFollowBet.Tables.reportGridPagination.pagination(totalItem, pagingOption);
    },
    pageSelectCallback: function (pageIndex, itemsPerPage, jq) {
        var maxPage = (itemsPerPage == 0 ? 0 : Math.ceil(autoFollowBet.CachedData.totalItems / itemsPerPage));
        pageIndex = pageIndex < maxPage ? pageIndex : maxPage - 1;
        autoFollowBet.CachedData.pageIndex = pageIndex;
        autoFollowBet.CachedData.pageSize = itemsPerPage;

        autoFollowBet.pagingFollowBetResult();
        return false;
    },
    pagingFollowBetResult: function () {
        var arr = [];
        var rowHTML;

        var report = autoFollowBet.CachedData.FollowedCustomerList;
        if (autoFollowBet.CachedData.totalItems) {
            var resultLength = report.length;
            var indexRange = autoFollowBet.getIndexRange(autoFollowBet.CachedData.pageIndex);
            var rowIndex = 0;
            var isEvenRow = true;
            var showItemIndex = 0;
            for (var i = 0; i < resultLength; i++) {
                var followInfo = report[i];
                if (!followInfo.IsDeleted &&
                    indexRange.startIndex <= showItemIndex &&
                    showItemIndex <= indexRange.endIndex) {
                    rowHTML = autoFollowBet.renderFollowBetRow(rowIndex, isEvenRow, followInfo);
                    arr.push(rowHTML);
                    isEvenRow = !isEvenRow;

                }

                if (!followInfo.IsDeleted) {
                    showItemIndex++;
                }

                rowIndex++;
            }

            autoFollowBet.Tables.reportGridBody.html(arr.join(''));
            autoFollowBet.Tables.reportGrid.removeClass("hidden")
                                           .reRenderScroller(autoFollowBet.CachedData.gridWidth, autoFollowBet.CachedData.gridHeight, true);
            autoFollowBet.initPager(autoFollowBet.CachedData.totalItems, autoFollowBet.CachedData.pageSize, autoFollowBet.CachedData.pageIndex);
        }
        else {
            var rowHTML = '<tr>\
                                <td colspan="11" style="border-right: 0px none">\
                                    <div class="c b" style="width: 1030px">' + viewResources.No_Info + '</div>\
                                </td>\
                            </tr>';
            autoFollowBet.Tables.reportGridBody.html(rowHTML);
            autoFollowBet.Tables.reportGridPagination.html('&nbsp;');
            autoFollowBet.Tables.reportGrid.removeClass("hidden")
                .reRenderScroller(autoFollowBet.CachedData.gridWidth, autoFollowBet.CachedData.gridHeight, true);
        }
    },
    beginEditFollowInfo: function (rowId) {
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];
        var rowInfo = $(".followInfo_" + rowId);
        rowInfo.find(".editablefield").attr("disabled", null);
        var iconEdit = rowInfo.find('.editicon');
        var iconSave = rowInfo.find('.saveicon');
        var iconUndo = rowInfo.find('.undoicon');
        iconEdit.hide();
        iconSave.show()
        iconUndo.show();
        var rate = rowInfo.find('.labelrate').html();
        var tdLabelRate = rowInfo.find('.td-labelrate');

        tdLabelRate.html('<input class="textboxrate txt" maxlength="4" type="text"' +
            'onkeyup="autoFollowBet.onEditFollowInfo(' + rowId + ');" editor="true"/>');
        rowInfo.find('.textboxrate').val(rate);

        var follower = rowInfo.find('.labelfollower').html();
        var tdLabelFollower = rowInfo.find('.td-labelfollower');
        tdLabelFollower.html('<input class="textboxfollower txt" maxlength="50" type="text"' +
            'onkeyup="autoFollowBet.onEditFollowInfo(' + rowId + ');" editor="true"/>');
        rowInfo.find('.textboxfollower').val(follower);
    },
    undoEditFollowInfo: function (rowId) {
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];
        var rowInfo = $(".followInfo_" + rowId);

        var iconEdit = rowInfo.find('.editicon');
        var iconSave = rowInfo.find('.saveicon');
        var iconUndo = rowInfo.find('.undoicon');
        iconSave.hide();
        iconUndo.hide();
        iconEdit.show();

        var tdLabelRate = rowInfo.find('.td-labelrate');
        tdLabelRate.html('<div class="col80 c labelrate">' + followInfo.Rate + '</div>');

        var tdLabelFollower = rowInfo.find('.td-labelfollower');
        tdLabelFollower.html('<div class="col120 c labelfollower">' + followInfo.Follower + '</div>');

        for (var i = 0; i < followInfo.AutoFollowBetDetail.length; i++) {
            var currentFollowByStatus = followInfo.AutoFollowBetDetail[i];

            if (currentFollowByStatus.FollowedLive) {
                var liveRow = $(".followInfo_" + rowId + ".live");
                var liveOdds = liveRow.find('.dropdown-odds');
                liveOdds.val(currentFollowByStatus.Odds);
                var livehdpStatus = liveRow.find('.hdpstatus');
                livehdpStatus.attr("checked", currentFollowByStatus.FollowedHandicap ? "checked" : null);
                var liveFirstHalfHdpStatus = liveRow.find('.firsthalfhdpstatus');
                liveFirstHalfHdpStatus.attr("checked", currentFollowByStatus.FollowedFirstHalfHandicap ? "checked" : null);
                var liveOverUnderStatus = liveRow.find('.overunderstatus');
                liveOverUnderStatus.attr("checked", currentFollowByStatus.FollowedOverUnder ? "checked" : null);
                var liveFirstHalfOverUnderStatus = liveRow.find('.firsthalfoverunderstatus');
                liveFirstHalfOverUnderStatus.attr("checked", currentFollowByStatus.FollowedFirstHalfOverUnder ? "checked" : null);

            } else {
                var noneLiveRow = $(".followInfo_" + rowId + ".none-live");
                var noneLiveOdds = noneLiveRow.find('.dropdown-odds');
                noneLiveOdds.val(currentFollowByStatus.Odds);
                var hdpStatus = noneLiveRow.find('.hdpstatus');
                hdpStatus.attr("checked", currentFollowByStatus.FollowedHandicap ? "checked" : null);
                var _1stHDPStatus = noneLiveRow.find('.firsthalfhdpstatus');
                _1stHDPStatus.attr("checked", currentFollowByStatus.FollowedFirstHalfHandicap ? "checked" : null);
                var overUnderStatus = noneLiveRow.find('.overunderstatus');
                overUnderStatus.attr("checked", currentFollowByStatus.FollowedOverUnder ? "checked" : null);
                var _1stOverUnderStatus = noneLiveRow.find('.firsthalfoverunderstatus');
                _1stOverUnderStatus.attr("checked", currentFollowByStatus.FollowedFirstHalfOverUnder ? "checked" : null);
            }
        }

        rowInfo.find(".editablefield").attr("disabled", "disabled");
    },
    updateFollowInfo: function (rowId) {
        autoFollowBet.blockUI();
        var postParams = autoFollowBet.getUpdateInfoParams(rowId);

        autoFollowBet.CachedData.updateInfoParams = postParams;
        if (!autoFollowBet.validateUpdateInfoParams(postParams)) {
            autoFollowBet.unblockUI();
            return;
        }

        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/UpdateAutoFollowedBetCustomer",
            postParams,
            autoFollowBet.renderUpdateFollowInfoResult,
            autoFollowBet.renderUpdateFollowInfoResult,
            autoFollowBet.unblockUI,
            true);
    },
    getUpdateInfoParams: function (rowId) {
        var liveRow = null;
        var noneLiveRow = null;
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var updateFollowEnums = autoFollowBet.updateFollowEnums;
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];

        var rowInfo = $(".followInfo_" + rowId);
        var iconEdit = rowInfo.find('.editicon');
        var iconSave = rowInfo.find('.saveicon');
        var iconUndo = rowInfo.find('.undoicon');
        var rate = rowInfo.find('.textboxrate').val();
        var follower = rowInfo.find('.textboxfollower').val();

        var noneLiveOdds = updateFollowEnums.notUpdate;
        var liveOdds = updateFollowEnums.notUpdate;

        var followedLiveHdp = updateFollowEnums.notUpdate;
        var followedNoneLiveHdp = updateFollowEnums.notUpdate;

        var followedLive1stHdp = updateFollowEnums.notUpdate;
        var followedNoneLive1stHdp = updateFollowEnums.notUpdate;

        var followedLiveOverUnder = updateFollowEnums.notUpdate;
        var followedNoneLiveOverUnder = updateFollowEnums.notUpdate;

        var followedLive1stOverUnder = updateFollowEnums.notUpdate;
        var followedNoneLive1stOverUnder = updateFollowEnums.notUpdate;

        var numberStatusFollow = followInfo.AutoFollowBetDetail.length;

        if (numberStatusFollow == 2) {
            liveRow = $(".followInfo_" + rowId + ".live");
            noneLiveRow = $(".followInfo_" + rowId + ".none-live");
            liveOdds = liveRow.find('.dropdown-odds').val();
            noneLiveOdds = noneLiveRow.find('.dropdown-odds').val();
            followedLiveHdp = liveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNoneLiveHdp = noneLiveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLive1stHdp = liveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNoneLive1stHdp = noneLiveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLiveOverUnder = liveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNoneLiveOverUnder = noneLiveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLive1stOverUnder = liveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNoneLive1stOverUnder = noneLiveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
        }
        else {
            if (followInfo.AutoFollowBetDetail[0].FollowedLive) {
                liveRow = $(".followInfo_" + rowId + ".live");
                liveOdds = liveRow.find('.dropdown-odds').val();
                followedLiveHdp = liveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLive1stHdp = liveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLiveOverUnder = liveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLive1stOverUnder = liveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            } else {
                noneLiveRow = $(".followInfo_" + rowId + ".none-live");
                noneLiveOdds = noneLiveRow.find('.dropdown-odds').val();
                followedNoneLiveHdp = noneLiveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNoneLive1stHdp = noneLiveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNoneLiveOverUnder = noneLiveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNoneLive1stOverUnder = noneLiveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            }
        }

        return {
            RowId: rowId,
            Username: followInfo.UserName,
            Rate: rate,
            LiveOdds: liveOdds,
            NoneLiveOdds: noneLiveOdds,
            FollowedLiveHDP: followedLiveHdp,
            FollowedNoneLiveHDP: followedNoneLiveHdp,
            FollowedLive1stHDP: followedLive1stHdp,
            FollowedNoneLive1stHDP: followedNoneLive1stHdp,
            FollowedLiveOverUnder: followedLiveOverUnder,
            FollowedNoneLiveOverUnder: followedNoneLiveOverUnder,
            FollowedLive1stOverUnder: followedLive1stOverUnder,
            FollowedNoneLive1stOverUnder: followedNoneLive1stOverUnder,
            Follower: follower
        };
    },
    validateUpdateInfoParams: function (postParams) {
        var rowInfo = $(".followInfo_" + postParams.RowId);
        var maxMessageWidth = 450;
        if (postParams.Rate == '') {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Empty, sharedScriptManager.Enums.MessageType.Error);
            rowInfo.find('.textboxrate').focus();
            return false;
        }

        if (!$.isNumeric(postParams.Rate)) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Number, sharedScriptManager.Enums.MessageType.Error);
            rowInfo.find('.textboxrate').focus();
            return false;
        }

        var rate = parseFloat(postParams.Rate);
        if (rate < viewResources.minRate || viewResources.maxRate < rate) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Range, sharedScriptManager.Enums.MessageType.Error);
            rowInfo.find('.textboxrate').focus();
            return false;
        }

        if (parseFloat(rate.toFixed(2)) != rate) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_DecimalDigit, sharedScriptManager.Enums.MessageType.Error);
            rowInfo.find('.textboxrate').focus();
            return false;
        }

        if ($.trim(postParams.Follower) == '') {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidFollower_Empty, sharedScriptManager.Enums.MessageType.Error);
            rowInfo.find('.textboxfollower').focus();
            return false;
        }

        sharedScriptManager.hideMessage("errormessage");
        return true;
    },
    renderUpdateFollowInfoResult: function (result) {
        if (result == null) {
            sharedScriptManager.showMessage("errormessage", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        if (parseInt(result.Code) != 0) {
            sharedScriptManager.showMessage("errormessage", result.Message, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        sharedScriptManager.showMessage("errormessage", viewResources.Success_Admin_AutoFollowBetManagement_UpdateFollowInfo, sharedScriptManager.Enums.MessageType.Success);
        autoFollowBet.endEditFollowInfo();
        var t = setTimeout(function () {
            sharedScriptManager.hideMessage("errormessage");
        }, 3000);
    },
    endEditFollowInfo: function () {
        var rowId = autoFollowBet.CachedData.updateInfoParams.RowId;
        var rowInfo = $(".followInfo_" + rowId);
        rowInfo.find(".editablefield").attr("disabled", "disabled");
        var iconEdit = rowInfo.find('.editicon');
        var iconSave = rowInfo.find('.saveicon');
        var iconUndo = rowInfo.find('.undoicon');
        iconSave.hide()
        iconUndo.hide();
        iconEdit.show();

        var tdLabelRate = rowInfo.find('.td-labelrate');
        tdLabelRate.html('<div class="col80 c labelrate">' + autoFollowBet.CachedData.updateInfoParams.Rate + '</div>');

        var tdLabelFollower = rowInfo.find('.td-labelfollower');
        tdLabelFollower.html('<div class="col120 c labelfollower">' + autoFollowBet.CachedData.updateInfoParams.Follower + '</div>');

        autoFollowBet.CachedData.FollowedCustomerList[rowId].Rate = autoFollowBet.CachedData.updateInfoParams.Rate;
        autoFollowBet.CachedData.FollowedCustomerList[rowId].LiveStatus = autoFollowBet.CachedData.updateInfoParams.LiveStatus;
        autoFollowBet.CachedData.FollowedCustomerList[rowId].FollowedHDP = autoFollowBet.CachedData.updateInfoParams.FollowedHDP;
        autoFollowBet.CachedData.FollowedCustomerList[rowId].Followed1stHDP = autoFollowBet.CachedData.updateInfoParams.Followed1stHDP;
        autoFollowBet.CachedData.FollowedCustomerList[rowId].FollowedOverUnder = autoFollowBet.CachedData.updateInfoParams.FollowedOverUnder;
        autoFollowBet.CachedData.FollowedCustomerList[rowId].Followed1stOverUnder = autoFollowBet.CachedData.updateInfoParams.Followed1stOverUnder;
    },
    onEditFollowInfo: function (rowId) {
        //        var rowInfo = $(".followInfo_" + rowId);
        //        var rate = rowInfo.find(".textboxrate").val();
    },
    deleteFollowInfo: function (rowId) {
        autoFollowBet.blockUI();
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];
        var isDelete = confirm(viewResources.Warning_Admin_AutoFollowBetManagement_DeleteFollowInfo);
        if (!isDelete) {
            autoFollowBet.unblockUI();
            return;
        }

        var postParams = {
            Username: followInfo.UserName,
            RowId: rowId
        };

        autoFollowBet.CachedData.deleteInfoParams = postParams;
        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/DeleteAutoFollowedBetCustomer",
            postParams,
            autoFollowBet.renderDeleteFollowInfoResult,
            autoFollowBet.renderDeleteFollowInfoResult,
            autoFollowBet.unblockUI,
            true);
    },
    renderDeleteFollowInfoResult: function (rs) {
        var rowId = autoFollowBet.CachedData.deleteInfoParams.RowId;
        if (rs == null) {
            sharedScriptManager.showMessage("errormessage", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        if (parseInt(rs.Code) != 0) {
            sharedScriptManager.showMessage("errormessage", rs.Message, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        sharedScriptManager.showMessage("errormessage", viewResources.Success_Admin_AutoFollowBetManagement_DeleteFollowInfo, sharedScriptManager.Enums.MessageType.Success);
        var rowInfo = $(".followInfo_" + rowId);
        rowInfo.remove();
        autoFollowBet.CachedData.FollowedCustomerList[rowId].IsDeleted = true;
        autoFollowBet.CachedData.totalItems = autoFollowBet.CachedData.totalItems - 1;
        if (autoFollowBet.CachedData.totalItems <= autoFollowBet.CachedData.pageIndex * autoFollowBet.CachedData.pageSize) {
            autoFollowBet.CachedData.pageIndex = autoFollowBet.CachedData.pageIndex - 1;
        }

        autoFollowBet.initPager(autoFollowBet.CachedData.totalItems, autoFollowBet.CachedData.pageSize, autoFollowBet.CachedData.pageIndex);
        autoFollowBet.pagingFollowBetResult();
        var t = setTimeout(function () {
            sharedScriptManager.hideMessage("errormessage");
        }, 3000);
    },
    ShowAddNewFollowedCustomerDialog: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        autoFollowBet.Tables.resultMessage_AddDialog.addClass("display-none");
        autoFollowBet.Tables.textboxUsername_AddDialog.val('');
        autoFollowBet.Tables.textboxFollower_AddDialog.val(autoFollowBet.CachedData.defaultFollowerName);
        autoFollowBet.Tables.textboxRate_AddDialog.val('');
        autoFollowBet.Tables.addNewFollowedCustomerDialog.removeClass("display-none").dialog("open");
        $('#dropdown-live-odds-adddialog').val('0');
        $('#dropdown-nonelive-odds-adddialog').val('0');

        var dialog = $(".ui-dialog");
        dialog.css({
            left: ($(window).width() - dialog.width()) / 2,
            top: ($(window).height() - dialog.height()) / 2
        });
    },
    addNewFollowedCustomer: function () {
        autoFollowBet.blockUI();
        var postParams = autoFollowBet.getAddInfoParams();
        if (!autoFollowBet.validateAddInfoParams(postParams)) {
            autoFollowBet.unblockUI();
            return;
        }

        autoFollowBet.callAjax(this,
             window.rootUrl + "AutoFollowBet/AddAutoFollowedBetCustomer",
            postParams,
            autoFollowBet.renderAddFollowInfoResult,
            autoFollowBet.renderAddFollowInfoResult,
            autoFollowBet.unblockUI,
            true);
    },
    getAddInfoParams: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        return {
            Username: autoFollowBet.Tables.textboxUsername_AddDialog.val(),
            Rate: autoFollowBet.Tables.textboxRate_AddDialog.val(),
            LiveOdds: autoFollowBet.Tables.dropdownAddLiveOdds.val(),
            NoneLiveOdds: autoFollowBet.Tables.dropdownAddNoneLiveOdds.val(),
            FollowedLiveHDP: autoFollowBet.Tables.liveHdpStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedNoneLiveHDP: autoFollowBet.Tables.noneLiveHdpStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedLive1stHDP: autoFollowBet.Tables.live1stHDPStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedNoneLive1stHDP: autoFollowBet.Tables.noneLive1stHDPStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedLiveOverUnder: autoFollowBet.Tables.liveOverUnderStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedNoneLiveOverUnder: autoFollowBet.Tables.noneLiveOverUnderStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedLive1stOverUnder: autoFollowBet.Tables.live1stOverUnderStatus_AddDialog.attr("checked") ?
                true :
                false,
            FollowedNoneLive1stOverUnder: autoFollowBet.Tables.noneLive1stOverUnderStatus_AddDialog.attr("checked") ?
                true :
                false,
            Follower: autoFollowBet.Tables.textboxFollower_AddDialog.val()
        };
    },
    validateAddInfoParams: function (postParams) {
        var maxMessageWidth = 367;
        if (postParams.Username == '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_Username_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxUsername_AddDialog.focus();
            return false;
        }

        if (postParams.Rate == '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxRate_AddDialog.focus();
            return false;
        }

        if ($.trim(postParams.Follower) == '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidFollower_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxFollower_AddDialog.focus();
            return false;
        }

        if (!$.isNumeric(postParams.Rate)) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Number, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxRate_AddDialog.focus();
            return false;
        }

        var rate = parseFloat(postParams.Rate);
        if (rate < viewResources.minRate || viewResources.maxRate < rate) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Range, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxRate_AddDialog.focus();
            return false;
        }

        if (parseFloat(rate.toFixed(2)) != rate) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_DecimalDigit, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxRate_AddDialog.focus();
            return false;
        }

        sharedScriptManager.hideMessage("resultmessage-adddialog");
        return true;
    },
    renderAddFollowInfoResult: function (rs) {
        var maxMessageWidth = 367;
        if (rs == null) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        if (parseInt(rs.Code) != 0) {
            sharedScriptManager.showMessage("resultmessage-adddialog", rs.Message, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Success_Admin_AutoFollowBetManagement_AddFollowInfo, sharedScriptManager.Enums.MessageType.Success);
        var t = setTimeout(function () {
            sharedScriptManager.hideMessage("resultmessage-adddialog");
        }, 3000);
    }
};
