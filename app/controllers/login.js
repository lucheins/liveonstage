var timezone;
$.pickTimezone.setSelectedRow(0, 10, false);	

if (Ti.Platform.osname == 'android'){
var actionBar;
$.login.addEventListener("open", function() {
    
        if (! $.login.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.login.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Login";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
				$.login.close();
                };
            }
        }   
});
}
else {	

// Function to test if device is iOS 7 or later
function isIOS7Plus()
{
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		// Can only test this support on a 3.2+ device
		if (major >= 7)
		{
			$.login.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
		//	Ti.UI.setBackgroundColor('#4D024A');
			return true;
		}
	}
	return false;
}

var iOS7 = isIOS7Plus();
var theTop = iOS7 ? 20 : 0;
$.login.top = theTop;
// END STATUS BAR FIX

	$.container.top = '9%';
	$.container.height = '91%';	
var args = {
	ventana: $.login,
	title: "Login"       			
	};
	      		
var win = Alloy.createController('actionbarIos',args).getView();
$.login.add(win);

}



function checkdata(value)  
	{  
	    var testresults = false;  
	    var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;  
	    if (filter.test(value))  
	    {  
	        testresults = true;  
	    }  
	     
	    return (testresults);  
	};

$.buttonLogin.addEventListener('click',function(e) {
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_LOGIN;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		if (response.id > 0)  
	    {  
	        alert("Welcome " + response.name + ".");  
	        $.username.blur();  
        	$.password.blur();  
        	Ti.App.Properties.setString('user_id', response.id);	  
        	Ti.App.Properties.setString('username', response.username);	
        	Ti.App.Properties.setString('name', response.name);	
        	Ti.App.Properties.setString('timezone', timezone);        	
        	openWindowsLoginSussess();	        
	    }  
	    else  
	    {  
	        alert('Failed credentials');  
		}; 
		$.activity.hide(); 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
		
	if ($.username.value != '' && $.password.value != '')  
    {  
    	if (!checkdata($.username.value))  
        {  
             alert("Please enter a valid username");  
        } 
        else  
        {  
	        if (!checkdata($.password.value))  
	        {  
	             alert("Please enter a valid password");  
	        } else
        	{
        		timezone = $.pickTimezone.getSelectedRow(0).value;
        		if(timezone != 'zone')
        		{      	
	        		var user1 = Ti.Utils.base64encode($.username.value + '-' + $.password.value) ;
	        		var params = {
					    tc: Alloy.Globals.USER_MOBILE.toString(),
					    u:  user1.toString()
					};
					client.send(params);    
        		} else {
        			alert("Please select Timezone");  
        		}
        		  
		    }
	    } 
    }  
    else  
    {  
        alert("Username/Password are required");  
    } 
		
});


function openWindowsLoginSussess()
{	
   var args = {       		
	    author: Ti.App.Properties.getString('user_id'),
	    authorname: Ti.App.Properties.getString('name'),
	    view: 'Events'
	};        	
    var win = Alloy.createController('viewListOfProfile', args).getView();
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
	$.login.close();     	  
}

