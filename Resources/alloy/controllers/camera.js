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
    $.__views.container.add($.__views.btnStart);
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
    $.__views.container.add($.__views.btnStop);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var event_id = arguments[0] || {};
    $.btnStop.enabled = false;
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.camera, "Live On Stage", false, null, $.container, null, false);
    if ("android" == Ti.Platform.osname) {
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
    } else var streamingLiveIOS = require("com.xenn.finallyIOS");
    var video_id = 0;
    $.btnStart.addEventListener("click", function(e) {
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
                if ("android" === Ti.Platform.osname) proxy.startStreaming(); else {
                    foo = streamingLiveIOS.createStreamingView({
                        color: "grey",
                        width: "85%",
                        height: "93%",
                        top: "10dp",
                        left: "10dp",
                        streamingName: Ti.App.Properties.getString("username"),
                        urlServer: Alloy.Globals.URL_RTMP.toString()
                    });
                    e.source.parent.add(foo);
                }
                $.btnStart.enabled = false;
                $.btnStop.enabled = true;
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
            time_user: Ti.App.Properties.getString("timezone")
        };
        client.send(params);
    });
    $.btnStop.addEventListener("click", function(e) {
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
                if ("android" === Ti.Platform.osname) proxy.stopStreaming(); else {
                    e.source.parent.remove(foo);
                    foo.cancelar;
                }
                $.btnStop.enabled = false;
            }
            $.activity.hide();
            var win = Alloy.createController("viewEvent", event_id).getView();
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