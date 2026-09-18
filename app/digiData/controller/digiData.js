mainApp.controller('digiDataController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
			if ($rootScope.formData.RMModule) {
				if ($rootScope.getAPI) {
					if (sessionStorage.getItem('AxNo') != null) {
						$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
						$rootScope.getDIYStatus();
					} else {
						window.location.href = (serverService.getHome());
					}
				}
				$scope.sendUrl = function () {
					var s_geturl = "GetOverallStatusDIY";
					$rootScope.formData.apiLoading = true;
					var getsendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber
					};
					serverService.apiCall(s_geturl, getsendData).then(function (a) {
						$rootScope.formData.apiLoading = false;
						var getresponse = a.data;
						if (getresponse.Digioption == 'FMF') {
							$state.go('address');
						} else {

							$rootScope.digiLockerCount = getresponse.DigilockerCount;

							if (getresponse.OverallStatusList[0].KRAClient == 'Y') {
								$rootScope.formData.KRA = true;
							}

							if (getresponse.OverallStatusList[0].CKYCClient == 'Y') {
								$rootScope.formData.CKYC = true;
							}

							if ($rootScope.digiLockerCount < 2) {
								let url = "DigilockerEmailSMS";
								let sendData = {
									"Email": $rootScope.formData.fields.rmemail,
									"Mobile": $rootScope.formData.fields.rmmobile,
									"ReferenceNumber": $rootScope.formData.eRefNumber,
									"pan_no": $rootScope.formData.fields.panNumber,
									"IsWebRm": true
								}
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(url, sendData).then(function (a) {
									$rootScope.formData.apiLoading = false;
									let response = a.data;
									if (response.IsSuccess) {
										$scope.urlSent = true;
										$rootScope.formData.digiRef = response.ref_no;
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
										$('#digilocker').modal('hide');
										$('#digilockerError').modal('hide');
										$('#digilockerFail').modal('hide');
										$('#digilockerFail1').modal('hide');
										// $rootScope.formData.digiData = false;
										// $state.go('address');
										var digilockerFail1 = new bootstrap.Modal(document.getElementById('digilockerFail'), {
											backdrop: 'static',
											keyboard: false
										});
										digilockerFail1.show();
									}
								})
							} else {
								$rootScope.digiCountError = true;
								$rootScope.rmDigiRedirect = true;
								var digilockerError = new bootstrap.Modal(document.getElementById('digilockerError'), {
										backdrop: 'static',
										keyboard: false
									});
								digilockerError.show();
							}
						}
					});
				}
				$scope.sendUrl();
				$scope.formFilling = function () {
					$rootScope.formData.digiData = false;
					$state.go('address');
				}

				$scope.fetchStatus = function () {
					var s_geturl = "GetOverallStatusDIY";
					$rootScope.formData.apiLoading = true;
					var getsendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber
					};
					serverService.apiCall(s_geturl, getsendData).then(function (a) {
						$rootScope.formData.apiLoading = false;
						var getresponse = a.data;
						if (getresponse.Digioption == 'FMF') {
							$state.go('address');
						} else {
							$rootScope.digiLockerCount = getresponse.DigilockerCount;
							if ($rootScope.digiLockerCount < 2) {
								var url = "Digilockerfetchdetails";
								var sendData = {
									"DigiRef_no": getresponse.DigiReferenceNumber ? getresponse.DigiReferenceNumber : $rootScope.formData.digiRef
								}
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(url, sendData).then(function (res) {
									$rootScope.formData.apiLoading = false;
									var response = res.data.data;
									var response1=res.data
									if(!response1.IsSuccess && response1.ErrorCode=="505"){
										var digilockerFetchFail = new bootstrap.Modal(document.getElementById('digilockerFetchFail'), {
											backdrop: 'static',
											keyboard: false
										});
										digilockerFetchFail.show();
										return false
									}
									if (response.eaadhaar_data) {
										$rootScope.formData.digilockerData = response.eaadhaar_data;
										$rootScope.formData.digilockerPanData = response.pan_data;
										$rootScope.formData.digiData = true;
										sessionStorage.setItem('digiInfo', JSON.stringify(response.eaadhaar_data));
										$rootScope.getDIYStatusAPI = false;
										if ($rootScope.formData.digilockerPanData.number) {
											if ($rootScope.formData.fields.panNumber != $rootScope.formData.digilockerPanData.number) {
												$rootScope.formData.digilockerData = '';
												$rootScope.formData.digilockerPanData = '';
												$rootScope.formData.digiData = false;
												sessionStorage.removeItem('digiInfo');
												sessionStorage.removeItem('digi');
												return false;
											}
										} else {

											$state.go('address');
										}
										$rootScope.getDIYStatus();
									} else {
										if ($rootScope.digiLockerCount < 2) {}
										else {
											$rootScope.formData.digilockerData = '';
											$rootScope.formData.digilockerPanData = '';
											$rootScope.formData.digiData = false;
											sessionStorage.removeItem('digiInfo');
											sessionStorage.removeItem('digi');
											$rootScope.digiCountError = true;
											$rootScope.rmDigiRedirect = true;
											var digilockerError = new bootstrap.Modal(document.getElementById('digilockerError'), {
													backdrop: 'static',
													keyboard: false
												});
											digilockerError.show();
										}
									}
								});
							} else {
								$rootScope.digiCountError = true;
								$rootScope.rmDigiRedirect = true;
								var digilockerError = new bootstrap.Modal(document.getElementById('digilockerError'), {
										backdrop: 'static',
										keyboard: false
									});
								digilockerError.show();
							}
						}
					});
				}

				$scope.digiLocker = function () {
					var apiurl = "Digilockercreate";
					var sendData = {
						"pan_no": $rootScope.formData.fields.panNumber,
						"ReferenceNumber": $rootScope.formData.eRefNumber,
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(apiurl, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							$scope.hideDigiBtn = true;
							$rootScope.digilockerUrl = response.digilocker_url;
							$rootScope.formData.digiRef = response.ref_no;
							window.open(response.digilocker_url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
							$rootScope.getDigiData();
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
							var digilockerFail = new bootstrap.Modal(document.getElementById('digilockerFail'), {
								backdrop: 'static',
								keyboard: false
							});
							digilockerFail.show();
							// $state.go('address');
						}
					})
				}
			} else {
				sessionStorage.clear();
				$rootScope.emailMobile = true;
				$rootScope.pan = false;
				$state.go('register');
			}
		}
	]);
