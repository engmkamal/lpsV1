(app.controller("AssetDetailCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
    //Sanction Functions

    $scope.PageTitle = "Asset Details";
    $scope.assetDetailEvaluatorComment = null;
    $scope.assetsDetailsMovable = {
        id: '',
        particular: '',
        type: '',
        movableLocation: '',
        movableExtent: '',
        quantity: '',
        value: 0,
        isMortgage: false,
        ownerName: '',
        presentMarketValue: '',
        detailOfLoan: '',
        tangible: '',
        active: true
    };
    $scope.assetsDetailsImmovable = {
        id: '',
        type: '',
        location: '',
        extent: '',
        value: 0,
        isMortgage: false,
        ownerName: '',
        presentMarketValue: '',
        detailOfLoan: '',
        active: true
    };
    $scope.AssetsDetailsMovableList = [];
    $scope.listMovableAssets = [];
    $scope.listotherLiability = [];
    $scope.listImmovableAssets = [];
    $scope.Ismovable = false;
    $scope.IsImmovable = false;

    // For Liabilites
    $scope.liabilitiesEvaluatorComment = null
    $scope.liabilitydetails = {
        nameOfBank: null,
        branchname: null,
        facilityNature: null,
        purposeOfFacility: null,
        facilityAmount: null,
        monthlyInstallment: null,
        balancePayable: null,
        security: null,
        expiry: null,
        nameOfAccount: null,
        historyOfCommencementRelationship: null,
        status: null,
        remark: null,
        liabilityType: null,
        active: true
    };
    $scope.listotherLiability = [];

    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId != null) {
                GetAssetDetail(cprId);
                GetLiabilityDetail(cprId);
            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    $scope.ChangeAssetType = function () {
        if ($scope.AssetType === 'movable') {
            // Perform actions specific to movable asset type
            $scope.IsImmovable = false;
            $scope.Ismovable = true;
            console.log('Movable asset selected');
        } else if ($scope.AssetType === 'immovable') {
            // Perform actions specific to immovable asset type
            $scope.Ismovable = false;
            $scope.IsImmovable = true;
            console.log('Immovable asset selected');
        }
    };

    $scope.EditItemFromMovableAssetsDetailList = function (x) {
        try {
            if ($scope.assetsDetailsMovable == null)
                $scope.assetsDetailsMovable = {};

            $scope.assetsDetailsMovable = x;

            var index = $scope.listMovableAssets.indexOf(x);
            $scope.listMovableAssets.splice(index, 1);

        } catch (e) {
            alert("Exception EditItemFromMovableAssetsDetailList" + e);
        }
    };
    $scope.EditItemFromImmovableAssetsDetailList = function (x) {
        try {
            if ($scope.assetsDetailsImmovable == null)
                $scope.assetsDetailsImmovable = {};

            $scope.assetsDetailsImmovable = x;

            var index = $scope.listImmovableAssets.indexOf(x);
            $scope.listImmovableAssets.splice(index, 1);

        } catch (e) {
            alert("Exception EditItemFromImmovableAssetsDetailList" + e);
        }
    };
    $scope.RemoveItemFromMovableAssetsDetalList = function (list, request) {
        try {
            if (list != null && request != null) {
                if (confirm("Are you sure you want to delete ?") == true) {
                    var index = $scope.listMovableAssets.indexOf(request);
                    $scope.listMovableAssets[index].active = false;
                    /* $scope.listMovableAssets.splice(index, 1);*/
                }
            }
        } catch (e) {
            alert("Exception RemoveCoverTypes_ClickEvent" + e);
        }
    };
    $scope.RemoveItemFromImmovableAssetsDetalList = function (list, request) {
        try {
            if (list != null && request != null) {
                if (confirm("Are you sure you want to delete ?") == true) {
                    var index = $scope.listImmovableAssets.indexOf(request);
                    $scope.listImmovableAssets[index].active = false;
                   /* $scope.listImmovableAssets.splice(index, 1);*/
                }
            }
        } catch (e) {
            alert("Exception RemoveCoverTypes_ClickEvent" + e);
        }
    };
    $scope.AddMovableAssetsdetails_ClickEvent = function () {
        try {
            $scope.assetsDetailsMovable.active = true;

            $scope.listMovableAssets = $scope.listMovableAssets || [];
            $scope.listMovableAssets.push($scope.assetsDetailsMovable);
            // $scope.ResetMovableAssetsdetailsTable_ClickEvent();
            $scope.assetsDetailsMovable = {
                id: '',
                particular: '',
                type: '',
                movableLocation: '',
                movableExtent: '',
                quantity: '',
                value: 0,
                isMortgage: false,
                ownerName: '',
                presentMarketValue: '',
                detailOfLoan: '',
                tangible: '',
                active: true
            };
            //$scope.ResetMovableAssetsdetailsTable_ClickEvent();
            //$scope.assetsdetailsform.$setUntouched();
            //$scope.assetsdetailsform.$setPristine();
        } catch (e) {
            alert("AddMovableAssetsdetails_ClickEvent error" + e);
        }
    };
    $scope.ResetMovableAssetsdetailsTable_ClickEvent = function () {
        $scope.assetsDetailsMovable = {
            id: '',
            particular: '',
            type: '',
            movableLocation: '',
            movableExtent: '',
            quantity: '',
            value: 0,
            isMortgage: false,
            ownerName: '',
            presentMarketValue: '',
            detailOfLoan: '',
            tangible: '',
            active: true
        };
        //$scope.assetsdetailsform.$setUntouched();
        //$scope.assetsdetailsform.$setPristine();
    };
    $scope.AddImmovableAssetsdetails_ClickEvent = function () {
        try {
            $scope.assetsDetailsImmovable.active = true;

            $scope.listImmovableAssets = $scope.listImmovableAssets || [];
            $scope.listImmovableAssets.push($scope.assetsDetailsImmovable);
            $scope.ResetImmovableAssetsdetailsTable_ClickEvent();
            $scope.assetsDetailsImmovable = {
                id: '',
                particular: '',
                type: '',
                location: '',
                quantity: '',
                value: 0,
                isMortgage: false,
                ownerName: '',
                presentMarketValue: '',
                detailOfLoan: '',
                active: true
            };
            $scope.ResetImmovableAssetsdetailsTable_ClickEvent();
            //$scope.selectimmovableform.$setUntouched();
            //$scope.selectimmovableform.$setPristine();
        } catch (e) {
            alert("AddImmovableAssetsdetails_ClickEvent error" + e);
        }
    };
    $scope.ResetImmovableAssetsdetailsTable_ClickEvent = function () {
        $scope.assetsDetailsImmovable = {
            id: '',
            type: '',
            location: '',
            extent: '',
            value: 0,
            isMortgage: false,
            ownerName: '',
            presentMarketValue: '',
            detailOfLoan: '',
            active: true
        };
        ////$scope.selectimmovableform.$setUntouched();
        ////$scope.selectimmovableform.$setPristine();
        $scope.assetsDetailsImmovable.isMortgage= false         
    };


    $scope.SaveAssetDetail_ClickEvent = function () {
        try {
            if ($scope.listMovableAssets.length > 0 || $scope.listImmovableAssets.length > 0) {
                SaveAssetDetail();
            } else {
                dialogService.ConfirmDialogWithOkay('', "Add at least one Movabel or Imovable asset to save");
            }
            
        } catch (e) {
            alert("SaveAssetDetail_ClickEvent error" + e);
        }
    };
    function SaveAssetDetail() {
        try {
            var cprId = GetUrlParameters();
            var assetDetail = {
                'cprId': cprId,
                'listMovableAssets':  $scope.listMovableAssets,
                'listImmovableAssets': $scope.listImmovableAssets,
                'clientProfileId': $scope.borrowerprofile.id,
                'assetEvaluatorComment': $scope.assetDetailEvaluatorComment
            };
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveAssetDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { assetDetail: assetDetail}
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        $scope.listMovableAssets = response.data.output.listMovableAssets;
                        $scope.listImmovableAssets = response.data.output.listImmovableAssets;
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        common.preprocesshide();
                    } else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                        var cprId = GetUrlParameters();
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    });
                }
            }, function errorCallback(response) {
                common.preprocesshide();

            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveCPRLiabilitySanctionHistory: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    }
   /* Page_Load();*/
   
    function GetAssetDetail(cpr) {
        try {
            $http({
                url: "/CPRV2/GetAssetsDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr, clientProfileId: $scope.borrowerprofile.id }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.assetDetailMapper = response.data.output;
                    $scope.listMovableAssets = $scope.assetDetailMapper.listMovableAssets ;
                    $scope.listImmovableAssets = $scope.assetDetailMapper.listImmovableAssets;
                    $scope.assetDetailEvaluatorComment = $scope.assetDetailMapper.assetEvaluatorComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAssetDetail: " + e);
            common.LoderHide();
        }
    }

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    // Liabilites 

    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    $scope.RemoveItemFromLiabilityDetalList = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromLiabilityDetalList" + e);
        }
    };
    $scope.EditItemFromLiabilityDetailList = function (list, item) {
        try {

            $scope.liabilitydetails = item;
            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception EditItemFromLiabilityDetailList" + e);
        }
    };
    $scope.ResetliabilitydetailsTable_ClickEvent = function () {
        $scope.liabilitydetails = {
            nameOfBank: null,
            branchname: null,
            facilityNature: null,
            purposeOfFacility: null,
            facilityAmount: null,
            monthlyInstallment: null,
            balancePayable: null,
            security: null,
            expiry: null,
            nameOfAccount: null,
            historyOfCommencementRelationship: null,
            status: null,
            remark: null,
            liabilityType: null,
            active: true
        };
        $scope.formLiabilities.$setUntouched();
        $scope.formLiabilities.$setPristine();
    };
    $scope.Addliabilitydetails_ClickEvent = function () {
        try {
            $scope.liabilitydetails.active = true;

            if ($scope.listotherLiability == null)
                $scope.listotherLiability = [];

            $scope.liabilitydetails.cRClientProfileId = $scope.borrowerprofile.id;
            $scope.listotherLiability.push($scope.liabilitydetails);
            $scope.ResetliabilitydetailsTable_ClickEvent();
            $scope.formLiabilities.$setUntouched();
            $scope.formLiabilities.$setPristine();
        } catch (e) {
            alert("Addliabilitydetails_ClickEvent error" + e);
        }
    };
    $scope.Saveliabilitydetails_ClickEvent = function () {
        try {
            SaveLiabilityDetail();
        } catch (e) {
            alert("SaveAssetDetail_ClickEvent error" + e);
        }
    };

    Page_Load();
   
    function SaveLiabilityDetail() {
        try {
            var cprId = GetUrlParameters();

            common.preprocessload();
            $http({
                url: "/CPRV2/SaveOtherLiability",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { listotherLiabilityModel: $scope.listotherLiability, liabilityEvaluatorComment: $scope.liabilitiesEvaluatorComment, cprId: cprId }
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        // $scope.listotherLiability = response.data.output;
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        common.preprocesshide();
                    } else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                } else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._sessionExpired).then(function () {
                        var cprId = GetUrlParameters();
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    });
                }
            }, function errorCallback(response) {
                common.preprocesshide();

            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception SaveLiabilityDetail: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    }

    function GetLiabilityDetail(cpr) {
        try {
            $http({
                url: "/CPRV2/GetOtherLiability",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr, clientProfileId: $scope.borrowerprofile.id }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.liabilityDetailsMapper = response.data.output;
                    $scope.listotherLiability = $scope.liabilityDetailsMapper.otherLiabilityModellist;
                    $scope.liabilitiesEvaluatorComment = $scope.liabilityDetailsMapper.lieabilityEvaluatorComment;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAssetDetail: " + e);
            common.LoderHide();
        }
    }
  

}));