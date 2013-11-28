function Controller() {
    function isIOS7Plus() {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0], 10);
        if (major >= 7) {
            $.viewEvent.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
            return true;
        }
        return false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewEvent";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewEvent = Ti.UI.createWindow({
        backgroundColor: "white",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewEvent"
    });
    $.__views.viewEvent && $.addTopLevelView($.__views.viewEvent);
    $.__views.scroll = Ti.UI.createScrollView({
        id: "scroll",
        width: "100%",
        height: "100%",
        scrollType: "vertical",
        top: "0"
    });
    $.__views.viewEvent.add($.__views.scroll);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 100,
        id: "activity"
    });
    $.__views.scroll.add($.__views.activity);
    $.__views.container = Ti.UI.createView({
        id: "container",
        top: "0"
    });
    $.__views.scroll.add($.__views.container);
    $.__views.data = Ti.UI.createView({
        top: "3%",
        height: "44%",
        left: "1%",
        width: "98%",
        id: "data"
    });
    $.__views.container.add($.__views.data);
    $.__views.image = Ti.UI.createImageView({
        top: "0%",
        width: "50%",
        height: "100%",
        left: "0%",
        id: "image"
    });
    $.__views.data.add($.__views.image);
    $.__views.topdata = Ti.UI.createView({
        height: "48%",
        left: "52%",
        top: "0%",
        width: "48%",
        id: "topdata"
    });
    $.__views.data.add($.__views.topdata);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "15dp",
            fontWeight: "bold"
        },
        height: "100%",
        left: "0%",
        top: "0%",
        color: "#e4473e",
        id: "title"
    });
    $.__views.topdata.add($.__views.title);
    $.__views.bottomdata = Ti.UI.createView({
        height: "50%",
        left: "52%",
        top: "50%",
        id: "bottomdata"
    });
    $.__views.data.add($.__views.bottomdata);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "13dp"
        },
        height: "30%",
        top: "0%",
        left: "0%",
        color: "#717777",
        id: "author"
    });
    $.__views.bottomdata.add($.__views.author);
    $.__views.date = Ti.UI.createLabel({
        font: {
            fontSize: "13dp"
        },
        height: "28%",
        left: "0%",
        top: "32%",
        color: "#717777",
        id: "date"
    });
    $.__views.bottomdata.add($.__views.date);
    $.__views.views = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "32%",
        left: "0%",
        bottom: "5%",
        color: "white",
        width: "98%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        textAlign: "center",
        id: "views"
    });
    $.__views.bottomdata.add($.__views.views);
    $.__views.content = Ti.UI.createView({
        top: "48%",
        left: "0dp",
        height: "40%",
        borderColor: "#c3c3c3",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        borderWidth: 0,
        id: "content"
    });
    $.__views.container.add($.__views.content);
    $.__views.titleDescription = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "3%",
        width: "94%",
        top: "4%",
        text: "Description:",
        id: "titleDescription"
    });
    $.__views.content.add($.__views.titleDescription);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        height: "90%",
        left: "3%",
        top: "9%",
        width: "94%",
        color: "gray",
        id: "description"
    });
    $.__views.content.add($.__views.description);
    $.__views.other = Ti.UI.createView({
        top: "90%",
        left: "0dp",
        backgroundColor: "#f2f2f2",
        height: "22dp",
        id: "other"
    });
    $.__views.container.add($.__views.other);
    $.__views.otherEvents = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "10dp",
        top: "0dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Other events from this Artist:",
        id: "otherEvents"
    });
    $.__views.other.add($.__views.otherEvents);
    $.__views.viewTable = Ti.UI.createView({
        top: "0%",
        left: "0dp",
        id: "viewTable"
    });
    $.__views.scroll.add($.__views.viewTable);
    $.__views.table = Ti.UI.createTableView({
        top: "0",
        id: "table"
    });
    $.__views.viewTable.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    var user_id = 0;
    if ("android" == Ti.Platform.osname) {
        var actionBar;
        $.viewEvent.addEventListener("open", function() {
            if ($.viewEvent.activity) {
                actionBar = $.viewEvent.activity.actionBar;
                if (actionBar) {
                    actionBar.backgroundImage = "/bg.png";
                    actionBar.title = "Upcoming Events";
                    actionBar.onHomeIconItemSelected = function() {
                        $.viewEvent.close();
                    };
                }
            } else Ti.API.error("Can't access action bar on a lightweight window.");
        });
    } else {
        var iOS7 = isIOS7Plus();
        var theTop = iOS7 ? 20 : 0;
        $.viewEvent.top = theTop;
        $.scroll.top = "9%";
        $.scroll.height = "91%";
        var args = {
            ventana: $.viewEvent,
            vp: $.vp,
            title: "Upcoming Events"
        };
        var win = Alloy.createController("actionbarIos", args).getView();
        $.viewEvent.add(win);
    }
    var data = require("dataExport");
    var categoryId = 0;
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var height = Ti.Platform.displayCaps.platformHeight - 210;
        $.container.height = height;
        $.viewTable.top = height + 1;
        var json = this.responseText;
        var responses = JSON.parse(json);
        $.title.text = responses.title;
        var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
        if (null != responses.thumb) {
            imageLink = responses.thumb;
            "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
        }
        $.image.image = imageLink;
        $.author.text = responses.name;
        $.date.text = responses.message;
        $.views.text = responses.confirmed;
        $.description.text = responses.description;
        data.getListItems($.activity, $.table, 0, 0, categoryId, responses.creator, responses.id, "Events", true);
        $.activity.hide();
        user_id = responses.creator;
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        item_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    $.table.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            $.viewEvent.close();
            var win = Alloy.createController("viewEvent", e.source.link).getView();
            if ("android" == Ti.Platform.osname) {
                win.fullscreen = false;
                win.open({
                    activityEnterAnimation: Ti.Android.R.anim.fade_in,
                    activityExitAnimation: Ti.Android.R.anim.fade_out
                });
            } else {
                var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
                win.open({
                    transition: t
                });
            }
        } else {
            var index = $.table.getIndexByName("rowMore");
            if (index > 0) {
                pageHome += 1;
                var offset = pageHome * Alloy.Globals.LIMIT;
                data.getListItems($.activity, $.table, offset, pageHome, categoryId, user_id, id, "Events", true);
                $.viewTable.height = $.viewTable.height + Alloy.Globals.LIMIT * (18 * Ti.Platform.displayCaps.platformHeight / 100);
            }
        }
    });
    setTimeout(function() {
        $.viewTable.height = Alloy.Globals.LIMIT * (18 * Ti.Platform.displayCaps.platformHeight / 100);
        $.scroll.scrollTo(0, 0);
    }, 2e3);
    $.table.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;