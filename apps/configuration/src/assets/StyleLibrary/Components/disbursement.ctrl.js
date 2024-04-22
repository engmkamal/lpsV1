(app.controller("DisbursementCtrl", function ($scope, $http, $filter) {
   
    $scope.currentUser = {};
    var requestPreCode = "DIS-";
    $scope.dusbursementCPRDetail = {
        id: 0,
        requestCode:'',
        requestDate: $filter('date')(new Date(), 'MM-dd-yyyy'),
        requesterId: 0,
        requesterName:'',
        requesterEmail:'',
        requesterAccount: '',
        requesterDesignation: '',
        requesterBranchId: '',
        requesterEmployeeId: '',
        cPRNo: '',
        cPRId: '',
        proposal: '',
        borrowerName: '',
        borrowerTypeId: '',
        primaryCIF: '',
        cPRSanctionNo: '',
        lDRatio: '',
        loanGrowth: '',
        nPL: '',
        profitOrLoss:'',
        limit: '',
        outstanding: '',
        overdue: '',
        cLStatus: '',
        forceSaleValueOfCollateral: '',
        cIBStatus: '',
        iCRRSStatus: '',
        alliedConcernStatus: '',
        branchUnconditionalRecommendation:'',
        active: true,
    };

    //$scope.disbursmentRequestMapper = {
    //    $scope.disbursementCPRDetail
    //}

    /// .................. Variables


    /// .................. Funtions
    $scope.Page_Load = function () {
        try {
            GetCurrentUser();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };
    function SyncDisbursement() {
        try {
            $http({
                url: "/Disbursement/SyncDisbursement",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRModel: $scope.cprinit })
            }).then(function successCallback(response) {

                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._draftcprmessage).then(function () {
                        var cprId = GetUrlParameters();
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    });
                }
                else {
                    common.preprocesshide();
                    $scope.trigedSubmit = false;
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }

            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SyncDisbursement " + e);
        }
    };

    function GetCurrentUser() {
        try {
            $http({
                url: "/PeoplePicker/GetCurrentUser",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.currentUser = response.data.output;
                   
                    
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetBorrowerProfileTypes " + e);
        }
    }

    $scope.GetApprovalInfo = function () {

        try {
            common.preprocessload();
            $http({
                url: "/CPRSanction/GetApprvalDetailsByCprNo",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprno: $scope.cprno })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.approvalDetails = response.data.output;
                    $scope.dusbursementCPRDetail.borrowerName = $scope.approvalDetails[0].borrowerName;
                    $scope.dusbursementCPRDetail.primaryCIF = $scope.approvalDetails[0].primaryCIF;
                    $scope.dusbursementCPRDetail.role = $scope.approvalDetails[0].role;
                    $scope.proposalDate = $scope.approvalDetails[0].proposalDate;
                    $scope.businessAddress = $scope.approvalDetails[0].address;
                    //$scope.SanctionRequest.requestCode = 'Completed';
                    $scope.dusbursementCPRDetail.requester = $scope.currentApprovalUser.userId;
                    $scope.dusbursementCPRDetail.requesterName = $scope.currentApprovalUser.displayName;
                    $scope.dusbursementCPRDetail.requesterDesignation = $scope.currentApprovalUser.designation;
                    $scope.dusbursementCPRDetail.requesterAccount = $scope.currentApprovalUser.accountName;
                    $scope.dusbursementCPRDetail.requesterEmail = $scope.currentApprovalUser.email;
                    $scope.dusbursementCPRDetail.requesterBranchId = $scope.approvalDetails[0].branchId;
                    $scope.dusbursementCPRDetail.requesterBranch = $scope.approvalDetails[0].branchName;
                    $scope.dusbursementCPRDetail.requesterEmployeeId = $scope.currentApprovalUser.userId;
                    $scope.dusbursementCPRDetail.cprno = $scope.approvalDetails[0].cPRNo;
                    $scope.dusbursementCPRDetail.cprId = $scope.approvalDetails[0].cprId;
                    $scope.dusbursementCPRDetail.cprProposalDate = $scope.approvalDetails[0].proposalDate;
       
                    $scope.dusbursementCPRDetail.deligatedInitiator = $scope.approvalDetails[0].deligatedInitiator;
             
                    
                    $scope.dusbursementCPRDetail.tenorYears = $scope.approvalDetails[0].tenorYears;
                    $scope.dusbursementCPRDetail.tenorMonths = $scope.approvalDetails[0].tenorMonths;

                } else {
                    dialogService.ConfirmDialogWithOkay('', "Existing path not found. Please check.");
                }
                common.preprocesshide();
            }, function errorCallback(response) {
                $scope.error = response;
            });


        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };
    $scope.SearchCPRBySanctionNo = function (sanctionNo) {
        alert("heu");
        $http({
            url: "/Disbursement/SearchCPRBySanctionNo",
            method: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            },
            data: JSON.stringify({ sanctionNo: sanctionNo })
        }).then(function successCallback(response) {

            if (response.data.success) {
                $scope.dusbursementCPRDetail.cPRNo = $scope.currentUser.accountName;
                $scope.dusbursementCPRDetail.cPRId = $scope.currentUser.accountName;
               
                common.preprocesshide();
                //dialogService.ConfirmDialogWithOkay('', global._draftcprmessage).then(function () {
                //    var cprId = GetUrlParameters();
                //    window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                //});
            }
            else {
                common.preprocesshide();
                //$scope.trigedSubmit = false;
                //dialogService.ConfirmDialogWithOkay('', response.data.message);
            }

        }, function errorCallback(response) {
            common.preprocesshide();
            $scope.error = response;
        });

    }
    ///.................. Events
    $scope.SyncDisbursement_ClickEvent = function () {
        try {
            SyncDisbursement();
            common.preprocesshide();
        } catch (e) {
            alert("Exception SyncDisbursement_ClickEvent " + e);
        }
    };

    $scope.SubmitDisbursement_ClickEvent = function () {
        try {
            NewRequest();
        } catch (e) {
            alert('SubmitSanctionApproval_ClickEvent ' + e);
        }
    }

    function NewRequest() {
        try {
            if (ValidateForm()) {
                $scope.dusbursementCPRDetail.requesterAccount = $scope.currentUser.accountName;
                $scope.dusbursementCPRDetail.requesterName = $scope.currentUser.displayName;
                $scope.dusbursementCPRDetail.requesterId = $scope.currentUser.userId;
                $scope.dusbursementCPRDetail.requesterEmail = $scope.currentUser.email;
                $scope.dusbursementCPRDetail.requesterDesignation = $scope.currentUser.designation;

                var disbursementDetailMapper = {
                    'disbursementCPRDetail': $scope.dusbursementCPRDetail
                };
                $http({
                    url: "/Disbursement/NewRequestSave",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ disbursementDetailMapper: disbursementDetailMapper })
                }).then(function successCallback(response) {

                    if (response.data.success) {
                        common.preprocesshide();
                        //dialogService.ConfirmDialogWithOkay('', global._draftcprmessage).then(function () {
                        //    var cprId = GetUrlParameters();
                        //    window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                        //});
                    }
                    else {
                        common.preprocesshide();
                        //$scope.trigedSubmit = false;
                        //dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }

                }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;
                });
            }
        } catch (e) {
            alert("Exception SyncDisbursement " + e);
        }
    }

    function ValidateForm() {
      
        return true;
    };
    
    $scope.Page_Load();
}));