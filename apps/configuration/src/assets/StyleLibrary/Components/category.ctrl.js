(app.controller("CategoryCtrl", function ($scope, $http, $filter) {

    /// .................. Variables


    $scope.category = {
        id: '',
        product: [],
        code: '',
        name: '',
        description: '',
        active: true,

    };

    /// .................. Funtions

    function GetUrlParameters() {
        var categoryId = (common.GetParameterByName("id", null));
        return categoryId;
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
                data: JSON.stringify({ listProductModel: $scope.category.product })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.product = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProducts: " + e);
        }
    };

    function GetCategoryById() {
        var categoryId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCategoryById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { categoryId: categoryId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.category = response.data.output[0];
                if ($scope.category.product != null) {
                    var filterproduct = $filter('filter')($scope.category, { id: $scope.category.product.id });
                    $scope.category.product = filterproduct[0];
                }
                console.log(response.data.output);
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCategoryById: " + e);
        }
    };

    function SubmitCategory() {
        try {
            $http({
                url: "/Master/SubmitCategory",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ category: $scope.category })
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Success");
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitProduct ' + e);
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetProducts();
            GetCategoryById();
        }
        else {
            GetProducts();
        }
    };

    /// ............... Events

    $scope.SubmitCategory_ClickEvent = function () {
        try {
            SubmitCategory();
        } catch (e) {
            alert('SubmitCategory_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));