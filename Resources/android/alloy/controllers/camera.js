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
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.camera.add($.__views.container);
    $.__views.btnStart = Ti.UI.createView({
        font: {
            fontSize: "12dp"
        },
        width: "50dp",
        color: "white",
        top: "10dp",
        height: "35dp",
        left: "88%",
        borderRadius: 4,
        id: "btnStart"
    });
    $.__views.container.add($.__views.btnStart);
    $.__views.textBottomStart = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "90%",
        bottom: "8%",
        width: "98%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        text: "Start",
        id: "textBottomStart"
    });
    $.__views.btnStart.add($.__views.textBottomStart);
    $.__views.btnStop = Ti.UI.createView({
        font: {
            fontSize: "12dp"
        },
        width: "50dp",
        color: "white",
        top: "50dp",
        height: "35dp",
        left: "88%",
        borderRadius: 4,
        id: "btnStop"
    });
    $.__views.container.add($.__views.btnStop);
    $.__views.textBottomStop = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "90%",
        bottom: "8%",
        width: "98%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        text: "Stop",
        id: "textBottomStop"
    });
    $.__views.btnStop.add($.__views.textBottomStop);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var event_id = args.event_id;
    var live_video = args.live_video;
    var title = args.title;
    var description = args.description;
    $.textBottomStop.backgroundColor = "#D6CAC3";
    $.textBottomStop.color = "#EDE2DD";
    var band = 0;
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.camera, "Camera", false, null, $.container, null, false);
    var liveStreaming = require("com.xenn.liveStreaming");
    var proxy = liveStreaming.createStreaming({
        message: "Creating an example Proxy",
        width: "85%",
        height: "92%",
        top: "10dp",
        left: "10dp"
    });
    proxy.setUserRtsp(Alloy.Globals.USER_RTSP.toString());
    proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP.toString());
    proxy.setUrlRtsp(Alloy.Globals.URL_RTSP.toString());
    proxy.setUsernameRtsp(Ti.App.Properties.getString("username").toString());
    proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());
    $.camera.add(proxy);
    var video_id = 0;
    $.btnStart.addEventListener("click", function(e) {
        if (0 == band) {
            var client = Ti.Network.createHTTPClient();
            var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_START_STREAMING;
            client.open("POST", url);
            client.ondatastream = function() {
                $.activity.show();
            };
            client.onload = function() {
                var json = this.responseText;
                var response = JSON.parse(json);
                if (response.video_id > 0) {
                    video_id = response.video_id;
                    proxy.startStreaming();
                    band = 1;
                    $.textBottomStart.backgroundColor = "#D6CAC3";
                    $.textBottomStart.color = "#EDE2DD";
                    $.textBottomStop.backgroundColor = "#745DA8";
                    $.textBottomStop.color = "white";
                } else {
                    -1 == response.video_id ? alert("The video has already been created") : 0 == response.video_id ? alert("The event does not exist") : alert("The start date is not in the allowed range");
                    $.camera.close();
                }
                $.activity.hide();
            };
            client.onerror = function(e) {
                alert("Transmission error: " + e.error);
            };
            var params = {
                tc: Alloy.Globals.USER_MOBILE.toString(),
                user_id: Ti.App.Properties.getString("user_id"),
                event_id: event_id,
                time_user: Ti.App.Properties.getString("timezone"),
                live: live_video,
                title: title,
                description: description
            };
            client.send(params);
        }
    });
    $.btnStop.addEventListener("click", function(e) {
        if (1 == band) {
            var client = Ti.Network.createHTTPClient();
            var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_STOP_STREAMING;
            client.open("POST", url);
            client.ondatastream = function() {
                $.activity.show();
            };
            client.onload = function() {
                var json = this.responseText;
                var response = JSON.parse(json);
                if (response.stop_video) {
                    alert("Video saved");
                    proxy.stopStreaming();
                }
                $.activity.hide();
                if (1 == live_video) {
                    var args = {
                        author: Ti.App.Properties.getString("user_id"),
                        authorname: Ti.App.Properties.getString("name"),
                        view: "Events"
                    };
                    var win = Alloy.createController("viewListEventsToLive", args).getView();
                } else var win = Alloy.createController("viewEvent", event_id).getView();
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
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;