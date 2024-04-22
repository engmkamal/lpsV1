(app.controller("CPRLayoutCtrl", function ($scope, $http, $filter, $location) {
    // commmon
    $scope.test = "angular working";
    $scope.err = null;
    $scope.listNotification = [];

    function GetSPHostUrl() {
        try {            
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            $scope.homeUrl = '';
            if (spHostUrl != null) {
                $scope.spHostUrl = "&SPHostUrl=" + spHostUrl;
                $scope.homeUrl = $scope.spHostUrl;
            }
        } catch (e) {
            alert("Exception GetSPHostUrl: " + e);
        }
    };    
    function GetLatestCPR() {
            try {
                $http({
                    url: "/CPR/GetLatestCPRAsNotification",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listNotification = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.err = response;
                });

            } catch (e) {
                alert("Exception GetLatestCPR: " + e);
            }
    };
    function GetEncryptDecryptValue(radio, item) {
        try {
            $http({
                url: "/Master/GetEncryptDecryptValue",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ key: radio, value: item })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.result = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.err = response;
            });

        } catch (e) {
            alert("Exception GetLatestCPR: " + e);
        }
    };

    $scope.GetTimeDelayString = function (item) {
        
        var str = null;
        var date1 = new Date();
        var date2 = new Date(item);
        var hours = Math.abs(date1 - date2) / 36e5;
        // return "still testing";
        if (hours < 25)
            str = moment().subtract('hour', hours).fromNow();     
        else if (hours < 8761)
            str = moment().subtract('day', hours / 24).fromNow();        
        else if (hours > 8760) {
            var date = date2.getUTCFullYear() + "" + ("0" + (date2.getUTCMonth() + 1)).slice(-2) + "" + ("0" + date2.getUTCDate()).slice(-2);
            str = moment(date, "YYYYMMDD").fromNow();
        }
        
        //if ($scope.listNotification[$scope.listNotification.length - 1].time === item)
        //{
        //}
        return str;
    };

    $scope.EncryptDecrypt_ClickEvent = function (radio, item) {
        try {
            GetEncryptDecryptValue(radio, item);
        } catch (e) {
            alert("Exception EncryptDecrypt_ClickEvent" + e);
        }
    };

    $scope.SelectRadio = function () {
        $scope.result = '';
    };

    GetSPHostUrl();
    GetLatestCPR();
}));