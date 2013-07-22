var id = arguments[0] || {};

function closeView()
{
	$.viewEvent.close();
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

	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Events');
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
			$.viewEvent.close();
			var win = Alloy.createController('viewEvent', e.source.link).getView();			
			//$.feedWin.add(win);
			win.open({
		        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
		    });									
		}		
	});
	    

