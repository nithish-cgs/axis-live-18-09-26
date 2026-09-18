mainChatApp.controller('preferenceController', function ($scope, $rootScope, $location)
{
    if ($rootScope.getAPI) {
        if (sessionStorage.getItem('RxReferenceNumber') != null) {
            $rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
            $rootScope.getDIYStatus();
        }
        else{
            $state.go('register')
        }
    }
	$("body").animate({ scrollTop: 0 }, "slow");
	$(".select").select2();
	$('.customcheckradio').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
	$rootScope.formData.fields.sameAddress = true;
	
	$('ins').click(function(){			
		$scope.selectNominee();
		$scope.$apply();
	});
	
	$scope.selectNominee = function(){
		if ($("input[type=checkbox]#nominee ").is(':checked')) { 
			$scope.nomineeArea = true;
			
		}else{
			$scope.nomineeArea = false;
		}
	}
	
	$scope.prefernceValidate = function(){
		$location.path('/documentUpload');
	}
});
