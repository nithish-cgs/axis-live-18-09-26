var developmet = false;
var WallURL = '';
var RxDigifinDiss = '';
var RxDigifinWeb = '';
var WebAPILayer = '';
var DIYLayer = '';

if (developmet)
{
    WallURL = 'http://localhost:56199/signalr';
    RxDigifinDiss = 'http://localhost:50121/';
    RxDigifinWallDiss = 'http://localhost:49626/';
    RxDigifinWeb = 'http://localhost:63428/';
    RXRxDigifinDiss = 'http://localhost:50121/';
    WebAPILayer = 'http://localhost:63162/';
    DIYLayer = ' http://axisdiy.loc/';
}
else
{

   // WallURL = window.location.origin + '/RxDigifinnotifications/signalr/';
   // RxDigifinDiss = window.location.origin + '/RxDigifinService/';
   // RxDigifinWallDiss = window.location.origin + '/RxDigifinWall/';
   // RxDigifinWeb = window.location.origin + '/RxDigifinBO/';
   // RXRxDigifinDiss = window.location.origin + '/RxDigifinService/';
   // WebAPILayer = 'http://localhost:63162/';
   // DIYLayer = ' http://axisdiy.loc/';
   
   

    WallURL = 'https://apidigitalao.axisdirect.in/RxDigifinnotifications/signalr/';
    RxDigifinDiss = 'https://apidigitalao.axisdirect.in/';
    RxDigifinWallDiss = 'https://apidigitalao.axisdirect.in/';
    RxDigifinWeb = 'https://apidigitalao.axisdirect.in/';
    RXRxDigifinDiss = 'https://digitalaccount.axisdirect.in/';
    WebAPILayer = 'https://apidigitalao.axisdirect.in/';
    DIYLayer = 'https://digitalaccount.axisdirect.in/';
	
	
	/*
	WallURL = 'http://192.168.102.80:9443/RxDigifinnotifications/signalr/';
    RxDigifinDiss = 'http://192.168.102.80:9443/';
    RxDigifinWallDiss = 'http://192.168.102.80:9443/';
    RxDigifinWeb = 'http://192.168.102.80:9443/';
    RXRxDigifinDiss = 'https://digitalaccount.axisdirect.in/';
    WebAPILayer = 'http://192.168.102.80:9443/';
    DIYLayer = 'http://192.168.102.80:9020/';
	*/
	
	
}