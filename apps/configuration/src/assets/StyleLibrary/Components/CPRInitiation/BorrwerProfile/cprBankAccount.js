(app.controller("cprBankAccountCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.isDiseable = true;
    $scope.isEdited = false;
    $scope.isAccDepositEdited = false;
    $scope.isExistingEdited = false;
    $scope.isAccountTurnOverEdited = false;
    $scope.cPId = $scope.borrowerprofile.id;
    var cifId = $scope.borrowerprofile.id;
    var listAllUdf = $scope.listAllUDF;
    $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
    $scope.borrowerprofile = {
        listOtherAccount: [],
        listBankaccountdetails: [],
        listClientAccountMovementTurnover: [],
        listClientAccountDepositDetailModel: [],
    };
   // Existing Bank Account
   $scope.existingBankaccountdetail = {
       id: null,
       name: null,
       branchname: null,
       accountnumber: null,
       accounttype: null,
       currentbalance: null,
       isExisting: true,
       listUDFValues: [],
       accountOpenDate: null,
       active: true
    };

    // Other Bank Account
    $scope.bankaccountdetails = {
        id: null,
        name: null,
        branchname: null,
        accountnumber: null,
        accounttype: null,
        currentbalance: null,
        isExisting: false,
        listUDFValues: [],
        active: true
    };

    $scope.listUdfValues = [];
   // Account Movement Turnover
   $scope.accountMovementTurnover = {
       id: null,
       accountNo: null,
       periodFrom: null,
       periodTo: null,
       sanctionedLimit: null,
       beginningBalance: null,
       sumOfDebit: null,
       noOfDebit: null,
       sumOfCredit: null,
       noOfCredit: null,
       endingBalance: null,
       highestWithdrawal: null,
       lowestWithdrawal: null,
       lowestBalance: null,
       highestBalance: null,
       noOfTransactionOccured: null,
       accountTurnover: null,
       active: true
    };

    // Account Deposit Details
    $scope.customerAccountDepositDetail = {
        id: null,
        cPRClientProfileId: null,
        accountNo: null,
        depositDate: null,
        customerCIF: null,
        customerName: null,
        customerDeposit: null,
        alliedCIF: null,
        alliedName: null,
        alliedAccountNumber: null,
        alliedDeposit: null,
        isAllied: false,
        active: true
    };
    $scope.alliedAccountDepositDetail = {
        id: null,
        cPRClientProfileId: null,
        accountNo: null,
        depositDate: null,
        customerCIF: null,
        customerName: null,
        customerDeposit: null,
        alliedCIF: null,
        alliedName: null,
        alliedAccountNumber: null,
        alliedDeposit: null,
        isAllied: true,
        active: true
    };

    // Comment on Conduct Of Account
    $scope.clientCommentOnConductOfAccountModel = {
        id: 0,
        cPRClientProfileId: 0,
        depositACTransaction: '',
        loanACTransactionRepayment: '',
        otherComment: '',
        active: true
    };

    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    //$scope.currentDate = new Date();

    $scope.Page_Load = function () {
        try {           
            var cprId = GetUrlParameters();
            
            GetOtherAndExistingBankAccountByCifId();

            //GetOtherAccountByCpId();
            GetAccountDepositDetailByCpId();
            GetAccountMovementTurnOverByCpId();
            GetCommentOnCunductAccountByCpId();
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };
  
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    $scope.NonNegetiveValue = function (value) {
        if (value < 0) {
            dialogService.ConfirmDialogWithOkay('', "Value should not be negetive");
            $scope.isDiseable = false;
        }
        else {
            $scope.isDiseable = true;
        }
    };

    //  Existing Bank Account
    function GetOtherAndExistingBankAccountByCifId() {
        try {
            $http({
                url: "/CPRV2/GetOtherAndExistingBankAccountByCifId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId  })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listBankaccountdetails = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
        
    }
   
    $scope.AddExistingBankaccountDetails_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listBankaccountdetails.length == 0 || $scope.borrowerprofile.listBankaccountdetails == null) {
                $scope.borrowerprofile.listBankaccountdetails = [];
            }
            if ($scope.existingBankaccountdetail.currentbalance > 0) {
                $scope.existingBankaccountdetail.isExisting = true;
                $scope.borrowerprofile.listBankaccountdetails.push($scope.existingBankaccountdetail);
                $scope.ResetExistingBankaccountDetailsTable_ClickEvent();
                $scope.isExistingEdited = false;
            } else {
                dialogService.ConfirmDialogWithOkay('', "Amount should not be negetive");
            }
            

        } catch (e) {
            alert("AddExistingBankaccountDetails_ClickEvent error" + e);
        }

    };

    $scope.ResetExistingBankaccountDetailsTable_ClickEvent = function () {
        $scope.existingBankaccountdetail = {
            id: null,
            name: null,
            branchname: null,
            accountnumber: null,
            accounttype: null,
            currentbalance: null,
            isExisting: true,
            listUDFValues: [],
            accountOpenDate: null,
            active: true
        };
        //$scope.addbankaccountdetailsform.$setUntouched();
        //$scope.addbankaccountdetailsform.$setPristine();
    };

    $scope.SubmitExistingBankAccount_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listBankaccountdetails.length != 0) {
                SaveExistingBankAccount();
            } else {
                dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
            }
            
        } catch (e) {
            alert("SubmitExistingBankAccount_ClickEvent error" + e);
        }
    };

    function SaveExistingBankAccount() {
        try {
            var cprId = GetUrlParameters();
            var clientProfileId = common.borrowerprofile.id;
            if (clientProfileId != '') {
                $scope.bankaccountdetails.listUDFValues = listAllUdf;
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveExistingBankAccount",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listBankAccountDetailsModel: $scope.borrowerprofile.listBankaccountdetails, listCPRUDF: $scope.listUdfValues,
                        cPRId: cprId, cprClientProfileId: clientProfileId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        // alert("Success");
                        $scope.borrowerprofile.listBankaccountdetails = response.data.output;
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            //ResetExistingBankAccount();

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
            } else {
                dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
            }
          
        } catch (e) {
            common.preprocesshide();
            alert('SaveSWOTByApproval ' + e);
        }
    }

    $scope.SubmitOtherAccount_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listBankaccountdetails.length > 0 || $scope.listUdfValues.length > 0) {
                SaveOtherBankAccount();
            } else {
                dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
            }
           
        } catch (e) {
            alert("SubmitOtherAccount_ClickEvent error" + e);
        }
    };
    function SaveOtherBankAccount() {
        try {
            var cprId = GetUrlParameters();
            var clientProfileId = common.borrowerprofile.id;
            if (clientProfileId != '') {
                $scope.bankaccountdetails.listUDFValues = listAllUdf;
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveExistingBankAccount",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listBankAccountDetailsModel: $scope.borrowerprofile.listBankaccountdetails, listCPRUDF: $scope.listUdfValues,
                        cPRId: cprId, cprClientProfileId: clientProfileId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listBankaccountdetails = response.data.output;
                        // alert("Success");
                        //GetOtherAndExistingBankAccountByCpId();
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            //ResetExistingBankAccount();      
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
            } else {
                dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
            }
          
        } catch (e) {
            common.preprocesshide();
            alert('SaveOtherBankAccount ' + e);
        }
    }
    // Other Bank Account 

    function GetOtherAccountByCpId() {
        try {
            var clientProfileId = cifId;
            $http({
                url: "/CPRV2/GetOtherAccountByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: clientProfileId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listBankaccountdetails = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetOtherAccountByCpId " + e);
        }
    }
    $scope.AddBankaccountDetails_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listBankaccountdetails == null) {
                $scope.borrowerprofile.listBankaccountdetails = [];
            }
            if ($scope.bankaccountdetails.currentbalance > 0) {
                $scope.bankaccountdetails.isExisting = false;
                $scope.borrowerprofile.listBankaccountdetails.push($scope.bankaccountdetails);
                $scope.ResetBankaccountDetailsTable_ClickEvent();
            } else {
                dialogService.ConfirmDialogWithOkay('', "Amount should not be negetive");
            }
                  

        } catch (e) {
            alert("AddBankaccountDetails_ClickEvent error" + e);
        }

    };

    $scope.EditItemFromBankAccountDetailList = function (rowtoedit) {
        try {
            if ($scope.listOtherAccount == null)
                $scope.listOtherAccount = {};

            $scope.bankaccountdetails = rowtoedit;

            var index = $scope.borrowerprofile.listBankaccountdetails.indexOf(rowtoedit);
            $scope.borrowerprofile.listBankaccountdetails.splice(index, 1);

        } catch (e) {
            alert("Exception EditItemFromBankAccountDetailList" + e);
        }
    };
    $scope.EditItemFromExistingBankAccountDetailList = function (rowtoedit) {
        try {
            if ($scope.existingBankaccountdetail == null)
                $scope.existingBankaccountdetail = {};

            $scope.existingBankaccountdetail = rowtoedit;

            var index = $scope.borrowerprofile.listBankaccountdetails.indexOf(rowtoedit);
            $scope.borrowerprofile.listBankaccountdetails.splice(index, 1);
            $scope.isExistingEdited = true;

        } catch (e) {
            alert("Exception EditItemFromBankAccountDetailList" + e);
        }
    };
    $scope.RemoveItemFromlistBankAccount = function (list, item) {
        try {

            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else {
                    common.SetActiveFalseForRemovedItem(list, item);
                    //var index = list.indexOf(item);

                    //$scope.borrowerprofile.listBankaccountdetails.splice(index, 1);
                }
                    
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistBankAccount Error: " + e);
        }
    };

    $scope.ResetBankaccountDetailsTable_ClickEvent = function () {
        $scope.bankaccountdetails = {
            id: 0,
            name: null,
            branchname: null,
            accountnumber: null,
            accounttype: null,
            currentbalance: null,
            isExisting: false,
            listUDFValues: [],
            active: true
        };
        //$scope.addbankaccountdetailsform.$setUntouched();
        //$scope.addbankaccountdetailsform.$setPristine();
    };

    function generateNewUDFRow(item, list) {

        var tempColValues = [];
        angular.forEach(item.listUDFColumn, function (col) {
            //Check if Lookup
            if (col.dataType == 'Lookup' && col.expression != undefined && col.expression != null)
                $scope.evaluateUDF_ClickEvent(col, item.listUDFColumn);

            var colValue = col.value;
            if (col.dataType == 'Date')
                colValue = Date.parse(col.value);

            var tempCol = {};
            angular.copy({
                id: col.id,
                label: col.label,
                dataType: col.dataType,
                expression: col.expression,
                value: colValue
            }, tempCol);
            tempColValues.push(tempCol);
        });

        if (list != null) {
            var obj = list.find(x => x.udfMasterId === item.id);
            if (obj == undefined) {
                var newUDFValue = {
                    udfMasterId: item.id,
                    title: item.title,
                    rows: [{
                        cols: tempColValues
                    }]
                };
                list.push(newUDFValue);
            } else {
                if (obj.rows == null)
                    obj.rows = [];
                var newrow = {
                    cols: tempColValues
                };
                obj.rows.push(newrow);
            }
        } else {
            var newUDFValue1 = {
                udfMasterId: item.id,
                title: item.title,
                rows: [{
                    cols: tempColValues
                }]
            };
            list.push(newUDFValue1);
        }
    }

    $scope.AddUDFValueBtn_ClickEvent = function (item, list) {
        try {
            //if (list == undefined)
            //    list = [];
            generateNewUDFRow(item, list);
            $scope.ResetUDFValueBtn_ClickEvent(item);

            var formName = 'udfForm' + item.id;
            $scope.resetForm(formName);
        } catch (e) {
            alert("Exception AddUDFValueBtn_ClickEvent " + e);
        }
    };

    $scope.RemoveUDFValueBtn_ClickEvent = function (udf, row, list) {
        try {
            var udfIndex = list.indexOf(udf);
            var rowIndex = udf.rows.indexOf(row);
            list[udfIndex].rows.splice(rowIndex, 1);
        } catch (e) {
            alert("Exception RemoveUDFValueBtn_ClickEvent " + e);
        }
    };

    $scope.EditUDFValueItem_ClickEvent = function (selectUdf, row, udflist, list) {
        try {
            var index = GetArrayIndexByValue(udflist, "id", selectUdf.udfMasterId);
            var udf = udflist[index];
            angular.forEach(udf.listUDFColumn, function (col) {
                var fieldIndex = GetArrayIndexByValue(row.cols, "id", col.id);
                var field = row.cols[fieldIndex];
                switch (col.dataType) {
                    case "Number":
                        col.value = Number(field.value);
                        break;
                    case "Date":
                        //col.value = new Date();
                        col.value = new Date(Number(field.value.toString()));
                        break;
                    default:
                        col.value = field.value;
                }
            });

            var spliceUdf = list.indexOf(selectUdf);
            var spliceRow = selectUdf.rows.indexOf(row);
            list[spliceUdf].rows.splice(spliceRow, 1);
        } catch (e) {
            alert("Exception EditUDFValueItem_ClickEvent " + e);
        }
    };
    
    // Account Movement Turnover
    function GetAccountMovementTurnOverByCpId() {
        try {
            $http({
                url: "/CPRV2/GetAccountMovementTurnOverByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId  })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.borrowerprofile.listClientAccountMovementTurnover = response.data.output;

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

    $scope.GetEndingBalance = function () {
        var totalEndingBalance = 0;
        if ($scope.accountMovementTurnover != null)
            if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.beginningBalance) > 0 || parseFloat($scope.accountMovementTurnover.sumOfDebit) > 0) {
                totalEndingBalance = parseFloat($scope.accountMovementTurnover.beginningBalance) + parseFloat($scope.accountMovementTurnover.sumOfDebit) - parseFloat($scope.accountMovementTurnover.sumOfCredit);
                var totalwithcommas = formatNumber(totalEndingBalance);
                $scope.accountMovementTurnover.endingBalance = totalwithcommas;
/*                $scope.accountMovementTurnover.endingBalance = totalEndingBalance;*/
                return totalwithcommas;
            }
        return 0;
    };

    //$scope.GetTotalAccountTurnOver = function () {
    //    var totalTurnover = 0;
    //    if ($scope.accountMovementTurnover != null)
    //        if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.sanctionedLimit) > 0) {
    //            totalTurnover = parseFloat($scope.accountMovementTurnover.sumOfCredit) / parseFloat($scope.accountMovementTurnover.sanctionedLimit);
    //            var totalwithcommas = formatNumber(totalTurnover);
    //            $scope.accountMovementTurnover.accountTurnover = totalwithcommas;
               
    //            return totalwithcommas;
    //        }
    //    return 0;
    //};

    $scope.GetTotalAccountTurnOver = function () {
        var totalTurnover = 0;
        if ($scope.accountMovementTurnover != null)
            if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.sanctionedLimit) > 0) {
                totalTurnover = parseFloat($scope.sumOfCredit) / parseFloat($scope.sanctionLimit);
                var totalwithcommas = formatNumber(totalTurnover);
                $scope.accountMovementTurnover.accountTurnover = totalwithcommas;

                return totalwithcommas;
            }
        return 0;
    };

    $scope.GetSumOfCredit = function (sumOfCredit) {
        $scope.sumOfCredit = sumOfCredit;
    }

    $scope.GetSanctionLimit = function (sanctionLimit) {
        $scope.sanctionLimit = sanctionLimit;
    }

    $scope.AddAcoountMovementTurnover_ClickEvent = function () {
        try {

            if ($scope.accountMovementTurnover.sanctionedLimit != null && $scope.accountMovementTurnover.beginningBalance != null && $scope.accountMovementTurnover.sumOfDebit != null && $scope.accountMovementTurnover.sumOfCredit != null) {
                if ($scope.borrowerprofile.listClientAccountMovementTurnover == null) {
                    $scope.borrowerprofile.listClientAccountMovementTurnover = [];
                }
                $scope.borrowerprofile.listClientAccountMovementTurnover.push($scope.accountMovementTurnover);
                $scope.ResetAccountMovementTurnover_ClickEvent();
                $scope.isAccountTurnOverEdited = false;
            }
            else {
                dialogService.ConfirmDialogWithOkay("", 'Please enter required field');
            }

        } catch (e) {
            alert("AddAcoountMovementTurnover_ClickEvent error" + e);
        }
    };

    $scope.EditItemFromAccountMovementTurnoverList = function (rowtoedit) {
        try {
            if ($scope.accountMovementTurnover == null)
                $scope.accountMovementTurnover = {};
            rowtoedit.periodFrom = $filter('date')(rowtoedit.periodFrom, "dd-MM-yyyy");
            rowtoedit.periodTo = $filter('date')(rowtoedit.periodTo, "dd-MM-yyyy");
            $scope.accountMovementTurnover = rowtoedit;

            var index = $scope.borrowerprofile.listClientAccountMovementTurnover.indexOf(rowtoedit);
            $scope.borrowerprofile.listClientAccountMovementTurnover.splice(index, 1);
            $scope.isAccountTurnOverEdited = true;

        } catch (e) {
            alert("Exception EditItemFromAccountMovementTurnoverList" + e);
        }
    };

    $scope.RemoveItemFromlistAccountMovementTurnover = function (list, item) {
        try {

            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else {
                    common.SetActiveFalseForRemovedItem(list, item);
                    //var index = list.indexOf(item);
                    //$scope.borrowerprofile.listClientAccountMovementTurnover.splice(index, 1);
                }                                    
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistAccountMovementTurnover Error: " + e);
        }
    };

    $scope.ResetAccountMovementTurnover_ClickEvent = function () {
        $scope.accountMovementTurnover = {
            id: null,
            accountNo: null,
            periodFrom: null,
            periodTo: null,
            sanctionedLimit: null,
            beginningBalance: null,
            sumOfDebit: null,
            noOfDebit: null,
            sumOfCredit: null,
            noOfCredit: null,
            endingBalance: null,
            highestWithdrawal: null,
            lowestWithdrawal: null,
            lowestBalance: null,
            highestBalance: null,
            noOfTransactionOccured: null,
            accountTurnover: null,
            active: true
        };
    };

    $scope.SubmitAccountMovementTurnOver_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listClientAccountMovementTurnover.length > 0) {
                SaveAccountMovementTurnOver();
            } else {
                dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
            }
            
        } catch (e) {
            alert("SubmitExistingBankAccount_ClickEvent error" + e);
        }
    };

    function SaveAccountMovementTurnOver() {
        try {        
            var clientProfileId = common.borrowerprofile.id;
            if (clientProfileId != '') {
                $scope.bankaccountdetails.listUDFValues = listAllUdf;
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveAccountMovementTurnOver",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listClientAccountMovementTurnoverModel: $scope.borrowerprofile.listClientAccountMovementTurnover, cprClientProfileId: clientProfileId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listClientAccountMovementTurnover = response.data.output;
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
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
            } else {
                dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
            }
           
        } catch (e) {
            common.preprocesshide();
            alert('SaveAccountMovementTurnOver ' + e);
        }
    }

    // Account Deposit Detail
    $scope.AddCustomerAcoountDepositDetail_ClickEvent = function () {
        try {
            if (ValidateCustomerAccountDepositDetail()) {
                if ($scope.borrowerprofile.listClientAccountDepositDetailModel == null) {
                    $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
                }
                if ($scope.customerAccountDepositDetail.customerDeposit > 0) {
                    $scope.customerAccountDepositDetail.isAllied = false;
                    $scope.isAccDepositEdited = false;
                    $scope.borrowerprofile.listClientAccountDepositDetailModel.push($scope.customerAccountDepositDetail);
                    $scope.ResetCustomerAccountDepositDetail_ClickEvent();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0");
                }
               
            }
        } catch (e) {
            alert("AddCustomerAcoountDepositDetail_ClickEvent error" + e);
        }
    };
    $scope.ResetCustomerAccountDepositDetail_ClickEvent = function () {
        $scope.customerAccountDepositDetail = {
            id: null,
            cPRClientProfileId: null,
            accountNo: null,
            depositDate: null,
            customerCIF: null,
            customerName: null,
            customerDeposit: null,
            alliedCIF: null,
            alliedName: null,
            alliedAccountNumber: null,
            alliedDeposit: null,
            isAllied: false,
            active: true
        };
    };
    $scope.EditItemFromCustomerAccountDepositDetailList = function (rowtoedit) {
        try {
            if ($scope.customerAccountDepositDetail == null)
                $scope.customerAccountDepositDetail = {};

            $scope.customerAccountDepositDetail = rowtoedit;

            var index = $scope.borrowerprofile.listClientAccountDepositDetailModel.indexOf(rowtoedit);
            $scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
            $scope.isAccDepositEdited = true;

        } catch (e) {
            alert("Exception EditItemFromCustomerAccountDepositDetailList" + e);
        }
    };
    $scope.RemoveItemFromlistAccountDepositDetail = function (list, item) {
        try {

            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else {
                    common.SetActiveFalseForRemovedItem(list, item);
                    //var index = list.indexOf(item);
                    //$scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
                }
                    
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistAccountDepositDetail Error: " + e);
        }
    };
    $scope.AddAlliedAcoountDepositDetail_ClickEvent = function () {
        try {
            if (ValidateAlliedAccountDepositDetail()) {
                if ($scope.borrowerprofile.listClientAccountDepositDetailModel.length == 0) {
                    $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
                }
                if ($scope.alliedAccountDepositDetail.alliedDeposit > 0) {
                    $scope.alliedAccountDepositDetail.isAllied = true;
                    $scope.isEdited = false;
                    $scope.borrowerprofile.listClientAccountDepositDetailModel.push($scope.alliedAccountDepositDetail);
                    $scope.ResetAlliedAccountDepositDetail_ClickEvent();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0");
                }
                
            }
        } catch (e) {
            alert("AddAlliedAcoountDepositDetail_ClickEvent error" + e);
        }
    };
    $scope.ResetAlliedAccountDepositDetail_ClickEvent = function () {
        $scope.alliedAccountDepositDetail = {
            id: null,
            cPRClientProfileId: null,
            accountNo: null,
            depositDate: null,
            customerCIF: null,
            customerName: null,
            customerDeposit: null,
            alliedCIF: null,
            alliedName: null,
            alliedAccountNumber: null,
            alliedDeposit: null,
            isAllied: true,
            active: true
        };
    };
    $scope.EditItemFromAlliedAccountDepositDetailList = function (rowtoedit) {
        try {
            if ($scope.alliedAccountDepositDetail == null)
                $scope.alliedAccountDepositDetail = {};

            $scope.alliedAccountDepositDetail = rowtoedit;         
            var index = $scope.borrowerprofile.listClientAccountDepositDetailModel.indexOf(rowtoedit);
            $scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
            $scope.isEdited = true;

        } catch (e) {
            alert("Exception EditItemFromAlliedAccountDepositDetailList" + e);
        }
    };
    $scope.SubmitAccountDepositDetails_ClickEvent = function () {
        try {
            if ($scope.borrowerprofile.listClientAccountDepositDetailModel.length != 0) {
                SaveAccountDepositDetail();
            } else {
                dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
            }         
        } catch (e) {
            alert("SubmitAccountDepositDetails_ClickEvent error" + e);
        }
    };
    function GetAccountDepositDetailByCpId() {
        try {
            $http({
                url: "/CPRV2/GetAccountDepositDetailByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId  })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    list = response.data.output;
                    
                    $scope.borrowerprofile.listClientAccountDepositDetailModel = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }
    function SaveAccountDepositDetail() {
        try {
            var clientProfileId = common.borrowerprofile.id;
            if (clientProfileId != '') {
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveAccountDepositDetails",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        listClientAccountDepositDetailModel: $scope.borrowerprofile.listClientAccountDepositDetailModel, cprClientProfileId: clientProfileId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listClientAccountDepositDetailModel = response.data.output;
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                            //ResetAccountDepositDetails();

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
            alert('SaveAccountMovementTurnOver ' + e);
        }
    }
    function ValidateCustomerAccountDepositDetail() {
        if ($scope.customerAccountDepositDetail.accountNo == null || $scope.customerAccountDepositDetail.accountNo == "") {
            return false;
        } else {
            return true;
        }
    }
    function ValidateAlliedAccountDepositDetail() {
        if ($scope.alliedAccountDepositDetail.alliedAccountNumber == null || $scope.alliedAccountDepositDetail.alliedAccountNumber == "") {
            return false;
        } else {
            return true;
        }
    }
    //function ResetAccountDepositDetails() {
    //    $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
    //}
    // Comment on Conduct of Account

    function GetCommentOnCunductAccountByCpId() {
        try {
            $http({
                url: "/CPRV2/GetCommentOnConductOfAccountByCPId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprClientProfileId: $scope.cPId  })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.clientCommentOnConductOfAccountModel = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }
    $scope.SubmitCmOnConductAccount_ClickEvent = function () {
        try {
            if ($scope.clientCommentOnConductOfAccountModel != null) {
                SaveCommentOnConductAcc();
            } else {
                dialogService.ConfirmDialogWithOkay('', "Empty model please input");
            } 
           
        } catch (e) {
            alert("SubmitCmOnConductAccount_ClickEvent error" + e);
        }
    };

    function SaveCommentOnConductAcc() {
        try {
            var clientProfileId = common.borrowerprofile.id;
            if (clientProfileId != '') {
                common.preprocessload();
                $http({
                    url: "/CPRV2/SaveCommentOnConductOfAccount",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        clientCommentOnConductOfAccountModel: $scope.clientCommentOnConductOfAccountModel, cprClientProfileId: clientProfileId
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.clientCommentOnConductOfAccountModel = response.data.output;
                        common.preprocesshide();
                        // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
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
            alert('SaveAccountMovementTurnOver ' + e);
        }
    }
 
    $scope.Page_Load();

}));