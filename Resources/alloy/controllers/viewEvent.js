function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewEvent = Ti.UI.createWindow({
        backgroundColor: "white",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewEvent"
    });
    $.__views.viewEvent && $.addTopLevelView($.__views.viewEvent);
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
    $.__views.viewEvent.add($.__views.activity);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.viewEvent.add($.__views.container);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "50%",
        top: "25dp",
        color: "#717777",
        id: "title"
    });
    $.__views.container.add($.__views.title);
    $.__views.image = Ti.UI.createImageView({
        top: "25dp",
        width: "45%",
        height: "19%",
        left: "10dp",
        id: "image"
    });
    $.__views.container.add($.__views.image);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "50%",
        top: "70dp",
        color: "#717777",
        id: "author"
    });
    $.__views.container.add($.__views.author);
    $.__views.date = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "50%",
        top: "90dp",
        color: "#717777",
        id: "date"
    });
    $.__views.container.add($.__views.date);
    $.__views.views = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "50%",
        top: "110dp",
        color: "#717777",
        id: "views"
    });
    $.__views.container.add($.__views.views);
    $.__views.content = Ti.UI.createView({
        top: "25%",
        left: "0dp",
        height: "15%",
        id: "content"
    });
    $.__views.container.add($.__views.content);
    $.__views.titleDescription = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "10dp",
        top: "0dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Description:",
        id: "titleDescription"
    });
    $.__views.content.add($.__views.titleDescription);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        height: "90%",
        left: "10dp",
        top: "10dp",
        width: "90%",
        id: "description"
    });
    $.__views.content.add($.__views.description);
    $.__views.other = Ti.UI.createView({
        top: "40%",
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
    $.__views.table = Ti.UI.createTableView({
        top: "45%",
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
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
    var data = require("dataExport");
    var categoryId = 0;
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
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
        data.getListItems($.activity, $.table, 0, 0, categoryId, responses.creator, responses.id, "Events");
        $.activity.hide();
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
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;