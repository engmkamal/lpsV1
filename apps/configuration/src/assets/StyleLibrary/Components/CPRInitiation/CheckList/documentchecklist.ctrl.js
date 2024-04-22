(app.controller("DocumetCheckListCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
   
    $scope.PageTitle = "Document CheckList";
    $scope.documentChecklistComment = null;
    $scope.documentChecklistModel = {
        id: '',
        documentType: null,
        documentName: null,
        issuingAuthority: null,
        issueDate: null,
        validity: null,
        remark: null,
        active: true,
        created:null,
        author: null,
        editor: null,
        modified:null
    };
    $scope.cprinit.listDocumentChecklist = [];
    $scope.documentChecklistModellist = [];
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    $scope.DateValidation = function (issuedate, validitydate) {        
        if (issuedate != null && validitydate != null) {
            var IssueDate = new Date(issuedate);
            var ValidityDate = new Date(validitydate);
            if (IssueDate > ValidityDate) {
                dialogService.ConfirmDialogWithOkay('', "IssueDate Can Not Be Greater Than ValidityDate!");
                $scope.documentChecklistModel.validity = "";
                $scope.documentChecklistModel.issueDate = "";
            }
               

        }
        
    };
    $scope.AddDocumentChecklist_ClickEvent = function () {

        try {
            $scope.listDocumentChecklist.push({
                id: '',
                documentType: null,
                url: "",
                documentName: null,
                issuingAuthority: null,
                issueDate: null,
                validity: null,
                remark: null,
                active: true,
                uploaded: false,
                author:''
            });
        } catch (e) {
            alert("AddDocumentChecklist_ClickEvent " + e);
        }
    };
    $scope.UploadDocumentChecklist_ClickEvent = function () {
        try {
            var count = 0;
            var fileUploader = document.getElementById("ChecklistFileUploader");
            if (fileUploader.files[0] == null)
                dialogService.ConfirmDialogWithOkay('', "PLEASE ENTER A FILE TO BE UPLOAD!");
           
            //angular.forEach($scope.listDocumentChecklist, function (value, index) {
            //    indexAdopt = index + 1;
            //    var fileUploader = document.getElementById("ChecklistFileUploader" + index);
            //    if (fileUploader.files[0] == null)
            //        count++;
            ////});
            //if (indexAdopt == count)
            //    dialogService.ConfirmDialogWithOkay('', "PLEASE ENTER A FILE TO BE UPLOAD!");
            else
                UploadDocumentChecklist();
        } catch (e) {
            alert("UploadDocumentChecklist " + e);
        }
    };

    function UploadDocumentChecklist() {
        try {
            common.preprocessload();
            var docNic = "";
            var facilityType = "";
            var formdata = new FormData();
            var documentType = "";
            var fileUploader = document.getElementById("ChecklistFileUploader");
            formdata.append(documentType, fileUploader.files[0]);
            formdata.append("documentType", documentType);
            formdata.append("cprid", GetUrlParameters());
            formdata.append("cprno", $scope.cprinit.cprno);
            formdata.append("cif", '');
            formdata.append("nic", docNic);
            formdata.append("facilitytype", facilityType);
         
            var request = {
                method: 'POST',
                url: "/CPR/UploadDocumentChecklist",
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.documentModel = response.data.output;
                    $scope.documentChecklistModel.documentName = $scope.documentModel.documentName;
                    $scope.documentChecklistModel.url = $scope.documentModel.url;
                    $scope.documentChecklistModel.author = $scope.documentModel.author;
                    $scope.documentChecklistModellist.push($scope.documentChecklistModel);
                    ResetDocumentChecklist();
                    document.getElementById("ChecklistFileUploader").value = null;
                    dialogService.ConfirmDialogWithOkay('', "File is Uploaded!");

                    //$scope.listDocumentChecklist.push({
                    //    id: '',
                    //    documentType: null,
                    //    url: "",
                    //    documentName: null,
                    //    issuingAuthority: null,
                    //    issueDate: null,
                    //    validity: null,
                    //    remark: null,
                    //    active: true,
                    //    uploaded: false,
                    //    author: null
                    //});
                }
                else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', "Something Went Wrong");
                }
            }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;
         
            });

        } catch (e) {
            common.preprocesshide();
            alert("UploadDocumentChecklist " + e);
        }
    }

    function ResetDocumentChecklist() {
        $scope.documentChecklistModel = {
            id: '',
            documentType: '',
            documentName: '',
            url: '',
            issuingAuthority: '',
            issueDate: '',
            validity: '',
            remark: '',
            active: true,
            author: '',
            created: null,
            author: null,
            editor: null,
            modified: null

        };
    }

    $scope.RemoveItemFromDocumentChecklist = function (list, item) {
        try {
            if (list != null | item != null) {
                if (item.id == null || item.id == "")
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromDocumentChecklist Error: " + e);
        }
    };
    $scope.RemoveItemFromlistDocumentChecklist = function (list, item) {
        try {
            if (list != null | item != null) {
                common.SetActiveFalseForRemovedItem(list, item);
            }

        } catch (e) {
            alert("Exception RemoveItemFromlistDocumentChecklist Error: " + e);
        }
    };

    $scope.SubmitDocumentCheckList_ClickEvent = function () {
        try {           
            SaveDocumentCheckList();           
        } catch (e) {
            alert("SubmitDocumentCheckList_ClickEvent error" + e);
        }
    };

    //Document Checklist Approval
    $scope.SubmitDocumentCheckListByApproval_ClickEvent = function () {
        try {
            SaveDocumentCheckListByApproval();
        } catch (e) {
            alert("SubmitDocumentCheckListByApproval_ClickEvent error" + e);
        }
    };
    function SaveDocumentCheckList() {
        try {
            var cprId = GetUrlParameters();
            var documentChecklistMapper = {
                'listDocumentChecklistModel': $scope.documentChecklistModellist,
                'cPRId': cprId,
                'documentChekclistComment': $scope.documentChecklistComment 
            }
            
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCPRDocumentCheckList",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ documentChecklistMapper : documentChecklistMapper})
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);  
                        common.preprocesshide();
                        GetDocumentCheckListByCPRId(cpr);
                       
                    } else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                        var cprId = GetUrlParameters();
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    });
                }
            }, function errorCallback(response) {
                common.preprocesshide();

            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveCPRLiabilitySanctionHistory: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    };
    function SaveDocumentCheckListByApproval() {
        try {
            common.preprocessload();
            $http({
                url: "/CPR/SaveUpdateDocumentChecklist",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRId: $scope.cprinit.id, listDocumentChecklistModell: $scope.cprinit.listDocumentChecklist })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {

                        //var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        //if (spHostUrl != null) {
                        //    window.location.href = common.adminRedirectUrl += spHostUrl;
                        //}
                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
                else {
                    common.preprocesshide();
                }

            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveDocumentCheckListByApproval ' + e);
        }
    };

    function GetCurrentApprovalUser() {
        try {
            $http({
                url: "/PeoplePicker/GetCurrentUser",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.currentApprovalUser = response.data.output;

                }
            })
            //, function errorCallback(response) {
            //    $scope.error = response;
            //});
        } catch (e) {
            alert("GetCurrentApprovalUser " + e);
        }
    }

    Page_Load();
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId == null) {

                //GetCurrentUser();
                // GetCurrentUserBranch();
            } else {
                GetDocumentCheckListByCPRId(cprId);
               
            }
            $scope.isEditable = common.isEditable; 
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }
    function GetDocumentCheckListByCPRId(cpr) {
        try {
            $http({
                url: "/CPRV2/GetDocumentCheckListByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.documentChecklistMapper = response.data.output;
                    $scope.documentChecklistModellist = $scope.documentChecklistMapper.listDocumentChecklistModel;
                    $scope.documentChecklistComment = $scope.documentChecklistMapper.documentChekclistComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRByCIF: " + e);
            common.LoderHide();
        }
    }
    function GetCustomCheckListByProductId(item) {
        try {
            $scope.customCheclistTemplateList = [];
            var customersegmentid = parseInt($scope.cprinit.business.id);
            var productId = item.idd;
            var cprId = GetUrlParameters();
            $http({
                url: "/CPR/GetConfigurableChecklistbyCustomersegmentAndProductId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { customersegmentid: customersegmentid, productId: productId, cPRId: cprId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.configTemplate = [];
                    $scope.customCheclistTemplateList = response.data.output;
                    CreateChecklist();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCustomCheckListByProductId " + e);
        }
    }
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
}));