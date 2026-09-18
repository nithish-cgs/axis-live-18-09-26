function addressController($scope, $rootScope, $state, serverService) {
	$rootScope.formData.stageInfo = '2';
	$rootScope.formData.getKraDetails = false;
	$rootScope.formData.unCheckSameAddress = false;
	$rootScope.formData.fields.mobileExtn = "+91";
	$scope.addressSame = 1;
	$scope.nameFreeze = true;
	$scope.lastnameFreeze = true;
	$('#newaddresse').prop('checked', false);
	$('#newaddresse12').prop('checked', false);
	if ($rootScope.formData.aadharVerified) {
		localStorage.setItem('RxUIDVerified', true)
	}
	if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
		if (localStorage.getItem('AxNo') != null) {
			$rootScope.formData.eRefNumber = localStorage.getItem('AxNo');
			$rootScope.getDIYStatus();
		} else {
			window.location.href = (serverService.getHome());
		}
	}
	$rootScope.formData.aadharSection = false;
	$rootScope.formData.apiLoading = false;
	if (!$rootScope.formData.fields.email) {
		$rootScope.formData.fields.email = localStorage.getItem('RxEmail');
	}

	if (!$rootScope.formData.fields.mobile) {
		$rootScope.formData.fields.mobile = localStorage.getItem('RxMobile');
	}


	$("html, body").animate({
		scrollTop: 0
	}, "slow");
	$rootScope.formData.stageOrder = 2;
	$rootScope.formData.fields.cAddressType = "1003";
	$rootScope.formData.fields.pAddressType = "1003";
	$rootScope.formData.fields.sameAddress = true;
	$rootScope.formData.fields.changeAddress = false;
	$rootScope.formData.cPin_valueError = false;
	$rootScope.formData.pPin_valueError = false;
	setTimeout(function () {
		$("#caddressType option:contains(" + $rootScope.formData.fields.cAddressType + ")").prop('selected', true);
		$(".select").select2();
		$scope.selectShow = true;
	}, 500);



	$rootScope.formData.fields.email = localStorage.getItem('RxEmail');
	$scope.checkradioinit = function () {
		$(".select").select2();
		$('.customcheckradio').iCheck({
			checkboxClass: 'icheckbox_minimal',
			radioClass: 'iradio_minimal'
		});
		$('label.sameaddress input[type="checkbox"]').on("ifChecked", function () {
			$rootScope.formData.fields.sameAddress = true;
			$('#oldaddress').prop('checked', true);
			$rootScope.formData.unCheckSameAddress = false;
			if (localStorage.getItem('IsKRA') === 'true' || localStorage.getItem('IsKRA') === true){
				if($rootScope.formData.KRA && !$rootScope.formData.changeKRA){
				$rootScope.formData.kraData.APP_PER_ADD1 = $rootScope.formData.kraData.APP_COR_ADD1;
				$rootScope.formData.IsKRAUpdatePer = 'N';
				$rootScope.formData.IsKRAUpdate = 'N';
				localStorage.setItem('IsKRAUpdate', 'N');
				$scope.kraClientData();
			}
			}
			$scope.$apply();
		}).on("ifUnchecked", function () {
			if (localStorage.getItem('IsKRA') === 'true' || localStorage.getItem('IsKRA') === true){
				$rootScope.formData.IsKRAUpdatePer = 'Y';
				$rootScope.formData.kraData.APP_PER_ADD1 = $rootScope.formData.kraData.APP_COR_ADD1;
				$rootScope.formData.IsKRAUpdate = 'Y';
				$scope.kraClientData();
			}
			$rootScope.formData.fields.sameAddress = false;
			$rootScope.formData.unCheckSameAddress = true;
			$rootScope.formData.fields.pAddressType = "1003";
			$rootScope.formData.fields.pAddress = '';
			$rootScope.formData.fields.pStateName = '';
			$rootScope.formData.fields.pDistrict = '';
			setTimeout(function () {
				$("#pAddressType option:contains(" + $rootScope.formData.fields.pAddressType + ")").prop('selected', true);
				$(".select").select2();
				$scope.pselectShow = true;
			}, 100);
			$scope.$apply();
		});


		$('.newaddressarea label input[type="checkbox"]').on("ifChecked", function () {
			if($rootScope.formData.threeinone){
				$rootScope.formData.chgAdrDisable = false;
				$scope.changeAddressDisable  = false;
				$rootScope.formData.changeKRA = true;
				$('#oldaddress').prop('checked', true);
				$rootScope.formData.IsKRAUpdatePer = '';
				localStorage.setItem('IsKRAUpdate', 'Y');
				$('#title').val($('#ktitle').val());
				// for KRA Users
				if ($rootScope.formData.kraData !== '') {
					$rootScope.formData.tempData = $rootScope.formData.kraData;
					$rootScope.formData.changeKRA = true;
					$rootScope.formData.IsKRAUpdate = 'Y';
				}
				setTimeout(function () {
					$rootScope.formData.fields.sameAddress = true;
					$('#city1_value').val('');
					$('#cPin_value').val('');
					$rootScope.formData.fields.cAddress = '';
					$rootScope.formData.fields.cDistrict = '';
					$rootScope.formData.fields.cStateName = '';
					//$('#oldaddress').prop('checked', false);

					$rootScope.formData.fields.changeAddress = true;
					$rootScope.formData.fields.changeAddress1 = true;
					$('#newaddresse').iCheck('check');
					$('#newaddresse12').iCheck('check');
					// $('#newaddresse12').prop('checked', true);
					// $('#newaddresse').prop('checked', true);
					$scope.checkradioinit();
					$scope.$apply();

				}, 100)
				$scope.getPersonalInfo();
			}else {
				
				$('#NonKRAVerified').modal({
						backdrop: 'static',
						keyboard: true
				})// offline Aadhar popup Screen
				
				$('#oldaddress').prop('checked', true);
				$rootScope.formData.IsKRAUpdatePer = '';
				localStorage.setItem('IsKRAUpdate', 'Y');
				$('#title').val($('#ktitle').val());
				// for KRA Users
				if ($rootScope.formData.kraData !== '') {
					$rootScope.formData.tempData = $rootScope.formData.kraData;
					$rootScope.formData.changeKRA = true;
					$rootScope.formData.IsKRAUpdate = 'Y';
				}
				setTimeout(function () {
					$rootScope.formData.fields.sameAddress = true;
					$('#city1_value').val('');
					$('#cPin_value').val('');
					$rootScope.formData.fields.cAddress = '';
					$rootScope.formData.fields.cDistrict = '';
					$rootScope.formData.fields.cStateName = '';
					//$('#oldaddress').prop('checked', false);

					$rootScope.formData.fields.changeAddress = true;
					$rootScope.formData.fields.changeAddress1 = true;
					$('#newaddresse').iCheck('check');
					$('#newaddresse12').iCheck('check');
					// $('#newaddresse12').prop('checked', true);
					// $('#newaddresse').prop('checked', true);
					$scope.checkradioinit();
					$scope.$apply();

				}, 100)

				$scope.$apply();
			}
		}).on("ifUnchecked", function () {
			setTimeout(function () {
				$rootScope.formData.fields.changeAddress = false;
				$rootScope.formData.fields.changeAddress1 = false;
				// $('#newaddresse12').prop('checked', false);
				// $('#newaddresse').prop('checked', false);
				$('#newaddresse').iCheck('uncheck');
				$('#newaddresse12').iCheck('uncheck');
				$scope.checkradioinit();
				$scope.$apply();
			}, 100)

				$rootScope.formData.kraData = $rootScope.formData.tempData;

				var Address_Info_Stage = '';
				Address_Info_Stage = "Address_Info_Stage" + "-" + localStorage.getItem("RxReferenceNumber");
				if (JSON.parse(localStorage.getItem(Address_Info_Stage)) != null) {
					var Address_Info = JSON.parse(localStorage.getItem(Address_Info_Stage));
					$rootScope.formData.fields.firstName = Address_Info.firstName;
					$rootScope.formData.fields.middleName = (Address_Info.middleName != null) ? Address_Info.middleName : '';
					$rootScope.formData.fields.lastName = Address_Info.lastName;
				}

				$rootScope.formData.changeKRA = false;
				$rootScope.formData.KRA = true;
				$rootScope.formData.IsKRAUpdate = 'N';
				localStorage.setItem('IsKRAUpdate', 'N');
				localStorage.setItem('IsAadharVerified', 'false');
				setTimeout(function () {
					$rootScope.formData.kraData = JSON.parse(localStorage.getItem('KRAClientInfo'));
					$rootScope.formData.KRA = true;
					$scope.kraClientData();
				}, 500);
				
			
			$scope.$apply();
		});
	}
	setTimeout(function () {
		$scope.checkradioinit();
	}, 500)
	$scope.kraClientData = function () {
		if ($rootScope.formData.kraData != undefined && $rootScope.formData.kraData != '' && $rootScope.formData.kraData != null) {
			if ($rootScope.formData.kraData.APP_COR_ADD1 == $rootScope.formData.kraData.APP_PER_ADD1) {
				$rootScope.formData.getSameAddress = true;
				$rootScope.formData.fields.sameAddress = true;
				$('#oldaddress').prop('checked', true);
			} else {
				$rootScope.formData.getSameAddress = false;
				$rootScope.formData.fields.sameAddress = false;
				$rootScope.formData.unCheckSameAddress = true;
				setTimeout(function () {
					$('#oldaddress').prop('checked', false);
					if($rootScope.formData.threeinone){
						$('#oldaddress').prop('disabled', true);
					}
					$('#oldaddress').iCheck('update');					
					$scope.$apply();
				}, 100);
				var padr1 = '';
				if ($rootScope.formData.kraData.APP_PER_ADD1) {
					padr1 = $rootScope.formData.kraData.APP_PER_ADD1;
				} else {
					if(adr1){
						padr1 = adr1
					}
					else{
						padr1 = '';
					}
				}

				var padr2 = '';
				if ($rootScope.formData.kraData.APP_PER_ADD2) {
					padr2 = $rootScope.formData.kraData.APP_PER_ADD2;
				} else {
					padr2 = adr2
					if(adr2){
						padr2 = adr2;
					}
					else{
						padr2 = '';
					}
				}

				var padr3 = '';
				if ($rootScope.formData.kraData.APP_PER_ADD3) {
					padr3 = $rootScope.formData.kraData.APP_PER_ADD3;
				} else {
					if(adr3){
						padr3 = adr3;
					}
					else{
						padr3 = '';
					}
				}

				$rootScope.formData.fields.pAddress = padr1 + ' ' + padr2 + ' ' + padr3;
				$rootScope.formData.fields.pStateName = $rootScope.formData.kraData.APP_PER_STATENAME;
				$rootScope.formData.fields.pStateId = $rootScope.formData.kraData.APP_PER_STATEID;
				$rootScope.formData.fields.pDistrict = $rootScope.formData.kraData.APP_PER_DISTRICT;
				$rootScope.formData.fields.pPin = $rootScope.formData.kraData.APP_PER_PINCD;
				$rootScope.formData.fields.pCity = $rootScope.formData.kraData.APP_PER_CITY;
				if($rootScope.formData.threeinone && $rootScope.formData.fields.pAddress){
					$scope.pAddressFreeze = true;
				}else{
					$scope.pAddressFreeze = false;
				}
				if($rootScope.formData.threeinone && $rootScope.formData.fields.pPin){
					$('#pPin_value').prop('disabled', true);
				}else{
					$('#pPin_value').prop('disabled', false);
				}
				if($rootScope.formData.threeinone && $rootScope.formData.fields.pCity){
					$('#city2_value').prop('disabled', true);
				}else{
					$('#city2_value').prop('disabled', false);
				}
				setTimeout(function () {
					$('#pPin_value').val($rootScope.formData.fields.pPin);
					$('#city2_value').val($rootScope.formData.fields.pCity);
				}, 500);
			}
			if ($rootScope.formData.fields.aadharNumber) {
				$scope.uidFreeze = true;
			}
			if ($rootScope.formData.kraData) {
				if ($rootScope.formData.kraData.APP_FirstName) {
					$rootScope.formData.fields.firstName = $rootScope.formData.kraData.APP_FirstName;
				} else {
					$rootScope.formData.fields.firstName = '';
				}
				if ($rootScope.formData.kraData.APP_MiddleName) {
					$rootScope.formData.fields.middleName = $rootScope.formData.kraData.APP_MiddleName;
				} else {
					$rootScope.formData.fields.middleName = '';
				}

				if ($rootScope.formData.kraData.APP_LastName) {
					$rootScope.formData.fields.lastName = $rootScope.formData.kraData.APP_LastName;
				} else {
					$rootScope.formData.fields.lastName = '';
				}
			} else {
				var Address_Info_Stage = '';
				Address_Info_Stage = "Address_Info_Stage" + "-" + localStorage.getItem("RxReferenceNumber");
				if (JSON.parse(localStorage.getItem(Address_Info_Stage)) != null) {
					var Address_Info = JSON.parse(localStorage.getItem(Address_Info_Stage));
					$rootScope.formData.fields.firstName = Address_Info.firstName;
					$rootScope.formData.fields.middleName = (Address_Info.middleName != null) ? Address_Info.middleName : '';
					$rootScope.formData.fields.lastName = Address_Info.lastName;
				}
			}
			// 	if ($rootScope.formData.kraData.APP_FirstName == '' || $rootScope.formData.kraData.APP_FirstName == null) {
			// 		// $rootScope.formData.fields.firstName = $rootScope.formData.kraData.APP_NAME;

			// 		var name = $rootScope.formData.kraData.APP_NAME.split(" ");
			// 		$rootScope.formData.fields.firstName = name[0];
			// 		$rootScope.formData.fields.middleName = name[1];
			// 		$scope.nameFreeze = true;

			// 		var len = name.length;
			// 		var nameArray = [];
			// 		if (len >= 3) {
			// 			for (var i = 2; i < len; i++) {

			// 				nameArray.push(name[i]);
			// 			}
			// 			$rootScope.formData.fields.lastName = nameArray.join(" ");
			// 		}
			// 		else if (len == 1) {
			// 			$rootScope.formData.fields.lastName = '.';
			// 		}
			// 		else {
			// 			$rootScope.formData.fields.lastName = name[1];
			// 			$rootScope.formData.fields.middleName = '';
			// 		}
			// 	}
			// 	else {
			// 		$rootScope.formData.fields.firstName = $rootScope.formData.kraData.APP_FirstName;
			// 		$scope.nameFreeze = true;
			// 	}
			// }
			// else {
			// 	if (!$rootScope.formData.fields.firstName) {
			// 		$rootScope.formData.fields.firstName = '';
			// 	}
			// 	if (!$rootScope.formData.fields.middleName) {
			// 		$rootScope.formData.fields.middleName = '';
			// 	}
			// 	if (!$rootScope.formData.fields.lastName) {
			// 		$rootScope.formData.fields.lastName = '';
			// 	}
			// 	$rootScope.formData.kraData.APP_NAME = $rootScope.formData.fields.firstName + ' ' + $rootScope.formData.fields.middleName + ' ' + $rootScope.formData.fields.lastName;
			// }


			var adr1 = '';
			if ($rootScope.formData.kraData.APP_COR_ADD1) {
				adr1 = $rootScope.formData.kraData.APP_COR_ADD1;
			}

			var adr2 = '';
			if ($rootScope.formData.kraData.APP_COR_ADD2) {
				adr2 = $rootScope.formData.kraData.APP_COR_ADD2;
			}

			var adr3 = '';
			if ($rootScope.formData.kraData.APP_COR_ADD3) {
				adr3 = $rootScope.formData.kraData.APP_COR_ADD3;
			}

			$rootScope.formData.fields.cAddress = adr1 + ' ' + adr2 + ' ' + adr3;
			$rootScope.formData.fields.cStateName = $rootScope.formData.kraData.APP_COR_STATENAME;
			$rootScope.formData.fields.cStateId = $rootScope.formData.kraData.APP_COR_STATE;
			$rootScope.formData.fields.cDistrict = $rootScope.formData.kraData.APP_COR_DISTRICT;
			$rootScope.formData.fields.cCity = $rootScope.formData.kraData.APP_COR_CITY;
			$rootScope.formData.fields.cPin = $rootScope.formData.kraData.APP_COR_PINCD;
			$rootScope.formData.cdValid = true;
			if ($rootScope.formData.fields.cCity != null && !$rootScope.formData.KRA) {
				setTimeout(function () {
					$('#city1_value').val($rootScope.formData.fields.cCity);
					$('#cPin_value').val($rootScope.formData.fields.cPin);
					$('#ktitle').val($rootScope.formData.fields.title);
					}, 500)
					/****for IE fix ***/
					//$('#city1_value').focus();
					//$('#cPin_value').focus();
				} else if ($rootScope.formData.fields.cCity != null && $rootScope.formData.KRA) {
					setTimeout(function () {
					$('#kCity').val($rootScope.formData.fields.cCity);
					$('#pin').val($rootScope.formData.fields.cPin);
					}, 500)

				}


			$rootScope.formData.pdValid = true;
			if ($rootScope.formData.kraData.APP_GEN == 'M') {
				$rootScope.formData.fields.title = 'MR'
			} else if ($rootScope.formData.kraData.APP_GEN == 'F' && $rootScope.formData.kraData.APP_MAR_STATUS == 'S') {
				$rootScope.formData.fields.title = 'MISS'
			} else if ($rootScope.formData.kraData.APP_GEN == 'F' && ($rootScope.formData.kraData.APP_MAR_STATUS == '' || $rootScope.formData.kraData.APP_MAR_STATUS == null)) {
				$rootScope.formData.fields.title = 'MS'
			} else if ($rootScope.formData.kraData.APP_GEN == 'F') {
				$rootScope.formData.fields.title = 'MRS'
			}
			$("#kra_title").val($rootScope.formData.fields.title);
			setTimeout(function () {
				$(".select").select2();
			}, 500)

			$scope.$apply();
			//	Image($rootScope.formData.fields.title)
		}
	};

	$scope.resetValidation = function (tagName) {
		$scope[tagName] = false;
	}

	setTimeout(function () {
		if (localStorage.getItem('IsKRA') == 'true') {
			$rootScope.formData.kraData = JSON.parse(localStorage.getItem('KRAClientInfo'));
			
			$rootScope.formData.KRA = true;
			if ($rootScope.formData.IsKRAUpdate == 'Y') {
					$scope.krabtn = true;
					//localStorage.setItem('IsKRAUpdate', 'Y');
					$rootScope.formData.chgAdrDisable = true;
					$rootScope.formData.changeKRA = false;
					$rootScope.formData.KRA = false;
			} else {
					$rootScope.formData.IsKRAUpdate == 'N';
			}
			// $rootScope.formData.fields.sameAddress = false;
			$scope.kraClientData();
		} else {
			$rootScope.formData.KRA = false;
			$scope.lastnameFreeze = true;
			if (localStorage.getItem("CFirstname")) {
				$rootScope.formData.ClientFirstname = localStorage.getItem("CFirstname");
			}
			if (localStorage.getItem("CMiddlename")) {
				$rootScope.formData.ClientMiddlename = localStorage.getItem("CMiddlename");
			}
			if (localStorage.getItem("CLastname")) {
				$rootScope.formData.ClinetLastname = localStorage.getItem("CLastname");
			}
			// if (localStorage.getItem("CLastname") == '' || localStorage.getItem("CLastname") == null) {
			// 	$scope.lastnameFreeze = false;
			// }
		}
	}, 1500);

	$scope.getPersonalInfo = function () {
		if (!$rootScope.getAPI) {
		var s_url = "DIYGetClientPersonalInfoByReferenceNumber";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		}
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}
		
		$rootScope.formData.apiLoading = true;
		//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
		serverService.apiCall(s_url, sendData).success(function (response) {			
			$rootScope.formData.apiLoading = false;
			if(response.EncryptToken){
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
			}
			else{
				$rootScope.clearBrowsingData();
				$('#APIResponse').modal({backdrop: 'static',keyboard: false});
				$rootScope.apiResponseErrorMsg = response.ErrorMessage;
			}
			if (response.IsSuccess) {
				//$rootScope.formData.KRA = false;
				
				

				if (response.ObjCDIYClientProfile.UID != null && response.ObjCDIYClientProfile.UID != '') {
					$rootScope.formData.fields.aadharNumber = response.ObjCDIYClientProfile.UID;
					localStorage.removeItem('RxUID');
					$scope.uidFreeze = true;
					$rootScope.formData.changeAadhar = false;
					setTimeout(function () {
					$("#ktitle").val(response.ObjCDIYClientProfile.ClientPrefixID);
					}, 500);
				} else {
					$scope.uidFreeze = false;
				}

				if (response.ObjCDIYClientProfile.AadharAuthorisation != null && response.ObjCDIYClientProfile.AadharAuthorisation != '') {
					$rootScope.formData.fields.aadharAuthorize = response.ObjCDIYClientProfile.AadharAuthorisation;
				}
				//$rootScope.formData.IsKRAUpdate = response.ObjCDIYClientProfile.IsKRAUpdate;
				
				if (response.ObjCDIYClientProfile.FirstName !== '') {
					$rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
				}
				$rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
				if (response.ObjCDIYClientProfile.lastName !== '') {
					$scope.lastnameFreeze = true;
					$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
				}else{
					$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
				}
				$scope.nameFreeze = true;
				$rootScope.formData.fields.title = response.ObjCDIYClientProfile.ClientPrefixID;
				setTimeout(function () {
					$("#ktitle").val(response.ObjCDIYClientProfile.ClientPrefixID);
					}, 500);
				if (localStorage.getItem('IsKRA') == 'true') {
					$("#kra_title").val($rootScope.formData.fields.title);
					$rootScope.formData.kraData = {
						APP_FirstName: response.ObjCDIYClientProfile.FirstName,
						APP_LastName: response.ObjCDIYClientProfile.LastName,
						APP_MiddleName: response.ObjCDIYClientProfile.MiddleName,
						APP_EMAIL: response.ObjCDIYClientProfile.Email,
						APP_COR_ADD1: response.ClientAddressDetailsList[0].AddressLine1,
						APP_COR_ADD2: response.ClientAddressDetailsList[0].AddressLine2,
						APP_COR_ADD3: response.ClientAddressDetailsList[0].AddressLine3,
						APP_COR_CITY: response.ClientAddressDetailsList[0].City,
						APP_COR_CTRY: response.ClientAddressDetailsList[0].Country,
						APP_COR_DISTRICT: response.ClientAddressDetailsList[0].District,
						APP_COR_PINCD: response.ClientAddressDetailsList[0].PinCode,
						APP_COR_STATE: response.ClientAddressDetailsList[0].StateId,
						APP_COR_STATENAME: response.ClientAddressDetailsList[0].State,

						APP_PER_ADD1: response.ClientAddressDetailsList[1].AddressLine1,
						APP_PER_ADD2: response.ClientAddressDetailsList[1].AddressLine2,
						APP_PER_ADD3: response.ClientAddressDetailsList[1].AddressLine3,
						APP_PER_CITY: response.ClientAddressDetailsList[1].City,
						APP_PER_CTRY: response.ClientAddressDetailsList[1].Country,
						APP_PER_DISTRICT: response.ClientAddressDetailsList[1].District,
						APP_PER_PINCD: response.ClientAddressDetailsList[1].PinCode,
						APP_PER_STATE: response.ClientAddressDetailsList[1].StateId,
						APP_PER_STATENAME: response.ClientAddressDetailsList[1].State,
					}
					$('#newaddresse12').iCheck('uncheck');
					$rootScope.formData.KRA = true;
					if(!$rootScope.formData.threeinone){
						$rootScope.formData.changeKRA = false;
					}
					localStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
				} else {
					$("#ktitle").val($rootScope.formData.fields.title);
					$rootScope.formData.KRA = false;
					$rootScope.formData.changeKRA = '';
					$('#newaddresse12').iCheck('uncheck');
				}

				setTimeout(function () {
					$(".select").select2();
				}, 500);

				//$rootScope.formData.fields.cAddressType = response.ClientAddressDetailsList[0].AddrTypeID;
				if ($rootScope.formData.IsKRAUpdate == 'Y') {
					$scope.krabtn = true;
					localStorage.setItem('IsKRAUpdate', 'Y');
					if(!$rootScope.formData.threeinone){
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.changeKRA = false;
					}
					$rootScope.formData.KRA = false;
				} else {
					$rootScope.formData.IsKRAUpdate == 'N';
				}
				$rootScope.formData.fields.cAddress = response.ClientAddressDetailsList[0].AddressLine1 + response.ClientAddressDetailsList[0].AddressLine2 + response.ClientAddressDetailsList[0].AddressLine3;
				if($rootScope.formData.threeinone && $rootScope.formData.fields.cAddress){
					$scope.cAddressFreeze = true;
				}else{
					$scope.cAddressFreeze = false;
				}
				$rootScope.formData.fields.cCity = response.ClientAddressDetailsList[0].City;
				if($rootScope.formData.threeinone && $rootScope.formData.fields.cCity){
					$('#city1_value').prop('disabled', true);
				}else{
					$('#city1_value').prop('disabled', false);
				}
				$rootScope.formData.fields.cPin = response.ClientAddressDetailsList[0].PinCode;
				if($rootScope.formData.threeinone && response.ClientAddressDetailsList[0].PinCode){
					$('#cPin_value').prop("disabled", true);
				}else{
					$('#cPin_value').prop('disabled', false);
				}
				if ($rootScope.formData.fields.cCity != null && !$rootScope.formData.KRA) {
					setTimeout(function () {
					$('#city1_value').val($rootScope.formData.fields.cCity);
					$('#cPin_value').val(response.ClientAddressDetailsList[0].PinCode);
					}, 500);
					/****for IE fix ***/
					//$('#city1_value').focus();
					//$('#cPin_value').focus();
				} else if ($rootScope.formData.fields.cCity != null && $rootScope.formData.KRA) {
					setTimeout(function () {
					$('#kCity').val($rootScope.formData.fields.cCity);
					$('#pin').val(response.ClientAddressDetailsList[0].PinCode);
					}, 500);
				}
				$rootScope.formData.fields.cStateName = response.ClientAddressDetailsList[0].State;
				$rootScope.formData.fields.cDistrict = response.ClientAddressDetailsList[0].District;
				$rootScope.formData.cdValid = true;

				var s_url = "DIYGetCityListForAutoFill?StateID=" + response.ClientAddressDetailsList[0].StateId;
				serverService.getTokenList(s_url, tokenParams).then(function (response) {
					//serverService.getList(s_url).then(function (response) {
					$rootScope.formData.cpinapiLoading = false;
					$rootScope.formData.ccityList = [];
					var len = response.StateDetailsList.length;
					for (var j = 0; j < len; j++) {
						$rootScope.formData.ccityList.push(response.StateDetailsList[j].City.toLowerCase());
					}
				})

				if (response.ClientAddressDetailsList[1].IsSamePermenantAddress == 1) {
					$rootScope.formData.fields.sameAddress = true;
					$rootScope.formData.pdValid = true;
					setTimeout(function () {
						$('#oldaddress').prop('checked', true);
						$scope.$apply();
					}, 10)
				} else {
					$rootScope.formData.unCheckSameAddress = true;
					$rootScope.formData.fields.sameAddress = false;
					$rootScope.formData.pdValid = true;
					setTimeout(function () {
						$('#oldaddress').prop('checked', false);
						$scope.$apply();
					}, 10)
				}
				if($rootScope.formData.threeinone){
					$('#oldaddress').prop('disabled', true);
				}
				if (response.ClientAddressDetailsList[0].AddrTypeID != null) {
					setTimeout(function () {
						$rootScope.formData.fields.cAddressType = (response.ClientAddressDetailsList[0].AddrTypeID).toString();
						if($rootScope.formData.threeinone && $rootScope.formData.fields.cAddressType){
							$('#cAddressType').addClass('freeze');
						}
						$("#cAddressType option:contains(" + $rootScope.formData.fields.cAddressType + ")").prop('selected', true);
						$scope.selectShow = true;
						$scope.$apply();
					}, 10)
				}
				if (response.ClientAddressDetailsList[1].AddrTypeID != null) {
					setTimeout(function () {
						$rootScope.formData.fields.pAddressType = (response.ClientAddressDetailsList[1].AddrTypeID).toString();
						if($rootScope.formData.threeinone && $rootScope.formData.fields.pAddressType){
							$('#pAddressType').addClass("freeze");
						}
						$("#pAddressType option:contains(" + $rootScope.formData.fields.pAddressType + ")").prop('selected', true);
						$scope.$apply();
					}, 500)
				}
				//$rootScope.formData.fields.pAddressType = response.ClientAddressDetailsList[1].AddrTypeID;
				$rootScope.formData.fields.pAddress = response.ClientAddressDetailsList[1].AddressLine1 + response.ClientAddressDetailsList[1].AddressLine2 + response.ClientAddressDetailsList[1].AddressLine3;

				if($rootScope.formData.threeinone && $rootScope.formData.fields.pAddress){
					$scope.pAddressFreeze = true;
				}else{
					$scope.pAddressFreeze = false;
				}
				if (response.ClientAddressDetailsList[1].StateId != null && !$rootScope.formData.fields.sameAddress) {

					$rootScope.formData.fields.pStateName = response.ClientAddressDetailsList[1].State;
				}

				$rootScope.formData.fields.pDistrict = response.ClientAddressDetailsList[1].District;
				$rootScope.formData.fields.pPin = response.ClientAddressDetailsList[1].PinCode;
				$rootScope.formData.fields.mobile = response.ObjCDIYClientProfile.Mobile;
				$rootScope.formData.fields.email = response.ObjCDIYClientProfile.Email;
				$rootScope.formData.fields.pCity = response.ClientAddressDetailsList[1].City;
				
				$rootScope.formData.pdValid = true
				$rootScope.otpRequired = false;
				$rootScope.formData.fields.pPin = response.ClientAddressDetailsList[1].PinCode;
				
				var s_url = "DIYGetCityListForAutoFill?StateID=" + response.ClientAddressDetailsList[1].StateId;
				serverService.getTokenList(s_url, tokenParams).then(function (response) {
					//serverService.getList(s_url).then(function (response) {
					$rootScope.formData.ppinapiLoading = false;
					$rootScope.formData.pcityList = [];
					var len = response.StateDetailsList.length;
					for (var j = 0; j < len; j++) {
						$rootScope.formData.pcityList.push(response.StateDetailsList[j].City.toLowerCase());
					}
				})
				$rootScope.formData.fields.pState = (response.ClientAddressDetailsList[1].StateId).toString();



				if ($rootScope.formData.fields.pCity) {
					setTimeout(function () {
						$('#pPin_value').val(response.ClientAddressDetailsList[1].PinCode);
						$('#city2_value').val($rootScope.formData.fields.pCity);
						if($rootScope.formData.threeinone && response.ClientAddressDetailsList[1].PinCode){
							$('#pPin_value').prop('disabled', true);
						}else{
							$('#pPin_value').prop('disabled', false);
						}
						if($rootScope.formData.threeinone && $rootScope.formData.fields.pCity){
							$('#city2_value').prop('disabled', true);
						}else{
							$('#city2_value').prop('disabled', false);
						}

						/****for IE fix ***/
					}, 500);
				}

				setTimeout(function () {
					$scope.checkradioinit();
				}, 1010)

			} else {
				var Address_Info_Stage = '';
				if (localStorage.getItem('IsKRA') == 'true') {
					$rootScope.formData.changeKRA = false;
				}
				Address_Info_Stage = "Address_Info_Stage" + "-" + localStorage.getItem("RxReferenceNumber");
				if (!$rootScope.formData.aadharVerified && localStorage.getItem('IsKRA') != 'true' && JSON.parse(localStorage.getItem(Address_Info_Stage)) != null) {
					var Address_Info = JSON.parse(localStorage.getItem(Address_Info_Stage));
					$rootScope.formData.fields.firstName = Address_Info.firstName;
					$rootScope.formData.fields.middleName = Address_Info.middleName;
					$rootScope.formData.fields.lastName = Address_Info.lastName;
					$rootScope.formData.fields.cAddressType = Address_Info.CorrespondenceTypeID;
					$rootScope.formData.fields.cPin = Address_Info.cPin;
					$('#cPin_value').val(Address_Info.cPin);
					$rootScope.formData.fields.cStateName = Address_Info.cState;
					$rootScope.formData.fields.cStateId = Address_Info.cStateId;
					$('#city1_value').val(Address_Info.cCity);
					$rootScope.formData.cdValid = true;
					$rootScope.formData.fields.cDistrict = Address_Info.cDistrict;
					$rootScope.formData.fields.cAddress = Address_Info.cAddress;
					$rootScope.formData.fields.sameAddress = Address_Info.sameAddress;
					$rootScope.formData.fields.pPin = Address_Info.pPin;
					$('#pPin_value').val(Address_Info.pPin);
					$rootScope.formData.fields.pStateName = Address_Info.pState;
					$rootScope.formData.fields.pStateId = Address_Info.pStateId;
					$('#city2_value').val(Address_Info.pCity);
					$rootScope.formData.pdValid = true;
					$rootScope.formData.fields.pDistrict = Address_Info.pDistrict;
					$rootScope.formData.fields.pAddress = Address_Info.pAddress;
					$('#ktitle').val(Address_Info.title);
					setTimeout(function () {
						$(".select").select2();
					}, 500);
				}
				if (response.ObjCDIYClientProfile.FirstName !== '') {
					$rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
				}
				$rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
				if (response.ObjCDIYClientProfile.lastName !== '') {
					$scope.lastnameFreeze = true;
					$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
				}else{
					$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
				}
				$scope.nameFreeze = true;
			}
		}).error(function(){			
			$rootScope.formData.apiLoading = false;
		});
	
		}
	}

	if($rootScope.formData.threeinone && (localStorage.getItem('IsKRA') == 'true')){
		$rootScope.wizardShow = true;
		setTimeout(function () {
			$rootScope.formData.kraData = JSON.parse(localStorage.getItem('KRAClientInfo'));
			$rootScope.formData.KRA = true;
			// $rootScope.formData.fields.sameAddress = false;
			if ($rootScope.formData.kraData != undefined && $rootScope.formData.kraData != '' && $rootScope.formData.kraData != null) {
				$scope.kraClientData();
			}
			else{
				if($rootScope.formData.tokenValidation && !$rootScope.EncryptToken){
					var url = "GetEncrptToken";
					var sendData = {ReferenceNumber: localStorage.getItem('AxNo')}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).success(function (data) {
						$rootScope.formData.apiLoading = false;
						 if(data.EncryptToken){
							$rootScope.EncryptToken = data.EncryptToken;
							$scope.getPersonalInfo();
						 }
					});
					 
				}else{
					$scope.getPersonalInfo();
				}	
			}
		}, 1500);
	}
	else{
		$rootScope.wizardShow = true;
		if($rootScope.formData.tokenValidation && !$rootScope.EncryptToken){
			var url = "GetEncrptToken";
			var sendData = {ReferenceNumber: localStorage.getItem('AxNo')}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).success(function (data) {
				$rootScope.formData.apiLoading = false;
				 if(data.EncryptToken){
					$rootScope.EncryptToken = data.EncryptToken;
					$scope.getPersonalInfo();
				 }
			});
			 
		}else{
			$scope.getPersonalInfo();
		}
	}

	$scope.profileValidate = function () {
		var error = 0;
		if (($rootScope.formData.aadharVerified && !$rootScope.formData.changeAadhar)) {
			if ($rootScope.formData.KRA && $rootScope.formData.fields.sameAddress) {
				$rootScope.formData.fields.pAddress = $rootScope.formData.fields.pAddresskRA;
				$rootScope.formData.fields.pStateName = $rootScope.formData.kraData.APP_PER_STATENAME;
				$rootScope.formData.fields.pStateId = $rootScope.formData.kraData.APP_PER_STATEID;
				$rootScope.formData.fields.pDistrict = $rootScope.formData.kraData.APP_PER_DISTRICT;
				$rootScope.formData.fields.pPin = $rootScope.formData.kraData.APP_PER_PINCD;

				$rootScope.formData.fields.pCity = $rootScope.formData.kraData.APP_PER_CITY;
				if (localStorage.getItem('IsKRA') == 'true') {
					$rootScope.formData.IsKRAUpdate = 'Y';
					if ($('#kra_title').val().length < 1) {
						$scope.ktitleError = true;
						$('#kra_title').focus();
						error++;
					} else {
						$rootScope.formData.fields.title = $('#kra_title').val();
					}
				} else {
					$rootScope.formData.IsKRAUpdate = 'N';
					if ($('#ktitle').val().length < 1) {
						$scope.ktitleError = true;
						$('#ktitle').focus();
						error++;
					} else {
						$rootScope.formData.fields.title = $('#ktitle').val();
					}
				}
			}

			if ($rootScope.formData.aadharVerified) {
				$rootScope.formData.fields.pAddress = $rootScope.formData.fields.pAddresskRA;
				$rootScope.formData.fields.pStateName = $rootScope.formData.aadharData.APP_PER_STATENAME;
				$rootScope.formData.fields.pStateId = $rootScope.formData.aadharData.APP_PER_STATEID;
				$rootScope.formData.fields.pDistrict = $rootScope.formData.aadharData.APP_PER_DISTRICT;
				$rootScope.formData.fields.pPin = $rootScope.formData.aadharData.APP_PER_PINCD;
				$rootScope.formData.fields.pCity = $rootScope.formData.aadharData.APP_PER_CITY;
			} else {
				localStorage.setItem('IsAadhar', false);
				$rootScope.formData.IsAadharUpdate = "N";
			}

		} else {
			// $rootScope.formData.IsKRAUpdate = 'N';
			if (localStorage.getItem('IsKRAUpdate') == "Y") {
				$rootScope.formData.IsKRAUpdate = 'Y';
			} else {
				$rootScope.formData.IsKRAUpdate = 'N';
			}
			var fields = $('#addressPost input, #addressPost select');

			if ($('#fmName').val() == "") {
				error++;
				$('#fmName').focus();
				$scope.fmNameError = true;
			}
			if ($('#lmName').val() == "") {
				error++;
				$scope.lmNameError = true;
				$('#lmName').focus();
			}

			if ($('#fmName_KRA').val() == "") {
				error++;
				$('#fmName_KRA').focus();
				$scope.fmName_KRAError = true;
			}
			if ($('#lmname_KRA').val() == "") {
				error++;
				$('#lmname_KRA').focus();
				$scope.lmname_KRAError = true;
			}


			fields.each(function () {
				var value = $(this).val();
				if (value.length < 1) {
					//console.log(this.id);
					if (this.id != "inputuid" && this.id != "mmName" && this.id != "lmName" && this.id != "oaadhar-number") {
						var a = this.id + 'Error';
						$scope[a] = true;
						error++;
						if (error == 1) {
							$('#' + this.id).focus();
						}
					}
				} else {
					var a = this.id + 'Error';
					$scope[a] = false;
				}
				if (value.length < 6) {
					if (this.id == "cPin_value" || this.id == "pPin_value") {
						var a = this.id + 'Error';
						$scope[a] = true;
						error++;
						if (this.id == "cPin_value") {
							$('#' + this.id).focus();
						}
					}
				} else {
					var a = this.id + 'Error';
					$scope[a] = false;
				}
				if (value.length < 5) {
					if (this.id == "areaadd1" || this.id == "pareaadd1") {
						var a = this.id + 'Error';
						$scope[a] = true;
						error++;
						if (this.id == "areaadd1") {
							$('#' + this.id).focus();
						}
					}
				} else {
					var a = this.id + 'Error';
					$scope[a] = false;
				}
			});

			if ($rootScope.formData.city1_valueError) {
				$scope.city1_valueError = true;
				error++;
			}

			if ($rootScope.formData.city2_valueError) {
				$scope.city2_valueError = true;
				error++;
			}


		}
		if (error == 0) {
			$rootScope.formData.IsAadharUpdate = 'N';
			$rootScope.formData.IsKRAUpdate = 'N';

			// For KRA Client Data submit
			if (localStorage.getItem('IsKRA') === true || localStorage.getItem('IsKRA') === 'true') {
				$rootScope.formData.fields.cAddress = $rootScope.formData.fields.cAddress.trim();
				if(!$rootScope.formData.changeKRA){
					$rootScope.formData.fields.cPin = $('#pin').val();
					$rootScope.formData.fields.cCity = $('#kCity').val();
					localStorage.setItem('IsKRA', true);
				}
				else{
					$rootScope.formData.fields.cPin = $('#cPin_value').val();
					$rootScope.formData.fields.cCity = $('#city1_value').val();		
					localStorage.setItem('IsKRA', false);					
				}
				var user_addr = '';
				if ($rootScope.formData.kraData) {
					user_addr = $rootScope.formData.kraData.APP_COR_ADD1 + ' ' + $rootScope.formData.kraData.APP_COR_ADD2 + ' ' + $rootScope.formData.kraData.APP_COR_ADD3;
					puser_addr = $rootScope.formData.kraData.APP_PER_ADD1 + ' ' + $rootScope.formData.kraData.APP_PER_ADD2 + ' ' + $rootScope.formData.kraData.APP_PER_ADD3;
					user_addr = user_addr.replace(/(^[\s]+|[\s]+$)/g, '');
					puser_addr = puser_addr.replace(/(^[\s]+|[\s]+$)/g, '');
					if ($rootScope.formData.fields.cAddress) {
						if ($rootScope.formData.fields.cAddress.toUpperCase() !== user_addr.toUpperCase() || $rootScope.formData.fields.cStateName.toUpperCase() !== $rootScope.formData.kraData.APP_COR_STATENAME.toUpperCase() || $rootScope.formData.fields.cDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_COR_DISTRICT.toUpperCase() ||
							$rootScope.formData.fields.cCity.toUpperCase() !== $rootScope.formData.kraData.APP_COR_CITY.toUpperCase()) {
							$rootScope.formData.IsKRAUpdate = 'Y';
						}
					}
					if ($rootScope.formData.fields.pAddress && !$rootScope.formData.fields.sameAddress) {
						if ($rootScope.formData.fields.pAddress.toUpperCase() !== puser_addr.toUpperCase() || $rootScope.formData.fields.pStateName.toUpperCase() !== $rootScope.formData.kraData.APP_PER_STATENAME.toUpperCase() || $rootScope.formData.fields.pDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_PER_DISTRICT.toUpperCase() ||
							$rootScope.formData.fields.pCity.toUpperCase() !== $rootScope.formData.kraData.APP_PER_CITY.toUpperCase()) {
							$rootScope.formData.IsKRAUpdate = 'Y';
						}
					}
				} else {
					$rootScope.formData.IsKRAUpdate = 'Y';
				}
			}
			//For Non KRA and KRA Update or Aadhaar Offline.
			if (localStorage.getItem('IsKRA') === false || localStorage.getItem('IsKRA') === 'false') {

				//if (localStorage.getItem('IsKRA') === 'true') {
				if ((localStorage.getItem('IsKRA') === true || localStorage.getItem('IsKRA') === 'true') && !$rootScope.formData.changeKRA) {
					$rootScope.formData.fields.cPin = $('#pin').val();
					$rootScope.formData.fields.cCity = $('#kCity').val();
					$rootScope.formData.fields.title = $('#kra_title').val();
				} else {
					$rootScope.formData.fields.cPin = $('#cPin_value').val();
					$rootScope.formData.fields.cCity = $('#city1_value').val();
					$rootScope.formData.fields.title = $('#ktitle').val();
				}
				// if ($rootScope.formData.fields.cPin == "" || $rootScope.formData.fields.cPin == null || $rootScope.formData.fields.cPin == undefined) {
				// 	$rootScope.formData.fields.cPin = $('#cPin_value').val();
				// }
				// if ($rootScope.formData.fields.cCity == "" || $rootScope.formData.fields.cCity == null || $rootScope.formData.fields.cCity == undefined) {
				// 	$rootScope.formData.fields.cCity = $('#city1_value').val();
				// }
				// if ($rootScope.formData.fields.sameAddress) {
				// 	$rootScope.formData.fields.pPin = $('#cPin_value').val();
				// }
			}
			$scope.addressSame = 0;
			if ($rootScope.formData.fields.sameAddress) {
				$scope.addressSame = 1;
				$rootScope.formData.fields.paddressType = $('#caddressType').val();
				$rootScope.formData.fields.pStateName = $rootScope.formData.fields.cStateName;
				$rootScope.formData.fields.pStateId = $rootScope.formData.fields.cStateId;
				$rootScope.formData.fields.pDistrict = $rootScope.formData.fields.cDistrict;
				$rootScope.formData.fields.pCity = $rootScope.formData.fields.cCity;
				($rootScope.formData.fields.pAddress) = ($rootScope.formData.fields.cAddress);
				$rootScope.formData.fields.pPin = $rootScope.formData.fields.cPin;
			} else {
				// $rootScope.formData.IsKRAUpdate = 'Y';
				// localStorage.setItem('IsKRA', false);
				$rootScope.formData.fields.paddressType = $('#pAddressType').val();
				$rootScope.formData.fields.pCity = $("#city2_value").val();
			}

			// check whether Aadhar Data is Updated or overwrite
			if (!angular.isUndefined($rootScope.formData.aadharOfflineData.firstName) && $rootScope.formData.aadharOfflineData.firstName != "") {
				if ($rootScope.formData.fields.citizen !== $rootScope.formData.aadharOfflineData.citizen || $rootScope.formData.fields.cAddress !== $rootScope.formData.aadharOfflineData.cAddress || $rootScope.formData.fields.cStateName !== $rootScope.formData.aadharOfflineData.cStateName || $rootScope.formData.fields.cDistrict !== $rootScope.formData.aadharOfflineData.cDistrict ||
					$rootScope.formData.fields.cCity !== $rootScope.formData.aadharOfflineData.cCity) {
					$rootScope.formData.IsAadharUpdate = 'Y';
				}
			}

			// if (!angular.isUndefined($rootScope.formData.kraData)) {
			// 	if($rootScope.formData.kraData.APP_COR_ADD1 && $rootScope.formData.kraData.APP_COR_ADD2 && $rootScope.formData.kraData.APP_COR_ADD3){
			// 		var kraAdrress = $rootScope.formData.kraData.APP_COR_ADD1 + ' ' + $rootScope.formData.kraData.APP_COR_ADD2 + ' ' + $rootScope.formData.kraData.APP_COR_ADD3;
			// 	}else{
			// 		var kraAdrress = "";
			// 	}
			// 	if (kraAdrress != $rootScope.formData.fields.cAddress) {
			// 		$rootScope.formData.IsKRAUpdate = "Y";
			// 	}else if ($('#pin').val != $rootScope.formData.kraData.APP_COR_PINCD) {
			// 		$rootScope.formData.IsKRAUpdate = "Y";
			// 	} else if ($rootScope.formData.kraData.APP_COR_CITY != $('#kCity').val()) {
			// 		$rootScope.formData.IsKRAUpdate = "Y";
			// 	} else {
			// 		$rootScope.formData.IsKRAUpdate = "N";
			// 	}
			// }


			var url = "DIYClientPersonalInfoProfile";

			if (!$rootScope.formData.fields.email) {
				$rootScope.formData.fields.email = localStorage.getItem('RxEmail');
			}

			if (!$rootScope.formData.fields.mobile) {
				$rootScope.formData.fields.mobile = localStorage.getItem('RxMobile');
			}
			if (localStorage.getItem('RxUIDVerified') == 'true') {
				$rootScope.formData.aadharAuthorize = 'Y';
			} else {
				$rootScope.formData.aadharAuthorize = 'N';
			}
			
			
			if ($rootScope.formData.IsKRAUpdatePer == 'Y') {
				$rootScope.formData.IsKRAUpdate ='Y';
			}
			else if ($rootScope.formData.IsKRAUpdatePer == 'N') {
				$rootScope.formData.IsKRAUpdate ='N';
			}

			if (localStorage.getItem('IsKRA') == 'true' || localStorage.getItem('IsKRA') == true) {
				$rootScope.formData.IsKRA = 'Y'
			} else {
				$rootScope.formData.IsKRA = 'N'
			}
			if (localStorage.getItem('IsKRAUpdate') == 'Y') {
				$rootScope.formData.IsKRAUpdate ='Y';
			}
			if ($rootScope.formData.IsKRAUpdate == 'Y') {
				$rootScope.formData.IsKRA = 'Y';
				localStorage.setItem('IsKRA', true);
			}
			
			if (localStorage.getItem('IsAadharVerified') == 'true') {
				$rootScope.formData.IsAadhar = 'Y'
			} else {
				$rootScope.formData.IsAadhar = 'N'
			}

			var sendData = {
				ObjCDIYClientProfile: {
					ClientInfoId: 1,
					Title: '',
					ClientPrefixID: $rootScope.formData.fields.title,
					FirstName: $rootScope.formData.fields.firstName,
					MiddleName: $rootScope.formData.fields.middleName,
					LastName: $rootScope.formData.fields.lastName,
					Mobile: $rootScope.formData.fields.mobile,
					Email: $rootScope.formData.fields.email,
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					CorrespondenceTypeID: $rootScope.formData.fields.cAddressType,
					CAddressLine1: ($rootScope.formData.fields.cAddress).substring(0, 30),
					CAddressLine2: ($rootScope.formData.fields.cAddress).substring(30, 60),
					CAddressLine3: ($rootScope.formData.fields.cAddress).substring(60, 90),
					CCity: $rootScope.formData.fields.cCity,
					CDistrict: $rootScope.formData.fields.cDistrict,
					CState: $rootScope.formData.fields.cStateName,
					CStateID: !angular.isUndefined($rootScope.formData.fields.cStateId) ? $rootScope.formData.fields.cStateId : 0,
					CCountry: 'INDIA',
					CPinCode: $rootScope.formData.fields.cPin,
					PermantTypeID: $rootScope.formData.fields.paddressType,
					PAddressLine1: ($rootScope.formData.fields.pAddress).substring(0, 30),
					PAddressLine2: ($rootScope.formData.fields.pAddress).substring(30, 60),
					PAddressLine3: ($rootScope.formData.fields.pAddress).substring(60, 90),
					PCity: $rootScope.formData.fields.pCity,
					PDistrict: $rootScope.formData.fields.pDistrict,
					PState: $rootScope.formData.fields.pStateName,
					PStateID: !angular.isUndefined($rootScope.formData.fields.pStateId) ? $rootScope.formData.fields.pStateId : 0,
					PCountry: 'INDIA',
					PPinCode: $rootScope.formData.fields.pPin,
					IsAadharUpdate: $rootScope.formData.IsAadharUpdate,
					IsKRAUpdate: $rootScope.formData.IsKRAUpdate,
					IsKRA: $rootScope.formData.IsKRA,
					IsAadhar: $rootScope.formData.IsAadhar,
					IsSamePermenantAddress: $scope.addressSame,
					BrowserType: $rootScope.formData.browserType,
					UID: $rootScope.formData.fields.aadharNumber,
					AadharAuthorisation: $rootScope.formData.aadharAuthorize,					
					IsDiy: true,
					EncryptToken : $rootScope.EncryptToken
				}
			};
			//console.log($rootScope.formData.fields);

			$rootScope.formData.apiLoading = true;
			var tokenParams = {
				'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
				'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
				'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
				'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
			}

			//serverService.apiTokenCall(url, sendData, tokenParams).success(function (response) {
			serverService.apiCall(url, sendData).success(function (response) {
				if(response.EncryptToken){
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
				}
				if (response.IsSuccess) {
					if ($rootScope.formData.IsKRAUpdate === 'Y') {
						localStorage.setItem('IsKRA', true);
					}
					if ($rootScope.formData.IsAadharUpdate === 'Y') {
						localStorage.setItem('IsAadhar', false);
					}
					$rootScope.secondCompleted = true;
					dataLayer.push({
						event: 'StageChange',
						attributes: {
							'level complete': '2',
							'Title': $rootScope.formData.fields.title,
							'FirstName': $rootScope.formData.fields.firstName,
							'MiddleName': $rootScope.formData.fields.middleName,
							'LastName': $rootScope.formData.fields.lastName,
							'CorrespondenceType': $("#cAddressType option:selected").text(),
							'CorrespondenceAddressLine1': ($rootScope.formData.fields.cAddress).substring(0, 30),
							'CorrespondenceAddressLine2': ($rootScope.formData.fields.cAddress).substring(30, 60),
							'CorrespondenceAddressLine3': ($rootScope.formData.fields.cAddress).substring(60, 90),
							'CorrespondenceCity': $rootScope.formData.fields.cCity,
							'CorrespondenceDistrict': $rootScope.formData.fields.cDistrict,
							'CorrespondenceState': $rootScope.formData.fields.cStateName,
							'CorrespondenceCountry': 'INDIA',
							'CorrespondencePinCode': $rootScope.formData.fields.cPin,
							'PermanentType': $("#pAddressType option:selected").text(),
							'PermanentAddressLine1': ($rootScope.formData.fields.pAddress).substring(0, 30),
							'PermanentPAddressLine2': ($rootScope.formData.fields.pAddress).substring(30, 60),
							'PermanentAddressLine3': ($rootScope.formData.fields.pAddress).substring(60, 90),
							'PermanentCity': $rootScope.formData.fields.pCity,
							'PermanentDistrict': $rootScope.formData.fields.pDistrict,
							'PermanentState': $rootScope.formData.fields.pStateName,
							'PermanentCountry': 'INDIA',
							'PermanentPinCode': $rootScope.formData.fields.pPin
						}
					});
					$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.middleName;
					$(".select").select2("close");
					$rootScope.formData.aadharhide = true;
					if (localStorage.getItem('IsAadhar') == 'true') {
						$rootScope.formData.IsAadharUpdate = "Y";
						$scope.userPhoto = "data:image/jpeg;base64," + $rootScope.formData.aadharData.APP_PHOTO;

						var s_url = "DIYImageUpload";
						var sendData = {
							ImageName: 'ClientPhoto',
							Image: $scope.userPhoto,
							DocumentType: '',
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							Extention: 'Image'
						};

						$rootScope.formData.apiLoading = true;
						serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
							//	serverService.apiCall(s_url, sendData).success(function (response) {

							$rootScope.formData.aadharData = JSON.parse(localStorage.getItem('aadharClientInfo'));
							$scope.aadharImage = "data:image/jpeg;base64," + $rootScope.formData.aadharData.AadharImagebase64;

							var s_url = "DIYImageUpload";
							var sendData = {
								ImageName: 'CorrespondenceAddress',
								Image: $scope.aadharImage,
								DocumentType: 111,
								ReferenceNumber: $rootScope.formData.ReferenceNumber,
								Extention: 'Image'
							};
							serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
								//	serverService.apiCall(s_url, sendData).success(function (response) {
								$state.go('personalDetails');
							});
						});

					} else {
						$state.go('personalDetails');
					}
				} else {
					$rootScope.formData.apiLoading = false;
					$('#connection').modal('show');
				}
			});

		}
	};
	
	$rootScope.$on("getAPI", function (evt, data) {
        if($rootScope.formData.threeinone){
			$rootScope.getAPI= false;
			$scope.getPersonalInfo();
		}
    });

	window.onbeforeunload = function () {
		var Address_Info = new Object();
		Address_Info.firstName = $rootScope.formData.fields.firstName;
		Address_Info.middleName = $rootScope.formData.fields.middleName;
		Address_Info.lastName = $rootScope.formData.fields.lastName;
		
		if (localStorage.getItem('IsKRA') === 'true' || localStorage.getItem('IsKRA') === true) {
			Address_Info.CorrespondenceTypeID = $("#KcAddressType").val();
			Address_Info.cPin = $('#pin').val();
			Address_Info.cCity = $('#kCity').val();
			Address_Info.title = $('#kra_title').val();
		} else {
			Address_Info.CorrespondenceTypeID = $("#cAddressType").val();
			Address_Info.cPin = $('#cPin_value').val();
			Address_Info.cCity = $('#city1_value').val();
			Address_Info.pPin = $('#pPin_value').val();
			Address_Info.pCity = $('#city2_value').val();
			Address_Info.title = $('#ktitle').val();
		}
		Address_Info.pPin = $('#pPin_value').val();
		Address_Info.pCity = $('#city2_value').val();
		Address_Info.cState = $rootScope.formData.fields.cStateName;
		Address_Info.cStateId = $rootScope.formData.fields.cStateId;
		Address_Info.cDistrict = $rootScope.formData.fields.cDistrict;
		Address_Info.cAddress = $rootScope.formData.fields.cAddress;
		Address_Info.sameAddress = $rootScope.formData.fields.sameAddress;
		Address_Info.pState = $rootScope.formData.fields.pStateName;
		Address_Info.pStateId = $rootScope.formData.fields.pStateId;
		Address_Info.pDistrict = $rootScope.formData.fields.pDistrict;
		Address_Info.pAddress = $rootScope.formData.fields.pAddress;
		var Address_Info_Post = JSON.stringify(Address_Info);
		Address_Info_Stage = "Address_Info_Stage" + "-" + localStorage.getItem("RxReferenceNumber");
		localStorage.setItem(Address_Info_Stage, Address_Info_Post);
		if ($rootScope.formData.fields.aadharNumber) {
			localStorage.setItem('RxUID', $rootScope.formData.fields.aadharNumber);
		}
	}

	$scope.modalPop = function (b) {
		if ($scope.aadharOTP) {
			setTimeout(function () {
				$('#oaadhar-number').focus();
			}, 100)
		}
	}
}
addressController.$inject = ['$scope', '$rootScope', '$state', 'serverService'];
mainApp.controller('addressController', addressController);
