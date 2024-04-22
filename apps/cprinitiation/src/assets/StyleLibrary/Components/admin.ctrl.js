

(app.controller("AdminCtrl", ['$scope', '$http', '$filter', 'dialogService', 'DTOptionsBuilder', function ($scope, $http, $filter, dialogService, DTOptionsBuilder) { 


//(app.controller("AdminCtrl", function ($scope, $http, $filter, dialogService) {

    /// .................. Variable
    $scope.BranchTitleDisplay = common.BranchTitleDisplay;
    $scope.listBusiness = []; //Customer Segment
    $scope.listDivision = []; 
    $scope.listProduct = [];
    $scope.listCategory = [];
    $scope.listDocumentType = [];
    $scope.listRole = [];
    $scope.listReject = [];
    $scope.listSecurityType = [];
    $scope.listSupplierDetail = [];
    $scope.listCustomer = [];
    $scope.listRelationship = [];
    $scope.listCurrency = [];

    $scope.changeRequests = [];
    $scope.SaveDraftEnable = false;

    $scope.test = "Angular Working";
    $scope.BranchTitleDisplay = common.BranchTitleDisplay;
    $scope.listProposeTypeOfFacility = [];

    $scope.listEducationalQualification = [];
    $scope.listClassificationCAF = [];
    $scope.listFeeType = [];
    $scope.listCountry = [];
    $scope.listLandType = [];
    $scope.listmodeofOwnershipTransfer = [];
    $scope.listInsuranceCompany = [];
    $scope.listAssetsType = [];
    $scope.listWaiverType = [];
    $scope.listDefferalType = [];
    $scope.listProductiveSector = [];
    $scope.listMapProduct = [];
    $scope.listMapScoreCard = [];
    $scope.listDesignation = [];
    /// ............... Function Start
    function GetBusinesses() {
        try {
            $http({
                url: "/Master/GetBusinesses",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listBusiness = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetBusinesses: " + e);
        }
    };

    function GetProducts() {
        try {
            $http({
                url: "/Master/GetProducts",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listProduct = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetProducts: " + e);
        }
    };
    function GetDivisions() {
        try {
            $http({
                url: "/Master/GetDivisions",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDivision = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetDivisions: " + e);
        }
    };

    function GetCategories() {
        try {
            $http({
                url: "/Master/GetCategories",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCategory = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetCategories: " + e);
        }
    };

    function GetDocumentTypes() {
        try {
            $http({
                url: "/Master/GetDocumentTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDocumentType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetDocumentTypes: " + e);
        }
    };

    function GetRoles() {
        try {
            $http({
                url: "/Master/GetRoles",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listRole = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetRoles: " + e);
        }
    };

    function GetRejects() {
        try {
            $http({
                url: "/Master/GetRejects",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listReject = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetRejects: " + e);
        }
    };

    function GetSecurityTypes() {
        try {
            $http({
                url: "/Master/GetSecurityTypes",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listSecurityType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSecurityTypes: " + e);
        }
    };

    function GetSupplierDetail() {
        try {
            $http({
                url: "/Master/GetSupplierDetails",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listSupplierDetail = response.data.output;

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetSupplierDetail: " + e);
        }
    };

    function GetAllBranches() {
        try {
            $http({
                url: "/Master/GetAllBranches",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listBranch = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllBranches: " + e);
        }
    };

    function GetAllApproverMapping() {        
        try {
            $http({
                url: "/Master/GetAllApproverMapping",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)                    
                    $scope.listApproverMapping = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {

        }
    };
    function GetAllDesignation() {
        try {
            $http({
                url: "/Master/GetAllDesignation",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDesignation = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {

        }
    };

    function GetCustomers() {
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

    //sat
    function GetAllProposeTypeOfFacility() {

        try {
            $http({
                url: "/Master/GetAllProposeTypeOfFacility",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listProposeTypeOfFacility = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllProposeTypeOfFacility: " + e);
        }
    };

    function GetAllEducationalQualification() {

        try {
            $http({
                url: "/Master/GetAllEducationalQualification",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listEducationalQualification = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllEducationalQualification: " + e);
        }
    };

    function GetAllRelationship() {

        try {
            $http({
                url: "/Master/GetAllRelationship",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listRelationship = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllRelationship: " + e);
        }
    };

    function GetAllCurrency() {

        try {
            $http({
                url: "/Master/GetAllCurrency",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCurrency = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllCurrency: " + e);
        }
    };

    function GetAllCAFClassification() {

        try {
            $http({
                url: "/Master/GetAllCAFClassification",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listClassificationCAF = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllClassificationCAF: " + e);
        }
    };
    function GetAllFeeType() {

        try {
            $http({
                url: "/Master/GetAllFeeType",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listFeeType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllFeeType: " + e);
        }
    };
    function GetAllCountry() {
        try {
            $http({
                url: "/Master/GetAllCountry",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listCountry = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllCountry: " + e);
        }
    }
    function GetAllLandType() {
        try {
            $http({
                url: "/Master/GetAllLandType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listLandType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllLandType: " + e);
        }
    }

    function GetAllModeofOwnership() {
        try {
            $http({
                url: "/Master/GetAllModeofOwnership",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listmodeofOwnershipTransfer = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllModeofOwnership: " + e);
        }
    }

    function GetAllInsuranceCompany() {
        try {
            $http({
                url: "/Master/GetAllInsuranceCompany",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listInsuranceCompany = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllInsuranceCompany: " + e);
        }
    }

    function GetAllAssetsType() {
        try {
            $http({
                url: "/Master/GetAllAssetsType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listAssetsType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllAssetsType: " + e);
        }
    }

    function GetAllWaiverType() {
        try {
            $http({
                url: "/Master/GetAllWaiverType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listWaiverType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllAssetsType: " + e);
        }
    }

    function GetAllDefferalType() {
        try {
            $http({
                url: "/Master/GetAllDefferalType",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listDefferalType = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllAssetsType: " + e);
        }
    }

    function GetAllProductiveSector() {
        try {
            $http({
                url: "/Master/GetAllProductiveSector",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listProductiveSector = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllProductiveSector: " + e);
        }
    }

    function GetAllMapProduct() {
        try {
            $http({
                url: "/Master/GetAllMapProduct",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listMapProduct = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllMapProduct: " + e);
        }
    }

    function GetAllMapScoreCard() {
        try {
            $http({
                url: "/Master/GetAllMapScoreCard",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listMapScoreCard = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllMapProduct: " + e);
        }
    }

    function GetAllNationality() {
        try {
            $http({
                url: "/Master/GetAllNationality",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {

                if (response.data.success)
                    $scope.listNationality = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllNationality: " + e);
        }
    }

   
    /// ............... Function End

    /// ............... On Init Start
    $scope.Page_Load = function () {
        GetAllApproverMapping();
        GetProducts();
    };
    /// ............... On Init End

    /// ............... OnClick Event Start
    $scope.ApproverMapping_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllApproverMapping();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Branch_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllBranches();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Customer_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetCustomers();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.CustomerSegment_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetBusinesses();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.DocumentType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetDocumentTypes();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Product_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetProducts();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Role_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetRoles();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.SecurityType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetSecurityTypes();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.ProposeTypeOfFacility_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllProposeTypeOfFacility();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Qualification_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllEducationalQualification();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Relationship_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllRelationship();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Currency_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllCurrency();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.ClassificationCAF_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllCAFClassification();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.FeeType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllFeeType();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.CountryOrigin_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllCountry();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.TypeOfLand_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllLandType();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.ModeOfOwnershipTranfer_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllModeofOwnership();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.InsuranceCompany_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllInsuranceCompany();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.AssetType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllAssetsType();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.WeiverType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllWaiverType();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.DefferalType_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllDefferalType();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.ProductiveSector_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllProductiveSector();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.MapProduct_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllMapProduct();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.MapScoreCard_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllMapScoreCard();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Designation_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllDesignation();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Nationality_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetAllNationality();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    $scope.Division_Click_Event = function (ev) {
        var element = ev.srcElement ? ev.srcElement : ev.target;
        if (element.className == "collapsed") {
            GetDivisions();
            //alert("Expanding");
        } else {
            //alert("Collapsing");
        }
    };

    /// ............... OnClick Event Start

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('order', [[0, 'desc']]);


    $scope.Page_Load();

}]));







