var cobrowseWindow;
var cobrowseTimer;
var showToaster = function (type, msg) {

	alert(msg);

}

function checkTimer() {
	if (cobrowseWindow && cobrowseWindow.closed) {
		cobrowseWindow.close();
		cobrowseWindow = undefined;
		addStatusMessage('Cobrowse session ended at ' + dateFormat(new Date(), 'h:MM'));
		clearInterval(cobrowseTimer);

	}
}

var closeAllRequestPopup = function () {
	$('.open-cobrowserequest').addClass('cb-hidden');
	$("#closeChatWindowCobrowse").hide();
	$('.open-screensharerequest').addClass('cb-hidden');
	$("#closeChatWindowScreenshare").hide();
	$('.open-cobrowserequestAgent').addClass('cb-hidden');
	$("#closeChatWindowCoAgent").hide();
	$('.open-cobrowserequestScAgent').addClass('cb-hidden');
	$("#closeChatWindowScAgent").hide();

}

var openScreenShare = function (link) {
	$('.open-screensharerequest').addClass('cb-hidden');
	$("#closeChatWindowScreenshare").hide();
	$('.open-iframe').removeClass('cb-hidden');
	$('.open-iframe').show();
	$('#iframeurl').attr('src', link);
}

var openCobrowseOption = function () {
	$('.open-cobrowserequestAgent').addClass('cb-hidden');
	$("#closeChatWindowCoAgent").hide();
	openCobrowseForm()
}

var openScreenShareOption = function () {
	$('.open-cobrowserequestScAgent').addClass('cb-hidden');
	$("#closeChatWindowScAgent").hide();
	shareScreen()
}

