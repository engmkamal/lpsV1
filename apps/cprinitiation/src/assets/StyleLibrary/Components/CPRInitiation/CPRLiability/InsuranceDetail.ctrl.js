(app.controller("InsuranceDetailCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.insuranceEvaluatorComment = null;
    $scope.insuranceCoverDetailsModelList = [];
    $scope.PageTitle = "Insurance Details";
    $scope.coverTypes = [
        {
            id: 0,
            cPRInsuranceDetailsId: null,
            coverName: "Life",
            active: true,
            editor: null,
            modified: null,
            author: null,
            created: null
        },
        {
            id: 0,
            cPRInsuranceDetailsId: null,
            coverName: "Fire/Natural Causes",
            active: true,
            editor: null,
            modified: null,
            author: null,
            created: null
        },
        {
            id: 0,
            cPRInsuranceDetailsId: null,
            coverName: "Accident",
            active: true,
            editor: null,
            modified: null,
            author: null,
            created: null
        }

    ];
    $scope.cPRInsuranceDetailsModel = {
        id: 0,
        insuredAsset: null,
        valueOfAsset: null,
        insuranceCompanyId: 0,
        coverName: '',
        companyName: null,
        cPRId: 0,
        encryptedCPRId: GetUrlParameters(),
        amount: null,
        expiryDate: null,
        //expiryDate: new Date,
        attachments: null,
        active: true,
        editor: 0,
        modified: new Date,
        author: 0,
        created: new Date
    };
    $scope.listCoverTypes = [];
    
    $scope.insuranceCoverDetailsList = [];

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        GetInsuranceCompanyList();
        GetInsuranceCoverTypes();

        if (urlParameter != null) {
            GettInsuranceDetilsByCPRId(urlParameter);
        }
    };

    function GetInsuranceCoverTypes() {
        try {
            $http({
                url: "/CPRV2/GetInsuranceCoverTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCoverTypes = response.data.output;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetInsuranceCoverTypes: " + e);
        }
    }
    function GetInsuranceCompanyList() {
        try {
            $http({
                url: "/CPRV2/GetInsuranceCompanyList",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({})
            }).then(function successCallback(response) {
                if (response.data.success) {

                    $scope.insuranceCompanyList = response.data.output;
                    GettInsuranceDetilsByCPRId();
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetInsuranceCompanyList ' + e);
        }
    }
    function GetArrayIndexByValue(arr, attr, value) {
        try {
            if (attr !== null) {
                for (var i = 0; i < arr.length; i++)
                    if (arr[i][attr] === value)
                        return i;
                return -1;
            } else {
                for (var i = 0; i < arr.length; i++)
                    if (arr[i] === value)
                        return i;
                return -1;
            }

        } catch (e) {
            alert("GetArrayIndexByValue: " + e);
        }
    }
    function GetInsuranceCompanyById(id) {
        try {
            $http({
                url: "/CPRV2/GetInsuranceCompanyById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ insuranceCompanyId: id })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.insuranceCompanyDetails = response.data.output;
                    var index = GetArrayIndexByValue($scope.insuranceCompanyList, "name", $scope.insuranceCompanyDetails.name);
                    $scope.insuranceCompanyDetails = $scope.insuranceCompanyList[index];
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetInsuranceCompanyById ' + e);
        }
    }

    function changeDateFormat(dateString) {
        var str = dateString;

        var slash = str.slice(1, 2);
        if (slash == "-") {
            var zeroday = "0";
            str = zeroday.concat(str);
        }
        var slashMonth = str.slice(4, 5);
        if (slashMonth == "-") {
            var zeroMonth = "0";
            var res = str.split("-");
            var month = zeroMonth.concat(res[1]);
            str = res[0] + "-" + month + "-" + res[2];
        }

        var mm = str.slice(0, 2);
        var dd = str.slice(3, 5);
        var yy = str.slice(6, 10);
        var dateArrayNew = [dd, mm, yy];
        var newFormat = dateArrayNew.join("/");

        return newFormat;
    }

    function GettInsuranceDetilsByCPRId() {
        try {
            var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GettInsuranceDetilsByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ CPRId: cprId })
            }).then(function successCallback(response) {
                if (response.data.success) {

                    $scope.insuranceDetailMapper = response.data.output;
                 
                    if ($scope.insuranceDetailMapper != null) {
                        $scope.cPRInsuranceDetailsModel = $scope.insuranceDetailMapper.cPRInsuranceDetailsModel;
                        $scope.cPRInsuranceDetailsModel.expiryDate = changeDateFormat($scope.cPRInsuranceDetailsModel.expiryDate);

                        if ($scope.insuranceDetailMapper.insuranceCoverDetailsList == null)
                            $scope.insuranceCoverDetailsList = [];
                        else
                            $scope.insuranceCoverDetailsList = $scope.insuranceDetailMapper.insuranceCoverDetailsList;
                 
                        $scope.insuranceEvaluatorComment = $scope.insuranceDetailMapper.insuranceEvaluatorComment;
                        //$scope.expiryDateDateFormat = Date($scope.cPRInsuranceDetailsModel.expiryDate);
                        //$scope.cPRInsuranceDetailsModel.expiryDate = $scope.expiryDateDateFormat;
                        GetInsuranceCompanyById($scope.cPRInsuranceDetailsModel.insuranceCompanyId);
                    }
                    // $scope.ADtoBS($scope.insuranceDetailMapper.cPRInsuranceDetailsModel.expiryDate, '$scope.insuranceDetailMapper.cPRInsuranceDetailsModel.expiryDate_np');
                    if ($scope.insuranceCoverDetailsList.length != 0)
                        $scope.InsuranceCoverDetailsCount = $scope.insuranceCoverDetailsList.length;
                    else
                        $scope.InsuranceCoverDetailsCount = 0;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('GettInsuranceDetilsByCPRId ' + e);
        }
    }
    $scope.RemoveCoverTypes_ClickEvent = function (list, request) {
        try {
            if (list != null && request != null) {
                if (confirm("Are you sure you want to delete ?") == true) {
                    var index = $scope.insuranceCoverDetailsList.indexOf(request);
                    $scope.insuranceCoverDetailsList[index].active = false;
                    $scope.InsuranceCoverDetailsCount = $scope.insuranceCoverDetailsList.length;
                    $scope.insuranceCoverDetailsList.splice(index, 1);
                }
            }
        } catch (e) {
            alert("Exception RemoveCoverTypes_ClickEvent" + e);
        }
    };

    $scope.AddCoverType_ClickEvent = function (item) {
        try {
            $scope.coverTypeSingle = {
                id: 0,
                cPRInsuranceDetailsId: 0,
                coverName: item,
                active: true,
                editor: 0,
                modified: new (Date),
                author: 0,
                created: new (Date)
            }
            $scope.result = 0;                                                  
            if (item != '') {

                if ($scope.insuranceCoverDetailsList.length > 0)
                    SearchCoverType(item);
                if ($scope.result === 0) {
                    $scope.insuranceCoverDetailsList.push($scope.coverTypeSingle);
                }
                else if (item === "" || item === null) {
                    dialogService.ConfirmDialogWithOkay('', "Please select a cover type!");
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Cover type is already inserted!");
                }

            }
            if ($scope.insuranceCoverDetailsList.length > 0)
                $scope.InsuranceCoverDetailsCount = $scope.insuranceCoverDetailsList.length;
            else
                $scope.InsuranceCoverDetailsCount = 0;

            ResetCoverType();


        }
        catch (ex) {
            alert("AddCoverType_ClickEvent " + ex);
        }
    };
    function ResetCoverType() {
            $scope.coverName = null;
    }


    function SearchCoverType(item) {
        if ($scope.insuranceCoverDetailsList.length > 0) {
            for (var i = 0; i < $scope.insuranceCoverDetailsList.length; i++) {
                if ($scope.insuranceCoverDetailsList[i].coverName === item) {
                    $scope.insuranceCoverDetailsList[i];
                    $scope.result = 1;
                }
            }
        }
    }
    $scope.ResetInsuranceDetails_ClickEvent = function () {
        try {
            ResetInsuranceDetails();
        }
        catch (ex) {
            alert("Exception in ResetInsuranceDetails_ClickEvent " + ex);
        }
    }
    function ResetInsuranceDetails() {
        try {

            $scope.cPRInsuranceDetailsModel = {
                id: 0,
                insuredAsset: 0,
                valueOfAsset: null,
                insuranceCompanyId: 0,
                CoverName: '',
                companyName: null,
                cPRId: 0,
                encryptedCPRId: GetUrlParameters(),
                amount: null,
                expiryDate: null,
                // expiryDate: new (Date),
                attachments: null,
                active: true,
                editor: 0,
                modified: new (Date),
                author: 0,
                created: new (Date),
            }

            ResetCoverType();
            $scope.insuranceCompanyDetails = null;
        }
        catch (ex) {
            alert("Exception in ResetInsuranceDetails " + ex);
        }
    }

    function GetUrlParameters() {
        var cprId = (common.GetParameterByName("cprno", null));
        return cprId;
    };

    function ConvertDateTypes(list) {
        for (var i = 0; i < list.length; i++) {
            list[i].created = Date(list[i].created);
            $scope.insuranceCoverDetailsList[i].created = list[i].created;
        }
    }
    $scope.SaveInsuranceDetails_ClickEvent = function () {
        try {
            if ($scope.insuranceCoverDetailsList.length != 0) {
                ConvertDateTypes($scope.insuranceCoverDetailsList);
            }
            SaveInsuranceDetails();
        } catch (e) {
            alert("SaveInsuranceDetails_ClickEvent " + e);
        }
    }
    function SaveInsuranceDetails() {
        try {
            common.preprocessload();
            $scope.cPRInsuranceDetailsModel.cPRId = 0;
            if ($scope.cPRInsuranceDetailsModel !== null && $scope.cPRInsuranceDetailsModel !== undefined && $scope.insuranceCompanyDetails !== undefined) {
                $scope.cPRInsuranceDetailsModel.companyName = $scope.insuranceCompanyDetails.name;
                $scope.cPRInsuranceDetailsModel.insuranceCompanyId = $scope.insuranceCompanyDetails.id;
                $scope.cPRInsuranceDetailsModel.encryptedCPRId = GetUrlParameters();
                $scope.test.cPRInsuranceDetailsModel = $scope.cPRInsuranceDetailsModel;
                $scope.test.insuranceCoverDetailsList = $scope.insuranceCoverDetailsList;
                $scope.test.insuranceEvaluatorComment = $scope.insuranceEvaluatorComment;
                $scope.test.cprId = GetUrlParameters();
                $scope.insuranceDetailMapper = $scope.test;
            }

            $http({
                url: "/CPRV2/SaveInsuranceDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ insuranceDetailMapper: $scope.insuranceDetailMapper })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                    common.preprocesshide();
                   // GettInsuranceDetilsByCPRId();
                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveInsuranceDetails ' + e);
        }
    }
    $scope.Page_Load();
}));