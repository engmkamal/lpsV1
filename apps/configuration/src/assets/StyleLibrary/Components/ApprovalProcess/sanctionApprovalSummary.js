(app.controller("SanctionApprovalSummaryCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.BranchTitleDisplay = 'Office';
    $scope.sanctionRequestList = null;
    $scope.sanctionRequestBranchList = null;
    listSanctionRequestDraftDetails = [];
    $scope.cprOfficeSummary = null;

    $scope.allRequestList = [];
    $scope.inProgressForBranchList = [];
    $scope.formatIndex = 1;
    $scope.formatIndexOffice = 1;
    $scope.formatNavIndex = 20;

    //$scope.changeRequestRedirectUrl = "/CPRSanction/Initiation?cprno=@cprno&SPHostUrl=";
    //$scope.RequestCount = {};
    function Page_Load() {
        try {
            GetAllSanctionApprovalByUser();
            GetAllSanctionRequestByUserBranch();
          
        } catch (e) {
            alert("Page_Load " + e);
        }
    };


    function GetAllSanctionApprovalByUser() {
        try {
            $http({
                url: "/CPRSanction/GetAllSanctionApprvalByCurrentUser",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output != null) {
                        $scope.sanctionRequestList = response.data.output;
                        $scope.allRequestList = $scope.sanctionRequestList.listSanctionRequestDetails;
                        common.pageloadhide();
                    } else {
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

    function GetAllSanctionRequestByUserBranch() {
        try {
            $http({
                url: "/CPRSanction/GetAllSanctionApprvalByUserBranch",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output != null) {
                        $scope.sanctionRequestBranchList = response.data.output;
                        $scope.sanctionRequestForBranchList = $scope.sanctionRequestBranchList.listSanctionRequestDetails;
                        common.pageloadhide();
                    } else {
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

    $scope.CreateNewRequest_ClickEvent = function () {
        try {
            window.location = '/CPRSanction/CreateSanctionRequest?SPHostUrl=https://techoneglobalorg.sharepoint.com/sites/LOSBasicBankBD';
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
                    url: "/CPRSanction/DeleteCPRSanctionById",
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
}));