mainApp.controller('personalController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
	$rootScope.formData.stageInfo = '3';
	setTimeout(() => {
		var refno = sessionStorage.getItem('AxNo');
		if ($rootScope.getAPI) {
			if (sessionStorage.getItem('AxNo') != null && !$rootScope.BYOD && (!$rootScope.vcip || sessionStorage.getItem('mode') != "V")) {
				$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
				$rootScope.getDIYStatus();
			} else {
				window.location.href = (serverService.getHome());
			}
		} else if (!refno) {
			window.location.href = (serverService.getHome());
		}
	}, 1000)

	if ((sessionStorage.getItem('DobgetMismatch') != "Y" || sessionStorage.getItem('namegetMismatch') != "Y") && ($rootScope.vcip || sessionStorage.getItem('mode') == "V")) {
		$state.go('register');
		$rootScope.emailMobile = false;
		$rootScope.pan = true;
		setTimeout(function () {
			if (sessionStorage.getItem('namegetMismatch') != "Y") {
				$('#panCName').prop('disabled', false)
			}
			if (sessionStorage.getItem('DobgetMismatch') != "Y") {
				$('#txtDOB').prop('disabled', false)
			}
		}, 1000)
		return;
	}


	$rootScope.formData.apiLoading = true;
	$rootScope.formData.fields.resStatus = 'Resident Individual';
	$rootScope.formData.fields.citizen = 'India';
	$scope.hideNominee1 = true;
	$scope.hideNominee2 = true;
	$scope.hideNominee3 = true;
	$rootScope.formData.fields.NomineeRatio1 = 0;
	$rootScope.formData.fields.NomineeRatio2 = 0;
	$rootScope.formData.fields.NomineeRatio3 = 0;

	var Personal_Info_Stage = '';
	$scope.collapsePersonal = false;
	$scope.collapseFinancial = true;
	$scope.collapsePreference = true;
	$scope.collapseNominee = true;
	$scope.addressPrimary1 = true;
	$('#nsameAddress1').prop('checked', true);
	$scope.addressPrimary2 = true;
	$('#nsameAddress2').prop('checked', true);
	$scope.addressPrimary3 = true;
	$('#nsameAddress3').prop('checked', true);
	$scope.addressGuardian1 = true;
	$('#guardianAddress1').prop('checked', true);
	$scope.addressGuardian2 = true;
	$('#guardianAddress2').prop('checked', true);
	$scope.addressGuardian3 = true;
	$('#guardianAddress3').prop('checked', true);
	$rootScope.formData.fields.gender = "";
	$rootScope.formData.fields.gst = "N";
	$rootScope.formData.fields.anIncome = '';
	$rootScope.formData.fields.rdnContractNote = "";
	$rootScope.formData.fields.InternetTrading = "";
	$rootScope.formData.fields.dpCredit = "";
	$rootScope.formData.fields.dpPledge = "";
	$rootScope.formData.fields.rdnDemat = "";
	$rootScope.formData.fields.rdnElectEmail = "";
	$rootScope.formData.fields.shareEmail = "";
	$rootScope.formData.fields.rdnAnnualReport = "";
	$rootScope.formData.fields.rdnBankAcc = "";
	$rootScope.formData.fields.rdnDIS = "";
	$rootScope.formData.fields.agreeCall = "";
	$rootScope.formData.fields.rdnSetFunds = "";
	$rootScope.formData.fields.rdnSIP = "";
	$rootScope.formData.fields.taxOther = "";
	$rootScope.formData.fields.sFunds = "";
	$rootScope.formData.fields.tradeExp = '';
	$scope.subBroker = false;
	$rootScope.formData.resendNew = false;
	$rootScope.formData.nPin_valueError = false;
	$rootScope.formData.gPin_valueError = false;
	$rootScope.networthOptional = 'Optional';
	$scope.onloadValidate = true;
	$scope.gIdProofNumber1panSameError = false;
	$scope.gIdProofNumber2panSameError = false;
	$scope.gIdProofNumber3panSameError = false;
	$scope.nomineegIdProofNumber1panSameError = false;
	$scope.nomineegIdProofNumber2panSameError = false;
	$scope.nomineegIdProofNumber3panSameError = false
	$scope.pageload = false;
	$scope.rStatusdisabled = false;
	$scope.termsOpen = false;
	$rootScope.formData.fields.emailBelongs = 'S';
	$rootScope.formData.fields.mobileBelongs = 'S';
	$rootScope.formData.fields.emailNew = '';
	$scope.fsType = false;
	var Aahaar = /^\d{4}$/;
	var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
	var pan_cfilter = /[a-z]{3}[c|B|T|F|A|H|L|G|J][a-z]{1}\d{4}[a-z]/i;
	$scope.Mitc = true;
	$scope.rdnSetFundsError = false;

	$rootScope.nomineeNewFields = [];
	$rootScope.guardianNewFields = [];
	$rootScope.additionalAddress = [];
	$rootScope.GuardadditionalAddress = [];
	$rootScope.newCityList = [];
	$scope.showAddNew = false;
	$rootScope.nomineeRemoveIndex = -1;
	$scope.nomineeNewshowAddBtn = false;
	$rootScope.formData.fields.nominee = ''; //sabari

	$scope.nomineeDeclCheck1 = false;
	$scope.nomineeDeclCheck2 = false;
	$scope.nomineeDeclCheck3 = false;

	$rootScope.nomineePrint = "";
	$scope.printNomineeError = false;
	$scope.DisabilityVal = 'N';
	$scope.DisabilityValFreeeze = false;

	//$("#tpctry1").prop('checked', true);
	$("#MITCterms").prop('checked', false);
	$('#citizen').prop("disabled", true);
	$("#father").prop('checked', true);
	if (sessionStorage.getItem('RMEmailOTPVerified') === true || sessionStorage.getItem('RMEmailOTPVerified') === 'true') {
		$scope.rmemailOTPVerified = true;
		$scope.rmonloadValidate = false;
	}
	if (sessionStorage.getItem('RMMobileOTPVerified') === true || sessionStorage.getItem('RMMobileOTPVerified') === 'true') {
		$scope.mobileOTPVerified = true;
		$scope.onloadValidate = false;
	}
	if (sessionStorage.getItem('siddhiApp') === true || sessionStorage.getItem('siddhiApp') === 'true') {
		$rootScope.siddhiApp = true
	}
	if (sessionStorage.getItem('siddhiAppresume') === true || sessionStorage.getItem('siddhiAppresume') === 'true') {
		$rootScope.siddhiAppresume = true
	}

	setTimeout(function () {
		$('#trdExp').val('0');
		$('#pscrelation').val('N');
		$('#disputes').val('N');
		$('#anIncome').val('');
		//$("#nNo").prop('checked', true); //sabari
		$('#moTitle').val('MRS')
		$('#fsTitle').val('MR')
		$(".select").select2();
	}, 500)

	// Opening select2 tab on focus
	$(document).on('focus', '.select2', function (e) {
		if (e.originalEvent) {
			$(this).siblings('select').select2('open');
		}
	});
	if (sessionStorage.getItem('RxEmail')) {
		$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
		$rootScope.profileBEmailDisabled = true;
	}
	$rootScope.formData.stageOrder = 5;
	$("html, body").animate({
		scrollTop: 0
	}, "slow");
	// setTimeout(function(){
	//     $('input').on('ifChecked', function(event){
	//         alert('Checked');
	//       });
	// },5000);

	$scope.checkradioinit = function () {
		$(".select").select2();

		$('select[name=gender]').on('change', function (event) {
			if ($(this).val() == 'F' && $("select[name=marital]").val() == 'M') {
				$scope.maiden = true;
				$scope.fsType = true;
				$rootScope.formData.fields.fsType = 'F';
				$('#maidenTitle').val('');
				$("#father").prop('checked', true);
				$rootScope.formData.fields.maFirstName = '';
				$rootScope.formData.fields.maMiddleName = '';
				$rootScope.formData.fields.maLastName = '';
				setTimeout(function () {
					$(".select").select2();
				}, 100);
			} else {
				$scope.maiden = false;
				$scope.fsType = false;
				$rootScope.formData.fields.maFirstName = '';
				$rootScope.formData.fields.maMiddleName = '';
				$rootScope.formData.fields.maLastName = '';
			}
			$scope.$apply();
		});
		$("select[name='anIncome']").on('change', function (event) {
			$rootScope.formData.fields.anIncomeVal = $(this).val();
			if ($rootScope.formData.fields.anIncomeVal == 'AI') {
				$rootScope.networthOptional = ''
				$scope.$apply();
			} else {
				$rootScope.networthOptional = 'Optional'
				$scope.$apply();
			}
			$scope.$apply();
		});
		$('select[name=marital]').on('change', function (event) {
			if ($("select[name=gender]").val() == 'F' && $(this).val() == 'M') {
				$scope.maiden = true;
				$scope.fsType = true;
				setTimeout(function () {
					$(".select").select2();
				}, 100);
			} else {
				$scope.maiden = false;
				$scope.fsType = false;
				$rootScope.formData.fields.maFirstName = '';
				$rootScope.formData.fields.maMiddleName = '';
				$rootScope.formData.fields.maLastName = '';
			}
			$scope.$apply();
		});

		if ($('#anIncome').val() == 'AI') {
			$rootScope.networthOptional = ''
			$scope.$apply();
		} else {
			$rootScope.networthOptional = 'Optional'
			$scope.$apply();
		}
		$scope.$apply();

		$("select[name='broker']").on('change', function (event) {
			if ($(this).val() == "Y") {
				$scope.brokerDetails = true;
				$scope.$apply();
			} else {
				$scope.brokerDetails = false;
				$scope.disputeDetails = false;
				$scope.$apply();
			}
		});
		$("select[name='disputes']").on('change', function (event) {
			if ($(this).val() == "Y") {
				$scope.disputeDetails = true;
				$rootScope.formData.fields.disputes = 'Y';
				$scope.$apply();
			} else {
				$scope.disputeDetails = false;
				$rootScope.formData.fields.disputesDetails = '';
				$rootScope.formData.fields.disputes = 'N';
				$scope.$apply();
			}
		});
	}
	$("select[name='pscrelation']").on('change', function (event) {
		if ($("#pscrelation").val() == "Y" || $("#pscrelation").val() == "R") {
			$('#financialInfo').collapse('show');
			var politicalExposedModal = new bootstrap.Modal(document.getElementById('politicalExposed'), {
				backdrop: 'static',
				keyboard: false
			});
			politicalExposedModal.show();
		}
	});

	$scope.emstatus = function () {
		$scope.panEmailRegError = false;
		if ($rootScope.formData.fields.emailBelongs == 'S') {
			$scope.panEmailShow = false;
			$scope.panEmailError = false;
			$scope.panEmailSameError = false;
			$scope.emailBelongsError = true;
			$rootScope.formData.fields.emailPan = '';
		} else {
			$scope.panEmailShow = true;
			$scope.emailBelongsError = false;
		}
	}

	/* if(sessionStorage.getItem('RxMobile')){
	$scope.mobileOTPVerified = true;
	$scope.onloadValidate = false;
	} */
	$scope.mmstatus = function () {
		$scope.panMobileRegError = false;
		if ($rootScope.formData.fields.mobileBelongs == 'S') {
			$scope.panMobileShow = false;
			$scope.panMobileError = false;
			$scope.panMobileSameError = false;
			$scope.mobileBelongsError = true;
			$rootScope.formData.fields.mobilePan = '';

		} else {
			$scope.panMobileShow = true;
			$scope.mobileBelongsError = false;

		}
	}

	$scope.rdnContractNote = function () {
		if ($("#rdnContractNote").is(':checked')) {
			$rootScope.formData.fields.rdnContractNote = "Y";
			$rootScope.termsAndConditionsError = false;
		} else {
			$rootScope.formData.fields.rdnContractNote = "N";
		}
	}
	$scope.MITCterms = function () {
		if ($("#MITCterms").is(':checked')) {
			$scope.Mitc = true;
		} else {
			$scope.Mitc = false;
		}
	}
	$scope.tpctry1 = function () {
		if ($("#tpctry1").is(':checked')) {
			$rootScope.formData.fields.taxOther = "Y";
			$rootScope.fatcaError = false;

		} else {
			$rootScope.formData.fields.taxOther = "N";

		}
	}

	$scope.nomineePendingPrev = undefined;
	$scope.nomineePendingPrevPrint = undefined;

	$scope.nYes = function (value) {
		$scope.nomineeChoiceError = false;
		if (value == 'Y') {
			// "Yes" has no confirmation step - commit immediately (unchanged behaviour).
			$scope.nomineePendingPrev = undefined;
			$scope.nomineePendingPrevPrint = undefined;
			$rootScope.formData.fields.nominee = 'Y';
			$scope.addNominee();
		} else {
			// "No" is PENDING until the declaration popup is confirmed. Remember what
			// was committed so Cancel can restore it (fresh = '', existing = 'Y'/'N').
			// ng-model has already written 'N' to the field, so we only snapshot here.
			if ($scope.nomineePendingPrev === undefined) {
				$scope.nomineePendingPrev = $rootScope.formData.fields.nominee;
				$scope.nomineePendingPrevPrint = $rootScope.nomineePrint;
			}
			// The declaration popup must ALWAYS open on an explicit "No" click - including
			// for a fresh user with zero nominee rows. The old length > 0 guard meant a
			// fresh user got no popup and "No" was committed with no declaration at all.
			var NomineDeletePopUpModal = new bootstrap.Modal(document.getElementById('NomineDeletePopUp'), {
				backdrop: 'static',
				keyboard: false
			});
			NomineDeletePopUpModal.show();
		}
	}

	// $scope.internetTrading = function () {
	// 	if ($("#InternetTrading").is(':checked')) {
	// 		$scope.profileBTerms();
	// 		$rootScope.formData.fields.InternetTrading = "Y";

	// 	} else {
	// 		$rootScope.formData.fields.InternetTrading = "N";
	// 	}
	// }
	$scope.internetTrading = function () {
		if ($("#InternetTrading").is(':checked')) {
			$rootScope.formData.fields.InternetTrading = "Y";
			$scope.profileBTerms();
		} else {
			$rootScope.formData.fields.InternetTrading = "N";
			$scope.profileBTerms1();
		}
	}

	setTimeout(function () {
		$scope.checkradioinit();
	}, 500);

	$scope.cb = function () {
		$scope.cbError = true;
	}

	$('.info-cat').bind('mouseover touchstart', function () {
		$(this).siblings('.info-details').show();
		$(this).parents('p').siblings('.info-details').show();
	})

	$('.info-cat').bind('mouseleave touchend', function () {
		$(this).siblings('.info-details').hide();
		$(this).parents('p').siblings('.info-details').hide();
	})

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

	if ($rootScope.formData.fields.title == 'MR') {
		$('#gender').val('M');
		$rootScope.formData.fields.gender = 'M'
	} else if ($rootScope.formData.fields.title == 'MISS' || $rootScope.formData.fields.title == 'MRS' || $rootScope.formData.fields.title == 'MS') {
		$('#gender').val('F');
		$rootScope.formData.fields.gender = 'F'
	}

	if ($rootScope.formData.fields.title == 'MRS') {
		$('#marital').val('M');
		// $scope.fsType = true;
	}

	setTimeout(function () {
		$("#rStatus option:contains(" + $rootScope.formData.fields.resStatus + ")").prop('selected', true);
		$("#citizen").val('India');
		$(".select").select2();
		$scope.selectShow = true;
	}, 1000);

	$scope.resStatus = function () {
		var error = 0;
		if ($('#rStatus').val() != 'Resident Individual') {
			$scope.nonIndian = true;
			error++;
			//$("html, body").animate({ scrollTop: '1500px' }, "slow");
		} else {
			$scope.nonIndian = false;
		}
	};

	$scope.setsessionStorageData = function () {
		if ($rootScope.formData.kraData) {
			setTimeout(function () {
				if ($rootScope.formData.kraData.APP_MAR_STATUS == 'M') {
					$("select[name='marital']").val('M');
				} else if ($rootScope.formData.kraData.APP_MAR_STATUS == 'S') {
					$("select[name='marital']").val('S');
				}
				if (!$rootScope.formData.kraData.APP_MAR_STATUS) {
					if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCMaritalStatus == 'M') {
						$("select[name='marital']").val('M');
					} else if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCMaritalStatus == 'S') {
						$("select[name='marital']").val('S');
					}
				}
				if ($rootScope.formData.kraData.APP_GEN == 'M') {
					$('#gender').val('M');
				} else if ($rootScope.formData.kraData.APP_GEN == 'F') {
					$('#gender').val('F');
				}
				if (!$rootScope.formData.kraData.APP_GEN) {
					if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCGender == 'M') {
						$('#gender').val('M');
					} else if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCGender == 'F') {
						$('#gender').val('F');
					}
				}
				if ($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') {
					$('#gender').val('M');
					$rootScope.formData.fields.gender = 'M'
				} else if ($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS' || $rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS' || $rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') {
					$('#gender').val('F');
					$rootScope.formData.fields.gender = 'F'
				}
				$(".select").select2();
			}, 100);

			if ($rootScope.formData.kraData.APP_GEN == 'F' && $rootScope.formData.kraData.APP_MAR_STATUS == 'M') {
				$scope.fsType = true;
			}
			if (sessionStorage.getItem('IsKRA') == 'true') {
				if ($rootScope.formData.incomeRange.includes($rootScope.formData.kraData.APP_INCOME)) {
					$rootScope.formData.fields.anIncome = $rootScope.formData.kraData.APP_INCOME;
				}
				if ($rootScope.formData.kraData.APP_OCC && $rootScope.formData.kraData.APP_OCC != 0) {
					$rootScope.formData.fields.occupation = $rootScope.formData.kraData.APP_OCC;
				} else {
					if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCOccupation && $rootScope.formData.CKYCData.CKYCOccupation != 0) {
						$rootScope.formData.fields.occupation = $rootScope.formData.CKYCData.CKYCOccupation;
					}
				}
				$rootScope.formData.fields.netWorth = $rootScope.formData.kraData.APP_NETWRTH;
			}
		}
		Personal_Info_Stage = "Personal_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
		if (JSON.parse(sessionStorage.getItem(Personal_Info_Stage)) != null) {
			var Personal_Info = JSON.parse(sessionStorage.getItem(Personal_Info_Stage));
			$rootScope.formData.fields.gender = Personal_Info.gender;
			if ($rootScope.formData.fields.gender == "" || $rootScope.formData.fields.gender) {
				if ($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') {
					$('#gender').val('M');
					$rootScope.formData.fields.gender = 'M'
				} else if ($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS' || $rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS' || $rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') {
					$('#gender').val('F');
					$rootScope.formData.fields.gender = 'F'
				}
			}
			$rootScope.formData.fields.marital = Personal_Info.marital;
			$rootScope.formData.fields.fsType = Personal_Info.fsType;

			if (sessionStorage.getItem('IsKRA') == 'false') {
				if (Personal_Info.gender == "M") {
					$('#gender').val('M');
				} else if (Personal_Info.gender == "F") {
					$('#gender').val('F');
				} else if (Personal_Info.gender == "T") {
					$('#gender').val('T');
				}
				if ($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') {
					$('#gender').val('M');
					$rootScope.formData.fields.gender = 'M'
				} else if ($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS' || $rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS' || $rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') {
					$('#gender').val('F');
					$rootScope.formData.fields.gender = 'F'
				}
				if (Personal_Info.marital == "M") {
					$('#marital').val('M');
				} else {
					$('#marital').val('S');
				}
			}
			if (Personal_Info.fsType == "S") {
				$("#father").prop('checked', false);
				$("#spouse").prop('checked', true);
				$scope.fsType = true;
			} else {
				$("#father").prop('checked', true);
				$("#spouse").prop('checked', false);
			}

			if (Personal_Info.gender == "F" && Personal_Info.marital == "M") {
				$scope.maiden = true;
				$scope.fsType = true;
				$('#maidenTitle').val(Personal_Info.maTitle);
				$rootScope.formData.fields.maFirstName = Personal_Info.maFirstName;
				$rootScope.formData.fields.maMiddleName = Personal_Info.maMiddleName;
				$rootScope.formData.fields.maLastName = Personal_Info.maLastName;
			}
			$rootScope.formData.fields.fsTitle = Personal_Info.fsTitle;
			$rootScope.formData.fields.fsFirstName = Personal_Info.fsFirstName;
			$rootScope.formData.fields.moTitle = Personal_Info.moTitle;
			$rootScope.formData.fields.moFirstName = Personal_Info.moFirstName;
			$rootScope.formData.fields.moMiddleName = Personal_Info.moMiddleName;
			$rootScope.formData.fields.moLastName = Personal_Info.moLastName;
			$rootScope.formData.fields.maTitle = Personal_Info.maTitle;
			$rootScope.formData.fields.maFirstName = Personal_Info.maFirstName;
			$rootScope.formData.fields.maMiddleName = Personal_Info.maMiddleName;
			$rootScope.formData.fields.maLastName = Personal_Info.maLastName;
			$rootScope.formData.fields.emailBelongs = Personal_Info.emailBelongs;
			$rootScope.formData.fields.mobileBelongs = Personal_Info.mobileBelongs;
			$rootScope.formData.fields.occupation = Personal_Info.occupation;
			$rootScope.formData.fields.education = Personal_Info.education;
			$rootScope.formData.fields.annualIncome = Personal_Info.annualIncome;
			$('#anIncome').val($rootScope.formData.fields.annualIncome);

			if (Personal_Info.annualIncome == "1") {
				$("#anincome1").prop('checked', true);
				$("#anincome2").prop('checked', false);
				$("#anincome3").prop('checked', false);
				$("#anincome4").prop('checked', false);
				$("#anincome5").prop('checked', false);
			} else if (Personal_Info.annualIncome == "2") {
				$("#anincome1").prop('checked', false);
				$("#anincome2").prop('checked', true);
				$("#anincome3").prop('checked', false);
				$("#anincome4").prop('checked', false);
				$("#anincome5").prop('checked', false);
			} else if (Personal_Info.annualIncome == "4") {
				$("#anincome1").prop('checked', false);
				$("#anincome2").prop('checked', false);
				$("#anincome3").prop('checked', true);
				$("#anincome4").prop('checked', false);
				$("#anincome5").prop('checked', false);
			} else if (Personal_Info.annualIncome == "6") {
				$("#anincome1").prop('checked', false);
				$("#anincome2").prop('checked', false);
				$("#anincome3").prop('checked', false);
				$("#anincome4").prop('checked', true);
				$("#anincome5").prop('checked', false);
			} else if (Personal_Info.annualIncome == "7") {
				$("#anincome1").prop('checked', false);
				$("#anincome2").prop('checked', false);
				$("#anincome3").prop('checked', false);
				$("#anincome4").prop('checked', false);
				$("#anincome5").prop('checked', true);
			}

			$rootScope.formData.fields.netWorth = Personal_Info.networth;
			$rootScope.formData.fields.tradeExp = Personal_Info.tradingExperience;
			if ($rootScope.formData.fields.tradeExp == '0') {
				$scope.subBroker = false;
			} else {
				$scope.subBroker = true;
			}

			$rootScope.formData.fields.political = Personal_Info.politicalExposure;

			$rootScope.formData.fields.broker = Personal_Info.dealingExistingStockBroker;
			$("#pscrelation option:contains(" + $rootScope.formData.fields.political + ")").prop('selected', true);
			$("#pscrelation").val('N');
			$(".select").select2();
			$scope.selectShow = true;
			$rootScope.formData.fields.political = $('#pscrelation').val();
			if (Personal_Info.dealingExistingStockBroker == "Y") {
				$("#brYes").prop('checked', true);
				$("#brno").prop('checked', false);
				$rootScope.formData.fields.brokerName = Personal_Info.stockSubBrokerName;
			} else {
				$("#brYes").prop('checked', false);
				$("#brno").prop('checked', true);
			}

			$rootScope.formData.fields.cCode = Personal_Info.clientInfoId;
			$rootScope.formData.fields.exchangeName = Personal_Info.exchange;
			$rootScope.formData.fields.taxOther = Personal_Info.taxJurisdiction;

			// if ($rootScope.formData.fields.taxOther == "N") {
			//     $("#tpctry1").prop('checked', true);
			// } else {
			//     $("#tpctry1").prop('checked', false);
			// }

			if (Personal_Info.GSTINFlag == "Y") {
				$("#gstyes").prop('checked', true);
				$("#gstno").prop('checked', false);
				$scope.gstDetails = true;
				$rootScope.formData.fields.gstNumber = Personal_Info.GSTINNumber;
			} else {
				$("#gstyes").prop('checked', false);
				$("#gstno").prop('checked', true);
			}

			$rootScope.formData.fields.InternetTrading = Personal_Info.internetTrading;
			$rootScope.formData.fields.dpCredit = Personal_Info.dPRecieveForEachCredit;
			$rootScope.formData.fields.dpPledge = Personal_Info.dPtoacceptPledgeIns;
			$rootScope.formData.fields.rdnDemat = Personal_Info.dematStatement;
			$rootScope.formData.fields.rdnElectEmail = Personal_Info.emailStatement;
			$rootScope.formData.fields.shareEmail = Personal_Info.shareEmailWithRTA;
			$rootScope.formData.fields.rdnAnnualReport = Personal_Info.annualReport;
			$rootScope.formData.fields.rdnBankAcc = Personal_Info.interestInToBank;
			$rootScope.formData.fields.rdnContractNote = Personal_Info.contractNoteandOtherRelatedReports;
			$rootScope.formData.fields.rdnDIS = Personal_Info.DISBooklet;
			$rootScope.formData.fields.agreeCall = Personal_Info.agreeToReceivecall;
			//$rootScope.formData.fields.rdnSetFunds = Personal_Info.settlementOfFunds;
			$rootScope.formData.fields.rdnSIP = Personal_Info.EnableStockSIP;

			if ($rootScope.formData.fields.rdnAnnualReport == 'E') {
				$("#cb1171").prop('checked', false);
				$("#cb1172").prop('checked', true);
				$("#cb1173").prop('checked', false);
			} else if ($rootScope.formData.fields.rdnAnnualReport == 'P') {
				$("#cb1171").prop('checked', true);
				$("#cb1172").prop('checked', false);
				$("#cb1173").prop('checked', false);
			} else {
				$("#cb1171").prop('checked', false);
				$("#cb1172").prop('checked', false);
				$("#cb1173").prop('checked', true);
			}

			if ($rootScope.formData.fields.rdnBankAcc == 'Y') {
				$("#cb118").prop('checked', true);
			} else {
				$("#cb118").prop('checked', false);
			}

			if ($rootScope.formData.fields.rdnSetFunds == 'Q') {
				$('#rb33').prop('checked', true);
				$('#rb34').prop('checked', false);
			} else {
				$('#rb33').prop('checked', false);
				$('#rb34').prop('checked', true);
			}

			if ($rootScope.formData.fields.rdnSIP == 'Y') {
				$('#rb35').prop('checked', true);
				$('#rb36').prop('checked', false);
			} else {
				$('#rb35').prop('checked', false);
				$('#rb36').prop('checked', true);
			}

			setTimeout(function () {
				$scope.checkradioinit();
			}, 10);
		} else {
			if (sessionStorage.getItem('IsKRA') == 'true') {
				$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
				$rootScope.formData.CKYCData = JSON.parse(sessionStorage.getItem('CKYCResponseData'));
				$rootScope.formData.KRA = true;
				if ($rootScope.formData.kraData && !$rootScope.webfinacle) {
					if ($rootScope.formData.kraData.APP_F_NAME) {
						$rootScope.formData.fields.fsFirstName = $rootScope.formData.kraData.APP_F_NAME;

					} else {
						if ($rootScope.formData.CKYCData.CKYCFatherFirstName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.CKYCData.CKYCFatherFirstName;
						}
						if ($rootScope.formData.CKYCData.CKYCFatherMiddleName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + $rootScope.formData.CKYCData.CKYCFatherMiddleName;
						}
						if ($rootScope.formData.CKYCData.CKYCFatherLastName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + $rootScope.formData.CKYCData.CKYCFatherLastName;
						}
					}
					if ($rootScope.formData.CKYCData && !$rootScope.webfinacle) {
						if ($rootScope.formData.CKYCData.CKYCMotherFirstName) {
							$rootScope.formData.fields.moFirstName = $rootScope.formData.CKYCData.CKYCMotherFirstName;
						}
						if ($rootScope.formData.CKYCData.CKYCMotherMiddletName) {
							$rootScope.formData.fields.moMiddleName = $rootScope.formData.CKYCData.CKYCMotherMiddletName;
						}
						if ($rootScope.formData.CKYCData.CKYCMotherLastName) {
							$rootScope.formData.fields.moLastName = $rootScope.formData.CKYCData.CKYCMotherLastName;
						}
					}
				}

			} else if (sessionStorage.getItem('CKYC') == 'true' || sessionStorage.getItem('IsCKYC') == 'true') {
				$rootScope.formData.CKYCData = JSON.parse(sessionStorage.getItem('CKYCResponseData'));
				$rootScope.formData.CKYC = true;
				if ($rootScope.formData.CKYC) {
					if ($rootScope.formData.CKYCData && !$rootScope.webfinacle) {
						$rootScope.formData.fields.fsFirstName = $rootScope.formData.CKYCData.CKYCFatherFirstName;
						if ($rootScope.formData.CKYCData.CKYCFatherMiddleName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + $rootScope.formData.CKYCData.CKYCFatherMiddleName;
						}
						if ($rootScope.formData.CKYCData.CKYCFatherLastName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + $rootScope.formData.CKYCData.CKYCFatherLastName;
						}
						$rootScope.formData.fields.moFirstName = $rootScope.formData.CKYCData.CKYCMotherFirstName;
						$rootScope.formData.fields.moMiddleName = $rootScope.formData.CKYCData.CKYCMotherMiddletName;
						$rootScope.formData.fields.moLastName = $rootScope.formData.CKYCData.CKYCMotherLastName;
						setTimeout(function () {
							if ($rootScope.formData.CKYCData.CKYCMaritalStatus == 'M') {
								$("select[name='marital']").val('M');
							} else if ($rootScope.formData.CKYCData.CKYCMaritalStatus == 'S') {
								$("select[name='marital']").val('S');
							}
							/*if ($rootScope.formData.CKYCData.APP_INCOME) {
							$rootScope.formData.fields.anIncome = $rootScope.formData.CKYCData.APP_INCOME;
							}*/
							if ($rootScope.formData.CKYCData && $rootScope.formData.CKYCData.CKYCOccupation) {
								$rootScope.formData.fields.occupation = $rootScope.formData.CKYCData.CKYCOccupation;
							}
							if ($rootScope.formData.CKYCData.CKYCGender == 'M') {
								$('#gender').val('M');
							} else if ($rootScope.formData.CKYCData.CKYCGender == 'F') {
								$('#gender').val('F');
							}
							$(".select").select2();

						}, 10);
						/*if ($rootScope.formData.CKYCData.APP_GEN == 'F' && $rootScope.formData.CKYCData.APP_MAR_STATUS == 'M') {
						$scope.fsType = true;
						}*/
					}
				}
			}

		}

		if (!$rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
			$scope.rmemailOTPVerified = true;
			$scope.rmonloadValidate = false;
			$scope.mobileOTPVerified = true;
		}

		if ($rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
			$scope.rmemailOTPVerified = false;
			$scope.rmonloadValidate = true;
			// $scope.mobileOTPVerified = false;
		}

		setTimeout(function () {
			$scope.checkradioinit();
		}, 100);
	}
	if (($rootScope.formData.digiData || sessionStorage.getItem('digi')) && (sessionStorage.getItem('digiInfo') || $rootScope.formData.digilockerData)) {
		$rootScope.formData.digiData = true;
		if (sessionStorage.getItem('digiInfo')) {
			$rootScope.formData.digilockerData = JSON.parse(sessionStorage.getItem('digiInfo'));
			$rootScope.formData.fields.gender = $rootScope.formData.digilockerData.gender;
			//$rootScope.formData.fields.fsFirstName=$rootScope.formData.digilockerData.co.replace("S/O", "");
			$rootScope.Digimale = true;
		}
	}
	$scope.getPersonalInfo = function () {
		$(document.body).removeClass('modal-open');
		$('.modal-backdrop').remove();
		if (!$rootScope.getAPI) {
			var s_url = "DIYGetClientOtherInfoByReferenceNumber";
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber,
				IsDiy: true,
				EncryptToken: $rootScope.EncryptToken
			}
			$rootScope.formData.apiLoading = true;
			sendData = $rootScope.encryptReq(sendData);
			serverService.apiCall(s_url, sendData).then(function (a) {
				var response = $rootScope.decryptRes(a.data, 'Response');
				$rootScope.formData.apiLoading = false;
				if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				}
				var s_geturl = "GetOverallStatusDIY";
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber
				};
				serverService.apiCall(s_geturl, sendData).then(function (a) {
					var response = a.data;
					if (!response.IsSuccess && response.ErrorCode == '-1') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = response.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						return
					}
					$rootScope.siddhiApp = response.SiddhiApp
					sessionStorage.setItem('siddhiApp', $rootScope.siddhiApp);
					$rootScope.digiAadhar = response.DigiAadhar.substring(8, 12)
					sessionStorage.setItem('digiaadhaar', $rootScope.digiAadhar)
				})
				$scope.getLGandLC();
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
				$rootScope.EncryptToken = response.EncryptToken;
				sessionStorage.setItem('AxToken', response.EncryptToken);
				//$rootScope.overallStatus();
				if (response.IsSuccess && response.ObjCDIYClientOtherInfo.FatherNameFirstName) {
					$scope.DisabilityVal = response.ObjCDIYClientOtherInfo.DifferentlyAbledStatus;
					if ($scope.DisabilityVal) {
						$scope.DisabilityValFreeeze = true;
					}
					//$rootScope.formData.fields.citizen = response.ObjCDIYClientOtherInfo.Nationality;

					if (response.ObjCDIYClientOtherInfo.Mobile) {
						$rootScope.formData.fields.mobile = response.ObjCDIYClientOtherInfo.Mobile;
						sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
						$scope.mobileOTPVerified = true;
						$scope.onloadValidate = false;
					}
					if (response.ObjCDIYClientOtherInfo.Email) {
						$rootScope.formData.fields.email = response.ObjCDIYClientOtherInfo.Email
					}
					if (!$rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
						$scope.rmemailOTPVerified = true;
						$scope.rmonloadValidate = false;
						$scope.mobileOTPVerified = true;
					}

					if ($rootScope.verifyemail && ($rootScope.formData.RMModule || $rootScope.webJana || $rootScope.webfinacle)) {
						$scope.rmemailOTPVerified = false;
						$scope.rmonloadValidate = true;
						// $scope.mobileOTPVerified = false;
					}
					$rootScope.formData.fields.gender = response.ObjCDIYClientOtherInfo.Gender;
					if (response.ObjCDIYClientOtherInfo.Gender == "M") {
						$('#gender').val('M');
					} else if (response.ObjCDIYClientOtherInfo.Gender == "F") {
						$('#gender').val('F');
					} else if (response.ObjCDIYClientOtherInfo.Gender == "T") {
						$('#gender').val('T');
					}
					if ($rootScope.formData.fields.title == 'MR') {
						$('#gender').val('M');
						$rootScope.formData.fields.gender = 'M'
					} else if ($rootScope.formData.fields.title == 'MISS' || $rootScope.formData.fields.title == 'MRS' || $rootScope.formData.fields.title == 'MS') {
						$('#gender').val('F');
						$rootScope.formData.fields.gender = 'F'
					}
					if (response.ObjCDIYClientOtherInfo.MaritialStatus == "M") {
						$('#marital').val('M');
						if (response.ObjCDIYClientOtherInfo.Gender == "F") {
							$scope.fsType = true;
						}
					} else if (response.ObjCDIYClientOtherInfo.MaritialStatus == "S") {
						$('#marital').val('S');
					}

					if (response.ObjCDIYClientOtherInfo.FatherOrSpouseType == "F") {
						$("#father").prop('checked', true);
						$("#spouse").prop('checked', false);
					} else if (response.ObjCDIYClientOtherInfo.FatherOrSpouseType == "S") {
						$("#father").prop('checked', false);
						$("#spouse").prop('checked', true);
						$scope.fsType = true;
					}

					if (response.ObjCDIYClientOtherInfo.Gender == "F" && response.ObjCDIYClientOtherInfo.MaritialStatus == "M") {
						$scope.maiden = true;
						if (response.ObjCDIYClientOtherInfo.MaidenNameFirstName) {
							$('#maidenTitle').val('MISS');
						}
						$rootScope.formData.fields.maFirstName = response.ObjCDIYClientOtherInfo.MaidenNameFirstName;
						$rootScope.formData.fields.maMiddleName = response.ObjCDIYClientOtherInfo.MaidenNameMiddleName;
						$rootScope.formData.fields.maLastName = response.ObjCDIYClientOtherInfo.MaidenNameLastName;
					}

					if (response.ObjCDIYClientOtherInfo.FatherNameFirstName) {
						$('#fsTitle').val(response.ObjCDIYClientOtherInfo.FatherNamePrefixID);
						$rootScope.formData.fields.fsFirstName = response.ObjCDIYClientOtherInfo.FatherNameFirstName;
						if (response.ObjCDIYClientOtherInfo.FatherNameMiddleName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + response.ObjCDIYClientOtherInfo.FatherNameMiddleName
						}

						if (response.ObjCDIYClientOtherInfo.FatherNameLastName) {
							$rootScope.formData.fields.fsFirstName = $rootScope.formData.fields.fsFirstName + ' ' + response.ObjCDIYClientOtherInfo.FatherNameLastName
						}
					}
					setTimeout(function () {
						$('#fsTitle').val(response.ObjCDIYClientOtherInfo.FatherNamePrefixID);
						$('#moTitle').val(response.ObjCDIYClientOtherInfo.MotherNamePrefixID);
						$(".select").select2();
						$('#fsTitle').trigger('change');
						$('#moTitle').trigger('change');
					}, 500)
					if (response.ObjCDIYClientOtherInfo.MotherNameFirstName) {
						$('#moTitle').val(response.ObjCDIYClientOtherInfo.MotherNamePrefixID);
						$rootScope.formData.fields.moFirstName = response.ObjCDIYClientOtherInfo.MotherNameFirstName;
						$rootScope.formData.fields.moMiddleName = response.ObjCDIYClientOtherInfo.MotherNameMiddleName;
						$rootScope.formData.fields.moLastName = response.ObjCDIYClientOtherInfo.MotherNameLastName.trim();
					}
					if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto) {
						$rootScope.formData.fields.emailPan = response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto;
						$rootScope.formData.fields.emailBelongs = response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto;
					}
					if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "S") {
						$("#eself").prop('checked', true);
						$("#espouse").prop('checked', false);
						$("#eparent").prop('checked', false);
						$("#echildren").prop('checked', false);
					} else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "U") {
						$("#eself").prop('checked', false);
						$("#espouse").prop('checked', true);
						$("#eparent").prop('checked', false);
						$("#echildren").prop('checked', false);
						$scope.panEmailShow = true;
					} else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "P") {
						$("#eself").prop('checked', false);
						$("#espouse").prop('checked', false);
						$("#eparent").prop('checked', true);
						$("#echildren").prop('checked', false);
						$scope.panEmailShow = true;
					} else if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto == "C") {
						$("#eself").prop('checked', false);
						$("#espouse").prop('checked', false);
						$("#eparent").prop('checked', false);
						$("#echildren").prop('checked', true);
						$scope.panEmailShow = true;
					}

					if (response.ObjCDIYClientOtherInfo.MobilebelongstoPan) {
						$rootScope.formData.fields.mobilePan = response.ObjCDIYClientOtherInfo.MobilebelongstoPan;
					}
					if (response.ObjCDIYClientOtherInfo.Mobilebelongsto) {
						$rootScope.formData.fields.mobileBelongs = response.ObjCDIYClientOtherInfo.Mobilebelongsto;
					}
					if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "S") {
						$("#mself").prop('checked', true);
						$("#mspouse").prop('checked', false);
						$("#mparent").prop('checked', false);
						$("#mchildren").prop('checked', false);
					} else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "U") {
						$("#mself").prop('checked', false);
						$("#mspouse").prop('checked', true);
						$("#mparent").prop('checked', false);
						$("#mchildren").prop('checked', false);
						$scope.panMobileShow = true;
					} else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "P") {
						$("#mself").prop('checked', false);
						$("#mspouse").prop('checked', false);
						$("#mparent").prop('checked', true);
						$("#mchildren").prop('checked', false);
						$scope.panMobileShow = true;
					} else if (response.ObjCDIYClientOtherInfo.Mobilebelongsto == "C") {
						$("#mself").prop('checked', false);
						$("#mspouse").prop('checked', false);
						$("#mparent").prop('checked', false);
						$("#mchildren").prop('checked', true);
						$scope.panMobileShow = true;
					}
					$scope.mobileOTPVerified = true;
					$rootScope.formData.fields.occupation = response.ObjCDIYClientOtherInfo.Occupation;
					$rootScope.formData.fields.education = response.ObjCDIYClientOtherInfo.EducationValue;
					$rootScope.formData.fields.anIncome = response.ObjCDIYClientOtherInfo.AnnualIncome;
					$rootScope.formData.fields.sFunds = response.ObjCDIYClientOtherInfo.SourceofFund;
					$rootScope.formData.fields.netWorth = response.ObjCDIYClientOtherInfo.Networth;

					if (response.ObjCDIYClientOtherInfo.TradingExperience) {
						$rootScope.formData.fields.tradeExp = response.ObjCDIYClientOtherInfo.TradingExperience;
						if ($rootScope.formData.fields.tradeExp == '0') {
							$scope.subBroker = false;
						} else {
							$scope.subBroker = true;
						}
					}
					$('#trdExp').val($rootScope.formData.fields.tradeExp);
					if (response.ObjCDIYClientOtherInfo.DealingExistingStockBroker == "Y") {
						$("#broker").val('Y');

						$rootScope.formData.fields.brokerName = response.ObjCDIYClientOtherInfo.StockSubBrokerName;
						$rootScope.formData.fields.cCode = response.ObjCDIYClientOtherInfo.ClientInfoId;
						$rootScope.formData.fields.exchangeName = response.ObjCDIYClientOtherInfo.Exchange;
						$scope.brokerDetails = true;

					} else {
						$("#broker").val('N');
					}

					if (response.ObjCDIYClientOtherInfo.PastActions == "Y") {
						$scope.disputeDetails = true;
						$("#disputes").val('Y');
						$rootScope.formData.fields.disputes = response.ObjCDIYClientOtherInfo.PastActions;
					} else {
						$("#disputes").val('N');
					}

					if (response.ObjCDIYClientOtherInfo.GSTINFlag == "Y") {
						$("#gstyes").prop('checked', true);
						$("#gstno").prop('checked', false);
						$scope.gstDetails = true;
						$rootScope.formData.fields.gstNumber = response.ObjCDIYClientOtherInfo.GSTINNumber;
					} else {
						$("#gstyes").prop('checked', false);
						$("#gstno").prop('checked', true);
					}

					if (response.ObjCDIYClientOtherInfo.TaxJurisdiction == "N") {
						$("#tpctry1").prop('checked', false);
						$rootScope.formData.fields.taxOther = 'N';

						$rootScope.formData.fields.taxCountry = response.ObjCDIYClientOtherInfo.TaxJurisdictionCountry;
						$rootScope.formData.fields.tin = response.ObjCDIYClientOtherInfo.TaxIdentificationNumber;
						$rootScope.formData.fields.birthPlace = response.ObjCDIYClientOtherInfo.PlaceOfBirth;
						$rootScope.formData.fields.brithCountry = response.ObjCDIYClientOtherInfo.CountryOfBirth;

						$rootScope.formData.fields.jCity = response.ObjCDIYClientOtherInfo.JurisdictionCity;
						$rootScope.formData.fields.jDistrict = response.ObjCDIYClientOtherInfo.JurisdictionDistrict;
						$rootScope.formData.fields.jState = response.ObjCDIYClientOtherInfo.JurisdictionState;
						$rootScope.formData.fields.jPin = response.ObjCDIYClientOtherInfo.JurisdictionPinCode;
						$rootScope.formData.fields.jCountry = response.ObjCDIYClientOtherInfo.JurisdictionCountry;
						$rootScope.formData.fields.jAddress = response.ObjCDIYClientOtherInfo.JurisdictionAddress1 + response.ObjCDIYClientOtherInfo.JurisdictionAddress2 + response.ObjCDIYClientOtherInfo.JurisdictionAddress3;
					} else {
						$("#tpctry1").prop('checked', true);
						$rootScope.formData.fields.taxOther = 'Y';
						$("#MITCterms").prop('checked', true);
					}

					$rootScope.formData.fields.InternetTrading = response.ObjCDIYClientOtherInfo.InternetTrading;
					$rootScope.formData.fields.dpCredit = response.ObjCDIYClientOtherInfo.DPRecieveForEachCredit;
					$rootScope.formData.fields.dpPledge = response.ObjCDIYClientOtherInfo.DPtoacceptPledgeIns;
					$rootScope.formData.fields.rdnDemat = response.ObjCDIYClientOtherInfo.DematStatement;
					$rootScope.formData.fields.rdnElectEmail = response.ObjCDIYClientOtherInfo.EmailStatement;
					$rootScope.formData.fields.shareEmail = response.ObjCDIYClientOtherInfo.ShareEmailWithRTA;
					$rootScope.formData.fields.rdnAnnualReport = response.ObjCDIYClientOtherInfo.AnualReport;
					$rootScope.formData.fields.rdnBankAcc = response.ObjCDIYClientOtherInfo.InterestInToBank;
					$rootScope.formData.fields.rdnContractNote = response.ObjCDIYClientOtherInfo.ContractNoteandOtherRelatedReports;
					$rootScope.formData.fields.rdnDIS = response.ObjCDIYClientOtherInfo.DISBooklet;
					$rootScope.formData.fields.agreeCall = response.ObjCDIYClientOtherInfo.AgreeToReceivecall;
					if (response.ObjCDIYClientOtherInfo.SettlementOfFunds) {
						$rootScope.formData.fields.rdnSetFunds = response.ObjCDIYClientOtherInfo.SettlementOfFunds;
					}
					$rootScope.formData.fields.rdnSIP = response.ObjCDIYClientOtherInfo.EnableStockSIP;

					if ($rootScope.formData.fields.rdnContractNote == 'Y') {
						$("#rdnContractNote").prop('checked', true);
					} else {
						$("#rdnContractNote").prop('checked', false);
					}

					if ($rootScope.formData.fields.InternetTrading == 'Y') {
						$("#InternetTrading").prop('checked', true);
					} else {
						$("#InternetTrading").prop('checked', false);
					}

					if ($rootScope.formData.fields.rdnAnnualReport == 'E') {
						$("#cb1171").prop('checked', false);
						$("#cb1172").prop('checked', true);
						$("#cb1173").prop('checked', false);
					} else if ($rootScope.formData.fields.rdnAnnualReport == 'P') {
						$("#cb1171").prop('checked', true);
						$("#cb1172").prop('checked', false);
						$("#cb1173").prop('checked', false);
					} else {
						$("#cb1171").prop('checked', false);
						$("#cb1172").prop('checked', false);
						$("#cb1173").prop('checked', true);
					}

					if ($rootScope.formData.fields.rdnBankAcc == 'Y') {
						$("#cb118").prop('checked', true);
					} else {
						$("#cb118").prop('checked', false);
					}

					if ($rootScope.formData.fields.rdnDIS == 'Y') {
						$("#ecs1").prop('checked', true);
						$("#ecs2").prop('checked', false);
					} else {
						$("#ecs1").prop('checked', false);
						$("#ecs2").prop('checked', true);
					}

					if ($rootScope.formData.fields.rdnDemat == 'D') {
						$("#rbs31").prop('checked', true);
						$("#rbs32").prop('checked', false);
						$("#rbs33").prop('checked', false);
						$("#rbs34").prop('checked', false);
					} else if ($rootScope.formData.fields.rdnDemat == 'W') {
						$("#rbs31").prop('checked', false);
						$("#rbs32").prop('checked', true);
						$("#rbs33").prop('checked', false);
						$("#rbs34").prop('checked', false);
					} else if ($rootScope.formData.fields.rdnDemat == 'F') {
						$("#rbs31").prop('checked', false);
						$("#rbs32").prop('checked', false);
						$("#rbs33").prop('checked', true);
						$("#rbs34").prop('checked', false);
					} else {
						$("#rbs31").prop('checked', false);
						$("#rbs32").prop('checked', false);
						$("#rbs33").prop('checked', false);
						$("#rbs34").prop('checked', true);
					}

					if ($rootScope.formData.fields.rdnSetFunds == 'M') {
						$('#rdnSetFunds').val('M');
					} else if ($rootScope.formData.fields.rdnSetFunds == 'Y') {
						$('#rdnSetFunds').val('Y');
					} else {

						$('#rdnSetFunds').val('Q');

					}

					if ($rootScope.formData.fields.rdnSIP == 'Y') {
						$('#rb35').prop('checked', true);
						$('#rb36').prop('checked', false);
					} else {
						$('#rb35').prop('checked', false);
						$('#rb36').prop('checked', true);
					}

					$rootScope.formData.fields.political = response.ObjCDIYClientOtherInfo.PoliticalExposure;

					if (response.ObjCDIYClientOtherInfo.PoliticalExposure == "Y") {
						$("#pscrelation").val('Y');
					} else if (response.ObjCDIYClientOtherInfo.PoliticalExposure == "R") {
						$("#pscrelation").val('R');
					} else {
						$("#pscrelation").val('N');
					}

					if (response.ObjCDIYClientOtherInfo.ExpilicitContent != '') {
						$rootScope.formData.ExplicitContent = response.ObjCDIYClientOtherInfo.ExpilicitContent;
						$rootScope.formData.ExplicitCode = response.ObjCDIYClientOtherInfo.ExpilicitCode;
						$rootScope.ShowExplicitContent = true;
					}
					setTimeout(function () {
						$scope.checkradioinit();
					}, 100);

				} else {
					var aurl = "DIYGetClientPersonalInfoByReferenceNumber";
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
					sendData = $rootScope.encryptReq(sendData);
					serverService.apiCall(aurl, sendData).then(function (a) {
						var response = $rootScope.decryptRes(a.data, 'Response');
						if (response.IsSuccess) {
							$rootScope.formData.fields.title = response.ObjCDIYClientProfile.ClientPrefixID;
							// console.log($rootScope.formData.fields.title)
						} else if (!response.IsSuccess && response.ErrorCode == '-1') {
							$rootScope.formData.apiLoading = false;
							$rootScope.formData.panStatus1 = response.ErrorMessage;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
							return
						}

					});
					$scope.setsessionStorageData();

				}

			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		} else {
			$rootScope.formData.apiLoading = false;
			$scope.setsessionStorageData();
		}
	};

	setTimeout(function () {
		if ($rootScope.formData.tokenValidation && !$rootScope.EncryptToken) {
			var url = "GetEncrptToken";
			var sendData = {
				ReferenceNumber: sessionStorage.getItem('AxNo')
			}
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (data) {
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
	}, 800);

	$scope.getNomineeDetails = function () {
		var s_url = "DIYGetNomineeDetailsByReferenceNumber";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		}
		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;

			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				sessionStorage.setItem('AuthToken', response.EncryptToken);
			}
			if (response.IsSuccess) {
				if (response.IsSuccess) {
					if (response.NomineeFlag) {
						$rootScope.nomineePrint = response.NomineeFlag;
					}

					if (response.NomineeOptOutFlag == 'N') {
						$rootScope.formData.fields.nominee = 'N';
						$('#nYes').prop('checked', false);
						$('#nNo').prop('checked', true);
						$scope.nomineeDeclCheck1 = response.NomineeDeclCheck1;
						$scope.nomineeDeclCheck2 = response.NomineeDeclCheck2;
						$scope.nomineeDeclCheck3 = response.NomineeDeclCheck3;
						return;
					}

					// new nominee dynamic fields api response data binding starts here
					// A nominee counts as REAL only when it carries actual data. The API returns
					// ONE blank placeholder row (NomineeInfoId null, FirstName "") when nothing is
					// saved, so a plain length > 0 wrongly selected Yes for a fresh user.
					var savedNominees = (response.IpvPOAandNomineeList || []).filter(function (n) {
						return n && (n.NomineeInfoId != null || (n.FirstName && String(n.FirstName).trim() !== ''));
					});
					if (savedNominees.length > 0) {
						$rootScope.formData.fields.nominee = 'Y';
						$('#nYes').prop('checked', true);
						$('#nNo').prop('checked', false);
						let arr = savedNominees;
						console.log(arr)
						if (arr.length > 0) {
							let nominees = arr;

							$rootScope.nomineeNewFields = [];
							$rootScope.additionalAddress = [];
							$rootScope.guardianNewFields = [];
							$rootScope.GuardadditionalAddress = [];

							nominees.forEach((nominee, index) => {
								let nomineeFields = [
									{ field: "First name", value: nominee.FirstName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
									{ field: "Middle name", value: nominee.MiddleName || '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
									{ field: "Last name", value: nominee.LastName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
									{ field: "Date of birth", value: nominee.NomineeDOB || '', required: true, type: 'date' },
									{
										field: "Relationship", value: nominee.RelationshipWithNominee ? nominee.RelationshipWithNominee.toString() : '', required: true, type: 'dropdown',
										arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
										valueKey: 'NomineeValue'
									},
									{ field: "Mobile Number", value: nominee.Mobile || '', required: false, type: 'input', directive: 'digit', length: 10 }, //sabari	
									{ field: "Email ID", value: nominee.Email || '', required: false, type: 'input', directive: 'email' },  //sabari
									{
										field: "Id Proof", value: nominee.NomineeProofId ? nominee.NomineeProofId.toString() : '', required: false, type: 'dropdown',
										arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
										valueKey: 'DocumentTypeId'
									},
									{
										field: nominee.NomineeProofId.toString() === '1007' ? "Id proof number: (Last 4 digits)" : 'Id proof number', value: nominee.NomineeIDProofNumber || '',
										// required: nominee.NomineeProofId.toString() === '1012' ? false : true, type: 'input',
										required: false, type: 'input', //sabari
										directive: nominee.NomineeProofId.toString() === '1007' ? 'decimal' : 'alpha-numeric',
										length: nominee.NomineeProofId.toString() === '1007' ? 4 : nominee.NomineeProofId.toString() == '1015' ? 15 : nominee.NomineeProofId.toString() == '1017' ? 16 : 10
									},

									{ field: "Nominee share (%)", value: nominee.NomineeRatio || '', required: true, type: 'input', directive: 'decimal', length: 3 },
									{ field: '+ Add Nominee', type: 'button', class: 'col-md-6' },
									{ field: "sameAddress", value: nominee.IsNomineeSameAsApplicant === "1", required: false, type: 'checkbox', class: 'col-md-12 mb-5' },
									{ field: 'NomineeInfoId', value: nominee.NomineeInfoId, required: false, type: 'hidden' }
								];
								$rootScope.nomineeNewFields.push(nomineeFields);
								setTimeout(() => {
									$scope.initDatepicker(index, 'nominee');

								}, 0);
								// if (nominee.IsNomineeSameAsApplicant === "0") {
								// 	let nomineeAddress = [
								// 		{ field: "Your Address, Line 1", value: nominee.AddressLine1 || '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
								// 		{ field: "Your Address, Line 2", value: nominee.AddressLine2 || '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
								// 		{ field: "Your Address, Line 3", value: nominee.AddressLine3 || '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
								// 		{ field: "Pincode", value: nominee.PinCode.toString() || '', required: true, type: 'autocomplete' },
								// 		{ field: "State", value: nominee.State || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
								// 		{ field: 'District', value: nominee.District || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
								// 		{ field: "City", value: nominee.City || '', required: true, type: 'autocomplete' },
								// 		{ field: 'Country', value: nominee.Country || '', required: true, type: 'input', directive: 'alphapet', length: 5 },

								// 	];
								// 	setTimeout(() => {
								// 		const a = document.getElementById(`Pincode-${index}_value`);
								// 		if (a) a.value = nominee.PinCode.toString();
								// 		const b = document.getElementById(`City-${index}_value`);
								// 		if (b) b.value = nominee.City;
								// 	}, 1000);

								// 	// setTimeout(() => {
								// 	// 	nomineeAddress.filter((data) => data.field === 'Pincode')[0].value = nominee.PinCode.toString();
								// 	// 	$rootScope.additionalAddress[index] = nomineeAddress;
								// 	// }, 1000);
								// 	$rootScope.additionalAddress[index] = nomineeAddress;
								// }

								if (nominee.IsGuardian === "1") {
									let guardianFields = [
										{ field: "Guardian first name", value: nominee.GuardianFirstName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
										{ field: "Guardian middle name", value: nominee.GuardianMiddleName || '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
										{ field: "Guardian Last name", value: nominee.GuardianLastName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
										{ field: "Guardian Date of birth", value: nominee.GuardianDateofBirth || '', required: true, type: 'date' },
										{
											field: "Relationship with Minor", value: nominee.GuardianRelationship ? nominee.GuardianRelationship.toString() : '', required: true, type: 'dropdown',
											arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
											valueKey: 'NomineeValue'
										},
										{ field: "Guardian Mobile Number", value: nominee.GuardianMobile || '', required: false, type: 'input', directive: 'digit', length: 10 }, //sabari
										{ field: "Guardian Email ID", value: nominee.GuardianEmail || '', required: false, type: 'input', directive: 'email' }, //sabari
										{
											field: "Guardian Id Proof", value: nominee.GuardianProofId ? nominee.GuardianProofId.toString() : '', required: false, type: 'dropdown',
											arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
											valueKey: 'DocumentTypeId' //sabari
										},
										{
											field: nominee.GuardianProofId.toString() === '1007' ? "Guardian ID proof number: (Last 4 digits)" : 'Guardian Id proof number',
											value: nominee.GuardianIDProofNumber || '',
											// required: nominee.GuardianProofId.toString() === '1012' ? false : true, type: 'input',
											required: false, type: 'input', //sabari
											directive: nominee.GuardianProofId.toString() === '1007' ? 'decimal' : 'alpha-numeric',
											length: nominee.GuardianProofId.toString() === '1007' ? 4 : nominee.GuardianProofId.toString() == '1015' ? 16 : nominee.GuardianProofId.toString() == '1017' ? 16 : 10
										},
										{ field: "sameAddress", value: nominee.IsGuardianSamePermenantAddress === "1", required: false, type: 'checkbox', class: 'col-md-12 mb-5' }
									];
									setTimeout(() => {
										const a = document.getElementById(`Pincode-${index}-G_value`);
										if (a) a.value = nominee.PinCode.toString();
										const b = document.getElementById(`City-${index}-G_value`);
										if (b) b.value = nominee.City;
									}, 1000);

									$rootScope.guardianNewFields[index] = guardianFields;
									setTimeout(() => {
										$scope.initDatepicker(index, 'guardian');

									}, 0);

									// if (nominee.IsGuardianSamePermenantAddress === "0") {
									// 	let guardianAddress = [
									// 		{ field: "Your Address, Line 1", value: nominee.GuardianAddressLine1 || '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
									// 		{ field: "Your Address, Line 2", value: nominee.GuardianAddressLine2 || '', required: false, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
									// 		{ field: "Your Address, Line 3", value: nominee.GuardianAddressLine3 || '', required: false, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
									// 		{ field: "Pincode", value: nominee.GuardianPinCode.toString() || '', required: true, type: 'autocomplete' },
									// 		{ field: "State", value: nominee.GuardianState || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
									// 		{ field: 'District', value: nominee.GuardianDistrict, required: false, readonly: true, type: 'input', directive: 'alphapet' },
									// 		{ field: "City", value: nominee.GuardianCity || '', required: true, type: 'autocomplete' },
									// 		{ field: 'Country', value: nominee.GuardianCountry || '', required: true, type: 'input', directive: 'alphapet', length: 5 },
									// 	];
									// 	$rootScope.GuardadditionalAddress[index] = guardianAddress;
									// }
								}
							});
							setTimeout(() => {
								$(".select").select2();
							}, 250);
							$scope.nomineeNewPercentCheck('Nominee share (%)');
							console.log($rootScope.nomineeNewFields);
							console.log($rootScope.additionalAddress);
							console.log($rootScope.guardianNewFields);
						}
					} else {
						$rootScope.formData.fields.nominee = ''; //nithish
						$('#nYes').prop('checked', false);
						$('#nNo').prop('checked', false); //nithish
					}

					// new nominee dynamic fields api response data binding ends here


					setTimeout(function () {
						$scope.checkradioinit();
					}, 100)
				}
				setTimeout(function () {
					$scope.checkradioinit();
				}, 100)
			} else if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			} else {
				Personal_Info_Stage = "Personal_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
				if (JSON.parse(sessionStorage.getItem(Personal_Info_Stage)) != null) {
					$("#nYes").prop('checked', false);
					$("#nNo").prop('checked', true);
					$scope.hideNominee = true;
					$scope.hideNominee1 = true;
					$scope.hideNominee2 = true;
					$scope.hideNominee3 = true;
					var Personal_Info = JSON.parse(sessionStorage.getItem(Personal_Info_Stage));
					$('#nTitle').val(Personal_Info.nomineeTitle);
					$rootScope.formData.fields.nfirstName = Personal_Info.nomineeFirstName;
					$rootScope.formData.fields.nmiddleName = Personal_Info.nomineeMiddleName;
					$rootScope.formData.fields.nlastName = Personal_Info.nomineeLastName;
					$rootScope.formData.fields.nomineeRelation = Personal_Info.nomineeRelation;
					$('#nday').val(Personal_Info.nday);
					$('#nmonth').val(Personal_Info.nmonth);
					$('#nyear').val(Personal_Info.nyear);
					$scope.addressPrimary = Personal_Info.addressPrimary;
					$rootScope.formData.fields.nAddress = Personal_Info.naddress;
					$('#nPin_value').val(Personal_Info.npin);
					$rootScope.formData.fields.nStateName = Personal_Info.nstate;
					$rootScope.formData.fields.nDistrict = Personal_Info.ndistrict;
					$('#city3_value').val(Personal_Info.ncity);
					$scope.guardian = Personal_Info.guardian;
					$('#gTitle').val(Personal_Info.gTitle);
					$rootScope.formData.fields.gfirstName = Personal_Info.gfirstName;
					$rootScope.formData.fields.gmiddleName = Personal_Info.gmiddleName;
					$rootScope.formData.fields.glastName = Personal_Info.glastName;
					$scope.addressGuardian = Personal_Info.guardianAddress;
					$rootScope.formData.fields.gAddress = Personal_Info.gAddress;
					$('#gPin_value').val(Personal_Info.gpin);
					$rootScope.formData.fields.gStateName = Personal_Info.gstate;
					$rootScope.formData.fields.gDistrict = Personal_Info.gdistrict;
					$('#city4_value').val(Personal_Info.gcity);
					$rootScope.formData.fields.gTel = Personal_Info.gTel;
					$rootScope.formData.fields.gRelation = Personal_Info.gRelation;
					$rootScope.formData.fields.gEmail = Personal_Info.gEmail;

					setTimeout(function () {
						$scope.checkradioinit();
					}, 10)
				} else {
					$rootScope.formData.fields.nominee = ''; //sabari
					$scope.hideNominee = true;
					$scope.hideNominee1 = true;
					$scope.hideNominee2 = true;
					$scope.hideNominee3 = true;
				}
			}

			setTimeout(function () {
				$scope.checkradioinit();
			}, 10);
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});

	}
	setTimeout(function () {
		$scope.getNomineeDetails();
	}, 700);

	$scope.cancelDelete = function () {
		// CANCEL = nothing was confirmed, so nothing may change on the server and the
		// UI must go back to the state that was committed BEFORE the user clicked No.
		//   fresh user  -> ''   (nothing selected)
		//   existing Yes -> 'Y'  (nominee rows stay untouched)
		//   existing No  -> 'N'
		var prev = ($scope.nomineePendingPrev === undefined) ? '' : $scope.nomineePendingPrev;
		$rootScope.formData.fields.nominee = prev;
		if ($scope.nomineePendingPrevPrint !== undefined) {
			$rootScope.nomineePrint = $scope.nomineePendingPrevPrint;
		}
		$scope.nomineePendingPrev = undefined;
		$scope.nomineePendingPrevPrint = undefined;
		$('#nYes').prop('checked', prev === 'Y');
		$('#nNo').prop('checked', prev === 'N');
		// DELIBERATELY NOT calling $scope.noNominee() here. It runs NomineeRemoveNew(),
		// which calls the NomineeRemove API and PERMANENTLY DELETES saved nominee
		// records. Cancelling a declaration popup must never delete server data.
		// The intended opt-out deletion still happens in confirmNomineeOptOut().
		$scope.nomineeDeclCheck1 = false;
		$scope.nomineeDeclCheck2 = false;
		$scope.nomineeDeclCheck3 = false;
		setTimeout(function () {
			$scope.checkradioinit();
		}, 20);
	}

	$scope.confirmNomineeOptOut = function () {
		var url = "DIYNomineeOptOutNewEnc";
		var sendData = [{
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			NomineeDeclCheck1: $scope.nomineeDeclCheck1,
			NomineeDeclCheck2: $scope.nomineeDeclCheck2,
			NomineeDeclCheck3: $scope.nomineeDeclCheck3,
			// This function IS the opt-out confirmation, so the flag is explicitly 'N'.
			// Previously it read formData.fields.nominee, which only holds 'N' because
			// ng-model happens to write it on the radio click - a fragile coupling that
			// sent an empty flag whenever that write had not occurred.
			NomineeFlag: 'N'
		}];
		// The deployed service (mod-server-comm.min.js?ver=1.9) exposes apiCall but NOT
		// apiCallEnc - calling apiCallEnc threw TypeError after apiLoading was set true,
		// leaving the spinner stuck and the opt-out never saved. Matches the pattern used
		// by the sibling DIYNomineeRegistrationNewEnc call: encryptReq() + apiCall().
		sendData = $rootScope.encryptReq(sendData);
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				sessionStorage.setItem('AuthToken', response.EncryptToken);
			}
			if (response.IsSuccess) {
				// COMMIT POINT: "No" becomes the final state only after a successful opt-out.
				$rootScope.formData.fields.nominee = 'N';
				$scope.nomineePendingPrev = undefined;
				$scope.nomineePendingPrevPrint = undefined;
				$('#nYes').prop('checked', false);
				$('#nNo').prop('checked', true);
				$rootScope.formData.nomineeOptOutId = response.NomineeOptOutId;
				// Intended opt-out removal of any existing nominee records (unchanged).
				$scope.noNominee();
			} else {
				// Opt-out failed - nothing was saved, so roll back to the previous
				// committed state rather than leaving a phantom "No" selected.
				$rootScope.formData.fields.nominee = ($scope.nomineePendingPrev === undefined) ? '' : $scope.nomineePendingPrev;
				$('#nYes').prop('checked', $rootScope.formData.fields.nominee === 'Y');
				$('#nNo').prop('checked', $rootScope.formData.fields.nominee === 'N');
				$scope.nomineePendingPrev = undefined;
				$scope.nomineePendingPrevPrint = undefined;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}

	$scope.noNominee = function () {
		if ($rootScope.nomineeNewFields.length > 0) {
			$rootScope.nomineeNewFields.forEach((data, index) => {
				$scope.NomineeRemoveNew(index)
			})
		}
	}

	$scope.changeMobile = function () {
		$scope.changeNumber = true;
		$scope.panMobileRegError = false;
		$scope.invalidRmMble = false;
		$rootScope.formData.fields.otpNew = '';
		$scope.newOTP = false;
	}

	$scope.changeEmail = function () {
		$scope.changeEmailAddress = true;
		$scope.panEmailRegError = false;
		$rootScope.formData.fields.otpEmailNew = '';
		$scope.rmemailotpSuccess = false;
		$scope.rmnewEmailOTP = false;
		$rootScope.formData.applicationDisabled = true
		$rootScope.verifyEmailDiv = false;
		$rootScope.verifyEmailDivDisabled = true
	}

	$scope.changeEmail2 = function () {
		$scope.changeEmail();
	}
	$scope.newMobileErrClear = function () {
		$scope.emptyMobileNewB = false;
		$scope.invalidMobileNewB = false;
		$scope.sameNumber = false;
	}
	$scope.newMobileValidate = function () {
		$scope.panMobileRegError = false;
		$rootScope.formData.fields.otpNew = '';
		$scope.mobileOTPVerified = false;
		if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana || $rootScope.siddhiAppresume) {
			if ($scope.changeNumber) {
				$rootScope.formData.fields.mobile = $rootScope.formData.fields.mobileNewB;
			} else {
				$rootScope.formData.fields.mobileNewB = $rootScope.formData.fields.mobile;
			}
			if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '') {
				$scope.emptyMobileNewB = true;
				$scope.invalidMobileNewB = false;
				$scope.invalidRmMble = false
				return false
			}
			if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
				$scope.invalidMobileNewB = true;
				$scope.invalidRmMble = true
				$scope.emptyMobileNewB = false;
				return false
			}
		}
		if ($rootScope.formData.fields.mobileNewB == null || $rootScope.formData.fields.mobileNewB == '') {
			$scope.emptyMobileNewB = true;
			$scope.invalidMobileNewB = false;
			$scope.invalidRmMble = false
		} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobileNewB) == false) {
			$scope.invalidMobileNewB = true;
			$scope.invalidRmMble = false
			$scope.emptyMobileNewB = false;
		}
		// else if (($rootScope.formData.fields.mobileNewB === $rootScope.formData.fields.mobile) && !$rootScope.formData.RMModule && !$rootScope.webfinacle && !$rootScope.webJana &&!$rootScope.siddhiAppresume) {
		// 	$scope.sameNumber = true;
		// 	$scope.invalidMobileNewB = false;
		// 	$scope.invalidRmMble = false
		// 	$scope.emptyMobileNewB = false;
		// } 
		else {
			$scope.sameNumber = false;
			$scope.invalidMobileNewB = false;
			$scope.invalidRmMble = false
			$scope.emptyMobileNewB = false;
			if ($scope.resendotp) {
				$rootScope.formData.resendNew = true;
			}
			var url = "AuthorizeOTPGeneration";
			if (!$rootScope.formData.fields.email) {
				$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
			}

			var sendData = {
				'ReferenceNumber': $rootScope.formData.ReferenceNumber,
				'Mobile': $rootScope.formData.fields.mobileNewB,
				'Email': $rootScope.formData.fields.email,
				'MobileFlag': true,
				'EmailFlag': false,
				'IsDiy': true,
				'EncryptToken': $rootScope.EncryptToken,
				'AssistLGCode': $rootScope.formData.assistedLGCode,
				'AssistLCCode': $rootScope.formData.assistedLCCode,
				'City': $rootScope.formData.city,
				'ClientName': $rootScope.formData.clientName,
				"ProvidedEmailIdbelongingto": $rootScope.formData.fields.emailBelongs,
				"Mobilebelongsto": $rootScope.formData.fields.mobileBelongs,
				"PANNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
			};
			$rootScope.formData.otpEmail = undefined;
			$rootScope.formData.otpMobile = "xxxxxxxx" + ($rootScope.formData.fields.mobileNewB).substring(8, 10);
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$scope.resendotp = true;
				$rootScope.formData.apiLoading = false;
				$scope.otpSuccess = false;
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
					$scope.newOTP = true;
					$rootScope.OtpLimitExceed = false;
					/*$('#otp-resend').modal({
					backdrop: 'static',
					keyboard: true
					});*/
				} else {
					$rootScope.OtpLimitExceed = true;
					$scope.newOTP = false;
					$rootScope.OtpResponseMsg = response.ErrorMessage;
					var otpresendModal = new bootstrap.Modal(document.getElementById('otp-resend'), {
						backdrop: 'static',
						keyboard: false
					});
					otpresendModal.show();
				}

			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		}
	}
	$scope.newEmailValidate = function (type) {
		$scope.invalidEmail = false;
		$scope.btnType = type;
		$scope.rmemailOTPVerifiedError = false;
		$scope.rmlimitEmailOTP = false;
		//$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

		$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
		if (type === 'changeEmail') {
			if ($rootScope.formData.fields.emailNew == null || $rootScope.formData.fields.emailNew == '' || $rootScope.formData.fields.emailNew == undefined) {
				$scope.rmemptyEmail = true;
				$scope.rminvalidEmail = false;
				return false;
			} else if (!($scope.filter).test($rootScope.formData.fields.emailNew)) {
				$scope.rminvalidEmail = true;
				$scope.rmemptyEmail = false;
				return false;
			}
			//  else if ($rootScope.formData.fields.emailNew.toLowerCase() == $rootScope.formData.fields.email) {
			// 	$scope.rmsameEmail = true;
			// 	$scope.rminvalidEmail = false;
			// 	$scope.rmemptyEmail = false
			// 	return false;
			// } 
			else {
				var e = $rootScope.formData.fields.emailNew.split('@');
				var c = e[0].toLowerCase();
				if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
					$scope.rminvalidEmail = true;
					$scope.error++;
					return false;
				}
				$scope.newOTPforEmail = true;
				document.getElementById("emailIDNew").disabled = true;

				$rootScope.formData.fields.email = $rootScope.formData.fields.emailNew.toLowerCase();
				var url = "UpdateEmailChanged";
				sendData = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					Email: $rootScope.formData.fields.email
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.newEmailVerify = true;
						$rootScope.verifyemail = true;
					}
					else if (!response.IsSuccess && response.ErrorCode == '-1') {
						$rootScope.formData.apiLoading = false;
						$rootScope.formData.panStatus1 = response.ErrorMessage;
						var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
							backdrop: 'static',
							keyboard: false
						});
						paninformation.show();
						return
					}
				});

				$scope.getEmailVerificatioUrl();
			}

		} else if (type === 'pageLoad') {
			if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '' || $rootScope.formData.fields.email == undefined) {
				$scope.emptyEmail = true;
				$scope.invalidEmail = false;
				return false;
			}
			if (!($scope.filter).test($rootScope.formData.fields.email)) {
				$scope.invalidEmail = true;
				$scope.emptyEmail = false;
				return false;
			}
			if ($rootScope.formData.fields.email) {

				var e = $rootScope.formData.fields.email.split('@');
				var c = e[0].toLowerCase();
				if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
					$scope.invalidEmail = true;
					$scope.error++;
					return false;
				} else {
					$scope.rmemptyEmail = false;
					$scope.rminvalidEmail = false;
					$scope.rmsameEmail = false;
					$scope.emptyEmail = false;
					$scope.invalidEmail = false;
					$scope.sameEmail = false
					$rootScope.formData.fields.otpEmailNew = '';
					$scope.rmpageload = true;
					$rootScope.formData.fields.emailotpNew = '';
					$rootScope.profileBEmailDisabled = true;
					$scope.getEmailVerificatioUrl();
				}
			} else {
				$scope.invalidEmail = true;
				$('#input-1email').focus();
				return false;
			}

		}

		$rootScope.emailVerify = true;
		$scope.changeEmailAddress = false;
		if ($rootScope.formData.fields.emailNew) {
			$rootScope.formData.fields.email = $rootScope.formData.fields.emailNew;
		}

	}

	$scope.validateOTP = function () {

		if ($rootScope.formData.fields.email) {
			$scope.emptyEmail = false;
		} else {
			$scope.emptyEmail = true;
			return false;
		}

		var url = "UnAuthorizeOTPValidation";
		var sendData = {
			'Mobile': $rootScope.formData.fields.mobileNewB,
			'Email': $rootScope.formData.fields.email,
			"MobileOtpCode": $rootScope.formData.fields.otpNew,
			"EmailOtpCode": "",
			"DOB": ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
			"PanNumber": ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
			"MobileFlag": true,
			"EmailFlag": false,
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"IsDiy": true,
			"EncryptToken": $rootScope.EncryptToken,
			"ProvidedEmailIdbelongingto": $rootScope.formData.fields.emailBelongs,
			"Mobilebelongsto": $rootScope.formData.fields.mobileBelongs,
			"PANNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
		}

		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess == false) {
				$rootScope.formData.error = response.ErrorMessage;
			}
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
				$rootScope.formData.apiLoading = true;
				$scope.panMobileVerificationError = false;
				var murl = "MobileByReferenceNumberEnc";
				var msendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					Mobile: $rootScope.formData.fields.mobileNewB,
					MobileFlag: "Y"
				}
				msendData = $rootScope.encryptReq(msendData);
				serverService.apiCall(murl, msendData);

				var url = "InsertLandingDetails";
				var sendData = {
					'AssistLCCode': sessionStorage.getItem('AssistLCCode'),
					'AssistLGCode': sessionStorage.getItem('AssistLGCode'),
					'City': sessionStorage.getItem('User_City'),
					"EmailId": $rootScope.formData.fields.email,
					"MobileNumber": $rootScope.formData.fields.mobileNewB,
					"ClientName": sessionStorage.getItem('Username'),
					"EncryptToken": $rootScope.EncryptToken,
					"IsDiy": true,
					"ReferenceNumber": $rootScope.formData.ReferenceNumber
				}
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.EncryptToken = response.EncryptToken;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {

						$rootScope.formData.fields.mobile = $rootScope.formData.fields.mobileNewB;
						sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
						sessionStorage.setItem('AxToken', response.Token);
						$scope.changeNumber = false;
						$scope.otpSuccess = true;

						$scope.mobileOTPVerified = true;
						sessionStorage.setItem('RMMobileOTPVerified', true);
						$scope.invalidOTP = false;
						$scope.newOTP = false;
					} else {
						$scope.otpSuccess = false;
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
							backdrop: 'static',
							keyboard: false
						});
						APIResponseModal.show();
						$rootScope.apiResponseErrorMsg = response.ErrorMessage;
					}
				});
			} else {
				$scope.otpSuccess = false;
				$scope.invalidOTP = true;
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}

	$scope.validateEmailOTP = function () {
		$scope.rmemailotpSuccess = false;
		$scope.rminvalidEmailOTP = false;
		$scope.rmEmptyEmailOtp = false;
		var url = "UnAuthorizeOTPValidation";
		if ((($rootScope.formData.fields.otpEmailNew == null || $rootScope.formData.fields.otpEmailNew == '') && !$rootScope.formData.fields.email) || ($rootScope.formData.fields.otpEmailNew == null || $rootScope.formData.fields.otpEmailNew == '')) {
			$scope.rmEmptyEmailOtp = true;
			return false;
		} else {
			$scope.rmEmptyEmailOtp = false;
		}
		var emailId = '';
		if ($scope.btnType == 'changeEmail') {
			if ($rootScope.formData.fields.emailNew) {
				changeEmailId = $rootScope.formData.fields.emailNew
			} else if ($rootScope.formData.fields.email) {
				changeEmailId = $rootScope.formData.fields.email
			}
			emailId = changeEmailId;
		} else if ($scope.btnType == 'pageLoad') {
			emailId = $rootScope.formData.fields.email;
		} else {
			emailId = $rootScope.formData.fields.email;
		}
		var sendData = {
			//	'OtpCode': $rootScope.formData.fields.otpMobile,
			'Mobile': $rootScope.formData.fields.mobile,
			'Email': emailId,
			"MobileOtpCode": "",
			"EmailOtpCode": $rootScope.formData.fields.otpEmailNew,
			"DOB": ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
			"PanNumber": ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('SbPan'),
			"MobileFlag": false,
			"EmailFlag": true,
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"IsDiy": true,
			"EncryptToken": $rootScope.EncryptToken,
			"ProvidedEmailIdbelongingto": $rootScope.formData.fields.emailBelongs,
			"Mobilebelongsto": $rootScope.formData.fields.mobileBelongs,
			"PANNumber": $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				sessionStorage.setItem('SbToken', response.EncryptToken);
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
				$rootScope.verifyEmailDiv = false;
				$rootScope.verifyOTPSuccess = true;
				$rootScope.formData.applicationDisabled = false
				$rootScope.verifyemail = false;
				$rootScope.formData.emailOTPApi = false;
				if ($scope.btnType == 'changeEmail') {
					$rootScope.formData.fields.email = $rootScope.formData.fields.emailNew;
					$rootScope.formData.fields.emailNew = '';
					$scope.emailChange = true;
				} else if ($scope.btnType == 'pageLoad') {
					//$rootScope.formData.fields.email
				}
				//$rootScope.formData.fields.email = $rootScope.formData.fields.emailNew;
				//$rootScope.formData.fields.emailNew = '';
				sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
				$scope.changeEmailAddress = false;
				$scope.rmemailotpSuccess = true;
				if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana || $rootScope.siddhiAppresume) {
					$scope.rmverifyEmailDiv = false;
				}
				setTimeout(function () {
					$scope.rmemailotpSuccess = false;
				}, 7000)
				$scope.rminvalidEmailOTP = false;
				$scope.rmnewEmailOTP = false;
				$scope.rmpageload = false;
				$scope.rmemailOTPVerified = true;
				$scope.rmonloadValidate = false;
				$rootScope.formData.fields.email = emailId;
				$rootScope.profileBEmailDisabled = true;
				/*if (!$rootScope.webfinacle) {
				sessionStorage.setItem('RMEmailOTPVerified', true);
				}*/

				if ($rootScope.webfinacle || $rootScope.webJana || $rootScope.formData.RMModule) {
					$scope.rmemailOTPVerified = true;
					sessionStorage.setItem('RMEmailOTPVerified', true);
				}
			} else {
				$scope.rmemailotpSuccess = false;
				$scope.rminvalidEmailOTP = false;
				$scope.rmlimitEmailOTP = true;
				$scope.elimitError = response.ErrorMessage
			}

		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	}

	$scope.emailErrClear = function () {
		$scope.rmsameEmail = false;
		$scope.rmemptyEmail = false;
		$scope.rminvalidEmail = false;
	}
	// Networth not allowed Zero
	$('#netWorth1').keypress(function (e) {
		if (this.value.length == 0 && e.which == 48) {
			return false;
		}
	});

	$scope.nomineeShareChecking = function (value) {
		let nomineshrso = parseInt($rootScope.formData.fields.NomineeRatio2) + parseInt(value)
		if (value == "100" || value == 100) {
			$scope.AddNominee2Show = true
		} else if (nomineshrso == "100" || nomineshrso == 100) {
			$scope.AddNominee2Show = true
			$scope.AddNominee3Show = true
		} else {
			$scope.AddNominee2Show = false
			if ($rootScope.formData.fields.NomineeRatio2) {
				$scope.AddNominee3Show = false
			}
		}
	}

	$scope.nominee2ShareChecking = function (value) {
		let nomineesharcheck = parseInt($rootScope.formData.fields.NomineeRatio1) + parseInt(value)
		if (nomineesharcheck == "100" || nomineesharcheck == 100) {
			$scope.AddNominee3Show = true
		} else {
			$scope.AddNominee3Show = false
		}
	}

	$scope.personalValidate = function () {
		if (!$scope.validateNomineeFields()) {
			return;
		}
		$scope.collapsePDetailsError = false;
		$scope.nomineeInfoError = false;
		$scope.financialInfoError = false;
		var error = 0;
		if ($('#rStatus').val() != 'Resident Individual') {
			$scope.nonIndian = true;
			error++;
			//$("html, body").animate({ scrollTop: 0 }, "slow");
		} else {
			$scope.nonIndian = false;
		}
		if (!$scope.DisabilityVal) {
			$scope.DisabilityError = true;
			error++;
		} else {
			$scope.DisabilityError = false;
		}
		if (($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') && $rootScope.formData.fields.gender == 'F') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		}
		/*else if(($rootScope.formData.fields.title=='MR'||sessionStorage.getItem("Title")=='MR')&&$rootScope.formData.fields.gender=='T'){
		$scope.genderError1=true;
		error++;
		}*/
		else {
			$scope.genderError1 = false;
		}
		var fields = $('#additionalInfo input[type=text]');
		var fieldselect = $('#additionalInfo select');
		var field = '';
		var fieldvalue = '';
		fields.each(function () {
			var value = $(this).val();
			if (value.length < 2) {
				if (this.id != "mNames11" && this.id != "lName11" && this.id != "mName12" && this.id != "lName12" && this.id != "input-1email" && this.id != "input-1mob" && this.id != "input-RMmob" && this.id != "input-rmemail" && this.id != "input-1newmob" && this.id != "fName1" && this.id != "mName1" && this.id != "lName1" && this.id != "mName2" && this.id != "lName2" && this.id != 'emailIDNew' && this.id != 'panMobile' && this.id != 'panEmail') {
					field = this.id;
					var a = this.id + 'Error';
					$scope[a] = true;
					error++;
					if (error == 1) {
						setTimeout(function () {
							$('#' + field).focus();
						}, 100)
					}
				}
			} else {
				var a = this.id + 'Error';
				$scope[a] = false;
			}
		});

		fieldselect.each(function () {
			var value = $(this).val();
			if (value == null) {
				value = ""
			}
			if (value.length < 1) {
				if (this.id != 'maidenTitle') {
					fieldvalue = this.id;
					var a = this.id + 'Error';
					$scope[a] = true;
					error++;

					if (error == 1) {
						setTimeout(function () {
							$('#' + fieldvalue).focus();
						}, 100)
					}
				}

				$("html, body").animate({
					scrollTop: 300
				}, "slow");

			} else {
				if ($scope.maiden && $('#maidenTitle').val() && !($rootScope.formData.fields.maFirstName)) {
					$scope.fName1Error = true;
					error++;

					if (error == 1) {
						setTimeout(function () {
							$('#fName1').focus();
						}, 100)
					}
				}
				var a = this.id + 'Error';
				$scope[a] = false;
			}
		});
		let n = $rootScope.formData.fields.fsFirstName ? $rootScope.formData.fields.fsFirstName.replace(/\s+/g, "") : '';
		if (n.length < 3) {
			$scope.fNames11Error = true;
			setTimeout(function () {
				$('#fNames11').focus();
			}, 100)
		} else {
			$scope.fNames11Error = false;
		}

		if ($scope.fNames11Error) {
			error++;
		}

		if ($scope.changeEmailAddress && ($scope.emptyEmail || $scope.invalidEmail || $scope.sameEmail)) {
			error++;
			setTimeout(function () {
				$('#emailIDNew').focus();
			}, 100)

		}
		var zeroFilter = /[2-9][0-9]{10}/;
		if (!$rootScope.formData.fields.panNumber) {
			$rootScope.formData.fields.panNumber = sessionStorage.getItem('RxPan');
		}
		$rootScope.formData.fields.gender = $("#gender").val();
		$rootScope.formData.fields.marital = $("#marital").val();
		if ($scope.fsType) {
			$rootScope.formData.fields.fsType = $("input[name=fstype]:checked").val();
		} else {
			$rootScope.formData.fields.fsType = 'F';
		}
		$rootScope.formData.fields.fsTitle = $("#fsTitle").val();
		$rootScope.formData.fields.moTitle = $("#moTitle").val();
		$rootScope.formData.fields.maTitle = $("#maTitle").val();
		$rootScope.formData.fields.emailBelongs = $("input[name=emstatus]:checked").val();
		$rootScope.formData.fields.mobileBelongs = $("input[name=mmstatus]:checked").val();
		$rootScope.formData.fields.broker = $("#broker").val();
		$rootScope.formData.fields.political = $("#pscrelation").val();

		if (error == 0) {
			$scope.financeValidate();
		} else {
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
		}
	}

	$rootScope.formData.nomineeRelationList = [];
	$scope.getNomineerelation = function () {
		var s_url = "DIYGetNomineeRelationship";
		serverService.getApi(s_url).then(function (a) {
			var response = a.data;
			// $rootScope.formData.nomineeRelationList = [];
			$rootScope.formData.nomineeRelationList.length = 0;

			if (response.IpvPOAandNomineeList) {
				for (var i = 0; i < response.IpvPOAandNomineeList.length; i++) {
					$rootScope.formData.nomineeRelationList.push(response.IpvPOAandNomineeList[i]);
				}
			}
		});
	};

	$scope.getNomineerelation();

	$scope.getTrdExp = function () {
		$rootScope.formData.fields.tradeExp = $('#trdExp').val();
		if ($rootScope.formData.fields.tradeExp == '0') {
			$scope.subBroker = false;
			$rootScope.formData.fields.brokerName = '';
		} else {
			$scope.subBroker = true;
		}
	}

	$scope.financeValidate = function () {

		var error = 0;
		var fields = $('#financialInfo input,#financialInfo select');
		var field = '';
		fields.each(function () {
			var value = $(this).val();
			if (value == null) {
				value = '';
			}
			if (value.length < 1) {
				if (this.id == "pscrelation" || this.id == "trdExp" || this.id == "sFunds" || this.id == "occupation" || ((this.id == "clientcode" || this.id == "brokerName1") && ($scope.brokerDetails)) || (this.id == "disputes" && $scope.disputeDetails)) {
					field = this.id;
					var a = this.id + 'Error';
					$scope[a] = true;
					error++;
					$('#financialInfo').collapse('show');
					$scope.financialInfoError = true;
					if (error == 1) {
						setTimeout(function () {
							$('#' + field).focus();
						}, 1000)
						// if (field == 'occupation') {
						//     $("html, body").animate({ scrollTop: 0 }, "slow");
						// }
					}

				}
			} else {
				var a = this.id + 'Error';
				$scope[a] = false;
			}
		});

		$rootScope.formData.fields.occupation = $('#occupation').val();
		$rootScope.formData.fields.education = $('#education').val();
		$rootScope.formData.fields.annualIncome = $('#anIncome').val();
		$rootScope.formData.fields.tradeExp = $('#trdExp').val();
		$rootScope.formData.fields.rdnDemat = $("input[name=radio-ac]:checked").val();
		$rootScope.formData.fields.rdnDIS = $("#rdnDIS").val();
		$rootScope.formData.fields.rdnBankAcc = $("#rdnBankAcc").val();
		$rootScope.formData.fields.rdnAnnualReport = $("input[name=radio-annualReport]:checked").val();
		//$rootScope.formData.fields.rdnSetFunds = $("#rdnSetFunds").val();
		$rootScope.formData.fields.rdnSIP = $("input[name=sip]:checked").val();
		$rootScope.formData.fields.SourceofFund = $("#sFunds").val();

		var pref = $("input[name=checkbox-value]");

		var prefId = '';
		pref.each(function () {
			var value = $(this).is(':checked');

			if ((!value && this.id != "cb114") || $scope.sipError) {
				prefId = this.id;
				var a = this.id + 'Error';
				$scope[a] = true;
				error++;
				if (error == 1) {
					setTimeout(function () {
						$('#' + prefId).focus();
					}, 100);

				}
				if ($scope.sipError) {
					$("html, body").animate({
						scrollTop: '1000px'
					}, "slow");
				}
			}
		});
		if ($rootScope.formData.fields.taxOther == "Y") {
			var jFlag = null;
			$rootScope.formData.fields.taxCountry = '';
			$rootScope.formData.fields.jAddress = '';
			$rootScope.formData.fields.jPin = '';
			$rootScope.formData.fields.jState = '';
			$rootScope.formData.fields.jCity = '';
			$rootScope.formData.fields.jDistrict = '';
			$rootScope.formData.fields.jCountry = '';
		} else {
			var jFlag = "O";
			$rootScope.formData.fields.taxCountry = $('#taxCountry').val();
			$rootScope.formData.fields.jCountry = $('#jCountry').val();
			$rootScope.formData.fields.brithCountry = $('#birhtCountry').val();

			if ($rootScope.formData.fields.jAddress && ($rootScope.formData.fields.jAddress).length < 5) {
				$scope.taxaddlError = true;
				error++;
			}
		}

		var rdnContractNote = $("#rdnContractNote").is(':checked');
		var InternetTrading = $('#InternetTrading').is(':checked');
		var tpctry = $('#tpctry1').is(':checked');
		$scope.Mitc = $("#MITCterms").is(':checked');
		if (!rdnContractNote) {
			error++;
			$rootScope.termsAndConditionsError = true;
			return;
		} else {
			$rootScope.termsAndConditionsError = false;
		}
		if (!$scope.Mitc) {
			error++;
			$rootScope.termsAndConditionsError = true;
			return;
		} else {
			$rootScope.termsAndConditionsError = false;
		}
		// if($rootScope.formData.fields.InternetTrading != "Y"){
		// 	error++;
		// 	$rootScope.InternetTradingErrormsg = true;
		// 	return;
		// }else{
		// 	$rootScope.InternetTradingErrormsg = false;
		// }
		if ($("#rdnSetFunds").val() == '' || $("#rdnSetFunds").val() == null) {
			$scope.rdnSetFundsError = true;
			error++;
			return;
		} else {
			$scope.rdnSetFundsError = false;
		}
		if (!tpctry) {
			error++;
			$rootScope.fatcaError = true;
		} else {
			$rootScope.fatcaError = false;
		}


		if ($("#anIncome").val() == '' || $("#anIncome").val() == null) {
			if ($("#netWorth1").val() == '') {
				$rootScope.netWorth1Error = true;
				$rootScope.anIncomeError = true;
				error++;
				$('#financialInfo').collapse('show');
				$scope.financialInfoError = true;
				setTimeout(function () {
					$('#netWorth1').focus();
				}, 1000);
			} else {
				$rootScope.anIncomeError = true;
				error++;
				$('#financialInfo').collapse('show');
				$scope.financialInfoError = true;
				setTimeout(function () {
					$('#anIncome').focus();
				}, 1000);

			}
		}

		if ($("#netWorth1").val() == '') {
			if ($("#anIncome").val() == 'AI') {
				$rootScope.netWorth1Error = true;
				error++;
				$('#financialInfo').collapse('show');
				$scope.financialInfoError = true;
				setTimeout(function () {
					$('#netWorth1').focus();
				}, 1000);
			} else {
				$rootScope.netWorth1Error = false;
			}
		}

		//$scope.filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
		if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '' || $rootScope.formData.fields.email == undefined) {
			$scope.emptyEmail = true;
			$scope.invalidEmail = false;
			return false;
		}
		if (!($scope.filter).test($rootScope.formData.fields.email)) {

			$scope.invalidEmail = true;
			$scope.emptyEmail = false;
			return false;
		}
		if ($rootScope.formData.fields.email) {
			var e = $rootScope.formData.fields.email.split('@');
			var c = e[0].toLowerCase();
			if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c == 'xyz' || c == 'abc') {
				$scope.invalidEmail = true;
				$scope.error++;
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				return false;
			} else {
				$scope.emptyEmail = false;
				$scope.invalidEmail = false;
				$scope.sameEmail = false;
			}
		} else {
			$scope.invalidEmail = true;
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			setTimeout(function () {
				$('#input-1email').focus();
			}, 1000);
			return false;
		}

		if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana || $rootScope.siddhiAppresume) {
			if ($rootScope.formData.fields.mobile && $rootScope.formData.fields.mobile != 'null' && $rootScope.formData.fields.mobile != 'undefined') {
				$rootScope.formData.fields.RMmobile = $rootScope.formData.fields.mobile;
			}

			if (!$rootScope.formData.fields.mobile) {
				$scope.emptyMobileNewB = true;
				$scope.invalidRmMble = false;
				error++;
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				setTimeout(function () {
					$('#input-1mob').focus();
				}, 1000);
				return false;
			}
			if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
				$scope.invalidRmMble = true;
				$scope.emptyMobileNewB = false;
				error++;
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				setTimeout(function () {
					$('#iinput-1mob').focus();
				}, 1000);
				return false;
			} else {
				$scope.invalidRmMble = false;
				$scope.emptyMobileNewB = false;
				$rootScope.formData.fields.mobileNewB = $rootScope.formData.fields.mobile;
				$rootScope.formData.fields.mobile = $rootScope.formData.fields.mobile;
			}

			if ($rootScope.webfinacle || $rootScope.webJana || $rootScope.formData.RMModule) {
				$('#rStatus').prop('disabled', true)
				if (!$scope.mobileOTPVerified) {
					$scope.mobileOTPVerifiedError = true;
					$('#collapsePDetails').collapse('show');
					$scope.collapsePDetailsError = true;
					setTimeout(function () {
						$('#input-1mob').focus();
					}, 1000);
					error++;
				}
			}

			if ($rootScope.webfinacle || $rootScope.webJana || $rootScope.formData.RMModule) {
				if (!$scope.rmemailOTPVerified && $rootScope.verifyemail) {
					$scope.rmemailOTPVerifiedError = true;
					$('#input-1email').focus();
					error++;
				}
			}
		}
		if ($rootScope.verifyEmailDiv) {
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			$scope.invalidEmailOTP = true
			error++
		}
		if (!$rootScope.formData.fields.otpNew && $scope.newOTP) {
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			$scope.rmEmptyEmailOtp = true
			error++
		} else if ($scope.newOTP) {
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			$scope.rmEmptyEmailOtp = false
			$scope.invalidOTP = true
			error++
		}
		// sabari
		// MANDATORY: nomination Yes/No must be answered before leaving this stage.
		if ($rootScope.formData.fields.nominee !== 'Y' && $rootScope.formData.fields.nominee !== 'N') {
			$('#nomineeInfo').collapse('show');
			$scope.nomineeInfoError = true;
			$scope.nomineeChoiceError = true;
			error++;
		} else {
			$scope.nomineeChoiceError = false;
		}
		// if($scope.rdnContractNote && ($scope.hideNominee1 || $scope.hideNominee2 || $scope.hideNominee3)){
		// 	error++;
		// 	$scope.nonomineeCheckError = true
		// }else{
		// 	$scope.nonomineeCheckError = false
		// }
		if ($scope.changeEmailAddress) {
			if (!$rootScope.formData.fields.emailNew) {
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				$scope.changEmailEmptyError = true;
				error++;
			} else if ($scope.changeEmailAddress && $rootScope.formData.fields.emailNew) {
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				$scope.validateTheEmailOtp = true;
				error++;
			}
		}
		if ($scope.changeNumber && !$rootScope.formData.fields.mobileNewB) {
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			$scope.changeMobileEmptyError = true;
			error++;
		} else if ($scope.changeNumber) {
			if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobileNewB) == false) {
				$scope.invalidMobileNewB = true;
				$scope.invalidRmMble = true
				$scope.emptyMobileNewB = false;
				error++;
				$('#collapsePDetails').collapse('show');
				$scope.collapsePDetailsError = true;
				setTimeout(function () {
					$('#iinput-1mob').focus();
				}, 1000);
				return false;
			} else if ($scope.changeNumber && $rootScope.formData.fields.mobileNewB) {
				$scope.validateTheMobileOtp = true;
				return false
			}
		} else if ($scope.changeNumber && $rootScope.formData.fields.mobileNewB) {
			$scope.validateTheMobileOtp = true;
			$('#collapsePDetails').collapse('show');
			$scope.collapsePDetailsError = true;
			return false
		}
		if (!$rootScope.vcip) {
			var Emailrl = "CheckEmailMobileStatusDIY";
			var sendDataURL = {
				email: $rootScope.formData.fields.email,
				EncryptToken: $rootScope.EncryptToken,
				IsDiy: true,
				Mobile: $rootScope.formData.fields.mobile,
				ReferenceNumber: $rootScope.formData.eRefNumber
			}
			serverService.apiCall(Emailrl, sendDataURL).then(function (a) {
				var response = a.data;
				// if (response.IsSuccess) {
				if (response.MobileVerified != "Y") {
					$scope.panMobileVerificationError = true
					$('#collapsePDetails').collapse('show');
					$scope.collapsePDetailsError = true;
					return false;
				} else {
					if (error == 0) {
						$rootScope.fatcaError = false;
						$rootScope.termsAndConditionsError = false;
						if ($rootScope.nomineeNewFields.length > 0) {
							$scope.nomineeValidate();
						} else {
							$scope.personalUpdate();
						}
					}
				}
				// }
			})
		} else {
			if (error == 0) {
				$rootScope.fatcaError = false;
				$rootScope.termsAndConditionsError = false;
				if ($rootScope.nomineeNewFields.length > 0) {
					$scope.nomineeValidate();
				} else {
					$scope.personalUpdate();
				}
			}
		}

	};
	var abc = 0;
	$scope.personalUpdate = function () {
		// MANDATORY backstop - this function saves and navigates to Bank.
        if ($rootScope.formData.fields.nominee !== 'Y' && $rootScope.formData.fields.nominee !== 'N') {
            console.warn('[nominee] blocked in personalUpdate, value =', $rootScope.formData.fields.nominee);
            $('#nomineeInfo').collapse('show');
            $scope.nomineeInfoError = true;
            $scope.nomineeChoiceError = true;
            $rootScope.formData.apiLoading = false;
            $scope.$evalAsync();
            return;
        }
		var fsMname = '';
		var fsLname = '';
		var moMname = '';
		var moLname = '';
		var maMname = '';
		var maLname = '';

		if ($rootScope.formData.fields.moMiddleName) {
			moMname = " " + $rootScope.formData.fields.moMiddleName
		}

		if ($rootScope.formData.fields.moLastName) {
			moLname = " " + $rootScope.formData.fields.moLastName;
		}

		if ($rootScope.formData.fields.maMiddleName) {
			maMname = $rootScope.formData.fields.maMiddleName
		}

		if ($rootScope.formData.fields.maLastName) {
			maLname = $rootScope.formData.fields.maLastName;
		}
		$rootScope.formData.fields.resStatus = $('#rStatus').val();
		$rootScope.formData.fields.citizen = $('#citizen').val();
		sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
		sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
		if (($rootScope.formData.fields.title == 'MR' || sessionStorage.getItem("Title") == 'MR') && $rootScope.formData.fields.gender == 'F') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MISS' || sessionStorage.getItem("Title") == 'MISS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MRS' || sessionStorage.getItem("Title") == 'MRS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		} else if (($rootScope.formData.fields.title == 'MS' || sessionStorage.getItem("Title") == 'MS') && $rootScope.formData.fields.gender == 'M') {
			$scope.genderError1 = true;
			error++;
		}
		/*else if(($rootScope.formData.fields.title=='MR'||sessionStorage.getItem("Title")=='MR')&&$rootScope.formData.fields.gender=='T'){
		$scope.genderError1=true;
		error++;
		}*/
		else {
			$scope.genderError1 = false;
		}
		if ($rootScope.vcip) {
			var url = "VCIPImageValandExtraction?ReferNumber=" + $rootScope.formData.eRefNumber;
			$rootScope.formData.apiLoading = true
			serverService.getApi(url).then(function success(data) {
				$rootScope.formData.apiLoading = false
			})
		}
		var url = "DIYClientOtherInfo";
		var sendData = {
			ObjCDIYClientOtherInfo: {
				ReferenceNumber: "",
				ReferenceNumberEnc: $rootScope.formData.eRefNumber,
				Gender: $rootScope.formData.fields.gender,
				MaritialStatus: $rootScope.formData.fields.marital,
				Email: $rootScope.formData.fields.email,
				Mobile: $rootScope.formData.fields.mobile,
				FatherOrSpouseType: $rootScope.formData.fields.fsType,
				FatherHusName: $rootScope.formData.fields.fsFirstName,
				FatherNamePrefixID: $('#fsTitle').val(),
				FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
				FatherNameMiddleName: '',
				FatherNameLastName: '',
				MothersMaidenName: $rootScope.formData.fields.moFirstName + moMname + moLname,
				MotherNamePrefixID: $('#moTitle').val(),
				MotherNameFirstName: $rootScope.formData.fields.moFirstName,
				MotherNameMiddleName: moMname,
				MotherNameLastName: moLname,
				MaidenNamePrefixID: $scope.fsType ? $('#maidenTitle').val() : '',
				MaidenNameFirstName: $rootScope.formData.fields.maFirstName,
				MaidenNameMiddleName: maMname,
				MaidenNameLastName: maLname,
				EmailbelongstoPan: $rootScope.formData.fields.emailPan,
				ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
				MobilebelongstoPan: $rootScope.formData.fields.mobilePan,
				Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
				ProStage: "Profile2",
				ResidentialStatus: $rootScope.formData.fields.resStatus,
				Nationality: $rootScope.formData.fields.citizen,
				Occupation: $rootScope.formData.fields.occupation,
				EducationValue: $rootScope.formData.fields.education,
				AnnualIncome: $rootScope.formData.fields.annualIncome,
				Networth: $rootScope.formData.fields.netWorth,
				TradingExperience: $rootScope.formData.fields.tradeExp,
				PoliticalExposure: $rootScope.formData.fields.political,
				DealingExistingStockBroker: $rootScope.formData.fields.broker,
				StockSubBrokerName: $rootScope.formData.fields.brokerName,
				ClientInfoId: $rootScope.formData.fields.cCode,
				PastActions: $rootScope.formData.fields.disputes,
				DisputesDetails: $rootScope.formData.fields.disputesDetails,
				Exchange: $rootScope.formData.fields.exchangeName,
				GSTINFlag: $rootScope.formData.fields.gst,
				GSTINNumber: $rootScope.formData.fields.gstNumber,
				RelatedPartyFlag: 'N',
				TaxJurisdiction: $rootScope.formData.fields.taxOther,
				TaxJurisdictionCountry: $rootScope.formData.fields.taxCountry,
				PlaceOfBirth: $rootScope.formData.fields.birthPlace,
				TaxIdentificationNumber: $rootScope.formData.fields.tin,
				CountryOfBirth: $rootScope.formData.fields.brithCountry,
				JurisdictionAddrFlag: '',
				JurisdictionAddress1: '',
				JurisdictionAddress2: '',
				JurisdictionAddress3: '',
				JurisdictionCity: $rootScope.formData.fields.jCity,
				JurisdictionDistrict: $rootScope.formData.fields.jDistrict,
				JurisdictionState: $rootScope.formData.fields.jState,
				JurisdictionStateID: 0,
				JurisdictionCountry: $rootScope.formData.fields.jCountry,
				JurisdictionPinCode: $rootScope.formData.fields.jPin,
				InternetTrading: $rootScope.formData.fields.InternetTrading,
				DPRecieveForEachCredit: $rootScope.formData.fields.dpCredit,
				DPtoacceptPledgeIns: $rootScope.formData.fields.dpPledge,
				DematStatement: $rootScope.formData.fields.rdnDemat,
				EmailStatement: $rootScope.formData.fields.rdnElectEmail,
				ShareEmailWithRTA: $rootScope.formData.fields.shareEmail,
				AnualReport: $rootScope.formData.fields.rdnAnnualReport,
				InterestInToBank: $rootScope.formData.fields.rdnBankAcc,
				ContractNoteandOtherRelatedReports: $rootScope.formData.fields.rdnContractNote,
				DISBooklet: $rootScope.formData.fields.rdnDIS,
				SourceofFund: $rootScope.formData.fields.SourceofFund,
				AgreeToReceivecall: 'Y',
				SettlementOfFunds: $rootScope.formData.fields.rdnSetFunds,
				EnableStockSIP: $rootScope.formData.fields.rdnSIP,
				RiskCategory: 'L',
				ExpilicitContent: $rootScope.formData.ExplicitContent,
				ExpilicitCode: $rootScope.formData.ExplicitCode,
				ExpilicitFlag: $scope.ExplicitFlag,
				BrowserType: $rootScope.formData.browserType,
				EncryptToken: $rootScope.EncryptToken,
				PANNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
			},
			IsDiy: true,
		};
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			$rootScope.formData.applicationDisabled = false
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
				$rootScope.thirdCompleted = true;
				if ($rootScope.verifyemail) {
					if ($rootScope.newEmailVerify) {
						var EmailType = $rootScope.formData.fields.emailNew
					} else {
						var EmailType = $rootScope.formData.fields.email
					}
					var url = "EmailVerificationUrl";
					sendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
						Email: EmailType,
						ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs
					};
					//sendData = $rootScope.encryptReq(sendData);
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
					});
				}
				$rootScope.getAPI = false;
				$scope.dataPush();
				gtag('event', 'conversion', {
					'send_to': 'AW-727858862/Y94CCI-drNcaEK79iNsC',
					'value': 1.0,
					'currency': 'INR'
				});
				$state.go('bank', {
					mobile: $rootScope.formData.EncMobile
				});

			} else if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			} else {
				// if (abc == 0) {
				// 	$scope.personalUpdate();
				// 	abc++;
				// } else {

				$rootScope.formData.apiLoading = false;

				if (response.IsEmail) {
					$scope.panEmailRegError = true;
					$scope.panEmailRegMsg = response.ErrorMessage;
					$('#collapsePDetails').collapse('show');
					$scope.collapsePDetailsError = true;
					setTimeout(function () {
						$('#eself').focus();
					}, 1000);
				} else if (response.IsMobile) {
					$scope.panMobileRegError = true;
					$scope.panMobileRegMsg = response.ErrorMessage;
					$('#collapsePDetails').collapse('show');
					$scope.collapsePDetailsError = true;
					setTimeout(function () {
						$('#mself').focus();
					}, 1000)
				} else {
					var connection = new bootstrap.Modal(document.getElementById('connection'));
					connection.show();
				}
				// }
			}

		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	};

	$scope.dataPush = function () {
		dataLayer.push({
			event: 'StageChange',
			attributes: {
				'level complete': '3',
				'Gender': $rootScope.formData.fields.gender,
				'MaritialStatus': $rootScope.formData.fields.marital,
				'FatherOrSpouseType': $rootScope.formData.fields.fsType,
				'FatherOrSpouseName': $rootScope.formData.fields.fsFirstName,
				'FatherOrSpousePrefixID': $('#fsTitle').val(),
				'MotherNamePrefixID': $('#moTitle').val(),
				'MotherNameFirstName': $rootScope.formData.fields.moFirstName,
				'MotherNameMiddleName': $rootScope.formData.fields.moMiddleName,
				'MotherNameLastName': $rootScope.formData.fields.moLastName,
				'MaidenNamePrefixID': $('#maidenTitle').val(),
				'MaidenNameFirstName': $rootScope.formData.fields.maFirstName,
				'MaidenNameMiddleName': $rootScope.formData.fields.maMiddleName,
				'MaidenNameLastName': $rootScope.formData.fields.maLastName,
				'EmailbelongstoPan': $rootScope.formData.fields.emailPan,
				'ProvidedEmailIdbelongingto': $rootScope.formData.fields.emailBelongs,
				'MobilebelongstoPan': $rootScope.formData.fields.mobilePan,
				'Mobilebelongsto': $rootScope.formData.fields.mobileBelongs,
				'ResidentialStatus': $rootScope.formData.fields.resStatus,
				'Nationality': $rootScope.formData.fields.citizen,
				'Occupation': $rootScope.formData.fields.occupation,
				'EducationValue': $rootScope.formData.fields.education,
				'AnnualIncome': $rootScope.formData.fields.annualIncome,
				'Networth': $rootScope.formData.fields.netWorth,
				'TradingExperience': $rootScope.formData.fields.tradeExp,
				'PoliticalExposure': $rootScope.formData.fields.political,
				'DealingExistingStockBroker': $rootScope.formData.fields.broker,
				'StockSubBrokerName': $rootScope.formData.fields.brokerName,
				'ClientInfoId': $rootScope.formData.fields.cCode,
				'PastActions': $rootScope.formData.fields.disputes,
				'DisputesDetails': $rootScope.formData.fields.disputesDetails,
				'Exchange': $rootScope.formData.fields.exchangeName,
				'GSTINFlag': $rootScope.formData.fields.gst,
				'GSTINNumber': $rootScope.formData.fields.gstNumber,
				'TaxJurisdiction': $rootScope.formData.fields.taxOther,
				'TaxJurisdictionCountry': $rootScope.formData.fields.taxCountry,
				'PlaceOfBirth': $rootScope.formData.fields.birthPlace,
				'TaxIdentificationNumber': $rootScope.formData.fields.tin,
				'CountryOfBirth': $rootScope.formData.fields.brithCountry,
				'JurisdictionAddress1': "",
				'JurisdictionAddress2': "",
				'JurisdictionAddress3': "",
				'JurisdictionCity': $rootScope.formData.fields.jCity,
				'JurisdictionDistrict': $rootScope.formData.fields.jDistrict,
				'JurisdictionState': $rootScope.formData.fields.jState,
				'JurisdictionCountry': $rootScope.formData.fields.jCountry,
				'JurisdictionPinCode': $rootScope.formData.fields.jPin,
				'InternetTrading': $rootScope.formData.fields.InternetTrading,
				'DPRecieveForEachCredit': $rootScope.formData.fields.dpCredit,
				'DPtoacceptPledgeIns': $rootScope.formData.fields.dpPledge,
				'DematStatement': $rootScope.formData.fields.rdnDemat,
				'EmailStatement': $rootScope.formData.fields.rdnElectEmail,
				'ShareEmailWithRTA': $rootScope.formData.fields.shareEmail,
				'AnualReport': $rootScope.formData.fields.rdnAnnualReport,
				'InterestInToBank': $rootScope.formData.fields.rdnBankAcc,
				'ContractNoteandOtherRelatedReports': $rootScope.formData.fields.rdnContractNote,
				'DISBooklet': $rootScope.formData.fields.rdnDIS,
				'AgreeToReceivecall': 'Y',
				'SettlementOfFunds': $rootScope.formData.fields.rdnSetFunds,
				'EnableStockSIP': $rootScope.formData.fields.rdnSIP,
				'RiskCategory': 'L'
			}
		});

	}

	if ($rootScope.formData.RMModule || $rootScope.siddhiAppresume) {

		$scope.rmonloadValidate = true;
		$scope.rmpageload = false;
		if ($rootScope.formData.RMModule && $rootScope.formData.fields.email) {
			$rootScope.formData.fields.RMemail = $rootScope.formData.fields.email;
		}
		if ($rootScope.formData.fields.mobile) {
			$rootScope.formData.fields.RMmobile = $rootScope.formData.fields.mobile;
		}
	}

	$rootScope.$on("BKRA", function (evt, data) {
		if ($rootScope.bKRA) {
			$rootScope.bKRA = false;
			$scope.setsessionStorageData();
		}
	});

	$scope.getFinData = function () {
		$scope.finData = JSON.parse(sessionStorage.getItem('finData'));
		if (!$rootScope.formData.fields.email) {
			$rootScope.formData.fields.email = $scope.finData.basicInfo[0].EmailId;
			if ($scope.finData.basicInfo[0].EmailId && $scope.finData.basicInfo[0].EmailId.trim()) {
				$rootScope.profileBEmailDisabled = true;
			}
		}
		if (!$rootScope.formData.fields.mobile) {
			$rootScope.formData.fields.mobile = $scope.finData.basicInfo[0].Mobile;
		}
		var motherName = $scope.finData.basicInfo[0].MotherMaidenName.split(" ");
		if (!$rootScope.formData.fields.moFirstName) {
			$rootScope.formData.fields.moFirstName = motherName[0];
		}
		if (!$rootScope.formData.fields.moLastName) {
			$rootScope.formData.fields.moLastName = motherName[1];
		}
		$scope.rStatusdisabled = true;
		$('.IBBankDisabled').addClass('adisabled');

		if (!$rootScope.formData.fields.marital) {
			if ($scope.finData.basicInfo[0].MaritalStatus == "Y") {
				$rootScope.formData.fields.marital = "M";
				setTimeout(function () {
					$('#marital').val('M');
				}, 500)
			} else if ($scope.finData.basicInfo[0].MaritalStatus == "N") {
				$rootScope.formData.fields.marital = "S";
				setTimeout(function () {
					$('#marital').val('S');
				}, 500)
			} else {
				$rootScope.formData.fields.marital = "O";
				setTimeout(function () {
					$('#marital').val('O');
				}, 500)
			}
		}
		if (!$rootScope.formData.fields.education) {
			if ($scope.finData.basicInfo[0].education) {
				$rootScope.formData.fields.education = $scope.finData.basicInfo[0].education;
				setTimeout(function () {
					$('#education').val($rootScope.formData.fields.education);
				}, 500)
			}
		}

	}
	if (sessionStorage.getItem('finacle')) {
		$('#rStatus').prop('disabled', true);
	}
	setTimeout(function () {
		if (sessionStorage.getItem('finacle') && sessionStorage.getItem('finData')) {
			$scope.getFinData();
		}
	}, 1000)


	$scope.nomineeValidate = function () {
		// MANDATORY backstop - this function also saves and navigates to Bank.
        if ($rootScope.formData.fields.nominee !== 'Y' && $rootScope.formData.fields.nominee !== 'N') {
            console.warn('[nominee] blocked in nomineeValidate, value =', $rootScope.formData.fields.nominee);
            $('#nomineeInfo').collapse('show');
            $scope.nomineeInfoError = true;
            $scope.nomineeChoiceError = true;
            $rootScope.formData.apiLoading = false;
            $scope.$evalAsync();
            return;
        }
		var error = 0;

		var NomineeInfoListArr = [];

		if (error == 0) {
			if ($rootScope.vcip) {
				var url = "VCIPImageValandExtraction?ReferNumber=" + $rootScope.formData.eRefNumber;
				$rootScope.formData.apiLoading = true
				serverService.getApi(url).then(function success(data) {
					$rootScope.formData.apiLoading = false
				})
			}
			//$scope.personalUpdate();
			var fsMname = '';
			var fsLname = '';
			var moMname = '';
			var moLname = '';
			var maMname = '';
			var maLname = '';

			if ($rootScope.formData.fields.moMiddleName) {
				moMname = " " + $rootScope.formData.fields.moMiddleName
			}

			if ($rootScope.formData.fields.moLastName) {
				moLname = " " + $rootScope.formData.fields.moLastName;
			}

			if ($rootScope.formData.fields.maMiddleName) {
				maMname = $rootScope.formData.fields.maMiddleName
			}

			if ($rootScope.formData.fields.maLastName) {
				maLname = $rootScope.formData.fields.maLastName;
			}
			$rootScope.formData.fields.resStatus = $('#rStatus').val();
			$rootScope.formData.fields.citizen = $('#citizen').val();
			sessionStorage.setItem('RxEmail', $rootScope.formData.fields.email);
			sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);

			var url = "DIYClientOtherInfo";
			var sendData = {
				ObjCDIYClientOtherInfo: {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					Gender: $rootScope.formData.fields.gender,
					MaritialStatus: $rootScope.formData.fields.marital,
					Email: $rootScope.formData.fields.email,
					Mobile: $rootScope.formData.fields.mobile,
					FatherOrSpouseType: $rootScope.formData.fields.fsType,
					FatherHusName: $rootScope.formData.fields.fsFirstName,
					FatherNamePrefixID: $('#fsTitle').val(),
					FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
					FatherNameMiddleName: '',
					FatherNameLastName: '',
					MothersMaidenName: $rootScope.formData.fields.moFirstName + moMname + moLname,
					MotherNamePrefixID: $('#moTitle').val(),
					MotherNameFirstName: $rootScope.formData.fields.moFirstName,
					MotherNameMiddleName: moMname,
					MotherNameLastName: moLname,
					MaidenNamePrefixID: $scope.fsType ? $('#maidenTitle').val() : '',
					MaidenNameFirstName: $rootScope.formData.fields.maFirstName,
					MaidenNameMiddleName: maMname,
					MaidenNameLastName: maLname,
					EmailbelongstoPan: $rootScope.formData.fields.emailPan,
					ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
					MobilebelongstoPan: $rootScope.formData.fields.mobilePan,
					Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
					ProStage: "Profile2",
					ResidentialStatus: $rootScope.formData.fields.resStatus,
					Nationality: $rootScope.formData.fields.citizen,
					Occupation: $rootScope.formData.fields.occupation,
					EducationValue: $rootScope.formData.fields.education,
					AnnualIncome: $rootScope.formData.fields.annualIncome,
					Networth: $rootScope.formData.fields.netWorth,
					TradingExperience: $rootScope.formData.fields.tradeExp,
					PoliticalExposure: $rootScope.formData.fields.political,
					DealingExistingStockBroker: $rootScope.formData.fields.broker,
					StockSubBrokerName: $rootScope.formData.fields.brokerName,
					ClientInfoId: $rootScope.formData.fields.cCode,
					PastActions: $rootScope.formData.fields.disputes,
					DisputesDetails: $rootScope.formData.fields.disputesDetails,
					Exchange: $rootScope.formData.fields.exchangeName,
					GSTINFlag: $rootScope.formData.fields.gst,
					GSTINNumber: $rootScope.formData.fields.gstNumber,
					RelatedPartyFlag: 'N',
					TaxJurisdiction: $rootScope.formData.fields.taxOther,
					TaxJurisdictionCountry: $rootScope.formData.fields.taxCountry,
					PlaceOfBirth: $rootScope.formData.fields.birthPlace,
					TaxIdentificationNumber: $rootScope.formData.fields.tin,
					CountryOfBirth: $rootScope.formData.fields.brithCountry,
					JurisdictionAddrFlag: '',
					JurisdictionAddress1: '',
					JurisdictionAddress2: '',
					JurisdictionAddress3: '',
					JurisdictionCity: $rootScope.formData.fields.jCity,
					JurisdictionDistrict: $rootScope.formData.fields.jDistrict,
					JurisdictionState: $rootScope.formData.fields.jState,
					JurisdictionStateID: 0,
					JurisdictionCountry: $rootScope.formData.fields.jCountry,
					JurisdictionPinCode: $rootScope.formData.fields.jPin,
					InternetTrading: $rootScope.formData.fields.InternetTrading,
					DPRecieveForEachCredit: $rootScope.formData.fields.dpCredit,
					DPtoacceptPledgeIns: $rootScope.formData.fields.dpPledge,
					DematStatement: $rootScope.formData.fields.rdnDemat,
					EmailStatement: $rootScope.formData.fields.rdnElectEmail,
					ShareEmailWithRTA: $rootScope.formData.fields.shareEmail,
					AnualReport: $rootScope.formData.fields.rdnAnnualReport,
					InterestInToBank: $rootScope.formData.fields.rdnBankAcc,
					ContractNoteandOtherRelatedReports: $rootScope.formData.fields.rdnContractNote,
					DISBooklet: $rootScope.formData.fields.rdnDIS,
					SourceofFund: $rootScope.formData.fields.SourceofFund,
					AgreeToReceivecall: 'Y',
					SettlementOfFunds: $rootScope.formData.fields.rdnSetFunds,
					EnableStockSIP: $rootScope.formData.fields.rdnSIP,
					RiskCategory: 'L',
					ExpilicitContent: $rootScope.formData.ExplicitContent,
					ExpilicitCode: $rootScope.formData.ExplicitCode,
					ExpilicitFlag: $scope.ExplicitFlag,
					BrowserType: $rootScope.formData.browserType,
					EncryptToken: $rootScope.EncryptToken,
					PANNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan')
				},
				IsDiy: true,
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
					$rootScope.thirdCompleted = true;
					if ($rootScope.verifyemail) {
						if ($rootScope.newEmailVerify) {
							var EmailType = $rootScope.formData.fields.emailNew
						} else {
							var EmailType = $rootScope.formData.fields.email
						}
						var url = "EmailVerificationUrl";
						sendData = {
							ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
							Email: EmailType,
							ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs
						};
						//sendData = $rootScope.encryptReq(sendData);
						$rootScope.formData.apiLoading = true;
						serverService.apiCall(url, sendData).then(function (a) {
							var response = a.data;
							$rootScope.formData.apiLoading = false;
						});
					}
					// $scope.diyNomineeRegistration()
					// $scope.dataPush();
					/* dataLayer.push({
					'event': 'DIY PeronalDetails',
					'Application No': $rootScope.formData.ReferenceNumber,
					});*/
					$rootScope.getAPI = false;

					// new nominee dynamic fields api request starts here

					if ($rootScope.nomineeNewFields.length > 0) {
						let arr = [];
						$rootScope.nomineeNewFields.forEach((fields, index) => {
							let obj = {};
							obj.Title = $('#nTitle').val();
							obj.Country = "INDIA";

							fields.forEach((data) => {
								if (data.field === "First name") {
									obj.FirstName = data.value;
									obj.IsNominee = obj.FirstName ? '1' : '0';
								}
								if (data.field === "Middle name") {
									obj.MiddleName = data.value;
								}
								if (data.field === "Last name") {
									obj.LastName = data.value;
								}
								if (data.field === "Date of birth") {
									obj.DOB = data.value;
								}
								if (data.field === "Relationship" || data.field === "Relationship with Minor") {
									// nomineeTemplate names it "Relationship"; API-resume names it "Relationship with Minor".
									obj.RelationshipWithNominee = data.value;
								}
								if (data.field === "Id Proof") {
									obj.NomineeProofId = data.value;
								}
								if (data.field === "Id proof number" || data.field === 'Id proof number: (Last 4 digits)') {
									obj.NomineeIDProofNumber = data.value;
								}
								if (data.field === "Mobile Number") {
									obj.Mobile = data.value;
								}
								if (data.field === "Email ID") {
									obj.Email = data.value;
								}
								if (data.field === 'Nominee share (%)') {
									obj.NomineeRatio = data.value;
								}
								if (data.field === "sameAddress") {
									obj.IsNomineeSameAsApplicant =  '0';
								}
								if (data.field === 'NomineeInfoId') {
									obj.NomineeInfoId = data.value;
								}
								// if (obj.IsNomineeSameAsApplicant == '0') {
								// 	$rootScope.additionalAddress[index].forEach((address) => {
								// 		if (address.field === "Your Address, Line 1") {
								// 			obj.AddressLine1 = address.value;
								// 		}
								// 		if (address.field === "Your Address, Line 2") {
								// 			obj.AddressLine2 = address.value;
								// 		}
								// 		if (address.field === "Your Address, Line 3") {
								// 			obj.AddressLine3 = address.value;
								// 		}
								// 		if (address.field === "City") {
								// 			obj.City = address.value;
								// 		}
								// 		if (address.field === "District") {
								// 			obj.District = address.value;
								// 		}
								// 		if (address.field === "State") {
								// 			obj.State = address.value;
								// 		}
								// 		if (address.field === "Pincode") {
								// 			obj.PinCode = address.value;
								// 		}

								// 	})
								// }
								if ($rootScope.guardianNewFields.length > 0 && $rootScope.guardianNewFields[index]) {
									$rootScope.guardianNewFields[index].forEach((guardian) => {
										obj.IsGuardian = "1";
										if (guardian.field === "Guardian first name") {
											obj.GuardianFirstName = guardian.value;
										}
										if (guardian.field === "Guardian middle name") {
											obj.GuardianMiddleName = guardian.value;
										}
										if (guardian.field === "Guardian Last name") {
											obj.GuardianLastName = guardian.value;
										}
										if (guardian.field === "Relationship with Minor" || guardian.field === "Relationship") {
											obj.GuardianRelationship = guardian.value;
										}
										if (guardian.field === 'Guardian Date of birth') {
											obj.GuardianDOB = guardian.value;
										}
										if (guardian.field === "Guardian Id Proof") {
											obj.GuardianProofId = guardian.value;
										}
										if (guardian.field === "Guardian Id proof number" || guardian.field === 'Guardian ID proof number: (Last 4 digits)') {
											obj.GuardianIDProofNumber = guardian.value;
										}
										if (guardian.field === 'Guardian Mobile Number') {
											obj.GuardianMobile = guardian.value;
										}
										if (guardian.field === 'Guardian Email ID') {
											obj.GuardianEmail = guardian.value;
										}
										// if (guardian.field === 'sameAddress') {
										// 	obj.IsSameNomineeANDGuardianAddess = guardian.value ? "1" : '0';
										// 	obj.IsGuardianSamePermenantAddress = guardian.value ? "1" : '0';
										// }
										// 		if (obj.IsGuardianSamePermenantAddress == '0') {
										// 			$rootScope.GuardadditionalAddress[index].forEach((guard_address) => {
										// 				obj.GuardianCountry = "INDIA";
										// 				if (guard_address.field === "Your Address, Line 1") {
										// 					obj.GuardianAddressLine1 = guard_address.value;
										// 				}
										// 				if (guard_address.field === "Your Address, Line 2") {
										// 					obj.GuardianAddressLine2 = guard_address.value;
										// 				}
										// 				if (guard_address.field === "Your Address, Line 3") {
										// 					obj.GuardianAddressLine3 = guard_address.value;
										// 				}
										// 				if (guard_address.field === "City") {
										// 					obj.GuardianCity = guard_address.value;
										// 				}
										// 				if (guard_address.field === "District") {
										// 					obj.GuardianDistrict = guard_address.value;
										// 				}
										// 				if (guard_address.field === "State") {
										// 					obj.GuardianState = guard_address.value;
										// 				}
										// 				if (guard_address.field === "Pincode") {
										// 					obj.GuardianPinCode = guard_address.value;
										// 				}

										// 			})
										// 		}
									}
									)
								}
							});
							arr.push(obj);
						});
						NomineeInfoListArr = NomineeInfoListArr.concat(arr);
					}

					// new nominee dynamic fields api request ends here

					var s_url = "DIYNomineeRegistrationNewEnc";

					var sendData = [{
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						NomineeInfoList: NomineeInfoListArr,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken,
						NameOfNominee: ($rootScope.nomineePrint === 'N' ? 'Y' : ($rootScope.nomineePrint === 'Y' ? 'N' : '')),
						NomineeFlag: $rootScope.nomineePrint
					}
					]
					sendData = $rootScope.encryptReq(sendData);
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							sessionStorage.setItem('AuthToken', response.EncryptToken);
						}
						if (response.IsSuccess) {
							$rootScope.thirdCompleted = true;
							$rootScope.getAPI = false;
							$scope.dataPush();
							gtag('event', 'conversion', {
								'send_to': 'AW-727858862/Y94CCI-drNcaEK79iNsC',
								'value': 1.0,
								'currency': 'INR'
							});
							$state.go('bank', {
								mobile: $rootScope.formData.EncMobile
							});
						} else if (!response.IsSuccess && response.ErrorCode == '-1') {
							$rootScope.formData.apiLoading = false;
							$rootScope.formData.panStatus1 = response.ErrorMessage;
							var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
								backdrop: 'static',
								keyboard: false
							});
							paninformation.show();
							return
						} else {
							$rootScope.formData.apiLoading = false;
							var connection = new bootstrap.Modal(document.getElementById('connection'));
							connection.show();
						}
					}, function (e) {
						$rootScope.formData.apiLoading = false;
						var connection = new bootstrap.Modal(document.getElementById('connection'));
						connection.show();
					});

				} else if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				} else {
					$rootScope.formData.apiLoading = false;

					if (response.IsEmail) {
						$scope.panEmailRegError = true;
						$scope.panEmailRegMsg = response.ErrorMessage;
						$('#collapsePDetails').collapse('show');
						$scope.collapsePDetailsError = true;
						setTimeout(function () {
							$('#eself').focus();
						}, 1000);
					} else if (response.IsMobile) {
						$scope.panMobileRegError = true;
						$scope.panMobileRegMsg = response.ErrorMessage;
						$('#collapsePDetails').collapse('show');
						$scope.collapsePDetailsError = true;
						setTimeout(function () {
							$('#mself').focus();
						}, 1000)
					} else {
						var connection = new bootstrap.Modal(document.getElementById('connection'));
						connection.show();
					}
				}

			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		} else {
			$rootScope.formData.apiLoading = false;
			$('#nomineeInfo').collapse('show');
			$scope.nomineeInfoError = true;

		}

	}

	$scope.profileBTerms = function () {
		var profileBtermsModal = new bootstrap.Modal(document.getElementById('profileBterms'), {
			backdrop: 'static',
			keyboard: false
		});
		profileBtermsModal.show();
		$scope.termsOpen = true;
	}
	$scope.profileBTerms1 = function () {
		var profileBtermsModal = new bootstrap.Modal(document.getElementById('profileBterms1'), {
			backdrop: 'static',
			keyboard: false
		});
		profileBtermsModal.show();
		$scope.termsOpen = true;
	}

	$scope.emarginAccept = function () {
		setTimeout(function () {
			$('#InternetTrading').prop('checked', true);
		}, 50)
		setTimeout(function () {
			$scope.termsOpen = false;
		}, 150)
		$rootScope.formData.fields.InternetTrading = "Y";
	}

	$scope.emarginCancel = function () {
		setTimeout(function () {
			$('#InternetTrading').prop('checked', false);
		}, 50)
		$rootScope.formData.fields.InternetTrading = "N";
		$scope.termsOpen = false;
	}
	$scope.politicaldefalut = function () {
		$("#pscrelation option:contains(" + $rootScope.formData.fields.political + ")").prop('selected', true);
		$("#pscrelation").val('N');
		$(".select").select2();
		$scope.selectShow = true;
		$rootScope.formData.fields.political = $('#pscrelation').val();
	}
	$("#txtNDOB1").datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: "-75Y",
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		yearRange: "-75: +0",
		onSelect: function (value, ui) {
			$scope.txtNDOB1Error = false;
			$scope.dobError = false;
			$('#txtNDOB1').removeClass('ng-empty');
			$('#txtNDOB1').addClass('ng-not-empty');

			var today = new Date();
			var dd = Number(today.getDate());
			var mm = Number(today.getMonth() + 1);
			var yyyy = Number(today.getFullYear());
			var myBD = value;
			var myBDD = Number(myBD.split("/")[0]);
			var myBDM = Number(myBD.split("/")[1]);
			var myBDY = Number(myBD.split("/")[2]);
			var age = yyyy - myBDY;

			if (mm < myBDM) {
				age = age - 1;
			} else if (mm == myBDM && dd < myBDD) {
				age = age - 1;
			}

			if (age >= 0 && age < 18) {
				$scope.guardian1 = true;
				$('#guardianAddress1').prop('checked', true);
				$scope.$apply();
			} else {
				$scope.guardian1 = false;
				$rootScope.formData.fields.gName = undefined;
				$scope.$apply();
			}
		}
	});
	$("#txtNDOB2").datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: "-75Y",
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		yearRange: "-75: +0",
		onSelect: function (value, ui) {
			$scope.dobError = false;
			$scope.txtNDOB2Error = false;
			$scope.nrelation2Error = false;
			$('#txtNDOB2').removeClass('ng-empty');
			$('#txtNDOB2').addClass('ng-not-empty');

			var today = new Date();
			var dd = Number(today.getDate());
			var mm = Number(today.getMonth() + 1);
			var yyyy = Number(today.getFullYear());
			var myBD = value;
			var myBDD = Number(myBD.split("/")[0]);
			var myBDM = Number(myBD.split("/")[1]);
			var myBDY = Number(myBD.split("/")[2]);
			var age = yyyy - myBDY;

			if (mm < myBDM) {
				age = age - 1;
			} else if (mm == myBDM && dd < myBDD) {
				age = age - 1;
			}

			if (age >= 0 && age < 18) {
				$scope.guardian2 = true;
				$('#guardianAddress2').prop('checked', true);
				$scope.$apply();
			} else {
				$scope.guardian2 = false;
				$rootScope.formData.fields.gName = undefined;
				$scope.$apply();
			}

			// var today = new Date(),
			// age = today.getFullYear() - ui.selectedYear;
			// if (age < 18) {
			//     $scope.guardian2 = true;
			//     $scope.$apply();
			// } else {
			//     $scope.guardian2 = false;
			//     $rootScope.formData.fields.gName = undefined;
			//     $scope.$apply();
			// }
		}
	});
	$("#txtNDOB3").datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: "-75Y",
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		yearRange: "-75: +0",
		onSelect: function (value, ui) {
			$scope.dobError = false;
			$scope.txtNDOB3Error = false;
			$('#txtNDOB3').removeClass('ng-empty');
			$('#txtNDOB3').addClass('ng-not-empty');

			var today = new Date();
			var dd = Number(today.getDate());
			var mm = Number(today.getMonth() + 1);
			var yyyy = Number(today.getFullYear());
			var myBD = value;
			var myBDD = Number(myBD.split("/")[0]);
			var myBDM = Number(myBD.split("/")[1]);
			var myBDY = Number(myBD.split("/")[2]);
			var age = yyyy - myBDY;

			if (mm < myBDM) {
				age = age - 1;
			} else if (mm == myBDM && dd < myBDD) {
				age = age - 1;
			}

			if (age >= 0 && age < 18) {
				$scope.guardian3 = true;
				$('#guardianAddress3').prop('checked', true);
				$scope.$apply();
			} else {
				$scope.guardian3 = false;
				$rootScope.formData.fields.gName = undefined;
				$scope.$apply();
			}

			// var today = new Date(),
			//     age = today.getFullYear() - ui.selectedYear;
			// if (age < 18) {
			//     $scope.guardian3 = true;
			//     $scope.$apply();
			// } else {
			//     $scope.guardian3 = false;
			//     $rootScope.formData.fields.gName = undefined;
			//     $scope.$apply();
			// }
		}
	});

	$("#gDOB1, #gDOB2, #gDOB3").datepicker({
		changeMonth: true,
		changeYear: true,
		minDate: "-75Y",
		maxDate: "-18Y",
		dateFormat: 'dd/mm/yy',
		yearRange: "-75: -18",
		onSelect: function (value, ui) {
			$scope.gDOB1Error = false;
			$scope.gDOBError = false;
			$scope.gDOB2Error = false;
			$('#gDOB1').removeClass('ng-empty');
			$('#gDOB1').addClass('ng-not-empty');
		}
	});
	$("#gDOB1, #gDOB2").datepicker("option", "showAnim", "blind");

	$("#txtNDOB1, #txtNDOB2").datepicker("option", "showAnim", "blind");

	$scope.dataPush = function () {
		dataLayer.push({
			event: 'StageChange',
			attributes: {
				'level complete': '3',
				'Gender': $rootScope.formData.fields.gender,
				'MaritialStatus': $rootScope.formData.fields.marital,
				'FatherOrSpouseType': $rootScope.formData.fields.fsType,
				'FatherOrSpouseName': $rootScope.formData.fields.fsFirstName,
				'FatherOrSpousePrefixID': $('#fsTitle').val(),
				'MotherNamePrefixID': $('#moTitle').val(),
				'MotherNameFirstName': $rootScope.formData.fields.moFirstName,
				'MotherNameMiddleName': $rootScope.formData.fields.moMiddleName,
				'MotherNameLastName': $rootScope.formData.fields.moLastName,
				'MaidenNamePrefixID': $('#maidenTitle').val(),
				'MaidenNameFirstName': $rootScope.formData.fields.maFirstName,
				'MaidenNameMiddleName': $rootScope.formData.fields.maMiddleName,
				'MaidenNameLastName': $rootScope.formData.fields.maLastName,
				'EmailbelongstoPan': $rootScope.formData.fields.emailPan,
				'ProvidedEmailIdbelongingto': $rootScope.formData.fields.emailBelongs,
				'MobilebelongstoPan': $rootScope.formData.fields.mobilePan,
				'Mobilebelongsto': $rootScope.formData.fields.mobileBelongs,
				'ResidentialStatus': $rootScope.formData.fields.resStatus,
				'Nationality': $rootScope.formData.fields.citizen,
				'Occupation': $rootScope.formData.fields.occupation,
				'EducationValue': $rootScope.formData.fields.education,
				'AnnualIncome': '$rootScope.formData.fields.annualIncome',
				'Networth': $rootScope.formData.fields.netWorth,
				'TradingExperience': $rootScope.formData.fields.tradeExp,
				'PoliticalExposure': $rootScope.formData.fields.political,
				'DealingExistingStockBroker': $rootScope.formData.fields.broker,
				'StockSubBrokerName': $rootScope.formData.fields.brokerName,
				'ClientInfoId': $rootScope.formData.fields.cCode,
				'PastActions': $rootScope.formData.fields.disputes,
				'DisputesDetails': $rootScope.formData.fields.disputesDetails,
				'Exchange': $rootScope.formData.fields.exchangeName,
				'GSTINFlag': $rootScope.formData.fields.gst,
				'GSTINNumber': $rootScope.formData.fields.gstNumber,
				'TaxJurisdiction': $rootScope.formData.fields.taxOther,
				'TaxJurisdictionCountry': $rootScope.formData.fields.taxCountry,
				'PlaceOfBirth': $rootScope.formData.fields.birthPlace,
				'TaxIdentificationNumber': $rootScope.formData.fields.tin,
				'CountryOfBirth': $rootScope.formData.fields.brithCountry,
				'JurisdictionAddress1': "",
				'JurisdictionAddress2': "",
				'JurisdictionAddress3': "",
				'JurisdictionCity': $rootScope.formData.fields.jCity,
				'JurisdictionDistrict': $rootScope.formData.fields.jDistrict,
				'JurisdictionState': $rootScope.formData.fields.jState,
				'JurisdictionCountry': $rootScope.formData.fields.jCountry,
				'JurisdictionPinCode': $rootScope.formData.fields.jPin,
				'InternetTrading': $rootScope.formData.fields.InternetTrading,
				'DPRecieveForEachCredit': $rootScope.formData.fields.dpCredit,
				'DPtoacceptPledgeIns': $rootScope.formData.fields.dpPledge,
				'DematStatement': $rootScope.formData.fields.rdnDemat,
				'EmailStatement': $rootScope.formData.fields.rdnElectEmail,
				'ShareEmailWithRTA': $rootScope.formData.fields.shareEmail,
				'AnualReport': $rootScope.formData.fields.rdnAnnualReport,
				'InterestInToBank': $rootScope.formData.fields.rdnBankAcc,
				'ContractNoteandOtherRelatedReports': $rootScope.formData.fields.rdnContractNote,
				'DISBooklet': $rootScope.formData.fields.rdnDIS,
				'AgreeToReceivecall': 'Y',
				'SettlementOfFunds': $rootScope.formData.fields.rdnSetFunds,
				'EnableStockSIP': $rootScope.formData.fields.rdnSIP,
				'RiskCategory': 'L',
				'nomineeTitle': $('#nTitle').val(),
				'nomineeFirstName': $rootScope.formData.fields.nfirstName,
				'nomineeMiddleName': $rootScope.formData.fields.nmiddleName,
				'nomineeLastName': $rootScope.formData.fields.nlastName,
				'nomineeRelation': $rootScope.formData.fields.nomineeRelation,
				'nomineeDateofBirth': $scope.userDob,
				'nomineeaddress': $rootScope.formData.fields.nAddress,
				'nomineepin': $('#nPin_value').val(),
				'nomineestate': $rootScope.formData.fields.nStateName,
				'nomineedistrict': $rootScope.formData.fields.nDistrict,
				'nomineecity': $('#city3_value').val(),
				'guardian': $scope.guardian,
				'guardidanTitle': $('#gTitle').val(),
				'guardiangfirstName': $rootScope.formData.fields.gfirstName,
				'guardianmiddleName': $rootScope.formData.fields.gmiddleName,
				'guardianlastName': $rootScope.formData.fields.glastName,
				'guardianAddress': $rootScope.formData.fields.gAddress,
				'guardianpin': $('#gPin_value').val(),
				'guardianstate': $rootScope.formData.fields.gStateName,
				'guardiandistrict': $rootScope.formData.fields.gDistrict,
				'guardiancity': $('#city4_value').val(),
			}
		});

	}

	$scope.openCollapse = function () { }

	$('a.collapseTag').on('focus', function () {
		var a = $(this).attr('title');
		$('#' + a).collapse('show');
	})

	$('input, select').on('keypress', function () {
		var a = $(this).closest('div.collapse').attr('id') + 'Error';
		$scope[a] = false;
	})

	window.onbeforeunload = function () {

		var Personal_Info = new Object();
		Personal_Info.gender = $rootScope.formData.fields.gender;
		Personal_Info.marital = $("#marital").val();
		Personal_Info.fsType = $rootScope.formData.fields.fsType;
		Personal_Info.fsTitle = $rootScope.formData.fields.fsTitle;
		Personal_Info.fsFirstName = $rootScope.formData.fields.fsFirstName;
		Personal_Info.moTitle = $rootScope.formData.fields.moTitle;
		Personal_Info.moFirstName = $rootScope.formData.fields.moFirstName;
		Personal_Info.moMiddleName = $rootScope.formData.fields.moMiddleName;
		Personal_Info.moLastName = $rootScope.formData.fields.moLastName;
		Personal_Info.maTitle = $('#maidenTitle').val();
		Personal_Info.maFirstName = $rootScope.formData.fields.maFirstName;
		Personal_Info.maMiddleName = $rootScope.formData.fields.maMiddleName;
		Personal_Info.maLastName = $rootScope.formData.fields.maLastName;
		//Personal_Info.email = $rootScope.formData.fields.email;
		Personal_Info.emailBelongs = $rootScope.formData.fields.emailBelongs;
		Personal_Info.mobile = $rootScope.formData.fields.mobile;
		Personal_Info.mobileBelongs = $rootScope.formData.fields.mobileBelongs;
		Personal_Info.nationality = $('#citizen').val();
		Personal_Info.occupation = $rootScope.formData.fields.occupation;
		Personal_Info.education = $rootScope.formData.fields.education;
		Personal_Info.annualIncome = $('#anIncome').val();
		Personal_Info.networth = $rootScope.formData.fields.netWorth;
		Personal_Info.tradingExperience = $('#trdExp').val();
		Personal_Info.politicalExposure = $("#pscrelation").val();
		Personal_Info.dealingExistingStockBroker = $rootScope.formData.fields.broker;
		Personal_Info.stockSubBrokerName = $rootScope.formData.fields.brokerName;
		Personal_Info.clientInfoId = $rootScope.formData.fields.cCode;
		Personal_Info.exchange = $rootScope.formData.fields.exchangeName;
		Personal_Info.GSTINFlag = $rootScope.formData.fields.gst;
		Personal_Info.GSTINNumber = $rootScope.formData.fields.gstNumber;
		Personal_Info.taxJurisdiction = $rootScope.formData.fields.taxOther;
		Personal_Info.taxJurisdictionCountry = $rootScope.formData.fields.taxCountry;
		Personal_Info.placeOfBirth = $rootScope.formData.fields.birthPlace;
		Personal_Info.countryOfBirth = $rootScope.formData.fields.countryPlace;
		Personal_Info.jurisdictionAddress = ($rootScope.formData.fields.jAddress);
		Personal_Info.jurisdictionCity = $rootScope.formData.fields.jCity;
		Personal_Info.jurisdictionDistrict = $rootScope.formData.fields.jDistrict;
		Personal_Info.jurisdictionState = $rootScope.formData.fields.jState;
		Personal_Info.jurisdictionCountry = $rootScope.formData.fields.jCountry;
		Personal_Info.jurisdictionPinCode = $rootScope.formData.fields.jPin;
		Personal_Info.internetTrading = $rootScope.formData.fields.InternetTrading;
		Personal_Info.dPRecieveForEachCredit = $rootScope.formData.fields.dpCredit;
		Personal_Info.dPtoacceptPledgeIns = $rootScope.formData.fields.dpPledge;
		Personal_Info.dematStatement = $rootScope.formData.fields.rdnDemat;
		Personal_Info.emailStatement = $rootScope.formData.fields.rdnElectEmail;
		Personal_Info.shareEmailWithRTA = $rootScope.formData.fields.shareEmail;
		Personal_Info.annualReport = $rootScope.formData.fields.rdnAnnualReport;
		Personal_Info.interestInToBank = $rootScope.formData.fields.rdnBankAcc;
		Personal_Info.contractNoteandOtherRelatedReports = $rootScope.formData.fields.rdnContractNote;
		Personal_Info.DISBooklet = $rootScope.formData.fields.rdnDIS;
		Personal_Info.agreeToReceivecall = $rootScope.formData.fields.agreeCall;
		Personal_Info.settlementOfFunds = $rootScope.formData.fields.rdnSetFunds;
		Personal_Info.EnableStockSIP = 'Y';

		var Personal_Info_Post = JSON.stringify(Personal_Info);
		Personal_Info_Stage = "Personal_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
		if (sessionStorage.getItem("RxReferenceNumber")) {
			sessionStorage.setItem(Personal_Info_Stage, Personal_Info_Post);
		}
	}
	$scope.getLGandLC = function () {
		var url = "GetLandingDetails"
		var sendData = {
			'MobileNumber': $rootScope.formData.fields.mobile
		}
		sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.city = response.City;
			$rootScope.formData.clientName = response.ClientName;
			$rootScope.formData.assistedLGCode = response.AssistLGCode;
			$rootScope.formData.assistedLCCode = response.AssistLCCode;
		});
	}

	$scope.getEmailVerificatioUrl = function () {

		$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
		if ($rootScope.formData.fields.email && ($scope.filter).test($rootScope.formData.fields.email)) {
			$rootScope.verifyOTPSuccess = false;
			var url = "EmailVerificationUrl";
			sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
				Email: $rootScope.formData.fields.email,
				ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs
			};
			//sendData = $rootScope.encryptReq(sendData);
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				if (response.IsSuccess) {
					$rootScope.formData.emailOTPApi = true;
					$rootScope.verifyEmailDiv = true;
					$rootScope.verifyemail = true;
					$rootScope.verifyOTPSuccess = false;
					if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana || $rootScope.siddhiAppresume) {
						$scope.rmverifyEmailDiv = true;
						$scope.rmemailOTPVerified = false;
					}
				} else if (!response.IsSuccess && response.ErrorCode == '-1') {
					$rootScope.formData.apiLoading = false;
					$rootScope.formData.panStatus1 = response.ErrorMessage;
					var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
						backdrop: 'static',
						keyboard: false
					});
					paninformation.show();
					return
				} else if (!response.IsSuccess) {
					$rootScope.OtpLimitExceed = true;
					$rootScope.OtpResponseMsg = response.ErrorMessage;
					var otpresendModal = new bootstrap.Modal(document.getElementById('otp-resend'), {
						backdrop: 'static',
						keyboard: false
					});
					otpresendModal.show();
					$scope.changeEmailAddress = true;
					$scope.rmnewEmailOTP = false;
					$rootScope.verifyEmailDiv = false;
					$rootScope.verifyemail = false;
				}
			}, function (e) {
				$rootScope.formData.apiLoading = false;
			});
		} else {
			$scope.invalidEmail = true;
			$('#input-1email').focus();
			return false;
		}
	}

	if ($rootScope.webfinacle) {
		setTimeout(function () {
			$('#rStatus').prop('disabled', true)
		}, 500)
	}

	if (sessionStorage.getItem('RMEmailOTPVerified') && sessionStorage.getItem('RMEmailOTPVerified') == 'true') {
		$scope.rmemailOTPVerified = true;
	}

	$scope.cancelRmEmail = function () {
		$rootScope.formData.fields.emailNew = '';
		$scope.emptyEmail = false;
		$scope.invalidEmail = false;
		$scope.sameEmail = false;
		$scope.changeEmailAddress = false;
		$scope.newEmailOTP = false;
		$scope.rmonloadValidate = false;
		$scope.rmverifyEmailDiv = false;
		$rootScope.verifyEmailDiv = false;
		if (sessionStorage.getItem('RMEmailOTPVerified') && sessionStorage.getItem('RMEmailOTPVerified') == 'true') {
			$scope.rmemailOTPVerified = true;
			$rootScope.verifyemail = false;
		}
		if ($rootScope.formData.emailOTPApi || $rootScope.verifyemail) {
			$rootScope.verifyEmailDiv = true;
		}
		if (sessionStorage.getItem("RxEmail")) {
			$rootScope.formData.fields.email = sessionStorage.getItem("RxEmail");
		}
		// if($scope.rmsameEmail) {
		// 	$scope.rmsameEmail = false;
		// }
		$rootScope.verifyEmailDiv = false;
		$rootScope.verifyemail = false;
	}

	$scope.cancelEmail = function () {
		$scope.rmsameEmail = false;
		$scope.rmemptyEmail = false;
		$scope.rminvalidEmail = false;
		$rootScope.formData.fields.emailNew = '';
		$scope.changeEmailAddress = false;
		$rootScope.verifyEmailDiv = false;
		if ($rootScope.verifyOTPSuccess) {
			$rootScope.verifyemail = false;
		} else {
			$rootScope.verifyemail = true;
		}
		if ($rootScope.formData.emailOTPApi || $rootScope.verifyemail) {
			$rootScope.verifyEmailDiv = true;
		}
	}


	// new nominee code for dynamic fields
	// guardian and guardian address fields.

	let nomineeTemplate = [
		{ field: 'First name', value: '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Middle name', value: '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Last name', value: '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Date of birth', value: '', required: true, type: 'date' },
		{
			field: 'Relationship', value: '', required: true, type: 'dropdown',
			arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
			valueKey: 'NomineeValue'
		},
		{ field: 'Mobile Number', value: '', required: false, type: 'input', directive: 'digit', length: 10 },
		{ field: 'Email ID', value: '', required: false, type: 'input', directive: 'email' },
		{
			field: 'Id Proof', value: '', required: false, type: 'dropdown',
			arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
			valueKey: 'DocumentTypeId'
		},
		{ field: 'Id proof number', value: '', required: false, type: 'input', directive: 'alpha-numeric', length: 10 },
		{ field: 'Nominee share (%)', value: '', required: true, type: 'input', directive: 'decimal', length: 3 },
		{ field: '+ Add Nominee', type: 'button', class: 'col-md-6' },
		{ field: 'sameAddress', value: false, required: false, type: 'checkbox', class: 'col-md-12 mb-5' },
		{ field: 'NomineeInfoId', value: '', required: false, type: 'hidden' }
	];
	let guardianTemplate = [
		{ field: 'Guardian first name', value: '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Guardian Middle name', value: '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Guardian Last name', value: '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
		{ field: 'Guardian Date of birth', value: '', required: true, type: 'date' },
		{
			field: 'Relationship with Minor', value: '', required: true, type: 'dropdown',
			arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
			valueKey: 'NomineeValue'
		},
		{ field: 'Guardian Mobile Number', value: '', required: false, type: 'input', directive: 'digit', length: 10 },
		{ field: 'Guardian Email ID', value: '', required: false, type: 'input', directive: 'email' },
		{
			field: 'Guardian Id Proof', value: '', required: false, type: 'dropdown',
			arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
			valueKey: 'DocumentTypeId'
		},
		{ field: 'Guardian Id proof number', value: '', required: false, type: 'input', directive: 'alpha-numeric', length: 10 },
		{ field: 'sameAddress', value: true, required: false, type: 'checkbox', class: 'col-md-12 mb-5' }
	];
	let addressFields = [
		{ field: 'Your Address, Line 1', value: '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
		{ field: 'Your Address, Line 2', value: '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
		{ field: 'Your Address, Line 3', value: '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
		{ field: 'Pincode', value: '', required: true, type: 'autocomplete' },
		{ field: 'State', value: '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
		{ field: 'District', value: '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
		{ field: 'City', value: '', required: true, type: 'autocomplete' },
		{ field: 'Country', value: 'India', required: true, type: 'input', directive: 'alphapet', length: 5 },
	];
	let guardianAddressFields = [
		{ field: 'Your Address, Line 1', value: '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
		{ field: 'Your Address, Line 2', value: '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
		{ field: 'Your Address, Line 3', value: '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
		{ field: 'Pincode', value: '', required: true, type: 'autocomplete' },
		{ field: 'State', value: '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
		{ field: 'District', value: '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
		{ field: 'City', value: '', required: true, type: 'autocomplete' },
		{ field: 'Country', value: 'India', required: true, type: 'input', directive: 'alphapet', length: 5 },
	];
	$scope.remainingNominee = function () {
		let newId = $rootScope.nomineeNewFields.length + 1;
		$rootScope.nomineeNewFields = [
			nomineeTemplate.map(field => ({ ...field }))
		];
		setTimeout(() => {
			$(".select").select2();
			$scope.initDatepicker(newId);
		}, 250);
	};
	$scope.addNominee = function () {
		$scope.showAddNew = false;
		if ($rootScope.nomineeNewFields.length < 3) {
			$rootScope.nomineeNewFields.push(
				nomineeTemplate.map(data => ({
					...data,
					// nomineeTemplate names this field 'Relationship with Minor'; matching only
					// 'Relationship' fell through to '' and left the dropdown empty.
					arrayVal: data.field === 'Id Proof' ? $rootScope.formData.newNomineeTypeList : (data.field === 'Relationship with Minor' || data.field === 'Relationship') ? $rootScope.formData.nomineeRelationList : ''
				}))
			);
			setTimeout(() => {
				$(".select").select2();
				$scope.initDatepicker($rootScope.nomineeNewFields.length - 1, 'nominee');
			}, 250);
		}
	};
	$scope.initDatepicker = (id, whom) => {
		if (whom === 'nominee') {
			$(`#dob-${id}`).datepicker({
				changeMonth: true,
				changeYear: true,
				minDate: "-75Y",
				maxDate: "0",
				dateFormat: 'dd/mm/yy',
				yearRange: "-75: +0",
				onSelect: function (value, ui) {
					$scope.$apply(() => {
						if (!value) {
							return;
						}
						let whom = ui.id.split('-')[0];
						let whomid = parseInt(ui.id.split('-')[1]);
						if (whom === 'dob') {
							if ($rootScope.nomineeNewFields.length > 0) {
								let selectedArr = $rootScope.nomineeNewFields[whomid];
								selectedArr.forEach(field => {
									if (field.field === 'Date of birth') {
										field.value = value;
										field.error = false;
									}
								})
							}
						} else {
							if ($rootScope.guardianNewFields.length > 0) {
								let selectedArr = $rootScope.guardianNewFields[whomid];
								selectedArr.forEach(field => {
									if (field.field === 'Guardian Date of birth') {
										field.value = value;
										field.error = false;
									}
								})
							}
						}

					});

					$(`#dob-${id}`).removeClass('ng-empty').addClass('ng-not-empty');

					let today = new Date();
					let [myBDD, myBDM, myBDY] = value.split("/").map(Number);
					let age = today.getFullYear() - myBDY;

					if (today.getMonth() + 1 < myBDM || (today.getMonth() + 1 === myBDM && today.getDate() < myBDD)) {
						age -= 1;
					}
					// id = id ? id : whomid;
					if (age < 18) {
						$scope.addGuardian(id);
					} else {
						$scope.removeGuardian(id);
					}
				}
			});
		} else {
			let today = new Date();
			let eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
			$(`#dobG-${id}`).datepicker({
				changeMonth: true,
				changeYear: true,
				minDate: "-75Y",
				maxDate: eighteenYearsAgo,
				dateFormat: 'dd/mm/yy',
				yearRange: "-75: +0",
				onSelect: function (value, ui) {
					$scope.$apply(() => {
						if (!value) {
							return;
						}
						let whom = ui.id.split('-')[0];
						let whomid = parseInt(ui.id.split('-')[1]);
						if (whom === 'dob') {
							if ($rootScope.nomineeNewFields.length > 0) {
								let selectedArr = $rootScope.nomineeNewFields[whomid];
								selectedArr.forEach(field => {
									if (field.field === 'Date of birth') {
										field.value = value;
										field.error = false;
									}
								})
							}
						} else {
							if ($rootScope.guardianNewFields.length > 0) {
								let selectedArr = $rootScope.guardianNewFields[whomid];
								selectedArr.forEach(field => {
									if (field.field === 'Guardian Date of birth') {
										field.value = value;
										field.error = false;
									}
								})
							}
						}
					});

					$(`#dob-${id}`).removeClass('ng-empty').addClass('ng-not-empty');

					let today = new Date();
					let [myBDD, myBDM, myBDY] = value.split("/").map(Number);
					let age = today.getFullYear() - myBDY;

					if (today.getMonth() + 1 < myBDM || (today.getMonth() + 1 === myBDM && today.getDate() < myBDD)) {
						age -= 1;
					}

					if (age < 18) {
						// $scope.addGuardian();
					}
				}
			});
		}

	};
	$scope.addGuardian = function (index) {
		if ($rootScope.guardianNewFields.length < 10) {
			if (!$rootScope.guardianNewFields[index]) {
				$rootScope.guardianNewFields[index] = guardianTemplate.map(data => ({
					...data,
					// guardianTemplate names this field 'Relationship with Minor'; matching only
					// 'Relationship' fell through to '' and left the dropdown empty.
					arrayVal: data.field === 'Guardian Id Proof' ? $rootScope.formData.newNomineeTypeList : (data.field === 'Relationship with Minor' || data.field === 'Relationship') ? $rootScope.formData.nomineeRelationList : '',
					index: index
				}));
				// console.log($rootScope.guardianNewFields,'$rootScope.guardianNewFields');

				// $rootScope.guardianNewFields = [...new Set($rootScope.guardianNewFields)];
				$scope.$apply();
			}
			setTimeout(() => {
				$(".select").select2();
				// $scope.initDatepicker($rootScope.guardianNewFields.length - 1 , 'guardian');
				$scope.initDatepicker(index, 'guardian');
			}, 250);
		}
	};
	$scope.removeNominee = function (index) {
		if ($rootScope.nomineeNewFields.length > 0) {
			$rootScope.nomineeNewFields.splice(index, 1);
			$('#NomineDeletePopUp').modal('hide');
			if ($rootScope.guardianNewFields[index]) {
				$rootScope.guardianNewFields.splice(index, 1);
			}
		}
		if ($rootScope.nomineeNewFields.length === 0) {
			// $rootScope.formData.fields.nominee = 'N';
			// Deleting the last nominee while the answer is "Yes" leaves it UNANSWERED.
            // A genuine opt-out already set 'N' in nYes(), so that is preserved.
            if ($rootScope.formData.fields.nominee === 'Y') {
                $rootScope.formData.fields.nominee = '';
                $('#nYes').prop('checked', false);
                $('#nNo').prop('checked', false);
            }
 
		}
		$scope.$evalAsync();
	};
	$scope.removeGuardian = function (index) {

		if ($rootScope.guardianNewFields[index]) {
			delete $rootScope.guardianNewFields[index];
		}
		$scope.$evalAsync();
	};
	$scope.removeAddress = function (index) {
		if ($rootScope.additionalAddress.length > 0) {
			$rootScope.additionalAddress.splice(index, 1);
		}
	};
	$scope.removeGuardAddress = function (index) {
		if ($rootScope.GuardadditionalAddress.length > 0) {
			$rootScope.GuardadditionalAddress.splice(index, 1);
		}
	};
	$scope.addAddress = function (index) {
		if ($rootScope.additionalAddress.length < 10) {
			if (!$rootScope.additionalAddress[index]) {
				$rootScope.additionalAddress[index] =
					addressFields.map(data => ({ ...data }));
			}
		}
	};
	$scope.addGuardAddress = function (index) {
		if ($rootScope.GuardadditionalAddress.length < 10) {
			if (!$rootScope.GuardadditionalAddress[index]) {
				$rootScope.GuardadditionalAddress[index] =
					guardianAddressFields.map(data => ({ ...data }));
			}
		}
	};
	$scope.nomineeRemainsChange = function (index, event) {
		if (!event) {
			$scope.addAddress(index);
		} else {
			$scope.removeAddress(index);
		}
	}
	$scope.guardianAdressChange = function (index, event) {
		if (!event) {
			$scope.addGuardAddress(index);
		} else {
			$scope.removeGuardAddress(index);
		}
	};
	// $scope.validateNomineeFields = function () {
	// 	let newError = 0;

	// 	if ($rootScope.nomineeNewFields.length > 0) {
	// 		let idproof = '';
	// 		$rootScope.nomineeNewFields.forEach(function (nomineeGroup) {
	// 			nomineeGroup.forEach(function (field) {
	// 				if (field.value && field.field === 'Id Proof') {
	// 					idproof = field.value;
	// 				}
	// 				if (field.required && !field.value) {
	// 					field.error = true; 
	// 					field.errorMessage = 'Please Provide Valid Input';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Email ID' && !$scope.EmailRefex(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please provide proper email address. Eg: john@xyz.com';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Mobile Number' && !$rootScope.mobileNumberValidation(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please provide 10 digit valid mobile number';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'First name' && field.value.length < 3) {
	// 					field.error = true;
	// 					field.errorMessage = `${field.field} must be at least 3 characters long`;
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Last name' && field.value.length < 3) {
	// 					field.error = true;
	// 					field.errorMessage = `${field.field} must be at least 3 characters long`;
	// 					newError++;
	// 				} else if (field.required && field.field === 'Nominee share (%)' && field.value) {
	// 					// const staticNomineeTotal =
	// 					// 	(Number($rootScope.formData.fields.NomineeRatio1) || 0) +
	// 					// 	(Number($rootScope.formData.fields.NomineeRatio2) || 0) +
	// 					// 	(Number($rootScope.formData.fields.NomineeRatio3) || 0);

	// 					const dynamicNomineeTotal = $rootScope.nomineeNewFields
	// 						.flat()
	// 						.filter(n => n.field === 'Nominee share (%)' && n.value)
	// 						.map(n => Number(n.value))
	// 						.reduce((sum, share) => sum + share, 0);

	// 					const total = dynamicNomineeTotal;
	// 					if (total !== 100) {
	// 						field.error = true;
	// 						field.errorMessage = 'Combined Nominee share should be exactly 100%';
	// 						newError++;
	// 					} else {
	// 						field.error = false;
	// 						field.errorMessage = '';
	// 					}
	// 				} else if (field.required && field.value && field.field === 'Id proof number' && idproof == '1008' && !pan_filter.test(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please Enter Valid Pan';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Id proof number' && idproof == '1008' && (field.value.toLowerCase() == $rootScope.formData.fields.panNumber.toLowerCase())) {
	// 					field.error = true;
	// 					field.errorMessage = 'Nominee"s PAN Must not be same as Customer"s PAN';
	// 					newError++;
	// 				} else if (field.required && field.value && (field.field === 'Id proof number: (Last 4 digits)' || field.field == 'Id proof number') && idproof == '1007' && !Aahaar.test(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
	// 					newError++;
	// 				} else {
	// 					field.error = false;
	// 					field.errorMessage = '';
	// 				}
	// 			});
	// 		});
	// 		$scope.$evalAsync();
	// 	}

	// 	if ($rootScope.guardianNewFields.length > 0) {
	// 		let idproof = '';
	// 		$rootScope.guardianNewFields.forEach(function (guardianGroup) {
	// 			guardianGroup.forEach(function (field) {
	// 				if (field.value && field.field === "Guardian Id Proof") {
	// 					idproof = field.value;
	// 				}
	// 				if (field.required && !field.value) {
	// 					field.error = true; 
	// 					field.errorMessage = 'Please Provide Valid Input';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian Email ID' && !$scope.EmailRefex(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please provide a proper email address. Eg: john@xyz.com';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian Mobile Number' && !$rootScope.mobileNumberValidation(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please provide a 10-digit valid mobile number';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian First name' && field.value.length < 3) {
	// 					field.error = true;
	// 					field.errorMessage = `${field.field} must be at least 3 characters long`;
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian Last name' && field.value.length < 3) {
	// 					field.error = true;
	// 					field.errorMessage = `${field.field} must be at least 3 characters long`;
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian Id proof number' && idproof == '1008' && !pan_filter.test(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please Enter Valid Pan';
	// 					newError++;
	// 				} else if (field.required && field.value && field.field === 'Guardian Id proof number' && idproof == '1008' && (field.value.toLowerCase() == $rootScope.formData.fields.panNumber.toLowerCase())) {
	// 					field.error = true;
	// 					field.errorMessage = 'Guardian"s PAN Must not be same as Customer"s PAN';
	// 					newError++;
	// 				} else if (field.required && field.value && (field.field === 'Guardian ID proof number: (Last 4 digits)' || field.field === 'Guardian Id proof number' ) && idproof == '1007' && !Aahaar.test(field.value)) {
	// 					field.error = true;
	// 					field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
	// 					newError++;
	// 				} else {
	// 					field.error = false;
	// 					field.errorMessage = '';
	// 				}
	// 			});
	// 		});
	// 		$scope.$evalAsync();
	// 	}

	// 	if ($rootScope.additionalAddress.length > 0) {
	// 		$rootScope.additionalAddress.forEach(function (nomineeGroup) {
	// 			nomineeGroup.forEach(function (field) {
	// 				if (field.required && !field.value) {
	// 					field.error = true; 
	// 					field.errorMessage = 'Please Provide Valid Input';
	// 					newError++;
	// 				} else {
	// 					field.error = false;
	// 				}
	// 			});
	// 		});
	// 	}

	// 	if ($rootScope.GuardadditionalAddress.length > 0) {
	// 		$rootScope.GuardadditionalAddress.forEach(function (nomineeGroup) {
	// 			nomineeGroup.forEach(function (field) {
	// 				if (field.required && !field.value) {
	// 					field.error = true; 
	// 					field.errorMessage = 'Please Provide Valid Input';
	// 					newError++;
	// 				} else {
	// 					field.error = false;
	// 				}
	// 			});
	// 		});
	// 	}
	// 	if ($rootScope.nomineeNewFields.length > 0 && !$rootScope.nomineePrint) {
	// 		$scope.printNomineeError = true;
	// 		newError++;
	// 	}
	// 	if (newError != 0) {
	// 		$('#nomineeInfo').collapse('show');
	// 	}
	// 	return newError === 0; 
	// };
	// $scope.validateNomineeFields = function () {

	// 	let newError = 0;
	// 	$scope.Emptynamountshare = false;
	// 	$scope.EmptyShareAmountError = false;
	// 	$scope.ShareAmountError = false;
	// 	$scope.IncapacitationNomineeError = false;

	// 	if ($rootScope.nomineeNewFields.length > 0) {


	// 		let idproof = '';


	// 		$rootScope.nomineeNewFields
	// 			.filter(n => n)
	// 			.forEach(function (nomineeGroup, nomineeIndex) {


	// 				nomineeGroup.forEach(function (field) {


	// 					field.error = false;
	// 					field.errorMessage = '';
	// 					if (field.value && field.field === 'Id Proof') {
	// 						idproof = field.value;
	// 					}
	// 					if (field.required && !field.value) {
	// 						field.error = true;
	// 						field.errorMessage = 'Please Provide Valid Input';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (
	// 						field.field === 'Email ID' &&
	// 						field.value &&
	// 						!$scope.EmailRefex(field.value)
	// 					) {
	// 						field.error = true;
	// 						field.errorMessage =
	// 							'Please provide proper email address. Eg: john@xyz.com';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (
	// 						field.field === 'Mobile Number' &&
	// 						field.value &&
	// 						!$rootScope.mobileNumberValidation(field.value)
	// 					) {
	// 						field.error = true;
	// 						field.errorMessage =
	// 							'Please provide 10 digit valid mobile number';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (
	// 						(field.field === 'First name' ||
	// 							field.field === 'Last name') &&
	// 						field.value &&
	// 						field.value.length < 3
	// 					) {
	// 						field.error = true;
	// 						field.errorMessage =
	// 							`${field.field} must be at least 3 characters long`;
	// 						newError++;
	// 						return;
	// 					}
	// 					if (
	// 						field.field === 'Nominee share (%)' &&
	// 						field.value
	// 					) {
	// 						const totalShare =
	// 							$rootScope.nomineeNewFields
	// 								.filter(n => n)
	// 								.flat()
	// 								.filter(n => n.field === 'Nominee share (%)' && n.value)
	// 								.map(n => Number(n.value))
	// 								.reduce((sum, s) => sum + s, 0);


	// 						if (totalShare !== 100) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								'Combined Nominee share should be exactly 100%';
	// 							newError++;
	// 							return;
	// 						}


	// 						if (Number(field.value) === 0) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								'Nominee share must be between 1 and 100';
	// 							newError++;
	// 							return;
	// 						}
	// 					}
	// 					if (
	// 						field.field === 'Id proof number' &&
	// 						idproof === '1008'
	// 					) {
	// 						if (!pan_filter.test(field.value)) {
	// 							field.error = true;
	// 							field.errorMessage = 'Please Enter Valid PAN';
	// 							newError++;
	// 							return;
	// 						}


	// 						if (
	// 							field.value.toLowerCase() ===
	// 							$rootScope.formData.fields.panNumber.toLowerCase()
	// 						) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								"Nominee's PAN must not be same as Customer's PAN";
	// 							newError++;
	// 							return;
	// 						}
	// 					}
	// 					if (
	// 						(
	// 							field.field === 'Id proof number' ||
	// 							field.field === 'Id proof number: (Last 4 digits)'
	// 						) &&
	// 						field.value &&
	// 						idproof === '1007'
	// 					) {
	// 						if (!Aahaar.test(field.value)) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								'Please Enter Valid Aadhaar Document Number';
	// 							newError++;
	// 							return;
	// 						}


	// 						const clientDigiAadhaar =
	// 							(sessionStorage.getItem('DigiAadhar') || '').trim();


	// 						if (field.value === clientDigiAadhaar) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								"Nominee's Aadhaar cannot be same as Client's DigiAadhaar";
	// 							newError++;
	// 							return;
	// 						}
	// 					}
	// 					if (field.required && field.value &&
	// 						field.field === 'Id proof number' &&
	// 						idproof == '1017' &&
	// 						!dlRegex.test(field.value)) {

	// 						field.error = true;
	// 						field.errorMessage = 'Please Enter Valid Driving License Number';
	// 						newError++;
	// 					}

	// 					// Passport
	// 					if (field.required && field.value &&
	// 						field.field === 'Id proof number' &&
	// 						idproof == '1009' &&
	// 						!passportRegex.test(field.value)) {

	// 						field.error = true;
	// 						field.errorMessage = 'Please Enter Valid Passport Number';
	// 						newError++;
	// 					}



	// 					// ============================================================
	// 					// DUPLICATE NOMINEE ID PROOF + NUMBER
	// 					// ============================================================
	// 					if (
	// 						(
	// 							field.field === 'Id proof number' ||
	// 							field.field === 'Id proof number: (Last 4 digits)'
	// 						) &&
	// 						field.value &&
	// 						idproof
	// 					) {
	// 						const currentIdNumber =
	// 							field.value.trim().toLowerCase();


	// 						const validIdFields = [
	// 							'Id proof number',
	// 							'Id proof number: (Last 4 digits)'
	// 						];


	// 						const duplicate = $rootScope.nomineeNewFields
	// 							.map((group, idx) => {

	// 								if (idx === nomineeIndex) return null;


	// 								const otherProof =
	// 									group.find(x => x.field === 'Id Proof')?.value || '';


	// 								const otherNumber =
	// 									group.find(x => validIdFields.includes(x.field))
	// 										?.value?.trim().toLowerCase() || '';


	// 								if (otherProof && otherNumber) {
	// 									return {
	// 										nomineeNo: idx + 1,
	// 										proof: otherProof,
	// 										number: otherNumber
	// 									};
	// 								}
	// 								return null;
	// 							})
	// 							.filter(n => n)
	// 							.find(n =>
	// 								n.proof === idproof &&
	// 								n.number === currentIdNumber
	// 							);


	// 						if (duplicate) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								`Nominee ${nomineeIndex + 1} and Nominee ${duplicate.nomineeNo} cannot have same ID Proof & Number`;
	// 							newError++;
	// 							return;
	// 						}
	// 					}


	// 					// ============================================================
	// 					// DUPLICATE FULL NAME + CLIENT NAME CHECK
	// 					// ============================================================
	// 					if (
	// 						field.field === 'First name' ||
	// 						field.field === 'Middle name' ||
	// 						field.field === 'Last name'
	// 					) {


	// 						const fn =
	// 							nomineeGroup.find(f => f.field === 'First name')
	// 								?.value?.trim().toLowerCase() || '';
	// 						const mn =
	// 							nomineeGroup.find(f => f.field === 'Middle name')
	// 								?.value?.trim().toLowerCase() || '';
	// 						const ln =
	// 							nomineeGroup.find(f => f.field === 'Last name')
	// 								?.value?.trim().toLowerCase() || '';


	// 						const currentName =
	// 							(fn + mn + ln).replace(/\s+/g, '');


	// 						if (!currentName) return;


	// 						const allNames =
	// 							$rootScope.nomineeNewFields.map((g, idx) => {
	// 								const f = g.find(x => x.field === 'First name')?.value || '';
	// 								const m = g.find(x => x.field === 'Middle name')?.value || '';
	// 								const l = g.find(x => x.field === 'Last name')?.value || '';
	// 								return {
	// 									nomineeNo: idx + 1,
	// 									name: (f + m + l).replace(/\s+/g, '').toLowerCase()
	// 								};
	// 							});


	// 						const duplicates =
	// 							allNames.filter(n => n.name === currentName);


	// 						if (duplicates.length > 1) {
	// 							const dupNos =
	// 								duplicates
	// 									.map(d => d.nomineeNo)
	// 									.filter(n => n !== nomineeIndex + 1);


	// 							field.error = true;
	// 							field.errorMessage =
	// 								`Nominee ${nomineeIndex + 1} and Nominee ${dupNos.join(', ')} full names are same`;
	// 							newError++;
	// 							return;
	// 						}


	// 						const clientName =
	// 							(sessionStorage.getItem('ClientFullName') || '')
	// 								.replace(/\s+/g, '')
	// 								.toLowerCase();


	// 						if (currentName === clientName) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								'Client name and Nominee name cannot be same';
	// 							newError++;
	// 							return;
	// 						}
	// 					}


	// 				});
	// 			});


	// 		$scope.$evalAsync();
	// 	}
	// 	if ($rootScope.guardianNewFields.filter(g => g).length > 0) {


	// 		let idproof = '';


	// 		$rootScope.guardianNewFields
	// 			.filter(g => g)
	// 			.forEach(function (guardianGroup) {


	// 				guardianGroup.forEach(function (field) {


	// 					field.error = false;
	// 					field.errorMessage = '';
	// 					if (field.value && field.field === "Guardian Id Proof") {
	// 						idproof = field.value;
	// 					}
	// 					if (field.required && !field.value) {
	// 						field.error = true;
	// 						field.errorMessage = 'Please Provide Valid Input';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (field.field === 'Guardian Email ID' &&
	// 						field.value &&
	// 						!$scope.EmailRefex(field.value)) {


	// 						field.error = true;
	// 						field.errorMessage = 'Please provide a proper email address. Eg: john@xyz.com';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (field.field === 'Guardian Mobile Number' &&
	// 						field.value &&
	// 						!$rootScope.mobileNumberValidation(field.value)) {


	// 						field.error = true;
	// 						field.errorMessage = 'Please provide a 10-digit valid mobile number';
	// 						newError++;
	// 						return;
	// 					}
	// 					if (
	// 						(field.field === 'Guardian First name' ||
	// 							field.field === 'Guardian Last name') &&
	// 						field.value &&
	// 						field.value.length < 3
	// 					) {
	// 						field.error = true;
	// 						field.errorMessage = `${field.field} must be at least 3 characters long`;
	// 						newError++;
	// 						return;
	// 					}
	// 					if (field.field === 'Guardian Id proof number' &&
	// 						idproof === '1008') {


	// 						if (!pan_filter.test(field.value)) {
	// 							field.error = true;
	// 							field.errorMessage = 'Please Enter Valid PAN';
	// 							newError++;
	// 							return;
	// 						}


	// 						if (field.value.toLowerCase() ===
	// 							$rootScope.formData.fields.panNumber.toLowerCase()) {


	// 							field.error = true;
	// 							field.errorMessage = 'Guardian PAN must not be same as Customer PAN';
	// 							newError++;
	// 							return;
	// 						}
	// 					}
	// 					if (
	// 						(field.field === 'Guardian Id proof number' ||
	// 							field.field === 'Guardian ID proof number: (Last 4 digits)') &&
	// 						idproof === '1007' &&
	// 						field.value
	// 					) {


	// 						if (!Aahaar.test(field.value)) {
	// 							field.error = true;
	// 							field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
	// 							newError++;
	// 							return;
	// 						}


	// 						const clientDigiAadhaar =
	// 							(sessionStorage.getItem('DigiAadhar') || '').trim();


	// 						if (field.value === clientDigiAadhaar) {
	// 							field.error = true;
	// 							field.errorMessage = 'Client and Guardian proof number cannot be the same';
	// 							newError++;
	// 							return;
	// 						}
	// 					}
	// 					if (field.required && field.value &&
	// 						field.field === 'Id proof number' &&
	// 						idproof == '1017' &&
	// 						!dlRegex.test(field.value)) {

	// 						field.error = true;
	// 						field.errorMessage = 'Please Enter Valid Driving License Number';
	// 						newError++;
	// 					}

	// 					// Passport
	// 					if (field.required && field.value &&
	// 						field.field === 'Id proof number' &&
	// 						idproof == '1009' &&
	// 						!passportRegex.test(field.value)) {

	// 						field.error = true;
	// 						field.errorMessage = 'Please Enter Valid Passport Number';
	// 						newError++;
	// 					}





	// 					// ==========================
	// 					// GUARDIAN ID vs NOMINEE ID
	// 					// ==========================
	// 					if (
	// 						(field.field === 'Guardian Id proof number' ||
	// 							field.field === 'Guardian ID proof number: (Last 4 digits)') &&
	// 						field.value
	// 					) {


	// 						const guardianIdNumber = field.value.trim().toLowerCase();


	// 						const duplicate = $rootScope.nomineeNewFields
	// 							.filter(n => n)
	// 							.map((group, idx) => {
	// 								const np = group.find(x => x.field === 'Id Proof')?.value;
	// 								const nn = group.find(x =>
	// 									x.field === 'Id proof number' ||
	// 									x.field === 'Id proof number: (Last 4 digits)'
	// 								)?.value?.trim().toLowerCase();


	// 								return np && nn ? { idx: idx + 1, np, nn } : null;
	// 							})
	// 							.find(n =>
	// 								n && n.np === idproof && n.nn === guardianIdNumber
	// 							);


	// 						if (duplicate) {
	// 							field.error = true;
	// 							field.errorMessage =
	// 								`Guardian ID Proof & Number must not be same as Nominee ${duplicate.idx}`;
	// 							newError++;
	// 							return;
	// 						}
	// 					}


	// 					// ==========================
	// 					// NAME MATCH VALIDATION
	// 					// ==========================
	// 					if (
	// 						field.field === 'Guardian first name' ||
	// 						field.field === 'Guardian Middle name' ||
	// 						field.field === 'Guardian Last name'
	// 					) {


	// 						const gf = guardianGroup.find(x => x.field === 'Guardian first name')?.value || '';
	// 						const gm = guardianGroup.find(x => x.field === 'Guardian Middle name')?.value || '';
	// 						const gl = guardianGroup.find(x => x.field === 'Guardian Last name')?.value || '';


	// 						const guardianName = (gf + gm + gl).replace(/\s+/g, '').toLowerCase();


	// 						if (!guardianName) return;


	// 						const clientName =
	// 							(sessionStorage.getItem('ClientFullName') || '')
	// 								.replace(/\s+/g, '').toLowerCase();


	// 						if (guardianName === clientName) {
	// 							field.error = true;
	// 							field.errorMessage = 'Guardian name and Client name cannot be same';
	// 							newError++;
	// 							return;
	// 						}


	// 						const nomineeNames = $rootScope.nomineeNewFields
	// 							.filter(n => n)
	// 							.map(group => {
	// 								const f = group.find(x => x.field === 'First name')?.value || '';
	// 								const m = group.find(x => x.field === 'Middle name')?.value || '';
	// 								const l = group.find(x => x.field === 'Last name')?.value || '';
	// 								return (f + m + l).replace(/\s+/g, '').toLowerCase();
	// 							});


	// 						if (nomineeNames.includes(guardianName)) {
	// 							field.error = true;
	// 							field.errorMessage = 'Guardian name and Nominee name cannot be same';
	// 							newError++;
	// 							return;
	// 						}
	// 					}


	// 				});
	// 			});


	// 		$scope.$evalAsync();
	// 	}

	// 	if ($rootScope.additionalAddress.filter(g => g).length > 0) {
	// 		$rootScope.additionalAddress
	// 			.filter(a => a)
	// 			.forEach(function (nomineeGroup) {
	// 				nomineeGroup.forEach(function (field) {
	// 					if (field.required && !field.value) {
	// 						field.error = true;
	// 						newError++;
	// 					} else {
	// 						field.error = false;
	// 					}
	// 				});
	// 			});
	// 	}


	// 	if ($rootScope.GuardadditionalAddress.filter(g => g).length > 0) {
	// 		$rootScope.GuardadditionalAddress
	// 			.filter(a => a)
	// 			.forEach(function (nomineeGroup) {
	// 				nomineeGroup.forEach(function (field) {
	// 					if (field.required && !field.value) {
	// 						field.error = true;
	// 						newError++;
	// 					} else {
	// 						field.error = false;
	// 					}
	// 				});
	// 			});
	// 	}



	// 	if (newError != 0) {
	// 		$('#nomineeInfo').collapse('show');
	// 	}

	// 	if ($rootScope.nomineeNewFields.length > 0 && !$rootScope.nomineePrint) {
	// 		$scope.printNomineeError = true;
	// 		newError++;
	// 	}

	// 	/*  if ($rootScope.nomineeNewFields.length > 0 &&
	// 		 (
	// 			 !$rootScope.formData.fields.Nomineeappicant)) {

	// 		 $scope.Nctry1NomineeError = true;
	// 		 newError++;
	// 		 return;
	// 	 }

	// 	 if ($scope.nomineeDropdownList.length > 0 &&
	// 		 $rootScope.nomineeNewFields.length > 0 &&
	// 		 !$rootScope.formData.fields.IncapacitationNominee && $rootScope.formData.fields.Nomineeappicant == "Y") {

	// 		 $scope.IncapacitationNomineeError = true;
	// 		 newError++;
	// 		 return;
	// 	 } */

	// 	/*   if ($scope.nomineeDropdownList.length > 0 &&
	// 		  $rootScope.nomineeNewFields.length > 0 &&
	// 		  !$rootScope.formData.fields.nomineeamountSharevalue && $rootScope.formData.fields.Nomineeappicant == "Y") {

	// 		  $scope.Emptynamountshare = true;
	// 		  newError++;
	// 		  return;
	// 	  } */
	// 	/* 	$rootScope.formData.fields.ShareAmount=parseInt($rootScope.formData.fields.ShareAmount);
	// 		if ($scope.nomineeDropdownList.length > 0 &&
	// 			$rootScope.nomineeNewFields.length > 0 &&
	// 			(!$rootScope.formData.fields.ShareAmount ||$rootScope.formData.fields.ShareAmount==0) && $rootScope.formData.fields.Nomineeappicant == "Y") {

	// 			$scope.EmptyShareAmountError = true;
	// 			newError++;
	// 			return;
	// 		}


	// 		if ($scope.nomineeDropdownList.length > 0 &&
	// 			$rootScope.nomineeNewFields.length > 0 &&

	// 			$rootScope.formData.fields.ShareAmount > 100 && $rootScope.formData.fields.Nomineeappicant == "Y") {

	// 			$scope.ShareAmountError = true;
	// 			newError++;
	// 			return;
	// 		} */

	// 	return newError === 0;
	// };
	$scope.validateNomineeFields = function () {


		let newError = 0;
		$scope.Emptynamountshare = false;
		$scope.EmptyShareAmountError = false;
		$scope.ShareAmountError = false;
		$scope.IncapacitationNomineeError = false;


		// CR: restricted / placeholder values not allowed for Nominee & Guardian names
		const restrictedNomineeNames = [
			'no', 'y', 'n', 'na', 'n/a', 'nil', 'none', 'null',
			'unknown', 'test', 'dummy', 'sample', 'xxx', 'abc',
			'hey', 'hi', 'yes'
		];


		if ($rootScope.nomineeNewFields.length > 0) {




			let idproof = '';


			// ============================================================
			// EQUAL SHARE AUTO-ALLOCATION (Nominee share left blank)
			// ============================================================
			const shareFieldsList = $rootScope.nomineeNewFields
				.filter(n => n)
				.map(group => group.find(f => f.field === 'Nominee share (%)'))
				.filter(f => f);


			const blankShareFields = shareFieldsList.filter(f => !f.value);


			if (blankShareFields.length > 0) {
				const filledTotal = shareFieldsList
					.filter(f => f.value)
					.reduce((sum, f) => sum + Number(f.value), 0);


				const remainingShare = 100 - filledTotal;


				if (remainingShare > 0) {
					const equalShare = +(remainingShare / blankShareFields.length).toFixed(2);
					blankShareFields.forEach((f, idx) => {
						f.value = idx === blankShareFields.length - 1
							? +(remainingShare - equalShare * (blankShareFields.length - 1)).toFixed(2)
							: equalShare;
					});
				}
			}




			$rootScope.nomineeNewFields
				.filter(n => n)
				.forEach(function (nomineeGroup, nomineeIndex) {




					nomineeGroup.forEach(function (field) {




						field.error = false;
						field.errorMessage = '';
						if (field.value && field.field === 'Id Proof') {
							idproof = field.value;
						}
						if (field.required && !field.value) {
							field.error = true;
							field.errorMessage = 'Please Provide Valid Input';
							newError++;
							return;
						}
						if (
							field.field === 'Email ID' &&
							field.value &&
							!$scope.EmailRefex(field.value)
						) {
							field.error = true;
							field.errorMessage =
								'Please provide proper email address. Eg: john@xyz.com';
							newError++;
							return;
						}
						if (
							field.field === 'Mobile Number' &&
							field.value &&
							!$rootScope.mobileNumberValidation(field.value)
						) {
							field.error = true;
							field.errorMessage =
								'Please provide 10 digit valid mobile number';
							newError++;
							return;
						}
						// ============================================================
						// NAME VALIDATION - only alphabets, trim/collapse spaces,
						// minimum length, restricted placeholder values
						// ============================================================
						if (
							(field.field === 'First name' ||
								field.field === 'Middle name' ||
								field.field === 'Last name') &&
							field.value
						) {
							field.value = field.value.replace(/\s+/g, ' ').trim();


							if (!/^[A-Za-z ]+$/.test(field.value)) {
								field.error = true;
								field.errorMessage =
									`${field.field} must contain only alphabetic characters`;
								newError++;
								return;
							}


							if (
								(field.field === 'First name' || field.field === 'Last name') &&
								field.value.length < 2
							) {
								field.error = true;
								field.errorMessage =
									`${field.field} must be at least 2 characters long`;
								newError++;
								return;
							}


							if (restrictedNomineeNames.includes(field.value.toLowerCase())) {
								field.error = true;
								field.errorMessage =
									`Please provide a valid ${field.field.toLowerCase()}`;
								newError++;
								return;
							}
						}
						// ============================================================
						// DATE OF BIRTH - future date not allowed, minor => guardian mandatory
						// ============================================================
						if (field.field === 'Date of birth' && field.value) {
							const [dD, dM, dY] = field.value.split('/').map(Number);
							const dob = new Date(dY, dM - 1, dD);
							const today = new Date();
							today.setHours(0, 0, 0, 0);


							if (dob > today) {
								field.error = true;
								field.errorMessage = 'Future date of birth is not allowed';
								newError++;
								return;
							}


							let nomineeAge = today.getFullYear() - dY;
							if (
								(today.getMonth() + 1) < dM ||
								((today.getMonth() + 1) === dM && today.getDate() < dD)
							) {
								nomineeAge -= 1;
							}


							if (
								nomineeAge < 18 &&
								!($rootScope.guardianNewFields[nomineeIndex] &&
									$rootScope.guardianNewFields[nomineeIndex].length > 0)
							) {
								field.error = true;
								field.errorMessage =
									'Nominee is a minor (below 18 years). Guardian details are mandatory';
								newError++;
								return;
							}
						}
						if (
							field.field === 'Nominee share (%)' &&
							field.value
						) {
							if (Number(field.value) < 0.01 || Number(field.value) > 100) {
								field.error = true;
								field.errorMessage =
									'Nominee share must be between 0.01% and 100%';
								newError++;
								return;
							}


							const totalShare =
								$rootScope.nomineeNewFields
									.filter(n => n)
									.flat()
									.filter(n => n.field === 'Nominee share (%)' && n.value)
									.map(n => Number(n.value))
									.reduce((sum, s) => sum + s, 0);




							if (totalShare !== 100) {
								field.error = true;
								field.errorMessage =
									'Combined Nominee share should be exactly 100%';
								newError++;
								return;
							}
						}
						if (
							field.field === 'Id proof number' &&
							field.value &&
							idproof === '1008'
						) {
							if (!pan_filter.test(field.value)) {
								field.error = true;
								field.errorMessage = 'Please Enter Valid PAN';
								newError++;
								return;
							}




							if (
								field.value.toLowerCase() ===
								$rootScope.formData.fields.panNumber.toLowerCase()
							) {
								field.error = true;
								field.errorMessage =
									"Nominee's PAN must not be same as Customer's PAN";
								newError++;
								return;
							}
						}
						if (
							(
								field.field === 'Id proof number' ||
								field.field === 'Id proof number: (Last 4 digits)'
							) &&
							field.value &&
							idproof === '1007'
						) {
							if (!Aahaar.test(field.value)) {
								field.error = true;
								field.errorMessage =
									'Please Enter Valid Aadhaar Document Number';
								newError++;
								return;
							}




							const clientDigiAadhaar =
								(sessionStorage.getItem('DigiAadhar') || '').trim();




							if (field.value === clientDigiAadhaar) {
								field.error = true;
								field.errorMessage =
									"Nominee's Aadhaar cannot be same as Client's DigiAadhaar";
								newError++;
								return;
							}
						}
						if (field.required && field.value &&
							field.field === 'Id proof number' &&
							idproof == '1017' &&
							!dlRegex.test(field.value)) {


							field.error = true;
							field.errorMessage = 'Please Enter Valid Driving License Number';
							newError++;
						}


						// Passport
						if (field.required && field.value &&
							field.field === 'Id proof number' &&
							idproof == '1009' &&
							!passportRegex.test(field.value)) {


							field.error = true;
							field.errorMessage = 'Please Enter Valid Passport Number';
							newError++;
						}






						// ============================================================
						// DUPLICATE NOMINEE ID PROOF + NUMBER
						// ============================================================
						if (
							(
								field.field === 'Id proof number' ||
								field.field === 'Id proof number: (Last 4 digits)'
							) &&
							field.value &&
							idproof
						) {
							const currentIdNumber =
								field.value.trim().toLowerCase();




							const validIdFields = [
								'Id proof number',
								'Id proof number: (Last 4 digits)'
							];




							const duplicate = $rootScope.nomineeNewFields
								.map((group, idx) => {


									if (idx === nomineeIndex) return null;




									const otherProof =
										group.find(x => x.field === 'Id Proof')?.value || '';




									const otherNumber =
										group.find(x => validIdFields.includes(x.field))
											?.value?.trim().toLowerCase() || '';




									if (otherProof && otherNumber) {
										return {
											nomineeNo: idx + 1,
											proof: otherProof,
											number: otherNumber
										};
									}
									return null;
								})
								.filter(n => n)
								.find(n =>
									n.proof === idproof &&
									n.number === currentIdNumber
								);




							if (duplicate) {
								field.error = true;
								field.errorMessage =
									`Nominee ${nomineeIndex + 1} and Nominee ${duplicate.nomineeNo} cannot have same ID Proof & Number`;
								newError++;
								return;
							}
						}




						// ============================================================
						// DUPLICATE FULL NAME + CLIENT NAME CHECK
						// ============================================================
						if (
							field.field === 'First name' ||
							field.field === 'Middle name' ||
							field.field === 'Last name'
						) {




							const fn =
								nomineeGroup.find(f => f.field === 'First name')
									?.value?.trim().toLowerCase() || '';
							const mn =
								nomineeGroup.find(f => f.field === 'Middle name')
									?.value?.trim().toLowerCase() || '';
							const ln =
								nomineeGroup.find(f => f.field === 'Last name')
									?.value?.trim().toLowerCase() || '';




							const currentName =
								(fn + mn + ln).replace(/\s+/g, '');




							if (!currentName) return;




							const allNames =
								$rootScope.nomineeNewFields.map((g, idx) => {
									const f = g.find(x => x.field === 'First name')?.value || '';
									const m = g.find(x => x.field === 'Middle name')?.value || '';
									const l = g.find(x => x.field === 'Last name')?.value || '';
									return {
										nomineeNo: idx + 1,
										name: (f + m + l).replace(/\s+/g, '').toLowerCase()
									};
								});




							const duplicates =
								allNames.filter(n => n.name === currentName);




							if (duplicates.length > 1) {
								const dupNos =
									duplicates
										.map(d => d.nomineeNo)
										.filter(n => n !== nomineeIndex + 1);




								field.error = true;
								field.errorMessage =
									`Nominee ${nomineeIndex + 1} and Nominee ${dupNos.join(', ')} full names are same`;
								newError++;
								return;
							}




							const clientName =
								(sessionStorage.getItem('ClientFullName') || '')
									.replace(/\s+/g, '')
									.toLowerCase();




							if (currentName === clientName) {
								field.error = true;
								field.errorMessage =
									'Client name and Nominee name cannot be same';
								newError++;
								return;
							}
						}




						// ============================================================
						// SECONDARY DUPLICATE VALIDATION (WARNING) -
						// First Name + Last Name + DOB match => warn, allow continue on confirmation
						// ============================================================
						if (field.field === 'Date of birth') {
							const secFirst =
								(nomineeGroup.find(f => f.field === 'First name')?.value || '')
									.trim().toLowerCase();
							const secLast =
								(nomineeGroup.find(f => f.field === 'Last name')?.value || '')
									.trim().toLowerCase();
							const secDob =
								nomineeGroup.find(f => f.field === 'Date of birth')?.value || '';


							if (secFirst && secLast && secDob) {
								const secDupNos = $rootScope.nomineeNewFields
									.map((group, idx) => {
										if (idx === nomineeIndex || !group) return null;
										const f2 = (group.find(x => x.field === 'First name')?.value || '')
											.trim().toLowerCase();
										const l2 = (group.find(x => x.field === 'Last name')?.value || '')
											.trim().toLowerCase();
										const d2 = group.find(x => x.field === 'Date of birth')?.value || '';
										return (f2 === secFirst && l2 === secLast && d2 === secDob) ? idx + 1 : null;
									})
									.filter(n => n);


								if (secDupNos.length > 0) {
									const warnKey =
										[nomineeIndex + 1, ...secDupNos].sort((a, b) => a - b).join('-');


									if (!$rootScope.nomineeDuplicateWarningAck[warnKey]) {
										const proceedAnyway = window.confirm(
											`Nominee ${nomineeIndex + 1} has the same First Name, Last Name and Date of Birth as Nominee ${secDupNos.join(', ')}. Please review. Click OK to continue anyway, or Cancel to edit the details.`
										);


										if (proceedAnyway) {
											$rootScope.nomineeDuplicateWarningAck[warnKey] = true;
										} else {
											const fnField = nomineeGroup.find(f => f.field === 'First name');
											if (fnField) {
												fnField.error = true;
												fnField.errorMessage =
													`Possible duplicate: same name & date of birth as Nominee ${secDupNos.join(', ')}`;
											}
											newError++;
										}
									}
								}
							}
						}




					});
				});




			$scope.$evalAsync();
		}
		if ($rootScope.guardianNewFields.filter(g => g).length > 0) {




			let idproof = '';




			$rootScope.guardianNewFields
				.filter(g => g)
				.forEach(function (guardianGroup) {




					guardianGroup.forEach(function (field) {




						field.error = false;
						field.errorMessage = '';
						if (field.value && field.field === "Guardian Id Proof") {
							idproof = field.value;
						}
						if (field.required && !field.value) {
							field.error = true;
							field.errorMessage = 'Please Provide Valid Input';
							newError++;
							return;
						}
						if (field.field === 'Guardian Email ID' &&
							field.value &&
							!$scope.EmailRefex(field.value)) {




							field.error = true;
							field.errorMessage = 'Please provide a proper email address. Eg: john@xyz.com';
							newError++;
							return;
						}
						if (field.field === 'Guardian Mobile Number' &&
							field.value &&
							!$rootScope.mobileNumberValidation(field.value)) {




							field.error = true;
							field.errorMessage = 'Please provide a 10-digit valid mobile number';
							newError++;
							return;
						}
						// ============================================================
						// GUARDIAN NAME VALIDATION - only alphabets, trim/collapse spaces,
						// minimum length, restricted placeholder values
						// ============================================================
						if (
							(field.field === 'Guardian first name' ||
								field.field === 'Guardian Middle name' ||
								field.field === 'Guardian Last name') &&
							field.value
						) {
							field.value = field.value.replace(/\s+/g, ' ').trim();


							if (!/^[A-Za-z ]+$/.test(field.value)) {
								field.error = true;
								field.errorMessage =
									`${field.field} must contain only alphabetic characters`;
								newError++;
								return;
							}


							if (
								(field.field === 'Guardian first name' || field.field === 'Guardian Last name') &&
								field.value.length < 2
							) {
								field.error = true;
								field.errorMessage = `${field.field} must be at least 2 characters long`;
								newError++;
								return;
							}


							if (restrictedNomineeNames.includes(field.value.toLowerCase())) {
								field.error = true;
								field.errorMessage =
									`Please provide a valid ${field.field.toLowerCase()}`;
								newError++;
								return;
							}
						}
						// ============================================================
						// GUARDIAN DATE OF BIRTH - future date not allowed
						// ============================================================
						if (field.field === 'Guardian Date of birth' && field.value) {
							const [gD, gM, gY] = field.value.split('/').map(Number);
							const guardianDob = new Date(gY, gM - 1, gD);
							const today = new Date();
							today.setHours(0, 0, 0, 0);


							if (guardianDob > today) {
								field.error = true;
								field.errorMessage = 'Future date of birth is not allowed';
								newError++;
								return;
							}
						}
						if (field.field === 'Guardian Id proof number' &&
							field.value &&
							idproof === '1008') {




							if (!pan_filter.test(field.value)) {
								field.error = true;
								field.errorMessage = 'Please Enter Valid PAN';
								newError++;
								return;
							}




							if (field.value.toLowerCase() ===
								$rootScope.formData.fields.panNumber.toLowerCase()) {




								field.error = true;
								field.errorMessage = 'Guardian PAN must not be same as Customer PAN';
								newError++;
								return;
							}
						}
						if (
							(field.field === 'Guardian Id proof number' ||
								field.field === 'Guardian ID proof number: (Last 4 digits)') &&
							idproof === '1007' &&
							field.value
						) {




							if (!Aahaar.test(field.value)) {
								field.error = true;
								field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
								newError++;
								return;
							}




							const clientDigiAadhaar =
								(sessionStorage.getItem('DigiAadhar') || '').trim();




							if (field.value === clientDigiAadhaar) {
								field.error = true;
								field.errorMessage = 'Client and Guardian proof number cannot be the same';
								newError++;
								return;
							}
						}
						if (field.required && field.value &&
							field.field === 'Id proof number' &&
							idproof == '1017' &&
							!dlRegex.test(field.value)) {


							field.error = true;
							field.errorMessage = 'Please Enter Valid Driving License Number';
							newError++;
						}


						// Passport
						if (field.required && field.value &&
							field.field === 'Id proof number' &&
							idproof == '1009' &&
							!passportRegex.test(field.value)) {


							field.error = true;
							field.errorMessage = 'Please Enter Valid Passport Number';
							newError++;
						}










						// ==========================
						// GUARDIAN ID vs NOMINEE ID
						// ==========================
						if (
							(field.field === 'Guardian Id proof number' ||
								field.field === 'Guardian ID proof number: (Last 4 digits)') &&
							field.value
						) {




							const guardianIdNumber = field.value.trim().toLowerCase();




							const duplicate = $rootScope.nomineeNewFields
								.filter(n => n)
								.map((group, idx) => {
									const np = group.find(x => x.field === 'Id Proof')?.value;
									const nn = group.find(x =>
										x.field === 'Id proof number' ||
										x.field === 'Id proof number: (Last 4 digits)'
									)?.value?.trim().toLowerCase();




									return np && nn ? { idx: idx + 1, np, nn } : null;
								})
								.find(n =>
									n && n.np === idproof && n.nn === guardianIdNumber
								);




							if (duplicate) {
								field.error = true;
								field.errorMessage =
									`Guardian ID Proof & Number must not be same as Nominee ${duplicate.idx}`;
								newError++;
								return;
							}




							// ==========================
							// GUARDIAN ID vs GUARDIAN ID (duplicate guardian identification)
							// ==========================
							const currentGuardianIndex = $rootScope.guardianNewFields.indexOf(guardianGroup);


							const duplicateGuardian = $rootScope.guardianNewFields
								.map((group, idx) => {
									if (!group || idx === currentGuardianIndex) return null;
									const gp = group.find(x => x.field === 'Guardian Id Proof')?.value;
									const gn = group.find(x =>
										x.field === 'Guardian Id proof number' ||
										x.field === 'Guardian ID proof number: (Last 4 digits)'
									)?.value?.trim().toLowerCase();


									return gp && gn ? { idx: idx + 1, gp, gn } : null;
								})
								.filter(n => n)
								.find(n => n.gp === idproof && n.gn === guardianIdNumber);


							if (duplicateGuardian) {
								field.error = true;
								field.errorMessage =
									`Guardian ID Proof & Number for Nominee ${currentGuardianIndex + 1} and Nominee ${duplicateGuardian.idx} cannot be same`;
								newError++;
								return;
							}
						}




						// ==========================
						// NAME MATCH VALIDATION
						// ==========================
						if (
							field.field === 'Guardian first name' ||
							field.field === 'Guardian Middle name' ||
							field.field === 'Guardian Last name'
						) {




							const gf = guardianGroup.find(x => x.field === 'Guardian first name')?.value || '';
							const gm = guardianGroup.find(x => x.field === 'Guardian Middle name')?.value || '';
							const gl = guardianGroup.find(x => x.field === 'Guardian Last name')?.value || '';




							const guardianName = (gf + gm + gl).replace(/\s+/g, '').toLowerCase();




							if (!guardianName) return;




							const clientName =
								(sessionStorage.getItem('ClientFullName') || '')
									.replace(/\s+/g, '').toLowerCase();




							if (guardianName === clientName) {
								field.error = true;
								field.errorMessage = 'Guardian name and Client name cannot be same';
								newError++;
								return;
							}




							const nomineeNames = $rootScope.nomineeNewFields
								.filter(n => n)
								.map(group => {
									const f = group.find(x => x.field === 'First name')?.value || '';
									const m = group.find(x => x.field === 'Middle name')?.value || '';
									const l = group.find(x => x.field === 'Last name')?.value || '';
									return (f + m + l).replace(/\s+/g, '').toLowerCase();
								});




							if (nomineeNames.includes(guardianName)) {
								field.error = true;
								field.errorMessage = 'Guardian name and Nominee name cannot be same';
								newError++;
								return;
							}
						}




					});
				});




			$scope.$evalAsync();
		}


		if ($rootScope.additionalAddress.filter(g => g).length > 0) {
			$rootScope.additionalAddress
				.filter(a => a)
				.forEach(function (nomineeGroup) {
					nomineeGroup.forEach(function (field) {
						if (field.required && !field.value) {
							field.error = true;
							newError++;
						} else {
							field.error = false;
						}
					});
				});
		}




		if ($rootScope.GuardadditionalAddress.filter(g => g).length > 0) {
			$rootScope.GuardadditionalAddress
				.filter(a => a)
				.forEach(function (nomineeGroup) {
					nomineeGroup.forEach(function (field) {
						if (field.required && !field.value) {
							field.error = true;
							newError++;
						} else {
							field.error = false;
						}
					});
				});
		}






		if (newError != 0) {
			$('#nomineeInfo').collapse('show');
		}


		if ($rootScope.nomineeNewFields.length > 0 && !$rootScope.nomineePrint) {
			$scope.printNomineeError = true;
			newError++;
		}


		/*  if ($rootScope.nomineeNewFields.length > 0 &&
			 (
				 !$rootScope.formData.fields.Nomineeappicant)) {
	 
			 $scope.Nctry1NomineeError = true;
			 newError++;
			 return;
		 }
	 
		 if ($scope.nomineeDropdownList.length > 0 &&
			 $rootScope.nomineeNewFields.length > 0 &&
			 !$rootScope.formData.fields.IncapacitationNominee && $rootScope.formData.fields.Nomineeappicant == "Y") {
	 
			 $scope.IncapacitationNomineeError = true;
			 newError++;
			 return;
		 } */


		/*   if ($scope.nomineeDropdownList.length > 0 &&
			  $rootScope.nomineeNewFields.length > 0 &&
			  !$rootScope.formData.fields.nomineeamountSharevalue && $rootScope.formData.fields.Nomineeappicant == "Y") {
	 
			  $scope.Emptynamountshare = true;
			  newError++;
			  return;
		  } */
		/*  rootScope.formData.fields.ShareAmount=parseInt(rootScope.formData.fields.ShareAmount);
			if ($scope.nomineeDropdownList.length > 0 &&
				$rootScope.nomineeNewFields.length > 0 &&
				(!rootScope.formData.fields.ShareAmount||rootScope.formData.fields.ShareAmount==0) && $rootScope.formData.fields.Nomineeappicant == "Y") {
	   
				$scope.EmptyShareAmountError = true;
				newError++;
				return;
			}
		   
	   
			if ($scope.nomineeDropdownList.length > 0 &&
				$rootScope.nomineeNewFields.length > 0 &&
			   
				$rootScope.formData.fields.ShareAmount > 100 && $rootScope.formData.fields.Nomineeappicant == "Y") {
	   
				$scope.ShareAmountError = true;
				newError++;
				return;
			} */


		return newError === 0;
	};
	$scope.EmailRefex = function (email) {
		var regex = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
		return regex.test(email);
	};
	$scope.showAdd = function () {
		if ($rootScope.formData.fields.NomineeRatio1 && $rootScope.formData.fields.NomineeRatio2 && $rootScope.formData.fields.NomineeRatio3) {
			let total = Number($rootScope.formData.fields.NomineeRatio1) + Number($rootScope.formData.fields.NomineeRatio2) + Number($rootScope.formData.fields.NomineeRatio3);
			if (total < 100 && total > 0) {
				$scope.showAddNew = true;
			} else {
				$scope.showAddNew = false;
			}
		}
	};
	$scope.guardianNewChange = function (value, index, label) {
		if (label === 'Guardian Id Proof') {
			let arr = $rootScope.guardianNewFields[index];
			arr.forEach(field => {
				if ((field.field === 'Guardian Id proof number' || field.field === 'Guardian ID proof number: (Last 4 digits)') && value == '1007') {
					field.value = '';
					field.directive = 'decimal';
					field.field = 'Guardian ID proof number: (Last 4 digits)';
					field.length = 4;
				} else if ((field.field === 'Guardian Id proof number' || field.field === 'Guardian ID proof number: (Last 4 digits)') && value != '1007') {
					field.value = '';
					field.directive = 'alpha-numeric';
					field.field = 'Guardian Id proof number';
					field.length = value == '1015' ? 16 : value == '1017' ? 16 : 10;
				}
			})
			// let idProofField = arr.find(field => field.field === 'Id Proof' && field.value == '1012');
			// if (idProofField) {
			// 	let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
			// 	if (idProofNumberField) {
			// 		idProofNumberField.required = false;
			// 	}
			// } else {
			// 	let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
			// 	if (idProofNumberField) {
			// 		idProofNumberField.required = true;
			// 	}
			// }
			$scope.$evalAsync();
		} else if (label === 'Id Proof') {
			let arr = $rootScope.nomineeNewFields[index];
			arr.forEach(field => {
				if ((field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)') && value == '1007') {
					field.value = '';
					field.directive = 'decimal';
					field.field = 'Id proof number: (Last 4 digits)';
					field.length = 4;
				} else if ((field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)') && value != '1007') {
					field.value = '';
					field.directive = 'alpha-numeric';
					field.field = 'Id proof number';
					field.length = value == '1015' ? 16 : value == '1017' ? 16 : 10;
				}
			})
			// let idProofField = arr.find(field => field.field === 'Id Proof' && field.value == '1012');
			// if (idProofField) {
			// 	let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
			// 	if (idProofNumberField) {
			// 		idProofNumberField.required = false;
			// 	}
			// } else {
			// 	let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
			// 	if (idProofNumberField) {
			// 		idProofNumberField.required = true;
			// 	}
			// }
			$scope.$evalAsync();
		}
	};
	$scope.removePopNew = function (index) {
		$rootScope.nomineeRemoveIndex = index;
		const ele = document.getElementById('nomineeDlt');
		var m = new bootstrap.Modal(ele, {
			backdrop: 'static',
			keyboard: false
		});
		m.show();
	};
	$scope.NomineeRemoveNew = function (index) {
		let NomineeInfoId = $rootScope.nomineeNewFields[index].find((val => val.field === "NomineeInfoId"));
		if (!NomineeInfoId.value) {
			$scope.removeNominee(index);
			return;
		}
		var url = "NomineeRemove";
		var sendData = {
			'NomineeInfoId': NomineeInfoId.value,
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken
		}
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				sessionStorage.setItem('AuthToken', response.EncryptToken);
			}
			if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return;
			}
			if (response.IsSuccess) {
				$scope.removeNominee(index);
			}
			if ($rootScope.nomineeNewFields === 0) {
				$rootScope.formData.fields.nominee = 'N';
				$('#nYes').prop('checked', false);
				$('#nNo').prop('checked', true);
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});
	};
	$scope.nomineeNewPercentCheck = function (label) {
		if (label == 'Nominee share (%)') {
			// const staticNomineeTotal = (Number($rootScope.formData.fields.NomineeRatio1) || 0) + (Number($rootScope.formData.fields.NomineeRatio2) || 0) +
			// (Number($rootScope.formData.fields.NomineeRatio3) || 0);
			const dynamicNomineeTotal = $rootScope.nomineeNewFields.flat().filter(n => n.field === 'Nominee share (%)' && n.value)
				.map(n => Number(n.value)).reduce((sum, share) => sum + share, 0);
			const total = dynamicNomineeTotal;
			$scope.nomineeNewshowAddBtn = total == 100;
		}
	};
	// dont forgot the code which is in the angucomplete.js file and angucompletecity.js file that is mandatory
	// new nominee code for remaining 7 nominees ends

	$scope.printNominee = function (value) {
		$rootScope.nomineePrint = value;
		$scope.printNomineeError = false;
	}
	$scope.Disability = function (value) {
		if (value == 'Y') {
			const ele = document.getElementById('DisabilityModal');
			var m = new bootstrap.Modal(ele, {
				backdrop: 'static',
				keyboard: false
			});
			m.show();
		} else {
			$rootScope.DisabilityVal = value;
			$scope.DisabilityError = false;
			var url = "CaptureDifferentlyAbled";
			var sendData = {
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
				PanNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
				DifferentlyAbledStatus: $rootScope.DisabilityVal
			}
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				if (response.IsSuccess) {
				} else {
					$scope.Errmsg = response.ErrorMessage
					const ele = document.getElementById('ErrDisabilityModal');
					var m = new bootstrap.Modal(ele, {
						backdrop: 'static',
						keyboard: false
					});
					m.show();
				}
			}, function (e) {
				$rootScope.formData.apiLoading = false;
				var connection = new bootstrap.Modal(document.getElementById('connection'));
				connection.show();
			});
		}
	}
	$scope.DisabilityModalYes = function () {
		var url = "CaptureDifferentlyAbled";
		var sendData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			PanNumber: $rootScope.formData.fields.panNumber ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
			DifferentlyAbledStatus: "Y"
		}
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {
				$('#existingCustomer-popup').modal('hide');
				signature = '';
				$rootScope.formData = {};
				$rootScope.formData.fields = {};
				sessionStorage.clear();
				$rootScope.verifyemail = false;
				sessionStorage.setItem('Disability', 'Y');
				$state.go('complete');
			} else {
				$scope.Errmsg = response.ErrorMessage
				const ele = document.getElementById('ErrDisabilityModal');
				var m = new bootstrap.Modal(ele, {
					backdrop: 'static',
					keyboard: false
				});
				m.show();
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			var connection = new bootstrap.Modal(document.getElementById('connection'));
			connection.show();
		});

	}
	$scope.DisabilityModalNo = function () {
		// Clear selected radio button
		$scope.DisabilityVal = 'N';
		$rootScope.DisabilityVal = 'N';

		// Also remove checked state manually (optional safeguard)
		document.getElementById("DisabilityYes").checked = false;
		document.getElementById("DisabilityNo").checked = false;

		$scope.DisabilityError = false; // clear error if any
	};

}
]);
