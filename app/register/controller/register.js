mainApp.controller('registerController', ['$scope', '$rootScope', '$state', 'serverService', '$compile', function ($scope, $rootScope, $state, serverService, $compile) {
	$scope.showRegistrationBtn = false;
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
	$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;  //live
	// $scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
	//$scope.filter = /^[\w-\.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/; //local
	$scope.isMobileVerified = 'N';
	$scope.isEmailVerified = 0;
	$scope.Pannamemismatched = false;
	$scope.panErrMis = false;
	$scope.dobEnteruser = false;
	$scope.rmotpSectionShowStage = false;
	$scope.nameonCardPan = true;
	$scope.panRmDbo = false;
	$scope.allowEsign = false;
	$rootScope.formData.fields.UtmCityNameNew = "0";
	$rootScope.utmCityNameList = [{
		id: 1,
		name: 'Mumbai'
	}, {
		id: 2,
		name: 'Pune'
	}, {
		id: 3,
		name: 'Delhi'
	}]
	$scope.CountrySelctError = false;
	$scope.chkselct = false;
	$scope.validationmsg = false;
	$scope.couponShow = false;
	$scope.couponErrorMessage = "";
	$scope.pancouponerrorMsg = "";
	$scope.EmailField = false;
	$rootScope.Errcode = "";
	$scope.showAllCards = false;
	$rootScope.MobEmailErrorMessage = "";
	$rootScope.ibmbAssists = "";
	setTimeout(function () {
		$(':radio[name=ritype][value=RI]').iCheck('check');
		$('.customcheckradio').iCheck({
			checkboxClass: 'icheckbox_minimal',
			radioClass: 'iradio_minimal'
		});

		$('.modal').modal('hide');
		$(document.body).removeClass('modal-open');
		$('body').css({ 'overflow': 'auto', 'padding': '0' });
		$('.modal-backdrop').remove();
		$('.select').select2();
	}, 500)

	if (lgcode) {
		$rootScope.formData.assistedLGCode = lgcode;
		$scope.disableLG = true;
	}

	if (lccode) {
		$rootScope.formData.assistedLCCode = lccode;
		$scope.disableLC = true;
	}

	if (referral_code) {
		$rootScope.formData.referralCode = referral_code;
		$scope.disableRC = true;
	}
	if (sessionStorage.getItem('coupon')) {
		$rootScope.formData.fields.coupon = sessionStorage.getItem('coupon');
	}
	if (sessionStorage.getItem('Campaign') == 'Campaign') {
		$rootScope.Newutmsour = true;
		$scope.EmailField = false;
	}
	if ($rootScope.searchParams.utm_source === 'IPOWATCH') {
		$rootScope.formData.assistedLGCode = "IFJIGAR";
		$scope.disableLG = true;
	}
	if ($rootScope.searchParams.utm_source === 'IFCHITTORGARH') {
		$rootScope.formData.assistedLGCode = "IFCHITTORGARH";
		$scope.disableLG = true;
	}
	if ($rootScope.searchParams.utm_source === 'BAJAJFINSERV') {
		$rootScope.formData.assistedLGCode = "RFBAJAJMARKET";
		$scope.disableLG = true;
	}
	if (sessionStorage.getItem('RxMobile')) {
		$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile')
		$scope.EmailField = true;
	}
	var i = 0;
	function fn60sec() {
		if (i == 0) {
			$(".text-animation-area .step1").removeClass('axTextActive').addClass('axTextHide');
			$(".text-animation-area .step2").removeClass('axTextSSemiStart').addClass('axTextActive');
		} else if (i == 1) {
			$(".text-animation-area .step1").removeClass().addClass('axremoveText');
			$(".text-animation-area .step2").removeClass('axTextActive').addClass('axTextHide');
			$(".text-animation-area .step3").removeClass('axTextSemiStart').addClass('axTextActive');
			$(".text-animation-area .step3 i").removeClass().addClass('icon icon-circle-check');
			//$(".text-animation-area .step4").removeClass('axTextStart').addClass('axTextSemiStart');
		} else if (i == 2) {
			$(".text-animation-area .step2").removeClass().addClass('axremoveText');
			$(".text-animation-area .step3").removeClass().addClass('axTextHide');
			$(".text-animation-area .step4").removeClass('axTextSemiStart').addClass('axTextActive');
			$(".text-animation-area .step4 i").removeClass().addClass('icon icon-circle-check');
		}
		i++;
	}

	if ($rootScope.getAPI) {
		if (sessionStorage.getItem('RxReferenceNumber') != null && sessionStorage.getItem('DobgetMismatch') == 'Y' && sessionStorage.getItem('namegetMismatch') == 'Y') {
			$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
			$rootScope.getDIYStatus();
		}
	}

	if (sessionStorage.getItem('coupon')) {
		$rootScope.formData.fields.coupon = sessionStorage.getItem('coupon');
	}

	$rootScope.formData.fields.authorize = true;

	$("html, body").animate({
		scrollTop: 0
	}, "slow");

	$('.info-cat').bind('mouseover touchstart', function () {
		$(this).siblings('.info-details').show();
		$(this).parents('p').siblings('.info-details').show();
	});

	$('.info-cat').bind('mouseleave touchend', function () {
		$(this).siblings('.info-details').hide();
		$(this).parents('p').siblings('.info-details').hide();
	});
	$rootScope.formData.stageOrder = 1;

	if ($rootScope.formData.ReferenceNumber) {
		if (sessionStorage.getItem("RxPan") != null && sessionStorage.getItem("RxPan") != 'undefined') {
			$rootScope.formData.fields.panNumber = sessionStorage.getItem("RxPan");
		}
		if (sessionStorage.getItem('DOB') != null && sessionStorage.getItem('DOB') != 'undefined') {
			$rootScope.formData.fields.DOB = sessionStorage.getItem('DOB');
		}
	} else {
		if (!$rootScope.webJana && !tok) {
			if ((!$rootScope.vcip && sessionStorage.getItem('mode') != "V") && !$rootScope.BYOD) {
				$rootScope.formData.fields.panNumber = '';
				$rootScope.formData.fields.DOB = '';
			}
		}
	}
	if ($rootScope.vcip || $rootScope.BYOD) {
		$('#pan').prop('disabled', true)
	}

	if ($rootScope.formData.ReferenceNumber) {
		var s_url = "DIYGetRegistrationInfoByReferenceNumber";

		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		};

		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {
				$rootScope.formData.fields.panNumber = response.ObjCDIYClientProfile.PanNumber;
				$rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
				$rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
				$rootScope.formData.fields.DOB = response.ObjCDIYClientProfile.DOB;
				if (response.ObjCDIYClientProfile.IBMBAssistedRM) {
					$rootScope.ibmbAssists = response.ObjCDIYClientProfile['IBMBAssistedRM'];
				}
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
	}
	const ele = document.getElementById('OTPpopMobile')
	if (ele) {
		var OTPpopMobile = new bootstrap.Modal(ele, {
			backdrop: 'static',
			keyboard: false
		});
	}
	if (OTPpopMobile) {
		OTPpopMobile.hide();
	}
	// Remove Spaces
	$scope.removeSpaces = function (string) {
		return string.split(' ').join('');
	};

	$scope.resendCounter = function (resendType) {
		var counter1 = 59;
		$scope.counter = "00:00";
		$scope.emailcounter = "00:00";
		$scope.counter = "00:59";
		$scope.emailcounter = "00:59";
		runTimer = setInterval(function () {
			counter1--;
			if (counter1 < 10) {
				counter1 = "0" + counter1;
			}
			$scope.counter = '00:' + counter1.toString();
			$scope.emailcounter = '00:' + counter1.toString();
			if (counter1 < 1) {
				$scope.enableResendButton = true;
				$scope.enableEmailResendButton = true;
				clearInterval(runTimer);
			}
			$scope.$applyAsync();
		}, 1000);
	}

	$scope.resendMobileCounter = function () {
		$scope.emailResendDisable = true;
		var m_count = 59;
		$scope.counter = "00:59";
		runTimer = setInterval(function () {
			m_count--;
			if (m_count < 10) {
				m_count = "0" + m_count;
			}
			$scope.counter = '00:' + m_count.toString();
			if (m_count < 1) {
				$scope.emailResendDisable = false;
				$scope.enableResendButton = true;
				clearInterval(runTimer);
			}
			$scope.$applyAsync();
		}, 1000);
	}

	/* $scope.resendEmailCounter = function () {
		$scope.mobileResendDisable = true;
		var e_count = 59;
		$scope.emailcounter = "00:59";
		runTimer = setInterval(function () {
			e_count--;
			if (e_count < 10) {
				e_count = "0" + e_count;
			}
			$scope.emailcounter = '00:' + e_count.toString();
			if (e_count < 1) {
				$scope.mobileResendDisable = false;
				$scope.enableEmailResendButton = true;
				clearInterval(runTimer);
			}
			$scope.$applyAsync();
		}, 1000);
	} */
	var runTimer;


	$scope.resendCounter = function () {


		// clear old timer if exists
		if (runTimer) {
			clearInterval(runTimer);
		}


		let counter = 59;


		$scope.enableResendButton = false;
		$scope.counter = "00:59";


		runTimer = setInterval(function () {
			counter--;


			let displayCounter = counter < 10 ? '0' + counter : counter;
			$scope.counter = '00:' + displayCounter;


			if (counter <= 0) {
				clearInterval(runTimer);
				$scope.enableResendButton = true;
			}


			$scope.$applyAsync();
		}, 1000);
	};




	$scope.CountryChange = function (countryName) {
		if (countryName) {
			$rootScope.formData.fields.UtmCityNameNew = countryName;
			$scope.CountrySelctError = false;
		}
	}

	$scope.termss = function (event) {
		$scope.chkselct = event;
		if ($scope.chkselct) {
			$scope.validationmsg = false;
		}
	}


	// $scope.firstStage = function () {
	// 	 $scope.validationmsg = false;
	// 	if ($rootScope.formData.ReferenceNumber) {
	// 		$scope.emailMobile = false;
	// 		$scope.otp = false;
	// 		$rootScope.pan = true;
	// 		$rootScope.formData.stageInfo = '1b';
	// 		$("html, body").animate({
	// 			scrollTop: 0
	// 		}, "slow");
	// 	} else {


	// 		$scope.error = 0;


	// 		if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '') {
	// 			$scope.emptyMobile = true;
	// 			$scope.error++;
	// 			$('#mobile').focus();
	// 		} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
	// 			$scope.invalidMobile = true;
	// 			$scope.error++;
	// 			$('#mobile').focus();
	// 		}

	// 		if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '') {
	// 			$scope.emptyEmail = true;
	// 			$scope.error++;
	// 			$('#emailID').focus();
	// 		} else if (!($scope.filter).test($rootScope.formData.fields.email)) {
	// 			$scope.invalidEmail = true;
	// 			$scope.error++;
	// 			$('#emailID').focus();
	// 		}

	// 		var chkselct = $scope.chkselct;
	// 		if ((chkselct == false || chkselct == undefined)){
	// 		$scope.validationmsg = true;
	// 		$scope.error++;
	// 		}
	// 		else {
	// 			var e = $rootScope.formData.fields.email.split('@');
	// 			var c = e[0].toLowerCase();
	// 			if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
	// 				$scope.invalidEmail = true;
	// 				$scope.error++;
	// 				$('#emailID').focus();
	// 			}
	// 		}

	// 		if ($scope.error == 0) {
	// 			$scope.showRegistrationBtn = true;
	// 			$scope.otpSectionShow = true;
	// 			$rootScope.selectedCity = 'city';
	// 			if ($scope.otpVerified) {
	// 				$scope.emailMobile = false;
	// 				$rootScope.pan = true;
	// 				$('#pan').focus();
	// 				$rootScope.formData.stageInfo = '1b';

	// 			} else if ($rootScope.formData.fields.authorize) {
	// 				$rootScope.formData.fields.otpMobile = '';
	// 				$scope.invalidOTP = false;
	// 				$rootScope.otpFailure = false;
	// 				if ($scope.resend) {
	// 					$scope.resendOTP('');
	// 				} else {
	// 					$scope.generateOTP();
	// 				}
	// 			} else {
	// 				$scope.authorizeError = true;
	// 			}
	// 		}
	// 	}
	// };

	$scope.firstStage = function () {
		$scope.validationmsg = false;
		$scope.invalidEmail = false;
		$scope.invalidMobile = false;
		if ($rootScope.formData.ReferenceNumber) {
			$scope.emailMobile = false;
			$scope.otp = false;
			$rootScope.pan = true;
			$rootScope.formData.stageInfo = '1b';
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
		} else {


			$scope.error = 0;
			// if ($rootScope.formData.fields.username == null || $rootScope.formData.fields.username == '') {
			// 	$scope.emptyUsername = true;
			// 	$scope.error++;
			// 	$('#username').focus();
			// }

			if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '') {
				$scope.emptyMobile = true;
				$scope.error++;
				$('#mobile').focus();
			} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
				$scope.invalidMobile = true;
				$scope.error++;
				$('#mobile').focus();
			}
			var chkselct = $scope.chkselct;
			if ((chkselct == false || chkselct == undefined) && (!$scope.EmailField)) {
				$scope.validationmsg = true;
				$scope.error++;
			}
			if ($scope.EmailField) {
				if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '') {
					$scope.emptyEmail = true;
					$scope.error++;
					$('#emailID').focus();
				} else if (!($scope.filter).test($rootScope.formData.fields.email)) {
					$scope.invalidEmail = true;
					$scope.emptyEmail = true;
					$scope.error++;
					$('#emailID').focus();
				}
				// if($rootScope.formData.fields.UtmCityNameNew == "0" && $rootScope.NewLandingPage){
				// 	$scope.CountrySelctError = true;
				// 	$scope.error++;
				// 	return;
				// }


				var e = $rootScope.formData.fields.email.split('@');
				var c = e[0].toLowerCase();
				if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
					$scope.invalidEmail = true;
					$scope.error++;
					$('#emailID').focus();
				}

			}
			// if ($('#city_value').val() == null || $('#city_value').val() == '') {
			// 	$scope.emptyCityName = true;
			// 	$scope.error++;
			// 	$('#city').focus();
			// }
			// var cityArray = [];
			// cityArray = JSON.parse(sessionStorage.getItem('CityArray'));
			// var cityName = $('#city_value').val();
			// if (cityArray != null && cityName.length != 0) {
			// 	if (cityArray.indexOf(cityName.charAt(0).toUpperCase() + cityName.slice(1)) > -1) {
			// 		$scope.invalidCityName = false;
			// 	} else {
			// 		$scope.error++;
			// 		$scope.invalidCityName = true;
			// 	}
			// } else if (cityName.length < 3 && cityName.length > 1) {
			// 	$scope.invalidCityName = true;
			// }
			if ($scope.error == 0) {
				$scope.showRegistrationBtn = true;
				$scope.otpSectionShow = true;
				$rootScope.selectedCity = 'city';
				if ($scope.otpVerified) {
					$scope.emailMobile = false;
					$rootScope.pan = true;
					$('#pan').focus();
					$rootScope.formData.stageInfo = '1b';

				} else if ($rootScope.formData.fields.authorize) {
					$rootScope.formData.fields.otpMobile = '';
					$scope.invalidOTP = false;
					$rootScope.otpFailure = false;
					// if ($scope.EmailField && $rootScope.Newutmsour) {
					// 	$scope.emailvalidatenew();
					// }
					if ($scope.resend) {
						$scope.resendOTP('');
					} else {
						$scope.generateOTP();
					}
				} else {
					$scope.authorizeError = true;
				}
			}
		}
	};

	$scope.editMobileNumber = function () {
		$scope.showRegistrationBtn = false;
		$scope.otpSectionShow = false;
		$scope.showRegistrationBtn = false;
		$scope.otp = false;
		setTimeout(function () {
			$('#mobile').focus();
		}, 10);
	};

	$('label.refer-association input[type="checkbox"]').on("ifChecked", function () {
		$rootScope.formData.fields.authorize = true;
		$scope.authorizeError = false;
		$scope.$applyAsync();
	}).on("ifUnchecked", function () {
		$rootScope.formData.fields.authorize = false;
		$scope.$applyAsync();
	});

	$scope.generateOTP = function () {

		$scope.otp = true;
		$('#city_value').css({
			"pointer-events": "none",
			"cursor": "not=allowed"
		});
		var sendData = {
			'Mobile': $rootScope.formData.fields.mobile,
			'Email': $rootScope.formData.fields.email,
			'MobileFlag': $scope.EmailField ? false : true,
			'EmailFlag': $scope.EmailField ? true : false,
			'AssistLCCode': $rootScope.formData.assistedLCCode,
			'AssistLGCode': $rootScope.formData.assistedLGCode,
			'City': $('#city_value').val(),
			'ClientName': $rootScope.formData.fields.username,
		};
		var mobile = $rootScope.formData.fields.mobile;
		$rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);
		$rootScope.ShowEmailOtp = true;
		if ($rootScope.formData.fields.email) {
			$rootScope.formData.otpEmail = ($rootScope.formData.fields.email).substring(0, 3) + "XXXXXXX" +
				($rootScope.formData.fields.email).substring(10, $rootScope.formData.fields.email.length);
		}

		$scope.getOTP(sendData, '');

	}

	$scope.$watch('cityname', function (newdata, old) {
		$rootScope.formData.fields.cityName = newdata;
	});

	$scope.resendOTP = function (resendType) {
		var mobile = $rootScope.formData.fields.mobile;
		var email = $rootScope.formData.fields.email;
		$scope.error = 0;
		$scope.sameNumber = false;

		var sendData = {
			'Mobile': mobile,
			'Email': email,
			'MobileFlag': $scope.EmailField ? false : true,
			'EmailFlag': $scope.EmailField ? true : false,
			'AssistLCCode': $rootScope.formData.assistedLCCode,
			'AssistLGCode': $rootScope.formData.assistedLGCode,
			'City': $('#city_value').val(),
			'ClientName': $rootScope.formData.fields.username,
		};
		if ($scope.error == 0) {
			if (resendType == "mobile") {
				$rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);
				$rootScope.formData.otpEmail = undefined;
				$rootScope.formData.otpEmailsent = false;
			} else {
				$rootScope.formData.otpMobile = ($rootScope.formData.fields.email).substring(0, 3) + "XXXXXXX" +
					($rootScope.formData.fields.email).substring(10, $rootScope.formData.fields.email.length);;
				$rootScope.formData.otpEmail = undefined;
				$rootScope.formData.otpEmailsent = true;
			}
			var sendData = {
				'Mobile': mobile,
				'Email': email,
				'MobileFlag': $scope.EmailField ? false : true,
				'EmailFlag': $scope.EmailField ? true : false,
				'AssistLCCode': $rootScope.formData.assistedLCCode,
				'AssistLGCode': $rootScope.formData.assistedLGCode,
				'City': $('#city_value').val(),
				'ClientName': $rootScope.formData.fields.username,
			};
			$scope.otp = true;
			$('#city_value').css({
				"pointer-events": "none"
			});
			$scope.getOTP(sendData, resendType);
		}
	}

	$scope.otpBlur = function () {
		$('button.btn-primary').focus();
	}
	$scope.aotpBlur = function () {
		$('button.validate-otps').focus();
	}

	$scope.getOTP = function (sendData, resendType) {
		if ($rootScope.CreditCard) {


			// Mapping table for all credit card campaigns
			const campaignPrefixes = {
				'Magnus': 'MAG',
				'Olympus': 'OLY',
				'Magnus Burgundy': 'MGB',
				'Reserve': 'RES'
			};
			// normalize UTM medium text
			const medium = (utm_medium || '').trim();
			// find prefix for the current campaign
			const expectedPrefix = campaignPrefixes[medium] || '';


			const enteredCoupon = ($rootScope.formData?.fields?.coupon || '').trim();


			// validate prefix
			if (expectedPrefix && !enteredCoupon.startsWith(expectedPrefix)) {
				var CreditcardErrModal = new bootstrap.Modal(document.getElementById('CreditcardErr'), {
					backdrop: 'static',
					keyboard: false
				});
				CreditcardErrModal.show();
				$scope.couponErrorMessage =
					'Oops! The coupon code link doesn’t look valid. You can still open your account normally without the special offer.';
				return
			} else {
				$scope.couponErrorMessage = ''; // clear error if valid
			}
		}

		var url = "OTPGenerationnewEnc";
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
			sendData.EmailFlag = true;
			$scope.resendCounter(resendType);
		} else if (resendType == 'mobile') {
			sendData.EmailFlag = false;
			sendData.MobileFlag = true;
			$scope.resendCounter(resendType);
		}

		sendData.CouponCode = ($rootScope.jio || $rootScope.CreditCard) && $rootScope.formData.fields.coupon || "";

		sendData = $rootScope.encryptReq(sendData);

		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = $rootScope.decryptRes(a.data, 'Response');
			$rootScope.formData.apiLoading = false;
			$('#registration').focus();
			$('#mobileOtp').focus();
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
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
			// if(response.ErrorCode == 'RESUME_ON_INNODIGITAL'){
			//     $rootScope.nextStage = response.NextStage;
			//     $rootScope.redirectLink = response.RedirectUrl;
			//     var InnodigitalModal = new bootstrap.Modal(document.getElementById('Innodigital'), {
			//                 backdrop: 'static',
			//                 keyboard: false
			//             });
			//         InnodigitalModal.show();
			//         return;
			// }


			// if (!response.IsSuccess && (response.ErrorCode == 'E004' || response.ErrorCode == 'E002' || response.ErrorCode == 'E003' || response.ErrorCode == 'E005')) {
			//     $rootScope.Errcode = response.ErrorCode
			//         var MailMobErrModal = new bootstrap.Modal(document.getElementById('MailMobErr'), {
			//                 backdrop: 'static',
			//                 keyboard: false
			//             });
			//         MailMobErrModal.show();
			// 									 $scope.otp = false;
			//         $rootScope.MobEmailErrorMessage = response.ErrorMessage;
			// 		const el = angular.element(document.querySelector('#MobEmailErrorDiv'));
			// el.html(response.ErrorMessage);
			// $compile(el.contents())($scope);
			//     // $scope.MobEmailErrorMessage = response.ErrorMessage;
			//     $scope.$evalAsync();
			//     return;
			// }

			if (!response.IsSuccess && (response.ErrorCode == '501' || response.ErrorCode == '502')) {
				if ($rootScope.CreditCard) {
					var CreditcardErrModal = new bootstrap.Modal(document.getElementById('CreditcardErr'), {
						backdrop: 'static',
						keyboard: false
					});
					CreditcardErrModal.show();
					$scope.couponErrorMessage = response.ErrorMessage;
				}

				$scope.couponErrorMessage = response.ErrorMessage;
				$scope.$evalAsync();
				return;
			} else {
				$scope.couponErrorMessage = "";
				$scope.$evalAsync();
			}

			if (response.IsSuccess) {
				gtag_report_conversion();
				if ($rootScope.formData.fields.coupon) {
					sessionStorage.setItem('coupon', $rootScope.formData.fields.coupon);
				}
				OTPpopMobile.show();
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
					var otpGenerate = new bootstrap.Modal(document.getElementById('otpGenerate'), {
						backdrop: 'static',
						keyboard: true
					});
					otpGenerate.show();
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
				OTPpopMobile.hide();
				$('#OTPpopMobile').modal('hide');
				/*$('#otp-resend').modal({
				backdrop: 'static',
				keyboard: true
				});*/
			}

		}, function (e) {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();;
		});
	};

	$rootScope.otpExist = function () {
		/*$('#otp-resend').modal({
		backdrop: 'static',
		keyboard: true
		});*/
	}

	$scope.redirectToRegister = function () {
		if ($rootScope.formData.RMModule) {
			sessionStorage.clear();
			history.back();
		} else {
			sessionStorage.clear();
			location.reload();
		}
	}
	// $scope.redirectToRegister = function () {
	// 	sessionStorage.clear();
	// 	location.reload();
	// }

	$scope.redirectToIB = function () {
		window.location.assign('https://omni.axisbank.co.in/axisretailbanking/');
	}

	$scope.togglePassword = function (a) {
		if (a == 'mobile') {
			$scope.typePassword = !$scope.typePassword;
		} else if (a == 'email') {
			$scope.typePassword = !$scope.typePassword;
		} else if (a == 'rmmobile') {
			$scope.rmmtypePassword = !$scope.rmmtypePassword;
		} else if (a == 'rmemail') {
			$scope.rmetypePassword = !$scope.rmetypePassword;
		}
	};
	$rootScope.emailno = function () {
		$scope.EmailField = true;

	}
	//$scope.toggleEmailPassword = function () { $scope.typeEmailPassword = !$scope.typeEmailPassword; };

	// $scope.validateOTP = function () {
	// 	$scope.error = 0;
	// 	if (angular.isUndefined($rootScope.formData.fields.mobileOTP) || $rootScope.formData.fields.mobileOTP == null || $rootScope.formData.fields.mobileOTP == '') {
	// 		$scope.emptyMobileOTP = true;
	// 		$scope.error++;
	// 		$('#mobileOTP').focus();
	// 	}




	// 	if ($scope.error == 0) {

	// 		$rootScope.formData.apiLoading = true;
	// 		var url = "OTPValidationnewEncS";
	// 		var sendData = {
	// 			'Mobile': $rootScope.formData.fields.mobile,
	// 			'Email': $rootScope.formData.fields.email,
	// 			"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
	// 			"EmailOtpCode": '',
	// 			"MobileFlag": true,
	// 			"EmailFlag": false,
	// 			"IsDiy": true,
	// 			"EncryptToken": $rootScope.EncryptToken
	// 		}

	// 		if (sessionStorage.getItem('MobileVerified') != null || sessionStorage.getItem('MobileVerified') != 'Y') {
	// 			sendData.MobileFlag = true;
	// 		} else {
	// 			sendData.MobileFlag = false;
	// 		}
	// 		if (sessionStorage.getItem('EmailVerified') != null || sessionStorage.getItem('EmailVerified') != 'Y') {
	// 			sendData.EmailFlag = false;
	// 		} else {
	// 			sendData.EmailFlag = false;
	// 		}
	//         sendData = $rootScope.encryptReq(sendData);
	// 		serverService.apiCall(url, sendData).then(function (a) {
	// 			var response = $rootScope.decryptRes(a.data , 'Response');
	// 			$rootScope.apiResponseErrorMsg = '';
	// 			$scope.mobileResendStatus = false;
	// 			$scope.emailResendStatus = false;
	// 			$rootScope.formData.apiLoading = false;

	// 			if (response.EncryptToken) {
	// 				$rootScope.EncryptToken = response.EncryptToken;
	// 			} else {
	// 				if ($rootScope.formData.tokenValidation) {
	// 					$rootScope.clearBrowsingData();
	// 					var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
	// 							backdrop: 'static',
	// 							keyboard: false
	// 						});
	// 					APIResponseModal.show();
	// 					$rootScope.apiResponseErrorMsg = "Session Timed Out";
	// 					return false;
	// 				}
	// 			}
	// 			gtag('event', 'conversion', {
	// 				'send_to': 'AW-727858862/jhgJCIr7mfIBEK79iNsC'
	// 			  });
	// 			if (response.EmailVerified == 'Y') {
	// 				sessionStorage.setItem('EmailVerified', 'Y')
	// 			}
	// 			if (response.MobileVerified == 'Y') {
	// 				sessionStorage.setItem('MobileVerified', 'Y')
	// 			}
	// 			if (response.IsSuccess) {
	// 				gtag_report_verified();
	// 				var url = "CheckEmailMobileStatusEnc";
	// 				var sendData = {
	// 					'Mobile': $rootScope.formData.fields.mobile,
	// 					'Email': $rootScope.formData.fields.email,
	// 					'EncryptToken': $rootScope.EncryptToken,
	// 					"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
	// 					"EmailOtpCode": '',
	// 					"IsDiy": true
	// 				}
	//                 sendData = $rootScope.encryptReq(sendData);
	// 				serverService.apiCall(url, sendData).then(function (a) {
	// 					var response = $rootScope.decryptRes(a.data , 'Response');
	// 					if (response.EncryptToken) {
	// 						$rootScope.EncryptToken = response.EncryptToken;
	// 					} else {
	// 						if ($rootScope.formData.tokenValidation) {
	// 							$rootScope.clearBrowsingData();
	// 							var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
	// 									backdrop: 'static',
	// 									keyboard: false
	// 								});
	// 							APIResponseModal.show();
	// 							$rootScope.apiResponseErrorMsg = "Session Timed Out";
	// 							return false;
	// 						}
	// 					}
	// 					if (response.IsSuccess) {
	// 						OTPpopMobile.hide();
	// 						$rootScope.UpdateTempPersistenceResume();
	// 						$scope.emailMobile = false;
	// 						$scope.otp = false;
	// 						$rootScope.pan = true;
	// 						$rootScope.profileBEmailDisabled = true;
	// 						setTimeout(function () {
	// 							$("#txtDOB").datepicker({
	// 								changeMonth: true,
	// 								changeYear: true,
	// 								minDate: "-100Y",
	// 								maxDate: "-18Y",
	// 								dateFormat: 'dd/mm/yy',
	// 								yearRange: "-100: -18",
	// 								onSelect: function () {
	// 									$('#txtDOB').removeClass('ng-empty');
	// 									$('#txtDOB').addClass('ng-not-empty');
	// 									$scope.dobError = false;
	// 									$rootScope.formData.hideBtn = false;
	// 									$scope.$applyAsync();
	// 								}
	// 							});

	// 							$("#txtDOB").datepicker("option", "showAnim", "blind");
	// 							$('#pan').focus();
	// 						}, 10);
	// 						$rootScope.ShowEmailOtp = false;
	// 						$rootScope.wizardShow = true;
	// 						$rootScope.formData.stageInfo = '1b';
	// 						$scope.otpVerified = true;
	// 						$('#city_value').css("pointer-events", "none");
	// 						$rootScope.formData.hideBtn = true;
	// 						$('#authorize').iCheck('disable');
	// 						$("select").select2();
	// 						if ($rootScope.formData.fields.email) {
	// 							sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
	// 						}
	// 						if ($rootScope.formData.fields.mobile) {
	// 							sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
	// 						}
	// 						sessionStorage.setItem('Username', $rootScope.formData.fields.username);
	// 						sessionStorage.setItem('User_City', $('#city_value').val());
	// 						dataLayer.push({
	// 							event: 'StageChange',
	// 							attributes: {
	// 								'level complete': '1a',
	// 								'email': $rootScope.formData.fields.email,
	// 								'mobile': $rootScope.formData.fields.mobile
	// 							}
	// 						});
	// 					} else {
	// 						$scope.invalidOTP = true;
	// 						$scope.otpVerified = false;
	// 						if (response.ErrorMessage) {
	// 							$rootScope.apiResponseErrorMsg = response.ErrorMessage;
	// 						} else {
	// 							$rootScope.apiResponseErrorMsg = "Error in API";
	// 						}
	// 						setTimeout(function () {
	// 							var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
	// 									backdrop: 'static',
	// 									keyboard: false
	// 								});
	// 							APIResponseModal.show();
	// 						}, 100)
	// 					}
	// 				});
	// 			} else {
	// 				$scope.invalidOTP = true;
	// 				$scope.otpVerified = false;
	// 				if (response.ErrorMessage) {
	// 					$rootScope.apiResponseErrorMsg = response.ErrorMessage;
	// 				} else {
	// 					$rootScope.apiResponseErrorMsg = "Error in API";
	// 				}
	// 				if (response.EmailVerified == "N") {
	// 					$rootScope.apiResponseErrorMsg = "Email " + $rootScope.apiResponseErrorMsg;
	// 				} else if (response.MobileVerified == "N") {
	// 					$rootScope.apiResponseErrorMsg = "Mobile " + $rootScope.apiResponseErrorMsg;
	// 				}
	// 				if (response.ErrorMessage == "" || response.ErrorMessage == null) {
	// 					$rootScope.apiResponseErrorMsg = "Problem in API";
	// 				}

	// 			}

	// 		}, function (e) {
	// 			$rootScope.formData.apiLoading = false;
	// 			var connection = new bootstrap.Modal(document.getElementById('connection'));
	// 			connection.show(); ;
	// 		});
	// 	}
	// };

	$scope.validateOTP = function () {
		$scope.error = 0;
		if (angular.isUndefined($rootScope.formData.fields.mobileOTP) || $rootScope.formData.fields.mobileOTP == null || $rootScope.formData.fields.mobileOTP == '') {
			$scope.emptyMobileOTP = true;
			$scope.error++;
			$('#mobileOTP').focus();
		}
		// if ($('#city_value').val() == null || $('#city_value').val() == '') {
		// 	$scope.emptyCityName = true;
		// 	$scope.error++;
		// 	$('#city').focus();
		// }

		/*if (angular.isUndefined($rootScope.formData.fields.emailOTP) || $rootScope.formData.fields.emailOTP == null || $rootScope.formData.fields.emailOTP == '') {
		$scope.emptyEmailOTP = true;
		$scope.error++;
		$('#emailOTP').focus();
		}*/

		if ($scope.error == 0) {

			$rootScope.formData.apiLoading = true;
			var url = "OTPValidationnewEncS";
			var sendData = {
				//	'OtpCode': $rootScope.formData.fields.otpMobile,
				'Mobile': $rootScope.formData.fields.mobile,
				'Email': $rootScope.formData.fields.email,
				"MobileOtpCode": !$scope.EmailField ? $rootScope.formData.fields.mobileOTP : '',
				"EmailOtpCode": $scope.EmailField ? $rootScope.formData.fields.mobileOTP : '',
				'MobileFlag': $scope.EmailField ? false : true,
				'EmailFlag': $scope.EmailField ? true : false,
				"IsDiy": true,
				"EncryptToken": $rootScope.EncryptToken
			}

			// if (sessionStorage.getItem('MobileVerified') != null || sessionStorage.getItem('MobileVerified') != 'Y') {
			// 	sendData.MobileFlag = true;
			// } else {
			// 	sendData.MobileFlag = false;
			// }
			// if (sessionStorage.getItem('EmailVerified') != null || sessionStorage.getItem('EmailVerified') != 'Y') {
			// 	sendData.EmailFlag = false;
			// } else {
			// 	sendData.EmailFlag = false;
			// }
			sendData = $rootScope.encryptReq(sendData);
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				response = $rootScope.decryptRes(a.data, 'Response');
				$rootScope.apiResponseErrorMsg = '';
				$scope.mobileResendStatus = false;
				$scope.emailResendStatus = false;
				$rootScope.formData.apiLoading = false;
				/* if (response.MobileNo != $rootScope.formData.fields.mobile) {
					var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
						backdrop: 'static',
						keyboard: false
					});
					mobilemismatch.show();
					return
				} else if (response.OTPMessage != $rootScope.formData.fields.email) {
					var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
						backdrop: 'static',
						keyboard: false
					});
					mobilemismatch.show();
					return
				} */
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
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
				gtag('event', 'conversion', {
					'send_to': 'AW-727858862/jhgJCIr7mfIBEK79iNsC'
				});
				if (response.EmailVerified == 'Y') {
					sessionStorage.setItem('EmailVerified', 'Y')
				}
				if (response.MobileVerified == 'Y') {
					sessionStorage.setItem('MobileVerified', 'Y')
				}
				if (response.IsSuccess) {
					OTPpopMobile.hide();
					$scope.formData.fields.mobileOTP = '';
					if (Object.keys($rootScope.searchParams).length > 0 && Object.keys($rootScope.searchParams).includes('utm_tool')) {
						if ($rootScope.searchParams.utm_tool == 'appsFlyer') {
							$scope.appsFlyerMob();
						}
					}

					if ($scope.EmailField) {
						sessionStorage.setItem('ManuvalGmailverify', "Y")
						sessionStorage.setItem('EmailENC', response.EncEmail)
						$rootScope.emailvalidatenew();
					}
					$scope.EmailField = true;

					//$rootScope.EncryptToken = response.EncryptToken;

				} else {
					$scope.invalidOTP = true;
					$scope.otpVerified = false;
					if (response.ErrorMessage) {
						$rootScope.apiResponseErrorMsg = response.ErrorMessage;
					} else {
						$rootScope.apiResponseErrorMsg = "Error in API";
					}
					if (response.EmailVerified == "N") {
						$rootScope.apiResponseErrorMsg = "Email " + $rootScope.apiResponseErrorMsg;
					} else if (response.MobileVerified == "N") {
						$rootScope.apiResponseErrorMsg = "Mobile " + $rootScope.apiResponseErrorMsg;
					}
					if (response.ErrorMessage == "" || response.ErrorMessage == null) {
						$rootScope.apiResponseErrorMsg = "Problem in API";
					}
					/*setTimeout(function () {
					$rootScope.otpFailure = true;
					var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
					backdrop: 'static',
					keyboard: false
					});
					APIResponseModal.show();
					}, 100)*/
				}

			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();;
			});
		}
	};

	// $scope.emailvalidatenew = function () {
	// 	var url = "CheckEmailMobileStatusEnc";
	// 	var sendData = {
	// 		'Mobile': $rootScope.formData.fields.mobile,
	// 		'Email': $rootScope.formData.fields.email,
	// 		'EncryptToken': $rootScope.EncryptToken,
	// 		"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
	// 		"EmailOtpCode": '',
	// 		"IsDiy": true
	// 	}
	// 	sendData = $rootScope.encryptReq(sendData);
	// 	serverService.apiCall(url, sendData).then(function (a) {
	// 		var response = $rootScope.decryptRes(a.data, 'Response');

	// 		if (response.EncryptToken) {
	// 			$rootScope.EncryptToken = response.EncryptToken;
	// 		} else {
	// 			if ($rootScope.formData.tokenValidation) {
	// 				$rootScope.clearBrowsingData();
	// 				var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
	// 					backdrop: 'static',
	// 					keyboard: false
	// 				});
	// 				APIResponseModal.show();
	// 				$rootScope.apiResponseErrorMsg = "Session Timed Out";
	// 				return false;
	// 			}
	// 		}
	// 		if (response.IsSuccess) {
	// 			OTPpopMobile.hide();
	// 			$rootScope.UpdateTempPersistenceResume();
	// 			$scope.EmailField = true;
	// 			$scope.emailMobile = false;
	// 			$scope.otp = false;
	// 			$rootScope.pan = true;
	// 			$rootScope.profileBEmailDisabled = true;
	// 			setTimeout(function () {
	// 				$("#txtDOB").datepicker({
	// 					changeMonth: true,
	// 					changeYear: true,
	// 					minDate: "-100Y",
	// 					maxDate: "-18Y",
	// 					dateFormat: 'dd/mm/yy',
	// 					yearRange: "-100: -18",
	// 					onSelect: function () {
	// 						$('#txtDOB').removeClass('ng-empty');
	// 						$('#txtDOB').addClass('ng-not-empty');
	// 						$scope.dobError = false;
	// 						$rootScope.formData.hideBtn = false;
	// 						$scope.$applyAsync();
	// 					}
	// 				});

	// 				$("#txtDOB").datepicker("option", "showAnim", "blind");
	// 				$('#pan').focus();
	// 			}, 10);
	// 			$rootScope.ShowEmailOtp = false;
	// 			$rootScope.wizardShow = true;
	// 			$rootScope.formData.stageInfo = '1b';
	// 			$scope.otpVerified = true;
	// 			$('#city_value').css("pointer-events", "none");
	// 			$rootScope.formData.hideBtn = true;
	// 			$('#authorize').iCheck('disable');
	// 			$("select").select2();
	// 			if ($rootScope.formData.fields.email) {
	// 				sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
	// 			}
	// 			if ($rootScope.formData.fields.mobile) {
	// 				sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
	// 			}
	// 			sessionStorage.setItem('Username', $rootScope.formData.fields.username);
	// 			sessionStorage.setItem('User_City', $('#city_value').val());
	// 			dataLayer.push({
	// 				event: 'StageChange',
	// 				attributes: {
	// 					'level complete': '1a',
	// 					'email': $rootScope.formData.fields.email,
	// 					'mobile': $rootScope.formData.fields.mobile
	// 				}
	// 			});
	// 		} else {
	// 			$scope.invalidOTP = true;
	// 			$scope.otpVerified = false;
	// 			if (response.ErrorMessage) {
	// 				$rootScope.apiResponseErrorMsg = response.ErrorMessage;
	// 			} else {
	// 				$rootScope.apiResponseErrorMsg = "Error in API";
	// 			}
	// 			setTimeout(function () {
	// 				var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
	// 					backdrop: 'static',
	// 					keyboard: false
	// 				});
	// 				APIResponseModal.show();
	// 			}, 100)
	// 		}
	// 	});
	// }
	$rootScope.emailvalidatenew = function () {
		var url = "CheckEmailMobileStatusEnc";
		var sendData = {
			'Mobile': $rootScope.formData.fields.mobile,
			'Email': $rootScope.formData.fields.email,
			'EncryptToken': $rootScope.EncryptToken,
			"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
			"EmailOtpCode": '',
			"IsDiy": true
		}
		sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {
			var response = $rootScope.decryptRes(a.data, 'Response');
			$rootScope.formData.apiLoading = false;
			// if (response.MobileNo != $rootScope.formData.fields.mobile) {
			// var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
			//             backdrop: 'static',
			//             keyboard: false
			//         });
			//     mobilemismatch.show();
			//     return
			// } else if (response.OTPMessage != $rootScope.formData.fields.email) {
			//     var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
			//             backdrop: 'static',
			//             keyboard: false
			//         });
			//     mobilemismatch.show();
			//     return
			// }
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
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
				OTPpopMobile.hide();
				$scope.EmailField = true;
				if (Object.keys($rootScope.searchParams).length > 0 && Object.keys($rootScope.searchParams).includes('utm_tool')) {
					if ($rootScope.searchParams.utm_tool == 'appsFlyer') {
						$scope.appsFlyerMob();
					}
				}
				if (!$rootScope.Newutmsour) {

					//  $scope.emailMobile = false;
					$scope.otp = false;

					var googleEmailVerifyModal = new bootstrap.Modal(document.getElementById('googleEmailVerifyModal'), {
						backdrop: 'static',
						keyboard: false
					})
					googleEmailVerifyModal.show()
				} else {

					$rootScope.UpdateTempPersistenceResume();
					$scope.emailMobile = false;
					$scope.otp = false;
					$rootScope.pan = true;
					$rootScope.profileBEmailDisabled = true;
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
								$scope.$applyAsync();
							}
						});


						$("#txtDOB").datepicker("option", "showAnim", "blind");
						$('#pan').focus();
					}, 10);
					$rootScope.ShowEmailOtp = false;
					$rootScope.wizardShow = true;
					$rootScope.formData.stageInfo = '1b';
					$scope.otpVerified = true;
					$('#city_value').css("pointer-events", "none");
					$rootScope.formData.hideBtn = true;
					$('#authorize').iCheck('disable');
					$("select").select2();
					if ($rootScope.formData.fields.email) {
						sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
					}
					if ($rootScope.formData.fields.mobile) {
						sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
					}
					sessionStorage.setItem('Username', $rootScope.formData.fields.username);
					sessionStorage.setItem('User_City', $('#city_value').val());
					dataLayer.push({
						event: 'StageChange',
						attributes: {
							'level complete': '1a',
							'email': $rootScope.formData.fields.email,
							'mobile': $rootScope.formData.fields.mobile
						}
					});
				}
				// $rootScope.UpdateTempPersistenceResume();
				// $scope.EmailField =true;
				// $scope.emailMobile = false;
				// $scope.otp = false;
				// $rootScope.pan = true;
				// $rootScope.profileBEmailDisabled = true;
				// setTimeout(function () {
				//  $("#txtDOB").datepicker({
				//      changeMonth: true,
				//      changeYear: true,
				//      minDate: "-100Y",
				//      maxDate: "-18Y",
				//      dateFormat: 'dd/mm/yy',
				//      yearRange: "-100: -18",
				//      onSelect: function () {
				//          $('#txtDOB').removeClass('ng-empty');
				//          $('#txtDOB').addClass('ng-not-empty');
				//          $scope.dobError = false;
				//          $rootScope.formData.hideBtn = false;
				//          $scope.$applyAsync();
				//      }
				//  });


				//  $("#txtDOB").datepicker("option", "showAnim", "blind");
				//  $('#pan').focus();
				// }, 10);
				// $rootScope.ShowEmailOtp = false;
				// $rootScope.wizardShow = true;
				// $rootScope.formData.stageInfo = '1b';
				// $scope.otpVerified = true;
				// $('#city_value').css("pointer-events", "none");
				// $rootScope.formData.hideBtn = true;
				// $('#authorize').iCheck('disable');
				// $("select").select2();
				// if ($rootScope.formData.fields.email) {
				//  sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
				// }
				// if ($rootScope.formData.fields.mobile) {
				//  sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
				// }
				// sessionStorage.setItem('Username', $rootScope.formData.fields.username);
				// sessionStorage.setItem('User_City', $('#city_value').val());
				// dataLayer.push({
				//  event: 'StageChange',
				//  attributes: {
				//      'level complete': '1a',
				//      'email': $rootScope.formData.fields.email,
				//      'mobile': $rootScope.formData.fields.mobile
				//  }
				// });
			} else {
				$scope.invalidOTP = true;
				$scope.otpVerified = false;
				if (response.ErrorMessage) {
					$rootScope.apiResponseErrorMsg = response.ErrorMessage;
				} else {
					$rootScope.apiResponseErrorMsg = "Error in API";
				}
				setTimeout(function () {
					var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
						backdrop: 'static',
						keyboard: false
					});
					APIResponseModal.show();
				}, 100)
			}
		});
	}

	$scope.finInfo = function () {
		$rootScope.pan = true;
		$rootScope.krasearch = true;
		var s_url = "GetFinacleCustomerDetails";

		var sendData = {
			PanNumber: $rootScope.formData.fields.panNumber
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				$rootScope.pan = true;
				$rootScope.finData = response;
				if ($rootScope.finData.basicInfo[0].ConstitutionCode && $rootScope.finData.basicInfo[0].ConstitutionCode != '01') {
					$rootScope.apiResponseErrorMsg = 'Thank you for showing interest in opening a trading and demat account with Axis Direct!! However, only Resident Individuals can open an online trading account. All NRI/Corporate accounts would be opened offline. We have recorded your details and your dedicated RM would contact you shortly to assist you with opening an account.';
					var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
						backdrop: 'static',
						keyboard: false
					});
					APIResponseModal.show();
					$rootScope.finNRI = true
				} else {
					if ($rootScope.finData.basicInfo[0].CKycReferenceNumber) {
						var letter = $rootScope.finData.basicInfo[0].CKycReferenceNumber.charAt(0).toLowerCase();
					}
					if (letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S') { }
					else if ($rootScope.finData.basicInfo[0].CKycReferenceNumber) {
						$rootScope.ckycRefNoIB = true;
						$rootScope.formData.CKYC = true;
						$rootScope.formData.IsCKYC = 'Y';
						sessionStorage.setItem('IsCKYC', true);
					}
					if (!$scope.dobEnteruser) {
						var dob = $rootScope.finData.basicInfo[0].DateOfBirth;
						dob = $rootScope.finData.basicInfo[0].DateOfBirth.substring(8, 10) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(5, 7) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(0, 4);
						$rootScope.finData.basicInfo[0].DateOfBirth = dob;
						// $rootScope.formData.dob = dob;
					}
					sessionStorage.setItem('finData', JSON.stringify($rootScope.finData));
					sessionStorage.setItem('finacle', true);
					$rootScope.formData.btnOk = true;
					// $('#txtDOB').val($rootScope.formData.dob)
					$('#pan').prop('disabled', true);
					$('#txtDOB').prop('disabled', true);
					$rootScope.formData.fields.email = $scope.finData.basicInfo[0].EmailId;
					$rootScope.formData.fields.mobile = $scope.finData.basicInfo[0].Mobile;
					$scope.accountRegister();
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
				var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
					backdrop: 'static',
					keyboard: false
				});
				APIResponseModal.show();
				$rootScope.apiResponseErrorMsg = "User data not found";
			}
		})
	}

	$scope.karvyInfoEcomPan = function () {
		var url = "EcommercePanSiteValidation";
		var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
		var date = dateStr[0];
		var month = dateStr[1];
		var year = dateStr[2];
		var NewDate = date + "/" + month + "/" + year;
		$rootScope.formData.fields.DOB = NewDate;
		var userDob = $rootScope.formData.fields.DOB;
		$rootScope.formData.dob = userDob;
		$rootScope.formData.fields.panNumber = $rootScope.formData.fields.panNumber.toUpperCase();
		// if($rootScope.digiarr.includes($rootScope.formData.fields.panNumber)){
		// 	$rootScope.digilockerflow=true;
		// 	sessionStorage.setItem('digilockerflow',$rootScope.digilockerflow)
		// }
		if (!$scope.nameonCardPan) {
			Nameoncard = "";
			IsNewPANNSDLSite = "";
		}
		if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
			mode = 'R';
			$rootScope.formData.fields.mobile = $rootScope.formData.fields.rmmobile;
			$rootScope.formData.fields.email = $rootScope.formData.fields.rmemail;
		}
		var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.panNumber);
		var panNumber = encryptedpassword.toString();
		var encryptedpassword = axisCrypto.enc($rootScope.formData.dob);
		var dob = encryptedpassword.toString();
		var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.email);
		var email = encryptedpassword.toString();
		var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.mobile);
		var mobile = encryptedpassword.toString();
		var sendData = {
			PanNumber: panNumber,
			DOB: dob,
			Mode: mode,
			EncMobile: mobile,
			EncEmail: email,
			RMCode: $rootScope.formData.fields.rmcode,
			IsNewPANNSDLSite: true,
			Nameoncard: $rootScope.formData.fields.username,
			EmployeeId: $rootScope.formData.fields.rmid,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken,
			EncrptFlag: "true"
		};
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$scope.karvyInfo();
		})

	}
	$scope.karvyInfo = function () {
		if ($('#txtDOB').val() == "") {
			$scope.dobError = true;
			$scope.ageValid = false;
			return false;
		}
		var s_url = "GetKarvyTcsCustomerInformation";
		var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
		var date = dateStr[0];
		var month = dateStr[1];
		var year = dateStr[2];
		var NewDate = date + "/" + month + "/" + year;
		$rootScope.formData.fields.DOB = NewDate;
		var userDob = $rootScope.formData.fields.DOB;
		$rootScope.formData.dob = userDob;
		var sendData = {
			PanNumber: $rootScope.formData.fields.panNumber,
			DOB: $rootScope.formData.dob,
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				$scope.emailMobile = false;
				$rootScope.pan = false;
				$rootScope.webKarvyShow = false;
				$scope.proceeddetailsshow = true;
				$rootScope.karvyData = response.KarvyTcsData[0];
				// var dob = response.KarvyTcsData[0].DOB;
				// dob = response.KarvyTcsData[0].DOB.substring(0, 2) + '/' + response.KarvyTcsData[0].DOB.substring(2, 4) + '/' + response.KarvyTcsData[0].DOB.substring(4, 8);
				// $rootScope.karvyDOB = dob;
				// $rootScope.karvyData.DOB = dob;

				setTimeout(() => {
					$('#acnumber').text(function (_, val) {
						return val.replace(/\d(?=\d{4})/g, "*");
					});
				}, 100);
				sessionStorage.setItem('karvyData', JSON.stringify($rootScope.karvyData));
				sessionStorage.setItem('webKarvy', true);
				// $scope.karvyInfoEcomPan()
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
				var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
					backdrop: 'static',
					keyboard: false
				});
				APIResponseModal.show();
				if (response.SuccessMessage == "Already account activated") {
					$rootScope.apiResponseErrorMsg = "Already account activated";
				} else {
					$rootScope.apiResponseErrorMsg = "User data not found";

				}
			}
		})
	}

	$scope.updateDOB = function () {
		var url = 'DIYUpdateDOB';
		var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
		var date = dateStr[0];
		var month = dateStr[1];
		var year = dateStr[2];
		$rootScope.formData.fields.DOB = date + "/" + month + "/" + year;
		$rootScope.formData.dob = $rootScope.formData.fields.DOB;
		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			pannumber: $rootScope.formData.fields.panNumber,
			dob: $rootScope.formData.fields.DOB
		}

		serverService.apiCall(url, sendData);
	}
	$rootScope.Kravalid = function () {
		sessionStorage.clear()
		$rootScope.emailMobile = false;
		$rootScope.pan = true;
		$scope.panVerified = false;
		$rootScope.wizardShow = false;
		$rootScope.kravalidsearch = true;
		$rootScope.krasearch = false;
		$rootScope.formData.stageInfo = '2';
		$state.go('register', {
			mobile: $rootScope.formData.EncMobile
		});
	}
	$scope.registration = function () {
		if (!$rootScope.ibmbAssists && $rootScope.webfinacle) {
			$scope.ibmbAssistError = true;
			return;
		}
		if (!$rootScope.formData.disableApp) {
			var nameMistch = sessionStorage.getItem('namegetMismatch');
			if (($rootScope.formData.skipRegister || ($rootScope.formData.ReferenceNumber)) && !$rootScope.kravalidsearch && !$rootScope.BYOD && !$rootScope.vcip && nameMistch === 'Y') {
				if (!$rootScope.dobFreeze) {
					$scope.updateDOB();
					$rootScope.dobFreeze = true;
				}
				// if (sessionStorage.getItem("IsKRA") == 'true' && $rootScope.formData.isg) {
				// 	$state.go('personalDetails', {
				// 		mobile: $rootScope.formData.EncMobile
				// 	});
				// } else {
				// 	$state.go('address', {
				// 		mobile: $rootScope.formData.EncMobile
				// 	});
				// }
				if ($rootScope.formData.RMModule && ($rootScope.formData.digiData || $rootScope.digiReferenceNumber) && !$rootScope.secondCompleted) {
					if ($rootScope.formData.digilockerData && ($rootScope.formData.digilockerData.pc || sessionStorage.getItem('digiInfo'))) {
						$state.go('address');
					} else {
						$state.go('digiData');
					}
				} else {
					$state.go('address', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			} else {

				var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
				var pan_cfilter = /[a-z]{3}[c|B|T|F|A|H|L|G|J][a-z]{1}\d{4}[a-z]/i;

				if (!angular.isUndefined($rootScope.formData.fields.panNumber) && $rootScope.formData.fields.panNumber != '' && $rootScope.formData.fields.panNumber != null) {
					$scope.panCoVaild = false;
					$scope.panValid = false;
					$scope.panError = false;
					$scope.panInValid = false;
					if ($rootScope.formData.fields.username == "" || $rootScope.formData.fields.username == null || $rootScope.formData.fields.username == undefined) {
						$scope.panCVerified = true;
						setTimeout(function () {
							$('#panCName').focus();
						}, 10);
						return false;
					}
					else if (($rootScope.formData.fields.panNumber).length == 10 && (pan_cfilter.test($rootScope.formData.fields.panNumber))) {
						$scope.panValid = false;
						$scope.panCoVaild = true;
						$scope.panInValid = false;
						$scope.panFocus = true;
						setTimeout(function () {
							$('#pan').focus();
						}, 10);
						return false;
					} else if (($rootScope.formData.fields.panNumber).length == 10 && (pan_filter.test($rootScope.formData.fields.panNumber))) {
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

				if ($('#txtDOB').val() == "") {
					$scope.dobError = true;
					$scope.ageValid = false;
					return false;
				} else if ($rootScope.webkarvy) {
					// $scope.karvyInfo();
					$scope.karvyInfoEcomPan()
				} else if ($rootScope.webfinacle) {
					$scope.finInfo();
				} else if ($rootScope.janabank) {
					$scope.accountRegister();
				}
				else if ($rootScope.BYOD) {
					$scope.accountRegister();
				}
				else if ($rootScope.formData.RMModule) {
					let error = 0;
					if (!$rootScope.formData.fields.rmmobile) {
						$scope.rmemptyMobile = true;
						setTimeout(function () {
							$('#rmmobile').focus();
						}, 10);
						error++;
					} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.rmmobile) == false) {
						$scope.rminvalidMobile = true;
						setTimeout(function () {
							$('#rmmobile').focus();
						}, 10);
						error++;
					}

					else if (!$rootScope.formData.fields.rmemail) {
						$scope.rmemptyEmail = true;
						setTimeout(function () {
							$('#rmemailID').focus();
						}, 10);
						error++;
					} else if (!($scope.filter).test($rootScope.formData.fields.rmemail)) {
						$scope.rminvalidEmail = true;
						setTimeout(function () {
							$('#rmemailID').focus();
						}, 10);
						error++;
					} else {
						var e = $rootScope.formData.fields.rmemail.split('@');
						var c = e[0].toLowerCase();
						if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
							$scope.rminvalidEmail = true;
							setTimeout(function () {
								$('#rmemailID').focus();
							}, 10);
							error++;
						}
					}
					if (error == 0) {
						// $scope.generateRMOTP();
						$scope.accountRegister();
					}

				} else {
					$scope.emailMobile = false;
					$rootScope.pan = false;
					$rootScope.krasearch = true;
					$scope.accountRegister();
				}
			}
		}
	}
	$rootScope.newFormManuvelEmail = function () {
		$rootScope.UpdateTempPersistenceResume();
		$scope.EmailField = true;
		$scope.emailMobile = false;
		$scope.otp = false;
		$rootScope.pan = true;
		$rootScope.profileBEmailDisabled = true;
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
					$scope.$applyAsync();
				}
			});

			$("#txtDOB").datepicker("option", "showAnim", "blind");
			$('#pan').focus();
		}, 10);
		$rootScope.ShowEmailOtp = false;
		$rootScope.wizardShow = true;
		$rootScope.formData.stageInfo = '1b';
		$scope.otpVerified = true;
		$('#city_value').css("pointer-events", "none");
		$rootScope.formData.hideBtn = true;
		$('#authorize').iCheck('disable');
		$("select").select2();
		if ($rootScope.formData.fields.email) {
			sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
		}
		if ($rootScope.formData.fields.mobile) {
			sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
		}
		sessionStorage.setItem('Username', $rootScope.formData.fields.username);
		sessionStorage.setItem('User_City', $('#city_value').val());
		dataLayer.push({
			event: 'StageChange',
			attributes: {
				'level complete': '1a',
				'email': $rootScope.formData.fields.email,
				'mobile': $rootScope.formData.fields.mobile
			}
		});
	}
	$scope.generateRMOTP = function () {
		let error = 0;
		var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
		var pan_cfilter = /[a-z]{3}[c|B|T|F|A|H|L|G|J][a-z]{1}\d{4}[a-z]/i;

		if (!angular.isUndefined($rootScope.formData.fields.panNumber) && $rootScope.formData.fields.panNumber != '' && $rootScope.formData.fields.panNumber != null) {
			$scope.panCoVaild = false;
			$scope.panValid = false;
			$scope.panError = false;
			$scope.panInValid = false;
			if ($rootScope.formData.fields.username == "" || $rootScope.formData.fields.username == null || $rootScope.formData.fields.username == undefined) {
				$scope.panCVerified = true;
				setTimeout(function () {
					$('#panCName').focus();
				}, 10);
				return false;
			}
			else if (($rootScope.formData.fields.panNumber).length == 10 && (pan_cfilter.test($rootScope.formData.fields.panNumber))) {
				$scope.panValid = false;
				$scope.panCoVaild = true;
				$scope.panInValid = false;
				$scope.panFocus = true;
				setTimeout(function () {
					$('#pan').focus();
				}, 10);
				return false;
			} else if (($rootScope.formData.fields.panNumber).length == 10 && (pan_filter.test($rootScope.formData.fields.panNumber))) {
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

		if ($('#txtDOB').val() == "") {
			$scope.dobError = true;
			$scope.ageValid = false;
			return false;
		}
		if (!$rootScope.formData.fields.rmmobile) {
			$scope.rmemptyMobile = true;
			setTimeout(function () {
				$('#rmmobile').focus();
			}, 10);
			error++;
		} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.rmmobile) == false) {
			$scope.rminvalidMobile = true;
			setTimeout(function () {
				$('#rmmobile').focus();
			}, 10);
			error++;
		}

		else if (!$rootScope.formData.fields.rmemail) {
			$scope.rmemptyEmail = true;
			setTimeout(function () {
				$('#rmemailID').focus();
			}, 10);
			error++;
		} else if (!($scope.filter).test($rootScope.formData.fields.rmemail)) {
			$scope.rminvalidEmail = true;
			setTimeout(function () {
				$('#rmemailID').focus();
			}, 10);
			error++;
		} else {
			var e = $rootScope.formData.fields.rmemail.split('@');
			var c = e[0].toLowerCase();
			if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
				$scope.rminvalidEmail = true;
				setTimeout(function () {
					$('#rmemailID').focus();
				}, 10);
				error++;
			}
		}
		var url = "OTPGenerationnewEnc";
		var sendData = {
			"Mobile": $rootScope.formData.fields.rmmobile,
			"Email": $rootScope.formData.fields.rmemail,
			"MobileFlag": true,
			"EmailFlag": true,
			"AssistLCCode": "",
			"AssistLGCode": "",
			"City": "",
			"ClientName": ""
		}
		$rootScope.formData.apiLoading = true;
		$rootScope.RMOtpResponseMsg = '';
		sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var response = $rootScope.decryptRes(a.data, 'Response');
			if (response.IsSuccess) {
				gtag_report_conversion();
				$scope.rmotpSectionShow = true;
				$scope.rmotpSentEmail = true;
				$scope.rmotpSectionShowStage = true;
				$scope.rmotpSentMobile = true;
				$scope.formData.fields.rmmobileOTP = '';
				$scope.formData.fields.rmemailOTP = '';
			}
			// else if(response.ErrorCode == 'RESUME_ON_INNODIGITAL'){
			//     $rootScope.nextStage = response.NextStage;
			//     $rootScope.redirectLink = response.RedirectUrl;
			//     var InnodigitalModal = new bootstrap.Modal(document.getElementById('Innodigital'), {
			//                 backdrop: 'static',
			//                 keyboard: false
			//             });
			//         InnodigitalModal.show();
			//         return;
			// }
			// else if (!response.IsSuccess && (response.ErrorCode == 'E004' || response.ErrorCode == 'E002' || response.ErrorCode == 'E003'|| response.ErrorCode == 'E005')) {
			//     $rootScope.Errcode = response.ErrorCode
			//         var MailMobErrModal = new bootstrap.Modal(document.getElementById('MailMobErr'), {
			//                 backdrop: 'static',
			//                 keyboard: false
			//             });
			//         MailMobErrModal.show();
			//         $rootScope.MobEmailErrorMessage = response.ErrorMessage;
			// 		const el = angular.element(document.querySelector('#MobEmailErrorDiv'));
			// el.html(response.ErrorMessage);
			// $compile(el.contents())($scope);
			//     // $scope.MobEmailErrorMessage = response.ErrorMessage;
			//     $scope.$evalAsync();
			//     return;
			// }
			else {
				$rootScope.RMOtpResponseMsg = response.ErrorMessage;
			}
		});
	}

	$scope.validateRMOTP = function () {
		$scope.error = 0;
		if (!$rootScope.formData.fields.rmmobileOTP) {
			$scope.rmemptyMobileOTP = true;
			$scope.error++;
			$('#rmmobileOtp').focus();
		}

		if (!$rootScope.formData.fields.rmemailOTP) {
			$scope.rmemptyEmailOTP = true;
			$scope.error++;
			$('#rmemailOtp').focus();
		}
		if ($scope.panRmDb) {
			$scope.accountRegister()
			return;
		}
		if ($scope.error == 0) {

			$rootScope.formData.apiLoading = true;
			var url = "OTPValidationnewEncS";
			var sendData = {
				//	'OtpCode': $rootScope.formData.fields.otpMobile,
				'Mobile': $rootScope.formData.fields.rmmobile,
				'Email': $rootScope.formData.fields.rmemail,
				"MobileOtpCode": $rootScope.formData.fields.rmmobileOTP,
				"EmailOtpCode": $rootScope.formData.fields.rmemailOTP,
				"MobileFlag": true,
				"EmailFlag": true,
				"IsDiy": true,
				"EncryptToken": $rootScope.EncryptToken
			}
			sendData = $rootScope.encryptReq(sendData);
			serverService.apiCall(url, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = $rootScope.decryptRes(a.data, 'Response');
				/* if (response.MobileNo != $rootScope.formData.fields.mobile) {
					var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
						backdrop: 'static',
						keyboard: false
					});
					mobilemismatch.show();
					return
				} else if (response.OTPMessage != $rootScope.formData.fields.email) {
					var mobilemismatch = new bootstrap.Modal(document.getElementById('mobilemismatch'), {
						backdrop: 'static',
						keyboard: false
					});
					mobilemismatch.show();
					return
				} */
				if (response.IsSuccess) {
					gtag_report_verified();
					$scope.emailMobile = false;
					$scope.rmotpVerifiedmobile = true
					$scope.rmotpVerifiedemail = true;
					$scope.isMobileVerified = 'Y';
					$scope.isEmailVerified = 1;
					// $scope.panRmDb=true;
					$scope.rmotpSectionShow = false;
					$rootScope.pan = true;
					$rootScope.krasearch = true;
					$scope.accountRegister();
					// $rootScope.planLoadStop = true;
					// $scope.panVerified = true;
					// $rootScope.formData.getKraDetails = true;
					// $rootScope.formData.apiLoading = false;
					// var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
					// 	backdrop: 'static',
					// 	keyboard: false
					// });
					// paninformation.show();
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
					if (response.MobileVerified != 'Y') {
						$scope.rminvalidMobileOTP = true;
						if (response.ErrorMessage) {
							$rootScope.rmmobileapiResponseErrorMsg = response.ErrorMessage;
						} else {
							$rootScope.rmmobileapiResponseErrorMsg = response.FailureMessage;
						}
					}

					if (response.EmailVerified != 'Y') {
						$scope.rminvalidEmailOTP = true;
						if (response.ErrorMessage) {
							$rootScope.rmemailapiResponseErrorMsg = response.ErrorMessage;
						} else {
							$rootScope.rmemailapiResponseErrorMsg = response.FailureMessage;
						}
					}
				}
			});

		}

	}


	$scope.DebarredPan = function () {
		$scope.emailMobile = true;
		$rootScope.pan = false;
		$rootScope.krasearch = false;
		$state.go('register');
	}

	$scope.allowEsignFunc = function () {
		sessionStorage.clear();
		$rootScope.wizardShow = false;
		$state.go('register');
		location.reload();
	}

	$scope.accountRegister = function () {
		if (!$rootScope.formData.disableApp) {

			$('.loader-info.paninfo').css('display', 'block');
			var url = "EcommercePanSiteValidation";

			if ((!$rootScope.webfinacle && !$rootScope.janabank) || $scope.dobEnteruser) {
				var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
				var date = dateStr[0];
				var month = dateStr[1];
				var year = dateStr[2];
				var NewDate = date + "/" + month + "/" + year;
				$rootScope.formData.fields.DOB = NewDate;
				var userDob = $rootScope.formData.fields.DOB;
				$rootScope.formData.dob = userDob;
			} else {
				if ($rootScope.formData.fields.DOB) {
					$rootScope.formData.dob = $rootScope.formData.fields.DOB
				}
			}
			$rootScope.formData.fields.panNumber = $rootScope.formData.fields.panNumber.toUpperCase();
			$rootScope.formData.dob = $('#txtDOB').val();
			// if($rootScope.digiarr.includes($rootScope.formData.fields.panNumber)){
			// 	$rootScope.digilockerflow=true;
			// 	sessionStorage.setItem('digilockerflow',$rootScope.digilockerflow)
			// }
			if (!$scope.nameonCardPan) {
				Nameoncard = "";
				IsNewPANNSDLSite = "";
			}
			if ($rootScope.rkMode) {
				$rootScope.formData.fields.mobile = sessionStorage.getItem("rkMobile");
				$rootScope.formData.fields.email = sessionStorage.getItem("rkEmail");
			}
			if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
				mode = 'R';
				$rootScope.formData.fields.mobile = $rootScope.formData.fields.rmmobile;
				$rootScope.formData.fields.email = $rootScope.formData.fields.rmemail;
			}
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.panNumber);
			var panNumber = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.dob);
			var dob = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.email);
			var email = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.mobile);
			var mobile = encryptedpassword.toString();
			if ($rootScope.siddhiApp) {
				mobile = "";
				email = "";
				$rootScope.formData.fields.mobile = "";
				$rootScope.formData.fields.email = "";
			}
			var sendData = {
				PanNumber: panNumber,
				DOB: dob,
				Mode: mode,
				EncMobile: mobile,
				EncEmail: email,
				RMCode: $rootScope.formData.fields.rmcode,
				EmployeeId: $rootScope.formData.fields.rmid,
				IsNewPANNSDLSite: true,
				Nameoncard: $rootScope.formData.fields.username,
				IsDiy: true,
				EncryptToken: $rootScope.EncryptToken,
				EncrptFlag: "true"
			};

			sendData.CouponCode = ($rootScope.jio || $rootScope.CreditCard) && $rootScope.formData.fields.coupon || "";


			$(".text-animation-area .step1").removeClass('axTextActive').addClass('axTextHide');
			$(".text-animation-area .step2").removeClass('axTextSSemiStart').addClass('axTextActive');

			//hide wizard section here
			$rootScope.wizardShow = false;

			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				$rootScope.digilockerflow = response.DigiLockerSkip;
				if (!response.Allowregistration) {
					$scope.allowEsign = true;
				}
				if ($scope.allowEsign) {
					var allowSign = new bootstrap.Modal(document.getElementById('allowEsigns'), {
						backdrop: 'static',
						keyboard: true
					});
					allowSign.show();
					return;
				}

				// if(response.ErrorCode == 'RESUME_ON_INNODIGITAL'){
				// $rootScope.nextStage = response.NextStage;
				// $rootScope.redirectLink = response.RedirectUrl;
				// var InnodigitalModal = new bootstrap.Modal(document.getElementById('Innodigital'), {
				//             backdrop: 'static',
				//             keyboard: false
				//         });
				//     InnodigitalModal.show();
				//     return;
				// }
				if (!response.IsSuccess && (response.ErrorCode == '501' || response.ErrorCode == '502')) {
					$rootScope.krasearch = false;
					$rootScope.wizardShow = true;
					$scope.couponShow = true;
					$rootScope.pan = true;
					$scope.pancouponerrorMsg = response.ErrorMessage;
					$scope.$evalAsync();
					return;
				} else {
					$scope.couponShow = false;
					$scope.pancouponerrorMsg = "";
					$scope.$evalAsync();
				}
				$rootScope.formData.panSeedingBtnShow = false;
				$scope.Pannamemismatched = false;
				$scope.panErrMis = false;
				/*if (response.FinacleErrorCode == '300') {
				$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details.";
				$('#paninformation').modal({
				backdrop: 'static',
				keyboard: false
				})
				$rootScope.formData.getKraDetails = true;
				$rootScope.formData.otherMode = false;
				return false;
				}*/
				if (response.IsSuccess) {
					gtag_report_pan_conversion();
				}
				var PanAadharSeeding = "Y";
				if ((response.IsSuccess) && ($rootScope.BYOD || $rootScope.vcip)) {
					$rootScope.vcipByod = true;
					var url = 'DIYUpdateDOB';
					$rootScope.formData.dob = $rootScope.formData.fields.DOB;
					var sendData = {
						ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : sessionStorage.getItem('RxReferenceNumber'),
						pannumber: $rootScope.formData.fields.panNumber,
						dob: $rootScope.formData.fields.DOB
					}
					serverService.apiCall(url, sendData)
				}
				if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.otherMode = true;
					$rootScope.formData.HideOkayBtn = false;
					$rootScope.formData.panStatus = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return;
				}
				$rootScope.ibResumeError = false;
				if (response.IsReferenceNumberExist && response.Mode != 'I') {
					$rootScope.dobFreeze = true;
					$rootScope.webfinacle = false;
					$rootScope.hideCA = true;
					sessionStorage.removeItem('finacle');
					if (webJana && response.Mode != 'J') {
						sessionStorage.removeItem('webJana')
						sessionStorage.removeItem('janaData')
						$scope.refNumber = response.RefNumber;
						$rootScope.formData.RefNumber = response.RefNumber;
						sessionStorage.setItem("AxNo", response.RefNumber);
						$rootScope.webJana = false;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						$rootScope.janabankExistingAccountsttaus = true
						$rootScope.formData.panStatus = 'It looks like your application is already in progress with Axis Direct. To know the status of your application, please click on “Resume Application”. You can also get in touch with your Relationship Manager for further details.';
						return false;

					}
				}
				if ((response.ErrorNumber == '2023' || response.ErrorNumber == '2024' || response.ErrorNumber == '2025')) {
					$rootScope.krasearch = false;
					$scope.dobEnteruser = true;
					$rootScope.formData.panStatus = response.ErrorMessage;
					// var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
					// 		backdrop: 'static',
					// 		keyboard: false
					// 	});
					// paninformation.show();
					$rootScope.wizardShow = true;
					$rootScope.pan = true;
					$scope.panErrMis = true;
					$scope.Pannamemismatched = true;
					if ($rootScope.webfinacle || $rootScope.janabank || $rootScope.vcip || $rootScope.siddhiApp || $rootScope.BYOD) {
						setTimeout(function () {
							$('#pan').prop('disabled', true)
							$('#txtDOB').prop('disabled', false)
							$('#panCName').prop('disabled', false)
							$("#txtDOB").datepicker({
								changeMonth: true,
								changeYear: true,
								minDate: "-100Y",
								maxDate: "-18Y",
								dateFormat: 'dd/mm/yy',
								yearRange: "-100: -18"
							});

							$("#txtDOB").datepicker("option", "showAnim", "blind");
						}, 500)
					}
					if (!$rootScope.webfinacle && !$rootScope.janabank && !$rootScope.BYOD) {
						$rootScope.dobFreeze = false
						setTimeout(function () {
							$("#txtDOB").datepicker({
								changeMonth: true,
								changeYear: true,
								minDate: "-100Y",
								maxDate: "-18Y",
								dateFormat: 'dd/mm/yy',
								yearRange: "-100: -18"
							});

							$("#txtDOB").datepicker("option", "showAnim", "blind");
						}, 100)
					}
					return false;
				}
				if ((response.Mode == 'I' || response.Mode == 'MB') && !$rootScope.ibjourney) {
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					$rootScope.ibResumeError = true;
					$rootScope.formData.panStatus = 'It seems that an application for this customer already exists. Please resume your journey through Axis Bank Internet or Mobile Banking to resume.';
					return false;
				}
				if (response.FinacleErrorCode == '1001' || response.FinacleErrorCode == '1002' || response.FinacleErrorCode == '1006') {
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					$rootScope.formData.panStatus = 'Seems like you already have an application in progress. We just need a few more details to open your demat and trading account. Click on "Resume Application" to clear your discrepancies. You can also contact your RM for assistance or refer to the mail sent by Axis Direct regarding discrepancies found.';
					if (response.FinacleErrorCode == '1006') {

						$rootScope.rejectedUser = true;

						var encryptURL = "GetDecryptURL";
						var sendDataURL = {
							DecryptURL: response.RefNumber
						};
						$rootScope.formData.apiLoading = true;
						serverService.apiCall(encryptURL, sendDataURL).then(function (a) {
							// var res = a.data;
							var res = $rootScope.decryptRes(a.data, 'Response');
							if (res.ReferenceNumber) {
								var url = "GetRejectionRemarks";
								var sendData = {
									ReferenceNumber: res.ReferenceNumber
								};
								$scope.ibStatus = '';
								serverService.apiCall(url, sendData).then(function (a) {
									var msg = a.data
									$rootScope.formData.apiLoading = false;
									if (msg.IsSuccess && msg.SuccessMessage) {
										$scope.ibStatus = msg.SuccessMessage;
										$rootScope.formData.panStatus = $rootScope.formData.panStatus + '<p class="mt-3">' + $scope.ibStatus + '</p>';
									}
								});

							} else {
								$rootScope.formData.apiLoading = false;
							}

						})

					} else if (response.FinacleErrorCode == '1001') {
						$rootScope.formData.panStatus = 'Your application is already in progress with Axis Direct. To know the status of your application, please click on “Resume Application”. You can also get in touch with your Relationship Manager for further details.';
					} else {
						$rootScope.formData.panStatus = 'Your application is already in progress with Axis Direct. We will contact you shortly with updates on your application so please be on the look-out for mails from Axis Direct!';
					}
					$scope.ibrefernceExist = true;
					$scope.refNumber = response.RefNumber;
					$scope.refMobileNumber = response.ClientInfo.Mobile;
					$scope.refEmail = response.ClientInfo.Email;
					$rootScope.dobFreeze = true;
					return false;
				}

				if (response.IsReferenceNumberExist) {
					$scope.refernceExist = true;
					$rootScope.dobFreeze = true;
					$rootScope.formData.panStatus = response.Registration.PanStatus;
					$scope.refNumber = response.RefNumber;
					$rootScope.formData.RefNumber = response.RefNumber;
					sessionStorage.setItem("AxNo", response.RefNumber);
					if (response.ErrorNumber == '800') {
						$rootScope.formData.panStatus = response.ErrorMessage;
						// $rootScope.formData.panStatus = 'It looks like your application is already in progress with Axis Direct. To know the status of your application.'
					}
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return false;
				}
				if (response.PanAadharSeeding == 'Y') {
					// if (PanAadharSeeding == 'Y') {
					//sessionStorage.setItem('AxToken', response.Token);
					sessionStorage.setItem('DOB', $rootScope.formData.dob);
					sessionStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus = response.Registration.PanStatus;
					$rootScope.formData.hideBtn = false;
					$rootScope.formData.otherMode = false;
					$rootScope.formData.kraChecking = false;

					$rootScope.formData.IsClone = response.IsClone;
					$scope.panVerified = false;
					if (!response.IsSuccess) {
						$rootScope.formData.otherMode = true;
						$rootScope.formData.HideOkayBtn = false;
						$rootScope.formData.hideCancel = true;
					}
					if (response.ErrorNumber == '303' || response.FinacleErrorCode == '300') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.otherMode = false;
						$rootScope.formData.getKraDetails = true;
						$rootScope.formData.panStatus = response.ErrorMessage;
						if (response.FinacleErrorCode == '300') {
							$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details.";
						}
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();

						if (response.ClientInfo.FirstName) {
							$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
							sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
						}

						if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
							$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
							//$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
							sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
						}

						if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
							$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
							sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
							//$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
						} else if (response.ClientInfo.LastName && !(response.ClientInfo.FirstName)) {
							var name = response.ClientInfo.LastName.split(" ");
							$rootScope.formData.fields.firstName = name[0];
							sessionStorage.setItem('CFirstname', $rootScope.formData.fields.firstName);
							if (name[1] && name[1] != 'undefined' && !name[2]) {
								$rootScope.formData.fields.lastName = name[1];
								sessionStorage.setItem('CLastname', $rootScope.formData.fields.lastName);
							}
							if (name[1] && name[1] != 'undefined' && name[2] && name[2] != 'undefined') {
								$rootScope.formData.fields.middleName = name[1];
								sessionStorage.setItem('CMiddlename', $rootScope.formData.fields.middleName);
							}
							var len = name.length;
							var nameArray = [];
							if (len >= 3) {
								for (var i = 2; i < len; i++) {
									nameArray.push(name[i]);
								}
								$rootScope.formData.fields.lastName = nameArray.join(" ");
							} else if (len == 1) {
								$rootScope.formData.fields.lastName = '.';
								sessionStorage.setItem('CLastname', '.');
							} else {
								$rootScope.formData.fields.lastName = name[1];
								//$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
								$rootScope.formData.fields.middleName = '';
							}
						}
						if (response.ClientInfo.LastName == '' || response.ClientInfo.LastName == undefined || !response.ClientInfo.LastName) {
							$rootScope.formData.fields.lastName = '.';
							sessionStorage.setItem('CLastname', '.');
						}
					} else if (response.ErrorNumber == '902' || response.ErrorNumber == '903' || response.ErrorNumber == '901') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.getKraDetails = false;
						$rootScope.formData.otherMode = true;
						$rootScope.formData.HideOkayBtn = false;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
					} else if (response.ErrorNumber == '500') {
						$rootScope.formData.panStatus = response.ErrorMessage;
						$rootScope.formData.apiLoading = false;
						var DebarredPan = new bootstrap.Modal(document.getElementById('DebarredPan'), {
							backdrop: 'static',
							keyboard: false
						});
						DebarredPan.show();
					} else if ($rootScope.formData.IsClone) {
						if (response.IsReferenceNumberExist) {
							$scope.refernceExist = true;
							$rootScope.dobFreeze = true;
							$rootScope.formData.applicationDisabled = false;
							var u_url = "DIYGetThirdPartyBankDetailsByReferenceNumber";

							var u_data = {
								"ReferenceNumber": $rootScope.formData.eRefNumber,
								"PanNumber": $rootScope.formData.fields.panNumber,
								"EncryptToken": ""
							}
							serverService.apiCall(u_url, u_data).then(function (a) {
								var response = a.data;
								if (response.IsSuccess) {
									if (response.BankDetailsList) {
										if (response.BankDetailsList[0].UTMBankName) {
											utm_bank = response.BankDetailsList[0].UTMBankName;
											$rootScope.getBankLogo();
										}
									}
								}
							});
						}

						if (response.IsReferenceNumberExist && response.FinacleErrorCode == '300') {
							$scope.refernceExist = true;
							$rootScope.dobFreeze = true;
							$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details.";
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
							$rootScope.formData.getKraDetails = true;
							$rootScope.formData.otherMode = false;

						} else {

							$rootScope.planLoadStop = true;
							$rootScope.panLoaded = false;
							$rootScope.cloneData();
						}

					} else if (response.IsSuccess && $rootScope.formData.panStatus != null) {
						// if ($rootScope.formData.RMModule) {
						// 	$scope.generateRMOTP();
						// } else {
						$rootScope.pan = false;
						$rootScope.krasearch = true;
						$rootScope.planLoadStop = true;
						$scope.panVerified = true;
						$rootScope.formData.getKraDetails = true;
						$rootScope.formData.apiLoading = false;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						// }
					} else {
						$rootScope.formData.getKraDetails = true;
						$rootScope.planLoadStop = true;
						if (response.ErrorNumber == '700') {
							$rootScope.formData.otherMode = true;
							$rootScope.formData.HideOkayBtn = true;
							$rootScope.formData.apiLoading = false;
							// $rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p> <p>*Note - If you had an erstwhile account with Karvy Stocking broking, you may open your Demat account with us now by simply clicking the link below and following a few steps using your PAN no and Aadhar no., if not already done.</p> <p>Link for Karvy Customers: <a href='https://digitalaccount.axisdirect.in/Karvy'>https://digitalaccount.axisdirect.in/Karvy</a></p>";
							$rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p>";
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
						} else if ($rootScope.formData.panStatus != null) {
							$rootScope.formData.apiLoading = false;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
						} else if (response.ErrorMessage != null && response.ErrorMessage != '') {
							if (response.ErrorNumber == '400') {
								$rootScope.formData.panStatus = 'Your details are already available with us. Our executive  will get in touch with you or Call us.';
								$rootScope.formData.otherMode = true;
								$rootScope.formData.HideOkayBtn = false;
								$rootScope.formData.apiLoading = false;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
							} else {
								$rootScope.formData.panStatus = response.ErrorMessage;
								sessionStorage.setItem('DOB', response.ClientInfo.DateofBirth);
								sessionStorage.setItem("RxPan", response.ClientInfo.PANNumber);
								sessionStorage.setItem("RxMobile", response.ClientInfo.Mobile);
								sessionStorage.setItem("RxEmail", response.ClientInfo.Email);
								$rootScope.formData.fields.email = response.ClientInfo.Email;
								$rootScope.formData.fields.mobile = response.ClientInfo.Mobile;
								$rootScope.formData.fields.panNumber = response.ClientInfo.PANNumber;
								$rootScope.formData.fields.dob = response.ClientInfo.DateofBirth;
								$rootScope.formData.dob = response.ClientInfo.DateofBirth;
								$rootScope.formData.apiLoading = false;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
							}
						} else if (response.FailureMessage != null && response.FailureMessage != '') {
							$rootScope.formData.panStatus = response.FailureMessage;
							$rootScope.formData.apiLoading = false;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
						}
					}
					if (response.ClientInfo.FirstName) {
						$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
						sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
					}

					if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
						$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
						//$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
						sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
					}

					if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
						$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
						sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
						//$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
					} else if (response.ClientInfo.LastName && !(response.ClientInfo.FirstName)) {
						var name = response.ClientInfo.LastName.split(" ");
						$rootScope.formData.fields.firstName = name[0];
						sessionStorage.setItem('CFirstname', $rootScope.formData.fields.firstName);
						if (name[1] && name[1] != 'undefined' && !name[2]) {
							$rootScope.formData.fields.lastName = name[1];
							sessionStorage.setItem('CLastname', $rootScope.formData.fields.lastName);
						}
						if (name[1] && name[1] != 'undefined' && name[2] && name[2] != 'undefined') {
							$rootScope.formData.fields.middleName = name[1];
							sessionStorage.setItem('CMiddlename', $rootScope.formData.fields.middleName);
						}
						var len = name.length;
						var nameArray = [];
						if (len >= 3) {
							for (var i = 2; i < len; i++) {
								nameArray.push(name[i]);
							}
							$rootScope.formData.fields.lastName = nameArray.join(" ");
						} else if (len == 1) {
							$rootScope.formData.fields.lastName = '.';
							sessionStorage.setItem('CLastname', '.');
						} else {
							$rootScope.formData.fields.lastName = name[1];
							//$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
							$rootScope.formData.fields.middleName = '';
						}
					}
					if ((response.ClientInfo.LastName == '' || response.ClientInfo.LastName == undefined) && response.ClientInfo.FirstName) {
						$rootScope.formData.fields.lastName = '.';
						sessionStorage.setItem('CLastname', '.');
					}
				} else {
					if ($rootScope.webfinacle) {
						// $rootScope.formData.panStatus = '<p><strong>Please Note:</strong>  Post Account Opening, you will only be allowed to trade if your PAN is linked with your Aadhaar.</p><p>Exchange Circular (NSE/ISC/55472) restricts trading in all such accounts, however, it does not restrict you from opening a trading account with us.</p>';
						$rootScope.formData.panStatus = '<p style="text-align:left;font-size:12px;line-height:1;">It seems that your Aadhar-PAN seeding is not done yet. Request you to please link your Aadhar card with your PAN card to open a Trading & Demat account with us.</p><p style="text-align:left;font-size:12px;"><strong>Steps to Link Aadhaar with Pan:</strong></p><ol style="font-size:12px;"><li><p  style="text-align:left;font-size:12px;line-height:1;">Visit <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank">Income Tax Website</a></p></li><li><p style="text-align:left;font-size:12px;line-height:1;">Under Quick Link, click on <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" target="_blank">Link Aadhar</a></p></li><li><p style="text-align:left;font-size:12px;line-height:1;">Enter PAN & Aadhaar details, validate the entered details and complete the payment.</p></li></ol><p style="font-size:12px;line-height:1;text-align:left;">For Detailed PAN-AADHAAR MANUAL, please <a href = "https://www.incometax.gov.in/iec/foportal/help/how-to-link-aadhaar" target="_blank">Click here</a></p>';
						$rootScope.formData.getKraDetails = false;
						$rootScope.formData.otherMode = false;
						$rootScope.formData.panSeedingBtnShow = true;
						$scope.panSeedingBtnShowheader = true;

						$rootScope.formData.GetPanStatusDetails = response.Registration.PanStatus;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						return false;
					}

					$rootScope.formData.otherMode = true;
					$rootScope.formData.HideOkayBtn = true;
					$rootScope.formData.apiLoading = false;
					if (response.ErrorNumber == '303' || response.FinacleErrorCode == '300') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.otherMode = false;
						$rootScope.formData.getKraDetails = true;
						$rootScope.formData.panStatus = response.ErrorMessage;
						if (response.FinacleErrorCode == '300') {
							$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details.";
						}
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();

						if (response.ClientInfo.FirstName) {
							$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
							sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
						}

						if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
							$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
							//$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
							sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
						}

						if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
							$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
							sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
							//$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
						} else if (response.ClientInfo.LastName && !(response.ClientInfo.FirstName)) {
							var name = response.ClientInfo.LastName.split(" ");
							$rootScope.formData.fields.firstName = name[0];
							sessionStorage.setItem('CFirstname', $rootScope.formData.fields.firstName);
							if (name[1] && name[1] != 'undefined' && !name[2]) {
								$rootScope.formData.fields.lastName = name[1];
								sessionStorage.setItem('CLastname', $rootScope.formData.fields.lastName);
							}
							if (name[1] && name[1] != 'undefined' && name[2] && name[2] != 'undefined') {
								$rootScope.formData.fields.middleName = name[1];
								sessionStorage.setItem('CMiddlename', $rootScope.formData.fields.middleName);
							}
							var len = name.length;
							var nameArray = [];
							if (len >= 3) {
								for (var i = 2; i < len; i++) {
									nameArray.push(name[i]);
								}
								$rootScope.formData.fields.lastName = nameArray.join(" ");
							} else if (len == 1) {
								$rootScope.formData.fields.lastName = '.';
								sessionStorage.setItem('CLastname', '.');
							} else {
								$rootScope.formData.fields.lastName = name[1];
								//$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
								$rootScope.formData.fields.middleName = '';
							}
						}
						if (response.ClientInfo.LastName == '' || response.ClientInfo.LastName == undefined || !response.ClientInfo.LastName) {
							$rootScope.formData.fields.lastName = '.';
							sessionStorage.setItem('CLastname', '.');
						}
					} else if (response.ErrorNumber == '902' || response.ErrorNumber == '903' || response.ErrorNumber == '901') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.otherMode = true;
						$rootScope.formData.HideOkayBtn = false;
						$rootScope.formData.panStatus = response.Registration.PanStatus;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
					} else if (response.ErrorNumber == '500') {
						$rootScope.formData.panStatus = response.ErrorMessage;
						$rootScope.formData.apiLoading = false;
						var DebarredPan = new bootstrap.Modal(document.getElementById('DebarredPan'), {
							backdrop: 'static',
							keyboard: false
						});
						DebarredPan.show();
					} else if ($rootScope.formData.IsClone) {
						if (response.IsReferenceNumberExist) {
							$scope.refernceExist = true;
							$rootScope.dobFreeze = true;
							$rootScope.formData.applicationDisabled = false;
							var u_url = "DIYGetThirdPartyBankDetailsByReferenceNumber";

							var u_data = {
								"ReferenceNumber": $rootScope.formData.eRefNumber,
								"PanNumber": $rootScope.formData.fields.panNumber,
								"EncryptToken": ""
							}
							serverService.apiCall(u_url, u_data).then(function (a) {
								var response = a.data;
								if (response.IsSuccess) {
									if (response.BankDetailsList) {
										if (response.BankDetailsList[0].UTMBankName) {
											utm_bank = response.BankDetailsList[0].UTMBankName;
											$rootScope.getBankLogo();
										}
									}
								}
								else if (!response.IsSuccess && response.ErrorCode == '-1') {
									$rootScope.formData.apiLoading = false;
									$rootScope.formData.panStatus = response.ErrorMessage;
									var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
										backdrop: 'static',
										keyboard: false
									});
									paninformation.show();
									return
								}
							});
						}

						if (response.IsReferenceNumberExist && response.FinacleErrorCode == '300') {
							$scope.refernceExist = true;
							$rootScope.dobFreeze = true;
							$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details.";
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
							$rootScope.formData.getKraDetails = true;
							$rootScope.formData.otherMode = false;

						} else {

							$rootScope.planLoadStop = true;
							$rootScope.panLoaded = false;
							$rootScope.cloneData();
						}

					} else {
						$rootScope.formData.getKraDetails = true;
						$rootScope.planLoadStop = true;
						if (response.ErrorNumber == '700') {
							// $rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p> <p>*Note - If you had an erstwhile account with Karvy Stocking broking, you may open your Demat account with us now by simply clicking the link below and following a few steps using your PAN no and Aadhar no., if not already done.</p> <p>Link for Karvy Customers: <a href='https://digitalaccount.axisdirect.in/Karvy'>https://digitalaccount.axisdirect.in/Karvy</a></p>"
							$rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p> "

						} else if (response.ErrorMessage != null && response.ErrorMessage != '') {
							if (response.ErrorNumber == '400') {
								$rootScope.formData.panStatus = 'Your details are already available with us. Our executive  will get in touch with you or Call us.';
								$rootScope.formData.otherMode = true;
								$rootScope.formData.HideOkayBtn = false;
								$rootScope.formData.apiLoading = false;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
							} else if (response.ErrorNumber == '2026') {
								$rootScope.formData.getKraDetails = false;
								$rootScope.formData.panStatus = response.ErrorMessage
								$rootScope.formData.otherMode = true;
								$rootScope.formData.HideOkayBtn = false;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
							}
							else {
								// $rootScope.formData.panStatus = response.ErrorMessage;
								// sessionStorage.setItem('DOB', response.ClientInfo.DateofBirth);
								// sessionStorage.setItem("RxPan", response.ClientInfo.PANNumber);
								// sessionStorage.setItem("RxMobile", response.ClientInfo.Mobile);
								// sessionStorage.setItem("RxEmail", response.ClientInfo.Email);
								// $rootScope.formData.fields.email = response.ClientInfo.Email;
								// $rootScope.formData.fields.mobile = response.ClientInfo.Mobile;
								// $rootScope.formData.fields.panNumber = response.ClientInfo.PANNumber;
								// $rootScope.formData.fields.dob = response.ClientInfo.DateofBirth;
								// $rootScope.formData.dob = response.ClientInfo.DateofBirth;
								// $rootScope.formData.apiLoading = false;
								// var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								// 		backdrop: 'static',
								// 		keyboard: false
								// 	});
								// paninformation.show();
								$rootScope.formData.apiLoading = false;
								$rootScope.formData.getKraDetails = false;
								$rootScope.formData.panStatus = response.ErrorMessage;
								$rootScope.formData.otherMode = true;
								$rootScope.formData.HideOkayBtn = false;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
							}
						} else if (response.FailureMessage != null && response.FailureMessage != '') {
							$rootScope.formData.panStatus = response.FailureMessage;
							$rootScope.formData.apiLoading = false;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
						}
						else if (!response.IsSuccess && response.ErrorCode == '-1') {
							$rootScope.formData.apiLoading = false;
							$rootScope.formData.panStatus = response.ErrorMessage;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
						} else {
							// $rootScope.formData.panStatus = 'Your account cannot be processed.';
							$rootScope.formData.panStatus = '<p style="text-align:left;font-size:12px;line-height:1;">It seems that your Aadhar-PAN seeding is not done yet. Request you to please link your Aadhar card with your PAN card to open a Trading & Demat account with us.</p><p style="text-align:left;font-size:12px;"><strong>Steps to Link Aadhaar with Pan:</strong></p><ol style="font-size:14px;"><li><p  style="text-align:left;font-size:12px;line-height:1;">Visit <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank">Income Tax Website</a></p></li><li><p style="text-align:left;font-size:12px;line-height:1;">Under Quick Link, click on <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" target="_blank">Link Aadhar</a></p></li><li><p style="text-align:left;font-size:12px;line-height:1;">Enter PAN & Aadhaar details, validate the entered details and complete the payment.</p></li></ol><p style="font-size:12px;line-height:1;text-align:left;">For Detailed PAN-AADHAAR MANUAL, please <a href = "https://www.incometax.gov.in/iec/foportal/help/how-to-link-aadhaar" target="_blank">Click here</a></p>';

							// $rootScope.formData.panStatus = '<p><strong>Please Note:</strong>  Post Account Opening, you will only be allowed to trade if your PAN is linked with your Aadhaar.</p><p>Exchange Circular (NSE/ISC/55472) restricts trading in all such accounts, however, it does not restrict you from opening a trading account with us.</p>';
							$rootScope.formData.getKraDetails = false
							$rootScope.formData.otherMode = false;
							$rootScope.formData.panSeedingBtnShow = true
							$scope.panSeedingBtnShowheader = true;
							$rootScope.formData.GetPanStatusDetails = response.Registration.PanStatus;
						}
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
					}
					if (response.ClientInfo.FirstName) {
						$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
						sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
					}

					if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
						$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
						//$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
						sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
					}

					if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
						$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
						sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
						//$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
					} else if (response.ClientInfo.LastName && !(response.ClientInfo.FirstName)) {
						var name = response.ClientInfo.LastName.split(" ");
						$rootScope.formData.fields.firstName = name[0];
						sessionStorage.setItem('CFirstname', $rootScope.formData.fields.firstName);
						if (name[1] && name[1] != 'undefined' && !name[2]) {
							$rootScope.formData.fields.lastName = name[1];
							sessionStorage.setItem('CLastname', $rootScope.formData.fields.lastName);
						}
						if (name[1] && name[1] != 'undefined' && name[2] && name[2] != 'undefined') {
							$rootScope.formData.fields.middleName = name[1];
							sessionStorage.setItem('CMiddlename', $rootScope.formData.fields.middleName);
						}
						var len = name.length;
						var nameArray = [];
						if (len >= 3) {
							for (var i = 2; i < len; i++) {
								nameArray.push(name[i]);
							}
							$rootScope.formData.fields.lastName = nameArray.join(" ");
						} else if (len == 1) {
							$rootScope.formData.fields.lastName = '.';
							sessionStorage.setItem('CLastname', '.');
						} else {
							$rootScope.formData.fields.lastName = name[1];
							//$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
							$rootScope.formData.fields.middleName = '';
						}
					}
					if (response.ClientInfo.LastName == '' || response.ClientInfo.LastName == undefined || !response.ClientInfo.LastName) {
						$rootScope.formData.fields.lastName = '.';
						sessionStorage.setItem('CLastname', '.');
					}
				}

			}, function (e) {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();;
			});
		}
	}
	$scope.panSeedingPopupDetail = function () {
		$('#paninformation').modal('hide');
		var PanSeedinginformation = new bootstrap.Modal(document.getElementById('PanSeedinginformation'), {
			backdrop: 'static',
			keyboard: false
		});
		PanSeedinginformation.show();
	}
	$scope.openCheckAccountStatus = function () {

		$('#paninformation').modal('hide')
		// $rootScope.krasearch = false;
		// $rootScope.emailMobile = true;
		// $rootScope.pan = false;
		$rootScope.opencheckAStatus = true;
		// $state.go('register');
		sessionStorage.clear()
		// location.reload()
		var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'), {
			backdrop: 'static',
			keyboard: false
		});
		existingCustomerpopup.show();
	}

	$scope.updateRegistration = function () {

		var url = "DIYUpdateRegistration";
		var userDob = $rootScope.formData.fields.DOB;
		var sendData = {
			Mobile: $rootScope.formData.fields.mobile,
			Email: $rootScope.formData.fields.email,
			PanNumber: $rootScope.formData.fields.panNumber,
			DOB: userDob,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		}
		serverService.apiCall(url, sendData);
	}
	if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
		$rootScope.formData.RMModule = true;
		$scope.emailMobile = false;
		$rootScope.wizardShow = true;
		$rootScope.formData.rmOptions = true;
		$rootScope.pan = true;
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
					$scope.$applyAsync();
				}
			});

			$("#txtDOB").datepicker("option", "showAnim", "blind");
		}, 100)
		//$rootScope.formData.rmOptionsBox();
		if (!$rootScope.formData.rmcode) {
			$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
		}
	}
	if ($rootScope.janabank || sessionStorage.getItem('JanaBank') == "true") {
		$rootScope.formData.fields.mobile = sessionStorage.getItem('jMobile');
		$rootScope.formData.fields.email = sessionStorage.getItem('jEmail');
		$rootScope.formData.fields.panNumber = sessionStorage.getItem('jPanNumber');
		var dob = sessionStorage.getItem('jDOB');
		dobs = sessionStorage.getItem('jDOB').substring(6, 8) + '/' + sessionStorage.getItem('jDOB').substring(4, 6) + '/' + sessionStorage.getItem('jDOB').substring(0, 4);
		$rootScope.formData.fields.DOB = dobs;
		$('#txtDOB').val($rootScope.formData.fields.DOB);
		$scope.registration();
	}

	window.onbeforeunload = function () {
		if ($rootScope.webkarvy) {
			sessionStorage.setItem('karvyData', JSON.stringify($rootScope.karvyData));
		}

		if ($rootScope.formData.fields.panNumber) {
			sessionStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
		}

		sessionStorage.setItem("DOB", $rootScope.formData.dob);
	}

	$('#cloneData').on("ifClicked", function (event) {
		$rootScope.cloneData();
		$('#clone').modal('hide');
		$scope.$applyAsync();
	});

	$scope.existingDroppedToken = function () {
		if ($rootScope.formData.tokenValidation && $rootScope.formData.ReferenceNumber) {
			var url = "GetEncrptToken";
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var data = a.data;
				$rootScope.formData.apiLoading = false;
				if (data.EncryptToken) {
					$rootScope.EncryptToken = data.EncryptToken;
					sessionStorage.setItem('AxToken', data.EncryptToken);
					$rootScope.cloneData();
				}
			});
		}
	}
	$scope.getUserDetails = function ($event) {
		var url = "GetLandingDetails"
		var sendData = {
			'MobileNumber': $rootScope.formData.fields.mobile
		}
		sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {
				if (!lccode) {
					$rootScope.formData.assistedLCCode = response.AssistLCCode;
					sessionStorage.setItem('AssistLCCode', response.AssistLCCode);
				}
				if (!lgcode) {
					$rootScope.formData.assistedLGCode = response.AssistLGCode;
					sessionStorage.setItem('AssistLGCode', response.AssistLGCode);
				}
				$rootScope.formData.fields.username = response.ClientName;
				$rootScope.formData.fields.email = response.EmailId;
				$('#city_value').val(response.City);
				$scope.emptyUsername = false;
				$scope.emptyMobile = false;
				$scope.emptyEmail = false;
				$scope.emptyCityName = false;
			}
		});
	}
	$rootScope.allSelect = function () {
		$('#Aadhaar-terms').prop('checked', true);
		$('#Driving-terms').prop('checked', true);
		$('#PAN-terms').prop('checked', true);
		$('#DigiLocker-terms').prop('checked', true);
	}
	$scope.CKYCValidation = function () {
		if (!$rootScope.formData.IsClone && $rootScope.formData.ReferenceNumber && !$rootScope.formData.applicationDisabled) {
			$rootScope.getDIYStatus();
		} else {

			var url = "CKYCSearchTrackwizzSData";

			if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
				mode = 'R';
			}
			if ($rootScope.webJana) {
				mode = 'J';
			}
			if ($rootScope.uBank) {
				mode = 'U'
			}
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.panNumber);
			var panNumber = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.dob);
			var dob = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.email);
			var email = encryptedpassword.toString();
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.mobile);
			var mobile = encryptedpassword.toString();
			if ($rootScope.formData.fields.firstName != undefined) {
				var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.firstName);
				var fname = encryptedpassword.toString();
			}
			if ($rootScope.formData.fields.lastName != undefined) {
				var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.lastName);
				var lname = encryptedpassword.toString();
			}
			if ($rootScope.formData.fields.middleName != undefined) {
				var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.middleName);
				var mname = encryptedpassword.toString();
			}
			sessionStorage.setItem('mode', mode)
			if ($rootScope.siddhiApp) {
				mobile = "";
				email = "";
				$rootScope.formData.fields.mobile = "";
				$rootScope.formData.fields.email = "";
			}
			if ($rootScope.rkMode) {
				$scope.isMobileVerified = "Y";
				$scope.isEmailVerified = 1;
			}
			var sendData = {
				FirstName: fname,
				LastName: lname,
				MiddleName: mname,
				EncMobile: mobile,
				EncEmail: email,
				PanNumber: panNumber,
				SiddhiApp: $rootScope.siddhiApp,
				DOB: dob,
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
				KRAClient: $scope.KRAVerifiedClient,
				RMCode: $rootScope.formData.fields.rmcode,
				RoleName: $rootScope.formData.roleName,
				EmployeeId: $rootScope.formData.fields.rmid,
				IsMobileverified: $scope.isMobileVerified,
				IsEmailverified: $scope.isEmailVerified,
				Mode: mode,
				IsDiy: true,
				IsWeb: 'True',
				EncryptToken: $rootScope.EncryptToken,
				EncrptFlag: $rootScope.encryptReq("true"),
				LCCode: $rootScope.formData.assistedLCCode,
				LGCode: $rootScope.formData.assistedLGCode,
				Utm_Campaign: utm_campaign,
			}
			sendData['CouponCode'] = ($rootScope.jio || $rootScope.CreditCard) && $rootScope.formData.fields.coupon ? $rootScope.encryptReq($rootScope.formData.fields.coupon) : "";
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				}
				if (response) {
					if (response.ReferenceNumber) {
						$rootScope.dobFreeze = true;
						if ($scope.refernceExist) {
							$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
							$rootScope.formData.RefNumber = response.RefNumber;
							$rootScope.formData.eRefNumber = response.RefNumber;
							sessionStorage.setItem('RxReferenceNumber', response.ReferenceNumber);
							sessionStorage.setItem("AxNo", response.RefNumber);
							$rootScope.getDIYStatus();

						} else {
							$rootScope.formData.referenceGenerated = true;
							$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
							$rootScope.formData.RefNumber = response.RefNumber;
							$rootScope.formData.eRefNumber = response.RefNumber;
							sessionStorage.setItem('RxReferenceNumber', response.ReferenceNumber);
							sessionStorage.setItem("AxNo", response.RefNumber);
							if (sessionStorage.getItem("Gmailverify") === 'Y' || sessionStorage.getItem("ManuvalGmailverify") === 'Y') {
								var url = "EmailVerification";
								// var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.email), key, {
								// 	keySize: 128 / 8,
								// 	iv: iv,
								// 	mode: CryptoJS.mode.CBC,
								// 	padding: CryptoJS.pad.Pkcs7
								// });
								// var email = encryptedpassword.toString();
								var sendData = {
									"ReferenceNumber": $rootScope.formData.eRefNumber,
									"RI": sessionStorage.getItem("EmailENC"),
									"EmailVerify": true,
									"ProvidedEmailIdbelongingto": 'S'
								}
							} else {
								if (!$rootScope.formData.RMModule) {
									var url = "EmailVerificationUrl";
									sendData = {
										ReferenceNumber: $rootScope.formData.eRefNumber,
										Email: $rootScope.formData.fields.email
									};
								}
							}
							//sendData = $rootScope.encryptReq(sendData);
							serverService.apiCall(url, sendData);

							if (!$rootScope.formData.RMModule && !$rootScope.webJana && !$rootScope.webfinacle && !$rootScope.janabank && !$rootScope.webkarvy) {
								var murl = "MobileByReferenceNumberEnc";
								var msendData = {
									ReferenceNumber: $rootScope.formData.eRefNumber,
									Mobile: $rootScope.formData.fields.mobile,
									MobileFlag: "Y"
								}
								msendData = $rootScope.encryptReq(msendData);
								serverService.apiCall(murl, msendData);
							}
							$rootScope.formData.rmPopupData = {
								"name": response.AgentFirstName,
								"referenceNumber": response.ReferenceNumber,
								"mobile": response.AgentMobile
							};
							if ($rootScope.formData.assistedLGCode || $rootScope.formData.assistedLCCode) {
								$rootScope.codeMaping();
							}
							var dpval = '';

							if (dp) {
								if (dp == 'Yes') {
									dpval = 'Y'
								}
								if (dp == 'No') {
									dpval = 'N'
								}
							}
							var isCMLMandatoryval = false;
							if (isCMLMandatory) {
								if (isCMLMandatory == '1' || isCMLMandatory == 1) {
									isCMLMandatoryval = true
								}
							}

							// if ((utm_bank && dp) || lgcode || lccode || bankname || planId || productId || segment || isCMLMandatory || referral_code || Utm_promoCode) {
							if (UTM_bank || utm_bank || dp || lgcode || lccode || bankname || planId || productId || segment || isCMLMandatory || referral_code || Utm_promoCode) {
								if (bankname) {
									utm_bank = bankname;
								} else {
									utm_bank = UTM_bank;
								}
								if (productId) {
									planId = productId;
								}
								var s_url = "ThirdPatyBankDetailsIntegration";

								var sendData = {
									"PanNumber": $rootScope.formData.fields.panNumber,
									"Mobile": $rootScope.formData.fields.mobile,
									"emailid": $rootScope.formData.fields.email,
									"DpId": "",
									"Demattype": "",
									"UtmBankShortName": utm_bank,
									"LCCode": lccode,
									"LGCode": lgcode,
									"Dp": dpval,
									"PlanId": planId,
									"Segment": segment,
									"IsCMLCopy": isCMLMandatoryval,
									"ReferralCode": referral_code,
									"PromoCode": Utm_promoCode
								}
								serverService.apiCall(s_url, sendData);
							}

							if (response.a23CkycResponseDetail) {
								if (response.a23CkycResponseDetail.cKYCPersonalDetail) {
									if (response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber) {
										var letter = response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber.charAt(0).toLowerCase();
									}
									if ($rootScope.webfinacle && (letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S')) { }
									else if (response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCClient == 'Y' && response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber && response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCCorAddPin) {
										$rootScope.formData.CKYC = true;
										sessionStorage.setItem('CKYCResponseData', JSON.stringify(response.a23CkycResponseDetail.cKYCPersonalDetail));
										sessionStorage.setItem('IsCKYC', response.IsSuccess);
									}
								}
							}
							$rootScope.WBTempPersistence();
						}

						if (response.IsSuccess && Object.keys($rootScope.searchParams).length > 0 && Object.keys($rootScope.searchParams).includes('utm_tool')) {
							if ($rootScope.searchParams.utm_tool == 'appsFlyer') {
								$scope.appsFly();
							}
						}
					} else {
						if (response.ErrorMessage) {
							$rootScope.apiResponseErrorMsg = response.ErrorMessage;
						} else {
							$rootScope.apiResponseErrorMsg = response.FailureMessage;
						}
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
							backdrop: 'static',
							keyboard: false
						});
						APIResponseModal.show();
					}
				}
			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();;
			});
		}
	}
	$scope.regdecryptUrl = function () {

		var url = "GetRefNoByPANMobileEnc";
		$rootScope.formData.fields.panMobile = $rootScope.formData.fields.panNumber;

		var sendData = {
			PANNumber: $rootScope.formData.fields.panMobile,
			PhoneNo: ""
		}
		$rootScope.formData.apiLoading = true;
		$rootScope.ibmbResume = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			$rootScope.krasearch = false;
			$rootScope.pan = true;
			if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			}
			var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'), {
				backdrop: 'static',
				keyboard: false
			});
			existingCustomerpopup.show();
			$rootScope.existingResponse = true;

			$rootScope.Extmobile = response.Mobile;
			$rootScope.Extemail = response.Email;
		})
	}
	$scope.kraValidation = function () {

		if ($rootScope.formData.DebarredPan) {
			$rootScope.pan = false;
			$rootScope.emailMobile = true;
			$window.sessionStorage.clear();
			$state.go('register');
		}

		var surl = "VerifyKRAClientStatusEnc";
		var userDob = $rootScope.formData.fields.DOB;
		var sendData = {
			Mobile: $rootScope.formData.fields.mobile,
			Email: $rootScope.formData.fields.email,
			PanNumber: $rootScope.formData.fields.panNumber,
			DOB: $rootScope.formData.dob,
			RMCode: $rootScope.formData.fields.rmcode,
			Mode: mode,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken,
			ReferenceNumber: $rootScope.formData.ReferenceNumber
		}
		$('.loader-info.paninfo').css('display', 'block');
		$rootScope.formData.kraChecking = true;
		$rootScope.formData.checkingMessage = "Please wait. We're verifying your KYC details from KRA site.";

		$(".text-animation-area .step1").removeClass().addClass('axremoveText');
		$(".text-animation-area .step2").removeClass('axTextActive').addClass('axTextHide');
		$(".text-animation-area .step3").removeClass('axTextSemiStart').addClass('axTextActive');
		$(".text-animation-area .step3 i").removeClass().addClass('icon icon-circle-check');
		//$(".text-animation-area .step4").removeClass('axTextStart').addClass('axTextSemiStart');

		//hide wizard section here
		$rootScope.wizardShow = false;
		// sendData = $rootScope.encryptReq(sendData);
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(surl, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (!response.IsSuccess && response.ErrorCode == '-200') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.kraChecking = false;
				$rootScope.KravalidErr = response.ErrorMessage;
				var KravalidModal = new bootstrap.Modal(document.getElementById('Kravalid'), {
					backdrop: 'static',
					keyboard: false
				});
				KravalidModal.show();
				return false;
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
			$rootScope.planLoadStop = true;
			$rootScope.panLoaded = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
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

			if ($rootScope.formData.fields.email) {
				sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
			}
			if ($rootScope.formData.fields.mobile) {
				sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
			}
			sessionStorage.setItem('RxPan', $rootScope.formData.fields.panNumber);
			$('.loader-info.paninfo').css('display', 'none');

			dataLayer.push({
				'event': 'DIY AccountRegister',
				'Application No': $rootScope.formData.ReferenceNumber,
			});
			if (response.Registration.KRAVerifiedClient == 'Y') {
				sessionStorage.setItem("IsKRA", true);
			}

			if (response.ErrorCode == '501') {
				$rootScope.formData.otherMode = true;
				$rootScope.formData.HideOkayBtn = true;
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
			} else {

				$scope.KRAVerifiedClient = response.Registration.KRAVerifiedClient;
				if ($scope.KRAVerifiedClient == 'Y') {
					sessionStorage.setItem("IsKRA", true);
					if (!$rootScope.formData.IsClone) {
						//$rootScope.WBTempPersistence();
						$scope.CKYCValidation();
						$rootScope.formData.getKraDetails = false;
						//$(".select").prop("disabled", true);
					} else {
						if (mode == "I" || mode == "MB") {
							$rootScope.getDIYStatus();
						}
					}
				} else {
					sessionStorage.setItem("IsKRA", false);
					if (!$rootScope.formData.IsClone) {

						if ($rootScope.formData.ReferenceNumber) {
							$rootScope.formData.KRA = false;
							$rootScope.formData.aadhaarProcess = true;

							$rootScope.WBTempPersistence();
							$state.go('address', {
								mobile: $rootScope.formData.EncMobile
							});

						} else {
							$scope.CKYCValidation();

						}
					} else {
						if (mode == "I" || mode == "MB") {
							$rootScope.getDIYStatus();
						}
					}
				}
			}

		}, function (e) {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();;
		});

	}

	$scope.modalPop = function (b) {
		if ($rootScope.formData.getKraDetails) {
			$scope.kraValidation();
		} else {
			$rootScope.getDIYStatus();
		}
	}
	$scope.rmmobileErrorClear = function () {
		$scope.rmemptyMobile = false;
		$scope.rminvalidMobile = false;
	}
	$scope.rmemailErrorClear = function () {
		$scope.rmemptyEmail = false;
		$scope.rminvalidEmail = false;
	}
	$scope.panErrorClear = function () {
		$scope.panCoVaild = false;
		$scope.panInValid = false;
		$scope.panError = false;
		$rootScope.formData.hideBtn = false;
		$scope.panVerified = false;
	}
	$scope.panEnter = function () {
		$scope.registration();
	}

	$scope.chgNumErrClear = function () {
		$scope.sameNumber = false;
		$scope.emptyMobileNew = false;
		$scope.invalidMobileNew = false;
	}

	$scope.resumeApp = function () {
		var callpopup = new bootstrap.Modal(document.getElementById('callpopup'), {
			backdrop: 'static',
			keyboard: false
		});
		callpopup.show();
	}
	$scope.documentuploadpgae = function () {
		$state.go('bank');
	}
	$scope.thankyoupage = function () {
		$state.go('complete');
	}
	$rootScope.Digiterms = function () {
		var Digiterms = new bootstrap.Modal(document.getElementById('Digiterms'), {
			backdrop: 'static',
			keyboard: false
		});
		Digiterms.show();
	}
	$scope.acceptanceletterpage = function () {
		$rootScope.KarvyesingProcess()
	}

	if ($rootScope.webJana) {
		$rootScope.emailMobile = false;
		$rootScope.pan = true;
	}
	window.onscroll = function () { scrollFunction() };

	function scrollFunction() {
		var mybutton = document.getElementById("myBtns");
		if (mybutton) {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				mybutton.style.display = "block";
			} else {
				mybutton.style.display = "none";
			}
		}
		var mybutton1 = document.getElementById("myBtn");
		if (mybutton1) {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				mybutton1.style.display = "block";
			} else {
				mybutton1.style.display = "none";
			}
		}

	}
	setTimeout(function () {
		var header = document.getElementById("myHeader");

		if (!header) return; // Exit if element is still not available

		var sticky = header.offsetTop;

		window.addEventListener("scroll", function () {
			if (window.pageYOffset > sticky) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		});
	}, 0);
	$scope.top = function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}
	$scope.toggleText = function () {
		let points = document.getElementById("points");
		let showMoreText = document.getElementById("moreText");
		let buttonText = document.getElementById("textButton");

		if (points.style.display === "none") {
			showMoreText.style.display = "none";
			points.style.display = "inline";
			buttonText.innerHTML = $rootScope.jio ? 'Explore more investing options' : "Explore More";
		} else {
			showMoreText.style.display = "inline";
			points.style.display = "none";
			buttonText.innerHTML = "Show Less";
		}
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
	}, 2000)
	setTimeout(() => {
		$('#acnumber').text(function (_, val) {
			return val.replace(/\d(?=\d{4})/g, "*");
		});
	}, 100);

	$scope.goto = function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}
	function gtag_report_conversion(url) {
		var callback = function () {
			if (typeof (url) != 'undefined') {
				window.location = url;
			}
		};
		gtag('event', 'conversion', {
			'send_to': 'AW-727858862/lkJbCL6dt9caEK79iNsC',
			'value': 1.0,
			'currency': 'INR',
			'event_callback': callback
		});
		return false;
	}
	function gtag_report_verified(url) {
		var callback = function () {
			if (typeof (url) != 'undefined') {
				window.location = url;
			}
		};
		gtag('event', 'conversion', {
			'send_to': 'AW-727858862/tGSkCP6_qtcaEK79iNsC',
			'value': 1.0,
			'currency': 'INR',
			'event_callback': callback
		});
		return false;
	}

	function gtag_report_pan_conversion(url) {
		var callback = function () {
			if (typeof (url) != 'undefined') {
				window.location = url;
			}
		};
		gtag('event', 'conversion', {
			'send_to': 'AW-727858862/D1E_CL-ludcaEK79iNsC',
			'value': 1.0,
			'currency': 'INR',
			'event_callback': callback
		});
		return false;
	}
	$scope.toggleCards = function () {
		$scope.showAllCards = !$scope.showAllCards;
	};
	$scope.ibmbAssistsChange = function (value) {
		$rootScope.ibmbAssists = value;
		$scope.ibmbAssistError = false;
	}
	$scope.closeotp = function () {
		$scope.resend = false;
	}
	$rootScope.googleEmailVerifyAPI = function () {
		let params = {
			"EMail": $rootScope.formData.fields.email ? $rootScope.formData.fields.email : "test@gmail.com",

		}

		var path = 'GetRequest'
		sessionStorage.setItem('search', window.location.search);
		if (utm_source) {
			sessionStorage.setItem('utm_source', utm_source)
		}
		if ($rootScope.formData.fields.email) {
			sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email)
		}
		sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile)
		if (utm_medium) {
			sessionStorage.setItem('utm_medium', utm_medium)
		}

		if (utm_campaign) {
			sessionStorage.setItem('utm_campaign', utm_campaign)
		}
		params = $rootScope.encryptReq(params)
		serverService.apiCall(path, params).then(function (data) {
			var response = data.data;
			if (response) {
				window.location.assign(response);
			}

		})
	}



	$scope.appsFly = function () {
		$rootScope.formData.apiLoading = true;
		let params = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber,
			"AppsFlayerId": $rootScope.searchParams.utm_tool_id,
			"AppsFlayerTool": $rootScope.searchParams.utm_tool,
			"PanNumber": $rootScope.formData.fields.panNumber,
			"UTMSource": $rootScope.searchParams.utm_source,
			"UTMMedium": $rootScope.searchParams.utm_medium,
			"UTMCampaign": $rootScope.searchParams.utm_campaign,
		}
		const path = 'AppsFlyerRegistartion';
		params = $rootScope.encryptReq(params)
		serverService.apiCall(path, params).then(function (a) {
			$rootScope.formData.apiLoading = false;
			let response = $rootScope.decryptRes(a.data, 'Response');
		}, function (e) {
			// console.log(e)
			$rootScope.formData.apiLoading = false;
		}
		)

	}
	$scope.appsFlyerMob = function () {
		$rootScope.formData.apiLoading = true;
		let params = {
			"MobileNumber": !$scope.EmailField ? $rootScope.formData.fields.mobile : "",
			"AppsFlyerId": $rootScope.searchParams.utm_tool_id,
			// "AppsFlayerTool": $rootScope.searchParams.utm_tool,
			// "PanNumber": $rootScope.formData.fields.panNumber,
			"utm_source": $rootScope.searchParams.utm_source,

			"utm_campaign": $rootScope.searchParams.utm_campaign,
			"Emailid": $scope.EmailField ? $rootScope.formData.fields.email : ""

		}
		const path = 'AppsFlyerMobileOTPReg';
		params = $rootScope.encryptReq(params)
		serverService.apiCall(path, params).then(function (a) {
			$rootScope.formData.apiLoading = false;
			let response = $rootScope.decryptRes(a.data, 'Response');
		}, function (e) {
			// console.log(e)
			$rootScope.formData.apiLoading = false;
		}
		)


	}




}

]);
