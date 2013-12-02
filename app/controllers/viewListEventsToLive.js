var args = arguments[0] || {};
var data = require('dataExport');
var timezoneBand = 0;
var utm = '00:00,0';



var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.viewListEventsToLive,args.authorname + " - " + args.view,false,null,$.container,null,true);

$.messageTurn.hide();

	if((Ti.App.Properties.getString('user_id'))&&(args.author == Ti.App.Properties.getString('user_id')))
	{
		$.container.top = '11%';
		if (Titanium.Platform.name == 'iPhone OS')
		{
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0],10);
	
			// Can only test this support on a 3.2+ device
			if (major >= 7)
			{
				$.messageTurn.top = 35;
				$.container.top = '18%';
			}
		}
		$.messageTurn.show();
		timezoneBand = 1;
		utm = Ti.App.Properties.getString('timezone');
		//alert('mostart');
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