(app.controller("SupplierDetailCtrl", function ($scope, $http, $filter) {

    /// .................................................... Variables

    $scope.listSupplierDetailModel = {
        id: '',
        code: '',
        name: '',
        isblacklisted: false,
        address: '',
        active: true,
    };

    $scope.supplierdetails = {
        id: '',
        code: '',
        name: '',
        isblacklisted: false,
        address: '',
        active: true,

    };

    /// .................................................... Funtions

    function GetUrlParameters() {
        var supplierId = (common.GetParameterByName("id", null));
        return supplierId;
    };
    
    function GetSupplierDetailById() {
        var supplierdetailId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetSupplierDetailById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { supplierdetailId: supplierdetailId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.supplierdetail = response.data.output[0];

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSupplierDetailById: " + e);
        }
    };

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetSupplierDetailById();
        }
        else {

        }

    };

    function SubmitSPClickEvent() {
        try {

            console.log($scope.supplierdetails);
            $http({
                url: "/Master/SubmitSupplierDetail",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ supplierdetails: $scope.supplierdetails })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    var redirectNotice = "Page will refresh shortly.";
                    alert("Successfully Saved" + redirectNotice);
                    
                }

            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitMIClickEvent ' + e);
        }
    }

    /// .................................................... Events

    $scope.Submit_SPClickEvent = function () {
        try {
            SubmitSPClickEvent();

        } catch (e) {
            alert("Submit_SPClickEvent " + e);
        }
    };

    $scope.Page_Load();
}));