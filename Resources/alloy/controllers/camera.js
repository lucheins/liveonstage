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
    args.event_id;
    args.video_id;
    var username = args.username;
    var liveStreaming = require("com.xenn.liveStreaming");
    var proxy = liveStreaming.createStreaming({
        message: "Creating an example Proxy",
        width: "85%",
        height: "92%",
        top: "10dp",
        left: "10dp"
    });
    proxy.setUserRtsp(Alloy.Globals.URL_RTSP);
    proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP);
    proxy.setUrlRtsp(Alloy.Globals.URL_RTSP);
    proxy.setUsernameRtsp(username);
    proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP);
    $.camera.add(proxy);
    $.btnStart.addEventListener("click", function() {
        proxy.startStreaming();
    });
    $.btnStop.addEventListener("click", function() {
        proxy.stopStreaming();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;