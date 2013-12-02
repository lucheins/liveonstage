var event_id = arguments[0] || {};
$.textBottomStop.backgroundColor = '#D6CAC3';
$.textBottomStop.color = "#EDE2DD";

var band = 0;

var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.camera,"Camera",false,null,$.container,null,false);

if (Ti.Platform.osname == 'android'){
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
proxy.setUsernameRtsp(Ti.App.Properties.getString('username').toString());
proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());
$.camera.add(proxy);
} else {	
var streamingLiveIOS = require('com.xenn.finallyIOS');
}

var video_id = 0;

$.btnStart.addEventListener('click', function(e) {
	if(band == 0)
	{
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
				
				if (Ti.Platform.osname === 'android') {
					proxy.startStreaming();
				} else {
					foo = streamingLiveIOS.createStreamingView({
				  		  color:"grey",
						  width:'85%',
						  height:"93%",
						  top: '10dp',
						  left:'10dp',
						  streamingName: Ti.App.Properties.getString('username'),
						  urlServer: Alloy.Globals.URL_RTMP.toString()		  
					});		
					e.source.parent.parent.add(foo);
				}		
				band = 1;
				$.textBottomStart.backgroundColor = '#D6CAC3';
				$.textBottomStart.color = "#EDE2DD";	
				$.textBottomStop.backgroundColor = '#745DA8';
				$.textBottomStop.color = "white";				
	
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
	
	}
	
	});
	
$.btnStop.addEventListener('click', function(e) {
	// cambiar tipo al video y abrir el evento
	if(band == 1)
	{	var client = Ti.Network.createHTTPClient();
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
		        
		        if (Ti.Platform.osname === 'android') 
		        {        
		        	proxy.stopStreaming();	
		        } else {
		        	e.source.parent.remove(foo);
					foo.cancelar;
		        }
		       // $.btnStop.enabled =  false;	
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
	}	 
});
	

