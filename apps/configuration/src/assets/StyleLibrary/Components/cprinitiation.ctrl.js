(app.controller("CPRCtrl", ["$scope", "$http", "$filter", "$location", "$compile", "$timeout", "dialogService", "$q", "signalRService", "Idle", "$anchorScroll", "$parse"
    , function ($scope, $http, $filter, $location, $timeout, $compile
        , dialogService, $q, signalRService, Idle, $anchorScroll, $parse
    ) {


        ///...................................................................................................Variables
        $scope.isDisable = false;
        $scope.token = '';
        $scope.apiMessage = '';
        $scope.LoanResponseDataList = [];
        $scope.SavedExistingFacilityList = [];
        $scope.SavedGroupExistingFacilityList = [];
        $scope.isAlreadySaved = true;
        $scope.isAlreadyGroupSaved = true;
        $scope.groupCifList = [];
        $scope.groupExistingLoanList = [];

        $scope.customer = {
            id: '',
            name: '',
            fathersName: '',
            mothersName: '',
            personal: true,
            identity: null,
            registerNo: null,
            cif: null,
            nic: null,
            bokid: null,
            customerdate: null,
            ownership: null,
            title: null,
            address1: null,
            address2: null,
            telephone1: null,
            telephone2: null,
            fax: null,
            nationality: null,
            email: '',
            gender: null,
            taxNo: null,
            customerclassification: null,
            branch: null,
            officerCode: null,
            sectorCode: null,
            noofdependents: 0,
            taxFileNo: null,
            sourceofincome: null,
            employername: null,
            jobtitle: null,
            experience: null,
            maritalStatus: null,
            groupname: null,
            groupid: null,
            cBSCIF: null,
            branchId: null,
            regionId: null,
            rangeId: null,
            presentPostOffice: null,
            presentUpazilla: null,
            presentDistrict: null,
            presentCountryId: null,
            permanentPostOffice: null,
            permanentUpazilla: null,
            permanentDistrict: null,
            permanentCountryId: null,
            active: true,
            listCustomerReference: null
        };
        $scope.isEditMode = false;
        $scope.form = {};
        $scope.borrowerChanged = false;
        $scope.error = '';
        $scope.regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.defaultCurrency = 'BDT';
        $scope.selectedApplicantType = "Main";
        $scope.mainApplicantName = "";
        $scope.changeTab = "applicant";
        $scope.previouscprid = null;
        $scope.previouscpr = null;
        $scope.previouscprformurl = null;
        $scope.formatIndex = 1;
        $scope.loadCount = 0;
        $scope.AmortizedAmount = 0;
        $scope.RecurringAmount = 0;
        $scope.MEtotalDSCR = 0;
        $scope.MItotalDSCR = 0;
        $scope.MItotalNetIncome = 0;
        $scope.debtToEquity = "";
        $scope.finance = 0;
        $scope.statusMatched = false;
        $scope.readonlyFee = false;
        $scope.isIntroducerCommissionAmortized = false;
        $scope.Percentage = false;
        $scope.Amount = false;
        $scope.isStampDuty = true;
        $scope.isApplyDocumentCharges = true;
        $scope.IsDisabledGuarantorDelete = false;
        $scope.IslistYearCountMax = false;
        $scope.trigedSubmit = false;
        $scope.cribUploadUrl = false;
        $scope.productcode = null;
        $scope.peoplePickers = null;
        $scope.coverName = null;
        $scope.indexAdopt = null;

        var borrowerFound = false;
        var listFacilityPurposesCopy;
        var tempFacilityPurpose;
        var tempYOM;
        var highestProduct;
        var listCPRFacilityCopy;
        var listMonthlyIncome = [];
        var listMonthlyExpenditure = [];
        $scope.listNationality = [];
        $scope.listProducts = [];
        $scope.listCurrency = [];
        $scope.listFuelTypes = [];
        $scope.listSectorCode = [];
        $scope.listFeeType = [];
        $scope.listCAFClassification = [];
        $scope.listEconomicPurposeCode = [];
        $scope.listFinancialCategory = [];
        $scope.listClassificationCode = [];
        $scope.listLoanTypeCode = [];
        $scope.listSecurityType = [];
        $scope.listPropertyType = [];
        $scope.listMarketability = [];
        $scope.listApprovalSummary = [];
        $scope.listFacilityPurposes = [];
        $scope.listRepaymentMethods = [];
        $scope.listVehicleBodyTypes = [];
        $scope.listInterestRateOption = [];
        $scope.listPropertyTypeOfBond = [];
        $scope.listVehicleSecurityType = [];
        $scope.listValuationSecurityValue = [];
        $scope.listVehicleStatusWhenRegister = [];
        $scope.listPersnalGurantorLoanFacility = [];
        $scope.listTrialAmortization = [];
        $scope.listBusiness = [];
        $scope.listSpouseMonthlyIncome = [];
        $scope.listPartners = [];
        $scope.listTaxInformation = [];
        $scope.listCRIBAnalysis = [];
        /* $scope.listCRIBUpload = [];*/
        $scope.listCRIBStatus = [];
        $scope.listTrialUnStructured = [];
        $scope.FinantialActivityDetailsList = [];
        $scope.LiabilityDetailsList = [];
        $scope.AssetsDetailsMovableList = [];
        $scope.listLegalForms = [];
        $scope.listBorrowerProfileTypes = [];
        $scope.listCPRInfo = [];
        $scope.liabilitiesExisting = [];
        $scope.liabilitiesProposed = [];
        $scope.importExportPerformances = [];
        $scope.insuranceCoverDetailsList = [];
        $scope.insuranceCoverDetailsModelList = [];
        $scope.listimportExportPerformance = [];
        $scope.listCPRRenewalSummaryTemplate = [];
        $scope.IsblacklistedValue = ['No', 'Yes'];
        $scope.listMonthCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        $scope.listYearCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        $scope.listCPRParticularsConcernILCS = [];
        $scope.listAssestTangibleType = [];
        $scope.listPropertyTypeOfLand = [];
        $scope.listModeOfOwnerShipTransferType = [];
        $scope.listProductiveSector = [];
        $scope.BranchTitleDisplay = common.BranchTitleDisplay;
        $scope.listBranch = [];

        $scope.listAllApplicant = [];

        $scope.listCoverTypes = [];

        $scope.listChargeType = [];
        ///...................................................................................................Models        


        $scope.listcprformat = {
            id: '',
            format: ''
        };
        $scope.listcprtype = {
            id: '',
            action: ''
        };
        $scope.currentDate = $filter('date')(new Date(), 'DD/MM/YYYY');

        $scope.cprinit = {
            id: '',
            cprno: 'Pending',
            business: null,
            cif: '',
            cprtype: null,
            legalform: null,
            branch: '',
            division: '',
            cprformat: null,
            womanborrower: false,
            cPRDebtEquityRatio: {
                id: '',
                cPRId: '',
                proposedFinance: 0,
                projectedEquity: 0,
                active: true
            },
            refferal: false,
            smeeligibility: false,
            isevaulation: true,
            introducer: null,
            listBorrowerProfiles: [],
            listCPRFacilities: [],
            listIntroducerCommission: [],
            listCPRValuation: [],
            /*  listCRIBUpload: [],*/
            listCRIBAnalysis: [],
            listCPRWaiver: [],
            listcPRStockPosition: [],
            listCPRDeferral: [],
            listCPRGroupOverview: [],
            financialanalysis: {
                id: '',
                imgname: '',
                url: '',
                income: '',
                balance: '',
                cashflow: '',
                debatorage: '',
                stockage: '',
                creditorage: '',
                projectedcashflow: '',
                evaluatorcomments: ''
            },
            listDocumentChecklist: [],
            evaluationcomment: {
                id: null,
                enable: false,
                borrower: null,
                income: null,
                expenditure: null,
                facility: null,
                security: null,
                valuation: null,
                assets: null,
                liabilities: null,
                bankaccount: null,
                cribupload: null,
                documentchecklist: null,
                financialanaylsis: null,
                cribanalysis: null,
                creditscoring: null,
                taxinformation: null,
                repayment: null,
                businessProfile: null,
                subsidiaries: null,
                physicalExpansion: null,
                financialPerformance: null,
                turnOver: null,
                debtBurdenRatio: null,
                insurance: null,
                waiver: null,
                deferral: null,
                riskAnalysisICRRS: null,
                facilityClientRequest: null
            },
            listcPRCostEstimationModel: [],
            listimportExportPerformance: [],
            listCPRParticularsConcernILCS: [],
            listCPRParticularOfBill: [],
            essentialCodes: {
                id: '',
                cprId: '',
                lendingCategoryCode: '',
                lendingCategoryName: '',
                securityCode: '',
                securityName: '',
                loanTypeCode: '',
                loanTypeName: '',
                clientCode: '',
                clientName: '',
                directorLoanCode: '',
                directorLoanName: '',
                enterpriseCategoryCode: '',
                enterpriseCategoryName: '',
                sectorCode: '',
                sectorName: '',
                borrowerCode: '',
                borrowerName: '',
                financiaalCategoryCode: '',
                financiaalCategoryName: '',
                groupCode: '',
                groupName: '',
                womenEntrepreneurLoanCode: '',
                womenEntrepreneurLoanCodeName: '',
                concernTypeCode: '',
                concernTypeName: '',
                active: true
            },
            marketingOfficer: null,
            followupOfficer: null,
            beyondBranch: false,
            editable: true,
            enableSaveDraft: true,
            branchPosition: null,
            advancePosition: null,
            debtBurdenRatio: null,
            lastInspection: null,
            isRenewaldatacapture: false,
            investmentInBusinessModel: null,
            listUDFValues: [],
            groupController: null,
            groupControllerName: '',
            groupId: '',
            groupName: '',
            totaltax: 0,
            dAMasterTemplate: null,

            active: true
        };
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

        $scope.branchPosition = {
            id: 0,
            cPRId: 0,
            date: new Date(),
            totalDeposit: null,
            totalAdvance: null,
            profitLossDate: null,
            profitLossYear: null,
            classifiedAdvance: null,
            active: true
        };

        $scope.options = {
            aSign: ''
        };
        $scope.cribupload = {
            id: null,
            name: '',
            identyno: '',
            url: '',
            status: '',
            reportUptoDate: '',
            reportGenerationDate: '',
            description: '',
            criboverdue: '',
            isSupportingDocument: false,
            active: true
        };
        $scope.editable = {
            locked: false,
            disabled: true,
            view: true
        };

        $scope.borrowerprofile = {
            id: '',
            type: null,
            personal: null,
            cif: "",
            product: null,
            individual: null,
            stakeholder: null,
            listMonthlyIncome: [],
            listMonthlyExpenditure: [],
            listBankaccountdetails: [],
            listLiabilities: [],
            listMovableAssets: [],
            listotherLiability: [],
            listImmovableAssets: [],
            listCPRLiabilitySanctionHistory: [],
            listCPRPersonalProposalWithLiabilityExisting: [],
            listCPRPersonalProposalWithLiabilityProposed: [],
            listCPRPastPerformanceBG: [],
            listClientAccountMovementTurnover: [],
            listClientAccountDepositDetailModel: [],
            listSWOTAnalysis: [],
            cPRTotalExposure: null,
            cprBusinessProfileInformation: null,
            cPRBankersInformation: null,
            cPRIndustryAnalysis: null,
            cPRPhysicalExpansion: null,
            turnOverlist: null,
            // sWOTAnalysis: null,
            riskAnalysisICRRS: null,
            cashFlowAnalysis: null,
            listriskAnalysis: [],
            businessPerformanceAnalysis: null,
            cPRPresentProposalWithLiabilityPosition: null,
            totaltax: 0,
            active: true
        };
        $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed = [];

        $scope.supplierdetails = {
            code: '',
            name: '',
            isblacklisted: '',
            address: ''
        };

        $scope.taxinformation = {
            year: '',
            llcoyn: '',
            statutoryincome: '',
            assessableincome: '',
            taxableincome: '',
            taxpayable: '',
            taxpaid: '',
            saleamount: '',
            taxclearancecertificationdate: ''
        };
        $scope.cribanalysis = {
            name: [],
            criboverdue: false,
            status: '',
            description: '',
            evaluatorcomments: '',
            active: true
        };
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
        $scope.min = 0;
        $scope.max = 99999999999;
        $scope.cPRFacility = {
            id: null,
            facilityno: 'Pending',
            product: null,
            facilitytype: null,
            purposeoffacility: null,
            sectorcode: null,
            currency: null,
            amountrequest: 0,
            downPayment: 0,
            tenour: {
                termYears: $scope.listYearCount[0],
                termMonths: $scope.listMonthCount[0],
                totalTermMonths: 0
            },
            interestrate: 0,
            repaymentmethod: null,
            interestrateoption: null,
            economicPurposeCode: null,
            financialCategory: null,
            classificationCode: null,
            loanTypeCode: null,
            lIN: null,
            borrowerCode: null,
            directLoan: true,
            bankLoan: 0,
            equity: 0,
            facilityOption: 'Fresh',
            expiry: '',
            installmentAmount: 0,
            commission: 0,
            modeOfDisbursement: null,
            otherTermsConditions: '',
            overdue: null,
            eOL: null,
            repaymentArrangement: '',
            remark: null,
            accountNumber: null,
            listSecurityOffer: [],
            listCPRFacilitySectorCodeModel: [],
            listUDFValues: [],
            listCPRFacilityDocumentChargesModel: [],
            cPRFacilityCAFModel: {
                cAFClassificationModel: null,
                //riskWeight: null,
                npaPercent: null,
                npaConsiderationObtained: false,
                npaConsiderationApproval: null,
                active: true
            },
            active: true
        };
        $scope.cPRWaiver = {
            id: null,
            waiver: null,
            justification: null,
            deviation: false,
            active: true
        };
        //Puspak Deferral
        $scope.cPRDeferral = {
            id: null,
            deferral: null,
            duedate: null,
            justification: null,
            active: true
        };

        $scope.groupOverview = {
            id: 0,
            unitName: null,
            product: null,
            existingLimit: null,
            outstandingLimit: null,
            tenure: null,
            emi: null,
            timelyRepayment: null,
            interestRate: null,
            sol: null,
            cIFOfConcern: null,
            accountNumber: null,
            outstandingFunded: null,
            outstandingNonFunded: null,
            eOL: null,
            overdue: null,
            active: true
        };
        $scope.documentCharges = {
            id: null,
            feeType: null,
            fee: null,
            active: true
        };
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

        $scope.secondarystakeholder = {
            id: null,
            name: null,
            nic: null,
            address: null,
            position: null,
            qualification: {
                pHD: false,
                bSC: false,
                mBA: false,
                diploma: false,
                certificate: false,
                other: false
            },
            experience: null,
            precentageofshare: null,
            phoneNo: null,
            dOB: null,
            taxNo: null,
            personalNetWorth: 0,
            training: null,
            succession: null,
            others: null,
            nameOfTheFamilyMember: null,
            relationship: null,
            educationalQualification: null,
            profession: null,
            shareTransferee: null,
            shareHoldingAfterTransfer: null,
            relationshipWithSponsor: null,
            remark: null,
            stakeHolderFamilyBackgroundModelList: [],
            stakeHolderQualificationModelList: [],
            active: true
        };
        $scope.spousemonthlyincome = {
            id: null,
            sourceofincome: null,
            amount: 0,
            active: true
        };

        //Puspak Other source Income
        $scope.otherincomesourceModel = {
            id: null,
            sourceofOtherIncome: null,
            description: null,
            active: true
        };

        $scope.liabilitydetails = {
            nameOfBank: null,
            branchname: null,
            facilityNature: null,
            purposeOfFacility: null,
            facilityAmount: null,
            monthlyInstallment: null,
            balancePayable: null,
            security: null,
            expiry: null,
            nameOfAccount: null,
            historyOfCommencementRelationship: null,
            status: null,
            remark: null,
            liabilityType: null,
            active: true
        };
        $scope.borrowerProperties = {
            type: null,
            index: 0
        };
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
        $scope.cPRCostEstimationModel = {
            Id: 0,
            TypeOfCost: null,
            CustomerEstimation: null,
            BankEstimation: null,
            Created: null,
            Modified: null,
            Editor: null,
            CPRId: null,
            Author: null,
            Active: true
        };
        $scope.listcPRCostEstimationModel = [{
            Id: 0,
            TypeOfCost: null,
            CustomerEstimation: null,
            BankEstimation: null,
            Created: null,
            Modified: null,
            Editor: null,
            CPRId: null,
            Author: null,
            Active: true
        }];

        $scope.guarantorTab = {
            facility: null
        };
        $scope.disbursement = {
            Id: null,
            PayMethod: '',
            SavingAccountNo: '',
            Amount: null,
            MethodOfDisburst: '',
            Total: null,
            Instruction: '',
            CPRId: null,
            DisbursementPlanDisburseTo: [],
            DisbursementPlanPayment: []
        };
        $scope.paymentplanInfo = {
            Id: '',
            DisbursementPlanId: '',
            Stage: '',
            Amount: null,
            active: null
        };
        $scope.disbursetoInfo = {
            Id: '',
            DisbursementPlanId: '',
            DisburstTo: '',
            PayStage: '',
            SupplierName: '',
            Address: '',
            active: null
        };

        //Insurance
        $scope.coverName = null;
        //$scope.insuranceCoverDetailsList = [];
        //$scope.InsuranceCoverDetailsCount = 0;
        $scope.nowDateForInsuranceDetails = new Date();

        $scope.test = {
            cPRInsuranceDetailsModel: null,
            insuranceCoverDetailsList: []
        };
        $scope.insuranceCoverDetailsModelList = [];

        $scope.familyRelationshipList = [];
        $scope.familyBackgroundModel = {
            id: 0,
            cPRClientProfileId: 0,
            relationshipId: 0,
            nICOrCitizenshipNo: null,
            dOB: null,
            familyMemberName: null,
            age: 0,
            address: null,
            active: true,
            editor: 0,
            modified: new Date,
            author: 0,
            created: new Date,
            relationship: null,
            deceased: false,
            listClientFamilyEmployment: []
        };
        $scope.stakeholderFamily = {
            id: 0,
            clientStakeHolderId: 0,
            relationshipId: 0,
            nICOrCitizenshipNo: null,
            dOB: null,
            familyMemberName: null,
            age: 0,
            address: null,
            active: true,
            editor: 0,
            modified: new Date,
            author: 0,
            created: new Date,
            relationship: null,
            deceased: false,
            listClientFamilyEmployment: []
        };
        $scope.familyBackgroundList = [];
        $scope.ifcontactDetailsFilled = false;

        $scope.type = null;
        $scope.economicPurposeCode = {
            id: 0,
            code: null,
            active: true
        };
        $scope.financialCategory = {
            id: 0,
            category: null,
            active: true
        };
        $scope.classificationCode = {
            id: 0,
            code: null,
            active: true
        };
        $scope.loanTypeCode = {
            id: 0,
            code: null,
            active: true
        };
        $scope.sectoryCode = {
            id: 0,
            code: null,
            name: null,
            active: true
        };
        $scope.codeSectorViewModel = {
            economicPurposeCodeList: [],
            financialCategoryList: [],
            classificationCodeList: [],
            loanTypeCodeList: [],
            sectorCodeModelList: []
        };

        $scope.addressType = null;
        $scope.addressTypelist = null;
        $scope.addressDetailsList = [];
        $scope.addressDetails = {
            id: 0,
            address: null,
            distance: null,
            cPRClientProfileId: 0,
            addressType: null,
            postal: false,
            active: true
        };
        $scope.educationQualificationList = null;
        $scope.educationalQulaification = null;

        $scope.designationList = null;

        $scope.postal = false;
        $scope.itemTypeList = null;
        $scope.itemType = {
            id: 0,
            cpridd: null,
            name: null,
            active: true
        };
        $scope.limitedCompany = null;
        $scope.turnOver = {
            id: 0,
            cPRId: 0,
            year: new Date(),
            accnoAndName: null,
            bankName: null,
            drEntries: 0,
            drSummation: 0,
            crEntries: 0,
            crSummation: 0,
            earnings: 0,
            active: true
        };
        $scope.turnOverList = [];
        $scope.yearlist = [];
        $scope.yearforturnover = {
            value: null
        };
        $scope.turnOverDisable = false;
        $scope.keyRatioItem = {
            id: 0,
            type: null,
            currentYear: null,
            projectYear: null,
            active: true
        };
        $scope.keyRatioItemModel = {
            id: 0,
            cPRId: 0,
            type: null,
            active: true
        };
        $scope.keyRatios = {
            id: 0,
            cPRId: 0,
            currentYearValue: 0,
            projectYearValue: 0,
            keyRatioItem: null,
            active: true
        };
        $scope.keyRatiosModel = {
            id: 0,
            cPRId: 0,
            cpridd: null,
            currentYear: 0,
            projectYear: 0,
            keyRatioInputTypeModelList: [],
            active: true
        };
        $scope.keyRatiosModelList = [];
        $scope.cashFlowAnalysis = null;

        $scope.cashFlowActivityType = {
            id: 0,
            borrowerId: 0,
            name: null,
            active: true
        };
        $scope.importExportPerformance = {
            id: null,
            cprid: null,
            bankName: null,
            accountNameNumber: null,
            noOfImportLC: null,
            importAmount: null,
            noOfExportBill: null,
            exportAmount: null,
            active: true
        };
        $scope.cprFixedAssets = {
            id: '',
            cPRBusinessProfileInformationId: '',
            items: '',
            currentYear: '',
            currentYearValue: '',
            projectYear: '',
            projectYearValue: '',
            netAssetsOfCompany: '',
            active: true,
            Author: '',
            Created: '',
            Editor: '',
            Modified: ''
        };
        $scope.cprManagementBorrowingCompany = {
            id: '',
            cPRBusinessProfileInformationId: '',
            name: '',
            designation: '',
            mSc: false,
            bSc: false,
            diploma: false,
            other: false,
            experience: '',
            responsibility: '',
            listCPRManagementBorrowingCompanyQualification: [],
            active: true,
            Author: '',
            Created: '',
            Editor: '',
            Modified: ''
        };
        $scope.cprEmployeeInCompany = {
            id: '',
            cPRBusinessProfileInformationId: '',
            name: '',
            duty: '',
            experience: '',
            active: true,
            Author: '',
            Created: '',
            Editor: '',
            Modified: ''
        };
        $scope.cprSubsideries = {
            id: '',
            cPRBusinessProfileInformationId: '',
            name: '',
            address: '',
            owner: '',
            natureOfBusiness: '',
            percentageOfBorrower: '',
            active: true,
            author: '',
            created: '',
            editor: '',
            modified: ''
        };
        $scope.cprLiabilities = {
            id: '',
            cPRBusinessProfileInformationId: '',
            withBank: true,
            nameOfBank: '',
            nameOfAccount: '',
            natureOfFacility: '',
            limit: 0,
            expiryDate: '',
            branch: '',
            outStanding: 0,
            overDue: 0,
            classificationStatus: '',
            replacementPlanOfIrregularLiability: '',
            active: true,
            author: '',
            created: '',
            editor: '',
            modified: ''
        };
        $scope.cprLiabilitiesWB = {
            id: '',
            cPRBusinessProfileInformationId: '',
            withBank: true,
            nameOfBank: '',
            nameOfAccount: '',
            natureOfFacility: '',
            limit: 0,
            expiryDate: '',
            branch: '',
            outStanding: 0,
            overDue: 0,
            classificationStatus: '',
            replacementPlanOfIrregularLiability: '',
            active: true,
            author: '',
            created: '',
            editor: '',
            modified: ''
        };
        $scope.cprLiabilitiesWOB = {
            id: '',
            cPRBusinessProfileInformationId: '',
            withBank: false,
            nameOfBank: '',
            nameOfAccount: '',
            natureOfFacility: '',
            limit: 0,
            expiryDate: '',
            branch: '',
            outStanding: 0,
            overDue: 0,
            classificationStatus: '',
            replacementPlanOfIrregularLiability: '',
            active: true,
            author: '',
            created: '',
            editor: '',
            modified: ''
        };
        $scope.cprBusinessProfileInformation = {
            id: '',
            cPRClientProfileId: '',
            name: '',
            location: '',
            nameOfBank: '',
            marketingNetwork: '',
            noOfCompetitors: '',
            itemsOfBusiness: '',
            suppliers: '',
            businessType: '',
            areaOfOperaton: '',
            dateOfOpening: '',
            natureOfBusiness: '',
            noOfEmployees: '',
            experienceInCurrentBusiness: '',
            annualTurnOver: '',
            accountNo: '',
            active: true,
            author: '',
            created: '',
            editor: '',
            modified: '',
            ownershipDetail: '',
            successionPlan: '',
            listCPRFixedAssets: [],
            listCPRManagementBorrowingCompany: [],
            listCPRSubsideries: [],
            listCPREmployeeInCompany: [],
            listCPRLiabilities: []
        };

        $scope.subsidiaryOwners = [];
        $scope.businessPerformanceAnalysis = null;
        $scope.cprFixedAssetsList = [];
        $scope.cprManagementBorrowingCompanyList = [];
        $scope.cprSubsideriesList = [];
        $scope.cprEmployeeInCompanyList = [];
        $scope.cprLiabilitiesList = [];
        $scope.uploadfp = false;

        $scope.cprPersonalProposalWithLiabilityExisting = {
            id: '',
            cPRClientProfileId: '',
            limit: 0,
            marginHeld: 0,
            expiry: '',
            netLiability: 0,
            outStanding: 0,
            interestRate: 0,
            active: true

        };
        $scope.cprPersonalProposalWithLiabilityProposed = {
            id: '',
            cPRClientProfileId: '',
            limit: 0,
            expiry: '',
            interestRate: '',
            active: true
        };

        $scope.borrowerprofile.cPRBankersInformation = {
            id: '',
            cPRClientProfileId: '',
            previousBankersName: '',
            presentBankersName: '',
            active: true
        };


        $scope.borrowerprofile.cPRIndustryAnalysis = {
            id: '',
            cPRClientProfileId: '',
            positionWithRisk: '',
            enterprisePosition: '',
            active: true
        };
        $scope.borrowerprofile.cPRPhysicalExpansion = {
            id: '',
            cPRClientProfileId: '',
            showroom: '',
            manpower: '',
            machineryInstallation: '',
            freshFund: '',
            salesTurnoverRevenue: '',
            averageRawMaterialsProcurementCost: '',
            marketCompetition: '',
            changesProductionCapacity: '',
            marketShare: '',
            active: true
        };
        $scope.cPRPastPerformanceBG = {
            id: '',
            cPRClientProfileId: '',
            bankName: '',
            accountNameNumber: '',
            facilityType: '',
            year: '',
            number: '',
            amount: '',
            active: true
        };
        $scope.borrowerprofile.cPRTotalExposure = {
            id: '',
            cPRClientProfileId: '',
            existingLimitFunded: '',
            existingLimitNonFunded: '',
            existingLimitTotal: '',
            existingOutstandingFunded: '',
            existingOutstandingNonFunded: '',
            existingOutstandingTotal: '',
            proposedNewFunded: '',
            proposedNewNonFunded: '',
            proposedNewTotal: '',
            proposedRenewFunded: '',
            proposedRenewNonFunded: '',
            proposedRenewTotal: '',
            proposedEnhancementFunded: '',
            proposedEnhancementNonFunded: '',
            proposedEnhancementTotal: '',
            proposedReductionFunded: '',
            proposedReductionNonFunded: '',
            proposedReductionTotal: '',
            totalLimitFunded: '',
            totalLimitNonFunded: '',
            totalLimitTotal: '',
            totalExposureFunded: '',
            totalExposureNonFunded: '',
            totalExposureTotal: '',
            dateAsAt: '',
            active: true
        };
        $scope.borrowerprofile.cPRPresentProposalWithLiabilityPosition = {
            id: '',
            cPRClientProfileId: '',
            dateAsAt: '',
            natureOfFacility: '',
            active: true
        };
        $scope.cPRPersonalProposalWithLiabilityProposed = {
            id: 0,
            limit: null,
            expiry: null,
            interestRate: null,
            active: true
        };
        $scope.cPRPersonalProposalWithLiabilityExisting = {
            id: 0,
            cPRClientProfileId: '',
            limit: '',
            marginHeld: '',
            expiry: '',
            netLiability: '',
            outStanding: '',
            interestRate: '',
            active: true
        };
        $scope.customCheclistTemplateList = [];

        $scope.limitedCompanyAnalysisModel = {
            id: 0,
            currentYearFunds: 0,
            projectYearFunds: 0,
            typeName: null,
            seperateType: false,
            limitedCompanyItemType: null,
            active: true
        };
        $scope.stakeHolderFamilyBackgroundModel = {
            id: 0,
            profession: null,
            nameOfTheFamilyMember: null,
            relationship: null,
            educationalQualification: null,
            active: true
        };
        $scope.totalIncomeStakeHolder = 0;
        $scope.netAssetsOfCompany = null;
        $scope.commentsInTemplate = null;
        $scope.customerpp = null;
        $scope.valuersList = [];
        $scope.currentVariable = "Current";
        $scope.projectVariable = "Project";
        $scope.otherVariable = "Other";
        $scope.stakeHolderEducationalQualification = {
            id: 0,
            clientStakeHolderId: 0,
            educationalQualificationId: 0,
            active: true,
            educationQualification: null
        };
        $scope.individualEducationalQualification = {
            id: 0,
            cPRClientProfileId: 0,
            educationalQualificationId: 0,
            active: true
        };
        $scope.cPRManagementBorrowingCompanyQualification = {
            id: 0,
            cPRManagementBorrowingCompanyId: 0,
            educationalQualificationId: 0,
            active: true
        };
        $scope.cPRBusinessSupportingPapersDetails = {
            id: 0,
            cPRId: 0,
            businessSupportingPapersList: '',
            issueDate: '',
            validity: '',
            businessItems: '',
            remarks: '',
            active: true
        };
        $scope.cPRParticularsConcernILCS = {
            id: 0,
            cPRId: 0,
            iLCNo: null,
            lCAmount: 0.0,
            beneficiary: null,
            applicant: null,
            issuingBranch: null,
            active: true
        };
        $scope.listBusinessSupportingPapersList = [];
        $scope.cprinit.listCPRBusinessSupportingPapersDetails = [];
        $scope.particularOfBills = {
            id: 0,
            cPRId: 0,
            billNumberDate: '',
            billAmountFC: 0,
            billAmount: 0,
            margin: 0,
            iBPAmount: 0,
            maturity: '',
            active: true
        };
        $scope.listCPRParticularOfBill = [];
        $scope.listCPRHistoryFacility = [];
        $scope.clientPreviousEmploymentDetail = {
            id: null,
            cPRClientProfileId: null,
            salariedEmployeeId: null,
            organizationName: null,
            designation: null,
            joiningDate: null,
            releaseDate: null,
            phoneNo: null,
            totalWorkExperience: null,
            active: true
        };

        $scope.listCountry = [];
        $scope.re = /^[0-9]{1,14}$/;
        $scope.cPId = null;
        $scope.monthlytotaltax = null;
        $scope.isValidAmount = false;
        $scope.isDeasible = true;
        $scope.evaluationComments = {
            income: null,
            expenditure: null
        };
        //$scope.borrowerprofile = {
        //    listMonthlyIncome: [],
        //    listMonthlyExpenditure: [],
        //    totaltax: 0,
        //};
        $scope.monthlyTotalExpense = 0;
        $scope.monthlyTotalIncome = 0;
        $scope.listMonthlyIncome = [];
        $scope.monthlyincome = {
            id: '',
            type: '',
            amount: 0,
            isDSCR: false,
            active: false
        };
        $scope.totalMonthlyincome = 0;
        $scope.totalMonthlyexpenditure = 0;
        $scope.monthlyexpenditure = {
            id: '',
            type: '',
            amount: 0,
            total: '',
            debtratio: '',
            isDSCR: false,
            evalutorscomment: '',
            active: false
        };
        $scope.listMonthlyExpenditure = [];
        $scope.monthlyIncomes = [];
        $scope.monthlyExpenditures = [];

        // Bank Accounts
        $scope.isDiseable = true;
        $scope.isEdited = false;
        $scope.isAccDepositEdited = false;
        $scope.isExistingEdited = false;
        $scope.isAccountTurnOverEdited = false;

        var listAllUdf = $scope.listAllUDF;
        $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
        //$scope.borrowerprofile = {
        //    listOtherAccount: [],
        //    listBankaccountdetails: [],
        //    listClientAccountMovementTurnover: [],
        //    listClientAccountDepositDetailModel: [],
        //};
        // Existing Bank Account
        $scope.existingBankaccountdetail = {
            id: null,
            name: null,
            branchname: null,
            accountnumber: null,
            accounttype: null,
            currentbalance: null,
            isExisting: true,
            listUDFValues: [],
            accountOpenDate: null,
            active: true
        };

        // Other Bank Account
        $scope.bankaccountdetails = {
            id: null,
            name: null,
            branchname: null,
            accountnumber: null,
            accounttype: null,
            currentbalance: null,
            isExisting: false,
            listUDFValues: [],
            active: true
        };

        $scope.listUdfValues = [];
        // Account Movement Turnover
        $scope.accountMovementTurnover = {
            id: null,
            accountNo: null,
            periodFrom: null,
            periodTo: null,
            sanctionedLimit: null,
            beginningBalance: null,
            sumOfDebit: null,
            noOfDebit: null,
            sumOfCredit: null,
            noOfCredit: null,
            endingBalance: null,
            highestWithdrawal: null,
            lowestWithdrawal: null,
            lowestBalance: null,
            highestBalance: null,
            noOfTransactionOccured: null,
            accountTurnover: null,
            active: true
        };

        // Account Deposit Details
        $scope.customerAccountDepositDetail = {
            id: null,
            cPRClientProfileId: null,
            accountNo: null,
            depositDate: null,
            customerCIF: null,
            customerName: null,
            customerDeposit: null,
            alliedCIF: null,
            alliedName: null,
            alliedAccountNumber: null,
            alliedDeposit: null,
            isAllied: false,
            active: true
        };
        $scope.alliedAccountDepositDetail = {
            id: null,
            cPRClientProfileId: null,
            accountNo: null,
            depositDate: null,
            customerCIF: null,
            customerName: null,
            customerDeposit: null,
            alliedCIF: null,
            alliedName: null,
            alliedAccountNumber: null,
            alliedDeposit: null,
            isAllied: true,
            active: true
        };

        // Comment on Conduct Of Account
        $scope.clientCommentOnConductOfAccountModel = {
            id: 0,
            cPRClientProfileId: 0,
            depositACTransaction: '',
            loanACTransactionRepayment: '',
            otherComment: '',
            active: true
        };
        $scope.installmentSize = null;

        $scope.currentDate = $filter('date')(new Date(), "DD/MM/YYYY");
        //$scope.currentDate = new Date();

        // Page Load

        function Page_Load() {
            try {
                common.pageloadhide();
                var cprNo = common.GetParameterByName("cprno", null);
                GetCprByCprIdForValidation(cprNo);

                FacilityFormLoad();
                //GetMonthlyIncomeByCpId();
                //GetMonthlyExpenditureByCpId();
                GetMonthlyExpenditure();
                GetMonthlyIncome();
                GetCRIBStatus();
                GetLoanType();
                GetPayTerm();
                GetDocumentTypes();
                GetAssestTangibleTypes();
                GetModeOfOwnerShipTransferTypes();
                GetPropertyTypeOfLand();
                GetAllRelationships();
                GetAllAddressType();
                YearCalculation();
                DropDownYears();
                GetProductiveSectorType();
                //GetAllTemplates();
                GetAllFiscalYear();
                GetBranch();
                GetDivisions();
                GetAllNationality();
                GetCPRAndRefernceData();
                GetCountryOfOrigin();
                GetCurrentUserForApproval();
                var spHostUrl = common.GetParameterByName("SPHostUrl", null);
                if (spHostUrl != null) {
                    common.cprRedirectUrl += "&SPHostUrl=" + spHostUrl;
                }

                if (cprNo == null) {
                    GetCurrentUser();
                    GetCurrentUserBranch();
                }
                console.log($scope.cprinit.listCPRGroupOverview);
            } catch (e) {
                common.pageloadhide();
                alert("Page_Load " + e);
            }
        };

        // For facility monthly installment size
        $scope.getInstallmentSize = function () {
            var loanamt = parseFloat($scope.cPRFacility.amountrequest);
            var rate1 = $scope.cPRFacility.interestrate;
            rate1 = (parseFloat(rate1) / 100) / 12;
            var rate = rate1 + 1;
            var totalMonth = $scope.cPRFacility.tenour.totalTermMonths;
            var interestRate = Math.pow(rate, totalMonth);
            var E1 = loanamt * rate1 * interestRate;
            var E2 = interestRate - 1;
            var EMI = (E1 / E2);
            $scope.installmentSize = EMI.toFixed(2);
            // $scope.cPRFacility.installmentAmount = EMI.toFixed(2);
        }

        // for monthly Income & Expenditure
        function GetMonthlyIncomeByCpId() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPRV2/GetMonthlyIncomeByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId, cprId: cprId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        //listMonthlyIncome = [];
                        $scope.evaluationComments.income = null;
                        $scope.incomeExpenditureMapper = response.data.output;
                        if ($scope.incomeExpenditureMapper.monthlyIncomeList != null) {
                            /* $scope.monthlyIncomes = $scope.incomeExpenditureMapper.monthlyIncomeList;*/
                            $scope.borrowerprofile.listMonthlyIncome = $scope.incomeExpenditureMapper.monthlyIncomeList;
                            $scope.evaluationComments.income = $scope.incomeExpenditureMapper.evaluationComments;
                        }
                        else {
                            GetMonthlyIncome();
                        }
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetMonthlyIncomeByCpId " + e);
            }
        }

        function GetMonthlyExpenditureByCpId() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPRV2/GetMonthlyExpneditureByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId, cprId: cprId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        //$scope.listMonthlyExpenditure = [];
                        $scope.incomeExpenditureMapper = response.data.output;
                        $scope.evaluationComments.expenditure = null;
                        if ($scope.incomeExpenditureMapper.monthlyExpenditureList != null) {
                            $scope.borrowerprofile.listMonthlyExpenditure = $scope.incomeExpenditureMapper.monthlyExpenditureList;
                            $scope.evaluationComments.expenditure = $scope.incomeExpenditureMapper.evaluationComments;

                        }
                        else {
                            GetMonthlyExpenditure();
                        }

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetMonthlyIncomeByCpId " + e);
            }
        }

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

        $scope.GetMITotal = function () {
            var total = 0;
            if ($scope.borrowerprofile.listMonthlyIncome != null) {
                for (count = 0; count < $scope.borrowerprofile.listMonthlyIncome.length; count++) {
                    if (!isNaN($scope.borrowerprofile.listMonthlyIncome[count].amount) && $scope.borrowerprofile.listMonthlyIncome[count].active == true)
                        total += parseFloat($scope.borrowerprofile.listMonthlyIncome[count].amount, 10);
                }
                $scope.totalMonthlyincome = total;
                var totalwithcommas = formatNumber(total);
                return totalwithcommas;
            }

            return '0';

        };

        $scope.GetMETotal = function () {
            var total = 0;
            if ($scope.borrowerprofile.listMonthlyExpenditure !== null) {
                for (count = 0; count < $scope.borrowerprofile.listMonthlyExpenditure.length; count++) {
                    if (!isNaN($scope.borrowerprofile.listMonthlyExpenditure[count].amount) && $scope.borrowerprofile.listMonthlyExpenditure[count].active == true)
                        total += parseFloat($scope.borrowerprofile.listMonthlyExpenditure[count].amount, 10);
                }
                $scope.totalMonthlyexpenditure = total;
                var totalwithcommas = formatNumber(total);
                return totalwithcommas;
            }
            return null;
        };

        function GetMonthlyIncome() {
            try {
                $http({
                    url: "/CPRV2/GetMonthlyIncome",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listMonthlyIncome = [];
                        listMonthlyIncome = response.data.output;
                        $scope.monthlyIncomes = listMonthlyIncome;
                        $scope.borrowerprofile.listMonthlyIncome = listMonthlyIncome;
                        //angular.forEach(listMonthlyIncome, function (value) {
                        //    $scope.borrowerprofile.listMonthlyIncome.push(value);
                        //});
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetMonthlyIncome: " + e);
            }
        }
        function GetMonthlyExpenditure() {
            try {
                $http({
                    url: "/CPRV2/GetMonthlyExpenditure",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listMonthlyExpenditure = [];
                        listMonthlyExpenditure = response.data.output;
                        $scope.monthlyExpenditures = listMonthlyExpenditure;
                        $scope.borrowerprofile.listMonthlyExpenditure = listMonthlyExpenditure;
                        //angular.forEach(listMonthlyExpenditure, function (value) {
                        //    $scope.borrowerprofile.listMonthlyExpenditure.push(value);
                        //});
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetMonthlyExpenditure: " + e);
            }
        }
        $scope.AddMonthlyIncome_ClickEvent = function () {
            try {
                if ($scope.monthlyincome.amount > 0 && $scope.monthlyincome.type != '') {
                    $scope.monthlyincome.active = true;
                    $scope.borrowerprofile.listMonthlyIncome.push($scope.monthlyincome);
                    $scope.monthlyincome = {
                        id: '',
                        type: '',
                        amount: 0,
                        isDSCR: false,
                        active: true
                    };
                    // ResetMonthlyIncome();
                    $('#addincomemodal').modal('toggle');
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0 And Type is Mandatory");
                }

            } catch (e) {
                alert("AddMonthlyIncome_ClickEvent Error: " + e);
            }
        };

        $scope.ResetMonthlyIncome_ClickEvent = function () {
            //monthlyincome = null;
            ResetMonthlyIncome();
        };

        function ResetMonthlyIncome() {
            $scope.monthlyincome = {
                id: '',
                type: '',
                amount: 0,
                isDSCR: false,
                active: false

            };
            //$scope.addnewincomeform.$setPristine();
            //$scope.addnewincomeform.$setUntouched();
        }

        $scope.RemoveItemFromlistMonthlyIncome = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null || item.id == "") {
                        common.RemoveItemFromList(list, item, true);
                        // $scope.GetMITotal();
                    }

                    else {
                        common.SetActiveFalseForRemovedItem(list, item);

                    }

                }
            } catch (e) {
                alert("Exception RemoveItemFromlistMonthlyIncome Error: " + e);
            }
        };
        $scope.GetTotalDSCR = function (list) {
            try {
                var total = 0;
                if (list != null && list.length > 0) {
                    var listIsDSCR = $filter('filter')(list, { isDSCR: true }, true);
                    if (listIsDSCR.length > 0) {
                        angular.forEach(listIsDSCR, function (val) {
                            if (val.active && !isNaN(val.amount)) {
                                total += val.amount;
                            }
                        });
                    }
                }
                total = total.toFixed(2);
                $scope.monthlyTotalIncome = total;
                total = addCommas(total);
                return total;
            } catch (e) {
                alert('Exception GetTotalDSCR ' + e);
            }
        };
        $scope.GetTotalDSCRExpense = function (list) {
            try {
                var total = 0;
                if (list != null && list.length > 0) {
                    var listIsDSCR = $filter('filter')(list, { isDSCR: true }, true);
                    if (listIsDSCR.length > 0) {
                        angular.forEach(listIsDSCR, function (val) {
                            if (val.active && !isNaN(val.amount)) {
                                total += val.amount;
                            }
                        });
                    }
                }
                total = total.toFixed(2);
                //for BBL DBR
                $scope.monthlyTotalExpense = total;
                total = addCommas(total);
                return total;
            } catch (e) {
                alert('Exception GetTotalDSCRExpense ' + e);
            }
        };

        $scope.GetTotalNetIncome = function (num1, num2) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;

                var total = 0;
                if (num1 > 0 || num2 > 0) {
                    total = num1 - num2;
                }
                // for DBR
                $scope.monthlyTotalIncome = total;
                total = addCommas(total);

                return total;
            } catch (e) {
                alert('Exception GetTotalNetIncome ' + e);
            }
        };

        $scope.GetTotalUMI = function (MITot, METot) {
            try {
                var total = 0;
                $scope.UMItot = total;
                if (MITot > 0 || METot > 0) {
                    total = MITot - METot;
                }
                total = total.toFixed(2);
                total = addCommas(total);
                return total;

            } catch (e) {
                alert('Exception GetTotalUMI ' + e);
            }
        };
        $scope.burdenRatio = 0;
        $scope.CalDBRNew = function () {
            try {


                if (parseFloat($scope.monthlyTotalIncome) > 0 && parseFloat($scope.monthlyTotalExpense) > 0 && $scope.borrowerprofile.individual !== null) {


                    $scope.burdenRatio = ((parseFloat($scope.monthlyTotalExpense) / parseFloat($scope.monthlyTotalIncome)) * 100).toFixed(2);
                }
                else {
                    $scope.burdenRatio = 0;
                }
            } catch (ex) {
                alert("Exception in CalDBRNew " + ex);
            }
        };
        $scope.SubmitMonthlyIncome_ClickEvent = function () {
            try {
                if ($scope.totalMonthlyincome > 0)
                    SaveMonthlyIncome();
                else
                    dialogService.ConfirmDialogWithOkay('', "Please input at least one income option");
            } catch (e) {
                alert("SubmitMonthlyIncome_ClickEvent error" + e);
            }
        };
        function SaveMonthlyIncome() {
            try {
                var cpId = $scope.cPId;
                var cprId = GetUrlParameters();
                if (cpId != null) {
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveMonthlyIncome",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listMonthlyIncomeModel: $scope.borrowerprofile.listMonthlyIncome,
                            incomeComment: $scope.evaluationComments.income, cprId: cprId, cprClientProfileId: cpId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            // alert("Success");
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            //   $scope.monthlyIncomes = response.data.output;

                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {

                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                }

                else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveMonthlyIncome ' + e);
            }
        }

        $scope.AddMonthlyExpenditure_ClickEvent = function () {
            try {
                if ($scope.monthlyexpenditure.amount > 0 && $scope.monthlyexpenditure.expenditure != '') {
                    $scope.monthlyexpenditure.active = true;
                    $scope.borrowerprofile.listMonthlyExpenditure.push($scope.monthlyexpenditure);
                    ResetMonthlyExpenditure();
                    $('#addExpenmodal').modal('toggle');
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0 And Type is Mandatory");
                }

            } catch (e) {
                alert("AddMonthlyExpenditure_ClickEvent Error: " + e);
            }
        };
        $scope.ResetMonthlyExpenditure_ClickEvent = function () {
            ResetMonthlyExpenditure();
        };
        function ResetMonthlyExpenditure() {
            $scope.monthlyexpenditure = {
                id: '',
                type: '',
                amount: '',
                total: '',
                debtratio: '',
                isDSCR: false,
                evalutorscomment: '',
                active: false
            };
            //$scope.addnewexpenditureform.$setPristine();
            //$scope.addnewexpenditureform.$setUntouched();
        }
        $scope.RemoveItemFromlistMonthlyExpenditure = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null || item.id == "")
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistMonthlyExpenditure Error: " + e);
            }
        };

        $scope.SubmitMonthlyExpenditure_ClickEvent = function () {
            try {
                if ($scope.totalMonthlyexpenditure > 0)
                    SaveMonthlyExpenditure();
                else
                    dialogService.ConfirmDialogWithOkay('', "Please input at least one expense option");
            } catch (e) {
                alert("SubmitMonthlyExpenditure_ClickEvent error" + e);
            }
        };

        function SaveMonthlyExpenditure() {
            try {
                var cpId = $scope.cPId;
                var cprId = GetUrlParameters();
                if (cpId != null) {
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveMonthlyExpenditure",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listMonthlyExpenditureModel: $scope.borrowerprofile.listMonthlyExpenditure,
                            expenditureComment: $scope.evaluationComments.expenditure, cprId: cprId, cprClientProfileId: cpId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            // alert("Success");
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                                // $scope.monthlyExpenditures = response.data.output;

                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveMonthlyExpenditure ' + e);
            }
        }

        //$scope.CalTotalProjectedValue = function () {
        //    try {
        //        $scope.totalprojectedValue = parseFloat($scope.cprinit.cPRDebtEquityRatio.proposedFinance) + parseFloat($scope.cprinit.cPRDebtEquityRatio.projectedEquity);
        //    } catch (ex) {
        //        alert("Exception in CalTotalProjectedValue " + ex);
        //    }

        //};

        // Bank Accounts
        //$scope.getBankAccounts = function () {
        //    GetOtherAndExistingBankAccountByCifId();
        //    GetAccountDepositDetailByCpId();
        //    GetAccountMovementTurnOverByCpId();
        //    GetCommentOnCunductAccountByCpId();
        //}

        $scope.NonNegetiveValue = function (value) {
            if (value < 0) {
                dialogService.ConfirmDialogWithOkay('', "Value should not be negetive");
                $scope.isDiseable = false;
            }
            else {
                $scope.isDiseable = true;
            }
        };

        //  Existing Bank Account
        function GetOtherAndExistingBankAccountByCifId() {
            try {
                $http({
                    url: "/CPRV2/GetOtherAndExistingBankAccountByCifId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listBankaccountdetails = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetOtherAndExistingBankAccountByCifId " + e);
            }

        }

        $scope.AddExistingBankaccountDetails_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listBankaccountdetails.length == 0) {
                    $scope.borrowerprofile.listBankaccountdetails = [];
                }
                if ($scope.existingBankaccountdetail.currentbalance > 0) {
                    $scope.existingBankaccountdetail.isExisting = true;
                    $scope.borrowerprofile.listBankaccountdetails.push($scope.existingBankaccountdetail);
                    $scope.ResetExistingBankaccountDetailsTable_ClickEvent();
                    $scope.isExistingEdited = false;
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should not be negetive");
                }


            } catch (e) {
                alert("AddExistingBankaccountDetails_ClickEvent error" + e);
            }

        };

        $scope.ResetExistingBankaccountDetailsTable_ClickEvent = function () {
            $scope.existingBankaccountdetail = {
                id: null,
                name: null,
                branchname: null,
                accountnumber: null,
                accounttype: null,
                currentbalance: null,
                isExisting: true,
                listUDFValues: [],
                accountOpenDate: null,
                active: true
            };
            //$scope.addbankaccountdetailsform.$setUntouched();
            //$scope.addbankaccountdetailsform.$setPristine();
        };

        $scope.SubmitExistingBankAccount_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listBankaccountdetails.length != 0) {
                    SaveExistingBankAccount();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
                }

            } catch (e) {
                alert("SubmitExistingBankAccount_ClickEvent error" + e);
            }
        };

        function SaveExistingBankAccount() {
            try {
                var cprId = GetUrlParameters();
                var clientProfileId = $scope.cPId;
                if (clientProfileId != '') {
                    $scope.bankaccountdetails.listUDFValues = listAllUdf;
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveExistingBankAccount",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listBankAccountDetailsModel: $scope.borrowerprofile.listBankaccountdetails, listCPRUDF: $scope.listUdfValues,
                            cPRId: cprId, cprClientProfileId: clientProfileId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            // alert("Success");
                            $scope.borrowerprofile.listBankaccountdetails = response.data.output;
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                                //ResetExistingBankAccount();

                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                } else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveSWOTByApproval ' + e);
            }
        }

        $scope.SubmitOtherAccount_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listBankaccountdetails.length > 0 || $scope.listUdfValues.length > 0) {
                    SaveOtherBankAccount();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
                }

            } catch (e) {
                alert("SubmitOtherAccount_ClickEvent error" + e);
            }
        };
        function SaveOtherBankAccount() {
            try {
                var cprId = GetUrlParameters();
                var clientProfileId = $scope.cPId;
                if (clientProfileId != '') {
                    $scope.bankaccountdetails.listUDFValues = listAllUdf;
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveExistingBankAccount",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listBankAccountDetailsModel: $scope.borrowerprofile.listBankaccountdetails, listCPRUDF: $scope.listUdfValues,
                            cPRId: cprId, cprClientProfileId: clientProfileId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            $scope.borrowerprofile.listBankaccountdetails = response.data.output;
                            // alert("Success");
                            //GetOtherAndExistingBankAccountByCpId();
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                                //ResetExistingBankAccount();      
                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                } else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveOtherBankAccount ' + e);
            }
        }
        // Other Bank Account 

        function GetOtherAccountByCpId() {
            try {
                var clientProfileId = cifId;
                $http({
                    url: "/CPRV2/GetOtherAccountByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: clientProfileId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listBankaccountdetails = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetOtherAccountByCpId " + e);
            }
        }
        $scope.AddBankaccountDetails_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listBankaccountdetails == null) {
                    $scope.borrowerprofile.listBankaccountdetails = [];
                }
                if ($scope.bankaccountdetails.currentbalance > 0) {
                    $scope.bankaccountdetails.isExisting = false;
                    $scope.borrowerprofile.listBankaccountdetails.push($scope.bankaccountdetails);
                    $scope.ResetBankaccountDetailsTable_ClickEvent();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Amount should not be negetive");
                }


            } catch (e) {
                alert("AddBankaccountDetails_ClickEvent error" + e);
            }

        };

        $scope.EditItemFromBankAccountDetailList = function (rowtoedit) {
            try {
                if ($scope.listOtherAccount == null)
                    $scope.listOtherAccount = {};

                $scope.bankaccountdetails = rowtoedit;

                var index = $scope.borrowerprofile.listBankaccountdetails.indexOf(rowtoedit);
                $scope.borrowerprofile.listBankaccountdetails.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromBankAccountDetailList" + e);
            }
        };
        $scope.EditItemFromExistingBankAccountDetailList = function (rowtoedit) {
            try {
                if ($scope.existingBankaccountdetail == null)
                    $scope.existingBankaccountdetail = {};

                $scope.existingBankaccountdetail = rowtoedit;

                var index = $scope.borrowerprofile.listBankaccountdetails.indexOf(rowtoedit);
                $scope.borrowerprofile.listBankaccountdetails.splice(index, 1);
                $scope.isExistingEdited = true;

            } catch (e) {
                alert("Exception EditItemFromBankAccountDetailList" + e);
            }
        };
        $scope.RemoveItemFromlistBankAccount = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else {
                        common.SetActiveFalseForRemovedItem(list, item);
                        //var index = list.indexOf(item);

                        //$scope.borrowerprofile.listBankaccountdetails.splice(index, 1);
                    }

                }
            } catch (e) {
                alert("Exception RemoveItemFromlistBankAccount Error: " + e);
            }
        };

        $scope.ResetBankaccountDetailsTable_ClickEvent = function () {
            $scope.bankaccountdetails = {
                id: 0,
                name: null,
                branchname: null,
                accountnumber: null,
                accounttype: null,
                currentbalance: null,
                isExisting: false,
                listUDFValues: [],
                active: true
            };
            //$scope.addbankaccountdetailsform.$setUntouched();
            //$scope.addbankaccountdetailsform.$setPristine();
        };

        function generateNewUDFRow(item, list) {

            var tempColValues = [];
            angular.forEach(item.listUDFColumn, function (col) {
                //Check if Lookup
                if (col.dataType == 'Lookup' && col.expression != undefined && col.expression != null)
                    $scope.evaluateUDF_ClickEvent(col, item.listUDFColumn);

                var colValue = col.value;
                if (col.dataType == 'Date')
                    colValue = Date.parse(col.value);

                var tempCol = {};
                angular.copy({
                    id: col.id,
                    label: col.label,
                    dataType: col.dataType,
                    expression: col.expression,
                    value: colValue
                }, tempCol);
                tempColValues.push(tempCol);
            });

            if (list != null) {
                var obj = list.find(x => x.udfMasterId === item.id);
                if (obj == undefined) {
                    var newUDFValue = {
                        udfMasterId: item.id,
                        title: item.title,
                        rows: [{
                            cols: tempColValues
                        }]
                    };
                    list.push(newUDFValue);
                } else {
                    if (obj.rows == null)
                        obj.rows = [];
                    var newrow = {
                        cols: tempColValues
                    };
                    obj.rows.push(newrow);
                }
            } else {
                var newUDFValue1 = {
                    udfMasterId: item.id,
                    title: item.title,
                    rows: [{
                        cols: tempColValues
                    }]
                };
                list.push(newUDFValue1);
            }
        }

        $scope.AddUDFValueBtn_ClickEvent = function (item, list) {
            try {
                //if (list == undefined)
                //    list = [];
                generateNewUDFRow(item, list);
                $scope.ResetUDFValueBtn_ClickEvent(item);

                var formName = 'udfForm' + item.id;
                $scope.resetForm(formName);
            } catch (e) {
                alert("Exception AddUDFValueBtn_ClickEvent " + e);
            }
        };

        $scope.RemoveUDFValueBtn_ClickEvent = function (udf, row, list) {
            try {
                var udfIndex = list.indexOf(udf);
                var rowIndex = udf.rows.indexOf(row);
                list[udfIndex].rows.splice(rowIndex, 1);
            } catch (e) {
                alert("Exception RemoveUDFValueBtn_ClickEvent " + e);
            }
        };

        $scope.EditUDFValueItem_ClickEvent = function (selectUdf, row, udflist, list) {
            try {
                var index = GetArrayIndexByValue(udflist, "id", selectUdf.udfMasterId);
                var udf = udflist[index];
                angular.forEach(udf.listUDFColumn, function (col) {
                    var fieldIndex = GetArrayIndexByValue(row.cols, "id", col.id);
                    var field = row.cols[fieldIndex];
                    switch (col.dataType) {
                        case "Number":
                            col.value = Number(field.value);
                            break;
                        case "Date":
                            //col.value = new Date();
                            col.value = new Date(Number(field.value.toString()));
                            break;
                        default:
                            col.value = field.value;
                    }
                });

                var spliceUdf = list.indexOf(selectUdf);
                var spliceRow = selectUdf.rows.indexOf(row);
                list[spliceUdf].rows.splice(spliceRow, 1);
            } catch (e) {
                alert("Exception EditUDFValueItem_ClickEvent " + e);
            }
        };

        // Account Movement Turnover
        function GetAccountMovementTurnOverByCpId() {
            try {
                $http({
                    url: "/CPRV2/GetAccountMovementTurnOverByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.borrowerprofile.listClientAccountMovementTurnover = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetAccountMovementTurnOverByCpId " + e);
            }
        }

        $scope.GetEndingBalance = function () {
            var totalEndingBalance = 0;
            if ($scope.accountMovementTurnover != null)
                if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.beginningBalance) > 0 || parseFloat($scope.accountMovementTurnover.sumOfDebit) > 0) {
                    totalEndingBalance = parseFloat($scope.accountMovementTurnover.beginningBalance) + parseFloat($scope.accountMovementTurnover.sumOfDebit) - parseFloat($scope.accountMovementTurnover.sumOfCredit);
                    var totalwithcommas = formatNumber(totalEndingBalance);
                    $scope.accountMovementTurnover.endingBalance = totalwithcommas;
                    /*                $scope.accountMovementTurnover.endingBalance = totalEndingBalance;*/
                    return totalwithcommas;
                }
            return 0;
        };

        //$scope.GetTotalAccountTurnOver = function () {
        //    var totalTurnover = 0;
        //    if ($scope.accountMovementTurnover != null)
        //        if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.sanctionedLimit) > 0) {
        //            totalTurnover = parseFloat($scope.accountMovementTurnover.sumOfCredit) / parseFloat($scope.accountMovementTurnover.sanctionedLimit);
        //            var totalwithcommas = formatNumber(totalTurnover);
        //            $scope.accountMovementTurnover.accountTurnover = totalwithcommas;

        //            return totalwithcommas;
        //        }
        //    return 0;
        //};

        $scope.GetTotalAccountTurnOver = function () {
            var totalTurnover = 0;
            if ($scope.accountMovementTurnover != null)
                if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.sanctionedLimit) > 0) {
                    totalTurnover = parseFloat($scope.sumOfCredit) / parseFloat($scope.sanctionLimit);
                    var totalwithcommas = formatNumber(totalTurnover);
                    $scope.accountMovementTurnover.accountTurnover = totalwithcommas;

                    return totalwithcommas;
                }
            return 0;
        };

        $scope.GetSumOfCredit = function (sumOfCredit) {
            $scope.sumOfCredit = sumOfCredit;
        }

        $scope.GetSanctionLimit = function (sanctionLimit) {
            $scope.sanctionLimit = sanctionLimit;
        }

        $scope.AddAcoountMovementTurnover_ClickEvent = function () {
            try {

                if ($scope.accountMovementTurnover.sanctionedLimit != null && $scope.accountMovementTurnover.beginningBalance != null && $scope.accountMovementTurnover.sumOfDebit != null && $scope.accountMovementTurnover.sumOfCredit != null) {
                    if ($scope.borrowerprofile.listClientAccountMovementTurnover == null) {
                        $scope.borrowerprofile.listClientAccountMovementTurnover = [];
                    }
                    $scope.borrowerprofile.listClientAccountMovementTurnover.push($scope.accountMovementTurnover);
                    $scope.ResetAccountMovementTurnover_ClickEvent();
                    $scope.isAccountTurnOverEdited = false;
                }
                else {
                    dialogService.ConfirmDialogWithOkay("", 'Please enter required field');
                }

            } catch (e) {
                alert("AddAcoountMovementTurnover_ClickEvent error" + e);
            }
        };

        $scope.EditItemFromAccountMovementTurnoverList = function (rowtoedit) {
            try {
                if ($scope.accountMovementTurnover == null)
                    $scope.accountMovementTurnover = {};
                rowtoedit.periodFrom = $filter('date')(rowtoedit.periodFrom, "dd-MM-yyyy");
                rowtoedit.periodTo = $filter('date')(rowtoedit.periodTo, "dd-MM-yyyy");
                $scope.accountMovementTurnover = rowtoedit;

                var index = $scope.borrowerprofile.listClientAccountMovementTurnover.indexOf(rowtoedit);
                $scope.borrowerprofile.listClientAccountMovementTurnover.splice(index, 1);
                $scope.isAccountTurnOverEdited = true;

            } catch (e) {
                alert("Exception EditItemFromAccountMovementTurnoverList" + e);
            }
        };

        $scope.RemoveItemFromlistAccountMovementTurnover = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else {
                        common.SetActiveFalseForRemovedItem(list, item);
                        //var index = list.indexOf(item);
                        //$scope.borrowerprofile.listClientAccountMovementTurnover.splice(index, 1);
                    }
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistAccountMovementTurnover Error: " + e);
            }
        };

        $scope.ResetAccountMovementTurnover_ClickEvent = function () {
            $scope.accountMovementTurnover = {
                id: null,
                accountNo: null,
                periodFrom: null,
                periodTo: null,
                sanctionedLimit: null,
                beginningBalance: null,
                sumOfDebit: null,
                noOfDebit: null,
                sumOfCredit: null,
                noOfCredit: null,
                endingBalance: null,
                highestWithdrawal: null,
                lowestWithdrawal: null,
                lowestBalance: null,
                highestBalance: null,
                noOfTransactionOccured: null,
                accountTurnover: null,
                active: true
            };
        };

        $scope.SubmitAccountMovementTurnOver_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listClientAccountMovementTurnover.length > 0) {
                    SaveAccountMovementTurnOver();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
                }

            } catch (e) {
                alert("SubmitExistingBankAccount_ClickEvent error" + e);
            }
        };

        function SaveAccountMovementTurnOver() {
            try {
                var clientProfileId = $scope.cPId;
                if (clientProfileId != '') {
                    $scope.bankaccountdetails.listUDFValues = listAllUdf;
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveAccountMovementTurnOver",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listClientAccountMovementTurnoverModel: $scope.borrowerprofile.listClientAccountMovementTurnover, cprClientProfileId: clientProfileId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            $scope.borrowerprofile.listClientAccountMovementTurnover = response.data.output;
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {


                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                } else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveAccountMovementTurnOver ' + e);
            }
        }

        // Account Deposit Detail
        $scope.AddCustomerAcoountDepositDetail_ClickEvent = function () {
            try {
                if (ValidateCustomerAccountDepositDetail()) {
                    if ($scope.borrowerprofile.listClientAccountDepositDetailModel == null) {
                        $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
                    }
                    if ($scope.customerAccountDepositDetail.customerDeposit > 0) {
                        $scope.customerAccountDepositDetail.isAllied = false;
                        $scope.isAccDepositEdited = false;
                        $scope.borrowerprofile.listClientAccountDepositDetailModel.push($scope.customerAccountDepositDetail);
                        $scope.ResetCustomerAccountDepositDetail_ClickEvent();
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0");
                    }

                }
            } catch (e) {
                alert("AddCustomerAcoountDepositDetail_ClickEvent error" + e);
            }
        };
        $scope.ResetCustomerAccountDepositDetail_ClickEvent = function () {
            $scope.customerAccountDepositDetail = {
                id: null,
                cPRClientProfileId: null,
                accountNo: null,
                depositDate: null,
                customerCIF: null,
                customerName: null,
                customerDeposit: null,
                alliedCIF: null,
                alliedName: null,
                alliedAccountNumber: null,
                alliedDeposit: null,
                isAllied: false,
                active: true
            };
        };
        $scope.EditItemFromCustomerAccountDepositDetailList = function (rowtoedit) {
            try {
                if ($scope.customerAccountDepositDetail == null)
                    $scope.customerAccountDepositDetail = {};

                $scope.customerAccountDepositDetail = rowtoedit;

                var index = $scope.borrowerprofile.listClientAccountDepositDetailModel.indexOf(rowtoedit);
                $scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
                $scope.isAccDepositEdited = true;

            } catch (e) {
                alert("Exception EditItemFromCustomerAccountDepositDetailList" + e);
            }
        };
        $scope.RemoveItemFromlistAccountDepositDetail = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else {
                        common.SetActiveFalseForRemovedItem(list, item);
                        //var index = list.indexOf(item);
                        //$scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
                    }

                }
            } catch (e) {
                alert("Exception RemoveItemFromlistAccountDepositDetail Error: " + e);
            }
        };
        $scope.AddAlliedAcoountDepositDetail_ClickEvent = function () {
            try {
                if (ValidateAlliedAccountDepositDetail()) {
                    if ($scope.borrowerprofile.listClientAccountDepositDetailModel.length == 0) {
                        $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
                    }
                    if ($scope.alliedAccountDepositDetail.alliedDeposit > 0) {
                        $scope.alliedAccountDepositDetail.isAllied = true;
                        $scope.isEdited = false;
                        $scope.borrowerprofile.listClientAccountDepositDetailModel.push($scope.alliedAccountDepositDetail);
                        $scope.ResetAlliedAccountDepositDetail_ClickEvent();
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Amount should be greater than 0");
                    }

                }
            } catch (e) {
                alert("AddAlliedAcoountDepositDetail_ClickEvent error" + e);
            }
        };
        $scope.ResetAlliedAccountDepositDetail_ClickEvent = function () {
            $scope.alliedAccountDepositDetail = {
                id: null,
                cPRClientProfileId: null,
                accountNo: null,
                depositDate: null,
                customerCIF: null,
                customerName: null,
                customerDeposit: null,
                alliedCIF: null,
                alliedName: null,
                alliedAccountNumber: null,
                alliedDeposit: null,
                isAllied: true,
                active: true
            };
        };
        $scope.EditItemFromAlliedAccountDepositDetailList = function (rowtoedit) {
            try {
                if ($scope.alliedAccountDepositDetail == null)
                    $scope.alliedAccountDepositDetail = {};

                $scope.alliedAccountDepositDetail = rowtoedit;
                var index = $scope.borrowerprofile.listClientAccountDepositDetailModel.indexOf(rowtoedit);
                $scope.borrowerprofile.listClientAccountDepositDetailModel.splice(index, 1);
                $scope.isEdited = true;

            } catch (e) {
                alert("Exception EditItemFromAlliedAccountDepositDetailList" + e);
            }
        };
        $scope.SubmitAccountDepositDetails_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listClientAccountDepositDetailModel.length != 0) {
                    SaveAccountDepositDetail();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "There should be at least one record to save");
                }
            } catch (e) {
                alert("SubmitAccountDepositDetails_ClickEvent error" + e);
            }
        };
        function GetAccountDepositDetailByCpId() {
            try {
                $http({
                    url: "/CPRV2/GetAccountDepositDetailByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        list = response.data.output;

                        $scope.borrowerprofile.listClientAccountDepositDetailModel = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetAccountDepositDetailByCpId " + e);
            }
        }
        function SaveAccountDepositDetail() {
            try {
                var clientProfileId = $scope.cPId;
                if (clientProfileId != '') {
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveAccountDepositDetails",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            listClientAccountDepositDetailModel: $scope.borrowerprofile.listClientAccountDepositDetailModel, cprClientProfileId: clientProfileId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            $scope.borrowerprofile.listClientAccountDepositDetailModel = response.data.output;
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {
                                //ResetAccountDepositDetails();

                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }
            } catch (e) {
                common.preprocesshide();
                alert('SaveAccountMovementTurnOver ' + e);
            }
        }
        function ValidateCustomerAccountDepositDetail() {
            if ($scope.customerAccountDepositDetail.accountNo == null || $scope.customerAccountDepositDetail.accountNo == "") {
                return false;
            } else {
                return true;
            }
        }
        function ValidateAlliedAccountDepositDetail() {
            if ($scope.alliedAccountDepositDetail.alliedAccountNumber == null || $scope.alliedAccountDepositDetail.alliedAccountNumber == "") {
                return false;
            } else {
                return true;
            }
        }
        //function ResetAccountDepositDetails() {
        //    $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
        //}
        // Comment on Conduct of Account

        function GetCommentOnCunductAccountByCpId() {
            try {
                $http({
                    url: "/CPRV2/GetCommentOnConductOfAccountByCPId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cprClientProfileId: $scope.cPId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.clientCommentOnConductOfAccountModel = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCommentOnCunductAccountByCpId " + e);
            }
        }
        $scope.SubmitCmOnConductAccount_ClickEvent = function () {
            try {
                if ($scope.clientCommentOnConductOfAccountModel != null) {
                    SaveCommentOnConductAcc();
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Empty model please input");
                }

            } catch (e) {
                alert("SubmitCmOnConductAccount_ClickEvent error" + e);
            }
        };

        function SaveCommentOnConductAcc() {
            try {
                var clientProfileId = $scope.cPId;
                if (clientProfileId != '') {
                    common.preprocessload();
                    $http({
                        url: "/CPRV2/SaveCommentOnConductOfAccount",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({
                            clientCommentOnConductOfAccountModel: $scope.clientCommentOnConductOfAccountModel, cprClientProfileId: clientProfileId
                        })
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            $scope.clientCommentOnConductOfAccountModel = response.data.output;
                            common.preprocesshide();
                            // $scope.borrowerprofile.listSWOTAnalysis = response.data.output;
                            dialogService.ConfirmDialogWithOkay('', global._savedSuccessfully).then(function successCallback(response) {

                            }, function errorCallback(response) {
                                common.preprocesshide();
                            }
                            );
                        }
                        else {
                            common.preprocesshide();
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                    });
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "ClientProfile Id is null, Save Client Profile first Or Reload the page");
                }

            } catch (e) {
                common.preprocesshide();
                alert('SaveAccountMovementTurnOver ' + e);
            }
        }

        $scope.NonNegetiveValue = function (value) {
            if (value < 0) {
                dialogService.ConfirmDialogWithOkay('', "Value should not be negetive");
                $scope.cprinit.enableSaveDraft = false;
            } else {
                $scope.cprinit.enableSaveDraft = true;
            }
        };

        $scope.makechange = function (amt) {
            return amt;
            //var parts = amt.toString().split(".");
            //parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //return parts.join(".");
        };

        $scope.AddStageDisbursementStage_ClickEvent = function () {
            try {
                if (angular.isUndefined($scope.disbursement.DisbursementPlanPayment) || $scope.disbursement.DisbursementPlanPayment === null) {
                    $scope.disbursement.DisbursementPlanPayment = [];
                }
                var StageDisburst = {
                    Id: $scope.paymentplanInfo.Id,
                    DisbursementPlanId: $scope.paymentplanInfo.DisbursementPlanId,
                    Stage: $scope.paymentplanInfo.Stage,
                    Amount: $scope.paymentplanInfo.Amount,
                    active: true
                };

                $scope.disbursement.Total += $scope.paymentplanInfo.Amount;
                $scope.disbursement.DisbursementPlanPayment.push(StageDisburst);
                // CLEAR TEXTBOX.
                $scope.paymentplanInfo = {
                    Id: '',
                    DisbursementPlanId: '',
                    Stage: '',
                    Amount: null,
                    active: null
                };

            } catch (e) {
                alert("AddStageDisbursementStage_ClickEvent Error: " + e);
            }
        };
        $scope.EditItemFromlistDisbursementStage_ClickEvent = function (list, item) {
            try {
                $scope.disbursement.Total -= item.Amount;
                $scope.paymentplanInfo = item;

                if (list != null)
                    common.RemoveItemFromList(list, item, false);

            } catch (e) {
                alert("EditItemFromlistDisbursementStage_ClickEvent Error: " + e);
            }
        };
        $scope.RemoveItemFromlistDisbursementStage = function (list, item) {
            try {

                $scope.disbursement.Total -= item.Amount;
                if (list != null && item != null) {
                    if (item.Id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveItemFromlistDisbursementStage Error: " + e);
            }
        };
        $scope.AddDisburstToDisbursement_ClickEvent = function () {
            try {
                if (angular.isUndefined($scope.disbursement.DisbursementPlanDisburseTo) || $scope.disbursement.DisbursementPlanDisburseTo === null) {
                    $scope.disbursement.DisbursementPlanDisburseTo = [];
                }
                var disburstToList = {
                    Id: $scope.disbursetoInfo.Id,
                    DisbursementPlanId: $scope.disbursetoInfo.DisbursementPlanId,
                    DisburstTo: $scope.disbursetoInfo.DisburstTo,
                    PayStage: $scope.disbursetoInfo.PayStage,
                    SupplierName: $scope.disbursetoInfo.SupplierName,
                    Address: $scope.disbursetoInfo.Address,
                    active: true
                };
                $scope.disbursement.DisbursementPlanDisburseTo.push(disburstToList);
                // CLEAR TEXTBOX.
                $scope.disbursetoInfo = {
                    Id: '',
                    DisbursementPlanId: '',
                    DisburstTo: '',
                    PayStage: '',
                    SupplierName: '',
                    Address: '',
                    active: null
                };
            } catch (e) {
                alert("AddDisburstToDisbursement_ClickEvent Error: " + e);
            }
        };
        $scope.EditItemFromlistDisbursementDisburstToRow_ClickEvent = function (list, item) {

            try {
                $scope.disbursetoInfo = item;

                if (list != null)
                    common.RemoveItemFromList(list, item, false);

            } catch (e) {
                alert("EditItemFromlistDisbursementDisburstToRow_ClickEvent Error: " + e);
            }
        };
        $scope.RemoveItemFromlistDisbursementDisburstToRow = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.Id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveItemFromlistDisbursementStage Error: " + e);
            }
        };
        $scope.SubmitDisbursementPlan_ClickEvent = function () {
            try {
                SubmitDisbursementPlan();
            } catch (e) {
                alert('SubmitDisbursementPlan_ClickEvent ' + e);
            }
        };

        $scope.RemoveItemFromlistPreviousEmploymentDetail = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistPreviousEmploymentDetail Error: " + e);
            }
        };

        $scope.RemoveItemFromlistAccountDepositDetail = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistAccountDepositDetail Error: " + e);
            }
        };

        $scope.RemoveItemFromFinancialDetalList = function (rowToBeRemoved) {
            try {
                var index = $scope.FinantialActivityDetailsList.indexOf(rowToBeRemoved);
                $scope.FinantialActivityDetailsList.splice(index, 1);
            } catch (e) {
                alert("Excepetion RemoveItemFromFacilityDetalsList" + e);
            }
        };
        $scope.RemoveItemFromLiabilityDetalList = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromLiabilityDetalList" + e);
            }
        };
        $scope.RemoveItemFromMovableAssetsDetalList = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromMovableAssetsDetalList" + e);
            }
        };
        $scope.RemoveItemFromImmovableAssetsDetalList = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromImmovableAssetsDetalList" + e);
            }
        };

        $scope.RemoveItemFromlistSWOTAnalysis = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistSWOTAnalysis Error: " + e);
            }
        };

        $scope.EditItemFromSWOTAnalysisList = function (rowtoedit) {
            try {
                if ($scope.sWOTAnalysis == null)
                    $scope.sWOTAnalysis = {};

                $scope.sWOTAnalysis = rowtoedit;

                var index = $scope.borrowerprofile.listSWOTAnalysis.indexOf(rowtoedit);
                $scope.borrowerprofile.listSWOTAnalysis.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromSWOTAnalysisList" + e);
            }
        };

        ///..............................................................................................Functions
        function addCommas(nStr) {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
        ///............................................Logic Functions

        $scope.GetTotal = function (list) {
            try {
                if (list != null && list.length > 0) {
                    var total = 0.00;
                    var result = "0.00";
                    for (var i = 0; i < list.length; i++)
                        total += parseFloat(list[i].amount, 10);
                    result = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    return result;
                }
                return "0.00";
            } catch (e) {
                alert("Exception GetTotal " + e);
            }
        };

        $scope.GetBorrowerProfileIndex = function (borrowerProfile) {
            try {
                var index = $scope.cprinit.listBorrowerProfiles.indexOf(borrowerProfile);
                return index;
            } catch (e) {
                alert("GetBorrowerProfileIndex " + e);
                return -1;
            }
        };
        //puspak
        $scope.GetTotalDebtToEquity = function (num1, num2) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;

                var total = 0;
                if (num1 > 0 || num2 > 0) {
                    total = num1 / num2;
                }
                $scope.getInstallmentSize();
                // return total;
                //$scope.debtToEquity = num1 + ':'+ num2;
                $scope.debtToEquity = total.toFixed(0) + ':' + (total.toFixed(0) * 2);
                return $scope.debtToEquity;

            } catch (e) {
                alert('Exception GetTotalDebtToEquity ' + e);
            }
        };

        $scope.GetTotalFinance = function (num1, num2) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;

                var total = 0;
                if (num1 > 0 || num2 > 0) {
                    var devider = num1 + num2;
                    var mainvalue = num1 / devider;
                    total = mainvalue * 100;
                }
                return total;

            } catch (e) {
                alert('Exception GetTotalFinance ' + e);
            }
        };

        //puspak
        $scope.FilterFacility = function (item) {
            return (item.active === true && item.facilityno !== 'Pending');
        };
        $scope.FilterRenemalCPRs = function (item) {
            return (item.status === 'Completed' && item.reinitated === false);
        };

        //#region Ananta            
        $scope.EditItemFromLiabilityDetailList = function (list, item) {
            try {

                $scope.liabilitydetails = item;
                if (list != null)
                    common.RemoveItemFromList(list, item, false);

            } catch (e) {
                alert("Exception EditItemFromLiabilityDetailList" + e);
            }
        };
        $scope.EditItemFromMovableAssetsDetailList = function (x) {
            try {
                if ($scope.assetsDetailsMovable == null)
                    $scope.assetsDetailsMovable = {};

                $scope.assetsDetailsMovable = x;

                var index = $scope.borrowerprofile.listMovableAssets.indexOf(x);
                $scope.borrowerprofile.listMovableAssets.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromMovableAssetsDetailList" + e);
            }
        };
        $scope.EditItemFromImmovableAssetsDetailList = function (x) {
            try {
                if ($scope.assetsDetailsImmovable == null)
                    $scope.assetsDetailsImmovable = {};

                $scope.assetsDetailsImmovable = x;

                var index = $scope.borrowerprofile.listImmovableAssets.indexOf(x);
                $scope.borrowerprofile.listImmovableAssets.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromImmovableAssetsDetailList" + e);
            }
        };
        //#endregion

        ///Other
        var checkuploadvaluecrib = document.getElementById("cribFileUploader");
        var checkuploadvaluefa = document.getElementById("faFileUploader");
        var checkuploadvaluefp = document.getElementById("fpFileUploader");

        ///common
        function GetUrlParameters() {
            var cPRId = (common.GetParameterByName("cprno", null));
            return cPRId;
        }
        function GetListItemById(list, id) {
            try {
                var result;
                if (list.length > 0 && id != null) {
                    result = $filter('filter')(list, { id: id }, true);
                }
                return result[0];
            } catch (e) {
                alert("Exception GetListItemById " + e);
            }
        }
        function FindListItemTrueValueAvailability_Function(list) {
            try {
                if (list != null) {
                    for (var i = 0; i < list.length; i++)
                        if (list[i].active)
                            return true;

                    return false;
                }
            } catch (e) {
                alert("Exception FindListItemTrueValueAvailability" + e);
            }
        }
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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
        function Erroralert(message) {
            dialogService.ConfirmDialogWithOkay('', message);
        }
        function Erroralertlist(list) {
            var string = "";
            if (list.length != 1) {
                for (i = 0; i < list.length; i++) {
                    if (i == list.length - 1)
                        string = string + "and " + list[i];
                    else if (i == list.length - 2)
                        string = string + list[i] + " ";
                    else
                        string = string + list[i] + "," + " ";
                };
            } else {
                string = list[0];
            }
            string = string + " details are not available";
            return string;
        }
        function BindReferenceData(output) {
            try {
                // Bussniess

                $scope.business = output.bussiness;

                // Borrower Profile 
                var listBorrowerProfileTypes = output.borrowerProfileTypes;
                if ($scope.cprinit.listBorrowerProfiles.length == 0) {
                    $scope.borrowerprofile.type = listBorrowerProfileTypes[0];
                    $scope.cprinit.listBorrowerProfiles.push($scope.borrowerprofile);
                }
                $scope.listBorrowerProfileTypes = listBorrowerProfileTypes;
                $scope.borrowerProperties.type = $scope.listBorrowerProfileTypes[0];

                // CPR Actions
                $scope.listCPRActionModel = [];
                var listCPRActions = output.cprActionTypes;

                if (!$scope.cprinit.isRenewaldatacapture) {
                    //$scope.listCPRActionModel.push(listCPRActions[0]);
                    //$scope.cprinit.cprtype = $scope.listCPRActionModel[0];
                    $scope.listCPRActionModel = output.cprActionTypes;
                    $scope.cprinit.cprtype = $scope.listCPRActionModel[0];
                }
                else {
                    $scope.listCPRActionModel = listCPRActions;
                    $scope.cprinit.cprtype = $scope.listCPRActionModel[1];
                }

                //francis
                $scope.listCPRRenewvalTypeModel = output.cprRenewTypes;

                // CPR formats
                $scope.cprformat = output.cprFormats;
                $scope.cprinit.cprformat = $scope.cprformat[0];
                $scope.baseRate = output.baseRate;
                $scope.baseRateEnable = false; //output.baseRateEnable;
                if (output.bcUrl != null)
                    common.connectivityUrl = output.bcUrl;
                if (output.bcType != null)
                    $scope.integrationMode = output.bcType;

                //Waiver Types
                $scope.listWaiverType = output.listWaiverType;
                //Deferral Type
                $scope.listDeferralType = output.listDeferralType;
                //ALLUDF
                $scope.listAllUDF = output.listAllUDF;
                //Educational Qualification
                $scope.educationQualificationList = output.listEducationQualification;
                //Currency
                $scope.listCurrency = output.listCurrencyType;
                $scope.cPRFacility.currency = GetDefaultCurrency($scope.defaultCurrency);
                //RepaymentMethods
                $scope.listRepaymentMethods = output.listRepaymentMethods;
                $scope.cPRFacility.repaymentmethod = $scope.listRepaymentMethods[1];
                //SecurityTypes
                $scope.listSecurityType = output.listSecurityType;

                //$scope.cprBusinessProfileInformation = output.cpr.listBorrowerProfiles
                if (output.listCPRRenewalSummaryTemplate != null) {
                    $scope.listCPRRenewalSummaryTemplate = output.listCPRRenewalSummaryTemplate;
                }

                //FAtemplates
                $scope.listFATemplates = output.listFATemplates;

                $scope.designationList = output.listDesignation;
                $scope.loadCount++;
                UpdateNepaliDates();
            } catch (e) {
                alert("BindReferenceData " + e);
            }
        }
        function BindCPR(cPRId, cprinit) {
            try {
                // console.log(cprinit.previousEvaluation);
                //  console.log(cprinit);
                GetCostEstimationList(cPRId);
                //GetCPRWaiverByCPR(cPRId);
                //GetCPRDeferralByCPR(cPRId);
                GetCPRGroupOverviewByCPR(cPRId);
                $scope.cprinit = cprinit;
                //    console.log(cprinit.previousEvaluation);
                listCPRFacilityCopy = angular.copy($scope.cprinit.listCPRFacilities);
                // CPR Actions
                $scope.listCPRActionModel = [];
                //$scope.listCPRActionModel.push(cprinit.cprtype);
                // $scope.cprinit.cprtype = $scope.listCPRActionModel[0];

                $scope.listCPRActionModel.push(cprinit.cprtype);
                $scope.cprinit.cprtype = $scope.listCPRActionModel;

                // $scope.test = cprinit.marketingOfficer.designation;

                if ($scope.cprinit.cprtype.action == 'Renew') {
                    $scope.cprinit.listExisitingCPRFacilities = $scope.cprinit.listCPRFacilities;
                }

                if ($scope.cprinit.listCPRFacilities === null) {
                    $scope.cprinit.listCPRFacilities = [];
                }

                if ($scope.cprinit.followupOfficer.displayName === null) {
                    $scope.cprinit.followupOfficer = null;
                }

                //if ($scope.cprinit.marketingOfficer.designation === null) {
                //    $scope.cprinit.followupOfficer = null;
                //}

                signalRService.CPRStart(common.GetParameterByName("cprno", null));

                if ($scope.cprinit.editable == false) {
                    GetApprovalSummary();
                    $scope.statusMatched = true;
                    $scope.approverView = true;
                }
                else if ($scope.cprinit.editable == true) {
                    if ($scope.cprinit.status != "Draft")
                        GetApprovalSummary();

                    $scope.ChangeNavigation_ClickEvent(1);
                }

                if ($scope.cprinit.status != "Draft")
                    $scope.ChangeNavigation_ClickEvent(17);

                if ($scope.business != null) {
                    $scope.cprinit.business = $filter('filter')($scope.business, { id: $scope.cprinit.business.id })[0];
                    GetProductByBusiness($scope.cprinit.business);
                }
                if ($scope.listCPRActionModel != null)
                    $scope.cprinit.cprtype = $filter('filter')($scope.listCPRActionModel, { id: $scope.cprinit.cprtype.id })[0];
                if ($scope.cprformat != null)
                    $scope.cprinit.cprformat = $filter('filter')($scope.cprformat, { id: $scope.cprinit.cprformat.id })[0];

                GetLegalFormsByBusinessesForGetCPR($scope.cprinit.business);

                if ($scope.cprinit.financialanalysis == null) {
                    $scope.cprinit.financialanalysis = {
                        id: '',
                        imgname: '',
                        url: '',
                        income: '',
                        balance: '',
                        cashflow: '',
                        debatorage: '',
                        stockage: '',
                        creditorage: '',
                        projectedcashflow: '',
                        evaluatorcomments: '',
                    };
                }

                if ($scope.borrowerprofile.listMovableAssets == null) {
                    $scope.borrowerprofile.listMovableAssets = [];
                }
                if ($scope.borrowerprofile.listImmovableAssets == null) {
                    $scope.borrowerprofile.listImmovableAssets = [];
                }
                if ($scope.borrowerprofile.cashFlowAnalysis == null) {
                    $scope.borrowerprofile.cashFlowAnalysis = null;
                }
                if ($scope.borrowerprofile.turnOverlist == null) {
                    $scope.borrowerprofile.turnOverlist = [];
                }
                if ($scope.borrowerprofile.listriskAnalysis == null) {
                    $scope.borrowerprofile.listriskAnalysis = [];
                }
                if ($scope.borrowerprofile.businessPerformanceAnalysis == null) {
                    $scope.borrowerprofile.businessPerformanceAnalysis = null;
                }
                if ($scope.borrowerprofile.stakeholder != null) {
                    if ($scope.borrowerprofile.stakeholder.addressDetailsList == null) {
                        $scope.borrowerprofile.stakeholder.addressDetailsList = [];
                    }
                    if ($scope.borrowerprofile.stakeholder.listSecondaryStakeholder == null) {
                        $scope.borrowerprofile.stakeholder.listSecondaryStakeholder = [];
                    }
                }
                if ($scope.borrowerprofile.individual == null) {
                    $scope.borrowerprofile.individual = {};
                }
                if ($scope.borrowerprofile.individual.listClientFamily == null) {
                    $scope.borrowerprofile.individual.listClientFamily = [];
                }
                if ($scope.borrowerprofile.individual.listUDFValues == null) {
                    $scope.borrowerprofile.individual.listUDFValues = [];
                }
                if ($scope.borrowerprofile.individual.listindividualQualification == null) {
                    $scope.borrowerprofile.individual.listindividualQualification = [];
                }
                if ($scope.borrowerprofile.individual.spouseDetail == null) {
                    $scope.borrowerprofile.individual.spouseDetail = {};
                    $scope.borrowerprofile.individual.spouseDetail.listClientSpouseDetailMonthlyIncome = [];
                }
                if ($scope.cprinit.listimportExportPerformance == null) {
                    $scope.cprinit.listimportExportPerformance = [];
                }
                if ($scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed == null) {
                    $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed = [];
                }
                if ($scope.cprinit.listCPRParticularsConcernILCS == null) {
                    $scope.cprinit.listCPRParticularsConcernILCS = [];
                }
                if ($scope.cprinit.listCPRParticularOfBill == null) {
                    $scope.cprinit.listCPRParticularOfBill = [];
                }
                if ($scope.cprinit.creditScore == null)
                    $scope.cprinit.creditScore = {
                        id: null,
                        product: null,
                        scoreCardTemplate: null,
                        listQuestions: [],
                        grade: null,
                        totalMark: null,
                        active: true
                    };

                if ($scope.cprinit.evaluationcomment == null)
                    $scope.cprinit.evaluationcomment = {
                        id: null,
                        enable: false,
                        borrower: null,
                        income: null,
                        expenditure: null,
                        facility: null,
                        security: null,
                        valuation: null,
                        assets: null,
                        liabilities: null,
                        bankaccount: null,
                        cribupload: null,
                        documentchecklist: null,
                        financialanaylsis: null,
                        cribanalysis: null,
                        creditscoring: null,
                        taxinformation: null,
                        repayment: null,
                        trialcalculation: null,
                        businessProfile: null,
                        subsidiaries: null,
                        physicalExpansion: null,
                        financialPerformance: null,
                        turnOver: null,
                        debtBurdenRatio: null,
                        riskAnalysisICRRS: null
                    };

                if ($scope.cprinit.financialanalysis.url != null && $scope.cprinit.financialanalysis.url != "") {
                    $scope.editable.view = false;
                }
                if ($scope.cprinit.listCRIBAnalysis != null) {
                    if ($scope.cprinit.listCRIBAnalysis[0] == null) {
                        $scope.cprinit.listCRIBAnalysis = [];
                    }
                }

                GetEvaluatorCommentsByCPR(cPRId);

                if ($scope.cprinit.listCPRFacilities != null) {
                    FilterFacilityForPersonalGuarantor($scope.cprinit.listCPRFacilities);
                    GetHighestPriductFromList($scope.cprinit.listCPRFacilities);
                    ReStrtureTrialCalculation();
                }

                //Business Profile----------------
                if ($scope.cprinit.listBorrowerProfiles[0] != null) {
                    var borrowerProfile = $scope.cprinit.listBorrowerProfiles[0];
                    common.borrowerprofile.id = borrowerProfile.id;
                    common.nid = borrowerProfile.individual.nic;
                    $scope.cPId = borrowerProfile.id;
                    common.borrowerprofile.id = $scope.cPId;
                    common.totaltax = borrowerProfile.totaltax;
                    $scope.monthlytotaltax = borrowerProfile.totaltax;

                    GetMonthlyExpenditureByCpId();
                    GetMonthlyIncomeByCpId();


                    GetOtherAndExistingBankAccountByCifId();
                    GetAccountDepositDetailByCpId();
                    GetAccountMovementTurnOverByCpId();
                    GetCommentOnCunductAccountByCpId();

                    GetBindBusinessProfile($scope.cprinit.listBorrowerProfiles[0]);
                    GetAllSavedExistingFacilityByCPId();
                    GetAllSavedGroupExistingFacilityByCPId();
                }
                if ($scope.cprinit.listBorrowerProfiles.length > 0) {
                    $scope.riskAnalysisICRRS = $scope.cprinit.listBorrowerProfiles[0].riskAnalysisICRRS;
                }
                //debugger;// Commented as moved to datacollection checklist ctrl
                //if ($scope.cprinit.listCPRFacilities !== null && $scope.cprinit.listCPRFacilities.length !== 0) {
                //    for (var i = 0; i < $scope.cprinit.listCPRFacilities.length; i++) {
                //        GetCustomCheckListByProductId($scope.cprinit.listCPRFacilities[i].product);
                //    }
                //}
                //if ($scope.cprinit.listCPRProjectNeedAssessment2 !== null && $scope.cprinit.listCPRProjectNeedAssessment2.length !== 0) {
                //    $scope.projectassessmenttype.latestHistorical = $scope.cprinit.listCPRProjectNeedAssessment2[0].latestHistorical;
                //    $scope.projectassessmenttype.projectedYear = $scope.cprinit.listCPRProjectNeedAssessment2[0].projectedYear;
                //}
                //if ($scope.cprinit.listBorrowerProfiles.length > 0 && $scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel != undefined) {
                //    if ($scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel.length > 0) {
                //        SeperateAlliedDepositDetail($scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel);
                //    }
                //}



                //Nepali Date
                // UpdateNepaliDates();

                //FinancialAnalysisTemplates
                //$scope.listFATemplates = $scope.cprinit.listfinancialTemplateTypeModel;
                //for (var i = 0; i < $scope.listFATemplates.length; i++) {
                //    if ($scope.listFATemplates[i].selected == true) {
                //        $scope.selectedTemplate = $scope.listFATemplates[i];
                //        break;
                //    }
                //}

                //$scope.cprinit.cPRFAConfigModel=$scop

            } catch (e) {
                alert("BindCPR " + e);
            }
        }
        function SeperateAlliedDepositDetail() {
            for (var i = 0; i < $scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel.length; i++) {
                if ($scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel[i].alliedAccountNumber == null
                    || $scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel[i].alliedAccountNumber == "") {
                    $scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel[i].isAllied = false;
                } else {
                    $scope.cprinit.listBorrowerProfiles[0].listClientAccountDepositDetailModel[i].isAllied = true;
                }
            }
        }
        function BindPreviousCPR(cPRId, precprinit) {
            try {
                //   console.log(precprinit);
                GetCostEstimationList(cPRId);
                GetCPRWaiverByCPR(cPRId);
                GetCPRDeferrlByCPR(cPRId);
                $scope.precprinit = precprinit;
                // listCPRFacilityCopy = angular.copy ($scope.precprinit.listCPRFacilities);

                if ($scope.precprinit.followupOfficer.displayName === null) {
                    $scope.precprinit.followupOfficer = null;
                }

                signalRService.CPRStart(common.GetParameterByName("cprno", null));

                if ($scope.precprinit.editable == false) {
                    GetApprovalSummary();
                    $scope.statusMatched = true;
                    $scope.approverView = true;
                }
                else if ($scope.precprinit.editable == true) {
                    if ($scope.precprinit.status != "Draft")
                        GetApprovalSummary();

                    $scope.statusMatched = false;
                    $scope.ChangeNavigation_ClickEvent(1);
                }

                if ($scope.precprinit.status != "Draft")
                    $scope.ChangeNavigation_ClickEvent(17);


                if ($scope.business != null) {
                    $scope.precprinit.business = $filter('filter')($scope.business, { id: $scope.precprinit.business.id })[0];
                    GetProductByBusiness($scope.precprinit.business);
                }
                if ($scope.listCPRActionModel != null)
                    $scope.precprinit.cprtype = $filter('filter')($scope.listCPRActionModel, { id: $scope.precprinit.cprtype.id })[0];
                if ($scope.cprformat != null)
                    $scope.precprinit.cprformat = $filter('filter')($scope.cprformat, { id: $scope.precprinit.cprformat.id })[0];


                GetLegalFormsByBusinessesForGetCPR($scope.precprinit.business);

                if ($scope.precprinit.financialanalysis == null) {
                    $scope.precprinit.financialanalysis = {
                        id: '',
                        imgname: '',
                        url: '',
                        income: '',
                        balance: '',
                        cashflow: '',
                        debatorage: '',
                        stockage: '',
                        creditorage: '',
                        projectedcashflow: '',
                        evaluatorcomments: '',
                    };
                }

                if ($scope.borrowerprofile.listMovableAssets == null) {
                    $scope.borrowerprofile.listMovableAssets = [];
                }
                if ($scope.borrowerprofile.listImmovableAssets == null) {
                    $scope.borrowerprofile.listImmovableAssets = [];
                }
                if ($scope.borrowerprofile.cashFlowAnalysis == null) {
                    $scope.borrowerprofile.cashFlowAnalysis = null;
                }
                if ($scope.borrowerprofile.turnOverlist == null) {
                    $scope.borrowerprofile.turnOverlist = [];
                }
                if ($scope.borrowerprofile.listriskAnalysis == null) {
                    $scope.borrowerprofile.listriskAnalysis = [];
                }
                if ($scope.borrowerprofile.businessPerformanceAnalysis == null) {
                    $scope.borrowerprofile.businessPerformanceAnalysis = null;
                }
                if ($scope.borrowerprofile.stakeholder != null) {
                    if ($scope.borrowerprofile.stakeholder.addressDetailsList == null) {
                        $scope.borrowerprofile.stakeholder.addressDetailsList = [];
                    }
                }
                if ($scope.borrowerprofile.individual == null) {
                    $scope.borrowerprofile.individual = {};
                }
                if ($scope.borrowerprofile.individual.listClientFamily == null) {
                    $scope.borrowerprofile.individual.listClientFamily = [];
                }
                if ($scope.borrowerprofile.individual.listUDFValues == null) {
                    $scope.borrowerprofile.individual.listUDFValues = [];
                }
                if ($scope.borrowerprofile.individual.listindividualQualification == null) {
                    $scope.borrowerprofile.individual.listindividualQualification = [];
                }
                if ($scope.precprinit.listimportExportPerformance == null) {
                    $scope.precprinit.listimportExportPerformance = [];
                }
                if ($scope.precprinit.creditScore == null)
                    $scope.precprinit.creditScore = {
                        id: null,
                        product: null,
                        scoreCardTemplate: null,
                        listQuestions: [],
                        grade: null,
                        totalMark: null,
                        active: true
                    };

                if ($scope.precprinit.evaluationcomment == null)
                    $scope.precprinit.evaluationcomment = {
                        id: null,
                        enable: false,
                        borrower: null,
                        income: null,
                        expenditure: null,
                        facility: null,
                        security: null,
                        valuation: null,
                        assets: null,
                        liabilities: null,
                        bankaccount: null,
                        cribupload: null,
                        documentchecklist: null,
                        financialanaylsis: null,
                        cribanalysis: null,
                        creditscoring: null,
                        taxinformation: null,
                        repayment: null,
                        trialcalculation: null,
                        businessProfile: null,
                        subsidiaries: null,
                        physicalExpansion: null,
                        financialPerformance: null,
                        turnOver: null,
                        debtBurdenRatio: null,
                        insurance: null,
                        waiver: null,
                        deferral: null,
                        riskAnalysisICRRS: null
                    };

                if ($scope.precprinit.financialanalysis.url != null && $scope.precprinit.financialanalysis.url != "") {
                    $scope.editable.view = false;
                }
                if ($scope.cprinit.listCRIBAnalysis[0] != null) {
                    if ($scope.precprinit.listCRIBAnalysis[0] == null) {
                        $scope.precprinit.listCRIBAnalysis = [];
                    }
                }


                // GetDocumentChecklistByCPRId(cPRId);
                GetEvaluatorCommentsByCPR(cPRId);

                //Puspak
                //GetDisbursementPlanByCPRId(cPRId);

                if ($scope.precprinit.listCPRFacilities != null) {
                    FilterFacilityForPersonalGuarantor($scope.precprinit.listCPRFacilities);
                    GetHighestPriductFromList($scope.precprinit.listCPRFacilities);
                    ReStrtureTrialCalculation();
                }

                //Business Profile----------------
                if ($scope.precprinit.listBorrowerProfiles[0] != null) {
                    GetBindBusinessProfile($scope.precprinit.listBorrowerProfiles[0]);
                }


            } catch (e) {
                alert("BindCPR " + e);
            }
        }
        function BindCPRSaveDraft(cprinit) {
            try {
                $scope.cprinit = cprinit;
                if ($scope.cprinit.listCPRValuation != null && $scope.cprinit.listCPRValuation != undefined) {
                    if ($scope.cprinit.listCPRValuation.length > 0) {
                        for (var i = 0; i < $scope.cprinit.listCPRValuation.length; i++) {
                            // valuation.valuerType
                            if ($scope.cprinit.listCPRValuation[i].valuerType == "Internal") {
                                if (isJson($scope.cprinit.listCPRValuation[i].valuer.name)) {
                                    $scope.cprinit.listCPRValuation[i].valuer.name = JSON.parse($scope.cprinit.listCPRValuation[i].valuer.name);
                                }
                                else {
                                    $scope.cprinit.listCPRValuation[i].valuer.name = JSON.stringify($scope.cprinit.listCPRValuation[i].valuer.name);
                                }
                            }
                        }
                    }
                }
                $scope.borrowerprofile = $scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index];
                common.borrowerprofile.id = $scope.borrowerprofile.id;
                //common.totaltax = $scope.borrowerProfile.totaltax;
                //BindStakeHolderDate();
                listCPRFacilityCopy = angular.copy($scope.cprinit.listCPRFacilities);
                if ($scope.cprinit.followupOfficer != null)
                    if ($scope.cprinit.followupOfficer.displayName === null) {
                        $scope.cprinit.followupOfficer = null;
                    }

                if ($scope.cprinit.listCPRFacilities === null) {
                    $scope.cprinit.listCPRFacilities = [];
                }

                //signalRService.CPRStart(common.GetParameterByName("cprno", null));

                if ($scope.cprinit.editable == false) {
                    GetApprovalSummary();
                    $scope.statusMatched = true;
                    $scope.approverView = true;
                }
                else if ($scope.cprinit.editable == true) {
                    if ($scope.cprinit.status != "Draft")
                        GetApprovalSummary();

                    $scope.statusMatched = false;
                }

                if ($scope.business != null) {
                    $scope.cprinit.business = $filter('filter')($scope.business, { id: $scope.cprinit.business.id })[0];
                }
                if ($scope.listCPRActionModel != null)
                    $scope.cprinit.cprtype = $filter('filter')($scope.listCPRActionModel, { id: $scope.cprinit.cprtype.id })[0];
                if ($scope.cprformat != null)
                    $scope.cprinit.cprformat = $filter('filter')($scope.cprformat, { id: $scope.cprinit.cprformat.id })[0];

                if ($scope.listLegalForms != null)
                    $scope.cprinit.legalform = $filter('filter')($scope.listLegalForms, { id: $scope.cprinit.legalform.id })[0];

                if ($scope.cprinit.financialanalysis == null) {
                    $scope.cprinit.financialanalysis = {
                        id: '',
                        imgname: '',
                        url: '',
                        income: '',
                        balance: '',
                        cashflow: '',
                        debatorage: '',
                        stockage: '',
                        creditorage: '',
                        projectedcashflow: '',
                        evaluatorcomments: '',
                    };
                }

                if ($scope.borrowerprofile.listMovableAssets == null) {
                    $scope.borrowerprofile.listMovableAssets = [];
                }
                if ($scope.borrowerprofile.listImmovableAssets == null) {
                    $scope.borrowerprofile.listImmovableAssets = [];
                }
                if ($scope.cprinit.creditScore == null)
                    $scope.cprinit.creditScore = {
                        id: null,
                        product: null,
                        scoreCardTemplate: null,
                        listQuestions: [],
                        grade: null,
                        totalMark: null,
                        active: true
                    };

                if ($scope.cprinit.evaluationcomment == null)
                    $scope.cprinit.evaluationcomment = {
                        id: null,
                        enable: false,
                        borrower: null,
                        income: null,
                        expenditure: null,
                        facility: null,
                        security: null,
                        valuation: null,
                        assets: null,
                        liabilities: null,
                        bankaccount: null,
                        cribupload: null,
                        documentchecklist: null,
                        financialanaylsis: null,
                        cribanalysis: null,
                        creditscoring: null,
                        taxinformation: null,
                        repayment: null,
                        trialcalculation: null,
                        businessProfile: null,
                        subsidiaries: null,
                        physicalExpansion: null,
                        financialPerformance: null,
                        turnOver: null,
                        debtBurdenRatio: null,
                        insurance: null,
                        waiver: null,
                        deferral: null,
                        riskAnalysisICRRS: null
                    };

                if ($scope.cprinit.financialanalysis.url != null && $scope.cprinit.financialanalysis.url != "") {
                    $scope.editable.view = false;
                }

                if ($scope.cprinit.listCRIBAnalysis == null) {
                    $scope.cprinit.listCRIBAnalysis = [];
                }

                if ($scope.cprinit.listCPRFacilities != null) {
                    FilterFacilityForPersonalGuarantor($scope.cprinit.listCPRFacilities);
                    ReStrtureTrialCalculation();
                }
                else
                    $scope.cprinit.listCPRFacilities = [];
                if ($scope.cprinit.listBorrowerProfiles[0] != null) {
                    GetBindBusinessProfile($scope.cprinit.listBorrowerProfiles[0]);
                }

                //FinancialAnalysisTemplates
                $scope.selectedTemplate = $scope.cprinit.financialTemplateTypeModel;
                //$scope.listFATemplates = $scope.cprinit.listfinancialTemplateTypeModel;
                //for (var i = 0; i < $scope.listFATemplates.length; i++) {
                //    if ($scope.listFATemplates[i].selected == true) {
                //        $scope.selectedTemplate = $scope.listFATemplates[i];
                //        break;
                //    }
                //}

            } catch (e) {
                alert("BindCPRSaveDraft " + e);
            }
        }
        function GenerateYOMList() {
            try {

                var max = parseInt(new Date().getFullYear());
                $scope.listYOM = [];
                for (var i = 1970; i < max; i++) {
                    $scope.listYOM.push(i.toString());
                }
            } catch (e) {
                alert("Exception GenerateYOMList" + e);
            }
        }
        function GetParameterByApplicantType(app) {
            try {
                if (app !== null) {
                    if (app === "Joint")
                        return 2;
                    else if (app === "Guarantor")
                        return 3;
                    else
                        return 1;
                }
            } catch (e) {
                alert("Exception GetParameterByApplicantType " + e);
            }
        }
        function SetApplicantTab(cptype) {
            try {
                if (cptype === 2 || cptype === "2") {
                    SelectSecondaryApplicant(true);
                }

                else if (cptype === 3 || cptype === "3") {
                    SelectSecondaryApplicant(false);
                }
            } catch (e) {
                alert("Exception SetApplicantTab " + e);
            }
        }
        function SetRefreshView(tab, cptype) {
            try {
                if ($scope.cprinit.status != "Draft") {
                    $scope.changeTab = "approvals";
                }
                else {
                    if (tab === null)
                        tab = 1;
                    if (cptype === null)
                        cptype = 1;
                    $scope.ChangeNavigation_ClickEvent(tab);
                    SetApplicantTab(cptype);
                }
            } catch (e) {
                alert("Exception SetRefreshView " + e);
            }
        }
        //function CalculateAge(oldBirthday) {
        //    try {
        //        var oldBirthday = $scope.borrowerprofile.individual.dob;

        //        var str = oldBirthday;

        //        var slash = str.slice(1, 2);
        //        if (slash == "/") {
        //            var zeroday = "0";
        //            str = zeroday.concat(str);
        //        }
        //        var slashMonth = str.slice(4, 5);
        //        if (slashMonth == "/") {
        //            var zeroMonth = "0";
        //            var res = str.split("/");
        //            var month = zeroMonth.concat(res[1]);
        //            str = res[0] + "/" + month + "/" + res[2];
        //        }

        //        var birthdayMonth = str.slice(0, 2);
        //        var birthdayDay = str.slice(3, 5);
        //        var birthdayYear = str.slice(6, 10);
        //        var birthdayArrayNew = [birthdayMonth, birthdayDay, birthdayYear];
        //        var newBirthdayFormat = birthdayArrayNew.join("/");

        //        var y2 = new Date().getFullYear();
        //        var age = 0;
        //        if (oldBirthday != null) {
        //            var y1 = parseInt(birthdayYear);
        //            age = parseInt(y2) - parseInt(y1);
        //        }
        //        $scope.borrowerprofile.individual.age = parseInt(age);
        //        return parseInt(age);
        //    } catch (e) {
        //        alert("Exception CalculateAge " + e);
        //    }

        //}

        //For Basic Bank

        function CalculateAge(oldBirthday) {
            try {
                var oldBirthday = $scope.borrowerprofile.individual.date
                    ;

                var str = oldBirthday;

                var slash = str.slice(1, 2);
                if (slash == "/") {
                    var zeroday = "0";
                    str = zeroday.concat(str);
                }
                var slashMonth = str.slice(4, 5);
                if (slashMonth == "/") {
                    var zeroMonth = "0";
                    var res = str.split("/");
                    var month = zeroMonth.concat(res[1]);
                    str = res[0] + "/" + month + "/" + res[2];
                }

                var birthdayMonth = str.slice(3, 5);
                var birthdayDay = str.slice(0, 2);
                var birthdayYear = str.slice(6, 12);
                var birthdayArrayNew = [birthdayDay, birthdayMonth, birthdayYear];
                var newBirthdayFormat = birthdayArrayNew.join("/");

                var y2 = new Date().getFullYear();
                var age = 0;
                if (oldBirthday != null) {
                    var y1 = parseInt(birthdayYear);
                    age = parseInt(y2) - parseInt(y1);
                }
                $scope.borrowerprofile.individual.age = parseInt(age);
                $scope.borrowerprofile.individual.dob = newBirthdayFormat;
                return parseInt(age);
            } catch (e) {
                alert("Exception CalculateAge " + e);
            }

        }
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
        function CalculateIRR(premier, baserate) {
            try {
                var IRR = parseFloat(premier) + parseFloat(baserate);
                return IRR;
            } catch (e) {
                alert("CalculateIRR " + e);
            }
        }
        function CheckPersonalGuarantorExistInSecurityOfferList(list) {
            try {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].securitytype.type === "Personal Guarantor")
                        return true;
                }
                return false;
            } catch (e) {
                alert("Exception CheckPersonalGuarantorExistInList" + e);
            }
        }
        function DropdownValuationSecurity_Function(item) {
            try {
                if ($scope.cprinit.listCPRValuation !== null)

                    //commented to allow multiple addition of valuer for same security
                    //angular.forEach($scope.cprinit.listCPRValuation, function (value) {
                    //    if (value.security.id === item.id) {
                    //        dialogService.ConfirmDialogWithOkay('', global._valuationexistmessage).then(function () {
                    //            $scope.valuation.security = null;
                    //        });
                    //    }
                    //});

                    $scope.listValuationUDF = GetUDF('Valuation', item.typeId);
            } catch (e) {
                alert("Exception DropdownValuationSecurity_Function " + e);
            }
        }

        function LoadChargeTypeDropDownValue_Function(ValSecurity) {
            try {
                //if (ValSecurity.value.indexOf("Share") != -1) {
                //    $scope.listChargeType = [
                //        { "name": "Lien'", "value": "Lien" }
                //    ];
                //}
                //else if (ValSecurity.value.indexOf("Property") != -1) {
                //    $scope.listChargeType = [

                //        { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
                //        { "name": "Register 1st Charge", "value": "Register 1st Charge" },
                //        { "name": "Register 2nd Charge", "value": "Register 2nd Charge" },
                //        { "name": "Register(Paripassu Charge)", "value": "Register(Paripassu Charge)" },
                //        { "name": "Equitable Mortgage", "value": "Equitable Mortgage" },
                //        { "name": "TPA(Registered)", "value": "TPA(Registered)" },
                //        { "name": "TPA(Un- Registered)", "value": "TPA(Un- Registered)" }
                //    ];
                //}

                //else if (ValSecurity.value.indexOf("Equipment") != -1) {
                //    $scope.listChargeType = [

                //        { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
                //        { "name": "Simple Hypothecation", "value": "Simple Hypothecation" }
                //    ];
                //}
                //else {
                //    $scope.listChargeType = [];
                //}




                $scope.listChargeType = [
                    { "name": "Lien", "value": "Lien" },
                    { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
                    { "name": "Register 1st Charge", "value": "Register 1st Charge" },
                    { "name": "Register 2nd Charge", "value": "Register 2nd Charge" },
                    { "name": "Register(Paripassu Charge)", "value": "Register(Paripassu Charge)" },
                    { "name": "Equitable Mortgage", "value": "Equitable Mortgage" },
                    { "name": "TPA(Registered)", "value": "TPA(Registered)" },
                    { "name": "TPA(Un- Registered)", "value": "TPA(Un- Registered)" },
                    { "name": "Registered Hypothecation", "value": "Registered Hypothecation" },
                    { "name": "Simple Hypothecation", "value": "Simple Hypothecation" }
                ];
            } catch (e) {
                alert("Exception LoadChargeTypeDropDownValue_Function " + e);
            }
        }

        function DropdownSecurityDetailFaclityNo_Function(item) {
            try {
                for (var i = 0; i < item.listSecurityOffer.length; i++) {
                    var val = item.listSecurityOffer[i].securitytype.type;
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
                        $scope.cPRSecurityGuarantor.facilityno = item.facilityno;
                    }
                }
            } catch (e) {
                alert("Exception DropdownSecurityDetailFaclityNo_Function" + e);
            }
        }
        function ValuationFormFacilityPropotionValidation(item) {
            try {
                var amount = 0, sum = 0, propotion = 0, subs = 0;
                amount = GetFacilityAmountByFacilityNo(item.facilityno);
                sum = GetPropotionSumByFacilityNo(item.facilityno);
                propotion = parseFloat(item.propotionValue);
                subs = amount - sum;

                if (amount >= (sum + propotion))
                    return true;
                else {
                    dialogService.ConfirmDialogWithOkay(''
                        , global._facilitypropotionnotvalidmessage + subs);
                    $scope.valuation.propotionValue = null;
                    return false;
                }

            } catch (e) {
                alert("Exception ValuationFormFacilityPropotionValidation " + e);
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
        function GetArrayActiveValueCount(arry) {
            try {
                var count = 0;
                if (arry != null)
                    for (var i = 0; i < arry.length; i++) {
                        if (arry[i].active)
                            count++;
                    }
                return count;
            } catch (e) {
                alert("Exception GetArrayActiveValueCount " + e);
            }
        }
        function GetHighestPriductFromList(list) {
            try {
                var arry = $filter('filter')(list, { active: true });
                if (arry != null && arry.length > 0) {
                    var mzxAmnt = Math.max.apply(Math, arry.map(function (v) { return v.amountrequest }));
                    for (var i = 0; i < arry.length; i++)
                        if (arry[i].amountrequest === mzxAmnt) {
                            highestProduct = arry[i].product;
                            break;
                        }
                }
            } catch (e) {
                alert("Exception GetHighestPriductFromList" + e);
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
        function GetValiationCountByFacilityNo(item) {
            try {
                var count = 0;
                count = $filter('filter')($scope.cprinit.listCPRValuation, { facilityno: item, active: true }).length;
                return count;
            } catch (e) {
                alert("Exception GetValiationCountByFacilityNo " + e);
            }
        }
        function GetPropotionSumByFacilityNo(item) {
            try {
                if ($scope.cprinit.listCPRValuation == null)
                    $scope.cprinit.listCPRValuation = [];
                var total = 0;
                var list = $filter('filter')($scope.cprinit.listCPRValuation, { facilityno: item });
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
        function ProductSelectValidation(product) {
            try {
                if ($scope.cprinit.listCPRFacilities == null)
                    return true;
                if (product != null) {
                    for (var i = 0; i < $scope.cprinit.listCPRFacilities.length; i++) {
                        if ($scope.cprinit.listCPRFacilities[i].active && $scope.cprinit.listCPRFacilities[i].product.name === product.name) {
                            dialogService.ConfirmDialogWithOkay('', global._productexistmessage).then(function () {
                            });
                            return false;
                        }
                    }
                    return true;
                }
            } catch (e) {
                alert("Exception ProductSelectValidation " + e);
            }
        }
        function ProductDropDownFilterByFacilityType(product, isReset) {
            try {
                var arry = $scope.listProducts;
                if (product != null && arry != null && isReset != null) {
                    if (isReset)
                        for (var i = 0; i < arry.length; i++)
                            $scope.listProducts[i].selected = true;

                    else
                        for (var i = 0; i < arry.length; i++) {
                            if (arry[i].facilitytype.name != product.facilitytype.name)
                                $scope.listProducts[i].selected = false;
                        }
                }
            } catch (e) {
                alert("Exception ProductDropDownFilterByFacilityType" + e);
            }
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
        function DisabledField(commissionType) {
            try {
                if (commissionType == "Percentage") {
                    $scope.Percentage = true;
                }
                else if (commissionType == "Amount") {
                    $scope.Amount = true;
                }

            } catch (e) {
                alert('DisabledField ' + e);
            }


        }
        function SetActiveTruelistSecurityType() {
            try {
                if ($scope.listSecurityType != null && $scope.listSecurityType.length > 0) {
                    angular.forEach($scope.listSecurityType, function (value) {
                        value.active = true;
                    });
                }
            } catch (e) {
                alert("Exception SetActiveTruelistSecurityType" + e);
            }
        }
        function TotalTermMonthCalculation__Function() {
            try {
                if ($scope.cPRFacility.tenour.termYears == $scope.listYearCount[$scope.listYearCount.length - 1])
                    $scope.IslistYearCountMax = true;
                else
                    $scope.IslistYearCountMax = false;
                $scope.cPRFacility.tenour.totalTermMonths = ($scope.cPRFacility.tenour.termYears) * 12 + ($scope.cPRFacility.tenour.termMonths * 1);
                $scope.getInstallmentSize();
            } catch (e) {
                alert("Exception TotalTermMonthCalculation__Function" + e);
            }
        }
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
        function CheckTrialCalculationDependencyForFacilityChanges(facility) {
            try {

                var isDiffer = false;
                var i = GetArrayIndexByValue(listCPRFacilityCopy, 'id', facility.id);
                if (i !== -1) {
                    var tempFacility = listCPRFacilityCopy[i];
                    if (facility.amountrequest !== tempFacility.amountrequest) {
                        isDiffer = true;
                    }
                    else if (facility.interestrate !== tempFacility.interestrate) {
                        isDiffer = true;
                    }
                    else if (facility.tenour.totalTermMonths !== tempFacility.tenour.totalTermMonths) {
                        isDiffer = true;
                    }
                    if (isDiffer && facility.trialCalculation != null) {
                        if (facility.trialCalculation.id != null) {
                            var title = "Changes Detected in Facility Details";
                            var dialog = dialogService.ConfirmDialogWithOkay(title, global._facilitychangesdetectmessage);
                            dialog.then(function () {
                                facility.trialCalculation.active = false;


                            }, function () { });
                        }

                    }
                }
            } catch (e) {
                alert("Exception CheckTrialCalculationDependencyForFacilityChanges " + e);
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
        function CheckDependencyForRemovingFacility(facility, status) {
            try {

                var commonwarningmsg = "reference detected in facility, Please remove relevant"
                var allowRemove = {
                    status: true,
                    msg: ""
                };
                if (status) {
                    var listGuarantor = $filter('filter')($scope.cprinit.listBorrowerProfiles,
                        { product: { id: facility.product.id }, type: { type: 'Guarantor' }, active: true }, true);
                    if (listGuarantor.length > 0) {
                        allowRemove.status = false;
                        allowRemove.msg = "Guarontor " + commonwarningmsg + " guarontor"
                        return allowRemove;
                    }
                }
                if (allowRemove.status === true) {
                    var listSecurity = $filter('filter')(facility.listSecurityOffer, { securitytype: { type: '!Personal Guarantor' }, active: true }, true);
                    if (listSecurity.length > 0) {
                        var securitywarningmsg = "Security " + commonwarningmsg + " security";
                        angular.forEach(listSecurity, function (value, key) {

                            switch (value.securitytype.type) {
                                case "Equipment":
                                    if (listSecurity[key].listEquipmentSecurityDetailModel !== null) {
                                        var listEquipment = $filter('filter')(listSecurity[key].listEquipmentSecurityDetailModel, { active: true }, true);
                                        if (listEquipment.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;

                                case "Vehicle":
                                    if (listSecurity[key].listVehicleSecurityDetailModel !== null) {
                                        var listVehicle = $filter('filter')(listSecurity[key].listVehicleSecurityDetailModel, { active: true }, true);
                                        if (listVehicle.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;

                                case "Property":
                                    if (listSecurity[key].listPropertySecurityDetailModel !== null) {
                                        var listProperty = $filter('filter')(listSecurity[key].listPropertySecurityDetailModel, { active: true }, true);
                                        if (listProperty.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;

                                case "Other":
                                    if (listSecurity[key].listOtherSecurityDetailModel !== null) {
                                        var listOther = $filter('filter')(listSecurity[key].listOtherSecurityDetailModel, { active: true }, true);
                                        if (listOther.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;

                                case "ShareCertificate":
                                    if (listSecurity[key].listShareCertificateSecurityDetailModel !== null) {
                                        var listShareCert = $filter('filter')(listSecurity[key].listShareCertificateSecurityDetailModel, { active: true }, true);
                                        if (listShareCert.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;
                                case "FDR":
                                    if (listSecurity[key].listFinancialInstrumentSecurityDetailModel !== null) {
                                        var listFinancialInstrument = $filter('filter')(listSecurity[key].listFinancialInstrumentSecurityDetailModel, { active: true }, true);
                                        if (listFinancialInstrument.length > 0) {
                                            allowRemove.status = false;
                                            allowRemove.msg = securitywarningmsg;
                                        }
                                    }
                                    break;
                            }
                        });
                    }
                    return allowRemove;
                }
            } catch (e) {
                alert("Exception CheckDependencyForRemovingFacility");
            }
        }
        function ValidationCPRInitiation() {
            try {
                var validparam = {
                    status: false,
                    trialcal: false
                };
                var status = true;
                var errormsg = false;
                var usertype = "";
                var IsTrialCal = true;


                if ($scope.cprinit.addjointapplicant) {
                    var jointcount = $filter('filter')($scope.cprinit.listBorrowerProfiles, { type: { id: '2' } }).length;
                    if (jointcount == 0) {
                        Erroralert(global._jointapplicantmissingmessage);
                        errormsg = true;
                        status = false;
                    }
                }

                if (!errormsg) {
                    angular.forEach($scope.cprinit.listBorrowerProfiles, function (value, index) {
                        usertype = value.type.type;
                        if (value.cif == null || value.cif == "") {
                            try {
                                if (value.cif == null || value.cif == "") {
                                    Erroralert(global._cifnotavailablemessage + usertype);
                                    status = false;
                                    return false;
                                };
                            } catch (ex) {
                                alert("ValidationCPRInitiation " + e);
                            }
                        }
                        else {
                            if (value.individual != null && value.individual != "") {
                                if (value.individual.nic == null || value.individual.nic == "") {
                                    Erroralert(global._nicnotavailablemessage);
                                    status = false;
                                    return false;
                                }
                            }
                            else if (value.stakeholder != null && value.stakeholder != "") {
                                if (value.stakeholder.no == null || value.stakeholder.no == "") {
                                    Erroralert(global._regnonotavailablemessage);
                                    status = false;
                                    return false;
                                }
                            }
                        }

                        //if ($scope.cprinit.business.name == "Individual") {
                        //    if (usertype == 'Applicant' && value.individual != null && value.individual != "" && value.individual.listClientFamily != null) {
                        //        if (value.individual.gender === "Female" && value.individual.civilstatus === "Married") {

                        //            var spouse = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { id: '4' } }).length;
                        //            var fatherinlaw = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { id: '10' } }).length;
                        //            if (spouse == 0) {
                        //                Erroralert(global._spouseandfatherinlawnotavailablemessage);
                        //                status = false;
                        //                return false;
                        //            }
                        //            if (fatherinlaw == 0) {
                        //                Erroralert(global._spouseandfatherinlawnotavailablemessage);
                        //                status = false;
                        //                return false;
                        //            }

                        //        }

                        //        //if (value.individual != null && value.individual != "" && value.individual.listClientFamily != null) {
                        //        //    //var father = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { id: 'Father' } }).length;
                        //        //    //var grandfather = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { relationships: 'Grand Father' } }).length;
                        //        //    var father = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { id: '1' } }).length;
                        //        //    var grandfather = $filter('filter')(value.individual.listClientFamily, { active: true, relationship: { id: '5' } }).length;
                        //        //    if (father == 0) {
                        //        //        Erroralert(global._fatherandgrandfathernotavailablemessage);
                        //        //        status = false;
                        //        //        return false;
                        //        //    }
                        //        //    if (grandfather == 0) {
                        //        //        Erroralert(global._fatherandgrandfathernotavailablemessage);
                        //        //        status = false;
                        //        //        return false;
                        //        //    }
                        //        //}
                        //    }
                        //    else if (usertype == 'Applicant' && (value.individual == null || value.individual == '' || value.individual.listClientFamily == null)) {
                        //        Erroralert('Family Background is Mandatory');
                        //        status = false;
                        //        return false;
                        //    }
                        //}

                        //if ($scope.cprinit.business.name != "Individual") {
                        //    if (usertype == 'Applicant' && value.stakeholder != null && value.stakeholder != "" && value.stakeholder.listSecondaryStakeholder != null) {

                        //        //if (value.stakeholder != null && value.stakeholder != "" && value.stakeholder.listSecondaryStakeholder != null) {
                        //        //    for (i = 0; i < value.stakeholder.listSecondaryStakeholder.length; i++) {
                        //        //        var father1 = $filter('filter')(value.stakeholder.listSecondaryStakeholder[i].listClientStakeHolderFamily, { active: true, relationship: { id: '1' } }).length;
                        //        //        var grandfather1 = $filter('filter')(value.stakeholder.listSecondaryStakeholder[i].listClientStakeHolderFamily, { active: true, relationship: { id: '5' } }).length;
                        //        //        if (father1 == 0) {
                        //        //            Erroralert(global._fatherandgrandfathernotavailablemessage);
                        //        //            status = false;
                        //        //            return false;
                        //        //        }
                        //        //        if (grandfather1 == 0) {
                        //        //            Erroralert(global._fatherandgrandfathernotavailablemessage);
                        //        //            status = false;
                        //        //            return false;
                        //        //        }
                        //        //    }

                        //        //}
                        //        return true;
                        //    }
                        //    else if (usertype == 'Applicant' && (value.stakeholder == null || value.stakeholder == '' || value.stakeholder.listSecondaryStakeholder == null)) {
                        //        Erroralert('Family Background is Mandatory');
                        //        status = false;
                        //        return false;
                        //    }
                        //}


                    });

                    var listerroralert = [];
                    if (status != false) {
                        var securitydetailcount = 0;
                        if ($scope.cprinit.listCPRFacilities.length > 0) {
                            angular.forEach($scope.cprinit.listCPRFacilities, function (value, index) {
                                //if ((value.active == true)) {
                                if ((value.active == true && value.listSecurityOffer.length > 0)) {   // BBL Staff Loan can contain Security Offer Null
                                    for (i = 0; i < value.listSecurityOffer.length; i++) {
                                        if (value.listSecurityOffer[i].securitytype.type == "Equipment") {
                                            if (value.listSecurityOffer[i].listEquipmentSecurityDetailModel == null || value.listSecurityOffer[i].listEquipmentSecurityDetailModel.length == 0) {
                                                listerroralert.push("Equipment");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listEquipmentSecurityDetailModel.length;
                                        }
                                        if (value.listSecurityOffer[i].securitytype.type == "Property") {
                                            if (value.listSecurityOffer[i].listPropertySecurityDetailModel == null || value.listSecurityOffer[i].listPropertySecurityDetailModel.length == 0) {
                                                listerroralert.push("Property");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listPropertySecurityDetailModel.length;
                                        }
                                        if (value.listSecurityOffer[i].securitytype.type == "Vehicle") {
                                            if (value.listSecurityOffer[i].listVehicleSecurityDetailModel == null || value.listSecurityOffer[i].listVehicleSecurityDetailModel.length == 0) {
                                                listerroralert.push("Vehicle");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listVehicleSecurityDetailModel.length;
                                        }

                                        if (value.listSecurityOffer[i].securitytype.type == "Other") {
                                            if (value.listSecurityOffer[i].listOtherSecurityDetailModel == null || value.listSecurityOffer[i].listOtherSecurityDetailModel.length == 0) {
                                                listerroralert.push("Other security");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listOtherSecurityDetailModel.length;
                                        }
                                        if (value.listSecurityOffer[i].securitytype.type == "ShareCertificate") {
                                            if (value.listSecurityOffer[i].listShareCertificateSecurityDetailModel == null || value.listSecurityOffer[i].listShareCertificateSecurityDetailModel.length == 0) {
                                                listerroralert.push("ShareCertificate");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listShareCertificateSecurityDetailModel.length;
                                        }

                                        if (value.listSecurityOffer[i].securitytype.type == "FDR") {
                                            if (value.listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel == null || value.listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel.length == 0) {
                                                listerroralert.push("FDR");
                                                status = false;
                                            }
                                            else
                                                securitydetailcount = securitydetailcount + value.listSecurityOffer[i].listFinancialInstrumentSecurityDetailModel.length;
                                        }
                                    }
                                }
                            });

                            //if (securitydetailcount != 0) {
                            //    if ($scope.cprinit.listCPRValuation == null)
                            //        $scope.cprinit.listCPRValuation = [];
                            //    if (securitydetailcount == $scope.cprinit.listCPRValuation.length) {
                            //        angular.forEach($scope.cprinit.listCPRFacilities, function (value) {
                            //            if (!errormsg) {
                            //                if (value.active == true) {
                            //                    var guarantorcount = $filter('filter')(value.listSecurityOffer, { securitytype: { type: 'Personal Guarantor' } }).length;
                            //                    if (guarantorcount > 0) {
                            //                        var count = $filter('filter')($scope.cprinit.listBorrowerProfiles, { type: { id: '3' } }).length;
                            //                        if (count == 0) {
                            //                            Erroralert(global._guarantorapplicantmissingmessage);
                            //                            errormsg = true;
                            //                            status = false;
                            //                        }
                            //                    }

                            //                    var reqsdcount = $filter('filter')(value.listSecurityOffer, { securitytype: { type: '!Personal Guarantor' } }).length;
                            //                    var relevantvalcount = $filter('filter')($scope.cprinit.listCPRValuation, { facilityno: value.facilityno }).length;
                            //                    if (!errormsg && reqsdcount > 0 && relevantvalcount > 0) {
                            //                        var propotionsum = GetPropotionSumByFacilityNo(value.facilityno);
                            //                        if (value.amountrequest != propotionsum) {
                            //                            Erroralert(global._sumoffacilitypropotionnotequaltofacilityamountmessage);
                            //                            status = false;
                            //                            errormsg = true;
                            //                            return false;
                            //                        }
                            //                    }

                            //                }
                            //            }
                            //        });
                            //    } else {
                            //        if (!errormsg) {
                            //            Erroralert(global._valuationdetailsmissingmessage);
                            //            status = false;
                            //            errormsg = true;
                            //            return false;
                            //        }
                            //    }
                            //}
                        } else {
                            if (!errormsg) {
                                Erroralert(global._facilitynotavailablemessage);
                                status = false;
                                errormsg = true;
                                return status;
                            }
                        }
                    }
                    if (listerroralert.length > 0 && !errormsg)
                        Erroralert(Erroralertlist(listerroralert));

                }

            } catch (ex) {
                alert("ValidationCPRInitiation " + ex);
            }
            validparam.status = status;
            validparam.trialcal = IsTrialCal;
            return validparam;
        }
        function ValidationForDratft() {
            var status = true;
            var usertype = "";
            angular.forEach($scope.cprinit.listBorrowerProfiles, function (value, index) {
                usertype = value.type.type;
                if (value.cif == null || value.cif == "") {
                    try {
                        if (value.cif == null || value.cif == "") {
                            Erroralert(global._cifnotavailablemessage + usertype);
                            status = false;
                            return false;
                        };
                    } catch (ex) {
                        alert("ValidationCPRInitiation " + e);
                    }
                } else {
                    if (value.individual != null && value.individual != "") {
                        if (value.individual.nic == null || value.individual.nic == "") {
                            Erroralert(global._nicnotavailablemessage);
                            status = false;
                            return false;
                        }
                    } else if (value.stakeholder != null && value.stakeholder != "") {
                        if (value.stakeholder.no == null || value.stakeholder.no == "") {
                            Erroralert(global._regnonotavailablemessage);
                            status = false;
                            return false;
                        }
                    }
                }
                //if (value.individual != null && value.individual != "") {
                //    var request1 = $filter('filter')(value.individual.listClientFamily, { relationship: { relationships: 'Father' && 'Grand Father' } }).length;
                //    if (request1 > 0) {
                //        status = true;
                //        return true;
                //    }
                //    else {
                //        Erroralert(global._fatherandgrandfathernotavailablemessage);
                //        status = false;
                //        return false;
                //    }


                //}
            });
            return status;
        }
        function AddBorrowerProfiles(profileType, product) {
            try {
                var borrowerprofile = {
                    id: null,
                    type: profileType,
                    personal: null,
                    cif: "",
                    product: product,
                    individual: null,
                    stakeholder: null,
                    listMonthlyIncome: [],
                    listMonthlyExpenditure: [],
                    listBankaccountdetails: [],
                    listLiabilities: [],
                    listMovableAssets: [],
                    listotherLiability: [],
                    listImmovableAssets: [],
                    listCPRLiabilitySanctionHistory: [],
                    listCPRPersonalProposalWithLiabilityExisting: [],
                    listCPRPersonalProposalWithLiabilityProposed: [],
                    listCPRPastPerformanceBG: [],
                    cPRTotalExposure: null,
                    cprBusinessProfileInformation: null,
                    cPRBankersInformation: null,
                    cPRIndustryAnalysis: null,
                    cPRPhysicalExpansion: null,
                    turnOverlist: null,
                    // sWOTAnalysis: null,                 
                    riskAnalysisICRRS: null,
                    cashFlowAnalysis: null,
                    listriskAnalysis: [],
                    businessPerformanceAnalysis: null,
                    cPRPresentProposalWithLiabilityPosition: null,
                    totaltax: 0,
                    active: true
                };

                angular.forEach(listMonthlyIncome, function (value) {
                    borrowerprofile.listMonthlyIncome.push({
                        id: null,
                        type: value.type,
                        amount: value.amount,
                        isDSCR: true,
                        active: true
                    });
                });

                angular.forEach(listMonthlyExpenditure, function (value) {
                    borrowerprofile.listMonthlyExpenditure.push({
                        id: null,
                        expenditure: value.expenditure,
                        amount: value.amount,
                        isDSCR: true,
                        active: true
                    });
                });

                if ($scope.cprinit.business.name == "Individual") {
                    borrowerprofile.individual = {
                        title: '',
                        nationality: '',
                        name: '',
                        bokid: '',
                        oldnic: '',
                        nic: '',
                        gender: '',
                        civilstatus: '',
                        dob: '',
                        dob_np: '',
                        age: 0,
                        noofdependents: '',
                        email1: '',
                        email2: '',
                        landphone: '',
                        mobileno1: '',
                        mobileno2: '',
                        ownership: '',
                        address1: '',
                        city1: '',
                        province1: '',
                        zipcode1: '',
                        address2: '',
                        city2: '',
                        province2: '',
                        zipcode2: '',
                        taxfileno: '',
                        remarks: '',
                        houseno1: '',
                        wardno1: '',
                        map1: '',
                        houseno2: '',
                        wardno2: '',
                        map2: '',

                        historyOfCommencementRelationship: null,
                        natureofcustomer: '',
                        salariedemp: null,
                        bankStaffInformation: null,
                        registeredbus: null,
                        unregisteredbus: null,
                        // othersourceincome:null,
                        clientSkl: {
                            id: '',
                            pHD: false,
                            mBA: false,
                            bSC: false,
                            diploma: false,
                            certificate: false,
                            professionalQualifications: ""
                        },
                        listClientFamily: [],
                        listindividualQualification: [],
                        listUDFValues: []
                    };
                }
                else if ($scope.cprinit.business.name == "Sole/Proprietor/Partnership") {

                    borrowerprofile.stakeholder = {
                        cif: '',
                        name: '',
                        bokid: '',
                        contactNo: '',
                        fax: '',
                        email: '',
                        industry: '',
                        address: '',
                        conName: '',
                        conDesignation: '',
                        conTeleNo: '',
                        conFax: '',
                        conEmail: '',
                        conBusAddress: '',
                        historyOfCommencementRelationship: '',
                        listSecondaryStakeholder: [],
                        ltdetc: [],
                        addressDetailsList: []
                        //productiveSector:'',
                        //productiveSectorId:0
                    };
                    //$scope.borrowerprofile.stakeholder.productiveSector = $scope.productiveSector.type;
                    //$scope.borrowerprofile.stakeholder.productiveSectorId = $scope.productiveSector.id;
                }

                borrowerprofile.cprBusinessProfileInformation = $scope.cprBusinessProfileInformation;

                $scope.cprinit.listBorrowerProfiles.push(borrowerprofile);

                var index = ($scope.cprinit.listBorrowerProfiles.length - 1);
                ChangeBorrowerProfile(profileType, index);

                $scope.formatIndex = 2;
            } catch (e) {
                alert("AddBorrowerProfiles " + e);
            }
        }
        function LegalFormChange(legalForm) {
            try {
                if (legalForm.option == "Individual") {
                    $scope.borrowerprofile.individual = {
                        title: '',
                        nationality: '',
                        name: '',
                        oldnic: '',
                        nic: '',
                        gender: '',
                        civilstatus: '',
                        dob: '',
                        dob_np: '',
                        age: 0,
                        noofdependents: 0,
                        email1: '',
                        email2: '',
                        landphone: '',
                        mobileno1: '',
                        mobileno2: '',
                        ownership: '',
                        address1: '',
                        city1: '',
                        province1: '',
                        zipcode1: '',
                        address2: '',
                        city2: '',
                        province2: '',
                        zipcode2: '',
                        taxfileno: '',
                        remarks: '',
                        houseno1: '',
                        wardno1: '',
                        map1: '',
                        houseno2: '',
                        wardno2: '',
                        map2: '',
                        historyOfCommencementRelationship: null,
                        natureofcustomer: '',
                        salariedemp: null,
                        bankStaffInformation: null,
                        registeredbus: null,
                        unregisteredbus: null,
                        monthlyincome: [],
                        monthlyexpenditure: [],
                        clientSkl: {
                            id: '',
                            pHD: false,
                            mBA: false,
                            bSC: false,
                            diploma: false,
                            certificate: false,
                            professionalQualifications: ''
                        },
                        listClientFamily: [],
                        listUDFValues: [],
                        listOtherIncomeSources: []
                    };
                    $scope.borrowerprofile.stakeholder = null;
                }
                else if (legalForm.option == "Sole/Proprietor/Partnership") {
                    $scope.borrowerprofile.individual = null;
                    $scope.borrowerprofile.stakeholder = {
                        name: '',
                        contactNo: '',
                        fax: '',
                        email: '',
                        industry: '',
                        address: '',
                        conName: '',
                        conDesignation: '',
                        conTeleNo: '',
                        conFax: '',
                        conEmail: '',
                        conBusAddress: '',
                        historyOfCommencementRelationship: '',
                        listSecondaryStakeholder: [],
                        ltdetc: [],
                        addressDetailsList: [],
                        address: '',
                    };
                }
            } catch (e) {
                alert("LegalFormChange " + e);
            }
        }
        function ChangeBorrowerProfile(borrowerProfileType, index) {
            try {

                //$scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index] = $scope.borrowerprofile;

                $scope.borrowerProperties.type = borrowerProfileType;
                $scope.borrowerProperties.index = index;

                if (borrowerProfileType.id == 1) {
                    $scope.selectedApplicantType = "Main";
                    $scope.defaultTab = true;
                    $scope.borrowerChanged = false;
                }
                else if (borrowerProfileType.id == 2) {
                    $scope.selectedApplicantType = "Joint";
                    $scope.defaultTab = true;
                    $scope.borrowerChanged = true;
                }
                else if (borrowerProfileType.id == 3) {
                    $scope.selectedApplicantType = "Guarantor";
                    $scope.defaultTab = true;
                    $scope.borrowerChanged = true;
                }

                $scope.borrowerprofile = $scope.cprinit.listBorrowerProfiles[index];
                $scope.cPId = $scope.borrowerprofile.id;
                common.borrowerprofile.id = $scope.cPId;
                $scope.monthlytotaltax = $scope.borrowerprofile.totaltax;
                $scope.selectedBorrower = $scope.borrowerprofile;

                $scope.borrowerprofile.listMonthlyIncome = $scope.borrowerprofile.listMonthlyIncome;
                $scope.borrowerprofile.listMonthlyExpenditure = $scope.borrowerprofile.listMonthlyExpenditure;

                GetMonthlyIncomeByCpId();
                GetMonthlyExpenditureByCpId();

                GetOtherAndExistingBankAccountByCifId();
                GetAccountDepositDetailByCpId();
                GetAccountMovementTurnOverByCpId();
                GetCommentOnCunductAccountByCpId();

                UpdateNepaliDates();
            }
            catch (e) {
                alert("ChangeBrroweProfile " + e);
            }
        }
        function RemoveBorrowerProfile(borrowerProfile, joint) {
            try {
                index = $scope.cprinit.listBorrowerProfiles.indexOf(borrowerProfile);
                var type = "Joint Applicant";
                if (joint == false)
                    type = "Guarantor";
                var title = 'Would you like to delete your ' + type + '?';
                var confirm = dialogService.ConfirmDialogWithYesNo(title, global._forgivedebtsmessage);
                confirm.then(function () {
                    if (borrowerProfile.id == "" || borrowerProfile.id == null) {
                        $scope.cprinit.listBorrowerProfiles.splice(index, 1);
                    }
                    else {
                        $scope.cprinit.listBorrowerProfiles[index].active = false;
                    }

                    if (joint) {
                        $scope.SelectSecondaryApplicant_ChangeEvent(true);
                    }
                    else {
                        $scope.SelectSecondaryApplicant_ChangeEvent(false);
                    }
                }, function () {
                    $scope.status = 'You decided to keep your debt.';
                });
            } catch (e) {
                alert("RemoveBorrowerProfile " + e);
            }
        }

        //function BindBorrowerProfile(borrower, main) {
        //    try {
        //        //if (borrower.bokid != null || borrower.bokid != '')
        //        //    GetGroupOverviewByBankCustomerIdUsingConnectivity(borrower.bokid);
        //        GetFacilitiesByCIFUsingConnectivity(borrower.cif);
        //        $scope.borrowerprofile.cif = borrower.cif;
        //        $scope.borrowerprofile.personal = borrower.personal;
        //        $scope.borrowerprofile.clientType = borrower.clientType;
        //        if (main == true) {
        //            $scope.mainApplicantName = borrower.name;
        //            $scope.cprinit.cif = borrower.cif;
        //            if ($scope.cprinit.cprno == "Pending")
        //                GetAllCPRDetailsByCIFWithReiniated(borrower.cif);
        //        }

        //        if (borrower.personal == true) {
        //            $scope.borrowerprofile.individual = {
        //                title: borrower.title,
        //                nationality: borrower.nationality,
        //                name: borrower.name,
        //                bokid: borrower.bokid,
        //                oldnic: '',
        //                nic: borrower.identityNo,
        //                gender: borrower.gender,
        //                civilstatus: borrower.maritalStatus,
        //                /*  dob: moment(borrower.date).format("DD/MM/YYYY"),*/
        //                dob: borrower.date,
        //                dob_np: '',
        //                age: 0,
        //                noofdependents: borrower.noofdependents,
        //                email1: borrower.email,
        //                email2: '',
        //                landphone: '',
        //                mobileno1: borrower.tel1,
        //                mobileno2: '',
        //                ownership: borrower.ownership,
        //                address1: borrower.address1,
        //                city1: '',
        //                province1: '',
        //                zipcode1: '',
        //                address2: borrower.address2,
        //                city2: '',
        //                province2: '',
        //                zipcode2: '',
        //                taxfileno: borrower.taxfileno,
        //                remarks: '',
        //                historyOfCommencementRelationship: null,
        //                natureofcustomer: borrower.sourceOfIncome,
        //                salariedemp: null,
        //                bankStaffInformation: null,
        //                registeredbus: null,
        //                unregisteredbus: null,
        //                //othersourceincome: null,
        //                monthlyincome: [],
        //                monthlyexpenditure: [],
        //                clientSkl: {
        //                    id: '',
        //                    pHD: false,
        //                    mBA: false,
        //                    bSC: false,
        //                    diploma: false,
        //                    certificate: false,
        //                    professionalQualifications: ""
        //                },
        //                listClientFamily: [],
        //                listUDFValues: [],
        //                listOtherIncomeSources: [],

        //                permanentCountryId: borrower.permanentCountryId,
        //                permanentDistrict: borrower.permanentDistrict,
        //                permanentPostOffice: borrower.permanentPostOffice,
        //                permanentUpazilla: borrower.permanentUpazilla,
        //                presentCountryId: borrower.presentCountryId,
        //                presentDistrict: borrower.presentDistrict,
        //                presentPostOffice: borrower.presentPostOffice,
        //                presentUpazilla: borrower.presentUpazilla
        //            };

        //            $scope.borrowerprofile.individual.age = CalculateAge(borrower.date);
        //            $scope.borrowerprofile.individual.natureofcustomer = "Salaried Employee";
        //            $scope.borrowerprofile.individual.salariedemp = {
        //                id: '',
        //                status: borrower.employeeStatus,
        //                employer: borrower.employerName,
        //                designation: borrower.jobTitle
        //            };
        //            //$scope.ADtoBS($scope.borrowerprofile.individual.dob, '$scope.borrowerprofile.individual.dob_np');
        //            $scope.borrowerprofile.stakeholder = null;
        //        }
        //        else {
        //            $scope.borrowerprofile.stakeholder = {
        //                no: borrower.identityNo,
        //                date: borrower.date,
        //                name: borrower.name,
        //                bokid: borrower.bokid,
        //                regAddress: borrower.address2,
        //                contactNo: borrower.tel1,
        //                fax: borrower.fax,
        //                email: borrower.email,
        //                panNumber: borrower.taxfileno,
        //                industry: '',
        //                conName: '',
        //                conDesignation: '',
        //                conTeleNo: '',
        //                conFax: '',
        //                conEmail: '',
        //                conBusAddress: '',
        //                historyOfCommencementRelationship: null,
        //                listSecondaryStakeholder: [],
        //                ltdetc: [],
        //                addressDetailsList: []
        //            };
        //            $scope.borrowerprofile.individual = null;
        //        }
        //    } catch (e) {
        //        alert("BindBorrowerProfile " + e);
        //    }
        //};

        function BindBorrowerProfile(borrower, main) {
            try {

                $scope.borrowerprofile.cif = borrower.cif;


                /*$scope.borrowerprofile.personal = borrower.personal;*/
                if ($scope.cprinit.business.name == 'Individual') {
                    $scope.borrowerprofile.personal = true;
                } else {
                    $scope.borrowerprofile.personal = false;
                }

                $scope.borrowerprofile.clientType = borrower.clientType;
                if (main == true) {
                    $scope.mainApplicantName = borrower.name;
                    $scope.cprinit.cif = borrower.cif;
                    if ($scope.cprinit.cprno == "Pending")
                        GetAllCPRDetailsByCIFWithReiniated(borrower.cif);
                }

                if ($scope.borrowerprofile.personal == true) {

                    $scope.borrowerprofile.individual = borrower;
                    if (borrower.gender == 'M') {
                        $scope.CustomerGender = 'Male';
                        $scope.borrowerprofile.individual.gender = 'Male';
                    }

                    else {
                        $scope.CustomerGender = 'Female';
                        $scope.borrowerprofile.individual.gender = 'Female';
                    }


                    if (borrower.permCountry == 'BD ' || borrower.MailCountry == 'BD ')
                        $scope.permCountryId = 1;

                    $scope.borrowerprofile.individual.nic = borrower.identityNo;
                    $scope.borrowerprofile.individual.noofdependents = borrower.noofdependents;
                    $scope.borrowerprofile.individual.age = CalculateAge(borrower.date);
                    $scope.borrowerprofile.individual.natureofcustomer = "Salaried Employee";
                    $scope.borrowerprofile.individual.salariedemp = {
                        id: '',
                        status: borrower.employeeStatus,
                        employer: borrower.employerName,
                        designation: borrower.jobTitle
                    };
                    //$scope.ADtoBS($scope.borrowerprofile.individual.dob, '$scope.borrowerprofile.individual.dob_np');
                    $scope.borrowerprofile.stakeholder = null;
                }
                else {
                    $scope.borrowerprofile.stakeholder = {
                        no: borrower.identityNo,
                        date: borrower.date,
                        name: borrower.name,
                        bokid: borrower.bokid,
                        regAddress: borrower.address2,
                        contactNo: borrower.tel1,
                        fax: borrower.fax,
                        email: borrower.email,
                        panNumber: borrower.taxfileno,
                        industry: '',
                        conName: '',
                        conDesignation: '',
                        conTeleNo: '',
                        conFax: '',
                        conEmail: '',
                        conBusAddress: '',
                        historyOfCommencementRelationship: null,
                        listSecondaryStakeholder: [],
                        ltdetc: [],
                        addressDetailsList: []
                    };
                    $scope.borrowerprofile.individual = null;
                }
            } catch (e) {
                alert("BindBorrowerProfile " + e);
            }
        };

        function BindBorrowerProfileForCustomer(borrower, main) {
            try {

                $scope.borrowerprofile.cif = borrower.CIF;


                /*$scope.borrowerprofile.personal = borrower.personal;*/
                if ($scope.cprinit.business.name == 'Individual') {
                    $scope.borrowerprofile.personal = true;
                } else {
                    $scope.borrowerprofile.personal = false;
                }

                $scope.borrowerprofile.clientType = borrower.clientType;
                if (main == true) {
                    $scope.mainApplicantName = borrower.FirstName + ' ' + (borrower.MiddleName ? borrower.MiddleName : '') + ' ' + (borrower.LastName ? borrower.LastName : '');
                    $scope.cprinit.cif = borrower.CIF;
                    if ($scope.cprinit.cprno == "Pending")
                        GetAllCPRDetailsByCIFWithReiniated(borrower.CIF);
                }
                if (borrower.Nationality == 'BD') {
                    var nationality = 'Bangladeshi';
                }

                if ($scope.borrowerprofile.personal == true) {
                    var customerInfo = {
                        'title': borrower.Title,
                        'nationality': nationality,
                        'name': borrower.FirstName,
                        'fathersName': borrower.FatherName,
                        'mothersName': borrower.MotherName,
                        'oldnic': borrower.IdNo,
                        'nic': borrower.IdNo,
                        'gender': borrower.Gender,
                        'civilstatus': borrower.MaritalStatus,
                        'dob': borrower.DOB,
                        'email1': borrower.Email,
                        'landphone': borrower.TelephoneNo,
                        'mobileno1': borrower.MobileNo,
                        'mobileno2': borrower.MobileNo2,
                        'address1': borrower.PermAddrLine1,
                        'city1': borrower.PermDistrict,
                        'province1': borrower.PermUpazila,
                        'zipcode1': borrower.PermZipCode,
                        'address2': borrower.MailAddrLine1,
                        'city2': borrower.MailDistrict,
                        'province2': borrower.MailUpazila,
                        'zipcode2': borrower.MailZipCode,
                        'taxfileno': borrower.TIN
                    };
                    $scope.borrowerprofile.individual = customerInfo;


                    if (borrower.Gender == 'M') {
                        $scope.CustomerGender = 'Male';
                        $scope.borrowerprofile.individual.gender = 'Male';
                    }

                    else {
                        $scope.CustomerGender = 'Female';
                        $scope.borrowerprofile.individual.gender = 'Female';
                    }


                    if (borrower.Nationality == 'BD ') {
                        $scope.nationality = 'Bangladeshi';
                        $scope.borrowerprofile.individual.nationality = 'Bangladeshi';
                    }


                    if (borrower.PermCountry == 'BD ' || borrower.MailCountry == 'BD ')
                        $scope.permCountryId = 1;

                    //$scope.borrowerprofile.individual.nic = borrower.IdentityNo;
                    //$scope.borrowerprofile.individual.noofdependents = borrower.Noofdependents;
                    //$scope.borrowerprofile.individual.age = CalculateAge(borrower.date);
                    //$scope.borrowerprofile.individual.natureofcustomer = "Salaried Employee";
                    //$scope.borrowerprofile.individual.salariedemp = {
                    //    id: '',
                    //    status: borrower.employeeStatus,
                    //    employer: borrower.employerName,
                    //    designation: borrower.jobTitle
                    //};
                    //$scope.ADtoBS($scope.borrowerprofile.individual.dob, '$scope.borrowerprofile.individual.dob_np');
                    $scope.borrowerprofile.stakeholder = null;
                }
                else {
                    $scope.borrowerprofile.stakeholder = {
                        no: borrower.identityNo,
                        date: borrower.date,
                        name: borrower.name,
                        bokid: borrower.bokid,
                        regAddress: borrower.address2,
                        contactNo: borrower.tel1,
                        fax: borrower.fax,
                        email: borrower.email,
                        panNumber: borrower.taxfileno,
                        industry: '',
                        conName: '',
                        conDesignation: '',
                        conTeleNo: '',
                        conFax: '',
                        conEmail: '',
                        conBusAddress: '',
                        historyOfCommencementRelationship: null,
                        listSecondaryStakeholder: [],
                        ltdetc: [],
                        addressDetailsList: []
                    };
                    $scope.borrowerprofile.individual = null;
                }
            } catch (e) {
                alert("BindBorrowerProfile " + e);
            }
        };

        function SelectSecondaryApplicant(joint) {
            try {
                $scope.formatIndex = 2;
                if (joint == true) {
                    $scope.selectedApplicantType = "Joint";
                    var filterJoin = $filter('filter')($scope.cprinit.listBorrowerProfiles, { type: { type: 'Joint Applicant' } });
                    if (filterJoin.length > 0) {
                        var index = GetArrayIndexByValue($scope.cprinit.listBorrowerProfiles, 'id', filterJoin[0].id);
                        ChangeBorrowerProfile($scope.listBorrowerProfileTypes[1], index);
                    }
                    $scope.changeTab = "joint";
                }
                else {
                    $scope.selectedApplicantType = "Guarantor";
                    var filterGuarantor = $filter('filter')($scope.cprinit.listBorrowerProfiles, { type: { type: 'Guarantor' } });
                    if (filterGuarantor.length > 0) {
                        var index = GetArrayIndexByValue($scope.cprinit.listBorrowerProfiles, 'id', filterGuarantor[0].id);
                        ChangeBorrowerProfile($scope.listBorrowerProfileTypes[2], index);
                    }
                    $scope.changeTab = "guarantor";

                }
            } catch (e) {
                alert("SelectSecondaryApplicant " + e);
            }
        }
        function FilterFacilityForPersonalGuarantor(listFacilities) {
            try {
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
        function ReStrtureTrialCalculation() {
            try {
                if ($scope.listLoanType != null && $scope.listPayTerm != null) {
                    if ($scope.listLoanType.length > 0 || $scope.listPayTerm.length > 0) {
                        angular.forEach($scope.cprinit.listCPRFacilities, function (value, index) {
                            if (value.trialCalculation != null) {
                                if (value.trialCalculation.loantype != null) {
                                    $scope.cprinit.listCPRFacilities[index].trialCalculation.loantype = $filter('filter')($scope.listLoanType, { name: value.trialCalculation.loantype.name })[0]
                                }

                                if (value.trialCalculation.loantype != null) {
                                    $scope.cprinit.listCPRFacilities[index].trialCalculation.payterm = $filter('filter')($scope.listPayTerm, { name: value.trialCalculation.payterm.name })[0]
                                }
                                if (value.trialCalculation.listTrialShedule != null) {
                                    angular.forEach(value.trialCalculation.listTrialShedule, function (val, index) {
                                        var begBal = parseFloat(val.principal) + parseFloat(val.endingBalance);
                                        val.begBal = begBal.toString();
                                    });
                                }
                            }
                        });
                    }
                }
            } catch (e) {
                alert("ReStrtureTrialCalculation " + e);
            }
        }
        function ResetCoverType() {
            $scope.coverName = null;
        }
        function Search(item) {
            if ($scope.insuranceCoverDetailsList.length !== 0) {
                for (var i = 0; i < $scope.insuranceCoverDetailsList.length; i++) {
                    if ($scope.insuranceCoverDetailsList[i].CoverName === item) {
                        $scope.insuranceCoverDetailsList[i];
                        $scope.result = 1;
                    }
                }
            }
        }
        $scope.validInterestRate = function (amount) {
            if (amount >= 100) {
                dialogService.ConfirmDialogWithOkay('', " Interest rate should be less than 100 ");
                $scope.cPRFacility.interestrate = null;
            }

        }
        function AddSecurityOffer_Validation(item) {
            try {
                if (GetArrayActiveValueCount($scope.cPRFacility.listSecurityOffer) > 0) {
                    if (item.type == "Clean") {
                        dialogService.ConfirmDialogWithOkay('', global._securityoffercannotaddedmessage).then(function () {
                        });
                        $scope.securitytype = null;
                        return -2;
                    }
                    else {
                        for (var i = 0; i < $scope.cPRFacility.listSecurityOffer.length; i++) {
                            if ($scope.cPRFacility.listSecurityOffer[i].active === true && $scope.cPRFacility.listSecurityOffer[i].securitytype.type == "Clean") {
                                dialogService.ConfirmDialogWithOkay('', global._securityoffercannotaddedmessage).then(function () {
                                });
                                $scope.securitytype = null;
                                return -2;
                            }
                            if ($scope.cPRFacility.listSecurityOffer[i].securitytype.type === item.type)
                                return i;
                        }
                        return -1;
                    }
                }
                else return -1;

            } catch (e) {
                alert("Exception AddSecurityOffer_Validation " + e);
            }
        }
        function AddFacilityDetails_Function(facility) {
            try {
                if (facility.purposeoffacility == null)
                    facility.purposeoffacility = tempFacilityPurpose;
                if ($scope.cprinit.listCPRFacilities === null)
                    $scope.cprinit.listCPRFacilities = [];
                if (facility.product.nature !== 'Revolving')
                    facility.revolve = null;
                //if (facility.interestrate == null || facility.interestrate == '') {
                //    Erroralert('Please Enter Interest rate');
                //     return false;
                //}

                //Other Option in Purpose
                if (facility.purposeoffacility == 'Others') {
                    facility.purposeoffacility = $scope.cPRFacility.purposeoffacilityOther;
                }
                $scope.cprinit.listCPRFacilities = $filter('filter')($scope.cprinit.listCPRFacilities, { active: true }, true);
                //if ($scope.cprinit.listCPRFacilities.length > 0) {
                //    dialogService.ConfirmDialogWithOkay('', "Facility should not be more than one");
                //    return false;
                //}
                //else {
                //    $scope.cprinit.listCPRFacilities.push(facility);
                //}
                facility.installmentAmount = $scope.installmentSize;
                facility.bankLoan = $scope.cPRFacility.amountrequest;

                $scope.cprinit.listCPRFacilities.push(facility);
                //console.log(facility);
                //Highest Product find
                GetHighestPriductFromList($scope.cprinit.listCPRFacilities);
                AddlistPersonalGuarantor_Function(facility);

                for (var i = 0; i < $scope.listSecurityType.length; i++)
                    $scope.listSecurityType[i].active = true;

                ResetFacilityModel("Pending");
                return true;
            } catch (e) {
                alert("Exception AddFacilityDetails_Function" + e);
                return false;
            }
        }

        function AddGroupOverviewDetails_Function(item) {
            try {
                var obj = {
                    id: item.id,
                    unitName: item.unitName,
                    productName: item.productName.name,
                    existingLimit: item.existingLimit,
                    outstandingLimit: item.outstandingLimit,
                    tenure: item.tenure,
                    emi: item.emi,
                    timelyRepayment: item.timelyRepayment,
                    interestRate: item.interestRate,
                    sol: item.sol,
                    outstandingAsOn: item.outstandingAsOn,
                    security: item.security,
                    securityValue: item.securityValue,
                    expiry: item.expiry,
                    cIFOfConcern: item.cIFOfConcern,
                    accountNumber: item.accountNumber,
                    outstandingFunded: item.outstandingFunded,
                    outstandingNonFunded: item.outstandingNonFunded,
                    eOL: item.eOL,
                    overdue: item.overdue,
                    active: true
                };
                if (angular.isUndefined($scope.cprinit.listCPRGroupOverview) || $scope.cprinit.listCPRGroupOverview === null)
                    $scope.cprinit.listCPRGroupOverview = [];
                $scope.cprinit.listCPRGroupOverview.push(obj);
                ResetGroupOverviewModel();
            } catch (e) {
                alert("Exception AddGroupOverviewDetails_Function " + e);
            }
        }

        function AddlistPersonalGuarantor_Function(facility) {
            try {
                var status = CheckPersonalGuarantorExistInSecurityOfferList(facility.listSecurityOffer);
                if (status) {
                    var i = $scope.listPersnalGurantorLoanFacility.indexOf(facility);
                    if (i == -1) {
                        var index = -1;
                        if (facility.id == 0 || facility.id == null)
                            index = arrayObjectIndexOf($scope.listPersnalGurantorLoanFacility, facility);
                        else
                            index = GetArrayIndexByValue($scope.listPersnalGurantorLoanFacility, 'id', facility.id);

                        if (index == -1)
                            $scope.listPersnalGurantorLoanFacility.push(facility);
                    }
                }
            } catch (e) {
                alert("Exception AddlistPersonalGuarantor_Function" + e);
            }
        }
        function AddSecondaryStakeHolder_Function(stakeholder) {
            try {
                stakeholder.stakeHolderFamilyBackgroundModelList = $scope.stakeHolderFamilyBackgroundModelList;
                $scope.borrowerprofile.stakeholder.listSecondaryStakeholder.push(stakeholder);
                ResetSecondaryStakeholderModel();
                $scope.stakeHolderFamilyBackgroundModelList = [];

            } catch (e) {
                alert("Exception AddSecondaryStakeHolder_Function" + e);
            }
        }


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

        function AddGuarantorDetails_Function(facility, securityoffer, cPRSecurityGuarantor) {
            try {
                cPRSecurityGuarantor.cPRSecurityOfferId = securityoffer.id;
                var i = $scope.cprinit.listCPRFacilities.indexOf(facility);
                if (i != -1 || i != null)
                    var j = $scope.cprinit.listCPRFacilities[i].listSecurityOffer.indexOf(securityoffer);
                if (i != -1 && j != -1) {
                    $scope.cprinit.listCPRFacilities[i].listSecurityOffer[j].listCPRSecurityGuarantorModel.push(cPRSecurityGuarantor);
                    ResetGuarantorDetailsModel(cPRSecurityGuarantor.facilityno);
                }
            } catch (e) {
                alert("Exception AddPropertyDetails_Function" + e);
            }
        }

        function AddCostEstimation() {
            $scope.hideInput = false;
            $scope.listcPRCostEstimationModel.push({
                'Id': "",
                'TypeOfCost': "",
                'CustomerEstimation': "",
                'BankEstimation': "",
                'Created': "",
                'Modified': "",
                'Editor': "",
                'CPRId': "",
                'Author': "",
                'Active': true
            });
        }
        function BindFacilityDetailValues(item) {
            try {
                // //debugger;
                $scope.cPRFacility = GetFacilityByFacilityNo(item.facilityno);

                if (!angular.isUndefined(item.product) && item.product != null)
                    $scope.cPRFacility.product = $scope.listProducts[GetArrayIndexByValue($scope.listProducts
                        , "name"
                        , item.product.name)];
                if (item.product != null && item.product != undefined)
                    $scope.productcode = item.product.code;

                //if (!angular.isUndefined(item.sectorcode) && item.sectorcode != null)
                //    $scope.cPRFacility.sectorcode = $scope.listSectorCode[GetArrayIndexByValue($scope.listSectorCode
                //        , "name"
                //        , item.sectorcode.name)];
                $scope.productcode = item.product.code;

                if (!angular.isUndefined(item.economicPurposeCode) && item.economicPurposeCode != null)
                    $scope.cPRFacility.economicPurposeCode = $scope.codeSectorViewModel.economicPurposeCodeList[GetArrayIndexByValue($scope.codeSectorViewModel.economicPurposeCodeList
                        , "code"
                        , item.economicPurposeCode.code)];

                if (!angular.isUndefined(item.financialCategory) && item.financialCategory != null)
                    $scope.cPRFacility.financialCategory = $scope.codeSectorViewModel.financialCategoryList[GetArrayIndexByValue($scope.codeSectorViewModel.financialCategoryList
                        , "category"
                        , item.financialCategory.category)];

                if (!angular.isUndefined(item.loanTypeCode) && item.loanTypeCode != null)
                    $scope.cPRFacility.loanTypeCode = $scope.codeSectorViewModel.loanTypeCodeList[GetArrayIndexByValue($scope.codeSectorViewModel.loanTypeCodeList
                        , "code"
                        , item.loanTypeCode.code)];

                if (!angular.isUndefined(item.classificationCode) && item.classificationCode != null)
                    $scope.cPRFacility.classificationCode = $scope.codeSectorViewModel.classificationCodeList[GetArrayIndexByValue($scope.codeSectorViewModel.classificationCodeList
                        , "code"
                        , item.classificationCode.code)];


                if (!angular.isUndefined(item.currency) && item.currency != null)
                    $scope.cPRFacility.currency = GetDefaultCurrency(item.currency.type);


                if (!angular.isUndefined(item.purposeoffacility) && item.purposeoffacility != null) {
                    //if (item.purposeoffacility == 'Home Loan Purpose' || item.purposeoffacility == 'Car Loan') {
                    //    $scope.cPRFacility.purposeoffacilityOther = '';
                    //    $scope.cPRFacility.purposeoffacility = item.purposeoffacility;

                    //} else {
                    //    $scope.cPRFacility.purposeoffacilityOther = item.purposeoffacility;
                    //    $scope.cPRFacility.purposeoffacility = 'Others'


                    //}
                    $scope.cPRFacility.purposeoffacility = item.purposeoffacility;
                }



                if (!angular.isUndefined(item.interestrateoption) && item.interestrateoption != null)
                    $scope.cPRFacility.interestrateoption = $scope.listInterestRateOption[GetArrayIndexByValue($scope.listInterestRateOption
                        , "option"
                        , item.interestrateoption.option)];

                if (item.interestrateoption.option == "Float")
                    $scope.baseRateEnable = true;
                else
                    $scope.baseRateEnable = false;


                if (!angular.isUndefined(item.listSecurityOffer))
                    $scope.cPRFacility.listSecurityOffer = item.listSecurityOffer;

                if (!angular.isUndefined(item.cPRFacilityCAFModel))
                    $scope.cPRFacility.cPRFacilityCAFModel = item.cPRFacilityCAFModel;




                if (!angular.isUndefined(item.listUDFValues) && item.listUDFValues != null)
                    $scope.cPRFacility.listUDFValues = item.listUDFValues;
                else
                    $scope.cPRFacility.listUDFValues = [];

                return true;

            } catch (e) {
                alert("Exception BindFacilityDetailValues: " + e);
                return false;
            }
        }

        function BindGroupOverviewDetailValues(list, item) {
            try {

                var index = $scope.cprinit.listCPRGroupOverview.indexOf(item);
                if (item.id == 0 || item.id == null) {
                    $scope.groupOverview = $scope.cprinit.listCPRGroupOverview[index];

                }
                else {
                    $scope.groupOverview = GetListItemById($scope.cprinit.listCPRGroupOverview, item.id);
                }

                if (!angular.isUndefined(item.productName) && item.productName != null)
                    $scope.groupOverview.productName = $scope.listProducts[GetArrayIndexByValue($scope.listProducts
                        , "name"
                        , item.productName)];

                if (list != null)
                    common.RemoveItemFromList(list, item, false);
            } catch (e) {
                alert("Exception BindGroupOverviewDetailValues " + e);
            }
        }

        function BindSecondaryStakeHolderValues(list, item) {
            try {

                if (!angular.isUndefined(item.id))
                    $scope.secondarystakeholder.id = item.id;

                if (!angular.isUndefined(item.name))
                    $scope.secondarystakeholder.name = item.name;

                if (!angular.isUndefined(item.cif))
                    $scope.secondarystakeholder.cif = item.cif;

                if (!angular.isUndefined(item.passportNo))
                    $scope.secondarystakeholder.passportNo = item.passportNo;

                if (!angular.isUndefined(item.share))
                    $scope.secondarystakeholder.share = item.share;

                if (!angular.isUndefined(item.nic))
                    $scope.secondarystakeholder.nic = item.nic;

                if (!angular.isUndefined(item.address))
                    $scope.secondarystakeholder.address = item.address;

                if (!angular.isUndefined(item.position))
                    $scope.secondarystakeholder.position = item.position;

                if (!angular.isUndefined(item.listEducationQualification) && item.listEducationQualification != null)
                    $scope.secondarystakeholder.listEducationQualification = item.listEducationQualification;

                if (!angular.isUndefined(item.experience))
                    $scope.secondarystakeholder.experience = item.experience;

                if (!angular.isUndefined(item.percentageshare))
                    $scope.secondarystakeholder.percentageshare = item.percentageshare;

                if (!angular.isUndefined(item.phoneNo))
                    $scope.secondarystakeholder.phoneNo = item.phoneNo;

                if (!angular.isUndefined(item.dOB))
                    $scope.secondarystakeholder.dOB = item.dOB;

                if (item.dOB != null) {
                    $scope.ADtoBS(item.dOB, 'secondarystakeholder.dOB_np');
                }

                if (!angular.isUndefined(item.taxNo))
                    $scope.secondarystakeholder.taxNo = item.taxNo;

                if (!angular.isUndefined(item.personalNetWorth))
                    $scope.secondarystakeholder.personalNetWorth = item.personalNetWorth;

                if (!angular.isUndefined(item.training))
                    $scope.secondarystakeholder.training = item.training;

                if (!angular.isUndefined(item.succession))
                    $scope.secondarystakeholder.succession = item.succession;

                if (!angular.isUndefined(item.shareTransferee))
                    $scope.secondarystakeholder.shareTransferee = item.shareTransferee;

                if (!angular.isUndefined(item.shareHoldingAfterTransfer))
                    $scope.secondarystakeholder.shareHoldingAfterTransfer = item.shareHoldingAfterTransfer;

                if (!angular.isUndefined(item.relationshipWithSponsor))
                    $scope.secondarystakeholder.relationshipWithSponsor = item.relationshipWithSponsor;

                if (!angular.isUndefined(item.remark))
                    $scope.secondarystakeholder.remark = item.remark;

                if (!angular.isUndefined(item.listClientStakeHolderFamily))
                    $scope.secondarystakeholder.listClientStakeHolderFamily = item.listClientStakeHolderFamily;

                if (!angular.isUndefined(item.listEducationQualification))
                    $scope.secondarystakeholder.listEducationQualification = item.listEducationQualification;

                if (!angular.isUndefined(item.active))
                    $scope.secondarystakeholder.active = item.active;

                if (list != null)
                    common.RemoveItemFromList(list, item, false);

            } catch (e) {
                alert("Exception BindSecondaryStakeHolderValues: " + e);
            }
        }
        function ResetCostEstimation() {
            $scope.cPRCostEstimationModel = {
                Id: 0,
                TypeOfCost: null,
                CustomerEstimation: null,
                BankEstimation: null,
                Created: null,
                Modified: null,
                Editor: null,
                CPRId: null,
                Author: null,
                Active: true
            };
        }
        //moved to CRIB Analysis
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
        function ResetCribAnalysis() {
            $scope.cribanalysis = {
                name: null,
                url: '',
                criboverdue: false,
                status: null,
                description: '',
                evaluatorcomments: '',
                active: false
            };
            $scope.cribanalysisform.$setPristine();
            $scope.cribanalysisform.$setUntouched();
        }
        function ResetFeeType() {
            $scope.feeType = {
                id: '',
                isApply: false,
                fee: 0,
                amortize: false,
                amortizedInterest: 0,
                recurringFee: 0,
                feeType: '',
                active: false
            };
            $scope.addnewincomeform.$setPristine();
            $scope.addnewincomeform.$setUntouched();
        }

        function ResetTaxInformation() {
            $scope.taxinformation =
            {
                year: '',
                llcoyn: '',
                statutoryincome: '',
                assessableincome: '',
                taxableincome: '',
                taxpayable: '',
                taxpaid: '',
                saleamount: '',
                taxclearancecertificationdate: '',
                active: false
            };
            $scope.taxinformatinform.$setPristine();
            $scope.taxinformatinform.$setUntouched();
        }

        function ResetFacilityModel(fNo) {
            try {
                $scope.cPRFacility = {
                    id: null,
                    facilityno: fNo,
                    product: null,
                    facilitytype: null,
                    purposeoffacility: " ",
                    sectorcode: null,
                    currency: GetDefaultCurrency($scope.defaultCurrency),
                    amountrequest: '',
                    downPayment: '',
                    tenour: {
                        termYears: $scope.listYearCount[0],
                        termMonths: $scope.listMonthCount[0],
                        totalTermMonths: 0
                    },
                    interestrate: '',
                    bankLoan: 0,
                    equity: 0,
                    facilityOption: 'Fresh',
                    expiry: '',
                    installmentAmount: '',
                    commission: '',
                    modeOfDisbursement: '',
                    otherTermsConditions: '',
                    overdue: '',
                    eOL: '',
                    repaymentArrangement: '',
                    remark: null,
                    accountNumber: null,
                    repaymentmethod: $scope.listRepaymentMethods[1],
                    interestrateoption: $scope.listInterestRateOption[1],
                    listSecurityOffer: [],
                    listUDFValues: [],
                    cPRFacilityCAFModel: {
                        cAFCassification: null,
                        npaPercent: null,
                        npaConsiderationObtained: null,
                        npaConsiderationApproval: null,
                        active: true
                    },
                    active: true
                };
                $scope.listUDF = [];
                $scope.productcode = null;
                SetActiveTruelistSecurityType();
                $scope.DropdownInterestRateOption_ChangeEvent($scope.cPRFacility.interestrateoption);
                $scope.facilityForm.$setPristine();
                $scope.facilityForm.$setUntouched();
            }
            catch (e) {
                alert("Exception ResetFacilityModel: " + e);
            }
        }

        function ResetGroupOverviewModel() {
            try {
                $scope.groupOverview = {
                    id: 0,
                    unitName: null,
                    product: null,
                    existingLimit: null,
                    outstandingLimit: null,
                    tenure: null,
                    emi: null,
                    timelyRepayment: null,
                    interestRate: null,
                    sol: null,
                    cIFOfConcern: null,
                    accountNumber: null,
                    outstandingFunded: null,
                    outstandingNonFunded: null,
                    eOL: null,
                    overdue: null,
                    active: true
                };
                $scope.groupOverviewForm.$setPristine();
                $scope.groupOverviewForm.$setUntouched();
            } catch (e) {
                alert("Exception ResetGroupOverviewModel" + e);
            }
        }
        function ResetSlabDetailsModel() {
            $scope.nonStructured =
            {
                months: null,
                payment: null,
            };
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

        function ResetGuarantorDetailsModel(fNo) {
            try {
                $scope.cPRSecurityGuarantor = {
                    id: null,
                    cPRSecurityOfferId: null,
                    name: null,
                    age: null,
                    phoneNo: null,
                    address: null,
                    relationshipWithParty: null,
                    occupation: null,
                    yearlyIncome: 0,
                    netWorth: 0,
                    facilityno: fNo,
                    active: true

                };
                $scope.guarantorForm.$setPristine();
                $scope.guarantorForm.$setUntouched();
            } catch (e) {

            }

        }
        function ResetSpouseMonthlyIncomeModel() {
            $scope.spousemonthlyincome = {
                id: null,
                sourceofincome: null,
                amount: null,
                active: true
            };
        }

        function ResetPreviousEmploymentDetail() {
            $scope.clientPreviousEmploymentDetail = {
                id: null,
                cPRClientProfileId: null,
                salariedEmployeeId: null,
                organizationName: null,
                designation: null,
                joiningDate: null,
                releaseDate: null,
                phoneNo: null,
                totalWorkExperience: null,
                active: true
            };
        }
        function ResetSOtherIncomeSourcModel() {
            $scope.otherincomesourceModel = {
                id: null,
                sourceofOtherIncome: null,
                description: null,
                active: true
            };
        }

        function ResetSecondaryStakeholderModel() {
            $scope.secondarystakeholder = {
                id: null,
                name: null,
                nic: null,
                address: null,
                position: null,
                qualification: {
                    pHD: false,
                    bSC: false,
                    mBA: false,
                    diploma: false,
                    certificate: false,
                    other: false
                },
                experience: null,
                precentageofshare: null,
                phoneNo: null,
                dOB: null,
                taxNo: null,
                personalNetWorth: 0,
                training: null,
                succession: null,
                shareTransferee: null,
                shareHoldingAfterTransfer: null,
                relationshipWithSponsor: null,
                remark: null,
                others: null,
                active: true
            };
            $scope.form.secondaryStakeHolderForm.$setPristine;
            $scope.form.secondaryStakeHolderForm.$setUntouched;
        }

        ///............................................Reference Data Functions
        function FacilityFormLoad() {
            //  GetCPRFacilityPurpose();
            //GetCurrency();
            GetSectorCode();
            //GetRepaymentMethod();
            //GetFacilitySecurityTypes();
            GetCAFClassification();
            GetInterestRateOption();
            GetVehicleSecurityType();
            GetVehicleStatusWhenRegister();
            GetMarketabilityOfTheAssets();
            GetFuelTypes();
            GenerateYOMList();
            GetCountryOfOrigin();
            GetVehicleBodyTypes();
            GetPropertyTypeOfBond();
            GetPropertyType();
            GetAllProposeTypeOfFacility();
            GetFeeType();
        }
        function GetAllNationality() {
            try {
                $http({
                    url: "/CPR/GetAllNationality",
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
        ///............................................Server Request Functions
        function CustomerSegmentChange(business) {
            try {
                GetLegalFormsByBusinesses(business);
            } catch (e) {
                alert("CustomerSegmentChange " + e);
            }
        }
        function GetDisbursementPlanByCPRId(cPRId) {
            try {
                $http({
                    url: "/CPR/GetDisbursementPlanByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ CPRIdstring: cPRId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.disbursement = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetDisbursementPlanByCPRId " + e);
            }
        }
        function SubmitDisbursementPlan() {
            $scope.disbursement.CPRId = $scope.cprinit.id;
            try {
                $http({
                    url: "/CPR/SubmitDisbursementPlan",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ disbursementPlanModel: $scope.disbursement })
                }).then(function successCallback(response) {
                    if (response.data.success)
                        alert("Success");
                    else
                        dialogService.ShowDialog(response.data.message);
                }, function errorCallback(response) {

                });
            } catch (e) {
                alert('SubmitDisbursementPlan ' + e);
            }
        }
        function AutoDraftCPR() {
            try {
                $scope.trigedSubmit = true;
                signalRService.trigedSubmit = true;
                common.preprocessload();
                //BindStakeHolderDate(null);
                if ($scope.borrowerProperties.type.type == "Applicant" || $scope.borrowerProperties.type.type == "Joint")
                    $scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index] = $scope.borrowerprofile;

                $http({
                    url: "/CPR/DraftCPR",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRModel: $scope.cprinit })
                }).then(function successCallback(response) {
                    if (response.data != null || response.data != "") {
                        if (response.data.success) {
                            dialogService.ConfirmDialogWithOkay('', global._automaticdraftcprmessage);
                            GetCPRByIdForAutoDraft($scope.cprinit.id);
                            GetInvestmentInBusinessByCPRId();
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
                    $scope.trigedSubmit = false;
                    $scope.error = response;
                });
            } catch (e) {
                common.preprocesshide();
                $scope.trigedSubmit = false;
                alert('AutoDraftCPR ' + e);
            }
        }
        function GetCostEstimationList(CPRIdstring) {
            try {
                $http({
                    url: "/CPR/GetCostEstimationListByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { CPRIdstring: CPRIdstring }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.listcPRCostEstimationModel = response.data.output;
                        $scope.listcPRCostEstimationModel = $scope.cprinit.listcPRCostEstimationModel;
                        $scope.lengthOfCostEstimationList = $scope.cprinit.listcPRCostEstimationModel.length;
                        //console.log($scope.cprinit.listcPRCostEstimationModel);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCostEstimationList " + e);
            }
        }
        function GetPayTerm() {
            try {
                $http({
                    url: "/CPR/GetPayTerm",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listPayTerm = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetPayTerm: " + e);
            }
        }
        function GetCurrency() {
            try {
                $http({
                    url: "/CPR/GetCurrencyType",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCurrency = response.data.output;
                        $scope.cPRFacility.currency = GetDefaultCurrency($scope.defaultCurrency);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCurrency" + e);
            }
        }

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
        }

        function GetCAFClassification() {
            try {
                $http({
                    url: "/CPR/GetCAFClassification",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success)
                        $scope.listCAFClassification = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCAFClassification: " + e);
            }
        }
        function GetSectorCode() {
            try {
                $http({
                    url: "/CPR/GetSectorCode",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success)
                        $scope.listSectorCode = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetSectorCode: " + e);
            }
        }

        function GetFeeType() {
            try {
                $http({
                    url: "/CPR/GetFeeType",
                    method: "GET",
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
                alert("Exception GetFeeType: " + e);
            }
        }
        function GetLoanType() {
            try {
                $http({
                    url: "/CPR/GetLoanType",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listLoanType = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetLoanType: " + e);
            }
        }
        function GetFuelTypes() {
            try {
                $http({
                    url: "/CPR/GetFuelTypes",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success)
                        $scope.listFuelTypes = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetFuelTypes: " + e);
            }
        }
        function GetCRIBStatus() {
            try {
                $http({
                    url: "/CPR/GetCRIBStatus",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCRIBStatus = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetCRIBStatus: " + e);
            }
        }
        function GetPropertyType() {
            try {
                $http({
                    url: "/CPR/GetPropertyType",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {

                    if (response.data.success)
                        $scope.listPropertyType = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetPropertyType: " + e);
            }
        }

        function GetDocumentTypes() {
            try {
                $http({
                    url: "/CPR/GetDocumentTypes",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listDocumentType = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetDocumentTypes: " + e);
            }
        }

        function GetBranch() {
            try {
                $http({
                    url: "/CPR/GetBranch",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listBranch = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetBranch: " + e);
            }
        }

        function GetDivisions() {
            try {
                $http({
                    url: "/CPR/GetDivisions",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },

                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listDivision = response.data.output;
                        $scope.listFilterdDivisions = response.data.output;
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetDivisions: " + e);
            }
        }
        function GetAssestTangibleTypes() {
            try {
                $http({
                    method: 'POST',
                    url: '/CPR/GetAssestTangibleTypes'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.listAssestTangibleType = response.data.output;

                }, function errorCallback(response) {
                    $scope.error = response;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });

            } catch (e) {
                alert("Error Occured: GetAssestTangibleTypes" + e);
            }
        }

        function GetProductiveSectorType() {
            try {
                $http({
                    method: 'POST',
                    url: '/CPR/GetProductiveSectorType'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.listProductiveSector = response.data.output;

                }, function errorCallback(response) {
                    $scope.error = response;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });

            } catch (e) {
                alert("Error Occured: GetProductiveSectorType" + e);
            }
        }
        function GetModeOfOwnerShipTransferTypes() {
            try {
                $http({
                    method: 'POST',
                    url: '/CPR/GetPropertModeofOwnershipTypes'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.listModeOfOwnerShipTransferType = response.data.output;

                }, function errorCallback(response) {
                    $scope.error = response;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });

            } catch (e) {
                alert("Error Occured: GetModeOfOwnerShipTransferTypes" + e);
            }
        }

        function GetPropertyTypeOfLand() {
            try {
                $http({
                    method: 'POST',
                    url: '/CPR/GetPropertyTypeOfLand'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.listPropertyTypeOfLand = response.data.output;

                }, function errorCallback(response) {
                    $scope.error = response;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });

            } catch (e) {
                alert("Error Occured: GetPropertyTypeOfLand " + e);
            }
        }

        function GetRepaymentMethod() {
            try {
                $http({
                    url: "/CPR/GetRepaymentMethods",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.listRepaymentMethods = response.data.output;
                        $scope.cPRFacility.repaymentmethod = $scope.listRepaymentMethods[1];
                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetRepaymentMethod: " + e);
            }
        }
        function GetApprovalSummary() {
            try {
                $http({
                    url: "/CPR/GetApprovalSummary",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: $scope.cprinit.id }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.approvalSummary = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetApprovalSummary " + e);
            }
        }
        function GetCountryOfOrigin() {
            try {
                $http({
                    url: "/CPR/GetCountryOfOrigin",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCountries = response.data.output;
                        if ($scope.cprinit.listBorrowerProfiles.length > 0) {
                            if ($scope.cprinit.listBorrowerProfiles[0].individual != null) {
                                $scope.permanentCountry = $filter("filter")($scope.listCountries, { id: $scope.cprinit.listBorrowerProfiles[0].individual.permanentCountryId });
                            }
                        }

                    }

                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCountryOfOrigine: " + e);
            }
        }
        function GetVehicleBodyTypes() {
            try {
                $http({
                    url: "/CPR/GetVehicleBodyTypes",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success)
                        $scope.listVehicleBodyTypes = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetVehicleBodyType: " + e);
            }
        }
        function GetCPRFacilityPurpose() {
            try {
                $http({
                    url: "/CPR/GetCPRFacilityPurpose",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listFacilityPurposes = response.data.output;
                        listFacilityPurposesCopy = angular.copy($scope.listFacilityPurposes);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCPRFacilityPurpose: " + e);
            }
        }
        function GetPropertyTypeOfBond() {
            try {
                $http({
                    url: "/CPR/GetPropertyTypeOfBond",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {

                    if (response.data.success)
                        $scope.listPropertyTypeOfBond = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetPropertyTypeOfBond: " + e);
            }
        }

        function GetInterestRateOption() {
            try {
                $http({
                    url: "/CPR/GetInterestRateOption",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.listInterestRateOption = response.data.output;
                        $scope.cPRFacility.interestrateoption = $scope.listInterestRateOption[1];
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetInterestRateOption: " + e);
            }
        }
        function GetVehicleSecurityType() {
            try {
                $http({
                    url: "/CPR/GetVehicleSecurityType",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {

                    if (response.data.success)
                        $scope.listVehicleSecurityType = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetSecurityTypes: " + e);
            }
        }
        function GetFacilitySecurityTypes() {
            try {
                $http({
                    url: "/CPR/GetSecurityTypes",
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
        }
        function GetCPRByIdForAutoDraft(cPRId) {
            try {
                $http({
                    url: "/CPR/GetCPRById",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cPRId }
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.cprinit = response.data.output;
                        if ($scope.cprinit.listCPRValuation != null && $scope.cprinit.listCPRValuation != undefined) {
                            if ($scope.cprinit.listCPRValuation.length > 0) {
                                for (var i = 0; i < $scope.cprinit.listCPRValuation.length; i++) {
                                    if ($scope.cprinit.listCPRValuation[i].valuer != null) {
                                        if (isJson($scope.cprinit.listCPRValuation[i].valuer.name)) {
                                            $scope.cprinit.listCPRValuation[i].valuer.name = JSON.parse($scope.cprinit.listCPRValuation[i].valuer.name);
                                        }
                                        else {
                                            $scope.cprinit.listCPRValuation[i].valuer.name = JSON.stringify($scope.cprinit.listCPRValuation[i].valuer.name);
                                        }
                                    }
                                }
                            }
                        }
                        if ($scope.cprinit.status == "Completed" || $scope.cprinit.status == "Rejected") {
                            $scope.statusMatched = true;
                        }
                        else if ($scope.cprinit.status == "In Progress") {
                            GetApprovalSummary();
                            $scope.statusMatched = false;
                            $scope.approverView = true;
                        }
                        else {
                            $scope.statusMatched = false;
                        }
                        if ($scope.business != null)
                            $scope.cprinit.business = $filter('filter')($scope.business, { id: $scope.cprinit.business.id })[0];

                        if ($scope.listCPRActionModel != null)
                            $scope.cprinit.cprtype = $filter('filter')($scope.listCPRActionModel, { id: $scope.cprinit.cprtype.id })[0];
                        if ($scope.cprformat != null)
                            $scope.cprinit.cprformat = $filter('filter')($scope.cprformat, { id: $scope.cprinit.cprformat.id })[0];

                        if ($scope.listLegalForms != null)
                            $scope.cprinit.legalform = $filter('filter')($scope.listLegalForms, { id: $scope.cprinit.legalform.id })[0];

                        if ($scope.cprinit.listBorrowerProfiles != null && $scope.cprinit.listBorrowerProfiles.length > 0) {

                            $scope.borrowerprofile = $scope.cprinit.listBorrowerProfiles[0];
                            //  common.borrowerprofile.id = $scope.borrowerprofile.id;

                            if ($scope.cprinit.business.name == "Individual")
                                if ($scope.borrowerprofile.individual != null) {
                                    {
                                        $scope.mainApplicantName = $scope.borrowerprofile.individual.name;
                                    }
                                }


                                else if ($scope.mainApplicantName = $scope.borrowerprofile.stakeholder != null) {
                                    $scope.mainApplicantName = $scope.borrowerprofile.stakeholder.name;
                                }

                            if ($scope.borrowerprofile.listotherLiability != null && $scope.borrowerprofile.listotherLiability.length > 0) {
                                $scope.listotherLiability = $scope.borrowerprofile.listotherLiability;
                            }
                        }
                        else {
                            if ($scope.borrowerprofile.cif == null || $scope.borrowerprofile.cif == "") {
                                $scope.borrowerprofile.cif = $scope.cprinit.cif;
                                GetBorrowerProfileByCIFUsingConnectivity($scope.cprinit.cif, true);
                                $scope.cprinit.listBorrowerProfiles.push($scope.borrowerprofile);
                            }
                        }

                        if ($scope.cprinit.listCPRValuation != null && $scope.cprinit.listCPRValuation.length > 0) {
                            $scope.listValuationDetails = $scope.cprinit.listCPRValuation;
                        }

                        if ($scope.cprinit.financialanalysis == null) {
                            $scope.cprinit.financialanalysis = {
                                id: '',
                                imgname: '',
                                url: '',
                                income: '',
                                balance: '',
                                cashflow: '',
                                debatorage: '',
                                stockage: '',
                                creditorage: '',
                                projectedcashflow: '',
                                evaluatorcomments: '',
                            };
                        }
                        if ($scope.borrowerprofile.listMovableAssets == null) {
                            $scope.borrowerprofile.listMovableAssets = [];
                        }
                        if ($scope.borrowerprofile.listImmovableAssets == null) {
                            $scope.borrowerprofile.listImmovableAssets = [];
                        }
                        if ($scope.cprinit.creditScore == null)
                            $scope.cprinit.creditScore = {
                                id: null,
                                product: null,
                                scoreCardTemplate: null,
                                listQuestions: [],
                                grade: null,
                                totalMark: null,
                                active: true
                            };

                        if ($scope.cprinit.evaluationcomment == null)
                            $scope.cprinit.evaluationcomment = {
                                id: null,
                                enable: false,
                                borrower: null,
                                income: null,
                                expenditure: null,
                                facility: null,
                                security: null,
                                valuation: null,
                                assets: null,
                                liabilities: null,
                                bankaccount: null,
                                cribupload: null,
                                documentchecklist: null,
                                financialanaylsis: null,
                                cribanalysis: null,
                                creditscoring: null,
                                taxinformation: null,
                                repayment: null,
                                trialcalculation: null,
                                businessProfile: null,
                                subsidiaries: null,
                                physicalExpansion: null,
                                financialPerformance: null,
                                turnOver: null,
                                debtBurdenRatio: null,
                                insurance: null,
                                waiver: null,
                                deferral: null,
                                riskAnalysisICRRS: null
                            };

                        if ($scope.cprinit.financialanalysis.url != null && $scope.cprinit.financialanalysis.url != "") {
                            $scope.editable.view = false;
                        }
                        if ($scope.cprinit.listCRIBAnalysis[0] == null) {
                            $scope.cprinit.listCRIBAnalysis = [];
                        }

                        GetDocumentChecklistByCPRId(cPRId);
                        GetEvaluatorCommentsByCPR(cPRId);

                        common.preprocesshide();
                        $scope.trigedSubmit = false;
                    } else if (response.data.success == false) {
                        dialogService.ConfirmDialogWithOkay('', "Response GetCPRById Failed ");
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetCPRById: " + e);
            }
        }
        function GetCprByCprIdForValidation(cprId) {
            try {
                $http({
                    url: "/CPR/GetCPRBycprId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cprId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.cprDetails = response.data.output;

                        common.preprocesshide();

                    }
                    //else if (response.data.success == false) {
                    //    dialogService.ConfirmDialogWithOkay('', "Response GetCprByCprIdForValidation Failed ");
                    //}
                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetCprByCprIdForValidation: " + e);
            }
        }
        $scope.DOBChangeInFamilyBackground_ClickEvent = function () {
            try {
                var age = AgeCal($scope.familyBackgroundModel.dOB);
                $scope.familyBackgroundModel.age = age;
            }
            catch (ex) {
                alert("Exception in DOBChangeInFamilyBackground_ClickEvent " + ex);
            }
        }
        $scope.DOBChangeInBasicInformation_ClickEvent = function () {
            try {
                var age = AgeCal($scope.borrowerprofile.individual.dob);
                $scope.borrowerprofile.individual.age = age;
            }
            catch (ex) {
                alert("Exception in DOBChangeInBasicInformation_ClickEvent " + ex);
            }
        }

        $scope.DOBChangeInStackHolderFamilyBackground_ClickEvent = function () {
            try {
                var age = AgeCal($scope.stakeholderFamily.dOB);
                $scope.stakeholderFamily.age = age;
            }
            catch (ex) {
                alert("Exception in DOBChangeInBasicInformation_ClickEvent " + ex);
            }
        }

        $scope.WorkexperienceInIndividual_ClickEvent = function () {
            try {
                var age = AgeCal($scope.borrowerprofile.individual.salariedemp.joinDate);
                $scope.borrowerprofile.individual.salariedemp.lengthofservice = age;
            }
            catch (ex) {
                alert("Exception in WorkexperienceInIndividual_ClickEvent " + ex);
            }
        }

        //function AgeCal(dateString) {
        //    if (dateString != null && dateString != "") {
        //        var dtRaw = dateString.split('/');
        //        if (dtRaw.length == 3) {
        //            var month = parseInt(dtRaw[1]);
        //            var date = parseInt(dtRaw[0]);
        //            var year = parseInt(dtRaw[2]);

        //            var today = new Date();
        //            //var dt = Date.parse(dateString);
        //            var birthDate = new Date(year, month, date);
        //            var age = today.getFullYear() - birthDate.getFullYear();
        //            var m = today.getMonth() - birthDate.getMonth();
        //            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        //                age--;
        //            }
        //            return age;
        //        }
        //    }

        //    return 0;
        //}

        // Age Calculate for Basic Bank DOB Format "20190101"
        function AgeCal(dateString) {
            if (dateString != null && dateString != "") {
                var dtRaw = dateString.split('/');
                if (dtRaw.length == 3) {
                    var month = parseInt(dtRaw[1]);
                    var date = parseInt(dtRaw[0]);
                    var year = parseInt(dtRaw[2]);

                    var today = new Date();
                    //var dt = Date.parse(dateString);
                    var birthDate = new Date(year, month, date);
                    var age = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    return age;
                }
            }

            return 0;
        };

        //function AgeCal(birthday) {
        //    if (birthday != null && birthday != "") {


        //        var dtRaw = birthday.split('/');
        //        if (dtRaw.length == 3) {               
        //            var birthday = new Date(birthday);
        //            var today = new Date();
        //            var age = ((today - birthday) / (31557600000));
        //            var age = Math.floor(age);
        //            return age;
        //        }
        //    }
        //    return 0;

        //}
        function GetMarketabilityOfTheAssets() {
            try {
                $http({
                    url: "/CPR/GetMarketabilityOfTheAssets",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {

                    if (response.data.success)
                        $scope.listMarketability = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetMarketabilityOfTheAssets: " + e);
            }
        }
        function GetProductByBusiness(business) {
            try {
                $http({
                    url: "/CPR/GetProductsByBussines",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        business: business
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listProducts = response.data.output;

                        if ($scope.cprinit.listCPRFacilities != null && $scope.cprinit.listCPRFacilities.length > 0)
                            ProductDropDownFilterByFacilityType($scope.cprinit.listCPRFacilities[0].product, false);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetProductByBusiness" + e)
            }
        }
        function GetVehicleStatusWhenRegister() {
            try {
                $http({
                    url: "/CPR/GetVehicleStatusWhenRegister",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {

                    if (response.data.success)
                        $scope.listVehicleStatusWhenRegister = response.data.output;
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetVehicleStatus: " + e);
            }
        }
        function GetScoreCardTemplatesByProductId(productId) {
            try {
                $http({
                    url: "/Master/GetScoreCardTemplateByProductId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { productid: productId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listScoreCardTemplates = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetScoreCardTemplatesByProductId" + e)
            }
        }
        function GetScoreCardByScoreCardTemplateId(scoreCardTemplateId) {
            try {
                $http({
                    url: "/Master/GetScoreCardByScoreCardTemplateId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { scoreCardTemplateId: scoreCardTemplateId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.creditScore.listQuestions = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetScoreCardByScoreCardTemplateId" + e)
            }
        }

        function SubmitDraftCPR() {
            try {
                common.preprocessload();
                $scope.trigedSubmit = true;
                signalRService.trigedSubmit = true;
                //bindCPRBusinessProfileData();
                BindOtherWithBusinessProfile();
                $scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index] = $scope.borrowerprofile;
                if ($scope.selectedTemplate != null)
                    $scope.cprinit.financialTemplateTypeModel = $scope.selectedTemplate;
                if ($scope.listCPRBusinessSupportingPapersDetails != null) {
                    $scope.cprinit.listCPRBusinessSupportingPapersDetails = $scope.listCPRBusinessSupportingPapersDetails;
                }

                //BindStakeHolderDate(null);
                $http({
                    url: "/CPR/DraftCPR",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRModel: $scope.cprinit })
                }).then(function successCallback(response) {

                    if (response.data.success) {

                        dialogService.ConfirmDialogWithOkay('', global._draftcprmessage).then(function () {
                            //location.reload();

                            BindCPRSaveDraft(response.data.output);


                        });

                        // location.reload();

                        //SaveKeyRatios();
                        //SaveConfigurableChecklistData();
                        //SaveLimitedCompanies();

                        //  BindStakeHolderDate(null);
                        $scope.trigedSubmit = false;
                        common.preprocesshide();
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

        function reloadCurrentRoute() {
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
            });
        }

        function BindOtherWithBusinessProfile() {
            try {
                if ($scope.riskAnalysisICRRS != null) {
                    $scope.borrowerprofile.riskAnalysisICRRS = $scope.riskAnalysisICRRS;
                }
                else {
                    $scope.borrowerprofile.riskAnalysisICRRS = null;
                }
            } catch (e) {
                alert("Exception GetScoreCardGradeByTemplateAndTotalMark" + e)
            }
        }
        function SaveKeyRatios() {
            try {
                if ($scope.keyRatiosModel != null) {
                    var cprId = GetUrlParameters();
                    $scope.keyRatiosModel.cpridd = cprId;
                    $http({
                        url: "/CPR/SaveKeyRatios",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { keyRatiosModel: $scope.keyRatiosModel }
                    }).then(function successCallback(response) {
                        if (response.data.success) {

                        }
                        else {
                            common.preprocesshide();
                            $scope.trigedSubmit = false;
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                        $scope.error = response;
                    });
                }
            } catch (e) {
                common.preprocesshide();
                $scope.trigedSubmit = false;
                alert('SaveKeyRatios ' + e);
            }
        }
        function SaveLimitedCompanies() {
            try {
                if ($scope.keyRatiosModel != null) {
                    var cprId = GetUrlParameters();
                    $scope.keyRatiosModel.cpridd = cprId;
                    $http({
                        url: "/CPR/SaveLimitedCompanies",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { limitedCompaniesModel: $scope.limitedCompaniesModel }
                    }).then(function successCallback(response) {
                        if (response.data.success) {

                        }
                        else {
                            common.preprocesshide();
                            $scope.trigedSubmit = false;
                        }

                    }, function errorCallback(response) {
                        common.preprocesshide();
                        $scope.error = response;
                    });
                }
            } catch (e) {
                common.preprocesshide();
                $scope.trigedSubmit = false;
                alert('SaveLimitedCompanies ' + e);
            }
        }
        function SubmitCPRInitiation() {
            try {
                common.preprocessload();
                $scope.trigedSubmit = true;
                signalRService.trigedSubmit = true;
                if ($scope.borrowerProperties.type.type == "Applicant" || $scope.borrowerProperties.type.type == "Joint")
                    $scope.cprinit.listBorrowerProfiles[$scope.borrowerProperties.index] = $scope.borrowerprofile;

                //BindStakeHolderDate(null);
                $http({
                    url: "/CPR/CPRInitiate",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRModel: $scope.cprinit })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', global._initiatecprmessage).then(function () {
                            var cprId = GetUrlParameters();
                            window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                        });
                    } else {
                        common.preprocesshide();
                        $scope.trigedSubmit = false;
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }

                }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.trigedSubmit = false;
                    $scope.error = response;
                });
            } catch (e) {
                common.preprocesshide();
                $scope.trigedSubmit = false;
                alert('SubmitCPRInitiation ' + e);
            }
        }
        function GetLimitedCompanyByCPRId() {
            var cprId = GetUrlParameters();
            try {
                $http({
                    url: "/CPR/GetLimitedCompanyByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cprid: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        ////debugger;
                        $scope.limitedCompaniesModel = response.data.output;
                        //$scope.keyRatiosModel = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetLimitedCompanyByCPRId " + e);
            }

        }
        function SubmitCPRDataCapture() {
            try {

                if ($scope.baseRateEnable === true) {
                    $scope.cprinit.baserate = $scope.baseRate;
                }

                common.preprocessload();
                if (!$scope.cprinit.refferal) {
                    $scope.cprinit.introducer = {
                        cif: $scope.cprinit.cif,
                        name: $scope.mainApplicantName
                    };
                }


                $http({
                    url: "/CPR/DraftCPRDataCapture",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRModel: $scope.cprinit })
                }).then(function successCallback(response) {
                    //common.preprocesshide();
                    if (response.data.success) {
                        var redirectNotice = "Page will refresh shortly.";

                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', global._cprdatacapturesavemessage).then(function () {
                            window.location.href = common.cprRedirectUrl.replace("@cprno", response.data.output) + "&tab=" + 1 + "&cptype=" + 1;
                        });
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;
                });
            } catch (e) {
                common.preprocesshide();
                alert('SubmitCPRDataCapture ' + e);
            }
        }
        function UploadFA() {
            try {
                common.preprocessload();
                var faNic = "";
                var facilityType = "";
                var formdata = new FormData();
                var fileUploader = document.getElementById("faFileUploader");
                formdata.append("faFileUploader", fileUploader.files[0]);
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



                formdata.append("nic", faNic);
                formdata.append("facilitytype", facilityType);
                formdata.append("documenttype", "Financial Analysis")
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
                        dialogService.ConfirmDialogWithOkay('', global._financialanalysisuploadmessage);
                        $scope.cprinit.financialanalysis.url = response.data.output;
                        $scope.editable.view = false;
                        document.getElementById("faFileUploader").value = "";
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("UploadFA " + e);
            }
        }

        function GetCPRGroupOverviewByCPR(CPRIdstring) {
            try {
                $http({
                    url: "/CPR/GetCPRGroupOverviewByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { CPRIdstring: CPRIdstring }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.listCPRGroupOverview = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCPRGroupOverviewByCPR " + e);
            }
        }
        $scope.findProductDetails = function (item) {
            $scope.fundingtype = $filter('filter')($scope.listProducts, { name: item }, true);
            $scope.funding = $scope.fundingtype[0].funding;
        };
        function GetCPRReferenceData() {
            try {
                $http({
                    url: "/CPR/GetCPRReferenceData",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        var output = response.data.output;

                        // Bussniess

                        $scope.business = output.bussiness;

                        // $scope.listBranch = output.listlistBranch;

                        // Borrower Profile
                        var listBorrowerProfileTypes = output.borrowerProfileTypes;
                        if ($scope.cprinit.listBorrowerProfiles.length == 0) {
                            $scope.borrowerprofile.type = listBorrowerProfileTypes[0];
                            $scope.cprinit.listBorrowerProfiles.push($scope.borrowerprofile);
                        }
                        $scope.listBorrowerProfileTypes = listBorrowerProfileTypes;
                        $scope.borrowerProperties.type = $scope.listBorrowerProfileTypes[0];

                        // CPR Actions
                        $scope.listCPRActionModel = output.cprActionTypes;
                        // $scope.cprinit.cprtype = $scope.listCPRActionModel[0];
                        $scope.cprinit.cprtype = $scope.listCPRActionModel;

                        // CPR formats
                        $scope.cprformat = output.cprFormats;
                        $scope.cprinit.cprformat = $scope.cprformat[0];
                        $scope.baseRate = output.baseRate;
                        $scope.baseRateEnable = output.baseRateEnable;
                        if (output.bcUrl != null)
                            common.connectivityUrl = output.bcUrl;
                        if (output.bcType != null)
                            $scope.integrationMode = output.bcType;

                        //Waiver Types
                        $scope.listWaiverType = output.listWaiverType;

                        //Deferral Type
                        $scope.listDeferralType = output.listDeferralType;

                        $scope.loadCount++;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCPRReferenceData " + e);
            }
        }
        function GetCurrentUserBranch() {
            try {
                $http({
                    url: "/CPR/GetCurrentUserBranch",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.branch = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCurrentUserBranch " + e);
            }
        }
        function GetLegalFormsByBusinesses(businesse) {
            try {
                $http({
                    url: "/CPR/GetLegalFormsByBusinesses",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        business: businesse
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listLegalForms = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetLegalFormsByBusinesses " + e);
            }
        }
        function GetLegalFormsByBusinessesForGetCPR(businesse) {
            try {
                $http({
                    url: "/CPR/GetLegalFormsByBusinesses",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({
                        business: businesse
                    })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listLegalForms = response.data.output;

                        if ($scope.listLegalForms != null)
                            $scope.cprinit.legalform = $filter('filter')($scope.listLegalForms, { id: $scope.cprinit.legalform.id })[0];

                        if ($scope.cprinit.listBorrowerProfiles != null && $scope.cprinit.listBorrowerProfiles.length > 0) {

                            $scope.borrowerprofile = $scope.cprinit.listBorrowerProfiles[0];

                            if ($scope.borrowerprofile.personal == true)
                                $scope.mainApplicantName = $scope.borrowerprofile.individual.name;
                            else
                                $scope.mainApplicantName = $scope.borrowerprofile.stakeholder.name;

                            if ($scope.borrowerprofile.listotherLiability != null && $scope.borrowerprofile.listotherLiability.length > 0) {
                                $scope.listotherLiability = $scope.borrowerprofile.listotherLiability;
                            }
                        }
                        else {
                            if ($scope.borrowerprofile.cif == null || $scope.borrowerprofile.cif == "") {
                                $scope.borrowerprofile.cif = $scope.cprinit.cif;

                                GetBorrowerProfileByCIFUsingConnectivity($scope.cprinit.cif, true);

                                $scope.cprinit.listBorrowerProfiles.push($scope.borrowerprofile);
                            }
                        }
                        //SetRefreshView(common.GetParameterByName("tab", null), common.GetParameterByName("cptype", null));
                        common.LoderHide();
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetLegalFormsByBusinessesForGetCPR " + e);
            }
        }
        function GetCurrentUser() {
            try {
                $http({
                    url: "/PeoplePicker/GetCurrentUser",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.marketingOfficer = response.data.output;
                        // $scope.cprinit.groupController = response.data.output;
                        //$scope.cprinit.followupOfficer = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetBorrowerProfileTypes " + e);
            }
        }

        function GetCurrentUserForApproval() {

            try {
                $http({
                    url: "/PeoplePicker/GetCurrentUser",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.currentUser = response.data.output;
                        if ($scope.currentUser.userId == $scope.cprDetails.Author)
                            $scope.statusMatched = false;
                        else
                            $scope.statusMatched = true;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetBorrowerProfileTypes " + e);
            }

        }

        function GetCurrentApprovalUser() {
            try {
                $http({
                    url: "/PeoplePicker/GetCurrentUser",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.currentApprovalUser = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCurrentApprovalUser " + e);
            }
        }

        function GetEvaluatorCommentsByCPR(cPRId) {
            try {
                $http({
                    url: "/CPR/GetEvaluatorCommentsByCPR",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRId: cPRId })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.evaluationcomment = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetEvaluatorCommentsByCPR " + e);
            }
        }
        function GetCPRAndRefernceData() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPR/GetCPRAndRefernceData",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        var output = response.data.output;
                        $scope.ForCustomerType = output;
                        //if (output.cpr.business.name == 'Individual') {
                        //    $scope.borrowerprofile.personal = true;
                        //} else {
                        //    $scope.borrowerprofile.personal = false;
                        //}
                        if (output.referenceData != null) {
                            BindReferenceData(output.referenceData);
                        }

                        if (output.cpr != null) {
                            BindCPR(cprId, output.cpr);
                            UpdateNepaliDates(); //NepaliDate
                            if (output.previouscpr != null) {
                                $scope.previouscprid = output.previouscpr.id;
                                $scope.previouscprformurl = common.cprRedirectUrl.replace("@cprno", $scope.previouscprid);
                            }
                            // BindPreviousCPR($scope.previouscprid, $scope.previouscpr);
                        }
                        //BindStakeHolderDate(output);
                        sumTotalCollateralValue();
                        GetSecurityOffers();
                        //SetRefreshView(common.GetParameterByName("tab", null), common.GetParameterByName("cptype", null));
                        common.preprocesshide();
                        common.LoderHide();
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetCPRAndRefernceData " + e);
            }
        }
        $scope.debtBurdenRatio = {
            id: 0,
            cPRId: 0,
            totalEMI: 0,
            totalIncome: 0,
            burdenRatio: 0,
            active: true
        }
        function GetAnalysisData() {
            try {
                GetKeyRatioList();
                GetDebtBurdenRatio();
            }
            catch (ex) {
                alert("Exception in GetAnalysisData " + ex);
            }
        }

        $scope.CalculateRepaymentTotalDebts_ClickEvent = function () {
            try {
                $scope.cprinit.repayment.calculationdebt = parseFloat($scope.cprinit.repayment.umi) / parseFloat($scope.cprinit.repayment.totaldebt) * 100
            }
            catch (ex) {
                alert("Exception in CalculateRepaymentTotalDebts_ClickEvent " + ex);
            }
        }

        $scope.CalculateRepaymentEquatedMonthlyInstallment_ClickEvent = function () {
            try {
                $scope.cprinit.repayment.calculationinstallment = parseFloat($scope.cprinit.repayment.umi) / parseFloat($scope.cprinit.repayment.monthlyinstallment) * 100
            }
            catch (ex) {
                alert("Exception in CalculateRepaymentEquatedMonthlyInstallment_ClickEvent " + ex);
            }
        }

        $scope.CalculateRepaymentAnnualTotalInterest_ClickEvent = function () {
            try {
                $scope.cprinit.repayment.calculationinterest = (parseFloat($scope.cprinit.repayment.umi) * 12) / parseFloat($scope.cprinit.repayment.totalinterest) * 100
            }
            catch (ex) {
                alert("Exception in CalculateRepaymentAnnualTotalInterest_ClickEvent " + ex);
            }
        }


        $scope.CalculateDebtBurdenRation_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.individual !== null) {
                    //$scope.debtBurdenRatio.totalIncome = $scope.GetTotalUMI($scope.GetTotalDSCR($scope.borrowerprofile.listMonthlyIncome), $scope.GetTotalDSCR($scope.borrowerprofile.listMonthlyExpenditure));//$scope.cprinit.repayment.umi;
                    //if (($scope.debtBurdenRatio.totalEMI > 0) && (parseFloat($scope.debtBurdenRatio.totalIncome) > 0)) {
                    //    $scope.debtBurdenRatio.burdenRatio = ($scope.debtBurdenRatio.totalEMI / parseFloat($scope.debtBurdenRatio.totalIncome));
                    //}                  
                    //else {
                    //    $scope.debtBurdenRatio.burdenRatio = 0;
                    //}


                    $scope.cprinit.debtBurdenRatio.totalIncome = $scope.monthlyincome.total;
                    // $scope.debtBurdenRatio.totalIncome = $scope.GetTotalUMI($scope.GetTotalDSCR($scope.borrowerprofile.listMonthlyIncome), $scope.GetTotalDSCR($scope.borrowerprofile.listMonthlyExpenditure));//$scope.cprinit.repayment.umi;
                    $scope.cprinit.debtBurdenRatio.totalExpense = $scope.monthlyexpenditure.total;
                    if (($scope.cprinit.debtBurdenRatio.totalExpense > 0) && (parseFloat($scope.cprinit.debtBurdenRatio.totalIncome) > 0)) {
                        $scope.cprinit.debtBurdenRatio.burdenRatio = ($scope.cprinit.debtBurdenRatio.totalExpense / parseFloat($scope.cprinit.debtBurdenRatio.totalIncome)) * 100;
                    }
                    else {
                        $scope.cprinit.debtBurdenRatio.burdenRatio = 0;
                    }

                }
                else if ($scope.borrowerprofile.stakeholder !== null) {
                    //if (($scope.debtBurdenRatio.totalEMI > 0) && (parseFloat($scope.debtBurdenRatio.totalIncome) > 0)) {
                    //    $scope.debtBurdenRatio.burdenRatio = ($scope.debtBurdenRatio.totalEMI / parseFloat($scope.debtBurdenRatio.totalIncome));

                    //}
                    //else {
                    //    $scope.debtBurdenRatio.burdenRatio = 0;
                    //}
                    if (($scope.cprinit.debtBurdenRatio.totalEMI > 0) && (parseFloat($scope.cprinit.debtBurdenRatio.totalIncome) > 0)) {
                        $scope.cprinit.debtBurdenRatio.burdenRatio = ($scope.cprinit.debtBurdenRatio.totalEMI / parseFloat($scope.cprinit.debtBurdenRatio.totalIncome)) * 100;

                    }
                    else {
                        $scope.cprinit.debtBurdenRatio.burdenRatio = 0;
                    }
                }
            } catch (ex) {
                alert("Exception in CalculateDebtBurdenRation_ClickEvent " + ex);
            }
        };

        $scope.totalprojectedValue = 0;
        $scope.cprinit.cPRDebtEquityRatio.proposedFinance = 0;
        $scope.cprinit.cPRDebtEquityRatio.projectedEquity = 0;

        $scope.debtEquityRatio = 0;
        $scope.CalDebtEquityRatio = function () {
            try {
                if ($scope.cprinit.cPRDebtEquityRatio !== null) {
                    if (parseFloat($scope.cprinit.cPRDebtEquityRatio.proposedFinance) > 0 && parseFloat($scope.totalprojectedValue) > 0 && $scope.borrowerprofile.individual !== null) {

                        $scope.debtEquityRatio = parseFloat($scope.cprinit.cPRDebtEquityRatio.proposedFinance) / parseFloat($scope.totalprojectedValue);
                    }
                    else {
                        $scope.debtEquityRatio = 0;
                    }
                }
            } catch (ex) {
                alert("Exception in CalDebtEquityRatio " + ex);
            }
        };
        $scope.CheckAgeValidity_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.individual.age > 150) {
                    dialogService.ConfirmDialogWithOkay('', "Please enter a valid age!");
                    $scope.borrowerprofile.individual.age = 0;
                }

            }
            catch (ex) {
                alert("Exception in CheckAgeValidity_ClickEvent " + ex);
            }
        };

        function GetKeyRatioList() {
            var cprId = GetUrlParameters();
            try {
                $http({
                    url: "/CPR/GetKeyRatioListByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {

                        $scope.keyRatiosModel = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetKeyRatioList " + e);
            }
        }
        $scope.cPRWorkingCapitalModel = {
            currentYear: 0,
            projectedYear: 0,
            cPRWorkingCapitalMasterModelList: []
        };
        $scope.cPRWorkingCapitalDetailsMapping = {
            id: 0,
            cPRId: 0,
            workingCapitalId: 0,
            currentYear: 0,
            projectedYear: 0,
            workingCapitalDetailsList: null
        };
        $scope.workingcaptialmasterList = [];

        function GetAllCPRWorkingCapitalMaster() {

            try {
                $http({
                    url: "/Master/GetAllCPRWorkingCapitalMasterCPR",

                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        // //debugger;
                        $scope.workingcaptialmasterList = response.data.output;

                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetAllRegion: " + e);
            }
        }
        $scope.workingcapitalCurrentYear = 0;
        $scope.workingcapitalProjectYear = 0;

        function SaveCPRWorkingCapitalMaster() {

            try {
                // //debugger;
                $scope.cPRWorkingCapitalModel = {
                    currentYear: $scope.workingcapitalCurrentYear,
                    projectedYear: $scope.workingcapitalProjectYear,
                    cPRWorkingCapitalMasterModelList: $scope.workingcaptialmasterList,
                    cPRWorkingCapitalDetailsModelList: $scope.cPRWorkingCapitalDetailsModelList
                }
                $http({
                    // url: "/CPR/SaveCPRWorkingCapitalDetails",
                    url: "/Master/GetAllCPRWorkingCapitalMasterCPR",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRWorkingCapitalModel: $scope.cPRWorkingCapitalModel }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        //debugger;
                        $scope.workingcaptialmasterList = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (e) {
                alert("Exception GetAllRegion: " + e);
            }
        }
        function GetInvestmentInBusinessByCPRId() {
            var cprId = GetUrlParameters();
            try {
                $http({
                    url: "/CPR/GetInvestmentInBusinessByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.cprinit.investmentInBusinessModel = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetInvestmentInBusinessByCPRId " + e);
            }
        }
        function GetDebtBurdenRatio() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPR/GetDebtBurdenRatioByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.debtBurdenRatio = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetDebtBurdenRatio " + e);
            }
        }


        $scope.DeleteCashFlowData_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = $scope.borrowerprofile.cashFlowAnalysis.cashFlowAnalysisTypeDetailsList.indexOf(item);
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete Activity Type?").then(function (answer) {
                        if (answer) {
                            $scope.borrowerprofile.cashFlowAnalysis.cashFlowAnalysisTypeDetailsList[index].active = false;
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    })
                }
            }
            catch (ex) {
                alert("Exception in DeleteCashFlowData_ClickEvent " + ex);
            }
        }

        $scope.RemoveCashFlow_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = list.indexOf(item);

                    if ((list[index].cashFlowCurrentYear !== null && list[index].cashFlowCurrentYear !== undefined && list[index].cashFlowCurrentYear !== "") || (list[index].cashFlowProjectYear !== null && list[index].cashFlowProjectYear !== undefined && list[index].cashFlowProjectYear !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data?").then(function (answer) {
                            if (answer) {
                                //list[index].active = false;
                                list[index].cashFlowCurrentYear = 0;
                                list[index].cashFlowProjectYear = 0;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        })
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.typeName)
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveCashFlow_ClickEvent " + ex);
            }
        }

        $scope.RemoveFinancialPerformance_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = list.indexOf(item);

                    if ((list[index].valueYear1 !== null && list[index].valueYear1 !== undefined && list[index].valueYear1 !== "") && (list[index].valueYear2 !== null && list[index].valueYear2 !== undefined && list[index].valueYear2 !== "") && (list[index].valueYear3 !== null && list[index].valueYear3 !== undefined && list[index].valueYear3 !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data?").then(function (answer) {
                            if (answer) {
                                //list[index].active = false;
                                list[index].valueYear1 = 0;
                                list[index].valueYear2 = 0;
                                list[index].valueYear3 = 0;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        })
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.businessPerformanceItem.name)
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveFinancialPerformance_ClickEvent " + ex);
            }
        }

        $scope.AddRationType_ClickEvent = function (keyratioItem) {
            try {
                if ($scope.keyRatioItemModel.type != null && $scope.keyRatioItemModel.type != undefined && $scope.keyRatioItemModel.type != "") {
                    AddKeyRatioItem(keyratioItem);
                }
            }
            catch (ex) {
                alert("Exception in AddRationType_ClickEvent " + ex);
            }
        }

        function ResetKeyratioitemModel() {
            try {
                $scope.keyRatioItemModel = {
                    id: 0,
                    cPRId: 0,
                    type: null,
                    active: true
                }
            }
            catch (ex) {
                alert("Exception in ResetKeyratioitemModel " + ex);
            }
        }

        $scope.RemoveDataKeyRatios_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = list.indexOf(item);

                    if ((list[index].currentYearValue !== null && list[index].currentYearValue !== undefined && list[index].currentYearValue !== "") || (list[index].projectYearValue !== null && list[index].projectYearValue !== undefined && list[index].projectYearValue !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data for - " + item.typeName).then(function (answer) {
                            if (answer) {
                                list[index].currentYearValue = 0;
                                list[index].projectYearValue = 0;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        })
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.keyRatioItem.type)
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveDataKeyRatios_ClickEvent " + ex);
            }
        }


        function AddKeyRatioItem(keyratioItem) {
            try {
                var cprId = GetUrlParameters();
                common.preprocessload();
                $scope.keyRatioItemModel.cPRId = cprId;
                $http({
                    url: "/CPR/SaveKeyRatioItem",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { keyRatioItemModel: $scope.keyRatioItemModel }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        var data = response.data.output;
                        $scope.keyRatiosModel.keyRatioInputTypeModelList.push(data)
                        common.preprocesshide();
                        ResetkeyRatioItemModel();
                    }
                    common.preprocesshide();
                }, function errorCallback(response) {
                    $scope.error = response;
                    common.preprocesshide();
                });
            } catch (e) {
                alert("AddKeyRatioItem " + e);
                common.preprocesshide();
            }
        }

        function ResetkeyRatioItemModel() {
            try {
                $scope.keyRatioItemModel = {
                    id: 0,
                    cPRId: 0,
                    type: null,
                    active: true
                }
            }
            catch (ex) {
                alert("Exception in ResetkeyRatioItemModel" + ex)
            }
        }


        function GetAllCPRDetailsByCIF(cifnumber) {
            try {
                $http({
                    url: "/CPR/GetAllCPRByCIF",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cifnumber: cifnumber }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCPRInfo = response.data.output;
                        common.LoderHide();
                    }
                }, function errorCallback(response) {
                    $scope.err = response;

                    common.LoderHide();
                });

            } catch (e) {
                alert("Exception GetAllCPRByCIF: " + e);
                common.LoderHide();
            }
        }
        function GetAllCPRDetailsByCIFWithReiniated(cifnumber) {
            try {
                $http({
                    url: "/CPR/GetAllCPRByCIFWithReinitiated",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cifnumber: cifnumber }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCPRInfo = response.data.output;
                        common.LoderHide();
                    }
                }, function errorCallback(response) {
                    $scope.err = response;

                    common.LoderHide();
                });

            } catch (e) {
                alert("Exception GetAllCPRByCIF: " + e);
                common.LoderHide();
            }
        }
        function GetAllRelationships() {
            try {
                $http({
                    url: "/CPR/GetFamilyRelationshipList",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.familyRelationshipList = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetAllFamilyRelationships" + e);
            }
        }

        $scope.AddActivityType_ClickEvent = function (item) {
            try {
                if ($scope.cashFlowActivityType.name != null && $scope.cashFlowActivityType.name != undefined && $scope.cashFlowActivityType.name != "") {
                    SaveCashFlowActivityType();
                }
            }
            catch (ex) {
                alert("Exception in AddActivityType_ClickEvent " + ex);
            }
        }

        $scope.cashFlowAnalysisTypeDetailsModel = {
            id: 0,
            cashFlowAnalysisId: 0,
            cashFlowCurrentYear: 0,
            cashFlowProjectYear: 0,
            cashFlowActivityTypeModel: null,
            active: true
        };
        function SaveCashFlowActivityType() {
            try {
                common.preprocessload();
                if ($scope.borrowerprofile != null) {
                    $scope.cashFlowActivityType.borrowerId = parseInt($scope.borrowerprofile.id);

                    $http({
                        url: "/CPR/SaveCashFlowActivityType",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { cashFlowActivityType: $scope.cashFlowActivityType }
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            if (response.data.output != null) {
                                $scope.cashFlowActivityTypeNew = response.data.output;
                                $scope.borrowerprofile.cashFlowAnalysis.cashFlowAnalysisTypeDetailsList.push($scope.cashFlowActivityTypeNew);
                                $scope.cashFlowActivityTypeNew = null;
                                //$scope.cashFlowAnalysisTypeDetailsModel = {
                                //    id: 0,
                                //    cashFlowAnalysisId: 0,
                                //    cashFlowCurrentYear: 0,
                                //    cashFlowProjectYear: 0,
                                //    cashFlowActivityTypeModel: $scope.cashFlowActivityTypeNew,
                                //    active: true
                                //}
                                //for (var i = 0; i < $scope.cprinit.listBorrowerProfiles.length; i++) {
                                //    $scope.cprinit.listBorrowerProfiles[i].cashFlowAnalysis.cashFlowAnalysisTypeDetailsList.push($scope.cashFlowAnalysisTypeDetailsModel);
                                //}
                                //$scope.borrowerprofile.cashFlowAnalysis.cashFlowAnalysisTypeDetailsList.push($scope.cashFlowAnalysisTypeDetailsModel);
                            }
                            ResetCashFlowActivityType();
                            common.preprocesshide();
                        }
                        common.preprocesshide();
                    }, function errorCallback(response) {
                        $scope.error = response;
                        common.preprocesshide();
                    });
                }
                common.preprocesshide();
            } catch (e) {
                alert("Exception SaveCashFlowActivityType " + e);
                common.preprocesshide();
            }
        }
        function ResetCashFlowActivityType() {
            try {
                $scope.cashFlowActivityType = {
                    id: 0,
                    name: null,
                    active: true
                }
                $scope.cashFlowAnalysisTypeDetailsModel = {
                    id: 0,
                    cashFlowAnalysisId: 0,
                    cashFlowCurrentYear: 0,
                    cashFlowProjectYear: 0,
                    cashFlowActivityTypeModel: null,
                    active: true
                }
            }
            catch (ex) {
                alert("Exception in ResetCashFlowActivityType " + ex);
            }
        }

        function GetAllAddressType() {
            try {
                $http({
                    url: "/CPR/GetAllAddressType",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.addressTypelist = response.data.output;
                        //console.log($scope.addressTypelist);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetAllAddressType " + e);
            }
        }

        $scope.customCheclistTemplate = null;

        function GetCustomChecklistByCPRId() {
            try {
                var productid = 0;
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPR/GetCustomChecklistByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.customCheclistTemplate = response.data.output;
                        //console.log($scope.addressTypelist);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception customCheclistTemplate " + e);
            }
        }

        $scope.configTemplateAnswers = [];
        $scope.configTemplate = [];
        $scope.templateQuestion = [];
        $scope.questionElement = [];
        $scope.answerselement = null;
        function CreateChecklist() {
            //   console.log($scope.customCheclistTemplateList);
            try {
                if ($scope.customCheclistTemplateList != null && $scope.customCheclistTemplateList.length != 0) {
                    //debugger;
                    for (var k = 0; k < $scope.customCheclistTemplateList.length; k++) {
                        var template = $scope.customCheclistTemplateList[k];
                        var templateObject = {
                            title: template.name,
                            comments: template.comments,
                            cPRId: GetUrlParameters(),
                            id: template.id,
                            content: []
                        };

                        var templateContent = "<div class='testing'><h3>" + template.name + "</h3>";

                        for (var i = 0; i < template.configurableChecklistInputType.length; i++) {
                            var question = template.configurableChecklistInputType[i];

                            $scope.answerArr = [];

                            for (var j = 0; j < $scope.customCheclistTemplateList[k].configurableChecklistInputType[i].configCheckListItemList.length; j++) {

                                templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";

                                var ans = {
                                    id: question.configCheckListItemList[j].id,
                                    result: null,
                                }
                                $scope.answerArr.push(ans);
                                var ans = {
                                    id: 0,
                                    result: false,
                                }
                                //var jsonval = JSON.parse(question.configCheckListItemList[j].tag);
                                //templateContent = templateContent + "<div>" + question.configCheckListItemList[j].tag + question.configCheckListItemList[j].name + "</div>";
                            }
                            var questionObject = {
                                id: question.id,
                                title: question.description,
                                answers: $scope.answerArr
                            };
                            templateObject.content.push(questionObject);
                            templateContent = templateContent + "<h4>" + question.description + "</h4>";
                        }
                        $scope.configTemplate.push(templateObject);
                        templateContent = templateContent + "</div>";
                        $('#renderList').append(templateContent);

                    }

                    for (var g = 0; g < $scope.customCheclistTemplateList.length; g++) {
                        var template = $scope.configTemplate[g];

                        for (var h = 0; h < $scope.customCheclistTemplateList[g].configurableChecklistInputType.length; h++) {

                            var content = $scope.configTemplate[g].content[h];

                            for (var n = 0; n < $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList.length; n++) {



                                var data = $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n];
                                var answer = data.answer;
                                var ngmodel = data.ngModel;
                                data.value = {
                                    ngmodel: answer
                                };
                                $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value = [];
                                $scope.customCheclistTemplateList[g].configurableChecklistInputType[h].configCheckListItemList[n].value[ngmodel] = answer;

                                var answer2 = $scope.configTemplate[g].content[h].answers[n];
                                $scope.configTemplate[g].content[h].answers[n].result = answer;
                            }
                        }
                    }
                }
                //console.log("configTemplate "+$scope.configTemplate);
                //console.log("customCheclistTemplateList " +$scope.customCheclistTemplateList);
            }
            catch (ex) {
                alert("Exception in CreateChecklist " + ex);
            }
        }

        $scope.statuses = { "Ben": true, "Nate": true, "Austin": false };

        $scope.SetCommentsConfigurableChecklist_ClickEvent = function (list, item, comments) {
            try {
                var templateIndex = $scope.customCheclistTemplateList.indexOf(item);
                var tempId = $scope.customCheclistTemplateList[templateIndex].id;

                var templateDetails = $filter('filter')($scope.configTemplate, { id: tempId })[0];
                var indexNewMain = $scope.configTemplate.indexOf(templateDetails);
                $scope.configTemplate[indexNewMain].comments = comments

                var index = list.indexOf(item);
                list[index].comments = comments;
            }
            catch (ex) {
                alert("Exception in SetCommentsConfigurableChecklist_ClickEvent " + ex);
            }
        }

        $scope.SetConfigurableChecklistDataCollectionSelectedAnswerRadioButton_DrawEvent = function (list, type, value) {
            try {

                //$scope.selectedAnswerConfigChecklist = false;
            } catch (e) {
                alert("Exception SetConfigurableChecklistDataCollectionSelectedAnswerRadioButton_DrawEvent " + e);
            }
        };


        $scope.checkbox123456checkbox = "test";


        $scope.permissions = {
            admission: {
                create: false,
                delete: false,
                read: false,
                update: false
            },
            student: {
                forDelete: false,
                read: false,
                viewPhone: true
            },
            course: {
                create: true,
                delete: false,
                read: false,
                update: false
            },
            teacher: {
                create: false,
                read: false,
                contact: false
            }
        };

        $scope.AddPostal_ClickEvent = function (item, postal) {
            try {
                //var detailsLength = $scope.addressDetailsList.length;

                //for (var i = 0; i < detailsLength; i++) {
                //    $scope.addressDetailsList[i].postal = false;
                //}
                ////var request = $filter('filter')($scope.addressDetailsList, { addressType: { type: item.addressType.type, active: true } }, true);

                //var index = $scope.addressDetailsList.indexOf(item);
                //$scope.addressDetailsList[index].postal = true;
                //request.postal = true;
            }
            catch (ex) {
                alert("Exception in AddPostal_ClickEvent " + ex);
            }
        }

        function ResetAddressDetails() {
            $scope.addressDetails = {
                id: 0,
                address: null,
                distance: null,
                cPRClientProfileId: 0,
                addressType: null,
                postal: false,
                active: true
            }
            $scope.addressType = null;

            $scope.form.stakeholderAddressDetaails.$setPristine();
            $scope.form.stakeholderAddressDetaails.$setUntouched();
        }

        $scope.AddAddress_ClickEvent = function () {
            try {
                AddAddressDetailsToList();
            }
            catch (ex) {
                alert("Exception in AddAddress_ClickEvent " + ex);
            }
        }

        $scope.pastTrackOptions = false;
        $scope.pastTrackOptions_ChangeEvent = function () {
            try {
                if ($scope.pastTrackOptions == true) {
                    $scope.pastTrackOptions = true;
                }
                else {
                    $scope.pastTrackOptions = false;
                }
            }
            catch (ex) {
                alert("Exception in pastTrackOptions_ChangeEvent " + ex);
            }
        }

        $scope.EditAddressType_Clickevent = function (item) {
            try {
                if ($scope.addressDetails.address === null && $scope.addressDetails.distance === null) {
                    var index = $scope.borrowerprofile.stakeholder.addressDetailsList.indexOf(item);
                    $scope.addressDetails = item;
                    //$scope.addressType = item.addressType;
                    //var result = $filter('filter')($scope.addressTypelist, { addressType: { id: item.addressType.id, active: true } });
                    //$scope.borrowerprofile.stakeholder.addressDetailsList[index].active = false;
                    $scope.borrowerprofile.stakeholder.addressDetailsList.splice(index, 1);
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Please add the remaining data to the grid before editing a new record!");
                }
            }
            catch (ex) {
                alert("Exception in EditAddressType_Clickevent " + ex)
            }
        }

        $scope.RemoveAddressType_ClickEvent = function (item) {
            try {
                dialogService.ConfirmDialogWithYesNo('', "Do you want to delete this record?").then(function () {
                    var index = $scope.borrowerprofile.stakeholder.addressDetailsList.indexOf(item);
                    $scope.borrowerprofile.stakeholder.addressDetailsList[index].active = false;
                });
                //var index = $scope.addressDetailsList.indexOf(item);
                //$scope.addressDetailsList[index].active = false;
                //$scope.addressDetailsList.splice(index, 1);
            }
            catch (ex) {
                alert("Exception in RemoveAddressType_ClickEvent " + ex);
            }
        }
        function AddAddressDetailsToList() {
            if ($scope.borrowerprofile.stakeholder != null || $scope.borrowerprofile.stakeholder != undefined) {
                if ($scope.borrowerprofile.stakeholder.addressDetailsList == null || $scope.borrowerprofile.stakeholder.addressDetailsList == undefined) {
                    $scope.borrowerprofile.stakeholder.addressDetailsList = [];
                }
            }
            if ($scope.addressDetails.addressType.id !== 0) {
                // $scope.addressDetails.active = true;
                var request = $filter('filter')($scope.borrowerprofile.stakeholder.addressDetailsList, { addressType: { type: $scope.addressDetails.addressType.type, active: true }, active: true }, true);
                if (request.length == 0) {
                    $scope.borrowerprofile.stakeholder.addressDetailsList.push($scope.addressDetails);
                    ResetAddressDetails();
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "This " + $scope.addressDetails.addressType.type + " - address type exists in the list, add a different address type !");
                }
            }
            if ($scope.borrowerprofile.stakeholder.addressDetailsList.length != 0) {
                var length = $scope.borrowerprofile.stakeholder.addressDetailsList.length;
                $scope.borrowerprofile.stakeholder.addressDetailsList[0].postal = Boolean("true");;
            }
        }
        $scope.ResetAddress_ClickEvent = function () {
            try {
                ResetAddressDetails();
            }
            catch (ex) {
                alert("Exception in ResetAddress_ClickEvent " + ex);
            }
        }
        function GetLimitedCompanyAnalysisByCPRId() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPR/GetLimitedCompanyAnalysisByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.limitedCompany = response.data.output;
                        //  console.log($scope.itemTypeList);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetItemTypesForLTD " + e);
            }
        }
        $scope.AddItemType_ClickEvent = function (itemType) {
            try {
                if ($scope.itemType.name != null && $scope.itemType.name != undefined && $scope.itemType.name != "") {
                    AddItemType();
                }
            }
            catch (ex) {
                alert("Exception in AddItemType_ClickEvent " + ex);
            }
        }

        function AddItemType() {
            try {
                if ($scope.itemType != null) {
                    common.preprocessload();
                    var cprId = GetUrlParameters();
                    $scope.itemType.cpridd = cprId;
                    $http({
                        url: "/CPR/AddLimitedCompanyItemType",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { itemType: $scope.itemType }
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            var data = response.data.output;
                            $scope.limitedCompanyAnalysisModel = {
                                id: data.id,
                                currentYearFunds: 0,
                                projectYearFunds: 0,
                                typeName: data.name,
                                seperateType: true,
                                limitedCompanyItemType: null,
                                active: true
                            }
                            $scope.limitedCompaniesModel.limitedCompanyAnalysisList.push($scope.limitedCompanyAnalysisModel);
                            ResetLimitedCompanyAnalysisModel();
                            common.preprocesshide();
                        }
                        common.preprocesshide();
                    }, function errorCallback(response) {
                        $scope.error = response;
                        common.preprocesshide();
                    });
                }
            } catch (e) {
                alert("Exception AddItemType " + e);
                common.preprocesshide();
            }
        }

        function ResetLimitedCompanyAnalysisModel() {
            $scope.limitedCompanyAnalysisModel = {
                id: 0,
                currentYearFunds: 0,
                projectYearFunds: 0,
                typeName: null,
                seperateType: false,
                limitedCompanyItemType: null,
                active: true
            }
            $scope.itemType = {
                id: 0,
                cpridd: null,
                name: null,
                active: true
            }
        }

        function GetAllAnalysisTypeWithData() {
            try {
                $http({
                    url: "/CPR/GetFamilyRelationshipList",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.familyRelationshipList = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetAllFamilyRelationships" + e);
            }
        }

        function GetCodeSectorData() {
            try {
                $http({
                    url: "/CPR/GetCodeSectorData",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.codeSectorViewModel = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCodeSectorData" + e);
            }
        }

        function ValidateGenerateFacility(facility) {
            try {
                var title = "Please Calculate Trial Schedule in Trial Calculation.";
                if (facility.amountrequest == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Facility Amount");
                    return false;
                }
                else if (facility.interestrate == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Facility Interest Rate");
                    return false;
                }
                else if (facility.tenour == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Facility Total Term Months");
                    return false;
                }
                else if (facility.trialCalculation.noOfPaymentPerYear == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "No of Payment Per Year");
                    return false;
                }
                else if (facility.trialCalculation.startDate == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Start Date");
                    return false;
                }
                else if (facility.trialCalculation.extraPayment == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Extra Payment");
                    return false;
                }
                else if (facility.trialCalculation.payterm.id == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Select Pay Term");
                    return false;
                }
                else if (facility.trialCalculation.loantype == null) {
                    var dialog = dialogService.ConfirmDialogWithOkay(title, "Select Loan Type");
                    return false;
                }
                else {
                    return true;
                }
            } catch (e) {

            }
        }

        function ConvertDateTypes(list) {
            for (var i = 0; i < list.length; i++) {
                list[i].created = Date(list[i].created);
                $scope.insuranceCoverDetailsList[i].created = list[i].created;
            }
        }

        //// Start ---- Integration Functions
        $scope.searchCriteriaType = 'CIF';
        $scope.searchCriteria = "";
        $scope.listSearchCustomer = [];

        function GetFacilitiesByCIFUsingConnectivity(cif) {
            try {
                var req = {
                    method: 'POST',
                    url: common.connectivityUrl + '/api/Facility?cif=' + cif,
                    headers: {
                        "Content-Type": undefined
                    },
                    data: {}
                };
                $http(req).then(function successCallback(response) {
                    if (response.data.success) {
                        var resultfacilities = response.data.output;
                        $scope.cprinit.listExisitingCPRFacilities = resultfacilities.listCPRFacilities;
                        //console(log);
                        //var loans = response.data.output.loans;

                        //angular.forEach(resultfacilities.bankAccounts, function (val) {
                        //    $scope.borrowerprofile.listBankaccountdetails.push({
                        //        id: null,
                        //        name: val.name,
                        //        branchname: val.branch,
                        //        accountnumber: val.accountNo,
                        //        accounttype: val.type,
                        //        currentbalance: val.balance,
                        //        isExisting: true,
                        //        active: true
                        //    });
                        //});

                        angular.forEach(resultfacilities.listCPRFacilities, function (val1) {
                            $scope.borrowerprofile.listLiabilities.push({
                                id: null,
                                typeOfFacility: val1.facilitytype,
                                facilityAmount: val1.amountrequest,
                                monthlyInstallement: val1.tenour.totalTermMonths,
                                amountOutstanding: val1.interestrate,
                                security: val1.product.name,
                                interestrate: val1.interestrate,
                                //new field
                                funding: val1.product.funding,
                                repaymentmethod: val1.repaymentmethod,
                                eOL: val1.eOL,
                                overdue: val1.overdue,
                                expiry: val1.expiry,
                                remark: val1.remark,
                                facilityOption: val1.facilityOption,
                                accountNumber: val1.accountNumber,
                                active: true
                            });
                        });
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetFacilitiesByCIFUsingConnectivity " + e);
            }
        }

        function GetGroupOverviewByBankCustomerIdUsingConnectivity(bankid) {
            try {
                var req = {
                    method: 'POST',
                    url: common.connectivityUrl + '/api/GroupOverview?bankid=' + bankid,
                    headers: {
                        "Content-Type": undefined
                    },
                    data: {}
                };
                $http(req).then(function successCallback(response) {
                    if (response.data.success) {
                        var resultGroupOverview = response.data.output;
                        $scope.cprinit.listCPRGroupOverview = resultGroupOverview;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("GetGroupOverviewByBankCustomerIdUsingConnectivity " + e);
            }
        }
        //// End ---- Integration Functions


        ///.................................................................................................Events

        $scope.EditItemFromlistTaxInformation_ClickEvent = function (list, item) {
            try {
                $scope.taxinformation = item;

                if (item.taxclearancecertificationdate != null) {
                    $scope.ADtoBS(item.taxclearancecertificationdate, 'taxinformation.taxclearancecertificationdate_np');
                }

                if (list != null)
                    common.RemoveItemFromList(list, item, false);

            } catch (e) {
                alert("EditItemFromlistTaxInformation_ClickEvent Error: " + e);
            }
        };

        $scope.ResetFeeType_ClickEvent = function () {
            ResetFeeType();
        };
        $scope.CustomerSegment_ChangeEvent = function (business) {
            try {
                CustomerSegmentChange(business);
                $scope.filterDivisionBySegment(business.id);
            } catch (e) {
                alert("CustomerSegment_ChangeEvent " + e);
            }
        };
        $scope.StampDutyCalculation_ChangeEvent = function (item) {
            try {
                StampDutyCalculation(item);
            } catch (e) {
                alert("StampDutyCalculation_ChangeEvent " + e);
            }
        };
        $scope.GenerateFee_ChangeEvent = function (list, item, facility) {
            try {
                GenerateFee(list, item, facility);
            } catch (e) {
                alert("GenerateFee_ChangeEvent " + e);
            }
        };
        $scope.GenerateAmortization_ChangeEvent = function (list, item, facility) {
            try {
                GenerateAmortization(list, item, facility);
            } catch (e) {
                alert("GenerateAmortization_ChangeEvent " + e);
            }
        };
        $scope.ResetAmortization_ChangeEvent = function (list, item, facility) {
            try {
                ResetAmortization(list, item, facility);
            } catch (e) {
                alert("ResetAmortization_ChangeEvent " + e);
            }
        };
        $scope.AddTaxInformation_ClickEvent = function (taxinformation) {
            try {
                if ($scope.cprinit.listTaxInformation == null)
                    $scope.cprinit.listTaxInformation = [];
                $scope.taxinformation.active = true;
                $scope.cprinit.listTaxInformation.push(taxinformation);
                ResetTaxInformation();
            } catch (e) {
                alert("AddTaxInformation_ClickEvent Error: " + e);
            }
        };


        $scope.AddMonthlyIncome_ClickEvent = function () {
            try {
                $scope.monthlyincome.active = true;
                $scope.borrowerprofile.listMonthlyIncome.push($scope.monthlyincome);
                $scope.monthlyincome = {
                    id: '',
                    type: '',
                    amount: 0,
                    isDSCR: false,
                    active: true
                };
                // ResetMonthlyIncome();
                $('#addincomemodal').modal('toggle');
            } catch (e) {
                alert("AddMonthlyIncome_ClickEvent Error: " + e);
            }
        };
        $scope.AddFeeType_ClickEvent = function (feeType, item) {
            try {
                feeType.isApply = false;
                feeType.amortize = false;
                feeType.amortizedInterest = 0;
                feeType.recurringFee = 0;
                feeType.active = true;
                var index = $scope.cprinit.listCPRFacilities.indexOf(item);
                $scope.cprinit.listCPRFacilities[index].trialCalculation.listTrialAmortization.push(feeType);
                ResetFeeType();
            } catch (e) {
                alert("AddFeeType_ClickEvent Error: " + e);
            }
        }
        $scope.AddCostEstimation_ClickEvent = function () {
            try {
                var presentLengthCostEstimation = $scope.cprinit.listcPRCostEstimationModel.length;

                var CountCostEstimation = $scope.lengthOfCostEstimationList + 1;
                if (presentLengthCostEstimation > 0)
                    $scope.checkStatus = $scope.cprinit.listcPRCostEstimationModel[presentLengthCostEstimation - 1].TypeOfCost;
                if ((presentLengthCostEstimation !== null && presentLengthCostEstimation !== undefined) && (CountCostEstimation !== null && CountCostEstimation !== undefined)) {
                    if (presentLengthCostEstimation < CountCostEstimation || $scope.checkStatus !== null) {
                        $scope.cprinit.listcPRCostEstimationModel.push($scope.cPRCostEstimationModel);
                        ResetCostEstimation();
                        CountCostEstimation++;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', global._addAtleasttheTypeOfCost);
                    }
                }
            }
            catch (e) {
                alert("AddCostEstimation_ClickEvent Error: " + e);
            }
        };
        $scope.RemoveCostEstimation_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null) {
                        if (confirm("Are you sure you want to delete ?") == true) {
                            var index = $scope.cprinit.listcPRCostEstimationModel.indexOf(item);
                            $scope.cprinit.listcPRCostEstimationModel[index].Active = false;
                        }
                    }
                }
            } catch (e) {
                alert("Exception RemoveCostEstimation_ClickEvent" + e);
            }
        };

        $scope.AddCRIBAnalysis_ClickEvent = function (item) {
            try {

                if ($scope.cribanalysis.name != null && $scope.cribanalysis.name != "" && $scope.cribanalysis.status != null && $scope.cribanalysis.status != "") {
                    $scope.cribanalysis.active = true;
                    $scope.cprinit.listCRIBAnalysis.push($scope.cribanalysis);
                    ResetCribAnalysis();
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', global._fillrequiredfieldsmessage);
                }

            } catch (e) {
                alert("AddCRIBAnalysis_ClickEvent Error: " + e);
            }
        };
        $scope.AddSlabDetails_ClickEvent = function (facility) {

            try {

                var index = $scope.cprinit.listCPRFacilities.indexOf(facility);
                var slap = {
                    id: '',
                    months: facility.trialCalculation.slap.months,
                    payment: facility.trialCalculation.slap.payment
                };

                if ($scope.cprinit.listCPRFacilities[index].trialCalculation.listTrialSlabDetail == null)
                    $scope.cprinit.listCPRFacilities[index].trialCalculation.listTrialSlabDetail = [];

                $scope.cprinit.listCPRFacilities[index].trialCalculation.listTrialSlabDetail.push(slap);
                $scope.cprinit.listCPRFacilities[index].trialCalculation.slap = {
                    months: null,
                    payment: null
                }
            } catch (e) {
                alert("Exception AddSlabDetails_ClickEvent Error: " + e)
            }
        };
        $scope.GetCharges_ChangeEvent = function (item) {
            try {
                GetCharges(item);
            } catch (e) {
                alert("GetCharges_ChangeEvent " + e);
            }
        };
        //$scope.RemoveItemFromlistMonthlyIncome = function (list, item) {
        //    try {
        //        if (list != null && item != null) {
        //            if (item.id == null || item.id == "")
        //                common.RemoveItemFromList(list, item, true);
        //            else
        //                common.SetActiveFalseForRemovedItem(list, item);
        //        }
        //    } catch (e) {
        //        alert("Exception RemoveItemFromlistMonthlyIncome Error: " + e);
        //    }
        //};
        $scope.RemoveItemFromlistTrialAmortization = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null || item.id == "")
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistTrialAmortization Error: " + e);
            }
        };
        $scope.RemoveItemFromlistSecondaryStakeholder = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistSecondaryStakeholder Error: " + e);
            }
        };
        $scope.RemoveItemFromlistSpouseMonthlyIncome = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistSpouseMonthlyIncome Error: " + e);
            }
        };
        $scope.RemoveItemFromlistOtherSourceIncome = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistOtherSourceIncome Error: " + e);
            }
        };

        $scope.RemoveItemFromlistTaxInformation = function (list, item) {
            try {

                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveItemFromlistTaxInformation Error: " + e);
            }
        };

        $scope.RemoveItemFromlistCribAnalysis = function (list, item) {
            try {
                if (list != null && item != null) {
                    common.RemoveItemFromList(list, item, true);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistCribAnalysis Error: " + e);
            }
        };
        $scope.RemoveItemFromlistSlabDetails = function (list, item) {
            try {
                if (list != null && item != null) {
                    common.RemoveItemFromList(list, item, true);
                }
            } catch (e) {
                alert("Exception RemoveItemFromlistSpouseMonthlyIncome Error: " + e);
            }
        };

        $scope.ResetTaxInformation_ClickEvent = function () {
            ResetTaxInformation();
        };

        $scope.ResetCRIBAnalysis_ClickEvent = function () {
            ResetCribAnalysis();

        };


        $scope.AddTurnOver_ClickEvent = function (turnOver) {
            try {
                //debugger;
                if (CheckValidity()) {
                    if ($scope.borrowerprofile.turnOverlist == null || $scope.borrowerprofile.turnOverlist == undefined) {
                        $scope.borrowerprofile.turnOverlist = [];
                    }
                    $scope.borrowerprofile.turnOverlist.push($scope.turnOver);
                    ResetTurnOver();
                    //$scope.cprinit.turnOverlist = $scope.turnOverList;
                }
            }
            catch (ex) {
                alert("Exception in AddTurnOver_ClickEvent " + ex);
            }
        }

        function ResetTurnOver() {
            try {
                $scope.turnOver = {
                    id: 0,
                    cPRId: 0,
                    year: new Date(),
                    accnoAndName: null,
                    bankName: null,
                    drEntries: 0,
                    drSummation: 0,
                    crEntries: 0,
                    crSummation: 0,
                    earnings: 0,
                    active: true
                }

                $scope.form.turnOverForm.$setPristine();
                $scope.form.turnOverForm.$setUntouched();
            }
            catch (ex) {
                alert("Exception in ResetTurnOver " + ex);
            }
        }

        $scope.ResetTurnOver_ClickEvent = function () {
            try {
                ResetTurnOver();
            }
            catch (ex) {
                alert("Exception in ResetTurnOver_ClickEvent " + ex);
            }
        }
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
        $scope.RemoveTurnOverTableItem_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = $scope.borrowerprofile.turnOverlist.indexOf(item);
                    //var index = $scope.keyRatiosModel.keyRatioInputTypeModelList.indexOf(item);


                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                        if (answer) {
                            if (item.id !== 0) {
                                var index = $scope.borrowerprofile.turnOverlist.indexOf(item);
                                $scope.borrowerprofile.turnOverlist[index].active = false;
                            }
                            else if (item.id === 0) {
                                var index = $scope.borrowerprofile.turnOverlist.indexOf(item);
                                $scope.borrowerprofile.turnOverlist.splice(index, 1);
                            }
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    })
                }
            }
            catch (ex) {
                alert("Exception in RemoveTurnOverTableItem_ClickEvent " + ex);
            }
        }


        $scope.EditTurnOverTableItem_ClickEvent = function (item) {
            try {
                //if ($scope.turnOver.bankName !== null) {
                var index = $scope.borrowerprofile.turnOverlist.indexOf(item);
                //$scope.turnOverlist[index].active = false;
                $scope.turnOver = item;
                $scope.borrowerprofile.turnOverlist.splice(index, 1);
                //}
                //else
                //{
                //    dialogService.ConfirmDialogWithOkay('', "Please add the existing data to grid to edit this record!");
                //}
            }
            catch (ex) {
                alert("Exception in EditTurnOverTableItem_ClickEvent " + ex);
            }
        }
        $scope.filterDivisionBySegment = function (id) {
            try {
                $scope.listFilterdDivisions = $filter('filter')($scope.listDivision, { customerSegmentId: id });
            } catch (e) {
                alert("filterDivisionBySegment " + e);
            }
        };
        function CheckValidity() {
            try {

                if ($scope.turnOver.year == null)
                    return false;
                else if ($scope.turnOver.bankName == null)
                    return false;
                else if ($scope.turnOver.accnoAndName == null)
                    return false;
                else if ($scope.turnOver.drEntries == null)
                    return false;
                else if ($scope.turnOver.drSummation == null)
                    return false;
                else if ($scope.turnOver.crEntries == null)
                    return false;
                else if ($scope.turnOver.crSummation == null)
                    return false;
                else if ($scope.turnOver.earnings == null)
                    return false;
                else
                    return true;
            }
            catch (ex) {
                alert(" Exception CheckValidity " + ex);
            }
        }


        $scope.Submit_ClickEvent = function () {
            try {
                bindCPRBusinessProfileData();
                // SubmitDraftCPR();
                if ($scope.cprinit.cprno == "Pending") {
                    $scope.dataCaptureform.$setSubmitted();
                    if ($scope.dataCaptureform.$valid) {
                        if (borrowerFound == true) {

                            //$scope.cprinit.limitedCompany = $scope.limitedCompany;
                            SubmitCPRDataCapture();
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', global._applicantnotfoundmessage);
                        }
                    }
                } else {
                    if (ValidationForDratft()) {
                        //$scope.cprinit.limitedCompany = $scope.limitedCompany;
                        //$scope.cprinit.keyRatios = $scope.keyRatiosModel;
                        SubmitDraftCPR();
                    }
                }

            } catch (e) {
                alert("Submit_ClickEvent " + e);
            }
        };
        $scope.SubmitCPRInitiation_ClickEvent = function () {
            try {
                bindCPRBusinessProfileData();
                var status = ValidationCPRInitiation();
                //var status = true;    
                status.status = true;    // For temporary added
                if (status.status === true) {
                    if (status.trialcal === true) {
                        if ($scope.cprinit.status == "In Progress") {
                            var dialog = dialogService.ConfirmDialogWithYesNo('', global._askeforresubmissionmessage);
                            dialog.then(function () {
                                SubmitCPRInitiation();
                            }, function () {
                            });

                        }
                        else {
                            SubmitCPRInitiation();
                        }
                    } else {
                        var dialog = dialogService.ConfirmDialogWithYesNo('', global._trialcalculationnotavailablemessage);
                        dialog.then(function () {
                            if ($scope.cprinit.status == "In Progress") {
                                var dialog = dialogService.ConfirmDialogWithYesNo('', global._askeforresubmissionmessage);
                                dialog.then(function () {
                                    SubmitCPRInitiation();
                                }, function () {
                                });

                            }
                            else {
                                SubmitCPRInitiation();
                            }
                        }, function () {
                        });
                    }
                }
            } catch (e) {
                alert("SubmitCPRInitiation_ClickEvent " + e);
            }
        }
        $scope.Submit_SPClickEvent = function () {
            try {
                SubmitSPClickEvent();

            } catch (e) {
                alert("Submit_SPClickEvent " + e);
            }
        };

        $scope.UploadFA_ClickEvent = function () {
            try {
                UploadCRIB_ClickEvent_Validation(checkuploadvaluefa, UploadFA);
            } catch (e) {
                alert("UploadFA_ClickEvent ", e);
            }
        };
        $scope.UploadFP_ClickEvent = function () {
            try {
                UploadCRIB_ClickEvent_Validation(checkuploadvaluefp, UploadFP);
            } catch (e) {
                alert("UploadFP_ClickEvent ", e);
            }
        };
        $scope.BindCPR_ClickEvent = function (previouscprid, previouscpr) {
            try {
                if (previouscpr != null && previouscpr != null) {
                    if (previouscprid == 'Reset' && previouscpr == 'Reset') {
                        common.preprocessload();
                        //GetCPRAndRefernceData();
                        window.location.reload();

                    }
                }
                //    else
                //    BindCPR(previouscprid, previouscpr); $scope.resetcprdetailview = true;
                //}
                else
                    alert("Please Refresh the page. And Try again.");
            } catch (e) {
                alert("Exception BindCPR_ClickEvent " + e);
                common.preprocesshide();
            }
        };

        function UploadFP() {
            try {
                common.preprocessload();
                var faNic = "";
                var facilityType = "";
                var formdata = new FormData();
                var fileUploader = document.getElementById("fpFileUploader");
                formdata.append("fpFileUploader", fileUploader.files[0]);
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



                formdata.append("nic", faNic);
                formdata.append("facilitytype", facilityType);
                formdata.append("documenttype", "Financial Performance")
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
                        dialogService.ConfirmDialogWithOkay('', global._financialperformanceuploadmessage);
                        $scope.borrowerprofile.businessPerformanceAnalysis.url = response.data.output;
                        $scope.editable.view = false;
                        document.getElementById("fpFileUploader").value = "";
                        $scope.uploadfp = true;
                    }
                    common.preprocesshide();
                    $scope.uploadfp = false;
                }, function errorCallback(response) {
                    $scope.error = response;
                    $scope.uploadfp = false;
                });
            } catch (e) {
                alert("UploadFP " + e);
                $scope.uploadfp = false;
            }
        };
        $scope.Cancel_ClickEvent = function () {
            try {
                common.RedirectHome();
            } catch (e) {
                alert("Cancel_ClickEvent " + e);
            }
        };

        $scope.AddFacilityBtn_ClickEvent = function (facility) {
            try {
                if (facility != null) {
                    //if (facility.listSecurityOffer.length > 0 && facility.tenour.totalTermMonths > 0) {
                    if ((facility.listSecurityOffer.length > 0 && facility.tenour.totalTermMonths > 0) || (facility.product.name == "Staff Loan")) {
                        //if (facility.id != null) {
                        //    CheckTrialCalculationDependencyForFacilityChanges(facility);
                        //}
                        if (allRequiredFilled()) {
                            AddFacilityDetails_Function(facility);
                            //  GetCustomCheckListByProductId(facility.product); //Commented as it is moved to datacollection checklist
                            $scope.IsFacilityEditMode = false;
                            $scope.isEditMode = false;
                            ProductDropDownFilterByFacilityType(facility.product, false);
                            $scope.listUDF = [];
                        } else {
                            dialogService.ConfirmDialogWithOkay('', "Please input required form");
                        }

                    }
                    else {
                        var errordetect = false;
                        if (facility.tenour.totalTermMonths == 0) {
                            dialogService.ConfirmDialogWithOkay('', global._tenournotvalidmessage).then(function () { });
                            errordetect = true;
                        }

                        if (facility.listSecurityOffer.length == 0 && errordetect !== true)
                            dialogService.ConfirmDialogWithOkay('', global._securityoffercannotemptymessage).then(function () { });
                    }
                    //else {
                    //    if (facility.product.name !== "Staff Loan") {
                    //        var errordetect = false;
                    //        if (facility.tenour.totalTermMonths == 0) {
                    //            dialogService.ConfirmDialogWithOkay('', global._tenournotvalidmessage).then(function () { });
                    //            errordetect = true;
                    //        }

                    //        if (facility.listSecurityOffer.length == 0 && errordetect !== true)
                    //            dialogService.ConfirmDialogWithOkay('', global._securityoffercannotemptymessage).then(function () { });
                    //    }

                    //}
                }
                else {
                    $scope.facilityForm.$error.required[0].$$element.focus();
                    dialogService.ConfirmDialogWithOkay('', "Please fill the required input");
                }
            } catch (e) {
                alert("Exception AddFacilityBtn_ClickEvent " + e);
            }
        }


        function allRequiredFilled() {
            var result = true;
            if ($scope.cPRFacility.product.nature == 'Revolving' && $scope.cPRFacility.revolve.firstReviewDate == '') {
                result = false;

            }
            if ($scope.cPRFacility.product.name == 'HOUSING LOAN') {
                if ($scope.cPRFacility.plinthArea == 0 || $scope.cPRFacility.costPerSft == 0 ||
                    $scope.cPRFacility.valueOfCompletedWork == 0 || $scope.cPRFacility.amountNeededForRemainingWork == 0 ||
                    $scope.cPRFacility.totalCost == 0 || $scope.cPRFacility.totalConstructionCost == 0 ||
                    $scope.cPRFacility.loanRequired == 0 || $scope.cPRFacility.clientInvestment == 0)
                    result = false;
            }
            if ($scope.cPRFacility.downPayment == 0 || $scope.cPRFacility.amountrequest == 0 ||
                $scope.cPRFacility.interestrateoption == 0 || $scope.cPRFacility.interestrate == 0)
                result = false;

            return result;
        };

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

        $scope.AddSpouseMonthlyIncome_ClickEvent = function (item) {
            try {

                if (item != null && item.sourceofincome != null && item.amount != null && item.amount > 0) {
                    if ($scope.borrowerprofile.individual.spouseDetail.listClientSpouseDetailMonthlyIncome == null)
                        $scope.borrowerprofile.individual.spouseDetail.listClientSpouseDetailMonthlyIncome = [];
                    $scope.borrowerprofile.individual.spouseDetail.listClientSpouseDetailMonthlyIncome.push(item);
                    ResetSpouseMonthlyIncomeModel();
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Please input valid Amount");
                }
            } catch (e) {
                alert("Exception AddSpouseMonthlyIncome_ClickEvent Error: " + e)
            }
        };


        $scope.AddPreviousEmploymentDetail_ClickEvent = function (item) {
            try {
                if (item.totalWorkExperience < 0) {
                    dialogService.ConfirmDialogWithOkay('', "Please Input Valid Total Experience");
                } else {
                    if ($scope.borrowerprofile.individual.salariedemp.listClientPreviousEmploymentModel == null)
                        $scope.borrowerprofile.individual.salariedemp.listClientPreviousEmploymentModel = [];
                    $scope.borrowerprofile.individual.salariedemp.listClientPreviousEmploymentModel.push(item);
                    ResetPreviousEmploymentDetail();
                }

            } catch (e) {
                alert("Exception AddPreviousEmploymentDetail_ClickEvent Error: " + e);
            }
        };

        $scope.ResetPreviousEmploymentDetailBtn_ClickEvent = function () {
            $scope.clientPreviousEmploymentDetail = {
                id: null,
                cPRClientProfileId: null,
                salariedEmployeeId: null,
                organizationName: null,
                designation: null,
                joiningDate: null,
                releaseDate: null,
                phoneNo: null,
                totalWorkExperience: null,
                active: true
            };
        }

        $scope.ResetPreviousEmploymentDetailBtn_ClickEvent = function () {
            $scope.clientPreviousEmploymentDetail = {
                id: null,
                cPRClientProfileId: null,
                salariedEmployeeId: null,
                organizationName: null,
                designation: null,
                joiningDate: null,
                releaseDate: null,
                phoneNo: null,
                totalWorkExperience: null,
                active: true
            };
        }


        $scope.AddOtherIncomeSource_ClickEvent = function (item) {
            try {
                item = $scope.otherincomesourceModel;

                if (item != null && item.sourceofOtherIncome != null) {
                    if ($scope.borrowerprofile.individual.listOtherIncomeSources == null)
                        $scope.borrowerprofile.individual.listOtherIncomeSources = [];
                    $scope.borrowerprofile.individual.listOtherIncomeSources.push(item);
                    ResetSOtherIncomeSourcModel();
                }

                ////}
            } catch (e) {
                alert("Exception AddOtherIncomeSource_ClickEvent Error: " + e);
            }
        };

        $scope.AddValuationDetailsBtn_ClickEvent = function (valuation) {
            try {
                var status = false;
                if ($scope.valuationForm.$valid) {
                    if ($scope.cprinit.listCPRValuation === undefined || $scope.cprinit.listCPRValuation == null)
                        $scope.cprinit.listCPRValuation = [];

                    if (valuation != null && AddValuationClickValidation_Function(valuation)) {
                        AddValuationDetails_Function(valuation);
                        $scope.ResetValuation_ClickEvent();
                    }




                }
                sumTotalCollateralValue();
            } catch (e) {
                alert("AddValuationDetailsBtn_ClickEvent Error: " + e)
            }
        };
        function sumTotalCollateralValue() {
            $scope.totalCollateralValue = 0;
            $scope.totalFSV = 0;
            $scope.totalMV = 0;
            $scope.totalrrv = 0;
            angular.forEach($scope.cprinit.listCPRValuation, function (value) {

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
        $scope.AddSecondaryStakeholderDetails_ClickEvent = function (stakeholder) {
            try {
                //if ($scope.secondaryStakeholderForm.$valid)
                if (stakeholder != null) {
                    if ($scope.borrowerprofile.stakeholder.listSecondaryStakeholder == null)
                        $scope.borrowerprofile.stakeholder.listSecondaryStakeholder = [];
                    AddSecondaryStakeHolder_Function(stakeholder);
                }
            } catch (e) {
                alert("AddSecondaryStakeholderDetails_ClickEvent Error: " + e)
            }
        };

        $scope.AddGuarantorDetails_ClickEvent = function (facility, securityoffer, cPRSecurityGuarantor) {
            try {

                if ($scope.guarantorForm.$valid)
                    if (facility != null && securityoffer != null && cPRSecurityGuarantor != null)
                        AddGuarantorDetails_Function(facility, securityoffer, cPRSecurityGuarantor);
            } catch (e) {
                alert("Exception AddGuarantorDetails_ClickEvent " + e);
            }
        };

        $scope.YOMSearch_KeyPressEvent = function (query) {
            if (query.length > 1) {
                tempYOM = query;
                var results = $filter('filter')($scope.listYOM, query);
                var deferred = $q.defer();
                deferred.resolve(results);
                return deferred.promise;
            }
        };
        $scope.PremierRate_KeyPressEvent = function (premier) {
            try {
                if (premier != null) {
                    $scope.cPRFacility.interestrate = CalculateIRR(premier, $scope.baseRate);
                }
            } catch (e) {
                alert("Exception PremierRate_KeyPressEvent " + e);
            }
        };

        $scope.DropdownProduct_ChangeEvent = function (product) {
            try {
                if (product != null) {
                    if (ProductSelectValidation(product)) {
                        $scope.cPRFacility.facilitytype = product.facilitytype.name;
                        $scope.productcode = product.code;
                        if (angular.isUndefined($scope.cPRFacility.revolve) || $scope.cPRFacility.revolve == null) {
                            $scope.cPRFacility.revolve = {
                                id: null,
                                reviewType: null,
                                firstReviewDate: new Date(),
                                nextReviewDate: null,
                                enableEmailReminderAlert: false,
                                active: true
                            };
                        }

                        $scope.listUDF = GetUDF('Facility', product.id);

                    } else
                        $scope.cPRFacility.product = null;
                }
            } catch (e) {
                alert("Exception DropdownProduct_ChangeEvent " + e);
            }
        };

        $scope.DropDownFacilityOption_ChangeEvent = function (facilityOption) {
            try {
                var cprId = GetUrlParameters();
                if (facilityOption != null && facilityOption != 'Fresh') {
                    //list history of facility here

                    $http({
                        url: "/CPR/GetHistoryOfCPRFacilityByCPRId",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: { cPRId: cprId }
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            $scope.listCPRHistoryFacility = response.data.output;
                            $scope.listCPRHistoryFacility.facilityno = 'Pending';
                            $scope.listCPRHistoryFacility.id = '';
                            // $scope.cPRFacility.facilityno = 'Pending';
                            common.LoderHide();
                        }
                    }, function errorCallback(response) {
                        $scope.err = response;
                        common.LoderHide();
                    });
                }

            } catch (e) {
                alert("Exception DropdownProduct_ChangeEvent " + e);
            }
        };

        $scope.DropdownTenourYearMonth_ChangeEvent = function () {
            TotalTermMonthCalculation__Function();
        };
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
        $scope.DropdownValuationSecurity_ChangeEvent = function (ValSecurity) {
            try {
                if (ValSecurity != null)
                    DropdownValuationSecurity_Function(ValSecurity);
                LoadChargeTypeDropDownValue_Function(ValSecurity);

            } catch (e) {
                alert("Exception DropdownValuationSecurity_ChangeEvent " + e);
            }
        };
        $scope.DropdownSecurityDetailFaclityNo_ChangeEvent = function (item) {
            try {
                if (item != null)
                    DropdownSecurityDetailFaclityNo_Function(item);
            } catch (e) {
                alert("Exception DropdownSecurityDetailFaclityNo_ChangeEvent " + e);
            }
        };
        $scope.EditHistoryOfFacilityDetalsTableItem_ClickEvent = function (item) {
            try {
                if (item != null)
                    if (BindFacilityDetailValues(item))
                        if (!angular.isUndefined($scope.listCPRHistoryFacility))
                            if (common.RemoveItemFromList($scope.listCPRHistoryFacility, item, false)) {
                                $scope.IsDisabledGuarantorDelete = false;
                                // $scope.IsFacilityEditMode = true;
                                //if (CheckPersonalGuarantorExistInSecurityOfferList(item.listSecurityOffer)) {
                                //    var value = $filter('filter')($scope.cprinit.listBorrowerProfiles, { product: { code: item.product.code } });
                                //    if (value.length > 0)
                                //        $scope.IsDisabledGuarantorDelete = true;
                                //}

                                for (var i = 0; i < $scope.listSecurityType.length; i++)
                                    $scope.listSecurityType[i].active = true;

                                for (var i = 0; i < item.listSecurityOffer.length; i++) {
                                    var j = GetArrayIndexByValue($scope.listSecurityType, "type", item.listSecurityOffer[i].securitytype.type);
                                    if (j !== -1)
                                        $scope.listSecurityType[j].active = false;
                                    //
                                    $scope.cPRFacility.listSecurityOffer = item.listSecurityOffer;
                                }

                                //UDF
                                $scope.listUDF = GetUDF('Facility', item.product.id);


                                //
                                $scope.cPRFacility.facilityno = 'Pending';
                                $scope.cPRFacility.id = null;
                            }

            } catch (e) {
                alert("Exception EditHistoryOfFacilityDetalsTableItem_ClickEvent " + e);
            }
        };

        $scope.EditFacilityDetalsTableItem_ClickEvent = function (item) {
            try {
                if (item != null)
                    if (BindFacilityDetailValues(item))
                        if (!angular.isUndefined($scope.cprinit.listCPRFacilities))
                            if (common.RemoveItemFromList($scope.cprinit.listCPRFacilities, item, false)) {
                                $scope.IsDisabledGuarantorDelete = false;
                                $scope.IsFacilityEditMode = true;
                                $scope.isEditMode = true;
                                if (CheckPersonalGuarantorExistInSecurityOfferList(item.listSecurityOffer)) {
                                    var value = $filter('filter')($scope.cprinit.listBorrowerProfiles, { product: { code: item.product.code } });
                                    if (value.length > 0)
                                        $scope.IsDisabledGuarantorDelete = true;
                                }

                                for (var i = 0; i < $scope.listSecurityType.length; i++)
                                    $scope.listSecurityType[i].active = true;

                                for (var i = 0; i < item.listSecurityOffer.length; i++) {
                                    var j = GetArrayIndexByValue($scope.listSecurityType, "type", item.listSecurityOffer[i].securitytype.type);
                                    if (j !== -1)
                                        $scope.listSecurityType[j].active = false;
                                }

                                //UDF
                                $scope.listUDF = GetUDF('Facility', item.product.id);


                            }

            } catch (e) {
                alert("Exception EditFacilityDetalsTableItem_ClickEvent " + e);
            }
        };

        $scope.EditGroupOverviewDetailsTableItem_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    BindGroupOverviewDetailValues(list, item);
                }
            } catch (e) {
                alert("Exception EditGroupOverviewDetailsTableItem_ClickEvent " + e);
            }
        };

        $scope.EditSecondaryStakeHolderTableItem_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null)
                    if (($scope.secondarystakeholder.id == null || $scope.secondarystakeholder.id == 0) && ($scope.secondarystakeholder.name == null || $scope.secondarystakeholder.name == undefined)) {
                        //var str = moment(item.dOB).format("DD/MM/YYYY"); //json string

                        //item.dOB = str;

                        BindSecondaryStakeHolderValues(list, item);
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', "Please add the remaining data to the grid before editing a new record!").then(function () { });
                    }
            } catch (e) {
                alert("Exception EditSecondaryStakeHolderTableItem_ClickEvent " + e);
            }
        };
        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        function BindStakeHolderDate(output) {
            try {
                if ($scope.cprinit.listCPRValuation != null && $scope.cprinit.listCPRValuation != undefined) {
                    if ($scope.cprinit.listCPRValuation.length > 0) {
                        for (var i = 0; i < $scope.cprinit.listCPRValuation.length; i++) {
                            if (isJson($scope.cprinit.listCPRValuation[i].valuer.name)) {
                                $scope.cprinit.listCPRValuation[i].valuer.name = JSON.parse($scope.cprinit.listCPRValuation[i].valuer.name);
                            }
                            else {
                                $scope.cprinit.listCPRValuation[i].valuer.name = JSON.stringify($scope.cprinit.listCPRValuation[i].valuer.name);
                            }
                        }
                    }
                }
                $scope.cprinit.businessPerformanceAnalysis = $scope.businessPerformanceAnalysis;
                $scope.cprinit.cashFlowAnalysis = $scope.cashFlowAnalysis;
                $scope.cprinit.debtBurdenRatio = $scope.debtBurdenRatio;
                if (output != null) {
                    if (output.cpr != null) {
                        if (output.cpr.branchPosition != null) {
                            var str = moment(output.cpr.branchPosition.date).format("DD/MM/YYYY");
                            output.cpr.branchPosition.date = new Date(str);
                            $scope.cprinit.branchPosition.date = output.cpr.branchPosition.date;
                        }
                        if (output.cpr.advancePosition != null) {
                            var str2 = moment(output.cpr.advancePosition.date).format("DD/MM/YYYY");
                            output.cpr.advancePosition.date = new Date(str2);
                            $scope.cprinit.advancePosition.date = output.cpr.advancePosition.date;
                        }
                    }
                }
                if ($scope.cprinit.listBorrowerProfiles !== null && $scope.cprinit.listBorrowerProfiles.length !== 0) {
                    var borrowerLength = $scope.cprinit.listBorrowerProfiles.length;
                    for (var i = 0; i < borrowerLength; i++) {
                        if ($scope.cprinit.listBorrowerProfiles[i].stakeholder !== null) {
                            //$scope.addressDetailsList = $scope.cprinit.listBorrowerProfiles[0].stakeholder.addressDetailsList;

                            if ($scope.cprinit.listBorrowerProfiles[i].stakeholder.listSecondaryStakeholder !== null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.listSecondaryStakeholder.length !== 0) {
                                var length = $scope.cprinit.listBorrowerProfiles[i].stakeholder.listSecondaryStakeholder.length;
                                if (length != 0) {
                                    for (var j = 0; j < length; j++) {
                                        var request = $scope.cprinit.listBorrowerProfiles[i].stakeholder.listSecondaryStakeholder[j];
                                        var str = moment(request.dOB).format("dd/MM/yyyy");
                                        $scope.cprinit.listBorrowerProfiles[i].stakeholder.listSecondaryStakeholder[j].dOB = str;
                                    }
                                }
                            }
                        }
                    }
                }

            }
            catch (ex) {
                alert("Exception in BindStakeHolderDate " + ex);
            }
        }


        $scope.FacilityPurposeSearch_KeyPressEvent = function (query) {
            tempFacilityPurpose = query;
            $scope.listFacilityPurposes = angular.copy(listFacilityPurposesCopy);
            var results = $filter('filter')($scope.listFacilityPurposes, query);
            var deferred = $q.defer();
            if (results == null || results.length == 0) {
                $scope.listFacilityPurposes.push(query);
                results = $filter('filter')($scope.listFacilityPurposes, query);
            }
            deferred.resolve(results);
            return deferred.promise;
        };

        $scope.RemoveSecurityOffer_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    var status = false;
                    if (item.securitytype.type === 'Personal Guarantor') {
                        if (!$scope.IsDisabledGuarantorDelete) {
                            if (item.id == null)
                                status = common.RemoveItemFromList(list, item, true);
                            else
                                status = common.SetActiveFalseForRemovedItem(list, item);
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', global._removeunsuccesssecurityoffermessage).then(function () { });
                        }
                    } else {
                        if (item.id == null)
                            status = common.RemoveItemFromList(list, item, true);
                        else
                            status = common.SetActiveFalseForRemovedItem(list, item);
                    }

                    if (status) {
                        var i = GetArrayIndexByValue($scope.listSecurityType, "type", item.securitytype.type);
                        $scope.listSecurityType[i].active = true;
                    }

                }

            } catch (e) {
                alert("Exception RemoveSecurityOffer_ClickEvent " + e);
            }
        };
        $scope.RemoveFacilityDetail_ClickEvent = function (list, item) {
            try {
                var allowRemove = {};
                var status1 = false, status2 = false;
                if (list != null && item != null) {
                    status1 = CheckPersonalGuarantorExistInSecurityOfferList(item.listSecurityOffer)
                    allowRemove = CheckDependencyForRemovingFacility(item, status);
                    if (allowRemove.status) {
                        //UDF
                        //$scope.RemoveAllFacilityUDF(item);

                        if (item.id == null)
                            status2 = common.RemoveItemFromList(list, item, true);
                        else
                            status2 = common.SetActiveFalseForRemovedItem(list, item);

                        if (status1 && status2)
                            common.RemoveItemFromList($scope.listPersnalGurantorLoanFacility, item, false);

                        var fcount = 0;
                        for (var i = 0; i < $scope.cprinit.listCPRFacilities.length; i++)
                            if ($scope.cprinit.listCPRFacilities[i].active == true)
                                fcount++;

                        if (fcount == 0)
                            ProductDropDownFilterByFacilityType("listProductReset", true);
                    } else {
                        dialogService.ConfirmDialogWithOkay('', allowRemove.msg);
                    }
                }
            } catch (e) {
                alert("Exception RemoveFacilityDetail_ClickEvent " + e);
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
        $scope.RemoveSecondaryStakeHolder_ClickEvent = function (list, item) {
            try {
                dialogService.ConfirmDialogWithYesNo('', "Do you want to delete this record?").then(function () {
                    if (list != null && item != null) {
                        //Remove All Education Qualification
                        RemoveAllClientStakeHolderEducationQualification(item);

                        //Remove All Family Detail
                        if (item.listClientStakeHolderFamily !== null)
                            angular.forEach(item.listClientStakeHolderFamily, function (value) {
                                if (value.id != null) {
                                    //Remove All Employment Detail
                                    RemoveAllClientStakeHolderFamilyEmploymentDetail(value);

                                    common.SetActiveFalseForRemovedItem(item.listEducationQualification, value);
                                }
                            });



                        if (item.id == null)
                            common.RemoveItemFromList(list, item, true);
                        else
                            common.SetActiveFalseForRemovedItem(list, item);
                    }
                });
            } catch (e) {
                alert("Exception RemoveSecondaryStakeHolder_ClickEvent " + e);
            }
        };

        function RemoveAllClientStakeHolderFamilyEmploymentDetail(item) {
            try {
                //item >> stakeholderFamily
                if (item.listClientStakeHolderFamilyEmployment !== null)
                    angular.forEach(item.listClientStakeHolderFamilyEmployment, function (value) {
                        if (value.id != null)
                            common.SetActiveFalseForRemovedItem(item.listClientStakeHolderFamilyEmployment, value);
                    });

            } catch (e) {
                alert("Exception RemoveAllEmploymentDetail " + e);
            }
        }

        function RemoveAllClientStakeHolderEducationQualification(item) {
            try {
                //item >> secondaryStakeHolder
                if (item.listEducationQualification !== null)
                    angular.forEach(item.listEducationQualification, function (value) {
                        if (value.id != null)
                            common.SetActiveFalseForRemovedItem(item.listEducationQualification, value);
                    });

            } catch (e) {
                alert("Exception RemoveAllEmploymentDetail " + e);
            }
        }

        $scope.ResetSecondaryStakeHolderBtn_ClickEvent = function () {
            ResetSecondaryStakeholderModel();
        };
        $scope.ResetSpouseMonthlyIncomeBtn_ClickEvent = function () {
            ResetSpouseMonthlyIncomeModel();
        };
        $scope.ResetSOtherIncomeSourceBtn_ClickEvent = function () {
            ResetSOtherIncomeSourcModel();
        };
        $scope.ResetFacilityDetailBtn__ClickEvent = function () {
            ResetFacilityModel("Pending");
        };


        $scope.ResetGuarantorDetails_ClickEvent = function (fNo) {
            if (fNo != null)
                ResetGuarantorDetailsModel(fNo);
        };
        $scope.ReTakeScoreCard_ClickEvent = function (item) {
            try {
                if (item != null) {
                    $scope.cprinit.creditScore.grade = null;
                    $scope.listScoreCardTemplates;
                }
            } catch (e) {
                alert("Exception ReTakeScoreCard_ClickEvent " + e);
            }
        };
        $scope.SetScoreCardSelectedAnswerRadioButton_DrawEvent = function (item) {
            try {
                if (item.selectedAnswer != null) {
                    var index = -1;
                    index = GetArrayIndexByValue(item.listAnswers, 'id', item.selectedAnswer.id);
                    if (index > -1)
                        item.selectedAnswer = item.listAnswers[index];
                    else
                        item.selectedAnswer = null;
                }
            } catch (e) {
                alert("Exception SetScoreCardSelectedAnswerRadioButton " + e);
            }
        };

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

        $scope.UploadCRIB_ClickEvent_Validation = function (checkValue, uploadFunction) {
            try {
                if (checkValue.value === "") {
                    alert("PLEASE ENTER A FILE TO BE UPLOAD!");
                } else {
                    uploadFunction();
                }
            } catch (e) {
                $scope.cribUploadUrl = false;
                alert(uploadFunction + "_ClickEvent ", e);
            }
        };

        $scope.AddAcoountMovementTurnover_ClickEvent = function () {
            try {
                if ($scope.borrowerprofile.listClientAccountMovementTurnover == null) {
                    $scope.borrowerprofile.listClientAccountMovementTurnover = [];
                }
                $scope.borrowerprofile.listClientAccountMovementTurnover.push($scope.accountMovementTurnover);
                $scope.ResetAccountMovementTurnover_ClickEvent();

            } catch (e) {
                alert("AddAcoountMovementTurnover_ClickEvent error" + e);
            }
        };
        function ValidateCustomerAccountDepositDetail() {
            if ($scope.customerAccountDepositDetail.accountNo == null || $scope.customerAccountDepositDetail.accountNo == "") {
                return false;
            } else {
                return true;
            }
        }
        function ValidateAlliedAccountDepositDetail() {
            if ($scope.alliedAccountDepositDetail.alliedAccountNumber == null || $scope.alliedAccountDepositDetail.alliedAccountNumber == "") {
                return false;
            } else {
                return true;
            }
        }


        $scope.AddAlliedAcoountDepositDetail_ClickEvent = function () {
            try {
                if (ValidateAlliedAccountDepositDetail()) {
                    if ($scope.borrowerprofile.listClientAccountDepositDetailModel == null) {
                        $scope.borrowerprofile.listClientAccountDepositDetailModel = [];
                    }
                    $scope.alliedAccountDepositDetail.isAllied = true;
                    $scope.borrowerprofile.listClientAccountDepositDetailModel.push($scope.alliedAccountDepositDetail);
                    $scope.ResetAlliedAccountDepositDetail_ClickEvent();
                }
            } catch (e) {
                alert("AddAlliedAcoountDepositDetail_ClickEvent error" + e);
            }
        };


        $scope.ResetBankaccountDetailsTable_ClickEvent = function () {
            $scope.bankaccountdetails = {
                id: 0,
                name: null,
                branchname: null,
                accountnumber: null,
                accounttype: null,
                currentbalance: null,
                isExisting: false,
                listUDFValues: [],
                active: true
            };
            //$scope.addbankaccountdetailsform.$setUntouched();
            //$scope.addbankaccountdetailsform.$setPristine();
        };

        $scope.ResetExistingBankaccountDetailsTable_ClickEvent = function () {
            $scope.existingBankaccountdetail = {
                id: null,
                name: null,
                branchname: null,
                accountnumber: null,
                accounttype: null,
                currentbalance: null,
                isExisting: true,
                listUDFValues: [],
                accountOpenDate: null,
                active: true
            };
            //$scope.addbankaccountdetailsform.$setUntouched();
            //$scope.addbankaccountdetailsform.$setPristine();
        };


        $scope.ResetCustomerAccountDepositDetail_ClickEvent = function () {
            $scope.customerAccountDepositDetail = {
                id: null,
                cPRClientProfileId: null,
                accountNo: null,
                depositDate: null,
                customerCIF: null,
                customerName: null,
                customerDeposit: null,
                alliedCIF: null,
                alliedName: null,
                alliedAccountNumber: null,
                alliedDeposit: null,
                isAllied: false,
                active: true
            };
        };
        $scope.ResetAlliedAccountDepositDetail_ClickEvent = function () {
            $scope.alliedAccountDepositDetail = {
                id: null,
                cPRClientProfileId: null,
                accountNo: null,
                depositDate: null,
                customerCIF: null,
                customerName: null,
                customerDeposit: null,
                alliedCIF: null,
                alliedName: null,
                alliedAccountNumber: null,
                alliedDeposit: null,
                isAllied: true,
                active: true
            };
        };

        $scope.AddFinancialDetails_ClickEvent = function () {
            try {
                $scope.FinantialActivityDetailsList.push($scope.financialactivity);
                $scope.ResetFinancialDetailsTable_ClickEvent();
            } catch (e) {
                alert("AddFinancialDetails_ClickEvent error" + e);
            }
        };
        $scope.ResetFinancialDetailsTable_ClickEvent = function () {
            $scope.financialactivity = {
            };
        };

        $scope.AddBorrowerProfiles_ClickEvent = function (profileType) {
            try {
                if (profileType.type == "Joint Applicant")
                    AddBorrowerProfiles(profileType, null);
                else
                    if ($scope.guarantorTab.facility != null) {
                        AddBorrowerProfiles(profileType, $scope.guarantorTab.facility.product);
                        $scope.guarantorTab.facility = null;
                    }
            } catch (e) {
                alert("AddBorrowerProfiles_ClickEvent " + e);
            }
        };
        $scope.LegalForm_ChangeEvent = function (legalForm) {
            try {
                LegalFormChange(legalForm);
            } catch (e) {
                alert("LegalForm_ChangeEvent " + e);
            }
        };
        $scope.ChangeBorrowerProfile_ClickEvent = function (borrowerProfileType, index) {
            try {
                ChangeBorrowerProfile(borrowerProfileType, index);
                $scope.formatIndex = 2;
                ReinitiateSession();

            } catch (e) {
                alert("ChangeBorrowerProfile_ClickEvent " + e);
            }
        };
        $scope.ChangeNavigation_ClickEvent = function (index) {
            try {
                ReinitiateSession();
                $scope.formatIndex = index;
                var wantToAutoDraft = false;
                $scope.selectedApplicantType = "Main";
                if (index == 2 || $scope.previousNavIndex == 17) {
                    $scope.defaultTab = true;
                    $scope.changeTab = 'applicant';
                }

                if ($scope.borrowerChanged == true) {
                    $scope.selectedApplicantType = "Main";
                    $scope.changeTab = 'applicant';
                    $scope.defaultTab = true;
                    ChangeBorrowerProfile($scope.listBorrowerProfileTypes[0], 0);
                }

                if (index == 19) {
                    $scope.DropdownRepaymentCalculationFaclityNo_ChangeEvent($scope.repFacility);
                }

                if (index == 17)
                    $scope.changeTab = 'approvals';

                //if (index == 6) {
                //    angular.forEach($scope.cprinit.listCPRFacilities, function (value) {
                //        if (value.id == null || value.id == '') {
                //            wantToAutoDraft = true;
                //        }
                //    });
                //    if (wantToAutoDraft) {
                //        if (ValidationForDratft()) {
                //            AutoDraftCPR();
                //        }
                //    }
                //}

                if (index == 49) {
                    wantToAutoDraft = true;
                    if (wantToAutoDraft) {
                        AutoDraftCPR();
                    }
                }
                if (index == 15) {
                    angular.forEach($scope.cprinit.listCPRFacilities, function (value) {
                        if (value.id == null || value.id == '')
                            wantToAutoDraft = true;
                        else {
                            if (value.listSecurityOffer != null && value.listSecurityOffer.length > 0) {
                                angular.forEach(value.listSecurityOffer, function (security) {
                                    if (security.id == null || security.id == '')
                                        wantToAutoDraft = true;
                                    else {
                                        var type = security.securitytype.type;
                                        switch (type) {

                                            case "Equipment":
                                                var listEquipment = security.listEquipmentSecurityDetailModel;
                                                if (listEquipment != null && listEquipment.length > 0) {
                                                    angular.forEach(listEquipment, function (equipment) {
                                                        if (equipment.id == null || equipment.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;
                                            case "Vehicle":
                                                var listVehicle = security.listVehicleSecurityDetailModel;
                                                if (listVehicle != null && listVehicle.length > 0) {
                                                    angular.forEach(listVehicle, function (vehicle) {
                                                        if (vehicle.id == null || vehicle.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;

                                            case "Property":
                                                var listProperty = security.listPropertySecurityDetailModel;
                                                if (listProperty != null && listProperty.length > 0) {
                                                    angular.forEach(listProperty, function (property) {
                                                        if (property.id == null || property.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;

                                            case "Other":
                                                var listOther = security.listOtherSecurityDetailModel;
                                                if (listOther != null && listOther.length > 0) {
                                                    angular.forEach(listOther, function (other) {
                                                        if (other.id == null || other.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;

                                            case "ShareCertificate":
                                                var listShare = security.listShareCertificateSecurityDetailModel;
                                                if (listShare != null && listShare.length > 0) {
                                                    angular.forEach(listShare, function (property) {
                                                        if (property.id == null || property.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;

                                            case "FDR":
                                                var listFinancialInstrument = security.listFinancialInstrumentSecurityDetailModel;
                                                if (listFinancialInstrument != null && listFinancialInstrument.length > 0) {
                                                    angular.forEach(listFinancialInstrument, function (property) {
                                                        if (property.id == null || property.id == '')
                                                            wantToAutoDraft = true;
                                                    });
                                                }
                                                break;
                                        }
                                    }
                                });
                            }
                        }
                    });
                    if (wantToAutoDraft) {
                        if (ValidationForDratft()) {
                            AutoDraftCPR();
                        }
                    }
                }
                if (index == 14) {

                    if (!angular.isUndefined(highestProduct)) {
                        if ($scope.cprinit.creditScore.product == null) {
                            $scope.cprinit.creditScore.product = $scope.listProducts[GetArrayIndexByValue($scope.listProducts
                                , "name"
                                , highestProduct.name)];
                        } else {
                            $scope.cprinit.creditScore.product = $scope.listProducts[GetArrayIndexByValue($scope.listProducts
                                , "name"
                                , $scope.cprinit.creditScore.product.name)];
                        }

                        if (!$scope.cprinit.creditScore.product != null)
                            GetScoreCardTemplatesByProductId($scope.cprinit.creditScore.product.id);
                    }
                }

                if (index == 10) {
                    $scope.GetAllApplicantName();
                }

                if (index == 25) {
                    //Approval Edit Status
                    $scope.isWFEnabled = common.isWFEnabled;
                    if ($scope.isWFEnabled == true) {
                        GetCurrentApprovalUser();
                    }
                }
                //Document Checklist Save update by Approval
                if (index == 16) {
                    $scope.isWFEnabled = common.isWFEnabled;
                    if ($scope.isWFEnabled == true) {
                        GetCurrentApprovalUser();
                    }
                }

                //Approval Edit Status
                //if (index == 26) {                   
                //    $scope.isWFEnabled = common.isWFEnabled;
                //    if ($scope.isWFEnabled == true) {
                //        GetCurrentApprovalUser();
                //    }
                //}

                $scope.previousNavIndex = index;
                window.scrollTo(0, 0);
            } catch (e) {
                alert("ChangeNavigation_ClickEvent " + e);
            }
        };

        $scope.SearchBorrowerProfiles_ClickEvent = function (type, input) {
            try {
                if ($scope.cprinit.business != null) {
                    SerachCustomers(type, input);
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Please Select a Legal Form");
                }

            } catch (e) {
                alert("SearchBorrowerProfiles_ClickEvent " + e);
            }
        };

        //function SerachCustomers(type, input) {
        //    try {
        //        if (type == 'CIF')
        //            type = 'cif';
        //        else if (type == 'NID')
        //            type = 'nic';
        //        else if (type == 'NAME')
        //            type = 'name';
        //        else if (type == 'TIN')
        //            type = 'tin';
        //        common.preprocessload();

        //        var req = {
        //            method: 'POST',
        //            url: common.connectivityUrl + '/api/SearchCustomers?type=' + type + '&input=' + input,
        //            headers: {
        //                "Content-Type": undefined
        //            },
        //            data: {}
        //        };

        //        $scope.listSearchCustomer = [
        //            { CIF: '0000099900000054',}
        //        ];

        //        $http(req).then(function success(response) {
        //            $scope.listSearchCustomer = response.data.output;
        //            if ($scope.listSearchCustomer.length <= 0) {
        //                dialogService.ConfirmDialogWithOkay('', "Result Not Found");
        //            };
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
        //};

        //  For Basic Bank Customization , There customer data will come from CBS only by CIF or Account No

        function GetAuthentionToken() {
            return new Promise(function (resolve, reject) {
                try {
                    $http({
                        url: "/ApiCallingFromCBS/GetTokenResponseAsync",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                    }).then(function successCallback(response) {
                        if (response.data.success) {
                            var token = response.data.output;
                            console.log(response.data.output);
                            $scope.token = token;
                            resolve();
                        }
                        else {
                            reject('Get Authentication Token failed'); // Reject the promise with an error message
                        }
                    }, function errorCallback(response) {
                        reject('Get Authentication Token failed'); // Reject the promise with an error message
                    });
                } catch (e) {
                    alert('GetAuthentionToken ' + e);
                    reject('Get Authentication Token failed'); // Reject the promise with an error message
                }
            });

        };

        function SerachCustomers(type, input) {
            GetAuthentionToken().then(function () {
                if (type == 'CIF')
                    type = 'cif';
                //    For Basic Bank Customization , There customer data will come from CBS only by CIF or Account No
                common.preprocessload();
                if ($scope.token != '') {
                    GetCustomerByToken($scope.token, input);
                    common.preprocesshide();
                }
                else {
                    common.preprocesshide();
                    dialogService.ConfirmDialogWithOkay('', $sope.apiMessage);
                }
            })
        };

        function GetCustomerByToken(token, cif) {
            try {
                $http({
                    url: "/ApiCallingFromCBS/GetCustomerDataByToken",
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
                        $scope.listSearchCustomer = [];
                        $scope.listSearchCustomer.push(response.data.output);
                        common.preprocesshide();
                    }
                    else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.output);
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

        $scope.GetCustomerLoanPosition = function () {
            try {
                common.preprocessload();
                GetAuthentionToken().then(function () {
                    var cif = $scope.cprinit.cif;
                    if ($scope.token != '') {
                        GetCurrentPositionOfLoan($scope.token, cif);
                        common.preprocesshide();
                    }
                    else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', $sope.apiMessage);
                    }
                })

            } catch (e) {
                alert("GetCustomerLoanPosition " + e);
            }
        }

        function GetCurrentPositionOfLoan(token, cif) {
            try {
                $http({
                    url: "/ApiCallingFromCBS/GetCustomerCurrentPositionOfLoan",
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
                        $scope.LoanResponseDataList = [];
                        $scope.LoanResponseDataList = response.data.output;
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message, response.data.output);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCurrentPositionOfLoan " + e);
            }

        };
        $scope.calculateTotal = function (column) {
            var total = 0;
            for (var i = 0; i < $scope.LoanResponseDataList.length; i++) {
                if (!isNaN(parseFloat($scope.LoanResponseDataList[i][column]))) {
                    total += parseFloat($scope.LoanResponseDataList[i][column]);
                }
            }
            return total;
        };
        $scope.calculateTotalOutstanding = function () {
            var totalOutstanding = 0;
            for (var i = 0; i < $scope.LoanResponseDataList.length; i++) {
                if ($scope.LoanResponseDataList[i].FacilityType === 'Funded') {
                    totalOutstanding += parseFloat($scope.LoanResponseDataList[i].FundedOutstanding);
                } else {
                    totalOutstanding += parseFloat($scope.LoanResponseDataList[i].NonFundedOutstanding);
                }
            }
            return totalOutstanding;
        };

        $scope.calculateEOL = function (item) {
            if (item.FacilityType === 'Funded') {
                var eol = parseFloat(item.FundedOutstanding) - parseFloat(item.Limit);

                item.EOL = eol <= 0 ? 0 : eol; // Update the item.EOL property
                return item.EOL;
            } else {
                item.EOL = 0;
                return 0; // Placeholder, update as needed
            }
        };

        $scope.calculateTotalEOL = function () {
            var totalEOL = 0;
            for (var i = 0; i < $scope.LoanResponseDataList.length; i++) {
                totalEOL += $scope.calculateEOL($scope.LoanResponseDataList[i]);
            }
            return totalEOL;
        };
        //    $scope.SavedExistingFacilityList = [];
        $scope.saveExistingFacility = function () {
            var isValid = true;

            // Check if Overdue, EMI, and Remarks fields are empty for each row
            for (var i = 0; i < $scope.LoanResponseDataList.length; i++) {
                var item = $scope.LoanResponseDataList[i];

                if (!item.Overdue || !item.EMI || !item.Remarks) {
                    isValid = false;
                    dialogService.ConfirmDialogWithOkay('', "Please fill up all input fields for row " + (i + 1), null);
                    break; // Stop checking further rows if any row is invalid
                }
            }
            if (isValid) {
                var clientprofileId = $scope.cPId;

                $.ajax({
                    url: "/CPRV2/SaveExistingFacility",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ existingFacilityList: $scope.LoanResponseDataList, clientprofileId: clientprofileId }),

                    success: function (response) {
                        if (response.Result.success) {
                            dialogService.ConfirmDialogWithOkay('', response.Result.message);
                            GetAllSavedExistingFacilityByCPId();
                        }
                        console.log("Save successful:", response);
                        // You can handle success actions here
                    },
                    error: function (error) {
                        console.error("Save failed:", error);
                        // You can handle error actions here
                    }
                });
            }

        };

        function GetAllSavedExistingFacilityByCPId() {
            try {
                var clientProfileId = $scope.cPId;
                $http({
                    url: "/CPRV2/GetAllExistingFacilityByClient",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ clientProfileId: clientProfileId })
                }).then(function successCallback(response) {
                    if (response.data.Result.success) {
                        $scope.SavedExistingFacilityList = response.data.Result.output;
                        console.log('ExistingFacilityList :' + $scope.SavedExistingFacilityList);
                        console.log('ExistingFacilityList :' + response.data.Result.output);
                        if ($scope.SavedExistingFacilityList.length > 0) {
                            $scope.isAlreadySaved = false;
                        } else {
                            $scope.isAlreadySaved = true;
                        }

                    }
                }, function errorCallback(response) {
                    $scope.error = response.data.Result.message;
                });
            } catch (e) {
                alert("Exception GetAllSavedExistingFacilityByCPId " + e);
            }
        }

        $scope.toggleEditMode = function (item) {
            // Toggle the edit mode for the specified columns
            item.editMode = !item.editMode;
        };

        $scope.saveEdit = function (item) {
            // Save the edits and toggle back to view mode
            item.editMode = false;
            // Proceed with your save logic, use $scope.SavedExistingFacilityList
            console.log("Saving edits:", item);
            $.ajax({
                url: "/CPRV2/UpdateExistingFacility",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ existingFacilityDto: item }),

                success: function (response) {
                    if (response.success) {
                        dialogService.ConfirmDialogWithOkay('', response.message);
                        GetAllSavedExistingFacilityByCPId();
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.message);
                    }
                },
                error: function (error) {
                    console.error("Save failed:", error);
                    // You can handle error actions here
                }
            });

        };

        $scope.parseDate = function (dateString) {
            // Extract the timestamp from the string (remove "/Date(" and "/)")
            var timestamp = parseInt(dateString.replace(/\/Date\(|\)\//g, ''));

            // Convert the timestamp to a Date object
            return new Date(timestamp);
        };

        $scope.GetGroupCifData = function () {
            try {
                common.preprocessload();
                GetAuthentionToken().then(function () {
                    var cif = $scope.cprinit.cif;
                    if ($scope.token != '') {
                        GetGroupCifByCustomerCif($scope.token, cif);
                        common.preprocesshide();
                    }
                    else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', $sope.apiMessage);
                    }
                })

            } catch (e) {
                alert("GetGroupCifData " + e);
            }
        }

        function GetGroupCifByCustomerCif(token, cif) {
            try {

                $http({
                    url: "/ApiCallingFromCBS/GetGroupCif",
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
                        $scope.groupCifList = response.data.output;
                        angular.forEach($scope.groupCifList, function (item) {
                            GetExistingLoanListByGroupCif(token, item.AssociatedCifNo);
                        });
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message, response.data.output);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetGroupCifByCustomerCif " + e);
            }

        };

        function GetExistingLoanListByGroupCif(token, cif) {
            try {
                $http({
                    url: "/ApiCallingFromCBS/GetCustomerCurrentPositionOfLoan",
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
                        $scope.dataList = response.data.output;
                        console.log($scope.dataList);
                        $scope.groupExistingLoanList.push($scope.dataList);
                        console.log($scope.groupExistingLoanList);
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.data.message, response.data.output);
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetCurrentPositionOfLoan " + e);
            }

        };

        $scope.calculateColumnTotal = function (property, group) {
            var total = 0;
            angular.forEach(group, function (item) {
                total += parseFloat(item[property]) || 0;
            });
            return total;
        };

        $scope.calculateSubtotal = function (property, group) {
            var subtotal = 0;
            angular.forEach(group, function (item) {
                subtotal += parseFloat(item[property]) || 0;
            });
            return subtotal;
        };

        $scope.calculateGrandTotal = function (property) {
            var grandTotal = 0;
            angular.forEach($scope.groupExistingLoanList, function (group) {
                grandTotal += $scope.calculateSubtotal(property, group);
            });
            return grandTotal;
        };

        $scope.saveGroupExistingFacility = function () {
            var isValid = true;
            var groupFacilityList = [];
            // Check if Overdue, EMI, and Remarks fields are empty for each row
            for (var i = 0; i < $scope.groupExistingLoanList.length; i++) {
                var item = [];
                var item  = $scope.groupExistingLoanList[i];
                groupFacilityList.push(item[0]);
                if (!item[0].Overdue || !item[0].EMI || !item[0].Remarks) {
                    isValid = false;
                    dialogService.ConfirmDialogWithOkay('', "Please fill up all input fields for row " + (i + 1), null);
                    break; // Stop checking further rows if any row is invalid
                }
            }
            if (isValid) {
                var clientprofileId = $scope.cPId;
                if (!Boolean(clientprofileId))
                {
                    location.reload();
                }
                else
                {
                    $.ajax({
                        url: "/CPRV2/SaveGroupCifWiseExistingFacility",
                        method: "POST",
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-Type": "application/json;odata=verbose"
                        },
                        data: JSON.stringify({ groupExistingFacilityList: groupFacilityList, clientprofileId: clientprofileId }),

                        success: function (response) {
                            if (response.Result.success) {
                                dialogService.ConfirmDialogWithOkay('', response.Result.message);
                                GetAllSavedGroupExistingFacilityByCPId();
                            }
                            dialogService.ConfirmDialogWithOkay('', response.Result.message);
                            // You can handle success actions here
                        },
                        error: function (error) {
                            console.error("Save failed:", error);
                            // You can handle error actions here
                        }

                    });
                }

            }
        };

        function GetAllSavedGroupExistingFacilityByCPId() {
            try {
                var clientProfileId = $scope.cPId;
                $http({
                    url: "/CPRV2/GetAllGroupExistingFacilityByClient",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ clientProfileId: clientProfileId })
                }).then(function successCallback(response) {
                    if (response.data.Result.success) {
                        $scope.SavedGroupExistingFacilityList = response.data.Result.output;
                        console.log('GroupExistingFacilityList :' + $scope.SavedGroupExistingFacilityList);
                        console.log('GroupExistingFacilityList :' + response.data.Result.output);
                        if ($scope.SavedGroupExistingFacilityList.length > 0) {
                            $scope.isAlreadyGroupSaved = false;
                        } else {
                            $scope.isAlreadyGroupSaved = true;
                        }

                    }
                }, function errorCallback(response) {
                    $scope.error = response.data.Result.message;
                });
            } catch (e) {
                alert("Exception GetAllSavedGroupExistingFacilityByCPId " + e);
            }
        }

        $scope.saveGroupEdit = function (item) {
            // Save the edits and toggle back to view mode
            item.groupEditMode = false;
            // Proceed with your save logic, use $scope.SavedExistingFacilityList
            console.log("Saving edits:", item);
            $.ajax({
                url: "/CPRV2/UpdateGroupExistingFacility",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ groupExistingFacilityDto: item }),

                success: function (response) {
                    if (response.success) {
                        dialogService.ConfirmDialogWithOkay('', response.message);
                        GetAllSavedExistingFacilityByCPId();
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', response.message);
                    }
                },
                error: function (error) {
                    console.error("Save failed:", error);
                    // You can handle error actions here
                }
            });

        };


        $scope.toggleGroupEditMode = function (item) {
            // Toggle the edit mode for the specified columns
            item.groupEditMode = !item.groupEditMode;
        };


        function generateUniqueString() {
            var timestamp = new Date().getTime(); // get the current time
            var randomNumber = Math.floor(Math.random() * 1000000); // generate a random number
            var uniqueString = timestamp.toString() + randomNumber.toString(); // combine the two
            return uniqueString.substring(0, 14); // truncate the string to 14 digits
        }

        $scope.GetBorrowerProfileByCIFUsingConnectivity_ClickEvent = function (cif, main) {
            try {
                if ($scope.cprinit.legalform != null) {
                    if ($scope.cprinit.division != null && $scope.cprinit.division != '') {
                        $scope.searchCriteriaType = 'CIF';
                        $scope.searchCriteria = "";
                        // $scope.listSearchCustomer = [];
                        GetBorrowerProfileByCIF(cif, main);
                        //    GetBorrowerProfileByCIFUsingConnectivity(cif, main);
                        if (main)
                            $('#searchcustomercif').modal('toggle'); // close modal popup
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Please Select a Division");
                        if (main)
                            $('#searchcustomercif').modal('toggle'); // close modal popup
                    }
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Please Select a Legal Form");
                    if (main)
                        $('#searchcustomercif').modal('toggle'); // close modal popup
                }
            } catch (e) {
                alert("GetBorrowerProfileByCIFUsingConnectivity_ClickEvent " + e);
            }
        };

        $scope.GetBorrowerProfileByCIFforGurantor_ClickEvent = function (cif, main) {
            try {
                if ($scope.cprinit.legalform != null) {
                    if ($scope.cprinit.division != null && $scope.cprinit.division != '') {
                        $scope.searchCriteriaType = 'CIF';
                        $scope.searchCriteria = "";

                        GetBorrowerProfileByCIFUsingConnectivityForGurantor(cif, main);
                        // $scope.listSearchCustomer = [];
                        // GetBorrowerProfileByCIF(cif, main);
                        //    GetBorrowerProfileByCIFUsingConnectivity(cif, main);
                        if (main)
                            $('#searchcustomercif').modal('toggle'); // close modal popup
                    } else {
                        dialogService.ConfirmDialogWithOkay('', "Please Select a Division");
                        if (main)
                            $('#searchcustomercif').modal('toggle'); // close modal popup
                    }
                }
                else {
                    dialogService.ConfirmDialogWithOkay('', "Please Select a Legal Form");
                    if (main)
                        $('#searchcustomercif').modal('toggle'); // close modal popup
                }
            } catch (e) {
                alert("GetBorrowerProfileByCIFUsingConnectivity_ClickEvent " + e);
            }
        };

        //function GetBorrowerProfileByCIFUsingConnectivity(cif, main) {
        //    try {
        //        var validBorrower = true;
        //        if (main == false)
        //            common.preprocessload();
        //        else if (main == true & $scope.cprinit.cprno == 'Pending')
        //            common.preprocessload();

        //        var req = null;

        //        var bankType = cif.includes("T");
        //        if (bankType) {
        //            cif = cif.replace('T', '');
        //            req = {
        //                method: 'POST',
        //                url: common.connectivityUrl + '/api/BankBorrowerProfile?bankid=' + cif,
        //                headers: {
        //                    "Content-Type": undefined
        //                },
        //                data: {}
        //            };
        //        } else {
        //            req = {
        //                method: 'POST',
        //                url: common.connectivityUrl + '/api/BorrowerProfile?cif=' + cif,
        //                headers: {
        //                    "Content-Type": undefined
        //                },
        //                data: {}
        //            };
        //        }

        //        $http(req).then(function successCallback(response) {
        //            borrowerFound = false;
        //            if (response.data.success) {
        //                var output = response.data.output;
        //                if (output != null) {
        //                    if (main == true) {

        //                        if (output.personal == true && $scope.cprinit.business.name != "Individual") {
        //                            dialogService.ConfirmDialogWithOkay('', global._personshouldbeindividualmessage);
        //                            validBorrower = false;
        //                        }
        //                        else if (output.personal == false && $scope.cprinit.business.name == "Individual") {
        //                            dialogService.ConfirmDialogWithOkay('', global._personshouldnotbeindividualmessage);
        //                            validBorrower = false;
        //                        }

        //                    }

        //                    if (validBorrower) {
        //                        borrowerFound = true;
        //                        var cbscif = output.cbsCIF;
        //                        if ($scope.cprinit.cprno != 'Pending' && cbscif != '') {
        //                            SearchCustomerFromCBS("CIF", cbscif);
        //                        }

        //                        BindBorrowerProfile(output, main);
        //                        $scope.cprinit.groupId = output.groupId;
        //                        $scope.cprinit.groupName = output.groupName;

        //                    }

        //                } else {
        //                    dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
        //                }
        //            } else {
        //                dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
        //            }
        //            if (main == false)
        //                common.preprocesshide();
        //            else if (main == true & $scope.cprinit.cprno == 'Pending')
        //                common.preprocesshide();

        //        }, function errorCallback(response) {
        //            common.preprocesshide();
        //            $scope.error = response;
        //        });

        //    } catch (e) {
        //        common.preprocesshide();
        //        alert("GetBorrowerProfileUsingConnectivity " + e);

        //    }
        //}

        function GetBorrowerProfileByCIFUsingConnectivity(cif, main) {
            try {
                var validBorrower = true;
                if (main == false)
                    common.preprocessload();
                else if (main == true & $scope.cprinit.cprno == 'Pending')
                    common.preprocessload();
                var req = null;
                req = {
                    method: 'POST',
                    url: common.connectivityUrl + '/api/BorrowerProfile?cif=' + cif,
                    headers: {
                        "Content-Type": undefined
                    },
                    data: {}
                };

                $http(req).then(function successCallback(response) {
                    borrowerFound = false;
                    if (response.data.success) {
                        var output = response.data.output;
                        if (output != null) {
                            if (main == true) {

                                if (output.personal == true && $scope.cprinit.business.name != "Individual") {
                                    dialogService.ConfirmDialogWithOkay('', global._personshouldbeindividualmessage);
                                    validBorrower = false;
                                }
                                else if (output.personal == false && $scope.cprinit.business.name == "Individual") {
                                    dialogService.ConfirmDialogWithOkay('', global._personshouldnotbeindividualmessage);
                                    validBorrower = false;
                                }

                            }

                            if (validBorrower) {
                                borrowerFound = true;
                                var cbscif = output.cbsCIF;
                                if ($scope.cprinit.cprno != 'Pending' && cbscif != '') {
                                    SearchCustomerFromCBS("CIF", cbscif);
                                }

                                BindBorrowerProfile(output, main);
                                $scope.cprinit.groupId = output.groupId;
                                $scope.cprinit.groupName = output.groupName;

                            }

                        } else {
                            dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
                        }
                    } else {
                        dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
                    }
                    if (main == false)
                        common.preprocesshide();
                    else if (main == true & $scope.cprinit.cprno == 'Pending')
                        common.preprocesshide();

                }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;
                });


            } catch (e) {
                common.preprocesshide();
                alert("GetBorrowerProfileUsingConnectivity " + e);

            }
        }

        function GetBorrowerProfileByCIFUsingConnectivityForGurantor(cif, main) {
            try {
                var output = $scope.listSearchCustomer[0];

                SubmitCustomerForGurantor(output).then(function () {
                    var validBorrower = true;
                    if (main == false)
                        common.preprocessload();
                    else if (main == true & $scope.cprinit.cprno == 'Pending')
                        common.preprocessload();
                    var req = null;
                    req = {
                        method: 'POST',
                        url: common.connectivityUrl + '/api/BorrowerProfile?cif=' + cif,
                        headers: {
                            "Content-Type": undefined
                        },
                        data: {}
                    };

                    $http(req).then(function successCallback(response) {
                        borrowerFound = false;
                        if (response.data.success) {
                            var output = response.data.output;
                            if (output != null) {
                                if (main == true) {

                                    if (output.personal == true && $scope.cprinit.business.name != "Individual") {
                                        dialogService.ConfirmDialogWithOkay('', global._personshouldbeindividualmessage);
                                        validBorrower = false;
                                    }
                                    else if (output.personal == false && $scope.cprinit.business.name == "Individual") {
                                        dialogService.ConfirmDialogWithOkay('', global._personshouldnotbeindividualmessage);
                                        validBorrower = false;
                                    }

                                }

                                if (validBorrower) {
                                    borrowerFound = true;
                                    var cbscif = output.cbsCIF;
                                    if ($scope.cprinit.cprno != 'Pending' && cbscif != '') {
                                        SearchCustomerFromCBS("CIF", cbscif);
                                    }

                                    BindBorrowerProfile(output, main);
                                    $scope.cprinit.groupId = output.groupId;
                                    $scope.cprinit.groupName = output.groupName;

                                }

                            } else {
                                dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
                            }
                        } else {
                            dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
                        }
                        if (main == false)
                            common.preprocesshide();
                        else if (main == true & $scope.cprinit.cprno == 'Pending')
                            common.preprocesshide();

                    }, function errorCallback(response) {
                        common.preprocesshide();
                        $scope.error = response;
                    });
                });


            } catch (e) {
                common.preprocesshide();
                alert("GetBorrowerProfileUsingConnectivity " + e);

            }
        }

        function GetBorrowerProfileByCIF(cif, main) {
            try {
                var validBorrower = true;
                if (main == false)
                    common.preprocessload();
                else if (main == true & $scope.cprinit.cprno == 'Pending')
                    common.preprocessload();

                var output = $scope.listSearchCustomer[0];
                SubmitCustomer(output);
                //  $cookies.put('cusotmerData', output);
                if (output != null) {

                    if (validBorrower) {
                        borrowerFound = true;
                        /*                        var cbscif = cif;   */
                        //  BindBorrowerProfile(output, main);
                        BindBorrowerProfileForCustomer(output, main);
                        //$scope.cprinit.groupId = output.groupId;
                        //$scope.cprinit.groupName = output.groupName;
                        common.preprocesshide();
                    }

                } else {
                    dialogService.ConfirmDialogWithOkay('', global._recordnotfoundmessage);
                }

            } catch (e) {
                common.preprocesshide();
                alert("GetBorrowerProfileUsingConnectivity " + e);

            }
        }

        function SubmitCustomer(customer) {
            try {
                $scope.customer.identity = customer.IdNo;
                $scope.customer.registerNo = customer.IdNo;
                $scope.customer.personal = true;
                $scope.customer.cif = customer.CIF;
                $scope.customer.nic = customer.IdNo;
                $scope.customer.tin = customer.TIN;
                $scope.customer.customerdate = customer.DOB;
                $scope.customer.name = customer.FirstName + ' ' + (customer.MiddleName ? customer.MiddleName : '') + ' ' + (customer.LastName ? customer.LastName : '');

                $scope.customer.fathersName = customer.FatherName;
                $scope.customer.mothersName = customer.MotherName;
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

                    } else {
                        common.preprocesshide();

                    }
                }, function errorCallback(response) {
                    common.preprocesshide();

                });
            } catch (e) {
                alert('SubmitCustomer ' + e);
                common.preprocesshide();

            }
        };
        function SubmitCustomerForGurantor(customer) {
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

        $scope.GetBorrowerProfileByCIFUsingConnectivityForIntroducer_ClickEvent = function (borrower) {
            try {
                $scope.searchCriteriaType = 'CIF';
                $scope.searchCriteria = "";
                $scope.listSearchCustomer = [];
                $scope.cprinit.introducer = {
                    cif: borrower.CIF,
                    name: borrower.FirstName + ' ' + (borrower.MiddleName ? borrower.MiddleName : '') + ' ' + (borrower.LastName ? borrower.LastName : '')
                };
                $('#searchintroducer').modal('toggle'); // close modal popup
            } catch (e) {
                alert("GetBorrowerProfileByCIFUsingConnectivityForIntroducer_ClickEvent " + e);
            }
        };
        $scope.GetValuerByCIFUsingConnectivityService_ClickEvent = function (borrower) {
            try {
                $scope.searchCriteriaType = 'CIF';
                $scope.searchCriteria = "";
                $scope.listSearchCustomer = [];
                $scope.valuation.valuer = {
                    cif: borrower.CIF,
                    name: borrower.FirstName + ' ' + borrower.MiddleName + ' ' + borrower.LastName
                };
                $('#searchvaluer1').modal('toggle'); // close modal popup

            } catch (e) {
                alert("GetValuerByCIFUsingConnectivityService_ClickEvent " + e);
            }
        };

        $scope.GetValuerByCIFUsingConnectivityServiceNew_ClickEvent = function (cus) {
            try {
                if (cus != null && cus != undefined && cus != "") {
                    $scope.searchCriteriaType = 'CIF';
                    $scope.searchCriteria = "";
                    $scope.listSearchCustomer = [];
                    //$scope.valuation.valuer = {
                    //    cif: null,
                    //    name: cus
                    //};
                    var obj = {
                        id: cus.id,
                        designation: cus.designation,
                        name: cus.displayName,
                        active: true
                    };
                    if ($scope.valuersList == null || $scope.valuersList == undefined)
                        $scope.valuersList = [];

                    $scope.valuersList.push(obj);
                    $scope.customerpp = null;
                }

                //var object = JSON.stringify($scope.valuersList);
                //$scope.valuation.valuer = object;

                $scope.valuation.valuer = {
                    cif: null,
                    name: $scope.valuersList
                };

                //console.log($scope.valuation.valuer);
                //CreateValuerString();

                //$scope.valuation.valuer = 
                // $('#searchvaluer').modal('toggle'); // close modal popup

            } catch (e) {
                alert("GetValuerByCIFUsingConnectivityServiceNew_ClickEvent " + e);
            }
        };

        //function CreateValuerString()
        //{
        //    try {
        //        if ($scope.valuersList.length != 0)
        //        {
        //        }
        //    }
        //    catch (ex)
        //    {
        //        alert("Exception in CreateValuerString " + ex);
        //    }
        //}
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
        function RemoveIntroducerDependencies() {
            try {
                var copyFacilities = $scope.cprinit.listCPRFacilities;
                if ($scope.cprinit.introducer != null) {
                    dialogService.ShowDialog("Warning.", "Changes detected in Introducer Commission & Trial Amortization.");
                    $scope.cprinit.introducer = null;
                }

                if (copyFacilities != null) {
                    angular.forEach(copyFacilities, function (val) {
                        if (val.introducerCommissionModel != null) {
                            val.introducerCommissionModel.active = false;
                            $scope.listCPRIntroducerCommission = [];
                            $scope.listCPRIntroducerCommission.push(val.introducerCommissionModel);
                            IntroducerCommissionFacilityNoGenerate();
                        }

                        if (val.trialCalculation != null) {
                            if (val.trialCalculation.listTrialAmortization != null) {
                                angular.forEach(val.trialCalculation.listTrialAmortization, function (val2) {
                                    if (val2.feeType == 'Introducer Fee') {
                                        val2.isApply = false;
                                        val2.fee = 0;
                                        val2.amortize = false;
                                        val2.amortizedInterest = 0;
                                        val2.recurringFee = 0;
                                    }

                                });
                            }
                        }

                    });

                    console.log(copyFacilities);
                    $scope.cprinit.listCPRFacilities = copyFacilities;
                }

            } catch (e) {
                alert("RemoveIntroducerDependencies " + e);
            }
        };
        $scope.RemoveValuer_ClickEvent = function (list, item) {
            try {
                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete " + item.name + " ?").then(function (answer) {
                    if (answer) {
                        var index = $scope.valuersList.indexOf(item);
                        $scope.valuersList.splice(index, 1);
                    }
                    else
                        return false;
                }, function () {
                    return false;
                })
            }
            catch (ex) {
                alert("Exception in RemoveValuer_ClickEvent " + ex);
            }
        }
        $scope.SelectSecondaryApplicant_ChangeEvent = function (joint) {
            try {
                $scope.defaultTab = false;
                SelectSecondaryApplicant(joint);
                ReinitiateSession();
            } catch (e) {
                alert("SelectSecondaryApplicant_ChangeEvent " + e);
            }
        };
        $scope.AddDocumentChecklist_ClickEvent = function () {

            try {
                $scope.listDocumentChecklist.push({
                    id: '',
                    documentType: null,
                    url: "",
                    documentName: null,
                    issuingAuthority: null,
                    issueDate: null,
                    validity: null,
                    remark: null,
                    active: true,
                    uploaded: false
                });
            } catch (e) {
                alert("AddDocumentChecklist_ClickEvent " + e);
            }
        };
        $scope.UploadDocumentChecklist_ClickEvent = function () {
            try {
                var count = 0;
                angular.forEach($scope.listDocumentChecklist, function (value, index) {
                    indexAdopt = index + 1;
                    var fileUploader = document.getElementById("ChecklistFileUploader" + index);
                    if (fileUploader.files[0] == null)
                        count++;
                });
                if (indexAdopt == count)
                    dialogService.ConfirmDialogWithOkay('', "PLEASE ENTER A FILE TO BE UPLOAD!");
                else
                    UploadDocumentChecklist();
            } catch (e) {
                alert("UploadDocumentChecklist " + e);
            }
        };

        $scope.RemoveBorrowerProfile_ClickEvent = function (borrowerProfile, joint) {
            try {
                RemoveBorrowerProfile(borrowerProfile, joint);
            } catch (e) {
                alert("RemoveBorrowerProfile_ClickEvent " + e);
            }
        };
        $scope.CopyCPR_ClickEvent = function () {
            try {
                dialogService.CustomDialog("CopyCPR"
                    , CopyCPRController);
            } catch (e) {
                alert("CopyCPR_ClickEvent " + e);
            }
        };

        $scope.ChooseRenewalEnhancement = function (type) {
            try {
                if (type.action !== "New") {
                    common.cprInitiationType = type.action;
                    $scope.CopyCPR_ClickEvent();
                }
                else {
                    common.cprInitiationType = type.action;
                }
            } catch (e) {
                alert("ChooseRenewalEnhancement " + e);
            }
        };

        $scope.AddFamilyBackground_ClickEvent = function () {
            try {
                if ($scope.familyBackgroundModel.age == 0) {
                    dialogService.ConfirmDialogWithOkay('', "Please enter valid age");
                }
                else {
                    if (ValidateFamilyBackground()) {

                        AddFamilyBackground();
                    }
                    else {
                        $scope.addFamilyBackgroundBtn = false;
                    }
                }

            }
            catch (ex) {
                alert("Exception in AddFamilyBackground_ClickEvent " + ex);
            }
        };
        $scope.AddStakeholderFamilyBackground_ClickEvent = function () {
            try {
                if (ValidateStakeholderFamilyBackground()) {
                    AddStakeholderFamilyBackground();
                }
                else {
                    $scope.addStakeholderFamilyBackgroundBtn = false;
                }
            }
            catch (ex) {
                alert("Exception in AddFamilyBackground_ClickEvent " + ex);
            }
        };

        $scope.AddEmploymentDetails_ClickEvent = function () {
            try {
                AddEmploymentDetails();
            }
            catch (ex) {
                alert("Exception in AddEmploymentDetails_ClickEvent " + ex);
            }
        };

        $scope.AddStakeholderEmploymentDetails_ClickEvent = function () {
            try {
                AddStakeholderEmploymentDetails();
            }
            catch (ex) {
                alert("Exception in AddEmploymentDetails_ClickEvent " + ex);
            }
        };

        function ValidYear(currentyear, projectYear) {
            if (currentyear === projectYear) {
                dialogService.ConfirmDialogWithOkay('', "Current Year and Project Year cannot be the same!");
                return true;
            }
            else if ((currentyear > projectYear) && projectYear != 0) {
                dialogService.ConfirmDialogWithOkay('', "Project year must greater than Current year!");
                return true;
            }
            else {
                return false;
            }
        }


        $scope.CheckLimitedCompanies_Clickevent = function (current, project, isCurrent) {
            try {
                if (ValidYear(current, project)) {
                    if (isCurrent === "Current") {
                        $scope.limitedCompaniesModel.currentyear = 0;
                    }
                    else {
                        $scope.limitedCompaniesModel.projectYear = 0;
                    }
                }
            }
            catch (ex) {
                alert("Exception in CheckLimitedCompanies_Clickevent " + ex);
            }
        }
        $scope.CheckCashFlow_Clickevent = function (current, project, isCurrent) {
            try {
                if (ValidYear(current, project)) {
                    if (isCurrent === "Current") {
                        $scope.borrowerprofile.cashFlowAnalysis.currentyear = 0;
                    }
                    else {
                        $scope.borrowerprofile.cashFlowAnalysis.projectYear = 0;
                    }
                }
            }
            catch (ex) {
                alert("Exception in CheckLimitedCompanies_Clickevent " + ex);
            }
        }
        $scope.CheckBusinessInvestment_Clickevent = function (current, project, isCurrent) {
            try {
                if (ValidYear(current, project)) {
                    if (isCurrent === "Current") {
                        $scope.cprinit.investmentInBusinessModel.year = 0;
                    }
                    else {
                        $scope.cprinit.investmentInBusinessModel.projectedYear = 0;
                    }
                }
            }
            catch (ex) {
                alert("Exception in CheckBusinessInvestment_Clickevent " + ex);
            }
        }

        $scope.CheckKeyRatios_Clickevent = function (current, project, isCurrent) {
            try {
                if (ValidYear(current, project)) {
                    if (isCurrent === "Current") {
                        $scope.keyRatiosModel.currentYear = 0;
                    }
                    else {
                        $scope.keyRatiosModel.projectYear = 0;
                    }
                }
            }
            catch (ex) {
                alert("Exception in CheckKeyRatios_Clickevent " + ex);
            }
        }

        $scope.CheckFinancialStatment_Clickevent = function (year1, year2, year3, isCurrent) {
            try {
                if (year1 != 0 && year2 != 0 && year3 != 0) {
                    if (year1 == year2) {
                        if (isCurrent === "Current") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year1 = 0;

                        }
                        else if (isCurrent === "Project") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year2 = 0;
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                    }
                    else if (year2 == year3) {
                        if (isCurrent === "Current") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year1 = 0;

                        }
                        else if (isCurrent === "Project") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year2 = 0;
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                    }
                    if (year1 == year3) {
                        if (isCurrent === "Current") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year1 = 0;

                        }
                        else if (isCurrent === "Project") {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year2 = 0;
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                            $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                        }
                    }

                    //if ((year1 == year2) || (year2 == year3) || (year1 == year3)) {
                    //    if (isCurrent === "Current") {
                    //        dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                    //        $scope.borrowerprofile.businessPerformanceAnalysis.year1 = 0;

                    //    }
                    //    else if (isCurrent === "Project") {
                    //        dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                    //        $scope.borrowerprofile.businessPerformanceAnalysis.year2 = 0;
                    //        $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                    //    }
                    //    else
                    //    {
                    //        dialogService.ConfirmDialogWithOkay('', "Year selection must be different to each other!");
                    //        $scope.borrowerprofile.businessPerformanceAnalysis.year3 = 0;
                    //    }
                    //}
                }
            }
            catch (ex) {
                alert("Exception in CheckFinancialStatment_Clickevent " + ex);
            }
        }

        $scope.CheckAddFamilyBackgrounButton = function () {
            try {
                if (ValidateFamilyBackground()) {
                    $scope.addFamilyBackgroundBtn = true;
                }
                else {
                    $scope.addFamilyBackgroundBtn = false;
                }
            }
            catch (ex) {
                alert("Exception in CheckAddFamilyBackgrounButton " + ex);
            }
        };
        $scope.CheckAddStakeholderFamilyBackgrounButton = function () {
            try {
                if (ValidateStakeholderFamilyBackground()) {
                    $scope.addStakeholderFamilyBackgroundBtn = true;
                }
                else {
                    $scope.addStakeholderFamilyBackgroundBtn = false;
                }
            }
            catch (ex) {
                alert("Exception in CheckAddFamilyBackgrounButton " + ex);
            }
        };
        function ValidateFamilyBackground() {
            try {

                if ($scope.familyBackgroundModel.familyMemberName == null || $scope.familyBackgroundModel.familyMemberName == '')
                    return false;
                if ($scope.familyBackgroundModel.nICOrCitizenshipNo == null || $scope.familyBackgroundModel.nICOrCitizenshipNo == '')
                    return false;
                if ($scope.familyBackgroundModel.relationship == null || $scope.familyBackgroundModel.relationship == '')
                    return false;
                if ($scope.familyBackgroundModel.address == null || $scope.familyBackgroundModel.address == '')
                    return false;
                //if ($scope.familyBackgroundModel.age == null || $scope.familyBackgroundModel.age == '' || $scope.familyBackgroundModel.age == 0)
                //    return false;
                else
                    return true;

            }
            catch (ex) {
                alert("Exception in ValidateFamilyBackground " + ex);
            }
        }
        function ValidateStakeholderFamilyBackground() {
            try {
                if ($scope.stakeholderFamily.nICOrCitizenshipNo === null)
                    return false;
                if ($scope.stakeholderFamily.relationship === null)
                    return false;

                //if ($scope.familyBackgroundModel.dOB === null)
                //    return false;
                if ($scope.stakeholderFamily.address === null)
                    return false;
                else
                    return true;
            }
            catch (ex) {
                alert("Exception in ValidateStakeholderFamilyBackground " + ex);
            }
        }
        $scope.EditFamilyBackground_ClickEvent = function (list, request) {
            try {
                if (request !== null) {
                    if ($scope.familyBackgroundModel.relationship !== null) {
                        if (confirm("Please add it to the grid before editing")) {
                            return false;
                        }
                        return false;
                    }
                    else {
                        $scope.familyBackgroundModel = request;
                        var index = list.indexOf(request);
                        $scope.addFamilyBackgroundBtn = true;
                        return list.splice(index, 1);
                    }
                }
            }
            catch (ex) {
                alert("Exception in EditFamilyBackground_ClickEvent " + ex);
            }
        };

        $scope.EditStakeholderFamilyBackground_ClickEvent = function (list, request) {
            try {
                if (request !== null) {
                    if ($scope.stakeholderFamily.relationship !== null) {
                        if (confirm("Please add it to the grid before editing")) {
                            return false;
                        }
                        return false;
                    }
                    else {
                        $scope.stakeholderFamily = request;
                        var index = list.indexOf(request);
                        $scope.addStakeholderFamilyBackgroundBtn = true;
                        return list.splice(index, 1);
                    }
                }
            }
            catch (ex) {
                alert("Exception in EditStakeholderFamilyBackground_ClickEvent " + ex);
            }
        };

        $scope.RemoveFamilyBackground_ClickEvent = function (list, item) {
            try {
                if (item !== null || list !== null) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                        if (answer) {
                            //Delete Employment
                            if (item.listClientFamilyEmployment != null && item.listClientFamilyEmployment.length > 0) {
                                angular.forEach(item.listClientFamilyEmployment, function (value) {
                                    if (value.id != null || value.id != 0)
                                        RemoveEmploymentDetails(item.listClientFamilyEmployment, value);
                                });
                            }

                            var index = list.indexOf(item);
                            if (item.id !== 0) {
                                list[index].active = false;
                            }
                            else if (item.id === 0) {
                                list.splice(index, 1);
                            }
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    });
                }
            }
            catch (ex) {
                alert("Exception in RemoveFamilyBackground_ClickEvent " + ex);
            }
        };

        $scope.RemoveStakeholderFamilyBackground_ClickEvent = function (list, item) {
            try {
                if (item !== null || list !== null) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                        if (answer) {
                            //Delete Employment
                            if (item.listClientStakeHolderFamilyEmployment != null && item.listClientStakeHolderFamilyEmployment.length > 0) {
                                angular.forEach(item.listClientStakeHolderFamilyEmployment, function (value) {
                                    if (value.id != null || value.id != 0)
                                        RemoveStakeholderEmploymentDetails(item.listClientStakeHolderFamilyEmployment, value);
                                });
                            }

                            var index = list.indexOf(item);
                            if (item.id !== 0) {
                                list[index].active = false;
                            }
                            else if (item.id === 0) {
                                list.splice(index, 1);
                            }
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    });
                }
            }
            catch (ex) {
                alert("Exception in RemoveStakeholderFamilyBackground_ClickEvent " + ex);
            }
        };

        $scope.ResetFamilyBackground_ClickEvent = function () {
            ResetFamilyBackgroundModel();
        };

        $scope.ResetStakeholderFamilyBackground_ClickEvent = function () {
            ResetStakeholderFamilyBackgroundModel();
        };

        function AddFamilyBackground() {
            try {
                if ($scope.borrowerprofile.personal === true) {
                    if ($scope.borrowerprofile.individual.listClientFamily == null) {
                        $scope.borrowerprofile.individual.listClientFamily = [];
                    }
                    $scope.borrowerprofile.individual.listClientFamily.push($scope.familyBackgroundModel);
                    // ResetEmploymentDetailsModel();
                    ResetFamilyBackgroundModel();
                }

            }
            catch (ex) {
                alert("Exception in AddFamilyBackground " + ex);
            }
        }
        function AddStakeholderFamilyBackground() {
            try {
                if ($scope.borrowerprofile.personal === false) {
                    if ($scope.secondarystakeholder.listClientStakeHolderFamily == null) {
                        $scope.secondarystakeholder.listClientStakeHolderFamily = [];
                    }
                    $scope.secondarystakeholder.listClientStakeHolderFamily.push($scope.stakeholderFamily);
                    ResetStakeholderEmploymentDetailsModel();
                    ResetStakeholderFamilyBackgroundModel();
                }

            }
            catch (ex) {
                alert("Exception in AddFamilyBackground " + ex);
            }
        }
        //Employment Details

        $scope.employmentDetailsModel = {
            id: 0,
            employerName: null,
            currentdesignation: null,
            employmentstatus: null,
            employmentaddress: null,
            lengthinservice: null,
            totalemploymentexperince: null,
            landline: null,
            mobile: null,
            email: null,
            active: true
        };

        $scope.stakeholderEmployment = {
            id: 0,
            employerName: null,
            currentdesignation: null,
            employmentstatus: null,
            employmentaddress: null,
            lengthinservice: null,
            totalemploymentexperince: null,
            landline: null,
            mobile: null,
            email: null,
            active: true
        };

        function AddEmploymentDetails() {
            try {
                if ($scope.employmentDetailsModel.employerName != null && $scope.employmentDetailsModel.currentdesignation != null) {
                    if ($scope.familyBackgroundModel.listClientFamilyEmployment == null)
                        $scope.familyBackgroundModel.listClientFamilyEmployment = [];
                    $scope.familyBackgroundModel.listClientFamilyEmployment.push($scope.employmentDetailsModel);
                    ResetEmploymentDetailsModel();
                }
            }
            catch (ex) {
                alert("Exception in AddFamilyBackground " + ex);
            }
        }

        function AddStakeholderEmploymentDetails() {
            try {
                if ($scope.stakeholderEmployment != null && $scope.stakeholderEmployment.employerName != null && $scope.stakeholderEmployment.employerName != "" && $scope.stakeholderEmployment.currentdesignation != null && $scope.stakeholderEmployment.currentdesignation != "") {
                    if ($scope.stakeholderFamily.listClientStakeHolderFamilyEmployment == null)
                        $scope.stakeholderFamily.listClientStakeHolderFamilyEmployment = [];
                    $scope.stakeholderFamily.listClientStakeHolderFamilyEmployment.push($scope.stakeholderEmployment);
                    ResetStakeholderEmploymentDetailsModel();
                } else {
                    if ($scope.stakeholderEmployment == null) {
                        dialogService.ConfirmDialogWithOkay('', "Please fill the Employment Details!");
                    }
                    else if ($scope.stakeholderEmployment.employerName == null || $scope.stakeholderEmployment.employerName == "") {
                        dialogService.ConfirmDialogWithOkay('', "Please fill the Employer name!");
                    }
                    else if ($scope.stakeholderEmployment.currentdesignation == null || $scope.stakeholderEmployment.currentdesignation == "") {
                        dialogService.ConfirmDialogWithOkay('', "Please fill the Current Designation !");
                    }

                }
            }
            catch (ex) {
                alert("Exception in AddFamilyBackground " + ex);
            }
        }
        function BindEmploymentDetailsValues(list, item) {
            try {
                var index = $scope.familyBackgroundModel.listClientFamilyEmployment.indexOf(item);
                if (item.id == 0 || item.id == null) {
                    $scope.employmentDetailsModel = $scope.familyBackgroundModel.listClientFamilyEmployment[index];

                }
                else {
                    $scope.employmentDetailsModel = GetListItemById($scope.familyBackgroundModel.listClientFamilyEmployment, item.id);
                }
                if (list != null)
                    common.RemoveItemFromList(list, item, false);
            } catch (e) {
                alert("Exception BindEmploymentDetailsValues " + e);
            }
        }
        function BindStakeholderEmploymentDetailsValues(list, item) {
            try {
                var index = $scope.stakeholderFamily.listClientStakeHolderFamilyEmployment.indexOf(item);
                if (item.id == 0 || item.id == null) {
                    $scope.stakeholderEmployment = $scope.stakeholderFamily.listClientStakeHolderFamilyEmployment[index];

                }
                else {
                    $scope.stakeholderEmployment = GetListItemById($scope.stakeholderFamily.listClientStakeHolderFamilyEmployment, item.id);
                }
                if (list != null)
                    common.RemoveItemFromList(list, item, false);
            } catch (e) {
                alert("Exception BindStakeholderEmploymentDetailsValues " + e);
            }
        }
        $scope.ResetEmploymentDetails_ClickEvent = function () {
            try {
                ResetEmploymentDetailsModel();
            }
            catch (ex) {
                alert("Exception in ResetEmploymentDetails_ClickEvent " + ex);
            }
        };

        $scope.ResetStakeholderEmploymentDetails_ClickEvent = function () {
            try {
                ResetStakeholderEmploymentDetailsModel();
            }
            catch (ex) {
                alert("Exception in ResetStakeholderEmploymentDetails_ClickEvent " + ex);
            }
        };
        $scope.RemoveEmploymentDetails_ClickEvent = function (list, item) {
            if (item !== null || list !== null) {
                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                    if (answer) {
                        RemoveEmploymentDetails(list, item);
                    }
                    else
                        return false;
                }, function () {
                    return false;
                });
            }
        };

        $scope.RemoveStakeholderEmploymentDetails_ClickEvent = function (list, item) {
            if (item !== null || list !== null) {
                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                    if (answer) {
                        RemoveStakeholderEmploymentDetails(list, item);
                    }
                    else
                        return false;
                }, function () {
                    return false;
                });
            }
        };

        $scope.RemoveStakeholderEmploymentDetails_ClickEvent = function (list, item) {
            if (item !== null || list !== null) {
                dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                    if (answer) {
                        RemoveStakeholderEmploymentDetails(list, item);
                    }
                    else
                        return false;
                }, function () {
                    return false;
                });
            }
        };

        function RemoveEmploymentDetails(list, item) {
            try {
                var index = list.indexOf(item);
                if (item.id !== 0) {
                    list[index].active = false;
                }
                else if (item.id === 0) {
                    list.splice(index, 1);
                }
            }
            catch (ex) {
                alert("Exception in RemoveEmploymentDetails " + ex);
            }
        }

        function RemoveStakeholderEmploymentDetails(list, item) {
            try {
                var index = list.indexOf(item);
                if (item.id !== 0) {
                    list[index].active = false;
                }
                else if (item.id === 0) {
                    list.splice(index, 1);
                }
            }
            catch (ex) {
                alert("Exception in RemoveStakeholderEmploymentDetails " + ex);
            }
        }

        $scope.EditEmploymentDetails_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    BindEmploymentDetailsValues(list, item);
                }
            } catch (e) {
                alert("Exception EditEmploymentDetails_ClickEvent " + e);
            }
        };

        $scope.EditStakeholderEmploymentDetails_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    BindStakeholderEmploymentDetailsValues(list, item);
                }
            } catch (e) {
                alert("Exception EditStakeholderEmploymentDetails_ClickEvent " + e);
            }
        };

        $scope.AddStakeholderFamilyBackgroundBtn_ClickEvent = function () {
            try {
                AddStakeholderFamilyBackground();
            }
            catch (ex) {
                alert("Exception in AddStakeholderFamilyBackgroundBtn_ClickEvent " + ex);
            }
        };

        $scope.ResetStakeholderFamilyBackgroundBtn_ClickEvent = function (item) {
            try {
                if (item.id == 0) {
                    ResetStakeholderFamilyBackground();
                }
            }
            catch (ex) {
                alert("Exception in ResetStakeholderFamilyBackgroundBtn_ClickEvent " + ex);
            }
        }

        function ResetStakeholderFamilyBackground() {
            $scope.stakeHolderFamilyBackgroundModel = {
                id: 0,
                profession: null,
                nameOfTheFamilyMember: null,
                relationship: null,
                educationalQualification: null,
                active: true
            }
        }
        $scope.EditSecondaryStakeHolderFamilyBackgroundTableItem_ClickEvent = function (list, item) {
            try {
                var index = $scope.stakeHolderFamilyBackgroundModelList.indexOf(item);
                //$scope.turnOverlist[index].active = false;
                $scope.stakeHolderFamilyBackgroundModel = item;
                $scope.stakeHolderFamilyBackgroundModelList.splice(index, 1);
            }
            catch (ex) {
                alert("Exception in EditSecondaryStakeHolderFamilyBackgroundTableItem_ClickEvent " + ex);
            }
        }
        $scope.RemoveSecondaryStakeHolderFamilyBackgroundTableItem_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete? ").then(function (answer) {
                        if (answer) {
                            if (item.id !== 0) {
                                var index = $scope.stakeHolderFamilyBackgroundModelList.indexOf(item);
                                $scope.stakeHolderFamilyBackgroundModelList[index].active = false;
                            }
                            else if (item.id === 0) {
                                var index = $scope.stakeHolderFamilyBackgroundModelList.indexOf(item);
                                $scope.stakeHolderFamilyBackgroundModelList.splice(index, 1);
                            }
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    })
                }
            }
            catch (ex) {
                alert("Exception in RemoveSecondaryStakeHolderFamilyBackgroundTableItem_ClickEvent " + ex);
            }
        }

        function ResetFamilyBackgroundModel() {
            try {
                $scope.familyBackgroundModel = {
                    id: 0,
                    cPRClientProfileId: 0,
                    nICOrCitizenshipNo: null,
                    dOB: null,
                    familyMemberName: null,
                    age: 0,
                    address: null,
                    active: true,
                    editor: 0,
                    modified: new (Date),
                    author: 0,
                    created: new (Date),
                    relationship: null,
                    deceased: false
                    // listClientFamilyEmployment: []
                };
                $scope.familyRelationship = null;
                $scope.form.familymembershipForm.$setUntouched();
                $scope.form.familymembershipForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ResetFamilyBackgroundModel " + ex);
            }
        }

        function ResetStakeholderFamilyBackgroundModel() {
            try {
                $scope.stakeholderFamily = {
                    id: 0,
                    clientStakeHolderId: 0,
                    nICOrCitizenshipNo: null,
                    dOB: null,
                    familyMemberName: null,
                    age: 0,
                    address: null,
                    active: true,
                    editor: 0,
                    modified: new (Date),
                    author: 0,
                    created: new (Date),
                    relationship: null,
                    deceased: false,
                    listClientStakeHolderFamilyEmployment: []
                };
            }
            catch (ex) {
                alert("Exception in ResetStakeholderFamilyBackgroundModel " + ex);
            }
        }

        function ResetEmploymentDetailsModel() {
            try {
                $scope.employmentDetailsModel = {
                    id: 0,
                    employerName: null,
                    currentdesignation: null,
                    employmentstatus: null,
                    employmentaddress: null,
                    lengthinservice: null,
                    totalemploymentexperince: null,
                    landline: null,
                    mobile: null,
                    email: null,
                    active: true
                };
            }
            catch (ex) {
                alert("Exception in ResetEmploymentDetailsModel " + ex);
            }
        }

        function ResetStakeholderEmploymentDetailsModel() {
            try {
                $scope.stakeholderEmployment = {
                    id: 0,
                    employerName: null,
                    currentdesignation: null,
                    employmentstatus: null,
                    employmentaddress: null,
                    lengthinservice: null,
                    totalemploymentexperince: null,
                    landline: null,
                    mobile: null,
                    email: null,
                    active: true
                };
            }
            catch (ex) {
                alert("Exception in ResetStakeholderEmploymentDetailsModel " + ex);
            }
        };


        $scope.GetEndingBalance = function () {
            var totalEndingBalance = 0;
            if ($scope.accountMovementTurnover != null)
                if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.beginningBalance) > 0 || parseFloat($scope.accountMovementTurnover.sumOfDebit) > 0) {
                    totalEndingBalance = parseFloat($scope.accountMovementTurnover.beginningBalance) + parseFloat($scope.accountMovementTurnover.sumOfDebit) - parseFloat($scope.accountMovementTurnover.sumOfCredit);
                    var totalwithcommas = formatNumber(totalEndingBalance);
                    $scope.accountMovementTurnover.endingBalance = totalEndingBalance;
                    return totalwithcommas;
                }
            return 0;
        };

        $scope.GetTotalAccountTurnOver = function () {
            var totalTurnover = 0;
            if ($scope.accountMovementTurnover != null)
                if (parseFloat($scope.accountMovementTurnover.sumOfCredit) > 0 || parseFloat($scope.accountMovementTurnover.sanctionedLimit) > 0) {
                    totalTurnover = parseFloat($scope.accountMovementTurnover.sumOfCredit) / parseFloat($scope.accountMovementTurnover.sanctionedLimit);
                    var totalwithcommas = formatNumber(totalTurnover);
                    $scope.accountMovementTurnover.accountTurnover = totalwithcommas;
                    return totalwithcommas;
                }
            return 0;
        };

        $scope.RemoveItemLTDCompany_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = list.indexOf(item);

                    if ((list[index].currentYearFunds !== null && list[index].currentYearFunds !== undefined && list[index].currentYearFunds !== "") || (list[index].projectYearFunds !== null && list[index].projectYearFunds !== undefined && list[index].projectYearFunds !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete data for - " + item.typeName).then(function (answer) {
                            if (answer) {
                                list[index].currentYearFunds = 0;
                                list[index].projectYearFunds = 0;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        })
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.typeName)
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveItemLTDCompany_ClickEvent " + ex);
            }
        };

        $scope.DeleteItemLTDCompany_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    //var index = list.indexOf(item);
                    var index = $scope.limitedCompaniesModel.limitedCompanyAnalysisList.indexOf(item);
                    if ((list[index].currentYearFunds !== null && list[index].currentYearFunds !== undefined && list[index].currentYearFunds !== "") || (list[index].projectYearFunds !== null && list[index].projectYearFunds !== undefined && list[index].projectYearFunds !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete Item - " + item.typeName).then(function (answer) {
                            if (answer) {
                                $scope.limitedCompaniesModel.limitedCompanyAnalysisList[index].active = false;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.typeName)
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveItemLTDCompany_ClickEvent " + ex);
            }
        };
        $scope.RemoveKeyRatios_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = $scope.keyRatiosModel.keyRatioInputTypeModelList.indexOf(item);

                    dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete - " + item.typeName).then(function (answer) {
                        if (answer) {
                            $scope.keyRatiosModel.keyRatioInputTypeModelList[index].active = false;
                        }
                        else
                            return false;
                    }, function () {
                        return false;
                    })
                }
            }
            catch (ex) {
                alert("Exception in RemoveKeyRatios_ClickEvent " + ex);
            }
        };

        $scope.RemoveRiskAnalysis_ClickEvent = function (list, item) {
            try {
                if (item !== null) {
                    var index = list.indexOf(item);

                    if ((list[index].description !== null && list[index].description !== undefined && list[index].description !== "") && (list[index].mitigate !== null && list[index].mitigate !== undefined && list[index].mitigate !== "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete description and mitigate for - " + item.typeName).then(function (answer) {
                            if (answer) {
                                list[index].description = null;
                                list[index].mitigate = null;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        })
                    }
                    else if ((list[index].description !== null && list[index].description !== undefined && list[index].description !== "") && (list[index].mitigate === null || list[index].mitigate === undefined || list[index].mitigate === "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete description for - " + item.typeName).then(function (answer) {
                            if (answer) {
                                list[index].description = null;
                                list[index].mitigate = null;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }
                    else if ((list[index].mitigate !== null && list[index].mitigate !== undefined && list[index].mitigate !== "") && (list[index].description === null || list[index].description === undefined || list[index].description === "")) {
                        dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete mitigate for - " + item.typeName).then(function (answer) {
                            if (answer) {
                                list[index].description = null;
                                list[index].mitigate = null;
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }
                    else {
                        dialogService.ConfirmDialogWithYesNo("", "There is nothing to delete in - " + item.typeName);
                    }
                }
            }
            catch (ex) {
                alert("Exception in RemoveRiskAnalysis_ClickEvent " + ex);
            }
        };
        //$scope.DeleteDataRiskAnalysis_ClickEvent = function (list, item) {
        //    try {
        //        if (item !== null) {
        //            var index = $scope.borrowerprofile.listriskAnalysis.indexOf(item);

        //            dialogService.ConfirmDialogWithYesNo("", "Are you sure you want to delete Risk Type - " + item.typeName).then(function (answer) {
        //                if (answer) {
        //                    $scope.borrowerprofile.listriskAnalysis[index].active = false;
        //                }
        //                else
        //                    return false;
        //            }, function () {
        //                return false;
        //            })
        //        }
        //    }
        //    catch (ex) {
        //        alert("Exception in DeleteDataRiskAnalysis_ClickEvent " + ex);
        //    }
        //}
        $scope.CheckContactDetails_ClickEvent = function () {
            try {
                if (true) {
                    $scope.ifcontactDetailsFilled = true;
                }
            }
            catch (ex) {
                alert("Exception in CheckContactDetails_ClickEvent " + ex);
            }
        };


        //francis
        $scope.ReInitiateCPR_ClickEvent = function (cprno) {
            if (cprno != null)
                $scope.cprinit.cprno = cprno;

            ReInitiateCPR(cprno);
        }
        $scope.DropdownReviewType_ChangeEvent = function (reviewType, list) {
            if (reviewType != null && !angular.isUndefined(list.firstReviewDate))
                DropdownReviewType(reviewType, list);
        }
        $scope.Natureofcustomer_ChangeEvent = function (natureofcustomer) {
            if (natureofcustomer != null && !angular.isUndefined(natureofcustomer))
                NatureOfCustomerChange(natureofcustomer);
        }
        function NatureOfCustomerChange(natureofcustomer) {
            try {
                if (natureofcustomer.natureofcustomer == 'Registered Business') {
                    natureofcustomer.businessEntity = null;
                }
                else if (natureofcustomer.natureofcustomer == 'Unregistered Business') {
                    natureofcustomer.businessEntity = null;
                }
                else if (natureofcustomer.natureofcustomer == 'Other Income Sources') {
                    natureofcustomer.OtherIncomeSourcesEntity = null;
                }

                $scope.borrowerprofile.individual = natureofcustomer;
            } catch (e) {
                alert("Exception NatureOfCustomerChange " + e);
            }
        };

        function ReInitiateCPR(cprno) {
            try {
                common.preprocessload();
                dialogService.Hide();
                $scope.copyCPRPanelModel = {
                    applicationDataCapture: true,
                    borrowerProfile: true,
                    facility: true,
                    security: true,
                    valuation: true,
                    scoreCard: true,
                    trialCalculation: true,
                    incomeAndExpenditure: true,
                    assets: true,
                    liabilities: true,
                    bankAccount: true,
                    cRIBUpload: true,
                    documentChecklist: true,
                    financialAnalysis: true,
                    taxInformation: true,
                    cRIBAnalysis: true,
                    businessProfie: true,
                    personalProposalLiability: true,
                    pastPerformanceBG: true,
                    totalExposure: true,
                    importExportPerformance: true,
                    industrialAnalysis: true,
                    essentialCodes: true,
                    liabilitiesSanctionHistory: true,
                    physicalExpansionGrowth: true,
                    workingCapital
                    //cprBorrowerExposure: true,
                    //accountPerformance: true,
                    //environmentalCategory: true,
                    //stockPosition: true,
                    //insuranceDetail:true

                };


                $http({
                    url: "/CPR/ReInitiateCPR",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ cPRModel: $scope.cprinit, copyCPRPanelModel: $scope.copyCPRPanelModel })
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', global._initiatecprmessage).then(function () {
                            window.location.href = common.cprRedirectUrl.replace("@cprno", response.data.output);
                        });
                    } else {
                        common.preprocesshide();
                        dialogService.ConfirmDialogWithOkay('', response.data.message);
                    }

                }, function errorCallback(response) {
                    common.preprocesshide();
                    $scope.error = response;
                });
            } catch (e) {
                alert("InitiateCopyCPR " + e);
            }
        };
        function DropdownReviewType(item, list) {
            try {
                var dateformat = new Date(list.firstReviewDate);
                if (item !== null && list.firstReviewDate !== null) {
                    if (item == "quarterly") {
                        var quaterDate = dateformat.setMonth(dateformat.getMonth() + 4);
                        list.nextReviewDate = new Date(quaterDate);
                    }
                    else if (item == "annually") {
                        var annualDate = dateformat.setMonth(dateformat.getMonth() + 12);
                        list.nextReviewDate = new Date(annualDate);
                    }
                }

            } catch (e) {
                alert("Exception DropdownReviewType " + e);
            }
        };


        //Fixed Asset
        $scope.AddFixedAssets_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprFixedAssetsList = $scope.cprFixedAssetsList || [];
                    if ($scope.cprFixedAssetsList.length > 0) {
                        $scope.cprFixedAssets.currentYear = $scope.cprFixedAssetsList[0].currentYear;
                        $scope.cprFixedAssets.projectYear = $scope.cprFixedAssetsList[0].projectYear;
                    }
                    if ($scope.netAssetsOfCompany != null) {
                        $scope.cprFixedAssets.netAssetsOfCompany = $scope.netAssetsOfCompany;
                    } else {
                        $scope.cprFixedAssets.netAssetsOfCompany = 0;
                    }

                    $scope.cprFixedAssetsList.push($scope.cprFixedAssets);
                    $scope.ResetFixedAssetTable_ClickEvent();
                    $scope.cprFixedAssets = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        items: '',
                        currentYear: '',
                        currentYearValue: '',
                        projectYear: '',
                        projectYearValue: '',
                        netAssetsOfCompany: '',
                        Active: true,
                        Author: '',
                        Created: '',
                        Editor: '',
                        Modified: ''
                    };
                    $scope.fixedAssetForm.$setUntouched();
                    $scope.fixedAssetForm.$setPristine();
                }

            } catch (e) {
                alert("AddFixedAssets_ClickEvent error" + e);
            }
        };
        $scope.ResetFixedAssetTable_ClickEvent = function () {
            $scope.cprFixedAssets = {
            };
            $scope.fixedAssetForm.$setUntouched();
            $scope.fixedAssetForm.$setPristine();
        };
        $scope.EditItemFromFixedAssetList = function (x) {
            try {
                if ($scope.cprFixedAssets == null)
                    $scope.cprFixedAssets = {};

                $scope.cprFixedAssets = x;

                var index = $scope.cprFixedAssetsList.indexOf(x);
                $scope.cprFixedAssetsList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromFixedAssetList" + e);
            }
        };
        //Management Borrowing Company
        $scope.AddManagementBorrowingCompany_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprManagementBorrowingCompany.Edu = '';
                    if ($scope.cprManagementBorrowingCompany.mSc) {
                        if ($scope.cprManagementBorrowingCompany.Edu.length < 1) {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + 'M.Sc';
                        } else {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + ',M.Sc';
                        }
                    }
                    if ($scope.cprManagementBorrowingCompany.bSc) {
                        if ($scope.cprManagementBorrowingCompany.Edu.length < 1) {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + 'B.Sc';
                        } else {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + ',B.Sc';
                        }
                    }
                    if ($scope.cprManagementBorrowingCompany.diploma) {
                        if ($scope.cprManagementBorrowingCompany.Edu.length < 1) {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + 'Diploma';
                        } else {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + ',Diploma';
                        }
                    }
                    if ($scope.cprManagementBorrowingCompany.other) {
                        if ($scope.cprManagementBorrowingCompany.Edu.length < 1) {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + 'Other';
                        } else {
                            $scope.cprManagementBorrowingCompany.Edu = $scope.cprManagementBorrowingCompany.Edu + ',Other';
                        }
                    }

                    $scope.cprManagementBorrowingCompanyList = $scope.cprManagementBorrowingCompanyList || [];
                    $scope.cprManagementBorrowingCompanyList.push($scope.cprManagementBorrowingCompany);
                    $scope.ResetManagementBorrowingCompanyTable_ClickEvent();
                    $scope.cprManagementBorrowingCompany = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        name: '',
                        designation: '',
                        mSc: false,
                        bSc: false,
                        diploma: false,
                        other: false,
                        experience: '',
                        responsibility: '',
                        Active: true,
                        Author: '',
                        Created: '',
                        Editor: '',
                        Modified: ''
                    };
                    $scope.managementOfCompanyForm.$setUntouched();
                    $scope.managementOfCompanyForm.$setPristine();
                }

            } catch (e) {
                alert("AddManagementBorrowingCompany_ClickEvent error" + e);
            }
        };
        $scope.ResetManagementBorrowingCompanyTable_ClickEvent = function () {
            $scope.cprManagementBorrowingCompany = {
            };
            $scope.managementOfCompanyForm.$setUntouched();
            $scope.managementOfCompanyForm.$setPristine();
        };
        $scope.EditItemFromManagementBorrowingCompanyList = function (x) {
            try {
                if ($scope.cprManagementBorrowingCompany == null)
                    $scope.cprManagementBorrowingCompany = {};

                $scope.cprManagementBorrowingCompany = x;

                var index = $scope.cprManagementBorrowingCompanyList.indexOf(x);
                $scope.cprManagementBorrowingCompanyList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromManagementBorrowingCompanyList" + e);
            }
        };

        //Employees In Company
        $scope.AddEmployeeInCompany_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprEmployeeInCompanyList = $scope.cprEmployeeInCompanyList || [];
                    $scope.cprEmployeeInCompanyList.push($scope.cprEmployeeInCompany);
                    $scope.ResetEmployeeInCompanyTable_ClickEvent();
                    $scope.cprEmployeeInCompany = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        name: '',
                        duty: '',
                        experience: '',
                        Active: true,
                        Author: '',
                        Created: '',
                        Editor: '',
                        Modified: ''
                    };
                    $scope.employeeInCompanyForm.$setUntouched();
                    $scope.employeeInCompanyForm.$setPristine();
                }

            } catch (e) {
                alert("AddEmployeeInCompany_ClickEvent error" + e);
            }
        };
        $scope.ResetEmployeeInCompanyTable_ClickEvent = function () {
            $scope.cprEmployeeInCompany = {
            };
            $scope.employeeInCompanyForm.$setUntouched();
            $scope.employeeInCompanyForm.$setPristine();
        };
        $scope.EditItemFromEmployeeInCompanyList = function (x) {
            try {
                if ($scope.cprEmployeeInCompany == null)
                    $scope.cprEmployeeInCompany = {};

                $scope.cprEmployeeInCompany = x;

                var index = $scope.cprEmployeeInCompanyList.indexOf(x);
                $scope.cprEmployeeInCompanyList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromLiabilitiesWithOtherBankList" + e);
            }
        };
        //Subsidiaries Company
        $scope.AddSubsidiaryCompanyDetails_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprSubsideries.owner = '';
                    angular.forEach($scope.subsidiaryOwners, function (value, key) {
                        if ($scope.cprSubsideries.owner == '') {
                            $scope.cprSubsideries.owner = $scope.cprSubsideries.owner + value;
                        } else {
                            $scope.cprSubsideries.owner = $scope.cprSubsideries.owner + ', ' + value;
                        }

                    });
                    $scope.cprSubsideriesList = $scope.cprSubsideriesList || [];
                    $scope.cprSubsideriesList.push($scope.cprSubsideries);
                    $scope.ResetSubsidiaryCompanyDetailsTable_ClickEvent();
                    $scope.cprSubsideries = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        name: '',
                        address: '',
                        owner: '',
                        natureOfBusiness: '',
                        active: true,
                        Author: '',
                        Created: '',
                        Editor: '',
                        Modified: ''
                    };
                    $scope.subsidiaryOwners = [];
                    $scope.subsideriesForm.$setUntouched();
                    $scope.subsideriesForm.$setPristine();
                }

            } catch (e) {
                alert("AddSubsidiaryCompanyDetails_ClickEvent error" + e);
            }
        };
        $scope.ResetSubsidiaryCompanyDetailsTable_ClickEvent = function () {
            $scope.cprSubsideries = {
            };
            $scope.subsidiaryOwners = [];
            $scope.subsideriesForm.$setUntouched();
            $scope.subsideriesForm.$setPristine();
        };
        $scope.EditItemFromSubsidiaryCompanyDetailsTList = function (x) {
            try {
                if ($scope.cprSubsideries == null)
                    $scope.cprSubsideries = {};

                $scope.cprSubsideries = x;
                var res = $scope.cprSubsideries.owner.split(",");
                $scope.subsidiaryOwners = res;
                var index = $scope.cprSubsideriesList.indexOf(x);
                $scope.cprSubsideriesList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromLiabilitiesWithOtherBankList" + e);
            }
        };
        //SubsidiaryOwners
        $scope.AddNewOwner = function () {
            var subOwnerDetails = $scope.subOwner + ' - ' + $scope.subOwnerAddress;
            $scope.subsidiaryOwners.push(subOwnerDetails);
            $scope.subOwner = '';
            $scope.subOwnerAddress = '';
        }
        $scope.RemoveNewOwner = function (x) {
            var index = $scope.subsidiaryOwners.indexOf(x);
            $scope.subsidiaryOwners.splice(index, 1);
        }

        //Liabilities with bank
        $scope.AddLiabilitiesWithBank_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprLiabilitiesList = $scope.cprLiabilitiesList || [];
                    $scope.cprLiabilitiesWB.withBank = true;
                    $scope.cprLiabilities = $scope.cprLiabilitiesWB;
                    $scope.cprLiabilitiesList.push($scope.cprLiabilities);
                    $scope.ResetLiabilitiesWithBankTable_ClickEvent();
                    $scope.cprLiabilities = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        withBank: true,
                        nameOfBank: '',
                        nameOfAccount: '',
                        natureOfFacility: '',
                        limit: 0,
                        expiryDate: '',
                        branch: '',
                        outStanding: 0,
                        overDue: 0,
                        classificationStatus: '',
                        replacementPlanOfIrregularLiability: '',
                        active: true,
                        author: '',
                        created: '',
                        editor: '',
                        modified: ''
                    };
                    $scope.cprLiabilitiesWB = $scope.cprLiabilities;
                    $scope.liabilitiesWithBankForm.$setUntouched();
                    $scope.liabilitiesWithBankForm.$setPristine();
                }

            } catch (e) {
                alert("AddLiabilitiesWithBank_ClickEvent error" + e);
            }
        };

        $scope.ResetLiabilitiesWithBankTable_ClickEvent = function () {
            $scope.cprLiabilities = {
            };
            $scope.cprLiabilitiesWB = {
            };
            $scope.liabilitiesWithBankForm.$setUntouched();
            $scope.liabilitiesWithBankForm.$setPristine();
        };
        $scope.EditItemFromLiabilitiesWithBankList = function (x) {
            try {
                if ($scope.cprLiabilities == null)
                    $scope.cprLiabilities = {};
                if ($scope.cprLiabilitiesWB == null)
                    $scope.cprLiabilitiesWB = {};

                $scope.cprLiabilitiesWB = x;

                var index = $scope.cprLiabilitiesList.indexOf(x);
                $scope.cprLiabilitiesList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromLiabilitiesWithOtherBankList" + e);
            }
        };

        //Liablities With Other Bank
        $scope.AddLiabilitiesWithOtherBank_ClickEvent = function () {
            try {
                if (checkBusinessProfileValidation()) {
                    $scope.cprLiabilitiesList = $scope.cprLiabilitiesList || [];
                    $scope.cprLiabilitiesWOB.withBank = false;
                    $scope.cprLiabilitiesWOB.overDue = 0;
                    $scope.cprLiabilities = $scope.cprLiabilitiesWOB;
                    $scope.cprLiabilitiesList.push($scope.cprLiabilities);
                    $scope.ResetLiabilitiesWithOtherBankTable_ClickEvent();
                    $scope.cprLiabilities = {
                        id: '',
                        cPRBusinessProfileInformationId: '',
                        withBank: true,
                        nameOfBank: '',
                        nameOfAccount: '',
                        natureOfFacility: '',
                        limit: 0,
                        expiryDate: '',
                        branch: '',
                        outStanding: 0,
                        overDue: 0,
                        classificationStatus: '',
                        replacementPlanOfIrregularLiability: '',
                        active: true,
                        author: '',
                        created: '',
                        editor: '',
                        modified: ''
                    };
                    $scope.cprLiabilitiesWOB = $scope.cprLiabilities;
                    $scope.liabilitiesWithOtherBankForm.$setUntouched();
                    $scope.liabilitiesWithOtherBankForm.$setPristine();
                }

            } catch (e) {
                alert("AddLiabilitiesWithOtherBank_ClickEvent error" + e);
            }
        };
        $scope.ResetLiabilitiesWithOtherBankTable_ClickEvent = function () {
            $scope.cprLiabilities = {
            };
            $scope.cprLiabilitiesWOB = {
            };
            $scope.liabilitiesWithOtherBankForm.$setUntouched();
            $scope.liabilitiesWithOtherBankForm.$setPristine();
        };
        $scope.EditItemFromLiabilitiesWithOtherBankList = function (x) {
            try {
                if ($scope.cprLiabilities == null)
                    $scope.cprLiabilities = {};
                if ($scope.cprLiabilitiesWOB == null)
                    $scope.cprLiabilitiesWOB = {};

                $scope.cprLiabilitiesWOB = x;

                var index = $scope.cprLiabilitiesList.indexOf(x);
                $scope.cprLiabilitiesList.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromLiabilitiesWithOtherBankList" + e);
            }
        };
        //$scope.AddLiabilitiesSectionHistory_ClickEvent = function () {
        //    try {
        //        $scope.borrowerprofile.listCPRLiabilitySanctionHistory = $scope.borrowerprofile.listCPRLiabilitySanctionHistory || [];
        //        $scope.borrowerprofile.listCPRLiabilitySanctionHistory.push($scope.cprLiabilitySanctionHistory);
        //        $scope.ResetLiabilitiesSectionHistory();

        //        $scope.sanctionHistoryForm1.$setUntouched();
        //        $scope.sanctionHistoryForm1.$setPristine();
        //    }
        //    catch (ex) {
        //        alert("Exception in LiabilitiesSectionHistory_ClickEvent " + ex);
        //    }
        //}

        //$scope.ResetLiabilitiesSectionHistory = function () {
        //    try {
        //        $scope.cprLiabilitySanctionHistory = {
        //            id: '',
        //            cPRClientProfileId: '',
        //            sactionHistory: '',
        //            facilityType: '',
        //            amount: 0,
        //            date: '',
        //            authority: '',
        //            expiry: '',
        //            sanctionType: '',
        //            remarks: '',
        //            boardMeetingNo: 0,
        //            boardMeetingDate: '',
        //            sanctionReferenceNo: '',
        //            active: true
        //        };
        //        $scope.sanctionHistoryForm1.$setUntouched();
        //        $scope.sanctionHistoryForm1.$setPristine();
        //    }
        //    catch (ex) {
        //        alert("Exception in LiabilitiesSectionHistory " + ex);
        //    }
        //}
        //$scope.AddStockPosition_ClickEvent = function (stockPosition) {
        //    try {
        //        if (!stockPosition.dateOfInspection || !stockPosition.item) {
        //            //validation
        //        } else {
        //            AddStockPosition_Function(stockPosition);
        //        }
        //    }
        //    catch (ex) {
        //        alert("Exception in ImportExport_ClickEvent " + ex);
        //    }
        //};
        //function AddStockPosition_Function(stockPosition) {
        //    try {
        //        if (angular.isUndefined($scope.cprinit.listcPRStockPosition) || $scope.cprinit.listcPRStockPosition === null)
        //            $scope.cprinit.listcPRStockPosition = [];

        //        $scope.cprinit.listcPRStockPosition.push(stockPosition);
        //        $scope.ResetStockPositionModel();

        //    } catch (e) {
        //        alert("Exception AddWaiverDetails_Function" + e);
        //    }
        //}
        //$scope.EditStockPostionList = function (x) {
        //    try {
        //        if ($scope.cPRStockPositionModel == null)
        //            $scope.cPRStockPositionModel = {};

        //        $scope.cPRStockPositionModel = x;
        //        var index = $scope.cprinit.listcPRStockPosition.indexOf(x);
        //        $scope.cprinit.listcPRStockPosition.splice(index, 1);

        //    } catch (e) {
        //        alert("Exception EditLiabilitySanctionHistoryList " + e);
        //    }
        //};
        //$scope.ResetStockPositionModel = function () {
        //    try {
        //        $scope.cPRStockPositionModel = {
        //            dateOfInspection: '',
        //            item: '',
        //            stockValue: '',
        //            margin: '',
        //            inspectedBy: '',
        //            active: true
        //        };
        //        $scope.stockPosition.$setUntouched();
        //        $scope.stockPosition.$setPristine();
        //    }
        //    catch (ex) {
        //        alert("Exception in LiabilitiesSectionHistory " + ex);
        //    }
        //}

        //  $scope.EditLiabilitySanctionHistoryList = function (x) {
        //    try {
        //          if ($scope.cprLiabilitySanctionHistory == null)
        //             $scope.cprLiabilitySanctionHistory = {};

        //        $scope.cprLiabilitySanctionHistory = x;

        //        var index = $scope.borrowerprofile.listCPRLiabilitySanctionHistory.indexOf(x);
        //        $scope.borrowerprofile.listCPRLiabilitySanctionHistory.splice(index, 1);

        //    } catch (e) {
        //        alert("Exception EditLiabilitySanctionHistoryList " + e);
        //    }
        //};
        $scope.ImportExport_ClickEvent = function () {
            try {
                $scope.cprinit.listimportExportPerformance = $scope.cprinit.listimportExportPerformance || [];

                $scope.cprinit.listimportExportPerformance.push($scope.importExportPerformance);
                $scope.ResetImportExport();

                $scope.importExportForm.$setUntouched();
                $scope.importExportForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ImportExport_ClickEvent " + ex);
            }
        };

        $scope.ResetImportExport = function () {
            try {
                $scope.importExportPerformance = {
                    id: null,
                    bankName: null,
                    accountNameNumber: null,
                    noOfImportLC: null,
                    importAmount: null,
                    noOfExportBill: null,
                    exportAmount: null,
                    active: true
                };
                $scope.importExportForm.$setUntouched();
                $scope.importExportForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ResetImportExport " + ex);
            }
        };
        $scope.EditImportExportList = function (x) {
            try {
                if ($scope.importExportPerformance == null)
                    $scope.importExportPerformance = {};

                $scope.importExportPerformance = x;

                var index = $scope.cprinit.listimportExportPerformance.indexOf(x);
                $scope.cprinit.listimportExportPerformance.splice(index, 1);

            } catch (e) {
                alert("Exception EditImportExportList " + e);
            }
        };
        // Particular Concerns ILCs
        $scope.ParticularConcerILCs_ClickEvent = function () {
            try {
                $scope.cprinit.listCPRParticularsConcernILCS = $scope.cprinit.listCPRParticularsConcernILCS || [];

                $scope.cprinit.listCPRParticularsConcernILCS.push($scope.cPRParticularsConcernILCS);
                $scope.ResetParticularsConcernILCS();

                $scope.particularConcernILCsForm.$setUntouched();
                $scope.particularConcernILCsForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ImportExport_ClickEvent " + ex);
            }
        };
        $scope.ResetParticularsConcernILCS = function () {
            try {
                $scope.cPRParticularsConcernILCS = {
                    id: 0,
                    cPRId: 0,
                    iLCNo: null,
                    lCAmount: 0.0,
                    beneficiary: null,
                    applicant: null,
                    issuingBranch: null,
                    active: true
                };
                $scope.particularConcernILCsForm.$setUntouched();
                $scope.particularConcernILCsForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ResetParticularsConcernILCS " + ex);
            }
        };
        $scope.EditParticularsConcernILCSList = function (x) {
            try {
                if ($scope.cPRParticularsConcernILCS == null)
                    $scope.cPRParticularsConcernILCS = {};

                $scope.cPRParticularsConcernILCS = x;

                var index = $scope.cprinit.listCPRParticularsConcernILCS.indexOf(x);
                $scope.cprinit.listCPRParticularsConcernILCS.splice(index, 1);

            } catch (e) {
                alert("Exception EditParticularsConcernILCSList " + e);
            }
        };
        //Particular Bills
        $scope.AddCPRParticularOfBills_ClickEvent = function () {
            try {
                $scope.cprinit.listCPRParticularOfBill = $scope.cprinit.listCPRParticularOfBill || [];

                $scope.cprinit.listCPRParticularOfBill.push($scope.particularOfBills);
                $scope.ResetParticularOfBills();

                $scope.particularOfBillsForm.$setUntouched();
                $scope.particularOfBillsForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in AddCPRParticularOfBills_ClickEvent " + ex);
            }
        };

        $scope.ResetParticularOfBills = function () {
            try {
                $scope.particularOfBills = {
                    id: 0,
                    cPRId: 0,
                    billNumberDate: '',
                    // billDate: '',
                    billAmountFC: 0,
                    billAmount: 0,
                    margin: 0,
                    iBPAmount: 0,
                    maturity: '',
                    active: true
                };
                $scope.particularOfBillsForm.$setUntouched();
                $scope.particularOfBillsForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in ResetParticularOfBills " + ex);
            }
        };
        $scope.EditParticularOfBillsList = function (x) {
            try {
                if ($scope.particularOfBills == null)
                    $scope.particularOfBills = {};

                $scope.particularOfBills = x;

                var index = $scope.cprinit.listCPRParticularOfBill.indexOf(x);
                $scope.cprinit.listCPRParticularOfBill.splice(index, 1);

            } catch (e) {
                alert("Exception EditParticularOfBillsList " + e);
            }
        };

        $scope.EditSecurityGuarantorList = function (x, a, b) {
            try {
                if ($scope.cPRSecurityGuarantor == null)
                    $scope.cPRSecurityGuarantor = {};

                $scope.cPRSecurityGuarantor = x;
                $scope.facility = a;
                $scope.securitytype = b;

            } catch (e) {
                alert("Exception EditSecurityGuarantorList " + e);
            }
        };

        $scope.AddPresentProposalLiabilityExisting_ClickEvent = function (cprPersonalProposalWithLiabilityExisting) {
            try {
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityExisting = $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityExisting || [];
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityExisting.push($scope.cprPersonalProposalWithLiabilityExisting);
                $scope.ResetPresentProposalLiabilitiesExisting();

                $scope.existingPresentProposalForm.$setUntouched();
                $scope.existingPresentProposalForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in Liabilities existing_ClickEvent " + ex);
            }
        }
        $scope.ResetPresentProposalLiabilitiesExisting = function () {
            try {

                $scope.cprPersonalProposalWithLiabilityExisting = {
                    id: '',
                    cPRClientProfileId: '',
                    limit: '',
                    marginHeld: '',
                    expiry: '',
                    netLiability: '',
                    outStanding: '',
                    interestRate: '',
                    active: true
                };
                $scope.existingPresentProposalForm.$setUntouched();
                $scope.existingPresentProposalForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in Reset Liabilities Existing " + ex);
            }
        }
        $scope.EditPresentProposalLiabilitiesExistingList = function (x) {
            try {

                if ($scope.cprPersonalProposalWithLiabilityExisting == null)
                    $scope.cprPersonalProposalWithLiabilityExisting = {};

                $scope.cprPersonalProposalWithLiabilityExisting = x;

                var index = $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityExisting.indexOf(x);
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityExisting.splice(index, 1);

            } catch (e) {
                alert("Exception EditPresentProposalLiabilitiesExistingList " + e);
            }
        };


        $scope.AddLiabilitiesProposed_ClickEvent = function () {
            try {
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed = $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed || [];
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed.push($scope.cPRPersonalProposalWithLiabilityProposed);
                $scope.ResetLiabilitiesProposed();
                $scope.liabilitiesProposedForm.$setUntouched();
                $scope.liabilitiesProposedForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in Liabilities existing_ClickEvent " + ex);
            }
        };
        $scope.ResetLiabilitiesProposed = function () {
            try {
                $scope.cPRPersonalProposalWithLiabilityProposed = {
                    id: 0,
                    limit: null,
                    expiry: null,
                    interestRate: null,
                    active: true
                }
                $scope.liabilitiesProposedForm.$setUntouched();
                $scope.liabilitiesProposedForm.$setPristine();
            }
            catch (ex) {
                alert("Exception in Reset Liabilities Proposed " + ex);
            }
        };

        $scope.EditCPRPersonalProposalWithLiabilityProposed_ClickEvent = function (x) {
            try {
                if ($scope.cPRPersonalProposalWithLiabilityProposed == null)
                    $scope.cPRPersonalProposalWithLiabilityProposed = {};

                $scope.cPRPersonalProposalWithLiabilityProposed = x;

                var index = $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed.indexOf(x);
                $scope.borrowerprofile.listCPRPersonalProposalWithLiabilityProposed.splice(index, 1);

            } catch (e) {
                alert("Exception EditCPRPersonalProposalWithLiabilityProposed_ClickEvent " + e);
            }
        };


        $scope.AddCPRPastPerformanceBG_ClickEvent = function () {
            try {
                $scope.borrowerprofile.listCPRPastPerformanceBG = $scope.borrowerprofile.listCPRPastPerformanceBG || [];
                $scope.borrowerprofile.listCPRPastPerformanceBG.push($scope.cPRPastPerformanceBG);
                $scope.ResetCPRPastPerformanceBGTable_ClickEvent();
                $scope.cPRPastPerformanceBG = {
                    id: '',
                    cPRClientProfileId: '',
                    bankName: '',
                    accountNameNumber: '',
                    facilityType: '',
                    year: '',
                    number: '',
                    amount: '',
                    active: true
                };
                $scope.pastPerformanceForm.$setUntouched();
                $scope.pastPerformanceForm.$setPristine();
            } catch (ex) {
                alert("AddCPRPastPerformanceBG_ClickEvent error" + e);
            }
        };
        $scope.ResetCPRPastPerformanceBGTable_ClickEvent = function () {
            $scope.cPRPastPerformanceBG = {
                id: '',
                cPRClientProfileId: '',
                bankName: '',
                accountNameNumber: '',
                facilityType: '',
                year: '',
                number: '',
                amount: '',
                active: true
            };
            $scope.pastPerformanceForm.$setUntouched();
            $scope.pastPerformanceForm.$setPristine();
        };
        $scope.EditCPRPastPerformanceBG_ClickEvent = function (x) {
            try {
                if ($scope.cPRPastPerformanceBG == null)
                    $scope.cPRPastPerformanceBG = {};

                $scope.cPRPastPerformanceBG = x;

                var index = $scope.borrowerprofile.listCPRPastPerformanceBG.indexOf(x);
                $scope.borrowerprofile.listCPRPastPerformanceBG.splice(index, 1);

            } catch (e) {
                alert("Exception EditCPRPersonalProposalWithLiabilityProposed_ClickEvent " + e);
            }
        };

        $scope.selectedQual = {
            QA: "",
        };
        //Individual education qualification
        $scope.AddIndividualEducationQualification_ClickEvent = function (item) {
            try {
                if (item != "") {
                    var pushItem = {
                        id: item.id,
                        dataId: 0,
                        qualification: item.qualification,
                        active: true
                    };
                    if ($scope.borrowerprofile.individual.listEducationQualification == null) {
                        $scope.borrowerprofile.individual.listEducationQualification = [];
                        $scope.borrowerprofile.individual.listEducationQualification.push(pushItem);

                    }
                    else {
                        var index = GetArrayIndexByValue($scope.borrowerprofile.individual.listEducationQualification, "id", item.id);
                        if (index == -1) {
                            $scope.borrowerprofile.individual.listEducationQualification.push(pushItem);

                        }
                    }
                } else {
                    dialogService.ConfirmDialogWithOkay('', "Please Select any Qualification First !")
                }

                $scope.selectedQual.QA = "";
            } catch (e) {
                alert("AddIndividualEducationQualification_ClickEvent error" + e);
            }
        };
        $scope.stakeHolderEducationalQualification = {
            QA: "",
        }
        //StakeHolder education qualification
        $scope.AddStakeHolderEducationQualification_ClickEvent = function (item) {
            try {
                var pushItem = {
                    id: item.id,
                    dataId: 0,
                    qualification: item.qualification,
                    active: true
                };
                if ($scope.secondarystakeholder.listEducationQualification == null) {
                    $scope.secondarystakeholder.listEducationQualification = [];
                    $scope.secondarystakeholder.listEducationQualification.push(pushItem);
                }
                else {
                    var index = GetArrayIndexByValue($scope.secondarystakeholder.listEducationQualification, "id", item.id);
                    if (index == -1)
                        $scope.secondarystakeholder.listEducationQualification.push(pushItem);
                }
                $scope.stakeHolderEducationalQualification.QA = "";
            } catch (e) {
                alert("AddStakeHolderEducationQualification_ClickEvent error" + e);
            }
        };

        //education qualification Management Borrowing Company
        $scope.AddManagementBorrowingCompanyQualification_ClickEvent = function () {
            try {
                $scope.cprManagementBorrowingCompany.listCPRManagementBorrowingCompanyQualification = $scope.cprManagementBorrowingCompany.listCPRManagementBorrowingCompanyQualification || [];
                $scope.cPRManagementBorrowingCompanyQualification.educationalQualificationId = $scope.cPRManagementBorrowingCompanyQualification.educationQualification.id;
                $scope.cprManagementBorrowingCompany.listCPRManagementBorrowingCompanyQualification.push($scope.cPRManagementBorrowingCompanyQualification);
                $scope.cPRManagementBorrowingCompanyQualification = {
                    id: 0,
                    cPRManagementBorrowingCompanyId: 0,
                    educationalQualificationId: 0,
                    active: true
                };
            } catch (e) {
                alert("AddBorrowerProfileEducationQualificationBtn_ClickEvent error" + e);
            }
        };

        //EducationQualification
        $scope.RemoveEducationQualification = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.dataId == null || item.dataId == "" || item.dataId == '')
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromGridList" + e);
            }
        };


        //Common
        $scope.RemoveItemFromGridList = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null || item.id == "" || item.id == '')
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromGridList" + e);
            }
        };
        $scope.RemoveItemFromSanctionHistory = function (list, item) {
            try {
                if (list != null && item != null) {
                    if (item.id == null)
                        common.RemoveItemFromList(list, item, true);
                    else
                        common.SetActiveFalseForRemovedItem(list, item);
                }
            } catch (e) {
                alert("Exception RemoveItemFromGridList" + e);
            }
        };
        function bindCPRBusinessProfileData() {
            try {
                if ($scope.cprFixedAssetsList != null) {
                    angular.forEach($scope.cprFixedAssetsList, function (value) {
                        if ($scope.netAssetsOfCompany != null) {
                            value.netAssetsOfCompany = $scope.netAssetsOfCompany;
                        } else {
                            value.netAssetsOfCompany = 0;
                        }

                    });

                    $scope.cprBusinessProfileInformation.listCPRFixedAssets = $scope.cprFixedAssetsList;

                }
                if ($scope.cprManagementBorrowingCompanyList != null) {
                    $scope.cprBusinessProfileInformation.listCPRManagementBorrowingCompany = $scope.cprManagementBorrowingCompanyList;
                }
                if ($scope.cprSubsideriesList != null) {
                    $scope.cprBusinessProfileInformation.listCPRSubsideries = $scope.cprSubsideriesList;
                }
                if ($scope.cprEmployeeInCompanyList != null) {
                    $scope.cprBusinessProfileInformation.listCPREmployeeInCompany = $scope.cprEmployeeInCompanyList;
                }
                if ($scope.cprLiabilitiesList != null) {
                    $scope.cprBusinessProfileInformation.listCPRLiabilities = $scope.cprLiabilitiesList;
                }
                if ($scope.cprBusinessProfileInformation != null) {
                    $scope.borrowerprofile.cprBusinessProfileInformation = $scope.cprBusinessProfileInformation;
                }
            } catch (e) {
                alert("Exception bindCPRBusinessProfileData " + e);

            }



        };

        function checkBusinessProfileValidation() {
            if ($scope.cprBusinessProfileInformation.accountNo == null || $scope.cprBusinessProfileInformation.accountNo == "" || $scope.cprBusinessProfileInformation.accountNo == '') {
                dialogService.ConfirmDialogWithOkay('', "Please fill or save the Business Profile first to Add this item !!!").then(function () {
                });
                return false;
            } else {
                return true;
            }
        };

        function GetBindBusinessProfile(borrowerProfile) {
            try {

                $scope.sampleBorrowerProfile = borrowerProfile;
                if ($scope.sampleBorrowerProfile.cprBusinessProfileInformation != null) {
                    $scope.cprBusinessProfileInformation = $scope.sampleBorrowerProfile.cprBusinessProfileInformation;
                    $scope.cprFixedAssetsList = $scope.sampleBorrowerProfile.cprBusinessProfileInformation.listCPRFixedAssets;
                    $scope.cprManagementBorrowingCompanyList = $scope.sampleBorrowerProfile.cprBusinessProfileInformation.listCPRManagementBorrowingCompany;
                    $scope.cprSubsideriesList = $scope.sampleBorrowerProfile.cprBusinessProfileInformation.listCPRSubsideries;
                    $scope.cprEmployeeInCompanyList = $scope.sampleBorrowerProfile.cprBusinessProfileInformation.listCPREmployeeInCompany;
                    $scope.cprLiabilitiesList = $scope.sampleBorrowerProfile.cprBusinessProfileInformation.listCPRLiabilities;

                    var str = moment($scope.cprBusinessProfileInformation.dateOfOpening).format("DD/MM/YYYY");
                    $scope.cprBusinessProfileInformation.dateOfOpening = new Date(str);

                    angular.forEach($scope.cprLiabilitiesList, function (value) {
                        var strExpiryDate = moment(value.expiryDate).format("DD/MM/YYYY");
                        value.expiryDate = new Date(strExpiryDate);
                    });
                    angular.forEach($scope.cprManagementBorrowingCompanyList, function (value) {
                        value.Edu = '';
                        if (value.mSc) {
                            if (value.Edu.length < 1) {
                                value.Edu = value.Edu + 'M.Sc';
                            } else {
                                value.Edu = value.Edu + ',M.Sc';
                            }
                        }
                        if (value.bSc) {
                            if (value.Edu.length < 1) {
                                value.Edu = value.Edu + 'B.Sc';
                            } else {
                                value.Edu = value.Edu + ',B.Sc';
                            }
                        }
                        if (value.diploma) {
                            if (value.Edu.length < 1) {
                                value.Edu = value.Edu + 'Diploma';
                            } else {
                                value.Edu = value.Edu + ',Diploma';
                            }
                        }
                        if (value.other) {
                            if (value.Edu.length < 1) {
                                value.Edu = value.Edu + 'Other';
                            } else {
                                value.Edu = value.Edu + ',Other';
                            }
                        }
                    });
                    if ($scope.cprFixedAssetsList != null) {
                        if ($scope.cprFixedAssetsList.length > 0) {
                            $scope.netAssetsOfCompany = $scope.cprFixedAssetsList[0].netAssetsOfCompany;
                        }
                    }


                }
                if ($scope.borrowerprofile.listCPRLiabilitySanctionHistory != null) {
                    angular.forEach($scope.borrowerprofile.listCPRLiabilitySanctionHistory, function (value) {
                        var strDate = moment(value.date).format("DD/MM/YYYY");
                        value.date = new Date(strDate);
                    });
                }


            } catch (e) {
                alert("GetBindBusinessProfile error " + e);
            }
        };

        //Business Supporting Papers
        function GetBusinessSupportingPapersList() {
            try {
                $http({
                    url: "/CPR/GetBusinessSupportingPapersList",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listBusinessSupportingPapersList = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetBusinessSupportingPapersList " + e);
            }
        };

        $scope.AddCPRBusinessSupportingPapersDetails_ClickEvent = function () {
            try {
                $scope.listCPRBusinessSupportingPapersDetails = $scope.listCPRBusinessSupportingPapersDetails || [];
                $scope.cPRBusinessSupportingPapersDetails.issueDate = moment($scope.cPRBusinessSupportingPapersDetails.issueDate).format('DD/MM/YYYY');
                $scope.listCPRBusinessSupportingPapersDetails.push($scope.cPRBusinessSupportingPapersDetails);
                $scope.ResetCPRBusinessSupportingPapersDetails_ClickEvent();

                $scope.cprBusinessSupportingPapersDetailsForm.$setUntouched();
                $scope.cprBusinessSupportingPapersDetailsForm.$setPristine();

            } catch (e) {
                alert("AddCPRBusinessSupportingPapersDetails_ClickEvent error" + e);
            }
        };
        $scope.ResetCPRBusinessSupportingPapersDetails_ClickEvent = function () {
            $scope.cPRBusinessSupportingPapersDetails = {
                id: 0,
                cPRId: 0,
                businessSupportingPapersList: '',
                issueDate: '',
                validity: '',
                businessItems: '',
                remarks: '',
                active: true
            };
            $scope.cprBusinessSupportingPapersDetailsForm.$setUntouched();
            $scope.cprBusinessSupportingPapersDetailsForm.$setPristine();
        };
        $scope.EditItemListCPRBusinessSupportingPapersDetails = function (x) {
            try {
                if ($scope.cPRBusinessSupportingPapersDetails == null)
                    $scope.cPRBusinessSupportingPapersDetails = {};

                $scope.cPRBusinessSupportingPapersDetails = x;

                var index = $scope.listCPRBusinessSupportingPapersDetails.indexOf(x);
                $scope.listCPRBusinessSupportingPapersDetails.splice(index, 1);

            } catch (e) {
                alert("Exception EditItemFromLiabilitiesWithOtherBankList" + e);
            }
        };

        function GetCPRBusinessSupportingPapersDetailsByCPRId() {
            try {
                var cprId = GetUrlParameters();
                $http({
                    url: "/CPR/GetCPRBusinessSupportingPapersDetailsByCPRId",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRId: cprId }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.listCPRBusinessSupportingPapersDetails = response.data.output;
                        //angular.forEach($scope.listCPRBusinessSupportingPapersDetails, function (val) {
                        //    var str = moment(val.issueDate).format("DD/MM/YYYY");
                        //    val.issueDate = new Date(str);
                        //});
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                alert("Exception GetBusinessSupportingPapersDetailsByCPRId " + e);
            }
        };

        function GetSecurityOffers() {
            var selectedSecurityTypes = [];
            $scope.selectedSecurityTypes = $scope.selectedSecurityTypes || [];
            var key = [];

            angular.forEach($scope.cprinit.listCPRFacilities, function (cprFacilities) {
                angular.forEach(cprFacilities.listSecurityOffer.securitytype, function (secType) {
                    selectedSecurityTypes.push(secType.id);
                });
            });

            //$.each(selectedSecurityTypes, function (i, el) {
            //    if ($.inArray(el, $scope.selectedSecurityTypes) === -1)
            //        $scope.selectedSecurityTypes.push(el);
            //});
            angular.forEach(selectedSecurityTypes, function (item) {
                var key = item["id"];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    $scope.selectedSecurityTypes.push(item);
                }
            });
        };


        ///----------------Renewal Summery check
        $scope.CheckRenewalSummerySubSection = function (mainSection, subSection) {
            //$scope.listCPRRenewalSummaryTemplate

            $scope.cPRRenewalSummaryData = $filter('filter')($scope.listCPRRenewalSummaryTemplate, { cPRMainSectionId: mainSection, cPRSubSectionId: subSection }, true);
            if ($scope.cPRRenewalSummaryData.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }


        $scope.CheckRenewalSummeryMainSection = function (mainSection) {
            //$scope.listCPRRenewalSummaryTemplate

            $scope.cPRRenewalSummaryData = $filter('filter')($scope.listCPRRenewalSummaryTemplate, { cPRMainSectionId: mainSection }, true);
            if ($scope.cPRRenewalSummaryData.length > 0) {
                return true;
            }
            else {
                return false;
            }

        }


        ////---------------------Session expiration
        $scope.events = [];
        $scope.idle = 600;
        $scope.timeout = 10;
        var sessionExpiredFired = false;
        var idleCount = 0;
        $scope.$on('IdleWarn', function (e, countdown) {
            if (sessionExpiredFired != true) {
                sessionExpiredFired = true;
                if (idleCount == 0) {
                    dialogService.ConfirmDialogWithOkay(null, "Your session will expire in another 10 minutes! ");
                    timeOut()
                    idleCount++;
                }
            }
        });
        function timeOut() {
            $timeout(function () {
                common.RedirectHome();

            }, 100000);
        };
        function addEvent(evt) {
            $scope.$evalAsync(function () {
                $scope.events.push(evt);
            });
        };
        var idleWatch = $scope.$watch('idle', function (value) {
            if (value !== null) Idle.setIdle(value);
        });
        ////---------------------End session expiration 

        function DropDownYears() {
            var year = new Date().getFullYear();
            var range = [];
            range.push(year);
            for (var i = 1; i < 999; i++) {
                range.push(year + i);
            }
            $scope.years = range;
        };

        /////Puspak----------------

        $scope.hideControls_BOK = false;


        $scope.AddDocumentChargesBtn_ClickEvent = function () {
            try {
                if ($scope.documentCharges.feeType == null || $scope.documentCharges.feeType == '')
                    return false;
                if ($scope.documentCharges.fee == null || $scope.documentCharges.fee == '')
                    return false;

                if ($scope.cPRFacility.listCPRFacilityDocumentChargesModel == undefined) {
                    $scope.cPRFacility.listCPRFacilityDocumentChargesModel = [];
                }
                $scope.cPRFacility.listCPRFacilityDocumentChargesModel.push($scope.documentCharges);

                $scope.documentCharges = {
                    id: null,
                    feeType: null,
                    fee: null,
                    active: true
                };

            } catch (e) {
                alert("Exception AddDocumentChargesBtn_ClickEvent " + e);
            }
        };
        $scope.RemoveDocumentCharges_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    var status = false;
                    if (item.id == null)
                        status = common.RemoveItemFromList(list, item, true);
                    else
                        status = common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveSectorCode_ClickEvent " + e);
            }
        };
        //$scope.AddLoanAssessmentBtn_ClickEvent = function () {
        //    try {
        //        //if ($scope.loanAssessment.feeType == null || $scope.documentCharges.feeType == '')
        //        //    return false;
        //        //if ($scope.documentCharges.fee == null || $scope.documentCharges.fee == '')
        //        //    return false;

        //        if ($scope.cPRFacility.listCPRFacilityLoanAssessmentModel == undefined) {
        //            $scope.cPRFacility.listCPRFacilityLoanAssessmentModel = [];
        //        }
        //        $scope.cPRFacility.listCPRFacilityLoanAssessmentModel.push($scope.loanAssessment);

        //        $scope.loanAssessment = {
        //            id: null,
        //            particulars: null,
        //            unitPrice: null,
        //            quantity: null,
        //            totalValue: null,
        //            loanApprochedByClient: null,
        //            loanRecommendedByBranch: null,
        //            active: true
        //        };

        //    } catch (e) {
        //        alert("Exception AddLoanAssessmentBtn_ClickEvent " + e);
        //    }
        //};
        //$scope.RemoveLoanAssessment_ClickEvent = function (list, item) {
        //    try {
        //        if (list != null && item != null) {
        //            var status = false;
        //            if (item.id == null)
        //                status = common.RemoveItemFromList(list, item, true);
        //            else
        //                status = common.SetActiveFalseForRemovedItem(list, item);
        //        }

        //    } catch (e) {
        //        alert("Exception RemoveLoanAssessment_ClickEvent " + e);
        //    }
        //};



        //Prayas -------------------------------------------------------------------------------------------------------------
        $scope.AddSectorCodeBtn_ClickEvent = function (item) {
            try {
                if ($scope.cPRFacility.listCPRFacilitySectorCodeModel == undefined) {
                    $scope.cPRFacility.listCPRFacilitySectorCodeModel = [];
                }
                if ($scope.selectedSectorCode != null && $scope.selectedSectorCode.sector != null && $scope.selectedSectorCode.code != null) {
                    var sectorCodeModel = {
                        id: 0,
                        sectorCodeModel: item.sector,
                        code: item.code,
                        active: true
                    };
                    $scope.cPRFacility.listCPRFacilitySectorCodeModel.push(sectorCodeModel);
                    $scope.selectedSectorCode = null;
                }
            } catch (e) {
                alert("Exception AddSectorCodeBtn_ClickEvent " + e);
            }
        };

        $scope.DropdownInterestRateOption_ChangeEvent = function (item) {
            if (item.option == "Fix") {
                $scope.baseRateEnable = false;
            }
            else {
                $scope.baseRateEnable = true;
            }
        };

        $scope.RemoveSectorCode_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    var status = false;
                    if (item.id == null)
                        status = common.RemoveItemFromList(list, item, true);
                    else
                        status = common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveSectorCode_ClickEvent " + e);
            }
        };

        $scope.searchText = {
            yom: ''
        };
        //$scope.selectedCAFClassification = {
        //    classification: ''
        //};

        $scope.DropdownInterestRateOption_ChangeEvent = function (item) {
            if (item.option == "Fix") {
                $scope.baseRateEnable = false;
            }
            else {
                $scope.baseRateEnable = true;
            }
        };

        $scope.AddGroupOverviewBtn_ClickEvent = function (item) {
            try {
                if ($scope.groupOverviewForm.$valid) {
                    AddGroupOverviewDetails_Function(item);
                }
            } catch (e) {
                alert("Exception AddGroupOverviewBtn_ClickEvent " + e);
            }
        };

        $scope.RemoveGroupOverview_ClickEvent = function (list, item) {
            try {
                if (list != null && item != null) {
                    var status = false;
                    if (item.id == null)
                        status = common.RemoveItemFromList(list, item, true);
                    else
                        status = common.SetActiveFalseForRemovedItem(list, item);
                }

            } catch (e) {
                alert("Exception RemoveGroupOverview_ClickEvent " + e);
            }
        };

        $scope.ResetGroupOverviewBtn_ClickEvent = function (list, item) {
            ResetGroupOverviewModel();
            $scope.groupOverviewForm.$setPristine();
            $scope.groupOverviewForm.$setUntouched();
        };

        $scope.forms = {};

        //All UDF -----------------------------------------------------------------------------------------

        $scope.ResetUDFValueBtn_ClickEvent = function (udf) {
            try {
                angular.forEach(udf.listUDFColumn, function (col) {
                    col.value = '';
                });
                var formName = 'udfForm' + udf.id;
                $scope.resetForm(formName);
            } catch (e) {
                alert("Exception ResetUDFValueBtn_ClickEvent " + e);
            }
        };

        $scope.resetForm = function (formName) {
            var form = $scope.forms[formName];
            if (form != undefined) {
                form.$setUntouched();
                form.$setPristine();
            }
        };

        $scope.evaluateUDF_ClickEvent = function (col, list) {
            var regex = /\[.*?\]/g;
            var ids = col.expression.match(regex);
            var exp = col.expression;
            angular.forEach(ids, function (strid) {
                var id = strid.replace('[', '').replace(']', '');
                if (id == '')
                    id = '0';
                else if (!isNaN(id)) {
                    var obj = list.find(x => x.id === parseInt(id));
                    var newexp = exp.replace(strid, obj.value);
                    exp = newexp;
                }
                else {
                    var strValue = getUDFStrValue(id);
                    var newexp1 = exp.replace(strid, strValue);
                    exp = newexp1;
                }
            });
            col.value = eval(exp).toFixed(2);
        };

        function getUDFStrValue(str) {
            switch (str) {
                case "amountrequest":
                    if ($scope.cPRFacility != null) {
                        return $scope.cPRFacility.amountrequest;
                    }
                    break;
            }
        }

        function generateNewUDFRow(item, list) {

            var tempColValues = [];
            angular.forEach(item.listUDFColumn, function (col) {
                //Check if Lookup
                if (col.dataType == 'Lookup' && col.expression != undefined && col.expression != null)
                    $scope.evaluateUDF_ClickEvent(col, item.listUDFColumn);

                var colValue = col.value;
                if (col.dataType == 'Date')
                    colValue = Date.parse(col.value);

                var tempCol = {};
                angular.copy({
                    id: col.id,
                    label: col.label,
                    dataType: col.dataType,
                    expression: col.expression,
                    value: colValue
                }, tempCol);
                tempColValues.push(tempCol);
            });

            if (list != null) {
                var obj = list.find(x => x.udfMasterId === item.id);
                if (obj == undefined) {
                    var newUDFValue = {
                        udfMasterId: item.id,
                        title: item.title,
                        rows: [{
                            cols: tempColValues
                        }]
                    };
                    list.push(newUDFValue);
                } else {
                    if (obj.rows == null)
                        obj.rows = [];
                    var newrow = {
                        cols: tempColValues
                    };
                    obj.rows.push(newrow);
                }
            } else {
                var newUDFValue1 = {
                    udfMasterId: item.id,
                    title: item.title,
                    rows: [{
                        cols: tempColValues
                    }]
                };
                list.push(newUDFValue1);
            }
        }

        $scope.AddUDFValueBtn_ClickEvent = function (item, list) {
            try {
                //if (list == undefined)
                //    list = [];
                generateNewUDFRow(item, list);
                $scope.ResetUDFValueBtn_ClickEvent(item);

                var formName = 'udfForm' + item.id;
                $scope.resetForm(formName);
            } catch (e) {
                alert("Exception AddUDFValueBtn_ClickEvent " + e);
            }
        };

        $scope.RemoveUDFValueBtn_ClickEvent = function (udf, row, list) {
            try {
                var udfIndex = list.indexOf(udf);
                var rowIndex = udf.rows.indexOf(row);
                list[udfIndex].rows.splice(rowIndex, 1);
            } catch (e) {
                alert("Exception RemoveUDFValueBtn_ClickEvent " + e);
            }
        };

        $scope.EditUDFValueItem_ClickEvent = function (selectUdf, row, udflist, list) {
            try {
                var index = GetArrayIndexByValue(udflist, "id", selectUdf.udfMasterId);
                var udf = udflist[index];
                angular.forEach(udf.listUDFColumn, function (col) {
                    var fieldIndex = GetArrayIndexByValue(row.cols, "id", col.id);
                    var field = row.cols[fieldIndex];
                    switch (col.dataType) {
                        case "Number":
                            col.value = Number(field.value);
                            break;
                        case "Date":
                            //col.value = new Date();
                            col.value = new Date(Number(field.value.toString()));
                            break;
                        default:
                            col.value = field.value;
                    }
                });

                var spliceUdf = list.indexOf(selectUdf);
                var spliceRow = selectUdf.rows.indexOf(row);
                list[spliceUdf].rows.splice(spliceRow, 1);
            } catch (e) {
                alert("Exception EditUDFValueItem_ClickEvent " + e);
            }
        };


        //FacilityProduct UDF ---------------------------------
        $scope.listAllUDF = [];
        $scope.listUDF = [];
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
        };

        //EMI
        $scope.repType = null;
        $scope.totalAmount = 0;
        $scope.scheduledPayment = 0;
        $scope.totalInterest = 0;

        $scope.emi = {
            interestRate: 0,
            loanPeriod: 0,
            loanAmount: 0
        };

        $scope.repayment = [];

        $scope.DropdownRepaymentCalculationFaclityNo_ChangeEvent = function (item) {
            if (item != null && item.repaymentmethod != "") {
                $scope.emi = {
                    interestRate: parseFloat(item.interestrate),
                    loanPeriod: item.tenour.totalTermMonths,
                    loanAmount: item.amountrequest
                };

                switch (item.repaymentmethod) {
                    case "EMI": calculateEMI();
                        break;
                    case "EPI": calculateEPI();
                        break;
                    case "EQI": calculateEQI();
                        break;
                    default: $scope.ResetRepaymentCalculation();
                        break;
                }
            }
        };

        $scope.ResetRepaymentCalculation = function () {
            $scope.totalAmount = 0;
            $scope.scheduledPayment = 0;
            $scope.totalInterest = 0;

            $scope.emi = {
                interestRate: 0,
                loanPeriod: 0,
                loanAmount: 0
            };

            $scope.repayment = [];
        };

        function calculateEMI() {
            $scope.repayment = [];
            var P = $scope.emi.loanAmount;
            var rate = $scope.emi.interestRate;
            var n = $scope.emi.loanPeriod;
            if (P == '' || isNaN(P)) {
                alert('Please enter a valid principal amount.');
                return false;
            }
            else if (n == '' || isNaN(n)) {
                alert('Please enter a valid period in months.');
                return false;
            }
            else if (rate == '' || isNaN(rate)) {
                alert('Please enter valid interest rate.');
                return false;
            }
            else {
                var r = rate / (12 * 100);
                var prate = (P * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
                var emi = Math.ceil(prate * 100) / 100;

                $scope.scheduledPayment = emi.toFixed(2);

                var tot = Math.round($scope.scheduledPayment * n * 100) / 100;
                $scope.totalAmount = Math.abs(tot);

                var tot_int_amt = $scope.totalAmount - P;
                $scope.totalInterest = tot_int_amt.toFixed(2);

                var totalPaid = 0;
                var mainPrincipal = P;
                for (var i = 1; i <= n; i++) {
                    var int_amt = monthlyInterest(P, rate);
                    var paidPrincipal = (emi - int_amt).toFixed(2);
                    var balance = ((parseFloat(P) + parseFloat(int_amt)) - emi).toFixed(2);
                    totalPaid = parseInt(totalPaid) + parseInt(paidPrincipal);
                    var loadPaidPer = ((totalPaid / mainPrincipal) * 100).toFixed(2) + "%";
                    P = balance;

                    var obj = {
                        paidPrincipal: paidPrincipal,
                        int_amt: int_amt,
                        emi: emi,
                        balance: P,
                        loadPaidPer: loadPaidPer
                    };

                    $scope.repayment.push(obj);
                }
            }
        }

        function calculateEQI() {
            $scope.repayment = [];
            var P = $scope.emi.loanAmount;
            var rate = $scope.emi.interestRate;
            var n = $scope.emi.loanPeriod;
            if (P == '' || isNaN(P)) {
                alert('Please enter a valid principal amount.');
                return false;
            }
            else if (n == '' || isNaN(n)) {
                alert('Please enter a valid period in months.');
                return false;
            }
            else if (rate == '' || isNaN(rate)) {
                alert('Please enter valid interest rate.');
                return false;
            }
            else {
                n = n / 4;
                var r = rate / (4 * 100);
                var prate = (P * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
                var eqi = Math.ceil(prate * 100) / 100;
                var tot = 0;
                var tot_int_amt = 0;
                var balance = P;
                var tot_principal = 0;
                while (balance > 0) {
                    var interest = balance * r;
                    var principal = eqi - interest;
                    tot_principal = tot_principal + principal;
                    balance = balance - principal;
                    tot_int_amt = tot_int_amt + interest;
                    tot = tot + eqi;
                    var loadPaidPer = ((tot_principal / P) * 100).toFixed(2) + "%";
                    var obj = {
                        paidPrincipal: principal,
                        int_amt: interest,
                        emi: eqi,
                        balance: balance,
                        loadPaidPer: loadPaidPer
                    };

                    $scope.repayment.push(obj);
                }

                $scope.scheduledPayment = eqi.toFixed(2);
                $scope.totalAmount = Math.abs(tot);
                $scope.totalInterest = tot_int_amt.toFixed(2);
            }
        };

        function calculateEPI() {
            $scope.repayment = [];
            var P = $scope.emi.loanAmount;
            var rate = $scope.emi.interestRate;
            var n = $scope.emi.loanPeriod;
            if (P == '' || isNaN(P)) {
                alert('Please enter a valid principal amount.');
                return false;
            }
            else if (n == '' || isNaN(n)) {
                alert('Please enter a valid period in months.');
                return false;
            }
            else if (rate == '' || isNaN(rate)) {
                alert('Please enter valid interest rate.');
                return false;
            }
            else {
                var r = rate / (12 * 100);
                var tot = 0;
                var tot_int_amt = 0;
                var balance = P;
                var tot_principal = 0;
                var principal = balance / n;
                while (balance > 0) {
                    tot_principal = tot_principal + principal;
                    var interest = balance * r;
                    var amount = principal + interest;
                    balance = balance - principal;
                    tot_int_amt = tot_int_amt + interest;
                    tot = tot + amount;
                    var loadPaidPer = ((tot_principal / P) * 100).toFixed(2) + "%";
                    var obj = {
                        paidPrincipal: principal,
                        int_amt: interest,
                        emi: amount,
                        balance: balance,
                        loadPaidPer: loadPaidPer
                    };

                    $scope.repayment.push(obj);
                }

                $scope.totalAmount = Math.abs(tot);
                $scope.totalInterest = tot_int_amt.toFixed(2);
                $scope.scheduledPayment = NaN;
            }
        }

        function monthlyInterest(amt, int) {
            var int_amt = ((int / 100) * amt) / 12;
            return int_amt.toFixed(2);
        }


        $scope.GetTotalEMItoIncome = function () {
            try {
                var total = 0;
                var Emi = $scope.scheduledPayment;
                var TotalMI = parseFloat($scope.GetMITotal().replace(/,/g, ''));
                if (TotalMI == '' || isNaN(TotalMI))
                    return total = 0;
                if (Emi != null && TotalMI != null) {
                    total = $scope.scheduledPayment / TotalMI;
                }
                return total.toFixed(2);

            } catch (e) {
                alert('Exception GetTotalEMItoIncome ' + e);
            }
        };

        //GuaranteeValues
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

        function arrayObjectIndexOf(arr, obj) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], obj)) {
                    return i;
                }
            };
            return -1;
        };

        $scope.dt = {
            nepaliDate: '',
            englishDate: ''
        };
        function NepaliDateConverter(date, nepaliToEnglish) {
            try {
                var dt = date.split('/');
                if (dt.length == 3) {
                    var dt_date = parseInt(dt[0]);
                    var dt_month = parseInt(dt[1]);
                    var dt_year = parseInt(dt[2]);

                    var converter = new DateConverter();
                    if (nepaliToEnglish) {
                        converter.setNepaliDate(dt_year, dt_month, dt_date);
                        return converter.getEnglishDate().toString().padStart(2, 0) + '/' + converter.getEnglishMonth().toString().padStart(2, 0) + '/' + converter.getEnglishYear();
                    } else if (nepaliToEnglish == false) {
                        converter.setEnglishDate(dt_year, dt_month, dt_date);
                        return converter.getNepaliDate().toString().padStart(2, 0) + '/' + converter.getNepaliMonth().toString().padStart(2, 0) + '/' + converter.getNepaliYear();
                    }
                }

                return '';

            } catch (e) {
                return '';
            }
        };

        $scope.ADtoBS = function (date, refModel) {
            if (date != null && date != '') {
                var ot = NepaliDateConverter(date, false);
                // Get the model
                var model = $parse(refModel);
                // Assigns a value to it
                model.assign($scope, ot);

                // Apply it to the scope
                //$scope.$apply();

                //console.log($scope.dt.nepaliDate);  // logs 42
            }

        };

        $scope.BStoAD = function (date, refModel) {
            if (date != null && date != '') {
                var ot = NepaliDateConverter(date, true);
                // Get the model
                var model = $parse(refModel);
                // Assigns a value to it
                model.assign($scope, ot);

                // Apply it to the scope
                //$scope.$apply(); 

                ///console.log($scope.dt.englishDate);  // logs 42
            }
        };

        function UpdateNepaliDates() {

            //BorrowerProfile JoinDate
            if ($scope.cprinit.listBorrowerProfiles.length > 0) {
                for (var i = 0; i < $scope.cprinit.listBorrowerProfiles.length; i++) {
                    if ($scope.cprinit.listBorrowerProfiles[i].individual != null && $scope.cprinit.listBorrowerProfiles[i].individual.salariedemp != null && $scope.cprinit.listBorrowerProfiles[i].individual.salariedemp.joinDate != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].individual.salariedemp.joinDate, 'cprinit.listBorrowerProfiles[' + i + '].individual.salariedemp.joinDate_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].individual != null && $scope.cprinit.listBorrowerProfiles[i].individual.dob != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].individual.dob, 'cprinit.listBorrowerProfiles[' + i + '].individual.dob_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].individual != null && $scope.cprinit.listBorrowerProfiles[i].individual.businessEntity != null && $scope.cprinit.listBorrowerProfiles[i].individual.businessEntity.regDate != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].individual.businessEntity.regDate, 'cprinit.listBorrowerProfiles[' + i + '].individual.businessEntity.regDate_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].individual != null && $scope.cprinit.listBorrowerProfiles[i].individual.businessEntity != null && $scope.cprinit.listBorrowerProfiles[i].individual.businessEntity.registrationvalidupTo != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].individual.businessEntity.registrationvalidupTo, 'cprinit.listBorrowerProfiles[' + i + '].individual.businessEntity.registrationvalidupTo_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].secondarystakeholder != null && $scope.cprinit.listBorrowerProfiles[i].secondarystakeholder.dOB != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].secondarystakeholder.dOB, 'cprinit.listBorrowerProfiles[' + i + '].secondarystakeholder.dOB_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.date != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.date, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.date_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.creditRelationshipSince != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.creditRelationshipSince, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.creditRelationshipSince_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.accountRelationshipSince != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.accountRelationshipSince, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.accountRelationshipSince_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.dateofLastReview != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.dateofLastReview, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.dateofLastReview_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.dateofNextReview != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.dateofNextReview, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.dateofNextReview_np');
                    }
                    if ($scope.cprinit.listBorrowerProfiles[i].stakeholder != null && $scope.cprinit.listBorrowerProfiles[i].stakeholder.registrationValidity != null) {
                        $scope.ADtoBS($scope.cprinit.listBorrowerProfiles[i].stakeholder.registrationValidity, 'cprinit.listBorrowerProfiles[' + i + '].stakeholder.registrationValidity_np');
                    }
                }
            }

            //Facility
        }


        ///Financial Analysis NP

        //$scope.getIncomeStatementValue = function (item, val) {
        //    if (item.isSubtotal == true) {
        //        var total = 0;
        //        var i;
        //        for (i = 0; i < item.calculations.length; i++) {

        //            var item1 = $scope.selectedTemplate.listFAItems.find(x => x.id === item.calculations[i].incomeStatementId1);
        //            var item2 = $scope.selectedTemplate.listFAItems.find(x => x.id === item.calculations[i].incomeStatementId2);
        //            var value1 = getValue(item1, val);
        //            var value2 = getValue(item2, val);
        //            var preOp = item.calculations[i].preOp;
        //            var op = item.calculations[i].op;

        //            var rawValue = getCalculation(value1, value2, op);

        //            if (preOp == "NA") {
        //                total += rawValue
        //            }
        //            else {
        //                switch (preOp) {
        //                    case "+":
        //                        total = total + rawValue;
        //                        break;
        //                    case "-":
        //                        total = total - rawValue;
        //                        break;
        //                }
        //            }
        //        }

        //        item.sign = total <= 0 ? "-" : "+";

        //        $scope.setItemValue(item, val, total);
        //        return total;
        //    }
        //    else {
        //        return getValue(item, val);
        //    }
        //};

        //$scope.calculateSubtotals = function () {
        //    setIncomeStatementSubTotals();
        //};

        //$scope.calculateNetWorth = function () {
        //    if ((!angular.isUndefined($scope.cprinit.accountPerformance.shownLiability)) && (!angular.isUndefined($scope.cprinit.accountPerformance.shownAsset))) {
        //        var net = $scope.cprinit.accountPerformance.shownAsset - $scope.cprinit.accountPerformance.shownLiability;
        //        $scope.cprinit.accountPerformance.netWorth = net;
        //    } else {
        //        $scope.cprinit.accountPerformance.netWorth = 0.0;
        //    }
        //};

        //$scope.addNewIncomeStatement = function () {

        //    var maxid = Math.max.apply(Math, $scope.selectedTemplate.listFAItems.map(function (o) { return o.id; }));
        //    var maxlevel = Math.max.apply(Math, $scope.selectedTemplate.listFAItems.map(function (o) { return o.level; }));
        //    var newid = maxid + 1;
        //    var newlevel = maxlevel + 1;

        //    var obj = {
        //        calculations: []
        //    };

        //    obj = {
        //        type: $scope.newItemType,
        //        id: newid,
        //        level: newlevel,
        //        heading: $scope.newItemTitle,
        //        sign: $scope.newItemSign,
        //        style: {
        //            "background-color": $scope.newItemBackgroundColor,
        //            "color": $scope.newItemForeColor,
        //            "font-weight": $scope.newItemForeWeight,
        //            "font-style": $scope.newItemFontItalic
        //        },
        //        isSubtotal: $scope.newItemIsSubtotal == "true" ? true : false,
        //        isSubHeading: $scope.newItemIsSubHeader == "true" ? true : false,
        //        value1: 0,
        //        value2: 0,
        //        value3: 0,
        //        value4: 0,
        //        value5: 0,
        //        value6: 0,
        //        value7: 0,
        //        value8: 0,
        //        value9: 0,
        //        value10: 0,
        //        value11: 0,
        //        value12: 0,
        //        value13: 0,
        //        value14: 0,
        //        value15: 0,

        //        calculations: $scope.newItemCalculations
        //    };

        //    $scope.selectedTemplate.listFAItems.push(obj);

        //    $scope.newItemTitle = "";
        //    $scope.newItemSign = "";
        //    $scope.newItemBackgroundColor = "";
        //    $scope.newItemForeColor = "";
        //    $scope.newItemForeWeight = "";
        //    $scope.newItemFontItalic = "";
        //    $scope.newItemIsSubtotal = "";
        //    $scope.newItemIsSubHeader = "";
        //    $scope.newItemCalculations = [];

        //    setIncomeStatementSubTotals();
        //};

        $scope.addNewItemCalculation = function () {
            var maxid;
            if ($scope.newItemCalculations.length > 0)
                maxid = Math.max.apply(Math, $scope.newItemCalculations.map(function (o) { return o.id; }));
            else
                maxid = 0;
            var newid = maxid + 1;
            var obj = {
                id: newid,
                preOp: $scope.newItemPreOp,
                incomeStatementId1: $scope.newItemFirstId,
                incomeStatementId2: $scope.newItemSecondId,
                op: $scope.newItemOp
            };

            $scope.newItemCalculations.push(obj);

            $scope.newItemPreOp = "";
            $scope.newItemFirstId = "";
            $scope.newItemOp = "";
            $scope.newItemSecondId = "";
        };

        //$scope.ReGenerateFinancialAnalysis_ClickEvent = function () {
        //    var confirm = dialogService.ConfirmDialogWithYesNo('', "This will permanently delete all existing values. Do you want to proceed?");
        //    confirm.then(function () {
        //        DeleteFinancialAnalysisValues($scope.cprinit.cPRFAConfigModel);
        //        $scope.cprinit.cPRFAConfigModel.fy1 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy2 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy3 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy4 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy5 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy6 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy7 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy8 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy9 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy10 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy11 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy12 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy13 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy14 = null;
        //        $scope.cprinit.cPRFAConfigModel.fy15 = null;
        //        $scope.faTemplate = null;
        //        $scope.cprinit.cPRFAConfigModel = null;
        //        //$scope.cprinit.cPRFAConfigModel.faTemplateModel = null;
        //        //$scope.cprinit.cPRFAConfigModel.noofyear = null;
        //    }, function () {

        //    });
        //};

        //$scope.GetFinancialAnalysisTemplate_ClickEvent = function (item) {
        //    if ($scope.cprinit.cPRFAConfigModel == null) {
        //        $scope.cprinit.cPRFAConfigModel = {
        //            id: 0,
        //            faTemplateModel: null,
        //            fyId1: '',
        //            fyId2: '',
        //            fyId3: '',
        //            fyId4: '',
        //            fyId5: '',
        //            fyId6: '',
        //            fyId7: '',
        //            fyId8: '',
        //            fyId9: '',
        //            fyId10: '',
        //            fyId11: '',
        //            fyId12: '',
        //            fyId13: '',
        //            fyId14: '',
        //            fyId15: '',
        //            noofyear: 5,
        //            listFAItems: [],
        //            active: true
        //        };
        //    }

        //    GetFAItemsByFATemplateId(item.selectedTemplate.id);
        //    $scope.cprinit.cPRFAConfigModel.faTemplateModel = item.selectedTemplate;
        //    $scope.cprinit.cPRFAConfigModel.noofyear = item.noofyear;

        //    $scope.calculateSubtotals();
        //};

        //function GetFAItemsByFATemplateId(fatemplateid) {
        //    common.preprocessload();
        //    try {
        //        $http({
        //            url: "/CPR/GetFAItemsByFATemplateId",
        //            method: "POST",
        //            headers: {
        //                "accept": "application/json;odata=verbose",
        //                "content-Type": "application/json;odata=verbose"
        //            },
        //            data: { fATempalteId: fatemplateid }
        //        }).then(function successCallback(response) {
        //            if (response.data.success) {
        //                $scope.cprinit.cPRFAConfigModel.listFAItems = response.data.output;
        //                common.preprocesshide();
        //            }
        //        }, function errorCallback(response) {
        //            $scope.error = response;
        //            common.preprocesshide();
        //        });
        //    } catch (e) {
        //        common.preprocesshide();
        //        alert('GetFAItemsByFATemplateId ' + e);
        //    }
        //}

        //function setItemValue(item, val, value) {
        //    switch (val) {
        //        case 1: item.value1 = value;
        //            break;
        //        case 2: item.value2 = value;
        //            break;
        //        case 3: item.value3 = value;
        //            break;
        //        case 4: item.value4 = value;
        //            break;
        //        case 5: item.value5 = value;
        //            break;
        //        case 6: item.value6 = value;
        //            break;
        //        case 7: item.value7 = value;
        //            break;
        //        case 8: item.value8 = value;
        //            break;
        //        case 9: item.value9 = value;
        //            break;
        //        case 10: item.value10 = value;
        //            break;
        //        case 11: item.value11 = value;
        //            break;
        //        case 12: item.value12 = value;
        //            break;
        //        case 13: item.value13 = value;
        //            break;
        //        case 14: item.value14 = value;
        //            break;
        //        case 15: item.value15 = value;
        //            break;
        //    }
        //}

        //function getCalculation(val1, val2, op) {
        //    switch (op) {
        //        case "+":
        //            return val1 + val2;
        //        case "-":
        //            return val1 - val2;
        //        case "/":
        //            return val1 / val2;
        //        case "*":
        //            return val1 * val2;
        //        default: return val1 + val2;
        //    }
        //}

        //function getValue(item, val) {
        //    switch (val) {
        //        case 1: return item.value1;
        //        case 2: return item.value2;
        //        case 3: return item.value3;
        //        case 4: return item.value4;
        //        case 5: return item.value5;
        //        case 6: return item.value6;
        //        case 7: return item.value7;
        //        case 8: return item.value8;
        //        case 9: return item.value9;
        //        case 10: return item.value10;
        //        case 11: return item.value11;
        //        case 12: return item.value12;
        //        case 13: return item.value13;
        //        case 14: return item.value14;
        //        case 15: return item.value15;
        //        default: return 0;
        //    }
        //}

        //function setIncomeStatementSubTotals() {

        //    if ($scope.cprinit.cPRFAConfigModel != null) {
        //        var totalColumns = $scope.cprinit.cPRFAConfigModel.noofyear; //Total Fiscal Years to show
        //        var i;
        //        for (i = 0; i < $scope.cprinit.cPRFAConfigModel.listFAItems.length; i++) {
        //            var item = $scope.cprinit.cPRFAConfigModel.listFAItems[i];
        //            if (item.novalues == true) {
        //                item.colspan = totalColumns + 1;
        //            }
        //            else {
        //                item.colspan = 0;
        //            }
        //            if (item.isSubtotal == true) {
        //                var k;
        //                var total;
        //                for (k = 1; k <= totalColumns; k++) {
        //                    var val = k;
        //                    total = 0;
        //                    var j;
        //                    if (item.calculations != null) {
        //                        for (j = 0; j < item.calculations.length; j++) {
        //                            var item1;
        //                            var value1;
        //                            var item2;
        //                            var value2;
        //                            if (item.calculations[j].incomeStatementId1 > 0) {
        //                                item1 = $scope.cprinit.cPRFAConfigModel.listFAItems.find(x => x.id === item.calculations[j].incomeStatementId1);
        //                                if ((item.calculations[j].incomeStatement1Val > 0 && val < totalColumns) || (item.calculations[j].incomeStatement1Val < 0 && val > 1)) {
        //                                    var valindex = val + item.calculations[j].incomeStatement1Val;
        //                                    if (valindex > 0 && valindex <= totalColumns) {
        //                                        value1 = getValue(item1, valindex);
        //                                    }
        //                                    else {
        //                                        value1 = 0 / 0;
        //                                    }
        //                                } else if (item.calculations[j].incomeStatement1Val < 0 && val == 1) {
        //                                    value1 = 0;
        //                                }
        //                                else {
        //                                    value1 = getValue(item1, val);
        //                                }
        //                            }
        //                            else if (item.calculations[j].incomeStatementId1 < 0) {
        //                                value1 = item.calculations[j].constantNumber;
        //                            }
        //                            else {
        //                                value1 = 0;
        //                            }

        //                            if (item.calculations[j].incomeStatementId2 > 0) {
        //                                item2 = $scope.cprinit.cPRFAConfigModel.listFAItems.find(x => x.id === item.calculations[j].incomeStatementId2);
        //                                if ((item.calculations[j].incomeStatement2Val > 0 && val < totalColumns) || (item.calculations[j].incomeStatement2Val < 0 && val > 1)) {
        //                                    var valindex = val + item.calculations[j].incomeStatement2Val;
        //                                    if (valindex > 0 && valindex <= totalColumns) {
        //                                        value2 = getValue(item2, valindex);
        //                                    }
        //                                    else {
        //                                        value2 = 0 / 0;
        //                                    }
        //                                }
        //                                else {
        //                                    value2 = getValue(item2, val);
        //                                }
        //                            }
        //                            else if (item.calculations[j].incomeStatementId2 < 0) {
        //                                value2 = item.calculations[j].constantNumber;
        //                            }
        //                            else {
        //                                value2 = 0;
        //                            }

        //                            var preOp = item.calculations[j].preOp;
        //                            var op = item.calculations[j].op;
        //                            var rawValue = getCalculation(value1, value2, op);
        //                            if (preOp == "NA") {
        //                                total += rawValue
        //                            }
        //                            else {
        //                                switch (preOp) {
        //                                    case "+":
        //                                        total = total + rawValue;
        //                                        break;
        //                                    case "-":
        //                                        total = total - rawValue;
        //                                        break;
        //                                    case "/":
        //                                        total = total / rawValue;
        //                                        break;
        //                                    case "*":
        //                                        total = total * rawValue;
        //                                        break;
        //                                }
        //                            }
        //                        }
        //                    }

        //                    setItemValue(item, val, total);
        //                }
        //            }
        //        }
        //    }
        //}

        //function DeleteFinancialAnalysisValues(faconfig) {
        //    try {
        //        common.preprocessload();
        //        if (faconfig != null) {
        //            var i;
        //            for (i = 0; i < faconfig.listFAItems.length; i++) {
        //                var item = faconfig.listFAItems[i];
        //                if (item.isSubtotal == false && item.novalues == false) {
        //                    item.value1 = 0;
        //                    item.value2 = 0;
        //                    item.value3 = 0;
        //                    item.value4 = 0;
        //                    item.value5 = 0;
        //                    item.value6 = 0;
        //                    item.value7 = 0;
        //                    item.value8 = 0;
        //                    item.value9 = 0;
        //                    item.value10 = 0;
        //                    item.value11 = 0;
        //                    item.value12 = 0;
        //                    item.value13 = 0;
        //                    item.value14 = 0;
        //                    item.value15 = 0;
        //                }
        //            }

        //            //if FAConfig not null
        //            if ($scope.cprinit.cPRFAConfigModel.id != 0) {
        //                $http({
        //                    url: "/CPR/DeleteCPRFinancialAnalysisValues",
        //                    method: "POST",
        //                    headers: {
        //                        "accept": "application/json;odata=verbose",
        //                        "content-Type": "application/json;odata=verbose"
        //                    },
        //                    data: { financialAnalysisConfigId: faconfig.id }
        //                }).then(function successCallback(response) {
        //                    if (response.data.success) {
        //                        //success
        //                        common.preprocesshide();
        //                    }
        //                }, function errorCallback(response) {
        //                    $scope.error = response;
        //                    common.preprocesshide();
        //                });
        //            } else {
        //                common.preprocesshide();
        //            }
        //        }
        //        else {
        //            common.preprocesshide();
        //        }
        //    } catch (e) {
        //        common.preprocesshide();
        //        alert("DeleteFinancialAnalysisValues: " + e);
        //    }
        //}

        function GetAllFiscalYear() {
            try {
                $http({
                    url: "/CPR/GetAllFiscalYear",
                    method: "GET",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({})
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.financialYearslist = response.data.output;
                    }
                }, function errorCallback(response) {
                    $scope.error = response;
                });
            } catch (e) {
                common.preprocesshide();
                alert('GetAllFiscalYear ' + e);
            }
        };

        $scope.GetAllApplicantName = function () {
            try {
                $scope.listAllApplicant = [];
                var listapllicant = $scope.cprinit.listBorrowerProfiles;

                for (var i = 0; i < listapllicant.length; i++) {
                    if (listapllicant[i].active == true && listapllicant[i].individual != null) {
                        var obj = {
                            // id: listapllicant[i].individual.id,
                            value: listapllicant[i].individual.name,
                            active: true
                        };
                        $scope.listAllApplicant.push(obj);
                    }
                    else if (listapllicant[i].active == true && listapllicant[i].stakeholder != null) {
                        var obj = {
                            value: listapllicant[i].stakeholder.name,
                            active: true
                        };
                        $scope.listAllApplicant.push(obj);
                    }
                }
                //if ($scope.cprinit.business.name != "Individual")
                if ($scope.cprinit.business.name != "Individual" && $scope.borrowerprofile.stakeholder.listSecondaryStakeholder != null) {
                    var listapllicantStake = $scope.borrowerprofile.stakeholder.listSecondaryStakeholder;
                    for (var j = 0; j < listapllicantStake.length; j++) {
                        if (listapllicantStake[j].active == true) {
                            var obj = {
                                value: listapllicantStake[j].name,
                                active: true
                            };
                            $scope.listAllApplicant.push(obj);
                        }
                    }
                }

                //return $scope.listAllApplicant;
            } catch (e) {
                alert('Exception GetAllApplicantName ' + e);
            }
        };

        $scope.GetTotalCapexlatestHistorical = function (num1, num2, num3, num4, num5, num6) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;
                if (isNaN(num3))
                    num3 = 0;
                if (isNaN(num4))
                    num4 = 0;
                if (isNaN(num5))
                    num5 = 0;
                if (isNaN(num6))
                    num6 = 0;


                var total = 0;
                if (num1 > 0 || num2 > 0 || num3 > 0 || num4 > 0 || num5 > 0 || num6 > 0) {
                    total = num1 + num2 + num3 + num4 + num5 + num6;
                }
                total = addCommas(total);
                return total;

            } catch (e) {
                alert('Exception GetTotalCapexlatestHistorical ' + e);
            }
        };
        $scope.GetTotalCapexProjected = function (num1, num2, num3, num4, num5, num6) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;
                if (isNaN(num3))
                    num3 = 0;
                if (isNaN(num4))
                    num4 = 0;
                if (isNaN(num5))
                    num5 = 0;
                if (isNaN(num6))
                    num6 = 0;


                var total = 0;
                if (num1 > 0 || num2 > 0 || num3 > 0 || num4 > 0 || num5 > 0 || num6 > 0) {
                    total = num1 + num2 + num3 + num4 + num5 + num6;
                }
                total = addCommas(total);
                return total;

            } catch (e) {
                alert('Exception GetTotalCapexProjected ' + e);
            }
        };
        $scope.GetTotalSourceHistorical = function (num1, num2, num3, num4) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;
                if (isNaN(num3))
                    num3 = 0;
                if (isNaN(num4))
                    num4 = 0;


                var total = 0;
                if (num1 > 0 || num2 > 0 || num3 > 0 || num4 > 0) {
                    total = num1 + num2 + num3 + num4;
                }
                total = addCommas(total);
                return total;

            } catch (e) {
                alert('Exception GetTotalSourceHistorical ' + e);
            }
        };
        $scope.GetTotalSourceProjected = function (num1, num2, num3, num4) {
            try {
                if (isNaN(num1))
                    num1 = 0;
                if (isNaN(num2))
                    num2 = 0;
                if (isNaN(num3))
                    num3 = 0;
                if (isNaN(num4))
                    num4 = 0;


                var total = 0;
                if (num1 > 0 || num2 > 0 || num3 > 0 || num4 > 0) {
                    total = num1 + num2 + num3 + num4;
                }
                total = addCommas(total);
                return total;

            } catch (e) {
                alert('Exception GetTotalSourceProjected ' + e);
            }
        };


        $scope.CalculateRatio = function () {
            try {
                $scope.borrowerprofile.stakeholder.ratio = 0.0;
                if ((!$scope.borrowerprofile.stakeholder.equity) || (!$scope.borrowerprofile.stakeholder.debt)) {
                    $scope.borrowerprofile.stakeholder.ratio = 0.0;
                } else {
                    if ($scope.borrowerprofile.stakeholder.equity > $scope.borrowerprofile.stakeholder.debt)
                        $scope.borrowerprofile.stakeholder.ratio = ($scope.borrowerprofile.stakeholder.equity / $scope.borrowerprofile.stakeholder.debt);
                    if ($scope.borrowerprofile.stakeholder.equity < $scope.borrowerprofile.stakeholder.debt)
                        $scope.borrowerprofile.stakeholder.ratio = ($scope.borrowerprofile.stakeholder.debt / $scope.borrowerprofile.stakeholder.equity);
                }

            } catch (e) {
                alert('Exception CalculateRatio ' + e);
            }
        };

        // SWOT Approval
        $scope.SubmitSWOTByApproval_ClickEvent = function () {
            try {
                SaveSWOTByApproval();
            } catch (e) {
                alert("SubmitSWOTByApproval_ClickEvent error" + e);
            }
        };

        //Initiate Session
        $scope.ReInitiateSession_Event = function () {
            ReinitiateSession();
        };
        function ReinitiateSession() {
            try {
                $http({
                    url: "/CPR/ReInitiateSession",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: {}
                }).then(function successCallback(response) {
                    if (response.data.success)
                        console.log(response.data.message);

                }, function errorCallback(response) {
                    $scope.error = response;
                });

            } catch (ex) {
                alert("Exception ReinitiateSession: " + e);
            }
        }
        //CBS Integration
        $scope.CbsCustomer = {};
        function SearchCustomerFromCBS(idType, idNumber) {
            try {
                common.preprocessload();
                var req = {
                    method: 'POST',
                    url: common.connectivityUrl + '/api/CBSExternal/GetCustomerFromCBSbyID?idType=' + idType + '&idNumber=' + idNumber,
                    headers: {
                        "Content-Type": undefined
                    },
                    withCredentials: false,
                    data: {}
                };
                $http(req).then(function success(response) {
                    var cbsCustomerResponse = response.data.output;
                    console.log(cbsCustomerResponse);
                    //if (cbsCustomerResponse.RspnsData != null && cbsCustomerResponse.RspnsData.Result != null && cbsCustomerResponse.RspnsData.IsCompleted) {
                    if (cbsCustomerResponse.output != null) {

                        // if (cbsCustomerResponse.output.FirstNsame != null) {
                        dialogService.ConfirmDialogWithYesNo("", "This CIF is available in CBS. Do you want to load the data?").then(function (answer) {
                            if (answer) {
                                MapCBSCustomerToLOS(cbsCustomerResponse.output);
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }
                    else {
                        dialogService.ConfirmDialogWithOkay('', "No Record Found!!");
                    }

                    common.preprocesshide();
                }, function error(response) {
                    common.preprocesshide();
                    $scope.error = response;
                }
                );

            } catch (e) {
                common.preprocesshide();
                alert("SearchCustomerFromCBS " + e);
            }
        };
        function MapCBSCustomerToLOS(cbsCustomer) {
            try {
                //Borrower Profile >> Contact No
                // $scope.borrowerprofile.individual.landphone = cbsCustomer.CustomerIdInfo.LandContactNo;             
                // $scope.borrowerprofile.individual.mobileno1 = cbsCustomer.CustomerIdInfo.Mobile;
                $scope.borrowerprofile.individual.mobileno2 = '34234234';
                // $scope.borrowerprofile.individual.contactEmail = cbsCustomer.CustomerIdInfo.Email;
                $scope.borrowerprofile.individual.contactFax = '121212';

                // $scope.borrowerprofile.individual.passportNoDrivingLicense = cbsCustomer.CustomerIdInfo.PassportNo;
                //$scope.borrowerprofile.individual.passportLicenseExpiryDate = ParseDateFormatForCBS(cbsCustomer.CustomerIdInfo.PassportExpiryDate)
                // $scope.borrowerprofile.individual.birthRegistrationCertificateNo = cbsCustomer.CustomerIdInfo.BirthCertificateNo;

                ////Borrower Profile >> Permanenet Address
                $scope.borrowerprofile.individual.address1 = 'Gulshan1';
                $scope.borrowerprofile.individual.city1 = 'Dhaka';
                //$scope.borrowerprofile.individual.province1 = cbsCustomer.CustomerPermanentAddress.Province;
                // $scope.borrowerprofile.individual.zipcode1 = cbsCustomer.CustomerPermanentAddress.Zip1;
                // $scope.borrowerprofile.individual.houseno1 = cbsCustomer.CustomerPermanentAddress.Houseno1;
                $scope.borrowerprofile.individual.wardno1 = '15';
                // $scope.borrowerprofile.individual.map1 = cbsCustomer.CustomerPermanentAddress.Map;             

                ////Borrower Profile >> Correspondance Address
                //$scope.borrowerprofile.individual.address2 = cbsCustomer.CustomerPresentAddress.Address;
                //$scope.borrowerprofile.individual.wardno2 = cbsCustomer.CustomerPresentAddress.NearestLandMark;
                //$scope.borrowerprofile.individual.city2 = cbsCustomer.CustomerPresentAddress.UpazillaOrThana;
                //$scope.borrowerprofile.individual.province2 = cbsCustomer.CustomerPresentAddress.District;
                //$scope.borrowerprofile.individual.zipcode2 = cbsCustomer.CustomerPresentAddress.PostalCode;

                ////Borrower Profile >> Spouse Details Tab
                //$scope.borrowerprofile.individual.spouseDetail.name = cbsCustomer.RelationalInformation.SpouseName;

                ////Borrower Profile >> Tax Information Tab
                //$scope.borrowerprofile.individual.taxfileno = cbsCustomer.CustomerIdInfo.ETin;

                ////Borrower Profile >> Nature Of The Income Tab
                //if (cbsCustomer.CustomerOtherInfo.SourceOfFund == 'Salary') {
                //    $scope.borrowerprofile.individual.salariedemp.designation = cbsCustomer.CustomerOtherInfo.Designation;
                //}
            } catch (e) {
                common.preprocesshide();
                alert("MapCBSCustomerToLOS " + e);
            }
        };

        function ParseDateFormatForCBS(date) {
            try {
                var year = date.substring(0, 4);
                var month = date.substring(5, 7);
                var day = date.substring(8, 10);
                var resultdate = month + '/' + day + "/" + year;
                return resultdate;
            } catch (ex) {
                alert("MapCBSRecordToCustomer " + ex);
            }
        };

        Page_Load();

    }]));

app.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = moment(dateString, "DD/MM/YYYY", true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
})