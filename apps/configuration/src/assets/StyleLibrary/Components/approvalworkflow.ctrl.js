(app.controller("ApprovalWFCtrl", function ($scope, $http, $filter, dialogService) {
    /// .................. Variable
    var count = 0;
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
        status: null,
        actiontaken: null,
        comment: null,
        bypass: false,
        active: false,
        editor: null,
        modified: null,
        author: null,
        created: null,
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

    $scope.listCPRComponentModel =[];
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
    /// ............... Function
    //Events


    //Methods
    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
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
                            $scope.dAApprovalModel = $scope.wFlowModel.dAApprovalModel;

                            $scope.listAllRole = $scope.wFlowModel.roleApMappingStruct;
                            $scope.isByPass = $scope.wFlowModel.isByPass;
                        }

                        //dashboard--------------------------------------------
                        $scope.borrowerdashboard = $scope.wFlowModel.cPRDetailsForDashboardModel;
                        //console.log($scope.borrowerdashboard);

                        $scope.isWFVisible = $scope.wFlowModel.isWFVisible;
                        $scope.isWFEnabled = $scope.wFlowModel.isWFEnabled;
                        $scope.approvedList = $scope.wFlowModel.approvedList;
                        $scope.listDAApprovalQueueModel = $scope.wFlowModel.listDAApprovalQueueModel;
                        $scope.pendingApprovalList = $scope.wFlowModel.pendingApprovalList;
                        $scope.roleLevel = $scope.wFlowModel.roleLevel;

                        $scope.isMarkattingOfficer = $scope.wFlowModel.isMarkattingOfficer;
                        $scope.isReferOrClarifyUser = $scope.wFlowModel.isReferOrClarifyUser;

                        if ($scope.wFlowModel.referClerifyUserList != null)
                            $scope.listReferClerifyUser = $scope.wFlowModel.referClerifyUserList;

                        $scope.listCPRComponentModel = $scope.wFlowModel.listCPRComponentModel;
                        if ($scope.wFlowModel.listSpecialCommentDisplay!=null){
                            $scope.listSpecialCommentDisplay = $scope.wFlowModel.listSpecialCommentDisplay;

                            //if ($filter("filter")($scope.listSpecialCommentDisplay.listSpecialCommentModel, { 'type': 'Componant' }).length > 0) { 
                                $scope.ngshowComComment=true;
                            //}
                            //if ($filter("filter")($scope.listSpecialCommentDisplay.listSpecialCommentModel, { 'type': 'SpecialCondition' }).length > 0) {
                                $scope.ngshowSpclComment = true;
                            //}
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

                            var tooltiplabel = $scope.borrowerdashboard.securitydetailschart[i].type
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

                        var myChart = new Chart(ctxsecuritycanvas, {
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


    $scope.clickSave = function () {
        $scope.isSaveDisabled = true;

        if ($scope.actiontaken == null) {
            dialogService.ConfirmDialogWithOkay('', global._actionNotSelected);
            $scope.isSaveDisabled = false;
        } else if ($scope.dAApprovalModel.comment == "" && $scope.actiontaken.id == 1) {
            dialogService.ConfirmDialogWithOkay('', global._commentNeeded);
            $scope.isSaveDisabled = false;
        }
        else {

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

            if (!$scope.lastlevelValidation) {
                dialogService.ConfirmDialogWithOkay('', global._approverNotSelected);
            } else {
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

            } else
                $scope.listDAApprovalQueue[index].isselected = false;

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

    $scope.Page_LoadDA = function () {

        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
        if (spHostUrl != null) {
            cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
        }

        $scope.CheckResubmitData();

        if ($scope.listDisplayQueue.length == 0)
            GetApprovals();

    };

    //$scope.Page_Load1();


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