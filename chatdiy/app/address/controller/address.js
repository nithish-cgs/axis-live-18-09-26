mainChatApp.controller('addressController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
			$rootScope.formData.stageInfo = '2';
			$rootScope.formData.getKraDetails = false;
			$rootScope.formData.unCheckSameAddress = false;
			$rootScope.formData.fields.mobileExtn = "+91";
			$scope.addressSame = 1;
			$scope.nameFreeze = true;
			$scope.lastnameFreeze = true;
			$scope.getProfileData = false;
			$scope.addshouldNotSame = false;
			$('#newaddresse').prop('checked', false);
			$('#newaddresse12').prop('checked', false);
			if ($rootScope.formData.aadharVerified) {
				sessionStorage.setItem('RxUIDVerified', true)
			}
			if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
				if (sessionStorage.getItem('AxNo') != null) {
					$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
					$rootScope.formData.ReferenceNumber = sessionStorage.getItem("RxReferenceNumber");
					$rootScope.getDIYStatus();
				} else {
					window.location.href = (serverService.getHome());
				}
			}
			$rootScope.formData.aadharSection = false;
			$rootScope.formData.apiLoading = false;
			if (!$rootScope.formData.fields.email) {
				if (sessionStorage.getItem('RxEmail')) {
					$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
				}
			}

			if (!$rootScope.formData.fields.mobile) {
				if (sessionStorage.getItem('RxMobile')) {
					$rootScope.formData.fields.mobile = sessionStorage.getItem('RxMobile');
				}
			}

			if (sessionStorage.getItem('IsKRAUpdate')) {
				if (sessionStorage.getItem('IsKRAUpdate') == 'Y') {
					$rootScope.formData.changeKRA = true;
					$rootScope.formData.changeCKYC = true;
				}
			}

			if (sessionStorage.getItem('IsCKYCUpdate')) {
				if (sessionStorage.getItem('IsCKYCUpdate') == 'Y') {
					$rootScope.formData.changeCKYC = true;
				}
			}

			if (sessionStorage.getItem('IsKRA') === 'true' || sessionStorage.getItem('IsKRA') === true) {
				$rootScope.formData.KRA = true;
			}

			if (sessionStorage.getItem('IsCKYC') === 'true' || sessionStorage.getItem('IsCKYC') === true) {
				$rootScope.formData.CKYC = true;
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
					$rootScope.formData.city2_valueError = false;
					$scope.padr2Error = false;
					$scope.pareaadd1Error = false;
					$scope.pPin_valueError = false;
					$scope.city2_valueError = false;
					$scope.city1_lengthError = false;
					$scope.city2_lengthError = false;
					if (sessionStorage.getItem('IsKRA') === 'true' || sessionStorage.getItem('IsKRA') === true) {
						$rootScope.formData.KRA = true;
						if ($rootScope.formData.KRA && !$rootScope.formData.changeKRA) {
							$rootScope.formData.kraData.APP_PER_ADD1 = $rootScope.formData.kraData.APP_COR_ADD1;
							$rootScope.formData.IsKRAUpdatePer = 'N';
							$rootScope.formData.IsKRAUpdate = 'N';
							// sessionStorage.setItem('IsKRAUpdate', 'N');
							$scope.kraClientData();
						}
					} else if (sessionStorage.getItem('IsCKYC') === 'true' || sessionStorage.getItem('IsCKYC') === true) {
						$rootScope.formData.CKYC = true;
						if ($rootScope.formData.CKYC && !$rootScope.formData.changeCKYC) {
							$rootScope.formData.kraData.APP_PER_ADD1 = $rootScope.formData.kraData.APP_COR_ADD1;
							$rootScope.formData.IsCKYCUpdatePer = 'N';
							$rootScope.formData.IsCKYCUpdate = 'N';
							// sessionStorage.setItem('IsCKYCUpdate', 'N');
							$scope.CkyCClientData();
						}

					}
					$scope.$apply();
				}).on("ifUnchecked", function () {

					$rootScope.formData.fields.sameAddress = false;
					$rootScope.formData.unCheckSameAddress = true;
					$rootScope.formData.fields.pAddressType = "1003";
					$rootScope.formData.fields.pAddress1 = '';
					$rootScope.formData.fields.pAddress2 = '';
					$rootScope.formData.fields.pAddress3 = '';
					$rootScope.formData.fields.pStateName = '';
					$rootScope.formData.fields.pDistrict = '';
					$rootScope.formData.kraPerAdr = false;
					$scope.pAddressFreeze = false;
					setTimeout(function () {
						$("#pAddressType option:contains(" + $rootScope.formData.fields.pAddressType + ")").prop('selected', true);
						$(".select").select2();
						$scope.pselectShow = true;
						$scope.padr2Error = false;
						$scope.pareaadd1Error = false;
						$scope.city2_valueError = false;
						$scope.pPin_valueError = false;
						$scope.city1_lengthError = false;
						$scope.city2_lengthError = false;
					}, 100);
					$scope.$apply();
				});

				$('.newaddressarea label input[type="checkbox"]').on("ifChecked", function () {
					if ($rootScope.formData.threeinone) {
						$scope.getPersonalInfo();
					} else {

						if ($rootScope.formData.aadhaarProfile) {
							$scope.changeAadhaar = true;
							$rootScope.formData.fields.changeAddress1 = true;
							setTimeout(function () {
								$scope.checkradioinit()
							}, 10)
							$scope.$apply();
						} else {
							//$('#oldaddress').prop('disabled', false);
							$('#NonKRAVerified').modal({
								backdrop: 'static',
								keyboard: false
							}) // offline Aadhar popup Screen
							$scope.$apply();
						}
					}
				}).on("ifUnchecked", function () {
					if ($rootScope.webfinacle && !$rootScope.formData.changeCKYC) {
						if (sessionStorage.getItem('IsKRA') === true || sessionStorage.getItem('IsKRA') === 'true') {
							$rootScope.formData.KRA = true;
						}else{
							$rootScope.formData.KRA = false;
						}
						if(sessionStorage.getItem('finData')){
							$scope.getFinData();
						}else{
							$scope.getPersonalInfo();
						}
						setTimeout(function(){
							$('#newaddresse').iCheck('uncheck')
							$scope.checkradioinit();
							$scope.$apply();
						},100)
					} else {
						if ($rootScope.formData.threeinone) {
							$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
							$rootScope.formData.KRA = true;
							$scope.kraClientData();
						} else {
							if ((!$rootScope.formData.CKYC || !$rootScope.formData.KRA) && (sessionStorage.getItem('aadhaarData') && !$scope.getProfileData)) {
								if (!$rootScope.formData.aadhaarData.length) {
									$rootScope.formData.aadhaarData = JSON.parse(sessionStorage.getItem('aadhaarData'));
								}
								$rootScope.formData.aadhaarProfile = true;
								$scope.changeAadhaar = false;
								$scope.getAadhaarData();
								return false;
							}
						}
					}
				});
			}
			setTimeout(function () {
				$scope.checkradioinit();
				$rootScope.formData.referenceGenerated = true;
				if ($rootScope.formData.referenceGenerated) {
					if (sessionStorage.getItem('utm_campaign')) {
						utm_campaign = sessionStorage.getItem('utm_campaign');
						utm_campaign = utm_campaign.toLowerCase();
						sessionStorage.removeItem('utm_campaign');
					}
					$scope.iframePixel = "https://tracking.icubeswire.co/aff_a?offer_id=1583&adv_sub1=" + $rootScope.formData.ReferenceNumber + "&adv_sub2=";
					if (utm_campaign) {
						if (utm_campaign.includes('quantifi')) {
							$scope.quantifi = true;
						}
						if (utm_campaign.includes('bmedia')) {
							$scope.bmedia = true;
						}
						if (utm_campaign.includes('opicle')) {
							$scope.opicle = true;
						}
						if (utm_campaign.includes('dangleads')) {
							$scope.dangleads = true;
						}
						if (utm_campaign.includes('admitad')) {
							var a = $rootScope.formData.ReferenceNumber.split('WB');
							$scope.clickid = a[1];
							$scope.opicle = true;
						}
						if (utm_campaign.includes('ad2click')) {
							$scope.ad2click = "https://trk.prickly.in/pixel?adid=5faa3718f2916f236b2d5018&txn_id=" + $rootScope.formData.ReferenceNumber;
						}
						if (utm_campaign.includes('mrndigital')) {
							$scope.mrnDigital = true;
						}
						if (utm_campaign.includes('seventynine')) {
							$scope.seventynine = true;
						}
						if (utm_campaign.includes('adsclues')) {
							$scope.adsclues = true;
						}
						if (utm_campaign.includes('iqweb')) {
							$scope.iqweb = true;
						}
						if (utm_campaign.includes('optimedia')) {
							$scope.optimedia = true;
						}
					}
				}
			}, 500)

			$scope.clearErrorMSG = function () {
				$scope.addshouldNotSame = false;
				$scope.addshouldNotSameP = false;
			}

			$scope.CkyCClientData = function () {
				$rootScope.formData.ckycData = JSON.parse(sessionStorage.getItem('CKYCResponseData'));
				if ($rootScope.formData.ckycData != undefined && $rootScope.formData.ckycData != '' && $rootScope.formData.ckycData != null && !$rootScope.formData.changeCKYC) {
					$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('CKYCResponseData'));
					var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.ckycData.CKYCPerAddPin;
					serverService.getApi(p_url).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {
							$rootScope.formData.fields.pStateId = response.PincodeList[0].StateId;
							$rootScope.formData.fields.pStateName = response.PincodeList[0].StateName;
							$rootScope.formData.kraData.APP_PER_STATENAME = response.PincodeList[0].StateName;
							$rootScope.formData.kraData.APP_PER_DISTRICT = response.PincodeList[0].District;
						} else {
							sessionStorage.setItem("CKYC", false);
							$rootScope.formData.CKYC = false;
							$rootScope.formData.changeCKYC = false;
							$rootScope.formData.showUIDAIdetails = true;
							if ($rootScope.formData.isg) {
								$rootScope.formData.isgProfileSkip = true;
								$rootScope.isgCKYC();
							} else {
								$state.go('address', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						}
					});
					var c_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.ckycData.CKYCCorAddPin;
					serverService.getApi(c_url).then(function (a) {
						var response = a.data;
						if (response.IsSuccess) {
							$rootScope.formData.fields.cStateId = response.PincodeList[0].StateId;
							$rootScope.formData.fields.cStateName = response.PincodeList[0].StateName;
							$rootScope.formData.kraData.APP_COR_STATENAME = response.PincodeList[0].StateName;
							$rootScope.formData.kraData.APP_COR_DISTRICT = response.PincodeList[0].District;
						}
					});
					$('#oldaddress').prop('disabled', true);
					if ($rootScope.formData.ckycData.CKYCCorAdd1 == $rootScope.formData.ckycData.CKYCPerAdd1) {
						$rootScope.formData.getSameAddress = true;
						$rootScope.formData.fields.sameAddress = true;
						$('#oldaddress').prop('checked', true);
					} else {
						$rootScope.formData.getSameAddress = false;
						$rootScope.formData.fields.sameAddress = false;
						$rootScope.formData.unCheckSameAddress = true;
						setTimeout(function () {
							$('#oldaddress').prop('checked', false);
							if ($rootScope.formData.threeinone) {
								$('#oldaddress').prop('disabled', true);
							}
							$('#oldaddress').iCheck('update');
							$scope.$apply();
						}, 100);

						var padr1 = '';
						if ($rootScope.formData.ckycData.CKYCPerAdd1) {
							$rootScope.formData.ckycPerAdr = true;
							padr1 = $rootScope.formData.ckycData.CKYCPerAdd1;
						} else {
							if ($rootScope.formData.ckycData.CKYCCorAdd1) {
								padr1 = $rootScope.formData.ckycData.CKYCCorAdd1;
							} else {
								padr1 = '';
							}
						}
						var padr2 = '';
						if ($rootScope.formData.ckycData.CKYCPerAdd2) {
							padr2 = $rootScope.formData.ckycData.CKYCPerAdd2;
						} else {
							if ($rootScope.formData.ckycData.CKYCCorAdd2) {
								padr2 = $rootScope.formData.ckycData.CKYCCorAdd2;
							} else {
								padr2 = '';
							}
						}
						var padr3 = '';
						if ($rootScope.formData.ckycData.CKYCPerAdd3) {
							padr3 = $rootScope.formData.ckycData.CKYCPerAdd3;
						} else {
							if ($rootScope.formData.ckycData.CKYCCorAdd3) {
								padr3 = $rootScope.formData.ckycData.CKYCCorAdd3;
							} else {
								padr3 = '';
							}
						}
						if ($rootScope.formData.ckycData.CKYCPerAdd1 === null || $rootScope.formData.ckycData.CKYCPerAdd1 === "") {
							$rootScope.formData.ckycData.CKYCPerAdd1 = "";
						}
						if ($rootScope.formData.ckycData.CKYCPerAdd2 === null || $rootScope.formData.ckycData.CKYCPerAdd2 === "") {
							$rootScope.formData.ckycData.CKYCPerAdd2 = "";
						}
						if ($rootScope.formData.ckycData.CKYCPerAdd3 === null || $rootScope.formData.ckycData.CKYCPerAdd3 === "") {
							$rootScope.formData.ckycData.CKYCPerAdd3 = "";
						}
						if ($rootScope.formData.ckycData.CKYCPerAdd1.length > 30) {
							var addL = $rootScope.formData.ckycData.CKYCPerAdd1;
							var splitedAddress = addL.match(/.{0,30}/g);
							$rootScope.formData.fields.pAddress1 = splitedAddress[0];
							var add2 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCPerAdd2;
							add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add2.length > 30) {
								var addL2 = add2;
								var splitedAddress = addL2.match(/.{0,30}/g);
								$rootScope.formData.fields.pAddress2 = splitedAddress[0];
								var add3 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCPerAdd3;
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								if (add3.length > 30) {
									var addL3 = add3;
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = add3;
								}
							} else {
								add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.pAddress2 = add2;
								if ($rootScope.formData.ckycData.CKYCPerAdd3.length > 30) {
									var addL3 = $rootScope.formData.ckycData.CKYCPerAdd3;
									addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									$rootScope.formData.ckycData.CKYCPerAdd3 = $rootScope.formData.ckycData.CKYCPerAdd3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = $rootScope.formData.ckycData.CKYCPerAdd3;
								}
							}
						} else {
							$rootScope.formData.fields.pAddress1 = $rootScope.formData.ckycData.CKYCPerAdd1;
							if ($rootScope.formData.ckycData.CKYCPerAdd2.length > 30) {
								var addL2 = $rootScope.formData.ckycData.CKYCPerAdd2;
								addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL2.match(/.{0,30}/g);
								$rootScope.formData.fields.pAddress2 = splitedAddress[0];
								var add3 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCPerAdd3;
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								if (add3.length > 30) {
									var addL3 = add3;
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = add3;
								}
							} else {
								$rootScope.formData.ckycData.CKYCPerAdd2 = $rootScope.formData.ckycData.CKYCPerAdd2.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.pAddress2 = $rootScope.formData.ckycData.CKYCPerAdd2;
								if ($rootScope.formData.ckycData.CKYCPerAdd3.length > 30) {
									var addL3 = $rootScope.formData.ckycData.CKYCPerAdd3;
									addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									$rootScope.formData.ckycData.CKYCPerAdd3 = $rootScope.formData.ckycData.CKYCPerAdd3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = $rootScope.formData.ckycData.CKYCPerAdd3;
								}
							}
						}
						$rootScope.formData.fields.pDistrict = $rootScope.formData.ckycData.CKYCPerAddDistrict;
						$rootScope.formData.fields.pPin = $rootScope.formData.ckycData.CKYCPerAddPin;
						$rootScope.formData.fields.pCity = $rootScope.formData.ckycData.CKYCPerAddCity;

						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pAddress1) {
							$scope.pAddressFreeze = true;
						} else {
							$scope.pAddressFreeze = false;
						}
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pPin) {
							$('#pPin_value').prop('disabled', true);
						} else {
							$('#pPin_value').prop('disabled', false);
						}
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pCity) {
							$('#city2_value').prop('disabled', true);
						} else {
							$('#city2_value').prop('disabled', false);
						}
						setTimeout(function () {
							$('#pPin_value').val($rootScope.formData.fields.pPin);
							$('#city2_value').val($rootScope.formData.fields.pCity);
							$('#pPin_value').prop('disabled', true);
							$('#city2_value').prop('disabled', true);
						}, 500);
					}
					if ($rootScope.formData.fields.aadharNumber) {
						//	$scope.uidFreeze = true;
					}
					if ($rootScope.formData.ckycData) {
						/*if ($rootScope.formData.ckycData.CKYCFirstName) {
						$rootScope.formData.fields.firstName = $rootScope.formData.ckycData.CKYCFirstName;
						} else {
						$rootScope.formData.fields.firstName = '';
						if (sessionStorage.getItem("CFirstname")) {
						$rootScope.formData.fields.firstName = sessionStorage.getItem("CFirstname");
						}
						}
						if ($rootScope.formData.ckycData.CKYCMiddleName) {
						$rootScope.formData.fields.middleName = $rootScope.formData.ckycData.CKYCMiddleName;
						} else {
						$rootScope.formData.fields.middleName = '';
						if (sessionStorage.getItem("CMiddlename")) {
						$rootScope.formData.fields.middleName = sessionStorage.getItem("CMiddlename");
						}
						}

						if ($rootScope.formData.ckycData.CKYCLastName) {
						$rootScope.formData.fields.lastName = $rootScope.formData.ckycData.CKYCLastName;
						} else {
						$rootScope.formData.fields.lastName = '';
						if (sessionStorage.getItem("CLastname")) {
						$rootScope.formData.fields.lastName = sessionStorage.getItem("CLastname");
						}
						}*/
					} else {
						var Address_Info_Stage = '';
						Address_Info_Stage = "Address_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
						if (JSON.parse(sessionStorage.getItem(Address_Info_Stage)) != null) {
							var Address_Info = JSON.parse(sessionStorage.getItem(Address_Info_Stage));
							if(!$rootScope.formData.fields.firstName &&  Address_Info.firstName){
							$rootScope.formData.fields.firstName = Address_Info.firstName;
							}
							if(!$rootScope.formData.fields.middleName &&  Address_Info.middleName){
							$rootScope.formData.fields.middleName = (Address_Info.middleName != null) ? Address_Info.middleName : '';
							}
							if(!$rootScope.formData.fields.lastName &&  Address_Info.lastName){
							$rootScope.formData.fields.lastName = Address_Info.lastName;
							}
						}
					}
					var adr1 = '';
					if ($rootScope.formData.ckycData.CKYCCorAdd1) {
						adr1 = $rootScope.formData.ckycData.CKYCCorAdd1;
					}

					var adr2 = '';
					if ($rootScope.formData.ckycData.CKYCCorAdd2) {
						adr2 = $rootScope.formData.ckycData.CKYCCorAdd2;
					}

					var adr3 = '';
					if ($rootScope.formData.ckycData.CKYCCorAdd3) {
						adr3 = $rootScope.formData.ckycData.CKYCCorAdd3;
					}
					if ($rootScope.formData.ckycData.CKYCCorAdd1 === null || $rootScope.formData.ckycData.CKYCCorAdd1 === "") {
						$rootScope.formData.ckycData.CKYCCorAdd1 = "";
					}
					if ($rootScope.formData.ckycData.CKYCCorAdd2 === null || $rootScope.formData.ckycData.CKYCCorAdd2 === "") {
						$rootScope.formData.ckycData.CKYCCorAdd2 = "";
					}
					if ($rootScope.formData.ckycData.CKYCCorAdd3 === null || $rootScope.formData.ckycData.CKYCCorAdd3 === "") {
						$rootScope.formData.ckycData.CKYCCorAdd3 = "";
					}
					if ($rootScope.formData.ckycData.CKYCCorAdd1.length > 30) {
						var addL = "";
						var add2 = "";
						var addL2 = "";
						var add3 = "";
						var addL3 = "";
						addL = $rootScope.formData.ckycData.CKYCCorAdd1;
						var splitedAddress = addL.match(/.{1,30}/g);
						$rootScope.formData.fields.cAddress1 = splitedAddress[0];
						add2 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCCorAdd2;
						add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
						if (add2.length > 30) {
							addL2 = add2;
							var splitedAddress = addL2.match(/.{0,30}/g);
							$rootScope.formData.fields.cAddress2 = splitedAddress[0];
							add3 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCCorAdd3;
							add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add3.length > 30) {
								addL3 = add3;
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = add3;
							}
						} else {
							add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
							$rootScope.formData.fields.cAddress2 = add2;
							if ($rootScope.formData.ckycData.CKYCCorAdd3.length > 30) {
								var addL3 = $rootScope.formData.ckycData.CKYCCorAdd3;
								addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								$rootScope.formData.ckycData.CKYCCorAdd3 = $rootScope.formData.ckycData.CKYCCorAdd3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = $rootScope.formData.ckycData.CKYCCorAdd3;
							}
						}
					} else {
						$rootScope.formData.fields.cAddress1 = $rootScope.formData.ckycData.CKYCCorAdd1;
						if ($rootScope.formData.ckycData.CKYCCorAdd2.length > 30) {
							var addL2 = $rootScope.formData.ckycData.CKYCCorAdd2;
							addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
							var splitedAddress = addL2.match(/.{0,30}/g);
							$rootScope.formData.fields.cAddress2 = splitedAddress[0];
							var add3 = splitedAddress[1] + $rootScope.formData.ckycData.CKYCCorAdd3;
							add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add3.length > 30) {
								var addL3 = add3;
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = add3;
							}
						} else {
							$rootScope.formData.ckycData.CKYCCorAdd2 = $rootScope.formData.ckycData.CKYCCorAdd2.replace(/[^a-zA-Z ]/g, "");
							$rootScope.formData.fields.cAddress2 = $rootScope.formData.ckycData.CKYCCorAdd2;
							if ($rootScope.formData.ckycData.CKYCCorAdd3.length > 30) {
								var addL3 = $rootScope.formData.ckycData.CKYCCorAdd3;
								addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								$rootScope.formData.ckycData.CKYCCorAdd3 = $rootScope.formData.ckycData.CKYCCorAdd3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = $rootScope.formData.ckycData.CKYCCorAdd3;
							}
						}
					}
					$rootScope.formData.fields.cDistrict = $rootScope.formData.ckycData.CKYCCorAddDistrict;
					$rootScope.formData.fields.cCity = $rootScope.formData.ckycData.CKYCCorAddCity;
					$rootScope.formData.fields.cPin = $rootScope.formData.ckycData.CKYCCorAddPin;
					$rootScope.formData.fields.cAddressType = '1003';
					$rootScope.formData.cdValid = true;
					setTimeout(function () {
						$('#city1_value').val($rootScope.formData.fields.cCity);
						$('#cPin_value').val($rootScope.formData.fields.cPin);
						$('#ktitle').val($rootScope.formData.fields.title);
						$("#KcAddressType option:contains(" + $rootScope.formData.fields.cAddressType + ")").prop('selected', true);
					}, 500)
					if ($rootScope.formData.fields.cCity != null && !$rootScope.formData.CKYC) {
						/*setTimeout(function () {
						$('#city1_value').val($rootScope.formData.fields.cCity);
						$('#cPin_value').val($rootScope.formData.fields.cPin);
						$('#ktitle').val($rootScope.formData.fields.title);
						}, 500)*/
					} else if ($rootScope.formData.fields.cCity != null && $rootScope.formData.CKYC) {
						setTimeout(function () {
							$('#kCity').val($rootScope.formData.fields.cCity);
							$('#pin').val($rootScope.formData.fields.cPin);
						}, 500)
					}
					$rootScope.formData.pdValid = true;
					if ($rootScope.formData.ckycData.CKYCGender == 'M') {
						$rootScope.formData.fields.title = 'MR'
					} else if ($rootScope.formData.ckycData.CKYCGender == 'F' && $rootScope.formData.ckycData.CKYCMaritalStatus == 'S') {
						$rootScope.formData.fields.title = 'MISS'
					} else if ($rootScope.formData.ckycData.CKYCGender == 'F' && ($rootScope.formData.ckycData.CKYCMaritalStatus == '' || $rootScope.formData.ckycData.CKYCMaritalStatus == null)) {
						$rootScope.formData.fields.title = 'MS'
					} else if ($rootScope.formData.ckycData.CKYCGender == 'F') {
						$rootScope.formData.fields.title = 'MRS'
					}
					$("#kra_title").val($rootScope.formData.fields.title);
					setTimeout(function () {
						$('#oldaddress').prop('disabled', true);
						$('#oldaddress').iCheck('update');
						$(".select").select2();
					}, 500)

					$scope.$apply();
				}
			}

			$scope.kraClientData = function () {

				if ($rootScope.formData.kraData != undefined && $rootScope.formData.kraData != '' && $rootScope.formData.kraData != null) {
					if ($rootScope.formData.kraData.APP_COR_ADD1 == $rootScope.formData.kraData.APP_PER_ADD1) {
						$rootScope.formData.getSameAddress = true;
						$rootScope.formData.fields.sameAddress = true;
						$('#oldaddress').prop('checked', true);
						$('#oldaddress').prop('disabled', true);
						$('#oldaddress').iCheck('update');
					} else {
						$rootScope.formData.getSameAddress = false;
						$rootScope.formData.fields.sameAddress = false;
						$rootScope.formData.unCheckSameAddress = true;
						setTimeout(function () {
							$('#oldaddress').prop('checked', false);
							$('#oldaddress').prop('disabled', true);
							if ($rootScope.formData.threeinone) {}
							$('#oldaddress').iCheck('update');
							$scope.$apply();
						}, 100);
						var padr1 = '';
						if ($rootScope.formData.kraData.APP_PER_ADD1) {
							$rootScope.formData.kraPerAdr = true;
							padr1 = $rootScope.formData.kraData.APP_PER_ADD1;
						} else {
							if (adr1) {
								padr1 = adr1
							} else {
								padr1 = '';
							}
						}

						var padr2 = '';
						if ($rootScope.formData.kraData.APP_PER_ADD2) {
							padr2 = $rootScope.formData.kraData.APP_PER_ADD2;
						} else {
							padr2 = adr2
								if (adr2) {
									padr2 = adr2;
								} else {
									padr2 = '';
								}
						}

						var padr3 = '';
						if ($rootScope.formData.kraData.APP_PER_ADD3) {
							padr3 = $rootScope.formData.kraData.APP_PER_ADD3;
						} else {
							if (adr3) {
								padr3 = adr3;
							} else {
								padr3 = '';
							}
						}
						$('#oldaddress').prop('disabled', true);
						if ($rootScope.formData.kraData.APP_PER_ADD1 === null || $rootScope.formData.kraData.APP_PER_ADD1 === "") {
							$rootScope.formData.kraData.APP_PER_ADD1 = "";
						}
						if ($rootScope.formData.kraData.APP_PER_ADD2 === null || $rootScope.formData.kraData.APP_PER_ADD2 === "") {
							$rootScope.formData.kraData.APP_PER_ADD2 = "";
						}
						if ($rootScope.formData.kraData.APP_PER_ADD3 === null || $rootScope.formData.kraData.APP_PER_ADD3 === "") {
							$rootScope.formData.kraData.APP_PER_ADD3 = "";
						}
						if ($rootScope.formData.kraData.APP_PER_ADD1.length > 30) {
							var addL = $rootScope.formData.kraData.APP_PER_ADD1;
							var splitedAddress = addL.match(/.{0,30}/g);
							$rootScope.formData.fields.pAddress1 = splitedAddress[0];
							var add2 = splitedAddress[1] + $rootScope.formData.kraData.APP_PER_ADD2;
							add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add2.length > 30) {
								var addL2 = add2;
								var splitedAddress = addL2.match(/.{0,30}/g);
								$rootScope.formData.fields.pAddress2 = splitedAddress[0];
								var add3 = splitedAddress[1] + $rootScope.formData.kraData.APP_PER_ADD3;
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								if (add3.length > 30) {
									var addL3 = add3;
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = add3;
								}
							} else {
								add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.pAddress2 = add2;
								if ($rootScope.formData.kraData.APP_PER_ADD3.length > 30) {
									var addL3 = $rootScope.formData.kraData.APP_PER_ADD3;
									addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									$rootScope.formData.kraData.APP_PER_ADD3 = $rootScope.formData.kraData.APP_PER_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = $rootScope.formData.kraData.APP_PER_ADD3;
								}
							}
						} else {
							$rootScope.formData.fields.pAddress1 = $rootScope.formData.kraData.APP_PER_ADD1;
							if ($rootScope.formData.kraData.APP_PER_ADD2.length > 30) {
								var addL2 = $rootScope.formData.kraData.APP_PER_ADD2;
								addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL2.match(/.{0,30}/g);
								$rootScope.formData.fields.pAddress2 = splitedAddress[0];
								var add3 = splitedAddress[1] + $rootScope.formData.kraData.APP_PER_ADD3;
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								if (add3.length > 30) {
									var addL3 = add3;
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = add3;
								}
							} else {
								$rootScope.formData.kraData.APP_PER_ADD2 = $rootScope.formData.kraData.APP_PER_ADD2.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.pAddress2 = $rootScope.formData.kraData.APP_PER_ADD2;
								if ($rootScope.formData.kraData.APP_PER_ADD3.length > 30) {
									var addL3 = $rootScope.formData.kraData.APP_PER_ADD3;
									addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
									var splitedAddress = addL3.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress3 = splitedAddress[0];
								} else {
									$rootScope.formData.kraData.APP_PER_ADD3 = $rootScope.formData.kraData.APP_PER_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
									$rootScope.formData.fields.pAddress3 = $rootScope.formData.kraData.APP_PER_ADD3;
								}
							}
						}
						$rootScope.formData.fields.pStateName = $rootScope.formData.kraData.APP_PER_STATENAME;
						$rootScope.formData.fields.pStateId = $rootScope.formData.kraData.APP_PER_STATEID;
						$rootScope.formData.fields.pDistrict = $rootScope.formData.kraData.APP_PER_DISTRICT;
						$rootScope.formData.fields.pPin = $rootScope.formData.kraData.APP_PER_PINCD;
						if (!$rootScope.formData.kraData.APP_PER_CITY) {
							$rootScope.formData.kraData.APP_PER_CITY = $rootScope.formData.kraData.APP_PER_DISTRICT;
						}
						$rootScope.formData.fields.pCity = $rootScope.formData.kraData.APP_PER_CITY;
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pAddress1) {
							$scope.pAddressFreeze = true;
						} else {
							$scope.pAddressFreeze = false;
						}
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pPin) {
							$('#pPin_value').prop('disabled', true);
						} else {
							$('#pPin_value').prop('disabled', false);
						}
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pCity) {
							$('#city2_value').prop('disabled', true);
						} else {
							$('#city2_value').prop('disabled', false);
						}
						setTimeout(function () {
							$('#pPin_value').val($rootScope.formData.fields.pPin);
							$('#city2_value').val($rootScope.formData.fields.pCity);
							$('#pPin_value').prop('disabled', true);
							$('#city2_value').prop('disabled', true);
						}, 500);
					}
					if ($rootScope.formData.fields.aadharNumber) {
						$scope.uidFreeze = true;
					}
					if ($rootScope.formData.kraData) {
					
					} else {
						var Address_Info_Stage = '';
						Address_Info_Stage = "Address_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
						if (JSON.parse(sessionStorage.getItem(Address_Info_Stage)) != null) {
							var Address_Info = JSON.parse(sessionStorage.getItem(Address_Info_Stage));
							if(!$rootScope.formData.fields.firstName &&  Address_Info.firstName){
							$rootScope.formData.fields.firstName = Address_Info.firstName;
							}
							if(!$rootScope.formData.fields.middleName &&  Address_Info.middleName){
							$rootScope.formData.fields.middleName = (Address_Info.middleName != null) ? Address_Info.middleName : '';
							}
							if(!$rootScope.formData.fields.lastName &&  Address_Info.lastName){
							$rootScope.formData.fields.lastName = Address_Info.lastName;
							}
						}
					}
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
					if ($rootScope.formData.kraData.APP_COR_ADD1 === null || $rootScope.formData.kraData.APP_COR_ADD1 === "") {
						$rootScope.formData.kraData.APP_COR_ADD1 = "";
					}
					if ($rootScope.formData.kraData.APP_COR_ADD2 === null || $rootScope.formData.kraData.APP_COR_ADD2 === "") {
						$rootScope.formData.kraData.APP_COR_ADD2 = "";
					}
					if ($rootScope.formData.kraData.APP_COR_ADD3 === null || $rootScope.formData.kraData.APP_COR_ADD3 === "") {
						$rootScope.formData.kraData.APP_COR_ADD3 = "";
					}
					if ($rootScope.formData.kraData.APP_COR_ADD1.length > 30) {
						var addL = "";
						var add2 = "";
						var addL2 = "";
						var add3 = "";
						var addL3 = "";
						addL = $rootScope.formData.kraData.APP_COR_ADD1;
						var splitedAddress = addL.match(/.{1,30}/g);
						$rootScope.formData.fields.cAddress1 = splitedAddress[0];
						add2 = splitedAddress[1] + $rootScope.formData.kraData.APP_COR_ADD2;
						add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
						if (add2.length > 30) {
							addL2 = add2;
							var splitedAddress = addL2.match(/.{0,30}/g);
							$rootScope.formData.fields.cAddress2 = splitedAddress[0];
							add3 = splitedAddress[1] + $rootScope.formData.kraData.APP_COR_ADD3;
							add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add3.length > 30) {
								addL3 = add3;
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = add3;
							}
						} else {
							add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
							$rootScope.formData.fields.cAddress2 = add2;
							if ($rootScope.formData.kraData.APP_COR_ADD3.length > 30) {
								var addL3 = $rootScope.formData.kraData.APP_COR_ADD3;
								addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								$rootScope.formData.kraData.APP_COR_ADD3 = $rootScope.formData.kraData.APP_COR_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = $rootScope.formData.kraData.APP_COR_ADD3;
							}
						}
					} else {
						$rootScope.formData.fields.cAddress1 = $rootScope.formData.kraData.APP_COR_ADD1;
						if ($rootScope.formData.kraData.APP_COR_ADD2.length > 30) {
							var addL2 = $rootScope.formData.kraData.APP_COR_ADD2;
							addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
							var splitedAddress = addL2.match(/.{0,30}/g);
							$rootScope.formData.fields.cAddress2 = splitedAddress[0];
							var add3 = splitedAddress[1] + $rootScope.formData.kraData.APP_COR_ADD3;
							add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
							if (add3.length > 30) {
								var addL3 = add3;
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = add3;
							}
						} else {
							$rootScope.formData.kraData.APP_COR_ADD2 = $rootScope.formData.kraData.APP_COR_ADD2.replace(/[^a-zA-Z ]/g, "");
							$rootScope.formData.fields.cAddress2 = $rootScope.formData.kraData.APP_COR_ADD2;
							if ($rootScope.formData.kraData.APP_COR_ADD3.length > 30) {
								var addL3 = $rootScope.formData.kraData.APP_COR_ADD3;
								addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
								var splitedAddress = addL3.match(/.{0,30}/g);
								$rootScope.formData.fields.cAddress3 = splitedAddress[0];
							} else {
								$rootScope.formData.kraData.APP_COR_ADD3 = $rootScope.formData.kraData.APP_COR_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
								$rootScope.formData.fields.cAddress3 = $rootScope.formData.kraData.APP_COR_ADD3;
							}
						}
					}
					$rootScope.formData.fields.cStateName = $rootScope.formData.kraData.APP_COR_STATENAME;
					$rootScope.formData.fields.cStateId = $rootScope.formData.kraData.APP_COR_STATE;
					$rootScope.formData.fields.cDistrict = $rootScope.formData.kraData.APP_COR_DISTRICT;
					if (!$rootScope.formData.kraData.APP_COR_CITY) {
						$rootScope.formData.kraData.APP_COR_CITY = $rootScope.formData.kraData.APP_COR_DISTRICT;
					}
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

			$scope.getFinData = function () {
				$scope.finData = JSON.parse(sessionStorage.getItem('finData'));
				
				if ($scope.finData.basicInfo[0].CKycReferenceNumber) {
					$rootScope.ckycRefNoIB = true;
					$rootScope.formData.CKYC = true;
					$rootScope.formData.IsCKYC = 'Y';
				}
				
				$scope.finDataShow = true;
				$rootScope.formData.fields.title = $scope.finData.basicInfo[0].Title;
				$rootScope.formData.fields.cAddress1 = $scope.finData.addressInfo[0].PermanentAddress1;
				$rootScope.formData.fields.cAddress2 = $scope.finData.addressInfo[0].PermanentAddress2;
				if ($scope.finData.addressInfo[0].PermanentAddress3) {
					$rootScope.formData.fields.cAddress3 = $scope.finData.addressInfo[0].PermanentAddress3;
				} else {
					$rootScope.formData.fields.cAddress3 = $scope.finData.addressInfo[0].PermanentCity;
				}
				$rootScope.formData.fields.cCity = $scope.finData.addressInfo[0].PermanentCity;
				$rootScope.formData.fields.cPin = $scope.finData.addressInfo[0].PermanentPin;
				if (!$rootScope.formData.fields.firstName) {
					$rootScope.formData.fields.firstName = $scope.finData.basicInfo[0].CustomerFirstName;
				}
				if (!$rootScope.formData.fields.middleName) {
					$rootScope.formData.fields.middleName = $scope.finData.basicInfo[0].CustomerMiddleName;
				}
				if (!$rootScope.formData.fields.lastName) {
					$rootScope.formData.fields.lastName = $scope.finData.basicInfo[0].CustomerLastName;
				}
				if(!$rootScope.formData.fields.email){
				$rootScope.formData.fields.email = $scope.finData.basicInfo[0].EmailId;
				}
				if(!$rootScope.formData.fields.mobile){
				$rootScope.formData.fields.mobile = $scope.finData.basicInfo[0].Mobile;
				}
				
				setTimeout(function () {
					$('#city1_value').val($rootScope.formData.fields.cCity);
					$('#pin').val($rootScope.formData.fields.cPin);
					$('#cPin_value').val($rootScope.formData.fields.cPin);
					$("#ktitle").val($rootScope.formData.fields.title);
					$("#kra_title").val($rootScope.formData.fields.title);
					if($rootScope.formData.CKYC){
					$("#newaddresse").prop('disabled', true);
					$('#oldaddress').prop('disabled', true);
					}
					setTimeout(function () {
						$(".select").select2();
						$('#newaddresse, #oldaddress').iCheck('update');
					}, 500)
				}, 500)
				var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.fields.cPin;
				$rootScope.formData.apiLoading = true;
				serverService.getApi(p_url).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						$rootScope.formData.fields.cStateId = response.PincodeList[0].StateId;
						$rootScope.formData.fields.cStateName = response.PincodeList[0].StateName;
						$rootScope.formData.fields.cDistrict = response.PincodeList[0].District;
					}
				});
			}
			
			$scope.getAadhaarData = function () {
				$rootScope.formData.kraData = {};
				$rootScope.formData.fields.cAddress1 = $rootScope.formData.aadhaarData.Loc.substring(0, 30);
				$rootScope.formData.fields.cAddress2 = $rootScope.formData.aadhaarData.Loc.substring(30, 60);
				$rootScope.formData.fields.cAddress3 = $rootScope.formData.aadhaarData.Loc.substring(60, 90);
				$rootScope.formData.kraData.APP_COR_DISTRICT = $rootScope.formData.aadhaarData.Dist;
				$rootScope.formData.kraData.APP_COR_STATENAME = $rootScope.formData.aadhaarData.State;
				$rootScope.formData.kraData.APP_COR_PINCD = $rootScope.formData.aadhaarData.Pc;
				$rootScope.formData.kraData.APP_COR_CITY = $rootScope.formData.aadhaarData.Dist;
				var p_url = "DIYAutoPincode?Pincode=" + $rootScope.formData.kraData.APP_COR_PINCD;

				serverService.getAPI(p_url).then(function (a) {
					var response = a.data
					if (response.IsSuccess) {
						$rootScope.formData.fields.cStateId = response.PincodeList[0].StateId;
					}
				});
				$('#newaddresse').iCheck('uncheck');
			}

			$scope.resetValidation = function (tagName) {
				$scope[tagName] = false;
			}

			$rootScope.formData.aadhaarProfile = false;
			$scope.changeAadhaar = true;
			if (message == 'Success') {
				var url = 'DIYGetAadharEKYCData?PanNumber=' + $rootScope.formData.fields.panNumber;
				$rootScope.formData.aadhaarProcess = false;
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						sessionStorage.setItem('aadhaarData', JSON.stringify(response))
						$rootScope.formData.aadhaarData = JSON.parse(sessionStorage.getItem('aadhaarData'));
						$rootScope.formData.aadhaarProfile = true;
						$scope.changeAadhaar = false;
						$scope.getAadhaarData();
					}
				});
			} else if (message == 'Failure') {
				$rootScope.formData.aadhaarProcess = false;
				$rootScope.formData.btnOk = true;
				$rootScope.apiResponseErrorMsg = 'No data from UIDAI for your Aadhaar';
			}
			setTimeout(function () {

				if (sessionStorage.getItem('finacle') && sessionStorage.getItem('finData')) {
					$scope.getFinData();
				} else if ($rootScope.aadhaarModule && $rootScope.formData.aadhaarProcess) {
					$rootScope.getAadhaar();
				} else if ($rootScope.aadhaarModule && sessionStorage.getItem('aadhaarData')) {
					$rootScope.formData.aadhaarData = JSON.parse(sessionStorage.getItem('aadhaarData'));
					$rootScope.formData.aadhaarProfile = true;
					$scope.changeAadhaar = false;
					$scope.getAadhaarData();
				} else if (sessionStorage.getItem('IsKRA') == 'true' && !$scope.getProfileData) {
					$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
					$rootScope.formData.KRA = true;
					if ($rootScope.formData.IsKRAUpdate == 'Y') {
						$scope.krabtn = true;
						//sessionStorage.setItem('IsKRAUpdate', 'Y');
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.changeKRA = true;
						$rootScope.formData.KRA = false;
					} else {
						$rootScope.formData.IsKRAUpdate == 'N';
					}
					// $rootScope.formData.fields.sameAddress = false;
					$scope.kraClientData();
				} else if (sessionStorage.getItem('IsCKYC') == 'true') {
					$rootScope.formData.CKYC = true;
					if ($rootScope.formData.IsCKYCUpdate == 'Y' || sessionStorage.getItem('IsCKCYUpdate') == 'Y') {
						$scope.ckycbtn = true;
						//sessionStorage.setItem('IsKRAUpdate', 'Y');
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.changeCKYC = true;
						$rootScope.formData.CKYC = false;
					} else {
						$rootScope.formData.IsCKYCUpdate == 'N';
						if (!(sessionStorage.getItem('IsKRA'))) {
							$rootScope.formData.changeCKYC = false;
						}
					}
					$scope.CkyCClientData();
				} else {
					$rootScope.formData.KRA = false;
					$scope.lastnameFreeze = true;
					$rootScope.formData.chgAdrDisable = true;
					if (sessionStorage.getItem("CFirstname")) {
						$rootScope.formData.ClientFirstname = sessionStorage.getItem("CFirstname");
					}
					if (sessionStorage.getItem("CMiddlename")) {
						$rootScope.formData.ClientMiddlename = sessionStorage.getItem("CMiddlename");
					}
					if (sessionStorage.getItem("CLastname")) {
						$rootScope.formData.ClientLastname = sessionStorage.getItem("CLastname");
					}
					// if (sessionStorage.getItem("CLastname") == '' || sessionStorage.getItem("CLastname") == null) {
					// 	$scope.lastnameFreeze = false;
					// }
				}
			}, 500);

			$scope.getlocalProfileData = function () {
				if (sessionStorage.getItem('finacle') && sessionStorage.getItem('finData')) {
					$scope.getFinData();
				} else {
					var Address_Info_Stage = '';
					if (sessionStorage.getItem('IsKRA') == 'true') {
						$rootScope.formData.changeKRA = false;
					} else {
						if (sessionStorage.getItem('IsCKYC') == 'true') {
							$rootScope.formData.changeCKYC = false;
						}
					}
					Address_Info_Stage = "Address_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
					if (!$rootScope.formData.aadharVerified && sessionStorage.getItem('IsKRA') != 'true' && JSON.parse(sessionStorage.getItem(Address_Info_Stage)) != null) {
						var Address_Info = JSON.parse(sessionStorage.getItem(Address_Info_Stage));
						if(!$rootScope.formData.fields.firstName &&  Address_Info.firstName){
							$rootScope.formData.fields.firstName = Address_Info.firstName;
						}
						if(!$rootScope.formData.fields.middleName &&  Address_Info.middleName){
							$rootScope.formData.fields.middleName = (Address_Info.middleName != null) ? Address_Info.middleName : '';
						}
						if(!$rootScope.formData.fields.lastName &&  Address_Info.lastName){
							$rootScope.formData.fields.lastName = Address_Info.lastName;
						}

						if (!Address_Info.firstName && sessionStorage.getItem('CFirstname'))
							$rootScope.formData.fields.firstName = sessionStorage.getItem('CFirstname');

						if (!Address_Info.middleName && sessionStorage.getItem('CMiddlename'))
							$rootScope.formData.fields.middleName = sessionStorage.getItem('CMiddlename');

						if (!Address_Info.lastName && sessionStorage.getItem('CLastname'))
							$rootScope.formData.fields.lastName = sessionStorage.getItem('CLastname');

						$rootScope.formData.fields.cAddressType = Address_Info.CorrespondenceTypeID;
						$rootScope.formData.fields.cPin = Address_Info.cPin;
						$('#cPin_value').val(Address_Info.cPin);
						$rootScope.formData.fields.cStateName = Address_Info.cState;
						$rootScope.formData.fields.cStateId = Address_Info.cStateId;
						$('#city1_value').val(Address_Info.cCity);
						$rootScope.formData.cdValid = true;
						$rootScope.formData.fields.cDistrict = Address_Info.cDistrict;
						$rootScope.formData.fields.cAddress1 = Address_Info.cAddress1;
						$rootScope.formData.fields.cAddress2 = Address_Info.cAddress2;
						$rootScope.formData.fields.cAddress3 = Address_Info.cAddress3;
						$rootScope.formData.fields.sameAddress = Address_Info.sameAddress;
						$rootScope.formData.fields.pPin = Address_Info.pPin;
						$('#pPin_value').val(Address_Info.pPin);
						$rootScope.formData.fields.pStateName = Address_Info.pState;
						$rootScope.formData.fields.pStateId = Address_Info.pStateId;
						$('#city2_value').val(Address_Info.pCity);
						$rootScope.formData.pdValid = true;
						$rootScope.formData.fields.pDistrict = Address_Info.pDistrict;
						$rootScope.formData.fields.pAddress1 = Address_Info.pAddress1;
						$rootScope.formData.fields.pAddress2 = Address_Info.pAddress2;
						$rootScope.formData.fields.pAddress3 = Address_Info.pAddress3;
						$('#ktitle').val(Address_Info.title);
						setTimeout(function () {
							$(".select").select2();
						}, 500);
					} else {
						if (sessionStorage.getItem('CFirstname'))
							$rootScope.formData.fields.firstName = sessionStorage.getItem('CFirstname');

						if (sessionStorage.getItem('CMiddlename'))
							$rootScope.formData.fields.middleName = sessionStorage.getItem('CMiddlename');

						if (sessionStorage.getItem('CLastname'))
							$rootScope.formData.fields.lastName = sessionStorage.getItem('CLastname');
					}
				}
			}
			$scope.getPersonalInfo = function () {
				if (!$rootScope.formData.eRefNumber) {
					$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
				}

				var s_url = "DIYGetClientPersonalInfoByReferenceNumber";
				var refNum = "";
				if ($rootScope.formData.eRefNumber) {
					refNum = $rootScope.formData.eRefNumber
				} else {
					refNum = sessionStorage.getItem('AxNo');
				}
				var sendData = {
					ReferenceNumber: refNum,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				}

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.EncryptToken) {
						$rootScope.EncryptToken = response.EncryptToken;
						sessionStorage.setItem('AxToken', response.EncryptToken);
					} else {
						if ($rootScope.formData.tokenValidation) {
							$rootScope.clearBrowsingData();
							$('#APIResponse').modal({
								backdrop: 'static',
								keyboard: false
							});
							$rootScope.apiResponseErrorMsg = "Session Timed Out";
							return false;
						}
					}

					if (!$rootScope.getAPI && response.IsSuccess) {
						//$rootScope.formData.KRA = false;

						$scope.getProfileData = true;
						if (response.ObjCDIYClientProfile.UID != null && response.ObjCDIYClientProfile.UID != '') {
							$rootScope.formData.fields.aadharNumber = response.ObjCDIYClientProfile.UID;
							sessionStorage.removeItem('RxUID');
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

						if (response.ObjCDIYClientProfile.FirstName) {
							$rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
						}
						$rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
						if (response.ObjCDIYClientProfile.LastName) {
							$scope.lastnameFreeze = true;
							$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
						} else {
							$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
						}
						$scope.nameFreeze = true;
						$rootScope.formData.fields.title = response.ObjCDIYClientProfile.ClientPrefixID;
						setTimeout(function () {
							$("#ktitle").val(response.ObjCDIYClientProfile.ClientPrefixID);
						}, 500);
						if ($rootScope.formData.KRA || $rootScope.formData.CKYC || sessionStorage.getItem('IsKRA') == 'true' || sessionStorage.getItem('IsCKYC') == 'true') {
							$("#kra_title").val($rootScope.formData.fields.title);

							if ($rootScope.formData.threeinone) {
								$rootScope.formData.krathreeinoneData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
								$rootScope.formData.kraData = {
									APP_FirstName: response.ObjCDIYClientProfile.FirstName,
									APP_LastName: response.ObjCDIYClientProfile.LastName,
									APP_MiddleName: response.ObjCDIYClientProfile.MiddleName
								}
							} else {
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
							}
							$('#newaddresse12').iCheck('uncheck');
							if (sessionStorage.getItem('IsKRA') == 'true') {
								$rootScope.formData.KRA = true;
								if (sessionStorage.getItem('IsKRAUpdate') && sessionStorage.getItem('IsKRAUpdate') == 'Y') {
									$rootScope.formData.changeKRA = true;
								} else {
									$rootScope.formData.changeKRA = false;
								}
							} else {
								$rootScope.formData.CKYC = true;
								if (sessionStorage.getItem('IsCKYCUpdate') && sessionStorage.getItem('IsCKYCUpdate') == 'Y') {
									$rootScope.formData.changeCKYC = true;
								} else {
									$rootScope.formData.changeCKYC = false;
								}
							}
							if (!$rootScope.formData.threeinone) {
								//sessionStorage.setItem('KRAClientInfo', JSON.stringify($rootScope.formData.kraData));
							}
						} else {
							$("#ktitle").val($rootScope.formData.fields.title);

							$rootScope.formData.KRA = false;
							$rootScope.formData.changeKRA = '';
							$rootScope.formData.CKYC = false;
							$rootScope.formData.changeCKYC = '';
							$('#newaddresse12').iCheck('uncheck');
						}

						setTimeout(function () {
							if ($rootScope.formData.threeinone && $rootScope.formData.fields.title) {
								$('#ktitle,#kra_title').prop('disabled', true);
							}
							$(".select").select2();
						}, 500);

						//$rootScope.formData.fields.cAddressType = response.ClientAddressDetailsList[0].AddrTypeID;
						if ($rootScope.formData.IsKRAUpdate == 'Y') {
							$scope.krabtn = true;
							sessionStorage.setItem('IsKRAUpdate', 'Y');
							$rootScope.formData.chgAdrDisable = true;
							$rootScope.formData.changeKRA = true;
							$rootScope.formData.KRA = false;
						} else {
							$rootScope.formData.IsKRAUpdate == 'N';
						}

						if ($rootScope.formData.IsCKYCUpdate == 'Y' || sessionStorage.getItem('IsCKYCUpdate') == 'Y') {
							$scope.ckycbtn = true;
							$rootScope.formData.chgAdrDisable = true;
							$rootScope.formData.changeCKYC = true;
							$rootScope.formData.CKYC = false;
						} else {
							if (!(sessionStorage.getItem('IsKRA'))) {
								$rootScope.formData.IsCKYCUpdate == 'N';
								$rootScope.formData.changeCKYC = false;
							}
						}

						$rootScope.formData.fields.cAddress1 = response.ClientAddressDetailsList[0].AddressLine1;
						$rootScope.formData.fields.cAddress2 = response.ClientAddressDetailsList[0].AddressLine2;
						$rootScope.formData.fields.cAddress3 = response.ClientAddressDetailsList[0].AddressLine3;
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.cAddress1) {
							$scope.cAddressFreeze = true;
							if (sessionStorage.getItem('IsKRA') == 'true') {
								if ($rootScope.formData.krathreeinoneData.APP_COR_ADD1 === null || $rootScope.formData.krathreeinoneData.APP_COR_ADD1 === "") {
									$rootScope.formData.krathreeinoneData.APP_COR_ADD1 = "";
								}
								if ($rootScope.formData.krathreeinoneData.APP_COR_ADD2 === null || $rootScope.formData.krathreeinoneData.APP_COR_ADD2 === "") {
									$rootScope.formData.krathreeinoneData.APP_COR_ADD2 = "";
								}
								if ($rootScope.formData.krathreeinoneData.APP_COR_ADD3 === null || $rootScope.formData.krathreeinoneData.APP_COR_ADD3 === "") {
									$rootScope.formData.krathreeinoneData.APP_COR_ADD3 = "";
								}
								if ($rootScope.formData.krathreeinoneData.APP_COR_ADD1.length > 30) {
									var addL = "";
									var add2 = "";
									var addL2 = "";
									var add3 = "";
									var addL3 = "";
									addL = $rootScope.formData.krathreeinoneData.APP_COR_ADD1;
									var splitedAddress = addL.match(/.{1,30}/g);
									$rootScope.formData.fields.cAddress1 = splitedAddress[0];
									add2 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_COR_ADD2;
									add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
									if (add2.length > 30) {
										addL2 = add2;
										var splitedAddress = addL2.match(/.{0,30}/g);
										$rootScope.formData.fields.cAddress2 = splitedAddress[0];
										add3 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
										add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
										if (add3.length > 30) {
											addL3 = add3;
											var splitedAddress = addL2.match(/.{0,30}/g);
											$rootScope.formData.fields.cAddress3 = splitedAddress[0];
										} else {
											add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.cAddress3 = add3;
										}
									} else {
										add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
										$rootScope.formData.fields.cAddress2 = add2;
										if ($rootScope.formData.kraData.APP_COR_ADD3.length > 30) {
											var addL3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
											addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.cAddress3 = splitedAddress[0];
										} else {
											$rootScope.formData.krathreeinoneData.APP_COR_ADD3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.cAddress3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
										}
									}
								} else {
									$rootScope.formData.fields.cAddress1 = $rootScope.formData.krathreeinoneData.APP_COR_ADD1;
									if ($rootScope.formData.kraData.APP_PER_ADD2.length > 30) {
										var addL2 = $rootScope.formData.krathreeinoneData.APP_COR_ADD2;
										addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
										var splitedAddress = addL2.match(/.{0,30}/g);
										$rootScope.formData.fields.cAddress2 = splitedAddress[0];
										var add3 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
										add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
										if (add3.length > 30) {
											var addL3 = add3;
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.cAddress3 = splitedAddress[0];
										} else {
											add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.cAddress3 = add3;
										}
									} else {
										$rootScope.formData.krathreeinoneData.APP_COR_ADD2 = $rootScope.formData.krathreeinoneData.APP_COR_ADD2.replace(/[^a-zA-Z0-9 ]/g, "");
										$rootScope.formData.fields.cAddress2 = $rootScope.formData.krathreeinoneData.APP_COR_ADD2;
										if ($rootScope.formData.kraData.APP_PER_ADD3.length > 30) {
											var addL3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
											addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.cAddress3 = splitedAddress[0];
										} else {
											$rootScope.formData.krathreeinoneData.APP_COR_ADD3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.cAddress3 = $rootScope.formData.krathreeinoneData.APP_COR_ADD3;
										}
									}
								}
							}
						} else {
							$scope.cAddressFreeze = false;
						}
						$rootScope.formData.fields.cCity = response.ClientAddressDetailsList[0].City;
						if ($rootScope.formData.threeinone && $rootScope.formData.fields.cCity) {
							$('#city1_value').prop('disabled', true);
							if (sessionStorage.getItem('IsKRA') == 'true') {
								$rootScope.formData.kraData.APP_COR_CITY = $rootScope.formData.krathreeinoneData.APP_COR_CITY;
							}
						} else {
							$('#city1_value').prop('disabled', false);
						}
						$rootScope.formData.fields.cPin = response.ClientAddressDetailsList[0].PinCode;
						if ($rootScope.formData.threeinone && response.ClientAddressDetailsList[0].PinCode) {
							$('#cPin_value').prop("disabled", true);
							if (sessionStorage.getItem('IsKRA') == 'true') {
								$rootScope.formData.kraData.APP_COR_PINCD = $rootScope.formData.krathreeinoneData.APP_COR_PINCD;
							}
						} else {
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
						if ($rootScope.formData.threeinone) {
							if (sessionStorage.getItem('IsKRA') == 'true') {
								$rootScope.formData.kraData.APP_COR_STATENAME = $rootScope.formData.krathreeinoneData.APP_COR_STATENAME;
								$rootScope.formData.kraData.APP_COR_DISTRICT = $rootScope.formData.krathreeinoneData.APP_COR_DISTRICT;
							}
						}
						$rootScope.formData.cdValid = true;

						var s_url = "DIYGetCityListForAutoFill?StateID=" + response.ClientAddressDetailsList[0].StateId;
						serverService.getApi(s_url).then(function (a) {
							var response = a.data;
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
								if ($rootScope.formData.threeinone) {
									$('#oldaddress').prop('disabled', true);
								}
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
						if ($rootScope.formData.threeinone) {
							$('#oldaddress').prop('disabled', true);
						}
						if (response.ClientAddressDetailsList[0].AddrTypeID != null) {
							setTimeout(function () {
								$rootScope.formData.fields.cAddressType = (response.ClientAddressDetailsList[0].AddrTypeID).toString();
								if ($rootScope.formData.threeinone && $rootScope.formData.fields.cAddressType) {
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
								if ($rootScope.formData.threeinone && $rootScope.formData.fields.pAddressType) {
									$('#pAddressType').addClass("freeze");
								}
								$("#pAddressType option:contains(" + $rootScope.formData.fields.pAddressType + ")").prop('selected', true);
								$scope.$apply();
							}, 500)
						}
						//$rootScope.formData.fields.pAddressType = response.ClientAddressDetailsList[1].AddrTypeID;
						$rootScope.formData.fields.pAddress1 = response.ClientAddressDetailsList[1].AddressLine1;
						$rootScope.formData.fields.pAddress2 = response.ClientAddressDetailsList[1].AddressLine2;
						$rootScope.formData.fields.pAddress3 = response.ClientAddressDetailsList[1].AddressLine3;

						if ($rootScope.formData.threeinone && $rootScope.formData.fields.pAddress1) {
							if (sessionStorage.getItem('IsKRA') == 'true') {
								$scope.pAddressFreeze = true;
								if ($rootScope.formData.krathreeinoneData.APP_PER_ADD1 === null || $rootScope.formData.krathreeinoneData.APP_PER_ADD1 === "") {
									$rootScope.formData.krathreeinoneData.APP_PER_ADD1 = "";
								}
								if ($rootScope.formData.krathreeinoneData.APP_PER_ADD2 === null || $rootScope.formData.krathreeinoneData.APP_PER_ADD2 === "") {
									$rootScope.formData.krathreeinoneData.APP_PER_ADD2 = "";
								}
								if ($rootScope.formData.krathreeinoneData.APP_PER_ADD3 === null || $rootScope.formData.krathreeinoneData.APP_PER_ADD3 === "") {
									$rootScope.formData.krathreeinoneData.APP_PER_ADD3 = "";
								}
								if ($rootScope.formData.kraData.APP_PER_ADD1.length > 30) {
									var addL = $rootScope.formData.krathreeinoneData.APP_PER_ADD1;
									var splitedAddress = addL.match(/.{0,30}/g);
									$rootScope.formData.fields.pAddress1 = splitedAddress[0];
									var add2 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_PER_ADD2;
									add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
									if (add2.length > 30) {
										var addL2 = add2;
										var splitedAddress = addL2.match(/.{0,30}/g);
										$rootScope.formData.fields.pAddress2 = splitedAddress[0];
										var add3 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
										add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
										if (add3.length > 30) {
											var addL3 = add3;
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.pAddress3 = splitedAddress[0];
										} else {
											add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.pAddress3 = add3;
										}
									} else {
										add2 = add2.replace(/[^a-zA-Z0-9 ]/g, "");
										$rootScope.formData.fields.pAddress2 = add2;
										if ($rootScope.formData.kraData.APP_PER_ADD3.length > 30) {
											var addL3 = $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
											addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.pAddress3 = splitedAddress[0];
										} else {
											$rootScope.formData.krathreeinoneData.APP_PER_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.pAddress3 = $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
										}
									}
								} else {
									$rootScope.formData.fields.pAddress1 = $rootScope.formData.krathreeinoneData.APP_PER_ADD1;
									if ($rootScope.formData.krathreeinoneData.APP_PER_ADD2.length > 30) {
										var addL2 = $rootScope.formData.krathreeinoneData.APP_PER_ADD2;
										addL2 = addL2.replace(/[^a-zA-Z0-9 ]/g, "");
										var splitedAddress = addL2.match(/.{0,30}/g);
										$rootScope.formData.fields.pAddress2 = splitedAddress[0];
										var add3 = splitedAddress[1] + $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
										add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
										if (add3.length > 30) {
											var addL3 = add3;
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.pAddress3 = splitedAddress[0];
										} else {
											add3 = add3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.pAddress3 = add3;
										}
									} else {
										$rootScope.formData.krathreeinoneData.APP_PER_ADD2.replace(/[^a-zA-Z0-9 ]/g, "");
										$rootScope.formData.fields.pAddress2 = $rootScope.formData.krathreeinoneData.APP_PER_ADD2;
										if ($rootScope.formData.kraData.APP_PER_ADD3.length > 30) {
											var addL3 = $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
											addL3 = addL3.replace(/[^a-zA-Z0-9 ]/g, "");
											var splitedAddress = addL3.match(/.{0,30}/g);
											$rootScope.formData.fields.pAddress3 = splitedAddress[0];
										} else {
											$rootScope.formData.krathreeinoneData.APP_PER_ADD3 = $rootScope.formData.krathreeinoneData.APP_PER_ADD3.replace(/[^a-zA-Z0-9 ]/g, "");
											$rootScope.formData.fields.pAddress3 = $rootScope.formData.krathreeinoneData.APP_PER_ADD3;
										}
									}
								}
							}
						} else {
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
						serverService.getApi(s_url).then(function (a) {
							var response = a.data;
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
								if ($rootScope.formData.threeinone && response.ClientAddressDetailsList[1].PinCode) {
									$('#pPin_value').prop('disabled', true);
									if (sessionStorage.getItem('IsKRA') == 'true') {
										$rootScope.formData.kraData.APP_PER_PINCD = $rootScope.formData.krathreeinoneData.APP_PER_PINCD;
									}
								} else {
									$('#pPin_value').prop('disabled', false);
								}
								if ($rootScope.formData.threeinone && $rootScope.formData.fields.pCity) {
									$('#city2_value').prop('disabled', true);
									if (sessionStorage.getItem('IsKRA') == 'true') {
										$rootScope.formData.kraData.APP_PER_CITY = $rootScope.formData.krathreeinoneData.APP_PER_CITY;
									}
								} else {
									$('#city2_value').prop('disabled', false);
								}

								/****for IE fix ***/
							}, 500);
						}
						if ($rootScope.webfinacle) {
							$scope.finDataShow = true;
							$('#pin').val(response.ClientAddressDetailsList[0].PinCode);
							if(response.ClientAddressDetailsList[1].PinCode){
								$('#pPin_value').val(response.ClientAddressDetailsList[1].PinCode);
							}
						}

						setTimeout(function () {
							$scope.checkradioinit();
						}, 1010)

					} else {
						if (response.ObjCDIYClientProfile.FirstName) {
							$rootScope.formData.fields.firstName = response.ObjCDIYClientProfile.FirstName;
						}
						if(response.ObjCDIYClientProfile.MiddleName){
						$rootScope.formData.fields.middleName = response.ObjCDIYClientProfile.MiddleName;
						}
						if (response.ObjCDIYClientProfile.LastName) {
							$scope.lastnameFreeze = true;
							$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.LastName;
						} else {
							if (response.ObjCDIYClientProfile.FirstName) {
							$rootScope.formData.fields.lastName = response.ObjCDIYClientProfile.FirstName;
							}
						}
						$scope.nameFreeze = true;
						$scope.getlocalProfileData();
					}
					setTimeout(function () {
						$rootScope.overallStatus();
					}, 1010)
				});

			}

			if ($rootScope.formData.threeinone && (sessionStorage.getItem('IsKRA') == 'true')) {
				$rootScope.wizardShow = true;

				setTimeout(function () {
					$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
					$rootScope.formData.KRA = true;
					$scope.getPersonalInfo();
					// $rootScope.formData.fields.sameAddress = false;
					if ($rootScope.formData.getKraData || ($rootScope.getAPI && $rootScope.formData.kraData != undefined && $rootScope.formData.kraData != '' && $rootScope.formData.kraData != null)) {
						//$scope.kraClientData();
					} else {
						if ($rootScope.formData.tokenValidation && !$rootScope.EncryptToken) {
							var url = "GetEncrptToken";
							var sendData = {
								ReferenceNumber: sessionStorage.getItem('AxNo')
							}
							$rootScope.formData.apiLoading = true;
							serverService.apiCall(url, sendData).then(function (a) {
								var data = a.data;
								$rootScope.formData.apiLoading = false;
								if (data.EncryptToken) {
									$rootScope.EncryptToken = data.EncryptToken;
									$scope.getPersonalInfo();
								}
							});

						} else {
							$scope.getPersonalInfo();
						}
					}
				}, 1500);
			} else {
				$rootScope.wizardShow = true;
				if ($rootScope.formData.tokenValidation && !$rootScope.EncryptToken) {
					var url = "GetEncrptToken";
					var sendData = {
						ReferenceNumber: sessionStorage.getItem('AxNo')
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var data = a.data;
						$rootScope.formData.apiLoading = false;
						if (data.EncryptToken) {
							$rootScope.EncryptToken = data.EncryptToken;
							$scope.getPersonalInfo();
						}
					});

				} else {
					$scope.getPersonalInfo();
				}
			}

			$scope.profileValidate = function () {
				var error = 0;

				// $rootScope.formData.IsKRAUpdate = 'N';
				if (sessionStorage.getItem('IsKRAUpdate') == "Y") {
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

						if (this.id != "inputuid" && this.id != "mmName" && this.id != "lmName" && this.id != "oaadhar-number" && this.id != "cadr2" && this.id != "cadr3" && this.id != "padr2" && this.id != "padr3") {
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
					if ((!$rootScope.formData.KRA && !$rootScope.formData.CKYC)) {
						if (value.length < 5) {
							if (this.id == "areaadd1" || (this.id == "pareaadd1" && !$rootScope.formData.kraPerAdr)) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
								if (this.id == "areaadd1" || this.id == "cadr2" || this.id == "cadr3" || this.id == "cPin_value" || this.id == "city1_value") {
									$('#' + this.id).focus();
								}
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
					}
				});

				if ($rootScope.formData.city2_valueError) {
					$scope.city2_valueError = true;
					error++;
				}
				if ($rootScope.formData.city1_valueError) {
					$scope.city1_valueError = true;
					error++;
				}
				if ((!$rootScope.formData.KRA && !$rootScope.formData.CKYC && !$scope.finDataShow)) {
					if (($rootScope.formData.fields.cAddress2 === "" || $rootScope.formData.fields.cAddress2 === null) && ($rootScope.formData.fields.cAddress3 !== undefined && $rootScope.formData.fields.cAddress3 !== null && $rootScope.formData.fields.cAddress3 !== "")) {
						$scope.cadr2Error = true;
						error++;
						$('#cadr2').focus();
					}
					if ($rootScope.formData.fields.sameAddress === false) {
						if (($rootScope.formData.fields.pAddress2 === "" || $rootScope.formData.fields.pAddress2 === null) && ($rootScope.formData.fields.pAddress3 !== undefined && $rootScope.formData.fields.pAddress3 !== null && $rootScope.formData.fields.pAddress3 !== "")) {
							$scope.padr2Error = true;
							error++;
							$('#padr2').focus();
						}
					}
					if ($rootScope.formData.fields.cAddress2 && (!$rootScope.formData.fields.cAddress2.match(/[a-zA-Z]/i) || $rootScope.formData.fields.cAddress2.length < 3)) {
						$scope.cadr2Error = true;
						error++;
						$('#cadr2').focus();
					}
					if ($rootScope.formData.fields.sameAddress === false) {
						if ($rootScope.formData.fields.pAddress2 && (!$rootScope.formData.fields.pAddress2.match(/[a-zA-Z]/i) || $rootScope.formData.fields.pAddress2.length < 3)) {
							$scope.padr2Error = true;
							error++;
							$('#padr2').focus();
						}
					}
					if ($rootScope.formData.fields.cAddress3 && (!$rootScope.formData.fields.cAddress3.match(/[a-zA-Z]/i) || $rootScope.formData.fields.cAddress3.length < 3)) {
						$scope.cadr3Error = true;
						error++;
						$('#cadr3').focus();
					}
					if ($rootScope.formData.fields.sameAddress === false) {
						if ($rootScope.formData.fields.pAddress3 && (!$rootScope.formData.fields.pAddress3.match(/[a-zA-Z]/i) || $rootScope.formData.fields.pAddress3.length < 3)) {
							$scope.padr3Error = true;
							error++;
							$('#padr3').focus();
						}
					}
				}

				if ($('#city1_value').val() != "" && $('#city1_value').val() != undefined) {
					var notSpl = /^[A-Za-z0-9 ]+$/;
					if (notSpl.test($('#city1_value').val()) === false || $('#city1_value').val().length < 3) {
						$scope.city1_lengthError = true;
						error++;
					}
				}
				if ($('#city2_value').val() != "" && $('#city2_value').val() != undefined) {
					var notSpl = /^[A-Za-z0-9 ]+$/;
					if (notSpl.test($('#city2_value').val()) === false || $('#city2_value').val().length < 3) {
						$scope.city2_lengthError = true;
						error++;
					}

				}

				$scope.regex = /[^!@#$%&*?]/i;

				if (!$scope.regex.test($rootScope.formData.fields.cAddress1)) {
					$scope.areaadd1Error = true;
					$('#areaadd1').focus();
					error++;
				} else {
					$scope.areaadd1Error = false;
				}

				if (error == 0) {
					$rootScope.formData.IsKRAUpdate = 'N';
					$rootScope.formData.IsCKYCUpdate = 'N';

					// For KRA Client Data submit
					if (sessionStorage.getItem('IsKRA') === true || sessionStorage.getItem('IsKRA') === 'true') {
						$rootScope.formData.fields.cAddress1 = $rootScope.formData.fields.cAddress1.trim();
						if (!$rootScope.formData.changeKRA) {
							$rootScope.formData.fields.cPin = $('#pin').val();
							$rootScope.formData.fields.cCity = $('#kCity').val();
							sessionStorage.setItem('IsKRA', true);
							/* if((sessionStorage.getItem('IsKRA') === true || sessionStorage.getItem('IsKRA') === 'true') && !$rootScope.formData.changeKRA){

							}
							}*/
						} else {
							sessionStorage.setItem('IsKRAUpdate', 'Y');
							$rootScope.formData.fields.cPin = $('#cPin_value').val();
							$rootScope.formData.fields.cCity = $('#city1_value').val();
							if ((sessionStorage.getItem('IsKRA') === true || sessionStorage.getItem('IsKRA') === 'true')) {
								sessionStorage.setItem('IsKRA', false);
							} else if ((sessionStorage.getItem('IsCKYC') === true || sessionStorage.getItem('IsCKYC') === 'true')) {
								if (!$rootScope.formData.changeCKYC) {
									$rootScope.formData.fields.cPin = $('#pin').val();
									$rootScope.formData.fields.cCity = $('#kCity').val();
								} else {
									sessionStorage.setItem('IsCKCYUpdate', 'Y');
									$rootScope.formData.fields.cPin = $('#cPin_value').val();
									$rootScope.formData.fields.cCity = $('#city1_value').val();
									sessionStorage.setItem('IsCKYC', false);
								}
							}
						}
						var user_addr = '';
						if ($rootScope.formData.kraData && $rootScope.formData.changeKRA) {
							user_addr = $rootScope.formData.kraData.APP_COR_ADD1 + ' ' + $rootScope.formData.kraData.APP_COR_ADD2 + ' ' + $rootScope.formData.kraData.APP_COR_ADD3;
							puser_addr = $rootScope.formData.kraData.APP_PER_ADD1 + ' ' + $rootScope.formData.kraData.APP_PER_ADD2 + ' ' + $rootScope.formData.kraData.APP_PER_ADD3;
							user_addr = user_addr.replace(/(^[\s]+|[\s]+$)/g, '');
							puser_addr = puser_addr.replace(/(^[\s]+|[\s]+$)/g, '');
							if ($rootScope.formData.fields.cAddress1) {
								var cAdr = $rootScope.formData.fields.cAddress1 + ' ' + $rootScope.formData.fields.cAddress2 + ' ' + $rootScope.formData.fields.cAddress3;
								if (cAdr.toUpperCase() !== user_addr.toUpperCase() || $rootScope.formData.fields.cStateName.toUpperCase() !== $rootScope.formData.kraData.APP_COR_STATENAME.toUpperCase() || $rootScope.formData.fields.cDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_COR_DISTRICT.toUpperCase() ||
									$rootScope.formData.fields.cCity.toUpperCase() !== $rootScope.formData.kraData.APP_COR_CITY.toUpperCase()) {
									$rootScope.formData.IsKRAUpdate = 'Y';
								}
							}
							if ($rootScope.formData.fields.pAddress1 && !$rootScope.formData.fields.sameAddress) {
								var pAdr = $rootScope.formData.fields.pAddress1 + ' ' + $rootScope.formData.fields.pAddress2 + ' ' + $rootScope.formData.fields.pAddress3;
								if (pAdr.toUpperCase() !== puser_addr.toUpperCase() || $rootScope.formData.fields.pStateName.toUpperCase() !== $rootScope.formData.kraData.APP_PER_STATENAME.toUpperCase() || $rootScope.formData.fields.pDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_PER_DISTRICT.toUpperCase() ||
									$rootScope.formData.fields.pCity.toUpperCase() !== $rootScope.formData.kraData.APP_PER_CITY.toUpperCase()) {
									$rootScope.formData.IsKRAUpdate = 'Y';
								}
							}
						} else {
							$rootScope.formData.IsKRAUpdate = 'N';
						}

						if ($rootScope.formData.ckycData && $rootScope.formData.changeCKYC) {
							user_addr = $rootScope.formData.kraData.APP_COR_ADD1 + ' ' + $rootScope.formData.kraData.APP_COR_ADD2 + ' ' + $rootScope.formData.kraData.APP_COR_ADD3;
							puser_addr = $rootScope.formData.kraData.APP_PER_ADD1 + ' ' + $rootScope.formData.kraData.APP_PER_ADD2 + ' ' + $rootScope.formData.kraData.APP_PER_ADD3;
							user_addr = user_addr.replace(/(^[\s]+|[\s]+$)/g, '');
							puser_addr = puser_addr.replace(/(^[\s]+|[\s]+$)/g, '');
							if ($rootScope.formData.fields.cAddress1) {
								var cAdr = $rootScope.formData.fields.cAddress1 + ' ' + $rootScope.formData.fields.cAddress2 + ' ' + $rootScope.formData.fields.cAddress3;
								if (cAdr.toUpperCase() !== user_addr.toUpperCase() || $rootScope.formData.fields.cStateName.toUpperCase() !== $rootScope.formData.kraData.APP_COR_STATENAME.toUpperCase() || $rootScope.formData.fields.cDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_COR_DISTRICT.toUpperCase() ||
									$rootScope.formData.fields.cCity.toUpperCase() !== $rootScope.formData.kraData.APP_COR_CITY.toUpperCase()) {
									$rootScope.formData.IsCKYCUpdate = 'Y';
								}
							}
							if ($rootScope.formData.fields.pAddress1 && !$rootScope.formData.fields.sameAddress) {
								var pAdr = $rootScope.formData.fields.pAddress1 + ' ' + $rootScope.formData.fields.pAddress2 + ' ' + $rootScope.formData.fields.pAddress3;
								if (pAdr.toUpperCase() !== puser_addr.toUpperCase() || $rootScope.formData.fields.pStateName.toUpperCase() !== $rootScope.formData.kraData.APP_PER_STATENAME.toUpperCase() || $rootScope.formData.fields.pDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_PER_DISTRICT.toUpperCase() ||
									$rootScope.formData.fields.pCity.toUpperCase() !== $rootScope.formData.kraData.APP_PER_CITY.toUpperCase()) {
									$rootScope.formData.IsCKYCUpdate = 'Y';
								}
							}
						} else {
							$rootScope.formData.IsCKYCUpdate = 'N';
						}
					} else {
						$rootScope.formData.IsKRAUpdate = 'N';

						if ((sessionStorage.getItem('IsCKYC') === true || sessionStorage.getItem('IsCKYC') === 'true')) {
							if (!$rootScope.formData.changeCKYC) {
								$rootScope.formData.fields.cPin = $('#pin').val();
								$rootScope.formData.fields.cCity = $('#kCity').val();
							} else {
								sessionStorage.setItem('IsCKCYUpdate', 'Y');
								$rootScope.formData.fields.cPin = $('#cPin_value').val();
								$rootScope.formData.fields.cCity = $('#city1_value').val();
								sessionStorage.setItem('IsCKYC', false);
								if ($rootScope.formData.ckycData && $rootScope.formData.changeCKYC) {
									user_addr = $rootScope.formData.kraData.APP_COR_ADD1 + ' ' + $rootScope.formData.kraData.APP_COR_ADD2 + ' ' + $rootScope.formData.kraData.APP_COR_ADD3;
									puser_addr = $rootScope.formData.kraData.APP_PER_ADD1 + ' ' + $rootScope.formData.kraData.APP_PER_ADD2 + ' ' + $rootScope.formData.kraData.APP_PER_ADD3;
									user_addr = user_addr.replace(/(^[\s]+|[\s]+$)/g, '');
									puser_addr = puser_addr.replace(/(^[\s]+|[\s]+$)/g, '');
									if ($rootScope.formData.fields.cAddress1) {
										var cAdr = $rootScope.formData.fields.cAddress1 + ' ' + $rootScope.formData.fields.cAddress2 + ' ' + $rootScope.formData.fields.cAddress3;
										if (cAdr.toUpperCase() !== user_addr.toUpperCase() || $rootScope.formData.fields.cStateName.toUpperCase() !== $rootScope.formData.kraData.APP_COR_STATENAME.toUpperCase() || $rootScope.formData.fields.cDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_COR_DISTRICT.toUpperCase() ||
											$rootScope.formData.fields.cCity.toUpperCase() !== $rootScope.formData.kraData.APP_COR_CITY.toUpperCase()) {
											$rootScope.formData.IsCKYCUpdate = 'Y';
										}
									}
									if ($rootScope.formData.fields.pAddress1 && !$rootScope.formData.fields.sameAddress) {
										var pAdr = $rootScope.formData.fields.pAddress1 + ' ' + $rootScope.formData.fields.pAddress2 + ' ' + $rootScope.formData.fields.pAddress3;
										if (pAdr.toUpperCase() !== puser_addr.toUpperCase() || $rootScope.formData.fields.pStateName.toUpperCase() !== $rootScope.formData.kraData.APP_PER_STATENAME.toUpperCase() || $rootScope.formData.fields.pDistrict.toUpperCase() !== $rootScope.formData.kraData.APP_PER_DISTRICT.toUpperCase() ||
											$rootScope.formData.fields.pCity.toUpperCase() !== $rootScope.formData.kraData.APP_PER_CITY.toUpperCase()) {
											$rootScope.formData.IsCKYCUpdate = 'Y';
										}
									}
								} else {
									$rootScope.formData.IsCKYCUpdate = 'N';
								}
							}
						}
					}

					//For Non KRA and KRA Update or Aadhaar Offline.
					if (sessionStorage.getItem('IsKRA') === false || sessionStorage.getItem('IsKRA') === 'false' || sessionStorage.getItem('IsKRA') === 'N') {
						if (sessionStorage.getItem('IsCKYC') === false || sessionStorage.getItem('IsCKYC') === 'false' || sessionStorage.getItem('IsCKYC') === 'N') {
							$rootScope.formData.fields.cPin = $('#cPin_value').val();
							$rootScope.formData.fields.cCity = $('#city1_value').val();
							$rootScope.formData.fields.title = $('#ktitle').val();
						}

					}
					if (sessionStorage.getItem('IsKRA') === null || sessionStorage.getItem('IsKRA') === undefined || sessionStorage.getItem('IsKRA') === "") {
						if (sessionStorage.getItem('IsCKYC') === null || sessionStorage.getItem('IsCKYC') === undefined || sessionStorage.getItem('IsCKYC') === "") {
							if ($('#city1_value').val()) {
								$rootScope.formData.fields.cCity = $('#city1_value').val();
							}
						}
					}
					$scope.addressSame = 0;

					var url = "DIYClientPersonalInfoProfile";

					if (!$rootScope.formData.fields.email) {
						$rootScope.formData.fields.email = '';
					}

					if (!$rootScope.formData.fields.mobile) {
						$rootScope.formData.fields.mobile = '';
					}
					if (sessionStorage.getItem('RxUIDVerified') == 'true') {
						$rootScope.formData.aadharAuthorize = 'Y';
					} else {
						$rootScope.formData.aadharAuthorize = 'N';
					}

					if ($rootScope.formData.IsKRAUpdatePer == 'Y') {
						$rootScope.formData.IsKRAUpdate = 'Y';
					} else if ($rootScope.formData.IsKRAUpdatePer == 'N') {
						$rootScope.formData.IsKRAUpdate = 'N';
					}

					if ($rootScope.formData.IsCKYCUpdatePer == 'Y') {
						$rootScope.formData.IsCKYCUpdate = 'Y';
					} else if ($rootScope.formData.IsCKYCUpdatePer == 'N') {
						$rootScope.formData.IsCKYCUpdate = 'N';
					}

					if (sessionStorage.getItem('IsKRA') == 'true' || sessionStorage.getItem('IsKRA') == true) {
						$rootScope.formData.IsKRA = 'Y';
						$rootScope.formData.fields.title = $('#kra_title').val();
						$rootScope.formData.fields.cCity = $('#kCity').val();
					} else {
						$rootScope.formData.IsKRA = 'N'
							$rootScope.formData.fields.title = $('#ktitle').val();
						if ($('#city1_value').val()) {
							$rootScope.formData.fields.cCity = $('#city1_value').val();
						}
					}
					if (sessionStorage.getItem('IsCKYC') == 'true' || sessionStorage.getItem('IsCKYC') == true || $scope.ckycRefNoIB) {
						$rootScope.formData.IsCKYC = 'Y';
						$rootScope.formData.fields.title = $('#kra_title').val();
						$rootScope.formData.fields.cCity = $('#kCity').val();
					} else {
						$rootScope.formData.IsCKYC = 'N';
						if (!sessionStorage.getItem('IsKRA')) {
							$rootScope.formData.fields.title = $('#ktitle').val();
							if ($('#city1_value').val()) {
								$rootScope.formData.fields.cCity = $('#city1_value').val();
							}
						}
					}
					if (sessionStorage.getItem('IsKRAUpdate') == 'Y') {
						$rootScope.formData.IsKRAUpdate = 'Y';
					}
					if ($rootScope.formData.IsKRAUpdate == 'Y') {
						$rootScope.formData.IsKRA = 'Y';
						sessionStorage.setItem('IsKRA', true);
						$rootScope.formData.IsCKYCUpdate = 'N';
						sessionStorage.setItem('IsCKYCUpdate', 'N')
					}

					if (sessionStorage.getItem('IsCKYCUpdate') == 'Y') {
						$rootScope.formData.IsCKYCUpdate = 'Y';
					}
					if ($rootScope.formData.IsCKYCUpdate == 'Y') {
						$rootScope.formData.IsCKYC = 'Y';
						sessionStorage.setItem('IsCKYC', true);
					}

					if (sessionStorage.getItem('IsAadharVerified') == 'true') {
						$rootScope.formData.IsAadhar = 'Y'
					} else {
						$rootScope.formData.IsAadhar = 'N'
					}
					/*if (!$rootScope.formData.KRA && sessionStorage.getItem('IsCKYC') == 'true') {
					$rootScope.formData.fields.title = $('#kra_title').val();
					$rootScope.formData.fields.cCity = $('#kCity').val();
					}*/

					if ($rootScope.formData.fields.sameAddress) {
						$scope.addressSame = 1;
						$rootScope.formData.fields.paddressType = $('#caddressType').val();
						$rootScope.formData.fields.pStateName = $rootScope.formData.fields.cStateName;
						$rootScope.formData.fields.pStateId = $rootScope.formData.fields.cStateId;
						$rootScope.formData.fields.pDistrict = $rootScope.formData.fields.cDistrict;
						$rootScope.formData.fields.pCity = $rootScope.formData.fields.cCity;
						$rootScope.formData.fields.pAddress1 = $rootScope.formData.fields.cAddress1;
						$rootScope.formData.fields.pAddress2 = $rootScope.formData.fields.cAddress2;
						$rootScope.formData.fields.pAddress3 = $rootScope.formData.fields.cAddress3;
						$rootScope.formData.fields.pPin = $rootScope.formData.fields.cPin;
					} else {
						$rootScope.formData.fields.paddressType = $('#pAddressType').val();
						$rootScope.formData.fields.pCity = $("#city2_value").val();
					}

					if ($rootScope.formData.aadhaarProfile) {
						$rootScope.formData.fields.title = $('#kra_title').val();
						$rootScope.formData.fields.cCity = $rootScope.formData.kraData.APP_COR_CITY;
						$rootScope.formData.fields.pCity = $rootScope.formData.fields.cCity;
						$rootScope.formData.IsAadhar = 'Y'
					}

					if ($rootScope.formData.fields.lastName == null || $rootScope.formData.fields.lastName.toUpperCase() == 'NULL') {
						if ($rootScope.formData.ClientLastname) {
							$rootScope.formData.fields.lastName = $rootScope.formData.ClientLastname
						} else {
							$scope.lmname_KRAError = true;
							$scope.lmNameError = true;
							return false;
						}
					}

					if (!$rootScope.formData.fields.title && $rootScope.webfinacle) {
						if ($('#ktitle').val()) {
							$rootScope.formData.fields.title = $('#ktitle').val();
						} else {
							$rootScope.formData.fields.title = $('#kra_title').val();
						}
						setTimeout(function () {
							$('#oldaddress').prop('disabled', true);
							$('#oldaddress').iCheck('update');
						}, 500)
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
							CAddressLine1: $rootScope.formData.fields.cAddress1,
							CAddressLine2: $rootScope.formData.fields.cAddress2,
							CAddressLine3: $rootScope.formData.fields.cAddress3,
							CCity: $rootScope.formData.fields.cCity,
							CDistrict: $rootScope.formData.fields.cDistrict,
							CState: $rootScope.formData.fields.cStateName,
							CStateID: !angular.isUndefined($rootScope.formData.fields.cStateId) ? $rootScope.formData.fields.cStateId : 0,
							CCountry: 'INDIA',
							CPinCode: $rootScope.formData.fields.cPin,
							PermantTypeID: $rootScope.formData.fields.paddressType,
							PAddressLine1: $rootScope.formData.fields.pAddress1,
							PAddressLine2: $rootScope.formData.fields.pAddress2,
							PAddressLine3: $rootScope.formData.fields.pAddress3,
							PCity: $rootScope.formData.fields.pCity,
							PDistrict: $rootScope.formData.fields.pDistrict,
							PState: $rootScope.formData.fields.pStateName,
							PStateID: !angular.isUndefined($rootScope.formData.fields.pStateId) ? $rootScope.formData.fields.pStateId : 0,
							PCountry: 'INDIA',
							PPinCode: $rootScope.formData.fields.pPin,
							IsAadharUpdate: $rootScope.formData.IsAadharUpdate,
							IsKRAUpdate: $rootScope.formData.IsKRAUpdate,
							IsKRA: $rootScope.formData.IsKRA,
							CKYCUpdate: $rootScope.formData.IsCKYCUpdate,
							CKYCClient: $rootScope.formData.IsCKYC,
							IsAadhar: $rootScope.formData.IsAadhar,
							IsSamePermenantAddress: $scope.addressSame,
							BrowserType: $rootScope.formData.browserType,
							UID: $rootScope.formData.fields.aadharNumber,
							AadharAuthorisation: $rootScope.formData.aadharAuthorize,
							IsDiy: true,
							EncryptToken: $rootScope.EncryptToken
						}
					};

					$rootScope.formData.apiLoading = true;
					
					if ((!$rootScope.formData.KRA && !$rootScope.formData.CKYC) || ($rootScope.formData.IsCKYCUpdate == 'Y' || $rootScope.formData.IsKRAUpdate == 'Y')) {
						if ($rootScope.formData.fields.cAddress1 && $rootScope.formData.fields.cAddress2) {
							if ($rootScope.formData.fields.cAddress1 == $rootScope.formData.fields.cAddress2) {
								$scope.addshouldNotSame = true;
								$rootScope.formData.apiLoading = false;
								return false;
							}
						}
						/*if ($rootScope.formData.fields.cAddress2 && $rootScope.formData.fields.cAddress3) {
						if ($rootScope.formData.fields.cAddress2 == $rootScope.formData.fields.cAddress3) {
						$scope.addshouldNotSame = true;
						$rootScope.formData.apiLoading = false;
						return false;
						}
						}*/
						if ($rootScope.formData.fields.cAddress1 && $rootScope.formData.fields.cAddress3) {
							if ($rootScope.formData.fields.cAddress1 == $rootScope.formData.fields.cAddress3) {
								$scope.addshouldNotSame = true;
								$rootScope.formData.apiLoading = false;
								return false;
							}
						}
						if ($rootScope.formData.fields.sameAddress == false) {
							if ($rootScope.formData.fields.pAddress1 && $rootScope.formData.fields.pAddress2) {
								if ($rootScope.formData.fields.pAddress1 == $rootScope.formData.fields.pAddress2) {
									$scope.addshouldNotSameP = true;
									$rootScope.formData.apiLoading = false;
									return false;
								}
							}
							/*if ($rootScope.formData.fields.pAddress2 && $rootScope.formData.fields.pAddress3) {
							if ($rootScope.formData.fields.pAddress2 == $rootScope.formData.fields.pAddress3) {
							$scope.addshouldNotSameP = true;
							$rootScope.formData.apiLoading = false;
							return false;
							}
							}*/
							if ($rootScope.formData.fields.pAddress1 && $rootScope.formData.fields.pAddress3) {
								if ($rootScope.formData.fields.pAddress1 == $rootScope.formData.fields.pAddress3) {
									$scope.addshouldNotSameP = true;
									$rootScope.formData.apiLoading = false;
									return false;
								}
							}
						}
					}
					if (!$rootScope.formData.KRA && !$rootScope.formData.CKYC) {
						if ($rootScope.formData.fields.cAddress2 == "" || $rootScope.formData.fields.cAddress2 == null || $rootScope.formData.fields.cAddress2 == undefined) {
							$scope.cadr2Error = true;
							$rootScope.formData.apiLoading = false;
							return false;
						}
						if ($rootScope.formData.fields.sameAddress == false) {
							if ($rootScope.formData.fields.pAddress2 == "" || $rootScope.formData.fields.pAddress2 == null || $rootScope.formData.fields.pAddress2 == undefined) {
								$scope.padr2Error = true;
								$rootScope.formData.apiLoading = false;
								return false;
							}
						}
					}
					$scope.cadr2Error = false;
					$scope.padr2Error = false;
					$scope.addshouldNotSame = false;
					$scope.addshouldNotSameP = false;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							sessionStorage.setItem('AxToken', response.EncryptToken);
						} else {
							if ($rootScope.formData.tokenValidation) {
								$rootScope.clearBrowsingData();
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.apiResponseErrorMsg = "Session Timed Out";
								return false;
							}
						}

						if (response.IsSuccess) {
							if ($rootScope.formData.IsKRAUpdate === 'Y') {
								sessionStorage.setItem('IsKRA', true);
							}
							if ($rootScope.formData.IsAadharUpdate === 'Y') {
								sessionStorage.setItem('IsAadhar', false);
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
									'CorrespondenceAddressLine1': $rootScope.formData.fields.cAddress1,
									'CorrespondenceAddressLine2': $rootScope.formData.fields.cAddress2,
									'CorrespondenceAddressLine3': $rootScope.formData.fields.cAddress3,
									'CorrespondenceCity': $rootScope.formData.fields.cCity,
									'CorrespondenceDistrict': $rootScope.formData.fields.cDistrict,
									'CorrespondenceState': $rootScope.formData.fields.cStateName,
									'CorrespondenceCountry': 'INDIA',
									'CorrespondencePinCode': $rootScope.formData.fields.cPin,
									'PermanentType': $("#pAddressType option:selected").text(),
									'PermanentAddressLine1': $rootScope.formData.fields.pAddress1,
									'PermanentPAddressLine2': $rootScope.formData.fields.pAddress2,
									'PermanentAddressLine3': $rootScope.formData.fields.pAddress3,
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
							if (sessionStorage.getItem('IsAadhar') == 'true') {
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
								serverService.apiCall(s_url, sendData).then(function (a) {
									var response = a.data;

									$rootScope.formData.aadharData = JSON.parse(sessionStorage.getItem('aadharClientInfo'));
									$scope.aadharImage = "data:image/jpeg;base64," + $rootScope.formData.aadharData.AadharImagebase64;

									var s_url = "DIYImageUpload";
									var sendData = {
										ImageName: 'CorrespondenceAddress',
										Image: $scope.aadharImage,
										DocumentType: 111,
										ReferenceNumber: $rootScope.formData.ReferenceNumber,
										Extention: 'Image'
									};
									serverService.apiCall(s_url, sendData).then(function (a) {
										var response = a.data;
										if (sessionStorage.getItem('aadhaarData')) {
											sessionStorage.removeItem('aadhaarData')
										}
										$state.go('personalDetails', {
											mobile: $rootScope.formData.EncMobile
										});
									});
								});

							} else {
								if (sessionStorage.getItem('aadhaarData')) {
									sessionStorage.removeItem('aadhaarData')
								}
								$state.go('personalDetails', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						} else {
							$rootScope.formData.apiLoading = false;
							$('#connection').modal('show');
						}
					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
					});
				}
			};

			window.onbeforeunload = function () {
				var Address_Info = new Object();
				Address_Info.firstName = $rootScope.formData.fields.firstName;
				Address_Info.middleName = $rootScope.formData.fields.middleName;
				Address_Info.lastName = $rootScope.formData.fields.lastName;

				if (sessionStorage.getItem('IsKRA') === 'true' || sessionStorage.getItem('IsKRA') === true) {
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
				Address_Info.cAddress1 = $rootScope.formData.fields.cAddress1;
				Address_Info.cAddress2 = $rootScope.formData.fields.cAddress2;
				Address_Info.cAddress3 = $rootScope.formData.fields.cAddress3;
				Address_Info.sameAddress = $rootScope.formData.fields.sameAddress;
				Address_Info.pState = $rootScope.formData.fields.pStateName;
				Address_Info.pStateId = $rootScope.formData.fields.pStateId;
				Address_Info.pDistrict = $rootScope.formData.fields.pDistrict;
				Address_Info.pAddress1 = $rootScope.formData.fields.pAddress1;
				Address_Info.pAddress2 = $rootScope.formData.fields.pAddress2;
				Address_Info.pAddress3 = $rootScope.formData.fields.pAddress3;
				var Address_Info_Post = JSON.stringify(Address_Info);
				Address_Info_Stage = "Address_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
				sessionStorage.setItem(Address_Info_Stage, Address_Info_Post);
				if ($rootScope.formData.fields.aadharNumber) {
					sessionStorage.setItem('RxUID', $rootScope.formData.fields.aadharNumber);
				}
			}

			$scope.modalPop = function (b) {
				if ($scope.aadharOTP) {
					setTimeout(function () {
						$('#oaadhar-number').focus();
					}, 100)
				}
			}

			$scope.closeModal = function () {
				$('#NonKRAVerified').modal('hide');
				setTimeout(function () {
					$('#newaddresse').iCheck('uncheck');
					$scope.$apply();
				}, 100)
			}

			$scope.editAddress = function () {
				$('#NonKRAVerified').modal('hide');
				$scope.finDataShow = false;
				
				$rootScope.formData.KRA = false;
				setTimeout(function () {
					$('#newaddresse12').iCheck('check');
					$('.select').select2();
					$scope.checkradioinit();
					$scope.$apply();
				}, 100)
			}

			$scope.fintoKRA = function () {
				$('#NonKRAVerified').modal('hide');
				$scope.finDataShow = false;
				if (sessionStorage.getItem('IsKRA') == 'true' && !$scope.getProfileData) {
					setTimeout(function () {
						$('#newaddresse').iCheck('check');
						$scope.$apply();
					}, 100)
					$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
					$rootScope.formData.KRA = true;
					if ($rootScope.formData.IsKRAUpdate == 'Y') {
						$scope.krabtn = true;
						//sessionStorage.setItem('IsKRAUpdate', 'Y');
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.changeKRA = true;
						$rootScope.formData.KRA = false;
					} else {
						$rootScope.formData.IsKRAUpdate == 'N';
					}
					// $rootScope.formData.fields.sameAddress = false;
					$scope.kraClientData();
				} else if (sessionStorage.getItem('IsCKYC') == 'true') {
					setTimeout(function () {
						$('#newaddresse').iCheck('check');
						$scope.$apply();
					}, 100)
					$rootScope.formData.CKYC = true;
					if ($rootScope.formData.IsCKYCUpdate == 'Y' || sessionStorage.getItem('IsCKCYUpdate') == 'Y') {
						$scope.ckycbtn = true;
						//sessionStorage.setItem('IsKRAUpdate', 'Y');
						$rootScope.formData.chgAdrDisable = true;
						$rootScope.formData.changeCKYC = true;
						$rootScope.formData.CKYC = false;
					} else {
						$rootScope.formData.IsCKYCUpdate == 'N';
						if (!(sessionStorage.getItem('IsKRA'))) {
							$rootScope.formData.changeCKYC = false;
						}
					}
					$scope.CkyCClientData();
				} else {
					$rootScope.formData.KRA = false;
					$scope.lastnameFreeze = true;
					$rootScope.formData.chgAdrDisable = true;
					if (sessionStorage.getItem("CFirstname")) {
						$rootScope.formData.ClientFirstname = sessionStorage.getItem("CFirstname");
					}
					if (sessionStorage.getItem("CMiddlename")) {
						$rootScope.formData.ClientMiddlename = sessionStorage.getItem("CMiddlename");
					}
					if (sessionStorage.getItem("CLastname")) {
						$rootScope.formData.ClientLastname = sessionStorage.getItem("CLastname");
					}
					// if (sessionStorage.getItem("CLastname") == '' || sessionStorage.getItem("CLastname") == null) {
					// 	$scope.lastnameFreeze = false;
					// }
					$rootScope.formData.fields.cAddress1 = '';
					$rootScope.formData.fields.cAddress2 = '';
					$rootScope.formData.fields.cAddress3 = '';
					$rootScope.formData.fields.cStateName = '';
					$rootScope.formData.fields.cDistrict = '';
				}
			}
		}
	]);