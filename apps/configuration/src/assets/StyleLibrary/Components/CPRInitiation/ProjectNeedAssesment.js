(app.controller("projectNeedAssesmentCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.projectassessmenttype = {
        id: '',
        particulars: '',
        latestHistorical: '',
        projectedYear: '',
        latestHistoricalValue: 0,
        projectedYearValue: 0,
        active: false
    };

    $scope.projectNeedAssessment = {
        id: '',

        latestHistorical: null,
        projectedYear: null,

        latestHistoricalLandAndBuilding: null,
        projectedYearLandAndBuilding: null,

        latestHistoricalMachinery: null,
        projectedYearMachinery: null,

        latestHistoricalVehicle: null,
        projectedYearVehicle: null,

        latestHistoricalEquipment: null,
        projectedYearEquipment: null,

        latestHistoricalOthers: null,
        projectedYearOthers: null,

        latestHistoricalSoftExpenses: null,
        projectedYearSoftExpensess: null,

        latestHistoricalFinancedBy: null,
        projectedYearFinancedBy: null,

        latestHistoricalEquityNearEquity: null,
        projectedYearEquityNearEquity: null,

        latestHistoricalLoan: null,
        projectedYearLoan: null,

        latestHistoricalInternalGeneration: null,
        projectedYearInternalGeneration: null,
        active: true
    };
    $scope.listCPRProjectNeedAssessment2 = [
        {
            id: '', particulars: 'Land', latestHistorical: '', projectedYear: '',
            latestHistoricalValue: 0, projectedYearValue: 0, active: true
        },
        {
            id: '', particulars: 'Building', latestHistorical: '', projectedYear: '',
            latestHistoricalValue: 0, projectedYearValue: 0, active: true
        },
        {
            id: '', particulars: 'Machinery/Equipment', latestHistorical: '', projectedYear: '',
            latestHistoricalValue: 0, projectedYearValue: 0, active: true
        },
        {
            id: '', particulars: 'Furniture & Fixture', latestHistorical: '', projectedYear: '',
            latestHistoricalValue: 0, projectedYearValue: 0, active: true
        },
        {
            id: '', particulars: 'Vehicle', latestHistorical: '', projectedYear: '',
            latestHistoricalValue: 0, projectedYearValue: 0, active: true
        }
            
    ];
    $scope.listDocumentChecklist = [];
    $scope.listDocumentChecklist = [{
        id: '',
        documentType: null,
        documentName: null,
        issuingAuthority: null,
        issueDate: null,
        validity: null,
        remark: null,
        active: true,
        author: null
    }
    ];
    $scope.statusMatched = true;
    $scope.yearlist = [];
    
    $scope.Page_Load = function () {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            GetProjectNeedAssesmentByCprId(cprId);
            YearCalculation();
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };



    function YearCalculation() {
        try {

            var now = new Date().getFullYear();
            var start = now - 15;
            var futureYear = now + 15;
            var difference = futureYear - start;
            for (var i = start; i < futureYear; i++) {
                $scope.yearforturnover.value = null;
                $scope.yearforturnover.value = i;
                $scope.yearlist.push($scope.yearforturnover);
                $scope.yearforturnover = {
                    value: null
                }
            }
        }
        catch (ex) {
            alert("Exception in YearCalculation " + ex);
        }
    }

    function getFormatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
    function GetProjectNeedAssesmentByCprId(cPrid) {
        try {
            //var cprId = GetUrlParameters();
            $http({
                url: "/CPRV2/GetProjectNeedAssesmentByCprId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: cPrid })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.output.length > 0) {
                        $scope.projectassessmenttype.latestHistorical = response.data.output[0].latestHistorical;
                        $scope.projectassessmenttype.projectedYear = response.data.output[0].projectedYear;
                        $scope.listCPRProjectNeedAssessment2 = null;
                        $scope.listCPRProjectNeedAssessment2 = response.data.output;
                    }
                   
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetRiskAnalysisByCprId " + e);
        }
    };
    $scope.RemoveProjectNeedAssessment2 = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (ex) {
            alert("Exception in RemoveProjectNeedAssessment2 " + ex);
        }
    };

    $scope.GetSumOFProjectNeedAssesment2latestHistorical = function () {
        var total = 0;
        if ($scope.listCPRProjectNeedAssessment2 != null) {
            for (count = 0; count < $scope.listCPRProjectNeedAssessment2.length; count++) {
                if (!isNaN($scope.listCPRProjectNeedAssessment2[count].latestHistoricalValue))
                    total += parseFloat($scope.listCPRProjectNeedAssessment2[count].latestHistoricalValue, 10);
            }
            var totalwithcommas = getFormatNumber(total);
            return totalwithcommas;
        }
        return '0';
    };

    $scope.GetSumOFProjectNeedAssesment2ProjectedYear = function () {
        var total = 0;
        if ($scope.listCPRProjectNeedAssessment2 != null) {
            for (count = 0; count < $scope.listCPRProjectNeedAssessment2.length; count++) {
                if (!isNaN($scope.listCPRProjectNeedAssessment2[count].projectedYearValue))
                    total += parseFloat($scope.listCPRProjectNeedAssessment2[count].projectedYearValue, 10);
            }
            var totalwithcommas = getFormatNumber(total);
            return totalwithcommas;
        }
        return '0';
    };

    $scope.AddProjectNeedAssessment2_ClickEvent = function (projectassessmenttype) {
        try {
            if (projectassessmenttype.particulars !== null && projectassessmenttype.particulars !== undefined && projectassessmenttype.particulars !== "") {
                AddProjectNeedAssessment2(projectassessmenttype);
            }
        }
        catch (ex) {
            alert("Exception in AddProjectNeedAssessment2_ClickEvent " + ex);
        }
    };
    function AddProjectNeedAssessment2(projectassessmenttype) {
        try {
            var projectNeedAssessment = {};
            projectNeedAssessment.id = '';
            projectNeedAssessment.projectedYear = projectassessmenttype.projectedYear;
            projectNeedAssessment.latestHistorical = projectassessmenttype.latestHistorical;
            projectNeedAssessment.particulars = projectassessmenttype.particulars;
            projectNeedAssessment.latestHistoricalValue = projectassessmenttype.latestHistoricalValue;
            projectNeedAssessment.projectedYearValue = projectassessmenttype.projectedYearValue;
            projectNeedAssessment.active = true;
            if ($scope.listCPRProjectNeedAssessment2 == undefined) {
                $scope.listCPRProjectNeedAssessment2 = [];
            }
            $scope.listCPRProjectNeedAssessment2.push(projectNeedAssessment);
            //ResetProjectNeedAssessment2();
        } catch (ex) {
            alert("Exception in AddProjectNeedAssessment2_ClickEvent " + ex);
        }
    };

    $scope.RemoveItemFromlistDocumentChecklist = function (list, item) {
        try {
            if (list != null | item != null) {
                common.SetActiveFalseForRemovedItem(list, item);
            }

        } catch (e) {
            alert("Exception RemoveItemFromlistDocumentChecklist Error: " + e);
        }
    };

    function SaveProjectNeedAssesment() {
        try {
            common.preprocessload();
            var cprID = GetUrlParameters();
            angular.forEach($scope.listCPRProjectNeedAssessment2, function (value, key) {
                $scope.listCPRProjectNeedAssessment2[key].latestHistorical = $scope.projectassessmenttype.latestHistorical;
                $scope.listCPRProjectNeedAssessment2[key].projectedYear = $scope.projectassessmenttype.projectedYear;
                if ($scope.listCPRProjectNeedAssessment2[key].latestHistoricalValue == 0 || $scope.listCPRProjectNeedAssessment2[key].latestHistoricalValue == '')
                    $scope.listCPRProjectNeedAssessment2[key].active = false;
            });
            $http({
                url: "/CPRV2/SaveProjectNeedAssesment",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ ListProjectNeedAssesmentModel: $scope.listCPRProjectNeedAssessment2, cprId: cprID })

            }).then(function successCallback(response) {
                if (response.data.success) {
                    //alert("Success");
                    common.preprocesshide();
                    $scope.listCPRProjectNeedAssessment2 = response.data.output;
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        //ResetProjectNeedAssessment2();
                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                } else {
                    common.preprocesshide();
                }
            },
                function errorCallback(response) {
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('SubmitUserRole ' + e);
        }
    }

    $scope.SubmitProjectNeedAssesment_ClickEvent = function () {
        try {
            if ($scope.projectassessmenttype.latestHistorical != "" && $scope.projectassessmenttype.projectedYear != "") {
                SaveProjectNeedAssesment();
            } else {
                dialogService.ConfirmDialogWithOkay('', "Please Select LatestHistorical and Projeted Year ").
                    then(function successCallback(response) {

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    })
            }

        } catch (e) {
            alert('SubmitProjectNeedAssesment_ClickEvent ' + e);
        }
    }

    function ResetProjectNeedAssessment2() {
        try {
            $scope.projectassessmenttype.particulars = '';
            $scope.projectassessmenttype.latestHistoricalValue = 0;
            $scope.projectassessmenttype.projectedYearValue = 0;
            $scope.listCPRProjectNeedAssessment2 = [];
            $scope.projectassessmenttype = {
                id: '',
                particulars: '',
                latestHistorical: '',
                projectedYear: '',
                latestHistoricalValue: 0,
                projectedYearValue: 0,
                active: false
            };
        } catch (ex) {
            alert("Exception in ResetProjectNeedAssessment2 " + ex);
        }
    }

    $scope.Page_Load();

}));