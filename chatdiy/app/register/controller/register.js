mainChatApp.controller('registerController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
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
			$scope.initialName = true;
			$scope.enableOTPButton = false;
			$scope.validUsername = false;

			setTimeout(function () {
				$(':radio[name=ritype][value=RI]').iCheck('check');
				$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
				});
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
				if (sessionStorage.getItem('RxReferenceNumber') != null) {
					$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
					$rootScope.getDIYStatus();
				}
			}

			if (!$rootScope.formData.RMModule) {
				$rootScope.formData.rmOptions = false;
				$rootScope.formData.changePassword = false;
				if (!$rootScope.webkarvy && $rootScope.webfinacle) {
					sessionStorage.clear();
				}
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
				if (!$rootScope.webJana) {
					$rootScope.formData.fields.panNumber = '';
					$rootScope.formData.fields.DOB = '';
				}
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
					}
				});
			}

			// Remove Spaces
			$scope.removeSpaces = function (string) {
				return string.split(' ').join('');
			};

			$scope.resendCounter = function (resendType) {
				var counter1 = 59;
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
						$scope.$apply();
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
						$scope.$apply();
					}, 1000);
			}

			$scope.resendEmailCounter = function () {
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
						$scope.$apply();
					}, 1000);
			}

			$scope.firstStage = function () {
				if (!$rootScope.formData.threeinone && $rootScope.formData.ReferenceNumber) {
					$scope.emailMobile = false;
					$scope.otp = false;
					$scope.pan = true;
					$rootScope.formData.stageInfo = '1b';
					$("html, body").animate({
						scrollTop: 0
					}, "slow");
				} else {
					//$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
					$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
					$scope.error = 0;
					if ($rootScope.formData.fields.username == null || $rootScope.formData.fields.username == '') {
						$scope.emptyUsername = true;
						$scope.error++;
						$('#username').focus();
					}

					if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '') {
						$scope.emptyMobile = true;
						$scope.error++;
						$('#mobile').focus();
					} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
						$scope.invalidMobile = true;
						$scope.error++;
						$('#mobile').focus();
					}

					if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '') {
						$scope.emptyEmail = true;
						$scope.error++;
						$('#emailID').focus();
					} else if (!($scope.filter).test($rootScope.formData.fields.email)) {
						$scope.invalidEmail = true;
						$scope.error++;
						$('#emailID').focus();
					}
					// else if($rootScope.formData.fields.email == "dummy@abc.com"){
					// 	$scope.invalidEmail = true;
					// 	$scope.error++;
					// 	$('#emailID').focus();
					// }
					else {
						var e = $rootScope.formData.fields.email.split('@');
						var c = e[0];
						if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c.search('xyz') != -1 || c.search('abc') != -1) {
							$scope.invalidEmail = true;
							$scope.error++;
							$('#emailID').focus();
						}
					}
					if ($('#city_value').val() == null || $('#city_value').val() == '') {
						$scope.emptyCityName = true;
						$scope.error++;
						$('#city').focus();
					}
					var cityArray = [];
					cityArray = JSON.parse(sessionStorage.getItem('CityArray'));
					var cityName = $('#city_value').val();
					if (cityArray != null && cityName.length != 0) {
						if (cityArray.indexOf(cityName.charAt(0).toUpperCase() + cityName.slice(1)) > -1) {
							$scope.invalidCityName = false;
						} else {
							if (!$rootScope.formData.threeinone) {
								$scope.error++;
								$scope.invalidCityName = true;
							}
						}
					} else if (cityName.length < 3 && cityName.length > 1) {
						$scope.invalidCityName = true;
					}
					if ($scope.error == 0) {
						$scope.showRegistrationBtn = true;
						$scope.otpSectionShow = true;
						$rootScope.selectedCity = 'city';
						if ($scope.otpVerified) {
							$scope.emailMobile = false;
							$scope.pan = true;
							$('#pan').focus();
							$rootScope.formData.stageInfo = '1b';

						} else if ($rootScope.formData.fields.authorize) {
							$rootScope.formData.fields.otpMobile = '';
							$scope.invalidOTP = false;
							$rootScope.otpFailure = false;
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
				$scope.$apply();
			}).on("ifUnchecked", function () {
				$rootScope.formData.fields.authorize = false;
				$scope.$apply();
			});

			$scope.generateOTP = function () {
				$scope.error = 0;
				if ($scope.changeNumber) {
					if ($rootScope.formData.fields.mobileNew == null || $rootScope.formData.fields.mobileNew == '') {
						$scope.emptyMobileNew = true;
						$scope.error++;
					} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobileNew) == false) {
						$scope.invalidMobileNew = true;
						$scope.error++;
					} else if ($rootScope.formData.fields.mobileNew == $rootScope.formData.fields.mobile) {
						$scope.sameNumber = true;
						$scope.error++;
					} else {
						$rootScope.formData.fields.mobile = $rootScope.formData.fields.mobileNew;
					}
				}
				if ($scope.error == 0) {
					$scope.otp = true;
					$('#city_value').css({
						"pointer-events": "none",
						"cursor": "not=allowed"
					});
					var sendData = {
						'Mobile': $rootScope.formData.fields.mobile,
						'Email': $rootScope.formData.fields.email,
						'MobileFlag': true,
						'EmailFlag': false,
						'AssistLCCode': $rootScope.formData.assistedLCCode,
						'AssistLGCode': $rootScope.formData.assistedLGCode,
						'City': $('#city_value').val(),
						'ClientName': $rootScope.formData.fields.username,
					};
					var mobile = $rootScope.formData.fields.mobile;
					$rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);
					$rootScope.ShowEmailOtp = true;
					$rootScope.formData.otpEmail = ($rootScope.formData.fields.email).substring(0, 3) + "XXXXXXX" +
					($rootScope.formData.fields.email).substring(10, $rootScope.formData.fields.email.length);

					$scope.getOTP(sendData, '');
				}
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
					'MobileFlag': true,
					'EmailFlag': false,
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
						($rootScope.formData.fields.email).substring(10, $rootScope.formData.fields.email.length); ;
						$rootScope.formData.otpEmail = undefined;
						$rootScope.formData.otpEmailsent = true;
					}
					var sendData = {
						'Mobile': mobile,
						'Email': email,
						'MobileFlag': true,
						'EmailFlag': false,
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
				var url = "OTPGenerationnew";
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

				}, function (e) {
					$('#connection').modal('show');
				});
			};

			$rootScope.otpExist = function () {
				/*$('#otp-resend').modal({
				backdrop: 'static',
				keyboard: true
				});*/
			}

			$scope.redirectToRegister = function () {
				sessionStorage.clear();
				location.reload();
			}

			$scope.togglePassword = function () {
				$scope.typePassword = !$scope.typePassword;
			};
			//$scope.toggleEmailPassword = function () { $scope.typeEmailPassword = !$scope.typeEmailPassword; };

			$scope.validateOTP = function () {
				$scope.error = 0;
				if (angular.isUndefined($rootScope.formData.fields.mobileOTP) || $rootScope.formData.fields.mobileOTP == null || $rootScope.formData.fields.mobileOTP == '') {
					$scope.emptyMobileOTP = true;
					$scope.error++;
					$('#mobileOTP').focus();
				}
				if ($('#city_value').val() == null || $('#city_value').val() == '') {
					$scope.emptyCityName = true;
					$scope.error++;
					$('#city').focus();
				}

				/*if (angular.isUndefined($rootScope.formData.fields.emailOTP) || $rootScope.formData.fields.emailOTP == null || $rootScope.formData.fields.emailOTP == '') {
				$scope.emptyEmailOTP = true;
				$scope.error++;
				$('#emailOTP').focus();
				}*/

				if ($scope.error == 0) {

					$rootScope.formData.apiLoading = true;
					var url = "OTPValidationnew";
					var sendData = {
						//	'OtpCode': $rootScope.formData.fields.otpMobile,
						'Mobile': $rootScope.formData.fields.mobile,
						'Email': $rootScope.formData.fields.email,
						"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
						"EmailOtpCode": '',
						"MobileFlag": true,
						"EmailFlag": false,
						"IsDiy": true,
						"EncryptToken": $rootScope.EncryptToken
					}

					if (sessionStorage.getItem('MobileVerified') != null || sessionStorage.getItem('MobileVerified') != 'Y') {
						sendData.MobileFlag = true;
					} else {
						sendData.MobileFlag = false;
					}
					if (sessionStorage.getItem('EmailVerified') != null || sessionStorage.getItem('EmailVerified') != 'Y') {
						sendData.EmailFlag = false;
					} else {
						sendData.EmailFlag = false;
					}

					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.apiResponseErrorMsg = '';
						$scope.mobileResendStatus = false;
						$scope.emailResendStatus = false;
						$rootScope.formData.apiLoading = false;

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

						if (response.EmailVerified == 'Y') {
							sessionStorage.setItem('EmailVerified', 'Y')
						}
						if (response.MobileVerified == 'Y') {
							sessionStorage.setItem('MobileVerified', 'Y')
						}
						if (response.IsSuccess) {
							//$rootScope.EncryptToken = response.EncryptToken;
							var url = "CheckEmailMobileStatus";
							var sendData = {
								'Mobile': $rootScope.formData.fields.mobile,
								'Email': $rootScope.formData.fields.email,
								'EncryptToken': $rootScope.EncryptToken,
								"MobileOtpCode": $rootScope.formData.fields.mobileOTP,
								"EmailOtpCode": '',
								"IsDiy": true
							}

							serverService.apiCall(url, sendData).then(function (a) {
								var response = a.data;
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
								if (response.IsSuccess) {

									$rootScope.UpdateTempPersistenceResume();
									$scope.emailMobile = false;
									$scope.otp = false;
									$scope.pan = true;
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
									if ($rootScope.formData.threeinone) {
										$rootScope.formData.hideBtn = false;
									}
								} else {
									$scope.invalidOTP = true;
									$scope.otpVerified = false;
									if (response.ErrorMessage) {
										$rootScope.apiResponseErrorMsg = response.ErrorMessage;
									} else {
										$rootScope.apiResponseErrorMsg = "Error in API";
									}
									setTimeout(function () {
										$('#APIResponse').modal({
											backdrop: 'static',
											keyboard: false
										});
									}, 100)
								}
							});
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
							$('#APIResponse').modal({
							backdrop: 'static',
							keyboard: false
							});
							}, 100)*/
						}

					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
					});
				}
			};

			$scope.finInfo = function () {
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
						$scope.pan = false;
						$rootScope.finData = response;
						if($rootScope.finData.basicInfo[0].CKycReferenceNumber){
							var letter = $rootScope.finData.basicInfo[0].CKycReferenceNumber.charAt(0).toLowerCase();
						}
						if(letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S'){
												
						}
						else if ($rootScope.finData.basicInfo[0].CKycReferenceNumber) {
							$rootScope.ckycRefNoIB = true;
							$rootScope.formData.CKYC = true;
							$rootScope.formData.IsCKYC = 'Y';
							sessionStorage.setItem('IsCKYC', true);
						}
						var dob = $rootScope.finData.basicInfo[0].DateOfBirth;
						dob = $rootScope.finData.basicInfo[0].DateOfBirth.substring(8, 10) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(5, 7) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(0, 4);
						$rootScope.finData.basicInfo[0].DateOfBirth = dob;
						$rootScope.formData.dob = dob;
						sessionStorage.setItem('finData', JSON.stringify($rootScope.finData));
						sessionStorage.setItem('finacle', true);
						$rootScope.formData.btnOk = true;
						$('#pan').prop('disabled', true);
						$('#txtDOB').prop('disabled', true);
						$scope.accountRegister();
					} else {
						$('#APIResponse').modal({
							backdrop: 'static',
							keyboard: false
						});
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

				if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
					mode = 'R';
				}

				var sendData = {
					PanNumber: $rootScope.formData.fields.panNumber,
					DOB: $rootScope.formData.dob,
					Mode: mode,
					Mobile: $rootScope.formData.fields.mobile,
					Email: $rootScope.formData.fields.email,
					RMCode: $rootScope.formData.fields.rmcode,
					EmployeeId: $rootScope.formData.fields.rmid,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
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
						$scope.pan = false;
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
			$scope.registration = function () {
				if (!$rootScope.formData.disableApp) {
					if ($rootScope.formData.skipRegister || ($rootScope.formData.ReferenceNumber && !$rootScope.formData.threeinone)) {
						if (sessionStorage.getItem("IsKRA") == 'true' && $rootScope.formData.isg) {
							$state.go('personalDetails', {
								mobile: $rootScope.formData.EncMobile
							});
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
							if (($rootScope.formData.fields.panNumber).length == 10 && (pan_cfilter.test($rootScope.formData.fields.panNumber))) {
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
						if ($rootScope.webkarvy) {
							// $scope.karvyInfo();
							$scope.karvyInfoEcomPan()
						} else if ($rootScope.webfinacle) {
							$scope.finInfo();
						} else if ($rootScope.janabank) {
							$scope.accountRegister();
						} else if ($('#txtDOB').val() == "") {
							$scope.dobError = true;
							$scope.ageValid = false;
							return false;
						} else {
							$scope.emailMobile = false;
							$scope.pan = false;
							$rootScope.krasearch = true;
							if ($rootScope.formData.threeinone) {
								$rootScope.formData.getKraDetails = true;
								$rootScope.formData.ReferenceNumber = sessionStorage.getItem("RxReferenceNumber");
								$(".text-animation-area .step1").removeClass('axTextActive').addClass('axTextHide');
								$(".text-animation-area .step2").removeClass('axTextSSemiStart').addClass('axTextActive');
								$rootScope.ecommercekraValidation();
							} else {
								$scope.accountRegister();
							}

							//$scope.accountRegister();
						}
					}
				}
			}

			$scope.DebarredPan = function () {
				$scope.emailMobile = true;
				$scope.pan = false;
				$rootScope.krasearch = false;
				$state.go('register');
			}

			$scope.accountRegister = function () {
				if (!$rootScope.formData.disableApp) {

					$('.loader-info.paninfo').css('display', 'block');
					//var url = "Registration/DIYKRAExistingClientValidation";
					var url = "EcommercePanSiteValidation";
					if (!$rootScope.janabank) {
						var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
						var date = dateStr[0];
						var month = dateStr[1];
						var year = dateStr[2];
						var NewDate = date + "/" + month + "/" + year;
						$rootScope.formData.fields.DOB = NewDate;
						var userDob = $rootScope.formData.fields.DOB;
						$rootScope.formData.dob = userDob;
					} else {
						$rootScope.formData.dob = $rootScope.formData.fields.DOB
					}
					$rootScope.formData.fields.panNumber = $rootScope.formData.fields.panNumber.toUpperCase();

					if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
						mode = 'R';
					}

					var sendData = {
						PanNumber: $rootScope.formData.fields.panNumber,
						DOB: $rootScope.formData.dob,
						Mode: mode,
						Mobile: $rootScope.formData.fields.mobile,
						Email: $rootScope.formData.fields.email,
						RMCode: $rootScope.formData.fields.rmcode,
						EmployeeId: $rootScope.formData.fields.rmid,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					};

					$(".text-animation-area .step1").removeClass('axTextActive').addClass('axTextHide');
					$(".text-animation-area .step2").removeClass('axTextSSemiStart').addClass('axTextActive');

					//hide wizard section here
					$rootScope.wizardShow = false;

					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						var PanAadharSeeding = "Y";
						$rootScope.formData.apiLoading = false;
						if (response.IsReferenceNumberExist) {
							$scope.refernceExist = true;
							$rootScope.formData.RefNumber = response.RefNumber;
							sessionStorage.setItem("AxNo", response.RefNumber);
							$rootScope.formData.panStatus = response.ErrorMessage;
							$('#paninformation').modal({
								backdrop: 'static',
								keyboard: false
							})
							return false;
						}
						// if (response.PanAadharSeeding == 'Y') {
						if (PanAadharSeeding == 'Y') {
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
							if (response.ErrorNumber == '303') {
								$rootScope.formData.apiLoading = false;
								$rootScope.formData.otherMode = false;
								$rootScope.formData.getKraDetails = true;
								$rootScope.formData.panStatus = response.ErrorMessage;
								$('#paninformation').modal({
									backdrop: 'static',
									keyboard: false
								})

								if (response.ClientInfo.FirstName) {
									$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
									sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
								}

								if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
									$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
									$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
									sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
								}

								if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
									$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
									sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
									$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
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
										$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
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
								$('#paninformation').modal({
									backdrop: 'static',
									keyboard: false
								})
							} else if (response.ErrorNumber == '500') {
								$rootScope.formData.panStatus = response.ErrorMessage;
								$rootScope.formData.apiLoading = false;
								$('#DebarredPan').modal({
									backdrop: 'static',
									keyboard: false
								})
							} else if ($rootScope.formData.IsClone) {
								if (response.IsReferenceNumberExist) {
									$scope.refernceExist = true;
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
									$rootScope.formData.panStatus = "Hey, your account will be opened using your internet banking details."
										$('#paninformation').modal({
											backdrop: 'static',
											keyboard: false
										})
										$rootScope.formData.getKraDetails = true;
									$rootScope.formData.otherMode = false;

								} else {

									$rootScope.planLoadStop = true;
									$rootScope.panLoaded = false;
									$rootScope.cloneData();
								}

							} else if (response.IsSuccess && $rootScope.formData.panStatus != null) {
								$rootScope.planLoadStop = true;
								$scope.panVerified = true;
								$rootScope.formData.getKraDetails = true;
								$rootScope.formData.apiLoading = false;
								$('#paninformation').modal({
									backdrop: 'static',
									keyboard: false
								})
							} else {
								$rootScope.formData.getKraDetails = true;
								$rootScope.planLoadStop = true;
								if (response.ErrorNumber == '700') {
									$rootScope.formData.otherMode = true;
									$rootScope.formData.HideOkayBtn = true;
									$rootScope.formData.apiLoading = false;
									$rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p> <p>*Note - If you had an erstwhile account with Karvy Stocking broking, you may open your Demat account with us now by simply clicking the link below and following a few steps using your PAN no and Aadhar no., if not already done.</p> <p>Link for Karvy Customers: <a href='https://digitalaccount.axisdirect.in/Karvy'>https://digitalaccount.axisdirect.in/Karvy</a></p>"
										//$rootScope.formData.panStatus = response.ErrorMessage;
										$('#paninformation').modal({
											backdrop: 'static',
											keyboard: false
										})
								} else if ($rootScope.formData.panStatus != null) {
									$rootScope.formData.apiLoading = false;
									$('#paninformation').modal({
										backdrop: 'static',
										keyboard: false
									})
								} else if (response.ErrorMessage != null && response.ErrorMessage != '') {
									if (response.ErrorNumber == '400') {
										$rootScope.formData.panStatus = 'Your details are already available with us. Our executive  will get in touch with you or Call us.';
										$rootScope.formData.otherMode = true;
										$rootScope.formData.HideOkayBtn = false;
										$rootScope.formData.apiLoading = false;
										$('#paninformation').modal({
											backdrop: 'static',
											keyboard: false
										})
									} else {
										$rootScope.formData.panStatus = response.ErrorMessage;
										// to overwrite Token, DOB, PAN, Email, Mobile for Token Purpose (This is for already registered PAN Number with status code 800 in Response)
										//sessionStorage.setItem('AxToken', response.Token);
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
										$('#paninformation').modal({
											backdrop: 'static',
											keyboard: false
										})
									}
								} else if (response.FailureMessage != null && response.FailureMessage != '') {
									$rootScope.formData.panStatus = response.FailureMessage;
									$rootScope.formData.apiLoading = false;
									$('#paninformation').modal({
										backdrop: 'static',
										keyboard: false
									})
								}
							}
							if (response.ClientInfo.FirstName) {
								$rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
								sessionStorage.setItem('CFirstname', response.ClientInfo.FirstName);
							}

							if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined') {
								$rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
								$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
								sessionStorage.setItem('CMiddlename', response.ClientInfo.MiddleName);
							}

							if (response.ClientInfo.LastName && response.ClientInfo.FirstName) {
								$rootScope.formData.fields.lastName = response.ClientInfo.LastName;
								sessionStorage.setItem('CLastname', response.ClientInfo.LastName);
								$rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
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
									$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
									$rootScope.formData.fields.middleName = '';
								}
							}
							if ((response.ClientInfo.LastName == '' || response.ClientInfo.LastName == undefined) && response.ClientInfo.FirstName) {
								$rootScope.formData.fields.lastName = '.';
								sessionStorage.setItem('CLastname', '.');
							}
						} else {
							$rootScope.formData.otherMode = true;
							$rootScope.formData.HideOkayBtn = true;
							$rootScope.formData.apiLoading = false;
							if (response.ErrorNumber == '700') {
								$rootScope.formData.panStatus = "<p>You already have an AxisDirect account Click <a href=\"https://login.axisdirect.in/\">here</a> to login.</p> <p>*Note - If you had an erstwhile account with Karvy Stocking broking, you may open your Demat account with us now by simply clicking the link below and following a few steps using your PAN no and Aadhar no., if not already done.</p> <p>Link for Karvy Customers: <a href='https://digitalaccount.axisdirect.in/Karvy'>https://digitalaccount.axisdirect.in/Karvy</a></p>"

							} else {
								$rootScope.formData.panStatus = 'Your account cannot be processed.';
							}
							$('#paninformation').modal({
								backdrop: 'static',
								keyboard: false
							})
						}

					}, function (e) {
						$('#connection').modal('show');
					});
				}
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
				$scope.pan = true;
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
				//$rootScope.formData.rmOptionsBox();
				if (!$rootScope.formData.rmcode) {
					$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
				}
			}

			if ($rootScope.formData.threeinone || sessionStorage.getItem('threeinone') == 'true') {
				$scope.emailMobile = false;
				$scope.pan = true;
				$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile');
				$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
				$rootScope.formData.fields.panNumber = sessionStorage.getItem("RxPan");
				$rootScope.formData.fields.DOB = sessionStorage.getItem('DOB');
				setTimeout(function () {
					$('#city_value').val(sessionStorage.getItem('User_City'));
					$('#city_value').prop('disabled', true);
				}, 400)
				$scope.showRegistrationBtn = false;
				if ($rootScope.formData.tokenValidation && !$rootScope.EncryptToken) {
					var url = "GetEncrptToken";
					var sendData = {
						ReferenceNumber: sessionStorage.getItem('AxNo')
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var data = a.data;
						$rootScope.formData.apiLoading = false;
						if (data.EncryptToken) {
							$rootScope.EncryptToken = data.EncryptToken;
						}
					});

				}
			}
			if ($rootScope.janabank || sessionStorage.getItem('JanaBank') == "true") {
				$rootScope.formData.fields.mobile = sessionStorage.getItem('jMobile')
					$rootScope.formData.fields.email = sessionStorage.getItem('jEmail')
					$rootScope.formData.fields.panNumber = sessionStorage.getItem('jPanNumber')
					var dob = sessionStorage.getItem('jDOB');
				dobs = sessionStorage.getItem('jDOB').substring(6, 8) + '/' + sessionStorage.getItem('jDOB').substring(4, 6) + '/' + sessionStorage.getItem('jDOB').substring(0, 4);

				$rootScope.formData.fields.DOB = dobs
					$('#txtDOB').val($rootScope.formData.fields.DOB)
					$scope.registration()
			}

			window.onbeforeunload = function () {
				if ($rootScope.webkarvy) {
					sessionStorage.setItem('karvyData', JSON.stringify($rootScope.karvyData));
				}

				// if ($rootScope.formData.fields.mobile) {
				// 	sessionStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);
				// }
				// if ($rootScope.formData.fields.email) {
				// 	sessionStorage.setItem("RxEmail", $rootScope.formData.fields.email);
				// }
				// if ($rootScope.formData.fields.username) {
				// 	sessionStorage.setItem("Username", $rootScope.formData.fields.username);
				// }
				// if ($('#city_value').val()) {
				// 	sessionStorage.setItem("User_City", $('#city_value').val());
				// }

				if ($rootScope.formData.fields.panNumber) {
					sessionStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
				}

				sessionStorage.setItem("DOB", $rootScope.formData.dob);
			}

			$('#cloneData').on("ifClicked", function (event) {
				$rootScope.cloneData();
				$('#clone').modal('hide');
				$scope.$apply();
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
				var url = "GetLandingDetails?MobileNumber=" + $rootScope.formData.fields.mobile;
				serverService.getApi(url).then(function (a) {
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
			$scope.CKYCValidation = function () {
				if (!$rootScope.formData.IsClone && $rootScope.formData.ReferenceNumber && !$rootScope.formData.threeinone && !$rootScope.formData.applicationDisabled) {
					$rootScope.getDIYStatus();
				} else {

					var url = "CKYCSearchTrackwizzSData";

					if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
						mode = 'R';
					}
					

					var sendData = {
						FirstName: $rootScope.formData.fields.firstName,
						LastName: $rootScope.formData.fields.lastName,
						MiddleName: $rootScope.formData.fields.middleName,
						Mobile: $rootScope.formData.fields.mobile,
						Email: $rootScope.formData.fields.email,
						PanNumber: $rootScope.formData.fields.panNumber,
						DOB: $rootScope.formData.dob,
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						RMCode: $rootScope.formData.fields.rmcode,
						RoleName: $rootScope.formData.roleName,
						EmployeeId: $rootScope.formData.fields.rmid,
						Mode: mode,
						IsDiy: true,
						IsWeb: 'True',
						EncryptToken: $rootScope.EncryptToken
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;

						if (response) {
							if (response.ReferenceNumber) {
								if ($scope.refernceExist) {
									$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
									$rootScope.formData.RefNumber = response.RefNumber;
									sessionStorage.setItem('RxReferenceNumber', response.ReferenceNumber);
									sessionStorage.setItem("AxNo", response.RefNumber);
									$rootScope.getDIYStatus();

								} else {
									$rootScope.formData.referenceGenerated = true;
									$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
									$rootScope.formData.RefNumber = response.RefNumber;
									sessionStorage.setItem('RxReferenceNumber', response.ReferenceNumber);
									sessionStorage.setItem("AxNo", response.RefNumber);
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

									if ((utm_bank && dp) || lgcode || lccode || bankname || planId || productId || segment || isCMLMandatory || referral_code || Utm_promoCode) {
										if (bankname) {
											utm_bank = bankname;
										}
										if(productId){
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
											if(response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber){
												var letter = response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber.charAt(0).toLowerCase();
											}
											if($rootScope.webfinacle && (letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S')){
												
											}
											else if (response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCClient == 'Y' && response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber && response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCCorAddPin) {
												$rootScope.formData.CKYC = true;
												sessionStorage.setItem('CKYCResponseData', JSON.stringify(response.a23CkycResponseDetail.cKYCPersonalDetail));
												sessionStorage.setItem('IsCKYC', response.IsSuccess);
											}
										}
									}
									$rootScope.WBTempPersistence();
								}
							} else {
								if (response.ErrorMessage) {
									$rootScope.apiResponseErrorMsg = response.ErrorMessage;
								} else {
									$rootScope.apiResponseErrorMsg = response.FailureMessage;
								}
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
							}
						}
					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
					});
				}
			}
			$scope.kraValidation = function () {

				if ($rootScope.formData.DebarredPan) {
					$rootScope.pan = false;
					$rootScope.emailMobile = true;
					$window.sessionStorage.clear();
					$state.go('register');
				}

				var surl = "VerifyKRAClientStatus";
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

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(surl, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					sessionStorage.setItem("RxAllowAccOpen", "Y");
					$rootScope.planLoadStop = true;
					$rootScope.panLoaded = false;
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
						$('#paninformation').modal({
							backdrop: 'static',
							keyboard: false
						})
					} else {
						if (response.Registration.KRAVerifiedClient == 'Y') {
							sessionStorage.setItem("IsKRA", true);
							if (!$rootScope.formData.IsClone) {
								//$rootScope.WBTempPersistence();
								$scope.CKYCValidation();
								$rootScope.formData.getKraDetails = false;
								//$(".select").prop("disabled", true);
							} else {
								if (mode == "I") {
									$rootScope.getDIYStatus();
								}
							}
						} else {
							sessionStorage.setItem("IsKRA", false);
							if (!$rootScope.formData.IsClone) {

								if ($rootScope.formData.ReferenceNumber) {
									$rootScope.formData.KRA = false;
									$rootScope.formData.aadhaarProcess = true;
									if ($rootScope.aadhaarModule) {
										$rootScope.formData.aadhaarProcess = true;
										$rootScope.getAadhaar();
									} else {
										$rootScope.WBTempPersistence();
										$state.go('address', {
											mobile: $rootScope.formData.EncMobile
										});
									}
									/*$state.go('address', {
									mobile: $rootScope.formData.EncMobile
									});*/
								} else {
									$scope.CKYCValidation();
									/*$rootScope.WBTempPersistence();
									//if($rootScope.formData.CKYC){$rootScope.WBTempPersistence();}else{$rootScope.generateReference();}
									$rootScope.formData.getKraDetails = false;

									$rootScope.formData.nonkraMsg = true;
									$(".select").prop("disabled", true);*/

								}
							} else {
								if (mode == "I") {
									$rootScope.getDIYStatus();
								}
							}
						}
					}

				}, function (e) {
					$('#connection').modal('show');
				});

			}

			$scope.modalPop = function (b) {
				if ($rootScope.formData.getKraDetails) {
					$scope.kraValidation();
					//$scope.CKYCValidation();
				} else {
					$rootScope.getDIYStatus();
				}
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
				$("#call-popup").modal({
					backdrop: 'static',
					keyboard: false
				});
			}
			$scope.documentuploadpgae = function () {
				$state.go('bank');
			}
			$scope.thankyoupage = function () {
				$state.go('complete');
			}
			$scope.acceptanceletterpage = function () {
				// $state.go('complete');
				// $state.go('karvy');
				$rootScope.KarvyesingProcess()
				// url =  window.location.origin + '/axisV2/'  + '/acceptanceletter'
				// window.open(url , "_blank");
				// $state.go('acceptanceletter');
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
						$scope.$apply();
					}
				});

				$("#txtDOB").datepicker("option", "showAnim", "blind");
			}, 2000)
			setTimeout(() => {
				$('#acnumber').text(function (_, val) {
					return val.replace(/\d(?=\d{4})/g, "*");
				});
			}, 100);
		}
	]);