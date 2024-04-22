(app.controller("summaryViewCtrl", function ($scope, $http, $filter, $location, dialogService, $rootScope, $timeout, $mdDialog) {

    /// .................. Variables
    var cPId = common.borrowerprofile.id;
    $scope.monthlyTotalExpense = 0;
    $scope.monthlyTotalNetIncome = 0;
    //$scope.borrowerprofile = {
    //    listMonthlyIncome: [],
    //    listMonthlyExpenditure: [],
    //    totaltax: 0,
    //};
    $scope.listMonthlyIncome = [];
    $scope.listMonthlyExpenditure = [];
    $scope.totaltax = 0;
    $scope.cPRInsuranceDetailsModel = {
        id: 0,
        insuredAsset: null,
        valueOfAsset: null,
        insuranceCompanyId: 0,
        coverName: '',
        companyName: null,
        cPRId: 0,
        encryptedCPRId: GetUrlParameters(),
        amount: null,
        expiryDate: null,
        //expiryDate: new Date,
        attachments: null,
        active: true,
        editor: 0,
        modified: new Date,
        author: 0,
        created: new Date
    };
    $scope.listCoverTypes = [];

    $scope.listCPRDeferral = [];
    $scope.listCPRWaiver = [];
    $scope.cprinit.listCRIBUpload = [];
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
    $scope.externalCreditScore = {
        id: 0,
        ratingType: null,
        shortTermRating: null,
        longTermRating: null,
        status: null,
        validity: null,
        ratedBy: null,
        financialYear: null,
        dateofRating: null,
        remarks: null,
        active: true
    }
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
    $scope.cPREnvironmentalCategory = {
        id: '',
        category: '',
        dateOfCretificate: '',
        validity: '',
        comment: '',
        active: true
    };
    $scope.cPRStockPositionModel = {
        dateOfInspection: '',
        item: '',
        stockValue: '',
        margin: '',
        inspectedBy: '',
        active: true
    };
    $scope.listcPRStockPosition = [];
    $scope.listSWOTAnalysis = [];
    
    $scope.temporary = {
        listriskAnalysis: [],
        riskAnalysisICRRS: null
    };
    $scope.listriskAnalysis = [];
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

    $scope.projectassessmenttype = {
        id: '',
        particulars: '',
        latestHistorical: '',
        projectedYear: '',
        latestHistoricalValue: 0,
        projectedYearValue: 0,
        active: false
    };
    $scope.listCPRProjectNeedAssessment2 = [];  
    $scope.listCPRGroupOverview = [];
    $scope.valuationMapper = [];
    $scope.assetDetailMapper = [];
    $scope.liabilityDetailsMapper = [];
    $scope.listCPRLiabilitySanctionHistory = [];

    

    $scope.Page_Load = function () {
        try {
            $scope.personal = $scope.borrowerprofile.personal;
          
            GetMonthlyIncomeByCpId();
            GetMonthlyExpenditureByCpId();
            GetRiskAnalysisByCprId();
            GetRiskAnalysisICRRSByCpId();
            GetValuationByCPRId();
            GetCRIBAnalysisByCPRId();
            GettInsuranceDetilsByCPRId();
            GetAssetDetailsByCPRId();
            GetLiabilityDetailsByCPRId();
            GetAllSanctionHistoryByCPRId();
            GetCPRWaiverByCPR();
            GetCPRDeferralByCPR();
            GetCreditScoringByCprId();
            GetAccountPerformance();
            GetStcokPositionByCprId();
            GetEnvironmentCategoryByCprId();
            GetSwotAnalysisByCprId();
          
            GetWorkingCaptialByCPRId();
            GetProjectNeedAssesmentByCprId();
            GetBorrwerExposureByCprId();
            GetCustomCheckListByCPRId();
           
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    ///common
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function getFormatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };
 
    $scope.GetTotal = function (list) {
        try {
            if (list != null && list.length > 0) {
                var total = 0.00;
                var result = "0.00";
                for (var i = 0; i < list.length; i++)
                    total += parseFloat(list[i].amount, 10);
                result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                return result;
            }
            return "0.00";
        } catch (e) {
            alert("Exception GetTotal " + e);
        }
    };

    $scope.GetTotalDSCRExpense = function (list) {
        try {
            var total = 0;
            if (list != null && list.length > 0) {
                var listIsDSCR = $filter('filter')(list, { isDSCR: true }, true);
                if (listIsDSCR.length > 0) {
                    angular.forEach(listIsDSCR, function (val) {
                        if (val.active && !isNaN(val.amount)) {
                            total += val.amount;
                        }
                    });
                }
            }
            //for BBL DBR
            $scope.monthlyTotalExpense = total;
            return total;
        } catch (e) {
            alert('Exception GetTotalDSCRExpense ' + e);
        }
    };

    $scope.GetTotalNetIncome = function (num1, num2) {
        try {
            if (isNaN(num1))
                num1 = 0;
            if (isNaN(num2))
                num2 = 0;

            var total = 0;
            if (num1 > 0 || num2 > 0) {
                total = num1 - num2;
            }
            // for DBR
            $scope.monthlyTotalNetIncome = total;
            total = addCommas(total);
            return total;
        } catch (e) {
            alert('Exception GetTotalNetIncome ' + e);
        }
    };
    $scope.GetTotalUMI = function (MITot, METot) {
        try {
            var total = 0;
            $scope.UMItot = total;
            if (MITot > 0 || METot > 0) {
                total = MITot - METot;
            }
            total = total.toFixed(2);
            total = addCommas(total);
            
            return total;

        } catch (e) {
            alert('Exception GetTotalUMI ' + e);
        }
    };
    
    $scope.CalDBRNew = function (income, expenese) {
        try {
            //$scope.monthlyTotalIncome = $scope.GetMITotal(); //this gets total of uncheck DRR row
            //$scope.monthlyTotalExpense = $scope.GetMETotal();//this gets total of uncheck DRR row
            ///$scope.monthlyTotalNetIncome AND $scope.monthlyTotalExpense values come from GetTotalNetIncome() and GetTotalDSCRExpense(list)
            var burdenRation = 0;
            if (parseFloat(income) > 0 && parseFloat(expenese) > 0 && $scope.borrowerprofile.individual !== null) {

                $scope.burdenRatio = (parseFloat(expenese) / parseFloat(income)) * 100;
            }
            else {
                $scope.burdenRatio = 0;
            }
            burdenRation = $scope.burdenRatio.toFixed(2);
            return burdenRation;
        } catch (ex) {
            alert("Exception in CalDBRNew " + ex);
        }
    };
    function GetMonthlyIncomeByCpId() {
        try {
            var clientProfileId = cPId;
            $http({
                url: "/CPRV2/GetMonthlyIncomeByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: clientProfileId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listMonthlyIncome = [];
                    $scope.incomeExpenditureMapper = response.data.output;
                    $scope.listMonthlyIncome = $scope.incomeExpenditureMapper.monthlyIncomeList
                    $scope.evaluationComments.income = $scope.incomeExpenditureMapper.evaluationComments;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }

    function GetMonthlyExpenditureByCpId() {
        try {
            var clientProfileId = cPId;
            $http({
                url: "/CPRV2/GetMonthlyExpneditureByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: clientProfileId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listMonthlyExpenditure = [];
                    $scope.incomeExpenditureMapper = response.data.output;
                    $scope.listMonthlyExpenditure = $scope.incomeExpenditureMapper.monthlyExpenditureList;
                    $scope.evaluationComments.expenditure = $scope.incomeExpenditureMapper.evaluationComments;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }

    $scope.GetTotalDSCR = function (list) {
        try {
            var total = 0;
            if (list != null && list.length > 0) {
                var listIsDSCR = $filter('filter')(list, { isDSCR: true }, true);
                if (listIsDSCR.length > 0) {
                    angular.forEach(listIsDSCR, function (val) {
                        if (val.active && !isNaN(val.amount)) {
                            total += val.amount;
                        }
                    });
                }
            }

            return total;
        } catch (e) {
            alert('Exception GetTotalDSCR ' + e);
        }
    };

    function GetCRIBAnalysisByCPRId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetCRIBUploadByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cPrId }
            }).then(function successCallback(response) {
                if (response.data.success) {

                   $scope.cribUploadMapper = response.data.output;
                    $scope.cprinit.listCRIBUpload = $scope.cribUploadMapper.listCRIBUploadModel;
                    $scope.cribUploadComment = $scope.cribUploadMapper.cribUploadEvaluatorComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetCRIBAnalysisByCPRId: " + e);
            common.LoderHide();
        }
    };

    function GetValuationByCPRId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetValuationDetailByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cPrId }
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        $scope.listCPRValuation = [];
                        common.preprocesshide();
                        $scope.valuationMapper = response.data.output;
                        $scope.listCPRValuation = $scope.valuationMapper.listValuation;
                        $scope.valuationEvaluationComment = $scope.valuationMapper.evaluationComment;
        
                        // dialogService.ConfirmDialogWithOkay('', response.data.message);

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

        }
        catch (e) {
            alert("Page_Load " + e);
        }
    }

    function GettInsuranceDetilsByCPRId() {
        try {
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GettInsuranceDetilsByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ CPRId: cprId })
            }).then(function successCallback(response) {
                if (response.data.success) {

                    $scope.insuranceDetailMapper = response.data.output;
                    if ($scope.insuranceDetailMapper !== null) {
                        $scope.cPRInsuranceDetailsModel = $scope.insuranceDetailMapper.cPRInsuranceDetailsModel;
                        $scope.insuranceCoverDetailsList = $scope.insuranceDetailMapper.insuranceCoverDetailsList;
                        $scope.insuranceEvaluatorComment = $scope.insuranceDetailMapper.insuranceEvaluatorComment;
                        //GetInsuranceCompanyById($scope.cPRInsuranceDetailsModel.insuranceCompanyId);
                    }
                    // $scope.ADtoBS($scope.insuranceDetailMapper.cPRInsuranceDetailsModel.expiryDate, '$scope.insuranceDetailMapper.cPRInsuranceDetailsModel.expiryDate_np');
                    if ($scope.insuranceCoverDetailsList !== null)
                        $scope.InsuranceCoverDetailsCount = $scope.insuranceCoverDetailsList.length;
                    else
                        $scope.InsuranceCoverDetailsCount = 0;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('GettInsuranceDetilsByCPRId ' + e);
        }
    }
    function GetAssetDetailsByCPRId() {
        try {
            var cprId = GetUrlParameters();
            var clientProfileId = cPId;
            $http({
                url: "/CPRV2/GetAssetsDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ CPRId: cprId, cprClientProfileId: clientProfileId})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.assetDetailMapper = response.data.output;
                    $scope.listMovableAssets = $scope.assetDetailMapper.listMovableAssets;
                    $scope.listImmovableAssets = $scope.assetDetailMapper.listImmovableAssets;
                    $scope.assetDetailEvaluatorComment = $scope.assetDetailMapper.assetEvaluatorComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert('Exception GetAssetDetail:  ' + e);
            common.preprocesshide();
        }
    }
    function GetLiabilityDetailsByCPRId() {
        try {
            var cprId = GetUrlParameters();
            var clientProfileId = cPId;
            $http({
                url: "/CPRV2/GetOtherLiability",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ CPRId: cprId, cprClientProfileId: clientProfileId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.liabilityDetailsMapper = response.data.output;
                    $scope.listotherLiability = $scope.liabilityDetailsMapper.otherLiabilityModellist;
                    $scope.liabilitiesEvaluatorComment = $scope.liabilityDetailsMapper.lieabilityEvaluatorComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert('Exception GetAssetDetail:  ' + e);
            common.preprocesshide();
        }
    }
    function GetAllSanctionHistoryByCPRId() {
        try {
            var cprId = GetUrlParameters();
            var clientProfileId = cPId;
            $http({
                url: "/CPRV2/GetAllSanctionHistoryByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ CPRId: cprId, cprClientProfileId: clientProfileId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCPRLiabilitySanctionHistory = response.data.output;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert('Exception GetAssetDetail:  ' + e);
            common.preprocesshide();
        }
    }
    
    function GetCPRWaiverByCPR() {
        try {
            var CPRIdstring = GetUrlParameters();
            $http({
                url: "/CPRV2/GetCPRWaiverByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { CPRIdstring: CPRIdstring }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCPRWaiver = response.data.output;
                    /*$scope.CPRWaiver = $scope.listCPRWaiver;*/
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetCPRWaiverByCPR " + e);
        }
    }

    function GetCPRDeferralByCPR() {
        try {
            var CPRIdstring = GetUrlParameters();
            $http({
                url: "/CPRV2/GetCPRDeferralByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { CPRIdstring: CPRIdstring }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCPRDeferral = response.data.output;
                    $scope.CPRDeferral = $scope.listCPRDeferral;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetCPRDeferralByCPR " + e);
        }
    }

    function GetCreditScoringByCprId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetExternalCreditScoreByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.externalCreditScore = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCreditScoringByCprId " + e);
        }
    }

    function GetAccountPerformance() {
        try {
            var cPrId = GetUrlParameters();
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

    function GetEnvironmentCategoryByCprId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetEnvironmentCategory",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPREnvironmentalCategory = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAccountPerformance " + e);
        }
    }

    function GetStcokPositionByCprId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetStockPositionByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listcPRStockPosition = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAccountPerformance " + e);
        }
    }

    function GetSwotAnalysisByCprId() {
        try {
            var cPrid = GetUrlParameters();
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
                    $scope.listSWOTAnalysis = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };

    function GetRiskAnalysisByCprId() {
        try {
            var cPrid = GetUrlParameters();
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
                    $scope.temporary.riskAnalysisICRRS = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
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
                    calculateWCAmount();
                   
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetWorkingCaptialByCPRId " + e);
        }
    }


    function calculateWCAmount() {
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

    function GetProjectNeedAssesmentByCprId() {
        try {
            var cPrid = GetUrlParameters();
            $http({
                url: "/CPRV2/GetProjectNeedAssesmentByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output.length>0) {
                        $scope.projectassessmenttype.latestHistorical = response.data.output[0].latestHistorical;
                        $scope.projectassessmenttype.projectedYear = response.data.output[0].projectedYear;
                        $scope.listCPRProjectNeedAssessment2 = response.data.output;
                    }                    

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };

    $scope.GetSumOFProjectNeedAssesment2latestHistorical = function () {
        var total = 0;
        if ($scope.listCPRProjectNeedAssessment2 != null) {
            for (count = 0; count < $scope.listCPRProjectNeedAssessment2.length; count++) {
                if (!isNaN($scope.listCPRProjectNeedAssessment2[count].latestHistoricalValue))
                    total += parseFloat($scope.listCPRProjectNeedAssessment2[count].latestHistoricalValue, 10);
            }
            var totalwithcommas = getFormatNumber(total);
            return totalwithcommas;
        }
        return '0';
    };

    $scope.GetSumOFProjectNeedAssesment2ProjectedYear = function () {
        var total = 0;
        if ($scope.listCPRProjectNeedAssessment2 != null) {
            for (count = 0; count < $scope.listCPRProjectNeedAssessment2.length; count++) {
                if (!isNaN($scope.listCPRProjectNeedAssessment2[count].projectedYearValue))
                    total += parseFloat($scope.listCPRProjectNeedAssessment2[count].projectedYearValue, 10);
            }
            var totalwithcommas = getFormatNumber(total);
            return totalwithcommas;
        }
        return '0';
    };

    function GetBorrwerExposureByCprId() {
        try {
            var cPrid = GetUrlParameters();
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
                    $scope.totalBorrowerFundedLiability = parseFloat($scope.cPRBorrowerExposure.groupFundedLiability) + parseFloat(proposedFunded);
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
                $scope.totalBorrowerNonFundedLiability = parseFloat($scope.cPRBorrowerExposure.groupNonFundedLiability) + parseFloat(proposedNonFunded);
                //var totalwithcommas = getFormatNumber(totalAmt);
                return $scope.totalBorrowerNonFundedLiability;
            }
        return 0;
    };


    function GetCustomCheckListByCPRId() {
        try {
            $scope.customCheclistTemplateList = [];
            //var customersegmentid = parseInt($scope.cprinit.business.id);
            //var productId = item.idd;
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetConfigurableChecklistbyCprID",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: { customersegmentid: customersegmentid, productId: productId, cPRId: cprId }
                data: { cPRId: cprId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.configTemplate = [];
                    $scope.customCheclistTemplateList = response.data.output;
                    CreateChecklist();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCustomCheckListByProductId " + e);
        }
    }


    function CreateChecklist() {
        //   console.log($scope.customCheclistTemplateList);
        try {
            if ($scope.customCheclistTemplateList != null && $scope.customCheclistTemplateList.length != 0) {
                //debugger;
                for (var k = 0; k < $scope.customCheclistTemplateList.length; k++) {
                    var template = $scope.customCheclistTemplateList[k];
                    var templateObject = {
                        title: template.name,
                        comments: template.comments,
                        cPRId: GetUrlParameters(),
                        id: template.id,
                        content: []
                    };

                    var templateContent = "<div class='testing'><h3>" + template.name + "</h3>";

                    for (var i = 0; i < template.configurableChecklistInputType.length; i++) {
                        var question = template.configurableChecklistInputType[i];

                        $scope.answerArr = [];

                        for (var j = 0; j < $scope.customCheclistTemplateList[k].configurableChecklistInputType[i].configCheckListItemList.length; j++) {

                            templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";

                            var ans = {
                                id: question.configCheckListItemList[j].id,
                                result: null,
                            }
                            $scope.answerArr.push(ans);
                            var ans = {
                                id: 0,
                                result: false,
                            }
                            //var jsonval = JSON.parse(question.configCheckListItemList[j].tag);
                            //templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";
                        }
                        var questionObject = {
                            id: question.id,
                            title: question.description,
                            answers: $scope.answerArr
                        };
                        templateObject.content.push(questionObject);
                        templateContent = templateContent + "<h4>" + question.description + "</h4>";
                    }
                    $scope.configTemplate.push(templateObject);
                    templateContent = templateContent + "</div>";
                    $('#renderList').append(templateContent);

                }

                for (var g = 0; g < $scope.customCheclistTemplateList.length; g++) {
                    var template = $scope.configTemplate[g];

                    for (var h = 0; h < $scope.customCheclistTemplateList[g].configurableChecklistInputType.length; h++) {

                        var content = $scope.configTemplate[g].content[h];

                        for (var n = 0; n < $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList.length; n++) {



                            var data = $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n];
                            var answer = data.answer;
                            var ngmodel = data.ngModel;
                            data.value = {
                                ngmodel: answer
                            };
                            $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value = [];
                            $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value[ngmodel] = answer;

                            var answer2 = $scope.configTemplate[g].content[h].answers[n];
                            $scope.configTemplate[g].content[h].answers[n].result = answer;
                        }
                    }
                }
            }
            //console.log("configTemplate "+$scope.configTemplate);
            //console.log("customCheclistTemplateList " +$scope.customCheclistTemplateList);
        }
        catch (ex) {
            alert("Exception in CreateChecklist " + ex);
        }
    }
    //$scope.showPrerenderedDialog = function (ev, item) {
    //    $mdDialog.show({
    //        contentElement: item,
    //        parent: angular.element(document.body),
    //        targetEvent: ev,
    //        clickOutsideToClose: true,
    //        fullscreen: true
    //    });
    //};
    $scope.Page_Load();
    //print function code is start below
    $scope.PrintLetter = function (item) {
        $scope.printDiv(item);
    };
    $scope.printDiv = function (divId) {
        var contents = document.getElementById(divId).innerHTML;
        var body = document.getElementsByTagName("BODY")[0];
        var frame1 = document.createElement("IFRAME");
        frame1.name = "frame1";
        frame1.setAttribute("style", "position:absolute;top:-1000000px");
        body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
        //var frameDoc = window.open('', '_blank', 'width=800,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');

        frameDoc.document.open();
        frameDoc.document.write('<html><head><title></title>');
        frameDoc.document.write('</head><body>');
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/bootstrap.min.new.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/Site.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/font-awesome.min.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/cus_ng_style.css" />');
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/partial_views.css" />');
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/angular-material.css" />');


        frameDoc.document.write('<style type="text/css">' +
            'td, th {' +
            'border: 1px solid #000;' +
            'border-collapse: collapse;' +
            'border-color: grey;' +
            'padding: 0.5em;' +
            'border-spacing: 0;' +
            '}' +
            '</style>');

        frameDoc.document.write('<style type="text/css">' +
            '.noborder td, .noborder th {' +
            'border: none;' +
            // 'border-collapse: collapse;' +
            // 'border-color: grey;' +
            // 'padding: 0.5em;' +
            //  'border-spacing: 0;' +
            '}' +
            '</style>');

        frameDoc.document.write('<style type="text/css">' +
            '@media print {' +
            '.pageBreakDiv {' +
            'page-break-inside: avoid !important;' +
            '}' +
            '}' +
            '</style>');
        frameDoc.document.write('<style type="text/css">' +
            '@media print {' +
            'a:link:after,' +
            'a:visited:after {' +
            'content: ""!important;' +
            '}' +
            '}' +
            '@page { margin:15mm 10mm 15mm 10mm!important; }' +
            '.panel-body { padding: 0 }' +
            '</style>');
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        window.setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            body.removeChild(frame1);
        }, 400);
    };

}));