(app.controller("FinancialAnalysisCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
    //Sanction Functions
    var cPrId = GetUrlParameters();
    $scope.PageTitle = "Financial Analysis";
    $scope.cprinit = {
        financialanalysis: {
            id: '',
            imgname: '',
            url: '',
            income: '',
            balance: '',
            cashflow: '',
            debatorage: '',
            stockage: '',
            creditorage: '',
            projectedcashflow: '',
            evaluatorcomments: ''
        },
        cPRFAConfigModel: {
            id: 0,
            faTemplateModel: null,
            fyId1: '',
            fyId2: '',
            fyId3: '',
            fyId4: '',
            fyId5: '',
            fyId6: '',
            fyId7: '',
            fyId8: '',
            fyId9: '',
            fyId10: '',
            fyId11: '',
            fyId12: '',
            fyId13: '',
            fyId14: '',
            fyId15: '',
            noofyear: 5,
            listFAItems: [],
            active: true
        },
    }
    //$scope.precprinit.financialanalysis = {};
    if ($scope.cprinit.financialanalysis == null) {
        $scope.cprinit.financialanalysis = {
            id: '',
            imgname: '',
            url: '',
            income: '',
            balance: '',
            cashflow: '',
            debatorage: '',
            stockage: '',
            creditorage: '',
            projectedcashflow: '',
            evaluatorcomments: '',
        };
    }


    Page_Load();
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            GetFinancialAnalysisByCprId(cprId);
            if (cprId == null) {

            } else {
                GetFAItemsByFATemplateId();

            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    $scope.selectedTemplate = $scope.cprinit.financialTemplateTypeModel;

    function GetFinancialAnalysisByCprId(cPrid) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetFinalcialAnalysisByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprinit.cPRFAConfigModel = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetFinancialAnalysisByCprId " + e);
        }
    };

    $scope.getIncomeStatementValue = function (item, val) {
        if (item.isSubtotal == true) {
            var total = 0;
            var i;
            for (i = 0; i < item.calculations.length; i++) {

                var item1 = $scope.selectedTemplate.listFAItems.find(x => x.id === item.calculations[i].incomeStatementId1);
                var item2 = $scope.selectedTemplate.listFAItems.find(x => x.id === item.calculations[i].incomeStatementId2);
                var value1 = getValue(item1, val);
                var value2 = getValue(item2, val);
                var preOp = item.calculations[i].preOp;
                var op = item.calculations[i].op;

                var rawValue = getCalculation(value1, value2, op);

                if (preOp == "NA") {
                    total += rawValue
                }
                else {
                    switch (preOp) {
                        case "+":
                            total = total + rawValue;
                            break;
                        case "-":
                            total = total - rawValue;
                            break;
                    }
                }
            }

            item.sign = total <= 0 ? "-" : "+";

            $scope.setItemValue(item, val, total);
            return total;
        }
        else {
            return getValue(item, val);
        }
    };
    $scope.calculateSubtotals = function () {
        setIncomeStatementSubTotals();
    };

    $scope.calculateNetWorth = function () {
        if ((!angular.isUndefined($scope.cprinit.accountPerformance.shownLiability)) && (!angular.isUndefined($scope.cprinit.accountPerformance.shownAsset))) {
            var net = $scope.cprinit.accountPerformance.shownAsset - $scope.cprinit.accountPerformance.shownLiability;
            $scope.cprinit.accountPerformance.netWorth = net;
        } else {
            $scope.cprinit.accountPerformance.netWorth = 0.0;
        }
    };



    $scope.addNewIncomeStatement = function () {

        var maxid = Math.max.apply(Math, $scope.selectedTemplate.listFAItems.map(function (o) { return o.id; }));
        var maxlevel = Math.max.apply(Math, $scope.selectedTemplate.listFAItems.map(function (o) { return o.level; }));
        var newid = maxid + 1;
        var newlevel = maxlevel + 1;

        var obj = {
            calculations: []
        };

        obj = {
            type: $scope.newItemType,
            id: newid,
            level: newlevel,
            heading: $scope.newItemTitle,
            sign: $scope.newItemSign,
            style: {
                "background-color": $scope.newItemBackgroundColor,
                "color": $scope.newItemForeColor,
                "font-weight": $scope.newItemForeWeight,
                "font-style": $scope.newItemFontItalic
            },
            isSubtotal: $scope.newItemIsSubtotal == "true" ? true : false,
            isSubHeading: $scope.newItemIsSubHeader == "true" ? true : false,
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: 0,
            value6: 0,
            value7: 0,
            value8: 0,
            value9: 0,
            value10: 0,
            value11: 0,
            value12: 0,
            value13: 0,
            value14: 0,
            value15: 0,

            calculations: $scope.newItemCalculations
        };

        $scope.selectedTemplate.listFAItems.push(obj);

        $scope.newItemTitle = "";
        $scope.newItemSign = "";
        $scope.newItemBackgroundColor = "";
        $scope.newItemForeColor = "";
        $scope.newItemForeWeight = "";
        $scope.newItemFontItalic = "";
        $scope.newItemIsSubtotal = "";
        $scope.newItemIsSubHeader = "";
        $scope.newItemCalculations = [];

        setIncomeStatementSubTotals();
    };

    $scope.ReGenerateFinancialAnalysis_ClickEvent = function () {
        var confirm = dialogService.ConfirmDialogWithYesNo('', "This will permanently delete all existing values. Do you want to proceed?");
        confirm.then(function () {
            DeleteFinancialAnalysisValues($scope.cprinit.cPRFAConfigModel);
            $scope.cprinit.cPRFAConfigModel.fy1 = null;
            $scope.cprinit.cPRFAConfigModel.fy2 = null;
            $scope.cprinit.cPRFAConfigModel.fy3 = null;
            $scope.cprinit.cPRFAConfigModel.fy4 = null;
            $scope.cprinit.cPRFAConfigModel.fy5 = null;
            $scope.cprinit.cPRFAConfigModel.fy6 = null;
            $scope.cprinit.cPRFAConfigModel.fy7 = null;
            $scope.cprinit.cPRFAConfigModel.fy8 = null;
            $scope.cprinit.cPRFAConfigModel.fy9 = null;
            $scope.cprinit.cPRFAConfigModel.fy10 = null;
            $scope.cprinit.cPRFAConfigModel.fy11 = null;
            $scope.cprinit.cPRFAConfigModel.fy12 = null;
            $scope.cprinit.cPRFAConfigModel.fy13 = null;
            $scope.cprinit.cPRFAConfigModel.fy14 = null;
            $scope.cprinit.cPRFAConfigModel.fy15 = null;
            $scope.faTemplate = null;
            $scope.cprinit.cPRFAConfigModel = null;
            //$scope.cprinit.cPRFAConfigModel.faTemplateModel = null;
            //$scope.cprinit.cPRFAConfigModel.noofyear = null;
        }, function () {

        });
    };

    $scope.GetFinancialAnalysisTemplate_ClickEvent = function (item) {
        if ($scope.cprinit.cPRFAConfigModel == null) {
            $scope.cprinit.cPRFAConfigModel = {
                id: 0,
                faTemplateModel: null,
                fyId1: '',
                fyId2: '',
                fyId3: '',
                fyId4: '',
                fyId5: '',
                fyId6: '',
                fyId7: '',
                fyId8: '',
                fyId9: '',
                fyId10: '',
                fyId11: '',
                fyId12: '',
                fyId13: '',
                fyId14: '',
                fyId15: '',
                noofyear: 5,
                listFAItems: [],
                active: true
            };
        }

        GetFAItemsByFATemplateId(item.selectedTemplate.id);
        $scope.cprinit.cPRFAConfigModel.faTemplateModel = item.selectedTemplate;
        $scope.cprinit.cPRFAConfigModel.noofyear = item.noofyear;

        $scope.calculateSubtotals();
    };

    function GetFAItemsByFATemplateId(fatemplateid) {
        common.preprocessload();
        try {
            $http({
                url: "/CPRV2/GetFAItemsByFATemplateId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { fATempalteId: fatemplateid }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprinit.cPRFAConfigModel.listFAItems = response.data.output;
                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetFAItemsByFATemplateId ' + e);
        }
    }

    function setItemValue(item, val, value) {
        switch (val) {
            case 1: item.value1 = value;
                break;
            case 2: item.value2 = value;
                break;
            case 3: item.value3 = value;
                break;
            case 4: item.value4 = value;
                break;
            case 5: item.value5 = value;
                break;
            case 6: item.value6 = value;
                break;
            case 7: item.value7 = value;
                break;
            case 8: item.value8 = value;
                break;
            case 9: item.value9 = value;
                break;
            case 10: item.value10 = value;
                break;
            case 11: item.value11 = value;
                break;
            case 12: item.value12 = value;
                break;
            case 13: item.value13 = value;
                break;
            case 14: item.value14 = value;
                break;
            case 15: item.value15 = value;
                break;
        }
    }

    function getCalculation(val1, val2, op) {
        switch (op) {
            case "+":
                return val1 + val2;
            case "-":
                return val1 - val2;
            case "/":
                return val1 / val2;
            case "*":
                return val1 * val2;
            default: return val1 + val2;
        }
    }

    function getValue(item, val) {
        switch (val) {
            case 1: return item.value1;
            case 2: return item.value2;
            case 3: return item.value3;
            case 4: return item.value4;
            case 5: return item.value5;
            case 6: return item.value6;
            case 7: return item.value7;
            case 8: return item.value8;
            case 9: return item.value9;
            case 10: return item.value10;
            case 11: return item.value11;
            case 12: return item.value12;
            case 13: return item.value13;
            case 14: return item.value14;
            case 15: return item.value15;
            default: return 0;
        }
    }



    function setIncomeStatementSubTotals() {

        if ($scope.cprinit.cPRFAConfigModel != null) {
            var totalColumns = $scope.cprinit.cPRFAConfigModel.noofyear; //Total Fiscal Years to show
            var i;
            for (i = 0; i < $scope.cprinit.cPRFAConfigModel.listFAItems.length; i++) {
                var item = $scope.cprinit.cPRFAConfigModel.listFAItems[i];
                if (item.novalues == true) {
                    item.colspan = totalColumns + 1;
                }
                else {
                    item.colspan = 0;
                }
                if (item.isSubtotal == true) {
                    var k;
                    var total;
                    for (k = 1; k <= totalColumns; k++) {
                        var val = k;
                        total = 0;
                        var j;
                        if (item.calculations != null) {
                            for (j = 0; j < item.calculations.length; j++) {
                                var item1;
                                var value1;
                                var item2;
                                var value2;
                                if (item.calculations[j].incomeStatementId1 > 0) {
                                    item1 = $scope.cprinit.cPRFAConfigModel.listFAItems.find(x => x.id === item.calculations[j].incomeStatementId1);
                                    if ((item.calculations[j].incomeStatement1Val > 0 && val < totalColumns) || (item.calculations[j].incomeStatement1Val < 0 && val > 1)) {
                                        var valindex = val + item.calculations[j].incomeStatement1Val;
                                        if (valindex > 0 && valindex <= totalColumns) {
                                            value1 = getValue(item1, valindex);
                                        }
                                        else {
                                            value1 = 0 / 0;
                                        }
                                    } else if (item.calculations[j].incomeStatement1Val < 0 && val == 1) {
                                        value1 = 0;
                                    }
                                    else {
                                        value1 = getValue(item1, val);
                                    }
                                }
                                else if (item.calculations[j].incomeStatementId1 < 0) {
                                    value1 = item.calculations[j].constantNumber;
                                }
                                else {
                                    value1 = 0;
                                }

                                if (item.calculations[j].incomeStatementId2 > 0) {
                                    item2 = $scope.cprinit.cPRFAConfigModel.listFAItems.find(x => x.id === item.calculations[j].incomeStatementId2);
                                    if ((item.calculations[j].incomeStatement2Val > 0 && val < totalColumns) || (item.calculations[j].incomeStatement2Val < 0 && val > 1)) {
                                        var valindex = val + item.calculations[j].incomeStatement2Val;
                                        if (valindex > 0 && valindex <= totalColumns) {
                                            value2 = getValue(item2, valindex);
                                        }
                                        else {
                                            value2 = 0 / 0;
                                        }
                                    }
                                    else {
                                        value2 = getValue(item2, val);
                                    }
                                }
                                else if (item.calculations[j].incomeStatementId2 < 0) {
                                    value2 = item.calculations[j].constantNumber;
                                }
                                else {
                                    value2 = 0;
                                }

                                var preOp = item.calculations[j].preOp;
                                var op = item.calculations[j].op;
                                var rawValue = getCalculation(value1, value2, op);
                                if (preOp == "NA") {
                                    total += rawValue
                                }
                                else {
                                    switch (preOp) {
                                        case "+":
                                            total = total + rawValue;
                                            break;
                                        case "-":
                                            total = total - rawValue;
                                            break;
                                        case "/":
                                            total = total / rawValue;
                                            break;
                                        case "*":
                                            total = total * rawValue;
                                            break;
                                    }
                                }
                            }
                        }

                        setItemValue(item, val, total);
                    }
                }
            }
        }
    }

    function DeleteFinancialAnalysisValues(faconfig) {
        try {
            common.preprocessload();
            if (faconfig != null) {
                var i;
                for (i = 0; i < faconfig.listFAItems.length; i++) {
                    var item = faconfig.listFAItems[i];
                    if (item.isSubtotal == false && item.novalues == false) {
                        item.value1 = 0;
                        item.value2 = 0;
                        item.value3 = 0;
                        item.value4 = 0;
                        item.value5 = 0;
                        item.value6 = 0;
                        item.value7 = 0;
                        item.value8 = 0;
                        item.value9 = 0;
                        item.value10 = 0;
                        item.value11 = 0;
                        item.value12 = 0;
                        item.value13 = 0;
                        item.value14 = 0;
                        item.value15 = 0;
                    }
                }

                //if FAConfig not null
                if ($scope.cprinit.cPRFAConfigModel.id != 0) {
                    $http({
                        url: "/CPRV2/DeleteCPRFinancialAnalysisValues",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { financialAnalysisConfigId: faconfig.id }
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            //success
                            common.preprocesshide();
                        }
                    }, function errorCallback(response) {
                        $scope.error = response;
                        common.preprocesshide();
                    });
                } else {
                    common.preprocesshide();
                }
            }
            else {
                common.preprocesshide();
            }
        } catch (e) {
            common.preprocesshide();
            alert("DeleteFinancialAnalysisValues: " + e);
        }
    }

    function GetAllFiscalYear() {
        try {
            $http({
                url: "/CPRV2/GetAllFiscalYear",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.financialYearslist = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetAllFiscalYear ' + e);
        }
    }

    function SaveFinancialAnalysisFunctionNP() {
        try {
            cPrId = GetUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveFinancialAnalysisFunctionNP",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRFAConfigModel: $scope.cprinit.cPRFAConfigModel, cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        GetFinancialAnalysisByCprId(cPrId);
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        //$scope.cprinit.cPRFAConfigModel = response.data.output;
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
            alert("Exception FinancialAnalysisFunctionNP: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    };

    $scope.SubmitFinancialAnalysis_ClickEvent = function () {
        try {
            SaveFinancialAnalysisFunctionNP();
        } catch (e) {
            alert('SubmitFinancialAnalysis_ClickEvent ' + e);
        }
    }

    function ResetFinancialAnalysis() {
        $scope.cprinit = {
            financialanalysis: {
                id: '',
                imgname: '',
                url: '',
                income: '',
                balance: '',
                cashflow: '',
                debatorage: '',
                stockage: '',
                creditorage: '',
                projectedcashflow: '',
                evaluatorcomments: ''
            },
            cPRFAConfigModel: {
                id: 0,
                faTemplateModel: null,
                fyId1: '',
                fyId2: '',
                fyId3: '',
                fyId4: '',
                fyId5: '',
                fyId6: '',
                fyId7: '',
                fyId8: '',
                fyId9: '',
                fyId10: '',
                fyId11: '',
                fyId12: '',
                fyId13: '',
                fyId14: '',
                fyId15: '',
                noofyear: 5,
                listFAItems: [],
                active: true
            },
        }
    }

}));