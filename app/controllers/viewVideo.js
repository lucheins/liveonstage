var id = arguments[0] || {};
id= 100;
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
	if(responses.type == 'vod' || responses.type == 'live')
	{
		url = getPathVideo(responses.type, responses.path);
		$.vp.url = url;
	} else {
	   url = getUrlYoutube(responses.video_id, $.vp);
	}
	$.author.text = responses.name;
	$.title.text = responses.title;
	$.views.text = responses.views;	
	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Videos');
		
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);


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
	$.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
	$.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
	$.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
	var name = getName(path);		
	if(type == 'vod')
	{
		url = Alloy.Globals.URL_VOD + name + Alloy.Globals.URL_VOD_END + Alloy.Globals.URL_VIDEO_END;
	} else {
		url = Alloy.Globals.URL_LIVE + name + Alloy.Globals.URL_VIDEO_END;
	}
	return url;	
}

function getUrlYoutube(video_id, vp)
{
	vdldr = Ti.Network.createHTTPClient();
    vdldr.onload = function () {
	   x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
	   y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
	   vp.url = y;
    };
    if(Ti.Platform.osname != 'android')
    {
    	vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
        vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
    }
    vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
    if(Ti.Platform.osname == 'android')
    {
    	vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
    	vdldr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
    }
    vdldr.send()
        
}