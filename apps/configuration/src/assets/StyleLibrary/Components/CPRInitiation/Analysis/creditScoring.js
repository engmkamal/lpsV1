(app.controller("creditScoreCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables    

   
    $scope.listProductforCreditscore = [];
    $scope.creditscoringEvaluationcomment = null;
    $scope.creditScore = {
        id: null,
        product: null,
        scoreCardTemplate: null,
        listQuestions: [],
        grade: null,
        totalMark: null,
        active: true
    };
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    $scope.externalCreditScore = {
        id: 0,
        ratingType: null,
        shortTermRating: null,
        longTermRating: null,
        status: null,
        validity: null,
        ratedBy: null,
        financialYear: null,
        dateofRating: null,
        remarks: null,
        active: true
    }

    $scope.Page_Load = function () {
        try {
            $scope.listProductforCreditscore = $scope.listProducts;
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }

            var cprId = GetUrlParameters();
            GetCreditScoreByCprId(cprId);
            GetCreditScoringByCprId(cprId);
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    $scope.GetCreditScoretemplateByProduct = function (product) {
        GetScoreCardTemplatesByProductId(product.idd);
    }

    function GetScoreCardTemplatesByProductId(productId) {
        try {
            $http({
                url: "/Master/GetScoreCardTemplateByProductId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { productid: productId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listScoreCardTemplates = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetScoreCardTemplatesByProductId" + e)
        }
    }

    $scope.GetScoreCardQuestions_ClickEvent = function (item) {
        try {
            if (item != null)
                GetScoreCardByScoreCardTemplateId(item.id);

        } catch (e) {
            alert("Exception GetScoreCardQuestions_ClickEvent " + e);
        }
    };

    function GetScoreCardByScoreCardTemplateId(scoreCardTemplateId) {
        try {
            $http({
                url: "/Master/GetScoreCardByScoreCardTemplateId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { scoreCardTemplateId: scoreCardTemplateId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.creditScore.listQuestions = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetScoreCardByScoreCardTemplateId" + e)
        }
    }

    $scope.SubmitScoreCard_ClickEvent = function (item) {
        try {

            if (item != null) {
                if ($filter('filter')($scope.creditScore.listQuestions, { selectedAnswer: null }).length > 0) {
                    dialogService.ConfirmDialogWithOkay(''
                        , global._scorecardnotcompletedmessage);
                } else {
                    $scope.creditScore.totalMark = GetScoreCardTotalMark(item.listQuestions);
                    GetScoreCardGradeByTemplateAndTotalMark(item.scoreCardTemplate.id, $scope.creditScore.totalMark);
                }
            }

        } catch (e) {
            alert("Exception SubmitScoreCard_ClickEvent " + e);
        }
    };

    function GetScoreCardGradeByTemplateAndTotalMark(templateId, totalMark) {
        try {
            if (templateId != null && totalMark != null) {
                $http({
                    url: "/Master/GetScoreCardGradeByTemplateAndTotalMark",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { templateId: templateId, totalMark: totalMark }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.creditScore.grade = response.data.output;
                    }
                },
                function errorCallback(response) {
                    $scope.error = response;
                });
            }

        } catch (e) {
            alert("Exception GetScoreCardGradeByTemplateAndTotalMark" + e);
        }
    }

    function GetScoreCardTotalMark(item) {
        try {
            var total = 0;
            if (item != null)
                angular.forEach(item, function (value, key) {
                    if (value.selectedAnswer != null)
                        total += value.selectedAnswer.score;
                });

            return total;
        } catch (e) {
            alert("Exception GetScoreCardTotalMark: " + e);
        }
    }

    $scope.ReTakeScoreCard_ClickEvent = function (item) {
        try {
            if (item != null) {
                $scope.creditScore.grade = null;
                $scope.creditScore.id = null;
                $scope.listScoreCardTemplates;
            }
        } catch (e) {
            alert("Exception ReTakeScoreCard_ClickEvent " + e);
        }
    };

    $scope.SaveScoreCard_ClickEvent = function (creditScore) {
        try {
            if (creditScore != null)
                SaveCreditScoreInfo(creditScore);

        } catch (e) {
            alert("Exception SaveScoreCard_ClickEvent " + e);
        }
    };

    function SaveCreditScoreInfo(creditScore) {
        try {
            var cPRId = GetUrlParameters();
            var creditScoreMapper = {
                'creditScoreModel': creditScore,
                'cprId': cPRId,
                'creditScoreEvaluatorComment': $scope.creditscoringEvaluationcomment
            }
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCreditScore",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ creditScoreMapper: creditScoreMapper })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        //$scope.creditScoreMapper = response.data.output;
                        //$scope.creditScore = $scope.creditScoreMapper.creditScoreModel;
                        GetCreditScoreByCprId();

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
            alert('SaveSWOTByApproval ' + e);
        }
    }
    
    function GetCreditScoreByCprId() {
        try {
            common.preprocessload();
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetCreditScoreByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.creditScoreMapper = response.data.output;
                    $scope.creditScore = $scope.creditScoreMapper.creditScoreModel;
                    $scope.creditscoringEvaluationcomment = $scope.creditScoreMapper.creditScoreEvaluatorComment;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCreditScoringByCprId " + e);
        }
    }


    function GetCreditScoringByCprId() {
        try {
            common.preprocessload();
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetExternalCreditScoreByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.externalCreditScore = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCreditScoringByCprId " + e);
        }
    }

    $scope.SubmitExternalCreditScore = function () {
        try {
            SaveExternalCreditScore();
        } catch (e) {
            alert("SubmitRiskAnalysisICRRS_ClickEvent error" + e);
        }
    };
    function SaveExternalCreditScore() {
        try {
            var cPRId = GetUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveExternalCreditScoring",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRCreditScoreModel: $scope.externalCreditScore, cprId: cPRId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    // alert("Success");
                    common.preprocesshide();
                    $scope.externalCreditScore = response.data.output;
                    // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                       

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
            alert('SaveSWOTByApproval ' + e);
        }
    }


    function ResetExternalCreditScore() {
        $scope.externalCreditScore = {
            id: 0,
            ratingType: null,
            shortTermRating: null,
            longTermRating: null,
            status: null,
            validity: null,
            ratedBy: null,
            financialYear: null,
            dateofRating: null,
            remarks: null,
            active: true
        }
    }


    $scope.Page_Load();

}));