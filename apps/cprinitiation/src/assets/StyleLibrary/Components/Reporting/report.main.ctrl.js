(app.controller("ReportMainCtrl", ["$scope", "$http", "$filter", "$location", '$mdDialog', "$rootScope", "$timeout", "dialogService",  function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.OnInit = function () {
      
        $scope.ChangeNavigation_ClickEvent(1);
    }
    //["$scope", "$http", "$filter", "$location", '$mdDialog', "$rootScope", "$timeout", "dialogService",

    $scope.ChangeNavigation_ClickEvent = function (index) {
        try {
            $scope.formatIndex = index;
        } catch (e) {
            alert("ChangeNavigation_ClickEvent Listview" + e);
        }
    };
}]));