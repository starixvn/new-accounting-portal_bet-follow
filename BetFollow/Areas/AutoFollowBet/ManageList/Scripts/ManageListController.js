/*global viewResources*/

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
        dropdownCustomer: null,
        addCustomerButton: null,
        username: null,
        userList: null,
        checkAll: null,
        deleteAll: null
    },
    followTypeEnums: {
        // GroupIds
        LiveStatus: 0,
        Hdp: 1,
        _1StHdp: 2,
        OverUnder: 3,
        _1StOverUnder: 4,
        _1X2: 5,
        _1St1X2: 6,

        IsFollowed: '1',
        IsNotFollowed: '0',
        All: '%'
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
            BaStatus: null,
            Source: null,
            LiveStatus: null,

            Hdp: null,
            _1StHdp: null,
            OverUnder: null,
            _1StOverUnder: null
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
        gridWidth: 1451,
        pageIndex: 0,
        totalItems: 0,
        pageSize: 50,
        defaultFollowerName: "BARM001",
        OrgFollowers: []
    },

    initPage: function () {
        autoFollowBet.cacheDOMElement();
        autoFollowBet.getFollowType();
        // Add button dialog
        autoFollowBet.Tables.addNewFollowedCustomerDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.dialog({
            title: viewResources.Add_New_Followed_Customer,
            autoOpen: false,
            height: 400,
            width: 770,
            modal: true
        });

        autoFollowBet.Tables.addCustomerButton = $('#addCust');
        autoFollowBet.Tables.username = $('#textbox-username-addnewdialog');
        autoFollowBet.Tables.userList = $('#custList');
        autoFollowBet.Tables.checkAll = $('#chkAll');
        autoFollowBet.Tables.deleteAll = $('#button-removefollowedcustomer');

        autoFollowBet.bindingEvent();

        autoFollowBet.Tables.TextboxUsername.focus();
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

        autoFollowBet.Tables.dropdownCustomer = $('#dropdown-customer');

        // Add Dialog 
        autoFollowBet.Tables.resultMessage_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('#resultmessage-adddialog');
        autoFollowBet.Tables.textboxUsername_AddDialog = $('#textbox-username-addnewdialog');
        autoFollowBet.Tables.textboxFollower_AddDialog = $('#textbox-follower-addnewdialog');
        autoFollowBet.Tables.buttonSubmit_AddDialog = $('#buttonsubmit-addnewdialog');

        autoFollowBet.Tables.ddlOdds_AddDialog = $(".addAutoFollowBetForm .ddlOdds");
        autoFollowBet.Tables.chkBox_AddDialog = $(".addAutoFollowBetForm .chkBox");
        autoFollowBet.Tables.rates_AddDialog = $("#dialog-addnewfollowedcustomer .rate");

        // Hdp
        autoFollowBet.Tables.textboxRate_AddDialog = $('#textbox-rate-addnewdialog');
        // non-live
        autoFollowBet.Tables.dropdownAddNoneLiveOdds = $('#dropdown-nonelive-odds-adddialog');
        autoFollowBet.Tables.noneLiveHdpStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive .hdpstatus');
        autoFollowBet.Tables.noneLive1stHDPStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1sthdpstatus');
        autoFollowBet.Tables.noneLiveOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive .overunderstatus');
        autoFollowBet.Tables.noneLive1stOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1stoverunderstatus');
        // live
        autoFollowBet.Tables.dropdownAddLiveOdds = $('#dropdown-live-odds-adddialog');
        autoFollowBet.Tables.liveHdpStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive .hdpstatus');
        autoFollowBet.Tables.live1stHDPStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1sthdpstatus');
        autoFollowBet.Tables.liveOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive .overunderstatus');
        autoFollowBet.Tables.live1stOverUnderStatus_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1stoverunderstatus');

        // 1x2 
        autoFollowBet.Tables.textboxRate1x2_AddDialog = $('#textbox-rate-1x2-addnewdialog');
        // non-live
        autoFollowBet.Tables.dropdownAddNoneLiveOdds1x2 = $('#dropdown-nonelive-odds-1x2-adddialog');
        autoFollowBet.Tables.nonLive1x2Status_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1x2status');
        autoFollowBet.Tables.nonLive1st1x2Status_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedNoneLive ._1st_1x2status');
        // live
        autoFollowBet.Tables.dropdownAddLiveOdds1x2 = $('#dropdown-live-odds-1x2-adddialog');
        autoFollowBet.Tables.live1x2Status_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1x2status');
        autoFollowBet.Tables.live1st1x2Status_AddDialog = autoFollowBet.Tables.addNewFollowedCustomerDialog.find('.followedLive ._1st_1x2status');
    },

    getFollowType: function () {
        autoFollowBet.blockUI();
        autoFollowBet.callAjax(
            this,
            window.rootUrl + "AutoFollowBet/FollowTypes",
            null,
            autoFollowBet.renderFollowType,
            autoFollowBet.renderFollowType,
            autoFollowBet.unblockUI,
            true);
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

    bindingEvent: function () {
        autoFollowBet.Tables.buttonAddNewFollowedCustomer.unbind("click");
        autoFollowBet.Tables.buttonAddNewFollowedCustomer.click(function () {
            autoFollowBet.ShowAddNewFollowedCustomerDialog();
        });

        autoFollowBet.Tables.buttonSubmit_AddDialog.unbind("click");
        autoFollowBet.Tables.buttonSubmit_AddDialog.click(function () {
            autoFollowBet.addNewFollowedCustomer();
        });

        autoFollowBet.Tables.addCustomerButton.unbind('click');
        autoFollowBet.Tables.addCustomerButton.bind('click', function () {
            autoFollowBet.insertNewFollowedCustomer();
        });

        autoFollowBet.Tables.username.unbind('keypress');
        autoFollowBet.Tables.username.bind('keypress', function (event) {
            if ((event.keyCode && event.keyCode == 13) || (event.which && event.which == 13)) {
                autoFollowBet.insertNewFollowedCustomer();
            }
        });

        autoFollowBet.Tables.checkAll.unbind('click');
        autoFollowBet.Tables.checkAll.bind('click', function () {
            var checkboxes = $('.tbl-body-scroll').find('input[name=chkDel]');
            if (this.checked) {
                $(checkboxes).each(function (index, item) {
                    item.checked = true;
                });
            }
            else {
                $(checkboxes).each(function (index, item) {
                    item.checked = false;
                });
            }
        });

        autoFollowBet.Tables.deleteAll.unbind('click');
        autoFollowBet.Tables.deleteAll.bind('click', function () {
            autoFollowBet.blockUI();

            var checkboxes = $('.tbl-body-scroll').find('input[name=chkDel]');
            var allUnchecked = true;
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    allUnchecked = false;
                    break;
                }
            };

            if (allUnchecked) {
                alert(viewResources.NoUserToDelete);
            }
            else {
                autoFollowBet.deleteFollowInfoMult();
            }

            autoFollowBet.unblockUI();
        });

        autoFollowBet.Tables.TextboxUsername.unbind('keypress');
        autoFollowBet.Tables.TextboxUsername.bind('keypress', function (event) {
            if ((event.keyCode && event.keyCode == 13) ||
                (event.which && event.which == 13)) {
                autoFollowBet.getAutoFollowedBet();
            }
        });

        autoFollowBet.Tables.TextboxFollower.unbind('keypress');
        autoFollowBet.Tables.TextboxFollower.bind('keypress', function (event) {
            if ((event.keyCode && event.keyCode == 13) ||
                (event.which && event.which == 13)) {
                autoFollowBet.getAutoFollowedBet();
            }
        });
    },

    bindDeleteCheckbox: function (checkbox) {
        var checkboxes = $('.tbl-body-scroll').find('input[name=chkDel]');
        if (checkbox.checked) {
            var checkAll = true;
            for (var i = 0; i < checkboxes.length; i++) {
                if (!checkboxes[i].checked) {
                    checkAll = false;
                    break;
                }
            }

            if (checkAll) {
                $('#chkAll').attr('checked', true);
                return;
            }
        }

        $('#chkAll').attr('checked', false);
    },

    getAutoFollowedBet: function () {
        autoFollowBet.blockUI();
        var postParams = autoFollowBet.getListInfoParams();
        autoFollowBet.CachedData.getListInfoParams = postParams;
        sharedScriptManager.hideMessage("errormessage");
        if (!autoFollowBet.validateSelectInfoParams(postParams)) {
            autoFollowBet.unblockUI();
            return;
        }

        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/AutoFollowedBetCustomers",
            postParams,
            autoFollowBet.renderFollowBetResult,
            autoFollowBet.renderFollowBetResult,
            autoFollowBet.unblockUI,
            false);
    },

    getListInfoParams: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        return {
            Username: $.trim(autoFollowBet.Tables.TextboxUsername.val()),
            IsAgent: autoFollowBet.Tables.dropdownCustomer.val(),
            Source: autoFollowBet.Tables.dropdownSource.val(),
            BaStatus: autoFollowBet.Tables.dropdownBAEnabled.val(),

            LiveStatus: autoFollowBet.getFollowTypeParam(followTypeEnums.LiveStatus),

            Hdp: autoFollowBet.getFollowTypeParam(followTypeEnums.Hdp),
            _1StHdp: autoFollowBet.getFollowTypeParam(followTypeEnums._1StHdp),

            OverUnder: autoFollowBet.getFollowTypeParam(followTypeEnums.OverUnder),
            _1StOverUnder: autoFollowBet.getFollowTypeParam(followTypeEnums._1StOverUnder),

            _1X2: autoFollowBet.getFollowTypeParam(followTypeEnums._1X2),
            _1St1X2: autoFollowBet.getFollowTypeParam(followTypeEnums._1St1X2),

            Follower: $.trim(autoFollowBet.Tables.TextboxFollower.val()),

            PageSize: autoFollowBet.CachedData.pageSize,
            CurrentPage: autoFollowBet.CachedData.pageIndex
        };
    },

    // Get filter params
    getFollowTypeParam: function (groupId) {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var selector = "#dropdown-followType" + groupId.toString();
        if ($(selector).attr("checked")) {
            return followTypeEnums.All;
        }

        var paramList = [];
        if ($(selector + "_" + followTypeEnums.IsFollowed).attr("checked")) {
            paramList.push(followTypeEnums.IsFollowed);
        }

        if ($(selector + "_" + followTypeEnums.IsNotFollowed).attr("checked")) {
            paramList.push(followTypeEnums.IsNotFollowed);
        }

        return paramList.join(",");
    },

    validateSelectInfoParams: function (postParams) {
        sharedScriptManager.hideMessage("errormessage");
        if (postParams.LiveStatus.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_LiveStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams.Hdp.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_HDPStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1StHdp.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1stHDPStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams.OverUnder.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_OverUnderStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1StOverUnder.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1stOverUnderStatus_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1X2.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1X2Status_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        if (postParams._1St1X2.length === 0) {
            sharedScriptManager.showMessage(
                "errormessage",
                viewResources.Error_Admin_AutoFollowBetManagement_1St1X2Status_Empty,
                sharedScriptManager.Enums.MessageType.Error);
            return false;
        }

        return true;
    },

    renderFollowBetResult: function (result) {
        autoFollowBet.CachedData.FollowedCustomerList = result;
        var arr = [];
        var rowHtml;
        autoFollowBet.CachedData.pageSize = result.length > 0 ? result[0].PageSize : 50;
        autoFollowBet.CachedData.pageIndex = result.length > 0 ? result[0].CurrentPage : 0;
        autoFollowBet.CachedData.pageIndex = result.length > 0 ?
            (autoFollowBet.CachedData.pageIndex > (result[0].TotalItems / autoFollowBet.CachedData.pageSize) ?
                0 : autoFollowBet.CachedData.pageIndex) : autoFollowBet.CachedData.pageIndex;

        autoFollowBet.CachedData.totalItems = result.length > 0 ? result[0].TotalItems : 0;
        if (autoFollowBet.CachedData.totalItems) {
            var resultLength = result.length;
            var rowIndex = 0;
            var isEvenRow = true;
            for (var i = 0; i < resultLength; i++) {
                var followInfo = result[i];
                if (!followInfo.IsDeleted) {
                    rowHtml = autoFollowBet.renderFollowBetRow(rowIndex, isEvenRow, followInfo);
                    arr.push(rowHtml);
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
            rowHtml = '<tr>\
                                <td colspan="11" style="border-right: 0px none">\
                                    <div class="c b" style="width: 1030px">' + viewResources.No_Info + '</div>\
                                </td>\
                            </tr>';
            autoFollowBet.Tables.reportGridBody.html(rowHtml);
            autoFollowBet.Tables.reportGridPagination.html('&nbsp;');
            autoFollowBet.Tables.reportGrid.removeClass("display-none")
                .reRenderScroller(autoFollowBet.CachedData.gridWidth, autoFollowBet.CachedData.gridHeight, true);
        }
    },

    renderFollowBetRow: function (rowId, isEvenRow, followInfo) {
        var numberChildRow = followInfo.AutoFollowBetDetail.length;
        var cssClass = isEvenRow ? 'bgeven' : '';
        var htmlRow = '';

        for (var i = 0; i < numberChildRow; i++) {
            var followBetByLiveStatus = followInfo.AutoFollowBetDetail[i];
            var liveStatus = followBetByLiveStatus.FollowedLive;
            var liveStatusClass = liveStatus ? 'live' : 'none-live';

            if (i === 0) {
                htmlRow += '<tr class="' + cssClass + ' followInfo_' + rowId + ' ' + liveStatusClass + '">\
                <td rowspan="' + numberChildRow + '"><div class="col120 c">' + followInfo.UserName + '</div></td>\
                <td rowspan="' + numberChildRow + '"><div class="col80 c">' + (followInfo.Source ? "Auto" : "Manual") + '</div></td>\
                <td><div class="col90 c">' + (followBetByLiveStatus.FollowedLive ? "Live" : "Non-Live") + '</div></td>\
                <td rowspan="' + numberChildRow + '" class="td-labelrate col80"><div class="col80 c labelrate">' + followBetByLiveStatus.Rate + '</div></td>\
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
                <td rowspan="' + numberChildRow + '" class="td-labelrate-1x2 col80"><div class="col80 c labelrate-1x2">' + followBetByLiveStatus.Rate1X2 + '</div></td>\
                <td><div class="col80 c"><select class="dropdown-odds-1x2 editablefield" disabled="disabled">' + autoFollowBet.generateDropdownOddsOptions(followBetByLiveStatus.Odds1X2) + '</select></div></td>\
                <td class="c col60">\
                        <div class="c col60"><input class="_1x2status editablefield" type="checkbox" disabled="disabled"' +
                            (followBetByLiveStatus.Followed1X2 ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalf1x2status editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.Followed1St1X2 ? ' checked = "checked"' : '') + '/></div></td>\
                <td rowspan="' + numberChildRow + '" class="td-labelfollower col120"><div class="col120 c labelfollower">' + followInfo.Follower + '</div></td>\
                <td rowspan="' + numberChildRow + '" class="col70 c"><div class="col70 c ' + (followInfo.BaStatus ? "checkStatus" : "") + '"></div></td>\
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
                 <td rowspan="' + numberChildRow + '" class="col50 c"><input type="checkbox" id="chk_' + rowId + '" name="chkDel" onclick="autoFollowBet.bindDeleteCheckbox(this)" /></td>\
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
                <td><div class="col80 c"><select class="dropdown-odds-1x2 editablefield" disabled="disabled">' + autoFollowBet.generateDropdownOddsOptions(followBetByLiveStatus.Odds1X2) + '</select></div></td>\
                <td><div class="c col60"><input class="_1x2status editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.Followed1X2 ? ' checked = "checked"' : '') + '/></div></td>\
                <td class="c col60">\
                            <div class="c col60"><input class="firsthalf1x2status editablefield" type="checkbox" disabled="disabled"' +
                                (followBetByLiveStatus.Followed1St1X2 ? ' checked = "checked"' : '') + '/></div></td>\
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
        autoFollowBet.Tables.checkAll.attr('checked', false);
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
        autoFollowBet.getAutoFollowedBet();
    },

    beginEditFollowInfo: function (rowId) {
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];
        var rowInfo = $(".followInfo_" + rowId);
        rowInfo.find(".editablefield").attr("disabled", null);
        var iconEdit = rowInfo.find('.editicon');
        var iconSave = rowInfo.find('.saveicon');
        var iconUndo = rowInfo.find('.undoicon');
        var iconDel = rowInfo.find('#chk_' + rowId);
        iconEdit.hide();
        iconDel.hide();
        iconSave.show();
        iconUndo.show();

        var rate = rowInfo.find('.labelrate').html();
        rowInfo.find('.td-labelrate').html('<input class="textboxrate txt" maxlength="4" type="text" onkeyup="autoFollowBet.onEditFollowInfo(' + rowId + ');" editor="true"/>');
        rowInfo.find('.textboxrate').val(rate);

        var rate1X2 = rowInfo.find('.labelrate-1x2').html();
        rowInfo.find('.td-labelrate-1x2').html('<input class="textboxrate-1x2 txt" maxlength="4" type="text" onkeyup="autoFollowBet.onEditFollowInfo(' + rowId + ');" editor="true"/>');
        rowInfo.find('.textboxrate-1x2').val(rate1X2);

        var follower = rowInfo.find('.labelfollower').html();
        rowInfo.find('.td-labelfollower').html('<input class="textboxfollower txt" maxlength="50" type="text" onkeyup="autoFollowBet.onEditFollowInfo(' + rowId + ');" editor="true"/>');
        rowInfo.find('.textboxfollower').val(follower);
        // Save the original follower
        autoFollowBet.CachedData.OrgFollowers[rowId] = follower;
    },

    undoEditFollowInfo: function (rowId) {
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];
        var rowInfo = $(".followInfo_" + rowId);

        rowInfo.find(".editicon").show();
        rowInfo.find(".saveicon").hide();
        rowInfo.find(".undoicon").hide();
        rowInfo.find("#chk_" + rowId).show();

        // Rate
        rowInfo.find('.td-labelrate').html('<div class="col80 c labelrate">' + followInfo.AutoFollowBetDetail[0].Rate + '</div>');
        rowInfo.find('.td-labelrate-1x2').html('<div class="col80 c labelrate-1x2">' + followInfo.AutoFollowBetDetail[0].Rate1X2 + '</div>');
        // Follower
        rowInfo.find('.td-labelfollower').html('<div class="col120 c labelfollower">' + followInfo.Follower + '</div>');

        for (var i = 0; i < followInfo.AutoFollowBetDetail.length; i++) {
            var currentFollowByStatus = followInfo.AutoFollowBetDetail[i];
            var curRow;
            if (followInfo.AutoFollowBetDetail[i].FollowedLive) {
                curRow = $(".followInfo_" + rowId + ".live");
            } else {
                curRow = $(".followInfo_" + rowId + ".none-live");
            }

            // HDP
            curRow.find(".dropdown-odds").val(currentFollowByStatus.Odds);
            curRow.find(".hdpstatus").attr("checked", currentFollowByStatus.FollowedHandicap ? "checked" : null);
            curRow.find(".firsthalfhdpstatus").attr("checked", currentFollowByStatus.FollowedFirstHalfHandicap ? "checked" : null);
            curRow.find(".overunderstatus").attr("checked", currentFollowByStatus.FollowedOverUnder ? "checked" : null);
            curRow.find(".firsthalfoverunderstatus").attr("checked", currentFollowByStatus.FollowedFirstHalfOverUnder ? "checked" : null);
            // 1X2
            curRow.find(".dropdown-odds-1x2").val(currentFollowByStatus.Odds1X2);
            curRow.find("._1x2status").attr("checked", currentFollowByStatus.Followed1X2 ? "checked" : null);
            curRow.find(".firsthalf1x2status").attr("checked", currentFollowByStatus.Followed1St1X2 ? "checked" : null);
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
        var updateFollowEnums = autoFollowBet.updateFollowEnums;
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];

        var rowInfo = $(".followInfo_" + rowId);
        var follower = rowInfo.find(".textboxfollower").val();

        // HDP
        var rate = rowInfo.find(".textboxrate").val();
        var nonLiveOdds = updateFollowEnums.notUpdate;
        var liveOdds = updateFollowEnums.notUpdate;
        var followedLiveHdp = updateFollowEnums.notUpdate;
        var followedNonLiveHdp = updateFollowEnums.notUpdate;
        var followedLive1StHdp = updateFollowEnums.notUpdate;
        var followedNonLive1StHdp = updateFollowEnums.notUpdate;
        var followedLiveOverUnder = updateFollowEnums.notUpdate;
        var followedNonLiveOverUnder = updateFollowEnums.notUpdate;
        var followedLive1StOverUnder = updateFollowEnums.notUpdate;
        var followedNonLive1StOverUnder = updateFollowEnums.notUpdate;
        var numberStatusFollow = followInfo.AutoFollowBetDetail.length;
        // 1X2
        var rate1X2 = rowInfo.find(".textboxrate-1x2").val();
        var liveOdds1X2 = updateFollowEnums.notUpdate;
        var nonLiveOdds1X2 = updateFollowEnums.notUpdate;
        var followedLive1X2 = updateFollowEnums.notUpdate;
        var followedNonLive1X2 = updateFollowEnums.notUpdate;
        var followedLive1St1X2 = updateFollowEnums.notUpdate;
        var followedNonLive1St1X2 = updateFollowEnums.notUpdate;

        if (numberStatusFollow === 2) {
            liveRow = $(".followInfo_" + rowId + ".live");
            noneLiveRow = $(".followInfo_" + rowId + ".none-live");
            // HDP
            liveOdds = liveRow.find(".dropdown-odds").val();
            nonLiveOdds = noneLiveRow.find('.dropdown-odds').val();
            followedLiveHdp = liveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLiveHdp = noneLiveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLive1StHdp = liveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLive1StHdp = noneLiveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLiveOverUnder = liveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLiveOverUnder = noneLiveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLive1StOverUnder = liveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLive1StOverUnder = noneLiveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            // 1X2
            liveOdds1X2 = liveRow.find(".dropdown-odds-1x2").val();
            nonLiveOdds1X2 = noneLiveRow.find(".dropdown-odds-1x2").val();
            followedLive1X2 = liveRow.find("._1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLive1X2 = noneLiveRow.find("._1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedLive1St1X2 = liveRow.find(".firsthalf1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            followedNonLive1St1X2 = noneLiveRow.find(".firsthalf1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
        }
        else {
            if (followInfo.AutoFollowBetDetail[0].FollowedLive) {
                liveRow = $(".followInfo_" + rowId + ".live");
                liveOdds = liveRow.find('.dropdown-odds').val();
                followedLiveHdp = liveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLive1StHdp = liveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLiveOverUnder = liveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLive1StOverUnder = liveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                // 1X2
                liveOdds1X2 = liveRow.find(".dropdown-odds-1x2").val();
                followedLive1X2 = liveRow.find("._1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedLive1St1X2 = liveRow.find(".firsthalf1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            } else {
                noneLiveRow = $(".followInfo_" + rowId + ".none-live");
                nonLiveOdds = noneLiveRow.find('.dropdown-odds').val();
                followedNonLiveHdp = noneLiveRow.find('.hdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNonLive1StHdp = noneLiveRow.find('.firsthalfhdpstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNonLiveOverUnder = noneLiveRow.find('.overunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNonLive1StOverUnder = noneLiveRow.find('.firsthalfoverunderstatus').attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                // 1X2
                nonLiveOdds1X2 = noneLiveRow.find(".dropdown-odds-1x2").val();
                followedNonLive1X2 = noneLiveRow.find("._1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
                followedNonLive1St1X2 = noneLiveRow.find(".firsthalf1x2status").attr("checked") ? updateFollowEnums.follow : updateFollowEnums.notFollow;
            }
        }

        return {
            RowId: rowId,
            Username: followInfo.UserName,
            Follower: follower,
            OrgFollower: autoFollowBet.CachedData.OrgFollowers[rowId],
            // HDP
            Rate: rate,
            LiveOdds: liveOdds,
            NonLiveOdds: nonLiveOdds,
            FollowedLiveHdp: followedLiveHdp,
            FollowedNonLiveHdp: followedNonLiveHdp,
            FollowedLive1StHdp: followedLive1StHdp,
            FollowedNonLive1StHdp: followedNonLive1StHdp,
            FollowedLiveOverUnder: followedLiveOverUnder,
            FollowedNonLiveOverUnder: followedNonLiveOverUnder,
            FollowedLive1StOverUnder: followedLive1StOverUnder,
            FollowedNonLive1StOverUnder: followedNonLive1StOverUnder,
            // 1X2
            Rate1X2: rate1X2,
            LiveOdds1X2: liveOdds1X2,
            NonLiveOdds1X2: nonLiveOdds1X2,
            FollowedLive1X2: followedLive1X2,
            FollowedNonLive1X2: followedNonLive1X2,
            FollowedLive1St1X2: followedLive1St1X2,
            FollowedNonLive1St1X2: followedNonLive1St1X2
        };
    },

    // TODO: validateAddInfoParams possible duplicate code
    validateUpdateInfoParams: function (postParams) {
        var rowInfo = $(".followInfo_" + postParams.RowId);

        if (postParams.Rate === "" || postParams.Rate1X2 === "") {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Empty, sharedScriptManager.Enums.MessageType.Error);
            if (postParams.Rate === "") {
                rowInfo.find('.textboxrate').focus();
                return false;
            }
            rowInfo.find('.textboxrate-1x2').focus();
            return false;
        }

        if (!$.isNumeric(postParams.Rate) || !$.isNumeric(postParams.Rate1X2)) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Number, sharedScriptManager.Enums.MessageType.Error);
            if (!$.isNumeric(postParams.Rate)) {
                rowInfo.find('.textboxrate').focus();
                return false;
            }
            rowInfo.find('.textboxrate-1x2').focus();
            return false;
        }

        var rate = parseFloat(postParams.Rate);
        var rate1X2 = parseFloat(postParams.Rate1X2);
        if (rate < viewResources.minRate || viewResources.maxRate < rate || rate1X2 < viewResources.minRate || viewResources.maxRate < rate1X2) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Range, sharedScriptManager.Enums.MessageType.Error);
            if (rate < viewResources.minRate || viewResources.maxRate < rate) {
                rowInfo.find('.textboxrate').focus();
                return false;
            }
            rowInfo.find('.textboxrate-1x2').focus();
            return false;
        }

        if (parseFloat(rate.toFixed(2)) !== rate || parseFloat(rate1X2.toFixed(2)) !== rate1X2) {
            sharedScriptManager.showMessage("errormessage", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_DecimalDigit, sharedScriptManager.Enums.MessageType.Error);
            if (parseFloat(rate.toFixed(2)) !== rate) {
                rowInfo.find('.textboxrate').focus();
                return false;
            }
            rowInfo.find('.textboxrate-1x2').focus();
            return false;
        }

        if ($.trim(postParams.Follower) === '') {
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

        if (parseInt(result.Code) !== 0) {
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

        rowInfo.find('.editicon').show();
        rowInfo.find('.saveicon').hide();
        rowInfo.find('.undoicon').hide();
        rowInfo.find('#chk_' + rowId).show();

        rowInfo.find('.td-labelrate').html('<div class="col80 c labelrate">' + autoFollowBet.CachedData.updateInfoParams.Rate + '</div>');
        rowInfo.find('.td-labelrate-1x2').html('<div class="col80 c labelrate-1x2">' + autoFollowBet.CachedData.updateInfoParams.Rate1X2 + '</div>');

        rowInfo.find('.td-labelfollower').html('<div class="col120 c labelfollower">' + autoFollowBet.CachedData.updateInfoParams.Follower + '</div>');

        rowInfo.find(".editablefield").attr("disabled", "disabled");

        // Update cache AutoFollowBetDetail
        var arrFollowBetDetails = autoFollowBet.CachedData.FollowedCustomerList[rowId].AutoFollowBetDetail;
        var updateInfoParams = autoFollowBet.CachedData.updateInfoParams;
        var followInfo = autoFollowBet.CachedData.FollowedCustomerList[rowId];

        // Follower
        autoFollowBet.CachedData.FollowedCustomerList[rowId].Follower = updateInfoParams.Follower;

        if (followInfo.AutoFollowBetDetail.length === 2) {
            // NonLive
            arrFollowBetDetails[0].Rate = updateInfoParams.Rate;
            arrFollowBetDetails[0].Odds = updateInfoParams.NonLiveOdds;
            arrFollowBetDetails[0].FollowedHandicap = updateInfoParams.FollowedNonLiveHdp;
            arrFollowBetDetails[0].FollowedFirstHalfHandicap = updateInfoParams.FollowedNonLive1StHdp;
            arrFollowBetDetails[0].FollowedOverUnder = updateInfoParams.FollowedNonLiveOverUnder;
            arrFollowBetDetails[0].FollowedFirstHalfOverUnder = updateInfoParams.FollowedNonLive1StOverUnder;
            arrFollowBetDetails[0].Rate1X2 = updateInfoParams.Rate1X2;
            arrFollowBetDetails[0].Odds1X2 = updateInfoParams.NonLiveOdds1X2;
            arrFollowBetDetails[0].Followed1X2 = updateInfoParams.FollowedNonLive1X2;
            arrFollowBetDetails[0].Followed1St1X2 = updateInfoParams.FollowedNonLive1St1X2;
            // Live
            arrFollowBetDetails[1].Rate = updateInfoParams.Rate;
            arrFollowBetDetails[1].Odds = updateInfoParams.LiveOdds;
            arrFollowBetDetails[1].FollowedHandicap = updateInfoParams.FollowedLiveHdp;
            arrFollowBetDetails[1].FollowedFirstHalfHandicap = updateInfoParams.FollowedLive1StHdp;
            arrFollowBetDetails[1].FollowedOverUnder = updateInfoParams.FollowedLiveOverUnder;
            arrFollowBetDetails[1].FollowedFirstHalfOverUnder = updateInfoParams.FollowedLive1StOverUnder;
            arrFollowBetDetails[1].Rate1X2 = updateInfoParams.Rate1X2;
            arrFollowBetDetails[1].Odds1X2 = updateInfoParams.LiveOdds1X2;
            arrFollowBetDetails[1].Followed1X2 = updateInfoParams.FollowedLive1X2;
            arrFollowBetDetails[1].Followed1St1X2 = updateInfoParams.FollowedLive1St1X2;
        } else {
            if (followInfo.AutoFollowBetDetail[0].FollowedLive) {
                arrFollowBetDetails[0].Rate = updateInfoParams.Rate;
                arrFollowBetDetails[0].Odds = updateInfoParams.LiveOdds;
                arrFollowBetDetails[0].FollowedHandicap = updateInfoParams.FollowedLiveHdp;
                arrFollowBetDetails[0].FollowedFirstHalfHandicap = updateInfoParams.FollowedLive1StHdp;
                arrFollowBetDetails[0].FollowedOverUnder = updateInfoParams.FollowedLiveOverUnder;
                arrFollowBetDetails[0].FollowedFirstHalfOverUnder = updateInfoParams.FollowedLive1StOverUnder;
                arrFollowBetDetails[0].Rate1X2 = updateInfoParams.Rate1X2;
                arrFollowBetDetails[0].Odds1X2 = updateInfoParams.LiveOdds1X2;
                arrFollowBetDetails[0].Followed1X2 = updateInfoParams.FollowedLive1X2;
                arrFollowBetDetails[0].Followed1St1X2 = updateInfoParams.FollowedLive1St1X2;
            } else {
                arrFollowBetDetails[0].Rate = updateInfoParams.Rate;
                arrFollowBetDetails[0].Odds = updateInfoParams.NonLiveOdds;
                arrFollowBetDetails[0].FollowedHandicap = updateInfoParams.FollowedNonLiveHdp;
                arrFollowBetDetails[0].FollowedFirstHalfHandicap = updateInfoParams.FollowedNonLive1StHdp;
                arrFollowBetDetails[0].FollowedOverUnder = updateInfoParams.FollowedNonLiveOverUnder;
                arrFollowBetDetails[0].FollowedFirstHalfOverUnder = updateInfoParams.FollowedNonLive1StOverUnder;
                arrFollowBetDetails[0].Rate1X2 = updateInfoParams.Rate1X2;
                arrFollowBetDetails[0].Odds1X2 = updateInfoParams.NonLiveOdds1X2;
                arrFollowBetDetails[0].Followed1X2 = updateInfoParams.FollowedNonLive1X2;
                arrFollowBetDetails[0].Followed1St1X2 = updateInfoParams.FollowedNonLive1St1X2;
            }
        }
    },

    onEditFollowInfo: function (rowId) {
        //        var rowInfo = $(".followInfo_" + rowId);
        //        var rate = rowInfo.find(".textboxrate").val();
    },

    deleteFollowInfo: function (rowId) {
        autoFollowBet.blockUI();

        var isDelete = confirm(viewResources.Warning_Admin_AutoFollowBetManagement_DeleteFollowInfo);
        if (!isDelete) {
            autoFollowBet.unblockUI();
            return;
        }

        var username = autoFollowBet.CachedData.FollowedCustomerList[rowId].UserName;
        // Get cur follower, not in cache
        var rowInfo = $(".followInfo_" + rowId);
        var follower = rowInfo.find('.labelfollower').html();

        var postParams = {
            Username: username,
            Follower: follower
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
    deleteFollowInfoMult: function () {
        autoFollowBet.blockUI();

        var isDelete = confirm(viewResources.Warning_Admin_AutoFollowBetManagement_DeleteFollowInfo);
        if (!isDelete) {
            autoFollowBet.unblockUI();
            return;
        }

        var rowIds = [];
        var followInfos = '';
        var checkboxes = $('.tbl-body-scroll').find('input[name=chkDel]');
        var followers = $('.tbl-body-scroll').find('.labelfollower');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var username = autoFollowBet.CachedData.FollowedCustomerList[i].UserName;
                // Get cur follower, not in cache
                var follower = $(followers[i]).html();
                followInfos += username + "," + follower + ";";
                rowIds.push(i);
            }
        };

        autoFollowBet.CachedData.deleteInfoParams = {
            UserFollowerPairs: followInfos.substring(0, followInfos.length - 1),
            RowIds: rowIds
        };

        var postParams = {
            UserFollowerPairs: followInfos.substring(0, followInfos.length - 1)
        };

        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/DeleteAutoFollowedBetCustomers",
            postParams,
            autoFollowBet.renderDeleteFollowInfoResultMult,
            autoFollowBet.renderDeleteFollowInfoResultMult,
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

        autoFollowBet.getAutoFollowedBet();
        sharedScriptManager.showMessage("errormessage", viewResources.Success_Admin_AutoFollowBetManagement_DeleteFollowInfo, sharedScriptManager.Enums.MessageType.Success);

        var t = setTimeout(function () {
            sharedScriptManager.hideMessage("errormessage");
        }, 3000);
    },
    renderDeleteFollowInfoResultMult: function (rs) {
        var rowIds = autoFollowBet.CachedData.deleteInfoParams.RowIds;
        if (rs == null) {
            sharedScriptManager.showMessage("errormessage", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        var successAll = true;
        var strMessage = '';
        var deletedItems = 0;

        for (var k = 0; k < rs.length; k++) {
            var code = rs[k].Code;
            var message = rs[k].Message;

            var username = autoFollowBet.CachedData.FollowedCustomerList[rowIds[k]].UserName;

            if (code != 0) {
                successAll = false;
                strMessage += message + '<br />';
            }
            else {
                strMessage += '<font style="color: #4f7307">Deleted \'' + username + '\' successfully</font><br />';
                ++deletedItems;
            }
        }

        if (deletedItems > 0 || rs.Code == 0)
            autoFollowBet.getAutoFollowedBet();

        if (successAll) {
            sharedScriptManager.showMessage("errormessage", viewResources.Success_Admin_AutoFollowBetManagement_DeleteFollowInfo, sharedScriptManager.Enums.MessageType.Success);
        }
        else {
            sharedScriptManager.showMessage("errormessage", strMessage, sharedScriptManager.Enums.MessageType.Error);
        }

        var t = setTimeout(function () {
            if (successAll)
                sharedScriptManager.hideMessage("errormessage");
        }, 3000);
    },

    ShowAddNewFollowedCustomerDialog: function () {
        // Reset form data
        autoFollowBet.Tables.resultMessage_AddDialog.addClass("display-none");
        autoFollowBet.Tables.textboxUsername_AddDialog.val("");
        autoFollowBet.Tables.textboxFollower_AddDialog.val(autoFollowBet.CachedData.defaultFollowerName);
        // Rates
        autoFollowBet.Tables.rates_AddDialog.val("");
        // Odds
        autoFollowBet.Tables.ddlOdds_AddDialog.val("0");
        // Checkboxes
        autoFollowBet.Tables.chkBox_AddDialog.prop("checked", true);

        autoFollowBet.Tables.addNewFollowedCustomerDialog.removeClass("display-none").dialog("open");
        $("#dropdown-live-odds-adddialog").val("0");
        $("#dropdown-nonelive-odds-adddialog").val("0");
        $('#custList').html('');

        var dialog = $(".ui-dialog");
        dialog.css({
            left: ($(window).width() - dialog.width()) / 2,
            top: ($(window).height() - dialog.height()) / 2
        });
    },

    insertNewFollowedCustomer: function () {
        if (autoFollowBet.Tables.username.val() === "") {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_Username_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.username.focus();

            return;
        }

        var users = $(".cust");
        for (var i = 0; i < users.length; i++) {
            if (users[i].children.length > 0) {
                if (autoFollowBet.Tables.username.val() == users[i].children[0].title) {
                    sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.AlreadyAdded, sharedScriptManager.Enums.MessageType.Error);
                    autoFollowBet.Tables.username.focus();

                    return;
                }
            }
        }

        sharedScriptManager.hideMessage("resultmessage-adddialog");
        var user = autoFollowBet.Tables.username.val();
        var postParams = {
            Username: user
        };

        autoFollowBet.blockUI();
        autoFollowBet.callAjax(this,
            window.rootUrl + "AutoFollowBet/CheckAutoFollowedBetCustomer",
            postParams,
            autoFollowBet.renderCheckUsername,
            autoFollowBet.renderCheckUsername,
            autoFollowBet.unblockUI,
            true);
    },

    renderCheckUsername: function (rs) {
        if (rs == null) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        if (rs.Code != 0) {
            sharedScriptManager.showMessage("resultmessage-adddialog", rs.Message, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        var user = autoFollowBet.Tables.username.val();
        var subUser = user.length >= 20 ? (user.substring(0, 17) + '...') : user;
        var customer = '<div class="cust" ondblclick="autoFollowBet.removeNewFollowedCustomer(this.children[1])"><div class="cust-info" title="' + user + '">' + subUser +
            '</div><div class="cust-info-del" onclick="autoFollowBet.removeNewFollowedCustomer(this)" title="Remove">&nbsp;</div></div><div style="clear: both"></div>';
        $(autoFollowBet.Tables.userList).append(customer);
        autoFollowBet.Tables.username.val('');
        autoFollowBet.Tables.username.focus();
    },

    // Add dialog: remove new followed customer
    removeNewFollowedCustomer: function (div) {
        $(div).parent().remove();
    },

    // Add dialog: Submit
    addNewFollowedCustomer: function () {
        autoFollowBet.blockUI();
        var postParams = autoFollowBet.getAddInfoParams();
        if (!autoFollowBet.validateAddInfoParams(postParams)) {
            autoFollowBet.unblockUI();
            return;
        }

        autoFollowBet.callAjax(
            this,
            window.rootUrl + "AutoFollowBet/AddAutoFollowedBetCustomers",
            postParams,
            autoFollowBet.renderAddFollowInfoResult,
            autoFollowBet.renderAddFollowInfoResult,
            autoFollowBet.unblockUI,
            true);
    },

    getAddInfoParams: function () {
        var followTypeEnums = autoFollowBet.followTypeEnums;
        var users = $('.cust');
        var isMult = users.length > 0;
        var usernames = '';

        if (isMult) {
            usernames = '';
            var len = users.length;
            for (var i = 0; i < len; i++) {
                usernames += users[i].children[0].title + ',';
            }

            usernames = usernames.substring(0, usernames.length - 1);
        }

        return {
            Usernames: usernames,
            Follower: autoFollowBet.Tables.textboxFollower_AddDialog.val(),

            // Hdp
            Rate: autoFollowBet.Tables.textboxRate_AddDialog.val(),

            NonLiveOdds: autoFollowBet.Tables.dropdownAddNoneLiveOdds.val(),
            NonLiveHdp: autoFollowBet.Tables.noneLiveHdpStatus_AddDialog.attr("checked") ? true : false,
            NonLive1StHdp: autoFollowBet.Tables.noneLive1stHDPStatus_AddDialog.attr("checked") ? true : false,
            NonLiveOverUnder: autoFollowBet.Tables.noneLiveOverUnderStatus_AddDialog.attr("checked") ? true : false,
            NonLive1StOverUnder: autoFollowBet.Tables.noneLive1stOverUnderStatus_AddDialog.attr("checked") ? true : false,

            LiveOdds: autoFollowBet.Tables.dropdownAddLiveOdds.val(),
            LiveHdp: autoFollowBet.Tables.liveHdpStatus_AddDialog.attr("checked") ? true : false,
            Live1StHdp: autoFollowBet.Tables.live1stHDPStatus_AddDialog.attr("checked") ? true : false,
            LiveOverUnder: autoFollowBet.Tables.liveOverUnderStatus_AddDialog.attr("checked") ? true : false,
            Live1StOverUnder: autoFollowBet.Tables.live1stOverUnderStatus_AddDialog.attr("checked") ? true : false,

            // 1x2
            Rate1X2: autoFollowBet.Tables.textboxRate1x2_AddDialog.val(),

            NonLiveOdds1X2: autoFollowBet.Tables.dropdownAddNoneLiveOdds1x2.val(),
            NonLive1X2: autoFollowBet.Tables.nonLive1x2Status_AddDialog.attr("checked") ? true : false,
            NonLive1St1X2: autoFollowBet.Tables.nonLive1st1x2Status_AddDialog.attr("checked") ? true : false,

            LiveOdds1X2: autoFollowBet.Tables.dropdownAddLiveOdds1x2.val(),
            Live1X2: autoFollowBet.Tables.live1x2Status_AddDialog.attr("checked") ? true : false,
            Live1St1X2: autoFollowBet.Tables.live1st1x2Status_AddDialog.attr("checked") ? true : false
        };
    },

    // Add dialog: validate add info params
    validateAddInfoParams: function (postParams) {
        if (postParams.Usernames === '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_Username_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxUsername_AddDialog.focus();
            return false;
        }

        if (postParams.Follower === '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidFollower_Empty, sharedScriptManager.Enums.MessageType.Error);
            autoFollowBet.Tables.textboxFollower_AddDialog.focus();
            return false;
        }

        // Rate contraints
        // Required
        if (postParams.Rate === '' || postParams.Rate1X2 === '') {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Empty, sharedScriptManager.Enums.MessageType.Error);
            if (postParams.Rate === '') {
                autoFollowBet.Tables.textboxRate_AddDialog.focus();
                return false;
            }
            autoFollowBet.Tables.textboxRate1x2_AddDialog.focus();
            return false;
        }
        // Numeric
        if (!$.isNumeric(postParams.Rate) || !$.isNumeric(postParams.Rate1X2)) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Number, sharedScriptManager.Enums.MessageType.Error);
            if ($.isNumeric(postParams.Rate)) {
                autoFollowBet.Tables.textboxRate_AddDialog.focus();
                return false;
            }
            autoFollowBet.Tables.textboxRate1x2_AddDialog.focus();
            return false;
        }
        // Range
        var rate = parseFloat(postParams.Rate);
        var rate1X2 = parseFloat(postParams.Rate1X2);
        if (rate < viewResources.minRate || viewResources.maxRate < rate || rate1X2 < viewResources.minRate || viewResources.maxRate < rate1X2) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_Range, sharedScriptManager.Enums.MessageType.Error);
            if (rate < viewResources.minRate || viewResources.maxRate < rate) {
                autoFollowBet.Tables.textboxRate_AddDialog.focus();
                return false;
            }
            autoFollowBet.Tables.textboxRate1x2_AddDialog.focus();
            return false;
        }
        // Two decimals
        if (parseFloat(rate.toFixed(2)) !== rate || parseFloat(rate1X2.toFixed(2)) !== rate1X2) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Error_Admin_AutoFollowBetManagement_InvalidRate_DecimalDigit, sharedScriptManager.Enums.MessageType.Error);
            if (parseFloat(rate.toFixed(2)) !== rate) {
                autoFollowBet.Tables.textboxRate_AddDialog.focus();
                return false;
            }
            autoFollowBet.Tables.textboxRate1x2_AddDialog.focus();
            return false;
        }

        sharedScriptManager.hideMessage("resultmessage-adddialog");
        return true;
    },

    renderAddFollowInfoResult: function (rs) {
        var maxMessageWidth = 367;
        var addedItems = 0;
        var successAll = true;
        if (rs == null) {
            sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.NoPermission, sharedScriptManager.Enums.MessageType.Error);
            return;
        }

        if (rs.length > 0) {
            var message = '';
            var users = $('.cust');

            for (var i = 0; i < rs.length; i++) {
                if (rs[i].Code != 0) {
                    successAll = false;
                    message += rs[i].Message + '<br />';
                }
                else {
                    ++addedItems;
                    message += '<font style="color: #4f7307">Added \'' + users[i].children[0].title + '\' successfully</font><br />';
                }
            }

            if (successAll) {
                sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Success_Admin_AutoFollowBetManagement_AddFollowInfo, sharedScriptManager.Enums.MessageType.Success);
                var t = setTimeout(function () {
                    sharedScriptManager.hideMessage("resultmessage-adddialog");
                }, 3000);
            }
            else {
                sharedScriptManager.showMessage("resultmessage-adddialog", message, sharedScriptManager.Enums.MessageType.Error);
            }
        }
        else {
            if (parseInt(rs.Code) != 0) {
                sharedScriptManager.showMessage("resultmessage-adddialog", rs.Message, sharedScriptManager.Enums.MessageType.Error);
            }
            else {
                ++addedItems;
                sharedScriptManager.showMessage("resultmessage-adddialog", viewResources.Success_Admin_AutoFollowBetManagement_AddFollowInfo, sharedScriptManager.Enums.MessageType.Success);
                var t = setTimeout(function () {
                    sharedScriptManager.hideMessage("resultmessage-adddialog");
                }, 3000);
            }
        }

        if (addedItems > 0)
            $('#custList').html('');

        if (addedItems > 0)
            autoFollowBet.getAutoFollowedBet();
    },

    // Helpper functions
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

    callAjax: function (reportHandler, url, requestParams, successFunction, errorFunction, completeFunction, isKeepingMessage) {
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
    }
};
