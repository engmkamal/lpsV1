(app.controller("WorkingCaptialMasterCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.workingcaptialmaster = {
        id: null,
        customerSegment: null,
        workingCapitalItem: null,
        workingCapitalSubItem: null,
        subItem: null,
        isTotal: true,
        active: true,
        isNew: false,
        customerSegmentId:''
    };
    $scope.subItems = [
        {
            id: 1,
            name: '+'        
        },
        {
            id: 2,
            name: '-'           
        }

    ];
    //$scope.selectedSubitem = { id: 1, name: '+' };
    $scope.isTotal = [
        { id: 1, name: 'Yes', value: true },
        { id: 2, name: 'No', value: false }
    ];
    //
    $scope.workingcaptialmasterList = [];
    /// .................. Funtions

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetAllCustomerSegment() {

        try {
            $http({
                url: "/Master/GetAllCustomerSegment",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    console.log(response.data.output);
                $scope.listCustomerSegment = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };
    function GetAllCPRWorkingCapitalMaster() {

        try {
            $http({
                url: "/Master/GetAllCPRWorkingCapitalMaster",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    debugger;
                    console.log(response.data.output);
                    $scope.workingcaptialmasterList = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };

    function GetCPRWorkingCapitalMasterById() {
        var cPRWorkingCapitalMasterId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCPRWorkingCapitalMasterById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRWorkingCapitalMasterId: cPRWorkingCapitalMasterId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.workingcaptialmaster = response.data.output;

                if (!angular.isUndefined($scope.listRegion) && $scope.workingcaptialmaster.region != null) {
                    var index = common.GetArrayIndexByValue($scope.listRegion, 'id', $scope.workingcaptialmaster.region.id);
                    if (index !== -1)
                        $scope.workingcaptialmaster.region = $scope.listRegion[index];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCPRWorkingCapitalMasterById: " + e);
        }
    };
    $scope.AddWorkingCapitalMaster_ClickEvent = function () {
        
        try {
            if ($scope.workingcaptialmaster.id == null) {
                $scope.workingcaptialmaster.isNew = true;
            }
            else {
                $scope.workingcaptialmaster.isNew = false;
            }
            $scope.workingcaptialmasterList.push($scope.workingcaptialmaster);
            // $scope.workingcaptialmasterList.push($scope.workingcaptialmaster);

            ResetWorkingCapitalMasterListItem();
        }
        catch (ex) {
            alert("Excetption in AddWorkingCapitalMaster_ClickEvent" + ex);
        }
    
    }
    function ResetWorkingCapitalMasterListItem() {
        $scope.workingcaptialmaster = {
            id:null,
            customerSegment: null,
            workingCapitalItem: null,
            workingCapitalSubItem: null,
            subItem: null,
            isTotal: true,
            active: true,
            isNew: false
        };
    }
    $scope.EditItem_ClickEvent = function (object) {

        try {
                $scope.workingcaptialmasterList.splice($scope.workingcaptialmasterList.indexOf(object), 1);
                $scope.workingcaptialmaster = object;
        }
        catch (ex) {
            alert("Excetption in EditItem_ClickEvent" + ex);
        }
    }
    $scope.DeleteItem_ClickEvent = function (object) {
        try {
            var index = $scope.workingcaptialmasterList.indexOf(object);
            if (($scope.workingcaptialmasterList[index].customerSegment !== null && $scope.workingcaptialmasterList[index].subItem !== null && $scope.workingcaptialmasterList[index].isTotal !== null)) {
                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data?").then(function (answer) {
                    if (answer) {
                        $scope.workingcaptialmasterList[index].active = false;
                        //$scope.workingcaptialmasterList.splice(index, 1);
                    }
                    else
                        return false;
                }, function () {
                    return false;
                })
            }
            else {
                dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - ")
            }
        }
                    
        
        catch (ex) {
            alert("Excetption in DeleteItem_ClickEvent" + ex);
        }
    }
    function SaveCPRWorkingCapitalMaster() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SaveCPRWorkingCapitalMaster",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                
                data: JSON.stringify({ cPRWorkingCapitalMasterModelList: $scope.workingcaptialmasterList })
            }).then(function successCallback(response) {
                console.log(response.data);
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    GetAllCPRWorkingCapitalMaster();
                }
                else {
                    common.preprocesshide();
                    alert(response.data.message);
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveCPRWorkingCapitalMaster ' + e);
        }
    }
    ///.................. Events
    $scope.Page_Load = function () {
        GetAllCustomerSegment();
        var urlParameter = GetUrlParameters();
        GetAllCPRWorkingCapitalMaster();
    }

        // (urlParameter != null) {
            //GetCPRWorkingCapitalMasterById();
    //    }
    //    else {

    //    }
    //};
        $scope.SaveWorkingCapitalMaster_ClickEvent = function () {
            try {
                SaveCPRWorkingCapitalMaster();
            } catch (e) {
                alert('SaveWorkingCapitalMaster_ClickEvent ' + e);
            }
        }
    $scope.Page_Load();
}));