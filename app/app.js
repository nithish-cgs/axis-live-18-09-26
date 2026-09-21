(function (event) {

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
var pathname = window.location.pathname;
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
var mode = (getParameterByName('Mode', url));
var message = (getParameterByName('Message', url));
var ReferenceNumber = (getParameterByName('ReferenceNumber', url));
var signature = (getParameterByName('VCIP', url));
var esign = (getParameterByName('esign', url));
var eSign = (getParameterByName('eSign', url));
var webrm = (getParameterByName('webrm', url));
var webkarvy = (getParameterByName('webkarvy', url));
var pan = (getParameterByName('pan', url));
var panNumber = (getParameterByName('PanNumber', url));
var webfinacle = (getParameterByName('webfinacle', url));
var siddhiApp = (getParameterByName('siddhiApp', url));
var token = (getParameterByName('token', url));
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
var affiliateName = (getParameterByName('Affiliate_Name', url));
var affiliateAcquiredCustomer = (getParameterByName('Affiliate_AcquiredCustomer', url));
var Isrmsign = (getParameterByName('Isrmsign', url));
var digi_interval = null;
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
var suc = (getParameterByName('success', url)) || sessionStorage.getItem('digisuc');;
var tok = (getParameterByName('ref_no', url)) || sessionStorage.getItem('digisTok');;
var forUrl = (getParameterByName('for', url));
var IsPanmismatch = (getParameterByName('IsPanmismatch', url));
var BYOD = (getParameterByName('BYOD', url));
var EsginBYOD = (getParameterByName('EsignBYOD', url));
var mode = 'W';
var rkMode = (getParameterByName('RK', url));
var rkMail = (getParameterByName('EmailID', url));
var rkMobile = (getParameterByName('MobileNo', url));
var rkPlan = (getParameterByName('PlanName', url));
var profile_id = (getParameterByName('profile_id', url));
var IPVSucess = (getParameterByName('IPV', url));
var RMVia = (getParameterByName('Via', url));
if (utm_campaign) {
	sessionStorage.setItem('utm_campaign', utm_campaign);
}
var refno = '';
var aadharOfflineFile = {};
var newLandingPage = getParameterByName('UTM_subsource', url);
var byodEmailVerify = getParameterByName('BYODEmailVerify', url);
var EmailIdbelongingto = getParameterByName('EmailIdbelongingto', url);
var code = (getParameterByName('code', url));
var emailStatus = (getParameterByName('Status', url));
var RMVia = (getParameterByName('Via', url));
// $.ajax({
// 	url: "/config.json",
// 	global: false,
// 	type: 'GET',
// 	data: {},
// 	async: false,
// 	success: function (result) {
// 		key = CryptoJS.enc.Utf8.parse(result.key);
// 		iv = CryptoJS.enc.Utf8.parse(result.key);
// 	}
// });
/* AES key material removed - crypto now goes through the axisCrypto
 * facade, which the build injects into app.min.js before obfuscation.
 * See APPSEC_KEY_REMEDIATION_HANDOVER.md section 2. */
function urlParameter() {
	var url = window.location.href;
	var retObject = {};
	var queryString = url.split('?').slice(1).join('?');
	if (!queryString) {
		return null;
	}

	var parameters = queryString.split(/[&?]/);
	for (var i = 0; i < parameters.length; i++) {
		var pair = parameters[i].split('=');
		if (pair.length === 2) {
			var key = decodeURIComponent(pair[0]);
			var value = decodeURIComponent(pair[1]);
			retObject[key.toLowerCase()] = value;
		}
	}
	var existingParams = JSON.parse(sessionStorage.getItem('searchParams')) || {};
	var updatedParams = { ...existingParams, ...retObject };
	sessionStorage.setItem('searchParams', JSON.stringify(updatedParams));

	return updatedParams;
}

if (location.search) {
	urlParameter();
}

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
var mainApp = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'ui.router', 'ngAria', 'serverComm', 'onlyAlphabets', 'onlyAlphabet', 'onlyDigits', 'ngDecimal', 'alphaNumeric', 'angucomplete', 'angucompleteifsc', 'angucompletecity', 'otpInputDirective', 'alphaSpecial', 'stopCcp', 'ngRightClick', 'restrictSpecialCharacters', 'filters-module', 'angularjs-dropdown-multiselect', 'owlCarousel', 'owlCarouselItem']);
mainApp.run(['$rootScope', '$location', 'serverService', '$state', '$interval', '$window', function ($rootScope, $location, serverService, $state, $interval, $window) {
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
	$rootScope.kravalidsearch = false;
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
	$rootScope.formData.RMReferenceNumber = false;
	$rootScope.formData.rmPopupData = {};
	$rootScope.formData.showChat = false;
	$rootScope.verifyemail = true;
	$rootScope.formData.emailOTPApi = false;
	$rootScope.formData.promocodeList = [];
	$rootScope.diyDown = false;
	$rootScope.askDigiLocker = 'Y';
	$rootScope.digiLockerCount = 0;
	$rootScope.digilockerflow = true;
	$rootScope.profileSpstatus = false;
	$rootScope.amountPayable = false;
	$rootScope.SipCancelation = false;
	$rootScope.vcipByod = false;
	$rootScope.BYOD = false;
	$rootScope.EsginBYOD = false;
	$rootScope.ByodResume = false;
	$rootScope.BYODURl = true;
	$rootScope.BlankSatge = false;
	$rootScope.EsignSpstatus = false;
	$rootScope.rkMode = false;
	$rootScope.fortune = false;
	$rootScope.uBank = false;
	$rootScope.NewLandingPage = false;
	$rootScope.moneyControl = false;
	$rootScope.NewEmailBelongs = "";
	$rootScope.NewDigiLogic = true;
	$rootScope.digiCountError = false;
	$rootScope.digiNameErroMisMatch = false;
	$rootScope.ipvRetakeCount = 0;
	$rootScope.ipvLoader = false;
	$rootScope.rmdesignation = false;
	$rootScope.rmOrganization = false;
	$rootScope.formData.fields.rmDesign = '';
	$rootScope.formData.fields.rmOrganize = '';
	$rootScope.jio = false;
	$rootScope.searchParams = {};
	$rootScope.TradersAppMobile = false;
	$rootScope.newutm = false;
	$rootScope.DifferentlyAbledStatus = '';
	$rootScope.Newutmsour = true;
	$rootScope.CreditCard = false;
	$rootScope.IFCHutm = false;
	$rootScope.nextStage = '';
	$rootScope.redirectLink = '';
	$rootScope.RmButton = true;
	$rootScope.Investrader = false;
	$rootScope.resumejourney = false;
	$rootScope.openApp = false;
	$rootScope.RMBYOD = false;
	$rootScope.SSBank = false;
	$rootScope.tyche = false;
	$rootScope.redirectUrl = '';
	if (utm_source && (utm_source === 'Investor_App' || utm_source === 'Traders_App_Mobile' || utm_source === 'IFCHITTORGARH' || utm_source === 'IPOWATCH' || utm_source === 'BAJAJFINSERV' || utm_source === 'google_search' || utm_source === 'google_dv360' || utm_source === 'tyche-page')) {
		$rootScope.RmButton = false;
		sessionStorage.setItem('utmMoney', utm_source)
	}
	if (utm_source && (utm_source === 'tyche-page')) {
		$rootScope.tyche = true;
		sessionStorage.setItem('utm_source', utm_source)
	}
	if (utm_source && utm_source == "OpenApp") {
		sessionStorage.setItem('OpenApp', utm_source)
		$rootScope.openApp = true;
	}
	if (utm_source === 'Traders_App_Mobile') {

		$rootScope.Investrader = true;
	}

	if (utm_source && utm_source == "TIMES_source") {
		$rootScope.moneyControl = true;
		sessionStorage.setItem('utmMoney', utm_source)
	}
	if (eSign) {
		sessionStorage.setItem('eSign', eSign)
	}
	if (sessionStorage.getItem("utmMoney")) {
		$rootScope.moneyControl = true;
	}
	if (utm_source && (utm_source === 'Investor_App' || utm_source === 'Traders_App_Mobile' || utm_source === 'IFCHITTORGARH' || utm_source === 'IPOWATCH' || utm_source === 'BAJAJFINSERV' || utm_source === 'google_search' || utm_source === 'google_dv360')) {
		$rootScope.newutm = true;
		// if (utm_source == "bing") {
		sessionStorage.setItem('utm_source', utm_source)
		// }

	}
	if (utm_source && utm_source == "Campaign") {
		$rootScope.Newutmsour = true;
		sessionStorage.setItem('Campaign', utm_source)
	}
	if (utm_source && (utm_source === 'Traders_App_Mobile')) {
		$rootScope.TradersAppMobile = true;
		sessionStorage.setItem('utm_source', utm_source)

	}
	if (utm_source && (utm_source === 'IFCHITTORGARH' || utm_source === 'IPOWATCH' || utm_source === 'BAJAJFINSERV')) {
		$rootScope.TradersAppMobile = true;
		$rootScope.IFCHutm = true;
		$rootScope.newutm = true;
		sessionStorage.setItem('utm_source', utm_source)

	}
	if (rkMode) {
		sessionStorage.setItem("rkMode", rkMode);
		$rootScope.rkMode = true;
	}
	if (rkMail) {
		sessionStorage.setItem("rkMail", rkMail)
	}
	if (rkMobile) {
		sessionStorage.setItem("rkMobile", rkMobile);
	}
	if (profile_id) {
		sessionStorage.setItem("profile_id", profile_id);
	}
	if (IPVSucess) {
		sessionStorage.setItem("IPVSucess", IPVSucess);
	}
	if (rkPlan) {
		sessionStorage.setItem("rkPlan", rkPlan);
	}
	if (sessionStorage.getItem("rkMode")) {
		$rootScope.rkMode = true;
	}
	if (utm_campaign && utm_campaign.toLowerCase() == 'b2c_demat_exactphrase_13cities') {
		$rootScope.fortune = true;
	}
	if (utm_bank && (utm_bank.toUpperCase() == "UFS" || utm_bank.toUpperCase() == "UB")) {
		$rootScope.uBank = true;
		sessionStorage.setItem("uBank", 'UFS')
	}
	if (sessionStorage.getItem("uBank")) {
		$rootScope.uBank = true;
	}
	if (RMVia == "RM") {
		sessionStorage.setItem("RMVia", RMVia);
		$rootScope.RMBYOD = true;
	}
	if (sessionStorage.getItem("RMVia")) {
		$rootScope.RMBYOD = true;
	}
	if (newLandingPage) {
		$rootScope.NewLandingPage = true;
		sessionStorage.setItem('NewLandingPage', newLandingPage);
	}
	if (sessionStorage.getItem('NewLandingPage')) {
		$rootScope.NewLandingPage = true;
	}
	if (EmailIdbelongingto) {
		sessionStorage.setItem('EmailIdbelongingto', EmailIdbelongingto);
		$rootScope.NewEmailBelongs = EmailIdbelongingto;
	}
	if (sessionStorage.getItem('searchParams')) {
		$rootScope.searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
	}
	if ($rootScope.searchParams.utm_source === "Traders_App_Mobile" || $rootScope.searchParams.utm_source === 'Investor_App' || utm_source === 'google_search' || utm_source === 'google_dv360') {
		$rootScope.newutm = true;
	}
	if ($rootScope.searchParams.utm_source === "JIO") {
		$rootScope.jio = true;
	}
	if ($rootScope.searchParams.utm_source === "CreditCard") {
		$rootScope.CreditCard = true;
	}
	if ($rootScope.searchParams.couponcode) {
		sessionStorage.setItem('coupon', $rootScope.searchParams.couponcode)
	}

	if ($rootScope.diyDown) {
		var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
			backdrop: 'static',
			keyboard: false
		});
		APIResponseModal.show();
		$rootScope.apiResponseErrorMsg = "NSDL services are down for technical reasons, and you may face some issues or delay in getting OTP. Our team is working with NSDL on the same and will resolve it shortly. Thanks for your patience and cooperation.";
		return false;
	}

	var searchObject = $location.search();
	if (sessionStorage.getItem('AxToken') != null) {
		$rootScope.EncryptToken = sessionStorage.getItem('AxToken');
	}
	// if(sessionStorage.getItem('digilockerflow')=="true"){
	// 	$rootScope.digilockerflow=true;
	// }
	if (webrm && webrm.toLowerCase() == 'true') {
		$rootScope.webrm = true;
	} else {
		$rootScope.webrm = false;
	}
	if (signature == "true") {
		sessionStorage.setItem('signature', signature);
		$rootScope.vcip = true;
	}
	if (referral_code) {
		sessionStorage.setItem('referral_code', referral_code);
		$rootScope.refcodeShow = true;
	}
	if (byodEmailVerify) {
		sessionStorage.setItem('byodVerifyEmail', true);
	}
	if (BYOD == "true") {
		$rootScope.BYOD = true;
		sessionStorage.setItem('BYOD', $rootScope.BYOD);
	}
	if (EsginBYOD == "true") {
		$rootScope.EsginBYOD = true;
		sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
		$rootScope.BYODURl = false;
	}
	if (sessionStorage.getItem('BYOD') == 'true') {
		$rootScope.BYOD = true;
		$rootScope.ByodResume = true;
	}
	if (sessionStorage.getItem('EsginBYOD') == 'true') {
		$rootScope.EsginBYOD = true;
		sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
		$rootScope.BYODURl = false;
	}
	if (forUrl == "SIPCancel") {
		$rootScope.SipCancelation = true;
		sessionStorage.setItem('SipCancelation', $rootScope.SipCancelation);
		sessionStorage.setItem('Siptoken', token);
	}
	if ((webkarvy && webkarvy.toLowerCase() == 'true') || $rootScope.webkarvy) {
		window.location.replace('register')
		// $rootScope.webkarvy = true;
		// $rootScope.emailMobile = false;
		// $rootScope.pan = false;
		// $rootScope.webKarvyShow = true;
	} else {
		$rootScope.webkarvy = false;
	}

	$rootScope.getJanaDetails = function () {
		var url = "GetJanaBankBasicInfoEnc";
		if (panNumber) {
			var panData = panNumber
		} else if ($rootScope.PanNumberEnc) {
			var panData = $rootScope.PanNumberEnc
		}
		var sendData = {
			PanNumber: panData
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
				$rootScope.formData.fields.username = response.BasicInfoData[0].CustomerName;
				sessionStorage.setItem('janaData', JSON.stringify(response.BasicInfoData[0]));
				if (!$rootScope.secondCompleted) {
					$rootScope.formData.fields.email = response.BasicInfoData[0].EmailId;
					if ($rootScope.formData.fields.email) {
						$rootScope.profileBEmailDisabled = true;
					}
					sessionStorage.setItem('RxEmail', response.BasicInfoData[0].EmailId);
					$rootScope.formData.fields.mobile = response.BasicInfoData[0].MobileNumber;
					sessionStorage.setItem('RxMobile', response.BasicInfoData[0].MobileNumber);
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
		})
	}

	// $rootScope.getBankLogo = function () {
	// 	var s_url = "DIYGetThirdpartyBankImages";
	// 	serverService.getApi(s_url).then(function (a) {
	// 		var response = a.data;
	// 		if ((utm_bank && response.ImagesList.length != 0) || $rootScope.webJana) {
	// 			angular.forEach(response.ImagesList, function (value, key) {
	// 				if (value.BankShortCode =="SVCB"||value.BankShortCode =="SSWB") {
	// 								$rootScope.SSBank=true
	// 					}
	// 				if ($rootScope.webJana) {
	// 					if (value.BankShortCode == 'JFSB') {
	// 						$rootScope.bgImgDesktop = {
	// 							"background-image": "url(data:image/jpeg;base64," + value.Base64ImageStr + ")",
	// 							"background-size": "cover"
	// 						}

	// 						$rootScope.bgImgMobile = {
	// 							"background-image": "url(data:image/jpeg;base64," + value.MobileBase64ImageStr + ")",
	// 							"background-size": "cover"
	// 						}

	// 						$rootScope.bgImg = $rootScope.bgImgDesktop;
	// 						if (window.innerWidth < 415) {
	// 							$rootScope.bgMobile = true;
	// 							$rootScope.bgImg = $rootScope.bgImgMobile;
	// 						}
	// 					}
	// 				} else if (value.BankShortCode == utm_bank) {
	// 					$rootScope.bgImgDesktop = {
	// 						"background-image": "url(data:image/jpeg;base64," + value.Base64ImageStr + ")",
	// 						"background-size": "cover"
	// 					}

	// 					$rootScope.bgImgMobile = {
	// 						"background-image": "url(data:image/jpeg;base64," + value.MobileBase64ImageStr + ")",
	// 						"background-size": "cover"
	// 					}

	// 					$rootScope.bgImg = $rootScope.bgImgDesktop;
	// 					if (window.innerWidth < 415) {
	// 						$rootScope.bgMobile = true;
	// 						$rootScope.bgImg = $rootScope.bgImgMobile;
	// 					}
	// 				}
	// 			});
	// 		}
	// 	})
	// }

	$rootScope.getBankLogo = function () {
		var s_url = "DIYGetThirdpartyBankImages";
		serverService.getApi(s_url).then(function (a) {
			var response = a.data;
			if ((utm_bank && response.ImagesList.length != 0) || $rootScope.webJana) {
				angular.forEach(response.ImagesList, function (value, key) {
					if (value.BankShortCode == "SVCB" || value.BankShortCode == "SSWB") {
						$rootScope.SSBank = true;
					}
					if ($rootScope.webJana) {
						if (value.BankShortCode == 'JFSB') {
							$rootScope.bgImgDesktop = {
								"background-image": "url(data:image/jpeg;base64," + value.Base64ImageStr + ")",
								"background-size": "cover"
							};
							$rootScope.bgImgMobile = {
								"background-image": "url(data:image/jpeg;base64," + value.MobileBase64ImageStr + ")",
								"background-size": "cover"
							};
							$rootScope.bgImg = $rootScope.bgImgDesktop;
							if (window.innerWidth < 415) {
								$rootScope.bgMobile = true;
								$rootScope.bgImg = $rootScope.bgImgMobile;
							}
						}
					} else if (value.BankShortCode == utm_bank) {

						var imgType = (value.BankShortCode == "SVCB")
							? "image/svg+xml"
							: "image/jpeg";

						$rootScope.bgImgDesktop = {
							"background-image": "url(data:" + imgType + ";base64," + value.Base64ImageStr + ")",
							"background-size": "cover"
						};

						$rootScope.bgImgMobile = {
							"background-image": "url(data:" + imgType + ";base64," + value.MobileBase64ImageStr + ")",
							"background-size": "cover"
						};

						$rootScope.bgImg = $rootScope.bgImgDesktop;

						if (window.innerWidth < 415) {
							$rootScope.bgMobile = true;
							$rootScope.bgImg = $rootScope.bgImgMobile;
						}
					}
				});
			}
		});
	};

	if (isCMLMandatory) {
		sessionStorage.setItem('isCMLMandatory', isCMLMandatory);
	}
	if (referral_code) {
		sessionStorage.setItem('referral_code', referral_code);
	}

	if (Utm_promoCode) {
		sessionStorage.setItem('utm_promoCode', Utm_promoCode);
	}

	if (utm_bank) {
		$rootScope.getBankLogo();
	}
	if (code && emailStatus == 'Y') {

		if (sessionStorage.getItem('RxEmail')) {
			$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail')
		}
		if (sessionStorage.getItem('RxMobile')) {
			$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile')
		}
		if (sessionStorage.getItem('encryToken')) {
			$rootScope.EncryptToken = sessionStorage.getItem('encryToken')
		}
		sessionStorage.setItem('googleEmailVerify', true);
		if (sessionStorage.getItem('utm_source')) {
			utm_source = sessionStorage.getItem('utm_source');
			if (utm_source && (utm_source == "Campaign" || utm_source == "open-an-account")) {
				$rootScope.Newutmsour = true;
			}
		}
		if (sessionStorage.getItem('utm_medium')) {
			utm_medium = sessionStorage.getItem('utm_medium');
		}
		if (sessionStorage.getItem('utm_campaign')) {
			utm_campaign = sessionStorage.getItem('utm_campaign');
		}
		if ($rootScope.formData.fields.email) {
			$rootScope.formData.fields.email = $rootScope.formData.fields.email
		} else {
			$rootScope.formData.fields.email = "";
		}
		// $rootScope.UpdateTempPersistenceResume();
		var url = 'GetRequestToken?Mail=' + $rootScope.formData.fields.email + '&Code=' + code;
		serverService.getApi(url).then(function (data) {
			var response = data.data;
			if (response.IsSuccess) {
				$rootScope.formData.apiLoading = true;
				$('#googleEmailVerifytoast').toast('show');
				setTimeout(function () {
					$('#googleEmailVerifytoast').toast('hide');
				}, 3000);
				sessionStorage.setItem('Gmailverify', "Y")
				sessionStorage.setItem('EmailENC', response.EmailENC)
				$rootScope.pan = true;
				$rootScope.emailMobile = false;
				$rootScope.emailMobileMenuShow = false;
				$rootScope.wizardShow = true;
				$rootScope.profileBEmailDisabled = true;
				$rootScope.formData.stageInfo = '1a';
				if (response.Email) {
					$rootScope.formData.fields.email = response.Email;
					sessionStorage.setItem('RxEmail', response.Email)
					$rootScope.verifyemail = true;
				}
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
				$rootScope.formData.stageInfo = '1b';
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
				sessionStorage.setItem('Username', $rootScope.formData.fields.username); sessionStorage.setItem('User_City', $('#city_value').val());
				dataLayer.push({
					event: 'StageChange',
					attributes: {
						'level complete': '1a',
						'email': $rootScope.formData.fields.email,
						'mobile': $rootScope.formData.fields.mobile
					}
				});
				if (!$rootScope.Newutmsour) {
					$rootScope.UpdateTempPersistenceResume();
				} else {
					$rootScope.emailvalidatenew();
				}

			} else {
				// $('#googleEmailVerifyFailedtoastError').toast('show');
				// setTimeout(function () {
				// 	$('#googleEmailVerifyFailedtoastError').toast('hide');
				// }, 3000);
				// $rootScope.pan = true;
				// $rootScope.emailMobile = false;
				// $rootScope.emailMobileMenuShow = false;
				// $rootScope.wizardShow = true;
				// $rootScope.formData.stageInfo = '1a';
				// $('.stage-nav li').removeClass('active');
				// $('.step1').addClass('active');
				// setTimeout(function () {
				// 	$("#txtDOB").datepicker({
				// 		changeMonth: true,
				// 		changeYear: true,
				// 		maxDate: "-18Y",
				// 		dateFormat: 'dd/mm/yy',
				// 		yearRange: "-200: -18",
				// 		onSelect: function () {
				// 			$('#txtDOB').removeClass('ng-empty');
				// 			$('#txtDOB').addClass('ng-not-empty');
				// 		}
				// 	});
				// 	$("#txtDOB").datepicker("option", "showAnim", "blind");
				// 	$rootScope.UpdateTempPersistenceResume();
				// }, 1000);
				var EmailHome = new bootstrap.Modal(document.getElementById('EmailHome'), {
					backdrop: 'static',
					keyboard: false
				})
				EmailHome.show()
				$rootScope.EmailErrHome = response.ErrorMessage;
			}
		})
		if (sessionStorage.getItem('search') && !code && emailStatus == 'N') {
			const origin = window.location.origin;
			const pathname = window.location.pathname;
			const search = sessionStorage.getItem('search');
			sessionStorage.removeItem('search');
			const fullurl = origin + pathname + search;
			window.location.assign(fullurl);
		} else {
			$location.url($location.path());
		}
	} else if (!code && emailStatus == 'N') {
		// if(sessionStorage.getItem('SbEmail')){
		// 	$rootScope.formData.fields.email = sessionStorage.getItem('SbEmail')
		// }
		// if(sessionStorage.getItem('SbMobile')){
		// 	$rootScope.formData.fields.mobile = sessionStorage.getItem('SbMobile')
		// }
		// if(sessionStorage.getItem('encryToken')){
		// 	$rootScope.EncryptToken = sessionStorage.getItem('encryToken')
		// }
		// $('#googleEmailVerifyFailedtoastError').toast('show');

		// setTimeout(function () {
		// 	$('#googleEmailVerifyFailedtoastError').toast('hide');
		// }, 3000);
		// $rootScope.pan = true;
		// $rootScope.emailMobile = false;
		// $rootScope.emailMobileMenuShow = false;
		// $rootScope.wizardShow = true;
		// $rootScope.formData.stageInfo = '1a';
		// $('.stage-nav li').removeClass('active');
		// $('.step1').addClass('active');
		// setTimeout(function () {
		// 	$("#txtDOB").datepicker({
		// 		changeMonth: true,
		// 		changeYear: true,
		// 		maxDate: "-18Y",
		// 		dateFormat: 'dd/mm/yy',
		// 		yearRange: "-200: -18",
		// 		onSelect: function () {
		// 			$('#txtDOB').removeClass('ng-empty');
		// 			$('#txtDOB').addClass('ng-not-empty');
		// 		}
		// 	});
		// 	$("#txtDOB").datepicker("option", "showAnim", "blind");
		// 	$rootScope.UpdateTempPersistenceResume();
		// }, 1000);
		// if(sessionStorage.getItem('search')){
		// 	const origin = window.location.origin;
		// 	const pathname = window.location.pathname;
		// 	const search = sessionStorage.getItem('search');
		// 	sessionStorage.removeItem('search');
		// 	const fullurl = origin + pathname + search;
		// 	window.location.assign(fullurl);
		// }
		var EmailHome = new bootstrap.Modal(document.getElementById('EmailHome'), {
			backdrop: 'static',
			keyboard: false
		})
		EmailHome.show()
		$rootScope.EmailErrHome = "Oops! Problem in verifying Google mail";
	}

	$rootScope.setBgImg = function () {

		if ((utm_bank || $rootScope.webJana) && window.innerWidth < 415) {
			$rootScope.bgMobile = true;
			$rootScope.bgImg = $rootScope.bgImgMobile;
		} else if ((utm_bank || $rootScope.webJana) && window.innerWidth > 416) {
			$rootScope.bgMobile = false;
			$rootScope.bgImg = $rootScope.bgImgDesktop;
		}
	}

	window.addEventListener('resize', $rootScope.setBgImg);

	if (UTM_bank && DP && CustomerName && jMobile && jEmail && jDOB && AccountNumber && IFSCCode && MICRCode) {
		$rootScope.janabank = true;
		$rootScope.emailMobile = false;
		$rootScope.pan = true;
		sessionStorage.setItem('JanaBank', true);
		sessionStorage.setItem('UTM_bank', UTM_bank);
		sessionStorage.setItem('DP', DP);
		sessionStorage.setItem('CustomerName', CustomerName);
		sessionStorage.setItem('jMobile', jMobile);
		sessionStorage.setItem('jPanNumber', jPanNumber);
		sessionStorage.setItem('jEmail', jEmail);
		sessionStorage.setItem('jDOB', jDOB);
		sessionStorage.setItem('AccountNumber', AccountNumber);
		sessionStorage.setItem('IFSCCode', IFSCCode);
		sessionStorage.setItem('MICRCode', MICRCode);
	}

	if ((webfinacle && webfinacle.toLowerCase() == 'true') || $rootScope.webfinacle) {

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
					$rootScope.ibjourney = true;
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
					if (response.IsvalidIBAccount == false) {
						$rootScope.formData.apiLoading = false;
						$window.localStorage.clear()
						$window.sessionStorage.clear();
						$state.go('register');
					}
					else {
						$rootScope.webfinacle = true;
						$rootScope.emailMobile = false;
						$rootScope.pan = true;
						mode = 'I';
						if (response.IsSuccess) {
							$rootScope.formData.apiLoading = false;
							$('#pan').prop('disabled', true)
							$('#txtDOB').prop('disabled', true)
							if (response.Pan) {
								$rootScope.formData.fields.panNumber = response.Pan;
								$('#pan').prop('disabled', true)
								$('#txtDOB').prop('disabled', true)
							}
							if (response.DecryptString) {
								var info = (JSON.parse(response.DecryptString));
								var d = info.responseBody.basicInfo.dateOfBirth.split('-');
								setTimeout(function () {
									$('#txtDOB').val(d[2] + '/' + d[1] + '/' + d[0]);
									$('#pan').prop('disabled', true)
									$('#txtDOB').prop('disabled', true)
								}, 1000)
								$rootScope.formData.fields.username = info.responseBody.basicInfo.customerName;
								if ($rootScope.formData.fields.username) {
									setTimeout(function () {
										$('#panCName').prop('disabled', true)
									}, 1000)
								}
							}
							if (utm_source || utm_medium || utm_campaign || utm_term || utm_content) {
								$rootScope.UpdateTempPersistenceResume()
							}
							if (token) {
								var aurl = 'DecryptSiddhiUTM?token=' + token;
								$rootScope.formData.apiLoading = true;
								serverService.getApi(aurl).then(function (a) {
									$rootScope.formData.apiLoading = false;
									var response = a.data;
									if (response.IsSuccess) {
										$rootScope.siddhiApp = true;
										sessionStorage.setItem('siddhiApp', true);
										sessionStorage.setItem('siddhiAppresume', true);
										$rootScope.siddhiAppresume = true;
										utm_medium = response.UTMMedium;
										utm_source = response.UTMSource;
										$rootScope.formData.assistedLCCode = response.LCCode
										$rootScope.formData.assistedLGCode = response.LGCode
										$rootScope.formData.promoCode = response.PromoCode
										$rootScope.UpdateTempPersistenceResume();
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
										$rootScope.siddhiApp = false;
									}
								});
							}
						} else {
							$rootScope.formData.apiLoading = false;
						}
					}

				})
			}
		}, 1000)

	} else {
		$rootScope.webfinacle = false;
	}
	if ((siddhiApp && siddhiApp.toLowerCase() == 'true') || $rootScope.siddhiApp) {

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
			if (token) {
				var aurl = 'DecryptSiddhiUTM?token=' + token;
				$rootScope.formData.apiLoading = true;
				serverService.getApi(aurl).then(function (a) {
					var response = a.data;
					// $rootScope.ibjourney = true;
					if (response.IsvalidIBAccount == false) {
						$rootScope.formData.apiLoading = false;
						$window.localStorage.clear()
						$window.sessionStorage.clear();
						$state.go('register');
					}
					else {
						$rootScope.siddhiApp = true;
						$rootScope.emailMobile = false;
						$rootScope.pan = true;
						// mode = 'I';
						if (response.IsSuccess) {
							$rootScope.formData.apiLoading = false;
							sessionStorage.setItem('siddhiApp', true);
							sessionStorage.setItem('siddhiAppresume', true);
							$rootScope.siddhiAppresume = true;
							utm_medium = response.UTMMedium;
							utm_source = response.UTMSource;
							$rootScope.formData.assistedLCCode = response.LCCode
							$rootScope.formData.assistedLGCode = response.LGCode
							$rootScope.formData.promoCode = response.PromoCode
							$('#pan').prop('disabled', true)
							// $('#txtDOB').prop('disabled', true)
							if (response.PAN) {
								$rootScope.formData.fields.panNumber = response.PAN;
								$('#pan').prop('disabled', true)
								// $('#txtDOB').prop('disabled', true)
							}
							setTimeout(function () {
								$('#pan').prop('disabled', true)
							}, 1000)
							$rootScope.UpdateTempPersistenceResume();
							// if (response.DecryptString) {
							// 	var info = (JSON.parse(response.DecryptString));
							// 	var d = info.responseBody.basicInfo.dateOfBirth.split('-');
							// 	setTimeout(function () {
							// 		$('#txtDOB').val(d[2] + '/' + d[1] + '/' + d[0]);
							// 		$('#pan').prop('disabled', true)
							// 		$('#txtDOB').prop('disabled', true)
							// }, 1000)
							// }
						} else {
							$rootScope.formData.apiLoading = false;
							$rootScope.SiddhiErr = response.ErrorMessage;
							var siddhi = new bootstrap.Modal(document.getElementById('siddhi'));
							siddhi.show();
						}
					}

				})
			}
		}, 1000)

	} else {
		$rootScope.siddhiApp = false;
	}
	$rootScope.clearParameters = function () {
		$location.search('siddhiApp', null);
		$location.search('token', null);
		$location.url($location.path());
		setTimeout(function () {
			location.reload();
		}, 500)

	}



	$rootScope.siddhiapp = function () {
		$window.localStorage.clear()
		$window.sessionStorage.clear();
		$rootScope.clearParameters();


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
		// Create a new worker
		var blob = new Blob([document.querySelector('#worker-code').textContent]);
		var worker = new Worker(window.URL.createObjectURL(blob));
		worker.onmessage = function () {
			if ($rootScope.formData.RMModule) {
				$rootScope.CheckIdleTime();
			}
		};
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
			setTimeout(() => {
				$state.go('rmPage')
			}, 0);
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

	$rootScope.formData.fields.mobileExtn = "+91";

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var Browser_Name = navigator.appName;
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
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}, false);
	$window.addEventListener("online", function () {
		$rootScope.$apply(function () {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.hide();
		});
	}, false);

	$rootScope.updateDIY = function () {

		$('#existingCustomer-popup').modal('hide');
		var s_url = "DIYUpdateIPVStage";
		var refNo = $rootScope.formData.ReferenceNumber || sessionStorage.getItem('RxReferenceNumber');
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
				gtag('event', 'conversion', {
					'send_to': 'AW-727858862/nWWNCK29vtcaEK79iNsC',
					'value': 1.0,
					'currency': 'INR'
				});

				$state.go('complete', {
					mobile: $rootScope.formData.EncMobile
				});
			}

		});
	}
	$rootScope.updateSip = function () {
		var url = "SIPModifications"
		var sendData = {
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"Inprogress": true,
		}
		serverService.apiCall(url, sendData).then(function (data) {
			var response = data.data;
		});
	}
	$rootScope.dobEdit = function () {

		$rootScope.emailMobile = false;
		$rootScope.pan = true;
		$state.go('register', {
			mobile: $rootScope.formData.EncMobile
		});
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
		}, 1000)
	}

	$rootScope.getDIYStatus = function () {
		if (!$rootScope.getDIYStatusAPI || $rootScope.kravalidsearch) {
			$rootScope.getDIYStatusAPI = true;
			if (sessionStorage.getItem('skippedPayment')) {
				$rootScope.formData.skippedPayment = sessionStorage.getItem('skippedPayment')
			}

			var s_url = "GetOverallStatusDIY";
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
				$rootScope.siddhiApp = response.SiddhiApp
				sessionStorage.setItem('siddhiApp', $rootScope.siddhiApp);
				sessionStorage.setItem('mode', response.Mode);
				$rootScope.askDigiLocker = response.Digilocker;
				$rootScope.digiLockerCount = response.DigilockerCount;
				$rootScope.digiReferenceNumber = response.DigiReferenceNumber;
				$rootScope.BankEboStatus = response.OverallStatusList[3].EBOStatus;
				$rootScope.digiOption = response.Digioption;
				$rootScope.digilockerflow = response.DigiLockerSkip;
				$rootScope.ipvRetakeCount = response.RetakeMaxCount;
				$rootScope.DifferentlyAbledStatus = response.DifferentlyAbledStatus;
				if (response.DigiAadhar) {
					sessionStorage.setItem('DigiAadhar', response.DigiAadhar.substring(8, 12))
				}
				if ($rootScope.DifferentlyAbledStatus === 'Y') {
					$rootScope.formData.apiLoading = false;
					$('#existingCustomer-popup').modal('hide');
					const ele = document.getElementById('OverallDisabilityModal');
					var m = new bootstrap.Modal(ele, {
						backdrop: 'static',
						keyboard: false
					});
					m.show();
					return;
				}
				if (response.OverallStatusList[0].KRAClient == 'Y' && response.OverallStatusList[0].CKYCClient == 'Y') {
					$rootScope.digilockerflow = false;
				}
				// if(response.OverallStatusList[9]){
				$rootScope.EsignSpstatus = response.OverallStatusList[9].SPStatus == "Y" ? true : false;
				// }
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
				if (response.Digioption == 'DL' && response.Digilocker == 'Y' && response.DigiReferenceNumber) {
					$rootScope.formData.digiData = true;
				}
				$rootScope.profileSpstatus = response.OverallStatusList[1].SPStatus == "Y" ? true : false;
				if (response.Mode == 'I' && response.OverallStatusList[0].CKYCClient == 'Y') {
					$rootScope.digilockerflow = false;
					$rootScope.formData.CKYC = true;
					sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
				}
				if (response.OverallStatusList[7].SPStatus != "Y") {
					$rootScope.formData.skippedPayment = false;
				}
				if ((response.OverallStatusList[1].SPStatus != 'Y' || response.OverallStatusList[4].SPStatus != 'Y') && (response.Digioption == 'DL' && response.Digilocker == 'Y') && response.DigiReferenceNumber && !$rootScope.profileSpstatus) {
					$rootScope.fetchDigilokcerDetails(response.DigiReferenceNumber);
					/*$rootScope.formData.digiData = true;
					sessionStorage.setItem('digi', true);*/
				}
				if ((response.OverallStatusList[1].SPStatus != 'Y' || response.OverallStatusList[4].SPStatus != 'Y') && (response.Digioption == 'DL' || response.Digilocker == 'Y') && $rootScope.formData.RMModule && !$rootScope.profileSpstatus) {
					$rootScope.fetchDigilokcerDetails(response.DigiReferenceNumber);
					/*$rootScope.formData.digiData = true;
					sessionStorage.setItem('digi', true);*/
				}
				if (response.Mode && response.Mode == 'J') {
					$rootScope.webJana = true;
					$rootScope.getJanaDetails();
					$rootScope.getBankLogo()
				} else if (!$rootScope.EsginBYOD) {
					if (((response.Mode && response.Mode == 'B') || ($rootScope.BYOD)) && ($rootScope.ByodResume)) {
						$rootScope.formData.apiLoading = false;
						$rootScope.BYOD = true;
						$state.go('Byod')
						return;
					}
				} else if (response.Mode && response.Mode == 'V') {
					$rootScope.vcip = true;
					$rootScope.digilockerflow = false;
				} else if (response.Mode && (response.Mode == 'I' || response.Mode == 'MB')) {
					$rootScope.webfinacle = true;
					$rootScope.formData.DecryptURL = $rootScope.formData.eRefNumber;
					if (response.OverallStatusList[3].SPStatus != 'Y') {
						$rootScope.getIBInfo($rootScope.formData.fields.panNumber);
					} else {
						$rootScope.fourthCompleted = true;
					}
					$rootScope.decryptUrl();
				}
				if (response.Mode && response.Mode == 'B') {
					$rootScope.BYOD = true;
					// $rootScope.digilockerflow=false;
				}
				if (!$rootScope.vcip) {
					$('#paninformation').modal('hide');
					$(document.body).removeClass('modal-open');
					$('.modal-backdrop').remove();
				}
				$rootScope.formData.apiLoading = false;
				//$rootScope.formData.KRA = false;
				if (response.RMModule == "Y") {
					$rootScope.formData.RMModuleDocs = true;
				}
				if (response.RMTeam) {
					sessionStorage.setItem('RMTeam', response.RMTeam);
					$rootScope.formData.RMTeam = response.RMTeam;
				}
				if (response.RefNumber) {
					$rootScope.formData.eRefNumber = response.RefNumber;
				}

				if (response.DOBChangeFlag && (response.Mode.toLowerCase() == 'sa' || response.Mode.toLowerCase() == 'wb' || response.Mode.toLowerCase() == 'r' || response.Mode.toLowerCase() == 'wr')) {
					$rootScope.dobFreeze = false;
				} else {
					$rootScope.dobFreeze = true;
				}
				if (response.IsAxisbankcust == 'Y') {
					$rootScope.isAxisBankDetailShow = true;
				}
				if (response.OverallStatusList[0].Remarks == 'Purged' && response.OverallStatusList[0].StatusID == '54') {
					$rootScope.apiResponseErrorMsg = "Your Account was Purged.";
					$rootScope.formData.btnOk = false;
					$rootScope.finNRI = false;
					var APIResponsePopup = new bootstrap.Modal(document.getElementById('APIResponse'), {
						backdrop: 'static',
						keyboard: false
					});
					APIResponsePopup.show();
					return false;
				}
				if (response.OverallStatusList[6].SPStatus == 'Y') {
					$rootScope.activation = true;
					var onboardsuccess = new bootstrap.Modal(document.getElementById('onboard-success'), {
						backdrop: 'static',
						keyboard: false
					});
					onboardsuccess.show();
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
					$rootScope.sipcompleted = true;

					return false
				}
				//angular.forEach(response.OverallStatusList, function (value, key) {});
				$rootScope.formData.ReferenceNumber = response.OverallStatusList[0].ReferenceNumber;
				sessionStorage.setItem('RxReferenceNumber', $rootScope.formData.ReferenceNumber);
				$rootScope.formData.docStageCompleted = response.OverallStatusList[0].IsDocstagePartiallyCompleted;
				if (response.OverallStatusList[7].SPStatus == 'Y' && $rootScope.formData.RMModule) {
					$rootScope.formData.RMReferenceNumber = true;
				}
				if ($rootScope.formData.fields.email && response.OverallStatusList[0].IsEmailVerified == true) {
					$rootScope.verifyemail = false;
					$rootScope.verifyOTPSuccess = true;
					$rootScope.verifyEmailDiv = false;
				} else {
					$rootScope.verifyemail = true;
					$rootScope.verifyEmailDiv = true;
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
					if (response.OverallStatusList[7].SPStatus != 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT' && !$rootScope.amountPayable) {
						$rootScope.formData.makePayment = false;
					}
					else if (!$rootScope.formData.NoPayment) {
						$rootScope.formData.makePayment = true;
						$rootScope.formData.isPaymentCompleted = false;
						sessionStorage.setItem('isPaymentCompleted', false);
					}
				}

				$rootScope.formData.applicationDisabled = false;
				setTimeout(function () {
					$rootScope.getAPI = false;
				}, 500);
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
					$rootScope.sipcompleted = true;
					var onboardsuccess = new bootstrap.Modal(document.getElementById('onboard-success'), {
						backdrop: 'static',
						keyboard: false
					});
					onboardsuccess.show();
				} else if (response.OverallStatusList[0].EBOStatus == 'R' || response.OverallStatusList[0].SPStatus != 'Y') {
					$rootScope.panStage = true;
					$rootScope.formData.aadharhide = false;
					if (response.OverallStatusList[0].EBOStatus == 'R') {
						$rootScope.getAPI = false;
					}
					$state.go('register', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[1].EBOStatus == 'R' || response.OverallStatusList[1].SPStatus != 'Y') {
					$rootScope.firstCompleted = true;
					$rootScope.wizardShow = true;
					if (response.OverallStatusList[1].EBOStatus == 'R') {
						$rootScope.profileRejected = true;
						sessionStorage.setItem('byodProfileReject', 'Y');
					}

					if ((response.Digioption != 'DL' || response.Digilocker == 'N') && response.OverallStatusList[0].KRAClient == 'Y' && (response.OverallStatusList[0].KRAUpdate == 'N' || response.OverallStatusList[0].KRAUpdate == '')) {
						$rootScope.formData.KRA = true;
						sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
						$rootScope.ecommercekraValidation();
					} else if ((response.Digioption != 'DL' || response.Digilocker == 'N') && response.OverallStatusList[0].CKYCClient == 'Y' && response.OverallStatusList[0].KRAClient == '') {
						$rootScope.formData.CKYC = true;
						sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
						$rootScope.ecommercekraValidation();
					} else if ((response.Digioption != 'DL' && response.Digilocker == 'N') && response.OverallStatusList[0].CKYCClient == 'Y' && (response.OverallStatusList[0].CKYCUpdate == 'N' || response.OverallStatusList[0].CKYCUpdate == '')) {
						$rootScope.formData.CKYC = true;
						sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
						$rootScope.ecommerceCKYCValidation();
					} else if ((response.Digioption != 'DL' || response.Digilocker == 'N') && response.OverallStatusList[0].KRAClient == '') {
						$rootScope.ecommercekraValidation();
					} else if ((response.Digioption != 'DL' || response.Digilocker == 'N') && response.OverallStatusList[0].CKYCClient == '') {
						$rootScope.ecommerceCKYCValidation();
					} else {
						if (response.OverallStatusList[1].EBOStatus == 'R') {
							$rootScope.getAPI = false;
						}
						if (!$rootScope.dobFreeze) {
							$rootScope.dobEdit();
						} else {
							if ((response.Digioption == 'DL' && response.Digilocker == 'Y') && response.DigiReferenceNumber && !$rootScope.profileSpstatus) {
								$rootScope.digiReferenceNumber = response.DigiReferenceNumber;
								$rootScope.fetchDigilokcerDetails(response.DigiReferenceNumber);
							} else if ((response.Digioption == 'DL' || response.Digilocker == 'Y') && $rootScope.formData.RMModule && !$rootScope.profileSpstatus) {
								$rootScope.digiReferenceNumber = response.DigiReferenceNumber;
								$rootScope.fetchDigilokcerDetails(response.DigiReferenceNumber);
							} else {
								if ((response.Digioption == 'DL' && response.Digilocker == 'N') && !$rootScope.formData.RMModule && !$rootScope.profileSpstatus) {
									$state.go('register');
									$rootScope.wizardShow = false;
									$rootScope.emailMobile = false;
									setTimeout(function () {
										var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
											backdrop: 'static',
											keyboard: false
										});
										digilocker.show();

									}, 500)
								}
								// $state.go('address');
								else if (!response.Digioption && !$rootScope.profileSpstatus) {
									$state.go('register');
									$rootScope.wizardShow = false;
									$rootScope.emailMobile = false;
									setTimeout(function () {
										var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
											backdrop: 'static',
											keyboard: false
										});
										digilocker.show();

									}, 100)

								} else {
									$state.go('address')
								}
							}
						}
					}

				}
				// else if ((response.OverallStatusList[4].IsEmailVerified != true && !$rootScope.webfinacle)||response.OverallStatusList[4].EBOStatus == 'R' || response.OverallStatusList[4].SPStatus != 'Y') {
				else if ((response.OverallStatusList[4].IsEmailVerified != true) || response.OverallStatusList[4].EBOStatus == 'R' || response.OverallStatusList[4].SPStatus != 'Y') {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = false;
					$rootScope.fourthCompleted = false;
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

					if (response.OverallStatusList[4].IsEmailVerified != true && response.OverallStatusList[4].SPStatus == 'Y') {
						$rootScope.getAPI = false;
					}
					if ((response.Digioption == 'DL' || response.Digilocker == 'Y') && response.DigiReferenceNumber && !$rootScope.profileSpstatus) {
						tok = response.DigiReferenceNumber;
						var apiurlD = "Digilockerfetchdetails";
						var sendDataD = {
							"pan_no": $rootScope.formData.fields.panNumber,
							"ReferenceNumber": $rootScope.formData.eRefNumber,
							"DigiRef_no": tok
						}
						serverService.apiCall(apiurlD, sendDataD).then(function (res) {
							var response = res.data.data;
							var response1 = res.data
							if (!response1.IsSuccess && response1.ErrorCode == "505") {
								$rootScope.digiNameErroMisMatch = false;
								var digilockerFetchFail = new bootstrap.Modal(document.getElementById('digilockerFetchFail'), {
									backdrop: 'static',
									keyboard: false
								});
								$('#digilocker').modal('hide');

								digilockerFetchFail.show();
								return;
							}
							if (!response1.IsSuccess && response1.ErrorCode == "515") {
								$('#digilocker').modal('hide');
								$rootScope.digiNameErroMisMatch = true;
								var digilockerFetchFail = new bootstrap.Modal(document.getElementById('digilockerFetchFail'), {
									backdrop: 'static',
									keyboard: false
								});
								digilockerFetchFail.show();
								return;
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
							if (response.eaadhaar_data) {
								$rootScope.formData.digilockerData = response.eaadhaar_data;
								$rootScope.formData.digiData = true;
								sessionStorage.setItem('digiInfo', JSON.stringify(response.eaadhaar_data));
								sessionStorage.setItem('digi', true);
								$('#digilocker').modal('hide');
								$state.go('personalDetails');
							} else {
								$rootScope.formData.digiData = false;
								sessionStorage.removeItem('digi');
							}
						});
					} else {
						$state.go('personalDetails');
					}
				} else if (response.OverallStatusList[3].EBOStatus == 'R' || response.OverallStatusList[3].SPStatus != 'Y') {
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
				} else if (!$rootScope.formData.skippedPayment && (response.OverallStatusList[2].EBOStatus == 'R' || response.OverallStatusList[2].SPStatus != 'Y' || response.OverallStatusList[7].SPStatus != 'Y')) {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;

					if (response.OverallStatusList[2].EBOStatus == 'R') {
						$rootScope.getAPI = false;
					}
					if (response.OverallStatusList[2].SPStatus == 'Y') {
						$rootScope.getAPI = false;
					}
					if (response.OverallStatusList[7].PaymentExceptionUpdate == 'Y') {
						$rootScope.formData.paymentSkip = true
					}
					$state.go('products', {
						mobile: $rootScope.formData.EncMobile
					});
				}
				else if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus != 'Y' && response.Digilocker != "Y" && (response.OverallStatusList[0].KRAClient == "N" || response.OverallStatusList[0].CKYCClient == "N" || response.OverallStatusList[0].KRAUpdate == 'Y')) {
					$state.go('ipv');
				}
				else if (response.OverallStatusList[5].EBOStatus != 'R' && (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus == 'Y' && response.OverallStatusList[5].SPStatus == 'Y' && (response.OverallStatusList[10] && response.OverallStatusList[10].SPStatus == 'Y') && !$rootScope.SipCancelation)) {
					$rootScope.updateDIY();
					$state.go('complete', {
						mobile: $rootScope.formData.EncMobile
					});
					if ($rootScope.formData.fields.email && response.OverallStatusList[0].IsEmailVerified == true) {
						$rootScope.verifyemail = false;
						$rootScope.verifyOTPSuccess = true;
						$rootScope.verifyEmailDiv = false;
					} else {
						$rootScope.verifyemail = true;
						$rootScope.verifyEmailDiv = true;
					}

				} else if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus != 'Y' && response.Digilocker != "Y" && (response.OverallStatusList[0].KRAClient == "N" || response.OverallStatusList[0].CKYCClient == "N" || response.OverallStatusList[0].KRAUpdate == 'Y')) {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.fifthCompleted = true;
					$rootScope.sixthCompleted = true;
					$rootScope.seventhCompleted = true;
					$rootScope.sipcompleted = false;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					$state.go('ipv');
				}
				else if ((response.OverallStatusList[9].SPStatus == 'Y' && (response.OverallStatusList[10] && response.OverallStatusList[10].SPStatus != 'Y')) || ($rootScope.SipCancelation)) {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.fifthCompleted = true;
					$rootScope.sixthCompleted = true;
					$rootScope.seventhCompleted = true;
					$rootScope.sipcompleted = false;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					if (!$rootScope.SipCancelation) {
						$rootScope.updateSip();
					}
					$state.go('Sip', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[5].EBOStatus == 'R') {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.fifthCompleted = true;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					$rootScope.formData.docStageCompleted = false;
					$rootScope.formData.docStageRejected = true;
					if (response.OverallStatusList[0].KRAClient != 'Y' || response.OverallStatusList[0].KRAUpdate != 'N') {
						$rootScope.formData.displayNonKraIpvButton = true;
					} else {
						$rootScope.formData.displayNonKraIpvButton = false;
					}
					$state.go('documentUpload', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if (response.OverallStatusList[9].SPStatus == 'Y') {
					//$rootScope.updateDIY();
					$rootScope.formData.apiLoading = true;
					var s_url = "DIYGetImagesByReferenceNumberFlag";
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
								$state.go('ipv');
								// $rootScope.IPVRedirectURL = response.IpvURLEncode;

								// var ipvOtpUrl = 'IPVOTPGenerationNew';
								// var ipvData = {
								// 	ReferenceNumber: $rootScope.formData.ReferenceNumber,
								// 	Mobile: $rootScope.formData.fields.mobile,
								// 	BrowserType: $rootScope.formData.browserType
								// };
								// serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
								// 	var response = a.data;
								// 	$rootScope.formData.apiLoading = false;
								// 	sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber)
								// 	var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
								// 	serverService.apiIPVCall(url).then(function (a) {
								// 		var response = a.data;
								// 	});
								// });

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
						var s_url = "DIYGetDocumentProofStageByRefEnc";

						var sendData = {
							ReferenceNumber: $rootScope.formData.eRefNumber
						};
						$rootScope.formData.apiLoading = true;
						sendData = $rootScope.encryptReq(sendData);
						serverService.apiCall(s_url, sendData).then(function (a) {
							var response = a.data;
							$rootScope.formData.apiLoading = false;
							if (response.IsSuccess) {
								if (response.ObjCDIYRegistration.FandOStatus == 1) {
									$state.go('documentUpload', {
										mobile: $rootScope.formData.EncMobile
									});
								} else {
									if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[9].SPStatus != 'Y' && response.Digilocker != "Y" && (response.OverallStatusList[0].KRAClient == "N" || response.OverallStatusList[0].CKYCClient == "N" || response.OverallStatusList[0].KRAUpdate == 'Y')) {
										$state.go('ipv')
									} else {
										$rootScope.sixthCompleted = true;
										$state.go('Sip', {
											mobile: $rootScope.formData.EncMobile
										});
										if ($rootScope.formData.fields.email && response.OverallStatusList[0].IsEmailVerified == true) {
											$rootScope.verifyemail = false;
											//$rootScope.verifyOTPSuccess = true;
										} else {
											$rootScope.verifyemail = true;
											$rootScope.verifyEmailDiv = true;
										}
									}


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
				} else if (response.OverallStatusList[5].SPStatus != 'Y') {
					$rootScope.firstCompleted = true;
					$rootScope.secondCompleted = true;
					$rootScope.thirdCompleted = true;
					$rootScope.fourthCompleted = true;
					$rootScope.fifthCompleted = true;
					$rootScope.formData.aadharhide = true;
					$rootScope.wizardShow = true;
					// $rootScope.formData.docStageCompleted = false
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
						/*setTimeout(function () {
						$('#formPDF').modal({
						backdrop: 'static',
						keyboard: false
						});
						}, 1000);
						var url = "GetEncrptToken";
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
					$state.go('Sip', {
						mobile: $rootScope.formData.EncMobile
					});
					if ($rootScope.formData.fields.email && response.OverallStatusList[0].IsEmailVerified == true) {
						$rootScope.verifyemail = false;
						//$rootScope.verifyOTPSuccess = true;
					} else {
						$rootScope.verifyemail = true;
						$rootScope.verifyEmailDiv = true;
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
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
							backdrop: 'static',
							keyboard: false
						});
						APIResponseModal.show();
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
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
							backdrop: 'static',
							keyboard: false
						});
						APIResponseModal.show();
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
	if (ReferenceNumber && BYOD) {
		//alert(searchObject);
		sessionStorage.setItem('BankRef', ReferenceNumber)
		//$rootScope.getDIYStatus();
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
				if ($rootScope.finData.basicInfo[0].ConstitutionCode && $rootScope.finData.basicInfo[0].ConstitutionCode != '01') {
					$rootScope.apiResponseErrorMsg = 'Thank you for showing interest in opening a trading and demat account with Axis Direct!! However, only Resident Individuals can open an online trading account. All NRI/Corporate accounts would be opened offline. We have recorded your details and your dedicated RM would contact you shortly to assist you with opening an account.';
					var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
						backdrop: 'static',
						keyboard: false
					});
					APIResponseModal.show();
					$rootScope.finNRI = true
					return false;
				}
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

				var dob = $rootScope.finData.basicInfo[0].DateOfBirth;
				dob = $rootScope.finData.basicInfo[0].DateOfBirth.substring(8, 10) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(5, 7) + '/' + $rootScope.finData.basicInfo[0].DateOfBirth.substring(0, 4);
				$rootScope.finData.basicInfo[0].DateOfBirth = dob;
				// $rootScope.formData.dob = dob;
				sessionStorage.setItem('finData', JSON.stringify($rootScope.finData));
				sessionStorage.setItem('finacle', true);

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

	$rootScope.decryptUrl = function () {
		if ($rootScope.formData.DecryptURL || sessionStorage.getItem('AxNo') || sessionStorage.getItem('BankRef') || sessionStorage.getItem("rkMode")) {
			var encryptURL = "GetDecryptURL";
			if (sessionStorage.getItem('AxNo') && !$rootScope.BYOD) {
				$rootScope.formData.DecryptURL = sessionStorage.getItem('AxNo');
			} else if (sessionStorage.getItem('BankRef')) {
				$rootScope.formData.DecryptURL = sessionStorage.getItem('BankRef');
			}
			if (sessionStorage.getItem('BYOD') && !$rootScope.EsginBYOD) {
				Byod = true;
			} else {
				Byod = false;
			}
			if (mode != 'RM') { }
			else {
				$rootScope.formData.rmOTP = true;
			}
			$rootScope.formData.apiLoading = true;
			var sendDataURL = {
				DecryptURL: $rootScope.formData.DecryptURL,
				RmMode: mode,
				Byod: Byod,
				Refnumbers: sessionStorage.getItem("rkMode")
			};
			serverService.apiCall(encryptURL, sendDataURL).then(function (a) {
				// var response = a.data;
				var response = $rootScope.decryptRes(a.data, 'Response');
				$rootScope.formData.apiLoading = false;
				if (response.IsSuccess && response.RefNumber) {
					if (response.BankShortName && response.BankShortName.toUpperCase() == "UFS") {
						$rootScope.uBank = true;
						sessionStorage.setItem("uBank", 'UFS')
						$rootScope.bankUB();
					}
					if ((sessionStorage.getItem('BYOD') || sessionStorage.getItem("rkMode")) && response.RefNumber) {
						sessionStorage.setItem('AxNo', response.RefNumber)
					}
					sessionStorage.setItem('ClientFullName', response.ClientName)
					$rootScope.resumejourney = true;
					if ($rootScope.resumejourney && !$rootScope.openApp && !$rootScope.RMBYOD && !$rootScope.searchParams.utm_source) {
						var surl = "OpenApp?ReferenceNumber=" + response.RefNumber;
						serverService.getApi(surl).then(function (a) {
							var data = a.data;
							var match = data.match(/window\.location=['"]([^'"]+)['"]/);
							$rootScope.resumejourney = false;
							if (match && match[1]) {
								var RMviapopup = new bootstrap.Modal(document.getElementById('RMviapopup'), {
									backdrop: 'static',
									keyboard: false
								});
								RMviapopup.show();
								$rootScope.redirectUrl = match[1];
								// window.location.href = redirectUrl; 
							} else {
								console.log("No redirect URL found in API response");
							}
						})
					}
					if (response.EsignStatus == "Y" && sessionStorage.getItem('EsginBYOD') == 'true') {
						var EsignStatus = new bootstrap.Modal(document.getElementById('EsignStatus'), {
							backdrop: 'static',
							keyboard: false
						});
						EsignStatus.show();
						return;
					}
					if (response.Mode && response.Mode == 'V') {
						$rootScope.vcip = true;
						$rootScope.digilockerflow = false;
					}
					if (response.Mode && response.Mode == 'B') {
						$rootScope.BYOD = true;
						$rootScope.digilockerflow = false;
					}
					sessionStorage.setItem("namegetMismatch", response.NameMatch);
					sessionStorage.setItem("DobgetMismatch", response.DOBMatch);
					if (response.ReferenceNumber) {
						sessionStorage.setItem("RxReferenceNumber", response.ReferenceNumber);
					}
					if (response.NameMatch != "Y" || response.DOBMatch != "Y") {
						$state.go('register');
						$rootScope.emailMobile = false;
						$rootScope.pan = true;
						$rootScope.formData.fields.panNumber = response.PANNumber
						sessionStorage.setItem("RxPan", response.PANNumber);
						sessionStorage.setItem("DOBMismatch", response.DOB);
						sessionStorage.setItem("pannamemismatch", response.ClientName);
						$rootScope.formData.dob = response.DOB;
						$rootScope.formData.fields.DOB = response.DOB;
						$rootScope.formData.fields.username = response.ClientName;

						setTimeout(function () {
							$('#pan').prop('disabled', true)
							$('#txtDOB').prop('disabled', true)
							$('#panCName').prop('disabled', true)
							if (response.NameMatch != "Y") {
								$rootScope.formData.fields.username = response.ClientName
								$rootScope.formData.fields.panNumber = response.PANNumber
								$rootScope.formData.fields.DOB = response.DOB;
								$('#panCName').prop('disabled', false)
							}
							if (response.DOBMatch != "Y") {
								$('#txtDOB').prop('disabled', false)
							}

						}, 3000)
						return;

					}
					if ((response.Mode && response.Mode == 'V') && (response.NameMatch != "Y" || response.DOBMatch != "Y")) {
						$('#existingCustomer-popup').modal('hide');
						$state.go('register');
						$rootScope.emailMobile = false;
						$rootScope.pan = true;
						$rootScope.formData.fields.panNumber = response.PANNumber
						$rootScope.formData.dob = response.DOB;
						$rootScope.formData.fields.DOB = response.DOB
						$rootScope.formData.fields.username = response.ClientName
						$rootScope.vcip = true;
						setTimeout(function () {
							$('#pan').prop('disabled', true)
							$('#txtDOB').prop('disabled', true)
							$('#panCName').prop('disabled', true)
							if (response.NameMatch != "Y") {
								$rootScope.formData.fields.username = response.ClientName
								$('#panCName').prop('disabled', false)
							}
							if (response.DOBMatch != "Y") {
								$('#txtDOB').prop('disabled', false)
							}
							$rootScope.formData.fields.panNumber = response.PANNumber
							$rootScope.formData.dob = response.DOB;
							$rootScope.formData.fields.DOB = response.DOB;
							$rootScope.formData.fields.username = response.ClientName;
						}, 1000)
						return;
					}
					if ((response.Mode && response.Mode == 'B') && ((response.NameMatch != "Y" || response.DOBMatch != "Y"))) {
						$state.go('register');
						$rootScope.BYOD = true;
						$rootScope.emailMobile = false;
						$rootScope.pan = true;
						$rootScope.formData.fields.panNumber = response.PANNumber
						$rootScope.formData.dob = response.DOB;
						$rootScope.formData.fields.DOB = response.DOB;
						$rootScope.formData.fields.username = response.ClientName
						setTimeout(function () {
							$('#pan').prop('disabled', true)
							$('#txtDOB').prop('disabled', true)
							$('#panCName').prop('disabled', true)
							$rootScope.formData.dob = response.DOB;
							$rootScope.formData.fields.DOB = response.DOB;
							$rootScope.formData.fields.username = response.ClientName;
							if (response.NameMatch != "Y") {
								$rootScope.formData.fields.username = response.ClientName
								$('#panCName').prop('disabled', false)
							}
							if (response.DOBMatch != "Y") {
								$('#txtDOB').prop('disabled', false)
							}
						}, 1000)
						return
					}
					if ($rootScope.BYOD || $rootScope.vcip) {
						$rootScope.getDIYStatusAPI = false;
					}
					// if (signature && signature == 'true') {
					// 	$rootScope.formData.fields.panNumber=response.PANNumber
					// 	$rootScope.formData.fields.panNumber = sessionStorage.setItem("RxPan",response.PANNumber);
					// 	$rootScope.formData.dob=response.DOB;
					// 	$rootScope.formData.fields.DOB =response.DOB
					// 	$rootScope.formData.fields.username=response.ClientName
					// 	$rootScope.formData.fields.panMobile = response.PANNumber;
					// 	$rootScope.vcipRef = response.ReferenceNumber;
					// 	$rootScope.panMobile();
					// 	if (sessionStorage.getItem('reusmeOTPVerified') && sessionStorage.getItem('reusmeOTPVerified') == 'verified') {
					// 		$rootScope.vcipRef = response.ReferenceNumber;
					// 	} else {
					// 		$window.sessionStorage.clear();
					// 	}
					// 	return false;
					// } else if (mode == 'V') {
					// 	$rootScope.clearBrowsingData();
					// 	var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
					// 			backdrop: 'static',
					// 			keyboard: false
					// 		});
					// 	APIResponseModal.show();
					// 	$rootScope.apiResponseErrorMsg = "Already processed under Video kyc mode.";
					// 	return false;
					// }

					if (response.Mode && response.Mode == 'R') {
						$rootScope.rmmodewb = true
					}

					sessionStorage.setItem('mode', response.Mode);
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
					if (response.Mode == 'J') {
						$rootScope.webJana = true;
						if (response.PanNumberAes128Enc) {
							panNumber = response.PanNumberAes128Enc;
							$rootScope.PanNumberEnc = panNumber;
						}
						$rootScope.getJanaDetails();
						$rootScope.getBankLogo();
					} else if (response.Mode == 'I' || response.Mode == 'MB') {
						$rootScope.webfinacle = true;
						$rootScope.formData.fields.panNumber = response.PANNumber;
						//$rootScope.getIBInfo(response.PANNumber);

						if ($rootScope.webfinacle && $rootScope.formData.CKYC && $rootScope.formData.KRA) {
							$rootScope.ibDocumentHide = true
						}

						if ($rootScope.webfinacle && $rootScope.formData.CKYC && !$rootScope.formData.KRA) {
							$rootScope.ibDocumentHide = true;
							$rootScope.ibCkycDocumentShow = true;
						}
					} else if (response.Mode == 'J' && response.PanNumberAes128Enc) {
						panNumber = response.PanNumberAes128Enc;
						$rootScope.PanNumberEnc = panNumber;
						$rootScope.webJana = true;
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
						var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'), {
							backdrop: 'static',
							keyboard: false
						});
						existingCustomerpopup.show();
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
							$rootScope.profileBEmailDisabled = true;
						}
						$rootScope.formData.fields.panNumber = sessionStorage.getItem("RxPan");
						$rootScope.formData.fields.DOB = response.DOB;
						$rootScope.formData.dob = response.DOB;
						$rootScope.formData.fields.username = response.ClientName
						$('#txtDOB').val(response.DOB);

						if (searchObject && searchObject.poa == '1') {
							$rootScope.downloadPOA(response.ReferenceNumber)

						} else {
							$rootScope.getDIYStatus();
						}

						if (suc == '1' && tok) {
							$rootScope.digiCookie = "axDIGISUC=" + suc + "; Secure";
							document.cookie = $rootScope.digiCookie;
							$rootScope.digiTCookie = "axDIGIT=" + tok + "; Secure";
							document.cookie = $rootScope.digiTCookie;
							sessionStorage.setItem('digi', true);
							if ($rootScope.BYOD) {
								sessionStorage.setItem('digisuc', suc);
								sessionStorage.setItem('digisTok', tok);
							}
							//$rootScope.bindDigitalData();
							//window.top.close();
						} else if (suc != '1' && tok) {
							$rootScope.digiCookie = "axDIGISUC=" + suc + "; Secure";
							document.cookie = $rootScope.digiCookie;
							$rootScope.digiTCookie = "axDIGIT=" + tok + "; Secure";
							document.cookie = $rootScope.digiTCookie;
							//window.top.close();
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
				}
				else if ($rootScope.BYOD && !response.IsSuccess && !sessionStorage.getItem('byodVerifyEmail')) {
					$rootScope.formData.fields.mobile = '';
					$rootScope.formData.ReferenceNumber = '';
					if (response.ErrorMessage == "Byod Decryption was failed") {
						$rootScope.byodErrorMessage = "Reference Number is Invalid";
					} else {
						$rootScope.byodErrorMessage = response.ErrorMessage;
					}
					$rootScope.commonModalCall("byodFail", true);
				} else if (sessionStorage.getItem("rkMode")) {
					console.log("failed DecryptURL")
				}
				else {
					$rootScope.formData.fields.mobile = '';
					$rootScope.formData.ReferenceNumber = '';
					$state.go('register');
					$window.sessionStorage.clear();
					setTimeout(function () {
						location.reload();
					}, 200)
				}
			});
		}
	}

	if (sessionStorage.getItem('AxNo') && !sessionStorage.getItem('byodVerifyEmail')) {
		$rootScope.decryptUrl();
	}
	else if (sessionStorage.getItem('BankRef') && !sessionStorage.getItem('byodVerifyEmail')) {
		$rootScope.decryptUrl();
	}
	else if (sessionStorage.getItem('RMModule') && sessionStorage.getItem('RMModule') == 'true') {
		sessionStorage.removeItem('mode');
	} else if (sessionStorage.getItem("rkMode")) {
		$rootScope.emailMobile = false;
		$rootScope.pan = true;
		$rootScope.decryptUrl();
	}
	else if (sessionStorage.getItem('uBank')) {
		$rootScope.uBank = true;
	}
	else if (sessionStorage.getItem('NewLandingPage')) {
		$rootScope.NewLandingPage = true;
	}
	else if (sessionStorage.getItem('utmMoney')) {
		$rootScope.moneyControl = true;
	}
	else if (utm_source === 'JIO' || $rootScope.searchParams.utm_source === 'JIO') {
		$rootScope.getBankLogo();
	} else if (sessionStorage.getItem('RxMobile')) {
		$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile')
		// $rootScope.EmailField = true;
	}
	else {
		if (Object.keys($rootScope.searchParams).length == 0) {
			sessionStorage.clear();
		}
	}
	if ((webJana && webJana.toLowerCase() == 'true' && panNumber) || (sessionStorage.getItem('webJana') && sessionStorage.getItem('webJana') == 'true')) {
		$rootScope.webJana = true;
		$rootScope.dobFreeze = true;
		sessionStorage.setItem('webJana', true);
		$rootScope.getBankLogo();
		$rootScope.getJanaDetails();
	} else {
		$rootScope.webJana = false;
	}

	$rootScope.bindDigitalData = function () {
		$rootScope.formData.apiLoading = false;
		if ($rootScope.digisuc == '1' && $rootScope.tokenID) {
			document.cookie = 'axDIGIT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			document.cookie = 'axDIGISUC=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			var apiurl = "DigilockerUpdate";
			var sendData = {
				"PanNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
				"ReferenceNumber": $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : sessionStorage.getItem('AxNo'),
				"Digisucess": 1,
				"Digimessage": "success",
				"DigiRef_no": tok
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(apiurl, sendData).then(function (data) {
				var res = data.data;
				$rootScope.formData.apiLoading = false;
				if (!res.IsSuccess && res.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = res.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				}
				if (res.ReferenceNumber) {
					$rootScope.formData.eRefNumber = res.ReferenceNumber;
					sessionStorage.setItem('AxNo', res.ReferenceNumber);
				}

				if (res.PanNumber) {
					$rootScope.formData.fields.panNumber = res.PanNumber;
				}

				var s_geturl = "GetOverallStatusDIY";
				$rootScope.formData.apiLoading = true;
				var getsendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber
				};
				serverService.apiCall(s_geturl, getsendData).then(function (a) {
					$rootScope.formData.apiLoading = false;
					var getresponse = a.data;
					if (!getresponse.IsSuccess && getresponse.ErrorCode == '-1') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = getresponse.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						return
					}
					$rootScope.digilockerflow = getresponse.DigiLockerSkip;
					if (getresponse.OverallStatusList[0].KRAClient == 'Y' && getresponse.OverallStatusList[0].CKYCClient == 'Y') {
						$rootScope.digilockerflow = false;
					}
					$rootScope.digiLockerCount = getresponse.DigilockerCount;
					$rootScope.digiReferenceNumber = getresponse.DigiReferenceNumber;
					$rootScope.profileSpstatus = getresponse.OverallStatusList[1].SPStatus == "Y" ? true : false;
					$rootScope.fetchDigilokcerDetails(tok);
				});

			});
		}
		else if ($rootScope.digisuc == '0' && $rootScope.tokenID) {
			$('#digilocker').modal('hide');
			var digilockerFail = new bootstrap.Modal(document.getElementById('digilockerFail'), {
				backdrop: 'static',
				keyboard: false
			});
			digilockerFail.show();
		}
	}
	if (suc == '1' && tok) {
		$rootScope.digisuc = suc;
		$rootScope.tokenID = tok;
		if ($rootScope.BYOD) {
			sessionStorage.setItem('digisuc', suc);
			sessionStorage.setItem('digisTok', tok);
		}
		$rootScope.bindDigitalData();
	} else if (suc == "0" && tok) {
		$('#digilocker').modal('hide');
		var digilockerFail = new bootstrap.Modal(document.getElementById('digilockerFail'), {
			backdrop: 'static',
			keyboard: false

		});
		digilockerFail.show();
	}

	function getCookieVal(name) {
		const allCookies = document.cookie.split('; ');
		var result = null;
		allCookies.forEach(function (v) {
			if (v.indexOf(name + '=') !== -1) {
				result = v.split('=')[1];
				return false;
			}

		})
		return result;
	}

	$rootScope.commonModalCall = function (id, show) {
		var commonModal = new bootstrap.Modal(document.getElementById(id), {
			backdrop: 'static',
			keyboard: false
		});
		if (show) {
			commonModal.show();
		} else {
			commonModal.hide();
		}
	}

	$rootScope.android = function () {
		if (window.Android) {
			window.Android.ABLFunc();
		} else {
			console.log("Function not found");
		}
	}

	$rootScope.getDigiData = function () {
		$rootScope.tokenID = '';
		$rootScope.digisuc = '';
		digi_interval = setInterval(function () {
			$rootScope.tokenID = getCookieVal('axDIGIT');
			$rootScope.digisuc = getCookieVal('axDIGISUC');

			if ($rootScope.digisuc) {
				tok = $rootScope.tokenID;
				$rootScope.bindDigitalData();
				clearInterval(digi_interval);
				document.cookie = 'axDIGIT=; Secure';
				document.cookie = 'axDIGISUC=; Secure';
			}
		}, 1000)
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
		if ($rootScope.rkMode) {
			if (sessionStorage.getItem("rkMail")) {
				$rootScope.formData.fields.email = sessionStorage.getItem("rkMail");
			}
			if (sessionStorage.getItem("rkMobile")) {
				$rootScope.formData.fields.mobile = sessionStorage.getItem("rkMobile");
			}
		}
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			MobileNo: $rootScope.formData.fields.mobile,
			EmailID: $rootScope.formData.fields.email,
			RK: $rootScope.rkMode ? sessionStorage.getItem("rkMode") : $rootScope.formData.ReferKey,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken,
			IBMBAssistedRM: $rootScope.webfinacle ? $rootScope.ibmbAssists : ''
		};
		if ($rootScope.rkMode) {
			sendData.PlanName = sessionStorage.getItem("rkPlan");
		}

		serverService.apiCall(s_url, sendData).then(function (a) {
			var res = a.data;
			if (!res.IsSuccess && res.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = res.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			}
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
					'Affiliate Name': affiliateName,
					'Affiliate Acquired Customer': affiliateAcquiredCustomer,
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
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}

	$rootScope.codeMaping = function () {
		var url = 'LCLGCodeMappingDiy';
		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			LCCode: $rootScope.formData.assistedLCCode,
			LGCode: $rootScope.formData.assistedLGCode,
			Utm_Campaign: utm_campaign,
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
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						$rootScope.formData.panStatus = 'Your account is under process in another mode';
					}
					if ($rootScope.formData.assistedLGCode || $rootScope.formData.assistedLCCode) {
						$rootScope.codeMaping();
					}

				} if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				} else {
					var connection = new bootstrap.Modal(document.getElementById('connection'));
					connection.show();
				}

			}, function (e) {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		} else {
			$rootScope.getDIYStatus();
		}
	}
	$rootScope.ecommerceCKYCValidation = function () {
		var surl = "GetCKYCTrackwizzDetails?PanNumber=" + $rootScope.formData.eRefNumber;
		serverService.getApi(surl).then(function (a) {
			var data = a.data;
			if (data.cKYCPersonalDetail) {
				if (data.cKYCPersonalDetail.CKYCNumber) {
					var letter = data.cKYCPersonalDetail.CKYCNumber.charAt(0);
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
			if (!$rootScope.dobFreeze) {
				$rootScope.dobEdit();
			} else {

				if (($rootScope.formData.KRA && $rootScope.formData.kraData.APP_COR_ADD1 && $rootScope.askDigiLocker != 'Y') || $rootScope.digiOption == 'FMF') {
					$state.go('address');
				} else if ($rootScope.webfinacle && (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC)) {
					$state.go('address');
				}
				else {
					if (($rootScope.digiOption == 'DL' && $rootScope.askDigiLocker == 'N') && !$rootScope.profileSpstatus) {
						$state.go('register');
						$rootScope.wizardShow = false;
						$rootScope.emailMobile = false;
						setTimeout(function () {
							var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
								backdrop: 'static',
								keyboard: false
							});
							digilocker.show();

						}, 1000)
					}
					// else
					// $state.go('address');
					else if (!$rootScope.digiOption && !$rootScope.profileSpstatus) {
						$state.go('register');
						$rootScope.wizardShow = false;
						$rootScope.emailMobile = false;
						setTimeout(function () {
							var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
								backdrop: 'static',
								keyboard: false
							});
							digilocker.show();

						}, 1000)

					} else {
						$state.go('address');
					}
				}
			}
		});
	}

	$rootScope.ecommercekraValidation = function () {

		$rootScope.formData.apiLoading = true;
		var surl = "KRAClientValidationupdate";

		if ($rootScope.ExtDOB) {
			$rootScope.formData.dob = $rootScope.ExtDOB
		}

		if (($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && $rootScope.digiReferenceNumber && $rootScope.digiOption != 'FMF' && !$rootScope.profileSpstatus) {
			$rootScope.fetchDigilokcerDetails($rootScope.digiReferenceNumber);
		} else {
			$rootScope.formData.apiLoading = true;
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
				ReferenceNumber: $rootScope.formData.eRefNumber,
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
				}
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
				if (response.Token) {
					$rootScope.EncryptToken = response.Token;
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

				if ($rootScope.formData.aadharVerified) {
					$rootScope.formData.changeAadhar = true;
					$rootScope.formData.aadharVerified = false;
				}
				$rootScope.krasearch = false;
				$rootScope.formData.kraChecking = false;
				if (response.Registration.KRAVerifiedClient == 'Y') {
					$rootScope.formData.apiLoading = false;
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

							if (!$rootScope.dobFreeze) {
								$rootScope.dobEdit();
							} else {
								if ($rootScope.digiOption == 'FMF') {
									$state.go('address');
								} else if (document.getElementById('digilocker') && ($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && !$rootScope.digiReferenceNumber && !$rootScope.profileSpstatus) {
									var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
										backdrop: 'static',
										keyboard: false
									});
									digilocker.show();
								} else if ($rootScope.formData.RMModule) {
									// $state.go('digiData');
									$state.go('address');
								} else if (!$rootScope.digiReferenceNumber) {
									$state.go('address');
								} else {
									$state.go('address');
								}
								/*$state.go('address', {
								mobile: $rootScope.formData.EncMobile
								});*/
							}
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
												if (!$rootScope.dobFreeze) {
													$rootScope.dobEdit();
												} else {
													$state.go('address', {
														mobile: $rootScope.formData.EncMobile
													});
												}
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
															if (!$rootScope.dobFreeze) {
																$rootScope.dobEdit();
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
													$rootScope.formData.changeKRA = false;

													if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
														$rootScope.ecommerceCKYCValidation();
													} else {
														if (!$rootScope.dobFreeze) {
															$rootScope.dobEdit();
														} else {
															if ($rootScope.digiOption == 'FMF') {
																$state.go('address');
															} else
																if (document.getElementById('digilocker') && ($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && !$rootScope.digiReferenceNumber && !$rootScope.profileSpstatus) {
																	var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
																		backdrop: 'static',
																		keyboard: false
																	});
																	digilocker.show();
																} else if ($rootScope.formData.RMModule) {
																	// $state.go('digiData');
																	$state.go('address');
																} else if (!$rootScope.digiReferenceNumber) {
																	$state.go('address');
																} else {
																	$state.go('address');
																}
															/*$state.go('address', {
															mobile: $rootScope.formData.EncMobile
															});*/
														}
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
													if (!$rootScope.dobFreeze) {
														$rootScope.dobEdit();
													} else {
														$state.go('address', {
															mobile: $rootScope.formData.EncMobile
														});
													}
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
										if (!$rootScope.dobFreeze) {
											$rootScope.dobEdit();
										} else {
											if ($rootScope.digiOption == 'FMF') {
												$state.go('address');
											} else
												if (document.getElementById('digilocker') && ($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && !$rootScope.digiReferenceNumber && !$rootScope.profileSpstatus) {
													var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
														backdrop: 'static',
														keyboard: false
													});
													digilocker.show();
												} else if ($rootScope.formData.RMModule) {
													// $state.go('digiData');
													$state.go('address');
												} else if (!$rootScope.digiReferenceNumber) {
													$state.go('address');
												} else {
													$state.go('address');
												}
											/*$state.go('address', {
											mobile: $rootScope.formData.EncMobile
											});*/
										}
									}
								}
							});
						} else {
							$rootScope.formData.kraData = '';
							sessionStorage.setItem("IsKRA", false);
							$rootScope.formData.KRA = false;
							$rootScope.formData.changeKRA = true;
							if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
								$rootScope.ecommerceCKYCValidation();
							} else {
								if (!$rootScope.dobFreeze) {
									$rootScope.dobEdit();
								} else {
									if ($rootScope.digiOption == 'FMF') {
										$state.go('address');
									} else if (document.getElementById('digilocker') && ($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && !$rootScope.digiReferenceNumber && !$rootScope.profileSpstatus) {
										var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
											backdrop: 'static',
											keyboard: false
										});
										digilocker.show();
									} else if ($rootScope.formData.RMModule) {
										// $state.go('digiData');
										$state.go('address');
									} else {
										$state.go('address', {
											mobile: $rootScope.formData.EncMobile
										});
									}
								}
							}
						}
					}
				} else {
					$rootScope.formData.apiLoading = false;
					sessionStorage.setItem("IsKRA", false);
					$rootScope.formData.KRA = false;
					$rootScope.formData.changeKRA = true;

					if (sessionStorage.getItem('IsCKYC') || sessionStorage.getItem('IsCKYC') == 'true' || $rootScope.formData.CKYC) {
						$rootScope.ecommerceCKYCValidation();
					} else {
						if (!$rootScope.dobFreeze) {
							$rootScope.dobEdit();
						} else {
							if ($rootScope.digiOption == 'FMF') {
								$state.go('address');
							} else if (document.getElementById('digilocker') && ($rootScope.askDigiLocker == 'Y' || $rootScope.digiOption == 'DL') && !$rootScope.digiReferenceNumber && !$rootScope.profileSpstatus) {
								var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
									backdrop: 'static',
									keyboard: false
								});
								digilocker.show();
							} else if ($rootScope.formData.RMModule && !$rootScope.rmDigiRedirect) {
								//$state.go('digiData');
								$state.go('address');
							} else if (!$rootScope.digiReferenceNumber) {
								$state.go('address');
							} else {
								$state.go('address');
							}

							/*state.go('address', {
							mobile: $rootScope.formData.EncMobile
							});*/
						}
					}
					setTimeout(function () {
						$(".select").select2();
					}, 500)
				}

			});
		}
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
		if (refNo && !$rootScope.formData.IsClone && !$rootScope.formData.applicationDisabled && !$rootScope.vcip && !$rootScope.BYOD) {
			var s_url = "GetOverallStatusDIY";
			if (!$rootScope.formData.eRefNumber) {
				$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
			}
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber
			};

			serverService.apiCall(s_url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.siddhiApp = response.SiddhiApp
				sessionStorage.setItem('siddhiApp', $rootScope.siddhiApp);
				$rootScope.askDigiLocker = response.Digilocker;
				$rootScope.digiLockerCount = response.DigilockerCount;
				$rootScope.digiReferenceNumber = response.DigiReferenceNumber;
				$rootScope.digiOption = response.Digioption;
				if (response.DigiAadhar) {
					sessionStorage.setItem('DigiAadhar', response.DigiAadhar.substring(8, 12))
				}
				$rootScope.ipvRetakeCount = response.RetakeMaxCount;
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
				$rootScope.profileSpstatus = response.OverallStatusList[1].SPStatus == "Y" ? true : false;
				if (response.Mode == 'I' && response.OverallStatusList[0].CKYCClient == 'Y') {
					$rootScope.digilockerflow = false;
					$rootScope.formData.CKYC = true;
					sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
				}
				if (response.IsSuccess) {
					$rootScope.digilockerflow = response.DigiLockerSkip;
					if (response.OverallStatusList[0].KRAClient == 'Y' && response.OverallStatusList[0].CKYCClient == 'Y') {
						$rootScope.digilockerflow = false;
					}
					//$rootScope.formData.KRA = false;
					//$rootScope.formData.IsKRAUpdate = 'Y';
					if (response.DOBChangeFlag && (response.Mode.toLowerCase() == 'sa' || response.Mode.toLowerCase() == 'wb' || response.Mode.toLowerCase() == 'r' || response.Mode.toLowerCase() == 'wr')) {
						$rootScope.dobFreeze = false;
					} else {
						$rootScope.dobFreeze = true;
					}

					if (response.RMModule == "Y") {
						$rootScope.formData.RMModuleDocs = true;
						//$rootScope.formData.RMModule = true;
						//$rootScope.formData.rmDivAction = false;
					}
					if (response.IsAxisbankcust == 'Y') {
						$rootScope.isAxisBankDetailShow = true;
					}
					if ($rootScope.formData.fields.email && response.OverallStatusList[0].IsEmailVerified == true) {
						$rootScope.verifyemail = false;
						//$rootScope.verifyOTPSuccess = true;
					} else {
						$rootScope.verifyEmailDiv = true;
						$rootScope.verifyemail = true;
					}

					// check activation
					if (response.OverallStatusList[6].SPStatus == 'Y') {
						$rootScope.activation = true;
						var onboardsuccess = new bootstrap.Modal(document.getElementById('onboard-success'), {
							backdrop: 'static',
							keyboard: false
						});
						onboardsuccess.show();
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
						$rootScope.sipcompleted = true;
						return false
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

					if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT' && !$rootScope.amountPayable) {
						$rootScope.formData.isPaymentCompleted = true;
						$rootScope.formData.makePayment = false;
						sessionStorage.setItem('isPaymentCompleted', true);
						$rootScope.$broadcast("productStage", $rootScope.formData.isPaymentCompleted);
					} else {
						if (response.OverallStatusList[7].SPStatus != 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT' && !$rootScope.amountPayable) {
							$rootScope.formData.makePayment = false;
						}
						else if (!$rootScope.formData.NoPayment) {
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
							if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT' && !$rootScope.amountPayable) {
								$rootScope.formData.makePayment = false;
								sessionStorage.setItem('isPaymentCompleted', true);
							} else {
								if (response.OverallStatusList[7].SPStatus != 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT' && !$rootScope.amountPayable) {
									$rootScope.formData.makePayment = false;
								}
								else if (!$rootScope.formData.NoPayment) {
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
									$state.go('personalDetails', {
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
								$rootScope.formData.docStageCompleted = false;
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
									$rootScope.formData.docStageCompleted = false;
									$state.go('documentUpload', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							} else if (response.OverallStatusList[10] && (response.OverallStatusList[10].SPStatus == 'Y' && response.OverallStatusList[10].EBOStatus == 'R')) {
								// if (!$rootScope.docsErrorNav) {
								// $rootScope.docsErrorNav = true;
								$rootScope.formData.stageOrder = 8;
								$rootScope.formData.aadharhide = true;
								$state.go('Sip', {
									mobile: $rootScope.formData.EncMobile
								});
								// }
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
			})
		}
	}

	$interval(function () {
		$rootScope.overallStatus();
	}, 450000);

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
mainApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode(true);
	const params = JSON.parse(sessionStorage.getItem("searchParams") || '{}');


	let utm_source = '';
	let utm_medium = '';
	let utm_campaign = '';

	if (params) {
		utm_source = params.utm_source || '';
		utm_medium = params.utm_medium || '';
		utm_campaign = params.utm_campaign || '';
	}
	var filename = "";
	if (newLandingPage || sessionStorage.getItem('NewLandingPage')) {
		filename = "registernew.html";
	} else if (utm_source === 'Investor_App' || utm_source === 'Traders_App_Mobile' || utm_source === 'IFCHITTORGARH' || utm_source === 'IPOWATCH' || utm_source === 'BAJAJFINSERV' || utm_source === 'google_search' || utm_source === 'google_dv360') {
		filename = "utmindex1.html";
	} else {
		filename = "index.html";
	}
	$urlRouterProvider.when(`/${filename}`, '/register');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: `app/register/${filename}`,
			controller: 'registerController'
		})
		.state('websignapp', {
			url: '/websignapp',
			templateUrl: `app/register/${filename}`,
			controller: 'registerController'
		})
		.state('checkstatus', {
			url: '/checkstatus',
			templateUrl: `app/register/${filename}`,
			controller: 'registerController'
		})
		.state('digiData', {
			url: '/digiData',
			templateUrl: 'app/digiData/index.html',
			controller: 'digiDataController'
		})
		.state('register', {
			url: '/register',
			templateUrl: `app/register/${filename}`,
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
		/* .state('docUpload', {
			url: '/docUpload?mobile',
			templateUrl: 'app/docUpload/index.html',
			controller: 'docController'
		}) */
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
		/* .state('closure', {
			url: '/closure',
			templateUrl: 'app/closure/index.html',
			controller: 'closureController'
		}) */
		.state('closureotp', {
			url: '/closureotp',
			templateUrl: 'app/closureotp/index.html',
			controller: 'closureotpController'
		})
		.state('Byod', {
			url: '/Byod?mobile',
			templateUrl: 'app/Byod/index.html',
			controller: 'ByodController'
		})
		.state('Sip', {
			url: '/sip?mobile',
			templateUrl: 'app/sip/index.html',
			controller: 'sipController'
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
		.state('ipv', {
			url: '/ipv',
			templateUrl: 'app/ipv/index.html',
			controller: 'ipvController'
		})

	$urlRouterProvider.otherwise('/register');
}
]);

mainApp.controller('appController', ['$scope', '$rootScope', '$state', 'serverService', '$location', '$window', '$timeout', function ($scope, $rootScope, $state, serverService, $location, $window, $timeout) {
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

		if ($rootScope.searchParams.utm_campaign && $rootScope.searchParams.utm_medium) {
			if ($rootScope.searchParams.utm_campaign.includes('quantifi')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_169';
			}
			if ($rootScope.searchParams.utm_campaign.includes('bmedia')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_5f9f9175babe7122ec1ed7c2';
			}
			if ($rootScope.searchParams.utm_campaign.includes('opicle')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_1216';
			}
			if ($rootScope.searchParams.utm_campaign.includes('dangleads')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_150';
			}
			if ($rootScope.searchParams.utm_campaign.includes('admitad')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_7979c9f6e6';
			}
			if ($rootScope.searchParams.utm_campaign.includes('ad2click')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_5faa3718f2916f236b2d5018';
			}
			if ($rootScope.searchParams.utm_campaign.includes('mrndigital')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_5faa3f0aa1f49053265c5bb9';
			}
			if ($rootScope.searchParams.utm_campaign.includes('seventynine')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_71976';
			}
			if ($rootScope.searchParams.utm_campaign.includes('adsclues')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_2182';
			}
			if ($rootScope.searchParams.utm_campaign.includes('iqweb')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_1728';
			}
			if ($rootScope.searchParams.utm_campaign.includes('optimedia')) {
				utm_medium = $rootScope.searchParams.utm_medium + '_1894';
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
			AffiliateName: affiliateName,
			AffiliateAcquiredCustomer: affiliateAcquiredCustomer,
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
				$rootScope.formData.ReferKey = response.RK;
				sessionStorage.setItem("ReferKey", response.RK);
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
		}, function (e) {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}

	/*$(document).on('click', '.help-notification', function () {
	$('#helpNotification').modal('show');
	});*/
	$rootScope.getHelp = function () {
		var parentElement = angular.element(document.querySelector('.help-body'));
		var tobeClonedElement = angular.element(document.querySelector('.guideline-with-bg'));
		parentElement.html(tobeClonedElement.clone());
		var helpNotification = new bootstrap.Modal(document.getElementById('helpNotification'));
		helpNotification.show();
	}

	$rootScope.NonKRAVerifiedPopup = function (content, status, url) {
		if (status === 'hide') {
			$('#' + content).modal('hide');
		} else {
			// $('#' + content).modal('show');
			var contentNotification = new bootstrap.Modal(document.getElementById(content));
			contentNotification.show();
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

				$state.go('address', {
					mobile: $rootScope.formData.EncMobile
				});

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
		$rootScope.wizardShow = false;
		if ($rootScope.opencheckAStatus || ($rootScope.vcip && $rootScope.formData.vcipGetOTP)) {
			location.reload()
		}
		$state.go('register', {
			mobile: $rootScope.formData.EncMobile
		});
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
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						$rootScope.formData.panStatus = 'Your account is under process in another mode';
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
				$rootScope.getDataError++;
				sessionStorage.setItem('getDataError', $rootScope.getDataError);
				if ($rootScope.getDataError > 3) {
					$rootScope.getDataMsg = "Forgot your details? Call us to retrieve your details";
				} else {
					$rootScope.getDataMsg = response.ErrorMessage;
				}
				var continueapp = new bootstrap.Modal(document.getElementById('continueapp'), {
					backdrop: 'static',
					keyboard: false
				});
				continueapp.show();
				$rootScope.getDataFail = true;
				$state.go('register', {
					mobile: $rootScope.formData.EncMobile
				});
			}
		})

	}

	$scope.continueRmvia = function () {
		if ($rootScope.redirectUrl) {
			window.location.href = $rootScope.redirectUrl;
			sessionStorage.setItem($rootScope.redirectUrl, "RedirectURL");
			console.log($rootScope.redirectUrl, "RedirectURL");
		}
	}

	$rootScope.openThankyouPage = function () {
		if (!$rootScope.SipStockCompleted) {
			$state.go('Sip');
		} else {
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

		if ($rootScope.formData.stageInfo == '3' && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
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
		} else if ($rootScope.formData.stageInfo != '3' && !$rootScope.EsignSpstatus) {
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
	}

	$rootScope.secondSection = function () {
		if ($rootScope.firstCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$state.go('address', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}

	$rootScope.thirdSection = function () {
		if ($rootScope.secondCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$rootScope.formData.stageInfo = '3';
			$state.go('personalDetails', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}

	$rootScope.fourthSection = function () {
		if ($rootScope.thirdCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$rootScope.formData.stageInfo = '4';
			$state.go('bank', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}

	$rootScope.fifthSection = function () {
		if ($rootScope.fourthCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$rootScope.formData.stageInfo = '5';
			$state.go('products', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}

	$rootScope.sixthSection = function () {
		if ($rootScope.fifthCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$rootScope.formData.stageInfo = '6';
			$state.go('documentUpload', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}
	$rootScope.eightSection = function () {
		if ($rootScope.sixthCompleted && !$rootScope.formData.applicationDisabled && !$rootScope.verifyEmailDiv && !$rootScope.EsignSpstatus) {
			$rootScope.getAPI = false;
			$rootScope.formData.stageInfo = '8';
			$state.go('Sip', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}
	$rootScope.seventhSection = function () {
		if ($rootScope.formData.docStageCompleted && !$rootScope.verifyEmailDiv) {

			var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + $rootScope.formData.eRefNumber + '&Esign=NSDL';
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
					var customerSMS = new bootstrap.Modal(document.getElementById('customerSMS'), {
						backdrop: 'static',
						keyboard: false
					});
					customerSMS.show();
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
		var AxisPreferences = new bootstrap.Modal(document.getElementById('AxisPreferences'), {
			backdrop: 'static',
			keyboard: false
		});
		AxisPreferences.show();
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
				//sendData = $rootScope.encryptReq(sendData);
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.accountStatus = response.AccountStatus;
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
					$rootScope.purgingStatus = false;
					$rootScope.Extmobile = response.Mobile;
					$rootScope.Extemail = response.Email;
					$rootScope.existingRef = response.ReferenceNumber;
					$rootScope.existingeRefNumber = response.EncReferenceNumber;
					$rootScope.existingResponse = true;

				}

			}, function (e) {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		}
	}

	$rootScope.validateExtOTP = function () {
		$rootScope.showextotpStatus = false;
		if ($rootScope.formData.fields.ExtOTP) {
			if ($rootScope.formData.RMModule) {
				var url = "OTPValidationnewEncS";
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
				var p = '';
				var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
				if (pan_filter.test($rootScope.formData.fields.panMobile)) {
					p = $rootScope.formData.fields.panMobile;
				}

				var sendData = {
					'Mobile': $rootScope.Extmobile,
					'Email': $rootScope.Extemail,
					"MobileOtpCode": $rootScope.formData.fields.ExtOTP,
					"EmailOtpCode": '',
					"MobileFlag": true,
					"EmailFlag": false,
					"IsDiy": true,
					"PanNumber": p
				}
			}
			sendData = $rootScope.encryptReq(sendData);
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				// if ($rootScope.formData.RMModule) {
				response = $rootScope.decryptRes(a.data, 'Response');
				// }
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
				}
				if (response.IsSuccess) {

					if ($rootScope.vcip) {
						$rootScope.formData.vcipGetOTP = false;
						$rootScope.existingCustomer = true;
						$rootScope.formData.ReferenceNumber = response.ReferenceNumber;

						$('#panInformation').modal('hide');
						if (!$rootScope.signatureCompleted) {
							$('#existingCustomer-popup').modal('hide');
						} else if (!$rootScope.esignCompleted) {
							$('#existingCustomer-popup').modal('hide');
							setTimeout(function () {
								var formPDF = new bootstrap.Modal(document.getElementById('formPDF'), {
									backdrop: 'static',
									keyboard: false
								});
								formPDF.show();
							}, 1000);
							if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if ($rootScope.uBank) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/UtrakshIndex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							}
						} else if (!$rootScope.SipStockCompleted) {
							$state.go('Sip');
						} else {
							$('#existingCustomer-popup').modal('hide');
							signature = '';
							$rootScope.formData = {};
							$rootScope.formData.fields = {};
							$window.sessionStorage.clear();
							$rootScope.verifyemail = false;
							$state.go('complete');
						}
						return false;
					} else if (mode == 'V') {
						$rootScope.clearBrowsingData();
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
							backdrop: 'static',
							keyboard: false
						});
						APIResponseModal.show();
						$rootScope.apiResponseErrorMsg = "Already processed under Video kyc mode.";
						return false;
					}

					if (response.EmailVerified == 'Y') {
						$rootScope.verifyemail = false;
					} else {
						$rootScope.verifyemail = true;
					}

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
						$rootScope.formData.apiLoading = true;
						serverService.apiCall(encryptURL, sendDataURL).then(function (decRes) {
							// var decryptResponse = decRes.data;
							var decryptResponse = $rootScope.decryptRes(decRes.data, 'Response');
							$rootScope.formData.apiLoading = false;
							$rootScope.formData.referralCode = '';
							if (decryptResponse.IsSuccess) {
								sessionStorage.setItem('ClientFullName', decryptResponse.ClientName)
								if (decryptResponse.EsignStatus == "Y" && sessionStorage.getItem('EsginBYOD') == 'true') {
									var EsignStatus = new bootstrap.Modal(document.getElementById('EsignStatus'), {
										backdrop: 'static',
										keyboard: false
									});
									EsignStatus.show();
									return;
								}
								if (decryptResponse.BankShortName && decryptResponse.BankShortName.toUpperCase() == "UFS") {
									$rootScope.uBank = true;
									sessionStorage.setItem("uBank", 'UFS')
									$rootScope.bankUB();
								}
								if (decryptResponse.Mode && decryptResponse.Mode == 'V') {
									$rootScope.vcip = true;
									// $rootScope.digilockerflow=false;
								}
								if (decryptResponse.Mode && decryptResponse.Mode == 'B') {
									$rootScope.BYOD = true;
									// $rootScope.digilockerflow=false;
								}
								if (decryptResponse.Mobile && decryptResponse.Mobile.toLowerCase() != "null") {
									sessionStorage.setItem("RxMobile", decryptResponse.Mobile);
									$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile');
								}
								sessionStorage.setItem("namegetMismatch", decryptResponse.NameMatch);
								sessionStorage.setItem("DobgetMismatch", decryptResponse.DOBMatch);
								if (decryptResponse.ReferenceNumber) {
									sessionStorage.setItem("RxReferenceNumber", decryptResponse.ReferenceNumber);
								}
								if (decryptResponse.RefNumber) {
									sessionStorage.setItem('AxNo', decryptResponse.RefNumber);
								}
								if (decryptResponse.Mode == "V" || decryptResponse.Mode == "B") {
									sessionStorage.setItem("namegetMismatch", decryptResponse.NameMatch);
									sessionStorage.setItem("DobgetMismatch", decryptResponse.DOBMatch);
									if ((decryptResponse.Mode == 'V' || decryptResponse.Mode == 'B') && (decryptResponse.NameMatch != "Y" || decryptResponse.DOBMatch != "Y")) {
										$state.go('register');
										$rootScope.emailMobile = false;
										$rootScope.pan = true;
										$rootScope.formData.fields.panNumber = decryptResponse.PANNumber
										sessionStorage.setItem("RxPan", decryptResponse.PANNumber);
										sessionStorage.setItem("DOBMismatch", decryptResponse.DOB);
										sessionStorage.setItem("pannamemismatch", decryptResponse.ClientName);
										$rootScope.formData.dob = decryptResponse.DOB;
										$rootScope.formData.fields.DOB = decryptResponse.DOB;
										$rootScope.formData.fields.username = decryptResponse.ClientName;

										setTimeout(function () {
											$('#pan').prop('disabled', true)
											$('#txtDOB').prop('disabled', true)
											$('#panCName').prop('disabled', true)
											if (decryptResponse.NameMatch != "Y") {
												$rootScope.formData.fields.username = decryptResponse.ClientName
												$('#panCName').prop('disabled', false)
											}
											if (decryptResponse.DOBMatch != "Y") {
												$('#txtDOB').prop('disabled', false)
											}

										}, 3000)
										return
									}
								}

								sessionStorage.setItem("namegetMismatch", decryptResponse.NameMatch);
								sessionStorage.setItem("DobgetMismatch", decryptResponse.DOBMatch);
								if (decryptResponse.NameMatch != "Y" || decryptResponse.DOBMatch != "Y") {
									$state.go('register');
									$rootScope.emailMobile = false;
									$rootScope.pan = true;
									$rootScope.formData.fields.panNumber = decryptResponse.PANNumber
									sessionStorage.setItem("RxPan", decryptResponse.PANNumber);
									sessionStorage.setItem("DOBMismatch", decryptResponse.DOB);
									sessionStorage.setItem("pannamemismatch", decryptResponse.ClientName);
									$rootScope.formData.dob = decryptResponse.DOB;
									$rootScope.formData.fields.DOB = decryptResponse.DOB;
									$rootScope.formData.fields.username = decryptResponse.ClientName;

									setTimeout(function () {
										$('#pan').prop('disabled', true)
										$('#txtDOB').prop('disabled', true)
										$('#panCName').prop('disabled', true)
										if (decryptResponse.NameMatch != "Y") {
											$rootScope.formData.fields.username = decryptResponse.ClientName
											$rootScope.formData.fields.panNumber = decryptResponse.PANNumber
											$rootScope.formData.fields.DOB = decryptResponse.DOB;
											$('#panCName').prop('disabled', false)
										}
										if (decryptResponse.DOBMatch != "Y") {
											$('#txtDOB').prop('disabled', false)
										}
										window.location.reload();
									}, 100)
									return;

								}
								if (decryptResponse.Mode == 'I' && !$rootScope.ibmbResume) {
									/*$rootScope.webfinacle = true;
									$rootScope.formData.fields.panNumber = decryptResponse.PANNumber;
									//$rootScope.getIBInfo(decryptResponse.PANNumber);
									if ($rootScope.webfinacle && $rootScope.formData.CKYC && $rootScope.formData.KRA) {
									$rootScope.ibDocumentHide = true
									}

									if ($rootScope.webfinacle && $rootScope.formData.CKYC && !$rootScope.formData.KRA) {
									$rootScope.ibDocumentHide = true
									$rootScope.ibCkycDocumentShow = true
									}*/
									$('#existingCustomer-popup').modal('hide');
									var paninformation = new bootstrap.Modal(document.getElementById('paninformation'), {
										backdrop: 'static',
										keyboard: false
									});
									paninformation.show();
									$rootScope.ibResumeError = true;
									$rootScope.formData.panStatus = 'It seems that an application for this customer already exists. Please resume your journey through Axis Bank Internet or Mobile Banking to resume.';
									return false;
								}

								if (decryptResponse.BankShortName) {
									utm_bank = decryptResponse.BankShortName;
									$rootScope.getBankLogo();
								} else {
									$rootScope.bgImgDesktop = '';
									$rootScope.bgImgMobile = '';
									$rootScope.bgImg = '';
								}
								if (decryptResponse.Mode && decryptResponse.Mode == 'R') {
									$rootScope.rmmodewb = true
								}
								$rootScope.Extmobile = decryptResponse.Mobile;
								$rootScope.Extemail = decryptResponse.Email;
								$rootScope.ExtDOB = decryptResponse.DOB;
								$rootScope.ExtpanNumber = decryptResponse.PANNumber;
								$rootScope.formData.fields.username = decryptResponse.ClientName
								// if($rootScope.digiarr.includes(	$rootScope.ExtpanNumber)){
								// 	$rootScope.digilockerflow=true;
								// 	sessionStorage.setItem('digilockerflow',$rootScope.digilockerflow)
								// }
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

								if (decryptResponse.Mode == 'J' && decryptResponse.PanNumberAes128Enc) {
									panNumber = decryptResponse.PanNumberAes128Enc;
									$rootScope.PanNumberEnc = panNumber;
									$rootScope.getJanaDetails();
								}

								var s_url = "GetOverallStatusDIY";
								// $rootScope.formData.apiLoading = true;
								var sendData = {
									ReferenceNumber: $rootScope.existingeRefNumber
								};
								$rootScope.resumejourney = false;
								serverService.apiCall(s_url, sendData).then(function (a) {
									var statusResponse = a.data;
									$rootScope.resumejourney = false;
									$rootScope.askDigiLocker = statusResponse.Digilocker;
									$rootScope.digiLockerCount = statusResponse.DigilockerCount;
									$rootScope.digiReferenceNumber = statusResponse.DigiReferenceNumber;
									$rootScope.digiOption = statusResponse.Digioption;
									$rootScope.ipvRetakeCount = statusResponse.RetakeMaxCount;
									$rootScope.DifferentlyAbledStatus = statusResponse.DifferentlyAbledStatus;
									if (statusResponse.DigiAadhar) {
										sessionStorage.setItem('DigiAadhar', statusResponse.DigiAadhar.substring(8, 12))
									}
									if ($rootScope.DifferentlyAbledStatus === 'Y') {
										$('#existingCustomer-popup').modal('hide');
										$rootScope.formData.apiLoading = false;
										const ele = document.getElementById('OverallDisabilityModal');
										var m = new bootstrap.Modal(ele, {
											backdrop: 'static',
											keyboard: false
										});
										m.show();
										return;
									}
									$rootScope.profileSpstatus = statusResponse.OverallStatusList[1].SPStatus == "Y" ? true : false;
									if (statusResponse.Mode == 'I' && statusResponse.OverallStatusList[0].CKYCClient == 'Y') {
										$rootScope.digilockerflow = false;
										$rootScope.formData.CKYC = true;
										sessionStorage.setItem('IsCKYC', $rootScope.formData.CKYC);
									}
									if (statusResponse.IsSuccess) {
										$rootScope.formData.apiLoading = false;
										$rootScope.formData.fields.email = $rootScope.Extemail;
										$rootScope.digilockerflow = statusResponse.DigiLockerSkip;
										if (statusResponse.OverallStatusList[0].KRAClient == 'Y' && statusResponse.OverallStatusList[0].CKYCClient == 'Y') {
											$rootScope.digilockerflow = false;
										}
										setTimeout(function () {
											$('#emailID').val('')
										}, 100)
										if ($rootScope.formData.fields.email && statusResponse.OverallStatusList[0].IsEmailVerified == true) {
											$rootScope.verifyemail = false;
											$rootScope.verifyEmailDiv = false;
										} else {
											$rootScope.verifyemail = true;
											$rootScope.verifyEmailDiv = true;
										}

										if (statusResponse.OverallStatusList[0].KRAClient == 'Y') {
											$rootScope.formData.KRA = true;

											sessionStorage.setItem('IsKRA', $rootScope.formData.KRA);
										} else {
											sessionStorage.setItem('IsKRA', false);
										}

										if (statusResponse.OverallStatusList[0].CKYCClient == 'Y') {
											$rootScope.formData.CKYC = true;
											sessionStorage.setItem('IsCKYC', true)
										} else {
											$rootScope.formData.CKYC = false;
										}

										if (statusResponse.OverallStatusList[0].EBOStatus == 'R' || statusResponse.OverallStatusList[0].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[0].EBOStatus == 'R') {
												$rootScope.getRejectedResponse();
											} else {
												$rootScope.existingStatus = "You have not completed the onboarding Process post Registration. You would redirected to the pending stages."
											}
										} else if (statusResponse.OverallStatusList[1].EBOStatus == 'R' || statusResponse.OverallStatusList[1].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[1].EBOStatus == 'R') {
												$rootScope.getRejectedResponse();
											} else {
												$rootScope.existingStatus = "You have not completed the KYC Process. Please complete the same to help us in opening your account."
											}
										} else if (statusResponse.OverallStatusList[4].EBOStatus == 'R' || statusResponse.OverallStatusList[4].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[4].EBOStatus == 'R') {
												$rootScope.getRejectedResponse();
											} else {
												$rootScope.existingStatus = "You have not completed the KYC Process. Please complete the same to help us in opening your account."
											}
										} else if (statusResponse.OverallStatusList[3].EBOStatus == 'R' || statusResponse.OverallStatusList[3].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[3].EBOStatus == 'R') {
												$rootScope.getRejectedResponse();
											} else {
												$rootScope.existingStatus = "We require your bank details to link with demat and trading account with us. You have not provided the same. Provide the details to complete the account opening journey."
											}
										} else if (statusResponse.OverallStatusList[2].EBOStatus == 'R' || statusResponse.OverallStatusList[2].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[2].EBOStatus == 'R') {
												$rootScope.getRejectedResponse();
											} else {
												$rootScope.existingStatus = "You need to choose prefered trading segments i.e. equity, derivatives, commodities, mutual fund. To set the same we would require you to complete the process."
											}
										} else if (statusResponse.OverallStatusList[7].SPStatus != 'Y') {
											if ($rootScope.formData.RMModuleDocs) {
												$rootScope.existingStatus = "Kindly complete your digital journey Payment, E-sign and Video IPV";
											} else {
												$rootScope.existingStatus = "You not completed the payment process.";
											}
										} else if (statusResponse.OverallStatusList[5].EBOStatus == 'R' || statusResponse.OverallStatusList[5].SPStatus != 'Y') {
											if (statusResponse.OverallStatusList[5].EBOStatus == 'R') {
												$rootScope.formData.docStageRejected = true;
												$rootScope.formData.docStageCompleted = false;
												$rootScope.getRejectedResponse();
											} else {
												if (statusResponse.OverallStatusList[5].KRAClient == 'Y' && $rootScope.formData.isg && $rootScope.formData.accountStatus == "ClientCompleted") {
													$rootScope.existingRedirect = false;
													$rootScope.existingStatus = "<span class='ax-bold-title'>Welcome To Axis Securities Family :</span><br><br>We have received, your request for opening account online. It is under process as of now.";
												} else {
													$rootScope.existingStatus = "KYC Documents are not uploaded by you. Upload the same and set your account."
													$rootScope.extPoaDownload = true;
												}

											}
										}
										else if (statusResponse.OverallStatusList[9].SPStatus == 'Y' && statusResponse.OverallStatusList[8].SPStatus != 'Y' && statusResponse.Digilocker != "Y" && (statusResponse.OverallStatusList[0].KRAClient == "N" || statusResponse.OverallStatusList[0].CKYCClient == "N" || statusResponse.OverallStatusList[0].KRAUpdate == 'Y')) {
											$state.go('ipv');
										}
										// else if (statusResponse.OverallStatusList[9].SPStatus == 'Y' && statusResponse.OverallStatusList[8].SPStatus == 'Y') {

										// $rootScope.updateDIY();

										// } 
										else if (statusResponse.OverallStatusList[9].SPStatus != 'Y') {
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

										} else if (statusResponse.OverallStatusList[8].SPStatus != 'Y') {
											$rootScope.existingStatus = 'You are just one step away and complete our In Person Verification (IPV) process';
										}

										else if ((statusResponse.OverallStatusList[8].SPStatus == 'Y' && statusResponse.OverallStatusList[9].SPStatus == 'Y' && (statusResponse.OverallStatusList[10] && statusResponse.OverallStatusList[10].SPStatus != 'Y')) || ($rootScope.SipCancelation)) {
											$rootScope.firstCompleted = true;
											$rootScope.secondCompleted = true;
											$rootScope.thirdCompleted = true;
											$rootScope.fourthCompleted = true;
											$rootScope.fifthCompleted = true;
											$rootScope.sixthCompleted = true;
											$rootScope.sipcompleted = false;
											$rootScope.formData.aadharhide = true;
											$rootScope.wizardShow = true;
											$rootScope.nonKraIPVCompleteStatus = false;
											$rootScope.formData.displayNonKraIpvButton = true;
											$rootScope.displayNonKraEsignButton = false;
											$rootScope.formData.ReferenceNumber = $rootScope.existingRef;
											$rootScope.formData.eRefNumber = $rootScope.existingeRefNumber;
											sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);

											$state.go('Sip', {
												mobile: $rootScope.formData.EncMobile
											});
											setTimeout(function () {
												$('#existingCustomer-popup').modal('hide');
												/*$('#formPDF').modal({
												backdrop: 'static',
												keyboard: false
												});*/
											}, 1000);
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
									else if (!statusResponse.IsSuccess && statusResponse.ErrorCode == '-1') {
										$rootScope.formData.apiLoading = false;
										$rootScope.formData.panStatus1 = statusResponse.ErrorMessage;
										var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
											backdrop: 'static',
											keyboard: false
										});
										paninformation.show();
										return
									}
								});

							} else if (!decryptResponse.IsSuccess && decryptResponse.ErrorCode == '-1') {
								$rootScope.formData.apiLoading = false;
								$rootScope.formData.panStatus1 = decryptResponse.ErrorMessage;
								var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
									backdrop: 'static',
									keyboard: false
								});
								paninformation.show();
								return
							} else {
								$('#existingCustomer-popup').modal('hide');
								$rootScope.formData.fields.mobile = '';
								$rootScope.formData.ReferenceNumber = '';
								$state.go('register');
								$window.sessionStorage.clear();
								var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.apiResponseErrorMsg = "Unable to fetch data, please try again later.";
								APIResponseModal.show();
								setTimeout(function () {
									location.reload();
								}, 3000)
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
					$rootScope.formData.otpErrorMsg = response.ErrorMessage;
				}
			})
		} else {
			$rootScope.emptyExtOTP = true;
		}
	}

	$rootScope.bankUB = function () {
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
					if (response.BankDetailsList[0].PromoCode) {
						sessionStorage.setItem('utm_promoCode', response.BankDetailsList[0].PromoCode)
					}
				}
			}
		})
	}

	$rootScope.existingProceed = function () {
		//$rootScope.getExtOTP();
		//$rootScope.EncryptToken = response.EncryptToken;
		//sessionStorage.setItem('AxToken', $rootScope.EncryptToken);
		//if (!$rootScope.vcip) {
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
		/*} else {
		$('#verifyemail').modal('hide');
		}*/
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
			} else { }
		}, function (e) {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
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
						var mobsuccess = new bootstrap.Modal(document.getElementById('mob-success'), {
							backdrop: 'static',
							keyboard: false
						});
						mobsuccess.show();
						if ($rootScope.formData.ReferenceNumber) {
							//window.location.assign("https://106.51.0.40:9012/IPVModule/IPV.html?ReferenceNumber="+$rootScope.formData.eRefNumber+"=&type=0&Help=true");
						} else {
							var mobsuccess = new bootstrap.Modal(document.getElementById('mob-success'), {
								backdrop: 'static',
								keyboard: false
							});
							mobsuccess.show();
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
				}
			}, function (e) {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
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
		$state.go('checkstatus');
		setTimeout(function () {
			var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'), {
				backdrop: 'static',
				keyboard: false
			});
			existingCustomerpopup.show();

		}, 600)
		// var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'))
		// 	existingCustomerpopup.show();

	}

	$rootScope.formData.helpPopup = function () {
		var callpopup = new bootstrap.Modal(document.getElementById('call-popup'))
		callpopup.show()
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
		$state.go('register');
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
				var customerSMS = new bootstrap.Modal(document.getElementById('customerSMS'), {
					backdrop: 'static',
					keyboard: false
				});
				customerSMS.show();
				$rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
				return false;
			}
		});
	}

	//Rm reference number popup
	$rootScope.rmReferenceCall = function () {
		var modalrmReferenceNumberPopup = new bootstrap.Modal(document.getElementById('modalrmReferenceNumber'))
		modalrmReferenceNumberPopup.show()
	}

	$rootScope.finRedirect = function () {
		window.location.assign("https://investments.axisbank.co.in/login?loginType=DM&data=" + customerId);
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
			}, 10)
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
				var MailSuccess = new bootstrap.Modal(document.getElementById('MailSuccess'), {
					backdrop: 'static',
					keyboard: false
				});
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
					$rootScope.formData.rmCodeInvalid = true;
				}
			}, function (e) {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
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
			$state.go('register', {
				mobile: $rootScope.formData.EncMobile
			});
		}
	}

	$rootScope.rmPageFn = function () {
		$rootScope.formData.changePassword = true;
		sessionStorage.setItem('changePassword', true);
		$state.go('rmPage');
		$('#rm-popup').modal('hide');
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

		var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.rmPassword);
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
				if (response.WarningMessage && response.BeforePasswordExpireFlag == 'Y') {
					$rootScope.warningMessageError = response.WarningMessage;

					$timeout(function () {
						$rootScope.warningMessageError = false;
					}, 7000)
				}
				$rootScope.formData.rmDivAction = false;
				$rootScope.formData.invalidCredentials = false;
				$rootScope.formData.RMModuleDocs = true;
				$rootScope.formData.RMModule = true;
				$rootScope.EncryptToken = response.EncryptToken;
				$rootScope.formData.fields.rmcode = response.RMEmployeeCode;
				$rootScope.formData.fields.rmid = response.RMDetails.RMId;
				$rootScope.formData.rmName = response.RMDetails.RMName;
				$rootScope.formData.RMTeam = response.RMDetails.RMTeam;
				$rootScope.formData.RMLGLCCode = response.RMDetails.RMCode;
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
				if (!response.RMDetails.RoleName) {
					$rootScope.rmdesignation = true;
					sessionStorage.setItem('rmdesignation', true);
					$state.go('rmPage');
					$('#rm-popup').modal('hide');
				}
				if (!response.RMDetails.NameOfOrganisation) {
					$rootScope.rmOrganization = true;
					sessionStorage.setItem('rmOrganization', true);
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
					$rootScope.formData.invalidCredentialsMsg = response.ErrorMessage;
				}
			}
		}, function (e) {
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}
	// $rootScope.rmextresendCounter = function () {
	// 	$rootScope.formData.RMExtResendDisable = true;
	// 	var counter1 = 59;
	// 	$rootScope.RMExtcounter = "00:59";

	// 	$rootScope.extrunTimer = setInterval(function () {
	// 		counter1--;
	// 		if (counter1 < 55) {
	// 			$rootScope.RMshowextotpStatus = false;
	// 		}
	// 		if (counter1 < 10) {
	// 			counter1 = "0" + counter1;
	// 		}
	// 		$rootScope.RMExtcounter = '00:' + counter1.toString();
	// 		if (counter1 < 1) {
	// 			$rootScope.formData.RMExtResendDisable = false;
	// 			$rootScope.formData.RMExtenableResendButton = true;
	// 			clearInterval($rootScope.extrunTimer);
	// 		}
	// 		$rootScope.$apply();
	// 	}, 1000);
	// }
	$rootScope.rmextresendCounter = function () {

		if ($rootScope.extrunTimer) {
			clearInterval($rootScope.extrunTimer);
		}
		$rootScope.formData.RMExtResendDisable = true;
		$rootScope.formData.RMExtenableResendButton = false;
		var counter = 59;
		$rootScope.RMExtcounter = "00:59";
		$rootScope.extrunTimer = setInterval(function () {
			counter--;
			$rootScope.$applyAsync(function () {
				var display = counter < 10 ? "0" + counter : counter;
				$rootScope.RMExtcounter = "00:" + display;
				if (counter <= 0) {
					clearInterval($rootScope.extrunTimer);
					$rootScope.formData.RMExtResendDisable = false;
					$rootScope.formData.RMExtenableResendButton = true;
				}
			});
		}, 1000);
	};
	$rootScope.resendRMOTP = function () {
		if ($rootScope.formData.RMExtResendDisable) return;
		$rootScope.rmForgotPassword();
	};
	$rootScope.rmForgotPassword = function () {
		$rootScope.formData.RMExtenableResendButton = false;
		var username;
		if ($rootScope.encryptedRMUsername) {
			username = $rootScope.encryptedRMUsername;
		} else {
			var encryptedpassword = axisCrypto.enc($rootScope.formData.fields.rmUsername);
			username = encryptedpassword.toString();
			$rootScope.encryptedRMUsername = username;
		}
		var s_url = "ForgotPasswordForRM";

		var sendData = {
			"RMUserName": username,
			EncryptFlag: true
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
				$rootScope.formData.fields.rmUsername = response.RMDetails.RMUserName
				$rootScope.formData.RMError = false;
				sessionStorage.setItem('RMID', $rootScope.formData.fields.rmid);
				clearInterval($rootScope.extrunTimer);
				$rootScope.rmextresendCounter();
			} else {
				$rootScope.formData.RMError = true;
				$rootScope.formData.RMErrorMsg = response.ErrorMessage;
			}
		})
	}
	$rootScope.rmForgotOTPValidate = function () {
		var s_url = "OTPValidationencryption";

		var sendData = {
			"Mobile": $rootScope.formData.fields.rmMobile,
			"Email": $rootScope.formData.fields.rmEmail,
			"MobileOtpCode": $rootScope.formData.fields.rmMobileOTP,
			"EmailOtpCode": '',
			"MobileFlag": true,
			"EmailFlag": false,
			"EncryptFlag": true,
			"IsDiy": true,
			"RMUserName": $rootScope.formData.fields.rmUsername,
			"RoleName": $rootScope.formData.roleName,
			"IsForgotPasswordRM": true
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (a) {
			var decryptedpassword = axisCrypto.dec(a.data.Response);
			var da = decryptedpassword.toString(CryptoJS.enc.Utf8);
			var response = JSON.parse(da);
			console.log(response);
			// var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				$rootScope.formData.rmForgotOTP = true;
				$rootScope.formData.fields.rmcode = $rootScope.formData.fields.rmUsername;
				sessionStorage.setItem('RMCode', $rootScope.formData.fields.rmUsername)
				$rootScope.formData.changePassword = true;
				sessionStorage.setItem('changePassword', true);
				sessionStorage.setItem('rmForgotOTP', true);
				$state.go('rmPage');
				$('#rm-popup').modal('hide');
			} else {
				$rootScope.formData.rmMobileOTPError = true;
				$rootScope.formData.rmMobileOTPErrorMsg = response.ErrorMessage;
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
		$state.go('websignapp');
		setTimeout(function () {
			var rmpopup = new bootstrap.Modal(document.getElementById('rm-popup'), {
				backdrop: 'static',
				keyboard: false
			});
			rmpopup.show();

		}, 600)

		$rootScope.formData.rmloginPassword = true;
		$rootScope.formData.invalidCredentials = false;
		$rootScope.formData.rmForgotPassword = false;
		$rootScope.formData.rmOTPSection = false;
		$rootScope.typeRmPassword = false;
		$rootScope.formData.rmForgotOTP = false;
		$rootScope.formData.rmOptions = false;
		$rootScope.formData.fields.rmMobileOTP = '';
		$rootScope.formData.rmDivAction = true;
	}

	if (Isrmsign || pathname.includes("websignapp")) {
		$rootScope.rmPopup();
	}
	if (Isrmsign || pathname.includes("checkstatus")) {
		$rootScope.formData.callPopup();
	}
	$rootScope.formData.rmOptionsBox = function () {
		var rmpopup = new bootstrap.Modal(document.getElementById('rm-popup'));
		rmpopup.show();
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

	$rootScope.forgotPassword = function () {
		$rootScope.formData.RMError = false;
		/*var rmpopup = new bootstrap.Modal(document.getElementById('rm-popup'));
		rmpopup.show();*/
		$rootScope.formData.rmForgotPassword = true;
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
				"ReferenceNumber": $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
				"IsDiy": true
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				$rootScope.verifyemail = false;
				if (response.IsSuccess) {
					$rootScope.verifyOTPSuccess = true;
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
			ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
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
		// sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {

			var response = a.data;
			$rootScope.formData.apiLoading = false;
			var verifyemail = new bootstrap.Modal(document.getElementById('verifyemail'), {
				backdrop: 'static',
				keyboard: false
			});
			verifyemail.show();
			$rootScope.verifyOTPSuccess = false;
			$rootScope.verifyemail = true;
			$rootScope.verifyByLink = false;
			if (response.IsSuccess) {
				$scope.emailStatus = 'Verification link has been sent to your email.';
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
				$scope.emailStatus = 'Unable to send verification link, please try again.';
			}
			if ($rootScope.vcip) {
				setInterval(function () {
					if ($rootScope.verifyemail) {
						$rootScope.overallStatus();
					}
				}, 15000);
			}
		});
	}

	$rootScope.formFilling = function () {
		$rootScope.digiOptionUpdate('FMF');
		$rootScope.formData.digiData = false;
		$rootScope.digiOption = 'FMF';
		var s_geturl = "GetOverallStatusDIY";
		$rootScope.formData.apiLoading = true;
		var getsendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		};
		serverService.apiCall(s_geturl, getsendData).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var getresponse = a.data;
			$rootScope.digiLockerCount = getresponse.DigilockerCount;
			$rootScope.profileSpstatus = getresponse.OverallStatusList[1].SPStatus == "Y" ? true : false;
			$rootScope.dobFreeze = true;
			$rootScope.ipvRetakeCount = getresponse.RetakeMaxCount;
			if (!getresponse.IsSuccess && getresponse.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = getresponse.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			}
			if (getresponse.OverallStatusList[0].KRAClient == 'Y') {
				$rootScope.formData.KRA = true;
			}

			if (getresponse.OverallStatusList[0].CKYCClient == 'Y') {
				$rootScope.formData.CKYC = true;
			}
			$rootScope.digilockerflow = getresponse.DigiLockerSkip;
			if (getresponse.OverallStatusList[0].KRAClient == 'Y' && getresponse.OverallStatusList[0].CKYCClient == 'Y') {
				$rootScope.digilockerflow = false;
			}

			var encryptURL = "GetDecryptURL";
			var sendDataURL = {
				DecryptURL: $rootScope.formData.eRefNumber
			};
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(encryptURL, sendDataURL).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var decRes = $rootScope.decryptRes(a.data, 'Response');
				$rootScope.formData.dob = decRes.DOB;
				$rootScope.formData.ReferenceNumber = decRes.ReferenceNumber;
				sessionStorage.setItem('ClientFullName', decRes.ClientName)
				if ($rootScope.vcip || $rootScope.BYOD) {
					$state.go('documentUpload', {
						mobile: $rootScope.formData.EncMobile
					});
				} else if ($rootScope.formData.KRA) {
					$rootScope.ecommercekraValidation();
				} else if ($rootScope.formData.CKYC) {
					$rootScope.ecommerceCKYCValidation();
				} else {
					$state.go('address', {
						mobile: $rootScope.formData.EncMobile
					});
				}
			});

		});
	}

	$rootScope.digiOptionUpdate = function (a) {
		var url = 'DigiOption';
		var sendData = {
			digioption: a,
			ReferenceNumber: $rootScope.formData.eRefNumber
		}
		serverService.apiCall(url, sendData);
	}
	var digilockerFail = new bootstrap.Modal(document.getElementById('digilockerFail'), {
		backdrop: 'static',
		keyboard: false
	});
	$rootScope.getDigiLocker = function () {
		$('#digilockerFetchFail').modal('hide');
		if ($rootScope.digiLockerCount < 5) {
			$rootScope.digiCountError = false;
			$rootScope.digiOptionUpdate('DL');
			$rootScope.digiDataError = false;
			$rootScope.digiPanError = false;
			if ($rootScope.formData.RMModule || sessionStorage.getItem('mode') == "R") {
				$rootScope.wizardShow = false;
				$('#digilocker').modal('hide');
				$('#digilockerError').modal('hide');
				$('#digilockerFetchFail').modal('hide');
				$rootScope.formData.digiData = true;
				$state.go('digiData');
			} else {
				var apiurl = "Digilockercreate";
				var sendData = {
					"pan_no": $rootScope.formData.fields.panNumber,
					"ReferenceNumber": $rootScope.formData.eRefNumber,
				}
				$rootScope.formData.apiLoading1 = true;
				serverService.apiCall(apiurl, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading1 = false;
					if (response.IsSuccess) {
						$rootScope.hideDigiBtn = true;
						if (response.eaadhaar_data && response.eaadhaar_data.pc) {
							$rootScope.formData.digilockerData = response.eaadhaar_data;
							$rootScope.formData.digilockerPanData = response.pan_data;
							$rootScope.formData.digiData = true;
							sessionStorage.setItem('digiInfo', JSON.stringify(response.eaadhaar_data));
							$('#digilocker').modal('hide');
							$('#digilockerFetchFail').modal('hide');
							$('#digilockerError').modal('hide');
							$state.go('address');
						} else {
							$rootScope.digilockerUrl = response.digilocker_url;
							$rootScope.formData.digiRef = response.ref_no;
							window.open(response.digilocker_url, '_self', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
							$rootScope.getDigiData();
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
						$('#digilocker').modal('hide');
						$('#digilockerError').modal('hide');
						// $state.go('address');
						digilockerFail.show();
					}
				})
			}
		} else {
			$rootScope.digiCountError = true;
			//$state.go('address');
		}
	}

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
	$rootScope.Digiterms = function () {
		var Digiterms = new bootstrap.Modal(document.getElementById('Digiterms'), {
			backdrop: 'static',
			keyboard: false
		});
		Digiterms.show();
	}
	$rootScope.getDigiLocker1 = function () {
		$('#digilockerFetchFail').modal('hide');
		if (!$("#digitermscondition").is(":checked")) {
			$rootScope.digitmcondition = true;
			return
		} else {
			$rootScope.digitmcondition = false;
		}
		if ($rootScope.digiLockerCount < 5) {
			$rootScope.digiCountError = false;
			$rootScope.digiOptionUpdate('DL');
			$rootScope.digiDataError = false;
			$rootScope.digiPanError = false;
			if ($rootScope.formData.RMModule || sessionStorage.getItem('mode') == "R") {
				$rootScope.wizardShow = false;
				$('#digilocker').modal('hide');
				$('#digilockerError').modal('hide');
				$rootScope.formData.digiData = true;
				$state.go('digiData');
			} else {
				var apiurl = "Digilockercreate";
				var sendData = {
					"pan_no": $rootScope.formData.fields.panNumber,
					"ReferenceNumber": $rootScope.formData.eRefNumber,
				}
				$rootScope.formData.apiLoading1 = true;
				serverService.apiCall(apiurl, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading1 = false;
					if (response.IsSuccess) {
						$rootScope.hideDigiBtn = true;
						if (response.eaadhaar_data && response.eaadhaar_data.pc) {
							$rootScope.formData.digilockerData = response.eaadhaar_data;
							$rootScope.formData.digilockerPanData = response.pan_data;
							$rootScope.formData.digiData = true;
							sessionStorage.setItem('digiInfo', JSON.stringify(response.eaadhaar_data));
							$('#digilocker').modal('hide');
							$('#digilockerError').modal('hide');
							$state.go('address');
						} else {
							$rootScope.digilockerUrl = response.digilocker_url;
							$rootScope.formData.digiRef = response.ref_no;
							window.open(response.digilocker_url, '_self', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
							$rootScope.getDigiData();
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
						$('#digilocker').modal('hide');
						$('#digilockerError').modal('hide');
						// $state.go('address');
						var digilockerFail = new bootstrap.Modal(document.getElementById('digilockerFail'), {
							backdrop: 'static',
							keyboard: false
						});
						digilockerFail.show();
					}
				})
			}
		} else {

			$rootScope.digiCountError = true;
			//$state.go('address');
		}
	}
	// $rootScope.tryagain = function () {
	// 	$rootScope.fetchDigilokcerDetails(tok)
	// }
	var digilockerError = new bootstrap.Modal(document.getElementById('digilockerError'), {
		backdrop: 'static',
		keyboard: false
	});
	var digilockerFetchFail = new bootstrap.Modal(document.getElementById('digilockerFetchFail'), {
		backdrop: 'static',
		keyboard: false
	});
	$rootScope.fetchDigilokcerDetails = function (tok) {
		var apiurl2 = "Digilockerfetchdetails";
		var sendData2 = {
			"pan_no": $rootScope.formData.fields.panNumber,
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"DigiRef_no": tok
		}
		$rootScope.formData.FetchapiLoading = true;
		serverService.apiCall(apiurl2, sendData2).then(function (res) {
			var response = res.data.data;
			var response1 = res.data
			$rootScope.formData.apiLoading = false;
			$rootScope.formData.FetchapiLoading = false;
			// if($rootScope.formData.RMModule){
			// 	$rootScope.wizardShow=false;
			// }

			if (!response1.IsSuccess && response1.ErrorCode == "505") {
				$rootScope.digiNameErroMisMatch = false;
				$('#digilocker').modal('hide');
				digilockerFetchFail.show();
				return false;
			}
			if (!response1.IsSuccess && response1.ErrorCode == "515") {
				// setTimeout(function () {
				// $('#digilocker').modal('hide');
				// },0)
				// setTimeout(function () {
				$rootScope.digiNameErroMisMatch = true;
				$('#digilocker').modal('hide');
				digilockerFetchFail.show();
				return;
				// }, 100);
			}
			if (response) {
				if (response.eaadhaar_data && response.eaadhaar_data.pc) {
					$rootScope.formData.digilockerData = response.eaadhaar_data;
					$rootScope.formData.digilockerPanData = response.pan_data;
					$rootScope.formData.digiData = true;
					sessionStorage.setItem('digiInfo', JSON.stringify(response.eaadhaar_data));
					sessionStorage.setItem('digi', true);
					$('#digilocker').modal('hide');
					if ($rootScope.formData.digilockerPanData.number) {
						if ($rootScope.formData.fields.panNumber) {
							if ($rootScope.formData.fields.panNumber != $rootScope.formData.digilockerPanData.number) {
								$rootScope.formData.digilockerData = '';
								$rootScope.formData.digilockerPanData = '';
								$rootScope.formData.digiData = false;
								sessionStorage.removeItem('digiInfo');
								sessionStorage.removeItem('digi');
								digilockerError.show();
								$rootScope.digiPanError = true;
								return false;
							}
						} else {
							$rootScope.formData.digilockerData = '';
							$rootScope.formData.digilockerPanData = '';
							$rootScope.formData.digiData = false;
							sessionStorage.removeItem('digiInfo');
							sessionStorage.removeItem('digi');
							// var digilockerError = new bootstrap.Modal(document.getElementById('digilockerError'), {
							// 		backdrop: 'static',
							// 		keyboard: false
							// 	});
							$rootScope.digiPanError = true;
							digilockerError.show();
							return false;
						}
					}
					if ($rootScope.formData.KRA) {
						$rootScope.digiKRA = true;
						$rootScope.$broadcast("DIGIKRA", $rootScope.digiKRA);
					}
					$state.go('address');
				}
			} else {
				// if ($rootScope.digiLockerCount < 2) {
				// 	if (!$rootScope.formData.RMModule) {
				// 		$rootScope.formData.digiData = false;
				// 		sessionStorage.removeItem('digi');
				// 		digilockerError.show();
				// 		$rootScope.digiDataError = true;
				// 	}else{
				// 		$('#digilocker').modal('hide');
				// 		$('#digilockerError').modal('hide');
				// 		$('#digilockerFail').modal('hide');
				// 		$('#digilockerFail1').modal('hide');
				// 		$rootScope.formData.digilockerData = '';
				// 		$rootScope.formData.digilockerPanData = '';
				// 		$rootScope.wizardShow=false;
				// 		$rootScope.formData.digiData = false;
				// 		sessionStorage.removeItem('digiInfo');
				// 		sessionStorage.removeItem('digi');
				// 		if ($rootScope.formData.RMModule) {
				// 			$state.go('digiData');
				// 		} else {
				// 			$state.go('address');
				// 		}
				// 	}
				// } else {
				$rootScope.formData.digilockerData = '';
				$rootScope.formData.digilockerPanData = '';
				$rootScope.formData.digiData = false;
				sessionStorage.removeItem('digiInfo');
				sessionStorage.removeItem('digi');
				if ($rootScope.formData.RMModule) {
					$state.go('digiData');
				} else {
					digilockerError.show();
					$rootScope.digiDataError = true;
				}
				// }
			}
		});
	}

	$rootScope.startChat = function () {
		$rootScope.formData.showChat = true;
	}
	$rootScope.homeclear = function () {
		sessionStorage.clear();
		location.reload();
	}
	$rootScope.Credithomeclear = function () {
		$rootScope.wizardShow = false;
		if (sessionStorage.getItem('url')) {
			window.location.assign(sessionStorage.getItem('url'));
		} else {
			$window.sessionStorage.clear();
			$window.location.assign('https://digitalaccount.axisdirect.in/register')
		}
		// location.reload();
	}
	$rootScope.loginAxis = function () {
		$rootScope.wizardShow = false;
		sessionStorage.clear();
		$window.localStorage.clear()
		$window.sessionStorage.clear();
		window.location.assign('https://simplehai.axisdirect.in/app/index.php/user/authftlsl/activateAccount?utm_source=Website&utm_medium=Login&utm_campaign=Need_Help')
	}
	$rootScope.ResumeAxis = function () {

		/* $window.localStorage.clear()
						$window.sessionStorage.clear(); */
		$state.go('checkstatus');
		$rootScope.formData.callPopup();
		/* location.reload(); */
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
	$rootScope.encryptReq = function (param) {
		let obj = false;
		if (typeof (param) != "string") {
			param = JSON.stringify(param);
			obj = true;
		}
		var encreq = axisCrypto.enc(param);
		if (obj) {
			return { 'Encrequest': encreq.toString() };
		} else {
			return encreq.toString();
		}
	}
	$rootScope.decryptRes = function (param, objKey) {
		const decres = param[objKey];
		var decreq = axisCrypto.dec(decres);
		var da = decreq.toString(CryptoJS.enc.Utf8);
		return JSON.parse(da);
	}

}
]);
$(window).on('popstate', function () {
	$(document.body).removeClass('modal-open');
	$('.modal-backdrop').remove();
});
$(document).keyup(function (e) {
	if ($('button').is(':focus')) { }
	else {

		if (e.keyCode == 27) {
			return false;
		}
		// if (e.keyCode == 13 && e.target.id && e.target.id != 'input-newpan' && e.target.id != 'input-1newmob' && e.target.id != 'continueapp' && e.target.id != 'call-popup' && e.target.id != 'rm-popup' && e.target.id != "mobile-number1" && e.target.id != "pennyModal" && e.target.id != "NonKRAVerified" && e.target.id != 'rmUsername' && e.target.id != 'rmPassword') {
		// 	if (e.target.id == 'paninformation') {
		// 		angular.element(document.getElementById("paninformation")).scope().modalPop('paninformation');
		// 	}
		// 	if (e.target.id == 'continueapp') {
		// 	}

		// 	$('.modal').modal('hide');
		// }

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
