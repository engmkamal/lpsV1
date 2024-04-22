(app.controller("feeTypeCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listFeeType = [];
    $scope.feeTypes = {
        id: null,
        feeType: null,
        active: true,
    };

    function GetUrlParameters() {
        var feeId = (common.GetParameterByName("id", null));
        return feeId;
    };

    function GetFeeTypeById() {
        var feeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetFeeTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { feeId: feeId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.feeTypes = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetFeeTypeById: " + e);
        }
    };


    function SubmitFeeType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitFeeType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ feeTypes: $scope.feeTypes })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl !== null) {
                            window.location.href = common.adminRedirectUrl += spHostUrl;
                        }
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
            alert('SubmitEdicationalQualification ' + e);
        }
    }

    function ResetFeeType() {
        try {
            $scope.feeTypes = {
                id: null,
                feeType: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Fee Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetFeeTypeById();
        }
    };



    ///.................. Events

    $scope.CancelResetFeeType_ClickEvent = function () {
        try {
            ResetFeeType();
        }
        catch (ex) {
            alert("Exception in CancelResetFeeType_ClickEvent " + ex);
        }
    };

    $scope.SubmitFeeType_ClickEvent = function () {
        try {
            SubmitFeeType();
        } catch (e) {
            alert('SubmitFeeType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));