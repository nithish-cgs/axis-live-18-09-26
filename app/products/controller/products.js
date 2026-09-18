mainApp.controller('productsController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {


	$(document.body).removeClass('modal-open');
	$('.modal-backdrop').remove();
	$scope.defaultPlan = true;
	$scope.derivativesDisable = true;
	$rootScope.formData.stageInfo = '4';
	$scope.owlitem6 = 2;
	$scope.owlitem = 3;
	$scope.planList = [];
	$rootScope.result = false;
	$scope.psArray = 0;
	$scope.productAction = false;
	$scope.UBank = false;
	$scope.couponcode = "";
	$rootScope.newLandingTerms = false;


	if (sessionStorage.getItem('uBank')) {
		$scope.UBank = true;
	}
	// if(sessionStorage.getItem('utm_promoCode') && $scope.UBank){
	// 	$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode');
	// 	$scope.promoDisabled = true;
	// 	$scope.hidePromo = false;
	// 	$scope.appliedPromo = false;
	// }

	$scope.getdetails = function () {

		if ($scope.chkselct == true)

			$scope.result = true;
		else

			$scope.result = false;

	}

	if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
		if (sessionStorage.getItem('AxNo') != null) {
			$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
			$rootScope.getDIYStatus();
		} else {
			window.location.href = (serverService.getHome());
		}
	}

	$scope.displaysInfoStatus = false;
	if (sessionStorage.getItem('RxProduct') != null) {
		$scope.rxProduct = sessionStorage.getItem('RxProduct');
	}

	if (sessionStorage.getItem('IsKRA') != null) {
		$scope.formData.KRASuccess = (sessionStorage.getItem('IsKRA'));
	}
	if (sessionStorage.getItem('ibiszeropayment') != null && $rootScope.webfinacle) {
		$scope.ibiszeropayment = true;
	}
	if (sessionStorage.getItem('searchParams')) {
		$rootScope.searchParams = JSON.parse(sessionStorage.getItem('searchParams'));
	}
	if ($rootScope.searchParams.utm_source === "Investor_App" ||$rootScope.searchParams.utm_source ==='Traders_App_Mobile'||$rootScope.searchParams.utm_source ==='IFCHITTORGARH'||$rootScope.searchParams.utm_source === 'google_search' ||$rootScope.searchParams.utm_source === 'google_dv360') {
		$rootScope.newLandingTerms = true;
		
	}
	$scope.productDemat = 'NSDL';

	if ($rootScope.formData.RMModule) {
		$('#cdsl').prop('checked', false);
		$('#nsdl').prop('checked', true);
	} else {
		$('#cdsl').prop('checked', false);
		$('#nsdl').prop('checked', true);
	}

	$rootScope.formData.makePayment = true;
	if (sessionStorage.getItem('isPaymentCompleted') != null && sessionStorage.getItem('isPaymentCompleted') == 'true') {
		$rootScope.formData.makePayment = false;
	} else {
		$rootScope.formData.makePayment = true;
	}
	if(sessionStorage.getItem('siddhiApp') == true||sessionStorage.getItem('siddhiApp')=="true"){
		$rootScope.siddhiApp=true;
	}
	$scope.owlSet = function () {
		$scope.owlOptionsTestimonials = {
			loop: false,
			autoPlay: 4000,
			stopOnHover: true,
			slideSpeed: 300,
			paginationSpeed: 600,
			items: 3,
			nav: true,
			dots: false,
			autoWidth: true,
			navText: ["<img src='assets/images/leftarrowNew.png'>", "<img src='assets/images/rightarrowNew.png'>"],
			center: false,
			responsive: {
				0: {
					items: 1,
					nav: true,
					autoWidth: true,
				},
				600: {
					items: $scope.owlitem6,
					nav: true,
					touchDrag: false,
					mouseDrag: false,
					autoWidth: true,
				},
				1000: {
					items: $scope.owlitem,
					nav: true,
					touchDrag: false,
					mouseDrag: false,
					autoWidth: true,
				}
			}
		}
	}

	$scope.getOverallStatusEmailverify = function () {
		var s_geturl = "GetOverallStatusDIY";
		$rootScope.formData.apiLoading = true;
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		};
		serverService.apiCall(s_geturl, sendData).then(function (a) {
			var response = a.data
			$rootScope.siddhiApp=response.SiddhiApp
			sessionStorage.setItem('siddhiApp', $rootScope.siddhiApp);
				if (response.IsSuccess) {
					if (response.CouponCode) {
						$rootScope.jio = true;
						$scope.couponcode = response.CouponCode;
						$scope.$evalAsync();
					}
					if (response.RMTeam) {
						sessionStorage.setItem('RMTeam', response.RMTeam);
						$rootScope.formData.RMTeam = response.RMTeam;
					} else {
						sessionStorage.removeItem('RMTeam');
					}if(response.OverallStatusList[1].SPStatus!="Y"){
						$rootScope.BlankSatge=true;
						$state.go('address');
						return false;
					}else if(response.OverallStatusList[4].SPStatus!="Y"){
						$state.go('personalDetails');
						return false;
					}
					else if(response.OverallStatusList[3].SPStatus!="Y"){
						$state.go('bank');
						return false;
					}
					else if (response.OverallStatusList[0].IsEmailVerified == true) {
						$rootScope.verifyemail = false;
						$rootScope.verifyEmailDiv = false;
					} else {
						$rootScope.verifyemail = true;
						$rootScope.verifyEmailDiv = true;
						$rootScope.verifyemail = true;
						$rootScope.firstCompleted = true;
						$rootScope.secondCompleted = true;
						$rootScope.thirdCompleted = false;
						$rootScope.fourthCompleted = false;
						$rootScope.fifthCompleted = false;
						$rootScope.formData.aadharhide = true;
						$rootScope.wizardShow = true;
						$state.go('personalDetails', {
							mobile: $rootScope.formData.EncMobile
						});
						return false;
					}
				}else if(!response.IsSuccess && response.ErrorCode == '-1'){
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
					paninformation.show();
					return
				}
		})
	}

	$scope.getOverallStatusEmailverify()
	$scope.getDPDetails = function () {
		var u_url = "DIYGetThirdPartyBankDetailsByReferenceNumber";

		var u_data = {
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"PanNumber": $rootScope.formData.fields.panNumber,
			"EncryptToken": ""
		}
		serverService.apiCall(u_url, u_data).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {

				if (response.BankDetailsList) {
					if (response.BankDetailsList[0].DpId) {
						$rootScope.formData.dpNumber = response.BankDetailsList[0].DpId;
						$scope.dpNotNull = true;
					} else {
						$rootScope.formData.dpNumber = '';
						$scope.dpNotNull = false;
					}
					$rootScope.formData.bankDpNumber = '';
					if (response.BankDetailsList[0].DematBankId) {
						$scope.nsdlNumber = response.BankDetailsList[0].DematBankId;
					}


					if (response.BankDetailsList[0].DematCDSLBankId) {
						$scope.cdslNumber = response.BankDetailsList[0].DematCDSLBankId;
					}
					if (response.BankDetailsList[0].UTMSource) {
						$scope.utm_sourcenew = response.BankDetailsList[0].UTMSource;
						if($scope.utm_sourcenew =='Investor_App' || $scope.utm_sourcenew =='Traders_App_Mobile'|| $scope.utm_sourcenew =='IFCHITTORGARH'||$scope.utm_sourcenew == 'google_search'||$scope.utm_sourcenew == 'google_dv360' ){
						$rootScope.newLandingTerms = true;
						}
					}
					if(response.BankDetailsList[0].UTMSource =='CreditCard'){
						$rootScope.CreditCard = true;
					}
					$scope.bankDp = response.BankDetailsList[0].Dp;

					$scope.UtmBankName = response.BankDetailsList[0].UTMBankName;
					$rootScope.dematType = response.BankDetailsList[0].Demattype;
					if (response.BankDetailsList[0].Dp == 'Y') {
						$scope.dpBank = true;

						if ($rootScope.dematType == 'NDSL') {
							$('#dpcdsl').prop('checked', false);
							$('#dpnsdl').prop('checked', true);
							$rootScope.formData.bankDpNumber = $scope.nsdlNumber;
						} else {
							$('#dpcdsl').prop('checked', false);
							$('#dpnsdl').prop('checked', true);
							if ($scope.nsdlNumber) {
								$rootScope.formData.bankDpNumber = $scope.nsdlNumber;
							}
						}

					} else {
						$scope.dpBank = false;
					}
					if (response.BankDetailsList[0].LCCode) {
						$rootScope.formData.assistedLCCode = response.BankDetailsList[0].LCCode;
						$scope.freezeLC = true;
					}
					if (response.BankDetailsList[0].LGCode) {
						$rootScope.formData.assistedLGCode = response.BankDetailsList[0].LGCode;
						$scope.freezeLG = true;
					}
					if (response.BankDetailsList[0].PlanId) {
						$scope.dpProductId = response.BankDetailsList[0].PlanId;
						$scope.selectedProductID = $scope.dpProductId;
						$scope.defaultPlan = false;
						$scope.utmHide = true;
						$scope.owlitem = 1;
						$scope.owlitem6 = 1;
						for (var i = 0; i < $scope.allPlanList.length; i++) {
							if ($scope.allPlanList[i].ProductId == $scope.dpProductId) {
								$scope.planList[0] = $scope.allPlanList[i];
								$scope.dpProductId = $scope.allPlanList[i].ProductId;
								if ($scope.allPlanList[i].TotalPayableAmount == 0 || $scope.allPlanList[i].IswaivedOff) {
									$scope.iszeropayment = true;
									if ($scope.allPlanList[i].IswaivedOff) {
										$scope.hidePromo = true;
										$scope.IswaivedOff = true;
									}
								} else {
									$scope.iszeropayment = false;

								}
							}
						}

						if (!$scope.planList[0] || $scope.dpProductId) {
							$('.owl-carousel').trigger('destroy.owl.carousel');
							$('.owl-carousel').find('.owl-stage-outer').html();
							$('.owl-carousel').removeClass('owl-loaded');
							$scope.planList = [];
							var url = "GetALLPlanByBusinessType";
							
							var sendData = {
								ReferenceNumber: $rootScope.formData.eRefNumber,
								BusinessType: $rootScope.uBank ? 'UB' : $scope.dpProductId,
								Mode: $rootScope.uBank ? 'U' : "W",
								SiddhiApp:$rootScope.siddhiApp,

							}
							serverService.apiCall(url, sendData).then(function (a) {
								var response = a.data;
								$rootScope.formData.apiLoading = false;
								if(!response.IsSuccess && response.ErrorCode == '-1'){
									$rootScope.formData.apiLoading = false;
									$rootScope.formData.panStatus1 = response.ErrorMessage;
									var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
											backdrop: 'static',
											keyboard: false
										});
									paninformation.show();
									return
								}
								$scope.allPlanList = response;
								if (response) {
									if (response.length > 0) {
										$scope.planList = $scope.allPlanList;
										if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
											$scope.iszeropayment = true;
											if ($scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
												$scope.hidePromo = true;
												$scope.IswaivedOff = true;
											}
										} else {
											$scope.iszeropayment = false;
										}
										if ($scope.planList[0].ProductUIType == 1) {
											$scope.productAction = false;
										} else {
											$scope.productAction = true;
										}
										if ($scope.allPlanList[0].Isfreedomplan) {
											$scope.freedomPlan = true;
										} else {
											$scope.freedomPlan = false;
										}
										$scope.owlSet();
										$scope.utmHide = false;
									}
								}
							});
						}
						setTimeout(function () {
							$('#plan' + $scope.dpProductId).removeClass('d-none');
						}, 300);
					} else {
						$scope.planList = $scope.allPlanList;
					}
					if (response.BankDetailsList[0].Segment) {
						var segment = response.BankDetailsList[0].Segment;
						if (segment == 2) {
							$('#derivativesAll').prop('checked', true);
							$('#equityderivatives').prop('checked', true);
							$('#commodityderivatives').prop('checked', true);
							$('#currency').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 3) {
							$('#derivativesAll').prop('checked', true);
							$('#commodityderivatives').prop('checked', true);
							$('#currency').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 4) {
							$('#derivativesAll').prop('checked', true);
							$('#equityderivatives').prop('checked', true);
							$('#currency').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 5) {
							$('#derivativesAll').prop('checked', true);
							$('#equityderivatives').prop('checked', true);
							$('#commodityderivatives').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 6) {
							$('#derivativesAll').prop('checked', true);
							$('#equityderivatives').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 7) {
							$('#derivativesAll').prop('checked', true);
							$('#commodityderivatives').prop('checked', true);
							$scope.derivativesDisable = false;
						}
						if (segment == 8) {
							$('#derivativesAll').prop('checked', true);
							$('#currency').prop('checked', true);
							$scope.derivativesDisable = false;
						}
					}
					if (response.BankDetailsList[0].PromoCode) {
						$rootScope.formData.promoCode = response.BankDetailsList[0].PromoCode;
						$scope.utmPromo = response.BankDetailsList[0].PromoCode;
						$scope.promoDisabled = true;
					} else {
						$rootScope.formData.promoCode = '';
						$scope.promoDisabled = false;
					}
				}
			} else {
				$scope.planList = $scope.allPlanList;
				$scope.owlSet();
			}
			setTimeout(function () {

				$scope.getProductInfo();
			}, 500)
		}, function (error) {
			$scope.planList = $scope.allPlanList;
			$scope.getProductInfo();
		});
	}

	var searchObject = $location.search();
	if (!angular.isUndefined(searchObject.Status)) {
		if (searchObject.Status === 'Success') {
			sessionStorage.removeItem('productStage');
			sessionStorage.setItem('isPaymentCompleted', true);
			$rootScope.formData.makePayment = false;
			dataLayer.push({
				"event": "payment-success",
				"unique-payment-id": $rootScope.formData.ReferenceNumber
			});
			$rootScope.formData.paymentPixel = true;
		} else {
			$rootScope.apiResponseErrorMsg = searchObject.Status;
		}
	}
	$scope.setDemat = function (demat) {
		var s_url = "DIYSetDefaultDemat";
		var sendData = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber,
			"DematScheme": demat
		}
		serverService.apiCall(s_url, sendData);
	}

	$('.depository-section').on('click', function () {
		$scope.setDemat('NSDL');
		$scope.$apply();
	});
	$('#cdsl').on('click', function () {
		$scope.setDemat('CDSL');
		$scope.$apply();
	});

	$scope.prdSelect = function (i) {
		$scope.psArray = i;

		if ($scope.planList[i].TotalPayableAmount == 0 || !$scope.planList[i].TotalPayableAmount || $scope.planList[i].IswaivedOff || $scope.planList[i].Isfreedomplan) {
			$scope.iszeropayment = true;
		} else {
			$scope.iszeropayment = false;
		}
		if ($scope.planList[i].TotalPayableAmount == 0){
			$rootScope.formData.makePayment = false;
			$rootScope.amountPayable=false;
		}else{
			$rootScope.formData.makePayment = true;
			$rootScope.amountPayable=true;
		}
		if (i == 0) {
			$scope.productAction = true;
			if ($rootScope.webfinacle && $scope.encPromo) {
				$scope.hidePromo = true;
				if ($scope.ibiszeropayment) {
					$scope.iszeropayment = true;
				}
			} else {
				$scope.hidePromo = false;
			}
		} else {
			$scope.productAction = true;
			$scope.hidePromo = false;
		}
		
		if ($scope.planList[i].OpeningFee == 0 || !$scope.planList[i].OpeningFee) {
			$scope.hidePromo = true;
		} else {
			$scope.hidePromo = false;
		}
		if ($scope.planList[i].ProductUIType == 1) {
			$scope.productAction = false;
		} else {
			$scope.productAction = true;
		}
		$scope.promoSuccess = false;
		$scope.promoDone = false;
		$scope.promoFailed = false;
		$scope.selectedProductID = $scope.planList[i].ProductId;

		if ($scope.planList[i].Isfreedomplan) {
			$scope.freedomPlan = true;
			$scope.iszeropayment = true;
			$scope.hidePromo = true;
		} else {
			$scope.freedomPlan = false;
			$scope.hidePromo = false;
			$rootScope.formData.promoCode = '';
		}
		
		if($scope.planList[i].PlanName=="PROSPERITY" || $scope.planList[i].PlanName=="Axis Direct Option Plans - Silver One" || $scope.planList[i].PlanName=="Axis Direct Option Plans - Silver Two"){
			$rootScope.formData.promoCode=$scope.encPromo;
			$scope.promoDone = true;
			$scope.hidePromo = true;
			$scope.Iszeropayment=false;
			$rootScope.formData.makePayment=false;
			$rootScope.amountPayable=false;
		}
		if($scope.planList[i].PlanName=="ASL Traders Plan"){
			$rootScope.newLandingTerms = true;
		}
		// if($scope.UBank){
		// 	$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode');
		// 	if($rootScope.formData.promoCode){
		// 		$scope.promoDisabled = true;
		// 		$scope.hidePromo = false;
		// 		$scope.appliedPromo = false;
		// 		$scope.promoDone = true;
		// 	}
			
		// }
		//$scope.productSelect($scope.planList[i].ProductId);
	}

	$scope.productSelect = function (paymentType) {
		$scope.promoSuccess = false;
		$scope.promoDone = false;
		$scope.promoFailed = false;
		$scope.selectedProductID = paymentType;
		setTimeout(function () {
			$('input[name=axisDirect][value=' + paymentType + ']').prop('checked', true);
			var a = $('input[name=axisDirect]:checked').attr('id');
			if (a) {
				var b = a.split('-');
				var c = b[1];
				$('.owl-carousel').trigger('to.owl.carousel', c);

				$scope.psArray = c;

				if ($scope.planList[c].ProductUIType == 1) {
					$scope.productAction = false;
				} else {
					$scope.productAction = true;
				}
				if ($scope.planList[c].OpeningFee == 0 || !$scope.planList[c].OpeningFee || $scope.planList[c].Isfreedomplan) {
					$scope.hidePromo = true;
				} else {
					$scope.hidePromo = false;
				}
				if($rootScope.newLandingTerms){
					$scope.hidePromo = false;
				}
				if ($scope.planList[c].Isfreedomplan) {
					$scope.freedomPlan = true;
				} else {
					$scope.freedomPlan = false;
				}
				if($scope.planList[c].PlanName=="PROSPERITY" || $scope.planList[c].PlanName=="Axis Direct Option Plans - Silver One" || $scope.planList[c].PlanName=="Axis Direct Option Plans - Silver Two"){
					$rootScope.formData.promoCode=$scope.encPromo;
					$scope.promoDone = true;
					$scope.hidePromo = true;
					$scope.Iszeropayment=false;
			$rootScope.formData.makePayment=false;
			$rootScope.amountPayable=false;
				}
				if($scope.planList[c].PlanName=="ASL Traders Plan"){
			$rootScope.newLandingTerms = true;
		}
				$scope.$apply();
			}
		}, 200)
	}

	if ($rootScope.formData.RMModule) {

		if (!$rootScope.formData.RMCode) {
			$rootScope.formData.RMCode = sessionStorage.getItem('RMCode')
		}
		if (!$rootScope.formData.RMTeam) {
			$rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam')
		}

		if ($rootScope.formData.RMTeam == 'ASL') {
			$rootScope.formData.assistedLGCode = '';
			$rootScope.formData.assistedLCCode = $rootScope.formData.RMCode;
		} else {
			$rootScope.formData.assistedLGCode = $rootScope.formData.RMCode;
			$rootScope.formData.assistedLCCode = '';
		}
	}

	$scope.getProductPaymentActionDetails = function () {
		$rootScope.formData.apiLoading = true;
		//var url = "GetALLPlanList?ReferenceNumber=" + $rootScope.formData.ReferenceNumber;
		var url = "GetALLPlanByBusinessType";
		var m = "W";
		var btype = "DIY";

		var sm = sessionStorage.getItem('mode');

		if ($rootScope.webfinacle || (sm && sm == 'I')) {
			m = "I";
			btype = "Internet Banking"
		} else if ($rootScope.webJana || (sm && sm == 'J')) {
			m = "J";
			btype = "Jana Bank"
		} else if (($rootScope.formData.RMModule || $rootScope.rmmodewb) && sessionStorage.getItem('RMTeam')) {
			$rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam');
			btype = $rootScope.formData.RMTeam;
			m = 'W';
		} else if (sessionStorage.getItem('RMTeam')) {
			$rootScope.formData.RMTeam = sessionStorage.getItem('RMTeam');
			btype = $rootScope.formData.RMTeam;
			m = 'W';
		}
		
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			BusinessType: $rootScope.uBank ? 'UB' : btype,
			Mode: $rootScope.uBank ? 'U' : "W",
			SiddhiApp:$rootScope.siddhiApp,
		}
		//	serverService.getApi(url).then(function (a) {
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			$scope.allPlanList = response;
			if (response) {
				if (response.length > 0) {
					for (var i = 0; i < response.length; i++) {
						if (response[i].DefaultProduct) {
							$scope.defaultPlanId = response[i].ProductId;
							if ($scope.allPlanList[i].TotalPayableAmount == 0 || $scope.allPlanList[i].IswaivedOff || $scope.allPlanList[i].Isfreedomplan) {
								$scope.iszeropayment = true;
								if ($scope.allPlanList[i].IswaivedOff || $scope.allPlanList[i].Isfreedomplan) {
									$scope.hidePromo = true;
									$scope.IswaivedOff = true;
								}
							} else {
								$scope.iszeropayment = false;
							}
						}
						$rootScope.formData.referralCode = response[i].ReferralCode;

						if (!$rootScope.webfinacle) {
							//$scope.defaultPlan = false;
							var productId = response[0].ProductId;
							var demat = response[0].CusDematType

								setTimeout(function () {
									if (productId && (!$scope.responseProductId)) {
										setTimeout(function () {
											//document.getElementById(productId).checked = true;
										}, 500)
									}
									if (demat == 'CDSL') {
										$('#cdsl').prop('checked', true);
										$('#nsdl').prop('checked', false);
									} else {
										$('#cdsl').prop('checked', false);
										$('#nsdl').prop('checked', true);
									}
								}, 100)
						}
					}
					// if(response[0].JanaFlag == 'Y'){
					// 	$rootScope.formData.promoCode = 'JSW100';
					// 	$('#promoCode').val($rootScope.formData.promoCode);
					// 	$scope.promoDisabled = true;
					// 	$scope.appliedPromo = true;
					// 	$scope.applyPromo();
					// }
					if (!$scope.defaultPlanId) {
						$scope.defaultPlanId = response[0].ProductId;
						if ($scope.allPlanList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
							$scope.iszeropayment = true;
							if ($scope.allPlanList[0].IswaivedOff) {
								$scope.hidePromo = true;
								$scope.IswaivedOff = true;
							}
						} else {
							$scope.iszeropayment = false;
						}
					}
					if (response[0].PromoCodeEnc) {
						$scope.encPromo = response[0].PromoCodeEnc;
						$scope.hidePromo = false;
						// $scope.iszeropayment = true;
					}
					if ($rootScope.webfinacle && (!$rootScope.formData.isPaymentCompleted && !$rootScope.formData.productApproved)) {
						$scope.planList = $scope.allPlanList;
						if (response[0].PromoCodeEnc) {
							$scope.encPromo = response[0].PromoCodeEnc;

							$scope.hidePromo = true;
						}

						$scope.owlOptionsTestimonials = {
							loop: false,
							autoPlay: 4000,
							stopOnHover: true,
							slideSpeed: 300,
							paginationSpeed: 600,
							items: 3,
							nav: true,
							dots: false,
							autoWidth: true,
							navText: ["<img src='assets/images/leftarrowNew.png'>", "<img src='assets/images/rightarrowNew.png'>"],
							center: false,
							responsive: {
								0: {
									items: 1,
									nav: true,
									autoWidth: true,
								},
								600: {
									items: $scope.owlitem6,
									nav: true,
									autoWidth: true,
								},
								1000: {
									items: $scope.owlitem,
									nav: true,
									autoWidth: true,
								}
							}
						}

						if (!$scope.responseProductId || ($scope.responseProductId == $scope.defaultPlanId)) {
							$scope.productSelect($scope.defaultPlanId);
							if ($scope.encPromo && $scope.defaultPlanId) {
								$scope.appliedPromo = true;
								$scope.applyPromo();
							}
							setTimeout(function () {
								if (document.getElementById($scope.defaultPlanId)) {
									document.getElementById($scope.defaultPlanId).checked = true;
								}
							}, 100)
						}
						$scope.getProductInfo();
					} else {
						if ($rootScope.formData.RMModule) {
							$scope.planList = $scope.allPlanList;
							$scope.owlSet();
							$scope.getProductInfo();
						} else {
							if (!$rootScope.fifthCompleted) {
								$scope.planList = $scope.allPlanList;
								$scope.getDPDetails();
								$scope.owlSet();
								$scope.getProductInfo();
							} else {
								$scope.planList = $scope.allPlanList;
								$scope.getDPDetails();
								$scope.owlSet();
								$scope.getProductInfo();
							}
						}
					}
				}
			}

		});
	}

	$scope.getProductInfo = function () {
		//if (!$rootScope.getAPI || !$rootScope.formData.assistedLGCode || !$rootScope.formData.assistedLCCode) {
		if (!$rootScope.getAPI) {
			$rootScope.formData.apiLoading = true;

			var s_url = "DIYGetProductInfoByReferenceNumber";
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber,
				IsDiy: true,
				EncryptToken: $rootScope.EncryptToken
			}
			serverService.apiCall(s_url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.overallStatus();
				$rootScope.formData.apiLoading = false;
				$('#equity').prop('checked', true);
				$('#mutualfunds').prop('checked', true);
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					sessionStorage.setItem('AxToken', response.EncryptToken);
				} else {
					if ($rootScope.formData.tokenValidation) {
						$rootScope.clearBrowsingData();
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
								backdrop: 'static',
								keyboard: false
							});
						APIResponseModal.show();
						$rootScope.apiResponseErrorMsg = "Session Timed Out";
						return false;
					}
				}
				if (response.IsSuccess) {
					sessionStorage.setItem('ProductId', response.ObjCDIYProduct.ProductId);
					if ($scope.planList) {
						for (var j = 0; j < $scope.planList.length; j++) {
							if ($scope.planList[j].ProductId == response.ObjCDIYProduct.ProductId) {
								$scope.prdExists = true;
								if (response.ObjCDIYProduct.TotalPayableAmount != 0 && !($scope.planList[j].IswaivedOff) && !$scope.planList[j].Isfreedomplan) {
									$scope.iszeropayment = false;
								}
							}
						}
					}

					$rootScope.formData.assistedLGCode = response.ObjCDIYProduct.AssistLGCode;

					$rootScope.formData.assistedLCCode = response.ObjCDIYProduct.AssistLCCode;
					$rootScope.formData.referralCode = response.ObjCDIYProduct.ReferralCode;
					$scope.getProductDetails = true;
					if (response.ObjCDIYProduct.TotalPayableAmount == 0 || response.ObjCDIYProduct.OriginalPaymentStatus == 'Y'){
						$rootScope.formData.makePayment = false;
						$rootScope.amountPayable=false;
					}else{
						$rootScope.formData.makePayment = true;
						$rootScope.amountPayable=true;
					}
					if ($rootScope.formData.assistedLGCode) {
						$scope.freezeLG = true;
					}
					if ($rootScope.formData.assistedLCCode) {
						$scope.freezeLC = true;
					}
					if (sessionStorage.getItem('utm_promoCode')) {
						$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode')
							$scope.promoDisabled = true;
					} else {
						if (response.ObjCDIYProduct.PromoCode) {
							$rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;
						}
						if ($rootScope.webfinacle && ($scope.paymentProductId == $scope.responseProductId)) {
							$scope.appliedPromo = true;

						}
					}
					if($rootScope.siddhiApp){
						$scope.appliedPromo = true;
					}
					if (response.ObjCDIYProduct.PromoCode) {
						$rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;
					}
					if (response.ObjCDIYProduct.PromoCode) {
						$scope.promoDone = true;
					}
					if (response.ObjCDIYProduct.BSEEquityFandO == 'Y' || response.ObjCDIYProduct.NSEEquityFandO == 'Y') {
						$('#equityderivatives').prop('checked', true);
						$('#derivativesAll').prop('checked', true);
						$scope.derivativesSelect = true;
					}

					//Currency Derivatives
					if (response.ObjCDIYProduct.NSECurrencyFandO == 'Y' || response.ObjCDIYProduct.BSECurrencyFandO == 'Y') {
						$('#currency').prop('checked', true);
						$('#derivativesAll').prop('checked', true);
						$scope.derivativesSelect = true;
					}

					//Commodity
					if (response.ObjCDIYProduct.MCXCommodity == 'Y' || response.ObjCDIYProduct.NCDXCommodity == 'Y') {
						$('#commodityderivatives').prop('checked', true);
						$('#derivativesAll').prop('checked', true);
						$scope.derivativesSelect = true;
					}

					if (response.ObjCDIYProduct.SLB == 'Y') {
						$('#slb').prop('checked', true);
						$scope.slb = 'Y';
						$rootScope.SLBsuccess = true;
					} else {
						$('#slb').prop('checked', false);
						$scope.slb = 'N';
						$rootScope.SLBsuccess = false;
					}

					//Investment Products
					if (response.ObjCDIYProduct.BSEMutualFunds == 'Y' || response.ObjCDIYProduct.NSEMutualFunds == 'Y') {
						$('#mutualfunds').prop('checked', true);
					} else {
						$('#mutualfunds').prop('checked', false);
					}
					if (response.ObjCDIYProduct.DematType == 'CDSL') {
						$('#cdsl').prop('checked', true);
						$('#nsdl').prop('checked', false);
					}

					if (response.ObjCDIYProduct.DematType == 'NSDL') {
						$('#cdsl').prop('checked', false);
						$('#nsdl').prop('checked', true);
					}

					$scope.productDemat = response.ObjCDIYProduct.DematType;
					$rootScope.formData.bankDpNumber = response.ObjCDIYProduct.BankID;
					$rootScope.formData.dpNumber = response.ObjCDIYProduct.DpId;

					if ($rootScope.formData.bankDpNumber || $rootScope.formData.dpNumber) {
						$scope.dpBank = true;
						$scope.bankDp = "Y";
					}

					if (response.ObjCDIYProduct.AssistLGCode != "" && response.ObjCDIYProduct.AssistLGCode != null &&
						$rootScope.formData.assistedLCCode != "" && $rootScope.formData.assistedLCCode != null) {
						$rootScope.formData.assistedLGCode = response.ObjCDIYProduct.AssistLGCode;
						$rootScope.formData.assistedLCCode = response.ObjCDIYProduct.AssistLCCode;
					}
					if (response.ObjCDIYProduct.ProductId) {
						var productId = "";
						productId = response.ObjCDIYProduct.ProductId;
						$scope.prodIdfree= response.ObjCDIYProduct.ProductId;
						$scope.responseProductId = response.ObjCDIYProduct.ProductId;
						$scope.selectedProductID = response.ObjCDIYProduct.ProductId;
						$scope.PlanEditable = response.ObjCDIYProduct.PlanEditable;
						if (($rootScope.formData.isPaymentCompleted || $rootScope.formData.productApproved)&&!$scope.PlanEditable) {
							//$('input[type=checkbox]').prop('disabled', true);
							$scope.derivativesDisable = true;
							//$('.account-plan-container input').prop('disabled', true);
							$scope.disableAll = true;
							$scope.promoDisabled = true;
						}
						if($scope.PlanEditable){
							$scope.promoDone = true;
							$scope.hidePromo = false;
						}
						if (!$scope.prdExists) {
							$('.owl-carousel').trigger('destroy.owl.carousel');
							$('.owl-carousel').find('.owl-stage-outer').html();
							$('.owl-carousel').removeClass('owl-loaded');
							$scope.planList = [];
							var url = "GetALLPlanByBusinessType";
							var sendData = {
								ReferenceNumber: $rootScope.formData.eRefNumber,
								BusinessType: $rootScope.uBank ? 'UB' : $scope.responseProductId,
								Mode: $rootScope.uBank ? 'U' : "W",
								SiddhiApp:$rootScope.siddhiApp,
							}
							serverService.apiCall(url, sendData).then(function (a) {
								var response = a.data;
								$rootScope.formData.apiLoading = false;
								$scope.allPlanList = response;

								if (response) {
									if (response.length > 0) {
										$scope.planList[0] = $scope.allPlanList[0];
										if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
											$scope.iszeropayment = true;
											if ($scope.allPlanList[0].IswaivedOff || $scope.allPlanList[0].Isfreedomplan) {
												$scope.hidePromo = true;
												$scope.IswaivedOff = true;
											}
											if ($scope.allPlanList[0].Isfreedomplan) {
												$scope.freedomPlan = true;
											} else {
												$scope.freedomPlan = false;
											}
										} else {
											$scope.iszeropayment = false;
										}
										if ($scope.planList[0].ProductUIType == 1) {
											$scope.productAction = false;
										} else {
											$scope.productAction = true;
										}
										setTimeout(function () {
											$scope.owlSet();
										}, 500)
										$scope.utmHide = false;
										$scope.productSelect($scope.responseProductId);
									}
								}
							});

						} else {

							$scope.productSelect($scope.responseProductId);
						}
					}

					// if($scope.UBank){
					// 	$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode');
					// 	if($rootScope.formData.promoCode){
					// 		$scope.promoDisabled = true;
					// 		$scope.hidePromo = false;
					// 		$scope.appliedPromo = false;
					// 		$scope.promoDone = true;
					// 	}
						
					// }

				}else if(!response.IsSuccess && response.ErrorCode == '-1'){
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
					paninformation.show();
					return
				} else {
					if($rootScope.siddhiApp){
						var aurl = 'GetSiddhiAppdetails?Referencenumber='+$rootScope.formData.eRefNumber;
						$rootScope.formData.apiLoading = true;
						serverService.getApi(aurl).then(function (a) {
							$rootScope.formData.apiLoading = false;
							var response = a.data;	
							if(response.IsSuccess){
								$rootScope.formData.assistedLCCode=response.SiddhiResponse.LCCode;
								$rootScope.formData.assistedLGCode=response.SiddhiResponse.LGCode;
								if ($rootScope.formData.assistedLGCode) {
									$scope.freezeLG = true;
								}
								if ($rootScope.formData.assistedLCCode) {
									$scope.freezeLC = true;
								}
								$scope.appliedPromo = true;
							}
						})
					}
					if (!$scope.defaultPlan && $scope.dpProductId) {
						$scope.productSelect($scope.dpProductId);
						if ($scope.utmPromo) {
							setTimeout(function () {
								$scope.applyPromo();
							}, 500)
						}
					} else if ($scope.defaultPlanId) {
						$scope.productSelect($scope.defaultPlanId);

						if ($scope.utmPromo) {
							setTimeout(function () {
								$scope.applyPromo();
							}, 500)
						}

					} else {
						$scope.productSelect($scope.planList[0].ProductId);
						if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
							$scope.iszeropayment = true;
							if ($scope.allPlanList[0].IswaivedOff) {
								$scope.hidePromo = true;
								$scope.IswaivedOff = true;
							}
						} else {
							$scope.iszeropayment = false;
						}
					}

				}
			});
		} else {
			if (!$scope.defaultPlan && $scope.dpProductId) {
				$scope.productSelect($scope.dpProductId);
				if ($scope.utmPromo) {
					setTimeout(function () {
						$scope.applyPromo();
					}, 500)
				}
			} else if ($scope.defaultPlanId) {
				$scope.productSelect($scope.defaultPlanId);
			} else {
				$scope.productSelect($scope.planList[0].ProductId);
				if ($scope.planList[0].TotalPayableAmount == 0 || $scope.allPlanList[0].IswaivedOff) {
					$scope.iszeropayment = true;
					if ($scope.allPlanList[0].IswaivedOff) {
						$scope.hidePromo = true;
						$scope.IswaivedOff = true;
					}
				} else {
					$scope.iszeropayment = false;
				}
			}
		}

	}

	$scope.getProductPaymentActionDetails();

	$("html, body").animate({
		scrollTop: 0
	}, "slow");

	// Preselect and disable fields for Equity and Mutual Funds
	$('#equity').prop('checked', true);
	$('#equity').prop('disabled', true);
	$('#mutualfunds').prop('checked', true);
	$('#mutualfunds').prop('disabled', true);

	$(".select").select2();
	setTimeout(function () {
		$('[data-toggle="tooltip"]').tooltip();
	}, 1000)

	$scope.derivativesAll = function () {
		if ($('#derivativesAll').is(':checked')) {
			$("input[type=checkbox][name=derivatives]").prop('checked', true);
			$scope.derivativesDisable = false;
			$scope.derivativesSelect = true;
			var dModal = new bootstrap.Modal(document.getElementById('dmodal'), {
					backdrop: 'static',
					keyboard: false
				});
			dModal.show();

		} else {
			$("input[type=checkbox][name=derivatives]").prop('checked', false);
			$scope.derivativesDisable = true;
			$scope.derivativesSelect = false;
		}
	}
	$scope.newutmterms = function () {
			var newtermmodal = new bootstrap.Modal(document.getElementById('newtermmodal'), {
					backdrop: 'static',
					keyboard: false
				});
			newtermmodal.show();
	}
	$scope.derivatives = function () {
		if ($("input[type='checkbox'][name='derivatives']:checked").length == 0) {
			$('#derivativesAll').prop('checked', false)
			$scope.derivativesDisable = true;
			$scope.derivativesSelect = false;
		} else {
			$scope.derivativesDisable = false;
		}
	}
	$scope.SLB = function () {

		if ($('#slb').prop('click', true)) {
			$scope.SLBsuccess = true;
		};

		if ($('#slb').prop('click', false)) {
			$scope.SLBsuccess = false;
		}
	}

	// }

	$scope.dpcdsl = function () {
		$rootScope.formData.bankDpNumber = $scope.cdslNumber;
	};
	$scope.dpnsdl = function () {
		$rootScope.formData.bankDpNumber = $scope.nsdlNumber;
	}

	$rootScope.formData.stageOrder = 3;
	$rootScope.productLocalSave = function () {
		var stockNSE = 'N';
		var stockBSE = 'N';

		var mutualFundsNSE = 'N';
		var BSEMutualFunds = 'N';

		var foNSE = 'N';
		var currencyDerivativesNSE = 'N';

		var commodityMCX = 'N';
		var commodityNCDX = 'N';

		if ($("input[type=checkbox]#equity").is(':checked')) {
			stockNSE = 'Y';
			stockBSE = 'Y';
		}

		if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
			foNSE = 'Y';
		}

		if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
			mutualFundsNSE = 'Y';
			BSEMutualFunds = 'Y';
		}

		if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
			commodityMCX = 'Y';
			commodityNCDX = 'Y';
		}

		if ($("input[type=checkbox]#currency").is(':checked')) {
			currencyDerivativesNSE = 'Y';
		}

		if ($("input[type=checkbox]#slb").is(':checked')) {
			$scope.slb = 'Y';
			$rootScope.SLBsuccess = true;
		} else {
			$scope.slb = 'N';
			$rootScope.SLBsuccess = false;
		}

		var productSelectData = new Object();
		productSelectData.stockBSE = stockBSE;
		productSelectData.stockNSE = stockNSE;
		productSelectData.foNSE = foNSE;
		productSelectData.currencyDerivativesNSE = currencyDerivativesNSE;
		productSelectData.BSEMutualFunds = BSEMutualFunds;
		productSelectData.mutualFundsNSE = mutualFundsNSE;
		productSelectData.commodityMCX = commodityMCX;
		productSelectData.commodityNCDX = commodityNCDX;
		productSelectData.slb = slb;
		productSelectData.DematType = $("input[name=depository]:checked").val();
	}

	$scope.productValidate = function () {
		$("#productSentSmsDialog").modal('hide')
		$(document.body).removeClass('modal-open');
		$('.modal-backdrop').remove();

		var productId = $('input[name=axisDirect]:checked').val();

		if ($("input[type='checkbox'][name='segments']:checked").length <= 0) {
			$scope.productError = true;
		} else {
			$scope.productError = false;
			var url = "DIYClientProductRegistration";

			var stockNSE = 'N';
			var stockBSE = 'N';

			var mutualFundsNSE = 'N';
			var BSEMutualFunds = 'N';

			var foNSE = 'N';
			var currencyDerivativesNSE = 'N';

			var commodityMCX = 'N';
			var commodityNCDX = 'N';

			if ($("input[type=checkbox]#slb").is(':checked')) {
				$scope.slb = 'Y';
				$rootScope.SLBsuccess = true;
			} else {
				$scope.slb = 'N';
				$rootScope.SLBsuccess = false;
			}

			if ($("input[type=checkbox]#equity").is(':checked')) {
				stockNSE = 'Y';
				stockBSE = 'Y';
			}

			if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
				foNSE = 'Y';
			}

			if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
				mutualFundsNSE = 'Y';
				BSEMutualFunds = 'Y';
			}

			if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
				commodityMCX = 'Y';
				commodityNCDX = 'Y';
			}

			if ($("input[type=checkbox]#currency").is(':checked')) {
				currencyDerivativesNSE = 'Y';
			}

			var sendData = {
				ObjCDIYProduct: {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					ClientInfoID: 1,
					ProductId: productId,
					Product: "Default Product",
					Plan: "Investor Plan",
					PlanName: "Online Investor Plan",
					TradingPreferenceId: 5,
					AssistLGCode: $rootScope.formData.assistedLGCode,
					AssistLCCode: $rootScope.formData.assistedLCCode,
					BSEEquityCash: stockBSE,
					NSEEquityCash: stockNSE,
					MCXEquityCash: 'N',

					BSEEquityFandO: 'N',
					NSEEquityFandO: foNSE,
					MCXEquityFandO: 'N',

					BSECurrencyFandO: 'N',
					NSECurrencyFandO: currencyDerivativesNSE,
					MCXCurrencyFandO: 'N',

					BSEMutualFunds: BSEMutualFunds,
					NSEMutualFunds: mutualFundsNSE,
					MCXMutualFunds: 'N',

					BSECommodity: 'N',
					NSECommodity: 'N',
					MCXCommodity: commodityMCX,

					NCDXCommodity: commodityNCDX,
					NCDXEquityCash: 'N',
					NCDXEquityFandO: 'N',
					NCDXCurrencyFandO: 'N',
					NCDXMutualFunds: 'N',
					// SLB: $scope.slb,
					SLB: "Y",
					Details: "sample string 27",
					SuitedFor: "sample string 28",
					Exchange: "sample string 29",
					IntradayandFeatures: "sample string 30",
					Options: "sample string 31",
					CurrencyFeatures: "sample string 32",
					BrokeragePage: "sample string 33",
					OpeningFee: 34.1,
					MarginFee: 35.1,
					TotalPayableAmount: 36.1,
					CurrencyOptions: "sample string 37",
					PromoCode: $rootScope.formData.promoCode,
					BrowserType: $rootScope.formData.browserType,
					DematType: ($scope.UtmBankName === 'SVCB') ? 'CDSL' : $scope.productDemat,
					EncryptToken: $rootScope.EncryptToken,
					ReferralCode: $rootScope.formData.referralCode
				},
				IsDiy: true
			};
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					sessionStorage.setItem('AxToken', response.EncryptToken);
				} else {
					if ($rootScope.formData.tokenValidation) {
						$rootScope.clearBrowsingData();
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
								backdrop: 'static',
								keyboard: false
							});
						APIResponseModal.show();
						$rootScope.apiResponseErrorMsg = "Session Timed Out";
						return false;
					}
				}

				if (response.IsSuccess) {
					if ($scope.esignIsgurl) {
						$scope.isgRedirect();
					} else {
						$rootScope.fifthCompleted = true;
						sessionStorage.setItem('SMSURL', response.IpvURLEncode);
						gtag('event', 'conversion', {
							'send_to': 'AW-727858862/HQZXCPjir9caEK79iNsC',
							'value': 1.0,
							'currency': 'INR'
						});
						dataLayer.push({
							event: 'StageChange',
							attributes: {
								'level complete': '4',
								'Stocks': stockBSE,
								'Derivatives': foNSE,
								'Currencies': currencyDerivativesNSE,
								'InvestmentProducts': mutualFundsNSE
							}
						});
						$rootScope.getAPI = false;
						$rootScope.formData.apiLoading = false;

						if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && !$scope.skipIsgEsign && $rootScope.formData.makePayment)) {
							sessionStorage.setItem('productStage', true)
							$scope.ProceedPayment();
						} else {
							if ($rootScope.formData.RMModule) {
								$rootScope.formData.skippedPayment = true;
							}
							if ($rootScope.webfinacle) {
								var url = "DIYPaymentSkip";
								var sendData = {
									ReferenceNumber: $rootScope.formData.eRefNumber,
									IsSkippay: true
								}
								serverService.apiCall(url, sendData).then(function (a) {
									var response = a.data;
									if (response.IsSuccess) {
										if ($scope.dpBank) {
											$scope.updateDpid();
										} else {
											$state.go('documentUpload', {
												mobile: $rootScope.formData.EncMobile
											});
										}
									}

								})
							} else {
								$state.go('documentUpload', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						}
					}

				} else {
					$rootScope.formData.apiLoading = false;
					var connection = new bootstrap.Modal(document.getElementById('connection'));
					connection.show();
				}

			});
			// if(sessionStorage.getItem('isPaymentCompleted') === null) {

			// }
			// else {
			//     $rootScope.formData.apiLoading = false;
			// }
		}
	}

	$scope.productSentSms = function () {
		//if ($rootScope.formData.RMModule && $scope.IswaivedOff) {
		if ($rootScope.formData.RMModule && $scope.iszeropayment) {
			$scope.paymentSkip();
		} else {
			var surl = "RMSendSmsToUserDIY"
				sendData = {
				"ReferenceNumber": $rootScope.formData.ReferenceNumber
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(surl, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				if (response.IsSuccess) {
					var productSentSmsModal = new bootstrap.Modal(document.getElementById('productSentSmsDialog'), {
							backdrop: 'static',
							keyboard: true
						});
					productSentSmsModal.show();
					$scope.sentSuccessMessage = response.SuccessMessage
				}else if(!response.IsSuccess && response.ErrorCode == '-1'){
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
					paninformation.show();
					return
				} else {
					$scope.productValidate();
				}
			})
		}
	}

	$scope.ProceedPayment = function () {
		// $rootScope.productLocalSave();
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
		}

		var surl = 'Form/Payment/PaymentRequest.aspx?ReferenceNumber=' + $rootScope.formData.eRefNumber;
		serverService.apiPaymentCall(surl, tokenParams);
	}

	$scope.showInfo = function () {
		$scope.showProductInfo = !$scope.showProductInfo;
	}
	
	$rootScope.$on("productStage", function (evt, data) {
		if (($rootScope.formData.productApproved || $rootScope.formData.isPaymentCompleted)&&!$scope.PlanEditable) {
			$scope.derivativesDisable = true;
			$scope.disableAll = true;
			$scope.promoDisabled = true;
		}
	});

	$scope.clearText = function () {
		$scope.promoSuccess = false;
		$scope.promoFailed = false;
		$scope.promoEmpty = false;
	}
	$scope.applyPromo = function () {
		$scope.promoFailed = false;
		$scope.promoEmpty = false;
		$scope.collapseDetailsError = false;
		$scope.productID = $('input[name=axisDirect]:checked').val();
		var productId = $scope.productID;

		var url = "ValidatePromoCode";
		var m = 'W';
		if ($rootScope.webfinacle && $scope.appliedPromo) {
			m = 'I';
			if (!productId) {
				productId = $scope.defaultPlanId;
			}
			$rootScope.formData.promoCode = $scope.encPromo;
		}
		if ($rootScope.formData.promoCode) {
			var sendData = {
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
				PromoCode: $rootScope.formData.promoCode,
				ProductId: productId,
				Mode: m
			}
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				if (response.IsSuccess) {
					$scope.promoDescripton = "Promo code Applied successfully";
					if (response.Description) {
						$scope.promoDescripton = response.Description;
					}
					$scope.promoSuccess = true;
					if (response.Iszeropayment) {
						$scope.iszeropayment = true;
						if ($rootScope.webfinacle && ($rootScope.formData.promoCode == $scope.encPromo)) {
							$scope.ibiszeropayment = true;
							sessionStorage.setItem('ibiszeropayment', true);
						}
					} else {
						$scope.iszeropayment = false;
					}
				} else {
					$scope.promoDescripton = response.ErrorMessage;
					$scope.promoFailed = true;
					$scope.iszeropayment = false;
				}
			})
		} else {
			$scope.promoEmpty = true;
			$('#assistedCode').collapse('show');
			$scope.collapseDetailsError = true;
			$scope.iszeropayment = false;
		}
	}

	$scope.isgRedirect = function () {
		var url = 'GenerateESignPDF?ReferenceNumber=' + $rootScope.formData.ReferenceNumber;
		$rootScope.formData.apiLoading = true;
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
		}
		serverService.apiEsignCall(url, tokenParams).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				sessionStorage.setItem('isgEsign', 'isgesign')
				window.location.assign(response.eSignApiUrl);
			}
		});
	}

	$scope.esignIsg = function () {
		sessionStorage.setItem('skipEsign', false);
		$scope.esignIsgurl = true;
		$rootScope.formData.makePayment = false;
		$scope.productValidate();
	}

	$scope.skipEsign = function () {
		/*$rootScope.fifthCompleted = true;
		$rootScope.getAPI = false;
		$rootScope.formData.stageInfo = '6';*/
		$scope.skipIsgEsign = true;
		sessionStorage.setItem('skipEsign', true);
		$scope.productValidate();
		/*$state.go('documentUpload', {
		mobile: $rootScope.formData.EncMobile
		});*/
	}
	$scope.paymentBtn = function () {
		if (sessionStorage.getItem('webJana') == true || sessionStorage.getItem('webJana') == "true" || sessionStorage.getItem('mode') == "J") {
			if ($rootScope.formData.assistedLCCode == "" || $rootScope.formData.assistedLCCode == null) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError1 = false;
				$scope.assistedLCCodeError = true;
				error++;
			}
			if ($rootScope.formData.assistedLCCode.length <= 1) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError = false;
				$scope.assistedLCCodeError1 = true;
				error++;
			}
		}
		$rootScope.formData.skippedPayment = false;
		sessionStorage.removeItem('skippedPayment');
		if ($scope.dpBank) {
			$scope.updateDpid();
		} else {
			$scope.productValidate();
		}
	}

	$scope.paymentSkip = function () {
		if (sessionStorage.getItem('webJana') == true || sessionStorage.getItem('webJana') == "true" || sessionStorage.getItem('mode') == "J") {
			if ($rootScope.formData.assistedLCCode == "" || $rootScope.formData.assistedLCCode == null) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError1 = false;
				$scope.assistedLCCodeError = true;
				error++;
			}
			if ($rootScope.formData.assistedLCCode.length <= 1) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError = false;
				$scope.assistedLCCodeError1 = true;
				error++;
			}
		}
		if ($scope.dpBank) {
			if (!$rootScope.formData.dpNumber || $rootScope.formData.dpNumber.length != 8) {
				$scope.dpIdError = true;
			} else if ($rootScope.formData.bankDpNumber == $rootScope.formData.dpNumber) {
				$scope.dpIdSameError = true;
			} else {
				$rootScope.formData.skippedPayment = true;
				sessionStorage.setItem('skippedPayment', true);
				var url = "DIYPaymentSkip";
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					IsSkippay: true
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$scope.updateDpid();
					}
					else if(!response.IsSuccess && response.ErrorCode == '-1'){
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = response.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
								backdrop: 'static',
								keyboard: false
							});
						paninformation.show();
						return
					}
				})
			}
		} else {
			if ($rootScope.webfinacle) {
				$rootScope.formData.skippedPayment = true;
				sessionStorage.setItem('skippedPayment', true);
				$scope.productValidate();
			} else {
				$rootScope.formData.skippedPayment = true;
				sessionStorage.setItem('skippedPayment', true);
				var url = "DIYPaymentSkip";
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					IsSkippay: true
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						if ($scope.dpBank) {
							$scope.updateDpid();
						} else {
							$scope.productValidate();
						}
					}else if(!response.IsSuccess && response.ErrorCode == '-1'){
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = response.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
								backdrop: 'static',
								keyboard: false
							});
						paninformation.show();
						return
					}
				})
			}
		}
	}

	$scope.updateDpid = function () {
		if (sessionStorage.getItem('webJana') == true || sessionStorage.getItem('webJana') == "true" || sessionStorage.getItem('mode') == "J") {
			if ($rootScope.formData.assistedLCCode == "" || $rootScope.formData.assistedLCCode == null) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError1 = false;
				$scope.assistedLCCodeError = true;
				error++;
			}
			if ($rootScope.formData.assistedLCCode.length <= 1) {
				$scope.collapseDetailsError = true;
				$scope.assistedLCCodeError = false;
				$scope.assistedLCCodeError1 = true;
				error++;
			}
		}
		// Check if Dp-Id is null or empty
		if ($scope.bankDp == "Y") {
			if (!$rootScope.formData.dpNumber || $rootScope.formData.dpNumber.length != 8) {
				$scope.dpIdError = true;
			} else if ($rootScope.formData.bankDpNumber == $rootScope.formData.dpNumber) {
				$scope.dpIdSameError = true;
			} else {
				var u_url = "UpdateDPId";
				$scope.dematType = $("input[name=dpdepository]:checked").val();
				$scope.productDemat = $("input[name=dpdepository]:checked").val();
				var d_sendData = {
					PanNumber: $rootScope.formData.fields.panNumber,
					Mobile: $rootScope.formData.fields.mobile,
					emailid: $rootScope.formData.fields.email,
					Demattype: 'NSDL',
					UtmBankShortName: $scope.UtmBankName,
					Dp: $scope.bankDp,
					DpId: $rootScope.formData.dpNumber
				}

				serverService.apiCall(u_url, d_sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						if ($rootScope.webfinacle) {
							$state.go('documentUpload', {
								mobile: $rootScope.formData.EncMobile
							});
						} else {
							$scope.productValidate();
						}
					}else if(!response.IsSuccess && response.ErrorCode == '-1'){
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = response.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
								backdrop: 'static',
								keyboard: false
							});
						paninformation.show();
						return
					}else if(response.ErrorMessage){
                        $rootScope.apidpIdError = response.ErrorMessage;
                    } else {
						var connection = new bootstrap.Modal(document.getElementById('connection'));
						connection.show();
					}
				});
			}
		} else {
			$scope.productValidate();
		}
	}
	$scope.promocodeDialog = function () {
		var promocodeModal = new bootstrap.Modal(document.getElementById('promocodeDialog'));
		promocodeModal.show();
	}

	$scope.declineDModal = function () {
		$('#derivativesAll').prop('checked', false);
		$('#equityderivatives').prop('checked', false);
		$('#commodityderivatives').prop('checked', false);
		$('#currency').prop('checked', false);
		$scope.derivativesDisable = true;
		$('#dmodal').modal('hide');
	}

	$('a.collapseTag').on('focus', function () {
		var a = $(this).attr('title');
		$('#' + a).collapse('show');
	})

	window.onbeforeunload = function () {

		var Product_Info = new Object();
		if ($("input[type=checkbox]#equity").is(':checked')) {
			Product_Info.stockNSE = 'Y';
			Product_Info.stockBSE = 'Y';
		}

		if ($("input[type=checkbox]#equityderivatives").is(':checked')) {
			Product_Info.foNSE = 'Y';
		}

		if ($("input[type=checkbox]#mutualfunds").is(':checked')) {
			Product_Info.mutualFundsNSE = 'Y';
			Product_Info.BSEMutualFunds = 'Y';
		}

		if ($("input[type=checkbox]#commodityderivatives").is(':checked')) {
			Product_Info.commodityMCX = 'Y';
			Product_Info.commodityNCDX = 'Y';
		}

		if ($("input[type=checkbox]#currency").is(':checked')) {
			Product_Info.currencyDerivativesNSE = 'Y';
		}
		Product_Info.AssistLGCode = $rootScope.formData.assistedLGCode;
		Product_Info.AssistLCCode = $rootScope.formData.assistedLCCode;

		var Product_Info_Post = JSON.stringify(Product_Info);
		Product_Info_Stage = "Product_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
		sessionStorage.setItem(Product_Info_Stage, Product_Info_Post);
	}
}
]);