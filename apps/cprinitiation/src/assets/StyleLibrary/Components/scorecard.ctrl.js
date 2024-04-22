(app.controller("ScoreGradeCtrl", function ($scope, $http, $filter) {

    /// .................. Variable

    $scope.scorecard = {
        id: "",
        name: "",
        totalMark: "",
        scoregrade: [],
        listQuestions: [{
            id: "",
            question: "",
            weight: null,
            listAnswers: []
        }],
        active: true,
    };

    /// ............... Function

    function AddQuestions() {
        try {
            $scope.scorecard.listQuestions.push({
                id: "",
                name: "",
                weight: null,
                listAnswers: [],
                active:false
            });
        } catch (e) {
            alert("AddQuestions " + e);
        }
    }

    function AddQuestionAnswers(que) {
        try {

            var index = $scope.scorecard.listQuestions.indexOf(que);
            $scope.scorecard.listQuestions[index].listAnswers.push({
                id: "",
                name: "",
                score: null,
                active:false
            });

        } catch (e) {
            alert("AddQuestionAnswers " + e);
        }
    }

    function ResetScoreCard(){
        try {
            $scope.scorecard = {
                id: "",
                name: "",
                totalMark: "",
                scoregrade: [],
                listQuestions: [{
                    id: "",
                    question: "",
                    weight: null,
                    listAnswers: []
                }],
                active: true,
            }; 
        }
        catch (e) {
            alert("ResetScoreCard " + e);
        }
    };

    function SubmitScoreCard() {
        try {
            $http({
                url: "/Master/SubmitScoreCard",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ scoreCard: $scope.scorecard})
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Success");
                    ResetScoreCard();
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert('SubmitScoreCardTemplate ' + e);
        }
    }

    function GetGradeByTotalMark() {
        try {
            $http({
                url: "/Master/GetGradeByTotalMark",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { totalMark: $scope.scorecard.totalMark }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.scorecard.scoregrade = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert('SubmitScoreCardTemplate ' + e);
        }
    }

    /// ............... Events

    $scope.AddQuestion_ClickEvent = function () {
        try {
            AddQuestions();
        } catch (e) {
            alert("AddQuestion_ClickEvent " + e);
        }
    }

    $scope.AddQuestionAnswers_ClickEvent = function (que) {
        try {
            AddQuestionAnswers(que);
        } catch (e) {
            alert("AddQuestionAnswers_ClickEvent " + e);
        }
    }

    $scope.Submit_ClickEvent = function () {
        try {
            SubmitScoreCard();
        } catch (e) {
            alert('SubmitScoreCard_ClickEvent ' + e);
        }
    }

    $scope.TotalMark_ClickEvent = function () {
        try {
            GetGradeByTotalMark();
        } catch (e) {
            alert("LegalForm_ChangeEvent " + e);
        }
    }

    
}));