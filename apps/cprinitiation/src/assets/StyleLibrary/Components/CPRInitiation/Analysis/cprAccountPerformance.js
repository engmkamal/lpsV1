(app.controller("accountPerformanceCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.accountPerformance = {
        id: 0,
        numberofTransaction: null,
        totalDebit: null,
        totalCredit: null,
        shownAsset: null,
        shownLiability: null,
        netWorth: null,
        active: true
    };

    $scope.Page_Load = function () {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = getUrlParameters();
            GetAccountPerformance(cprId);
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };
    $scope.NonNegetiveValue = function (value) {
        if (value < 0) {
            dialogService.ConfirmDialogWithOkay('', "Value should not be negetive");
            //$scope.isDiseable = false;
        }
        else {
            //$scope.isDiseable = true;
        }
    };
    function getUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function GetAccountPerformance(cPrId) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetAccounPerformance",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //$scope.accountPerformance = response.data.output;
                    $scope.accountPerformance = response.data.output;                 
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAccountPerformance " + e);
        }
    }

    $scope.calculateNetWorth = function () {
        if ((!angular.isUndefined($scope.accountPerformance.shownLiability)) && (!angular.isUndefined($scope.accountPerformance.shownAsset))) {
            var net = $scope.accountPerformance.shownAsset - $scope.accountPerformance.shownLiability;
            $scope.accountPerformance.netWorth = net;
        } else {
            $scope.accountPerformance.netWorth = 0.0;
        }
    };

    $scope.SubmitAccountPerformance = function () {
        try {
            if ($scope.accountPerformance.netWorth == null || $scope.accountPerformance.netWorth<=0)
                dialogService.ConfirmDialogWithOkay("Please Fill the Required Field Correctly");
            else {
                SaveAccountPerformance();
            }
        } catch (e) {
            alert("SubmitSWOTByApproval_ClickEvent error" + e);
        }
    };
    function SaveAccountPerformance() {
        try {
            var cPRId = getUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveAccountPerformance",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRAccountPerformanceModel: $scope.accountPerformance, cprId: cPRId})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
               
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        $scope.accountPerformance = {
                            id: response.data.output.Id,
                            numberofTransaction: response.data.output.NumberofTransaction,
                            totalDebit: response.data.output.TotalDebit,
                            totalCredit: response.data.output.TotalCredit,
                            shownAsset: response.data.output.ShownAsset,
                            shownLiability: response.data.output.ShownLiability,
                            netWorth: response.data.output.NetWorth,
                            active: response.data.output.Active
                        };
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

    function ResetAccountPerformance() {
        $scope.accountPerformance = {
            id: 0,
            numberofTransaction: null,
            totalDebit: null,
            totalCredit: null,
            shownAsset: null,
            shownLiability: null,
            netWorth: null,
            active: true
        };
    }


    $scope.Page_Load();

}));