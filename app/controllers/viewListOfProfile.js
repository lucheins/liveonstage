var args = arguments[0] || {};
var data = require('dataExport');

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
}
else {
	$.container.top = '9%',
	$.container.height = '91%'	
var args1 = {
	ventana: $.viewListOfProfile,
	vp: $.vp,
	
	title: args.authorname + "-" + args.view       	        			
	};
	      		
var win = Alloy.createController('actionbarIos',args1).getView();
$.viewListOfProfile.add(win);
}

data.getListOfProfile($.activity, $.table,0,0, args.author, args.view);

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