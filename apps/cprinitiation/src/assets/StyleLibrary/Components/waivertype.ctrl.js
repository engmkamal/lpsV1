(app.controller("WaiverType", function ($scope, $http, $filter, dialogService) {

    /// .................. Variables
    $scope.listWaiverType = [];
    $scope.waivertype = {
        id: null,
        type: null,        
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var waivertypeId = (common.GetParameterByName("id", null));
        return waivertypeId;
    };
    function SubmitWaiverType() {
        try {
            $http({
                url: "/Master/SubmitWaiverType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ waivertype: $scope.waivertype })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    GetAllWaiverType();
                    alert("Success");
                }
                else
                    dialogService.ShowDialog(response.data.message);
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('Exception SubmitWaiverType' + e);
        }
    }
    function GetAllWaiverType() {
        try {
            $http({
                url: "/Master/GetAllWaiverType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listWaiverType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllWaiverType: " + e);
        }
    }
    function GetWaiverTypeById() {
        var waivertypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetWaiverTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ waivertypeId: waivertypeId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.waivertype = response.data.output[0];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetWaiverTypeById: " + e);
        }
    };

    $scope.Page_Load = function () {
        GetAllWaiverType();
        var urlParameter = GetUrlParameters();
        if (urlParameter != null)
            GetWaiverTypeById();
        
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitWaiverType();
        } catch (e) {
            alert('SubmitWaiverType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
