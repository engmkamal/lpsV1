(app.controller("RoleCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables


    $scope.role = {
        id: '',
        code: '',
        name: '',
        multiple: false,
        parallel: false,
        serial: false,
        bypass: false,
        minapproval: 0,
        description: '',
        level: 0,
        scope:null,
        isSelectDisabled: false,
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetRoleById() {
        var roleId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetRoleById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ roleId: roleId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.role = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetRoleById: " + e);
        }
    };

    function SubmitRole() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitRole",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ role: $scope.role })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetRole();
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
            alert('SubmitRole ' + e);
        }
    }

    $scope.CancelRole_ClickEvent = function () {
        try {
            ResetRole();
        }
        catch (ex) {
            alert("Exception in CancelRole_ClickEvent " + ex);
        }
    }

    function ResetRole() {
        $scope.role = {
            id: '',
            code: '',
            name: '',
            description: '',
            scope:null,
            active: true
        };
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetRoleById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitRole();
        } catch (e) {
            alert('SubmitRole_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
