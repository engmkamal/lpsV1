(app.controller("CustomerReportViewCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
    "use strict";
    $scope.PageTitle = "All Customer Report";

    $scope.listCustomer = [];

    $scope.customerCount = {};
    Page_Load();
    function Page_Load() {
        try {
            common.pageloadhide();
            GetAllCustomers();

        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    function GetAllCustomers() {
        try {
            $http({
                url: "/Master/GetCustomers",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCustomer = response.data.output;
                $scope.customerCount.totalCount = $scope.listCustomer.length;
                $scope.customerCount.totalPersonal = ($filter('filter')($scope.listCustomer, { personal: true }, true)).length;
                $scope.customerCount.totalNonPersonal = ($filter('filter')($scope.listCustomer, { personal: false }, true)).length;


            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomers: " + e);
        }
    };

}));