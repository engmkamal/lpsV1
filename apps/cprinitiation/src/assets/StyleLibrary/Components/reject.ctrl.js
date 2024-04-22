(app.controller("RejectCtrl", function ($scope, $http, $filter) {

    /// .................. Variables


    $scope.reject = {
        id: '',
        code:'',
        name: '',
        description: '',
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var rejectId = (common.GetParameterByName("id", null));
        return rejectId;
    };

    function GetRejectById() {
        var rejectId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetRejectById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ rejectId: rejectId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.reject = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetRejectById: " + e);
        }
    };

    function SubmitReject() {
        try {
            $http({
                url: "/Master/SubmitReject",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ reject: $scope.reject })
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Success");
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitReject ' + e);
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetRejectById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitReject();
        } catch (e) {
            alert('SubmitReject_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
