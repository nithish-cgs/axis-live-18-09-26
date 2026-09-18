
function imgUpld(id) {
	if (id == 'PANNumber')
		angular.element(document.getElementById("PANNumber")).scope().imgUpload('PANNumber');
	if (id == 'ClientPhoto')
		angular.element(document.getElementById("ClientPhoto")).scope().imgUpload('ClientPhoto');
	if (id == 'Aadhar')
		angular.element(document.getElementById("Aadhar")).scope().imgUpload('Aadhar');
	if (id == 'CorrespondenceAddress')
		angular.element(document.getElementById("CorrespondenceAddress")).scope().imgUpload('CorrespondenceAddress');
	if (id == 'CorrespondenceAddress2')
		angular.element(document.getElementById("CorrespondenceAddress2")).scope().imgUpload('CorrespondenceAddress2');
	if (id == 'PermenantAddress')
		angular.element(document.getElementById("PermenantAddress")).scope().imgUpload('PermenantAddress');
	if (id == 'PermenantAddress2')
		angular.element(document.getElementById("PermenantAddress2")).scope().imgUpload('PermenantAddress2');
	if (id == 'BankCheque')
		angular.element(document.getElementById("BankCheque")).scope().imgUpload('BankCheque');
	if (id == 'SPECIMENPROOF')
		angular.element(document.getElementById("SPECIMENPROOF")).scope().imgUpload('SPECIMENPROOF');
	if (id == 'Income')
		angular.element(document.getElementById("Income")).scope().imgUpload('Income');
	if (id == 'RMSIGNATURE')
		angular.element(document.getElementById("RMSIGNATURE")).scope().imgUpload('RMSIGNATURE');
	if (id == 'ADDITIONALDOC1')
		angular.element(document.getElementById("ADDITIONALDOC1")).scope().imgUpload('ADDITIONALDOC1');
	if (id == 'ADDITIONALDOC2')
		angular.element(document.getElementById("ADDITIONALDOC2")).scope().imgUpload('ADDITIONALDOC2');
	if (id == 'ADDITIONALDOC3')
		angular.element(document.getElementById("ADDITIONALDOC3")).scope().imgUpload('ADDITIONALDOC3');
	if (id == 'FIRSTPOA')
		angular.element(document.getElementById("FIRSTPOA")).scope().imgUpload('FIRSTPOA');
	if (id == 'SECONDPOA')
		angular.element(document.getElementById("SECONDPOA")).scope().imgUpload('SECONDPOA');
	if (id == 'NOMINEEPROOF')
		angular.element(document.getElementById("NOMINEEPROOF")).scope().imgUpload('NOMINEEPROOF');
	if (id == 'ADDRESSMODIFICATION')
		angular.element(document.getElementById("ADDRESSMODIFICATION")).scope().imgUpload('ADDRESSMODIFICATION');
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
mainApp.controller('documentController', function ($scope, $rootScope, $state, serverService, $location) {
	// Payment Related Code
	var searchObject = $location.search();
	$scope.signatureUpld = true;
	if (!angular.isUndefined(searchObject.ReferenceNumber)) {
		//alert(searchObject);
		localStorage.removeItem('AxToken');
		$rootScope.EncryptToken = '';
		localStorage.setItem('AxNo', searchObject.ReferenceNumber);
		//$rootScope.getDIYStatus();
	}
	if (!$rootScope.formData.threeinone && !$rootScope.formData.RMModule && $rootScope.formData.makePayment) {
		$state.go('products', {
			mobile: $rootScope.formData.EncMobile
		});
		localStorage.setItem('productStage', true)
	} else {
		localStorage.removeItem('productStage')
	}
	if (!angular.isUndefined(searchObject.eSignFailure)) {
		$('#APIResponse').modal({
			backdrop: 'static',
			keyboard: true
		})
		$rootScope.apiResponseErrorMsg = 'Esign Error';
	}

	if (!angular.isUndefined(searchObject.ipvFailure)) {
		/*$('#APIResponse').modal({
		backdrop: 'static',
		keyboard: true
		})
		$rootScope.apiResponseErrorMsg = 'Please do IPV Later';*/
	}

	// if(localStorage.getItem('IsKRA') == null || localStorage.getItem('DOB') == null || localStorage.getItem('RxPan') == null || localStorage.getItem('RxMobile') == null || localStorage.getItem('RxEmail') == null) {
	//     var encryptURL = "GetDecryptURL";
	//     if(localStorage.getItem('EncUserDetails')){
	//         $rootScope.formData.DecryptURL = localStorage.getItem('EncUserDetails');
	//     }
	//     var sendDataURL = { DecryptURL: $rootScope.formData.DecryptURL};
	//     //serverService.apiTokenCall(encryptURL, sendDataURL, tokenParams).success(function (response) {
	//         serverService.apiCall(encryptURL, sendDataURL).success(function (response) {
	//             if(response.IsSuccess){
	//                 localStorage.setItem("RxEmail", response.Email);
	//                 localStorage.setItem("RxMobile", response.Mobile);
	//                 localStorage.setItem("DOB", response.DOB);
	//                 localStorage.setItem("RxMobile", response.Mobile);
	//                 localStorage.setItem("IsKRA", response.IsKRA);
	//                 localStorage.setItem("RxPan", response.PANNumber);
	//                 localStorage.setItem("Token", response.Token);
	//                 localStorage.setItem("RxReferenceNumber", response.ReferenceNumber);
	//                 $rootScope.getDIYStatus();
	//                 if (localStorage.getItem('IsKRA') != null) {
	//                     $scope.formData.KRASuccess = JSON.parse(localStorage.getItem('IsKRA'));
	//                 }

	//                 if (localStorage.getItem('IsAadharVerified') != null) {
	//                     $scope.formData.AadharSuccess = JSON.parse(localStorage.getItem('IsAadharVerified'));
	//                 }

	//                 if($scope.formData.KRASuccess || $scope.formData.AadharSuccess){
	//                     $scope.formData.makePayment = true;
	//                 }else{
	//                     $scope.formData.makePayment = false;
	//                 }
	//             }
	//     });
	// }

	$rootScope.formData.stageInfo = '6';
	$rootScope.formData.stageOrder = 6;
	//use variable for image upload success and failure icon and row color changes concept
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
	$scope.AadhaarBackImg = false;
	$scope.panSample = false;
	$scope.signatureSample = false;
	$scope.photoSample = false;
	$scope.chequeSample = false;
	$scope.documentSample = false;
	$scope.pdocumentSample = false;
	$scope.panUpld = true;
	$scope.addressUpld = true;
	$rootScope.getAPI = true;
	$scope.otpSuccess = false;
	$scope.hideEsign = false;
	$scope.IsSelfi = 'N';

	if (localStorage.getItem('IsAadharVerified') == 'true') {
		$rootScope.formData.fields.DocsaddressProof = '111';
		$scope.formData.AadharSuccess = JSON.parse(localStorage.getItem('IsAadharVerified'));
	}
	// if (localStorage.getItem('IsKRA') != null) {
	//     $scope.formData.KRASuccess = JSON.parse(localStorage.getItem('IsKRA'));
	// }
	if ($rootScope.getAPI && !$rootScope.formData.threeinone) {
		if (localStorage.getItem('AxNo') != null) {
			$rootScope.getAPI = false;
			$rootScope.formData.eRefNumber = localStorage.getItem('AxNo');
			setTimeout(function () {
				$rootScope.getDIYStatus();
			}, 500);

		} else {
			window.location.href = (serverService.getHome());
		}
	}

	if (!$rootScope.formData.ReferenceNumber && localStorage.getItem('RxReferenceNumber')) {
		$rootScope.formData.ReferenceNumber = localStorage.getItem('RxReferenceNumber');
	}

	var s_url = "DIYGetDocumentProofStageByReferenceNumber";

	var sendData = {
		ReferenceNumber: $rootScope.formData.ReferenceNumber
	};
	//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response)
	serverService.apiCall(s_url, sendData).success(function (response) {
		if (response.IsSuccess) {
			if (response.ObjCDIYRegistration.FandOStatus == 1) {
				$scope.foImgUpld = true;

			} else {
				$scope.foImgUpld = false;

				if ($rootScope.formData.isgDocSkip) {
					localStorage.removeItem('isgEsign')
					$('#downloadPOA').modal({
						keyboard: false,
						backdrop: 'static'
					});
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

			/*if(response.ObjCDIYRegistration.IsCKYCSignatureDocument === "1"){
			$scope.signatureUpld = false;
			}else if(response.ObjCDIYRegistration.IsCKYCSignatureDocument === "0"){
			if(response.ObjCDIYRegistration.AxisBank === "1"){
			if(response.ObjCDIYRegistration.AxisSignature === "1"){
			$scope.signatureUpld = true;
			}else if(response.ObjCDIYRegistration.AxisSignature === "0"){
			$scope.signatureUpld = false;
			}
			}else if(response.ObjCDIYRegistration.AxisBank === "0"){
			$scope.signatureUpld = true;
			}
			}*/

			if (response.ObjCDIYRegistration.IsCKYCPanDocument === "1") {
				$scope.panUpld = false;
			} else if (response.ObjCDIYRegistration.IsCKYCPanDocument === "0") {
				$scope.panUpld = true;
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
				if ($rootScope.formData.CKYC || localStorage.getItem('IsCKYC') == 'true' || localStorage.getItem('IsCKYC') == true) {
					$scope.addressUpld = false;
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

			if ($rootScope.formData.CKYC || localStorage.getItem('IsCKYC') == 'true' || localStorage.getItem('IsCKYC') == true) {
				$scope.photoUpld = false;
			} else {
				$scope.photoUpld = true;
			}
			if (response.ObjCDIYRegistration.IsKRAEdit == '1' || response.ObjCDIYRegistration.CKYCUpdate == '1') {
				$scope.panUpld = true;
				$scope.signatureUpld = true;
				$scope.photoUpld = true;
				$scope.addressUpld = true;
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
		$scope.IsSelfi = 'N';
		var filesSelected = document.getElementById(imgName).files;

		var fileSize = (filesSelected[0].size);

		var fileName = document.getElementById(imgName).value;

		var preview = document.getElementById("preview");

		if (imgName == 'Income') {
			var allowed_extensions = new Array("jpg", "png", "jpeg", "pdf");
		} else {
			var allowed_extensions = new Array("jpg", "png", "jpeg");
		}

		var file_extension = fileName.split('.').pop();
		file_extension = file_extension.toLowerCase();
		var file_index = allowed_extensions.indexOf(file_extension);

		if (file_index <= 2 && file_index >= 0) {
			$scope.FileType = "Image";
			if (imgName == "PANNumber") {
				$scope.panSizeError = false;
				$scope.panQImgError = false;
				$scope.panCNImgError = false;
				if (fileSize > 4194304) {
					$scope.panSizeError = true;
				} else {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;
					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					$rootScope.formData.apiLoading = false;
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					if (response['category_name'].toLowerCase() == 'pan card') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.panCNImgError = true;
					}
					} else {
					$scope.panQImgError = true;
					}
					}
					});*/
					$scope.readfiles(filesSelected, imageName);
				}

				$scope.$apply();
			} else if (imgName == "ClientPhoto") {
				$scope.photoSizeError = false;
				if (fileSize > 4194304) {
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
			} else if (imgName == "BankCheque") {
				$scope.bankSizeError = false;
				$scope.bankQImgError = false;
				if (fileSize > 4194304) {
					$scope.bankSizeError = true;
				} else {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;
					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					console.log(response);
					$rootScope.formData.apiLoading = false;
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.bankQImgError = true;
					}
					}
					});*/
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
			} else if (imgName == 'CorrespondenceAddress') {
				$scope.cSizeError = false;
				$scope.cAddressQImgError = false;
				$scope.cAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.cSizeError = true;
					$scope.$apply();
				} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;
					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					$rootScope.formData.apiLoading = false;
					if ($rootScope.formData.fields.DocsaddressProof == 108 || $rootScope.formData.fields.DocsaddressProof == 109 || $rootScope.formData.fields.DocsaddressProof == 110 || $rootScope.formData.fields.DocsaddressProof == 111) {
					if (($rootScope.formData.fields.DocsaddressProof == 108 && response['category_name'].toLowerCase() == 'passport') || ($rootScope.formData.fields.DocsaddressProof == 109 && response['category_name'].toLowerCase() == 'voter id') || ($rootScope.formData.fields.DocsaddressProof == 110 && response['category_name'].toLowerCase() == 'driving licence') || ($rootScope.formData.fields.DocsaddressProof == 111 && response['category_name'].toLowerCase() == 'aadhar card')) {
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.cAddressQImgError = true;
					}
					} else {
					$scope.cAddressCNImgError = true;
					}
					} else {
					$scope.readfiles(filesSelected, imageName);
					}
					}
					});*/
					$scope.readfiles(filesSelected, imageName);
				} else {
					$('#CorrespondenceAddress').val('');
					$("#cAddressImage .file-input").empty();
					$scope.ctypeError = true;
				}
			} else if (imgName == 'CorrespondenceAddress2') {
				$scope.cSizeError = false;
				$scope.cAddressQImgError = false;
				$scope.cAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.cSizeError = true;
					$scope.$apply();

				} else if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;
					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					$rootScope.formData.apiLoading = false;
					if ($rootScope.formData.fields.DocsaddressProof == 108 || $rootScope.formData.fields.DocsaddressProof == 109 || $rootScope.formData.fields.DocsaddressProof == 110 || $rootScope.formData.fields.DocsaddressProof == 111) {
					if (($rootScope.formData.fields.DocsaddressProof == 108 && response['category_name'].toLowerCase() == 'passport') || ($rootScope.formData.fields.DocsaddressProof == 109 && response['category_name'].toLowerCase() == 'voter id') || ($rootScope.formData.fields.DocsaddressProof == 110 && response['category_name'].toLowerCase() == 'driving licence') || ($rootScope.formData.fields.DocsaddressProof == 111 && response['category_name'].toLowerCase() == 'aadhar card')) {
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.cAddressQImgError = true;
					}
					} else {
					$scope.cAddressCNImgError = true;
					}
					} else {
					$scope.readfiles(filesSelected, imageName);
					}
					}
					});*/
					$scope.readfiles(filesSelected, imageName);
				} else {
					$('#CorrespondenceAddress2').val('');
					$("#cAddressImage2 .file-input").empty();
					$scope.ctypeError = true;
					$scope.$apply();
				}
			} else if (imgName == 'PermenantAddress') {
				$scope.pSizeError = false;
				$scope.pAddressQImgError = false;
				$scope.pAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.pSizeError = true;
					$scope.$apply();
				} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;
					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					$rootScope.formData.apiLoading = false;
					if ($rootScope.formData.fields.pDocsaddressProof == 108 || $rootScope.formData.fields.pDocsaddressProof == 109 || $rootScope.formData.fields.pDocsaddressProof == 110 || $rootScope.formData.fields.pDocsaddressProof == 111) {
					if (($rootScope.formData.fields.pDocsaddressProof == 108 && response['category_name'].toLowerCase() == 'passport') || ($rootScope.formData.fields.pDocsaddressProof == 109 && response['category_name'].toLowerCase() == 'voter id') || ($rootScope.formData.fields.pDocsaddressProof == 110 && response['category_name'].toLowerCase() == 'driving licence') || ($rootScope.formData.fields.pDocsaddressProof == 111 && response['category_name'].toLowerCase() == 'aadhar card')) {
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.pAddressQImgError = true;
					}
					} else {
					$scope.pAddressCNImgError = true;
					}
					} else {
					$scope.readfiles(filesSelected, imageName);
					}
					}
					});*/
					$scope.readfiles(filesSelected, imageName);
				} else {
					$('#PermenantAddress').val('');
					$("#pAddressImage .file-input").empty();
					$scope.ptypeError = true;
					$scope.$apply();
				}
			} else if (imgName == 'PermenantAddress2') {
				$scope.pSizeError = false;
				$scope.pAddressQImgError = false;
				$scope.pAddressCNImgError = false;
				if (fileSize > 4194304) {
					$scope.pSizeError = true;
					$scope.$apply();
				} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
					var imgFormData = new FormData();
					imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'));
					imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
					imgFormData.append("file", filesSelected[0]);
					$scope.formData.apiLoading = true;

					/*$.ajax({
					url: 'https://apidigitalao.axisdirect.in/api/DIY/getLabel',
					data: imgFormData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: function (response) {
					$rootScope.formData.apiLoading = false;
					if ($rootScope.formData.fields.pDocsaddressProof == 108 || $rootScope.formData.fields.pDocsaddressProof == 109 || $rootScope.formData.fields.pDocsaddressProof == 110 || $rootScope.formData.fields.pDocsaddressProof == 111) {
					if (($rootScope.formData.fields.pDocsaddressProof == 108 && response['category_name'].toLowerCase() == 'passport') || ($rootScope.formData.fields.pDocsaddressProof == 109 && response['category_name'].toLowerCase() == 'voter id') || ($rootScope.formData.fields.pDocsaddressProof == 110 && response['category_name'].toLowerCase() == 'driving licence') || ($rootScope.formData.fields.pDocsaddressProof == 111 && response['category_name'].toLowerCase() == 'aadhar Card')) {
					if (response['image_quality'] && response['image_quality'].toLowerCase() == 'good') {
					$scope.readfiles(filesSelected, imageName);
					} else {
					$scope.pAddressQImgError = true;
					}
					} else {
					$scope.pAddressCNImgError = true;
					}
					} else {
					$scope.readfiles(filesSelected, imageName);
					}
					}
					});*/
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
			} else if (imgName == "FIRSTPOA") {
				$scope.poaSizeError = false;
				if (fileSize > 4194304) {
					$scope.poaSizeError = true;
				} else {
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "SECONDPOA") {
				$scope.poaSizeError = false;
				if (fileSize > 4194304) {
					$scope.poaSizeError = true;
				} else {
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "NOMINEEPROOF") {
				$scope.nomineeSizeError = false;
				if (fileSize > 4194304) {
					$scope.nomineeSizeError = true;
				} else {
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			} else if (imgName == "ADDRESSMODIFICATION") {
				$scope.amSizeError = false;
				if (fileSize > 4194304) {
					$scope.amSizeError = true;
				} else {
					$scope.readfiles(filesSelected, imageName);
				}
				$scope.$apply();
			}

		} else {
			if (file_index == 3) {
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
				if (imgName == "NOMINEEPROOF") {
					$('#NOMINEEPROOF').val('');
					$scope.nomineetypeError = true;
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
		// remove the existing canvases and hidden inputs if user re-selects new pics
		var existinginputs = document.getElementsByName('images[]');
		var existingcanvases = document.getElementsByTagName('canvas');
		while (existinginputs.length > 0) { // it's a live list so removing the first element each time
			// DOMNode.prototype.remove = function() {this.parentNode.removeChild(this);}
			form.removeChild(existinginputs[0]);
			preview.removeChild(existingcanvases[0]);
		}

		for (var i = 0; i < files.length; i++) {
			$scope.processfile(files[i], b); // process each file at once
		}
		files.value = ""; //remove the original files from fileinput
		// TODO remove the previous hidden inputs if user selects other files
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

		preview.appendChild(canvas);

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
			if (imgName == "ADDITIONALDOC1") {
				$('#ADDITIONALDOC1').val('');
				$('#ADDITIONALDOC1IMAGE .file-input').empty();
				$scope.adocLoad = true;
				$scope.adoctypeError = false;
			}
			if (imgName == "ADDITIONALDOC2") {
				$('#ADDITIONALDOC2').val('');
				$('#ADDITIONALDOC2IMAGE .file-input').empty();
				$scope.adocLoad = true;
				$scope.adoc2typeError = false;
			}
			if (imgName == "ADDITIONALDOC3") {
				$('#ADDITIONALDOC3').val('');
				$('#ADDITIONALDOC3IMAGE .file-input').empty();
				$scope.adocLoad = true;
				$scope.adoc3typeError = false;
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
			if (imgName == "NOMINEEPROOF") {
				$('#NOMINEEPROOF').val('');
				$('#NOMINEEPROOFIMAGE .file-input').empty();
				$scope.nomineeLoad = true;
				$scope.nomineetypeError = false;
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

	$scope.updateImage = function (imgName, imgValue, fileType, docId) {
		var s_url = "DIYImageUpload";
		var refNo = $rootScope.formData.ReferenceNumber;
		$scope.formData.apiLoading = true;
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
				IsSelfi: $scope.IsSelfi
			};
		}

		serverService.apiCall(s_url, sendData).success(function (response) {
			//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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
				if (imgName == "NOMINEEPROOF") {
					$scope.nomineeLoad = false;
					$scope.nomineeImgError = false;
					$scope.nomineetypeError = false;
				}
				if (imgName == "ADDRESSMODIFICATION") {
					$scope.amLoad = false;
					$scope.amImgError = false;
					$scope.amtypeError = false;
					$scope.amImageValidation = true;
				}
			}
			$scope.getImages();

		});
	}

	$scope.cImgUpld = function () {
		if ($scope.aadharImage && $rootScope.formData.fields.DocsaddressProof == 111) {
			$scope.addressImage = "data:image/jpeg;base64," + $scope.aadharImage;
			$scope.cAdrLoad = true;
			var s_url = "DIYImageUpload";
			$scope.formData.apiLoading = true;
			var sendData = {
				ImageName: "CorrespondenceAddress",
				Image: $scope.addressImage,
				DocumentType: $rootScope.formData.fields.DocsaddressProof,
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
				Extention: 'Image',
				IsDiy: true,
				IsIPV: "0",
				EncryptToken: $rootScope.EncryptToken
			};

			serverService.apiCall(s_url, sendData).success(function (response) {
				//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
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

				if ($rootScope.formData.caImage2 != "" && $rootScope.formData.caImage2) {
					var sendData = {
						ImageName: "CorrespondenceAddress2",
						Image: $rootScope.formData.caImage2,
						DocumentType: $rootScope.formData.fields.DocsaddressProof,
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						Extention: $scope.cafileType
					};
					serverService.apiCall(s_url, sendData).success(function (response) {

						$scope.formData.apiLoading = false;
						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							localStorage.setItem('AxToken', response.EncryptToken);
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
					});
				} else {

					$scope.formData.apiLoading = false;
				}

			}).error(function () {
				$scope.formData.apiLoading = false;
			});
		} else if ($rootScope.formData.caImage != "" && $rootScope.formData.caImage) {
			if ($rootScope.formData.fields.DocsaddressProof != 0 && $rootScope.formData.fields.DocsaddressProof) {
				$scope.cAdrLoad = true;
				var s_url = "DIYImageUpload";
				$scope.formData.apiLoading = true;

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

				serverService.apiCall(s_url, sendData).success(function (response) {
					//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
					if (response.EncryptToken) {
						$rootScope.EncryptToken = response.EncryptToken;
						localStorage.setItem('AxToken', response.EncryptToken);
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
						serverService.apiCall(s_url, sendData).success(function (response) {

							$scope.formData.apiLoading = false;
							if (response.EncryptToken) {
								$rootScope.EncryptToken = response.EncryptToken;
								localStorage.setItem('AxToken', response.EncryptToken);
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
						});
					} else {
						$scope.formData.apiLoading = false;
					}

				}).error(function () {
					$scope.formData.apiLoading = false;
				});
			}
		}
	}

	$scope.pImgUpld = function () {
		if ($scope.aadharImage && $rootScope.formData.fields.pDocsaddressProof == 111) {
			$scope.addressImage = "data:image/jpeg;base64," + $scope.aadharImage;
			$scope.cAdrLoad = true;
			var s_url = "DIYImageUpload";
			$scope.formData.apiLoading = true;
			var sendData = {
				ImageName: "PDocumentImage",
				Image: $scope.addressImage,
				DocumentType: $rootScope.formData.fields.pDocsaddressProof,
				ReferenceNumber: $rootScope.formData.ReferenceNumber,
				Extention: 'Image',
				IsDiy: true,
				IsIPV: "0",
				EncryptToken: $rootScope.EncryptToken
			};

			serverService.apiCall(s_url, sendData).success(function (response) {
				//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
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
						ImageName: "PERMENANTADDRESS2",
						Image: $rootScope.formData.paImage2,
						DocumentType: $rootScope.formData.fields.pDocsaddressProof,
						ReferenceNumber: $rootScope.formData.ReferenceNumber,
						Extention: $scope.pafileType,
						IsDiy: true,
						EncryptToken: $rootScope.EncryptToken
					};
					serverService.apiCall(s_url, sendData).success(function (response) {

						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							localStorage.setItem('AxToken', response.EncryptToken);
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
						$scope.formData.apiLoading = false;
					});
				} else {

					$scope.formData.apiLoading = false;
				}

			});
		} else if ($rootScope.formData.fields.pDocsaddressProof != 0 && $rootScope.formData.fields.pDocsaddressProof) {
			$scope.pAdrLoad = true;
			var s_url = "DIYImageUpload";
			$scope.formData.apiLoading = true;

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

			//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response) {
			serverService.apiCall(s_url, sendData).success(function (response) {
				$scope.formData.apiLoading = false;
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
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
					serverService.apiCall(s_url, sendData).success(function (response) {

						if (response.EncryptToken) {
							$rootScope.EncryptToken = response.EncryptToken;
							localStorage.setItem('AxToken', response.EncryptToken);
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
						$scope.formData.apiLoading = false;
					});
				} else {

					$scope.formData.apiLoading = false;
				}

			});
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
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}
		var sendData = {
			ImageName: imgName,
			ReferenceNumber: $rootScope.formData.ReferenceNumber
		};

		serverService.apiCall(s_url, sendData);

		if (imgName == 'CorrespondenceAddress2') {
			$scope.caddPage = false;
			$rootScope.formData.caImage2 = '';
			$('#cAddressImage2 .file-input, .c-adr2 .file-input-new').empty();
			$('.c-adr2 .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs txt-uppercase">Upload</span><input type="file" accept="image/*" class="input-upload" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div></div></div>')

		} else {
			$scope.paddPage = false;
			$rootScope.formData.paImage2 = '';
			$('#pAddressImage2 .file-input, .p-adr2 .file-input-new').empty();
			$('.p-adr2 .file-input-new').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppsercase">Upload</span><input type="file" accept="image/*" class="input-upload" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div></div></div>')
		}
	}

	$scope.getImages = function () {
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}

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

		$rootScope.formData.apiLoading = true;
		//serverService.apiTokenCall(s_url, sendData, tokenParams).success(function (response)
		serverService.apiCall(s_url, sendData).success(function (response) {
			var num = 0;
			$scope.panLoad = false;
			$scope.cltLoad = false;
			$scope.aadharLoad = false;
			$scope.cAdrLoad = false;
			$scope.cAdrLoad2 = false;
			$scope.pAdrLoad = false;
			$scope.pAdrLoad2 = false;
			$scope.bankLoad = false;
			$scope.incomeLoad = false;
			$scope.formData.apiLoading = false;

			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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
				$rootScope.IPVRedirectURL = response.IpvURLEncode;
				var Proof_Info = "";
				Client_Info_Stage = "Client_Info_Stage" + "-" + localStorage.getItem("ReferenceNum");
				if (JSON.parse(localStorage.getItem(Client_Info_Stage)) != null) {
					Proof_Info = JSON.parse(localStorage.getItem(Client_Info_Stage));

					$rootScope.formData.fields.DocsaddressProof1 = Proof_Info.DocsaddressProof1;
					$rootScope.formData.fields.DocsPermaddressProof = Proof_Info.DocsPermaddressProof;
					$rootScope.formData.fields.DocsPermaddressProof1 = Proof_Info.DocsPermaddressProof1;
					$rootScope.formData.fields.foDocumentProof = Proof_Info.foDocumentProof;
				}

				angular.forEach(response.IpvPOAandNomineeList, function (value, key) {
					if (value.ImageName == "Aadhar Service Image" && value.ImageUrl != null && value.ImageUrl != '') {
						$scope.aadharImage = value.ImageUrl;
						$scope.getAadharImage = false;
					} else {
						$scope.getAadharImage = true;
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

						$('.client-img .file-input').empty();
						$('.client-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="ClientPhoto" onchange="imgUpld(\'ClientPhoto\');"></div></div></div>')
						$('#clientImage .file-input').empty();
						$('#clientImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.photoImageUpdt = true;
						$scope.photoImg_reShow = true;
						$rootScope.formData.photoImage = value.ImageUrl;
						num++;
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

						num++;
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
						$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
						num++;

						if ($scope.cAddressDisable) {
							$(".select.cadr").prop("disabled", true);
						}
					}

					if (value.ImageName == "CORRESPONDENCEADDRESS2" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.caUrl2 = value.ImageUrl;

						$('.c-adr2 .file-input').empty().addClass('file-input-new');
						$('.c-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="CorrespondenceAddress2" onchange="imgUpld(\'CorrespondenceAddress2\');"></div><button type="button" class="btn btn-xs btn-default trash" onclick="delImg(\'CorrespondenceAddress2\')" title="clear selected files"><i class="glyphicon glyphicon-trash"></i></button></div></div>')
						$('#cAddressImage2 .file-input').empty().removeClass('file-input-new'); ;
						$('#cAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.cAddressUpdt2 = true;
						$scope.ca2Img_reShow = true;
						$rootScope.formData.caImage2 = value.ImageUrl;
						$rootScope.formData.fields.DocsaddressProof1 = (value.DocTypeID).toString();
						$scope.addressName1 = "CorrespondenceAddress2";
						$scope.caddPage = true;
						$rootScope.formData.fields.DocsaddressProof = (value.DocTypeID).toString();
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
						num++;
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
						$rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString();
						num++;
					}

					if (value.ImageName == "PERMENANTADDRESS2" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.paUrl2 = value.ImageUrl;
						$('.p-adr2 .file-input').empty().addClass('file-input-new');
						$('.p-adr2 .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="PermenantAddress2" onchange="imgUpld(\'PermenantAddress2\');"></div><button type="button" class="btn btn-xs btn-default trash" onclick="delImg(\'PermenantAddress2\')" title="clear selected files"><i class="glyphicon glyphicon-trash"></i></button></div></div>')
						$('#pAddressImage2 .file-input').empty();
						$('#pAddressImage2').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.pAddressUpdt2 = true;
						$rootScope.formData.paImage2 = value.ImageUrl;
						$scope.permaddressName1 = 'PERMENANTADDRESS2';
						$scope.pa2Img_reShow = true;
						$rootScope.formData.fields.pDocsaddressProof = (value.DocTypeID).toString();
						$scope.paddPage = true;
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
						num++;
					}

					if (value.ImageName == "INCOME" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.foUrl = value.ImageUrl;
						if (value.ImagePath.toUpperCase().indexOf("PDF") > -1) {
							$('.income-img .file-input').empty();
							$('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
							$('#incomeImage .file-input').empty();
							$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">ÃƒÆ’Ã¢â‚¬â€</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><embed src="data:application/pdf;base64,' + value.ImageUrl + '" type="application/pdf" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \',\'pdf\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						} else {

							$('.income-img .file-input').empty();
							$('.income-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs">Change</span><input type="file" accept="image/*" class="input-upload" id="Income" onchange="imgUpld(\'Income\');"></div></div></div>');
							$('#incomeImage .file-input').empty();
							$('#incomeImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + '\')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');
						}
						$scope.foUpdt = true;
						$scope.foName = 'Income';
						$rootScope.formData.foImage = value.ImageUrl;
						$scope.foImg_reShow = true;
						$rootScope.formData.fields.foDocumentProof = (value.DocTypeID).toString();
						num++;
					}

					if (value.ImageName == "RM" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.rmUrl = value.ImageUrl;

						$('.tc-img .file-input').empty();
						$('.tc-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="RMSIGNATURE" onchange="imgUpld(\'RMSIGNATURE\');"></div></div></div>');
						$('#RMSIGNATUREIMAGE .file-input').empty();
						$('#RMSIGNATUREIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.tcUpdt = true;
						$rootScope.formData.tcImage = value.ImageUrl;
						$scope.tcImg_reShow = true;
						num++;
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

					if (value.ImageName == "NOMINEE" && value.ImageUrl != null && value.ImageUrl != '') {
						$rootScope.formData.nomineeUrl = value.ImageUrl;

						$('.nominee-img .file-input').empty();
						$('.nominee-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="NOMINEEPROOF" onchange="imgUpld(\'NOMINEEPROOF\');"></div></div></div>');
						$('#NOMINEEPROOFIMAGE .file-input').empty();
						$('#NOMINEEPROOFIMAGE').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + value.ImageUrl + '" class="kv-preview-data file-preview-image" title="" alt="PAN Card" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + value.ImageUrl + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

						$scope.nomineeUpdt = true;
						$rootScope.formData.nomineeImage = value.ImageUrl;
						$scope.nomineeImg_reShow = true;
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

					setTimeout(function () {
						$(".select").select2();
					}, 1000);
				});
			} else {}

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
		}).error(function () {
			$rootScope.formData.apiLoading = false;
		});
	}

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
				'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
				'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
				'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
				'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
			}

			$rootScope.formData.apiLoading = true;
			$rootScope.docgetAPI = true;
			serverService.apiCall(s_url1, sendData1).success(function (response) {
				$rootScope.formData.apiLoading = false;
				if (response.EncryptToken) {
					$rootScope.EncryptToken = response.EncryptToken;
					localStorage.setItem('AxToken', response.EncryptToken);
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

			}).error(function () {
				$rootScope.formData.apiLoading = false;
			});
		}
	}
	if (!localStorage.getItem('AxToken') || !$rootScope.EncryptToken) {
		$scope.getDocInfo();
		$scope.getToken = true;
		var url = "GetEncrptToken";
		var sendData = {
			ReferenceNumber: localStorage.getItem('AxNo')
		}
		/*$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).success(function (data) {
		$rootScope.formData.apiLoading = false;
		if (data.EncryptToken) {
		$rootScope.EncryptToken = data.EncryptToken;
		localStorage.setItem('AxToken', data.EncryptToken);
		if (!$scope.getToken) {

		}
		}
		});*/

	} else {
		$scope.getDocInfo();
	}

	$rootScope.$on("getAPI", function (evt, data) {
		if ($rootScope.formData.threeinone) {
			$rootScope.formData.apiLoading = true;
			setTimeout(function () {
				$rootScope.getAPI = false;
				if (!$scope.getToken) {
					$scope.getDocInfo();
				}
			}, 2000)
		}
	});
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
			} else {
				/*	var s_url = "DIYUpdateIPVStage";
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
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(s_url, sendData).success(function (response) {

				if (response == '1' || response == '100') {
				$rootScope.EncryptToken = '';
				localStorage.removeItem('AxToken');
				$rootScope.formData.apiLoading = false;
				$rootScope.openThankyouPage();

				}

				});*/
			}
		} else {
			var error = 0;
			if (!$scope.panImageUpdt) {
				$scope.panImgError = true;
				$("html, body").animate({
					scrollTop: $("#PANNumber").offset().top
				});
				error++;
			}
			if (!$scope.signatureUpdt) {
				$scope.signatureImgError = true;
				$("html, body").animate({
					scrollTop: $("#SPECIMENPROOF").offset().top
				});
				error++;
			}
			if (!$scope.photoImageUpdt) {
				$scope.photoImgError = true;
				$("html, body").animate({
					scrollTop: $("#ClientPhoto").offset().top
				});
				error++;
			}
			if (!$rootScope.formData.threeinone && !$scope.bankUpdt) {
				$scope.bankImgError = true;
				$("html, body").animate({
					scrollTop: $("#BankCheque").offset().top
				});
				error++;
			}
			if (!$scope.cAddressUpdt) {
				$scope.cAddressImgError = true;
				$("html, body").animate({
					scrollTop: $("#CorrespondenceAddress").offset().top
				});
				error++;
			}
			if ($scope.paddrUpld && !$scope.pAddressUpdt) {
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

			if ($rootScope.formData.RMModule && !$scope.tcUpdt) {
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

			// if ($scope.getAadharImage && !$scope.aadharImageUpdt)
			// {
			//     $scope.aadharImgError = true;
			// 	$("html, body").animate({ scrollTop: $("#Aadhar").offset().top });
			//     error++;
			// }
			if (process == 'esign') {
				error = 0;
			}
			if (error == 0) {

				if (process == 'esign') {
					var url = 'GenerateESignPDF?ReferenceNumber=' + $rootScope.formData.ReferenceNumber;
					$rootScope.formData.apiLoading = true;
					var tokenParams = {
						'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
						'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
						'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
						'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
					}
					serverService.apiEsignCall(url, tokenParams).then(function (response) {
						$rootScope.formData.apiLoading = false;
						if (response.IsSuccess) {
							window.location.assign(response.eSignApiUrl);
						}
					});

				} else {

					$scope.updateIPVStage('');

				}

			}
		}
	}

	$scope.updateIPVStage = function (process) {

		var ipvOtpUrl = 'IPVOTPGenerationNew';
		$rootScope.formData.apiLoading = true;
		var ipvData = {
			ReferenceNumber: $rootScope.formData.ReferenceNumber,
			Mobile: $rootScope.formData.fields.mobile,
			BrowserType: $rootScope.formData.browserType
		};
		serverService.apiCall(ipvOtpUrl, ipvData).success(function (response) {
			$rootScope.formData.apiLoading = false;
			var url = 'IPVSystem.aspx?ReferenceNumber=' + $rootScope.IPVRedirectURL;
			serverService.apiIPVCall(url).success(function (response) {
				//console.log("Response : " + response);
			});
		});

		/*var s_url = "DIYUpdateIPVStage";
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
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(s_url, sendData).success(function (response) {

		if (response == '1' || response == '100') {
		$rootScope.EncryptToken = '';
		localStorage.removeItem('AxToken');
		$rootScope.formData.apiLoading = false;
		if (!$scope.otpSuccess) {
		$rootScope.openThankyouPage();
		}else{
		$state.go('complete', {
		mobile: $rootScope.formData.EncMobile
		});
		setTimeout(function () {
		$('#downloadPOA').modal({
		keyboard: false,
		backdrop: 'static'
		});
		}, 1000)
		}
		}

		});*/
	}

	$scope.displayForm = function () {
		var error = 0;
		if ($scope.signatureUpld && !$scope.signatureUpdt) {
			$scope.signatureImgError = true;
			$("html, body").animate({
				scrollTop: $("#SPECIMENPROOF").offset().top
			});
			error++;
		}
		if ($scope.panUpld && !$scope.panImageUpdt) {
			$scope.panImgError = true;
			$("html, body").animate({
				scrollTop: $("#PANNumber").offset().top
			});
			error++;
		}
		if ($scope.photoUpld && !$scope.photoImageUpdt) {
			$scope.photoImgError = true;
			$("html, body").animate({
				scrollTop: $("#ClientPhoto").offset().top
			});
			error++;
		}
		if ($scope.chequeUpld && !$scope.bankUpdt) {
			$scope.bankImgError = true;
			$("html, body").animate({
				scrollTop: $("#BankCheque").offset().top
			});
			error++;
		}
		if ($scope.addressUpld && !$scope.cAddressUpdt) {
			$scope.cAddressImgError = true;
			$("html, body").animate({
				scrollTop: $("#CorrespondenceAddress").offset().top
			});
			error++;
		}
		if ($scope.addressUpld && $scope.paddrUpld && !$scope.pAddressUpdt) {
			$scope.pAddressImgError = true;
			$("html, body").animate({
				scrollTop: $("#PermenantAddress").offset().top
			});
			error++;
		}

		const AgreeTC = $('#agree-terms').iCheck('update')[0].checked;
		if (!AgreeTC) {
			$scope.termsError = true;
			error++;
		}

		if (error == 0) {
			if ($rootScope.formData.RMModule) {
				var s_url = "RMSendSmsToUser";
				var sendData = {
					"ReferenceNumber": $rootScope.formData.ReferenceNumber,
				}
				serverService.apiCall(url, sendData).success(function (response) {
					$rootScope.clearBrowsingData();
					$('#APIResponse').modal({
						backdrop: 'static',
						keyboard: false
					});
					$rootScope.apiResponseErrorMsg = "URL sent as SMS to customer to complete payment";
					return false;
				});
			}
			else {
				if ($rootScope.formData.ckyClient) {
					$scope.signatureButtons = true;
				}
				if ($scope.ckycKRA) {
					$scope.getOTP();
				}
				$('#formPDF').modal({
					backdrop: 'static',
					keyboard: true
				});
				//For APPServer
				$scope.objURl = "https://104.37.189.180:8036/AxisPDF/index.html?ReferenceNumber=" + $rootScope.formData.eRefNumber;
				//For UAT
				//$scope.objURl = "https://192.168.213.23:9443/AxisPDF/index.html?ReferenceNumber=" + $rootScope.formData.eRefNumber;
				//$scope.signatureButtons = true;
				//For Live
				//$scope.objURl = "https://apidigitalao.axisdirect.in/AxisPDF/index.html?ReferenceNumber=" + $rootScope.formData.eRefNumber;
			}
		}
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

		/*if($scope.ckycKRA){
		$scope.getOTP();
		} */

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
		//serverService.apiTokenCall(url, sendData, tokenParams).success(function (response) {
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).success(function (response) {
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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

		}).error(function () {
			$rootScope.formData.apiLoading = false;
			$('#connection').modal('show');
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
		serverService.apiCall(url, sendData).success(function (response) {
			$rootScope.formData.apiLoading = false;
			if (response.EncryptToken) {
				$rootScope.EncryptToken = response.EncryptToken;
				localStorage.setItem('AxToken', response.EncryptToken);
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

		}).error(function () {
			$rootScope.formData.apiLoading = false;
			$('#connection').modal('show');
		});
	}

	$scope.sendSMSToCustomer = function () {
		var tokenParams = {
			'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
			'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '') ? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
			'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '') ? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
			'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '') ? $rootScope.formData.dob : localStorage.getItem('DOB'),
		}
		var smsUrl = "DocumentUrlSend";
		var referenceNo = $rootScope.formData.ReferenceNumber;
		var sendData = {
			ReferenceNumber: referenceNo
		};
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(smsUrl, sendData).success(function (response) {
			$rootScope.formData.apiLoading = false;
		});
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

	if ($rootScope.formData.isMobile) {
		setTimeout(function () {
			$(".clientPhoto .input-upload").fileinput({
				'showUpload': false,
				'browseLabel': 'UPLOAD',
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

		navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false
		})
		.then(function (stream) {
			video.srcObject = stream;
			video.play();
		})
		.catch(function (err) {
			console.log("An error occurred: " + err);
		});

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
	}

});
