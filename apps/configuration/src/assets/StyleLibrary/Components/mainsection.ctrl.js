(app.controller("MainSectionCtrl", function ($rootScope
    , $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.mainSectionModel = {
        id: null,
        name: null,        
        active: true
    };
    $scope.listMainSection = [];
    $scope.SaveMainSection = function () {
        try {
            //alert("click");
            $http({
                url: "/Admin/SaveMainSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRMainSectionModel: $scope.mainSectionModel })
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    alert("Operation Successful!!");
                    $scope.LoadAllMainSection();
                    $scope.ResetMainSection();
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };

    $scope.LoadAllMainSection = function () {
        try {
           // alert("click");
            $http({
                url: "/Admin/GetAllMainSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: null
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    $scope.listMainSection = response.data.output;
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };

    $scope.EditMainSection = function (mainSectionModel) {
        try {
            $scope.mainSectionModel.name = mainSectionModel.name;
            $scope.mainSectionModel.id = mainSectionModel.id;
            $scope.mainSectionModel.active = mainSectionModel.active;
        }
        catch (ex) {
            alert("Exception in MainSection " + ex)
        }
        };
    $scope.ResetMainSection = function () {
        try {
            $scope.mainSectionModel = {
                id: null,
                name: null,
                active: true
            };
        }
        catch (ex) {
            alert("Exception in ResetMainSection " + ex)
        }
    };
    $scope.RemoveMainSection = function (mainSectionModel) {
        try {
            $scope.mainSectionModel.name = mainSectionModel.name;
            $scope.mainSectionModel.id = mainSectionModel.id;
            $scope.mainSectionModel.active = false;
            $scope.SaveMainSection();
        }
        catch (ex) {
            alert("Exception in MainSection " + ex)
        }
    };
}));