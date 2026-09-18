mainChatApp.controller('financialController', function ($scope, $rootScope, $state, serverService)
{
    if ($rootScope.getAPI)
    {
        if (sessionStorage.getItem('RxReferenceNumber') != null) {
            $rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
            $rootScope.getDIYStatus();
        }
        else{
            $state.go('register')
        }
    }
	$("body").animate({ scrollTop: 0 }, "slow");
	setTimeout(function(){		
		$(".select").select2();
	},200)
	$('.customcheckradio').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
	$('.info-cat').bind('mouseover touchstart', function() {
        $(this).siblings('.info-details').show();
        $(this).parents('p').siblings('.info-details').show();
    });	

	$('.info-cat').bind('mouseleave touchend', function() {
        $(this).siblings('.info-details').hide();
        $(this).parents('p').siblings('.info-details').hide();
    });
	$rootScope.formData.fields.sameAddress = true;
	
	$('ins').click(function(){			
		$scope.sameAddress();
		$scope.$apply();
	});
	
	$scope.sameAddress = function(){
		if ($("input[type=checkbox]#oldaddress ").is(':checked')) { 
			$rootScope.formData.fields.sameAddress = true;
			
		}else{
			$rootScope.formData.fields.sameAddress = false;
		}
	}
	
	
});
