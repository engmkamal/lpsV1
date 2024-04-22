(app.controller("ProposeTypeOfFacilityCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listProduct = [];
    $scope.proposeTypeOfFacility = {
        id: null,
        purpose: null,
        description: null,
        product:null,
        productId: null,
        active: true,
    };

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    //function GetAllProposeTypeOfFacility() {

    //    try {
    //        $http({
    //            url: "/Master/GetAllProposeTypeOfFacility",
    //            method: "POST",
    //            headers: {
    //                "accept": "application/json;odata=verbose",
    //                "content-Type": "application/json;odata=verbose"
    //            },
    //            data: {}
    //        }).then(function successCallback(response) {
    //            if (response.data.success)
    //                $scope.listProposeTypeOfFacility = response.data.output;
    //        }, function errorCallback(response) {
    //            $scope.error = response;
    //        });

    //    } catch (e) {
    //        alert("Exception GetAllProposeTypeOfFacility: " + e);
    //    }
    //};


    function GetProposalTypeOfFacilityById() {
        var proposeTypeOfFacilityId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetProposeTypeOfFacilityById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { proposeTypeOfFacilityId: proposeTypeOfFacilityId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.proposeTypeOfFacility = response.data.output;

                if (!angular.isUndefined($scope.listProduct) && $scope.proposeTypeOfFacility.product !== null) {
                    var index = common.GetArrayIndexByValue($scope.listProduct, 'id', $scope.proposeTypeOfFacility.product.id);
                    if (index !== -1)
                        $scope.proposeTypeOfFacility.product = $scope.listProduct[index];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProposalTypeOfFacilityById: " + e);
        }
    };
    function SubmitProposeTypeOfFacility() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitProposeTypeOfFacility",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ proposeTypeOfFacility: $scope.proposeTypeOfFacility })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetProposeTypeOfFacility();
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
            alert('SubmitProposeTypeOfFacility ' + e);
        }
    }
       
    function ResetProposeTypeOfFacility() {
        $scope.proposeTypeOfFacility = {
            id: null,
            purpose: null,
            description: null,
            productId: null,
            active: true,
        };
    }

    $scope.Page_Load = function () {
        //GetAllProposeTypeOfFacility();
        GetProducts();
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
           GetProposalTypeOfFacilityById();
        }
    };

    function GetProducts() {
        try {
            $http({
                url: "/Master/GetProducts",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listProduct = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProducts: " + e);
        }
    };
    ///.................. Events

    $scope.CancelProposeTypeOfFacility_ClickEvent = function () {
        try {
            ResetProposeTypeOfFacility();
        }
        catch (ex) {
            alert("Exception in CancelProposeTypeOfFacility_ClickEvent " + ex);
        }
    };

    $scope.SubmitProposeTypeOfFacility_ClickEvent = function () {
        try {
            SubmitProposeTypeOfFacility();
        } catch (e) {
            alert('SubmitProposeTypeOfFacility_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();


}));