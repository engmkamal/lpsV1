(app.controller("HomeCtrl", ["$scope", "$http", "$filter", function ($scope, $http, $filter) {
    var spHostUrl = "";
    $scope.cprInitiationUrl = "";
    $scope.taskUrl = "";
    $scope.myViewUrl = "";

    function Page_Load() {
        spHostUrl = common.GetParameterByName("SPHostUrl", null);

        $scope.taskUrl = spHostUrl + "/Lists/LOSTask/AllItems.aspx";
        if (spHostUrl == "" || spHostUrl == null) {
            $scope.cprInitiationUrl = "/CPR/Initiation";
            $scope.cprRenewalUrl = "/CPR/ReInitiation";
            $scope.cprAddCustomerUrl = "/Master/Customer";
            $scope.myViewUrl = "/CPR/ListView";
            $scope.disbursementUrl = "/Disbursement";
            //$scope.reportViewUrl = "/CPR/ReportListView";
            $scope.reportViewUrl = "/Report/ReportListView";
            $scope.recoveryViewUrl = "/CPRRecovery/Index";
            $scope.cprSanction = "/CPRSanction";
            $scope.cprDisbursement = "/CPRDisbursment";
        }
        else {
            $scope.cprInitiationUrl = "/CPR/Initiation?SPHostUrl=" + spHostUrl;
            $scope.cprRenewalUrl = "/CPR/ReInitiation?SPHostUrl=" + spHostUrl;
            $scope.cprAddCustomerUrl = "/Master/Customer?SPHostUrl=" + spHostUrl;
            $scope.myViewUrl = "/CPR/ListView?SPHostUrl=" + spHostUrl;
            $scope.disbursementUrl = "/Disbursement" + spHostUrl;
           // $scope.reportViewUrl = "/CPR/ReportListView?SPHostUrl=" + spHostUrl;
            $scope.reportViewUrl = "/Report/ReportListView?SPHostUrl=" + spHostUrl;
            $scope.recoveryViewUrl = "/CPRRecovery/Index?SPHostUrl=" + spHostUrl;
            $scope.cprSanction = "/CPRSanction?SPHostUrl=" + spHostUrl;
            $scope.cprDisbursement = "/CPRDisbursment?SPHostUrl=" + spHostUrl;
        }
    }

    Page_Load();



}]));