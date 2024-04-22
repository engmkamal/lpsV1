(app.controller("relationshipCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listRelationship = [];
    $scope.relationship = {
        id: null,
        relationships: null,
        active: true,
    };

    function GetUrlParameters() {
        var relationshipId = (common.GetParameterByName("id", null));
        return relationshipId;
    };

    function GetRelationshipById() {
        var relationshipId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetRelationshipById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { relationshipId: relationshipId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.relationship = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRelationshipById: " + e);
        }
    };


    function SubmitRelationship() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitRelationship",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ relationship: $scope.relationship })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        //  ResetProposeTypeOfFacility();
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
            alert('SubmitRelationship ' + e);
        }
    }

    function ResetRelationship() {
        try {
            $scope.relationship = {
                id: null,
                relationships: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Relationship ' + ex)
        }

    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetRelationshipById();
        }
    };



    ///.................. Events

    $scope.CancelRelationship_ClickEvent = function () {
        try {
            ResetRelationship();
        }
        catch (ex) {
            alert("Exception in CancelRelationship_ClickEvent " + ex);
        }
    };

    $scope.SubmitRelationship_ClickEvent = function () {
        try {
            SubmitRelationship();
        } catch (e) {
            alert('SubmitRelationship_ClickEvent' + e);
        }
    }

    $scope.Page_Load();

}));