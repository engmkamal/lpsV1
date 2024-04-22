(app.controller("workingCapitalCtrl", function ($rootScope
    , $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.cPRWorkingCapitalDetailsModelList = {
        id: 0,
        cPRId: 0,
        workingCapitalDetailsModel: null,
        currentYear: 0,
        projectedYear: 0,
        conditions: 0,
        currentYearValue: 0,
        projectedYearValue: 0,
        active: true
    }
    $scope.workingcaptialmasterList = [];
    function GetAllCPRWorkingCapitalMaster() {

        try {
            $http({
                url: "/Master/GetAllCPRWorkingCapitalMasterCPR",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    debugger;
                    console.log(response.data.output);
                    $scope.workingcaptialmasterList = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    };
    function GetWorkingCaptialByCPRId() {
        try {
            var cprId = GetUrlParameters();
            $http({
                url: "/CPR/GetWorkingCaptialByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cPRId: cprId }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRWorkingCapitalDetailsModelList = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetWorkingCaptialByCPRId " + e);
        }
    };
    function SaveCPRWorkingCapitalDetails() {
        try {
            common.preprocessload();
            $http({
                url: "/CPR/SaveCPRWorkingCapitalDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRWorkingCapitalDetailsModelList: $scope.workingcaptialmasterList })
            }).then(function successCallback(response) {
                console.log(response.data);
                if (response.data.success) {
                    common.preprocesshide();
                    alert(response.data.message);

                }
                else {
                    common.preprocesshide();
                    alert(response.data.message);
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveCPRWorkingCapitalMaster ' + e);
        }
    }
    $scope.SaveWorkingCapitalDetails_ClickEvent = function () {
        try {
            SaveCPRWorkingCapitalDetails();
        } catch (e) {
            alert('SaveWorkingCapitalMaster_ClickEvent ' + e);
        }
    }
    $scope.Page_Load = function () {
        //GetAllCPRWorkingCapitalMaster();
        GetWorkingCaptialByCPRId();
    }
    $scope.Page_Load();

}));
