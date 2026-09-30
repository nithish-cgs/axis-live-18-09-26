mainApp.controller('closurethankyouController', ['$scope', '$rootScope', '$state','serverService', function ($scope, $rootScope, $state, serverService) {
    $scope.EsignStatusSuccess = true;

    if(esign == 'true'){
        $scope.EsignStatusFailed = false;
        $scope.EsignStatusSuccess = true;
	
    }else{
        $scope.EsignStatusFailed = true;
        $scope.EsignStatusSuccess = false;
        
    }
	if($rootScope.webkarvy){
		sessionStorage.clear();
		$rootScope.webkarvy = false;
	}
    $scope.redirectpage = function(){
        $state.go('closure')
		sessionStorage.clear();
		
    }
}])