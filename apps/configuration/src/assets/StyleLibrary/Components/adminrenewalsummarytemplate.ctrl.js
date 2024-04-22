(app.controller("RenewalSummaryTemplateCtrl", function ($rootScope
    , $scope
    , $http
    , $filter
    , dialogService
    , $mdDialog
    , $timeout) {

    $scope.title = "Renewal Summary Template";
    $scope.mainSectionModel = {
        id: null,
        name: null,
        active: true
    };
    $scope.renewalSummaryTemplate = {

    }
    $scope.listRenewalSummaryTemplates = [];
    $scope.cprRenewalSummaryTemplate = {
        id: '',
        productNatureId: '',
        cPRMainSectionId: '',
        cPRSubSectionId: '',
        active: true,
        mainSection: '',
        subSection: ''
    };
    $scope.listMainSection = [];
    $scope.listSubSection = [];
    $scope.productList = [
        {
            id: 1,
            name: 'Revolving'
        },
        {
            id: 2,
            name: 'Non-Revolving'
        }
    ];
    $scope.product = {
        id: '',
        name: ''
    };
    $scope.SaveMainSection = function () {
        try {
            //alert("click");
            $http({
                url: "/Admin/SaveMainSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRMainSectionModel: $scope.mainSectionModel })
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    alert("save!!");
                    $scope.LoadAllMainSection();
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };

    $scope.LoadAllMainSection = function () {
        try {
            // alert("click");
            $http({
                url: "/Admin/GetAllMainSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: null
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    $scope.listMainSection = response.data.output;
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };
    $scope.LoadAllSubSection = function () {
        try {
            // alert("click");
            $http({
                url: "/Admin/GetAllSubSection",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: null
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    $scope.listSubSection = response.data.output;
                    $scope.GetRenewalSummaryTemplate();
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };

    $scope.Init = function () {
        $scope.LoadAllMainSection();
        $scope.LoadAllSubSection();
       
        
    }

    //$scope.items = [1, 2, 3, 4, 5];
    //$scope.selected = [1];
    //$scope.toggle = function (item, list) {
    //    var idx = list.indexOf(item);
    //    if (idx > -1) {
    //        list.splice(idx, 1);
    //    }
    //    else {
    //        list.push(item);
    //    }
    //};

    //$scope.exists = function (item, list) {
    //    return list.indexOf(item) > -1;
    //};

    $scope.isIndeterminate = function (mainSectionId) {

        $scope.selectedSubSection = $filter('filter')($scope.listSubSection, { isSelected: true, cPRMainSectionId: mainSectionId }, true);
        $scope.avaiSubSection = $filter('filter')($scope.listSubSection, { cPRMainSectionId: mainSectionId }, true);
        return ($scope.selectedSubSection.length !== 0 &&
            $scope.selectedSubSection.length !== $scope.avaiSubSection.length);
    };

    $scope.isChecked = function () {
        return $scope.renewalSummaryTemplates.length === $scope.listSubSection.length;
    };

    $scope.toggleAll = function (mainSectionId, select) {
        try {
            $scope.listRenewalSummaryTemplates = $scope.listRenewalSummaryTemplates || [];

            $scope.avaiSubSection1 = $filter('filter')($scope.listSubSection, { cPRMainSectionId: mainSectionId });
            angular.forEach($scope.avaiSubSection1, function (value, index) {
                var itemIndex = $scope.listSubSection.indexOf(value);
                value.isSelected = !select;
                $scope.listSubSection[itemIndex] = value;

                $scope.cprRenewalSummaryTemplate.productNatureId = $scope.product.id;
                $scope.cprRenewalSummaryTemplate.cPRMainSectionId = mainSectionId;
                $scope.cprRenewalSummaryTemplate.cPRSubSectionId = $scope.listSubSection[itemIndex].id;

                if (value.isSelected == true) {
                    $scope.listRenewalSummaryTemplates.push($scope.cprRenewalSummaryTemplate);

                    $scope.cprRenewalSummaryTemplate = {
                        id: '',
                        productNatureId: '',
                        cPRMainSectionId: '',
                        cPRSubSectionId: '',
                        active: true,
                        mainSection: '',
                        subSection: ''
                    };
                } else {
                    //var i = $scope.listRenewalSummaryTemplates.indexOf($scope.cprRenewalSummaryTemplate);
                    //$scope.listRenewalSummaryTemplates[i].active = false;
                    angular.forEach($scope.listRenewalSummaryTemplates, function (value, index) {
                        $scope.listRenewalSummaryTemplates[index].active = false;
                    });

                    $scope.cprRenewalSummaryTemplate = {
                        id: '',
                        productNatureId: '',
                        cPRMainSectionId: '',
                        cPRSubSectionId: '',
                        active: true,
                        mainSection: '',
                        subSection: ''
                    };
                }
            });
        } catch (ex) {
            alert("toggleAll " + ex);
        }
        
        
    };

    $scope.toggleSingleCheckbox = function (subItem) {
        try {
            $scope.listRenewalSummaryTemplates = $scope.listRenewalSummaryTemplates || [];
            var mainSection = $filter('filter')($scope.listMainSection, { id: subItem.cPRMainSectionId });
            var itemIndex = $scope.listMainSection.indexOf(mainSection[0]);
            $scope.listMainSection[itemIndex].isSelected = false;

            $scope.cprRenewalSummaryTemplate.productNatureId = $scope.product.id;
            $scope.cprRenewalSummaryTemplate.cPRMainSectionId = subItem.cPRMainSectionId;
            $scope.cprRenewalSummaryTemplate.cPRSubSectionId = subItem.id;

            if (subItem.isSelected == true) {
                var filteredItem = $filter('filter')($scope.listRenewalSummaryTemplates, { productNatureId: $scope.product.id, cPRMainSectionId: subItem.cPRMainSectionId, cPRSubSectionId: subItem.id })[0];
                var i = $scope.listRenewalSummaryTemplates.indexOf(filteredItem);
                //$scope.listRenewalSummaryTemplates.splice(i, 1);
                $scope.listRenewalSummaryTemplates[i].active = false;

                $scope.cprRenewalSummaryTemplate = {
                    id: '',
                    productNatureId: '',
                    cPRMainSectionId: '',
                    cPRSubSectionId: '',
                    active: true,
                    mainSection: '',
                    subSection: ''
                };
            } else {
                $scope.listRenewalSummaryTemplates.push($scope.cprRenewalSummaryTemplate);

                $scope.cprRenewalSummaryTemplate = {
                    id: '',
                    productNatureId: '',
                    cPRMainSectionId: '',
                    cPRSubSectionId: '',
                    active: true,
                    mainSection: '',
                    subSection: ''
                };
            }
        } catch (ex) {
            alert("toggleSingleCheckbox " + ex);
        }
        
    };

    $scope.SaveRenewalSummaryTemplate = function () {
        try {
            //alert("click");
            if ($scope.RenewalSummaryTemplateValidation()) {
                $http({
                    url: "/Admin/SaveRenewalSummaryTemplate",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ listRenewalSummaryTemplates: $scope.listRenewalSummaryTemplates })
                }).then(function successCallback(response) {
                    //common.preprocesshide();
                    if (response.data.success) {
                        alert("saved!!");
                        $scope.LoadAllMainSection();
                    }
                }, function errorCallback(response) {
                    //common.preprocesshide();
                    $scope.error = response;
                });
            }
            
        } catch (e) {
            alert("Exception SaveRenewalSummaryTemplate" + e);
        }
    };

    $scope.GetRenewalSummaryTemplate = function () {
        try {
            // alert("click");
            $http({
                url: "/Admin/GetRenewalSummaryTemplate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: null
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    $scope.listRenewalSummaryTemplates = response.data.output;
                    if ($scope.listRenewalSummaryTemplates != null) {
                        var mainSectionFlag = true;
                        angular.forEach($scope.listRenewalSummaryTemplates, function (value, index) {
                            var filteredItem = $filter('filter')($scope.listSubSection, { id: value.cPRSubSectionId })[0];
                            var itemIndex = $scope.listSubSection.indexOf(filteredItem);
                            $scope.listSubSection[itemIndex].isSelected = true;
                        });
                        angular.forEach($scope.listMainSection, function (value, index) {                           
                            $scope.TotalMainItem = $filter('filter')($scope.listSubSection, { cPRMainSectionId: value.id});
                            $scope.SelectedMainItem = $filter('filter')($scope.listSubSection, { cPRMainSectionId: value.id, isSelected: true });
                                if ($scope.TotalMainItem.length === $scope.SelectedMainItem.length) {
                                    $scope.listMainSection[index].isSelected = true;
                                }
                                else {
                                    $scope.listMainSection[index].isSelected = false;
                                }
                            
                        });

                    }
                    $scope.product = $filter('filter')($scope.productList, { id: $scope.listRenewalSummaryTemplates[0].cPRSubSectionId })[0];
                }
            }, function errorCallback(response) {
                //common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception SaveMainSection" + e);
        }
    };

    $scope.RenewalSummaryTemplateValidation = function () {
        try {
            var flag = $filter('filter')($scope.listRenewalSummaryTemplates, { active: true });
            if (flag.length <= 0) {
                alert("Please select at least one item...");
                return false;
            }
            else {
                return true;
            }
        } catch (ex) {
            alert("Exception RenewalSummaryTemplateValidation" + e);
        }
    };
}));