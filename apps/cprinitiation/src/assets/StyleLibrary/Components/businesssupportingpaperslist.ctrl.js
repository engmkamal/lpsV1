(app.controller("BusinessSupportingPapersListCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.businessSupportingPapersList = {
        id: 0,
        itemName: '',
        active: true
        
    };

    //
    $scope.listBusinessSupportingPapersList = [];
    /// .................. Functions

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetBusinessSupportingPapersList() {

        try {
            $http({
                url: "/Admin/GetBusinessSupportingPapersList",
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
                    $scope.listBusinessSupportingPapersList = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBusinessSupportingPapersList: " + e);
        }
    };

    $scope.AddBusinessSupportingPapers_ClickEvent = function () {

        try {
            $scope.listBusinessSupportingPapersList = $scope.listBusinessSupportingPapersList || [];
            $scope.listBusinessSupportingPapersList.push($scope.businessSupportingPapersList);
            

            $scope.ReseBusinessSupportingPapers();
        }
        catch (ex) {
            alert("Exception in AddBusinessSupportingPapers_ClickEvent" + ex);
        }

    }
    $scope.ReseBusinessSupportingPapers = function() {
        $scope.businessSupportingPapersList = {
            id: 0,
            itemName: '',
            active: true

        };
        $scope.businessSupportingPapersForm.$setUntouched();
        $scope.businessSupportingPapersForm.$setPristine();
    }
    $scope.EditItem_ClickEvent = function (object) {

        try {
            $scope.listBusinessSupportingPapersList.splice($scope.listBusinessSupportingPapersList.indexOf(object), 1);
            $scope.businessSupportingPapersList = object;
        }
        catch (ex) {
            alert("Excetption in EditItem_ClickEvent" + ex);
        }
    }
    $scope.DeleteItem_ClickEvent = function (object) {
        try {
            var index = $scope.listBusinessSupportingPapersList.indexOf(object);
            dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data?").then(function (answer) {
                if (answer) {
                    $scope.listBusinessSupportingPapersList[index].active = false;
                }
                else
                    return false;
            })
        }catch (ex) {
            alert("Excetption in DeleteItem_ClickEvent" + ex);
        }
    }
    $scope.SaveBusinessSupportingPapersList = function() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveBusinessSupportingPapersList",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: JSON.stringify({ businessSupportingPapersListModels: $scope.listBusinessSupportingPapersList })
            }).then(function successCallback(response) {
                console.log(response.data);
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    GetBusinessSupportingPapersList();
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
        var urlParameter = GetUrlParameters();
        GetBusinessSupportingPapersList();
    }

    $scope.Page_Load();
}));