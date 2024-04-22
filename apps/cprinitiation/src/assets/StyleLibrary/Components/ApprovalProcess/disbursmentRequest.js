(app.controller("disbursmentCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $mdDialog, $timeout) {

    /// .................. Variables
    $scope.cprId = 0;
    $scope.viewMode = true;
    $scope.isDiseable = true;
    $scope.approvalMode = false;
    $scope.validForAmendmentRequest = false;
    $scope.latestId = 0;
    $scope.sanctionRequesCode = "";
    $scope.currentdate = new Date();
    $scope.proposalDate = "";
    $scope.legarFormList = [];
    var moduleId = 3;
    // Configurable Checklist
    $scope.PageTitle = "Data CheckList";
    $scope.changeTab = "applicant";
    $scope.formatIndex = 1;
    $scope.customCheclistTemplateList = [];
    $scope.configTemplateAnswers = [];
    $scope.configTemplate = [];
    $scope.templateQuestion = [];
    $scope.questionElement = [];
    $scope.answerselement = null;
    $scope.documentChecklistModellist = [];
    $scope.newConfigTemplate = [];
    $scope.customHTMLTags = null;
    $scope.configCheckListItemList = [];
    $scope.displayItemList = [];
    $scope.unqiueIDCk = null;
    $scope.unqiueIDRaadio = null;
    $scope.unqiueIDBtn = null;
    $scope.ngModel = null;
    $scope.customCheclistTemplateList = [];
    $scope.configTemplateId = 0;

    $scope.configChecklistItem = {
        tag: null,
        name: null,
        type: null,
        value: null,
        trackId: 0
    }
    $scope.configurableChecklistInputTypeList = [];
    $scope.configurableChecklistInputTypeList = {
        configurableChecklistInputType: [],
    };
    $scope.configurableChecklistTemplate = {
        id: 0,
        configurableChecklistInputType: [],
        moduleId: 0,
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
    $scope.configCheckListItemList =
        [
            {
                name: "a",
                ngModel: "@RadioButton0=",
                tag: "<div><input id='{{elementId}}' ng-model='{{model}}' type='radio' name='radio' value='CheckBox'></div>",
                trackId: 0,
                type: "RadioButton",
                value: null
            },
            {
                active: true,
                id: 0,
                name: "b",
                ngModel: "@RadioButton1=",
                tag: "<div><input id='{{elementId}}' ng-model='{{model}}' type='radio' name='radio' value='CheckBox'></div>",
                trackId: 1,
                type: "RadioButton",
                value: null
            },
            {
                active: true,
                id: 0,
                name: "c",
                ngModel: "@RadioButton2=",
                tag: "<div><input id='{{elementId}}' ng-model='{{model}}' type='radio' name='radio' value='CheckBox'></div>",
                trackId: 2,
                type: "RadioButton",
                value: null
            }
        ];
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
        author: 0
    };

    $scope.disbursmentRequestMapper = {
        disbursementCPRDetail: {
            id: 0,
            requestCode: '',
            requestDate: new Date(),
            requesterId: 0,
            requesterName: '',
            requesterEmail: '',
            requesterAccount: '',
            requesterDesignation: '',
            requesterBranchId: '',
            requesterEmployeeId: '',
            requesterRole: '',
            requestStatus: '',
            cPRNo: '',
            cPRId: '',
            clientType: '',
            proposal: '',
            borrowerName: '',
            borrowerTypeId: '',
            primaryCIF: '',
            cPRSanctionNo: '',
            cPRSanctionRequestCode: '',
            lDRatio: '',
            loanGrowth: '',
            nPL: '',
            profitOrLoss: '',
            limit: '',
            outstanding: '',
            overdue: '',
            cLStatus: '',
            forceSaleValueOfCollateral: '',
            cIBStatus: '',
            iCRRSStatus: '',
            alliedConcernStatus: '',
            branchUnconditionalRecommendation: '',
            moduleWorkflowId: 0,
            active: true,
            created: '',
            author: 0,
            modified: '',
            editor: 0,
            previousInitiator: 0
        }
    };

    $scope.actiontaken = null;
    $scope.listactions = [];
    $scope.listRole = [];
    $scope.listAllRole = [];
    $scope.isReferOrClarifyUser = false;
    $scope.listTemplates = [];
    $scope.listConditions = [];
    $scope.listDisplayConditions = [];
    $scope.listDaLevels = [];
    $scope.editTemplate = null;
    $scope.templateid = null;
    $scope.levelModel = {
        no: 0,
        id: null,
        tmplatename: null,
        damasterid: null,
        roleid: null,
        daactivityid: null,
        level: null,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null,
        levelid: 0
    };
    $scope.dAMasterTemplate = null;
    $scope.listDaLevels = [];
    $scope.editTemplate = null;
    $scope.templateid = null;
    $scope.wFlowModel = {
        dAApprovalModel: null,
        approvedList: null,
        roleApMappingStruct: null,
        isWFEnabled: null,
        isWFVisible: null,
        isByPass: null,
        approvalActivity: null,
        listDAApprovalQueueModel: null,
        pendingApprovalList: null,
        masterAprovalId: null,
        roleLevel: 0,
        isMarkattingOfficer: false,
        isReferOrClarifyUser: false,
        referClerifyUserList: null,
        listCPRComponentModel: null,
        listSpecialCommentDisplay: null,
    };
    $scope.dAApprovalModel = {
        id: 0,
        approvalqueueid: 0,
        userid: 0,
        completeduserid: 0,
        assigndate: null,
        completeddate: null,
        designation: null,
        rolename: null,
        status: null,
        actiontaken: null,
        comment: null,
        bypass: false,
        active: false,
        editor: null,
        modified: null,
        author: null,
        created: null,
        documentRecordViewModels: null
    };
    $scope.levelModel = {
        no: 0,
        id: null,
        tmplatename: null,
        damasterid: null,
        roleid: null,
        daactivityid: null,
        level: null,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null,
        levelid: 0
    };
    $scope.dAMasterTemplate = null;
    $scope.daApproval = {
        requestId: 0,
        cprId: 0,
        daTemplateId: 0,
    };
    $scope.listDAApprovalQueueModel = [];
    $scope.pendingApprovalList = [];
    $scope.listDisplayQueue = [];
    $scope.approvalMasterId = 0;
    $scope.listDisplayQueueStructNew = [];
    $scope.listDisplayQueueStructOld = [];
    $scope.listDAQueueMapping = [];
    $scope.listDAApprovalQueue = [];
    $scope.isSelection = false;
    $scope.unSelectedItems = [];
    $scope.listSelectedRole = [];
    $scope.listReferClerifyUser = [];
    $scope.cPRComponentsCommentList = [];
    $scope.cPRSpecialConditionCommentList = [];
    $scope.roleUser = null;
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    $scope.DateValidation = function (issueDate, validityDate) {
        var issuedate = new Date(issueDate);
        var validitydate = new Date(validityDate);
        if (issuedate > validitydate)
            dialogService.ConfirmDialogWithOkay('', "IssueDate Can Not Be Greater Than ValidityDate!");
    };

    $scope.Page_Load = function () {
        try {
            GetCurrentUser();
            GetDocumentTypes();
            GetTemplates();
            var urlParameter = GetUrlParameters();

            if (urlParameter != null) {
                GetDisbursmentRequestById();
            }
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function GetUrlParameters() {
        var disbursmentRequestId = (common.GetParameterByName("id", null));
        return disbursmentRequestId;
    };

    $scope.clickNo = function () {
        window.location.reload();
    }

    $scope.comaSeparate = function (num) {
        var amt = num.toString();
        amt = amt.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return amt;
    }

    //File Upload

    function GetDocumentTypes() {
        try {
            $http({
                url: "/CPR/GetDocumentTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listDocumentType = response.data.output;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetDocumentTypes: " + e);
        }
    }

    $scope.UploadFile_ClickEvent = function () {
        try {
            var fileUploader = document.getElementById("FileUploader");
            if (fileUploader.files[0] == null)
                dialogService.ConfirmDialogWithOkay('', "PLEASE ENTER A FILE TO BE UPLOAD!");

            else if ($scope.disbursmentRequestMapper.disbursementCPRDetail.cPRId == '')
                dialogService.ConfirmDialogWithOkay('', "Please Search By any SanctionRequestCode first");
            else
                UploadFile();

        } catch (e) {
            alert("UploadDocumentChecklist " + e);
        }
    };

    function UploadFile() {
        try {
            common.preprocessload();
            var docNic = "";
            var facilityType = "";
            var documentType = "";
            var formdata = new FormData();
            var fileUploader = document.getElementById("FileUploader");
            formdata.append(documentType, fileUploader.files[0]);
            formdata.append("documentType", documentType);
            formdata.append("cprid", $scope.disbursmentRequestMapper.disbursementCPRDetail.cPRId);
            formdata.append("cprno", $scope.disbursmentRequestMapper.disbursementCPRDetail.cPRNo);
            formdata.append("cif", '');
            formdata.append("nic", docNic);
            formdata.append("facilitytype", facilityType);

            var request = {
                method: 'POST',
                url: "/CprDisbursment/UploadDocument",
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function successCallback(response) {
                if (response.data.success) {

                    $scope.documentModel = response.data.output;
                    $scope.documentChecklistModel.documentName = $scope.documentModel.documentName;
                    $scope.documentChecklistModel.url = $scope.documentModel.url;
                    $scope.documentChecklistModel.author = $scope.documentModel.author;

                    $scope.documentChecklistModellist.push($scope.documentChecklistModel);
                    ResetDocumentChecklist();
                    document.getElementById("FileUploader").value = null;
                    dialogService.ConfirmDialogWithOkay('', "File is Uploaded!");
                    console.log(response.data.output);

                }
                common.preprocesshide();
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("UploadDocumentChecklist " + e);
        }
    }

    $scope.RemoveItemFromlist = function (doc) {
        doc.active = false;

        var index = $scope.documentChecklistModellist.indexOf(doc);
        $scope.documentChecklistModellist.splice(index, 1);
        $scope.documentChecklistModellist.push(doc);
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
            author: ''
        };
    }

    function GetCustomCheckListByCPRId(cprId) {
        try {
            common.preprocessload();
            $scope.customCheclistTemplateList = [];
            $http({
                url: "/CprDisbursment/GetDisbursementConfigurableChecklistbyCprID",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: { customersegmentid: customersegmentid, productId: productId, cPRId: cprId }
                data: { cPRId: $scope.cprId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.configTemplate = [];
                    $scope.customCheclistTemplateList = response.data.output;
                    CreateChecklist();
                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception GetCustomCheckListByProductId " + e);
        }
    }

    // Configurable Checklist
    $scope.GetValueConfigurableChecklist_ClickEvent = function (mainTemplateObj, inputObj, itemObj, variable) {
        try {
            if (itemObj.type == "RadioButton") {
                if (inputObj.configCheckListItemList.length != 0) {
                    var length = inputObj.configCheckListItemList.length;
                    var index = inputObj.configCheckListItemList.indexOf(itemObj);
                    for (var i = 0; i < inputObj.configCheckListItemList.length; i++) {
                        var arrLength = inputObj.configCheckListItemList.length;
                        if (i != index) {
                            inputObj.configCheckListItemList[i].answer = false;
                            inputObj.configCheckListItemList[i].ngModel = false;
                        }
                        else {
                            inputObj.configCheckListItemList[i].answer = true;
                            inputObj.configCheckListItemList[i].ngModel = true;
                        }
                        if (arrLength == 1) {
                            var obj = inputObj.configCheckListItemList[i];
                            if (obj.answer == true && obj.ngModel == true) {
                                inputObj.configCheckListItemList[i].answer = false;
                                inputObj.configCheckListItemList[i].ngModel = false;
                            }
                            else {
                                inputObj.configCheckListItemList[i].answer = true;
                                inputObj.configCheckListItemList[i].ngModel = true;
                            }
                        }
                    }
                }
            }
            //$scope.configTemplate
            $scope.templateNew = null;
            $scope.answerNewTemplat = null;
            $scope.answersNew = null;
            var templateIndex = $scope.customCheclistTemplateList.indexOf(mainTemplateObj);
            var tempId = $scope.customCheclistTemplateList[templateIndex].id;
            var inputtypeIndex = $scope.customCheclistTemplateList[templateIndex].configurableChecklistInputType.indexOf(inputObj);
            var inputTypeId = $scope.customCheclistTemplateList[templateIndex].configurableChecklistInputType[inputtypeIndex].id;
            var itemIndex = $scope.customCheclistTemplateList[templateIndex].configurableChecklistInputType[inputtypeIndex].configCheckListItemList.indexOf(itemObj);
            var itemId = $scope.customCheclistTemplateList[templateIndex].configurableChecklistInputType[inputtypeIndex].configCheckListItemList[itemIndex].id;
            var item = $scope.customCheclistTemplateList[templateIndex].configurableChecklistInputType[inputtypeIndex].configCheckListItemList[itemIndex];

            var templateDetails = $filter('filter')($scope.configTemplate, { id: tempId })[0];
            var inputtypeDetails = $filter('filter')(templateDetails.content, { id: inputTypeId })[0];
            var itemtypeDetails = $filter('filter')(inputtypeDetails.answers, { id: itemId })[0];

            var indexNewMain = $scope.configTemplate.indexOf(templateDetails);
            $scope.templateNew = $scope.configTemplate[indexNewMain];
            var indexNewAnswer = $scope.templateNew.content.indexOf(inputtypeDetails);

            $scope.answerNewTemplate = $scope.templateNew.content[indexNewAnswer];
            var indexNewAnswer = $scope.answerNewTemplate.answers.indexOf(itemtypeDetails);
            $scope.answersNew = $scope.answerNewTemplate.answers[indexNewAnswer];

            for (var k = 0; k < $scope.answerNewTemplate.answers.length; k++) {
                $scope.answerNewTemplate.answers[k].result = false;
            }

            $scope.answerNewTemplate.answers[indexNewAnswer].result = variable;
            $scope.configTemplate[indexNewMain].content[indexNewAnswer].answers[indexNewAnswer].result = variable;
            $scope.configTemplate[indexNewMain].comments = mainTemplateObj.comments
            // console.log($scope.configTemplate);
        }
        catch (ex) {
            //alert("Exception in GetValueConfigurableChecklist_ClickEvent " + ex);
        }
    }

    $scope.SetCommentsConfigurableChecklist_ClickEvent = function (list, item, comments) {
        try {
            var templateIndex = $scope.customCheclistTemplateList.indexOf(item);
            var tempId = $scope.customCheclistTemplateList[templateIndex].id;

            var templateDetails = $filter('filter')($scope.configTemplate, { id: tempId })[0];
            var indexNewMain = $scope.configTemplate.indexOf(templateDetails);
            $scope.configTemplate[indexNewMain].comments = comments

            var index = list.indexOf(item);
            list[index].comments = comments;
        }
        catch (ex) {
            alert("Exception in SetCommentsConfigurableChecklist_ClickEvent " + ex);
        }
    };

    $scope.AddConfigurableCheckList = function () {
        if ($scope.disbursmentRequestMapper.disbursementCPRDetail.cPRSanctionNo != "") {
            if ($scope.configurableChecklistInputType.description !== null) {
                try {
                    $scope.configurableChecklistTemplate.configurableChecklistInputType = [];
                    $scope.configurableChecklistInputType.configCheckListItemList = $scope.configCheckListItemList;
                    $scope.configurableChecklistTemplate.configurableChecklistInputType.push($scope.configurableChecklistInputType);
                    common.preprocessload();
                    $http({
                        url: "/CprDisbursment/AddNewConfigurableChecklist",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({ configurableChecklistTemplateModel: $scope.configurableChecklistTemplate, cprId: $scope.cprId })
                    }).then(function successCallback(response) {
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
            }
            else {
                dialogService.ConfirmDialogWithOkay("", "Please add the Item Description!")
            }
        } else
            dialogService.ConfirmDialogWithOkay('', "Please Search By any SanctionRequestCode first");

    }

    function SaveConfigurableChecklistWithId() {
        try {
            //  common.preprocessload();
            $http({
                url: "/Admin/SaveConfigurableChecklistWithId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ templateId: $scope.configTemplateId })
            }).then(function successCallback(response) {

                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay("", "New CheckList Added");
                    GetCustomCheckListByCPRId($scope.cprId);
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

    function CreateChecklist() {
        //   console.log($scope.customCheclistTemplateList);
        try {
            if ($scope.customCheclistTemplateList != null && $scope.customCheclistTemplateList.length != 0) {
                //debugger;
                for (var k = 0; k < $scope.customCheclistTemplateList.length; k++) {
                    var template = $scope.customCheclistTemplateList[k];
                    var templateObject = {
                        title: template.name,
                        comments: template.comments,
                        cPRId: GetUrlParameters(),
                        id: template.id,
                        content: []
                    };

                    var templateContent = "<div class='testing'><h3>" + template.name + "</h3>";

                    for (var i = 0; i < template.configurableChecklistInputType.length; i++) {
                        var question = template.configurableChecklistInputType[i];

                        $scope.answerArr = [];

                        for (var j = 0; j < $scope.customCheclistTemplateList[k].configurableChecklistInputType[i].configCheckListItemList.length; j++) {

                            templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";

                            var ans = {
                                id: question.configCheckListItemList[j].id,
                                result: true,
                            }

                            $scope.answerArr.push(ans);
                            ans = {
                                id: 0,
                                result: false,
                            }
                            //var jsonval = JSON.parse(question.configCheckListItemList[j].tag);
                            //templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";
                        }
                        var questionObject = {
                            id: question.id,
                            title: question.description,
                            answers: $scope.answerArr
                        };
                        templateObject.content.push(questionObject);
                        templateContent = templateContent + "<h4>" + question.description + "</h4>";
                    }

                    $scope.configTemplate.push(templateObject);
                    templateContent = templateContent + "</div>";
                    $('#renderList').append(templateContent);

                }

                for (var g = 0; g < $scope.customCheclistTemplateList.length; g++) {
                    template = $scope.configTemplate[g];

                    for (var h = 0; h < $scope.customCheclistTemplateList[g].configurableChecklistInputType.length; h++) {

                        var content = $scope.configTemplate[g].content[h];

                        for (var n = 0; n < $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList.length; n++) {

                            var data = $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n];

                            var answer = data.answer;
                            var ngmodel = data.ngModel;
                            data.value = {
                                ngmodel: answer
                            };
                            $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value = [];
                            $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value[ngmodel] = answer;

                            var answer2 = $scope.configTemplate[g].content[h].answers[n];

                            $scope.configTemplate[g].content[h].answers[n].result = answer;
                        }
                    }
                }

                for (var f = 0; f < $scope.configTemplate.length; f++) {
                    if ($scope.configTemplate[f].content.length != 0) {
                        $scope.newConfigTemplate.push($scope.configTemplate[f]);
                    }
                }
                $scope.configTemplate = [];
                $scope.configTemplate = $scope.newConfigTemplate;
            }
            //console.log("configTemplate "+$scope.configTemplate);
            //console.log("customCheclistTemplateList " +$scope.customCheclistTemplateList);
        }
        catch (ex) {
            alert("Exception in CreateChecklist " + ex);
        }
    };

    // Disbursment Request

    function GetDisbursmentRequestById() {
        var id = GetUrlParameters();
        try {
            common.preprocessload();
            $http({
                url: "/CprDisbursment/GetDisbursmentRequestById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ id: id })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.disbursmentRequestMapper = response.data.output;
                    if ($scope.disbursmentRequestMapper.currentUserId == $scope.disbursmentRequestMapper.disbursementCPRDetail.author) {
                       // $scope.approvalMode = false;
                        $scope.validForAmendmentRequest = true;
                    }
                    //else
                    //    $scope.approvalMode = true;
                    $scope.documentChecklistModellist = $scope.disbursmentRequestMapper.listDocumentChecklistModel;
                    $scope.cprId = $scope.disbursmentRequestMapper.disbursementCPRDetail.cPRId;
                    GetCustomCheckListByCPRId($scope.cprId);
                    $scope.latestId = $scope.disbursmentRequestMapper.disbursementCPRDetail.id;
                    if ($scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus == 'In Progress' ||
                        $scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus == 'Reject' ||
                        $scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus == 'Approved') {
                        $scope.approvalMode = true;
                        $scope.validForAmendmentRequest = true;
                        $scope.viewMode = false;
                        $scope.isSelection = false;
                        GetApprovals();
                    }
                    if ($scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus == 'Amendment Request') {

                        $scope.viewMode = true;

                        $scope.validForAmendmentRequest = true;
                        $scope.isSelection = false;
                        GetApprovals();
                    }
                    if ($scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus == 'Approved') {
                        $scope.approvalMode = true;
                    }
                    common.pageloadhide();
                }

            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });
        }
        catch (e) {
            alert("Exception GetBranchById: " + e);
        }

    }

    $scope.GetSanctionDetailsByRequestCode = function () {

        try {
            common.preprocessload();
            $http({
                url: "/CPRDisbursment/GetSanctionRequestByRequestCode",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ requestCode: $scope.sanctionRequesCode })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output != null) {
                        if (!response.data.output) {
                            dialogService.ConfirmDialogWithOkay('', "This Sanction Request Code already exist, Please Check");
                            $scope.cprno = "";
                        } else {
                            $scope.requestDetails = response.data.output;
                            $scope.cprId = $scope.requestDetails.disbursementCPRDetail.cPRId;
                            //$scope.requestDetails.disbursementCPRDetail.requestDate = $scope.currentdate;                       
                            $scope.disbursmentRequestMapper.disbursementCPRDetail = $scope.requestDetails.disbursementCPRDetail;
                            $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterName = $scope.currentApprovalUser.displayName;
                            $scope.disbursmentRequestMapper.disbursementCPRDetail.requestDate = $scope.currentdate;
                            $scope.disbursmentRequestMapper.disbursementCPRDetail.cPRSanctionNo = $scope.requestDetails.disbursementCPRDetail.cPRSanctionNo;
                            GetCustomCheckListByCPRId($scope.cprId, moduleId);
                        }
                    }

                    else {
                        dialogService.ConfirmDialogWithOkay('', "This is not Valid Request Code, Please Check");
                        $scope.cprno = "";

                    }


                } else {
                    dialogService.ConfirmDialogWithOkay('', "Data not found. Please check.");
                    $scope.cprno = "";
                }
                common.preprocesshide();
            }, function errorCallback(response) {
                $scope.error = response;
            });


        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };

    function parseJsonDate(jsonDateString) {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }

    function SaveDisbursmentRequest() {
        try {
            common.preprocessload();

            $scope.disbursmentRequestMapper.disbursementCPRDetail.lDRatio = $scope.disbursmentRequestMapper.disbursementCPRDetail.lDRatio.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.loanGrowth = $scope.disbursmentRequestMapper.disbursementCPRDetail.loanGrowth.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.profitOrLoss = $scope.disbursmentRequestMapper.disbursementCPRDetail.profitOrLoss.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.limit = $scope.disbursmentRequestMapper.disbursementCPRDetail.limit.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.overdue = $scope.disbursmentRequestMapper.disbursementCPRDetail.overdue.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.outstanding = $scope.disbursmentRequestMapper.disbursementCPRDetail.outstanding.replace(/,/g, '');
            $scope.disbursmentRequestMapper.disbursementCPRDetail.forceSaleValueOfCollateral = $scope.disbursmentRequestMapper.disbursementCPRDetail.forceSaleValueOfCollateral.replace(/,/g, '');

            $scope.disbursmentRequestMapper.configAnswerTemplateModelList = $scope.configTemplate;
            $scope.disbursmentRequestMapper.listDocumentChecklistModel = $scope.documentChecklistModellist;
            $http({
                url: "/CPRDisbursment/CreateOrUpdateDisbursmentRequest",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ disbursementDetailMapper: $scope.disbursmentRequestMapper })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    /*                    $scope.disbursmentRequestMapper.disbursementCPRDetail = response.data.output;*/
                    var id = response.data.output;
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                    location.href = '/CPRDisbursment/CreateDisbursmentRequest?id=' + id + '&SPHostUrl=https://techoneglobalorg.sharepoint.com/sites/CapexDev';
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitUserRole ' + e);
        }
    }

    $scope.SubmitDisbursmentRequest_ClickEvent = function () {
        try {
            if ($scope.disbursmentRequestMapper.disbursementCPRDetail.cPRSanctionNo != "")
                SaveDisbursmentRequest();
            else
                dialogService.ConfirmDialogWithOkay('', "Please input Sanction Request Code and other required fieled");
        } catch (e) {
            alert('SubmitDisbursmentRequest_ClickEvent ' + e);
        }
    }

    function GetCurrentUser() {
        try {
            common.preprocessload();
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

                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterId = $scope.currentApprovalUser.userId;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterName = $scope.currentApprovalUser.displayName;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterEmail = $scope.currentApprovalUser.email;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterAccount = $scope.currentApprovalUser.accountName;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterDesignation = $scope.currentApprovalUser.designation;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterEmployeeId = $scope.currentApprovalUser.userId;
                    $scope.disbursmentRequestMapper.disbursementCPRDetail.requesterRole = '';

                }
                common.preprocesshide();
            })
                , function errorCallback(response) {
                    $scope.error = response;
                }
        } catch (e) {
            alert("GetCurrentApprovalUser " + e);
        }
    }

    // Approval Process

    function GetTemplates() {
        try {
            $http({
                url: "/CPRDisbursment/GetAllTemplate",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            }).then(function successCallback(response) {
                if (response.data.success)
                    if (response.data.output != null) {
                        $scope.listTemplates = response.data.output;
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "There is no Sanction Approval Workflow Template found");
                    }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAssociateField: " + e);
        }
    };

    $scope.SearchTemplate = function (item) {
        try {
            $http({
                url: "/CPRDisbursment/SearchConditions",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: JSON.stringify({ editTemplate: $scope.editTemplate })
                data: JSON.stringify({ editTemplate: item })
            }).then(function successCallback(response) {
                if (response.data.success)
                    if (response.data.output != null) {
                        $scope.listConditions = response.data.output.listDAConditionModel;
                        $scope.listDaLevels = response.data.output.listDALevelModel;
                        $scope.templateid = response.data.output.templateid;
                        /*                    $scope.dalevelModel.tmplatename = $scope.editTemplate.name;*/

                    } else {
                        dialogService.ConfirmDialogWithOkay('', "There is no Condition regarding this template please check");
                    }

            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDALevel ' + e);
        }

    };

    function GetApprovals() {
        try {
            var Id = $scope.disbursmentRequestMapper.disbursementCPRDetail.id;
            $http({
                url: "/CPRDisbursment/DAWorkFlow",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ requestId: Id })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.wFlowModel = response.data.output;

                    if ($scope.wFlowModel.dAApprovalModel != null) {

                        $scope.listactions = $scope.wFlowModel.approvalActivity;
                        $scope.dAApprovalModel = $scope.wFlowModel.dAApprovalModel;

                        $scope.listAllRole = $scope.wFlowModel.roleApMappingStruct;
                        $scope.isByPass = $scope.wFlowModel.isByPass;
                    }

                    $scope.isWFVisible = $scope.wFlowModel.isWFVisible;
                    $scope.isWFEnabled = $scope.wFlowModel.isWFEnabled;
                    $scope.approvedList = $scope.wFlowModel.approvedList;
                    $scope.listDAApprovalQueueModel = $scope.wFlowModel.listDAApprovalQueueModel;

                    approverlist = $scope.listDAApprovalQueueModel;
                    angular.forEach(approverlist, function (val) {
                        if (val.status == 'In Progress') {
                            $scope.copyRole = val.rolename;
                        }
                    });

                    $scope.pendingApprovalList = $scope.wFlowModel.pendingApprovalList;

                    $scope.roleLevel = $scope.wFlowModel.roleLevel;

                    $scope.isMarkattingOfficer = $scope.wFlowModel.isMarkattingOfficer;
                    $scope.isReferOrClarifyUser = $scope.wFlowModel.isReferOrClarifyUser;

                    if ($scope.wFlowModel.referClerifyUserList != null)
                        $scope.listReferClerifyUser = $scope.wFlowModel.referClerifyUserList;

                    $scope.listCPRComponentModel = $scope.wFlowModel.listCPRComponentModel;

                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };

    $scope.ngchangeAction_Filter = function (item) {
        $scope.dAApprovalModel.actiontaken = item.name;
        $scope.listRole.length = 0;

        angular.forEach($scope.listAllRole, function (value) {
            if (item.id == 2) {
                if (value.hierarchylevel < $scope.roleLevel)
                    this.push(value);
            } else if (item.id == 3) {
                if (value.hierarchylevel >= $scope.roleLevel)
                    this.push(value);
            }

        }, $scope.listRole);
    }

    $scope.clickSubmitMapping = function () {

        try {
            if (approvalValidation()) {
                common.preprocessload();
                $http({
                    url: "/CPRDisbursment/SubmitMappingUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        requestId: $scope.latestId,
                        approvalMasterId: $scope.approvalMasterId,
                        listDAApprovalQueue: $scope.listDAApprovalQueue,
                        listDAQueueMapping: $scope.listDAQueueMapping
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.temp = response.data.output;
                        $scope.disbursmentRequestMapper.disbursementCPRDetail.requestStatus = $scope.temp.RequestStatus;
                        /* dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);*/
                        dialogService.ConfirmDialogWithOkay('', "Disbursment Request Save and Apprval process is start");
                        $scope.approvalMode = true;
                        $scope.viewMode = false;
                        $scope.isSelection = false;
                        GetApprovals();
                        // window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            }
        } catch (e) {
            alert('clickSubmitMapping ' + e);
        }
    };

    function approvalValidation() {
        try {
            var status = true;
            if ($scope.listDAApprovalQueue.length < 2) {
                alert('Please Select atleast 2 reviewers.');
                return false;
            }

            var count = 0;
            angular.forEach($scope.listDAApprovalQueue, function (item) {
                count++;
                var obj = $filter("filter")($scope.listDAQueueMapping, { roleid: item.roleid, level: item.level }, true);
                angular.forEach(obj, function (value) {
                    var index = $scope.listDAQueueMapping.indexOf(value);
                    $scope.listDAQueueMapping[index].level = count;
                }, $scope.listDAQueueMapping);


                var index1 = $scope.listDAApprovalQueue.indexOf(item);
                $scope.listDAApprovalQueue[index1].level = count;
                $scope.listDAApprovalQueue[index1].activityid = 5;
                if (count == $scope.listDAApprovalQueue.length) {
                    //last approver
                    item.activityid = 4;
                }
            });

            angular.forEach($scope.listDAApprovalQueue, function (item) {
                if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length == 0) {
                    alert('Please Select atleast 1 user for ' + item.rolename + ' group.');
                    status = false;
                    return false;
                } else if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length < item.minapprovalcount) {
                    alert('Please Select atleast ' + item.minapprovalcount + ' users for ' + item.rolename + ' group.');
                    status = false;
                    return false;
                }

                //Min Approval Check Here...
            });

            return status;
        } catch (e) {
            alert('approvalValidation ' + e);
        }
    }

    function valid() {
        var isValid = true;
        if ($scope.actiontaken == null) {
            dialogService.ConfirmDialogWithOkay('', global._actionNotSelected);
            $scope.isSaveDisabled = false;
            isValid = false;
            return isValid;
        }
        if ($scope.actiontaken.id == 3 || $scope.actiontaken.id == 2) {
            if ($scope.listReferClerifyUser.length == 0) {
                dialogService.ConfirmDialogWithOkay('', "Please add one user");
                $scope.isSaveDisabled = false;
                isValid = false;
                return isValid;
            }

        }
        if ($scope.dAApprovalModel.comment == "" && $scope.actiontaken.id == 1) {
            dialogService.ConfirmDialogWithOkay('', global._commentNeeded);
            $scope.isSaveDisabled = false;
            isValid = false;
            return isValid;
        }

        return isValid;
    }

    $scope.clickSave = function () {
        $scope.isSaveDisabled = true;
        richText = $('.commentRecord').html();
        if (valid() == true) {
            $scope.dAApprovalModel.rolename = $scope.copyRole;
            $scope.dAApprovalModel.designation = $scope.currentApprovalUser.designation;

            try {
                common.preprocessload();
                $http({
                    url: "/CPRDisbursment/SubmitWF",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        requestId: $scope.latestId
                        , dAApprovalModel: $scope.dAApprovalModel
                        , otherDAApprovalRecords: $scope.pendingApprovalList
                        , listDAApprovalQueueModel: $scope.listDAApprovalQueueModel
                        , listRoleApprovalMapping: $scope.listSelectedRole
                        , listReferClerify: $scope.listReferClerifyUser
                        , masterId: $scope.wFlowModel.masterAprovalId
                        , isReferOrClarifyUser: $scope.wFlowModel.isReferOrClarifyUser
                        , listCPRComponentsComment: $scope.cPRComponentsCommentList
                        , listCPRSpecialConditionComment: $scope.cPRSpecialConditionCommentList
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                        window.location.reload();
                        /*window.location.href = cprRedirectUrl.replace("@id", GetUrlParameters());*/
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {
                    $scope.isSaveDisabled = false;
                });
            } catch (e) {
                alert('SubmitDALevel ' + e);
                $scope.isSaveDisabled = false;
            }
        }
    };

    $scope.SaveDAWorkFlow_ClickEvent = function () {
        try {
            SaveDaWorkFlow();
        } catch (e) {
            alert('SaveDAWorkFlow_ClickEvent ' + e);
        }
    }

    function SaveDaWorkFlow() {
        // if ($scope.disbursmentRequestMapper.disbursementCPRDetail.id != 0) {
        if ($scope.templateid != null) {
            try {
                common.preprocessload();
                $scope.daApproval = {
                    requestId: $scope.disbursmentRequestMapper.disbursementCPRDetail.id,
                    cprId: $scope.disbursmentRequestMapper.disbursementCPRDetail.cPRId,
                    // daTemplateId: $scope.dAMasterTemplate.id
                    daTemplateId: $scope.templateid
                };

                $http({
                    url: "/CPRDisbursment/ApprovalWorkFlow",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ daApprovalInfo: $scope.daApproval })

                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();

                        if (response.data.output != null) {
                            $scope.isSelection = true;
                            $scope.approvalMasterId = response.data.output.approvalMasterId;
                            $scope.listDAApprovalQueue = response.data.output.dAApprovalQueue;
                            $scope.listDAQueueMapping = response.data.output.dAQueueMapping;
                            //$scope.listDaLevels.length = 0;
                        } else {
                            dialogService.ConfirmDialogWithOkay('', "Disbursment Approval Workflow Path not found");
                        }
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                });
            } catch (e) {
                common.preprocesshide();
                alert('SubmitUserRole ' + e);
            }
        }
        //else {
        //        dialogService.ConfirmDialogWithOkay('', "This Request does not exist in DisbursmentRequest Save it first");
        //    }
        else {
            dialogService.ConfirmDialogWithOkay('', "Please select a template");
        }
    }
    $scope.unSelectedItems = [];

    $scope.sortableOptions = {
        placeholder: "app",
        connectWith: ".apps-container"
    };


    $scope.addRole = function (get) {
        if ($filter("filter")($scope.listSelectedRole, { approvalmappingid: get.approvalmappingid }).length == 0) {
            $scope.listSelectedRole.push(get);
        }
    };
    $scope.removeRole = function (item) {
        if (confirm("Are you sure you want to DELETE this role?") == true) {
            var obj = $filter("filter")($scope.listSelectedRole, { approvalmappingid: item })[0];
            var index = $scope.listSelectedRole.indexOf(obj);
            $scope.listSelectedRole.splice(index, 1);
        }
    };

    $scope.addUser = function (get) {

        if ($filter("filter")($scope.listReferClerifyUser, { userId: get.userId }).length == 0) {
            $scope.listReferClerifyUser.push(get);
            $scope.roleUser = null;
        }

    };
    $scope.removeUser = function (item) {
        if (confirm("Are you sure you want to DELETE this User?") == true) {
            var obj = $filter("filter")($scope.listReferClerifyUser, { userId: item })[0];
            var index = $scope.listReferClerifyUser.indexOf(obj);
            $scope.listReferClerifyUser.splice(index, 1);


        }
    };

    $scope.changeUser = function (item) {
        if (confirm("Are you sure you want to CHANGE this User?") == true) {
            var obj = $filter("filter")($scope.listReferClerifyUser, { userId: item })[0];
            var index = $scope.listReferClerifyUser.indexOf(obj);
            $scope.listReferClerifyUser.splice(index, 1);


        }
    };

    $scope.ChangeNavigation_ClickEvent = function (index) {
        try {
            $scope.formatIndex = index;
            if (index == 17)
                $scope.changeTab = 'approvals';

            if (index == 1)
                $scope.changeTab = 'applicant';

        } catch (e) {
            alert("ChangeNavigation_ClickEvent " + e);
        }
    }

    $scope.Page_Load();
    $scope.ClickMyDisbursement = function () {

        location.href = '/CPRDisbursment?SPHostUrl=https://techoneglobalorg.sharepoint.com/sites/CapexDev';
    }

    ////--Model Popup-------
    $scope.showPrerenderedDialog = function (ev, item) {
        $mdDialog.show({
            contentElement: item,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    };
    $scope.CloseModel = function () {
        $mdDialog.cancel();
    };
    $scope.PrintLetter = function (item) {
        $scope.printDiv(item);
    };
    $scope.printDiv = function (divId) {
        var contents = document.getElementById(divId).innerHTML;
        var body = document.getElementsByTagName("BODY")[0];
        var frame1 = document.createElement("IFRAME");
        frame1.name = "frame1";
        frame1.setAttribute("style", "position:absolute;top:-1000000px");
        body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
        //var frameDoc = window.open('', '_blank', 'width=800,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');

        frameDoc.document.open();
        frameDoc.document.write('<html><head><title></title>');
        frameDoc.document.write('</head><body>');
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/bootstrap.min.new.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/Site.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/font-awesome.min.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/cus_ng_style.css" />');
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/css/partial_views.css" />');
        //frameDoc.document.write('<link rel="stylesheet" type="text/css" href="../../../Content/angular-material.css" />');


        frameDoc.document.write('<style type="text/css">' +
            'td, th {' +
            'border: 1px solid #000;' +
            'border-collapse: collapse;' +
            'border-color: grey;' +
            'padding: 0.5em;' +
            'border-spacing: 0;' +
            '}' +
            '</style>');

        frameDoc.document.write('<style type="text/css">' +
            '.noborder td, .noborder th {' +
            'border: none;' +
            // 'border-collapse: collapse;' +
            // 'border-color: grey;' +
            // 'padding: 0.5em;' +
            //  'border-spacing: 0;' +
            '}' +
            '</style>');

        frameDoc.document.write('<style type="text/css">' +
            '@media print {' +
            '.pageBreakDiv {' +
            'page-break-inside: avoid !important;' +
            '}' +
            '}' +
            '</style>');
        frameDoc.document.write('<style type="text/css">' +
            '@media print {' +
            'a:link:after,' +
            'a:visited:after {' +
            'content: ""!important;' +
            '}' +
            '}' +
            '@page { margin:15mm 10mm 15mm 10mm!important; }' +
            '.panel-body { padding: 0 }' +
            '</style>');
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        window.setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            body.removeChild(frame1);
        }, 400);
    };
}));