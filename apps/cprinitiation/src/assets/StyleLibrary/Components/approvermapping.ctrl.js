(app.controller("ApproverMappingCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables
    $scope.loadCount = 0;
    $scope.BranchTitleDisplay = common.BranchTitleDisplay;
    $scope.approverMapping = {
        id: null,
        role: null,
        range: null,
        region: null,
        branch: null,
        listApprovalUser: [],
        active: true
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetAllBranches() {
        try {
            $http({
                url: "/Master/GetAllBranches",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listBranch = response.data.output;
                    $scope.loadCount++;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllBranches: " + e);
        }
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
                if (response.data.success) {
                    $scope.listRegion = response.data.output;
                    $scope.loadCount++;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };

    function GetAllRange() {
        try {
            $http({
                url: "/Master/GetAllRange",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listRange = response.data.output;
                    $scope.loadCount++;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRole: " + e);
        }
    };

    function GetAllRole() {
        try {
            $http({
                url: "/Master/GetRoles",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listRole = response.data.output;
                    $scope.loadCount++;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRole: " + e);
        }
    };

    function GetBranchById(branchId) {
        try {
            if (!angular.isUndefined($scope.listBranch)) {
                var index = common.GetArrayIndexByValue($scope.listBranch, 'id', branchId);
                $scope.approverMapping.branch = $scope.listBranch[index];
                //GetRegionById($scope.approverMapping.branch.region.id);
                return $scope.approverMapping.branch;
            }

        } catch (e) {
            alert("Exception GetBranchById: " + e);
        }
    };

    function GetRegionById(regionId) {
        try {
            if (!angular.isUndefined($scope.listRegion)) {
                var index = common.GetArrayIndexByValue($scope.listRegion, 'id', regionId);
                $scope.approverMapping.region = $scope.listRegion[index];
                //GetRangeById($scope.approverMapping.region.range.id);
                return $scope.approverMapping.region;
            }

        } catch (e) {
            alert("Exception GetRegionById: " + e);
        }
    };

    function GetRangeById(rangeId) {
        try {
            if (!angular.isUndefined($scope.listRange)) {
                var index = common.GetArrayIndexByValue($scope.listRange, 'id', rangeId);
                $scope.approverMapping.range = $scope.listRange[index];
                return $scope.approverMapping.range;
            }

        } catch (e) {
            alert("Exception GetRangeById: " + e);
        }
    };

    function GetRoleById(roleId) {
        try {
            if (!angular.isUndefined($scope.listRole)) {
                var index = common.GetArrayIndexByValue($scope.listRole, 'id', roleId);
                $scope.approverMapping.role = $scope.listRole[index];
                //$scope.listRole[index].isSelectDisabled = true;
            }

        } catch (e) {
            alert("Exception GetRoleById: " + e);
        }
    };

    function GetRolesByBranchIdRegionIdRangeId(branchId, regionId, rangeId) {
        try {
            $http({
                url: "/Master/GetRolesByBranchIdRegionIdRangeId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ branchId: branchId, regionId: regionId, rangeId: rangeId })
            }).then(function successCallback(response) {
                debugger;
                if (response.data.success) {
                    $scope.roleFilter = response.data.output;
                    SetRoleDisbled($scope.roleFilter);
                }
            }, function errorCallback(response) {

            });
        } catch (e) {

        }
    };

    function GetApproverMappingById() {
        var approverMappingId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetApproverMappingById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { approverMappingId: approverMappingId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.approverMapping = response.data.output;
                    var branch = GetBranchById($scope.approverMapping.branch.id);
                    var region = GetRegionById(branch.region.id);
                    var range = GetRangeById(region.range.id);
                    GetRoleById($scope.approverMapping.role.id);
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetApproverMappingById: " + e);
        }
    };

    function AddUserToApproverList(user) {
        try {

            if (angular.isUndefined($scope.approverMapping.listApprovalUser))
                $scope.approverMapping.listApprovalUser = [];
            $scope.approvalUser = {
                id: 0,
                approverMappingId: 0,
                approver: user,
                active: true
            };
            $scope.approverMapping.listApprovalUser.push($scope.approvalUser);
            $scope.approver = null;

        } catch (e) {
            alert("Exception AddUserToApproverList: " + e);
        }
    };

    function SubmitApproverMapping() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitApproverMapping",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ approverMapping: $scope.approverMapping })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetApproverMapping();
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
            alert("Exception SubmitApproverMapping: " + e);
        }
    };

    $scope.CancelApproverMapping_ClickEvent = function () {
        try {
            ResetApproverMapping();
        }
        catch (ex) {
            alert("Exception in CancelApproverMapping_ClickEvent" + ex);
        }
    }

    function ResetApproverMapping() {
        $scope.approverMapping = {
            id: null,
            role: null,
            range: null,
            region: null,
            branch: null,
            listApprovalUser: [],
            active: true
        };
    }

    function SetRoleDisbled(roleFilter) {
        try {
            if ($scope.listRole != null) {
                debugger;
                for (var i = 0; i < $scope.listRole.length; i++) {
                    $scope.listRole[i].isSelectDisabled = false;
                    var role = $filter('filter')(roleFilter, { role: { id: $scope.listRole[i].id } });
                    if (role.length > 0)
                        $scope.listRole[i].isSelectDisabled = true;

                }
            }
        } catch (e) {
            alert("Exception SetRoleDisbled: " + e);
        }
    };

    ///.................. Events

    $scope.SelectBranch_ChangeEvent = function (branch) {
        try {
            debugger;
            if (branch != null) {
                var region = GetRegionById(branch.region.id);
                var range = GetRangeById(region.range.id);
                if (range.id !== null || range.id !== undefined) {
                    GetRolesByBranchIdRegionIdRangeId(branch.id, region.id, range.id);
                }
            }
        } catch (e) {
            alert("Exception SelectBranch_ChangeEvent: " + e);
        }
    };

    $scope.AddUser_ClickEvent = function (user) {
        try {

            if (user != null)
                AddUserToApproverList(user);
        } catch (e) {
            alert("Exception AddUser_ClickEvent: " + e);
        }
    };

    $scope.RemoveUser_ClickEvent = function (list, user) {
        try {
            if (list != null && user != null)
                common.RemoveItemFromList(list, user, true);
        } catch (e) {
            alert("Exception RemoveUser_ClickEvent: " + e);
        }
    };

    $scope.SubmitApproverMapping_ClickEvent = function () {
        try {

            SubmitApproverMapping();
        } catch (e) {
            alert('SubmitApproverMapping_ClickEvent ' + e);
        }
    }

    $scope.Page_Load = function () {
        GetAllBranches();
        GetAllRegion();
        GetAllRange();
        GetAllRole();
    };

    $scope.Page_Load();

    $scope.$watch('loadCount', function LoadRequest() {

        if ($scope.loadCount == 4) {
            var urlParameter = GetUrlParameters();
            if (urlParameter != null) {
                GetApproverMappingById();
            }
            else {

            }
            $scope.loadCount++;
        }
    });

}));