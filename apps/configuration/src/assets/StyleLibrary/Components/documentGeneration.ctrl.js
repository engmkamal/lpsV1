(app.controller("documentCreationCtrl", ["$scope", "$rootScope", "$http", "$filter", "dialogService", function ($scope, $rootScope, $http, $filter, dialogService) {

    var test = "";
    $scope.DocumentTemplateEditRedirectUrl = "/Admin/DocumentTemplateCreation?templateId=@templateId&SPHostUrl=";
    $scope.documentRedirectUrl = "/Admin/DocumentTemplateList";
    $scope.documentTemplateRedirectUrl = "/Admin/DocumentTemplateCreation";
    $scope.documentGenerationRedirectUrl = "/Admin/DocumentGeneration";
    $scope.testrrr = [];
    $scope.text = null;
    $scope.cPRNoSearchDone = false;
    $scope.cPRNo = null;
    $scope.cPRNoForDocumentTemplate = null;
    $scope.facility = null;
    $scope.documentTemplateCustomColumnModelList = [];
    $scope.cPRDocumentGenerationValueList = [];
    $scope.documentGenerationCustomerColumns = null;
    $scope.cPRDocumentGenerationValueModelList = [];
    $scope.documentTemplateColumnValueViewModelList = [];
    $scope.templateCopy = null;
    $scope.reportGenerated = false;
    $scope.reportPreviewed = false;
    $scope.reportViewData = null;
    $scope.Original = null;
    $scope.generatedReportData = null;
    $scope.preview = true;
    $scope.reportData = null;
    $scope.customCloumnList = [];
    $scope.buttonText = "Save";
    $scope.customColumnRevert = {
        name: null,
        title: null,
        type: "text"
    }
    $scope.cPRDocumentGeneration = {
        id:0,
        cPRId: 0,
        cPRFacilityId:0,
        generatedDate:null,
        body:null,
        active:true,
        author:0,
        created:null,
        editor:0,
        modified:null
    }
    $scope.documentTemplateModel = {
         id:0,
         name:null,
         body: null,
         active:true,
         author : 0 ,
         created :null, 
         editor: 0,
         modified: null
    }
    $scope.documentTemplateCustomColumnModel = {
        id: 0,
         documentTemplateId:0,
         fieldName:null,
         displayName:null,
         active:true,
         author:0,
         created:null,
         modified:null
    }
    $scope.cPRDocumentGenerationViewModel = {
        cPRNo: null,
        cPRId: 0,
        documentTemplateModelList: null,
        listCPRFacilities:null
    }
    $scope.cPRDocumentGenerationValue = {
       id:0,
       cPRDocumentGenerationId:0,
       name:null,
       displayName:null,
       value:null,
       active:true,
       author:0,
       created:null,
       editor:0,
       modified:null
    }
    $scope.documentTemplateColumnValueViewModel = {
        id: 0,
        name: null,
        displayName: null,
        value: null,
        facility: null,
        cPRNo: null,
        documentTemplate: null
    }
    $scope.documentTemplateViewModel = {
        documentTemplateModel: null,
        documentTemplateCustomColumnModelList: []
    }

    //Clicke Events
    $scope.preview = function () {
        try {
            var replace = $scope.test.replace(/"/g, "'");

            $http({
                url: "/Admin/TestDocumentGeneration",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { body: replace }
            }).then(
                function (response) {

                    $scope.previewText = response.data;
                    $scope.text = "<html><body >\
                            <div style= 'position: fixed; left: 0; top: 0; width: 100%; height: 32px; background-color: red; color: white; text-align: center;' > <p>Original</p></div ></html >\
                            <div style='margin:32px 15px;'> " + $scope.previewText + " <div>\
                            <div style= 'position: fixed; left: 0; bottom: 0; width: 100 %; background-color: red; color: white; text-align: center;' > <p>Original</p></div ></html >\
                           </body>\
                        ";
                    var mywindow = window.open('', 'PRINT', 'height=600,width=800');

                    mywindow.document.write($scope.text);

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/
                                            
                    mywindow.print();
                    mywindow.close();
                },
                function (response) {
                    alert("Fail");
                }
            );
        } catch (e) {
            alert("preview " + e);
        }
    };
    $scope.SubmitDocumentTemplate_ClickEvent = function ()
    {
        try {
            SubmitDocumentTemplate();
        }
        catch (ex)
        {
            alert("Exception in SubmitDocumentTemplate_ClickEvent " + ex);
        }
    }
    $scope.Cancel_ClickEvent = function () {
        try {

        }
        catch (ex) {
            alert("Exception in Cancel_ClickEvent " + ex)
        }
    }
    $scope.SearchByCPRNo_ClickEvent = function ()
    {
        try {
            if ($scope.cPRNo !== null || $scope.cPRNo === "" || $scope.cPRNo === " " || $scope.cPRNo === undefined)
                SearchByCPRNo();
            else
                dialogService.ConfirmDialogWithOkay('', "Please enter the CPR number");
        }
        catch (ex)
        {
            alert("Exception in SearchByCPRNo_ClickEvent " + ex);
        }
    }
    $scope.GetCustomerColumns_ChangeEvent = function (template) {
        try {
            GetCustomerColumnsByTemplate(template);
            $scope.reportPreviewed = false;
        }
        catch (ex) {
            alert("Exception in GetCustomerColumns_ChangeEvent " + ex);
        }
    }
    $scope.GenerateReport_ClickEvent = function () {
        try {
            GenerateReport();
        }
        catch (ex) {
            alert("Exception in GenerateReport_ClickEvent " + ex);
        }
    }
    $scope.PreviewReport_ClickEvent = function () {
        try {
            if ($scope.reportData !== null || $scope.reportData !== undefined) {
                PreviewReport();
                if ($scope.reportGenerated === true) {
                    PrintReport();
                }
            }
        }
        catch (ex) {
            alert("Exception in PreviewReport_ClickEvent " + ex);
        }
    }
    $scope.PrintReport_ClickEvent = function () {
        try {
            PrintReport();
        }
        catch (ex) {
            alert("Exception in PrintReport_ClickEvent " + ex);
        }
    }
    $scope.GetTemplateById_ClickEvent = function (encryptCPRId) {
        try {
            var templateId = encryptCPRId;
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                $scope.DocumentTemplateEditRedirectUrl += spHostUrl;
            }
            window.location.href = $scope.DocumentTemplateEditRedirectUrl.replace("@templateId", templateId);
        }
        catch (ex) {
            alert("Exception in GetTemplateById_ClickEvent " + ex);
        }
    }
    $scope.GoToNewTemplate_ClickEvent = function ()
    {
        try {
            window.location.href = $scope.documentTemplateRedirectUrl;
        }
        catch (ex)
        {
            alert("Exception in GoToNewTemplate_ClickEvent " + ex);
        }
    }
    $scope.GoToDocumentGeneration_ClickEvent = function () {
        try {
            window.location.href = $scope.documentGenerationRedirectUrl;
        }
        catch (ex) {
            alert("Exception in GoToDocumentGeneration_ClickEvent " + ex);
        }
    }

    //Functions
    function SearchByCPRNo()
    {
        try {
            $http({
                url: "/Admin/SearchByCPRNo",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRNo: $scope.cPRNo })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRNoForDocumentTemplate = $scope.cPRNo;
                    $scope.cPRDocumentGenerationViewModel = response.data.output;
                    $scope.cPRNoSearchDone = true;
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                    $scope.cPRNoSearchDone = false;
                }   
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('SearchByCPRNo ' + e);
        }
    }
    function GetCustomerColumnsByTemplate(template)
    {
        try {
            $scope.templateCopy = template;
            $http({
                url: "/Admin/GetCustomColumnsByTemplateId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ templateId: template.id })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.documentGenerationCustomerColumns = response.data.output;
                    //$scope.reportGenerated = false;
                }
                else {
                    //dialogService.ConfirmDialogWithOkay('', response.data.message);
                    $scope.documentGenerationCustomerColumns = null;
                    //$scope.reportGenerated = false;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('SearchByCPRNo ' + e);
        }
    }
    function BindValues()
    {
        try {
            var count = 0;
            if ($scope.documentGenerationCustomerColumns !== null && $scope.documentGenerationCustomerColumns !== undefined) {
                count = $scope.documentGenerationCustomerColumns.length;
            }
            if (count > 0 && $scope.documentGenerationCustomerColumns !== null && $scope.documentGenerationCustomerColumns !== undefined) {
                var sendValues = [];
                for (var i = 0; i < count; i++) {

                    $scope.documentTemplateColumnValueViewModel = {
                        id: $scope.documentGenerationCustomerColumns[i].id,
                        name: $scope.documentGenerationCustomerColumns[i].fieldName,
                        displayName: $scope.documentGenerationCustomerColumns[i].displayName,
                        value: $scope.cPRDocumentGenerationValue.value[i],
                        facility: $scope.facility,
                        cPRNo: $scope.cPRNoForDocumentTemplate,
                        documentTemplate: $scope.templateCopy
                    }
                    $scope.documentTemplateColumnValueViewModelList.push($scope.documentTemplateColumnValueViewModel);
                    $scope.documentTemplateColumnValueViewModel = null;
                }
                return true;
            }
            else
            {
                $scope.documentTemplateColumnValueViewModel = {
                    id: 0,
                    name: null,
                    displayName: null,
                    value: null,
                    facility: $scope.facility,
                    cPRNo: $scope.cPRNoForDocumentTemplate,
                    documentTemplate: $scope.templateCopy
                }

                $scope.documentTemplateColumnValueViewModelList.push($scope.documentTemplateColumnValueViewModel);
                $scope.documentTemplateColumnValueViewModel = null;

                return true;
            }
        }
        catch(ex)
        {
            alert("Exception in BindValues " + ex);
            return false;
        }
    }
    function PreviewReport() {
        try {
            if (BindValues())
            {
                $http({
                    url: "/Admin/PreviewDocumentTemplateReport",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ documentTemplateColumnValueViewModelList: $scope.documentTemplateColumnValueViewModelList })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.generatedReportData = response.data.output;
                        $scope.reportData = $scope.generatedReportData.body;
                        $scope.Original = $scope.generatedReportData.original;
                        $scope.reportPreviewed = true;
                        $scope.reportGenerated = true;
                        ResetGenerateReportInput();
                    }
                    else {
                        //dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            }
        } catch (e) {
            common.preprocesshide();
            alert('PreviewReport ' + e);
        }
    }
    function GenerateReport() {
        try {
            if (BindValues())
            {
                $http({
                    url: "/Admin/GenerateDocumentTemplateReport",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ documentTemplateColumnValueViewModelList: $scope.documentTemplateColumnValueViewModelList })
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.generatedReportData = response.data.output;
                        $scope.reportData = $scope.generatedReportData.body;
                        $scope.Original = $scope.generatedReportData.original;
                        $scope.reportGenerated = true;
                         $scope.reportPreviewed = true;
                        ResetGenerateReportInput();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                    else {
                         //dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            }
        } catch (e) {
            common.preprocesshide();
            alert('GenerateReport ' + e);
        }
    }
    function SubmitDocumentTemplate() {
        try {
            debugger;
            var replace = $scope.test.replace(/"/g, "'");
            $scope.previewText = replace;

            $scope.documentTemplateModel.body = $scope.previewText;
            CustomCloumnsConverter();
            $scope.documentTemplateViewModel.documentTemplateModel = $scope.documentTemplateModel;
            $scope.documentTemplateViewModel.documentTemplateCustomColumnModelList = $scope.documentTemplateCustomColumnModelList;
            if ($scope.documentTemplateViewModel.documentTemplateCustomColumnModelList === null)
            {
                $scope.documentTemplateViewModel.documentTemplateCustomColumnModelList = [];
            }
            $http({
                url: "/Admin/SubmitDocumentTemplate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ documentTemplateViewModel: $scope.documentTemplateViewModel })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.documentTemplateCustomColumnModelList = [];
                    var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                    if (spHostUrl != null) {
                        //window.location.href = common.documentRedirectUrl += spHostUrl;
                        window.location.href = $scope.documentRedirectUrl;
                    }
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitDocumentTemplate ' + e);
        }
    };
    function CustomCloumnsConverter() {
        try {
            var countLength = $scope.customCloumns.length;
            for (var i = 0; countLength > i; i++) {
                $scope.documentTemplateCustomColumnModel.fieldName = $scope.customCloumns[i].name;
                $scope.documentTemplateCustomColumnModel.displayName = $scope.customCloumns[i].title;

                $scope.documentTemplateCustomColumnModelList.push($scope.documentTemplateCustomColumnModel);
                ResetDocumentTemplateCustomColumnModel();
            }
        }
        catch (ex) {
            alert("Exception in CustomCloumnsConverter " + ex);
        }
    }
    function CustomCloumnsRevertConverter() {
        try {
            var countLength = $scope.documentTemplateViewModel.documentTemplateCustomColumnModelList.length;
            for (var i = 0; countLength > i; i++) {
                $scope.customColumnRevert.name = $scope.documentTemplateViewModel.documentTemplateCustomColumnModelList[i].fieldName;
                $scope.customColumnRevert.title = $scope.documentTemplateViewModel.documentTemplateCustomColumnModelList[i].displayName;

                $scope.customCloumnList.push($scope.customColumnRevert);
                ResetcustomColumnRevert();
            }
        }
        catch (ex) {
            alert("Exception in CustomCloumnsConverter " + ex);
        }
    }
    function ResetDocumentTemplateCustomColumnModel() {
        try {
            $scope.documentTemplateCustomColumnModel = {
                id: 0,
                documentTemplateId: 0,
                fieldName: null,
                displayName: null,
                active: true,
                author: 0,
                created: null,
                modified: null
            }
        }
        catch (ex) {
            alert("Exception in ResetDocumentTemplateCustomColumnModel " + ex);
        }
    }
    function ResetcustomColumnRevert() {
        try {
            $scope.customColumnRevert = {
                name: null,
                title: null,
                type: "text"
            }
        }
        catch (ex) {
            alert("Exception in ResetcustomColumnRevert " + ex);
        }
    }
    function PrintReport()
    {
        try {
            if ($scope.reportGenerated === true) {
                var printPreview = "<html><body >\
                            <div style= 'position: fixed; left: 0; top: 0; width: 100%; height: 32px; background-color: red; color: white; text-align: center;' > <p> "+ $scope.Original + " </p></div ></html >\
                            <div style='margin:32px 15px;'> " + $scope.reportData + " <div>\
                            <div style= 'position: fixed; left: 0; bottom: 0; width: 100 %; background-color: red; color: white; text-align: center;' > <p> "+ $scope.Original + " </p></div ></html >\
                           </body>\
                        ";
                var mywindow = window.open('', 'PRINT', 'height=600,width=800');
                mywindow.document.write(printPreview);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                $scope.reportGenerated = false;
            }
        }
        catch (ex)
        {
            alert("Exception in PrintReport " + ex);
        }
    }
    function ResetGenerateReportInput()
    {
        try {
            $scope.documentTemplateColumnValueViewModelList = [];
            $scope.documentTemplateColumnValueViewModel = null;
        }
        catch (ex)
        {
            alert("Exception in ResetGenerateReportInput " + ex);
        }
    }
    function GetAllDocumentTemplates()
    {
        try {
            $http({
                url: "/Admin/GetDocumentTemplatesList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.documentList = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        }
        catch (ex)
        {
            alert("Exception in GetAllDocumentTemplates " + ex);
        }
    }
    function GetTemplateById(encryptCPRId) {
        try {
            $http({
                url: "/Admin/GetDocumentTemplatesById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ encryptCPRId: encryptCPRId})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.documentTemplateViewModel = response.data.output;
                    $scope.test = $scope.documentTemplateViewModel.documentTemplateModel.body;
                    $scope.documentTemplateModel = $scope.documentTemplateViewModel.documentTemplateModel;
                    $rootScope.customCloumns = $scope.customCloumnList;
                    CustomCloumnsRevertConverter();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        }
        catch (ex) {
            alert("Exception in GetTemplateById " + ex);
        }
    }
    function GetUrlParameters() {
        var documentTemplateId = (common.GetParameterByName("templateId", null));
        return documentTemplateId;
    };
    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetTemplateById(urlParameter);
            $scope.buttonText = "Update";
        }
        else {
            GetAllDocumentTemplates();
            $scope.buttonText = "Save";
        }
    };
    $scope.Page_Load();
}]));
