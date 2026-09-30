mainApp.controller('registerController', function ($scope, $rootScope, $state, serverService)
{
	$rootScope.formData.stageInfo = '1a';
    if ($rootScope.getAPI)  {
        if (localStorage.getItem('RxReferenceNumber') != null) {
            $rootScope.formData.ReferenceNumber = localStorage.getItem('RxReferenceNumber');
            $rootScope.getDIYStatus();
        }       
    }
	 $('#authorize').prop('checked', true);
	 $rootScope.formData.fields.authorize = true;
    if (localStorage.getItem('RxReferenceNumber') != null)
    {       
        $('#authorize').iCheck('disable');
    }
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $scope.emailMobile = true;
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
    $rootScope.formData.stageOrder = 1;
    if (localStorage.getItem("RxMobile") != null && localStorage.getItem("RxMobile") != 'undefined')
    {
        $rootScope.formData.fields.mobile = localStorage.getItem("RxMobile");
    }
    if (localStorage.getItem("RxEmail") != null && localStorage.getItem("RxEmail") != 'undefined')
    {
        $rootScope.formData.fields.email = localStorage.getItem("RxEmail");
    }
    if (localStorage.getItem("RxPan") != null && localStorage.getItem("RxPan") != 'undefined')
    {
        $rootScope.formData.fields.panNumber = localStorage.getItem("RxPan");
    }

    if (localStorage.getItem("RxDate") != null && localStorage.getItem("RxDate") != 'undefined')
    {
        $rootScope.formData.fields.date = localStorage.getItem("RxDate");
    }

    if (localStorage.getItem("RxMonth") != null && localStorage.getItem("RxMonth") != 'undefined')
    {
        $rootScope.formData.fields.month = localStorage.getItem("RxMonth");
    }
    if (localStorage.getItem("RxYear") != null && localStorage.getItem("RxYear") != 'undefined')
    {
        $rootScope.formData.fields.year = localStorage.getItem("RxYear");
    }

    if ($rootScope.formData.ReferenceNumber)
    {
        var s_url = "DIYGetRegistrationInfoByReferenceNumber";

        var sendData = { ReferenceNumber: $rootScope.formData.ReferenceNumber };

        serverService.apiCall(s_url, sendData).success(function (response)
        {
            if (response.IsSuccess)
            {
                $rootScope.formData.fields.panNumber = response.ObjCDIYClientProfile.PanNumber;
                $rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
                $rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;

                var dob = response.ObjCDIYClientProfile.DOB.split("/");
                $rootScope.formData.fields.date = dob[0];
                $rootScope.formData.fields.month = dob[1];
                $rootScope.formData.fields.year = dob[2];
                setTimeout(function ()
                {
                    $('#day').val(dob[0]);
                    $('#month').val(dob[1]);
                    $('#year').val(dob[2]);
                    $("select").select2();
                }, 1000)
            }

        });
    }

    $scope.resend = false;
	$scope.firstStage = function ()
	{
	    if ($rootScope.formData.ReferenceNumber)
	    {
	        $scope.emailMobile = false;
	        $scope.otp = false;
	        $scope.pan = true;
			$rootScope.formData.stageInfo = '1b';
	        $("html, body").animate({ scrollTop: 0 }, "slow");
	        $("select").select2();
	        $(".select").prop("disabled", true);
	    }
	  
	    else
	    {
	        $scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	        $scope.error = 0;
	        if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '')
	        {
	            $scope.emptyEmail = true;
	            $scope.error++;
	        }
	        else if (!($scope.filter).test($rootScope.formData.fields.email))
	        {
	            $scope.invalidEmail = true;
	            $scope.error++;
	        }

	        if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '')
	        {
	            $scope.emptyMobile = true;
	            $scope.error++;
	        }
	        else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false)
	        {
	            $scope.invalidMobile = true;
	            $scope.error++;
	        }

	        if ($scope.error == 0)
	        {

	            if ($scope.otpVerified)
	            {
	                $scope.emailMobile = false;
	                $scope.pan = true;
					$rootScope.formData.stageInfo = '1b';
	                $('#authorize').iCheck('disable');
	                $("html, body").animate({ scrollTop: 0 }, "slow");
	                $("select").select2();
	            }
	            else if ($rootScope.formData.fields.authorize)
	            {
	                $rootScope.formData.fields.otpMobile = '';
	                $scope.invalidOTP = false;
	                if ($scope.resend)
	                {
	                    $scope.resendOTP();
	                }
	                else
	                {
	                    $scope.generateOTP();
	                }
	            }
	            else
	            {
	                $scope.authorizeError = true;
	            }
	        }
	    }
	}


	$('label.refer-association input[type="checkbox"]').on("ifChecked", function ()
	{
	    $rootScope.formData.fields.authorize = true;
	    $scope.authorizeError = false;
	    $scope.$apply();
	}).on("ifUnchecked", function ()
	{
	    $rootScope.formData.fields.authorize = false;
	    $scope.$apply();
	});




    $('label.agree-aadhar input[type="checkbox"]').on("ifChecked", function ()
	{
        $rootScope.formData.aadharAuthorize = 'Y';
        $scope.aadharAuthorizeError = false;
	    $scope.$apply();
	}).on("ifUnchecked", function ()
	{
	    $rootScope.formData.aadharAuthorize = 'N';
	    $scope.$apply();
	});

    $scope.generateOTP = function ()
    {
        $scope.error = 0;
        if ($scope.changeNumber)
        {
            if ($rootScope.formData.fields.mobileNew == null || $rootScope.formData.fields.mobileNew == '')
            {
                $scope.emptyMobileNew = true;
                $scope.error++;
            }
            else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobileNew) == false)
            {
                $scope.invalidMobileNew = true;
                $scope.error++;
            }
            else if ($rootScope.formData.fields.mobileNew == $rootScope.formData.fields.mobile)
            {
                $scope.sameNumber = true;
                $scope.error++;
            }
            else
            {
                $rootScope.formData.fields.mobile = $rootScope.formData.fields.mobileNew;
            }
        }
        if ($scope.error == 0)
        {
            $scope.otp = true;
            var sendData = { 'Mobile': $rootScope.formData.fields.mobile };
            var mobile = $rootScope.formData.fields.mobile;
            $rootScope.formData.otpMobile = "xxxxxxxx" + mobile.substring(8, 10);
            $('#otp-resend').modal({
                backdrop: 'static',
                keyboard: true
            });
            $scope.resend = true;
            $rootScope.formData.resendNew = false;

            $scope.getOTP(sendData);
        }
	}
	
	$scope.resendOTP = function(){
		var mobile = $rootScope.formData.fields.mobile;
		$scope.error = 0;
		$rootScope.formData.resendNew = true;
		$scope.sameNumber = false;
		
		var sendData = {'Mobile': mobile};		
		if($scope.error == 0){
			$rootScope.formData.otpMobile = "xxxxxxxx"+ mobile.substring(8,10);
			$('#otp-resend').modal({
			    backdrop: 'static',
			    keyboard: true
			})
			var sendData = { 'Mobile': mobile };
			$scope.otp = true;
			$scope.getOTP(sendData);
		}
	}
	
	$scope.getOTP = function(sendData){		
		var url = "OTPGenerationnew";
		$scope.changeNumber = false;
		serverService.apiCall(url, sendData).error(function ()
		{
		    $('#connection').modal('show');
		});
	}
	
	$scope.validateOTP = function ()
	{
	    if ($rootScope.formData.fields.authorize)
	    {
	        var url = "OTPValidationnew";
	        var sendData = { 'OtpCode': $rootScope.formData.fields.otpMobile, 'Mobile': $rootScope.formData.fields.mobile }
	    
	        $rootScope.formData.apiLoading = true;
	        serverService.apiCall(url, sendData).success(function (response)
	        {
	      
	            $rootScope.formData.apiLoading = false;
	            if (response.IsSuccess)
	            {
	                $scope.emailMobile = false;
	                $scope.otp = false;
	                $scope.pan = true;
					$rootScope.formData.stageInfo = '1b';
	                $scope.otpVerified = true;
	                $('#authorize').iCheck('disable');
	                $("html, body").animate({ scrollTop: 0 }, "slow");
	                $("select").select2();
	                localStorage.setItem('RxEmail', $rootScope.formData.fields.email);
	                localStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
	                 dataLayer.push({
                         event: 'StageChange',
                         attributes: {
                           'level complete': '1a',
                           'email': $rootScope.formData.fields.email,
                           'mobile': $rootScope.formData.fields.mobile       
                         }
                      });
	                $rootScope.UpdateTempPersistenceResume();
	            }
	            else
	            {
	                $scope.invalidOTP = true;
	            }
	        }).error(function ()
	        {
	            $('#connection').modal('show');
	        });
	    } else
	    {
	        $scope.authorizeError = true;
	    }
	}

	$scope.registration = function ()
	{
	    if ($rootScope.formData.ReferenceNumber)
	    {
	        $state.go('address')
	        if ($rootScope.formData.aadharhide || $rootScope.formData.KRA)
	        {
	            $state.go('address')
	        } else
	        {
	            $scope.aadharVal();
	        }
	    }
	    else {

		     var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
		     var pan_cfilter = /[a-z]{3}[c|B|T|F|A|H|L|G|J][a-z]{1}\d{4}[a-z]/i;
		 
		     $rootScope.formData.fields.date = $("#day").val();
		     $rootScope.formData.fields.month = $("#month").val();
		     $rootScope.formData.fields.year = $("#year").val();
		 
		     if (!angular.isUndefined($rootScope.formData.fields.panNumber) && $rootScope.formData.fields.panNumber!='' && $rootScope.formData.fields.panNumber!=null){
		        $scope.panCoVaild = false; $scope.panValid = false; $scope.panError = false; $scope.panInValid = false;
		        if (($rootScope.formData.fields.panNumber).length == 10 && (pan_cfilter.test($rootScope.formData.fields.panNumber))) {
		            $scope.panValid = false; $scope.panCoVaild = true; $scope.panInValid = false; $scope.panFocus = true;						
			    } 
		        else if (($rootScope.formData.fields.panNumber).length == 10 && (pan_filter.test($rootScope.formData.fields.panNumber)))
		        {
		            $scope.panValid = true; $scope.panInValid = false;
			    }
			    else{
				     $scope.panValid = false; $scope.panInValid = true;
			    }
	        }
		    else {
		        $scope.panValid = false; $scope.panError = true;$scope.panInValid = false;
		    }
		
		    if ($rootScope.formData.fields.year == "" || $rootScope.formData.fields.date == "" || $rootScope.formData.fields.month == "")
            {
                $scope.dobError = true;
                $scope.ageValid = false;
			    return false;
            }
		    else{
			    $scope.validateDOB();
		    }
	    }
	}   
	
	$scope.validateDOB = function ()
    { 
		var dateArray = [$rootScope.formData.fields.date, $rootScope.formData.fields.month, $rootScope.formData.fields.year];
		var ageArray = [$rootScope.formData.fields.year, $rootScope.formData.fields.month, $rootScope.formData.fields.date];
        var userDob = (dateArray.join('-'));
		var userAge = (ageArray.join('-'));
			//$scope.nomineeAge = Math.floor($rootScope.getAge(userDob));
			
		if(!$rootScope.DobValidation(userDob)) {
                $scope.dobError = true;
		}
		else if((new Date(new Date - new Date(userAge)).getFullYear()-1970 < 18)) {
				$scope.ageInvalid = true;
		}
		else{		
			$scope.ageInYears = new Date(new Date - new Date(userAge)).getFullYear()-1970;
			if ($scope.panValid) {	
					localStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);			
					localStorage.setItem("age", $scope.ageInYears);					
					$scope.accountRegister();	
            }
		}

    };
	$scope.aadharVal = function ()
	{
	    if ($rootScope.formData.fields.aadharNumber != null)
	    {
	        $scope.aadharEmpty = false;
	        if ($rootScope.formData.fields.aadharNumber == '000000000000' || $rootScope.formData.fields.aadharNumber.length != 12)
	        {
	            $scope.aadharError = true;
	        }
	        else
	        {
	            $scope.aadharProceed = true; 
				$(".select").prop("disabled", true);
	        }
	    }
	    else
	    {
	        $scope.aadharEmpty = true;
	    }
	}


	$scope.accountRegister = function(){		
		
		if($rootScope.formData.fields.aadharNumber && $rootScope.formData.aadharAuthorize != 'Y'){		
			$scope.aadharAuthorizeError = true;
		}
		else{	
		$('.loader-info.paninfo').css('display', 'block');	
		//var url = "DIYKRAExistingClientValidation";	
		var url = "EcommercePanSiteValidation";
		var dateArray = [$rootScope.formData.fields.date, $rootScope.formData.fields.month, $rootScope.formData.fields.year];
		var userDob = (dateArray.join('/'));
		$rootScope.formData.dob = userDob;
		var sendData = { PanNumber: $rootScope.formData.fields.panNumber, DOB: $rootScope.formData.dob, Mode: 'W' };
		serverService.apiCall(url, sendData).success(function (response)
        {
		    $rootScope.formData.panStatus = response.Registration.PanStatus;

		    $rootScope.formData.IsClone = response.IsClone;
		    $scope.panVerified = false;
		    if ($rootScope.formData.IsClone)
		    {
				if (response.IsReferenceNumberExist)
				{
					$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
				}
				
				if(response.ReferenceNumber.search("WB") != -1 ){			
					$rootScope.planLoadStop = true;
					$rootScope.panLoaded = false;
					$scope.cloneData();
					$('.loader-info.paninfo').css('display', 'none');
				   /* $('#clone').modal({
						backdrop: 'static',
						keyboard: true
					})*/
				}
				else{				
					$rootScope.formData.otherMode = true;
					$('#paninformation').modal({
                        backdrop: 'static',
                        keyboard: true
                    });
                    $rootScope.formData.panStatus = 'Your account is under process in another mode';
				}
				
		    }
		    else if (response.IsSuccess && $rootScope.formData.panStatus != null)
		    {
		        $rootScope.planLoadStop = true;
		        $scope.panVerified = true;
		        $rootScope.formData.getKraDetails = true;
		        $('.loader-info.paninfo').css('display', 'none');
		        $('#paninformation').modal({
		            backdrop: 'static',
		            keyboard: true
		        })
		    }
		    else
		    {
		        $rootScope.formData.getKraDetails = true;
		        $rootScope.planLoadStop = true;
		        if ($rootScope.formData.panStatus != null)
		        {
		            $('.loader-info.paninfo').css('display', 'none');
		            $('#paninformation').modal({
		                backdrop: 'static',
		                keyboard: true
		            })
		        }

		        else if (response.ErrorMessage != null && response.ErrorMessage != '')
		        {
		            if (response.ErrorNumber == '400')
		            {
		                $rootScope.formData.panStatus = 'Your details are already available with us. Our executive  will get in touch with you or Call us at our contact centre - 022 39886000.';
		            } else
		            {
		                $rootScope.formData.panStatus = response.ErrorMessage;
		            }
		            $('.loader-info.paninfo').css('display', 'none');
		            $('#paninformation').modal({
		                backdrop: 'static',
		                keyboard: true
		            })
		        }

		        else if (response.FailureMessage != null && response.FailureMessage != '')
		        {
		            $rootScope.formData.panStatus = response.FailureMessage;
		            $('.loader-info.paninfo').css('display', 'none');
		            $('#paninformation').modal({
		                backdrop: 'static',
		                keyboard: true
		            })
		        }
		    }
		    if (response.ClientInfo.FirstName)
		    {
		        $rootScope.formData.fields.firstName = response.ClientInfo.FirstName;
		    }

		    if (response.ClientInfo.MiddleName && response.ClientInfo.MiddleName != 'undefined')
		    {
		        $rootScope.formData.fields.middleName = response.ClientInfo.MiddleName;
		        $rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
		    }
		    if (response.ClientInfo.LastName && response.ClientInfo.FirstName)
		    {
		        $rootScope.formData.fields.lastName = response.ClientInfo.LastName;
		        $rootScope.formData.fields.moLastName = response.ClientInfo.LastName;
		        $rootScope.formData.fields.fsLastName = response.ClientInfo.LastName;
		    }		        
		    else if (response.ClientInfo.LastName  && !(response.ClientInfo.FirstName))
		    {
		       // $rootScope.formData.fields.firstName = response.ClientInfo.LastName;

		        var name = response.ClientInfo.LastName.split(" ");
		        $rootScope.formData.fields.firstName = name[0];
				if(name[1] &&  name[1] != 'undefined'){
					$rootScope.formData.fields.middleName = name[1];
				}

		        var len = name.length;
		        var nameArray = [];
		        if (len >= 3)
		        {
		            for (var i = 2; i < len; i++)
		            {

		                nameArray.push(name[i]);
		            }
		            $rootScope.formData.fields.lastName = nameArray.join(" ");
		        }
		        else if (len == 1)
		        {
		            $rootScope.formData.fields.lastName = '';
		        }
		        else
		        {
		            $rootScope.formData.fields.lastName = name[1];
					$rootScope.formData.fields.moLastName = $rootScope.formData.fields.lastName;
					$rootScope.formData.fields.fsLastName = $rootScope.formData.fields.lastName;
		            $rootScope.formData.fields.middleName = '';
		        }
		    }

		    
		    if (!$rootScope.formData.IsClone && response.IsReferenceNumberExist)
		    {
				if(response.ReferenceNumber.search("WB") != -1 ){
					$rootScope.formData.ReferenceNumber = response.ReferenceNumber;
					localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);
					$('.loader-info.paninfo').css('display', 'none');
					$scope.updateRegistration();
				   // $rootScope.getDIYStatus();
					$rootScope.UpdateTempPersistence();
				}
				else{				
					$rootScope.formData.otherMode = true;
					$('#paninformation').modal({
                            backdrop: 'static',
                            keyboard: true
                        });
                    $rootScope.formData.panStatus = 'Your account is under process in another mode';
				}
		    }
		}).error(function ()
		{
		    $('#connection').modal('show');
		});
		}
	}

	$scope.registerClient = function ()
    {
        var s_url = "DIYClientInfoRegistration";
       
        var dateArray = [$rootScope.formData.fields.date, $rootScope.formData.fields.month, $rootScope.formData.fields.year];
        var userDob = (dateArray.join('/'));
        var kraClnt = "N";
        if ($rootScope.formData.KRA != null && $rootScope.formData.KRA == true)
            kraClnt = "Y";
        var sendData = {
            ReferenceNumber: $rootScope.formData.ReferenceNumber,
            PanNumber: $rootScope.formData.fields.panNumber,
            Email: $rootScope.formData.fields.email,
            DOB: userDob,
            Mobile: $rootScope.formData.fields.mobile,
            KRAClient: kraClnt,
            BrowserType: $rootScope.formData.browserType
        };
        serverService.apiCall(s_url, sendData).success(function (response)
        {
            if (response.IsSuccess)
            {
                $rootScope.panLoaded = false
                $rootScope.firstCompleted = true;
                $rootScope.getAPI = false;
                dataLayer.push({
                    event: 'StageChange',
                    attributes: {
                        'level complete': '1b',
                        'pan': $rootScope.formData.fields.panNumber,
                        'dob': userDob
                    }
                });
                $state.go('address');
            }
            else
            {
                console.log("IsSuccess : False");
            }

        }).error(function ()
        {
            $('#connection').modal('show');
        });

    }
	
	$scope.updateRegistration = function (){
        var url = "DIYUpdateRegistration";

        var dateArray = [$rootScope.formData.fields.date, $rootScope.formData.fields.month, $rootScope.formData.fields.year];
        var userDob = (dateArray.join('/'));

        var sendData = { PanNumber: $rootScope.formData.fields.panNumber, DOB: userDob }

        serverService.apiCall(url, sendData).error(function (){
            $('#connection').modal('show');
        });
	}
	$scope.aadharValidate = function(){	
	    if ($rootScope.formData.aadharAuthorize == 'Y'){
	        $scope.aadharAuthorizeError = false;
	        var url = "AadharNumberValidate";
	        var sendData = { AadharNumber: $rootScope.formData.fields.aadharNumber }	       
	        //$rootScope.formData.apiLoading = true;
	        serverService.apiCall(url, sendData).success(function (response){	  
	            $rootScope.formData.apiLoading = false;
				$('.loader-info.paninfo').css('display', 'none');
	            if (response.IsSuccess){
	                $scope.aadharOTP = true;
	                $scope.aadharError = false;
	                $rootScope.formData.panStatus = response.SuccessMessage;
	                $('#paninformation').modal({
	                    backdrop: 'static',
	                    keyboard: true
	                })
	            }
	            else{
	                $scope.aadharOTP = false;
	                $scope.aadharError = true;
	            }
	        }).error(function (){
	            $('#connection').modal('show');
	        });
	    }
	    else{
	        $scope.aadharAuthorizeError = true;
	    }
	
	}


	$scope.aotpVal = function(){
	    if ($rootScope.formData.aadharAuthorize == 'Y'){
	    var url = 'OTPVerification?AadharNumber=' + $rootScope.formData.fields.aadharNumber + '&OTPMessage=' + $rootScope.formData.aOTP;
	    var sendData = { AadharNumber: $rootScope.formData.fields.aadharNumber, OTPMessage: $rootScope.formData.aOTP }

	    $rootScope.formData.apiLoading = true;
	    serverService.apiUrlCall(url).success(function (response){
		$rootScope.formData.apiLoading = false;
	        if (response.IsSuccess){
	            $scope.invalidAotp = false;

	            $rootScope.formData.KRA = true;
	            $rootScope.formData.kraData = response;
	            localStorage.setItem("IsAadhar", true);

	            var purl = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_COR_PINCD;
	            serverService.getList(purl).then(function (response){
	                if (response.IsSuccess){
	                    $rootScope.formData.kraData.APP_COR_STATENAME = response.PincodeList[0].StateName;
	                    $rootScope.formData.kraData.APP_COR_DISTRICT = response.PincodeList[0].District;

	                    if ($rootScope.formData.kraData.APP_PER_PINCD){
	                        var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_PER_PINCD;
	                        serverService.getList(p_url).then(function (response){
	                            if (response.IsSuccess){
	                                $rootScope.formData.kraData.APP_PER_STATENAME = response.PincodeList[0].StateName;
	                                $rootScope.formData.kraData.APP_PER_DISTRICT = response.PincodeList[0].District;
	                                localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
	                                if (!$rootScope.formData.IsClone){
										if( localStorage.getItem("RxAllowAccOpen") == "Y"){
											$rootScope.generateReference();
										}
										else{
											$scope.kraValidation();
										}
	                                }
	                            }
	                        }).error(function (){
	                            $('#connection').modal('show');
	                        });
	                    } 
						else{
	                        $rootScope.formData.kraData.APP_PER_ADD1 = $rootScope.formData.kraData.APP_COR_ADD1;
	                        $rootScope.formData.kraData.APP_PER_ADD2 = $rootScope.formData.kraData.APP_COR_ADD2;
	                        $rootScope.formData.kraData.APP_PER_ADD3 = $rootScope.formData.kraData.APP_COR_ADD3;
	                        $rootScope.formData.kraData.APP_PER_CITY = $rootScope.formData.kraData.APP_COR_CITY;
	                        $rootScope.formData.kraData.APP_PER_STATEID = $rootScope.formData.kraData.APP_COR_STATEID;
	                        $rootScope.formData.kraData.APP_PER_STATENAME = $rootScope.formData.kraData.APP_COR_STATENAME;
	                        $rootScope.formData.kraData.APP_PER_DISTRICT = $rootScope.formData.kraData.APP_COR_DISTRICT;
	                        $rootScope.formData.kraData.APP_PER_PINCD = $rootScope.formData.kraData.APP_COR_PINCD;
	                        localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
	                        if (!$rootScope.formData.IsClone){
	                            if(localStorage.getItem("RxAllowAccOpen") == "Y"){
									$rootScope.generateReference();
								}
								else{
									$rootScope.kraValidation();
								}
	                        }
	                    }
	                }
	            });

	        }
	        else{
	            $scope.invalidAotp = true;
	        }
			}).error(function (){
				$('#connection').modal('show');
			});
		}
	    else{
	        $scope.aadharAuthorizeError = true;
	    }
	}
	$scope.aadharRegister = function(){
	    if ($("input[type=radio]#skipAadhar").is(':checked')){
	        $rootScope.getAPI = false;
			$state.go('address');
		}	
	    $rootScope.getAPI = fasle;
		$state.go('address');
	}

	window.onbeforeunload = function (){

	    if ($rootScope.formData.fields.mobile){
	        localStorage.setItem("RxMobile", $rootScope.formData.fields.mobile);
	    }

	    if ($rootScope.formData.fields.email){
	        localStorage.setItem("RxEmail", $rootScope.formData.fields.email);
	    }

	    if ($rootScope.formData.fields.panNumber){
	        localStorage.setItem("RxPan", $rootScope.formData.fields.panNumber);
	    }

	    localStorage.setItem("RxDate", $('#day').val());
	    localStorage.setItem("RxMonth", $('#month').val());
	    localStorage.setItem("RxYear", $('#year').val());
	}

	$('#cloneData').on("ifClicked", function (event){
	    $scope.cloneData();
	    $('#clone').modal('hide');
	    $scope.$apply();
	});

