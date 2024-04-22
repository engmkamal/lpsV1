(app.controller("nationalityCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listNationality= [];
    $scope.nationality = {
        id: '',
        name: '',
        active: true
    };

    function GetUrlParameters() {
        var nationalityId = (common.GetParameterByName("id", null));
        return nationalityId;
    };
    function GetNationalityById() {
        var nationalityId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetNationalityById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { nationalityId: nationalityId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.nationality = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetNationalityById: " + e);
        }
    };


    function SubmitNationality() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitNationality",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ nationality: $scope.nationality })
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
            alert('SubmitNationality ' + e);
        }
    }

    function ResetNationality() {
        try {
            $scope.nationality = {
                id: '',
                name: '',
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Waiver Type ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetNationalityById();
        }
    };



    ///.................. Events

    $scope.CancelNationality_ClickEvent = function () {
        try {
            ResetNationality();
        }
        catch (ex) {
            alert("Exception in CancelNationality_ClickEvent " + ex);
        }
    };

    $scope.SubmitNationality_ClickEvent = function () {
        try {
            SubmitNationality();
        } catch (e) {
            alert('SubmitNationality_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));