var id = arguments[0] || {};

function closeView()
{
	$.viewEvent.close();
}

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var json = this.responseText;
	var responses = JSON.parse(json);
	$.labelId.text = responses.title;	
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	event_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);
$.viewEvent.open();