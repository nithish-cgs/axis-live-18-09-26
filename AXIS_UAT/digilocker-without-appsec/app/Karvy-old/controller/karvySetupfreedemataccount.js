mainApp.controller('karvySetupfreedemataccountController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
   

    $rootScope.webkarvy = true;
    sessionStorage.setItem('webKarvy' , true)
    if ((webkarvy && webkarvy.toLowerCase() == 'true') || $rootScope.webkarvy) {
        $rootScope.webkarvy = true;
        $rootScope.emailMobile = false;
        $rootScope.pan = false;
        $rootScope.webKarvyShow = true
    } else {
        $rootScope.webkarvy = false;
    }


    if (sessionStorage.getItem('webKarvy') && sessionStorage.getItem('webKarvy') == 'true') {
        if (sessionStorage.getItem('karvyData')) {
            $rootScope.karvyData = JSON.parse(sessionStorage.getItem('karvyData'));
            $rootScope.karvyDOB = $rootScope.karvyData.DOB;
            $rootScope.emailMobile = false;
            $rootScope.pan = false;
            $rootScope.webKarvyShow = false
            $rootScope.proceeddetailsshow = true;
        } else {
            $rootScope.emailMobile = false;
            $rootScope.pan = true;
        }
        $rootScope.webkarvy = true;
    }
    setTimeout(function () {
        $("#txtDOB").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: "-100Y",
            maxDate: "-18Y",
            dateFormat: 'dd/mm/yy',
            yearRange: "-100: -18",
            onSelect: function () {
                $('#txtDOB').removeClass('ng-empty');
                $('#txtDOB').addClass('ng-not-empty');
                $scope.dobError = false;
                $rootScope.formData.hideBtn = false;
                $scope.$apply();
            }
        });
        $("#txtDOB").datepicker("option", "showAnim", "blind");
    }, 100)

    $scope.karvyInfoEcomPan = function () {
        var url = "EcommercePanSiteValidation";
            var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
            var date = dateStr[0];
            var month = dateStr[1];
            var year = dateStr[2];
            var NewDate = date + "/" + month + "/" + year;
            $rootScope.formData.fields.DOB = NewDate;
            var userDob = $rootScope.formData.fields.DOB;
            $rootScope.formData.dob = userDob;
            $rootScope.formData.fields.panNumber = $rootScope.formData.fields.panNumber.toUpperCase();
            
            if ($rootScope.formData.RMModule || sessionStorage.getItem('RMModule') == 'true') {
                mode = 'R';
            }
            
            var sendData = {
                PanNumber: $rootScope.formData.fields.panNumber,
                DOB: $rootScope.formData.dob,
                Mode: mode,
                Mobile: $rootScope.formData.fields.mobile,
                Email: $rootScope.formData.fields.email,
                RMCode: $rootScope.formData.fields.rmcode,
                EmployeeId: $rootScope.formData.fields.rmid,
                IsDiy: true,
                EncryptToken: $rootScope.EncryptToken
            };
            serverService.apiCall(url, sendData).then(function (a) {
                // $scope.karvyInfo()
                $scope.karvyInfoEcomPan()
            })

    }
    $scope.KaresingProcess = function(){
        var e_url = 'GenerateESignPDFForKarvy?PanNumber=' + $rootScope.karvyData.PANNO;
        $rootScope.formData.apiLoading = true;

        serverService.getApi(e_url).then(function (a) {
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
                var customerSMSModal = new bootstrap.Modal(document.getElementById('customerSMS'), {
                    backdrop: 'static',
                    keyboard: false
                });
                customerSMSModal.show();
                $rootScope.apiResponseErrorMsg = "Unable to initiate e-sign, please try again later.";
                return false;
            }
        });
    }
    $scope.karvyInfo = function () {
        if($('#txtDOB').val() == ""){
            $scope.dobError = true;
            $scope.ageValid = false;
            return false;
        }
        var s_url = "GetKarvyTcsCustomerInformation";
        var dateStr = $('#txtDOB').datepicker()[0].value.split("/");
            var date = dateStr[0];
            var month = dateStr[1];
            var year = dateStr[2];
            var NewDate = date + "/" + month + "/" + year;
            $rootScope.formData.fields.DOB = NewDate;
            var userDob = $rootScope.formData.fields.DOB;
            $rootScope.formData.dob = userDob;
        var sendData = {
            PanNumber: $rootScope.formData.fields.panNumber,
            DOB: $rootScope.formData.dob,
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
            $rootScope.formData.apiLoading = false;
            if (response.IsSuccess) {
                $scope.emailMobile = false;
                $scope.pan = false;
                $rootScope.webKarvyShow = false;
                $scope.proceeddetailsshow = true;
                $rootScope.karvyData = response.KarvyTcsData[0];
                // var dob = response.KarvyTcsData[0].DOB;
                // dob = response.KarvyTcsData[0].DOB.substring(0, 2) + '/' + response.KarvyTcsData[0].DOB.substring(2, 4) + '/' + response.KarvyTcsData[0].DOB.substring(4, 8);
                // $rootScope.karvyDOB = dob;
                // $rootScope.karvyData.DOB = dob;
                
                setTimeout(() => {
                    $('#acnumber').text(function(_, val) {
                        return val.replace(/\d(?=\d{4})/g, "*");
                      });
                }, 100);
                sessionStorage.setItem('karvyData', JSON.stringify($rootScope.karvyData));
                sessionStorage.setItem('webKarvy', true);
                // $scope.karvyInfoEcomPan()
            } else {
                var APIResponseModal = new bootstrap.Modal(document.getElementById('APIResponse'), {
                    backdrop: 'static',
                    keyboard: false
                });
                APIResponseModal.show();
                if (response.SuccessMessage == "Already account activated") {
                    $rootScope.apiResponseErrorMsg = "Already account activated";
                } else {
                    $rootScope.apiResponseErrorMsg = "User data not found";

                }
            }
        })
    }
    $scope.documentuploadpgae = function () {
        $state.go('bank');
    }
   
    setTimeout(() => {
        $('#acnumber').text(function(_, val) {
            return val.replace(/\d(?=\d{4})/g, "*");
        });
    }, 100);
    $('.setbox').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 100);
		return false;
	});
    // if($rootScope.karvyData){
    //     if($rootScope.karvyData.PANNO || $rootScope.karvyData.PANNO != undefined){
    //         $('#pannumber').val($rootScope.karvyData.PANNO)
    //         $scope.pannumDisabled = true
    //     }
    // }
    $scope.PanVerification = function() {
        $('#loader-cs').show();
        var req = new Object();
        var PanNumber = $('#pannumber').val();
        var Email = $('#email').val();
        var Mobile = $('#mobile').val();
        var PanRegex = new RegExp('^([a-zA-Z]{1,3}[pP]{1,1}[a-zA-Z]{1,1}[0-9]{1,4}[a-zA-Z]{1,1})$');
        if (!PanRegex.test(PanNumber)) {
            $('#loader-cs').hide();
            $('#lblPanValidation').text('Please enter the valid PanNumber');
            $('#lblPanValidation').show();
            $('#pannumber').focus();
            return false;
        }
        //$('#lblmobile').hide();
        $('#lblPanValidation').hide();
        //$('#lblEmail').hide();

        req.PanNumber = PanNumber;
        //req.Email = Email;
        //req.Mobile = Mobile;
        var dataToSend = JSON.stringify(req);
        var s_url = 'KarvyLeadCreation'
        var sendData ={
            PanNumber:PanNumber
        }
        serverService.apiCall(s_url, sendData).then(function (a) {
			var response = a.data;
            if(response.IsSuccess){
                $scope.DoEsign(PanNumber);
            }else{
                $('#loader-cs').hide();
                var x = document.getElementById("panMsgPopup");
                x.style.display = "block";
                var y = document.getElementById("modal-backdrop");
                y.style.display = "block";
            }
        })
    }
    $scope.closeModal = function() {
        // $("#panMsgPopup").modal('hide')
        // $(document.body).removeClass('modal-open');
        // $('.modal-backdrop').remove();
        var x = document.getElementById("panMsgPopup");
        x.style.display = "none";
        var y = document.getElementById("modal-backdrop");
        y.style.display = "none";
    }
    $scope.closeEsignModal = function() {
        // $("#panMsgPopup").modal('hide')
        // $(document.body).removeClass('modal-open');
        // $('.modal-backdrop').remove();
        var x = document.getElementById("EsignMsgPopup");
        x.style.display = "none";
        var y = document.getElementById("modal-backdrop");
        y.style.display = "none";
    }

    $scope.DoEsign = function(PanNumber) {
        $('#loader-cs').show();
        var s_url = 'GenerateESignPDFForLead?PanNumber=' + PanNumber
        var sendData = {
            PanNumber:PanNumber
        }
        serverService.getApi(s_url).then(function (a) {
			var response = a.data;
            if (response.IsSuccess && response.requestXml != "") {
                frmMain.action = response.eSignApiUrl;
                $('#msg').val(response.requestXml);
                document.getElementById("frmMain").submit();
            }
            else {
                $('#loader-cs').hide();
                // alert(response.ErrorMessage);
                $scope.ErrorMessage = response.ErrorMessage
                var x = document.getElementById("EsignMsgPopup");
                x.style.display = "block";
                var y = document.getElementById("modal-backdrop");
                y.style.display = "block";
            }
        })

    }

    $scope.redirectpage = function(){
        $state.go('karvy')
    }
}])