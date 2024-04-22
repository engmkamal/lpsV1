(app.controller("SubSectionCtrl", function ($rootScope, $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.subSectionModel = {
        id: null,
        name: null,
        cPRMainSectionId:null,
        active: true
    };
   
    $scope.listSubSection = [];
    $scope.listMainSection = [];

    $scope.SaveSubSection = function () {
        try {
             $scope.subSectionModel.cPRMainSectionId = $scope.mainSection.id;
            $http({
                url: "/Admin/SaveSubSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRSubSectionModel: $scope.subSectionModel })
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    //alert("saved!!");
                    alert("Operation Successful");
                    $scope.LoadAllSubSection();
                    $scope.ResetSubSection();
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveSubSection" + e);
        }
    };
    $scope.LoadAllSubSection = function () {
        try {
            // alert("click");
            $http({
                url: "/Admin/GetAllSubSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: null
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    $scope.listSubSection = response.data.output;
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
    $scope.Init = function () {
        $scope.LoadAllSubSection();
        $scope.LoadAllMainSection();
    };
    $scope.EditSubSection = function (subSectionModel) {
        try {
            $scope.subSectionModel.id = subSectionModel.id;
         
            $scope.mainSection = $filter('filter')($scope.listMainSection, { id : subSectionModel.cPRMainSectionId })[0];
             $scope.subSectionModel.name = subSectionModel.name;
            $scope.subSectionModel.active = subSectionModel.active;
        }
        catch (ex) {
            alert("Exception in SubSection " + ex)
        }
    };
    $scope.ResetSubSection = function () {
        try {
            $scope.subSectionModel = {
                id: null,
                name: null,
                cPRMainSectionId: null,
                active: true
            };
        }
        catch (ex) {
            alert("Exception in ResetSubSection " + ex)
        }
    };

    //$scope.RemoveItemFromSubSection = function (list, subSectionModel) {
    //    try {
    //        if (list !== null && subSectionModel !== null) {
    //            if (subSectionModel.id === null)
    //                common.RemoveItemFromList(list, subSectionModel, true);
    //            else
    //                common.SetActiveFalseForRemovedItem(list, subSectionModel);
    //        }
    //    } catch (e) {
    //        alert("Exception RemoveItemFromGridList" + e);
    //    }
    //};
    $scope.RemoveSubSection = function (subSectionModel) {
        try {
            $scope.subSectionModel.id = subSectionModel.id;

            $scope.mainSection = $filter('filter')($scope.listMainSection, { id: subSectionModel.cPRMainSectionId })[0];
            $scope.subSectionModel.name = subSectionModel.name;
            $scope.subSectionModel.active = false;
            $scope.SaveSubSection();
        }
        catch (ex) {
            alert("Exception in SubSection " + ex)
        }
    };

}));