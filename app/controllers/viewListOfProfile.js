var args = arguments[0] || {};
var data = require('dataExport');
var timezoneBand = 0;
var utm = '00:00,0';

$.messageTurn.visible = false;

if(args.view == 'Events')
{	
	if((Ti.App.Properties.getString('user_id'))&&(args.author == Ti.App.Properties.getString('user_id')))
	{
		$.container.top = '11%';
		$.messageTurn.visible =  true;
		timezoneBand = 1;
		utm = Ti.App.Properties.getString('timezone');
	}
	}



if (Ti.Platform.osname == 'android'){
var actionBar;
$.viewListOfProfile.addEventListener("open", function() {
    
        if (! $.viewListOfProfile.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.viewListOfProfile.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = args.authorname + " - " + args.view;
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
					$.viewListOfProfile.close();
                };
            }
        }
    
});
}else {
	
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
			$.viewListOfProfile.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
		//	Ti.UI.setBackgroundColor('#4D024A');
			return true;
		}
	}
	return false;
}

var iOS7 = isIOS7Plus();
var theTop = iOS7 ? 20 : 0;
$.viewListOfProfile.top = theTop;
// END STATUS BAR FIX
	
	$.container.top = '9%';
	$.container.height = '91%';	
var args1 = {
	ventana: $.viewListOfProfile,
	vp: $.vp,
	
	title: args.authorname + "-" + args.view       	        			
	};
	      		
var win = Alloy.createController('actionbarIos',args1).getView();
$.viewListOfProfile.add(win);
}


data.getListOfProfile($.activity, $.table,0,0, args.author, args.view,timezoneBand,utm);

$.table.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var view = 'viewCampaign';
			if(args.view == 'Events')
			{
				view = 'viewEvent';
			}			
			if(args.view == 'Videos')
			{
				view = 'viewVideo';
			}
			var win = Alloy.createController(view, e.source.link).getView();
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
		}		
	});

$.table.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});