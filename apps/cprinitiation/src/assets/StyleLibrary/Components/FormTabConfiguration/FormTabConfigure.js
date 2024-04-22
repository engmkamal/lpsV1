
(app.controller("FrmTabCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.formTab = {
        id: null,
        tabName: null,
        tabCode: null,
        tabCaption: null,
        moduleId: null,
        viewName: null,
        primaryTabId: null,
        isrequired: true,
        displayorder: null,
        classstyle: null,
        active: true,
        isdeleted: false,


    };

    //$scope.daUserName = {
    //    userId: null,
    //    userName: null

    //}
    $scope.formTabs = [];
    $scope.moduleList = [];
    $scope.PrimaryTabId = [];
    $scope.updateFormTabId = null;
    $scope.userRoleWiseModuleList = [];

   // $scope.formTab.moduleId = null;



    $scope.Page_Load = function () {
        GetAllFormTab();       
        GetAllModule();
        GetAllRMPermission();
        $scope.displayList = ['1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'];
        $scope.formTab.displayorder = $scope.displayList[0];
    };

    //function primaryTabId(data, $scope) {

    //    var tabsArray=[]
    //}

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
 

    function GetAllFormTab() {

        try {
            $http({
                url: "/Admin/GetAllFormTab",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                console.log('res',response);
                if (response.data != null) {
                    $scope.formTabs = response.data;
                    $scope.PrimaryTabId = [];
                    $scope.formTabs.forEach(function (tab) {
                        console.log('tab', tab);
                        $scope.PrimaryTabId.push({
                            text: tab.tabName,
                            value: tab.id
                        });
                    })
                 }
               
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllFormTab: " + e);
        }
    };

    $scope.GetAllFormTab = function GetAllFormTabById(formTab) {
        $scope.formTab.id = formTab.id;
        $scope.formTab.tabName = formTab.tabName;
        $scope.formTab.tabCode = formTab.tabCode;
        $scope.formTab.tabCaption = formTab.tabCaption;
        $scope.formTab.moduleId = formTab.moduleId;
        $scope.formTab.viewName = formTab.viewName;
        $scope.formTab.primaryTabId = formTab.primaryTabId;
        $scope.formTab.isrequired = formTab.isrequired;
        $scope.formTab.displayorder = formTab.displayorder;
        $scope.formTab.classstyle = formTab.classstyle;
        $scope.formTab.active = formTab.active;
        $scope.updateFormTabId = formTab.id;
        //console.log('ff', $scope.formTab,formTab)
    };

    function SubmitFormTab() {
        try {
            //console.log('formtab', $scope.formTab);
            common.preprocessload();
           // $scope.formTab.id = $scope.daUserName.userId;
            if ($scope.updateFormTabId != null) {
                $scope.formTab.id = $scope.updateFormTabId;
            }
            $http({
                url: "/Admin/CreateOrUpdateFormTab",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    formTabViewModel: $scope.formTab
                })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        GetAllFormTab();
                        //GetAllUserRoles();
                        //document.getElementById('createTabForm').reset();
                        ResetFormTab();
                        //window.location.reload();
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
            alert('SubmitFormTab ' + e);
        }
    }

    function ResetFormTab() {
        $scope.formTab = {
        id: null,
        tabName: null,
        tabCode: null,
        tabCaption: null,
        moduleId: null,
        viewName: null,
        primaryTabId: null,
        isrequired: true,
        displayorder: $scope.formTab.displayorder = $scope.displayList[0],
        classstyle: null,
        active: true,
        };

       
 
        $scope.updateFormTabId = null;
    }

    $scope.DeleteFormTab = function DeleteFormTab(id) {
        try {
            common.preprocessload();

            $http({
                url: "/Admin/DeleteFormTab",
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
                        GetAllFormTab();
                        //GetAllUserRoles();
                        ResetFormTab();
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

    $scope.SubmitFormTab_ClickEvent = function () {
        try {
            console.log("Clicked");
            SubmitFormTab();
        } catch (e) {
            alert('SubmitFormTab_ClickEvent ' + e);
        }
    }

    $scope.ResetFormTab_ClickEvent = function () {
        try {
            ResetFormTab();
        }
        catch (e) {
            alert('ResetFormTab_ClickEvent' + e);
        }
    }

    $scope.Page_Load();

}));