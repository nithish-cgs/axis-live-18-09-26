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

}
	());

var regDisable = false;
var IsAllowCityAndCountry = false;

function btnFocus(event) {
	if (event.keyCode == 9) {
		event.preventDefault();
	};
}

var url1 = window.location + '';
url = decodeURIComponent(url1);
var utm_source = (getParameterByName('utm_source', url));
var utm_medium = (getParameterByName('utm_medium', url));
var utm_term = (getParameterByName('utm_term', url));
var utm_creative = (getParameterByName('utm_creative', url));
var utm_campaign = (getParameterByName('utm_campaign', url));
var utm_placement = (getParameterByName('utm_placement', url));
var utm_adgroup = (getParameterByName('utm_adgroup', url));
var utm_device = (getParameterByName('utm_device', url));
var utm_content = (getParameterByName('utm_content', url));
var CTA = (getParameterByName('CTA', url));
var GCLID = (getParameterByName('GCLID', url));
var Mobile = (getParameterByName('Mobile', url));
var Email = (getParameterByName('Email', url));
var product = (getParameterByName('product_name', url));
var ref = (getParameterByName('ref', url));
var threeinone = (getParameterByName('Threein1', url));
var mode = (getParameterByName('Mode', url));

if (product) {
	localStorage.setItem('RxProduct', product);
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
var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'ui.router', 'ngAria', 'serverComm', 'onlyAlphabets', 'onlyDigits', 'ngDecimal', 'alphaNumeric', 'angucomplete', 'angucompleteifsc', 'angucompletecity', 'angucompletebank', 'alphaSpecial', 'stopCcp', 'ngRightClick', 'restrictSpecialCharacters', 'filters-module', 'angularjs-dropdown-multiselect']);
//, 'angularjs-dropdown-multiselect'
mainApp.run(function ($rootScope, $location, serverService, $state, $interval, $window) {

	$rootScope.getAPI = true;
	$rootScope.activation = false;
	$rootScope.formData = {};
	$rootScope.formData.fields = {};
	$rootScope.formData.GAT_Cookie_days = 3;
	$rootScope.formData.addressTypeList = [];
	$rootScope.formData.OccupationDetailsList = [];
	$rootScope.formData.educationList = [];
	$rootScope.formData.corressDocList = [];
	$rootScope.formData.foDocumentTypeList = [];
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
	var searchObject = $location.search();

	if (localStorage.getItem('AxToken') != null) {
		$rootScope.EncryptToken = localStorage.getItem('AxToken');
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

	$rootScope.getLocation();

	if (localStorage.getItem('RxReferenceNumber') != null) {
		$rootScope.formData.ReferenceNumber = localStorage.getItem('RxReferenceNumber');
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
		serverService.apiCall(s_url, sendData).success(function (response) {

			if (response == '1' || response == '100' || response == '200') {
				$rootScope.EncryptToken = '';
				localStorage.removeItem('AxToken');
				$rootScope.formData.apiLoading = false;

				$state.go('complete', {
					mobile: $rootScope.formData.EncMobile
				});
				setTimeout(function () {
					$('#downloadPOA').modal({
						keyboard: false,
						backdrop: 'static'
					});
				}, 1000)

			}

		});
	}

	$rootScope.getDIYStatus = function () {
		if (!$rootScope.getDIYStatusAPI) {
			$rootScope.getDIYStatusAPI = true;
			var tokenParams = {
				'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
				'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
				'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
				'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

			}

			var s_url = "GetOverallStatusByReferenceNumberWB";
			$rootScope.formData.apiLoading = true;
			if (!$rootScope.formData.eRefNumber && localStorage.getItem('AxNo')) {
				$rootScope.formData.eRefNumber = localStorage.getItem('AxNo');
			} else {
				if (!$rootScope.formData.eRefNumber) {
					localStorage.clear();
					sessionStorage.clear();
					location.reload();
				}
			}
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber
			};
			serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
				$('#paninformation').modal('hide');
				$(document.body).removeClass('modal-open');
				$('.modal-backdrop').remove();
				$rootScope.formData.apiLoading = false;
				//$rootScope.formData.KRA = false;
				
				if (response.RefNumber) {
					$rootScope.formData.eRefNumber = response.RefNumber;
				}

				//angular.forEach(response.OverallStatusList, function (value, key) {});
				if (response.OverallStatusList[1].SPStatus == 'Y') {
					if (response.OverallStatusList[0].CKYCClient == 'Y') {
						$rootScope.formData.CKYC = true;
						localStorage.setItem('IsCKYC', true)
					} else {
						$rootScope.formData.CKYC = false;
					}
					if (response.OverallStatusList[0].CKYCUpdate == 'Y') {
						$rootScope.formData.changeCKYC = true;
						localStorage.setItem('IsCKYCUpdate', 'Y')
					}

					if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
						$rootScope.formData.KRA = true;
						localStorage.setItem('IsKRA', $rootScope.formData.KRA);
						if ($rootScope.formData.isg) {
							$rootScope.formData.isgProfileSkip = true;
						}
					} else {
						localStorage.setItem('IsKRA', false);
					}
					if (response.OverallStatusList[0].KRAUpdate == 'Y') {
						$rootScope.formData.IsKRAUpdate = 'Y';
						$rootScope.formData.changeKRA = true;
						localStorage.setItem('IsKRAUpdate', 'Y');
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.KRA = false;
						localStorage.setItem('IsKRA', true);
						if ($rootScope.formData.isg) {
							$rootScope.formData.isgProfileSkip = true;
						}
					}
				}
				// if(response.OverallStatusList[7].SPStatus == 'Y'){
				//     localStorage.setItem('isPaymentCompleted', true);
				// } else{
				//     localStorage.setItem('isPaymentCompleted', false);
				// }
				// Payment functionality Hide/Show
				// if(localStorage.getItem('IsKRA') ==  'true' || localStorage.getItem('IsAadharVerified') == 'true'){
				if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
					$rootScope.formData.isPaymentCompleted = true;
					$rootScope.formData.makePayment = false;
					localStorage.setItem('isPaymentCompleted', true);
				} else {
					if (!$rootScope.formData.NoPayment) {
						$rootScope.formData.makePayment = true;
						$rootScope.formData.isPaymentCompleted = false;
						localStorage.setItem('isPaymentCompleted', false);
					}
				}
				/* }else{
				$rootScope.formData.makePayment = false;
				localStorage.setItem('isPaymentCompleted', true);
				}*/

				$rootScope.formData.applicationDisabled = false;
				if (response.OverallStatusList[0].Threein1 == 'Y') {
					$rootScope.formData.threeinone = true;
					$rootScope.$broadcast("threeinone", $rootScope.formData.threeinone);
					$rootScope.formData.ReferenceNumber = localStorage.getItem("RxReferenceNumber");
					if (response.OverallStatusList[1].Threein1 == 'Y') {
						$rootScope.formData.skipRegister = true;
					}
				}
				setTimeout(function () {
					$rootScope.getAPI = false;
				}, 1500);
				if (response.OverallStatusList[0].EBOStatus == 'D' || response.OverallStatusList[0].EBOStatus == 'S' || response.OverallStatusList[1].EBOStatus == 'D' || response.OverallStatusList[1].EBOStatus == 'S' || response.OverallStatusList[2].EBOStatus == 'D' || response.OverallStatusList[2].EBOStatus == 'S' || response.OverallStatusList[3].EBOStatus == 'D' || response.OverallStatusList[3].EBOStatus == 'S' || response.OverallStatusList[4].EBOStatus == 'D' || response.OverallStatusList[4].EBOStatus == 'S' || response.OverallStatusList[5].EBOStatus == 'D' || response.OverallStatusList[5].EBOStatus == 'S') {
					// if (!$rootScope.formData.dataCloned) {
					// 	$('#paninformation').modal({
					// 		backdrop: 'static',
					// 		keyboard: false
					// 	});

					// 	$rootScope.formData.panStatus = 'Your account has been dropped';
					// 	$rootScope.formData.applicationDisabled = true;
					// 	$window.localStorage.clear();
					// 	$window.sessionStorage.clear();
					// 	$state.go('register', {
					// 		mobile: $rootScope.formData.EncMobile
					// 	});
					// }
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
					if ($rootScope.formData.threeinone && response.OverallStatusList[1].Threein1 == 'N') {
						$rootScope.wizardShow = false;
						if (localStorage.getItem('threeinone') == 'true') {
							$state.go('register', {
								mobile: $rootScope.formData.EncMobile
							});
						} else {
							localStorage.setItem('threeinone', true);
							if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
								$rootScope.formData.KRA = true;
								localStorage.setItem('IsKRA', $rootScope.formData.KRA);
								$rootScope.ecommercekraValidation();
							} else {
								$state.go('address', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						}
					} else if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
						$rootScope.formData.KRA = true;
						localStorage.setItem('IsKRA', $rootScope.formData.KRA);
						$rootScope.ecommercekraValidation();
					} else {
						setTimeout(function () {
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
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
					setTimeout(function () {
						$rootScope.$broadcast("getAPI", $rootScope.getAPI);
					}, 1600);
					if (response.OverallStatusList[4].KRAClient == 'Y' && $rootScope.formData.isg) {
						$rootScope.formData.isgProfileSkip = true;
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
					setTimeout(function () {
						$rootScope.$broadcast("getAPI", $rootScope.getAPI);
					}, 1600);
					if (response.OverallStatusList[3].EBOStatus == 'R') {
						$rootScope.getAPI = false;
					}
					$state.go('bank', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[2].EBOStatus == 'R' || response.OverallStatusList[2].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[2].Threein1 == 'N')) {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					if ($rootScope.formData.threeinone) {
						$rootScope.formData.apiLoading = true;
						setTimeout(function () {
							$rootScope.getAPI = false;
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
					} else {
						$rootScope.getAPI = false;
					};
					if (response.OverallStatusList[2].EBOStatus == 'R') {
						$rootScope.getAPI = false;
					}
					$state.go('products', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[5].EBOStatus != 'R' && (response.OverallStatusList[8].SPStatus == 'Y' && response.OverallStatusList[5].SPStatus == 'Y')) {
					$state.go('complete', {
						mobile: $rootScope.formData.EncMobile
					});
					setTimeout(function () {
						$('#downloadPOA').modal({
							keyboard: false,
							backdrop: 'static'
						});
					}, 1000)
				} else if (response.OverallStatusList[9].SPStatus == 'Y') {

					if ($rootScope.formData.CKYC == true && $rootScope.formData.KRA == true) {
						$rootScope.updateDIY();
					} else {
						$rootScope.formData.apiLoading = true;
						var s_url = "DIYGetImagesByReferenceNumber";
						var sendData = {
							ReferenceNumber: $rootScope.formData.eRefNumber,
							IsDiy: true,
							EncryptToken: $rootScope.EncryptToken
						}
						serverService.apiCall(s_url, sendData).success(function (response) {
							if (response.IsSuccess) {
								$rootScope.IPVRedirectURL = response.IpvURLEncode;
								if (!angular.isUndefined(searchObject.ipvFailure)) {
									$rootScope.updateDIY();
								} else {
									var ipvOtpUrl = 'IPVOTPGenerationNew';
									var ipvData = {
										ReferenceNumber: $rootScope.formData.ReferenceNumber,
										Mobile: $rootScope.formData.fields.mobile,
										BrowserType: $rootScope.formData.browserType
									};
									serverService.apiCall(ipvOtpUrl, ipvData).success(function (response) {
										$rootScope.formData.apiLoading = false;
										var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
										serverService.apiIPVCall(url).success(function (response) {
											//console.log("Response : " + response);
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
					}

				} else if (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && response.OverallStatusList[7].SPStatus != 'Y' && !$rootScope.formData.NoPayment) {

					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					//$rootScope.formData.makePayment = false;
					$state.go('products', {
						mobile: $rootScope.formData.EncMobile
					});
					// if (!$rootScope.docgetAPI) {
					//     var s_url = "DIYGetProductInfoByReferenceNumber";
					//     var sendData = {
					//         ReferenceNumber: $rootScope.formData.eRefNumber,
					//         IsDiy: true,
					//         EncryptToken: $rootScope.EncryptToken
					//     }
					//     $rootScope.getAPI = true;
					//     serverService.apiCall(s_url, sendData).success(function (response) {
					//         if (response.EncryptToken) {
					//             $rootScope.EncryptToken = response.EncryptToken;
					//             localStorage.setItem('AxToken', response.EncryptToken);
					//         }
					//         if (response.IsSuccess) {
					//             if (response.ObjCDIYProduct.ProductId != "1" || response.ObjCDIYProduct.ProductId != 1) {
					//                 $rootScope.fifthCompleted = true;
					//                 $rootScope.formData.makePayment = false;
					//                 $state.go('documentUpload', {
					//                     mobile: $rootScope.formData.EncMobile
					//                 });
					//             } else {
					//                 $state.go('products', {
					//                     mobile: $rootScope.formData.EncMobile
					//                 });
					//             }
					//         } else {
					//             $state.go('products', {
					//                 mobile: $rootScope.formData.EncMobile
					//             });
					//         }
					//     });
					// }else{
					// 	$rootScope.fifthCompleted = true;
					//     $rootScope.formData.makePayment = false;
					// }
					if ($rootScope.formData.threeinone) {
						/* $rootScope.formData.apiLoading = true;
						setTimeout(function () {
						$rootScope.getAPI = false;
						$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);*/
					} else {
						//$rootScope.getAPI = false;
					}
					/*if ($rootScope.getprodcutdetail) {
					$state.go('products', {
					mobile: $rootScope.formData.EncMobile
					});
					}*/
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
						serverService.apiCall(s_url, sendData).success(function (response) {
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
									setTimeout(function () {
										$('#downloadPOA').modal({
											keyboard: false,
											backdrop: 'static'
										});
									}, 1000)

								}
							}
						});
					} else {
						if (!localStorage.getItem('skipEsign')) {
							$state.go('products', {
								mobile: $rootScope.formData.EncMobile
							});
						} else {
							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
						}
					}
				} else if (response.OverallStatusList[5].EBOStatus == 'R' || response.OverallStatusList[5].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[5].Threein1 == 'N')) {
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
					if ($rootScope.formData.threeinone) {
						$rootScope.formData.apiLoading = true;
						setTimeout(function () {
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
					}
					if (response.OverallStatusList[5].EBOStatus == 'R') {
						$rootScope.formData.docStageRejected = true;
					}
					$state.go('documentUpload', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[8].SPStatus == 'Y') {
					$state.go('complete', {
						mobile: $rootScope.formData.EncMobile
					});
					setTimeout(function () {
						$('#downloadPOA').modal({
							keyboard: false,
							backdrop: 'static'
						});
					}, 1000)
				} else if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus != 'Y' || ($rootScope.formData.threeinone && response.OverallStatusList[8].Threein1 == 'N')) {
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
					if ($rootScope.formData.threeinone) {
						$rootScope.formData.apiLoading = true;
						setTimeout(function () {
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
					}
					if (!angular.isUndefined(searchObject.ipvFailure)) {
						$rootScope.updateDIY();
					} else {
						$state.go('documentUpload', {
							mobile: $rootScope.formData.EncMobile
						});
						setTimeout(function () {
							$('#formPDF').modal({
								backdrop: 'static',
								keyboard: false
							});
						}, 1000);
						$rootScope.objURl = "https://apidigitalao.axisdirect.in/AxisPDF/index.html?ReferenceNumber=" + $rootScope.formData.eRefNumber;
					}
					//$rootScope.apiResponseErrorMsg = "You have have completed providing your details, will get in touch with you shortly!";
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
					if ($rootScope.formData.threeinone) {
						$rootScope.formData.apiLoading = true;
						setTimeout(function () {
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
					}
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
					if ($rootScope.formData.threeinone) {
						$rootScope.formData.apiLoading = true;
						setTimeout(function () {
							$rootScope.$broadcast("getAPI", $rootScope.getAPI);
						}, 1600);
					}
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
			}).error(function (e) {
				$('#connection').modal('show');
			});
			// $rootScope.GetActivationInfo();
		}
	}

	if (!angular.isUndefined(searchObject.ReferenceNumber)) {
		//alert(searchObject);
		localStorage.setItem('AxNo', searchObject.ReferenceNumber)
		//$rootScope.getDIYStatus();
	}

	if (threeinone == 'true') {
		localStorage.setItem('threeinone', true);
		localStorage.setItem('AxNo', ref);
		$rootScope.formData.threeinone = true;
	}

	if (localStorage.getItem('threeinone') == 'true') {
		$rootScope.formData.threeinone = true;
	}

	$rootScope.decryptUrl = function () {
		if ($rootScope.formData.DecryptURL) {
			var encryptURL = "GetDecryptURL";
			if (localStorage.getItem('AxNo')) {
				$rootScope.formData.DecryptURL = localStorage.getItem('AxNo');
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
			serverService.apiCall(encryptURL, sendDataURL).success(function (response) {
				if (response.IsSuccess) {
					if ($rootScope.formData.rmOTP) {
						$rootScope.Extmobile = response.Mobile;
						$rootScope.getExtOTP();
						$('#existingCustomer-popup').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.existingResponse = true;
						$rootScope.existingRef = response.ReferenceNumber;
						$rootScope.extresendCounter();
						$rootScope.formData.rmOTP = false;
					} else {
						localStorage.setItem("DOB", response.DOB);
						localStorage.setItem("IsKRA", response.IsKRA);
						localStorage.setItem("RxPan", response.PANNumber);
						localStorage.setItem("RxReferenceNumber", response.ReferenceNumber);
						localStorage.setItem('User_City', response.City);
						$rootScope.formData.fields.username = response.ClientName;
						$rootScope.formData.EncMobile = response.EncMobile;
						if (response.ReferenceNumber) {
							$rootScope.formData.fields.callMobile = response.Mobile
						}
						if (response.Mobile && response.Mobile.toLowerCase() != "null") {
							localStorage.setItem("RxMobile", response.Mobile);
							$rootScope.formData.fields.mobile = localStorage.getItem('RxMobile');
						}
						if (response.Email && response.Email.toLowerCase() != "null") {
							localStorage.setItem("RxEmail", response.Email);
							$rootScope.formData.fields.email = localStorage.getItem('RxEmail');
						}
						$rootScope.formData.fields.panNumber = localStorage.getItem("RxPan");
						$rootScope.formData.fields.DOB = localStorage.getItem('DOB');
						$('#txtDOB').val(localStorage.getItem('DOB'));

						if (!angular.isUndefined(searchObject.poa)) {
							if (searchObject.poa == '1') {
								$rootScope.downloadPOA(response.ReferenceNumber)
							}
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

	if (localStorage.getItem('IsKRA') == null || localStorage.getItem('DOB') == null || localStorage.getItem('RxPan') == null || localStorage.getItem('RxMobile') == null || localStorage.getItem('RxEmail') == null || $rootScope.formData.threeinone || localStorage.getItem('AxNo')) {
		$rootScope.decryptUrl();
	}
	$rootScope.newForm = function () {
		$rootScope.formData.newRMForm = true;
	}

	$rootScope.uidaiRedirect = function () {
		window.open('https://uidai.gov.in/', '_blank')
	}

	$rootScope.WBTempPersistence = function () {
		var s_url = "WBTempPersistence";
		var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
		var date = dateStr[0];
		var month = dateStr[1];
		var year = dateStr[2];
		var NewDate = date + "/" + month + "/" + year;
		var DOB = date + "/" + month + "/" + year;
		localStorage.setItem('DOB', DOB);
		$rootScope.formData.ReferenceNumberDOB = NewDate;
		var userDob = NewDate;

		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			MobileNo: $rootScope.formData.fields.mobile,
			EmailID: $rootScope.formData.fields.email,
			RK: $rootScope.formData.ReferKey,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		};

		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}

		//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function () {
		serverService.apiCall(s_url, sendData).success(function (res) {
			if (res.EncryptToken) {
				$rootScope.EncryptToken = res.EncryptToken;
			}
			$rootScope.formData.ReferenceNumber = $rootScope.formData.ReferenceNumber;

			$rootScope.panLoaded = false
				$rootScope.firstCompleted = true;
			$rootScope.getAPI = false;
			dataLayer.push({
				event: 'StageChange',
				attributes: {
					'level complete': '1b',
					'pan': $rootScope.formData.fields.panNumber,
					'dob': userDob,
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

			if (localStorage.getItem('IsKRA') == 'true') {
				$rootScope.ecommercekraValidation();
			} else if (localStorage.getItem('IsCKYC') == 'true') {
				$rootScope.ecommerceCKYCValidation();
			} else {
				$state.go('address', {
					mobile: $rootScope.formData.EncMobile
				});
			}

		}).error(function () {
			// serverService.apiCall(s_url, sendData).error(function () {
			$('#connection').modal('show');
		});
	}

	$rootScope.generateReference = function () {
		if ($rootScope.formData.fields.mobile) {
			localStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);
		}
		if ($rootScope.formData.fields.email) {
			localStorage.setItem("RxEmail", $rootScope.formData.fields.email);
		}
		localStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
		if (localStorage.getItem("CFirstname")) {
			$rootScope.formData.ClientFirstname = localStorage.getItem("CFirstname");
		}
		if (localStorage.getItem("CMiddlename")) {
			$rootScope.formData.ClientMiddlename = localStorage.getItem("CMiddlename");
		}
		if (localStorage.getItem("CLastname")) {
			$rootScope.formData.ClinetLastname = localStorage.getItem("CLastname");
		}
		var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
		var date = dateStr[0];
		var month = dateStr[1];
		var year = dateStr[2];
		var NewDate = date + "/" + month + "/" + year;
		var DOB = date + "/" + month + "/" + year;
		localStorage.setItem('DOB', DOB);
		$rootScope.formData.ReferenceNumberDOB = NewDate;
		var userDob = NewDate;
		if (!$rootScope.formData.aadharNumber) {
			$rootScope.formData.aadharAuthorize = 'N';
		}

		if (!$rootScope.formData.ReferenceNumber) {
			var s_url = 'ReferenceNumberClientInfoRegistration';
			var kraClnt = "N";
			if (localStorage.getItem("IsKRA") == 'true') {
				kraClnt = "Y";
			}

			var sendData = {
				Mode: "W",
				IsExisting: $rootScope.formData.IsClone,
				DropReferenceNumber: "",
				FirstName: $rootScope.formData.ClientFirstname,
				MiddleName: $rootScope.formData.ClientMiddlename,
				LastName: $rootScope.formData.ClinetLastname,
				PanNumber: $rootScope.formData.fields.panNumber,
				Email: $rootScope.formData.fields.email,
				DOB: $rootScope.formData.ReferenceNumberDOB,
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
			var tokenParams = {
				'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
				'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
				'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
				'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

			}
			//serverService.apiCall(s_url, sendData).success(function (response) {
			$(".text-animation-area .step2").removeClass().addClass('axremoveText');
			$(".text-animation-area .step3").removeClass().addClass('axTextHide');
			$(".text-animation-area .step4").removeClass('axTextSemiStart').addClass('axTextActive');
			$(".text-animation-area .step4 i").removeClass().addClass('icon icon-circle-check');

			//hide wizard section here
			$rootScope.wizardShow = false;
			//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
			serverService.apiCall(s_url, sendData).success(function (response) {
				$('#paninformation').modal('hide');
				$rootScope.wizardShow = true;
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
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
					localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
					if (response.RefNumber) {
						$rootScope.formData.eRefNumber = response.RefNumber;
						localStorage.setItem("AxNo", response.RefNumber);
					}
					if (response.ReferenceNumber.search("WB") != -1) {

						//$rootScope.UpdateTempPersistence();
						$rootScope.WBTempPersistence();

					} else {
						$rootScope.formData.otherMode = true;
						$('#paninformation').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.formData.panStatus = 'Your account is under process in another mode';
					}

				} else {
					$('#connection').modal('show');
				}

			}).error(function () {
				$('#connection').modal('show');
			});
		} else {
			$rootScope.getDIYStatus();
		}
	}
	$rootScope.ecommerceCKYCValidation = function () {
		if (localStorage.getItem('CKYCResponseData')) {
			$state.go('address', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}
	$rootScope.ecommercekraValidation = function () {
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}
		var surl = "KRAClientValidationupdate";

		var dateStr = ($('#txtDOB').val()) ? $('#txtDOB').datepicker()[0].value.split("/") : localStorage.getItem('DOB').split("/");
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
			Mode: 'W',
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		};
		$('.loader-info.paninfo').css('display', 'block');
		$rootScope.formData.kraChecking = true;
		$rootScope.formData.checkingMessage = "Please wait. We're verifying your KYC details from KRA site.";
		//serverService.apiTokenCall(surl, sendData, tokenParams).success(function (response) {
		serverService.apiCall(surl, sendData).success(function (response) {
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
					localStorage.setItem("IsKRA", false);
					$rootScope.formData.changeAadhar = true;
					$rootScope.formData.changeKRA = true;
					$rootScope.formData.KRA = false;
					$rootScope.krasearch = false;
					$state.go('address', {
						mobile: $rootScope.formData.EncMobile
					});
				} else {
					if ($rootScope.formData.kraData.APP_COR_PINCD) {

						var purl = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_COR_PINCD;
						serverService.getTokenList(purl, tokenParams).then(function (response) {
							//serverService.getList(purl).then(function (response) {
							if (response.IsSuccess) {
								$rootScope.formData.KRA = true;
								$rootScope.krasearch = false;
								localStorage.setItem("IsKRA", true);
								$('.newaddressarea label input[type="checkbox"]').prop('checked', false);
								$('.newaddressarea .icheckbox_minimal').removeClass('checked');

								$rootScope.formData.kraData.APP_COR_STATENAME = response.PincodeList[0].StateName;
								$rootScope.formData.kraData.APP_COR_DISTRICT = response.PincodeList[0].District;

								if ($rootScope.formData.kraData.APP_COR_ADD1 == $rootScope.formData.kraData.APP_PER_ADD1) {
									$rootScope.formData.getSameAddress = true;
									// $rootScope.formData.fields.sameAddress = true;
									$rootScope.formData.kraData.APP_PER_STATENAME = $rootScope.formData.kraData.APP_COR_STATENAME;
									$rootScope.formData.kraData.APP_PER_DISTRICT = $rootScope.formData.kraData.APP_COR_DISTRICT;
									localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
									$rootScope.formData.getKraData = true;
									if ($rootScope.formData.isg) {
										$rootScope.formData.isgProfileSkip = true;
										$rootScope.isgKRA();
									} else {
										$state.go('address', {
											mobile: $rootScope.formData.EncMobile
										});
									}
								} else {
									$rootScope.formData.getSameAddress = false;
									$rootScope.formData.kraPerAdr = true;
									// $rootScope.formData.fields.sameAddress = false;
									if ($rootScope.formData.kraData.APP_COR_PINCD != $rootScope.formData.kraData.APP_PER_PINCD) {
										var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_PER_PINCD;
										serverService.getTokenList(p_url, tokenParams).then(function (response) {
											//serverService.getList(p_url).then(function (response) {
											if (response.IsSuccess) {
												$rootScope.formData.kraData.APP_PER_STATENAME = response.PincodeList[0].StateName;
												$rootScope.formData.kraData.APP_PER_DISTRICT = response.PincodeList[0].District;
												localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
												$rootScope.formData.getKraData = true;
												if ($rootScope.formData.isg) {
													$rootScope.formData.isgProfileSkip = true;
													$rootScope.isgKRA();
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
										localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
										$rootScope.formData.getKraData = true;
										if ($rootScope.formData.isg) {
											$rootScope.formData.isgProfileSkip = true;
											$rootScope.isgKRA();
										} else {
											$state.go('address', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									}
								}

							} else {
								localStorage.setItem("IsKRA", false);
								$rootScope.formData.KRA = false;
								$rootScope.formData.changeKRA = false;
								$rootScope.formData.showUIDAIdetails = true;
								/*$('#NonKRAVerified').modal({
								backdrop: 'static',
								keyboard: true
								})*/
								if ($rootScope.formData.isg) {
									$rootScope.formData.isgProfileSkip = true;
									$rootScope.isgKRA();
								} else {
									$state.go('address', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							}
						});
					} else {
						$rootScope.formData.kraData = response.KRAExistingClientInfo;
						localStorage.setItem("IsKRA", false);
						$rootScope.formData.KRA = false;
						$rootScope.formData.changeKRA = true;
						$state.go('address', {
							mobile: $rootScope.formData.EncMobile
						});
					}
				}
			} else {
				if (response.KRAExistingClientInfo.APP_MiddleName === null || response.KRAExistingClientInfo.APP_MiddleName === 'null') {
					response.KRAExistingClientInfo.APP_MiddleName = '';
				}
				$rootScope.formData.kraData = response.KRAExistingClientInfo;
				localStorage.setItem("IsKRA", false);
				//$rootScope.formData.changeAadhar = true;
				$rootScope.formData.KRA = false;
				$rootScope.formData.changeKRA = true;
				//$rootScope.formData.showUIDAIdetails = true;
				/*$('#NonKRAVerified').modal({
				backdrop: 'static',
				keyboard: true
				})*/
				$state.go('address', {
					mobile: $rootScope.formData.EncMobile
				});
			}

		});
	}

	$rootScope.isgKRA = function () {
		var url = "DIYClientPersonalInfoProfile";
		$rootScope.addressSame = 1;
		if ($rootScope.formData.getSameAddress) {
			$rootScope.addressSame = 0;
		}
		//console.log($rootScope.formData.kraData);
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

		serverService.apiCall(url, sendData).success(function (response) {
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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
				localStorage.setItem('IsKRA', true);
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

	if (localStorage.getItem('RxPan') != null && localStorage.getItem('RxPan') != '') {
		$rootScope.formData.fields.panNumber = localStorage.getItem('RxPan');
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
			Mode: 'W',
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		}

		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}
		//serverService.apiTokenCall(url, sendData, tokenParams).success(function (response) {
		serverService.apiCall(url, sendData).success(function (response) {
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
				localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
				$rootScope.getDIYStatusAPI = false;
				$rootScope.getDIYStatus();
				$rootScope.formData.IsClone = false;
				//$scope.updateRegistration();
				$rootScope.UpdateTempPersistenceResume();
			}

		});
	};

	$interval(function () {
		refNo = $rootScope.formData.ReferenceNumber;
		if (refNo && refNo != '' && refNo != undefined && !$rootScope.formData.IsClone && !$rootScope.formData.applicationDisabled) {
			var s_url = "GetOverallStatusByReferenceNumberWB";
			if (!$rootScope.formData.eRefNumber) {
				$rootScope.formData.eRefNumber = localStorage.getItem('AxNo');
			}
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber
			};

			var tokenParams = {
				'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
				'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
				'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
				'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

			}

			//serverService.apiCall(s_url, sendData).success(function (response) {
			serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
				if (response.IsSuccess) {
					//$rootScope.formData.KRA = false;
					//$rootScope.formData.IsKRAUpdate = 'Y';

					if (response.OverallStatusList[1].SPStatus == 'Y') {
						if (response.OverallStatusList[0].CKYCClient == 'Y') {
							$rootScope.formData.CKYC = true;
							localStorage.setItem('IsCKYC', true);
						} else {
							$rootScope.formData.CKYC = false;
						}
						if (response.OverallStatusList[0].CKYCUpdate == 'Y') {
							localStorage.setItem('IsCKYCUpdate', 'Y')
							$rootScope.formData.changeCKYC = true;
						}

						if (response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
							$rootScope.formData.KRA = true;
							$rootScope.formData.IsKRAUpdate = 'N';
							localStorage.setItem('IsKRA', $rootScope.formData.KRA);
						}

						if (response.OverallStatusList[0].KRAUpdate == 'Y') {
							$rootScope.formData.IsKRAUpdate = 'Y';
							$rootScope.formData.changeKRA = true;
							localStorage.setItem('IsKRAUpdate', 'Y');
							localStorage.setItem('IsKRA', true);
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
							// if(localStorage.getItem('IsKRA') ==  'true' || localStorage.getItem('IsAadharVerified') == 'true'){
							if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
								$rootScope.formData.makePayment = false;
								localStorage.setItem('isPaymentCompleted', true);
							} else {
								if (!$rootScope.formData.NoPayment) {
									$rootScope.formData.makePayment = true;
									localStorage.setItem('isPaymentCompleted', false);
								}
							}
							/* }else{
							$rootScope.formData.makePayment = false;
							localStorage.setItem('isPaymentCompleted', true);
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
			}).catch(function (response) {
				//$window.localStorage.clear();
				//location.reload();
				// $state.go('register')
			})
		}
	}, 180000);

	$rootScope.formData.doLater = function () {
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}
		var url = 'SendSmsDoit';
		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			Stagename: $rootScope.formData.stageOrder
		}
		//  serverService.apiCall(url, sendData);
		serverService.apiTokenCall(url, sendData, tokenParams);

	}

	$rootScope.mobileAssistance = function () {
		$rootScope.formData.assistatnce = true;
	}

});
angular.module('filters-module', [])
.filter('trustAsResourceUrl', ['$sce', function ($sce) {
			return function (val) {
				return $sce.trustAsResourceUrl(val);
			};
		}
	]);
mainApp.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
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
	.state('rmlist', {
		url: '/rmList?mobile',
		templateUrl: 'app/rmList/index.html',
		controller: 'rmController'
	})
	.state('pod', {
		url: '/pod?mobile',
		templateUrl: 'app/pod/index.html',
		controller: 'podController'
	})
	.state('complete', {
		url: '/complete?mobile',
		templateUrl: 'app/complete/index.html',
		controller: 'completeController'
	})

	$urlRouterProvider.otherwise('/register');
});

mainApp.controller('appController', function ($scope, $rootScope, $state, serverService, $location, $window) {
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
		if ($rootScope.formData.ReferKey != null && $rootScope.formData.ReferKey != undefined)
			rk = $rootScope.formData.ReferKey;
		var sendData = {
			NewDIYMode: 'W',
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
			ReferralCode: '',
			EmployeeCode: '',
			CouponCode: '',
			DeviceType: '',
			GeoLatitude: $rootScope.formData.latitude,
			GeoLongitude: $rootScope.formData.longitude,
			RK: rk,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		};

		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}
		serverService.apiCall(s_url, sendData).success(function (response) {
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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
				localStorage.setItem("ReferKey", response.RK);
			}
		}).error(function () {
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
	$rootScope.UpdateTempPersistence = function () {
		var s_url = "WBTempPersistence";

		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			MobileNo: $rootScope.formData.fields.mobile,
			EmailID: $rootScope.formData.fields.email,
			RK: $rootScope.formData.ReferKey,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		};

		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}

		//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function () {
		serverService.apiCall(s_url, sendData).success(function (response) {
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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
			if ($rootScope.formData.threeinone || localStorage.getItem('threeinone') == 'true') {
				$('.modal-backdrop').remove();
				$state.go('address', {
					mobile: $rootScope.formData.EncMobile
				});
			}
			$rootScope.getDIYStatus();

		}).error(function () {
			// serverService.apiCall(s_url, sendData).error(function () {
			$('#connection').modal('show');
		});
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
			$state.go('address', {
				mobile: $rootScope.formData.EncMobile
			});
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

	$rootScope.NonKRAAadharFile = function (event) {}

	$rootScope.DropdownLoad = function () {
		var url = "DIYGetDocumentTypeDropDownList";
		serverService.getList(url).then(function success(response) {
			if (response.DocumentTypeList) {
				for (var n = 0; n < response.DocumentTypeList.length; n++) {
					if (response.DocumentTypeList[n].DocumentCategory == "A") {
						$rootScope.formData.addressTypeList.push(response.DocumentTypeList[n]);
					}
					if (response.DocumentTypeList[n].DocumentCategory == "C") {
						$rootScope.formData.corressDocList.push(response.DocumentTypeList[n]);
					}
					if (response.DocumentTypeList[n].DocumentCategory == "I") {
						$rootScope.formData.foDocumentTypeList.push(response.DocumentTypeList[n]);
					}
				}
			}
		});

		var s_url = "DIYGetProfileInfoDropDownList";

		serverService.getList(s_url).then(function (response) {
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
		serverService.getList(surl).then(function (response) {
			for (var i = 0; i < response.length; i++) {
				$rootScope.formData.countryList.push(response[i]);
			}
		});
	}
	$rootScope.DropdownLoad();
	$rootScope.getDataError = 0;
	if (localStorage.getItem('getDataError') != null) {
		$rootScope.getDataError = localStorage.getItem('getDataError');
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
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}
		serverService.apiTokenCall(url, sendData, tokenParams).success(function (response) {
			$rootScope.formData.getDataApi = false;
			$('.loader-info.paninfo').css('display', 'none');
			if (response.IsSuccess) {
				if (response.ClientDetails.ReferenceNumber) {
					if (response.ClientDetails.ReferenceNumber.search("WB") != -1) {
						$rootScope.formData.ReferenceNumber = response.ClientDetails.ReferenceNumber;
						localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);

						var s_url = "DIYGetRegistrationInfoByReferenceNumber";

						var sendData = {
							ReferenceNumber: $rootScope.formData.ReferenceNumber
						};

						var tokenParams = {
							'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
							'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
							'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
							'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

						}
						// serverService.apiCall(s_url, sendData).success(function (response) {
						serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
							if (response.IsSuccess) {
								$rootScope.formData.fields.panNumber = response.ObjCDIYClientProfile.PanNumber;
								$rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
								$rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
								localStorage.setItem("RxEmail", $rootScope.formData.fields.email);
								localStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);

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
				localStorage.setItem('getDataError', $rootScope.getDataError);
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
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}
		$rootScope.formData.apiLoading = true;
		var url = 'GenerateUnsignedPDF?ReferenceNumber=' + localStorage.getItem('RxReferenceNumber');
		serverService.getTokenList(url, tokenParams).then(function (response) {
			$rootScope.formData.apiLoading = false;
			$state.go('complete', {
				mobile: $rootScope.formData.EncMobile
			});
			setTimeout(function () {
				$('#downloadPOA').modal({
					keyboard: false,
					backdrop: 'static'
				});
			}, 1000)
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
	$(window).scroll(function () {
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
	});

	$rootScope.firstSection = function () {
		$rootScope.getAPI = false;
		$rootScope.pan = true;
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

	$rootScope.profileBTerms = function () {
		$('#ProfileBterms').modal({
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
		serverService.apiCall(url, sendData).success(function (response) {
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
			
				var url = "GetRefNoByPANMobile";
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
			
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).success(function (response) {
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
			}).error(function () {
				$rootScope.formData.apiLoading = false;
				$('#connection').modal('show');
			});
		}
	}

	$rootScope.getExtOTP = function () {
		clearInterval($rootScope.extrunTimer);
		var url = "OTPGenerationnew";
		var sendData = {
			'Mobile': $rootScope.Extmobile,
			'Email': $rootScope.Extemail,
			'MobileFlag': true,
			'EmailFlag': false
		};
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).success(function (getotpResponse) {
			$rootScope.formData.apiLoading = false;
			$rootScope.existingCustomer = false;
			if (getotpResponse.EncryptToken) {
				$rootScope.EncryptToken = getotpResponse.EncryptToken;
			}
			if (getotpResponse.IsSuccess) {
				$rootScope.formData.EncMobile = getotpResponse.EncMobile;
				$rootScope.otpResend = true;
				$rootScope.ExtenableResendButton = false;
				$rootScope.extresendCounter();
				$rootScope.showextotpStatus = true;
				if (getotpResponse.ErrorCode == '600') {
					$rootScope.ExtotpStatus = getotpResponse.SuccessMessage;
					localStorage.setItem('ExistingEmailMobile', 'true');
				} else {
					$rootScope.OtpLimitExceed = false;
					$rootScope.ExtotpStatus = "We have sent one unique OTP to your mobile number";
				}
			}

		});
	}

	$rootScope.validateExtOTP = function () {
		$rootScope.showextotpStatus = false;
		if ($rootScope.formData.fields.ExtOTP) {
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
				"ReferenceNumber": $rootScope.existingeRefNumber
			}
			serverService.apiCall(url, sendData).success(function (response) {
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
				}
				if (response.IsSuccess) {
					$rootScope.existingeRefNumber = response.EncReferenceNumber;
					$rootScope.invalidCustomer = false;
					//$rootScope.existingResponse = true;
					$rootScope.existingCustomer = true;
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
						serverService.apiCall(encryptURL, sendDataURL).success(function (decryptResponse) {
							if (decryptResponse.IsSuccess) {
								$rootScope.Extmobile = decryptResponse.Mobile;
								$rootScope.Extemail = decryptResponse.Email;
								$rootScope.ExtDOB = decryptResponse.DOB;
								$rootScope.ExtpanNumber = decryptResponse.PANNumber;
								$rootScope.ExistingclientName = decryptResponse.ClientName;

								var fullname = $rootScope.ExistingclientName.split(' ');
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
								var s_url = "GetOverallStatusByReferenceNumberWB";
								$rootScope.formData.apiLoading = true;
								var sendData = {
									ReferenceNumber: $rootScope.existingeRefNumber
								};
								serverService.apiCall(s_url, sendData).success(function (statusRresponse) {
									if (statusRresponse.IsSuccess) {
										$rootScope.formData.apiLoading = false;

										if (statusRresponse.OverallStatusList[0].KRAClient == 'Y') {
											$rootScope.formData.KRA = true;

											localStorage.setItem('IsKRA', $rootScope.formData.KRA);
										} else {
											localStorage.setItem('IsKRA', false);
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
											if ($rootScope.formData.CKYC == true && $rootScope.formData.KRA == true) {
												$rootScope.updateDIY();
											} else {
												$rootScope.formData.apiLoading = true;
												var s_url = "DIYGetImagesByReferenceNumber";
												var sendData = {
													ReferenceNumber: $rootScope.existingeRefNumber,
													IsDiy: true,
													EncryptToken: $rootScope.EncryptToken
												}
												serverService.apiCall(s_url, sendData).success(function (response) {
													if (response.IsSuccess) {
														$rootScope.IPVRedirectURL = response.IpvURLEncode;
														
															var ipvOtpUrl = 'IPVOTPGenerationNew';

															$rootScope.existingStatus = 'You are just one step away and complete our In Person Verification (IPV) process';
														
														setTimeout(function () {
															var ipvData = {
																ReferenceNumber: $rootScope.existingRef,
																Mobile: $rootScope.Extmobile,
																BrowserType: $rootScope.formData.browserType
															};
															serverService.apiCall(ipvOtpUrl, ipvData).success(function (response) {
																$rootScope.formData.apiLoading = false;
																var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
																serverService.apiIPVCall(url).success(function (response) {
																	//console.log("Response : " + response);
																});
															});
														}, 4000)

													} else {
														$rootScope.formData.apiLoading = false;
														$state.go('documentUpload', {
															mobile: $rootScope.formData.EncMobile
														});
													}
												})
											}
										} else if (statusRresponse.OverallStatusList[8].SPStatus != 'Y') {
											$rootScope.existingStatus = 'You are just one step away and complete our In Person Verification (IPV) process';
										} else {
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
		$rootScope.formData.ReferenceNumber = $rootScope.existingRef;
		localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
		$rootScope.formData.eRefNumber = $rootScope.existingeRefNumber
			localStorage.setItem("AxNo", $rootScope.formData.eRefNumber);
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
		serverService.apiCall(url, sendData).success(function (response) {
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				var link = document.createElement("a");
				link.download = name;
				link.href = "data:application/pdf;base64," + response.POABase64;
				link.click();
			} else {}
		}).error(function () {
			$rootScope.formData.apiLoading = false;
		})
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
				Mode: 'W',
				Data: '',
				IPAddress: '',
				CreatedBy: "",
				EmailID: $rootScope.formData.fields.email,
				MobileNo: $rootScope.formData.fields.callMobile,
				PanNo: $rootScope.formData.fields.panNumber,
				DateOfBirth: ''
			};
			$rootScope.formData.getDataApi = true;

			serverService.apiCall(s_url, sendData).success(function (response) {
				//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
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
			}).error(function () {
				$('#connection').modal('show');
			});
		}
	}

	$rootScope.formData.callPopup = function () {
		$('#existingCustomer-popup').modal();
	}

	$rootScope.formData.helpPopup = function () {
		$('#call-popup').modal();
		$rootScope.formData.fields.callMobile = '';
		if ($rootScope.formData.ReferenceNumber) {
			$rootScope.formData.fields.callMobile = localStorage.getItem('RxMobile');
		}
	}

	$rootScope.rmLogout = function () {
		$rootScope.formData.ReferenceNumber = '';
		$window.localStorage.clear();
		$window.sessionStorage.clear();
		location.reload();
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
				$window.localStorage.clear();
				$window.sessionStorage.clear();
				location.reload();
				//$state.go('register');
			}, 10000);
		}
	}

	$rootScope.stageCompleted = function () {
		var url = "DIYStageCompletion";
		if (!$rootScope.formData.ReferenceNumber) {
			$rootScope.formData.ReferenceNumber = localStorage.getItem('RxReferenceNumber');
		}
		var sendData = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber,
			"IsStageCompleted": "Completed"
		}
		serverService.apiCall(url, sendData).success(function (response) {
			localStorage.clear();
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

		var tokenParams = {
			'Email': ($rootScope.formData.fields.email != null && $rootScope.formData.fields.email != '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile != null && $rootScope.formData.fields.mobile != '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber != null && $rootScope.formData.fields.panNumber != '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob != null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob != '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),

		}

		serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {

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
		// $window.localStorage.clear();
	}

	$rootScope.extresendCounter = function () {
		$rootScope.ExtResendDisable = true;
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
					$rootScope.ExtResendDisable = false;
					$rootScope.ExtenableResendButton = true;
					clearInterval($rootScope.extrunTimer);
				}
				$rootScope.$apply();
			}, 1000);
	}


	$rootScope.toggleExtPassword = function () {
		$rootScope.typeExtPassword = !$rootScope.typeExtPassword;
	}

	$rootScope.localStorageClear = function () {
		var href = location.href;
		var url = (href.match(/([^\/]*)\/*$/)[1]);
		if (url == 'complete') {
			$window.localStorage.clear();
		}
		location.assign("https://simplehai.axisdirect.in/");
	}

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
