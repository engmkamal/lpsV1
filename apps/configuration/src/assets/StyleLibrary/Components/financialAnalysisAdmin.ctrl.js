(app.controller("financialAnalysisAdminCtrl", ["$scope", "$rootScope", "$http", "$filter", "dialogService", function ($scope, $rootScope, $http, $filter, dialogService) {

    $scope.temtype = 0;
    $scope.faTemplate = {
        id: 0,
        template: null,
        active: true
    };
    $scope.listFACategory = [
        {
            id: 1,
            category: "IncomeStatement",
            active: true
        },
        {
            id: 2,
            category: "Assets",
            active: true
        },
        {
            id: 3,
            category: "Liabilities",
            active: true
        },
        {
            id: 4,
            category: "CashFlow",
            active: true
        },
        {
            id: 5,
            category: "Ratios",
            active: true
        }
    ];
    $scope.faitem = {
        id: 0,
        fACategory: null,
        style: null,
        level: null,
        title: null,
        isSubHeading: null,
        isSubtotal: null,
        sign: null,
        isPercent: null,
        calculations: [],
        novalues: null,
        visible: null,
        active: true
    };
    $scope.facal = {
        id: 0,
        preOp: "0",
        item1: null,
        op: null,
        item2: null,
        item1Level: "0",
        item2Level: "0",
        constantNumber: null
    };
    $scope.fastyle = {
        backgroundColor: null,
        fontBold: null,
        fontColor: null,
        fontItalic: null
    };
    $scope.listFAItems = [];
    $scope.incomeStatementItems = [];
    $scope.assetItems = [];
    $scope.liabilitiesItems = [];
    $scope.cashflowItems = [];
    $scope.keyratioItems = [];

    $scope.CopyTemplate_ClickEvent = function (item) {
        CopyTemplate(item);
    };


    $scope.AddFAItemCalculation_ClickEvent = function (item) {
        //DO VALIDATION...
        AddFAItemCalculation(item);
    };

    $scope.RemoveFAItemCalculation_ClickEvent = function (item) {
        RemoveFAItemCalculation(item);
    };


    $scope.AddFAItem_ClickEvent = function (item) {
        AddFAItem(item);
    };

    $scope.EditFAItem_ClickEvent = function (item) {
        EditFAItem(item);
    };

    $scope.RemoveFAItem_ClickEvent = function (item) {
        var confirm = dialogService.ConfirmDialogWithYesNo('', "Are you sure you want to delete this item?");
        confirm.then(function () {
            RemoveFAItem(item);
        }, function () {

        });
    };


    $scope.ChangeTemplate = function () {
        GetFAItemsByFATemplateId($scope.faTemplate.id, false);
    };

    $scope.ChangeRequestAction = function () {
        $scope.faTemplate = {
            id: 0,
            template: '',
            active: true
        };
        $scope.incomeStatementItems = [];
        $scope.assetItems = [];
        $scope.liabilitiesItems = [];
        $scope.cashflowItems = [];
        $scope.keyratioItems = [];
    };

    $scope.faSortableOptions = {
        stop: function (e, ui) {
            for (var index in $scope.table1) {
                $scope.table1[index].order = Number(index) + 1;
            }
        }
    };

    $scope.submitFAEvent = function () {
        //Save Action
        SaveFATemplate();
    };

    $scope.cancelFAEvent = function () {
        $scope.temtype = 0;
        ResetFAItemCalculation();
        ResetFAItem();

        $scope.faTemplate = {
            id: 0,
            template: '',
            listFAItems: [],
            active: true
        };
        $scope.incomeStatementItems = [];
        $scope.assetItems = [];
        $scope.liabilitiesItems = [];
        $scope.cashflowItems = [];
        $scope.keyratioItems = [];
    };

    //FA Item Style
    function GetFAItemStyle(item) {
        try {
            var backgroundColor =  "background-color:" + item.backgroundColor + ";";
            var fontBold = item.fontBold == "true" || item.fontBold == true ? "font-weight:bold;" : "";
            var fontColor = "color:" + item.fontColor + ";";
            var fontItalic = item.fontItalic == "true" || item.fontItalic == true ? "font-style:italic;" : "";

            var style = backgroundColor + fontBold + fontColor + fontItalic;
            return style;
        } catch (e) {
            alert('GetFAItemStyle ' + e);
        }
    }

    function BreakFAItemStyle(item) {
        try {
            var styles = item.style.split(';');
            var i;
            var obj = {
                backgroundColor: null,
                fontBold: false,
                fontColor: null,
                fontItalic: false,
            };
            for (i = 0; i < styles.length; i++) {
                var values = styles[i].split(':');
                if (styles[i].includes("background-color")) {
                    obj.backgroundColor = values[1];
                } else if (styles[i].includes("font-weight")) {
                    obj.fontBold = values[1] == 'bold'? true : false;
                } else if (styles[i].includes("color")) {
                    obj.fontColor = values[1];
                } else if (styles[i].includes("font-style")) {
                    obj.fontItalic = values[1] == 'italic' ? true : false;
                }
            }

            return obj;
        } catch (e) {
            alert('BreakFAItemStyle ' + e);
        }
    }

    //FA Item
    function ResetFAItem() {
        $scope.faitem = {
            id: 0,
            fACategory: null,
            style: null,
            level: null,
            title: null,
            isSubHeading: null,
            isSubtotal: null,
            sign: null,
            isPercent: null,
            calculations: [],
            novalues: null,
            visible: null,
            active: true
        };

        $scope.fastyle = {
            backgroundColor: null,
            fontBold: null,
            fontColor: null,
            fontItalic: null
        };
    }

    function AddFAItem(item) {
        try {
            var list;
            switch (item.fACategory.category) {
                case "IncomeStatement": list = $scope.incomeStatementItems;
                    break;
                case "Assets": list = $scope.assetItems;
                    break;
                case "Liabilities": list = $scope.liabilitiesItems;
                    break;
                case "CashFlow": list = $scope.cashflowItems;
                    break;
                case "Ratios": list = $scope.keyratioItems;
                    break;
            }

            item.style = GetFAItemStyle($scope.fastyle);

            if (list == null)
                list = [];

            if (item.index != null)
                list.splice(item.index, 0, item);
            else
                list.push(item);

            ResetFAItem();
        } catch (e) {
            alert('AddFAItem ' + e);
        }
    }

    function EditFAItem(item) {
        try {
            //LOAD

            $scope.faitem = item;
            $scope.faitem.sign = item.sign == '-' ? "0" : "1";
            $scope.fastyle = BreakFAItemStyle(item);
            //SPLICE
            var list;
            switch (item.fACategory.category) {
                case "IncomeStatement": list = $scope.incomeStatementItems;
                    break;
                case "Assets": list = $scope.assetItems;
                    break;
                case "Liabilities": list = $scope.liabilitiesItems;
                    break;
                case "CashFlow": list = $scope.cashflowItems;
                    break;
                case "Ratios": list = $scope.keyratioItems;
                    break;
            }

            var index = list.indexOf(item);
            $scope.faitem.index = index;
            list.splice(index, 1);
        } catch (e) {
            alert('EditFAItem ' + e);
        }        
    }

    function RemoveFAItem(item) {
        try {
            var list;
            switch (item.fACategory.category) {
                case "IncomeStatement": list = $scope.incomeStatementItems;
                    break;
                case "Assets": list = $scope.assetItems;
                    break;
                case "Liabilities": list = $scope.liabilitiesItems;
                    break;
                case "CashFlow": list = $scope.cashflowItems;
                    break;
                case "Ratios": list = $scope.keyratioItems;
                    break;
            }

            var index = list.indexOf(item);
            if (item.id !== 0) {
                list[index].active = false;
            }
            else if (item.id === 0) {
                list.splice(index, 1);
            }
        } catch (e) {
            alert('RemoveFAItem ' + e);
        }
    }


    //FA Item Calculation
    function AddFAItemCalculation(item) {
        try {
            if ($scope.faitem.calculations == null)
                $scope.faitem.calculations = [];

            var preop = getOperatorValue(item.preOp);
            var op = getOperatorValue(item.op);
            var item1Level = getColumnLevel(item.item1Level);
            var item2Level = getColumnLevel(item.item2Level);

            var obj = {
                id: item.id,
                preOp: preop,
                incomeStatementId1: item.item1,
                incomeStatement1Val: item1Level,
                incomeStatementId2: item.item2,
                incomeStatement2Val: item2Level,
                op: op,
                constantNumber: item.constantNumber,
                active: true
            };

            $scope.faitem.calculations.push(obj);
            ResetFAItemCalculation();

        } catch (e) {
            alert('AddFAItemCalculation ' + e);
        }
    }

    function ResetFAItemCalculation() {
        $scope.facal = {
            id: 0,
            preOp: null,
            item1: null,
            op: null,
            item2: null,
            item1Level: null,
            item2Level: null,
            constantNumber: null
        };
    }

    function getColumnLevel(level) {
        var val = 0;
        switch (level) {
            case 0: val = 0;
                break;
            case 1: val = -1;
                break;
            case 2: val = -2;
                break;
            case 3: val = 1;
                break;
            case 4: val = 2;
                break;
            default: val = 0;
                break;
        }
        return val;
    }

    function getOperatorValue(op) {
        var preop = "NA";
        switch (op) {
            case "0": preop = "NA";
                break;
            case "1": preop = "+";
                break;
            case "2": preop = "-";
                break;
            case "3": preop = "*";
                break;
            case "4": preop = "/";
                break;
            default: preop = "NA";
        }

        return preop;
    }

    function RemoveFAItemCalculation(item) {
        try {
            var index = $scope.faitem.calculations.indexOf(item);
            if (item.id !== 0) {                
                $scope.faitem.calculations[index].active = false;
            }
            else if (item.id === 0) {
                $scope.faitem.calculations.splice(index, 1);
            }
        } catch (e) {
            alert('RemoveFAItemCalculation ' + e);
        }
    }

    function GetFAItemsByFATemplateId(fatemplateid, copyTemplate) {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetFAItemsByFATemplateId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { fATemplateId: fatemplateid }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listFAItems = response.data.output;

                    if (copyTemplate) {
                        if ($scope.listFAItems != null && $scope.listFAItems.length > 0) {
                            var i;
                            for (i = 0; i < $scope.listFAItems.length; i++) {
                                $scope.listFAItems[i].id = 0;

                                if ($scope.listFAItems[i].calculations != null && $scope.listFAItems[i].calculations.length > 0) {
                                    var j;
                                    for (j = 0; j < $scope.listFAItems[i].calculations.length; j++) {
                                        $scope.listFAItems[i].calculations[j].id = 0;
                                    }
                                }

                            }
                        }
                    }

                    $scope.incomeStatementItems = $filter('filter')($scope.listFAItems, { fACategory: { category: 'IncomeStatement' } });
                    $scope.assetItems = $filter('filter')($scope.listFAItems, { fACategory: { category: 'Assets' } });
                    $scope.liabilitiesItems = $filter('filter')($scope.listFAItems, { fACategory: { category: 'Liabilities' } });
                    $scope.cashflowItems = $filter('filter')($scope.listFAItems, { fACategory: { category: 'CashFlow' } });
                    $scope.keyratioItems = $filter('filter')($scope.listFAItems, { fACategory: { category: 'Ratios' } });

                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetFAItemsByFATemplateId ' + e);
        }
    }

    function GetAllFinancialAnalysisTemplate() {
        try {
            common.preprocessload();
            $http({
                url: "/Admin/GetAllFinancialAnalysisTemplates",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({})
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.listTemplates = response.data.output;
                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
                common.preprocesshide();
            });
        } catch (e) {
            common.preprocesshide();
            alert('GetAllFinancialAnalysisTemplate ' + e);
        }
    }

    function CopyTemplate(item) {
        try {
            GetFAItemsByFATemplateId(item.id, true);

        } catch (e) {
            alert('CopyTemplate ' + e);
        }
    }

    function ChangeFAItemLevel(list) {
        try {
            if (list != null && list.length > 0) {
                var i;
                for (i = 0; i < list.length; i++) {
                    list[i].level = i + 1;
                }
            }

            return list;
        } catch (e) {
            alert('ChangeFAItemLevel ' + e);
        }
    }

    function SaveFATemplate() {
        try {

            if ($scope.faTemplate != null && $scope.faTemplate.template != null) {
                //CONCAT
                $scope.listFAItems = $scope.listFAItems.concat(ChangeFAItemLevel($scope.incomeStatementItems));
                $scope.listFAItems = $scope.listFAItems.concat(ChangeFAItemLevel($scope.assetItems));
                $scope.listFAItems = $scope.listFAItems.concat(ChangeFAItemLevel($scope.liabilitiesItems));
                $scope.listFAItems = $scope.listFAItems.concat(ChangeFAItemLevel($scope.cashflowItems));
                $scope.listFAItems = $scope.listFAItems.concat(ChangeFAItemLevel($scope.keyratioItems));
                if ($scope.listFAItems.length > 0) {
                    //continue save
                    //Save
                    alert('This function is currently under development. Please try again in the next release.');
                } else {
                    alert('Invalid Request. Please add atleast one item.');
                }

            } else {
                alert('Invalid Request. Please complete the form.');
            }
        } catch (e) {
            common.preprocesshide();
            alert('SaveFATemplate ' + e);
        }
    }

    //Page_Load
    function Page_Load() {
        GetAllFinancialAnalysisTemplate();
    }

    Page_Load();

}]));