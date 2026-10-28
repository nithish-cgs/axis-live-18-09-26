var serverComm = angular.module('serverComm', []);

//Server Service
serverComm.factory('serverService', function ($http, $q) {
	var config = {
		 home: '/chatDiy',
		 serverBaseUrl: 'https://apidigitalao.axisdirect.in/api/DIY/',
		 paymentBaseUrl: 'https://apidigitalao.axisdirect.in/',
		 assetsBaseUrl: 'https://digitalaccount.axisdirect.in/chatDiy',
		 ipvBaseUrl: 'https://apidigitalao.axisdirect.in/IPV/',
		 esignBaseUrl: 'https://apidigitalao.axisdirect.in/api/Full/'
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
					$('#connection').modal('show');
				});
			return d.promise;
		},
		getHome: function () {
			return config.home;
		},

		// apiOfflineAadharUpload: function (s_url, sendData) {
		// 	return $http({
		// 		method: 'POST', url: config.serverBaseUrl + s_url, data: sendData, transformRequest: angular.identity, headers: {'Content-Type': undefined}, 
		// 	});	
		// },

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
				$('#connection').modal('show');
			});
			return d.promise;
		},
	}

});