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
	
proxy.setUserRtsp(Alloy.Globals.URL_RTSP.toString());
proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP.toString());
proxy.setUrlRtsp(Alloy.Globals.URL_RTSP.toString());	
proxy.setUsernameRtsp(username);
proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());


$.camera.add(proxy);
$.btnStart.addEventListener('click', function() {
		proxy.startStreaming();
	});
	
$.btnStop.addEventListener('click', function() {
	proxy.stopStreaming();			
		// cambiar tipo al video y abrir el evento

	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_STOP_STREAMING;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		if (response.stop_video)  
	    {  
	        alert('Video saved');
	    }  
		$.activity.hide();
        var win = Alloy.createController('viewEvent', id).getView();		
		win.fullscreen= false;	
		if(Ti.Platform.osname == 'android')
		{
			win.open({
				activityEnterAnimation: Ti.Android.R.anim.fade_in,
				activityExitAnimation: Ti.Android.R.anim.fade_out
			});	
		} else {
			var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
			win.open({transition:t});
		}	       	   
	    $.camera.close(); 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};	
	var params = {
		tc: Alloy.Globals.USER_MOBILE.toString(),
		video_id: video_id
	};
	client.send(params);  		 
	});
	

