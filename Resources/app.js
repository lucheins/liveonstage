var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.NAME_PAGE = "Live On Stage";

Alloy.Globals.DOMAIN = "http://www.liveonstage.com/";

Alloy.Globals.URL_FEED = "index.php?option=com_mobile";

Alloy.Globals.URL_CATEGORIES = "index.php?option=com_mobile&task=categories";

Alloy.Globals.URL_UPCOMING = "index.php?option=com_mobile&task=events";

Alloy.Globals.LIMIT = 10;

Alloy.Globals.TOP_LIMIT = 50;

Alloy.Globals.IMAGE_EVENT_DEFAULT = "components/com_community/assets/event.png";

Alloy.Globals.USER = "mobile";

Alloy.Globals.PASS = "123456";

Alloy.Globals.USER_MOBILE = Ti.Utils.base64encode(Alloy.Globals.USER + "-" + Alloy.Globals.PASS);

Alloy.createController("index");