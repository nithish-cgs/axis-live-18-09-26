var serverComm = angular.module('serverComm', []);

//Server Service
serverComm.factory('serverService', function ($http, $q) {
	var config = {
		home: '/',
		serverBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/api/DIY/',
		paymentBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/',
		assetsBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AxisDIY/',
		ipvBaseUrl:    'https://digitalaccountuat.axissl.in:9443/IPV/',
		esignBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/api/Full/'
	};
	var PDFconfig = {
	     /* Local host */ TermsPDFUrl: window.location.origin + '/'
	};
	return {
		bankCity: function (s_url, sendData) {
			return $http({ method: "POST", url: config.serverBaseUrl + s_url, data: sendData, async: false });
		},
		apiCall: function (s_url, sendData) {
			return $http({ method: "POST", url: config.serverBaseUrl + s_url, data: sendData, headers: { 'Authorization': 'Basic ' + btoa("abc:xyz") + '' }, async: false });
		},
		EmpApiCall: function (s_url, sendData) {
			return $http({ method: "POST", url: config.EmpServerBaseUrl + s_url, data: sendData, headers: { 'Authorization': 'Basic ' + btoa("abc:xyz") + '' }, async: false });
		},
		apiFormCall1: function (s_url, sendData) {
			return $http({ method: "POST", url: config.serverBaseUrl + s_url, data:sendData, headers :  
				{
					'Content-Type':  undefined,
				}
			, transformRequest: angular.identity });
		},
		apiUrlCall: function (s_url) {
			return $http({ method: "POST", url: config.serverBaseUrl + s_url, headers: { 'Authorization': 'Basic ' + btoa("abc:xyz") + '' }, async: false });
		},
		apiTokenUrlCall: function (s_url, AuthDatas) {
			return $http({
				method: "POST", url: config.serverBaseUrl + s_url, headers: {
					'Authorization': 'Bearer ' + AuthDatas.Authorization + '',
					'Mobile': AuthDatas.Mobile,
					'Email': AuthDatas.Email,
					'IsAuthorized': 'True',
					'DOB': !angular.isUndefined(AuthDatas.DOB) ? AuthDatas.DOB : '',
					'PanNumber': !angular.isUndefined(AuthDatas.PanNumber) ? AuthDatas.PanNumber : ''
				}, async: false
			}).error(function (status) {
				console.log(status)
			})
		},
		getApi: function (s_url) {
			var d = $q.defer();
			return $http({ method: 'GET', url: config.serverBaseUrl + s_url,  etagCache: true })
		},
		EmpGetList: function (s_url) {
			var d = $q.defer();
			$http({ method: 'GET', url: config.EmpServerBaseUrl + s_url }).
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
				method: "POST", url: config.serverBaseUrl + s_url, data: sendData, transformRequest: angular.identity, headers: {
					'Authorization': 'Bearer ' + AuthDatas.Authorization + '',
					'Mobile': AuthDatas.Mobile,
					'Email': AuthDatas.Email,
					'IsAuthorized': 'True',
					'DOB': !angular.isUndefined(AuthDatas.DOB) ? AuthDatas.DOB : '',
					'PanNumber': !angular.isUndefined(AuthDatas.PanNumber) ? AuthDatas.PanNumber : ''
				}, async: false
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
				method: 'GET', url: config.serverBaseUrl + s_url,
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
		},
	}

});