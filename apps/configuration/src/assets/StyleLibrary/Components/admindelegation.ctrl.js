(app.controller("DelegationUserCtrl", function ($scope, $http, $filter, dialogService) {

    $scope.delegationUserModel = {
        id: 0,
        userId: 0,
        assignToId: 0,
        userName: null,
        assignTo: null,
        startDate: null,
        endDate: null,
        isScheduled: true,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null
    };
    $scope.adminDelegationModel = {
        delegationUserModelList: null,
        userRelatedTaskList: null
    };

    $scope.daUserName = null;
    $scope.daAssignTo = null;
    $scope.UpdateTaskCheckBox = true;
    $scope.isScheduled = false;
    $scope.isAddNew = false;
    $scope.listDAUser = [];
    $scope.listTask = [];
    $scope.taskRadio = "All";

    $scope.isEnable = true;

    $scope.clickSave = function () {
        if ($scope.daUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        } else if ($scope.daAssignTo == null) {
            dialogService.ConfirmDialogWithOkay('', "Delagate Name Cannot Be Empty..!");
        }
        else if ($scope.delegationUserModel.isScheduled && $scope.delegationUserModel.startDate == null) {
            dialogService.ConfirmDialogWithOkay('', "Start Date Cannot Be Empty..!");
        }
        else if ($scope.delegationUserModel.isScheduled && $scope.delegationUserModel.endDate == null) {
            dialogService.ConfirmDialogWithOkay('', "End Date Cannot Be Empty..!");
        } else if (!$scope.delegationUserModel.isScheduled && $filter("filter")($scope.listTask, { isActive: true }).length==0) {
            dialogService.ConfirmDialogWithOkay('', "Please select task to delegate..!");
        }else {

            $scope.delegationUserModel.userId = $scope.daUserName.userId;
            $scope.delegationUserModel.assignToId = $scope.daAssignTo.userId;
            $scope.adminDelegationModel.userRelatedTaskList = $scope.listTask;

            try {
                common.preprocessload();
                $http({
                    url: "/Admin/SaveDelegateUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        delegationUserModel: $scope.delegationUserModel,
                        updateTaskCheckBox: $scope.UpdateTaskCheckBox,
                        isSelected: $scope.isScheduled,
                        isAddNew: $scope.isAddNew,
                        adminDelegationModel: $scope.adminDelegationModel
                    })
                }).then(function successCallback(response) {
                    if (response.data != null) {

                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                        $scope.listDAUser = [];
                        $scope.listTask = [];
                        $scope.listDAUser = response.data.delegationUserModelList;
                        $scope.listTask = response.data.userRelatedTaskList;

                        $scope.daAssignTo = null;
                        $scope.delegationUserModel.startDate = null;
                        $scope.delegationUserModel.endDate = null;
                        $scope.UpdateTaskCheckBox = true;
                        $scope.isEnable = true;
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Somthing went wrong. Please refresh the browser and try again..");
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('Save ' + e);
            }
        }
    };

    $scope.findUser = function () {

        if ($scope.daUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        } else {
            $scope.daAssignTo = null;
            $scope.delegationUserModel.startDate = null;
            $scope.delegationUserModel.endDate = null;
            $scope.UpdateTaskCheckBox = true;
            $scope.listTask = [];

            try {
                common.preprocessload();
                $http({
                    url: "/Admin/GetDelegateUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        userId: $scope.daUserName.userId
                    })
                }).then(function successCallback(response) {
                    if (response.data != null) {
                        $scope.listDAUser = response.data.delegationUserModelList;
                        $scope.listTask = response.data.userRelatedTaskList;

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
                alert('Save ' + e);
            }
        }
    };

    $scope.changeRadio = function (item) {
        if (item == "All") {
            $scope.UpdateTaskCheckBox = true;
            $scope.isScheduled = false;
            $scope.isAddNew = false;

        } else if (item == "Replace") {
            $scope.UpdateTaskCheckBox = false;
            $scope.isScheduled = true;
            $scope.isAddNew = false;
        }
        else if (item == "AddNew") {
            $scope.UpdateTaskCheckBox = false;
            $scope.isScheduled = false;
            $scope.isAddNew = true;
        }
    };

    $scope.cancelDelegate = function (item) {
        if (confirm("Are you sure you want to CANCEL this?") == true) {
            try {

                common.preprocessload();
                $http({
                    url: "/Admin/DeleteDelegateUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        delegationUserModel: item
                    })
                }).then(function successCallback(response) {
                    if (response.data != null) {
                        $scope.listDAUser = response.data.delegationUserModelList;
                        $scope.listTask = response.data.userRelatedTaskList;

                        if ($scope.listTask.length > 0) {
                            $scope.isEnable = false;
                        }
                    }
                    else
                        alert("Record not found");

                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('Save ' + e);
            }
        }
    };

    $scope.clickClear = function () {
        if (confirm("Are you sure you want to clear this?") == true) {
            $scope.delegationUserModel = {
                id: 0,
                userId: 0,
                assignToId: 0,
                userName: null,
                assignTo: null,
                startDate: null,
                endDate: null,
                isScheduled: null,
                active: null,
                editor: null,
                modified: null,
                author: null,
                created: null
            };

            $scope.daUserName = null;
            $scope.daAssignTo = null;
            $scope.UpdateTaskCheckBox = true;
            $scope.isScheduled = false;
            $scope.isAddNew = false;
            $scope.listDAUser = [];
            $scope.listTask = [];
            $scope.isEnable = true;
            $scope.taskRadio = {
                value: "All"
            };
        }
    };
}));