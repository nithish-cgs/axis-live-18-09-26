mainChatApp.controller('karvythankyoupageController', ['$scope', '$rootScope', '$state','serverService', function ($scope, $rootScope, $state, serverService) {
    $scope.EsignStatusSuccess = true;

    if(esign == 'true'){
        $scope.EsignStatusFailed = false;
        $scope.EsignStatusSuccess = true;
		var encryptURL = "GetKravyDecryptURL?KREncryptURL="+karvyId;
		$rootScope.formData.apiLoading = true;
		serverService.getApi(encryptURL).then(function (decryptResponse) {
			$rootScope.formData.apiLoading = false;
			$scope.karvyRef = decryptResponse;
			
		});
    }else{
        $scope.EsignStatusFailed = true;
        $scope.EsignStatusSuccess = false;
        var encryptURL = "GetKravyDecryptURL?KREncryptURL="+karvyId;
		$rootScope.formData.apiLoading = true;
		serverService.getApi(encryptURL).then(function (decryptResponse) {
			$rootScope.formData.apiLoading = false;
			$scope.karvyRef = decryptResponse.data;
			
		});
    }
	if($rootScope.webkarvy){
		sessionStorage.clear();
		$rootScope.webkarvy = false;
	}
    $scope.redirectpage = function(){
        $state.go('karvy')
    }
}])