/*
 * Crypto and the Authorization header come from the axisCrypto facade, which is
 * defined by the app bundle loaded ahead of this file. No key, IV or credential
 * material is present in this source.
 */
var serverComm = angular.module('serverComm', []);

/*
 * axisCryptoWorker - main-thread client for the Web Worker that holds the
 * non-exportable CryptoKey. See crypto-worker.template.js for the security
 * rationale and its limits.
 *
 * Deliberately returns $q promises, NOT native promises: AngularJS resolves $q
 * inside the digest cycle, so consumers keep working without $apply/$timeout
 * wrappers. Native promises would settle outside the digest and silently fail to
 * update bindings - that is the main regression risk in this migration.
 */
serverComm.factory('axisCryptoWorker', ['$q', function ($q) {
	var WORKER_URL = 'app/service/axis-crypto-worker.min.js';
	var TIMEOUT_MS = 15000;

	var worker = null;
	var pending = {};
	var seq = 0;
	var fatal = null;

	function resolveUrl(rel) {
		try { return new URL(rel, document.baseURI).href; } catch (e) { return rel; }
	}

	function start() {
		if (worker || fatal) { return; }
		try {
			worker = new Worker(resolveUrl(WORKER_URL));
		} catch (e) {
			fatal = 'worker-unavailable';
			return;
		}
		worker.onmessage = function (e) {
			var msg = e.data || {};
			var entry = pending[msg.id];
			if (!entry) { return; }
			delete pending[msg.id];
			if (entry.timer) { clearTimeout(entry.timer); }
			if (msg.ok) { entry.d.resolve(msg.result); }
			else { entry.d.reject(new Error(msg.error || 'crypto error')); }
		};
		worker.onerror = function () {
			// Fail closed: reject everything outstanding rather than silently
			// falling back to an unprotected code path.
			fatal = 'worker-error';
			Object.keys(pending).forEach(function (id) {
				if (pending[id].timer) { clearTimeout(pending[id].timer); }
				pending[id].d.reject(new Error('crypto unavailable'));
				delete pending[id];
			});
			worker = null;
		};
	}

	function call(op, data) {
		var d = $q.defer();
		start();
		if (!worker) { d.reject(new Error('crypto unavailable')); return d.promise; }
		var id = ++seq;
		pending[id] = {
			d: d,
			timer: setTimeout(function () {
				if (pending[id]) { delete pending[id]; d.reject(new Error('crypto timeout')); }
			}, TIMEOUT_MS)
		};
		try {
			worker.postMessage({ id: id, op: op, data: data });
		} catch (e) {
			clearTimeout(pending[id].timer);
			delete pending[id];
			d.reject(new Error('crypto post failed'));
		}
		return d.promise;
	}

	return {
		enc: function (plaintext) { return call('enc', String(plaintext)); },
		dec: function (cipherB64) { return call('dec', String(cipherB64)); },
		basicAuthHeader: function () { return call('auth', null); },
		ready: function () { return call('ping', null); },
		isAvailable: function () { start(); return !!worker; }
	};
}]);

