
(app.controller("UdfmasterCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    ///.................. Variables
    $scope.udfMaster = {
        id: null,   
        section: null,
        title: null,
        allowMultiple: false,
        active:null, 
        editor: null, 
        modified: null, 
        author: null, 
        created: null ,
        listUDFColumn: [],


    };

    $scope.udfColumn = {
        label: null,
        dataType: null
    };

    $scope.udfColumnDetl = [];
    $scope.PrimarySectionId = [];
    $scope.formSectionsList = [];
  
    debugger;
    $scope.udfMasterlist = [];
    console.log('list', $scope.udfMasterlist);

    $scope.GetAlludfMaster = function GetAlludfMasterByid(udfMaster) {
        $scope.udfMaster.id = udfMaster.id;
        $scope.udfMaster.section = udfMaster.section;
        $scope.udfMaster.title = udfMaster.title;
        $scope.udfMaster.allowMultiple = udfMaster.allowMultiple;
        $scope.udfColumnDetl= udfMaster.listUDFColumn; 
       
    };


    $scope.Page_Load = function () {
        GetAlludfMaster();
        GetAllFormSection();
        $scope.displayList = ['Text', 'Number', 'Date', 'List', 'Lookup', 'Radiobutton', 'Checkbox'];
       
     
    };

    function Resetudfcolumn() {
        try {
            $scope.udfColumn = {
                label: null,
                dataType: null,
            }
           
        }
        catch (ex) {
            alert("Exception in ResetCheckListItem " + ex)
        }
    }

    $scope.AddUdfItem_ClickEvent = function () {
        console.log("hello");
        if ($scope.udfColumn.label != null && $scope.udfColumn.dataType != null)
        {
            $scope.udfColumnDetl.push($scope.udfColumn);
        }
        Resetudfcolumn();
    }

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
                    debugger;
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

    function GetAlludfMaster() {

        try {
          
              $http({
                url: "/Admin/GetAlludfMaster",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                console.log('res', response);
                if (response.data != null) {
                    debugger;
                    $scope.udfMasterlist = angular.copy(response.data);
                    //$scope.listUDFColumn = angular.copy(response.data);
                    console.log('data', $scope.udfMasterlist);


                    //$scope.PrimaryTabId = [];
                    //$scope.formTabs.forEach(function (tab) {
                    //    console.log('tab', tab);
                    //    $scope.PrimaryTabId.push({
                    //        text: tab.tabName,
                    //        value: tab.id
                    //    });
                    //})
                }

            },
                function errorCallback(response) {
                    $scope.error = response;

                });

        }
        catch (e) {
            alert("Exception GetAllFormTab: " + e);
        }
    };

    function SubmitUdfmaster() {
        try { 
            common.preprocessload();           
            $scope.udfMaster.listUDFColumn = $scope.udfColumnDetl;
            $http({
                url: "/Admin/CreateOrUpdateUdfMaster",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    udfModel: $scope.udfMaster
                })

            }).then(function successCallback(response) {
                debugger;
                if (response.data.success) {
                    //alert("Success");
                  
                    debugger;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        //GetAlludfMaster();     
                        Resetudfmaster();
                        $scope.udfColumnDetl = 0;
                        common.preprocesshide();
                        window.location.reload();
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
            alert('SubmitUdfmaster ' + e);
        }
    }


    $scope.EditItem_ClickEvent = function (list, item)
      {
          try {
              var index = $scope.udfColumnDetl.indexOf(item);
              var obj = $scope.udfColumnDetl[index];
              $scope.udfColumn = obj;
              console.log('data', $scope.udfColumnDetl);
              $scope.udfColumnDetl.splice(index, 1);
        }
        catch (ex)
        {
            alert("Exception in EditItem_ClickEvent " + ex);
        }
    }

    $scope.RemoveItem_ClickEvent = function (list, item) {
        try {
            dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete this item? ").then(function (answer) {
                if (answer) {
                    var index = $scope.udfColumnDetl.indexOf(item);
                    $scope.udfColumnDetl.splice(index, 1);
                }
                else
                    return false;
            }, function () {
                return false;
            })
        }
        catch (ex) {
            alert("Exception in RemoveItem_ClickEvent " + ex);
        }
    }

    function Resetudfmaster() {
        $scope.udfMaster = {
            id: null,
            section: null,
            title: null,
            allowMultiple: null,
            active: null,
            editor: null,
            modified: null,
            author: null,
            created: null,

        };
    }

    function ResetudfColumn() {
        $scope.udfColumn = {
            id: null,
            udfmasterId: null,
            label: null,
            data_type: null,
            expression: null,
            options: null,
            required: null,
            active: null,
            editor: null,
            modified: null,
            created: null

        }
    }

    $scope.DeleteudfMaster = function DeleteudfMaster(id) {
        try {
            common.preprocessload();
            $http({
                url:"/Admin/DeleteUdfMasterByid",
                method:"POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { id: id }

            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._deletemessage).then(function successCallback(response) {
                        GetAlludfMaster();
                        Resetudfmaster();
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

    $scope.SubmitUdfmaster_ClickEvent = function () {
        try {
            console.log("Clicked");
            SubmitUdfmaster();

            
        } catch (e) {
            alert('SubmitUdfmaster_ClickEvent ' + e);
        }
    }

    //$scope.Resetudfmaster_ClickEvent = function () {
    //    try {
    //        Resetudfmaster();
    //    }
    //    catch (e) {
    //        alert('Resetudfmaster_ClickEvent' + e);
    //    }
    //}

    $scope.Resetudfcolumn_ClickEvent = function () {
        ResetudfColumn();
        window.location.reload();
      /*  Resetudfmaster();*/
    }

    $scope.Page_Load();

}));