(app.controller("DelegationCtrl", function ($scope, $http, $filter, dialogService) {
    /// .................. Variable

    $scope.temtype = 0;

    $scope.conditionsModel = {
        id: 0,
        dalevelid: null,
        daassociatefieldmodel: null,
        condition: null,
        value: null,
        daoperator: null,
        level: null,
        levelid: null,
        active: true,
        editor: null,
        modified: null,
        author: null,
        created: null
    };
    $scope.levelModel = {
        no: 0,
        id: null,
        tmplatename: null,
        damasterid: null,
        roleid: null,
        daactivityid: null,
        level: null,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null,
        levelid: 0
    };

    $scope.listConditions = [];
    $scope.listDisplayConditions = [];
    $scope.listRole = [];
    $scope.listActivity = [];
    $scope.listAssociatField = [];
    $scope.listTemplates = [];
    $scope.listDeleteDaLevels = [];
    $scope.moduleList = [];
    $scope.dalevelModel = {
        no: 0,
        id: null,
        tmplatename: null,
        damasterid: null,
        rolemodel: null,
        daactivitymodel: null,
        level: null,
        active: null,
        editor: null,
        modified: null,
        author: null,
        created: null
    };
    $scope.listDaLevels = [];
    $scope.levelRowCount = 0;
    $scope.conditionRowCount = 0;
    $scope.tempcCnditionRowCount = 0;
    $scope.editTemplate = null;
    $scope.CurrentEditdalevelModel = {};
    $scope.CurrentEditdalevelModel.level = "";
    $scope.templateid = null;
    $scope.isEdit = false;
    $scope.editlevelIndex = -1;
    $scope.moduleId = 0;
    $scope.selectedModule = null;
    /// ............... Function
    //Events

    $scope.Page_Load = function () {
        $scope.listDisplayConditions = [];
        GetModuleList();
        GetRoles();
        GetActivity();
        GetAssociateField();
        GetTemplates();
    };

    ///.............Get Module
    function GetModuleList() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetModuleList",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                common.preprocesshide();
                if (response.data.success) {
                    console.log(response.data);
                    $scope.moduleList = response.data.output;
                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });
        } catch (e) {
            common.preprocesshide();
            alert("Exception GetCustomerSegmantAndProductList  " + e);
        }
    };
    $scope.changeModule = function () {
        var module = $filter('filter')($scope.moduleList, { Value: $scope.moduleId }, true);
        $scope.selectedModule = module[0].Text;
    }
    //$scope.addConditionRow = function () {
    //    if ($scope.conditionsModel != null && $scope.conditionsModel.condition != null && $scope.conditionsModel.value != null) {
    //        if ($scope.tempcCnditionRowCount > 0) {
    //            if ($scope.listDisplayConditions != null) {
    //                var getLastLevel = $filter("orderBy")($scope.listDisplayConditions, 'no', true)[0];
    //                $scope.tempcCnditionRowCount = getLastLevel.no + 1;
    //            } else {
    //                $scope.tempcCnditionRowCount = 1;
    //            }
    //        } else {
    //            $scope.tempcCnditionRowCount++;
    //            if (!$scope.isEdit) {
    //                $scope.dalevelModel.levelid = $scope.levelRowCount + 1;
    //                $scope.levelRowCount++;
    //            }
    //        }

    //        var daassociatefieldmodel = {
    //            'id': $scope.conditionsModel.daassociatefieldmodel.id,
    //            'name': $scope.conditionsModel.daassociatefieldmodel.caption,
    //            'caption': $scope.conditionsModel.daassociatefieldmodel.caption,
    //            'active': true,
    //            'author': 1,
    //            'created': '',
    //            'editor': 1,
    //            'modified': ''
    //        };

    //        if (!$scope.isEdit) {
    //            var obj = $filter("filter")($scope.listConditions, {
    //                condition: $scope.conditionsModel.condition, active: true, daassociatefieldmodel: daassociatefieldmodel, daoperator: $scope.conditionsModel.daoperator,
    //                level: $scope.dalevelModel.level, levelid: $scope.dalevelModel.levelid, value: $scope.conditionsModel.value
    //            })[0];
    //            if (!obj) {
    //                $scope.listConditions.push({
    //                    'no': $scope.tempcCnditionRowCount,
    //                    'value': $scope.conditionsModel.value,
    //                    'condition': $scope.conditionsModel.condition,
    //                    'daoperator': $scope.conditionsModel.daoperator,
    //                    'daassociatefieldmodel': daassociatefieldmodel,
    //                    'templatename': $scope.dalevelModel.tmplatename,
    //                    'level': $scope.dalevelModel.level,
    //                    'levelid': $scope.dalevelModel.levelid,
    //                    'active': true,
    //                    'isChecked':true
    //                });
    //            }

    //        }       

    //        var no = $scope.listDisplayConditions.length + 1;
    //        $scope.listDisplayConditions.push({
    //            'no': $scope.tempcCnditionRowCount,
    //            'value': $scope.conditionsModel.value,
    //            'condition': $scope.conditionsModel.condition,
    //            'daoperator': $scope.conditionsModel.daoperator,
    //            'daassociatefieldmodel': daassociatefieldmodel,
    //            'templatename': $scope.dalevelModel.tmplatename,
    //            'level': $scope.dalevelModel.level,
    //            'levelid': $scope.dalevelModel.levelid
    //        });
    //    }
    //    $scope.conditionsModel = {
    //        id: 0,
    //        dalevelid: null,
    //        daassociatefieldmodel: null,
    //        condition: null,
    //        value: null,
    //        daoperator: null,
    //        level: null,
    //        levelid: null,
    //        active: null,
    //        editor: null,
    //        modified: null,
    //        author: null,
    //        created: null
    //    };
    //};

    $scope.addConditionRow = function () {
   
        if ($filter("filter")($scope.listDaLevels, { level: $scope.dalevelModel.level }).length > 0 && $scope.dalevelModel.level !== $scope.CurrentEditdalevelModel.level) {

            swal("Validation!", "Authority Level no. cannot duplicate...", "info");
        }
        else {
            if ($scope.tempcCnditionRowCount > 0) {
                if ($scope.listDisplayConditions != null && $scope.listDisplayConditions.length > 0) {
                    var getLastLevel = $filter("orderBy")($scope.listDisplayConditions, 'no', true)[0];
                    $scope.tempcCnditionRowCount = getLastLevel.no + 1;
                } else {
                    $scope.tempcCnditionRowCount = 1;
                }
            } else {
                $scope.tempcCnditionRowCount++;
                if (!$scope.isEdit) {
                    $scope.dalevelModel.levelid = $scope.levelRowCount + 1;
                    $scope.levelRowCount++;
                }
            }

            var daassociatefieldmodel = {
                'id': $scope.conditionsModel.daassociatefieldmodel.id,
                'name': $scope.conditionsModel.daassociatefieldmodel.caption,
                'caption': $scope.conditionsModel.daassociatefieldmodel.caption,
                'active': true,
                'author': 1,
                'created': '',
                'editor': 1,
                'modified': ''
            };

            if (!$scope.isEdit) {
                var obj = $filter("filter")($scope.listConditions, {
                    condition: $scope.conditionsModel.condition, active: true, daassociatefieldmodel: daassociatefieldmodel, daoperator: $scope.conditionsModel.daoperator,
                    level: $scope.dalevelModel.level, levelid: $scope.dalevelModel.levelid, value: $scope.conditionsModel.value
                })[0];
                if (!obj) {
                    $scope.listConditions.push({
                        'no': $scope.tempcCnditionRowCount,
                        'value': $scope.conditionsModel.value,
                        'condition': $scope.conditionsModel.condition,
                        'daoperator': $scope.conditionsModel.daoperator,
                        'daassociatefieldmodel': daassociatefieldmodel,
                        'templatename': $scope.dalevelModel.tmplatename,
                        'level': $scope.dalevelModel.level,
                        'levelid': $scope.dalevelModel.levelid,
                        'active': true,
                        'isChecked': true
                    });
                }
            }

            var no = $scope.listDisplayConditions.length + 1;
            $scope.listDisplayConditions.push({
                'no': $scope.tempcCnditionRowCount,
                'value': $scope.conditionsModel.value,
                'condition': $scope.conditionsModel.condition,
                'daoperator': $scope.conditionsModel.daoperator,
                'daassociatefieldmodel': daassociatefieldmodel,
                'templatename': $scope.dalevelModel.tmplatename,
                'level': $scope.dalevelModel.level,
                'levelid': $scope.dalevelModel.levelid,
                'active': true,
                'isChecked': true
            });

            //$scope.conditionsModel = null;
            $scope.conditionsModel = {
                id: 0,
                dalevelid: null,
                daassociatefieldmodel: null,
                condition: null,
                value: null,
                daoperator: null,
                level: null,
                levelid: null,
                active: null,
                editor: null,
                modified: null,
                author: null,
                created: null
            };

        }

    };

    $scope.removeCondition = function (item) {
        if (confirm("Are you sure you want to DELETE this condition?") == true) {
            if (!$scope.isEdit) {
                var obj = $filter("filter")($scope.listConditions, { no: item.no })[0];
                var index = $scope.listConditions.indexOf(obj);
                if (index >= 0)
                    $scope.listConditions.splice(index, 1);

                var obj1 = $filter("filter")($scope.listDisplayConditions, { no: item.no })[0];
                var index1 = $scope.listDisplayConditions.indexOf(obj1);
                if (index1 >= 0)
                    $scope.listDisplayConditions.splice(index1, 1);
            } else {
                if (item.id != null) {
                    var obj = $filter("filter")($scope.listConditions, { level: item.level, levelid: item.levelid, id: item.id })[0];
                    var obj1 = $filter("filter")($scope.listDisplayConditions, { level: item.level, levelid: item.levelid, id: item.id })[0];
                }
                else {
                    var obj = item;
                    var obj1 = item;
                }

                var index = $scope.listConditions.indexOf(obj);
                if (index >= 0)
                    $scope.listConditions[index].active = false;


                var index1 = $scope.listDisplayConditions.indexOf(obj1);
                if (index1 >= 0)
                    $scope.listDisplayConditions.splice(index1, 1);
            }
        }
    };

    //Same level authority validation
    function CheckLevelExist() {
        if ($scope.listDaLevels.length > 0) {
            v = false;
            $scope.listDaLevels.forEach(function (x) {
                if (x.level == $scope.dalevelModel.level) {
                    v = true;
                }
            });
            return v
        }
        else
            return false
    };
    //$scope.addLevelRow = function () {
    //    if ($scope.dalevelModel.tmplatename == null && $scope.temtype == 0) {
    //        dialogService.ConfirmDialogWithOkay('', "Please insert template name..!");
    //    } else if ($scope.dalevelModel.level == null) {
    //        dialogService.ConfirmDialogWithOkay('', "Level no cannot empty..!");
    //    } else if ($scope.dalevelModel.rolemodel == null) {
    //        dialogService.ConfirmDialogWithOkay('', "Authority cannot empty..!");
    //    } else if ($scope.dalevelModel.daactivitymodel == null) {
    //        dialogService.ConfirmDialogWithOkay('', "Activity cannot empty..!");
    //    }
    //    //else if (CheckLevelExist()) {
    //    //    dialogService.ConfirmDialogWithOkay('', "Please change Authority Level..!");
    //    //}
    //    else {
    //        if (!$scope.isEdit) {

    //            $scope.levelRowCount = $scope.listDaLevels.length + 1;

    //            $scope.listDaLevels.push({
    //                'no': $scope.levelRowCount,
    //                'module': $scope.selectedModule,
    //                'tmplatename': $scope.dalevelModel.tmplatename,
    //                'damasterid': $scope.dalevelModel.damasterid,
    //                'rolemodel': $scope.dalevelModel.rolemodel,
    //                'daactivitymodel': $scope.dalevelModel.daactivitymodel,
    //                'level': $scope.dalevelModel.level,
    //                'active': true,
    //                'id': 0,
    //                'levelid': $scope.dalevelModel.levelid
    //            });

    //        } else {
    //            $scope.listDaLevels[$scope.editlevelIndex].module = $scope.selectedModule;
    //            $scope.listDaLevels[$scope.editlevelIndex].rolemodel = $scope.dalevelModel.rolemodel;
    //            $scope.listDaLevels[$scope.editlevelIndex].daactivitymodel = $scope.dalevelModel.daactivitymodel;

    //        }
    //        $scope.listDisplayConditions.length = 0;
    //        $scope.dalevelModel.daactivitymodel = null;
    //        $scope.dalevelModel.rolemodel = null;
    //        $scope.isEdit = false;
    //        $scope.conditionRowCount = 0;
    //        $scope.tempcCnditionRowCount = 0;

    //    }
    //};

    $scope.addLevelRow = function () {
        if ($scope.dalevelModel.tmplatename == null && $scope.temtype == 0) {
            //alert("Please insert template name..!");
            swal("Validation!", "Please insert template name...", "info");
        } else if ($scope.dalevelModel.level == null) {
            //alert("Authority Level no. cannot empty..!");
            swal("Validation!", "Authority Level no. cannot empty...", "info");
        } else if ($filter("filter")($scope.listDaLevels, { level: $scope.dalevelModel.level }).length > 0 && $scope.dalevelModel.level !== $scope.CurrentEditdalevelModel.level) {
            //alert("Authority Level no. cannot duplicate..!");
            swal("Validation!", "Authority Level no. cannot duplicate...", "info");
        } else if ($scope.dalevelModel.rolemodel == null) {
            //alert("Authority  cannot empty..!");
            swal("Validation!", "Authority cannot empty...", "info");
        } else if ($scope.dalevelModel.daactivitymodel == null) {
            //alert("Activity cannot empty..!");
            swal("Validation!", "Activity cannot empty...", "info");
        } else {
            if (!$scope.isEdit) {
                try {
                    if ($scope.dalevelModel.conditionWise) {
                        $scope.dalevelModel.daregionmodel.range = $scope.dalevelModel.darangemodel;
                        if ($scope.dalevelModel.rolemodel.scope == 4)
                            $scope.dalevelModel.dabranchmodel.region = $scope.dalevelModel.daregionmodel;
                    }
                    else {

                        $scope.dalevelModel.dabranchmodel = null;
                        $scope.dalevelModel.daregionmodel = null;
                        $scope.dalevelModel.darangemodel = null;
                    }

                } catch (e) {
                    //alert(e);
                    swal("Something went wrong!", "Error", "error");
                }
                if ($scope.dalevelModel.dabranchmodel != null)
                    $scope.dalevelModel.dabranchmodel.name = $scope.dalevelModel.dabranchmodel.Name;
                if ($scope.dalevelModel.daregionmodel != null)
                    $scope.dalevelModel.daregionmodel.name = $scope.dalevelModel.daregionmodel.Name;

                $scope.listDaLevels.push({
                    'no': $scope.levelRowCount,
                    'tmplatename': $scope.dalevelModel.tmplatename,
                    'damasterid': $scope.dalevelModel.damasterid,
                    'rolemodel': $scope.dalevelModel.rolemodel,
                    'daactivitymodel': $scope.dalevelModel.daactivitymodel,
                    'level': $scope.dalevelModel.level,
                    'active': true,
                    'id': 0,
                    'levelid': $scope.dalevelModel.levelid,
                    'branch': $scope.dalevelModel.dabranchmodel,
                    'region': $scope.dalevelModel.daregionmodel,
                    'range': $scope.dalevelModel.darangemodel,
                    'conditionWise': $scope.dalevelModel.conditionWise
                });

            } else {
                try {
                    if ($scope.dalevelModel.conditionWise) {
                        $scope.dalevelModel.daregionmodel.range = $scope.dalevelModel.darangemodel;
                        if ($scope.dalevelModel.rolemodel.scope == 4)
                            $scope.dalevelModel.dabranchmodel.region = $scope.dalevelModel.daregionmodel;
                    }
                    else {
                        $scope.dalevelModel.dabranchmodel = null;
                        $scope.dalevelModel.daregionmodel = null;
                        $scope.dalevelModel.darangemodel = null;
                    }

                } catch (e) {
                    swal("Something went wrong!", "Error", "error");
                }
                if ($scope.dalevelModel.dabranchmodel != null)
                    $scope.dalevelModel.dabranchmodel.name = $scope.dalevelModel.dabranchmodel.Name;
                if ($scope.dalevelModel.daregionmodel != null)
                    $scope.dalevelModel.daregionmodel.name = $scope.dalevelModel.daregionmodel.Name;

                $scope.listDaLevels[$scope.editlevelIndex].rolemodel = $scope.dalevelModel.rolemodel;
                $scope.listDaLevels[$scope.editlevelIndex].daactivitymodel = $scope.dalevelModel.daactivitymodel;
                $scope.listDaLevels[$scope.editlevelIndex].conditionWise = $scope.dalevelModel.conditionWise;
                $scope.listDaLevels[$scope.editlevelIndex].branch = $scope.dalevelModel.dabranchmodel;
                $scope.listDaLevels[$scope.editlevelIndex].region = $scope.dalevelModel.daregionmodel;
                $scope.listDaLevels[$scope.editlevelIndex].range = $scope.dalevelModel.darangemodel;
                $scope.listDaLevels[$scope.editlevelIndex].level = $scope.dalevelModel.level;

                $scope.updateDisplayConditionOnEdit($scope.listDisplayConditions);
            }

            $scope.tempcCnditionRowCount = 0;
            if ($scope.isEdit) {
                copyCondition();
                $scope.dalevelModel.level++;
            } else {
                $scope.dalevelModel.level++;
                copyCondition();
            }
            $scope.dalevelModel.daactivitymodel = null;
            $scope.dalevelModel.rolemodel = null;
            $scope.isEdit = false;
            $scope.conditionRowCount = 0;
            $scope.dalevelModel.darangemodel = null;
            $scope.dalevelModel.daregionmodel = null;
            $scope.dalevelModel.dabranchmodel = null;
            $scope.dalevelModel.conditionWise = false;
        }
    };

    function copyCondition() {
        $scope.tempcCnditionRowCount = 0;
        $scope.copyConditionList = [];
        angular.forEach($scope.listDisplayConditions, function (item) {
            if (item.isChecked) {
                if ($scope.tempcCnditionRowCount > 0) {
                    if ($scope.listDisplayConditions != null) {
                        var getLastLevel = $filter("orderBy")($scope.listDisplayConditions, 'no', true)[0];
                        $scope.tempcCnditionRowCount = getLastLevel.no + 1;
                    } else {
                        $scope.tempcCnditionRowCount = 1;
                    }
                } else {
                    $scope.tempcCnditionRowCount++;
                    if (!$scope.isEdit) {
                        $scope.dalevelModel.levelid = $scope.levelRowCount + 1;
                        $scope.levelRowCount++;
                    }
                }
                item.no = $scope.tempcCnditionRowCount;
                item.levelid = $scope.dalevelModel.levelid;
                item.level = $scope.dalevelModel.level;
                $scope.copyConditionList.push(item);
                //$scope.listConditions.push(item);

                var obj = $filter("filter")($scope.listConditions, {
                    condition: item.condition, active: true,
                    daassociatefieldmodel: item.daassociatefieldmodel, daoperator: item.daoperator, level: item.level, levelid: item.levelid, value: item.value
                })[0];
                if (!obj) {
                    $scope.listConditions.push({
                        'no': $scope.tempcCnditionRowCount,
                        'value': item.value,
                        'condition': item.condition,
                        'daoperator': item.daoperator,
                        'daassociatefieldmodel': item.daassociatefieldmodel,
                        'templatename': item.tmplatename,
                        'level': $scope.dalevelModel.level,
                        'levelid': $scope.dalevelModel.levelid,
                        'active': true,
                        'isChecked': true
                    });
                }
            }
        });

    };

    $scope.listDisplayConditions = $scope.copyConditionList;

    $scope.updateDisplayConditionOnEdit = function (listOfDisplayCondition) {
        try {
            angular.forEach(listOfDisplayCondition, function (item) {
                var indexInlistCondition = $scope.listConditions.indexOf(item);
                item.level = $scope.dalevelModel.level;
                if (indexInlistCondition >= 0) {
                    $scope.listConditions[indexInlistCondition] = item;
                } else {
                    var obj = $filter("filter")($scope.listConditions, {
                        condition: item.condition, active: true,
                        daassociatefieldmodel: item.daassociatefieldmodel, daoperator: item.daoperator, level: item.level, levelid: item.levelid, value: item.value
                    })[0];
                    if (!obj) {
                        $scope.listConditions.push({
                            'no': $scope.tempcCnditionRowCount,
                            'value': item.value,
                            'condition': item.condition,
                            'daoperator': item.daoperator,
                            'daassociatefieldmodel': item.daassociatefieldmodel,
                            'templatename': item.tmplatename,
                            'level': item.level,
                            'levelid': item.levelid,
                            'active': true,
                            'isChecked': item.isChecked
                        });
                    }
                }
            }, $scope.listConditions);
        } catch (e) {
            swal("Update Conditon error!", "Error", "error");
        }
    };

    $scope.removeLevel = function (item) {
        if (confirm("Are you sure you want to DELETE this Level?") == true) {
            var obj = $filter("filter")($scope.listDaLevels, { no: item })[0];
            var index = $scope.listDaLevels.indexOf(obj);
            $scope.listDeleteDaLevels.push(obj);
            $scope.listDaLevels.splice(index, 1);
            $scope.objConditions = $filter("filter")($scope.listConditions, { levelid: obj.levelid });
            angular.forEach($scope.objConditions, function (objloop) {
                var objconn = $filter("filter")($scope.listConditions, { levelid: objloop.levelid })[0];
                var indexconn = $scope.listConditions.indexOf(objconn);
                if (indexconn >= 0)
                    $scope.listConditions.splice(indexconn, 1);
                
            });
            $scope.conditionRowCount = 0;
        }
    };

    $scope.editLevel = function (item) {
        if (confirm("Are you sure you want to Edit this Level?") == true) {
            var obj = $filter("filter")($scope.listDaLevels, { no: item.no })[0];
            $scope.editlevelIndex = $scope.listDaLevels.indexOf(obj);

            $scope.objRole = $filter("filter")($scope.listRole, { id: obj.rolemodel.id });
            $scope.dalevelModel.rolemodel = $scope.objRole[0];

            $scope.objActivity = $filter("filter")($scope.listActivity, { id: obj.daactivitymodel.id });
            $scope.dalevelModel.daactivitymodel = $scope.objActivity[0];

            /*$scope.listDisplayConditions = $filter("filter")($scope.listConditions, { level: obj.level, levelid: obj.levelid, active: true });*/
            $scope.listDisplayConditions = $filter("filter")($scope.listConditions, { level: obj.level, levelid: obj.levelid });
            $scope.isEdit = true;

            $scope.dalevelModel.levelid = obj.levelid;
            $scope.dalevelModel.level = obj.level;
            $scope.CurrentEditdalevelModel.level = $scope.dalevelModel.level;
        }
    };

    $scope.submitDAEvent = function () {
        SubmitDALevel();
    };
    $scope.cancelDAEvent = function () {
        $scope.listConditions.length = 0;
        $scope.listDaLevels.length = 0;
        $scope.temtype = 0;
        $scope.dalevelModel = null;
    };
    //Methods
    function GetRoles() {
        try {
            $http({
                url: "/Master/GetRoles",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listRole: $scope.role })
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

    function GetActivity() {
        try {
            $http({
                url: "/Master/GetActivity",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listActivity: $scope.Activity })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listActivity = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetActivity: " + e);
        }
    };

    function GetAssociateField() {
        try {
            $http({
                url: "/Master/GetAssociateField",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ listAssociatField: $scope.AssociatField })
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listAssociatField = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAssociateField: " + e);
        }
    };

    function GetTemplates() {
        try {
            $http({
                url: "/Master/GetTemplates",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                }
            }).then(function successCallback(response) {
                if (response.data.success)
                    $scope.listTemplates = response.data.output;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAssociateField: " + e);
        }
    };

    $scope.Search = function () {

        var dd = $scope.editTemplate;

        try {
            $http({
                url: "/Master/SearchConditions",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ editTemplate: $scope.editTemplate })
            }).then(function successCallback(response) {
                if (response.data.success)

                    $scope.listConditions = response.data.output.listDAConditionModel;
                $scope.listDaLevels = response.data.output.listDALevelModel;
                $scope.templateid = response.data.output.templateid;
                $scope.dalevelModel.tmplatename = $scope.editTemplate.name;

                //$scope.dalevelModel.daactivitymodel = null;
                //$scope.dalevelModel.rolemodel = null;

            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDALevel ' + e);
        }

    };

    $scope.SearchTemplate = function (item) {

        // var dd = $scope.editTemplate;
        var dd = item;
        try {
            $http({
                url: "/Master/SearchConditions",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                //data: JSON.stringify({ editTemplate: $scope.editTemplate })
                data: JSON.stringify({ editTemplate: item })
            }).then(function successCallback(response) {
                if (response.data.success)

                    $scope.listConditions = response.data.output.listDAConditionModel;
                $scope.listDaLevels = response.data.output.listDALevelModel;
                $scope.templateid = response.data.output.templateid;
                $scope.dalevelModel.tmplatename = $scope.editTemplate.name;

                //$scope.dalevelModel.daactivitymodel = null;
                //$scope.dalevelModel.rolemodel = null;

            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDALevel ' + e);
        }

    };

    function SubmitDALevel() {
        var dd = $scope.editTemplate;
        var submitModel = {
            listDAConditionModel: $scope.listConditions,
            listDALevelModel: $scope.listDaLevels,
            templateid: $scope.templateid,
            listDeleteDaLevels: $scope.listDeleteDaLevels,
            moduleId: $scope.moduleId
        }
        try {
            $http({
                url: "/Master/SubmitDALevel",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ templateConditionModel: submitModel })
            }).then(function successCallback(response) {
                if (response.data.success)
                    dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully);
                $scope.listConditions.length = 0;
                $scope.listDaLevels.length = 0;
                $scope.temtype = 0;
                $scope.dalevelModel = null;


            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDALevel ' + e);
        }

    };

    $scope.Page_Load();

    $scope.SubmitBaseRate = function () {
        var dd = $scope.editTemplate;
        var submitModel = {
            listDAConditionModel: $scope.listConditions,
            listDALevelModel: $scope.listDaLevels,
            templateid: $scope.templateid,
            listDeleteDaLevels: $scope.listDeleteDaLevels
        }
        try {
            $http({
                url: "/Master/BaseRateChange",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cprId: 50279 })
            }).then(function successCallback(response) {
                if (response.data.success)
                    alert("Successfully Submitted");



            }, function errorCallback(response) {

            });
        } catch (e) {
            alert('SubmitDALevel ' + e);
        }

    };
    ////////////////////////////
    $scope.settingsList = [];
    $scope.listDAApprovalQueue = [];
    $scope.listDAQueueMapping = [];
    $scope.listDisplayQueue = [];
    $scope.dibNo = "";
    $scope.roleUser = null;
    $scope.listWfUser = [];
    $scope.mappingUser = {
        id: 0,
        daqueueid: null,
        roleid: null,
        userid: null,
        level: null,
        rolename: null,
        username: null,
        status: null,
        isselecteduser: null,
        hierarchylevel: null
    };

    $scope.addUser = function (get) {

        if ($scope.listWfUser.length != 0) {
            if ($filter("filter")($scope.listWfUser, { userId: get.userId }).length == 0) {
                var level = $scope.listDAApprovalQueue[$scope.listDAApprovalQueue.length - 1].level + 1;

                $scope.mappingUser = {
                    id: 0,
                    daqueueid: "",
                    roleid: $scope.selectedrole.id,
                    userid: get.userId,
                    level: level,
                    rolename: $scope.selectedrole.name,
                    username: get.displayName,
                    status: true,
                    isselecteduser: true,
                    hierarchylevel: null
                };
                $scope.listWfUser.push(get);
                $scope.listDAQueueMapping.push($scope.mappingUser);
                $scope.roleUser = null;
            }
        } else {
            var level = 1;

            $scope.mappingUser = {
                id: 0,
                daqueueid: "",
                roleid: $scope.selectedrole.id,
                userid: get.userId,
                level: level,
                rolename: $scope.selectedrole.name,
                username: get.displayName,
                status: true,
                isselecteduser: true,
                hierarchylevel: null
            };
            $scope.listWfUser.push(get);
            $scope.listDAQueueMapping.push($scope.mappingUser);
            $scope.roleUser = null;
        }

    };

    $scope.removeUser = function (item) {
        if (confirm("Are you sure you want to DELETE this User?") == true) {
            var obj = $filter("filter")($scope.listWfUser, { userId: item })[0];
            var index = $scope.listWfUser.indexOf(obj);
            $scope.listWfUser.splice(index, 1);


        }
    };

    $scope.changeUser = function (item) {
        if (confirm("Are you sure you want to CHANGE this User?") == true) {
            var obj = $filter("filter")($scope.listWfUser, { userId: item })[0];
            var index = $scope.listWfUser.indexOf(obj);
            $scope.listWfUser.splice(index, 1);


        }
    };

    $scope.AddRole = function (get) {

        var level = $scope.listDAApprovalQueue[$scope.listDAApprovalQueue.length - 1].level + 1;

        $scope.listDAApprovalQueue.push({
            roleid: $scope.selectedrole.id, rolename: $scope.selectedrole.name, level: level, isselected: true
            , parallel: $scope.selectedrole.parallel
            , minapproval: $scope.selectedrole.minapproval
            , bypass: $scope.selectedrole.bypass
            , parallel: $scope.selectedrole.Parallel
            , approvalmasterid: $scope.selectedrole.approvalmasterid
        });

        $scope.listWfUser.length = 0;
        $scope.selectedrole = null;

    };


    $scope.clickClear = function () {
        if (confirm("Are you sure you want to Clear this?") == true) {
            $scope.listWfUser.length = 0;
            $scope.selectedrole = null;
            $scope.roleUser = null;
            $scope.cprno = null;
            $scope.listDAApprovalQueue.length = 0;
        }
    };

}));