(app.controller("cprWorkingCapitalCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.cPRWorkingCapitalDetailsModel = {
        id: 0,
        cPRId: 0,
        workingCapitalModel: null,
        currentYear: 0,
        projectedYear: 0,
        conditions: 0,
        currentYearValue: '',
        projectedYearValue: '',
        currentYearValueDay: '',
        projectedYearValueDay: '',
        currentYearValueQuantity: '',
        projectedYearValueQuantity: '',
        currentYearValueRate: '',
        projectedYearValueRate: '',
        marginPercentage: '',
        active: true
    };
    $scope.cPRWorkingCapitalModel = {
        currentYear: 0,
        projectedYear: 0,
        cPRWorkingCapitalMasterModelList: []
    };
    $scope.cPRWorkingCapitalDetailsMapping = {
        id: 0,
        cPRId: 0,
        workingCapitalId: 0,
        currentYear: 0,
        projectedYear: 0,
        marginPercentageCurrent: 0,
        marginPercentageProjected:0,
        workingCapitalDetailsList: null
    };
  

    $scope.workingcapitalCurrentYear = 0;
    $scope.workingcapitalProjectYear = 0;
    $scope.workingcaptialmasterList = [];
    $scope.yearlist = [];

    $scope.Page_Load = function () {
        try {
            YearCalculation();
            var cprId = GetUrlParameters();
            GetWorkingCaptialByCPRId();
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
            }
    };

    function GetWorkingCaptialByCPRId() {
        try {
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetWorkingCaptialByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cPRId: cprId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRWorkingCapitalDetailsMapping = response.data.output;
                    $scope.calculateWCAmount();
                   
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetWorkingCaptialByCPRId " + e);
        }
    }


    function YearCalculation() {
        try {

            var now = new Date().getFullYear();
            var start = now - 15;
            var futureYear = now + 15;
            var difference = futureYear - start;
            for (var i = start; i < futureYear; i++) {
                $scope.yearforturnover.value = null;
                $scope.yearforturnover.value = i;
                $scope.yearlist.push($scope.yearforturnover);
                $scope.yearforturnover = {
                    value: null
                }
            }
        }
        catch (ex) {
            alert("Exception in YearCalculation " + ex);
        }
    }

    $scope.calculateWCAmount = function () {
        try {

            $scope.totalWCAssetCurrent = 0;
            $scope.totalWCAssetProjected = 0;
            $scope.totalWCLiabilityCurrent = 0;
            $scope.totalWCLiabilityProjected = 0;
            $scope.netWCCurrent = 0;
            $scope.netWCProjected = 0;
            $scope.marginPercentageCurrent = 0;
            $scope.marginPercentageProjected = 0;
            $scope.allowableBankWCFinanceCurrent = 0;
            $scope.allowableBankWCFinanceProjected = 0;

            if (!$scope.cPRWorkingCapitalDetailsMapping) return;
            if (!$scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList) return;
            for (i = 0; i < $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList.length; i++) {
                if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.active) {
                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueDay != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueQuantity != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueRate != null) {

                        $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValue =
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueRate *
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueDay *
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValueQuantity;
                    }
                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueDay != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueQuantity != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueRate != null) {

                        $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValue =
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueRate *
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueDay *
                            $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValueQuantity;
                    }

                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].marginPercentageCurrent == null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].marginPercentageProjected == null) {

                        $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].marginPercentageCurrent = 0;
                        $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].marginPercentageProjected = 0;
                    }

                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.subItem == '+' &&
                        $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValue != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.isTotal) {
                        $scope.totalWCAssetCurrent = $scope.totalWCAssetCurrent + $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValue;
                    }
                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.subItem == '+'
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValue != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.isTotal) {

                        $scope.totalWCAssetProjected = $scope.totalWCAssetProjected + $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValue;
                    }
                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.subItem == '-'
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValue != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.isTotal) {
                        $scope.totalWCLiabilityCurrent = $scope.totalWCLiabilityCurrent + $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].currentYearValue;
                    }
                    if ($scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.subItem == '-'
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValue != null
                        && $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].cPRWorkingCapitalMasterModel.isTotal) {
                        $scope.totalWCLiabilityProjected = $scope.totalWCLiabilityProjected + $scope.cPRWorkingCapitalDetailsMapping.workingCapitalDetailsList[i].projectedYearValue;
                    }
                }
            }
            $scope.netWCCurrent = parseFloat($scope.totalWCAssetCurrent) - parseFloat($scope.totalWCLiabilityCurrent);
            $scope.netWCProjected = parseFloat($scope.totalWCAssetProjected) - parseFloat($scope.totalWCLiabilityProjected);
            if ($scope.cPRWorkingCapitalDetailsMapping.marginPercentageProjected != null) {
                $scope.marginPercentageProjected = Math.abs(parseFloat(parseFloat($scope.netWCProjected / 100) * parseFloat($scope.cPRWorkingCapitalDetailsMapping.marginPercentageProjected)));
                $scope.allowableBankWCFinanceProjected = parseFloat($scope.netWCProjected - $scope.marginPercentageProjected);
            }
            if ($scope.cPRWorkingCapitalDetailsMapping.marginPercentageCurrent != null) {
                $scope.marginPercentageCurrent = Math.abs(parseFloat(parseFloat($scope.netWCCurrent / 100) * parseFloat($scope.cPRWorkingCapitalDetailsMapping.marginPercentageCurrent)));
                $scope.allowableBankWCFinanceCurrent = parseFloat($scope.netWCCurrent - $scope.marginPercentageCurrent);
            }
        } catch (e) {
            alert("calculateWCAmount Error: " + e);
        }
    }
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function SaveCPRWorkingCapitalDetails() {
        try {
            var cPrId = GetUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCPRWorkingCapitalDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ workingCapitalDetailsMappingModel: $scope.cPRWorkingCapitalDetailsMapping, cprId:cPrId })
            }).then(function successCallback(response) {
                // console.log(response.data);
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        $scope.cPRWorkingCapitalDetailsMapping = response.data.output;
                        $scope.calculateWCAmount();
                        //GetWorkingCaptialByCPRId();
                        }, function errorCallback(response) {
                            common.preprocesshide();
                        }
                    );
                    
                }
                else {
                    common.preprocesshide();
                    alert(response.data.message);
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveCPRWorkingCapitalDetails' + e);
        }
    }

    $scope.SubmitWorkingCapital_ClickEvent = function () {
        try {
            SaveCPRWorkingCapitalDetails();
        } catch (e) {
            alert('SubmitWorkingCapital_ClickEvent ' + e);
        }
    }

    function ResetWorkingCapital() {
        $scope.cPRWorkingCapitalDetailsModel = {
            id: 0,
            cPRId: 0,
            workingCapitalModel: null,
            currentYear: 0,
            projectedYear: 0,
            conditions: 0,
            currentYearValue: '',
            projectedYearValue: '',
            currentYearValueDay: '',
            projectedYearValueDay: '',
            currentYearValueQuantity: '',
            projectedYearValueQuantity: '',
            currentYearValueRate: '',
            projectedYearValueRate: '',
            marginPercentage: '',
            active: true
        };
        $scope.cPRWorkingCapitalModel = {
            currentYear: 0,
            projectedYear: 0,
            cPRWorkingCapitalMasterModelList: []
        };
        $scope.cPRWorkingCapitalDetailsMapping = {
            id: 0,
            cPRId: 0,
            workingCapitalId: 0,
            currentYear: 0,
            projectedYear: 0,
            marginPercentageCurrent: 0,
            marginPercentageProjected: 0,
            workingCapitalDetailsList: null
        };

    }

    $scope.Page_Load();

}));