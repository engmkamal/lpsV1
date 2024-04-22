(app.controller("IntroducerCtrl", function ($scope, $http, $filter) {

    /// .................. Variables

    $scope.introducer = {
        id: '',
        address: '',
        name: '',
        nic: '',
        cprId: '',
        blacklisted:false,
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var introducerid = (common.GetParameterByName("id", null));
        return introducerid;
    };

    function ResetIntroducer() {
        $scope.introducer = {
            id: '',
            address: '',
            name: '',
            nic: '',
            cprId: '',
            blacklisted: false,
            active: true,
        };

    };


    function GetIntroducerById() {
        var introducerid = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetIntroducerById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ introducerid: introducerid })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.introducer = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetIntroducerById: " + e);
        }
    };

    function SubmitIntroducer() {
        try {
            $http({
                url: "/Master/SubmitIntroducer",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ introducer: $scope.introducer })
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Success");
                     ResetIntroducer();
            }, function errorCallback(response) {
                alert("Error");
                ResetIntroducer();
            });
        } catch (e) {
            alert('SubmitIntroducer ' + e);
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetIntroducerById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitIntroducer();
        } catch (e) {
            alert('SubmitIntroducer_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
