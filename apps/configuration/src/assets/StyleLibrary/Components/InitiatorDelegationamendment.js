(app.controller("InitiatorDelegationCtrl", function ($scope, $http, $filter, dialogService) {

    $scope.delegationInitiatorModel = {
        id: 0,
        userId: 0,
        requestId: 0,
        module: 0,
        initiator: null,
        delegatedInitiator: null,
        dAStatus: null,
        startDate: null,
        endDate: null,
        isScheduled: true,
        active: null,
        daUserName: null,
        daAssignTo: null,
        modified: null
    };

    $scope.data = $scope.cprSummary;
    $scope.Selected = [];
    $scope.SanctionSelected = [];
    $scope.DisbursmentSelected = [];
    $scope.SelectAll = false;
    $scope.SelectAllSanction = false;
    $scope.SelectAllDisbursment = false;
    $scope.adminDelegationModel = {
        delegationUserModelList: null,
        userRelatedTaskList: null
    };
    $scope.UpdateTaskCheckBox = true;
    $scope.isScheduled = false;
    $scope.isAddNew = false;
    $scope.listDAUser = [];
    $scope.listTask = [];
    $scope.taskRadio = "All";
    $scope.isEnable = true;
    $scope.moduleList = [];
    $scope.searchForModule = "List";
    $scope.sanctionRequestList = [];
    $scope.disbursmentRequestList = [];

    function Page_Load() {
        try {
            GetModuleList();
            common.pageloadhide();

        } catch (e) {
            alert("Page_Load " + e);
        }
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

    $scope.SearchCPR_ClickEvent = function () {
        try {
            if ($scope.daUserName == null) {
                dialogService.ConfirmDialogWithOkay('', "Pls Choose Initiator");
            }
            else if ($scope.delegationInitiatorModel.module == 0) {
                dialogService.ConfirmDialogWithOkay('', "Pls Choose Module First");
            }
            else {
                if ($scope.delegationInitiatorModel.module == 1) {
                    $scope.searchForModule = "CPR List";
                    GetAllCPRDetailsByUser();
                }
                else if ($scope.delegationInitiatorModel.module == 2) {
                    $scope.searchForModule = "SanctionRequest List";
                    GetAllSanctionRequestByUser();
                }
                else if ($scope.delegationInitiatorModel.module == 3) {
                    $scope.searchForModule = "DisbursmentRequest List";
                    GetAllDisbursmentRequestByUser();
                }
            }
        } catch (e) {
            alert("CopyCPR_ClickEvent " + e);
        }
    };

    function GetAllCPRDetailsByUser() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetAllCPRDetailsByUser",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ UserId: $scope.daUserName.userId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprSummary = response.data.output;
                    console.log('data', $scope.cprSummary);
                    $scope.cprSummaryFiltered = response.data.output;
                    console.log('data1', $scope.cprSummaryFiltered);
                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }

    function GetAllSanctionRequestByUser() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetAllSanctionRequestByUserId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ userId: $scope.daUserName.userId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.sanctionRequestList= response.data.output;
                    
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }

    function GetAllDisbursmentRequestByUser() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetAllDisbursmentRequestByUserId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ userId: $scope.daUserName.userId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.disbursmentRequestList = response.data.output;

                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }

    $scope.exist = function (sanction) {
        return $scope.Selected.indexOf(sanction) > -1;
    }

    $scope.Sanctionexist = function (sanction) {
        return $scope.SanctionSelected.indexOf(sanction) > -1;
    }

    $scope.Disbursmentexist = function (disbursment) {
        return $scope.DisbursmentSelected.indexOf(disbursment) > -1;
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

    $scope.SanctionToggleSelection = function (sanction) {
        var idx = $scope.SanctionSelected.indexOf(sanction);
        if (idx > -1) {
            $scope.SanctionSelected.splice(idx, 1);
        }
        else {
            $scope.SanctionSelected.push(sanction);
        }
        console.log('select1', $scope.SanctionSelected);
    }
    
    $scope.DisbursmentToggleSelection = function (disbursment) {
        var idx = $scope.DisbursmentSelected.indexOf(disbursment);
        if (idx > -1) {
            $scope.DisbursmentSelected.splice(idx, 1);
        }
        else {
            $scope.DisbursmentSelected.push(disbursment);
        }
        console.log('select1', $scope.DisbursmentSelected);
    }

    $scope.checkAll = function () {

        $scope.SelectAll = !$scope.SelectAll;
        if ($scope.SelectAll) {

            angular.forEach($scope.cprSummary.cPRDetaileds, function (cprModel) {
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
    
    $scope.checkAllSanction = function () {

        $scope.SelectAllSanction = !$scope.SelectAllSanction;
        if ($scope.SelectAllSanction) {

            angular.forEach($scope.sanctionRequestList, function (sanction) {
                idx = $scope.SanctionSelected.indexOf(sanction);
                if (idx >= 0) {
                    return true;
                }
                else {
                    $scope.SanctionSelected.push(sanction);

                }
            })
        }
        else {
            $scope.SanctionSelected = [];
        }

    }
    
    $scope.checkAllDisbursment = function () {

        $scope.SelectAllDisbursment = !$scope.SelectAllDisbursment;
        if ($scope.SelectAllDisbursment) {

            angular.forEach($scope.disbursmentRequestList, function (disbursment) {
                idx = $scope.DisbursmentSelected.indexOf(disbursment);
                if (idx >= 0) {
                    return true;
                }
                else {
                    $scope.DisbursmentSelected.push(disbursment);

                }
            })
        }
        else {
            $scope.DisbursmentSelected = [];
        }

    }

    $scope.clickSave = function () {
        if ($scope.daUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        } else if ($scope.delegationInitiatorModel.module == 0) {
            dialogService.ConfirmDialogWithOkay('', "Please Select Module First..!");
        }
        else if ($scope.daAssignTo == null) {
            dialogService.ConfirmDialogWithOkay('', "Delagate Name Cannot Be Empty..!");
        }
        else if ($scope.delegationInitiatorModel.module == 0 || $scope.delegationInitiatorModel.module == undefined) {
            dialogService.ConfirmDialogWithOkay('', "Select Module..!");
        }

        else {
            if ($scope.delegationInitiatorModel.module == 1) {
                SaveAndUpdateInitiatorForCPR();
            }
            else if ($scope.delegationInitiatorModel.module == 2) {
                SaveAndUpdateInitiatorForSanction();
            }
            else if ($scope.delegationInitiatorModel.module == 3) {
                SaveAndUpdateInitiatorForDisbursment();
            }
           
        }
    };

    function SaveAndUpdateInitiatorForCPR() {
        $scope.delegationInitiatorModel.userId = $scope.daUserName.userId;
        $scope.delegationInitiatorModel.assignToId = $scope.daAssignTo.userId;
        //$scope.adminDelegationModel.userRelatedTaskList = $scope.listTask;

        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveOrUpdateDelegatedInitiator",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprList: $scope.Selected, Allcpr: $scope.SelectAll, author: $scope.daAssignTo.userId, startDate: $scope.delegationInitiatorModel.startDate, endDate: $scope.delegationInitiatorModel.endDate, Module: $scope.delegationInitiatorModel.module })
            }).then(function successCallback(response) {
                if (response.data != null) {

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    GetAllCPRDetailsByUser();
                    Reset();

                    $scope.listDAUser = [];
                    $scope.listTask = [];
                    $scope.listDAUser = response.data.delegationUserModelList;
                    $scope.listTask = response.data.userRelatedTaskList;

                    $scope.daAssignTo = null;
                    $scope.delegationInitiatorModel.startDate = null;
                    $scope.delegationInitiatorModel.endDate = null;
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

    function SaveAndUpdateInitiatorForSanction() {
        $scope.delegationInitiatorModel.userId = $scope.daUserName.userId;
        $scope.delegationInitiatorModel.assignToId = $scope.daAssignTo.userId;
        //$scope.adminDelegationModel.userRelatedTaskList = $scope.listTask;

        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveOrUpdateDelegatedInitiatorForSanction",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    sanctionRequestViewModellist: $scope.SanctionSelected,
                    allSanctionRequestViewModellist: $scope.SelectAllSanction, author: $scope.daAssignTo.userId, 
                    startDate: $scope.delegationInitiatorModel.startDate,
                    endDate: $scope.delegationInitiatorModel.endDate, Module: $scope.delegationInitiatorModel.module
                })
            }).then(function successCallback(response) {
                if (response.data.success) {

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    GetAllSanctionRequestByUser();
                    Reset();

                    $scope.listDAUser = [];
                    $scope.listTask = [];
                    $scope.listDAUser = response.data.delegationUserModelList;
                    $scope.listTask = response.data.userRelatedTaskList;

                    $scope.daAssignTo = null;
                    $scope.delegationInitiatorModel.startDate = null;
                    $scope.delegationInitiatorModel.endDate = null;
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

    function SaveAndUpdateInitiatorForDisbursment() {
        $scope.delegationInitiatorModel.userId = $scope.daUserName.userId;
        $scope.delegationInitiatorModel.assignToId = $scope.daAssignTo.userId;
        //$scope.adminDelegationModel.userRelatedTaskList = $scope.listTask;

        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveOrUpdateDelegatedInitiatorForDisbursment",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    disbursementCPRDetailModellist: $scope.DisbursmentSelected,
                    allDisbursementCPRDetailModellist: $scope.SelectAllDisbursment, author: $scope.daAssignTo.userId,
                    startDate: $scope.delegationInitiatorModel.startDate,
                    endDate: $scope.delegationInitiatorModel.endDate, Module: $scope.delegationInitiatorModel.module
                })
            }).then(function successCallback(response) {
                if (response.data.success) {

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    GetAllDisbursmentRequestByUser();
                    Reset();

                    $scope.listDAUser = [];
                    $scope.listTask = [];
                    $scope.listDAUser = response.data.delegationUserModelList;
                    $scope.listTask = response.data.userRelatedTaskList;

                    $scope.daAssignTo = null;
                    $scope.delegationInitiatorModel.startDate = null;
                    $scope.delegationInitiatorModel.endDate = null;
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

    $scope.findUser = function () {

        if ($scope.daUserName == null) {
            dialogService.ConfirmDialogWithOkay('', "User Name Cannot Be Empty..!");
        }
        else {
            $scope.daAssignTo = null;
            $scope.delegationInitiatorModel.startDate = null;
            $scope.delegationInitiatorModel.endDate = null;
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
                        /*console.log('userId',userId);*/
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
                        delegationInitiatorModel: item
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
            $scope.delegationInitiatorModel = {
                id: 0,
                requestId: 0,
                moduleId: 0,
                initiator: null,
                delegatedInitiator: null,
                dAStatus: null,
                startDate: null,
                endDate: null,
                isScheduled: true,
                active: null,
                editor: null,
                modified: null
            };
            $scope.cprSummary = null;
            $scope.daUserName = null;
            $scope.ModuleList = null;
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

    function Reset() {

        $scope.delegationInitiatorModel = {
            id: 0,
            requestId: 0,
            moduleId: 0,
            initiator: null,
            delegatedInitiator: null,
            dAStatus: null,
            startDate: null,
            endDate: null,
            isScheduled: true,
            active: null,
            editor: null,
            modified: null
        };
        /*  $scope.cprSummary = null;*/
        $scope.daUserName = null;
        /* $scope.ModuleList =null; */
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



    Page_Load();
}));