var openCobrowse = function (link) {
	$('.open-cobrowserequest').addClass('cb-hidden');
	$("#closeChatWindowCobrowse").hide();
	$('.open-screensharerequest').addClass('cb-hidden');
	$("#closeChatWindowScreenshare").hide();
	cobrowseWindow = window.open(link, "_blank", 'width=' + (parseInt(window.innerWidth.toString()) * 0.8) + ',height=' + (parseInt(window.innerHeight.toString()) * .8) + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=50,top=50');
	cobrowseTimer = setInterval(checkTimer, 500);
	addStatusMessage('Cobrowse session started at ' + dateFormat(new Date(), 'h:MM'));
}

var openCobrowseUrlInfo = function () {
	let data = $('#cobrowseurlid').val()
		$.ajax({
			url: 'https://surfly.com/v2/sessions/?api_key=95397c3dacca4437afe9e1bfd5ec8a6a',
			data: JSON.stringify({
				"url": data,
				"agent_id": "106402",
				"tags": [
					"tag1",
					"tag2"
				]
			}),
			dataType: 'json',
			cache: false,
			contentType: "application/json",
			processData: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (resp) {
				// console.log("machimariyam", resp)
				openCobrowseInfo2(websiteUrl + resp.leader_link + '&userId=' + nameInfo + '&to=' + agentId, resp.viewer_link, 'link')
				// let data = resp.response.data;

			}
		});
}
var openCobrowseInfo2 = function (link, sendLink, linkType) {
	$('.open-cobrowse').addClass('cb-hidden');
	$('.open-cobrowse').hide();
	cobrowseWindow = window.open(link, "_blank", 'width=' + (parseInt(window.innerWidth.toString()) * 0.8) + ',height=' + (parseInt(window.innerHeight.toString()) * .8) + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=50,top=50');
	cobrowseTimer = setInterval(checkTimer, 500);
	addStatusMessage('Cobrowse session started at ' + dateFormat(new Date(), 'h:MM'));
	callCoBrowse1(sendLink, linkType)
}

var openCobrowseInfo = function (link, linkType) {
	$('.open-cobrowse').addClass('cb-hidden');
	$('.open-cobrowse').hide();
	cobrowseWindow = window.open(link, "_blank", 'width=' + (parseInt(window.innerWidth.toString()) * 0.8) + ',height=' + (parseInt(window.innerHeight.toString()) * .8) + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=50,top=50');
	cobrowseTimer = setInterval(checkTimer, 500);
	addStatusMessage('Cobrowse session started at ' + dateFormat(new Date(), 'h:MM'));
	callCoBrowse(linkType)
}

function callCoBrowse(linkType) {
	if (linkType == 'document') {
		socket.emit('COBROWSE_LINK', {
			sessionId: socket.id,
			userId: agentId,
			link: 'https://asccgnlchatag.aslcc.in/co-browse/?doc=' + SOCKET_HOST + '/files/' + coBrowseDocumentFileName + '&userId=' + agentId + '&to=' + nameInfo
		});
	} else if (linkType == 'form') {
		socket.emit('COBROWSE_LINK', {
			sessionId: socket.id,
			userId: agentId,
			link: 'https://asccgnlchatag.aslcc.in/co-browse/?form=true' + '&userId=' + agentId + '&to=' + nameInfo
		});
	}
}

function callCoBrowse1(sendLink, linkType) {
	if (linkType == 'link') {
		socket.emit('COBROWSE_LINK', {
			sessionId: socket.id,
			userId: agentId,
			link: 'https://asccgnlchatag.aslcc.in/co-browse/?link=' + sendLink + '&userId=' + agentId + '&to=' + nameInfo
		});
	}
}

function isEmail(email) {
	$('.in-valid').removeClass('in-valid');
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

window.onbeforeunload = function (e) {
	if (socket != null) {
		socket.disconnect();
	}
}

socket = null;
let queuePos;
let SOCKET_HOST = 'https://192.168.28.156:7050';
//const chatbox = jQuery.noConflict();
let queCount = 0;
var connected = false;
channelId = '';
let chatMsgs = [];
let chatHistory = ['<div class="agent"> Hi! I’m Kira – your Instadesk personal chatbot. <br> How may I help you today? <br> Choose from the menu to get started.</div><br />'];
let otherUserId = '';
let agentId;
let username;
let activeCall = false;
var activeCallRequest = false;
var childWindow;
var callTimer;
var activeCallType = '';
var callFlowType = '';
var msgTsList = [];
let signatureImg;
let countryName;
let systemIp;
let latitude;
let longitude;
let emailInfo;
let mobileInfo;
let nameInfo;
let ciscoAgentID;
let agentNameAndID;
let createdChatId;
let messageDataInfo = [];
let requestAgentStatus = false;
let intent;
let email;
let mobile;
let aadhaarFrontName;
let aadhaarBackName;
let panCardFront;
let drivingFront;
let drivingBack;
let signature;
let loopInterval;
let activeStateloopInterval;

let coBrowseDocumentFileName;
let coBrowseDocumentOriginalFileName;
let documentUrl = "https://asccgnlchatag.aslcc.in/co-browse/?doc=";
let formUrl = "https://asccgnlchatag.aslcc.in/co-browse/?form=true";
let websiteUrl = "https://asccgnlchatag.aslcc.in/co-browse/?link=";

let uploadFrame = false;

let userConnected = false;
let unifiedConnection = false;
let increaseCount = 0;

let increaseQueueCount = 0;

let passportFront;
let passportBack;
let cityName
let region
let selectedIdCard;
let videoChat = false;

let coBrowseLink;
//let screenShareLink;
var windowCfg = 'resizable=no,fullscreen=yes,toolbar=no,scrollbars=no,menubar=no,status=no,directories=no,height=570,width=520,top=100,left=100';
function connectSocket(name, nameInfo, createdChatIds, cisAgentId, taskId, emailInfo, mobileInfo, intent, imageFile) {
	username = name;
	var sskt = io;
	if (socket != null) {
		socket.disconnect();
	}
	setTimeout(function () {
		socket = sskt(SOCKET_HOST, {
				forceNew: true,
				query: {
					userId: name,
					nameInfo: nameInfo,
					createdChatId: createdChatIds,
					userType: 'customer',
					cisAgentId: cisAgentId,
					taskId: taskId,
					emailInfo: emailInfo,
					mobileInfo: mobileInfo,
					intent: intent,
					imageFile: imageFile
				}
			});
		socket.on('connect', () => {
			connected = true;
			//initCall(name);f
		});
		console.log("Veriyeri", socket)
		socket.on('COBROWSE_CLOSE_UPDATE', function (msg) {
			if (cobrowseWindow) {
				cobrowseWindow.close();
				cobrowseWindow = undefined;
				addStatusMessage('Cobrowse session ended at ' + dateFormat(new Date(), 'h:MM'));
			}
		});

		socket.on('COBROWSE_LINK_UPDATE', function (msg) {
			var tmpl = '<div class="agent emty hide-agent"> <a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO CO-BROWSE</a><div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
			var tmp2 = '<div class="tranagent emty hide-agent cb-hidden" style="color: blue"> <div>' + dateFormat(new Date(), 'h:MM') + ' -- Agent (' + agentNameAndID + ') ' + ' -- ' + '<span><a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO CO-BROWSE</a></span></div></div>';
			$("#messages").append(tmpl);
			$("#messages").append(tmp2);
			$("#messages").animate({
				scrollTop: $('#messages').prop("scrollHeight")
			}, 1000);
			stopAutoPlay()

		});

		socket.on('SIGN_LINK_UPDATE', function (msg) {

			var tmpl = '<div class="agent emty hide-agent"> <a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO SIGN</a><div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
			var tmp2 = '<div class="tranagent emty hide-agent cb-hidden" style="color: blue"> <div>' + dateFormat(new Date(), 'h:MM') + ' -- Agent (' + agentNameAndID + ') ' + ' -- ' + '<span><a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO TO SIGN</a></span></div></div>';
			$("#messages").append(tmpl);
			$("#messages").append(tmp2);
			$("#messages").animate({
				scrollTop: $('#messages').prop("scrollHeight")
			}, 1000);
			stopAutoPlay()

		});
		socket.on('PHOTO_LINK_UPDATE', function (msg) {

			var tmpl = '<div class="agent emty hide-agent"> <a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO SIGN</a><div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
			$("#messages").append(tmpl);
			$("#messages").animate({
				scrollTop: $('#messages').prop("scrollHeight")
			}, 1000);
			stopAutoPlay()

		});
		socket.on('UPLOAD_FRAME_REQUEST', function (msg) {
			var tmpl = '<div class="agent emty hide-agent"> <a style="cursor:pointer" onclick="openCobrowse(' + msg.link + '&userId=' + username + '&to=' + agentId + ')" >CLICK HERE TO SIGN</a><div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
			$("#messages").append(tmpl);
			$("#messages").animate({
				scrollTop: $('#messages').prop("scrollHeight")
			}, 1000);
			stopAutoPlay()
		});

		socket.on('message', function (msg) {

			if (!msgTsList.includes(msg.ts)) {
				msgTsList.push(msg.ts);
				messageDataInfo.push(msg.text.replace(/\n/g, ''))
				console.log("JDJDJJD", messageDataInfo)
				var tmpl = '<div class="agent emty hide-agent"> ' + msg.text + '<div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div>';
				var tmp2 = '<div class="tranagent emty hide-agent cb-hidden" style="color: blue"> <div>' + dateFormat(new Date(), 'h:MM') + ' -- Agent (' + agentNameAndID + ') ' + ' -- ' + '<span>' + msg.text + '</span></div></div>';
				//   $(".agent emty hide-agent span").html(msg.text);
				$("#messages").append(tmpl);
				$("#messages").append(tmp2);
				$("#messages").animate({
					scrollTop: $('#messages').prop("scrollHeight")
				}, 1000);
				stopAutoPlay()

			}
			// setTimeout(() => { $('#messages').scrollTop($('#messages').height() + 1), 400 }, 200);
		});
		socket.on('statusMessage', function (response) {
			console.log("Vichumachu", response)
			if (response.type == 'ADMIN_CONNECTED' && !agentId) {
				$('.chatbox-panel__header').show();
				if (unifiedConnection == true) {
					addStatusMessage('You are conneted to (' + response.userId + ')');
				}
				otherUserId = response.userId;
				agentId = otherUserId;

				var imgList = [];

				if (videoChat == true) {
					requestCall('video')
				}
				// setTimeout(() => {
				//   $('#messages').scrollTop(0);
				//   $('.send-icon').removeClass('disabled');
				//   html2canvas(document.querySelector("#messages"), {
				//     allowTaint: true,
				//     useCORS: true,
				//     logging: false,
				//     height: window.outerHeight + window.innerHeight,
				//     windowHeight: window.outerHeight + window.innerHeight
				//   }).then(canvas => {
				//     console.log("Lolattallala",canvas)
				//     imgList.push(canvas.toDataURL());
				//     $('#txtMsg').attr('disabled', false);
				//     let name = $('#c_fname').val();
				//     let email = $('#c_email').val();
				//     socket.emit('CHAT_HISTORY', { chatMsgs: imgList, chatHistory: chatHistory, sessionId: socket.id, info: { name: name, email: email } });
				//   });

				// }, 500);


			} else if (response.type == 'QUEUE_COUNT') {
				console.log("Viruchi", response)
				$('.product').show();
				$('.customer').show();
				$('.job').show();
				$('.sales').show();
				response.queueCount = response.queueCount + 1;
				console.log("Maiiududi", agentId)
				console.log("Maiiududi12", queCount)
				console.log("Maiiududi123", response.queueCount)
				console.log("Maiiududi1234", queCount)

				if (!agentId && (!queCount || response.queueCount != queCount)) {
					queCount = response.queueCount;
					//if(unifiedConnection == true){
					addStatusMessage('Your current queue position is ' + response.queueCount);
					//}
					//addStatusMessage('Your current queue position is ' + response.queueCount);
				}
			} else if (response.type == 'CALL_REQUEST' && agentId) {
				$('.callRequestCls').removeClass('cb-hidden');
				$('#callRequest').show();
				activeCallRequest = true;
				activeCallType = response.callType;

				channelId = response.channelId;
			} else if (response.type == 'CALL_ACCEPTED') {
				if (activeCallRequest == true && activeCall == false) {
					activeCall = true;
					callFlowType = 'send';
					audioDisabled = false;
					videoDisabled = false;
					if (activeCallType != 'video') {
						$('.call-camera').hide();
					} else {
						$('.call-camera').show();
					}
					$('.call-camera').removeClass('muted');
					$('.call-mike').removeClass('muted');
					$('.call-frame').show();

					call(username, agentId, (activeCallType == 'video'));

					//connect();
					/* childWindow = window.open('https://instadesk-demo.in:8443/demos/demo_audio_video_simple.html?sessionId='+username+'&to='+agentId+'&type='+activeCallType+'&flowType='+callFlowType,'_blank', windowCfg);
					callTimer = setInterval(() => {
					if (childWindow && childWindow.closed) {
					activeCallRequest = false;
					setTimeout(()=>{
					activeCall = false;
					},100);
					console.log('call completed');
					clearInterval(callTimer);
					}
					}, 500); */
				}
			} else if (response.type == 'CALL_REJECTED') {
				activeCallRequest = false;
				//addStatusMessage('We cannot proceed with the call as your current location does not come under servicable area.  Sorry for the inconvinence, currently we carter to customers within India.');
				alert('Call has been rejeceted');
			} else if (response.type == 'FILE_SHARE_RECEIVED') {
				var tmpl = '<div class="agent hide-agent"> <span>Click here to view the file: &nbsp;<a target="_blank" href="' + response.link + '">' + response.fileName + '</a></span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div>';
				console.log("Viruchi", tmpl)
				$("#messages").append(tmpl);
				$("#messages").animate({
					scrollTop: $('#messages').prop("scrollHeight")
				}, 1000);
			} else if (response.type == 'AGENT_DISCONNECT_ALERT_MESSAGE_RECEIVED') {
				$('.close-chatbot2').removeClass('cb-hidden');
				$("#closeChatWindow2").show();
			} else if (response.type == 'AGENT_DISCONNECT_INACTIVITY_RECEIVED') {
				$('.close-chatbot2').addClass('cb-hidden');
				$("#closeChatWindow2").hide();
				setTimeout(() => {
					endChat()
				}, 1000);
				activeCallRequest = false;
				connected = false;
				stopCall(false);
				agentId = undefined;
				addStatusMessage('Chat disconnected due to inactivity.');
			} else if (response.type == 'ADMIN_DISCONNECTED') {
				setTimeout(() => {
					endChat()
				}, 1000);
				activeCallRequest = false;
				connected = false;
				stopCall(false);
				agentId = undefined;
				console.log("Result Data InfoReser", response.deacttype)
				if (response.deacttype == 'manual') {
					addStatusMessage('Agent disconnected.');
				}
				$('#txtMsg').addClass('cb-hidden');

				addStatusMessage(`<span>Thank you for contacting Axis Securities, please rate your interaction with our Subject Matter Expert`)
				addStatusMessage(`<div class="container" style="width: 400px;">

    <div class="item">
      <label for="1">
      <input class="radio" type="radio" name="feedback" id="1" value="1">
      <span>🙁</span><br>
      <span style="font-size: 12px;">Very Bad</span>
    </label>
    </div>

    <div class="item">
      <label for="2">
      <input class="radio" type="radio" name="feedback" id="2" value="2">
      <span>😶</span><br>
      <span style="font-size: 12px;">Bad</span>
    </label>
    </div>

    <div class="item">
      <label for="3">
      <input class="radio" type="radio" name="feedback" id="3" value="3">
      <span>😁</span><br>
      <span style="font-size: 12px;">Ok</span>
    </label>
    </div>

    <div class="item">
      <label for="4">
      <input class="radio" type="radio" name="feedback" id="4" value="4">
      <span>😍</span><br>
      <span style="font-size: 12px;">Excellent</span>
    </label>
    </div>
    <div class="form-group mt-4"> <textarea style="width:263px" class="form-control feedback-data" rows="4" placeholder="Enter your message here..."></textarea> </div>
    <div class="mt-2"> <button type="button" class="btn btn-primary btn-block feedback-data" onclick="showFeedBackForm()"><span>Send feedback</span></button> </div>`)
				if (socket != null) {
					socket.disconnect();
				}

			} else if (response.type == 'CALL_COMPLETED') {
				addStatusMessage(activeCallType + ' call completed.');
				activeCallRequest = false;
				stopCall(false);

			} else if (response.type == 'COBROWSE_LINK_UPDATE') {
				var tmpl = '<div class="agent hide-agent"> <a style="cursor:pointer"  onclick="openCobrowse(\'' + response.link + '&userId=' + username + '&to=' + agentId + '\')" >CLICK HERE TO CO-BROWSE</a><div class="agent-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
				$("#messages").append(tmpl);
				$("#messages").animate({
					scrollTop: $('#messages').prop("scrollHeight")
				}, 1000);
				stopAutoPlay()
			} else if (response.type == 'SIGN_LINK_UPDATE' && agentId) {
				console.log(response.signatureImg, 'ressign');
				$('.signdiv-cls').removeClass('cb-hidden');
				$(".sign-popup").show();
				stopAutoPlay();
			} else if (response.type == 'PHOTO_LINK_UPDATE') {
				$('.photodiv-cls').removeClass('cb-hidden');
				$(".kyc-popup").show();
				stopAutoPlay();
			} else if (response.type == 'UPLOAD_FRAME_REQUEST') {
				if (uploadFrame == false) {
					uploadFrame = true;
					$('.circle-change').removeClass('cb-hidden');
				} else if (uploadFrame == true) {
					uploadFrame = false;
					$('.circle-change').addClass('cb-hidden');
				}
				//$(".kyc-popup").show();
				stopAutoPlay();
			} else if (response.type == "SCREEN_SHARE_DATA") {
				$('.open-iframe').removeClass('cb-hidden');
				$('.open-iframe').show();
				$('#iframeurl').attr('src', response.recordLink);
			} else if (response.type == "SCREEN_SHARE_END_DATA") {
				$('.open-iframe').addClass('cb-hidden');
			} else if (response.type == "CO_SCREEN_REQUEST_AGENT") {
				console.log("Lottaoodod", response)
				if (response.requestType == 'request' && response.optionType == 'cobrowse') {
					$('.open-cobrowserequestAgent').removeClass('cb-hidden');
					$("#closeChatWindowCoAgent").show();
				} else if (response.requestType == 'request' && response.optionType == 'screenshare') {
					$('.open-cobrowserequestScAgent').removeClass('cb-hidden');
					$("#closeChatWindowScAgent").show();
				} else if (response.requestType == 'join' && response.optionType == 'cobrowse') {
					coBrowseLink = response.link
						$('.open-cobrowserequest').removeClass('cb-hidden');
					$("#closeChatWindowCobrowse").show();
				} else if (response.requestType == 'join' && response.optionType == 'screenshare') {
					screenShareLink = response.link
						$('.open-screensharerequest').removeClass('cb-hidden');
					$("#closeChatWindowScreenshare").show();
				}
				//console.log("skksdksdksd",response)
			}
		});
	}, 500);

}

function showFeedBackForm() {
	$('.feedback-data').hide();
	addStatusMessage('Thank you for your valuable feedback.');

	addStatusMessage(`<div class="app">
  <p style="font-size: 14px; font-weight: 900; margin-bottom: 0rem; ">Thank you for connecting with Axis Securities, Please click download button to download your transcript.</p>
  <div class="mt-2"> <button type="button" class="btn btn-primary btn-block" onclick="feedBackForm()"><span>Download</span></button> </div>
  </div>`);
}

function openSignWindow() {
	$(".sign-popup").show();
	$('.signdiv-cls').removeClass('cb-hidden');
}

function addStatusMessage(msg) {
	$('#messages').append('<div class="joined emty">' + msg + '</div>');
	chatHistory.push('<div class="joined">' + msg + '</div><br />');
	// setTimeout(() => { $('#messages').scrollTop($('#messages').height() + 100), 500 }, 100);
	$("#messages").animate({
		scrollTop: $('#messages').prop("scrollHeight")
	}, 1000);
}

function showEnqForm(event) {
	chatHistory.push('<div class="default-option disabled" id="' + id + '" > <i class="fa fa-line-chart" aria-hidden="true"></i> ' + $('#' + id).text() + ' </div><br />');

	$('.default-option').addClass('disabled');
	$('li').addClass('disabled');
	$('#frmEnq').removeClass('cb-hidden');
	$('#frmEnq').show();
	$('#frmEnq').find(':input:visible').first().focus();
}

function closeChatBot() {
	$('.close-chatbot1').removeClass('cb-hidden');
	$("#closeChatWindow1").hide();
	$("#closeChatWindow").hide();
}

function connectToCisco() {
	let name = $('#name').val();
	let phone = $('#phone').val();
	let email = $('#email').val();
	let company_name = $('#company_name').val();
	let agentAssignURl;
	// addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');
	$('#frmchat').addClass('cb-hidden');
	$('#frmchat').hide();
	// loopInterval = setInterval(() => {
	// if(videoChat==true){
	const xmlBody = `
            <Task>
            <name>Video1</name>
            <title>VideoCall</title>
            <scriptSelector>123456</scriptSelector>
            <requeueOnRecovery>false</requeueOnRecovery>
            <variables>
            <variable>
            <name>` + name + `</name>
            <value>` + phone + `</value>
            </variable>
            </variables>
          </Task>`;

	$.ajax({
		url: "https://122.165.93.92/ccp/task/feed/100000",
		data: xmlBody,
		type: 'POST',
		contentType: "application/xml",
		dataType: "xml",
		success: function (xhr, ajaxOptions, successMessage) {
			agentAssignURl = successMessage.getResponseHeader('Location');

			if (agentAssignURl != null) {
				getAgentId(agentAssignURl)
			}

			//   addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');

			// $('#frmchat').addClass('cb-hidden');
			// $('#frmchat').hide();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			// setTimeout(() => {
			//       connectToCisco()
			// },30000);
			console.log("", thrownError.getResponseHeader('Location'));
			console.log(xhr.status);
			console.log(thrownError);
		}
	});

	// $.ajax({
	//     type: "POST",
	//     url: "http://192.168.11.88/ccp/task/feed/100000",
	//     dataType: "xml",
	//     contentType: "application/xml"
	//     data: xmlBody,
	//     success: function (res) {
	//         alert("XML: it works!");
	//     },
	//     error: function (res) {
	//         alert("XML: not working! " + res.statusText);
	//     }
	// });


	// }else{
	//   const xmlBody = `
	//         <Task>
	//         <name>Voice</name>
	//         <title>VoiceCall</title>
	//         <scriptSelector>zuqo_voice</scriptSelector>
	//         <requeueOnRecovery>false</requeueOnRecovery>
	//         <variables>
	//         <variable>
	//         <name>`+name+`</name>
	//         <value>`+phone+`</value>
	//         </variable>
	//         </variables>
	//       </Task>`;

	//       $.ajax({
	//         url: "https://210.18.156.248/ccp/task/feed/100000",
	//         data: xmlBody,
	//         type: 'POST',
	//         contentType: "application/xml",
	//         dataType: "xml",
	//        success : function () {

	//         // addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');

	//         // $('#frmchat').addClass('cb-hidden');
	//         // $('#frmchat').hide();
	//        },
	//         error : function (xhr, ajaxOptions, thrownError){
	//             console.log(xhr.status);
	//             console.log(thrownError);
	//         }
	//     });


	// }


	//}, 30000);


}

function getAgentId(dataUrl) {
	console.log("ddfdfdfdf", increaseCount)
	var messageResponse;
	var agentID;
	var taskId;
	let name = $('#name').val();
	let phone = $('#phone').val();
	let email = $('#email').val();
	let company_name = $('#company_name').val();
	let urlInfo = dataUrl;
	$.ajax({
		url: dataUrl,
		//data: xmlBody,
		type: 'GET',
		contentType: "application/xml",
		dataType: "xml",
		success: function (xhr, ajaxOptions, successMessage) {
			console.log("Datasmanupulation", xhr);
			console.log("Datasmanupulation", ajaxOptions);
			console.log("Datasmanupulation", successMessage);

			messageResponse = $(successMessage.responseText).find('status').text()
				agentID = $(successMessage.responseText).find('agentID').text()
				taskId = $(successMessage.responseText).find('taskID').text()
				if (messageResponse == 'discarded') {
					addStatusMessage('Your current queue position is 10');
					addStatusMessage('No agents are available pls wait. ');
					increaseCount += 1
					if (increaseCount >= 3) {
						addStatusMessage('Your current queue position is 9');
						addStatusMessage('No agents are available. <button type="button" class="btn btn-primary" onclick="confirmPopup()">Click here</button> to retry later');
						//  $('#open-chat12').addClass('cb-hidden');
						//  $('#open-chat12').show();
						clearInterval(loopInterval);
					}
					console.log("Loops data")
					// addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');
					// $('#frmchat').addClass('cb-hidden');
					// $('#frmchat').hide();
				} else if (messageResponse == 'reserved') {
					clearInterval(loopInterval);
					activeStateloopInterval = setInterval(() => {
							checkAgentAvailablity(taskId, agentID, name, urlInfo)
						}, 1000);
					//connectSocket(name, agentID, taskId);
					//addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');
					// $('#frmchat').addClass('cb-hidden');
					// $('#frmchat').hide();
				} else if (messageResponse == 'queued') {
					setTimeout(() => {
						getAgentId(urlInfo)
					}, 1000); //connectSocket(name, agentID, taskId);
				}
				//alert($(successMessage.responseText).find('status').text());
				//agentAssignURl = successMessage.getResponseHeader('Location'));

				// if(agentAssignURl!=null){
				//   getAgentId()
				// }

				//addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name+ '<br />Your request has submitted pls wait will get back to you shortly..&nbsp;');

				$('#frmchat').addClass('cb-hidden');
			$('#frmchat').hide();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("", thrownError.getResponseHeader('Location'));
			console.log(xhr.status);
			console.log(thrownError);
		}
	});

}

function checkAgentAvailablity(taskId, agentID, name, urlInfo) {
	$.ajax({
		url: 'https://122.165.93.92:4443/finesse/api/Dialog/' + taskId,
		//data: xmlBody,
		type: 'GET',
		//contentType: "application/xml",
		dataType: "xml",
		headers: {
			'Authorization': 'Basic ' + btoa('finadmin:Zuq0@123')
		},

		success: function (xhr, ajaxOptions, successMessage) {
			console.log("Porichumarihu", successMessage)
			messageResponse = $(successMessage.responseText).find('state').text()
				console.log("messageResponse", messageResponse)
				if (messageResponse == 'ACTIVEACTIVE') {
					clearInterval(activeStateloopInterval);
					connectSocket(name, agentID, taskId, emailInfo, mobileInfo, intent, '');
					addStatusMessage('You are conneted to (' + agentID + ')');
					// console.log("Mampattiyan",userInfoId)
					// resultData = userInfoId
					// document.getElementById("showTest").innerHTML = resultData;
					// console.log("Virrueue",socket.id)
				} else if (messageResponse == 'OFFEREDOFFERED' || messageResponse == 'ACCEPTEDACCEPTED') {
					clearInterval(activeStateloopInterval);
					setTimeout(() => {
						getAgentId(urlInfo)
					}, 1000);
				} else {
					clearInterval(activeStateloopInterval);
					setTimeout(() => {
						connectToCisco()
					}, 30000);
				}

		},
		error: function (xhr, ajaxOptions, thrownError) {
			//console.log("",thrownError.getResponseHeader('Location'));
			clearInterval(activeStateloopInterval);
			setTimeout(() => {
				connectToCisco()
			}, 30000);
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

function connectChating(name, agentID, taskId, emailInfo, mobileInfo, intent) {
	connectSocket(name, agentID, taskId, emailInfo, mobileInfo, intent, '');
}

function startChat() {
	// if(countryName=="IN"){
	unifiedConnection = true;
	userConnected = true;
	let vid = document.getElementById("botvideo");
	let name = $('#name').val();
	let phone = $('#phone').val();
	let email = $('#email').val();
	emailInfo = $('#email').val();
	mobileInfo = $('#phone').val();
	nameInfo = name;
	intent = 'Validation';
	let company_name = $('#company_name').val();

	$('.in-valid').removeClass('in-valid');

	if (name.length == 0) {

		$('#name').addClass('in-valid');
		return false;

	}
	if (phone.length == 0) {

		$('#phone').addClass('in-valid');
		return false;

	}
	if (email.length == 0 || !isEmail(email)) {

		$('#email').addClass('in-valid');
		return false;

	}

	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/create/chatuser',
		data: JSON.stringify({
			"request": {
				"name": name,
				"email": email,
				"mobile": phone,
				"company": company_name
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("machimariyam", resp)
			// let data = resp.response.data;

		}
	});

	addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone + '<br />email:&nbsp;' + email + '<br />company name:&nbsp;' + company_name);
	//addStatusMessage('Your current queue position 1')
	//vid.autoplay = true;
	$('#botvideo').removeClass('cb-hidden');
	vid.load();
	if (name != '' && email != '') {
		$('#frmchat').addClass('cb-hidden');
		$('#frmchat').hide();
		//connectToCisco();


		html2canvas(document.body).then(canvas => {
			console.log("ccccc", canvas)
			//document.body.appendChild(canvas);
			var imgShot = canvas.toDataURL("image/png")
				console.log("JJDJDJD", imgShot)
				var fileHost = 'https://192.168.28.156:7050';
			//    if (this.files && this.files.length > 0) {

			var ImageURL = imgShot;
			// Split the base64 string in data and contentType
			var block = ImageURL.split(";");
			// Get the content type of the image
			var contentType = block[0].split(":")[1]; // In this case "image/gif"
			// get the real base64 content of the file
			var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
			//console.log("djdjdjdj",realData)
			// Convert it to a blob to upload
			var blob = b64toBlob(realData, contentType, 512);
			console.log("VirtualReality", blob)
			let file = blob;
			// let fd = new FormData();


			var formData = new FormData();
			formData.append('files[]', file, 'datas.png');
			$.ajax({
				url: fileHost + '/file/upload',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				method: 'POST',
				type: 'POST', // For jQuery < 1.9
				success: function (resp) {
					// $('.loader-cls').addClass('cb-hidden');
					let data = resp.response.data;
					if (data.files && data.files.length > 0) {
						var file = data.files[0];
						var actualFilename = file.filename;
						console.log("actualFilename", actualFilename)
						var originalname = file.originalname;
						console.log("originalname", originalname)
						connectSocket(name, '', '', emailInfo, mobileInfo, intent, actualFilename);
					} else {}
				}

			});
			//      }
			// }else{
			//   $('.close-chatbot1').removeClass('cb-hidden');
			//   $("#closeChatWindow1").show();
			// }
		});
	}
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, {
			type: contentType
		});
	return blob;
}

function reInitiate() {
	increaseCount = 0;
	requestAgentStatus = false;
	increaseQueueCount = 0;
	startChatDemo();
}

function startChatDemo() {
	//if(countryName=="IN"){
	userConnected = true;
	let vid = document.getElementById("botvideo");
	let name = $('#name').val();
	let phone = $('#phone').val();
	let email = $('#email').val();
	let company_name = "";
	emailInfo = email;
	mobileInfo = phone;
	nameInfo = name;
	intent = 'Validation';
	$('.in-valid').removeClass('in-valid');

	if (name.length == 0) {

		$('#name').addClass('in-valid');
		return false;

	}
	if (phone.length == 0) {

		$('#phone').addClass('in-valid');
		return false;

	}
	if (email.length == 0 || !isEmail(email)) {

		$('#email').addClass('in-valid');
		return false;

	}

	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/create/chatuser',
		data: JSON.stringify({
			"request": {
				"name": name,
				"email": email,
				"mobile": phone,
				"company": company_name
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("machimariyam", resp)
			let data = resp.response.data.result;
			createdChatId = data.chatcreattionId;
			let status = data.status[0];
			console.log("Mariyam", data);
			console.log("Mariyam122", data.status[0])
			setTimeout(() => {
				checkAgentIds(data.refURL[0])
			}, 1000);
			// if(status == 'reserved'){
			//     let agentID = data.agentID[0];
			//     let taskId = data.taskID[0];
			//     let refUrl = data.refURL[0];
			//     activeStateloopInterval = setInterval(() => {
			//       checkAgentStatus(agentID, taskId, refUrl)
			//     },1000)
			// }else if(status=='queued'){
			//   setTimeout(() => {
			//     checkAgentIds(data.refURL[0])
			//   },1000);
			// }

			// if()


		}
	});

	//  addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone+ '<br />email:&nbsp;' + email+ '<br />company name:&nbsp;' + company_name);
	//   vid.autoplay = true;
	$('#botvideo').removeClass('cb-hidden');
	vid.load();
	if (name != '' && email != '') {
		$('#frmchat').addClass('cb-hidden');
		$('#frmchat').hide();
		$('#text-areabutton-show').show();
		$('#text-area-show').show();
		if (requestAgentStatus == false) {
			requestAgentStatus = true
				addStatusMessage('Your details:<br />' + 'name:&nbsp;' + name + '<br />phone:&nbsp;' + phone + '<br />email:&nbsp;' + email + '<br />company name:&nbsp;' + company_name + '<br />Request Submitted, Kindly Hold.&nbsp;');
		}
		// connectToCisco();
		//connectSocket(name);
	}
	// }else{
	//   $('.close-chatbot1').removeClass('cb-hidden');
	//   $("#closeChatWindow1").show();
	// }
}

function checkAgentStatus(agentID, taskId, refUrl) {
	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/check/agentStatus',
		data: JSON.stringify({
			"request": {
				"taskId": taskId
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("machimariyam119919191", resp)
			let data = resp.response.data.result;
			let state = ''
				if (data != null || data != undefined) {
					state = data.state[0];
				} else {
					increaseCount += 1
					if (increaseCount >= 3) {
						addStatusMessage('All agents are busy. Would you like to wait on queue click  <button type="button" class="btn btn-primary" onclick="reInitiate()">Wait</button> or close <button type="button" class="btn btn-primary" onclick="confirmPopup()">Close</button> ');
					} else {
						addStatusMessage('All agents are busy. Please wait while we connect you to available agent.');
						setTimeout(() => {
							startChatDemo()
						}, 1000);
					}
				}
				if (state == 'ACTIVE') {
					var minm = 10000;
					var maxm = 99999;
					var displayNymber = Math.floor(Math
							.random() * (maxm - minm + 1)) + minm;
					connectSocket(displayNymber, nameInfo, createdChatId, agentID, taskId, emailInfo, mobileInfo, intent, '7ab8a15d-a0e1-471e-a2ff-5cdaaa462e77.jpg');
					ciscoAgentID = agentID
						setTimeout(() => {
							checkAgentNameAndId(agentID)
						}, 1000);
					addStatusMessage('Thank you for contacting Axis Securities');
					// if(agentID==5219){
					//   addStatusMessage('You are conneted to Samuel Gomes');
					// }else if(agentID==5082){
					//   addStatusMessage('You are conneted to Repello Meric');
					// }else if(agentID==5071){
					//   addStatusMessage('You are conneted to chat user2');
					// }else{
					//}
				} else if (state == 'OFFERED' || state == 'ACCEPTED') {
					setTimeout(() => {
						checkAgentIds(refUrl)
					}, 1000);
				}
				// else{
				//   clearInterval(activeStateloopInterval);
				//   setTimeout(() => {
				//     startChatDemo()
				//   },30000);
				// }

		}
		// ,error : function (err){
		//   clearInterval(activeStateloopInterval);
		//     setTimeout(() => {
		//       startChatDemo()
		//     },30000);
		// }
	});
}

function checkAgentNameAndId(agentId) {
	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/agentInfoBasedOnId',
		data: JSON.stringify({
			"request": {
				"userId": agentId
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			let data = resp.response.data;
			console.log("Remkkldkldk", data)
			agentNameAndID = data.lastName
				console.log("Remkkldkldk1", agentNameAndID)
				addStatusMessage('You are connected to (' + agentNameAndID + ')');
		}
	});
}

function checkAgentIds(refUrl) {
	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/check/getAgentIds',
		data: JSON.stringify({
			"request": {
				"taskUrl": refUrl
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			let data = resp.response.data.result;
			let status = data.status[0];
			console.log("Mariyam", data);
			console.log("Mariyam12233", data.status[0])
			// console.log("Virtumalove",rep)
			if (status == 'reserved') {
				increaseQueueCount = 0
					let agentID = data.agentID[0];
				let taskId = data.taskID[0];
				let refUrl = data.refURL[0];
				setTimeout(() => {
					checkAgentStatus(agentID, taskId, refUrl)
				}, 1000);
			} else if (status == 'queued') {
				// increaseQueueCount+=1
				// console.log("Mitta",increaseQueueCount)
				// if(increaseQueueCount>=50){
				//   addStatusMessage('No agents are available. Would you like to wait on queue click  <button type="button" class="btn btn-primary" onclick="reInitiate()">Wait</button> or close <button type="button" class="btn btn-primary" onclick="confirmPopup()">Close</button> ' );
				//   // setTimeout(() => {
				//   //   startChatDemo()
				//   // },1000);
				// }else{
				setTimeout(() => {
					checkAgentIds(refUrl)
				}, 1000);
				//}
			} else if (status == 'discarded') {
				addStatusMessage('No agents are available. Would you like to wait on queue click  <button type="button" class="btn btn-primary" onclick="reInitiate()">Wait</button> or close <button type="button" class="btn btn-primary" onclick="confirmPopup()">Close</button> ');
			}

		}
	});
}

function checkTImings() {

	let date = new Date()

		// date.getDay();
		// date.getDate();
		// date.getFullYear();
		// date.getMonth();
		// if(date.getDay()!=0 && date.getDay()!=6){
		//   console.log("DKKDKDDK",date.getHours())
		//   if(date.getHours()>=9 && date.getHours()<=20){
		connectToLiveChat()
		//$('.product1').show();
		//   }else{
		//     connectToLiveChat()
		//   }
		//   //connectToLiveChat()
		// }else{
		//   $('.product1').show();

		// }
		// console.log("JDJDJDJDJDD",date.getDay())
		// console.log(date.getDate());
		// console.log(date.getFullYear());
		// console.log(date.getMonth());
		// console.log(date.getHours());
		// console.log(date.getMinutes());


		// connectToLiveChat
}

function connectToLiveChat() {
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();

	$('.default-option').addClass('disabled');
	$('li').addClass('disabled');
	$('#frmEnq').addClass('cb-hidden');
	$('#frmEnq').hide();
	$('#frmchat').show();
	$('.send-icon').removeClass('disabled');
	$('#txtMsg').attr('disabled', false);
	$('#txtMsg').removeClass('disabled');

	$('.send-icon').removeClass('cb-hidden');
	$('#txtMsg').removeClass('cb-hidden');

	$('.send-icon1').addClass('cb-hidden');
	$('#txtMsg1').addClass('cb-hidden');

}
function connectToVideoChat() {
	//console.log("ksksksksk",videoChat)
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();

	$('.default-option').addClass('disabled');
	$('li').addClass('disabled');
	$('#frmEnq').addClass('cb-hidden');
	$('#frmEnq').hide();
	$('#frmchat').show();
	$('.send-icon').removeClass('disabled');
	$('#txtMsg').attr('disabled', false);
	$('#txtMsg').removeClass('disabled');

	$('.send-icon').removeClass('cb-hidden');
	$('#txtMsg').removeClass('cb-hidden');

	$('.send-icon1').addClass('cb-hidden');
	$('#txtMsg1').addClass('cb-hidden');
	videoChat = true;

}

function submitFrm() {
	$('.send-icon').addClass('disabled');
	$('#txtMsg').attr('disabled', true);
	$('#txtMsg').removeClass('disabled');

	$('.send-icon').removeClass('cb-hidden');
	$('#txtMsg').removeClass('cb-hidden');

	$('.send-icon1').addClass('cb-hidden');
	$('#txtMsg1').addClass('cb-hidden');
	$('#frmEnq').hide();
	$('#messages').append('<div class="joined">Request Submitted, Kindly Hold.</div>');
	$("#messages").animate({
		scrollTop: $('#messages').prop("scrollHeight")
	}, 1000);
}

function addToConversation(who, msgType, content) {
	// Escape html special characters, then add linefeeds.
	content = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	content = content.replace(/\n/g, '<br />');

	// document.getElementById('conversation').innerHTML +=
	//   "<b>" + who + ":</b>&nbsp;" + content + "<br />";
}
function stopAutoPlay() {
	let vid = document.getElementById("botvideo");
	vid.autoplay = false;
	vid.load();
}

function requestCall(type) {
	$("#closeChatWindow1").hide();
	if (!activeCallRequest && connected == true) {
		channelId = (new Date()).valueOf();
		socket.emit('CALL_REQUEST', {
			userId: agentId,
			sessionId: socket.id,
			callType: type,
			channelId: channelId,
			countryName: countryName,
			cityName: cityName,
			region: region,
			systemIp: systemIp,
			latitude: latitude,
			longitude: longitude,
			email: emailInfo,
			mobile: mobileInfo,
			intent: intent
		});
		activeCallRequest = true;
		activeCallType = type;
		$(".callRequestCls ").removeClass('cb-hidden');
		showToaster('info', 'Call request initiated');
		stopAutoPlay()
	}

}

function shareScreen() {
	$.ajax({
		url: 'https://api.screenleap.com/v2/screen-shares?accountid=zuqo&isSecure=true&allowViewerMouse=true&allowRemoteControl=true',
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		headers: {
			'authtoken': 'RSXQuiXBSL'
		},
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("Potential", resp)
			screenleap.onScreenShareStarting = function () {
				console.log("screensharestarting")
			}
			screenleap.onNativeDownloadStartCallback = function () {
				console.log("screensharestarting")
			}
			screenleap.onAppConnectionFailed = function () {
				console.log("screensharestarting")
			}
			screenleap.onScreenShareStartError = function () {
				console.log("screensharestarting")
			}

			var callbacks = {
				// nativeDownloadStarting: onNativeDownloadStartCallback,
				// screenShareStarting: onScreenShareStarting,
				// appConnectionFailed: onAppConnectionFailed,
				// screenShareStartError: onScreenShareStartError
			};
			console.log("jjhjhjh")
			screenleap.startSharing('IN_BROWSER', resp, callbacks);
			// var finalURl = resp.viewerUrl
			// var reulstURL = finalURl.replace("http", "https");
			screenShareLink = resp.viewerUrl;
			screenShareCode = resp.screenShareCode;
			console.log("Valikdkdkdidi", screenShareLink)
			$('.screenShareStop').removeClass('cb-hidden');
			$('.screenShareStart').addClass('cb-hidden');

			// var minm = 10000;
			//       var maxm = 99999;
			//       var displayNymber = Math.floor(Math
			//       .random() * (maxm - minm + 1)) + minm;
			//     var finalValue = '#'+displayNymber
			//     var url = resp.viewerUrl;
			//     if (url.indexOf('?') > -1){
			//       url += finalValue
			//     }else{
			//       url += finalValue
			//     }
			//     screenShareLink = url;
			// videoChat  = true;

			socket.emit('SCREEN_SHARE_REQUEST', {
				sessionId: socket.id,
				userId: agentId,
				recordLink: screenShareLink
			});
			//console.log("podikkidkdike",displayNymber)

			//       var urlInfo = location.href;
			//  urlInfo.searchParams.append('#', displayNymber);
			// connectSocket(displayNymber)
		}
	});

}

function stopShareScreen() {
	$('.screenShareStop').addClass('cb-hidden');
	$('.screenShareStart').removeClass('cb-hidden');
	socket.emit('SCREEN_SHARE_END', {
		sessionId: socket.id,
		userId: agentId,
		endData: ""
	});
	$.ajax({
		url: 'https://api.screenleap.com/v2/screen-shares/' + screenShareCode + '/stop?accountid=zuqo&isSecure=true',
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		headers: {
			'authtoken': 'RSXQuiXBSL'
		},
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("Potential", resp)
			// screenleap.onScreenShareStarting = function(){
			//   console.log("screensharestarting")
			// }
			// screenleap.onNativeDownloadStartCallback = function(){
			//   console.log("screensharestarting")
			// }
			// screenleap.onAppConnectionFailed = function(){
			//   console.log("screensharestarting")
			// }
			// screenleap.onScreenShareStartError = function(){
			//   console.log("screensharestarting")
			// }

			var callbacks = {
				// nativeDownloadStarting: onNativeDownloadStartCallback,
				// screenShareStarting: onScreenShareStarting,
				// appConnectionFailed: onAppConnectionFailed,
				// screenShareStartError: onScreenShareStartError
			};
			console.log("jjhjhjh")
			//screenleap.startSharing('IN_BROWSER', resp, callbacks);
			// var finalURl = resp.viewerUrl
			// var reulstURL = finalURl.replace("http", "https");
			//screenShareLink = resp.viewerUrl;
			console.log("Valikdkdkdidi", screenShareLink)
			$('.screenShareStop').addClass('cb-hidden');
			$('.screenShareStart').removeClass('cb-hidden');

			// var minm = 10000;
			//       var maxm = 99999;
			//       var displayNymber = Math.floor(Math
			//       .random() * (maxm - minm + 1)) + minm;
			//     var finalValue = '#'+displayNymber
			//     var url = resp.viewerUrl;
			//     if (url.indexOf('?') > -1){
			//       url += finalValue
			//     }else{
			//       url += finalValue
			//     }
			//     screenShareLink = url;
			// videoChat  = true;

			// socket.emit('SCREEN_SHARE_REQUEST', {
			//       sessionId: socket.id,
			//       userId: agentId,
			//       recordLink: screenShareLink
			// });
			//     console.log("podikkidkdike",displayNymber)

			//       var urlInfo = location.href;
			//  urlInfo.searchParams.append('#', displayNymber);
			//connectSocket(displayNymber)
		}
	});

}

function openCobrowseForm() {
	console.log("sdjskskdkskdkskd")
	$('.open-cobrowse').removeClass('cb-hidden');
	$('.open-cobrowse').show();
}

function rejectCall() {
	activeCallRequest = false;
	callRequestDetails = {};
	$('#callRequest').hide();
	socket.emit('CALL_REQUEST_REJECTED', {
		userId: agentId,
		sessionId: socket.id,
		callType: ''
	});
	stopAutoPlay()

}

function acceptCall() {
	if (activeCallRequest && activeCall == false) {
		$('#callRequest').hide();
		activeCallRequest = false;
		activeCall = true;
		callFlowType = 'receive';
		window.localStorage.setItem('activeCallType', activeCallType);
		if (activeCallType != 'video') {
			$('.call-camera').hide();
		} else {
			$('.call-camera').show();
		}
		audioDisabled = false;
		videoDisabled = false;
		$('.call-camera').removeClass('muted');
		$('.call-mike').removeClass('muted');
		console.log(agentId, socket.id, "remo");
		socket.emit('CALL_REQUEST_ACCEPTED', {
			userId: agentId,
			sessionId: socket.id,
			callType: ''
		});
		setTimeout(() => {
			//connect();
			$('.call-frame').show();
		}, 1000);
		/* childWindow = window.open('https://instadesk-demo.in:8443/demos/demo_audio_video_simple.html?sessionId='+username+'&to='+agentId+'&type='+activeCallType+'&flowType='+callFlowType,'_blank', windowCfg);
		//$(iframe).show();
		callTimer = setInterval(() => {
		if (childWindow && childWindow.closed) {
		activeCallRequest = false;
		setTimeout(()=>{
		activeCall = false;
		},100);
		clearInterval(callTimer);
		console.log('call completed');
		}
		}, 500);

		 */
		stopAutoPlay()
	}
}


	$(".chatbox-open").click(() =>
		$(".chatbox-popup, .chatbox-close").fadeIn());

	$(".chatbox-close").click(() =>
		$(".chatbox-popup, .chatbox-close").fadeOut());

	$(".chatbox-maximize").click(() => {
		$(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
		$(".chatbox-panel").fadeIn();
		$(".chatbox-panel").css({
			display: "flex"
		});
	});

	$(".chatbox-minimize").click(() => {
		$(".chatbox-panel").fadeOut();
		$(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
	});

	$(".chatbox-panel-close").click(() => {
		$(".chatbox-panel").fadeOut();
		$(".chatbox-open").fadeIn();
	});


var dateFormat = function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	timezoneClip = /[^-+\dA-Z]/g,
	pad = function (val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len)
			val = "0" + val;
		return val;
	};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date))
			throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get",
		d = date[_ + "Date"](),
		D = date[_ + "Day"](),
		m = date[_ + "Month"](),
		y = date[_ + "FullYear"](),
		H = date[_ + "Hours"](),
		M = date[_ + "Minutes"](),
		s = date[_ + "Seconds"](),
		L = date[_ + "Milliseconds"](),
		o = utc ? 0 : date.getTimezoneOffset(),
		flags = {
			d: d,
			dd: pad(d),
			ddd: dF.i18n.dayNames[D],
			dddd: dF.i18n.dayNames[D + 7],
			m: m + 1,
			mm: pad(m + 1),
			mmm: dF.i18n.monthNames[m],
			mmmm: dF.i18n.monthNames[m + 12],
			yy: String(y).slice(2),
			yyyy: y,
			h: H % 12 || 12,
			hh: pad(H % 12 || 12),
			H: H,
			HH: pad(H),
			M: M,
			MM: pad(M),
			s: s,
			ss: pad(s),
			l: pad(L, 3),
			L: pad(L > 99 ? Math.round(L / 10) : L),
			t: H < 12 ? "a" : "p",
			tt: H < 12 ? "am" : "pm",
			T: H < 12 ? "A" : "P",
			TT: H < 12 ? "AM" : "PM",
			Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
		};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}
();

// Some common format strings
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

function expandSection(id) {
	//chatHistory.push('selected option: '+id);

	chatHistory.push('<div class="default-option disabled" id="' + id + '" > <i class="fa fa-line-chart" aria-hidden="true"></i> ' + $('#' + id).text() + ' </div><br />');
	$('#frmEnq').addClass('cb-hidden');
	$('#frmEnq').hide();
	$('.default-inner').slideUp(100);
	$('.default-inner').addClass('cb-hidden');
	$('#' + id + 'List').removeClass('cb-hidden')
	$('#' + id + 'List').slideDown(200);

}

function sendMsgTrigger(e) {
	var key = window.event.keyCode;
	if (key === 13) {
		sendMsg(e);
	}
}

function sendMsgTrigger1(e) {
	var key = window.event.keyCode;
	if (key === 13) {
		checkBalance();
		// sendMsg(e);
	}
}

function sendMsg(e) {
	if (connected == true) {
		e.preventDefault(); // prevents page reloading
		if (agentId && socket) {
			messageDataInfo.push($('#txtMsg').val())
			console.log("JDJDJJD1234", messageDataInfo)
			var tmpl = '<div class="customer emty hide-cus" style="margin-right: 24px;">  <span>' + $('#txtMsg').val() + '</span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div>';
			var tmp2 = '<div class="trancustomer emty hide-cus cb-hidden" style="color: #ff3b30;"> <div>' + dateFormat(new Date(), 'h:MM') + ' -- Customer (' + nameInfo + ') ' + ' -- ' + '<span>' + $('#txtMsg').val() + '</span></div></div>';
			$("#messages").append(tmpl);
			$("#messages").append(tmp2);
			socket.emit('message', {
				sessionId: socket.id,
				text: $('#txtMsg').val(),
				otherUserId: agentId
			});
			$('#txtMsg').val('');
			$("#messages").animate({
				scrollTop: $('#messages').prop("scrollHeight")
			}, 1000);
			stopAutoPlay()
		}
	}

};

function onTypeCall(e) {
	if ($('#txtMsg').val() != "" && $('#txtMsg').val().substring(0, 1) == "#") {
		let sendMessage = $('#txtMsg').val().replace('#', '');
		let text = "";
		var i;
		var fileHost = SOCKET_HOST;
		$.ajax({
			url: fileHost + '/cannedmessage/search',
			data: JSON.stringify({
				"request": {
					"key": sendMessage,
					"name": "Customer"
				}
			}),
			dataType: 'json',
			cache: false,
			contentType: "application/json",
			processData: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (result) {
				if (result.response.data.length != 0) {
					if (result.response.data[0].values.length != 0) {
						let cannedMessageResult = result.response.data[0].values
							//let showSuggestMessage = true
							$('.open-auto-suggest').removeClass('cb-hidden');
						$('.open-auto-suggest').show();
						//$('.open-auto-suggest').removeClass('cb-hidden')
						const buttonsContainer = document.getElementById("add-button-text");
						for (var i = 0; i < cannedMessageResult.length; i++) {
							document.getElementById("add-button-text").innerHTML += "<input type = 'button' value = '" + cannedMessageResult[i] + "' onclick = selectCannedMessage(this) class='card' style='left: -49px;height: 35px; width: 240px;'>";

							// const button = document.createElement("button");
							// button.innerText = cannedMessageResult[i];
							// button.type = 'button'
							// $(cannedMessageResult[i]).addClass('btn btn-primary')
							// button.addClass= ('btn btn-primary')
							// button.addEventListener("click", function() {
							//   console.log(i)
							// })
							// buttonsContainer.appendChild(button);
						}

						// for (i = 0; i < cars.length; i++) {
						//    text += cannedMessageResult[i] + "<br>";
						// }
						// $('#cannedmessage-data').val(text);
						// console.log("kKdkkddkk",text)
					}
				}
			}
		});
	} else {
		console.log("false")
	}
}

function selectCannedMessage(thisData) {

	$('#txtMsg').val(thisData.value)
	$('.open-auto-suggest').addClass('cb-hidden');
	$('.open-auto-suggest').hide();
	console.log("jdjdjdj", thisData.value)
}

$('.chatbox-panel__header').hide();

var selfEasyrtcid = "";
var sessionId = "";
var otherId = "";
var callType = "";
var flowType = "";
var videoDisabled = false;
var audioDisabled = false;
var callStarted = false;
//var videoChat = false;
var screenShareLink = "";
var screenShareCode = "";

function connect() {

	sessionId = username;
	otherId = agentId;
	callType = activeCallType;
	flowType = callFlowType;

	window.localStorage.setItem('channelId', channelId);
	window.localStorage.setItem('sessionId', sessionId);
	window.localStorage.setItem('callFlowType', callFlowType);
	window.localStorage.setItem('callType', callType);

	$('.call-frame').show();
	/*
	setTimeout(() => {
	initCall();
	createButtonClickHandler();
	setTimeout(() => {
	$('video').each((item) => {
	let vdo = $('video')[item];
	if (vdo && vdo.id == 'selfVideo') {
	vdo.muted = true;
	vdo.controls = true;
	}
	})
	}, 500);
	}, 200); */
}

$(document).ready(() => {
	function dragElement(elmnt) {
		var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
		if (document.getElementById(elmnt.id + "header")) {
			/* if present, the header is where you move the DIV from:*/
			document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
		} else {
			/* otherwise, move the DIV from anywhere inside the DIV:*/
			elmnt.onmousedown = dragMouseDown;
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}

		function closeDragElement() {
			/* stop moving when mouse button is released:*/
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	dragElement(document.getElementById('callFrame'));
});
function stopCall(child) {
	activeCallRequest = false;
	activeCall = false;
	//stopActiveCall();
	stop(true);
	socket.emit('CALL_COMPLETED', {
		userId: agentId,
		sessionId: this.socket.id
	});

	setTimeout(() => {

		$('.call-frame').hide();
	}, 100);

}

function openFilePicker() {
	$('#filePicker').click();
	stopAutoPlay()

}

function OpenAadharFrontPage() {
	$('#myFile').click();
}

function OpenOtherFrontPage() {
	$('#myFile3').click();
}

function OpenOtherBackPage() {
	$('#myFile4').click();
}

function openDocumet() {
	$('#cobrowseDocument').click();
}

function openForm() {
	$('.cobrowse-forms-link').show();
}

function openUrl() {
	$('.cobrowse-url-link').show();
	$('#cobrowseurlid').show();

}

function OpenAadharBackPage() {
	$('#myFile1').click();
}
function OpenPanPage() {
	$('#myFile2').click();
}

function OpenSignaturePage() {
	$('#myFile5').click();
}

function coBrowseDocument(input) {
	console.log("DKDKDKDKDKDKDKD")
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah1121')
			.attr('src', e.target.result);
		};
		$('.cobrowse-document-link').show();
		reader.readAsDataURL(input.files[0]);
	}
}
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function readURL1(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah1')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
function readURL2(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah2')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function readURL3(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah3')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function readURL4(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah4')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function readURL5(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah5')
			.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function popupClose() {
	$('.photodiv-cls').removeClass('cb-hidden');
	$('.phot-div-clss').addClass('cb-hidden');
	$(".kyc-popup").hide();
}

function closeCoBrowse() {
	$('.open-cobrowse').removeClass('cb-hidden');
	$('.open-cobrowse').hide()
}

function popupClose1() {
	$('.photodiv1-cls').removeClass('cb-hidden');
	$('.phot1-div-clss').addClass('cb-hidden');
	$(".kyc1-popup").hide();
}
function popupClose3() {
	$('.photodiv3-cls').removeClass('cb-hidden');
	$('.phot3-div-clss').addClass('cb-hidden');
	$(".kyc3-popup").hide();
}
function choosepopupClose() {
	$('.choose-balace-checker').removeClass('cb-hidden');
	$('.choose-balance').addClass('cb-hidden');
	$(".choose-popup").hide();
}
function choosepopupClose1() {
	$('.choose-balace-checker1').removeClass('cb-hidden');
	$('.choose-balance1').addClass('cb-hidden');
	$(".choose-popup1").hide();
}
function choosepopupClose2() {
	$('.choose-balace-checker2').removeClass('cb-hidden');
	$('.choose-balance2').addClass('cb-hidden');
	$(".choose-popup2").hide();
}
function choosepopupClose3() {
	$('.choose-balace-checker3').removeClass('cb-hidden');
	$('.choose-balance3').addClass('cb-hidden');
	$(".choose-popup3").hide();
}
function choosepopupClose4() {
	$('.choose-balace-checker4').removeClass('cb-hidden');
	$('.choose-balance4').addClass('cb-hidden');
	$(".choose-popup4").hide();
}
$(document).ready(function () {
	$('.button-disable-enable').attr('disabled', true);
	$('.button-disable-enable1').attr('disabled', true);
	$('.button-disable-enable2').attr('disabled', true);
	$('.button-disable-enable15').attr('disabled', true);
	$('.button-disable-enable16').attr('disabled', true);
	$('.button-disable-enable17').attr('disabled', true);

	// if(aadhaarFrontName!=undefined && aadhaarBackName!=undefined){
	//   console.log("Mambatti",aadhaarFrontName)
	//   $('.button-disable-enable').attr('disabled', false);
	//   $('.button-disable-enable1').attr('disabled', false);
	//   $('.button-disable-enable2').attr('disabled', false);

	// }else{
	//   console.log("Mambatti1",aadhaarFrontName)
	//   $('.button-disable-enable').attr('disabled',true);
	//   $('.button-disable-enable1').attr('disabled', false);
	//   $('.button-disable-enable2').attr('disabled', false);

	// }
});

$(document).ready(() => {

	$("input[type=file]").on('change', function () {
		$('.loader-cls').removeClass('cb-hidden');
		console.log("vittama", this.files[0])
		var fileHost = 'https://192.168.28.156:7050';
		if (this.files && this.files.length > 0) {
			var formData = new FormData();
			formData.append('files[]', this.files[0]);
			$.ajax({
				url: fileHost + '/file/upload',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				method: 'POST',
				type: 'POST', // For jQuery < 1.9
				success: function (resp) {
					$('.loader-cls').addClass('cb-hidden');
					let data = resp.response.data;
					if (data.files && data.files.length > 0) {
						var file = data.files[0];
						// convertFileInfo(file.filename)
						//coBrowseDocumentFileName = file.filename;
						var fileData = file.filename.substring(file.filename.indexOf('.'))
							console.log("KDKDKDKDDKKDKDKDD", fileData)
							// if(fileData!='.jpg' && fileData!='.png' && fileData!='.jpeg'){
							//   //convertFileInfo(file.filename)
							// //coBrowseDocumentFileName = file.filename;
							//   coBrowseDocumentOriginalFileName = file.originalname;
							//   $('.loader-cls').addClass('cb-hidden');
							//   console.log("machimariyam",resp.response.data)
							//     coBrowseDocumentFileName =  file.filename
							// }
							var tmpl = '<div class="joined hide-cus"> <span>File shared: &nbsp;<a target="_blank" href="' + fileHost + '/files/' + file.filename + '">' + file.originalname + '</a></span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div>';
						console.log("Viruchi", tmpl)
						$("#messages").append(tmpl);
						$("#messages").animate({
							scrollTop: $('#messages').prop("scrollHeight")
						}, 1000);
						if (agentId && socket) {
							if (unifiedConnection == true) {
								var requestUrl = fileHost + '/files/' + file.filename;
								console.log("skdsjdsd", aadhaarFrontName)
								if (aadhaarFrontName == undefined) {
									aadhaarFrontName = requestUrl
										console.log("Vichu", aadhaarFrontName);
								} else if (aadhaarBackName == undefined) {
									aadhaarBackName = requestUrl
										console.log("Kachu", aadhaarBackName);
								} else if (panCardFront == undefined) {
									panCardFront = requestUrl
										console.log("Kachu", panCardFront);
								} else if (signature == undefined) {
									signature = requestUrl
								}

								if (selectedIdCard == 'voter') {}
								else if (selectedIdCard == 'passport') {
									if (passportFront == undefined) {
										passportFront = requestUrl
									} else if (passportBack == undefined) {
										passportBack = requestUrl
									}

								} else if (selectedIdCard == 'drivingLicence') {
									if (drivingFront == undefined) {
										drivingFront = requestUrl
									} else if (drivingBack == undefined) {
										drivingBack = requestUrl
									}
								} else if (selectedIdCard == 'other') {}

								if (aadhaarFrontName != undefined && aadhaarBackName != undefined) {
									$('.button-disable-enable').attr('disabled', false);
								}

								if (panCardFront != undefined) {
									$('.button-disable-enable1').attr('disabled', false);
								}

								if (selectedIdCard == 'voter') {
									// if(aadhaarFrontName!=undefined && aadhaarBackName!=undefined){
									//   $('.button-disable-enable2').attr('disabled', false);
									// }
								} else if (selectedIdCard == 'passport') {
									if (passportFront != undefined && passportBack != undefined) {
										$('.button-disable-enable2').attr('disabled', false);
									}
								} else if (selectedIdCard == 'drivingLicence') {
									if (drivingFront != undefined && drivingBack != undefined) {
										$('.button-disable-enable2').attr('disabled', false);
									}
								} else if (selectedIdCard == 'other') {
									// if(aadhaarFrontName!=undefined && aadhaarBackName!=undefined){
									//   $('.button-disable-enable2').attr('disabled', false);
									// }
								}

								if (signature != undefined) {
									$('.button-disable-enable3').attr('disabled', false);
								}

								//  let aadhaarFrontName;
								//   let aadhaarBackName;


								//   var requestUrl = fileHost+'/files/'+file.filename;
								//   var formDatas = new FormData();
								//   formDatas.append('url',requestUrl)
								//   formDatas.append('language','eng')
								//   formDatas.append('scale',true)
								//   formDatas.append('isOverlayRequired',false)
								//   formDatas.append('iscreatesearchablepdf',false)
								//   formDatas.append('issearchablepdfhidetextlayer',false)
								//   formDatas.append('detectOrientation',false)
								//   formDatas.append('isTable',true)

								//   $.ajax({
								//     url: 'https://api.ocr.space/parse/image',
								//     data: formDatas,
								//     cache: false,
								//     contentType: false,
								//     processData: false,
								//     headers: { 'apiKey': '1a7ca69e5088957' },
								//     method: 'POST',
								//     type: 'POST',
								//     success: function(resp){

								//       console.log("Machi",resp)
								//     }
								//   })
							} else {
								socket.emit('FILE_SHARE', {
									sessionId: socket.id,
									fileName: file.originalname,
									fileLink: file.filename,
									otherUserId: agentId
								});
							}
						}
					}
				}
			});
		}

	});

});

function convertFileInfo(url) {
	var fileHost = 'https://192.168.28.156:7050';
	let fullUrl = fileHost + '/files/' + url
		$.ajax({
			url: SOCKET_HOST + '/convertFile',
			data: JSON.stringify({
				"request": {
					"file": fullUrl
				}
			}),
			dataType: 'json',
			cache: false,
			contentType: "application/json",
			processData: false,
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (resp) {
				$('.loader-cls').addClass('cb-hidden');
				console.log("machimariyam", resp.response.data)
				//coBrowseDocumentFileName =  resp.response.data
				// let data = resp.response.data;
				// socket.emit('COBROWSE_LINK', {
				//           sessionId: socket.id,
				//           userId: agentId,
				//           link: 'https://zmeet.in/co-browse/?doc=' + resp.response.data + '&userId=' + agentId  + '&to=' + nameInfo
				// });
			}
		});
	$('.loader-cls').addClass('cb-hidden');

}

var videoDisabled = false;
var audioDisabled = false;
function hangup() {
	stopCall(false);

}

function disableVideo() {
	videoDisabled = !videoDisabled;
	muteVideo(!videoDisabled);
	if (videoDisabled == true) {
		$('.call-camera').addClass('muted');
	} else {
		$('.call-camera').removeClass('muted');

	}

}

function disableAudio() {

	audioDisabled = !audioDisabled;
	muteAudio(!audioDisabled);
	if (audioDisabled == true) {
		$('.call-mike').addClass('muted');
	} else {
		$('.call-mike').removeClass('muted');

	}

}

function clearPopup() {
	$('.close-chatbot2').addClass('cb-hidden');
	$("#closeChatWindow2").show();
}
function clearDataAndClose() {

	$("#frmchat")[0].reset();
	$('#frmEnq').hide();
	$('#frmchat').hide();
	$('.default-option').removeClass('disabled');
	$('li').removeClass('disabled');
	$('.default-inner').addClass('cb-hidden');
	$('#botvideo').addClass('cb-hidden');
	$('.close-chatbot').addClass('cb-hidden');
	$("#closeChatWindow").hide();
	$('.chatbox-popup').css('display', 'none');
	$('#text-areabutton-show').hide();
	$('#text-area-show').hide();
	goBack();
}
function goBack() {
	var vid = document.getElementById("botvideo");
	vid.autoplay = false;
	$(".emty").empty();
	$('.product').show();
	$('.customer').show();
	$('.job').show();
	$('.sales').show();
	$('.hide-cus').hide();
	$('.hide-agent').hide();
	$('.callRequestCls').addClass('cb-hidden');
	$('#botvideo').addClass('cb-hidden');
	$('.callRequestCls').addClass('cb-hidden');

	vid.load();

}
// ===============starts sales============
function getCompany() {
	let cmpy_name = $('#cmpy_name').val();
	$('.in-valid').removeClass('in-valid');

	if (cmpy_name.length == 0) {

		$('#cmpy_name').addClass('in-valid');
		return false;

	}
	setTimeout(() => {
		cal = '<div class="agent emty"> <span>Excellent! Please go ahead and <a href="https://calendly.com/sriram-kappaganthu" target="_blank">schedule a meeting</a> with our sales.</span><div class="agent-time"></div></div>';
		$("#messages").append(cal);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);
	}, 1000);
}

function getEmail() {
	let email = $('#c_email').val();
	$('.in-valid').removeClass('in-valid');

	if (email.length == 0 || !isEmail(email)) {

		$('#c_email').addClass('in-valid');
		return false;

	}
	setTimeout(() => {
		cmpy = '<div class="agent emty"> <span>What is the name of the company you work for?</span><div class="agent-time"></div></div>';
		cmpy += '<div class="card-div1 emty"><form><div class="input-group mb-3 input-group-sm"><input type="text" id="cmpy_name" placeholder="company name" class="form-control text-fld" required><div class="input-group-prepend"><span class="input-group-text" onclick="getCompany()""><i class="fa fa-angle-right" aria-hidden="true"></i></span></div></div></form></div>'
		$("#messages").append(cmpy);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);

	}, 1000);
}
//sales
function sales() {
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();
	var tmpl = '<div class="customer emty">  <span>I want to speak to sales</span><div class="customer-time"></div></div>';
	$("#messages").append(tmpl);
	var msgList = ["Great! I just need a few more details to get you to the right place.", "What is your email id?"];
	setTimeout(() => {
		var salestmpl;
		salestmpl = '<div class="agent emty"> <span>' + msgList[0] + '</span><div class="agent-time"></div></div>';
		salestmpl += '<div class="agent emty"> <span>' + msgList[1] + '</span><div class="agent-time"></div></div>';
		salestmpl += '<div class="emty"><form><div class="input-group mb-3 input-group-sm"><input type="email" id="c_email" placeholder="Your Email" class="form-control text-fld"><div class="input-group-prepend"><button type="button" class="input-group-text" onclick="getEmail()""><i class="fa fa-angle-right" aria-hidden="true"></i></button></div></div></form></div>'
		$("#messages").append(salestmpl);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);

	}, 1000);

}
// ===============end sales============

