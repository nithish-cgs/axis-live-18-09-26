mainChatApp.controller('productsController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {

			$(document.body).removeClass('modal-open');
			$('.modal-backdrop').remove();
			$scope.productAction = false;
			$scope.defaultPlan = true;

			$rootScope.formData.stageInfo = '4';

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
			$scope.productDemat = 'NSDL';

			if ($rootScope.formData.RMModule) {
				$('#cdsl').prop('checked', false);
				$('#nsdl').prop('checked', true);
				$('#cdsl,#nsdl').iCheck('disable');
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
								setTimeout(function () {
									$('.customcheckradio').iCheck({
										checkboxClass: 'icheckbox_minimal',
										radioClass: 'iradio_minimal'
									});
									$scope.initCheckbox();
								}, 100);
							} else {
								$scope.dpBank = true;
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
								/*if (!$scope.responseProductId) {
									$scope.productSelect($scope.dpProductId);
								}*/
							}
							if (response.BankDetailsList[0].Segment) {
								var segment = response.BankDetailsList[0].Segment;
								if (segment == 2) {
									$('#derivativesAll').iCheck('check');
									$('#equityderivatives').iCheck('check');
									$('#commodityderivatives').iCheck('check');
									$('#currency').iCheck('check');
								}
								if (segment == 3) {
									$('#commodityderivatives').iCheck('check');
									$('#currency').iCheck('check');
								}
								if (segment == 4) {
									$('#equityderivatives').iCheck('check');
									$('#currency').iCheck('check');
								}
								if (segment == 5) {
									$('#equityderivatives').iCheck('check');
									$('#commodityderivatives').iCheck('check');
								}
								if (segment == 6) {
									$('#equityderivatives').iCheck('check');
								}
								if (segment == 7) {
									$('#commodityderivatives').iCheck('check');
								}
								if (segment == 8) {
									$('#currency').iCheck('check');
								}
								setTimeout(function () {
									$('.customcheckradio').iCheck({
										checkboxClass: 'icheckbox_minimal',
										radioClass: 'iradio_minimal'
									});
									$scope.initCheckbox();
								}, 100);
							}
							if (response.BankDetailsList[0].PromoCode) {
								$rootScope.formData.promoCode = response.BankDetailsList[0].PromoCode;
								$scope.utmPromo = response.BankDetailsList[0].PromoCode;
								$scope.promoDisabled = true;
								//$scope.applyPromo();
							} else {
								$rootScope.formData.promoCode = '';
								$scope.promoDisabled = false;
							}
						}
					}
					$scope.getProductPaymentActionDetails();
				}, function (error) {
					$scope.getProductPaymentActionDetails();
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
					/* $('#PaymentSuccess').modal({
					keyboard:false,
					backdrop: 'static'
					})*/
				} else {
					//$rootScope.getAPI = true;
					/*$('#APIResponse').modal({
					backdrop: 'static',
					keyboard: true
					})*/
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
			$('#cdsl').on('ifChecked', function () {
				$scope.setDemat('CDSL');
				$scope.$apply();
			});

			$scope.productSelect = function (paymentType) {
				$scope.promoSuccess = false;
				$scope.promoDone = false;
				$scope.iszeropayment = false;
				$scope.promoFailed = false;
				if($rootScope.formData.promoCode == $scope.utmPromo){
					setTimeout(function(){$scope.applyPromo();},100);
				}
				$scope.productPaymentAction(paymentType);
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

			$scope.productPaymentAction = function (paymentType) {

				if (paymentType === $scope.paymentProductIdTwo) {
					// $rootScope.formData.NoPayment = true;
					// $rootScope.formData.makePayment = false;
					$scope.appliedPromo = false;
					if ($rootScope.webfinacle && !$scope.getProductDetails) {
						$rootScope.formData.promoCode = '';
					}
					$scope.productAction = true;
					$scope.productActionTwo = true;
					$scope.productActionThree = false;
					$rootScope.complimentaryTurnover = "Complimentary delivery turnover(CDT) of 12 lacs";
					$rootScope.planTwopointTwo = "50% discount on brokerage rates post utilization of CDT";
					$rootScope.planTwopointThree = "1 year validity of CDT";
					$rootScope.planTwopointFour = "Zero Demat AMC for the first year";

					//$scope.productAction = false;
					if (sessionStorage.getItem('isPaymentCompleted') != null && sessionStorage.getItem('isPaymentCompleted') == 'true') {
						$rootScope.formData.makePayment = false;
					} else {
						$rootScope.formData.makePayment = true;
					}
					$rootScope.formData.NoPayment = false;
					// if(sessionStorage.getItem('utm_promoCode')){
					// 	$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode')
					// 	$scope.promoDisabled = true;
					// }else{
					// 	$rootScope.formData.promoCode = '';
					// }

				} else if (paymentType === $scope.paymentProductId) {
					$scope.productAction = false;
					if (sessionStorage.getItem('isPaymentCompleted') != null && sessionStorage.getItem('isPaymentCompleted') == 'true') {
						$rootScope.formData.makePayment = false;
					} else {
						$rootScope.formData.makePayment = true;
					}
					$rootScope.formData.NoPayment = false;
					if (sessionStorage.getItem('utm_promoCode')) {
						$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode')
							$scope.promoDisabled = true;
					}

					if ($scope.encPromo && (!$rootScope.formData.isPaymentCompleted && !$rootScope.formData.productApproved)) {

						$scope.appliedPromo = true;
						setTimeout(function () {
							$scope.applyPromo();
						}, 1000)
					} else if ($rootScope.webfinacle && ($rootScope.formData.isPaymentCompleted || $rootScope.formData.productApproved)) {
						$rootScope.formData.promoCode = '';
						$scope.appliedPromo = true;
					}

					//$rootScope.paymentProductId = 1;
				} else if (paymentType === $scope.paymentProductIdThree) {
					// $rootScope.formData.NoPayment = true;
					// $rootScope.formData.makePayment = false;
					$scope.appliedPromo = false;
					if ($rootScope.webfinacle && !$scope.getProductDetails) {
						$rootScope.formData.promoCode = '';
					}
					$scope.productAction = true;
					$scope.productActionThree = true;
					$scope.productActionTwo = false;

					$rootScope.complimentaryTurnover = "Complimentary delivery turnover(CDT) of 3 lacs";
					$rootScope.planThreepointTwo = "6 months validity of CDT";
					$rootScope.planThreepointThree = "Zero Demat AMC for the first year";

					//$scope.productAction = false;
					if (sessionStorage.getItem('isPaymentCompleted') != null && sessionStorage.getItem('isPaymentCompleted') == 'true') {
						$rootScope.formData.makePayment = false;
					} else {
						$rootScope.formData.makePayment = true;
					}
					$rootScope.formData.NoPayment = false;
					if (sessionStorage.getItem('utm_promoCode')) {
						$rootScope.formData.promoCode = sessionStorage.getItem('utm_promoCode')
							$scope.promoDisabled = true;
					}
				}
				setTimeout(function () {
					document.getElementById(paymentType).checked = true;
				}, 500)
			}
			$scope.getProductPaymentActionDetails = function () {
				$rootScope.formData.apiLoading = true;
				var url = "GetALLPlanList?ReferenceNumber=" + $rootScope.formData.ReferenceNumber;
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response) {
						if (response.length > 0) {
							for (var i = 0; i < response.length; i++) {
								if (i === 1) {
									$scope.paymentProductIdTwo = response[i].ProductId;
									$rootScope.planTwo = response[i].PlanName;
									$rootScope.deliveryTurnoverTwo = response[i].DeliveryTurnover;
									$rootScope.turnoverValidityTwo = response[i].TurnoverValidity;
									$rootScope.openingChargesTwo = response[i].OpeningFee;
									$rootScope.brokeragePlanTwo = response[i].SuitedFor;
									$rootScope.brokerageDeliveryTwo = response[i].DeliveryBrokerage;
									$rootScope.brokerageIntradayTwo = response[i].IntradayandFeatures;
									$rootScope.brokerageFutureTwo = response[i].CurrencyFeatures;
									$rootScope.brokerageOptionTwo = response[i].CurrencyOptions;
									$rootScope.commodityCurrencyOptionTwo = response[i].CommodityCurrencyOption;
									$rootScope.formData.referralCode = response[i].ReferralCode;

								} else if (i === 2) {
									$scope.paymentProductIdThree = response[i].ProductId;
									$rootScope.planThree = response[i].PlanName;
									$rootScope.deliveryTurnoverThree = response[i].DeliveryTurnover;
									$rootScope.turnoverValidityThree = response[i].TurnoverValidity;
									$rootScope.openingChargesThree = response[i].OpeningFee;
									$rootScope.brokeragePlanThree = response[i].SuitedFor;
									$rootScope.brokerageDeliveryThree = response[i].DeliveryBrokerage;
									$rootScope.brokerageIntradayThree = response[i].IntradayandFeatures;
									$rootScope.brokerageFutureThree = response[i].CurrencyFeatures;
									$rootScope.brokerageOptionThree = response[i].CurrencyOptions;
									$rootScope.commodityCurrencyOptionThree = response[i].CommodityCurrencyOption;
								} else if (i === 0) {
									$scope.paymentProductId = response[i].ProductId;
									$rootScope.commodityCurrencyOptionOne = response[i].CommodityCurrencyOption;
								}

								if ($scope.responseProductId && $scope.responseProductId == response[i].ProductId) {
									$scope.productSelect($scope.responseProductId);
									$scope.defaultPlan = false; 
								} else if ($scope.dpProductId) {
									if($scope.dpProductId && $scope.dpProductId == response[i].ProductId){
										$scope.productSelect($scope.dpProductId);
									}
									$scope.defaultPlan = false;
								} else if (!$scope.responseProductId && !$rootScope.webfinacle) {
									$scope.defaultPlan = false;
									var productId = response[0].ProductId;
									var demat = response[0].CusDematType

										setTimeout(function () {
											if (productId && (!$scope.responseProductId)) {
												setTimeout(function () {
													document.getElementById(productId).checked = true;
												}, 500)
											}
											if (demat == 'CDSL') {
												$('#cdsl').prop('checked', true);
												$('#nsdl').prop('checked', false);
											} else {
												$('#cdsl').prop('checked', false);
												$('#nsdl').prop('checked', true);
											}
											$scope.productSelect(productId);
											setTimeout(function () {
												$('.customcheckradio').iCheck({
													checkboxClass: 'icheckbox_minimal',
													radioClass: 'iradio_minimal'
												});
												$scope.initCheckbox();
											}, 100);
										}, 100)
								}
							}

							if ($rootScope.webfinacle && (!$rootScope.formData.isPaymentCompleted && !$rootScope.formData.productApproved)) {
								if (response[0].PromoCodeEnc) {
									$scope.encPromo = response[0].PromoCodeEnc;

								}
								if (!$scope.responseProductId || ($scope.responseProductId == $scope.paymentProductId)) {
									$scope.productSelect($scope.paymentProductId);
									setTimeout(function () {
										document.getElementById($scope.paymentProductId).checked = true;
									}, 500)
								}
							} else {
								if ($scope.defaultPlan) {
									$scope.getDPDetails()
									$scope.productSelect($scope.paymentProductId);
								}
							}
						}
					}
				});
			}

			$scope.getProductInfo = function () {
				if (!$rootScope.getAPI || !$rootScope.formData.assistedLGCode || !$rootScope.formData.assistedLCCode) {
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
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.apiResponseErrorMsg = "Session Timed Out";
								return false;
							}
						}
						if (response.IsSuccess) {
							sessionStorage.setItem('ProductId', response.ObjCDIYProduct.ProductId);

							$rootScope.formData.assistedLGCode = response.ObjCDIYProduct.AssistLGCode;

							$rootScope.formData.assistedLCCode = response.ObjCDIYProduct.AssistLCCode;
							$rootScope.formData.referralCode = response.ObjCDIYProduct.ReferralCode;
							$scope.getProductDetails = true;
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
								$rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;

								if ($rootScope.webfinacle && ($scope.paymentProductId == $scope.responseProductId)) {
									$scope.appliedPromo = true;

								}
							}
							$rootScope.formData.promoCode = response.ObjCDIYProduct.PromoCode;
							if (response.ObjCDIYProduct.PromoCode) {
								$scope.promoDone = true;
							}
							if (response.ObjCDIYProduct.BSEEquityFandO == 'Y' || response.ObjCDIYProduct.NSEEquityFandO == 'Y') {
								$('#equityderivatives').iCheck('check');
								$('#derivativesAll').iCheck('check');
								$('#equityderivatives').iCheck('enable');
								$scope.derivativesSelect = true;
							} else {
								$('#equityderivatives').iCheck('uncheck');
								$('#equityderivatives').iCheck('disable');
							}

							//Currency Derivatives
							if (response.ObjCDIYProduct.NSECurrencyFandO == 'Y' || response.ObjCDIYProduct.BSECurrencyFandO == 'Y') {
								$('#currency').iCheck('check');
								$('#derivativesAll').iCheck('check');
								$("#currency").iCheck('enable');
								$scope.derivativesSelect = true;
							} else {
								$('#currency').iCheck('uncheck');
								$('#currency').iCheck('disable');
							}

							//Commodity
							if (response.ObjCDIYProduct.MCXCommodity == 'Y' || response.ObjCDIYProduct.NCDXCommodity == 'Y') {
								$('#commodityderivatives').iCheck('check');
								$('#derivativesAll').iCheck('check');
								$('#commodityderivatives').iCheck('enable');
								$scope.derivativesSelect = true;
							} else {
								$('#commodityderivatives').iCheck('uncheck');
								$('#commodityderivatives').iCheck('disable');
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

								$scope.responseProductId = response.ObjCDIYProduct.ProductId;
								if ($rootScope.formData.isPaymentCompleted || $rootScope.formData.productApproved) {
									$('input[type=checkbox]').iCheck('disable');
									$('.account-plan-container input').prop('disabled', true);
									$scope.promoDisabled = true;
								}
								$scope.getProductPaymentActionDetails();
							}
							setTimeout(function () {
								$('.customcheckradio').iCheck({
									checkboxClass: 'icheckbox_minimal',
									radioClass: 'iradio_minimal'
								});
								$scope.initCheckbox();
							}, 100);
						} else {
							$scope.getDPDetails();
						}

					});
				} else {
					$scope.getDPDetails();
				}

			}

			$scope.getProductInfo();

			$("html, body").animate({
				scrollTop: 0
			}, "slow");

			// Preselect and disable fields for Equity and Mutual Funds
			$('#equity').prop('checked', true);
			$('#equity').iCheck('disable');
			$('#mutualfunds').prop('checked', true);
			$('#mutualfunds').iCheck('disable');

			$(".select").select2();
			$('.customcheckradio').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal'
			});
			$('[data-toggle="tooltip"]').tooltip();
			$scope.initCheckbox = function () {
				$('input[type=checkbox]#derivativesAll').on('ifChecked', function (event) {

					$("input[type=checkbox][name=derivatives]").iCheck('check');
					$("input[type=checkbox][name=derivatives]").iCheck('enable');
					$scope.derivativesSelect = true;

				});

				$('input[type=checkbox]#derivativesAll').on('ifUnchecked', function (event) {

					$("input[type=checkbox][name=derivatives]").iCheck('uncheck');
					$("input[type=checkbox][name=derivatives]").iCheck('disable');
					$scope.derivativesSelect = false;

				});

				$('input[type=checkbox][name=derivatives]').on('ifUnchecked', function (event) {

					if ($("input[type='checkbox'][name='derivatives']:checked").length == 0) {
						$('input[type=checkbox]#derivativesAll').iCheck('uncheck');
						$("input[type=checkbox][name=derivatives]").iCheck('disable');
						$scope.derivativesSelect = false;
					} else {

						$(this).iCheck('disable');
					}

				});

				$('#dpcdsl').on('ifChecked', function (event) {
					$rootScope.formData.bankDpNumber = $scope.cdslNumber;
					$scope.$apply();
				});
				$('#dpnsdl').on('ifChecked', function (event) {
					$rootScope.formData.bankDpNumber = $scope.nsdlNumber;
					$scope.$apply();
				});
			}

			$scope.initCheckbox();

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
				var othersSLB = 'N';

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

				var productSelectData = new Object();
				productSelectData.stockBSE = stockBSE;
				productSelectData.stockNSE = stockNSE;
				productSelectData.foNSE = foNSE;
				productSelectData.currencyDerivativesNSE = currencyDerivativesNSE;
				productSelectData.BSEMutualFunds = BSEMutualFunds;
				productSelectData.mutualFundsNSE = mutualFundsNSE;
				productSelectData.commodityMCX = commodityMCX;
				productSelectData.commodityNCDX = commodityNCDX;
				productSelectData.othersSLB = othersSLB;
				productSelectData.DematType = $("input[name=depository]:checked").val();
				sessionStorage.setItem('productData', JSON.stringify(productSelectData));
			}

			$scope.productValidate = function () {
				$("#productSentSmsDialog").modal('hide')
				$(document.body).removeClass('modal-open');
				$('.modal-backdrop').remove();

				var productId = "";
				if ($scope.paymentProductId && document.getElementById($scope.paymentProductId).checked) {
					productId = $scope.paymentProductId;
				} else if ($scope.paymentProductIdTwo && document.getElementById($scope.paymentProductIdTwo).checked) {
					productId = $scope.paymentProductIdTwo;
				} else if ($scope.paymentProductIdThree && document.getElementById($scope.paymentProductIdThree).checked) {
					productId = $scope.paymentProductIdThree;
				}
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
					var othersSLB = 'N';

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

					var localProductData = (sessionStorage.getItem('productData') != null) ? JSON.parse(sessionStorage.getItem('productData')) : '';

					var sendData = {
						ObjCDIYProduct: {
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							ClientInfoID: 1,
							ProductId: productId,
							Product: "Default Product",
							Plan: "Investor Plan",
							PlanName: "Online Investor Plan",
							TradingPreferenceId: 5,
							AssistLGCode: $rootScope.formData.assistedLGCode,
							AssistLCCode: $rootScope.formData.assistedLCCode,
							BSEEquityCash: (localProductData != '') ? localProductData.stockBSE : stockBSE,
							NSEEquityCash: (localProductData != '') ? localProductData.stockNSE : stockNSE,
							MCXEquityCash: 'N',

							BSEEquityFandO: 'N',
							NSEEquityFandO: (localProductData != '') ? localProductData.foNSE : foNSE,
							MCXEquityFandO: 'N',

							BSECurrencyFandO: 'N',
							NSECurrencyFandO: (localProductData != '') ? localProductData.currencyDerivativesNSE : currencyDerivativesNSE,
							MCXCurrencyFandO: 'N',

							BSEMutualFunds: (localProductData != '') ? localProductData.BSEMutualFunds : BSEMutualFunds,
							NSEMutualFunds: (localProductData != '') ? localProductData.mutualFundsNSE : mutualFundsNSE,
							MCXMutualFunds: 'N',

							BSECommodity: 'N',
							NSECommodity: 'N',
							MCXCommodity: (localProductData != '') ? localProductData.commodityMCX : commodityMCX,

							NCDXCommodity: (localProductData != '') ? localProductData.commodityNCDX : commodityNCDX,
							NCDXEquityCash: 'N',
							NCDXEquityFandO: 'N',
							NCDXCurrencyFandO: 'N',
							NCDXMutualFunds: 'N',
							SLB: othersSLB,
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
							DematType: $scope.productDemat,
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
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
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
								if (sessionStorage.getItem('productData') != null) {
									sessionStorage.removeItem('productData');
								}
								if (!$rootScope.formData.skippedPayment && (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && !$scope.skipIsgEsign && $rootScope.formData.makePayment)) {
									sessionStorage.setItem('productStage', true)
									$scope.ProceedPayment();
								} else {
									if ($rootScope.formData.RMModule) {
										$rootScope.formData.skippedPayment = true;
									}
									$state.go('documentUpload', {
										mobile: $rootScope.formData.EncMobile
									});
								}
							}

						} else {
							$rootScope.formData.apiLoading = false;
							$('#connection').modal('show');
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
				url = "RMSendSmsToUserDIY"
					sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$("#productSentSmsDialog").modal('show')
						$scope.sentSuccessMessage = response.SuccessMessage
					} else {
						$scope.productValidate();
					}
				})
			}

			$scope.ProceedPayment = function () {
				// $rootScope.productLocalSave();
				var tokenParams = {
					'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
					'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
					'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
					'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
				}

				var url = 'Form/Payment/PaymentRequest.aspx?ReferenceNumber=' + $rootScope.formData.eRefNumber;
				serverService.apiPaymentCall(url, tokenParams);
			}

			$scope.showInfo = function () {
				$scope.showProductInfo = !$scope.showProductInfo;
			}

			$rootScope.$on("productStage", function (evt, data) {
				if ($rootScope.formData.productApproved || $rootScope.formData.isPaymentCompleted) {
					$('input[type=checkbox]').iCheck('disable');
					$('.account-plan-container input').prop('disabled', true);
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
				var productId = "";
				if($scope.dpProductId){
					productId = $scope.dpProductId
				}
				if ($scope.paymentProductId && document.getElementById($scope.paymentProductId).checked) {
					productId = $scope.paymentProductId;
				} else if ($scope.paymentProductIdTwo && document.getElementById($scope.paymentProductIdTwo).checked) {
					productId = $scope.paymentProductIdTwo;
				} else if ($scope.paymentProductIdThree && document.getElementById($scope.paymentProductIdThree).checked) {
					productId = $scope.paymentProductIdThree;
				}
				var url = "ValidatePromoCode";
				var m = 'W';
				if ($rootScope.webfinacle && $scope.appliedPromo) {
					m = 'I';
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
							if(response.Description){
								$scope.promoDescripton = response.Description;
							}
							$scope.promoSuccess = true;
							if (response.Iszeropayment) {
								$scope.iszeropayment = true
							} else {
								$scope.iszeropayment = false
							}
						} else {
							$scope.promoDescripton = response.ErrorMessage;
							// $scope.promoDescripton = "Promo code expired";
							$scope.promoFailed = true;
						}
					})
				} else {
					$scope.promoEmpty = true;
					$('#assistedCode').collapse('show');
					$scope.collapseDetailsError = true;
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
				$rootScope.formData.skippedPayment = false;
				sessionStorage.removeItem('skippedPayment');
				if ($scope.dpBank) {
					$scope.updateDpid();
				} else {
					$scope.productValidate();
				}
			}

			$scope.paymentSkip = function () {
				if ($scope.dpBank) {
					if (!$rootScope.formData.dpNumber || $rootScope.formData.dpNumber.length != 8) {
						$scope.dpIdError = true;
					} else {
						$rootScope.formData.skippedPayment = true;
						sessionStorage.setItem('skippedPayment', true);
						var url = "DIYPaymentSkip";
						var sendData = {
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							IsSkippay: true
						}
						serverService.apiCall(url, sendData).then(function (a) {
							var response = a.data;
							if (response.IsSuccess) {
								$scope.updateDpid();
							}
						})
					}
				} else {
					$rootScope.formData.skippedPayment = true;
					sessionStorage.setItem('skippedPayment', true);
					var url = "DIYPaymentSkip";
					var sendData = {
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
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
						}
					})
				}
			}

			$scope.updateDpid = function () {
				// Check if Dp-Id is null or empty
				if ($scope.bankDp == "Y") {
					if (!$rootScope.formData.dpNumber || $rootScope.formData.dpNumber.length != 8) {
						$scope.dpIdError = true;
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
								$scope.productValidate();
							} else {
								$('#connection').modal('show');
							}
						});
					}
				} else {
					$scope.productValidate();
				}
			}
			$scope.promocodeDialog = function () {
				$('#promocodeDialog').modal('show');
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
