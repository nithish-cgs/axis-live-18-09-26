function imgUpld(id) {
	angular.element(document.getElementById(id)).scope().imgUpload(id);
}
function delImg(a) {
	angular.element(document.getElementById(a)).scope().delImg(a);
}
function setUrl(a, b) {
	if (b == 'pdf') {
		$("#imgBig").css('display', 'none');
		$("#pdfBig").css('display', 'block');
		var showPicture = document.querySelector("#pdfBig");
		showPicture.src = "data:application/pdf;base64," + a;
	} else {
		$("#imgBig").css('display', 'block');
		$("#pdfBig").css('display', 'none');
		var showPicture = document.querySelector("#imgBig");
		showPicture.src = "data:image/jpeg;base64," + a;
	}
}
mainChatApp.controller('documentController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {

			var searchObject = $location.search();
			$scope.signatureUpld = true;
			if (!angular.isUndefined(searchObject.ReferenceNumber)) {
				sessionStorage.removeItem('AxToken');
				$rootScope.EncryptToken = '';
				sessionStorage.setItem('AxNo', searchObject.ReferenceNumber);
			}
			if (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && $rootScope.formData.makePayment && !$rootScope.formData.skippedPayment) {
				$state.go('products', {
					mobile: $rootScope.formData.EncMobile
				});
				sessionStorage.setItem('productStage', true)
			} else {
				sessionStorage.removeItem('productStage')
			}
			if (!angular.isUndefined(searchObject.eSignFailure)) {
				$('#APIResponse').modal({
					backdrop: 'static',
					keyboard: true
				})
				$rootScope.apiResponseErrorMsg = 'Esign process is incomplete, please try again.';
			}

			if ($rootScope.formData.paymentPixel) {
				var p_url = "GetPayamentDetailsByReferenceNumber?ReferenceNumber=" + $rootScope.formData.eRefNumber;
				serverService.getApi(p_url).then(function (a) {
					var response = a.data
						if (response.IsSuccess) {
							var iframe = document.createElement('iframe');
							iframe.style.display = "none";
							iframe.src = "https://blustream81.gotrackier.com/pixel?adid=614983d8a88f135041633c5a&goal_value=" + $rootScope.formData.ReferenceNumber + "&txn_id=" + response.MerchantTransactionID + "&sub1=&sub2=&sub3=&sub4=&sale_amount=" + response.Amount;
							document.body.appendChild(iframe);
						}
				})
			}

			$rootScope.formData.stageInfo = '6';
			$rootScope.formData.stageOrder = 6;
			$scope.panImageValidation = '';
			$scope.sigImageValidation = '';
			$scope.photoProofImageValidation = '';
			$scope.chequeImageValidation = '';
			$scope.caddressProofImageValidation = '';
			$scope.paddressProofImageValidation = '';
			$scope.incomeProofImageValidation = '';
			$scope.poaImageValidation = '';
			$scope.tcImageValidation = '';
			$scope.amImageValidation = '';
			$scope.cmlImageValidation = '';
			$scope.AadhaarBackImg = false;
			$scope.panSample = false;
			$scope.signatureSample = false;
			$scope.photoSample = false;
			$scope.chequeSample = false;
			$scope.documentSample = false;
			$scope.pdocumentSample = false;
			$scope.panUpld = true;
			$scope.photoUpld = true;
			$scope.addressUpld = true;
			$rootScope.getAPI = true;
			$scope.otpSuccess = false;
			$scope.hideEsign = false;
			$scope.docImgCompleted = false;
			$scope.IsSelfi = 'N';
			$scope.showlinktoCustomer = true;
			$scope.validateImgFlag = true;
			$scope.cmlShow = false;
			if (!sessionStorage.getItem('selfielatitude') && !sessionStorage.getItem('selfielongitude')) {
				$scope.takeSelfieDisabled = true;
			} else {
				$scope.takeSelfieDisabled = false;
				$rootScope.formData.latitude = sessionStorage.getItem('selfielatitude');
				$rootScope.formData.longitude = sessionStorage.getItem('selfielongitude');
			}

			var options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};
			function success(pos) {
				var crd = pos.coords;
				if (crd.latitude && crd.longitude) {
					var latitude = crd.latitude;
					var longitude = crd.longitude;

					sessionStorage.setItem('selfielatitude', latitude)
					$rootScope.formData.latitude = sessionStorage.getItem('selfielatitude');
					sessionStorage.setItem('selfielongitude', longitude)
					$rootScope.formData.longitude = sessionStorage.getItem('selfielongitude');

					if (latitude && longitude) {
						$scope.takeSelfieDisabled = false;
						$scope.$apply();
					}
				} else {}

			}

			function error(err) {
				if (err.code == 1) {
					$("#takeselfiedis").attr('disabled', true);
					$scope.takeSelfieDisabled = true;
					sessionStorage.setItem('selfielatitude', '')
					sessionStorage.setItem('selfielongitude', '')
				} else if (err.code == 2) {
					$scope.takeSelfieDisabled = true;
					$scope.takeSelfieUnavailableStatus = true;
				}
				$scope.$apply();
			}

			navigator.geolocation.getCurrentPosition(success, error, options);
			$rootScope.handlePermission = function () {
				var options = {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				};
				navigator.geolocation.getCurrentPosition(success, error, options);
				navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false
				})
				.then(function (stream) {
					if (!$rootScope.formData.isMobile) {
						video.srcObject = stream;
						video.play();
					}
					$scope.cameraDisabled = false;
					$scope.$apply();

				})
				.catch(function (err) {
					console.log(err)
					$scope.cameraDisabled = true;
					$scope.$apply();
				});
			}
			$rootScope.handlePermission();

			$scope.camModal = function () {
				navigator.permissions.query({
					name: 'camera'
				})
				.then((permissionObj) => {
					if (permissionObj.state == 'denied') {
						$scope.cameraDisabled = true;
					} else {
						if (!$scope.takeSelfieDisabled) {
							$('#cammodal').modal();
						}
					}
					$scope.$apply();
				})
				.catch((error) => {
					console.log('Got error :', error);
				})
			}

			if (sessionStorage.getItem('IsAadharVerified') == 'true') {
				$rootScope.formData.fields.DocsaddressProof = '111';
				$scope.formData.AadharSuccess = JSON.parse(sessionStorage.getItem('IsAadharVerified'));
			}

			if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
				if (sessionStorage.getItem('AxNo') != null) {
					$rootScope.getAPI = false;
					$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
					setTimeout(function () {
						$rootScope.getDIYStatus();
					}, 500);

				} else {
					window.location.href = (serverService.getHome());
				}
			}

			if (!$rootScope.formData.ReferenceNumber && sessionStorage.getItem('RxReferenceNumber')) {
				$rootScope.formData.ReferenceNumber = sessionStorage.getItem('RxReferenceNumber');
			}

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
						if (response.BankDetailsList[0].UTMBankName) {
							$scope.cmlShow = true;
						}
					}
				}
			})

			var s_url = "DIYGetDocumentProofStageByReferenceNumber";

			var sendData = {
				ReferenceNumber: $rootScope.formData.ReferenceNumber
			};

			serverService.apiCall(s_url, sendData).then(function (a) {
				var response = a.data
					if (response.IsSuccess) {

						if (response.ObjCDIYRegistration.IsNominee1) {
							$scope.NomineeOne = true
						}
						if (response.ObjCDIYRegistration.IsNominee2) {
							$scope.NomineeTwo = true
						}
						if (response.ObjCDIYRegistration.IsNominee3) {
							$scope.NomineeThree = true
						}
						if (response.ObjCDIYRegistration.IsGuardian1) {
							$scope.GuardianOne = true
						}
						if (response.ObjCDIYRegistration.IsGuardian2) {
							$scope.GuardianTwo = true
						}
						if (response.ObjCDIYRegistration.IsGuardian3) {
							$scope.GuardianThree = true
						}
						if (sessionStorage.getItem('finacle') == "true" || sessionStorage.getItem('finacle') == true) {
							$rootScope.webfinacle = true
						}
						if (sessionStorage.getItem('IsCKYC') == 'true' || sessionStorage.getItem('IsCKYC') == true) {
							$rootScope.formData.CKYC = true
						} else {
							$rootScope.formData.CKYC = false
						}
						if (sessionStorage.getItem('IsKRA') == "Y" || sessionStorage.getItem('IsKRA') == "true") {
							$rootScope.formData.KRA = true
						} else {
							$rootScope.formData.KRA = false
						}

						if (response.ObjCDIYRegistration.UTMBankShortCode == "SSWB") {
							sessionStorage.setItem('sarasbank', true);
							$rootScope.sarabank = true
						} else {
							$rootScope.sarabank = false
								sessionStorage.setItem('sarasbank', false);
						}
						if (response.ObjCDIYRegistration.FandOStatus == 1) {
							$scope.foImgUpld = true;

						} else {
							$scope.foImgUpld = false;

							if ($rootScope.formData.isgDocSkip) {
								sessionStorage.removeItem('isgEsign')
								/*$('#downloadPOA').modal({
								keyboard: false,
								backdrop: 'static'
								});*/
								$state.go('complete', {
									mobile: $rootScope.formData.EncMobile
								});
							}
						}

						if (response.ObjCDIYRegistration.IsAadharEdit == 1) {
							$scope.paddrUpld = false;
							$scope.cAddressDisable = true;
						} else {
							$scope.paddrUpld = true;
							$scope.cAddressDisable = false;
						}

						if (response.ObjCDIYRegistration.SamePermanentStatus == 1) {
							$scope.paddrUpld = false;
						} else {
							$scope.paddrUpld = true;
						}

						if (response.ObjCDIYRegistration.IsCMLDocument || sessionStorage.getItem('isCMLMandatory') == "1") {
							$scope.cmlUpld = true;
							$scope.cmlShow = true;
						} else {
							$scope.cmlUpld = false;
						}
						if (response.ObjCDIYRegistration.CorAddrsddNewddl == 'False') {
							$rootScope.formData.cList = $rootScope.formData.newDocumentTypeList.reduce((acc, eachArr2Elem) => {
									if ($rootScope.formData.corressDocList.findIndex((eachArr1Elem) => eachArr1Elem.DocumentTypeId === eachArr2Elem.DocumentTypeId) === -1) {
										acc.push(eachArr2Elem)
									}
									return acc
								}, [...$rootScope.formData.corressDocList]);
						} else {
							$rootScope.formData.cList = $rootScope.formData.corressDocList;
						}
						if (response.ObjCDIYRegistration.PerAddrsddNewddl == 'False') {
							$rootScope.formData.pList = $rootScope.formData.newDocumentTypeList.reduce((acc, eachArr2Elem) => {
									if ($rootScope.formData.pDocList.findIndex((eachArr1Elem) => eachArr1Elem.DocumentTypeId === eachArr2Elem.DocumentTypeId) === -1) {
										acc.push(eachArr2Elem)
									}
									return acc
								}, [...$rootScope.formData.pDocList]);
						} else {
							$rootScope.formData.pList = $rootScope.formData.pDocList;
						}

						if (response.ObjCDIYRegistration.KRAClient == 1) {
							$scope.ckycKRA = true;
							//$scope.panUpld = false;
							if (response.ObjCDIYRegistration.Pennydrop == 1) {
								if (response.ObjCDIYRegistration.AxisBank == 1) {
									$scope.ckycPennyAxis = true;
									$scope.axisCustomer = true;
									//$scope.displayForm();
								} else {
									//$scope.signatureUpld = true;
								}
							} else {
								$scope.chequeUpld = true;
								if (response.ObjCDIYRegistration.AxisBank == 1) {
									$scope.axisCustomer = true;
									//$scope.signatureUpld = false;
								} else {
									//$scope.signatureUpld = true;
								}
							}

						} else {

							$scope.ckycKRA = false;
							if (response.ObjCDIYRegistration.Pennydrop == 1) {
								if (response.ObjCDIYRegistration.AxisBank == 1) {}
								else {
									//$scope.signatureUpld = true;
								}
							} else {
								$scope.chequeUpld = true;
								if (response.ObjCDIYRegistration.AxisBank == 1) {
									//$scope.signatureUpld = false;
								} else {
									//$scope.signatureUpld = true;
								}
							}
						}

						if (response.ObjCDIYRegistration.IsKRAEdit == '1' || response.ObjCDIYRegistration.CKYCUpdate == '1') {
							$scope.panUpld = true;
							//$scope.signatureUpld = true;
							$scope.photoUpld = true;
							$scope.addressUpld = true;
						}

						if ($rootScope.webfinacle && $rootScope.formData.CKYC) {
							$rootScope.ibDocumentHide = true;
							$rootScope.ibCkycDocumentShow = true;
							$scope.photoUpld = true;
							if (response.ObjCDIYRegistration.Pennydrop != 1) {
								$scope.chequeUpld = true;
							}
						}
					} else {
						$rootScope.formData.apiLoading = false;
					}
					if (!$rootScope.formData.docStageRejected) {
						$scope.panImageUpdt = false;
						$scope.signatureUpdt = false;
						$scope.photoImageUpdt = false;
						$scope.cAddressUpdt = false;
						$scope.pAddressUpdt = false;
						$scope.pAddressUpdt = false;
					}
			});
			var s_geturl = "GetOverallStatusByReferenceNumberWB";
			$rootScope.formData.apiLoading = true;
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber
			};
			serverService.apiCall(s_geturl, sendData).then(function (a) {
				var response = a.data
					if (response.OverallStatusList[0].IsEmailVerified == true) {
						$rootScope.verifyemail = false;
					} else {
						$rootScope.verifyemail = true;
					}
					if (response.OverallStatusList[5].SPStatus == 'Y') {
						$scope.docImgCompleted = true;
					}
					if (response.OverallStatusList[9].SPStatus == 'Y') {
						$scope.esignCompleted = true;
					}
					if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[9].KRAClient == 'Y' && (response.OverallStatusList[9].CKYCClient != 'Y' || response.OverallStatusList[9].KRAClient != 'Y')) {
						$scope.ipvStage = true;
					}
					if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[0].CKYCClient == 'Y' && response.OverallStatusList[0].KRAClient == 'Y') {
						$scope.lastStage = true;
					}
			});
			setTimeout(function () {
				$(".select").select2();
			}, 500);
			$('#agree-terms').prop('checked', true);

			$(".input-upload").fileinput({
				'showUpload': false,
				'browseLabel': 'UPLOAD',
				'browseIcon': '',
				'previewFileType': 'any'
			});
			$(".input-upload-front").fileinput({
				'showUpload': false,
				'browseLabel': 'FRONT IMAGE',
				'browseIcon': '',
				'previewFileType': 'any'
			});
			$(".input-upload-back").fileinput({
				'showUpload': false,
				'browseLabel': 'BACK IMAGE',
				'browseIcon': '',
				'previewFileType': 'any'
			});
			$('.customcheckradio').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal'
			});
			$('.info-cat').bind('mouseover touchstart', function () {
				$(this).siblings('.info-details').show();
				$(this).parents('p').siblings('.info-details').show();
			});

			$('.info-cat').bind('mouseleave touchend', function () {
				$(this).siblings('.info-details').hide();
				$(this).parents('p').siblings('.info-details').hide();
			});

			$scope.imgUpload = function (imgName) {
				var imageName = imgName;

				var filesSelected = document.getElementById(imgName).files;

				var fileSize = (filesSelected[0].size);

				var fileName = document.getElementById(imgName).value;

				var preview = document.getElementById("preview");
				if (imgName == 'takeselfie') {
					imgName = 'ClientPhoto';
					imageName = 'ClientPhoto';
					$scope.selfTrue = true;
				} else {
					$scope.selfTrue = false;
					$scope.takeSelfieDisabled = false;
				}
				if (imgName == 'Income' || imgName == 'CMLDOCUMENT') {
					var allowed_extensions = new Array("jpg", "png", "jpeg", "pdf");
				} else {
					var allowed_extensions = new Array("jpg", "png", "jpeg");
				}

				var file_extension = fileName.split('.').pop();
				file_extension = file_extension.toLowerCase();
				var file_index = allowed_extensions.indexOf(file_extension);

				$('#badImage').modal('hide');
				if (file_index <= 2 && file_index >= 0) {
					$scope.FileType = "Image";
					if (imgName == "PANNumber" || imgName == "RePANNumber") {
						imgName = "PANNumber";
						imageName = "PANNumber";
						$scope.panSizeError = false;
						$scope.panQImgError = false;
						$scope.panCNImgError = false;
						if (fileSize > 4194304) {
							$scope.panSizeError = true;
						} else {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						}

						$scope.$apply();
					} else if (imgName == "ClientPhoto") {
						$scope.photoSizeError = false;
						if (!$scope.selfTrue && fileSize > 4194304) {
							$scope.photoSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "Aadhar") {
						$scope.aadharSizeError = false;
						if (fileSize > 4194304) {
							$scope.aadharSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "BankCheque" || imgName == "ReBankCheque") {
						imgName = "BankCheque";
						imageName = "BankCheque";
						$scope.bankSizeError = false;
						$scope.bankCNImgError = false;
						$scope.bankQImgError = false;
						if (fileSize > 4194304) {
							$scope.bankSizeError = true;
						} else {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "SPECIMENPROOF") {
						$scope.signatureSizeError = false;
						if (fileSize > 4194304) {
							$scope.signatureSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == 'CorrespondenceAddress' || imgName == 'ReCorrespondenceAddress') {
						imgName = 'CorrespondenceAddress';
						imageName = 'CorrespondenceAddress';
						$scope.cSizeError = false;
						$scope.cAddressQImgError = false;
						$scope.cAddressCNImgError = false;
						if (fileSize > 4194304) {
							$scope.cSizeError = true;
							$scope.$apply();
						} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						} else {
							$('#CorrespondenceAddress').val('');
							$("#cAddressImage .file-input").empty();
							$scope.ctypeError = true;
						}
					} else if (imgName == 'CorrespondenceAddress2' || imgName == 'ReCorrespondenceAddress2') {
						imgName = 'CorrespondenceAddress2';
						imageName = 'CorrespondenceAddress2';
						$scope.cSizeError = false;
						$scope.cAddressQImgError = false;
						$scope.cAddressCNImgError = false;
						if (fileSize > 4194304) {
							$scope.cSizeError = true;
							$scope.$apply();

						} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						} else {
							$('#CorrespondenceAddress2').val('');
							$("#cAddressImage2 .file-input").empty();
							$scope.ctypeError = true;
							$scope.$apply();
						}
					} else if (imgName == 'PermenantAddress' || imgName == 'RePermenantAddress') {
						imgName = 'PermenantAddress';
						imageName = 'PermenantAddress';
						$scope.pSizeError = false;
						$scope.pAddressQImgError = false;
						$scope.pAddressCNImgError = false;
						if (fileSize > 4194304) {
							$scope.pSizeError = true;
							$scope.$apply();
						} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						} else {
							$('#PermenantAddress').val('');
							$("#pAddressImage .file-input").empty();
							$scope.ptypeError = true;
							$scope.$apply();
						}

					} else if (imgName == 'PermenantAddress2' || imgName == 'RePermenantAddress2') {
						imgName = 'PermenantAddress2';
						imageName = 'PermenantAddress2';
						$scope.pSizeError = false;
						$scope.pAddressQImgError = false;
						$scope.pAddressCNImgError = false;
						if (fileSize > 4194304) {
							$scope.pSizeError = true;
							$scope.$apply();
						} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
							$rootScope.formData.apiLoading = true;
							$scope.readfiles(filesSelected, imageName);
						} else {
							$('#PermenantAddress2').val('');
							$("#pAddressImage2 .file-input").empty();
							$scope.ptypeError = true;
							$scope.$apply();
						}
					} else if (imgName == 'Income') {
						$scope.iSizeError = false;
						if (fileSize > 4194304) {
							$scope.iSizeError = true;
							$scope.$apply();
						} else if ($rootScope.formData.fields.foDocumentProof != '0' && $rootScope.formData.fields.foDocumentProof) {
							$scope.readfiles(filesSelected, imageName);
						} else {
							$('#Income').val('');
							$("#incomeImage .file-input").empty();
							$scope.itypeError = true;
							$scope.$apply();
						}
					} else if (imgName == "RMSIGNATURE") {
						$scope.tcSizeError = false;
						if (fileSize > 4194304) {
							$scope.tcSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "ADDITIONALDOC1") {
						$scope.adocSizeError = false;
						if (fileSize > 4194304) {
							$scope.adocSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "ADDITIONALDOC2") {
						$scope.adocSizeError = false;
						if (fileSize > 4194304) {
							$scope.adocSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "ADDITIONALDOC3") {
						$scope.adocSizeError = false;
						if (fileSize > 4194304) {
							$scope.adocSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "CMLDOCUMENT") {
						$scope.cmlSizeError = false;
						if (fileSize > 4194304) {
							$scope.cmlSizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "NOMINEE1") {
						$scope.nominee1SizeError = false;
						if (fileSize > 4194304) {
							$scope.nominee1SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "NOMINEE2") {
						$scope.nominee2SizeError = false;
						if (fileSize > 4194304) {
							$scope.nominee2SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "NOMINEE3") {
						$scope.nominee3SizeError = false;
						if (fileSize > 4194304) {
							$scope.nominee3SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "GUARDIAN1") {
						$scope.guardian1SizeError = false;
						if (fileSize > 4194304) {
							$scope.guardian1SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "GUARDIAN2") {
						$scope.guardian2SizeError = false;
						if (fileSize > 4194304) {
							$scope.guardian2SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					} else if (imgName == "GUARDIAN3") {
						$scope.guardian3SizeError = false;
						if (fileSize > 4194304) {
							$scope.guardian3SizeError = true;
						} else {
							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					}

				} else {
					if (file_index == 3) {
						if (imgName == "Income") {
							$scope.iSizeError = false;
							if (fileSize > 4194304) {
								$scope.iSizeError = true;
								$scope.$apply();
							} else if ($rootScope.formData.fields.foDocumentProof != 0 && $rootScope.formData.fields.foDocumentProof) {
								if (filesSelected.length > 0) {
									$scope.pdfReadFn(filesSelected, imageName);
								}
							} else {
								$('#Income').val('');
								$("#incomeImage .file-input").empty();
								$scope.itypeError = true;
								$scope.$apply();
							}
						} else if (imgName == "CMLDOCUMENT") {
							$scope.iSizeError = false;
							if (fileSize > 4194304) {
								$scope.cmlSizeError = true;
								$('#CMLDOCUMENT').val('');
								$("#cmlImage .file-input").empty();
								$scope.$apply();
							} else {
								$scope.pdfReadFn(filesSelected, imageName);
							}
						}

					} else {
						if (imgName == "PANNumber") {
							$('#PANNumber').val('');
							$scope.pantypeError = true;
							$scope.$apply();
						}
						if (imgName == "ClientPhoto") {
							$('#ClientPhoto').val('');
							$scope.phototypeError = true;
							$scope.$apply();
						}

						if (imgName == "Aadhar") {
							$('#Aadhar').val('');
							$scope.aadhartypeError = true;
							$scope.$apply();
						}

						if (imgName == "CorrespondenceAddress") {
							$('#CorrespondenceAddress').val('');
							$scope.catypeError = true;
							$scope.$apply();
						}

						if (imgName == "CorrespondenceAddress2") {
							$('#CorrespondenceAddress2').val('');
							$scope.ca2typeError = true;
							$scope.$apply();
						}

						if (imgName == "PermenantAddress") {
							$('#PermenantAddress').val('');
							$scope.patypeError = true;
							$scope.$apply();
						}

						if (imgName == "PermenantAddress2") {
							$('#PermenantAddress2').val('');
							$scope.pa2ypeError = true;
							$scope.$apply();
						}

						if (imgName == "BankCheque") {
							$('#BankCheque').val('');
							$scope.banktypeError = true;
							$scope.$apply();
						}
						if (imgName == "SPECIMENPROOF") {
							$('#SPECIMENPROOF').val('');
							$scope.signaturetypeError = true;
							$scope.$apply();
						}

						if (imgName == "Income") {
							$('#Income').val('');
							$scope.incometypeError = true;
							$scope.$apply();
						}

						if (imgName == "RMSIGNATURE") {
							$('#RMSIGNATURE').val('');
							$scope.tctypeError = true;
							$scope.$apply();
						}

						if (imgName == "CMLDOCUMENT") {
							$('#CMLDOCUMENT').val('');
							$scope.cmltypeError = true;
							$scope.$apply();
						}

						if (imgName == "ADDITIONALDOC1") {
							$('#ADDITIONALDOC1').val('');
							$scope.adoctypeError = true;
							$scope.$apply();
						}

						if (imgName == "ADDITIONALDOC2") {
							$('#ADDITIONALDOC2').val('');
							$scope.adoc2typeError = true;
							$scope.$apply();
						}

						if (imgName == "ADDITIONALDOC3") {
							$('#ADDITIONALDOC3').val('');
							$scope.adoc3typeError = true;
							$scope.$apply();
						}
						if (imgName == "FIRSTPOA") {
							$('#FIRSTPOA').val('');
							$scope.poatypeError = true;
							$scope.$apply();
						}
						if (imgName == "SECONDPOA") {
							$('#SECONDPOA').val('');
							$scope.poa2typeError = true;
							$scope.$apply();
						}
						if (imgName == "NOMINEE1") {
							$('#NOMINEE1').val('');
							$scope.nominee1typeError = true;
							$scope.$apply();
						}
						if (imgName == "NOMINEE2") {
							$('#NOMINEE2').val('');
							$scope.nominee2typeError = true;
							$scope.$apply();
						}
						if (imgName == "NOMINEE3") {
							$('#NOMINEE3').val('');
							$scope.nominee3typeError = true;
							$scope.$apply();
						}
						if (imgName == "GUARDIAN1") {
							$('#GUARDIAN1').val('');
							$scope.guardian1typeError = true;
							$scope.$apply();
						}
						if (imgName == "GUARDIAN2") {
							$('#GUARDIAN2').val('');
							$scope.guardian2typeError = true;
							$scope.gu3ViewHide = false;
							$scope.$apply();
						}
						if (imgName == "GUARDIAN3") {
							$('#GUARDIAN3').val('');
							$scope.guardian3typeError = true;
							$scope.$apply();
						}
						if (imgName == "ADDRESSMODIFICATION") {
							$('#ADDRESSMODIFICATION').val('');
							$scope.amtypeError = true;
							$scope.$apply();
						}
					}
				}

			}

			$scope.readfiles = function (files, a) {
				var b = a;
				var existinginputs = document.getElementsByName('images[]');
				var existingcanvases = document.getElementsByTagName('canvas');
				while (existinginputs.length > 0) {
					form.removeChild(existinginputs[0]);
					preview.removeChild(existingcanvases[0]);
				}

				for (var i = 0; i < files.length; i++) {
					$scope.processfile(files[i], b);
				}
				files.value = "";
			}

			$scope.processfile = function (file, imgName) {
				// read the files

				var reader = new FileReader();
				reader.readAsArrayBuffer(file);

				reader.onload = function (event) {

					// blob stuff
					var blob = new Blob([event.target.result]); // create blob...
					window.URL = window.URL || window.webkitURL;
					var blobURL = window.URL.createObjectURL(blob); // and get it's URL

					// helper Image object
					var image = new Image();
					image.src = blobURL;
					// preview.appendChild(image); // preview commented out, I am using the canvas instead
					image.onload = function () {
						// have to wait till it's loaded
						var resized = $scope.resizeMe(image, imgName); // send it to canvas
						// put result from canvas into new hidden input
						var r_split = resized.split(",");

						$("#" + imgName + "Src").val(r_split[1]);
						//  $("#" + imgName + "").css({ "background": "url(" + resized + ") no-repeat center center", "background-size": "cover" });
						var showPicture = document.querySelector("#" + imgName + "img");
						//      showPicture.src = resized;
						$scope.update_img(imgName, r_split[1], resized);
					}
				};
			}
			$scope.resizeMe = function (img, imgName) {
				var canvas = document.createElement('canvas');

				var width = img.width;
				var height = img.height;
				if (imgName != 'BankCheque') {
					if (width > height) {
						if (width > 960) {
							height = Math.round(height *= 960 / width);
							width = 1280;
						}
					} else {
						if (height > 1280) {
							width = Math.round(width *= 1280 / height);
							height = 960;
						}
					}
				}
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width, height);
				return canvas.toDataURL("image/jpeg", 1);
			}

			$('select[name=caddr]').on('change', function (event) {
				if ($(this).val() == '111') {
					$scope.AadhaarBackImg = true;
				} else {
					$scope.AadhaarBackImg = false;
				}
				$scope.$apply();
			});

			$scope.update_img = function (imgName, imgValue, resized) {
				if (imgName == "CorrespondenceAddress") {
					$scope.catypeError = false;
					$scope.addressName = imgName;
					$rootScope.formData.caImage = imgValue;
					$scope.cafileType = $scope.FileType;
					if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
						$scope.ctypeError = false;
						$("#addressProof").removeClass("error");
						$scope.cAdrLoad = true;
						$("#cAddressImage .file-input").empty();
						$scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.DocsaddressProof);
					} else {
						$('#CorrespondenceAddress').val('');
						$("#cAddressImage .file-input").empty();
						$scope.ctypeError = true;
						$scope.cAdrLoad = false;
					}
				} else if (imgName == "CorrespondenceAddress2") {
					$scope.ca2typeError = false;
					$scope.addressName1 = imgName;
					$scope.cafileType2 = $scope.FileType;
					$rootScope.formData.caImage2 = imgValue;
					if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
						$scope.cAdrLoad2 = true;
						$scope.ctypeError = false;
						$scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.DocsaddressProof);
						$("#cAddressImage2 .file-input").empty();
						$("#addressProof").removeClass("error");
					} else {
						$('#CorrespondenceAddress2').val('');
						$("#cAddressImage2 .file-input").empty();
						$scope.cAdrLoad2 = false;
						$scope.ctypeError = true;
					}
				} else if (imgName == "PermenantAddress") {
					$scope.patypeError = false;
					$scope.permaddressName = imgName;
					$rootScope.formData.paImage = imgValue;
					$scope.pafileType = $scope.FileType;
					if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
						$scope.ptypeError = false;
						$scope.pAdrLoad = true;
						$("#pAddressImage .file-input").empty();
						$scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.pDocsaddressProof);
					} else {
						$('#PermenantAddress').val('');
						$("#pAddressImage .file-input").empty();
						$scope.pAdrLoad = false;
						$scope.ptypeError = true;
					}
				} else if (imgName == "PermenantAddress2") {
					$scope.pa2typeError = false;
					$scope.permaddressName1 = imgName;
					$rootScope.formData.paImage2 = imgValue;
					$scope.pafileType2 = $scope.FileType;
					if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
						$scope.ptypeError = false;
						$scope.pAdrLoad2 = false;
						$("#pAddressImage2 .file-input").empty();
						$scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.pDocsaddressProof);
					} else {
						$('#PermenantAddress2').val('');
						$("#pAddressImage2 .file-input").empty();
						$scope.pAdrLoad2 = false;
						$scope.ptypeError = true;
					}
				} else if (imgName == "Income") {
					$scope.incometypeError = false;
					$rootScope.formData.foImage = imgValue;
					$scope.foName = imgName;
					$scope.fofileType = $scope.FileType;
					$scope.foViewHide = false;
					if ($rootScope.formData.fields.foDocumentProof != 0 && $rootScope.formData.fields.foDocumentProof) {
						$scope.itypeError = false;
						$scope.incomeLoad = true;
						$("#incomeImage .file-input").empty();
						$scope.updateImage(imgName, imgValue, $scope.FileType, $rootScope.formData.fields.foDocumentProof);
					} else {
						$('#Income').val('');
						$("#incomeImage .file-input").empty();
						$scope.incomeLoad = false;
						$scope.itypeError = true;
					}
				} else {
					//$scope.chequeResized1 = resized;
					//$scope.chequeImage1 = imgValue;
					if (imgName == "PANNumber") {
						$('#PANNumber').val('');
						$('#panPhoto .file-input').empty();
						$scope.panLoad = true;
						$scope.pantypeError = false;
					}
					if (imgName == "ClientPhoto") {
						$('#ClientPhoto').val('');
						$('#clientImage .file-input').empty();
						$scope.cltLoad = true;
						$scope.phototypeError = false;
					}

					if (imgName == "Aadhar") {
						$('#Aadhar').val('');
						$('#aadharImage .file-input').empty();
						$scope.aadharLoad = true;
						$scope.aadhartypeError = false;
					}
					if (imgName == "BankCheque") {
						$('#BankCheque').val('');
						$('#bankImage .file-input').empty();
						$scope.bankLoad = true;
						$scope.banktypeError = false;
					}
					if (imgName == "SPECIMENPROOF") {
						$('#SPECIMENPROOF').val('');
						$('#clientSignature .file-input').empty();
						$scope.signatureLoad = true;
						$scope.signaturetypeError = false;
					}
					if (imgName == "RMSIGNATURE") {
						$('#RMSIGNATURE').val('');
						$('#RMSIGNATUREIMAGE .file-input').empty();
						$scope.tcLoad = true;
						$scope.tctypeError = false;
					}
					if (imgName == "CMLDOCUMENT") {
						$('#CMLDOCUMENT').val('');
						$('#cmlImage .file-input').empty();
						$scope.cmlLoad = true;
						$scope.cmltypeError = false;
						$scope.cmlViewHide = false;
					}
					if (imgName == "ADDITIONALDOC1") {
						$('#ADDITIONALDOC1').val('');
						$('#ADDITIONALDOC1IMAGE .file-input').empty();
						$scope.adocLoad = true;
						$scope.adoctypeError = false;
						$scope.ad1ViewHide = false;
					}
					if (imgName == "ADDITIONALDOC2") {
						$('#ADDITIONALDOC2').val('');
						$('#ADDITIONALDOC2IMAGE .file-input').empty();
						$scope.adocLoad = true;
						$scope.adoc2typeError = false;
						$scope.ad2ViewHide = false;
					}
					if (imgName == "ADDITIONALDOC3") {
						$('#ADDITIONALDOC3').val('');
						$('#ADDITIONALDOC3IMAGE .file-input').empty();
						$scope.adocLoad = true;
						$scope.adoc3typeError = false;
						$scope.ad3ViewHide = false;
					}
					if (imgName == "FIRSTPOA") {
						$('#FIRSTPOA').val('');
						$('#FIRSTPOAIMAGE .file-input').empty();
						$scope.poaLoad = true;
						$scope.poatypeError = false;
					}
					if (imgName == "SECONDPOA") {
						$('#SECONDPOA').val('');
						$('#SECONDPOAIMAGE .file-input').empty();
						$scope.poaLoad = true;
						$scope.poa2typeError = false;
					}
					if (imgName == "NOMINEE1") {
						$('#NOMINEE1').val('');
						$('#NOMINEE1PROOFIMAGE .file-input').empty();
						$scope.nominee1Load = true;
						$scope.nominee1typeError = false;
						$scope.nmViewHide = false;
					}
					if (imgName == "NOMINEE2") {
						$('#NOMINEE2').val('');
						$('#NOMINEE2PROOFIMAGE .file-input').empty();
						$scope.nominee2Load = true;
						$scope.nominee2typeError = false;
						$scope.nm2ViewHide = false;
					}
					if (imgName == "NOMINEE3") {
						$('#NOMINEE3').val('');
						$('#NOMINEE3PROOFIMAGE .file-input').empty();
						$scope.nominee3Load = true;
						$scope.nominee3typeError = false;
						$scope.nm3ViewHide = false;
					}
					if (imgName == "GUARDIAN1") {
						$('#GUARDIAN1').val('');
						$('#GUARDIAN1PROOFIMAGE .file-input').empty();
						$scope.guardian1Load = true;
						$scope.guardian1typeError = false;
						$scope.guViewHide = false;
					}
					if (imgName == "GUARDIAN2") {
						$('#GUARDIAN2').val('');
						$('#GUARDIAN2PROOFIMAGE .file-input').empty();
						$scope.guardian2Load = true;
						$scope.guardian2typeError = false;
						$scope.gu2ViewHide = false;
					}
					if (imgName == "GUARDIAN3") {
						$('#GUARDIAN3').val('');
						$('#GUARDIAN3PROOFIMAGE .file-input').empty();
						$scope.guardian3Load = true;
						$scope.guardian3typeError = false;
						$scope.gu3ViewHide = false;
					}
					if (imgName == "ADDRESSMODIFICATION") {
						$('#ADDRESSMODIFICATION').val('');
						$('#ADDRESSMODIFICATION .file-input').empty();
						$scope.amLoad = true;
						$scope.amError = false;
					}
					$scope.updateImage(imgName, imgValue, $scope.FileType, '');
				}
			}

			$scope.pdfReadFn = function (filesSelected, imageName) {
				var fileToLoad = filesSelected[0];

				var fileReader = new FileReader();

				fileReader.onload = function (fileLoadedEvent) {
					var textAreaFileContents = document.getElementById("textAreaFileContents");

					formValue = fileLoadedEvent.target.result;
					var r_split = formValue.split(",");
					$scope.FileType = "PDF";

					var showPicture = document.querySelector("#" + imageName + "img");
					//    showPicture.src = "images/upload_pdf.png";

					$scope.update_img(imageName, r_split[1], formValue);

				};

				fileReader.readAsDataURL(fileToLoad);
			}

			$scope.upldImageValidate = function (imgName, imgValue, fileType, docId) {
				var doc_type = 'ind_aadhaar';
				/*if (docId == 108) {
				doc_type = 'ind_passport';
				} else if (docId == 109) {
				doc_type = 'ind_voter_id';
				} else if (docId == 110) {
				doc_type = 'ind_driving_license';
				} else if (docId == 111) {
				doc_type = 'ind_aadhaar';
				} else if (docId == 118 || imgName == 'PANNumber') {
				doc_type = 'ind_pan';
				} else if (imgName == 'BankCheque') {
				doc_type = 'ind_cheque';
				}*/
				var url = 'ValidateDocument';
				var data = {
					ReferenceNumber: $rootScope.formData.ReferenceNumber,
					data: {
						doc_type: doc_type,
						document1: imgValue
					}
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, data).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						var s_url = "DIYImageUpload";
						var sendData = {
							ImageName: imgName,
							Image: imgValue,
							DocumentType: docId,
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							Extention: fileType,
							IsDiy: true,
							IsIPV: "0",
							EncryptToken: $rootScope.EncryptToken,
							IsSelfi: $scope.IsSelfi,
							Latitude: $rootScope.formData.latitude,
							Longitude: $rootScope.formData.longitude,
						};
						serverService.apiCall(s_url, sendData).then(function (a) {
							var response = a.data;
							$rootScope.formData.apiLoading = false;
							if (response.IsSuccess) {
								if (imgName == "PANNumber") {
									$scope.panImageUpdt = true;
									$scope.panLoad = false;
									$scope.panImgError = false;
									$scope.pantypeError = false;
									$scope.panImageValidation = true;
								}

								if (imgName == "BankCheque") {
									$scope.bankUpdt = true;
									$scope.bankLoad = false;
									$scope.bankImgError = false;
									$scope.banktypeError = false;
									$scope.chequeImageValidation = true;
								}

								if (imgName == "CorrespondenceAddress") {
									$scope.cAddressUpdt = true;
									$scope.cAdrLoad = false;
									$scope.cAddressImgError = false;
									$scope.caddrtypeError = false;
									$scope.caddressProofImageValidation = true;
								}
								if (imgName == "CorrespondenceAddress2") {
									$scope.cAdrLoad2 = false;
									$scope.cAddressImgError = false;
									$scope.caddrtypeError2 = false;
								}
								if (imgName == "PermenantAddress") {
									$scope.pAddressUpdt = true;
									$scope.pAdrLoad = false;
									$scope.pAddressImgError = false;
									$scope.paddrtypeError = false;
									$scope.paddressProofImageValidation = true;
								}
								if (imgName == "PermenantAddress2") {
									$scope.pAdrLoad2 = false;
									$scope.pAddressImgError = false;
									$scope.paddrtypeError2 = false;
								}
							}else{
								if (imgName == 'CorrespondenceAddress') {
								$('#CorrespondenceAddress').val('');
								$("#cAddressImage .file-input").empty();
								$scope.cAddressCNImgError = true;
								$(".c-adr .file-preview").empty();
								$rootScope.formData.caImage = '';
							}

							if (imgName == 'CorrespondenceAddress2') {
								$('#CorrespondenceAddress2').val('');
								$("#cAddressImage2 .file-input").empty();
								$scope.cAddressCNImgError = true;
								$(".c-adr2 .file-preview").empty();
								$rootScope.formData.caImage2 = '';
							}

							if (imgName == 'PermenantAddress') {
								$('#PermenantAddress').val('');
								$("#pAddressImage .file-input").empty();
								$(".p-adr .file-preview").empty();
								$rootScope.formData.paImage = '';
								$scope.pAddressCNImgError = true;
							}

							if (imgName == 'PermenantAddress2') {
								$('#PermenantAddress2').val('');
								$("#pAddressImage2 .file-input").empty();
								$(".p-adr2 .file-preview").empty();
								$rootScope.formData.paImage2 = '';
								$scope.pAddressCNImgError = true;
							}
							}
							$scope.getImages();
						});
					} else {
						$rootScope.formData.apiLoading = false;
						if (imgName == 'CorrespondenceAddress') {
							$('#CorrespondenceAddress').val('');
							$("#cAddressImage .file-input").empty();
							$scope.cAddressCNImgError = true;
							$(".c-adr .file-preview").empty();
							$rootScope.formData.caImage = '';
						}

						if (imgName == 'CorrespondenceAddress2') {
							$('#CorrespondenceAddress2').val('');
							$("#cAddressImage2 .file-input").empty();
							$scope.cAddressCNImgError = true;
							$(".c-adr2 .file-preview").empty();
							$rootScope.formData.caImage2 = '';
						}

						if (imgName == 'PermenantAddress') {
							$('#PermenantAddress').val('');
							$("#pAddressImage .file-input").empty();
							$(".p-adr .file-preview").empty();
							$rootScope.formData.paImage = '';
							$scope.pAddressCNImgError = true;
						}

						if (imgName == 'PermenantAddress2') {
							$('#PermenantAddress2').val('');
							$("#pAddressImage2 .file-input").empty();
							$(".p-adr2 .file-preview").empty();
							$rootScope.formData.paImage2 = '';
							$scope.pAddressCNImgError = true;
						}
						$scope.getImages();
					}
				})
			}

			$scope.updateImage = function (imgName, imgValue, fileType, docId) {

				if (docId == 111) {
					$scope.upldImageValidate(imgName, imgValue, fileType, docId);
				} else {

					if ($scope.ipvStage) {
						$scope.ipvStage = false;
					}
					var s_url = "DIYImageUpload";
					var refNo = $rootScope.formData.ReferenceNumber;
					$rootScope.formData.apiLoading = true;
					if ($scope.selfTrue) {
						$scope.IsSelfi = 'Y';
					} else {
						$scope.IsSelfi = 'N';
					}
					if (imgName == "BankCheque") {
						var sendData = {
							ImageName: imgName,
							Image: imgValue,
							DocumentType: docId,
							ReferenceNumber: refNo,
							Extention: fileType,
							ChequeType: 1,
							IsDiy: true,
							IsIPV: "0",
							EncryptToken: $rootScope.EncryptToken,
							IsSelfi: 'N'
						}
					} else {
						var sendData = {
							ImageName: imgName,
							Image: imgValue,
							DocumentType: docId,
							ReferenceNumber: refNo,
							Extention: fileType,
							IsDiy: true,
							IsIPV: "0",
							EncryptToken: $rootScope.EncryptToken,
							IsSelfi: $scope.IsSelfi,
							Latitude: $rootScope.formData.latitude,
							Longitude: $rootScope.formData.longitude,
						};
					}

					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							//$scope.showView = true;
							if (imgName == "PANNumber") {
								$scope.panImageUpdt = true;
								$scope.panLoad = false;
								$scope.panImgError = false;
								$scope.pantypeError = false;
								$scope.panImageValidation = true;
							}
							if (imgName == "ClientPhoto") {
								$scope.photoImageUpdt = true;
								$scope.cltLoad = false;
								$scope.photoImgError = false;
								$scope.clientPhoqqualityError = false;
								$scope.phototypeError = false;
								$scope.photoProofImageValidation = true;
							}

							if (imgName == "Aadhar") {
								$scope.aadharImageUpdt = true;
								$scope.aadharLoad = false;
								$scope.aadharImgError = false;
								$scope.aadhartypeError = false;
							}

							if (imgName == "CorrespondenceAddress") {
								$scope.cAddressUpdt = true;
								$scope.cAdrLoad = false;
								$scope.cAddressImgError = false;
								$scope.caddrtypeError = false;
								$scope.caddressProofImageValidation = true;
							}
							if (imgName == "CorrespondenceAddress2") {
								$scope.cAdrLoad2 = false;
								$scope.cAddressImgError = false;
								$scope.caddrtypeError2 = false;
							}
							if (imgName == "PermenantAddress") {
								$scope.pAddressUpdt = true;
								$scope.pAdrLoad = false;
								$scope.pAddressImgError = false;
								$scope.paddrtypeError = false;
								$scope.paddressProofImageValidation = true;
							}
							if (imgName == "PermenantAddress2") {
								$scope.pAdrLoad2 = false;
								$scope.pAddressImgError = false;
								$scope.paddrtypeError2 = false;
							}
							if (imgName == "BankCheque") {
								$scope.bankUpdt = true;
								$scope.bankLoad = false;
								$scope.bankImgError = false;
								$scope.banktypeError = false;
								$scope.chequeImageValidation = true;
							}
							if (imgName == "SPECIMENPROOF") {
								$scope.signatureUpdt = true;
								$scope.signatureLoad = false;
								$scope.signatureImgError = false;
								$scope.signaturetypeError = false;
								$scope.sigImageValidation = true;
							}
							if (imgName == "Income") {
								$scope.foUpdt = true;
								$scope.incomeLoad = false;
								$scope.foImgError = false;
								$scope.banktypeError = false;
								$scope.incomeProofImageValidation = true;
							}
							if (imgName == "RMSIGNATURE") {
								$scope.tcUpdt = true;
								$scope.tcLoad = false;
								$scope.tcImgError = false;
								$scope.tctypeError = false;
								$scope.tcImageValidation = true;
							}
							if (imgName == "CMLDOCUMENT") {
								$scope.cmlLoad = true;
								$scope.cmlUpdt = true;
								$scope.cmlImgError = false;
								$scope.cmltypeError = false;
								$scope.cmlImageValidation = false;
							}
							if (imgName == "ADDITIONALDOC1") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoctypeError = false;
							}
							if (imgName == "ADDITIONALDOC2") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoc2typeError = false;
							}
							if (imgName == "ADDITIONALDOC3") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoc3typeError = false;
							}
							if (imgName == "FIRSTPOA") {
								$scope.poaUpdt = true;
								$scope.poaLoad = false;
								$scope.poaImgError = false;
								$scope.poatypeError = false;
								$scope.poaImageValidation = true;
							}
							if (imgName == "SECONDPOA") {
								$scope.poaLoad = false;
								$scope.poaImgError = false;
								$scope.poa2typeError = false;
							}
							if (imgName == "NOMINEE1") {
								$scope.nominee1Updt = true;
								$scope.nominee1Load = false;
								$scope.nominee1ImgError = false;
								$scope.nominee1typeError = false;
							}
							if (imgName == "NOMINEE2") {
								$scope.nominee2Updt = true;
								$scope.nominee2Load = false;
								$scope.nominee2ImgError = false;
								$scope.nominee2typeError = false;
							}
							if (imgName == "NOMINEE3") {
								$scope.nominee3Updt = true;
								$scope.nominee3Load = false;
								$scope.nominee3ImgError = false;
								$scope.nominee3typeError = false;
							}
							if (imgName == "GUARDIAN1") {
								$scope.guardian1Updt = true;
								$scope.guardian1Load = false;
								$scope.guardian1ImgError = false;
								$scope.guardian1typeError = false;
							}
							if (imgName == "GUARDIAN2") {
								$scope.guardian2Updt = true;
								$scope.guardian2Load = false;
								$scope.guardian2ImgError = false;
								$scope.guardian2typeError = false;
							}
							if (imgName == "GUARDIAN3") {
								$scope.guardian3Updt = true;
								$scope.guardian3Load = false;
								$scope.guardian3ImgError = false;
								$scope.guardian3typeError = false;
							}
							if (imgName == "ADDRESSMODIFICATION") {
								$scope.amLoad = false;
								$scope.amImgError = false;
								$scope.amtypeError = false;
								$scope.amImageValidation = true;
							}

							$scope.getImages();
						} else {
							$rootScope.formData.apiLoading = false;
							if (imgName == "ClientPhoto") {
								if ($scope.IsSelfi == "Y") {
									$scope.photoImgError = false;
									$scope.photoImageUpdt = false;
									$scope.clientPhoqqualityError = true;
									$scope.ClienterrorMsg = response.ErrorMessage
								}
							}
							
							if (imgName == "PANNumber") {
								$('#PANNumber').val('');
								$('#panPhoto .file-input').empty();
								$scope.panCNImgError = true;
							}
							if (imgName == "BankCheque") {
								$('#BankCheque').val('');
								$('#bankImage .file-input').empty();
								$scope.bankCNImgError = true;
							}
							if (imgName == 'CorrespondenceAddress') {
								$('#CorrespondenceAddress').val('');
								$("#cAddressImage .file-input").empty();
								$scope.cAddressQImgError = true;
								$(".c-adr .file-preview").empty();
								$rootScope.formData.caImage = '';
							}

							if (imgName == 'CorrespondenceAddress2') {
								$('#CorrespondenceAddress2').val('');
								$("#cAddressImage2 .file-input").empty();
								$scope.cAddressQImgError = true;
								$(".c-adr2 .file-preview").empty();
								$rootScope.formData.caImage2 = '';
							}

							if (imgName == 'PermenantAddress') {
								$('#PermenantAddress').val('');
								$("#pAddressImage .file-input").empty();
								$(".p-adr .file-preview").empty();
								$rootScope.formData.paImage = '';
								$scope.pAddressQImgError = true;
							}

							if (imgName == 'PermenantAddress2') {
								$('#PermenantAddress2').val('');
								$("#pAddressImage2 .file-input").empty();
								$(".p-adr2 .file-preview").empty();
								$rootScope.formData.paImage2 = '';
								$scope.pAddressQImgError = true;
							}
							$scope.getImages();
						}

					});
				}
			}

			$scope.cImgUpld = function () {
				$scope.cAddressCNImgError = false;
				if ($scope.aadharImage && $rootScope.formData.fields.DocsaddressProof == 111) {
					$scope.upldImageValidate("CorrespondenceAddress", $scope.aadharImage, 'Image', $rootScope.formData.fields.DocsaddressProof);
					if ($rootScope.formData.caImage2) {
						$scope.upldImageValidate("CorrespondenceAddress2", $rootScope.formData.caImage2, $scope.cafileType, $rootScope.formData.fields.DocsaddressProof);
					}
				} else if ($rootScope.formData.caImage != "" && $rootScope.formData.caImage) {
					if ($rootScope.formData.fields.DocsaddressProof == 111) {
						$('#CorrespondenceAddress').val('');
						$("#cAddressImage .file-input").empty();
						$(".c-adr .file-preview").empty();
						$rootScope.formData.caUrl = '';
						$scope.cAddressUpdt = false;
						$rootScope.formData.caUrl2 = '';
						$('#CorrespondenceAddress2').val('');
						$("#cAddressImage2 .file-input").empty();
						$(".c-adr2 .file-preview").empty();
						$scope.caddressProofImageValidation = false;
					} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
						$scope.cAdrLoad = true;
						var s_url = "DIYImageUpload";
						$rootScope.formData.apiLoading = true;
						var sendData = {
							ImageName: $scope.addressName,
							Image: $rootScope.formData.caImage,
							DocumentType: $rootScope.formData.fields.DocsaddressProof,
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							Extention: $scope.cafileType,
							IsDiy: true,
							IsIPV: "0",
							EncryptToken: $rootScope.EncryptToken
						};

						serverService.apiCall(s_url, sendData).then(function (a) {
							var response = a.data;
							if ($rootScope.formData.caImage2 != "" && $rootScope.formData.caImage2) {
								var sendData = {
									ImageName: $scope.addressName1,
									Image: $rootScope.formData.caImage2,
									DocumentType: $rootScope.formData.fields.DocsaddressProof,
									ReferenceNumber: $rootScope.formData.ReferenceNumber,
									Extention: $scope.cafileType,
									IsDiy: true,
									EncryptToken: $rootScope.EncryptToken
								};
								serverService.apiCall(s_url, sendData).then(function (a) {
									var response = a.data;
									$rootScope.formData.apiLoading = false;

								});
							} else {
								$rootScope.formData.apiLoading = false;
							}

						});
					}
				}
			}

			$scope.pImgUpld = function () {
				$scope.pAddressCNImgError = false;
				if ($scope.aadharImage && $rootScope.formData.fields.pDocsaddressProof == 111) {
					$scope.upldImageValidate("PDocumentImage", $scope.aadharImage, 'Image', $rootScope.formData.fields.pDocsaddressProof);
					if ($rootScope.formData.paImage2) {
						$scope.upldImageValidate("PERMENANTADDRESS2", $rootScope.formData.paImage2, $scope.pafileType, $rootScope.formData.fields.pDocsaddressProof);
					}
				
				} else if ($rootScope.formData.paImage != "" && $rootScope.formData.paImage) {
					if ($rootScope.formData.fields.pDocsaddressProof == 111) {
						$('#PermenantAddress').val('');
						$("#pAddressImage .file-input").empty();
						$(".p-adr .file-preview").empty();
						$rootScope.formData.paImage = '';
						$rootScope.formData.paUrl = '';
						$scope.pAddressUpdt = false;
						$rootScope.formData.paUrl2 = '';
						$('#PermenantAddress2').val('');
						$("#pAddressImage2 .file-input").empty();
						$(".p-adr2 .file-preview").empty();
						$rootScope.formData.paImage2 = '';
						$scope.paddressProofImageValidation = false;
					} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
						$scope.pAdrLoad = true;
						var s_url = "DIYImageUpload";
						$rootScope.formData.apiLoading = true;

						var sendData = {
							ImageName: $scope.permaddressName,
							Image: $rootScope.formData.paImage,
							DocumentType: $rootScope.formData.fields.pDocsaddressProof,
							ReferenceNumber: $rootScope.formData.ReferenceNumber,
							Extention: $scope.pafileType,
							IsDiy: true,
							EncryptToken: $rootScope.EncryptToken,
							IsIPV: "0"
						};

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
							if ($rootScope.formData.paImage2 != "" && $rootScope.formData.paImage2) {
								var sendData = {
									ImageName: $scope.permaddressName1,
									Image: $rootScope.formData.paImage2,
									DocumentType: $rootScope.formData.fields.pDocsaddressProof,
									ReferenceNumber: $rootScope.formData.ReferenceNumber,
									Extention: $scope.pafileType
								};
								serverService.apiCall(s_url, sendData).then(function (a) {
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
										}
									}
									$rootScope.formData.apiLoading = false;
								});
							} else {
								$rootScope.formData.apiLoading = false;
							}
						});
					}
				}
			};

			$scope.foImgUpload = function () {
				if ($rootScope.formData.foImage != "" && $rootScope.formData.foImage) {
					if ($rootScope.formData.fields.foDocumentProof != 0 && $rootScope.formData.fields.foDocumentProof) {
						$scope.incomeLoad = true;
						$scope.updateImage($scope.foName, $rootScope.formData.foImage, $scope.fofileType, $rootScope.formData.fields.foDocumentProof);
					}
				}
			};

			$scope.delImg = function (imgName) {
				var s_url = "DIYDeleteImage";
				var tokenParams = {
					'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
					'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
					'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
					'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
				}
				var sendData = {
					ImageName: imgName,
					ReferenceNumber: $rootScope.formData.ReferenceNumber
				};

				serverService.apiCall(s_url, sendData);

				if (imgName == 'CorrespondenceAddress2') {
					$scope.caddPage = false;
					$rootScope.formData.caImage2 = '';
					$('#cAddressImage2 .file-input, .c-adr2 .file-input').empty();
					$('.c-adr2 .file-input').addClass('file-input-new');
					$('#cAddressImage2 .file-input').removeClass('file-input-new');
					$('.c-adr2 .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs txt-uppercase">BACK IMAGE</span><input type="file" accept="image/*" class="input-upload-back" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div></div></div>')

				} else {
					$scope.paddPage = false;
					$rootScope.formData.paImage2 = '';
					$('#pAddressImage2 .file-input, .p-adr2 .file-input').empty();
					$('.p-adr2 .file-input').addClass('file-input-new');
					$('#pAddressImage2 .file-input').removeClass('file-input-new');
					$('.p-adr2 .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppsercase">BACK IMAGE</span><input type="file" accept="image/*" class="input-upload-back" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
				}
			}

		
			$scope.bindImage = function (response) {
				var num = 0;
				$rootScope.docgetAPI = false;
				if (response.IsSuccess) {
					$rootScope.IPVRedirectURL = response.IpvURLEncode;

					angular.forEach(response.IpvPOAandNomineeList, function (value, key) {
						if (value.ImageName == "Aadhar Service Image" && value.ImageUrl != null && value.ImageUrl != '') {
							$scope.aadharImage = value.ImageUrl;
							$scope.getAadharImage = false;
						} else {
							$scope.getAadharImage = true;
						}
						if (value.ImageName == "Specimen" && value.ImageUrl == null) {

							if (sessionStorage.getItem('finacle') || $rootScope.webfinacle) {
								$scope.signFincleMsg = true
							}
						}
						if (value.ImageName == "Aadhar" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.aadharUrl = value.ImageUrl;

							$('.aadhar-img .file-input').empty();
							$('.aadhar-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="Aadhar" onchange="imgUpld(\'Aadhar\');"></div></div></div>')
							$('#aadharImage .file-input').empty();
							$('#aadharImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="Aadhar" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title=""></div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.aadharImageUpdt = true;
							$scope.aadharImg_reShow = true;
							$rootScope.formData.aadharImage = value.ImageUrl;
							num++;
						}

						if (value.ImageName == "CLIENTPHOTO" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.photoUrl = value.ImageUrl;

							$('.client-photo .file-input').empty();
							$('.client-photo .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ClientPhoto" onchange="imgUpld(\'ClientPhoto\');"></div></div></div>')
							$('#clientImage .file-input').empty();
							$('#clientImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.photoImageUpdt = true;
							$scope.photoImg_reShow = true;
							$scope.clientViewHide = true;
							$rootScope.formData.photoImage = value.ImageUrl;
							if (value.IsSelfi == 'Y') {
								$scope.selfTrue = true;
							}

							//$scope.takeSelfieDisabled = false;

							if ($rootScope.formData.isMobile) {
								$('.clientPhoto button').remove()
								$('.clientPhoto .file-drop-disabled').remove()
							}

							num++;
						} else if (value.ImageName == "CLIENTPHOTO" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.photoImageUpdt = false;
						}
						if (value.ImageName == "PANImage" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.panUrl = value.ImageUrl;

							$('.pan-img .file-input').empty();
							$('.pan-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PANNumber" onchange="imgUpld(\'PANNumber\');"></div></div></div>');
							$('#panPhoto .file-input').empty();
							$('#panPhoto').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$rootScope.formData.panImage = value.ImageUrl;
							$scope.panImageUpdt = true;
							$scope.panImg_reShow = true;
							$scope.panViewHide = true;
							if (value.IsCheckImage) {
								$scope.checkImage = true;
							} else {
								$scope.checkImage = false;
							}
							num++;
						} else if (value.ImageName == "PANImage" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.panImageUpdt = false;
						}

						if (value.ImageName == "DocumentImage" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.caUrl = value.ImageUrl;

							$('.c-adr .file-input').empty();
							if (!$scope.cAddressDisable) {
								$('.c-adr .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="CorrespondenceAddress" onchange="imgUpld(\'CorrespondenceAddress\');"></div></div></div>')
							};
							$('#cAddressImage .file-input').empty();
							$('#cAddressImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$rootScope.formData.caImage = value.ImageUrl;
							$scope.cAddressUpdt = true;
							$scope.caImg_reShow = true;
							$scope.addressName = "CorrespondenceAddress";
							$scope.caViewHide = true;
							$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
							num++;

							if ($scope.cAddressDisable) {
								$(".select.cadr").prop("disabled", true);
							}
						} else if (value.ImageName == "DocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.cAddressUpdt = false;
						}

						if (value.ImageName == "CORRESPONDENCEADDRESS2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.caUrl2 = value.ImageUrl;

							$('.c-adr2 .file-input').empty().addClass('file-input-new');
							$('.c-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div></div></div>')
							$('#cAddressImage2 .file-input').empty().removeClass('file-input-new'); ;
							$('#cAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.cAddressUpdt2 = true;
							$scope.ca2Img_reShow = true;
							$rootScope.formData.caImage2 = value.ImageUrl;
							$rootScope.formData.fields.DocsaddressProof1 = $rootScope.formData.fields.DocsaddressProof;
							$scope.addressName1 = "CorrespondenceAddress2";
							$scope.caddPage = true;
							$scope.ca2ViewHide = true;
						}

						if (value.ImageName == "CheckImage" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.bankUrl = value.ImageUrl;

							$('.bank-img .file-input').empty();
							$('.bank-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="BankCheque" onchange="imgUpld(\'BankCheque\');"></div></div></div>');
							$('#bankImage .file-input').empty();
							$('#bankImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.bankUpdt = true;
							$rootScope.formData.baImage = value.ImageUrl;
							$scope.chqImg_reShow = true;
							$scope.chequeViewHide = true;
							num++;
						} else if (value.ImageName == "CheckImage" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.bankUpdt = false;
						}

						if (value.ImageName == "PDocumentImage" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.paUrl = value.ImageUrl;
							$('.p-adr .file-input').empty();
							$('.p-adr .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PermenantAddress" onchange="imgUpld(\'PermenantAddress\');"></div></div></div>');
							$('#pAddressImage .file-input').empty();
							$('#pAddressImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.pAddressUpdt = true;
							$rootScope.formData.paImage = value.ImageUrl;
							$scope.permaddressName = 'PERMENANTADDRESS';
							$scope.paImg_reShow = true;
							$scope.paViewHide = true;
							$rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString();
							num++;
						} else if (value.ImageName == "PDocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.pAddressUpdt = false;
						}

						if (value.ImageName == "PERMENANTADDRESS2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.paUrl2 = value.ImageUrl;
							$('.p-adr2 .file-input').empty().addClass('file-input-new');
							$('.p-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
							$('#pAddressImage2 .file-input').empty();
							$('#pAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.pAddressUpdt2 = true;
							$rootScope.formData.paImage2 = value.ImageUrl;
							$scope.permaddressName1 = 'PERMENANTADDRESS2';
							$scope.pa2Img_reShow = true;
							$scope.paddPage = true;
							$scope.pa2ViewHide = true;
						}

						if (value.ImageName == "Specimen" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.signatureUrl = value.ImageUrl;

							$('.signature-img .file-input').empty();
							$('.signature-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="SPECIMENPROOF" onchange="imgUpld(\'SPECIMENPROOF\');"></div></div></div>');
							$('#clientSignature .file-input').empty();
							$('#clientSignature').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.signatureUpdt = true;
							$scope.signatureName = 'SPECIMENPROOF';
							$rootScope.formData.signatureImage = value.ImageUrl;
							$scope.signatureImg_reShow = true;
							$scope.signatureViewHide = true;
							num++;
						} else if (value.ImageName == "Specimen" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.signatureUpdt = false;

						}

						if (value.ImageName == "INCOME" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.foUrl = value.ImageUrl;
							if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
								$('.income-img .file-input').empty();
								$('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
								$('#incomeImage .file-input').empty();
								$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							} else {

								$('.income-img .file-input').empty();
								$('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
								$('#incomeImage .file-input').empty();
								$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
							}
							$scope.foUpdt = true;
							$scope.foName = 'Income';
							$rootScope.formData.foImage = value.ImageUrl;
							$scope.foImg_reShow = true;
							$scope.foViewHide = true;
							$rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString();
							num++;
						} else if (value.ImageName == "INCOME" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.foUpdt = false;
						}

						if (value.ImageName == "RM" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.rmUrl = value.ImageUrl;

							$('.tc-img .file-input').empty();
							$('.tc-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="RMSIGNATURE" onchange="imgUpld(\'RMSIGNATURE\');"></div></div></div>');
							$('#RMSIGNATUREIMAGE .file-input').empty();
							$('#RMSIGNATUREIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.tcUpdt = true;
							$rootScope.formData.tcImage = value.ImageUrl;
							$scope.tcImg_reShow = true;
							num++;
						}

						if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
								$('.cml-img .file-input').empty();
								$('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
								$('#cmlImage .file-input').empty();
								$('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							} else {

								$('.cml-img .file-input').empty();
								$('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
								$('#cmlImage .file-input').empty();
								$('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
							}
							$scope.cmlUpdt = true;
							$rootScope.formData.cmlImage = value.ImageUrl;
							$scope.cmlImg_reShow = true;
							$scope.cmlViewHide = true;
							num++;
						} else if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl == null && value.ImageUrl == '') {
							$scope.cmlUpdt = false;
						}

						if (value.ImageName == "Additionaldoc1" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.adoc1-img .file-input').empty();
							$('.adoc1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC1" onchange="imgUpld(\'ADDITIONALDOC1\');"></div></div></div>');
							$('#ADDITIONALDOC1IMAGE .file-input').empty();
							$('#ADDITIONALDOC1IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.adocUpdt = true;
							$rootScope.formData.adocImage = value.ImageUrl;
							$scope.adocImg_reShow = true;
							$scope.ad1ViewHide = true;
							num++;
						}

						if (value.ImageName == "Additionaldoc2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.adoc2-img .file-input').empty();
							$('.adoc2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC2" onchange="imgUpld(\'ADDITIONALDOC2\');"></div></div></div>');
							$('#ADDITIONALDOC2IMAGE .file-input').empty();
							$('#ADDITIONALDOC2IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
							$scope.adocaddPage2 = true;
							$scope.adocUpdt = true;
							$rootScope.formData.adoc2Image = value.ImageUrl;
							$scope.adoc2Img_reShow = true;
							$scope.ad2ViewHide = true;
							num++;
						}

						if (value.ImageName == "Additionaldoc3" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.adoc3-img .file-input').empty();
							$('.adoc3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC3" onchange="imgUpld(\'ADDITIONALDOC3\');"></div></div></div>');
							$('#ADDITIONALDOC3IMAGE .file-input').empty();
							$('#ADDITIONALDOC3IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
							$scope.adocaddPage3 = true;
							$scope.adocUpdt = true;
							$rootScope.formData.adoc3Image = value.ImageUrl;
							$scope.adoc3Img_reShow = true;
							$scope.ad3ViewHide = true;
							num++;
						}

						if (value.ImageName == "POA1" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.poa1-img .file-input').empty();
							$('.poa1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="FIRSTPOA" onchange="imgUpld(\'FIRSTPOA\');"></div></div></div>');
							$('#FIRSTPOAIMAGE .file-input').empty();
							$('#FIRSTPOAIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.poaUpdt = true;
							$rootScope.formData.poaImage = value.ImageUrl;
							$scope.poaImg_reShow = true;
							num++;
						}

						if (value.ImageName == "POA2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.poa2-img .file-input').empty();
							$('.poa2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="SECONDPOA" onchange="imgUpld(\'SECONDPOA\');"></div></div></div>');
							$('#SECONDPOAIMAGE .file-input').empty();
							$('#SECONDPOAIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.poaaddPage = true;
							$scope.poaUpdt = true;
							$rootScope.formData.poa2Image = value.ImageUrl;
							$scope.poa2Img_reShow = true;
							num++;
						}

						if (value.ImageName == "NOMINEE1" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nominee1Url = value.ImageUrl;

							$('.nominee1-img .file-input').empty();
							$('.nominee1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE1" onchange="imgUpld(\'NOMINEE1\');"></div></div></div>');
							$('#NOMINEE1PROOFIMAGE .file-input').empty();
							$('#NOMINEE1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.nominee1Updt = true;
							$rootScope.formData.nominee1Image = value.ImageUrl;
							$scope.nominee1Img_reShow = true;
							$scope.nmViewHide = true;
							num++;
						}
						if (value.ImageName == "NOMINEE2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nominee2Url = value.ImageUrl;

							$('.nominee2-img .file-input').empty();
							$('.nominee2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
							$('#NOMINEE2PROOFIMAGE .file-input').empty();
							$('#NOMINEE2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.nominee2Updt = true;
							$rootScope.formData.nominee2Image = value.ImageUrl;
							$scope.nominee2Img_reShow = true;
							$scope.nm2ViewHide = true;
							num++;
						}
						if (value.ImageName == "NOMINEE3" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nominee3Url = value.ImageUrl;

							$('.nominee3-img .file-input').empty();
							$('.nominee3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
							$('#NOMINEE3PROOFIMAGE .file-input').empty();
							$('#NOMINEE3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.nominee3Updt = true;
							$rootScope.formData.nominee3Image = value.ImageUrl;
							$scope.nominee3Img_reShow = true;
							$scope.nm3ViewHide = true;
							num++;
						}
						if (value.ImageName == "GUARDIAN1" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.guardian1Url = value.ImageUrl;

							$('.guardian1-img .file-input').empty();
							$('.guardian1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN1" onchange="imgUpld(\'GUARDIAN1\');"></div></div></div>');
							$('#GUARDIAN1PROOFIMAGE .file-input').empty();
							$('#GUARDIAN1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.guardian1Updt = true;
							$rootScope.formData.guardian1Image = value.ImageUrl;
							$scope.guardian1Img_reShow = true;
							$scope.guViewHide = true;
							num++;
						}
						if (value.ImageName == "GUARDIAN2" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.guardian2Url = value.ImageUrl;

							$('.guardian2-img .file-input').empty();
							$('.guardian2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN2" onchange="imgUpld(\'GUARDIAN2\');"></div></div></div>');
							$('#GUARDIAN2PROOFIMAGE .file-input').empty();
							$('#GUARDIAN2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.guardian2Updt = true;
							$rootScope.formData.guardian2Image = value.ImageUrl;
							$scope.guardian2Img_reShow = true;
							$scope.gu2ViewHide = true;
							num++;
						}
						if (value.ImageName == "GUARDIAN3" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.guardian2Url = value.ImageUrl;

							$('.guardian3-img .file-input').empty();
							$('.guardian3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN3" onchange="imgUpld(\'GUARDIAN3\');"></div></div></div>');
							$('#GUARDIAN3PROOFIMAGE .file-input').empty();
							$('#GUARDIAN3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.guardian3Updt = true;
							$rootScope.formData.guardian3Image = value.ImageUrl;
							$scope.guardian3Img_reShow = true;
							$scope.gu3ViewHide = true;
							num++;
						}

						if (value.ImageName == "ADDRESSMODIFICATION" && value.ImageUrl != null && value.ImageUrl != '') {
							$rootScope.formData.nomineeUrl = value.ImageUrl;

							$('.am-img .file-input').empty();
							$('.am-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDRESSMODIFICATION" onchange="imgUpld(\'ADDRESSMODIFICATION\');"></div></div></div>');
							$('#RMADDRESSMODIFICATIONIMAGE .file-input').empty();
							$('#RMADDRESSMODIFICATIONIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.amUpdt = true;
							$rootScope.formData.amImage = value.ImageUrl;
							$scope.amImg_reShow = true;
							num++;
						}
						//$scope.showView = false;
						$('.file-input .file-preview').css('display', 'block');

						setTimeout(function () {
							$(".select").select2();
						}, 1000);
					});
				}
			}

			$scope.getImages = function () {

				var s_url = "DIYGetImagesByReferenceNumber";
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				}
				$scope.panLoad = true;
				$scope.cltLoad = true;
				$scope.aadharLoad = true;
				$scope.cAdrLoad = true;
				$scope.cAdrLoad2 = true;
				$scope.pAdrLoad = true;
				$scope.pAdrLoad2 = true;
				$scope.bankLoad = true;
				$scope.incomeLoad = true;
				$rootScope.docgetAPI = true;

				//$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;

					$scope.panLoad = false;
					$scope.cltLoad = false;
					$scope.aadharLoad = false;
					$scope.cAdrLoad = false;
					$scope.cAdrLoad2 = false;
					$scope.pAdrLoad = false;
					$scope.pAdrLoad2 = false;
					$scope.bankLoad = false;
					$scope.incomeLoad = false;
					//$rootScope.formData.apiLoading = false;
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

					$scope.bindImage(response);

					/*  if (num == 6) {
					$('#agree-terms').prop('checked', true);
					$rootScope.formData.fields.termsAccept = true;
					$scope.termsError = false;
					setTimeout(function (){
					$('.customcheckradio').iCheck({
					checkboxClass: 'icheckbox_minimal',
					radioClass: 'iradio_minimal'
					});
					$('label.agreeTerms input[type="checkbox"]').on("ifChecked", function (){
					$rootScope.formData.fields.termsAccept = true;
					$scope.termsError = false;
					$scope.$apply();
					}).on("ifUnchecked", function (){
					$rootScope.formData.fields.termsAccept = false;
					$scope.$apply();
					});

					}, 10)
					};*/
				});

			}

			$scope.getImages();

			$rootScope.wizardShow = true;
			$scope.getDocInfo = function () {
				if (!$rootScope.getAPI) {
					var s_url1 = "DIYGetClientOtherInfoByReferenceNumber";
					var sendData1 = {
						ReferenceNumber: $rootScope.formData.eRefNumber,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					}
					$scope.imgM = true;
					var tokenParams = {
						'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
						'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
						'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
						'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
					}

					$rootScope.formData.apiLoading = true;
					$rootScope.docgetAPI = true;
					serverService.apiCall(s_url1, sendData1).then(function (a) {
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
						$scope.getImages();
						if (response.ObjCDIYClientOtherInfo.Gender == "M") {
							$scope.imgM = true;
						} else {
							$scope.imgM = false;
						}

					});
				}
			}
			$scope.getDocInfo();

			$('label.agreeTerms input[type="checkbox"]').on("ifChecked", function () {
				$rootScope.formData.fields.termsAccept = true;
				$scope.termsError = false;
				$scope.$apply();
			}).on("ifUnchecked", function () {
				$rootScope.formData.fields.termsAccept = false;
				$scope.$apply();
			});

			$scope.DIYUpdateIPVStage = function (process) {

				if ($rootScope.formData.isgDocSkip) {

					const AgreeTC = $('#agree-terms').iCheck('update')[0].checked;
					if ($scope.foImgUpld && !$scope.foUpdt) {
						$scope.foImgError = true;
						$("html, body").animate({
							scrollTop: $("#Income").offset().top
						});
						return false;
					} else if (!AgreeTC) {
						$scope.termsError = true;
						return false;
					}
				} else {

					var error = 0;
					if (!$scope.docImgCompleted) {
						if (!$scope.ibDocumentHide && !$scope.panImageUpdt) {
							$scope.panImgError = true;
							$("html, body").animate({
								scrollTop: $("#PANNumber").offset().top
							});
							error++;
						}
						if ((!$scope.ibDocumentHide || $scope.ibCkycDocumentShow) && !$scope.signatureUpdt) {
							$scope.signatureImgError = true;
							$("html, body").animate({
								scrollTop: $("#SPECIMENPROOF").offset().top
							});
							error++;
						}
						if ($scope.clientPhoqqualityError || ((!$scope.ibDocumentHide || $scope.ibCkycDocumentShow) && !$scope.photoImageUpdt)) {
							$scope.photoImgError = true;
							$("html, body").animate({
								scrollTop: $("#ClientPhoto").offset().top
							});
							error++;
						}
						if ((!$rootScope.webfinacle && !$rootScope.formData.CKYC) && !$scope.bankUpdt) {
							$scope.bankImgError = true;
							$("html, body").animate({
								scrollTop: $("#BankCheque").offset().top
							});
							error++;
						}
						if (!$scope.ibDocumentHide && !$scope.cAddressUpdt) {
							$scope.cAddressImgError = true;
							$("html, body").animate({
								scrollTop: $("#CorrespondenceAddress").offset().top
							});
							error++;
						}
						if (!$scope.ibDocumentHide && $scope.paddrUpld && !$scope.pAddressUpdt) {
							$scope.pAddressImgError = true;
							$("html, body").animate({
								scrollTop: $("#PermenantAddress").offset().top
							});
							error++;
						}
						/*if ($scope.foImgUpld && !$scope.foUpdt) {
						$scope.foImgError = true;
						$("html, body").animate({
						scrollTop: $("#Income").offset().top
						});
						error++;
						}*/

						if (!$scope.ibDocumentHide && $rootScope.formData.RMModule && !$scope.tcUpdt) {
							$scope.tcImgError = true;
							$("html, body").animate({
								scrollTop: $("#RMSIGNATURE").offset().top
							});
							error++;
						}

						if ($rootScope.formData.RMModule && !$scope.poaUpdt) {
							$scope.poaImgError = true;
							$("html, body").animate({
								scrollTop: $("#FIRSTPOA").offset().top
							});
							error++;
						}
						const AgreeTC = $('#agree-terms').iCheck('update')[0].checked;
						if (!AgreeTC) {
							$scope.termsError = true;
							error++;
						}

					}

					if (process == 'esign') {
						error = 0;
					}
					if (error == 0) {

						if (process == 'esign') {

							var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + $rootScope.formData.ReferenceNumber + '&Esign=NSDL';
							$rootScope.formData.apiLoading = true;

							serverService.getApi(e_url).then(function (a) {
								var data = a.data;
								$rootScope.formData.apiLoading = false;
								if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
									frmMain.action = data.eSignApiUrl;
									$('#msg').val(data.requestXml);
									document.getElementById("frmMain").submit();
								} else if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
									frmMain.action = data.data.eSignApiUrl;
									$('#msg').val(data.data.requestXml);
									document.getElementById("frmMain").submit();
								} else {
									$rootScope.customerSMS = true;
									$('#customerSMS').modal({
										backdrop: 'static',
										keyboard: false
									});
									$rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
									return false;
								}
							});

						} else {

							$scope.updateIPVStage('');

						}
					}
				}
			}

			$scope.updateIPVStage = function (process) {
				if ((($rootScope.formData.CKYC == true || sessionStorage.getItem('IsCKYC') == 'true') && $rootScope.formData.KRA == true) || $scope.selfTrue) {
					var s_url = "DIYUpdateIPVStage";
					var refNo = $rootScope.formData.ReferenceNumber;
					var sendData = {
						ReferenceNumber: refNo,
						BrowserType: $rootScope.formData.browserType,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					};
					dataLayer.push({
						event: 'StageChange',
						attributes: {
							'level complete': '6',
							'event': 'DIY Document Upload',
							'Application No': $rootScope.formData.ReferenceNumber,
						}
					});
					$('#formPDF').modal('hide');
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data
							if (response == '1' || response == '100' || response == '200') {
								$rootScope.EncryptToken = '';
								sessionStorage.removeItem('AxToken');
								$rootScope.formData.apiLoading = false;

								$state.go('complete', {
									mobile: $rootScope.formData.EncMobile
								});
								/*setTimeout(function () {
								$('#downloadPOA').modal({
								keyboard: false,
								backdrop: 'static'
								});
								}, 1000)*/

							}

					});
				} else {
					var ipvOtpUrl = 'IPVOTPGenerationNew';
					$rootScope.formData.apiLoading = true;
					var ipvData = {
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						Mobile: $rootScope.formData.fields.mobile,
						BrowserType: $rootScope.formData.browserType
					};
					serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
						$rootScope.formData.apiLoading = false;
						var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
						serverService.apiIPVCall(url).then(function (b) {});
					});
				}
			}
			$scope.redirecttoPersonalDetail = function () {
				$state.go('personalDetails', {
					mobile: $rootScope.formData.EncMobile
				});

			}

			$scope.validateEmailOTP = function () {

				$scope.emailotpSuccess = false;
				$scope.invalidEmailOTP = false;
				$scope.EmptyEmailOtp = false;
				var url = "UnAuthorizeOTPValidation";

				$rootScope.formData.apiLoading = true;
				var sendData = {
					'Mobile': $rootScope.formData.fields.mobile,
					'Email': $rootScope.formData.fields.email,
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
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
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
						$scope.emailotpSuccess = true;
						$scope.newEmailOTP = false;
					} else {
						$scope.emailotpSuccess = false;
						$scope.invalidEmailOTP = false;
						$scope.limitEmailOTP = true;
						$scope.elimitError = response.ErrorMessage
					}

				});
			}

			$scope.displayForm = function () {
				var error = 0;
				if (!$scope.docImgCompleted) {
					if (!$scope.signatureUpdt && (!$scope.ibDocumentHide || $scope.ibCkycDocumentShow)) {
						$scope.signatureImgError = true;
						$("html, body").animate({
							scrollTop: $("#SPECIMENPROOF").offset().top
						});
						error++;
					}
					if ($scope.panUpld && !$scope.panImageUpdt && !$scope.ibDocumentHide) {
						$scope.panImgError = true;
						$("html, body").animate({
							scrollTop: $("#PANNumber").offset().top
						});
						error++;
					}
					if ($scope.clientPhoqqualityError || ($scope.photoUpld && !$scope.photoImageUpdt && (!$scope.ibDocumentHide || $scope.ibCkycDocumentShow))) {
						$scope.photoImgError = true;
						$("html, body").animate({
							scrollTop: $("#ClientPhoto").offset().top
						});
						error++;
					}
					if ($scope.chequeUpld && !$scope.bankUpdt && (!$rootScope.webfinacle && !$rootScope.formData.CKYC)) {
						$scope.bankImgError = true;
						$("html, body").animate({
							scrollTop: $("#BankCheque").offset().top
						});
						error++;
					}
					if ($scope.addressUpld && !$scope.cAddressUpdt && !$scope.ibDocumentHide) {
						$scope.cAddressImgError = true;
						$("html, body").animate({
							scrollTop: $("#CorrespondenceAddress").offset().top
						});
						error++;
					}
					if ($scope.addressUpld && $scope.paddrUpld && !$scope.pAddressUpdt && !$scope.ibDocumentHide) {
						$scope.pAddressImgError = true;
						$("html, body").animate({
							scrollTop: $("#PermenantAddress").offset().top
						});
						error++;
					}
					if ($scope.cmlUpld) {
						if (!$scope.cmlUpdt && !$scope.ibDocumentHide) {
							$scope.cmlImgError = true;
							$("html, body").animate({
								scrollTop: $("#PermenantAddress").offset().top
							});
							error++;
						}
					}
					const AgreeTC = $('#agree-terms').iCheck('update')[0].checked;
					if (!AgreeTC) {
						$scope.termsError = true;
						error++;
					}
				}
				if (error == 0) {
					if ($rootScope.formData.RMModule) {
						$rootScope.formData.apiLoading = true;
						var url = "DIYDocStageCompletion";

						var sendRequest = {
							"ReferenceNumber": $rootScope.formData.ReferenceNumber,
							"IsDocStageCompleted": true
						}

						serverService.apiCall(url, sendRequest).then(function (a) {});

						if ($rootScope.formData.RMModule) {
							$rootScope.formData.apiLoading = false;
							$('#proceedConfirmRM').modal({
								backdrop: 'static',
								keyboard: false
							});

						} else {
							$rootScope.formData.apiLoading = false;
							if ($scope.lastStage) {
								$state.go('complete', {
									mobile: $rootScope.formData.EncMobile
								});
							}
							if ($rootScope.formData.ckyClient) {
								$scope.signatureButtons = true;
							}
							if ($scope.ckycKRA) {
								$scope.getOTP();
							}
							if ($scope.ipvStage || $scope.esignCompleted) {
								var ipvOtpUrl = 'IPVOTPGenerationNew';
								$rootScope.formData.apiLoading = true;
								var ipvData = {
									ReferenceNumber: $rootScope.formData.ReferenceNumber,
									Mobile: $rootScope.formData.fields.mobile,
									BrowserType: $rootScope.formData.browserType
								};
								serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
									$rootScope.formData.apiLoading = false;
									var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
									serverService.apiIPVCall(url).then(function (b) {});
								});
							} else {
								$('#formPDF').modal({
									backdrop: 'static',
									keyboard: true
								});
								var url = "GetEncrptToken";
								var sendData = {
									ReferenceNumber: sessionStorage.getItem('AxNo')
								}
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(url, sendData).then(function (a) {
									var res = a.data
										$rootScope.formData.apiLoading = false;
									$rootScope.token = res.EncryptToken;
									$rootScope.formData.apiLoading = false;
									if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
										$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else {
										$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									}
								});
							}

						}
					} else {
						$rootScope.formData.apiLoading = true;
						var url = "DIYDocStageCompletion";

						var sendRequest = {
							"ReferenceNumber": $rootScope.formData.ReferenceNumber,
							"IsDocStageCompleted": true
						}

						serverService.apiCall(url, sendRequest).then(function (a) {});

						if ($rootScope.formData.RMModule) {
							$rootScope.formData.apiLoading = false;
							$('#proceedConfirmRM').modal({
								backdrop: 'static',
								keyboard: false
							});

						} else {
							$rootScope.formData.apiLoading = false;
							if ($scope.lastStage) {
								$state.go('complete', {
									mobile: $rootScope.formData.EncMobile
								});
							}
							if ($rootScope.formData.ckyClient) {
								$scope.signatureButtons = true;
							}
							if ($scope.ckycKRA) {
								$scope.getOTP();
							}
							if ($scope.ipvStage || $scope.esignCompleted) {
								if ($scope.selfTrue) {
									$scope.updateIPVStage();
								} else {
									var ipvOtpUrl = 'IPVOTPGenerationNew';
									$rootScope.formData.apiLoading = true;
									var ipvData = {
										ReferenceNumber: $rootScope.formData.ReferenceNumber,
										Mobile: $rootScope.formData.fields.mobile,
										BrowserType: $rootScope.formData.browserType
									};
									serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
										$rootScope.formData.apiLoading = false;
										var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
										serverService.apiIPVCall(url).then(function (a) {});
									});
								}
							} else {
								$('#formPDF').modal({
									backdrop: 'static',
									keyboard: true
								});
								var url = "GetEncrptToken";
								var sendData = {
									ReferenceNumber: sessionStorage.getItem('AxNo')
								}
								$rootScope.formData.apiLoading = true;
								serverService.apiCall(url, sendData).then(function (a) {
									var res = a.data
										$rootScope.formData.apiLoading = false;
									$rootScope.token = res.EncryptToken;
									$rootScope.formData.apiLoading = false;
									if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
										$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else {
										$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									}
								});
							}

						}
					}
				}
			}

			$scope.rmNewForm = function () {
				sessionStorage.clear();
				location.reload();
			}

			$scope.closeForm = function () {
				$('#formPDF').modal('hide');

				/*$('#signatureModal').modal({
				backdrop: 'static',
				keyboard: true
				});*/
				$('#otpSection').modal({
					backdrop: 'static',
					keyboard: false
				});

			}

			$scope.validateOTP = function () {
				var url = "OTPValidationKRAMobileNum";
				$scope.invalidOTP = false;
				var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					"EncryptToken": $rootScope.EncryptToken,
					"IsDiy": true,
					"MobileOtpCode": $rootScope.formData.fields.otpCkyc,
					"MobileFlag": true
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
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
						$scope.otpSuccess = true;
						$('#otpSection').modal('hide');
						$scope.updateIPVStage('');
					} else {
						$scope.otpSuccess = false;
						$scope.invalidOTP = true;
					}

				});
			}

			$scope.getOTP = function () {
				var url = "CheckISKRAMobileNumMatch";
				var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					"EncryptToken": $rootScope.EncryptToken,
					"IsDiy": true
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
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
					if (response.IsSuccess && response.IsMatched == 'Y') {
						$scope.signatureButtons = false;
						$scope.ckycSignature = true;
						$scope.enableResendButton = false;
						$scope.resendCounter();
						if ($rootScope.formData.CKYC == true && $rootScope.formData.KRA == true) {
							$scope.hideEsign = true;
						}

					}

				});
			}

			$scope.rmproceedStatus = function () {
				$("#RmproceedStatus").modal({
					backdrop: 'static',
					keyboard: false
				})
				$scope.showlinktoCustomer = true
			}
			$("#responseSms").hide();
			$scope.sendSMSToCustomer = function () {
				if ($rootScope.formData.RMModule) {
					var s_url = "DIYRMSendSmsToUser";
					var sendData = {
						"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data
							$rootScope.formData.apiLoading = false;
						$scope.showlinktoCustomer = false
							$rootScope.customerSMS = true;
						if ($scope.showlinktoCustomer) {
							$('#customerSMS').modal({
								backdrop: 'static',
								keyboard: false
							});
						}
						$("#responseSms").show();
						// $("#responseSms").delay(1000).fadeOut(5000);
						setTimeout(function () {
							$("#responseSms").hide();
						}, 5000);
						$rootScope.apiResponseErrorMsg = "URL has been sent to Client’s registered details. Kindly ask Customer to proceed with journey completion.";
					});
				} else {
					var tokenParams = {
						'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'),
						'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : sessionStorage.getItem('RxMobile'),
						'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : sessionStorage.getItem('RxPan'),
						'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : sessionStorage.getItem('DOB'),
					}
					var smsUrl = "DocumentUrlSend";
					var referenceNo = $rootScope.formData.ReferenceNumber;
					var sendData = {
						ReferenceNumber: referenceNo
					};
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(smsUrl, sendData).then(function (a) {
						$rootScope.formData.apiLoading = false;
						$('#APIResponse').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.apiResponseErrorMsg = "Upload document link sent to your mobile successfully";
					});
				}
			}

			$scope.togglePassword = function () {
				$scope.typePassword = !$scope.typePassword;
			}

			$scope.resendCounter = function () {
				$scope.ResendDisable = true;
				var counter1 = 59;
				$scope.counter = "00:59";

				$scope.runTimer = setInterval(function () {
						counter1--;
						if (counter1 < 55) {
							$scope.showotpStatus = false;
						}
						if (counter1 < 10) {
							counter1 = "0" + counter1;
						}
						$scope.counter = '00:' + counter1.toString();
						if (counter1 < 1) {
							$scope.ResendDisable = false;
							$scope.enableResendButton = true;
							clearInterval($scope.runTimer);
						}
						$scope.$apply();
					}, 1000);
			}

			$scope.termsModal = function () {
				$('#documentUploadterms').modal({
					backdrop: 'static',
					keyboard: true
				})
			}

			$scope.selfImgUpld = function () {
				$scope.updateImage('ClientPhoto', $('#photo').attr('src'), 'Image', '');
				$('#cammodal').modal('hide');
				$scope.selfTrue = false;
			}
			$scope.donwloadImage = function (url) {
				// process to auto download it
				if (url == 'RM') {
					$scope.fileUrl = 'data:image/png;base64,' + $rootScope.formData.tcImage;
				} else {
					$scope.fileUrl = 'data:image/png;base64,' + $rootScope.formData.poaImage;
				}

				const link = document.createElement('a');
				link.href = $scope.fileUrl;
				link.download = url + '.png';
				link.click();

			}
			if ($rootScope.formData.isMobile) {

				/*navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
				})
				.then(function (stream) {
				})
				.catch(function (err) {
				$scope.cameraDisabled = true;
				});*/

				setTimeout(function () {
					$(".clientPhoto .input-upload").fileinput({
						'showUpload': false,
						'browseLabel': 'TAKE SELFIE',
						'browseIcon': '',
						'previewFileType': 'any'
					});
				}, 10)

			} else {
				var width = 320; // We will scale the photo width to this
				var height = 0; // This will be computed based on the input stream

				// |streaming| indicates whether or not we're currently streaming
				// video from the camera. Obviously, we start at false.

				var streaming = false;

				// The various HTML elements we need to configure or control. These
				// will be set by the startup() function.

				var video = null;
				var canvas = null;
				var photo = null;
				var startbutton = null;

				video = document.getElementById('video');
				canvas = document.getElementById('canvas');
				photo = document.getElementById('photo');
				startbutton = document.getElementById('startbutton');

				// for trial
				if (navigator.mediaDevices === undefined) {
					navigator.mediaDevices = {};
				}
				if (navigator.mediaDevices.getUserMedia === undefined) {
					navigator.mediaDevices.getUserMedia = function (constraints) {

						// First get ahold of the legacy getUserMedia, if present
						var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

						// Some browsers just don't implement it - return a rejected promise with an error
						// to keep a consistent interface
						if (!getUserMedia) {
							return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
						}

						// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
						return new Promise(function (resolve, reject) {
							getUserMedia.call(navigator, constraints, resolve, reject);
						});
					}
				} else {
					/*navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false
					})
					.then(function (stream) {
					video.srcObject = stream;
					video.play();
					})
					.catch(function (err) {
					$scope.cameraDisabled = true;
					});*/
				}

				video.addEventListener('canplay', function (ev) {
					if (!streaming) {
						height = video.videoHeight / (video.videoWidth / width);

						// Firefox currently has a bug where the height can't be read from
						// the video, so we will make assumptions if this happens.

						if (isNaN(height)) {
							height = width / (4 / 3);
						}

						video.setAttribute('width', width);
						video.setAttribute('height', height);
						canvas.setAttribute('width', width);
						canvas.setAttribute('height', height);
						streaming = true;
					}
				}, false);

				startbutton.addEventListener('click', function (ev) {

					$('#selfieErrorText').html('')
					takepicture();
					ev.preventDefault();
				}, false);

				clearphoto();

				// Fill the photo with an indication that none has been
				// captured.

				function clearphoto() {
					var context = canvas.getContext('2d');
					context.fillStyle = "#AAA";
					context.fillRect(0, 0, canvas.width, canvas.height);

					var data = canvas.toDataURL('image/png');
					photo.setAttribute('src', data);
				}

				// Capture a photo by fetching the current contents of the video
				// and drawing it into a canvas, then converting that to a PNG
				// format data URL. By drawing it on an offscreen canvas and then
				// drawing that to the screen, we can change its size and/or apply
				// other changes before drawing it.

				function takepicture() {
					$scope.IsSelfi = 'Y';
					$scope.selfTrue = true;
					$scope.$apply();
					getPermission()
					var context = canvas.getContext('2d');
					if (width && height) {
						canvas.width = width;
						canvas.height = height;
						context.drawImage(video, 0, 0, width, height);

						var data = canvas.toDataURL('image/png');
						photo.setAttribute('src', data);
					} else {
						clearphoto();
					}
				}
				function getPermission() {
					navigator.mediaDevices.getUserMedia({
						video: true
					})
					.then(() => {
						sessionStorage.setItem('web_rtc_permission', 'true');
						// location.reload();
						// document.getElementById('notification').innerHTML = 'Thank you for your kind permission';
					});
				}
			}

			$("#generatePdfMsg").hide();
			$("#sentPdfMsg").hide();
			$scope.rmgeneratePOA = function (ref, type) {
				var url = "SalesAppGeneratePOAAOFRM";
				var sendData;

				if (type == 'poa') {
					sendData = {
						ReferenceNumber: ref,
						"IsPOAGenerate": true,
						"IsAOFGenerate": false,
						"IsAOFDownload": false,
						"IsPOADownload": false
					};
				} else {
					sendData = {
						ReferenceNumber: ref,
						"IsPOAGenerate": false,
						"IsAOFGenerate": true,
						"IsPOADownload": false,
						"IsAOFDownload": false
					};
				}

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
						$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						// $('#rejectModal').modal();
						$("#generatePdfMsg").show();
						// $("#responseSms").delay(1000).fadeOut(5000);
						setTimeout(function () {
							$("#generatePdfMsg").hide();
						}, 5000);
						$scope.reason = type.toUpperCase() + ' generated, please wait for few minutes to download it.'
					} else {}
				});
			}
			$scope.rmdownloadPOA = function (ref, type) {
				var url = "SalesAppGeneratePOAAOFRM";
				var sendData;
				if (type == 'poa') {
					sendData = {
						ReferenceNumber: ref,
						"IsPOAGenerate": false,
						"IsAOFGenerate": false,
						"IsPOADownload": true,
						"IsAOFDownload": false
					};
				} else {
					sendData = {
						ReferenceNumber: ref,
						"IsPOAGenerate": false,
						"IsAOFGenerate": false,
						"IsPOADownload": false,
						"IsAOFDownload": true
					};
				}

				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
						$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						var link = document.createElement("a");
						link.download = ref + '_' + type + '.pdf';
						if (type == 'poa') {
							link.href = "data:application/pdf;base64," + response.POABase64;
						} else {
							link.href = "data:application/pdf;base64," + response.AOFBase64;
						}
						link.click();
					} else {}
				});
			}
			$scope.sentPdfAofPoa = function () {
				url = "SendEmailAOFPDF"
					var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
						$rootScope.formData.apiLoading = false;
					// $("#sentPdfDialog").modal()
					if (response.IsSuccess) {
						$scope.sentPdfSuccess = true
							$("#sentPdfMsg").show();
						// $("#responseSms").delay(1000).fadeOut(5000);
						setTimeout(function () {
							$("#sentPdfMsg").hide();
						}, 5000);
						$scope.sentPdfSuccessMsg = response.SuccessMessage
					} else {
						$scope.sentPdfFailure = true
							$scope.sentPdfFailureMsg = response.ErrorMessage
					}
				})
			}
			$scope.sentPdfPoaEmail = function () {
				url = "SendEmailPOAPDF"
					var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data
						$rootScope.formData.apiLoading = false;
					// $("#sentPdfDialog").modal()
					if (response.IsSuccess) {
						$scope.sentPdfSuccess = true
							$("#sentPdfMsg").show();
						// $("#responseSms").delay(1000).fadeOut(5000);
						setTimeout(function () {
							$("#sentPdfMsg").hide();
						}, 5000);
						$scope.sentPdfSuccessMsg = response.SuccessMessage
					} else {
						$scope.sentPdfFailure = true
							$scope.sentPdfFailureMsg = response.ErrorMessage
					}
				})
			}
			$scope.rmPdfPreview = function () {
				$("#RmproceedStatus").modal('hide')
				$('#formPDF').modal({
					backdrop: 'static',
					keyboard: true
				});
				//For APPServer
				var url = "GetEncrptToken";
				var sendData = {
					ReferenceNumber: sessionStorage.getItem('AxNo')
				}
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var res = a.data
						$rootScope.formData.apiLoading = false;
					$rootScope.token = res.EncryptToken;
					$rootScope.formData.apiLoading = false;
					if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
						$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else {
						$rootScope.objURl = serverService.pdfUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					}
				});
			}
		}
	]);
