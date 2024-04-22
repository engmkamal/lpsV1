(app.controller("CRIBUploadCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.PageTitle = "CRIB Report";
    $scope.cribUploadComment = null;
    $scope.listCRIBUpload = [];
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    //$scope.currentDate = new Date();
    $scope.cribupload = {
        id: null,
        name: '',
        identyno: common.nid,
        url: '',
        status: '',
        reportUptoDate: '',
        reportGenerationDate: '',
        description: '',
        criboverdue: false,
        isSupportingDocument: false,
        active: true
    };
    $scope.cribUploadUrl = false;
    var checkuploadvaluecrib = document.getElementById("cribFileUploader");
    $scope.SubmitCRIBUpload_ClickEvent = function () {
        try {
            
            SaveCRIBAnalysis();

        } catch (e) {
            alert("SubmitCRIBUpload_ClickEvent error" + e);
        }
    };

    $scope.RemoveItemFromlistCribUpload = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
            }
        } catch (e) {
            alert("Exception RemoveItemFromlistCribUpload Error: " + e);
        }
    };
    $scope.AddCRIBUpload_ClickEvent = function (cribupload) {
        try {
            if (cribupload.url == undefined || cribupload.url =="")
                dialogService.ConfirmDialogWithOkay("PLEASE ENTER A FILE TO BE UPLOAD!");
            else {
                if ($scope.listCRIBUpload == null)
                    $scope.listCRIBUpload = [];

                cribupload.active = true;
                $scope.listCRIBUpload.push(cribupload);
                $scope.cribUploadUrl = false;
                ResetCribUpload();
                $scope.editable.disabled = true;

            }

        } catch (e) {
            alert("AddCRIBUpload_ClickEvent Error: " + e);
        }
    };

    $scope.ResetCRIBUpload_ClickEvent = function () {
        ResetCribUpload();
        $scope.editable.disabled = true;
    };

    $scope.UploadCRIB_ClickEvent = function () {
        try {
            UploadCRIB_ClickEvent_Validation(checkuploadvaluecrib, UploadCRIB);
        } catch (e) {

            $scope.cribUploadUrl = false;
            alert("UploadCRIB_ClickEvent ", e);
        }
    };
    $scope.CheckCIBReportDate = function () {
        try {
            var reportGenerationDate = new Date($scope.cribupload.reportGenerationDate);
            var reportUptoDate = new Date($scope.cribupload.reportUptoDate);
            if ($scope.cribupload.reportUptoDate != null && $scope.cribupload.reportGenerationDate) {
                if ($scope.cribupload.reportUptoDate > $scope.cribupload.reportGenerationDate || $scope.cribupload.reportUptoDate == $scope.cribupload.reportGenerationDate) {
                    alert("Report Generation Date should be greater than Report upto date");
                    $scope.cribupload.reportGenerationDate = '';
                }
            }
        } catch (e) {
            alert("Exception CheckCIBReportDate " + e);
        }
    };
    function UploadCRIB_ClickEvent_Validation(checkValue, UploadCRIB) {
        try {
            if (checkValue.value === "") {
                alert("PLEASE ENTER A FILE TO BE UPLOAD!");
            } else {
                UploadCRIB();
            }
        } catch (e) {
            $scope.cribUploadUrl = false;
            alert(UploadCRIB + "_ClickEvent ", e);
        }
    };
    function SaveCRIBAnalysis() {
        try {
            var cprId = GetUrlParameters();
            var cribUploadMapper = {
                'listCRIBUploadModel': $scope.listCRIBUpload,
                'cprId': cprId,
                'cribUploadEvaluatorComment': $scope.cribUploadComment
            }
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveCRIBUpload",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cribUploadMapper: cribUploadMapper })
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    common.preprocesshide();
                    if (response.data.success) {
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        GetCRIBAnalysisByCPRId(cpr);
                  
                    } else {
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
            alert("Exception SaveCRIB Report: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    };

    function ResetCribUpload() {
        $scope.cribupload =
        {
            id: null,
            name: '',
            identyno: '',
            status: '',
            reportUptoDate: '',
            reportGenerationDate: '',
            description: '',
            criboverdue: '',
            isSupportingDocument: false,
            active: true
        };
        $scope.cribuploadform.$setPristine();
        $scope.cribuploadform.$setUntouched();
        $scope.cribUploadUrl = false;
    }
    function UploadCRIB() {

        try {
            common.preprocessload();
            var cribNic = "";
            var facilityType = "";
            var formdata = new FormData();
            var fileUploader = document.getElementById("cribFileUploader");
            formdata.append("cribFileUploader", fileUploader.files[0]);
            formdata.append("cprid", $scope.cprinit.id);
            formdata.append("cprno", $scope.cprinit.cprno);
            formdata.append("cif", $scope.cprinit.cif);
            if ($scope.cprinit.listBorrowerProfiles[0] != null) {
                if ($scope.cprinit.listBorrowerProfiles[0].individual != null) {
                    if ($scope.cprinit.listBorrowerProfiles[0].individual.nic != null)
                        cribNic = $scope.cprinit.listBorrowerProfiles[0].individual.nic;
                }
            }

            if ($scope.cprinit.listCPRFacilities[0] != null) {
                if ($scope.cprinit.listCPRFacilities[0].facilitytype != null)
                    facilityType = $scope.cprinit.listCPRFacilities[0].facilitytype;
            }
            if ($scope.cprinit.branch != null)
                formdata.append("branch", $scope.cprinit.branch.name);

            formdata.append("nic", cribNic);
            formdata.append("facilitytype", facilityType);
            formdata.append("documenttype", "CRIB")
            var request = {
                method: 'POST',
                url: "/CPR/UploadDocument",
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            $http(request).then(function successCallback(response) {
                if (response.data.success) {
                    dialogService.ConfirmDialogWithOkay('', global._cribuploadmessage);
                    $scope.cribupload.url = response.data.output;
                    $scope.editable.view = false;
                    $scope.editable.disabled = false;
                    document.getElementById("cribFileUploader").value = "";
                    $scope.cribUploadUrl = true;
                }
                fileUploader = "";
                common.preprocesshide();
            }, function errorCallback(response) {
                $scope.error = response;
                $scope.cribUploadUrl = false;
            });
        } catch (e) {
            alert("UploadCRIB ", e);
        }
    }
    Page_Load();
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId == null) {
                ///
            } else {
                GetCRIBAnalysisByCPRId(cprId);

            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    };
    function GetCRIBAnalysisByCPRId(cpr) {
        try {
            common.preprocessload();
            $http({
                url: "/CPRV2/GetCRIBUploadByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cpr }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    $scope.cribUploadMapper = response.data.output;
                    $scope.listCRIBUpload = $scope.cribUploadMapper.listCRIBUploadModel;
                    $scope.cribUploadComment = $scope.cribUploadMapper.cribUploadEvaluatorComment;

                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.preprocesshide();
            });

        } catch (e) {
            alert("Exception GetCRIBAnalysisByCPRId: " + e);
            common.preprocesshide();
        }
    };

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }

}));