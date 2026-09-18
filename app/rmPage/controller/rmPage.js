function sigUpld(id) {
	if (id == 'RMSIGNATURE')
		angular.element(document.getElementById("RMSIGNATURE")).scope().sigUpld('RMSIGNATURE');
}
mainApp.controller('rmPageController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {
		$scope.emptyDesignation = false;
		$scope.emptyOrganization = false;
	
		if (sessionStorage.getItem('RMModule') == 'true') {
				$rootScope.formData.RMModule = true;
				if (!$rootScope.formData.rmcode) {
					if (sessionStorage.getItem('RMCode')) {
						$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
						$rootScope.formData.fields.rmid = sessionStorage.getItem('RMID');
						$rootScope.formData.rmOptions = false;
					} else {
						sessionStorage.clear();
						$rootScope.emailMobile = true;
						$rootScope.pan = false;
						$state.go('register');
					}
				}
			}
			if (sessionStorage.getItem('changePassword')) {
				$rootScope.formData.changePassword = true;
			}
			if (sessionStorage.getItem('IsPasswordExpired')) {
				$rootScope.IsPasswordExpired = true;
			}
			if (sessionStorage.getItem('getRmEmail')) {
				$rootScope.formData.getRmEmail = true;
			}
			if (sessionStorage.getItem('rmdesignation')) {
				$rootScope.rmdesignation = true;
			}
			if (sessionStorage.getItem('rmOrganization')) {
				$rootScope.rmOrganization = true;
			}
			if (!$rootScope.formData.RMModule && !$rootScope.formData.changePassword && !$rootScope.IsPasswordExpired && !$rootScope.formData.getRmEmail) {
				sessionStorage.clear();
				$rootScope.emailMobile = true;
				$rootScope.pan = false;
				$state.go('register');
			}
			$scope.rmSetting = function () {
				if (sessionStorage.getItem('getRmMobile') == 'true' || sessionStorage.getItem('getRmSignature') == 'true' || sessionStorage.getItem('getRmEmail') == 'true' || sessionStorage.getItem('IsPasswordExpired') == 'true' || sessionStorage.getItem('changePassword') == 'true') {
					$rootScope.formData.getRmMobile = sessionStorage.getItem('getRmMobile');
					$rootScope.formData.getRmSignature = sessionStorage.getItem('getRmSignature');
					$rootScope.formData.changePassword = sessionStorage.getItem('changePassword');
					$rootScope.formData.rmForgotOTP = sessionStorage.getItem('rmForgotOTP');
					$rootScope.IsPasswordExpired = sessionStorage.getItem('IsPasswordExpired');
					$rootScope.formData.getRmEmail = sessionStorage.getItem('getRmEmail');
					$rootScope.formData.rmOptions = false;
					$rootScope.wizardShow = false;
					$rootScope.formData.fields.newPassword = '';
					$rootScope.formData.fields.renewPassword = '';
					$rootScope.formData.fields.oldPassword = '';
				} else if (sessionStorage.getItem('rmOrganization') == 'true' || sessionStorage.getItem('rmdesignation') == 'true') {
					$rootScope.wizardShow = false;
					$rootScope.formData.rmOptions = false;
				} else {
					$('#RMModal').modal('hide');
					$(document.body).removeClass('modal-open');
					$('.modal-backdrop').remove();
					$rootScope.emailMobile = true;
					$rootScope.pan = false;
					if (!$rootScope.formData.RMModule) {
						sessionStorage.clear();
					}
					$rootScope.formData.rmName = '';
					$state.go('register');
				}
			}
			$scope.rmSetting()
			setTimeout(function () {
				$(".input-upload").fileinput({
					'showUpload': false,
					'browseLabel': 'UPLOAD',
					'browseIcon': '',
					'previewFileType': 'any'
				});
			}, 100)

			$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
			$rootScope.formData.fields.rmid = sessionStorage.getItem('RMID');

			$scope.getRmPwdOTP = function () {
				var s_url = "RMChangePasswordSentOTP";
				var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.newPassword), key, {
						keySize: 128 / 8,
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});

				var encryptedOldpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.oldPassword), key, {
						keySize: 128 / 8,
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});
				$scope.cp = encryptedOldpassword.toString();
				$scope.pa = encryptedpassword.toString();
				var sendData = {
					"CurrentPassword": $scope.cp,
					"Password": $scope.pa,
					"EmployeeId": $rootScope.formData.fields.rmid,
					"EmployeeCode": $rootScope.formData.fields.rmcode,
					"IsCustomPassword": true
				}

				$rootScope.formData.apiLoading = true;
				$rootScope.formData.rmpwdmobileOTP = '';
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$scope.otpArea = true;
						var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.fields.rmmobile = response.Mobile;
						$rootScope.formData.rmMsg = 'OTP sent to your mobile number';
					} else {
						var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.rmMsg = response.ErrorMessage;
					}
				});
			}

			$scope.validateRMPwdOTP = function () {
				if (!$rootScope.formData.rmpwdmobileOTP) {
					$scope.mobileOTPEmptyError = true;
				} else {
					var s_url = "RMChangePasswordValidateOTP";

					var sendData = {
						"Mobile": $rootScope.formData.fields.rmmobile,
						"MobileOtpCode": $rootScope.formData.rmpwdmobileOTP,
						"MobileFlag": true,
						"EmployeeId": $rootScope.formData.fields.rmid,
						"RMEmployeeCode": $rootScope.formData.fields.rmcode,
						"RMPassword": $scope.pa,
						"IsDiy": true
					}

					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							//$scope.updtPassword();
							var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.rmMsg = "Kindly login with updated credentials";
						sessionStorage.clear();
						$rootScope.formData.fields.rmUsername = '';
						$rootScope.formData.fields.rmPassword = '';
						$rootScope.formData.RMModule = false;
						$rootScope.formData.rmName = '';
						$rootScope.formData.getRmMobile = '';
						$rootScope.formData.getRmSignature = '';
						$rootScope.formData.changePassword = false;
						$rootScope.formData.getRmEmail = '';
						$rootScope.idleSecondsCounter = 0;
						setTimeout(function () {
							$('#RMModal').modal('hide');
							/*$(document.body).removeClass('modal-open');
							$('.modal-backdrop').remove();*/
							$rootScope.emailMobile = true;
							$rootScope.pan = false;
							$state.go('register', {
								WebRM: true
							});
						}, 5000);
						} else {
							var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
									backdrop: 'static',
									keyboard: false
								});
							RMModalPop.show();
							if (response.ErrorMessage) {
								$rootScope.formData.rmMsg = response.ErrorMessage;
							} else {
								$rootScope.formData.rmMsg = 'Invalid OTP';
							}
						}
					});
				}
			}

			$scope.updatePassword = function () {
				if (!$rootScope.formData.rmForgotOTP &&!$rootScope.formData.fields.oldPassword) {
					$scope.oldPasswordError = true;
				} else if ($rootScope.formData.fields.newPassword) {
					if ($rootScope.formData.fields.renewPassword) {
						var pass_regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,12}$/);
						if (!(pass_regex).test($rootScope.formData.fields.newPassword)) {
							$rootScope.formData.inValidPassword = true;
						} else if ($rootScope.formData.fields.newPassword == $rootScope.formData.fields.renewPassword) {
							if (!$rootScope.formData.rmForgotOTP) {
								$scope.getRmPwdOTP();
							} else {
								$scope.updtPassword();
							}
						} else {
							$rootScope.formData.passwordMismatch = true;
						}
					} else {
						$scope.renewPasswordError = true;
					}
				} else {
					$scope.newPasswordError = true;
				}
			}

			$scope.updtPassword = function () {
				if(!$scope.pa){
				var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.newPassword), key, {
						keySize: 128 / 8,
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
				});
				$scope.pa = encryptedpassword.toString();
				}
				var s_url = "UpdatePassWordRMLogin";
				var sendData = {
					"Password": $scope.pa,
					"EmployeeIdEnc": $rootScope.formData.fields.rmid,
					"EmployeeCode": $rootScope.formData.fields.rmcode,
					"IsCustomPassword": true,
					"EncryptFlag":true
				}
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.fields.newPassword = '';
					$rootScope.formData.fields.renewPassword = '';
					$rootScope.formData.fields.oldPassword = '';
					if (response.IsSuccess) {
						var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.rmMsg = "Kindly login with updated credentials";
						sessionStorage.removeItem('changePassword');
						sessionStorage.removeItem('IsPasswordExpired');
						$rootScope.formData.fields.rmUsername = '';
						$rootScope.formData.fields.rmPassword = '';
						$rootScope.formData.RMModule = false;
						sessionStorage.removeItem('RMModule');
						sessionStorage.removeItem('RMCode');
						sessionStorage.removeItem('getRmEmail');
						sessionStorage.removeItem('getRmMobile');
						sessionStorage.getItem('changePassword');
						$rootScope.formData.getRmMobile = '';
						$rootScope.formData.getRmSignature = '';
						$rootScope.formData.changePassword = false;
						$rootScope.formData.getRmEmail = sessionStorage.getItem('getRmEmail');
						setTimeout(function () {
							$('#RMModal').modal('hide');
							$(document.body).removeClass('modal-open');
							$('.modal-backdrop').remove();
							$rootScope.formData.RMModule = false;
							$rootScope.formData.rmName = '';
							sessionStorage.clear();
							$rootScope.emailMobile = true;
							$rootScope.pan = false;
							$state.go('register', {
								WebRM: true
							});
						}, 5000);
					} else {
						var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.rmMsg = response.ErrorMessage;
					}
				})
			}

			$scope.emailValidate = function () {

				$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				$scope.error = 0;
				if ($rootScope.formData.fields.rmEmail == null || $rootScope.formData.fields.rmEmail == '') {
					$scope.emptyEmail = true;
					// $scope.invalidEmail = false;
					$scope.error++;
					$('#rmEmail').focus();
					return false
				}
				if (!($scope.filter).test($rootScope.formData.fields.rmEmail)) {
					$scope.invalidEmail = true;
					$scope.emptyEmail = false;
					$scope.error++;
					// $('#rmEmail').focus();
					// return false
				} else {
					$scope.invalidEmail = false;
					$scope.emptyEmail = false;
				}
				var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.rmEmail), key, {
					keySize: 128 / 8,
					iv: iv,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7
				});
				var rmEmail = encryptedpassword.toString();
				if ($scope.error == 0) {
					var sendData = {
						'ReferenceNumber': '',
						'Mobile': '',
						'Email': rmEmail,
						'MobileFlag': false,
						'DBOSource' :true,
						'EmailFlag': true,
					};

					$scope.getOTP(sendData, 'email');
				}
			}

			$scope.firstStage = function () {

				$scope.error = 0;

				if ($rootScope.formData.fields.rmmobile == null || $rootScope.formData.fields.rmmobile == '') {
					$scope.emptyMobile = true;
					$scope.error++;
					$('#mobile').focus();
				} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.rmmobile) == false) {
					$scope.invalidMobile = true;
					$scope.error++;
					$('#mobile').focus();
				}

				if ($scope.error == 0) {
					var sendData = {
						'Mobile': $rootScope.formData.fields.rmmobile,
						'Email': '',
						'MobileFlag': true,
						'EmailFlag': false,
						'AssistLCCode': '',
						'AssistLGCode': '',
						'City': '',
						'ClientName': '',
					};
					var mobile = $rootScope.formData.fields.rmmobile;
					$rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);

					$scope.getOTP(sendData, 'mobile');
				}

			}

			$scope.resendOTP = function (resendType) {
				if (resendType == 'mobile') {
					var mobile = $rootScope.formData.fields.rmmobile;
					$scope.error = 0;

					if ($scope.error == 0) {
						$rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);

						var sendData = {
							'Mobile': mobile,
							'Email': '',
							'MobileFlag': true,
							'EmailFlag': false,
							'AssistLCCode': '',
							'AssistLGCode': '',
							'City': '',
							'ClientName': '',
						}
						$scope.otp = true;

						$scope.getOTP(sendData, resendType);
					}
				} else {
					var sendData = {
						'ReferenceNumber': '',
						'Mobile': '',
						'Email': $rootScope.formData.fields.rmEmail,
						'MobileFlag': false,
						'EmailFlag': true,
					};
					$scope.getOTP(sendData, 'email');
				}
			}

			$scope.getOTP = function (sendData, type) {
				var url;
				$scope.changeNumber = false;
				// Resend OTP Link and Second Load Show and Hide based on resendType
				//	if (resendType == '' || resendType == 'mobile') {
				if (type == 'mobile') {
					url = "OTPGenerationnewEnc";
					$scope.enableResendButton = false;
					$scope.mobileResendStatus = true; // Send Param EmailFlag As FALSE in OTPValidationnew API call
					$scope.emailResendStatus = false;
					$scope.formData.fields.OTP = '';
					sendData.EmailFlag = false;
					sendData.MobileFlag = true;
					sendData = $rootScope.encryptReq(sendData);
				} else {
					url = 'AuthorizeOTPGeneration';
					$scope.enableResendButton = false;
					$scope.mobileResendStatus = false; // Send Param EmailFlag As FALSE in OTPValidationnew API call
					$scope.emailResendStatus = true;
					$scope.formData.fields.OTP = '';
				}

				$scope.resendMobileCounter();

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (type == 'mobile') {
						response = $rootScope.decryptRes(a.data , 'Response');
					}
					$rootScope.formData.apiLoading = false;
					$('#registration').focus();
					$('#OTP').focus();

					if (response.IsSuccess) {
						$rootScope.formData.EncMobile = response.EncMobile;

						$scope.otpreSent = true;
						$scope.otpSent = false;

						$scope.resend = true;
						if (response.ErrorCode == '600') {
							$rootScope.OtpSuccessMsg = response.SuccessMessage;
							sessionStorage.setItem('ExistingEmailMobile', 'true');
							var otpGeneratePop = new bootstrap.Modal(document.getElementById('otpGenerate'), {
									backdrop: 'static',
									keyboard: false
								});
							otpGeneratePop.show();
						} else {
							$rootScope.OtpLimitExceed = false;
						}
						$scope.otpSectionShow = true;
						$scope.showRegistrationBtn = true;
					} else {
						$rootScope.OtpLimitExceed = true;
						$scope.resend = false;
						$rootScope.OtpResponseMsg = response.ErrorMessage;
						$scope.otp = false;
						$scope.otpSectionShow = false;
						$scope.showRegistrationBtn = false;
					}

				}, function (e) {
					$rootScope.formData.apiLoading = false;
					var connection = new bootstrap.Modal(document.getElementById('connection'));
					connection.show();
				});
			};

			$scope.resendMobileCounter = function () {
				var m_count = 59;
				$scope.counter = "00:59";
				runTimer = setInterval(function () {
						m_count--;
						if (m_count < 10) {
							m_count = "0" + m_count;
						}
						$scope.counter = '00:' + m_count.toString();
						if (m_count < 1) {
							$scope.enableResendButton = true;
							clearInterval(runTimer);
						}
						$scope.$apply();
					}, 1000);
			}

			$scope.validateOTP = function (m) {
				$scope.error = 0;
				if ((angular.isUndefined($rootScope.formData.fields.OTP) || $rootScope.formData.fields.OTP == null || $rootScope.formData.fields.OTP == '') && ($scope.otpSectionShow)) {
					$scope.emptyOTP = true;
					$scope.error++;
					$('#OTP').focus();
				}

				if ($rootScope.rmdesignation && !$rootScope.formData.fields.rmDesign) {
					$scope.emptyDesignation = true;
					$scope.error++;
					$('#rmDesign').focus();
					$scope.$evalAsync();
				}

				if ($rootScope.rmOrganization && !$rootScope.formData.fields.rmOrganize) {
					$scope.emptyOrganization = true;
					$scope.error++;
					$('#rmOrganize').focus();
					$scope.$evalAsync();	
				}

				if ($scope.error == 0) {

					$rootScope.formData.apiLoading = true;
					var url;
					var sendData;
					if ($rootScope.formData.getRmMobile || $rootScope.formData.getRmEmail) {
						if (m == 'mobile') {
							url = "OTPValidationnewEncS";
							sendData = {
								//	'OtpCode': $rootScope.formData.fields.otpMobile,
								'Mobile': $rootScope.formData.fields.rmmobile,
								'Email': '',
								"MobileOtpCode": $rootScope.formData.fields.OTP,
								"EmailOtpCode": '',
								"MobileFlag": true,
								"EmailFlag": false
							}
							sendData = $rootScope.encryptReq(sendData);
						} else {
							url = 'UnAuthorizeOTPValidation';
							sendData = {
								'Mobile': '',
								'Email': $rootScope.formData.fields.rmEmail,
								"MobileOtpCode": "",
								"EmailOtpCode": $rootScope.formData.fields.OTP,
								"DOB": '',
								"PanNumber": '',
								"MobileFlag": false,
								"EmailFlag": true,
								"ReferenceNumber": '',
							}
						}
	
						serverService.apiCall(url, sendData).then(function (a) {
							var response = a.data;
							if (m == 'mobile') {
								response = $rootScope.decryptRes(a.data , 'Response');
							}
							$rootScope.apiResponseErrorMsg = '';
							$scope.mobileResendStatus = false;
							$scope.emailResendStatus = false;
							$rootScope.formData.apiLoading = false;
	
							if (response.IsSuccess) {
								$scope.otpSectionShow = false;
								$scope.showRegistrationBtn = false;
								$scope.otpVerified = true;
								if (m == 'mobile') {
									var surl = 'UpdateRMMobileSignature';
									var data = {
										"IsSignature": false,
										"RMEmployeeCode": $rootScope.formData.fields.rmcode,
										"EmployeeId": $rootScope.formData.fields.rmid,
										"Mobile": $rootScope.formData.fields.rmmobile,
										"IsMobile": true,
										"Signaturebass64": '',
										"NameOfOrganisation" : $rootScope.rmOrganization ? $rootScope.formData.fields.rmOrganize : '',
										"RoleName" : $rootScope.rmdesignation ? $rootScope.formData.fields.rmDesign : '',
									}
									serverService.apiCall(surl, data).then(function (a) {
										var response = a.data;
										var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
												backdrop: 'static',
												keyboard: false
											});
										RMModalPop.show();
										$rootScope.formData.rmMsg = "Mobile Number updated";
										sessionStorage.removeItem('getRmMobile');
										$rootScope.formData.getRmMobile = false;
										if ($rootScope.rmOrganization) {
											$rootScope.rmOrganization = false;
											sessionStorage.removeItem('rmOrganization');
										}
										if ($rootScope.rmdesignation) {
											$rootScope.rmdesignation = false;
											sessionStorage.removeItem('rmdesignation');
										}
									})
								} else {
									var e_url = 'UpdateRmEmailId';
									var e_sendData = {
										"EmailId": $rootScope.formData.fields.rmEmail,
										"RMCODE": $rootScope.formData.fields.rmcode
									}
									serverService.apiCall(e_url, e_sendData).then(function (a) {
										var response = a.data;
										if (response.IsSuccess) {
											var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
													backdrop: 'static',
													keyboard: false
												});
											RMModalPop.show();
											$rootScope.formData.rmMsg = "Email ID Updated";
											$rootScope.formData.getRmEmail = false;
											sessionStorage.removeItem('getRmEmail');
										}else if(!response.IsSuccess && response.ErrorCode == '-1'){
											$rootScope.formData.apiLoading = false;
											$rootScope.formData.panStatus1 = response.ErrorMessage;
											var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
													backdrop: 'static',
													keyboard: false
												});
											paninformation.show();
											return
										} else {
											var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
													backdrop: 'static',
													keyboard: false
												});
											RMModalPop.show();
											$rootScope.formData.rmMsg = "Email ID Update Failed";
											$rootScope.formData.getRmEmail = false;
											sessionStorage.setItem('getRmEmail', false);
										}
									})
	
								}
							} else {
								$scope.invalidOTP = true;
								$scope.otpVerified = false;
								if (response.ErrorMessage) {
									$rootScope.apiResponseErrorMsg = response.ErrorMessage;
								} else {
									$rootScope.apiResponseErrorMsg = "Error in API";
								}
	
								if (response.MobileVerified == "N") {
									$rootScope.apiResponseErrorMsg = "Mobile " + $rootScope.apiResponseErrorMsg;
								}
								if (response.ErrorMessage == "" || response.ErrorMessage == null) {
									$rootScope.apiResponseErrorMsg = "Problem in API";
								}
							}
	
						}, function (e) {
							var connection = new bootstrap.Modal(document.getElementById('connection'));
							connection.show();
							$rootScope.formData.apiLoading = false;
						});
					} else if ($rootScope.rmOrganization || $rootScope.rmdesignation) {
						var surl = 'UpdateRMMobileSignature';
						var data = {
							"IsSignature": false,
							"RMEmployeeCode": $rootScope.formData.fields.rmcode,
							"EmployeeId": $rootScope.formData.fields.rmid,
							"Mobile": $rootScope.formData.fields.rmmobile,
							"IsMobile": true,
							"Signaturebass64": '',
							"NameOfOrganisation" : $rootScope.rmOrganization ? $rootScope.formData.fields.rmOrganize : '',
							"RoleName" : $rootScope.rmdesignation ? $rootScope.formData.fields.rmDesign : '',
						}
						serverService.apiCall(surl, data).then(function (a) {
							$rootScope.formData.apiLoading = false;
							var response = a.data;
							if (response.IsSuccess) {
								var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
									backdrop: 'static',
									keyboard: false
								});
								RMModalPop.show();
							let msg = '';
							if ($rootScope.rmdesignation && $rootScope.rmOrganization) {
								msg = 'Designation and Organization updated';	
							} else if ($rootScope.rmOrganization && !$rootScope.rmdesignation) {
								msg = 'Organization updated';	
							} else if (!$rootScope.rmOrganization && $rootScope.rmdesignation) {
								msg = 'Designation updated';	
							}
							$rootScope.formData.rmMsg = msg;
							sessionStorage.removeItem('rmOrganization');
							sessionStorage.removeItem('rmdesignation');
							$rootScope.rmdesignation = false;
							$rootScope.rmOrganization = false;
						}
							
						})
					}
					
				}
			};
			$scope.sigUpld = function (imgName) {
				var imageName = imgName;
				$scope.IsSelfi = 'N';
				var filesSelected = document.getElementById(imgName).files;

				var fileSize = (filesSelected[0].size);

				var fileName = document.getElementById(imgName).value;

				var preview = document.getElementById("preview");

				var allowed_extensions = new Array("jpg", "png", "jpeg");

				var file_extension = fileName.split('.').pop();
				file_extension = file_extension.toLowerCase();
				var file_index = allowed_extensions.indexOf(file_extension);

				if (file_index <= 2 && file_index >= 0) {
					$scope.FileType = "Image";
					$scope.rmSizeError = false;
					if (fileSize > 4194304) {
						$scope.rmSizeError = true;
					} else {
						$scope.readfiles(filesSelected, imageName);
					}
					$scope.$apply();
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
						$scope.update_img(r_split[1]);
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

				//preview.appendChild(canvas);

				return canvas.toDataURL("image/jpeg", 1);

			}

			$scope.update_img = function (imgValue) {

				$('#RMSIGNATURE').val('');
				$('#RMSIGNATUREIMAGE .file-input').empty();
				$scope.rmLoad = true;
				$scope.rmtypeError = false;
				var s_url = 'UpdateRMMobileSignature';
				var sendData = {
					"IsSignature": true,
					"RMEmployeeCode": $rootScope.formData.fields.rmcode,
					"EmployeeId": $rootScope.formData.fields.rmid,
					"Mobile": '',
					"IsMobile": false,
					"Signaturebass64": imgValue
				}

				serverService.apiCall(s_url, sendData).then(function (a) {
					$rootScope.formData.apiLoading = false;
					var response = a.data;
					if (response.IsSuccess) {
						$scope.rmUpdt = true;
						$scope.rmLoad = false;
						$scope.rmImgError = false;
						$scope.rmtypeError = false;
						$scope.rmImageValidation = true;
						var RMModalPop = new bootstrap.Modal(document.getElementById('RMModal'), {
								backdrop: 'static',
								keyboard: false
							});
						RMModalPop.show();
						$rootScope.formData.rmMsg = "Signature updated";
						sessionStorage.removeItem('getRmSignature');
						$rootScope.emailMobile = true;
						$rootScope.pan = false;
						//$rootScope.formData.getRmSignature = false;
					}else if(!response.IsSuccess && response.ErrorCode == '-1'){
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

		}
	]);
