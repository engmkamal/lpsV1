(app.controller("DivisionCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.division = {
        id: null,
        customerSegmentId: null,
        customerSegment: {
            id: '',
            name: '',
            description: '',
            active: true
        },
        name: null,
        active: true
    };


    /// .................. Funtions

    function GetUrlParameters() {
        var divisionId = (common.GetParameterByName("id", null));
        return divisionId;
    };
    function GetBusinesses() {
        try {
            $http({
                url: "/Master/GetAllCustomerSegment",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listBusiness = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBusinesses: " + e);
        }
    };
    //function GetDivisions() {

    //    try {
    //        $http({
    //            url: "/Master/GetDivisions",
    //            method: "POST",
    //            headers: {
    //                "accept": "application/json;odata=verbose",
    //                "content-Type": "application/json;odata=verbose"
    //            },
    //            data: {}
    //        }).then(function successCallback(response) {
    //            if (response.data.success)
    //                $scope.listDivision = response.data.output;
    //        }, function errorCallback(response) {
    //            $scope.error = response;
    //        });

    //    } catch (e) {
    //        alert("Exception GetDivisions: " + e);
    //    }
    //};

    function GetDivisionById() {
        var divisionId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetDivisionById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { divisionId: divisionId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.division = response.data.output;

                if (!angular.isUndefined($scope.listDivision) && $scope.division.customerSegment != null) {
                    var index = common.GetArrayIndexByValue($scope.listBusiness, 'id', $scope.division.customerSegment.id);
                    if (index !== -1)
                        $scope.division.customerSegment = $scope.listBusiness[index];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetDivisionById: " + e);
        }
    };

    function SubmitDivision() {
        try {

            $scope.division.customerSegment = $filter('filter')($scope.listBusiness, { id: $scope.division.customerSegmentId })[0];
            common.preprocessload();
            $http({
                url: "/Master/SubmitDivision",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ division: $scope.division })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetDivision();
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
            alert('SubmitDivision ' + e);
        }
    }

    $scope.CancelDivision_ClickEvent = function () {
        try {
            ResetDivision();
        }
        catch (ex) {
            alert("Exception in CancelDivision_ClickEvent " + ex);
        }
    }

    function ResetDivision() {
        $scope.division = {
            id: null,
            customerSegmentId: null,
            customerSegment: {
                id: '',
                name: '',
                description: '',
                active: true
            },
            name: null,
            active: true
        };
    }

    $scope.Page_Load = function () {
        GetBusinesses();
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetDivisionById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.SubmitDivision_ClickEvent = function () {
        try {
            SubmitDivision();
        } catch (e) {
            alert('SubmitDivision_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));