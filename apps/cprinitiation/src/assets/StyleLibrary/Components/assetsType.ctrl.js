(app.controller("assestTypeCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listAssetsType = [];
    $scope.assetsType = {
        id: 0,
        type: null,
        active: true
    };

    function GetUrlParameters() {
        var assetsTypeId = (common.GetParameterByName("id", null));
        return assetsTypeId;
    };

    function GetAssetsTypeById() {
        var assetsTypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetAssetsTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { assetsTypeId: assetsTypeId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.assetsType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAssetsTypeById: " + e);
        }
    };


    function SubmitAssetsType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitAssetsType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ assetsType: $scope.assetsType })
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
            alert('SubmitAssetsType ' + e);
        }
    }

    function ResetAssetsType() {
        try {
            $scope.assetsType = {
                id: 0,
                type: null,
                active: true
            };
        } catch (ex) {
            alert('Error on Reseting Assets Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetAssetsTypeById();
        }
    };



    ///.................. Events

    $scope.CancelResetAssetsType_ClickEvent = function () {
        try {
            ResetAssetsType();
        }
        catch (ex) {
            alert("Exception in CancelResetAssetsType_ClickEvent " + ex);
        }
    };

    $scope.SubmitAssetsType_ClickEvent = function () {
        try {
            SubmitAssetsType();
        } catch (e) {
            alert('SubmitAssetsType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));