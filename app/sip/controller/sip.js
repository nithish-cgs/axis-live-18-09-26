mainApp.controller('sipController', ['$scope', '$rootScope', '$state', 'serverService','$window', function ($scope, $rootScope, $state, serverService, $window) {
	$scope.sipcard = true;
	$scope.SipChooseInvest = false;
	$scope.SipminimumStocks = false;
	$scope.sipmaxStocks = false;
	//    $scope.SipmaximumStocks=false;
	$scope.InvestSip = true;
	$scope.siptextdis = true;
	$scope.ChooseBasketDetails = false;
	$scope.FsttotalAmt = false;
	$scope.SipEnterotp = false;
	$scope.sipradio = false;
	$scope.ConfirmSIPOTP = false;
	$scope.sipgenartion = false
	$scope.selectedPlans = [];
	$scope.preferencesSelection = [];
	$scope.SIPCreationDate = [];
	$scope.skipremovebtn = true
	// $scope.sipOrLumpSelection = [];
	$scope.Fristplans = false;
	$scope.Secondplans = false;
	$scope.Thirdplans = false;
	$scope.Preferences = "Monthly";
	$scope.SiporLump = "SIP";
	$rootScope.formData.stageInfo = '8';
	$rootScope.formData.stageOrder = 8;
	$scope.selectedOption = [];
	//    $scope.sipOrLumpSelection[0] = 'SIP';
	$scope.sipFlag = true;
	$scope.sipOrLumpSelection = [];
	$scope.OtpErrmsg = false;
	$scope.orderplaced = false;
	$scope.basketlimitErr = false;
	$scope.chkselct1 = true;
	$scope.chkselct = true;
	$scope.totalMinInvestAmount = 0;
	$scope.RemoveDiv=false;
	$scope.AddbasketDiv=false;
	$('#col-6-div').hide();
	$('#basketDiv').hide();
	$('#otpDiv').hide();
	$('#ConfirmationDiv').hide();
	var Sipcancelpop = new bootstrap.Modal(document.getElementById('CancelSip'), {
			backdrop: 'static',
			keyboard: false
		});
		Sipcancelpop.hide();
		var SipSucessDelete = new bootstrap.Modal(document.getElementById('SipSucessDelete'), {
			backdrop: 'static',
			keyboard: false
		});
		SipSucessDelete.hide();
	if($rootScope.SipCancelation){
		Sipcancelpop.show();
	}
	var Basketsub = new bootstrap.Modal(document.getElementById('Basketsub'), {
					backdrop: 'static',
					keyboard: false
				});
				Basketsub.hide()
	if (!$rootScope.formData.eRefNumber && sessionStorage.getItem('AxNo')) {
		$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
	}
	var s_url = "GetOverallStatusDIY";
	$rootScope.formData.apiLoading = true;
	var sendData = {
		ReferenceNumber: $rootScope.formData.eRefNumber
	};
	serverService.apiCall(s_url, sendData).then(function (a) {
		$rootScope.formData.apiLoading = false;
		var response = a.data;
		$rootScope.BasketSubmission = response.BasketSubmission;
		if(response.OverallStatusList[10]){
		$rootScope.SPStatusSip = response.OverallStatusList[10].SPStatus;
		}else{
			$state.go('complete', {
				mobile: $rootScope.formData.EncMobile
			});
		}
		if ($rootScope.SPStatusSip == "Y" &&!$rootScope.SipCancelation) {
			$state.go('complete', {
				mobile: $rootScope.formData.EncMobile
			});
		} else {
		if (!$rootScope.BasketSubmission &&!$rootScope.SipCancelation) {
				$scope.yesBasket();
			} 
		if ($rootScope.BasketSubmission &&!$rootScope.SipCancelation)  {
				Basketsub.show();	
		}
		}
	})
		$scope.CancelSipApp =function(){ 
		var url = "SIPModifications"
		var sendData = {
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"Deleted": true,
			"token":sessionStorage.getItem('Siptoken'),
			"Skipped": false,
			"Inprogress": false,
			"Email":  $rootScope.formData.fields.email,
			"OrderPlaced": false
		}
		serverService.apiCall(url, sendData).then(function (data) {
			var response = data.data;
			$rootScope.sipYesError=response.SuccessMessage;
			SipSucessDelete.show();
		});
		
		}
		$scope.SipFinish =function(){ 
			$rootScope.wizardShow = false;
			$state.go('register');
			$window.localStorage.clear()
			$window.sessionStorage.clear();
			setTimeout(function () {
				location.reload();
			}, 200)
		}
	$scope.frontpageApp =function(){
		$rootScope.wizardShow = false;
		$state.go('register');
		$window.localStorage.clear()
		$window.sessionStorage.clear();
		setTimeout(function () {
			location.reload();
		}, 200)
	}
	$scope.yesBasket = function () {
		if ($rootScope.BasketSubmission) {
			var url = "SIPBasketDeletion?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&BasketId=" + -1;
			serverService.getApi(url).then(function success(data) {
				var response = data.data;
				if (response.IsSuccess) {
					var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + "true";
					$rootScope.formData.apiLoading = true
					serverService.getApi(url).then(function success(data) {
						$rootScope.formData.apiLoading = false
						var response = data.data;
						$scope.sipcard = true;
						$scope.planlist1 = response.BasketDetails;
						$scope.planlist1.forEach(function (item, index) {
							$scope.sipOrLumpSelection[index] = 'SIP';
						});
						$scope.planlist1.forEach(function (item, index) {
							$scope.preferencesSelection[index] = 'Monthly';
						});
						$scope.planlist1.forEach(function (item, index) {
							$scope.SIPCreationDate[index] = new Date();
						});
						$scope.NoOfMonths = response.NoOfMonths;
					});
				}
			})
		} else {
			var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + "true";
			$rootScope.formData.apiLoading = true
			serverService.getApi(url).then(function success(data) {
				$rootScope.formData.apiLoading = false
				var response = data.data;
				$scope.sipcard = true;
				$scope.planlist1 = response.BasketDetails;
				$scope.planlist1.forEach(function (item, index) {
					$scope.sipOrLumpSelection[index] = 'SIP';
				});
				$scope.planlist1.forEach(function (item, index) {
					$scope.preferencesSelection[index] = 'Monthly';
				});
				$scope.planlist1.forEach(function (item, index) {
					$scope.SIPCreationDate[index] = new Date();
				});
				$scope.NoOfMonths = response.NoOfMonths;
			});
		}
	}
	
	$scope.openCollapse = function(index) {
        // Manually trigger the collapse
        for (let i = 0; i < $scope.planlist1.length; i++) {
            let targetId = '#collapseProfile' + (i + 1);
            if (i === index) {
                $(targetId).collapse('show');
            } else {
                $(targetId).collapse('hide');
            }
        }
    };

            $('a.collapseTag').on('focus', function () {
                var a = $(this).attr('title');
                $('#' + a).collapse('show');
            })

            $('input, select').on('keypress', function () {
                var a = $(this).closest('div.collapse').attr('id') + 'Error';
                $scope[a] = false;
            })
	$scope.noBasket = function () {
		var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + false;
		$rootScope.formData.apiLoading = true
		serverService.getApi(url).then(function success(data) {
			$rootScope.formData.apiLoading = false
			var response = data.data;
			// $scope.totalMinInvestAmount = 0;
			$scope.planlist1 = response.BasketDetails;
			$scope.planlist1.forEach(function (item, index) {
				$scope.sipOrLumpSelection[index] = 'SIP';
			});
			$scope.planlist1.forEach(function (item, index) {
				$scope.preferencesSelection[index] = 'Monthly';
			});
			$scope.planlist1.forEach(function (item, index) {
				$scope.SIPCreationDate[index] = new Date();
			});
			$scope.selectedPlans = $scope.planlist1.length;
			console.log($scope.selectedPlans);
			if ($scope.selectedPlans == 1) {
				$scope.Fristplans = true;
				$scope.Secondplans = false;
				$scope.Thirdplans = false;
			} else if ($scope.selectedPlans == 2) {
				$scope.Fristplans = false;
				$scope.Secondplans = true;
				$scope.Thirdplans = false;
			} else if ($scope.selectedPlans >= 3) {
				$scope.Fristplans = false;
				$scope.Secondplans = false;
				$scope.Thirdplans = true;
			}
			if($scope.selectedPlans==$scope.planlist1[0].BasketLimit){
				$scope.AddbasketDiv=true;
			}
			for (var i = 0; i < $scope.planlist1.length; i++) {
				$scope.totalMinInvestAmount += $scope.planlist1[i].BasketAmount;
			}
			console.log($scope.totalMinInvestAmount);
			if ($scope.planlist1[0].TotalInvestedAmount != 0) {
				$scope.SipChooseInvest = true;
				$scope.ChooseBasketDetails = true;
			} else {
				$scope.SipChooseInvest = true;
				$scope.FsttotalAmt = true;
			}

			$scope.sipcard = false;
			$scope.InvestSip = false;
			$scope.minDate = new Date().toISOString().split('T')[0];

			$scope.NoOfMonths = response.NoOfMonths;
		});
	}

	$rootScope.personalNewotpInput = {
		size: 6,
		type: "text",
		style: ({
			// lineColor:'black',
			color: '#5E50AD'
		}),
		onDone: function (value) {
			$rootScope.formData.fields.MobileNewOTP = value
		},
		onChange: function (value) {
			$rootScope.formData.fields.MobileNewOTP = value
		}
	}

	$scope.Skip = function () {
		var url = "SIPModifications"
		var sendData = {
			"Skipped": true,
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"Deleted": false,
			"Inprogress": false,
			"OrderPlaced": false
		}
		serverService.apiCall(url, sendData).then(function (data) {
			var response = data.data;
			if (response.IsSuccess) {
				$state.go('complete', {
					mobile: $rootScope.formData.EncMobile
				});
			}
		})

	}
	$scope.basket = function () {
		$scope.sipcard = true;
		$scope.SipChooseInvest = false;
		$scope.FsttotalAmt = false;
		$scope.SipminimumStocks = false;
		$scope.sipmaxStocks = false;

		// $scope.SipmaximumStocks=false;
		$scope.InvestSip = true;
		// $scope.selectedPlans=[];
		// var url = "SIPBasketDeletion?ReferenceNumber=" +  $rootScope.formData.eRefNumber+"&BasketId=" + -1;
		// serverService.getApi(url).then(function success(data) {
		// 	var response = data.data;
		// 	if(response.IsSuccess){
		var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + true;
		$rootScope.formData.apiLoading = true
		serverService.getApi(url).then(function success(data) {
			$rootScope.formData.apiLoading = false
			var response = data.data;
			$scope.sipcard = true;
			$scope.planlist1 = response.BasketDetails;
			$scope.NoOfMonths = response.NoOfMonths;
		});
		// }
		// });
	}
	$scope.Invest = function () {
		$scope.error = 0;
		$scope.SipminimumStocks = false;
		$scope.sipmaxStocks = false;
		// $scope.SipmaximumStocks=false;
		$scope.basketlimitErr = false;
		$scope.minDate = new Date().toISOString().split('T')[0];
		$scope.selectedPlans = $scope.planlist1.filter(function (plan) {
			/* plan.Inprogress = true; */
			plan.NumberOFstocks = plan._SIPStockMaster.length
			return plan.selected;
			
		});
		if ($scope.selectedPlans.length == 0) {
			$scope.SipminimumStocks = true;
			$scope.error++;
		} else if ($scope.selectedPlans.length > 1) {
			$scope.sipmaxStocks = true;
			$scope.error++;
		}
		// else if($scope.selectedPlans.length<3){
		// 	$scope.SipmaximumStocks=true;
		// 	$scope.error++;
		// }
		if ($scope.error == 0) {
			var url = "SIPInvest";
			var sendData = $scope.selectedPlans
			serverService.apiCall(url, sendData).then(function (data) {
				var response = data.data;
				if (response.IsSuccess) {
					$scope.InvestSip = false;
					$scope.SipChooseInvest = true;
					$scope.FsttotalAmt = true;
					$scope.sipcard = false;
					$scope.skipremovebtn = false;
					var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + false;
					$rootScope.formData.apiLoading = true
					serverService.getApi(url).then(function success(data) {
						$rootScope.formData.apiLoading = false
						var response = data.data;
						$scope.totalMinInvestAmount = 0;
						$scope.planlist1 = response.BasketDetails;
						$scope.selectedPlans = $scope.planlist1.length;
						console.log($scope.selectedPlans);
						if ($scope.selectedPlans == 1) {
							$scope.Fristplans = true;
							$scope.Secondplans = false;
							$scope.Thirdplans = false;
						} else if ($scope.selectedPlans == 2) {
							$scope.Fristplans = false;
							$scope.Secondplans = true;
							$scope.Thirdplans = false;
						} else if ($scope.selectedPlans >= 3) {
							$scope.Fristplans = false;
							$scope.Secondplans = false;
							$scope.Thirdplans = true;
						}
						if($scope.selectedPlans==$scope.planlist1[0].BasketLimit){
							$scope.AddbasketDiv=true;
						}
						for (var i = 0; i < $scope.planlist1.length; i++) {
							$scope.totalMinInvestAmount += $scope.planlist1[i].BasketAmount;
						}
						console.log($scope.totalMinInvestAmount);
						$scope.SipChooseInvest = true;
						$scope.ChooseBasketDetails = false;
						$scope.FsttotalAmt = true;
						$scope.sipcard = false;
						$scope.InvestSip = false;
						$scope.minDate = new Date().toISOString().split('T')[0];
						$scope.NoOfMonths = response.NoOfMonths;

					});
				} else {
					$scope.basketlimitErr = true;
					$scope.basketlimit = response.SuccessMessage
				}
			})
		}
	}
	$scope.hideFunc = function () {
		$scope.error = 0;
		$scope.dateEmptyErr = false;
		$scope.sipradio = false;
		if (!$("input[type=checkbox]#flexCheckChecked1").is(':checked')) {
			$scope.terms = true;
			$scope.error++;
		}
		if ($scope.error == 0) {
			var url = "SIPInvest";
			$scope.selectedPlans = $scope.planlist1.map((val, index) => {
				console.log(index, "indexxxxx");
				$scope.lumpsumVal = $scope.preferencesSelection[index] ? false : true;
				$scope.stockqty = val._SIPStockMaster.length
				console.log($scope.stockqty);
				if ($scope.lumpsumVal) {
					$scope.OneTimeWithSIP = false;
					$scope.OneTimeWithSIPTxt = "No";
				} else {
					$scope.OneTimeWithSIP = true;
					$scope.OneTimeWithSIPTxt = "Yes";
				}
				// if (!$scope.SIPCreationDate[index]) {
				// 	$scope.dateEmptyErr = true;
				// 	return;
				// }
				return { ...val, "TotalInvestedAmount": $scope.totalMinInvestAmount, "Preferences": $scope.preferencesSelection[index], 'OneTimeWithSIP': $scope.OneTimeWithSIP, 'Lumpsum': $scope.lumpsumVal, 'SIPCreationDate': $scope.SIPCreationDate[index], 'SecondSubmission': true, 'NumberOFstocks': $scope.stockqty,'Inprogress ': true }
			})

			console.log($scope.selectedPlans, "plasssss");
			var sendData = $scope.selectedPlans
			serverService.apiCall(url, sendData).then(function (data) {
				var response = data.data;
				if (response.IsSuccess) {
					$scope.FsttotalAmt = false;
					$scope.ChooseBasketDetails = true;
					var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + false;
					$rootScope.formData.apiLoading = true
					serverService.getApi(url).then(function success(data) {
						$rootScope.formData.apiLoading = false
						var response = data.data;
						$scope.planlist1 = response.BasketDetails;
					})
				}
			})
			var offsetHeight = document.getElementById('basket2').offsetHeight;
			document.getElementById("emptyBasket").style.height = `${offsetHeight}px`;
		}

	}
	var PreviewSip = new bootstrap.Modal(document.getElementById('PreviewSip'), {
		backdrop: 'static',
		keyboard: false
	});
	$scope.previewpagesip = function () { 
		$scope.error = 0;
		if (!$("input[type=checkbox]#flexCheckChecked").is(':checked')) {
			$scope.terms1 = true;
			$scope.error++;
		}
		if ($scope.error == 0) {
			PreviewSip.show();
		}
	}

	$scope.otp = function () {
		$scope.sipgenartion = false;
		$scope.error = 0;
		// if (!$("input[type=checkbox]#flexCheckChecked").is(':checked')) {
		// 	$scope.terms1 = true;
		// 	$scope.error++;
		// }
		if ($scope.error == 0) {
			var url = "SIPOTPGeneration";
			var sendData = {
				'Mobile': $rootScope.formData.fields.mobile ?$rootScope.formData.fields.mobile :sessionStorage.getItem("RxMobile"),
				'Email': $rootScope.formData.fields.email,
				"MobileFlag": true,
				"EmailFlag": true,
				"AssistLCCode": "",
				"AssistLGCode": "",
				"City": "",
				"ClientName": ""
			}

			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				if (response.IsSuccess) {
					$scope.RemoveDiv=true;
					PreviewSip.hide();
					$scope.FsttotalAmt = false;
					$scope.ChooseBasketDetails = false;
					$scope.SipEnterotp = true;
					$scope.skipremovebtn = false;
					if ($scope.mrunTimer) {
						clearInterval($scope.mrunTimer)
					}
					$rootScope.resendMobileCounter();
					if($rootScope.formData.fields.mobile){
						$scope.Convernumber=$rootScope.formData.fields.mobile.substring(6,10)
						console.log($scope.Convernumber)
					}
				} else {
					$scope.sipgenartion = true;
					$scope.sipotpERR = response.ErrorMessage
				}

			})
		}
	}
	$scope.newEmailValidate = function () {
		var url = "SIPOTPGeneration";
			var sendData = {
				'Mobile': $rootScope.formData.fields.mobile ?$rootScope.formData.fields.mobile :sessionStorage.getItem("RxMobile"),
				'Email': $rootScope.formData.fields.email,
				"MobileFlag": true,
				"EmailFlag": true,
				"AssistLCCode": "",
				"AssistLGCode": "",
				"City": "",
				"ClientName": ""
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				if (response.IsSuccess) {
					$scope.enableResendButton = false;
					if ($scope.mrunTimer) {
						clearInterval($scope.mrunTimer)
					}
					$rootScope.resendMobileCounter();
					if($rootScope.formData.fields.mobile){
						$scope.Convernumber=$rootScope.formData.fields.mobile.substring(6,10)
						console.log($scope.Convernumber)
					}
				} else {
					$scope.sipgenartion = true;
					$scope.sipotpERR = response.ErrorMessage
				}

			})
	}
	$scope.confirmOTP = function () {
		$scope.error = 0;

		$scope.OtpErrmsg = false;
		if ($scope.error == 0) {
			var url = "SIPOTPValidation";
			var sendData = {
				'Mobile': $rootScope.formData.fields.mobile ?$rootScope.formData.fields.mobile :sessionStorage.getItem("RxMobile"),
				'Email': $rootScope.formData.fields.email,
				"MobileOtpCode": '',
				"EmailOtpCode": $rootScope.formData.fields.MobileNewOTP,
				"MobileFlag": false,
				"EmailFlag": true,
				"IsDiy": true,
				"EncryptToken": $rootScope.EncryptToken
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				if (response.IsSuccess) {
					$scope.FsttotalAmt = false;
					$scope.ChooseBasketDetails = false;
					$scope.SipEnterotp = false;
					$scope.ConfirmSIPOTP = true;
					$scope.skipremovebtn = false;
					var url = "SIPModifications"
					var sendData = {
						"Skipped": false,
						"ReferenceNumber": $rootScope.formData.eRefNumber,
						"Deleted": false,
						"Inprogress": false,
						"Email":  $rootScope.formData.fields.email,
						"OrderPlaced": true
					}
					serverService.apiCall(url, sendData).then(function (data) {
						var response = data.data;
						if (response.IsSuccess) {
							$scope.orderplaced = true;
						}
					})
				} else {
					$scope.OtpErrmsg = true;
					$scope.OtpFailuremsg = response.ErrorMessage
				}
			})
		}
	}
	$scope.deletesip = function (i) {
		$scope.deleteId = i;
		var Deletebasket = new bootstrap.Modal(document.getElementById('Deletebasket'), {
			backdrop: 'static',
			keyboard: false
		});
		Deletebasket.show();
	}
	$scope.deletebasket = function () {
		var url = "SIPBasketDeletion?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&BasketId=" + $scope.deleteId;
		serverService.getApi(url).then(function success(data) {
			var response = data.data;
			if (response.IsSuccess) {
				var url = "GetSIPBasketDetails?ReferenceNumber=" + $rootScope.formData.eRefNumber + "&SmallCaseAPI=" + false;
				$rootScope.formData.apiLoading = true
				serverService.getApi(url).then(function success(data) {
					$rootScope.formData.apiLoading = false
					var response = data.data;
					// $scope.SipChooseInvest=true;
					// $scope.FsttotalAmt=true;
					$scope.sipcard = false;
					$scope.InvestSip = false;
					$scope.planlist1 = response.BasketDetails;
					if ($scope.planlist1[0].TotalInvestedAmount != 0) {
						if($scope.SipChooseInvest){
						$scope.SipChooseInvest = true;
						}else if($scope.ChooseBasketDetails){
						$scope.ChooseBasketDetails = true;
						}
					} else {
						$scope.SipChooseInvest = true;
						$scope.FsttotalAmt = true;
					}
					$scope.totalMinInvestAmount = 0;
					$scope.selectedPlans = $scope.planlist1.length;
					$scope.minDate = new Date().toISOString().split('T')[0];
					console.log($scope.selectedPlans);
					$scope.AddbasketDiv=false;
					if($scope.selectedPlans==$scope.planlist1[0].BasketLimit){
						$scope.AddbasketDiv=true;
					}
					for (var i = 0; i < $scope.planlist1.length; i++) {
						$scope.totalMinInvestAmount += $scope.planlist1[i].BasketAmount;
					}
					console.log($scope.totalMinInvestAmount);
					$scope.NoOfMonths = response.NoOfMonths;
				});
			}
		})
	}
	$rootScope.resendMobileCounter = function () {
		let mobileCounter = 59;
		$scope.mobileCounter = "00:59";
		$scope.mrunTimer = setInterval(function () {
			mobileCounter--;
			if (mobileCounter < 10) {
				mobileCounter = "0" + mobileCounter;
			}
			$scope.mobileCounter = '00:' + mobileCounter.toString();
			if (mobileCounter < 1) {
				$scope.enableResendButton = true;
				clearInterval($scope.mrunTimer);
			}
			$scope.$apply();
		}, 1000);
	}

	$scope.changePlan = function (value, index) {
		// if ($scope.totalMinInvestAmount) {
		// 	$scope.totalMinInvestAmount = 0
		// }
		// for (var i = 0; i < $scope.planlist1.length; i++) {
		// 	$scope.sipCalulate = $scope.sipOrLumpSelection[i] == "Lumpsum" ? $scope.planlist1[i].BasketAmountOnetime : $scope.planlist1[i].BasketAmountSIP;
		// 	$scope.totalMinInvestAmount += $scope.sipCalulate;
		// }
		if (value == "Lumpsum") {
			$scope.preferencesSelection[index] = "";
			$scope.SIPCreationDate[index] = null;
		} else if (value == "SIP") {
			$scope.preferencesSelection[index] = "Monthly";
			$scope.SIPCreationDate[index] = new Date();
		}
	};


	$scope.completeSip = function () {
		$state.go('complete', {
			mobile: $rootScope.formData.EncMobile
		});
	}
}
]);
