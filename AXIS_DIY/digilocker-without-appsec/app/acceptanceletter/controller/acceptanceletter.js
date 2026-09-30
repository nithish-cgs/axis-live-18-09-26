mainApp.controller('acceptanceletterController', ['$rootScope', 'serverService', function ($rootScope, serverService) {

			// if (!ReferenceNumber) {
			// 	window.location.href = (serverService.getHome());
			// } else {
			// 	$rootScope.getDIYStatusAPI  = true;
			// 	var u_url = "EmailVerification";
			// 	var u_data = {
			// 		"ReferenceNumber": ReferenceNumber,
			// 		"EmailVerify": true
			// 	}
			// 	serverService.apiCall(u_url, u_data).success(function (response) {
			// 		setTimeout(function () {
			// 			$rootScope.formData.eRefNumber = ReferenceNumber;
			// 			$rootScope.getDIYStatusAPI  = false;
			// 			$rootScope.getDIYStatus();
			// 		}, 5000)
			// 	})
			// }
		}
	]);
