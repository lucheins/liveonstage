var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.NAME_PAGE = "Live On Stage";

Alloy.Globals.DOMAIN = "http://192.168.1.2/liveonstage/";

Alloy.Globals.URL_FEED = "index.php?option=com_mobile";

Alloy.Globals.URL_VIDEO = "index.php?option=com_mobile&task=video";

Alloy.Globals.URL_EVENT = "index.php?option=com_mobile&task=event";

Alloy.Globals.URL_UPCOMING = "index.php?option=com_mobile&task=events";

Alloy.Globals.LIMIT = 5;

Alloy.Globals.TOP_LIMIT = 50;

Alloy.Globals.IMAGE_EVENT_DEFAULT = "components/com_community/assets/event.png";

Alloy.Globals.USER = "mobile";

Alloy.Globals.PASS = "123456";

Alloy.Globals.USER_MOBILE = Ti.Utils.base64encode(Alloy.Globals.USER + "-" + Alloy.Globals.PASS);

Alloy.Globals.URL_VOD_ANDROID = "rtsp://liveonstage.com:1935/vod/_definst_/";

Alloy.Globals.URL_LIVE_ANDROID = "rtsp://liveonstage.com:1935/vod/_definst_/";

Alloy.Globals.URL_IOS = "http://liveonstage.com:1935/videowhisper/_definst_/";

Alloy.Globals.URL_IOS_END = "/playlist.m3u8";

Alloy.Globals.URL_ANDROID_END = ".mp4";

Alloy.Globals.RESOLUCION_VIDEO = "240p";

Alloy.createController("index");