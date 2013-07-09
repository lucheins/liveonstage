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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.viewVideo = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewVideo"
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
    $.__views.labelId = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "0dp",
        top: "0dp",
        color: "#717777",
        id: "labelId"
    });
    $.__views.viewVideo.add($.__views.labelId);
    $.__views.name = Ti.UI.createLabel({
        top: 20,
        id: "name"
    });
    $.__views.viewVideo.add($.__views.name);
    $.__views.btnClose = Ti.UI.createButton({
        top: 0,
        left: "80%",
        title: "close",
        id: "btnClose"
    });
    $.__views.viewVideo.add($.__views.btnClose);
    closeView ? $.__views.btnClose.addEventListener("click", closeView) : __defers["$.__views.btnClose!click!closeView"] = true;
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "45dp",
        autoplay: true,
        backgroundColor: "black",
        height: "60%",
        width: "90%",
        id: "vp"
    });
    $.__views.viewVideo.add($.__views.vp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    alert(id);
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var json = this.responseText;
        var responses = JSON.parse(json);
        $.labelId.text = responses.title;
        var url = "";
        var name = getName(responses.path);
        $.name.text = name;
        url = "live" == responses.type ? Alloy.Globals.URL_LIVE_ANDROID : Alloy.Globals.URL_VOD_ANDROID;
        url = url + name + Alloy.Globals.URL_ANDROID_END;
        $.vp.url = url;
        $.activity.hide();
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        video_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    $.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
    $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
    $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
    $.viewVideo.open();
    __defers["$.__views.btnClose!click!closeView"] && $.__views.btnClose.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;