/*	$('#newData').on("ifClicked", function (event){	    
	    $rootScope.generateReference();
	    $('#clone').modal('hide');
	    $scope.$apply();
	});*/

	$scope.cloneData = function (){
	    //$rootScope.formData.ReferenceNumber  = $rootScope.formData.oldReferenceNumber;
		$rootScope.formData.apiLoading = true;
	    var url = 'ResumeDroppedReferenceNumber';
	    var sendData = { ReferenceNumber: $rootScope.formData.ReferenceNumber, Mode : 'W' }
	    serverService.apiCall(url, sendData).success(function (response){
			$rootScope.formData.apiLoading = false;
	        if (response.IsSuccess){
	            $rootScope.formData.dataCloned = true;
	            $('#paninformation').modal('hide');
	            $rootScope.formData.ReferenceNumber = response.ObjCDIYRegistration.ReferenceNumber;
	            localStorage.setItem("RxReferenceNumber", $rootScope.formData.ReferenceNumber);	           
	            $rootScope.getDIYStatus();
	            $rootScope.formData.IsClone = false;
	            $scope.updateRegistration();
	            $rootScope.UpdateTempPersistenceResume();
	        }
	    
	  });
	};
	
	$scope.kraValidation = function ()
    {
        if (!$rootScope.formData.IsClone && $rootScope.formData.ReferenceNumber)
        {
			$('.loader-info.paninfo').css('display', 'none');
			$rootScope.getDIYStatus();
        }
        else
        {
            var surl = "EcommerceKRAClientValidation";
            var dateArray = [$rootScope.formData.fields.date, $rootScope.formData.fields.month, $rootScope.formData.fields.year];
            var userDob = (dateArray.join('/'));
            var sendData = { PanNumber: $rootScope.formData.fields.panNumber, DOB: userDob, Mode: 'W' };
            $('.loader-info.paninfo').css('display', 'block');
            $rootScope.formData.kraChecking = true;
			$rootScope.formData.checkingMessage  = "Please wait. We're verifying your KYC details from KRA site.";
            serverService.apiCall(surl, sendData).success(function (response)
            {
                localStorage.setItem("RxAllowAccOpen", "Y");
                $rootScope.planLoadStop = true;
                $rootScope.panLoaded = false;
                localStorage.setItem('RxEmail', $rootScope.formData.fields.email);
                localStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
                localStorage.setItem('RxPan', $rootScope.formData.fields.panNumber);
                $('.loader-info.paninfo').css('display', 'none');

                dataLayer.push({
                    'event': 'DIY AccountRegister',
                    'Application No': $rootScope.formData.ReferenceNumber,
                });

                if (response.Registration.KRAVerifiedClient == 'Y')
                {
                    $rootScope.formData.kraData = response.KRAExistingClientInfo;

                    if (($rootScope.formData.kraData.APP_FirstName == null || $rootScope.formData.kraData.APP_FirstName == '') && ($rootScope.formData.kraData.APP_NAME == null || $rootScope.formData.kraData.APP_NAME == ''))
                    {
                        localStorage.setItem("IsKRA", false);
                        if (!$rootScope.formData.IsClone)
                        {
                            if ($rootScope.formData.ReferenceNumber)
                            {
                                $rootScope.formData.KRA = false;
                                $state.go('address');
                            }
                            else
                            {
                               // $rootScope.generateReference();
                                $rootScope.formData.getKraDetails = false;
                                if (!$rootScope.formData.fields.aadharNumber)
                                {
                                    $rootScope.formData.nonkraMsg = true;
                                }
                                else
                                {
                                    $rootScope.formData.nonkraMsg = false;
                                }
                                $rootScope.formData.aadharSection = true;
                                $(".select").prop("disabled", true);
                            }
                        }
                    }
                    else
                    {
                        var purl = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_COR_PINCD;
                        serverService.getList(purl).then(function (response)
                        {
                            if (response.IsSuccess)
                            {
                                $rootScope.formData.KRA = true;
                                localStorage.setItem("IsKRA", true);
                                $rootScope.formData.kraData.APP_COR_STATENAME = response.PincodeList[0].StateName;
                                $rootScope.formData.kraData.APP_COR_DISTRICT = response.PincodeList[0].District;

                                if ($rootScope.formData.kraData.APP_COR_PINCD != $rootScope.formData.kraData.APP_PER_PINCD)
                                {
                                    var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_PER_PINCD;
                                    serverService.getList(p_url).then(function (response)
                                    {
                                        if (response.IsSuccess)
                                        {
                                            $rootScope.formData.kraData.APP_PER_STATENAME = response.PincodeList[0].StateName;
                                            $rootScope.formData.kraData.APP_PER_DISTRICT = response.PincodeList[0].District;
                                            localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
                                            if (!$rootScope.formData.IsClone)
                                            {
                                                $rootScope.generateReference();
                                            }
                                        }
                                    }).error(function ()
                                    {
                                        $('#connection').modal('show');
                                    });
                                } else
                                {
                                    $rootScope.formData.kraData.APP_PER_STATENAME = $rootScope.formData.kraData.APP_COR_STATENAME;
                                    $rootScope.formData.kraData.APP_PER_DISTRICT = $rootScope.formData.kraData.APP_COR_DISTRICT;
                                    localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
                                    if (!$rootScope.formData.IsClone)
                                    {
                                        $rootScope.generateReference();
                                    }
                                }

                            }
                        });
                    }
                } else
                {
                    localStorage.setItem("IsKRA", false);
                    if (!$rootScope.formData.IsClone)
                    {
                        if ($rootScope.formData.ReferenceNumber)
                        {
                            $rootScope.formData.KRA = false;
                            $state.go('address');
                        }
                        else
                        {
                            //$rootScope.generateReference();
							$rootScope.formData.getKraDetails = false;
							if($rootScope.formData.fields.aadharNumber){
									$('.loader-info.paninfo').css('display', 'block');
									$rootScope.formData.nonkraMsg = false;
									$scope.aadharProceed = true; 
									$rootScope.formData.checkingMessage  = "KRA not verified. We are proceeding with Aadhar verification process to get the your KYC details.";
									$(".select").prop("disabled", true);
									$rootScope.formData.aadharAuthorize = 'Y';
									$('#agree-reliance').prop('checked', true);
									 $('.customcheckradio').iCheck({
										checkboxClass: 'icheckbox_minimal',
										radioClass: 'iradio_minimal'
									});
									$scope.aadharValidate();								
									$rootScope.formData.aadharSection = true;
									$(".select").prop("disabled", true);		
							}
							else{
								$rootScope.formData.nonkraMsg = true;
								$rootScope.formData.aadharSection = true;
								$(".select").prop("disabled", true);
							}
                        }
                    }
                }
            }).error(function ()
            {
                $('#connection').modal('show');
            });
        }

    }

	$scope.modalPop = function (b)
    {
        if ($rootScope.formData.getKraDetails)
        {
            $rootScope.kraValidation();
        }
        else
        {
            $rootScope.getDIYStatus();
        }
    }
  
});