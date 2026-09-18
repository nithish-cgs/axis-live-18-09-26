mainChatApp.controller('transferController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {
			if (sessionStorage.getItem('RMModule') == 'true' && sessionStorage.getItem('baTeamLead') == 'Y') {
				$rootScope.formData.RMModule = true;
				if (!$rootScope.formData.rmcode) {
					if (sessionStorage.getItem('RMCode')) {
						$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
						$rootScope.formData.fields.rmid = sessionStorage.getItem('RMID');
					} else {
						sessionStorage.clear();
						$rootScope.emailMobile = true;
						$rootScope.pan = false;
						$state.go('register');
					}
				}
			}
			if (!$rootScope.formData.RMModule) {
				sessionStorage.clear();
				$rootScope.emailMobile = true;
				$rootScope.pan = false;
				$state.go('register');
			}

			var dateStr = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24 * 90);
			var date = dateStr.getDate();
			var month = (dateStr.getMonth() + 1);
			var year = dateStr.getFullYear();
			$scope.fromDt = month + "/" + date + "/" + year;

			var tdateStr = new Date();
			var tdate = tdateStr.getDate();
			var tmonth = (tdateStr.getMonth() + 1);
			var tyear = tdateStr.getFullYear();
			$scope.toDt = tmonth + "/" + tdate + "/" + tyear;
			$(document).on('focus', '.select2', function (e) {
				if (e.originalEvent) {
					$(this).siblings('select').select2('open');
				}
			});
			$(".select").select2();

			$scope.getRmDetails = function () {
				var s_url = 'GetWebRMDetails';
				var sendData = {
					RMEmployeeId: $rootScope.formData.fields.rmid,
					Mode: "R"
				}
				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					if (response.IsSuccess) {
						$scope.rmDetailsList = response.dataTable;
					}
				})
			}

			$scope.getRmDetails();

			$scope.getDate = function (element) {
				var date;
				var dateFormat = "mm/dd/yy";

				date = $.datepicker.parseDate(dateFormat, element.value);

				return date;
			}

			$("#fromDt").datepicker({
				changeMonth: true,
				changeYear: true,
				maxDate: "0",
				dateFormat: 'mm/dd/yy',
				onSelect: function () {
					var dateStr = $('#fromDt').datepicker()[0].value.split("/");
					var date = dateStr[1];
					var month = dateStr[0];
					var year = dateStr[2];
					$scope.fromDt = month + "/" + date + "/" + year;
					$("#toDt").datepicker("option", "minDate", $scope.getDate(this));
					$scope.getRmList();
				}
			});

			$("#toDt").datepicker({
				changeMonth: true,
				changeYear: true,
				maxDate: "0",
				dateFormat: 'mm/dd/yy',
				onSelect: function () {
					var tdateStr = $('#toDt').datepicker()[0].value.split("/");
					var tdate = tdateStr[1];
					var tmonth = tdateStr[0];
					var tyear = tdateStr[2];
					$scope.toDt = tmonth + "/" + tdate + "/" + tyear;
					$("#fromDt").datepicker("option", "maxDate", $scope.getDate(this));
					$scope.getRmList();
				}
			});

			$scope.example13model = [];
			$scope.example13settings = {
				smartButtonMaxItems: 4
			};

			$scope.getRmList = function () {
				var url = "GetWebRMTransferList";

				var sendData = {
					RMEmployeeId: $rootScope.formData.fields.rmid,
					FromDate: $scope.fromDt,
					ToDate: $scope.toDt,
					Mode: "R"
				}

				$scope.example13data = [];
				$rootScope.formData.apiLoading = true;
				serverService.apiCall(url, sendData).then(function (a) {
					var response = a.data;
					$rootScope.formData.apiLoading = false;
					if (response.IsSuccess) {
						for (i = 0; i < response.dataTable.length; i++) {
							if (response.dataTable[i].PaymentStatus == 'No') {
								$scope.example13data.push({
									'id': i + 1,
									'label': response.dataTable[i].PANNumber + ' - ' + response.dataTable[i].RMUserName,
									'val': response.dataTable[i].ReferenceNumber
								});
							} else {
								$scope.example13data.push({
									'id': i + 1,
									'label': response.dataTable[i].ReferenceNumber + ' - ' + response.dataTable[i].RMUserName,
									'val': response.dataTable[i].ReferenceNumber
								});
							}
						}
					}
				})
			}

			$scope.getRmList();

			$scope.tfr = function () {
				var error = 0;
				if (!$scope.rmList) {
					$scope.rmListError = true;
					error++;
					return false;
				}else{
					$scope.rmListError = false;
				}

				$scope.refNumberListError = false;
				$scope.refNumberList = '';
				if ($scope.example13model.length != 0) {
					for (i = 0; i < $scope.example13model.length; i++) {
						if ($scope.refNumberList) {
							$scope.refNumberList = $scope.refNumberList + ',' + $scope.example13model[i].val;
						} else {
							$scope.refNumberList = $scope.example13model[i].val;
						}
					}
				} else {
					$scope.refNumberListError = true;
					error++;
					return false;
				}

				//var s_url = "WebRMTransfer";
				var s_url = "WebBulkTransfer ";
				var sendData = {
					"AssignRMId": $scope.rmList,
					"ReferenceNumberS": $scope.refNumberList,
					"CreatedByRMId": $rootScope.formData.fields.rmid,
					"Mode": "R"
				}

				serverService.apiCall(s_url, sendData).then(function (a) {
					var response = a.data;
					$scope.refNumberList = '';
					$scope.example13model = [];
					$scope.getRmList();
					$rootScope.formData.btnOk = true;
					if (response.IsSuccess) {
						$('#APIResponse').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.apiResponseErrorMsg = "RM Transfer Successfull";
					} else {
						$('#APIResponse').modal({
							backdrop: 'static',
							keyboard: false
						});
						$rootScope.apiResponseErrorMsg = "RM Transfer Failed";
					}
				})
			}

		}
	]);
