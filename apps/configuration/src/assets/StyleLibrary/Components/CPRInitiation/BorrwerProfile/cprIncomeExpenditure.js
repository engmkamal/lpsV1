(app.controller("cprIncomeExpenditureCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.cPId = $scope.borrowerprofile.id;
    $scope.borrowerprofile.totaltax = common.totaltax;
    $scope.isValidAmount = false;
    $scope.isDeasible = true;
    $scope.evaluationComments = {
        income: null,
        expenditure: null
    };
    $scope.borrowerprofile = {
        listMonthlyIncome: [],
        listMonthlyExpenditure: [],
        totaltax: 0,
    };
    $scope.monthlyTotalExpense = 0;
    $scope.monthlyTotalIncome = 0;
    $scope.listMonthlyIncome = [];
    $scope.monthlyincome = {
        id: '',
        type: '',
        amount: 0,
        isDSCR: false,
        active: false
    };
    $scope.totalMonthlyincome = 0;
    $scope.totalMonthlyexpenditure = 0;
    $scope.monthlyexpenditure = {
        id: '',
        type: '',
        amount: 0,
        total: '',
        debtratio: '',
        isDSCR: false,
        evalutorscomment: '',
        active: false
    };
    $scope.listMonthlyExpenditure = [];
    //This JS moved to cprinitiation.ctrl.js because change tab(Applicant,Joint,Gurantor) work in cprinitiation.ctrl.js.
    $scope.Page_Load = function () {
        try {
            $scope.borrowerprofile.totaltax = common.totaltax;
            common.pageloadhide();
            //GetMonthlyIncome();
            //GetMonthlyExpenditure();
            GetMonthlyIncomeByCpId();
            GetMonthlyExpenditureByCpId();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    $scope.validAmount = function (amount) {
        if (amount < 0) {
            $scope.isValidAmount = true;
            $scope.isDeasible = true;
        }
        else {
            $scope.isValidAmount = false;
            $scope.isDeasible = false;
        }
    }

    function GetMonthlyIncomeByCpId() {
        try {
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetMonthlyIncomeByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId, cprId: cprId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //listMonthlyIncome = [];
                    $scope.incomeExpenditureMapper = response.data.output;
                    if ($scope.incomeExpenditureMapper.monthlyIncomeList != null) {
                        $scope.borrowerprofile.listMonthlyIncome = $scope.incomeExpenditureMapper.monthlyIncomeList;
                        $scope.evaluationComments.income = $scope.incomeExpenditureMapper.evaluationComments;
                    }
                    else {
                        GetMonthlyIncome();
                    }
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
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetMonthlyExpneditureByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId, cprId: cprId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //$scope.listMonthlyExpenditure = [];
                    $scope.incomeExpenditureMapper = response.data.output;
                    if ($scope.incomeExpenditureMapper.monthlyExpenditureList != null) {
                        $scope.borrowerprofile.listMonthlyExpenditure = $scope.incomeExpenditureMapper.monthlyExpenditureList;
                        $scope.evaluationComments.expenditure = $scope.incomeExpenditureMapper.evaluationComments;

                    }
                    else {
                        GetMonthlyExpenditure();
                    }

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    $scope.GetMITotal = function () {
        var total = 0;
        if ($scope.borrowerprofile.listMonthlyIncome != null) {
            for (count = 0; count < $scope.borrowerprofile.listMonthlyIncome.length; count++) {
                if (!isNaN($scope.borrowerprofile.listMonthlyIncome[count].amount))
                    total += parseFloat($scope.borrowerprofile.listMonthlyIncome[count].amount, 10);
            }
            $scope.totalMonthlyincome = total;
            var totalwithcommas = formatNumber(total);
            return totalwithcommas;
        }

        return '0';

    };

    $scope.GetMETotal = function () {
        var total = 0;
        if ($scope.borrowerprofile.listMonthlyExpenditure !== null) {
            for (count = 0; count < $scope.borrowerprofile.listMonthlyExpenditure.length; count++) {
                if (!isNaN($scope.borrowerprofile.listMonthlyExpenditure[count].amount))
                    total += parseFloat($scope.borrowerprofile.listMonthlyExpenditure[count].amount, 10);
            }
            $scope.totalMonthlyexpenditure = total;
            var totalwithcommas = formatNumber(total);
            return totalwithcommas;
        }
        return null;
    };

    function GetMonthlyIncome() {
        try {
            $http({
                url: "/CPRV2/GetMonthlyIncome",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listMonthlyIncome = [];
                    listMonthlyIncome = response.data.output;

                    angular.forEach(listMonthlyIncome, function (value) {
                        $scope.borrowerprofile.listMonthlyIncome.push(value);
                    });
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetMonthlyIncome: " + e);
        }
    }
    function GetMonthlyExpenditure() {
        try {
            $http({
                url: "/CPRV2/GetMonthlyExpenditure",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listMonthlyExpenditure = [];
                    listMonthlyExpenditure = response.data.output;

                    angular.forEach(listMonthlyExpenditure, function (value) {
                        $scope.borrowerprofile.listMonthlyExpenditure.push(value);
                    });
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetMonthlyExpenditure: " + e);
        }
    }
    $scope.AddMonthlyIncome_ClickEvent = function () {
        try {
            if ($scope.monthlyincome.amount > 0 && $scope.monthlyincome.type != '') {
                $scope.monthlyincome.active = true;
                $scope.borrowerprofile.listMonthlyIncome.push($scope.monthlyincome);
                $scope.monthlyincome = {
                    id: '',
                    type: '',
                    amount: 0,
                    isDSCR: false,
                    active: true
                };
                // ResetMonthlyIncome();
                $('#addincomemodal').modal('toggle');
            } else {
                dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0 And Type is Mandatory");
            }

        } catch (e) {
            alert("AddMonthlyIncome_ClickEvent Error: " + e);
        }
    };

    $scope.ResetMonthlyIncome_ClickEvent = function () {
        //monthlyincome = null;
        ResetMonthlyIncome();
    };

    function ResetMonthlyIncome() {
        $scope.monthlyincome = {
            id: '',
            type: '',
            amount: 0,
            isDSCR: false,
            active: false

        };
        //$scope.addnewincomeform.$setPristine();
        //$scope.addnewincomeform.$setUntouched();
    }

    $scope.RemoveItemFromlistMonthlyIncome = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null || item.id == "")
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistMonthlyIncome Error: " + e);
        }
    };
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
            total = total.toFixed(2);
            $scope.monthlyTotalIncome = total;
            total = addCommas(total);
            return total;
        } catch (e) {
            alert('Exception GetTotalDSCR ' + e);
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
            total = total.toFixed(2);
            //for BBL DBR
            $scope.monthlyTotalExpense = total;
            total = addCommas(total);
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
            $scope.monthlyTotalIncome = total;
            total = addCommas(total);

            return total;
        } catch (e) {
            alert('Exception GetTotalNetIncome ' + e);
        }
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
    $scope.burdenRatio = 0;
    $scope.CalDBRNew = function () {
        try {
            //$scope.monthlyTotalIncome = $scope.GetMITotal(); //this gets total of uncheck DRR row
            //$scope.monthlyTotalExpense = $scope.GetMETotal();//this gets total of uncheck DRR row
            ///$scope.monthlyTotalNetIncome AND $scope.monthlyTotalExpense values come from GetTotalNetIncome() and GetTotalDSCRExpense(list)

            if (parseFloat($scope.monthlyTotalIncome) > 0 && parseFloat($scope.monthlyTotalExpense) > 0 && $scope.borrowerprofile.individual !== null) {

                $scope.burdenRatio = (parseFloat($scope.monthlyTotalExpense) / parseFloat($scope.monthlyTotalIncome)) * 100;
            }
            else {
                $scope.burdenRatio = 0;
            }
        } catch (ex) {
            alert("Exception in CalDBRNew " + ex);
        }
    };
    $scope.SubmitMonthlyIncome_ClickEvent = function () {
        try {
            if ($scope.totalMonthlyincome > 0)
                SaveMonthlyIncome();
            else
                dialogService.ConfirmDialogWithOkay('', "Please input at least one income option");
        } catch (e) {
            alert("SubmitMonthlyIncome_ClickEvent error" + e);
        }
    };
    function SaveMonthlyIncome() {
        try {
            var cpId = common.borrowerprofile.id;
            var cprId = GetUrlParameters();
            if (cpId != '') {
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveMonthlyIncome",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listMonthlyIncomeModel: $scope.borrowerprofile.listMonthlyIncome,
                        incomeComment: $scope.evaluationComments.income, cprId: cprId, cprClientProfileId: cpId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        // alert("Success");
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                        $scope.borrowerprofile.listMonthlyIncome = response.data.output;

                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {

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
            }

            else {
                dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
            }

        } catch (e) {
            common.preprocesshide();
            alert('SaveMonthlyIncome ' + e);
        }
    }

    $scope.AddMonthlyExpenditure_ClickEvent = function () {
        try {
            if ($scope.monthlyexpenditure.amount > 0 && $scope.monthlyexpenditure.expenditure != '') {
                $scope.monthlyexpenditure.active = true;
                $scope.borrowerprofile.listMonthlyExpenditure.push($scope.monthlyexpenditure);
                ResetMonthlyExpenditure();
                $('#addExpenmodal').modal('toggle');
            } else {
                dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0 And Type is Mandatory");
            }

        } catch (e) {
            alert("AddMonthlyExpenditure_ClickEvent Error: " + e);
        }
    };
    $scope.ResetMonthlyExpenditure_ClickEvent = function () {
        ResetMonthlyExpenditure();
    };
    function ResetMonthlyExpenditure() {
        $scope.monthlyexpenditure = {
            id: '',
            type: '',
            amount: '',
            total: '',
            debtratio: '',
            isDSCR: false,
            evalutorscomment: '',
            active: false
        };
        //$scope.addnewexpenditureform.$setPristine();
        //$scope.addnewexpenditureform.$setUntouched();
    }
    $scope.RemoveItemFromlistMonthlyExpenditure = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null || item.id == "")
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistMonthlyExpenditure Error: " + e);
        }
    };

    $scope.SubmitMonthlyExpenditure_ClickEvent = function () {
        try {
            if ($scope.totalMonthlyexpenditure > 0)
                SaveMonthlyExpenditure();
            else
                dialogService.ConfirmDialogWithOkay('', "Please input at least one expense option");
        } catch (e) {
            alert("SubmitMonthlyExpenditure_ClickEvent error" + e);
        }
    };

    function SaveMonthlyExpenditure() {
        try {
            var cpId = common.borrowerprofile.id;
            var cprId = GetUrlParameters();
            if (cpId != '') {
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveMonthlyExpenditure",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listMonthlyExpenditureModel: $scope.borrowerprofile.listMonthlyExpenditure,
                        expenditureComment: $scope.evaluationComments.expenditure, cprId: cprId, cprClientProfileId: cpId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        // alert("Success");
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            $scope.borrowerprofile.listMonthlyExpenditure = response.data.output;

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
            }
            else {
                dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
            }

        } catch (e) {
            common.preprocesshide();
            alert('SaveMonthlyExpenditure ' + e);
        }
    }




    $scope.Page_Load();

}));