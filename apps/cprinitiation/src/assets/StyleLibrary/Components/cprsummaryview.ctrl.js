(app.controller("CPRSummaryViewCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {
    $scope.isHODOUser = false;
    $scope.BranchTitleDisplay = common.BranchTitleDisplay;
    $scope.cprSummary = null;
    $scope.cprBeyondSummary = null;
    $scope.cprOfficeSummary = null;
    $scope.cprCurrentUserBranchSummary = null;
    $scope.searchTerm = {
        draft: null,
        pending: null,
        rejected: null,
        completed: null,
        customer: null,
        cprStatusReportDetail:null
    };

    $scope.cPRDetailsList = [];
    $scope.CPRStatusReportViewModel = {
        branchList: [],
        regionList: [],
        rangeList: [],
        levelName: null,
        cPRModelList: []
    };
    $scope.CPRCustmerSegmentLegalFormReportViewModel = {
        branchList: [],
        regionList: [],
        rangeList: [],
        levelName: null,
        cPRModelList: []
    };
    $scope.CPRStatusReport = {
        range: null,
        region: null,
        branch: null,
        status: {
            name: null
        },
        //startDate: new Date(),
        //endDate: new Date()
        startDate: null,
        endDate: null
    };

    $scope.CPRStatusReportByCustomerSegment = {
        range: null,
        region: null,
        branch: null,

        status: {
            name: null
        },
        //startDate: new Date(),
        //endDate: new Date()
        startDate: null,
        endDate: null,
        business: null,
        legalform:null
    };

    $scope.statusList = [
        { name: "All" },
        { name: "Pending" },
        { name: "Rejected" },
        { name: "Approved" }
    ];
    $scope.listCustomer = [];

    $scope.listCustomerSegment = [];

    $scope.listLegalForms = [];
    $scope.listBranch = [];
    $scope.listRegion = [];
    $scope.listRange = [];
    $scope.formatIndex = 1;
    $scope.formatIndexOffice = 1;
    $scope.formatNavIndex = 50;   
    //$scope.formatNavIndex = 52;
    //$scope.formatNavIndex = 51;
    //$scope.formatNavIndex = null;
    $scope.formatIndexofBeyondBranch = 1;
    $scope.changeRequestRedirectUrl = "/CPR/Initiation?cprno=@cprno&SPHostUrl=";
    $scope.RequestCount = {};
    function GetAllCPRDetails() {
        try {
            $http({
                url: "/CPR/GetAllCPRDetails",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprSummary = response.data.output;
                    $scope.cprSummaryFiltered = response.data.output;
                    console.log(response.data.output);
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetails: " + e);
            common.LoderHide();
        }
    }
    function IsHODOUser() {
        try {
            $http({
                url: "/CPRSanction/IsHODOUser",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data != null) {
                    $scope.isHODOUser = response.data;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });
        }
        catch (e) {
            alert("Exception GetBranchById: " + e);
        }
    }
    function GetAllCPRforBeyondBranch() {
        try {
            $http({
                url: "/CPR/GetAllCPRforBeyondBranch",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprBeyondSummary = response.data.output;
                    $scope.cprBeyondSummaryFiltered = response.data.output;
                    console.log(response.data.output);
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRforBeyondBranch: " + e);
            common.LoderHide();
        }
    }
    function GetAllCPRDetailsByUser() {
        try {
            $http({
                url: "/CPR/GetAllCPRDetailsByUser",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprSummary = response.data.output;
                    $scope.cprSummaryFiltered = response.data.output;
                    console.log(response.data.output);
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }
    function GetAllCPRDetailByCurrentUserBranch() {
        try {
            $http({
                url: "/CPR/GetAllCPRDetailByCurrentUserBranch",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {

                    $scope.cprCurrentUserBranchSummary = response.data.output;
                    $scope.cprSummaryFiltered = response.data.output;
                    console.log(response.data.output);
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByCurrentUserBranch: " + e);
            common.LoderHide();
        }
    }
    function GetAllCPRDetailsByBranch() {
        try {
            $http({
                url: "/CPR/GetAllCPRDetailsByBranch",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprOfficeSummary = response.data.output;
                    $scope.cprSummaryFiltered = response.data.output;
                    console.log(response.data.output);
                    common.pageloadhide();
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRDetailByUser: " + e);
            common.LoderHide();
        }
    }
    $scope.removeRow = function (item) {
        if (confirm("Are you sure to delete?")) {
            try {
                $http({
                    url: "/CPR/DeleteCPRById",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { id: item.id }
                }).then(function successCallback(response) {

                    if (response.data.success) {
                        var index = $scope.cprSummary.listCPRDraftDetails.indexOf(item);
                        $scope.cprSummary.listCPRDraftDetails.splice(index, 1);
                    }
                }),
                    function errorCallback(response) {
                        $scope.error = response;
                    };
            }
            catch (e) {
                alert("Exception removeRow: " + e);
            }
        }
       
    };

    $scope.ChangeNavigation_ClickEvent = function (index) {
        try {
            $scope.formatIndex = index;
        } catch (e) {
            alert("ChangeNavigation_ClickEvent Listview" + e);
        }
    };
    $scope.ChangeNavigationOffice_ClickEvent = function (index) {
        try {
            $scope.formatIndexOffice = index;
        } catch (e) {
            alert("ChangeNavigationOffice_ClickEvent Listview" + e);
        }
    };
    $scope.ChangeNavigationBeyond_ClickEvent = function (index) {
        try {
            $scope.formatIndexofBeyondBranch = index;
        } catch (e) {
            alert("ChangeNavigationBeyond_ClickEvent Listview" + e);
        }
    };
    
    $scope.ChangeNav_ClickEvent = function (index) {
        try {
            $scope.formatIndex = 1;
            $scope.formatIndexOffice = 1;
            $scope.formatIndexofBeyondBranch = 1;
            $scope.formatNavIndex = index;
        } catch (e) {
            alert("ChangeNav_ClickEvent Listview" + e);
        }
    };


    function GetBranchesForReport() {
        try {
            $http({
                url: "/CPR/GetBranchesForReport",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.CPRStatusReportViewModel = response.data.output;
                    //$scope.CPRStatusReportViewModel.branchList = $scope.CPRStatusReportViewModel.branchList;
                    //$scope.test = $scope.CPRStatusReportViewModel;

                    $scope.CPRCustmerSegmentLegalFormReportViewModel = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetBranchesForReport: " + e);
            common.LoderHide();
        }
    }

    $scope.GetRegion_ChangeEvent = function () {
        try {
            GetRegionByRangeId();
        }
        catch (ex) {
            alert();
        }
    };

    function GetRegionByRangeId() {
        try {
            $http({
                url: "/CPR/GetRegionListByRangeId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { rangeId: $scope.CPRStatusReport.range.idInLong }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.CPRStatusReportViewModel.regionList = response.data.output;
                    if (response.data.message === "" || response.data.message === null) {
                        return true;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                    //GetBranchesForReport();
                }
            }),
                function errorCallback(response) {
                    $scope.error = response;
                }
        }
        catch (e) {
            alert("Exception removeRow: " + e);
        }
    };

    $scope.GetRegionForCustomerSegmentLegalForm_ChangeEvent = function () {
        try {
            GetRegionByRangeIdCustomerSegmentLegalForm();
        }
        catch (ex) {
            alert();
        }
    };

    function GetRegionByRangeIdCustomerSegmentLegalForm() {
        try {
            $http({
               // url: "/CPR/GetRegionListByRangeId",
                url: "/CPR/GetRegionListByDecrptedRangeId",                
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
               // data: { rangeId: $scope.CPRStatusReportByCustomerSegment.range.idInLong }
                 data: { rangeId: $scope.CPRStatusReportByCustomerSegment.range.id }
            }).then(function successCallback(response) {
                if (response.data.success) {
                   // $scope.CPRCustmerSegmentLegalFormReportViewModel.regionList = response.data.output;
                    $scope.regionList = response.data.output;
                    if (response.data.message === "" || response.data.message === null) {
                        return true;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                    //GetBranchesForReport();
                }
            }),
                function errorCallback(response) {
                    $scope.error = response;
                }
        }
        catch (e) {
            alert("Exception removeRow: " + e);
        }
    };

    $scope.GetBranchByRegionId_ChangeEvent = function () {
        try {
            GetBranchByRegionId();
        }
        catch (ex) {
            alert("Exceptipion in GetBranchByRegionId_ChangeEvent" + ex);
        }
    };

    function GetBranchByRegionId() {
        try {
            $http({
                url: "/CPR/GetBranchListByRegionId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { regionId: $scope.CPRStatusReport.region.idInLong }
            }).then(function successCallback(response) {

                if (response.data.success) {
                    $scope.CPRStatusReportViewModel.branchList = response.data.output;
                    if (response.data.message === "" || response.data.message === null) {
                        return true;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                }
            }),
                function errorCallback(response) {
                    $scope.error = response;
                };
        }
        catch (e) {
            alert("Exception removeRow: " + e);
        }
    };

    $scope.GetBranchByRegionIdCustomerSegmentLegalForm_ChangeEvent = function () {
        try {
            GetBranchByRegionIdForCustomerSegmentLegalForm();
        }
        catch (ex) {
            alert("Exceptipion in GetBranchByRegionId_ChangeEvent" + ex);
        }
    };

    function GetBranchByRegionIdForCustomerSegmentLegalForm() {
        try {
            $http({
               //url: "/CPR/GetBranchListByRegionId",
                url: "/CPR/GetBranchListByDecryptedRegionId",                
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { regionId: $scope.CPRStatusReportByCustomerSegment.region.idInLong }
            }).then(function successCallback(response) {

                if (response.data.success) {
                   // $scope.CPRCustmerSegmentLegalFormReportViewModel.branchList = response.data.output;
                    $scope.branchList = response.data.output;
                    if (response.data.message === "" || response.data.message === null) {
                        return true;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }
                }
            }),
                function errorCallback(response) {
                    $scope.error = response;
                };
        }
        catch (e) {
            alert("Exception removeRow: " + e);
        }
    };

    $scope.GetCPRByBranchId_ChangeEvent = function (branch) {
        try {
            GetCPRByBranchId(branch.idInLong);
        }
        catch (ex) {
            alert("Exception in GetCPRByBranchId_ChangeEvent " + ex);
        }
    };

    function ValidationForSearch() {
        if ($scope.CPRStatusReportViewModel.levelName === "CEO") {
            if ($scope.CPRStatusReport.range === null) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Range!");
                return false;
            }
            else if ($scope.CPRStatusReport.region === null) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Region!");
                return false;
            }
            else if ($scope.CPRStatusReport.branch === null || $scope.CPRStatusReport.branch.name === undefined) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Branch!");
                return false;
            }
            else
                return true;
        }
        else if ($scope.CPRStatusReportViewModel.levelName === "DGM") {

            if ($scope.CPRStatusReport.region === null) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Region!");
                return false;
            }
            else if ($scope.CPRStatusReport.branch === null || $scope.CPRStatusReport.branch.name === undefined) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Branch!");
                return false;
            }
            else
                return true;
        }
        else if ($scope.CPRStatusReportViewModel.levelName === "RMG") {

            if ($scope.CPRStatusReport.branch === null || $scope.CPRStatusReport.branch.name === undefined) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Branch!");
                return false;
            }
            else
                return true;
        }
        else
            return true;
    }

    function ValidationForCPRCustomerSegmentReport() {
       // if ($scope.CPRStatusReportViewModel.levelName === "CEO") {
         if ($scope.CPRStatusReportByCustomerSegment.startDate === null) {
            dialogService.ConfirmDialogWithOkay('', "Please enter the Start Date!");
            return false;
        }
        else if ($scope.CPRStatusReportByCustomerSegment.endDate === null) {
            dialogService.ConfirmDialogWithOkay('', "Please enter the End Date!");
            return false;
        }
        else if ($scope.CPRStatusReportByCustomerSegment.range === null) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Range!");
                return false;
            }
        else if ($scope.CPRStatusReportByCustomerSegment.region === null) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Region!");
                return false;
            }
        else if ($scope.CPRStatusReportByCustomerSegment.branch === null || $scope.CPRStatusReportByCustomerSegment.branch.name === undefined) {
                dialogService.ConfirmDialogWithOkay('', "Please enter the Branch!");
                return false;
        }
         else if ($scope.CPRStatusReportByCustomerSegment.status === null ) {
             dialogService.ConfirmDialogWithOkay('', "Please enter the Branch!");
             return false;
         }
      
        else if ($scope.CPRStatusReportByCustomerSegment.business === null || $scope.CPRStatusReportByCustomerSegment.business.name === undefined) {
            dialogService.ConfirmDialogWithOkay('', "Please enter the Customer Type!");
            return false;
        }

            else
                return true;
     
    }

    $scope.Search_ClickEvent = function () {
        try {
            if (ValidationForSearch()) {
                GetCPRByBranchIdAndDate();
            }
        }
        catch (ex) {
            alert("Exception in Search_ClickEvent " + ex);
        }
    };

    $scope.SearchCustomerSegment_ClickEvent = function () {
        try {
            //if (ValidationForSearch()) {
                GetCPRByBranchIdDateAndCustomerSegment();
          //  }
        }
        catch (ex) {
            alert("Exception in Search_ClickEvent " + ex);
        }
    };
  

    $scope.GetLegalFormByCustomerSegment_ClickEvent = function (business) {
        try {
            //if (ValidationForSearch()) {
            GetLegalFormsByBusinesses(business);
            //  }
        }
        catch (ex) {
            alert("Exception in GetLegalFormByCustomerSegment_ClickEvent " + ex);
        }
    };

    $scope.GetCPRDetailCustomerSegmentLegalForm_ClickEvent = function (business) {
        try {
            if (ValidationForCPRCustomerSegmentReport()) {
            GetAllCPRDetailByBranchDateCustomerSegmentLegalForm(business);
              }
        }
        catch (ex) {
            alert("Exception in GetLegalFormByCustomerSegment_ClickEvent " + ex);
        }
    };

    //function GetCPRByBranchId() {
    function GetCPRByBranchId(idInLong) {  
        try {
            $http({
                url: "/CPR/GetCPRListByBranchId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: { branchId: $scope.CPRStatusReport.branch.idInLong }
                data: { branchId: idInLong }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.test = response.data.output;
                    $scope.cprCustomerSegmentReportStatus = response.data.output;
                    //console.log($scope.test);
                }
            }),
                function errorCallback(response) {
                    $scope.error = response;
                }
        }
        catch (e) {
            alert("Exception GetCPRByBranchId: " + e);
        };
    }

    function GetCPRByBranchIdAndDate() {
        try {
            if ($scope.CPRStatusReport.branch === null) {
                $scope.CPRStatusReport.branch = {
                    idInLong: 0
                };
            }
            common.preprocessload();
            $http({
                url: "/CPR/GetCPRByBranchIdAndDate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { branchId: $scope.CPRStatusReport.branch.idInLong, startDate: $scope.CPRStatusReport.startDate, endDate: $scope.CPRStatusReport.endDate, status: $scope.CPRStatusReport.status.name }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.test = response.data.output;
                    common.preprocesshide();
                    //console.log($scope.test);
                }
            }),
                function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;

                };
        }
        catch (e) {
            alert("Exception GetCPRByBranchId: " + e);
            common.preprocesshide();
        }
    };

    function GetCPRByBranchIdDateAndCustomerSegment() {
        try {
            if ($scope.CPRStatusReportByCustomerSegment.branch === null) {
                $scope.CPRStatusReportByCustomerSegment.branch = {
                    idInLong: 0
                };
            }
            //
            if ($scope.CPRStatusReportByCustomerSegment.legalform === null) {
                $scope.CPRStatusReportByCustomerSegment.legalform = {
                    id: 0
                };
            }

            common.preprocessload();
            $http({
                url: "/CPR/GetCPRByBranchIdDateAndCustomerSegment",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
               // data: { branchId: $scope.CPRStatusReportByCustomerSegment.branch.idInLong, startDate: $scope.CPRStatusReportByCustomerSegment.startDate, endDate: $scope.CPRStatusReportByCustomerSegment.endDate, status: $scope.CPRStatusReportByCustomerSegment.status.name, customerSegmentId: $scope.CPRStatusReportByCustomerSegment.business.id }
                data: { branchId: $scope.CPRStatusReportByCustomerSegment.branch.idInLong, startDate: $scope.CPRStatusReportByCustomerSegment.startDate, endDate: $scope.CPRStatusReportByCustomerSegment.endDate, status: $scope.CPRStatusReportByCustomerSegment.status.name, customerSegmentId: $scope.CPRStatusReportByCustomerSegment.business.id, legalFormId: $scope.CPRStatusReportByCustomerSegment.legalform.id }

            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprCustomerSegmentReportStatus = response.data.output;
                    common.preprocesshide();
                    //console.log($scope.test);
                }
            }),
                function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;

                };
        }
        catch (e) {
            alert("Exception GetCPRByBranchIdDateAndCustomerSegment: " + e);
            common.preprocesshide();
        }
    };


    function GetAllCPRDetailByBranchDateCustomerSegmentLegalForm() {
        try {
            if ($scope.CPRStatusReportByCustomerSegment.branch === null) {
                $scope.CPRStatusReportByCustomerSegment.branch = {
                    idInLong: 0
                };
            }
            //
            if ($scope.CPRStatusReportByCustomerSegment.legalform === null) {
                $scope.CPRStatusReportByCustomerSegment.legalform = {
                    option: null
                };

            }
            if ($scope.CPRStatusReportByCustomerSegment.business === null) {
                $scope.CPRStatusReportByCustomerSegment.business = {
                    id: 0
                };
            } 

            common.preprocessload();
            $http({
                url: "/CPR/GetAllCPRDetailByBranchDateCustomerSegmentLegalForm",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                // data: { branchId: $scope.CPRStatusReportByCustomerSegment.branch.idInLong, startDate: $scope.CPRStatusReportByCustomerSegment.startDate, endDate: $scope.CPRStatusReportByCustomerSegment.endDate, status: $scope.CPRStatusReportByCustomerSegment.status.name, customerSegmentId: $scope.CPRStatusReportByCustomerSegment.business.id }
                data: { branch: $scope.CPRStatusReportByCustomerSegment.branch.name, startDate: $scope.CPRStatusReportByCustomerSegment.startDate, endDate: $scope.CPRStatusReportByCustomerSegment.endDate, status: $scope.CPRStatusReportByCustomerSegment.status.name, customerSegment: $scope.CPRStatusReportByCustomerSegment.business.name, legalForm: $scope.CPRStatusReportByCustomerSegment.legalform.option }

            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprCustomerSegmentReportStatus = response.data.output;
                    $scope.cprDetailCustomerSegmentReportStatus = response.data.output;

                    $scope.RequestCount.ApprovedCount = ($filter('filter')($scope.cprDetailCustomerSegmentReportStatus.listCPRDetails, { requestStatus: "Completed" }, true)).length;
                    $scope.RequestCount.RejectCount = ($filter('filter')($scope.cprDetailCustomerSegmentReportStatus.listCPRDetails, { requestStatus: "Reject" }, true)).length;
                    $scope.RequestCount.InProgressCount = ($filter('filter')($scope.cprDetailCustomerSegmentReportStatus.listCPRDetails, { requestStatus: "In Progress" }, true)).length;
                    $scope.RequestCount.DraftCount = ($filter('filter')($scope.cprDetailCustomerSegmentReportStatus.listCPRDetails, { requestStatus: "Draft" }, true)).length;


                    common.preprocesshide();
                    //console.log($scope.test);
                }
            }),
                function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;

                };
        }
        catch (e) {
            alert("Exception GetCPRByBranchIdDateAndCustomerSegment: " + e);
            common.preprocesshide();
        }
    };

    
    function GetAllCustomers() {
        try {
            $http({
                url: "/Master/GetCustomers",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCustomer = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomers: " + e);
        }
    };

    function GetAllCustomerSegment() {
        try {
            $http({
                url: "/Master/GetAllCustomerSegment",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCustomerSegment = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomers: " + e);
        }
    };

    function GetLegalFormsByBusinesses(businesse) {
        try {
            $http({
                url: "/CPR/GetLegalFormsByBusinesses",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    business: businesse
                })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listLegalForms = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetLegalFormsByBusinesses " + e);
        }
    }

    //Admin Report
    function GetAllRegion() {

        try {
            $http({
                url: "/Master/GetAllRegion",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listRegion = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRegion: " + e);
        }
    };
    function GetBranch() {
        try {
            $http({
                url: "/CPR/GetBranch",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listBranch = response.data.output;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBranch: " + e);
        }
    }
    function GetAllRange() {
        try {
            $http({
                url: "/CPR/GetAllRange",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },

                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listRange = response.data.output;
                }

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBranch: " + e);
        }
    }
    function Page_Load() {
        try {
            common.pageloadhide();
            //GetAllCPRDetails();
            //GetRegionByRangeId();
            GetAllCPRDetailsByUser();
            GetAllCPRDetailByCurrentUserBranch();
            IsHODOUser();
            GetAllCPRforBeyondBranch();
            GetAllCPRDetailsByBranch();
            GetBranchesForReport();
            GetAllCustomers();
            //Admin CPR Status Report
            GetAllCustomerSegment();
            GetAllRegion();
            GetAllRange();
            GetBranch();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }

  

    $scope.checkUrl = function (request) {
        var cprId = request.id;
        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
        if (spHostUrl != null) {
            $scope.changeRequestRedirectUrl += spHostUrl;
        }
        window.location.href = $scope.changeRequestRedirectUrl.replace("@cprno", cprId);
    };

    Page_Load();
}));