mainApp.controller('karvyController', function ($scope, $rootScope, $state, serverService, $location) {
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
        serverService.apiCall(s_url, sendData).success(function (response) {
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
        // $.ajax({
        //     type: "POST",
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     async: false,
        //     data: dataToSend,
        //     url: WebAPILayer + 'api/DIY/KarvyLeadCreation',
        //     success: function (msg, status) {
        //         if (msg.IsSuccess)
        //         {
        //             DoEsign(PanNumber);
        //         }
        //         else {
        //             $('#loader-cs').hide();
        //             var x = document.getElementById("panMsgPopup");
        //             x.style.display = "block";
        //             var y = document.getElementById("modal-backdrop");
        //             y.style.display = "block";
        //         }

        //     },
        //     error: function (msg, results) {
        //         $('#loader-cs').hide();
        //     }
        // });
    }

    $scope.DoEsign = function(PanNumber) {
        $('#loader-cs').show();
        var s_url = 'GenerateESignPDFForLead?PanNumber=' + PanNumber
        var sendData ={
            PanNumber:PanNumber
        }
        serverService.getList(s_url).then(function (response) {
            if (response.IsSuccess && response.requestXml != "") {
                frmMain.action = response.eSignApiUrl;
                $('#msg').val(response.requestXml);
                document.getElementById("frmMain").submit();
            }
            else {
                $('#loader-cs').hide();
                alert(response.ErrorMessage);
            }
        })


        // $.ajax({
        //     type: "GET",
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     async: false,
        //     url: WebAPILayer + 'api/DIY/GenerateESignPDFForLead?PanNumber=' + PanNumber,
        //     success: function (res, status) {
        //         if (res.IsSuccess && res.requestXml != "") {
        //             frmMain.action = res.eSignApiUrl;
        //             $('#msg').val(res.requestXml);
        //             document.getElementById("frmMain").submit();
        //         }
        //         else {
        //             $('#loader-cs').hide();
        //             alert(res.ErrorMessage);
        //         }

        //     },
        //     error: function (res, results) {

        //     }
        // });
    }

    $scope.redirectpage = function(){
        $state.go('register')
    }
})