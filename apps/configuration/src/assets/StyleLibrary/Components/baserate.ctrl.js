(app.controller("BaseRate", function ($scope, $http, $filter,dialogService) {

    /// .................. Variables
    $scope.listBaseRate = [];

    $scope.baserate = {
        id: '',
        form: '',
        to: '',
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var baserateId = (common.GetParameterByName("id", null));
        return baserateId;
    };

    function SubmitBaseRate() {
        try {
            $http({
                url: "/Master/SubmitBaseRate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ baserate: $scope.baserate })
            }).then(function successCallback(response) {
                if (response.data.success)
                {
                    GetAllBaseRate();
                    alert("Success");
                }                  
                else
                    dialogService.ShowDialog(response.data.message);    
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitBaseRate ' + e);
        }
    }

    function GetAllBaseRate() {
        try {
            $http({
                url: "/Master/GetAllBaseRate",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listBaseRate = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllBaseRate: " + e);
        }
    }

    function GetBaseRateById() {
        var baseRateId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetBaseRateById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ baseRateId: baseRateId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.baserate = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBaseRateById: " + e);
        }
    };

    $scope.Page_Load = function () {
        GetAllBaseRate();
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetBaseRateById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitBaseRate();
        } catch (e) {
            alert('SubmitBaseRate_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
