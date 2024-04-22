(app.controller("environmentCategoryCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.cPREnvironmentalCategory = {
        id: '',
        category: '',
        dateOfCretificate: '',
        validity: '',
        comment: '',
        active: true
    },


        $scope.Page_Load = function () {
            try {
                var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                if (spHostUrl != null) {
                    common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
                }
                var cprId = getUrlParameters();
                GetEnvironmentCategoryByCprId(cprId)
                common.pageloadhide();
            } catch (e) {
                alert("Page_Load " + e);
            }
        };

    function getUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function GetEnvironmentCategoryByCprId(cPrId) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetEnvironmentCategory",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPREnvironmentalCategory = response.data.output;
                   
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAccountPerformance " + e);
        }
    }

    $scope.SubmitEnvCategory_clickEvent = function () {
        try {
            SaveEnvCategory();
        } catch (e) {
            alert("SubmitSWOTByApproval_ClickEvent error" + e);
        }
    };
    function SaveEnvCategory() {
        try {
            var cPRId = getUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveEnvironmentalCategory",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPREnvCategoryModel: $scope.cPREnvironmentalCategory , cprId: cPRId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                           // ResetEnvCategory();

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

    function ResetEnvCategory() {
        $scope.cPREnvironmentalCategory = {
            id: '',
            category: '',
            dateOfCretificate: '',
            validity: '',
            comment: '',
            active: true
        }
    }


    $scope.Page_Load();

}));