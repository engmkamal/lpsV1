(app.controller("BranchCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables

    $scope.BranchTitleDisplay = common.BranchTitleDisplay;
    $scope.branch = {
        id: null,
        region: {
            id: null,
            rangeId: null,
            Code: null,
            name: null
        },
        code: null,
        name: null,
        active: true,
    };


    /// .................. Funtions

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetAllRegion() {

        try {
            $http({
                url: "/Master/GetAllRegion",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listRegion = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };

    function GetBranchById() {
        var branchId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetBranchById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { branchId: branchId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.branch = response.data.output;

                if (!angular.isUndefined($scope.listRegion) && $scope.branch.region != null) {
                    var index = common.GetArrayIndexByValue($scope.listRegion, 'id', $scope.branch.region.id);
                    if (index !== -1)
                        $scope.branch.region = $scope.listRegion[index];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetBranchById: " + e);
        }
    };

    function SubmitBranch() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitBranch",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ branch: $scope.branch })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetBranch();
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
            alert('SubmitBranch ' + e);
        }
    }

    $scope.CancelBranch_ClickEvent = function () {
        try {
            ResetBranch();
        }
        catch (ex) {
            alert("Exception in CancelBranch_ClickEvent " + ex);
        }
    }

    function ResetBranch() {
        $scope.branch = {
            id: null,
            region: {
                id: null,
                rangeId: null,
                Code: null,
                name: null
            },
            code: null,
            name: null,
            active: true,
        };
    }

    $scope.Page_Load = function () {
        GetAllRegion();
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetBranchById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.SubmitBranch_ClickEvent = function () {
        try {
            SubmitBranch();
        } catch (e) {
            alert('SubmitBranch_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));