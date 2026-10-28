(function () {

	var base = document.querySelector("base");
	var normalized = RegExp(base.href, "i").exec(location.href);
	base.href = normalized ? normalized[0] : base.href;

	$('.modal').on('show.bs.modal', centerModals);
	$(window).on('resize', function () {
		$('.modal:visible').each(centerModals);
	});

	function centerModals() {
		var modal = $(this),
		dialog = modal.find('.modal-dialog');
		modal.css('display', 'block');
		dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
	}

});

var regDisable = false;
var IsAllowCityAndCountry = false;

function btnFocus(event) {
	if (event.keyCode == 9) {
		event.preventDefault();
	};
}

var url1 = window.location + '';
url = decodeURIComponent(url1);

var key = CryptoJS.enc.Utf8.parse('CGSRMAPPWITHMOBI');
var iv = CryptoJS.enc.Utf8.parse('CGSRMAPPWITHMOBI');
var utm_source = (getParameterByName('utm_source', url));
var utm_medium = (getParameterByName('utm_medium', url));
var utm_term = (getParameterByName('utm_term', url));
var utm_creative = (getParameterByName('utm_creative', url));
var utm_campaign = (getParameterByName('utm_campaign', url));
var utm_placement = (getParameterByName('utm_placement', url));
var utm_adgroup = (getParameterByName('utm_adgroup', url));
var utm_device = (getParameterByName('utm_device', url));
var utm_content = (getParameterByName('utm_content', url));
var utm_bank = (getParameterByName('utm_bank', url));
var dp = (getParameterByName('dp', url));
var CTA = (getParameterByName('CTA', url));
var GCLID = (getParameterByName('GCLID', url));
var Mobile = (getParameterByName('Mobile', url));
var Email = (getParameterByName('Email', url));
var product = (getParameterByName('product_name', url));
var ref = (getParameterByName('ref', url));
var threeinone = (getParameterByName('Threein1', url));
var mode = (getParameterByName('Mode', url));
var message = (getParameterByName('Message', url));
var ReferenceNumber = (getParameterByName('ReferenceNumber', url));
var esign = (getParameterByName('esign', url));
var webrm = (getParameterByName('webrm', url));
var webkarvy = (getParameterByName('webkarvy', url));
var pan = (getParameterByName('pan', url));
var panNumber = (getParameterByName('PanNumber', url));
var webfinacle = (getParameterByName('webfinacle', url));
var webJana = (getParameterByName('webJana', url));
var lgcode = (getParameterByName('lgcode', url));
var lccode = (getParameterByName('lccode', url));
var bankname = (getParameterByName('bankname', url));
var planId = (getParameterByName('planId', url));
var productId = (getParameterByName('ProductId', url));
var segment = (getParameterByName('segment', url));
var ipvFailure = (getParameterByName('ipvFailure', url));
var karvyId = (getParameterByName('KarvyId', url));
var customerId = (getParameterByName('CustomerId', url));
var Sources = (getParameterByName('Sources', url));
var ri = (getParameterByName('RI', url));

// promocode Url
var isCMLMandatory = (getParameterByName('IsCMLCopy', url));
var referral_code = (getParameterByName('ReferralCode', url));
var Utm_promoCode = (getParameterByName('PromoCode', url));
var closureAccountUrl = (getParameterByName('closureAccount', url));

// janabank
var UTM_bank = (getParameterByName('UTM_bank', url));
var DP = (getParameterByName('DP', url));
var DP = (getParameterByName('DP', url));
var jPanNumber = (getParameterByName('PanNumber', url));
var CustomerName = (getParameterByName('CustomerName', url));
var jMobile = (getParameterByName('Mobile', url));
var jEmail = (getParameterByName('email', url));
var jDOB = (getParameterByName('DOB', url));
var AccountNumber = (getParameterByName('AccountNumber', url));
var IFSCCode = (getParameterByName('IFSCCode', url));
var MICRCode = (getParameterByName('MICRCode', url));

var mode = 'W';

