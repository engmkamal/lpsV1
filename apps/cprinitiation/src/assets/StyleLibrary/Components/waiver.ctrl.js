(app.controller("waiverTypeCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listWaiverType = [];
    $scope.waiverType = {
        id: '',
        type: '',
        active: true
    };

    function GetUrlParameters() {
        var waivertypeId = (common.GetParameterByName("id", null));
        return waivertypeId;
    };
    function GetWaiverTypeById() {
        var waivertypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetWaiverTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { waivertypeId: waivertypeId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.waiverType = response.data.output[0];
                    //$scope.waiverType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetWaiverTypeById: " + e);
        }
    };


    function SubmitWaiverType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitWaiverType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ waiverType: $scope.waiverType })
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
            alert('SubmitWaiverType ' + e);
        }
    }

    function ResetWaiverType() {
        try {
            $scope.waiverType = {
                id: '',
                type: null,
                active: true
            };
        } catch (ex) {
            alert('Error on Reseting Waiver Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetWaiverTypeById();
        }
    };



    ///.................. Events

    $scope.CancelResetWaiverType_ClickEvent = function () {
        try {
            ResetWaiverType();
        }
        catch (ex) {
            alert("Exception in CancelResetWaiverType_ClickEvent " + ex);
        }
    };

    $scope.SubmitWaiverType_ClickEvent = function () {
        try {
            SubmitWaiverType();
        } catch (e) {
            alert('SubmitWaiverType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));