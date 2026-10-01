
mainApp.controller('karvySetupfreedemataccountController', ['$scope', '$rootScope', '$state', 'serverService', function ($scope, $rootScope, $state, serverService) {
   
    $('.setbox').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 100);
		return false;
	});
    setTimeout(function(){
        $('#loader-cs').hide();
        window.location.replace('register')
    },500)
	if($rootScope.karvyData){
		if($rootScope.karvyData.PANNO){
			$('#pannumber').val($rootScope.karvyDataa.PANNO)
			$scope.pannumDisabled = true
		}
    }
    $scope.PanVerification = function() {
        $('#loader-cs').show();
        var req = new Object();
        var PanNumber = $('#pannumber').val();
        var Email = $('#email').val();
        var Mobile = $('#mobile').val();
        var PanRegex = new RegExp('^([a-zA-Z]{1,3}[pP]{1,1}[a-zA-Z]{1,1}[0-9]{1,4}[a-zA-Z]{1,1})$');
        //var Emailfilter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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