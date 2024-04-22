(app.controller("riskAnalysisCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    
    $scope.temporary = {
        listriskAnalysis: [],
        riskAnalysisICRRS: null
    }
    $scope.riskAnalysisICRRSComment = null;
    $scope.listriskAnalysis = [];
    $scope.listriskAnalysis = {
        id: 0,
        cPRClientProfileId: 0,
        type: null,
        description: null,
        mitigate: null,
        riskType: null,
        active: true
    };

    $scope.riskType = {
        id: 0,
        cPRClientProfileId: 0,
        type: null,
        active: true
    };

    $scope.riskAnalysisICRRS = {
        id: 0,
        cPRClientProfileId: '',
        quantitativeScaleScoreObtained: '',
        quantitativeScalePercentage: '',
        quantitativeScaleICRRS: '',
        qualitativeScaleScoreObtained: '',
        qualitativeScalePercentage: '',
        qualitativeScaleICRRS: '',
        totalScoreObtained: '',
        totalPercentage: '',
        totalICRRS: '',
        dateOfAnalysis: '',
        dateOfFinancial: '',
        auditStatus: '',
        auditorName: '',
        analystName: ''
        //active: true
    };

    $scope.Page_Load = function () {
        //alert($scope.borrowerprofile.id);
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            $scope.isEditable = common.isEditable; 
            var cprId = GetUrlParameters();           
            GetRiskAnalysisByCprId(cprId);
            GetRiskAnalysisICRRSByCpId();
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function GetRiskAnalysisByCprId(cPrid) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetRiskAnalysisByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.temporary.listriskAnalysis = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };
    function GetRiskAnalysisICRRSByCpId() {
        try {
            var cPId = $scope.borrowerprofile.id;
            $http({
                url: "/CPRV2/GetRiskAnalysisICRRSByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cpId: cPId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.mapper = response.data.output;
                    $scope.riskAnalysisICRRS = $scope.mapper.clientRiskAnalysisICRRSModel;
                    $scope.riskAnalysisICRRSComment = $scope.mapper.riskAnalysisICRRSComment;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };
    $scope.AddRiskAnalysis_ClickEvent = function (risktype) {
        try {
            if ($scope.riskType.type !== null && $scope.riskType.type !== undefined && $scope.riskType.type !== "") {
                SaveRiskType();
            }
        }
        catch (ex) {
            alert("Exception in AddRiskAnalysis_ClickEvent " + ex);
        }
    };

    $scope.RemoveRiskAnalysis_ClickEvent = function (list, item) {
        try {
            if (item !== null) {
                var index = list.indexOf(item);

                if ((list[index].description !== null && list[index].description !== undefined && list[index].description !== "") && (list[index].mitigate !== null && list[index].mitigate !== undefined && list[index].mitigate !== "")) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete description and mitigate for - " + item.typeName).then(function (answer) {
                        if (answer) {
                            list[index].description = null;
                            list[index].mitigate = null;
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    })
                }
                else if ((list[index].description !== null && list[index].description !== undefined && list[index].description !== "") && (list[index].mitigate === null || list[index].mitigate === undefined || list[index].mitigate === "")) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete description for - " + item.typeName).then(function (answer) {
                        if (answer) {
                            list[index].description = null;
                            list[index].mitigate = null;
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    });
                }
                else if ((list[index].mitigate !== null && list[index].mitigate !== undefined && list[index].mitigate !== "") && (list[index].description === null || list[index].description === undefined || list[index].description === "")) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete mitigate for - " + item.typeName).then(function (answer) {
                        if (answer) {
                            list[index].description = null;
                            list[index].mitigate = null;
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    });
                }
                else {
                    dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.typeName);
                }
            }
        }
        catch (ex) {
            alert("Exception in RemoveRiskAnalysis_ClickEvent " + ex);
        }
    }

    $scope.DeleteDataRiskAnalysis_ClickEvent = function (list, item) {
        try {
            if (item !== null) {
                var index = $scope.temporary.listriskAnalysis.indexOf(item);

                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete Risk Type - " + item.typeName)
                    .then(function(answer) {
                            if (answer) {
                                $scope.temporary.listriskAnalysis[index].active = false;
                            } else
                                return false;
                    },
                    function() {
                        return false;
                    });
            }
        }
        catch (ex) {
            alert("Exception in DeleteDataRiskAnalysis_ClickEvent " + ex);
        }
    }

    function SaveRiskType() {
        try {
            if ($scope.temporary.listriskAnalysis != null) {
                var cPRId = GetUrlParameters();
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveRiskType",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ riskTypeModel: $scope.riskType, cprId: cPRId })
                    //data: { riskTypeModel: $scope.riskType }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.riskTypeNew = response.data.output;
                        if ($scope.riskTypeNew != null) {
                            $scope.temporary.listriskAnalysis.push($scope.riskTypeNew);
                            //ResetRiskAnalysis();
                            
                        }
                        ResetRiskAnalysis();

                        common.preprocesshide();
                        //GetRiskAnalysis();
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {
                    $scope.error = response;
                    common.preprocesshide();
                });
            }
        } catch (e) {
            alert("Exception in SaveRiskType" + e);
            common.preprocesshide();
        }
    }

    function ResetRiskAnalysis() {
        try {
            $scope.riskAnalysis = {
                id: 0,
                cPRClientProfileId: 0,
                type: null,
                description: null,
                mitigate: null,
                riskType: $scope.riskTypeNew,
                active: true
            }
            $scope.riskType = {
                id: 0,
                type: null,
                active: true
            }
        }
        catch (ex) {
            alert("Exception in ResetRiskAnalysis " + ex);
        }
    }

    $scope.SubmitRiskAnalysis_ClickEvent = function () {
        try {
            SaveRiskAnalysis();
        } catch (e) {
            alert("SubmitSWOTByApproval_ClickEvent error" + e);
        }
    };
    function SaveRiskAnalysis() {
        try {
            var cPRId = GetUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveRiskAnalysis",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ riskAnalysisModelList: $scope.temporary.listriskAnalysis, cprId: cPRId})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                       // ResetCompetencyAnalysis();

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

    $scope.SubmitRiskAnalysisICRRS_ClickEvent = function () {
        try {
            SaveRiskAnalysisICRRS();
        } catch (e) {
            alert("SubmitRiskAnalysisICRRS_ClickEvent error" + e);
        }
    };
    function SaveRiskAnalysisICRRS() {
        try {
            var riskAnalysisICrrsMapper = {
                'clientRiskAnalysisICRRSModel': $scope.riskAnalysisICRRS,
                'clientProfileId': $scope.borrowerprofile.id,
                'cPRId': GetUrlParameters(),
                'riskAnalysisICRRSComment': $scope.riskAnalysisICRRSComment
            }
            var cPId = $scope.borrowerprofile.id;
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveRiskAnalysisICRRS",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ riskAnalysisICrrsMapper: riskAnalysisICrrsMapper })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            //ResetRiskAnalysisICRRS();

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

    $scope.GetTotalScoreObtained = function () {

        if ($scope.riskAnalysisICRRS != null)
            var quantitiveScoreObtained = parseFloat($scope.riskAnalysisICRRS.quantitativeScaleScoreObtained);
        var qualitativeScoreObtained = parseFloat($scope.riskAnalysisICRRS.qualitativeScaleScoreObtained);
        if (quantitiveScoreObtained > 0 || qualitativeScoreObtained > 0) {              
            $scope.riskAnalysisICRRS.totalScoreObtained = quantitiveScoreObtained + qualitativeScoreObtained;
                //var totalwithcommas = getFormatNumber(totalAmt);
                return $scope.riskAnalysisICRRS.totalScoreObtained;
            }
        return 0;
    };

    $scope.GetTotalPercentage = function () {

        if ($scope.riskAnalysisICRRS != null)
        var qualitativeParcentage  = parseFloat($scope.riskAnalysisICRRS.qualitativeScalePercentage);
        var quantitiveParcentage = parseFloat($scope.riskAnalysisICRRS.quantitativeScalePercentage);
        if (qualitativeParcentage > 0 || quantitiveParcentage > 0) {
            $scope.riskAnalysisICRRS.totalPercentage = quantitiveParcentage + qualitativeParcentage;
            //var totalwithcommas = getFormatNumber(totalAmt);
            return $scope.riskAnalysisICRRS.totalPercentage;
        }
        return 0;
    };

    $scope.GetTotalICRRS = function () {

        if ($scope.riskAnalysisICRRS != null)
            var qualitativeICRRS = parseFloat($scope.riskAnalysisICRRS.quantitativeScaleICRRS);
        var quantitiveICRRS = parseFloat($scope.riskAnalysisICRRS.qualitativeScaleICRRS);
        if (qualitativeICRRS > 0 || quantitiveICRRS > 0) {
            $scope.riskAnalysisICRRS.totalICRRS = qualitativeICRRS + quantitiveICRRS;
            //var totalwithcommas = getFormatNumber(totalAmt);
            return $scope.riskAnalysisICRRS.totalICRRS;
        }
        return 0;
    };

    function ResetRiskAnalysisICRRS() {
        $scope.riskAnalysisICRRS = {
            id: '',
            cPRClientProfileId: '',
            quantitativeScaleScoreObtained: '',
            quantitativeScalePercentage: '',
            quantitativeScaleICRRS: '',
            qualitativeScaleScoreObtained: '',
            qualitativeScalePercentage: '',
            qualitativeScaleICRRS: '',
            totalScoreObtained: '',
            totalPercentage: '',
            totalICRRS: '',
            dateOfAnalysis: '',
            dateOfFinancial: '',
            auditStatus: '',
            auditorName: '',
            analystName: ''
            //active: true
        };
    }


    $scope.Page_Load();

}));