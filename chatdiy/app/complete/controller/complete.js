mainChatApp.controller('completeController', ['$scope', '$rootScope', '$state', 'serverService','$window', function ($scope, $rootScope, $state, serverService, $window) {

	$rootScope.wizardShow = false;
	$scope.sessionStorageClear = function () {
		$window.sessionStorage.clear();
		window.location.assign("https://simplehai.axisdirect.in");
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

	// if($rootScope.webkarvy){
	// 	$('#acceptanceletterpopup').modal('show')
	// }
}]);
