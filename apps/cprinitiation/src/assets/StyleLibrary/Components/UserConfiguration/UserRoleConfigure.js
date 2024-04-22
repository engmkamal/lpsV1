

(app.controller("AdminCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.userRole = {
        id: null,
        roleId:null,                           
        userId: null,     
        active: true,
    };

    $scope.daUserName = {
        userId: null,
        userName: null
    
    }

    $scope.roleList = [];

    $scope.Page_Load = function () {
        GetAllRole();
        GetAllUserRoles();

    };

    function GetAllUserRoles() {
        try {
            $http({
                url: "/Admin/LoadAllUserRoleList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data)
                    $scope.listUserRole = response.data;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllBranches: " + e);
        }
    };

    function GetAllRole() {

        try {
            $http({
                url: "/Admin/LoadRoleList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data != null)
                    $scope.roleList = response.data;
                console.log($scope.roleList);
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRole: " + e);
        }
    };

    $scope.GetUserRole = function GetUserRoleById(userRole) {

        $scope.userRole.id = userRole.Id;
        $scope.userRole.roleId = userRole.RoleId;
        $scope.daUserName.userName = userRole.UserName;
        $scope.daUserName.userId = userRole.UserId;
        $scope.userRole.active = userRole.Active;
       
    };

    function SubmitUserRole() {     
        try {
            common.preprocessload();
            $scope.userRole.userId = $scope.daUserName.userId;
            $http({
                url: "/Admin/CreateOrUpdateUserRole",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ userRole: $scope.userRole })
             
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        GetAllRole();
                        GetAllUserRoles();
                        ResetUserRole();
                        //var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        //if (spHostUrl != null) {
                        //    window.location.href = common.adminRedirectUrl += spHostUrl;
                        //}
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
            alert('SubmitUserRole ' + e);
        }
    }

    function ResetUserRole() {
        $scope.userRole = {
            id: null,
            roleId: null,
            userId: null,
            active: true,
        };

        $scope.daUserName = {
            userId: null,
            userName: null

        }
    }

    $scope.DeleteUserRole = function DeleteUserRole(id) {
        try {
            common.preprocessload();
            
            $http({
                url: "/Admin/DeleteUserRole",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { id: id }

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._deletemessage).then(function successCallback(response) {
                        GetAllRole();
                        GetAllUserRoles();
                        ResetUserRole();
                        //var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        //if (spHostUrl != null) {
                        //    window.location.href = common.adminRedirectUrl += spHostUrl;
                        //}
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

    $scope.SubmitUserRole_ClickEvent = function () {
        try {
            SubmitUserRole();
        } catch (e) {
            alert('SubmitUserRole_ClickEvent ' + e);
        }
    }

    //$scope.GetUserRole_ClickEvent = function (userRole) {
    //    try {
    //        GetUserRoleById(userRole.id);
    //    } catch (e) {
    //        alert('GetUserRole_ClickEvent ' + e);
    //    }
    //}
    
    $scope.Page_Load();

}));