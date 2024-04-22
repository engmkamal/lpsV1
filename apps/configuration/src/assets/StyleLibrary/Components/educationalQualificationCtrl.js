(app.controller("educationalQualificationCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    $scope.listEducationalQualification = [];
    $scope.educationalQualification = {
        id: null,
        qualification: null,       
        active: true,
    };

    function GetUrlParameters() {
        var roleId = (common.GetParameterByName("id", null));
        return roleId;
    };

    function GetEducationalQualificationById() {
        var educationalQualificationId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetEducationalQualificationById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { educationalQualificationId: educationalQualificationId }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.educationalQualification = response.data.output;

                //if (!angular.isUndefined($scope.listProduct) && $scope.proposeTypeOfFacility.product !== null) {
                //    var index = common.GetArrayIndexByValue($scope.listProduct, 'id', $scope.proposeTypeOfFacility.product.id);
                //    if (index !== -1)
                //        $scope.proposeTypeOfFacility.product = $scope.listProduct[index];
                //}
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetEducationalQualificationById: " + e);
        }
    };


    function SubmitEdicationalQualification() {
        try {
            common.preprocessload();
            $http({
                url: "/Master/SubmitEducationalQualification",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ educationalQualification: $scope.educationalQualification })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                      //  ResetProposeTypeOfFacility();
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl !== null) {
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
            alert('SubmitEdicationalQualification ' + e);
        }
    }
    
    function ResetEducationalQualification() {
        try {
            $scope.educationalQualification = {
                id: null,
                qualification: null,
                active: true,
            };
        } catch (ex) {
            alert('Error on Reseting Educationa Qualification ' + ex)
        }
       
    }


    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();


        if (urlParameter != null) {
            GetEducationalQualificationById();
        }
    };



    ///.................. Events

    $scope.CancelEducationalQualification_ClickEvent = function () {
        try {
            ResetEducationalQualification();
        }
        catch (ex) {
            alert("Exception in CancelProposeTypeOfFacility_ClickEvent " + ex);
        }
    };

    $scope.SubmitEdicationalQualification_ClickEvent = function () {
        try {
            if ($scope.educationalQualification.qualification == null) {
                dialogService.ConfirmDialogWithOkay('Please input Qualification Data', global._recordNotFound)
            } else {
                SubmitEdicationalQualification();
            }
          
        } catch (e) {
            alert('SubmitEdicationalQualification_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));