if (utm_campaign) {
	sessionStorage.setItem('utm_campaign', utm_campaign);
}
var refno = '';
var aadharOfflineFile = {};
//Read Key values from URL
function getParameterByName(name, url) {
	//if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&|]" + name + "(=([^&#|]*)|&|#|$)", 'i'),
	results = regex.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';
	return results[2].replace(/\+/g, " ");
}
var mainChatApp = angular.module('mainChatApp', ['ngRoute', 'ngSanitize', 'ui.router', 'ngAria', 'serverComm', 'onlyAlphabets', 'onlyDigits', 'ngDecimal', 'alphaNumeric', 'angucomplete', 'angucompleteifsc', 'angucompletecity', 'alphaSpecial', 'stopCcp', 'ngRightClick', 'restrictSpecialCharacters', 'filters-module', 'angularjs-dropdown-multiselect']);
mainChatApp.run(['$rootScope', '$location', 'serverService', '$state', '$interval', '$window', function ($rootScope, $location, serverService, $state, $interval, $window) {
			$rootScope.getAPI = true;
			$rootScope.activation = false;
			$rootScope.formData = {};
			$rootScope.formData.fields = {};
			$rootScope.formData.GAT_Cookie_days = 3;
			$rootScope.formData.addressTypeList = [];
			$rootScope.formData.OccupationDetailsList = [];
			$rootScope.formData.educationList = [];
			$rootScope.formData.corressDocList = [];
			$rootScope.formData.pDocList = [];
			$rootScope.formData.foDocumentTypeList = [];
			$rootScope.formData.newDocumentTypeList = [];
			$rootScope.formData.newNomineeTypeList = [];
			$rootScope.formData.state = [];
			$rootScope.formData.countryList = [];
			$rootScope.formData.incomeRange = [];
			$rootScope.formData.sFunds = [];
			$rootScope.formData.applicationDisabled = false;
			$rootScope.emailMobile = true;
			$rootScope.panStage = true;
			$rootScope.formData.showUIDAIdetails = true; //Aadhar Offline Popup
			$rootScope.formData.aadharFile = {};
			$rootScope.formData.fields.secureCode = '';
			$rootScope.formData.aadharOfflineData = {}; //Offline Aadhar Data
			$rootScope.formData.aadhaarData = {};
			$rootScope.apiResponseErrorMsg = ''; //common API Response Error Msg
			$rootScope.nonKraIPVCompleteStatus = false;
			$rootScope.formData.threeinone = false;
			$rootScope.formData.skipRegister = false;
			$rootScope.otpFailure = false;
			$rootScope.formData.paymentPixel = false;
			$rootScope.formData.isg = false;
			$rootScope.formData.isgProfileSkip = false;
			$rootScope.formData.isgEsign = false;
			$rootScope.formData.isgDocSkip = false;
			$rootScope.formData.ckyClient = true;
			$rootScope.formData.tokenValidation = false;
			$rootScope.getprodcutdetail = true;
			$rootScope.formData.NoPayment = false;
			$rootScope.formData.isPaymentCompleted = false;
			$rootScope.formData.rmDivAction = true;
			$rootScope.formData.fields.rmUsername = "";
			$rootScope.formData.fields.rmPassword = "";
			$rootScope.formData.invalidCredentials = false;
			$rootScope.formData.paymentSkip = false;
			$rootScope.formData.skippedPayment = false;
			$rootScope.aadhaarModule = false;
			$rootScope.formData.RMReferenceNumber = false;
			$rootScope.formData.rmPopupData = {};
			$rootScope.formData.showChat = false;
			$rootScope.verifyemail = true;
			$rootScope.formData.emailOTPApi = false;
			$rootScope.formData.promocodeList = []

			var searchObject = $location.search();
			if (sessionStorage.getItem('AxToken') != null) {
				$rootScope.EncryptToken = sessionStorage.getItem('AxToken');
			}

			if (webrm && webrm.toLowerCase() == 'true') {
				$rootScope.webrm = true;
			} else {
				$rootScope.webrm = false;
			}
			if (referral_code) {
				sessionStorage.setItem('referral_code', referral_code)
				$rootScope.refcodeShow = true
			}

			if ((webkarvy && webkarvy.toLowerCase() == 'true') || $rootScope.webkarvy) {
				$rootScope.webkarvy = true;
				$rootScope.emailMobile = false;
				$rootScope.pan = false;
				$rootScope.webKarvyShow = true
			} else {
				$rootScope.webkarvy = false;
			}

			$rootScope.getJanaDetails = function () {
				var url = "GetJanaBankBasicInfoEnc"

					var sendData = {
					PanNumber: panNumber
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$rootScope.formData.fields.panNumber = response.BasicInfoData[0].PanNumber;
						var dateStr = response.BasicInfoData[0].DOB.split("-");
						var date = dateStr[2];
						var month = dateStr[1];
						var year = dateStr[0];
						var NewDate = date + "/" + month + "/" + year;
						$rootScope.formData.fields.DOB = NewDate;
						$('#txtDOB').val(NewDate);
						$rootScope.formData.fields.raccNumber = response.BasicInfoData[0].BankAccountNumber;
						$rootScope.formData.fields.accNumber = response.BasicInfoData[0].BankAccountNumber;
						$rootScope.formData.fields.ifscCode = response.BasicInfoData[0].IFSCCode;
						$rootScope.formData.fields.micrCode = response.BasicInfoData[0].MICRCode;
						sessionStorage.setItem('janaData', JSON.stringify(response.BasicInfoData[0]));
						if (!$rootScope.secondCompleted) {
							$rootScope.formData.fields.email = response.BasicInfoData[0].EmailId;
							sessionStorage.setItem('RxEmail', response.BasicInfoData[0].EmailId);
							$rootScope.formData.fields.mobile = response.BasicInfoData[0].MobileNumber;
							sessionStorage.setItem('RxMobile', response.BasicInfoData[0].MobileNumber);
						}
					}
				})
			}

			$rootScope.getBankLogo = function () {
				var s_url = "DIYGetThirdpartyBankImages";
				serverService.getApi(s_url).then(function (a) {
					var response = a.data;
					if ((utm_bank && response.ImagesList.length != 0)) {
						angular.forEach(response.ImagesList, function (value, key) {
							if (value.BankShortCode == utm_bank) {
								$rootScope.bgImgDesktop = {
									"background-image": "url(data:image/jpeg;base64," + value.Base64ImageStr + ")",
									"background-size": "cover"
								}

								$rootScope.bgImgMobile = {
									"background-image": "url(data:image/jpeg;base64," + value.MobileBase64ImageStr + ")",
									"background-size": "cover"
								}

								$rootScope.bgImg = $rootScope.bgImgDesktop;
								if (window.innerWidth < 415) {
									$rootScope.bgMobile = true;
									$rootScope.bgImg = $rootScope.bgImgMobile;
								}
							}
						});
					}
				})
			}

			if (isCMLMandatory) {
				sessionStorage.setItem('isCMLMandatory', isCMLMandatory)
			}
			if (referral_code) {
				sessionStorage.setItem('referral_code', referral_code)
			}

			if (Utm_promoCode) {
				sessionStorage.setItem('utm_promoCode', Utm_promoCode)
			}

			if (utm_bank) {
				$rootScope.getBankLogo();
			}

			$rootScope.setBgImg = function () {
				if ((utm_bank) && window.innerWidth < 415) {
					$rootScope.bgMobile = true;
					$rootScope.bgImg = $rootScope.bgImgMobile;
				} else if ((utm_bank) && window.innerWidth > 416) {
					$rootScope.bgMobile = false;
					$rootScope.bgImg = $rootScope.bgImgDesktop;
				}
			}

			window.addEventListener('resize', $rootScope.setBgImg);

			if (UTM_bank && DP && CustomerName && jMobile && jEmail && jDOB && AccountNumber && IFSCCode && MICRCode) {
				$rootScope.janabank = true;
				$rootScope.emailMobile = false;
				$rootScope.pan = true;
				sessionStorage.setItem('JanaBank', true)
				sessionStorage.setItem('UTM_bank', UTM_bank)
				sessionStorage.setItem('DP', DP)
				sessionStorage.setItem('CustomerName', CustomerName)
				sessionStorage.setItem('jMobile', jMobile)
				sessionStorage.setItem('jPanNumber', jPanNumber)
				sessionStorage.setItem('jEmail', jEmail)
				sessionStorage.setItem('jDOB', jDOB)
				sessionStorage.setItem('AccountNumber', AccountNumber)
				sessionStorage.setItem('IFSCCode', IFSCCode)
				sessionStorage.setItem('MICRCode', MICRCode)
			}
			if ((webfinacle && webfinacle.toLowerCase() == 'true') || $rootScope.webfinacle) {
				$rootScope.webfinacle = true;
				$rootScope.emailMobile = false;
				$rootScope.pan = true;
				mode = 'I';
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
					if (customerId) {
						var aurl = 'FinacleCustomerInfoFromQueryEnc';
						var sendData = {
							CustomerId: customerId,
							Sources: Sources
						}
						$rootScope.formData.apiLoading = true;
						serverService.apiCall(aurl, sendData).then(function (a) {
							var response = a.data;
							if (response.IsSuccess) {
								$rootScope.formData.apiLoading = false;
								$('#pan').prop('disabled', true)
								$('#txtDOB').prop('disabled', true)
								if (response.Pan) {
									$rootScope.formData.fields.panNumber = response.Pan;
								}
								if (response.DecryptString) {
									var info = (JSON.parse(response.DecryptString));
									var d = info.responseBody.basicInfo.dateOfBirth.split('-');
									$('#txtDOB').val(d[2] + '/' + d[1] + '/' + d[0]);
								}
							} else {
								$rootScope.formData.apiLoading = false;
							}
						})
					}
				}, 1000)

			} else {
				$rootScope.webfinacle = false;
			}

			if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
				$rootScope.formData.isMobile = true;
			} else {
				$rootScope.formData.isMobile = false;
			}

			if (sessionStorage.getItem('webKarvy') && sessionStorage.getItem('webKarvy') == 'true') {
				if (sessionStorage.getItem('karvyData')) {
					$rootScope.karvyData = JSON.parse(sessionStorage.getItem('karvyData'));
					$rootScope.karvyDOB = $rootScope.karvyData.DOB;
					$rootScope.emailMobile = false;
					$rootScope.pan = false;
					$rootScope.webKarvyShow = false
						$rootScope.proceeddetailsshow = true;
				} else {
					$rootScope.emailMobile = false;
					$rootScope.pan = true;
				}
				$rootScope.webkarvy = true;
			}

			$rootScope.rmSessionTimerStart = function () {
				$rootScope.idleTimeOut = 900;
				$rootScope.idleSecondsCounter = 0;
				document.onclick = function () {
					$rootScope.idleSecondsCounter = 0;
				};
				document.onmousemove = function () {
					$rootScope.idleSecondsCounter = 0;
				};
				document.onkeypress = function () {
					$rootScope.idleSecondsCounter = 0;
				};
				window.setInterval($rootScope.CheckIdleTime, 1000);
			}

			if (sessionStorage.getItem('RMModule')) {
				$rootScope.formData.RMModuleDocs = true;
				$rootScope.formData.RMModule = true;
				$rootScope.formData.rmDivAction = false;
				$rootScope.formData.rmName = sessionStorage.getItem('RMName');
				$rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam');
				$rootScope.formData.RMCode = sessionStorage.getItem('RMCode');
				$rootScope.formData.roleName = sessionStorage.getItem('Role');
				$rootScope.formData.fields.rmid = sessionStorage.getItem('RMID');
				if (sessionStorage.getItem('getRmMobile') || sessionStorage.getItem('getRmSignature') || sessionStorage.getItem('changePassword') || sessionStorage.getItem('IsPasswordExpired') || sessionStorage.getItem('getRmEmail')) {
					$state.go('rmPage')
				} else {
					$rootScope.formData.rmOptions = true;
				}

				if (sessionStorage.getItem('baTeamLead') && sessionStorage.getItem('baTeamLead') == 'Y') {
					$rootScope.baTeamLead = true;
				}

				$rootScope.rmSessionTimerStart();
			}

			if (sessionStorage.getItem("AxRM") == 'true') {
				if (!$rootScope.formData.RMModule) {
					sessionStorage.clear();
					location.reload();
				}
			}

			$rootScope.CheckIdleTime = function () {
				$rootScope.idleSecondsCounter++;
				if ($rootScope.idleSecondsCounter >= $rootScope.idleTimeOut) {
					$rootScope.formData.ReferenceNumber = '';
					$rootScope.formData.rmOptions = false;
					$rootScope.formData.RMModule = false;
					sessionStorage.clear();
					location.reload();
				}
			}

			$rootScope.showPosition = function (position) {
				$rootScope.formData.latitude = position.coords.latitude;
				$rootScope.formData.longitude = position.coords.longitude;
			}

			$rootScope.getLocation = function () {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition($rootScope.showPosition);
				} else {
					x.innerHTML = "Geolocation is not supported by this browser.";
				}
			}

			//$rootScope.getLocation();

			if (sessionStorage.getItem('RxReferenceNumber') != null) {
				$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
			}

			if (!$rootScope.formData.fields.email && Email) {
				$rootScope.formData.fields.email = Email;
			}

			$rootScope.formData.fields.mobileExtn = "+91"

				var nVer = navigator.appVersion;
			var nAgt = navigator.userAgent;
			Browser_Name = navigator.appName;
			var fullVersion = '' + parseFloat(navigator.appVersion);
			var majorVersion = parseInt(navigator.appVersion, 10);
			var nameOffset,
			verOffset,
			ix;

			// In Opera 15+, the true version is after "OPR/"
			if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
				Browser_Name = "Opera";
				fullVersion = nAgt.substring(verOffset + 4);
			}
			// In older Opera, the true version is after "Opera" or after "Version"
			else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
				Browser_Name = "Opera";
				fullVersion = nAgt.substring(verOffset + 6);
				if ((verOffset = nAgt.indexOf("Version")) != -1)
					fullVersion = nAgt.substring(verOffset + 8);
			}
			// In MSIE, the true version is after "MSIE" in userAgent
			else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
				Browser_Name = "Microsoft Internet Explorer";
				fullVersion = nAgt.substring(verOffset + 5);
			} else if (!!navigator.userAgent.match(/Trident\/7\./)) {
				Browser_Name = "Microsoft Internet Explorer 11";
				fullVersion = nAgt.substring(verOffset + 5);
			}
			// In Chrome, the true version is after "Chrome"
			else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
				Browser_Name = "Chrome";
				fullVersion = nAgt.substring(verOffset + 7);
			}
			// In Safari, the true version is after "Safari" or after "Version"
			else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
				Browser_Name = "Safari";
				fullVersion = nAgt.substring(verOffset + 7);
				if ((verOffset = nAgt.indexOf("Version")) != -1)
					fullVersion = nAgt.substring(verOffset + 8);
			}
			// In Firefox, the true version is after "Firefox"
			else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
				Browser_Name = "Firefox";
				fullVersion = nAgt.substring(verOffset + 8);
			}
			// In most other browsers, "name/version" is at the end of userAgent
			else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
				(verOffset = nAgt.lastIndexOf('/'))) {
				Browser_Name = nAgt.substring(nameOffset, verOffset);
				fullVersion = nAgt.substring(verOffset + 1);
				if (Browser_Name.toLowerCase() == Browser_Name.toUpperCase()) {
					Browser_Name = navigator.appName;
				}
			} else {
				Browser_Name = "Web (unKnown)";
			}
			$rootScope.formData.browserType = Browser_Name;

			$window.addEventListener("offline", function () {
				$rootScope.$apply(function () {
					$('#connection').modal('show');
				});
			}, false);
			$window.addEventListener("online", function () {
				$rootScope.$apply(function () {
					$('#connection').modal('hide');
				});
			}, false);

			$rootScope.updateDIY = function () {

				$('#existingCustomer-popup').modal('hide');
				var s_url = "DIYUpdateIPVStage";
				var refNo = $rootScope.formData.ReferenceNumber;
				var sendData = {
					ReferenceNumber: refNo,
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
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;

					if (response == '1' || response == '100' || response == '200') {
						$rootScope.EncryptToken = '';
						sessionStorage.removeItem('AxToken');
						$rootScope.formData.apiLoading = false;
						if (!$rootScope.verifyemail) {
							$rootScope.formData.ReferenceNumber = '';
							$rootScope.formData = {};
							$rootScope.formData.fields = {};
							/*setTimeout(function () {
							$('#downloadPOA').modal({
							keyboard: false,
							backdrop: 'static'
							});
							}, 1000)*/
						}
						$state.go('complete', {
							mobile: $rootScope.formData.EncMobile
						});
					}

				});
			}

			$rootScope.getDIYStatus = function () {
				if (!$rootScope.getDIYStatusAPI) {
					$rootScope.getDIYStatusAPI = true;
					if (sessionStorage.getItem('skippedPayment')) {
						$rootScope.formData.skippedPayment = sessionStorage.getItem('skippedPayment')
					}

					var s_url = "GetOverallStatusByReferenceNumberWB";
					$rootScope.formData.apiLoading = true;
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
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;

						if (response.Mode && response.Mode == 'I') {
							$rootScope.webfinacle = true;
							$rootScope.formData.DecryptURL = $rootScope.formData.eRefNumber;
							if (response.OverallStatusList[3].SPStatus != 'Y') {
								$rootScope.getIBInfo($rootScope.formData.fields.panNumber);
							} else {
								$rootScope.fourthCompleted = true;
							}
							$rootScope.decryptUrl();
						}

						$('#paninformation').modal('hide');
						$(document.body).removeClass('modal-open');
						$('.modal-backdrop').remove();
						$rootScope.formData.apiLoading = false;
						//$rootScope.formData.KRA = false;
						if (response.RMModule == "Y") {
							$rootScope.formData.RMModuleDocs = true;
						}
						if (response.RefNumber) {
							$rootScope.formData.eRefNumber = response.RefNumber;
						}

						//angular.forEach(response.OverallStatusList, function (value, key) {});
						$rootScope.formData.ReferenceNumber = response.OverallStatusList[0].ReferenceNumber;
						sessionStorage.setItem('RxReferenceNumber', $rootScope.formData.ReferenceNumber);
						$rootScope.formData.docStageCompleted = response.OverallStatusList[0].IsDocstagePartiallyCompleted;
						if (response.OverallStatusList[7].SPStatus == 'Y' && $rootScope.formData.RMModule) {
							$rootScope.formData.RMReferenceNumber = true;
						}
						if (response.OverallStatusList[0].IsEmailVerified == true) {
							$rootScope.verifyemail = false;
							$rootScope.verifyOTPSuccess = true;
						} else {
							$rootScope.verifyemail = true;
						}
						if (response.OverallStatusList[1].SPStatus == 'Y') {
							if (response.OverallStatusList[0].CKYCClient == 'Y') {
								$rootScope.formData.CKYC = true;
								sessionStorage.setItem('IsCKYC', true)
							} else {
								$rootScope.formData.CKYC = false;
							}
							if (response.OverallStatusList[0].CKYCUpdate == 'Y') {
								$rootScope.formData.changeCKYC = true;
								sessionStorage.setItem('IsCKYCUpdate', 'Y')
							}
							if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
								$rootScope.formData.KRA = true;
								sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
								if ($rootScope.formData.isg) {
									$rootScope.formData.isgProfileSkip = true;
								}
							} else {
								sessionStorage.setItem('IsKRA', false);
							}
							if (response.OverallStatusList[0].KRAUpdate == 'Y') {
								$rootScope.formData.IsKRAUpdate = 'Y';
								$rootScope.formData.changeKRA = true;
								sessionStorage.setItem('IsKRAUpdate', 'Y');
								$rootScope.formData.chgAdrDisable = true;
								$rootScope.formData.KRA = false;
								sessionStorage.setItem('IsKRA', true);
								if ($rootScope.formData.isg) {
									$rootScope.formData.isgProfileSkip = true;
								}
							}
						}
						// if(response.OverallStatusList[7].SPStatus == 'Y'){
						//     sessionStorage.setItem('isPaymentCompleted', true);
						// } else{
						//     sessionStorage.setItem('isPaymentCompleted', false);
						// }
						// Payment functionality Hide/Show
						// if(sessionStorage.getItem('IsKRA') ==  'true' || sessionStorage.getItem('IsAadharVerified') == 'true'){
						if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
							$rootScope.formData.isPaymentCompleted = true;
							$rootScope.formData.makePayment = false;
							sessionStorage.setItem('isPaymentCompleted', true);
						} else {
							if (!$rootScope.formData.NoPayment) {
								$rootScope.formData.makePayment = true;
								$rootScope.formData.isPaymentCompleted = false;
								sessionStorage.setItem('isPaymentCompleted', false);
							}
						}

						$rootScope.formData.applicationDisabled = false;
						setTimeout(function () {
							$rootScope.getAPI = false;
						}, 1500);
						if (response.OverallStatusList[2].EBOStatus == 'A') {
							$rootScope.formData.productApproved = true;
						}
						if (mode != 'I' && (response.OverallStatusList[0].EBOStatus == 'D' || response.OverallStatusList[0].EBOStatus == 'S' || response.OverallStatusList[1].EBOStatus == 'D' || response.OverallStatusList[1].EBOStatus == 'S' || response.OverallStatusList[2].EBOStatus == 'D' || response.OverallStatusList[2].EBOStatus == 'S' || response.OverallStatusList[3].EBOStatus == 'D' || response.OverallStatusList[3].EBOStatus == 'S' || response.OverallStatusList[4].EBOStatus == 'D' || response.OverallStatusList[4].EBOStatus == 'S' || response.OverallStatusList[5].EBOStatus == 'D' || response.OverallStatusList[5].EBOStatus == 'S')) {

							$rootScope.cloneData();

						} else if (response.OverallStatusList[0].EBOStatus == 'A' && response.OverallStatusList[1].EBOStatus == 'A' && response.OverallStatusList[2].EBOStatus == 'A' &&
							response.OverallStatusList[3].EBOStatus == 'A' && response.OverallStatusList[4].EBOStatus == 'A' && response.OverallStatusList[5].EBOStatus == 'A' &&
							response.OverallStatusList[6].EBOStatus == 'S') {
							$rootScope.activation = true;
							$rootScope.regApproved = true;
							$rootScope.profileApproved = true;
							$rootScope.formData.productApproved = true;
							$rootScope.bankApproved = true;
							$rootScope.otherApporved = true;
							$rootScope.documentApproved = true;
							$rootScope.panStage = true;
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.sixthCompleted = true;
							$rootScope.seventhCompleted = true;
							$rootScope.eigthCompleted = true;
							$rootScope.eightCarousel = true;
							$rootScope.activationDone = true;
							$('#onboard-success').modal({
								backdrop: 'static',
								keyboard: false
							});
						} else if (response.OverallStatusList[0].EBOStatus == 'R' || response.OverallStatusList[0].SPStatus != 'Y') {
							$rootScope.panStage = true;
							$rootScope.formData.aadharhide = false;
							if (response.OverallStatusList[0].EBOStatus == 'R') {
								$rootScope.getAPI = false;
							}
							$state.go('register', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (response.OverallStatusList[1].EBOStatus == 'R' || response.OverallStatusList[1].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[1].Threein1 == 'N')) {
							$rootScope.firstCompleted = true;
							$rootScope.formData.aadharhide = false;
							$rootScope.formData.aadharSection = true;
							$rootScope.wizardShow = true;
							if (response.OverallStatusList[1].EBOStatus == 'R') {
								$rootScope.profileRejected = false;
							}

							if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
								$rootScope.formData.KRA = true;
								sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
								$rootScope.ecommercekraValidation();
							} else if (response.OverallStatusList[0].CKYCClient == 'Y' && response.OverallStatusList[0].KRAClient == '') {
								$rootScope.formData.CKYC = true;
								sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
								$rootScope.ecommercekraValidation();
							} else if (response.OverallStatusList[0].CKYCClient == 'Y' && (response.OverallStatusList[0].CKYCUpdate == 'N' || response.OverallStatusList[0].CKYCUpdate == '')) {
								$rootScope.formData.CKYC = true;
								sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
								$rootScope.ecommerceCKYCValidation();
							} else if (response.OverallStatusList[0].KRAClient == '') {
								$rootScope.ecommercekraValidation();
							} else if (response.OverallStatusList[0].CKYCClient == '') {
								$rootScope.ecommerceCKYCValidation();
							} else {
								if (response.OverallStatusList[1].EBOStatus == 'R') {
									$rootScope.getAPI = false;
								}
								$state.go('address', {
									mobile: $rootScope.formData.EncMobile
								});
							}

						} else if (response.OverallStatusList[4].EBOStatus == 'R' || response.OverallStatusList[4].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[4].Threein1 == 'N')) {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;

							if (response.OverallStatusList[4].KRAClient == 'Y' && $rootScope.formData.isg) {
								$rootScope.formData.isgProfileSkip = true;
							}
							if (response.OverallStatusList[0].KRAClient == '' || response.OverallStatusList[0].KRAClient == 'Y') {
								$rootScope.ecommercekraValidation();
							} else if (response.OverallStatusList[0].CKYCClient == '' || response.OverallStatusList[0].CKYCClient == 'Y') {
								$rootScope.ecommerceCKYCValidation();
							}
							$state.go('personalDetails', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (response.OverallStatusList[3].EBOStatus == 'R' || response.OverallStatusList[3].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[3].Threein1 == 'N')) {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;

							if (response.OverallStatusList[3].EBOStatus == 'R') {
								$rootScope.getAPI = false;
							}
							$state.go('bank', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (!$rootScope.formData.skippedPayment && (response.OverallStatusList[2].EBOStatus == 'R' || response.OverallStatusList[2].SPStatus != 'Y' || response.OverallStatusList[7].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[2].Threein1 == 'N'))) {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;

							if (response.OverallStatusList[2].EBOStatus == 'R') {
								$rootScope.getAPI = false;
							}
							if (response.OverallStatusList[7].PaymentExceptionUpdate == 'Y') {
								$rootScope.formData.paymentSkip = true
							}
							$state.go('products', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (response.OverallStatusList[5].EBOStatus != 'R' && (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus == 'Y' && response.OverallStatusList[5].SPStatus == 'Y')) {
							$state.go('complete', {
								mobile: $rootScope.formData.EncMobile
							});
							if (response.OverallStatusList[0].IsEmailVerified == true) {
								$rootScope.verifyemail = false;
								$rootScope.verifyOTPSuccess = true;
							} else {
								$rootScope.verifyemail = true;
							}

						} else if (response.OverallStatusList[5].EBOStatus == 'R') {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							if (response.OverallStatusList[0].KRAClient != 'Y' || response.OverallStatusList[0].KRAUpdate != 'N') {
								$rootScope.formData.displayNonKraIpvButton = true;
							} else {
								$rootScope.formData.displayNonKraIpvButton = false;
							}
							if (response.OverallStatusList[5].EBOStatus == 'R') {
								$rootScope.formData.docStageRejected = true;
							}
							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (response.OverallStatusList[9].SPStatus == 'Y') {

							$rootScope.formData.apiLoading = true;
							var s_url = "DIYGetImagesByReferenceNumber";
							var sendData = {
								ReferenceNumber: $rootScope.formData.eRefNumber,
								IsDiy: true,
								EncryptToken: $rootScope.EncryptToken
							}
							serverService.apiCall(s_url, sendData).then(function (a) {
								var response = a.data;
								if (response.IsSuccess) {
									if (response.IpvPOAandNomineeList[8].IsSelfi == 'Y' || ipvFailure == 'failure') {
										$rootScope.updateDIY();
									} else {

										$rootScope.IPVRedirectURL = response.IpvURLEncode;

										var ipvOtpUrl = 'IPVOTPGenerationNew';
										var ipvData = {
											ReferenceNumber: $rootScope.formData.ReferenceNumber,
											Mobile: $rootScope.formData.fields.mobile,
											BrowserType: $rootScope.formData.browserType
										};
										serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
											var response = a.data;
											$rootScope.formData.apiLoading = false;
											sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber)
											var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
											serverService.apiIPVCall(url).then(function (a) {
												var response = a.data;
											});
										});

									}

								} else {
									$rootScope.formData.apiLoading = false;
									$state.go('documentUpload', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							})

						} else if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && response.OverallStatusList[7].SPStatus != 'Y' && !$rootScope.formData.NoPayment)) {

							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							//$rootScope.formData.makePayment = false;
							if (response.OverallStatusList[7].PaymentExceptionUpdate == 'Y') {
								$rootScope.formData.paymentSkip = true
							}
							$state.go('products', {
								mobile: $rootScope.formData.EncMobile
							});

						} else if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].KRAClient == 'Y' && $rootScope.formData.isg) {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							$rootScope.formData.isgProfileSkip = true;
							$rootScope.formData.isgEsign = true;
							$rootScope.getAPI = false;
							if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[9].KRAClient == 'Y' && $rootScope.formData.isg) {
								$rootScope.formData.isgDocSkip = true;
								$rootScope.formData.isgEsign = false;
								$rootScope.fifthCompleted = true;
								var s_url = "DIYGetDocumentProofStageByReferenceNumber";

								var sendData = {
									ReferenceNumber: $rootScope.formData.ReferenceNumber
								};
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(s_url, sendData).then(function (a) {
									var response = a.data;
									$rootScope.formData.apiLoading = false;
									if (response.IsSuccess) {
										if (response.ObjCDIYRegistration.FandOStatus == 1) {
											$state.go('documentUpload', {
												mobile: $rootScope.formData.EncMobile
											});
										} else {
											$rootScope.sixthCompleted = true;
											$state.go('complete', {
												mobile: $rootScope.formData.EncMobile
											});
											if (response.OverallStatusList[0].IsEmailVerified == true) {
												$rootScope.verifyemail = false;
												$rootScope.verifyOTPSuccess = true;
											} else {
												$rootScope.verifyemail = true;
											}

										}
									}
								});
							} else {
								if (!sessionStorage.getItem('skipEsign')) {
									$state.go('products', {
										mobile: $rootScope.formData.EncMobile
									});
								} else {
									$state.go('documentUpload', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							}
						} else if (response.OverallStatusList[5].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[5].Threein1 == 'N')) {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							if (response.OverallStatusList[0].KRAClient != 'Y' || response.OverallStatusList[0].KRAUpdate != 'N') {
								$rootScope.formData.displayNonKraIpvButton = true;
							} else {
								$rootScope.formData.displayNonKraIpvButton = false;
							}
							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[9].SPStatus != 'Y') {
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.sixthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							$rootScope.nonKraIPVCompleteStatus = false;
							$rootScope.formData.displayNonKraIpvButton = true;
							$rootScope.displayNonKraEsignButton = false;

							if (ipvFailure && ipvFailure == "ipvFailure") {
								$rootScope.updateDIY();
							} else {
								$state.go('documentUpload', {
									mobile: $rootScope.formData.EncMobile
								});
								setTimeout(function () {
									/*$('#formPDF').modal({
									backdrop: 'static',
									keyboard: false
									});*/
								}, 1000);
								/*var url = "GetEncrptToken";
								var sendData = {
								ReferenceNumber: sessionStorage.getItem('AxNo')
								}
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(url, sendData).then(function (a) {
								var res = a.data
								$rootScope.formData.apiLoading = false;
								$rootScope.token = res.EncryptToken;
								if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
								} else {
								$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
								}
								});*/
							}
							//$rootScope.apiResponseErrorMsg = "You have have completed providing your details, will get in touch with you shortly!";
						} else if (response.OverallStatusList[8].SPStatus == 'Y') {
							$state.go('complete', {
								mobile: $rootScope.formData.EncMobile
							});
							if (response.OverallStatusList[0].IsEmailVerified == true) {
								$rootScope.verifyemail = false;
								$rootScope.verifyOTPSuccess = true;
							} else {
								$rootScope.verifyemail = true;
							}
						} else if ($rootScope.formData.threeinone && response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[9].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[9].Threein1 == 'N')) {
							$rootScope.nonKraIPVCompleteStatus = true;
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.sixthCompleted = true;
							$rootScope.seventhCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							$rootScope.formData.displayNonKraIpvButton = false;
							$rootScope.displayNonKraEsignButton = false;

							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
							$rootScope.clearBrowsingData();
							setTimeout(function () {
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
							}, 1000);
							$rootScope.apiResponseErrorMsg = "You have have completed providing your details, will get in touch with you shortly!";
						} else {
							$('#paninformation').modal('hide');
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted = true;
							$rootScope.fourthCompleted = true;
							$rootScope.fifthCompleted = true;
							$rootScope.sixthCompleted = true;
							$rootScope.seventhCompleted = true;
							$rootScope.eigthCompleted = true;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;

							$rootScope.formData.displayNonKraIpvButton = false;
							$rootScope.displayNonKraEsignButton = false;
							$('#agree-terms').prop('checked', true);
							setTimeout(function () {
								$(".select").select2();
								$('.customcheckradio').iCheck({
									checkboxClass: 'icheckbox_minimal',
									radioClass: 'iradio_minimal'
								});
							}, 10);

							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
							$rootScope.clearBrowsingData();
							setTimeout(function () {
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
							}, 1000);
							$rootScope.apiResponseErrorMsg = "You have have completed providing your details, will get in touch with you shortly!";
						}
					});
				}
			}

			if (ReferenceNumber) {
				//alert(searchObject);
				sessionStorage.setItem('AxNo', ReferenceNumber)
				//$rootScope.getDIYStatus();
			}

			if (threeinone == 'true') {
				sessionStorage.setItem('threeinone', true);
				sessionStorage.setItem('AxNo', ref);
				$rootScope.formData.threeinone = true;
			}

			if (sessionStorage.getItem('threeinone') == 'true') {
				$rootScope.formData.threeinone = true;
			}

			$rootScope.getIBInfo = function (pan) {
				var s_url = "GetFinacleCustomerDetails";

				var sendData = {
					PanNumber: pan
				}

				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.finData = response;
						if ($rootScope.finData.basicInfo[0].CKycReferenceNumber) {
							var letter = $rootScope.finData.basicInfo[0].CKycReferenceNumber.charAt(0).toLowerCase();
						}
						if (letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S') {}
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

					}
				});
			}

			$rootScope.decryptUrl = function () {
				if ($rootScope.formData.DecryptURL || sessionStorage.getItem('AxNo')) {
					var encryptURL = "GetDecryptURL";
					if (sessionStorage.getItem('AxNo')) {
						$rootScope.formData.DecryptURL = sessionStorage.getItem('AxNo');
					}
					if (mode != 'RM') {
						mode = '';
					} else {
						$rootScope.formData.rmOTP = true;
					}
					var sendDataURL = {
						DecryptURL: $rootScope.formData.DecryptURL,
						RmMode: mode
					};
					serverService.apiCall(encryptURL, sendDataURL).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {

							if (response.BankShortName) {
								utm_bank = response.BankShortName;
								$rootScope.getBankLogo();
							} else {
								$rootScope.bgImgDesktop = '';
								$rootScope.bgImgMobile = '';
								$rootScope.bgImg = '';
							}

							if (response.IsKRA == 'Y') {
								$rootScope.formData.KRA = true;
								$rootScope.formData.IsKRAUpdate = 'N';
								sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
							}

							if (response.IsKRAEdit == 'Y') {
								$rootScope.formData.IsKRAUpdate = 'Y';
								$rootScope.formData.changeKRA = true;
								sessionStorage.setItem('IsKRAUpdate', 'Y');
								sessionStorage.setItem('IsKRA', true);
							}

							if (response.Mode == 'I') {
								$rootScope.webfinacle = true;
								$rootScope.formData.fields.panNumber = response.PANNumber;
								//$rootScope.getIBInfo(response.PANNumber);

								if ($rootScope.webfinacle && $rootScope.formData.CKYC && $rootScope.formData.KRA) {
									$rootScope.ibDocumentHide = true
								}

								if ($rootScope.webfinacle && $rootScope.formData.CKYC && !$rootScope.formData.KRA) {
									$rootScope.ibDocumentHide = true
										$rootScope.ibCkycDocumentShow = true
								}
							} else if (response.Mode == 'J' && response.PanNumberAes128Enc) {
								panNumber = response.PanNumberAes128Enc;
								$rootScope.getJanaDetails();
							}
							if (!$rootScope.formData.rmPopupData.name) {
								$rootScope.formData.rmPopupData = {
									"name": response.AgentName,
									"referenceNumber": response.ReferenceNumber,
									"mobile": response.AgentMobileNo
								};
							}
							if ($rootScope.formData.rmOTP) {
								$rootScope.Extmobile = response.Mobile;
								$rootScope.getExtOTP();
								$('#existingCustomer-popup').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.existingResponse = true;
								$rootScope.existingRef = response.ReferenceNumber;
								$rootScope.existingeRefNumber = $rootScope.formData.DecryptURL;
								$rootScope.formData.fields.panMobile = response.PANNumber;
								$rootScope.formData.RMModuleDocs = true;
								//$rootScope.extresendCounter();
								$rootScope.panMobile();
								$rootScope.formData.rmOTP = false;
							} else {
								sessionStorage.setItem("DOB", response.DOB);
								sessionStorage.setItem("IsKRA", response.IsKRA);
								sessionStorage.setItem("RxPan", response.PANNumber);
								sessionStorage.setItem("RxReferenceNumber", response.ReferenceNumber);
								sessionStorage.setItem('User_City', response.City);
								$rootScope.formData.fields.username = response.ClientName;
								$rootScope.formData.EncMobile = response.EncMobile;
								var fullname = $rootScope.formData.fields.username.split(' ');
								$rootScope.formData.fields.firstName = fullname[0];
								if (fullname.length >= 3) {
									$rootScope.formData.fields.middleName = fullname[1];
									var nameArray = [];
									for (var i = 2; i < fullname.length; i++) {
										nameArray.push(fullname[i]);
									}
									$rootScope.formData.fields.lastName = nameArray.join(" ");
								} else {
									$rootScope.formData.fields.lastName = fullname[1];
								}
								if (fullname.length == 1) {
									$rootScope.formData.fields.lastName = '.';
								}
								if (response.ReferenceNumber) {
									$rootScope.formData.fields.callMobile = response.Mobile
								}
								if (response.Mobile && response.Mobile.toLowerCase() != "null") {
									sessionStorage.setItem("RxMobile", response.Mobile);
									$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile');
								}
								if (response.Email && response.Email.toLowerCase() != "null") {
									sessionStorage.setItem("RxEmail", response.Email);
									$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
								}
								$rootScope.formData.fields.panNumber = sessionStorage.getItem("RxPan");
								$rootScope.formData.fields.DOB = response.DOB;
								$rootScope.formData.dob = response.DOB;
								$('#txtDOB').val(response.DOB);

								if (searchObject && searchObject.poa == '1') {
									$rootScope.downloadPOA(response.ReferenceNumber)

								} else {
									$rootScope.getDIYStatus();
								}
							}
						} else {
							$rootScope.formData.fields.mobile = '';
						}
					});
				}
			}

			if (sessionStorage.getItem('IsKRA') == null || sessionStorage.getItem('DOB') == null || sessionStorage.getItem('RxPan') == null || sessionStorage.getItem('RxMobile') == null || sessionStorage.getItem('RxEmail') == null || $rootScope.formData.threeinone || sessionStorage.getItem('AxNo')) {
				$rootScope.decryptUrl();
			}
			$rootScope.newForm = function () {
				$rootScope.formData.newRMForm = true;
			}

			$rootScope.uidaiRedirect = function () {
				window.open('https://resident.uidai.gov.in/verify-email-mobile', '_blank')
			}

			$rootScope.WBTempPersistence = function () {
				var s_url = "WBTempPersistence";

				sessionStorage.setItem('DOB', $rootScope.formData.dob);

				var sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					MobileNo: $rootScope.formData.fields.mobile,
					EmailID: $rootScope.formData.fields.email,
					RK: $rootScope.formData.ReferKey,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				};

				serverService.apiCall(s_url, sendData).then(function (a) {
					var res = a.data;
					if (res.EncryptToken) {
						$rootScope.EncryptToken = res.EncryptToken;
					}

					$rootScope.panLoaded = false
						$rootScope.firstCompleted = true;
					$rootScope.getAPI = false;
					dataLayer.push({
						event: 'StageChange',
						attributes: {
							'level complete': '1b',
							'pan': $rootScope.formData.fields.panNumber,
							'dob': $rootScope.formData.dob,
							'UTM Source': utm_source,
							'UTM Medium': utm_medium,
							'UTM Term': utm_term,
							'UTM Creative': utm_creative,
							'UTM Campaign': utm_campaign,
							'UTM Adgroup': utm_adgroup,
							'UTM Placement': utm_placement,
							'UTM Device': utm_device,
							'UTM Content': utm_content,
							'CTA': CTA,
							'GCLID': GCLID

						}
					});

					$rootScope.ecommercekraValidation();
					/*if (sessionStorage.getItem('IsKRA') == 'true') {
					$rootScope.ecommercekraValidation();
					} else if (sessionStorage.getItem('IsCKYC') == 'true') {
					$rootScope.ecommerceCKYCValidation();
					} else {
					$state.go('address', {
					mobile: $rootScope.formData.EncMobile
					});
					}*/

				}, function (e) {
					$('#connection').modal('show');
				});
			}

			$rootScope.codeMaping = function () {
				var url = 'LCLGCodeMappingDiy';
				var sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					LCCode: $rootScope.formData.assistedLCCode,
					LGCode: $rootScope.formData.assistedLGCode
				}

				serverService.apiCall(url, sendData);
			}

			$rootScope.generateReference = function () {
				if ($rootScope.formData.fields.mobile) {
					sessionStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);
				}
				if ($rootScope.formData.fields.email) {
					sessionStorage.setItem("RxEmail", $rootScope.formData.fields.email);
				}
				sessionStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
				if (sessionStorage.getItem("CFirstname")) {
					$rootScope.formData.ClientFirstname = sessionStorage.getItem("CFirstname");
				}
				if (sessionStorage.getItem("CMiddlename")) {
					$rootScope.formData.ClientMiddlename = sessionStorage.getItem("CMiddlename");
				}
				if (sessionStorage.getItem("CLastname")) {
					$rootScope.formData.ClientLastname = sessionStorage.getItem("CLastname");
				}

				sessionStorage.setItem('DOB', $rootScope.formData.dob);

				if (!$rootScope.formData.aadharNumber) {
					$rootScope.formData.aadharAuthorize = 'N';
				}

				if (!$rootScope.formData.ReferenceNumber) {
					var s_url = 'ReferenceNumberClientInfoRegistration';
					var kraClnt = "N";
					if (sessionStorage.getItem("IsKRA") == 'true') {
						kraClnt = "Y";
					}
					var sendData = {
						Mode: mode,
						IsExisting: $rootScope.formData.IsClone,
						DropReferenceNumber: "",
						FirstName: $rootScope.formData.ClientFirstname,
						MiddleName: $rootScope.formData.ClientMiddlename,
						LastName: $rootScope.formData.ClientLastname,
						PanNumber: $rootScope.formData.fields.panNumber,
						Email: $rootScope.formData.fields.email,
						DOB: $rootScope.formData.dob,
						Mobile: $rootScope.formData.fields.mobile,
						KRAClient: kraClnt,
						BrowserType: $rootScope.formData.browserType,
						UID: $rootScope.formData.fields.aadharNumber,
						AadharAuthorisation: $rootScope.formData.aadharAuthorize,
						RMCode: $rootScope.formData.fields.rmcode,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					};

					$rootScope.formData.refGen = true;

					$(".text-animation-area .step2").removeClass().addClass('axremoveText');
					$(".text-animation-area .step3").removeClass().addClass('axTextHide');
					$(".text-animation-area .step4").removeClass('axTextSemiStart').addClass('axTextActive');
					$(".text-animation-area .step4 i").removeClass().addClass('icon icon-circle-check');

					//hide wizard section here
					$rootScope.wizardShow = false;
					sessionStorage.setItem("AxRM", false);
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$('#paninformation').modal('hide');
						$rootScope.wizardShow = true;
						if ($rootScope.formData.RMModule || response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							sessionStorage.setItem('AxToken', response.EncryptToken);
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
							$rootScope.firstCompleted = true;
							$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
							sessionStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
							if (response.RefNumber) {
								$rootScope.formData.eRefNumber = response.RefNumber;
								sessionStorage.setItem("AxNo", response.RefNumber);
							}
							if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
								sessionStorage.setItem("AxRM", true);
							}
							if (response.ReferenceNumber.search("WB") != -1) {
								$rootScope.WBTempPersistence();
							} else {
								$rootScope.formData.otherMode = true;
								$('#paninformation').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.formData.panStatus = 'Your account is under process in another mode';
							}
							if ($rootScope.formData.assistedLGCode || $rootScope.formData.assistedLCCode) {
								$rootScope.codeMaping();
							}

						} else {
							$('#connection').modal('show');
						}

					}, function (e) {
						$('#connection').modal('show');
					});
				} else {
					$rootScope.getDIYStatus();
				}
			}
			$rootScope.ecommerceCKYCValidation = function () {
				var surl = "GetCKYCTrackwizzDetails?PanNumber=" + $rootScope.formData.fields.panNumber;
				serverService.getApi(surl).then(function (a) {
					var data = a.data;
					if (data.cKYCPersonalDetail) {
						if (response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber) {
							var letter = response.a23CkycResponseDetail.cKYCPersonalDetail.CKYCNumber.charAt(0);
						}
						if ($rootScope.webfinacle && (letter == 'l' || letter == 'L' || letter == 'L' || letter == 'S')) {
							$rootScope.formData.CKYC = false;
							sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
						} else if (data.cKYCPersonalDetail.CKYCNumber && data.cKYCPersonalDetail.CKYCCorAddPin) {
							$rootScope.formData.CKYC = true;
							sessionStorage.setItem('CKYCResponseData', JSON.stringify(data.cKYCPersonalDetail));
						} else {
							$rootScope.formData.CKYC = false;
							sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
						}
					} else {
						$rootScope.formData.CKYC = false;
						sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
					}
					$state.go('address', {
						mobile: $rootScope.formData.EncMobile
					});
				});
			}
			$rootScope.ecommercekraValidation = function () {

				var surl = "KRAClientValidationupdate";

				if ($rootScope.ExtDOB) {
					$rootScope.formData.dob = $rootScope.ExtDOB
				}

				var dateStr = ($rootScope.formData.dob) ? $rootScope.formData.dob.split("/") : sessionStorage.getItem('DOB').split("/");
				var date = dateStr[0];
				var month = dateStr[1];
				var year = dateStr[2];
				var NewDate = date + "/" + month + "/" + year;
				$rootScope.formData.fields.DOB = NewDate;
				var userDob = $rootScope.formData.fields.DOB;

				var sendData = {
					Email: $rootScope.formData.fields.email,
					Mobile: $rootScope.formData.fields.mobile,
					PanNumber: $rootScope.formData.fields.panNumber,
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					DOB: userDob,
					Mode: mode,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				};
				$('.loader-info.paninfo').css('display', 'block');
				$rootScope.formData.kraChecking = true;
				$rootScope.formData.checkingMessage = "Please wait. We're verifying your KYC details from KRA site.";
				serverService.apiCall(surl, sendData).then(function (a) {
					var response = a.data;
					if (response.Token) {
						$rootScope.EncryptToken = response.Token;
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

					if ($rootScope.formData.aadharVerified) {
						$rootScope.formData.changeAadhar = true;
						$rootScope.formData.aadharVerified = false;
					}
					$rootScope.krasearch = false;
					$rootScope.formData.kraChecking = false;
					if (response.Registration.KRAVerifiedClient == 'Y') {
						if (response.KRAExistingClientInfo.APP_MiddleName === null || response.KRAExistingClientInfo.APP_MiddleName === 'null') {
							response.KRAExistingClientInfo.APP_MiddleName = '';
						}
						$rootScope.formData.kraData = response.KRAExistingClientInfo;
						if (($rootScope.formData.kraData.APP_FirstName == null || $rootScope.formData.kraData.APP_FirstName == '') && ($rootScope.formData.kraData.APP_NAME == null || $rootScope.formData.kraData.APP_NAME == '')) {
							sessionStorage.setItem("IsKRA", false);
							$rootScope.formData.changeAadhar = true;
							$rootScope.formData.changeKRA = true;
							$rootScope.formData.KRA = false;
							$rootScope.krasearch = false;
							if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
								$rootScope.ecommerceCKYCValidation();
							} else {
								$state.go('address', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						} else {
							if ($rootScope.formData.kraData.APP_COR_PINCD) {

								var purl = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_COR_PINCD;

								serverService.getApi(purl).then(function (a) {
									var response = a.data;
									if (response.IsSuccess) {
										$rootScope.formData.KRA = true;
										$rootScope.krasearch = false;
										sessionStorage.setItem("IsKRA", true);
										$('.newaddressarea label input[type="checkbox"]').prop('checked', false);
										$('.newaddressarea .icheckbox_minimal').removeClass('checked');

										$rootScope.formData.kraData.APP_COR_STATENAME = response.PincodeList[0].StateName;
										$rootScope.formData.kraData.APP_COR_DISTRICT = response.PincodeList[0].District;

										if ($rootScope.formData.kraData.APP_COR_ADD1 == $rootScope.formData.kraData.APP_PER_ADD1) {
											$rootScope.formData.getSameAddress = true;
											$rootScope.formData.kraData.APP_PER_STATENAME = $rootScope.formData.kraData.APP_COR_STATENAME;
											$rootScope.formData.kraData.APP_PER_DISTRICT = $rootScope.formData.kraData.APP_COR_DISTRICT;
											sessionStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
											$rootScope.formData.getKraData = true;
											if ($rootScope.formData.isg) {
												$rootScope.formData.isgProfileSkip = true;
												$rootScope.isgKRA();
											} else {
												if (!$rootScope.formData.CKYC || !$rootScope.formData.KRA) {
													$rootScope.formData.aadhaarProcess = true;
												}
												if ($rootScope.secondCompleted) {
													$rootScope.bKRA = true;
													$rootScope.$broadcast("BKRA", $rootScope.bKRA);
													$state.go('personalDetails', {
														mobile: $rootScope.formData.EncMobile
													});
												} else {
													$state.go('address', {
														mobile: $rootScope.formData.EncMobile
													});
												}

											}
										} else {
											$rootScope.formData.getSameAddress = false;
											$rootScope.formData.kraPerAdr = true;
											if ($rootScope.formData.kraData.APP_PER_PINCD && ($rootScope.formData.kraData.APP_COR_PINCD != $rootScope.formData.kraData.APP_PER_PINCD)) {
												var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_PER_PINCD;

												serverService.getApi(p_url).then(function (a) {
													var response = a.data;
													if (response.IsSuccess) {
														$rootScope.formData.kraData.APP_PER_STATENAME = response.PincodeList[0].StateName;
														$rootScope.formData.kraData.APP_PER_DISTRICT = response.PincodeList[0].District;
														sessionStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
														$rootScope.formData.getKraData = true;
														if ($rootScope.formData.isg) {
															$rootScope.formData.isgProfileSkip = true;
															$rootScope.isgKRA();
														} else {
															if (!$rootScope.formData.CKYC || !$rootScope.formData.KRA) {
																$rootScope.formData.aadhaarProcess = true;
															}
															if ($rootScope.secondCompleted) {
																$rootScope.bKRA = true;
																$rootScope.$broadcast("BKRA", $rootScope.bKRA);
																$state.go('personalDetails', {
																	mobile: $rootScope.formData.EncMobile
																});
															} else {
																$state.go('address', {
																	mobile: $rootScope.formData.EncMobile
																});
															}
														}
													} else {
														sessionStorage.setItem("IsKRA", false);
														$rootScope.formData.KRA = false;
														$rootScope.formData.changeKRA = false;

														if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
															$rootScope.ecommerceCKYCValidation();
														} else {
															$state.go('address', {
																mobile: $rootScope.formData.EncMobile
															});
														}
													}
												});
											} else {
												$rootScope.formData.kraData.APP_PER_STATENAME = $rootScope.formData.kraData.APP_COR_STATENAME;
												$rootScope.formData.kraData.APP_PER_DISTRICT = $rootScope.formData.kraData.APP_COR_DISTRICT;
												sessionStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
												$rootScope.formData.getKraData = true;
												if ($rootScope.formData.isg) {
													$rootScope.formData.isgProfileSkip = true;
													$rootScope.isgKRA();
												} else {
													if (!$rootScope.formData.CKYC || !$rootScope.formData.KRA) {
														$rootScope.formData.aadhaarProcess = true;
													}
													if ($rootScope.secondCompleted) {
														$rootScope.bKRA = true;
														$rootScope.$broadcast("BKRA", $rootScope.bKRA);
														$state.go('personalDetails', {
															mobile: $rootScope.formData.EncMobile
														});
													} else {
														$state.go('address', {
															mobile: $rootScope.formData.EncMobile
														});
													}
												}
											}
										}

									} else {
										sessionStorage.setItem("IsKRA", false);
										$rootScope.formData.KRA = false;
										$rootScope.formData.changeKRA = false;
										if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
											$rootScope.ecommerceCKYCValidation();
										} else {
											$state.go('address', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									}
								});
							} else {
								$rootScope.formData.kraData = response.KRAExistingClientInfo;
								sessionStorage.setItem("IsKRA", false);
								$rootScope.formData.KRA = false;
								$rootScope.formData.changeKRA = true;
								if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
									$rootScope.ecommerceCKYCValidation();
								} else {
									$state.go('address', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							}
						}
					} else {
						sessionStorage.setItem("IsKRA", false);
						$rootScope.formData.KRA = false;
						$rootScope.formData.changeKRA = true;

						if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
							$rootScope.ecommerceCKYCValidation();
						} else {
							$state.go('address', {
								mobile: $rootScope.formData.EncMobile
							});
						}

					}

				});
			}

			$rootScope.isgKRA = function () {
				var url = "DIYClientPersonalInfoProfile";
				$rootScope.addressSame = 1;
				if ($rootScope.formData.getSameAddress) {
					$rootScope.addressSame = 0;
				}
				$rootScope.formData.apiLoading = true;
				var sendData = {
					ObjCDIYClientProfile: {
						ClientInfoId: 1,
						Title: '',
						ClientPrefixID: '',
						FirstName: $rootScope.formData.kraData.APP_FirstName,
						MiddleName: $rootScope.formData.kraData.APP_MiddleName,
						LastName: $rootScope.formData.kraData.APP_LastName,
						Mobile: $rootScope.formData.fields.mobile,
						Email: $rootScope.formData.fields.email,
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						CorrespondenceTypeID: '1003',
						CAddressLine1: $rootScope.formData.kraData.APP_COR_ADD1,
						CAddressLine2: $rootScope.formData.kraData.APP_COR_ADD2,
						CAddressLine3: $rootScope.formData.kraData.APP_COR_ADD3,
						CCity: $rootScope.formData.kraData.APP_COR_CITY,
						CDistrict: $rootScope.formData.kraData.APP_COR_DISTRICT,
						CState: $rootScope.formData.kraData.APP_COR_STATENAME,
						CStateID: $rootScope.formData.kraData.APP_COR_STATE,
						CCountry: 'INDIA',
						CPinCode: $rootScope.formData.kraData.APP_COR_PINCD,
						PermantTypeID: '1003',
						PAddressLine1: $rootScope.formData.kraData.APP_PER_ADD1,
						PAddressLine2: $rootScope.formData.kraData.APP_PER_ADD2,
						PAddressLine3: $rootScope.formData.kraData.APP_PER_ADD3,
						PCity: $rootScope.formData.kraData.APP_PER_CITY,
						PDistrict: $rootScope.formData.kraData.APP_PER_DISTRICT,
						PState: $rootScope.formData.kraData.APP_PER_STATENAME,
						PStateID: $rootScope.formData.kraData.APP_PER_STATE,
						PCountry: 'INDIA',
						PPinCode: $rootScope.formData.kraData.APP_PER_PINCD,
						IsAadharUpdate: 'N',
						IsKRAUpdate: 'N',
						IsKRA: 'Y',
						IsAadhar: 'N',
						IsSamePermenantAddress: $rootScope.addressSame,
						BrowserType: $rootScope.formData.browserType,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					}
				};

				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.EncryptToken) {
						$rootScope.EncryptToken = response.EncryptToken;
						sessionStorage.setItem('AxToken', response.EncryptToken);
					} else {
						if ($rootScope.formData.tokenValidation) {
							$rootScope.formData.apiLoading = false;
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
						sessionStorage.setItem('IsKRA', true);
						dataLayer.push({
							event: 'StageChange',
							attributes: {
								'level complete': '2',
								'FirstName': $rootScope.formData.kraData.APP_FirstName,
								'MiddleName': $rootScope.formData.kraData.APP_MiddleName,
								'LastName': $rootScope.formData.kraData.APP_LastName,
								'CorrespondenceType': 'Residential',
								'CorrespondenceAddressLine1': $rootScope.formData.kraData.APP_COR_ADD1,
								'CorrespondenceAddressLine2': $rootScope.formData.kraData.APP_COR_ADD2,
								'CorrespondenceAddressLine3': $rootScope.formData.kraData.APP_COR_ADD3,
								'CorrespondenceCity': $rootScope.formData.kraData.APP_COR_CITY,
								'CorrespondenceDistrict': $rootScope.formData.kraData.APP_COR_DISTRICT,
								'CorrespondenceState': $rootScope.formData.kraData.APP_COR_STATENAME,
								'CorrespondenceCountry': 'INDIA',
								'CorrespondencePinCode': $rootScope.formData.kraData.APP_COR_PINCD,
								'PermanentType': 'Residential',
								'PermanentAddressLine1': $rootScope.formData.kraData.APP_PER_ADD1,
								'PermanentPAddressLine2': $rootScope.formData.kraData.APP_PER_ADD2,
								'PermanentAddressLine3': $rootScope.formData.kraData.APP_PER_ADD3,
								'PermanentCity': $rootScope.formData.kraData.APP_PER_CITY,
								'PermanentDistrict': $rootScope.formData.kraData.APP_PER_DISTRICT,
								'PermanentState': $rootScope.formData.kraData.APP_PER_STATENAME,
								'PermanentCountry': 'INDIA',
								'PermanentPinCode': $rootScope.formData.kraData.APP_PER_PINCD
							}
						});
						$rootScope.secondCompleted = true;
						$rootScope.wizardShow = true;
						$state.go('personalDetails', {
							mobile: $rootScope.formData.EncMobile
						});
					}

				});
			}

			if (sessionStorage.getItem('RxPan') != null && sessionStorage.getItem('RxPan') != '') {
				$rootScope.formData.fields.panNumber = sessionStorage.getItem('RxPan');
			}

			$rootScope.cloneData = function () {

				//$rootScope.formData.ReferenceNumber  = $rootScope.formData.oldReferenceNumber;
				$rootScope.formData.apiLoading = true;
				var url = 'ResumeDroppedReferenceNumber';
				var sendData = {
					Mobile: $rootScope.formData.fields.mobile,
					Email: $rootScope.formData.fields.email,
					PanNumber: $rootScope.formData.fields.panNumber,
					DOB: $rootScope.formData.dob,
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					Mode: mode,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				}

				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
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

					if (response.IsSuccess) {
						$rootScope.formData.dataCloned = true;
						$('#paninformation').modal('hide');
						$rootScope.formData.ReferenceNumber = response.ObjCDIYRegistration.ReferenceNumber;
						sessionStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
						$rootScope.getDIYStatusAPI = false;
						$rootScope.getDIYStatus();
						$rootScope.formData.IsClone = false;
						//$scope.updateRegistration();
						$rootScope.UpdateTempPersistenceResume();
					}

				});
			};

			$rootScope.overallStatus = function () {
				refNo = $rootScope.formData.ReferenceNumber;
				if (refNo && !$rootScope.formData.IsClone && !$rootScope.formData.applicationDisabled) {
					var s_url = "GetOverallStatusByReferenceNumberWB";
					if (!$rootScope.formData.eRefNumber) {
						$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
					}
					var sendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber
					};

					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {
							//$rootScope.formData.KRA = false;
							//$rootScope.formData.IsKRAUpdate = 'Y';

							if (response.RMModule == "Y") {
								$rootScope.formData.RMModuleDocs = true;
								//$rootScope.formData.RMModule = true;
								//$rootScope.formData.rmDivAction = false;
							}

							if (response.OverallStatusList[0].IsEmailVerified == true) {
								$rootScope.verifyemail = false;
								$rootScope.verifyOTPSuccess = true;
							} else {
								$rootScope.verifyemail = true;
							}

							//checking RM logged in and client has completed payment condition
							if (response.OverallStatusList[7].SPStatus == 'Y' && $rootScope.formData.RMModule) {
								$rootScope.formData.RMReferenceNumber = true;
							}
							if (response.OverallStatusList[1].SPStatus == 'Y') {
								if (response.OverallStatusList[0].CKYCClient == 'Y') {
									$rootScope.formData.CKYC = true;
									sessionStorage.setItem('IsCKYC', true);
								} else {
									$rootScope.formData.CKYC = false;
								}
								if (response.OverallStatusList[0].CKYCUpdate == 'Y') {
									sessionStorage.setItem('IsCKYCUpdate', 'Y')
									$rootScope.formData.changeCKYC = true;
								}

								if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
									$rootScope.formData.KRA = true;
									$rootScope.formData.IsKRAUpdate = 'N';
									sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
								}

								if (response.OverallStatusList[0].KRAUpdate == 'Y') {
									$rootScope.formData.IsKRAUpdate = 'Y';
									$rootScope.formData.changeKRA = true;
									sessionStorage.setItem('IsKRAUpdate', 'Y');
									sessionStorage.setItem('IsKRA', true);
								}

							}

							if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
								$rootScope.formData.isPaymentCompleted = true;
								$rootScope.formData.makePayment = false;
								sessionStorage.setItem('isPaymentCompleted', true);
								$rootScope.$broadcast("productStage", $rootScope.formData.isPaymentCompleted);
							} else {
								if (!$rootScope.formData.NoPayment) {
									$rootScope.formData.makePayment = true;
									$rootScope.formData.isPaymentCompleted = false;
									sessionStorage.setItem('isPaymentCompleted', false);
								}
							}

							if (response.IsConvertedToSalesApp) {
								$rootScope.formData.modeconvert = true;
							} else {
								if (response.OverallStatusList != null) {
									if (response.OverallStatusList[0].SPStatus != 'Y') {
										$rootScope.formData.stageName = "registration";
									} else if (response.OverallStatusList[1].SPStatus != 'Y') {
										$rootScope.formData.stageName = "profile";
									} else if (response.OverallStatusList[2].SPStatus != 'Y') {
										$rootScope.formData.stageName = "plans";
									} else if (response.OverallStatusList[3].SPStatus != 'Y') {
										$rootScope.formData.stageName = "bank";
									} else if (response.OverallStatusList[4].SPStatus != 'Y') {
										$rootScope.formData.stageName = "other detail";
									} else if (response.OverallStatusList[5].SPStatus != 'Y') {
										$rootScope.formData.stageName = "documents";
									}
									// Payment functionality Hide/Show
									// if(sessionStorage.getItem('IsKRA') ==  'true' || sessionStorage.getItem('IsAadharVerified') == 'true'){
									if (response.OverallStatusList[7].SPStatus == 'Y') {
										$rootScope.formData.paymentSkip = false;
									}
									if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
										$rootScope.formData.makePayment = false;
										sessionStorage.setItem('isPaymentCompleted', true);
									} else {
										if (!$rootScope.formData.NoPayment) {
											$rootScope.formData.makePayment = true;
											sessionStorage.setItem('isPaymentCompleted', false);
										}
									}
									/* }else{
									$rootScope.formData.makePayment = false;
									sessionStorage.setItem('isPaymentCompleted', true);
									}*/

									$rootScope.formData.StatusList = response.OverallStatusList;

									$rootScope.regErrorMsg = (response.OverallStatusList[0].Remarks);
									$rootScope.personalErrorMsg = (response.OverallStatusList[1].Remarks);
									$rootScope.productErrorMsg = (response.OverallStatusList[2].Remarks);
									$rootScope.bankErrorMsg = (response.OverallStatusList[3].Remarks);
									$rootScope.otherErrorMsg = (response.OverallStatusList[4].Remarks);
									$rootScope.documentsErrorMsg = (response.OverallStatusList[5].Remarks);

									// $rootScope.statusID = [4,7,8,10,11,20,45,46,47,48,49,50];
									if (response.OverallStatusList[0].Threein1 == 'Y') {
										$rootScope.formData.threeinone = true;
										if (response.OverallStatusList[1].Threein1 == 'Y') {
											$rootScope.formData.skipRegister = true;
										}
									}

									if (response.OverallStatusList[0].EBOStatus == 'D' || response.OverallStatusList[0].EBOStatus == 'S' || response.OverallStatusList[1].EBOStatus == 'D' || response.OverallStatusList[1].EBOStatus == 'S' || response.OverallStatusList[2].EBOStatus == 'D' || response.OverallStatusList[2].EBOStatus == 'S' || response.OverallStatusList[3].EBOStatus == 'D' || response.OverallStatusList[3].EBOStatus == 'S' || response.OverallStatusList[4].EBOStatus == 'D' || response.OverallStatusList[4].EBOStatus == 'S' || response.OverallStatusList[5].EBOStatus == 'D' || response.OverallStatusList[5].EBOStatus == 'S') {
										// if (!$rootScope.formData.applicationDisabled) {
										// 	$('#paninformation').modal({
										// 		backdrop: 'static',
										// 		keyboard: false
										// 	});
										// 	$rootScope.formData.panStatus = 'Your account has been dropped';
										// }
										// $rootScope.formData.applicationDisabled = true;
										// $rootScope.krasearch = false;
										// $state.go('register', {
										// 	mobile: $rootScope.formData.EncMobile
										// });
										$rootScope.cloneData();
									} else
										if (response.OverallStatusList[0].SPStatus == 'N' && response.OverallStatusList[0].EBOStatus == 'N') {
											$rootScope.registrationStatus = '';
											$rootScope.regErrorNav = false;
										} else if (response.OverallStatusList[0].SPStatus == 'Y' && response.OverallStatusList[0].EBOStatus == 'N') {
											$rootScope.registrationStatus = 'grey';
											$rootScope.registrationStatusA = 'warning';
											$rootScope.regErrorNav = false;
										} else if (response.OverallStatusList[0].SPStatus == 'Y' && response.OverallStatusList[0].EBOStatus == 'Y') {
											$rootScope.registrationStatus = 'orange';
											$rootScope.registrationStatusA = 'warning';
											$rootScope.regErrorNav = false;
										} else if (response.OverallStatusList[0].SPStatus == 'Y' && response.OverallStatusList[0].EBOStatus == 'A') {
											$rootScope.registrationStatus = 'green';
											$rootScope.registrationStatusA = 'completed';
											$rootScope.formData.panDisabled = true;
											$rootScope.regErrorNav = false;
										} else if (response.OverallStatusList[0].SPStatus == 'Y' && response.OverallStatusList[0].EBOStatus == 'R') {
											$rootScope.registrationStatus = 'red';
											$rootScope.registrationStatusA = 'danger';
										}

									if (response.OverallStatusList[1].SPStatus == 'N' && response.OverallStatusList[1].EBOStatus == 'N') {
										$rootScope.personalInfoStatus = '';
										$rootScope.prbrjt = false;
										$rootScope.profileErrorNav = false;
									} else if (response.OverallStatusList[1].SPStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'N') {
										$rootScope.personalInfoStatus = 'grey';
										$rootScope.personalInfoStatusA = 'warning';
										$rootScope.prbrjt = false;
										$rootScope.profileErrorNav = false;
										if ($rootScope.formData.Profile_SPStatus == "N" && ($rootScope.formData.Profile_SPStatus != response.OverallStatusList[1].SPStatus || $rootScope.formData.Profile_EBOStatus != response.OverallStatusList[1].EBOStatus)) {
											$rootScope.formData.Profile_SPStatus = response.OverallStatusList[1].SPStatus;
											$rootScope.formData.Profile_EBOStatus = response.OverallStatusList[1].EBOStatus;
											$state.go('plans', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[1].SPStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'Y') {
										$rootScope.personalInfoStatus = 'orange';
										$rootScope.personalInfoStatusA = 'warning';
										$rootScope.prbrjt = false;
										$rootScope.profileErrorNav = false;
										if ($rootScope.formData.Profile_SPStatus != response.OverallStatusList[1].SPStatus || $rootScope.formData.Profile_EBOStatus != response.OverallStatusList[1].EBOStatus) {
											$rootScope.formData.Profile_SPStatus = response.OverallStatusList[1].SPStatus;
											$rootScope.formData.Profile_EBOStatus = response.OverallStatusList[1].EBOStatus;
										}
									} else if (response.OverallStatusList[1].SPStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'A') {
										$rootScope.personalInfoStatus = 'green';
										$rootScope.personalInfoStatusA = 'completed';
										$rootScope.prbrjt = false;
										$rootScope.profileErrorNav = false;
										if ($rootScope.formData.Profile_SPStatus != response.OverallStatusList[1].SPStatus || $rootScope.formData.Profile_EBOStatus != response.OverallStatusList[1].EBOStatus) {
											$rootScope.formData.Profile_SPStatus = response.OverallStatusList[1].SPStatus;
											$rootScope.formData.Profile_EBOStatus = response.OverallStatusList[1].EBOStatus;
										}
									} else if (response.OverallStatusList[1].SPStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'R') {
										$rootScope.personalInfoStatus = 'red';
										$rootScope.personalInfoStatusA = 'danger';
										$rootScope.prbrjt = true;
										if ($rootScope.formData.Profile_SPStatus != response.OverallStatusList[1].SPStatus || $rootScope.formData.Profile_EBOStatus != response.OverallStatusList[1].EBOStatus) {
											$rootScope.formData.Profile_SPStatus = response.OverallStatusList[1].SPStatus;
											$rootScope.formData.Profile_EBOStatus = response.OverallStatusList[1].EBOStatus;
										}
									}

									if (response.OverallStatusList[2].SPStatus == 'N' && response.OverallStatusList[2].EBOStatus == 'N') {
										$rootScope.productStatus = '';
										$rootScope.prdrjt = false;
										$rootScope.productsErrorNav = false;
									} else if (response.OverallStatusList[2].SPStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'N') {
										$rootScope.productStatus = 'grey';
										$rootScope.productStatusA = 'warning';
										$rootScope.prdrjt = false;
										$rootScope.productsErrorNav = false;
										if ($rootScope.formData.Product_SPStatus == "N" && ($rootScope.formData.Product_SPStatus != response.OverallStatusList[2].SPStatus || $rootScope.formData.Product_EBOStatus != response.OverallStatusList[2].EBOStatus)) {
											$rootScope.formData.Product_SPStatus = response.OverallStatusList[2].SPStatus;
											$rootScope.formData.Product_EBOStatus = response.OverallStatusList[2].EBOStatus;
											$state.go('bank', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[2].SPStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'Y') {
										$rootScope.productStatus = 'orange';
										$rootScope.productStatusA = 'warning';
										$rootScope.prdrjt = false;
										$rootScope.productsErrorNav = false;
										if ($rootScope.formData.Product_SPStatus != response.OverallStatusList[2].SPStatus || $rootScope.formData.Product_EBOStatus != response.OverallStatusList[2].EBOStatus) {
											$rootScope.formData.Product_SPStatus = response.OverallStatusList[2].SPStatus;
											$rootScope.formData.Product_EBOStatus = response.OverallStatusList[2].EBOStatus;
										}
									} else if (response.OverallStatusList[2].SPStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'A') {
										$rootScope.productStatus = 'green';
										$rootScope.productStatusA = 'completed';
										$rootScope.formData.productApproved = true;
										$rootScope.$broadcast("productStage", $rootScope.formData.productApproved);
										$rootScope.prdrjt = false;
										$rootScope.productsErrorNav = false;
										if ($rootScope.formData.Product_SPStatus != response.OverallStatusList[2].SPStatus || $rootScope.formData.Product_EBOStatus != response.OverallStatusList[2].EBOStatus) {
											$rootScope.formData.Product_SPStatus = response.OverallStatusList[2].SPStatus;
											$rootScope.formData.Product_EBOStatus = response.OverallStatusList[2].EBOStatus;
										}
									} else if (response.OverallStatusList[2].SPStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'R') {

										$rootScope.productStatus = 'red';
										$rootScope.productStatusA = 'danger';
										$rootScope.prdrjt = true;
										if ($rootScope.formData.Product_SPStatus != response.OverallStatusList[2].SPStatus || $rootScope.formData.Product_EBOStatus != response.OverallStatusList[2].EBOStatus) {
											$rootScope.formData.Product_SPStatus = response.OverallStatusList[2].SPStatus;
											$rootScope.formData.Product_EBOStatus = response.OverallStatusList[2].EBOStatus;
										}

									}

									if (response.OverallStatusList[3].SPStatus == 'N' && response.OverallStatusList[3].EBOStatus == 'N') {
										$rootScope.bankStatus = '';
										$rootScope.bankrjt = false;
										$rootScope.bankErrorNav = false;
									} else if (response.OverallStatusList[3].SPStatus == 'Y' && response.OverallStatusList[3].EBOStatus == 'N') {
										$rootScope.bankStatus = 'grey';
										$rootScope.bankStatusA = 'warning';
										$rootScope.bankrjt = false;
										$rootScope.bankErrorNav = false;
										if ($rootScope.formData.Bank_SPStatus == "N" && ($rootScope.formData.Bank_SPStatus != response.OverallStatusList[3].SPStatus || $rootScope.formData.Bank_EBOStatus != response.OverallStatusList[3].EBOStatus)) {
											$rootScope.formData.Bank_SPStatus = response.OverallStatusList[3].SPStatus;
											$rootScope.formData.Bank_EBOStatus = response.OverallStatusList[3].EBOStatus;
											$state.go('otherDetails', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[3].SPStatus == 'Y' && response.OverallStatusList[3].EBOStatus == 'Y') {
										$rootScope.bankStatus = 'orange';
										$rootScope.bankStatusA = 'warning';
										$rootScope.bankrjt = false;
										$rootScope.bankErrorNav = false;
										if ($rootScope.formData.Bank_SPStatus != response.OverallStatusList[3].SPStatus || $rootScope.formData.Bank_EBOStatus != response.OverallStatusList[3].EBOStatus) {
											$rootScope.formData.Bank_SPStatus = response.OverallStatusList[3].SPStatus;
											$rootScope.formData.Bank_EBOStatus = response.OverallStatusList[3].EBOStatus;
										}
									} else if (response.OverallStatusList[3].SPStatus == 'Y' && response.OverallStatusList[3].EBOStatus == 'A') {
										$rootScope.bankStatus = 'green';
										$rootScope.bankStatusA = 'completed';
										$rootScope.bankApporved = true;
										$rootScope.bankrjt = false;
										$rootScope.bankErrorNav = false;
										$("#ifsc_value").prop("disabled", true);
										if ($rootScope.formData.Bank_SPStatus != response.OverallStatusList[3].SPStatus || $rootScope.formData.Bank_EBOStatus != response.OverallStatusList[3].EBOStatus) {
											$rootScope.formData.Bank_SPStatus = response.OverallStatusList[3].SPStatus;
											$rootScope.formData.Bank_EBOStatus = response.OverallStatusList[3].EBOStatus;
										}
									} else if (response.OverallStatusList[3].SPStatus == 'Y' && response.OverallStatusList[3].EBOStatus == 'R') {
										$rootScope.bankStatus = 'red';
										$rootScope.bankStatusA = 'danger';
										$rootScope.bankApporved = false;
										$rootScope.bankrjt = true;
										$("#ifsc_value").prop("disabled", false);
										if ($rootScope.formData.Bank_SPStatus != response.OverallStatusList[3].SPStatus || $rootScope.formData.Bank_EBOStatus != response.OverallStatusList[3].EBOStatus) {
											$rootScope.formData.Bank_SPStatus = response.OverallStatusList[3].SPStatus;
											$rootScope.formData.Bank_EBOStatus = response.OverallStatusList[3].EBOStatus;
										}
									}

									if (response.OverallStatusList[4].SPStatus == 'N' && response.OverallStatusList[4].EBOStatus == 'N') {
										$rootScope.otherInfoStatus = '';
										$rootScope.otherrjt = false;
										$rootScope.otherErrorNav = false;
									} else if (response.OverallStatusList[4].SPStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'N') {
										$rootScope.otherInfoStatus = 'grey';
										$rootScope.otherInfoStatusA = 'warning';
										$rootScope.otherrjt = false;
										$rootScope.otherErrorNav = false;
										if ($rootScope.formData.OtherInfo_SPStatus == "N" && ($rootScope.formData.OtherInfo_SPStatus != response.OverallStatusList[4].SPStatus || $rootScope.formData.OtherInfo_EBOStatus != response.OverallStatusList[4].EBOStatus)) {
											$rootScope.formData.OtherInfo_SPStatus = response.OverallStatusList[4].SPStatus;
											$rootScope.formData.OtherInfo_EBOStatus = response.OverallStatusList[4].EBOStatus;
											$state.go('documentUpload', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[4].SPStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'Y') {
										$rootScope.otherInfoStatus = 'orange';
										$rootScope.otherInfoStatusA = 'warning';
										$rootScope.otherrjt = false;
										$rootScope.otherErrorNav = false;
										if ($rootScope.formData.OtherInfo_SPStatus != response.OverallStatusList[4].SPStatus || $rootScope.formData.OtherInfo_EBOStatus != response.OverallStatusList[4].EBOStatus) {
											$rootScope.formData.OtherInfo_SPStatus = response.OverallStatusList[4].SPStatus;
											$rootScope.formData.OtherInfo_EBOStatus = response.OverallStatusList[4].EBOStatus;
										}
									} else if (response.OverallStatusList[4].SPStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'A') {
										$rootScope.otherInfoStatus = 'green';
										$rootScope.otherInfoStatusA = 'completed';
										$rootScope.otherApporved = true;
										$rootScope.otherrjt = false;
										$rootScope.otherErrorNav = false;
										if ($rootScope.formData.OtherInfo_SPStatus != response.OverallStatusList[4].SPStatus || $rootScope.formData.OtherInfo_EBOStatus != response.OverallStatusList[4].EBOStatus) {
											$rootScope.formData.OtherInfo_SPStatus = response.OverallStatusList[4].SPStatus;
											$rootScope.formData.OtherInfo_EBOStatus = response.OverallStatusList[4].EBOStatus;
										}
									} else if (response.OverallStatusList[4].SPStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'R') {
										$rootScope.otherInfoStatus = 'red';
										$rootScope.otherInfoStatusA = 'danger';
										$rootScope.otherApporved = false;
										$rootScope.otherrjt = true;
										if ($rootScope.formData.OtherInfo_SPStatus != response.OverallStatusList[4].SPStatus || $rootScope.formData.OtherInfo_EBOStatus != response.OverallStatusList[4].EBOStatus) {
											$rootScope.formData.OtherInfo_SPStatus = response.OverallStatusList[4].SPStatus;
											$rootScope.formData.OtherInfo_EBOStatus = response.OverallStatusList[4].EBOStatus;
										}
									}

									if (response.OverallStatusList[5].SPStatus == 'N' && response.OverallStatusList[5].EBOStatus == 'N') {
										$rootScope.documentsStatus = '';
										$rootScope.proofrjt = false;
										$rootScope.docsErrorNav = false;
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'N') {
										$rootScope.documentsStatus = 'grey';
										$rootScope.documentsStatusA = 'warning';
										$rootScope.proofrjt = false;
										$rootScope.docsErrorNav = false;
										if ($rootScope.formData.Proof_SPStatus == "N" && ($rootScope.formData.Proof_SPStatus != response.OverallStatusList[5].SPStatus || $rootScope.formData.Proof_EBOStatus != response.OverallStatusList[5].EBOStatus)) {
											$rootScope.formData.Proof_SPStatus = response.OverallStatusList[5].SPStatus;
											$rootScope.formData.Proof_EBOStatus = response.OverallStatusList[5].EBOStatus;
											$state.go('thankyou', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'Y') {
										$rootScope.documentsStatus = 'orange';
										$rootScope.documentsStatusA = 'warning';
										$rootScope.proofrjt = false;
										$rootScope.docsErrorNav = false;
										if ($rootScope.formData.Proof_SPStatus != response.OverallStatusList[5].SPStatus || $rootScope.formData.Proof_EBOStatus != response.OverallStatusList[5].EBOStatus) {
											$rootScope.formData.Proof_SPStatus = response.OverallStatusList[5].SPStatus;
											$rootScope.formData.Proof_EBOStatus = response.OverallStatusList[5].EBOStatus;
										}
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'A') {
										$rootScope.documentsStatus = 'green';
										$rootScope.documentsStatusA = 'completed';
										$rootScope.proofrjt = false;
										$rootScope.docsErrorNav = false;
										$("#ncity1_value").prop("disabled", true);
										$("#gcity1_value").prop("disabled", true);
										if ($rootScope.formData.Proof_SPStatus != response.OverallStatusList[5].SPStatus || $rootScope.formData.Proof_EBOStatus != response.OverallStatusList[5].EBOStatus) {
											$rootScope.formData.Proof_SPStatus = response.OverallStatusList[5].SPStatus;
											$rootScope.formData.Proof_EBOStatus = response.OverallStatusList[5].EBOStatus;
										}
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'R') {
										$rootScope.documentsStatus = 'red';
										$rootScope.documentsStatusA = 'danger';
										$rootScope.proofrjt = true;
										$rootScope.formData.docStageRejected = true;
										$("#ncity1_value").prop("disabled", false);
										$("#gcity1_value").prop("disabled", false);
										if ($rootScope.formData.Proof_SPStatus != response.OverallStatusList[5].SPStatus || $rootScope.formData.Proof_EBOStatus != response.OverallStatusList[5].EBOStatus) {
											$rootScope.formData.Proof_SPStatus = response.OverallStatusList[5].SPStatus;
											$rootScope.formData.Proof_EBOStatus = response.OverallStatusList[5].EBOStatus;
										}
									}

									if (response.OverallStatusList[0].SPStatus == 'Y' && response.OverallStatusList[0].EBOStatus == 'R') {
										if (!$rootScope.regErrorNav) {
											$rootScope.regErrorNav = true;
											$rootScope.formData.stageOrder = 1;
											$rootScope.formData.aadharhide = false;
											$state.go('home', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[1].SPStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'R') {
										if (!$rootScope.profileErrorNav) {
											$rootScope.profileErrorNav = true;
											$rootScope.formData.stageOrder = 2;
											$rootScope.formData.aadharhide = false;
											$rootScope.formData.aadharSection = true;
											$(".select").prop("disabled", true);
											if (response.OverallStatusList[1].KRAClient == 'Y' && $rootScope.formData.isg) {
												$state.go('personalDetails', {
													mobile: $rootScope.formData.EncMobile
												});

											} else {
												$state.go('address', {
													mobile: $rootScope.formData.EncMobile
												});
											}
										}
									} else if (response.OverallStatusList[2].SPStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'R') {
										if (!$rootScope.productsErrorNav) {
											$rootScope.productsErrorNav = true;
											$rootScope.formData.stageOrder = 3;
											$rootScope.formData.aadharhide = true;
											$state.go('products', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[3].SPStatus == 'Y' && response.OverallStatusList[3].EBOStatus == 'R') {
										if (!$rootScope.bankErrorNav) {
											$rootScope.bankErrorNav = true;
											$rootScope.formData.stageOrder = 4;
											$rootScope.formData.aadharhide = true;
											$state.go('bank', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[4].SPStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'R') {
										if (!$rootScope.otherErrorNav) {
											$rootScope.otherErrorNav = true;
											$rootScope.formData.stageOrder = 5;
											$rootScope.formData.aadharhide = true;
											$state.go('personalDetails', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'R') {
										if (!$rootScope.docsErrorNav) {
											$rootScope.docsErrorNav = true;
											$rootScope.formData.stageOrder = 6;
											$rootScope.formData.aadharhide = true;
											$rootScope.formData.docStageRejected = true;
											$state.go('documentUpload', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									}
									//All stages accepted
									else if ((response.OverallStatusList[0].EBOStatus == 'A' && response.OverallStatusList[1].EBOStatus == 'A' && response.OverallStatusList[2].EBOStatus == 'A' &&
											response.OverallStatusList[3].EBOStatus == 'A' && response.OverallStatusList[4].EBOStatus == 'A' && response.OverallStatusList[5].EBOStatus == 'A' &&
											response.OverallStatusList[6].EBOStatus == 'N') || (
											response.OverallStatusList[0].EBOStatus == 'Y' && response.OverallStatusList[1].EBOStatus == 'Y' && response.OverallStatusList[2].EBOStatus == 'Y' &&
											response.OverallStatusList[3].EBOStatus == 'Y' && response.OverallStatusList[4].EBOStatus == 'Y' && response.OverallStatusList[5].EBOStatus == 'Y')) {
										$rootScope.firstCompleted = true;
										$rootScope.secondCompleted = true;
										$rootScope.thirdCompleted = true;
										$rootScope.fourthCompleted = true;
										$rootScope.fifthCompleted = true;
										$rootScope.sixthCompleted = true;
										$rootScope.seventhCompleted = true;
										$rootScope.eightCarousel = true;
										$rootScope.stageComepleted = true;
										// $state.go('thankyou');

									}
									//Enable Activation Done button -- Activation Page (After Sent BO)
									else if (response.OverallStatusList[0].EBOStatus == 'A' && response.OverallStatusList[1].EBOStatus == 'A' && response.OverallStatusList[2].EBOStatus == 'A' &&
										response.OverallStatusList[3].EBOStatus == 'A' && response.OverallStatusList[4].EBOStatus == 'A' && response.OverallStatusList[5].EBOStatus == 'A' &&
										response.OverallStatusList[6].EBOStatus == 'S') {
										$rootScope.activation = true;
										$rootScope.regApproved = true;
										$rootScope.profileApproved = true;
										$rootScope.formData.productApproved = true;
										$rootScope.bankApproved = true;
										$rootScope.otherApporved = true;
										$rootScope.documentApproved = true;
										$rootScope.firstCompleted = true;
										$rootScope.secondCompleted = true;
										$rootScope.thirdCompleted = true;
										$rootScope.fourthCompleted = true;
										$rootScope.fifthCompleted = true;
										$rootScope.sixthCompleted = true;
										$rootScope.seventhCompleted = true;
										$rootScope.eightCarousel = true;
										$rootScope.activationDone = true;
									}

									// display Esign and IPV button in Document Upload Based on Condition
									if (response.OverallStatusList[5].SPStatus != 'Y') {
										$rootScope.formData.displayNonKraIpvButton = false;
										if (response.OverallStatusList[0].KRAClient != 'Y' || response.OverallStatusList[0].KRAUpdate != 'N') {
											$rootScope.formData.displayNonKraIpvButton = true;
										} else {
											$rootScope.formData.displayNonKraIpvButton = false;
										}
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus != 'Y') {
										$rootScope.formData.displayNonKraIpvButton = true;
										$rootScope.nonKraIPVCompleteStatus = false;
									} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[9].SPStatus != 'Y') {
										$rootScope.formData.displayNonKraIpvButton = false;
										$rootScope.nonKraIPVCompleteStatus = true;
									}
								}
							}

						}
					})
				}
			}

			$interval(function () {
				$rootScope.overallStatus();

			}, 180000);

			$rootScope.formData.doLater = function () {
				var url = 'SendSmsDoit';
				var sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					Stagename: $rootScope.formData.stageOrder
				}
				serverService.apiCall(url, sendData);

			}

			$rootScope.mobileAssistance = function () {
				$rootScope.formData.assistatnce = true;
			}

		}
	]);
angular.module('filters-module', [])
.filter('trustAsResourceUrl', ['$sce', function ($sce) {
			return function (val) {
				return $sce.trustAsResourceUrl(val);
			};
		}
	]);
mainChatApp.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/index.html', '/register');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'app/register/index.html',
		controller: 'registerController'
	})
	.state('register', {
		url: '/register',
		templateUrl: 'app/register/index.html',
		controller: 'registerController'
	})
	.state('address', {
		url: '/address?mobile',
		templateUrl: 'app/address/index.html',
		controller: 'addressController'
	})
	.state('personalDetails', {
		url: '/personalDetails?mobile',
		templateUrl: 'app/personalDetails/index.html',
		controller: 'personalController'
	})
	.state('products', {
		url: '/products?mobile',
		templateUrl: 'app/products/index.html',
		controller: 'productsController'
	})
	.state('bank', {
		url: '/bank?mobile',
		templateUrl: 'app/bank/index.html',
		controller: 'bankController'
	})
	.state('documentUpload', {
		url: '/documentUpload?mobile',
		templateUrl: 'app/documentUpload/index.html',
		controller: 'documentController'
	})
	.state('docUpload', {
		url: '/docUpload?mobile',
		templateUrl: 'app/docUpload/index.html',
		controller: 'docController'
	})
	.state('rmPage', {
		url: '/rmPage?mobile',
		templateUrl: 'app/rmPage/index.html',
		controller: 'rmPageController'
	})
	.state('rmlist', {
		url: '/rmList?mobile',
		templateUrl: 'app/rmList/index.html',
		controller: 'rmController'
	})
	.state('genLink', {
		url: '/genLink?mobile',
		templateUrl: 'app/genLink/index.html',
		controller: 'genLinkController'
	})
	.state('pod', {
		url: '/pod?mobile',
		templateUrl: 'app/pod/index.html',
		controller: 'podController'
	})
	.state('transfer', {
		url: '/transfer?mobile',
		templateUrl: 'app/transfer/index.html',
		controller: 'transferController'
	})
	.state('complete', {
		url: '/complete?mobile',
		templateUrl: 'app/complete/index.html',
		controller: 'completeController'
	})
	.state('IPO', {
		url: '/IPO',
		templateUrl: 'app/IPO/index.html',
		controller: 'ipoController'
	})
	.state('karvy', {
		url: '/Karvy',
		templateUrl: 'app/Karvy/index.html',
		controller: 'karvySetupfreedemataccountController'
	})
	.state('closure', {
		url: '/closure',
		templateUrl: 'app/closure/index.html',
		controller: 'closureController'
	})
	.state('closureotp', {
		url: '/closureotp',
		templateUrl: 'app/closureotp/index.html',
		controller: 'closureotpController'
	})
	.state('closurethankyou', {
		url: '/closurethankyou',
		templateUrl: 'app/closurethankyou/index.html',
		controller: 'closurethankyouController'
	})
	.state('thankyou', {
		url: '/thankyou',
		templateUrl: 'app/thankyou/index.html',
		controller: 'karvythankyoupageController'
	})
	.state('verify', {
		url: '/verify',
		templateUrl: 'app/verify/index.html',
		controller: 'verifyController'
	})

	$urlRouterProvider.otherwise('/register');
});

mainChatApp.controller('chatappController', ['$scope', '$rootScope', '$state', 'serverService', '$location', '$window', function ($scope, $rootScope, $state, serverService, $location, $window) {
			$rootScope.formData.stageInfo = '1a';
			$scope.getRange = function (start, count) { /** Range Generate ***/
				return Array.apply(0, Array(count))
				.map(function (element, index) {
					return index + start;
				});
			}
			$rootScope.formData.years = $scope.getRange((new Date().getFullYear() - 70), 53).reverse();

			$rootScope.formData.nyears = $scope.getRange((new Date().getFullYear() - 100), 101).reverse();

			$rootScope.mobileNumberValidation = function (number) {

				// var re = /^(?![6]{10}|[7]{10}|[8]{10}|[9]{10})[6-9]{1}[0-9]{9}$/;
				//   var re = /^(?![7]{10}|[8]{10}|[9]{10})[7-9]{1}[0-9]{9}$/;
				var re = /^(?![6]{10}|[7]{10}|[8]{10}|[9]{10})[6-9]{1}[0-9]{9}$/;
				return re.test(number);
			}
			if (!$rootScope.formData.fields.mobile && Mobile) {
				if ($rootScope.mobileNumberValidation(Mobile)) {
					$rootScope.formData.fields.mobile = Mobile;
				}
			}
			/**** DOB Age Validation ****/
			$rootScope.DobValidation = function (dob) {
				var regEx = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
				return regEx.test(dob);
			}
			$rootScope.UpdateTempPersistenceResume = function () {
				var s_url = "WBTempPersistenceResume";
				var rk = null;
				if (!$rootScope.formData.fields.mobile) {
					$rootScope.formData.fields.mobile = Mobile;
				}

				if (!$rootScope.formData.fields.email) {
					$rootScope.formData.fields.email = Email;
				}
				if ($rootScope.formData.ReferKey != null && $rootScope.formData.ReferKey != undefined) {
					rk = $rootScope.formData.ReferKey;
				}

				if (utm_campaign && utm_medium) {
					if (utm_campaign.includes('quantifi')) {
						utm_medium = utm_medium + '_169';
					}
					if (utm_campaign.includes('bmedia')) {
						utm_medium = utm_medium + '_5f9f9175babe7122ec1ed7c2';
					}
					if (utm_campaign.includes('opicle')) {
						utm_medium = utm_medium + '_1216';
					}
					if (utm_campaign.includes('dangleads')) {
						utm_medium = utm_medium + '_150';
					}
					if (utm_campaign.includes('admitad')) {
						utm_medium = utm_medium + '_7979c9f6e6';
					}
					if (utm_campaign.includes('ad2click')) {
						utm_medium = utm_medium + '_5faa3718f2916f236b2d5018';
					}
					if (utm_campaign.includes('mrndigital')) {
						utm_medium = utm_medium + '_5faa3f0aa1f49053265c5bb9';
					}
					if (utm_campaign.includes('seventynine')) {
						utm_medium = utm_medium + '_71976';
					}
					if (utm_campaign.includes('adsclues')) {
						utm_medium = utm_medium + '_2182';
					}
					if (utm_campaign.includes('iqweb')) {
						utm_medium = utm_medium + '_1728';
					}
					if (utm_campaign.includes('optimedia')) {
						utm_medium = utm_medium + '_1894';
					}
				}

				var sendData = {
					NewDIYMode: mode,
					EmailID: $rootScope.formData.fields.email,
					Mode: '',
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					ReturnURL: '',
					SourceURL: '',
					ActionName: '',
					ReturnText: '',
					Utm_Source: utm_source,
					utm_Medium: utm_medium,
					Utm_Term: utm_term,
					Utm_Creative: utm_creative,
					Utm_Campaign: utm_campaign,
					Utm_Adgroup: utm_adgroup,
					Utm_Placement: utm_placement,
					Utm_Device: utm_device,
					Utm_Content: utm_content,
					CTA: CTA,
					GCLID: GCLID,
					MobileNumber: $rootScope.formData.fields.mobile,
					LandingPage: '',
					ReferralCode: $rootScope.formData.referralCode,
					EmployeeCode: '',
					CouponCode: '',
					DeviceType: '',
					GeoLatitude: $rootScope.formData.latitude,
					GeoLongitude: $rootScope.formData.longitude,
					RK: rk,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				};

				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					if (response.EncryptToken) {
						$rootScope.EncryptToken = response.EncryptToken;
						sessionStorage.setItem('AxToken', response.EncryptToken);
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
						$rootScope.formData.ReferKey = response.RK;
						sessionStorage.setItem("ReferKey", response.RK);
					}
				}, function (e) {
					$('#connection').modal('show');
				});
			}

			/*$(document).on('click', '.help-notification', function () {
			$('#helpNotification').modal('show');
			});*/
			$rootScope.getHelp = function () {
				var parentElement = angular.element(document.querySelector('.help-body'));
				var tobeClonedElement = angular.element(document.querySelector('.guideline-with-bg'));
				parentElement.html(tobeClonedElement.clone());
				$('#helpNotification').modal('show');
			}

			$rootScope.NonKRAVerifiedPopup = function (content, status, url) {
				if (status === 'hide') {
					$('#' + content).modal('hide');
				} else {
					$('#' + content).modal('show');
					$rootScope.formData.aadharZipFileName = '';
					$rootScope.formData.fields.secureCode = '';
				}
				if (url != null && url != '') {
					window.open(url, '_blank');
				}
				if (content === 'NonKRAVerified' && status === 'hide') {
					if ($rootScope.formData.CKYC && $rootScope.formData.KRA) {
						$state.go('address', {
							mobile: $rootScope.formData.EncMobile
						});
					} else {
						if ($rootScope.aadhaarModule) {
							$rootScope.formData.aadhaarProcess = true;
							$rootScope.getAadhaar();
						} else {
							$state.go('address', {
								mobile: $rootScope.formData.EncMobile
							});
						}
					}
					/*$state.go('address', {
					mobile: $rootScope.formData.EncMobile
					});*/
				}
			}
			// $rootScope.getBase64 = function (file) {
			//     return new Promise((resolve, reject) => {
			//         const reader = new FileReader();
			//         reader.readAsDataURL(file);
			//         reader.onload = () => resolve(reader.result);
			//         reader.onerror = error => reject(error);
			//     });
			// }

			$rootScope.formData.aadharZipFileName = "Choose File..";
			$rootScope.uploadNonKRAAadharZipFile = function (myFile) {
				var FileSize = myFile.files[0].size / 1024 / 1024;
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(myFile.files[0].name)[1];
				$rootScope.formData.aadharFileExt = ext;
				$rootScope.formData.aadharZipFileName = myFile.files[0].name;
				aadharOfflineFile = myFile.files[0];
				// $rootScope.getBase64(aadharOfflineFile).then(function (data) {
				//     var base64result = data.split(',')[1];
				//     $rootScope.formData.AadharBase64 = base64result;
				// });

				var reader = new FileReader();
				reader.readAsDataURL(aadharOfflineFile);
				reader.onload = function (readerEvt) {
					var binaryString = readerEvt.target.result;
					var base64result = binaryString.split(',')[1];
					$rootScope.formData.AadharBase64 = base64result;
				};
				$scope.$apply();
			}

			$rootScope.closeExistingModal = function () {
				$('#existingCustomer-popup').modal('hide');
				$('#call-popup').modal('hide');
				$('#verifyemail').modal('hide');

				$rootScope.emptyhMobile = false;
				$rootScope.invalidhMobile = false;
				$rootScope.existingCustomer = false;
				$rootScope.invalidCustomer = false;
				$rootScope.existingResponse = false;
				$rootScope.cutomerFailure = false;
				$rootScope.formData.fields.panMobile = '';
				$rootScope.existingStatus = '';
				$rootScope.existingRef = '';
			}

			$rootScope.DropdownLoad = function () {
				var url = "DIYGetDocumentTypeDropDownList";
				serverService.getApi(url).then(function success(a) {
					var response = a.data;
					if (response.DocumentTypeList) {
						for (var n = 0; n < response.DocumentTypeList.length; n++) {
							if (response.DocumentTypeList[n].DocumentCategory == "A") {
								$rootScope.formData.addressTypeList.push(response.DocumentTypeList[n]);
							}
							if (response.DocumentTypeList[n].DocumentCategory == "C") {
								$rootScope.formData.corressDocList.push(response.DocumentTypeList[n]);
							}
							if (response.DocumentTypeList[n].DocumentCategory == "P") {
								$rootScope.formData.pDocList.push(response.DocumentTypeList[n]);
							}
							if (response.DocumentTypeList[n].DocumentCategory == "I") {
								$rootScope.formData.foDocumentTypeList.push(response.DocumentTypeList[n]);
							}
							if (response.DocumentTypeList[n].DocumentCategory == "Z") {
								$rootScope.formData.newDocumentTypeList.push(response.DocumentTypeList[n]);
							}
							if (response.DocumentTypeList[n].DocumentCategory == "G") {
								$rootScope.formData.newNomineeTypeList.push(response.DocumentTypeList[n]);
							}
						}
					}
				});

				var s_url = "DIYGetProfileInfoDropDownList";

				serverService.getApi(s_url).then(function (a) {
					var response = a.data;
					if (response.StateList) {
						for (var j = 0; j < response.StateList.length; j++) {
							$rootScope.formData.state.push(response.StateList[j]);
						}
					}

					if (response.OccupationDetailsList) {
						for (var i = 0; i < response.OccupationDetailsList.length; i++) {
							$rootScope.formData.OccupationDetailsList.push(response.OccupationDetailsList[i]);
						}
					}

					if (response.Education) {
						for (var k = 0; k < response.Education.length; k++) {
							$rootScope.formData.educationList.push(response.Education[k]);
						}
					}
					if (response.SourceOfFund) {
						for (var z = 0; z < response.SourceOfFund.length; z++) {
							$rootScope.formData.sFunds.push(response.SourceOfFund[z]);
						}
					}
					if (response.IncomeRange) {
						$rootScope.formData.incomeID = response.IncomeRange[0].IncomeRangeId;
						$rootScope.formData.incomeName = response.IncomeRange[0].Name;
						$rootScope.formData.incomeLength = response.IncomeRange.length;
						for (var y = 0; y < response.IncomeRange.length; y++) {
							$rootScope.formData.incomeRange.push(response.IncomeRange[y]);
						}
						/*  for (var y = 1; y < response.IncomeRange.length; y++){
						$rootScope.formData.incomeID = $rootScope.formData.incomeID + "," + (response.IncomeRange[y].IncomeRangeId);
						$rootScope.formData.incomeName = $rootScope.formData.incomeName + "," + (response.IncomeRange[y].Name);
						}*/

					}
				});

				var surl = "GetCountryMasterAll";
				serverService.getApi(surl).then(function (a) {
					var response = a.data;
					for (var i = 0; i < response.length; i++) {
						$rootScope.formData.countryList.push(response[i]);
					}
				});

			}
			$rootScope.DropdownLoad();
			$rootScope.getDataError = 0;
			if (sessionStorage.getItem('getDataError') != null) {
				$rootScope.getDataError = sessionStorage.getItem('getDataError');
			};
			$rootScope.getDataList = function () {
				var dateArray = [$("#panyear").val(), $("#month1").val(), $("#date1").val()];
				var userDob = (dateArray.join('-'));
				var url = "ClientDetails/GetClientdetailsByClientCodePan";
				var sendData = {
					"ClientCode": "",
					"PanNumber": $rootScope.formData.fields.panNumber,
					"DOB": userDob
				};

				$('.loader-info.paninfo').css('display', 'block');
				$rootScope.formData.getDataApi = true;

				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.getDataApi = false;
					$('.loader-info.paninfo').css('display', 'none');
					if (response.IsSuccess) {
						if (response.ClientDetails.ReferenceNumber) {
							if (response.ClientDetails.ReferenceNumber.search("WB") != -1) {
								$rootScope.formData.ReferenceNumber = response.ClientDetails.ReferenceNumber;
								sessionStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);

								var s_url = "DIYGetRegistrationInfoByReferenceNumber";

								var sendData = {
									ReferenceNumber: $rootScope.formData.ReferenceNumber
								};

								serverService.apiCall(s_url, sendData).then(function (a) {
									var response = a.data;
									if (response.IsSuccess) {
										$rootScope.formData.fields.panNumber = response.ObjCDIYClientProfile.PanNumber;
										$rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
										$rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
										sessionStorage.setItem("RxEmail", $rootScope.formData.fields.email);
										sessionStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);

										var dob = response.ObjCDIYClientProfile.DOB.split("/");
										$rootScope.formData.fields.date = dob[0];
										$rootScope.formData.fields.month = dob[1];
										$rootScope.formData.fields.year = dob[2];
										setTimeout(function () {
											$('#day').val(dob[0]);
											$('#month').val(dob[1]);
											$('#year').val(dob[2]);
											$("select").select2();
										}, 1000)
									}
								});

								$('#continueapp').modal('hide');
								$rootScope.UpdateTempPersistenceResume();
								$rootScope.getDIYStatus();
							} else {
								$rootScope.formData.otherMode = true;
								$('#continueapp').modal('hide');
								$('#paninformation').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.formData.panStatus = 'Your account is under process in another mode';
							}
						}
					} else {
						$rootScope.getDataError++;
						sessionStorage.setItem('getDataError', $rootScope.getDataError);
						if ($rootScope.getDataError > 3) {
							$rootScope.getDataMsg = "Forgot your details? Call us to retrieve your details";
						} else {
							$rootScope.getDataMsg = response.ErrorMessage;
						}
						$('#continueapp').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.getDataFail = true;
						$state.go('register', {
							mobile: $rootScope.formData.EncMobile
						});
					}
				})

			}

			$rootScope.openThankyouPage = function () {

				$rootScope.formData.apiLoading = true;
				var url = 'GenerateUnsignedPDF?ReferenceNumber=' + sessionStorage.getItem('RxReferenceNumber');
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					$state.go('complete', {
						mobile: $rootScope.formData.EncMobile
					});
				});
			}

			$rootScope.getData = function () {
				var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
				var pan_cfilter = /[a-z]{3}[c][a-z]{1}\d{4}[a-z]/i;
				$rootScope.formData.cpanError = false;
				if (!angular.isUndefined($rootScope.formData.fields.panNumber) && $rootScope.formData.fields.panNumber != '' && $rootScope.formData.fields.panNumber != null) {

					if ((pan_cfilter.test($rootScope.formData.fields.panNumber))) {
						$rootScope.formData.cpanCoVaild = true;
						$rootScope.formData.cpanInValid = false;
						$rootScope.formData.cpanFocus = true;
					} else if ((pan_filter.test($rootScope.formData.fields.panNumber))) {
						$rootScope.formData.cpanInValid = false;
						if ($("#panyear").val() && $("#month1").val() && $("#date1").val()) {
							$rootScope.formData.dobError = false;

							$rootScope.getDataList();
						} else {
							$rootScope.formData.dobError = true;
						}
					} else {
						$rootScope.formData.cpanInValid = true;
					}
				} else {
					$rootScope.formData.cpanError = true;
					$rootScope.formData.cpanInValid = false;
				}
			}
			/*$(window).scroll(function () {
			if ($(this).scrollTop() < 100) {
			$('#backtotop').fadeOut();
			} else {
			$('#backtotop').fadeIn();
			}
			});
			$('#backtotop').on('click', function () {
			$('html, body').animate({
			scrollTop: 0
			}, 1000);
			return false;
			});*/

			$rootScope.firstSection = function () {
				$rootScope.getAPI = false;
				$rootScope.pan = true;
				if ($rootScope.webkarvy && $rootScope.karvyData) {
					$rootScope.pan = false;
					$rootScope.proceeddetailsshow = true;
				}
				if ($rootScope.webIpo && $rootScope.ipoCustomerData) {
					$rootScope.pan = false;
					$rootScope.ipoproceeddetailsshow = true;
				}
				$rootScope.emailMobile = false;
				$rootScope.formData.stageInfo = '1a';
				$state.go('register', {
					mobile: $rootScope.formData.EncMobile
				});
			}

			$rootScope.secondSection = function () {
				if ($rootScope.firstCompleted && !$rootScope.formData.applicationDisabled) {
					$rootScope.getAPI = false;
					$state.go('address', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			}

			$rootScope.thirdSection = function () {
				if ($rootScope.secondCompleted && !$rootScope.formData.applicationDisabled) {
					$rootScope.getAPI = false;
					$rootScope.formData.stageInfo = '3';
					$state.go('personalDetails', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			}

			$rootScope.fourthSection = function () {
				if ($rootScope.thirdCompleted && !$rootScope.formData.applicationDisabled) {
					$rootScope.getAPI = false;
					$rootScope.formData.stageInfo = '4';
					$state.go('bank', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			}

			$rootScope.fifthSection = function () {
				if ($rootScope.fourthCompleted && !$rootScope.formData.applicationDisabled) {
					$rootScope.getAPI = false;
					$rootScope.formData.stageInfo = '5';
					$state.go('products', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			}

			$rootScope.sixthSection = function () {
				if ($rootScope.fifthCompleted && !$rootScope.formData.applicationDisabled) {
					$rootScope.getAPI = false;
					$rootScope.formData.stageInfo = '6';
					$state.go('documentUpload', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			}
			$rootScope.seventhSection = function () {
				if ($rootScope.formData.docStageCompleted) {

					var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + $rootScope.formData.ReferenceNumber + '&Esign=NSDL';
					$rootScope.formData.apiLoading = true;

					serverService.getApi(e_url).then(function (a) {
						var data = a.data;
						$rootScope.formData.apiLoading = false;
						if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
							//window.location.assign(response.eSignApiUrl);
							frmMain.action = data.eSignApiUrl;
							$('#msg').val(data.requestXml);
							document.getElementById("frmMain").submit();
						} else if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
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

			}
			$rootScope.clearErrData = function () {
				$rootScope.formData.cpanCoVaild = false;
				$rootScope.formData.cpanInValid = false;
				$rootScope.formData.cpanError = false;
			}
			$rootScope.fillData = function () {
				$rootScope.getDataFail = false;

				$rootScope.formData.cpanCoVaild = false;
				$rootScope.formData.cpanInValid = false;
				$rootScope.formData.cpanError = false;

				$('#date1').val($('#day').val());
				$('#month1').val($('#month').val());
				$('#year1').val($rootScope.formData.fields.year);
				setTimeout(function () {
					$("select").select2();
				}, 100)
			}
			$rootScope.otpopblur = function () {
				setTimeout(function () {
					$('#mobileOtp').focus();
				}, 100)
			}

			$rootScope.backToRegister = function () {
				$rootScope.pan = true;
				$rootScope.emailMobile = false;
				$state.go('register', {
					mobile: $rootScope.formData.EncMobile
				});
			}

			$rootScope.backToProfilea = function () {
				$rootScope.getAPI = false;
				$state.go('address', {
					mobile: $rootScope.formData.EncMobile
				});
			}

			$rootScope.preferences = function () {
				$('#AxisPreferences').modal({
					backdrop: 'static',
					keyboard: false
				});
			}

			$rootScope.getRejectedResponse = function () {
				$rootScope.rejectedUser = true;
				var url = "GetRejectionRemarks";
				var sendData = {
					ReferenceNumber: $rootScope.existingRef
				};
				$rootScope.rejectedStatus = "<span class='ax-bold-title'>We have identified discrepancy in your application. To resolve the discrepancy click on proceed.</span> <br><br>";
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.existingStatus = $rootScope.rejectedStatus + response.SuccessMessage;
					}
				});
			}

			$rootScope.panMobile = function () {
				$rootScope.formData.invalidhMobile = false;
				$rootScope.rejectedUser = false;
				$rootScope.accountActivated = false;
				$rootScope.cutomerFailure = false;
				var error = 0;
				var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
				if ($rootScope.formData.fields.panMobile == null || $rootScope.formData.fields.panMobile == '') {
					$rootScope.formData.emptyhMobile = true;
					error++;
				} else if (($rootScope.formData.fields.panMobile).length != 10 || ($rootScope.mobileNumberValidation($rootScope.formData.fields.panMobile) == false && pan_filter.test($rootScope.formData.fields.panMobile) == false)) {
					$rootScope.formData.invalidhMobile = true;
					error++;
				}

				if (error == 0) {
					if ($rootScope.formData.RMModule) {
						var url = "GetRefNoByPANMobileForRM"
							if ($rootScope.mobileNumberValidation($rootScope.formData.fields.panMobile)) {
								var sendData = {
									RMEmployeeCode: $rootScope.formData.fields.rmcode,
									PanNumber: "",
									PhoneNo: $rootScope.formData.fields.panMobile
								}
							} else {
								var sendData = {
									RMEmployeeCode: $rootScope.formData.fields.rmcode,
									PanNumber: $rootScope.formData.fields.panMobile,
									PhoneNo: ""
								}
							}
					} else {
						var url = "GetRefNoByPANMobileEnc";
						if ($rootScope.mobileNumberValidation($rootScope.formData.fields.panMobile)) {
							var sendData = {
								PANNumber: "",
								PhoneNo: $rootScope.formData.fields.panMobile
							}
						} else {
							var sendData = {
								PANNumber: $rootScope.formData.fields.panMobile,
								PhoneNo: ""
							}
						}
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.accountStatus = response.AccountStatus;

						if (!response.IsSuccess || response.AccountStatus == 'purged by scheduller') {
							$rootScope.existingCustomer = false;
							$rootScope.cutomerFailure = true;
							var errorMsgType = response.FailureMessage.includes("Securities");
							var errorType = response.FailureMessage.includes("connect us on 022-40508080");
							if (errorMsgType === true) {
								$rootScope.invalidCustomer = false;
								if (response.Barcodenumber != "" && response.Barcodenumber != null) {
									$rootScope.barcodenumber = "";
								}
								if (response.ApplicantName != "" && response.ApplicantName != null) {
									$rootScope.applicantName = "";
								}
								if (response.FailureMessage != "" && response.FailureMessage != null) {
									$rootScope.failureMessage = response.FailureMessage;
								}
								if (response.TLEmail == "" || response.TLEmail == null && response.TLMobile == "" || response.TLMobile == null && response.TLName == "" || response.TLName == null) {
									$rootScope.TLname = "<span class='text-dark'>Get help : </span><span style='color=#AE275F'>022-40508080</span>";
								}
							} else {
								if (response.FailureMessage != "" && response.FailureMessage != null) {
									if (response.Barcodenumber != "" && response.Barcodenumber != null) {
										$rootScope.barcodenumber = response.Barcodenumber;
									}
									if (response.ApplicantName != "" && response.ApplicantName != null) {
										$rootScope.applicantName = response.ApplicantName;
									}
									if (errorType != true) {
										$rootScope.invalidCustomer = true;
										if (response.FailureMessage != "" && response.FailureMessage != null) {
											$rootScope.failureMessage = response.FailureMessage;
										}
									} else if (errorType === true) {
										$rootScope.invalidCustomer = false;
										if (response.FailureMessage != "" && response.FailureMessage != null) {
											$rootScope.failureMessage = response.FailureMessage;
										}
									}
									if (response.TLEmail != "" && response.TLEmail != null) {
										$rootScope.TLemail = "<span class='text-dark'>Write to us : </span>" + response.TLEmail;
									}
									if (response.TLMobile == "" || response.TLMobile == null) {
										$rootScope.TLname = "<span class='text-dark'>Get help : </span>" + response.TLName;
									}
									if (response.TLMobile != "" && response.TLMobile != null) {
										$rootScope.TLname = "<span class='text-dark'>Get help : </span>" + response.TLName + " , " + response.TLMobile;
									}
									if (response.TLEmail == "" || response.TLEmail == null && response.TLMobile == "" || response.TLMobile == null && response.TLName == "" || response.TLName == null) {
										$rootScope.TLname = "<span class='text-dark'>Get help : </span><span style='color=#AE275F'>022-40508080</span>";
									}
									setTimeout(function () {
										$(".txt-hlt:contains('on hold')").html(function (_, html) {
											return html.replace(/(On Hold:)/g, '<span class="txt-highlight">$1</span>')
										});
										$(".txt-hlt:contains('under process.')").html(function (_, html) {
											return html.replace(/(under process)/g, '<span class="txt-highlight">$1</span>')
										});
										$(".txt-hlt:contains('Account is opened.')").html(function (_, html) {
											return html.replace(/(Account is opened.)/g, '<span class="txt-highlight">$1</span>')
										});
										$(".txt-hlt:contains('022-40508080')").html(function (_, html) {
											return html.replace(/(022-40508080)/g, '<span class="text-nowrap">$1</span>')
										});
									}, 150);
								} else if (response.SuccessMessage == "" && response.SuccessMessage == null && response.FailureMessage == "" && response.FailureMessage == null) {
									response.FailureMessage = "We are unable to find details matching to the information provided to us. For more details you can connect us on 022-40508080"
								}
							}

						} else if (response.IsSuccess) {
							$scope.purgingStatus = false;
							$rootScope.Extmobile = response.Mobile;
							$rootScope.Extemail = response.Email;
							$rootScope.existingRef = response.ReferenceNumber;
							$rootScope.existingeRefNumber = response.EncReferenceNumber;
							$rootScope.existingResponse = true;
							$rootScope.getExtOTP();

						}
					}, function (e) {
						$('#connection').modal('show');
					});
				}
			}

			$rootScope.getExtOTP = function () {
				//$rootScope.otpResend = true;
				//$rootScope.formData.ExtenableResendButton = false;
				//$rootScope.extresendCounter();
				//$rootScope.showextotpStatus = true;
			}

			$rootScope.validateExtOTP = function () {
				$rootScope.showextotpStatus = false;
				if ($rootScope.formData.fields.ExtOTP) {
					if ($rootScope.formData.RMModule) {
						var url = "OTPValidationnew";
						var sendData = {
							//	'OtpCode': $rootScope.formData.fields.otpMobile,
							'Mobile': $rootScope.Extmobile,
							'Email': $rootScope.Extemail,
							"MobileOtpCode": $rootScope.formData.fields.ExtOTP,
							"EmailOtpCode": '',
							"MobileFlag": true,
							"EmailFlag": false,
							"IsDiy": true,
							"EncryptToken": $rootScope.EncryptToken,
							"ReferenceNumber": $rootScope.existingRef
						}
					} else {
						var url = "OTPValidationnewEnc";
						var sendData = {
							//	'OtpCode': $rootScope.formData.fields.otpMobile,
							'Mobile': $rootScope.Extmobile,
							'Email': $rootScope.Extemail,
							"MobileOtpCode": $rootScope.formData.fields.ExtOTP,
							"EmailOtpCode": '',
							"MobileFlag": true,
							"EmailFlag": false,
							"IsDiy": true,
							// "EncryptToken": $rootScope.EncryptToken,
							// "ReferenceNumber": $rootScope.existingRef
						}
					}
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
						}
						if (response.IsSuccess) {
							if ($rootScope.formData.RMModule) {
								sessionStorage.setItem('AxRM', true)
							}
							$rootScope.existingeRefNumber = response.EncReferenceNumber;
							$rootScope.invalidCustomer = false;
							$rootScope.existingCustomer = true;
							//$rootScope.existingResponse = true;
							//$rootScope.existingRef = response.ReferenceNumber;
							var stsResponse = ['Suspended', 'ActivationInProgress', 'InstantActivation', 'Activation', 'FullyActivation', 'AgentApprovedPartially', 'AgentApproved', 'FullActivation'];
							if (stsResponse.indexOf($rootScope.formData.accountStatus) == -1) {
								$rootScope.existingRedirect = true;
								//$rootScope.existingStatus = response.AccountStatus;

								$rootScope.existingeRefNumber = response.EncReferenceNumber;
								var encryptURL = "GetDecryptURL";
								var sendDataURL = {
									DecryptURL: $rootScope.existingeRefNumber
								};
								serverService.apiCall(encryptURL, sendDataURL).then(function (decRes) {
									var decryptResponse = decRes.data;
									$rootScope.formData.referralCode = '';
									if (decryptResponse.IsSuccess) {

										if (decryptResponse.BankShortName) {
											utm_bank = decryptResponse.BankShortName;
											$rootScope.getBankLogo();
										} else {
											$rootScope.bgImgDesktop = '';
											$rootScope.bgImgMobile = '';
											$rootScope.bgImg = '';
										}
										$rootScope.Extmobile = decryptResponse.Mobile;
										$rootScope.Extemail = decryptResponse.Email;
										$rootScope.ExtDOB = decryptResponse.DOB;
										$rootScope.ExtpanNumber = decryptResponse.PANNumber;
										$rootScope.ExistingclientName = decryptResponse.ClientName;
										$rootScope.existingRef = decryptResponse.ReferenceNumber;

										var fullname = $rootScope.ExistingclientName.split(' ');
										$rootScope.formData.fields.firstName = fullname[0];
										if (decryptResponse.IsKRA == 'Y') {
											$rootScope.formData.KRA = true;
											$rootScope.formData.IsKRAUpdate = 'N';
											sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
										}

										if (decryptResponse.IsKRAEdit == 'Y') {
											$rootScope.formData.IsKRAUpdate = 'Y';
											$rootScope.formData.changeKRA = true;
											sessionStorage.setItem('IsKRAUpdate', 'Y');
											sessionStorage.setItem('IsKRA', true);
										}

										if (fullname.length >= 3) {
											$rootScope.formData.fields.middleName = fullname[1];
											var nameArray = [];
											for (var i = 2; i < fullname.length; i++) {
												nameArray.push(fullname[i]);
											}
											$rootScope.formData.fields.lastName = nameArray.join(" ");
										} else {
											$rootScope.formData.fields.lastName = fullname[1];
										}

										if (decryptResponse.Mode == 'I') {
											$rootScope.webfinacle = true;
											$rootScope.formData.fields.panNumber = decryptResponse.PANNumber;
											//$rootScope.getIBInfo(decryptResponse.PANNumber);
											if ($rootScope.webfinacle && $rootScope.formData.CKYC && $rootScope.formData.KRA) {
												$rootScope.ibDocumentHide = true
											}

											if ($rootScope.webfinacle && $rootScope.formData.CKYC && !$rootScope.formData.KRA) {
												$rootScope.ibDocumentHide = true
													$rootScope.ibCkycDocumentShow = true
											}
										} else if (decryptResponse.Mode == 'J' && decryptResponse.PanNumberAes128Enc) {
											panNumber = decryptResponse.PanNumberAes128Enc;
											$rootScope.getJanaDetails();
										}

										var s_url = "GetOverallStatusByReferenceNumberWB";
										$rootScope.formData.apiLoading = true;
										var sendData = {
											ReferenceNumber: $rootScope.existingeRefNumber
										};
										serverService.apiCall(s_url, sendData).then(function (a) {
											var statusRresponse = a.data;
											if (statusRresponse.IsSuccess) {
												$rootScope.formData.apiLoading = false;

												if (statusRresponse.OverallStatusList[0].IsEmailVerified == true) {
													$rootScope.verifyemail = false;
													$rootScope.verifyOTPSuccess = true;
												} else {
													$rootScope.verifyemail = true;
												}

												if (statusRresponse.OverallStatusList[0].KRAClient == 'Y') {
													$rootScope.formData.KRA = true;

													sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
												} else {
													sessionStorage.setItem('IsKRA', false);
												}

												if (statusRresponse.OverallStatusList[0].CKYCClient == 'Y') {
													$rootScope.formData.CKYC = true;
													sessionStorage.setItem('IsCKYC', true)
												} else {
													$rootScope.formData.CKYC = false;
												}

												if (statusRresponse.OverallStatusList[0].EBOStatus == 'R' || statusRresponse.OverallStatusList[0].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[0].EBOStatus == 'R') {
														$rootScope.getRejectedResponse();
													} else {
														$rootScope.existingStatus = "You have not completed the onboarding Process post Registration. You would redirected to the pending stages."
													}
												} else if (statusRresponse.OverallStatusList[1].EBOStatus == 'R' || statusRresponse.OverallStatusList[1].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[1].EBOStatus == 'R') {
														$rootScope.getRejectedResponse();
													} else {
														$rootScope.existingStatus = "You have not completed the KYC Process. Please complete the same to help us in opening your account."
													}
												} else if (statusRresponse.OverallStatusList[4].EBOStatus == 'R' || statusRresponse.OverallStatusList[4].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[4].EBOStatus == 'R') {
														$rootScope.getRejectedResponse();
													} else {
														$rootScope.existingStatus = "You have not completed the KYC Process. Please complete the same to help us in opening your account."
													}
												} else if (statusRresponse.OverallStatusList[3].EBOStatus == 'R' || statusRresponse.OverallStatusList[3].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[3].EBOStatus == 'R') {
														$rootScope.getRejectedResponse();
													} else {
														$rootScope.existingStatus = "We require your bank details to link with demat and trading account with us. You have not provided the same. Provide the details to complete the account opening journey."
													}
												} else if (statusRresponse.OverallStatusList[2].EBOStatus == 'R' || statusRresponse.OverallStatusList[2].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[2].EBOStatus == 'R') {
														$rootScope.getRejectedResponse();
													} else {
														$rootScope.existingStatus = "You need to choose prefered trading segments i.e. equity, derivatives, commodities, mutual fund. To set the same we would require you to complete the process."
													}
												} else if (statusRresponse.OverallStatusList[7].SPStatus != 'Y') {
													if ($rootScope.formData.RMModuleDocs) {
														$rootScope.existingStatus = "Kindly complete your digital journey Payment, E-sign and Video IPV";
													} else {
														$rootScope.existingStatus = "You not completed the payment process.";
													}
												} else if (statusRresponse.OverallStatusList[5].EBOStatus == 'R' || statusRresponse.OverallStatusList[5].SPStatus != 'Y') {
													if (statusRresponse.OverallStatusList[5].EBOStatus == 'R') {
														$rootScope.formData.docStageRejected = true;
														$rootScope.getRejectedResponse();
													} else {
														if (statusRresponse.OverallStatusList[5].KRAClient == 'Y' && $rootScope.formData.isg && $rootScope.formData.accountStatus == "ClientCompleted") {
															$rootScope.existingRedirect = false;
															$rootScope.existingStatus = "<span class='ax-bold-title'>Welcome To Axis Securities Family :</span><br><br>We have received, your request for opening account online. It is under process as of now.";
														} else {
															$rootScope.existingStatus = "KYC Documents are not uploaded by you. Upload the same and set your account."
																$rootScope.extPoaDownload = true;
														}

													}
												} else if (statusRresponse.OverallStatusList[9].SPStatus == 'Y' && statusRresponse.OverallStatusList[8].SPStatus != 'Y') {

													$rootScope.formData.apiLoading = true;
													var s_url = "DIYGetImagesByReferenceNumber";
													var sendData = {
														ReferenceNumber: $rootScope.existingeRefNumber,
														IsDiy: true,
														EncryptToken: $rootScope.EncryptToken
													}
													serverService.apiCall(s_url, sendData).then(function (a) {
														var response = a.data;
														if (response.IsSuccess) {

															if (response.IpvPOAandNomineeList[8].IsSelfi == 'Y' || ($rootScope.formData.CKYC && $rootScope.formData.KRA)) {
																$rootScope.updateDIY();
															} else {

																$rootScope.IPVRedirectURL = response.IpvURLEncode;

																$rootScope.existingStatus = 'You are just one step away and complete our In Person Verification (IPV) process';

																setTimeout(function () {
																	var ipvOtpUrl = 'IPVOTPGenerationNew';
																	var ipvData = {
																		ReferenceNumber: $rootScope.existingRef,
																		Mobile: $rootScope.formData.fields.mobile,
																		BrowserType: $rootScope.formData.browserType
																	};
																	serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
																		var response = a.data;
																		$rootScope.formData.apiLoading = false;
																		sessionStorage.setItem('AxNo', $rootScope.existingeRefNumber)
																		var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
																		serverService.apiIPVCall(url).then(function (a) {
																			var response = a.data;
																		});
																	});
																}, 4000)

															}

														} else {
															$rootScope.formData.apiLoading = false;
															$state.go('documentUpload', {
																mobile: $rootScope.formData.EncMobile
															});
														}
													})

												} else if (statusRresponse.OverallStatusList[9].SPStatus != 'Y') {
													$rootScope.firstCompleted = true;
													$rootScope.secondCompleted = true;
													$rootScope.thirdCompleted = true;
													$rootScope.fourthCompleted = true;
													$rootScope.fifthCompleted = true;
													$rootScope.sixthCompleted = true;
													$rootScope.formData.aadharhide = true;
													$rootScope.wizardShow = true;
													$rootScope.nonKraIPVCompleteStatus = false;
													$rootScope.formData.displayNonKraIpvButton = true;
													$rootScope.displayNonKraEsignButton = false;
													$rootScope.formData.ReferenceNumber = $rootScope.existingRef;
													$rootScope.formData.eRefNumber = $rootScope.existingeRefNumber;
													sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);

													$state.go('documentUpload', {
														mobile: $rootScope.formData.EncMobile
													});
													setTimeout(function () {
														$('#existingCustomer-popup').modal('hide');
														/*$('#formPDF').modal({
														backdrop: 'static',
														keyboard: false
														});*/
													}, 1000);
													/*var url = "GetEncrptToken";
													var sendData = {
													ReferenceNumber: sessionStorage.getItem('AxNo')
													}
													$rootScope.formData.apiLoading = true;
													serverService.apiCall(url, sendData).then(function (a) {
													var res = a.data;
													$rootScope.formData.apiLoading = false;
													$rootScope.token = res.EncryptToken;
													if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
													$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
													} else {
													$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
													}
													});*/

												} else if (statusRresponse.OverallStatusList[8].SPStatus != 'Y') {
													$rootScope.existingStatus = 'You are just one step away and complete our In Person Verification (IPV) process';
												} else {
													if ($rootScope.webfinacle) {
														$rootScope.ctabtn = true;
													}
													$rootScope.existingRedirect = false;
													if ($rootScope.formData.accountStatus == "ClientCompleted") {
														$rootScope.existingStatus = "<span class='ax-bold-title'>Welcome To Axis Securities Family :</span><br><br>We have received, your request for opening account online. It is under process as of now.";
													} else {
														$rootScope.existingStatus = $rootScope.formData.accountStatus;
														if (!$rootScope.formData.accountStatus) {
															$rootScope.existingStatus = "<span class='ax-bold-title'>Welcome To Axis Securities Family :</span><br><br>We have received, your request for opening account online. It is under process as of now.";
														}
													}
												}
											}
										});

									}
								});
							} else {
								if (stsResponse.indexOf($rootScope.formData.accountStatus) == 6) {
									$rootScope.existingStatus = "<span class='ax-bold-title'>Scrutiny Completed :</span>  Your KYC is under process.<br><br>Kindly send us POA to process your account on urgent basis. Ignore if already done.";
								} else if (stsResponse.indexOf($rootScope.formData.accountStatus) == 7) {
									$rootScope.accountActivated = true;
									$rootScope.existingStatus = "<span class='ax-bold-title'>Congratulations! :</span><br><br>  Your AxisDirect Account has been opened. Your trading ID is " + response.DematAccountnumber + ".<br><br> <a href='https://simplehai.axisdirect.in/app/index.php/user/auth/activateUser' target='_blank'>Click here</a> to create your username and password and start trading.";
								} else if (stsResponse.indexOf($rootScope.formData.accountStatus) == 2) {
									$rootScope.accountActivated = true;
									$rootScope.existingStatus = "<span class='ax-bold-title'>Congratulations! :</span><br><br>  Your AxisDirect Account has been opened. Your trading ID is " + response.DematAccountnumber + ". Kindly send us your POA duly signed to enable your delivery based Equity investment. Please ignore if already done.<br><br> <a href='https://simplehai.axisdirect.in/app/index.php/user/auth/activateUser' target='_blank'>Click here</a> to create your username and password and start trading.";
								} else {
									$rootScope.existingStatus = $rootScope.formData.accountStatus;
								}
								$rootScope.extPoaDownload = true;
							}
						} else {
							$rootScope.EncryptToken = response.EncryptToken;
							$rootScope.ExtOTPCodeError = true;
							$rootScope.existingCustomer = false;
							$rootScope.formData.ExtOTPCodeError = true;
						}
					})
				} else {
					$rootScope.emptyExtOTP = true;
				}
			}

			$rootScope.existingProceed = function () {
				//$rootScope.getExtOTP();
				//$rootScope.EncryptToken = response.EncryptToken;
				//sessionStorage.setItem('AxToken', $rootScope.EncryptToken);
				$rootScope.formData.ReferenceNumber = $rootScope.existingRef;
				sessionStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
				if ($rootScope.existingeRefNumber && !$rootScope.formData.eRefNumber) {
					$rootScope.formData.eRefNumber = $rootScope.existingeRefNumber;
					sessionStorage.setItem("AxNo", $rootScope.formData.eRefNumber);
				}
				$rootScope.closeExistingModal();
				$rootScope.formData.fields.mobile = $rootScope.Extmobile;
				$rootScope.formData.fields.email = $rootScope.Extemail;
				$rootScope.formData.fields.DOB = $rootScope.ExtDOB;
				$rootScope.formData.fields.panNumber = $rootScope.ExtpanNumber;
				$rootScope.getDIYStatus();
			}
			$rootScope.downloadPOA = function (ref) {
				var url = "DIYGeneratePOA";
				var sendData = {
					ReferenceNumber: ref
				};

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						var link = document.createElement("a");
						link.download = name;
						link.href = "data:application/pdf;base64," + response.POABase64;
						link.click();
					} else {}
				}, function (e) {
					$('#connection').modal('show');
				});
			}

			$rootScope.AskExpert = function (a) {
				if ($rootScope.activation) {
					window.location.assign("https://login.axisdirect.in/");
				}
				var error = 0;
				var stage = $rootScope.formData.stageOrder;
				if (a == 'plan') {
					stage = 8;
				} else if (a == 'preference') {
					stage = 9;
				} else if (a == 'suspended') {
					$('#paninformation').modal('hide');
					stage = 10;
				}

				if ($rootScope.formData.fields.callMobile == null || $rootScope.formData.fields.callMobile == '') {
					$rootScope.formData.emptyhMobile = true;
					error++;
				} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.callMobile) == false) {
					$rootScope.formData.invalidhMobile = true;
					error++;
				}

				if (error == 0) {
					var s_url = "AskExpertRegistration";

					var sendData = {
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						stage: stage,
						Mode: mode,
						Data: '',
						IPAddress: '',
						CreatedBy: "",
						EmailID: $rootScope.formData.fields.email,
						MobileNo: $rootScope.formData.fields.callMobile,
						PanNo: $rootScope.formData.fields.panNumber,
						DateOfBirth: ''
					};
					$rootScope.formData.getDataApi = true;

					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.getDataApi = false;
						if (response.IsSuccess) {
							$('#call-popup').modal('hide');
							if ($rootScope.formData.docOTP) {
								window.location.assign("https://login.axisdirect.in/");
							} else {
								$rootScope.formData.askSuccess = true;
								//$('#call-popup').modal('hide');
								$('#helpNotification').modal('hide');
								$('#mob-success').modal({
									backdrop: 'static',
									keyboard: false
								});
								if ($rootScope.formData.ReferenceNumber) {
									//window.location.assign("https://106.51.0.40:9012/IPVModule/IPV.html?ReferenceNumber="+$rootScope.formData.eRefNumber+"=&type=0&Help=true");
								} else {
									$('#mob-success').modal({
										backdrop: 'static',
										keyboard: false
									});
								}
							}
						}
					}, function (e) {
						$('#connection').modal('show');
					});
				}
			}

			$rootScope.vMethod = function (a) {
				if (a == 'otp') {
					$rootScope.verifyByOTP = true;
				} else {
					$rootScope.verifyByLink = true;
				}
			}

			$rootScope.formData.callPopup = function () {
				$('#existingCustomer-popup').modal();
			}

			$rootScope.formData.helpPopup = function () {
				$('#call-popup').modal();
				$rootScope.formData.fields.callMobile = '';
				if ($rootScope.formData.ReferenceNumber) {
					$rootScope.formData.fields.callMobile = sessionStorage.getItem('RxMobile');
				}
			}

			$rootScope.rmLogout = function () {
				var s_url = 'SignInRmEmployeeDIYLogout';
				var sendData = {
					"RMUserName": $rootScope.formData.fields.rmUsername,
					"IsLogOut": true
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.ReferenceNumber = '';
					$rootScope.formData.rmOptions = false;
					$rootScope.formData.RMModule = false;
					sessionStorage.setItem('AxRM', false);
					sessionStorage.clear();
					location.reload();
				});
			}

			$rootScope.KarvyesingProcess = function () {
				var e_url = 'GenerateESignPDFForKarvy?PanNumber=' + $rootScope.karvyData.PANNO;
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

			//Rm reference number popup
			$rootScope.rmReferenceCall = function () {
				$('#modalrmReferenceNumber').modal();
			}

			$rootScope.clearBrowsingData = function () {
				var cookies = document.cookie.split(";");

				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
				}
				$rootScope.formData.apiLoading = false;
				if ($rootScope.otpFailure) {
					$rootScope.otpFailure = false;
				} else {
					setTimeout(function () {
						$rootScope.formData.ReferenceNumber = '';
						$window.sessionStorage.clear();
						location.reload();
						//$state.go('register');
					}, 10000);
				}
			}

			$rootScope.stageCompleted = function () {
				var url = "DIYStageCompletion";
				if (!$rootScope.formData.ReferenceNumber) {
					$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
				}
				var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					"IsStageCompleted": "Completed"
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					sessionStorage.clear();
					$('#downloadPOA').modal('hide');
					$rootScope.formData.ReferenceNumber = '';
					$rootScope.formData.fields.mobile = '';
					setTimeout(function () {
						location.reload();
					}, 10000)
				});

			}

			$rootScope.downloadMailSendPOA = function (mailSendStatus) {
				var s_url = "POAMailSend";

				var sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					//ReferenceNumber: 'WB104151',
					IsMailSend: mailSendStatus
				};

				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;

					if (!JSON.parse(mailSendStatus)) {

						var pdf = 'data:application/pdf;base64,' + response.POAFileBase64;
						var el = angular.element('#dwnldLnk');
						el.attr('download', 'POA_FORM' + response.ReferenceNumber);
						var dlnk = document.getElementById('dwnldLnk');
						dlnk.href = pdf;
						dlnk.click();
					} else {
						$('#MailSuccess').modal({
							keyboard: false,
							backdrop: 'static'
						})
					}
				});
			}

			$rootScope.extresendCounter = function () {
				$rootScope.formData.ExtResendDisable = true;
				var counter1 = 59;
				$rootScope.Extcounter = "00:59";

				$rootScope.extrunTimer = setInterval(function () {
						counter1--;
						if (counter1 < 55) {
							$rootScope.showextotpStatus = false;
						}
						if (counter1 < 10) {
							counter1 = "0" + counter1;
						}
						$rootScope.Extcounter = '00:' + counter1.toString();
						if (counter1 < 1) {
							$rootScope.formData.ExtResendDisable = false;
							$rootScope.formData.ExtenableResendButton = true;
							clearInterval($rootScope.extrunTimer);
						}
						$rootScope.$apply();
					}, 1000);
			}

			$rootScope.resendCounter = function () {
				$rootScope.rmResendDisable = true;
				var counter1 = 59;
				$rootScope.counter = "00:59";
				$rootScope.rmrunTimer = setInterval(function () {
						counter1--;
						if (counter1 < 10) {
							counter1 = "0" + counter1;
						}
						$rootScope.rmcounter = '00:' + counter1.toString();
						if (counter1 < 1) {
							$rootScope.rmResendDisable = false;
							$rootScope.rmenableResendButton = true;
							clearInterval($rootScope.rmrunTimer);
						}
						$rootScope.$apply();
					}, 1000);
			}

			$rootScope.getRmOTP = function () {
				clearInterval($rootScope.rmrunTimer);
				var url = "OTPGenerationForRmEmployee";
				if ($rootScope.formData.fields.rmcode) {
					var sendData = {
						"RMEmployeeCode": $rootScope.formData.fields.rmcode,
						"MobileFlag": true,
						"EmailFlag": false
					}
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {
							$rootScope.formData.rmOTPSection = true;
							$rootScope.formData.ExtenableResendButton = false;
							$rootScope.resendCounter();
							$rootScope.EncryptToken = response.EncryptToken;
						} else {
							$rootScope.formData.rmCodeInvalid = true;
						}
					}, function (e) {
						$('#connection').modal('show');
					});
				} else {
					$rootScope.formData.rmCodeError = true;
				}
			}
			$rootScope.clearErrorAction = function (type) {
				if (type == 'rmUser') {
					$rootScope.emptyrmUsername = false;
					$rootScope.formData.invalidCredentials = false;
				} else if (type == 'rmPassword') {
					$rootScope.emptyrmPassword = false;
					$rootScope.formData.invalidCredentials = false;
				} else if (type == 'formClose') {
					$('#rm-popup').modal('hide');
					$rootScope.formData.rmDivAction = true;
					$rootScope.formData.fields.rmUsername = "";
					$rootScope.formData.fields.rmPassword = "";
					$rootScope.formData.rmMobileOTPError = false;
				}
			}

			$rootScope.validateRM = function (type) {

				$rootScope.formData.apiLoading = true;
				if (!$rootScope.formData.fields.rmUsername) {
					$rootScope.emptyrmUsername = true;
					$rootScope.formData.apiLoading = false;
					return false;
				}
				if (!$rootScope.formData.fields.rmPassword) {
					$rootScope.emptyrmPassword = true;
					$rootScope.formData.apiLoading = false;
					return false;
				}
				var url = "SignInRmEmployee";

				var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($rootScope.formData.fields.rmPassword), key, {
						keySize: 128 / 8,
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});
				var pa = encryptedpassword.toString();

				var sendData = {
					RMUserName: $rootScope.formData.fields.rmUsername,
					RMPassword: pa,
					RoleName: ''
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$rootScope.formData.rmDivAction = false;
						$rootScope.formData.invalidCredentials = false;
						$rootScope.formData.RMModuleDocs = true;
						$rootScope.formData.RMModule = true;
						$rootScope.EncryptToken = response.EncryptToken;
						$rootScope.formData.fields.rmcode = response.RMEmployeeCode;
						$rootScope.formData.fields.rmid = response.RMDetails.RMId;
						$rootScope.formData.rmName = response.RMDetails.RMName;
						$rootScope.formData.RMTeam = response.RMDetails.RMTeam;
						$rootScope.formData.RMLGLCCode = response.RMDetails.LGLCcode;
						$rootScope.formData.roleName = response.RMDetails.RoleName;
						sessionStorage.setItem('RMName', $rootScope.formData.rmName);
						sessionStorage.setItem('RMTeam', $rootScope.formData.RMTeam);
						sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmcode);
						sessionStorage.setItem('RMID', $rootScope.formData.fields.rmid);
						sessionStorage.setItem('Role', $rootScope.formData.roleName);
						sessionStorage.setItem('RMModule', true);
						sessionStorage.setItem('RMLGLCCode', $rootScope.formData.RMLGLCCode)
						$rootScope.formData.rmOptions = true;
						sessionStorage.setItem('AxToken', $rootScope.EncryptToken);
						$rootScope.rmSessionTimerStart();
						if (!response.RMDetails.IsCustomPassword) {
							$rootScope.formData.changePassword = true;
							sessionStorage.setItem('changePassword', true);
							$state.go('rmPage');
							$('#rm-popup').modal('hide');
						}
						if (!response.RMDetails.RMSignature) {
							$rootScope.formData.getRmSignature = true;
							sessionStorage.setItem('getRmSignature', true);
							$state.go('rmPage');
							$('#rm-popup').modal('hide');
						}
						if (!response.RMDetails.Mobile) {
							$rootScope.formData.getRmMobile = true;
							sessionStorage.setItem('getRmMobile', true);
							$state.go('rmPage');
							$('#rm-popup').modal('hide');
						}
						if (response.RMDetails.BATeamLead == 'Y') {
							$rootScope.baTeamLead = true;
							sessionStorage.setItem('baTeamLead', 'Y');
						} else {
							$rootScope.baTeamLead = false;
							sessionStorage.setItem('baTeamLead', 'N');
						}
					} else {
						if (response.IsPasswordExpired == 'Y') {
							$rootScope.IsPasswordExpired = true;
							$rootScope.formData.fields.rmcode = response.RMEmployeeCode;
							sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmcode);
							if (response.RMDetails) {
								$rootScope.formData.fields.rmid = response.RMDetails.RMId;
							} else {
								$rootScope.formData.fields.rmid = response.RMEmployeeCode;
							}
							sessionStorage.setItem('RMID', $rootScope.formData.fields.rmid);
							$rootScope.formData.changePassword = true;
							sessionStorage.setItem('changePassword', true);
							sessionStorage.setItem('IsPasswordExpired', true);
							$state.go('rmPage');
							$('#rm-popup').modal('hide');
						} else if (response.ErrorCode == '503') {
							$rootScope.formData.fields.rmcode = response.RMEmployeeCode;
							if (response.RMDetails) {
								$rootScope.formData.fields.rmid = response.RMDetails.RMId;
								sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmcode);
								sessionStorage.setItem('RMID', $rootScope.formData.fields.rmid);
							}
							$rootScope.formData.getRmEmail = true;
							sessionStorage.setItem('getRmEmail', true);
							$state.go('rmPage');
							$('#rm-popup').modal('hide');
						} else {
							$rootScope.formData.rmDivAction = true;
							$rootScope.formData.invalidCredentials = true;
						}
					}
				}, function (e) {
					$('#connection').modal('show');
				});
			}
			$rootScope.rmextresendCounter = function () {
				$rootScope.formData.RMExtResendDisable = true;
				var counter1 = 59;
				$rootScope.RMExtcounter = "00:59";

				$rootScope.extrunTimer = setInterval(function () {
						counter1--;
						if (counter1 < 55) {
							$rootScope.RMshowextotpStatus = false;
						}
						if (counter1 < 10) {
							counter1 = "0" + counter1;
						}
						$rootScope.RMExtcounter = '00:' + counter1.toString();
						if (counter1 < 1) {
							$rootScope.formData.RMExtResendDisable = false;
							$rootScope.formData.RMExtenableResendButton = true;
							clearInterval($rootScope.extrunTimer);
						}
						$rootScope.$apply();
					}, 1000);
			}

			$rootScope.rmForgotPassword = function () {
				var s_url = "ForgotPasswordForRM";

				var sendData = {
					"RMUserName": $rootScope.formData.fields.rmUsername
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$rootScope.formData.rmForgotOTP = true;
						$rootScope.formData.fields.rmid = response.RMDetails.RMId;
						$rootScope.formData.fields.rmMobile = response.RMDetails.Mobile;
						$rootScope.formData.fields.rmEmail = response.RMDetails.EmailID;
						$rootScope.formData.roleName = response.RMDetails.RoleName;
						$rootScope.formData.RMError = false;
						sessionStorage.setItem('RMID', $rootScope.formData.fields.rmid);
						clearInterval($rootScope.extrunTimer);
						$rootScope.rmextresendCounter();
					} else {
						$rootScope.formData.RMError = true;
					}
				})
			}
			$rootScope.rmForgotOTPValidate = function () {
				var s_url = "OTPValidationnew";

				var sendData = {
					"Mobile": $rootScope.formData.fields.rmMobile,
					"Email": $rootScope.formData.fields.rmEmail,
					"MobileOtpCode": $rootScope.formData.fields.rmMobileOTP,
					"EmailOtpCode": '',
					"MobileFlag": true,
					"EmailFlag": false,
					"IsDiy": true,
					"RMUserName": $rootScope.formData.fields.rmUsername,
					"RoleName": $rootScope.formData.roleName,
					"IsForgotPasswordRM": true
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$rootScope.formData.rmForgotOTP = true;
						$rootScope.formData.fields.rmcode = $rootScope.formData.fields.rmUsername;
						sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmUsername)
						$rootScope.formData.changePassword = true;
						sessionStorage.setItem('changePassword', true);
						$state.go('rmPage');
						$('#rm-popup').modal('hide');
					} else {
						$rootScope.formData.rmMobileOTPError = true;
					}
				})
			}

			$rootScope.RmStop = function () {
				$rootScope.formData.disableApp = true;
			}

			$rootScope.validateRmOTP = function () {
				if ($rootScope.formData.fields.rmOTP) {
					var url = "OTPValidationForRM";

					var sendData = {
						"RMEmployeeCode": $rootScope.formData.fields.rmcode,
						"EncryptToken": $rootScope.EncryptToken,
						"MobileOtpCode": $rootScope.formData.fields.rmOTP
					}

					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {
							$rootScope.formData.rmOTPSection = false;
							$rootScope.formData.rmOptions = true;
							$rootScope.formData.RMModuleDocs = true;
							$rootScope.formData.RMModule = true;
							$rootScope.EncryptToken = response.EncryptToken;
							sessionStorage.setItem('RMModule', true);
							sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmcode);
							sessionStorage.setItem('AxToken', $rootScope.EncryptToken);
						} else {
							$rootScope.formData.rmOTPCodeError = true;
						}
					})
				} else {
					$rootScope.emptyRmOTP = true;
				}
			}

			$rootScope.RmOverallList = function () {
				$rootScope.formData.RefNumber = '';
				$rootScope.formData.ReferenceNumber = '';
				sessionStorage.removeItem('RxReferenceNumber');
				sessionStorage.removeItem('AxNo');
				$('#rm-popup').modal('hide');
				$rootScope.formData.RMModuleDocs = true;
				$rootScope.formData.RMModule = true;
				$rootScope.wizardShow = false;
				sessionStorage.setItem('RMModule', true);
				$state.go('rmlist');
			}

			$rootScope.RmPod = function () {
				$rootScope.formData.RefNumber = '';
				$rootScope.formData.ReferenceNumber = '';
				sessionStorage.removeItem('RxReferenceNumber');
				sessionStorage.removeItem('AxToken');
				sessionStorage.removeItem('AxNo');
				$('#rm-popup').modal('hide');
				$rootScope.formData.RMModule = true;
				sessionStorage.setItem('RMModule', true);
				$rootScope.wizardShow = false;
				$state.go('pod');
			}

			$rootScope.RmTransfer = function () {
				$rootScope.formData.RefNumber = '';
				$rootScope.formData.ReferenceNumber = '';
				sessionStorage.removeItem('RxReferenceNumber');
				sessionStorage.removeItem('AxToken');
				sessionStorage.removeItem('AxNo');
				$('#rm-popup').modal('hide');
				$rootScope.formData.RMModule = true;
				sessionStorage.setItem('RMModule', true);
				$rootScope.wizardShow = false;
				$state.go('transfer');
			}

			$rootScope.rmPopup = function () {
				$('#rm-popup').modal({
					backdrop: 'static',
					keyboard: false
				});
				$rootScope.formData.rmloginPassword = true;
				$rootScope.formData.invalidCredentials = false;
				$rootScope.formData.rmForgotPassword = false;
				$rootScope.formData.rmOTPSection = false;
				$rootScope.typeRmPassword = false;
				$rootScope.formData.rmForgotOTP = false;
				$rootScope.formData.rmOptions = false;
				$rootScope.formData.fields.rmMobileOTP = '';
			}

			$rootScope.formData.rmOptionsBox = function () {
				$('#rm-popup').modal({
					backdrop: 'static',
					keyboard: false
				});
				$rootScope.formData.rmOTPSection = false;
				$rootScope.typeRmPassword = false;
				$rootScope.formData.rmDivAction = false;
				$rootScope.formData.newRMForm = false;
				$rootScope.formData.rmOptions = true;
			}

			$rootScope.RmForm = function () {
				$rootScope.formData.disableApp = false;
				$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
				sessionStorage.setItem('RMModule', true);
				sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmcode);
				$rootScope.formData.RefNumber = '';
				$rootScope.formData.ReferenceNumber = '';
				$rootScope.formData.fields.mobile = '';
				$rootScope.formData.fields.email = '';
				$state.go('register');
				$rootScope.emailMobile = false;
				$rootScope.pan = true;
				$rootScope.firstCompleted = false;
				$rootScope.secondCompleted = false;
				$rootScope.thirdCompleted = false;
				$rootScope.fourthCompleted = false;
				$rootScope.fifthCompleted = false;
				$rootScope.sixthCompleted = false;
				$rootScope.wizardShow = true;
				$rootScope.formData.newRMForm = false;
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
				setTimeout(function () {
					$('#rm-popup').modal('hide');
					$(document.body).removeClass('modal-open');
					$('.modal-backdrop').remove();
				}, 500)
			}

			$rootScope.toggleRmPassword = function () {
				$rootScope.typeRmPassword = !$rootScope.typeRmPassword;
			};

			$rootScope.toggleExtPassword = function () {
				$rootScope.formData.typeExtPassword = !$rootScope.formData.typeExtPassword;
			}

			$rootScope.genLink = function () {
				$rootScope.wizardShow = false;
				$('#rm-popup').modal('hide');
				$state.go('genLink');
			}

			$rootScope.sessionStorageClear = function () {
				var href = location.href;
				var url = (href.match(/([^\/]*)\/*$/)[1]);
				if (url == 'complete') {
					$window.sessionStorage.clear();
				}
				location.assign("https://simplehai.axisdirect.in/");
			}
			$rootScope.getAadhaar = function () {
				var url = "Form/AadharEKYC/EKYCRequest.aspx?PanNumber=" + $rootScope.formData.fields.panNumber;
				serverService.apiPaymentCall(url, '', '');
			}

			$rootScope.verifyEmailOTP = function () {
				if ($rootScope.Extmobile && !$rootScope.formData.fields.mobile) {
					$rootScope.formData.fields.mobile = $rootScope.Extmobile;
				}
				if ($rootScope.Extemail && !$rootScope.formData.fields.email) {
					$rootScope.formData.fields.email = $rootScope.Extemail;
				}
				if ($rootScope.ExtDOB && !$rootScope.formData.dob) {
					$rootScope.formData.dob = $rootScope.ExtDOB;
				}
				if ($rootScope.ExtpanNumber && !$rootScope.formData.fields.panNumber) {
					$rootScope.formData.fields.panNumber = $rootScope.ExtpanNumber;
				}
				if ($rootScope.formData.fields.verifyOTP) {
					var url = "UnAuthorizeOTPValidation";
					var sendData = {
						"Mobile": $rootScope.formData.fields.mobile,
						"Email": $rootScope.formData.fields.email,
						"MobileOtpCode": "",
						"EmailOtpCode": $rootScope.formData.fields.verifyOTP,
						"DOB": ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
						"PanNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : $rootScope.ExtpanNumber,
						"MobileFlag": false,
						"EmailFlag": true,
						"ReferenceNumber": $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.existingRef,
						"IsDiy": true
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						$rootScope.verifyemail = false;
						if (response.IsSuccess) {
							$rootScope.verifyOTPSuccess = true;
						} else {
							$rootScope.invalidverifyOTP = true;
						}
					})
				} else {
					$rootScope.emptyverifyOTP = true;
				}
			}

			$rootScope.genEmailOTP = function () {

				var url = "EmailVerificationUrl";
				sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.existingRef,
					Email: $rootScope.formData.fields.email
				};
				$rootScope.formData.apiLoading = true;
				$rootScope.verifyByOTP = false;
				$rootScope.verifyByLink = false;
				$rootScope.formData.fields.verifyOTP = '';
				if ($rootScope.existingRef) {
					$rootScope.formData.ReferenceNumber = $rootScope.existingRef;
				}
				$rootScope.closeExistingModal();
				serverService.apiCall(url, sendData).then(function (a) {

					var response = a.data;
					$rootScope.formData.apiLoading = false;
					$('#verifyemail').modal('show');
					$rootScope.verifyOTPSuccess = false;
					$rootScope.verifyByLink = false;
					if (response.IsSuccess) {
						$scope.emailStatus = 'Verification link has been sent to your email.';
					} else {
						$scope.emailStatus = 'Unable to send verification link, please try again.';
					}
				});
			}

			$rootScope.startChat = function () {
				$rootScope.formData.showChat = true;
			}

			$rootScope.chatbox = function () {
				var m = '9884928863';
				if ($rootScope.formData.fields.mobile) {
					m = $rootScope.formData.fields.mobile;
				}
				var pg = 'register';
				if ($rootScope.formData.stageOrder == 2) {
					pg = 'address';
				}
				if ($rootScope.formData.stageOrder == 5) {
					pg = 'personalDetails';
				}
				if ($rootScope.formData.stageOrder == 4) {
					pg = 'bank';
				}
				if ($rootScope.formData.stageOrder == 3) {
					pg = 'products';
				}
				if ($rootScope.formData.stageOrder == 6) {
					pg = 'documentupload';
				}
				var chatUrl = "https://digitalaccount.axisdirect.in/diy/#/?id=custom&mobile="+m+"&chatSource=diy&rmid=''&currentpage="+pg+"&wbid="+$rootScope.formData.ReferenceNumber;
				var c = document.createElement("iframe");
				c.setAttribute("src", chatUrl);
				c.style.width = "375px";
				c.style.height = "100%";
				c.style.position = "fixed";
				c.style.bottom = "0";
				c.style.right = "0";
				document.body.appendChild(c);
				$rootScope.hideChat = true;
			}

			setTimeout(function () {
				if ($rootScope.formData.ReferenceNumber) {
					if ($rootScope.ExistingclientName) {
						$('#name').val($rootScope.ExistingclientName)
					} else if ($rootScope.formData.fields.username) {
						$('#name').val($rootScope.formData.fields.username)
					}
					if ($rootScope.Extmobile) {
						$('#phone').val($rootScope.Extmobile)
					} else if ($rootScope.formData.fields.callMobile) {
						$('#phone').val($rootScope.formData.fields.callMobile)
					} else if ($rootScope.formData.fields.mobile) {
						$('#phone').val($rootScope.formData.fields.mobile)
					}
					if ($rootScope.formData.fields.email) {
						$('#email').val($rootScope.formData.fields.email)
					} else if ($rootScope.Extemail) {
						$('#email').val($rootScope.Extemail)
					}
				}
			}, 5000)

			$rootScope.netBanking = function () {
				$('#existingCustomer-popup').modal('hide');
				window.location.assign("https://retail.axisbank.co.in/wps/portal/rBanking/AxisSMRetailLogin/axissmretailpage");
			}

		}
	]);
$(window).on('popstate', function () {
	$(document.body).removeClass('modal-open');
	$('.modal-backdrop').remove();
});
$(document).keyup(function (e) {
	if ($('button').is(':focus')) {}
	else {

		if (e.keyCode == 27) {
			return false;
		}
		if (e.keyCode == 13 && e.target.id && e.target.id != 'input-newpan' && e.target.id != 'input-1newmob' && e.target.id != 'continueapp' && e.target.id != 'call-popup' && e.target.id != 'rm-popup' && e.target.id != "mobile-number1" && e.target.id != "pennyModal" && e.target.id != "NonKRAVerified" && e.target.id != 'rmUsername' && e.target.id != 'rmPassword') {
			if (e.target.id == 'paninformation') {
				angular.element(document.getElementById("paninformation")).scope().modalPop('paninformation');

			}
			if (e.target.id == 'continueapp') {
				//$(".select").select2("close");
			}

			$('.modal').modal('hide');
		}

		if (e.keyCode == 13 && (e.target.id == 'rmUsername' || e.target.id == 'rmPassword')) {
			angular.element(document.getElementById(e.target.id)).scope().validateRM('formSubmit')
		}

		if (e.target.id == 'otp-resend') {
			setTimeout(function () {
				$('#inputs-otpnumber').focus();
			}, 100)
		}

		if (e.target.id == 'onboard-success') {
			angular.element(document.getElementById("onboard-success")).scope().AskExpert('6');
		}
	}
});
