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
    function getUrlYoutube(video_id, vp) {
        vdldr = Ti.Network.createHTTPClient();
        vdldr.onload = function() {
            x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
            y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
            vp.url = y;
        };
        if ("android" != Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
        }
        vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
        if ("android" == Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
        }
        vdldr.send();
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
            fontSize: 20,
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activity"
    });
    $.__views.viewVideo.add($.__views.activity);
    $.__views.Navigation = Ti.UI.createView({
        height: "9%",
        top: "0%",
        backgroundColor: "#f2f2f2",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.viewVideo.add($.__views.Navigation);
    $.__views.actionIos = Ti.UI.createView({
        zIndex: 10,
        height: "100%",
        id: "actionIos"
    });
    $.__views.Navigation.add($.__views.actionIos);
    closeView ? $.__views.actionIos.addEventListener("click", closeView) : __defers["$.__views.actionIos!click!closeView"] = true;
    $.__views.backArrow = Ti.UI.createLabel({
        left: "0%",
        width: "5%",
        font: {
            fontSize: "20dp"
        },
        color: "gray",
        id: "backArrow"
    });
    $.__views.actionIos.add($.__views.backArrow);
    $.__views.icon = Ti.UI.createImageView({
        left: "5%",
        width: "12%",
        height: "90%",
        top: "5%",
        id: "icon",
        image: "/icon-small.png"
    });
    $.__views.actionIos.add($.__views.icon);
    $.__views.current = Ti.UI.createLabel({
        left: "19%",
        text: "Live Shows",
        id: "current"
    });
    $.__views.Navigation.add($.__views.current);
    $.__views.__alloyId30 = Ti.UI.createView({
        id: "__alloyId30"
    });
    $.__views.Navigation.add($.__views.__alloyId30);
    $.__views.container = Ti.UI.createView({
        height: "91%",
        top: "9%",
        id: "container"
    });
    $.__views.viewVideo.add($.__views.container);
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "2%",
        autoplay: true,
        backgroundColor: "black",
        height: "50%",
        width: "95%",
        id: "vp"
    });
    $.__views.container.add($.__views.vp);
    $.__views.data = Ti.UI.createView({
        top: "52%",
        height: "20%",
        id: "data"
    });
    $.__views.container.add($.__views.data);
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
        top: "74%",
        left: "0dp",
        backgroundColor: "#f2f2f2",
        height: "4%",
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
        text: "Other videos from this Artist:",
        id: "otherEvents"
    });
    $.__views.other.add($.__views.otherEvents);
    $.__views.table = Ti.UI.createTableView({
        top: "78%",
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    if ("android" == Ti.Platform.osname) {
        var actionBar;
        $.viewVideo.addEventListener("open", function() {
            if ($.viewVideo.activity) {
                actionBar = $.viewVideo.activity.actionBar;
                if (actionBar) {
                    actionBar.backgroundImage = "/bg.png";
                    actionBar.title = Alloy.Globals.NAME_PAGE + " - Live Show";
                    actionBar.displayHomeAsUp = true;
                    actionBar.onHomeIconItemSelected = function() {
                        $.vp.hide();
                        $.vp.release();
                        $.vp = null;
                        $.viewVideo.close();
                    };
                }
            } else Ti.API.error("Can't access action bar on a lightweight window.");
        });
    } else {
        var backArrow = Ti.UI.createLabel({
            color: "Gray",
            text: "◃"
        });
        $.backArrow.add(backArrow);
    }
    Ti.Gesture.addEventListener("orientationchange", function() {
        var orientation = Ti.Gesture.orientation;
        (3 === orientation || 4 === orientation) && ($.vp.fullscreen = true);
        (1 === orientation || 2 === orientation) && ($.vp.fullscreen = false);
    });
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
        } else url = getUrlYoutube(responses.video_id, $.vp);
        $.author.text = responses.name;
        $.title.text = responses.title;
        $.views.text = responses.views;
        data.getListItems($.activity, $.table, 0, 0, categoryId, responses.creator, responses.id, "Videos");
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
            win.fullscreen = false;
            if ("android" == Ti.Platform.osname) win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            }); else {
                var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
                win.open({
                    transition: t
                });
            }
        }
    });
    __defers["$.__views.actionIos!click!closeView"] && $.__views.actionIos.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;