function products() {
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();
	var tmpl = '<div class="customer emty"><span>I want to learn more about Acqueon products</span><div class="customer-time"></div></div>';
	$("#messages").append(tmpl);
	setTimeout(() => {
		var product;
		product = '<div class="agent emty"> <span class="reply-logo"></span> <span>No problem, you can find information about our <a href="http://www.acqueon.com/allproducts/" target="_blank">Products</a> here.</span><div class="agent-time"></div></div>';
		$("#messages").append(product);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);

	}, 1000);

}
// =============end products============

function customer() {
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();
	// var tmpl = '<div class="customer emty"><span>I am an existing customer and I need help</span><div class="customer-time"></div></div>';
	// $("#messages").append(tmpl);
	setTimeout(() => {
		var customer;
		customer = '<div class="agent emty"><span class="reply-logo"></span><span>Please reach out to Product Support Desk @ +91 44 3089 4888 /+91 44 6108 4888 (APAC and MEA) +1 888 946 6878 (USA and Europe) or write to <a href="mailto:support@acqueon.com" target="_blank">support@acqueon.com.</a></span><div class="agent-time"></div></div>';
		$("#messages").append(customer);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);

	}, 1000);

}
// ===============end customer============
function job() {
	$('.product').hide();
	$('.customer').hide();
	$('.job').hide();
	$('.sales').hide();
	// var tmpl = '<div class="customer emty"><span>I am looking for a job opportunity</span><div class="customer-time"></div></div>';
	// $("#messages").append(tmpl);
	setTimeout(() => {
		var job;
		job = '<div class="agent emty"> <span class="reply-logo"></span><span>Please visit our <a href="http://www.acqueon.com/careers/" target="_blank">Careers</a> section to view open positions or share your updated resume to  <a href="mailto:careers@acqueon.com" target="_blank">careers@acqueon.com</a></span><div class="agent-time"></div></div>';
		$("#messages").append(job);
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);

	}, 1000);

}

