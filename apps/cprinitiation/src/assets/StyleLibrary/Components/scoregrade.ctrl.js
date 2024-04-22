(app.directive('validateMaxValue', function () {
        return {
            require: 'ngModel',
            scope: {
                mdMaxValue: '=',
                mdModel:'=ngModel'
            },
            link: function (scope, element, attr, mCtrl) {
                function myValidation(value) {
                    if (value != null)
                        if (scope.mdMaxValue < value) {
                           // scope.form[attrs.name].$setValidity('test', false);
                            mCtrl.$setValidity("testerror", false);                        

                        }
                        else {
                            mCtrl.$setValidity("testerror", true);
                        }
                    return value;
                }
                mCtrl.$parsers.push(myValidation);
            }
        };
    }).controller("ScoreGradeCtrl", function ($scope, $http, $filter) {

        /// .................. Variable

        $scope.scoregrade = {
            id: "",
            name: "",
            maxValue: null,
            listGrading: [],
            active: true
        };

        $scope.isMaxValueFill = false;
        $scope.readOnlyMaxValue = false;

        $scope.startValue = null;
        $scope.endValue = null;
        $scope.grade = "";

        /// ............... Function

        function AddGrade(startValue, endValue, grade) {
            try {

                if ($scope.readOnlyMaxValue != true)
                    $scope.readOnlyMaxValue = true;

                $scope.scoregrade.listGrading.push({
                    id: "",
                    startValue: startValue,
                    endValue: endValue,
                    grade: grade
                });

                $scope.startValue = endValue + 1;
                $scope.endValue = null;
                $scope.grade = "";

            } catch (e) {
                alert("AddGrade " + e);
            }
        }
        
        function ResetScoreGrade() {
            try {

            $scope.scoregrade = {
                id: "",
                name: "",
                maxValue: null,
                listGrading: [],
                active: true
            };
            } catch (e) {
                alert("ResetScoreGrade " + e);
            }


        }



        function SubmitScoreGrade() {
            try {
                $http({
                    url: "/Master/SubmitScoreGrade",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ scoreGrade: $scope.scoregrade })
                }).then(function successCallback(response) {
                    if (response.data.success)
                        alert("Success");
                        ResetScoreGrade();

                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('SubmitScoreGrade ' + e);
            }
        }
        /// ............... Events

        $scope.ResetScoreGrade = function () {
            $scope.scoregrade = {
                id: "",
                name: "",
                maxValue: null,
                listGrading: [],
                active: true
            };
        }

        $scope.AddGrade_ClickEvent = function (startValue, endValue, grade) {
            try {
                if ($scope.scoreGradeFrom.$valid == true)
                    AddGrade(startValue, endValue, grade);
                else
                    alert("Not Valid");
            } catch (e) {
                alert("AddGrade_ClickEvent " + e);
            }
        }

        $scope.MaxValue_ChangeEvent = function (maxValue) {
            try {
                if (maxValue > 0) {
                    $scope.isMaxValueFill = true;
                    $scope.startValue = 0;
                }
            } catch (e) {
                alert("MaxValue_ChangeEvent " + e);
            }
        }

        $scope.Submit_ClickEvent = function () {
            try {
                SubmitScoreGrade();
            } catch (e) {
                alert('SubmitCategory_ClickEvent ' + e);
            }
        }

    }));