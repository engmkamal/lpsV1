(app.controller("SanctionHistoryCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
    //Sanction Functions

    $scope.PageTitle = "Sanction History";
    $scope.cPRBankersInformation = {
        id: '',
        cPRClientProfileId: '',
        previousBankersName: '',
        presentBankersName: '',
        active: true
    };
    $scope.listCPRLiabilitySanctionHistory = [];
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    //$scope.statusMatched = false;
    $scope.cprLiabilitySanctionHistory = {
        id: '',
        cPRClientProfileId: '',
        sactionHistory: '',
        facilityType: '',
        amount: 0,
        date: '',
        authority: '',
        expiry: '',
        sanctionType: '',
        remarks: '',
        boardMeetingNo: 0,
        boardMeetingDate: '',
        sanctionReferenceNo: '',
        active: true
    };
    $scope.listCPRLiabilitySanctionHistory = [];
    $scope.AddLiabilitiesSectionHistory_ClickEvent = function () {
        try {
            $scope.listCPRLiabilitySanctionHistory = $scope.listCPRLiabilitySanctionHistory || [];
            $scope.cprLiabilitySanctionHistory.cPRClientProfileId = $scope.borrowerprofile.id;
            if ($scope.cprLiabilitySanctionHistory.amount != 0)
                $scope.listCPRLiabilitySanctionHistory.push($scope.cprLiabilitySanctionHistory);
            else {
                dialogService.ConfirmDialogWithOkay('', "Amount should not be 0");  
            }
            //var cprId = GetUrlParameters();
            //SaveCPRLiabilitySanctionHistory($scope.cprLiabilitySanctionHistory, cprId);
            //SaveCPRBankersInformation($scope.cPRBankersInformation, cprId);
            $scope.ResetLiabilitiesSectionHistory();
            //$scope.sanctionHistoryForm1.$setUntouched();
            //$scope.sanctionHistoryForm1.$setPristine();
        }
        catch (ex) {
            alert("Exception in AddLiabilitiesSectionHistory_ClickEvent " + ex);
        }
    }
    $scope.SaveSanctionHistoryForm_Click_Event = function () {
        try {
            var cprId = GetUrlParameters();
            if ($scope.listCPRLiabilitySanctionHistory.length > 0) {
                SaveCPRLiabilitySanctionHistory($scope.listCPRLiabilitySanctionHistory, cprId);
            }
            if (!(angular.isUndefined($scope.cPRBankersInformation.previousBankersName) || $scope.cPRBankersInformation.previousBankersName === null) && 
                !(angular.isUndefined($scope.cPRBankersInformation.presentBankersName) || $scope.cPRBankersInformation.presentBankersName === null)) {
                $scope.cPRBankersInformation.cPRClientProfileId = $scope.borrowerprofile.id;
                SaveCPRBankersInformation($scope.cPRBankersInformation, cprId);
            }
        }
        catch (ex) {
            alert("Exception in SaveSanctionHistoryForm_Click_Event " + ex);
        }
    }
    $scope.ResetLiabilitiesSectionHistory = function () {
        try {
            $scope.cprLiabilitySanctionHistory = {
                id: '',
                cPRClientProfileId: '',
                sactionHistory: '',
                facilityType: '',
                amount: 0,
                date: '',
                authority: '',
                expiry: '',
                sanctionType: '',
                remarks: '',
                boardMeetingNo: 0,
                boardMeetingDate: '',
                sanctionReferenceNo: '',
                active: true
            };
            //$scope.sanctionHistoryForm1.$setUntouched();
            //$scope.sanctionHistoryForm1.$setPristine();
        }
        catch (ex) {
            alert("Exception in ResetLiabilitiesSectionHistory " + ex);
        }
    }
    Page_Load();
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId == null) {

                //GetCurrentUser();
                // GetCurrentUserBranch();
            } else {
                GetAllSanctionHistoryByCPRId(cprId);
                GetCPRBankersInformation(cprId);
            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }
    $scope.EditLiabilitySanctionHistoryList = function (x) {
        try {
            if ($scope.cprLiabilitySanctionHistory == null)
                $scope.cprLiabilitySanctionHistory = {};

            $scope.cprLiabilitySanctionHistory = x;

            var index = $scope.listCPRLiabilitySanctionHistory.indexOf(x);
            $scope.listCPRLiabilitySanctionHistory.splice(index, 1);

        } catch (e) {
            alert("Exception EditLiabilitySanctionHistoryList " + e);
        }
    };
    $scope.RemoveItemFromGridList = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null || item.id == "" || item.id == '')
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromGridList" + e);
        }
    };
    function GetAllSanctionHistoryByCPRId(cpr) {
        try {
            $http({
                url: "/CPRV2/GetAllSanctionHistoryByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr, clientProfileId: $scope.borrowerprofile.id  }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCPRLiabilitySanctionHistory = response.data.output;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRByCIF: " + e);
            common.LoderHide();
        }
    }
    function SaveCPRLiabilitySanctionHistory(listcPRLiabilitySanctionHistory, cpr) {
        try {
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCPRLiabilitySanctionHistory",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { listcPRLiabilitySanctionHistory: listcPRLiabilitySanctionHistory, cprId: cpr}
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        GetAllSanctionHistoryByCPRId(cpr);
                        common.preprocesshide();
                    } else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                        var cprId = GetUrlParameters();
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    });
                }
            }, function errorCallback(response) {
                common.preprocesshide();
               
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveCPRLiabilitySanctionHistory: " + e);
            common.LoderHide();
            
           // alert('AutoDraftCPR ' + e);
        }
    }
    function SaveCPRBankersInformation(cPRBankersInformation, cpr) {
        try {
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCPRBankersInformation",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cPRBankersInformationModel: cPRBankersInformation, cprId: cpr }
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        //dialogService.ConfirmDialogWithOkay('', response.data.message);
                        GetCPRBankersInformation(cpr);
                        common.preprocesshide();
                    } else {
                        common.preprocesshide();
                        //dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                    });
                }
            }, function errorCallback(response) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                    });

            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveCPRLiabilitySanctionHistory: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    }
    function GetCPRBankersInformation(cpr) {
        try {
            $http({
                url: "/CPRV2/GetCPRBankersInformation",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr, clientProfileId: $scope.borrowerprofile.id}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRBankersInformation = response.data.output;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });
        } catch (e) {
            alert("Exception GetAllCPRByCIF: " + e);
            common.LoderHide();
        }
    }
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
}));