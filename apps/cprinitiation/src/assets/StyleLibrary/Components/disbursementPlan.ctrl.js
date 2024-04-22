(app.controller("DisbursementPlan", function ($scope, $http, $filter, dialogService) {

    /// .................. Variables

    $scope.disbursement = {
        Id: null,
        PayMethod: '',
        SavingAccountNo: '',
        Amount: null,
        MethodOfDisburst: '',
        Total: null,
        Instruction: '',
        CPRId: null,
        DisbursementPlanDisburseTo: [],
        DisbursementPlanPayment: [],
    };

    //$scope.paymentplanInfo = {
    //    Id: '',
    //    DisbursementPlanId: '',
    //    Stage: '',
    //    Amount: null,
    //    active: null,
    //}
    //$scope.disbursetoInfo = {
    //    Id: '',
    //    DisbursementPlanId: '',
    //    DisburstTo:'',
    //    PayStage:'',
    //    SupplierName:'',
    //    Address:'',
    //    active: null,
    //}

    /// .................. Funtions

    /// Stage Disburst
    $scope.AddStageDisbursementStage_ClickEvent = function () {
        try {
            if (angular.isUndefined($scope.disbursement.DisbursementPlanPayment) || $scope.disbursement.DisbursementPlanPayment === null) {
                $scope.disbursement.DisbursementPlanPayment = [];
            }
            var StageDisburst = {
                Id: $scope.paymentplanInfo.Id,
                DisbursementPlanId: $scope.paymentplanInfo.DisbursementPlanId,
                Stage: $scope.paymentplanInfo.Stage,
                Amount: $scope.paymentplanInfo.Amount,
                active: true,
            }

            $scope.disbursement.Total += $scope.paymentplanInfo.Amount;
            $scope.disbursement.DisbursementPlanPayment.push(StageDisburst);
            // CLEAR TEXTBOX.
            $scope.paymentplanInfo = {
                Id: '',
                DisbursementPlanId: '',
                Stage: '',
                Amount: null,
                active: null,
            }

        } catch (e) {
            alert("AddStageDisbursementStage_ClickEvent Error: " + e);
        }      
    };

    $scope.EditItemFromlistDisbursementStage_ClickEvent = function (list, item) {
        try {
            $scope.disbursement.Total -= item.Amount
            $scope.paymentplanInfo = item;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("EditItemFromlistDisbursementStage_ClickEvent Error: " + e);
        }
    };

    $scope.RemoveItemFromlistDisbursementStage = function (list, item) {
        try {

            $scope.disbursement.Total -= item.Amount;
            if (list != null && item != null) {
                if (item.Id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }

        } catch (e) {
            alert("Exception RemoveItemFromlistDisbursementStage Error: " + e);
        }
    };

    /// Disburse To
    $scope.AddDisburstToDisbursement_ClickEvent = function () {
        try {
            if (angular.isUndefined($scope.disbursement.DisbursementPlanDisburseTo) || $scope.disbursement.DisbursementPlanDisburseTo === null) {
                $scope.disbursement.DisbursementPlanDisburseTo = [];
            }
            var disburstToList = {
                Id: $scope.disbursetoInfo.Id,
                DisbursementPlanId: $scope.disbursetoInfo.DisbursementPlanId,
                DisburstTo: $scope.disbursetoInfo.DisburstTo,
                PayStage: $scope.disbursetoInfo.PayStage,
                SupplierName: $scope.disbursetoInfo.SupplierName,
                Address: $scope.disbursetoInfo.Address,
                active: true,
            }
            $scope.disbursement.DisbursementPlanDisburseTo.push(disburstToList);

            // CLEAR TEXTBOX.

            $scope.disbursetoInfo = {
                Id: '',
                DisbursementPlanId: '',
                DisburstTo: '',
                PayStage: '',
                SupplierName: '',
                Address: '',
                active: null,
            }

        } catch (e) {
            alert("AddDisburstToDisbursement_ClickEvent Error: " + e);
        }
       
        //$scope.disburseto.DisburstTo = null;
        //$scope.disburseto.PayStage = null;
        //$scope.disburseto.SupplierName = null;
        //$scope.disburseto.Address = null;
    };

    $scope.EditItemFromlistDisbursementDisburstToRow_ClickEvent = function (list, item) {

        try {
            $scope.disbursetoInfo = item;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("EditItemFromlistDisbursementDisburstToRow_ClickEvent Error: " + e);
        }
        //try {

        //    $scope.disburseto.DisburstTo = $scope.disbursement.DisbursementPlanDisburseTo[index].DisburstTo;
        //    $scope.disburseto.PayStage = $scope.disbursement.DisbursementPlanDisburseTo[index].PayStage;
        //    $scope.disburseto.SupplierName = $scope.disbursement.DisbursementPlanDisburseTo[index].SupplierName;
        //    $scope.disburseto.Address = $scope.disbursement.DisbursementPlanDisburseTo[index].Address;

        //    $scope.disbursement.DisbursementPlanDisburseTo.splice(index, 1);

        //} catch (e) {
        //    alert("Exception EditDisburstToRow" + e);
        //}
    };

    $scope.RemoveItemFromlistDisbursementDisburstToRow = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.Id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }

        } catch (e) {
            alert("Exception RemoveItemFromlistDisbursementStage Error: " + e);
        }
        //$scope.disbursement.DisbursementPlanDisburseTo.splice(index, 1);
        //dialogService.ShowDialog("Remove Data");
    };


    function GetUrlParameters() {
        var disbursmentPlanId = (common.GetParameterByName("Id", null));
        return disbursmentPlanId;
    };

    function SubmitDisbursementPlan() {
        $scope.disbursement.CPRId = $scope.cprinit.id;
        try {
            $http({
                url: "/CPR/SubmitDisbursementPlan",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ disbursementPlanModel: $scope.disbursement })
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Success");
                else
                    dialogService.ShowDialog(response.data.message);
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDisbursementPlan ' + e);
        }
    }

    //function GetDisbursementPlanByCPRId(cPRId) {
    //    try {
    //        $http({
    //            url: "/CPR/GetDisbursementPlanByCPRId",
    //            method: "POST",
    //            headers: {
    //                "accept": "application/json;odata=verbose",
    //                "content-Type": "application/json;odata=verbose"
    //            },
    //            data: JSON.stringify({ CPRIdstring: cPRId })
    //        }).then(function successCallback(response) {
    //            if (response.data.success) {
    //                $scope.disbursement = response.data.output;
    //            }
    //        }, function errorCallback(response) {
    //            $scope.error = response;
    //        });
    //    } catch (e) {
    //        alert("GetDisbursementPlanByCPRId " + e);
    //    }
    //}

    
    function GetDisbursementPlanById() {
        var disbursmentPlanId = GetUrlParameters();
        try {
            $http({
                url: "/CPR/GetDisbursementPlanById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ disbursmentPlanId: disbursmentPlanId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.disbursement = response.data.output[0];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        }
         catch (e) {
            alert("Exception GetDisbursementPlanById: " + e);
        }
    };



    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
           // GetDisbursementPlanByCPRId(urlParameter);
        }
    };

    ///.................. Events

    $scope.Submit_ClickEvent = function () {
        try {
            SubmitDisbursementPlan();
        } catch (e) {
            alert('Submit_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
