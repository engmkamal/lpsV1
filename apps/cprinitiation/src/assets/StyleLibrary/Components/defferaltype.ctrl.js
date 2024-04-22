(app.controller("defferalTypeCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listDefferalType = [];
    $scope.defferalType = {
        id: '',
        type: '',
        active: true,
    };

    function GetUrlParameters() {
        var defferaltypeId = (common.GetParameterByName("id", null));
        return defferaltypeId;
    };
    function GetDefferalTypeById() {
        var defferaltypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetDefferalTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { defferaltypeId: defferaltypeId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.defferalType = response.data.output[0];
                //$scope.waiverType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetDefferalTypeById: " + e);
        }
    };


    function SubmitDefferalType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitDefferalType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ defferalType: $scope.defferalType })
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
            alert('SubmitDefferalType ' + e);
        }
    }

    function ResetDefferalType() {
        try {
            $scope.defferalType = {
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
            GetDefferalTypeById();
        }
    };



    ///.................. Events

    $scope.CancelDefferalType_ClickEvent = function () {
        try {
            ResetDefferalType();
        }
        catch (ex) {
            alert("Exception in CancelDefferalType_ClickEvent " + ex);
        }
    };

    $scope.SubmitDefferalType_ClickEvent = function () {
        try {
            SubmitDefferalType();
        } catch (e) {
            alert('SubmitDefferalType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));