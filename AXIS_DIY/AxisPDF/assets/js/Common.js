var developmet = false;
var WallURL = '';
var RxDigifinDiss = '';
var RxDigifinWeb = '';
var WebAPILayer = '';
var DIYLayer = '';

if (developmet) 
{
    WallURL = 'http://localhost:59865/signalr/';
    RxDigifinDiss = 'http://localhost:50121/';
    RxDigifinWallDiss = 'http://localhost:49626/';
    RxDigifinWeb = 'http://localhost:63428/';
    RXRxDigifinDiss = 'http://localhost:50121/';
	WebAPILayer = 'https://localhost:63162/';
    DIYLayer = 'http://axisdiy.loc/';
}
else 
{
    WallURL = 'https://demo.digifin.in/AxisDemoAPI/RxDigifinnotifications/signalr/';
    //RxDigifinDiss = 'https://demo.digifin.in/AxisDemoAPI/';
	 RxDigifinDiss = 'https://dotnet.constient.com/AxisDemoAPI/';
	
    RxDigifinWallDiss = window.location.origin + '/RxDigifinWall/';
    RxDigifinWeb = window.location.origin + '/RxDigifinBO/';
    RXRxDigifinDiss = 'https://dotnet.constient.com/AxisDemoAPI/';
	
	// RXRxDigifinDiss = 'https://demo.digifin.in/AxisDemoAPI/';
	//WebAPILayer = 'https://demo.digifin.in/AxisDemoWebAPI/';
	
	WebAPILayer = 'https://dotnet.constient.com/AxisDemoWebAPI/';
  //  DIYLayer = 'http://axisdiy.loc/';
	DIYLayer = 'https://demo.digifin.in/AxisDemoDIY/';

}


