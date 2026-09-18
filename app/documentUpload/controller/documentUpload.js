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
// function imgup(){
// 	$('.c-adr .file-input').append('<div><input type="file" accept="image/*" class="input-upload" id="CorrespondenceAddress" onchange="imgUpld(\'CorrespondenceAddress\');"></div>')
// }
mainApp.controller('documentController', ['$scope', '$rootScope', '$state', 'serverService', '$window', '$location', '$interval', function ($scope, $rootScope, $state, serverService, $window, $location, $interval) {
	var searchObject = $location.search();
	$scope.signatureUpld = true;
	if (!angular.isUndefined(searchObject.ReferenceNumber)) {
		sessionStorage.removeItem('AxToken');
		$rootScope.EncryptToken = '';
		sessionStorage.setItem('AxNo', searchObject.ReferenceNumber);
	}

	var searchObject = $location.search();
	$scope.signatureUpld = true;
	if (!angular.isUndefined(searchObject.ReferenceNumber)) {
		sessionStorage.removeItem('AxToken');
		$rootScope.EncryptToken = '';
		sessionStorage.setItem('AxNo', searchObject.ReferenceNumber);
	}

	if (!$rootScope.formData.RMModule && $rootScope.formData.makePayment && !$rootScope.formData.skippedPayment) {
		$state.go('products', {
			mobile: $rootScope.formData.EncMobile
		});
		sessionStorage.setItem('productStage', true);
	} else {
		sessionStorage.removeItem('productStage');
	}
	if (!angular.isUndefined(searchObject.eSignFailure)) {
		var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
			backdrop: 'static',
			keyboard: false
		});
		APIResponseModal.show();
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
		})
	}

	// var p_url = "DIYGetDocumentTypeDropDownListWithRef?ReferenceNumber=" + $rootScope.formData.ReferenceNumber;
	// serverService.getApi(p_url).then(function (a) {
	// 	$rootScope.formData.corressDocList=[];
	// 	$rootScope.formData.pDocList=[];
	// 	var response = a.data
	// 	if (response.DocumentTypeList) {
	// 		for (var n = 0; n < response.DocumentTypeList.length; n++) {
	// 			if (response.DocumentTypeList[n].DocumentCategory == "C") {
	// 				$rootScope.formData.corressDocList.push(response.DocumentTypeList[n]);
	// 			}
	// 			if (response.DocumentTypeList[n].DocumentCategory == "P") {
	// 				$rootScope.formData.pDocList.push(response.DocumentTypeList[n]);
	// 			}
	// 			if(response.DocumentTypeList[n].DocumentTypeId==1012){
	// 				$rootScope.formData.fields.DocsaddressProof="1012"
	// 				$rootScope.formData.fields.pDocsaddressProof ="1012"
	// 				$("#c1address option:contains(" + $rootScope.formData.fields.DocsaddressProof + ")").prop('selected', true);
	// 						$(".select").select2();
	// 						$("#p1address option:contains(" + $rootScope.formData.fields.pDocsaddressProof + ")").prop('selected', true);
	// 						$(".select").select2();
	// 				}
	// 	}
	// 	}
	// })
	$rootScope.formData.stageInfo = '6';
	$rootScope.formData.stageOrder = 6;
	$rootScope.formData.eProgress = 0;
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
	$scope.liveface = false;
	$scope.pdocumentSample = false;
	$scope.panUpld = true;
	$scope.imgPanName = "";
	$scope.PanimgValue = ""
	$scope.PanFileType = "";
	$scope.PandocId = "";
	$scope.aadhaarvalidation = false;
	$scope.photoUpld = true;
	$scope.addressUpld = true;
	$rootScope.getAPI = true;
	$scope.otpSuccess = false;
	$scope.hideEsign = false;
	$scope.ImgData = true;
	$scope.docImgCompleted = false;
	$scope.IsSelfi = 'N';
	$scope.showlinktoCustomer = true;
	$scope.validateImgFlag = true;
	$scope.cmlShow = false;
	$rootScope.wizardShow = true;
	$scope.optimize = true;
	$scope.ddpi = 'Y';
	$scope.loadPdf = true;
	$scope.preview7 = false;
	$rootScope.digiProofEnable = false;
	$scope.allowEsign = false;
	$scope.ctypeError = false;
	$scope.locationerror = false;
	$scope.disableESign = false;
	$scope.locError = false;
	$scope.EsignFlag = {};
	$scope.commonModalErrorMessage = "";
	$scope.vcipDigi = false;
	$scope.digilockerFlag = "";
	$scope.documentChangeNumber = '';
	$scope.pdocumentChangeNumber = '';
	$scope.documentMaxlength = 0;
	$scope.pdocumentMaxlength = 0;
	$scope.expiryDate = '';
	$scope.pexpiryDate = '';
	$scope.showValidateFields = false;
	$scope.documentnumError = '';
	$scope.pdocumentnumError = '';
	$scope.expiryDateError = '';
	$scope.pexpiryDateError = '';
	$scope.byodnumberValidation = false;
	$scope.kraUpdateFlag = false;

	// new validation for byod start here
	var Aahaar = /^\d{4}$/;
	var pan_filter = /[a-z]{3}[p][a-z]{1}\d{4}[a-z]/i;
	$scope.panMobileRegError = false;
	$scope.panEmailRegError = false;
	$scope.panMobileRegMsg = "";
	$scope.panEmailRegMsg = "";
	$scope.filter = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
	$scope.emailErrorMessage = "";
	$scope.emptyEmail = false;
	$scope.byodErrorMessage = "";
	$scope.emailVerificationSend = false;
	$scope.emailEmpty = true;
	$scope.mobileBelongsShow = false;
	$scope.emailIdBelongsShow = false;
	$scope.changeMobileNum = false;
	$scope.changeEmailId = false;
	$scope.emptyMobile = false;
	$scope.mobileErrorMessage = "";
	$scope.mobileRegex = /^[6-9]\d{9}$/;
	$scope.showotpMobile = false;
	$scope.oldMobileNumber = "";
	$scope.otpEmpty = false;
	$scope.otpErrorMessageMobile = "";
	$scope.newOTP = false;
	$scope.newEmailOTP = false;
	$scope.oldEmail = '';
	$scope.otpEmailSuccess = false;
	$scope.emailOtpError = false;
	$scope.emailOtpErrorMsg = "";
	$rootScope.formData.nomineeRelationList = [];
	$scope.NomineeError = false;
	$rootScope.nomineeRemoveIndex = -1;
	$scope.KraUpdate = 'N';
	$scope.DisabilityVal = 'N';
	$scope.DisabilityValFreeeze = false;
	$scope.DDpiErr = false;
	$rootScope.formData.fields.InternetTrading = "";
	$scope.utmshortcode = '';
	$scope.cmlImg_reShow = false;
	$scope.hdlPerm = false;
	$scope.cmlBankval = false;
	$scope.EmarginHide = true;
	$scope.getNomineerelation = function () {
		if ($rootScope.formData.nomineeRelationList.length === 0) {
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
		}

	};
	// new validation for byod ends here variables
	var options = {
		enableHighAccuracy: true,
		timeout: 30000,
		maximumAge: 60000
	};
	function success(pos) {
		var crd = pos.coords;
		if (crd.latitude && crd.longitude) {
			var latitude = crd.latitude;
			var longitude = crd.longitude;
			if (latitude && longitude) {
				$rootScope.formData.latitude = latitude;
				$rootScope.formData.longitude = longitude;
				$scope.takeSelfieDisabled = false;
				$scope.takeSelfieUnavailableStatus = false;
				$scope.$apply();
				if ($rootScope.BYOD) {
					$scope.geolocation();
				}
			}
		} else { }

	}


	function error(err) {
		$rootScope.formData.latitude = '';
		$rootScope.formData.longitude = '';
		$scope.takeSelfieDisabled = true;
		$scope.takeSelfieUnavailableStatus = true;
		$scope.$apply();
	}

	//navigator.geolocation.getCurrentPosition(success, error, options);
	$rootScope.handlePermission = function () {
		// var options = {
		// 	enableHighAccuracy: true,
		// 	timeout: 5000,
		// 	maximumAge: 0
		// };
		navigator.geolocation.getCurrentPosition(success, error, options);
		setTimeout(function () {
			if ($rootScope.formData.latitude && $rootScope.formData.longitude) {
				$scope.takeSelfieDisabled = false;
				$scope.takeSelfieUnavailableStatus = false;
				$scope.$apply();
			} else {
				$scope.takeSelfieDisabled = true;
				$scope.takeSelfieUnavailableStatus = true;
				$scope.$apply();
			}
		}, 100)
		if (!$rootScope.formData.isMobile || $rootScope.formData.isMobile) {
			navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
			})
				.then(function (stream) {
					if (!$rootScope.formData.isMobile || $rootScope.formData.isMobile) {
						video.srcObject = stream;
						video.play();
					}
					$scope.cameraDisabled = false;
					$scope.$apply();
				})
				.catch(function (err) {
					$scope.cameraDisabled = true;
					$scope.$apply();
				});
		}
	}
	$rootScope.handlePermission();
	var FaceLivenessModal = new bootstrap.Modal(document.getElementById('FaceLiveness'), {
		backdrop: 'static',
		keyboard: false
	});
	FaceLivenessModal.hide();
	var cammodalModal = new bootstrap.Modal(document.getElementById('cammodal'), {
		backdrop: 'static',
		keyboard: false
	});
	cammodalModal.hide();
	$scope.camModal = function () {
		navigator.geolocation.getCurrentPosition(success, error, options);
		if ($rootScope.formData.FaceLiveness >= 1) {
			FaceLivenessModal.show();
			cammodalModal.hide();
			$scope.liveface = true;
			if ($rootScope.formData.RemainingFaceliveness == 0) {
				$scope.facenocredits = true;
				$scope.facecredits = false;
			} else {
				$scope.facecredits = true;
				$scope.facenocredits = false;
			}
		}
		setTimeout(function () {

			if ($rootScope.formData.latitude && $rootScope.formData.longitude) {
				$scope.takeSelfieDisabled = false;
				$scope.takeSelfieUnavailableStatus = false;

				navigator.permissions.query({
					name: 'camera'
				})
					.then((permissionObj) => {
						if (permissionObj.state == 'denied') {
							$scope.cameraDisabled = true;
							$scope.takeSelfieDisabled = true;
						} else {
							if (!$scope.takeSelfieDisabled && !$scope.liveface) {
								var cammodalModal = new bootstrap.Modal(document.getElementById('cammodal'));
								cammodalModal.show();
							}
						}
						$scope.$apply();
					})
					.catch((error) => {
						console.log('Got error :', error);
					})

			} else {
				$scope.takeSelfieDisabled = true;
				$scope.takeSelfieUnavailableStatus = true;
				$scope.$apply();
			}

		}, 200)
	}
	$scope.Facedefalut = function () {
		cammodalModal.show();
		FaceLivenessModal.hide();
	}
	if (sessionStorage.getItem('IsAadharVerified') == 'true') {
		$rootScope.formData.fields.DocsaddressProof = '111';
		$scope.formData.AadharSuccess = JSON.parse(sessionStorage.getItem('IsAadharVerified'));
	}
	if (sessionStorage.getItem('signature') == "true") {
		signature = "true";
	}
	if ($rootScope.getAPI) {
		if (sessionStorage.getItem('AxNo') != null) {
			$rootScope.getAPI = false;
			$rootScope.formData.eRefNumber = sessionStorage.getItem('AxNo');
			setTimeout(function () {
				if ((!signature || signature != 'true') && (!$rootScope.vcip && sessionStorage.getItem('mode') != "V")) {
					$rootScope.getDIYStatus();
				}
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
				if (response.BankDetailsList[0].Dp == 'Y') {
					$scope.cmlShow = true;
					$scope.cmlBankval = true;
				}
				if (response.BankDetailsList[0].DpId) {
					$scope.EmarginHide = false;
					$rootScope.formData.fields.InternetTrading = "N";
				}
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
		}
	})

	$scope.getDocsProof = function () {
		var s_url = "DIYGetDocumentProofStageByRefEnc";

		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		};
		// sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data
			if (response.IsSuccess) {
				$rootScope.IsCorrespondenceSikkim = response.ObjCDIYRegistration.IsCorrespondenceSikkim
				$rootScope.IsPermanentSikkim = response.ObjCDIYRegistration.IsPermanentSikkim
				$rootScope.ResumeIsFatherNamePopup = response.ObjCDIYRegistration.IsFatherNamePopup
				$rootScope.FatherNamefromIdfy = response.ObjCDIYRegistration.FatherNameFromIdfy
				$rootScope.fsName = response.FatherName;
				// if ($rootScope.ResumeIsFatherNamePopup == "Y" && $rootScope.formData.Pansuccess != 0 && !$rootScope.BYOD) {
				// 	var previewPdf1PanModal = new bootstrap.Modal(document.getElementById('previewPdf1Pan'), {
				// 		backdrop: 'static',
				// 		keyboard: true
				// 	});
				// 	previewPdf1PanModal.show();
				// }
				if ($rootScope.IsCorrespondenceSikkim == "Y" || $rootScope.IsPermanentSikkim == "Y") {
					$scope.addressUpld = true;
				}
				if (response.ObjCDIYRegistration.JanaFlag == 'Y') {
					$scope.JanaFlagPdf = true
				}
				if (response.ObjCDIYRegistration.UTMBankShortCode) {
					$scope.utmshortcode = response.ObjCDIYRegistration.UTMBankShortCode;
				}
				if (response.ObjCDIYRegistration.DDIP != 'N') {
					$scope.ddpi = 'Y';

					setTimeout(function () {
						$('#ddpi').prop('checked', true);
					}, 50);
				} else {
					$scope.ddpi = 'N';
					setTimeout(function () {
						$('#ddpi').prop('checked', false);
					}, 50);
				}
				if (response.ObjCDIYRegistration.Emargin == 'Y') {
					$scope.ddpi = 'Y';
					setTimeout(function () {
						$('#InternetTrading').prop('checked', true);
						$('#ddpi').prop('checked', true);
					}, 50);
					$rootScope.formData.fields.InternetTrading = "Y";
					$scope.termsOpen = true;
				}
				if (response.ObjCDIYRegistration.IsDDPIValidation == 'Y') {
					$scope.DDpiErr = true;
					$scope.ddpi = 'Y';
					setTimeout(function () {
						$('#ddpi').prop('checked', true);
					}, 50);
				}

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
				}
				if (response.ObjCDIYRegistration.UTMBankShortCode == "JFSB") {
					sessionStorage.setItem('JanaBank', true);
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
						$state.go('Sip', {
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
						if (response.ObjCDIYRegistration.AxisBank == 1) { }
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

				if ($rootScope.webfinacle && $rootScope.formData.CKYC && response.ObjCDIYRegistration.IsKRAEdit != '1') {
					$rootScope.ibDocumentHide = true;
					$rootScope.ibCkycDocumentShow = true;
					$scope.photoUpld = true;
					/*if (response.ObjCDIYRegistration.Pennydrop != 1) {
					$scope.chequeUpld = true;
					}*/
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
				$scope.getImages();
			}
		});

	}
	if (signature && signature == 'true') {
		if (sessionStorage.getItem('vcpno')) {
			ReferenceNumber = sessionStorage.getItem('vcpno');
			$rootScope.verifyemail = true;
		}
		$rootScope.wizardShow = false;
		$rootScope.vcip = true;
		$rootScope.existingCustomer = false;
		$rootScope.existingResponse = true;
		$scope.vcipSignature = true;
		if (sessionStorage.getItem('reusmeOTPVerified') && sessionStorage.getItem('reusmeOTPVerified') == 'verified') {
			//$window.sessionStorage.clear();
		} else {
			var existingCustomerpopup = new bootstrap.Modal(document.getElementById('existingCustomer-popup'), {
				backdrop: 'static',
				keyboard: false
			});
			existingCustomerpopup.show();
			$rootScope.formData.vcipGetOTP = true;
			$scope.vcipOTP = true;
			$window.sessionStorage.clear();
		}
	} else {
		$scope.vcipSignature = false;
		if (!angular.isUndefined(searchObject.VCIP)) {
			$window.sessionStorage.clear();
		}
		$scope.getDocsProof();
	}
	$scope.getToken = function () {
		var url = "GetEncrptToken";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		}

		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var res = a.data;
			$rootScope.formData.apiLoading = false;
			$rootScope.token = res.EncryptToken;
			$rootScope.formData.apiLoading = false;
			if (!res.IsSuccess && res.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = res.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			}
			if ($rootScope.vcip && sessionStorage.getItem('reusmeOTPVerified') && sessionStorage.getItem('reusmeOTPVerified') == 'verified') {
				$scope.displayForm();
				$window.sessionStorage.clear();
			}
			if (!$rootScope.BYODURl) {
				$scope.displayForm();
				/* $window.sessionStorage.clear(); */
			}
		});
	}
	$scope.idfyUsage = function () {
		const URL = `IdfyUsage?RefNo=${$rootScope.formData.eRefNumber}`
		serverService.getApi(URL).then(function (a) {
			var response = a.data[0];
			if (response) {
				$rootScope.formData.RemainingDocumentvalidation = response.RemainingDocumentvalidation;
				$rootScope.formData.RemainingFaceliveness = response.RemainingFaceliveness;
				$rootScope.formData.FaceLiveness = response.SucessFaceLiveness;
				$rootScope.formData.aadhaarsuccess = response.SucessDocumentvalidation;
				$rootScope.formData.RemainingPanvalidation = response.RemainingPanValidationcount;
				$rootScope.formData.Pansuccess = response.SucessPanValidationcount;
			}

		})
	}

	$scope.documentvalidation = function () {
		var s_geturl = "GetOverallStatusDIY";
		$rootScope.formData.apiLoading = true;
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber
		};
		serverService.apiCall(s_geturl, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (!response.AlloweSign) {
				$scope.allowEsign = true;
			}
			$rootScope.DifferentlyAbledStatus = response.DifferentlyAbledStatus;
			if ($rootScope.DifferentlyAbledStatus) {
				$scope.DisabilityValFreeeze = true;
			}
			if (response.IsSuccess && $rootScope.NewDigiLogic && response.Digioption != 'FMF' && response.DigiAadhar == '' && response.Digilocker == "N" && (response.Mode == "V" || response.Mode == "B") && (response.OverallStatusList[0].CKYCClient == "N" || response.OverallStatusList[0].KRAClient == "N")) {
				$scope.vcipDigi = true;
			}
			$scope.EsignFlag = response.OverallStatusList.find(data => data.Name == "ESign")
			if ($scope.EsignFlag.SPStatus != 'Y' && (sessionStorage.getItem('eSign') == "True")) {

				var EsignResponseModal = new bootstrap.Modal(document.getElementById('EsignerrResponse'), {
					backdrop: 'static',
					keyboard: false
				});
				EsignResponseModal.show();
				$rootScope.EsignResponseErrorMsg = "Your eSign was not validated successfully.Please click 'Retry eSign' to complete the process again.";
			}
			if (response.IsSuccess && response.Mode == "B") {
				$rootScope.BYOD = true;
				$scope.getNomineerelation();
				if (((sessionStorage.getItem('namegetMismatch') && sessionStorage.getItem('namegetMismatch') == 'Y') && (sessionStorage.getItem('DobgetMismatch') && sessionStorage.getItem('DobgetMismatch') == 'Y'))) {
					$scope.EsignFlag = response.OverallStatusList.find(data => data.Name == "ESign")
					if ($scope.EsignFlag.SPStatus != 'Y') {
						$scope.displayForm();
					}
				} else {
					$rootScope.decryptUrl();
					return;
				}
			}
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
			$rootScope.formData.RemainingDocumentvalidation = response.RemainingDocumentvalidation;
			$rootScope.formData.RemainingFaceliveness = response.RemainingFaceliveness;
			$rootScope.formData.FaceLiveness = response.SucessFaceLiveness;
			$rootScope.formData.aadhaarsuccess = response.SucessDocumentvalidation;
			$rootScope.formData.RemainingPanvalidation = response.RemainingPanValidation;
			$rootScope.formData.Pansuccess = response.SucessPanValidation;
			$rootScope.formData.IsEmailVerified = response.OverallStatusList[0].IsEmailVerified
			$rootScope.formData.ReferenceNumber = response.OverallStatusList[0].ReferenceNumber;
			$rootScope.formData.eRefNumber = response.RefNumber;
			$rootScope.formData.bankmode = response.Mode;
			$scope.digilockerFlag = response.Digilocker;
			$rootScope.DifferentlyAbledStatus = response.DifferentlyAbledStatus;
			if (response.Digioption == 'DL' && response.Digilocker == 'Y' && response.DigiReferenceNumber) {
				$rootScope.formData.digiData = true;
			}

			if (!$scope.byodnumberValidation && response.Mode != "V" && response.Digilocker == 'N' && (response.OverallStatusList[0].CKYCClient == 'N' || response.OverallStatusList[0].KRAClient == 'N' || response.OverallStatusList[0].KRAUpdate == 'Y')) {
				$scope.showValidateFields = true;
			}
			// if($rootScope.formData.bankmode=="VC"||$rootScope.formData.bankmode=="IB"){
			// 	$("#c1address option:contains(" + $rootScope.formData.fields.DocsaddressProof + ")").prop('selected', true);
			// 	$(".select").select2();
			// 	$('.select').trigger('change');
			// 	$("#p1address option:contains(" + $rootScope.formData.fields.pDocsaddressProof + ")").prop('selected', true);
			// 	$(".select").select2();
			// 	$('.select').trigger('change');
			// }
			$scope.kraUpdateFlag = response.OverallStatusList[0].KRAUpdate == 'Y';
			$rootScope.formData.KRA = response.OverallStatusList[0].KRAClient == 'Y';
			$rootScope.formData.CKYC = response.OverallStatusList[0].CKYCClient == 'Y';
			if (response.OverallStatusList[0].KRAClient == 'Y' && response.OverallStatusList[0].CKYCClient == 'Y') {
				$scope.addressUpld = false;
			}
			if (response.OverallStatusList[0].KRAUpdate == 'Y') {
				$scope.addressUpld = true;
				$scope.KraUpdate = 'Y'
			}
			if (response.Mode === 'B' && response.OverallStatusList[0].KRAUpdate == 'N') {
				$scope.addressUpld = true;
			}
			if ($rootScope.IsCorrespondenceSikkim == "Y" || $rootScope.IsPermanentSikkim == "Y") {
				$scope.addressUpld = true;
			}
			if (response.OverallStatusList[0].IsEmailVerified == true) {
				$rootScope.verifyemail = false;
			} else {
				$rootScope.verifyemail = true;
			}
			if (sessionStorage.getItem('vcpno')) {
				$rootScope.verifyemail = true;
			}
			if (response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[5].EBOStatus != 'R') {
				$scope.docImgCompleted = true;
				$rootScope.formData.docStageCompleted = true;
			} else {
				$rootScope.formData.docStageCompleted = false;
			}
			if (response.OverallStatusList[5].EBOStatus == 'R') {
				$rootScope.formData.docStageRejected = true;
			}
			if (response.OverallStatusList[9].SPStatus == 'Y') {
				$rootScope.esignCompleted = true;
			} else {
				$rootScope.esignCompleted = false;
			} if (response.OverallStatusList[10].SPStatus == 'Y') {
				$rootScope.SipStockCompleted = true;
			} else {
				$rootScope.SipStockCompleted = false;
			}
			if (response.OverallStatusList[1].SPStatus != "Y") {
				$rootScope.BlankSatge = true;
				$state.go('address');
				return false;
			} else if (response.OverallStatusList[4].SPStatus != "Y") {
				$state.go('personalDetails');
				return false;
			}
			else if (response.OverallStatusList[3].SPStatus != "Y") {
				$state.go('bank');
				return false;
			}
			else if (response.OverallStatusList[2].SPStatus != "Y") {
				$state.go('products');
				return false;
			} else if (response.OverallStatusList[7].SPStatus != "Y") {
				$state.go('products');
				return false;
			}
			else if (response.OverallStatusList[0].IsEmailVerified == true) {
				$rootScope.verifyemail = false;
				$rootScope.verifyEmailDiv = false;
			} else {

				if (!$rootScope.vcip && response.Digioption) {
					$rootScope.verifyemail = true;
					$rootScope.verifyEmailDiv = true;
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
					return false
				}
			}
			// if(response.OverallStatusList[5].SPStatus == 'Y' && response.OverallStatusList[9].SPStatus != 'Y'){
			// 	if(response.OverallStatusList[5].IsEmailVerified != true){
			// 		$rootScope.firstCompleted = true;
			// 		$rootScope.secondCompleted = true;
			// 		$rootScope.thirdCompleted  = false;
			// 		$rootScope.fourthCompleted = false;
			// 		$rootScope.formData.aadharhide = true;
			// 		$rootScope.wizardShow = true;
			// 		$state.go('personalDetails', {
			// 			mobile: $rootScope.formData.EncMobile
			// 		});
			// 		return false;
			// 	}else{
			// 		var Emailrl = "CheckEmailMobileStatusDIY";
			// 		var sendDataURL = {
			// 			email: $rootScope.formData.fields.email,
			// 			EncryptToken: $rootScope.EncryptToken,
			// 			IsDiy:true,
			// 			Mobile:$rootScope.formData.fields.mobile,
			// 			ReferenceNumber: $rootScope.formData.ReferenceNumber
			// 		}
			// 		serverService.apiCall(Emailrl, sendDataURL).then(function (a) {
			// 			var response = a.data;
			// 			if (response.IsSuccess) {
			// 				if(response.MobileVerified != "Y"){
			// 					$rootScope.firstCompleted = true;
			// 					$rootScope.secondCompleted = true;
			// 					$rootScope.thirdCompleted  = false;
			// 					$rootScope.fourthCompleted = false;
			// 					$rootScope.formData.aadharhide = true;
			// 					$rootScope.wizardShow = true;
			// 					$state.go('personalDetails', {
			// 						mobile: $rootScope.formData.EncMobile
			// 					});
			// 					return false;
			// 				}
			// 			}
			// 		})
			// 	}
			// }
			if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[9].KRAClient == 'Y' && (response.OverallStatusList[9].CKYCClient != 'Y' || response.OverallStatusList[9].KRAClient != 'Y')) {
				$scope.ipvStage = true;
			}
			if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[0].CKYCClient == 'Y' && response.OverallStatusList[0].KRAClient == 'Y') {
				$scope.lastStage = true;
			}
			if (response.OverallStatusList[9].SPStatus == 'Y' && response.OverallStatusList[8].SPStatus == 'Y') {
				$scope.lastStage = true;
				$scope.selfTrue = true;
			}
			if ($rootScope.vcip && response.OverallStatusList[5].IsSignatureUpload == 'Y') {
				$rootScope.signatureCompleted = true;
				$scope.signatureUpdt = true;

				if (sessionStorage.getItem('reusmeOTPVerified') && sessionStorage.getItem('reusmeOTPVerified') == 'verified') {
					$scope.getToken();
				}
			}
			if (response.OverallStatusList[7].SPStatus == 'Y' && response.OverallStatusList[7].Name.toUpperCase() == 'PAYMENT') {
				$rootScope.formData.isPaymentCompleted = true;
				$rootScope.formData.makePayment = false;
				$rootScope.formData.paymentSkip = false;
				sessionStorage.setItem('isPaymentCompleted', true);
			} else {
				if (!$rootScope.formData.NoPayment) {
					$rootScope.formData.makePayment = true;
					$rootScope.formData.isPaymentCompleted = false;
					sessionStorage.setItem('isPaymentCompleted', false);
				}
			}
		});
	}
	$scope.documentvalidation();

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

	$('.info-cat').bind('mouseover touchstart', function () {
		$(this).siblings('.info-details').show();
		$(this).parents('p').siblings('.info-details').show();
	});

	$('.info-cat').bind('mouseleave touchend', function () {
		$(this).siblings('.info-details').hide();
		$(this).parents('p').siblings('.info-details').hide();
	});

	// $scope.imgPanValidation = function(){

	// 	var s_geturl = "ImageValidation";
	// 	$rootScope.formData.apiLoading = true;
	// 	var sendData = {
	// 		ReferenceNumber: $rootScope.formData.eRefNumber,
	// 		image: $rootScope.formData.panImage,
	// 		doc_type:"ind_pan"
	// 	};
	// 	serverService.apiCall(s_geturl, sendData).then(function (a) {
	// 		var response = a.data;
	// 		$rootScope.formData.apiLoading = false;

	// 		if(response.IsSuccess == true){

	// 		} 

	// }
	// )}






	$scope.imgFormData = function (imgName, filesSelected, type) {
		var url = "UploadFormData";
		var sendData = new FormData();
		sendData.append('ImageName', imgName);
		sendData.append('ReferenceNumber', $rootScope.formData.ReferenceNumber);
		sendData.append('Image', filesSelected[0]);
		sendData.append('DocumentType', type);
		sendData.append('Extension', '');
		sendData.append('IsDiy', '');
		sendData.append('IsSelfi', '');
		sendData.append('IsIPV', '');
		sendData.append('EncryptToken', '');
		sendData.append('Latitude', '');
		sendData.append('Longitude', '');
		$scope.docUpldAPI = true;
		serverService.apiFormCall1(url, sendData).then(function (a) {
			var response = a.data;
			$scope.docUpldAPI = false;
			if (response.IsSuccess) {
				$scope.panImageUpdt = true;
				$scope.panLoad = false;
				$scope.panImgError = false;
				$scope.pantypeError = false;
				// $scope.panImageValidation = true;
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
			$scope.readfiles(filesSelected, imgName);
			// $scope.getImages();

		})
	}
	var imageName = "";
	$scope.aadhaardefault = function () {
		$scope.aadhaarvalidation = true
		$scope.imgUpload(imageName);
	}
	var aadhaarcountvalidationModal = new bootstrap.Modal(document.getElementById('aadhaarcountvalidation'), {
		backdrop: 'static',
		keyboard: false
	});
	aadhaarcountvalidationModal.hide();
	var PancountvalidationModal = new bootstrap.Modal(document.getElementById('Pancountvalidation'), {
		backdrop: 'static',
		keyboard: false
	});
	PancountvalidationModal.hide();
	var aadhaarcount1validationModal = new bootstrap.Modal(document.getElementById('aadhaarcountvalidation1'), {
		backdrop: 'static',
		keyboard: false
	});
	aadhaarcount1validationModal.hide();
	$scope.imgUpload = function (imgName) {
		imageName = imgName;

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
				if ($rootScope.formData.Pansuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingPanvalidation != 0) {
					var PancountModal = new bootstrap.Modal(document.getElementById('Pancount'), {
						backdrop: 'static',
						keyboard: false
					});
					PancountModal.show();
					PancountvalidationModal.hide();
					return false;
				}
				if ($rootScope.formData.RemainingPanvalidation == 0) {
					PancountvalidationModal.show();
					return false;
				}

				imgName = "PANNumber";
				imageName = "PANNumber";
				$scope.panSizeError = false;
				$scope.panQImgError = false;
				$scope.panCNImgError = false;
				if (fileSize > 4194304) {
					$scope.panSizeError = true;
					$('#PANNumber').val('');
				} else {
					$scope.docUpldMsg = 'PAN Upload in progress';
					$scope.aadhaarvalidation = false;
					$scope.readfiles(filesSelected, imgName);
				}

				$scope.$apply();
			} else if (imgName == "ClientPhoto") {
				$scope.photoSizeError = false;
				if (!$rootScope.formData.latitude || !$rootScope.formData.longitude || $rootScope.formData.latitude == 'null' || $rootScope.formData.longitude == 'null') {
					$scope.takeSelfieDisabled = true;
				} else if (!$scope.selfTrue && fileSize > 4194304) {
					$scope.photoSizeError = true;
					$('#ClientPhoto').val('');
				} else {
					$scope.docUpldMsg = 'Selfie Upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "Aadhar") {
				$scope.aadharSizeError = false;
				if (fileSize > 4194304) {
					$scope.aadharSizeError = true;
					$('#Aadhar').val('');
				} else {
					$scope.docUpldMsg = 'Aadhaar Upload in progress';
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
					$('#BankCheque').val('');
				} else {
					$scope.docUpldMsg = 'Cheque image upload in progress';
					$scope.readfiles(filesSelected, imageName);
					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "SPECIMENPROOF") {
				$scope.signatureSizeError = false;
				if (fileSize > 4194304) {
					$scope.signatureSizeError = true;
					$('#SPECIMENPROOF').val('');
				} else {
					$scope.docUpldMsg = 'Signature upload in progress';
					$scope.readfiles(filesSelected, imageName);
					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == 'CorrespondenceAddress' || imgName == 'ReCorrespondenceAddress') {
				if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
					var aadhaarcountModal = new bootstrap.Modal(document.getElementById('aadhaarcount'), {
						backdrop: 'static',
						keyboard: false
					});
					aadhaarcountModal.show();
					aadhaarcountvalidationModal.hide();
					return false;
				}
				if ($rootScope.formData.RemainingDocumentvalidation == 0) {
					aadhaarcountvalidationModal.show();
					return false;
				}

				imgName = 'CorrespondenceAddress';
				imageName = 'CorrespondenceAddress';
				$scope.cSizeError = false;
				$scope.cAddressQImgError = false;
				$scope.cAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.cSizeError = true;
					$('#CorrespondenceAddress').val('');
					$scope.$apply();
				} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
					$scope.docUpldMsg = 'Address proof upload in progress';
					$scope.aadhaarvalidation = false;
					// if ($rootScope.formData.fields.DocsaddressProof != 111) {
					// 	$scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.DocsaddressProof);
					// } else {
					$scope.readfiles(filesSelected, imageName);
					// }

					if ($rootScope.formData.RemainingDocumentvalidation == 0) {
						aadhaarcountvalidationModal.show();
					}

				} else {
					$('#CorrespondenceAddress').val('');
					$("#cAddressImage .file-input").empty();
					$scope.ctypeError = true;
					$scope.$apply();
				}
			} else if (imgName == 'CorrespondenceAddress2' || imgName == 'ReCorrespondenceAddress2') {
				if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
					var aadhaarcountModal = new bootstrap.Modal(document.getElementById('aadhaarcount'), {
						backdrop: 'static',
						keyboard: false
					});
					aadhaarcountModal.show();
					aadhaarcountvalidationModal.hide();
					return false;
				}

				imgName = 'CorrespondenceAddress2';
				imageName = 'CorrespondenceAddress2';
				$scope.cSizeError = false;
				$scope.cAddressQImgError = false;
				$scope.cAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.cSizeError = true;
					$('#CorrespondenceAddress2').val('');
					$scope.$apply();

				} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
					$scope.docUpldMsg = 'Address proof upload in progress';
					$scope.aadhaarvalidation = false;

					// if ($rootScope.formData.fields.DocsaddressProof != 111) {
					// 	$scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.DocsaddressProof);
					// } else {
					$scope.readfiles(filesSelected, imageName);
					// }

					if ($rootScope.formData.RemainingDocumentvalidation == 0) {
						aadhaarcountvalidationModal.show();
					}

				} else {
					$('#CorrespondenceAddress2').val('');
					$("#cAddressImage2 .file-input").empty();
					$scope.ctypeError = true;
					$scope.$apply();
				}
			} else if (imgName == 'PermenantAddress' || imgName == 'RePermenantAddress') {
				if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
					var aadhaarcount1Modal = new bootstrap.Modal(document.getElementById('aadhaarcount1'), {
						backdrop: 'static',
						keyboard: false
					});
					aadhaarcount1Modal.show();
					aadhaarcount1validationModal.hide();
					return false;
				}

				if ($rootScope.formData.RemainingDocumentvalidation == 0) {
					aadhaarcount1validationModal.show();
					return false;
				}

				imgName = 'PermenantAddress';
				imageName = 'PermenantAddress';
				$scope.pSizeError = false;
				$scope.pAddressQImgError = false;
				$scope.pAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.pSizeError = true;
					$('#PermenantAddress').val('');
					$scope.$apply();
				} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
					$scope.docUpldMsg = 'Address proof upload in progress';
					$scope.aadhaarvalidation = false;

					// if ($rootScope.formData.fields.DocsaddressProof != 111) {
					// $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.pDocsaddressProof);
					// } else {
					$scope.readfiles(filesSelected, imageName);
					// }

					if ($rootScope.formData.RemainingDocumentvalidation == 0) {
						aadhaarcount1validationModal.show();
					}

				} else {
					$('#PermenantAddress').val('');
					$("#pAddressImage .file-input").empty();
					$scope.ptypeError = true;
					$scope.$apply();
				}

			} else if (imgName == 'PermenantAddress2' || imgName == 'RePermenantAddress2') {
				if ($rootScope.formData.aadhaarsuccess >= 1 && !$scope.aadhaarvalidation && $rootScope.formData.RemainingDocumentvalidation != 0) {
					var aadhaarcount1Modal = new bootstrap.Modal(document.getElementById('aadhaarcount1'), {
						backdrop: 'static',
						keyboard: false
					});
					aadhaarcount1Modal.show();
					aadhaarcount1validationModal.hide();
					return false;
				}

				if ($rootScope.formData.RemainingDocumentvalidation == 0) {
					aadhaarcount1validationModal.show();
					return false;
				}

				imgName = 'PermenantAddress2';
				imageName = 'PermenantAddress2';
				$scope.pSizeError = false;
				$scope.pAddressQImgError = false;
				$scope.pAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.pSizeError = true;
					$('#PermenantAddress2').val('');
					$scope.$apply();
				} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
					$scope.docUpldMsg = 'Address proof upload in progress';
					$scope.aadhaarvalidation = false;

					// if ($rootScope.formData.fields.DocsaddressProof != 111) {
					// 	$scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.pDocsaddressProof);
					// } else {
					$scope.readfiles(filesSelected, imageName);
					// }

					if ($rootScope.formData.RemainingDocumentvalidation == 0) {
						aadhaarcount1validationModal.show();
					}

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
					$('#Income').val('');
					$scope.$apply();
				} else if ($rootScope.formData.fields.foDocumentProof != '0' && $rootScope.formData.fields.foDocumentProof) {
					$scope.docUpldMsg = 'Income proof upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, $rootScope.formData.fields.foDocumentProof);
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
					$scope.docUpldMsg = 'Signature upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "ADDITIONALDOC1") {
				$scope.adocSizeError = false;
				if (fileSize > 4194304) {
					$scope.adocSizeError = true;
					$('#ADDITIONALDOC1').val('');
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "ADDITIONALDOC2") {
				$scope.adocSizeError = false;
				if (fileSize > 4194304) {
					$scope.adocSizeError = true;
					$('#ADDITIONALDOC2').val('');
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "ADDITIONALDOC3") {
				$scope.adocSizeError = false;
				if (fileSize > 4194304) {
					$scope.adocSizeError = true;
					$('#ADDITIONALDOC3').val('');
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "CMLDOCUMENT") {
				$scope.cmlSizeError = false;
				if (fileSize > 4194304) {
					$('#CMLDOCUMENT').val('');
					$scope.cmlSizeError = true;
				} else {
					$scope.docUpldMsg = 'CML upload in progress';
					$scope.readfiles(filesSelected, imageName);

					// $scope.imgFormData(imgName, filesSelected, '');
				}
				$scope.$apply();
			} else if (imgName == "NOMINEE1") {
				$scope.nominee1SizeError = false;
				if (fileSize > 4194304) {
					$('#NOMINEE1').val('');
					$scope.nominee1SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "NOMINEE2") {
				$scope.nominee2SizeError = false;
				if (fileSize > 4194304) {
					$('#NOMINEE2').val('');
					$scope.nominee2SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "NOMINEE3") {
				$scope.nominee3SizeError = false;
				if (fileSize > 4194304) {
					$('#NOMINEE3').val('');
					$scope.nominee3SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "GUARDIAN1") {
				$scope.guardian1SizeError = false;
				if (fileSize > 4194304) {
					$('#GUARDIAN1').val('');
					$scope.guardian1SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "GUARDIAN2") {
				$scope.guardian2SizeError = false;
				if (fileSize > 4194304) {
					$('#GUARDIAN2').val('');
					$scope.guardian2SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "GUARDIAN3") {
				$scope.guardian3SizeError = false;
				if (fileSize > 4194304) {
					$('#GUARDIAN3').val('');
					$scope.guardian3SizeError = true;
				} else {
					$scope.docUpldMsg = 'Document upload in progress';
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
							$scope.docUpldMsg = 'Income proof upload in progress';
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
						$scope.docUpldMsg = 'Document upload in progress';
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
			ReferenceNumber: $rootScope.formData.eRefNumber,
			data: {
				doc_type: doc_type,
				document1: imgValue
			}
		}
		$scope.docUpldAPI = true;
		serverService.apiCall(url, data).then(function (a) {
			var response = a.data;
			$scope.cAddressCNImgError1 = response.ErrorMessage
			$scope.pAddressCNImgError1 = response.ErrorMessage
			if (response.IsSuccess) {
				var s_url = "DIYImageUpload";
				//var s_url = "DIYImageUploadS3";
				if ($scope.optimize) {
					s_url = "DIYImageUploadOptimize";
					//s_url = "DIYImageUploadS3";
				}
				var sendData = {
					ImageName: imgName,
					Image: imgValue,
					DocumentType: docId,
					ReferenceNumber: $rootScope.formData.eRefNumber,
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
					$scope.cAddressCNImgError1 = response.ErrorMessage
					$scope.docUpldAPI = false;
					if (response.IsSuccess) {
						if (imgName == "PANNumber") {
							$scope.panImageUpdt = true;
							$scope.panLoad = false;
							$scope.panImgError = false;
							$scope.pantypeError = false;
							$scope.panImageValidation = true;
							$scope.panView = true;
						}

						if (imgName == "BankCheque") {
							$scope.bankUpdt = true;
							$scope.bankLoad = false;
							$scope.bankImgError = false;
							$scope.banktypeError = false;
							$scope.chequeImageValidation = true;
							$scope.bankView = true;
						}

						if (imgName == "CorrespondenceAddress") {
							$scope.cAddressUpdt = true;
							$scope.cAdrLoad = false;
							$scope.cAddressImgError = false;
							$scope.caddrtypeError = false;
							$scope.caddressProofImageValidation = true;
							$scope.cAddressView = true;
						}
						if (imgName == "CorrespondenceAddress2") {
							$scope.cAdrLoad2 = false;
							$scope.cAddressImgError = false;
							$scope.caddrtypeError2 = false;
							$scope.cAddress2View = true;
							$scope.cAddressUpdt2 = true;
						}
						if (imgName == "PermenantAddress") {
							$scope.pAddressUpdt = true;
							$scope.pAdrLoad = false;
							$scope.pAddressImgError = false;
							$scope.paddrtypeError = false;
							$scope.paddressProofImageValidation = true;
							$scope.pAddressView = true;
						}
						if (imgName == "PermenantAddress2") {
							$scope.pAdrLoad2 = false;
							$scope.pAddressImgError = false;
							$scope.paddrtypeError2 = false;
							$scope.pAddress2View = true;
							$scope.pAddressUpdt2 = true;
						}
						if (imgName == "ClientPhoto" || imgName == "CorrespondenceAddress" || imgName == "PermenantAddress" || imgName == "PermenantAddress2") {
							$scope.idfyUsage();
						}
					} else {
						if (imgName == 'CorrespondenceAddress') {
							$('#CorrespondenceAddress').val('');
							$("#cAddressImage .file-input").empty();
							if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
								$scope.cAddressCNImgError = false;
							} else {
								$scope.cAddressCNImgError = true;
							}
							$(".c-adr .file-preview").empty();
							$rootScope.formData.caImage = '';
						}

						if (imgName == 'CorrespondenceAddress2') {
							$('#CorrespondenceAddress2').val('');
							$("#cAddressImage2 .file-input").empty();
							if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
								$scope.cAddressCNImgError = false;
							} else {
								$scope.cAddressCNImgError = true;
							}
							$(".c-adr2 .file-preview").empty();
							$rootScope.formData.caImage2 = '';
						}

						if (imgName == 'PermenantAddress') {
							$('#PermenantAddress').val('');
							$("#pAddressImage .file-input").empty();
							$(".p-adr .file-preview").empty();
							if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
								$scope.pAddressCNImgError = false;
							} else {
								$scope.pAddressCNImgError = true;
							}
							$rootScope.formData.paImage = '';
						}

						if (imgName == 'PermenantAddress2') {
							$('#PermenantAddress2').val('');
							$("#pAddressImage2 .file-input").empty();
							$(".p-adr2 .file-preview").empty();
							if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
								$scope.pAddressCNImgError = false;
							} else {
								$scope.pAddressCNImgError = true;
							}
							$rootScope.formData.paImage = '';
							$rootScope.formData.paImage2 = '';
						}
					}
					//  $scope.getImages();
				});
			} else if (!response.IsSuccess && response.ErrorCode == '-1') {
				$scope.docUpldAPI = false;
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			} else {
				$scope.docUpldAPI = false;
				if (imgName == 'CorrespondenceAddress') {
					$('#CorrespondenceAddress').val('');
					$("#cAddressImage .file-input").empty();
					if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
						$scope.cAddressCNImgError = false;
					} else {
						$scope.cAddressCNImgError = true;
					}
					$(".c-adr .file-preview").empty();
					$rootScope.formData.caImage = '';
				}

				if (imgName == 'CorrespondenceAddress2') {
					$('#CorrespondenceAddress2').val('');
					$("#cAddressImage2 .file-input").empty();
					if ($scope.cAddressCNImgError1 == null || $scope.cAddressCNImgError1 == "") {
						$scope.cAddressCNImgError = false;
					} else {
						$scope.cAddressCNImgError = true;
					}
					$(".c-adr2 .file-preview").empty();
					$rootScope.formData.caImage2 = '';
				}

				if (imgName == 'PermenantAddress') {
					$('#PermenantAddress').val('');
					$("#pAddressImage .file-input").empty();
					$(".p-adr .file-preview").empty();
					if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
						$scope.pAddressCNImgError = false;
					} else {
						$scope.pAddressCNImgError = true;
					}
					$rootScope.formData.paImage = '';
					$rootScope.formData.paImage = '';
				}

				if (imgName == 'PermenantAddress2') {
					$('#PermenantAddress2').val('');
					$("#pAddressImage2 .file-input").empty();
					$(".p-adr2 .file-preview").empty();
					if ($scope.pAddressCNImgError1 == null || $scope.pAddressCNImgError1 == "") {
						$scope.pAddressCNImgError = false;
					} else {
						$scope.pAddressCNImgError = true;
					}
					$rootScope.formData.paImage = '';
					$rootScope.formData.paImage2 = '';
				}
				// $scope.getImages();
			}
		})
	}

	// $scope.updateImage = function (imgName, imgValue, fileType, docId) {

	// 	if (docId == 111) {
	// 		$scope.upldImageValidate(imgName, imgValue, fileType, docId);
	// 	} else {

	// 		if ($scope.ipvStage) {
	// 			$scope.ipvStage = false;
	// 		}
	// 		if(imgName == 'ClientPhoto'){
	// 			if ($scope.selfTrue) {
	// 				$scope.IsSelfi = 'Y';
	// 			} else {
	// 				$scope.IsSelfi = 'N';
	// 			}
	// 			var s_url = "Validategeolocation";
	// 			//var s_url = "DIYImageUploadS3";
	// 			var sendData = {
	// 				ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 				latitude:$rootScope.formData.latitude,
	// 				longitude:$rootScope.formData.longitude

	// 			};
	// 			serverService.apiCall(s_url, sendData).then(function (a) {
	// 				// $scope.docUpldAPI = false;
	// 				var response = a.data;
	// 				$scope.geolocationErrorMsg=response.ErrorMessage;
	// 				$scope.VaildCountry=response.Isvalidcountry
	// 				if($scope.VaildCountry){
	// 						var s_url = "DIYImageUpload";
	// 						//var s_url = "DIYImageUploadS3";
	// 						if ($scope.optimize) {
	// 							if (imgName != 'ClientPhoto') {
	// 								s_url = "DIYImageUploadOptimize";
	// 								//s_url = "DIYImageUploadS3";
	// 							}
	// 						}
	// 						var refNo = $rootScope.formData.ReferenceNumber;
	// 						if ($rootScope.vcip) {
	// 							refNo = $rootScope.formData.ReferenceNumber;
	// 						}
	// 						$scope.docUpldAPI = true;
	// 						if ($rootScope.vcip) {
	// 							refNo = $rootScope.formData.ReferenceNumber;
	// 						}

	// 						if (imgName == "BankCheque") {
	// 							var sendData = {
	// 								ImageName: imgName,
	// 								Image: imgValue,
	// 								DocumentType: docId,
	// 								ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 								Extention: fileType,
	// 								ChequeType: 1,
	// 								IsDiy: true,
	// 								IsIPV: "0",
	// 								EncryptToken: $rootScope.EncryptToken,
	// 								IsSelfi: 'N'
	// 							}
	// 						} else {
	// 							var sendData = {
	// 								ImageName: imgName,
	// 								Image: imgValue,
	// 								DocumentType: docId,
	// 								ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 								Extention: fileType,
	// 								IsDiy: true,
	// 								IsIPV: "0",
	// 								EncryptToken: $rootScope.EncryptToken,
	// 								IsSelfi: $scope.IsSelfi,
	// 								Latitude: $rootScope.formData.latitude,
	// 								Longitude: $rootScope.formData.longitude,
	// 							};
	// 						}

	// 						serverService.apiCall(s_url, sendData).then(function (a) {
	// 							var response = a.data;
	// 							$scope.docUpldAPI = false;
	// 							if (response.IsSuccess) {
	// 								//$scope.showView = true;
	// 								if (imgName == "PANNumber") {
	// 									$scope.panImageUpdt = true;
	// 									$scope.panLoad = false;
	// 									$scope.panImgError = false;
	// 									$scope.pantypeError = false;
	// 									$scope.panImageValidation = true;
	// 								}
	// 								if (imgName == "ClientPhoto") {
	// 									$scope.photoImageUpdt = true;
	// 									$scope.cltLoad = false;
	// 									$scope.photoImgError = false;
	// 									$scope.clientPhoqqualityError = false;
	// 									$scope.phototypeError = false;
	// 									$scope.photoProofImageValidation = true;
	// 								}

	// 								if (imgName == "Aadhar") {
	// 									$scope.aadharImageUpdt = true;
	// 									$scope.aadharLoad = false;
	// 									$scope.aadharImgError = false;
	// 									$scope.aadhartypeError = false;
	// 								}

	// 								if (imgName == "CorrespondenceAddress") {
	// 									$scope.cAddressUpdt = true;
	// 									$scope.cAdrLoad = false;
	// 									$scope.cAddressImgError = false;
	// 									$scope.caddrtypeError = false;
	// 									$scope.caddressProofImageValidation = true;
	// 								}
	// 								if (imgName == "CorrespondenceAddress2") {
	// 									$scope.cAdrLoad2 = false;
	// 									$scope.cAddressImgError = false;
	// 									$scope.caddrtypeError2 = false;
	// 								}
	// 								if (imgName == "PermenantAddress") {
	// 									$scope.pAddressUpdt = true;
	// 									$scope.pAdrLoad = false;
	// 									$scope.pAddressImgError = false;
	// 									$scope.paddrtypeError = false;
	// 									$scope.paddressProofImageValidation = true;
	// 								}
	// 								if (imgName == "PermenantAddress2") {
	// 									$scope.pAdrLoad2 = false;
	// 									$scope.pAddressImgError = false;
	// 									$scope.paddrtypeError2 = false;
	// 								}
	// 								if (imgName == "BankCheque") {
	// 									$scope.bankUpdt = true;
	// 									$scope.bankLoad = false;
	// 									$scope.bankImgError = false;
	// 									$scope.banktypeError = false;
	// 									$scope.chequeImageValidation = true;
	// 								}
	// 								if (imgName == "SPECIMENPROOF") {
	// 									$scope.signatureUpdt = true;
	// 									$scope.signatureLoad = false;
	// 									$scope.signatureImgError = false;
	// 									$scope.signaturetypeError = false;
	// 									$scope.sigImageValidation = true;
	// 								}
	// 								if (imgName == "Income") {
	// 									$scope.foUpdt = true;
	// 									$scope.incomeLoad = false;
	// 									$scope.foImgError = false;
	// 									$scope.banktypeError = false;
	// 									$scope.incomeProofImageValidation = true;
	// 								}
	// 								if (imgName == "RMSIGNATURE") {
	// 									$scope.tcUpdt = true;
	// 									$scope.tcLoad = false;
	// 									$scope.tcImgError = false;
	// 									$scope.tctypeError = false;
	// 									$scope.tcImageValidation = true;
	// 								}
	// 								if (imgName == "CMLDOCUMENT") {
	// 									$scope.cmlLoad = true;
	// 									$scope.cmlUpdt = true;
	// 									$scope.cmlImgError = false;
	// 									$scope.cmltypeError = false;
	// 									$scope.cmlImageValidation = false;
	// 								}
	// 								if (imgName == "ADDITIONALDOC1") {
	// 									$scope.adocLoad = false;
	// 									$scope.adocImgError = false;
	// 									$scope.adoctypeError = false;
	// 								}
	// 								if (imgName == "ADDITIONALDOC2") {
	// 									$scope.adocLoad = false;
	// 									$scope.adocImgError = false;
	// 									$scope.adoc2typeError = false;
	// 								}
	// 								if (imgName == "ADDITIONALDOC3") {
	// 									$scope.adocLoad = false;
	// 									$scope.adocImgError = false;
	// 									$scope.adoc3typeError = false;
	// 								}
	// 								if (imgName == "FIRSTPOA") {
	// 									$scope.poaUpdt = true;
	// 									$scope.poaLoad = false;
	// 									$scope.poaImgError = false;
	// 									$scope.poatypeError = false;
	// 									$scope.poaImageValidation = true;
	// 								}
	// 								if (imgName == "SECONDPOA") {
	// 									$scope.poaLoad = false;
	// 									$scope.poaImgError = false;
	// 									$scope.poa2typeError = false;
	// 								}
	// 								if (imgName == "NOMINEE1") {
	// 									$scope.nominee1Updt = true;
	// 									$scope.nominee1Load = false;
	// 									$scope.nominee1ImgError = false;
	// 									$scope.nominee1typeError = false;
	// 								}
	// 								if (imgName == "NOMINEE2") {
	// 									$scope.nominee2Updt = true;
	// 									$scope.nominee2Load = false;
	// 									$scope.nominee2ImgError = false;
	// 									$scope.nominee2typeError = false;
	// 								}
	// 								if (imgName == "NOMINEE3") {
	// 									$scope.nominee3Updt = true;
	// 									$scope.nominee3Load = false;
	// 									$scope.nominee3ImgError = false;
	// 									$scope.nominee3typeError = false;
	// 								}
	// 								if (imgName == "GUARDIAN1") {
	// 									$scope.guardian1Updt = true;
	// 									$scope.guardian1Load = false;
	// 									$scope.guardian1ImgError = false;
	// 									$scope.guardian1typeError = false;
	// 								}
	// 								if (imgName == "GUARDIAN2") {
	// 									$scope.guardian2Updt = true;
	// 									$scope.guardian2Load = false;
	// 									$scope.guardian2ImgError = false;
	// 									$scope.guardian2typeError = false;
	// 								}
	// 								if (imgName == "GUARDIAN3") {
	// 									$scope.guardian3Updt = true;
	// 									$scope.guardian3Load = false;
	// 									$scope.guardian3ImgError = false;
	// 									$scope.guardian3typeError = false;
	// 								}
	// 								if (imgName == "ADDRESSMODIFICATION") {
	// 									$scope.amLoad = false;
	// 									$scope.amImgError = false;
	// 									$scope.amtypeError = false;
	// 									$scope.amImageValidation = true;
	// 								}

	// 								$scope.getImages();
	// 							} else {
	// 								$rootScope.formData.apiLoading = false;
	// 								if (imgName == "ClientPhoto") {
	// 									if ($scope.IsSelfi == "Y") {
	// 										$scope.photoImgError = false;
	// 										$scope.photoImageUpdt = false;
	// 										// $scope.clientPhoqqualityError = true;
	// 										$scope.ClienterrorMsg = response.ErrorMessage
	// 											if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
	// 												$scope.clientPhoqqualityError = false;
	// 											} else {
	// 												$scope.clientPhoqqualityError = true;
	// 											}
	// 									}
	// 								}

	// 								if (imgName == "PANNumber") {
	// 									$('#PANNumber').val('');
	// 									$('#panPhoto .file-input').empty();
	// 									$scope.panCNImgError = true;
	// 								}
	// 								if (imgName == "BankCheque") {
	// 									$('#BankCheque').val('');
	// 									$('#bankImage .file-input').empty();
	// 									$scope.bankCNImgError = true;
	// 								}
	// 								if (imgName == 'CorrespondenceAddress') {
	// 									$('#CorrespondenceAddress').val('');
	// 									$("#cAddressImage .file-input").empty();
	// 									$scope.cAddressQImgError = true;
	// 									$(".c-adr .file-preview").empty();
	// 									$rootScope.formData.caImage = '';
	// 								}

	// 								if (imgName == 'CorrespondenceAddress2') {
	// 									$('#CorrespondenceAddress2').val('');
	// 									$("#cAddressImage2 .file-input").empty();
	// 									$scope.cAddressQImgError = true;
	// 									$(".c-adr2 .file-preview").empty();
	// 									$rootScope.formData.caImage2 = '';
	// 								}

	// 								if (imgName == 'PermenantAddress') {
	// 									$('#PermenantAddress').val('');
	// 									$("#pAddressImage .file-input").empty();
	// 									$(".p-adr .file-preview").empty();
	// 									$rootScope.formData.paImage = '';
	// 									$scope.pAddressQImgError = true;
	// 								}

	// 								if (imgName == 'PermenantAddress2') {
	// 									$('#PermenantAddress2').val('');
	// 									$("#pAddressImage2 .file-input").empty();
	// 									$(".p-adr2 .file-preview").empty();
	// 									$rootScope.formData.paImage2 = '';
	// 									$scope.pAddressQImgError = true;
	// 								}
	// 								$scope.getImages();
	// 							}

	// 						});

	// 				}else{
	// 					var error = 0;
	// 					$scope.geoLocationError = true;
	// 					error++;

	// 				}
	// 			})
	// 		}else{
	// 		var s_url = "DIYImageUpload";
	// 		//var s_url = "DIYImageUploadS3";
	// 		if ($scope.optimize) {
	// 			if (imgName != 'ClientPhoto') {
	// 				s_url = "DIYImageUploadOptimize";
	// 				//s_url = "DIYImageUploadS3";
	// 			}
	// 		}
	// 		var refNo = $rootScope.formData.ReferenceNumber;
	// 		if ($rootScope.vcip) {
	// 			refNo = $rootScope.formData.ReferenceNumber;
	// 		}
	// 		$scope.docUpldAPI = true;
	// 		if ($rootScope.vcip) {
	// 			refNo = $rootScope.formData.ReferenceNumber;
	// 		}
	// 		if ($scope.selfTrue) {
	// 			$scope.IsSelfi = 'Y';
	// 		} else {
	// 			$scope.IsSelfi = 'N';
	// 		}
	// 		if (imgName == "BankCheque") {
	// 			var sendData = {
	// 				ImageName: imgName,
	// 				Image: imgValue,
	// 				DocumentType: docId,
	// 				ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 				Extention: fileType,
	// 				ChequeType: 1,
	// 				IsDiy: true,
	// 				IsIPV: "0",
	// 				EncryptToken: $rootScope.EncryptToken,
	// 				IsSelfi: 'N'
	// 			}
	// 		} else {
	// 			var sendData = {
	// 				ImageName: imgName,
	// 				Image: imgValue,
	// 				DocumentType: docId,
	// 				ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 				Extention: fileType,
	// 				IsDiy: true,
	// 				IsIPV: "0",
	// 				EncryptToken: $rootScope.EncryptToken,
	// 				IsSelfi: $scope.IsSelfi,
	// 				Latitude: $rootScope.formData.latitude,
	// 				Longitude: $rootScope.formData.longitude,
	// 			};
	// 		}

	// 		serverService.apiCall(s_url, sendData).then(function (a) {
	// 			var response = a.data;
	// 			$scope.docUpldAPI = false;
	// 			if (response.IsSuccess) {
	// 				//$scope.showView = true;
	// 				if (imgName == "PANNumber") {
	// 					$scope.panImageUpdt = true;
	// 					$scope.panLoad = false;
	// 					$scope.panImgError = false;
	// 					$scope.pantypeError = false;
	// 					$scope.panImageValidation = true;
	// 				}
	// 				if (imgName == "ClientPhoto") {
	// 					$scope.photoImageUpdt = true;
	// 					$scope.cltLoad = false;
	// 					$scope.photoImgError = false;
	// 					$scope.clientPhoqqualityError = false;
	// 					$scope.phototypeError = false;
	// 					$scope.photoProofImageValidation = true;
	// 				}

	// 				if (imgName == "Aadhar") {
	// 					$scope.aadharImageUpdt = true;
	// 					$scope.aadharLoad = false;
	// 					$scope.aadharImgError = false;
	// 					$scope.aadhartypeError = false;
	// 				}

	// 				if (imgName == "CorrespondenceAddress") {
	// 					$scope.cAddressUpdt = true;
	// 					$scope.cAdrLoad = false;
	// 					$scope.cAddressImgError = false;
	// 					$scope.caddrtypeError = false;
	// 					$scope.caddressProofImageValidation = true;
	// 				}
	// 				if (imgName == "CorrespondenceAddress2") {
	// 					$scope.cAdrLoad2 = false;
	// 					$scope.cAddressImgError = false;
	// 					$scope.caddrtypeError2 = false;
	// 				}
	// 				if (imgName == "PermenantAddress") {
	// 					$scope.pAddressUpdt = true;
	// 					$scope.pAdrLoad = false;
	// 					$scope.pAddressImgError = false;
	// 					$scope.paddrtypeError = false;
	// 					$scope.paddressProofImageValidation = true;
	// 				}
	// 				if (imgName == "PermenantAddress2") {
	// 					$scope.pAdrLoad2 = false;
	// 					$scope.pAddressImgError = false;
	// 					$scope.paddrtypeError2 = false;
	// 				}
	// 				if (imgName == "BankCheque") {
	// 					$scope.bankUpdt = true;
	// 					$scope.bankLoad = false;
	// 					$scope.bankImgError = false;
	// 					$scope.banktypeError = false;
	// 					$scope.chequeImageValidation = true;
	// 				}
	// 				if (imgName == "SPECIMENPROOF") {
	// 					$scope.signatureUpdt = true;
	// 					$scope.signatureLoad = false;
	// 					$scope.signatureImgError = false;
	// 					$scope.signaturetypeError = false;
	// 					$scope.sigImageValidation = true;
	// 				}
	// 				if (imgName == "Income") {
	// 					$scope.foUpdt = true;
	// 					$scope.incomeLoad = false;
	// 					$scope.foImgError = false;
	// 					$scope.banktypeError = false;
	// 					$scope.incomeProofImageValidation = true;
	// 				}
	// 				if (imgName == "RMSIGNATURE") {
	// 					$scope.tcUpdt = true;
	// 					$scope.tcLoad = false;
	// 					$scope.tcImgError = false;
	// 					$scope.tctypeError = false;
	// 					$scope.tcImageValidation = true;
	// 				}
	// 				if (imgName == "CMLDOCUMENT") {
	// 					$scope.cmlLoad = true;
	// 					$scope.cmlUpdt = true;
	// 					$scope.cmlImgError = false;
	// 					$scope.cmltypeError = false;
	// 					$scope.cmlImageValidation = false;
	// 				}
	// 				if (imgName == "ADDITIONALDOC1") {
	// 					$scope.adocLoad = false;
	// 					$scope.adocImgError = false;
	// 					$scope.adoctypeError = false;
	// 				}
	// 				if (imgName == "ADDITIONALDOC2") {
	// 					$scope.adocLoad = false;
	// 					$scope.adocImgError = false;
	// 					$scope.adoc2typeError = false;
	// 				}
	// 				if (imgName == "ADDITIONALDOC3") {
	// 					$scope.adocLoad = false;
	// 					$scope.adocImgError = false;
	// 					$scope.adoc3typeError = false;
	// 				}
	// 				if (imgName == "FIRSTPOA") {
	// 					$scope.poaUpdt = true;
	// 					$scope.poaLoad = false;
	// 					$scope.poaImgError = false;
	// 					$scope.poatypeError = false;
	// 					$scope.poaImageValidation = true;
	// 				}
	// 				if (imgName == "SECONDPOA") {
	// 					$scope.poaLoad = false;
	// 					$scope.poaImgError = false;
	// 					$scope.poa2typeError = false;
	// 				}
	// 				if (imgName == "NOMINEE1") {
	// 					$scope.nominee1Updt = true;
	// 					$scope.nominee1Load = false;
	// 					$scope.nominee1ImgError = false;
	// 					$scope.nominee1typeError = false;
	// 				}
	// 				if (imgName == "NOMINEE2") {
	// 					$scope.nominee2Updt = true;
	// 					$scope.nominee2Load = false;
	// 					$scope.nominee2ImgError = false;
	// 					$scope.nominee2typeError = false;
	// 				}
	// 				if (imgName == "NOMINEE3") {
	// 					$scope.nominee3Updt = true;
	// 					$scope.nominee3Load = false;
	// 					$scope.nominee3ImgError = false;
	// 					$scope.nominee3typeError = false;
	// 				}
	// 				if (imgName == "GUARDIAN1") {
	// 					$scope.guardian1Updt = true;
	// 					$scope.guardian1Load = false;
	// 					$scope.guardian1ImgError = false;
	// 					$scope.guardian1typeError = false;
	// 				}
	// 				if (imgName == "GUARDIAN2") {
	// 					$scope.guardian2Updt = true;
	// 					$scope.guardian2Load = false;
	// 					$scope.guardian2ImgError = false;
	// 					$scope.guardian2typeError = false;
	// 				}
	// 				if (imgName == "GUARDIAN3") {
	// 					$scope.guardian3Updt = true;
	// 					$scope.guardian3Load = false;
	// 					$scope.guardian3ImgError = false;
	// 					$scope.guardian3typeError = false;
	// 				}
	// 				if (imgName == "ADDRESSMODIFICATION") {
	// 					$scope.amLoad = false;
	// 					$scope.amImgError = false;
	// 					$scope.amtypeError = false;
	// 					$scope.amImageValidation = true;
	// 				}

	// 				$scope.getImages();
	// 			} else {
	// 				$rootScope.formData.apiLoading = false;
	// 				if (imgName == "ClientPhoto") {
	// 					if ($scope.IsSelfi == "Y") {
	// 						$scope.photoImgError = false;
	// 						$scope.photoImageUpdt = false;
	// 						// $scope.clientPhoqqualityError = true;
	// 						$scope.ClienterrorMsg = response.ErrorMessage
	// 							if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
	// 								$scope.clientPhoqqualityError = false;
	// 							} else {
	// 								$scope.clientPhoqqualityError = true;
	// 							}
	// 					}
	// 				}

	// 				if (imgName == "PANNumber") {
	// 					$('#PANNumber').val('');
	// 					$('#panPhoto .file-input').empty();
	// 					$scope.panCNImgError = true;
	// 				}
	// 				if (imgName == "BankCheque") {
	// 					$('#BankCheque').val('');
	// 					$('#bankImage .file-input').empty();
	// 					$scope.bankCNImgError = true;
	// 				}
	// 				if (imgName == 'CorrespondenceAddress') {
	// 					$('#CorrespondenceAddress').val('');
	// 					$("#cAddressImage .file-input").empty();
	// 					$scope.cAddressQImgError = true;
	// 					$(".c-adr .file-preview").empty();
	// 					$rootScope.formData.caImage = '';
	// 				}

	// 				if (imgName == 'CorrespondenceAddress2') {
	// 					$('#CorrespondenceAddress2').val('');
	// 					$("#cAddressImage2 .file-input").empty();
	// 					$scope.cAddressQImgError = true;
	// 					$(".c-adr2 .file-preview").empty();
	// 					$rootScope.formData.caImage2 = '';
	// 				}

	// 				if (imgName == 'PermenantAddress') {
	// 					$('#PermenantAddress').val('');
	// 					$("#pAddressImage .file-input").empty();
	// 					$(".p-adr .file-preview").empty();
	// 					$rootScope.formData.paImage = '';
	// 					$scope.pAddressQImgError = true;
	// 				}

	// 				if (imgName == 'PermenantAddress2') {
	// 					$('#PermenantAddress2').val('');
	// 					$("#pAddressImage2 .file-input").empty();
	// 					$(".p-adr2 .file-preview").empty();
	// 					$rootScope.formData.paImage2 = '';
	// 					$scope.pAddressQImgError = true;
	// 				}
	// 				$scope.getImages();
	// 			}

	// 		});
	// 	}
	// 	}
	// }
	$scope.updateImage = function (imgName, imgValue, fileType, docId) {
		if (imgName == "PANNumber") {
			$scope.imgPanName = imgName;
			$scope.PanimgValue = imgValue;
			$scope.PanFileType = fileType;
			$scope.PandocId = docId;
			var s_geturl = "ImageValidation";
			$rootScope.formData.apiLoading = true;
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber,
				image: imgValue,
				doc_type: "ind_pan"
			};
			serverService.apiCall(s_geturl, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				$scope.imageErrorMsg = response.ErrorMessage;
				if (response.IsSuccess == true) {
					$scope.panImgErr = false;
					if ($scope.ipvStage) {
						$scope.ipvStage = false;
					}
					var s_url = "DIYImageUpload";
					//var s_url = "DIYImageUploadS3";
					if ($scope.optimize) {
						if (imgName != 'ClientPhoto') {
							s_url = "DIYImageUploadOptimize";
							//s_url = "DIYImageUploadS3";
						}
					}
					var refNo = $rootScope.formData.ReferenceNumber;
					if ($rootScope.vcip) {
						refNo = $rootScope.formData.ReferenceNumber;
					}
					$scope.docUpldAPI = true;
					if ($rootScope.vcip) {
						refNo = $rootScope.formData.ReferenceNumber;
					}
					if ($scope.selfTrue) {
						$scope.IsSelfi = 'Y';
					} else {
						$scope.IsSelfi = 'N';
					}
					var sendData = {
						ImageName: imgName,
						Image: imgValue,
						DocumentType: docId,
						ReferenceNumber: $rootScope.formData.eRefNumber,
						Extention: fileType,
						IsDiy: true,
						IsIPV: "0",
						EncryptToken: $rootScope.EncryptToken,
						IsSelfi: $scope.IsSelfi,
						Latitude: $rootScope.formData.latitude,
						Longitude: $rootScope.formData.longitude,
					};
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data;
						$rootScope.formData.apiLoading = false;
						$scope.docUpldAPI = false;
						if (response.IsSuccess) {

							//$scope.showView = true;
							if (imgName == "PANNumber") {
								$scope.panImageUpdt = true;
								$scope.panLoad = false;
								$scope.panImgError = false;
								$scope.pantypeError = false;
								$scope.panImageValidation = true;
								$scope.panView = true;
							}
							// $scope.getImages();
							$scope.idfyUsage();
							if (response.IsSuccess) {
								var url = "Documentextraction";
								var sendRequest = {
									"ReferenceNumber": $rootScope.formData.eRefNumber,
									"doctype": "Pan",
									"Image": imgValue,
								}
								$rootScope.formData.apiLoadings = true;
								serverService.apiCall(url, sendRequest).then(function (a) {

									var response = a.data
									$rootScope.formData.apiLoadings = false;
									$scope.Panfserror = response.ErrorMessage

									if (response.IsSuccess) {
										$rootScope.fsName = response.FatherName
										$rootScope.FatherNamefromIdfy = response.FatherNamefromIdfy
										// if (!response.IsFatherNameMatch) {
										// 	if ($rootScope.FatherNamefromIdfy != "") {
										// 		var previewPdf1PanModal = new bootstrap.Modal(document.getElementById('previewPdf1Pan'), {
										// 			backdrop: 'static',
										// 			keyboard: true
										// 		});
										// 		previewPdf1PanModal.show();
										// 	}
										// }
									} else {
									}

								})
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
						} else {
							if (imgName == "PANNumber") {
								$('#PANNumber').val('');
								$('#panPhoto .file-input').empty();
								$scope.panCNImgError = true;
							}
							// $scope.getImages();
						}
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
					$('#PANNumber').val('');
					$scope.idfyUsage();
					// $scope.getImages();
					$scope.panImgErr = true;
					// location.reload();
				}
			})
		} else {
			if (docId == 111) {
				$scope.upldImageValidate(imgName, imgValue, fileType, docId);
			}
			else {
				if (docId == 108) {
					$scope.getImages();
				}
				if ($scope.ipvStage) {
					$scope.ipvStage = false;
				}
				if (imgName == 'ClientPhoto') {
					if ($scope.selfTrue) {
						$scope.IsSelfi = 'Y';
					} else {
						$scope.IsSelfi = 'N';
					}
					var s_url = "Validategeolocation";
					//var s_url = "DIYImageUploadS3";
					var sendData = {
						ReferenceNumber: $rootScope.formData.eRefNumber,
						latitude: $rootScope.formData.latitude,
						longitude: $rootScope.formData.longitude

					};
					serverService.apiCall(s_url, sendData).then(function (a) {
						// $scope.docUpldAPI = false;
						var response = a.data;
						$scope.geolocationErrorMsg = response.ErrorMessage;
						$scope.VaildCountry = response.Isvalidcountry
						if ($scope.VaildCountry) {
							var s_url = "DIYImageUpload";
							//var s_url = "DIYImageUploadS3";
							if ($scope.optimize) {
								if (imgName != 'ClientPhoto') {
									s_url = "DIYImageUploadOptimize";
									//s_url = "DIYImageUploadS3";
								}
							}
							var refNo = $rootScope.formData.ReferenceNumber;
							if ($rootScope.vcip) {
								refNo = $rootScope.formData.ReferenceNumber;
							}
							$scope.docUpldAPI = true;
							if ($rootScope.vcip) {
								refNo = $rootScope.formData.ReferenceNumber;
							}

							if (imgName == "BankCheque") {
								var sendData = {
									ImageName: imgName,
									Image: imgValue,
									DocumentType: docId,
									ReferenceNumber: $rootScope.formData.eRefNumber,
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
									ReferenceNumber: $rootScope.formData.eRefNumber,
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
								$scope.docUpldAPI = false;
								if (response.IsSuccess) {
									//$scope.showView = true;
									if (imgName == "PANNumber") {
										$scope.panImageUpdt = true;
										$scope.panLoad = false;
										$scope.panImgError = false;
										$scope.pantypeError = false;
										$scope.panImageValidation = true;
										$scope.panView = true;
									}
									if (imgName == "ClientPhoto") {
										$scope.photoImageUpdt = true;
										$scope.cltLoad = false;
										$scope.photoImgError = false;
										$scope.clientPhoqqualityError = false;
										$scope.phototypeError = false;
										$scope.photoProofImageValidation = true;
										$scope.photoView = true;
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
										$scope.cAddressView = true;
									}
									if (imgName == "CorrespondenceAddress2") {
										$scope.cAdrLoad2 = false;
										$scope.cAddressImgError = false;
										$scope.caddrtypeError2 = false;
										$scope.cAddress2View = true;
										$scope.cAddressUpdt2 = true;
									}
									if (imgName == "PermenantAddress") {
										$scope.pAddressUpdt = true;
										$scope.pAdrLoad = false;
										$scope.pAddressImgError = false;
										$scope.paddrtypeError = false;
										$scope.paddressProofImageValidation = true;
										$scope.pAddressView = true;
									}
									if (imgName == "PermenantAddress2") {
										$scope.pAdrLoad2 = false;
										$scope.pAddressImgError = false;
										$scope.paddrtypeError2 = false;
										$scope.pAddress2View = true;
										$scope.pAddressUpdt2 = true;
									}
									if (imgName == "BankCheque") {
										$scope.bankUpdt = true;
										$scope.bankLoad = false;
										$scope.bankImgError = false;
										$scope.banktypeError = false;
										$scope.chequeImageValidation = true;
										$scope.bankView = true;
									}
									if (imgName == "SPECIMENPROOF") {
										$scope.signatureUpdt = true;
										$scope.signatureLoad = false;
										$scope.signatureImgError = false;
										$scope.signaturetypeError = false;
										$scope.sigImageValidation = true;
										$scope.signView = true;
									}
									if (imgName == "Income") {
										$scope.foUpdt = true;
										$scope.incomeLoad = false;
										$scope.foImgError = false;
										$scope.banktypeError = false;
										$scope.incomeProofImageValidation = true;
										$scope.foView = true;
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
										$scope.cmlImg_reShow = true;
										$scope.cmltypeError = false;
										$scope.cmlImageValidation = false;
										$scope.cmlView = true;
									}
									if (imgName == "ADDITIONALDOC1") {
										$scope.adocLoad = false;
										$scope.adocImgError = false;
										$scope.adoctypeError = false;
										$scope.adl1View = true;
										$scope.adocUpdt = true;
									}
									if (imgName == "ADDITIONALDOC2") {
										$scope.adocLoad = false;
										$scope.adocImgError = false;
										$scope.adoc2typeError = false;
										$scope.adl2View = true;
										$scope.adocUpdt = true;
									}
									if (imgName == "ADDITIONALDOC3") {
										$scope.adocLoad = false;
										$scope.adocImgError = false;
										$scope.adoc3typeError = false;
										$scope.adlView = true;
										$scope.adocUpdt = true;
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
										$scope.no1View = true;
									}
									if (imgName == "NOMINEE2") {
										$scope.nominee2Updt = true;
										$scope.nominee2Load = false;
										$scope.nominee2ImgError = false;
										$scope.nominee2typeError = false;
										$scope.no2View = true;
									}
									if (imgName == "NOMINEE3") {
										$scope.nominee3Updt = true;
										$scope.nominee3Load = false;
										$scope.nominee3ImgError = false;
										$scope.nominee3typeError = false;
										$scope.no3View = true;
									}
									if (imgName == "GUARDIAN1") {
										$scope.guardian1Updt = true;
										$scope.guardian1Load = false;
										$scope.guardian1ImgError = false;
										$scope.guardian1typeError = false;
										$scope.gu1View = true;
									}
									if (imgName == "GUARDIAN2") {
										$scope.guardian2Updt = true;
										$scope.guardian2Load = false;
										$scope.guardian2ImgError = false;
										$scope.guardian2typeError = false;
										$scope.gu2View = true;
									}
									if (imgName == "GUARDIAN3") {
										$scope.guardian3Updt = true;
										$scope.guardian3Load = false;
										$scope.guardian3ImgError = false;
										$scope.guardian3typeError = false;
										$scope.gu3View = true;
									}
									if (imgName == "ADDRESSMODIFICATION") {
										$scope.amLoad = false;
										$scope.amImgError = false;
										$scope.amtypeError = false;
										$scope.amImageValidation = true;
									}
									if (imgName == "ClientPhoto" || imgName == "CorrespondenceAddress" || imgName == "PermenantAddress" || imgName == "PermenantAddress2") {
										$scope.idfyUsage();
									}
									// $scope.getImages();
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
									if (imgName == "ClientPhoto") {
										if ($scope.IsSelfi == "Y") {
											$scope.photoImgError = false;
											$scope.photoImageUpdt = false;
											// $scope.clientPhoqqualityError = true;
											$scope.ClienterrorMsg = response.ErrorMessage
											if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
												$scope.clientPhoqqualityError = false;
											} else {
												$scope.clientPhoqqualityError = true;
											}
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
									// $scope.getImages();
								}

							});

						} else {
							var error = 0;
							$scope.geoLocationError = true;
							error++;

						}
					})
				} else {
					var s_url = "DIYImageUpload";
					//var s_url = "DIYImageUploadS3";
					if ($scope.optimize) {
						if (imgName != 'ClientPhoto') {
							s_url = "DIYImageUploadOptimize";
							//s_url = "DIYImageUploadS3";
						}
					}
					var refNo = $rootScope.formData.ReferenceNumber;
					if ($rootScope.vcip) {
						refNo = $rootScope.formData.ReferenceNumber;
					}
					$scope.docUpldAPI = true;
					if ($rootScope.vcip) {
						refNo = $rootScope.formData.ReferenceNumber;
					}
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
							ReferenceNumber: $rootScope.formData.eRefNumber,
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
							ReferenceNumber: $rootScope.formData.eRefNumber,
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
						$scope.docUpldAPI = false;
						if (response.IsSuccess) {
							//$scope.showView = true;
							if (imgName == "PANNumber") {
								$scope.panImageUpdt = true;
								$scope.panLoad = false;
								$scope.panImgError = false;
								$scope.pantypeError = false;
								$scope.panImageValidation = true;
								$scope.panView = true;
							}
							if (imgName == "ClientPhoto") {
								$scope.photoImageUpdt = true;
								$scope.cltLoad = false;
								$scope.photoImgError = false;
								$scope.clientPhoqqualityError = false;
								$scope.phototypeError = false;
								$scope.photoProofImageValidation = true;
								$scope.photoView = true;
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
								$scope.cAddressView = true;
							}
							if (imgName == "CorrespondenceAddress2") {
								$scope.cAdrLoad2 = false;
								$scope.cAddressImgError = false;
								$scope.caddrtypeError2 = false;
								$scope.cAddress2View = true;
								$scope.cAddressUpdt2 = true;
							}
							if (imgName == "PermenantAddress") {
								$scope.pAddressUpdt = true;
								$scope.pAdrLoad = false;
								$scope.pAddressImgError = false;
								$scope.paddrtypeError = false;
								$scope.paddressProofImageValidation = true;
								$scope.pAddressView = true;
							}
							if (imgName == "PermenantAddress2") {
								$scope.pAdrLoad2 = false;
								$scope.pAddressImgError = false;
								$scope.paddrtypeError2 = false;
								$scope.pAddress2View = true;
								$scope.pAddressUpdt2 = true;
							}
							if (imgName == "BankCheque") {
								$scope.bankUpdt = true;
								$scope.bankLoad = false;
								$scope.bankImgError = false;
								$scope.banktypeError = false;
								$scope.chequeImageValidation = true;
								$scope.bankView = true;
							}
							if (imgName == "SPECIMENPROOF") {
								$scope.signatureUpdt = true;
								$scope.signatureLoad = false;
								$scope.signatureImgError = false;
								$scope.signaturetypeError = false;
								$scope.sigImageValidation = true;
								$scope.signView = true;
							}
							if (imgName == "Income") {
								$scope.foUpdt = true;
								$scope.incomeLoad = false;
								$scope.foImgError = false;
								$scope.banktypeError = false;
								$scope.incomeProofImageValidation = true;
								$scope.foView = true;
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
								$scope.cmlView = true;
							}
							if (imgName == "ADDITIONALDOC1") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoctypeError = false;
								$scope.adl1View = true;
								$scope.adocUpdt = true;
							}
							if (imgName == "ADDITIONALDOC2") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoc2typeError = false;
								$scope.adl2View = true;
								$scope.adocUpdt = true;
							}
							if (imgName == "ADDITIONALDOC3") {
								$scope.adocLoad = false;
								$scope.adocImgError = false;
								$scope.adoc3typeError = false;
								$scope.adlView = true;
								$scope.adocUpdt = true;
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
								$scope.no1View = true;
							}
							if (imgName == "NOMINEE2") {
								$scope.nominee2Updt = true;
								$scope.nominee2Load = false;
								$scope.nominee2ImgError = false;
								$scope.nominee2typeError = false;
								$scope.no2View = true;
							}
							if (imgName == "NOMINEE3") {
								$scope.nominee3Updt = true;
								$scope.nominee3Load = false;
								$scope.nominee3ImgError = false;
								$scope.nominee3typeError = false;
								$scope.no3View = true;
							}
							if (imgName == "GUARDIAN1") {
								$scope.guardian1Updt = true;
								$scope.guardian1Load = false;
								$scope.guardian1ImgError = false;
								$scope.guardian1typeError = false;
								$scope.gu1View = true;
							}
							if (imgName == "GUARDIAN2") {
								$scope.guardian2Updt = true;
								$scope.guardian2Load = false;
								$scope.guardian2ImgError = false;
								$scope.guardian2typeError = false;
								$scope.gu2View = true;
							}
							if (imgName == "GUARDIAN3") {
								$scope.guardian3Updt = true;
								$scope.guardian3Load = false;
								$scope.guardian3ImgError = false;
								$scope.guardian3typeError = false;
								$scope.gu3View = true;
							}
							if (imgName == "ADDRESSMODIFICATION") {
								$scope.amLoad = false;
								$scope.amImgError = false;
								$scope.amtypeError = false;
								$scope.amImageValidation = true;
							}
							if (imgName == "ClientPhoto" || imgName == "CorrespondenceAddress" || imgName == "PermenantAddress" || imgName == "PermenantAddress2") {
								$scope.idfyUsage();
							}
							// $scope.getImages();
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
							if (imgName == "ClientPhoto") {
								if ($scope.IsSelfi == "Y") {
									$scope.photoImgError = false;
									$scope.photoImageUpdt = false;
									// $scope.clientPhoqqualityError = true;
									$scope.ClienterrorMsg = response.ErrorMessage
									if ($scope.ClienterrorMsg == null || $scope.ClienterrorMsg == "") {
										$scope.clientPhoqqualityError = false;
									} else {
										$scope.clientPhoqqualityError = true;
									}
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
							// $scope.getImages();
						}

					});
				}
			}
		}
	}

	$scope.cImgUpld = function (docType) {
		if (docType) {
			if ($scope.cAddressUpdt || $scope.cAddressView) {
				$scope.delImg('CorrespondenceAddress');
			}
			if ($scope.cAddress2View || $scope.cAddressUpdt2) {
				$scope.delImg('CorrespondenceAddress2');
			}
			$('#CorrespondenceAddress').val('');
			$("#cAddressImage .file-input").empty();
			$(".c-adr .file-preview").empty();
			$rootScope.formData.caUrl = '';
			$scope.cAddressUpdt = false;
			$rootScope.formData.caUrl2 = '';
			$rootScope.formData.caImage = '';
			$rootScope.formData.caImage2 = '';
			$('#CorrespondenceAddress2').val('');
			$("#cAddressImage2 .file-input").empty();
			$(".c-adr2 .file-preview").empty();
			$scope.caddressProofImageValidation = false;
			$scope.cAddressView = false;
			$scope.cAddress2View = false;
		}
		$scope.cAddressCNImgError = false;
		$scope.docUpldMsg = 'Address proof upload in progress';
		if ($scope.aadharImage && $rootScope.formData.fields.DocsaddressProof == 111) {
			$scope.upldImageValidate("CorrespondenceAddress", $scope.aadharImage, 'Image', $rootScope.formData.fields.DocsaddressProof);
			if ($rootScope.formData.caImage2) {
				$scope.upldImageValidate("CorrespondenceAddress2", $rootScope.formData.caImage2, $scope.cafileType, $rootScope.formData.fields.DocsaddressProof);
			}
		} else if ($rootScope.formData.caImage || $rootScope.formData.caImage2) {
			if ($rootScope.formData.fields.DocsaddressProof == 111) {
				$('#CorrespondenceAddress').val('');
				$("#cAddressImage .file-input").empty();
				$(".c-adr .file-preview").empty();
				$rootScope.formData.caUrl = '';
				$scope.cAddressUpdt = false;
				$rootScope.formData.caUrl2 = '';
				$rootScope.formData.caImage = '';
				$rootScope.formData.caImage2 = '';
				$('#CorrespondenceAddress2').val('');
				$("#cAddressImage2 .file-input").empty();
				$(".c-adr2 .file-preview").empty();
				$scope.caddressProofImageValidation = false;
				$scope.cAddressView = false;
				$scope.cAddress2View = false;
				$scope.delImg('CorrespondenceAddress');
				$scope.delImg('CorrespondenceAddress2');

			} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
				$scope.cAdrLoad = true;
				var s_url = "DIYImageUpload";
				//var s_url = "DIYImageUploadS3";
				if ($scope.optimize) {
					s_url = "DIYImageUploadOptimize";
					//s_url = "DIYImageUploadS3";
				}
				var sendData = {
					ImageName: $scope.addressName,
					Image: $rootScope.formData.caImage,
					DocumentType: $rootScope.formData.fields.DocsaddressProof,
					ReferenceNumber: $rootScope.formData.eRefNumber,
					Extention: $scope.cafileType,
					IsDiy: true,
					IsIPV: "0",
					EncryptToken: $rootScope.EncryptToken
				};
				$scope.docUpldAPI = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					$scope.docUpldAPI = false;
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
							$scope.docUpldAPI = false;
							// $scope.getImages();
						});
					} else {
						$scope.docUpldAPI = false;
						// $scope.getImages();
					}

				});
			}
		}

		if (docType) {
			$scope.expiryDate = '';
			$scope.documentChangeNumber = '';
			if (docType == '109') {
				$scope.documentMaxlength = 10;
			} else if (docType == '108') {
				$scope.documentMaxlength = 8;
			} else if (docType == '110') {
				$scope.documentMaxlength = 16;
			}

			if (docType == '110' || docType == '108') {
				setTimeout(function () {
					$("#expiryDate").datepicker({
						changeMonth: true,
						changeYear: true,
						minDate: 1,
						dateFormat: 'dd/mm/yy',
						onSelect: function (value) {
							$('#expiryDate').removeClass('ng-empty');
							$('#expiryDate').addClass('ng-not-empty');
							$scope.expiryDate = value;
							$scope.expiryDateError = '';
							$scope.$applyAsync();
						}
					});

					$("#expiryDate").datepicker("option", "showAnim", "blind");
				}, 100);

			}
		}
	}

	$scope.pImgUpld = function (docType) {
		$scope.pAddressCNImgError = false;
		$scope.docUpldMsg = 'Address proof upload in progress';
		if ($scope.aadharImage && $rootScope.formData.fields.pDocsaddressProof == 111) {
			$scope.upldImageValidate("PDocumentImage", $scope.aadharImage, 'Image', $rootScope.formData.fields.pDocsaddressProof);
			if ($rootScope.formData.paImage2) {
				$scope.upldImageValidate("PERMENANTADDRESS2", $rootScope.formData.paImage2, $scope.pafileType, $rootScope.formData.fields.pDocsaddressProof);
			}

		} else if ($rootScope.formData.paImage || $rootScope.formData.paImage2) {
			if ($rootScope.formData.fields.pDocsaddressProof == 111) {
				$('#PermenantAddress').val('');
				$("#pAddressImage .file-input").empty();
				$(".p-adr .file-preview").empty();
				$rootScope.formData.paImage = '';
				$rootScope.formData.paUrl = '';
				$scope.pAddressUpdt = false;
				$rootScope.formData.paUrl2 = '';
				$rootScope.formData.paImage = '';
				$rootScope.formData.paImage2 = '';
				$('#PermenantAddress2').val('');
				$("#pAddressImage2 .file-input").empty();
				$(".p-adr2 .file-preview").empty();
				$rootScope.formData.paImage2 = '';
				$scope.paddressProofImageValidation = false;
				$scope.pAddressView = false;
				$scope.pAddress2View = false;
				$scope.delImg('PermenantAddress');
				$scope.delImg('PermenantAddress2');
			} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
				$scope.pAdrLoad = true;
				var s_url = "DIYImageUpload";
				//var s_url = "DIYImageUploadS3";
				if ($scope.optimize) {
					s_url = "DIYImageUploadOptimize";
					//s_url = "DIYImageUploadS3";
				}
				var sendData = {
					ImageName: $scope.permaddressName,
					Image: $rootScope.formData.paImage,
					DocumentType: $rootScope.formData.fields.pDocsaddressProof,
					ReferenceNumber: $rootScope.formData.eRefNumber,
					Extention: $scope.pafileType,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken,
					IsIPV: "0"
				};
				$scope.docUpldAPI = true;
				serverService.apiCall(s_url, sendData).then(function (a) {
					$scope.docUpldAPI = false;
					var response = a.data;

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
							$scope.docUpldAPI = false;
							// $scope.getImages();
						});
					} else {
						$scope.docUpldAPI = false;
						// $scope.getImages();
					}
				});
			}
		}

		if (docType) {
			$scope.pexpiryDate = '';
			$scope.pdocumentChangeNumber = '';
			if (docType == '109') {
				$scope.pdocumentMaxlength = 10;
			} else if (docType == '108') {
				$scope.pdocumentMaxlength = 8;
			} else if (docType == '110') {
				$scope.pdocumentMaxlength = 16;
			}


			if (docType == '110' || docType == '108') {
				setTimeout(function () {
					$("#pexpiryDate").datepicker({
						changeMonth: true,
						changeYear: true,
						minDate: 1,
						dateFormat: 'dd/mm/yy',
						onSelect: function (value) {
							$('#pexpiryDate').removeClass('ng-empty');
							$('#pexpiryDate').addClass('ng-not-empty');
							$scope.pexpiryDate = value;
							$scope.pexpiryDateError = '';
							$scope.$applyAsync();
						}
					});

					$("#pexpiryDate").datepicker("option", "showAnim", "blind");
				}, 100);

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

		} else if (imgName == 'CorrespondenceAddress') {
			$('#cAddressImage .file-input, .c-adr .file-input').empty();
			$('.c-adr .file-input').addClass('file-input-new');
			$('#cAddressImage .file-input').removeClass('file-input-new');
			$('.c-adr .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs txt-uppercase">FRONT IMAGE</span><input type="file" accept="image/*" ng-disabled="formData.digiData && !digiProofEnable" class="input-upload-front" id="CorrespondenceAddress" onchange="imgUpld(\'CorrespondenceAddress\');"></div></div></div>')
		}
		else {
			$scope.paddPage = false;
			$rootScope.formData.paImage2 = '';
			$('#pAddressImage2 .file-input, .p-adr2 .file-input').empty();
			$('.p-adr2 .file-input').addClass('file-input-new');
			$('#pAddressImage2 .file-input').removeClass('file-input-new');
			$('.p-adr2 .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppsercase">BACK IMAGE</span><input type="file" accept="image/*" class="input-upload-back" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
		}
	}

	$scope.bindImage = function (img) {
		var s_url = "DIYGetImagebyRefNum";
		//var s_url = "DIYGetImagebyRefNumS3";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			IsDiy: true,
			ImageName: img
		}
		var num = 0;
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var response = a.data;
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
						$('#aadharImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="Aadhar" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title=""></div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

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
						$('#clientImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						$scope.photoImageUpdt = true;
						$scope.photoImg_reShow = true;
						$scope.clientViewHide = true;
						$scope.photoView = false;
						$rootScope.formData.photoImage = value.ImageUrl;
						if (value.IsSelfi == 'Y') {
							$scope.selfTrue = true;
						}

						//$scope.takeSelfieDisabled = false;

						/* if ($rootScope.formData.isMobile) {
							$('.clientPhoto button').remove()
							$('.clientPhoto .file-drop-disabled').remove()
						} */

						num++;
					} else if (value.ImageName == "CLIENTPHOTO" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.photoImageUpdt = false;
					}
					if (value.ImageName == "PANImage" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.panUrl = value.ImageUrl;

						$('.pan-img .file-input').empty();

						/* if (!$rootScope.formData.digiData||$rootScope.formData.Pansuccess!=0) { */
						$('.pan-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PANNumber" onchange="imgUpld(\'PANNumber\');"></div></div></div>');
						/* } */

						$('#panPhoto .file-input').empty();
						$('#panPhoto').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$rootScope.formData.panImage = value.ImageUrl;
						$scope.panImageUpdt = true;
						$scope.panImg_reShow = true;
						$scope.panView = false;
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

					if (value.ImageName == "DocumentImage" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
						$rootScope.formData.caUrl = value.ImageUrl;

						$('.c-adr .file-input').empty();

						if (!$scope.cAddressDisable && (!$rootScope.formData.digiData || $rootScope.formData.aadhaarsuccess != 0)) {
							$rootScope.digiProofEnable = true;
							$('.c-adr .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="CorrespondenceAddress" onchange="imgUpld(\'CorrespondenceAddress\');"></div></div></div>')
						};
						$('#cAddressImage .file-input').empty();
						$('#cAddressImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$rootScope.formData.caImage = value.ImageUrl;
						$scope.cAddressUpdt = true;
						$scope.caImg_reShow = true;
						$scope.addressName = "CorrespondenceAddress";
						$scope.caViewHide = true;
						$scope.cAddressView = false;
						$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
						num++;


						if ($scope.cAddressDisable || ($rootScope.formData.digiData && $rootScope.formData.aadhaarsuccess != 0)) {
							$rootScope.digiProofEnable = true;
							$(".select.cadr").prop("disabled", true);
						}
					} else if (value.ImageName == "DocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.cAddressUpdt = false;
					}

					if (value.ImageName == "CORRESPONDENCEADDRESS2" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
						$rootScope.formData.caUrl2 = value.ImageUrl;

						$('.c-adr2 .file-input').empty().addClass('file-input-new');
						$('.c-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div></div></div>')
						$('#cAddressImage2 .file-input').empty().removeClass('file-input-new');;
						$('#cAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.cAddressUpdt2 = true;
						$scope.ca2Img_reShow = true;
						$rootScope.formData.caImage2 = value.ImageUrl;
						$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
						$scope.addressName1 = "CorrespondenceAddress2";
						$scope.caddPage = true;
						$scope.ca2ViewHide = true;
						$scope.cAddress2View = false;
					}

					if (value.ImageName == "CheckImage" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.bankUrl = value.ImageUrl;

						$('.bank-img .file-input').empty();
						$('.bank-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="BankCheque" onchange="imgUpld(\'BankCheque\');"></div></div></div>');
						$('#bankImage .file-input').empty();
						$('#bankImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.bankUpdt = true;
						$rootScope.formData.baImage = value.ImageUrl;
						$scope.chqImg_reShow = true;
						$scope.chequeViewHide = true;
						$scope.bankView = false;
						num++;
					} else if (value.ImageName == "CheckImage" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.bankUpdt = false;
					}

					if (value.ImageName == "PDocumentImage" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
						$rootScope.formData.paUrl = value.ImageUrl;
						$('.p-adr .file-input').empty();
						$('.p-adr .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PermenantAddress" onchange="imgUpld(\'PermenantAddress\');"></div></div></div>');
						$('#pAddressImage .file-input').empty();
						$('#pAddressImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.pAddressUpdt = true;
						$rootScope.formData.paImage = value.ImageUrl;
						$scope.permaddressName = 'PERMENANTADDRESS';
						$scope.paImg_reShow = true;
						$scope.paViewHide = true;
						$scope.pAddressView = false;
						$rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString();
						num++;
					} else if (value.ImageName == "PDocumentImage" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.pAddressUpdt = false;
					}

					if (value.ImageName == "PERMENANTADDRESS2" && value.ImageUrl != null && value.ImageUrl != '' && value.DocTypeID) {
						$rootScope.formData.paUrl2 = value.ImageUrl;
						$('.p-adr2 .file-input').empty().addClass('file-input-new');
						$('.p-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload-back" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
						$('#pAddressImage2 .file-input').empty();
						$('#pAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.pAddressUpdt2 = true;
						$rootScope.formData.paImage2 = value.ImageUrl;
						$scope.permaddressName1 = 'PERMENANTADDRESS2';
						$scope.pa2Img_reShow = true;
						$scope.paddPage = true;
						$scope.pa2ViewHide = true;
						$scope.pAddress2View = false;
					}

					if (value.ImageName == "Specimen" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.signatureUrl = value.ImageUrl;

						$('.signature-img .file-input').empty();
						$('.signature-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="SPECIMENPROOF" onchange="imgUpld(\'SPECIMENPROOF\');"></div></div></div>');
						$('#clientSignature .file-input').empty();
						$('#clientSignature').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.signatureUpdt = true;
						$scope.signatureName = 'SPECIMENPROOF';
						$rootScope.formData.signatureImage = value.ImageUrl;
						$scope.signatureImg_reShow = true;
						$scope.signatureViewHide = true;
						$scope.signView = false;
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
							$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						} else {

							$('.income-img .file-input').empty();
							$('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
							$('#incomeImage .file-input').empty();
							$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						}
						$scope.foUpdt = true;
						$scope.foName = 'Income';
						$rootScope.formData.foImage = value.ImageUrl;
						$scope.foImg_reShow = true;
						$scope.foViewHide = true;
						$scope.foView = false;
						$rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString();
						num++;
					} else if (value.ImageName == "INCOME" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.foUpdt = false;
					}

					if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nomineeUrl = value.ImageUrl;

						if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
							$('.cml-img .file-input').empty();
							$('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
							$('#cmlImage .file-input').empty();
							$('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						} else {

							$('.cml-img .file-input').empty();
							$('.cml-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*,application/pdf,.pdf" class="input-upload" id="CMLDOCUMENT" onchange="imgUpld(\'CMLDOCUMENT\');"></div></div></div>');
							$('#cmlImage .file-input').empty();
							$('#cmlImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						}
						$scope.cmlUpdt = true;
						$rootScope.formData.cmlImage = value.ImageUrl;
						$scope.cmlImg_reShow = true;
						$scope.cmlViewHide = true;
						$scope.cmlView = false;
						num++;
					} else if (value.ImageName == "CMLDOCUMENT" && value.ImageUrl == null && value.ImageUrl == '') {
						$scope.cmlUpdt = false;
					}

					if (value.ImageName == "Additionaldoc1" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nomineeUrl = value.ImageUrl;

						$('.adoc1-img .file-input').empty();
						$('.adoc1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC1" onchange="imgUpld(\'ADDITIONALDOC1\');"></div></div></div>');
						$('#ADDITIONALDOC1IMAGE .file-input').empty();
						$('#ADDITIONALDOC1IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.adocUpdt = true;
						$rootScope.formData.adocImage = value.ImageUrl;
						$scope.adocImg_reShow = true;
						$scope.ad1ViewHide = true;
						$scope.adl1View = false;
						num++;
					}

					if (value.ImageName == "Additionaldoc2" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nomineeUrl = value.ImageUrl;

						$('.adoc2-img .file-input').empty();
						$('.adoc2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC2" onchange="imgUpld(\'ADDITIONALDOC2\');"></div></div></div>');
						$('#ADDITIONALDOC2IMAGE .file-input').empty();
						$('#ADDITIONALDOC2IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						$scope.adocaddPage2 = true;
						$scope.adocUpdt = true;
						$rootScope.formData.adoc2Image = value.ImageUrl;
						$scope.adoc2Img_reShow = true;
						$scope.ad2ViewHide = true;
						$scope.adl2View = false;
						num++;
					}

					if (value.ImageName == "Additionaldoc3" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nomineeUrl = value.ImageUrl;

						$('.adoc3-img .file-input').empty();
						$('.adoc3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ADDITIONALDOC3" onchange="imgUpld(\'ADDITIONALDOC3\');"></div></div></div>');
						$('#ADDITIONALDOC3IMAGE .file-input').empty();
						$('#ADDITIONALDOC3IMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						$scope.adocaddPage3 = true;
						$scope.adocUpdt = true;
						$rootScope.formData.adoc3Image = value.ImageUrl;
						$scope.adoc3Img_reShow = true;
						$scope.ad3ViewHide = true;
						$scope.adl3View = false;
						num++;
					}

					if (value.ImageName == "NOMINEE1" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nominee1Url = value.ImageUrl;

						$('.nominee1-img .file-input').empty();
						$('.nominee1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE1" onchange="imgUpld(\'NOMINEE1\');"></div></div></div>');
						$('#NOMINEE1PROOFIMAGE .file-input').empty();
						$('#NOMINEE1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.nominee1Updt = true;
						$rootScope.formData.nominee1Image = value.ImageUrl;
						$scope.nominee1Img_reShow = true;
						$scope.nmViewHide = true;
						$scope.no1View = false;
						num++;
					}
					if (value.ImageName == "NOMINEE2" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nominee2Url = value.ImageUrl;

						$('.nominee2-img .file-input').empty();
						$('.nominee2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
						$('#NOMINEE2PROOFIMAGE .file-input').empty();
						$('#NOMINEE2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.nominee2Updt = true;
						$rootScope.formData.nominee2Image = value.ImageUrl;
						$scope.nominee2Img_reShow = true;
						$scope.nm2ViewHide = true;
						$scope.no2View = false;
						num++;
					}
					if (value.ImageName == "NOMINEE3" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nominee3Url = value.ImageUrl;

						$('.nominee3-img .file-input').empty();
						$('.nominee3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEE2" onchange="imgUpld(\'NOMINEE2\');"></div></div></div>');
						$('#NOMINEE3PROOFIMAGE .file-input').empty();
						$('#NOMINEE3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.nominee3Updt = true;
						$rootScope.formData.nominee3Image = value.ImageUrl;
						$scope.nominee3Img_reShow = true;
						$scope.nm3ViewHide = true;
						$scope.no3View = false;
						num++;
					}
					if (value.ImageName == "GUARDIAN1" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.guardian1Url = value.ImageUrl;

						$('.guardian1-img .file-input').empty();
						$('.guardian1-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN1" onchange="imgUpld(\'GUARDIAN1\');"></div></div></div>');
						$('#GUARDIAN1PROOFIMAGE .file-input').empty();
						$('#GUARDIAN1PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.guardian1Updt = true;
						$rootScope.formData.guardian1Image = value.ImageUrl;
						$scope.guardian1Img_reShow = true;
						$scope.guViewHide = true;
						$scope.gu1View = false;
						num++;
					}
					if (value.ImageName == "GUARDIAN2" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.guardian2Url = value.ImageUrl;

						$('.guardian2-img .file-input').empty();
						$('.guardian2-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN2" onchange="imgUpld(\'GUARDIAN2\');"></div></div></div>');
						$('#GUARDIAN2PROOFIMAGE .file-input').empty();
						$('#GUARDIAN2PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.guardian2Updt = true;
						$rootScope.formData.guardian2Image = value.ImageUrl;
						$scope.guardian2Img_reShow = true;
						$scope.gu2ViewHide = true;
						$scope.gu2View = false;
						num++;
					}
					if (value.ImageName == "GUARDIAN3" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.guardian2Url = value.ImageUrl;

						$('.guardian3-img .file-input').empty();
						$('.guardian3-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="GUARDIAN3" onchange="imgUpld(\'GUARDIAN3\');"></div></div></div>');
						$('#GUARDIAN3PROOFIMAGE .file-input').empty();
						$('#GUARDIAN3PROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-bs-toggle="modal" data-bs-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.guardian3Updt = true;
						$rootScope.formData.guardian3Image = value.ImageUrl;
						$scope.guardian3Img_reShow = true;
						$scope.gu3ViewHide = true;
						$scope.gu3View = false;
						num++;
					}

					//$scope.showView = false;
					$('.file-input .file-preview').css('display', 'block');

					setTimeout(function () {
						$(".select").select2();
					}, 1000);
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
			}
		})
	}

	$scope.getToken();

	$scope.getImages = function () {

		var s_url = "DIYGetImagesByReferenceNumberFlag";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken,
			Mobile: $rootScope.formData.fields.mobile,
			Email: $rootScope.formData.fields.email,
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
			$rootScope.docgetAPI = false;

			if (response.IsSuccess) {

				$rootScope.IPVRedirectURL = response.IpvURLEncode;
				if ($rootScope.BYOD) {
					$scope.documentChangeNumber = response.CDocumentNumber;
					if (!$scope.documentChangeNumber) {
						$scope.showValidateFields = true;
					}
				}

				angular.forEach(response.IpvPOAandNomineeList, function (value, key) {
					if (value.ImageName == "PANImage") {
						$scope.panView = false;
						$scope.panImageUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.panView = true;
							$scope.panImageUpdt = true;
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.panVcipView = true;
							$scope.panImageUpdt = false;
						}
					}

					if (value.ImageName == "Specimen") {
						$scope.signView = false;
						$scope.signatureUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.signView = true;
							$scope.signatureUpdt = true;
						}
					}

					if (value.ImageName == "CLIENTPHOTO") {
						$scope.photoView = false;
						$scope.photoImageUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.photoView = true;
							$scope.photoImageUpdt = true;
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.photoVcipView = true;
							$scope.photoImageUpdt = false;
						}
					}

					if (value.ImageName == "CheckImage") {
						$scope.bankView = false;
						$scope.bankUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.bankView = true;
							$scope.bankUpdt = true;
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.bankVcipView = true;
							$scope.bankUpdt = false;
						}
					}

					if (value.ImageName == "DocumentImage") {
						$scope.cAddressView = false;
						$scope.cAddressUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.cAddressView = true;
							$scope.cAddressUpdt = true;
							if (value.DocTypeID) {
								$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString()
								setTimeout(function () {
									$(".select").select2();
									$('.select').trigger('change');
								}, 400);
							}
							if (value.DocTypeID == 1011 && $rootScope.BYOD) {
								$scope.showValidateFields = false;
								$scope.byodnumberValidation = true;
							}
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.cAddressVcipView = true;
							$scope.cAddressUpdt = false;
						}
					}
					if (value.ImageName == "DocumentImage" && value.ImageFlag == 'N' && $rootScope.formData.digiData) {
						$rootScope.digiProofEnable = true;
					}
					if (value.ImageName == "CORRESPONDENCEADDRESS2") {
						$scope.cAddress2View = false;
						$scope.cAddressUpdt2 = false;
						if (value.ImageFlag == 'Y') {
							$scope.cAddress2View = true;
							$scope.cAddressUpdt2 = true;
							if (value.DocTypeID) {
								$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString()
								setTimeout(function () {
									$(".select").select2();
									$('.select').trigger('change');
								}, 400);
							}
						}
						// else if(value.ImageFlag == 'N' && $rootScope.formData.digiData){
						// 	$rootScope.digiProofEnable = true;
						// }
					}

					if (value.ImageName == "PDocumentImage") {
						$scope.pAddressView = false;
						$scope.pAddressUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.pAddressView = true;
							$scope.pAddressUpdt = true;
							if (value.DocTypeID) {
								$rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString()
								setTimeout(function () {
									$(".select").select2();
									$('.select').trigger('change');
								}, 400);
							}
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.pAddressVcipView = true;
							$scope.pAddressUpdt = false;
						}
					}

					if (value.ImageName == "PERMENANTADDRESS2") {
						$scope.pAddress2View = false;
						$scope.pAddressUpdt2 = false;
						if (value.ImageFlag == 'Y') {
							$scope.pAddress2View = true;
							$scope.pAddressUpdt2 = true;
						}
					}

					if (value.ImageName == "INCOME") {
						$scope.foView = false;
						$scope.foUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.foView = true;
							$scope.foUpdt = true;
							if (value.DocTypeID) {
								$rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString()
								setTimeout(function () {
									$(".select").select2();
									$('.select').trigger('change');
								}, 400);

							}
						} else if ($rootScope.vcip && !$scope.vcipOTP) {
							$scope.foVcipView = true;
							$scope.foUpdt = false;
						}
					}

					if (value.ImageName == "CMLDOCUMENT") {
						$scope.cmlView = false;
						$scope.cmlUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.cmlImg_reShow = true;
							$scope.cmlView = true;
							$scope.cmlUpdt = true;
						}
					}

					if (value.ImageName == "Additionaldoc1") {
						$scope.adl1View = false;
						$scope.adocUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.adl1View = true;
							$scope.adocUpdt = true;
						}
					}

					if (value.ImageName == "Additionaldoc2") {
						$scope.adl2View = false;
						$scope.adocUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.adl2View = true;
							$scope.adocUpdt = true;
						}
					}

					if (value.ImageName == "Additionaldoc3") {
						$scope.adl3View = false;
						$scope.adocUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.adlView = true;
							$scope.adocUpdt = true;
						}
					}

					if (value.ImageName == "Additionaldoc3") {
						$scope.adl3View = false;
						$scope.adocUpdt = false;
						if (value.ImageFlag == 'Y') {
							$scope.adlView = true;
							$scope.adocUpdt = true;
						}
					}

					if (value.ImageName == "NOMINEE1") {
						$scope.no1View = false;
						$scope.nominee1Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.no1View = true;
							$scope.nominee1Updt = true;
						}
					}

					if (value.ImageName == "NOMINEE2") {
						$scope.no2View = false;
						$scope.nominee2Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.no2View = true;
							$scope.nominee2Updt = true;
						}
					}

					if (value.ImageName == "NOMINEE3") {
						$scope.no3View = false;
						$scope.nominee3Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.no3View = true;
							$scope.nominee3Updt = true;
						}
					}

					if (value.ImageName == "GUARDIAN1") {
						$scope.gu1View = false;
						$scope.guardian1Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.gu1View = true;
							$scope.guardian1Updt = true;
						}
					}

					if (value.ImageName == "GUARDIAN2") {
						$scope.gu2View = false;
						$scope.guardian2Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.gu2View = true;
							$scope.guardian2Updt = true;
						}
					}

					if (value.ImageName == "GUARDIAN3") {
						$scope.gu3View = false;
						$scope.guardian3Updt = false;
						if (value.ImageFlag == 'Y') {
							$scope.gu3View = true;
							$scope.guardian3Updt = true;
						}
					}

				});
				// setTimeout( function() {
				$scope.getChangeID($rootScope.formData.fields.DocsaddressProof, 'C', response.CDocumentNumber, response.CExpiryDate);
				$scope.getChangeID($rootScope.formData.fields.pDocsaddressProof, 'P', response.PDocumentNumber, response.PExpiryDate);
				// },500)


				if ($rootScope.BYOD && ((sessionStorage.getItem('namegetMismatch') && sessionStorage.getItem('namegetMismatch') == 'Y') && (sessionStorage.getItem('DobgetMismatch') && sessionStorage.getItem('DobgetMismatch') == 'Y'))) {
					$scope.documentvalidation();
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
			}

			//$rootScope.formData.apiLoading = false;

			/*  if (num == 6) {
			$('#agree-terms').prop('checked', true);
			$rootScope.formData.fields.termsAccept = true;
			$scope.termsError = false;
			setTimeout(function (){

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
	$scope.getDocInfo = function () {
		if (!$rootScope.getAPI || $rootScope.BYOD) {
			var s_url1 = "DIYGetClientOtherInfoByReferenceNumber";
			var sendData1 = {
				ReferenceNumber: $rootScope.formData.eRefNumber,
				IsDiy: true,
				EncryptToken: $rootScope.EncryptToken
			}
			$scope.imgM = true;

			$rootScope.formData.apiLoading = true;
			$rootScope.docgetAPI = true;
			sendData1 = $rootScope.encryptReq(sendData1);
			serverService.apiCall(s_url1, sendData1).then(function (a) {
				$rootScope.docgetAPI = false;
				var response = $rootScope.decryptRes(a.data, 'Response');
				$rootScope.formData.apiLoading = false;
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
				// $scope.getImages();
				if (response.IsSuccess) {
					$scope.getPersonalInfo(response);
				}
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
		sessionStorage.removeItem('eSign')

		if ($rootScope.formData.isgDocSkip) {
			$scope.ddpiError = false;

			const AgreeTC = $('#agree-terms').is(':checked');
			if ($scope.foImgUpld && !$scope.foUpdt) {
				$scope.foImgError = true;
				$("html, body").animate({
					scrollTop: $("#Income").offset().top
				});
				return false;
			} else if (!AgreeTC) {
				$scope.termsError = true;
				return false;
			} else if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
				$scope.ddpiError = true;
				return false;
			}
		} else {

			var error = 0;
			if (!$scope.docImgCompleted) {
				// if (!$scope.panImageUpdt) {
				// 	$scope.panImgError = true;
				// 	$("html, body").animate({
				// 		scrollTop: $("#PANNumber").offset().top
				// 	});
				// 	error++;

				// }
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
						scrollTop: $("#clientImageSelfie").offset().top
					});
					error++;

				}
				if (!$rootScope.webfinacle) {
					if ($scope.chequeUpld && !$scope.bankUpdt && !$rootScope.formData.CKYC) {
						$scope.bankImgError = true;
						$("html, body").animate({
							scrollTop: $("#BankCheque").offset().top
						});
						error++;

					}
				}
				if ((!$scope.ibDocumentHide || $rootScope.IsCorrespondenceSikkim == 'Y') && !$scope.cAddressUpdt) {
					$scope.cAddressImgError = true;
					$("html, body").animate({
						scrollTop: $("#CorrespondenceAddress").offset().top
					});
					error++;

				}
				if ((!$scope.ibDocumentHide || $rootScope.IsPermanentSikkim == 'Y') && $scope.paddrUpld && !$scope.pAddressUpdt) {
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
				const AgreeTC = $('#agree-terms').is(':checked');
				if (!AgreeTC) {
					$scope.termsError = true;
					error++;
				}

				if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
					$scope.ddpiError = true;
					error++;
				}

			}

			if (process == 'esign') {
				error = 0;
				if ((!$rootScope.formData.latitude || !$rootScope.formData.longitude) && $rootScope.BYOD) {
					$scope.locationerror = true;
					return;
				}
				if (!$scope.disableESign && $rootScope.BYOD) {
					$scope.geolocation();
					$scope.locError = true;
					return;
				}
			}
			if ($scope.allowEsign) {
				$('#formPDF').modal('hide');
				var allowSign = new bootstrap.Modal(document.getElementById('allowEsigns'), {
					backdrop: 'static',
					keyboard: true
				});
				allowSign.show();
			}
			else if (error == 0 && !$scope.allowEsign) {

				var s_url = "DIYGetNomineeDetailsByReferenceNumber";
				var sendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					IsDiy: true,
					EncryptToken: $rootScope.EncryptToken
				}
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					// ---- BYOD nominee routing (BYOD ONLY - non-BYOD paths below are untouched) ----
					// Nominee existence is decided ONLY by the first nominee row's FirstName.
					// Top-level NameOfNominee / NomineeFlag are the statement-of-holding PRINT
					// preference (see personalDetails.js DIYNomineeRegistrationNewEnc payload) and
					// are legitimately empty for a customer who DOES have a nominee, so they must
					// never be used as the existence test.
					var byodNomineeRow = (response && response.IpvPOAandNomineeList) ? response.IpvPOAandNomineeList[0] : null;
					var byodHasNominee = !!(byodNomineeRow && byodNomineeRow.FirstName != null && String(byodNomineeRow.FirstName).trim() !== '');
					if ($rootScope.BYOD) {
						if (!byodHasNominee) {
							// CASE 2 - no nominee row: existing Annexure-B declarations, ticked by
							// the customer. eSign starts only after Confirm succeeds.
							var byodOptOut = (response && response.NomineeOptOutFlag != null)
                                ? response.NomineeOptOutFlag
                                : (byodNomineeRow ? byodNomineeRow.NomineeOptOutFlag : null);
                            var byodAlreadyOptedOut = String(byodOptOut == null ? '' : byodOptOut).trim().toUpperCase() === 'N';
                            if (byodAlreadyOptedOut || $scope.nomineeOptOutConfirmed) {
                                // Declarations already captured - go straight on to eSign.
                                $rootScope.formData.fields.nominee = 'N';
                                $scope.NomineeError = false;
                                $scope.personalUpdate(process);
                                return;
                            }
							$scope.openNomineeDeclDoc(process);
							return;
						}
						if (!response.IsSuccess) {
							// Name present but the envelope is unusable - surface it instead of
							// stalling on a dead button.
							$scope.commonModalErrorMessage = response.ErrorMessage ? response.ErrorMessage : 'Unable to fetch nominee details. Please try again.';
							$scope.ModalTrigger('commonModal', true);
							return;
						}
					}
					if (response.IsSuccess && response.IpvPOAandNomineeList.length > 0) {
						if(response.IpvPOAandNomineeList[0].NomineeOptOutFlag == '' ||
                            ($rootScope.BYOD && String(response.IpvPOAandNomineeList[0].NomineeOptOutFlag == null ? '' : response.IpvPOAandNomineeList[0].NomineeOptOutFlag).trim().toUpperCase() !== 'N')){
							if (response.IpvPOAandNomineeList.length > 0) {
								$rootScope.formData.fields.nominee = 'Y';
								$('#nYes').prop('checked', true);
								$('#nNo').prop('checked', false);
								let arr = response.IpvPOAandNomineeList;
								if (arr.length > 0) {
									let nominees = arr;

									$rootScope.nomineeNewFields = [];
									$rootScope.additionalAddress = [];
									$rootScope.guardianNewFields = [];
									$rootScope.GuardadditionalAddress = [];

									nominees.forEach((nominee, index) => {
										let nomineeFields = [
											{ field: "First name", disabled: nominee.FirstName ? true : false, value: nominee.FirstName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
											{ field: "Middle name", disabled: nominee.FirstName ? true : false, value: nominee.MiddleName || '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
											{ field: "Last name", disabled: nominee.LastName ? true : false, value: nominee.LastName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
											{ field: "Date of birth", disabled: nominee.NomineeDOB ? true : false, value: nominee.NomineeDOB || '', required: true, type: 'date' },
											{
												field: "Relationship", disabled: nominee.RelationshipWithNominee ? true : false, value: nominee.RelationshipWithNominee ? nominee.RelationshipWithNominee.toString() : '', required: true, type: 'dropdown',
												arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
												valueKey: 'NomineeValue'
											},
											{ field: "Mobile Number", disabled: nominee.Mobile ? true : false, value: nominee.Mobile || '', required: false, type: 'input', directive: 'digit', length: 10 },
											{ field: "Email ID", disabled: nominee.Email ? true : false, value: nominee.Email || '', required: false, type: 'input', directive: 'email' },
											{
												field: "Id Proof", disabled: nominee.NomineeProofId ? true : false, value: nominee.NomineeProofId ? nominee.NomineeProofId.toString() : '', required: false, type: 'dropdown',
												arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
												valueKey: 'DocumentTypeId'
											},
											{
												field: nominee.NomineeProofId.toString() === '1007' ? "Id proof number: (Last 4 digits)" : 'Id proof number', value: nominee.NomineeIDProofNumber || '',
												// required: nominee.NomineeProofId.toString() === '1012' ? false : true, type: 'input',
												required: false, type: 'input', //sabari
												directive: nominee.NomineeProofId.toString() === '1007' ? 'decimal' : 'alpha-numeric',
												length: nominee.NomineeProofId.toString() === '1007' ? 4 : nominee.NomineeProofId.toString() === '1015' ? 16 : nominee.NomineeProofId.toString() === '1017' ? 16 : 10,
												disabled: nominee.NomineeProofId ? true : false,
											},

											{ field: "Nominee share (%)", disabled: true, value: nominee.NomineeRatio || '', required: true, type: 'input', directive: 'decimal', length: 3 },
											{ field: '+ Add Nominee', type: 'button', class: 'col-md-6' },
											{ field: "sameAddress", disabled: true, value: nominee.IsNomineeSameAsApplicant !== "0", required: false, type: 'checkbox', class: 'col-md-12 mb-5' },
											{ field: 'NomineeInfoId', value: nominee.NomineeInfoId, required: false, type: 'hidden' }
										];
										$rootScope.nomineeNewFields.push(nomineeFields);
										setTimeout(() => {
											$scope.initDatepicker(index, 'nominee');

										}, 0);
										/* if (nominee.IsNomineeSameAsApplicant === "0") {
											let nomineeAddress = [
												{ field: "Your Address, Line 1", value: nominee.AddressLine1 || '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
												{ field: "Your Address, Line 2", value: nominee.AddressLine2 || '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
												{ field: "Your Address, Line 3", value: nominee.AddressLine3 || '', required: false, type: 'input', class: 'col-md-6', directive: 'alphapet', length: 30 },
												{ field: "Pincode", value: nominee.PinCode.toString() || '', required: true, type: 'autocomplete' },
												{ field: "State", value: nominee.State || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
												{ field: 'District', value: nominee.District || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
												{ field: "City", value: nominee.City || '', required: true, type: 'autocomplete' },
												{ field: 'Country', value: nominee.Country || '', required: true, type: 'input', directive: 'alphapet', length: 5 },

											];
											setTimeout(() => {
												const a = document.getElementById(`Pincode-${index}_value`);
												if (a) a.value = nominee.PinCode.toString();
												const b = document.getElementById(`City-${index}_value`);
												if (b) b.value = nominee.City;
											}, 1000);

											// setTimeout(() => {
											// 	nomineeAddress.filter((data) => data.field === 'Pincode')[0].value = nominee.PinCode.toString();
											// 	$rootScope.additionalAddress[index] = nomineeAddress;
											// }, 1000);
											$rootScope.additionalAddress[index] = nomineeAddress;
										} */

										if (nominee.IsGuardian === "1") {
											let guardianFields = [
												{ field: "Guardian first name", readonly: nominee.GuardianFirstName ? true : false, value: nominee.GuardianFirstName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
												{ field: "Guardian middle name", readonly: nominee.GuardianFirstName ? true : false, value: nominee.GuardianMiddleName || '', required: false, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
												{ field: "Guardian Last name", readonly: nominee.GuardianLastName ? true : false, value: nominee.GuardianLastName || '', required: true, type: 'input', class: 'col-md-4', directive: 'alphapet', length: 30 },
												{ field: "Guardian Date of birth", readonly: nominee.GuardianDateofBirth ? true : false, value: nominee.GuardianDateofBirth || '', required: true, type: 'date' },
												{
													field: "Relationship", readonly: nominee.GuardianRelationship ? true : false, value: nominee.GuardianRelationship ? nominee.GuardianRelationship.toString() : '', required: true, type: 'dropdown',
													arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
													valueKey: 'NomineeValue'
												},
												{ field: "Guardian Mobile Number", readonly: nominee.GuardianMobile ? true : false, value: nominee.GuardianMobile || '', required: false, type: 'input', directive: 'digit', length: 10 },
												{ field: "Guardian Email ID", readonly: nominee.GuardianEmail ? true : false, value: nominee.GuardianEmail || '', required: false, type: 'input', directive: 'email' },
												{
													field: "Guardian Id Proof", readonly: nominee.GuardianProofId ? true : false, value: nominee.GuardianProofId ? nominee.GuardianProofId.toString() : '', required: false, type: 'dropdown',
													arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
													valueKey: 'DocumentTypeId'
												},
												{
													field: nominee.GuardianProofId.toString() === '1007' ? "Guardian ID proof number: (Last 4 digits)" : 'Guardian Id proof number',
													value: nominee.GuardianIDProofNumber || '', readonly: nominee.GuardianIDProofNumber ? true : false,
													// required: nominee.GuardianProofId.toString() === '1012' ? false : true, type: 'input',
													required: false, type: 'input', //sabari
													directive: nominee.GuardianProofId.toString() === '1007' ? 'decimal' : 'alpha-numeric',
													length: nominee.GuardianProofId.toString() === '1007' ? 4 : nominee.GuardianProofId.toString() === '1015' ? 16 : nominee.GuardianProofId.toString() === '1017' ? 16 : 10
												},
												{ field: "sameAddress", value: nominee.IsGuardianSamePermenantAddress !== "0", required: false, type: 'checkbox', class: 'col-md-12 mb-5' }
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

											/* if (nominee.IsGuardianSamePermenantAddress === "0") {
												let guardianAddress = [
													{ field: "Your Address, Line 1", value: nominee.GuardianAddressLine1 || '', required: true, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
													{ field: "Your Address, Line 2", value: nominee.GuardianAddressLine2 || '', required: false, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
													{ field: "Your Address, Line 3", value: nominee.GuardianAddressLine3 || '', required: false, type: 'input', class: 'col-md-12', directive: 'alphapet', length: 30 },
													{ field: "Pincode", value: nominee.GuardianPinCode.toString() || '', required: true, type: 'autocomplete' },
													{ field: "State", value: nominee.GuardianState || '', required: false, readonly: true, type: 'input', directive: 'alphapet' },
													{ field: 'District', value: nominee.GuardianDistrict, required: false, readonly: true, type: 'input', directive: 'alphapet' },
													{ field: "City", value: nominee.GuardianCity || '', required: true, type: 'autocomplete' },
													{ field: 'Country', value: nominee.GuardianCountry || '', required: true, type: 'input', directive: 'alphapet', length: 5 },
												];
												$rootScope.GuardadditionalAddress[index] = guardianAddress;
											} */
										}
									});
									// setTimeout(() => {
									// $(".select").select2();
									// }, 250);
									$scope.nomineeNewPercentCheck('Nominee share (%)');
									// $('#formPDF').modal('hide');
									// $scope.ModalTrigger('personal-details' , true);
									setTimeout(function () {
										$(".select").select2();
									}, 500);
								}
							}
						}
						if ($rootScope.BYOD && byodHasNominee && $rootScope.nomineeNewFields && $rootScope.nomineeNewFields.length > 0) {
							// CASE 1 - real nominee. Show the existing populated nominee popup and
							// STOP HERE. eSign must not be initiated until the customer submits it
							// (submitByodPersonal -> validateNomineeFields -> NomineeSave ->
							// personalUpdate), which is why this returns before the block below.
							// Pre-select the saved print preference exactly as
							// personalDetails.getNomineeDetails() does; empty => customer picks one.
							if (response.NomineeFlag) {
								$rootScope.nomineePrint = response.NomineeFlag;
							}
							$scope.NomineeError = true;
							$('#formPDF').modal('hide');
							$scope.ModalTrigger('personal-details', true);
							setTimeout(function () {
								$(".select").select2();
							}, 500);
							return;
						}
						if (true) {
							// let guardianData = response.IpvPOAandNomineeList.filter(val => val.IsGuardian == '1');
							// if (!response.IpvPOAandNomineeList.every(data => data.Mobile && data.Email)) {
							// 	$('#formPDF').modal('hide');
							// 	$scope.NomineeError = true;
							// 	if ($rootScope.BYOD) {
							// 		// $scope.ModalTrigger('personal-details' , true);
							// 		// setTimeout(function () {
							// 		// $(".select").select2();
							// 		// }, 500);
							// 	} else {
							// 		$scope.ModalTrigger('nomineeModal', true);
							// 	}
							// } else if (guardianData.length > 0 && !guardianData.every(data => data.GuardianMobile && data.GuardianEmail)) {
							// 	$('#formPDF').modal('hide');
							// 	$scope.NomineeError = true;
							// 	if ($rootScope.BYOD) {
							// 		// $scope.ModalTrigger('personal-details' , true);
							// 		// setTimeout(function () {
							// 		// $(".select").select2();
							// 		// }, 500);
							// 	} else {
							// 		$scope.ModalTrigger('nomineeModal', true);
							// 	}
							// } else if (!response.NomineeFlag) {
							// 	$('#formPDF').modal('hide');
							// 	$scope.NomineeError = true;
							// 	if ($rootScope.BYOD) {
							// 		// $scope.ModalTrigger('personal-details' , true);
							// 	} else {
							// 		$scope.ModalTrigger('nomineeModal', true);
							// 	}
							// }
							let guardianData = (response.IpvPOAandNomineeList || []).filter(val => val.IsGuardian == '1');
							if (false) {
								$('#formPDF').modal('hide');
								$scope.ModalTrigger('nomineeModal', true);
							} else if (false) {
								$('#formPDF').modal('hide');
								$scope.ModalTrigger('nomineeModal', true);
							}
							else if (false) {
								$('#formPDF').modal('hide');
								$scope.ModalTrigger('nomineeModal', true);
							} else {
								$scope.NomineeError = false;
								if (!$rootScope.BYOD) {
									if (process == 'esign') {
										var refNo = $rootScope.formData.eRefNumber;
										var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
										$rootScope.formData.apiLoading = true;

										serverService.getApi(e_url).then(function (a) {
											var data = a.data;
											$rootScope.formData.apiLoading = false;
											if (data && !data.IsSuccess && data.ErrorCode == '303') {
												var durl = 'updateDDIP';
												var ddata = {
													"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
													"RiskDisclosure": "Y",
													"ReferenceNumber": $rootScope.formData.eRefNumber,
													"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
												}
												serverService.apiCall(durl, ddata);
												$scope.DIYUpdateIPVStage('esign');
												return;
											}

											if (data && !data.IsSuccess && data.ErrorCode == '301') {
												$scope.commonModalErrorMessage = data.ErrorMessage;
												$scope.ModalTrigger('commonModal', true);
												return;
											}
											if (data && !data.IsSuccess && data.ErrorCode == '300') {
												$scope.commonModalErrorMessage = data.ErrorMessage;
												$scope.ModalTrigger('commonModal', true);
												return;
											}
											if (data && !data.IsSuccess && (data.ErrorCode == '304' || data.ErrorCode == '305')) {
												sessionStorage.setItem('panNameMismatchEdit', 'Y');
												$scope.commonModalErrorMessage = data.ErrorMessage;
												$scope.ModalTrigger('commonModal', true);
												$(document.getElementById('commonModal')).one('hidden.bs.modal', function () {
													$scope.$apply(function () {
														$scope.getDecUrl();
														$state.go('register');
													});
												});
											}


											if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
												sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
												frmMain.action = data.eSignApiUrl;
												$('#msg').val(data.requestXml);
												document.getElementById("frmMain").submit();
											} else if (data.data) {
												if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
													sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
													frmMain.action = data.data.eSignApiUrl;
													$('#msg').val(data.data.requestXml);
													document.getElementById("frmMain").submit();
												}
											}
										})



									} else {
										$scope.updateIPVStage('');
									}
								} else {
									$scope.personalUpdate(process);
								}

							}
							if ($rootScope.BYOD && $scope.NomineeError) {
								$scope.ModalTrigger('personal-details', true);
								setTimeout(function () {
									$(".select").select2();
								}, 500);
							}
						} else {
							$scope.NomineeError = false;
							if (!$rootScope.BYOD) {
								if (process == 'esign') {
									var refNo = $rootScope.formData.eRefNumber;
									var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
									$rootScope.formData.apiLoading = true;

									serverService.getApi(e_url).then(function (a) {
										var data = a.data;
										$rootScope.formData.apiLoading = false;
										if (data && !data.IsSuccess && data.ErrorCode == '303') {
											var durl = 'updateDDIP';
											var ddata = {
												"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
												"RiskDisclosure": "Y",
												"ReferenceNumber": $rootScope.formData.eRefNumber,
												"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
											}
											serverService.apiCall(durl, ddata);
											$scope.DIYUpdateIPVStage('esign');
											return;
										}
										if (data && !data.IsSuccess && data.ErrorCode == '301') {
											$scope.commonModalErrorMessage = data.ErrorMessage;
											$scope.ModalTrigger('commonModal', true);
											return;
										}
										if (data && !data.IsSuccess && data.ErrorCode == '300') {
											$scope.commonModalErrorMessage = data.ErrorMessage;
											$scope.ModalTrigger('commonModal', true);
											return;
										}
										if (data && !data.IsSuccess && (data.ErrorCode == '304' || data.ErrorCode == '305')) {
											sessionStorage.setItem('panNameMismatchEdit', 'Y');
											$scope.commonModalErrorMessage = data.ErrorMessage;
											$scope.ModalTrigger('commonModal', true);
											$(document.getElementById('commonModal')).one('hidden.bs.modal', function () {
												$scope.$apply(function () {
													$scope.getDecUrl();
													$state.go('register');
												});
											});
										}


										if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
											sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
											frmMain.action = data.eSignApiUrl;
											$('#msg').val(data.requestXml);
											document.getElementById("frmMain").submit();
										} else if (data.data) {
											if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
												sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
												frmMain.action = data.data.eSignApiUrl;
												$('#msg').val(data.data.requestXml);
												document.getElementById("frmMain").submit();
											}
										}
									})



								} else {
									$scope.updateIPVStage('');
								}
							} else {
								$scope.personalUpdate(process);
							}
						}
					}  else if (response.IsSuccess == false && response.IpvPOAandNomineeList === null) {
                            // Legacy / old user with no nominee record (IsSuccess:false, null list).
                            // Set all 3 opt-out declarations checked and PERSIST the opt-out via the same
                            // API as Personal Details B "No -> Confirm" (DIYNomineeOptOutNewEnc). Continue
                            // to e-sign ONLY if the save succeeds.
                            if ($scope.legacyOptOutInProgress) { return; }
                            $scope.legacyOptOutInProgress = true;
                            $scope.nomineeDeclCheck1 = true;
                            $scope.nomineeDeclCheck2 = true;
                            $scope.nomineeDeclCheck3 = true;
                            $rootScope.formData.fields.nominee = 'N';
                            var optUrl = "DIYNomineeOptOutNewEnc";
                            var optData = [{
                                ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.formData.eRefNumber,
                                NomineeDeclCheck1: true,
                                NomineeDeclCheck2: true,
                                NomineeDeclCheck3: true,
                                NomineeFlag: 'N'
                            }];
                            optData = $rootScope.encryptReq(optData);
                            $rootScope.formData.apiLoading = true;
                            serverService.apiCall(optUrl, optData).then(function (o) {
                                var optRes = o.data;
                                $rootScope.formData.apiLoading = false;
                                $scope.legacyOptOutInProgress = false;
                                if (optRes && optRes.EncryptToken) {
                                    $rootScope.EncryptToken = optRes.EncryptToken;
                                    sessionStorage.setItem('AuthToken', optRes.EncryptToken);
                                }
                                if (optRes && optRes.IsSuccess) {
                                    $rootScope.formData.fields.nominee = 'N';
                                    $('#nYes').prop('checked', false);
                                    $('#nNo').prop('checked', true);
                                    $rootScope.formData.nomineeOptOutId = optRes.NomineeOptOutId;
                                    $scope.NomineeError = false;
                                    if (!$rootScope.BYOD) {
                                        if (process == 'esign') {
                                            var refNo = $rootScope.formData.eRefNumber;
                                            var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
                                            $rootScope.formData.apiLoading = true;
                                            serverService.getApi(e_url).then(function (a) {
                                                var data = a.data;
                                                $rootScope.formData.apiLoading = false;
                                                if (data && !data.IsSuccess && data.ErrorCode == '303') {
                                                    var durl = 'updateDDIP';
                                                    var ddata = {
                                                        "DDIP": $scope.ddpi ? $scope.ddpi : 'N',
                                                        "RiskDisclosure": "Y",
                                                        "ReferenceNumber": $rootScope.formData.eRefNumber,
                                                        "Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
                                                    }
                                                    serverService.apiCall(durl, ddata);
                                                    $scope.DIYUpdateIPVStage('esign');
                                                    return;
                                                }
                                                if (data && !data.IsSuccess && data.ErrorCode == '301') {
                                                    $scope.commonModalErrorMessage = data.ErrorMessage;
                                                    $scope.ModalTrigger('commonModal', true);
                                                    return;
                                                }
                                                if (data && !data.IsSuccess && data.ErrorCode == '300') {
                                                    $scope.commonModalErrorMessage = data.ErrorMessage;
                                                    $scope.ModalTrigger('commonModal', true);
                                                    return;
                                                }
                                                if (data && !data.IsSuccess && (data.ErrorCode == '304' || data.ErrorCode == '305')) {
                                                    sessionStorage.setItem('panNameMismatchEdit', 'Y');
                                                    $scope.commonModalErrorMessage = data.ErrorMessage;
                                                    $scope.ModalTrigger('commonModal', true);
                                                    $(document.getElementById('commonModal')).one('hidden.bs.modal', function () {
                                                        $scope.$apply(function () {
                                                            $scope.getDecUrl();
                                                            $state.go('register');
                                                        });
                                                    });
                                                }
                                                if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
                                                    sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
                                                    frmMain.action = data.eSignApiUrl;
                                                    $('#msg').val(data.requestXml);
                                                    document.getElementById("frmMain").submit();
                                                } else if (data.data) {
                                                    if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
                                                        sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
                                                        frmMain.action = data.data.eSignApiUrl;
                                                        $('#msg').val(data.data.requestXml);
                                                        document.getElementById("frmMain").submit();
                                                    }
                                                }
                                            })
                                        } else {
                                            $scope.updateIPVStage('');
                                        }
                                    } else {
                                        $scope.personalUpdate(process);
                                    }
                                } else {
                                    $scope.commonModalErrorMessage = (optRes && optRes.ErrorMessage) ? optRes.ErrorMessage : 'Problem in saving nominee opt-out declaration';
                                    $scope.ModalTrigger('commonModal', true);
                                }
                            }, function (e) {
                                $rootScope.formData.apiLoading = false;
                                $scope.legacyOptOutInProgress = false;
                                $scope.commonModalErrorMessage = 'Something went wrong. Please try again.';
                                $scope.ModalTrigger('commonModal', true);
                            });
                        }
                });



			}
		}
	}
	
	$scope.allowEsignFunc = function () {
		sessionStorage.clear();
		$rootScope.wizardShow = false;
		$state.go('register');
	}

	var esignpof,
		esignxml;
	$scope.tryAgain = function () {
		$scope.showProgress = false;
		if (esignpof) {
			$interval.cancel(esignpof);
		}
		if (esignxml) {
			$interval.cancel(esignxml);
		}
		setTimeout(function () {
			$scope.generateAOFPdf();
		}, 100)
	}
	$scope.generateAOFPdf = function () {
		var refNo = $rootScope.formData.ReferenceNumber;

		if ($rootScope.vcip) {
			refNo = $rootScope.vcipRef;
		}
		var sentData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
		}
		var gen_url = "GenerateESignPDFNewV2"

		$scope.eStatus = 'Document preparation started. Please wait.';
		$scope.eCount = 'In Progress';
		$rootScope.formData.eProgress = 0;
		var y = 1;
		var progressModal = new bootstrap.Modal(document.getElementById('progressModal'), {
			backdrop: 'static',
			keyboard: true
		})
		progressModal.show()
		$('#formPDF').modal('hide');
		$scope.showProgress = true;
		esignpof = $interval(function () {
			$rootScope.formData.eProgress = Math.round(y * 0.333);
			$(".diy-progressbar .progress-bar").css("width", $rootScope.formData.eProgress + '%');
			y++;
			if ($rootScope.formData.eProgress > 100) {
				$interval.cancel(esignpof);
				$scope.eStatus = 'Document preparation failed.';
				$scope.aofGenError = true;
			}
		}, 1000)
		serverService.apiCall(gen_url, sentData).then(function (a) {
			var response = a.data
			$interval.cancel(esignpof);
			$rootScope.formData.eProgress = 100;
			$scope.eCount = 'Completed';
			if (response.IsSuccess) {
				$scope.eStatus = 'Completed';
				var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + $rootScope.formData.eRefNumber + '&Esign=NSDL';
				$rootScope.formData.apiLoading = false;
				$scope.showProgress = false;
				$rootScope.formData.eProgress = 0;
				$scope.eCount = 'In Progress';
				var i = 1;

				esignxml = $interval(function () {
					$rootScope.formData.eProgress = Math.round(i * 0.333);
					$(".diy-progressbar .progress-bar").css("width", $rootScope.formData.eProgress + '%');
					i++;
					if ($rootScope.formData.eProgress > 100) {
						$interval.cancel(esignxml);
						$scope.eStatus = 'esign process failed.';
						$scope.aofGenError = true;
					}
				}, 1000)
				$scope.showProgress = true;
				$scope.eStatus = 'Document preparation completed. e-sign process started. Please wait';
				serverService.getApi(e_url).then(function (a) {
					var data = a.data;
					$rootScope.formData.eProgress = 100;
					$(".diy-progressbar .progress-bar").css("width", $rootScope.formData.eProgress + '%');
					$scope.eCount = 'Completed';
					if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
						frmMain.action = data.eSignApiUrl;
						$('#msg').val(data.requestXml);
						document.getElementById("frmMain").submit();
					} else if (data.data) {
						if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
							frmMain.action = data.data.eSignApiUrl;
							$('#msg').val(data.data.requestXml);
							document.getElementById("frmMain").submit();
						} else { }

					} else if (!data.IsSuccess) {
						$interval.cancel(esignxml);
						$scope.eStatus = 'e-sign process failed.';
						$scope.aofGenError = true;
					}
				})
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
				$(".diy-progressbar .progress-bar").css("width", $rootScope.formData.eProgress + '%');
				$scope.eStatus = 'Document preparation failed.';
				$scope.aofGenError = true;
			}
		})
	}
	$scope.updateIPVStage = function (process) {
		if ((($rootScope.formData.CKYC == true || sessionStorage.getItem('IsCKYC') == 'true') && $rootScope.formData.KRA == true) || $scope.selfTrue) {
			var s_url = "DIYUpdateIPVStage";
			var sendData = {
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
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

					$state.go('Sip', {
						mobile: $rootScope.formData.EncMobile
					});
					/*setTimeout(function () {
					$('#downloadPOA').modal({
					keyboard: false,
					backdrop: 'static'
					});
					}, 1000)*/

				}
				var url = "SIPModifications"
				var sendData = {
					"ReferenceNumber": $rootScope.formData.eRefNumber,
					"Inprogress": true,
				}
				serverService.apiCall(url, sendData).then(function (data) {
					var response = data.data;
				});

			});
		} else {
			$state.go('ipv');
			// var ipvOtpUrl = 'IPVOTPGenerationNew';
			// $rootScope.formData.apiLoading = true;
			// var ipvData = {
			// ReferenceNumber: $rootScope.formData.ReferenceNumber,
			// Mobile: $rootScope.formData.fields.mobile,
			// BrowserType: $rootScope.formData.browserType
			// };
			// serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
			// $rootScope.formData.apiLoading = false;
			// var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
			// serverService.apiIPVCall(url).then(function (b) {});
			// });
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
			"ReferenceNumber": $rootScope.formData.eRefNumber,
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
				$scope.emailotpSuccess = true;
				$scope.newEmailOTP = false;
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
				$scope.emailotpSuccess = false;
				$scope.invalidEmailOTP = false;
				$scope.limitEmailOTP = true;
				$scope.elimitError = response.ErrorMessage
			}

		});
	}
	$scope.geolocation = function () {

		if (!sessionStorage.getItem('geoCapture')) {
			var s_url = "Validategeolocation";
			//var s_url = "DIYImageUploadS3";
			var sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber,
				latitude: $rootScope.formData.latitude,
				longitude: $rootScope.formData.longitude

			};
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(s_url, sendData).then(function (a) {
				// $scope.docUpldAPI = false;
				$rootScope.formData.apiLoading = false;
				var response = a.data;
				if (response && response.IsSuccess && $rootScope.BYOD) {
					$scope.disableESign = true;
					$scope.locError = false;
				}
				if (response && response.IsSuccess) {
					sessionStorage.setItem('geoCapture', 'true');
				}
				$scope.geolocationErrorMsg = response.ErrorMessage;
			});
		} else {
			if ($rootScope.BYOD) {
				$scope.locError = false;
				$scope.disableESign = true;
			}
		}
	}
	let digipopupcount = 0;
	$scope.displayForm = function () {
		$scope.ddpiError = false;
		if ($rootScope.formData.CKYC && $rootScope.formData.KRA && !$scope.kraUpdateFlag) {
			$scope.addressUpld = false;
		}
		$scope.ibmbDocumentCheck();
		// $scope.getImages();
		var error = 0;
		if (!$rootScope.DifferentlyAbledStatus && !$rootScope.vcip) {
			$state.go('personalDetails');
			return
		}
		if (!$scope.DisabilityVal && $rootScope.vcip) {
			$scope.DisabilityError = true;
			error++;
		} else {
			$scope.DisabilityError = false;
		}
		if (!$scope.cmlImg_reShow && $scope.utmshortcode == "SVCB" && $scope.cmlBankval) {
			$scope.cmlImgError = true;
			error++;
		}
		if ($rootScope.BYOD && $rootScope.digiOption == 'FMF') {
			$scope.vcipDigi = false;
		}
		if ($rootScope.BYOD && !$scope.vcipDigi) {
			$scope.signatureImgError = false;
			$scope.photoImgError = false;
			$scope.cAddressImgError = false;
			$scope.pAddressImgError = false;
			$scope.addressUpld = true;
			$scope.cAddressBackImgError = false;
			if ($rootScope.formData.CKYC && $rootScope.formData.KRA) {
				$scope.addressUpld = false;
			}
			if (!$scope.signatureUpdt) {
				$scope.signatureImgError = true;
				error++;
			}
			if (!$scope.photoImageUpdt) {
				$scope.photoImgError = true;
				error++;
			}
			if (!$scope.cAddressUpdt && $scope.addressUpld && !$rootScope.formData.digiData) {
				$scope.cAddressImgError = true;
				error++;
			}
			if ($scope.paddrUpld && !$scope.pAddressUpdt) {
				$scope.pAddressImgError = true;
				error++;
			}
			if ($rootScope.formData.fields.DocsaddressProof == '111' || $rootScope.formData.fields.DocsaddressProof == '108') {
				if (!$rootScope.formData.digiData && $scope.addressUpld && !$scope.cAddressUpdt2) {
					$scope.cAddressBackImgError = true;
					$("html, body").animate({
						scrollTop: $("#CorrespondenceAddress2").offset().top
					});
					error++;
				}
			}

			if (!$scope.documentChangeNumber && !$scope.byodnumberValidation && !$rootScope.formData.digiData && $scope.addressUpld) {
				$scope.showValidateFields = true;
				$scope.$evalAsync();
				error++;
			}
			/* const dlRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{7,16}$/i; */

			const dlRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{7,16}$/i;
			const voterIdRegex = /^[A-Z]{2,3}\d{7,10}$/i;
			/* const passportRegex = /^[A-Z][0-9]{7}$/i; */
			const passportRegex = /^[A-Z0-9]{8}$/i;
			if ($scope.showValidateFields && $rootScope.formData.fields.DocsaddressProof && !$scope.byodnumberValidation) {
				if (!$scope.documentChangeNumber) {
					$scope.documentnumError = 'Please Enter Document Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '109' && !voterIdRegex.test($scope.documentChangeNumber)) {
					$scope.documentnumError = 'Please Enter Valid Voter ID Number';
					error++;
				} else if (($rootScope.formData.fields.DocsaddressProof == '111' || $rootScope.formData.fields.DocsaddressProof == '1011') && $scope.documentChangeNumber.length < 4) {
					$scope.documentnumError = 'Please Enter Valid Document Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '108' && !passportRegex.test($scope.documentChangeNumber)) {
					$scope.documentnumError = 'Please Enter Valid Passport Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '110') {

					var dlNumber = ($scope.documentChangeNumber || '')
						.toUpperCase()
						.replace(/\s+/g, '');

					if (!dlRegex.test(dlNumber)) {
						$scope.documentnumError = 'Please Enter Valid Driving License Number';
						error++;
					}
				}
				if (($rootScope.formData.fields.DocsaddressProof == '110' || $rootScope.formData.fields.DocsaddressProof == '108') && !$scope.expiryDate) {
					$scope.expiryDateError = 'Please Select Expiry Date';
					error++;
				} else {
					$scope.expiryDateError = '';
					if (!$scope.documentnumError && !$scope.signatureImgError && !$scope.photoImgError && !$scope.cAddressImgError && !$scope.pAddressImgError) {
						error = 0;
					}

				}
			}


			if (error == 0) {
				var durl = 'updateDDIP';
				var ddata = {
					"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
					"RiskDisclosure": "Y",
					"ReferenceNumber": $rootScope.formData.eRefNumber,
					"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
				}
				serverService.apiCall(durl, ddata);

				var url = "DIYDocStageCompletion";
				var sendRequest = {
					"ReferenceNumber": $rootScope.formData.eRefNumber,
					"IsDocStageCompleted": true,
					"CExpiryDate": $scope.expiryDate ? $scope.expiryDate : '',
					"CDocumentNumber": $scope.documentChangeNumber ? $scope.documentChangeNumber : '',
					"PExpiryDate": $scope.pexpiryDate ? $scope.pexpiryDate : '',
					"PDocumentNumber": $scope.pdocumentChangeNumber ? $scope.pdocumentChangeNumber : ''
				}
				serverService.apiCall(url, sendRequest).then(function (a) { });


				// $scope.geolocation();
				sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
				var url = 'DedupeandHRMSValidation?ReferenceNumber=' + sessionStorage.getItem('RxReferenceNumber');
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						// $scope.geolocation();
						sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
						var formPDFModal = new bootstrap.Modal(document.getElementById('formPDF'), {
							backdrop: 'static',
							keyboard: true
						});
						formPDFModal.show();
						if ($scope.loadPdf) {
							if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if ($rootScope.uBank) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/UtrakshIndex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							}
						} else {
							if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							}
						}
					}
					else {
						$scope.NRMModalErrorMessage = response.SuccessMessage;
						var HRMModal = new bootstrap.Modal(document.getElementById('HRM'), {
							backdrop: 'static',
							keyboard: true
						});
						HRMModal.show();
					}
				});
			}

		}
		else if ($scope.vcipDigi && $rootScope.digiOption != "FMF") {
			if (digipopupcount == 0) {
				if (!sessionStorage.getItem('digisuc') && !sessionStorage.getItem('digisTok')) {
					var digilocker = new bootstrap.Modal(document.getElementById('digilocker'), {
						backdrop: 'static',
						keyboard: false
					});
					digilocker.show();
				}

				digipopupcount++;
			}
			return;

		}
		else if ($rootScope.vcip && !$rootScope.formData.docStageRejected && $scope.vcipOTP) {
			var durl = 'updateDDIP';
			var ddata = {
				"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
				"RiskDisclosure": "Y",
				"ReferenceNumber": $rootScope.formData.eRefNumber,
				"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
			}
			serverService.apiCall(durl, ddata);
			// $scope.updateIPVStage();
			if (!$scope.signatureUpdt) {
				$scope.signatureImgError = true;
				$("html, body").animate({
					scrollTop: $("#SPECIMENPROOF").offset().top
				});
				error++;
			} else if (!$rootScope.esignCompleted) {
				var url = 'DedupeandHRMSValidation?ReferenceNumber=' + sessionStorage.getItem('RxReferenceNumber');
				serverService.getApi(url).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						// $scope.geolocation();
						sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
						var formPDFModal = new bootstrap.Modal(document.getElementById('formPDF'), {
							backdrop: 'static',
							keyboard: true
						});
						formPDFModal.show();
						if ($scope.loadPdf) {
							if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if ($rootScope.uBank) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/UtrakshIndex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							}
						} else {
							if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							} else {
								$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
							}
						}
					}
					else {
						$scope.NRMModalErrorMessage = response.SuccessMessage;
						var HRMModal = new bootstrap.Modal(document.getElementById('HRM'), {
							backdrop: 'static',
							keyboard: true
						});
						HRMModal.show();
					}
				});
			} else if (!$rootScope.SipStockCompleted) {
				$state.go('Sip');
			} else {
				signature = '';
				$rootScope.formData = {};
				$rootScope.formData.fields = {};
				$window.sessionStorage.clear();
				$state.go('complete');
			}
		} else {
			// if (!$scope.docImgCompleted) {

			const dlRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{7,16}$/i;
			const voterIdRegex = /^[A-Z]{2,3}\d{7,10}$/i;
			/* const passportRegex = /^[A-Z][0-9]{7}$/i; */
			const passportRegex = /^[A-Z0-9]{8}$/i;
			if ($scope.showValidateFields && $rootScope.formData.fields.DocsaddressProof) {
				if (!$scope.documentChangeNumber) {
					$scope.documentnumError = 'Please Enter Document Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '109' && !voterIdRegex.test($scope.documentChangeNumber)) {
					$scope.documentnumError = 'Please Enter Valid Voter ID Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '111' && $scope.documentChangeNumber.length < 4) {
					$scope.documentnumError = 'Please Enter Valid Document Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '108' && !passportRegex.test($scope.documentChangeNumber)) {
					$scope.documentnumError = 'Please Enter Valid Passport Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '110') {

					var dlNumber = ($scope.documentChangeNumber || '')
						.toUpperCase()
						.replace(/\s+/g, '');

					if (!dlRegex.test(dlNumber)) {
						$scope.documentnumError = 'Please Enter Valid Driving License Number';
						error++;
					}
				}
				if (($rootScope.formData.fields.DocsaddressProof == '110' || $rootScope.formData.fields.DocsaddressProof == '108') && !$scope.expiryDate) {
					$scope.expiryDateError = 'Please Select Expiry Date';
					error++;
				} else {
					$scope.expiryDateError = '';
					if (!$scope.documentnumError) {
						error = 0;
					}
				}
			}

			if (!$scope.signatureUpdt && (!$scope.ibDocumentHide || $scope.ibCkycDocumentShow)) {
				$scope.signatureImgError = true;
				$("html, body").animate({
					scrollTop: $("#SPECIMENPROOF").offset().top
				});
				error++;
			}
			// if ($scope.panUpld && !$scope.panImageUpdt) {
			// 	$scope.panImgError = true;
			// 	$("html, body").animate({
			// 		scrollTop: $("#PANNumber").offset().top
			// 	});
			// 	error++;
			// }
			if ($scope.clientPhoqqualityError || ($scope.photoUpld && !$scope.photoImageUpdt && (!$scope.ibDocumentHide || $scope.ibCkycDocumentShow))) {
				$scope.photoImgError = true;
				$("html, body").animate({
					scrollTop: $("#clientImageSelfie").offset().top
				});
				error++;
			}
			if (!$rootScope.webfinacle) {
				if ($scope.chequeUpld && !$scope.bankUpdt && !$rootScope.formData.CKYC) {
					$scope.bankImgError = true;
					$("html, body").animate({
						scrollTop: $("#BankCheque").offset().top
					});
					error++;
				}
			}
			if ($scope.addressUpld && !$scope.cAddressUpdt && (!$scope.ibDocumentHide || $rootScope.IsCorrespondenceSikkim == 'Y')) {
				$scope.cAddressImgError = true;
				$("html, body").animate({
					scrollTop: $("#CorrespondenceAddress").offset().top
				});
				error++;
			}
			if ($rootScope.formData.fields.DocsaddressProof == '111' || $rootScope.formData.fields.DocsaddressProof == '108') {

				if (!$rootScope.formData.digiData && $scope.addressUpld && !$scope.cAddressUpdt2 && !$scope.ibDocumentHide && !$rootScope.vcip) {
					$scope.cAddressBackImgError = true;
					$("html, body").animate({
						scrollTop: $("#CorrespondenceAddress2").offset().top
					});
					error++;
				}
			}
			if ($scope.addressUpld && $scope.paddrUpld && !$scope.pAddressUpdt && (!$scope.ibDocumentHide || $rootScope.IsPermanentSikkim == 'Y')) {
				$scope.pAddressImgError = true;
				$("html, body").animate({
					scrollTop: $("#PermenantAddress").offset().top
				});
				error++;
			}

			if (($scope.addressUpld && $scope.paddrUpld && (!$scope.ibDocumentHide || $rootScope.IsPermanentSikkim == 'Y')) && $rootScope.formData.fields.pDocsaddressProof) {
				if (!$scope.pdocumentChangeNumber) {
					$scope.pdocumentnumError = 'Please Enter Document Number';
					error++;
				} else if ($rootScope.formData.fields.pDocsaddressProof == '109' && !voterIdRegex.test($scope.pdocumentChangeNumber)) {
					$scope.pdocumentnumError = 'Please Enter Valid Voter ID Number';
					error++;
				} else if ($rootScope.formData.fields.pDocsaddressProof == '111' && $scope.pdocumentChangeNumber.length < 4) {
					$scope.pdocumentnumError = 'Please Enter Valid Document Number';
					error++;
				} else if ($rootScope.formData.fields.pDocsaddressProof == '108' && !passportRegex.test($scope.pdocumentChangeNumber)) {
					$scope.pdocumentnumError = 'Please Enter Valid Passport Number';
					error++;
				} else if ($rootScope.formData.fields.DocsaddressProof == '110') {

					var dlNumber = ($scope.documentChangeNumber || '')
						.toUpperCase()
						.replace(/\s+/g, '');

					if (!dlRegex.test(dlNumber)) {
						$scope.documentnumError = 'Please Enter Valid Driving License Number';
						error++;
					}
				}
				if (($rootScope.formData.fields.pDocsaddressProof == '110' || $rootScope.formData.fields.pDocsaddressProof == '108') && !$scope.pexpiryDate) {
					$scope.pexpiryDateError = 'Please Select Expiry Date';
					error++;
				} else {
					$scope.pexpiryDateError = '';
					if (!$scope.pdocumentnumError && !$scope.documentnumError && !$scope.expiryDateError) {
						error = 0;
					}
				}
			}


			if ($rootScope.formData.fields.DocsaddressProof == '111' || $rootScope.formData.fields.DocsaddressProof == '108') {
				if ($scope.addressUpld && $scope.paddrUpld && !$scope.pAddressUpdt2 && !$scope.ibDocumentHide && !$rootScope.vcip) {
					$scope.pAddressBackImgError = true;
					$("html, body").animate({
						scrollTop: $("#PermenantAddress2").offset().top
					});
					error++;
				}
			}
			if ($scope.foImgUpld && !$scope.foUpdt) {
				$scope.foImgError = true;
				$("html, body").animate({
					scrollTop: $("#Income").offset().top
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
			if (!$scope.cmlImg_reShow && $scope.utmshortcode == "SVCB" && $scope.cmlBankval) {
				$scope.cmlImgError = true;
				error++;
			}
			const AgreeTC = $('#agree-terms').is(':checked');
			if (!AgreeTC) {
				$scope.termsError = true;
				error++;
			}
			if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
				$scope.ddpiError = true;
				error++;
			}
			if (!$rootScope.formData.IsEmailVerified) {
				$state.go('personalDetails');
			}
			// }

			if (error == 0) {
				if (!$rootScope.formData.RMModule && !$scope.preview7) {
					$scope.preview7 = true;
					var previewPdfmodal = new bootstrap.Modal(document.getElementById('previewPdf'), {
						backdrop: 'static',
						keyboard: false
					});
					previewPdfmodal.show();
					return
				}
				if ($rootScope.formData.RMModule) {
					var s_url = "DIYRMSendSmsToUser";
					var sendData = {
						"ReferenceNumber": $rootScope.formData.ReferenceNumber,
					}
					$rootScope.formData.apiLoading = true;
					serverService.apiCall(s_url, sendData).then(function (a) {
						var response = a.data
						$rootScope.formData.apiLoading = false;
					})
				}
				var durl = 'updateDDIP';
				var ddata = {
					"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
					"RiskDisclosure": "Y",
					"ReferenceNumber": $rootScope.formData.eRefNumber,
					"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
				}
				serverService.apiCall(durl, ddata);

				var url = "DIYDocStageCompletion";
				var sendRequest = {
					"ReferenceNumber": $rootScope.formData.eRefNumber,
					"IsDocStageCompleted": true,
					"CExpiryDate": $scope.expiryDate ? $scope.expiryDate : '',
					"CDocumentNumber": $scope.documentChangeNumber ? $scope.documentChangeNumber : '',
					"PExpiryDate": $scope.pexpiryDate ? $scope.pexpiryDate : '',
					"PDocumentNumber": $scope.pdocumentChangeNumber ? $scope.pdocumentChangeNumber : ''
				}
				serverService.apiCall(url, sendRequest).then(function (a) { });
				$rootScope.formData.apiLoading = false;
				if ($rootScope.formData.RMModule) {
					var proceedConfirmRMModal = new bootstrap.Modal(document.getElementById('proceedConfirmRM'), {
						backdrop: 'static',
						keyboard: false
					});
					proceedConfirmRMModal.show();
				} else {
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
					if ($scope.ipvStage || $rootScope.esignCompleted) {
						if ($scope.selfTrue) {
							$scope.updateIPVStage();
						} else {
							$state.go('ipv');
							// var ipvOtpUrl = 'IPVOTPGenerationNew';
							// $rootScope.formData.apiLoading = true;
							// var ipvData = {
							// ReferenceNumber: $rootScope.formData.ReferenceNumber,
							// Mobile: $rootScope.formData.fields.mobile,
							// BrowserType: $rootScope.formData.browserType
							// };
							// serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
							// $rootScope.formData.apiLoading = false;
							// var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
							// serverService.apiIPVCall(url).then(function (a) {});
							// });
						}
					} else {

						const AgreeTC = $('#agree-terms').is(':checked');
						if (!AgreeTC) {
							$scope.termsError = true;
							return false;
						}

						if ($scope.ddpi != 'Y' && $scope.DDpiErr) {
							$scope.ddpiError = true;
							return false;
						}
						var url = 'DedupeandHRMSValidation?ReferenceNumber=' + sessionStorage.getItem('RxReferenceNumber');
						serverService.getApi(url).then(function (a) {
							var response = a.data;
							$rootScope.formData.apiLoading = false;
							if (response.IsSuccess) {
								// $scope.geolocation();
								sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
								var formPDFModal = new bootstrap.Modal(document.getElementById('formPDF'), {
									backdrop: 'static',
									keyboard: true
								});
								formPDFModal.show();
								if ($scope.loadPdf) {
									if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else if ($rootScope.uBank) {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/UtrakshIndex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									}
								} else {
									if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									} else {
										$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
									}
								}
							}
							else {
								$scope.NRMModalErrorMessage = response.SuccessMessage;
								var HRMModal = new bootstrap.Modal(document.getElementById('HRM'), {
									backdrop: 'static',
									keyboard: true
								});
								HRMModal.show();
							}
						});
					}

				}
			}

		}
	}
	// $scope.popExtractFatherPdf = function(){
	// 	previewFatherErrorMessage.hide();
	// }
	// $scope.closepopupfsname= function(){
	// 	if ($rootScope.formData.RMModule) {
	// 		var durl = 'updateDDIP';
	// 	var ddata = {
	// 		"DDIP": $scope.ddpi,
	// 		"ReferenceNumber": $rootScope.formData.ReferenceNumber
	// 	}
	// 	serverService.apiCall(durl, ddata);

	// 	var url = "DIYDocStageCompletion";
	// 	var sendRequest = {
	// 		"ReferenceNumber": $rootScope.formData.ReferenceNumber,
	// 		"IsDocStageCompleted": true
	// 	}
	// 	serverService.apiCall(url, sendRequest).then(function (a) {});
	// 	$rootScope.formData.apiLoading = false;
	// 	if ($rootScope.formData.RMModule) {
	// 		var proceedConfirmRMModal = new bootstrap.Modal(document.getElementById('proceedConfirmRM'), {
	// 				backdrop: 'static',
	// 				keyboard: false
	// 			});
	// 		proceedConfirmRMModal.show();
	// 	} else {
	// 		if ($scope.lastStage) {
	// 			$state.go('complete', {
	// 				mobile: $rootScope.formData.EncMobile
	// 			});
	// 		}
	// 		if ($rootScope.formData.ckyClient) {
	// 			$scope.signatureButtons = true;
	// 		}
	// 		if ($scope.ckycKRA) {
	// 			$scope.getOTP();
	// 		}
	// 		if ($scope.ipvStage || $rootScope.esignCompleted) {
	// 			if ($scope.selfTrue) {
	// 				$scope.updateIPVStage();
	// 			} else {
	// 				var ipvOtpUrl = 'IPVOTPGenerationNew';
	// 				$rootScope.formData.apiLoading = true;
	// 				var ipvData = {
	// 					ReferenceNumber: $rootScope.formData.ReferenceNumber,
	// 					Mobile: $rootScope.formData.fields.mobile,
	// 					BrowserType: $rootScope.formData.browserType
	// 				};
	// 				serverService.apiCall(ipvOtpUrl, ipvData).then(function (a) {
	// 					$rootScope.formData.apiLoading = false;
	// 					var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
	// 					serverService.apiIPVCall(url).then(function (a) {});
	// 				});
	// 			}
	// 		} else {

	// 			const AgreeTC = $('#agree-terms').is(':checked');
	// 			if (!AgreeTC) {
	// 				$scope.termsError = true;
	// 				return false;
	// 			}

	// 			if ($scope.ddpi != 'Y') {
	// 				$scope.ddpiError = true;
	// 				return false;
	// 			}
	// 			var formPDFModal = new bootstrap.Modal(document.getElementById('formPDF'), {
	// 					backdrop: 'static',
	// 					keyboard: true
	// 				});
	// 			formPDFModal.show();
	// 			if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
	// 				$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
	// 			} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
	// 				$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
	// 			} else {
	// 				$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
	// 			}
	// 		}

	// 	}
	// 	}else{
	// 	previewPdfModal.show();
	// 	}
	// }
	if (sessionStorage.getItem('EsginBYOD') == 'true') {
		$scope.getToken();
	}
	$scope.ContiueWithOutPan = function () {
		var url = "FathernameUpdate";
		var sendRequest = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber,
			"FatherName": $rootScope.fsName,
			"FatherNamefromIdfy": $rootScope.FatherNamefromIdfy,
			"continuewithoutupdate": "Y",
			"UpdateandReplace": "N"
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendRequest).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var response = a.data
			if (response.IsSuccess) {
				// if ($scope.ipvStage) {
				// 	$scope.ipvStage = false;
				// }
				// var s_url = "DIYImageUpload";

				// if ($scope.optimize) {

				// 		s_url = "DIYImageUploadOptimize";

				// }
				// var refNo = $rootScope.formData.ReferenceNumber;
				// if ($rootScope.vcip) {
				// 	refNo = $rootScope.formData.ReferenceNumber;
				// }
				// $scope.docUpldAPI = true;
				// if ($rootScope.vcip) {
				// 	refNo = $rootScope.formData.ReferenceNumber;
				// }
				// if ($scope.selfTrue) {
				// 	$scope.IsSelfi = 'Y';
				// } else {
				// 	$scope.IsSelfi = 'N';
				// }
				// 	var sendData = {	
				// 		ImageName: $scope.imgPanName,
				// 		Image: $scope.PanimgValue,
				// 		DocumentType: $scope.PandocId,
				// 		ReferenceNumber: $rootScope.formData.ReferenceNumber,
				// 		Extention: $scope.PanFileType,
				// 		IsDiy: true,
				// 		IsIPV: "0",
				// 		EncryptToken: $rootScope.EncryptToken,
				// 		IsSelfi: $scope.IsSelfi,
				// 		Latitude: $rootScope.formData.latitude,
				// 		Longitude: $rootScope.formData.longitude,
				// 	};
				// $rootScope.formData.apiLoading = true;
				// serverService.apiCall(s_url, sendData).then(function (a) {
				// 	var response = a.data;
				// $rootScope.formData.apiLoading = false;
				// 	$scope.docUpldAPI = false;
				// 	if (response.IsSuccess) {

				// 		//$scope.showView = true;
				// 		if ($scope.imgPanName == "PANNumber") {
				// 			$scope.panImageUpdt = true;
				// 			$scope.panLoad = false;
				// 			$scope.panImgError = false;
				// 			$scope.pantypeError = false;
				// 			$scope.panImageValidation = true;
				// 		}
				// 		$scope.getImages();
				// 	} else {
				// 		if ($scope.imgPanName == "PANNumber") {
				// 			$('#PANNumber').val('');
				// 			$('#panPhoto .file-input').empty();
				// 			$scope.panCNImgError = true;
				// 		}
				// 		$scope.getImages();
				// 	}
				// });
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
		})
	}
	$scope.popfathernamePan = function () {
		var url = "FathernameUpdate";
		var sendRequest = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber,
			"FatherName": $rootScope.fsName,
			"FatherNamefromIdfy": $rootScope.FatherNamefromIdfy,
			"continuewithoutupdate": "N",
			"UpdateandReplace": "Y"
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendRequest).then(function (a) {
			$rootScope.formData.apiLoading = false;
			var response = a.data
			if (response.IsSuccess) {

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
		})
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
		var otpSection = new bootstrap.Modal(document.getElementById('otpSection'), {
			backdrop: 'static',
			keyboard: false
		});
		otpSection.show();
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
				$scope.otpSuccess = true;
				$('#otpSection').modal('hide');
				$scope.updateIPVStage('');
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
				$scope.otpSuccess = false;
				$scope.invalidOTP = true;
			}

		});
	}

	$scope.getOTP = function () {
		var url = "CheckISKRAMobileNumMatch";
		var sendData = {
			"ReferenceNumber": $rootScope.formData.eRefNumber,
			"EncryptToken": $rootScope.EncryptToken,
			"IsDiy": true
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data
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
	$scope.cacheimg = function () {
		$('#PANNumber').val('');
	}
	$scope.rmproceedStatus = function () {
		var RmproceedStatuspopup = new bootstrap.Modal(document.getElementById('RmproceedStatus'), {

			backdrop: 'static',
			keyboard: true
		});

		RmproceedStatuspopup.show();
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
					var customerSMSpopup = new bootstrap.Modal(document.getElementById('customerSMS'), {
						backdrop: 'static',
						keyboard: false
					});
					customerSMSpopup.show();
				}
				$("#responseSms").show();
				// $("#responseSms").delay(1000).fadeOut(5000);
				setTimeout(function () {
					$("#responseSms").hide();
				}, 5000);
				$rootScope.apiResponseErrorMsg = "URL has been sent to Client’s registered details. Kindly ask Customer to proceed with journey completion.";
			});
		} else {
			var smsUrl = "DocumentUrlSend";
			var sendData = {
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
			};
			$rootScope.formData.apiLoading = true;
			serverService.apiCall(smsUrl, sendData).then(function (a) {
				$rootScope.formData.apiLoading = false;
				var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
					backdrop: 'static',
					keyboard: false
				});
				APIResponseModal.show();
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
		var documentUploadtermspopup = new bootstrap.Modal(document.getElementById('documentUploadterms'), {
			backdrop: 'static',
			keyboard: true
		});
		documentUploadtermspopup.show();
	}

	$scope.selfImgUpld = function () {
		$scope.docUpldMsg = 'Selfie Upload in progress';
		$('#cammodal').modal('hide');
		cammodalModal.hide();
		$scope.updateImage('ClientPhoto', $('#photo').attr('src'), 'Image', '');
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
	if ($rootScope.formData.isMobile || !$rootScope.formData.isMobile) {

		/*navigator.mediaDevices.getUserMedia({
		video: true,
		audio: false
		})
		.then(function (stream) {
		})
		.catch(function (err) {
		$scope.cameraDisabled = true;
		});*/

		// 	setTimeout(function () {
		// 		$(".clientPhoto .input-upload").fileinput({
		// 			'showUpload': false,
		// 			'browseLabel': 'TAKE SELFIE',
		// 			'browseIcon': '',
		// 			'previewFileType': 'any'
		// 		});
		// 	}, 10)

		// } else {
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
			} else if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			} else { }
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
			} else if (!response.IsSuccess && response.ErrorCode == '-1') {
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.panStatus1 = response.ErrorMessage;
				var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
					backdrop: 'static',
					keyboard: false
				});
				paninformation.show();
				return
			} else { }
		});
	}
	$scope.sentPdfAofPoa = function () {
		url = "SendEmailAOFPDF"
		var sendData = {
			"ReferenceNumber": $rootScope.formData.ReferenceNumber
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			// $("#sentPdfDialog").modal()
			if (response.IsSuccess) {
				$scope.sentPdfSuccess = true;
				$("#sentPdfMsg").show();
				// $("#responseSms").delay(1000).fadeOut(5000);
				setTimeout(function () {
					$("#sentPdfMsg").hide();
				}, 5000);
				$scope.sentPdfSuccessMsg = response.SuccessMessage;
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
				$scope.sentPdfFailure = true;
				$scope.sentPdfFailureMsg = response.ErrorMessage;
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
		$("#RmproceedStatus").modal('hide');
		var url = 'DedupeandHRMSValidation?ReferenceNumber=' + sessionStorage.getItem('RxReferenceNumber');
		serverService.getApi(url).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				// $scope.geolocation();
				sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
				var formPDFModal = new bootstrap.Modal(document.getElementById('formPDF'), {
					backdrop: 'static',
					keyboard: true
				});
				formPDFModal.show();
				if ($scope.loadPdf) {
					if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_IndexNewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else if ($rootScope.uBank) {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/UtrakshIndex.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/indexnewV2.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					}
				} else {
					if (sessionStorage.getItem('sarasbank') && sessionStorage.getItem('sarasbank') == 'true') {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Saraswat_Bank_EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else if (sessionStorage.getItem('JanaBank') == "true" || $rootScope.janabank || $rootScope.webJana || $scope.JanaFlagPdf) {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/Janaindexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					} else {
						$rootScope.objURl = serverService.pdfdiyUrl() + "AxisPDF/EsignIndexv1.html?ReferenceNumber=" + $rootScope.formData.eRefNumber + '&token=' + $rootScope.token;
					}
				}
			}
			else {
				$scope.NRMModalErrorMessage = response.SuccessMessage;
				var HRMModal = new bootstrap.Modal(document.getElementById('HRM'), {
					backdrop: 'static',
					keyboard: true
				});
				HRMModal.show();
			}
		});
	}

	$scope.ddpiFn = function () {
		// if ($("#ddpi").is(':checked')) {
		// 	$scope.ddpi = 'Y';
		// 	$scope.ddpiError = false;
		// } else {
		// 	$scope.ddpi = 'N';
		$scope.ddpiModal();
		// }
	}

	$scope.ddpiModal = function () {
		var ddpiModalpopup = new bootstrap.Modal(document.getElementById('ddpiModal'), {
			backdrop: 'static',
			keyboard: false
		});
		ddpiModalpopup.show();
	}

	$scope.ddpiAccept = function () {
		setTimeout(function () {
			$('#ddpi').prop('checked', true);
		}, 50);
		$scope.ddpi = 'Y';
		$scope.ddpiError = false;
	}
	$scope.ddpiCancel = function () {
		setTimeout(function () {
			$('#ddpi').prop('checked', false);
			$('#InternetTrading').prop('checked', false);
		}, 50);
		$scope.ddpi = 'N';
		$rootScope.formData.fields.InternetTrading = "N";
		$scope.termsOpen = false;
	}
	$scope.internetTrading = function () {
		if ($("#InternetTrading").is(':checked')) {
			$rootScope.formData.fields.InternetTrading = "Y";
			$scope.profileBTerms();
		} else {
			$rootScope.formData.fields.InternetTrading = "N";
			$scope.profileBTerms1();
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
			$('#ddpi').prop('checked', true);
		}, 50)
		setTimeout(function () {
			$scope.termsOpen = false;
		}, 150)
		$rootScope.formData.fields.InternetTrading = "Y";
		$scope.ddpi = 'Y';
	}
	$scope.emarginCancel = function () {
		setTimeout(function () {
			$('#InternetTrading').prop('checked', false);
		}, 50)
		$rootScope.formData.fields.InternetTrading = "N";
		$scope.termsOpen = false;
	}

	$scope.removeClientPhoto = function () {
		var s_url = "Removeclientphoto";
		var sendData = {
			ReferenceNumber: $rootScope.formData.eRefNumber,
			ImageName: "ClientPhoto"
		}
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (d) {
			$rootScope.formData.apiLoading = false;
			var response = d.data;
			if (response.IsSuccess) {
				$scope.photoImageUpdt = false;
				$scope.photoImg_reShow = false;
				$scope.clientViewHide = false;
				$scope.photoView = false;
				$('#clientImage').html('');
				$rootScope.formData.photoImage = '';
				$rootScope.formData.photoUrl = '';
				$scope.selfTrue = false;
				$scope.docImgCompleted = false;
				$rootScope.formData.docStageCompleted = false;
				$scope.photoProofImageValidation = false;
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
		})
	}

	$scope.ModalTrigger = function (id, show) {
		var modal = new bootstrap.Modal(document.getElementById(id), {
			backdrop: 'static',
			keyboard: false
		});
		if (show) {
			if (!$(`#${id}`).hasClass('show')) {
				modal.show();
			}
		} else {
			modal.hide();
		}
		if (id === 'personal-details' && $scope.NomineeError) {
			$(document.body).addClass('select-2-body');
		}
	}

	$scope.ibmbDocumentCheck = function () {
		if ($rootScope.webfinacle && $rootScope.formData.CKYC && !$rootScope.formData.KRA && $scope.digilockerFlag == "N") {
			$rootScope.ibDocumentHide = false;
			$scope.$evalAsync();
		}
	}

	setTimeout(function () {
		$scope.ibmbDocumentCheck();
	}, 3000)

	$scope.changeInput = function (value, type) {
		if (type == 'C') {
			$scope.documentChangeNumber = value;
			$scope.documentnumError = '';
		} else {
			$scope.pdocumentChangeNumber = value;
			$scope.pdocumentnumError = '';
		}
	}

	$scope.getChangeID = function (docType, type, num, date) {
		if (type == 'C') {
			if (docType) {
				if (docType == '109') {
					$scope.documentMaxlength = 10;
				} else if (docType == '108') {
					$scope.documentMaxlength = 8;
				} else if (docType == '110') {
					$scope.documentMaxlength = 16;
				}
				if (docType == '110' || docType == '108') {
					setTimeout(function () {
						$("#expiryDate").datepicker({
							changeMonth: true,
							changeYear: true,
							minDate: 1,
							dateFormat: 'dd/mm/yy',
							onSelect: function (value) {
								if (value) {
									$scope.expiryDate = value;
									$scope.expiryDateError = '';
								}
								$('#expiryDate').removeClass('ng-empty');
								$('#expiryDate').addClass('ng-not-empty');
								$scope.$applyAsync();
							}
						});
						$("#expiryDate").datepicker("option", "showAnim", "blind");
					}, 100);

				}
				// setTimeout( function() {
				setTimeout(function () {
					$rootScope.formData.fields.DocsaddressProof = docType;
					$scope.$evalAsync();
				}, 100);
				$scope.documentChangeNumber = num;
				$scope.expiryDate = date;
				if ($rootScope.BYOD && !$scope.documentChangeNumber) {
					$scope.showValidateFields = true;
				}
				$scope.$evalAsync();
				// }, 700);
			}
		} else {
			if (docType) {
				if (docType == '109') {
					$scope.pdocumentMaxlength = 10;
				} else if (docType == '108') {
					$scope.pdocumentMaxlength = 8;
				} else if (docType == '110') {
					$scope.pdocumentMaxlength = 16;
				}
				if (docType == '110' || docType == '108') {
					setTimeout(function () {
						$("#pexpiryDate").datepicker({
							changeMonth: true,
							changeYear: true,
							minDate: 1,
							dateFormat: 'dd/mm/yy',
							onSelect: function (value) {
								$('#pexpiryDate').removeClass('ng-empty');
								$('#pexpiryDate').addClass('ng-not-empty');
								if (value) {
									$scope.pexpiryDate = value;
									$scope.pexpiryDateError = '';
								}
								$scope.$applyAsync();
							}
						});

						$("#pexpiryDate").datepicker("option", "showAnim", "blind");
					}, 100);

				}
				// setTimeout( function() {
				$scope.pdocumentChangeNumber = num;
				$scope.pexpiryDate = date;
				$scope.$evalAsync();
				// }, 700);
			}
		}
	}

	$scope.returntoNominee = function () {
		$state.go('personalDetails');
	}
	$scope.getPersonalInfo = function (res) {
		var response = res;
		if (response.IsSuccess && response.ObjCDIYClientOtherInfo.FatherNameFirstName) {

			if (response.ObjCDIYClientOtherInfo.Mobile) {
				$rootScope.formData.fields.mobile = response.ObjCDIYClientOtherInfo.Mobile;
				sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
			}
			if (response.ObjCDIYClientOtherInfo.Email) {
				$rootScope.formData.fields.email = response.ObjCDIYClientOtherInfo.Email
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

		}

	}

	$scope.personalUpdate = function (process = 'esign') {
		if (sessionStorage.getItem('changeMobile')) {
			$scope.emptyMobile = true;
			$scope.mobileErrorMessage = 'Please Validate Mobile and Continue the Journey';
			return;
		} else if (sessionStorage.getItem('changeEmail')) {
			$scope.emptyEmail = true;
			$scope.emailErrorMessage = 'Please Validate Email and Continue the Journey';
			return;
		}
		$scope.emptyMobile = false;
		$scope.mobileErrorMessage = '';
		$scope.emptyEmail = false;
		$scope.emailErrorMessage = '';
		var url = "BYODClientOtherInfo";
		var sendData = {
			ObjCDIYClientOtherInfo: {
				ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : sessionStorage.getItem('AxNo'),
				Email: $rootScope.formData.fields.email,
				Mobile: $rootScope.formData.fields.mobile,
				ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs,
				Mobilebelongsto: $rootScope.formData.fields.mobileBelongs,
				PANNumber: $rootScope.formData.fields.panNumber,

			}
		};
		$rootScope.formData.apiLoading = true;
		sendData = $rootScope.encryptReq(sendData);
		serverService.apiCall(url, sendData).then(function (a) {
			$rootScope.formData.applicationDisabled = false
			$rootScope.formData.apiLoading = false;
			var response = $rootScope.decryptRes(a.data, 'Response');
			if (response.IsSuccess) {
				$('#personal-details').modal('hide');
				$(document.body).removeClass('select-2-body')
				if (process == 'esign') {
					var refNo = $rootScope.formData.eRefNumber;
					var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
					$rootScope.formData.apiLoading = true;

					serverService.getApi(e_url).then(function (a) {
						var data = a.data;
						$rootScope.formData.apiLoading = false;
						if (data && !data.IsSuccess && data.ErrorCode == '303') {
							var durl = 'updateDDIP';
							var ddata = {
								"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
								"RiskDisclosure": "Y",
								"ReferenceNumber": $rootScope.formData.eRefNumber,
								"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
							}
							serverService.apiCall(durl, ddata);
							$scope.personalUpdate();
							return;
						}

						if (data && !data.IsSuccess && data.ErrorCode == '301') {
							$scope.commonModalErrorMessage = data.ErrorMessage;
							$scope.ModalTrigger('commonModal', true);
							return;
						}
						if (data && !data.IsSuccess && data.ErrorCode == '300') {
							$scope.commonModalErrorMessage = data.ErrorMessage;
							$scope.ModalTrigger('commonModal', true);
							return;
						}
						if (data && !data.IsSuccess && (data.ErrorCode == '304' || data.ErrorCode == '305')) {
							sessionStorage.setItem('panNameMismatchEdit', 'Y');
							$scope.commonModalErrorMessage = data.ErrorMessage;
							$scope.ModalTrigger('commonModal', true);
							$(document.getElementById('commonModal')).one('hidden.bs.modal', function () {
								$scope.$apply(function () {
									$scope.getDecUrl();
									$state.go('register');
								});
							});
						}


						if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
							sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
							frmMain.action = data.eSignApiUrl;
							$('#msg').val(data.requestXml);
							document.getElementById("frmMain").submit();
						} else if (data.data) {
							if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
								sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
								frmMain.action = data.data.eSignApiUrl;
								$('#msg').val(data.data.requestXml);
								document.getElementById("frmMain").submit();
							} else { }

						} else { }
					})



				} else {
					$scope.updateIPVStage('');
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
			} else {
				$rootScope.formData.apiLoading = false;
				if (response.IsEmail) {
					$scope.panEmailRegError = true;
					$scope.panEmailRegMsg = response.ErrorMessage;
					$scope.changeEmailId = true;
					$('#formPDF').modal('hide');
					if (!$('#personal-details').hasClass('show')) {
						$scope.ModalTrigger('personal-details', true);

					}
				} else if (response.IsMobile) {
					$scope.panMobileRegError = true;
					$scope.panMobileRegMsg = response.ErrorMessage;
					$scope.changeMobileNum = true;
					if (!$('#personal-details').hasClass('show')) {
						$scope.ModalTrigger('personal-details', true);

					}
				} else {
					$('#personal-details').modal('hide');
					$(document.body).removeClass('select-2-body')
					if (process == 'esign') {
						var refNo = $rootScope.formData.eRefNumber;
						var e_url = 'GenerateESignPDFNewV1?ReferenceNumber=' + refNo + '&Esign=NSDL';
						$rootScope.formData.apiLoading = true;

						serverService.getApi(e_url).then(function (a) {
							var data = a.data;
							$rootScope.formData.apiLoading = false;
							if (data && !data.IsSuccess && data.ErrorCode == '303') {
								var durl = 'updateDDIP';
								var ddata = {
									"DDIP": $scope.ddpi ? $scope.ddpi : 'N',
									"RiskDisclosure": "Y",
									"ReferenceNumber": $rootScope.formData.eRefNumber,
									"Emargin": $rootScope.formData.fields.InternetTrading ? $rootScope.formData.fields.InternetTrading : 'N',
								}
								serverService.apiCall(durl, ddata);
								$scope.personalUpdate();
								return;
							}


							if (data && !data.IsSuccess && data.ErrorCode == '301') {
								$scope.commonModalErrorMessage = data.ErrorMessage;
								$scope.ModalTrigger('commonModal', true);
								return;
							}
							if (data && !data.IsSuccess && data.ErrorCode == '300') {
								$scope.commonModalErrorMessage = data.ErrorMessage;
								$scope.ModalTrigger('commonModal', true);
								return;
							}
							if (data && !data.IsSuccess && (data.ErrorCode == '304' || data.ErrorCode == '305')) {
								sessionStorage.setItem('panNameMismatchEdit', 'Y');
								$scope.commonModalErrorMessage = data.ErrorMessage;
								$scope.ModalTrigger('commonModal', true);
								$(document.getElementById('commonModal')).one('hidden.bs.modal', function () {
									$scope.$apply(function () {
										$scope.getDecUrl();
										$state.go('register');
									});
								});
							}


							if (data.IsSuccess && data.eSignApiUrl && data.requestXml) {
								sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
								frmMain.action = data.eSignApiUrl;
								$('#msg').val(data.requestXml);
								document.getElementById("frmMain").submit();
							} else if (data.data) {
								if (data.data.IsSuccess && data.data.eSignApiUrl && data.data.requestXml) {
									sessionStorage.setItem('AxNo', $rootScope.formData.eRefNumber);
									frmMain.action = data.data.eSignApiUrl;
									$('#msg').val(data.data.requestXml);
									document.getElementById("frmMain").submit();
								} else { }

							} else { }
						})



					} else {
						$scope.updateIPVStage('');
					}
				}

			}

		}, function (e) {
			$rootScope.formData.apiLoading = false;
		});
	};
	$scope.emstatus = function (value, field) {
		if (field) {
			$rootScope.formData.fields.emailBelongs = value;
			$scope.panEmailRegError = false;
		} else {
			$rootScope.formData.fields.mobileBelongs = value;
			$scope.panMobileRegError = false;
		}
	}
	$scope.newMobileValidate = function () {
		if (!$rootScope.formData.fields.mobile) {
			$scope.emptyMobile = true;
			$scope.mobileErrorMessage = "Please Enter Mobile";
		} else if ($rootScope.formData.fields.mobile && !$scope.mobileRegex.test($rootScope.formData.fields.mobile)) {
			$scope.emptyMobile = true;
			$scope.mobileErrorMessage = "Please Enter Valid Mobile Number";
		} else {
			$scope.emptyMobile = false;
			$scope.mobileErrorMessage = "";
			var url = "AuthorizeOTPGeneration";
			if (!$rootScope.formData.fields.email) {
				$rootScope.formData.fields.email = sessionStorage.getItem('RxEmail');
			}

			var sendData = {
				'ReferenceNumber': $rootScope.formData.ReferenceNumber,
				'Mobile': $rootScope.formData.fields.mobile,
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
			});
		}
	}

	$scope.changeMobile = function () {
		$scope.showotpMobile = true;
		$scope.oldMobileNumber = $rootScope.formData.fields.mobile;
		sessionStorage.setItem('oldMobile', $rootScope.formData.fields.mobile);
		$rootScope.formData.fields.mobile = "";
		sessionStorage.setItem('changeMobile', true);
	}

	$scope.cancelMobile = function () {
		$scope.showotpMobile = false;
		$rootScope.formData.fields.mobile = $scope.oldMobileNumber;
		$scope.newOTP = false;
		sessionStorage.removeItem('changeMobile');
		$scope.emptyMobile = false;
		$scope.mobileErrorMessage = "";
	}

	$scope.validateOTP = function () {
		$scope.otpEmpty = false;
		if (!$rootScope.formData.fields.otpNew) {
			$scope.otpEmpty = true;
			$scope.otpErrorMessageMobile = 'Please Enter OTP';
			return;
		}
		var url = "UnAuthorizeOTPValidation";
		var sendData = {
			'Mobile': $rootScope.formData.fields.mobile,
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
			if (!response.IsSuccess) {
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
				sessionStorage.removeItem('changeMobile');
				$rootScope.formData.apiLoading = true;
				$scope.panMobileVerificationError = false;
				var murl = "MobileByReferenceNumber";
				var msendData = {
					ReferenceNumber: $rootScope.formData.eRefNumber,
					Mobile: $rootScope.formData.fields.mobile,
					MobileFlag: "Y"
				}
				serverService.apiCall(murl, msendData);

				var url = "InsertLandingDetails";
				var sendData = {
					'AssistLCCode': sessionStorage.getItem('AssistLCCode'),
					'AssistLGCode': sessionStorage.getItem('AssistLGCode'),
					'City': sessionStorage.getItem('User_City'),
					"EmailId": $rootScope.formData.fields.email,
					"MobileNumber": $rootScope.formData.fields.mobile,
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
						sessionStorage.setItem('RxMobile', $rootScope.formData.fields.mobile);
						sessionStorage.setItem('AxToken', response.Token);
						$scope.changeNumber = false;
						$scope.otpSuccess = true;
						$scope.mobileOTPVerified = true;
						$scope.showotpMobile = false;
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
		});
	}

	$scope.changeEmail = function () {
		$scope.emailVerificationSend = true;
		$scope.oldEmail = $rootScope.formData.fields.email;
		sessionStorage.setItem('oldEmail', $rootScope.formData.fields.email);
		$rootScope.formData.fields.email = "";
		sessionStorage.setItem('changeEmail', true);

	}

	$scope.cancelEmail = function () {
		$scope.emailVerificationSend = false;
		$rootScope.formData.fields.email = $scope.oldEmail;
		$scope.newEmailOTP = false;
		sessionStorage.removeItem('changeEmail');
		$scope.emptyEmail = false;
		$scope.emailErrorMessage = "";
	}

	$scope.getEmailVerificatioUrl = function () {
		if (!$rootScope.formData.fields.email) {
			$scope.emptyEmail = true;
			$scope.emailErrorMessage = 'Please Enter Email ID';
		} else if (!$scope.filter.test($rootScope.formData.fields.email)) {
			$scope.emptyEmail = true;
			$scope.emailErrorMessage = 'Please Enter Valid Email ID';
		} else {
			$scope.emptyEmail = false;
			$scope.emailErrorMessage = '';
			var url = "EmailVerificationUrl";
			sendData = {
				ReferenceNumber: $rootScope.formData.eRefNumber ? $rootScope.formData.eRefNumber : $rootScope.existingRef,
				Email: $rootScope.formData.fields.email,
				ProvidedEmailIdbelongingto: $rootScope.formData.fields.emailBelongs
			};
			$rootScope.formData.apiLoading = true;
			//	sendData = $rootScope.encryptReq(sendData);
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$rootScope.formData.apiLoading = false;
				if (response.IsSuccess) {
					$scope.newEmailOTP = true;
					$rootScope.OtpLimitExceed = false;
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
					$rootScope.OtpLimitExceed = true;
					$rootScope.OtpResponseMsg = response.ErrorMessage;
					var otpresendModal = new bootstrap.Modal(document.getElementById('otp-resend'), {
						backdrop: 'static',
						keyboard: false
					});
					otpresendModal.show();
				}
			}, function (e) {
				$rootScope.formData.apiLoading = false;
			});
		}
	}

	$scope.validateEmailOTP = function () {
		$scope.emailOtpError = false;
		if (!$rootScope.formData.fields.otpEmailNew) {
			$scope.emailOtpError = true;
			$scope.emailOtpErrorMsg = 'Please Enter OTP';
			return;
		}
		const path = `UnAuthorizeOTPValidation`;
		var sendData = {
			'Mobile': $rootScope.formData.fields.mobile,
			'Email': $rootScope.formData.fields.email,
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
		serverService.apiCall(path, sendData).then(function (a) {
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
				$scope.newEmailOTP = false;
				$scope.emailVerificationSend = false;
				sessionStorage.removeItem('changeEmail');
				$scope.emailOtpError = false;
				$scope.emailOtpErrorMsg = "";
			} else {
				$scope.emailOtpError = true;
				$scope.emailOtpErrorMsg = response.ErrorMessage;
			}

		}, function (e) {
			$rootScope.formData.apiLoading = false;
		});
	}
	$scope.printNominee = function (value) {
		$rootScope.nomineePrint = value;
		$scope.printNomineeError = false;
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
		{ field: 'Mobile Number', value: '', required: true, type: 'input', directive: 'digit', length: 10 },
		{ field: 'Email ID', value: '', required: true, type: 'input', directive: 'email' },
		{
			field: 'Id Proof', value: '', required: true, type: 'dropdown',
			arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
			valueKey: 'DocumentTypeId'
		},
		{ field: 'Id proof number', value: '', required: true, type: 'input', directive: 'alpha-numeric', length: 10 },
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
			field: 'Relationship', value: '', required: true, type: 'dropdown',
			arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',
			valueKey: 'NomineeValue'
		},
		{ field: 'Guardian Mobile Number', value: '', required: true, type: 'input', directive: 'digit', length: 10 },
		{ field: 'Guardian Email ID', value: '', required: true, type: 'input', directive: 'email' },
		{
			field: 'Guardian Id Proof', value: '', required: true, type: 'dropdown',
			arrayVal: $rootScope.formData.newNomineeTypeList, labelKey: 'Name',
			valueKey: 'DocumentTypeId'
		},
		{ field: 'Guardian Id proof number', value: '', required: true, type: 'input', directive: 'alpha-numeric', length: 10 },
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
					arrayVal: data.field === 'Id Proof' ? $rootScope.formData.newNomineeTypeList : data.field === 'Relationship' ? $rootScope.formData.nomineeRelationList : ''
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
					arrayVal: data.field === 'Guardian Id Proof' ? $rootScope.formData.newNomineeTypeList : data.field === 'Relationship' ? $rootScope.formData.nomineeRelationList : '',
					index: index
				}));
				$scope.$apply();
			}
			setTimeout(() => {
				$(".select").select2();
				$scope.initDatepicker($rootScope.guardianNewFields.length - 1, 'guardian');
			}, 250);
		}
	};
	$scope.removeNominee = function (index) {
		if ($rootScope.nomineeNewFields.length > 0) {
			$rootScope.nomineeNewFields.splice(index, 1);
		}
		$('#nomineeDlt').modal('hide');
		$('#personal-details').modal('hide');
		$scope.NomineeError = false;
		$scope.personalUpdate();
		// var NomineDeletePopUpModal = new bootstrap.Modal(document.getElementById('NomineDeletePopUp'), {
		// 	backdrop: 'static',
		// 	keyboard: false
		// });
		// NomineDeletePopUpModal.hide();
		if ($rootScope.nomineeNewFields.length === 0) {
			$rootScope.formData.fields.nominee = 'N';
		}
		$scope.$evalAsync();
	};
	$scope.removeGuardian = function (index) {
		if ($rootScope.guardianNewFields.length > 0) {
			$rootScope.guardianNewFields.splice(index, 1);
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
	$scope.validateNomineeFields = function () {
		let newError = 0;

		if ($rootScope.nomineeNewFields.length > 0) {
			let idproof = '';
			$rootScope.nomineeNewFields.forEach(function (nomineeGroup) {
				nomineeGroup.forEach(function (field) {
					if (field.value && field.field === 'Id Proof') {
						idproof = field.value;
					}
					if (field.required && !field.value) {
						field.error = true;
						field.errorMessage = 'Please Provide Valid Input';
						newError++;
					} else if (field.required && field.value && field.field === 'Email ID' && !$scope.EmailRefex(field.value)) {
						field.error = true;
						field.errorMessage = 'Please provide proper email address. Eg: john@xyz.com';
						newError++;
					} else if (field.required && field.value && field.field === 'Mobile Number' && !$rootScope.mobileNumberValidation(field.value)) {
						field.error = true;
						field.errorMessage = 'Please provide 10 digit valid mobile number';
						newError++;
					}
					// else if (field.required && field.value && field.field === 'First name' && field.value.length < 3) {
					// field.error = true;
					// field.errorMessage = `${field.field} must be at least 3 characters long`;
					// newError++;
					// } else if (field.required && field.value && field.field === 'Last name' && field.value.length < 3) {
					// field.error = true;
					// field.errorMessage = `${field.field} must be at least 3 characters long`;
					// newError++;
					// }
					else if (field.required && field.field === 'Nominee share (%)' && field.value) {
						// const staticNomineeTotal =
						// 	(Number($rootScope.formData.fields.NomineeRatio1) || 0) +
						// 	(Number($rootScope.formData.fields.NomineeRatio2) || 0) +
						// 	(Number($rootScope.formData.fields.NomineeRatio3) || 0);

						const dynamicNomineeTotal = $rootScope.nomineeNewFields
							.flat()
							.filter(n => n.field === 'Nominee share (%)' && n.value)
							.map(n => Number(n.value))
							.reduce((sum, share) => sum + share, 0);

						const total = dynamicNomineeTotal;
						if (total !== 100) {
							field.error = true;
							field.errorMessage = 'Combined Nominee share should be exactly 100%';
							newError++;
						} else {
							field.error = false;
							field.errorMessage = '';
						}
					} else if (field.required && field.value && field.field === 'Id proof number' && idproof == '1008' && !pan_filter.test(field.value)) {
						field.error = true;
						field.errorMessage = 'Please Enter Valid Pan';
						newError++;
					} else if (field.required && field.value && field.field === 'Id proof number' && idproof == '1008' && (field.value.toLowerCase() == $rootScope.formData.fields.panNumber.toLowerCase())) {
						field.error = true;
						field.errorMessage = 'Nominee"s PAN Must not be same as Customer"s PAN';
						newError++;
					} else if (field.required && field.value && (field.field === 'Id proof number: (Last 4 digits)' || field.field == 'Id proof number') && idproof == '1007' && !Aahaar.test(field.value)) {
						field.error = true;
						field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
						newError++;
					} else {
						field.error = false;
						field.errorMessage = '';
					}
				});
			});
			$scope.$evalAsync();
		}

		if ($rootScope.guardianNewFields.length > 0) {
			let idproof = '';
			$rootScope.guardianNewFields.forEach(function (guardianGroup) {
				guardianGroup.forEach(function (field) {
					if (field.value && field.field === "Guardian Id Proof") {
						idproof = field.value;
					}
					if (field.required && !field.value) {
						field.error = true;
						field.errorMessage = 'Please Provide Valid Input';
						newError++;
					} else if (field.required && field.value && field.field === 'Guardian Email ID' && !$scope.EmailRefex(field.value)) {
						field.error = true;
						field.errorMessage = 'Please provide a proper email address. Eg: john@xyz.com';
						newError++;
					} else if (field.required && field.value && field.field === 'Guardian Mobile Number' && !$rootScope.mobileNumberValidation(field.value)) {
						field.error = true;
						field.errorMessage = 'Please provide a 10-digit valid mobile number';
						newError++;
					}
					// else if (field.required && field.value && field.field === 'Guardian First name' && field.value.length < 3) {
					// field.error = true;
					// field.errorMessage = `${field.field} must be at least 3 characters long`;
					// newError++;
					// } else if (field.required && field.value && field.field === 'Guardian Last name' && field.value.length < 3) {
					// field.error = true;
					// field.errorMessage = `${field.field} must be at least 3 characters long`;
					// newError++;
					// }
					else if (field.required && field.value && field.field === 'Guardian Id proof number' && idproof == '1008' && !pan_filter.test(field.value)) {
						field.error = true;
						field.errorMessage = 'Please Enter Valid Pan';
						newError++;
					} else if (field.required && field.value && field.field === 'Guardian Id proof number' && idproof == '1008' && (field.value.toLowerCase() == $rootScope.formData.fields.panNumber.toLowerCase())) {
						field.error = true;
						field.errorMessage = 'Guardian"s PAN Must not be same as Customer"s PAN';
						newError++;
					} else if (field.required && field.value && (field.field === 'Guardian ID proof number: (Last 4 digits)' || field.field === 'Guardian Id proof number') && idproof == '1007' && !Aahaar.test(field.value)) {
						field.error = true;
						field.errorMessage = 'Please Enter Valid Aadhaar Document Number';
						newError++;
					} else {
						field.error = false;
						field.errorMessage = '';
					}
				});
			});
			$scope.$evalAsync();
		}

		// if ($rootScope.additionalAddress.length > 0) {
		// 	$rootScope.additionalAddress.forEach(function (nomineeGroup) {
		// 		nomineeGroup.forEach(function (field) {
		// 			if (field.required && !field.value) {
		// 				field.error = true; 
		// 				field.errorMessage = 'Please provide Valid input';
		// 				newError++;
		// 			} else {
		// 				field.error = false;
		// 			}
		// 		});
		// 	});
		// }

		// if ($rootScope.GuardadditionalAddress.length > 0) {
		// 	$rootScope.GuardadditionalAddress.forEach(function (nomineeGroup) {
		// 		nomineeGroup.forEach(function (field) {
		// 			if (field.required && !field.value) {
		// 				field.error = true; 
		// 				field.errorMessage = 'Please provide Valid input';
		// 				newError++;
		// 			} else {
		// 				field.error = false;
		// 			}
		// 		});
		// 	});
		// }
		if (newError != 0) {
			$('#nomineeInfo').collapse('show');
		}
		if ($rootScope.nomineeNewFields.length > 0 && !$rootScope.nomineePrint) {
			$scope.printNomineeError = true;
			newError++;
		}

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
					field.length = value == '1015' || value == '1017' ? 16 : 10;
				}
			})
			let idProofField = arr.find(field => field.field === 'Id Proof' && field.value == '1012');
			if (idProofField) {
				let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
				if (idProofNumberField) {
					idProofNumberField.required = false;
				}
			} else {
				let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
				if (idProofNumberField) {
					idProofNumberField.required = true;
				}
			}
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
					field.length = value == '1015' || value == '1017' ? 16 : 10;
				}
			})
			let idProofField = arr.find(field => field.field === 'Id Proof' && field.value == '1012');
			if (idProofField) {
				let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
				if (idProofNumberField) {
					idProofNumberField.required = false;
				}
			} else {
				let idProofNumberField = arr.find(field => field.field === 'Id proof number' || field.field === 'Id proof number: (Last 4 digits)');
				if (idProofNumberField) {
					idProofNumberField.required = true;
				}
			}
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

	$scope.NomineeSave = function () {
		let NomineeInfoListArr = [];
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
					if (data.field === "Relationship") {
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
						obj.NomineeInfoId = data.value ? data.value : '';
					}
					if (obj.IsNomineeSameAsApplicant == '0' && $rootScope.additionalAddress[index]) {
						$rootScope.additionalAddress[index].forEach((address) => {
							if (address.field === "Your Address, Line 1") {
								obj.AddressLine1 = address.value;
							}
							if (address.field === "Your Address, Line 2") {
								obj.AddressLine2 = address.value;
							}
							if (address.field === "Your Address, Line 3") {
								obj.AddressLine3 = address.value;
							}
							if (address.field === "City") {
								obj.City = address.value;
							}
							if (address.field === "District") {
								obj.District = address.value;
							}
							if (address.field === "State") {
								obj.State = address.value;
							}
							if (address.field === "Pincode") {
								obj.PinCode = address.value;
							}

						})
					}
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
							if (guardian.field === "Relationship") {
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
							if (guardian.field === 'sameAddress') {
								obj.IsSameNomineeANDGuardianAddess = guardian.value ? "1" : '0';
								obj.IsGuardianSamePermenantAddress = guardian.value ? "1" : '0';
							}
							if (obj.IsGuardianSamePermenantAddress == '0') {
								$rootScope.GuardadditionalAddress[index].forEach((guard_address) => {
									obj.GuardianCountry = "INDIA";
									if (guard_address.field === "Your Address, Line 1") {
										obj.GuardianAddressLine1 = guard_address.value;
									}
									if (guard_address.field === "Your Address, Line 2") {
										obj.GuardianAddressLine2 = guard_address.value;
									}
									if (guard_address.field === "Your Address, Line 3") {
										obj.GuardianAddressLine3 = guard_address.value;
									}
									if (guard_address.field === "City") {
										obj.GuardianCity = guard_address.value;
									}
									if (guard_address.field === "District") {
										obj.GuardianDistrict = guard_address.value;
									}
									if (guard_address.field === "State") {
										obj.GuardianState = guard_address.value;
									}
									if (guard_address.field === "Pincode") {
										obj.GuardianPinCode = guard_address.value;
									}

								})
							}
						}
						)
					}
				});
				arr.push(obj);
			});
			NomineeInfoListArr = NomineeInfoListArr.concat(arr);
		}
		var s_url = "DIYNomineeRegistrationNewEnc";

		var sendData = [{
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			NomineeInfoList: NomineeInfoListArr,
			IsDiy: true,
			EncryptToken: $rootScope.EncryptToken,
			// Statement-of-holding print preference - exactly ONE of the two is 'Y'.
			// "Name of Nominee(s)" (nomineePrint 'N') -> NameOfNominee 'Y', NomineeFlag 'N'
			// "Nomination Flag (Yes/No)" (nomineePrint 'Y') -> NameOfNominee 'N', NomineeFlag 'Y'
			// Mirrors personalDetails.js so both stages send the same pair.
			NameOfNominee: ($rootScope.nomineePrint === 'N' ? 'Y' : ($rootScope.nomineePrint === 'Y' ? 'N' : '')),
			NomineeFlag: $rootScope.nomineePrint
		}
		]
		sendData = $rootScope.encryptReq(sendData);
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {
				$scope.NomineeError = false;
				$scope.personalUpdate();
			} else {
				$rootScope.formData.apiLoading = false;
				$scope.commonModalErrorMessage = (response && response.ErrorMessage) ? response.ErrorMessage : 'Unable to save nominee details. Please try again.';
                $scope.ModalTrigger('commonModal', true);
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			$scope.commonModalErrorMessage = 'Something went wrong. Please try again.';
            $scope.ModalTrigger('commonModal', true);
		});
	}

	// ---- BYOD Annexure-B opt-out, document stage --------------------------------
	// Same declarations, same all-three gating and same API as Personal Details
	// (personalDetails/index.html #NomineDeletePopUp -> confirmNomineeOptOut).
	// The three checks are deliberately NOT pre-ticked: the customer must confirm
	// them, and their actual selections are what gets sent.
	$scope.nomineeDeclProcess = 'esign';
	$scope.nomineeOptOutConfirmed = false;

	$scope.openNomineeDeclDoc = function (process) {
		$scope.nomineeDeclProcess = process ? process : 'esign';
		$scope.nomineeDeclCheck1 = false;
		$scope.nomineeDeclCheck2 = false;
		$scope.nomineeDeclCheck3 = false;
		$('#formPDF').modal('hide');
		$scope.ModalTrigger('nomineeDeclDoc', true);
	};

	// Cancel closes the popup and nothing else: no opt-out API, no personalUpdate,
	// no GenerateESignPDFNewV1. The next ESign click re-runs the same check and
	// re-opens this popup - that repeat is required, Cancel must never bypass it.
	$scope.cancelNomineeDeclDoc = function () {
		$scope.nomineeDeclCheck1 = false;
		$scope.nomineeDeclCheck2 = false;
		$scope.nomineeDeclCheck3 = false;
	};

	$scope.confirmNomineeOptOutDoc = function () {
		if (!($scope.nomineeDeclCheck1 && $scope.nomineeDeclCheck2 && $scope.nomineeDeclCheck3)) {
			return;
		}
		if ($scope.legacyOptOutInProgress) {
			return;
		}
		$scope.legacyOptOutInProgress = true;
		var optUrl = "DIYNomineeOptOutNewEnc";
		// encryptReq() + apiCall(), NOT apiCallEnc - the deployed mod-server-comm
		// does not expose apiCallEnc (see personalDetails.confirmNomineeOptOut).
		var optData = [{
			ReferenceNumber: $rootScope.formData.ReferenceNumber ? $rootScope.formData.ReferenceNumber : $rootScope.formData.eRefNumber,
			NomineeDeclCheck1: $scope.nomineeDeclCheck1,
			NomineeDeclCheck2: $scope.nomineeDeclCheck2,
			NomineeDeclCheck3: $scope.nomineeDeclCheck3,
			NomineeFlag: 'N'
		}];
		optData = $rootScope.encryptReq(optData);
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(optUrl, optData).then(function (o) {
			var optRes = o.data;
			$rootScope.formData.apiLoading = false;
			$scope.legacyOptOutInProgress = false;
			if (optRes && optRes.EncryptToken) {
				$rootScope.EncryptToken = optRes.EncryptToken;
				sessionStorage.setItem('AuthToken', optRes.EncryptToken);
			}
			if (optRes && optRes.IsSuccess) {
				$rootScope.formData.fields.nominee = 'N';
				$('#nYes').prop('checked', false);
				$('#nNo').prop('checked', true);
				$rootScope.formData.nomineeOptOutId = optRes.NomineeOptOutId;
				$scope.NomineeError = false;
				$scope.nomineeOptOutConfirmed = true;
				$scope.personalUpdate($scope.nomineeDeclProcess);
			} else {
				$scope.commonModalErrorMessage = (optRes && optRes.ErrorMessage) ? optRes.ErrorMessage : 'Problem in saving nominee opt-out declaration';
				$scope.ModalTrigger('commonModal', true);
			}
		}, function (e) {
			$rootScope.formData.apiLoading = false;
			$scope.legacyOptOutInProgress = false;
			$scope.commonModalErrorMessage = 'Something went wrong. Please try again.';
			$scope.ModalTrigger('commonModal', true);
		});
	};

	$scope.submitByodPersonal = function () {
		if ($rootScope.BYOD && $scope.NomineeError) {
            if (!$rootScope.nomineePrint) {
                $scope.printNomineeError = true;
                return;
            }
            $scope.printNomineeError = false;
            $scope.NomineeSave();
            return;
        }
		if ($scope.NomineeError && !$scope.validateNomineeFields()) {
			return;
		} else if ($scope.NomineeError && $scope.validateNomineeFields()) {
			$scope.NomineeSave();
		} else {
			$scope.personalUpdate();
		}
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
	$scope.HRMSubmit = function () {
		$state.go('personalDetails', {
			mobile: $rootScope.formData.EncMobile
		});
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
	$scope.nYes = function (value) {
		$rootScope.formData.fields.nominee = value;
		if ($rootScope.formData.fields.nominee == 'N') {
			$scope.removePopNew(0);
		}

	}

	//New GetDecryptURL in register page. For the PAN NAME mistach.
	//Starts
	$scope.getDecUrl = function () {
		var encryptURL = "GetDecryptURL";
		var sendDataURL = {
			DecryptURL: sessionStorage.getItem('AxNo')
		};
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(encryptURL, sendDataURL).then(function (decRes) {
			var decryptResponse = $rootScope.decryptRes(decRes.data, 'Response');
			$rootScope.formData.apiLoading = false;
			$rootScope.formData.referralCode = '';
			if (decryptResponse.IsSuccess) {
				sessionStorage.setItem("namegetMismatch", decryptResponse.NameMatch);
				sessionStorage.setItem("DobgetMismatch", decryptResponse.DOBMatch);
				if (decryptResponse.NameMatch != "Y" || decryptResponse.DOBMatch != "Y") {
					$rootScope.emailMobile = false;
					$rootScope.pan = true;
					$rootScope.formData.fields.panNumber = decryptResponse.PANNumber;
					sessionStorage.setItem("RxPan", decryptResponse.PANNumber);
					sessionStorage.setItem("DOBMismatch", decryptResponse.DOB);
					sessionStorage.setItem("pannamemismatch", decryptResponse.ClientName);
					$rootScope.formData.dob = decryptResponse.DOB;
					$rootScope.formData.fields.DOB = decryptResponse.DOB;
					$rootScope.formData.fields.username = decryptResponse.ClientName;
					setTimeout(function () {
						$('#pan').prop('disabled', true);
						$('#txtDOB').prop('disabled', true);
						$('#panCName').prop('disabled', true);
						if (decryptResponse.NameMatch != "Y") {
							$rootScope.formData.fields.username = decryptResponse.ClientName;
							$('#panCName').prop('disabled', false);
						}
						if (decryptResponse.DOBMatch != "Y") {
							$('#txtDOB').prop('disabled', false);
						}
					}, 3000);
					return;
				}
				// Both Name and DOB matched — proceed to next step
				// TODO: add your success navigation/logic here, e.g. $state.go('nextStep');
			} else {
				// API responded but with a failure flag
				$rootScope.formData.apiError = decryptResponse.Message || 'Something went wrong. Please try again.';
			}
		}).catch(function (error) {
			$rootScope.formData.apiLoading = false;
			$rootScope.formData.apiError = 'Unable to fetch details. Please try again.';
			console.error('getDecUrl error:', error);
		});
	};
	//End




}
]);
