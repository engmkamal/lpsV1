(app.controller("stockPositionCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables
    $scope.cPRStockPositionModel = {
        dateOfInspection: '',
        item: '',
        stockValue: '',
        margin: '',
        inspectedBy: '',
        active: true
    };

    $scope.listcPRStockPosition = [];

    $scope.Page_Load = function () {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = getUrlParameters();
            GetStcokPositionByCprId(cprId)
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };

    function getUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function GetStcokPositionByCprId(cPrId) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetStockPositionByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listcPRStockPosition = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAccountPerformance " + e);
        }
    }

    $scope.AddStockPosition_ClickEvent = function (stockPosition) {
        try {
            if (!stockPosition.dateOfInspection || !stockPosition.item) {
                //validation
            } else {
                AddStockPosition_Function(stockPosition);
            }
        }
        catch (ex) {
            alert("Exception in ImportExport_ClickEvent " + ex);
        }
    };

    function AddStockPosition_Function(stockPosition) {
        try {
            if (angular.isUndefined($scope.listcPRStockPosition) || $scope.listcPRStockPosition === null)
                $scope.listcPRStockPosition = [];

            $scope.listcPRStockPosition.push(stockPosition);
            $scope.ResetStockPositionModel();

        } catch (e) {
            alert("Exception AddWaiverDetails_Function" + e);
        }
    }
    $scope.EditStockPostionList = function (x) {
        try {
            if ($scope.cPRStockPositionModel == null)
                $scope.cPRStockPositionModel = {};

            $scope.cPRStockPositionModel = x;
            var index = $scope.listcPRStockPosition.indexOf(x);
            $scope.listcPRStockPosition.splice(index, 1);

        } catch (e) {
            alert("Exception EditLiabilitySanctionHistoryList " + e);
        }
    };
    $scope.ResetStockPositionModel = function () {
        try {
            $scope.cPRStockPositionModel = {
                dateOfInspection: '',
                item: '',
                stockValue: '',
                margin: '',
                inspectedBy: '',
                active: true
            };
            $scope.stockPosition.$setUntouched();
            $scope.stockPosition.$setPristine();
        }
        catch (ex) {
            alert("Exception in LiabilitiesSectionHistory " + ex);
        }
    }

    $scope.RemoveItemFromGridList = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null || item.id == "" || item.id == '')
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromGridList" + e);
        }
    };

    $scope.SubmitStockPosition_clickEvent = function () {
        try {
            SubmitStockPosition();
        } catch (e) {
            alert("SubmitSWOTByApproval_ClickEvent error" + e);
        }
    };
    function SubmitStockPosition() {
        try {
            var cPRId = getUrlParameters();
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveStockPosition",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listCPRStockPosition: $scope.listcPRStockPosition, cprId: cPRId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.listcPRStockPosition = response.data.output; 
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        $scope.listcPRStockPosition = response.data.output;

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
                else {
                    common.preprocesshide();
                }

            }, function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SaveSWOTByApproval ' + e);
        }
    }

    function ResetStockPosition() {
        $scope.cPRStockPositionModel = {
            dateOfInspection: '',
            item: '',
            stockValue: '',
            margin: '',
            inspectedBy: '',
            active: true
        };
        $scope.stockPosition.$setUntouched();
        $scope.stockPosition.$setPristine();
        $scope.listcPRStockPosition = [];

    }


    $scope.Page_Load();

}));