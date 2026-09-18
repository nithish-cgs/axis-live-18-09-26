$(document).ready(function () {
    BindData();

});

var PANNumber = '';

//#region BindData
function BindData() {

    PANNumber = getParameterByName("PanNumber");
    //iteration=$.url().param('IterationId');
    var objRequestClosureDetailsPdfBindData = new Object();
    objRequestClosureDetailsPdfBindData.PANNumber = PANNumber;

    var dataToSend = JSON.stringify(objRequestClosureDetailsPdfBindData);
    var apiurl = WebAPILayer + "api/DIY/GetClosurePdfDetails";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        data: dataToSend,
        url: apiurl,
        success: function (msg, status) {
            var data = msg;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = dd+mm +yyyy;
            for (var i = 0; i < today.length; i++) {
                var j = i + 1;
                $("#Date" + j).text(today[i]);
                $("#Date2" + j).text(today[i]);
            }
            if (msg.ClientID) {
                var clientid = msg.ClientID.toUpperCase();
                for (var i = 0; i < clientid.length; i++) {
                    var j = i + 1;
                    $("#ClientId" + j).text(clientid[i]);
                    //$("#ClientId1" + j).text(clientid[i]);
                }
            }
            if (msg.TradingID) {
                var TradingID = msg.TradingID.toUpperCase();
                for (var i = 0; i < TradingID.length; i++) {
                    var j = i + 1;
                    $("#Trading" + j).text(TradingID[i]);
                    //$("#DPID1" + j).text(TradingID[i]);
                }
            }
            if (msg.PANNumber) {
                $('#checkbox12').prop('checked', true);
                $("#checkbox12").attr("checked", "checked");
            }
            if (msg.ClosureReason) {
                $("#ReasonRejection").text(msg.ClosureReason);
                $("#Reason").text(msg.ClosureReason);
            }
            if (msg.FirstHolderName) {
                $("#ClientName").text(msg.FirstHolderName);
                $("#ClientName2").text(msg.FirstHolderName);
            }
            if (msg.ApplicationNumber) {
                $("#AppNo").text(msg.ApplicationNumber);
            }
        }
    });        
}
//#endregion

//#region getParameterByName
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//#endregion

//#region getCurrentDate
function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var CurrentDate = dd + '/' + mm + '/' + yyyy;
    return CurrentDate;
}
//#endregion