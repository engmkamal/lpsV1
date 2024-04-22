(app.controller("CustomerSegmentCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables


    $scope.business = {
        id: '',
        name: '',
        description: '',
        active: true,
    };
    $scope.customerSegmant = {
        id: '',
        name: '',
        description: '',
        active: true
    }
    /// .................. Funtions

    function GetUrlParameters() {
        var businessId = (common.GetParameterByName("id", null));
        return businessId;
    };

    function GetBusinessById() {
        var businessId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetBusinessById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ businessId: businessId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.business = response.data.output;
                $scope.customerSegmant = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBusinessById: " + e);
        }
    };

    function SubmitCustomerSegmant() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitCustomerSegment",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ customerSegmant: $scope.customerSegmant })
            }).then(function successCallback(response) {

                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        ResetBusiness();
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl != null) {
                            window.location.href = common.adminRedirectUrl += spHostUrl;
                        }
                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitCustomerSegmant ' + e);
        }
    }

    $scope.CancelCustomerSegment_ClickEvent = function () {
        try {
            ResetBusiness();
        }
        catch (ex) {
            alert("Exception in CancelCustomerSegment_ClickEvent " + ex)
        }
    }

    function ResetBusiness() {
        $scope.business = {
            id: '',
            name: '',
            description: '',
            active: true,
        };
        $scope.customerSegmant = {
            id: '',
            name: '',
            description: '',
            active: true
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetBusinessById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            SubmitCustomerSegmant();
        } catch (e) {
            alert('Submit_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
