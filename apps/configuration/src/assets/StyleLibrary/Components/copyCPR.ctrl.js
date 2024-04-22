function CopyCPRController($scope, $http, dialogService){

    $scope.error = "";
    $scope.cif = ""; 
    $scope.listCPRs = [];

    $scope.commercial = false;
    $scope.customersegment = null;
    $scope.copyCPRPanelModel = {
        applicationDataCapture: true,
        borrowerProfile: true,
        facility: true,
        security: true,
        valuation: false,
        scoreCard: false,
        trialCalculation: false,
        incomeAndExpenditure: false,
        assets: false,
        liabilities: false,
        bankAccount: false,
        cRIBUpload: false,
        documentChecklist: false,
        financialAnalysis: false,
        taxInformation: false,
        cRIBAnalysis: false,
        businessProfie: false,
        personalProposalLiability: false,
        pastPerformanceBG: false,
        totalExposure: false,
        importExportPerformance: false,
        industrialAnalysis: false,
        essentialCodes: false,
        liabilitiesSanctionHistory: false,
        physicalExpansionGrowth: false,
        repaymennt: false,
        sWOT: false,
        riskAnalysis: false,
        branchPosition: false,
        limitedCompanies: false,
        turnOver: false,
        keyRatios: false,
        cashFlow: false,
        financialPerformance: false,
        waiver: false,
        deferral:false,
        workingCapital: false,
        dSCR: false,
        businessInvestment: false,
        cprBusinessSupportingPapers: false,
        cprBorrowerExposure: false,
        accountPerformance: false,
        environmentalCategory: false,
        projectNeedAssessment: false,
        insuranceDetail: false,
        stockPosition: false,
        cprType:'New'
    };
    $scope.selectall = false;
    $scope.deselectall = false;
    $scope.disableForRenewalEnhancement = false;
    function SearchCIF() {
        try {
            $http({
                url: "/CPRV2/GetCPRsByCIF",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cif: $scope.cif })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCPRs = response.data.output.listCIFss;
                $scope.listCustomerSeg = response.data.output.listCustomerSegments;

                //for CPR Type Renewal and Enhamcement
               // if ($scope.cprinit.type.action != 'New') {
                if (common.cprInitiationType != 'New') {
                    $scope.SelectAllForRenewalEnhamcement();
                    $scope.copyCPRPanelModel.cprType = common.cprInitiationType;
                }
                else {
                    $scope.selectall = false;
                    $scope.disableForRenewalEnhancement = false;
                    $scope.copyCPRPanelModel.cprType = common.cprInitiationType;
                }
               
                // set inner div height
                setTimeout(function () {
                    var modalbodyheight = $("md-dialog").outerHeight() - 160;
                    $(".cif-box").css('max-height', modalbodyheight);
                }, 1000);
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("SearchCIF " + e)
        }
    }
    function InitiateCopyCPR(cprno) {
        try {
            common.preprocessload();
            dialogService.Hide();
            $http({
                url: "/CPRV2/InitiateCopyCPR",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprno: cprno, copyCPRPanelModel: $scope.copyCPRPanelModel })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._initiatecprmessage).then(function () {
                        window.location.href = common.cprRedirectUrl.replace("@cprno", response.data.output);
                    });
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }

            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("InitiateCopyCPR "+e)
        }
    }

    function InitiateCopyCPRNew(cprno) {
        try {
            common.preprocessload();
            dialogService.Hide();
            $http({
                url: "/CPRV2/InitiateCopyCPR",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprno: cprno, copyCPRPanelModel: $scope.copyCPRPanelModel })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._initiatecprmessage).then(function () {
                        window.location.href = common.cprRedirectUrl.replace("@cprno", response.data.output);
                    });
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }

            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("InitiateCopyCPR " + e)
        }
    }

    $scope.SearchCIF_ClickEvent = function () {
        SearchCIF();
    }

    $scope.InitiateCopyCPR_ClickEvent = function (cprno) {
       // InitiateCopyCPR(cprno);
        InitiateCopyCPRNew(cprno);
    }

    $scope.Select_ChangeEvent = function (item) {
        if (item && $scope.commercial != 'Commercial') {
            $scope.copyCPRPanelModel = {
                applicationDataCapture: true,
                borrowerProfile: true,
                facility: true,
                security: true,
                valuation: true,
                scoreCard: true,
                trialCalculation: true,
                incomeAndExpenditure: true,
                assets: true,
                liabilities: true,
                bankAccount: true,
                cRIBUpload: true,
                documentChecklist: true,
                financialAnalysis: true,
                taxInformation: true,
                cRIBAnalysis: true,
                businessProfie: false,
                personalProposalLiability: false,
                pastPerformanceBG: false,
                totalExposure: true,
                importExportPerformance: false,
                industrialAnalysis: false,
                essentialCodes: false,
                liabilitiesSanctionHistory: true,
                physicalExpansionGrowth: false,
                repaymennt: true,
                sWOT: true,
                riskAnalysis: true,
                branchPosition: true,
                limitedCompanies: true,
                turnOver: true,
                keyRatios: true,
                cashFlow: true,
                financialPerformance: true,
                waiver: true,
                deferral:true,
                workingCapital: true,
                dSCR: true,
                businessInvestment: true,
                cprBusinessSupportingPapers: true,
                cprBorrowerExposure: true,
                accountPerformance: true,
                environmentalCategory: true,
                projectNeedAssessment: true,
                insuranceDetail: true,
                stockPosition: true
            }
        }
        else if (item && $scope.commercial == 'Commercial') {
            $scope.copyCPRPanelModel = {
                applicationDataCapture: true,
                borrowerProfile: true,
                facility: true,
                security: true,
                valuation: true,
                scoreCard: true,
                trialCalculation: true,
                incomeAndExpenditure: true,
                assets: true,
                liabilities: true,
                bankAccount: true,
                cRIBUpload: true,
                documentChecklist: true,
                financialAnalysis: true,
                taxInformation: true,
                cRIBAnalysis: true,
                businessProfie: true,
                personalProposalLiability: true,
                pastPerformanceBG: true,
                totalExposure: true,
                importExportPerformance: true,
                industrialAnalysis: true,
                essentialCodes: true,
                liabilitiesSanctionHistory: true,
                physicalExpansionGrowth: true,
                repaymennt: true,
                sWOT: true,
                riskAnalysis: true,
                branchPosition: true,
                limitedCompanies: true,
                turnOver: true,
                keyRatios: true,
                cashFlow: true,
                financialPerformance: true,
                waiver: true,
                deferral:true,
                workingCapital: true,
                dSCR: true,
                businessInvestment: true,
                cprBusinessSupportingPapers: true,
                cprBorrowerExposure: true,
                accountPerformance: true,
                environmentalCategory: true,
                projectNeedAssessment: true,
                insuranceDetail: true,
                stockPosition: true
            }
        }           
        else {
            $scope.copyCPRPanelModel = {
                applicationDataCapture: true,
                borrowerProfile: true,
                facility: true,
                security: true,
                valuation: false,
                scoreCard: false,
                trialCalculation: false,
                incomeAndExpenditure: false,
                assets: false,
                liabilities: false,
                bankAccount: false,
                cRIBUpload: false,
                documentChecklist: false,
                financialAnalysis: false,
                taxInformation: false,
                cRIBAnalysis: false,
                businessProfie: false,
                personalProposalLiability: false,
                pastPerformanceBG: false,
                totalExposure: false,
                importExportPerformance: false,
                industrialAnalysis: false,
                essentialCodes: false,
                liabilitiesSanctionHistory: false,
                physicalExpansionGrowth: false,
                repaymennt: false,
                sWOT: false,
                riskAnalysis: false,
                branchPosition: false,
                limitedCompanies: false,
                turnOver: false,
                keyRatios: false,
                cashFlow: false,
                financialPerformance: false,
                waiver: false,
                deferral:false,
                workingCapital: false,
                dSCR: false,
                businessInvestment: false,
                cprBusinessSupportingPapers: false,
                cprBorrowerExposure: false,
                accountPerformance: false,
                environmentalCategory: false,
                projectNeedAssessment: false,
                insuranceDetail: false,
                stockPosition: false
            }
        }
    }
    $scope.checkValuationAndSecurity_ClickEvent = function ()
    {
        try {
            checkValuation();
        }
        catch (ex)
        {
            alert("Exception in checkValuationAndSecurity_ClickEvent "+ ex);
        }
    }
     //For CPR Type Renewal and Enhancement
    $scope.SelectAllForRenewalEnhamcement = function () {
        try {
           
            if (common.cprInitiationType != 'New') {
                $scope.selectall = true;
                $scope.disableForRenewalEnhancement = true;
                $scope.copyCPRPanelModel.cprType = common.cprInitiationType;
                $scope.copyCPRPanelModel = {
                    applicationDataCapture: true,
                    borrowerProfile: true,
                    facility: true,
                    security: true,
                    valuation: true,
                    scoreCard: true,
                    trialCalculation: true,
                    incomeAndExpenditure: true,
                    assets: true,
                    liabilities: true,
                    bankAccount: true,
                    cRIBUpload: true,
                    documentChecklist: true,
                    financialAnalysis: true,
                    taxInformation: true,
                    cRIBAnalysis: true,
                    businessProfie: true,
                    personalProposalLiability: true,
                    pastPerformanceBG: true,
                    totalExposure: true,
                    importExportPerformance: true,
                    industrialAnalysis: true,
                    essentialCodes: true,
                    liabilitiesSanctionHistory: true,
                    physicalExpansionGrowth: true,
                    repaymennt: true,
                    sWOT: true,
                    riskAnalysis: true,
                    branchPosition: true,
                    limitedCompanies: true,
                    turnOver: true,
                    keyRatios: true,
                    cashFlow: true,
                    financialPerformance: true,
                    waiver: true,
                    deferral:true,
                    workingCapital: true,
                    dSCR: true,
                    businessInvestment: true,
                    cprBusinessSupportingPapers: true,
                    cprBorrowerExposure: true,
                    accountPerformance: true,
                    environmentalCategory: true,
                    projectNeedAssessment: true,
                    insuranceDetail: true,
                    stockPosition: true
                }
            }
        } catch (ex) {
            alert("Exception in SelectAllForRenewalEnhamcement " + ex);
        }
    };
    function checkValuation()
    {
        if ($scope.copyCPRPanelModel.valuation === true) {
            $scope.copyCPRPanelModel.security = true;
        }
    }
    
}