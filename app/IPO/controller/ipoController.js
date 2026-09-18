mainApp.controller('ipoController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {

			if(pan) {
				$rootScope.webipo = true;
				sessionStorage.setItem('webipo', true)
			} else {
				$state.go('register')
			}

			$scope.checkradioinit = function () {
				$(".select").select2();
				$('#ri').iCheck('check');
				$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
				});
				$('#cutoff').on('ifChecked', function (event) {
					$scope.cutOff = true;
					$scope.cutOffPrice = $scope.ipoMasterData.IILRSP_MAX_PRICE;
					$scope.amount = $scope.bid * $scope.cutOffPrice;
					if ($scope.amount == 0 || !$scope.amount) {
						$scope.amount = '';
					}
					$scope.priceError = false;
					$scope.price = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.cutOff = false;
					$scope.amount = '';
					$scope.$apply();
				});

			}
			$scope.cutOff = false;

			$scope.getIPOMaster = function () {
				var url = 'GetIPOMaster';
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$scope.ipoMasterData = response.data[0];
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

			if (pan || $rootScope.webipo) {
				var url = 'GetIPOcustomerDetails?EncodeCustId='+pan;
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.ipoList = response.data;
						$scope.dmAcNo = '0';
						$scope.ipData(0);
						setTimeout(function () {
							$scope.checkradioinit();
						}, 500);
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

				$scope.getIPOMaster();
			}

			$scope.ipData = function (i) {
				$scope.ipoCustomerData = $rootScope.ipoList[i];
				if ($scope.ipoCustomerData.ENT_CATEGORY == 'NRI') {
					$('#nriPopup').modal({
						keyboard: false,
						backdrop: 'static'
					});
				}
				sessionStorage.setItem('ipoCustomerData', $scope.ipoCustomerData);
			}

			$scope.totAmt = function () {
				$scope.bid = $("#bid").val();
				$scope.price = $("#price").val();
				$scope.amount = $scope.bid * $scope.price;
				if ($scope.cutOff) {
					$scope.amount = $scope.bid * $scope.cutOffPrice;
				}

				if ($scope.amount == 0) {
					$scope.amount = '';
				}
			}

			$scope.closeModal = function () {
				$('#nriPopup').modal('hide');
			}

			$scope.ipoSubmit = function () {

				if (!$scope.bid || ($scope.bid % $scope.ipoMasterData.IILRSP_LOT_SIZE !== 0)) {
					$("#bid").focus();
					$scope.bidError = true;
					return false;
				}

				if (!$scope.cutOff && (!$scope.price || ($scope.ipoMasterData.IILRSP_MIN_PRICE > $scope.price) || ($scope.ipoMasterData.IILRSP_MAX_PRICE < $scope.price))) {
					$("#price").focus();
					$scope.priceError = true;
					return false;
				}

				if ($scope.amount > 200000) {
					$scope.amountError = true;
					return false;
				}

				var url = "IPOinformationInsertion";

				var request = {
					"ClientID": $scope.ipoCustomerData.TRADING_ACCOUNT_NUM,
					"ClientName": $scope.ipoCustomerData.FIRST_HOLDER_NAME,
					"ClientPAN": $scope.ipoCustomerData.FIRST_PAN_NO,
					"ClientCategory": $scope.ipoCustomerData.ENT_CATEGORY,
					"IPOName": $scope.ipoMasterData.IILRSP_PRODUCT_CODE,
					"ProductDescription": $scope.ipoMasterData.IILRSP_ISSUE_NAME,
					"PriceBand": $scope.ipoMasterData.IILRSP_MIN_PRICE + "-" + $scope.ipoMasterData.IILRSP_MAX_PRICE,
					"MinumumShares": $scope.ipoMasterData.IILRSP_LOT_SIZE,
					"TickSize": "",
					"StartDate": $scope.ipoMasterData.IILRSP_START_DATE,
					"EndDate": $scope.ipoMasterData.IILRSP_END_DATE,
					"CutoffPrice": $scope.cutOffPrice,
					"ipopricebandmin_amt": $scope.ipoMasterData.IILRSP_MIN_PRICE,
					"ipopricebandmax_amt": $scope.ipoMasterData.IILRSP_MAX_PRICE,
					"ipocutoff_price": $scope.ipoMasterData.ipo_cut_off_price,
					"bidamount": $scope.bid,
					"price_per_share": $scope.price,
					"total": $scope.amount,
					"is_cutoff": $scope.cutOff,
					"paymentmode": "",
					"customertype": $scope.riType,
					"ipoproduct_id": $scope.ipoMasterData.IPOProduct_Id,
					"ipoproduct_code": "",
					"ipo_product_name": "",
					"agent_id": "",
					"agent_user_name": "",
					"entid": $scope.ipoCustomerData.TRADING_ACCOUNT_NUM,
					"ent_name": $scope.ipoCustomerData.FIRST_HOLDER_NAME,
					"ent_email_id": "",
					"payment_ref_number": "",
					"bankaccountnumber": "",
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, request).then(function () {
				$rootScope.formData.apiLoading = false;
					$scope.ipoThankYou = true;
				});
			}
			setTimeout(function () {
				$scope.checkradioinit();
			}, 500);
		}

	])
