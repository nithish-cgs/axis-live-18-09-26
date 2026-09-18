mainChatApp.controller('verifyController', ['$rootScope', 'serverService', function ($rootScope, serverService) {

			if (!ReferenceNumber) {
				window.location.href = (serverService.getHome());
			} else {
				$rootScope.getDIYStatusAPI  = true;
				var u_url = "EmailVerification";
				var u_data = {
					"ReferenceNumber": ReferenceNumber,
					"RI": ri,
					"EmailVerify": true
				}
				serverService.apiCall(u_url, u_data).then(function (a) {
					var response = a.data;
					setTimeout(function () {
						$rootScope.formData.eRefNumber = ReferenceNumber;
						$rootScope.getDIYStatusAPI  = false;
						$rootScope.getDIYStatus();
					}, 5000)
				})
			}
		}
	]);
