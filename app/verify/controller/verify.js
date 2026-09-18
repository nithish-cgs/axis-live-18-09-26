mainApp.controller('verifyController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {

    if (!ReferenceNumber) {
        window.location.href = (serverService.getHome());
    } else {
        if (signature && signature == 'true') {
            $rootScope.vcip = true;
            sessionStorage.setItem('vcpno', ReferenceNumber);
            sessionStorage.setItem('reusmeOTPVerified', 'verified');
            $state.go('documentUpload');
        }
        $rootScope.getDIYStatusAPI = true;
        var u_url = "EmailVerification";
        var u_data = {
            "ReferenceNumber": ReferenceNumber,
            "RI": ri,
            "EmailVerify": true,
            "ProvidedEmailIdbelongingto" : $rootScope.NewEmailBelongs ? $rootScope.NewEmailBelongs : sessionStorage.getItem("EmailIdbelongingto")
        }
        if ($rootScope.BYOD) u_data['Mode'] = "B";
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(u_url, u_data).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            $rootScope.formData.eRefNumber = ReferenceNumber;
            $rootScope.getDIYStatusAPI = false;
            if ($rootScope.BYOD) {
                sessionStorage.setItem('byodVerifyEmail', true);
            } else {
                $rootScope.decryptUrl();
                setTimeout(function () {
                    $rootScope.formData.apiLoading = false;
                    if(!$rootScope.vcip){
                    
                    $rootScope.getDIYStatus();
                    }
                }, 5000)
            }
        });
    }
}
]);
