(app.controller("configurableChecklistCtrl", function ($rootScope
    , $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.test = "Configurable Checklist";
    $scope.customHTMLTags = null;
    $scope.configCheckListItemList = [];
    $scope.displayItemList = [];
    $scope.unqiueIDCk = null;
    $scope.unqiueIDRaadio = null;
    $scope.unqiueIDBtn = null;
    $scope.ngModel = null;

    $scope.configChecklistItem = {
        tag: null,
        name: null,
        type: null,
        value: null,
        trackId: 0
    }

    $scope.countCkeckbox = 0;
    $scope.countBtn = 0;
    $scope.countRadio = 0;
    $scope.moduleList = [];
    $scope.productList = [];
    $scope.customerSegment = null;
    $scope.product = null;
    $scope.configTemplateId = 0;
    $scope.customersagementId = 0;
    $scope.Page_Load = function () {
        GetModuleList();
        GetCustomerSegmantAndProductList();
        GetDetailsConfigurableChecklist();
      //  GetAllConfigurableChecklistInputType();

    }


    $scope.configurableChecklistTemplate = {
        configurableChecklistInputType: [],
        moduleId:0,
        product: null,
        customersegment: null,
        name: null,
        comment: false,
        active: true
    }

    $scope.configurableChecklistInputType = {
        active: true,
        description: null,
        configCheckListItemList: []
    }

    function ResetCheckListItem()
    {
        try {
            $scope.configChecklistItem = {
                id: 0,
                tag: null,
                name: null,
                type: null,
                value: null,
                ngModel: null,
                trackId: 0,
                active: true
            }
            $scope.customHTMLTags = null;
        }
        catch (ex)
        {
            alert("Exception in ResetCheckListItem " + ex)
        }
    }

    function ResetConfigurableChecklistTemplate() {
        try {
            $scope.configurableChecklistTemplate = {
                configurableChecklistInputType: [],
                product: null,
                customersegment: null,
                name: null,
                comment: false,
                active: true
            }
        $scope.customerSegment = null;
        $scope.product = null;
        $scope.form.configurablechecklist.$setPristine();
        $scope.form.configurablechecklist.$setUntouched();
        }
        catch (ex)
        {
            alerT("Exception in ResetconfigurableChecklistTemplate " + ex);
        }
    }
    function ResetConfigurableChecklistInputType()
    {
        try {
            $scope.configurableChecklistInputType = {
                description: null,
                configCheckListItemList: []
            }
            $scope.configCheckListItemList = [];
        }
        catch (ex)
        {
            alert("Exception in ResetConfigurableChecklistInputType " + ex);
        }
    }

    $scope.AddChecklistItem_ClickEvent = function ()
    {
        try {
            //if ($scope.customHTMLTags != null) {
            if (($scope.configChecklistItem.tag !== null || $scope.configChecklistItem.name !== null) && $scope.customHTMLTags != null) {
                    $scope.configChecklistItem.tag = $scope.htmlTag
                    $scope.configChecklistItem.trackId = $scope.innerId;
                    $scope.configChecklistItem.type = $scope.inputType;
                    $scope.configChecklistItem.ngModel = $scope.ngModel;
                    $scope.configCheckListItemList.push($scope.configChecklistItem);

                    $scope.htmlTag = null;
                    $scope.innerId = 0;
                    $scope.inputType = null;
                    $scope.unqiueIDCk = null;
                    $scope.unqiueIDRaadio = null;
                    $scope.unqiueIDBtn = null;
                    $scope.ngModel = null;
                    ResetCheckListItem();
                }
            //} else {
                //dialogService.ConfirmDialogWithOkay("", "Please add a control type!")
           //}
           
        }
        catch(ex)
        {
            alert("Exception in AddChecklistItem_ClickEvent " + ex);
        }
    }

    $scope.AddToMainGrid_ClickEvent = function ()
    {
        try {
          
            if ($scope.configurableChecklistInputType.description !== null) {
                if ($scope.configCheckListItemList === null || $scope.configCheckListItemList === undefined) {
                    $scope.configCheckListItemList = [];
                }
                document.getElementById("space-for-buttons").innerHTML = "";
                $scope.configurableChecklistInputType.configCheckListItemList = $scope.configCheckListItemList;
                $scope.configurableChecklistTemplate.configurableChecklistInputType.push($scope.configurableChecklistInputType);
               
                ResetConfigurableChecklistInputType();
            }
            else
            {
                dialogService.ConfirmDialogWithOkay("", "Please add the Item Description!")
            }
        }
        catch (ex)
        {
            alert("Excetption in AddToMainGrid_ClickEvent " + ex);
        }
    }

    $scope.SaveConfigurableChecklisttemplate_ClickEvent = function ()
    {   
        try {
            SaveConfigurableChecklist();
        }
        catch (ex)
        {
            alert("Exception in SaveConfigurableChecklisttemplate_ClickEvent " + ex);
        }
    }

    $scope.EditItem_ClickEvent = function (list, item)
    {
        try {
            var index = $scope.configCheckListItemList.indexOf(item);
            var obj = $scope.configCheckListItemList[index];
            $scope.configChecklistItem = obj;
            $scope.customHTMLTags = obj.type;
            $scope.configCheckListItemList.splice(index, 1);
            $scope.InputType_ClickEvent();
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
                    var index = $scope.configCheckListItemList.indexOf(item);
                    $scope.configCheckListItemList.splice(index, 1);
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

    $scope.ResetChecklistItem_ClickEvent = function ()
    {
        try {
            ResetCheckListItem();
        }
        catch (ex)
        {
            alert("Exception in ResetChecklistItem_ClickEvent " + ex);
        }
    }

    $scope.EditType_ClickEvent = function (list, item)
    {
        try {
            if ($scope.configCheckListItemList.length == 0) {
                var index = $scope.configurableChecklistTemplate.configurableChecklistInputType.indexOf(item);
                var obj = $scope.configurableChecklistTemplate.configurableChecklistInputType[index];
                $scope.configCheckListItemList = obj.configCheckListItemList;
                $scope.configurableChecklistInputType.description = obj.description;
                $scope.configurableChecklistTemplate.configurableChecklistInputType.splice(index, 1);
            }
            else {
                dialogService.ConfirmDialogWithOkay("", "Please add the items to main grid before editing main grid types!")
            }
        }
        catch (ex) {
            alert("Exception in EditType_ClickEvent " + ex);
        }
    }

    $scope.RemoveType_ClickEvent = function (list, item) {
        try {
            dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete this Type? ").then(function (answer) {
                if (answer) {
                    var index = $scope.configurableChecklistTemplate.configurableChecklistInputType.indexOf(item);
                    $scope.configurableChecklistTemplate.configurableChecklistInputType.splice(index, 1);
                }
                else
                    return false;
            }, function () {
                return false;
            })
        }
        catch (ex) {
            alert("Exception in RemoveType_ClickEvent " + ex);
        }
    }

    function SaveConfigurableChecklist() {
        try {
            $scope.configurableChecklistTemplate.product = $scope.product;
            $scope.configurableChecklistTemplate.customersegment = $scope.customerSegment.businessModel;
            common.preprocessload();
            $http({
                url: "/Admin/SaveConfigurableChecklist",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ configurableChecklistTemplateModel: $scope.configurableChecklistTemplate })
            }).then(function successCallback(response) {
                common.preprocesshide();
                if (response.data.success) {
                    $scope.configTemplateId = response.data.output;
                    SaveConfigurableChecklistWithId();
                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveConfigurableChecklist " + e);
        }
    };

    function SaveConfigurableChecklistWithId() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/SaveConfigurableChecklistWithId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ templateId: $scope.configTemplateId })
            }).then(function successCallback(response) {
                common.preprocesshide();
                if (response.data.success) {
                    dialogService.ConfirmDialogWithOkay("", "Saved Successfully!")
                    GetAllConfigurableChecklistInputType($scope.product, $scope.customerSegment,$scope.configurableChecklistTemplate.moduleId);
                    ResetConfigurableChecklistTemplate();

                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveConfigurableChecklistWithId " + e);
        }
    };
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
                    $scope.moduleList  = response.data.output;
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
    function GetCustomerSegmantAndProductList() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetCustomerSegmantAndProductList",
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
                    $scope.configurableChecklistMapProductWithCustomerSegmentList = response.data.output;
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

    $scope.GetCheckListByProduct = function (product, customerSegment) {
        if ($scope.configurableChecklistTemplate.moduleId != 0 && $scope.customerSegment != null) {
            GetAllConfigurableChecklistInputType(product, customerSegment, $scope.configurableChecklistTemplate.moduleId);
        } else {
            dialogService.ConfirmDialogWithOkay('', "Please select module and customer sagement");
        }
    }

    function GetAllConfigurableChecklistInputType(product, customerSegment,moduleId) {
        try {
            $http({
                url: "/Admin/GetConfigurableChecklist",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    console.log(response.data);
                $scope.filterByProductName = product.name;
                $scope.customersagementId = customerSegment.businessModel.idLong;
                $scope.byModuleId = moduleId;
                $scope.configChecklistdata = [];

                $scope.configChecklistdata = response.data.output;
              /*  $scope.configChecklistdata = ($filter('filter')(response.data.output, { ProductName: product.description }, true)).list;*/
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (ex) {
            alert("Exception GetAllConfigurableChecklistInputType: " + e);
        }
    }

    $scope.Editdescription_ClickEvent = function (list, item) {
        try {
            if ($scope.configChecklistdata.length == 0) {
                var index = $scope.configChecklistdata.indexOf(item);
                var obj = $scope.configChecklistdata[index];
                $scope.configChecklistdata = obj.configChecklistdata;
                $scope.configChecklistdata.description = obj.description;
                $scope.configChecklistdata.splice(index, 1);
            }
            else {
                dialogService.ConfirmDialogWithOkay("", "Please add the items to main grid before editing main grid types!")
            }
        }
        catch (ex) {
            alert("Exception in Editdescription_ClickEvent " + ex);
        }
    }

    $scope.Removedescription_ClickEvent = function (id) {
        try {
            dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete this Type? ").then(function (answer) {
                if (answer) {
                    DeleteDetailsConfigurableChecklist(id);
                }
                else
                    return false;
            }, function () {
                return false;
            })
        }
        catch (ex) {
            alert("Exception in Removedescription_ClickEvent " + ex);
        }
    }
      
    function GetDetailsConfigurableChecklist() {
        try {
            $http({
                url: "/Admin/GetConfigurableChecklist",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    console.log(response.data.message);

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (ex) {
            alert("Exception GetDetailsConfigurableChecklist: " + e);
        }
    }

    function DeleteDetailsConfigurableChecklist(Id) {
        try {
            $http({
                url: "/Admin/DeleteConfigurableChecklist",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { Id:Id }
            }).then(function successCallback(response) {
                if (response.data.success)
                    console.log(response.data.message);

                GetAllConfigurableChecklistInputType($scope.product, $scope.customerSegment, $scope.configurableChecklistTemplate.moduleId);

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (ex) {
            alert("Exception GetDetailsConfigurableChecklist: " + e);
        }
    }


    $scope.SelectProduct_ClieckEvent = function (item)
    {
        try {
            $scope.productList = [];
            $scope.productList = $scope.customerSegment.productModelList;
        }
        catch (ex)
        {
            alert("Exception in SelectProduct_ClieckEvent " + ex);
        }
    }

    $scope.InputType_ClickEvent = function ()
    {
        try {
            if ($scope.customHTMLTags === "CheckBox") {
                $scope.unqiueIDCk = "checkbox" + $scope.countCkeckbox;
                $scope.innerId = $scope.countCkeckbox;
                $scope.ngModel = "@" + $scope.unqiueIDCk + "=";
                angular.element(document.getElementById('space-for-buttons')).append("<input id='{{elementId}}' type='checkbox' name='checkbox' value='CheckBox'>");
                $scope.htmlTag = "<div><input id='{{elementId}}' ng-model='{{model}}'  type='checkbox' name='checkbox' value='CheckBox'></div>";
                $scope.countCkeckbox++;
                $scope.inputType = "CheckBox";
            }
            else if ($scope.customHTMLTags === "RadioButton") {
                $scope.unqiueIDRaadio = "RadioButton" + $scope.countRadio;
                $scope.innerId = $scope.countRadio;
                $scope.ngModel = "@" + $scope.unqiueIDRaadio + "=";
                angular.element(document.getElementById('space-for-buttons')).append("<input id='{{elementId}}' type='radio' name='radio' value='CheckBox'>");
                $scope.htmlTag = "<div><input id='{{elementId}}' ng-model='{{model}}' type='radio' name='radio' value='CheckBox'></div>";
                $scope.countRadio++;
                $scope.inputType = "RadioButton";
            }
        }
        catch (ex)
        {
            alert("Exception in InputType_ClickEvent " + ex);
        }
    }

    $scope.Page_Load();

}));

app.directive("addbuttonsbutton", function () {
    return {
        restrict: "E",
        //template: "<select addbuttons ng-model='customHTMLTags'>"+
        //"<option value='CheckBox'>CheckBox</option>"+
        //"</select>"
        template: "<select addbuttons ng-model='customHTMLTags'>" +
               "<option value='CheckBox'>CheckBox</option>" +
               "<option value='RadioButton'>Radio Button</option>" +
            "</select>"
        //template: " <md-select addbuttons ng-model='customHTMLTags'"+
        //"<md-option value='CheckBox'>CheckBox </md-option>"+
        //"<md-option value='RadioButton'>Radio Button </md-option>" +
        //" </md-select>"
    }
})
//template: "<select addbuttons ng-model='customHTMLTags'>" +
//    "<option value='CheckBox'>CheckBox</option>" +
//    "<option value='RadioButton'>Radio Button</option>" +
//    "</select>"
app.directive("addbuttons", function ($compile) {
    return function ($scope, element, attrs) {
        element.bind("change", function (e) {
            $scope.$apply(function () {
                if ($scope.customHTMLTags === "CheckBox") {
                    $scope.unqiueIDCk = "checkbox" + $scope.countCkeckbox;
                    $scope.innerId = $scope.countCkeckbox;
                    $scope.ngModel = "@" + $scope.unqiueIDCk + "=";
                    angular.element(document.getElementById('space-for-buttons')).append($compile("<input id='{{elementId}}' type='checkbox' name='checkbox' value='CheckBox'>")($scope));
                    $scope.htmlTag = "<div><input id='{{elementId}}' ng-model='{{model}}'  type='checkbox' name='checkbox' value='CheckBox'></div>";
                    $scope.countCkeckbox++;
                    $scope.inputType = "CheckBox";
                }
                else if ($scope.customHTMLTags === "RadioButton") {
                    $scope.unqiueIDRaadio = "RadioButton" + $scope.countRadio;
                    $scope.innerId = $scope.countRadio;
                    $scope.ngModel = "@" + $scope.unqiueIDRaadio + "=";
                    angular.element(document.getElementById('space-for-buttons')).append($compile("<input id='{{elementId}}' type='radio' name='radio' value='CheckBox'>")($scope));
                    $scope.htmlTag = "<div><input id='{{elementId}}' ng-model='{{model}}' type='radio' name='radio' value='CheckBox'></div>";
                    $scope.countRadio++;
                    $scope.inputType = "RadioButton";
                }
                //else if ($scope.customHTMLTags === "Button") {
                //    $scope.unqiueIDBtn = "Button" + $scope.countBtn;
                //    $scope.innerId = $scope.countBtn;
                //    $scope.ngModel = "@" + $scope.unqiueIDBtn + "=";
                //    angular.element(document.getElementById('space-for-buttons')).append($compile("<button id='" + $scope.unqiueIDBtn + "'></button>")($scope));
                //    $scope.htmlTag = "<div><button id='" + $scope.unqiueIDBtn + "'>Button</button></div>";
                //    $scope.countBtn++;
                //    $scope.inputType = "Button";
                //}
                $scope.customHTMLTags = null;
            });
        });
    };
})

app.directive("alert", function () {
    return function (scope, element, attrs) {
        element.bind("click", function () {
            console.log(attrs);
            alert("This is alert #" + attrs.alert);
        });
    };
})

