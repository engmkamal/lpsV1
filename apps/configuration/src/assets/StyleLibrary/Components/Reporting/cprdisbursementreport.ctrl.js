(app.controller("CPRDisbursementReportViewCtrl", ["$scope", "$http", "$filter", "$location", '$mdDialog', "$rootScope", "$timeout", "dialogService", 'Excel', function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService, Excel) {
    // "use strict";
    $scope.PageTitle = "CPR Disbursement Admin Report";
    $scope.cPRSearchKeyModel = {
        cPRNo: null,
        primaryCIF: null,
        customerSegmentId: null,
        legalFormId: null,
        branchId: null,
        divisionId: null,
        requesterName: null,
        requestStatus: null,
        startDate: null,
        endDate: null
    };

    $scope.listCustomerSegment = [];
    $scope.listLegalForms = [];
    $scope.listBranch = [];
    $scope.listRegion = [];
    $scope.listRange = [];
    $scope.listDivisions = [];
    $scope.cprDisbursementReportlist = [];
    $scope.requestCount = {};
    $scope.statusList = [
        { name: "All" },
        { name: "Draft" },
        { name: "In Progress" },
        { name: "Rejected" },
        { name: "Approved" }

    ];


    Page_Load();
    function Page_Load() {
        try {
            common.pageloadhide();
            // GetSearchPrefix();

        } catch (e) {
            alert("Page_Load " + e);
        }
    }
    function GetSearchPrefix() {
        try {

            common.preprocessload();
            $http({
                url: "/Report/GetCPRSearchReportPrefix",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}

            }).then(function successCallback(response) {
                 common.preprocesshide();
                if (response.data.success) {
                    common.preprocesshide();
                    var cprSearchPrefix = response.data.output;
                    $scope.listBranch = cprSearchPrefix.branchModels;
                    $scope.listRange = cprSearchPrefix.rangeModels;
                    $scope.listRegion = cprSearchPrefix.regionModels;
                    $scope.listCustomerSegment = cprSearchPrefix.businessModels;
                    $scope.listDivisions = cprSearchPrefix.divisionModels;
                }
            }),
                function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;

                };

        } catch (e) {
            console.log(e);
        }
    };
    $scope.GetSearchFilterPrefix_ClickEvent = function () {
        try {
            GetSearchPrefix();
        } catch (ex) {
            alert("Exception in GetSearchFilterPrefix_Click " + ex);
        }
    };



    $scope.GetCPRDetailSearchForm_ClickEvent = function () {
        try {

            if ($scope.cPRSearchKeyModel.range != null)
                $scope.cPRSearchKeyModel.rangeId = $scope.cPRSearchKeyModel.range.id;
            if ($scope.cPRSearchKeyModel.region != null)
                $scope.cPRSearchKeyModel.regionId = $scope.cPRSearchKeyModel.region.id;
            if ($scope.cPRSearchKeyModel.branch != null)
                $scope.cPRSearchKeyModel.branchId = $scope.cPRSearchKeyModel.branch.id;
            if ($scope.cPRSearchKeyModel.business != null)
                $scope.cPRSearchKeyModel.customerSegmentId = $scope.cPRSearchKeyModel.business.id; //Id not encrypted
            if ($scope.cPRSearchKeyModel.legalform != null)
                $scope.cPRSearchKeyModel.legalFormId = $scope.cPRSearchKeyModel.legalform.id;//Legalform Id not encrypted

            if ($scope.cPRSearchKeyModel.division != null)
                $scope.cPRSearchKeyModel.divisionId = $scope.cPRSearchKeyModel.division.id;
            if ($scope.cPRSearchKeyModel.status != null)
                $scope.cPRSearchKeyModel.requestStatus = $scope.cPRSearchKeyModel.status.name;
            var userData = $scope.cPRSearchKeyModel;
            common.preprocessload();
            $http({
                url: "/Report/GetCPRDisbursementDataViewByCPRSearchKey",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: JSON.stringify({ searchKeyModel: $scope.cPRSearchKeyModel })

            }).then(function successCallback(response) {
                common.preprocesshide();
                if (response.data.success) {
                    // $scope.cprCustomerSegmentReportStatus = response.data.output;
                    $scope.cprDisbursementReportlist = response.data.output;
                    $scope.requestCount.totalCount = $scope.cprDisbursementReportlist.length;
                    $scope.requestCount.ApprovedCount = ($filter('filter')($scope.cprDisbursementReportlist, { requestStatus: "Approved" }, true)).length;
                    $scope.requestCount.RejectCount = ($filter('filter')($scope.cprDisbursementReportlist, { requestStatus: "Reject" }, true)).length;
                    $scope.requestCount.InProgressCount = ($filter('filter')($scope.cprDisbursementReportlist, { requestStatus: "In Progress" }, true)).length;
                    $scope.requestCount.DraftCount = ($filter('filter')($scope.cprDisbursementReportlist, { requestStatus: "Draft" }, true)).length;

                    common.preprocesshide();
                    //console.log($scope.test);
                }
                else {
                    alert("Something went wrong");
                    common.preprocesshide();
                }

            }),
                function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;

                };


        }
        catch (ex) {
            alert("Exception in GetLegalFormByCustomerSegment_ClickEvent " + ex);
        }
    };
    $scope.GetCPRDetailSearchClearForm_ClickEvent = function () {
        $scope.cPRSearchKeyModel = null
    }
}]));