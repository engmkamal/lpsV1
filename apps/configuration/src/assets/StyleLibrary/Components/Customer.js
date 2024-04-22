(app.controller("Customer", function ($scope, $http, $filter, dialogService, $timeout, $mdDialog) {

    /// .................. Variables-------------------------------------
    $scope.generateCIFNo = null;
    $scope.redirectBasedOnPermission = null;

    $scope.customer = {
        id: '',
        name: '',
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

    $scope.customer.listCustomerReference = [];

    $scope.customerReference = {
        id: '',
        name: null,
        value: null,
        active: true
    }
    $scope.cbsSearchTypes = {
        cbscif: 'cbscif',
        nid: 'NID',
        tin: 'TIN'
    };

    $scope.isCBSIntegrationEnabled = false;
    // $scope.branch = {};
    /// .................. Funtions--------------------------------------

    function GetUrlParameters() {
        var customerId = (common.GetParameterByName("id", null));
        return customerId;
    };

    function GetCustomerById() {
        var customerId = GetUrlParameters();
        try {
            $http({
                url: "/Master/GetCustomerById",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify({ customerId: customerId })
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.customer = response.data.output[0];
                    $scope.customer.nic = $scope.customer.identity;
                }
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomerById: " + e);
        }
    };

    function GetCustomers() {
        try {
            common.preprocessload();
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

                var lastcustomerId = $scope.listCustomer[$scope.listCustomer.length - 1].id;

                var generateCIFNo = (new Date()).getFullYear() + "0" + lastcustomerId;
                $scope.generateCIFNo = generateCIFNo;
                $scope.customer.cif = generateCIFNo;
                common.preprocesshide();

            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomers: " + e);
        }
    }

    //function GetCurrentUserBranch() {
    //    try {
    //        $http({
    //            url: "/CPR/GetCurrentUserBranch",
    //            method: "GET",
    //            headers: {
    //                "accept": "application/json;odata=verbose",
    //                "content-Type": "application/json;odata=verbose"
    //            },
    //            data: {}
    //        }).then(function successCallback(response) {
    //            if (response.data.success) {
    //                $scope.branch = response.data.output;
    //                $scope.customer.branch = response.data.output.name;
    //                $scope.customer.branchId = response.data.output.id;
    //                $scope.customer.regionId = response.data.output.regionId;
    //            }
    //        }, function errorCallback(response) {
    //            $scope.error = response;
    //        });
    //    } catch (e) {
    //        alert("GetCurrentUserBranch " + e);
    //    }
    //}

    function GetCustomerReferenceData() {
        try {
            $http({
                url: "/Master/GetCustomerReferenceData",
                method: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success)
                    common.connectivityUrl = response.data.output.bcUrl;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetCustomers: " + e);
        }
    }

    $scope.SearchCustomerInfo_ClickEvent = function (type, input) {
        try {
            //SerachCustomers(type, input);
            if (type == 'cbscif' && $scope.isCBSIntegrationEnabled == true) {
                SearchCustomerFromCBS("CIF", input);
            } else {
                SerachCustomers(type, input);
            }
        } catch (e) {
            alert("SearchBorrowerProfiles_ClickEvent " + e);
        }
    };

    function SerachCustomers(type, input) {
        try {
            common.preprocessload();

            var req = {
                method: 'POST',
                url: common.connectivityUrl + '/api/SearchCustomers?type=' + type + '&input=' + input,
                headers: {
                    "Content-Type": undefined
                },
                withCredentials: false,
                data: {}
            };

            $http(req).then(function success(response) {
                $scope.listSearchCustomer = response.data.output;
                //if ($scope.listSearchCustomer.length == 0) {
                //if ($scope.listSearchCustomer.length == 0 && $scope.isCBSIntegrationEnabled == true) {
                //    SearchCustomerFromCBS('CIF', input);
                //}
                if ($scope.listSearchCustomer == null) {
                    dialogService.ConfirmDialogWithOkay('', "Result Not found");
                }
                else {
                    if ($scope.listSearchCustomer.length == 0) {
                        if ($scope.isCBSIntegrationEnabled == true) {
                            SearchCustomerFromCBS('CIF', input);
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', "Result Not found");
                        }
                    }
                        
                }

                common.preprocesshide();
            }, function error(response) {
                common.preprocesshide();
                $scope.error = response;
            }
            );
        } catch (e) {
            common.preprocesshide();
            alert("SerachCustomers " + e);
        }
    }

    $scope.Check_NID_ClickEvent = function (value) {
        try {

            if (value != null) {

                $http({
                    url: "/Master/CheckCustomerNID",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ nid: value })
                }).then(function successCallback(response) {

                    if (response.data.success) {
                        var output = response.data.output;
                        if (output == true) {
                            dialogService.ConfirmDialogWithOkay('', "NID already exist, try with another NID !!");
                            // dialogService.ConfirmDialogWithOkay('', "Already Exits");
                        }
                        else if (output == false && $scope.isCBSIntegrationEnabled == true) {
                            SearchCustomerFromCBS("NID", value);
                        }

                        else {
                            dialogService.ConfirmDialogWithOkay('', "NID Not Found!");
                            //SearchCustomerFromCBS("NID", value);  
                        }

                    }
                }, function errorCallback(response) {

                });

            }
            else {
                alert("Please Enter NID Number !!");
            }


        } catch (e) {
            console.log(e);
        }
    };

    $scope.Check_TIN_ClickEvent = function (value) {
        try {

            if (value != null) {

                $http({
                    url: "/Master/CheckCustomerTIN",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: JSON.stringify({ taxFileNo: value })
                }).then(function successCallback(response) {

                    if (response.data.success) {
                        var output = response.data.output;
                        if (output == true) {
                            dialogService.ConfirmDialogWithOkay('', "TIN already exist, try with another TIN !!");
                            // dialogService.ConfirmDialogWithOkay('', "Already Exits");
                        }
                        else if (output == false && $scope.isCBSIntegrationEnabled == true) {
                            SearchCustomerFromCBS("NID", value);
                        }
                        else {
                            dialogService.ConfirmDialogWithOkay('', "TIN Not Found!");
                            // SearchCustomerFromCBS("TIN", value);  
                        }
                    }
                }, function errorCallback(response) {

                });

            }
            else {
                alert("Please Enter TIN Number !!");
            }


        } catch (e) {
            console.log(e);
        }
    };

    function ValidateFormData() {
        try {
            if ($scope.customer.personal == false) {
                if (!$scope.customer.taxFileNo) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the TIN!");
                    return false;
                }
                if (!$scope.customer.nic) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Register No!");
                    return false;
                }
                if (!$scope.customer.address1) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Register Address!");
                    return false;
                }
                if (!$scope.customer.name) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Borrowe Name!");
                    return false;
                }
                if (!$scope.customer.telephone1) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Contact No!");
                    return false;
                }


                return true;
            }
            if ($scope.customer.personal == true) {
                //if (!$scope.customer.email.isValid) {
                //    dialogService.ConfirmDialogWithOkay('', "Please fill the Correct Email");
                //    return false;
                //}
                if (!$scope.customer.nic) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the NID!");
                    return false;
                }
                if (!$scope.customer.name) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Name!");
                    return false;
                }
                if (!$scope.customer.customerdate) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Birthday!");
                    return false;
                }
                if (!$scope.customer.gender) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Gender!");
                    return false;
                }
                if (!$scope.customer.maritalStatus) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Marital Status!");
                    return false;
                }
                if (!$scope.customer.address1) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Present Address!");
                    return false;
                }
                if (!$scope.customer.address2) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Parmanent Address!");
                    return false;
                }
                if (!$scope.customer.telephone1) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Mobile!");
                    return false;
                }
                if (!$scope.customer.nationality) {
                    dialogService.ConfirmDialogWithOkay('', "Please fill the Nationality!");
                    return false;
                }

                return true;
            }
            return true;

        } catch (e) {
            alert('ValidateFormData ' + e);
            common.preprocesshide();
        }
    };
    $scope.sameAsPresentAddress = function (val) {
        if (val == true) {
            $scope.customer.address2 = $scope.customer.address1;
            $scope.customer.permanentPostOffice = $scope.customer.presentPostOffice;
            $scope.customer.permanentUpazilla = $scope.customer.presentUpazilla;
            $scope.customer.permanentDistrict = $scope.customer.presentDistrict;
            $scope.customer.permanentCountryId = $scope.customer.presentCountryId;
        } else {
            $scope.customer.address2 = null;
            $scope.customer.permanentPostOffice = null;
            $scope.customer.permanentUpazilla = null;
            $scope.customer.permanentDistrict = null;
            $scope.customer.permanentCountryId = $scope.listNationality[0].id;
        }
    };
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
                $scope.customer.nationality = $scope.listNationality[0].name;
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("Exception GetAllNationality: " + e);
        }
    }

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
                $scope.customer.presentCountryId = $scope.listCountry[0].id;
                $scope.customer.permanentCountryId = $scope.listCountry[0].id;
            }, function errorCallback(response) {
                $scope.error = response;
            });

        } catch (e) {
            alert("Exception GetAllCountry: " + e);
        }
    }

    function SubmitCustomer() {
        try {
            if (ValidateFormData()) {
                $scope.redirectBasedOnPermission = $scope.customer.id;
                common.preprocessload();
                $scope.customer.identity = $scope.customer.nic;
                $scope.customer.registerNo = $scope.customer.nic;
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

                        if ($scope.customer.personal == true) {
                            $scope.showPrerenderedDialog();
                        }
                        if ($scope.customer.personal == false) {
                            $scope.showPrerenderedNonPersonalDialog();
                        }


                    }
                    else {
                        common.preprocesshide();
                        dialogService.ShowDialog(response.data.message);
                    }
                }, function errorCallback(response) {
                    common.preprocesshide();
                });
            }
        } catch (e) {
            alert('SubmitCustomer ' + e);
            common.preprocesshide();
        }
    }

    $scope.CancelCustomer_ClickEvent = function () {
        try {
            ResetCustomer();
        }
        catch (ex) {
            alert("Exception in CancelCustomer_ClickEvent " + ex);
        }
    };

    function ResetCustomer() {
        $scope.customer = {
            id: '',
            cif: $scope.generateCIFNo,
            name: '',
            personal: true,
            identity: null,
            registerNo: null,
            nic: null,
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
            noofdependents: null,
            taxFileNo: null,
            sourceofincome: null,
            employername: null,
            jobtitle: null,
            experience: null,
            maritalStatus: null,
            active: true
        };

    }

    $scope.Page_Load = function () {
        GetCustomerReferenceData();
        // GetCurrentUserBranch();
        GetAllNationality();
        GetAllCountry();
        $scope.customer.cif = "Pending";
        $scope.generateCIFNo = "Pending";
        var urlParameter = GetUrlParameters();
        if (urlParameter != null) {
            //GetCustomers();    
            GetCustomerById();
        }
        $scope.isCBSIntegrationEnabled = common.isCBSIntegrationEnabled;
    };

    $scope.Submit_ClickEvent = function () {
        try {
            //GetCustomers();
            var urlParameter = GetUrlParameters();
            if (urlParameter != null) {
                SubmitCustomer();
            } else {
                if ($scope.customer.cif == $scope.generateCIFNo)
                    SubmitCustomer();
                else
                    alert('CIF No is already Created now, Please Refresh the page.');
            }
        } catch (e) {
            alert('SubmitCustomer_ClickEvent ' + e);
        }
    };

    $scope.Page_Load();

    $scope.AddCustomerReference_ClickEvent = function (item) {
        try {
            if (item != null) {
                $scope.customerReference = item;
                $scope.customer.listCustomerReference.push($scope.customerReference);
                $scope.customerReference = {
                    id: '',
                    name: null,
                    value: null,
                    active: true
                };

            }
        } catch (e) {
            alert("Exception AddCustomerReference_ClickEvent " + e);
        }
    };

    $scope.RemoveCustomerReference_ClickEvent = function (list, item) {
        try {
            if (item.id == null)
                status = common.RemoveItemFromList(list, item, true);
            else
                status = common.SetActiveFalseForRemovedItem(list, item);

        } catch (e) {
            alert("Exception RemoveCustomerReference_ClickEvent " + e);
        }
    };

    $scope.showPrerenderedDialog = function (ev) {
        $mdDialog.show({
            contentElement: '#myDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        });
    };

    $scope.showPrerenderedNonPersonalDialog = function (ev) {
        $mdDialog.show({
            contentElement: '#myNonPersonalDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        });
    };

    $scope.modalCancel = function () {
        $mdDialog.cancel();
        ResetCustomer();
        if ($scope.redirectBasedOnPermission != null && $scope.redirectBasedOnPermission != '') {
            var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            //if (spHostUrl !== null) {
            //    window.location.href = common.adminRedirectUrl += spHostUrl;
            //}
            common.RedirectHome();
        } else {
            common.RedirectHome();
        }

    };
    $scope.modalNonPersonalCancel = function () {
        $mdDialog.cancel();
        ResetCustomer();
        if ($scope.redirectBasedOnPermission != null && $scope.redirectBasedOnPermission != '') {
            //var spHostUrl = common.GetParameterByName("SPHostUrl", null);
            //if (spHostUrl !== null) {
            //    window.location.href = common.adminRedirectUrl += spHostUrl;
            //}
            common.RedirectHome();
        } else {
            common.RedirectHome();
        }
    };
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
                    if (idType == $scope.cbsSearchTypes.nid) {
                        // if (cbsCustomerResponse.output.FirstNsame != null) {
                        dialogService.ConfirmDialogWithYesNo("", "This NID is available in CBS. Do you want to load the record?").then(function (answer) {
                            if (answer) {
                                //MapCBSRecordToCustomer(cbsCustomerResponse.RspnsData.Result);
                                MapCBSRecordToCustomer(cbsCustomerResponse.output);
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }
                    //TIN
                    if (idType == $scope.cbsSearchTypes.tin) {
                        // if (cbsCustomerResponse.output.FirstNsame != null) {
                        dialogService.ConfirmDialogWithYesNo("", "This TIN is available in CBS. Do you want to load the record?").then(function (answer) {
                            if (answer) {
                                //MapCBSRecordToCustomer(cbsCustomerResponse.RspnsData.Result);
                                MapCBSRecordToCustomerBySearchingTIN(cbsCustomerResponse.output);
                            }
                            else
                                return false;
                        }, function () {
                            return false;
                        });
                    }


                    else {
                        MapCBSCustomerToLOS(cbsCustomerResponse.output);
                    }
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
            ResetCustomer();
            $scope.listSearchCustomer = [];
            $scope.customer.cif = "Pending";
            $scope.customer.taxFileNo = "11111";//cbsCustomer.tinNumber
            $scope.customer.name = cbsCustomer.FirstNsame + ' ' + cbsCustomer.lastName;
            //$scope.customer.name = cbsCustomer.PersonalInformation.Name;
            //$scope.customer.personal = true;
            $scope.customer.cbsCIF = "1231212123";//cbsCustomer.PersonalInformation.CustomerNo;
            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer.maritalStatus = cbsCustomer.PersonalInformation.MaritalStatus;
            //$scope.customer.nationality = cbsCustomer.PersonalInformation.Nationality;
            //if (cbsCustomer.PersonalInformation.Gender == 'M')
            //    $scope.customer.gender = "Male";
            //else
            //    $scope.customer.gender = "Female";

            //$scope.customer.address2 = cbsCustomer.CustomerPresentAddress.Address + ' ' + cbsCustomer.CustomerPresentAddress.District + ' ' + cbsCustomer.CustomerPresentAddress.Division;
            //$scope.customer.address1 = cbsCustomer.CustomerPermanentAddress.Address + ' ' + cbsCustomer.CustomerPermanentAddress.District + ' ' + cbsCustomer.CustomerPermanentAddress.Division;
            //$scope.customer.telephone1 = cbsCustomer.CustomerPermanentAddress.Mobile;
            //$scope.customer.telephone2 = cbsCustomer.CustomerPermanentAddress.Phone;
            //$scope.customer.nic = cbsCustomer.CustomerPermanentAddress.NationalID;
            //$scope.customer.email = cbsCustomer.CustomerIdInfo.Email;
            //$scope.customer.customerdate = ParseDateFormatForCBS(cbsCustomer.PersonalInformation.DateOfBirth);
            if (cbsCustomer != null) {
                $scope.customer.IsCBSRecord = true;
            }
            $scope.listSearchCustomer.push($scope.customer);
            console.log($scope.listSearchCustomer);
            ResetCustomer();


            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer = {
            //    id: '',
            //    name: '',
            //    personal: true,
            //    identity: null,
            //    cif: null,
            //    nic: null,
            //    customerdate: null,
            //    ownership: null,
            //    title: null,
            //    address1: null,
            //    address2: null,
            //    telephone1: null,
            //    telephone2: null,
            //    fax: null,
            //    nationality: null,
            //    email: '',
            //    gender: null,
            //    taxNo: null,
            //    customerclassification: null,
            //    branch: null,
            //    officerCode: null,
            //    sectorCode: null,
            //    noofdependents: null,
            //    taxFileNo: null,
            //    sourceofincome: null,
            //    employername: null,
            //    jobtitle: null,
            //    experience: null,
            //    maritalStatus: null,
            //    groupname: null,
            //    groupid: null,
            //    active: true,
            //    listCustomerReference: null
            //};

        } catch (e) {
            common.preprocesshide();
            alert("MapCBSCustomerToLOS " + e);
        }
    }
    function MapCBSRecordToCustomer(cbsCustomer) {
        try {
            $scope.customer.name = cbsCustomer.FirstNsame + ' ' + cbsCustomer.lastName;
            $scope.customer.cbsCIF = "1231212123";//cbsCustomer.PersonalInformation.CustomerNo;
            $scope.customer.taxFileNo = "11111";//cbsCustomer.tinNumber
            //$scope.customer.name = cbsCustomer.PersonalInformation.Name;
            //$scope.customer.personal = true;
            //$scope.customer.title = cbsCustomer.PersonalInformation.CustomerTitle;
            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer.cbsCIF = cbsCustomer.PersonalInformation.CustomerNo;
            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer.maritalStatus = cbsCustomer.PersonalInformation.MaritalStatus;
            //$scope.customer.nationality = cbsCustomer.PersonalInformation.Nationality;
            //if (cbsCustomer.PersonalInformation.Gender == 'M')
            //    $scope.customer.gender = "Male";
            //else
            //    $scope.customer.gender = "Female";

            //$scope.customer.address2 = cbsCustomer.CustomerPresentAddress.Address + ' ' + cbsCustomer.CustomerPresentAddress.District + ' ' + cbsCustomer.CustomerPresentAddress.Division;
            //$scope.customer.address1 = cbsCustomer.CustomerPermanentAddress.Address + ' ' + cbsCustomer.CustomerPermanentAddress.District + ' ' + cbsCustomer.CustomerPermanentAddress.Division;
            //$scope.customer.telephone1 = cbsCustomer.CustomerPermanentAddress.Mobile;
            //$scope.customer.telephone2 = cbsCustomer.CustomerPermanentAddress.Phone;
            //$scope.customer.email = cbsCustomer.CustomerPermanentAddress.Email;

            //$scope.customer.customerdate = ParseDateFormatForCBS(cbsCustomer.PersonalInformation.DateOfBirth);

        } catch (e) {
            common.preprocesshide();
            alert("MapCBSRecordToCustomer " + e);
        }
    }
    function MapCBSRecordToCustomerBySearchingTIN(cbsCustomer) {
        try {
            $scope.customer.name = cbsCustomer.FirstNsame + ' ' + cbsCustomer.lastName;
            $scope.customer.taxFileNo = "11111";//cbsCustomer.tinNumber
            //$scope.customer.name = cbsCustomer.PersonalInformation.Name;
            $scope.customer.personal = false;
            $scope.customer.cbsCIF = "1231212123";//cbsCustomer.PersonalInformation.CustomerNo;
            //$scope.customer.title = cbsCustomer.PersonalInformation.CustomerTitle;
            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer.cbsCIF = cbsCustomer.PersonalInformation.CustomerNo;
            //$scope.customer.customerdate = cbsCustomer.PersonalInformation.DateOfBirth;
            //$scope.customer.maritalStatus = cbsCustomer.PersonalInformation.MaritalStatus;
            //$scope.customer.nationality = cbsCustomer.PersonalInformation.Nationality;
            //if (cbsCustomer.PersonalInformation.Gender == 'M')
            //    $scope.customer.gender = "Male";
            //else
            //    $scope.customer.gender = "Female";

            //$scope.customer.address2 = cbsCustomer.CustomerPresentAddress.Address + ' ' + cbsCustomer.CustomerPresentAddress.District + ' ' + cbsCustomer.CustomerPresentAddress.Division;
            //$scope.customer.address1 = cbsCustomer.CustomerPermanentAddress.Address + ' ' + cbsCustomer.CustomerPermanentAddress.District + ' ' + cbsCustomer.CustomerPermanentAddress.Division;
            //$scope.customer.telephone1 = cbsCustomer.CustomerPermanentAddress.Mobile;
            //$scope.customer.telephone2 = cbsCustomer.CustomerPermanentAddress.Phone;
            //$scope.customer.email = cbsCustomer.CustomerPermanentAddress.Email;

            //$scope.customer.customerdate = ParseDateFormatForCBS(cbsCustomer.PersonalInformation.DateOfBirth);

        } catch (e) {
            common.preprocesshide();
            alert("MapCBSRecordToCustomerBySearchingTIN " + e);
        }
    }

    $scope.SelectCBSCustomer_Click = function (cbsCuster) {
        try {
            $scope.customer = cbsCuster;
            $scope.myTabIndex = 0;
        } catch (ex) {
            common.preprocesshide();
            alert("SelectCBSCustomer_Click " + ex);
        }
    };
}));
app.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    };
    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = moment(dateString, 'MM/DD/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});