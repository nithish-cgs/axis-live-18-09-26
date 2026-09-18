mainChatApp.controller('personalController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
			$rootScope.formData.stageInfo = '3';
			if ($rootScope.getAPI) {
				if (sessionStorage.getItem('AxNo') != null) {
					$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
					$rootScope.getDIYStatus();
				} else {
					window.location.href = (serverService.getHome());
				}
			}
			$rootScope.formData.apiLoading = true;
			$rootScope.formData.fields.resStatus = 'indian';
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
			$scope.addressPrimary2 = true;
			$scope.addressPrimary3 = true;
			$scope.addressGuardian1 = true;
			$scope.addressGuardian2 = true;
			$scope.addressGuardian3 = true;
			$rootScope.formData.fields.gender = "M";
			$rootScope.formData.fields.gst = "N";
			$rootScope.formData.fields.anIncome = '1';
			$rootScope.formData.fields.rdnContractNote = "Y";
			$rootScope.formData.fields.InternetTrading = "N";
			$rootScope.formData.fields.dpCredit = "Y";
			$rootScope.formData.fields.dpPledge = "N";
			$rootScope.formData.fields.rdnDemat = "M";
			$rootScope.formData.fields.rdnElectEmail = "Y";
			$rootScope.formData.fields.shareEmail = "Y";
			$rootScope.formData.fields.rdnAnnualReport = "E";
			$rootScope.formData.fields.rdnBankAcc = "Y";
			$rootScope.formData.fields.rdnDIS = "N";
			$rootScope.formData.fields.agreeCall = "Y";
			$rootScope.formData.fields.rdnSetFunds = "Q";
			$rootScope.formData.fields.rdnSIP = "Y";
			$rootScope.formData.fields.taxOther = "N";
			$rootScope.formData.fields.sFunds = "1";
			$rootScope.formData.fields.tradeExp = '0';
			$scope.subBroker = false;
			$rootScope.formData.resendNew = false;
			$rootScope.formData.nPin_valueError = false;
			$rootScope.formData.gPin_valueError = false;
			$rootScope.networthOptional = 'Optional';
			$scope.onloadValidate = true;
			$scope.pageload = false;
			$scope.rStatusdisabled = false
				//$("#tpctry1").prop('checked', true);
				$('#citizen').prop("disabled", true);
			$("#father").prop('checked', true);
			$('#cb111, #cb112, #cb113, #cb114,  #cb115, #cb116, #cb118').iCheck('disable');
			if (sessionStorage.getItem('RMEmailOTPVerified') === true || sessionStorage.getItem('RMEmailOTPVerified') === 'true') {
				$scope.rmemailOTPVerified = true;
				$scope.rmonloadValidate = false;
			}
			if (sessionStorage.getItem('RMMobileOTPVerified') === true || sessionStorage.getItem('RMMobileOTPVerified') === 'true') {
				$scope.mobileOTPVerified = true;
				$scope.onloadValidate = false;
			}
			setTimeout(function () {
				$('#trdExp').val('0');
				$('#pscrelation').val('N');
				$('#disputes').val('N');
				$('#anIncome').val('1');
				$("#nNo").prop('checked', true);
				$(':radio[name=emstatus][value=S]').iCheck('check');
				$(':radio[name=mmstatus][value=S]').iCheck('check');
				$(".select").select2();
				$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
				});
			}, 500)

			// Opening select2 tab on focus
			$(document).on('focus', '.select2', function (e) {
				if (e.originalEvent) {
					$(this).siblings('select').select2('open');
				}
			});
			if (sessionStorage.getItem('RxEmail')) {
				$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
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
				$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
				});
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

				$('input[name=emstatus]').on('ifChanged', function (event) {
					$scope.panEmailRegError = false;
					$rootScope.formData.fields.emailBelongs = $(this).val();
					if ($rootScope.formData.fields.emailBelongs == 'S') {
						$scope.panEmailShow = false;
						$scope.panEmailError = false;
						$scope.panEmailSameError = false;
						$scope.emailBelongsError = true;
						$rootScope.formData.fields.emailPan = '';
						$scope.$apply();
					} else {
						$scope.panEmailShow = true;
						$scope.emailBelongsError = false;
						$scope.$apply();
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

				$('#eself').on('ifChecked', function (event) {
					$scope.panEmailShow = false;
					$scope.panEmailError = false;
					$scope.panEmailSameError = false;
					$rootScope.formData.fields.emailPan = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.panEmailShow = true;
					$scope.$apply();
				});

				$('#rdnContractNote').on('ifChecked', function (event) {
					$rootScope.formData.fields.rdnContractNote = "Y";
					$rootScope.termsAndConditionsError = false;
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$rootScope.formData.fields.rdnContractNote = "N";
					$scope.$apply();
				});

				$('#InternetTrading').on('ifChecked', function (event) {
					if (!$scope.termsOpen) {
						$scope.profileBTerms();
					}
					$rootScope.formData.fields.InternetTrading = "Y";
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$rootScope.formData.fields.InternetTrading = "N";
					$scope.$apply();
				});

				$('input[name=mmstatus]').on('ifChanged', function (event) {
					$scope.panMobileRegError = false;
					$rootScope.formData.fields.mobileBelongs = $(this).val();
					if ($rootScope.formData.fields.mobileBelongs == 'S') {
						$scope.panMobileShow = false;
						$scope.panMobileError = false;
						$scope.panMobileSameError = false;
						$scope.mobileBelongsError = true;
						$rootScope.formData.fields.mobilePan = '';
						$scope.$apply();
					} else {
						$scope.panMobileShow = true;
						$scope.mobileBelongsError = false;
						$scope.$apply();
					}
					$scope.$apply();
				});

				$('#mself').on('ifChecked', function (event) {
					$scope.panMobileShow = false;
					$scope.panMobileError = false;
					$scope.panMobileSameError = false;
					$rootScope.formData.fields.mobilePan = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.panMobileShow = true;
					$scope.$apply();
				});

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

				$("#tpctry1").on('ifChecked', function (event) {
					$rootScope.formData.fields.taxOther = "N";
					$rootScope.fatcaError = false;
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$rootScope.formData.fields.taxOther = "Y";
					$scope.$apply();
				});

				$('#nYes').on('ifChecked', function (event) {
					$scope.hideNominee1 = false;
					$scope.AddNominee1 = true;
					$scope.disableNomineeChkBox = true;
					$rootScope.formData.fields.NomineeRatio1 = 100;
					$scope.AddNominee2Show = true
						$scope.$apply();
				});

				$('#nNo').on('ifChecked', function (event) {
					if (!$scope.hideNominee1 || !$scope.hideNominee2 || !$scope.hideNominee3) {
						$('#NomineDeletePopUp').modal();
					}
					$scope.$apply();
				});

				$('#nsameAddress1').on('ifChecked', function (event) {
					$scope.addressPrimary1 = true;
					// $rootScope.formData.fields.nAddress1 = '';
					$rootScope.formData.fields.nState1 = null;
					$rootScope.formData.fields.nPin1 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressPrimary1 = false;
					$scope.$apply();
				});

				$("#nsameAddress2").on('ifChecked', function (event) {
					$scope.addressPrimary2 = true;
					// $rootScope.formData.fields.nAddress2 = '';
					$rootScope.formData.fields.nState2 = null;
					$rootScope.formData.fields.nPin2 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressPrimary2 = false;
					$scope.$apply();
				});

				$("#nsameAddress3").on('ifChecked', function (event) {
					$scope.addressPrimary3 = true;
					//$rootScope.formData.fields.nAddress3 = '';
					$rootScope.formData.fields.nState3 = null;
					$rootScope.formData.fields.nPin3 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressPrimary3 = false;
					$scope.$apply();
				});

				$("#guardianAddress1").on('ifChecked', function (event) {
					$scope.addressGuardian1 = true;
					$rootScope.formData.fields.gAddress1 = '';
					$rootScope.formData.fields.gState1 = null;
					$rootScope.formData.fields.gPin1 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressGuardian1 = false;
					$scope.$apply();
				});

				$("#guardianAddress2").on('ifChecked', function (event) {
					$scope.addressGuardian2 = true;
					$rootScope.formData.fields.gAddress2 = '';
					$rootScope.formData.fields.gState2 = null;
					$rootScope.formData.fields.gPin2 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressGuardian2 = false;
					$scope.$apply();
				});

				$("#guardianAddress3").on('ifChecked', function (event) {
					$scope.addressGuardian3 = true;
					$rootScope.formData.fields.gAddress3 = '';
					$rootScope.formData.fields.gState3 = null;
					$rootScope.formData.fields.gPin3 = '';
					$scope.$apply();
				}).on("ifUnchecked", function () {
					$scope.addressGuardian3 = false;
					$scope.$apply();
				});

				$('#rb36').on('ifChecked', function (event) {
					$scope.sipError = true;
					$scope.$apply();

				}).on("ifUnchecked", function () {
					$scope.sipError = false;
					$scope.$apply();
				});
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
			});

			$('.info-cat').bind('mouseleave touchend', function () {
				$(this).siblings('.info-details').hide();
				$(this).parents('p').siblings('.info-details').hide();
			});

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
			} else if ($rootScope.formData.fields.title == 'MISS' || $rootScope.formData.fields.title == 'MRS' || $rootScope.formData.fields.title == 'MS') {
				$('#gender').val('F');
			}

			if ($rootScope.formData.fields.title == 'MRS') {
				$('#marital').val('M');
				$scope.fsType = true;
			}

			setTimeout(function () {
				$("#rStatus option:contains(" + $rootScope.formData.fields.resStatus + ")").prop('selected', true);
				$("#citizen").val('India');
				$(".select").select2();
				$scope.selectShow = true;
			}, 1000);

			$scope.resStatus = function () {
				var error = 0;
				if ($('#rStatus').val() != 'indian') {
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
						$(".select").select2();
						$('.customcheckradio').iCheck({
							checkboxClass: 'icheckbox_minimal',
							radioClass: 'iradio_minimal'
						});
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
					$rootScope.formData.fields.fsMiddleName = Personal_Info.fsmMiddleName;
					$rootScope.formData.fields.fsLastName = Personal_Info.fsLastName;
					$rootScope.formData.fields.moTitle = Personal_Info.moTitle;
					$rootScope.formData.fields.moFirstName = Personal_Info.moFirstName;
					$rootScope.formData.fields.moMiddleName = Personal_Info.moMiddleName;
					$rootScope.formData.fields.moLastName = Personal_Info.moLastName;
					$rootScope.formData.fields.maTitle = Personal_Info.maTitle;
					$rootScope.formData.fields.maFirstName = Personal_Info.maFirstName;
					$rootScope.formData.fields.maMiddleName = Personal_Info.maMiddleName;
					$rootScope.formData.fields.maLastName = Personal_Info.maLastName;
					$rootScope.formData.fields.email = Personal_Info.email;
					$rootScope.formData.fields.emailBelongs = Personal_Info.emailBelongs;
					$rootScope.formData.fields.mobile = Personal_Info.mobile;
					$rootScope.formData.fields.mobileBelongs = Personal_Info.mobileBelongs;
					//$('#citizen').val() = Personal_Info.nationality;
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
					$rootScope.formData.fields.rdnSetFunds = Personal_Info.settlementOfFunds;
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
					if (sessionStorage.getItem('IsAadhar') == 'true') {
						$rootScope.formData.aadharData = JSON.parse(sessionStorage.getItem('aadharClientInfo'));
						$rootScope.formData.aadharVerified = true;

						if ($rootScope.formData.aadharData.APP_F_NAME) {

							var a = $rootScope.formData.aadharData.APP_F_NAME.split(' ');

							$rootScope.formData.fields.fsFirstName = a[0];
							if (a[1]) {
								$rootScope.formData.fields.fsLastName = a[1];
							}

							if (a[2]) {
								$rootScope.formData.fields.fsMiddleName = a[1];
								$rootScope.formData.fields.fsLastName = a[2];
							}
						}
						if ($rootScope.formData.aadharData.APP_GEN == 'M') {
							$("#gender").val('M');
						} else if ($rootScope.formData.aadharData.APP_GEN == 'F') {
							$("#gender").val('F');
						} else {
							$("#gender").val('T');
						}

						if ($rootScope.formData.aadharData.APP_MAR_STATUS == 'M') {
							$("#marital").val('M');
						} else if ($rootScope.formData.aadharData.APP_MAR_STATUS == 'S') {
							$("#marital").val('S');
						}

						if ($rootScope.formData.aadharData.APP_GEN == 'F' && $rootScope.formData.aadharData.APP_MAR_STATUS == 'M') {
							$scope.fsType = true;
						}

						setTimeout(function () {
							$(".select").select2();
							$('.customcheckradio').iCheck({
								checkboxClass: 'icheckbox_minimal',
								radioClass: 'iradio_minimal'
							});
						}, 10);

					} else if (sessionStorage.getItem('IsKRA') == 'true') {
						$rootScope.formData.kraData = JSON.parse(sessionStorage.getItem('KRAClientInfo'));
						$rootScope.formData.CKYCData = JSON.parse(sessionStorage.getItem('CKYCResponseData'));
						$rootScope.formData.KRA = true;
						if ($rootScope.formData.kraData) {
							if ($rootScope.formData.kraData.APP_F_NAME) {
								var a = $rootScope.formData.kraData.APP_F_NAME.split(' ');
								$rootScope.formData.fields.fsFirstName = a[0];
								if (a[1]) {
									$rootScope.formData.fields.fsLastName = a[1];
								}
								if (a[2]) {
									$rootScope.formData.fields.fsMiddleName = a[1];
									$rootScope.formData.fields.fsLastName = a[2];
								}
							} else {
								if (!$rootScope.formData.fields.fsFirstName) {
									$rootScope.formData.fields.fsFirstName = $rootScope.formData.CKYCData.CKYCFatherFirstName;
								}
								if (!$rootScope.formData.fields.fsMiddleName) {
									$rootScope.formData.fields.fsMiddleName = $rootScope.formData.CKYCData.CKYCFatherMiddleName;
								}
								if (!$rootScope.formData.fields.fsLastName) {
									$rootScope.formData.fields.fsLastName = $rootScope.formData.CKYCData.CKYCFatherLastName;
								}
							}
							if ($rootScope.formData.CKYCData) {
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
							if ($rootScope.formData.CKYCData) {
								$rootScope.formData.fields.fsFirstName = $rootScope.formData.CKYCData.CKYCFatherFirstName;
								$rootScope.formData.fields.fsMiddleName = $rootScope.formData.CKYCData.CKYCFatherMiddleName;
								$rootScope.formData.fields.fsLastName = $rootScope.formData.CKYCData.CKYCFatherLastName;
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
									$('.customcheckradio').iCheck({
										checkboxClass: 'icheckbox_minimal',
										radioClass: 'iradio_minimal'
									});
								}, 10);
								/*if ($rootScope.formData.CKYCData.APP_GEN == 'F' && $rootScope.formData.CKYCData.APP_MAR_STATUS == 'M') {
								$scope.fsType = true;
								}*/
							}
						}
					}

				}
				setTimeout(function () {
					$scope.checkradioinit();
				}, 100);
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
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						$scope.getLGandLC();
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
						$rootScope.EncryptToken = response.EncryptToken;
						sessionStorage.setItem('AxToken', response.EncryptToken);
						$rootScope.overallStatus()
						if (response.IsSuccess && response.ObjCDIYClientOtherInfo.FatherNameFirstName) {
							//$rootScope.formData.fields.citizen = response.ObjCDIYClientOtherInfo.Nationality;
							$scope.onloadValidate = false;
							$scope.rmonloadValidate = false;
							if(response.ObjCDIYClientOtherInfo.Mobile){
								$rootScope.formData.fields.mobile = response.ObjCDIYClientOtherInfo.Mobile;
								sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile)
							}
							if ($rootScope.documentEmailVerified) {
								// $scope.changeEmailAddress = false;
								$scope.rmemailotpSuccess = false;
								$scope.rmemailnewOTP = false
									$scope.rmpageload = false;
								$scope.rmonloadValidate = true;
								$scope.onloadValidate = true;

							} else {
								// $scope.changeEmailAddress = false;
							}
							if ($rootScope.documentMobileVerified) {
								// $scope.changeEmailAddress = true;
								$scope.rmemailotpSuccess = false;
								$scope.rmemailnewOTP = false
									$scope.rmpageload = false;
								$scope.rmonloadValidate = true;
								$scope.onloadValidate = true;
							} else {
								// $scope.changeEmailAddress = true;
							}
							if (response.ObjCDIYClientOtherInfo.Gender == "M") {
								$('#gender').val('M');
							} else if (response.ObjCDIYClientOtherInfo.Gender == "F") {
								$('#gender').val('F');
							} else if (response.ObjCDIYClientOtherInfo.Gender == "T") {
								$('#gender').val('T');
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
								$rootScope.formData.fields.fsMiddleName = response.ObjCDIYClientOtherInfo.FatherNameMiddleName;
								$rootScope.formData.fields.fsLastName = response.ObjCDIYClientOtherInfo.FatherNameLastName.trim();
							}
							if (response.ObjCDIYClientOtherInfo.MotherNameFirstName) {
								$('#moTitle').val(response.ObjCDIYClientOtherInfo.MotherNamePrefixID);
								$rootScope.formData.fields.moFirstName = response.ObjCDIYClientOtherInfo.MotherNameFirstName;
								$rootScope.formData.fields.moMiddleName = response.ObjCDIYClientOtherInfo.MotherNameMiddleName;
								$rootScope.formData.fields.moLastName = response.ObjCDIYClientOtherInfo.MotherNameLastName.trim();
							}
							if (response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto) {
								$rootScope.formData.fields.emailPan = response.ObjCDIYClientOtherInfo.ProvidedEmailIdbelongingto;
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

							if (response.ObjCDIYClientOtherInfo.TaxJurisdiction == "Y") {
								$("#tpctry1").prop('checked', false);
								$rootScope.formData.fields.taxOther = 'Y';

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
								$rootScope.formData.fields.taxOther = 'N';
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

							if (response.ObjCDIYClientOtherInfo.ExpilicitFlag == "Y") {
								$('#cb119').iCheck('check');
							} else {
								$('#cb119').iCheck('uncheck');
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
							$scope.setsessionStorageData();

						}

					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
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
						if (response.IpvPOAandNomineeList[0]) {
							sessionStorage.setItem('NomineeOne', true)
							$scope.AddNominee1 = true;
							$scope.hideNominee1 = false;
							$("#nYes").prop('checked', true);
							$("#nNo").prop('checked', false);
							$scope.disableNomineeChkBox = true;
							// if(!$scope.hideNominee1 && (!$scope.hideNominee2 || !$scope.hideNominee3)){
							// 	$scope.disableNomineeChkBox = true;
							// }else{
							// 	$scope.disableNomineeChkBox = false;
							// }
							var dob = (response.IpvPOAandNomineeList[0].NomineeDOB);
							$rootScope.formData.fields.nfirstName1 = response.IpvPOAandNomineeList[0].FirstName;
							$rootScope.formData.fields.nmiddleName1 = response.IpvPOAandNomineeList[0].MiddleName;
							$rootScope.formData.fields.nlastName1 = response.IpvPOAandNomineeList[0].LastName;
							$rootScope.formData.fields.nomineeRelation1 = response.IpvPOAandNomineeList[0].RelationshipWithNominee;
							$rootScope.formData.fields.idProofNumber1 = response.IpvPOAandNomineeList[0].NomineeIDProofNumber;
							$rootScope.formData.fields.NomineeRatio1 = response.IpvPOAandNomineeList[0].NomineeRatio;
							$rootScope.formData.fields.n1mobile1 = response.IpvPOAandNomineeList[0].Mobile;
							$rootScope.formData.fields.n1email1 = response.IpvPOAandNomineeList[0].Email;

							$rootScope.formData.fields.NomineeInfoId1 = response.IpvPOAandNomineeList[0].NomineeInfoId;
							$('#txtNDOB1').val(dob);
							$('#idProof1').val(response.IpvPOAandNomineeList[0].NomineeProofId);

							setTimeout(function () {
								$("#nTitle").val(response.IpvPOAandNomineeList[0].Title);
								$(".select").select2();
							}, 1000)
							if ($rootScope.formData.fields.NomineeRatio1 == "100") {
								$scope.AddNominee3Show = true
							}
							// if (response.IpvPOAandNomineeList[0].IsGuardianSamePermenantAddress == "0") {
							if (response.IpvPOAandNomineeList[0].IsSamePermenantAddress == "0") {
								$('#nsameAddress1').prop('checked', false);
								$scope.addressPrimary1 = false;
								// $rootScope.formData.fields.nAddress1 = response.IpvPOAandNomineeList[0].AddressLine1 + " " + response.IpvPOAandNomineeList[0].AddressLine2 + " " + response.IpvPOAandNomineeList[0].AddressLine3;
								$rootScope.formData.fields.nAddress1 = response.IpvPOAandNomineeList[0].AddressLine1;
								$rootScope.formData.fields.nAddress1line2 = response.IpvPOAandNomineeList[0].AddressLine2
									$rootScope.formData.fields.nAddress1line3 = response.IpvPOAandNomineeList[0].AddressLine3
									setTimeout(function () {
										$('#nPin1_value').val(response.IpvPOAandNomineeList[0].PinCode);
										$('#city3_value').val(response.IpvPOAandNomineeList[0].City);
									}, 1000)
									/****for IE fix ***/
									$('#city3_value').focus();
								$('#nPin_value').focus();
								$rootScope.formData.fields.nStateName1 = response.IpvPOAandNomineeList[0].State;
								$rootScope.formData.fields.nDistrict1 = response.IpvPOAandNomineeList[0].District;
								$rootScope.formData.ndValid = true;
							}

							if (response.IpvPOAandNomineeList[0].IsGuardian == "1") {
								$scope.guardian1 = true;
								sessionStorage.setItem('GuardianOne', true)
								var gdob = (response.IpvPOAandNomineeList[0].GuardianDateofBirth);
								$rootScope.formData.fields.gName1 = response.IpvPOAandNomineeList[0].NomineeGuardianName;
								$rootScope.formData.fields.gfirstName1 = response.IpvPOAandNomineeList[0].GuardianFirstName;
								$rootScope.formData.fields.gmiddleName1 = response.IpvPOAandNomineeList[0].GuardianMiddleName;
								$rootScope.formData.fields.glastName1 = response.IpvPOAandNomineeList[0].GuardianLastName;
								$rootScope.formData.fields.gRelation1 = response.IpvPOAandNomineeList[0].GuardianRelationship;
								$rootScope.formData.fields.gIdProofNumber1 = response.IpvPOAandNomineeList[0].GuardianIDProofNumber;
								$('#gDOB1').val(gdob);
								$('#gIdProof1').val(response.IpvPOAandNomineeList[0].GuardianProofId);
								$rootScope.formData.fields.g1mobile1 = response.IpvPOAandNomineeList[0].GuardianMobile;
								$rootScope.formData.fields.g1email1 = response.IpvPOAandNomineeList[0].GuardianEmail;
								if (response.IpvPOAandNomineeList[0].IsSameNomineeANDGuardianAddess == "0") {
									$("#guardianAddress1").prop('checked', false);
									$scope.addressGuardian1 = false;
									// $rootScope.formData.fields.gAddress1 = response.IpvPOAandNomineeList[0].GuardianAddressLine1 + " " + response.IpvPOAandNomineeList[0].GuardianAddressLine2 + " " + response.IpvPOAandNomineeList[0].GuardianAddressLine3;
									$rootScope.formData.fields.gAddress1 = response.IpvPOAandNomineeList[0].GuardianAddressLine1
										$rootScope.formData.fields.gAddress1line2 = response.IpvPOAandNomineeList[0].GuardianAddressLine2
										$rootScope.formData.fields.gAddress1line3 = response.IpvPOAandNomineeList[0].GuardianAddressLine3
										setTimeout(function () {
											$('#gPin1_value').val(response.IpvPOAandNomineeList[0].GuardianPinCode);
											$('#city4_value').val(response.IpvPOAandNomineeList[0].GuardianCity);
										}, 1000)
										/****for IE fix ***/
										$('#city4_value').focus();
									$('#gPin1_value').focus();
									$rootScope.formData.fields.gDistrict1 = response.IpvPOAandNomineeList[0].GuardianDistrict;
									$rootScope.formData.fields.gStateName1 = response.IpvPOAandNomineeList[0].GuardianState;
									$rootScope.formData.gdValid = true;
								}
							}
						}
						if (response.IpvPOAandNomineeList[1]) {
							$scope.AddNominee2 = true;
							$scope.hideNominee2 = false;
							$("#nYes").prop('checked', true);
							$("#nNo").prop('checked', false);
							sessionStorage.setItem('NomineeTwo', true)
							var dob2 = (response.IpvPOAandNomineeList[1].NomineeDOB);
							$rootScope.formData.fields.nfirstName2 = response.IpvPOAandNomineeList[1].FirstName;
							$rootScope.formData.fields.nmiddleName2 = response.IpvPOAandNomineeList[1].MiddleName;
							$rootScope.formData.fields.nlastName2 = response.IpvPOAandNomineeList[1].LastName;
							$rootScope.formData.fields.nomineeRelation2 = response.IpvPOAandNomineeList[1].RelationshipWithNominee;
							$rootScope.formData.fields.idProofNumber2 = response.IpvPOAandNomineeList[1].NomineeIDProofNumber;
							$rootScope.formData.fields.NomineeRatio2 = response.IpvPOAandNomineeList[1].NomineeRatio;
							$rootScope.formData.fields.n2mobile2 = response.IpvPOAandNomineeList[1].Mobile;
							$rootScope.formData.fields.n2email2 = response.IpvPOAandNomineeList[1].Email;

							$rootScope.formData.fields.NomineeInfoId2 = response.IpvPOAandNomineeList[1].NomineeInfoId;

							$('#txtNDOB2').val(dob2);
							$('#idProof2').val(response.IpvPOAandNomineeList[1].NomineeProofId);

							// if (response.IpvPOAandNomineeList[1].IsGuardianSamePermenantAddress == "0") {
							if (response.IpvPOAandNomineeList[1].IsSamePermenantAddress == "0") {
								$('#nsameAddress2').prop('checked', false);
								$scope.addressPrimary2 = false;
								// $rootScope.formData.fields.nAddress2 = response.IpvPOAandNomineeList[1].AddressLine1 + " " + response.IpvPOAandNomineeList[1].AddressLine2 + " " + response.IpvPOAandNomineeList[1].AddressLine3;
								$rootScope.formData.fields.nAddress2 = response.IpvPOAandNomineeList[1].AddressLine1
									$rootScope.formData.fields.nAddress2line2 = response.IpvPOAandNomineeList[1].AddressLine2
									$rootScope.formData.fields.nAddress2line3 = response.IpvPOAandNomineeList[1].AddressLine3
									setTimeout(function () {
										$('#nPin2_value').val(response.IpvPOAandNomineeList[1].PinCode);
										$('#city5_value').val(response.IpvPOAandNomineeList[1].City);
									}, 1000)
									/****for IE fix ***/
									$('#city5_value').focus();
								$('#nPin2_value').focus();
								$rootScope.formData.fields.nStateName2 = response.IpvPOAandNomineeList[1].State;
								$rootScope.formData.fields.nDistrict2 = response.IpvPOAandNomineeList[1].District;
								$rootScope.formData.ndValid = true;
							}

							if (response.IpvPOAandNomineeList[1].IsGuardian == "1") {
								$scope.guardian2 = true;
								sessionStorage.setItem('GuardianTwo', true)
								var gdob2 = (response.IpvPOAandNomineeList[1].GuardianDateofBirth);
								$rootScope.formData.fields.gName2 = response.IpvPOAandNomineeList[1].NomineeGuardianName;
								$rootScope.formData.fields.gfirstName2 = response.IpvPOAandNomineeList[1].GuardianFirstName;
								$rootScope.formData.fields.gmiddleName2 = response.IpvPOAandNomineeList[1].GuardianMiddleName;
								$rootScope.formData.fields.glastName2 = response.IpvPOAandNomineeList[1].GuardianLastName;
								$rootScope.formData.fields.gRelation2 = response.IpvPOAandNomineeList[1].GuardianRelationship;
								$rootScope.formData.fields.gIdProofNumber2 = response.IpvPOAandNomineeList[1].GuardianIDProofNumber;
								$('#gDOB2').val(gdob2);
								$('#gIdProof2').val(response.IpvPOAandNomineeList[1].GuardianProofId);
								$rootScope.formData.fields.g2mobile2 = response.IpvPOAandNomineeList[1].GuardianMobile;
								$rootScope.formData.fields.g2email2 = response.IpvPOAandNomineeList[1].GuardianEmail;
								if (response.IpvPOAandNomineeList[1].IsSameNomineeANDGuardianAddess == "0") {
									$("#guardianAddress2").prop('checked', false);
									$scope.addressGuardian2 = false;
									// $rootScope.formData.fields.gAddress2 = response.IpvPOAandNomineeList[1].GuardianAddressLine1 + " " + response.IpvPOAandNomineeList[1].GuardianAddressLine2 + " " + response.IpvPOAandNomineeList[1].GuardianAddressLine3;
									$rootScope.formData.fields.gAddress2 = response.IpvPOAandNomineeList[1].GuardianAddressLine1
										$rootScope.formData.fields.gAddress2line2 = response.IpvPOAandNomineeList[1].GuardianAddressLine2
										$rootScope.formData.fields.gAddress2line3 = response.IpvPOAandNomineeList[1].GuardianAddressLine3
										setTimeout(function () {
											$('#gPin2_value').val(response.IpvPOAandNomineeList[1].GuardianPinCode);
											$('#city6_value').val(response.IpvPOAandNomineeList[1].GuardianCity);
										}, 1000)
										/****for IE fix ***/
										$('#city6_value').focus();
									$('#gPin2_value').focus();
									$rootScope.formData.fields.gDistrict2 = response.IpvPOAandNomineeList[1].GuardianDistrict;
									$rootScope.formData.fields.gStateName2 = response.IpvPOAandNomineeList[1].GuardianState;
									$rootScope.formData.gdValid = true;
								}
							}
						}
						if (response.IpvPOAandNomineeList[2]) {
							$scope.AddNominee3 = true;
							$scope.hideNominee3 = false;
							sessionStorage.setItem('NomineeThree', true)
							$("#nYes").prop('checked', true);
							$("#nNo").prop('checked', false);
							var dob3 = (response.IpvPOAandNomineeList[2].NomineeDOB);
							$rootScope.formData.fields.nfirstName3 = response.IpvPOAandNomineeList[2].FirstName;
							$rootScope.formData.fields.nmiddleName3 = response.IpvPOAandNomineeList[2].MiddleName;
							$rootScope.formData.fields.nlastName3 = response.IpvPOAandNomineeList[2].LastName;
							$rootScope.formData.fields.nomineeRelation3 = response.IpvPOAandNomineeList[2].RelationshipWithNominee;
							$rootScope.formData.fields.idProofNumber3 = response.IpvPOAandNomineeList[2].NomineeIDProofNumber;
							$rootScope.formData.fields.NomineeRatio3 = response.IpvPOAandNomineeList[2].NomineeRatio;
							$rootScope.formData.fields.n3mobile3 = response.IpvPOAandNomineeList[2].Mobile;
							$rootScope.formData.fields.n3email3 = response.IpvPOAandNomineeList[2].Email;
							$rootScope.formData.fields.NomineeInfoId3 = response.IpvPOAandNomineeList[2].NomineeInfoId;

							$('#txtNDOB3').val(dob3);
							$('#idProof3').val(response.IpvPOAandNomineeList[2].NomineeProofId);

							// if (response.IpvPOAandNomineeList[2].IsGuardianSamePermenantAddress == "1") {
							if (response.IpvPOAandNomineeList[2].IsSamePermenantAddress == "0") {
								$('#nsameAddress3').prop('checked', false);
								$scope.addressPrimary3 = false;
								// $rootScope.formData.fields.nAddress3 = response.IpvPOAandNomineeList[2].AddressLine1 + " " + response.IpvPOAandNomineeList[2].AddressLine2 + " " + response.IpvPOAandNomineeList[2].AddressLine3;
								$rootScope.formData.fields.nAddress3 = response.IpvPOAandNomineeList[2].AddressLine1
									$rootScope.formData.fields.nAddress3line2 = response.IpvPOAandNomineeList[2].AddressLine2
									$rootScope.formData.fields.nAddress3line3 = response.IpvPOAandNomineeList[2].AddressLine3
									setTimeout(function () {
										$('#nPin3_value').val(response.IpvPOAandNomineeList[2].PinCode);
										$('#city7_value').val(response.IpvPOAandNomineeList[2].City);
									}, 1000)
									/****for IE fix ***/
									$('#city7_value').focus();
								$('#nPin3_value').focus();
								$rootScope.formData.fields.nStateName3 = response.IpvPOAandNomineeList[2].State;
								$rootScope.formData.fields.nDistrict3 = response.IpvPOAandNomineeList[2].District;
								$rootScope.formData.ndValid = true;
							}

							if (response.IpvPOAandNomineeList[2].IsGuardian == "1") {
								$scope.guardian3 = true;
								sessionStorage.setItem('GuardianThree', true)
								var gdob3 = (response.IpvPOAandNomineeList[2].GuardianDateofBirth);
								$rootScope.formData.fields.gName3 = response.IpvPOAandNomineeList[2].NomineeGuardianName;
								$rootScope.formData.fields.gfirstName3 = response.IpvPOAandNomineeList[2].GuardianFirstName;
								$rootScope.formData.fields.gmiddleName3 = response.IpvPOAandNomineeList[2].GuardianMiddleName;
								$rootScope.formData.fields.glastName3 = response.IpvPOAandNomineeList[2].GuardianLastName;
								$rootScope.formData.fields.gRelation3 = response.IpvPOAandNomineeList[2].GuardianRelationship;
								$rootScope.formData.fields.gIdProofNumber3 = response.IpvPOAandNomineeList[2].GuardianIDProofNumber;
								$('#gDOB3').val(gdob3);
								$('#gRelation3').val(response.IpvPOAandNomineeList[2].GuardianRelationship)
								$('#gIdProof3').val(response.IpvPOAandNomineeList[2].GuardianProofId);
								$rootScope.formData.fields.g3mobile3 = response.IpvPOAandNomineeList[2].GuardianMobile;
								$rootScope.formData.fields.g3email3 = response.IpvPOAandNomineeList[2].GuardianEmail;
								if (response.IpvPOAandNomineeList[2].IsSameNomineeANDGuardianAddess == "0") {
									$("#guardianAddress3").prop('checked', false);
									$scope.addressGuardian3 = false;
									// $rootScope.formData.fields.gAddress3 = response.IpvPOAandNomineeList[2].GuardianAddressLine1 + " " + response.IpvPOAandNomineeList[2].GuardianAddressLine2 + " " + response.IpvPOAandNomineeList[2].GuardianAddressLine3;
									$rootScope.formData.fields.gAddress3 = response.IpvPOAandNomineeList[2].GuardianAddressLine1
										$rootScope.formData.fields.gAddress3line2 = response.IpvPOAandNomineeList[2].GuardianAddressLine2
										$rootScope.formData.fields.gAddress3line3 = response.IpvPOAandNomineeList[2].GuardianAddressLine3
										setTimeout(function () {
											$('#gPin3_value').val(response.IpvPOAandNomineeList[2].GuardianPinCode);
											$('#city8_value').val(response.IpvPOAandNomineeList[2].GuardianCity);
										}, 1000)
										/****for IE fix ***/
										$('#city8_value').focus();
									$('#gPin3_value').focus();
									$rootScope.formData.fields.gDistrict3 = response.IpvPOAandNomineeList[2].GuardianDistrict;
									$rootScope.formData.fields.gStateName3 = response.IpvPOAandNomineeList[2].GuardianState;
									$rootScope.formData.gdValid = true;
								}
							}
						}
						setTimeout(function () {
								$scope.checkradioinit();
						}, 100)
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
							$("#nYes").prop('checked', false);
							$("#nNo").prop('checked', true);
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
					$('#connection').modal('show');
				});

			}
			setTimeout(function () {
				$scope.getNomineeDetails();
			}, 700);

			$scope.addNominee2 = function () {
				$scope.hideNominee2 = false;
				$scope.AddNominee2 = true;
				$rootScope.formData.fields.NomineeRatio1 = 50;
				$rootScope.formData.fields.NomineeRatio2 = 50;
				$scope.AddNominee3Show = true
					$('#nomineeDetails2 .select2-selection__rendered').html('')
					$rootScope.formData.fields.nfirstName2 = "";
				$rootScope.formData.fields.nlastName2 = "";
				$rootScope.formData.fields.nmiddleName2 = "";
				$rootScope.formData.fields.idProof2 = "";
				$rootScope.formData.fields.nomineeRelation2 = "";
				$rootScope.formData.fields.gfirstName2 = "";
				$rootScope.formData.fields.gmiddleName2 = "";
				$rootScope.formData.fields.glastName2 = "";
				$rootScope.formData.fields.gIdProof2 = "";
				$rootScope.formData.fields.gIdProofNumber2 = "";
				$rootScope.formData.fields.gDOB2 = "";
				$rootScope.formData.fields.gRelation2 = "";
				$rootScope.formData.fields.n2mobile2 = "";
				$rootScope.formData.fields.n2email2 = "";
				$rootScope.formData.fields.g2mobile2 = "";
				$rootScope.formData.fields.g2email2 = "";
				$rootScope.formData.fields.NomineeInfoId2 = ''
					$('#idProof3').val(null)
					$('#nomineeDetails3 .select2-selection__rendered').html('')
					setTimeout(function () {
						$('#nsameAddress2').prop('checked', true);
						$('#gsameAddress2').prop('checked', true);
					}, 500)
					$scope.addressPrimary2 = true
					$scope.addressGuardian2 = true
					// if(!$scope.hideNominee1 && (!$scope.hideNominee2 || !$scope.hideNominee3)){
					// 	$scope.disableNomineeChkBox = true;
					// }else{
					// 	$scope.disableNomineeChkBox = false;
					// }
			}
			$scope.addNominee3 = function () {
				$scope.hideNominee3 = false;
				$scope.AddNominee3 = true;
				$rootScope.formData.fields.NomineeRatio1 = 34;
				$rootScope.formData.fields.NomineeRatio2 = 33;
				$rootScope.formData.fields.NomineeRatio3 = 33;
				$rootScope.formData.fields.nfirstName3 = "";
				$rootScope.formData.fields.nlastName3 = "";
				$rootScope.formData.fields.nmiddleName3 = "";
				$rootScope.formData.fields.idProof3 = "";
				$rootScope.formData.fields.nomineeRelation3 = "";
				$scope.addressPrimary3 = true
					$scope.addressGuardian3 = true
					$('#idProof3').val(null)
					$('#nomineeDetails3 .select2-selection__rendered').html('')
					$('#txtNDOB3').val('')
					$('#nrelation3').val("")
					$('#gIdProof3').val("")
					$('#gDOB3').val('')
					$('#gRelation3').val("")
					$rootScope.formData.fields.idProofNumber3 = "";
				$rootScope.formData.fields.NDOB3 = "";
				$rootScope.formData.fields.nomineeRelation3 = "";
				$rootScope.formData.fields.gfirstName3 = "";
				$rootScope.formData.fields.gmiddleName3 = "";
				$rootScope.formData.fields.glastName3 = "";
				$rootScope.formData.fields.gIdProof3 = "";
				$rootScope.formData.fields.gIdProofNumber3 = "";
				$rootScope.formData.fields.gDOB3 = "";
				$rootScope.formData.fields.gRelation3 = "";
				$rootScope.formData.fields.n3mobile3 = "";
				$rootScope.formData.fields.n3email3 = "";
				$rootScope.formData.fields.g3mobile3 = "";
				$rootScope.formData.fields.g3email3 = "";
				$rootScope.formData.fields.NomineeInfoId3 = ''
					setTimeout(function () {
						$('#nsameAddress3').prop('checked', true);
						$('#gsameAddress3').prop('checked', true);
					}, 500)
					// if(!$scope.hideNominee1 && (!$scope.hideNominee2 || !$scope.hideNominee3)){
					// 	$scope.disableNomineeChkBox = true;
					// }else{
					// 	$scope.disableNomineeChkBox = false;
					// }
			}

			$scope.deleteNominee = function (nInfoId) {
				if ($scope.hideNominee1 && $scope.hideNominee2 && $scope.hideNominee3) {

					$("#nYes").prop('checked', false);
					$("#nNo").prop('checked', true);
					setTimeout(function () {
						$scope.checkradioinit();
					}, 20);

				}

				var url = "NomineeRemove";
				var nomineeInfoId = nInfoId
					var sendData = {
					'NomineeInfoId': nomineeInfoId,
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
					if ($scope.hideNominee1 && $scope.hideNominee2 && $scope.hideNominee3) {
						$("#nYes").prop('checked', false);
						$scope.disableNomineeChkBox = false;
						setTimeout(function () {
							$scope.checkradioinit();
						}, 20);
					} else {
						$("#nYes").prop('checked', true);
						$scope.disableNomineeChkBox = true;
					}
				}, function (e) {
					$rootScope.formData.apiLoading = false;
					$('#connection').modal('show');
				});
			}

			$scope.cancelDelete = function () {
				$("#nYes").prop('checked', true);
				setTimeout(function () {
					$scope.checkradioinit();
				}, 20);
			}

			$scope.noNominee = function () {
				$('#NomineDeletePopUp').modal('hide');
				$('#Nomine1DeletePopUp').modal('hide');
				$('#Nomine2DeletePopUp').modal('hide');
				$('#Nomine3DeletePopUp').modal('hide');

				$("#nYes").prop('checked', false);
				$("#nNo").prop('checked', true);
				setTimeout(function () {
					$scope.checkradioinit();
				}, 20);

				$scope.deleteNominee1();
				$scope.deleteNominee2();
				$scope.deleteNominee3();
			}

			$scope.deleteNominee1 = function () {
				$('#Nomine1DeletePopUp').modal('hide')
				$scope.hideNominee1 = true;
				$scope.AddNominee1 = false;
				$rootScope.formData.fields.NomineeRatio1 = 0;
				$rootScope.formData.fields.nfirstName1 = "";
				$rootScope.formData.fields.nmiddleName1 = "";
				$rootScope.formData.fields.nlastName1 = "";
				$rootScope.formData.fields.idProof1 = "";
				$rootScope.formData.fields.idProofNumber1 = "";
				$rootScope.formData.fields.NDOB1 = "";
				$rootScope.formData.fields.nomineeRelation1 = "";
				$rootScope.formData.fields.gfirstName1 = "";
				$rootScope.formData.fields.gmiddleName1 = "";
				$rootScope.formData.fields.glastName1 = "";
				$rootScope.formData.fields.gIdProof1 = "";
				$rootScope.formData.fields.gIdProofNumber1 = "";
				$rootScope.formData.fields.gDOB1 = "";
				$rootScope.formData.fields.gRelation1 = "";
				$rootScope.formData.fields.n1mobile1 = "";
				$rootScope.formData.fields.n1email1 = "";
				$rootScope.formData.fields.g1mobile1 = "";
				$rootScope.formData.fields.g1email1 = "";
				$scope.nominne1NameChange = true;
				sessionStorage.removeItem('NomineeOne');
				sessionStorage.removeItem('GuardianOne');
				$scope.deleteNominee($rootScope.formData.fields.NomineeInfoId1);
			}
			$scope.deleteNominee2 = function () {
				$('#Nomine2DeletePopUp').modal('hide')
				$scope.hideNominee2 = true;
				$scope.AddNominee2 = false;
				$scope.nominne2NameChange = true
					sessionStorage.removeItem('NomineeTwo')
					sessionStorage.removeItem('GuardianTwo')
					$rootScope.formData.fields.NomineeRatio2 = 0;
				$rootScope.formData.fields.nfirstName2 = "";
				$rootScope.formData.fields.nmiddleName2 = "";
				$rootScope.formData.fields.nlastName2 = "";
				$rootScope.formData.fields.idProof2 = "";
				$rootScope.formData.fields.idProofNumber2 = "";
				$rootScope.formData.fields.NDOB2 = "";
				$rootScope.formData.fields.nomineeRelation2 = "";
				$rootScope.formData.fields.gfirstName2 = "";
				$rootScope.formData.fields.gmiddleName2 = "";
				$rootScope.formData.fields.glastName2 = "";
				$rootScope.formData.fields.gIdProof2 = "";
				$rootScope.formData.fields.gIdProofNumber2 = "";
				$rootScope.formData.fields.gDOB2 = "";
				$rootScope.formData.fields.gRelation2 = "";
				$rootScope.formData.fields.n2mobile2 = "";
				$rootScope.formData.fields.n2email2 = "";
				$rootScope.formData.fields.g2mobile2 = "";
				$rootScope.formData.fields.g2email2 = "";
				$('#idProof2').val("")
				$('#txtNDOB2').val('')
				$('#nrelation2').val("")
				$('#gIdProof2').val("")
				$('#gDOB2').val('')
				$('#gRelation2').val("")
				$rootScope.formData.fields.nAddress2 = "",
				$rootScope.formData.fields.nAddress2line2 = ""
					$rootScope.formData.fields.nAddress2line3 = ""
					$rootScope.formData.fields.nStateName2 = "",
				$('#nPin2_value').val('')
				$rootScope.formData.fields.nDistrict2 = ""
					$('#city5_value').val('')
					$rootScope.formData.fields.gAddress2 = "",
				$rootScope.formData.fields.gAddress2line2 = ""
					$rootScope.formData.fields.gAddress2line3 = ""
					$rootScope.formData.fields.gStateName2 = "",
				$('#gPin2_value').val('')
				$rootScope.formData.fields.gDistrict2 = ""
					$('#city6_value').val('')
					$('#nomineeDetails2 .select2-selection__rendered').html('')
					if ($scope.AddNominee2 && $scope.AddNominee3 && $scope.AddNominee1) {
						$("#nYes").prop('checked', true);
					} else {
						$("#nYes").prop('checked', false);
					}
					$('#nsameAddress2').prop('checked', true);
				$('#gsameAddress2').prop('checked', true);

				$scope.deleteNominee($rootScope.formData.fields.NomineeInfoId2);
			}

			$scope.deleteNominee3 = function () {
				$('#Nomine3DeletePopUp').modal('hide')
				$scope.hideNominee3 = true;
				$scope.AddNominee3 = false;
				sessionStorage.removeItem('NomineeThree')
				sessionStorage.removeItem('GuardianThree')
				$rootScope.formData.fields.NomineeRatio3 = 0;
				$rootScope.formData.fields.nfirstName3 = "";
				$rootScope.formData.fields.nmiddleName3 = "";
				$rootScope.formData.fields.nlastName3 = "";
				$rootScope.formData.fields.idProof3 = "";
				$rootScope.formData.fields.idProofNumber3 = "";
				$rootScope.formData.fields.NDOB3 = "";
				$rootScope.formData.fields.nomineeRelation3 = "";
				$rootScope.formData.fields.gfirstName3 = "";
				$rootScope.formData.fields.gmiddleName3 = "";
				$rootScope.formData.fields.glastName3 = "";
				$rootScope.formData.fields.gIdProof3 = "";
				$rootScope.formData.fields.gIdProofNumber3 = "";
				$rootScope.formData.fields.gDOB3 = "";
				$rootScope.formData.fields.gRelation3 = "";
				$rootScope.formData.fields.n3mobile3 = "";
				$rootScope.formData.fields.n3email3 = "";
				$rootScope.formData.fields.g3mobile3 = "";
				$rootScope.formData.fields.g3email3 = "";
				$rootScope.formData.fields.idProof3 = "";
				$rootScope.formData.fields.nomineeRelation3 = "";
				$rootScope.formData.fields.nAddress3 = "",
				$rootScope.formData.fields.nAddress3line2 = ""
					$rootScope.formData.fields.nAddress3line3 = ""
					$rootScope.formData.fields.nStateName3 = "",
				$('#nPin3_value').val('')
				$rootScope.formData.fields.nDistrict3 = ""
					$('#city7_value').val('')
					$rootScope.formData.fields.gAddress3 = "",
				$rootScope.formData.fields.gAddress3line2 = ""
					$rootScope.formData.fields.gAddress3line3 = ""
					$rootScope.formData.fields.gStateName3 = "",
				$('#gPin3_value').val('')
				$rootScope.formData.fields.gDistrict3 = ""
					$('#city8_value').val('')
					$('#idProof3').val(null)
					$('#nomineeDetails3 .select2-selection__rendered').html('')
					$('#nsameAddress3').prop('checked', true);
				$('#gsameAddress3').prop('checked', true);

				if ($scope.AddNominee2 && $scope.AddNominee3 && $scope.AddNominee1) {
					$("#nYes").prop('checked', true);
				} else {
					$("#nYes").prop('checked', false);
				}
				$scope.deleteNominee($rootScope.formData.fields.NomineeInfoId3);
			}

			$scope.changeMobile = function () {
				$scope.changeNumber = true;
				$scope.panMobileRegError = false;
				$scope.invalidRmMble = false
					$rootScope.formData.fields.otpNew = '';
				$scope.newOTP = false;
			}

			$scope.changeEmail = function () {
				$scope.changeEmailAddress = true;
				$scope.panEmailRegError = false;
				$rootScope.formData.fields.otpEmailNew = '';
				$scope.rmemailotpSuccess = false;
				$scope.rmnewEmailOTP = false;
				$rootScope.verifyemail = true;
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
				if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana) {
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
				} else if (($rootScope.formData.fields.mobileNewB === $rootScope.formData.fields.mobile) && !$rootScope.formData.RMModule && !$rootScope.webfinacle && !$rootScope.webJana) {
					$scope.sameNumber = true;
					$scope.invalidMobileNewB = false;
					$scope.invalidRmMble = false
						$scope.emptyMobileNewB = false;
				} else {
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
						'ClientName': $rootScope.formData.clientName
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
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
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
							$('#otp-resend').modal({
								backdrop: 'static',
								keyboard: true
							});
						}

					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
					});
				}
			}
			$scope.newEmailValidate = function (type) {
				$scope.invalidEmail = false;
				$scope.btnType = type;
				$scope.rmemailOTPVerifiedError = false;
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
					} else if ($rootScope.formData.fields.emailNew.toLowerCase() == $rootScope.formData.fields.email) {
						$scope.rmsameEmail = true;
						$scope.rminvalidEmail = false;
						$scope.rmemptyEmail = false
							return false;
					} else {
						var e = $rootScope.formData.fields.emailNew.split('@');
						var c = e[0];
						if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c.search('xyz') != -1 || c.search('abc') != -1) {
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
							$rootScope.formData.apiLoading = false;
							if (response.IsSuccess) {
								$rootScope.newEmailVerify = true;
								$rootScope.verifyemail = true;
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
						var c = e[0];
						if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c.search('xyz') != -1 || c.search('abc') != -1) {
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
				if($rootScope.formData.fields.emailNew){
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
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					"IsDiy": true,
					"EncryptToken": $rootScope.EncryptToken
				}

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
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

					if (response.IsSuccess) {
						$rootScope.formData.apiLoading = true;

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
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
								$rootScope.apiResponseErrorMsg = response.ErrorMessage;
							}
						});
					} else {
						$scope.otpSuccess = false;
						$scope.invalidOTP = true;
					}
				}, function (e) {
					$rootScope.formData.apiLoading = false;
					$('#connection').modal('show');
				});
			}

			$scope.validateEmailOTP = function () {
				$scope.rmemailotpSuccess = false;
				$scope.rminvalidEmailOTP = false;
				$scope.rmEmptyEmailOtp = false;
				var url = "UnAuthorizeOTPValidation";
				if (($rootScope.formData.fields.otpEmailNew == null || $rootScope.formData.fields.otpEmailNew == '') && !$rootScope.formData.fields.email) {
					$scope.rmEmptyEmailOtp = true;
					return false;
				} else {
					$scope.rmEmptyEmailOtp = false;
				}
				var emailId = '';
				if ($scope.btnType == 'changeEmail') {
					emailId = $rootScope.formData.fields.emailNew;
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
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					"IsDiy": true,
					"EncryptToken": $rootScope.EncryptToken
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
							$('#APIResponse').modal({
								backdrop: 'static',
								keyboard: false
							});
							$rootScope.apiResponseErrorMsg = "Session Timed Out";
							return false;
						}
					}
					if (response.IsSuccess) {
						$scope.verifyEmailDiv = false;
						$rootScope.verifyOTPSuccess = true;
						$rootScope.verifyemail = false;
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
						setTimeout(function () {
							$scope.rmemailotpSuccess = false;
						}, 7000)
						$scope.rminvalidEmailOTP = false;
						$scope.rmnewEmailOTP = false;
						$scope.rmpageload = false;
						$scope.rmemailOTPVerified = true;
						$scope.rmonloadValidate = false;
						$rootScope.formData.fields.email = emailId;
						sessionStorage.setItem('RMEmailOTPVerified', true);
					} else {
						$scope.rmemailotpSuccess = false;
						$scope.rminvalidEmailOTP = false;
						$scope.rmlimitEmailOTP = true;
						$scope.elimitError = response.ErrorMessage
					}

				}, function (e) {
					$rootScope.formData.apiLoading = false;
					$('#connection').modal('show');
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
				$scope.collapsePDetailsError = false;
				$scope.nomineeInfoError = false;
				$scope.financialInfoError = false;
				var error = 0;
				if ($('#rStatus').val() != 'indian') {
					$scope.nonIndian = true;
					error++;
					//$("html, body").animate({ scrollTop: 0 }, "slow");
				} else {
					$scope.nonIndian = false;
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
						if ($('#maidenTitle').val() && !($rootScope.formData.fields.maFirstName)) {
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

				if ($scope.changeEmailAddress && ($scope.emptyEmail || $scope.invalidEmail || $scope.sameEmail)) {
					error++;
					setTimeout(function () {
						$('#emailIDNew').focus();
					}, 100)

				}
				var zeroFilter = /[2-9][0-9]{10}/;
				var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
				var pan_cfilter = /[a-z]{3}[c][a-z]{1}\d{4}[a-z]/i;

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

				if (angular.isUndefined($rootScope.formData.fields.fsMiddleName)) {
					$rootScope.formData.fields.fsMiddleName = '';
				}
				if (angular.isUndefined($rootScope.formData.fields.moMiddleName)) {
					$rootScope.formData.fields.moMiddleName = '';
				}
				//**************Code for blocking excisting customers*********************/
				// if(sessionStorage.getItem('ExistingEmailMobile') == 'true'){
				//     if($scope.emailBelongsError || $scope.mobileBelongsError){
				//         $('#mself').focus();
				//         error++
				//     }else if($("input[name=emstatus]:checked").val() == 'S'){
				//         $('#mself').focus();
				//         error++
				//     }else if($("input[name=mmstatus]:checked").val() == 'S'){
				//         $('#mself').focus();
				//         error++
				//     }
				// }else{
				//     $scope.emailBelongsError = false;
				//     $scope.mobileBelongsError = false;
				// }
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
					$rootScope.formData.nomineeRelationList = [];

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
				$rootScope.formData.fields.rdnSetFunds = $("#rdnSetFunds").val();
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
				if ($rootScope.formData.fields.taxOther == "N") {
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

				const rdnContractNote = $('#rdnContractNote').iCheck('update')[0].checked;
				const InternetTrading = $('#InternetTrading').iCheck('update')[0].checked;
				const tpctry = $('#tpctry1').iCheck('update')[0].checked;

				if (!rdnContractNote) {
					error++;
					$rootScope.termsAndConditionsError = true;
				} else {
					$rootScope.termsAndConditionsError = false;
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
					var c = e[0];
					if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c.search('xyz') != -1 || c.search('abc') != -1) {
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

				if ($rootScope.formData.RMModule || $rootScope.webfinacle || $rootScope.webJana) {
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

					if ($rootScope.documentEmailVerified) {
						/*if (!$scope.rmemailOTPVerified) {
						$scope.rmemailOTPVerifiedError = true;
						$('#input-1email').focus();
						error++;
						}*/
					}

					if ($rootScope.webfinacle || $rootScope.webJana) {
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
				}
				$scope.rdnContractNote = $('#nYes').iCheck('update')[0].checked;
				// if($scope.rdnContractNote && ($scope.hideNominee1 || $scope.hideNominee2 || $scope.hideNominee3)){
				// 	error++;
				// 	$scope.nonomineeCheckError = true
				// }else{
				// 	$scope.nonomineeCheckError = false
				// }

				if (error == 0) {
					$rootScope.fatcaError = false;
					$rootScope.termsAndConditionsError = false;
					if (!$scope.hideNominee1 || !$scope.hideNominee2 || !$scope.hideNominee3) {
						$scope.nomineeValidate();
					} else {
						$scope.personalUpdate();
					}
				}
			};
			var abc = 0;
			$scope.personalUpdate = function () {
				var fsMname = '';
				var fsLname = '';
				var moMname = '';
				var moLname = '';
				var maMname = '';
				var maLname = '';
				if ($rootScope.formData.fields.fsMiddleName) {
					fsMname = " " + $rootScope.formData.fields.fsMiddleName
				}

				if ($rootScope.formData.fields.fsLastName) {
					fsLname = " " + $rootScope.formData.fields.fsLastName;
				}

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
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						Gender: $rootScope.formData.fields.gender,
						MaritialStatus: $rootScope.formData.fields.marital,
						Email: $rootScope.formData.fields.email,
						Mobile: $rootScope.formData.fields.mobile,
						FatherOrSpouseType: $rootScope.formData.fields.fsType,
						FatherHusName: $rootScope.formData.fields.fsFirstName + fsMname + fsLname,
						FatherNamePrefixID: $('#fsTitle').val(),
						FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
						FatherNameMiddleName: fsMname,
						FatherNameLastName: fsLname,
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
						EncryptToken: $rootScope.EncryptToken
					},
					IsDiy: true,
				};
				$rootScope.formData.apiLoading = true;
				$scope.rmotpSuccess = true;
				$scope.otpSuccess = true;

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
						$rootScope.thirdCompleted = true;
						if ($rootScope.verifyemail) {
							if ($rootScope.newEmailVerify) {
								var EmailType = $rootScope.formData.fields.emailNew
							} else {
								var EmailType = $rootScope.formData.fields.email
							}
							var url = "EmailVerificationUrl";
							sendData = {
								ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.existingRef,
								Email: EmailType
							};
							$rootScope.formData.apiLoading = true;
							serverService.apiCall(url, sendData).then(function (a) {
								var response = a.data;
								$rootScope.formData.apiLoading = false;
							});
						}
						$scope.dataPush();
						/* dataLayer.push({
						'event': 'DIY PeronalDetails',
						'Application No': $rootScope.formData.ReferenceNumber,
						});*/
						$rootScope.getAPI = false;
						//$(".select").select2("close");
						$state.go('bank', {
							mobile: $rootScope.formData.EncMobile
						});

					} else {
						if (abc == 0) {
							$scope.personalUpdate();
							abc++;
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
								$('#connection').modal('show');
							}
						}
					}

				}, function (e) {
					$rootScope.formData.apiLoading = false;
					$('#connection').modal('show');
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
						'FatherOrSpouseName': $rootScope.formData.fields.fsFirstName + $rootScope.formData.fields.fsMiddleName + $rootScope.formData.fields.fsLastName,
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

			if ($rootScope.formData.RMModule) {

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
				}
				if (!$rootScope.formData.fields.mobile) {
					$rootScope.formData.fields.mobile = $scope.finData.basicInfo[0].Mobile;
				}
				var motherName = $scope.finData.basicInfo[0].MotherMaidenName.split(" ")
					if (!$rootScope.formData.fields.moFirstName) {
						$rootScope.formData.fields.moFirstName = motherName[0]
					}
					if (!$rootScope.formData.fields.moLastName) {
						$rootScope.formData.fields.moLastName = motherName[1]
					}
					$scope.rStatusdisabled = true
					$('.IBBankDisabled').addClass('adisabled')
					
					if (!$rootScope.formData.fields.marital) {
						if ($scope.finData.basicInfo[0].MaritalStatus == "Y") {
							$rootScope.formData.fields.marital = "M"
								setTimeout(function () {
									$('#marital').val('M')
								}, 500)
						} else if ($scope.finData.basicInfo[0].MaritalStatus == "N") {
							$rootScope.formData.fields.marital = "S"
								setTimeout(function () {
									$('#marital').val('S')
								}, 500)
						} else {
							$rootScope.formData.fields.marital = "O"
								setTimeout(function () {
									$('#marital').val('O')
								}, 500)
						}
					}
					if (!$rootScope.formData.fields.education) {
						if ($scope.finData.basicInfo[0].education) {
							$rootScope.formData.fields.education = $scope.finData.basicInfo[0].education;
							setTimeout(function () {
								$('#education').val($rootScope.formData.fields.education)
							}, 500)
						}
					}

			}
			if (sessionStorage.getItem('finacle')) {
				$('#rStatus').prop('disabled', true)
			}
			setTimeout(function () {
				if (sessionStorage.getItem('finacle') && sessionStorage.getItem('finData')) {
					$scope.getFinData();
				}
			}, 1000)

			$scope.aadhearValid = function (val) {
				if (val == "2008") {
					$scope.AddhearValidationError = true
				} else {
					$scope.AddhearValidationError = false
				}
			}
			$scope.aadhearValid2 = function (val) {
				if (val == "2008") {
					$scope.AddhearValidation2Error = true
				} else {
					$scope.AddhearValidation2Error = false
				}
			}
			$scope.aadhearValid3 = function (val) {
				if (val == "2008") {
					$scope.AddhearValidation3Error = true
				} else {
					$scope.AddhearValidation3Error = false
				}
			}
			$scope.aadhearValid4 = function (val) {
				if (val == "2008") {
					$scope.AddhearValidation4Error = true
				} else {
					$scope.AddhearValidation4Error = false
				}
			}
			$scope.aadhearValid5 = function (val) {
				if (val == "2008") {
					$scope.AddhearValidation5Error = true
				} else {
					$scope.AddhearValidation5Error = false
				}
			}
			$scope.aadhearValid6 = function (val) {
				if (val == "2008") {
					$scope.AddhearValidation6Error = true
				} else {
					$scope.AddhearValidation6Error = false
				}
			}

			$scope.nomineeValidate = function () {
				var error = 0;
				var NomineeInfoListArr = [];
				if ($scope.AddNominee1) {
					var ObjNomineeDetails1 = new Object();
					//ObjNomineeDetails2.NomineeInfoId = $rootScope.formData.fields.NomineeInfoId2;
					$scope.userDob1 = $('#txtNDOB1').val();
					ObjNomineeDetails1.NomineeInfoId = $rootScope.formData.fields.NomineeInfoId1;
					ObjNomineeDetails1.Title = $('#nTitle').val();
					ObjNomineeDetails1.FirstName = $rootScope.formData.fields.nfirstName1;
					ObjNomineeDetails1.MiddleName = $rootScope.formData.fields.nmiddleName1;
					ObjNomineeDetails1.LastName = $rootScope.formData.fields.nlastName1;
					ObjNomineeDetails1.Country = "INDIA";
					ObjNomineeDetails1.Mobile = $rootScope.formData.fields.n1mobile1;
					ObjNomineeDetails1.Email = $rootScope.formData.fields.n1email1;
					ObjNomineeDetails1.RelationshipWithNominee = $rootScope.formData.fields.nomineeRelation1;

					if ($scope.addressPrimary1) {
						ObjNomineeDetails1.IsNomineeSameAsApplicant = "1";
					} else {
						ObjNomineeDetails1.City = document.getElementById('city3_value').value;

						if ($rootScope.formData.fields.nAddress1) {
							var adr1 = ($rootScope.formData.fields.nAddress1).substring(0, 30);
							var adr2 = ($rootScope.formData.fields.nAddress1).substring(30, 60);
							var adr3 = ($rootScope.formData.fields.nAddress1).substring(60, 90);
						}
						ObjNomineeDetails1.IsNomineeSameAsApplicant = "0";
						ObjNomineeDetails1.AddressLine1 = $rootScope.formData.fields.nAddress1;
						ObjNomineeDetails1.AddressLine2 = $rootScope.formData.fields.nAddress1line2;
						ObjNomineeDetails1.AddressLine3 = $rootScope.formData.fields.nAddress1line3;
						ObjNomineeDetails1.State = $rootScope.formData.fields.nStateName1;
						ObjNomineeDetails1.PinCode = document.getElementById('nPin1_value').value;
						ObjNomineeDetails1.District = $rootScope.formData.fields.nDistrict1;
					}

					ObjNomineeDetails1.DOB = $scope.userDob1;
					ObjNomineeDetails1.NomineeIDProofNumber = $rootScope.formData.fields.idProofNumber1;
					ObjNomineeDetails1.NomineeProofId = $('#idProof1').val();
					ObjNomineeDetails1.NomineeRatio = $rootScope.formData.fields.NomineeRatio1;

					ObjNomineeDetails1.IsGuardianSamePermenantAddress = "1";
					if ($scope.guardian1) {

						ObjNomineeDetails1.IsSameNomineeANDGuardianAddess = "0";
						ObjNomineeDetails1.IsGuardianSamePermenantAddress = "0";
						if ($scope.addressGuardian1) {
							ObjNomineeDetails1.IsSameNomineeANDGuardianAddess = "1";
							ObjNomineeDetails1.IsGuardianSamePermenantAddress = "1";
						} else {
							if ($rootScope.formData.fields.gAddress1) {
								var adr1 = ($rootScope.formData.fields.gAddress1).substring(0, 30);
								var adr2 = ($rootScope.formData.fields.gAddress1).substring(30, 60);
								var adr3 = ($rootScope.formData.fields.gAddress1).substring(60, 90);
							}

							ObjNomineeDetails1.IsSameNomineeANDGuardianAddess = "0";
							ObjNomineeDetails1.GuardianAddressLine1 = $rootScope.formData.fields.gAddress1;
							ObjNomineeDetails1.GuardianAddressLine2 = $rootScope.formData.fields.gAddress1line2;
							ObjNomineeDetails1.GuardianAddressLine3 = $rootScope.formData.fields.gAddress1line3;

							ObjNomineeDetails1.GuardianCity = document.getElementById('city4_value').value;
							ObjNomineeDetails1.GuardianState = $rootScope.formData.fields.gStateName1;
							ObjNomineeDetails1.GuardianCountry = "INDIA";
							ObjNomineeDetails1.GuardianPinCode = document.getElementById('gPin1_value').value;
							ObjNomineeDetails1.GuardianDistrict = $rootScope.formData.fields.gDistrict1;
						}

						ObjNomineeDetails1.GuardianName = $rootScope.formData.fields.gName1;
						ObjNomineeDetails1.GuardianFirstName = $rootScope.formData.fields.gfirstName1;
						ObjNomineeDetails1.GuardianMiddleName = $rootScope.formData.fields.gmiddleName1;
						ObjNomineeDetails1.GuardianLastName = $rootScope.formData.fields.glastName1;
						ObjNomineeDetails1.IsGuardian = "1";
						ObjNomineeDetails1.GuardianDOB = $('#gDOB1').val();
						ObjNomineeDetails1.GuardianProofId = $('#gIdProof1').val();
						ObjNomineeDetails1.GuardianIDProofNumber = $rootScope.formData.fields.gIdProofNumber1;
						ObjNomineeDetails1.GuardianRelationship = $('#gRelation1').val();
						ObjNomineeDetails1.GuardianMobile = $rootScope.formData.fields.g1mobile1;
						ObjNomineeDetails1.GuardianEmail = $rootScope.formData.fields.g1email1;
					}
					if (angular.isUndefined($rootScope.formData.fields.nFirstName1)) {
						ObjNomineeDetails1.IsNominee = "1";
					} else {
						ObjNomineeDetails1.IsNominee = "0";
					}

					NomineeInfoListArr.push(ObjNomineeDetails1);
				}
				if ($scope.AddNominee2) {
					var ObjNomineeDetails2 = new Object();
					ObjNomineeDetails2.NomineeInfoId = $rootScope.formData.fields.NomineeInfoId2;
					$scope.userDob2 = $('#txtNDOB2').val();
					ObjNomineeDetails2.Title = $('#nTitle').val();
					ObjNomineeDetails2.FirstName = $rootScope.formData.fields.nfirstName2;
					ObjNomineeDetails2.MiddleName = $rootScope.formData.fields.nmiddleName2;
					ObjNomineeDetails2.LastName = $rootScope.formData.fields.nlastName2;
					ObjNomineeDetails2.Country = "INDIA";
					ObjNomineeDetails2.Mobile = $rootScope.formData.fields.n2mobile2;
					ObjNomineeDetails2.Email = $rootScope.formData.fields.n2email2;
					ObjNomineeDetails2.RelationshipWithNominee = $rootScope.formData.fields.nomineeRelation2;

					if ($scope.addressPrimary2) {
						ObjNomineeDetails2.IsNomineeSameAsApplicant = "1";
					} else {
						ObjNomineeDetails2.City = document.getElementById('city5_value').value;

						if ($rootScope.formData.fields.nAddress2) {
							var adr1 = ($rootScope.formData.fields.nAddress2).substring(0, 30);
							var adr2 = ($rootScope.formData.fields.nAddress2).substring(30, 60);
							var adr3 = ($rootScope.formData.fields.nAddress2).substring(60, 90);
						}
						ObjNomineeDetails2.IsNomineeSameAsApplicant = "0";
						ObjNomineeDetails2.AddressLine1 = $rootScope.formData.fields.nAddress2;
						ObjNomineeDetails2.AddressLine2 = $rootScope.formData.fields.nAddress2line2;
						ObjNomineeDetails2.AddressLine3 = $rootScope.formData.fields.nAddress2line3;
						ObjNomineeDetails2.State = $rootScope.formData.fields.nStateName2;
						ObjNomineeDetails2.PinCode = document.getElementById('nPin2_value').value;
						ObjNomineeDetails2.District = $rootScope.formData.fields.nDistrict2;
					}

					ObjNomineeDetails2.DOB = $scope.userDob2;
					ObjNomineeDetails2.NomineeIDProofNumber = $rootScope.formData.fields.idProofNumber2;
					ObjNomineeDetails2.NomineeProofId = $('#idProof2').val();
					ObjNomineeDetails2.NomineeRatio = $('#NomineeRatio2').val();

					ObjNomineeDetails2.IsGuardianSamePermenantAddress = "1";
					if ($scope.guardian2) {

						ObjNomineeDetails2.IsSameNomineeANDGuardianAddess = "0";
						ObjNomineeDetails2.IsGuardianSamePermenantAddress = "0";
						if ($scope.addressGuardian2) {
							ObjNomineeDetails2.IsSameNomineeANDGuardianAddess = "1";
							ObjNomineeDetails2.IsGuardianSamePermenantAddress = "1";
						} else {
							if ($rootScope.formData.fields.gAddress2) {
								var adr1 = ($rootScope.formData.fields.gAddress2).substring(0, 30);
								var adr2 = ($rootScope.formData.fields.gAddress2).substring(30, 60);
								var adr3 = ($rootScope.formData.fields.gAddress2).substring(60, 90);
							}

							ObjNomineeDetails2.IsSameNomineeANDGuardianAddess = "0";
							ObjNomineeDetails2.GuardianAddressLine1 = $rootScope.formData.fields.gAddress2;
							ObjNomineeDetails2.GuardianAddressLine2 = $rootScope.formData.fields.gAddress2line2;
							ObjNomineeDetails2.GuardianAddressLine3 = $rootScope.formData.fields.gAddress2line3;

							ObjNomineeDetails2.GuardianCity = document.getElementById('city6_value').value;
							ObjNomineeDetails2.GuardianState = $rootScope.formData.fields.gStateName2;
							ObjNomineeDetails2.GuardianCountry = "INDIA";
							ObjNomineeDetails2.GuardianPinCode = document.getElementById('gPin2_value').value;
							ObjNomineeDetails2.GuardianDistrict = $rootScope.formData.fields.gDistrict2;
						}

						ObjNomineeDetails2.GuardianName = $rootScope.formData.fields.gName2;
						ObjNomineeDetails2.GuardianFirstName = $rootScope.formData.fields.gfirstName2;
						ObjNomineeDetails2.GuardianMiddleName = $rootScope.formData.fields.gmiddleName2;
						ObjNomineeDetails2.GuardianLastName = $rootScope.formData.fields.glastName2;
						ObjNomineeDetails2.IsGuardian = "1";
						ObjNomineeDetails2.GuardianDOB = $('#gDOB2').val();
						ObjNomineeDetails2.GuardianProofId = $('#gIdProof2').val();
						ObjNomineeDetails2.GuardianIDProofNumber = $rootScope.formData.fields.gIdProofNumber2;
						ObjNomineeDetails2.GuardianRelationship = $('#gRelation2').val();
						ObjNomineeDetails2.GuardianMobile = $rootScope.formData.fields.g2mobile2;
						ObjNomineeDetails2.GuardianEmail = $rootScope.formData.fields.g2email2;
					}
					if (angular.isUndefined($rootScope.formData.fields.nFirstName2)) {
						ObjNomineeDetails2.IsNominee = "1";
					} else {
						ObjNomineeDetails2.IsNominee = "0";
					}
					NomineeInfoListArr.push(ObjNomineeDetails2);
				}
				if ($scope.AddNominee3) {
					var ObjNomineeDetails3 = new Object();
					ObjNomineeDetails3.NomineeInfoId = $rootScope.formData.fields.NomineeInfoId3;
					$scope.userDob3 = $('#txtNDOB3').val();
					ObjNomineeDetails3.Title = $('#nTitle3').val();
					ObjNomineeDetails3.FirstName = $rootScope.formData.fields.nfirstName3;
					ObjNomineeDetails3.MiddleName = $rootScope.formData.fields.nmiddleName3;
					ObjNomineeDetails3.LastName = $rootScope.formData.fields.nlastName3;
					ObjNomineeDetails3.Country = "INDIA";
					ObjNomineeDetails3.Mobile = $rootScope.formData.fields.n3mobile3;
					ObjNomineeDetails3.Email = $rootScope.formData.fields.n3email3;
					ObjNomineeDetails3.RelationshipWithNominee = $rootScope.formData.fields.nomineeRelation3;

					if ($scope.addressPrimary3) {
						ObjNomineeDetails3.IsNomineeSameAsApplicant = "1";
					} else {
						ObjNomineeDetails3.City = document.getElementById('city7_value').value;

						if ($rootScope.formData.fields.nAddress3) {
							var adr1 = ($rootScope.formData.fields.nAddress3).substring(0, 30);
							var adr2 = ($rootScope.formData.fields.nAddress3).substring(30, 60);
							var adr3 = ($rootScope.formData.fields.nAddress3).substring(60, 90);
						}
						ObjNomineeDetails3.IsNomineeSameAsApplicant = "0";
						ObjNomineeDetails3.AddressLine1 = $rootScope.formData.fields.nAddress3;
						ObjNomineeDetails3.AddressLine2 = $rootScope.formData.fields.nAddress3line2;
						ObjNomineeDetails3.AddressLine3 = $rootScope.formData.fields.nAddress3line3;
						ObjNomineeDetails3.State = $rootScope.formData.fields.nStateName3;
						ObjNomineeDetails3.PinCode = document.getElementById('nPin3_value').value;
						ObjNomineeDetails3.District = $rootScope.formData.fields.nDistrict3;
					}

					ObjNomineeDetails3.DOB = $scope.userDob3;
					ObjNomineeDetails3.NomineeIDProofNumber = $rootScope.formData.fields.idProofNumber3;
					ObjNomineeDetails3.NomineeProofId = $('#idProof3').val();
					ObjNomineeDetails3.NomineeRatio = $('#NomineeRatio3').val();

					ObjNomineeDetails3.IsGuardianSamePermenantAddress = "1";
					if ($scope.guardian3) {

						ObjNomineeDetails3.IsSameNomineeANDGuardianAddess = "0";
						ObjNomineeDetails3.IsGuardianSamePermenantAddress = "0";
						if ($scope.addressGuardian3) {
							ObjNomineeDetails3.IsSameNomineeANDGuardianAddess = "1";
							ObjNomineeDetails3.IsGuardianSamePermenantAddress = "1";
						} else {
							if ($rootScope.formData.fields.gAddress3) {
								var adr1 = ($rootScope.formData.fields.gAddress3).substring(0, 30);
								var adr2 = ($rootScope.formData.fields.gAddress3).substring(30, 60);
								var adr3 = ($rootScope.formData.fields.gAddress3).substring(60, 90);
							}

							ObjNomineeDetails3.IsSameNomineeANDGuardianAddess = "0";
							ObjNomineeDetails3.GuardianAddressLine1 = $rootScope.formData.fields.gAddress3;
							ObjNomineeDetails3.GuardianAddressLine2 = $rootScope.formData.fields.gAddress3line2;
							ObjNomineeDetails3.GuardianAddressLine3 = $rootScope.formData.fields.gAddress3line3;

							ObjNomineeDetails3.GuardianCity = document.getElementById('city8_value').value;
							ObjNomineeDetails3.GuardianState = $rootScope.formData.fields.gStateName3;
							ObjNomineeDetails3.GuardianCountry = "INDIA";
							ObjNomineeDetails3.GuardianPinCode = document.getElementById('gPin3_value').value;
							ObjNomineeDetails3.GuardianDistrict = $rootScope.formData.fields.gDistrict3;
						}

						ObjNomineeDetails3.GuardianName = $rootScope.formData.fields.gName3;
						ObjNomineeDetails3.GuardianFirstName = $rootScope.formData.fields.gfirstName3;
						ObjNomineeDetails3.GuardianMiddleName = $rootScope.formData.fields.gmiddleName3;
						ObjNomineeDetails3.GuardianLastName = $rootScope.formData.fields.glastName3;
						ObjNomineeDetails3.IsGuardian = "1";
						ObjNomineeDetails3.GuardianDOB = $('#gDOB3').val();
						ObjNomineeDetails3.GuardianProofId = $('#gIdProof3').val();
						ObjNomineeDetails3.GuardianIDProofNumber = $rootScope.formData.fields.gIdProofNumber3;
						ObjNomineeDetails3.GuardianRelationship = $('#gRelation3').val();
						ObjNomineeDetails3.GuardianMobile = $rootScope.formData.fields.g3mobile3;
						ObjNomineeDetails3.GuardianEmail = $rootScope.formData.fields.g3email3;
					}
					if (angular.isUndefined($rootScope.formData.fields.nFirstName3)) {
						ObjNomineeDetails3.IsNominee = "1";
					} else {
						ObjNomineeDetails3.IsNominee = "0";
					}
					NomineeInfoListArr.push(ObjNomineeDetails3);
				}

				if (!$scope.hideNominee1) {
					var fields = $('#nomineeDetails1 input[type="text"],#nomineeDetails1 input[type="tel"], #nomineeDetails1 select');
					var field = '';
					fields.each(function () {
						var value = $(this).val();
						if (value == null) {
							value = ''
						}
						if (value.length < 1) {
							if (this.id == "NomineeRatio1" || (!$scope.guardian1 && (this.id == "idProof1" || this.id == "idProofNumber1")) || (this.id == "nfName1" || this.id == "nlName1" || this.id == "nrelation1" || this.id == "txtNDOB1") || (!$scope.addressPrimary1 && (this.id == "nAddress1" || this.id == "nPin1_value" || this.id == "nState1" || this.id == "city3_value" || this.id == "nDistrict1" || this.id == "nCountry1")) || ($scope.guardian1 && (this.id == "gfName1" || this.id == "glName1" || this.id == "gIdProof1" || this.id == "gIdProofNumber1" || this.id == "gDOB1" || this.id == "gRelation1")) || (!$scope.addressGuardian1 && (this.id == "gAddress1" || this.id == "gPin1_value" || this.id == "city4_value"))) {
								field = this.id;
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
						if (value.length < 6) {
							if ((!$scope.addressPrimary1 && this.id == "nPin1_value") || (!$scope.addressGuardian1 && this.id == "gPin1_value")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
						if (value.length < 5) {
							if ((!$scope.addressPrimary1 && this.id == "nAddress1") || (!$scope.addressGuardian1 && this.id == "gAddress1")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
					});
					if (!$scope.guardian1) {
						if ($rootScope.formData.fields.n1mobile1 == null || $rootScope.formData.fields.n1mobile1 == '') {
							$scope.n1Mobile1Error = true;
							error++;
							$('#n1Mobile1').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.n1mobile1) == false) {
							$scope.n1invalidMobile = true;
							error++;
							$('#n1Mobile1').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.n1email1 == null || $rootScope.formData.fields.n1email1 == '') {
							$scope.n1Email1Error = true;
							error++;
							$('#n1Email1').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.n1email1)) {
							$scope.n1Email1Error = true;
							error++;
							$('#n1Email1').focus();
						}

						if ($('#idProof1').val() == "118" || $('#idProof1').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.idProofNumber1 == null || $rootScope.formData.fields.idProofNumber1 == '') {
								$scope.idProofNumber1Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.idProofNumber1) == false) {
								$scope.idProofNumber1panError = true
									$scope.idProofNumber1Error = false
									error++;
							}
						}

					}
					if ($scope.guardian1) {
						if ($rootScope.formData.fields.g1mobile1 == null || $rootScope.formData.fields.g1mobile1 == '') {
							$scope.g1Mobile1Error = true;
							error++;
							$('#g1Mobile1').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.g1mobile1) == false) {
							$scope.g1invalidMobile = true;
							error++;
							$('#g1Mobile1').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.g1email1 == null || $rootScope.formData.fields.g1email1 == '') {
							$scope.g1Email1Error = true;
							error++;
							$('#g1Email1').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.g1email1)) {
							$scope.g1Email1Error = true;
							error++;
							$('#g1Email1').focus();
						}
						if ($('#gIdProof1').val() == "118" || $('#gIdProof1').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.gIdProofNumber1 == null || $rootScope.formData.fields.gIdProofNumber1 == '') {
								$scope.gIdProofNumber1Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.gIdProofNumber1) == false) {
								$scope.gIdProofNumber1panError = true
									$scope.gIdProofNumber1Error = false
									error++;
							}
						}
					}
				}

				if (!$scope.hideNominee2) {
					var fields = $('#nomineeDetails2 input[type="text"], #nomineeDetails2 select');
					var field = '';
					fields.each(function () {
						var value = $(this).val();
						if (value == null) {
							value = ''
						}
						if (value.length < 1) {
							if (this.id == "NomineeRatio2" || (!$scope.guardian2 && (this.id == "idProof2" || this.id == "idProofNumber2")) || (this.id == "nfName2" || this.id == "nlName2" || this.id == "nrelation2" || this.id == "txtNDOB2") || (!$scope.addressPrimary2 && (this.id == "nAddress2" || this.id == "nPin2_value" || this.id == "nState2" || this.id == "city5_value" || this.id == "nDistrict2" || this.id == "nCountry2")) || ($scope.guardian2 && (this.id == "gfName2" || this.id == "glName2" || this.id == "gIdProof2" || this.id == "gIdProofNumber2" || this.id == "gDOB2" || this.id == "gRelation2")) || (!$scope.addressGuardian2 && (this.id == "gAddress2" || this.id == "gPin2_value" || this.id == "city6_value"))) {
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
						if (value.length < 6) {
							if ((!$scope.addressPrimary2 && this.id == "nPin2_value") || (!$scope.addressGuardian2 && this.id == "gPin2_value")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
						if (value.length < 5) {
							if ((!$scope.addressPrimary2 && this.id == "nAddress2") || (!$scope.addressGuardian2 && this.id == "gAddress2")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
					});
					if (!$scope.guardian2) {
						if ($rootScope.formData.fields.n2mobile2 == null || $rootScope.formData.fields.n2mobile2 == '') {
							$scope.n2Mobile2Error = true;
							error++;
							$('#n2Mobile2').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.n2mobile2) == false) {
							$scope.n2invalidMobile = true;
							error++;
							$('#n2Mobile2').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.n2email2 == null || $rootScope.formData.fields.n2email2 == '') {
							$scope.n2Email2Error = true;
							error++;
							$('#n2Email2').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.n2email2)) {
							$scope.n2Email2Error = true;
							error++;
							$('#n2Email2').focus();
						}
						if ($('#idProof2').val() == "118" || $('#idProof2').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.idProofNumber2 == null || $rootScope.formData.fields.idProofNumber2 == '') {
								$scope.idProofNumber2Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.idProofNumber2) == false) {
								$scope.idProofNumber2panError = true
									$scope.idProofNumber2Error = false
									error++;
							}
						}
					}
					if ($scope.guardian2) {
						if ($rootScope.formData.fields.g2mobile2 == null || $rootScope.formData.fields.g2mobile2 == '') {
							$scope.g2Mobile2Error = true;
							error++;
							$('#g2Mobile2').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.g2mobile2) == false) {
							$scope.g2invalidMobile = true;
							error++;
							$('#g2Mobile2').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.g2email2 == null || $rootScope.formData.fields.g2email2 == '') {
							$scope.g2Email2Error = true;
							error++;
							$('#g2Email2').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.g2email2)) {
							$scope.g2Email2Error = true;
							error++;
							$('#g2Email2').focus();
						}
						if ($('#gidProof2').val() == "118" || $('#gidProof2').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.gIdProofNumber2 == null || $rootScope.formData.fields.gIdProofNumber2 == '') {
								$scope.gIdProofNumber2Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.gIdProofNumber2) == false) {
								$scope.gIdProofNumber2panError = true
									$scope.gIdProofNumber2Error = false
									error++;
							}
						}
					}

				}
				if (!$scope.hideNominee3) {
					var fields = $('#nomineeDetails3 input[type="text"], #nomineeDetails3 select');
					var field = '';
					fields.each(function () {
						var value = $(this).val();
						if (value == null) {
							value = ''
						}
						if (value.length < 1) {
							if (this.id == "NomineeRatio3" || (!$scope.guardian3 && (this.id == "idProof3" || this.id == "idProofNumber3")) || (this.id == "nfName3" || this.id == "nlName3" || this.id == "nrelation3" || this.id == "txtNDOB3") || (!$scope.addressPrimary3 && (this.id == "nAddress3" || this.id == "nPin3_value" || this.id == "nState3" || this.id == "city7_value" || this.id == "nDistrict3" || this.id == "nCountry3")) || ($scope.guardian3 && (this.id == "gfName3" || this.id == "glName3" || this.id == "gIdProof3" || this.id == "gIdProofNumber3" || this.id == "gDOB3" || this.id == "gRelation3")) || (!$scope.addressGuardian3 && (this.id == "gAddress3" || this.id == "gPin3_value" || this.id == "city8_value"))) {
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
						if (value.length < 6) {
							if ((!$scope.addressPrimary3 && this.id == "nPin3_value") || (!$scope.addressGuardian3 && this.id == "gPin3_value")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
						if (value.length < 5) {
							if ((!$scope.addressPrimary3 && this.id == "nAddress3") || (!$scope.addressGuardian3 && this.id == "gAddress3")) {
								var a = this.id + 'Error';
								$scope[a] = true;
								error++;
							}
						} else {
							var a = this.id + 'Error';
							$scope[a] = false;
						}
					});
					if (!$scope.guardian3) {
						if ($rootScope.formData.fields.n3mobile3 == null || $rootScope.formData.fields.n3mobile3 == '') {
							$scope.n3Mobile3Error = true;
							error++;
							$('#n3Mobile3').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.n3mobile3) == false) {
							$scope.n3invalidMobile = true;
							error++;
							$('#n3Mobile3').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.n3email3 == null || $rootScope.formData.fields.n3email3 == '') {
							$scope.n3Email3Error = true;
							error++;
							$('#n3Email3').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.n3email3)) {
							$scope.n3Email3Error = true;
							error++;
							$('#n3Email3').focus();
						}
						if ($('#idProof3').val() == "118" || $('#idProof3').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.idProofNumber3 == null || $rootScope.formData.fields.idProofNumber3 == '') {
								$scope.idProofNumber3Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.idProofNumber3) == false) {
								$scope.idProofNumber3panError = true
									$scope.idProofNumber3Error = false
									error++;
							}
						}
					}
					if ($scope.guardian3) {
						if ($rootScope.formData.fields.g3mobile3 == null || $rootScope.formData.fields.g3mobile3 == '') {
							$scope.g3Mobile3Error = true;
							error++;
							$('#g3Mobile3').focus();
						} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.g3mobile3) == false) {
							$scope.g3invalidMobile = true;
							error++;
							$('#g3Mobile3').focus();
						}
						$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
						if ($rootScope.formData.fields.g3email3 == null || $rootScope.formData.fields.g3email3 == '') {
							$scope.g3Email3Error = true;
							error++;
							$('#g3Email3').focus();
						} else if (!($scope.filter).test($rootScope.formData.fields.g3email3)) {
							$scope.g3Email3Error = true;
							error++;
							$('#g3Email3').focus();
						}
						if ($('#gidProof3').val() == "118" || $('#gidProof3').val() == 118) {
							var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
							if ($rootScope.formData.fields.gidProofNumber3 == null || $rootScope.formData.fields.gidProofNumber3 == '') {
								$scope.gidProofNumber3Error = true
									error++;
							} else if (pan_filter.test($rootScope.formData.fields.gidProofNumber3) == false) {
								$scope.gidProofNumber3panError = true
									$scope.gidProofNumber3Error = false
									error++;
							}
						}
					}

				}
				// if(($rootScope.formData.fields.idProofNumber1 == $rootScope.formData.fields.idProofNumber2) || ($rootScope.formData.fields.idProofNumber1 == $rootScope.formData.fields.idProofNumber3) || ($rootScope.formData.fields.idProofNumber2 == $rootScope.formData.fields.idProofNumber3)){
				// 	$scope.sameidproofNumber = true
				// 	error++;
				// }else{
				// 	$scope.sameidproofNumber = false
				// }

				let NomineeRatioSum = parseInt($rootScope.formData.fields.NomineeRatio1) + parseInt($rootScope.formData.fields.NomineeRatio2) + parseInt($rootScope.formData.fields.NomineeRatio3);
				if (NomineeRatioSum != 100) {
					$rootScope.NomineeRatioError = true;
					error++;
				} else {
					$rootScope.NomineeRatioError = false;
				}

				if (error == 0) {
					//$scope.personalUpdate();
					var fsMname = '';
					var fsLname = '';
					var moMname = '';
					var moLname = '';
					var maMname = '';
					var maLname = '';
					if ($rootScope.formData.fields.fsMiddleName) {
						fsMname = " " + $rootScope.formData.fields.fsMiddleName
					}

					if ($rootScope.formData.fields.fsLastName) {
						fsLname = " " + $rootScope.formData.fields.fsLastName;
					}

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
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							Gender: $rootScope.formData.fields.gender,
							MaritialStatus: $rootScope.formData.fields.marital,
							Email: $rootScope.formData.fields.email,
							Mobile: $rootScope.formData.fields.mobile,
							FatherOrSpouseType: $rootScope.formData.fields.fsType,
							FatherHusName: $rootScope.formData.fields.fsFirstName + fsMname + fsLname,
							FatherNamePrefixID: $('#fsTitle').val(),
							FatherNameFirstName: $rootScope.formData.fields.fsFirstName,
							FatherNameMiddleName: fsMname,
							FatherNameLastName: fsLname,
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
							EncryptToken: $rootScope.EncryptToken
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
								$('#APIResponse').modal({
									backdrop: 'static',
									keyboard: false
								});
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
									ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.existingRef,
									Email: EmailType
								};
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

							var s_url = "DIYNomineeRegistrationNew";

							var sendData = [{
									ReferenceNumber: $rootScope.formData.ReferenceNumber,
									NomineeInfoList: NomineeInfoListArr,
									IsDiy: true,
									EncryptToken: $rootScope.EncryptToken
								}
							]

							$rootScope.formData.apiLoading = true;
							serverService.apiCall(s_url, sendData).then(function (a) {
								var response = a.data;
								if (response.EncryptToken) {
									$rootScope.EncryptToken = response.EncryptToken;
									sessionStorage.setItem('AuthToken', response.EncryptToken);
								}
								if (response.IsSuccess) {
									$rootScope.thirdCompleted = true;
									$scope.dataPush();
									$rootScope.getAPI = false;
									$state.go('bank');
								} else {
									$rootScope.formData.apiLoading = false;
									$('#connection').modal('show');
								}
							}, function (e) {
								$rootScope.formData.apiLoading = false;
								$('#connection').modal('show');
							});

						} else {
							$rootScope.formData.apiLoading = false;

							if (response.IsEmail) {
								$scope.panEmailRegError = true;
								$scope.panEmailRegMsg = response.ErrorMessage;
								$('#eself').focus();
							} else if (response.IsMobile) {
								$scope.panMobileRegError = true;
								$scope.panMobileRegMsg = response.ErrorMessage;
								$('#mself').focus();
							} else {
								$('#connection').modal('show');
							}
						}

					}, function (e) {
						$rootScope.formData.apiLoading = false;
						$('#connection').modal('show');
					});
				} else {
					$rootScope.formData.apiLoading = false;
					$('#nomineeInfo').collapse('show');
					$scope.nomineeInfoError = true;

				}

			}

			$scope.profileBTerms = function () {
				$('#profileBterms').modal({
					backdrop: 'static',
					keyboard: false
				});
				$scope.termsOpen = true;
			}

			$scope.emarginAccept = function () {
				setTimeout(function () {
					$('#InternetTrading').iCheck('check');
				}, 50)
				setTimeout(function () {
					$scope.termsOpen = false;
				}, 150)
				$rootScope.formData.fields.InternetTrading = "Y";
			}

			$scope.emarginCancel = function () {
				setTimeout(function () {
					$('#InternetTrading').iCheck('uncheck');
				}, 50)
				$rootScope.formData.fields.InternetTrading = "N";
				$scope.termsOpen = false;
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
						$scope.$apply();
					} else {
						$scope.guardian1 = false;
						$rootScope.formData.fields.gName = undefined;
						$scope.$apply();
					}

					// var today = new Date(),
					//     age = today.getFullYear() - ui.selectedYear;
					// if (age < 18) {
					//     $scope.guardian1 = true;
					//     $scope.$apply();
					// } else {
					//     $scope.guardian1 = false;
					//     $rootScope.formData.fields.gName = undefined;
					//     $scope.$apply();
					// }
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
						'FatherOrSpouseName': $rootScope.formData.fields.fsFirstName + $rootScope.formData.fields.fsMiddleName + $rootScope.formData.fields.fsLastName,
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

			$scope.openCollapse = function () {}

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
				Personal_Info.fsmMiddleName = $rootScope.formData.fields.fsMiddleName;
				Personal_Info.fsLastName = $rootScope.formData.fields.fsLastName;
				Personal_Info.moTitle = $rootScope.formData.fields.moTitle;
				Personal_Info.moFirstName = $rootScope.formData.fields.moFirstName;
				Personal_Info.moMiddleName = $rootScope.formData.fields.moMiddleName;
				Personal_Info.moLastName = $rootScope.formData.fields.moLastName;
				Personal_Info.maTitle = $('#maidenTitle').val();
				Personal_Info.maFirstName = $rootScope.formData.fields.maFirstName;
				Personal_Info.maMiddleName = $rootScope.formData.fields.maMiddleName;
				Personal_Info.maLastName = $rootScope.formData.fields.maLastName;
				Personal_Info.email = $rootScope.formData.fields.email;
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
				var url = "GetLandingDetails?MobileNumber=" + $rootScope.formData.fields.mobile;
				serverService.getApi(url).then(function (a) {
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
						ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.existingRef,
						Email: $rootScope.formData.fields.email
					};
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							$rootScope.formData.emailOTPApi = true;
							$scope.verifyEmailDiv = true;
							$rootScope.verifyemail = true;
						}
					}, function(e){
						$rootScope.formData.apiLoading = false;
					});
				} else {
					$scope.invalidEmail = true;
					$('#input-1email').focus();
					return false;
				}
			}
			
			
			if ($rootScope.webfinacle) {
				setTimeout(function(){$('#rStatus').prop('disabled', true)},500)
			}
			
			if(sessionStorage.getItem('RMEmailOTPVerified') && sessionStorage.getItem('RMEmailOTPVerified') == 'true'){
				$rootScope.verifyemail = false;
			}

			if ($rootScope.verifyemail && !$rootScope.formData.RMModule) {
				if(!$rootScope.formData.emailOTPApi){
					$scope.getEmailVerificatioUrl();
				}else{
					$scope.verifyEmailDiv = true;
				}
			}
		}
	]);
