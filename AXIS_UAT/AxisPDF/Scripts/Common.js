var developmet = false;
var WallURL = '';
var RxDigifinDiss = '';
var RxDigifinWeb = '';


if (developmet) {
    WallURL = 'http://localhost:59865/signalr/';
    RxDigifinDiss = 'http://localhost:50121/';
    //RxDigifinDiss = 'http://localhost:49625/';
    RxDigifinWeb = 'http://localhost:63427/';
    RXRxDigifinDiss = 'http://localhost:50121/';
    RxDigifinDissPDF = 'http://appserver.constient.com/RxDigifinService/';
}
else {
    WallURL = 'http://appserver.constient.com/RxDigifinnotifications/signalr/';
    RxDigifinDiss = 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/';
    RxDigifinWeb = 'https://digitalaccountuat.axissl.in:9443/AXIS_WEBAPI/';
    RXRxDigifinDiss = 'http://localhost/RxDigifinService/';
    RxDigifinDissPDF = 'http://appserver.constient.com/RxDigifinService/';
}