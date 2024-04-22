(app.controller("DisbursmentRequestSummaryCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.BranchTitleDisplay = 'Office';
    $scope.sanctionRequestList = null;
    $scope.disbursementRequestBranchList = null;
    $scope.cprOfficeSummary = null;
    $scope.allRequestList = [];
    $scope.draftList = [];
    $scope.inProgressList = [];
    $scope.rejectedList = [];
    $scope.completedList = [];
    $scope.inProgressForBranchList = [];
    $scope.formatIndex = 1;
    $scope.formatIndexOffice = 1;
    $scope.formatNavIndex = 30;
    //$scope.changeRequestRedirectUrl = "/CPRSanction/Initiation?cprno=@cprno&SPHostUrl=";
    //$scope.RequestCount = {};

    function Page_Load() {
        try {

            GetAllDisbursmentRequesByCurrentUser();
           // GetAllSanctionRequestByUserBranch();
            GetAllDisbursementRequestByCurrentUserBranch();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }


    function GetAllDisbursmentRequesByCurrentUser() {
        try {
            $http({
                url: "/CPRDisbursment/GetAllDisbursmentRequesByCurrentUser",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output != null) {
                        $scope.allRequestList = response.data.output;
                       // $scope.allRequestList = $scope.disbursementRequestBranchList;
                        common.pageloadhide();
                    }
                    else {
                        common.pageloadhide();
                    }
                }                                       
                
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }

    function GetAllDisbursementRequestByCurrentUserBranch() {
        try {
            $http({
                url: "/CPRDisbursment/GetAllDisbursementApprvalByCurrentUserBranch",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.disbursementRequestBranchList = response.data.output;
                    $scope.inProgressForBranchList = $scope.disbursementRequestBranchList;
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }

    $scope.CreateNewRequest_ClickEvent = function (index) {
        try {
            window.location = '/CPRDisbursment/CreateDisbursmentRequest?SPHostUrl=https://techoneglobalorg.sharepoint.com/sites/LOSBasicBankBD';
        } catch (e) {
            alert("CreateNewRequest_ClickEvent Listview" + e);
        }
    };

    $scope.ChangeNavigation_ClickEvent = function (index) {
        try {
            $scope.formatIndex = index;
        } catch (e) {
            alert("ChangeNavigation_ClickEvent Listview" + e);
        }
    };
    $scope.ChangeNavigationOffice_ClickEvent = function (index) {
        try {
            $scope.formatIndexOffice = index;
        } catch (e) {
            alert("ChangeNavigationOffice_ClickEvent Listview" + e);
        }
    };

    $scope.ChangeNav_ClickEvent = function (index) {
        try {
            $scope.formatIndex = 1;
            $scope.formatIndexOffice = 1;
            $scope.formatNavIndex = index;
        } catch (e) {
            alert("ChangeNav_ClickEvent Listview" + e);
        }
    };
    $scope.removeRow = function (item) {
        if (confirm("Are you sure to delete?")) {
            try {
                $http({
                    url: "/CPRDisbursment/DeleteCPRDisbursementById",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { id: item.id }
                }).then(function successCallback(response) {

                    if (response.data.success) {
                        var index = $scope.allRequestList.indexOf(item);
                        $scope.allRequestList.splice(index, 1);
                    }
                }),
                    function errorCallback(response) {
                        $scope.error = response;
                    };
            }
            catch (e) {
                alert("Exception removeRow: " + e);
            }
        }

    };

    Page_Load();
    ////--Model Popup-------
    $scope.showPrerenderedDialog = function (ev, item) {
        $mdDialog.show({
            contentElement: item,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    };
    $scope.CloseModel = function () {
        $mdDialog.cancel();
    };
}));