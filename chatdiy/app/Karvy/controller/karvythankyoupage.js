mainChatApp.controller('karvythankyoupageController', function ($scope, $rootScope, $state, serverService, $location) {
    $scope.EsignStatusSuccess = true;

    if(esign == 'true'){
        $scope.EsignStatusFailed = false;
        $scope.EsignStatusSuccess = true;
    }else{
        $scope.EsignStatusFailed = true;
        $scope.EsignStatusSuccess = false;
    }
    $scope.redirectpage = function(){
        $state.go('register')
    }
})