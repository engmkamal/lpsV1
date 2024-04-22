(app.controller("MapProductCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.mapProduct = {
        id: '',
        customerSegmentId: '',
        productId: '',
        categoryId: '',
        subCategoryId:'',
        product: [],
        dAMasterTemplateId:'',
        productTemplate: [],
        active: true
    };
    $scope.listMapProduct = [];
    $scope.products = [];
    $scope.templates = [];
    $scope.customerSegments = [];

    /// .................. Funtions

    function GetUrlParameters() {
        var mapProductId = (common.GetParameterByName("id", null));
        return mapProductId;
    }
    function GetAllCustomerSegment() {
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
                    $scope.customerSegments = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllCustomerSegment: " + e);
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
                    $scope.products = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProducts: " + e);
        }
    };

    function GetAllTemplates() {
        try {
            $http({
                url: "/Master/GetAllTemplates",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.templates = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAssociateField: " + e);
        }
    };

    function GetMapProductById() {
        var mapProductId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetMapProductById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ mapProductId: mapProductId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.mapProduct = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetMapProductById: " + e);
        }
    };
    function Validate() {
        if (!$scope.mapProduct.customerSegmentId) {
            dialogService.ConfirmDialogWithOkay('', "Please select Customer Segment!");
            return false;
        }
        if (!$scope.mapProduct.productId) {
            dialogService.ConfirmDialogWithOkay('', "Please select Product");
            return false;
        }
        if (!$scope.mapProduct.dAMasterTemplateId) {
            dialogService.ConfirmDialogWithOkay('', "Please select Template");
            return false;
        }
        return true;
    }
    function SubmitMapProduct() {
        try {
            if (Validate()) {
                $http({
                    url: "/Master/SubmitMapProduct",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ mapProduct: $scope.mapProduct })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        if (response.data.output) {
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
                        } else {
                            dialogService.ConfirmDialogWithOkay('', "This product already mapped with same template and customersegment");
                        }
                       
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

    $scope.ResetMapProduct = function(){
        $scope.mapProduct = {
            id: '',
            customerSegmentId: '',
            productId: '',
            categoryId: '',
            subCategoryId: '',
            product: [],
            dAMasterTemplateId: '',
            productTemplate: [],
            active: true
        };
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetProducts();
            GetAllTemplates();
            GetMapProductById();
            GetAllCustomerSegment();
        }
        else {
            GetProducts();
            GetAllTemplates();
            GetAllCustomerSegment();
            //GetProducts();
            
            
        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitMapProduct();
        } catch (e) {
            alert('SubmitMapProduct_ClickEvent ' + e);
        }
    };
    $scope.Page_Load();

}));
