mainChatApp.controller('rmController', ['$scope', '$rootScope', '$state', 'serverService', '$location', function ($scope, $rootScope, $state, serverService, $location) {
	if(sessionStorage.getItem('RMModule') == 'true'){
		$rootScope.formData.RMModule = true;
		if(!$rootScope.formData.rmcode){
			if(sessionStorage.getItem('RMCode')){
			$rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
			}
			else{				
				sessionStorage.clear();
				$rootScope.emailMobile = true;
				$rootScope.pan = false;
				$state.go('register');
			}
		}
	}
	if(!$rootScope.formData.RMModule){
		sessionStorage.clear();
		$rootScope.emailMobile = true;
		$rootScope.pan = false;
		$state.go('register');
	}
	
	$rootScope.formData.overallList  = '';
	$scope.clientComplete = '0';
	$scope.agentComplete = '3';
	$scope.query = '';
	var dateStr = new Date((new Date()).valueOf() - 1000*60*60*24*90);
	var date = dateStr.getDate();
	var month = (dateStr.getMonth() + 1);
	var year = dateStr.getFullYear();
	$rootScope.formData.fields.fromDt = date + "/" + month + "/" + year;
	
	var tdateStr = new Date();
	var tdate = tdateStr.getDate();
	var tmonth = (tdateStr.getMonth() + 1);
	var tyear = tdateStr.getFullYear();
	$rootScope.formData.fields.toDt = tdate + "/" + tmonth + "/" + tyear;

	$(document).on('focus', '.select2', function (e) {
        if (e.originalEvent) {
            $(this).siblings('select').select2('open');
        }
    });
	$(".select").select2();

	$scope.getRmList = function () {
		var url = "GetRMOverallList";

		var sendData = {
			RMEmployeeCode: $rootScope.formData.fields.rmcode,
			RegistrationDate: $rootScope.formData.fields.fromDt,
			RegistrationDateUntil: $rootScope.formData.fields.toDt,
			ClientComplete : $scope.clientComplete,
			AgentComplete: $scope.agentComplete,
			ReferenceNumber: $scope.searchWB,
			RoleName: $rootScope.formData.roleName,
			Email: $scope.searchEmail,
			Mobile: $scope.searchMobile,
			PanNumber: $scope.searchPan
		}
		$rootScope.wizardShow = false;
		$rootScope.formData.RMReferenceNumber = false;
		$rootScope.formData.overallList  = '';
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			if (response.IsSuccess) {
				$rootScope.formData.overallList = response.OverallRMResponseList;
				setTimeout(function(){
				$('[data-toggle="tooltip"]').tooltip(); 
				},1000)
				$rootScope.decryptUrl()
			}
		})
	}
	
	$scope.getDate = function(element) {
      var date;
	  var dateFormat = "dd/mm/yy";
     
        date = $.datepicker.parseDate( dateFormat, element.value );
     
      return date;
    }

	$("#fromDt").datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		onSelect: function () {
			var dateStr = $('#fromDt').datepicker()[0].value.split("/");
			var date = dateStr[0];
			var month = dateStr[1];
			var year = dateStr[2];
			$rootScope.formData.fields.fromDt = date + "/" + month + "/" + year;
			$("#toDt").datepicker( "option", "minDate", $scope.getDate( this ) );
			$scope.getRmList();
		}
	});
	
	$("#toDt").datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: "0",
		dateFormat: 'dd/mm/yy',
		onSelect: function () {
			var tdateStr = $('#toDt').datepicker()[0].value.split("/");
			var tdate = tdateStr[0];
			var tmonth = tdateStr[1];
			var tyear = tdateStr[2];
			$rootScope.formData.fields.toDt = tdate + "/" + tmonth + "/" + tyear;
			$("#fromDt").datepicker( "option", "maxDate", $scope.getDate( this ) );
			$scope.getRmList();
		}
	});

	$rootScope.rmList = true;
	$scope.getRmList();
	
	$scope.generatePOA = function (ref, type) {
		var url = "DIYGeneratePOA";
		var sendData;

		if (type == 'poa') {
			sendData = {
				ReferenceNumber: ref,
				"IsPOAGenerate": true,
				"IsAOFGenerate": false,
				"IsPOADownload": false,
				"IsAOFDownload": false
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
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				$('#rejectModal').modal();
				$scope.reason = type.toUpperCase() + ' generated, please wait for few minutes to download it.'
			} else {}
		}).error(function () {
			$rootScope.formData.apiLoading = false;
		})
	}
	
	$scope.downloadPOA = function (ref, type) {
		var url = "DIYGeneratePOA";
		var sendData;
		console.log(ref)
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
			var response = a.data;
			$rootScope.formData.apiLoading = false;
			if (response.IsSuccess) {
				var link = document.createElement("a");
				link.download = ref+'_'+type+'.pdf';
				if(type=='poa'){
					link.href = "data:application/pdf;base64," + response.POABase64;
				}else{
					link.href = "data:application/pdf;base64," + response.AOFBase64;
				}
				link.click();
			} else {}
		}).error(function () {
			$rootScope.formData.apiLoading = false;
		})
	}
	
	$scope.rejecModal = function(ref){
		
		var url = "GetRejectionRemarks"
		
		var sendData = {ReferenceNumber : ref}
		serverService.apiCall(url, sendData).then(function (a) {
			var response = a.data;
			if(response.IsSuccess){
				if(response.SuccessMessage){
					$('#rejectModal').modal();
					$scope.reason = response.SuccessMessage;
				}else{
					$scope.reason = "Please contact back office administrator";
				}
			}
		})
		
	}	

}]);
