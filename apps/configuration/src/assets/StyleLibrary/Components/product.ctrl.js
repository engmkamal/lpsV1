(app.controller("ProductCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables

    $scope.listProductModel = {
        id: '',
        facilitytype: [],
        code: '',
        name: '',
        description: '',
        active: true,
    };

    $scope.product = {
        id: '',
        facilitytype: [],
        code:'',
        name: '',
        description: '',
        active: true,

    };

    /// .................. Funtions

    function GetUrlParameters() {
        var productId = (common.GetParameterByName("id", null));
        return productId;
    };

    function GetBusinesses() {
        try {
            $http({
                url: "/Master/GetBusinesses",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listBusinessModel: $scope.business })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.business = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBusinesses: " + e);
        }
    };

    function GetFacilityType() {
        try {
            $http({
                url: "/Master/GetFacilityTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listFacilityTypeModel: $scope.product.facilitytype })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.facilitytype = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetFacilityType: " + e);
        }
    };

    function GetProductById() {
        var productId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetProductById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { productId: productId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.product = response.data.output[0];

                if ($scope.product.business != null) {
                    var filterbusiness = $filter('filter')($scope.product.business, { id: $scope.listProductModel.business.id });
                    $scope.product.business = filterbusiness;
                    console.log(filterbusiness);
                }
                if ($scope.product.facilitytype != null) {
                    var filterfacilitytype = $filter('filter')($scope.product.facilitytype, { id: $scope.listProductModel.facilitytype.id });
                    $scope.product.facilitytype = filterfacilitytype;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetProductById: " + e);
        }
    };

    function SubmitProduct() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitProduct",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ product: $scope.product })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetProduct();
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
            alert('SubmitProduct ' + e);
        }
    }

    $scope.CancelProduct_ClickEvent = function () {
        try {
            ResetProduct();
        }
        catch (ex) {
            alert("Exception in CancelProduct_ClickEvent" + ex);
        }
    }

    function ResetProduct()
    {
        $scope.listProductModel = {
            id: '',
            facilitytype: [],
            code: '',
            name: '',
            description: '',
            active: true,
        }

        $scope.product = {
            id: '',
            facilitytype: [],
            code: '',
            name: '',
            description: '',
            active: true,

        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetBusinesses();
            GetFacilityType();
            GetProductById();
           
        }
        else {
            GetBusinesses();
            GetFacilityType();
        }
        
    };

    /// ............... Events

    $scope.SubmitProduct_ClickEvent = function () {
        try {
            SubmitProduct();
        } catch (e) {
            alert('SubmitProduct_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();
}));