(app.controller("borrowerExposureCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.cPRBorrowerExposure = {
        id: '',
        cprId: '',
        totalFundedCapital: 0,
        totalNonFundedCapital: 0,
        groupFundedLiability: 0,
        groupNonFundedLiability: 0,
        proposedFundedLiability: 0,
        proposedNonFundedLiability: 0,
        active: true
    };

     $scope.Page_Load = function () {
         try {
             var spHostUrl = common.GetParameterByName("SPHostUrl", null);
             if (spHostUrl != null) {
                 common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
             }
             var cprId = GetUrlParameters();
             GetBorrwerExposureByCprId(cprId);
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
    function GetBorrwerExposureByCprId(cPrid) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetBorrwerExposureByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRBorrowerExposure = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };
    $scope.GetTotalBorrowerFundedLiability = function () {
        try {
            var totalAmt = 0;
            var proposedFunded = 0.0;
            $scope.totalBorrowerFundedLiability = 0;
            if ($scope.cPRBorrowerExposure != null) {
                if (parseFloat($scope.cPRBorrowerExposure.groupFundedLiability) > 0 || parseFloat($scope.cPRBorrowerExposure.proposedFundedLiability) > 0) {
                    if ($scope.cPRBorrowerExposure.proposedFundedLiability != undefined) {
                        proposedFunded = $scope.cPRBorrowerExposure.proposedFundedLiability;
                    }
                    var round = parseFloat($scope.cPRBorrowerExposure.groupFundedLiability) + parseFloat(proposedFunded);
                    $scope.totalBorrowerFundedLiability = round.toFixed(2);
                    var number = $scope.totalBorrowerFundedLiability;
                    $scope.totalBorrowerFundedLiability = number.toLocaleString();
                    //var totalwithcommas = getFormatNumber($scope.totalBorrowerFundedLiability);
                    return $scope.totalBorrowerFundedLiability;
                }
            }
            return 0;
        } catch (e) {
            console.log(e);
            return 1;
        }
    };

    $scope.GetTotalBorrowerNonFundedLiability = function () {
        var totalAmt = 0;
        var proposedNonFunded = 0.0;
        $scope.totalBorrowerNonFundedLiability = 0;
        if ($scope.cPRBorrowerExposure != null)
            if (parseFloat($scope.cPRBorrowerExposure.groupNonFundedLiability) > 0 || parseFloat($scope.cPRBorrowerExposure.proposedNonFundedLiability) > 0) {
                if ($scope.cPRBorrowerExposure.proposedNonFundedLiability != undefined) {
                    proposedNonFunded = $scope.cPRBorrowerExposure.proposedNonFundedLiability;
                }
                var round = parseFloat($scope.cPRBorrowerExposure.groupNonFundedLiability) + parseFloat(proposedNonFunded);
                $scope.totalBorrowerNonFundedLiability = round.toFixed(2);
                //var totalwithcommas = getFormatNumber(totalAmt);
                return $scope.totalBorrowerNonFundedLiability;
            }
        return 0;
    };

    function SaveBorrwerExposure() {
        try {
            common.preprocessload();
            $scope.cPRBorrowerExposure.cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/CreateBorrwerExposure",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ entity: $scope.cPRBorrowerExposure, crpId: $scope.cPRBorrowerExposure.cprId  })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        $scope.cPRBorrowerExposure = response.data.output;
                        }, function errorCallback(response) {
                            common.preprocesshide();
                        }
                    );
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitUserRole ' + e);
        }
    }

    $scope.SubmitBorrwerExposure_ClickEvent = function () {
        try {
            SaveBorrwerExposure();
        } catch (e) {
            alert('SubmitBorrwerExposure_ClickEvent ' + e);
        }
    }

    function ResetBorrwerExposure() {
        $scope.cPRBorrowerExposure = {
            id: '',
            cprId: '',
            totalFundedCapital: 0,
            totalNonFundedCapital: 0,
            groupFundedLiability: 0,
            groupNonFundedLiability: 0,
            proposedFundedLiability: 0,
            proposedNonFundedLiability: 0,
            active: true
        };
    }


    $scope.Page_Load();

}));