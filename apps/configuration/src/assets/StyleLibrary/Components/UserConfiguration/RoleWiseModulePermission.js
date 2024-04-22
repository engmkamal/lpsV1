(app.controller("AdminCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.userRoleWiseModule = {
        Id: null,
        RoleId: null,
        ModuleId: null,
        Users: []
    }

    $scope.userRoleWiseModule.Users = {
        UserId: null,
        UserName: null
    }

    $scope.userRoleWiseModuleList = [];
    $scope.daUserName = null;
    //$scope.daUserName = {
    //    userId: null,
    //    userName: null

    //}
    $scope.userId = null;
    $scope.userName = null;

    $scope.Page_Load = function () {
        GetAllRole();
        GetAllModule();
        GetAllRMPermission();
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

    function GetAllModule() {

        try {
            $http({
                url: "/Admin/LoadModuleList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data != null)
                    $scope.moduleList = response.data;
                console.log($scope.moduleList);
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRole: " + e);
        }
    };

    function IsAlreadyExistInList()
    {
        var next = true;
        angular.forEach($scope.userRoleWiseModuleList, function (value, key) {
            if (value.UserId == $scope.daUserName.userId
                && value.RoleId == $scope.userRoleWiseModule.RoleId
                && value.ModuleId == $scope.userRoleWiseModule.ModuleId) {
                alert("User is already exist in the list !");
                next = false;
            }
        });
    }

    function SubmitRoleWiseModule() {
     
        try { 
           
            common.preprocessload();
            $scope.userRoleWiseModule.Users = $scope.userList;
            $http({
                url: "/Admin/AddOrUpdateRoleWiseModulePermission",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ userRoleWiseModule: $scope.userRoleWiseModule })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetUserRoleWiseModulePermission();
                        GetAllRMPermission();
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
            alert('SubmitRoleWiseModule ' + e);
        }
    }

    function GetAllRMPermission() {

        try {
            $http({
                url: "/Admin/LoadAllURMPermission",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.userRoleWiseModuleList = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRole: " + e);
        }
    };

    $scope.userList = [];

    function addUser() {
        if ($scope.userRoleWiseModule.ModuleId != null) {
            if ($scope.userRoleWiseModule.RoleId != null) {
                var next = true;
                angular.forEach($scope.userRoleWiseModuleList, function (value, key) {
                    if (value.UserId == $scope.daUserName.userId
                        && value.RoleId == $scope.userRoleWiseModule.RoleId
                        && value.ModuleId == $scope.userRoleWiseModule.ModuleId) {
                        dialogService.ConfirmDialogWithOkay('', "User already exist in the list with same module and role!");
                        next = false;
                    }
                });

                if (next)
                {
                    if ($scope.userList.length >= 0) {
                        var go = true;
                        angular.forEach($scope.userList, function (value, key) {
                            if (value.userId == $scope.daUserName.userId) {
                                dialogService.ConfirmDialogWithOkay('', "User already exist !");
                                go = false;
                            }
                        });
                        if (go) {
                            $scope.userId = $scope.daUserName.userId;
                            $scope.userName = $scope.daUserName.displayName;
                            $scope.userList.push({ userId: $scope.userId, userName: $scope.userName });
                            $scope.userName = "";
                        }

                    }
                }
                
            }
            else {
                dialogService.ConfirmDialogWithOkay('', "Please select any role !");
            }
           
        }
        else {
            dialogService.ConfirmDialogWithOkay('', "Please select module first !");
            //alert("Please Select Module First !");
        }
           
    };

    $scope.DeleteURMPermission = function (userRMPermission)
    {
        try {
            common.preprocessload();

            $http({
                url: "/Admin/DeleteUserRoleModulePermission",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { userRMPermission: userRMPermission }

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._deletemessage).then(function successCallback(response) {
                        GetAllRole();
                        GetAllRMPermission();
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
            alert('DeleteURMPermission ' + e);
        }
    }

  
    $scope.AddUsers_ClickEvent = function () {
        try {
            addUser();
        } catch (e) {
            alert('AddUsers_ClickEvent ' + e);
        }
    } 

    $scope.removeUser = function (index) {
        $scope.userList.splice(index, 1); 
       
        //$scope.listOfUsers = $scope.userList;
        //$scope.listOfUsers;
    }

    $scope.AddRoleWiseModule_ClickEvent = function () {
        try {
            SubmitRoleWiseModule();
        } catch (e) {
            alert('AddRoleWiseModule_ClickEvent' + e);
        }
    } 

    function ResetUserRoleWiseModulePermission() {
        $scope.userRoleWiseModule = {
            Id: null,
            RoleId: null,
            ModuleId: null,
            Users: []
        };
        $scope.userList = [];
        $scope.daUserName = null;
      
    }

    $scope.Page_Load();

}));