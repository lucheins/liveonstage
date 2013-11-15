var id = arguments[0] || {};
var user_id = 0;
$.linkLive.visible = false;
$.linkClose.visible = false;


if(Ti.Platform.osname == 'android')
{
	var actionBar;
	$.viewEvent.addEventListener("open", function() {	
   if (! $.viewEvent.activity) {
	            Ti.API.error("Can't access action bar on a lightweight window.");
	        } else {
	            actionBar = $.viewEvent.activity.actionBar;
	            if (actionBar) {
	                actionBar.backgroundImage = "/bg.png";
	                actionBar.title = "Upcoming Events";	                
	                actionBar.onHomeIconItemSelected = function() {
						$.viewEvent.close();
	                };
	            }
	        }

	});
}

else {	
	$.scroll.top = '9%';
	$.scroll.height = '91%';
var args = {
	ventana: $.viewEvent,
	vp: $.vp,
	
	title: "Upcoming Events"       			
	};
	      		
var win = Alloy.createController('actionbarIos',args).getView();
$.viewEvent.add(win);
}

var data = require('dataExport');
var categoryId = 0;

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var height = Ti.Platform.displayCaps.platformHeight - 160;
	$.container.height = height ;
	$.viewTable.top = height + 1;	
	var json = this.responseText;
	var responses = JSON.parse(json);
	$.title.text = responses.title;	
	var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
	if(responses.thumb != null)
	{
		imageLink = responses.thumb;
		if(imageLink.substring(0,4) != 'http')
		{
			imageLink = Alloy.Globals.DOMAIN + imageLink;
		}
	}
	$.image.image = imageLink;
	$.author.text = responses.name;
	$.date.text = responses.message;
	$.views.text = responses.confirmed;
	$.description.text = responses.description;	
	
	if(Ti.App.Properties.getString('user_id'))
	{
		$.linkClose.visible = true;
		$.linkLogin.visible = false;
		if((responses.liveActive == 1)&&(Ti.App.Properties.getString('user_id') == responses.creator))
		{
			$.linkLive.visible = true;
		}			
	}
	

	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Events', true);
	//$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 15) / 100);
	$.activity.hide(); 
	user_id = responses.creator;
	
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
    time_user: getTimezone().toString()
};
client.send(params);


$.table.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			$.viewEvent.close();
			var win = Alloy.createController('viewEvent', e.source.link).getView();			
			if(Ti.Platform.osname == 'android')
			{
				win.fullscreen= false;
				win.open({
				        activityEnterAnimation: Ti.Android.R.anim.fade_in,
				        activityExitAnimation: Ti.Android.R.anim.fade_out
				    });	
			} else {
				var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
				win.open({transition:t});
			}							
		} else {
			var index = $.table.getIndexByName('rowMore');
			if(index > 0)
			{
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;	
				data.getListItems($.activity, $.table,offset,pageHome,categoryId,user_id,id,'Events',true);
				$.viewTable.height = $.viewTable.height + (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 18) / 100);
			}
		}		
	});
	    
setTimeout(function(){
	$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 18) / 100);
    $.scroll.scrollTo(0,0);
}, 2000);
$.table.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});


function getTimezone()
{
	var utcTime = new Date();
	var other =  utcTime.getTimezoneOffset()/60;
	var i = parseInt(other);
	var m = other - i;
	other = i + ':' + (m*60) + ',0';	
	return other;
	
}

$.linkLogin.addEventListener('click', function(e){
	
	var win = Alloy.createController('login',id).getView();	
	if(Ti.Platform.osname == 'android')
	{
		win.fullscreen= false;
		win.open({
		        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
		    });	
	} else {
		var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
		win.open({transition:t});
	}
	$.viewEvent.close();
});		

$.linkClose.addEventListener('click', function(e){
	Ti.App.Properties.setString('user_id', null);
	Ti.App.Properties.setString('username', null);
	$.linkLive.visible = false;
	$.linkClose.visible = false;
	$.linkLogin.visible = true;
});		

$.linkLive.addEventListener('click', function(e){
	
	/*var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_START_STREAMING;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		if(response.video_id > 0)
		{*/
			
			var args = {
				event_id: id,
				//video_id: response.video_id,  
				video_id: 15,
				username: Ti.App.Properties.getString('username')  			
			};
			var win = Alloy.createController('camera',args).getView();	
			if(Ti.Platform.osname == 'android')
			{
				win.fullscreen= true;
				win.open({
				        activityEnterAnimation: Ti.Android.R.anim.fade_in,
				        activityExitAnimation: Ti.Android.R.anim.fade_out
				    });	
			} else {
				var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
				win.open({transition:t});
			}
			$.viewEvent.close(); 
/*
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
			$.linkLive.visible = false;
		}		    
		$.activity.hide(); 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	
	var params = {
		tc: Alloy.Globals.USER_MOBILE.toString(),
		user_id: Ti.App.Properties.getString('user_id'),
		event_id: id,
		time_user: getTimezone().toString()
	};
	client.send(params);   */    
});		
