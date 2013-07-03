function Controller() {
    function closeView() {
        $.viewEvent.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.viewEvent = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewEvent"
    });
    $.__views.viewEvent && $.addTopLevelView($.__views.viewEvent);
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
    $.__views.viewEvent.add($.__views.activity);
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
    $.__views.viewEvent.add($.__views.labelId);
    $.__views.btnClose = Ti.UI.createButton({
        top: 0,
        left: "80%",
        title: "close",
        id: "btnClose"
    });
    $.__views.viewEvent.add($.__views.btnClose);
    closeView ? $.__views.btnClose.addEventListener("click", closeView) : __defers["$.__views.btnClose!click!closeView"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var json = this.responseText;
        var responses = JSON.parse(json);
        alert(json);
        $.labelId.text = responses.title;
        $.activity.hide();
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        event_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    $.viewEvent.open();
    __defers["$.__views.btnClose!click!closeView"] && $.__views.btnClose.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;