(app.controller("ApprovalWFCtrl", function ($scope, $http, $filter, dialogService) {
    /// .................. Variable
    var count = 0;
    $scope.IslistYearCountMax = false;
    $scope.totalMonth = 0;
    $scope.listMonthCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    $scope.listYearCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    $scope.wFlowModel = {
        dAApprovalModel: null,
        approvedList: null,
        roleApMappingStruct: null,
        isWFEnabled: null,
        isWFVisible: null,
        isByPass: null,
        approvalActivity: null,
        listDAApprovalQueueModel: null,
        pendingApprovalList: null,
        masterAprovalId: null,
        roleLevel: 0,
        isMarkattingOfficer: false,
        isReferOrClarifyUser: false,
        referClerifyUserList: null,
        listCPRComponentModel: null,
        listSpecialCommentDisplay: null,
    };

    $scope.approvalDetailsModel = {
        id: 0,
        role: null,
        roleid: null,
        user: null,
        userid: null,
        assigndate: null,
        completeddate: null,
        status: null,
        actiontaken: null,
        activityid: null,
        activity: null,
        comment: null,
        minapprovalcount: null,
        level: 0,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null
    };
    $scope.dAApprovalModel = {
        id: 0,
        approvalqueueid: 0,
        userid: 0,
        completeduserid: 0,
        assigndate: null,
        completeddate: null,
        designation: null,
        rolename: null,
        status: null,
        actiontaken: null,
        comment: null,
        bypass: false,
        active: false,
        editor: null,
        modified: null,
        author: null,
        created: null,
        documentRecordViewModels: null
    };

    $scope.cPRComponentsCommentModel = {
        id: 0,
        userid: 0,
        level: 0,
        component: null,
        cprid: 0,
        comment: null,
        active: false,
        editor: null,
        modified: null,
        author: null,
        created: null,
    };
    $scope.cPRComponentsCommentList = [];
    $scope.cPRSpecialConditionCommentModel = {
        id: 0,
        userid: 0,
        level: 0,
        cprid: 0,
        name: null,
        description: null,
        active: false,
        editor: null,
        modified: null,
        author: null,
        created: null,
    };
    $scope.cPRSpecialConditionCommentList = [];
    $scope.listSpecialCommentDisplay = [];

    $scope.listapprovalDetails = [];
    $scope.listactions = [];
    $scope.listRole = [];
    $scope.listAllRole = [];
    $scope.listSelectedRole = [];
    $scope.approvedList = [];
    $scope.listDAApprovalQueueModel = [];
    $scope.pendingApprovalList = [];
    $scope.listDisplayQueue = [];
    $scope.listDisplayQueueStructNew = [];
    $scope.listDisplayQueueStructOld = [];
    $scope.listDAApprovalQueue = [];
    $scope.listDAQueueMapping = [];
    $scope.roleUser = null;
    $scope.listReferClerifyUser = [];

    $scope.listCPRComponentModel = [];
    $scope.cPRComponent = null;

    $scope.isByPass = false;
    $scope.actiontaken = null;
    $scope.isWFVisible = false;
    $scope.isWFEnabled = false;
    $scope.isSaveDisabled = false;
    $scope.roleLevel = 0;
    $scope.isResubmit = false;
    $scope.isSelection = false;
    $scope.isMarkattingOfficer = false;
    $scope.isReferOrClarifyUser = false;
    $scope.lastlevelValidation = true;
    $scope.ngshowComComment = false;
    $scope.ngshowSpclComment = false;
    var cprRedirectUrl = "/CPR/Initiation?cprno=@cprno";
    var approverlist = [];
    $scope.isModalValue = false;
    $scope.isAreYouSure = false;

    $scope.defaultAction = null;
    $scope.facilityRecommendation = {
        id: 0,
        cPRId: null,
        facility: '',
        facilityNo: '',
        loanAmount: 0,
        tenorYears: 0,
        tenorMonths: 0,
        gracePeriod: null,
        installmentSize: 0,
        rateOfInterest: '',
        marginOrDownPayment: 0,
        commission: 0,
        repaymentMethod: null,
        role: '',
        action: ''
    }
    $scope.fileUpload = [];
    $scope.copyRole = '';
    var copyAction;
    //$scope.fileUpload = [];
    var richText = '';
    $scope.cprinit = {
        listCPRFacilities: [],
        listCPRFacilityRecommendation: []
    };
    $scope.listMonthCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    $scope.listYearCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    $scope.totalMonths = 0;
    $scope.finalInstallmentSize = null;

    /// ............... Function
    //Events

    $scope.Page_Load = function () {

        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
        if (spHostUrl != null) {
            cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
        }
        GetFacilityByCprId();
        GetFacilityRecommendationByCprId();
        $scope.CheckResubmitData();
        TotalTermMonthCalculation__Function();
        //GetAllDAActivity();
        if ($scope.listDisplayQueue.length == 0)
            GetApprovals();
    };

    $scope.DropdownTenourYearMonth_ChangeEvent = function () {
        TotalTermMonthCalculation__Function();
    };

    function TotalTermMonthCalculation__Function() {
        try {
            if ($scope.facilityRecommendation.termYears == $scope.listYearCount[$scope.listYearCount.length - 1])
                $scope.IslistYearCountMax = true;
            else
                $scope.IslistYearCountMax = false;
            $scope.totalMonths = ($scope.facilityRecommendation.tenorYears) * 12 + ($scope.facilityRecommendation.tenorMonths * 1);
            $scope.getInstallmentSize();
        } catch (e) {
            alert("Exception TotalTermMonthCalculation__Function" + e);
        }
    }

    $scope.commentModalClickEvent = function (comment) {
        try {
            clickCommentModalPopup(comment);



        } catch (e) {
            alert("commentModalClickEvent " + e);
        }
    };

    function clickCommentModalPopup(approval) {
        $scope.currentRole = approval.rolename;
        $scope.commentValue = approval.comment;
        var commentsModal = angular.element('#commentModal');
        commentsModal.modal('show');

    };

    //Methods
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

    function GetFacilityByCprId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPR/GetFacilityByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprinit.listCPRFacilities = response.data.output;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }

    function GetFacilityRecommendationByCprId() {
        try {
            var cPrId = GetUrlParameters();
            $http({
                url: "/CPR/GetFacilityRecommedationByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cprinit.listCPRFacilityRecommendation = response.data.output;

                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetMonthlyIncomeByCpId " + e);
        }
    }

    function TotalTermMonthCalculation__Function() {
        try {
            if ($scope.facilityRecommendation.tenorYears == $scope.listYearCount[$scope.listYearCount.length - 1])
                $scope.IslistYearCountMax = true;
            else
                $scope.IslistYearCountMax = false;
            $scope.totalMonth = ($scope.facilityRecommendation.tenorYears) * 12 + ($scope.facilityRecommendation.tenorMonths * 1);
            $scope.getInstallmentSize();
        } catch (e) {
            alert("Exception TotalTermMonthCalculation__Function" + e);
        }
    }

    $scope.getInstallmentSize = function () {
        var loanamt = parseFloat($scope.facilityRecommendation.loanAmount);
        var rate1 = $scope.facilityRecommendation.rateOfInterest;
        rate1 = (parseFloat(rate1) / 100) / 12;
        var rate = rate1 + 1;
        var totalMonth = $scope.totalMonth;
        var interestRate = Math.pow(rate, totalMonth);
        var E1 = loanamt * rate1 * interestRate;
        var E2 = interestRate - 1;
        var EMI = (E1 / E2);
        $scope.finalInstallmentSize = EMI.toFixed(2);

    }

    $scope.UploadDocument_ClickEvent = function () {
        try {
            var count = 0;
            var fileUploader = document.getElementById("FileUploader");
            if (fileUploader.files[0] == null)
                dialogService.ConfirmDialogWithOkay('', "PLEASE ENTER A FILE TO BE UPLOAD!");

            else
                UploadDocument();



        } catch (e) {
            alert("UploadDocument_ClickEvent " + e);
        }
    };

    function UploadDocument() {
        try {
            common.preprocessload();
            var docNic = "";
            var facilityType = "";
            var documentType = "";
            var formdata = new FormData();

            var fileUploader = document.getElementById("FileUploader");
            formdata.append(documentType, fileUploader.files[0]);
            formdata.append("documentType", documentType);

            formdata.append("cprid", $scope.cprinit.id);
            formdata.append("cprno", $scope.cprinit.cprno);
            formdata.append("cif", $scope.cprinit.cif);
            if ($scope.cprinit.listBorrowerProfiles != null) {
                if ($scope.cprinit.listBorrowerProfiles.individual != null) {
                    if ($scope.cprinit.listBorrowerProfiles.individual.nic != null)
                        cribNic = $scope.cprinit.listBorrowerProfiles[0].individual.nic;
                }
            }
            if ($scope.cprinit.listCPRFacilities != null) {
                if ($scope.cprinit.listCPRFacilities.facilitytype != null)
                    facilityType = $scope.cprinit.listCPRFacilities[0].facilitytype;
            }
            if ($scope.cprinit.branch != null)
                formdata.append("branch", $scope.cprinit.branch.name);

            formdata.append("nic", docNic);
            formdata.append("facilitytype", facilityType);
            var request = {
                method: 'POST',
                url: "/CPR/UploadFile",
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();

                    $scope.fileUpload.push(response.data.output);
                    $scope.dAApprovalModel.documentRecordViewModels = $scope.fileUpload;
                    dialogService.ConfirmDialogWithOkay('', global._fileUpload).then(function successCallback(response) {
                        fileUploader = '';

                    }, function errorCallback(response) {
                        fileUploader = '';
                        common.preprocesshide();
                    });
                }

            }, function errorCallback(response) {
                fileUploader = '';
                $scope.error = response;
            });

        } catch (e) {
            alert("UploadDocument " + e);
        }
    }

    //$scope.RemoveItemFromGridList = function (list, item) {
    //    try {
    //        if (list != null && item != null) {
    //            if (item.id == null || item.id == "" || item.id == '')
    //                common.RemoveItemFromList(list, item, true);
    //            else {
    //                common.SetActiveFalseForRemovedItem(list, item);

    //            }


    //        }
    //    } catch (e) {
    //        alert("Exception RemoveItemFromGridList" + e);
    //    }
    //};

    $scope.RemoveItemFromGridList = function (item) {
        try {
            $scope.fileUpload.splice(item, 1);
            $scope.dAApprovalModel.documentRecordViewModels.splice(item, 1);

        } catch (e) {
            alert("Exception RemoveItemFromGridList" + e);
        }
    };

    $scope.ChangeValueOnSelect = function (item) {
        try {
            if (item != null)
                MappingData(item);
        } catch (e) {
            alert("Exception ChangeValueOnSelect " + e);
        }
    };
    function MappingData(item) {
        if ($scope.dAApprovalModel.actiontaken != '') {
            try {
                $scope.facilityRecommendation = {
                    //id: item.facility.id,
                    cPRId: item.facility.cPRId,
                    facility: item.facility.facility,
                    facilityNo: item.facility.facilityNo,
                    loanAmount: item.facility.loanAmount,
                    tenorYears: item.facility.tenorYears,
                    tenorMonths: item.facility.tenorMonths,
                    gracePeriod: item.facility.gracePeriod,
                    installmentSize: item.facility.installmentSize,
                    rateOfInterest: item.facility.rateOfInterest,
                    marginOrDownPayment: item.facility.marginOrDownPayment,
                    commission: item.facility.commission,
                    repaymentMethod: item.facility.repaymentMethod,
                    role: $scope.copyRole,
                    action: $scope.defaultAction
                };
                TotalTermMonthCalculation__Function();
            } catch (e) {
                alert("Exception MappingData" + e);
            }
        } else {
            dialogService.ConfirmDialogWithOkay('', "Please select action first");
        }

    };
    $scope.SubmitFacilityRecommendation_ClickEvent = function () {
        try {
            SaveFacilityRecommedation();
        } catch (e) {
            alert("Exception SubmitFacilityRecommendation_ClickEvent " + e);
        }
    };
    function SaveFacilityRecommedation() {
        try {
            common.preprocessload();
            $http({
                url: "/CPR/SaveFacilityRecommedation",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ facilityRecommendationViewModel: $scope.facilityRecommendation })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();

                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        $scope.facilityRecommendation = {
                            id: 0,
                            cPRId: null,
                            facility: '',
                            facilityNo: '',
                            loanAmount: 0,
                            tenorYears: 0,
                            tenorMonths: 0,
                            gracePeriod: null,
                            installmentSize: 0,
                            rateOfInterest: '',
                            marginOrDownPayment: 0,
                            commission: 0,
                            repaymentMethod: null,
                            role: '',
                            action: ''
                        }
                        GetFacilityRecommendationByCprId();

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveFacilityRecommedation " + e);
        }
    }

    $scope.EditFacilityRecommedation = function EditFacilityRecommedation(facRecommendation) {
        $scope.facilityRecommendation = {
            id: facRecommendation.id,
            cPRId: facRecommendation.cPRId,
            facilityNo: facRecommendation.facilityNo,
            loanAmount: facRecommendation.loanAmount,
            tenorYears: facRecommendation.tenorYears,
            tenorMonths: facRecommendation.tenorMonths,
            gracePeriod: facRecommendation.gracePeriod,
            installmentSize: facRecommendation.installmentSize,
            rateOfInterest: facRecommendation.rateOfInterest,
            marginOrDownPayment: facRecommendation.marginOrDownPayment,
            commission: facRecommendation.commission,
            repaymentMethod: facRecommendation.repaymentMethod,
            role: facRecommendation.role,
            action: facRecommendation.action
        };

        $scope.cprinit.listCPRFacilityRecommendation.splice($scope.cprinit.listCPRFacilityRecommendation.indexOf(facRecommendation), 1);
        // GetFacilityRecommendationByCprId();  
    };

    function GetAllCPRDetailsByCIFWithReiniated(cifnumber) {
        try {
            $http({
                url: "/CPR/GetAllCPRByCIFWithReinitiated",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cifnumber: cifnumber }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listCPRInfo = response.data.output;
                    common.LoderHide();
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllCPRByCIF: " + e);
            common.LoderHide();
        }
    }

    function GetApprovals() {
        try {
            var cprId = GetUrlParameters();

            if (cprId != null) {
                $http({
                    url: "/Master/DAWorkFlow",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cpridString: cprId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.wFlowModel = response.data.output;

                        if ($scope.wFlowModel.dAApprovalModel != null) {

                            $scope.listactions = $scope.wFlowModel.approvalActivity;
                            if ($scope.listactions[0].name != 'Approved') {
                                $scope.defaultAction = 'Recommend';
                            } else {
                                $scope.defaultAction = 'Approved';
                            }
                            $scope.dAApprovalModel = $scope.wFlowModel.dAApprovalModel;

                            $scope.listAllRole = $scope.wFlowModel.roleApMappingStruct;
                            $scope.isByPass = $scope.wFlowModel.isByPass;
                        }

                        //dashboard--------------------------------------------
                        $scope.borrowerdashboard = $scope.wFlowModel.cPRDetailsForDashboardModel;
                        common.initiator = $scope.borrowerdashboard.appraiser;
                        common.presentInitiator = $scope.borrowerdashboard.borrowerName;
                        //console.log($scope.borrowerdashboard);


                        //var CIFResultsModal = $filter('filter')($scope.wFlowModel.listDAApprovalQueueModel, { minapprovalcount: '1' }).length;
                        //if (CIFResultsModal==1) {
                        //    var cifModal = angular.element('#cIFResultsSearchModal');
                        //    cifModal.modal('show');
                        //    GetAllCPRDetailsByCIFWithReiniated($scope.borrowerdashboard.cif);
                        //}

                        $scope.isWFVisible = $scope.wFlowModel.isWFVisible;
                        $scope.isWFEnabled = $scope.wFlowModel.isWFEnabled;
                        $scope.approvedList = $scope.wFlowModel.approvedList;
                        $scope.listDAApprovalQueueModel = $scope.wFlowModel.listDAApprovalQueueModel;

                        approverlist = $scope.listDAApprovalQueueModel;
                        angular.forEach(approverlist, function (val) {
                            if (val.status == 'In Progress') {
                                $scope.copyRole = val.rolename;
                            }
                        });

                        $scope.pendingApprovalList = $scope.wFlowModel.pendingApprovalList;
                        $scope.roleLevel = $scope.wFlowModel.roleLevel;

                        $scope.isMarkattingOfficer = $scope.wFlowModel.isMarkattingOfficer;
                        $scope.isReferOrClarifyUser = $scope.wFlowModel.isReferOrClarifyUser;

                        if ($scope.wFlowModel.referClerifyUserList != null)
                            $scope.listReferClerifyUser = $scope.wFlowModel.referClerifyUserList;

                        $scope.listCPRComponentModel = $scope.wFlowModel.listCPRComponentModel;
                        if ($scope.wFlowModel.listSpecialCommentDisplay != null) {
                            $scope.listSpecialCommentDisplay = $scope.wFlowModel.listSpecialCommentDisplay;

                            //if ($filter("filter")($scope.listSpecialCommentDisplay.listSpecialCommentModel, { 'type': 'Componant' }).length > 0) { 
                            $scope.ngshowComComment = true;
                            //}
                            //if ($filter("filter")($scope.listSpecialCommentDisplay.listSpecialCommentModel, { 'type': 'SpecialCondition' }).length > 0) {
                            $scope.ngshowSpclComment = true;
                            //}
                        }
                        //Edit for Approval
                        try {
                            common.isWFEnabled = $scope.isWFEnabled;
                            common.isEditable = $scope.isWFEnabled;
                        } catch (e) {
                            console.log(e);
                        }

                        //--------------------------------------------
                        //////////////////////////////////
                        var securitydetailsarrayamount = [];
                        var securitydetailsarraytitle = [];
                        var toolTipContentlist = [];


                        for (var i = 0; i < $scope.borrowerdashboard.securitydetailschart.length; i++) {
                            var model = "";
                            if ($scope.borrowerdashboard.securitydetailschart[i].model != "None")
                                model = $scope.borrowerdashboard.securitydetailschart[i].model;
                            var vehicleno = "";
                            if ($scope.borrowerdashboard.securitydetailschart[i].vehicleno != "0000")
                                vehicleno = $scope.borrowerdashboard.securitydetailschart[i].make;

                            var titlelabel = $scope.borrowerdashboard.securitydetailschart[i].type + " " + model + " " + vehicleno
                            securitydetailsarraytitle.push(titlelabel);

                            var tooltiplabel = $scope.borrowerdashboard.securitydetailschart[i].type;
                            toolTipContentlist.push(tooltiplabel);
                            securitydetailsarrayamount.push($scope.borrowerdashboard.securitydetailschart[i].propotionvalue);
                        }
                        var datasecurity = {
                            labels: securitydetailsarraytitle,
                            datasets: [{
                                data: securitydetailsarrayamount,
                                fill: true,
                                backgroundColor: [
                                    '#0D3E5B',
                                    '#1E5373',
                                    '#4E7F9C',
                                    '#7FB8D9',
                                    '#B1D9EE'
                                ],
                                borderColor: [
                                    '#0D3E5B',
                                    '#1E5373',
                                    '#4E7F9C',
                                    '#7FB8D9',
                                    '#B1D9EE'
                                ]
                            }]
                        };
                        var optionssecurity = {
                            title: {
                                display: true,
                                text: 'Security Details',
                                position: 'top'
                            },
                            rotation: 1.7 * Math.PI,
                            circumference: 2 * Math.PI,
                            legend: {
                                position: 'right'
                            }
                        };

                        //var myChart = new Chart(ctxsecuritycanvas, {
                        //    type: 'pie',
                        //    data: datasecurity,
                        //    options: optionssecurity
                        //});

                        var securitydetailsChart = new Chart(ctxsecuritycanvas, {
                            type: 'pie',
                            data: datasecurity,
                            options: optionssecurity
                        });


                        var diductedmarks = 100 - parseFloat($scope.borrowerdashboard.sorecardchart.totalMark);
                        var datascore = {
                            labels: ["Grade " + $scope.borrowerdashboard.sorecardchart.grade + ' : ' + $scope.borrowerdashboard.sorecardchart.totalMark, "Remain"],
                            datasets: [{
                                data: [$scope.borrowerdashboard.sorecardchart.totalMark, diductedmarks],
                                fill: true,
                                backgroundColor: [
                                    '#96842f',
                                    '#c6b253',
                                    '#dcc971',
                                    '#ecdd95',
                                    '#f7edbd'
                                ],
                                borderColor: [
                                    '#96842f',
                                    '#c6b253',
                                    '#dcc971',
                                    '#ecdd95',
                                    '#f7edbd'
                                ]
                            }]
                        };
                        var optionsscorecard = {
                            title: {
                                display: true,
                                text: 'Score Card Details',
                                position: 'top'
                            }, responsive: true,
                            legend: {
                                position: 'right'
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            },
                            rotation: 1 * Math.PI,
                            circumference: 1 * Math.PI
                        };
                        var securitiesChart = new Chart(ctxscorecardcanvas, {
                            type: 'doughnut',
                            data: datascore,
                            options: optionsscorecard
                        });
                        var income = 0;
                        var expenditure = 0;
                        for (var i = 0; i < $scope.borrowerdashboard.clientmonthlyincomechart.length; i++) {
                            if ($scope.borrowerdashboard.clientmonthlyincomechart[i].type === "Income")
                                income = income + parseFloat($scope.borrowerdashboard.clientmonthlyincomechart[i].amount);
                            else
                                expenditure = expenditure + parseFloat($scope.borrowerdashboard.clientmonthlyincomechart[i].amount);
                        }
                        var incomeexpenditureChart = {
                            datasets: [{
                                label: 'Income',
                                data: [income],
                                fill: true,
                                backgroundColor: [
                                    '#5b3388',
                                ],
                                borderColor: [
                                    '#5b3388',
                                ]
                            },
                            {
                                label: 'Expenditure',
                                data: [expenditure],
                                fill: true,
                                backgroundColor: [
                                    '#ecdd95',
                                ],
                                borderColor: [
                                    '#ecdd95',
                                ]
                            }]
                        };

                        var incomeexpenditureoptions = {
                            title: {
                                display: true,
                                text: 'Monthly Income and Expenditure',
                                position: 'top'
                            },
                            rotation: 1 * Math.PI,
                            circumference: 1 * Math.PI,
                            legend: {
                                position: 'right'
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        };


                        var myChart1 = new Chart(ctxmyChart1, {
                            type: 'bar',
                            data: incomeexpenditureChart,
                            options: incomeexpenditureoptions
                        });

                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });
            }

        } catch (e) {
            alert("Exception GetApprovals: " + e);
        }
    };

    $scope.CheckResubmitData = function () {
        try {
            $http({
                url: "/Master/GetResubmitReturn",
                method: "GET"
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output != null) {
                        $scope.listDisplayQueue = response.data.output;
                        $scope.isResubmit = $scope.listDisplayQueue.isReSubmit;
                        $scope.isSelection = $scope.listDisplayQueue.isSelection;

                        if ($scope.listDisplayQueue.isReSubmit) {
                            $scope.listDisplayQueueStructNew = $scope.listDisplayQueue.DisplayNew;
                            $scope.listDisplayQueueStructOld = $scope.listDisplayQueue.DisplayOld;
                            $scope.listDAApprovalQueue = $scope.listDisplayQueue.dAApprovalQueue;
                            $scope.listDAQueueMapping = $scope.listDisplayQueue.dAQueueMapping;

                        } else {
                            $scope.listDisplayQueueStructNew = $scope.listDisplayQueue.DisplayNew;
                            $scope.listDAApprovalQueue = $scope.listDisplayQueue.dAApprovalQueue;
                            $scope.listDAQueueMapping = $scope.listDisplayQueue.dAQueueMapping;
                        }
                    }
                }
            }, function errorCallback(response) {
                //$scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCurrentLevel: " + e);
        }
    };

    function valid() {
        var isValid = true;
        if ($scope.actiontaken == null) {
            dialogService.ConfirmDialogWithOkay('', global._actionNotSelected);
            $scope.isSaveDisabled = false;
            isValid = false;
            return isValid;
        }
        if ($scope.actiontaken.id == 3 || $scope.actiontaken.id == 2) {
            if ($scope.listReferClerifyUser.length == 0) {
                dialogService.ConfirmDialogWithOkay('', "Please add one user");
                $scope.isSaveDisabled = false;
                isValid = false;
                return isValid;
            }

        }
        if ($scope.dAApprovalModel.comment == "" && $scope.actiontaken.id == 1) {
            dialogService.ConfirmDialogWithOkay('', global._commentNeeded);
            $scope.isSaveDisabled = false;
            isValid = false;
            return isValid;
        }

        return isValid;
    }

    $scope.clickSave = function () {
        $scope.isSaveDisabled = true;
        richText = $('.commentRecord').html();
        if (valid() == true) {

            try {
                common.preprocessload();
                $http({
                    url: "/Master/SubmitWF",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        dAApprovalModel: $scope.dAApprovalModel
                        , otherDAApprovalRecords: $scope.pendingApprovalList
                        , listDAApprovalQueueModel: $scope.listDAApprovalQueueModel
                        , masterAprovalId: $scope.wFlowModel.masterAprovalId
                        , listSelectedRole: $scope.listSelectedRole
                        , listReferClerify: $scope.listReferClerifyUser
                        , isReferOrClarifyUser: $scope.isReferOrClarifyUser
                        , cPRComponentsCommentList: $scope.cPRComponentsCommentList
                        , cPRSpecialConditionCommentList: $scope.cPRSpecialConditionCommentList
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                        window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {
                    $scope.isSaveDisabled = false;
                });
            } catch (e) {
                alert('SubmitDALevel ' + e);
                $scope.isSaveDisabled = false;
            }
        }
    };

    $scope.clickYes = function () {

        try {
            common.preprocessload();
            $http({
                url: "/Master/ReSubmitWF",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({
                    cprid: $scope.listDisplayQueue.cPRId,
                    templateid: $scope.listDisplayQueue.dATemplateId
                })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
                }
                common.preprocesshide();
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('clickYes ' + e);
        }
    }

    $scope.clickNo = function () {
        //window.location.href = "http://dmsapp/sites/dev/_layouts/15/appredirect.aspx?instance_id={944761D0-A30A-46A5-AB67-1AB63323BDCC}&quick_launch=1";
        common.RedirectHome();
        //common.preprocessload();
        //$http({
        //    url: "/Master/SubmitMappingUser",
        //    method: "POST",
        //    headers: {
        //        "accept": "application/json;odata=verbose",
        //        "content-Type": "application/json;odata=verbose"
        //    },
        //    data: JSON.stringify({
        //        approvalMasterId: $scope.listDisplayQueue.approvalMasterId,
        //        listDAApprovalQueue: $scope.listDAApprovalQueue,
        //        listDAQueueMapping: $scope.listDAQueueMapping
        //    })
        //}).then(function successCallback(response) {
        //    if (response.data.success) {
        //        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
        //        window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
        //        //common.RedirectHome();
        //    }
        //    common.preprocesshide();
        //}, function errorCallback(response) {

        //});

    };
    $scope.clickCancel = function () {
        //window.location.href = "http://dmsapp/sites/dev/_layouts/15/appredirect.aspx?instance_id={944761D0-A30A-46A5-AB67-1AB63323BDCC}&quick_launch=1";
        common.RedirectHome();
    };

    $scope.clickSubmitMapping = function () {

        try {
            if (approvalValidation()) {
                common.preprocessload();
                $http({
                    url: "/Master/SubmitMappingUser",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        approvalMasterId: $scope.listDisplayQueue.approvalMasterId,
                        listDAApprovalQueue: $scope.listDAApprovalQueue,
                        listDAQueueMapping: $scope.listDAQueueMapping
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                        window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {

                });
            }
        } catch (e) {
            alert('clickSubmitMapping ' + e);
        }
    };

    function approvalValidation() {
        try {
            var status = true;
            //if ($scope.listDAApprovalQueue.length < 3) {
            //    alert('Please Select atleast 3 reviewers.');
            //    return false;
            //}

            var count = 0;
            angular.forEach($scope.listDAApprovalQueue, function (item) {
                count++;
                var obj = $filter("filter")($scope.listDAQueueMapping, { roleid: item.roleid, level: item.level }, true);
                angular.forEach(obj, function (value) {
                    var index = $scope.listDAQueueMapping.indexOf(value);
                    $scope.listDAQueueMapping[index].level = count;
                }, $scope.listDAQueueMapping);


                var index1 = $scope.listDAApprovalQueue.indexOf(item);
                $scope.listDAApprovalQueue[index1].level = count;
                $scope.listDAApprovalQueue[index1].activityid = 5;
                if (count == $scope.listDAApprovalQueue.length) {
                    //last approver
                    item.activityid = 4;
                }
            });

            angular.forEach($scope.listDAApprovalQueue, function (item) {
                if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length == 0) {
                    alert('Please Select atleast 1 user for ' + item.rolename + ' group.');
                    status = false;
                    return false;
                } else if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length < item.minapprovalcount) {
                    alert('Please Select atleast ' + item.minapprovalcount + ' users for ' + item.rolename + ' group.');
                    status = false;
                    return false;
                }

                //Min Approval Check Here...
            });

            return status;

        } catch (e) {
            alert('approvalValidation ' + e);
        }
    }
    //test
    $scope.clickSaveWF = function () {
        try {
            $http({
                url: "/Master/ApprovalWflow",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ id: 1 })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                    window.location.href = cprRedirectUrl.replace("@cprno", GetUrlParameters());
                }
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('clickSaveWF ' + e);
        }

    };

    $scope.addRole = function (get) {
        if ($filter("filter")($scope.listSelectedRole, { approvalmappingid: get.approvalmappingid }).length == 0) {
            $scope.listSelectedRole.push(get);
        }
    };
    $scope.removeRole = function (item) {
        if (confirm("Are you sure you want to DELETE this role?") == true) {
            var obj = $filter("filter")($scope.listSelectedRole, { approvalmappingid: item })[0];
            var index = $scope.listSelectedRole.indexOf(obj);
            $scope.listSelectedRole.splice(index, 1);
        }
    };

    $scope.addUser = function (get) {

        if ($filter("filter")($scope.listReferClerifyUser, { userId: get.userId }).length == 0) {
            $scope.listReferClerifyUser.push(get);
            $scope.roleUser = null;
        }

    };
    $scope.removeUser = function (item) {
        if (confirm("Are you sure you want to DELETE this User?") == true) {
            var obj = $filter("filter")($scope.listReferClerifyUser, { userId: item })[0];
            var index = $scope.listReferClerifyUser.indexOf(obj);
            $scope.listReferClerifyUser.splice(index, 1);


        }
    };

    $scope.changeUser = function (item) {
        if (confirm("Are you sure you want to CHANGE this User?") == true) {
            var obj = $filter("filter")($scope.listReferClerifyUser, { userId: item })[0];
            var index = $scope.listReferClerifyUser.indexOf(obj);
            $scope.listReferClerifyUser.splice(index, 1);


        }
    };
    $scope.splength = 1;
    $scope.clickAddSpCondition = function (get) {

        if (get.name == null || get.name == "")
            dialogService.ConfirmDialogWithOkay('', 'Special Condition Name cannot be empty.');
        else if (get.description == null || get.description == "")
            dialogService.ConfirmDialogWithOkay('', 'Special Condition Description cannot be empty.');
        else if (get.id == 0 || get.id == undefined) {
            var obj = get;
            obj.id = $scope.splength;
            $scope.cPRSpecialConditionCommentList.push(obj);
            $scope.cPRSpecialConditionCommentModel = null;
            $scope.splength++;
        } else {
            $scope.cPRSpecialConditionCommentList.push(get);
            $scope.cPRSpecialConditionCommentModel = null;
        }
    };
    $scope.removeSPC = function (item) {
        if (confirm("Are you sure you want to DELETE this?") == true) {
            var obj = $filter("filter")($scope.cPRSpecialConditionCommentList, { id: item.id })[0];
            var index = $scope.cPRSpecialConditionCommentList.indexOf(obj);
            $scope.cPRSpecialConditionCommentList.splice(index, 1);
        }
    };

    $scope.changeSPC = function (item) {
        if (confirm("Are you sure you want to Edit this?") == true) {
            var obj = $filter("filter")($scope.cPRSpecialConditionCommentList, { id: item.id })[0];
            $scope.cPRSpecialConditionCommentModel = obj;
            var index = $scope.cPRSpecialConditionCommentList.indexOf(obj);
            $scope.cPRSpecialConditionCommentList.splice(index, 1);
        }
    };

    $scope.comlength = 1;
    $scope.clickAddComponant = function (get) {

        if (get.component == null || get.component == "")
            dialogService.ConfirmDialogWithOkay('', 'CPR Componant cannot be empty.');
        else if (get.comment == null || get.comment == "")
            dialogService.ConfirmDialogWithOkay('', 'CPR Componant comment cannot be empty.');
        else if (get.id == 0 || get.id == undefined) {
            var obj = get;
            obj.id = $scope.comlength;
            $scope.cPRComponentsCommentList.push(obj);
            $scope.cPRComponentsCommentModel = null;
            $scope.comlength++;
        } else {
            $scope.cPRComponentsCommentList.push(get);
            $scope.cPRComponentsCommentModel = null;
        }
    };
    $scope.removeComponant = function (item) {
        if (confirm("Are you sure you want to DELETE this?") == true) {
            var obj = $filter("filter")($scope.cPRComponentsCommentList, { id: item.id })[0];
            var index = $scope.cPRComponentsCommentList.indexOf(obj);
            $scope.cPRComponentsCommentList.splice(index, 1);
        }
    };

    $scope.changeComponant = function (item) {
        if (confirm("Are you sure you want to Edit this?") == true) {
            var obj = $filter("filter")($scope.cPRComponentsCommentList, { id: item.id })[0];
            $scope.cPRComponentsCommentModel = obj;
            var index = $scope.cPRComponentsCommentList.indexOf(obj);
            $scope.cPRComponentsCommentList.splice(index, 1);
        }
    };

    $scope.ngchangeAction_Filter = function (item) {
        $scope.dAApprovalModel.actiontaken = item.name;
        $scope.listRole.length = 0;

        angular.forEach($scope.listAllRole, function (value) {
            if (item.id == 2) {
                if (value.hierarchylevel < $scope.roleLevel)
                    this.push(value);
            } else if (item.id == 3) {
                if (value.hierarchylevel >= $scope.roleLevel)
                    this.push(value);
            }

        }, $scope.listRole);
    }

    $scope.ngchangeUserMapping_Filter = function (item) {

        if ($filter("filter")($scope.listDAQueueMapping, { roleid: item.roleid, isselecteduser: true, level: item.level }, true).length == 0) {
            var obj = $filter("filter")($scope.listDAApprovalQueue, { roleid: item.roleid, level: item.level }, true)[0];
            var index = $scope.listDAApprovalQueue.indexOf(obj);
            //$scope.listDAApprovalQueue[index].isselected = false;
            if ($scope.listDAApprovalQueue[index].isDisable == true) {

                if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length == 0) {
                    $scope.lastlevelValidation = false;
                }

            } else {
                $scope.listDAApprovalQueue[index].isselected = false;
            }

        } else {
            var obj = $filter("filter")($scope.listDAApprovalQueue, { roleid: item.roleid, level: item.level }, true)[0];
            var index = $scope.listDAApprovalQueue.indexOf(obj);
            $scope.listDAApprovalQueue[index].isselected = true;
            if ($scope.listDAApprovalQueue[index].isDisable == true) {

                if ($filter("filter")($scope.listDAQueueMapping, { isselecteduser: true, level: item.level }, true).length > 0) {
                    $scope.lastlevelValidation = true;
                }

            }
        }

    };

    $scope.ngchangeQueue_Filter = function (item) {

        if (item.isselected) {
            var obj = $filter("filter")($scope.listDAQueueMapping, { roleid: item.roleid, level: item.level }, true);

            angular.forEach(obj, function (value) {
                //  var obj = $filter("filter")(value, { roleid: item.roleid, level: item.level });
                var index = $scope.listDAQueueMapping.indexOf(value);
                $scope.listDAQueueMapping[index].isselecteduser = true;
            }, $scope.listDAQueueMapping);

        } else {
            var obj = $filter("filter")($scope.listDAQueueMapping, { roleid: item.roleid, level: item.level }, true);

            angular.forEach(obj, function (value) {
                // var obj = $filter("filter")(value, { roleid: item.roleid, level: item.level });
                var index = $scope.listDAQueueMapping.indexOf(value);
                $scope.listDAQueueMapping[index].isselecteduser = false;
            }, $scope.listDAQueueMapping);
        }
    };

    //Prayas
    function GetAllDAActivity() {
        try {
            $http({
                url: "/Master/GetActivity",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.daActivities = response.data.output;
                }
            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('clickSaveWF ' + e);
        }
    }

    $scope.clickModalPopup = function () {

        var CIFResultsModal = $filter('filter')($scope.wFlowModel.approvalActivity, { name: 'Approved' }).length;
        if (CIFResultsModal == 1) {
            $scope.isModalValue = true;
            var cifModal = angular.element('#cIFResultsSearchModal');
            cifModal.modal('show');
            GetAllCPRDetailsByCIFWithReiniated($scope.borrowerdashboard.cif);
            $scope.isAreYouSure = false;
        }
        else {
            $scope.isAreYouSure = true;
            var cifModal = angular.element('#cIFResultsSearchModal');
            cifModal.modal('show');
            $scope.isModalValue = false;

        }
        //$scope.isModalValue = false;
        //$scope.isAreYouSure = false;

    };

    $scope.Page_Load();
    $scope.unSelectedItems = [];

    $scope.sortableOptions = {
        placeholder: "app",
        connectWith: ".apps-container"
    };

    var securitycanvas = document.getElementById("securitydetailsChart");
    var scorecardcanvas = document.getElementById("socrecardChart");
    var myChart1Canvas = document.getElementById("myChart1");

    securitycanvas.height = 150;
    scorecardcanvas.height = 150;
    myChart1Canvas.height = 150;

    var ctxsecuritycanvas = securitycanvas.getContext('2d');
    var ctxmyChart1 = myChart1Canvas.getContext('2d');
    var ctxscorecardcanvas = scorecardcanvas.getContext('2d');


}));