(app.controller("currencyCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listCurrency = [];
    $scope.currency = {
        id: null,
        type: null,
        active: true,
    };

    function GetUrlParameters() {
        var currencyId = (common.GetParameterByName("id", null));
        return currencyId;
    };

    function GetCurrencyById() {
        var currencyId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCurrencyById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { currencyId: currencyId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.currency = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCurrencyById: " + e);
        }
    };


    function SubmitCurrency() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitCurrency",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({currency: $scope.currency })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        //  ResetProposeTypeOfFacility();
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
            alert('SubmitCurrency ' + e);
        }
    }

    function ResetCurrency() {
        try {
            $scope.currency = {
                id: null,
                type: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Currency ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetCurrencyById();
        }
    };



    ///.................. Events

    $scope.CancelCurrency_ClickEvent = function () {
        try {
            ResetCurrency();
        }
        catch (ex) {
            alert("Exception in CancelCurrency_ClickEvent " + ex);
        }
    };

    $scope.SubmitCurrency_ClickEvent = function () {
        try {
            SubmitCurrency();
        } catch (e) {
            alert('SubmitCurrency_ClickEvent' + e);
        }
    }

    $scope.Page_Load();

}));