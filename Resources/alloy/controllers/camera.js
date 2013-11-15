function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "camera";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.camera = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "camera"
    });
    $.__views.camera && $.addTopLevelView($.__views.camera);
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
    $.__views.camera.add($.__views.activity);
    $.__views.btnStart = Ti.UI.createButton({
        font: {
            fontSize: "12dp"
        },
        width: "50dp",
        backgroundColor: "#745DA8",
        color: "white",
        top: "10dp",
        height: "35dp",
        left: "88%",
        borderRadius: 4,
        id: "btnStart",
        title: "Start"
    });
    $.__views.camera.add($.__views.btnStart);
    $.__views.btnStop = Ti.UI.createButton({
        font: {
            fontSize: "12dp"
        },
        width: "50dp",
        backgroundColor: "#745DA8",
        color: "white",
        top: "50dp",
        height: "35dp",
        left: "88%",
        borderRadius: 4,
        id: "btnStop",
        title: "Stop"
    });
    $.__views.camera.add($.__views.btnStop);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var id = args.event_id;
    var video_id = args.video_id;
    var username = args.username;
    var liveStreaming = require("com.xenn.liveStreaming");
    var proxy = liveStreaming.createStreaming({
        message: "Creating an example Proxy",
        width: "85%",
        height: "92%",
        top: "10dp",
        left: "10dp"
    });
    proxy.setUserRtsp(Alloy.Globals.URL_RTSP.toString());
    proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP.toString());
    proxy.setUrlRtsp(Alloy.Globals.URL_RTSP.toString());
    proxy.setUsernameRtsp(username);
    proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());
    $.camera.add(proxy);
    $.btnStart.addEventListener("click", function() {
        proxy.startStreaming();
    });
    $.btnStop.addEventListener("click", function() {
        proxy.stopStreaming();
        var client = Ti.Network.createHTTPClient();
        var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_STOP_STREAMING;
        client.open("POST", url);
        client.ondatastream = function() {
            $.activity.show();
        };
        client.onload = function() {
            var json = this.responseText;
            var response = JSON.parse(json);
            response.stop_video && alert("Video saved");
            $.activity.hide();
            var win = Alloy.createController("viewEvent", id).getView();
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
            $.camera.close();
        };
        client.onerror = function(e) {
            alert("Transmission error: " + e.error);
        };
        var params = {
            tc: Alloy.Globals.USER_MOBILE.toString(),
            video_id: video_id
        };
        client.send(params);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;