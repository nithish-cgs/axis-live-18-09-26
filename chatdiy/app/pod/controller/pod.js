mainChatApp.controller('podController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {
	if (sessionStorage.getItem('RMModule') == 'true') {
		$rootScope.formData.RMModule = true;
		if (!$rootScope.formData.rmcode) {
			if (sessionStorage.getItem('RMCode')) {
				$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
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

	var dateStr = new Date();
	var date = dateStr.getDate();
	var month = (dateStr.getMonth() + 1);
	var year = dateStr.getFullYear();
	$rootScope.formData.fields.toDt = date + "/" + month + "/" + year;
	$scope.example13model = [];
	$scope.example13settings = {
		smartButtonMaxItems: 4
	};

	$("#courierDt").datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		onSelect: function () {
			var dateStr = $('#courierDt').datepicker()[0].value.split("/");
			var date = dateStr[0];
			var month = dateStr[1];
			var year = dateStr[2];
			$rootScope.formData.fields.courierDt = date + "/" + month + "/" + year;
		}
	});

	$scope.getPODDetails = function () {
		var url = "GetAllPODBYRMCode"
			var sendData2 = {
			"RMEmployeeCode": $rootScope.formData.fields.rmcode
		}
		$rootScope.wizardShow = false;
		$rootScope.formData.RMReferenceNumber = false;
		$rootScope.formData.apiLoading = true;
		$rootScope.decryptUrl()
		serverService.apiCall(url, sendData2).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				$scope.podList = response.PodDetails;
				setTimeout(function () {
					$('#podList').DataTable({
						orderCellsTop: true,
						fixedHeader: false
					});

				}, 100);
			} else {
				$('#podList').DataTable();
			}
		}).error(function () {
			$rootScope.formData.apiLoading = false;
		})
	}

	$scope.getPOD = function () {
		var error = 0;
		if ($scope.example13model.length != 0) {
			$scope.refNumberListError = false;
			$rootScope.formData.fields.refNumberList = [];
			for (i = 0; i < $scope.example13model.length; i++) {
				$rootScope.formData.fields.refNumberList.push($scope.example13model[i].label);
			}
			$rootScope.formData.fields.refNumberList = $rootScope.formData.fields.refNumberList.join(', ');
		} else {
			$scope.refNumberListError = true;
			error++;
		}
		var fields = $('#podInput input[type=text]');
		var field = '';
		var fieldvalue = '';
		fields.each(function () {
			var value = $(this).val();
			if (value.length < 1) {
				if (this.id != "podRemarks") {
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
			} else if ($rootScope.NumberValidation($rootScope.formData.fields.courierNo) == true) {
				$scope.courierNoError = true;
				error++;
			} else {
				var a = this.id + 'Error';
				$scope[a] = false;
			}
		});

		if (error == 0) {
			var url = "PODDetailsUpdate";
			var sendData = {
				"PODId": $rootScope.formData.fields.podID,
				"CourierNumber": $rootScope.formData.fields.courierNo,
				"ReferenceNumber": $rootScope.formData.fields.refNumberList,
				"PODRemarks": $rootScope.formData.fields.podRemarks,
				"CompanyName": $rootScope.formData.fields.companyName,
				"DateOfCourier": $rootScope.formData.fields.courierDt,
				"Status": "Y",
				"RMCode": $rootScope.formData.fields.rmcode
			}

			$rootScope.formData.apiLoading = true;
			serverService.apiCall(url, sendData).then(function (a) {
				var response = a.data;
				$("#podList").dataTable().fnDestroy();
				$rootScope.formData.apiLoading = false;
				$rootScope.formData.fields.courierNo = '';
				$rootScope.formData.fields.podRemarks = '';
				$rootScope.formData.fields.companyName = '';
				$rootScope.formData.fields.courierDt = '';
				$('#courierDt').datepicker('setDate', null); ;
				$scope.example13model = [];
				$rootScope.formData.fields.refNumberList = [];
				$scope.getPODDetails();
			})
		}
	}

	$rootScope.NumberValidation = function (number) {
		var re = /^(\d)\1+$/g;
		return re.test(number);
	}

	$scope.getRmList = function () {
		//var url = "GetRMOverallList";
		var url = "GetPodDropdownRef";

		var sendData = {
			RMEmployeeCode: $rootScope.formData.fields.rmcode,
			RegistrationDate: '16/3/2017',
			RegistrationDateUntil: $rootScope.formData.fields.toDt,
			RoleName: $rootScope.formData.roleName
		}
		$scope.example13data = [];
		$rootScope.formData.apiLoading = true;
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				for (i = 0; i < response.OverallRMResponseList.length; i++) {
					$scope.example13data.push({
						'id': i + 1,
						'label': response.OverallRMResponseList[i].ReferenceNumber
					});
				}
				$scope.getPODDetails();
			}
		})
	}

	$scope.getRmList();

	$('#podList thead tr').clone(true).appendTo('#podList thead');
	$('#podList thead tr:eq(1) th').each(function (i) {
		var title = $(this).text();
		$(this).html('<input type="text" placeholder="Search ' + title + '" />');

		$('input', this).on('keyup change', function () {
			if ($('#podList').DataTable().column(i).search() !== this.value) {
				$('#podList').DataTable()
				.column(i)
				.search(this.value)
				.draw();
			}
		});
	});

}]);
