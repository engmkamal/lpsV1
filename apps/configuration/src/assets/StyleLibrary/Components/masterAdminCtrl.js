(app.controller("masterAdminCtrl", function ($rootScope
    , $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.requestChange = {
        remark: null,
        enableSaveDraft: false,
        cPRId: null,
        EditableReason: null,
        completedReason: null
    };

    $scope.searchTerm = {
        CPRNo: null,
        CPRNO: null
    }
    $scope.cPRChangeRequestStatuesBindViewModel = {
        cPRChangeStatusViewModel: null,
        cPRPendingChangeRequestDataViewViewModel: null
    }
    $scope.count = 0;
    $scope.sortTerm = null;

    //$scope.completeRequest.completedReason = null;
    $scope.cPREditableRequestModel =
        {
            Id: null,
            CPRId: null,
            ChangeBy: null,
            SaveDraftEnable: true,
            EditableReason: null,
            CompletedBy: null,
            CompletedReason: null,
            RequestStatus: null,
            Action: null,
            Author: null,
            Created: new Date(),
            Editor: null,
            Modified: new Date(),
            Active: true
        }


    $scope.changeRequestRedirectUrl = "/CPR/Initiation?cprno=@cprno&SPHostUrl=";

    function GetAllChangeRequests() {
        try {
            $http({
                url: "/Admin/GetAllChangeRequests",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)

                    $scope.cPRChangeRequestStatuesBindViewModel = response.data.output;
                //console.log($scope.cPRChangeRequestStatuesBindViewModel);
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {

        }
    };



    function SaveChangerequest(EditableReason, enableSaveDraft, id) {

        //if ($scope.cPRChangeRequestStatuesBindViewModel.cPRPendingChangeRequestDataViewViewModel.cPRId != 0)
        //{
        //    $scope.cPREditableRequestModel.CPRId = $scope.cPRChangeRequestStatuesBindViewModel.cPRPendingChangeRequestDataViewViewModel.cPRId;
        //    console.log("CPRId " + $scope.cPREditableRequestModel.CPRId);
        //}

        try {
            if ($rootScope.requestChange.EditableReason !== null || $rootScope.requestChange.EditableReason !== "" || $rootScope.requestChange.EditableReason !== undefined) {
                $scope.cPREditableRequestModel.EditableReason = EditableReason;
                $scope.cPREditableRequestModel.SaveDraftEnable = enableSaveDraft;
                $scope.cPREditableRequestModel.CPRId = id;
                $http({
                    url: "/Admin/SaveChangerequest",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPREditableRequestModel: $scope.cPREditableRequestModel }
                }).then(function successCallback(response) {
                    if (response.data.success)
                        //alert("Successful! ");
                        $mdDialog.hide();
                    GetAllChangeRequests();

                }, function errorCallback(response) {
                    $scope.error = response;
                });
            }
        } catch (e) {

        }
    };

    function SaveCompleteRequest(CompletedReason, id) {

        try {
            //if (!($scope.requestChange.EditableReason === "" || $scope.requestChange.EditableReason === null || $scope.requestChange.EditableReason === undefined) && !($scope.requestChange.enableSaveDraft === "" || $scope.requestChange.enableSaveDraft === null || $scope.requestChange.enableSaveDraft === false))
            if ($rootScope.requestChange.completedReason !== null || $rootScope.requestChange.completedReason !== "" || $rootScope.requestChange.completedReason !== undefined) {
                $scope.cPREditableRequestModel.CompletedReason = CompletedReason;
                //$scope.cPREditableRequestModel.SaveDraftEnable = enableSaveDraft;
                $scope.cPREditableRequestModel.CPRId = id;
                $http({
                    url: "/Admin/SaveCompleteequest",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPREditableRequestModel: $scope.cPREditableRequestModel }
                }).then(function successCallback(response) {
                    if (response.data.success)
                        //alert(response.data.message);
                        $mdDialog.hide();
                    GetAllChangeRequests();

                }, function errorCallback(response) {
                    $scope.error = response;
                });
            }
        } catch (e) {

        }
    };



    $scope.CompletedEditable_ClickEvent = function (changeRequest, ev) {

        if (changeRequest != null) {
            var id = changeRequest.id;
            $scope.cPREditableRequestModel.CPRId = changeRequest.id;


            $mdDialog.show({
                templateUrl: 'completeRequest.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                targetEvent: ev,
                scope: $rootScope,
                preserveScope: true,
                controller: 'masterAdminCtrl',
                bindToController: true
            })
                .then(function (answer) {
                    //console.log("test " + $rootScope.requestChange.completedReason,);
                    SaveCompleteRequest($rootScope.requestChange.completedReason, id);
                }, function () {
                    $rootScope.status = '';
                });
        }
    }

    $scope.CompletedPendingEditable_ClickEvent = function (changeRequest, ev) {

        if (changeRequest != null) {
            var id = changeRequest.cPRId;
            $scope.cPREditableRequestModel.CPRId = changeRequest.id;


            $mdDialog.show({
                templateUrl: 'completeRequest.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                targetEvent: ev,
                scope: $rootScope,
                preserveScope: true,
                controller: 'masterAdminCtrl',
                bindToController: true
            })
                .then(function (answer) {
                    console.log("test " + id);
                    SaveCompleteRequest($rootScope.requestChange.completedReason, id);
                }, function () {
                    $rootScope.status = '';
                });
        }
    }


    $scope.SaveChangerequest_ClickEvent = function (requestChange) {
        if (($scope.requestChange.EditableReason !== "" || $scope.requestChange.EditableReason !== null || $scope.requestChange.EditableReason !== undefined)) {
            $mdDialog.hide();
        }
    }

    $scope.ChangeEditable_ClickEvent = function (changeRequest, ev) {

        if (changeRequest != null) {
            var id = changeRequest.id;
            $scope.cPREditableRequestModel.CPRId = changeRequest.id;


            $mdDialog.show({
                templateUrl: 'changeRequest.tmpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                targetEvent: ev,
                scope: $rootScope,
                preserveScope: true,
                controller: 'masterAdminCtrl',
                bindToController: true
            })
                .then(function (answer) {
                    //console.log("ssss "+$rootScope.requestChange.EditableReason);
                    //console.log("ssss "+$rootScope.requestChange.enableSaveDraft);
                    SaveChangerequest($rootScope.requestChange.EditableReason, $rootScope.requestChange.enableSaveDraft, id);
                }, function () {
                    $rootScope.status = '';
                });
        }
    }

    $scope.sortArray = function (name) {
        try {

            if ($scope.sortTerm === name)
                $scope.sortTerm = "-" + name;
            else
                $scope.sortTerm = name;

            $scope.cPRChangeRequestStatuesBindViewModel.CPRChangeStatusViewModel = $filter('orderBy')($scope.cPRChangeRequestStatuesBindViewModel.CPRChangeStatusViewModel
                , $scope.sortTerm, false);


        } catch (e) {
            alert("sortArray " + e);
        }
    };

    $scope.sortIcon = function (name) {
        try {
            if ($scope.sortTerm != null)
                if ($scope.sortTerm.includes(name) == true) {
                    if ($scope.sortTerm.includes('-') != true)
                        return 'sort-arr';
                    else
                        return 'sort-arr descending';
                }
            return null;
        } catch (e) {
            alert("sortArray " + e);
        }
    };

    $scope.removeDialog = function () {
        $mdDialog.hide();
    }

    $scope.Page_Load = function () {
        GetAllChangeRequests();
    };


    $scope.checkUrl = function (changeRequest) {
        var cprId = changeRequest.encrypedCPRId;
        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
        if (spHostUrl != null) {
            $scope.changeRequestRedirectUrl += spHostUrl;
        }
        window.location.href = $scope.changeRequestRedirectUrl.replace("@cprno", cprId);
    }



    $scope.SearchByCPRNo = function () {
        try {
            SearchRecordByCPRNo();
        }
        catch (ex) {
            alert("Exception in SerachRecord" + ex);
        }
    }

    function SearchRecordByCPRNo() {
        try {
            $http({
                url: "/Admin/SearchRecordByCPRNo",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { keyword: $scope.searchTerm.CPRNo }
            }).then(function successCallback(response) {
                if (response.data.success)

                    $scope.cPRChangeRequestStatuesBindViewModel.CPRChangeStatusViewModel = response.data.output;

            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {

        }
    }



    $scope.SearchByCPRNoForPendingRequests = function () {
        try {
            SearchByCPRNoForPending();
        }
        catch (ex) {
            alert("Exception in SearchByCPRNoForPendingRequests" + ex);
        }
    }
    function SearchByCPRNoForPending() {
        try {
            $http({
                url: "/Admin/SearchByCPRNoForPending",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { keyword: $scope.searchTerm.CPRNO }
            }).then(function successCallback(response) {
                if (response.data.success)

                    $scope.cPRChangeRequestStatuesBindViewModel.CPRPendingChangeRequestDataViewViewModel = response.data.output;

            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {

        }
    }

    $scope.Page_Load();


}));

