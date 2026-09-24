var serverComm = angular.module('serverComm', []);

//Server Service
serverComm.factory('serverService', ['$http', '$q', function ($http, $q) {
	var config = {
		 home: '/',
		 serverBaseUrl: 'https://apidigitalao.axisdirect.in/api/DIY/',
		 paymentBaseUrl: 'https://apidigitalao.axisdirect.in/',
		 assetsBaseUrl: 'https://digitalaccount.axisdirect.in/',
		 ipvBaseUrl: 'https://apidigitalao.axisdirect.in/IPV/',
		 esignBaseUrl: 'https://apidigitalao.axisdirect.in/api/Full/'
	};
	var PDFconfig = {
		/* Local host */
		TermsPDFUrl: window.location.origin + '/'
	};
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
	let apiEncryptList = [
		'GetOverallStatusDIY',
		'SignInRmEmployee',
		'EcommercePanSiteValidation',
		'UnAuthorizeOTPValidation',
		'DIYGetImagesByReferenceNumberFlag',
		'DIYGetThirdPartyBankDetailsByReferenceNumber',
		'UpdateEmailChanged',
		'DIYGetNomineeDetailsByReferenceNumber',
		'DIYGetBankDetailsByReferenceNumber',
		'DIYGetThirdPartyBankName',
		'RazorpayAccountValidation',
		'DIYClientBankRegistration',
		'WBTempPersistence',
		'VerifyKRAClientStatusEnc',
		'EmailVerificationUrl','KRAClientValidationupdate','DIYClientPersonalInfoProfile',
		'DIYClientOtherInfo','DIYGetDocumentProofStageByRefEnc', 'GetAppFormDetailsDIY', 'GetRefNoByPANMobileEnc',
		'DIYGetRegistrationInfoByReferenceNumber','FathernameUpdate','Digilockercreate','Digilockerfetchdetails','Documentextraction','CaptureDifferentlyAbled','WBTempPersistenceResume','ConvertToTinyUrl','DecryptSecuredTinyUrl'
	  ]
	return {
		bankCity: function (s_url, sendData) {
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				data: sendData,
				async: false
			});
		},
		apiCall: function (s_url, sendData) {
			 if (apiEncryptList.includes(s_url)) {
                var encryptedData = this.encryption(sendData);
                return $http({
                    method: "POST",
                    url: config.serverBaseUrl + s_url,
                    data: encryptedData,
                    headers: { 'Authorization': axisCrypto.basicAuthHeader() },
                }).then((response) => {
                    return this.decryption(response.data);
                });
            } else {
				return $http({
					method: "POST",
					url: config.serverBaseUrl + s_url,
					data: sendData,
					headers: {
						'Authorization': axisCrypto.basicAuthHeader()
					},
					async: false
				});
			}
			
		},
		EmpApiCall: function (s_url, sendData) {
			return $http({
				method: "POST",
				url: config.EmpServerBaseUrl + s_url,
				data: sendData,
				headers: {
					'Authorization': axisCrypto.basicAuthHeader()
				},
				async: false
			});
		},
		apiFormCall1: function (s_url, sendData) {
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				data: sendData,
				headers: {
					'Content-Type': undefined,
				},
				transformRequest: angular.identity
			});
		},
		apiUrlCall: function (s_url) {
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				headers: {
					'Authorization': axisCrypto.basicAuthHeader()
				},
				async: false
			});
		},
		apiTokenUrlCall: function (s_url, AuthDatas) {
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				headers: {
					'Authorization': 'Bearer ' + AuthDatas.Authorization + '',
					'Mobile': AuthDatas.Mobile,
					'Email': AuthDatas.Email,
					'IsAuthorized': 'True',
					'DOB': !angular.isUndefined(AuthDatas.DOB) ? AuthDatas.DOB : '',
					'PanNumber': !angular.isUndefined(AuthDatas.PanNumber) ? AuthDatas.PanNumber : ''
				},
				async: false
			}).error(function (status) {
				console.log(status)
			})
		},
		getApi: function (s_url) {
			var d = $q.defer();
			return $http({
				method: 'GET',
				url: config.serverBaseUrl + s_url,
				etagCache: true
			})
		},
		EmpGetList: function (s_url) {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: config.EmpServerBaseUrl + s_url
			}).
			success(function (data) {
				d.resolve(data);
			}).error(function () {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
			return d.promise;
		},
		getHome: function () {
			return config.home;
		},
		apiOfflineAadharUpload: function (s_url, sendData, AuthDatas) {
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				data: sendData,
				transformRequest: angular.identity,
				headers: {
					'Authorization': 'Bearer ' + AuthDatas.Authorization + '',
					'Mobile': AuthDatas.Mobile,
					'Email': AuthDatas.Email,
					'IsAuthorized': 'True',
					'DOB': !angular.isUndefined(AuthDatas.DOB) ? AuthDatas.DOB : '',
					'PanNumber': !angular.isUndefined(AuthDatas.PanNumber) ? AuthDatas.PanNumber : ''
				},
				async: false
			});
		},
		apiPaymentCall: function (s_url, sendData, AuthDatas) {
			window.location.assign(config.paymentBaseUrl + s_url);
		},
		pdfdiyUrl: function () {
			return config.assetsBaseUrl;
		},
		pdfUrl: function () {
			return config.paymentBaseUrl;
		},

		apiIPVCall: function (s_url, AuthDatas) {
			window.location.assign(config.ipvBaseUrl + s_url);
		},

		apiEsignCall: function (s_url, AuthDatas) {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: config.serverBaseUrl + s_url,
				headers: {
					'Authorization': 'Bearer ' + AuthDatas.Authorization + '',
					'Mobile': AuthDatas.Mobile,
					'Email': AuthDatas.Email,
					'IsAuthorized': 'True',
					'DOB': !angular.isUndefined(AuthDatas.DOB) ? AuthDatas.DOB : '',
					'PanNumber': !angular.isUndefined(AuthDatas.PanNumber) ? AuthDatas.PanNumber : ''
				}
			}).
			success(function (data) {
				d.resolve(data);
			}).error(function () {
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
			return d.promise;
		},encryption: function (param) {
			let obj = false;
			if (typeof(param) != "string") {
				param = JSON.stringify(param);
				obj = true;
			}
			var encreq = axisCrypto.enc(param);
			if (obj) {
				return { 'Encrequest' : encreq.toString()};
			} else {
				return encreq.toString();
			}
		},
		decryption:  function(param , objKey = 'Response') {
			const decres = param ? param[objKey] : undefined;
			/* Not every endpoint in apiEncryptList envelopes its RESPONSE. Some
			 * accept an encrypted request but reply with plain JSON, and a plain
			 * body also comes back for API errors. Without this guard we called
			 * axisCrypto.dec(undefined), which throws
			 *   TypeError: Cannot read properties of undefined (reading 'ciphertext')
			 * INSIDE apiCall's .then() - so the promise rejected and the caller's
			 * success handler never ran. The request had actually succeeded; the
			 * response was simply thrown away. That is what stopped ConvertToTinyUrl
			 * populating the UI. Same guard as AxisPDF/IndexNewV2.html. */
			if (!decres) { return { data : param }; }
			var decreq = axisCrypto.dec(decres);
			var res = decreq.toString(CryptoJS.enc.Utf8);
			return { data : JSON.parse(res) };
		}
	}

}]);
