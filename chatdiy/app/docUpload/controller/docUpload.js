

function imgUplds(id) {
	if (id == 'BankCheque')
		angular.element(document.getElementById("BankCheque")).scope().imgUpload('BankCheque');
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
mainChatApp.controller('docController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {

			var searchObject = $location.search();
			$scope.chequeImageValidation = '';
			$scope.chequeSample = false;
			$scope.bankUpdt = false;
			if (!angular.isUndefined(searchObject.ReferenceNumber)) {

				sessionStorage.removeItem('AxToken');
				$rootScope.EncryptToken = '';
				sessionStorage.setItem('AxNo', searchObject.ReferenceNumber);

			}

			if (!angular.isUndefined(searchObject.eSignFailure)) {
				$('#APIResponse').modal({
					backdrop: 'static',
					keyboard: true
				})
				$rootScope.apiResponseErrorMsg = 'Esign process is incomplete, please try again.';
			}

			$scope.chequeSample = false;

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

			$scope.esingProcess = function(){
					var e_url = 'GenerateESignPDFForKarvy?PanNumber=' + $rootScope.karvyData.PANNO;
					$rootScope.formData.apiLoading = true;

					serverService.getApi(e_url).then(function (a) {
						var data =  a.data
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
							$('#customerSMS').modal({
								backdrop: 'static',
								keyboard: false
							});
							$rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
							return false;
						}
					});
			}

			$scope.getImages = function () {
				var s_url = "GetKarvyTcsCustomerInformation";
				var sendData = {
					PanNumber: $rootScope.karvyData.PANNO
				}

				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						if(response.KarvyTcsData[0].IsNameMatched == 'Y'){
							$scope.esingProcess()
						}
						sessionStorage.setItem('karvyData', JSON.stringify(response.KarvyTcsData[0]));
						if(response.KarvyTcsData[0].CheckImageBase64 != null && response.KarvyTcsData[0].CheckImageBase64 != ''){
							$('.bank-img .file-input').empty();
							$('.bank-img .file-input').append('<div class="input-group file-caption-main"><div class="input-group-btn"><div tabindex="500" class="btn btn-primary btn-file" style="width: 100px;"><span class="hidden-xs text-uppercase">Change</span><input type="file" accept="image/*" class="input-upload" id="BankCheque" onchange="imgUpld(\'BankCheque\');"></div></div></div>');
							$('#bankImage .file-input').empty();
							$('#bankImage').append('<div class="file-input"><div class="file-preview"><div class="close fileinput-remove">Ãƒâ€”</div><div class="file-drop-disabled"><div class="file-preview-thumbnails"><div class="file-live-thumbs"><div class="file-preview-frame" id="preview-1486031857317-0" data-fileindex="0" data-template="image"><div class="kv-file-content"><img src="data:image/jpeg;base64,' + response.KarvyTcsData[0].CheckImageBase64 + '" class="kv-preview-data file-preview-image" title="" alt="Cancelled cheque" style="width:auto;height:160px;"></div><div class="file-thumbnail-footer"><div class="file-footer-caption" title="PAN Card01.jpg">PAN_Card01.jpg </div><div class="file-actions"><div class="file-footer-buttons" onclick="setUrl(\'' + response.KarvyTcsData[0].CheckImageBase64 + ' \')" data-toggle="modal" data-target="#getImgModal"><button type="button" class="kv-file-zoom btn btn-xs btn-default" title="View Details"><i class="glyphicon glyphicon-zoom-in"></i></button></div><div class="file-upload-indicator" title="Not uploaded yet"><i class="glyphicon glyphicon-hand-down text-warning"></i></div><div class="clearfix"></div></div></div></div></div></div><div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div><div class="kv-fileinput-error file-error-message" style="display: none;"></div></div></div><div class="kv-upload-progress hide"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;">0%</div></div></div></div>');

							$scope.bankUpdt = true;
							$scope.chequeImageValidation = true;
						}
					}
				});
			}

			$scope.getImages();

			$scope.imgUpload = function (imgName) {
				var imageName = imgName;
				$scope.IsSelfi = 'N';
				var filesSelected = document.getElementById(imgName).files;

				var fileSize = (filesSelected[0].size);

				var fileName = document.getElementById(imgName).value;

				var preview = document.getElementById("preview");

				var allowed_extensions = new Array("jpg", "png", "jpeg");

				var file_extension = fileName.split('.').pop();
				file_extension = file_extension.toLowerCase();
				var file_index = allowed_extensions.indexOf(file_extension);

				$('#badImage').modal('hide');
				if (file_index <= 2 && file_index >= 0) {
					$scope.FileType = "Image";
					if (imgName == "BankCheque") {
						imageName = "BankCheque";
						$scope.bankSizeError = false;
						$scope.bankQImgError = false;
						if (fileSize > 4194304) {
							$scope.bankSizeError = true;
						} else {
							var imgFormData = new FormData();
							imgFormData.append("email_id", ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '') ? $rootScope.formData.fields.email : sessionStorage.getItem('RxEmail'));
							imgFormData.append("api_key", "C4483-E85E7BB44-15D3C929F383B6D");
							imgFormData.append("file", filesSelected[0]);
							$rootScope.formData.apiLoading = true;

							$scope.readfiles(filesSelected, imageName);
						}
						$scope.$apply();
					}

				} else {
					if (imgName == "BankCheque") {
						$('#BankCheque').val('');
						$scope.banktypeError = true;
						$scope.$apply();
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

				//		preview.appendChild(canvas);

				return canvas.toDataURL("image/jpeg", 1);

			}

			$scope.update_img = function (imgName, imgValue, resized) {

				if (imgName == "BankCheque") {
					$('#BankCheque').val('');
					$('#bankImage .file-input').empty();
					$scope.bankLoad = true;
					$scope.banktypeError = false;
				}

				$scope.updateImage(imgName, imgValue, $scope.FileType, '');

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
				if ($scope.ipvStage) {
					$scope.ipvStage = false;
				}
				var s_url = "KarvyImageUpload";
				$rootScope.formData.apiLoading = true;

				var sendData = {
					ImageName: imgName,
					Image: imgValue,
					PanNumber: $rootScope.karvyData.PANNO,
					Extention: fileType,
					ChequeType: 1,
					IsDiy: true,
					IsIPV: "0",
					EncryptToken: $rootScope.EncryptToken,
					IsSelfi: 'N'
				}

				serverService.apiCall(s_url, sendData).then(function (response) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					$scope.getImages();

					$scope.bankUpdt = true;
					$scope.chequeImageValidation = true;
					$scope.bankLoad = false;
					$scope.bankImgError = false;
					$scope.banktypeError = false;

					if (response.IsSuccess) {}

				});
			}

			$('label.agreeTerms input[type="checkbox"]').on("ifChecked", function () {
				$rootScope.formData.fields.termsAccept = true;
				$scope.termsError = false;
				$scope.$apply();
			}).on("ifUnchecked", function () {
				$rootScope.formData.fields.termsAccept = false;
				$scope.$apply();
			});

			$scope.displayForm = function () {

				var error = 0;

				if (!$scope.bankUpdt) {
					$scope.bankImgError = true;
					$("html, body").animate({
						scrollTop: $("#BankCheque").offset().top
					});
					error++;
				}

				const AgreeTC = $('#agree-terms').iCheck('update')[0].checked;
				if (!AgreeTC) {
					$scope.termsError = true;
					error++;
				}
				if (error == 0) {

					$scope.esingProcess()

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
			}

			$scope.termsModal = function () {
				$('#documentUploadterms').modal({
					backdrop: 'static',
					keyboard: true
				})
			}

		}
	]);
