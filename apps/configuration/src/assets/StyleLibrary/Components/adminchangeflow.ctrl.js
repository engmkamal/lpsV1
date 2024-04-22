(app.controller("ChangeFlowCtrl", function ($scope, $http, $filter, dialogService) {

    $scope.listDAApprovalQueue = [];
    $scope.listDAQueueMapping = [];
    $scope.listDisplayQueue = [];
    $scope.roles = [];
    $scope.cprno = "";
    $scope.roleUser = null;
    $scope.listWfUser = [];
    $scope.saveButton = true;
    $scope.mappingUser = {
        id: 0,
        daqueueid: null,
        roleid: null,
        userid: null,
        level: null,
        rolename: null,
        username: null,
        status: null,
        isselecteduser: null,
        hierarchylevel: null
    };
    $scope.GetApprovals = function () {

        $scope.listWfUser.length = 0;
        $scope.listDAApprovalQueue.length = 0;

        $scope.selectedrole = null;
        $scope.roleUser = null;

        try {
            common.preprocessload();
            $http({
                url: "/Admin/ChangeWorkFlowUsers",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cpridString: $scope.cprno })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listDisplayQueue = response.data.output;

                    if ($scope.listDisplayQueue.dAApprovalQueue.length > 0) {
                        if ($filter("filter")($scope.listDisplayQueue.dAApprovalQueue, { status: "In Progress" }).length != 0
                            || $filter("filter")($scope.listDisplayQueue.dAApprovalQueue, { status: "Refer" }).length != 0
                            || $filter("filter")($scope.listDisplayQueue.dAApprovalQueue, { status: "Clarify" }).length != 0) {
                            $scope.listDAApprovalQueue = $scope.listDisplayQueue.dAApprovalQueue;
                            $scope.listDAQueueMapping = $scope.listDisplayQueue.dAQueueMapping;
                            $scope.saveButton = false;
                        } else {
                            dialogService.ConfirmDialogWithOkay('', "Cannot change path on completed application...");
                        }
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Path Not Found.");
                    }
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Existing path not found. Please check.");
                }
                common.preprocesshide();
            }, function errorCallback(response) {
                $scope.error = response;
            });


        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };

    $scope.clickSave = function () {


        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveChangeWorkFlowUsers",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    listDAApprovalQueue: $scope.listDAApprovalQueue,
                    listDAQueueMapping: $scope.listDAQueueMapping
                })
            }).then(function successCallback(response) {
                if (response.data != null) {

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    $scope.listDAApprovalQueue.length = 0;
                    $scope.listDAQueueMapping.length = 0;
                    $scope.cprno = null;
                    $scope.roleUser = null;
                    $scope.listWfUser.length = 0;
                }

                common.preprocesshide();
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('Save ' + e);
        }
    };


    $scope.GetRoles = function () {
        try {

            $http({
                url: "/Admin/GetRoles",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.roles = response.data.output;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });


        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };

    $scope.Page_Load = function () {
        $scope.GetRoles();

    };


    $scope.addUser = function (get) {

        if ($filter("filter")($scope.listWfUser, { userId: get.userId }).length == 0) {
            var level = $scope.listDAApprovalQueue[$scope.listDAApprovalQueue.length - 1].level + 1;

            $scope.mappingUser = {
                id: 0,
                daqueueid: "",
                roleid: $scope.selectedrole.id,
                userid: get.userId,
                level: level,
                rolename: $scope.selectedrole.name,
                username: get.displayName,
                status: true,
                isselecteduser: true,
                hierarchylevel: null
            };
            $scope.listWfUser.push(get);
            $scope.listDAQueueMapping.push($scope.mappingUser);
            $scope.roleUser = null;
        }

    };

    $scope.removeUser = function (item) {
        if (confirm("Are you sure you want to DELETE this User?") == true) {
            var obj = $filter("filter")($scope.listWfUser, { userId: item })[0];
            var index = $scope.listWfUser.indexOf(obj);
            $scope.listWfUser.splice(index, 1);


        }
    };

    $scope.changeUser = function (item) {
        if (confirm("Are you sure you want to CHANGE this User?") == true) {
            var obj = $filter("filter")($scope.listWfUser, { userId: item })[0];
            var index = $scope.listWfUser.indexOf(obj);
            $scope.listWfUser.splice(index, 1);


        }
    };

    $scope.AddRole = function (get) {

        $scope.listDAApprovalQueue[$scope.listDAApprovalQueue.length - 1].isDisable = false;

        var level = $scope.listDAApprovalQueue[$scope.listDAApprovalQueue.length - 1].level + 1;

        $scope.listDAApprovalQueue.push({
            roleid: $scope.selectedrole.id, rolename: $scope.selectedrole.name, level: level, isselected: true
            , parallel: $scope.selectedrole.parallel
            , minapproval: $scope.selectedrole.minapproval
            , bypass: $scope.selectedrole.bypass
            , parallel: $scope.selectedrole.Parallel
            , approvalmasterid: $scope.selectedrole.approvalmasterid
            , isDisable: true
        });

        $scope.listWfUser.length = 0;
        $scope.selectedrole = null;

    };


    $scope.clickClear = function () {
        if (confirm("Are you sure you want to Clear this?") == true) {
            $scope.listWfUser.length = 0;
            $scope.selectedrole = null;
            $scope.roleUser = null;
            $scope.cprno = null;
            $scope.listDAApprovalQueue.length = 0;
        }
    };

    $scope.ChangeCPRNo = function () {

        $scope.listWfUser.length = 0;
        $scope.selectedrole = null;
        $scope.roleUser = null;
        $scope.listDAApprovalQueue.length = 0;

    };

    $scope.Page_Load();

}));