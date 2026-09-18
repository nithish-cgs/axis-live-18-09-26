mainChatApp.controller('genLinkController', ['$scope', '$rootScope', '$state', 'serverService', '$timeout', function ($scope, $rootScope, $state, serverService, $timeout) {
			if (sessionStorage.getItem('RMModule') == 'true') {
				$rootScope.formData.RMModule = true;
				$scope.getRMLGLCCode = sessionStorage.getItem('RMLGLCCode')
				if($scope.getRMLGLCCode){
					$scope.lgCode = $scope.getRMLGLCCode;
					$scope.lgdisabled = true;
				}
				if (!$rootScope.formData.rmcode) {
					if (sessionStorage.getItem('RMCode')) {
						$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
					} else {
						sessionStorage.clear();
						$rootScope.emailMobile = true;
						$rootScope.pan = false;
						$state.go('register');
					}
				}
			}
			if (!$rootScope.formData.RMModule) {
				sessionStorage.clear();
				$rootScope.emailMobile = true;
				$rootScope.pan = false;
				$state.go('register');
			}

			var url = "GetALLPlanList?ReferenceNumber=";
			serverService.getApi(url).then(function (a) {
				var response = a.data;
				$scope.paymentProductId = response[0].ProductId;
				$scope.paymentProductIdTwo = response[1].ProductId;
				$scope.paymentProductIdThree = response[2].ProductId;
			});

			$scope.initChecBox = function () {
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
			}

			setTimeout(function () {
				$('#equity').prop('checked', true);
				$('#equity').iCheck('disable');
				$('#mutualfunds').prop('checked', true);
				$('#mutualfunds').iCheck('disable');
				$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
				});
				$scope.initChecBox();
			}, 100);

			$scope.getBankList = function () {
				var s_url = "DIYGetBankName";

				serverService.getApi(s_url).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.formData.bankList = response.BankDetailsList;
						setTimeout(function () {
							$("select").select2();
						}, 200);
					}
				});
			}

			$scope.getBankList();

			$scope.genLink = function () {
				var params = null;
				if ($scope.lgCode) {
					params = "lgcode=" + $scope.lgCode;
				}

				if ($scope.lcCode) {
					if (params) {
						params = params + "&lccode=" + $scope.lcCode;
					} else {
						params = "lccode=" + $scope.lcCode;
					}
				}

				if ($('#pBank').val()) {
					if (params) {
						params = params + "&bankname=" + $('#pBank').val();
					} else {
						params = "bankname=" + $('#pBank').val();
					}
				}

				var segment = 1;

				if ($('#equityderivatives').is(':checked') && $('#commodityderivatives').is(':checked') && $('#currency').is(':checked')) {
					segment = 2;
				} else if ($('#commodityderivatives').is(':checked') && $('#currency').is(':checked')) {
					segment = 3;
				} else if ($('#equityderivatives').is(':checked') && $('#currency').is(':checked')) {
					segment = 4;
				} else if ($('#equityderivatives').is(':checked') && $('#commodityderivatives').is(':checked')) {
					segment = 5;
				} else if ($('#equityderivatives').is(':checked')) {
					segment = 6;
				} else if ($('#commodityderivatives').is(':checked')) {
					segment = 7;
				} else if ($('#currency').is(':checked')) {
					segment = 8;
				}

				if (params)
					params = params + "&planId=" + $('input[name=axisDirect]:radio:checked').val() + "&segment=" + segment;
				else {
					params = "planId=" + $('input[name=axisDirect]:radio:checked').val() + "&segment=" + segment;
				}

			
			
					if ($('#pBank').val()) {
						if (params) {
							params = "UTM_bank=" + $('#pBank').val();
						}else{
							params = "UTM_bank=" + $('#psBank').val();
						}
					}
					if ($('#psBank').val()) {
						if (params) {
							params = params + "&bankshortcode=" + $('#psBank').val();
						} else {
							params = "bankshortcode=" + $('#psBank').val();
						}
					}
					if ($('#dpValue').val()) {
						if (params) {
							params = params + "&DP=" + $('#dpValue').val();
						} else {
							params = "DP=" + $('#pBank').val();
						}
					}
					if ($('#isCmlcopy').val()) {
						if (params) {
							params = params + "&IsCMLCopy=" + $('#isCmlcopy').val();
						} else {
							params = "IsCMLCopy=" + $('#isCmlcopy').val();
						}
					}
					if ($("#refCode").val()) {
						if (params) {
							params = params + "&ReferralCode=" + $("#refCode").val();
						} else {
							params = "ReferralCode=" + $("#refCode").val()
						}
					}

					if ($("#promoCode").val()) {
						if (params) {
							params = params + "&PromoCode=" + $("#promoCode").val();
						} else{
							params = "PromoCode=" + $("#promoCode").val();
						}
					}


					if (params) {
						$scope.genUrl = window.location.origin + serverService.getHome() + '/register?' + params;
						console.log($scope.genUrl)
					}
				

			}

			$scope.copyTxt = function () {
				const el = document.createElement('textarea');
				el.value = $scope.genUrl;
				document.body.appendChild(el);
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);
				$scope.copied = true;
				$timeout(function(){
					$scope.copied = false;
				},2000)
			}

		}
	]);
