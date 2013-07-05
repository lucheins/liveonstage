var id = arguments[0] || {};
alert(id);
function closeView()
{
	$.vp.hide();
    $.vp.release();
    $.vp = null;
	$.viewVideo.close();
}

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

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var json = this.responseText;
	var responses = JSON.parse(json);
	$.labelId.text = responses.title;
	var url ='';
	var name = getName(responses.path);
	$.name.text =  name;
	if(Ti.Platform.osname == 'android')
	{
		if (responses.type == 'live')
		{
			url = Alloy.Globals.URL_LIVE_ANDROID;
		} else {
			url = Alloy.Globals.URL_VOD_ANDROID;
		}
		url = url + name + Alloy.Globals.URL_ANDROID_END;
	} else {
		url = Alloy.Globals.URL_IOS + name + Alloy.Globals.URL_IOS_END;
	}
	
	$.vp.url = url;
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	video_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);

$.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
$.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
$.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;

$.viewVideo.open();