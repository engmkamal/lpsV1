(app.controller("modeofOwnershipCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listmodeofOwnershipTransfer = [];
    $scope.modeofOwnershipTransfer = {
        id: null,
        type: null,
        active: true,
    };

    function GetUrlParameters() {
        var modeofOwnershipTransferId = (common.GetParameterByName("id", null));
        return modeofOwnershipTransferId;
    };

    function GetModeofOwnershipById() {
        var modeofOwnershipTransferId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetModeofOwnershipById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { modeofOwnershipTransferId: modeofOwnershipTransferId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.modeofOwnershipTransfer = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetModeofOwnershipById: " + e);
        }
    };


    function SubmitModeofOwnership() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitModeofOwnership",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ modeofOwnershipTransfer: $scope.modeofOwnershipTransfer })
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
            alert('SubmitModeofOwnership ' + e);
        }
    }

    function ResetModeofOwnership() {
        try {
            $scope.modeofOwnershipTransfer = {
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
            GetModeofOwnershipById();
        }
    };



    ///.................. Events

    $scope.CancelResetModeofOwnership_ClickEvent = function () {
        try {
            ResetModeofOwnership();
        }
        catch (ex) {
            alert("Exception in CancelResetModeofOwnership_ClickEvent " + ex);
        }
    };

    $scope.SubmitModeofOwnership_ClickEvent = function () {
        try {
            SubmitModeofOwnership();
        } catch (e) {
            alert('SubmitModeofOwnership_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));