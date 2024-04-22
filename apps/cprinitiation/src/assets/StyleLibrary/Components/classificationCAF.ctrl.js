(app.controller("cAFClassificationCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listClassificationCAF = [];
    $scope.cAFClassification= {
        id: null,
        classification: null,
        riskWeight:null,
        active: true,
    };

    function GetUrlParameters() {
        var cAFClassificationId = (common.GetParameterByName("id", null));
        return cAFClassificationId;
    };

    function GetCAFClassificationById() {
        var cAFClassificationId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCAFClassificationById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cAFClassificationId: cAFClassificationId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.cAFClassification = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCAFClassificationById: " + e);
        }
    };


    function SubmitCAFClassification() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitCAFClassification",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cAFClassification: $scope.cAFClassification })
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
            alert('SubmitCAFClassification ' + e);
        }
    }

    function ResetCAFClassification() {
        try {
            $scope.cAFClassification = {
                id: null,
                classification: null,
                riskWeight: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting CAFClassification' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetCAFClassificationById();
        }
    };



    ///.................. Events

    $scope.CancelCAFClassification_ClickEvent = function () {
        try {
            ResetCAFClassification();
        }
        catch (ex) {
            alert("Exception in CancelCAFClassification_ClickEvent " + ex);
        }
    };

    $scope.SubmitCAFClassification_ClickEvent = function () {
        try {
            SubmitCAFClassification();
        } catch (e) {
            alert('SubmitCAFClassification_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));