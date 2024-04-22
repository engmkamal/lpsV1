(app.controller("LiabilityDetail", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

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
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId != null) {
                GetLiabilityDetail(cprId);
            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }
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
                data: { listotherLiabilityModel: $scope.listotherLiability, liabilityEvaluatorComment: $scope.liabilitiesEvaluatorComment, cprId: cprId}
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
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
}));

