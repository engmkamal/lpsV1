(app.controller("swotAnalysisctrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.borrowerprofile =
    {
        listSWOTAnalysis: [],
        listClientAccountMovementTurnover: [],
    };

    $scope.sWOTAnalysis = {
        id: null,
        strength: null,
        weakness: null,
        threats: null,
        opportunity: null,
        author: null,
        active: true
    };

    $scope.Page_Load = function () {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            $scope.isEditable = common.isEditable; 
            var cprId = GetUrlParameters();
            GetSwotAnalysisByCprId(cprId);
            common.pageloadhide();

        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function getFormatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
    function GetSwotAnalysisByCprId(cPrid) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetSWOTAnalysisByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listSWOTAnalysis = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };
    $scope.AddSWOTAnalysis_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listSWOTAnalysis == null) {
                $scope.borrowerprofile.listSWOTAnalysis = [];
            }
            if ($scope.isWFEnabled == true) {
                getCurrentApprovalUser();
                //
                $scope.sWOTAnalysis.author = $scope.currentApprovalUser.displayName;
            }

            $scope.borrowerprofile.listSWOTAnalysis.push($scope.sWOTAnalysis);
            $scope.ResetSWOTAnalysis_ClickEvent();


        } catch (e) {
            alert("AddSWOTAnalysis_ClickEvent error" + e);
        }
    };

    $scope.ResetSWOTAnalysis_ClickEvent = function () {
        $scope.sWOTAnalysis = {
            id: null,
            strength: null,
            weakness: null,
            threats: null,
            opportunity: null,
            author:null,
            active: true
        };
    };

    $scope.EditItemFromSWOTAnalysisList = function (rowtoedit) {
        try {
            if ($scope.sWOTAnalysis == null)
                $scope.sWOTAnalysis = {};

            $scope.sWOTAnalysis = rowtoedit;

            var index = $scope.borrowerprofile.listSWOTAnalysis.indexOf(rowtoedit);
            $scope.borrowerprofile.listSWOTAnalysis.splice(index, 1);

        } catch (e) {
            alert("Exception EditItemFromSWOTAnalysisList" + e);
        }
    };


    $scope.RemoveItemFromlistSWOTAnalysis = function (index) {
        try {
            $scope.borrowerprofile.listSWOTAnalysis.splice(index, 1);
            //if (list != null && item != null) {
            //    if (item.id == null)
            //        common.RemoveItemFromList(list, item, true);
            //    else
            //        common.SetActiveFalseForRemovedItem(list, item);
            //}
        } catch (e) {
            alert("Exception RemoveItemFromlistSWOTAnalysis Error: " + e);
        }
    };


    //$scope.RemoveItemFromlistSWOTAnalysis = function (list, item) {
    //    try {

    //        if (list != null && item != null) {
    //            if (item.id == null)
    //                common.RemoveItemFromList(list, item, true);
    //            else
    //                common.SetActiveFalseForRemovedItem(list, item);
    //        }
    //    } catch (e) {
    //        alert("Exception RemoveItemFromlistSWOTAnalysis Error: " + e);
    //    }
    //};


    function getCurrentApprovalUser() {
        try {
            $http({
                url: "/PeoplePicker/GetCurrentUser",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.currentApprovalUser = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetCurrentApprovalUser " + e);
        }
    }


    $scope.SubmitSWOTByApproval_ClickEvent = function () {
        try {
            SaveSWOTByApproval();
        } catch (e) {
            alert("SubmitSWOTByApproval_ClickEvent error" + e);
        }
    };
    function SaveSWOTByApproval() {
        try {
            var cPRId = GetUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCompetencyAnalysis",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPRId, listSWOTAnalysisModel: $scope.borrowerprofile.listSWOTAnalysis })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            //ResetCompetencyAnalysis();

                        }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
                else {
                    common.preprocesshide();
                }

            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveSWOTByApproval ' + e);
        }
    }

    function ResetCompetencyAnalysis() {
        $scope.sWOTAnalysis = {
            id: null,
            strength: null,
            weakness: null,
            threats: null,
            opportunity: null,
            author: null,
            active: true
        };
    }


    $scope.Page_Load();

}));