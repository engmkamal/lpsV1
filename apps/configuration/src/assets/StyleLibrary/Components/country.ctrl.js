(app.controller("Country", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.listCountry = [];
    $scope.country = {
        id: '',
        code: '',
        shortCode: '',
        name: '',
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var countryId = (common.GetParameterByName("id", null));
        return countryId;
    };
    function SubmitCountry() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitCountry",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ country: $scope.country })
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
            alert('SubmitCountry ' + e);
        }  
    }
    function GetAllCountry() {
        try {
            $http({
                url: "/Master/GetAllCountry",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCountry = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllCountry: " + e);
        }
    }
    function GetCountryById() {
        var countryId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCountryById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ countryId: countryId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.country = response.data.output[0];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCountryById: " + e);
        }
    };

    $scope.Page_Load = function () {
        GetAllCountry();
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetCountryById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitCountry();
        } catch (e) {
            alert('SubmitCountry_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
