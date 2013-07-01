// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.NAME_PAGE = 'Live On Stage';
Alloy.Globals.DOMAIN = 'http://192.168.1.2/liveonstage/';
Alloy.Globals.URL_FEED = 'index.php?option=com_mobile';
Alloy.Globals.URL_CATEGORIES = 'index.php?option=com_mobile&task=categories';
Alloy.Globals.URL_UPCOMING = 'index.php?option=com_mobile&task=events';
Alloy.Globals.LIMIT = 5;
Alloy.Globals.TOP_LIMIT = 50;
Alloy.Globals.IMAGE_EVENT_DEFAULT='components/com_community/assets/event.png'
Alloy.Globals.USER = 'mobile';
Alloy.Globals.PASS = '123456';
Alloy.Globals.USER_MOBILE = Ti.Utils.base64encode(Alloy.Globals.USER + '-' + Alloy.Globals.PASS);