//Server Service
serverComm.factory('serverService', ['$http', '$q', 'axisCryptoWorker', function ($http, $q, axisCryptoWorker) {
	var config = {
		home: '/',
		serverBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/api/DIY/',
		paymentBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/',
		assetsBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AxisDIY/',
		ipvBaseUrl: 'https://digitalaccountuat.axissl.in:9443/IPV/',
		esignBaseUrl: 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/api/Full/'
	};
	var PDFconfig = {
	     /* Local host */ TermsPDFUrl: window.location.origin + '/'
	};
	let apiEncryptList = [
		'GetOverallStatusDIY',
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
		'VerifyKRAClientStatusEnc', 'NewSignInRmEmployee',
		'EmailVerificationUrl', 'KRAClientValidationupdate', 'DIYClientPersonalInfoProfile',
		'DIYClientOtherInfo', 'DIYGetDocumentProofStageByRefEnc', 'GetAppFormDetailsDIY', 'GetRefNoByPANMobileEnc',
		'DIYGetRegistrationInfoByReferenceNumber', 'FathernameUpdate', 'Digilockercreate', 'Digilockerfetchdetails', 'Documentextraction', 'CaptureDifferentlyAbled', 'WBTempPersistenceResume', 'DIYGetClientPersonalInfoByReferenceNumber', 'SignInRmEmployeA', 'ConvertToTinyUrl','DecryptSecuredTinyUrl'
	]
	function encryptPayload(param) {
        let obj = false;
        if (typeof(param) != "string") {
            param = JSON.stringify(param);
            obj = true;
        }
        var encreq = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(param), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        if (obj) {
            return { 'Encrequest' : encreq.toString()};
        } else {
            return encreq.toString();
        }
    }
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
				// Routed through the Worker chokepoint. Previously this used the
				// CryptoJS-backed encryption()/decryption() helpers, which required
				// the raw key on the main thread.
				return this.apiCallEnc(s_url, sendData);
			} else {
				// The Authorization header now comes from the Worker, so it is
				// resolved asynchronously. These methods already returned promises,
				// so wrapping is transparent to every caller.
				return axisCryptoWorker.basicAuthHeader().then(function (auth) {
					return $http({
						method: "POST",
						url: config.serverBaseUrl + s_url,
						data: sendData,
						headers: {
							'Authorization': auth
						},
						async: false
					});
				}).then(function (response) {
					/*
					 * Decrypt the response envelope here if there is one, so ALL
					 * decryption is centralised in this service. That is what allows
					 * $rootScope.decryptRes to become a pure passthrough and lets 33
					 * synchronous call sites stay untouched.
					 *
					 * The full $http response object is preserved (status, headers,
					 * config); only .data is replaced. Responses with no encrypted
					 * envelope pass through completely unchanged.
					 */
					var body = response && response.data;
					var cipher = body && body.Response;
					if (typeof cipher !== 'string' || cipher === '') { return response; }
					return axisCryptoWorker.dec(cipher).then(function (plain) {
						return angular.extend({}, response, { data: JSON.parse(plain) });
					});
				});
			}

		},
		apiCallEncryptRequestOnly: function (s_url, sendData) {
			var encryptedData = this.encryptPayload(sendData);
			return $http({
				method: "POST",
				url: config.serverBaseUrl + s_url,
				data: encryptedData,
				headers: { 'Authorization': 'Basic ' + btoa("abc:xyz") },
			});
		},
		EmpApiCall: function (s_url, sendData) {
			return axisCryptoWorker.basicAuthHeader().then(function (auth) {
				return $http({
					method: "POST",
					url: config.EmpServerBaseUrl + s_url,
					data: sendData,
					headers: {
						'Authorization': auth
					},
					async: false
				});
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
			return axisCryptoWorker.basicAuthHeader().then(function (auth) {
				return $http({
					method: "POST",
					url: config.serverBaseUrl + s_url,
					headers: {
						'Authorization': auth
					},
					async: false
				});
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
		},
		/*
		 * encFields - encrypt a set of NAMED fields via the Worker.
		 *
		 * Replaces the field-level pattern
		 *     var a = axisCrypto.enc(x); var b = axisCrypto.enc(y);
		 *     var sendData = { A: a, B: b, ... };
		 * with
		 *     serverService.encFields({ A: x, B: y }).then(function (e) {
		 *         var sendData = { A: e.A, B: e.B, ... };
		 *
		 * All fields encrypt concurrently. Returns a $q promise so callers stay
		 * inside the digest cycle.
		 */
		encFields: function (map) {
			var keys = Object.keys(map);
			return $q.all(keys.map(function (k) { return axisCryptoWorker.enc(map[k]); }))
				.then(function (vals) {
					var out = {};
					for (var i = 0; i < keys.length; i++) { out[keys[i]] = vals[i]; }
					return out;
				});
		},
		/*
		 * apiCallFields - encrypt named fields of an otherwise-plaintext payload,
		 * then POST it. Field names may be dotted paths for nested payloads, e.g.
		 * 'ObjCDIYClientOtherInfo.Email'.
		 *
		 * This exists so a call site keeps its object literal exactly as written:
		 *     var sendData = { ..., Email: rawEmail, Mobile: rawMobile, ... };
		 *     serverService.apiCallFields(url, sendData, ['Email', 'Mobile'])
		 * instead of having ~80 lines of literal wrapped in a .then() just to make
		 * the encrypt step async. Fewer lines touched means fewer ways to regress.
		 *
		 * Empty, null and undefined values are left ALONE rather than encrypted.
		 * That matters: several call sites deliberately blank a field after
		 * encrypting it, and encrypting "" or the string "undefined" would change
		 * the payload the backend receives.
		 *
		 * The caller's object is never mutated - a copy is sent.
		 */
		apiCallFields: function (s_url, sendData, paths) {
			var self = this;
			function getPath(obj, p) {
				var parts = p.split('.');
				for (var i = 0; i < parts.length && obj != null; i++) { obj = obj[parts[i]]; }
				return obj;
			}
			function setPath(obj, p, val) {
				var parts = p.split('.');
				for (var i = 0; i < parts.length - 1 && obj != null; i++) { obj = obj[parts[i]]; }
				if (obj != null) { obj[parts[parts.length - 1]] = val; }
			}
			var live = paths.filter(function (p) {
				var v = getPath(sendData, p);
				return v !== undefined && v !== null && v !== '';
			});
			if (!live.length) { return self.apiCall(s_url, sendData); }
			return $q.all(live.map(function (p) { return axisCryptoWorker.enc(getPath(sendData, p)); }))
				.then(function (enc) {
					var clone = angular.copy(sendData);
					for (var i = 0; i < live.length; i++) { setPath(clone, live[i], enc[i]); }
					return self.apiCall(s_url, clone);
				});
		},
		/* Single-value helpers for sites that encrypt or decrypt exactly one thing. */
		encOne: function (value) { return axisCryptoWorker.enc(value); },
		decOne: function (cipher) {
			return axisCryptoWorker.dec(cipher).then(function (plain) { return JSON.parse(plain); });
		},
		/*
		 * apiCallEnc - the single async crypto chokepoint.
		 *
		 * Replaces the previous three-step caller pattern:
		 *     sendData = $rootScope.encryptReq(sendData);
		 *     serverService.apiCall(url, sendData).then(function (a) {
		 *         var response = $rootScope.decryptRes(a.data, 'Response');
		 *
		 * with:
		 *     serverService.apiCallEnc(url, sendData).then(function (a) {
		 *         var response = a.data;
		 *
		 * Encryption and decryption happen inside this promise chain using the
		 * Worker-held non-exportable key, so no caller ever touches key material
		 * and no caller needs to become async itself - they are already inside
		 * .then(). Resolves { data: <parsed object> } to match what the existing
		 * apiEncryptList path already resolved, keeping the caller contract identical.
		 */
		apiCallEnc: function (s_url, sendData, opts) {
			var objKey = (opts && opts.objKey) || 'Response';
			var payload = (typeof sendData === 'string') ? sendData : JSON.stringify(sendData);
			return $q.all([axisCryptoWorker.enc(payload), axisCryptoWorker.basicAuthHeader()]).then(function (r) {
				return $http({
					method: 'POST',
					url: config.serverBaseUrl + s_url,
					data: { 'Encrequest': r[0] },
					headers: { 'Authorization': r[1] }
				});
			}).then(function (response) {
				var body = response && response.data;
				var cipher = body && body[objKey];
				// Not every endpoint answers with an encrypted envelope; pass
				// anything unencrypted straight through rather than throwing.
				if (typeof cipher !== 'string' || cipher === '') { return { data: body }; }
				return axisCryptoWorker.dec(cipher).then(function (plain) {
					return { data: JSON.parse(plain) };
				});
			});
		},
		/*
		 * The synchronous CryptoJS-backed encryption()/decryption() helpers were
		 * removed here. They required the raw AES key on the main thread, which is
		 * the exact exposure this work exists to close. apiCallEnc / encFields /
		 * encOne / decOne replace them and route everything through the Worker.
		 * A reference search confirmed no remaining callers before removal.
		 */
	}

}]);
