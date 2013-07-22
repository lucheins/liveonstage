var id = arguments[0] || {};


function closeView()
{
	$.vp.hide();
    $.vp.release();
    $.vp = null;
	$.viewVideo.close();
}

var data = require('dataExport');
var categoryId = 0;
var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var json = this.responseText;
	var responses = JSON.parse(json);
	var url ='';

	url = getPathVideo(responses.type, responses.path);
	$.author.text = responses.name;
	$.title.text = responses.title;
	$.views.text = responses.views;

	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Videos');
	$.vp.url = url;
	
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);

$.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;

$.viewVideo.open();

$.table.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			$.viewVideo.close();
			var win = Alloy.createController('viewVideo', e.source.link).getView();			
			//$.feedWin.add(win);
			win.open({
		        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
		    });									
		}		
	});
	

function getName(name)
{
	var names = name.split('_');	
	name = names[0] + '_' + Alloy.Globals.RESOLUCION_VIDEO;
	if(names[1] != null)
	{
		name = name + '_' + names[1];
	}
	return name;
}

function getPathVideo(type,path)
{
	/*if(type == 'vod' || type == 'live')
	{
		$.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
		$.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
		if(Ti.Platform.osname == 'android')
		{
			if (responses.type == 'live')
			{
				url = Alloy.Globals.URL_LIVE_ANDROID;
			} else {
				url = Alloy.Globals.URL_VOD_ANDROID;
			}
			url = url + name + Alloy.Globals.URL_ANDROID_END;
		} else {*/
			var name = getName(path);
			alert(name);
			url = Alloy.Globals.URL_IOS + name + Alloy.Globals.URL_IOS_END;
		//}
		return url;
	/*}
	
	return path;
	*/
}
