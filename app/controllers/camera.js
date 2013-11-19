var event_id = arguments[0] || {};
$.btnStop.enabled = false;
if (Ti.Platform.osname == 'android'){
var actionBar;
$.camera.addEventListener("open", function() {
    
        if (! $.camera.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.camera.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Live On Stage";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
					$.camera.close();
                };
            }
        }   
});
}
else {	
	$.container.top = '9%';
	$.container.height = '91%';	
var args = {
	ventana: $.camera,
	title: "Live On Stage"       			
	};
	      		
var win = Alloy.createController('actionbarIos',args).getView();
$.camera.add(win);
}


var liveStreaming = require('com.xenn.liveStreaming');
	var proxy = liveStreaming.createStreaming({
		message: "Creating an example Proxy",		
		width: '85%',
		height: '92%',
		top: '10dp',
		left: '10dp'
	});
	
proxy.setUserRtsp(Alloy.Globals.USER_RTSP.toString());
proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP.toString());
proxy.setUrlRtsp(Alloy.Globals.URL_RTSP.toString());	
proxy.setUsernameRtsp(Ti.App.Properties.getString('username'));
proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());

var video_id = 0;
$.camera.add(proxy);
$.btnStart.addEventListener('click', function() {
	
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_START_STREAMING;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		if(response.video_id > 0)
		{	
			video_id = response.video_id;
			proxy.startStreaming();
			$.btnStart.enabled = false;
			$.btnStop.enabled =  true;					

		} else {
			if(response.video_id == -1)
			{
				alert('The video has already been created');
			} else {
				if(response.video_id == 0)
				{
					alert('The event does not exist');
				} else {
					alert('The start date is not in the allowed range');
				}
			}
			$.camera.close();
		}		    
		$.activity.hide(); 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	
	var params = {
		tc: Alloy.Globals.USER_MOBILE.toString(),
		user_id: Ti.App.Properties.getString('user_id'),
		event_id: event_id,
		time_user: Ti.App.Properties.getString('timezone')
	};
	client.send(params);  
	
	});
	
$.btnStop.addEventListener('click', function() {
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
	        proxy.stopStreaming();	
	        $.btnStop.enabled =  false;	
	    }  
		$.activity.hide();
        var win = Alloy.createController('viewEvent', event_id).getView();		
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
	

