(app.controller("DataCollectionCheckListCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.PageTitle = "Data CheckList";
    $scope.customCheclistTemplateList = [];
    $scope.newConfigTemplate = [];
    $scope.cprId = 0;
    $scope.configTemplateAnswers = [];
    $scope.configTemplate = [];
    $scope.templateQuestion = [];
    $scope.questionElement = [];
    $scope.answerselement = null;
    $scope.customHTMLTags = null;
    $scope.configCheckListItemList = [];
    $scope.displayItemList = [];
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

                if ($scope.cprinit.listCPRFacilities !== null && $scope.cprinit.listCPRFacilities.length !== 0) {
                    for (var i = 0; i < $scope.cprinit.listCPRFacilities.length; i++) {
                        GetCustomCheckListByProductId($scope.cprinit.listCPRFacilities[i].product);
                    }
                }
                GetCustomCheckListByCPRId();
            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        $scope.cprId = cPRId;
        return cPRId;
    }

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
  

    function GetCustomCheckListByCPRId() {
        try {
            $scope.customCheclistTemplateList = [];
            common.preprocessload();
            //var customersegmentid = parseInt($scope.cprinit.business.id);
            //var productId = item.idd;
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetConfigurableChecklistbyCprID",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: { customersegmentid: customersegmentid, productId: productId, cPRId: cprId }
                data: { cPRId: cprId }
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

    function GetCustomCheckListByProductId(item) {
        try {
            $scope.customCheclistTemplateList = [];
            var customersegmentid = parseInt($scope.cprinit.business.id);
            var productId = item.idd;
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetConfigurableChecklistbyCustomersegmentAndProductId",
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

    function CreateChecklist() {
        //   console.log($scope.customCheclistTemplateList);
        try {
            $scope.configTemplate = [];
            $scope.newConfigTemplate = [];
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

    $scope.SubmitDataCollectionCheckList_ClickEvent = function () {
        try {
            var cprId = GetUrlParameters();
            //SaveConfigurableChecklistData($scope.customCheclistTemplateList, cprId);

            SaveConfigurableChecklistData($scope.configTemplate, cprId);

        } catch (e) {
            alert("SubmitDocumentCheckList_ClickEvent error" + e);
        }
    };

    function SaveConfigurableChecklistData(configTemplate, cprId) {
        try {
            ////debugger;
            //var cprId = GetUrlParameters();
            //$scope.configTemplate.cPRId = cprId;
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveConfigurableChecklistContent",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                // data: { configAnswerTemplateModelList: $scope.configTemplate }
                data: JSON.stringify({ cprId: cprId, configAnswerTemplateModelList: configTemplate })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //debugger;
                    //$scope.customCheclistTemplateList = response.data.output;
                    //GetCustomCheckListByProductId($scope.cprinit.listCPRFacilities[i].product);
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                    CreateChecklist();
                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveConfigurableChecklistData " + e);
        }
    }

    $scope.AddConfigurableCheckList = function () {
        if ($scope.configurableChecklistInputType.description !== null) {
            try {
                $scope.configurableChecklistTemplate.configurableChecklistInputType = [];
                $scope.configurableChecklistInputType.configCheckListItemList = $scope.configCheckListItemList;
                $scope.configurableChecklistTemplate.configurableChecklistInputType.push($scope.configurableChecklistInputType);
                common.preprocessload();
                $http({
                    url: "/CPRV2/AddNewConfigurableChecklist",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ configurableChecklistTemplateModel: $scope.configurableChecklistTemplate, cprId: $scope.cprId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();
                        if (response.data.output == null) {
                            dialogService.ConfirmDialogWithOkay("", response.data.message);
                        }
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
                    $scope.configurableChecklistInputType.description = null;
                 
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


    Page_Load();
  
}));