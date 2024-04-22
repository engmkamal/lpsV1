(app.controller("CreditScoringAdminCtrl", function ($rootScope, $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

   
    $scope.scoreGrade = {
        id: '',
        name:'',
        maxvalue: '',       
        description: '',
        active: true

    };
    $scope.scoreCardTemplate = {
        id: '',
        name: '',
        scoreGradeId: '',
        totalMark: '',
        description: '',
        active: true
    };
    $scope.scoreGrades = [];
    $scope.scoreCardTemplates = [];

    $scope.SubmitScoreGrade_ClickEvent = function () {       
        try {           
            common.preprocessload();
            $http({
                url: "/Master/SubmitScoreGrade",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ scoreGrades: $scope.scoreGrade })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    GetScoreGrade();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetProduct();
                        resetScoreGrade();
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl != null) {
                            window.location.href = common.adminRedirectUrl += spHostUrl;
                        }
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
            alert('SubmitProduct ' + e);
        }
    };

    $scope.ResetScoreGrade = function () {
        try {
            resetScoreGrade();
        } catch (e) {
            alert('EditScoreGrade ' + e);
        }
    };

    $scope.ResetScoreCardTemplate = function () {
        try {
            resetScoretTemplate();
        } catch (e) {
            alert('EditScoreGrade ' + e);
        }
    };

    function resetScoreGrade() {
        $scope.scoreGrade = {
            id: '',
            name: '',
            maxvalue: '',
            description: '',
            active: true

        };
    }

    function resetScoretTemplate() {
        $scope.scoreCardTemplate = {
            id: '',
            name: '',
            scoreGradeId: '',
            totalMark: '',
            description: '',
            active: true
        };
    }

    $scope.EditScoreGrade_ClickEvent = function (item) {
        try {
            $scope.scoreGrade = item;
        } catch (e) {            
            alert('EditScoreGrade ' + e);
        }
    };
    function GetScoreGrade() {
        try {
            
            $http({
                url: "/Master/GetScoreGrade",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listScoreGrade: $scope.scoreGrade })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.scoreGrades = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("GetScoreGrade: " + e);
        }
    }

    $scope.SubmitScoreCardTemplate_ClickEvent = function () {
        try {
          
            common.preprocessload();
            $http({
                url: "/Master/SubmitScoreCardTemplate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ scoreCardTemplates: $scope.scoreCardTemplate })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    GetScoreCardTemplate();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetProduct();
                        resetScoretTemplate();
               
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl != null) {
                            window.location.href = common.adminRedirectUrl += spHostUrl;
                        }
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
            alert('SubmitProduct ' + e);
        }
    };
    $scope.EditScoreCardTemplate_ClickEvent = function (item) {
        try {            
            $scope.scoreCardTemplate = item;
        } catch (e) {
            common.preprocesshide();
            alert('SubmitProduct ' + e);
        }
    };
    function GetScoreCardTemplate() {
        try {

            $http({
                url: "/Master/GetScoreCardTemplate",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listScoreCardTemplate: $scope.scoreCardTemplate })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.scoreCardTemplates = response.data.output;
                
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("GetScoreCardTemplate: " + e);
        }
    }

    $scope.scoreCardAnswer = {
        id: null,
        scoreCardQuestionId: null,
        answer: null, 
        score: null,
        active: true
    };
    $scope.scoreCardAnswers = [];
    $scope.AddQuestionAnswer = function () {
        try {
 
            var checkIfExist = $filter("filter")($scope.scoreCardAnswers, { answer: $scope.scoreCardAnswer.answer }, true)[0];       
            if (checkIfExist == undefined) {
                $scope.scoreCardAnswers.push($scope.scoreCardAnswer);
                $scope.scoreCardAnswer = {
                    id: null,
                    answer: 0,
                    score: null,
                    active: true
                };
            }
            else {
                alert("This answer already exist!!");
                }         

        }
        catch (e) {
            alert(e);
        }
    };
    $scope.RemoveQuestionAnswer = function (item) {
        try {
            if (confirm("Are you sure you want to delete?") == true) {
                if (item.id == 0 || item.id == null) {                    
                    var index = $scope.scoreCardAnswers.indexOf(item);
                    $scope.scoreCardAnswers.splice(index, 1);

                } else {
                    var obj = $filter("filter")($scope.scoreCardAnswers, { id: item.id })[0];
                    var index2 = $scope.scoreCardAnswers.indexOf(obj);
                    $scope.scoreCardAnswers[index2].active = false;                   
                }
            }

        } catch (e) {
            alert("Exception removeQuestionAnswer Error: " + e);
        }
    };
    $scope.scoreCardQuestionMaster = {
        id: '',
        scoreCardTemplateId: '',
        question: '',
        weight: '',
        description: '',
        active: true,
        listAnswers: []
    };
    $scope.scoreCardQuestionMasters = [];
    $scope.scoreCardQuestionMasterList = [];
    $scope.AddScoreCardQuestionMaster = function () {
        try {
         
            $scope.scoreCardQuestionMaster.listAnswers = $scope.scoreCardAnswers;
            $scope.scoreCardQuestionMaster.active = true;
            $scope.scoreCardQuestionMasters.push($scope.scoreCardQuestionMaster);
                        $scope.scoreCardQuestionMaster = {
                            id: null,
                            scoreCardTemplateId: null,
                            question: null,
                            weight: null,
                            description: null,
                            active: true                         
                        };
                        $scope.scoreCardAnswers = [];
               
        }
        catch (e) {
            alert(e);
        }
    };  
    $scope.RemoveQuestionAnswerMaster = function (item) {
        try {
            if (confirm("Are you sure you want to delete?") == true) {
                if (item.id == 0 || item.id == null) {
                    var index = $scope.scoreCardQuestionMasters.indexOf(item);
                    $scope.scoreCardQuestionMasters.splice(index, 1);

                } else {
                    var obj = $filter("filter")($scope.scoreCardQuestionMasters, { id: item.id })[0];
                    var index2 = $scope.scoreCardQuestionMasters.indexOf(obj);
                    $scope.scoreCardQuestionMasters[index2].active = false;
                }
            }

        } catch (e) {
            alert("Exception removeQuestionAnswer Error: " + e);
        }
    };
    $scope.SubmitQuestionMaster = function () {
        try {
            
            if ($scope.scoreCardQuestionMasters.length>0) {
                common.preprocessload();
                //var scoreCardQuestions = {
                //    'listQuestion': $scope.scoreCardQuestionMasters
                //};
                $http({
                    url: "/Master/SubmitScoreCardQuestion",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ scoreCardQuestionModels: $scope.scoreCardQuestionMasters })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();
                        GetScoreCardQuestionMaster();
                        $scope.scoreCardQuestionMasters = [];
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                           
                            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                            if (spHostUrl != null) {
                                window.location.href = common.adminRedirectUrl += spHostUrl;
                            }
                        }, function errorCallback(response) {
                            common.preprocesshide();
                        }
                        );
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                });
            }
            else {
                alert("Please add Score Card Question");
            }
        } catch (e) {
            common.preprocesshide();
            alert('SubmitProduct ' + e);
        }
    };
    function GetScoreCardQuestionMaster() {

        try {

            $http({
                url: "/Master/GetScoreCardQuestion",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listScoreCardQuestionModel: $scope.scoreCardQuestionMaster })
            }).then(function successCallback(response) {               
                if (response.data.success)
                    $scope.scoreCardQuestionMasterList = response.data.output;
                if ($scope.scoreCardQuestionMasterList !== null || $scope.scoreCardQuestionMasterList == undefined) {
                    GenerateQuestionMasterList($scope.scoreCardQuestionMasterList);
                }                
                //console.log($scope.scoreCardQuestionMasterList);
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("GetScoreGrade: " + e);
        }
       
    }
    function GenerateQuestionMasterList(scoreCardQuestionMasterList) {
        try {

            angular.forEach(scoreCardQuestionMasterList, function (scoreCardQuestionMaster, key) {
                var templateDeatil = null;
                 var index = $scope.scoreCardQuestionMasterList.indexOf(scoreCardQuestionMaster);
                templateDeatil = $filter("filter")($scope.scoreCardTemplates, { id: scoreCardQuestionMaster.scoreCardTemplateId.toString() }, true)[0];
               
                $scope.scoreCardQuestionMasterList[index].scoreCardTemplateName = templateDeatil.name;           
            });

        } catch (e) {
          //  alert(e);
        }
    }
    $scope.Page_Load = function () {
        GetScoreGrade();   
        GetScoreCardTemplate();
        GetScoreCardQuestionMaster();
    };

    $scope.Page_Load();

    $scope.CancelScoreCardQuestion_ClickEvent = function () {
        try {
            ResetScoreCardQuestion();
        }
        catch (ex) {
            alert("Exception in CancelProduct_ClickEvent" + ex);
        }
    };

    function ResetScoreCardQuestion() {
        $scope.scoreCardQuestionMaster = {
            id: null,
            scoreCardTemplateId: null,
            question: null,
            weight: null,
            description: null,
            active: true,
            listAnswers: []
        },
        $scope.scoreCardAnswer = {
            id: null,
            scoreCardQuestionId: null,
            answer: null,
            score: null,
            active: true
            };
        $scope.scoreCardQuestionMasters = [];
        $scope.scoreCardAnswers = [];
    }
}));