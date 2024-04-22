(app.controller("DocumentTypeCtrl", function ($scope, $http, $filter, dialogService, $timeout) {

    /// .................. Variables


    $scope.documentType = {
        id: '',
        code: '',
        name: '',
        description: '',
        active: true,
    };

    /// .................. Funtions

    function GetUrlParameters() {
        var documentTypeId = (common.GetParameterByName("id", null));
        return documentTypeId;
    };

    function GetDocumentTypeById() {
        var documentTypeId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetDocumentTypeById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ documentTypeId: documentTypeId })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.documentType = response.data.output[0];
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetDocumentTypeById: " + e);
        }
    };

    function SubmitDocumentType() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitDocumentType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ documentType: $scope.documentType })
            }).then(function successCallback(response) {
                if (response.data.success)
                    //alert("Success");
                    common.preprocesshide();
                dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                    ResetDocumentType();
                    var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                    if (spHostUrl != null) {
                        window.location.href = common.adminRedirectUrl += spHostUrl;
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                }
                );
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitDocumentType ' + e);
        }
    }

    $scope.CancelDocumenttype_ClickEvent = function () {
        try {
            ResetDocumentType();
        }
        catch (ex) {
            alert("Exception in CancelDocumenttype_ClickEvent " + ex);
        }
    }
    function GetDocumentTypes() {
        try {
            $http({
                url: "/Master/GetDocumentTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDocumentType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetDocumentTypes: " + e);
        }
    };
    function ResetDocumentType() {
        $scope.documentType = {
            id: '',
            code: '',
            name: '',
            description: '',
            active: true,
        };
    }
    function ValidateDocumentType() {
        var status = true;
        GetDocumentTypes();
        angular.forEach($scope.listDocumentType, function (value, index) {
            if (value.code == $scope.documentType.code) {
                alert("Code is already exist. Please re-enter a new code.");
                status = false;
               // break;
            }
            else {
                status = true;
            }
        });

        return status;
    }
    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            GetDocumentTypeById();
        }
        else {

        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
            GetDocumentTypes();
           if( ValidateDocumentType())
            SubmitDocumentType();
        } catch (e) {
            alert('SubmitDocumentType_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
