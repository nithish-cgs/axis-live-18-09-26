mainChatApp.controller('closureotpController', ['$scope', '$rootScope', '$http' ,'$state', 'serverService' , function ($scope, $rootScope, $http , $state, serverService ) {
   
    $scope.btnEnabled = true
    $rootScope.closureAccount = true;
    sessionStorage.setItem('closureAccount' , true)
    if ($rootScope.closureAccount) {
        $rootScope.closureAccount = true;
        $rootScope.emailMobile = false;
        $rootScope.pan = false;
        $rootScope.webKarvyShow = true
    } else {
        $rootScope.closureAccount = false;
    }

    $http.get("https://api.ipify.org/?format=json").then(function (response) 
    {
        $scope.ip = response.data.ip;
    });
    var d = new Date();
	$scope.syncDate = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+'  '+d.getHours()+':'+d.getMinutes()+':'+ d.getSeconds();

    console.log($scope.syncDate)
   
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
            "EmailFlag": true,
            "IsDiy": true,
            "EncryptToken": '',
            "SRNumber":sessionStorage.getItem('closuresrNumber'),
            "TimeStamp": $scope.syncDate,
            "IP_Address": $scope.ip
        }
        serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
            if (response.IsSuccess) {
                $state.go('closurethankyou')
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
            'EmailFlag': true,
            'AssistLCCode': '',
            'AssistLGCode': '',
            "SRNumber":sessionStorage.getItem('closuresrNumber'),
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
    $scope.cgetOTP()
   

}])