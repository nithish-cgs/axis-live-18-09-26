mainApp.controller('completeController', ['$scope', '$rootScope', '$state', 'serverService','$window', function ($scope, $rootScope, $state, serverService, $window) {

	$rootScope.wizardShow = false;
	$scope.moneyControl = false;
	$scope.Disability = false;
	$scope.sessionStorageClear = function () {
		$window.sessionStorage.clear();
		window.location.assign("https://simplehai.axisdirect.in");
	}
	if(!$rootScope.formData.ReferenceNumber){
		$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber')
	}
	if(sessionStorage.getItem('Disability')){
		$scope.Disability =true;
		$rootScope.getAPI =false;
	}
	if ($rootScope.getAPI){
		if (sessionStorage.getItem('AxNo') != null) {
			$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
			$rootScope.getDIYStatus();
		} else {
			if($rootScope.webkarvy){
				
			}else{
			$('#downloadPOA').modal('hide');
			$state.go('register');
			}
		}
	}
	
	$rootScope.formData.apiLoading = false;
	
	$scope.pixel = function() {
		$rootScope.formData.apiLoading = true;
		const path = `MoneyControlPixel`;
		const payload = {
			"ReferenceNumber": sessionStorage.getItem('AxNo')
		} 
		serverService.apiCall(path, payload).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var response = a.data;
			if (response) {
				$scope.moneyControl = response.MoneyControl;
			}
		},function (error) {
			console.log(error);
			$rootScope.formData.apiLoading = false;
		}
	)
	}
	$scope.pixel();

	// if($rootScope.webkarvy){
	// 	$('#acceptanceletterpopup').modal('show')
	// }
}]);
