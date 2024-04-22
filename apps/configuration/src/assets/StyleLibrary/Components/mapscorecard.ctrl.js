
(app.controller("MapScoreCardCtrl", function ($scope, $http, $filter, dialogService, $rootScope, $timeout) {

    /// .................. Variables


    $scope.mapscorecard = {
        id: '',
        productId: '',
        scorecardtemplateId:'',
        product: [],
        scorecardtemplate: [],
        active: true
    };
    $scope.products = [];
    $scope.scorecardtemplates = [];

    /// .................. Funtions

    function GetUrlParameters() {
    	var mapscorecardId = (common.GetParameterByName("id", null));
    	return mapscorecardId;
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
    				$scope.products = response.data.output;
    		}, function errorCallback(response) {
    			$scope.error = response;
    		});
    	} catch (e) {
    		alert("Exception GetProducts: " + e);
    	}
    };

    function GetScoreCardTemplates() {
    	try {
    		$http({
    			url: "/Master/GetScoreCardTemplate",
    			method: "GET",
    			headers: {
    				"accept": "application/json;odata=verbose",
    				"content-Type": "application/json;odata=verbose"
    			},
    			data: JSON.stringify({ listScoreCardTemplateModel: $scope.mapscorecard.scorecardtemplate })
    		}).then(function successCallback(response) {
    			if (response.data.success)
    				$scope.scorecardtemplates = response.data.output;
    		}, function errorCallback(response) {
    			$scope.error = response;
    		});
    	} catch (e) {
    		alert("Exception GetProducts: " + e);
    	}
    };

    function GetMapScoreCardById() {
    	var mapscorecardId = GetUrlParameters();
        try {
            $http({
            	url: "/Master/GetMapScoreCardByIdFromAll",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ mapscorecardId: mapscorecardId })
            }).then(function successCallback(response) {
                if (response.data.success)
                	$scope.mapscorecard = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
        	alert("Exception GetMapScoreCardById: " + e);
        }
    };

    function SubmitMapScoreCard() {
        try {
            $http({
            	url: "/Master/SubmitMapScoreCard",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ mapscorecard: $scope.mapscorecard })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                        var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                        if (spHostUrl !== null) {
                            window.location.href = common.adminRedirectUrl += spHostUrl;
                        }
                    }, function errorCallback(response) {
                        common.preprocesshide();
                    }
                    );
                }
            }, function errorCallback(response) {
                    common.preprocesshide();

            });
        } catch (e) {
        	alert('SubmitMapScoreCard ' + e);
        }
    }

    $scope.Page_Load = function () {
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
        	GetProducts();
            GetScoreCardTemplates();
            GetMapScoreCardById();
        }
        else {
        	GetProducts();
        	GetScoreCardTemplates();
        }
    };

    ///.................. Events


    $scope.Submit_ClickEvent = function () {
        try {
        	SubmitMapScoreCard();
        } catch (e) {
        	alert('SubmitMapScoreCard_ClickEvent ' + e);
        }
    }

    $scope.Page_Load();

}));
