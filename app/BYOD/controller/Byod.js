function imgUpld(id) {
    angular.element(document.getElementById(id)).scope().imgUpload(id);
}
function delImg(a) {
    angular.element(document.getElementById(a)).scope().delImg(a);
}
function setUrl(a, b) {
    if (b == 'pdf') {
        $("#imgBig").css('display', 'none');
        $("#pdfBig").css('display', 'block');
        var showPicture = document.querySelector("#pdfBig");
        showPicture.src = "data:application/pdf;base64," + a;
    } else {
        $("#imgBig").css('display', 'block');
        $("#pdfBig").css('display', 'none');
        var showPicture = document.querySelector("#imgBig");
        showPicture.src = "data:image/jpeg;base64," + a;
    }
}

mainApp.controller('ByodController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
    $scope.enableResendButton = false;
    $scope.enableEmailResendButton = false;
    $scope.otpSectionShow = false;
    $scope.emailResendDisable = false;
    $scope.mobileResendDisable = false;
    $scope.emailResendStatus = false;
    $scope.mobileResendStatus = false;
    $rootScope.formData.stageInfo = '1a';
    $rootScope.formData.fields.cityName = '';
    $rootScope.krasearch = false;
    $scope.emptyUsername = false;
    $scope.successUsername = false;
    $rootScope.OtpLimitExceed = false;
    $scope.initialName = true;
    $scope.enableOTPButton = false;
    $scope.validUsername = false;
    $rootScope.hideDigiBtn = false;
    $rootScope.hideDigiBtn = false
    $scope.panEmailRegError = false;
    $scope.panMobileRegError = false;
    $scope.panMobileRegMsg = "";
    $scope.panEmailRegMsg = "";
    $scope.changeEmailShow = false;
    $scope.derivativesDisable = true;
    //$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    $scope.filter = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    $scope.isMobileVerified = 'N';
    $scope.isEmailVerified = 0;
    $scope.Pannamemismatched = false;
    $scope.panErrMis = false;
    $scope.dobEnteruser = false;
    $scope.nameonCardPan = true;
    $scope.panRmDBO = false;
    $scope.BYODPanStage = false;
    $scope.BYODAddressStage = false;
    $scope.BYODPersonalStage = false;
    $scope.BYODBankSatge = false;
    $scope.BYODPlanStage = false;
    $scope.BYODDocument = false;
    $rootScope.firstCompleted = false;
    $rootScope.secondCompleted = false;
    $rootScope.thirdCompleted = false;
    $rootScope.fourthCompleted = false;
    $rootScope.fifthCompleted = false;
    $rootScope.sixthCompleted = false;
    $scope.sampleByod = false;
    $scope.satgeone = true;
    $scope.satgetwo = true;
    $scope.satgethree = true;
    $scope.satgefour = true;
    $scope.satgefive = true;
    $scope.satgesix = true;
    // $scope.owlitem6 = 2;
    // $scope.owlitem = 3;
    $scope.panImageValidation = '';
    $scope.sigImageValidation = '';
    $scope.photoProofImageValidation = '';
    $scope.chequeImageValidation = '';
    $scope.caddressProofImageValidation = '';
    $scope.paddressProofImageValidation = '';
    $scope.incomeProofImageValidation = '';
    $scope.poaImageValidation = '';
    $scope.tcImageValidation = '';
    $scope.amImageValidation = '';
    $scope.cmlImageValidation = '';
    $scope.AadhaarBackImg = false;
    $scope.panSample = false;
    $scope.signatureSample = false;
    $scope.photoSample = false;
    $scope.chequeSample = false;
    $scope.documentSample = false;
    $scope.liveface = false;
    $scope.pdocumentSample = false;
    $scope.panUpld = true;
    $scope.imgPanName = "";
    $scope.PanimgValue = ""
    $scope.PanFileType = "";
    $scope.PandocId = "";
    $scope.aadhaarvalidation = false;
    $scope.photoUpld = true;
    $scope.addressUpld = true;
    $rootScope.getAPI = true;
    $scope.otpSuccess = false;
    $scope.hideEsign = false;
    $scope.ImgData = true;
    $scope.docImgCompleted = false;
    $scope.IsSelfi = 'N';
    $scope.showlinktoCustomer = true;
    $scope.validateImgFlag = true;
    $scope.cmlShow = false;
    $rootScope.wizardShow = true;
    $scope.optimize = true;
    $scope.ddpi = 'Y';
    $scope.loadPdf = true;
    $scope.preview7 = false;
    $scope.panimageShows = false;
    $scope.Gendervalue = true;
    $scope.Educationvalue = true;
    $scope.occupationvalue = true;
    $scope.MaritalValue = true;
    $scope.Fathervalue = true;
    $scope.MotherValue = true;
    $scope.SourceValue = true;
    $scope.AnnualValue = true;
    $scope.TradeValue = true;
    $scope.politicalvalue = true;
    $scope.CustomerName = false;
    $scope.corress1 = true;
    $scope.corress2 = true;
    $scope.corress3 = true;
    $scope.ResidelcAddressType = false;
    $scope.corressPin = true;
    $scope.corressCity = true;
    $scope.EmailAlready = false;
    $scope.EmailBYOD = false;
    $scope.MobileBYOD = false;
    $scope.defaultPlan = true;
    $scope.derivativesDisable = true;
    $scope.owlitem6 = 2;
    $scope.owlitem = 3;
    $scope.planList = [];
    $rootScope.result = false;
    $scope.psArray = 0;
    $scope.productAction = false;
    $scope.CheckimageByodShow = false;
    $scope.foImgError1 = false;
    $scope.chkselct6 = true;
    $scope.chkselct2 = true;
    $scope.chkselct3 = true;
    $scope.chkPref = true;
    $scope.chkMITC = true;
    $scope.chkEMargin = false;
    $scope.ddpi = false;
    $scope.signatureimg = false;
    $rootScope.formData.fields.DocsaddressProof = "0";
    $scope.lgcodereq = false;
    $scope.getProductDetails = false;
    $scope.freezeLG = false;
    $scope.emailErrorMessage = "";
    $scope.emptyEmail = false;
    $scope.byodErrorMessage = "";
    $scope.emailVerificationSend = false;
    $scope.emailEmpty = true;
    $scope.mobileBelongsShow = false;
    $scope.emailIdBelongsShow = false;
    $scope.changeMobileNum = false;
    $scope.emptyMobile = false;
    $scope.mobileErrorMessage = "";
    $scope.mobileRegex = /^[6-9]\d{9}$/;
    $scope.showotpMobile = false;
    $scope.oldMobileNumber = "";
    $scope.otpEmpty = false;
    $scope.otpErrorMessageMobile = "";
    $scope.DisabilityVal = 'N';
    $scope.DisabilityValue = true;
    $scope.DDpiErr = false;
    $scope.ddpiError = false;
    $rootScope.formData.fields.InternetTrading = "";
    $('#equity').prop('checked', true);
    $('#equity').prop('disabled', true);
    $('#mutualfunds').prop('checked', true);
    $('#mutualfunds').prop('disabled', true);
    setTimeout(function () {

        $("#caddressType option:contains(" + $rootScope.formData.fields.cAddressType + ")").prop('selected', true);
        $(".select").select2();
        $scope.selectShow = true;

        $('.modal').modal('hide');
        $(document.body).removeClass('modal-open');
        $('body').css({ 'overflow': 'auto', 'padding': '0' });
        $('.modal-backdrop').remove();
    }, 500);
    $scope.owlSet = function () {
        $scope.owlOptionsTestimonials = {
            loop: false,
            autoPlay: 4000,
            stopOnHover: true,
            slideSpeed: 300,
            paginationSpeed: 600,
            items: 3,
            nav: true,
            dots: false,
            autoWidth: true,
            navText: ["<img src='assets/images/leftarrowNew.png'>", "<img src='assets/images/rightarrowNew.png'>"],
            center: false,
            responsive: {
                0: {
                    items: 3,
                    nav: true,
                    autoWidth: true,
                },
                600: {
                    items: $scope.owlitem6,
                    nav: true,
                    touchDrag: false,
                    mouseDrag: false,
                    autoWidth: true,
                },
                1000: {
                    items: $scope.owlitem,
                    nav: true,
                    touchDrag: false,
                    mouseDrag: false,
                    autoWidth: true,
                }
            }
        }
    }
    setTimeout(function () {
        $(".select").select2();
    }, 500);
    $('#agree-terms').prop('checked', true);

    $(".input-upload").fileinput({
        'showUpload': false,
        'browseLabel': 'UPLOAD',
        'browseIcon': '',
        'previewFileType': 'any'
    });
    $(".input-upload-front").fileinput({
        'showUpload': false,
        'browseLabel': 'FRONT IMAGE',
        'browseIcon': '',
        'previewFileType': 'any'
    });
    $(".input-upload-back").fileinput({
        'showUpload': false,
        'browseLabel': 'BACK IMAGE',
        'browseIcon': '',
        'previewFileType': 'any'
    });
    $scope.openCollapse = function () { }

    $('a.collapseTag').on('focus', function () {
        var a = $(this).attr('title');
        $('#' + a).collapse('show');
    })

    $('input, select').on('keypress', function () {
        var a = $(this).closest('div.collapse').attr('id') + 'Error';
        $scope[a] = false;
    })
    $scope.overallApi = function () {
        var s_url = "GetOverallStatusDIY";

        if (!$rootScope.formData.eRefNumber && sessionStorage.getItem('AxNo')) {
            $rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
        } else {
            if (!$rootScope.formData.eRefNumber) {
                sessionStorage.clear();
                location.reload();
            }
        }
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber
        };
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            $scope.BYODDocument = false;
            $scope.BYODPlanStage = false;
            $rootScope.DifferentlyAbledStatus = response.DifferentlyAbledStatus;
            if ($rootScope.DifferentlyAbledStatus === 'Y') {
                $('#existingCustomer-popup').modal('hide');
                const ele = document.getElementById('OverallDisabilityModal');
                var m = new bootstrap.Modal(ele, {
                    backdrop: 'static',
                    keyboard: false
                });
                m.show();
                return;
            }
            $rootScope.formData.ReferenceNumber = response.OverallStatusList[0].ReferenceNumber
            if (response.OverallStatusList[9].SPStatus == 'Y') {
                $rootScope.esignCompleted = true;
            } else {
                $rootScope.esignCompleted = false;
            }
            /*  if (response.OverallStatusList[1].SPStatus != 'Y'){
                 $scope.BYODAddressStage=true;
                 $('#collapseProfile').collapse('show');
                 $scope.collapseProfileError = true;
                 $scope.getProfileInfo();
             }else  */
            if ((response.OverallStatusList[4].IsEmailVerified != true) || response.OverallStatusList[4].EBOStatus == 'R' || response.OverallStatusList[4].SPStatus != 'Y') {
                $scope.BYODPersonalStage = true;
                $('#collapseInfo').collapse('show');
                // $scope.collapseInfoError = true;  
                $scope.getPersonalInfo();

                $scope.getProductInfo();
                $scope.getDocsProof();
                if (response.OverallStatusList[2].SPStatus != 'Y') {
                    $scope.BYODPlanStage = true;
                }
                // if(response.OverallStatusList[5].SPStatus != 'Y'){
                //     $scope.BYODDocument=true;
                // }
            } else if (response.OverallStatusList[2].SPStatus != 'Y') {
                $scope.BYODPlanStage = true;
                $('#collapseProduct').collapse('show');
                $scope.collapseProductError = true;
                $scope.getProductInfo();
                $scope.getDocsProof();
                // if(response.OverallStatusList[5].SPStatus != 'Y'){
                //     $scope.BYODDocument=true;
                // }
            }
            else if (response.OverallStatusList[5].SPStatus != 'Y') {
                // $scope.BYODDocument=true;
                // $('#collapseDocument').collapse('show');
                $scope.getDocsProof();
            }
            // else if(response.OverallStatusList[5].SPStatus == 'Y' &&response.OverallStatusList[2].SPStatus == 'Y' &&response.OverallStatusList[4].SPStatus == 'Y'&&response.OverallStatusList[9].SPStatus == 'Y'){
            //     $scope.updateIPVStage('');
            // 	$state.go('complete');

            // }
            else {
                $scope.ComfirmDocument();
            }
        })
    }
    $scope.overallApi();
    $scope.getProfileInfo = function () {
        if (!$rootScope.formData.eRefNumber) {
            $rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
        }

        var s_url = "DIYGetClientPersonalInfoByReferenceNumber";
        var refNum = "";
        if ($rootScope.formData.eRefNumber) {
            refNum = $rootScope.formData.eRefNumber
        } else {
            refNum = sessionStorage.getItem('AxNo');
        }
        var sendData = {
            ReferenceNumber: refNum,
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken
        }

        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            if (response.IsSuccess) {

                if (response.ObjCDIYClientProfile.UID != null && response.ObjCDIYClientProfile.UID != '') {
                    $rootScope.formData.fields.aadharNumber = response.ObjCDIYClientProfile.UID;
                    sessionStorage.removeItem('RxUID');
                    $scope.uidFreeze = true;
                    $rootScope.formData.changeAadhar = false;
                    setTimeout(function () {
                        $("#ktitle").val(response.ObjCDIYClientProfile.ClientPrefixID);
                    }, 500);
                } else {
                    $scope.uidFreeze = false;
                }

                if (response.ObjCDIYClientProfile.AadharAuthorisation != null && response.ObjCDIYClientProfile.AadharAuthorisation != '') {
                    $rootScope.formData.fields.aadharAuthorize = response.ObjCDIYClientProfile.AadharAuthorisation;
                }
                //$rootScope.formData.IsKRAUpdate = response.ObjCDIYClientProfile.IsKRAUpdate;

                if (response.ObjCDIYClientProfile.FirstName) {
                    $rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
                }
                $rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
                if (response.ObjCDIYClientProfile.LastName) {
                    $scope.lastnameFreeze = true;
                    $rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
                } else {
                    $rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
                }
                $scope.nameFreeze = true;
                $rootScope.formData.fields.title = response.ObjCDIYClientProfile.ClientPrefixID;

                if ($rootScope.formData.fields.title == 'MR') {
                    $scope.dataGender = 'M';
                }

                if ($rootScope.formData.fields.title == 'MRS' || $rootScope.formData.fields.title == 'MISS' || $rootScope.formData.fields.title == 'MS') {
                    $scope.dataGender = 'M';
                }
                $scope.digiStatus = response.ObjCDIYClientProfile.Digilocker;

                setTimeout(function () {
                    $("#ktitle").val(response.ObjCDIYClientProfile.ClientPrefixID);
                }, 500);
                if ($rootScope.formData.digiData) {
                    $("#kra_title").val($rootScope.formData.fields.title);
                }
                setTimeout(function () {

                    $(".select").select2();
                }, 500);

                //$rootScope.formData.fields.cAddressType = response.ClientAddressDetailsList[0].AddrTypeID;
                if ($rootScope.formData.IsCKYCUpdate == 'Y' || sessionStorage.getItem('IsCKYCUpdate') == 'Y') {
                    $scope.ckycbtn = true;
                    $rootScope.formData.chgAdrDisable = true;
                    $rootScope.formData.changeCKYC = true;
                    $rootScope.formData.CKYC = false;
                } else {
                    if (!(sessionStorage.getItem('IsKRA'))) {
                        $rootScope.formData.IsCKYCUpdate == 'N';
                        $rootScope.formData.changeCKYC = false;
                    }
                }

                $rootScope.formData.fields.cAddress1 = response.ClientAddressDetailsList[0].AddressLine1;
                $rootScope.formData.fields.cAddress2 = response.ClientAddressDetailsList[0].AddressLine2;
                $rootScope.formData.fields.cAddress3 = response.ClientAddressDetailsList[0].AddressLine3;

                $rootScope.formData.fields.cCity = response.ClientAddressDetailsList[0].City;

                $rootScope.formData.fields.cPin = response.ClientAddressDetailsList[0].PinCode;
                if (response.ClientAddressDetailsList[0].AddressLine1) {
                    $scope.corress1 = false;
                }
                if (response.ClientAddressDetailsList[0].AddressLine2) {
                    $scope.corress2 = false;
                }
                if (response.ClientAddressDetailsList[0].PinCode) {
                    $scope.corressPin = false;
                }
                if (response.ClientAddressDetailsList[0].City) {
                    $scope.corressCity = false;
                }
                if ($rootScope.formData.fields.cCity != null && !$rootScope.formData.KRA) {
                    setTimeout(function () {
                        $('#city1_value').val($rootScope.formData.fields.cCity);
                        $('#cPin_value').val(response.ClientAddressDetailsList[0].PinCode);
                    }, 500);
                    //$('#city1_value').focus();
                    //$('#cPin_value').focus();
                } else if ($rootScope.formData.fields.cCity != null && $rootScope.formData.KRA) {
                    setTimeout(function () {
                        $('#kCity').val($rootScope.formData.fields.cCity);
                        $('#pin').val(response.ClientAddressDetailsList[0].PinCode);
                    }, 500);
                }
                $rootScope.formData.fields.cStateName = response.ClientAddressDetailsList[0].State;
                $rootScope.formData.fields.cDistrict = response.ClientAddressDetailsList[0].District;

                $rootScope.formData.cdValid = true;

                var s_url = "DIYGetCityListForAutoFill?StateID=" + response.ClientAddressDetailsList[0].StateId;
                serverService.getApi(s_url).then(function (a) {
                    var response = a.data;
                    $rootScope.formData.cpinapiLoading = false;
                    $rootScope.formData.ccityList = [];
                    var len = response.StateDetailsList.length;
                    for (var j = 0; j < len; j++) {
                        $rootScope.formData.ccityList.push(response.StateDetailsList[j].City.toLowerCase());
                    }
                })

                if (response.ClientAddressDetailsList[1].IsSamePermenantAddress == 1) {
                    $rootScope.formData.fields.sameAddress = true;
                    $rootScope.formData.pdValid = true;

                    $('#oldaddress').prop('checked', true);

                } else {
                    $rootScope.formData.unCheckSameAddress = true;
                    $rootScope.formData.fields.sameAddress = false;
                    $rootScope.formData.pdValid = true;
                    $('#oldaddress').prop('checked', false);
                    if ($rootScope.webfinacle) {
                        $rootScope.formData.kraPerAdr = true;
                        setTimeout(function () {
                            $('#pPin_value').prop('disabled', true);
                            $('#city2_value').prop('disabled', true);
                        }, 500);
                    }
                }
                if (response.ClientAddressDetailsList[0].AddrTypeID != null) {
                    setTimeout(function () {
                        $rootScope.formData.fields.cAddressType = (response.ClientAddressDetailsList[0].AddrTypeID).toString();

                        $("#cAddressType option:contains(" + $rootScope.formData.fields.cAddressType + ")").prop('selected', true);
                        $scope.selectShow = true;
                        $scope.$apply();
                    }, 10)
                }
                if (response.ClientAddressDetailsList[1].AddrTypeID != null) {
                    setTimeout(function () {
                        $rootScope.formData.fields.pAddressType = (response.ClientAddressDetailsList[1].AddrTypeID).toString();

                        $("#pAddressType option:contains(" + $rootScope.formData.fields.pAddressType + ")").prop('selected', true);
                        $scope.$apply();
                    }, 500)
                }
                //$rootScope.formData.fields.pAddressType = response.ClientAddressDetailsList[1].AddrTypeID;
                $rootScope.formData.fields.pAddress1 = response.ClientAddressDetailsList[1].AddressLine1;
                $rootScope.formData.fields.pAddress2 = response.ClientAddressDetailsList[1].AddressLine2;
                $rootScope.formData.fields.pAddress3 = response.ClientAddressDetailsList[1].AddressLine3;

                if (response.ClientAddressDetailsList[1].StateId != null && !$rootScope.formData.fields.sameAddress) {

                    $rootScope.formData.fields.pStateName = response.ClientAddressDetailsList[1].State;
                }

                $rootScope.formData.fields.pDistrict = response.ClientAddressDetailsList[1].District;
                $rootScope.formData.fields.pPin = response.ClientAddressDetailsList[1].PinCode;
                $rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
                // $rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
                $rootScope.formData.fields.pCity = response.ClientAddressDetailsList[1].City;
                if (response.ObjCDIYClientProfile.Email) {
                    $rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
                    $scope.EmailBYOD = false;
                    $scope.emailEmpty = true;
                    if (sessionStorage.getItem('byodemailverifylinksend')) sessionStorage.removeItem('byodemailverifylinksend');
                } else {
                    if (sessionStorage.getItem('byodemailverifylinksend')) {
                        $scope.byodErrorMessage = "Verification URL has been send to your Email Please Verify and Continue the Journey";
                        $scope.ModalTrigger("byodModal", true);
                        $scope.BYODPersonalStage = true;
                        return;
                    }
                    $scope.EmailBYOD = true;
                    $scope.emailEmpty = false;
                }

                $rootScope.formData.pdValid = true
                $rootScope.otpRequired = false;
                $rootScope.formData.fields.pPin = response.ClientAddressDetailsList[1].PinCode;

                var s_url = "DIYGetCityListForAutoFill?StateID=" + response.ClientAddressDetailsList[1].StateId;
                serverService.getApi(s_url).then(function (a) {
                    var response = a.data;
                    $rootScope.formData.ppinapiLoading = false;
                    $rootScope.formData.pcityList = [];
                    var len = response.StateDetailsList.length;
                    for (var j = 0; j < len; j++) {
                        $rootScope.formData.pcityList.push(response.StateDetailsList[j].City.toLowerCase());
                    }
                })
                $rootScope.formData.fields.pState = (response.ClientAddressDetailsList[1].StateId).toString();

                if ($rootScope.formData.fields.pCity) {
                    setTimeout(function () {
                        $('#pPin_value').val(response.ClientAddressDetailsList[1].PinCode);
                        $('#city2_value').val($rootScope.formData.fields.pCity);
                    }, 500);
                }
                if ($rootScope.webfinacle) {
                    $scope.finDataShow = true;
                    $('#pin').val(response.ClientAddressDetailsList[0].PinCode);
                    $('#kra_title').val($rootScope.formData.fields.title);
                    if (response.ClientAddressDetailsList[1].PinCode) {
                        $('#pPin_value').val(response.ClientAddressDetailsList[1].PinCode);
                    }
                    setTimeout(function () {
                        $(".select").select2();
                    }, 500)
                }

                // setTimeout(function () {
                // 	$scope.checkradioinit();
                // }, 1010)

            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            } else {
                if (response.ObjCDIYClientProfile.FirstName) {
                    $rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
                }
                if (response.ObjCDIYClientProfile.MiddleName) {
                    $rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
                }
                if (response.ObjCDIYClientProfile.LastName) {
                    $scope.lastnameFreeze = true;
                    $rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
                } else {
                    if (response.ObjCDIYClientProfile.FirstName) {
                        $rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
                    }
                }
                if (response.ObjCDIYClientProfile.Mobile) {
                    $rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
                }
                if (response.ObjCDIYClientProfile.Email) {
                    $rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
                    $scope.EmailBYOD = false;
                    $scope.emailEmpty = true;
                    if (sessionStorage.getItem('byodemailverifylinksend')) sessionStorage.removeItem('byodemailverifylinksend');
                } else {
                    if (sessionStorage.getItem('byodemailverifylinksend')) {
                        $scope.byodErrorMessage = "Verification URL has been send to your Email Please Verify and Continue the Journey";
                        $scope.ModalTrigger("byodModal", true);
                        $scope.BYODPersonalStage = true;
                        return;
                    }
                    $scope.EmailBYOD = true;
                    $scope.emailEmpty = false;
                }
                $scope.nameFreeze = true;
                // $scope.getlocalProfileData();
            }

        });

    }
    $scope.firstTrems = function () {
        if ($("#chkselct6").is(':checked')) {
            $scope.chkselct6 = true;
        } else {
            $scope.chkselct6 = false;
        }
    }
    $scope.secondTrems = function () {
        if ($("#chkselct2").is(':checked')) {
            $scope.chkselct2 = true;
        } else {
            $scope.chkselct2 = false;
        }
    }
    $scope.thirdTrems = function () {
        if ($("#chkselct3").is(':checked')) {
            $scope.chkselct3 = true;
        } else {
            $scope.chkselct3 = false;
        }
    }
    $scope.ddpiFn = function () {
        /* if ($("#ddpi").is(':checked')) {
            $scope.ddpi = 'Y';
            $scope.ddpiError = false;
        } else {
            $scope.ddpi = 'N'; */
        $scope.ddpiModal();
        /* } */
    }
    $scope.ddpiModal = function () {
        var ddpiModalpopup = new bootstrap.Modal(document.getElementById('ddpiModal'), {
            backdrop: 'static',
            keyboard: false
        });
        ddpiModalpopup.show();
    }
    $scope.ddpiAccept = function () {
        setTimeout(function () {
            $('#ddpi').prop('checked', true);
        }, 50);
        $scope.ddpi = 'Y';
        $scope.ddpiError = false;
    }

    $scope.ddpiCancel = function () {
        setTimeout(function () {
            $('#ddpi').prop('checked', false);
            $('#chkEMargin').prop('checked', false);
        }, 50);
        $scope.ddpi = 'N';
        $scope.chkEMargin = false;
        $rootScope.formData.fields.InternetTrading = "N";

        $scope.termsOpen = false;
    }
    $scope.prefTerms = function () {
        if ($("#chkPref").is(':checked')) {
            $scope.chkPref = true;
        } else {
            $scope.chkPref = false;
        }
    };

    $scope.mitcTerms = function () {
        if ($("#chkMITC").is(':checked')) {
            $scope.chkMITC = true;
        } else {
            $scope.chkMITC = false;
        }
    };

    $scope.emarginTerms = function () {
        if ($("#chkEMargin").is(':checked')) {
            $scope.chkEMargin = true;
            $rootScope.formData.fields.InternetTrading = "Y";
            $scope.profileBTerms();
        } else {
            $scope.chkEMargin = false;
            $rootScope.formData.fields.InternetTrading = "N";
            $scope.profileBTerms1();
        }
    };
    $scope.profileBTerms = function () {
        var profileBtermsModal = new bootstrap.Modal(document.getElementById('profileBterms'), {
            backdrop: 'static',
            keyboard: false
        });
        profileBtermsModal.show();
        $scope.termsOpen = true;
    }
    $scope.profileBTerms1 = function () {
        var profileBtermsModal = new bootstrap.Modal(document.getElementById('profileBterms1'), {
            backdrop: 'static',
            keyboard: false
        });
        profileBtermsModal.show();
        $scope.termsOpen = true;
    }
    $scope.emarginAccept = function () {
        setTimeout(function () {
            $scope.chkEMargin = true;
            $("#chkEMargin").prop('checked', true);
            $('#InternetTrading').prop('checked', true);
            $('#ddpi').prop('checked', true);
        }, 50)
        setTimeout(function () {
            $scope.termsOpen = false;
        }, 150)
        $rootScope.formData.fields.InternetTrading = "Y";
        $scope.ddpi = 'Y';


    }
    $scope.emarginCancel = function () {
        setTimeout(function () {
            $("#chkEMargin").prop('checked', false);
            $('#InternetTrading').prop('checked', false);
        }, 50)
        $rootScope.formData.fields.InternetTrading = "N";
        $scope.termsOpen = false;
    }
    $(document).on('change', "select[name='pscrelation']", function () {
        if ($(this).val() == "Y" || $(this).val() == "R") {
            $('#financialInfo').collapse('show');
            var politicalExposedModal = new bootstrap.Modal(document.getElementById('politicalExposed'), {
                backdrop: 'static',
                keyboard: false
            });
            politicalExposedModal.show();
        }
    });
    // $scope.emstatus = function () {
    //     $scope.panEmailRegError = false;
    //     if ($rootScope.formData.fields.emailBelongs == 'S') {
    //         $scope.panEmailShow = false;
    //         $scope.panEmailError = false;
    //         $scope.panEmailSameError = false;
    //         $scope.emailBelongsError = true;
    //         $rootScope.formData.fields.emailPan = '';
    //     } else {
    //         $scope.panEmailShow = true;
    //         $scope.emailBelongsError = false;
    //     }
    // }
    $scope.getPersonalInfo = function () {
        $(document.body).removeClass('modal-open');
        $('.modal-backdrop').remove();
        var s_url = "DIYGetClientOtherInfoByReferenceNumber";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken
        }
        $rootScope.formData.apiLoading = true;
        sendData = $rootScope.encryptReq(sendData);
        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = $rootScope.decryptRes(a.data, 'Response');
            $rootScope.formData.apiLoading = false;
            // $scope.getLGandLC();
            if (response.EncryptToken) {
                $rootScope.EncryptToken = response.EncryptToken;
                sessionStorage.setItem('AxToken', response.EncryptToken);
            } else {
                if ($rootScope.formData.tokenValidation) {
                    $rootScope.clearBrowsingData();
                    var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    APIResponseModal.show();
                    $rootScope.apiResponseErrorMsg = "Session Timed Out";
                    return false;
                }
            }
            $rootScope.EncryptToken = response.EncryptToken;
            sessionStorage.setItem('AxToken', response.EncryptToken);
            //$rootScope.overallStatus();
            if (response.IsSuccess) {
                //$rootScope.formData.fields.citizen = response.ObjCDIYClientOtherInfo.Nationality;
                if (response.ObjCDIYClientOtherInfo.DifferentlyAbledStatus) {
                    $scope.DisabilityVal = response.ObjCDIYClientOtherInfo.DifferentlyAbledStatus;
                    $scope.DisabilityValue = false;
                }
                if (response.ObjCDIYClientOtherInfo.Mobile) {
                    $rootScope.formData.fields.mobile = response.ObjCDIYClientOtherInfo.Mobile;
                    sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
                    $scope.mobileOTPVerified = true;
                    $scope.onloadValidate = false;
                }
                if (response.ObjCDIYClientOtherInfo.Email) {
                    $rootScope.formData.fields.email = response.ObjCDIYClientOtherInfo.Email;
                    $scope.EmailBYOD = false;
                    $scope.emailEmpty = true;
                    if (sessionStorage.getItem('byodemailverifylinksend')) sessionStorage.removeItem('byodemailverifylinksend');
                } else {
                    if (sessionStorage.getItem('byodemailverifylinksend')) {
                        $scope.byodErrorMessage = "Verification URL has been send to your Email Please Verify and Continue the Journey";
                        $scope.ModalTrigger("byodModal", true);
                        $scope.BYODPersonalStage = true;
                        return;
                    }
                    $scope.EmailBYOD = true;
                    $scope.emailEmpty = false;
                }
                if (!$rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
                    $scope.rmemailOTPVerified = true;
                    $scope.rmonloadValidate = false;
                    $scope.mobileOTPVerified = true;
                }

                if ($rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
                    $scope.rmemailOTPVerified = false;
                    $scope.rmonloadValidate = true;
                    // $scope.mobileOTPVerified = false;
                }
                $rootScope.formData.fields.gender = response.ObjCDIYClientOtherInfo.Gender;
                if (response.ObjCDIYClientOtherInfo.Gender) {
                    $scope.Gendervalue = false
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.MaritialStatus) {
                    $scope.MaritalValue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.EducationValue) {
                    $scope.Educationvalue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.Occupation) {
                    $scope.occupationvalue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.FatherNameFirstName) {
                    $scope.Fathervalue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.MotherNameFirstName) {
                    $scope.MotherValue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.SourceofFund) {
                    $scope.SourceValue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.SourceofFund == "0") {
                    $scope.SourceValue = true;
                    $('#collapseInfo').collapse('show');
                }

                if (response.ObjCDIYClientOtherInfo.AnnualIncome) {
                    $scope.AnnualValue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.TradingExperience) {
                    $scope.TradeValue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.PoliticalExposure) {
                    $scope.politicalvalue = false;
                } else {
                    $('#collapseInfo').collapse('show');
                }
                if (response.ObjCDIYClientOtherInfo.Gender == "M") {
                    $('#gender').val('M');
                } else if (response.ObjCDIYClientOtherInfo.Gender == "F") {
                    $('#gender').val('F');
                } else if (response.ObjCDIYClientOtherInfo.Gender == "T") {
                    $('#gender').val('T');
                }
                if ($rootScope.formData.fields.title == 'MR') {
                    $('#gender').val('M');
                    $rootScope.formData.fields.gender = 'M'
                } else if ($rootScope.formData.fields.title == 'MISS' || $rootScope.formData.fields.title == 'MRS' || $rootScope.formData.fields.title == 'MS') {
                    $('#gender').val('F');
                    $rootScope.formData.fields.gender = 'F'
                }
                $rootScope.formData.fields.marital = response.ObjCDIYClientOtherInfo.MaritialStatus;
                if (response.ObjCDIYClientOtherInfo.MaritialStatus == "M") {
                    $('#marital').val('M');
                    if (response.ObjCDIYClientOtherInfo.Gender == "F") {
                        $scope.fsType = true;
                    }
                } else if (response.ObjCDIYClientOtherInfo.MaritialStatus == "S") {
                    $('#marital').val('S');
                }
                if (response.ObjCDIYClientOtherInfo.FatherOrSpouseType == "F") {
                    $("#father").prop('checked', true);
                    $("#spouse").prop('checked', false);
                } else if (response.ObjCDIYClientOtherInfo.FatherOrSpouseType == "S") {
                    $("#father").prop('checked', false);
                    $("#spouse").prop('checked', true);
                    $scope.fsType = true;
                }

                if (response.ObjCDIYClientOtherInfo.Gender == "F" && response.ObjCDIYClientOtherInfo.MaritialStatus == "M") {
                    $scope.maiden = true;
                    if (response.ObjCDIYClientOtherInfo.MaidenNameFirstName) {
                        $('#maidenTitle').val('MISS');
                    }
                    $rootScope.formData.fields.maFirstName = response.ObjCDIYClientOtherInfo.MaidenNameFirstName;
                    $rootScope.formData.fields.maMiddleName = response.ObjCDIYClientOtherInfo.MaidenNameMiddleName;
                    $rootScope.formData.fields.maLastName = response.ObjCDIYClientOtherInfo.MaidenNameLastName;
                }

                if (response.ObjCDIYClientOtherInfo.FatherNameFirstName) {
                    $('#fsTitle').val(response.ObjCDIYClientOtherInfo.FatherNamePrefixID);
                    $rootScope.formData.fields.fsFirstName = response.ObjCDIYClientOtherInfo.FatherNameFirstName;
                    if ($rootScope.BYOD) {
                        $rootScope.fsFirstNameFreeze = true;
                    }
                    if (response.ObjCDIYClientOtherInfo.FatherNameMiddleName) {
                        $rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + response.ObjCDIYClientOtherInfo.FatherNameMiddleName
                    }

                    if (response.ObjCDIYClientOtherInfo.FatherNameLastName) {
                        $rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + response.ObjCDIYClientOtherInfo.FatherNameLastName
                    }
                }
                setTimeout(function () {
                    $('#fsTitle').val(response.ObjCDIYClientOtherInfo.FatherNamePrefixID);
                    $('#moTitle').val(response.ObjCDIYClientOtherInfo.MotherNamePrefixID);
                    $(".select").select2();
                    $('#fsTitle').trigger('change');
                    $('#moTitle').trigger('change');
                }, 500)
                if (response.ObjCDIYClientOtherInfo.MotherNameFirstName) {
                    $('#moTitle').val(response.ObjCDIYClientOtherInfo.MotherNamePrefixID);
                    $rootScope.formData.fields.moFirstName = response.ObjCDIYClientOtherInfo.MotherNameFirstName;
                    $rootScope.formData.fields.moMiddleName = response.ObjCDIYClientOtherInfo.MotherNameMiddleName;
                    $rootScope.formData.fields.moLastName = response.ObjCDIYClientOtherInfo.MotherNameLastName.trim();
                }
                if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto) {
                    $rootScope.formData.fields.emailPan = response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto;
                }
                if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "S") {
                    $("#eself").prop('checked', true);
                    $("#espouse").prop('checked', false);
                    $("#eparent").prop('checked', false);
                    $("#echildren").prop('checked', false);
                } else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "U") {
                    $("#eself").prop('checked', false);
                    $("#espouse").prop('checked', true);
                    $("#eparent").prop('checked', false);
                    $("#echildren").prop('checked', false);
                    $scope.panEmailShow = true;
                } else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "P") {
                    $("#eself").prop('checked', false);
                    $("#espouse").prop('checked', false);
                    $("#eparent").prop('checked', true);
                    $("#echildren").prop('checked', false);
                    $scope.panEmailShow = true;
                } else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "C") {
                    $("#eself").prop('checked', false);
                    $("#espouse").prop('checked', false);
                    $("#eparent").prop('checked', false);
                    $("#echildren").prop('checked', true);
                    $scope.panEmailShow = true;
                }

                if (response.ObjCDIYClientOtherInfo.MobilebelongstoPan) {
                    $rootScope.formData.fields.mobilePan = response.ObjCDIYClientOtherInfo.MobilebelongstoPan;
                }
				
				if (response.ObjCDIYClientOtherInfo.Mobilebelongsto) {
					$rootScope.formData.fields.mobileBelongs = response.ObjCDIYClientOtherInfo.Mobilebelongsto;
				}


                if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "S") {
                    $("#mself").prop('checked', true);
                    $("#mspouse").prop('checked', false);
                    $("#mparent").prop('checked', false);
                    $("#mchildren").prop('checked', false);
                } else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "U") {
                    $("#mself").prop('checked', false);
                    $("#mspouse").prop('checked', true);
                    $("#mparent").prop('checked', false);
                    $("#mchildren").prop('checked', false);
                    $scope.panMobileShow = true;
                } else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "P") {
                    $("#mself").prop('checked', false);
                    $("#mspouse").prop('checked', false);
                    $("#mparent").prop('checked', true);
                    $("#mchildren").prop('checked', false);
                    $scope.panMobileShow = true;
                } else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "C") {
                    $("#mself").prop('checked', false);
                    $("#mspouse").prop('checked', false);
                    $("#mparent").prop('checked', false);
                    $("#mchildren").prop('checked', true);
                    $scope.panMobileShow = true;
                }
                $scope.mobileOTPVerified = true;
                $rootScope.formData.fields.occupation = response.ObjCDIYClientOtherInfo.Occupation;
                $rootScope.formData.fields.education = response.ObjCDIYClientOtherInfo.EducationValue;
                $rootScope.formData.fields.anIncome = response.ObjCDIYClientOtherInfo.AnnualIncome;
                $rootScope.formData.fields.sFunds = response.ObjCDIYClientOtherInfo.SourceofFund;
                $rootScope.formData.fields.netWorth = response.ObjCDIYClientOtherInfo.Networth;
                if (response.ObjCDIYClientOtherInfo.TradingExperience) {
                    $rootScope.formData.fields.tradeExp = response.ObjCDIYClientOtherInfo.TradingExperience;
                    if ($rootScope.formData.fields.tradeExp == '0') {
                        $scope.subBroker = false;
                    } else {
                        $scope.subBroker = true;
                    }
                }
                $('#trdExp').val($rootScope.formData.fields.tradeExp);
                if (response.ObjCDIYClientOtherInfo.DealingExistingStockBroker == "Y") {
                    $("#broker").val('Y');

                    $rootScope.formData.fields.brokerName = response.ObjCDIYClientOtherInfo.StockSubBrokerName;
                    $rootScope.formData.fields.cCode = response.ObjCDIYClientOtherInfo.ClientInfoId;
                    $rootScope.formData.fields.exchangeName = response.ObjCDIYClientOtherInfo.Exchange;
                    $scope.brokerDetails = true;

                } else {
                    $("#broker").val('N');
                }

                if (response.ObjCDIYClientOtherInfo.PastActions == "Y") {
                    $scope.disputeDetails = true;
                    $("#disputes").val('Y');
                    $rootScope.formData.fields.disputes = response.ObjCDIYClientOtherInfo.PastActions;
                } else {
                    $("#disputes").val('N');
                }

                if (response.ObjCDIYClientOtherInfo.GSTINFlag == "Y") {
                    $("#gstyes").prop('checked', true);
                    $("#gstno").prop('checked', false);
                    $scope.gstDetails = true;
                    $rootScope.formData.fields.gstNumber = response.ObjCDIYClientOtherInfo.GSTINNumber;
                } else {
                    $("#gstyes").prop('checked', false);
                    $("#gstno").prop('checked', true);
                }

                if (response.ObjCDIYClientOtherInfo.TaxJurisdiction == "N") {
                    $("#tpctry1").prop('checked', false);
                    $rootScope.formData.fields.taxOther = 'N';

                    $rootScope.formData.fields.taxCountry = response.ObjCDIYClientOtherInfo.TaxJurisdictionCountry;
                    $rootScope.formData.fields.tin = response.ObjCDIYClientOtherInfo.TaxIdentificationNumber;
                    $rootScope.formData.fields.birthPlace = response.ObjCDIYClientOtherInfo.PlaceOfBirth;
                    $rootScope.formData.fields.brithCountry = response.ObjCDIYClientOtherInfo.CountryOfBirth;

                    $rootScope.formData.fields.jCity = response.ObjCDIYClientOtherInfo.JurisdictionCity;
                    $rootScope.formData.fields.jDistrict = response.ObjCDIYClientOtherInfo.JurisdictionDistrict;
                    $rootScope.formData.fields.jState = response.ObjCDIYClientOtherInfo.JurisdictionState;
                    $rootScope.formData.fields.jPin = response.ObjCDIYClientOtherInfo.JurisdictionPinCode;
                    $rootScope.formData.fields.jCountry = response.ObjCDIYClientOtherInfo.JurisdictionCountry;
                    $rootScope.formData.fields.jAddress = response.ObjCDIYClientOtherInfo.JurisdictionAddress1 + response.ObjCDIYClientOtherInfo.JurisdictionAddress2 + response.ObjCDIYClientOtherInfo.JurisdictionAddress3;
                } else {
                    $("#tpctry1").prop('checked', true);
                    $rootScope.formData.fields.taxOther = 'Y';
                }

                $rootScope.formData.fields.InternetTrading = response.ObjCDIYClientOtherInfo.InternetTrading;
                $rootScope.formData.fields.dpCredit = response.ObjCDIYClientOtherInfo.DPRecieveForEachCredit;
                $rootScope.formData.fields.dpPledge = response.ObjCDIYClientOtherInfo.DPtoacceptPledgeIns;
                $rootScope.formData.fields.rdnDemat = response.ObjCDIYClientOtherInfo.DematStatement;
                $rootScope.formData.fields.rdnElectEmail = response.ObjCDIYClientOtherInfo.EmailStatement;
                $rootScope.formData.fields.shareEmail = response.ObjCDIYClientOtherInfo.ShareEmailWithRTA;
                $rootScope.formData.fields.rdnAnnualReport = response.ObjCDIYClientOtherInfo.AnualReport;
                $rootScope.formData.fields.rdnBankAcc = response.ObjCDIYClientOtherInfo.InterestInToBank;
                $rootScope.formData.fields.rdnContractNote = response.ObjCDIYClientOtherInfo.ContractNoteandOtherRelatedReports;
                $rootScope.formData.fields.rdnDIS = response.ObjCDIYClientOtherInfo.DISBooklet;
                $rootScope.formData.fields.agreeCall = response.ObjCDIYClientOtherInfo.AgreeToReceivecall;
                if (response.ObjCDIYClientOtherInfo.SettlementOfFunds) {
                    $rootScope.formData.fields.rdnSetFunds = response.ObjCDIYClientOtherInfo.SettlementOfFunds;
                }
                $rootScope.formData.fields.rdnSIP = response.ObjCDIYClientOtherInfo.EnableStockSIP;

                if ($rootScope.formData.fields.rdnContractNote == 'Y') {
                    $("#rdnContractNote").prop('checked', true);
                } else {
                    $("#rdnContractNote").prop('checked', false);
                }

                if ($rootScope.formData.fields.InternetTrading == 'Y') {
                    $("#InternetTrading").prop('checked', true);
                } else {
                    $("#InternetTrading").prop('checked', false);
                }

                if ($rootScope.formData.fields.rdnAnnualReport == 'E') {
                    $("#cb1171").prop('checked', false);
                    $("#cb1172").prop('checked', true);
                    $("#cb1173").prop('checked', false);
                } else if ($rootScope.formData.fields.rdnAnnualReport == 'P') {
                    $("#cb1171").prop('checked', true);
                    $("#cb1172").prop('checked', false);
                    $("#cb1173").prop('checked', false);
                } else {
                    $("#cb1171").prop('checked', false);
                    $("#cb1172").prop('checked', false);
                    $("#cb1173").prop('checked', true);
                }

                if ($rootScope.formData.fields.rdnBankAcc == 'Y') {
                    $("#cb118").prop('checked', true);
                } else {
                    $("#cb118").prop('checked', false);
                }

                if ($rootScope.formData.fields.rdnDIS == 'Y') {
                    $("#ecs1").prop('checked', true);
                    $("#ecs2").prop('checked', false);
                } else {
                    $("#ecs1").prop('checked', false);
                    $("#ecs2").prop('checked', true);
                }

                if ($rootScope.formData.fields.rdnDemat == 'D') {
                    $("#rbs31").prop('checked', true);
                    $("#rbs32").prop('checked', false);
                    $("#rbs33").prop('checked', false);
                    $("#rbs34").prop('checked', false);
                } else if ($rootScope.formData.fields.rdnDemat == 'W') {
                    $("#rbs31").prop('checked', false);
                    $("#rbs32").prop('checked', true);
                    $("#rbs33").prop('checked', false);
                    $("#rbs34").prop('checked', false);
                } else if ($rootScope.formData.fields.rdnDemat == 'F') {
                    $("#rbs31").prop('checked', false);
                    $("#rbs32").prop('checked', false);
                    $("#rbs33").prop('checked', true);
                    $("#rbs34").prop('checked', false);
                } else {
                    $("#rbs31").prop('checked', false);
                    $("#rbs32").prop('checked', false);
                    $("#rbs33").prop('checked', false);
                    $("#rbs34").prop('checked', true);
                }

                if ($rootScope.formData.fields.rdnSetFunds == 'M') {
                    $('#rdnSetFunds').val('M');
                } else if ($rootScope.formData.fields.rdnSetFunds == 'Y') {
                    $('#rdnSetFunds').val('Y');
                } else {

                    $('#rdnSetFunds').val('Q');

                }

                if ($rootScope.formData.fields.rdnSIP == 'Y') {
                    $('#rb35').prop('checked', true);
                    $('#rb36').prop('checked', false);
                } else {
                    $('#rb35').prop('checked', false);
                    $('#rb36').prop('checked', true);
                }

                $rootScope.formData.fields.political = response.ObjCDIYClientOtherInfo.PoliticalExposure;

                if (response.ObjCDIYClientOtherInfo.PoliticalExposure == "Y") {
                    $("#pscrelation").val('Y');
                } else if (response.ObjCDIYClientOtherInfo.PoliticalExposure == "R") {
                    $("#pscrelation").val('R');
                } else {
                    $("#pscrelation").val('N');
                }

                if (response.ObjCDIYClientOtherInfo.ExpilicitContent != '') {
                    $rootScope.formData.ExplicitContent = response.ObjCDIYClientOtherInfo.ExpilicitContent;
                    $rootScope.formData.ExplicitCode = response.ObjCDIYClientOtherInfo.ExpilicitCode;
                    $rootScope.ShowExplicitContent = true;
                }
                // setTimeout(function () {
                //     $scope.checkradioinit();
                // }, 100);

            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            } else {
                var aurl = "DIYGetClientPersonalInfoByReferenceNumber";
                var refNum = "";
                if ($rootScope.formData.eRefNumber) {
                    refNum = $rootScope.formData.eRefNumber
                } else {
                    refNum = sessionStorage.getItem('AxNo');
                }
                var sendData = {
                    ReferenceNumber: refNum,
                    IsDiy: true,
                    EncryptToken: $rootScope.EncryptToken
                }

                serverService.apiCall(aurl, sendData).then(function (a) {
                    var response = a.data;
                    if (response.IsSuccess) {
                        $rootScope.formData.fields.title = response.ObjCDIYClientProfile.ClientPrefixID;
                        console.log($rootScope.formData.fields.title)
                    }
                    else if (!response.IsSuccess && response.ErrorCode == '-1') {
                        $rootScope.formData.apiLoading = false;
                        $rootScope.formData.panStatus1 = response.ErrorMessage;
                        var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        paninformation.show();
                        return
                    }

                });
                // $scope.setsessionStorageData();

            }

        }, function (e) {
            $rootScope.formData.apiLoading = false;
            var connection = new bootstrap.Modal(document.getElementById('connection'));
            connection.show();
        });
    };
    $scope.getPersonalInfo();
    //product
    $scope.personalUpdate = function () {
        var error = 0;
        if (!$scope.DisabilityVal) {
            $scope.DisabilityError = true;
            error++;
        } else {
            $scope.DisabilityError = false;
        }
        var fields = $('#additionalInfo input[type=text]');
        var fieldselect = $('#additionalInfo select');
        var field = '';
        var fieldvalue = '';
        fields.each(function () {
            var value = $(this).val();
            if (value.length < 2) {
                if (this.id != "mNames11" && this.id != "lName11" && this.id != "mName12" && this.id != "lName12" && this.id != "input-1email" && this.id != "input-1mob" && this.id != "input-RMmob" && this.id != "input-rmemail" && this.id != "input-1newmob" && this.id != "fName1" && this.id != "mName1" && this.id != "lName1" && this.id != "mName2" && this.id != "lName2" && this.id != 'emailIDNew' && this.id != 'panMobile' && this.id != 'panEmail') {
                    field = this.id;
                    var a = this.id + 'Error';
                    $scope[a] = true;
                    error++;
                    if (error == 1) {
                        setTimeout(function () {
                            $('#' + field).focus();
                        }, 100)
                    }
                }
            } else {
                var a = this.id + 'Error';
                $scope[a] = false;
            }
        });

        fieldselect.each(function () {
            var value = $(this).val();
            if (value == null) {
                value = ""
            }
            if (value.length < 1) {
                if (this.id != 'maidenTitle') {
                    fieldvalue = this.id;
                    var a = this.id + 'Error';
                    $scope[a] = true;
                    error++;

                    if (error == 1) {
                        setTimeout(function () {
                            $('#' + fieldvalue).focus();
                        }, 100)
                    }
                }

                $("html, body").animate({
                    scrollTop: 300
                }, "slow");

            } else {
                if ($scope.maiden && $('#maidenTitle').val() && !($rootScope.formData.fields.maFirstName)) {
                    $scope.fName1Error = true;
                    error++;

                    if (error == 1) {
                        setTimeout(function () {
                            $('#fName1').focus();
                        }, 100)
                    }
                }
                var a = this.id + 'Error';
                $scope[a] = false;
            }
        });
        let n = $rootScope.formData.fields.fsFirstName.replace(/\s+/g, "");
        if (n.length < 3) {
            $scope.fNames11Error = true;
            setTimeout(function () {
                $('#fNames11').focus();
            }, 100)
        } else {
            $scope.fNames11Error = false;
        }

        if ($scope.fNames11Error) {
            error++;
        }
        $rootScope.formData.fields.resStatus = $('#rStatus').val();
        $rootScope.formData.fields.citizen = $('#citizen').val();
        sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
        sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
        if (($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') && $rootScope.formData.fields.gender == 'F') {
            $scope.genderError1 = true;
            error++;
        } else if (($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS') && $rootScope.formData.fields.gender == 'M') {
            $scope.genderError1 = true;
            error++;
        } else if (($rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS') && $rootScope.formData.fields.gender == 'M') {
            $scope.genderError1 = true;
            error++;
        } else if (($rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') && $rootScope.formData.fields.gender == 'M') {
            $scope.genderError1 = true;
            error++;
        }
        else {
            $scope.genderError1 = false;
        }
        if (error == 0) {
            $rootScope.formData.fields.annualIncome = $rootScope.formData.fields.anIncome;
            var url = "DIYClientOtherInfo";
            var sendData = {
                ObjCDIYClientOtherInfo: {
                    ReferenceNumber: "",
                    ReferenceNumberEnc: $rootScope.formData.eRefNumber,
                    Gender: $rootScope.formData.fields.gender,
                    MaritialStatus: $rootScope.formData.fields.marital,
                    Email: $scope.Encryption($rootScope.formData.fields.email),
                    Mobile: $scope.Encryption($rootScope.formData.fields.mobile),
                    FatherOrSpouseType: "F",
                    FatherHusName: $rootScope.formData.fields.fsFirstName,
                    FatherNamePrefixID: "MR",
                    FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
                    FatherNameMiddleName: '',
                    FatherNameLastName: '',
                    MothersMaidenName: $rootScope.formData.fields.moFirstName + $rootScope.formData.fields.moMiddleName + $rootScope.formData.fields.moLastName,
                    MotherNamePrefixID: $('#moTitle').val(),
                    MotherNameFirstName: $rootScope.formData.fields.moFirstName,
                    MotherNameMiddleName: $rootScope.formData.fields.moMiddleName,
                    MotherNameLastName: $rootScope.formData.fields.moLastName,
                    MaidenNamePrefixID: $scope.fsType ? $('#maidenTitle').val() : '',
                    MaidenNameFirstName: $rootScope.formData.fields.maFirstName,
                    MaidenNameMiddleName: $rootScope.formData.fields.maMiddleName,
                    MaidenNameLastName: $rootScope.formData.fields.maLastName,
                    EmailbelongstoPan: $rootScope.formData.fields.emailPan,
                    ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
                    MobilebelongstoPan: $rootScope.formData.fields.mobilePan,
                    Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
                    ProStage: "Profile2",
                    ResidentialStatus: $rootScope.formData.fields.resStatus,
                    Nationality: $rootScope.formData.fields.citizen,
                    Occupation: $rootScope.formData.fields.occupation,
                    EducationValue: $rootScope.formData.fields.education,
                    AnnualIncome: $rootScope.formData.fields.annualIncome,
                    Networth: $rootScope.formData.fields.netWorth,
                    TradingExperience: $rootScope.formData.fields.tradeExp,
                    PoliticalExposure: $rootScope.formData.fields.political,
                    DealingExistingStockBroker: $rootScope.formData.fields.broker,
                    StockSubBrokerName: $rootScope.formData.fields.brokerName,
                    ClientInfoId: $rootScope.formData.fields.cCode,
                    PastActions: $rootScope.formData.fields.disputes,
                    DisputesDetails: $rootScope.formData.fields.disputesDetails,
                    Exchange: $rootScope.formData.fields.exchangeName,
                    GSTINFlag: $rootScope.formData.fields.gst,
                    GSTINNumber: $rootScope.formData.fields.gstNumber,
                    RelatedPartyFlag: 'N',
                    TaxJurisdiction: $rootScope.formData.fields.taxOther,
                    TaxJurisdictionCountry: $rootScope.formData.fields.taxCountry,
                    PlaceOfBirth: $rootScope.formData.fields.birthPlace,
                    TaxIdentificationNumber: $rootScope.formData.fields.tin,
                    CountryOfBirth: $rootScope.formData.fields.brithCountry,
                    JurisdictionAddrFlag: '',
                    JurisdictionAddress1: '',
                    JurisdictionAddress2: '',
                    JurisdictionAddress3: '',
                    JurisdictionCity: $rootScope.formData.fields.jCity,
                    JurisdictionDistrict: $rootScope.formData.fields.jDistrict,
                    JurisdictionState: $rootScope.formData.fields.jState,
                    JurisdictionStateID: 0,
                    JurisdictionCountry: $rootScope.formData.fields.jCountry,
                    JurisdictionPinCode: $rootScope.formData.fields.jPin,
                    InternetTrading: $rootScope.formData.fields.InternetTrading,
                    DPRecieveForEachCredit: $rootScope.formData.fields.dpCredit,
                    DPtoacceptPledgeIns: $rootScope.formData.fields.dpPledge,
                    DematStatement: $rootScope.formData.fields.rdnDemat,
                    EmailStatement: $rootScope.formData.fields.rdnElectEmail,
                    ShareEmailWithRTA: $rootScope.formData.fields.shareEmail,
                    AnualReport: $rootScope.formData.fields.rdnAnnualReport,
                    InterestInToBank: $rootScope.formData.fields.rdnBankAcc,
                    ContractNoteandOtherRelatedReports: $rootScope.formData.fields.rdnContractNote,
                    DISBooklet: $rootScope.formData.fields.rdnDIS,
                    SourceofFund: $rootScope.formData.fields.sFunds,
                    AgreeToReceivecall: 'Y',
                    SettlementOfFunds: $rootScope.formData.fields.rdnSetFunds,
                    EnableStockSIP: $rootScope.formData.fields.rdnSIP,
                    RiskCategory: 'L',
                    ExpilicitContent: $rootScope.formData.ExplicitContent,
                    ExpilicitCode: $rootScope.formData.ExplicitCode,
                    ExpilicitFlag: $scope.ExplicitFlag,
                    BrowserType: $rootScope.formData.browserType,
                    EncryptToken: $rootScope.EncryptToken
                },
                IsDiy: true,
            };
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(url, sendData).then(function (a) {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.applicationDisabled = false
                var response = a.data;
                if (response.EncryptToken) {
                    $rootScope.EncryptToken = response.EncryptToken;
                    sessionStorage.setItem('AxToken', response.EncryptToken);
                } else {
                    if ($rootScope.formData.tokenValidation) {
                        $rootScope.clearBrowsingData();
                        var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        APIResponseModal.show();
                        $rootScope.apiResponseErrorMsg = "Session Timed Out";
                        return false;
                    }
                }

                if (response.IsSuccess) {
                    $rootScope.thirdCompleted = true;
                    if ($rootScope.verifyemail) {
                        if ($rootScope.newEmailVerify) {
                            var EmailType = $rootScope.formData.fields.emailNew
                        } else {
                            var EmailType = $rootScope.formData.fields.email
                        }
                        var url = "EmailVerificationUrl";
                        sendData = {
                            ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
                            Email: EmailType
                        };
                        $rootScope.formData.apiLoading = true;
                        serverService.apiCall(url, sendData).then(function (a) {
                            var response = a.data;
                            $rootScope.formData.apiLoading = false;
                        });
                    }
                    $rootScope.getAPI = false;
                    $scope.verifyKra();
                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                    $rootScope.formData.apiLoading = false;
                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    paninformation.show();
                    return
                } else {
                    if (abc == 0) {
                        $scope.personalUpdate();
                        abc++;
                    } else {

                        $rootScope.formData.apiLoading = false;
                        $scope.emailIdBelongsShow = response.IsEmail;
                        $scope.mobileBelongsShow = response.IsMobile;
                        if (response.IsEmail) {
                            $scope.panEmailRegError = true;
                            $scope.panEmailRegMsg = response.ErrorMessage;
                            $scope.EmailAlready = true;
                            $scope.EmailBYOD = true;
                            $scope.emailVerificationSend = false;
                            $scope.changeEmailShow = true;
                            $('#collapseInfo').collapse('show');
                            $scope.collapsePDetailsError = true;
                            setTimeout(function () {
                                $('#eself').focus();
                            }, 1000);
                        } else {
                            $scope.EmailBYOD = false;
                        }

                        if (response.IsMobile) {
                            $scope.panMobileRegError = true;
                            $scope.panMobileRegMsg = response.ErrorMessage;
                            $scope.EmailAlready = true;
                            $scope.MobileBYOD = true;
                            $scope.changeMobileNum = true;
                            $('#collapseInfo').collapse('show');
                            $scope.collapsePDetailsError = true;
                            setTimeout(function () {
                                $('#mself').focus();
                            }, 1000)
                        } else {
                            $scope.MobileBYOD = false;
                        }
                    }
                }

            }, function (e) {
                $rootScope.formData.apiLoading = false;
                // var connection = new bootstrap.Modal(document.getElementById('connection'));
                // connection.show();
            });
        }
    };

    $scope.Encryption = function (data) {
        var ENCRYPTEDVALUE = axisCrypto.enc(data);
        return ENCRYPTEDVALUE.toString();
    }

    $scope.getProductPaymentActionDetails = function () {

        $('.owl-carousel').trigger('destroy.owl.carousel');
        $('.owl-carousel').find('.owl-stage-outer').html();
        $('.owl-carousel').removeClass('owl-loaded');
        //var url = "GetALLPlanList?ReferenceNumber=" + $rootScope.formData.ReferenceNumber;
        var url = "GetALLPlanByBusinessType";
        var m = "W";
        var btype = "DIY";

        var sm = sessionStorage.getItem('mode');
        if (($rootScope.formData.RMModule || $rootScope.rmmodewb) && sessionStorage.getItem('RMTeam')) {
            $rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam');
            btype = $rootScope.formData.RMTeam;
            m = 'W';
        } else if (sessionStorage.getItem('RMTeam')) {
            $rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam');
            btype = $rootScope.formData.RMTeam;
            m = 'W';
        }
        if ($rootScope.BYOD) {
            btype = "BYOD";
            m = "B"
        } else {
            m = "W"
        }
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            BusinessType: btype,
            Mode: m,
            SiddhiApp: $rootScope.siddhiApp,
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            $scope.allPlanList = response;
            if (response) {
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].DefaultProduct) {
                            $scope.defaultPlanId = response[i].ProductId;
                            if ($scope.allPlanList[i].TotalPayableAmount == 0 || $scope.allPlanList[i].IswaivedOff || $scope.allPlanList[i].Isfreedomplan) {
                                $scope.iszeropayment = true;
                                if ($scope.allPlanList[i].IswaivedOff || $scope.allPlanList[i].Isfreedomplan) {
                                    $scope.hidePromo = true;
                                    $scope.IswaivedOff = true;
                                }
                            } else {
                                $scope.iszeropayment = false;
                            }
                        }
                        $rootScope.formData.referralCode = response[i].ReferralCode;

                        if (!$rootScope.webfinacle) {
                            var productId = response[0].ProductId;
                            var demat = response[0].CusDematType

                            setTimeout(function () {
                                if (productId && (!$scope.responseProductId)) {
                                    setTimeout(function () {
                                    }, 500)
                                }
                                if (demat == 'CDSL') {
                                    $('#cdsl').prop('checked', true);
                                    $('#nsdl').prop('checked', false);
                                } else {
                                    $('#cdsl').prop('checked', false);
                                    $('#nsdl').prop('checked', true);
                                }
                            }, 100)
                        }
                    }
                    if (!$scope.defaultPlanId) {
                        $scope.defaultPlanId = response[0].ProductId;
                        if ($scope.allPlanList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
                            $scope.iszeropayment = true;
                            if ($scope.allPlanList[0].IswaivedOff) {
                                $scope.hidePromo = true;
                                $scope.IswaivedOff = true;
                            }
                        } else {
                            $scope.iszeropayment = false;
                        }
                    }
                    if (response[0].PromoCodeEnc) {
                        $scope.encPromo = response[0].PromoCodeEnc;
                        $scope.hidePromo = false;
                        // $scope.iszeropayment = true;
                    }
                    if ($rootScope.webfinacle && (!$rootScope.formData.isPaymentCompleted && !$rootScope.formData.productApproved)) {
                        $scope.planList = $scope.allPlanList;
                        if (response[0].PromoCodeEnc) {
                            $scope.encPromo = response[0].PromoCodeEnc;

                            $scope.hidePromo = true;
                        }

                        $scope.owlOptionsTestimonials = {
                            loop: false,
                            autoPlay: 4000,
                            stopOnHover: true,
                            slideSpeed: 300,
                            paginationSpeed: 600,
                            items: 3,
                            nav: true,
                            dots: false,
                            autoWidth: true,
                            navText: ["<img src='assets/images/leftarrowNew.png'>", "<img src='assets/images/rightarrowNew.png'>"],
                            center: false,
                            responsive: {
                                0: {
                                    items: 3,
                                    nav: true,
                                    autoWidth: true,
                                },
                                600: {
                                    items: $scope.owlitem6,
                                    nav: true,
                                    autoWidth: true,
                                },
                                1000: {
                                    items: $scope.owlitem,
                                    nav: true,
                                    autoWidth: true,
                                }
                            }
                        }

                        if (!$scope.responseProductId || ($scope.responseProductId == $scope.defaultPlanId)) {
                            $scope.productSelect($scope.defaultPlanId);
                            if ($scope.encPromo && $scope.defaultPlanId) {
                                $scope.appliedPromo = true;
                                $scope.applyPromo();
                            }
                            setTimeout(function () {
                                if (document.getElementById($scope.defaultPlanId)) {
                                    document.getElementById($scope.defaultPlanId).checked = true;
                                }
                            }, 100)
                        }
                        $scope.getProductInfo();
                    } else {
                        if ($rootScope.formData.RMModule) {
                            $scope.planList = $scope.allPlanList;
                            $scope.owlSet();
                            $scope.getProductInfo();
                        } else {
                            if (!$rootScope.fifthCompleted) {
                                $scope.planList = $scope.allPlanList;
                                // $scope.getDPDetails();
                                $scope.owlSet();
                                // $scope.getProductInfo();
                            } else {
                                $scope.planList = $scope.allPlanList;
                                $scope.owlSet();
                                $scope.getProductInfo();
                            }
                        }
                    }
                }
            }

        });
    }
    $scope.getProductPaymentActionDetails();
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        if (crd.latitude && crd.longitude) {
            var latitude = crd.latitude;
            var longitude = crd.longitude;
            if (latitude && longitude) {
                $rootScope.formData.latitude = latitude;
                $rootScope.formData.longitude = longitude;
                $scope.takeSelfieDisabled = false;
                $scope.takeSelfieUnavailableStatus = false;
                $scope.$apply();
            }
        } else { }

    }


    function error(err) {
        $rootScope.formData.latitude = '';
        $rootScope.formData.longitude = '';
        $scope.takeSelfieDisabled = true;
        $scope.takeSelfieUnavailableStatus = true;
        $scope.$apply();
    }

    //navigator.geolocation.getCurrentPosition(success, error, options);
    $rootScope.handlePermission = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
        setTimeout(function () {
            if ($rootScope.formData.latitude && $rootScope.formData.longitude) {
                $scope.takeSelfieDisabled = false;
                $scope.takeSelfieUnavailableStatus = false;
                $scope.$apply();
            } else {
                $scope.takeSelfieDisabled = true;
                $scope.takeSelfieUnavailableStatus = true;
                $scope.$apply();
            }
        }, 100)
        if (!$rootScope.formData.isMobile) {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
                .then(function (stream) {
                    if (!$rootScope.formData.isMobile) {
                        video.srcObject = stream;
                        video.play();
                    }
                    $scope.cameraDisabled = false;
                    $scope.$apply();
                })
                .catch(function (err) {
                    $scope.cameraDisabled = true;
                    $scope.$apply();
                });
        }
    }
    $rootScope.handlePermission();
    $scope.geolocation = function () {
        var s_url = "Validategeolocation";
        //var s_url = "DIYImageUploadS3";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            latitude: $rootScope.formData.latitude,
            longitude: $rootScope.formData.longitude

        };
        serverService.apiCall(s_url, sendData).then(function (a) {
            // $scope.docUpldAPI = false;
            var response = a.data;
            $scope.geolocationErrorMsg = response.ErrorMessage;
        });
    }
    /*  setTimeout(function () {
         $scope.geolocation();
     },3000) */

    $scope.imgFormData = function (imgName, filesSelected, type) {
        var url = "UploadFormData";
        var sendData = new FormData();
        sendData.append('ImageName', imgName);
        sendData.append('ReferenceNumber', $rootScope.formData.ReferenceNumber);
        sendData.append('Image', filesSelected[0]);
        sendData.append('DocumentType', type);
        sendData.append('Extension', '');
        sendData.append('IsDiy', '');
        sendData.append('IsSelfi', '');
        sendData.append('IsIPV', '');
        sendData.append('EncryptToken', '');
        sendData.append('Latitude', '');
        sendData.append('Longitude', '');
        $scope.docUpldAPI = true;
        serverService.apiFormCall1(url, sendData).then(function (a) {
            var response = a.data;
            $scope.docUpldAPI = false;
            if (response.IsSuccess) {
                $scope.panImageUpdt = true;
                $scope.panLoad = false;
                $scope.panImgError = false;
                $scope.pantypeError = false;
                $scope.panImageValidation = true;
            }
            else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }
            $scope.readfiles(filesSelected, imgName);
            $scope.getImages();

        })
    }
    $scope.imgUpload = function (imgName) {
        imageName = imgName;

        var filesSelected = document.getElementById(imgName).files;

        var fileSize = (filesSelected[0].size);

        var fileName = document.getElementById(imgName).value;

        var preview = document.getElementById("preview");
        if (imgName == 'takeselfie') {
            imgName = 'ClientPhoto';
            imageName = 'ClientPhoto';
            $scope.selfTrue = true;
        } else {
            $scope.selfTrue = false;
            $scope.takeSelfieDisabled = false;
        }
        if (imgName == 'Income' || imgName == 'CMLDOCUMENT') {
            var allowed_extensions = new Array("jpg", "png", "jpeg", "pdf");
        } else {
            var allowed_extensions = new Array("jpg", "png", "jpeg");
        }

        var file_extension = fileName.split('.').pop();
        file_extension = file_extension.toLowerCase();
        var file_index = allowed_extensions.indexOf(file_extension);

        $('#badImage').modal('hide');
        if (file_index <= 2 && file_index >= 0) {
            $scope.FileType = "Image";
            if (imgName == "PANNumber" || imgName == "RePANNumber") {
                if ($rootScope.formData.Pansuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingPanvalidation != 0) {
                    var PancountModal = new bootstrap.Modal(document.getElementById('Pancount'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    PancountModal.show();
                    PancountvalidationModal.hide();
                    return false;
                }
                if ($rootScope.formData.RemainingPanvalidation == 0) {
                    PancountvalidationModal.show();
                    return false;
                }

                imgName = "PANNumber";
                imageName = "PANNumber";
                $scope.panSizeError = false;
                $scope.panQImgError = false;
                $scope.panCNImgError = false;
                if (fileSize > 4194304) {
                    $scope.panSizeError = true;
                    $('#PANNumber').val('');
                } else {
                    $scope.docUpldMsg = 'PAN Upload in progress';
                    $scope.aadhaarvalidation = false;
                    $scope.readfiles(filesSelected, imgName);
                }

                $scope.$apply();
            } else if (imgName == "ClientPhoto") {
                $scope.photoSizeError = false;
                if (!$rootScope.formData.latitude || !$rootScope.formData.longitude || $rootScope.formData.latitude == 'null' || $rootScope.formData.longitude == 'null') {
                    $scope.takeSelfieDisabled = true;
                } else if (!$scope.selfTrue && fileSize > 4194304) {
                    $scope.photoSizeError = true;
                    $('#ClientPhoto').val('');
                } else {
                    $scope.docUpldMsg = 'Selfie Upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "Aadhar") {
                $scope.aadharSizeError = false;
                if (fileSize > 4194304) {
                    $scope.aadharSizeError = true;
                    $('#Aadhar').val('');
                } else {
                    $scope.docUpldMsg = 'Aadhaar Upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "BankCheque" || imgName == "ReBankCheque") {
                imgName = "BankCheque";
                imageName = "BankCheque";
                $scope.bankSizeError = false;
                $scope.bankCNImgError = false;
                $scope.bankQImgError = false;
                if (fileSize > 4194304) {
                    $scope.bankSizeError = true;
                    $('#BankCheque').val('');
                } else {
                    $scope.docUpldMsg = 'Cheque image upload in progress';
                    //$scope.readfiles(filesSelected, imageName);
                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "SPECIMENPROOF") {
                $scope.signatureSizeError = false;
                if (fileSize > 4194304) {
                    $scope.signatureSizeError = true;
                    $('#SPECIMENPROOF').val('');
                } else {
                    $scope.docUpldMsg = 'Signature upload in progress';
                    //$scope.readfiles(filesSelected, imageName);
                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == 'CorrespondenceAddress' || imgName == 'ReCorrespondenceAddress') {
                if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
                    var aadhaarcountModal = new bootstrap.Modal(document.getElementById('aadhaarcount'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    aadhaarcountModal.show();
                    aadhaarcountvalidationModal.hide();
                    return false;
                }
                if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                    aadhaarcountvalidationModal.show();
                    return false;
                }

                imgName = 'CorrespondenceAddress';
                imageName = 'CorrespondenceAddress';
                $scope.cSizeError = false;
                $scope.cAddressQImgError = false;
                $scope.cAddressCNImgError = false;
                if (fileSize > 4194304) {
                    $scope.cSizeError = true;
                    $('#CorrespondenceAddress').val('');
                    $scope.$apply();
                } else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
                    $scope.docUpldMsg = 'Address proof upload in progress';
                    $scope.aadhaarvalidation = false;
                    if ($rootScope.formData.fields.DocsaddressProof != 111) {
                        $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.DocsaddressProof);
                    } else {
                        $scope.readfiles(filesSelected, imageName);
                    }

                    if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                        aadhaarcountvalidationModal.show();
                    }

                } else {
                    $('#CorrespondenceAddress').val('');
                    $("#cAddressImage .file-input").empty();
                    $scope.ctypeError = true;
                    $scope.$apply();
                }
            } else if (imgName == 'CorrespondenceAddress2' || imgName == 'ReCorrespondenceAddress2') {
                if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
                    var aadhaarcountModal = new bootstrap.Modal(document.getElementById('aadhaarcount'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    aadhaarcountModal.show();
                    aadhaarcountvalidationModal.hide();
                    return false;
                }

                imgName = 'CorrespondenceAddress2';
                imageName = 'CorrespondenceAddress2';
                $scope.cSizeError = false;
                $scope.cAddressQImgError = false;
                $scope.cAddressCNImgError = false;
                if (fileSize > 4194304) {
                    $scope.cSizeError = true;
                    $('#CorrespondenceAddress2').val('');
                    $scope.$apply();

                } else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
                    $scope.docUpldMsg = 'Address proof upload in progress';
                    $scope.aadhaarvalidation = false;

                    if ($rootScope.formData.fields.DocsaddressProof != 111) {
                        $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.DocsaddressProof);
                    } else {
                        $scope.readfiles(filesSelected, imageName);
                    }

                    if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                        aadhaarcountvalidationModal.show();
                    }

                } else {
                    $('#CorrespondenceAddress2').val('');
                    $("#cAddressImage2 .file-input").empty();
                    $scope.ctypeError = true;
                    $scope.$apply();
                }
            } else if (imgName == 'PermenantAddress' || imgName == 'RePermenantAddress') {
                if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
                    var aadhaarcount1Modal = new bootstrap.Modal(document.getElementById('aadhaarcount1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    aadhaarcount1Modal.show();
                    aadhaarcount1validationModal.hide();
                    return false;
                }

                if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                    aadhaarcount1validationModal.show();
                    return false;
                }

                imgName = 'PermenantAddress';
                imageName = 'PermenantAddress';
                $scope.pSizeError = false;
                $scope.pAddressQImgError = false;
                $scope.pAddressCNImgError = false;
                if (fileSize > 4194304) {
                    $scope.pSizeError = true;
                    $('#PermenantAddress').val('');
                    $scope.$apply();
                } else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
                    $scope.docUpldMsg = 'Address proof upload in progress';
                    $scope.aadhaarvalidation = false;

                    if ($rootScope.formData.fields.DocsaddressProof != 111) {
                        $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.pDocsaddressProof);
                    } else {
                        $scope.readfiles(filesSelected, imageName);
                    }

                    if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                        aadhaarcount1validationModal.show();
                    }

                } else {
                    $('#PermenantAddress').val('');
                    $("#pAddressImage .file-input").empty();
                    $scope.ptypeError = true;
                    $scope.$apply();
                }

            } else if (imgName == 'PermenantAddress2' || imgName == 'RePermenantAddress2') {
                if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
                    var aadhaarcount1Modal = new bootstrap.Modal(document.getElementById('aadhaarcount1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    aadhaarcount1Modal.show();
                    aadhaarcount1validationModal.hide();
                    return false;
                }

                if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                    aadhaarcount1validationModal.show();
                    return false;
                }

                imgName = 'PermenantAddress2';
                imageName = 'PermenantAddress2';
                $scope.pSizeError = false;
                $scope.pAddressQImgError = false;
                $scope.pAddressCNImgError = false;
                if (fileSize > 4194304) {
                    $scope.pSizeError = true;
                    $('#PermenantAddress2').val('');
                    $scope.$apply();
                } else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
                    $scope.docUpldMsg = 'Address proof upload in progress';
                    $scope.aadhaarvalidation = false;

                    if ($rootScope.formData.fields.DocsaddressProof != 111) {
                        $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.pDocsaddressProof);
                    } else {
                        $scope.readfiles(filesSelected, imageName);
                    }

                    if ($rootScope.formData.RemainingDocumentvalidation == 0) {
                        aadhaarcount1validationModal.show();
                    }

                } else {
                    $('#PermenantAddress2').val('');
                    $("#pAddressImage2 .file-input").empty();
                    $scope.ptypeError = true;
                    $scope.$apply();
                }
            } else if (imgName == 'Income') {
                $scope.iSizeError = false;
                if (fileSize > 4194304) {
                    $scope.iSizeError = true;
                    $('#Income').val('');
                    $scope.$apply();
                } else if ($rootScope.formData.fields.foDocumentProof != '0' && $rootScope.formData.fields.foDocumentProof) {
                    $scope.docUpldMsg = 'Income proof upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.foDocumentProof);
                } else {
                    $('#Income').val('');
                    $("#incomeImage .file-input").empty();
                    $scope.itypeError = true;
                    $scope.$apply();
                }
            } else if (imgName == "RMSIGNATURE") {
                $scope.tcSizeError = false;
                if (fileSize > 4194304) {
                    $scope.tcSizeError = true;
                } else {
                    $scope.docUpldMsg = 'Signature upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "ADDITIONALDOC1") {
                $scope.adocSizeError = false;
                if (fileSize > 4194304) {
                    $scope.adocSizeError = true;
                    $('#ADDITIONALDOC1').val('');
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "ADDITIONALDOC2") {
                $scope.adocSizeError = false;
                if (fileSize > 4194304) {
                    $scope.adocSizeError = true;
                    $('#ADDITIONALDOC2').val('');
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "ADDITIONALDOC3") {
                $scope.adocSizeError = false;
                if (fileSize > 4194304) {
                    $scope.adocSizeError = true;
                    $('#ADDITIONALDOC3').val('');
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "CMLDOCUMENT") {
                $scope.cmlSizeError = false;
                if (fileSize > 4194304) {
                    $('#CMLDOCUMENT').val('');
                    $scope.cmlSizeError = true;
                } else {
                    $scope.docUpldMsg = 'CML upload in progress';
                    //$scope.readfiles(filesSelected, imageName);

                    $scope.imgFormData(imgName, filesSelected, '');
                }
                $scope.$apply();
            } else if (imgName == "NOMINEE1") {
                $scope.nominee1SizeError = false;
                if (fileSize > 4194304) {
                    $('#NOMINEE1').val('');
                    $scope.nominee1SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "NOMINEE2") {
                $scope.nominee2SizeError = false;
                if (fileSize > 4194304) {
                    $('#NOMINEE2').val('');
                    $scope.nominee2SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "NOMINEE3") {
                $scope.nominee3SizeError = false;
                if (fileSize > 4194304) {
                    $('#NOMINEE3').val('');
                    $scope.nominee3SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "GUARDIAN1") {
                $scope.guardian1SizeError = false;
                if (fileSize > 4194304) {
                    $('#GUARDIAN1').val('');
                    $scope.guardian1SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "GUARDIAN2") {
                $scope.guardian2SizeError = false;
                if (fileSize > 4194304) {
                    $('#GUARDIAN2').val('');
                    $scope.guardian2SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            } else if (imgName == "GUARDIAN3") {
                $scope.guardian3SizeError = false;
                if (fileSize > 4194304) {
                    $('#GUARDIAN3').val('');
                    $scope.guardian3SizeError = true;
                } else {
                    $scope.docUpldMsg = 'Document upload in progress';
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            }

        } else {
            if (file_index == 3) {
                if (imgName == "Income") {
                    $scope.iSizeError = false;
                    if (fileSize > 4194304) {
                        $scope.iSizeError = true;
                        $scope.$apply();
                    } else if ($rootScope.formData.fields.foDocumentProof != 0 && $rootScope.formData.fields.foDocumentProof) {
                        if (filesSelected.length > 0) {
                            $scope.docUpldMsg = 'Income proof upload in progress';
                            $scope.pdfReadFn(filesSelected, imageName);
                        }
                    } else {
                        $('#Income').val('');
                        $("#incomeImage .file-input").empty();
                        $scope.itypeError = true;
                        $scope.$apply();
                    }
                } else if (imgName == "CMLDOCUMENT") {
                    $scope.iSizeError = false;
                    if (fileSize > 4194304) {
                        $scope.cmlSizeError = true;
                        $('#CMLDOCUMENT').val('');
                        $("#cmlImage .file-input").empty();
                        $scope.$apply();
                    } else {
                        $scope.docUpldMsg = 'Document upload in progress';
                        $scope.pdfReadFn(filesSelected, imageName);
                    }
                }

            } else {
                if (imgName == "PANNumber") {
                    $('#PANNumber').val('');
                    $scope.pantypeError = true;
                    $scope.$apply();
                }
                if (imgName == "ClientPhoto") {
                    $('#ClientPhoto').val('');
                    $scope.phototypeError = true;
                    $scope.$apply();
                }

                if (imgName == "Aadhar") {
                    $('#Aadhar').val('');
                    $scope.aadhartypeError = true;
                    $scope.$apply();
                }

                if (imgName == "CorrespondenceAddress") {
                    $('#CorrespondenceAddress').val('');
                    $scope.catypeError = true;
                    $scope.$apply();
                }

                if (imgName == "CorrespondenceAddress2") {
                    $('#CorrespondenceAddress2').val('');
                    $scope.ca2typeError = true;
                    $scope.$apply();
                }

                if (imgName == "PermenantAddress") {
                    $('#PermenantAddress').val('');
                    $scope.patypeError = true;
                    $scope.$apply();
                }

                if (imgName == "PermenantAddress2") {
                    $('#PermenantAddress2').val('');
                    $scope.pa2ypeError = true;
                    $scope.$apply();
                }

                if (imgName == "BankCheque") {
                    $('#BankCheque').val('');
                    $scope.banktypeError = true;
                    $scope.$apply();
                }
                if (imgName == "SPECIMENPROOF") {
                    $('#SPECIMENPROOF').val('');
                    $scope.signaturetypeError = true;
                    $scope.$apply();
                }

                if (imgName == "Income") {
                    $('#Income').val('');
                    $scope.incometypeError = true;
                    $scope.$apply();
                }

                if (imgName == "RMSIGNATURE") {
                    $('#RMSIGNATURE').val('');
                    $scope.tctypeError = true;
                    $scope.$apply();
                }

                if (imgName == "CMLDOCUMENT") {
                    $('#CMLDOCUMENT').val('');
                    $scope.cmltypeError = true;
                    $scope.$apply();
                }

                if (imgName == "ADDITIONALDOC1") {
                    $('#ADDITIONALDOC1').val('');
                    $scope.adoctypeError = true;
                    $scope.$apply();
                }

                if (imgName == "ADDITIONALDOC2") {
                    $('#ADDITIONALDOC2').val('');
                    $scope.adoc2typeError = true;
                    $scope.$apply();
                }

                if (imgName == "ADDITIONALDOC3") {
                    $('#ADDITIONALDOC3').val('');
                    $scope.adoc3typeError = true;
                    $scope.$apply();
                }
                if (imgName == "FIRSTPOA") {
                    $('#FIRSTPOA').val('');
                    $scope.poatypeError = true;
                    $scope.$apply();
                }
                if (imgName == "SECONDPOA") {
                    $('#SECONDPOA').val('');
                    $scope.poa2typeError = true;
                    $scope.$apply();
                }
                if (imgName == "NOMINEE1") {
                    $('#NOMINEE1').val('');
                    $scope.nominee1typeError = true;
                    $scope.$apply();
                }
                if (imgName == "NOMINEE2") {
                    $('#NOMINEE2').val('');
                    $scope.nominee2typeError = true;
                    $scope.$apply();
                }
                if (imgName == "NOMINEE3") {
                    $('#NOMINEE3').val('');
                    $scope.nominee3typeError = true;
                    $scope.$apply();
                }
                if (imgName == "GUARDIAN1") {
                    $('#GUARDIAN1').val('');
                    $scope.guardian1typeError = true;
                    $scope.$apply();
                }
                if (imgName == "GUARDIAN2") {
                    $('#GUARDIAN2').val('');
                    $scope.guardian2typeError = true;
                    $scope.gu3ViewHide = false;
                    $scope.$apply();
                }
                if (imgName == "GUARDIAN3") {
                    $('#GUARDIAN3').val('');
                    $scope.guardian3typeError = true;
                    $scope.$apply();
                }
                if (imgName == "ADDRESSMODIFICATION") {
                    $('#ADDRESSMODIFICATION').val('');
                    $scope.amtypeError = true;
                    $scope.$apply();
                }
            }
        }

    }

    $scope.readfiles = function (files, a) {
        var b = a;
        var existinginputs = document.getElementsByName('images[]');
        var existingcanvases = document.getElementsByTagName('canvas');
        while (existinginputs.length > 0) {
            form.removeChild(existinginputs[0]);
            preview.removeChild(existingcanvases[0]);
        }

        for (var i = 0; i < files.length; i++) {
            $scope.processfile(files[i], b);
        }

        files.value = "";
    }

    $scope.processfile = function (file, imgName) {
        // read the files

        var reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {

            // blob stuff
            var blob = new Blob([event.target.result]); // create blob...
            window.URL = window.URL || window.webkitURL;
            var blobURL = window.URL.createObjectURL(blob); // and get it's URL

            // helper Image object
            var image = new Image();
            image.src = blobURL;
            // preview.appendChild(image); // preview commented out, I am using the canvas instead
            image.onload = function () {
                // have to wait till it's loaded
                var resized = $scope.resizeMe(image, imgName); // send it to canvas
                // put result from canvas into new hidden input
                var r_split = resized.split(",");

                $("#" + imgName + "Src").val(r_split[1]);
                //  $("#" + imgName + "").css({ "background": "url(" + resized + ") no-repeat center center", "background-size": "cover" });
                var showPicture = document.querySelector("#" + imgName + "img");
                //      showPicture.src = resized;
                $scope.update_img(imgName, r_split[1], resized);
            }
        };
    }
    $scope.resizeMe = function (img, imgName) {
        var canvas = document.createElement('canvas');

        var width = img.width;
        var height = img.height;
        if (imgName != 'BankCheque') {
            if (width > height) {
                if (width > 960) {
                    height = Math.round(height *= 960 / width);
                    width = 1280;
                }
            } else {
                if (height > 1280) {
                    width = Math.round(width *= 1280 / height);
                    height = 960;
                }
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", 1);
    }
    $scope.update_img = function (imgName, imgValue, resized) {
        if (imgName == "CorrespondenceAddress") {
            $scope.catypeError = false;
            $scope.addressName = imgName;
            $rootScope.formData.caImage = imgValue;
            $scope.cafileType = $scope.FileType;
            if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
                $scope.ctypeError = false;
                $("#addressProof").removeClass("error");
                $scope.cAdrLoad = true;
                $("#cAddressImage .file-input").empty();
                $scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.DocsaddressProof);
            } else {
                $('#CorrespondenceAddress').val('');
                $("#cAddressImage .file-input").empty();
                $scope.ctypeError = true;
                $scope.cAdrLoad = false;
            }
        } else if (imgName == "CorrespondenceAddress2") {
            $scope.ca2typeError = false;
            $scope.addressName1 = imgName;
            $scope.cafileType2 = $scope.FileType;
            $rootScope.formData.caImage2 = imgValue;
            if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
                $scope.cAdrLoad2 = true;
                $scope.ctypeError = false;
                $scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.DocsaddressProof);
                $("#cAddressImage2 .file-input").empty();
                $("#addressProof").removeClass("error");
            } else {
                $('#CorrespondenceAddress2').val('');
                $("#cAddressImage2 .file-input").empty();
                $scope.cAdrLoad2 = false;
                $scope.ctypeError = true;
            }
        } else if (imgName == "PermenantAddress") {
            $scope.patypeError = false;
            $scope.permaddressName = imgName;
            $rootScope.formData.paImage = imgValue;
            $scope.pafileType = $scope.FileType;
            if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
                $scope.ptypeError = false;
                $scope.pAdrLoad = true;
                $("#pAddressImage .file-input").empty();
                $scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.pDocsaddressProof);
            } else {
                $('#PermenantAddress').val('');
                $("#pAddressImage .file-input").empty();
                $scope.pAdrLoad = false;
                $scope.ptypeError = true;
            }
        } else if (imgName == "PermenantAddress2") {
            $scope.pa2typeError = false;
            $scope.permaddressName1 = imgName;
            $rootScope.formData.paImage2 = imgValue;
            $scope.pafileType2 = $scope.FileType;
            if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
                $scope.ptypeError = false;
                $scope.pAdrLoad2 = false;
                $("#pAddressImage2 .file-input").empty();
                $scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.pDocsaddressProof);
            } else {
                $('#PermenantAddress2').val('');
                $("#pAddressImage2 .file-input").empty();
                $scope.pAdrLoad2 = false;
                $scope.ptypeError = true;
            }
        } else if (imgName == "Income") {
            $scope.incometypeError = false;
            $rootScope.formData.foImage = imgValue;
            $scope.foName = imgName;
            $scope.fofileType = $scope.FileType;
            $scope.foViewHide = false;
            if ($rootScope.formData.fields.foDocumentProof != 0 && $rootScope.formData.fields.foDocumentProof) {
                $scope.itypeError = false;
                $scope.incomeLoad = true;
                $("#incomeImage .file-input").empty();
                $scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.foDocumentProof);
            } else {
                $('#Income').val('');
                $("#incomeImage .file-input").empty();
                $scope.incomeLoad = false;
                $scope.itypeError = true;
            }
        } else {
            //$scope.chequeResized1 = resized;
            //$scope.chequeImage1 = imgValue;
            if (imgName == "PANNumber") {
                $('#PANNumber').val('');
                $('#panPhoto .file-input').empty();
                $scope.panLoad = true;
                $scope.pantypeError = false;
            }
            if (imgName == "ClientPhoto") {
                $('#ClientPhoto').val('');
                $('#clientImage .file-input').empty();
                $scope.cltLoad = true;
                $scope.phototypeError = false;
            }

            if (imgName == "Aadhar") {
                $('#Aadhar').val('');
                $('#aadharImage .file-input').empty();
                $scope.aadharLoad = true;
                $scope.aadhartypeError = false;
            }
            if (imgName == "BankCheque") {
                $('#BankCheque').val('');
                $('#bankImage .file-input').empty();
                $scope.bankLoad = true;
                $scope.banktypeError = false;
            }
            if (imgName == "SPECIMENPROOF") {
                $('#SPECIMENPROOF').val('');
                $('#clientSignature .file-input').empty();
                $scope.signatureLoad = true;
                $scope.signaturetypeError = false;
            }
            if (imgName == "RMSIGNATURE") {
                $('#RMSIGNATURE').val('');
                $('#RMSIGNATUREIMAGE .file-input').empty();
                $scope.tcLoad = true;
                $scope.tctypeError = false;
            }
            if (imgName == "CMLDOCUMENT") {
                $('#CMLDOCUMENT').val('');
                $('#cmlImage .file-input').empty();
                $scope.cmlLoad = true;
                $scope.cmltypeError = false;
                $scope.cmlViewHide = false;
            }
            if (imgName == "ADDITIONALDOC1") {
                $('#ADDITIONALDOC1').val('');
                $('#ADDITIONALDOC1IMAGE .file-input').empty();
                $scope.adocLoad = true;
                $scope.adoctypeError = false;
                $scope.ad1ViewHide = false;
            }
            if (imgName == "ADDITIONALDOC2") {
                $('#ADDITIONALDOC2').val('');
                $('#ADDITIONALDOC2IMAGE .file-input').empty();
                $scope.adocLoad = true;
                $scope.adoc2typeError = false;
                $scope.ad2ViewHide = false;
            }
            if (imgName == "ADDITIONALDOC3") {
                $('#ADDITIONALDOC3').val('');
                $('#ADDITIONALDOC3IMAGE .file-input').empty();
                $scope.adocLoad = true;
                $scope.adoc3typeError = false;
                $scope.ad3ViewHide = false;
            }
            if (imgName == "FIRSTPOA") {
                $('#FIRSTPOA').val('');
                $('#FIRSTPOAIMAGE .file-input').empty();
                $scope.poaLoad = true;
                $scope.poatypeError = false;
            }
            if (imgName == "SECONDPOA") {
                $('#SECONDPOA').val('');
                $('#SECONDPOAIMAGE .file-input').empty();
                $scope.poaLoad = true;
                $scope.poa2typeError = false;
            }
            if (imgName == "NOMINEE1") {
                $('#NOMINEE1').val('');
                $('#NOMINEE1PROOFIMAGE .file-input').empty();
                $scope.nominee1Load = true;
                $scope.nominee1typeError = false;
                $scope.nmViewHide = false;
            }
            if (imgName == "NOMINEE2") {
                $('#NOMINEE2').val('');
                $('#NOMINEE2PROOFIMAGE .file-input').empty();
                $scope.nominee2Load = true;
                $scope.nominee2typeError = false;
                $scope.nm2ViewHide = false;
            }
            if (imgName == "NOMINEE3") {
                $('#NOMINEE3').val('');
                $('#NOMINEE3PROOFIMAGE .file-input').empty();
                $scope.nominee3Load = true;
                $scope.nominee3typeError = false;
                $scope.nm3ViewHide = false;
            }
            if (imgName == "GUARDIAN1") {
                $('#GUARDIAN1').val('');
                $('#GUARDIAN1PROOFIMAGE .file-input').empty();
                $scope.guardian1Load = true;
                $scope.guardian1typeError = false;
                $scope.guViewHide = false;
            }
            if (imgName == "GUARDIAN2") {
                $('#GUARDIAN2').val('');
                $('#GUARDIAN2PROOFIMAGE .file-input').empty();
                $scope.guardian2Load = true;
                $scope.guardian2typeError = false;
                $scope.gu2ViewHide = false;
            }
            if (imgName == "GUARDIAN3") {
                $('#GUARDIAN3').val('');
                $('#GUARDIAN3PROOFIMAGE .file-input').empty();
                $scope.guardian3Load = true;
                $scope.guardian3typeError = false;
                $scope.gu3ViewHide = false;
            }
            if (imgName == "ADDRESSMODIFICATION") {
                $('#ADDRESSMODIFICATION').val('');
                $('#ADDRESSMODIFICATION .file-input').empty();
                $scope.amLoad = true;
                $scope.amError = false;
            }
            $scope.updateImage(imgName, imgValue, $scope.FileType, '');
        }
    }

    $scope.pdfReadFn = function (filesSelected, imageName) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var textAreaFileContents = document.getElementById("textAreaFileContents");

            formValue = fileLoadedEvent.target.result;
            var r_split = formValue.split(",");
            $scope.FileType = "PDF";

            var showPicture = document.querySelector("#" + imageName + "img");
            //    showPicture.src = "images/upload_pdf.png";

            $scope.update_img(imageName, r_split[1], formValue);

        };

        fileReader.readAsDataURL(fileToLoad);
    }

    $scope.upldImageValidate = function (imgName, imgValue, fileType, docId) {
        var doc_type = 'ind_aadhaar';
        /*if (docId == 108) {
        doc_type = 'ind_passport';
        } else if (docId == 109) {
        doc_type = 'ind_voter_id';
        } else if (docId == 110) {
        doc_type = 'ind_driving_license';
        } else if (docId == 111) {
        doc_type = 'ind_aadhaar';
        } else if (docId == 118 || imgName == 'PANNumber') {
        doc_type = 'ind_pan';
        } else if (imgName == 'BankCheque') {
        doc_type = 'ind_cheque';
        }*/
        if (imgName == "CorrespondenceAddress" || imgName == "CorrespondenceAddress2") {
            ProofType = 'C'
        } else if (imgName == "PermenantAddress" || imgName == "PermenantAddress2") {
            ProofType = 'P'
        }
        var url = 'ValidateDocument';
        var data = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            ProofType: ProofType,
            data: {
                doc_type: doc_type,
                document1: imgValue
            }
        }
        $scope.docUpldAPI = true;
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, data).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            $scope.cAddressCNImgError1 = response.ErrorMessage
            $scope.pAddressCNImgError1 = response.ErrorMessage
            if (response.IsSuccess) {
                var s_url = "DIYImageUpload";
                //var s_url = "DIYImageUploadS3";
                if ($scope.optimize) {
                    s_url = "DIYImageUploadOptimize";
                    //s_url = "DIYImageUploadS3";
                }
                var sendData = {
                    ImageName: imgName,
                    Image: imgValue,
                    DocumentType: docId,
                    ReferenceNumber: $rootScope.formData.eRefNumber,
                    Extention: fileType,
                    IsDiy: true,
                    IsIPV: "0",
                    EncryptToken: $rootScope.EncryptToken,
                    IsSelfi: $scope.IsSelfi,
                    Latitude: $rootScope.formData.latitude,
                    Longitude: $rootScope.formData.longitude,
                };
                serverService.apiCall(s_url, sendData).then(function (a) {
                    var response = a.data;
                    $scope.cAddressCNImgError1 = response.ErrorMessage
                    $scope.docUpldAPI = false;
                    if (response.IsSuccess) {
                        if (imgName == "PANNumber") {
                            $scope.panImageUpdt = true;
                            $scope.panLoad = false;
                            $scope.panImgError = false;
                            $scope.pantypeError = false;
                            $scope.panImageValidation = true;
                        }

                        if (imgName == "BankCheque") {
                            $scope.bankUpdt = true;
                            $scope.bankLoad = false;
                            $scope.bankImgError = false;
                            $scope.banktypeError = false;
                            $scope.chequeImageValidation = true;
                        }

                        if (imgName == "CorrespondenceAddress") {
                            $scope.cAddressUpdt = true;
                            $scope.cAdrLoad = false;
                            $scope.cAddressImgError = false;
                            $scope.caddrtypeError = false;
                            $scope.caddressProofImageValidation = true;
                        }
                        if (imgName == "CorrespondenceAddress2") {
                            $scope.cAdrLoad2 = false;
                            $scope.cAddressImgError = false;
                            $scope.caddrtypeError2 = false;
                        }
                        if (imgName == "PermenantAddress") {
                            $scope.pAddressUpdt = true;
                            $scope.pAdrLoad = false;
                            $scope.pAddressImgError = false;
                            $scope.paddrtypeError = false;
                            $scope.paddressProofImageValidation = true;
                        }
                        if (imgName == "PermenantAddress2") {
                            $scope.pAdrLoad2 = false;
                            $scope.pAddressImgError = false;
                            $scope.paddrtypeError2 = false;
                        }
                    } else {
                        if (imgName == 'CorrespondenceAddress') {
                            $('#CorrespondenceAddress').val('');
                            $("#cAddressImage .file-input").empty();
                            if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
                                $scope.cAddressCNImgError = false;
                            } else {
                                $scope.cAddressCNImgError = true;
                            }
                            $(".c-adr .file-preview").empty();
                            $rootScope.formData.caImage = '';
                        }

                        if (imgName == 'CorrespondenceAddress2') {
                            $('#CorrespondenceAddress2').val('');
                            $("#cAddressImage2 .file-input").empty();
                            if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
                                $scope.cAddressCNImgError = false;
                            } else {
                                $scope.cAddressCNImgError = true;
                            }
                            $(".c-adr2 .file-preview").empty();
                            $rootScope.formData.caImage2 = '';
                        }

                        if (imgName == 'PermenantAddress') {
                            $('#PermenantAddress').val('');
                            $("#pAddressImage .file-input").empty();
                            $(".p-adr .file-preview").empty();
                            if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
                                $scope.pAddressCNImgError = false;
                            } else {
                                $scope.pAddressCNImgError = true;
                            }
                            $rootScope.formData.paImage = '';
                        }

                        if (imgName == 'PermenantAddress2') {
                            $('#PermenantAddress2').val('');
                            $("#pAddressImage2 .file-input").empty();
                            $(".p-adr2 .file-preview").empty();
                            if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
                                $scope.pAddressCNImgError = false;
                            } else {
                                $scope.pAddressCNImgError = true;
                            }
                            $rootScope.formData.paImage = '';
                            $rootScope.formData.paImage2 = '';
                        }
                    }
                    $scope.getImages();
                    $scope.bindImage(imgName);
                });
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            } else {
                $scope.docUpldAPI = false;
                if (imgName == 'CorrespondenceAddress') {
                    $('#CorrespondenceAddress').val('');
                    $("#cAddressImage .file-input").empty();
                    if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
                        $scope.cAddressCNImgError = false;
                    } else {
                        $scope.cAddressCNImgError = true;
                    }
                    $(".c-adr .file-preview").empty();
                    $rootScope.formData.caImage = '';
                }

                if (imgName == 'CorrespondenceAddress2') {
                    $('#CorrespondenceAddress2').val('');
                    $("#cAddressImage2 .file-input").empty();
                    if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
                        $scope.cAddressCNImgError = false;
                    } else {
                        $scope.cAddressCNImgError = true;
                    }
                    $(".c-adr2 .file-preview").empty();
                    $rootScope.formData.caImage2 = '';
                }

                if (imgName == 'PermenantAddress') {
                    $('#PermenantAddress').val('');
                    $("#pAddressImage .file-input").empty();
                    $(".p-adr .file-preview").empty();
                    if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
                        $scope.pAddressCNImgError = false;
                    } else {
                        $scope.pAddressCNImgError = true;
                    }
                    $rootScope.formData.paImage = '';
                    $rootScope.formData.paImage = '';
                }

                if (imgName == 'PermenantAddress2') {
                    $('#PermenantAddress2').val('');
                    $("#pAddressImage2 .file-input").empty();
                    $(".p-adr2 .file-preview").empty();
                    if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
                        $scope.pAddressCNImgError = false;
                    } else {
                        $scope.pAddressCNImgError = true;
                    }
                    $rootScope.formData.paImage = '';
                    $rootScope.formData.paImage2 = '';
                }
                $scope.getImages();
            }
        })
    }
    $scope.updateImage = function (imgName, imgValue, fileType, docId) {
        if (imgName == "PANNumber") {
            $scope.imgPanName = imgName;
            $scope.PanimgValue = imgValue;
            $scope.PanFileType = fileType;
            $scope.PandocId = docId;
            var s_geturl = "ImageValidation";
            $rootScope.formData.apiLoading = true;
            var sendData = {
                ReferenceNumber: $rootScope.formData.eRefNumber,
                image: imgValue,
                doc_type: "ind_pan"
            };
            serverService.apiCall(s_geturl, sendData).then(function (a) {
                var response = a.data;
                $rootScope.formData.apiLoading = false;
                $scope.imageErrorMsg = response.ErrorMessage;
                if (response.IsSuccess == true) {
                    $scope.panImgErr = false;
                    if ($scope.ipvStage) {
                        $scope.ipvStage = false;
                    }
                    var s_url = "DIYImageUpload";
                    //var s_url = "DIYImageUploadS3";
                    if ($scope.optimize) {
                        if (imgName != 'ClientPhoto') {
                            s_url = "DIYImageUploadOptimize";
                            //s_url = "DIYImageUploadS3";
                        }
                    }
                    var refNo = $rootScope.formData.ReferenceNumber;
                    if ($rootScope.vcip) {
                        refNo = $rootScope.formData.ReferenceNumber;
                    }
                    $scope.docUpldAPI = true;
                    if ($rootScope.vcip) {
                        refNo = $rootScope.formData.ReferenceNumber;
                    }
                    if ($rootScope.BYOD) {
                        refNo = $rootScope.formData.ReferenceNumber;
                    }
                    if ($scope.selfTrue) {
                        $scope.IsSelfi = 'Y';
                    } else {
                        $scope.IsSelfi = 'N';
                    }
                    var sendData = {
                        ImageName: imgName,
                        Image: imgValue,
                        DocumentType: docId,
                        ReferenceNumber: $rootScope.formData.eRefNumber,
                        Extention: fileType,
                        IsDiy: true,
                        IsIPV: "0",
                        EncryptToken: $rootScope.EncryptToken,
                        IsSelfi: $scope.IsSelfi,
                        Latitude: $rootScope.formData.latitude,
                        Longitude: $rootScope.formData.longitude,
                    };
                    $rootScope.formData.apiLoading = true;
                    serverService.apiCall(s_url, sendData).then(function (a) {
                        var response = a.data;
                        $rootScope.formData.apiLoading = false;
                        $scope.docUpldAPI = false;
                        if (response.IsSuccess) {

                            //$scope.showView = true;
                            if (imgName == "PANNumber") {
                                $scope.panImageUpdt = true;
                                $scope.panLoad = false;
                                $scope.panImgError = false;
                                $scope.pantypeError = false;
                                $scope.panImageValidation = true;
                            }
                            $scope.getImages();
                            if (response.IsSuccess && !$rootScope.formData.digiData) {
                                var url = "Documentextraction";
                                var sendRequest = {
                                    "ReferenceNumber": $rootScope.formData.eRefNumber,
                                    "doctype": "Pan",
                                    "Image": imgValue,
                                }
                                $rootScope.formData.apiLoadings = true;
                                serverService.apiCall(url, sendRequest).then(function (a) {

                                    var response = a.data
                                    $rootScope.formData.apiLoadings = false;
                                    $scope.Panfserror = response.ErrorMessage

                                    if (response.IsSuccess) {
                                        $scope.bindImage(imgName);
                                        $rootScope.fsName = response.FatherName
                                        $rootScope.FatherNamefromIdfy = response.FatherNamefromIdfy
                                        if (!response.IsFatherNameMatch) {
                                            if ($rootScope.FatherNamefromIdfy != "") {
                                                var previewPdf1PanModal = new bootstrap.Modal(document.getElementById('previewPdf1Pan'), {
                                                    backdrop: 'static',
                                                    keyboard: true
                                                });
                                                previewPdf1PanModal.show();
                                            }
                                        }
                                    } else {
                                    }

                                })
                            }
                        } else {
                            if (imgName == "PANNumber") {
                                $('#PANNumber').val('');
                                $('#panPhoto .file-input').empty();
                                $scope.panCNImgError = true;
                            }
                            $scope.getImages();
                            $scope.bindImage(imgName);
                        }
                    });
                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                    $rootScope.formData.apiLoading = false;
                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    paninformation.show();
                    return
                }
                else {
                    $('#PANNumber').val('');
                    $scope.overallApi();
                    $scope.getImages();
                    $scope.bindImage(imgName);
                    $scope.panImgErr = true;
                    // location.reload();
                }
            })
        } else {
            if (docId == 111) {
                $scope.upldImageValidate(imgName, imgValue, fileType, docId);
            } else {

                if ($scope.ipvStage) {
                    $scope.ipvStage = false;
                }
                if (imgName == 'ClientPhoto') {
                    if ($scope.selfTrue) {
                        $scope.IsSelfi = 'Y';
                    } else {
                        $scope.IsSelfi = 'N';
                    }
                    var s_url = "Validategeolocation";
                    //var s_url = "DIYImageUploadS3";
                    var sendData = {
                        ReferenceNumber: $rootScope.formData.eRefNumber,
                        latitude: $rootScope.formData.latitude,
                        longitude: $rootScope.formData.longitude

                    };
                    serverService.apiCall(s_url, sendData).then(function (a) {
                        // $scope.docUpldAPI = false;
                        var response = a.data;
                        $scope.geolocationErrorMsg = response.ErrorMessage;
                        $scope.VaildCountry = response.Isvalidcountry
                        if ($scope.VaildCountry) {
                            var s_url = "DIYImageUpload";
                            //var s_url = "DIYImageUploadS3";
                            if ($scope.optimize) {
                                if (imgName != 'ClientPhoto') {
                                    s_url = "DIYImageUploadOptimize";
                                    //s_url = "DIYImageUploadS3";
                                }
                            }
                            var refNo = $rootScope.formData.ReferenceNumber;
                            if ($rootScope.vcip) {
                                refNo = $rootScope.formData.ReferenceNumber;
                            }

                            $scope.docUpldAPI = true;
                            if ($rootScope.vcip) {
                                refNo = $rootScope.formData.ReferenceNumber;
                            }

                            if (imgName == "BankCheque") {
                                var sendData = {
                                    ImageName: imgName,
                                    Image: imgValue,
                                    DocumentType: docId,
                                    ReferenceNumber: $rootScope.formData.eRefNumber,
                                    Extention: fileType,
                                    ChequeType: 1,
                                    IsDiy: true,
                                    IsIPV: "0",
                                    EncryptToken: $rootScope.EncryptToken,
                                    IsSelfi: 'N'
                                }
                            } else {
                                var sendData = {
                                    ImageName: imgName,
                                    Image: imgValue,
                                    DocumentType: docId,
                                    ReferenceNumber: $rootScope.formData.eRefNumber,
                                    Extention: fileType,
                                    IsDiy: true,
                                    IsIPV: "0",
                                    EncryptToken: $rootScope.EncryptToken,
                                    IsSelfi: $scope.IsSelfi,
                                    Latitude: $rootScope.formData.latitude,
                                    Longitude: $rootScope.formData.longitude,
                                };
                            }

                            serverService.apiCall(s_url, sendData).then(function (a) {
                                var response = a.data;
                                $scope.docUpldAPI = false;
                                if (response.IsSuccess) {
                                    //$scope.showView = true;
                                    if (imgName == "PANNumber") {
                                        $scope.panImageUpdt = true;
                                        $scope.panLoad = false;
                                        $scope.panImgError = false;
                                        $scope.pantypeError = false;
                                        $scope.panImageValidation = true;
                                    }
                                    if (imgName == "ClientPhoto") {
                                        $scope.photoImageUpdt = true;
                                        $scope.cltLoad = false;
                                        $scope.photoImgError = false;
                                        $scope.clientPhoqqualityError = false;
                                        $scope.phototypeError = false;
                                        $scope.photoProofImageValidation = true;
                                    }

                                    if (imgName == "Aadhar") {
                                        $scope.aadharImageUpdt = true;
                                        $scope.aadharLoad = false;
                                        $scope.aadharImgError = false;
                                        $scope.aadhartypeError = false;
                                    }

                                    if (imgName == "CorrespondenceAddress") {
                                        $scope.cAddressUpdt = true;
                                        $scope.cAdrLoad = false;
                                        $scope.cAddressImgError = false;
                                        $scope.caddrtypeError = false;
                                        $scope.caddressProofImageValidation = true;
                                    }
                                    if (imgName == "CorrespondenceAddress2") {
                                        $scope.cAdrLoad2 = false;
                                        $scope.cAddressImgError = false;
                                        $scope.caddrtypeError2 = false;
                                    }
                                    if (imgName == "PermenantAddress") {
                                        $scope.pAddressUpdt = true;
                                        $scope.pAdrLoad = false;
                                        $scope.pAddressImgError = false;
                                        $scope.paddrtypeError = false;
                                        $scope.paddressProofImageValidation = true;
                                    }
                                    if (imgName == "PermenantAddress2") {
                                        $scope.pAdrLoad2 = false;
                                        $scope.pAddressImgError = false;
                                        $scope.paddrtypeError2 = false;
                                    }
                                    if (imgName == "BankCheque") {
                                        $scope.bankUpdt = true;
                                        $scope.bankLoad = false;
                                        $scope.bankImgError = false;
                                        $scope.banktypeError = false;
                                        $scope.chequeImageValidation = true;
                                    }
                                    if (imgName == "SPECIMENPROOF") {
                                        $scope.signatureUpdt = true;
                                        $scope.signatureLoad = false;
                                        $scope.signatureImgError = false;
                                        $scope.signaturetypeError = false;
                                        $scope.sigImageValidation = true;
                                    }
                                    if (imgName == "Income") {
                                        $scope.foUpdt = true;
                                        $scope.incomeLoad = false;
                                        $scope.foImgError = false;
                                        $scope.banktypeError = false;
                                        $scope.incomeProofImageValidation = true;
                                    }
                                    if (imgName == "RMSIGNATURE") {
                                        $scope.tcUpdt = true;
                                        $scope.tcLoad = false;
                                        $scope.tcImgError = false;
                                        $scope.tctypeError = false;
                                        $scope.tcImageValidation = true;
                                    }
                                    if (imgName == "CMLDOCUMENT") {
                                        $scope.cmlLoad = true;
                                        $scope.cmlUpdt = true;
                                        $scope.cmlImgError = false;
                                        $scope.cmltypeError = false;
                                        $scope.cmlImageValidation = false;
                                    }
                                    if (imgName == "ADDITIONALDOC1") {
                                        $scope.adocLoad = false;
                                        $scope.adocImgError = false;
                                        $scope.adoctypeError = false;
                                    }
                                    if (imgName == "ADDITIONALDOC2") {
                                        $scope.adocLoad = false;
                                        $scope.adocImgError = false;
                                        $scope.adoc2typeError = false;
                                    }
                                    if (imgName == "ADDITIONALDOC3") {
                                        $scope.adocLoad = false;
                                        $scope.adocImgError = false;
                                        $scope.adoc3typeError = false;
                                    }
                                    if (imgName == "FIRSTPOA") {
                                        $scope.poaUpdt = true;
                                        $scope.poaLoad = false;
                                        $scope.poaImgError = false;
                                        $scope.poatypeError = false;
                                        $scope.poaImageValidation = true;
                                    }
                                    if (imgName == "SECONDPOA") {
                                        $scope.poaLoad = false;
                                        $scope.poaImgError = false;
                                        $scope.poa2typeError = false;
                                    }
                                    if (imgName == "NOMINEE1") {
                                        $scope.nominee1Updt = true;
                                        $scope.nominee1Load = false;
                                        $scope.nominee1ImgError = false;
                                        $scope.nominee1typeError = false;
                                    }
                                    if (imgName == "NOMINEE2") {
                                        $scope.nominee2Updt = true;
                                        $scope.nominee2Load = false;
                                        $scope.nominee2ImgError = false;
                                        $scope.nominee2typeError = false;
                                    }
                                    if (imgName == "NOMINEE3") {
                                        $scope.nominee3Updt = true;
                                        $scope.nominee3Load = false;
                                        $scope.nominee3ImgError = false;
                                        $scope.nominee3typeError = false;
                                    }
                                    if (imgName == "GUARDIAN1") {
                                        $scope.guardian1Updt = true;
                                        $scope.guardian1Load = false;
                                        $scope.guardian1ImgError = false;
                                        $scope.guardian1typeError = false;
                                    }
                                    if (imgName == "GUARDIAN2") {
                                        $scope.guardian2Updt = true;
                                        $scope.guardian2Load = false;
                                        $scope.guardian2ImgError = false;
                                        $scope.guardian2typeError = false;
                                    }
                                    if (imgName == "GUARDIAN3") {
                                        $scope.guardian3Updt = true;
                                        $scope.guardian3Load = false;
                                        $scope.guardian3ImgError = false;
                                        $scope.guardian3typeError = false;
                                    }
                                    if (imgName == "ADDRESSMODIFICATION") {
                                        $scope.amLoad = false;
                                        $scope.amImgError = false;
                                        $scope.amtypeError = false;
                                        $scope.amImageValidation = true;
                                    }

                                    $scope.getImages();
                                    $scope.bindImage(imgName);
                                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                                    $rootScope.formData.apiLoading = false;
                                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                    paninformation.show();
                                    return
                                } else {
                                    $rootScope.formData.apiLoading = false;
                                    if (imgName == "ClientPhoto") {
                                        if ($scope.IsSelfi == "Y") {
                                            $scope.photoImgError = false;
                                            $scope.photoImageUpdt = false;
                                            // $scope.clientPhoqqualityError = true;
                                            $scope.ClienterrorMsg = response.ErrorMessage
                                            if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
                                                $scope.clientPhoqqualityError = false;
                                            } else {
                                                $scope.clientPhoqqualityError = true;
                                            }
                                        }
                                    }

                                    if (imgName == "PANNumber") {
                                        $('#PANNumber').val('');
                                        $('#panPhoto .file-input').empty();
                                        $scope.panCNImgError = true;
                                    }
                                    if (imgName == "BankCheque") {
                                        $('#BankCheque').val('');
                                        $('#bankImage .file-input').empty();
                                        $scope.bankCNImgError = true;
                                    }
                                    if (imgName == 'CorrespondenceAddress') {
                                        $('#CorrespondenceAddress').val('');
                                        $("#cAddressImage .file-input").empty();
                                        $scope.cAddressQImgError = true;
                                        $(".c-adr .file-preview").empty();
                                        $rootScope.formData.caImage = '';
                                    }

                                    if (imgName == 'CorrespondenceAddress2') {
                                        $('#CorrespondenceAddress2').val('');
                                        $("#cAddressImage2 .file-input").empty();
                                        $scope.cAddressQImgError = true;
                                        $(".c-adr2 .file-preview").empty();
                                        $rootScope.formData.caImage2 = '';
                                    }

                                    if (imgName == 'PermenantAddress') {
                                        $('#PermenantAddress').val('');
                                        $("#pAddressImage .file-input").empty();
                                        $(".p-adr .file-preview").empty();
                                        $rootScope.formData.paImage = '';
                                        $scope.pAddressQImgError = true;
                                    }

                                    if (imgName == 'PermenantAddress2') {
                                        $('#PermenantAddress2').val('');
                                        $("#pAddressImage2 .file-input").empty();
                                        $(".p-adr2 .file-preview").empty();
                                        $rootScope.formData.paImage2 = '';
                                        $scope.pAddressQImgError = true;
                                    }
                                    $scope.getImages();
                                    $scope.bindImage(imgName);
                                }

                            });

                        } else {
                            var error = 0;
                            $scope.geoLocationError = true;
                            error++;

                        }
                    })
                } else {
                    var s_url = "DIYImageUpload";
                    //var s_url = "DIYImageUploadS3";
                    if ($scope.optimize) {
                        if (imgName != 'ClientPhoto') {
                            s_url = "DIYImageUploadOptimize";
                            //s_url = "DIYImageUploadS3";
                        }
                    }
                    var refNo = $rootScope.formData.ReferenceNumber;
                    if ($rootScope.vcip) {
                        refNo = $rootScope.formData.ReferenceNumber;
                    }

                    $scope.docUpldAPI = true;
                    if ($rootScope.vcip) {
                        refNo = $rootScope.formData.ReferenceNumber;
                    }
                    if ($scope.selfTrue) {
                        $scope.IsSelfi = 'Y';
                    } else {
                        $scope.IsSelfi = 'N';
                    }
                    if (imgName == "BankCheque") {
                        var sendData = {
                            ImageName: imgName,
                            Image: imgValue,
                            DocumentType: docId,
                            ReferenceNumber: $rootScope.formData.eRefNumber,
                            Extention: fileType,
                            ChequeType: 1,
                            IsDiy: true,
                            IsIPV: "0",
                            EncryptToken: $rootScope.EncryptToken,
                            IsSelfi: 'N'
                        }
                    } else {
                        var sendData = {
                            ImageName: imgName,
                            Image: imgValue,
                            DocumentType: docId,
                            ReferenceNumber: $rootScope.formData.eRefNumber,
                            Extention: fileType,
                            IsDiy: true,
                            IsIPV: "0",
                            EncryptToken: $rootScope.EncryptToken,
                            IsSelfi: $scope.IsSelfi,
                            Latitude: $rootScope.formData.latitude,
                            Longitude: $rootScope.formData.longitude,
                        };
                    }

                    serverService.apiCall(s_url, sendData).then(function (a) {
                        var response = a.data;
                        $scope.docUpldAPI = false;
                        if (response.IsSuccess) {
                            //$scope.showView = true;
                            if (imgName == "PANNumber") {
                                $scope.panImageUpdt = true;
                                $scope.panLoad = false;
                                $scope.panImgError = false;
                                $scope.pantypeError = false;
                                $scope.panImageValidation = true;
                            }
                            if (imgName == "ClientPhoto") {
                                $scope.photoImageUpdt = true;
                                $scope.cltLoad = false;
                                $scope.photoImgError = false;
                                $scope.clientPhoqqualityError = false;
                                $scope.phototypeError = false;
                                $scope.photoProofImageValidation = true;
                            }

                            if (imgName == "Aadhar") {
                                $scope.aadharImageUpdt = true;
                                $scope.aadharLoad = false;
                                $scope.aadharImgError = false;
                                $scope.aadhartypeError = false;
                            }

                            if (imgName == "CorrespondenceAddress") {
                                $scope.cAddressUpdt = true;
                                $scope.cAdrLoad = false;
                                $scope.cAddressImgError = false;
                                $scope.caddrtypeError = false;
                                $scope.caddressProofImageValidation = true;
                            }
                            if (imgName == "CorrespondenceAddress2") {
                                $scope.cAdrLoad2 = false;
                                $scope.cAddressImgError = false;
                                $scope.caddrtypeError2 = false;
                            }
                            if (imgName == "PermenantAddress") {
                                $scope.pAddressUpdt = true;
                                $scope.pAdrLoad = false;
                                $scope.pAddressImgError = false;
                                $scope.paddrtypeError = false;
                                $scope.paddressProofImageValidation = true;
                            }
                            if (imgName == "PermenantAddress2") {
                                $scope.pAdrLoad2 = false;
                                $scope.pAddressImgError = false;
                                $scope.paddrtypeError2 = false;
                            }
                            if (imgName == "BankCheque") {
                                $scope.bankUpdt = true;
                                $scope.bankLoad = false;
                                $scope.bankImgError = false;
                                $scope.banktypeError = false;
                                $scope.chequeImageValidation = true;
                            }
                            if (imgName == "SPECIMENPROOF") {
                                $scope.signatureUpdt = true;
                                $scope.signatureLoad = false;
                                $scope.signatureImgError = false;
                                $scope.signaturetypeError = false;
                                $scope.sigImageValidation = true;
                            }
                            if (imgName == "Income") {
                                $scope.foUpdt = true;
                                $scope.incomeLoad = false;
                                $scope.foImgError = false;
                                $scope.banktypeError = false;
                                $scope.incomeProofImageValidation = true;
                            }
                            if (imgName == "RMSIGNATURE") {
                                $scope.tcUpdt = true;
                                $scope.tcLoad = false;
                                $scope.tcImgError = false;
                                $scope.tctypeError = false;
                                $scope.tcImageValidation = true;
                            }
                            if (imgName == "CMLDOCUMENT") {
                                $scope.cmlLoad = true;
                                $scope.cmlUpdt = true;
                                $scope.cmlImgError = false;
                                $scope.cmltypeError = false;
                                $scope.cmlImageValidation = false;
                            }
                            if (imgName == "ADDITIONALDOC1") {
                                $scope.adocLoad = false;
                                $scope.adocImgError = false;
                                $scope.adoctypeError = false;
                            }
                            if (imgName == "ADDITIONALDOC2") {
                                $scope.adocLoad = false;
                                $scope.adocImgError = false;
                                $scope.adoc2typeError = false;
                            }
                            if (imgName == "ADDITIONALDOC3") {
                                $scope.adocLoad = false;
                                $scope.adocImgError = false;
                                $scope.adoc3typeError = false;
                            }
                            if (imgName == "FIRSTPOA") {
                                $scope.poaUpdt = true;
                                $scope.poaLoad = false;
                                $scope.poaImgError = false;
                                $scope.poatypeError = false;
                                $scope.poaImageValidation = true;
                            }
                            if (imgName == "SECONDPOA") {
                                $scope.poaLoad = false;
                                $scope.poaImgError = false;
                                $scope.poa2typeError = false;
                            }
                            if (imgName == "NOMINEE1") {
                                $scope.nominee1Updt = true;
                                $scope.nominee1Load = false;
                                $scope.nominee1ImgError = false;
                                $scope.nominee1typeError = false;
                            }
                            if (imgName == "NOMINEE2") {
                                $scope.nominee2Updt = true;
                                $scope.nominee2Load = false;
                                $scope.nominee2ImgError = false;
                                $scope.nominee2typeError = false;
                            }
                            if (imgName == "NOMINEE3") {
                                $scope.nominee3Updt = true;
                                $scope.nominee3Load = false;
                                $scope.nominee3ImgError = false;
                                $scope.nominee3typeError = false;
                            }
                            if (imgName == "GUARDIAN1") {
                                $scope.guardian1Updt = true;
                                $scope.guardian1Load = false;
                                $scope.guardian1ImgError = false;
                                $scope.guardian1typeError = false;
                            }
                            if (imgName == "GUARDIAN2") {
                                $scope.guardian2Updt = true;
                                $scope.guardian2Load = false;
                                $scope.guardian2ImgError = false;
                                $scope.guardian2typeError = false;
                            }
                            if (imgName == "GUARDIAN3") {
                                $scope.guardian3Updt = true;
                                $scope.guardian3Load = false;
                                $scope.guardian3ImgError = false;
                                $scope.guardian3typeError = false;
                            }
                            if (imgName == "ADDRESSMODIFICATION") {
                                $scope.amLoad = false;
                                $scope.amImgError = false;
                                $scope.amtypeError = false;
                                $scope.amImageValidation = true;
                            }

                            $scope.getImages();
                            $scope.bindImage(imgName);
                        } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                            $rootScope.formData.apiLoading = false;
                            $rootScope.formData.panStatus1 = response.ErrorMessage;
                            var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                                backdrop: 'static',
                                keyboard: false
                            });
                            paninformation.show();
                            return
                        } else {
                            $rootScope.formData.apiLoading = false;
                            if (imgName == "ClientPhoto") {
                                if ($scope.IsSelfi == "Y") {
                                    $scope.photoImgError = false;
                                    $scope.photoImageUpdt = false;
                                    // $scope.clientPhoqqualityError = true;
                                    $scope.ClienterrorMsg = response.ErrorMessage
                                    if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
                                        $scope.clientPhoqqualityError = false;
                                    } else {
                                        $scope.clientPhoqqualityError = true;
                                    }
                                }
                            }

                            if (imgName == "PANNumber") {
                                $('#PANNumber').val('');
                                $('#panPhoto .file-input').empty();
                                $scope.panCNImgError = true;
                            }
                            if (imgName == "BankCheque") {
                                $('#BankCheque').val('');
                                $('#bankImage .file-input').empty();
                                $scope.bankCNImgError = true;
                            }
                            if (imgName == 'CorrespondenceAddress') {
                                $('#CorrespondenceAddress').val('');
                                $("#cAddressImage .file-input").empty();
                                $scope.cAddressQImgError = true;
                                $(".c-adr .file-preview").empty();
                                $rootScope.formData.caImage = '';
                            }

                            if (imgName == 'CorrespondenceAddress2') {
                                $('#CorrespondenceAddress2').val('');
                                $("#cAddressImage2 .file-input").empty();
                                $scope.cAddressQImgError = true;
                                $(".c-adr2 .file-preview").empty();
                                $rootScope.formData.caImage2 = '';
                            }

                            if (imgName == 'PermenantAddress') {
                                $('#PermenantAddress').val('');
                                $("#pAddressImage .file-input").empty();
                                $(".p-adr .file-preview").empty();
                                $rootScope.formData.paImage = '';
                                $scope.pAddressQImgError = true;
                            }

                            if (imgName == 'PermenantAddress2') {
                                $('#PermenantAddress2').val('');
                                $("#pAddressImage2 .file-input").empty();
                                $(".p-adr2 .file-preview").empty();
                                $rootScope.formData.paImage2 = '';
                                $scope.pAddressQImgError = true;
                            }
                            $scope.getImages();
                            $scope.bindImage(imgName);
                        }

                    });
                }
            }
        }
    }
    $scope.getDocsProof = function () {
        var s_url = "DIYGetDocumentProofStageByRefEnc";

        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber
        };

        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = a.data
            if (response.IsSuccess) {
                $rootScope.IsCorrespondenceSikkim = response.ObjCDIYRegistration.IsCorrespondenceSikkim
                $rootScope.IsPermanentSikkim = response.ObjCDIYRegistration.IsPermanentSikkim
                $rootScope.ResumeIsFatherNamePopup = response.ObjCDIYRegistration.IsFatherNamePopup
                $rootScope.FatherNamefromIdfy = response.ObjCDIYRegistration.FatherNameFromIdfy
                $rootScope.fsName = response.FatherName;
                if (($rootScope.ResumeIsFatherNamePopup == "Y" || response.ObjCDIYRegistration.Continuewithoutupdate == "N") && $rootScope.formData.Pansuccess != 0) {
                    var previewPdf1PanModal = new bootstrap.Modal(document.getElementById('previewPdf1Pan'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    previewPdf1PanModal.show();
                }
                if ($rootScope.IsCorrespondenceSikkim == "Y" || $rootScope.IsPermanentSikkim == "Y") {
                    $scope.addressUpld = true;
                }
                if (response.ObjCDIYRegistration.JanaFlag == 'Y') {
                    $scope.JanaFlagPdf = true
                }

                if (response.ObjCDIYRegistration.DDIP != 'N') {

                    $scope.ddpi = 'Y';
                    /*   $scope.DDpiErr=true; */
                    setTimeout(function () {
                        $('#ddpi').prop('checked', true);
                    }, 50);

                } else {
                    $scope.ddpi = 'N';
                    setTimeout(function () {
                        $('#ddpi').prop('checked', false);
                    }, 50);

                }
                if (response.ObjCDIYRegistration.Emargin == 'Y') {
                    $scope.ddpi = 'Y';
                    setTimeout(function () {
                        $('#InternetTrading').prop('checked', true);
                        $('#ddpi').prop('checked', true);
                    }, 50);
                    $rootScope.formData.fields.InternetTrading = "Y";
                    $scope.termsOpen = true;

                }
                if (response.ObjCDIYRegistration.IsDDPIValidation == 'Y') {
                    $scope.DDpiErr = true;
                    $scope.ddpi = 'Y';
                    setTimeout(function () {
                        $('#ddpi').prop('checked', true);
                    }, 50);
                }

                if (response.ObjCDIYRegistration.IsNominee1) {
                    $scope.NomineeOne = true
                }
                if (response.ObjCDIYRegistration.IsNominee2) {
                    $scope.NomineeTwo = true
                }
                if (response.ObjCDIYRegistration.IsNominee3) {
                    $scope.NomineeThree = true
                }
                if (response.ObjCDIYRegistration.IsGuardian1) {
                    $scope.GuardianOne = true
                }
                if (response.ObjCDIYRegistration.IsGuardian2) {
                    $scope.GuardianTwo = true
                }
                if (response.ObjCDIYRegistration.IsGuardian3) {
                    $scope.GuardianThree = true
                }
                if (sessionStorage.getItem('finacle') == "true" || sessionStorage.getItem('finacle') == true) {
                    $rootScope.webfinacle = true
                }
                if (sessionStorage.getItem('IsCKYC') == 'true' || sessionStorage.getItem('IsCKYC') == true) {
                    $rootScope.formData.CKYC = true
                } else {
                    $rootScope.formData.CKYC = false
                }
                if (sessionStorage.getItem('IsKRA') == "Y" || sessionStorage.getItem('IsKRA') == "true") {
                    $rootScope.formData.KRA = true
                } else {
                    $rootScope.formData.KRA = false
                }

                if (response.ObjCDIYRegistration.UTMBankShortCode == "SSWB") {
                    sessionStorage.setItem('sarasbank', true);
                    $rootScope.sarabank = true
                }
                if (response.ObjCDIYRegistration.UTMBankShortCode == "JFSB") {
                    sessionStorage.setItem('JanaBank', true);
                }
                if (response.ObjCDIYRegistration.FandOStatus == 1) {
                    $scope.foImgUpld = true;
                    $scope.incomeimageByodShow = true

                } else {
                    $scope.foImgUpld = false;
                    $scope.incomeimageByodShow = false;
                }

                if (response.ObjCDIYRegistration.IsAadharEdit == 1) {
                    $scope.paddrUpld = false;
                    $scope.cAddressDisable = true;
                } else {
                    $scope.paddrUpld = true;
                    $scope.cAddressDisable = false;
                }

                if (response.ObjCDIYRegistration.SamePermanentStatus == 1) {
                    $scope.paddrUpld = false;
                } else {
                    $scope.paddrUpld = true;
                }

                if (response.ObjCDIYRegistration.IsCMLDocument || sessionStorage.getItem('isCMLMandatory') == "1") {
                    $scope.cmlUpld = true;
                    $scope.cmlShow = true;
                } else {
                    $scope.cmlUpld = false;
                }
                if (response.ObjCDIYRegistration.CorAddrsddNewddl == 'False') {
                    $rootScope.formData.cList = $rootScope.formData.newDocumentTypeList.reduce((acc, eachArr2Elem) => {
                        if ($rootScope.formData.corressDocList.findIndex((eachArr1Elem) => eachArr1Elem.DocumentTypeId === eachArr2Elem.DocumentTypeId) === -1) {
                            acc.push(eachArr2Elem)
                        }
                        return acc
                    }, [...$rootScope.formData.corressDocList]);
                } else {
                    $rootScope.formData.cList = $rootScope.formData.corressDocList;
                }
                if (response.ObjCDIYRegistration.PerAddrsddNewddl == 'False') {
                    $rootScope.formData.pList = $rootScope.formData.newDocumentTypeList.reduce((acc, eachArr2Elem) => {
                        if ($rootScope.formData.pDocList.findIndex((eachArr1Elem) => eachArr1Elem.DocumentTypeId === eachArr2Elem.DocumentTypeId) === -1) {
                            acc.push(eachArr2Elem)
                        }
                        return acc
                    }, [...$rootScope.formData.pDocList]);
                } else {
                    $rootScope.formData.pList = $rootScope.formData.pDocList;
                }

                if (response.ObjCDIYRegistration.KRAClient == 1) {
                    $scope.ckycKRA = true;
                    //$scope.panUpld = false;
                    if (response.ObjCDIYRegistration.Pennydrop == 1) {
                        if (response.ObjCDIYRegistration.AxisBank == 1) {
                            $scope.ckycPennyAxis = true;
                            $scope.axisCustomer = true;
                            //$scope.displayForm();
                        } else {
                            //$scope.signatureUpld = true;
                        }
                    } else {
                        $scope.chequeUpld = true;
                        if (response.ObjCDIYRegistration.AxisBank == 1) {
                            $scope.axisCustomer = true;
                            //$scope.signatureUpld = false;
                        } else {
                            //$scope.signatureUpld = true;
                        }
                    }

                } else {

                    $scope.ckycKRA = false;
                    if (response.ObjCDIYRegistration.Pennydrop == 1) {
                        if (response.ObjCDIYRegistration.AxisBank == 1) { }
                        else {
                            //$scope.signatureUpld = true;
                        }
                    } else {
                        $scope.chequeUpld = true;
                        if (response.ObjCDIYRegistration.AxisBank == 1) {
                            //$scope.signatureUpld = false;
                        } else {
                            //$scope.signatureUpld = true;
                        }
                    }
                }

                if (response.ObjCDIYRegistration.IsKRAEdit == '1' || response.ObjCDIYRegistration.CKYCUpdate == '1') {
                    $scope.panUpld = true;
                    //$scope.signatureUpld = true;
                    $scope.photoUpld = true;
                    $scope.addressUpld = true;
                }

                if ($rootScope.webfinacle && $rootScope.formData.CKYC) {
                    $rootScope.ibDocumentHide = true;
                    $rootScope.ibCkycDocumentShow = true;
                    $scope.photoUpld = true;
                    /*if (response.ObjCDIYRegistration.Pennydrop != 1) {
                    $scope.chequeUpld = true;
                    }*/
                }
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            } else {
                $rootScope.formData.apiLoading = false;
            }
            if (!$rootScope.formData.docStageRejected) {
                $scope.panImageUpdt = false;
                $scope.signatureUpdt = false;
                $scope.photoImageUpdt = false;
                $scope.cAddressUpdt = false;
                $scope.pAddressUpdt = false;
                $scope.pAddressUpdt = false;
            }
        });

    }
    $scope.getDocsProof();
    $scope.popfathernamePan = function () {
        var url = "FathernameUpdate";
        var sendRequest = {
            "ReferenceNumber": $rootScope.formData.ReferenceNumber,
            "FatherName": $rootScope.fsName,
            "FatherNamefromIdfy": $rootScope.FatherNamefromIdfy,
            "continuewithoutupdate": "N",
            "UpdateandReplace": "Y"
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendRequest).then(function (a) {
            $rootScope.formData.apiLoading = false;
            var response = a.data
            if (response.IsSuccess) {

            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }
        })
    }
    $scope.ContiueWithOutPan = function () {
        var url = "FathernameUpdate";
        var sendRequest = {
            "ReferenceNumber": $rootScope.formData.ReferenceNumber,
            "FatherName": $rootScope.fsName,
            "FatherNamefromIdfy": $rootScope.FatherNamefromIdfy,
            "continuewithoutupdate": "Y",
            "UpdateandReplace": "N"
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendRequest).then(function (a) {
            $rootScope.formData.apiLoading = false;
            var response = a.data
            if (response.IsSuccess) {

            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }
        })
    }
    $scope.getImages = function () {

        var s_url = "DIYGetImagesByReferenceNumberFlag";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken
        }
        $scope.panLoad = true;
        $scope.cltLoad = true;
        $scope.aadharLoad = true;
        $scope.cAdrLoad = true;
        $scope.cAdrLoad2 = true;
        $scope.pAdrLoad = true;
        $scope.pAdrLoad2 = true;
        $scope.bankLoad = true;
        $scope.incomeLoad = true;
        $rootScope.docgetAPI = true;

        //$rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = a.data;

            $scope.panLoad = false;
            $scope.cltLoad = false;
            $scope.aadharLoad = false;
            $scope.cAdrLoad = false;
            $scope.cAdrLoad2 = false;
            $scope.pAdrLoad = false;
            $scope.pAdrLoad2 = false;
            $scope.bankLoad = false;
            $scope.incomeLoad = false;
            $rootScope.docgetAPI = false;

            if (response.IsSuccess) {

                $rootScope.IPVRedirectURL = response.IpvURLEncode;

                angular.forEach(response.IpvPOAandNomineeList, function (value, key) {
                    if (value.ImageName == "PANImage") {
                        $scope.panView = false;
                        $scope.panImageUpdt = false;
                        $scope.panimageByodShow = true;
                        $scope.overallpan = false
                        if (value.ImageFlag == 'Y') {
                            $scope.panView = true;
                            $scope.panimageByodShow = false;
                            $scope.panImageUpdt = true;
                            $scope.overallpan = true;
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.panVcipView = true;
                            $scope.panImageUpdt = false;
                        }
                    }

                    if (value.ImageName == "Specimen") {
                        $scope.signView = false;
                        $scope.signatureUpdt = false;
                        $scope.SignimageByodShow = true;
                        $scope.signatureimg = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.signView = true;
                            $scope.signatureUpdt = true;
                            $scope.SignimageByodShow = false;
                            $scope.signatureimg = true;
                        }
                    }

                    if (value.ImageName == "CLIENTPHOTO") {
                        $scope.photoView = false;
                        $scope.photoImageUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.photoView = true;
                            $scope.photoImageUpdt = true;
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.photoVcipView = true;
                            $scope.photoImageUpdt = false;
                        }
                    }

                    if (value.ImageName == "CheckImage") {
                        $scope.bankView = false;
                        $scope.bankUpdt = false;
                        /* $scope.CheckimageByodShow=true; */
                        if (value.ImageFlag == 'Y') {
                            $scope.bankView = true;
                            $scope.bankUpdt = true;
                            /* $scope.CheckimageByodShow=false; */
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.bankVcipView = true;
                            $scope.bankUpdt = false;
                        }
                    }

                    if (value.ImageName == "DocumentImage") {
                        $scope.cAddressView = false;
                        $scope.cAddressUpdt = false;
                        $scope.BYODcAddressUpdt = false;
                        $scope.CorressimageByodShow = true;
                        if (value.ImageFlag == 'Y') {
                            imgName = "CorrespondenceAddress"
                            $scope.cAddressView = true;
                            $scope.cAddressUpdt = true;
                            $scope.BYODcAddressUpdt = true;
                            $scope.CorressimageByodShow = false;
                            if (value.DocTypeID) {
                                $rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString()
                                setTimeout(function () {
                                    $(".select").select2();
                                    $('.select').trigger('change');
                                }, 400);
                            }
                            $scope.bindImage(imgName);
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.cAddressVcipView = true;
                            $scope.cAddressUpdt = false;
                        }
                    }

                    if (value.ImageName == "CORRESPONDENCEADDRESS2") {
                        $scope.cAddress2View = false;
                        $scope.cAddressUpdt2 = false;
                        $scope.BYODcAddressUpdt2 = false;
                        $scope.CorressimageByodShow = true;
                        if (value.ImageFlag == 'Y') {
                            $scope.cAddress2View = true;
                            $scope.cAddressUpdt2 = true;
                            $scope.BYODcAddressUpdt2 = true;
                            $scope.CorressimageByodShow = false;
                            $scope.bindImage("CorrespondenceAddress2");
                        } else if (value.ImageFlag == 'N' && $rootScope.formData.digiData) {
                            $rootScope.digiProofenable = true
                        }
                    }

                    if (value.ImageName == "PDocumentImage") {
                        $scope.pAddressView = false;
                        $scope.pAddressUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.pAddressView = true;
                            $scope.pAddressUpdt = true;
                            if (value.DocTypeID) {
                                $rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString()
                                setTimeout(function () {
                                    $(".select").select2();
                                    $('.select').trigger('change');
                                }, 400);
                            }
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.pAddressVcipView = true;
                            $scope.pAddressUpdt = false;
                        }
                    }

                    if (value.ImageName == "PERMENANTADDRESS2") {
                        $scope.pAddress2View = false;
                        $scope.pAddressUpdt2 = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.pAddress2View = true;
                            $scope.pAddressUpdt2 = true;
                        }
                    }

                    if (value.ImageName == "INCOME") {
                        $scope.foView = false;
                        $scope.foUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.foView = true;
                            $scope.foUpdt = true;
                            $scope.incomeimageByodShow = false;
                            if (value.DocTypeID) {
                                $rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString()
                                setTimeout(function () {
                                    $(".select").select2();
                                    $('.select').trigger('change');
                                }, 400);

                            }
                        } else if ($rootScope.vcip && !$scope.vcipOTP) {
                            $scope.foVcipView = true;
                            $scope.foUpdt = false;
                        }
                    }

                    if (value.ImageName == "CMLDOCUMENT") {
                        $scope.cmlView = false;
                        $scope.cmlUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.cmlView = true;
                            $scope.cmlUpdt = true;
                        }
                    }

                    if (value.ImageName == "Additionaldoc1") {
                        $scope.adl1View = false;
                        $scope.adocUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.adl1View = true;
                            $scope.adocUpdt = true;
                        }
                    }

                    if (value.ImageName == "Additionaldoc2") {
                        $scope.adl2View = false;
                        $scope.adocUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.adl2View = true;
                            $scope.adocUpdt = true;
                        }
                    }

                    if (value.ImageName == "Additionaldoc3") {
                        $scope.adl3View = false;
                        $scope.adocUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.adlView = true;
                            $scope.adocUpdt = true;
                        }
                    }

                    if (value.ImageName == "Additionaldoc3") {
                        $scope.adl3View = false;
                        $scope.adocUpdt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.adlView = true;
                            $scope.adocUpdt = true;
                        }
                    }

                    if (value.ImageName == "NOMINEE1") {
                        $scope.no1View = false;
                        $scope.nominee1Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.no1View = true;
                            $scope.nominee1Updt = true;
                        }
                    }

                    if (value.ImageName == "NOMINEE2") {
                        $scope.no2View = false;
                        $scope.nominee2Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.no2View = true;
                            $scope.nominee2Updt = true;
                        }
                    }

                    if (value.ImageName == "NOMINEE3") {
                        $scope.no3View = false;
                        $scope.nominee3Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.no3View = true;
                            $scope.nominee3Updt = true;
                        }
                    }

                    if (value.ImageName == "GUARDIAN1") {
                        $scope.gu1View = false;
                        $scope.guardian1Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.gu1View = true;
                            $scope.guardian1Updt = true;
                        }
                    }

                    if (value.ImageName == "GUARDIAN2") {
                        $scope.gu2View = false;
                        $scope.guardian2Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.gu2View = true;
                            $scope.guardian2Updt = true;
                        }
                    }

                    if (value.ImageName == "GUARDIAN3") {
                        $scope.gu3View = false;
                        $scope.guardian3Updt = false;
                        if (value.ImageFlag == 'Y') {
                            $scope.gu3View = true;
                            $scope.guardian3Updt = true;
                        }
                    }
                });
                // $scope.overallApi();
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }

            //$rootScope.formData.apiLoading = false;

            /*  if (num == 6) {
            $('#agree-terms').prop('checked', true);
            $rootScope.formData.fields.termsAccept = true;
            $scope.termsError = false;
            setTimeout(function (){

            $('label.agreeTerms input[type="checkbox"]').on("ifChecked", function (){
            $rootScope.formData.fields.termsAccept = true;
            $scope.termsError = false;
            $scope.$apply();
            }).on("ifUnchecked", function (){
            $rootScope.formData.fields.termsAccept = false;
            $scope.$apply();
            });

            }, 10)
            };*/
        });

    }
    $scope.getImages();
    $scope.bindImage = function (img) {
        if (img == "BankCheque") {
            img = "CheckImage";
        }
        var s_url = "DIYGetImagebyRefNum";
        //var s_url = "DIYGetImagebyRefNumS3";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            IsDiy: true,
            ImageName: img
        }
        var num = 0;
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            $rootScope.formData.apiLoading = false;
            var response = a.data;
            if (response.IsSuccess) {
                $rootScope.IPVRedirectURL = response.IpvURLEncode;

                angular.forEach(response.IpvPOAandNomineeList, function (value, key) {
                    if (value.ImageName == "Aadhar Service Image" && value.ImageUrl != null && value.ImageUrl != '') {
                        $scope.aadharImage = value.ImageUrl;
                        $scope.getAadharImage = false;
                    } else {
                        $scope.getAadharImage = true;
                    }
                    if (value.ImageName == "Aadhar" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.aadharUrl = value.ImageUrl;

                        $('.aadhar-img .file-input').empty();
                        $('.aadhar-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="Aadhar" onchange="imgUpld(\'Aadhar\');"></div></div></div>')
                        $('#aadharImage .file-input').empty();
                        $('#aadharImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="Aadhar" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title=""></div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.aadharImageUpdt = true;
                        $scope.aadharImg_reShow = true;
                        $rootScope.formData.aadharImage = value.ImageUrl;
                        num++;
                    }

                    if (value.ImageName == "CLIENTPHOTO" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.photoUrl = value.ImageUrl;

                        $('.client-photo .file-input').empty();
                        $('.client-photo .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ClientPhoto" onchange="imgUpld(\'ClientPhoto\');"></div></div></div>')
                        $('#clientImage .file-input').empty();
                        $('#clientImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
                        $scope.photoImageUpdt = true;
                        $scope.photoImg_reShow = true;
                        $scope.clientViewHide = true;
                        $scope.photoView = false;
                        $rootScope.formData.photoImage = value.ImageUrl;
                        if (value.IsSelfi == 'Y') {
                            $scope.selfTrue = true;
                        }

                        //$scope.takeSelfieDisabled = false;

                        if ($rootScope.formData.isMobile) {
                            $('.clientPhoto button').remove()
                            $('.clientPhoto .file-drop-disabled').remove()
                        }

                        num++;
                    } else if (value.ImageName == "CLIENTPHOTO" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.photoImageUpdt = false;
                    }
                    if (value.ImageName == "PANImage" && value.ImageUrl != null && value.ImageUrl != '') {
                        $scope.panimageShows = true;
                        $rootScope.formData.panUrl = value.ImageUrl;
                        $rootScope.formData.panUrl = value.ImageUrl;
                        var fileamesplit = value.ImageUrl.split('\\')
                        $scope.corres1ImagePath = fileamesplit[fileamesplit.length - 1]
                        setTimeout(function () {
                            $('#panCimage1').empty();
                            $('#panCimage1').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.corres1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative corrsimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="PANNumber" onchange="imgUpld(\'PANNumber\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.panUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                            if ($scope.corrsimg2DelHide) {
                                console.log($scope.corrsimg2DelHide)
                                $('.corrsimg2DelHide').hide()
                            }

                        }, 100)

                        // $('.pan-img .file-input').empty();

                        // if (!$rootScope.formData.digiData) {
                        //     $('.pan-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PANNumber" onchange="imgUpld(\'PANNumber\');"></div></div></div>');
                        // }

                        // $('#panPhoto .file-input').empty();
                        // $('#panPhoto').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        // $rootScope.formData.panImage = value.ImageUrl;
                        $scope.panImageUpdt = true;
                        // $scope.panImg_reShow = true;
                        // $scope.panView = false;
                        // $scope.panViewHide = true;
                        if (value.IsCheckImage) {
                            $scope.checkImage = true;
                        } else {
                            $scope.checkImage = false;
                        }
                        num++;
                    } else if (value.ImageName == "PANImage" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.panImageUpdt = false;
                        $scope.panimageShows = false;
                    }

                    if (value.ImageName == "DocumentImage" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
                        $rootScope.formData.caUrl = value.ImageUrl;
                        $scope.Coress1imageShows = true;
                        var fileamesplit = value.ImageUrl.split('\\')
                        $scope.coress1ImagePath = fileamesplit[fileamesplit.length - 1]
                        setTimeout(function () {
                            $('#Coress1Cimage').empty();
                            $('#Coress1Cimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.coress1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="CorrespondenceAddress" onchange="imgUpld(\'CorrespondenceAddress\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.caUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                            if ($scope.Coreess1img2DelHide) {
                                console.log($scope.Coreess1img2DelHide)
                                $('.Coreess1img2DelHide').hide()
                            }

                        }, 100)


                        $rootScope.formData.caImage = value.ImageUrl;
                        $scope.cAddressUpdt = true;
                        $scope.caImg_reShow = true;
                        $scope.addressName = "CorrespondenceAddress";
                        $scope.caViewHide = true;
                        $scope.cAddressView = false;
                        $rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
                        num++;
                    } else if (value.ImageName == "DocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.cAddressUpdt = false;
                        $scope.Coress1imageShows = false;
                    }

                    if (value.ImageName == "CORRESPONDENCEADDRESS2" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
                        $rootScope.formData.caUrl2 = value.ImageUrl;
                        $scope.Coress2imageShows = true;
                        var fileamesplit = value.ImageUrl.split('\\')
                        $scope.coress2ImagePath = fileamesplit[fileamesplit.length - 1]
                        setTimeout(function () {
                            $('#Coress2Cimage').empty();
                            $('#Coress2Cimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.coress2ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.caUrl2 + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                            if ($scope.Coreess1img3DelHide) {
                                console.log($scope.Coreess1img3DelHide)
                                $('.Coreess2img2DelHide').hide()
                            }

                        }, 100)
                        // $('.c-adr2 .file-input').empty().addClass('file-input-new');
                        // $('.c-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div></div></div>')
                        // $('#cAddressImage2 .file-input').empty().removeClass('file-input-new'); ;
                        // $('#cAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.cAddressUpdt2 = true;
                        $scope.ca2Img_reShow = true;
                        $rootScope.formData.caImage2 = value.ImageUrl;
                        $rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
                        $scope.addressName1 = "CorrespondenceAddress2";
                        $scope.caddPage = true;
                        $scope.ca2ViewHide = true;
                        $scope.cAddress2View = false;
                    }

                    if (value.ImageName == "CheckImage" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.bankUrl = value.ImageUrl;
                        $scope.BankimageShows = true;
                        $rootScope.formData.baImage = value.ImageUrl;
                        var fileamesplit = value.ImageUrl.split('\\')
                        $scope.Bank1ImagePath = fileamesplit[fileamesplit.length - 1]
                        setTimeout(function () {
                            $('#bankCimage').empty();
                            $('#bankCimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.Bank1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="BankCheque" onchange="imgUpld(\'BankCheque\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.baImage + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                            if ($scope.bankimg2DelHide) {
                                console.log($scope.bankimg2DelHide)
                                $('.bankimg2DelHide').hide()
                            }

                        }, 100)
                        $rootScope.formData.bankUrl = value.ImageUrl;
                        // $('.bank-img .file-input').empty();
                        // $('.bank-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="BankCheque" onchange="imgUpld(\'BankCheque\');"></div></div></div>');
                        // $('#bankImage .file-input').empty();
                        // $('#bankImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.bankUpdt = true;
                        // $rootScope.formData.baImage = value.ImageUrl;
                        // $scope.chqImg_reShow = true;
                        // $scope.chequeViewHide = true;
                        // $scope.bankView = false;
                        num++;
                    } else if (value.ImageName == "CheckImage" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.bankUpdt = false;
                        $scope.BankimageShows = false;
                    }

                    if (value.ImageName == "PDocumentImage" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
                        $rootScope.formData.paUrl = value.ImageUrl;
                        $('.p-adr .file-input').empty();
                        $('.p-adr .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PermenantAddress" onchange="imgUpld(\'PermenantAddress\');"></div></div></div>');
                        $('#pAddressImage .file-input').empty();
                        $('#pAddressImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.pAddressUpdt = true;
                        $rootScope.formData.paImage = value.ImageUrl;
                        $scope.permaddressName = 'PERMENANTADDRESS';
                        $scope.paImg_reShow = true;
                        $scope.paViewHide = true;
                        $scope.pAddressView = false;
                        $rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString();
                        num++;
                    } else if (value.ImageName == "PDocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.pAddressUpdt = false;
                    }

                    if (value.ImageName == "PERMENANTADDRESS2" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
                        $rootScope.formData.paUrl2 = value.ImageUrl;
                        $('.p-adr2 .file-input').empty().addClass('file-input-new');
                        $('.p-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
                        $('#pAddressImage2 .file-input').empty();
                        $('#pAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.pAddressUpdt2 = true;
                        $rootScope.formData.paImage2 = value.ImageUrl;
                        $scope.permaddressName1 = 'PERMENANTADDRESS2';
                        $scope.pa2Img_reShow = true;
                        $scope.paddPage = true;
                        $scope.pa2ViewHide = true;
                        $scope.pAddress2View = false;
                    }

                    if (value.ImageName == "Specimen" && value.ImageUrl != null && value.ImageUrl != '') {
                        $scope.SignimageShows = true;
                        $scope.signatureimg = true;
                        $rootScope.formData.signatureUrl = value.ImageUrl;
                        var fileamesplit = value.ImageUrl.split('\\')
                        $scope.Sign1ImagePath = fileamesplit[fileamesplit.length - 1]
                        setTimeout(function () {
                            $('#SpecimenCimage').empty();
                            $('#SpecimenCimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.Sign1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="SPECIMENPROOF" onchange="imgUpld(\'SPECIMENPROOF\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.signatureUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                            if ($scope.signimg2DelHide) {
                                console.log($scope.signimg2DelHide)
                                $('.signimg2DelHide').hide()
                            }

                        }, 100)
                        $rootScope.formData.signatureUrl = value.ImageUrl;

                        // $('.signature-img .file-input').empty();
                        // $('.signature-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="SPECIMENPROOF" onchange="imgUpld(\'SPECIMENPROOF\');"></div></div></div>');
                        // $('#clientSignature .file-input').empty();
                        // $('#clientSignature').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.signatureUpdt = true;
                        // $scope.signatureName = 'SPECIMENPROOF';
                        // $rootScope.formData.signatureImage = value.ImageUrl;
                        // $scope.signatureImg_reShow = true;
                        // $scope.signatureViewHide = true;
                        // $scope.signView = false;
                        num++;
                    } else if (value.ImageName == "Specimen" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.signatureUpdt = false;
                        $scope.SignimageShows = false;
                        $scope.signatureimg = false;

                    }

                    if (value.ImageName == "INCOME" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.foUrl = value.ImageUrl;
                        if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
                            // $('.income-img .file-input').empty();
                            // $('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
                            // $('#incomeImage .file-input').empty();
                            // $('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
                            $scope.incomeimageShows = true;
                            $scope.incomeimageByodShow = false;
                            $rootScope.formData.foImage = value.ImageUrl;
                            var fileamesplit = value.ImageUrl.split('\\')
                            $scope.income1ImagePath = fileamesplit[fileamesplit.length - 1]
                            setTimeout(function () {
                                $('#income1Cimage').empty();
                                $('#income1Cimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.income1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="Income" onchange="imgUpld(\'Income\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.signatureUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                                if ($scope.incomeimg2DelHide) {
                                    console.log($scope.incomeimg2DelHide)
                                    $('.incomeimg2DelHide').hide()
                                }

                            }, 100)
                        } else {
                            $scope.incomeimageShows = true;
                            $scope.incomeimageByodShow = false;
                            $rootScope.formData.foImage = value.ImageUrl;
                            var fileamesplit = value.ImageUrl.split('\\')
                            $scope.income1ImagePath = fileamesplit[fileamesplit.length - 1]
                            setTimeout(function () {
                                $('#income1Cimage').empty();
                                $('#income1Cimage').html('<div class="uploadeddImages d-flex align-items-center justify-content-between w-100"><div class="d-flex align-items-center justify-content-center" style="height:140px;width:100%"><img src=' + 'data:image/jpeg;base64,' + $scope.income1ImagePath + ' class="img-fluid" style="height:140px;width:100%"></div><div class="ml-auto coreszoomitems d-flex position-absolute " style="right:5px;bottom:5px"><div class="mx-3 position-relative signimg2DelHide" data-bs-toggle="tooltip" title="Change"><img src="assets/images/fileupload.png" class="img-fluid rounded-circle p-2 bg-white"/><input type="file" accept="image/*" class="input-upload panCImages" id="Income" onchange="imgUpld(\'Income\');" /></div><span data-bs-toggle="tooltip" title="View"><img src="assets/images/vuesax-bulk-frame.svg" onclick="setUrl(\'' + $rootScope.formData.signatureUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"  class="img-fluid rounded-circle p-2 bg-white" /></span></div></div>');
                                if ($scope.incomeimg2DelHide) {
                                    console.log($scope.incomeimg2DelHide)
                                    $('.incomeimg2DelHide').hide()
                                }

                            }, 100)

                        }
                        $scope.foUpdt = true;
                        $scope.foName = 'Income';
                        $scope.foImg_reShow = true;
                        $scope.foViewHide = true;
                        $scope.foView = false;
                        $rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString();
                        num++;
                    } else if (value.ImageName == "INCOME" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.foUpdt = false;
                        $scope.incomeimageShows = false;
                        $scope.incomeimageByodShow = true;
                    }

                    if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nomineeUrl = value.ImageUrl;

                        if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
                            $('.cml-img .file-input').empty();
                            $('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
                            $('#cmlImage .file-input').empty();
                            $('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        } else {

                            $('.cml-img .file-input').empty();
                            $('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
                            $('#cmlImage .file-input').empty();
                            $('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
                        }
                        $scope.cmlUpdt = true;
                        $rootScope.formData.cmlImage = value.ImageUrl;
                        $scope.cmlImg_reShow = true;
                        $scope.cmlViewHide = true;
                        $scope.cmlView = false;
                        num++;
                    } else if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl == null && value.ImageUrl == '') {
                        $scope.cmlUpdt = false;
                    }

                    if (value.ImageName == "Additionaldoc1" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nomineeUrl = value.ImageUrl;

                        $('.adoc1-img .file-input').empty();
                        $('.adoc1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC1" onchange="imgUpld(\'ADDITIONALDOC1\');"></div></div></div>');
                        $('#ADDITIONALDOC1IMAGE .file-input').empty();
                        $('#ADDITIONALDOC1IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.adocUpdt = true;
                        $rootScope.formData.adocImage = value.ImageUrl;
                        $scope.adocImg_reShow = true;
                        $scope.ad1ViewHide = true;
                        $scope.adl1View = false;
                        num++;
                    }

                    if (value.ImageName == "Additionaldoc2" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nomineeUrl = value.ImageUrl;

                        $('.adoc2-img .file-input').empty();
                        $('.adoc2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC2" onchange="imgUpld(\'ADDITIONALDOC2\');"></div></div></div>');
                        $('#ADDITIONALDOC2IMAGE .file-input').empty();
                        $('#ADDITIONALDOC2IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
                        $scope.adocaddPage2 = true;
                        $scope.adocUpdt = true;
                        $rootScope.formData.adoc2Image = value.ImageUrl;
                        $scope.adoc2Img_reShow = true;
                        $scope.ad2ViewHide = true;
                        $scope.adl2View = false;
                        num++;
                    }

                    if (value.ImageName == "Additionaldoc3" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nomineeUrl = value.ImageUrl;

                        $('.adoc3-img .file-input').empty();
                        $('.adoc3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC3" onchange="imgUpld(\'ADDITIONALDOC3\');"></div></div></div>');
                        $('#ADDITIONALDOC3IMAGE .file-input').empty();
                        $('#ADDITIONALDOC3IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
                        $scope.adocaddPage3 = true;
                        $scope.adocUpdt = true;
                        $rootScope.formData.adoc3Image = value.ImageUrl;
                        $scope.adoc3Img_reShow = true;
                        $scope.ad3ViewHide = true;
                        $scope.adl3View = false;
                        num++;
                    }

                    if (value.ImageName == "NOMINEE1" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nominee1Url = value.ImageUrl;

                        $('.nominee1-img .file-input').empty();
                        $('.nominee1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE1" onchange="imgUpld(\'NOMINEE1\');"></div></div></div>');
                        $('#NOMINEE1PROOFIMAGE .file-input').empty();
                        $('#NOMINEE1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.nominee1Updt = true;
                        $rootScope.formData.nominee1Image = value.ImageUrl;
                        $scope.nominee1Img_reShow = true;
                        $scope.nmViewHide = true;
                        $scope.no1View = false;
                        num++;
                    }
                    if (value.ImageName == "NOMINEE2" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nominee2Url = value.ImageUrl;

                        $('.nominee2-img .file-input').empty();
                        $('.nominee2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
                        $('#NOMINEE2PROOFIMAGE .file-input').empty();
                        $('#NOMINEE2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.nominee2Updt = true;
                        $rootScope.formData.nominee2Image = value.ImageUrl;
                        $scope.nominee2Img_reShow = true;
                        $scope.nm2ViewHide = true;
                        $scope.no2View = false;
                        num++;
                    }
                    if (value.ImageName == "NOMINEE3" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.nominee3Url = value.ImageUrl;

                        $('.nominee3-img .file-input').empty();
                        $('.nominee3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
                        $('#NOMINEE3PROOFIMAGE .file-input').empty();
                        $('#NOMINEE3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.nominee3Updt = true;
                        $rootScope.formData.nominee3Image = value.ImageUrl;
                        $scope.nominee3Img_reShow = true;
                        $scope.nm3ViewHide = true;
                        $scope.no3View = false;
                        num++;
                    }
                    if (value.ImageName == "GUARDIAN1" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.guardian1Url = value.ImageUrl;

                        $('.guardian1-img .file-input').empty();
                        $('.guardian1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN1" onchange="imgUpld(\'GUARDIAN1\');"></div></div></div>');
                        $('#GUARDIAN1PROOFIMAGE .file-input').empty();
                        $('#GUARDIAN1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.guardian1Updt = true;
                        $rootScope.formData.guardian1Image = value.ImageUrl;
                        $scope.guardian1Img_reShow = true;
                        $scope.guViewHide = true;
                        $scope.gu1View = false;
                        num++;
                    }
                    if (value.ImageName == "GUARDIAN2" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.guardian2Url = value.ImageUrl;

                        $('.guardian2-img .file-input').empty();
                        $('.guardian2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN2" onchange="imgUpld(\'GUARDIAN2\');"></div></div></div>');
                        $('#GUARDIAN2PROOFIMAGE .file-input').empty();
                        $('#GUARDIAN2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.guardian2Updt = true;
                        $rootScope.formData.guardian2Image = value.ImageUrl;
                        $scope.guardian2Img_reShow = true;
                        $scope.gu2ViewHide = true;
                        $scope.gu2View = false;
                        num++;
                    }
                    if (value.ImageName == "GUARDIAN3" && value.ImageUrl != null && value.ImageUrl != '') {
                        $rootScope.formData.guardian2Url = value.ImageUrl;

                        $('.guardian3-img .file-input').empty();
                        $('.guardian3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN3" onchange="imgUpld(\'GUARDIAN3\');"></div></div></div>');
                        $('#GUARDIAN3PROOFIMAGE .file-input').empty();
                        $('#GUARDIAN3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

                        $scope.guardian3Updt = true;
                        $rootScope.formData.guardian3Image = value.ImageUrl;
                        $scope.guardian3Img_reShow = true;
                        $scope.gu3ViewHide = true;
                        $scope.gu3View = false;
                        num++;
                    }

                    //$scope.showView = false;
                    $('.file-input .file-preview').css('display', 'block');

                    setTimeout(function () {
                        $(".select").select2();
                    }, 1000);
                });
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }
        })
    }
    $scope.derivativesAll = function () {
        if ($('#derivativesAll').is(':checked')) {
            $("input[type=checkbox][name=derivatives]").prop('checked', true);
            $scope.derivativesDisable = false;
            $scope.derivativesSelect = true;
            var dModal = new bootstrap.Modal(document.getElementById('dmodal'), {
                backdrop: 'static',
                keyboard: false
            });
            dModal.show();

        } else {
            $("input[type=checkbox][name=derivatives]").prop('checked', false);
            $scope.derivativesDisable = true;
            $scope.derivativesSelect = false;
        }
    }
    $scope.derivatives = function () {
        if ($("input[type='checkbox'][name='derivatives']:checked").length == 0) {
            $('#derivativesAll').prop('checked', false)
            $scope.derivativesDisable = true;
            $scope.derivativesSelect = false;
        } else {
            $scope.derivativesDisable = false;
        }
    }
    $scope.declineDModal = function () {
        $('#derivativesAll').prop('checked', false);
        $('#equityderivatives').prop('checked', false);
        $('#commodityderivatives').prop('checked', false);
        $('#currency').prop('checked', false);
        $scope.derivativesDisable = true;
        $('#dmodal').modal('hide');
    }
    document.addEventListener('DOMContentLoaded', function () {

    });
    $scope.getToken = function () {
        var url = "GetEncrptToken";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber
        }

        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
            var res = a.data;
            $rootScope.formData.apiLoading = false;
            $rootScope.token = res.EncryptToken;
            $rootScope.formData.apiLoading = false;
            if ($rootScope.vcip && sessionStorage.getItem('reusmeOTPVerified') && sessionStorage.getItem('reusmeOTPVerified') == 'verified') {
                $scope.displayForm();
                $window.sessionStorage.clear();
            }
        });
    }
    $scope.getToken()
    // product
    $scope.getProductInfo = function () {
        //if (!$rootScope.getAPI || !$rootScope.formData.assistedLGCode || !$rootScope.formData.assistedLCCode) {
        if (!$rootScope.getAPI || $rootScope.getAPI) {
            $rootScope.formData.apiLoading = true;

            var s_url = "DIYGetProductInfoByReferenceNumber";
            var sendData = {
                ReferenceNumber: $rootScope.formData.eRefNumber,
                IsDiy: true,
                EncryptToken: $rootScope.EncryptToken
            }
            serverService.apiCall(s_url, sendData).then(function (a) {
                var response = a.data;
                $rootScope.formData.apiLoading = false;
                /* $rootScope.overallApi(); */

                $('#equity').prop('checked', true);
                $('#mutualfunds').prop('checked', true);
                if (response.EncryptToken) {
                    $rootScope.EncryptToken = response.EncryptToken;
                    sessionStorage.setItem('AxToken', response.EncryptToken);
                } else {
                    if ($rootScope.formData.tokenValidation) {
                        $rootScope.clearBrowsingData();
                        var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        APIResponseModal.show();
                        $rootScope.apiResponseErrorMsg = "Session Timed Out";
                        return false;
                    }
                }
                if (response.IsSuccess) {
                    sessionStorage.setItem('ProductId', response.ObjCDIYProduct.ProductId);
                    if ($scope.planList) {
                        for (var j = 0; j < $scope.planList.length; j++) {
                            if ($scope.planList[j].ProductId == response.ObjCDIYProduct.ProductId) {
                                $scope.prdExists = true;
                                if (response.ObjCDIYProduct.TotalPayableAmount != 0 && !($scope.planList[j].IswaivedOff) && !$scope.planList[j].Isfreedomplan) {
                                    $scope.iszeropayment = false;
                                }
                            }
                        }
                    }
                    if (!response.ObjCDIYProduct.AssistLGCode) {
                        $scope.BYODPlanStage = true;
                    }

                    $rootScope.formData.assistedLGCode = response.ObjCDIYProduct.AssistLGCode;

                    $rootScope.formData.assistedLCCode = response.ObjCDIYProduct.AssistLCCode;
                    $rootScope.formData.referralCode = response.ObjCDIYProduct.ReferralCode;
                    $scope.getProductDetails = true;
                    if (response.ObjCDIYProduct.TotalPayableAmount == 0 || response.ObjCDIYProduct.OriginalPaymentStatus == "Y") {
                        $rootScope.amountPayable = false;
                        $rootScope.formData.makePayment = false;
                    } else {
                        $rootScope.amountPayable = true;
                        $rootScope.formData.makePayment = true;
                    }
                    if ($rootScope.formData.assistedLGCode) {
                        $scope.freezeLG = true;
                    }
                    if ($rootScope.formData.assistedLCCode) {
                        $scope.freezeLC = true;
                    }
                    if (sessionStorage.getItem('utm_promoCode')) {
                        $rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode')
                        $scope.promoDisabled = true;
                    } else {
                        if (response.ObjCDIYProduct.PromoCode) {
                            $rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;
                        }
                        if ($rootScope.webfinacle && ($scope.paymentProductId == $scope.responseProductId)) {
                            $scope.appliedPromo = true;

                        }
                    }
                    if ($rootScope.siddhiApp) {
                        $scope.appliedPromo = true;
                    }
                    if (response.ObjCDIYProduct.PromoCode) {
                        $rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;
                    }
                    if (response.ObjCDIYProduct.PromoCode) {
                        $scope.promoDone = true;
                    }
                    if (response.ObjCDIYProduct.BSEEquityFandO == 'Y' || response.ObjCDIYProduct.NSEEquityFandO == 'Y') {
                        $('#equityderivatives').prop('checked', true);
                        $('#derivativesAll').prop('checked', true);
                        $scope.derivativesSelect = true;
                    }

                    //Currency Derivatives
                    if (response.ObjCDIYProduct.NSECurrencyFandO == 'Y' || response.ObjCDIYProduct.BSECurrencyFandO == 'Y') {
                        $('#currency').prop('checked', true);
                        $('#derivativesAll').prop('checked', true);
                        $scope.derivativesSelect = true;
                    }

                    //Commodity
                    if (response.ObjCDIYProduct.MCXCommodity == 'Y' || response.ObjCDIYProduct.NCDXCommodity == 'Y') {
                        $('#commodityderivatives').prop('checked', true);
                        $('#derivativesAll').prop('checked', true);
                        $scope.derivativesSelect = true;
                    }

                    if (response.ObjCDIYProduct.SLB == 'Y') {
                        $('#slb').prop('checked', true);
                        $scope.slb = 'Y';
                        $rootScope.SLBsuccess = true;
                    } else {
                        $('#slb').prop('checked', false);
                        $scope.slb = 'N';
                        $rootScope.SLBsuccess = false;
                    }

                    //Investment Products
                    if (response.ObjCDIYProduct.BSEMutualFunds == 'Y' || response.ObjCDIYProduct.NSEMutualFunds == 'Y') {
                        $('#mutualfunds').prop('checked', true);
                    } else {
                        $('#mutualfunds').prop('checked', false);
                    }
                    if (response.ObjCDIYProduct.DematType == 'CDSL') {
                        $('#cdsl').prop('checked', true);
                        $('#nsdl').prop('checked', false);
                    }

                    if (response.ObjCDIYProduct.DematType == 'NSDL') {
                        $('#cdsl').prop('checked', false);
                        $('#nsdl').prop('checked', true);
                    }

                    $scope.productDemat = response.ObjCDIYProduct.DematType;
                    $rootScope.formData.bankDpNumber = response.ObjCDIYProduct.BankID;
                    $rootScope.formData.dpNumber = response.ObjCDIYProduct.DpId;

                    if ($rootScope.formData.bankDpNumber || $rootScope.formData.dpNumber) {
                        $scope.dpBank = true;
                        $scope.bankDp = "Y";
                    }

                    if (response.ObjCDIYProduct.AssistLGCode != "" && response.ObjCDIYProduct.AssistLGCode != null &&
                        $rootScope.formData.assistedLCCode != "" && $rootScope.formData.assistedLCCode != null) {
                        $rootScope.formData.assistedLGCode = response.ObjCDIYProduct.AssistLGCode;
                        $rootScope.formData.assistedLCCode = response.ObjCDIYProduct.AssistLCCode;
                    }
                    if (response.ObjCDIYProduct.ProductId) {
                        var productId = "";
                        productId = response.ObjCDIYProduct.ProductId;
                        $scope.prodIdfree = response.ObjCDIYProduct.ProductId;
                        $scope.responseProductId = response.ObjCDIYProduct.ProductId;
                        $scope.selectedProductID = response.ObjCDIYProduct.ProductId;
                        $scope.PlanEditable = response.ObjCDIYProduct.PlanEditable;
                        if (($rootScope.formData.isPaymentCompleted || $rootScope.formData.productApproved) && !$scope.PlanEditable) {
                            //$('input[type=checkbox]').prop('disabled', true);
                            $scope.derivativesDisable = true;
                            //$('.account-plan-container input').prop('disabled', true);
                            $scope.disableAll = true;
                            $scope.promoDisabled = true;
                        }
                        if ($scope.PlanEditable) {
                            $scope.promoDone = true;
                            $scope.hidePromo = false;
                        }
                        if (!$scope.prdExists) {
                            $('.owl-carousel').trigger('destroy.owl.carousel');
                            $('.owl-carousel').find('.owl-stage-outer').html();
                            $('.owl-carousel').removeClass('owl-loaded');
                            $scope.planList = [];
                            var url = "GetALLPlanByBusinessType";
                            var sendData = {
                                ReferenceNumber: $rootScope.formData.eRefNumber,
                                BusinessType: "BYOD",
                                Mode: "W",
                                SiddhiApp: $rootScope.siddhiApp,
                            }
                            serverService.apiCall(url, sendData).then(function (a) {
                                var response = a.data;
                                $rootScope.formData.apiLoading = false;
                                $scope.allPlanList = response;

                                if (response) {
                                    if (response.length > 0) {
                                        $scope.planList[0] = $scope.allPlanList[0];
                                        if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
                                            $scope.iszeropayment = true;
                                            if ($scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
                                                $scope.hidePromo = true;
                                                $scope.IswaivedOff = true;
                                            }
                                            if ($scope.allPlanList[0].Isfreedomplan) {
                                                $scope.freedomPlan = true;
                                            } else {
                                                $scope.freedomPlan = false;
                                            }
                                        } else {
                                            $scope.iszeropayment = false;
                                        }
                                        if ($scope.planList[0].ProductUIType == 1) {
                                            $scope.productAction = false;
                                        } else {
                                            $scope.productAction = true;
                                        }
                                        setTimeout(function () {
                                            $scope.owlSet();
                                        }, 500)
                                        $scope.utmHide = false;
                                        $scope.productSelect($scope.defaultPlanId);
                                        //	$scope.productSelect($scope.responseProductId);
                                    }
                                }
                            });

                        } else {
                            $scope.productSelect($scope.defaultPlanId);
                            //$scope.productSelect($scope.responseProductId);
                        }
                    }

                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                    $rootScope.formData.apiLoading = false;
                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    paninformation.show();
                    return
                } else {
                    if (!$scope.defaultPlan && $scope.dpProductId) {
                        $scope.productSelect($scope.dpProductId);
                        if ($scope.utmPromo) {
                            setTimeout(function () {
                                $scope.applyPromo();
                            }, 500)
                        }
                    } else if ($scope.defaultPlanId) {
                        $scope.productSelect($scope.defaultPlanId);

                        if ($scope.utmPromo) {
                            setTimeout(function () {
                                $scope.applyPromo();
                            }, 500)
                        }

                    } else {
                        $scope.productSelect($scope.planList[0].ProductId);
                        if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
                            $scope.iszeropayment = true;
                            if ($scope.allPlanList[0].IswaivedOff) {
                                $scope.hidePromo = true;
                                $scope.IswaivedOff = true;
                            }
                        } else {
                            $scope.iszeropayment = false;
                        }
                    }

                }
            });
        }
        // else {
        // 	if (!$scope.defaultPlan && $scope.dpProductId) {
        // 		$scope.productSelect($scope.dpProductId);
        // 		if ($scope.utmPromo) {
        // 			setTimeout(function () {
        // 				$scope.applyPromo();
        // 			}, 500)
        // 		}
        // 	} else if ($scope.defaultPlanId) {
        // 		$scope.productSelect($scope.defaultPlanId);
        // 	} else {
        // 		$scope.productSelect($scope.planList[0].ProductId);
        // 		if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
        // 			$scope.iszeropayment = true;
        // 			if ($scope.allPlanList[0].IswaivedOff) {
        // 				$scope.hidePromo = true;
        // 				$scope.IswaivedOff = true;
        // 			}
        // 		} else {
        // 			$scope.iszeropayment = false;
        // 		}
        // 	}
        // }

    }
    /* var searchObject = $location.search();
    if (!angular.isUndefined(searchObject.Status)) {
        if (searchObject.Status === 'Success') {
            sessionStorage.removeItem('productStage');
            sessionStorage.setItem('isPaymentCompleted', true);
            $rootScope.formData.makePayment = false;
            dataLayer.push({
                "event": "payment-success",
                "unique-payment-id": $rootScope.formData.ReferenceNumber
            });
            $rootScope.formData.paymentPixel = true;
        } else {
            $rootScope.apiResponseErrorMsg = searchObject.Status;
        }
    } */
    $scope.prdSelect = function (i) {
        $scope.psArray = i;

        if ($scope.planList[i].TotalPayableAmount == 0 || !$scope.planList[i].TotalPayableAmount || $scope.planList[i].IswaivedOff || $scope.planList[i].Isfreedomplan) {
            $scope.iszeropayment = true;
        } else {
            $scope.iszeropayment = false;
        }
        if ($scope.planList[i].TotalPayableAmount == 0) {
            $rootScope.amountPayable = false;
            $rootScope.formData.makePayment = false;
        } else {
            $rootScope.amountPayable = true;
            $rootScope.formData.makePayment = true;
        }
        if (i == 0) {
            $scope.productAction = true;
            if ($rootScope.webfinacle && $scope.encPromo) {
                $scope.hidePromo = true;
                if ($scope.ibiszeropayment) {
                    $scope.iszeropayment = true;
                }
            } else {
                $scope.hidePromo = false;
            }
        } else {
            $scope.productAction = true;
            $scope.hidePromo = false;
        }

        if ($scope.planList[i].OpeningFee == 0 || !$scope.planList[i].OpeningFee) {
            $scope.hidePromo = true;
        } else {
            $scope.hidePromo = false;
        }
        if ($scope.planList[i].ProductUIType == 1) {
            $scope.productAction = false;
        } else {
            $scope.productAction = true;
        }
        $scope.promoSuccess = false;
        $scope.promoDone = false;
        $scope.promoFailed = false;
        $scope.selectedProductID = $scope.planList[i].ProductId;

        if ($scope.planList[i].Isfreedomplan) {
            $scope.freedomPlan = true;
            $scope.iszeropayment = true;
            $scope.hidePromo = true;
        } else {
            $scope.freedomPlan = false;
            $scope.hidePromo = false;
            $rootScope.formData.promoCode = '';
        }
        if ($scope.defaultPlanId == 150 && $rootScope.BYOD) {
            $rootScope.formData.promoCode = "BYOD";
        }
        if ($scope.planList[i].PlanName == "PROSPERITY") {
            $rootScope.formData.promoCode = $scope.encPromo;
            $scope.promoDone = true;
            $scope.hidePromo = true;
        }
        var PalnDetailsBYOD = new bootstrap.Modal(document.getElementById('PalnDetailsBYOD'), {
            backdrop: 'static',
            keyboard: false
        });
        PalnDetailsBYOD.show();
        //$scope.productSelect($scope.planList[i].ProductId);
    }
    $scope.productSelect = function (paymentType) {
        $scope.promoSuccess = false;
        $scope.promoDone = false;
        $scope.promoFailed = false;
        $scope.selectedProductID = paymentType;
        setTimeout(function () {
            $('input[name=axisDirect][value=' + paymentType + ']').prop('checked', true);
            var a = $('input[name=axisDirect]:checked').attr('id');
            if (a) {
                var b = a.split('-');
                var c = b[1];
                $('.owl-carousel').trigger('to.owl.carousel', c);

                $scope.psArray = c;

                if ($scope.planList[c].ProductUIType == 1) {
                    $scope.productAction = false;
                } else {
                    $scope.productAction = true;
                }
                if ($scope.planList[c].OpeningFee == 0 || !$scope.planList[c].OpeningFee || $scope.planList[c].Isfreedomplan) {
                    $scope.hidePromo = true;
                } else {
                    $scope.hidePromo = false;
                }
                if ($scope.planList[c].Isfreedomplan) {
                    $scope.freedomPlan = true;
                } else {
                    $scope.freedomPlan = false;
                }
                if ($scope.planList[c].PlanName == "PROSPERITY") {
                    $rootScope.formData.promoCode = $scope.encPromo;
                    $scope.promoDone = true;
                    $scope.hidePromo = true;
                }
                $scope.$apply();
            }
        }, 200)
    }

    $scope.ComfirmDocument = function () {
        var error = 0;
        if (!$scope.DisabilityVal) {
            $scope.DisabilityError = true;
            error++;
        } else {
            $scope.DisabilityError = false;
        }
        if ((!$scope.emailEmpty && !$scope.emailVerificationSend) || sessionStorage.getItem('changeNumber')) {
            $scope.byodErrorMessage = "Please Verify Your Email Before Complete Your Journey";
            $scope.ModalTrigger("byodModal", true);
            $scope.BYODPersonalStage = true;
            return;
        }

        if ((!$scope.emailEmpty && ($scope.emailVerificationSend || sessionStorage.getItem('byodemailverifylinksend'))) || sessionStorage.getItem('byodemailverifylinksend')) {
            $scope.byodErrorMessage = "Verification URL has been send to your Email Please Verify and Continue the Journey";
            $scope.ModalTrigger("byodModal", true);
            $scope.BYODPersonalStage = true;
            return;

        }

        if (sessionStorage.getItem('changeMobile')) {
            $scope.byodErrorMessage = "Please Verify the mobile number and Continue the Journey";
            $scope.ModalTrigger("byodModal", true);
            $scope.BYODPersonalStage = true;
            return;
        }
        if ($scope.BYODAddressStage) {
            var error = 0;
            var fields = $('#addressPost input, #addressPost select');
            fields.each(function () {
                var value = $(this).val().trim();
                if (value.length < 1) {

                    if (this.id != "inputuid" && this.id != "mmName" && this.id != "lmName" && this.id != "oaadhar-number" && this.id != "cadr3" && this.id != "padr2" && this.id != "padr3") {
                        var a = this.id + 'Error';
                        $scope[a] = true;
                        error++;
                        if (error == 1) {
                            $('#' + this.id).focus();
                        }
                    }
                } else {
                    var a = this.id + 'Error';
                    $scope[a] = false;
                }
                if (value.length < 6) {
                    if (this.id == "cPin_value" || this.id == "pPin_value") {
                        var a = this.id + 'Error';
                        $scope[a] = true;
                        error++;
                        if (this.id == "cPin_value") {
                            $('#' + this.id).focus();
                        }
                    }
                } else {
                    var a = this.id + 'Error';
                    $scope[a] = false;
                }

            });
            if ($rootScope.formData.city2_valueError) {
                $scope.city2_valueError = true;
                error++;
            }
            if ($rootScope.formData.city1_valueError) {
                $scope.city1_valueError = true;
                error++;
            }
            if ($('#city1_value').val() != "" && $('#city1_value').val() != undefined) {
                var notSpl = /^[A-Za-z0-9 ]+$/;
                if (notSpl.test($('#city1_value').val()) === false || $('#city1_value').val().length < 3) {
                    $scope.city1_lengthError = true;
                    error++;
                }
            }
            if ($('#city2_value').val() != "" && $('#city2_value').val() != undefined) {
                var notSpl = /^[A-Za-z0-9 ]+$/;
                if (notSpl.test($('#city2_value').val()) === false || $('#city2_value').val().length < 3) {
                    $scope.city2_lengthError = true;
                    error++;
                }

            }
            $scope.regex = /[^!@#$%&*^()+_:|/;"'><,?~]/i;

            if (!$scope.regex.test($rootScope.formData.fields.cAddress1)) {
                $scope.areaadd1Error = true;
                $('#areaadd1').focus();
                error++;
            } else {
                if ($rootScope.formData.fields.cAddress1) {
                    $scope.areaadd1Error = false;
                } else {
                    $scope.areaadd1Error = true;
                    $('#areaadd1').focus();
                    error++;
                }
            }
            if (error == 0) {

                $scope.addressSame = 0;

                var url = "DIYClientPersonalInfoProfile";
                if ($rootScope.formData.fields.sameAddress) {
                    $scope.addressSame = 1;
                    $rootScope.formData.fields.paddressType = $('#caddressType').val();
                    $rootScope.formData.fields.pStateName = $rootScope.formData.fields.cStateName;
                    $rootScope.formData.fields.pStateId = $rootScope.formData.fields.cStateId;
                    $rootScope.formData.fields.pDistrict = $rootScope.formData.fields.cDistrict;
                    $rootScope.formData.fields.pCity = $rootScope.formData.fields.cCity;
                    $rootScope.formData.fields.pAddress1 = $rootScope.formData.fields.cAddress1;
                    $rootScope.formData.fields.pAddress2 = $rootScope.formData.fields.cAddress2;
                    $rootScope.formData.fields.pAddress3 = $rootScope.formData.fields.cAddress3;
                    $rootScope.formData.fields.pPin = $rootScope.formData.fields.cPin;
                } else {
                    $rootScope.formData.fields.paddressType = $('#pAddressType').val();
                    $rootScope.formData.fields.pCity = $("#city2_value").val();
                }
                var sendData = {
                    ObjCDIYClientProfile: {
                        ClientInfoId: 1,
                        Title: '',
                        ClientPrefixID: $rootScope.formData.fields.title,
                        FirstName: $rootScope.formData.fields.firstName,
                        DigiReferenceNumber: tok,
                        Digilocker: $scope.digiStatus,
                        MiddleName: $rootScope.formData.fields.middleName,
                        LastName: $rootScope.formData.fields.lastName,
                        Mobile: $rootScope.formData.fields.mobile,
                        Email: $rootScope.formData.fields.email,
                        ReferenceNumber: "",
                        ReferenceNumberEnc: $rootScope.formData.eRefNumber,
                        CorrespondenceTypeID: $rootScope.formData.fields.cAddressType,
                        CAddressLine1: $rootScope.formData.fields.cAddress1,
                        CAddressLine2: $rootScope.formData.fields.cAddress2,
                        CAddressLine3: $rootScope.formData.fields.cAddress3,
                        CCity: $rootScope.formData.fields.cCity,
                        CDistrict: $rootScope.formData.fields.cDistrict,
                        CState: $rootScope.formData.fields.cStateName,
                        CStateID: !angular.isUndefined($rootScope.formData.fields.cStateId) ? $rootScope.formData.fields.cStateId : 0,
                        CCountry: 'INDIA',
                        CPinCode: $rootScope.formData.fields.cPin,
                        PermantTypeID: $rootScope.formData.fields.paddressType,
                        PAddressLine1: $rootScope.formData.fields.pAddress1,
                        PAddressLine2: $rootScope.formData.fields.pAddress2,
                        PAddressLine3: $rootScope.formData.fields.pAddress3,
                        PCity: $rootScope.formData.fields.pCity,
                        PDistrict: $rootScope.formData.fields.pDistrict,
                        PState: $rootScope.formData.fields.pStateName,
                        PStateID: !angular.isUndefined($rootScope.formData.fields.pStateId) ? $rootScope.formData.fields.pStateId : 0,
                        PCountry: 'INDIA',
                        PPinCode: $rootScope.formData.fields.pPin,
                        IsAadharUpdate: $rootScope.formData.IsAadharUpdate,
                        IsKRAUpdate: $rootScope.formData.IsKRAUpdate,
                        IsKRA: $rootScope.formData.IsKRA,
                        CKYCUpdate: $rootScope.formData.IsCKYCUpdate,
                        CKYCClient: $rootScope.formData.IsCKYC,
                        IsAadhar: $rootScope.formData.IsAadhar,
                        IsSamePermenantAddress: $scope.addressSame,
                        BrowserType: $rootScope.formData.browserType,
                        UID: $rootScope.formData.fields.aadharNumber,
                        AadharAuthorisation: $rootScope.formData.aadharAuthorize,
                        IsDiy: true,
                        EncryptToken: $rootScope.EncryptToken
                    }
                };
                $scope.cadr2Error = false;
                $scope.padr2Error = false;
                $scope.addshouldNotSame = false;
                $scope.addshouldNotSameP = false;
                $rootScope.formData.apiLoading = true;
                serverService.apiCall(url, sendData).then(function (a) {
                    var response = a.data;
                    $rootScope.formData.apiLoading = false;
                    if (response.EncryptToken) {
                        $rootScope.EncryptToken = response.EncryptToken;
                        sessionStorage.setItem('AxToken', response.EncryptToken);
                    } else {
                        if ($rootScope.formData.tokenValidation) {
                            $rootScope.clearBrowsingData();
                            var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                backdrop: 'static',
                                keyboard: false
                            });
                            APIResponseModal.show();
                            $rootScope.apiResponseErrorMsg = "Session Timed Out";
                            return false;
                        }
                    }

                    if (response.IsSuccess) {
                        $scope.BYODAddressStage = false;
                        $scope.BYODPersonalStage = true;
                        $('#collapseInfo').collapse('show');
                        $scope.getPersonalInfo();
                        $scope.overallApi();
                        $scope.maritalError1 = false;
                        if ($rootScope.formData.fields.marital == "" || $rootScope.formData.fields.marital == undefined || $rootScope.formData.fields.marital == null) {
                            $scope.maritalError1 = true;
                            $('#collapseInfo').collapse('show');
                            error++;
                        }
                        var fields = $('#additionalInfo input[type=text]');
                        var fieldselect = $('#additionalInfo select');
                        var field = '';
                        var fieldvalue = '';
                        fields.each(function () {
                            var value = $(this).val();
                            if (value.length < 2) {
                                if (this.id != "mNames11" && this.id != "lName11" && this.id != "mName12" && this.id != "lName12" && this.id != "input-1email" && this.id != "input-1mob" && this.id != "input-RMmob" && this.id != "input-rmemail" && this.id != "input-1newmob" && this.id != "fName1" && this.id != "mName1" && this.id != "lName1" && this.id != "mName2" && this.id != "lName2" && this.id != 'emailIDNew' && this.id != 'panMobile' && this.id != 'panEmail') {
                                    field = this.id;
                                    var a = this.id + 'Error';
                                    $scope[a] = true;
                                    error++;
                                    if (error == 1) {
                                        setTimeout(function () {
                                            $('#' + field).focus();
                                        }, 100)
                                    }
                                }
                            } else {
                                var a = this.id + 'Error';
                                $scope[a] = false;
                            }
                        });

                        fieldselect.each(function () {
                            var value = $(this).val();
                            if (value == null) {
                                value = ""
                            }
                            if (value.length < 1) {
                                if (this.id != 'maidenTitle') {
                                    fieldvalue = this.id;
                                    var a = this.id + 'Error';
                                    $scope[a] = true;
                                    error++;

                                    if (error == 1) {
                                        setTimeout(function () {
                                            $('#' + fieldvalue).focus();
                                        }, 100)
                                    }
                                }

                                $("html, body").animate({
                                    scrollTop: 300
                                }, "slow");

                            } else {
                                if ($scope.maiden && $('#maidenTitle').val() && !($rootScope.formData.fields.maFirstName)) {
                                    $scope.fName1Error = true;
                                    error++;

                                    if (error == 1) {
                                        setTimeout(function () {
                                            $('#fName1').focus();
                                        }, 100)
                                    }
                                }
                                var a = this.id + 'Error';
                                $scope[a] = false;
                            }
                        });
                        let n = $rootScope.formData.fields.fsFirstName.replace(/\s+/g, "");
                        if (n.length < 3) {
                            $scope.fNames11Error = true;
                            setTimeout(function () {
                                $('#fNames11').focus();
                            }, 100)
                        } else {
                            $scope.fNames11Error = false;
                        }
                        // $rootScope.formData.fields.fsTitle = $("#fsTitle").val();
                        // $rootScope.formData.fields.moTitle = $("#moTitle").val();
                        // $rootScope.formData.fields.maTitle = $("#maTitle").val();
                        // $rootScope.formData.fields.emailBelongs = $("input[name=emstatus]:checked").val();
                        // $rootScope.formData.fields.mobileBelongs = $("input[name=mmstatus]:checked").val();
                        // $rootScope.formData.fields.broker = $("#broker").val();
                        // $rootScope.formData.fields.political = $("#pscrelation").val();
                        if ($scope.fNames11Error) {
                            error++;
                        }
                        $rootScope.formData.fields.resStatus = $('#rStatus').val();
                        $rootScope.formData.fields.citizen = $('#citizen').val();
                        sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
                        sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
                        if (($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') && $rootScope.formData.fields.gender == 'F') {
                            $scope.genderError1 = true;
                            error++;
                        } else if (($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS') && $rootScope.formData.fields.gender == 'M') {
                            $scope.genderError1 = true;
                            error++;
                        } else if (($rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS') && $rootScope.formData.fields.gender == 'M') {
                            $scope.genderError1 = true;
                            error++;
                        } else if (($rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') && $rootScope.formData.fields.gender == 'M') {
                            $scope.genderError1 = true;
                            error++;
                        }
                        else {
                            $scope.genderError1 = false;
                        }
                        if (error == 0) {
                            $rootScope.formData.fields.annualIncome = $rootScope.formData.fields.anIncome;
                            var url = "DIYClientOtherInfo";
                            var sendData = {
                                ObjCDIYClientOtherInfo: {
                                    ReferenceNumber: "",
                                    ReferenceNumberEnc: $rootScope.formData.eRefNumber,
                                    Gender: $rootScope.formData.fields.gender,
                                    MaritialStatus: $rootScope.formData.fields.marital,
                                    Email: $scope.Encryption($rootScope.formData.fields.email),
                                    Mobile: $scope.Encryption($rootScope.formData.fields.mobile),
                                    FatherOrSpouseType: "F",
                                    FatherHusName: $rootScope.formData.fields.fsFirstName,
                                    FatherNamePrefixID: "MR",
                                    FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
                                    FatherNameMiddleName: '',
                                    FatherNameLastName: '',
                                    MothersMaidenName: $rootScope.formData.fields.moFirstName + $rootScope.formData.fields.moMiddleName + $rootScope.formData.fields.moLastName,
                                    MotherNamePrefixID: $('#moTitle').val(),
                                    MotherNameFirstName: $rootScope.formData.fields.moFirstName,
                                    MotherNameMiddleName: $rootScope.formData.fields.moMiddleName,
                                    MotherNameLastName: $rootScope.formData.fields.moLastName,
                                    MaidenNamePrefixID: $scope.fsType ? $('#maidenTitle').val() : '',
                                    MaidenNameFirstName: $rootScope.formData.fields.maFirstName,
                                    MaidenNameMiddleName: $rootScope.formData.fields.maMiddleName,
                                    MaidenNameLastName: $rootScope.formData.fields.maLastName,
                                    EmailbelongstoPan: $rootScope.formData.fields.emailPan,
                                    ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
                                    MobilebelongstoPan: $rootScope.formData.fields.mobilePan,
                                    Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
                                    ProStage: "Profile2",
                                    ResidentialStatus: $rootScope.formData.fields.resStatus,
                                    Nationality: $rootScope.formData.fields.citizen,
                                    Occupation: $rootScope.formData.fields.occupation,
                                    EducationValue: $rootScope.formData.fields.education,
                                    AnnualIncome: $rootScope.formData.fields.annualIncome,
                                    Networth: $rootScope.formData.fields.netWorth,
                                    TradingExperience: $rootScope.formData.fields.tradeExp,
                                    PoliticalExposure: $rootScope.formData.fields.political,
                                    DealingExistingStockBroker: $rootScope.formData.fields.broker,
                                    StockSubBrokerName: $rootScope.formData.fields.brokerName,
                                    ClientInfoId: $rootScope.formData.fields.cCode,
                                    PastActions: $rootScope.formData.fields.disputes,
                                    DisputesDetails: $rootScope.formData.fields.disputesDetails,
                                    Exchange: $rootScope.formData.fields.exchangeName,
                                    GSTINFlag: $rootScope.formData.fields.gst,
                                    GSTINNumber: $rootScope.formData.fields.gstNumber,
                                    RelatedPartyFlag: 'N',
                                    TaxJurisdiction: $rootScope.formData.fields.taxOther,
                                    TaxJurisdictionCountry: $rootScope.formData.fields.taxCountry,
                                    PlaceOfBirth: $rootScope.formData.fields.birthPlace,
                                    TaxIdentificationNumber: $rootScope.formData.fields.tin,
                                    CountryOfBirth: $rootScope.formData.fields.brithCountry,
                                    JurisdictionAddrFlag: '',
                                    JurisdictionAddress1: '',
                                    JurisdictionAddress2: '',
                                    JurisdictionAddress3: '',
                                    JurisdictionCity: $rootScope.formData.fields.jCity,
                                    JurisdictionDistrict: $rootScope.formData.fields.jDistrict,
                                    JurisdictionState: $rootScope.formData.fields.jState,
                                    JurisdictionStateID: 0,
                                    JurisdictionCountry: $rootScope.formData.fields.jCountry,
                                    JurisdictionPinCode: $rootScope.formData.fields.jPin,
                                    InternetTrading: $rootScope.formData.fields.InternetTrading,
                                    DPRecieveForEachCredit: $rootScope.formData.fields.dpCredit,
                                    DPtoacceptPledgeIns: $rootScope.formData.fields.dpPledge,
                                    DematStatement: $rootScope.formData.fields.rdnDemat,
                                    EmailStatement: $rootScope.formData.fields.rdnElectEmail,
                                    ShareEmailWithRTA: $rootScope.formData.fields.shareEmail,
                                    AnualReport: $rootScope.formData.fields.rdnAnnualReport,
                                    InterestInToBank: $rootScope.formData.fields.rdnBankAcc,
                                    ContractNoteandOtherRelatedReports: $rootScope.formData.fields.rdnContractNote,
                                    DISBooklet: $rootScope.formData.fields.rdnDIS,
                                    SourceofFund: $rootScope.formData.fields.sFunds,
                                    AgreeToReceivecall: 'Y',
                                    SettlementOfFunds: $rootScope.formData.fields.rdnSetFunds,
                                    EnableStockSIP: $rootScope.formData.fields.rdnSIP,
                                    RiskCategory: 'L',
                                    ExpilicitContent: $rootScope.formData.ExplicitContent,
                                    ExpilicitCode: $rootScope.formData.ExplicitCode,
                                    ExpilicitFlag: $scope.ExplicitFlag,
                                    BrowserType: $rootScope.formData.browserType,
                                    EncryptToken: $rootScope.EncryptToken,
                                    Isbyod: true
                                },
                                IsDiy: true,
                            };
                            $rootScope.formData.apiLoading = true;
                            serverService.apiCall(url, sendData).then(function (a) {
                                $rootScope.formData.apiLoading = false;
                                $rootScope.formData.applicationDisabled = false
                                var response = a.data;
                                if (response.EncryptToken) {
                                    $rootScope.EncryptToken = response.EncryptToken;
                                    sessionStorage.setItem('AxToken', response.EncryptToken);
                                } else {
                                    if ($rootScope.formData.tokenValidation) {
                                        $rootScope.clearBrowsingData();
                                        var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                            backdrop: 'static',
                                            keyboard: false
                                        });
                                        APIResponseModal.show();
                                        $rootScope.apiResponseErrorMsg = "Session Timed Out";
                                        return false;
                                    }
                                }

                                if (response.IsSuccess) {
                                    $rootScope.thirdCompleted = true;
                                    if ($rootScope.verifyemail) {
                                        if ($rootScope.newEmailVerify) {
                                            var EmailType = $rootScope.formData.fields.emailNew
                                        } else {
                                            var EmailType = $rootScope.formData.fields.email
                                        }
                                    }
                                    $rootScope.getAPI = false;
                                    $scope.BYODPersonalStage = false;
                                    $scope.overallApi();
                                    $scope.BYODPlanStage = true;
                                    $('#collapseProduct').collapse('show');
                                    // $scope.getProductInfo();
                                    $("#productSentSmsDialog").modal('hide')
                                    $(document.body).removeClass('modal-open');
                                    $('.modal-backdrop').remove();

                                    var productId = $('input[name=axisDirect]:checked').val();
                                    if (!$rootScope.formData.assistedLGCode) {
                                        $scope.BYODPlanStage = true;
                                        $('#collapseProduct').collapse('show');
                                        $scope.lgcodereq = true;
                                        return;
                                    } else {
                                        $scope.lgcodereq = false;
                                    }

                                    if ($("input[type='checkbox'][name='segments']:checked").length <= 0) {
                                        $scope.productError = true;
                                    } else {
                                        $scope.productError = false;
                                        var url = "DIYClientProductRegistrationBYOD";

                                        var stockNSE = 'N';
                                        var stockBSE = 'N';

                                        var mutualFundsNSE = 'N';
                                        var BSEMutualFunds = 'N';

                                        var foNSE = 'N';
                                        var currencyDerivativesNSE = 'N';

                                        var commodityMCX = 'N';
                                        var commodityNCDX = 'N';

                                        if ($("input[type=checkbox]#slb").is(':checked')) {
                                            $scope.slb = 'Y';
                                            $rootScope.SLBsuccess = true;
                                        } else {
                                            $scope.slb = 'N';
                                            $rootScope.SLBsuccess = false;
                                        }

                                        if ($("input[type=checkbox]#equity").is(':checked')) {
                                            stockNSE = 'Y';
                                            stockBSE = 'Y';
                                        }

                                        if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
                                            foNSE = 'Y';
                                        }

                                        if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
                                            mutualFundsNSE = 'Y';
                                            BSEMutualFunds = 'Y';
                                        }

                                        if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
                                            commodityMCX = 'Y';
                                            commodityNCDX = 'Y';
                                        }

                                        if ($("input[type=checkbox]#currency").is(':checked')) {
                                            currencyDerivativesNSE = 'Y';
                                        }

                                        var sendData = {
                                            ObjCDIYProduct: {
                                                ReferenceNumber: $rootScope.formData.eRefNumber,
                                                ClientInfoID: 1,
                                                ProductId: productId,
                                                Product: "Default Product",
                                                Plan: "Investor Plan",
                                                PlanName: "Online Investor Plan",
                                                TradingPreferenceId: 5,
                                                AssistLGCode: $rootScope.formData.assistedLGCode,
                                                AssistLCCode: $rootScope.formData.assistedLCCode,
                                                BSEEquityCash: stockBSE,
                                                NSEEquityCash: stockNSE,
                                                MCXEquityCash: 'N',

                                                BSEEquityFandO: 'N',
                                                NSEEquityFandO: foNSE,
                                                MCXEquityFandO: 'N',

                                                BSECurrencyFandO: 'N',
                                                NSECurrencyFandO: currencyDerivativesNSE,
                                                MCXCurrencyFandO: 'N',

                                                BSEMutualFunds: BSEMutualFunds,
                                                NSEMutualFunds: mutualFundsNSE,
                                                MCXMutualFunds: 'N',

                                                BSECommodity: 'N',
                                                NSECommodity: 'N',
                                                MCXCommodity: commodityMCX,

                                                NCDXCommodity: commodityNCDX,
                                                NCDXEquityCash: 'N',
                                                NCDXEquityFandO: 'N',
                                                NCDXCurrencyFandO: 'N',
                                                NCDXMutualFunds: 'N',
                                                // SLB: $scope.slb,
                                                SLB: "Y",
                                                Details: "sample string 27",
                                                SuitedFor: "sample string 28",
                                                Exchange: "sample string 29",
                                                IntradayandFeatures: "sample string 30",
                                                Options: "sample string 31",
                                                CurrencyFeatures: "sample string 32",
                                                BrokeragePage: "sample string 33",
                                                OpeningFee: 34.1,
                                                MarginFee: 35.1,
                                                TotalPayableAmount: 36.1,
                                                CurrencyOptions: "sample string 37",
                                                PromoCode: $rootScope.formData.promoCode,
                                                BrowserType: $rootScope.formData.browserType,
                                                DematType: $scope.productDemat,
                                                EncryptToken: $rootScope.EncryptToken,
                                                ReferralCode: $rootScope.formData.referralCode
                                            },
                                            IsDiy: true
                                        };
                                        $rootScope.formData.apiLoading = true;
                                        serverService.apiCall(url, sendData).then(function (a) {
                                            var response = a.data;
                                            if (!response.IsSuccess && response.ErrorCode == "305") {
                                                $scope.BYODPlanStage = true;
                                                $('#collapseProduct').collapse('show');
                                                $scope.lgcodereq = true;
                                                setTimeout(function () { $scope.owlSet(); }, 500)
                                                return;
                                            }
                                            if (response.EncryptToken) {
                                                $rootScope.EncryptToken = response.EncryptToken;
                                                sessionStorage.setItem('AxToken', response.EncryptToken);
                                            } else {
                                                if ($rootScope.formData.tokenValidation) {
                                                    $rootScope.clearBrowsingData();
                                                    var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                                        backdrop: 'static',
                                                        keyboard: false
                                                    });
                                                    APIResponseModal.show();
                                                    $rootScope.apiResponseErrorMsg = "Session Timed Out";
                                                    return false;
                                                }
                                            }

                                            if (response.IsSuccess) {
                                                $scope.BYODPlanStage = false;
                                                if ($scope.esignIsgurl) {
                                                    $scope.isgRedirect();
                                                } else {
                                                    $rootScope.fifthCompleted = true;
                                                    sessionStorage.setItem('SMSURL', response.IpvURLEncode);

                                                    dataLayer.push({
                                                        event: 'StageChange',
                                                        attributes: {
                                                            'level complete': '4',
                                                            'Stocks': stockBSE,
                                                            'Derivatives': foNSE,
                                                            'Currencies': currencyDerivativesNSE,
                                                            'InvestmentProducts': mutualFundsNSE
                                                        }
                                                    });
                                                    $rootScope.getAPI = false;
                                                    $rootScope.formData.apiLoading = false;

                                                    /* if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && !$scope.skipIsgEsign && $rootScope.formData.makePayment)) {
                                                        sessionStorage.setItem('productStage', true)
                                                        $scope.ProceedPayment();
                                                    } else { */
                                                    if ($rootScope.BYOD) {
                                                        $rootScope.formData.skippedPayment = true;
                                                    }
                                                    if ($rootScope.BYOD && $scope.iszeropayment) {
                                                        var url = "DIYPaymentSkip";
                                                        var sendData = {
                                                            ReferenceNumber: $rootScope.formData.eRefNumber,
                                                            IsSkippay: true
                                                        }
                                                        serverService.apiCall(url, sendData).then(function (a) {
                                                            var response = a.data;
                                                            if (response.IsSuccess) {
                                                                if ($scope.dpBank) {
                                                                    $scope.updateDpid();
                                                                } else {
                                                                    $scope.BYODPlanStage = false;
                                                                    // $scope.BYODDocument=true;
                                                                    // $('#collapseDocument').collapse('show');
                                                                    $scope.getDocsProof();

                                                                }
                                                            }

                                                        })
                                                    } else {
                                                        $scope.productSentSms();
                                                        $scope.BYODPlanStage = false;
                                                        // $scope.BYODDocument=true;
                                                        // $('#collapseDocument').collapse('show');
                                                        $scope.getDocsProof();
                                                        if (error == 0) {
                                                            $scope.ByodtermsError = false;
                                                            var error = 0;

                                                            // $scope.updateIPVStage();
                                                            $scope.foImgError1 = false;
                                                            // if (!$scope.signatureimg) {
                                                            //     $scope.signatureImgError = true;
                                                            //     $("html, body").animate({
                                                            //         scrollTop: $("#SPECIMENPROOF").offset().top
                                                            //     });
                                                            //     error++;
                                                            // }
                                                            // if (!$scope.overallpan) {
                                                            //     $scope.panImgError = true;
                                                            //     $("html, body").animate({
                                                            //         scrollTop: $("#PANNumber").offset().top
                                                            //     });
                                                            //     error++;
                                                            // }
                                                            // if (!$scope.BYODcAddressUpdt) {
                                                            //         $scope.cAddressImgError = true;
                                                            //         $("html, body").animate({
                                                            //             scrollTop: $("#CorrespondenceAddress").offset().top
                                                            //         });
                                                            //         error++;

                                                            // }
                                                            // if (!$scope.BYODcAddressUpdt2) {
                                                            //     $scope.cAddressBackImgError = true;
                                                            //     $("html, body").animate({
                                                            //         scrollTop: $("#CorrespondenceAddress2").offset().top
                                                            //     });
                                                            // }
                                                            if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                                                                $scope.ByodtermsError = true;
                                                                error++;
                                                            }
                                                            if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                                                                $scope.ddpiError = true;
                                                                error++;
                                                            }
                                                            // if($scope.incomeimageByodShow){
                                                            //     if(!$scope.incomeimageShows){
                                                            //         $scope.foImgError1 = true;
                                                            //         error++;
                                                            //         $("html, body").animate({
                                                            //             scrollTop: $("#Income").offset().top
                                                            //         });
                                                            //     }
                                                            // }
                                                            else if (!$rootScope.esignCompleted && error == 0) {
                                                                var s_url = "SignatureEsignBYODUrlSend";
                                                                var sendData = {
                                                                    "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                                }
                                                                $rootScope.formData.apiLoading = true;
                                                                serverService.apiCall(s_url, sendData).then(function (a) {
                                                                    var response = a.data
                                                                    $rootScope.formData.apiLoading = false;
                                                                })
                                                                var durl = 'updateDDIP';
                                                                var ddata = {
                                                                   "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                                                                }
                                                                serverService.apiCall(durl, ddata);
                                                                var url = "DIYDocStageCompletion";
                                                                var sendRequest = {
                                                                    "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                                    "IsDocStageCompleted": true
                                                                }
                                                                serverService.apiCall(url, sendRequest).then(function (a) { });
                                                                var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                                                                    backdrop: 'static',
                                                                    keyboard: true
                                                                });
                                                                BYODConfirmRM.show();
                                                            }
                                                        }
                                                    }
                                                    /* } */
                                                }

                                            } else {
                                                $rootScope.formData.apiLoading = false;
                                                var connection = new bootstrap.Modal(document.getElementById('connection'));
                                                connection.show();
                                            }

                                        });

                                    }


                                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                                    $rootScope.formData.apiLoading = false;
                                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                    paninformation.show();
                                    return
                                } else {
                                    // if (abc == 0) {
                                    //     $scope.personalUpdate();
                                    //     abc++;
                                    // } else {

                                    $rootScope.formData.apiLoading = false;

                                    $scope.emailIdBelongsShow = response.IsEmail;
                                    $scope.mobileBelongsShow = response.IsMobile;
                                    if (response.IsEmail) {
                                        $scope.panEmailRegError = true;
                                        $scope.panEmailRegMsg = response.ErrorMessage;
                                        $scope.EmailAlready = true;
                                        $scope.EmailBYOD = true;
                                        $scope.emailVerificationSend = false;
                                        $scope.changeEmailShow = true;
                                        $('#collapseInfo').collapse('show');
                                        $scope.collapsePDetailsError = true;
                                        setTimeout(function () {
                                            $('#eself').focus();
                                        }, 1000);
                                    } else {
                                        $scope.EmailBYOD = false;
                                    }

                                    if (response.IsMobile) {
                                        $scope.panMobileRegError = true;
                                        $scope.panMobileRegMsg = response.ErrorMessage;
                                        $scope.EmailAlready = true;
                                        $scope.MobileBYOD = true;
                                        $scope.changeMobileNum = true;
                                        $('#collapseInfo').collapse('show');
                                        $scope.collapsePDetailsError = true;
                                        setTimeout(function () {
                                            $('#mself').focus();
                                        }, 1000)
                                    } else {
                                        $scope.MobileBYOD = false;
                                    }
                                    // }
                                }

                            }, function (e) {
                                $rootScope.formData.apiLoading = false;
                                var connection = new bootstrap.Modal(document.getElementById('connection'));
                                connection.show();
                            });
                        }
                    } else {
                        $rootScope.address1 = true
                        $rootScope.address1Error = response.ErrorMessage
                        $rootScope.formData.apiLoading = false;
                        // $rootScope.formData.apiLoading = false;
                        // var connection = new bootstrap.Modal(document.getElementById('connection'));
                        // connection.show();
                    }
                }, function (e) {
                    $rootScope.formData.apiLoading = false;
                    var connection = new bootstrap.Modal(document.getElementById('connection'));
                    connection.show();
                });
            }
        }
        else if ($scope.BYODPersonalStage) {
            $scope.maritalError1 = false;
            if ($rootScope.formData.fields.marital == "" || $rootScope.formData.fields.marital == undefined || $rootScope.formData.fields.marital == null) {
                $scope.maritalError1 = true;
                $('#collapseInfo').collapse('show');
                error++;
            }
            if ($rootScope.formData.fields.sFunds == "0" || !$rootScope.formData.fields.sFunds) {
                $scope.sFundsError = true;
                $('#collapseInfo').collapse('show');
                $scope.$apply();
                error++;
            }
            var fields = $('#additionalInfo input[type=text]');
            var fieldselect = $('#additionalInfo select');
            var field = '';
            var fieldvalue = '';
            fields.each(function () {
                var value = $(this).val();
                if (value.length < 2) {
                    if (this.id != "mNames11" && this.id != "lName11" && this.id != "mName12" && this.id != "lName12" && this.id != "input-1email" && this.id != "input-1mob" && this.id != "input-RMmob" && this.id != "input-rmemail" && this.id != "input-1newmob" && this.id != "fName1" && this.id != "mName1" && this.id != "lName1" && this.id != "mName2" && this.id != "lName2" && this.id != 'emailIDNew' && this.id != 'panMobile' && this.id != 'panEmail') {
                        field = this.id;
                        var a = this.id + 'Error';
                        $scope[a] = true;
                        $('#collapseInfo').collapse('show');
                        error++;
                        if (error == 1) {
                            setTimeout(function () {
                                $('#' + field).focus();
                            }, 100)
                        }
                    }
                } else {
                    var a = this.id + 'Error';
                    $scope[a] = false;
                }
            });

            fieldselect.each(function () {
                var value = $(this).val();
                if (value == null) {
                    value = ""
                }
                if (value.length < 1) {
                    if (this.id != 'maidenTitle') {
                        fieldvalue = this.id;
                        var a = this.id + 'Error';
                        $scope[a] = true;
                        $('#collapseInfo').collapse('show');
                        error++;

                        if (error == 1) {
                            setTimeout(function () {
                                $('#' + fieldvalue).focus();
                            }, 100)
                        }
                    }

                    $("html, body").animate({
                        scrollTop: 300
                    }, "slow");

                } else {
                    if ($scope.maiden && $('#maidenTitle').val() && !($rootScope.formData.fields.maFirstName)) {
                        $scope.fName1Error = true;
                        error++;

                        if (error == 1) {
                            setTimeout(function () {
                                $('#fName1').focus();
                            }, 100)
                        }
                    }
                    var a = this.id + 'Error';
                    $scope[a] = false;
                }
            });
            let n = $rootScope.formData.fields.fsFirstName ? $rootScope.formData.fields.fsFirstName.replace(/\s+/g, "") : "";
            if (n.length < 3) {
                $scope.fNames11Error = true;
                setTimeout(function () {
                    $('#fNames11').focus();
                }, 100)
            } else {
                $scope.fNames11Error = false;
            }
            // $rootScope.formData.fields.fsTitle = $("#fsTitle").val();
            // $rootScope.formData.fields.moTitle = $("#moTitle").val();
            // $rootScope.formData.fields.maTitle = $("#maTitle").val();
            // $rootScope.formData.fields.emailBelongs = $("input[name=emstatus]:checked").val();
            // $rootScope.formData.fields.mobileBelongs = $("input[name=mmstatus]:checked").val();
            // $rootScope.formData.fields.broker = $("#broker").val();
            // $rootScope.formData.fields.political = $("#pscrelation").val();
            if ($scope.fNames11Error) {
                error++;
            }
            $rootScope.formData.fields.resStatus = $('#rStatus').val();
            $rootScope.formData.fields.citizen = $('#citizen').val();
            sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
            sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
            if (($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') && $rootScope.formData.fields.gender == 'F') {
                $scope.genderError1 = true;
                error++;
            } else if (($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS') && $rootScope.formData.fields.gender == 'M') {
                $scope.genderError1 = true;
                error++;
            } else if (($rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS') && $rootScope.formData.fields.gender == 'M') {
                $scope.genderError1 = true;
                error++;
            } else if (($rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') && $rootScope.formData.fields.gender == 'M') {
                $scope.genderError1 = true;
                error++;
            }
            else {
                $scope.genderError1 = false;
            }
            if (error == 0) {
                $rootScope.formData.fields.annualIncome = $rootScope.formData.fields.anIncome;
                var url = "DIYClientOtherInfo";
                var sendData = {
                    ObjCDIYClientOtherInfo: {
                        ReferenceNumber: "",
                        ReferenceNumberEnc: $rootScope.formData.eRefNumber,
                        Gender: $rootScope.formData.fields.gender,
                        MaritialStatus: $rootScope.formData.fields.marital,
                        Email: $scope.Encryption($rootScope.formData.fields.email),
                        Mobile: $scope.Encryption($rootScope.formData.fields.mobile),
                        FatherOrSpouseType: "F",
                        FatherHusName: $rootScope.formData.fields.fsFirstName,
                        FatherNamePrefixID: "MR",
                        FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
                        FatherNameMiddleName: '',
                        FatherNameLastName: '',
                        MothersMaidenName: $rootScope.formData.fields.moFirstName + $rootScope.formData.fields.moMiddleName + $rootScope.formData.fields.moLastName,
                        MotherNamePrefixID: $('#moTitle').val(),
                        MotherNameFirstName: $rootScope.formData.fields.moFirstName,
                        MotherNameMiddleName: $rootScope.formData.fields.moMiddleName,
                        MotherNameLastName: $rootScope.formData.fields.moLastName,
                        MaidenNamePrefixID: $scope.fsType ? $('#maidenTitle').val() : '',
                        MaidenNameFirstName: $rootScope.formData.fields.maFirstName,
                        MaidenNameMiddleName: $rootScope.formData.fields.maMiddleName,
                        MaidenNameLastName: $rootScope.formData.fields.maLastName,
                        EmailbelongstoPan: $rootScope.formData.fields.emailPan,
                        ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
                        MobilebelongstoPan: $rootScope.formData.fields.mobilePan,
                        Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
                        ProStage: "Profile2",
                        ResidentialStatus: $rootScope.formData.fields.resStatus,
                        Nationality: $rootScope.formData.fields.citizen,
                        Occupation: $rootScope.formData.fields.occupation,
                        EducationValue: $rootScope.formData.fields.education,
                        AnnualIncome: $rootScope.formData.fields.annualIncome,
                        Networth: $rootScope.formData.fields.netWorth,
                        TradingExperience: $rootScope.formData.fields.tradeExp,
                        PoliticalExposure: $rootScope.formData.fields.political,
                        DealingExistingStockBroker: $rootScope.formData.fields.broker,
                        StockSubBrokerName: $rootScope.formData.fields.brokerName,
                        ClientInfoId: $rootScope.formData.fields.cCode,
                        PastActions: $rootScope.formData.fields.disputes,
                        DisputesDetails: $rootScope.formData.fields.disputesDetails,
                        Exchange: $rootScope.formData.fields.exchangeName,
                        GSTINFlag: $rootScope.formData.fields.gst,
                        GSTINNumber: $rootScope.formData.fields.gstNumber,
                        RelatedPartyFlag: 'N',
                        TaxJurisdiction: $rootScope.formData.fields.taxOther,
                        TaxJurisdictionCountry: $rootScope.formData.fields.taxCountry,
                        PlaceOfBirth: $rootScope.formData.fields.birthPlace,
                        TaxIdentificationNumber: $rootScope.formData.fields.tin,
                        CountryOfBirth: $rootScope.formData.fields.brithCountry,
                        JurisdictionAddrFlag: '',
                        JurisdictionAddress1: '',
                        JurisdictionAddress2: '',
                        JurisdictionAddress3: '',
                        JurisdictionCity: $rootScope.formData.fields.jCity,
                        JurisdictionDistrict: $rootScope.formData.fields.jDistrict,
                        JurisdictionState: $rootScope.formData.fields.jState,
                        JurisdictionStateID: 0,
                        JurisdictionCountry: $rootScope.formData.fields.jCountry,
                        JurisdictionPinCode: $rootScope.formData.fields.jPin,
                        InternetTrading: $rootScope.formData.fields.InternetTrading,
                        DPRecieveForEachCredit: $rootScope.formData.fields.dpCredit,
                        DPtoacceptPledgeIns: $rootScope.formData.fields.dpPledge,
                        DematStatement: $rootScope.formData.fields.rdnDemat,
                        EmailStatement: $rootScope.formData.fields.rdnElectEmail,
                        ShareEmailWithRTA: $rootScope.formData.fields.shareEmail,
                        AnualReport: $rootScope.formData.fields.rdnAnnualReport,
                        InterestInToBank: $rootScope.formData.fields.rdnBankAcc,
                        ContractNoteandOtherRelatedReports: $rootScope.formData.fields.rdnContractNote,
                        DISBooklet: $rootScope.formData.fields.rdnDIS,
                        SourceofFund: $rootScope.formData.fields.sFunds,
                        AgreeToReceivecall: 'Y',
                        SettlementOfFunds: $rootScope.formData.fields.rdnSetFunds,
                        EnableStockSIP: $rootScope.formData.fields.rdnSIP,
                        RiskCategory: 'L',
                        ExpilicitContent: $rootScope.formData.ExplicitContent,
                        ExpilicitCode: $rootScope.formData.ExplicitCode,
                        ExpilicitFlag: $scope.ExplicitFlag,
                        BrowserType: $rootScope.formData.browserType,
                        EncryptToken: $rootScope.EncryptToken,
                        Isbyod: true
                    },
                    IsDiy: true,
                };
                $rootScope.formData.apiLoading = true;
                serverService.apiCall(url, sendData).then(function (a) {
                    $rootScope.formData.apiLoading = false;
                    $rootScope.formData.applicationDisabled = false
                    var response = a.data;
                    if (response.EncryptToken) {
                        $rootScope.EncryptToken = response.EncryptToken;
                        sessionStorage.setItem('AxToken', response.EncryptToken);
                    } else {
                        if ($rootScope.formData.tokenValidation) {
                            $rootScope.clearBrowsingData();
                            var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                backdrop: 'static',
                                keyboard: false
                            });
                            APIResponseModal.show();
                            $rootScope.apiResponseErrorMsg = "Session Timed Out";
                            return false;
                        }
                    }

                    if (response.IsSuccess) {
                        $rootScope.thirdCompleted = true;
                        if ($rootScope.verifyemail) {
                            if ($rootScope.newEmailVerify) {
                                var EmailType = $rootScope.formData.fields.emailNew
                            } else {
                                var EmailType = $rootScope.formData.fields.email
                            }
                        }
                        $rootScope.getAPI = false;
                        $scope.BYODPersonalStage = false;
                        $scope.BYODPlanStage = true;
                        $('#collapseProduct').collapse('show');
                        $scope.getProductInfo();
                        $("#productSentSmsDialog").modal('hide')
                        $(document.body).removeClass('modal-open');
                        $('.modal-backdrop').remove();

                        var productId = $('input[name=axisDirect]:checked').val();
                        if (!$rootScope.formData.assistedLGCode) {
                            $scope.BYODPlanStage = true;
                            $('#collapseProduct').collapse('show');
                            $scope.lgcodereq = true;
                            setTimeout(function () { $scope.owlSet(); }, 500)
                            return;
                        } else {
                            $scope.lgcodereq = false;
                        }

                        if ($("input[type='checkbox'][name='segments']:checked").length <= 0) {
                            $scope.productError = true;
                        } else {
                            $scope.productError = false;
                            var url = "DIYClientProductRegistrationBYOD";

                            var stockNSE = 'N';
                            var stockBSE = 'N';

                            var mutualFundsNSE = 'N';
                            var BSEMutualFunds = 'N';

                            var foNSE = 'N';
                            var currencyDerivativesNSE = 'N';

                            var commodityMCX = 'N';
                            var commodityNCDX = 'N';

                            if ($("input[type=checkbox]#slb").is(':checked')) {
                                $scope.slb = 'Y';
                                $rootScope.SLBsuccess = true;
                            } else {
                                $scope.slb = 'N';
                                $rootScope.SLBsuccess = false;
                            }

                            if ($("input[type=checkbox]#equity").is(':checked')) {
                                stockNSE = 'Y';
                                stockBSE = 'Y';
                            }

                            if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
                                foNSE = 'Y';
                            }

                            if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
                                mutualFundsNSE = 'Y';
                                BSEMutualFunds = 'Y';
                            }

                            if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
                                commodityMCX = 'Y';
                                commodityNCDX = 'Y';
                            }

                            if ($("input[type=checkbox]#currency").is(':checked')) {
                                currencyDerivativesNSE = 'Y';
                            }

                            var sendData = {
                                ObjCDIYProduct: {
                                    ReferenceNumber: $rootScope.formData.eRefNumber,
                                    ClientInfoID: 1,
                                    ProductId: productId,
                                    Product: "Default Product",
                                    Plan: "Investor Plan",
                                    PlanName: "Online Investor Plan",
                                    TradingPreferenceId: 5,
                                    AssistLGCode: $rootScope.formData.assistedLGCode,
                                    AssistLCCode: $rootScope.formData.assistedLCCode,
                                    BSEEquityCash: stockBSE,
                                    NSEEquityCash: stockNSE,
                                    MCXEquityCash: 'N',

                                    BSEEquityFandO: 'N',
                                    NSEEquityFandO: foNSE,
                                    MCXEquityFandO: 'N',

                                    BSECurrencyFandO: 'N',
                                    NSECurrencyFandO: currencyDerivativesNSE,
                                    MCXCurrencyFandO: 'N',

                                    BSEMutualFunds: BSEMutualFunds,
                                    NSEMutualFunds: mutualFundsNSE,
                                    MCXMutualFunds: 'N',

                                    BSECommodity: 'N',
                                    NSECommodity: 'N',
                                    MCXCommodity: commodityMCX,

                                    NCDXCommodity: commodityNCDX,
                                    NCDXEquityCash: 'N',
                                    NCDXEquityFandO: 'N',
                                    NCDXCurrencyFandO: 'N',
                                    NCDXMutualFunds: 'N',
                                    // SLB: $scope.slb,
                                    SLB: "Y",
                                    Details: "sample string 27",
                                    SuitedFor: "sample string 28",
                                    Exchange: "sample string 29",
                                    IntradayandFeatures: "sample string 30",
                                    Options: "sample string 31",
                                    CurrencyFeatures: "sample string 32",
                                    BrokeragePage: "sample string 33",
                                    OpeningFee: 34.1,
                                    MarginFee: 35.1,
                                    TotalPayableAmount: 36.1,
                                    CurrencyOptions: "sample string 37",
                                    PromoCode: $rootScope.formData.promoCode,
                                    BrowserType: $rootScope.formData.browserType,
                                    DematType: $scope.productDemat,
                                    EncryptToken: $rootScope.EncryptToken,
                                    ReferralCode: $rootScope.formData.referralCode
                                },
                                IsDiy: true
                            };
                            $rootScope.formData.apiLoading = true;
                            serverService.apiCall(url, sendData).then(function (a) {
                                var response = a.data;
                                if (!response.IsSuccess && response.ErrorCode == "305") {
                                    $scope.BYODPlanStage = true;
                                    $('#collapseProduct').collapse('show');
                                    $scope.lgcodereq = true;
                                    setTimeout(function () { $scope.owlSet(); }, 500)
                                    return;
                                }
                                if (response.EncryptToken) {
                                    $rootScope.EncryptToken = response.EncryptToken;
                                    sessionStorage.setItem('AxToken', response.EncryptToken);
                                } else {
                                    if ($rootScope.formData.tokenValidation) {
                                        $rootScope.clearBrowsingData();
                                        var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                            backdrop: 'static',
                                            keyboard: false
                                        });
                                        APIResponseModal.show();
                                        $rootScope.apiResponseErrorMsg = "Session Timed Out";
                                        return false;
                                    }
                                }

                                if (response.IsSuccess) {
                                    $scope.BYODPlanStage = false;
                                    if ($scope.esignIsgurl) {
                                        $scope.isgRedirect();
                                    } else {
                                        $rootScope.fifthCompleted = true;
                                        sessionStorage.setItem('SMSURL', response.IpvURLEncode);

                                        dataLayer.push({
                                            event: 'StageChange',
                                            attributes: {
                                                'level complete': '4',
                                                'Stocks': stockBSE,
                                                'Derivatives': foNSE,
                                                'Currencies': currencyDerivativesNSE,
                                                'InvestmentProducts': mutualFundsNSE
                                            }
                                        });
                                        $rootScope.getAPI = false;
                                        $rootScope.formData.apiLoading = false;

                                        /* if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && !$scope.skipIsgEsign && $rootScope.formData.makePayment)) {
                                            sessionStorage.setItem('productStage', true)
                                            $scope.ProceedPayment();
                                        } else { */
                                        if ($rootScope.BYOD) {
                                            $rootScope.formData.skippedPayment = true;
                                        }
                                        if ($rootScope.BYOD && $scope.iszeropayment) {
                                            var url = "DIYPaymentSkip";
                                            var sendData = {
                                                ReferenceNumber: $rootScope.formData.eRefNumber,
                                                IsSkippay: true
                                            }
                                            serverService.apiCall(url, sendData).then(function (a) {
                                                var response = a.data;
                                                if (response.IsSuccess) {
                                                    if ($scope.dpBank) {
                                                        $scope.updateDpid();
                                                    } else {
                                                        $scope.BYODPlanStage = false;
                                                         if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                                                        $scope.ByodtermsError = true;
                                                        error++;
                                                    }
                                                    if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                                                        $scope.ddpiError = true;
                                                        error++;
                                                    }
                                                        if (!$rootScope.esignCompleted && error == 0) {
                                                            var s_url = "SignatureEsignBYODUrlSend";
                                                            var sendData = {
                                                                "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                            }
                                                            $rootScope.formData.apiLoading = true;
                                                            serverService.apiCall(s_url, sendData).then(function (a) {
                                                                var response = a.data
                                                                $rootScope.formData.apiLoading = false;
                                                            })
                                                            var durl = 'updateDDIP';
                                                            var ddata = {
                                                               "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                                                            }
                                                            serverService.apiCall(durl, ddata);
                                                            var url = "DIYDocStageCompletion";
                                                            var sendRequest = {
                                                                "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                                "IsDocStageCompleted": true
                                                            }

                                                            serverService.apiCall(url, sendRequest).then(function (a) { });
                                                            var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                                                                backdrop: 'static',
                                                                keyboard: true
                                                            });
                                                            BYODConfirmRM.show();
                                                        }
                                                        // $scope.BYODDocument=true;
                                                        // $('#collapseDocument').collapse('show');
                                                        $scope.getDocsProof();

                                                    }
                                                }

                                            })
                                        } else {
                                            $scope.productSentSms();
                                            $scope.BYODPlanStage = false;
                                            // $scope.BYODDocument=true;
                                            // $('#collapseDocument').collapse('show');
                                            $scope.getDocsProof();
                                            if (error == 0) {
                                                $scope.ByodtermsError = false;
                                                 $scope.ddpiError = false;
                                                var error = 0;

                                                // $scope.updateIPVStage();
                                                $scope.foImgError1 = false;
                                                // if (!$scope.signatureimg) {
                                                //     $scope.signatureImgError = true;
                                                //     $("html, body").animate({
                                                //         scrollTop: $("#SPECIMENPROOF").offset().top
                                                //     });
                                                // 	 $('#collapseDocument').collapse('show');
                                                //     error++;
                                                // }
                                                // if (!$scope.overallpan) {
                                                //     $scope.panImgError = true;
                                                //     $("html, body").animate({
                                                //         scrollTop: $("#PANNumber").offset().top
                                                //     });
                                                // 	 $('#collapseDocument').collapse('show');
                                                //     error++;
                                                // }
                                                // if (!$scope.BYODcAddressUpdt) {
                                                //         $scope.cAddressImgError = true;
                                                //         $("html, body").animate({
                                                //             scrollTop: $("#CorrespondenceAddress").offset().top
                                                //         });
                                                // 		 $('#collapseDocument').collapse('show');
                                                //         error++;

                                                // }
                                                // if (!$scope.BYODcAddressUpdt2) {
                                                //     $scope.cAddressBackImgError = true;
                                                //     $("html, body").animate({
                                                //         scrollTop: $("#CorrespondenceAddress2").offset().top
                                                //     });
                                                // 	$('#collapseDocument').collapse('show');
                                                //         error++;
                                                // }
                                                if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                                                    $scope.ByodtermsError = true;
                                                    error++;
                                                }
                                                if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                                                    $scope.ddpiError = true;
                                                    error++;
                                                }
                                                // if($scope.incomeimageByodShow){
                                                //     if(!$scope.incomeimageShows){
                                                //         $scope.foImgError1 = true;
                                                // 		 $('#collapseDocument').collapse('show');
                                                //         error++;
                                                //         $("html, body").animate({
                                                //             scrollTop: $("#Income").offset().top
                                                //         });
                                                //     }
                                                // }
                                                else if (!$rootScope.esignCompleted && error == 0) {
                                                    var s_url = "SignatureEsignBYODUrlSend";
                                                    var sendData = {
                                                        "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                    }
                                                    $rootScope.formData.apiLoading = true;
                                                    serverService.apiCall(s_url, sendData).then(function (a) {
                                                        var response = a.data
                                                        $rootScope.formData.apiLoading = false;
                                                    })
                                                    var durl = 'updateDDIP';
                                                    var ddata = {
                                                        "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                                                    }
                                                    serverService.apiCall(durl, ddata);
                                                    var url = "DIYDocStageCompletion";
                                                    var sendRequest = {
                                                        "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                        "IsDocStageCompleted": true
                                                    }
                                                    serverService.apiCall(url, sendRequest).then(function (a) { });
                                                    var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                                                        backdrop: 'static',
                                                        keyboard: true
                                                    });
                                                    BYODConfirmRM.show();
                                                }
                                            }
                                        }
                                        /* } */
                                    }

                                } else {
                                    $rootScope.formData.apiLoading = false;
                                    var connection = new bootstrap.Modal(document.getElementById('connection'));
                                    connection.show();
                                }

                            });

                        }


                    } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                        $rootScope.formData.apiLoading = false;
                        $rootScope.formData.panStatus1 = response.ErrorMessage;
                        var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        paninformation.show();
                        return
                    } else {
                        // if (abc == 0) {
                        //     $scope.personalUpdate();
                        //     abc++;
                        // } else {

                        $rootScope.formData.apiLoading = false;

                        $scope.emailIdBelongsShow = response.IsEmail;
                        $scope.mobileBelongsShow = response.IsMobile;
                        if (response.IsEmail) {
                            $scope.panEmailRegError = true;
                            $scope.panEmailRegMsg = response.ErrorMessage;
                            $scope.EmailAlready = true;
                            $scope.EmailBYOD = true;
                            $scope.emailVerificationSend = false;
                            $scope.changeEmailShow = true;
                            $('#collapseInfo').collapse('show');
                            $scope.collapsePDetailsError = true;
                            setTimeout(function () {
                                $('#eself').focus();
                            }, 1000);
                        } else {
                            $scope.EmailBYOD = false;
                        }

                        if (response.IsMobile) {
                            $scope.panMobileRegError = true;
                            $scope.panMobileRegMsg = response.ErrorMessage;
                            $scope.EmailAlready = true;
                            $scope.MobileBYOD = true;
                            $scope.changeMobileNum = true;
                            $('#collapseInfo').collapse('show');
                            $scope.collapsePDetailsError = true;
                            setTimeout(function () {
                                $('#mself').focus();
                            }, 1000)
                        } else {
                            $scope.MobileBYOD = false;
                        }
                        // }
                    }

                }, function (e) {
                    $rootScope.formData.apiLoading = false;
                    var connection = new bootstrap.Modal(document.getElementById('connection'));
                    connection.show();
                });
            }
        } else if ($scope.BYODPlanStage) {
            $("#productSentSmsDialog").modal('hide')
            $(document.body).removeClass('modal-open');
            $('.modal-backdrop').remove();

            var productId = $('input[name=axisDirect]:checked').val();
            if (!$rootScope.formData.assistedLGCode) {
                $scope.BYODPlanStage = true;
                $('#collapseProduct').collapse('show');
                $scope.lgcodereq = true;
                setTimeout(function () { $scope.owlSet(); }, 500)
                return;
            } else {
                $scope.lgcodereq = false;
            }

            if ($("input[type='checkbox'][name='segments']:checked").length <= 0) {
                $scope.productError = true;
            } else {
                $scope.productError = false;
                var url = "DIYClientProductRegistrationBYOD";

                var stockNSE = 'N';
                var stockBSE = 'N';

                var mutualFundsNSE = 'N';
                var BSEMutualFunds = 'N';

                var foNSE = 'N';
                var currencyDerivativesNSE = 'N';

                var commodityMCX = 'N';
                var commodityNCDX = 'N';

                if ($("input[type=checkbox]#slb").is(':checked')) {
                    $scope.slb = 'Y';
                    $rootScope.SLBsuccess = true;
                } else {
                    $scope.slb = 'N';
                    $rootScope.SLBsuccess = false;
                }

                if ($("input[type=checkbox]#equity").is(':checked')) {
                    stockNSE = 'Y';
                    stockBSE = 'Y';
                }

                if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
                    foNSE = 'Y';
                }

                if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
                    mutualFundsNSE = 'Y';
                    BSEMutualFunds = 'Y';
                }

                if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
                    commodityMCX = 'Y';
                    commodityNCDX = 'Y';
                }

                if ($("input[type=checkbox]#currency").is(':checked')) {
                    currencyDerivativesNSE = 'Y';
                }

                var sendData = {
                    ObjCDIYProduct: {
                        ReferenceNumber: $rootScope.formData.eRefNumber,
                        ClientInfoID: 1,
                        ProductId: productId,
                        Product: "Default Product",
                        Plan: "Investor Plan",
                        PlanName: "Online Investor Plan",
                        TradingPreferenceId: 5,
                        AssistLGCode: $rootScope.formData.assistedLGCode,
                        AssistLCCode: $rootScope.formData.assistedLCCode,
                        BSEEquityCash: stockBSE,
                        NSEEquityCash: stockNSE,
                        MCXEquityCash: 'N',

                        BSEEquityFandO: 'N',
                        NSEEquityFandO: foNSE,
                        MCXEquityFandO: 'N',

                        BSECurrencyFandO: 'N',
                        NSECurrencyFandO: currencyDerivativesNSE,
                        MCXCurrencyFandO: 'N',

                        BSEMutualFunds: BSEMutualFunds,
                        NSEMutualFunds: mutualFundsNSE,
                        MCXMutualFunds: 'N',

                        BSECommodity: 'N',
                        NSECommodity: 'N',
                        MCXCommodity: commodityMCX,

                        NCDXCommodity: commodityNCDX,
                        NCDXEquityCash: 'N',
                        NCDXEquityFandO: 'N',
                        NCDXCurrencyFandO: 'N',
                        NCDXMutualFunds: 'N',
                        // SLB: $scope.slb,
                        SLB: "Y",
                        Details: "sample string 27",
                        SuitedFor: "sample string 28",
                        Exchange: "sample string 29",
                        IntradayandFeatures: "sample string 30",
                        Options: "sample string 31",
                        CurrencyFeatures: "sample string 32",
                        BrokeragePage: "sample string 33",
                        OpeningFee: 34.1,
                        MarginFee: 35.1,
                        TotalPayableAmount: 36.1,
                        CurrencyOptions: "sample string 37",
                        PromoCode: $rootScope.formData.promoCode,
                        BrowserType: $rootScope.formData.browserType,
                        DematType: $scope.productDemat,
                        EncryptToken: $rootScope.EncryptToken,
                        ReferralCode: $rootScope.formData.referralCode
                    },
                    IsDiy: true
                };
                $rootScope.formData.apiLoading = true;
                serverService.apiCall(url, sendData).then(function (a) {
                    var response = a.data;
                    if (!response.IsSuccess && response.ErrorCode == "305") {
                        $scope.BYODPlanStage = true;
                        $('#collapseProduct').collapse('show');
                        $scope.lgcodereq = true;
                        setTimeout(function () { $scope.owlSet(); }, 500)
                        return;
                    }
                    if (response.EncryptToken) {
                        $rootScope.EncryptToken = response.EncryptToken;
                        sessionStorage.setItem('AxToken', response.EncryptToken);
                    } else {
                        if ($rootScope.formData.tokenValidation) {
                            $rootScope.clearBrowsingData();
                            var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                                backdrop: 'static',
                                keyboard: false
                            });
                            APIResponseModal.show();
                            $rootScope.apiResponseErrorMsg = "Session Timed Out";
                            return false;
                        }
                    }

                    if (response.IsSuccess) {
                        $scope.BYODPlanStage = false;
                        if ($scope.esignIsgurl) {
                            $scope.isgRedirect();
                        } else {
                            $rootScope.fifthCompleted = true;
                            sessionStorage.setItem('SMSURL', response.IpvURLEncode);

                            dataLayer.push({
                                event: 'StageChange',
                                attributes: {
                                    'level complete': '4',
                                    'Stocks': stockBSE,
                                    'Derivatives': foNSE,
                                    'Currencies': currencyDerivativesNSE,
                                    'InvestmentProducts': mutualFundsNSE
                                }
                            });
                            $rootScope.getAPI = false;
                            $rootScope.formData.apiLoading = false;

                            /* if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && !$scope.skipIsgEsign && $rootScope.formData.makePayment)) {
                                sessionStorage.setItem('productStage', true)
                                $scope.ProceedPayment();
                            } else { */
                            if ($rootScope.BYOD) {
                                $rootScope.formData.skippedPayment = true;
                            }
                            if ($rootScope.BYOD && $scope.iszeropayment) {
                                var url = "DIYPaymentSkip";
                                var sendData = {
                                    ReferenceNumber: $rootScope.formData.eRefNumber,
                                    IsSkippay: true
                                }
                                serverService.apiCall(url, sendData).then(function (a) {
                                    var response = a.data;
                                    if (response.IsSuccess) {
                                        if ($scope.dpBank) {
                                            $scope.updateDpid();
                                        } else {
                                            $scope.BYODPlanStage = false;
                                             if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                                                    $scope.ByodtermsError = true;
                                                    error++;
                                                }
                                                if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                                                    $scope.ddpiError = true;
                                                    error++;
                                                }
                                            if (!$rootScope.esignCompleted && error == 0) {
                                                var s_url = "SignatureEsignBYODUrlSend";
                                                var sendData = {
                                                    "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                }
                                                $rootScope.formData.apiLoading = true;
                                                serverService.apiCall(s_url, sendData).then(function (a) {
                                                    var response = a.data
                                                    $rootScope.formData.apiLoading = false;
                                                })
                                                var durl = 'updateDDIP';
                                                var ddata = {
                                                    "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                                                }
                                                serverService.apiCall(durl, ddata);
                                                var url = "DIYDocStageCompletion";
                                                var sendRequest = {
                                                    "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                    "IsDocStageCompleted": true
                                                }
                                                serverService.apiCall(url, sendRequest).then(function (a) { });
                                                var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                                                    backdrop: 'static',
                                                    keyboard: true
                                                });
                                                BYODConfirmRM.show();
                                            }
                                            // $scope.BYODDocument=true;
                                            // $('#collapseDocument').collapse('show');
                                            $scope.getDocsProof();

                                        }
                                    }

                                })
                            } else {
                                $scope.productSentSms();
                                $scope.BYODPlanStage = false;
                                // $scope.BYODDocument=true;
                                // $('#collapseDocument').collapse('show');
                                $scope.getDocsProof();
                                if (error == 0) {
                                    $scope.ByodtermsError = false;
                                     $scope.ddpiError = false;
                                    var error = 0;

                                    // $scope.updateIPVStage();
                                    $scope.foImgError1 = false;
                                    // if (!$scope.signatureimg) {
                                    //     $scope.signatureImgError = true;
                                    //     $("html, body").animate({
                                    //         scrollTop: $("#SPECIMENPROOF").offset().top
                                    //     });
                                    //     error++;
                                    // }
                                    // if (!$scope.overallpan) {
                                    //     $scope.panImgError = true;
                                    //     $("html, body").animate({
                                    //         scrollTop: $("#PANNumber").offset().top
                                    //     });
                                    //     error++;
                                    // }
                                    // if (!$scope.BYODcAddressUpdt) {
                                    //         $scope.cAddressImgError = true;
                                    //         $("html, body").animate({
                                    //             scrollTop: $("#CorrespondenceAddress").offset().top
                                    //         });
                                    //         error++;

                                    // }
                                    // if (!$scope.BYODcAddressUpdt2) {
                                    //     $scope.cAddressBackImgError = true;
                                    //     $("html, body").animate({
                                    //         scrollTop: $("#CorrespondenceAddress2").offset().top
                                    //     });
                                    // }
                                    if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                                        $scope.ByodtermsError = true;
                                        error++;
                                    }
                                    if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                                        $scope.ddpiError = true;
                                        error++;
                                    }
                                    // if($scope.incomeimageByodShow){
                                    //     if(!$scope.incomeimageShows){
                                    //         $scope.foImgError1 = true;
                                    //         error++;
                                    //         $("html, body").animate({
                                    //             scrollTop: $("#Income").offset().top
                                    //         });
                                    //     }
                                    // }
                                    else if (!$rootScope.esignCompleted && error == 0) {
                                        var s_url = "SignatureEsignBYODUrlSend";
                                        var sendData = {
                                            "ReferenceNumber": $rootScope.formData.eRefNumber,
                                        }
                                        $rootScope.formData.apiLoading = true;
                                        serverService.apiCall(s_url, sendData).then(function (a) {
                                            var response = a.data
                                            $rootScope.formData.apiLoading = false;
                                        })
                                        var durl = 'updateDDIP';
                                        var ddata = {
                                           "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                                        }
                                        serverService.apiCall(durl, ddata);
                                        var url = "DIYDocStageCompletion";
                                        var sendRequest = {
                                            "ReferenceNumber": $rootScope.formData.eRefNumber,
                                            "IsDocStageCompleted": true
                                        }
                                        serverService.apiCall(url, sendRequest).then(function (a) { });
                                        var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                                            backdrop: 'static',
                                            keyboard: true
                                        });
                                        BYODConfirmRM.show();
                                    }
                                }
                            }
                            /* } */
                        }

                    } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                        $rootScope.formData.apiLoading = false;
                        $rootScope.formData.panStatus1 = response.ErrorMessage;
                        var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        paninformation.show();
                        return
                    } else {
                        $rootScope.formData.apiLoading = false;
                        var connection = new bootstrap.Modal(document.getElementById('connection'));
                        connection.show();
                    }

                });

            }
        }
        else {
            if (error == 0) {
                $scope.ByodtermsError = false;
                 $scope.ddpiError = false;
                var error = 0;
                if (!$rootScope.formData.assistedLGCode) {
                    $scope.BYODPlanStage = true;
                    $('#collapseProduct').collapse('show');
                    $scope.lgcodereq = true;
                    setTimeout(function () { $scope.owlSet(); }, 500)
                    return;
                } else {
                    $scope.lgcodereq = false;
                }

                // $scope.updateIPVStage();
                $scope.foImgError1 = false;
                // if (!$scope.signatureimg) {
                //     $scope.signatureImgError = true;
                //     $("html, body").animate({
                //         scrollTop: $("#SPECIMENPROOF").offset().top
                //     });
                //     error++;
                // }
                // if (!$scope.overallpan) {
                //     $scope.panImgError = true;
                //     $("html, body").animate({
                //         scrollTop: $("#PANNumber").offset().top
                //     });
                //     error++;
                // }
                // if (!$scope.BYODcAddressUpdt) {
                //         $scope.cAddressImgError = true;
                //         $("html, body").animate({
                //             scrollTop: $("#CorrespondenceAddress").offset().top
                //         });
                //         error++;

                // }
                // if (!$scope.BYODcAddressUpdt2) {
                //     $scope.cAddressBackImgError = true;
                //     $("html, body").animate({
                //         scrollTop: $("#CorrespondenceAddress2").offset().top
                //     });
                //     error++
                // }
                if (!$scope.chkselct6 || !$scope.chkselct3 || !$scope.chkPref || !$scope.chkMITC) {
                    $scope.ByodtermsError = true;
                    error++;
                }
                if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
                    $scope.ddpiError = true;
                    error++;
                }
                // if($scope.incomeimageByodShow){
                //     if(!$scope.incomeimageShows){
                //         $scope.foImgError1 = true;
                //         error++;
                //         $("html, body").animate({
                //             scrollTop: $("#Income").offset().top
                //         });
                //     }
                // }
                if (error > 0) {
                    $('#collapseDocument').collapse('show');
                    return;
                }
                else if (!$rootScope.esignCompleted && error == 0) {
                    var s_url = "SignatureEsignBYODUrlSend";
                    var sendData = {
                        "ReferenceNumber": $rootScope.formData.eRefNumber,
                    }
                    $rootScope.formData.apiLoading = true;
                    serverService.apiCall(s_url, sendData).then(function (a) {
                        var response = a.data
                        $rootScope.formData.apiLoading = false;
                    })
                    var durl = 'updateDDIP';
                    var ddata = {
                        "DDIP": $scope.ddpi? $scope.ddpi :'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading?$rootScope.formData.fields.InternetTrading:'N',
                    }
                    serverService.apiCall(durl, ddata);
                    var url = "DIYDocStageCompletion";
                    var sendRequest = {
                        "ReferenceNumber": $rootScope.formData.eRefNumber,
                        "IsDocStageCompleted": true
                    }
                    serverService.apiCall(url, sendRequest).then(function (a) { });
                    var BYODConfirmRM = new bootstrap.Modal(document.getElementById('BYODConfirmRM'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    BYODConfirmRM.show();
                }
            }
        }
    }

    $scope.android = function () {
        if (window.Android) {
            window.Android.ABLFunc();
        } else {
            console.log("Function not found");
        }
    }
    $scope.productSentSms = function () {
        //if ($rootScope.formData.RMModule && $scope.IswaivedOff) {
        if ($rootScope.BYOD && $scope.iszeropayment) {
            $scope.paymentSkip();
        } else {
            var surl = "RMSendSmsToUserDIY"
            sendData = {
                "ReferenceNumber": $rootScope.formData.ReferenceNumber
            }
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(surl, sendData).then(function (a) {
                $rootScope.formData.apiLoading = false;
                var response = a.data;
                if (response.IsSuccess) {
                    var productSentSmsModal = new bootstrap.Modal(document.getElementById('productSentSmsDialog'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    productSentSmsModal.show();
                    $scope.sentSuccessMessage = response.SuccessMessage
                } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                    $rootScope.formData.apiLoading = false;
                    $rootScope.formData.panStatus1 = response.ErrorMessage;
                    var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    paninformation.show();
                    return
                } else {
                    $scope.ComfirmDocument();
                }
            })
        }
    }
    $scope.DIYUpdateIPVStage = function (process) {


        // if ($rootScope.formData.isgDocSkip) {


        //     const AgreeTC = $('#agree-terms').is(':checked');
        //     if ($scope.foImgUpld && !$scope.foUpdt) {
        //         $scope.foImgError = true;
        //         $("html, body").animate({
        //             scrollTop: $("#Income").offset().top
        //         });
        //         return false;
        //     } else if (!AgreeTC) {
        //         $scope.termsError = true;
        //         return false;
        //     } else if ($scope.ddpi != 'Y') {
        //         $scope.ddpiError = true;
        //         return false;
        //     }
        // } else {

        //     var error = 0;
        //     if (!$scope.docImgCompleted) {
        //         if (!$scope.panImageUpdt) {
        //             $scope.panImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#PANNumber").offset().top
        //             });
        //             error++;

        //         }
        //         if ((!$scope.ibDocumentHide || $scope.ibCkycDocumentShow) && !$scope.signatureUpdt) {
        //             $scope.signatureImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#SPECIMENPROOF").offset().top
        //             });
        //             error++;

        //         }
        //         if ($scope.clientPhoqqualityError || ((!$scope.ibDocumentHide || $scope.ibCkycDocumentShow) && !$scope.photoImageUpdt)) {
        //             $scope.photoImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#clientImageSelfie").offset().top
        //             });
        //             error++;

        //         }
        //         if (!$rootScope.webfinacle) {
        //             if ($scope.chequeUpld && !$scope.bankUpdt && !$rootScope.formData.CKYC) {
        //                 $scope.bankImgError = true;
        //                 $("html, body").animate({
        //                     scrollTop: $("#BankCheque").offset().top
        //                 });
        //                 error++;

        //             }
        //         }
        //         if ((!$scope.ibDocumentHide || $rootScope.IsCorrespondenceSikkim =='Y') && !$scope.cAddressUpdt) {
        //             $scope.cAddressImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#CorrespondenceAddress").offset().top
        //             });
        //             error++;

        //         }
        //         if ((!$scope.ibDocumentHide || $rootScope.IsPermanentSikkim =='Y') && $scope.paddrUpld && !$scope.pAddressUpdt) {
        //             $scope.pAddressImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#PermenantAddress").offset().top
        //             });
        //             error++;

        //         }
        //         if (!$scope.ibDocumentHide && $rootScope.formData.RMModule && !$scope.tcUpdt) {
        //             $scope.tcImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#RMSIGNATURE").offset().top
        //             });
        //             error++;

        //         }

        //         if ($rootScope.formData.RMModule && !$scope.poaUpdt) {
        //             $scope.poaImgError = true;
        //             $("html, body").animate({
        //                 scrollTop: $("#FIRSTPOA").offset().top
        //             });
        //             error++;

        //         }
        //         const AgreeTC = $('#agree-terms').is(':checked');
        //         if (!AgreeTC) {
        //             $scope.termsError = true;
        //             error++;
        //         }

        //         if ($scope.ddpi != 'Y') {
        //             $scope.ddpiError = true;
        //             error++;
        //         }

        //     }

        //     if (process == 'esign') {
        //         error = 0;
        //     }
        // if (error == 0) {

        if (process == 'esign') {
            // $scope.generateAOFPdf()
            var refNo = $rootScope.formData.eRefNumber;
            var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
            $rootScope.formData.apiLoading = true;

            serverService.getApi(e_url).then(function (a) {
                var data = a.data;
                $rootScope.formData.apiLoading = false;
                if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
                    sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
                    frmmain.action = data.eSignApiUrl;
                    $('#msg').val(data.requestXml);
                    document.getElementById("frmmain").submit();
                } else if (data.data) {
                    if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
                        sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
                        frmmain.action = data.data.eSignApiUrl;
                        $('#msg').val(data.data.requestXml);
                        document.getElementById("frmmain").submit();
                    } else { }

                } else { }
            })

        } else {

            $scope.updateIPVStage('');

        }
        // }
        // }
    }
    $scope.updateIPVStage = function (process) {
        var s_url = "DIYUpdateIPVStage";
        var sendData = {
            ReferenceNumber: $rootScope.formData.ReferenceNumber,
            BrowserType: $rootScope.formData.browserType,
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken
        };
        dataLayer.push({
            event: 'StageChange',
            attributes: {
                'level complete': '6',
                'event': 'DIY Document Upload',
                'Application No': $rootScope.formData.ReferenceNumber,
            }
        });
        $('#formPDF').modal('hide');
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            var response = a.data
            if (response == '1' || response == '100' || response == '200') {
                $rootScope.EncryptToken = '';
                sessionStorage.removeItem('AxToken');
                $rootScope.formData.apiLoading = false;

                $state.go('complete', {
                    mobile: $rootScope.formData.EncMobile
                });
                /*setTimeout(function () {
                $('#downloadPOA').modal({
                keyboard: false,
                backdrop: 'static'
                });
                }, 1000)*/

            }

        });
    }
    $scope.ProceedPayment = function () {
        // $rootScope.productLocalSave();
        var tokenParams = {
            'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
            'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
            'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
            'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
        }

        var surl = 'Form/Payment/PaymentRequest.aspx?ReferenceNumber=' + $rootScope.formData.eRefNumber;
        serverService.apiPaymentCall(surl, tokenParams);
    }
    $rootScope.preferencesBYOD = function () {
        var AxisPreferencesBYOD = new bootstrap.Modal(document.getElementById('AxisPreferencesBYOD'), {
            backdrop: 'static',
            keyboard: false
        });
        AxisPreferencesBYOD.show();
    }
    $scope.politicaldefalut = function () {
        $("#pscrelation option:contains(" + $rootScope.formData.fields.political + ")").prop('selected', true);
        $("#pscrelation").val('N');
        $(".select").select2();
        $scope.selectShow = true;
        $rootScope.formData.fields.political = $('#pscrelation').val();
    }
    window.onbeforeunload = function () {

        var Product_Info = new Object();
        if ($("input[type=checkbox]#equity").is(':checked')) {
            Product_Info.stockNSE = 'Y';
            Product_Info.stockBSE = 'Y';
        }

        if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
            Product_Info.foNSE = 'Y';
        }

        if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
            Product_Info.mutualFundsNSE = 'Y';
            Product_Info.BSEMutualFunds = 'Y';
        }

        if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
            Product_Info.commodityMCX = 'Y';
            Product_Info.commodityNCDX = 'Y';
        }

        if ($("input[type=checkbox]#currency").is(':checked')) {
            Product_Info.currencyDerivativesNSE = 'Y';
        }
        Product_Info.AssistLGCode = $rootScope.formData.assistedLGCode;
        Product_Info.AssistLCCode = $rootScope.formData.assistedLCCode;

        var Product_Info_Post = JSON.stringify(Product_Info);
        Product_Info_Stage = "Product_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
        sessionStorage.setItem(Product_Info_Stage, Product_Info_Post);
    }
    setTimeout(function () {
        $("#txtDOB").datepicker({
            changeMonth: true,
            changeYear: true,
            //minDate: "-200Y",
            maxDate: "-18Y",
            dateFormat: 'dd/mm/yy',
            yearRange: "-200: -18",
            onSelect: function () {
                $('#txtDOB').removeClass('ng-empty');
                $('#txtDOB').addClass('ng-not-empty');
                $scope.dobError = false;
                $scope.dobEmpty = false;
                $rootScope.formData.hideBtn = false;
                $scope.$applyAsync();
            }
        });

        $("#txtDOB").datepicker("option", "showAnim", "blind");
    }, 500)

    $scope.verifyKra = function () {
        const path = `VerifyKRAClientStatus`;
        const payload = {
            Mobile: $rootScope.formData.fields.mobile,
            Email: $rootScope.formData.fields.email,
            PanNumber: sessionStorage.getItem('RxPan'),
            DOB: $rootScope.formData.dob ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
            RMCode: $rootScope.formData.fields.rmcode,
            Mode: "B",
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken ? $rootScope.EncryptToken : "",
            ReferenceNumber: $rootScope.formData.ReferenceNumber
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(path, payload).then(function (a) {
            $rootScope.formData.apiLoading = false;
        })
    }

    $scope.newEmailValidate = function () {
        if (!$rootScope.formData.fields.email) {
            $scope.emptyEmail = true;
            $scope.emailErrorMessage = "Please Enter Email";
            return;
        } else {
            $scope.emptyEmail = false;
            $scope.emailErrorMessage = "";
        }
        if ($rootScope.formData.fields.email && !$scope.filter.test($rootScope.formData.fields.email)) {
            $scope.emptyEmail = true;
            $scope.emailErrorMessage = "Please Enter Valid Email";
            return;
        } else {
            $scope.emptyEmail = false;
            $scope.emailErrorMessage = "";
        }
        $scope.getEmailVerificatioUrl();
    }

    $scope.getEmailVerificatioUrl = function () {
        var url = "EmailVerificationUrl";
        sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
            Email: $rootScope.formData.fields.email,
            ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
            Mode: 'B'
        };
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            if (response.IsSuccess) {
                $scope.emailVerificationSend = true;
                sessionStorage.removeItem('changeNumber');
                sessionStorage.setItem('byodemailverifylinksend', true);
                sessionStorage.setItem('byodMail', $rootScope.formData.fields.email);
                $scope.emptyEmail = false;
                $scope.emailErrorMessage = "";
                $scope.byodErrorMessage = "Verification URL has been send to your Email";
                $scope.ModalTrigger("byodModal", true);
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $scope.byodErrorMessage = response.ErrorMessage;
                $scope.ModalTrigger("byodModal", true);
                return;
            } else if (!response.IsSuccess) {
                $scope.emptyEmail = true;
                $scope.emailErrorMessage = response.ErrorMessage;
            }
        }, function (e) {
            $rootScope.formData.apiLoading = false;
        });
    }

    $scope.ModalTrigger = function (id, show) {
        var modal = new bootstrap.Modal(document.getElementById(id), {
            backdrop: 'static',
            keyboard: false
        });
        if (show) {
            modal.show();
        } else {
            modal.hide();
        }
    }

    if (sessionStorage.getItem('byodemailverifylinksend') && sessionStorage.getItem('byodMail')) {
        $scope.emailVerificationSend = true;
        $rootScope.formData.fields.email = sessionStorage.getItem('byodMail');
    }

    $scope.emstatus = function (value, field) {
        if (field) {
            $rootScope.formData.fields.emailBelongs = value;
            $scope.panEmailRegError = false;
        } else {
            $rootScope.formData.fields.mobileBelongs = value;
            $scope.panMobileRegError = false;
        }

    }

    $scope.newMobileValidate = function () {
        if (!$rootScope.formData.fields.mobile) {
            $scope.emptyMobile = true;
            $scope.mobileErrorMessage = "Please Enter Mobile";
        } else if ($rootScope.formData.fields.mobile && !$scope.mobileRegex.test($rootScope.formData.fields.mobile)) {
            $scope.emptyMobile = true;
            $scope.mobileErrorMessage = "Please Enter Valid Mobile Number";
        } else {
            $scope.emptyMobile = false;
            $scope.mobileErrorMessage = "";
            var url = "AuthorizeOTPGeneration";
            if (!$rootScope.formData.fields.email) {
                $rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
            }
            var sendData = {
                'ReferenceNumber': $rootScope.formData.ReferenceNumber,
                'Mobile': $rootScope.formData.fields.mobile,
                'Email': $rootScope.formData.fields.email,
                'MobileFlag': true,
                'EmailFlag': false,
                'IsDiy': true,
                'EncryptToken': $rootScope.EncryptToken,
                'AssistLGCode': $rootScope.formData.assistedLGCode,
                'AssistLCCode': $rootScope.formData.assistedLCCode,
                'City': $rootScope.formData.city,
                'ClientName': $rootScope.formData.clientName,
                "ProvidedEmailIdbelongingto": $rootScope.formData.fields.emailBelongs,
                "Mobilebelongsto": $rootScope.formData.fields.mobileBelongs,
                "PANNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
            };
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(url, sendData).then(function (a) {
                var response = a.data;
                $scope.resendotp = true;
                $rootScope.formData.apiLoading = false;
                $scope.otpSuccess = false;
                if (response.EncryptToken) {
                    $rootScope.EncryptToken = response.EncryptToken;
                    sessionStorage.setItem('AxToken', response.EncryptToken);
                }
                if (response.IsSuccess) {
                    $scope.newOTP = true;
                    $rootScope.OtpLimitExceed = false;
                } else {
                    $rootScope.OtpLimitExceed = true;
                    $scope.newOTP = false;
                    $rootScope.OtpResponseMsg = response.ErrorMessage;
                    var otpresendModal = new bootstrap.Modal(document.getElementById('otp-resend'), {
                        backdrop: 'static',
                        keyboard: false
                    });
                    otpresendModal.show();
                }



            }, function (e) {
                $rootScope.formData.apiLoading = false;

            });

        }

    }



    $scope.changeMobile = function () {

        $scope.showotpMobile = true;

        $scope.oldMobileNumber = $rootScope.formData.fields.mobile;

        sessionStorage.setItem('oldMobile', $rootScope.formData.fields.mobile);

        $rootScope.formData.fields.mobile = "";

        sessionStorage.setItem('changeMobile', true);

    }



    $scope.cancelMobile = function () {

        $scope.showotpMobile = false;

        $rootScope.formData.fields.mobile = $scope.oldMobileNumber;

        $scope.newOTP = false;

        sessionStorage.removeItem('changeMobile');

    }



    $scope.validateOTP = function () {
        $scope.otpEmpty = false;
        if (!$rootScope.formData.fields.otpNew) {
            $scope.otpEmpty = true;
            $scope.otpErrorMessageMobile = 'Please Enter OTP';
            return;
        }
        var url = "UnAuthorizeOTPValidation";
        var sendData = {
            'Mobile': $rootScope.formData.fields.mobile,
            'Email': $rootScope.formData.fields.email,
            "MobileOtpCode": $rootScope.formData.fields.otpNew,
            "EmailOtpCode": "",
            "DOB": ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
            "PanNumber": ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
            "MobileFlag": true,
            "EmailFlag": false,
            "ReferenceNumber": $rootScope.formData.eRefNumber,
            "IsDiy": true,
            "EncryptToken": $rootScope.EncryptToken,
            "ProvidedEmailIdbelongingto": $rootScope.formData.fields.emailBelongs,
            "Mobilebelongsto": $rootScope.formData.fields.mobileBelongs,
            "PANNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            if (!response.IsSuccess) {
                $rootScope.formData.error = response.ErrorMessage;
            }
            if (response.EncryptToken) {
                $rootScope.EncryptToken = response.EncryptToken;
                sessionStorage.setItem('AxToken', response.EncryptToken);
            }



            if (response.IsSuccess) {
                sessionStorage.removeItem('changeMobile');
                $rootScope.formData.apiLoading = true;
                $scope.panMobileVerificationError = false;
                var murl = "MobileByReferenceNumber";
                var msendData = {
                    ReferenceNumber: $rootScope.formData.eRefNumber,
                    Mobile: $rootScope.formData.fields.mobile,
                    MobileFlag: "Y"
                }
                serverService.apiCall(murl, msendData);
                var url = "InsertLandingDetails";
                var sendData = {
                    'AssistLCCode': sessionStorage.getItem('AssistLCCode'),
                    'AssistLGCode': sessionStorage.getItem('AssistLGCode'),
                    'City': sessionStorage.getItem('User_City'),
                    "EmailId": $rootScope.formData.fields.email,
                    "MobileNumber": $rootScope.formData.fields.mobile,
                    "ClientName": sessionStorage.getItem('Username'),
                    "EncryptToken": $rootScope.EncryptToken,
                    "IsDiy": true,
                    "ReferenceNumber": $rootScope.formData.ReferenceNumber
                }
                serverService.apiCall(url, sendData).then(function (a) {
                    var response = a.data;
                    $rootScope.EncryptToken = response.EncryptToken;
                    $rootScope.formData.apiLoading = false;
                    if (response.IsSuccess) {
                        sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
                        sessionStorage.setItem('AxToken', response.Token);
                        $scope.changeNumber = false;
                        $scope.otpSuccess = true;
                        $scope.mobileOTPVerified = true;
                        $scope.showotpMobile = false;
                        sessionStorage.setItem('RMMobileOTPVerified', true);
                        $scope.invalidOTP = false;
                        $scope.newOTP = false;
                    } else {
                        $scope.otpSuccess = false;
                        var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        APIResponseModal.show();
                        $rootScope.apiResponseErrorMsg = response.ErrorMessage;
                    }

                });

            } else {
                $scope.otpSuccess = false;
                $scope.invalidOTP = true;
            }
        }, function (e) {
            $rootScope.formData.apiLoading = false;
        });

    }
    $scope.Disability = function (value) {
        if (value == 'Y') {
            const ele = document.getElementById('DisabilityModal');
            var m = new bootstrap.Modal(ele, {
                backdrop: 'static',
                keyboard: false
            });
            m.show();
        } else {
            $scope.DisabilityVal = value;
            $scope.DisabilityError = false;
            var url = "CaptureDifferentlyAbled";
            var sendData = {
                ReferenceNumber: $rootScope.formData.ReferenceNumber,
                PanNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
                DifferentlyAbledStatus: $scope.DisabilityVal
            }
            serverService.apiCall(url, sendData).then(function (a) {
                var response = a.data;
                if (response.IsSuccess) {
                } else {
                    $scope.Errmsg = response.ErrorMessage
                    const ele = document.getElementById('ErrDisabilityModal');
                    var m = new bootstrap.Modal(ele, {
                        backdrop: 'static',
                        keyboard: false
                    });
                    m.show();
                }
            }, function (e) {
                $rootScope.formData.apiLoading = false;
                var connection = new bootstrap.Modal(document.getElementById('connection'));
                connection.show();
            });
        }
    }
    $scope.DisabilityModalYes = function () {
        var url = "CaptureDifferentlyAbled";
        var sendData = {
            ReferenceNumber: $rootScope.formData.ReferenceNumber,
            PanNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
            DifferentlyAbledStatus: "Y"
        }
        serverService.apiCall(url, sendData).then(function (a) {
            var response = a.data;
            if (response.IsSuccess) {
                $('#existingCustomer-popup').modal('hide');
                signature = '';
                $rootScope.formData = {};
                $rootScope.formData.fields = {};
                sessionStorage.clear();
                $rootScope.verifyemail = false;
                sessionStorage.setItem('Disability', 'Y');
                window.location.assign("https://simplehai.axisdirect.in/");
            } else {
                $scope.Errmsg = response.ErrorMessage
                const ele = document.getElementById('ErrDisabilityModal');
                var m = new bootstrap.Modal(ele, {
                    backdrop: 'static',
                    keyboard: false
                });
                m.show();
            }
        }, function (e) {
            $rootScope.formData.apiLoading = false;
            var connection = new bootstrap.Modal(document.getElementById('connection'));
            connection.show();
        });

    }
    $scope.DisabilityModalNo = function () {
        // Clear selected radio button
        $scope.DisabilityVal = 'N';
        $scope.DisabilityVal = 'N';

        // Also remove checked state manually (optional safeguard)
        document.getElementById("DisabilityYes").checked = false;
        document.getElementById("DisabilityNo").checked = false;

        $scope.DisabilityError = false; // clear error if any
    };
    $scope.OverallDisability = function () {

        $('#existingCustomer-popup').modal('hide');
        signature = '';
        $rootScope.formData = {};
        $rootScope.formData.fields = {};
        sessionStorage.clear();
        $rootScope.verifyemail = false;
        /* sessionStorage.setItem('Disability','Y'); */
        /* $state.go('complete', {
            mobile: $rootScope.formData.EncMobile
        }); */
        window.location.assign("https://simplehai.axisdirect.in/");


    }

    $scope.emailShowChange = function () {
        $scope.changeEmailShow = false;
        sessionStorage.setItem('changeNumber', true)
        $scope.$applyAsync();
    }
}],)