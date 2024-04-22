(app.controller("productiveSectorCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listProductiveSector = [];
    $scope.productiveSector = {
        id: '',
        type: '',
        active: true,
    };

    function GetUrlParameters() {
        var productiveSectorId = (common.GetParameterByName("id", null));
        return productiveSectorId;
    };
    function GetProductiveSectorTypeById() {
        var productiveSectorId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetProductiveSectorTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { productiveSectorId: productiveSectorId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.productiveSector = response.data.output[0];
                //$scope.waiverType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProductiveSectorTypeById: " + e);
        }
    };


    function SubmitProductivesSectorType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitProductivesSectorType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ productiveSector: $scope.productiveSector })
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
            alert('SubmitProductivesSectorType ' + e);
        }
    }

    function ResetProductiveSector() {
        try {
            $scope.productiveSector = {
                id: '',
                type: '',
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Waiver Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetProductiveSectorTypeById();
        }
    };



    ///.................. Events

    $scope.CancelResetProductiveSector_ClickEvent = function () {
        try {
            ResetProductiveSector();
        }
        catch (ex) {
            alert("Exception in CancelResetProductiveSector_ClickEvent " + ex);
        }
    };

    $scope.SubmitProductivesSectorType_ClickEvent = function () {
        try {
            SubmitProductivesSectorType();
        } catch (e) {
            alert('SubmitProductivesSectorType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));