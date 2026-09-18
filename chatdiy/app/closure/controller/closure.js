function imgUplds(id) {
	if (id == 'BankCheque')
		angular.element(document.getElementById("BankCheque")).scope().imgUpload('BankCheque');
    if (id == 'CLOSURE_SIGNATUREDOCUMENT')
		angular.element(document.getElementById("CLOSURE_SIGNATUREDOCUMENT")).scope().imgUpload('CLOSURE_SIGNATUREDOCUMENT');
    if (id == 'CLOSURE_CMLDOCUMENT')
    angular.element(document.getElementById("CLOSURE_CMLDOCUMENT")).scope().imgUpload('CLOSURE_CMLDOCUMENT');
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
mainChatApp.controller('closureController', ['$scope', '$rootScope', '$state', 'serverService' , function ($scope, $rootScope, $state, serverService ) {
 
    $scope.btnEnabled = true
    $rootScope.closureAccount = true;
    $scope.chequeImageValidation = '';
    $scope.cmlImageValidation = '';
    $scope.sigImageValidation = '';
    sessionStorage.setItem('closureAccount' , true)
    if ($rootScope.closureAccount) {
        $rootScope.closureAccount = true;
        $rootScope.emailMobile = false;
        $rootScope.pan = false;
        $rootScope.webKarvyShow = true
    } else {
        $rootScope.closureAccount = false;
    }
    $(".input-upload").fileinput({
        'showUpload': false,
        'browseLabel': 'UPLOAD',
        'browseIcon': '',
        'previewFileType': 'any'
    });
    setTimeout(function () {
        $(".select").select2();
        // $('.customcheckradio').iCheck({
        //     checkboxClass: 'icheckbox_minimal',
        //     radioClass: 'iradio_minimal'
        // });
       // $("#closureType1").prop('checked', true);
    },100)

    setTimeout(function () {
        $("#txtDOB").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: "-100Y",
            maxDate: "-18Y",
            dateFormat: 'dd/mm/yy',
            yearRange: "-100: -18",
            onSelect: function () {
                $('#txtDOB').removeClass('ng-empty');
                $('#txtDOB').addClass('ng-not-empty');
                $scope.dobError = false;
                $rootScope.formData.hideBtn = false;
                $scope.$apply();
            }
        });
        $("#txtDOB").datepicker("option", "showAnim", "blind");
    }, 100)

    
    $scope.KaresingProcess = function(){
        var e_url = 'GenerateESignPDFClosure?PanNumber=' + sessionStorage.getItem('CPanNumer');
        $rootScope.formData.apiLoading = true;

        serverService.getApi(e_url).then(function (a) {
			var data = a.data;
            $rootScope.formData.apiLoading = false;
            if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
                frmMain.action = data.eSignApiUrl;
                $('#msg').val(data.requestXml);
                document.getElementById("frmMain").submit();
            } else if (data.data && data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
                frmMain.action = data.data.eSignApiUrl;
                $('#msg').val(data.data.requestXml);
                document.getElementById("frmMain").submit();
            } else {
                $rootScope.customerSMS = true;
                $('#customerSMS').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
                return false;
            }
        });
    }

    // pan submit
    $scope.closureInfo = function () {

        var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
        var pan_cfilter = /[a-z]{3}[c|B|T|F|A|H|L|G|J][a-z]{1}\d{4}[a-z]/i;

        if (!angular.isUndefined($rootScope.formData.fields.closurepanNumber) && $rootScope.formData.fields.closurepanNumber != '' && $rootScope.formData.fields.closurepanNumber != null) {
            $scope.panCoVaild = false;
            $scope.panValid = false;
            $scope.panError = false;
            $scope.panInValid = false;
            if (($rootScope.formData.fields.closurepanNumber).length == 10 && (pan_cfilter.test($rootScope.formData.fields.closurepanNumber))) {
                $scope.panValid = false;
                // $scope.panCoVaild = true;
                $scope.panInValid = true;
                $scope.panFocus = true;
                setTimeout(function () {
                    $('#pan').focus();
                }, 10);
                return false;
            } else if (($rootScope.formData.fields.closurepanNumber).length == 10 && (pan_filter.test($rootScope.formData.fields.closurepanNumber))) {
                $scope.panValid = true;
                $scope.panInValid = false;
            } else {
                $scope.panValid = false;
                $scope.panInValid = true;
                setTimeout(function () {
                    $('#pan').focus();
                }, 10);
                return false;
            }
        } else {
            $scope.panValid = false;
            $scope.panError = true;
            $scope.panInValid = false;
            return false;
        }
        var s_url = "ClientClosureDetails";
        var sendData = {
            PanNumber: $rootScope.formData.fields.closurepanNumber,
            ClosureType:0,
            ReasonClosure:'',
            TargetDPID:'',
            TargetClientID:'',
            CML_PATH:'',
            SignaturePath:''
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
            $rootScope.formData.apiLoading = false;
            // if (response.IsSuccess && (response.StatusID != 2 || response.StatusID != '2')) {
            if (response.IsSuccess ) {
                $scope.emailMobile = false;
                $scope.pan = false;
                $rootScope.webKarvyShow = false;
                $scope.closureproceeddetailsshow = true;
               
                $scope.tradingId = response.TradingID
                $scope.dpId = response.ClientID
                sessionStorage.setItem('CPanNumer' , $rootScope.formData.fields.closurepanNumber )
                sessionStorage.setItem('TradingID' , response.TradingID )
                sessionStorage.setItem('ClientID' , response.ClientID )
                sessionStorage.setItem('cPhoneNumber' , response.MobileNumber)
                sessionStorage.setItem('cEmail' , response.Email)
                sessionStorage.setItem('cPhoneNumber' , response.MobileNumber)
                sessionStorage.setItem('closuresrNumber' , response.SRNumber )
                sessionStorage.setItem('cEmail' , response.Email)
                $scope.srNumber = response.SRNumber
                if(response.StatusID == 3 || response.StatusID == '3' ){
                    $state.go('closureotp')
                }
                if(response.StatusID == 2 || response.StatusID == '2' ){
                    $('#formPDFClosure').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                    $rootScope.objURl = serverService.pdfUrl() + "AxisPDF/ClosureIndex.html?PanNumber=" + sessionStorage.getItem('CPanNumer');
                }
                if(response.StatusID == 1 || response.StatusID == '1' ){
                    $scope.btnEnabled = false
                    $scope.tradingshow = true
                }
                
                
                //$state.go('register')
                

            } else {
                $('#APIResponse').modal({
                    backdrop: 'static',
                    keyboard: false
                });
               
                $rootScope.apiResponseErrorMsg = response.Status;
            }
        })
    }
  

    // demat sumbit
    $scope.dematProceed = function(){
      var error = 0;
      if(!$scope.closureType){
          $scope.closuretypeError = true
          error++;
      }else{
        $scope.closuretypeError = false
      }
      if(!$scope.tradingDpNumber){
          $scope.tradingdpIdError = true
          error++;
      }else{
          $scope.tradingdpIdError = false
      }
      if(!$scope.tradingclientId){
          $scope.tradingclientIdError = true
          error++;
      }else{
          $scope.tradingclientIdError = false
      }
           
    if (!$scope.signatureUpdt) {
        $scope.signatureImgError = true;
        $("html, body").animate({
            scrollTop: $("#CLOSURE_SIGNATUREDOCUMENT").offset().top
        });
        error++;
    }
    if (!$scope.cmlUpdt) {
        $scope.cmlImgError = true;
        $("html, body").animate({
            scrollTop: $("#CLOSURE_CMLDOCUMENT").offset().top
        });
        error++;
    }
            
      if(error == 0){
        var s_url = "ClientClosureDetails";
        var sendData = {
            PanNumber: sessionStorage.getItem('CPanNumer').toUpperCase(),
            ClosureType:$scope.closureType,
            ReasonClosure:$rootScope.formData.fields.reason,
            TargetDPID:$scope.tradingDpNumber,
            TargetClientID:$scope.tradingclientId,
            CML_PATH: $scope.cmlImage,
            SignaturePath:$scope.signImage,
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
            $rootScope.formData.apiLoading = false;
            if (response.IsSuccess) {
                $scope.emailMobile = false;
                $scope.pan = false;
                $rootScope.webKarvyShow = true;
                $scope.closureproceeddetailsshow = false;
                sessionStorage.setItem('cPhoneNumber' , response.MobileNumber)
                sessionStorage.setItem('cEmail' , response.Email)
                sessionStorage.setItem('cPhoneNumber' , response.MobileNumber)
                sessionStorage.setItem('cEmail' , response.Email)
                sessionStorage.getItem('CPanNumer' , $rootScope.formData.fields.closurepanNumber)
                //$scope.cgetOTP()
              

                // $state.go('closureotp')
              

                $('#formPDFClosure').modal({
                    backdrop: 'static',
                    keyboard: true
                });
              
                   
                $rootScope.objURl = serverService.pdfUrl() + "AxisPDF/ClosureIndex.html?PanNumber=" + sessionStorage.getItem('CPanNumer');
                   

            } else {
                $('#APIResponse').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                if (response.SuccessMessage == "Already account activated") {
                    $rootScope.apiResponseErrorMsg = "Already account activated";
                } else {
                    $rootScope.apiResponseErrorMsg = "User data not found";

                }
            }
        })
     }

    }

    // otp verified
    $scope.dematVerifiedAccount = function(){
        if(!$rootScope.formData.fields.cmobileOtp){
            $scope.invalidOtp = true
        }else{
            $scope.invalidOtp = false
        }
        var url = "OTPValidationnewForClosure";
        var sendData = {
            'Mobile': sessionStorage.getItem('cPhoneNumber'),
            'Email': sessionStorage.getItem('cEmail'),
            // 'Mobile': '9940882614',
            // 'Email': 'sakthi@constient.com',
            "MobileOtpCode": $rootScope.formData.fields.cmobileOtp,
            "EmailOtpCode": '',
            "MobileFlag": true,
            "EmailFlag": false,
            "IsDiy": true,
            "EncryptToken": ''
        }
        serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
            if (response.IsSuccess) {
                $('#formPDFClosure').modal({
                    backdrop: 'static',
                    keyboard: true
                });
              
                   
                $rootScope.objURl = serverService.pdfUrl() + "AxisPDF/ClosureIndex.html?PanNumber=" + sessionStorage.getItem('CPanNumer');
            }else{
                $scope.invalidOtp = true
            }
        })
    }
    $scope.togglePassword = function () {
        $scope.typePassword = !$scope.typePassword;
    };

    $scope.cgetOTP = function (sendData, resendType) {
        var sendData = {
            'Mobile': sessionStorage.getItem('cPhoneNumber'),
            'Email': sessionStorage.getItem('cEmail'),
            // 'Mobile': '9940882614',
            // 'Email': 'sakthi@constient.com',
            'MobileFlag': true,
            'EmailFlag': false,
            'AssistLCCode': '',
            'AssistLGCode': '',
        };
        var url = "OTPGenerationnewForClosure";
        $scope.changeNumber = false;
        // Resend OTP Link and Second Load Show and Hide based on resendType
        //	if (resendType == '' || resendType == 'mobile') {
        if (resendType == 'mobile') {
            $scope.enableResendButton = false;
            $scope.mobileResendStatus = true; // Send Param EmailFlag As FALSE in OTPValidationnew API call
            $scope.emailResendStatus = false;
            $scope.formData.fields.mobileOTP = '';
        }
        //	if (resendType == '' || resendType == 'email') {
        /*if (resendType == 'email') {
        $scope.enableEmailResendButton = false;
        $scope.emailResendStatus = true;    // Send Param MobileFlag As FALSE in OTPValidationnew API call
        $scope.mobileResendStatus = false;
        $scope.formData.fields.emailOTP = '';
        }*/

        if (resendType == '') {
            $scope.resendCounter(resendType);
        } else if (resendType == 'email') {
            sendData.MobileFlag = false;
            sendData.EmailFlag = false;
            //$scope.resendEmailCounter();
        } else if (resendType == 'mobile') {
            sendData.EmailFlag = false;
            sendData.MobileFlag = true;
            $scope.resendMobileCounter();
        }

        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
            $rootScope.formData.apiLoading = false;
            $('#registration').focus();
            $('#mobileOtp').focus();
            if (response.EncryptToken) {
                $rootScope.EncryptToken = response.EncryptToken;
            } else {
                if ($rootScope.formData.tokenValidation) {
                    $rootScope.clearBrowsingData();
                    $('#APIResponse').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $rootScope.apiResponseErrorMsg = "Session Timed Out";
                    return false;
                }
            }
            $scope.OptBtnEnabled = true
            if (response.IsSuccess) {
                $rootScope.formData.EncMobile = response.EncMobile;
                if (resendType == 'mobile') {
                    $scope.otpreSent = true;
                    $scope.otpSent = false;
                } else {
                    $scope.otpreSent = false;
                    $scope.otpSent = true;
                }
                $scope.resend = true;
                if (response.ErrorCode == '600') {
                    $rootScope.OtpSuccessMsg = response.SuccessMessage;
                    sessionStorage.setItem('ExistingEmailMobile', 'true');
                    $('#otpGenerate').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                } else {
                    $rootScope.OtpLimitExceed = false;
                    /*$('#otp-resend').modal({
                    backdrop: 'static',
                    keyboard: true
                    });*/
                }
                //sessionStorage.setItem('AxToken', response.Token);
            } else {
                $rootScope.OtpLimitExceed = true;
                $scope.resend = false;
                $rootScope.OtpResponseMsg = response.ErrorMessage;
                $scope.otp = false;
                $scope.otpSectionShow = false;
                $scope.showRegistrationBtn = false;
                /*$('#otp-resend').modal({
                backdrop: 'static',
                keyboard: true
                });*/
            }

        }).error(function () {
            $('#connection').modal('show');
        });
    };

   
    $scope.documentuploadpgae = function () {
        $state.go('bank');
    }
   
 
    // $('.setbox').on('click', function () {
	// 	$('html, body').animate({
	// 		scrollTop: 0
	// 	}, 100);
	// 	return false;
	// });
   
    $scope.closeModal = function() {
        var x = document.getElementById("panMsgPopup");
        x.style.display = "none";
        var y = document.getElementById("modal-backdrop");
        y.style.display = "none";
    }
    $scope.closeEsignModal = function() {
        var x = document.getElementById("EsignMsgPopup");
        x.style.display = "none";
        var y = document.getElementById("modal-backdrop");
        y.style.display = "none";
    }

    $scope.DoEsign = function(PanNumber) {
        $('#loader-cs').show();
        var s_url = 'GenerateESignPDFForLead?PanNumber=' + PanNumber
        var sendData = {
            PanNumber:PanNumber
        }
        serverService.getApi(s_url).then(function (a) {
			var response = a.data;
            if (response.IsSuccess && response.requestXml != "") {
                frmMain.action = response.eSignApiUrl;
                $('#msg').val(response.requestXml);
                document.getElementById("frmMain").submit();
            }
            else {
                $('#loader-cs').hide();
                // alert(response.ErrorMessage);
                $scope.ErrorMessage = response.ErrorMessage
                var x = document.getElementById("EsignMsgPopup");
                x.style.display = "block";
                var y = document.getElementById("modal-backdrop");
                y.style.display = "block";
            }
        })

    }

    $scope.imgUpload = function (imgName) {
        var imageName = imgName;
        $scope.IsSelfi = 'N';
        var filesSelected = document.getElementById(imgName).files;

        var fileSize = (filesSelected[0].size);

        var fileName = document.getElementById(imgName).value;

        var preview = document.getElementById("preview");
        if (imgName == 'CLOSURE_CMLDOCUMENT') {
            var allowed_extensions = new Array("jpg", "png", "jpeg", "pdf");
        } else {
            var allowed_extensions = new Array("jpg", "png", "jpeg");
        }

        //var allowed_extensions = new Array("jpg", "png", "jpeg");

        var file_extension = fileName.split('.').pop();
        file_extension = file_extension.toLowerCase();
        var file_index = allowed_extensions.indexOf(file_extension);
       
        $('#badImage').modal('hide');
        if (file_index <= 2 && file_index >= 0) {
            $scope.FileType = "Image";
            if (imgName == "BankCheque") {
                imageName = "BankCheque";
                $scope.bankSizeError = false;
                $scope.bankQImgError = false;
                if (fileSize > 4194304) {
                    $scope.bankSizeError = true;
                } else {
                    var imgFormData = new FormData();
                    imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'));
                    imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
                    imgFormData.append("file", filesSelected[0]);
                    $rootScope.formData.apiLoading = true;

                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            }
            else if (imgName == "CLOSURE_SIGNATUREDOCUMENT") {
                $scope.signatureSizeError = false;
                if (fileSize > 4194304) {
                    $scope.signatureSizeError = true;
                } else {
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            }
            else if (imgName == "CLOSURE_CMLDOCUMENT") {
                $scope.cmlSizeError = false;
                if (fileSize > 4194304) {
                    $scope.cmlSizeError = true;
                } else {
                    $scope.readfiles(filesSelected, imageName);
                }
                $scope.$apply();
            }

        } else {
            if (file_index == 3) {
                if (imgName == "CLOSURE_CMLDOCUMENT") {
                    $scope.iSizeError = false;
                    if (fileSize > 4194304) {
                        $scope.cmlSizeError = true;
                        $('#CLOSURE_CMLDOCUMENT').val('');
                        $("#cmlImage .file-input").empty();
                        $scope.$apply();
                    } else {
                        $scope.pdfReadFn(filesSelected, imageName);
                    }
                }

            }else{
                if (imgName == "BankCheque") {
                    $('#BankCheque').val('');
                    $scope.banktypeError = true;
                    $scope.$apply();
                }
                if (imgName == "CLOSURE_SIGNATUREDOCUMENT") {
                    $('#CLOSURE_SIGNATUREDOCUMENT').val('');
                    $scope.signaturetypeError = true;
                    $scope.$apply();
                }
                if (imgName == "CLOSURE_CMLDOCUMENT") {
                    $('#CLOSURE_CMLDOCUMENT').val('');
                    $scope.cmltypeError = true;
                    $scope.$apply();
                }
            }

        }

    }

    $scope.readfiles = function (files, a) {
        var b = a;
        // remove the existing canvases and hidden inputs if user re-selects new pics
        var existinginputs = document.getElementsByName('images[]');
        var existingcanvases = document.getElementsByTagName('canvas');
        while (existinginputs.length > 0) { // it's a live list so removing the first element each time
            // DOMNode.prototype.remove = function() {this.parentNode.removeChild(this);}
            form.removeChild(existinginputs[0]);
            preview.removeChild(existingcanvases[0]);
        }

        for (var i = 0; i < files.length; i++) {
            $scope.processfile(files[i], b); // process each file at once
        }
        files.value = ""; //remove the original files from fileinput
        // TODO remove the previous hidden inputs if user selects other files
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

        //		preview.appendChild(canvas);

        return canvas.toDataURL("image/jpeg", 1);

    }

    $scope.update_img = function (imgName, imgValue, resized) {
        if (imgName == "BankCheque") {
            $('#BankCheque').val('');
            $('#bankImage .file-input').empty();
            $scope.bankLoad = true;
            $scope.banktypeError = false;
        }
        if (imgName == "CLOSURE_SIGNATUREDOCUMENT") {
            $('#CLOSURE_SIGNATUREDOCUMENT').val('');
            $('#clientSignature .file-input').empty();
            $scope.signatureLoad = true;
            $scope.signaturetypeError = false;
        }
        if (imgName == "CLOSURE_CMLDOCUMENT") {
            $('#CLOSURE_CMLDOCUMENT').val('');
            $('#cmlImage .file-input').empty();
            $scope.cmlLoad = true;
            $scope.cmltypeError = false;
        }

        $scope.updateImage(imgName, imgValue, $scope.FileType, '');

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

    $scope.updateImage = function (imgName, imgValue, fileType, docId) {
        if ($scope.ipvStage) {
            $scope.ipvStage = false;
        }
        var s_url = "DIYImageUpload";
        $rootScope.formData.apiLoading = true;

        var sendData = {
            ImageName: imgName,
            ReferenceNumber:$scope.srNumber,
            DocumentType:0,
            Image: imgValue,
            Extention: fileType
        }

        serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
            $rootScope.formData.apiLoading = false;
            // $scope.getImages();

            // $scope.bankUpdt = true;
            // $scope.signatureUpdt = true;
            // $scope.cmlUpdt = true;
            // $scope.chequeImageValidation = true;
            // $scope.bankLoad = false;
            // $scope.bankImgError = false;
            // $scope.banktypeError = false;

            if (response.IsSuccess) {
                if (imgName == "CLOSURE_SIGNATUREDOCUMENT") {
                    $scope.signatureUpdt = true;
                    $scope.signatureLoad = false;
                    $scope.signatureImgError = false;
                    $scope.signaturetypeError = false;
                    $scope.sigImageValidation = true;
                    $scope.signImage = response.ReturnURL
                }
                if (imgName == "CLOSURE_CMLDOCUMENT") {
                    $scope.cmlUpdt = true;
                    $scope.cmlLoad = false;
                    $scope.cmlImgError = false;
                    $scope.cmltypeError = false;
                    $scope.cmlImageValidation = true;
                    $scope.cmlImage = response.ReturnURL
                }
            }

        });
    }

}])