function openCardEnterBOx() {
	$('.choose-balace-checker').addClass('cb-hidden');
	$('.choose-balance').addClass('cb-hidden');
	$(".choose-popup").hide();

	$('.choose-balace-checker1').removeClass('cb-hidden');
	$('.choose-balance1').removeClass('cb-hidden');
	$(".choose-popup1").show();
}

function openMobileEnterBOx() {

	$('.choose-balace-checker').addClass('cb-hidden');
	$('.choose-balance').addClass('cb-hidden');
	$(".choose-popup").hide();

	$('.choose-balace-checker2').removeClass('cb-hidden');
	$('.choose-balance2').removeClass('cb-hidden');
	$(".choose-popup2").show();
}

function openPinPopup() {

	$('.choose-balace-checker').addClass('cb-hidden');
	$('.choose-balance').addClass('cb-hidden');
	$(".choose-popup").hide();

	$('.choose-balace-checker1').addClass('cb-hidden');
	$('.choose-balance1').addClass('cb-hidden');
	$(".choose-popup1").hide();

	$('.choose-balace-checker2').addClass('cb-hidden');
	$('.choose-balance2').addClass('cb-hidden');
	$(".choose-popup2").hide();

	$('.choose-balace-checker3').removeClass('cb-hidden');
	$('.choose-balance3').removeClass('cb-hidden');
	$(".choose-popup3").show();
}

