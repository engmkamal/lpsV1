(app.controller("RecoveryMainCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.title = 'Recovery Module';
    $scope.sum = 0;
    $scope.roles = [];
    //$scope.Page_Load = function () {
    //    GetSum();
    //};
    //$scope.Page_Load();
    $scope.OnInit = function () {
        GetSum();
        GetAllRole();
        $scope.ChangeNavigation_ClickEvent(2);
    }

    function GetSum() {
        try {
            $http({
                url: "/CPRRecovery/GetSum",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data!==null)
                  //  $scope.sum = response.data.output;
                $scope.sum = response.data;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSum: " + e);
        }
    };
    function GetAllRole() {
        try {
            $http({
                url: "/CPRRecovery/GetAllRole",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                     $scope.roles = response.data.output;
                   
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSum: " + e);
        }
    };
    $scope.ChangeNavigation_ClickEvent = function (index) {
        try {
            $scope.formatIndex = index;
        } catch (e) {
            alert("ChangeNavigation_ClickEvent Listview" + e);
        }
    };

}));