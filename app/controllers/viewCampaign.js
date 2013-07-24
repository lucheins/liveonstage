var id = arguments[0] || {};
if(Ti.Platform.osname == 'android')
{
	var actionBar;
	$.viewCampaign.addEventListener("open", function() {	
   if (! $.viewCampaign.activity) {
	            Ti.API.error("Can't access action bar on a lightweight window.");
	        } else {
	            actionBar = $.viewCampaign.activity.actionBar;
	            if (actionBar) {
	                actionBar.backgroundImage = "/bg.png";
	                actionBar.title = Alloy.Globals.NAME_PAGE + " - View Campaign";	                
	                actionBar.onHomeIconItemSelected = function() {
	                   $.vp.hide();
					    $.vp.release();
					    $.vp = null;
						$.viewCampaign.close();
	                };
	            }
	        }
	    
	});
}

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CAMPAIGN;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var json = this.responseText;
	var responses = JSON.parse(json);
	var url ='';
	if(responses.campaign[0].type == 'vod' || responses.campaign[0].type == 'live')
	{
		url = getPathVideo(responses.campaign[0].type, responses.campaign[0].path);
		$.vp.url = url;
	} else {
	   url = getUrlYoutube(responses.campaign[0].video_id, $.vp);
	}
	$.author.text = responses.campaign[0].name;
	$.title.text = responses.campaign[0].title;
	var text = responses.campaign[0].long_description;
	if(text.length > Alloy.Globals.DESCRIPTION_SIZE)
	{
		text = text.substring(0,Alloy.Globals.DESCRIPTION_SIZE - 2) + '...';
	}
	
	$.description.text = text;
	$.categoryName.text = responses.campaign[0].category_name;
	$.accomplished.text = '$' + responses.campaign[0].received + 'Pledged';
	$.percentage.text = responses.campaign[0].percent + '% Funded';
	$.days.text = responses.campaign[0].days + 'Days to go';
	$.total.text = '$' + responses.campaign[0].goal_amount + ' Goal';
	var tabledata = [];
	for (var i=0; i < responses.givebacks.length; i++) {
		
		var row = Ti.UI.createTableViewRow({
				 height: '40dp',
				 title: responses.givebacks[i].amount + 'USD ' + responses.givebacks[i].description,
				 left: '15dp',
				 font: { fontSize:'14dp'}				 
		});		
		tabledata.push(row);		
	}
	if(tabledata.length == 0)
	{
		var row = Ti.UI.createTableViewRow({
				 height: '20dp'	,
				 title: 'No givebacks'			 
		});
		tabledata.push(row);	
		$.viewScroll.height = 	$.viewScroll.height + 10;
	}
	$.table.setData(tabledata);
	
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);



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
    vdldr.send();        
}