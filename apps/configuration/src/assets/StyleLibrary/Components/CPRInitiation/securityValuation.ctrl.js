/*const { dialog } = require("bootbox");*/

(app.controller("SecurityValuationCtrl", function ($scope, $http, $filter, $location, $mdDialog, $rootScope, $timeout, dialogService) {

    $scope.isSelectedFacility = false;
    $scope.securityEvaluationComment = null;
    $scope.valuationEvaluationComment = null;
    $scope.isPropertyEdited = false;
    $scope.isOtherSecurityEdited = false;
    $scope.isEquipmentEdited = false;
    $scope.isVichleEdited = false;
    $scope.isShareEdited = false;
    $scope.isFinancialEdited = false;

    $scope.valuation = {
        id: null,
        facilityno: null,
        security: {
            id: null,
            value: null,
            active: false,
            typeId: null
        },
        valuerName: null,
        valuer: null,
        isBackListed: null,
        forcedSaleValue: null,
        rrv: null,
        marketValue: null,
        propotionValue: null,
        dateOfValuation: null,
        insuranceValue: null,
        ltv: null,
        collateralValue: null,
        distancefromBank: null,
        acceptabilityofSecurity: null,
        valuationexpiryDate: null,
        remarks: null,
        listUDFValues: [],
        valuerType: null,
        active: true
    };
    $scope.IsblacklistedValue = ['No', 'Yes'];
    $scope.listChargeType = [
        { "name": "Lien", "value": "Lien" },
        { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
        { "name": "Registered Mortgage", "value": "Registered Mortgage" },
        { "name": "Register 1st Charge", "value": "Register 1st Charge" },
        { "name": "Register 2nd Charge", "value": "Register 2nd Charge" },
        { "name": "Register(Paripassu Charge)", "value": "Register(Paripassu Charge)" },
        { "name": "Equitable Mortgage", "value": "Equitable Mortgage" },
        { "name": "TPA(Registered)", "value": "TPA(Registered)" },
        { "name": "TPA(Un- Registered)", "value": "TPA(Un- Registered)" },
        { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
        { "name": "Simple Hypothecation", "value": "Simple Hypothecation" }
    ];
    $scope.securityOfferModel = {
        id: null,
        securitytype: null,
        evaluationComment: null,
        listEquipmentSecurityDetailModel: null,
        listPropertySecurityDetailModel: null,
        listVehicleSecurityDetailModel: null,
        listOtherSecurityDetailModel: null,
        listCPRSecurityGuarantorModel: null,
        listFinancialInstrumentSecurityDetailModel: null,
        listShareCertificateSecurityDetailModel: null,
        active: true
    };
    $scope.equipmentDetails = {
        id: null,
        facilityno: null,
        detailofequipment: null,
        noOfUnit: null,
        currency: null,
        price: null,
        make: null,
        model: null,
        supplier: null,
        countryOfOriginEquipment:null,
        active: true
    };

    $scope.otherDetails = {
        id: null,
        facilityno: null,
        description: null,
        currency: null,
        value: null,
        ownerofsecurity: null,
        othersecurity: null,
        remark: null,
        active: true
    };
    $scope.vehicleDetails = {
        id: null,
        facilityno: null,
        registrationNo: null,
        engineno: null,
        chasisno: null,
        make: null,
        model: null,
        typeofbody: null,
        meterReading: null,
        seatingcapacity: null,
        fueltype: null,
        vehicleclass: null,
        cylindercapacity: null,
        securitytype: null,
        yom: null,
        countryoforigin: null,
        statuswhenregisted: null,
        extraoptions: null,
        supplier: null,
        marketabilityofassets: null,
        remarks: null,
        active: true
    };
    $scope.propertyDetails = {
        id: null,
        facilityno: null,
        typeofbond: null,
        propertytype: null,
        value: null,
        address: null,
        city: null,
        lotno: null,
        deedno: null,
        extent: null,
        serveyplanno: null,
        serveyorname: null,
        serveyplandate: null,
        supplier: null,
        comment: null,
        distanceFromBranch: null,
        detailOfLandAndBuilding: null,
        typeofland: null,
        ownershiptitletransferdate: null,
        modeofownershiptransfer: null,
        valueaspertitledate: null,
        flatArea: null,
        district: null,
        thana: null,
        mouja: null,
        cSKhatianaNo: null,
        cSKhatianaDrag: null,
        sAKhatianaNo: null,
        sAKhatianaDrag: null,
        rSKhatianaNo: null,
        rSKhatianaDrag: null,
        cityJorisKhatianaNo: null,
        cityJorisKhatianaDrag: null,
        active: true,

        //new
        ownerName: null,
        joteOrTaxHoldingNo: null,
        holdingNo: null,
        typeOfDeed: null,
        titleDeedOrPOA: null,
        dateOfDeedRegistration: null,
        nameOfSubregistryOffice: null,
        areaOfConstruction: null,
        approchRoad: null,
        natureOfLand: null,
        presentUse: null,
        demarcation: null,
        undevidedOrUnmarketedProportionateLandArea: null,
        flatOrShopNo: null,
        locationOfFlat: null,
        cityCorporationHoldingNo: null,
        nameOfBuilding: null,
        nameOfProject: null,
        nameOfDeveloper: null,
        rehabMembershipNoOfDeveloper: null,
        tripartiteAgreement: null,
        bSKhatianaNo: null,
        bSKhatianaDrag: null,
        mutationKhatianaNo: null,
        leaseholdProperty: null,
        buildingExistInTheLand: null,
        sizeOfBuilding: null,
        noOfFloor: null
    };
    $scope.shareCertificate = {
        id: null,
        facilityno: null,
        certificateName: null,
        issuingAuthority: null,
        interestRate: 0,
        valuationDate: null,
        active: true
    };

    $scope.financialInstrument = {
        id: null,
        facilityno: null,
        issuingBank: null,
        issuingBranch: null,
        faceValue: null,
        nameOfInstrument: null,
        issueDate: null,
        expiryDate: null,
        lienAmount: null,
        lienDate: null,
        lienConfirmationDate: null,
        active: true
    };
    $scope.cPRSecurityGuarantor = {
            id: null,
            cPRSecurityOfferId: null,
            name: null,
            age: null,
            phoneNo: null,
            address: null,
            relationshipWithParty: null,
            occupation: null,
            yearlyIncome: null,
            netWorth: null,
            facilityno: null,
            active: true
    };

    $scope.listSearchCustomerResult = [];
   // $scope.cprinit.listCPRFacilities = [];
    //---------------------------Security Detail Start----------------------------------
    function Page_Load() {
        try {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            if (spHostUrl != null) {
                common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
            }
            var cprId = GetUrlParameters();
            if (cprId != null) {

                GetValuationByCPRId(cprId);
                if ($scope.cprinit.listCPRFacilities.length > 0) {
                    FilterFacilityForPersonalGuarantor();
                }
                
                //Get All UDF
                // $scope.listCPRValuation = $scope.cprinit.listCPRValuation;
            }
            common.pageloadhide();
        } catch (e) {
            alert("Page_Load " + e);
        }
    }

    function SubmitDraftCPRForGurantee() {
        try {
            $scope.trigedSubmit = true;

            $scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index] = $scope.borrowerprofile;
            if ($scope.selectedTemplate != null)
                $scope.cprinit.financialTemplateTypeModel = $scope.selectedTemplate;
            if ($scope.listCPRBusinessSupportingPapersDetails != null) {
                $scope.cprinit.listCPRBusinessSupportingPapersDetails = $scope.listCPRBusinessSupportingPapersDetails;
            }

            //BindStakeHolderDate(null);
            $http({
                url: "/CPR/DraftCPRForGuranteValue",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ cPRModel: $scope.cprinit })
            }).then(function successCallback(response) {

                if (response.data.success) {
                    
                    $scope.trigedSubmit = false;
                    common.preprocesshide();
      
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }
                else {
                    common.preprocesshide();
                    $scope.trigedSubmit = false;
                    dialogService.ConfirmDialogWithOkay('', response.data.message);
                }

            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });

        } catch (e) {
            common.preprocesshide();
            $scope.trigedSubmit = false;
            alert('SubmitDraftCPR ' + e);
        }
    }

    $scope.NonNegetiveValue = function (value) {
        if (value < 0) {
            dialogService.ConfirmDialogWithOkay('', "Value should not be negetive");
           // $scope.cprinit.enableSaveDraft = false;
        } else {
          //  $scope.cprinit.enableSaveDraft = true;
        }
    };
    $scope.currentDate = $filter('date')(new Date(), 'MM-dd-yyyy');
    $scope.DateValidationLien = function (lienDate, lienConfirm) {
        if (lienDate != null && lienConfirm != null) {
            var lienDate = new Date(lienDate);
            var lienConfirm = new Date(lienConfirm);
            if (lienDate > lienConfirm)
                dialogService.ConfirmDialogWithOkay('', "lienDate can not be greater than lienConfirmDate!");
        }
    };
    $scope.DateValidationIE = function (issueDate, expiryDate) {
        if (issueDate != null && expiryDate != null) {
            var issuedate = new Date(issueDate);
            var expiryDate = new Date(expiryDate);
            if (issuedate > expiryDate)
                dialogService.ConfirmDialogWithOkay('', "IssueDate can not be greater than expiryDate!");
        }
        
    };
    $scope.DateValidationValExp = function (valuation, expiryDate) {
        if (valuation != null && expiryDate != null) {
            var valuation = new Date(valuation);
            var expiryDate = new Date(expiryDate);
            if (valuation > expiryDate) {
                dialogService.ConfirmDialogWithOkay('', "Date of Valuation can not be greater than expiryDate!");
                $scope.valuation.valuationexpiryDate = "";
            }
                
        }
        
    };
    $scope.DropdownSecurityDetailFaclityNo_ChangeEvent = function (item) {
        try {
            if (item != null)
                $scope.isSelectedFacility = true;
                DropdownSecurityDetailFaclityNo_Function(item);
        } catch (e) {
            alert("Exception DropdownSecurityDetailFaclityNo_ChangeEvent " + e);
        }
    };
    function DropdownSecurityDetailFaclityNo_Function(item) {
        try {
            $scope.securityEvaluationComment = item.listSecurityOffer[0].evaluationComment;
            for (var i = 0; i < item.listSecurityOffer.length; i++) {
                var val = item.listSecurityOffer[i].securitytype.type;
                //$scope.securityEvaluationComment = item.listSecurityOffer[0].evaluationComment;
                if (val !== null) {
                    switch (val) {
                        case "Equipment":
                            if (item.listSecurityOffer[i].listEquipmentSecurityDetailModel == null)
                                item.listSecurityOffer[i].listEquipmentSecurityDetailModel = [];
                            $scope.equipmentDetails.facilityno = item.facilityno;
                            break;

                        case "Vehicle":
                            if (item.listSecurityOffer[i].listVehicleSecurityDetailModel == null)
                                item.listSecurityOffer[i].listVehicleSecurityDetailModel = [];
                            $scope.vehicleDetails.facilityno = item.facilityno;
                            break;

                        case "Property":
                            if (item.listSecurityOffer[i].listPropertySecurityDetailModel == null)
                                item.listSecurityOffer[i].listPropertySecurityDetailModel = [];
                            $scope.propertyDetails.facilityno = item.facilityno;
                            break;

                        case "Other":
                            if (item.listSecurityOffer[i].listOtherSecurityDetailModel == null)
                                item.listSecurityOffer[i].listOtherSecurityDetailModel = [];
                            $scope.otherDetails.facilityno = item.facilityno;
                            break;
                        case "ShareCertificate":
                            if (item.listSecurityOffer[i].listShareCertificateSecurityDetailModel == null)
                                item.listSecurityOffer[i].listShareCertificateSecurityDetailModel = [];
                            $scope.shareCertificate.facilityno = item.facilityno;
                            break;
                        case "FDR":
                            if (item.listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel == null)
                                item.listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel = [];
                            $scope.financialInstrument.facilityno = item.facilityno;
                            break;

                        default:
                            if (item.listSecurityOffer[i].listOtherSecurityDetailModel == null)
                                item.listSecurityOffer[i].listOtherSecurityDetailModel = [];
                            $scope.otherDetails.facilityno = item.facilityno;
                            //loadAdditionalSecurities(item.listSecurityOffer[i].securitytype.id);
                            break;

                    }
                    //for Guarantor
                    if (item.listSecurityOffer[i].listCPRSecurityGuarantorModel == null)
                        item.listSecurityOffer[i].listCPRSecurityGuarantorModel = [];
                    $scope.cPRSecurityGuarantor = item.listSecurityOffer[i].listCPRSecurityGuarantorModel;
                }
            }
        } catch (e) {
            alert("Exception DropdownSecurityDetailFaclityNo_Function" + e);
        }
    }

    //PERSONAL GURANTOR
    $scope.getGuaranteeValuesTotal = function (facility) {
        var total = 0;
        if (facility != null && facility.product != null) {
            for (var i = 0; i < $scope.cprinit.listBorrowerProfiles.length; i++) {
                if ($scope.cprinit.listBorrowerProfiles[i].product != null) {
                    if ($scope.cprinit.listBorrowerProfiles[i].product.id == facility.product.id && $scope.cprinit.listBorrowerProfiles[i].active == true) {
                        var profile = $scope.cprinit.listBorrowerProfiles[i];
                        if (profile.guaranteeValue != null && !isNaN(profile.guaranteeValue))
                            total += profile.guaranteeValue;
                      
                    }
                }
            }
           

        }
        return total;
    };

    $scope.getGurantorValue = function (profile) {
        console.log(profile);
    }

    function FilterFacilityForPersonalGuarantor() {
        try {
            var listFacilities = $scope.cprinit.listCPRFacilities;
     
            angular.forEach(listFacilities, function (facility) {
                angular.forEach(facility.listSecurityOffer, function (securityOffer) {
                    if (securityOffer.securitytype.type == "Personal Guarantor") {
                        var index = GetArrayIndexByValue($scope.listPersnalGurantorLoanFacility, 'id', facility.id);
                        if (index == -1)
                            $scope.listPersnalGurantorLoanFacility.push(facility);
                    }
                })
            });
        } catch (e) {
            alert("FilterFacilityForPersonalGuarantor " + e);
        }
    }

    //Equipment DETAIL
    $scope.AddEquipmentDetailsBtn_ClickEvent = function (facility, securityoffer, equipment) {
        try {

            if ($scope.equipmentForm.$valid)
                if (facility != null && securityoffer != null && equipment != null) {
                    $scope.isEquipmentEdited = false;
                    AddEquipmentDetails_Function(facility, securityoffer, equipment);
                }

        } catch (e) {
            alert("Exception AddEquipmentDetailsBtn_ClickEvent " + e);
        }
    };

    function AddEquipmentDetails_Function(facility, securityoffer, equipment) {
        try {
            var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
            if (i != -1 || i != null)
                var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);

            if (i != -1 && j != -1) {
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listEquipmentSecurityDetailModel.push(equipment);
                ResetEquipmentDetailsModel(equipment.facilityno);
            }
        } catch (e) {
            alert("Exception AddEquipmentDetails_Function " + e);
        }
    }

    $scope.ResetEquipmentDetailsBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetEquipmentDetailsModel(fNo);
    };

    function ResetEquipmentDetailsModel(fNo) {
        $scope.equipmentDetails = {
            id: '',
            facilityno: fNo,
            detailofequipment: '',
            currency: '',
            price: '',
            make: '',
            model: '',
            supplier: '',
            active: true
        };
        $scope.equipmentForm.$setPristine();
        $scope.equipmentForm.$setUntouched();
    }

    $scope.EditEquipmentDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null)
                $scope.isEquipmentEdited = true;
                BindEquipmentDetailValues(list, item);
        } catch (e) {
            alert("Exception EditEquipmentDetailTableItem_ClickEvent " + e);
        }
    };

    $scope.RemoveEquipmentDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'Equipment');
                if (status) {

                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }
        } catch (e) {
            alert("Exception RemoveEquipmentDetails_ClickEvent " + e);
        }
    };

    function BindEquipmentDetailValues(list, item) {
        try {
            if (!angular.isUndefined(item.id))
                $scope.equipmentDetails.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.equipmentDetails.facilityno = item.facilityno;

            if (!angular.isUndefined(item.detailofequipment))
                $scope.equipmentDetails.detailofequipment = item.detailofequipment;

            if (!angular.isUndefined(item.currency) && item.currency != null)
                $scope.equipmentDetails.currency = GetDefaultCurrency(item.currency.type);

            if (!angular.isUndefined(item.price))
                $scope.equipmentDetails.price = item.price;

            if (!angular.isUndefined(item.make))
                $scope.equipmentDetails.make = item.make;

            if (!angular.isUndefined(item.model))
                $scope.equipmentDetails.model = item.model;

            if (!angular.isUndefined(item.supplier))
                $scope.equipmentDetails.supplier = item.supplier;

            if (!angular.isUndefined(item.noOfUnit))
                $scope.equipmentDetails.noOfUnit = item.noOfUnit;

            if (!angular.isUndefined(item.countryOfOriginEquipment))
                $scope.equipmentDetails.countryOfOriginEquipment = item.countryOfOriginEquipment;

            if (!angular.isUndefined(item.active))
                $scope.equipmentDetails.active = item.active;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindEquipmentDetailValues: " + e);
        }
    }

    //Vahicle detail
    $scope.AddVehicleDetailsBtn_ClickEvent = function (facility, securityoffer, vehicle) {
        try {
            if ($scope.vehicleForm.$valid)
                if (facility != null && securityoffer != null && vehicle != null)
                    AddVehicleDetails_Function(facility, securityoffer, vehicle);
        } catch (e) {
            alert("Exception AddVehicleDetailsBtn_ClickEvent " + e);
        }
    };

    function AddVehicleDetails_Function(facility, securityoffer, vehicle) {
        try {
            var i = GetArrayIndexByValue($scope.cprinit.listCPRFacilities, 'id', facility.id);
            if (i != null && i != -1)
                var j = GetArrayIndexByValue($scope.cprinit.listCPRFacilities[i].listSecurityOffer, 'id', securityoffer.id);

            if (i != -1 && j != -1) {
                if (vehicle.yom == null)
                  /*  vehicle.yom = tempYOM;*/
                if ($scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listVehicleSecurityDetailModel == null)
                        $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listVehicleSecurityDetailModel = [];
                $scope.isVichleEdited = false;
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listVehicleSecurityDetailModel.push(vehicle);
                ResetVehicleDetailsModel(vehicle.facilityno);
            }
        } catch (e) {
            alert("Exception AddVehicleDetails_Function" + e);
        }
    }

    function ResetVehicleDetailsModel(fNo) {
        $scope.vehicleDetails = {
            id: '',
            facilityno: fNo,
            registrationNo: '',
            engineno: '',
            chasisno: '',
            make: '',
            model: '',
            typeofbody: '',
            meterReading: '',
            seatingcapacity: '',
            fueltype: '',
            vehicleclass: '',
            cylindercapacity: '',
            securitytype: '',
            yom: '',
            countryoforigin: '',
            statuswhenregisted: '',
            extraoptions: '',
            supplier: '',
            marketabilityofassets: '',
            remarks: '',
            active: true
        };
        $scope.searchText.yom = '';
        $scope.vehicleForm.$setPristine();
        $scope.vehicleForm.$setUntouched();
    }

    $scope.ResetVehicleDetailsBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetVehicleDetailsModel(fNo);
    };

    $scope.EditVehicleDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null)
                $scope.isVichleEdited = true;
                BindVehicleDetailValues(list, item);
        } catch (e) {
            alert("Exception EditVehicleDetailTableItem_ClickEvent " + e);
        }
    };

    $scope.RemoveVehicleDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'Vehicle');
                if (status) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }

        } catch (e) {
            alert("Exception RemoveVehicleDetails_ClickEvent " + e);
        }
    };

    function BindVehicleDetailValues(list, item) {
        try {
            if (!angular.isUndefined(item.id))
                $scope.vehicleDetails.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.vehicleDetails.facilityno = item.facilityno;

            if (!angular.isUndefined(item.registrationNo))
                $scope.vehicleDetails.registrationNo = item.registrationNo;

            if (!angular.isUndefined(item.engineno))
                $scope.vehicleDetails.engineno = item.engineno;

            if (!angular.isUndefined(item.chasisno))
                $scope.vehicleDetails.chasisno = item.chasisno;

            if (!angular.isUndefined(item.make))
                $scope.vehicleDetails.make = item.make;

            if (!angular.isUndefined(item.model))
                $scope.vehicleDetails.model = item.model;

            if (!angular.isUndefined(item.typeofbody) && item.typeofbody != null)
                $scope.vehicleDetails.typeofbody = $scope.listVehicleBodyTypes[GetArrayIndexByValue($scope.listVehicleBodyTypes
                    , null
                    , item.typeofbody)];

            if (!angular.isUndefined(item.meterReading))
                $scope.vehicleDetails.meterReading = item.meterReading;

            if (!angular.isUndefined(item.seatingcapacity))
                $scope.vehicleDetails.seatingcapacity = item.seatingcapacity;

            if (!angular.isUndefined(item.fueltype) && item.fueltype != null)
                $scope.vehicleDetails.fueltype = $scope.listFuelTypes[GetArrayIndexByValue($scope.listFuelTypes
                    , null
                    , item.fueltype)];

            if (!angular.isUndefined(item.vehicleclass))
                $scope.vehicleDetails.vehicleclass = item.vehicleclass;

            if (!angular.isUndefined(item.cylindercapacity))
                $scope.vehicleDetails.cylindercapacity = item.cylindercapacity;

            if (!angular.isUndefined(item.securitytype) && item.securitytype != null)
                $scope.vehicleDetails.securitytype = $scope.listVehicleSecurityType[GetArrayIndexByValue($scope.listVehicleSecurityType
                    , null
                    , item.securitytype)];

            if (!angular.isUndefined(item.yom))
                $scope.vehicleDetails.yom = item.yom;

            if (!angular.isUndefined(item.countryoforigin))
                $scope.vehicleDetails.countryoforigin = item.countryoforigin;

            if (!angular.isUndefined(item.statuswhenregisted) && item.statuswhenregisted != null)
                $scope.vehicleDetails.statuswhenregisted = $scope.listVehicleStatusWhenRegister[GetArrayIndexByValue($scope.listVehicleStatusWhenRegister
                    , null
                    , item.statuswhenregisted)];

            if (!angular.isUndefined(item.extraoptions))
                $scope.vehicleDetails.extraoptions = item.extraoptions;

            if (!angular.isUndefined(item.supplier))
                $scope.vehicleDetails.supplier = item.supplier;

            if (!angular.isUndefined(item.marketabilityofassets) && item.marketabilityofassets != null)
                $scope.vehicleDetails.marketabilityofassets = $scope.listMarketability[GetArrayIndexByValue($scope.listMarketability
                    , null
                    , item.marketabilityofassets)];

            if (!angular.isUndefined(item.remarks))
                $scope.vehicleDetails.remarks = item.remarks;

            if (!angular.isUndefined(item.active))
                $scope.vehicleDetails.active = item.active;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindVehicleDetailValues: " + e);
        }
    }

    //PropertyDetails
    $scope.AddPropertyDetailsBtn_ClickEvent = function (facility, securityoffer, property) {
        try {
             if (facility != null && securityoffer != null && property != null) {
                 $scope.isPropertyEdited = false;
                 AddPropertyDetails_Function(facility, securityoffer, property);
             }
                
        } catch (e) {
            alert("Exception AddPropertyDetailsBtn_ClickEvent " + e);
        }
    };

    function AddPropertyDetails_Function(facility, securityoffer, property) {
        try {
            var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
            if (i != -1 || i != null)
                var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);
            if (i != -1 && j != -1) {
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listPropertySecurityDetailModel.push(property);
                ResetPropertyDetailsModel(property.facilityno);
     
            }
        } catch (e) {
            alert("Exception AddPropertyDetails_Function" + e);
        }
    }

    $scope.ResetPropertyDetailsBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetPropertyDetailsModel(fNo);
    };

    function ResetPropertyDetailsModel(fNo) {
        $scope.propertyDetails = {
            id: '',
            facilityno: fNo,
            typeofbond: '',
            propertytype: '',
            value: '',
            address: '',
            city: '',
            lotno: '',
            deedno: '',
            extent: '',
            serveyplanno: '',
            serveyorname: '',
            serveyplandate: '',
            supplier: '',
            comment: '',
            distanceFromBranch: '',
            detailOfLandAndBuilding: '',
            typeofland: '',
            ownershiptitletransferdate: '',
            modeofownershiptransfer: '',
            valueaspertitledate: '',
            active: true
        };
        $scope.propertyForm.$setPristine();
        $scope.propertyForm.$setUntouched();
    }
    $scope.EditPropertyDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null)
                $scope.isPropertyEdited = true;
                BindPropertyDetailValues(list, item);
        } catch (e) {
            alert("Exception EditPropertyDetailTableItem_ClickEvent " + e);
        }
    };

    function BindPropertyDetailValues(list, item) {
        try {
            if (!angular.isUndefined(item.id))
                $scope.propertyDetails.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.propertyDetails.facilityno = item.facilityno;

            if (!angular.isUndefined(item.typeofbond) && item.typeofbond != null)
                $scope.propertyDetails.typeofbond = $scope.listPropertyTypeOfBond[GetArrayIndexByValue($scope.listPropertyTypeOfBond
                    , null
                    , item.typeofbond)];

            if (!angular.isUndefined(item.propertytype) && item.propertytype != null)
                $scope.propertyDetails.propertytype = $scope.listPropertyType[GetArrayIndexByValue($scope.listPropertyType
                    , null
                    , item.propertytype)];

            if (!angular.isUndefined(item.value))
                $scope.propertyDetails.value = item.value;

            if (!angular.isUndefined(item.address))
                $scope.propertyDetails.address = item.address;

            if (!angular.isUndefined(item.city))
                $scope.propertyDetails.city = item.city;

            if (!angular.isUndefined(item.lotno))
                $scope.propertyDetails.lotno = parseInt(item.lotno);

            if (!angular.isUndefined(item.deedno))
                $scope.propertyDetails.deedno = parseInt(item.deedno);

            if (!angular.isUndefined(item.extent))
                $scope.propertyDetails.extent = item.extent;

            if (!angular.isUndefined(item.serveyplanno))
                $scope.propertyDetails.serveyplanno = item.serveyplanno;

            if (!angular.isUndefined(item.serveyorname))
                $scope.propertyDetails.serveyorname = item.serveyorname;

            if (!angular.isUndefined(item.serveyplandate))
                $scope.propertyDetails.serveyplandate = item.serveyplandate;
            //$scope.propertyDetails.serveyplandate = new Date(item.serveyplandate);
            if (item.serveyplandate != null) {
                $scope.ADtoBS(item.serveyplandate, 'propertyDetails.serveyplandate_np');
                // $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].individual.dob, 'cprinit.listBorrowerProfiles[' + i + '].individual.dob_np');
            }

            if (!angular.isUndefined(item.supplier))
                $scope.propertyDetails.supplier = item.supplier;

            if (!angular.isUndefined(item.comment))
                $scope.propertyDetails.comment = item.comment;
            if (!angular.isUndefined(item.distanceFromBranch))
                $scope.propertyDetails.distanceFromBranch = item.distanceFromBranch;

            if (!angular.isUndefined(item.detailOfLandAndBuilding))
                $scope.propertyDetails.detailOfLandAndBuilding = item.detailOfLandAndBuilding;

            if (!angular.isUndefined(item.typeofland))
                $scope.propertyDetails.typeofland = item.typeofland;

            if (!angular.isUndefined(item.ownershiptitletransferdate))
                $scope.propertyDetails.ownershiptitletransferdate = item.ownershiptitletransferdate;

            if (item.ownershiptitletransferdate != null) {
                $scope.ADtoBS(item.ownershiptitletransferdate, 'propertyDetails.ownershiptitletransferdate_np');

            }
            if (!angular.isUndefined(item.modeofownershiptransfer))
                $scope.propertyDetails.modeofownershiptransfer = item.modeofownershiptransfer;

            if (!angular.isUndefined(item.valueaspertitledate))
                $scope.propertyDetails.valueaspertitledate = item.valueaspertitledate;

            if (!angular.isUndefined(item.flatArea))
                $scope.propertyDetails.flatArea = item.flatArea;

            if (!angular.isUndefined(item.district))
                $scope.propertyDetails.district = item.district;

            if (!angular.isUndefined(item.thana))
                $scope.propertyDetails.thana = item.thana;
            if (!angular.isUndefined(item.mouja))
                $scope.propertyDetails.mouja = item.mouja;

            if (!angular.isUndefined(item.cSKhatianaNo))
                $scope.propertyDetails.cSKhatianaNo = item.cSKhatianaNo;

            if (!angular.isUndefined(item.cSKhatianaDrag))
                $scope.propertyDetails.cSKhatianaDrag = item.cSKhatianaDrag;

            if (!angular.isUndefined(item.sAKhatianaNo))
                $scope.propertyDetails.sAKhatianaNo = item.sAKhatianaNo;

            if (!angular.isUndefined(item.sAKhatianaDrag))
                $scope.propertyDetails.sAKhatianaDrag = item.sAKhatianaDrag;

            if (!angular.isUndefined(item.rSKhatianaNo))
                $scope.propertyDetails.rSKhatianaNo = item.rSKhatianaNo;

            if (!angular.isUndefined(item.rSKhatianaDrag))
                $scope.propertyDetails.rSKhatianaDrag = item.rSKhatianaDrag;

            if (!angular.isUndefined(item.cityJorisKhatianaNo))
                $scope.propertyDetails.cityJorisKhatianaNo = item.cityJorisKhatianaNo;

            if (!angular.isUndefined(item.cityJorisKhatianaDrag))
                $scope.propertyDetails.cityJorisKhatianaDrag = item.cityJorisKhatianaDrag;


            //new fields
            if (!angular.isUndefined(item.ownerName))
                $scope.propertyDetails.ownerName = item.ownerName;

            if (!angular.isUndefined(item.joteOrTaxHoldingNo))
                $scope.propertyDetails.joteOrTaxHoldingNo = item.joteOrTaxHoldingNo;

            if (!angular.isUndefined(item.holdingNo))
                $scope.propertyDetails.holdingNo = item.holdingNo;

            if (!angular.isUndefined(item.typeOfDeed))
                $scope.propertyDetails.typeOfDeed = item.typeOfDeed;

            if (!angular.isUndefined(item.titleDeedOrPOA))
                $scope.propertyDetails.titleDeedOrPOA = item.titleDeedOrPOA;

            if (!angular.isUndefined(item.dateOfDeedRegistration))
                $scope.propertyDetails.dateOfDeedRegistration = item.dateOfDeedRegistration;

            if (!angular.isUndefined(item.nameOfSubregistryOffice))
                $scope.propertyDetails.nameOfSubregistryOffice = item.nameOfSubregistryOffice;

            if (!angular.isUndefined(item.areaOfConstruction))
                $scope.propertyDetails.areaOfConstruction = item.areaOfConstruction;

            if (!angular.isUndefined(item.approchRoad))
                $scope.propertyDetails.approchRoad = item.approchRoad;

            if (!angular.isUndefined(item.natureOfLand))
                $scope.propertyDetails.natureOfLand = item.natureOfLand;

            if (!angular.isUndefined(item.presentUse))
                $scope.propertyDetails.presentUse = item.presentUse;

            if (!angular.isUndefined(item.demarcation))
                $scope.propertyDetails.demarcation = item.demarcation;

            if (!angular.isUndefined(item.undevidedOrUnmarketedProportionateLandArea))
                $scope.propertyDetails.undevidedOrUnmarketedProportionateLandArea = item.undevidedOrUnmarketedProportionateLandArea;

            if (!angular.isUndefined(item.flatOrShopNo))
                $scope.propertyDetails.flatOrShopNo = item.flatOrShopNo;

            if (!angular.isUndefined(item.locationOfFlat))
                $scope.propertyDetails.locationOfFlat = item.locationOfFlat;

            if (!angular.isUndefined(item.cityCorporationHoldingNo))
                $scope.propertyDetails.cityCorporationHoldingNo = item.cityCorporationHoldingNo;

            if (!angular.isUndefined(item.nameOfBuilding))
                $scope.propertyDetails.nameOfBuilding = item.nameOfBuilding;

            if (!angular.isUndefined(item.nameOfProject))
                $scope.propertyDetails.nameOfProject = item.nameOfProject;

            if (!angular.isUndefined(item.nameOfDeveloper))
                $scope.propertyDetails.nameOfDeveloper = item.nameOfDeveloper;

            if (!angular.isUndefined(item.rehabMembershipNoOfDeveloper))
                $scope.propertyDetails.rehabMembershipNoOfDeveloper = item.rehabMembershipNoOfDeveloper;

            if (!angular.isUndefined(item.tripartiteAgreement))
                $scope.propertyDetails.tripartiteAgreement = item.tripartiteAgreement;

            if (!angular.isUndefined(item.bSKhatianaNo))
                $scope.propertyDetails.bSKhatianaNo = item.bSKhatianaNo;

            if (!angular.isUndefined(item.bSKhatianaDrag))
                $scope.propertyDetails.bSKhatianaDrag = item.bSKhatianaDrag;

            if (!angular.isUndefined(item.mutationKhatianaNo))
                $scope.propertyDetails.mutationKhatianaNo = item.mutationKhatianaNo;

            if (!angular.isUndefined(item.leaseholdProperty))
                $scope.propertyDetails.leaseholdProperty = item.leaseholdProperty;

            if (!angular.isUndefined(item.buildingExistInTheLand))
                $scope.propertyDetails.buildingExistInTheLand = item.buildingExistInTheLand;

            if (!angular.isUndefined(item.sizeOfBuilding))
                $scope.propertyDetails.sizeOfBuilding = item.sizeOfBuilding;

            if (!angular.isUndefined(item.noOfFloor))
                $scope.propertyDetails.noOfFloor = item.noOfFloor;

            if (!angular.isUndefined(item.active))
                $scope.propertyDetails.active = item.active;

            if (!angular.isUndefined(list) && list != null && list.length)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindPropertyDetailValues: " + e);
        }
    }

    $scope.RemovePropertyDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'Property');
                if (status) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }
        } catch (e) {
            alert("Exception RemovePropertyDetails_ClickEvent " + e);
        }
    };

    //ShareCertificate
    $scope.rateNotMoreThan100 = function (amount) {
        if (amount >= 100) {
            dialogService.ConfirmDialogWithOkay('', " Interest rate should be less than 100 ");
            $scope.shareCertificate.interestRate = null;
        }
           
    }

    $scope.AddShareCertificateBtn_ClickEvent = function (facility, securityoffer, shareCertificate) {
        try {

            if ($scope.shareCertificateForm.$valid &&
                $scope.shareCertificate.issueValue != 0 &&
                $scope.shareCertificate.presentMarketValue != 0 &&
                $scope.shareCertificate.interestRate != 0) {
                if (facility != null && securityoffer != null && shareCertificate != null) {
                    $scope.isShareEdited = false;
                    AddShareCertificateDetails_Function(facility, securityoffer, shareCertificate);
                }

            } else {
                dialogService.ConfirmDialogWithOkay('', "Please input required feiled");
            }
               
        } catch (e) {
            alert("Exception AddShareCertificateBtn_ClickEvent " + e);
        }
    };

    function AddShareCertificateDetails_Function(facility, securityoffer, shareCertificate) {
        try {
            var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
            if (i != -1 && i != null)
                var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);
            if (i != -1 && j != -1) {
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listShareCertificateSecurityDetailModel.push(shareCertificate);
                ResetShareCertificateModel(shareCertificate.facilityno);
            }
        } catch (e) {
            alert("Exception AddShareCertificateDetails_Function" + e);
        }
    }

    function ResetShareCertificateModel(fNo) {
        $scope.shareCertificate = {
            id: '',
            facilityno: fNo,
            certificateName: '',
            issuingAuthority: '',
            valuationDate: '',
            active: true
        };
        $scope.shareCertificateForm.$setPristine();
        $scope.shareCertificateForm.$setUntouched();
    }

    $scope.ResetShareCertificateBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetShareCertificateModel(fNo);
    };

    $scope.EditShareCertificateDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null) {
                $scope.isShareEdited = true;
                BindShareCertificateDetailValues(list, item);
            }
                
        } catch (e) {
            alert("Exception EditShareCertificateDetailTableItem_ClickEvent " + e);
        }
    };

    function BindShareCertificateDetailValues(list, item) {
        try {
            if (!angular.isUndefined(item.id))
                $scope.shareCertificate.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.shareCertificate.facilityno = item.facilityno;

            if (!angular.isUndefined(item.issueValue))
                $scope.shareCertificate.issueValue = item.issueValue;

            if (!angular.isUndefined(item.presentMarketValue))
                $scope.shareCertificate.presentMarketValue = item.presentMarketValue;

            if (!angular.isUndefined(item.certificateName))
                $scope.shareCertificate.certificateName = item.certificateName;

            if (!angular.isUndefined(item.issuingAuthority))
                $scope.shareCertificate.issuingAuthority = item.issuingAuthority;

            if (!angular.isUndefined(item.valuationDate))
                $scope.shareCertificate.valuationDate = item.valuationDate;
            if (!angular.isUndefined(item.interestRate))
                $scope.shareCertificate.interestRate = item.interestRate;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindEquipmentDetailValues: " + e);
        }
    }

    $scope.RemovePropertyDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'Property');
                if (status) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }
        } catch (e) {
            alert("Exception RemovePropertyDetails_ClickEvent " + e);
        }
    };
    
    //FinancialInstrument
    $scope.AddFinancialInstrumentBtn_ClickEvent = function (facility, securityoffer, financialInstrument) {
        try {
            financialInstrument.issueDate = financialInstrument.issueDate;
            financialInstrument.expiryDate = financialInstrument.expiryDate;
            financialInstrument.lienDate = financialInstrument.lienDate;
            financialInstrument.lienConfirmationDate = financialInstrument.lienConfirmationDate;
            if ($scope.financialInstrumentForm.$valid)
                if (facility != null && securityoffer != null &&
                    $scope.financialInstrument.faceValue != 0 &&
                    $scope.financialInstrument.lienAmount != 0) {
                    $scope.isFinancialEdited = false;
                    AddFinancialInstrumentDetails_Function(facility, securityoffer, financialInstrument);
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Please input required feiled");
                }
                   
        } catch (e) {
            alert("Exception AddShareCertificateBtn_ClickEvent " + e);
        }
    };

    function AddFinancialInstrumentDetails_Function(facility, securityoffer, financialInstrument) {
        try {
        
            var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
            if (i != -1 || i != null)
                var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);
            if (i != -1 && j != -1) {
               
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listFinancialInstrumentSecurityDetailModel.push(financialInstrument);
                ResetFinancialInstrumentModel(financialInstrument.facilityno);
            }
        } catch (e) {
            alert("Exception AddFinancialInstrumentDetails_Function" + e);
        }
    }

    $scope.ResetFinancialInstrumentBtn_ClickEvent = function () {
            ResetFinancialInstrumentModel();
    };
    

    function ResetFinancialInstrumentModel() {
        $scope.financialInstrument = {
            id: null,
            facilityno: null,
            issuingBank: null,
            issuingBranch: null,
            nameOfInstrument: null,
            faceValue: null,
            issueDate: null,
            expiryDate: null,
            lienAmount: null,
            lienDate: null,
            lienConfirmationDate: null,
            active: true
        };
        $scope.financialInstrumentForm.$setPristine();
        $scope.financialInstrumentForm.$setUntouched();
    }


    $scope.EditFinancialInstrumentDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null)
                $scope.isFinancialEdited = true;
                BindFinancialInstrumentDetailValues(list, item);
        } catch (e) {
            alert("Exception EditFinancialInstrumentDetailTableItem_ClickEvent " + e);
        }
    };

    function changeDateFormat(dateString) {
        var str = dateString;

        var slash = str.slice(1, 2);
        if (slash == "-") {
            var zeroday = "0";
            str = zeroday.concat(str);
        }
        var slashMonth = str.slice(4, 5);
        if (slashMonth == "-") {
            var zeroMonth = "0";
            var res = str.split("-");
            var month = zeroMonth.concat(res[1]);
            str = res[0] + "-" + month + "-" + res[2];
        }

        var mm = str.slice(0, 2);
        var dd = str.slice(3, 5);
        var yy = str.slice(6, 10);
        var dateArrayNew = [dd, mm, yy];
        var newFormat = dateArrayNew.join("-");

        return newFormat;
    }

    function reverceDateFormat(dateString) {
        var str = dateString;

        var slash = str.slice(1, 2);
        if (slash == "-") {
            var zeroday = "0";
            str = zeroday.concat(str);
        }
        var slashMonth = str.slice(4, 5);
        if (slashMonth == "-") {
            var zeroMonth = "0";
            var res = str.split("-");
            var month = zeroMonth.concat(res[1]);
            str = res[0] + "-" + month + "-" + res[2];
        }

        var mm = str.slice(0, 2);
        var dd = str.slice(3, 5);
        var yy = str.slice(6, 10);
        var dateArrayNew = [mm,dd, yy];
        var newFormat = dateArrayNew.join("-");

        return newFormat;
    }

    function BindFinancialInstrumentDetailValues(list, item) {
        try {
        
            item.issueDate = changeDateFormat(item.issueDate);
            item.expiryDate = changeDateFormat(item.expiryDate);
            item.lienDate = changeDateFormat(item.lienDate);
            item.lienConfirmationDate = changeDateFormat(item.lienConfirmationDate);

            if (!angular.isUndefined(item.id))
                $scope.financialInstrument.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.financialInstrument.facilityno = item.facilityno;

            if (!angular.isUndefined(item.issuingBank))
                $scope.financialInstrument.issuingBank = item.issuingBank;

            if (!angular.isUndefined(item.instrumentType))
                $scope.financialInstrument.instrumentType = item.instrumentType;

            if (!angular.isUndefined(item.instrumentNumber))
                $scope.financialInstrument.instrumentNumber = item.instrumentNumber;

            if (!angular.isUndefined(item.issuingBranch))
                $scope.financialInstrument.issuingBranch = item.issuingBranch;

            if (!angular.isUndefined(item.faceValue))
                $scope.financialInstrument.faceValue = item.faceValue;

            if (!angular.isUndefined(item.issueDate))
                $scope.financialInstrument.issueDate = item.issueDate;

            if (!angular.isUndefined(item.expiryDate))
                $scope.financialInstrument.expiryDate = item.expiryDate;

            if (!angular.isUndefined(item.lienAmount))
                $scope.financialInstrument.lienAmount = item.lienAmount;

            if (!angular.isUndefined(item.nameOfInstrument))
                $scope.financialInstrument.nameOfInstrument = item.nameOfInstrument;

            if (!angular.isUndefined(item.lienDate))
                $scope.financialInstrument.lienDate = item.lienDate;

            if (!angular.isUndefined(item.lienConfirmationDate))
                $scope.financialInstrument.lienConfirmationDate = item.lienConfirmationDate;


            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindFinancialInstrumentDetailValues: " + e);
        }
    }
    $scope.GetValuerByCIFUsingConnectivityService_ClickEvent = function (borrower) {
        try {
            $scope.searchCriteriaType = 'cif';
            $scope.searchCriteria = "";
            $scope.listSearchCustomer = [];
            $scope.valuation.valuer = {
                cif: borrower.cif,
                name: borrower.FirstName + ' ' + borrower.MiddleName + ' ' + borrower.LastName
            };
            $('#searchvaluer1').modal('toggle'); // close modal popup

        } catch (e) {
            alert("GetBorrowerProfileByCIFUsingConnectivity_ClickEvent " + e);
        }
    };
    $scope.RemoveFinancialInstrumentDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'FinancialInstrument');
                if (status) {

                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }
        } catch (e) {
            alert("Exception RemoveEquipmentDetails_ClickEvent " + e);
        }
    };

    //other detail 
    $scope.ResetOtherDetailsBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetOtherDetailsModel(fNo);
    };

    function ResetOtherDetailsModel(fNo) {
        $scope.otherDetails = {
            id: '',
            facilityno: fNo,
            description: '',
            currency: GetDefaultCurrency($scope.defaultCurrency),
            value: '',
            ownerofsecurity: '',
            remarks: '',
            othersecurity: '',
            active: true
        };
        $scope.otherForm.$setPristine();
        $scope.otherForm.$setUntouched();
        //$scope.additionalSecurityForm.$setPristine();
        //$scope.additionalSecurityForm.$setUntouched();
    }

    function AddOtherDetails_Function(facility, securityoffer, other) {
        try {
            var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
            if (i != -1 || i != null)
                var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);
            if (i != -1 && j != -1) {
                $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listOtherSecurityDetailModel.push(other);
                ResetOtherDetailsModel(other.facilityno);
            }
        } catch (e) {
            alert("Exception AddOtherDetails_Function" + e);
        }
    }

    $scope.AddOtherDetailsBtn_ClickEvent = function (facility, securityoffer, other) {
        try {
            if ($scope.otherDetails.value != 0) {
                if ($scope.otherForm.$valid) {
                    if (facility != null && securityoffer != null && other != null)
                        $scope.isOtherSecurityEdited = false;
                    AddOtherDetails_Function(facility, securityoffer, other);
                }
            } else {
                dialogService.ConfirmDialogWithOkay('', "Please input value");
            }
               
        } catch (e) {
            alert("Exception AddOtherDetailsBtn_ClickEvent " + e);
        }
    };

    $scope.ResetOtherDetailsBtn_ClickEvent = function (fNo) {
        if (fNo != null)
            ResetOtherDetailsModel(fNo);
    };

    $scope.EditOtherSecurityDetailTableItem_ClickEvent = function (list, item) {
        try {
            if (item != null)
                $scope.isOtherSecurityEdited = true;
                BindOtherSecurityDetailValues(list, item);
        } catch (e) {
            alert("Exception EditOtherSecurityDetailTableItem_ClickEvent " + e);
        }
    };

    $scope.RemoveOtherDetails_ClickEvent = function (list, item) {
        try {
            var status = false;
            if (list != null && item != null) {
                status = CheckValuationDependencyForRemovingSecurityDetail(item, 'Other');
                if (status) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                } else {
                    dialogService.ConfirmDialogWithOkay('', global._dependentvaluationwarningmessage);
                }
            }
        } catch (e) {
            alert("Exception RemoveOtherDetails_ClickEvent " + e);
        }
    };

    function BindOtherSecurityDetailValues(list, item) {
        try {
            if (!angular.isUndefined(item.id))
                $scope.otherDetails.id = item.id;

            if (!angular.isUndefined(item.facilityno))
                $scope.otherDetails.facilityno = item.facilityno;

            if (!angular.isUndefined(item.description))
                $scope.otherDetails.description = item.description;

            if (!angular.isUndefined(item.currency) && item.currency != null)
                $scope.otherDetails.currency = GetDefaultCurrency(item.currency.type);

            if (!angular.isUndefined(item.value))
                $scope.otherDetails.value = item.value;

            if (!angular.isUndefined(item.othersecurity))
                $scope.otherDetails.othersecurity = item.othersecurity;

            if (!angular.isUndefined(item.ownerofsecurity))
                $scope.otherDetails.ownerofsecurity = item.ownerofsecurity;

            if (!angular.isUndefined(item.remarks))
                $scope.otherDetails.remarks = item.remarks;

            //if (!angular.isUndefined(item.currency) && item.currency != null)
            //    $scope.otherDetails.currency = GetDefaultCurrency(item.currency.type);

            //if (!angular.isUndefined(item.value))
            //    $scope.otherDetails.value = item.value;

            //if (!angular.isUndefined(item.ownerofsecurity))
            //    $scope.otherDetails.ownerofsecurity = item.ownerofsecurity;

            //if (!angular.isUndefined(item.remarks))
            //    $scope.otherDetails.remarks = item.remarks;

            if (!angular.isUndefined(item.active))
                $scope.otherDetails.active = item.active;

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindOtherSecurityDetailValues: " + e);
        }
    }

    $scope.SaveSecurityDetail_ClickEvent = function () {
        try {
            SaveSecurityDetails();
        } catch (e) {
            alert("SaveSecurityDetails error" + e);
        }
    };

    function SaveSecurityDetails() {
        try {
            var cprId = GetUrlParameters();
           var facility = $scope.cprinit.listCPRFacilities[0];
           $scope.personalGurantorValue = $filter('filter')(facility.listSecurityOffer, { securitytype: { type: 'Personal Guarantor' } }, true);
         
            var securityDetailMapper = {
                'cprId': cprId,
                'cif': $scope.borrowerprofile.id,
                'listCPRFacilities': $scope.cprinit.listCPRFacilities
            };
          
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveSecurityDetail",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { securityDetailMapper: securityDetailMapper, securityComment: $scope.securityEvaluationComment}
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {                      
                       // common.preprocesshide();
                        $scope.cprinit.listCPRFacilities = [];
                        $scope.cprinit.listCPRFacilities.listSecurityOffer = [];
                        $scope.cprinit.listCPRFacilities = response.data.output;
                        var gurantor = $filter('filter')($scope.cprinit.listBorrowerProfiles, { product: facility.product }, true);
                        if (gurantor.length > 0) {
                            SubmitDraftCPRForGurantee();

                        } else {
                            common.preprocesshide();
                            dialogService.ConfirmDialogWithOkay('', response.data.message);
                        }
                     
                      //  dialogService.ConfirmDialogWithOkay('', response.data.message);
                    } else {
                        common.preprocesshide();
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
            alert("Exception SaveLiabilityDetail: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    }

    function CheckValuationDependencyForRemovingSecurityDetail(item, type) {
        try {
            var valuationsecurityno = "";
            var list = $filter('filter')($scope.cprinit.listCPRValuation, { facilityno: item.facilityno, active: true }, true);
            if (list != null && list.length > 0) {
                switch (type) {
                    case "Equipment":
                        valuationsecurityno = item.detailofequipment + ", " + item.make + ", " + item.model;
                        break;

                    case "FinancialInstrument":
                        valuationsecurityno = item.detailofequipment + ", " + item.issuingBank + ", " + item.issuingBranch;
                        break;

                    case "Vehicle":
                        var vehicleno = "";
                        if (item.registrationNo != null && item.registrationNo != "")
                            vehicleno = item.registrationNo + ", ";
                        valuationsecurityno = vehicleno + item.make + ", " + item.model;
                        break;

                    case "Property":
                        valuationsecurityno = item.deedno + ", " + item.lotno + ", " + item.extent;
                        break;

                    case "Other":
                        valuationsecurityno = "Other, " + item.description;
                        break;
                }

                var count = $filter('filter')(list, { security: { value: valuationsecurityno } }, true).length;
                if (count > 0)
                    return false;
                else
                    return true;
            }
            else
                return true;
        } catch (e) {
            alert("Exception CheckValuationDependencyForRemovingSecurityDetail " + e);
        }
    }

    $scope.AddSecurityOfferBtn_ClickEvent = function (item) {
        try {
            if (item != null) {
                var index = AddSecurityOffer_Validation(item);
                if (!angular.isUndefined(index)) {
                    if (index === -1) {
                        $scope.securityOfferModel = {
                            id: null,
                            securitytype: item,
                            evaluationComment: null,
                            listEquipmentSecurityDetailModel: [],
                            listPropertySecurityDetailModel: [],
                            listVehicleSecurityDetailModel: [],
                            listOtherSecurityDetailModel: [],
                            listCPRSecurityGuarantorModel: [],
                            listShareCertificateSecurityDetailModel: [],
                            listFinancialInstrumentSecurityDetailModel: [],
                            active: true
                        };
                        $scope.cPRFacility.listSecurityOffer.push($scope.securityOfferModel);
                    }
                    else if (index != -2)
                        $scope.cPRFacility.listSecurityOffer[index].active = true;

                    if (index != -2) {
                        var i = $scope.listSecurityType.indexOf(item);
                        $scope.listSecurityType[i].active = false;
                        $scope.securitytype = null;
                    }
                }

            }
        } catch (e) {
            alert("Exception AddFacilityBtn_ClickEvent " + e);
        }
    };
    //---------------------------Security Detail End----------------------------------



    //---------------------------Valuation Function Start----------------------------------
    $scope.AddValuationDetailsBtn_ClickEvent = function (valuation) {
        try {
            var status = false;
            if ($scope.valuationForm.$valid) {
                if ($scope.listCPRValuation === undefined || $scope.listCPRValuation == null)
                    $scope.listCPRValuation = [];

                //if (valuation != null && AddValuationClickValidation_Function(valuation)) {
                //    AddValuationDetails_Function(valuation);
                //    $scope.ResetValuation_ClickEvent();
                //}
                if (valuation != null) {
                    AddValuationDetails_Function(valuation);
                    $scope.ResetValuation_ClickEvent();
                }
            }
            sumTotalCollateralValue();
        } catch (e) {
            alert("AddValuationDetailsBtn_ClickEvent Error: " + e)
        }
    };

    function AddValuationClickValidation_Function(valuation) {
        try {
            // if (valuation.ltv < 1) {
            if (valuation.ltv != null) {
                var sCount = 0, vCount = 0, sum = 0, amount = 0, propotion = 0;

                sCount = GetSecurityDetailCountByFacilityNo(valuation.facilityno);
                vCount = GetValiationCountByFacilityNo(valuation.facilityno);

                if (sCount == ++vCount) {
                    sum = GetPropotionSumByFacilityNo(valuation.facilityno);
                    amount = GetFacilityAmountByFacilityNo(valuation.facilityno);
                    propotion = parseFloat(valuation.propotionValue);
                    if (amount => (sum + propotion))
                        return true;
                    else {
                        dialogService.ConfirmDialogWithOkay(''
                            , global._sumoffacilitypropotionnotequaltofacilityamountmessage);
                        return false;
                    }

                }
                else {
                    return true;
                }
            } else {
                dialogService.ConfirmDialogWithOkay('', global._ltvnotvalidmessage);
                return false;
            }
        } catch (e) {
            alert("Exception AddValuationClickValidation_Function " + e);
        }
        return false;
    }

    function AddValuationDetails_Function(valuation) {
        try {
            if ($scope.listCPRValuation == null || $scope.listCPRValuation == undefined)
                $scope.listCPRValuation = [];
            //valuation.dateOfValuation = reverceDateFormat(valuation.dateOfValuation);
            //valuation.valuationexpiryDate = reverceDateFormat(valuation.valuationexpiryDate);
            $scope.listCPRValuation.push(valuation);
            //$scope.listCPRValuation = $scope.listCPRValuation;
            ResetValuationModel();
            $scope.valuersList = [];
        } catch (e) {
            alert("Exception AddValuationDetails_Function" + e);
        }
    }

    $scope.EditValuationDetailsTableItem_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null)
                //
                //$scope.valuation = item;

                if ($scope.valuation.dateOfValuation == null && $scope.valuation.facilityno == null) {
                    BindValuationDetailsValues(list, item);
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Please add the remaining data to the grid before editing a new record!").then(function () { });
                }
            sumTotalCollateralValue();
            //UDF
            $scope.listValuationUDF = GetUDF('Valuation', item.security.typeId);
        } catch (e) {
            alert("Exception EditValuationDetailsTableItem_ClickEvent " + e);
        }
    };

    function GetUDF(section, typeId) {
        try {
            var list = [];
            angular.forEach($scope.listAllUDF, function (udf) {
                if (udf.listProductId !== undefined && udf.listProductId !== null && udf.section === section) {
                    angular.forEach(udf.listProductId, function (prodid) {
                        if (prodid == typeId || prodid == 0) {
                            list.push(udf);
                        }
                    });
                }
            });

            return list;
        } catch (e) {
            common.preprocesshide();
            alert('GetUDF ' + e);
        }
    }

    $scope.RemoveValuationDetails_ClickEvent = function (list, item) {
        try {
            if (list != null && item != null) {
                if (item.id == null)
                    common.RemoveItemFromList(list, item, true);
                else
                    common.SetActiveFalseForRemovedItem(list, item);
                sumTotalCollateralValue();
            }
        } catch (e) {
            alert("Exception RemoveValuationDetails_ClickEvent " + e);
        }
    };

    function BindValuationDetailsValues(list, item) {
        try {
            //item.dateOfValuation = changeDateFormat(item.dateOfValuation);
            //item.valuationexpiryDate = changeDateFormat(item.valuationexpiryDate);

            if (!angular.isUndefined(item.id))
                $scope.valuation.id = item.id;

            var fNo = null;
            if (!angular.isUndefined(item.facilityno)) {
                $scope.valuation.facilityno = item.facilityno;
                fNo = item.facilityno;
            }

            if (fNo != null) {
                var facility = GetFacilityByFacilityNo(fNo);
                ValuationListSecurityValue_Function(facility);
            }


            if (!angular.isUndefined(item.security) && item.security.value != null)
                $scope.valuation.security = $scope.listValuationSecurityValue[GetArrayIndexByValue($scope.listValuationSecurityValue
                    , "value"
                    , item.security.value)];

            if (!angular.isUndefined(item.valuerName))
                $scope.valuation.valuerName = item.valuerName;

            if (!angular.isUndefined(item.valuerType))
                $scope.valuation.valuerType = item.valuerType;


            if (!angular.isUndefined(item.forcedSaleValue))
                $scope.valuation.forcedSaleValue = item.forcedSaleValue;

            if (!angular.isUndefined(item.rrv))
                $scope.valuation.rrv = item.rrv;

            if (!angular.isUndefined(item.marketValue))
                $scope.valuation.marketValue = item.marketValue;

            if (!angular.isUndefined(item.propotionValue))
                $scope.valuation.propotionValue = item.propotionValue;

            if (!angular.isUndefined(item.dateOfValuation))
                $scope.valuation.dateOfValuation = item.dateOfValuation;

            if (item.dateOfValuation != null) {
                $scope.ADtoBS(item.dateOfValuation, 'valuation.dateOfValuation_np');
            }

            if (!angular.isUndefined(item.insuranceValue))
                $scope.valuation.insuranceValue = item.insuranceValue;

            if (!angular.isUndefined(item.chargeType))
                $scope.valuation.chargeType = item.chargeType;

            if (!angular.isUndefined(item.ltv))
                $scope.valuation.ltv = item.ltv;

            if (!angular.isUndefined(item.valuer))
                $scope.valuation.valuer = item.valuer;

            if (!angular.isUndefined(item.remarks))
                $scope.valuation.remarks = item.remarks;

            if (!angular.isUndefined(item.active))
                $scope.valuation.active = item.active;

            if (!angular.isUndefined(item.collateralValue))
                $scope.valuation.collateralValue = item.collateralValue;

            if (!angular.isUndefined(item.distancefromBank))
                $scope.valuation.distancefromBank = item.distancefromBank;

            if (!angular.isUndefined(item.acceptabilityofSecurity))
                $scope.valuation.acceptabilityofSecurity = item.acceptabilityofSecurity;

            if (!angular.isUndefined(item.valuationexpiryDate))
                $scope.valuation.valuationexpiryDate = item.valuationexpiryDate;

            if (item.valuationexpiryDate != null) {
                $scope.ADtoBS(item.valuationexpiryDate, 'valuation.valuationexpiryDate_np');
            }

            if (!angular.isUndefined(item.listUDFValues) && item.listUDFValues != null)
                $scope.valuation.listUDFValues = item.listUDFValues;
            else
                $scope.valuation.listUDFValues = [];

            if (list != null)
                common.RemoveItemFromList(list, item, false);

        } catch (e) {
            alert("Exception BindValuationDetailsValues: " + e);
        }
    }

    function GetArrayIndexByValue(arr, attr, value) {
        try {
            if (attr !== null) {
                for (var i = 0; i < arr.length; i++)
                    if (arr[i][attr] === value)
                        return i;
                return -1;
            } else {
                for (var i = 0; i < arr.length; i++)
                    if (arr[i] === value)
                        return i;
                return -1;
            }

        } catch (e) {
            alert("GetArrayIndexByValue: " + e);
        }
    }

    $scope.ResetValuation_ClickEvent = function () {
        try {
            ResetValuationModel();
        }
        catch (ex) {
            alert("Exception in ResetValuation_ClickEvent " + ex);
        }
    }

    function ResetValuationModel() {
        $scope.valuation = {
            id: null,
            facilityno: null,
            security: {
                id: null,
                value: null,
                active: false
            },
            valuerName: null,
            valuer: null,
            isBackListed: $scope.IsblacklistedValue[0],
            forcedSaleValue: null,
            rrv: null,
            marketValue: null,
            propotionValue: null,
            dateOfValuation: null,
            insuranceValue: null,
            ltv: null,
            collateralValue: null,
            distancefromBank: null,
            valuationexpiryDate: null,
            acceptabilityofSecurity: null,
            remarks: null,
            listUDFValues: [],
            active: true
        };
        $scope.listValuationUDF = [];
        $scope.listValuationSecurityValue = [];
        $scope.valuationForm.$setPristine();
        $scope.valuationForm.$setUntouched();
    }

    function sumTotalCollateralValue() {
        $scope.totalCollateralValue = 0;
        $scope.totalFSV = 0;
        $scope.totalMV = 0;
        $scope.totalrrv = 0;
        angular.forEach($scope.listCPRValuation, function (value) {

            $scope.totalCollateralValue = $scope.totalCollateralValue || 0;
            $scope.totalFSV = $scope.totalFSV || 0;
            $scope.totalMV = $scope.totalMV || 0;
            $scope.totalrrv = $scope.totalrrv || 0;

            if (value.active == true) {
                $scope.totalCollateralValue = $scope.totalCollateralValue + value.collateralValue;
                $scope.totalFSV = $scope.totalFSV + value.forcedSaleValue;
                $scope.totalMV = $scope.totalMV + value.marketValue;
                $scope.totalrrv = $scope.totalrrv + value.rrv;
                //if ($scope.cprinit.listCPRFacilities.length > 0) {
                //    angular.forEach($scope.cprinit.listCPRFacilities, function (a) {
                //        if (a.active == true) {
                //            for (i = 0; i < a.listSecurityOffer.length; i++) {
                //                if (a.listSecurityOffer[i].securitytype.type == "Other") {

                //                    $scope.totalrrv = $scope.totalrrv + value.rrv;
                //                }
                //            }

                //        }
                //    });
                //}
                //angular.forEach($scope.cprinit.listCPRFacilities.listSecurityOffer, function (a) {
                //    if (a.securitytype == "Other") {
                //        $scope.totalrrv = $scope.totalrrv + value.rrv;
                //    }
                //});

            }

        });
    }

    function GetSecurityDetailCountByFacilityNo(item) {
        try {
            var count = 0;
            var listSecurityOffer = GetFacilityByFacilityNo(item).listSecurityOffer;
            angular.forEach(listSecurityOffer, function (value) {
                if (value.active == true) {
                    switch (value.securitytype.type) {
                        case "Equipment":
                            if (value.listEquipmentSecurityDetailModel !== null)
                                count += value.listEquipmentSecurityDetailModel.length;
                            break;
                        case "Vehicle":
                            if (value.listVehicleSecurityDetailModel !== null)
                                count += value.listVehicleSecurityDetailModel.length;
                            break;

                        case "Property":
                            if (value.listPropertySecurityDetailModel !== null)
                                count += value.listPropertySecurityDetailModel.length;
                            break;

                        case "Other":
                            if (value.listOtherSecurityDetailModel !== null)
                                count += value.listOtherSecurityDetailModel.length;
                            break;
                        case "ShareCertificate":
                            if (value.listShareCertificateSecurityDetailModel !== null)
                                count += value.listShareCertificateSecurityDetailModel.length;
                            break;
                        case "FDR":
                            if (value.listFinancialInstrumentSecurityDetailModel !== null)
                                count += value.listFinancialInstrumentSecurityDetailModel.length;
                            break;

                    }
                }
            });
            return count;
        } catch (e) {
            alert("Exception GetSecurityDetailCountByFacilityNo " + e);
        }
    }

    function GetValiationCountByFacilityNo(item) {
        try {
            var count = 0;
            count = $filter('filter')($scope.listCPRValuation, { facilityno: item, active: true }).length;
            return count;
        } catch (e) {
            alert("Exception GetValiationCountByFacilityNo " + e);
        }
    }

    function GetPropotionSumByFacilityNo(item) {
        try {
            if ($scope.listCPRValuation == null)
                $scope.listCPRValuation = [];
            var total = 0;
            var list = $filter('filter')($scope.listCPRValuation, { facilityno: item });
            if (list.length > 0) {
                angular.forEach(list, function (value) {
                    if (value.active == true) {
                        if (value.propotionValue != null)
                            total += parseFloat(value.propotionValue);
                    }
                });
            }
            return parseFloat(total);
        } catch (e) {
            alert("Exception GetPropotionSumByFacilityNo " + e);
        }
    }

    function GetFacilityAmountByFacilityNo(fno) {
        try {
            var amount = 0;
            var index = GetArrayIndexByValue($scope.cprinit.listCPRFacilities, 'facilityno', fno);
            if (index > -1)
                amount = $scope.cprinit.listCPRFacilities[index].amountrequest;
            return parseFloat(amount);
        } catch (e) {
            alert("Exception GetFacilityAmountByFacilityNo " + e);
        }
    }

    function GetFacilityByFacilityNo(fNo) {
        try {
            var facility = null;
            var arr = $filter('filter')($scope.cprinit.listCPRFacilities, { active: true });
            for (var i = 0; i < arr.length; i++)
                if (arr[i].facilityno === fNo) {
                    facility = arr[i];
                    break;
                }
            return facility;
        } catch (e) {
            alert("Exception GetFacilityByFacilityNo" + e);
        }
    }

    $scope.DropdownValuationFaclityNo_ChangeEvent = function (fNo) {
        try {
            if (fNo != null) {
                var facility = GetFacilityByFacilityNo(fNo);

                if (facility != null) {
                    $scope.valuation.security = null;
                    ValuationListSecurityValue_Function(facility);
                    ClearValuationPageOnDropdownChangeEvent();
                }
            }
        } catch (e) {
            alert("Exception DropdownValuationFaclityNo_ChangeEvent " + e);
        }
    };

    function ValuationListSecurityValue_Function(facility) {
        try {

            $scope.listValuationSecurityValue = [];
            $scope.mortgageAmount = facility.amountrequest;
            var listSecurityOffer = facility.listSecurityOffer;
            for (var i = 0; i < listSecurityOffer.length; i++) {
                if (listSecurityOffer[i].active == true) {
                    $scope.security = {
                        id: null,
                        value: null,
                        active: true
                    };
                    var securitytype = listSecurityOffer[i].securitytype.type;
                    switch (securitytype) {
                        case "Property":
                            var listProperty = listSecurityOffer[i].listPropertySecurityDetailModel;
                            if (listProperty != null)
                                for (var j = 0; j < listProperty.length; j++) {
                                    if (listProperty[j].active == true) {
                                        $scope.security.id = listProperty[j].id;
                                        $scope.security.value = "Property," + listProperty[j].deedno + ", " + listProperty[j].lotno + ", " + listProperty[j].extent;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                        case "Equipment":
                            var listEquipment = listSecurityOffer[i].listEquipmentSecurityDetailModel;
                            if (listEquipment != null)
                                for (var j = 0; j < listEquipment.length; j++) {
                                    if (listEquipment[j].active == true) {
                                        $scope.security.id = listEquipment[j].id;
                                        $scope.security.value = "Equipment, " + listEquipment[j].detailofequipment + ", " + listEquipment[j].make + ", " + listEquipment[j].model;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                        case "Vehicle":
                            var listVehicle = listSecurityOffer[i].listVehicleSecurityDetailModel;
                            if (listVehicle != null)
                                for (var j = 0; j < listVehicle.length; j++) {
                                    if (listVehicle[j].active == true) {
                                        $scope.security.id = listVehicle[j].id;
                                        var registraionno = "";
                                        if (listVehicle[j].registrationNo != null && listVehicle[j].registrationNo != "")
                                            registraionno = listVehicle[j].registrationNo + ", ";
                                        $scope.security.value = "Vehicle, " + registraionno + listVehicle[j].make + ", " + listVehicle[j].model;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                        case "Other":
                            var listOther = listSecurityOffer[i].listOtherSecurityDetailModel;
                            if (listOther != null)
                                for (var j = 0; j < listOther.length; j++) {
                                    if (listOther[j].active == true) {
                                        $scope.security.id = listOther[j].id;
                                        $scope.security.value = "Other, " + listOther[j].description;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                        case "ShareCertificate":
                            var listShareCert = listSecurityOffer[i].listShareCertificateSecurityDetailModel;
                            $scope.listShareCertificateSecurityDetailModel = $scope.listShareCertificateSecurityDetailModel || [];
                            if (listShareCert != null)
                                for (var j = 0; j < listShareCert.length; j++) {
                                    if (listShareCert[j].active == true) {
                                        $scope.security.id = listShareCert[j].id;
                                        $scope.security.value = "Share, " + listShareCert[j].certificateName;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                        case "FDR":
                            var listFinancialInstrument = listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel;
                            $scope.listFinancialInstrumentSecurityDetailModel = $scope.listFinancialInstrumentSecurityDetailModel || [];
                            if (listFinancialInstrument != null)
                                for (var j = 0; j < listFinancialInstrument.length; j++) {
                                    if (listFinancialInstrument[j].active == true) {
                                        $scope.security.id = listFinancialInstrument[j].id;
                                        $scope.security.value = "Financial, " + listFinancialInstrument[j].issuingBank + ", " + listFinancialInstrument[j].issuingBranch;
                                        $scope.security.typeId = listSecurityOffer[i].securitytype.id;
                                        $scope.listValuationSecurityValue.push($scope.security);
                                        $scope.security = {
                                            id: null,
                                            value: null,
                                            active: true,
                                            typeId: null
                                        };
                                    }
                                }
                            break;

                    }
                }
            }

        } catch (e) {
            alert("Exception ValuationListSecurityValue_Function" + e);
        }
        //return $scope.listValuationSecurityValue;
    }

    function ClearValuationPageOnDropdownChangeEvent() {
        try {
            $scope.valuation.valuerName = null;
            $scope.valuation.valuer = null;
            $scope.valuation.forcedSaleValue = null;
            $scope.valuation.isBackListed = null;
            $scope.valuation.rrv = null;
            $scope.valuation.marketValue = null;
            $scope.valuation.propotionValue = null;
            $scope.valuation.dateOfValuation = null;
            $scope.valuation.insuranceValue = null;
            $scope.valuation.collateralValue = null;
            $scope.valuation.ltv = null;
            $scope.valuation.distancefromBank = null;
            $scope.valuation.acceptabilityofSecurity = null;
            $scope.valuation.valuationexpiryDate = null;
            $scope.valuation.remarks = null;
            $scope.valuation.valuerType = null;

            $scope.valuationForm.$setPristine();
            $scope.valuationForm.$setUntouched();
        } catch (e) {
            alert("Exception ClearValuationPageOnDropdownChangeEvent " + e);
        }
    }

    function SerachCustomers(type, input) {
        try {
            if (type == 'CIF')
                type = 'cif';
            else if (type == 'NID')
                type = 'nic';
            else if (type == 'NAME')
                type = 'name';
            else if (type == 'TIN')
                type = 'tin';

            //    For Basic Bank Customization , There customer data will come from CBS only by CIF or Account No
            common.preprocessload();
            var cif = input;
            $http({
                url: "/ApiCallingFromCBS/GetTokenResponseAsync",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: cif
            }).then(function successCallback(response) {
                //common.preprocesshide();
                if (response.data.success) {
                    var token = response.data.output;
                    var cif = input;
                    console.log(response.data.output);
                    GetCustomerByToken(token, cif);
                    common.preprocesshide();

                }
            }, function errorCallback(response) {
                common.preprocesshide();
                $scope.error = response;
            });


        } catch (e) {
            common.preprocesshide();
            alert("SerachCustomers " + e);
        }
    };

    function GetCustomerByToken(token, cif) {
        try {
            $http({
                url: "/ApiCallingFromCBS/getCustomerDataByToken",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify(
                    {
                        token: token,
                        cif: cif
                    }
                )
            }).then(function successCallback(response) {
                if (response.data.success) {
                    console.log(response.data.output);
                    $scope.listSearchCustomer.push(response.data.output);
                    common.preprocesshide();
                }
                else {
                    alert(response.data.output);
                    common.preprocesshide();
                }
            }, function errorCallback(response) {
                $scope.error = response;
                common.preprocesshide();
            });
        } catch (e) {
            alert("Exception GetCustomerByToken " + e);
            common.preprocesshide();
        }

    };

    function SubmitCustomer(customer) {
        return new Promise(function (resolve, reject) {
            try {
                $scope.customer.identity = customer.IdNo;
                $scope.customer.registerNo = customer.IdNo;
                $scope.customer.personal = true;
                $scope.customer.cif = customer.CIF;
                $scope.customer.nic = customer.IdNo;
                $scope.customer.tin = customer.TIN;
                $scope.customer.customerdate = customer.DOB;
                $scope.customer.name = customer.FirstName + ' ' + (customer.MiddleName ? customer.MiddleName : '') + ' ' + (customer.LastName ? customer.LastName : '');
                $scope.customer.title = customer.Title;
                $scope.customer.address1 = customer.PermAddrLine1;

                $scope.customer.telephone1 = customer.MobileNo;
                $scope.customer.telephone2 = customer.MobileNo2;
                $scope.customer.nationality = customer.Nationality === 'BD' ? 'Bangladeshi' : null;
                $scope.customer.email = customer.Email;
                $scope.customer.maritalStatus = customer.MaritalStatus;
                $scope.customer.gender = customer.Gender;
                $scope.customer.taxNo = customer.TIN;
                //$scope.customer.branchId = $cprinit.branch.Id;
                $scope.customer.taxFileNo = customer.TIN;
                $scope.customer.active = true;
                $scope.customer.presentCountryId = 1;
                $scope.customer.presentDistrict = customer.MailDistrict;
                $scope.customer.presentUpazilla = customer.MailUpazila;
                $scope.customer.presentPostOffice = customer.MailZipCode;
                $scope.customer.permanentCountryId = 1;
                $scope.customer.permanentDistrict = customer.PermDistrict;
                $scope.customer.permanentUpazilla = customer.PermUpazila;
                $scope.customer.permanentPostOffice = customer.PermZipCode;

                $http({
                    url: "/Master/SubmitCustomer",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ customer: $scope.customer })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();
                        $scope.customer = response.data.output;
                        common.preprocesshide();
                        resolve(); // Resolve the promise to indicate successful completion
                    } else {
                        common.preprocesshide();
                        reject('SubmitCustomer failed'); // Reject the promise with an error message
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                    reject('SubmitCustomer failed'); // Reject the promise with an error message
                });
            } catch (e) {
                alert('SubmitCustomer ' + e);
                common.preprocesshide();
                reject('SubmitCustomer failed'); // Reject the promise with an error message
            }
        });
    };

    $scope.SearchBorrowerProfiles_ClickEvent = function (type, input) {
        try {
            //if ($scope.cprinit.business != null) {
            SerachCustomers(type, input);
            //var output = $scope.listSearchCustomerResult[0];
            //SubmitCustomer(output).then(function () {
            //    try {

            //        common.preprocessload();

            //        var req = {
            //            method: 'POST',
            //            url: common.connectivityUrl + '/api/SearchCustomers?type=' + type + '&input=' + input,
            //            headers: {
            //                "Content-Type": undefined
            //            },
            //            data: {}
            //        };

            //        $http(req).then(function success(response) {
            //            $scope.listSearchCustomer = response.data.output;
            //            common.preprocesshide();
            //        }, function error(response) {
            //            common.preprocesshide();
            //            $scope.error = response;
            //        }
            //        );
            //    } catch (e) {
            //        common.preprocesshide();
            //        alert("SerachCustomers " + e);
            //    }
            //});
                     
        } catch (e) {
            alert("SearchBorrowerProfiles_ClickEvent " + e);
        }
    };
    $scope.CommonCIfTagRemove_ClickEvent = function (tag) {
        switch (tag) {

            case "introducer":
                $scope.cprinit.introducer = null;
                break;

            case "valuer":
                $scope.valuation.valuer = null;
                break;

            case "eqSupplier":
                $scope.equipmentDetails.supplier = null;
                break;

            case "propSupplier":
                $scope.propertyDetails.supplier = null;
                break;

            case "vechSupplier":
                $scope.vehicleDetails.supplier = null;
                break;
        }
    };


    //function SerachCustomersByType(type, input) {
    //    try {

    //        common.preprocessload();

    //        var req = {
    //            method: 'POST',
    //            url: common.connectivityUrl + '/api/SearchCustomers?type=' + type + '&input=' + input,
    //            headers: {
    //                "Content-Type": undefined
    //            },
    //            data: {}
    //        };

    //        $http(req).then(function success(response) {
    //            $scope.listSearchCustomer = response.data.output;
    //            common.preprocesshide();
    //        }, function error(response) {
    //            common.preprocesshide();
    //            $scope.error = response;
    //        }
    //        );
    //    } catch (e) {
    //        common.preprocesshide();
    //        alert("SerachCustomers " + e);
    //    }
    //}

    $scope.ValuationMarketValue_KeyUpEvent = function () {
        try {
            $scope.valuation.ltv = null;
            if ($scope.valuation.propotionValue != null && $scope.valuation.marketValue != null)
                $scope.valuation.ltv = CalculateLTV($scope.valuation.propotionValue, $scope.valuation.marketValue);
        } catch (e) {
            alert("Exception ValuationMarketValue_KeyUpEvent " + e);
        }
    };

    $scope.ValuationPropotionValue_KeyUpEvent = function (item) {
        try {
            $scope.valuation.ltv = null;
            var status = true; //ValuationFormFacilityPropotionValidation(item);
            if (item.propotionValue != null && item.marketValue != null && status)
                $scope.valuation.ltv = CalculateLTV($scope.valuation.propotionValue, $scope.valuation.marketValue);
        } catch (e) {
            alert("Exception ValuationPropotionValue_KeyUpEvent " + e);
        }
    };

    function CalculateLTV(val1, val2) {
        try {
            // val1 --> facility propotion value    // val2 --> market value
            var p = 0, m = 0, l = 0;
            p = parseFloat(val1);
            m = parseFloat(val2);
            if (m > 0)
                l = p / m;
            l = parseFloat(l.toFixed(2));
            return l;

        } catch (e) {
            alert("Exception CalculateLTV: " + e);
        }
    }
    function GetDefaultCurrency(currency) {
        try {
            if (currency == null)
                return $scope.listCurrency[GetArrayIndexByValue($scope.listCurrency, "type", currency)];//
            else
                return $scope.listCurrency[0];
        } catch (e) {
            alert("Exception GetDefaultCurrency" + e);
        }
    }
    $scope.SaveValuation_ClickEvent = function () {
        try {
            if ($scope.listCPRValuation.length != 0)
                SaveValuation();
            else
                dialogService.ConfirmDialogWithOkay('', 'Plese add at least one valuation');
        } catch (e) {
            alert("SaveAssetDetail_ClickEvent error" + e);
        }
    };

    function SaveValuation() {
        try {
            var cprId = GetUrlParameters();
            var valuationMapper = {
                'cprId': cprId,
                'cif': $scope.borrowerprofile.id,
                'listValuation': $scope.listCPRValuation,
                'listCPRUDF': null,
                'evaluationComment': $scope.valuationEvaluationComment
            };
            common.preprocessload();
            $http({
                url: "/CPRV2/SaveValuation",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { valuationMapper: valuationMapper }
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        common.preprocesshide();
                        //$scope.listCPRValuation = response.data.output.listValuation;
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                        
                    } else {
                        common.preprocesshide();
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
            alert("Exception SaveLiabilityDetail: " + e);
            common.LoderHide();

            // alert('AutoDraftCPR ' + e);
        }
    }
    //---------------------------Valuation Function End----------------------------------

    function GetValuationByCPRId(cprId) {
        try {
            $http({
                url: "/CPRV2/GetValuationDetailByCPRId",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cprId: cprId }
            }).then(function successCallback(response) {
                if (response.data != null || response.data != "") {
                    if (response.data.success) {
                        common.preprocesshide();
                        $scope.valuationMapper = response.data.output;
                        $scope.listCPRValuation = $scope.valuationMapper.listValuation;
                        
                        $scope.valuationEvaluationComment = $scope.valuationMapper.evaluationComment;
                       // dialogService.ConfirmDialogWithOkay('', response.data.message);

                    } else {
                        common.preprocesshide();
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

        }
        catch (e) {
        alert("Page_Load " + e);
    }
    }
    Page_Load();

    function GetUrlParameters() {
        var cPRId = (common.GetParameterByName("cprno", null));
        return cPRId;
    }
}));