function showFinalMessage() {

	$('.choose-balace-checker').addClass('cb-hidden');
	$('.choose-balance').addClass('cb-hidden');
	$(".choose-popup").hide();

	$('.choose-balace-checker1').addClass('cb-hidden');
	$('.choose-balance1').addClass('cb-hidden');
	$(".choose-popup1").hide();

	$('.choose-balace-checker2').addClass('cb-hidden');
	$('.choose-balance2').addClass('cb-hidden');
	$(".choose-popup2").hide();

	$('.choose-balace-checker3').addClass('cb-hidden');
	$('.choose-balance3').addClass('cb-hidden');
	$(".choose-popup3").hide();

	$('.choose-balace-checker4').removeClass('cb-hidden');
	$('.choose-balance4').removeClass('cb-hidden');
	$(".choose-popup4").show();
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function stoppedTyping(textInfo) {
	if (textInfo.value.length == 16) {
		$('.button-disable-enable15').attr('disabled', false);
	} else {
		$('.button-disable-enable15').attr('disabled', true);
	}
}
function stoppedTyping1(textInfo) {
	if (textInfo.value.length == 10) {
		$('.button-disable-enable16').attr('disabled', false);
	} else {
		$('.button-disable-enable16').attr('disabled', true);
	}
}
function stoppedTyping2(textInfo) {
	if (textInfo.value.length == 4) {
		$('.button-disable-enable17').attr('disabled', false);
	} else {
		$('.button-disable-enable17').attr('disabled', true);
	}
}
function checkBalance() {
	var textarea = document.getElementById('txtMsg1');
	var word = 'balance';
	var textValue = textarea.value; //-> don't use .innerHTML since there is no HTML in a textarea element
	if (textValue.indexOf(word) != -1) {
		if (userConnected == false) {
			$('.choose-balance').removeClass('cb-hidden');
			$(".choose-popup").show();
		}
	} else {
		alert('Sorry we are unable to proceed your request')
	}
	return;
}
//convert speech to text
function speechStop() {
	var r = document.getElementById('result');
	// if('webkitSpeechRecognition' in window){
	//speechReconizer =new webkitSpeechRecognition();
	console.log("MMIDMKDIKD", speechReconizer)
	// speechReconizer.continuous  = true;
	// speechReconizer.interimResults = true;
	// speechReconizer.lang = 'en-IN';
	$('#microphone-mute-show').show();
	$('#microphone-show').hide();
	speechReconizer.stop();
	//}
}

//convert speech to text
function speech() {
	var r = document.getElementById('result');

	if ('webkitSpeechRecognition' in window) {
		speechReconizer = new webkitSpeechRecognition();
		console.log("MMIDMKDIKD", speechReconizer)
		speechReconizer.continuous = true;
		speechReconizer.interimResults = true;
		speechReconizer.lang = 'en-IN';
		$('#microphone-mute-show').hide();
		$('#microphone-show').show();
		speechReconizer.start();
		var finaltranscripts = '';
		speechReconizer.onresult = function (event) {
			var interimTranscripts = '';
			for (var i = event.resultIndex; i < event.results.length; i++) {
				var transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finaltranscripts += transcript;
				} else {
					interimTranscripts += transcript;
				}
			}
			$('#txtMsg1').val(finaltranscripts + interimTranscripts);
			var tmpl = '<div class="customer">  <span>' + $('#txtMsg1').val() + '</span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
			//$("#messages").append(tmpl);

			if (userConnected == true) {
				console.log("Micjhidi", finaltranscripts + 'dksdskdskdskds ' + interimTranscripts)
				if (finaltranscripts != "") {
					$('#txtMsg').val(finaltranscripts);
					var tmpl = '<div class="customer">  <span>' + $('#txtMsg').val() + '</span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div><br />';
					$("#messages").append(tmpl);
					socket.emit('message', {
						sessionId: socket.id,
						text: $('#txtMsg').val(),
						otherUserId: agentId
					});
					$('#txtMsg').val('');
					$("#messages").animate({
						scrollTop: $('#messages').prop("scrollHeight")
					}, 1000);
					finaltranscripts = '';
					stopAutoPlay()
				}
			}

			var textarea = document.getElementById('txtMsg1');
			var word = 'balance';
			var textValue = textarea.value; //-> don't use .innerHTML since there is no HTML in a textarea element
			if (textValue.indexOf(word) != -1) {
				if (userConnected == false) {
					$('.choose-balance').removeClass('cb-hidden');
					$(".choose-popup").show();
				}
			}
			return;
			// r.innerHTML = finaltranscripts + interimTranscripts;
		};

		speechReconizer.onerror = function (event) {}
	} else {
		r.innerHTML = "no result";
	}

}
function closeSignPopup() {
	$('.signdiv-cls').addClass('cb-hidden');
	$(".sign-popup").hide();
	socket.emit('REJECT_REQUEST_SIGNATURE', {
		userId: agentId,
		sessionId: socket.id,
		signatureImg: ' '
	});
}
function closePhotoPopup() {
	$('.loader-cls').removeClass('cb-hidden');
	$.ajax({
		url: 'https://investor-onboarding.signzy.tech/api/merchants/execute',
		data: JSON.stringify({
			"merchantId": "5eb29e32962e1d6a7913e555",
			"inputData": {
				"service": "identity",
				"type": "aadhaar",
				"task": "autoRecognition",
				"data": {
					"images": [aadhaarFrontName, aadhaarBackName],
					"toVerifyData": {},
					"searchParam": {},
					"proofType": "address"
				}
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		headers: {
			'Authorization': 'YGZOM8MJBLUVDwU150wGcbTfpf2R9FxABQspUyrhGNcau0CRoUYJiWBf0uf2FE2p'
		},
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			$('.loader-cls').addClass('cb-hidden');
			console.log("machi", resp)
			$('.phot-div-clss').addClass('cb-hidden');
			$(".photodiv-cls").hide();
			$('.photodiv1-cls').removeClass('cb-hidden');
			$('kyc1-popup').show();
			socket.emit('AADHAAR_REQUEST', {
				sessionId: socket.id,
				otherUserId: agentId,
				details: resp,
				documentType: 'aadhaar',
				frontPage: aadhaarFrontName,
				backPage: aadhaarBackName
			});
		}
	});

	//socket.emit('REJECT_REQUEST_SIGNATURE', { userId: agentId, sessionId: socket.id, signatureImg: ' '});
}

function closePhotoPopup1() {
	$('.loader-cls').removeClass('cb-hidden');
	$.ajax({
		url: 'https://investor-onboarding.signzy.tech/api/merchants/execute',
		data: JSON.stringify({
			"merchantId": "5eb29e32962e1d6a7913e555",
			"inputData": {
				"service": "identity",
				"type": "individualPan",
				"task": "autoRecognition",
				"data": {
					"images": [panCardFront],
					"toVerifyData": {},
					"searchParam": {},
					"proofType": "identity"
				}
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		headers: {
			'Authorization': 'YGZOM8MJBLUVDwU150wGcbTfpf2R9FxABQspUyrhGNcau0CRoUYJiWBf0uf2FE2p'
		},
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			$('.loader-cls').addClass('cb-hidden');
			console.log("machi", resp)
			$('.phot-div-clss').addClass('cb-hidden');
			$('.photodiv1-cls').addClass('cb-hidden');
			$('kyc1-popup').hide();
			$('.photodiv2-cls').removeClass('cb-hidden');
			$('kyc2-popup').show();
			socket.emit('AADHAAR_REQUEST', {
				sessionId: socket.id,
				otherUserId: agentId,
				details: resp,
				documentType: 'pan',
				frontPage: panCardFront,
			});
		}
	});
	//socket.emit('REJECT_REQUEST_SIGNATURE', { userId: agentId, sessionId: socket.id, signatureImg: ' '});
}
function closePhotoPopup2() {
	if (selectedIdCard == 'drivingLicence') {
		$('.loader-cls').removeClass('cb-hidden');
		$.ajax({
			url: 'https://investor-onboarding.signzy.tech/api/merchants/execute',
			data: JSON.stringify({
				"merchantId": "5eb29e32962e1d6a7913e555",
				"inputData": {
					"service": "identity",
					"type": selectedIdCard,
					"task": "autoRecognition",
					"data": {
						"images": [drivingFront],
						"toVerifyData": {},
						"searchParam": {},
						"proofType": "identity"
					}
				}
			}),
			dataType: 'json',
			cache: false,
			contentType: "application/json",
			processData: false,
			headers: {
				'Authorization': 'YGZOM8MJBLUVDwU150wGcbTfpf2R9FxABQspUyrhGNcau0CRoUYJiWBf0uf2FE2p'
			},
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (resp) {
				$('.loader-cls').addClass('cb-hidden');
				console.log("machi", resp)
				$('.phot-div-clss').addClass('cb-hidden');
				$('.photodiv2-cls').addClass('cb-hidden');
				$('kyc2-popup').hide();

				$('.photodiv3-cls').removeClass('cb-hidden');
				$('kyc3-popup').show();
				socket.emit('AADHAAR_REQUEST', {
					sessionId: socket.id,
					otherUserId: agentId,
					details: resp,
					documentType: selectedIdCard,
					frontPage: drivingFront,
					backPage: drivingBack,
				});
			}
		});
	} else if (selectedIdCard == 'passport') {
		$('.loader-cls').removeClass('cb-hidden');
		$.ajax({
			url: 'https://investor-onboarding.signzy.tech/api/merchants/execute',
			data: JSON.stringify({
				"merchantId": "5eb29e32962e1d6a7913e555",
				"inputData": {
					"service": "identity",
					"type": selectedIdCard,
					"task": "autoRecognition",
					"data": {
						"images": [passportFront, passportBack],
						"toVerifyData": {},
						"searchParam": {},
						"proofType": "identity"
					}
				}
			}),
			dataType: 'json',
			cache: false,
			contentType: "application/json",
			processData: false,
			headers: {
				'Authorization': 'YGZOM8MJBLUVDwU150wGcbTfpf2R9FxABQspUyrhGNcau0CRoUYJiWBf0uf2FE2p'
			},
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			success: function (resp) {
				$('.loader-cls').addClass('cb-hidden');
				console.log("machi", resp)
				$('.phot-div-clss').addClass('cb-hidden');
				$('.photodiv2-cls').addClass('cb-hidden');
				$('kyc2-popup').hide();

				$('.photodiv3-cls').removeClass('cb-hidden');
				$('kyc3-popup').show();
				socket.emit('AADHAAR_REQUEST', {
					sessionId: socket.id,
					otherUserId: agentId,
					details: resp,
					documentType: selectedIdCard,
					frontPage: passportFront,
					backPage: passportBack,
				});
			}
		});

	}

	//socket.emit('REJECT_REQUEST_SIGNATURE', { userId: agentId, sessionId: socket.id, signatureImg: ' '});
}

function closePhotoPopup3() {
	$('.loader-cls').addClass('cb-hidden');
	$('.phot-div-clss').addClass('cb-hidden');
	$('.photodiv3-cls').addClass('cb-hidden');
	$('kyc3-popup').hide();
	addStatusMessage('eKyc documents uploaded successfully.');
	socket.emit('AADHAAR_REQUEST', {
		sessionId: socket.id,
		otherUserId: agentId,
		details: '',
		documentType: 'signature',
		frontPage: signature,
		backPage: signature,
	});
}

function wrapUpForm(datatsididdi) {
	var fileHost = SOCKET_HOST;
	var formData = new FormData();
	formData.append('files[]', datatsididdi, 'datas.pdf');
	$.ajax({
		url: fileHost + '/file/upload',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			// $('.loader-cls').addClass('cb-hidden');
			let data = resp.response.data;
			if (data.files && data.files.length > 0) {
				var file = data.files[0];
				var actualFilename = file.filename;
				console.log("actualFilename", actualFilename)
				var originalname = file.originalname;

				fileUpdateIntoDb(actualFilename)
				//     console.log("originalname",originalname)
				//         var minm = 10000;
				//         var maxm = 99999;
				//         var displayNymber = Math.floor(Math
				//         .random() * (maxm - minm + 1)) + minm;
				//  //   connectSocket(displayNymber, nameInfo, createdChatId, '', '', emailInfo, mobileInfo, intent, actualFilename);
			} else {}
		}

	});
}

function fileUpdateIntoDb(fileName) {
	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/updateChatUserInfo',
		data: JSON.stringify({
			"request": {
				_id: createdChatId,
				"chatTrascriptImg": fileName
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("machimariyam", resp)
			//let data = resp.response.data.result;
			// createdChatId = data.chatcreattionId;

		}
	});
}

function endChat() {
	var fileHost = SOCKET_HOST;
	$.ajax({
		url: fileHost + '/updateChatUserInfo',
		data: JSON.stringify({
			"request": {
				_id: createdChatId,
				chatTrascriptTxt: messageDataInfo,
				agentId: ciscoAgentID
			}
		}),
		dataType: 'json',
		cache: false,
		contentType: "application/json",
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (resp) {
			console.log("machimariyam", resp)
			//let data = resp.response.data.result;
			// createdChatId = data.chatcreattionId;

		}
	});
}

function feedBackForm() {
	var doc = new jsPDF();
	var img = new Image();

	var elementHTML = "<br><br><br><br><br><br><br><br>";
	img.crossOrigin = ""; // for demo as we are at different origin than image
	img.src = "images/axis_logo_latest.png";
	img.onload = function () {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0); // Or at whatever offset you like

		dataUrl = canvas.toDataURL('image/png');
		doc.addImage(img, 'png', 0, 0, 350, 20);
		//  img.src = strDataURI;
		console.log("Machjdjdjd", img)
		// var elementHTML = "";
		$(".customer, .agent, .trancustomer, .tranagent").each(function (index, item) {
			let formatedString = $(item).text().replace(/[0-9]/g, '');
			let finalString = $(item).text().replace('""', '')
				console.log("DJDJDJDJDJJDJDJDJD", finalString)
				console.log("CCJCJCJCJCJCJC", $(item).text())
				if ($(item).hasClass("tranagent")) {
					elementHTML += $(item).html() + '<br>';
					//  messageDataInfo.push(finalString)
				} else if ($(item).hasClass("trancustomer")) {
					// messageDataInfo.push(finalString)
					elementHTML += $(item).html() + '<br>';
				}
				console.log("DJJDJDJDJDJJD", item)

		});

		console.log("JDJDJDJDD", elementHTML);
		console.log("JSSJSJS", messageDataInfo)
		var specialElementHandlers = {
			'#messages2': function (element, renderer) {
				return true;
			}
		};
		doc.fromHTML(elementHTML, 15, 15, {
			'width': 500,
			'elementHandlers': specialElementHandlers
		});

		let blobData = doc.output('blob')
			wrapUpForm(blobData)
			//fileUpdateIntoDb()
			doc.save(nameInfo + '.pdf');

		addStatusMessage('File Downloaded');
		$('.buttonshow-hide').addClass('cb-hidden')
		$('.mt-2').addClass('cb-hidden')
	};
}

function veryBad() {
	$("#tooltip-1").tooltip();
}

function confirmPopup() {
	console.log('ddd');
	$('.close-chatbot').removeClass('cb-hidden');
	$("#closeChatWindow").show();
}
function confirmCallPopup() {
	console.log('ddd');
	$('.close-chatbot1').removeClass('cb-hidden');
	$("#closeChatWindow1").show();
}

/*var activities = document.getElementById("languageDropDown");
console.log("jdjdjdj", activities)

$("#languageDropDown").change(function () {
	var languageSelect = document.querySelector("select.goog-te-combo");
	console.log("Sdsdsdsd", languageSelect)
	languageSelect.value = $(this).val();
	languageSelect.dispatchEvent(new Event("change"));
	console.log($(this).val());
});*/

function googleTranslateElementInit() {
	new google.translate.TranslateElement({
		pageLanguage: 'es'
	},
		'google_translate_element');
	// console.log("Djjsjss",datas)
}

$.ajax({
	url: 'https://ipinfo.io/json',
	method: 'GET',
	type: 'GET', // For jQuery < 1.9
	success: function (resp) {
		let data = resp;

		countryName = data.country;
		cityName = data.city;
		region = data.region;
		console.log("vichy", countryName + ',' + cityName + ',' + region);
	}
});
$.get("https://ipinfo.io", function (response) {
	systemIp = response.ip;
	console.log("Vichy", systemIp)

	//alert(response.ip);
}, "json")
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log("Vichy", latitude + ',' + longitude)

}

$(document).ready(function () {
	$("select.idCardOptions").change(function () {
		selectedIdCard = $(this).children("option:selected").val();
		// alert("You have selected the country - " + selectedCountry);
	});

});

$(document).ready(function () {

	var SignaturePad = (function (document) {
		"use strict";

		var log = console.log.bind(console);

		var SignaturePad = function (canvas, options) {
			var self = this,
			opts = options || {};

			this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
			this.minWidth = opts.minWidth || 0.5;
			this.maxWidth = opts.maxWidth || 2.5;
			this.dotSize = opts.dotSize || function () {
				return (self.minWidth + self.maxWidth) / 2;
			};
			this.penColor = opts.penColor || "black";
			this.backgroundColor = opts.backgroundColor || "rgba(0,0,0,0)";
			this.throttle = opts.throttle || 0;
			this.throttleOptions = {
				leading: true,
				trailing: true
			};
			this.minPointDistance = opts.minPointDistance || 0;
			this.onEnd = opts.onEnd;
			this.onBegin = opts.onBegin;

			this._canvas = document.getElementById("signature-pad");
			this._ctx = document.getElementById("signature-pad").getContext("2d");
			this._ctx.lineCap = 'round';
			this.clear();

			// we need add these inline so they are available to unbind while still having
			//  access to 'self' we could use _.bind but it's not worth adding a dependency
			this._handleMouseDown = function (event) {
				if (event.which === 1) {
					self._mouseButtonDown = true;
					self._strokeBegin(event);
				}
			};

			var _handleMouseMove = function (event) {
				event.preventDefault();
				if (self._mouseButtonDown) {
					self._strokeUpdate(event);
					if (self.arePointsDisplayed) {
						var point = self._createPoint(event);
						self._drawMark(point.x, point.y, 5);
					}
				}
			};

			this._handleMouseMove = _.throttle(_handleMouseMove, self.throttle, self.throttleOptions);
			//this._handleMouseMove = _handleMouseMove;

			this._handleMouseUp = function (event) {
				if (event.which === 1 && self._mouseButtonDown) {
					self._mouseButtonDown = false;
					self._strokeEnd(event);
				}
			};

			this._handleTouchStart = function (event) {
				if (event.targetTouches.length == 1) {
					var touch = event.changedTouches[0];
					self._strokeBegin(touch);
				}
			};

			var _handleTouchMove = function (event) {
				// Prevent scrolling.
				event.preventDefault();

				var touch = event.targetTouches[0];
				self._strokeUpdate(touch);
				if (self.arePointsDisplayed) {
					var point = self._createPoint(touch);
					self._drawMark(point.x, point.y, 5);
				}
			};
			this._handleTouchMove = _.throttle(_handleTouchMove, self.throttle, self.throttleOptions);
			//this._handleTouchMove = _handleTouchMove;

			this._handleTouchEnd = function (event) {
				var wasCanvasTouched = event.target === self._canvas;
				if (wasCanvasTouched) {
					event.preventDefault();
					self._strokeEnd(event);
				}
			};

			this._handleMouseEvents();
			this._handleTouchEvents();
		};

		SignaturePad.prototype.clear = function () {
			var ctx = this._ctx,
			canvas = this._canvas;

			ctx.fillStyle = this.backgroundColor;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			this._reset();
		};

		SignaturePad.prototype.showPointsToggle = function () {
			this.arePointsDisplayed = !this.arePointsDisplayed;
		};

		SignaturePad.prototype.toDataURL = function (imageType, quality) {
			var canvas = this._canvas;
			return canvas.toDataURL.apply(canvas, arguments);
		};

		SignaturePad.prototype.fromDataURL = function (dataUrl) {
			var self = this,
			image = new Image(),
			ratio = window.devicePixelRatio || 1,
			width = this._canvas.width / ratio,
			height = this._canvas.height / ratio;

			this._reset();
			image.src = dataUrl;
			image.onload = function () {
				self._ctx.drawImage(image, 0, 0, width, height);
			};
			this._isEmpty = false;
		};

		SignaturePad.prototype._strokeUpdate = function (event) {
			var point = this._createPoint(event);
			if (this._isPointToBeUsed(point)) {
				this._addPoint(point);
			}
		};

		var pointsSkippedFromBeingAdded = 0;
		SignaturePad.prototype._isPointToBeUsed = function (point) {
			// Simplifying, De-noise
			if (!this.minPointDistance)
				return true;

			var points = this.points;
			if (points && points.length) {
				var lastPoint = points[points.length - 1];
				if (point.distanceTo(lastPoint) < this.minPointDistance) {
					// log(++pointsSkippedFromBeingAdded);
					return false;
				}
			}
			return true;
		};

		SignaturePad.prototype._strokeBegin = function (event) {
			this._reset();
			this._strokeUpdate(event);
			if (typeof this.onBegin === 'function') {
				this.onBegin(event);
			}
		};

		SignaturePad.prototype._strokeDraw = function (point) {
			var ctx = this._ctx,
			dotSize = typeof(this.dotSize) === 'function' ? this.dotSize() : this.dotSize;

			ctx.beginPath();
			this._drawPoint(point.x, point.y, dotSize);
			ctx.closePath();
			ctx.fill();
		};

		SignaturePad.prototype._strokeEnd = function (event) {
			var canDrawCurve = this.points.length > 2,
			point = this.points[0];

			if (!canDrawCurve && point) {
				this._strokeDraw(point);
			}
			if (typeof this.onEnd === 'function') {
				this.onEnd(event);
			}
		};

		SignaturePad.prototype._handleMouseEvents = function () {
			this._mouseButtonDown = false;

			this._canvas.addEventListener("mousedown", this._handleMouseDown);
			this._canvas.addEventListener("mousemove", this._handleMouseMove);
			document.addEventListener("mouseup", this._handleMouseUp);
		};

		SignaturePad.prototype._handleTouchEvents = function () {
			// Pass touch events to canvas element on mobile IE11 and Edge.
			this._canvas.style.msTouchAction = 'none';
			this._canvas.style.touchAction = 'none';

			this._canvas.addEventListener("touchstart", this._handleTouchStart);
			this._canvas.addEventListener("touchmove", this._handleTouchMove);
			this._canvas.addEventListener("touchend", this._handleTouchEnd);
		};

		SignaturePad.prototype.on = function () {
			this._handleMouseEvents();
			this._handleTouchEvents();
		};

		SignaturePad.prototype.off = function () {
			this._canvas.removeEventListener("mousedown", this._handleMouseDown);
			this._canvas.removeEventListener("mousemove", this._handleMouseMove);
			document.removeEventListener("mouseup", this._handleMouseUp);

			this._canvas.removeEventListener("touchstart", this._handleTouchStart);
			this._canvas.removeEventListener("touchmove", this._handleTouchMove);
			this._canvas.removeEventListener("touchend", this._handleTouchEnd);
		};

		SignaturePad.prototype.isEmpty = function () {
			return this._isEmpty;
		};

		SignaturePad.prototype._reset = function () {
			this.points = [];
			this._lastVelocity = 0;
			this._lastWidth = (this.minWidth + this.maxWidth) / 2;
			this._isEmpty = true;
			this._ctx.fillStyle = this.penColor;
		};

		SignaturePad.prototype._createPoint = function (event) {
			var rect = this._canvas.getBoundingClientRect();
			return new Point(
				event.clientX - rect.left,
				event.clientY - rect.top);
		};

		SignaturePad.prototype._addPoint = function (point) {
			var points = this.points,
			c2,
			c3,
			curve,
			tmp;

			points.push(point);

			if (points.length > 2) {
				// To reduce the initial lag make it work with 3 points
				// by copying the first point to the beginning.
				if (points.length === 3)
					points.unshift(points[0]);

				tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
				c2 = tmp.c2;
				tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
				c3 = tmp.c1;
				curve = new Bezier(points[1], c2, c3, points[2]);
				this._addCurve(curve);

				// Remove the first element from the list,
				// so that we always have no more than 4 points in points array.
				points.shift();
			}
		};

		SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {
			var dx1 = s1.x - s2.x,
			dy1 = s1.y - s2.y,
			dx2 = s2.x - s3.x,
			dy2 = s2.y - s3.y,

			m1 = {
				x: (s1.x + s2.x) / 2.0,
				y: (s1.y + s2.y) / 2.0
			},
			m2 = {
				x: (s2.x + s3.x) / 2.0,
				y: (s2.y + s3.y) / 2.0
			},

			l1 = Math.sqrt(1.0 * dx1 * dx1 + dy1 * dy1),
			l2 = Math.sqrt(1.0 * dx2 * dx2 + dy2 * dy2),

			dxm = (m1.x - m2.x),
			dym = (m1.y - m2.y),

			k = l2 / (l1 + l2),
			cm = {
				x: m2.x + dxm * k,
				y: m2.y + dym * k
			},

			tx = s2.x - cm.x,
			ty = s2.y - cm.y;

			return {
				c1: new Point(m1.x + tx, m1.y + ty),
				c2: new Point(m2.x + tx, m2.y + ty)
			};
		};

		SignaturePad.prototype._addCurve = function (curve) {
			var startPoint = curve.startPoint,
			endPoint = curve.endPoint,
			velocity,
			newWidth;

			velocity = endPoint.velocityFrom(startPoint);
			velocity = this.velocityFilterWeight * velocity +
				(1 - this.velocityFilterWeight) * this._lastVelocity;

			newWidth = this._strokeWidth(velocity);
			this._drawCurve(curve, this._lastWidth, newWidth);

			this._lastVelocity = velocity;
			this._lastWidth = newWidth;
		};

		SignaturePad.prototype._drawPoint = function (x, y, size) {
			var ctx = this._ctx;

			ctx.moveTo(x, y);
			ctx.arc(x, y, size, 0, 2 * Math.PI, false);
			this._isEmpty = false;
		};

		SignaturePad.prototype._drawMark = function (x, y, size) {
			var ctx = this._ctx;

			ctx.save();
			ctx.moveTo(x, y);
			ctx.arc(x, y, size, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
			ctx.fill();
			ctx.restore();
		};

		SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {
			var ctx = this._ctx,
			widthDelta = endWidth - startWidth,
			drawSteps,
			width,
			i,
			t,
			tt,
			ttt,
			u,
			uu,
			uuu,
			x,
			y;

			drawSteps = Math.floor(curve.length());
			ctx.beginPath();
			for (i = 0; i < drawSteps; i++) {
				// Calculate the Bezier (x, y) coordinate for this step.
				t = i / drawSteps;
				tt = t * t;
				ttt = tt * t;
				u = 1 - t;
				uu = u * u;
				uuu = uu * u;

				x = uuu * curve.startPoint.x;
				x += 3 * uu * t * curve.control1.x;
				x += 3 * u * tt * curve.control2.x;
				x += ttt * curve.endPoint.x;

				y = uuu * curve.startPoint.y;
				y += 3 * uu * t * curve.control1.y;
				y += 3 * u * tt * curve.control2.y;
				y += ttt * curve.endPoint.y;

				width = startWidth + ttt * widthDelta;
				this._drawPoint(x, y, width);
			}
			ctx.closePath();
			ctx.fill();
		};

		SignaturePad.prototype._strokeWidth = function (velocity) {
			return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
		};

		var Point = function (x, y, time) {
			this.x = x;
			this.y = y;
			this.time = time || new Date().getTime();
		};

		Point.prototype.velocityFrom = function (start) {
			return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
		};

		Point.prototype.distanceTo = function (start) {
			return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
		};

		var Bezier = function (startPoint, control1, control2, endPoint) {
			this.startPoint = startPoint;
			this.control1 = control1;
			this.control2 = control2;
			this.endPoint = endPoint;
		};

		// Returns approximated length.
		Bezier.prototype.length = function () {
			var steps = 10,
			length = 0,
			i,
			t,
			cx,
			cy,
			px,
			py,
			xdiff,
			ydiff;

			for (i = 0; i <= steps; i++) {
				t = i / steps;
				cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
				cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
				if (i > 0) {
					xdiff = cx - px;
					ydiff = cy - py;
					length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
				}
				px = cx;
				py = cy;
			}
			return length;
		};

		Bezier.prototype._point = function (t, start, c1, c2, end) {
			return start * (1.0 - t) * (1.0 - t) * (1.0 - t) +
			3.0 * c1 * (1.0 - t) * (1.0 - t) * t +
			3.0 * c2 * (1.0 - t) * t * t +
			end * t * t * t;
		};

		return SignaturePad;
	})(document);

	var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
			//  backgroundColor: 'rgba(255, 255, 255, 0)',
			backgroundColor: 'rgb(255, 255, 255)',
			penColor: 'rgb(0, 0, 0)',
			velocityFilterWeight: .7,
			minWidth: 0.5,
			maxWidth: 2.5,
			throttle: 16, // max x milli seconds on event update, OBS! this introduces lag for event update
			minPointDistance: 3,
		});
	var saveButton = document.getElementById('save'),
	clearButton = document.getElementById('clear'),
	showPointsToggle = document.getElementById('showPointsToggle');

	saveButton.addEventListener('click', function (event) {
		if (signaturePad.isEmpty()) {
			var signErr = $('.sign-error').html('Please provide a signature first.');
			return signErr;
		}
		$('.sign-error').html(' ');
		var data = signaturePad.toDataURL('image/png');
		var tmpl = '<div class="customer emty hide-cus" style="margin-right: 24px;">  <span> <img src=' + data + ' width="100" height="100"> </span><div class="customer-time">' + dateFormat(new Date(), 'h:MM') + '</div></div>';
		$("#messages").append(tmpl);
		$('.signdiv-cls').addClass('cb-hidden');
		$(".sign-popup").hide();
		console.log(agentId, socket.id, data)
		socket.emit('SUBMIT_REQUEST_SIGNATURE', {
			userId: agentId,
			sessionId: socket.id,
			signatureImg: data
		});
		signaturePad.clear();
		$("#messages").animate({
			scrollTop: $('#messages').prop("scrollHeight")
		}, 1000);
	});
	clearButton.addEventListener('click', function (event) {
		signaturePad.clear();
	});
	showPointsToggle.addEventListener('click', function (event) {
		signaturePad.showPointsToggle();
		showPointsToggle.classList.toggle('toggle');
	});
});
