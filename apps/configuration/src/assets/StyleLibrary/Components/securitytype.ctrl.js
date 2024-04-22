(app.controller("SecurityTypeCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables


    $scope.securitytype = {
        id: '',
        code: '',
        name: '',
        description: '',
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var securitytypeId = (common.GetParameterByName("id", null));
        return securitytypeId;
    };

    function GetSecurityTypeById() {
        var securitytypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetSecurityTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ securitytypeId: securitytypeId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.securitytype = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSecurityTypeById: " + e);
        }
    };

    function SubmitSecurityType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitSecurityType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ securityType: $scope.securitytype })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetSecurityType();
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl != null) {
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
            alert('SubmitSecurityType ' + e);
        }
    }

    $scope.CancelSecurityType_ClickEvent = function () {
        try {
            ResetSecurityType();
        }
        catch (ex) {
            alert("Exception in CancelSecurityType_ClickEvent" + ex);
        }
    }

    function ResetSecurityType() {
        $scope.securitytype = {
            id: '',
            code: '',
            name: '',
            description: '',
            active: true,
        };
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetSecurityTypeById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitSecurityType();
        } catch (e) {
            alert('SubmitSecurityType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
