(app.controller("FrmSecCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.formSection = {
        id: null,
        sectionName: null,
        sectionCode: null,
        caption: null,
        formTabId: null,
        primarySectionId: null,
        displayType: null,
        isrequired: true,
        displayOrder: null,
        classStyle: null,
        active: true,
        isdeleted: false,
    };

    //$scope.daUserName = {
    //    userId: null,
    //    userName: null

    //}
    //$scope.formSections = [];
    $scope.formSectionsList = [];
    $scope.formTabs = [];
    $scope.PrimarySectionId = [];
    $scope.updateFormSectionId = null;
    $scope.PrimaryTabId = [];
    $scope.formTabList = [];
    //$scope.userRoleWiseModuleList = [];



    $scope.Page_Load = function () {
        GetAllFormSection();
        GetAllFormTab();
        GetAllTabList();
      
        $scope.displayList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
        $scope.formSection.displayOrder = $scope.displayList[0];
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
                console.log('res', response);
                if (response.data != null) {
                    $scope.formTabs = response.data;
                    $scope.PrimaryTabId = [];
                    $scope.formTabs.forEach(function (tab) {
                        console.log('tab', tab);
                        $scope.PrimaryTabId.push({
                            text: tab.tabName,
                            value: tab.id,
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

    function GetAllTabList() {

        try {
            $http({
                url: "/Admin/GetAllFormTabList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data != null)
                    $scope.formTabList = response.data;
                console.log('formtablis', $scope.formTabList)
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllTabList: " + e);
        }
    };

    function GetAllFormSection() {

        try {
            $http({
                url: "/Admin/GetAllFormSections",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
              
                if (response.data != null) {
                    $scope.formSectionsList = angular.copy(response.data);
                    console.log('sections ', $scope.formSectionsList);
                    $scope.PrimarySectionId = [];
                    $scope.formSectionsList.forEach(function (tab) {
                        console.log('tab', tab);
                        $scope.PrimarySectionId.push({
                            text: tab.sectionName,
                            value: tab.id
                        });
                    })
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllFormSec: " + e);
        }
    };

    $scope.GetAllFormSection = function GetAllFormSectionById(formSection) {
        $scope.formSection.id = formSection.id;
        $scope.formSection.sectionName = formSection.sectionName;
        $scope.formSection.sectionCode = formSection.sectionCode;
        $scope.formSection.caption = formSection.caption;
        $scope.formSection.formTabId = formSection.formTabId;
        $scope.formSection.primarySectionId = formSection.primarySectionId;
        $scope.formSection.displayType = formSection.displayType;
        $scope.formSection.isrequired = formSection.isrequired;
        $scope.formSection.displayOrder = formSection.displayOrder;
        $scope.formSection.classStyle = formSection.classStyle;
        $scope.formSection.active = formSection.active; 
        $scope.updateFormSectionId = formSection.id;
    };

    function SubmitFormSection() {
        try {
            //console.log('formtab', $scope.formTab);
            common.preprocessload();
            // $scope.formTab.id = $scope.daUserName.userId;
            if ($scope.updateFormSectionId != null) {
                $scope.formSection.id = $scope.updateFormSectionId;
            }
            $http({
                url: "/Admin/CreateOrUpdateFormSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    formSectionViewModel: $scope.formSection
                })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        GetAllFormSection();
                        //GetAllUserRoles();
                        ResetFormSection();
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
            alert('SubmitFormSec ' + e);
        }
    }

    function ResetFormSection() {
        $scope.formSection = {
            id: null,
            sectionName: null,
            sectionCode: null,
            caption: null,
            formTabId: null,
            primarySectionId: null,
            displayType: null,
            isrequired: true,
            displayOrder: $scope.formSection.displayOrder = $scope.displayList[0],
            classStyle: null,
            active: true,
            isdeleted: false,
        };

        //$scope.daUserName = {
        //    userId: null,
        //    userName: null

        //}
        $scope.updateFormSectionId = null;
    }

    $scope.DeleteFormSec = function DeleteFormSec(id) {
        try {
            common.preprocessload();

            $http({
                url: "/Admin/DeleteForamSection",
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
                        GetAllFormSection();
                        //GetAllUserRoles();
                        ResetFormSection();
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
            alert('alert ' + e);
        }
    }

    $scope.SubmitFormSection_ClickEvent = function () {
        try {
            SubmitFormSection();
        } catch (e) {
            alert('SubmitFormSec_ClickEvent ' + e);
        }
    }

    $scope.ResetFormSection_ClickEvent = function () {
        try {
            ResetFormSection();
        }
        catch (e) {
            alert('ResetFormSection_ClickEvent' + e);
        }
    }

    $scope.Page_Load();

}));