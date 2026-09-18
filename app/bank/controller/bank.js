mainApp.controller('bankController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
			$rootScope.formData.stageInfo = '5';
			if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
				if (sessionStorage.getItem('AxNo') != null) {
					$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
					$rootScope.getDIYStatus();
				} else {
					if (!$rootScope.webkarvy || !$rootScope.karvyData) {
						window.location.href = (serverService.getHome());
					}
				}
			}

			$rootScope.formData.apiLoading = false;
			$rootScope.formData.stageOrder = 4;
			$rootScope.formData.ifscOption = false;
			$rootScope.formData.bankList = [];
			$rootScope.formData.fields.bankID = "1";
			$scope.disableIFSC = true;
			$rootScope.formData.fields.bankName = '';
			$rootScope.formData.dpNumber = '';
			$rootScope.bankDisable=false;
			$scope.dpNotNull = false;
			$scope.accountValidation = true;
			$scope.multiaccNumber = '0';
			$scope.pBankdisabled = false;
			$scope.bankStageError = "";
				setTimeout(function () {
					$(".select").select2();
					$('.customcheckradio').iCheck({
						checkboxClass: 'icheckbox_minimal',
						radioClass: 'iradio_minimal'
					});
				}, 500)

				$scope.getThirdPartyBank = function () {
				var u_url = "DIYGetThirdPartyBankName";
				var d_sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					PanNumber: $rootScope.formData.fields.panNumber
				}

				serverService.apiCall(u_url, d_sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$rootScope.formData.bankList = response.BankDetailsList;
						$rootScope.formData.fields.bankID = response.BankDetailsList[0].BankId.toString();
						var shortBankName = (response.BankDetailsList[0].ShortBankName || '').toUpperCase();
						console.log(shortBankName,'UTMBank')

						if (!$rootScope.webkarvy) {
							$scope.bankName('');
						}
						if (shortBankName === 'SVCB' || shortBankName === 'SSWB') {
							$scope.sswb = true;
						} 


						setTimeout(function () {
							$(".select").select2();
						}, 200);
					} else {}
				});
			}

			/* Get Master Data for Bank List */
			var s_url = "DIYGetBankName";

			serverService.getApi(s_url).then(function (a) {
				var response = a.data;
				if (response.IsSuccess) {
					$rootScope.formData.bankList = response.BankDetailsList;

					if ($rootScope.webJana) {
						for (var i = 0; i < $rootScope.formData.bankList.length; i++) {
							if ($rootScope.formData.bankList[i].BankName.toLowerCase().indexOf('jana small finance bank') >= 0) {
								$rootScope.formData.fields.bankID = $rootScope.formData.bankList[i].BankId.toString();
								setTimeout(function () {
									$(".select").select2();
								}, 100);
							}
						}
					} 
					else if ($rootScope.uBank) {
						for (var i = 0; i < $rootScope.formData.bankList.length; i++) {
							if ($rootScope.formData.bankList[i].BankName.toUpperCase().indexOf('UTKARSH SMALL FINANCE BANK') >= 0) {
								$rootScope.formData.fields.bankID = $rootScope.formData.bankList[i].BankId.toString();
								$rootScope.formData.fields.bankName =$rootScope.formData.bankList[i].BankName;
								setTimeout(function () {
									$(".select").select2();
								}, 100);
							}
						}
					} 
					
					
					else if (!$rootScope.webkarvy) {
						$scope.bankName('');
					}

					setTimeout(function () {
						$(".select").select2();
						if (!$rootScope.webkarvy) {
							$scope.getThirdPartyBank();
						}
					}, 200);
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
			});

			if ($rootScope.webkarvy) {
				var kurl = 'GetKarvyBankMaster'

					serverService.getApi(kurl).then(function (a) {
						var response = a.data;
						if (response.IsSuccess && response.KarvyBankMaster.length != 0) {
							$scope.kbank = response.KarvyBankMaster;
							$rootScope.formData.fields.bankName = $scope.kbank.filter(function (bankdetails) {
									return (bankdetails.BankName == $rootScope.karvyData.BANK_NAME);
								})[0].BankName;
						}
					})
			}

			$("html, body").animate({
				scrollTop: 0
			}, "slow");

			var Bank_Info_Stage = '';
			$scope.bankName = function (type) {
				var searchParams = sessionStorage.getItem('searchParams');
				if(searchParams){
					var params = JSON.parse(searchParams);
					var utmBank = params.utm_bank ? params.utm_bank.toUpperCase() : '';
					$scope.sswb = (utmBank === 'SVCB' || utmBank === 'SSWB')
				} else{
					$scope.sswb = false;
				}

				if ($rootScope.formData.fields.bankID !== '' && $rootScope.formData.fields.bankID !== null) {
					if (type) {
						$('#ifsc_value').val('');
					}
					$scope.disableIFSC = false;
					$scope.bankNameError = false;
					//$rootScope.formData.fields.bankName = $rootScope.formData.bankList.filter((bankdetails) => bankdetails.BankId == $rootScope.formData.fields.bankID)[0].BankName;
					$rootScope.formData.fields.bankName = $rootScope.formData.bankList.filter(function (bankdetails) {
							return (bankdetails.BankId == $rootScope.formData.fields.bankID);
						})[0].BankName;
					//console.log($rootScope.formData.fields.bankName)
					if ($rootScope.formData.fields.bankName.toLowerCase() != "axis bank" && type == 'changed') {
						setTimeout(function () {
							var myModal = new bootstrap.Modal(document.getElementById('myModal'));
							myModal.show();
						}, 500);
						$rootScope.axisSignatureAction = false;
					} else if ($rootScope.formData.fields.bankName.toLowerCase() == "axis bank") {
						$rootScope.axisSignatureAction = true;
					}
				}
			}

			$scope.getOverallStatusEmailverify = function(){
				var s_geturl = "GetOverallStatusDIY";
				$rootScope.formData.apiLoading = true;
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber
				};
				serverService.apiCall(s_geturl, sendData).then(function (a) {
					$rootScope.formData.apiLoading = false;
					var response = a.data
					$rootScope.BankEbo=response.OverallStatusList[3].EBOStatus;
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
					if(response.IsSuccess&&response.OverallStatusList[3].EBOStatus=='A' ||$rootScope.BYOD){
						$rootScope.bankDisable=true
						$('#ifsc_value').prop('disabled', true);
						$('#ifsc').prop('disabled', true);
					}
					if(response.IsSuccess && response.Digioption){
						if (response.RMTeam) {
							sessionStorage.setItem('RMTeam', response.RMTeam);
							$rootScope.formData.RMTeam = response.RMTeam;
						}
						if(response.OverallStatusList[1].SPStatus!="Y"){
							$rootScope.BlankSatge=true;
							$state.go('address');
							return false;
						}else if(response.OverallStatusList[4].SPStatus!="Y"){
							$state.go('personalDetails');
							return false;
						}
						else if (response.OverallStatusList[0].IsEmailVerified == true) {
							$rootScope.verifyemail = false;
							$rootScope.verifyEmailDiv = false;
						}else{
							$rootScope.verifyemail = true;
							$rootScope.verifyEmailDiv = true;
							$rootScope.verifyemail = true;
							$rootScope.firstCompleted = true;
							$rootScope.secondCompleted = true;
							$rootScope.thirdCompleted  = false;
							$rootScope.fourthCompleted = false;
							$rootScope.formData.aadharhide = true;
							$rootScope.wizardShow = true;
							$state.go('personalDetails', {
								mobile: $rootScope.formData.EncMobile
							});
							return false;
						}
					}
				})
			}

			$scope.getOverallStatusEmailverify()

			$scope.changeChar = function () {
				if ($rootScope.formData.fields.accNumber) {
					var inputvalue = $rootScope.formData.fields.accNumber;
					$rootScope.formData.fields.accountNumber = inputvalue;

					var i;
					var AcctNotemp = '';
					for (i = 0; i < inputvalue.length; i++) {
						AcctNotemp = AcctNotemp + '.';
					}
					$rootScope.formData.fields.accNumber = '';
					$rootScope.formData.fields.accNumber = AcctNotemp;
				} else {
					$rootScope.formData.fields.accountNumber = '';
				}

			};

			$scope.changeStar = function () {
				$rootScope.formData.fields.accNumber = '';
				$rootScope.formData.fields.accNumber = $rootScope.formData.fields.accountNumber;
			};

			$scope.getBankInfo = function () {
				if (!$rootScope.getAPI) {
					var s_url = "DIYGetBankDetailsByReferenceNumber";
					var sendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					}

					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;

						if (response.IsSuccess) {
							$scope.accountValidation = false;
							$scope.formData.fields.accNumber = response.BankDetailsList[0].AccountNumber;

							if ($rootScope.webfinacle && $scope.finMulti) {
								$("#accNumber option:contains(" + response.BankDetailsList[0].AccountNumber + ")").prop('selected', true);
							}
							if (response.BankDetailsList[0].AxisSignature === "1") {
								$scope.axisSignature = true;
							} else if (response.BankDetailsList[0].AxisSignature === "0") {
								$scope.axisSignature = false;
							}
							if ($rootScope.formData.threeinone && $scope.formData.fields.accNumber) {
								$scope.accNumberFreeze = true;
							} else {
								$scope.accNumberFreeze = false;
							}
							$rootScope.formData.fields.accountNumber = $rootScope.formData.fields.accNumber;
							$scope.formData.fields.raccNumber = response.BankDetailsList[0].AccountNumber;
							$rootScope.formData.fields.bankName = response.BankDetailsList[0].BankName;
							$scope.getaccNumber = response.BankDetailsList[0].AccountNumber;
							if (response.BankDetailsList[0].BankId) {
								$rootScope.formData.fields.bankID = response.BankDetailsList[0].BankId.toString();
							}
							if ($rootScope.webfinacle) {
								$('#pBank').addClass('freeze');
							}

							//$scope.changeChar();
							$rootScope.formData.fields.ifscCode = response.BankDetailsList[0].IFSC;
							$scope.getifscCode = response.BankDetailsList[0].IFSC;
							$('#ifsc_value').val(response.BankDetailsList[0].IFSC);
							/****for IE fix ***/
							//$('#ifsc_value').focus();
							if ($rootScope.formData.threeinone && response.BankDetailsList[0].IFSC) {
								$('#ifsc_value').prop('disabled', true);
							}else if($rootScope.BankEbo=="A" ||$rootScope.BYOD){
								$('#ifsc_value').prop('disabled', true);
							}
							 else {
								$('#ifsc_value').prop('disabled', false);
							}
							setTimeout(function () {
								$(".select").select2();
							}, 100);
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
							Bank_Info_Stage = "Bank_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
							if (JSON.parse(sessionStorage.getItem(Bank_Info_Stage)) != null) {
								var Bank_Info = JSON.parse(sessionStorage.getItem(Bank_Info_Stage));

								$scope.disableIFSC = false;
								$rootScope.formData.fields.accNumber = Bank_Info.accountnumber;
								$rootScope.formData.fields.accountNumber = $rootScope.formData.fields.accNumber;
								$rootScope.formData.fields.raccNumber = Bank_Info.raccountnumber;
								$rootScope.formData.fields.bankID = Bank_Info.bankID;
								setTimeout(function () {
									$('#ifsc_value').val(Bank_Info.ifsc);
									$(".select").select2();
								}, 500);
								//$rootScope.axisSignatureAction = true;
								//$scope.axisSignature = true;
								//$scope.changeChar();
							}
						}

					}, function (e) {
						$rootScope.formData.apiLoading = false;
						var connection = new bootstrap.Modal(document.getElementById('connection'));
							connection.show();
					});
				} else {
					Bank_Info_Stage = "Bank_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
					if (JSON.parse(sessionStorage.getItem(Bank_Info_Stage)) != null) {
						var Bank_Info = JSON.parse(sessionStorage.getItem(Bank_Info_Stage));
						$('#ifsc_value').val(Bank_Info.ifsc);
						/****for IE fix ***/
						//$('#ifsc_value').focus();
						$scope.disableIFSC = false;
						$rootScope.formData.fields.accNumber = Bank_Info.accountnumber;
						$rootScope.formData.fields.accountNumber = $rootScope.formData.fields.accNumber;
						$rootScope.formData.fields.raccNumber = Bank_Info.raccountnumber;
						$rootScope.formData.fields.bankID = Bank_Info.bankID;
						setTimeout(function () {
							$('#ifsc_value').val(Bank_Info.ifsc);

							$(".select").select2();
						}, 500);
						//$scope.changeChar();
					}
				}

			}
			$scope.getFinData = function () {
				$scope.pBankdisabled = true;
				$scope.finData = JSON.parse(sessionStorage.getItem('finData'));
				if ($scope.finData.bankAccountDetails.length > 1) {
					$scope.finMulti = true;
					$rootScope.formData.fields.accNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
					$rootScope.formData.fields.raccNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
					//$scope.multiaccNumber = '0';
					$rootScope.formData.fields.bankID = '1';
					$rootScope.formData.fields.ifscCode = $scope.finData.bankAccountDetails[0].BranchIfscCode;
					setTimeout(function () {
						$(".select").select2();
					}, 500);
				} else {
					$('.IBBankDisabled').addClass('adisabled');
					$rootScope.formData.fields.accNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
					$rootScope.formData.fields.raccNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
					$rootScope.formData.fields.bankID = '1';
					$rootScope.formData.fields.ifscCode = $scope.finData.bankAccountDetails[0].BranchIfscCode;
					$scope.typePasswordCAC = true;
					$scope.typePasswordAc = true;
					setTimeout(function () {
						$('#ifsc_value').val($scope.finData.bankAccountDetails[0].BranchIfscCode);
						$('#acc1').val($scope.finData.bankAccountDetails[0].AccountNumber);
						$('#cacc1').val($scope.finData.bankAccountDetails[0].AccountNumber);
						$(".select").select2();
						$("#pBank").prop('disabled', true);
					}, 500);
				}
				$rootScope.formData.apiLoading = false;
			}
		
			if ($rootScope.formData.tokenValidation && !$rootScope.EncryptToken) {
				var url = "GetEncrptToken";
				var sendData = {
					ReferenceNumber: sessionStorage.getItem('AxNo')
				}
				$rootScope.formData.apiLoading = true;
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
					if (response.EncryptToken) {
						$rootScope.EncryptToken = response.EncryptToken;
						$scope.getBankInfo();
					} else {
						$rootScope.clearBrowsingData();
						var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'));
						APIResponseModal.show();
						$rootScope.apiResponseErrorMsg = response.ErrorMessage;
					}
				});

			} else {
				if ($rootScope.webfinacle && sessionStorage.getItem('finData')) {
					$scope.getFinData();
				}
				$scope.getBankInfo();
			}

			if ($rootScope.karvyData) {
				$rootScope.formData.fields.bankID = $rootScope.karvyData.BANK_NAME;
				$rootScope.formData.fields.bankName = $rootScope.karvyData.BANK_NAME;
				$rootScope.formData.fields.micrCode = $rootScope.karvyData.MICR_CODE;
				$rootScope.formData.fields.accNumber = $rootScope.karvyData.AC_NO;
				$rootScope.formData.fields.raccNumber = $rootScope.karvyData.AC_NO;
				$rootScope.formData.fields.ifscCode = $rootScope.karvyData.IFSC_CODE;

				// debugger
				// if($rootScope.karvyData.DOB){
				// 	var dobdata =  $rootScope.karvyData.DOB.substring(0, 2) + '/' +  $rootScope.karvyData.DOB.substring(2, 4) + '/' +  $rootScope.karvyData.DOB.substring(4, 8);
				// }
				$rootScope.formData.fields.DOB = $rootScope.karvyData.DOB;
				$rootScope.formData.fields.mobile = $rootScope.karvyData.MOBILE;
				$rootScope.formData.fields.email = $rootScope.karvyData.EMAIL;
				setTimeout(function () {
					$('#ifsc_value').val($rootScope.karvyData.IFSC_CODE);
				}, 500);
				var url = "GetBankInfoByIFSCCode";
				var sendData = {
					"IFSC": 'ICIC0006026'
				}
				$rootScope.formData.bankMicrList = '';
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					$rootScope.formData.apiLoading = false;
				});
			}

			$scope.bankDataSubmit = function () {
				/*var axisSign=""
				var axisSignature = $('#axisSignature').prop('checked');
				if(axisSignature === true){
				axisSign="1";
				}else if(axisSignature === false){
				axisSign="0";
				}*/
				$('#pennyModal').modal('hide');
				$(document.body).removeClass('modal-open');
				$('.modal-backdrop').remove();
				var s_url = "DIYClientBankRegistration";
				var sendData = {
					ObjCDIYBank: {
						ReferenceNumber: "",
						ReferenceNumberEnc :$rootScope.formData.eRefNumber,
						BankDetailsId: 1,
						BankName: $rootScope.formData.fields.bankName,
						BankId: $rootScope.formData.fields.bankID,
						Address: $rootScope.formData.Branch,
						IFSC: $rootScope.formData.fields.ifscCode,
						MICRCode: $rootScope.formData.fields.micrCode,
						AccountNumber: $rootScope.formData.fields.raccNumber,
						AccountTypeId: 1,
						BrowserType: $rootScope.formData.browserType,
						EncryptToken: $rootScope.EncryptToken,
						//AxisSignature: axisSign
						AxisSignature: "1"
					},
					IsDiy: true
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
							var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'));
							APIResponseModal.show();
							$rootScope.apiResponseErrorMsg = "Session Timed Out";
						}
					}

					if (response.IsSuccess) {
						var Bank_Info = new Object();
						Bank_Info.ifsc = $('#ifsc_value').val();
						Bank_Info.accountnumber = $rootScope.formData.fields.accountNumber;
						Bank_Info.raccountnumber = $rootScope.formData.fields.raccNumber;
						Bank_Info.bankID = $rootScope.formData.fields.bankID;
						var Bank_Info_Post = JSON.stringify(Bank_Info);
						Bank_Info_Stage = "Bank_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
						sessionStorage.setItem(Bank_Info_Stage, Bank_Info_Post);
						$rootScope.fourthCompleted = true;
						gtag('event', 'conversion', {
							'send_to': 'AW-727858862/8mQ0CNvpvdcaEK79iNsC',
							'value': 1.0,
							'currency': 'INR'
						});
						dataLayer.push({
							event: 'StageChange',
							attributes: {
								'level complete': '5',
								'IFSC': $rootScope.formData.fields.ifscCode,
								'AccountNumber': $rootScope.formData.fields.raccNumber
							}
						});
						$rootScope.getAPI = false;
						$rootScope.formData.noData = false;
						$rootScope.formData.ifscOption = false;

						$state.go('products', {
							mobile: $rootScope.formData.EncMobile
						});

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
						var connection = new bootstrap.Modal(document.getElementById('connection'));
							connection.show();
					}

				});
			}

			$scope.pennyValidation = function () {
				if ($rootScope.webJana || $rootScope.webfinacle || $rootScope.vcip ||$rootScope.formData.fields.bankID=="28" ||$rootScope.BYOD) {
					$scope.bankDataSubmit()
				} else {
					if($rootScope.BankEboStatus!="A"){
					//var s_url = 'BillDeskAccountValidation';
					var s_url = 'RazorpayAccountValidation';
					var pennySource = 'DIY';
					var loginId = 'Client';
					
					if($rootScope.formData.RMModule){
						pennySource = 'WebRM';
						loginId = $rootScope.formData.rmName;
					}
					
					var sendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber,
						AccountNumber: $rootScope.formData.fields.raccNumber,
						IFSCCode: $rootScope.formData.fields.ifscCode,
						PennydropSource: pennySource,
						PennydropLoginId: loginId
					};
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							if (response.IsNameMatched == true || response.IsNameMatched == 'true') {
								$scope.pennyValid = true;
								if ($rootScope.webkarvy) {
									var e_url = 'GenerateESignPDFForKarvy?PanNumber=' + $rootScope.karvyData.PANNO;
									$rootScope.formData.apiLoading = true;

									serverService.getApi(e_url).then(function (data) {
										var data = a.data;
										$rootScope.formData.apiLoading = false;
										if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
											frmMain.action = data.eSignApiUrl;
											$('#msg').val(data.requestXml);
											document.getElementById("frmMain").submit();
										} else if (data.data && data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
											frmMain.action = data.data.eSignApiUrl;
											$('#msg').val(data.data.requestXml);
											document.getElementById("frmMain").submit();
										} else {
											$rootScope.customerSMS = true;
											var customerSMSModal = new bootstrap.Modal(document.getElementById('customerSMS'));
											customerSMSModal.show();
											$rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
											return false;
										}
									});

								} else {
									$scope.bankDataSubmit();
								}
							} else {
								if (response.CustomerName) {
									$scope.pennyResponse = "Your name obtained from bank  '" + response.CustomerName + "', doesn't matches with name obtained from PAN site";
								} else {
									$scope.pennyResponse = "Your name obtained from bank doesn't matches with name obtained from PAN site";
								}
								var pennyModalPopup = new bootstrap.Modal(document.getElementById('pennyModal'));
								pennyModalPopup.show();
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
						} else {
							if ($rootScope.webkarvy) {
								$scope.karvyBankSubmit();
							} else {
								$scope.bankDataSubmit()
								/*	$scope.pennyResponse = "Please ensure your entered Bank Account number is correct.";
								$('#pennyModal').modal({
								backdrop: 'static',
								keyboard: false
								});*/

							}
						}
					});
				}else{
					$scope.bankDataSubmit();
				}
				}
			}

			$scope.notAxisClient = function () {
				var nonAxis = "NonAxisClientMappingAxisBank?ReferenceNumber=" + sessionStorage.getItem('RxReferenceNumber');
				$('#myModal').modal('hide');
				serverService.getAPI(nonAxis).then(function (a) {});
			}

			$scope.karvyBankSubmit = function () {

				var surl = 'UpdateKarvyTcsCustomerInformation';
				var sData = {

					"DpsecCustomerInfo": {

						"PanNumber": $rootScope.karvyData.PANNO,

						"AcNo": $rootScope.formData.fields.accNumber,

						"BankName": $rootScope.formData.fields.bankName,

						"IfscCode": $rootScope.formData.fields.ifscCode,

						"MicrCode": $rootScope.formData.fields.micrCode,

						"BankAcType": "S",

						"Email": $rootScope.formData.fields.email,

						"Mobile": $rootScope.formData.fields.mobile

					}

				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(surl, sData).then(function (a) {
					var response = a.data;
					var s_url = "KarvyAccountValidation";
					var sendData = {
						PanNumber: $rootScope.karvyData.PANNO,
						AccountNumber: $rootScope.formData.fields.accNumber,
						IFSCCode: $rootScope.formData.fields.ifscCode,
						CustomerName: $rootScope.karvyData.CUSTOMER_NAME
					}

					serverService.apiCall(s_url, sendData).then(function (data) {
						$rootScope.formData.apiLoading = false;
						$state.go('docUpload');
					})

				})
			}

			$scope.bankValidate = function () {
				$rootScope.formData.fields.accountNumber = $rootScope.formData.fields.accNumber;
				var error = 0;
				if (!$rootScope.webfinacle && !$rootScope.webJana) {
					$rootScope.formData.fields.ifscCode = $('#ifsc_value').val();
				}
				if (!$rootScope.webkarvy) {
					if ($rootScope.formData.fields.bankID == null || $rootScope.formData.fields.bankID == '') {
						$scope.bankNameError = true;
						error++;
					}
				}
				$rootScope.formData.fields.ifscCode = $rootScope.formData.fields.ifscCode.trim();
				if ($rootScope.formData.fields.ifscCode == null || $rootScope.formData.fields.ifscCode == '' || $rootScope.formData.fields.ifscCode.length != 11 || $rootScope.ifscError) {
					$rootScope.ifscError = true;
					error++;
				}
				if ($rootScope.webkarvy) {
					$scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
					if ($rootScope.formData.fields.bankName == null || $rootScope.formData.fields.bankName == '') {
						$scope.karvybankNameError = true;
						$scope.bankNameError = false;
						error++;
					} else {
						$scope.karvybankNameError = false;
						$scope.bankNameError = false;
					}
					// if($('#karvytxtDOB').val() ==""){
					// 	$scope.dobError = true;
					// 	error++;
					// }
					// if($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == ''){
					// 	$scope.invalidMobile = true;
					// 	error++;
					// }
					if ($rootScope.formData.fields.mobile == null || $rootScope.formData.fields.mobile == '') {
						$scope.emptyMobile = true;
						error++;
						$('#mobile').focus();
					} else if ($rootScope.mobileNumberValidation($rootScope.formData.fields.mobile) == false) {
						$scope.invalidMobile = true;
						$scope.emptyMobile = false;
						error++;
						$('#mobile').focus();
					} else {
						$scope.invalidMobile = false;
						$scope.emptyMobile = false;
					}
					// if($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == ''){
					// 	$scope.invalidEmail = true,
					// 	error++;
					// }
					if ($rootScope.formData.fields.email == null || $rootScope.formData.fields.email == '') {
						$scope.emptyEmail = true;
						error++;
						$('#emailID').focus();
					} else if (!($scope.filter).test($rootScope.formData.fields.email)) {
						$scope.invalidEmail = true;
						error++;
						$('#emailID').focus();
					} else {
						var e = $rootScope.formData.fields.email.split('@');
						var c = e[0];
						if (c.search('notprovided') != -1 || c.search('noemail') != -1 || c.search('xyz') != -1 || c.search('abc') != -1) {
							$scope.invalidEmail = true;
							error++;
							$('#emailID').focus();
						} else {
							$scope.invalidEmail = false;
							$scope.emptyEmail = false;
						}
					}
				}
				if ($rootScope.webfinacle && $scope.finMulti) {
					if (!$('#accNumber').val() || !$("#accNumber option:selected").text()) {
						$('#accNumber').focus();
						$scope.accInvalid = true;
						error++;
						return false;
					}else{
						$rootScope.formData.fields.accountNumber = $("#accNumber option:selected").text();
						$rootScope.formData.fields.raccNumber = $("#accNumber option:selected").text();
					}
				}
				var c = $rootScope.formData.fields.accountNumber.length;
				var bfilter = /^(?=.*?[1-9])\d+(\.\d+)?$/;
				if ($rootScope.formData.fields.accountNumber == null || $rootScope.formData.fields.accountNumber == '' || ($rootScope.formData.fields.accountNumber).length < 6) {
					$scope.accInvalid = true;
					error++;

				} else if (!(bfilter).test($rootScope.formData.fields.accountNumber)) {
					$scope.accInvalid = true;
					error++;
				} else if ($rootScope.formData.fields.accountNumber != $rootScope.formData.fields.raccNumber) {
					$scope.accountMismatch = true;
					error++;
				} else {
					$scope.accountMismatch = false;
				}

				if (error == 0) {
					const path = `GetAccountNumberVerificationDiy`;
				let payload = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : sessionStorage.getItem('RxReferenceNumber'),
					AccountNumber: $rootScope.formData.fields.raccNumber
				}
				$rootScope.formData.apiLoading = true;
				$scope.bankStageError = "";
				payload = $rootScope.encryptReq(payload);
				serverService.apiCall(path, payload).then(function (a) {
					const response = $rootScope.decryptRes(a.data, 'Response');
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
					
					if (!$scope.accountValidation && (($scope.getaccNumber != $rootScope.formData.fields.accNumber) || ($scope.getifscCode != $rootScope.formData.fields.ifscCode))) {
						$scope.accountValidation = true
					}
					if ($rootScope.webkarvy && ($rootScope.formData.fields.accountNumber == $rootScope.karvyData.AC_NO) && ($rootScope.formData.fields.ifscCode == $rootScope.karvyData.IFSC_CODE) && ($rootScope.formData.fields.bankName == $rootScope.karvyData.BANK_NAME) && ($rootScope.formData.fields.micrCode == $rootScope.karvyData.MICR_CODE) && ($('#karvytxtDOB').val() == $rootScope.karvyData.DOB) && ($rootScope.formData.fields.mobile == $rootScope.karvyData.MOBILE) && ($rootScope.formData.fields.email == $rootScope.karvyData.EMAIL)) {
						$rootScope.KarvyesingProcess();
					} else if ($scope.accountValidation) {
						$scope.pennyValidation();
						$scope.accountValidation = false;
					} else {
						$scope.bankDataSubmit();
					}
					} else {
						$scope.bankStageError = response.ErrorMessage;
					}
				}, function(e) {
					$rootScope.formData.apiLoading = false;
				})
					
				}
			}

			window.onbeforeunload = function () {
				var Bank_Info = new Object();
				Bank_Info.ifsc = $('#ifsc_value').val();
				Bank_Info.accountnumber = $rootScope.formData.fields.accNumber;
				Bank_Info.raccountnumber = $rootScope.formData.fields.raccNumber;
				Bank_Info.bankID = $rootScope.formData.fields.bankID;
				var Bank_Info_Post = JSON.stringify(Bank_Info);
				Bank_Info_Stage = "Bank_Info_Stage" + "-" + sessionStorage.getItem("RxReferenceNumber");
				sessionStorage.setItem(Bank_Info_Stage, Bank_Info_Post);
			}

			$scope.bankBtn = function () {
				$('button.btn-primary').focus();
			}

			if (sessionStorage.getItem('finacle') || $rootScope.webfinacle) {
				$("#pBank").prop('disabled', true);
			}

			if (sessionStorage.getItem('janaData')) {
				$scope.janaInfoData = JSON.parse(sessionStorage.getItem('janaData'));
				$rootScope.formData.fields.raccNumber = $scope.janaInfoData.BankAccountNumber;
				$rootScope.formData.fields.accNumber = $scope.janaInfoData.BankAccountNumber;
				$rootScope.formData.fields.ifscCode = $scope.janaInfoData.IFSCCode;
				$rootScope.formData.fields.micrCode = $scope.janaInfoData.MICRCode;
				$rootScope.formData.fields.mobile = $scope.janaInfoData.MobileNumber;
				$rootScope.formData.fields.email = $scope.janaInfoData.EmailId;
				setTimeout(function () {
					$('#ifsc_value').val($rootScope.formData.fields.ifscCode);
				}, 500);
			}
			setTimeout(function () {

				if ($rootScope.webfinacle && sessionStorage.getItem('finData')) {
					$rootScope.formData.apiLoading = true;
					$scope.getFinData();
				} else if ($rootScope.webfinacle){

					var s_url = "GetFinacleCustomerDetails";

					var sendData = {
						PanNumber: $rootScope.formData.fields.panNumber
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						$rootScope.formData.apiLoading = false;
						var response = a.data;
						if (response.IsSuccess) {
							$scope.finData = response;
							$scope.pBankdisabled = true;

							if ($scope.finData.bankAccountDetails.length > 1) {
								$scope.finMulti = true;
								$rootScope.formData.fields.accNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
								$rootScope.formData.fields.raccNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
								//$scope.multiaccNumber = '0';
								$rootScope.formData.fields.bankID = '1';
								$rootScope.formData.fields.ifscCode = $scope.finData.bankAccountDetails[0].BranchIfscCode;
								setTimeout(function () {
									$(".select").select2();
								}, 500);
							} else {
								$('.IBBankDisabled').addClass('adisabled');
								$rootScope.formData.fields.accNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
								$rootScope.formData.fields.raccNumber = $scope.finData.bankAccountDetails[0].AccountNumber;
								$rootScope.formData.fields.bankID = '1';
								$rootScope.formData.fields.ifscCode = $scope.finData.bankAccountDetails[0].BranchIfscCode;
								$scope.typePasswordCAC = true;
								$scope.typePasswordAc = true;
								setTimeout(function () {
									$('#ifsc_value').val($scope.finData.bankAccountDetails[0].BranchIfscCode);
									$('#acc1').val($scope.finData.bankAccountDetails[0].AccountNumber);
									$('#cacc1').val($scope.finData.bankAccountDetails[0].AccountNumber);
									$(".select").select2();
									$("#pBank").prop('disabled', true);
								}, 500);
							}
							$rootScope.formData.apiLoading = false;
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
					}, function (e) {
						$rootScope.formData.apiLoading = false;
						var connection = new bootstrap.Modal(document.getElementById('connection'));
							connection.show();
					});
				}

			}, 100)

			$scope.acNumber = function (i) {
				$scope.accInvalid = false;
				if ($scope.finData.bankAccountDetails[i]) {
					$rootScope.formData.fields.ifscCode = $scope.finData.bankAccountDetails[i].BranchIfscCode;
					$rootScope.formData.fields.accNumber = $scope.finData.bankAccountDetails[i].AccountNumber;
					$rootScope.formData.fields.raccNumber = $scope.finData.bankAccountDetails[i].AccountNumber;
					$rootScope.ifscError = false;
				}
			}

			$scope.janabankData = function () {
				$rootScope.formData.fields.accNumber = sessionStorage.getItem('AccountNumber');
				$rootScope.formData.fields.raccNumber = sessionStorage.getItem('AccountNumber');
				// $rootScope.formData.fields.bankID = '9';
				setTimeout(function () {
					$('#ifsc_value').val(sessionStorage.getItem('IFSCCode'));
					$("#ifsc_value").prop('disabled', true);
					$(".select").select2();
				}, 500);
			}
			setTimeout(function () {
				if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank) {
					$rootScope.janabank = true;
					$scope.janabankData();
				}
			}, 1000)
			setTimeout(function () {
				$("#karvytxtDOB").datepicker({
					changeMonth: true,
					changeYear: true,
					minDate: "-100Y",
					maxDate: "-18Y",
					dateFormat: 'dd/mm/yy',
					yearRange: "-100: -18",
					onSelect: function () {
						$('#karvytxtDOB').removeClass('ng-empty');
						$('#karvytxtDOB').addClass('ng-not-empty');
						$scope.dobError = false;
						$rootScope.formData.hideBtn = false;
						$scope.$apply();
					}
				});

				$("#karvytxtDOB").datepicker("option", "showAnim", "blind");
			}, 100)
		}
	]);
