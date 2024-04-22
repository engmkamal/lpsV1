(app.controller("landTypeCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listLandType = [];
    $scope.landTypes = {
        id: null,
        type: null,
        active: true,
    };

    function GetUrlParameters() {
        var landId = (common.GetParameterByName("id", null));
        return landId;
    };

    function GetLandTypeById() {
        var landId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetLandTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { landId: landId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.landTypes = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetLandTypeById: " + e);
        }
    };


    function SubmitLandType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitLandType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ landTypes: $scope.landTypes })
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
            alert('SubmitLandType ' + e);
        }
    }

    function ResetLandType() {
        try {
            $scope.landTypes = {
                id: null,
                type: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Land Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetLandTypeById();
        }
    };



    ///.................. Events

    $scope.CancelResetLandType_ClickEvent = function () {
        try {
            ResetLandType();
        }
        catch (ex) {
            alert("Exception in CancelResetLandType_ClickEvent " + ex);
        }
    };

    $scope.SubmitLandType_ClickEvent = function () {
        try {
            SubmitLandType();
        } catch (e) {
            alert('SubmitLandType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));