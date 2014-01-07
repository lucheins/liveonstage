function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modalViewVideoLive";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.modal = Ti.UI.createWindow({
        backgroundColor: "#35000000",
        title: Alloy.Globals.NAME_PAGE,
        id: "modal",
        modal: "true"
    });
    $.__views.modal && $.addTopLevelView($.__views.modal);
    $.__views.contentModal = Ti.UI.createView({
        backgroundColor: "transparent",
        height: "30%",
        width: "80%",
        id: "contentModal"
    });
    $.__views.modal.add($.__views.contentModal);
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        borderRadius: 3,
        id: "container"
    });
    $.__views.contentModal.add($.__views.container);
    $.__views.labelModal = Ti.UI.createLabel({
        top: "10%",
        left: "5%",
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        color: "black",
        text: "Set Video Name:",
        id: "labelModal"
    });
    $.__views.container.add($.__views.labelModal);
    $.__views.videoName = Ti.UI.createTextField({
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
        returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
        hintText: "Video Name",
        top: "30%",
        width: "80%",
        color: "#336699",
        border: 1,
        borderColor: "#336699",
        paddingLeft: 5,
        id: "videoName"
    });
    $.__views.container.add($.__views.videoName);
    $.__views.bottomModal = Ti.UI.createView({
        bottom: "10%",
        left: "5%",
        width: "40%",
        height: "20%",
        id: "bottomModal"
    });
    $.__views.container.add($.__views.bottomModal);
    $.__views.textBottom = Ti.UI.createLabel({
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
        text: "Go Live!",
        id: "textBottom"
    });
    $.__views.bottomModal.add($.__views.textBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.bottomModal.addEventListener("click", function() {
        if ("" != $.videoName.value) {
            var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
            if (filter.test($.videoName.value)) {
                var args = {
                    event_id: 0,
                    live_video: 1,
                    title: $.videoName.value
                };
                var win = Alloy.createController("camera", args).getView();
                win.fullscreen = true;
                win.open({
                    activityEnterAnimation: Ti.Android.R.anim.fade_in,
                    activityExitAnimation: Ti.Android.R.anim.fade_out
                });
                $.modal.close();
            } else alert("Please enter a valid video name");
        } else alert("Video name is required");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;