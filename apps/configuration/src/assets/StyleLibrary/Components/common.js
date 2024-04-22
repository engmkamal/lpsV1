"use strict";

var common = {};

common.connectivityUrl = "http://localhost:12678";
common.cprRedirectUrl = "/CPR/Initiation?cprno=@cprno";
common.adminRedirectUrl = "/Master/Admin?SPHostUrl=";
common.LoadCount = 0;
common.cprInitiationType = "New";
common.nid = null;
common.GetParameterByName = function (name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2]);
}

common.RemoveItemFromList = function (list, item, isdelete) {
    try {
        if (isdelete) {
            if (confirm("Are you sure you want to delete ?") == true) {
                var index = list.indexOf(item);
                return list.splice(index, 1);
            }
        } else {
            var index = list.indexOf(item);
            return list.splice(index, 1);
        }

    }
    catch (e) {
        alert("common.RemoveItemFromList " + e);
    }
}

common.homeRefirectUrl = function () {

    window.location.href = "/Home/Index";
}

common.RedirectHome = function () {

    window.location.href = "/Home/RedirectHome";
}
 
common.SetActiveFalseForRemovedItem = function (list, item) {
    try {
        if (list != null && item != null) {
            if (confirm("Are you sure you want to delete ?") == true) {
                var i = list.indexOf(item);
                item.active = false;
                list[i] = item;
                return true;
            } else
                return false;
        }
        else
            return false;

    } catch (e) {
        alert("SetActiveFalseRemovedItem: " + e);
    }
};
common.pageloadhide = function () {
    $("#loading-1").fadeOut(2000);
}
common.LoderHide = function () {
    $("#loading").addClass("hide-wrap");
    Pace.stop();
    

    // approval workflow
    $('.breadcrumb a span.stat-icon').each(function () {
        if ($(this).text() == 'Completed') {
            $(this).css("background-color", "#82be71");
        };
        if ($(this).text() == 'Pending') {
            $(this).addClass("stat-ani");
        };
        if ($(this).text() != 'Completed' && $(this).text() != 'Pending') {
            $(this).css("background-color", "#94bfce");
        };
    });

    
};

Pace.on("start", function () {
    $("div.paceDiv").show();
});
Pace.on("done", function () {
    $("div.paceDiv").fadeOut();
});

//common.progressbarstart = function () {
//    Pace.options = { ajax: false };
//    Pace.start();
//};
//common.progressbarstop = function () {
//    Pace.options = { ajax: false };
//    Pace.stop();
//};

common.preprocessload = function () { 
    $(".pre-process").removeClass("hide");
    $(".pre-process").addClass("show");
}

common.preprocesshide = function () {
    $(".pre-process").removeClass("show");
    $(".pre-process").addClass("hide");
}

common.PadLeft = function (nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

common.GetArrayIndexByValue = function (arr, attr, value) {
    try {
        if (attr !== null) {
            for (var i = 0; i < arr.length; i++)
                if (arr[i][attr] === value)
                    return i;
            return -1;
        } else {
            for (var i = 0; i < arr.length; i++)
                if (arr[i] === value)
                    return i;
            return -1;
        }

    } catch (e) {
        alert("GetArrayIndexByValue: " + e);
    }
};

///Approval Enable
common.isWFEnabled = false;
common.isEditable = true;
common.initiator = null;
common.presentInitiator = null;
//CBS Integration
common.isCBSIntegrationEnabled = false;
common.sPSite = "https://techoneglobalorg.sharepoint.com/sites/LOSBasicBankBD";



common.sPSite = "https://techoneglobalorg.sharepoint.com/sites/dFlow/";
common.BranchTitleDisplay = "Office";

// For Sanction Approval
common.globalTemplateId = null;
common.borrowerprofile = {
    id: ''
};
common.totaltax = 0;



