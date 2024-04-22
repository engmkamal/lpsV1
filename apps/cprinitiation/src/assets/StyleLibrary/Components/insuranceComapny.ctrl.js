(app.controller("insuranceCompanyCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listInsuranceCompany = [];
    $scope.insuranceCompany = {
        id: null,
        name: null,
        active: true,
    };

    function GetUrlParameters() {
        var insuranceCompanyId = (common.GetParameterByName("id", null));
        return insuranceCompanyId;
    };

    function GetInsuranceCompanyById() {
        var insuranceCompanyId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetInsuranceCompanyById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { insuranceCompanyId: insuranceCompanyId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.insuranceCompany = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetInsuranceCompanyById: " + e);
        }
    };


    function SubmitInsuranceCompany() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitInsuranceCompany",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ insuranceCompany: $scope.insuranceCompany })
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
            alert('SubmitInsuranceCompany ' + e);
        }
    }

    function ResetInsuaranceCompany() {
        try {
            $scope.insuranceCompany = {
                id: null,
                name: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Insuarance Company ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetInsuranceCompanyById();
        }
    };



    ///.................. Events

    $scope.CancelResetInsuaranceCompany_ClickEvent = function () {
        try {
            ResetInsuaranceCompany();
        }
        catch (ex) {
            alert("Exception in CancelResetModeofOwnership_ClickEvent " + ex);
        }
    };

    $scope.SubmitInsuranceCompany_ClickEvent = function () {
        try {
            SubmitInsuranceCompany();
        } catch (e) {
            alert('SubmitInsuranceCompany_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));