var args = arguments[0] || {};
var id = args.event_id;
var video_id = args.video_id;
var username = args.username;

var liveStreaming = require('com.xenn.liveStreaming');
	var proxy = liveStreaming.createStreaming({
		message: "Creating an example Proxy",		
		width: '85%',
		height: '92%',
		top: '10dp',
		left: '10dp'
	});
	
proxy.setUserRtsp(Alloy.Globals.URL_RTSP);
proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP);
proxy.setUrlRtsp(Alloy.Globals.URL_RTSP);	
proxy.setUsernameRtsp(username);
proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP);


$.camera.add(proxy);
	$.btnStart.addEventListener('click', function() {
		proxy.startStreaming();
	});
	
	$.btnStop.addEventListener('click', function() {
		proxy.stopStreaming();			
		// cambiar tipo al video y abrir el evento
	});
	

