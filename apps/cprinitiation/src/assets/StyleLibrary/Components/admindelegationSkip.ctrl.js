(app.controller("SkipUserCtrl", function ($scope, $http, $filter, dialogService) {
    $scope.searchTaskbyCprNo = 'CA Task';
    $scope.listTask = [];
    $scope.isEnable = true;
    $scope.PendingTaskListModel = {
        apprvalTaskListViewModels: null, 
        comments: '',
        moduleId: 0
    };
    $scope.comment = '';
    $scope.module = null;
    $scope.SelectAll = false;
    $scope.Selected = [];  

    function Page_Load() {
        try {
            GetModuleList();
            common.pageloadhide();

        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    $scope.checkAll = function () {

        $scope.SelectAll = !$scope.SelectAll;
        if ($scope.SelectAll) {

            angular.forEach($scope.listTask, function (cprModel) {
                idx = $scope.Selected.indexOf(cprModel);
                if (idx >= 0) {
                    return true;
                }
                else {
                    $scope.Selected.push(cprModel);

                }
            })
        }
        else {
            $scope.Selected = [];
        }
        console.log('select', $scope.Selected);
    }

    $scope.exist = function (cprModel) {
        return $scope.Selected.indexOf(cprModel) > -1;
    }

    $scope.toggleSelection = function (cprModel) {
        var idx = $scope.Selected.indexOf(cprModel);
        if (idx > -1) {
            $scope.Selected.splice(idx, 1);
        }
        else {
            $scope.Selected.push(cprModel);
        }
        console.log('select1', $scope.Selected);
    }


    function GetModuleList() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetModuleList",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                common.preprocesshide();
                if (response.data.success) {
                    console.log(response.data);
                    $scope.moduleList = response.data.output;
                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception GetCustomerSegmantAndProductList  " + e);
        }
    };

    $scope.findUserSkip = function () {

        if ($scope.daSkipUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        }

        if ($scope.PendingTaskListModel.moduleId == null) {
            dialogService.ConfirmDialogWithOkay('', "Select Any Module To proceed");
        }else {
            try {
                common.preprocessload(); 
                $http({
                    url: "/Admin/GetAllModuleWiseApprovalTaskListByUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ userId: $scope.daSkipUserName.userId, moduleId: $scope.PendingTaskListModel.moduleId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listTask = [];
                        $scope.listTask = response.data.output;

                        if ($scope.listTask.length > 0) {
                            $scope.isEnable = false;
                        }
                    }
                    else
                        dialogService.ConfirmDialogWithOkay('', global._recordNotFound);

                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('findUser ' + e);
            }
        }
    };

    $scope.clickClearUserSkip = function () {
        if (confirm("Are you sure you want to clear this?") == true) {
            $scope.daSkipUserName = null;
            $scope.listTask = [];
            $scope.isEnable = true;
            $scope.comment = '';
        }
    };

    $scope.clickSaveUserSkip = function () {
        if ($scope.daSkipUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        } else if ($filter("filter")($scope.listTask).length == 0) {
            dialogService.ConfirmDialogWithOkay('', "Please select task to delegate..!");
        }
        else if ($scope.PendingTaskListModel.comments == '') {
            dialogService.ConfirmDialogWithOkay('', "Comment is mandatory.");
        } else {
            try {
                common.preprocessload();
                $scope.PendingTaskListModel.apprvalTaskListViewModels  = $scope.Selected ;
                $http({
                    url: "/Admin/SaveDelegateUserSkip",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({pendingTaskList: $scope.PendingTaskListModel})
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                        $scope.daSkipUserName = null;
                        $scope.listTask = [];
                        $scope.isEnable = true;
                        $scope.PendingTaskListModel.comments = '';
                     
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Somthing went wrong. Please refresh the browser and try again..");
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('Save ' + e);
                common.preprocesshide();
            }
        }
    };

    Page_Load();
}));