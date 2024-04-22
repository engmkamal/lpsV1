(app.controller("DesignationCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.designation = {
        id: '',
        name: '',
        description: '',
        active: true
    };
    $scope.listDesignation = [];

    /// .................. Funtions

    function GetUrlParameters() {
        var designationId = (common.GetParameterByName("id", null));
        return designationId;
    }
    function GetAllDesignation() {
        try {
            $http({
                url: "/Master/GetAllDesignation",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDesignation = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllDesignation: " + e);
        }
    };


    function GetDesignationById() {
        var designationId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetDesignationById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ designationId: designationId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.designation = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetMapProductById: " + e);
        }
    };
    function Validate() {
        if (!$scope.designation.name) {
            dialogService.ConfirmDialogWithOkay('', "Please select Name!");
            return false;
        }
        return true;
    }
    function SubmitDesignation() {
        try {
            if (Validate()) {
                $http({
                    url: "/Master/SubmitDesignation",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ designation: $scope.designation })
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
            }

        } catch (e) {
            common.preprocesshide();
            alert('SubmitMapProduct ' + e);
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetDesignationById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitDesignation();
        } catch (e) {
            alert('SubmitMapProduct_ClickEvent ' + e);
        }
    };
    $scope.Page_Load();

}));
