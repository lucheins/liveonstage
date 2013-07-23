function Controller() {
    function closeView() {
        $.vp.hide();
        $.vp.release();
        $.vp = null;
        $.viewVideo.close();
    }
    function getName(name) {
        var names = name.split("_");
        name = names[0] + "_" + Alloy.Globals.RESOLUCION_VIDEO;
        null != names[1] && (name = name + "_" + names[1]);
        return name;
    }
    function getPathVideo(type, path) {
        $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
        $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
        $.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
        var name = getName(path);
        url = "vod" == type ? Alloy.Globals.URL_VOD + name + Alloy.Globals.URL_VOD_END + Alloy.Globals.URL_VIDEO_END : Alloy.Globals.URL_LIVE + name + Alloy.Globals.URL_VIDEO_END;
        return url;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.viewVideo = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewVideo",
        navBarHidden: "true"
    });
    $.__views.viewVideo && $.addTopLevelView($.__views.viewVideo);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activity"
    });
    $.__views.viewVideo.add($.__views.activity);
    $.__views.btnClose = Ti.UI.createButton({
        top: "2dp",
        left: "80%",
        height: "20dp",
        width: "50dp",
        id: "btnClose",
        title: "Close"
    });
    $.__views.viewVideo.add($.__views.btnClose);
    closeView ? $.__views.btnClose.addEventListener("click", closeView) : __defers["$.__views.btnClose!click!closeView"] = true;
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "25dp",
        autoplay: true,
        backgroundColor: "black",
        height: "50%",
        width: "95%",
        id: "vp"
    });
    $.__views.viewVideo.add($.__views.vp);
    $.__views.data = Ti.UI.createView({
        top: "55%",
        height: "20%",
        id: "data"
    });
    $.__views.viewVideo.add($.__views.data);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "5dp",
        top: "5dp",
        color: "#717777",
        id: "title"
    });
    $.__views.data.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "5dp",
        top: "45dp",
        color: "#717777",
        id: "author"
    });
    $.__views.data.add($.__views.author);
    $.__views.views = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "5dp",
        top: "65dp",
        color: "#717777",
        id: "views"
    });
    $.__views.data.add($.__views.views);
    $.__views.other = Ti.UI.createView({
        top: "71%",
        left: "0dp",
        backgroundColor: "#f2f2f2",
        height: "22dp",
        id: "other"
    });
    $.__views.viewVideo.add($.__views.other);
    $.__views.otherEvents = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "10dp",
        top: "0dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Other videos from this Artist:",
        id: "otherEvents"
    });
    $.__views.other.add($.__views.otherEvents);
    $.__views.table = Ti.UI.createTableView({
        top: "75%",
        id: "table"
    });
    $.__views.viewVideo.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    id = 99;
    var data = require("dataExport");
    var categoryId = 0;
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var json = this.responseText;
        var responses = JSON.parse(json);
        var url = "";
        if ("vod" == responses.type || "live" == responses.type) {
            url = getPathVideo(responses.type, responses.path);
            $.vp.url = url;
            $.author.text = responses.name;
            $.title.text = responses.title;
            $.views.text = responses.views;
            data.getListItems($.activity, $.table, 0, 0, categoryId, responses.creator, responses.id, "Videos");
            $.viewVideo.open();
        } else {
            $.viewVideo.close();
            var webview = Titanium.UI.createWebView({
                url: responses.path
            });
            var window = Titanium.UI.createWindow();
            window.add(webview);
            window.open({
                modal: true
            });
        }
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
            $.viewVideo.close();
            var win = Alloy.createController("viewVideo", e.source.link).getView();
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    __defers["$.__views.btnClose!click!closeView"] && $.__views.btnClose.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;