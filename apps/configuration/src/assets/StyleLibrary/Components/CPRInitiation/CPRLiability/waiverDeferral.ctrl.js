(app.controller("WaiverDeferralCtrl", function ($scope, $http, $filter, dialogService) {

    $scope.waiverEvaluatorComment = null;
    $scope.deferralEvaluatorComment = null;
    $scope.cPRWaiver = {
        id: null,
        waiver: null,
        justification: null,
        deviation: false,
        active: true
    };
    $scope.cPRDeferral = {
        id: null,
        deferral: null,
        duedate: null,
        justification: null,
        active: true
    };
    $scope.listCPRDeferral = [];
    $scope.listCPRWaiver = [];

    $scope.Page_Load = function () {
        var cprId = GetUrlParameters();
        if (cprId != null) {
            GetAllWaiverType();
            GetAllDefferalType();
            GetCPRWaiverByCPR(cprId);
            GetCPRDeferralByCPR(cprId);
        }
    };

    function ResetWaiverModel() {
        try {
            $scope.cPRWaiver = {
                id: null,
                waiver: null,
                justification: null,
                deviation: false,
                active: true
            };
            $scope.waiverForm.$setPristine();
            $scope.waiverForm.$setUntouched();
        } catch (e) {
            alert("Exception ResetWaiverModel" + e);
        }
    }
    function ResetDeferralModel() {
        try {
            $scope.cPRDeferral = {
                id: null,
                deferral: null,
                justification: null,
                duedate: null,
                active: true
            };
            $scope.deferralForm.$setPristine();
            $scope.deferralForm.$setUntouched();
        } catch (e) {
            alert("Exception ResetDeferralModel" + e);
        }
    }

    $scope.ResetDeferralBtn_ClickEvent = function () {
        try {
            ResetDeferralModel();
        } catch (e) {
            alert("Exception ResetDeferralBtn_ClickEvent " + e);
        }
    };
    $scope.ResetWaiverBtn_ClickEvent = function () {
        try {
            ResetWaiverModel();
        } catch (e) {
            alert("Exception ResetWaiverBtn_ClickEvent " + e);
        }
    };

    $scope.RemoveWaiverDetails_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveWaiverDetails_ClickEvent " + e);
            }
    };
    $scope.RemoveDeferralDetails_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveDeferralDetails_ClickEvent " + e);
            }
        };

    function AddWaiverDetails_Function(waiver) {
        try {
            if (waiver.deviation === true)
                waiver.deviation = true;
            else
                waiver.deviation = false;

            if (angular.isUndefined($scope.listCPRWaiver) || $scope.listCPRWaiver === null)
                $scope.listCPRWaiver = [];
            $scope.listCPRWaiver.push(waiver);
            ResetWaiverModel();

        } catch (e) {
            alert("Exception AddWaiverDetails_Function" + e);
        }
    }
    function AddDeferralDetails_Function(deferral) {
        try {

            if (angular.isUndefined($scope.listCPRDeferral) || $scope.listCPRDeferral === null)
                $scope.listCPRDeferral = [];
        
            $scope.listCPRDeferral.push(deferral);
            ResetDeferralModel();

        } catch (e) {
            alert("Exception AddDeferralDetails_Function" + e);
        }
    }
    $scope.AddWaiverBtn_ClickEvent = function (waiver) {
        try {
            if ($scope.waiverForm.$valid) {
                if (waiver != null) {
                    AddWaiverDetails_Function(waiver);
                }
            }
        } catch (e) {
            alert("Exception AddWaiverBtn_ClickEvent " + e);
        }
    };
    $scope.AddDeferralBtn_ClickEvent = function (deferral) {
        try {
            if ($scope.deferralForm.$valid) {
                if (deferral != null) {

                    AddDeferralDetails_Function(deferral);
                }
            }
        } catch (e) {
            alert("Exception AddDeferralBtn_ClickEvent " + e);
        }
    };

    function BindWaiverDetailValues(list, item) {
        try {
            var index = $scope.listCPRWaiver.indexOf(item);
            if (item.id == 0 || item.id == null) {
                $scope.cPRWaiver = $scope.listCPRWaiver[index];
                $scope.cPRWaiver.deviation = $scope.listCPRWaiver[index].deviation;
            }
            else {
                $scope.cPRWaiver = GetListItemById($scope.listCPRWaiver, item.id);
            }
            if (!angular.isUndefined(item.waiver) && item.waiver != null)
                $scope.cPRWaiver.waiver = $scope.listWaiverType[GetArrayIndexByValue($scope.listWaiverType
                    , "type"
                    , item.waiver.type)];

            if (list != null)
                common.RemoveItemFromList(list, item, false);
        } catch (e) {
            alert("Exception BindWaiverDetailValues " + e);
        }
    }
    function BindDeferralDetailValues(list, item) {
        try {
            var index = $scope.listCPRDeferral.indexOf(item);
            if (item.id == 0 || item.id == null) {
                $scope.cPRDeferral = $scope.listCPRDeferral[index];
            }
            else {
                $scope.cPRDeferral = GetListItemById($scope.listCPRDeferral, item.id);
            }

            if (!angular.isUndefined(item.deferral) && item.deferral != null) {
            /*    $scope.CPRDeferral.deferral = item.deferral;*/
                $scope.CPRDeferral.deferral = $scope.listDeferralType[GetArrayIndexByValue($scope.listDeferralType
                    , "type"
                    , item.deferral.type)];
            }
               

            if (item.duedate != null) {
                //$scope.ADtoBS(item.duedate, 'cPRDeferral.duedate_np');
            }

            if (list != null)
                common.RemoveItemFromList(list, item, false);
        } catch (e) {
            alert("Exception BindDeferralDetailValues " + e);
        }
    }

    $scope.EditWaiverDetailsTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null) {
                BindWaiverDetailValues(list, item);
            }
        } catch (e) {
            alert("Exception EditWaiverDetailsTableItem_ClickEvent " + e);
        }
    };
    $scope.EditDeferralDetailsTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null) {
                BindDeferralDetailValues(list, item);
            }
        } catch (e) {
            alert("Exception EditWaiverDetailsTableItem_ClickEvent " + e);
        }
    };

    function GetCPRWaiverByCPR(CPRIdstring) {
        try {
            $http({
                url: "/CPRV2/GetCPRWaiverByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { CPRIdstring: CPRIdstring }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.waiverMapper = response.data.output;
                    $scope.listCPRWaiver = $scope.waiverMapper.listCPRWaiver;
                  //  $scope.CPRWaiver = $scope.listCPRWaiver;
                    $scope.waiverEvaluatorComment = $scope.waiverMapper.waiverEvaluatorComment;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetCPRWaiverByCPR " + e);
        }
    }
    function GetCPRDeferralByCPR(CPRIdstring) {
        try {
            $http({
                url: "/CPRV2/GetCPRDeferralByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { CPRIdstring: CPRIdstring }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.deferralMapper = response.data.output;
                    $scope.listCPRDeferral = $scope.deferralMapper.listCPRDeferral;
                    $scope.CPRDeferral = $scope.listCPRDeferral;
                    $scope.deferralEvaluatorComment = $scope.deferralMapper.deferralEvaluatorComment;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetCPRDeferralByCPR " + e);
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
    function GetAllDefferalType() {
        try {
            $http({
                url: "/Master/GetAllDefferalType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDeferralType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllAssetsType: " + e);
        }
    }

    function SubmitDefferal() {
        try {
            var cprId = GetUrlParameters();
            var deferralMapper = {
                'cprId': cprId,
                'listCPRDeferral': $scope.listCPRDeferral,
                'deferralEvaluatorComment': $scope.deferralEvaluatorComment
            }
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveDeferral",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ deferralMapper: deferralMapper})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.deferralMapper = response.data.output;
                    $scope.listCPRDeferral = $scope.deferralMapper.listCPRDeferral;
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitDefferalType ' + e);
        }
    }
    function SubmitWaiver() {
        try {
            var cprId = GetUrlParameters();
            var waiverMapper = {
                'cprId': cprId,
                'listCPRWaiver': $scope.listCPRWaiver,
                'waiverEvaluatorComment': $scope.waiverEvaluatorComment
            }
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveWaiver",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ waiverMapper: waiverMapper })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.waiverMapper = response.data.output;
                    $scope.listCPRWaiver = $scope.waiverMapper.listCPRWaiver;
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }
            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitWaiver ' + e);
        }
    }
    $scope.SubmitDefferal_ClickEvent = function () {
        try {
            SubmitDefferal();
        } catch (e) {
            alert('SubmitDefferalType_ClickEvent ' + e);
        }
    }
    $scope.SubmitWaiver_ClickEvent = function () {
        try {
            SubmitWaiver();
        } catch (e) {
            alert('SubmitDefferalType_ClickEvent ' + e);
        }
    }

    function GetUrlParameters() {
        var cprId = (common.GetParameterByName("cprno", null));
        return cprId;
    };

    $scope.Page_Load();

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
    function GetListItemById(list, id) {
        try {
            var result;
            if (list.length > 0 && id != null) {
                result = $filter('filter')(list, { id: id }, true);
            }
            return result[0];
        } catch (e) {
            alert("Exception GetListItemById " + e);
        }
    }
    $scope.ADtoBS = function (date, refModel) {
        if (date != null && date != '') {
            var ot = NepaliDateConverter(date, false);
            // Get the model
            var model = $parse(refModel);
            // Assigns a value to it
            model.assign($scope, ot);

            // Apply it to the scope
            //$scope.$apply();

            //console.log($scope.dt.nepaliDate);  // logs 42
        }

    };
    function NepaliDateConverter(date, nepaliToEnglish) {
        try {
            var dt = date.split('/');
            if (dt.length == 3) {
                var dt_date = parseInt(dt[0]);
                var dt_month = parseInt(dt[1]);
                var dt_year = parseInt(dt[2]);

                var converter = new DateConverter();
                if (nepaliToEnglish) {
                    converter.setNepaliDate(dt_year, dt_month, dt_date);
                    return converter.getEnglishDate().toString().padStart(2, 0) + '/' + converter.getEnglishMonth().toString().padStart(2, 0) + '/' + converter.getEnglishYear();
                } else if (nepaliToEnglish == false) {
                    converter.setEnglishDate(dt_year, dt_month, dt_date);
                    return converter.getNepaliDate().toString().padStart(2, 0) + '/' + converter.getNepaliMonth().toString().padStart(2, 0) + '/' + converter.getNepaliYear();
                }
            }

            return '';

        } catch (e) {
            return '';
        }
    }
















}));
