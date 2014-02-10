function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modalReport";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.modal = Ti.UI.createWindow({
        backgroundColor: "#50000000",
        title: Alloy.Globals.NAME_PAGE,
        id: "modal",
        modal: "true"
    });
    $.__views.modal && $.addTopLevelView($.__views.modal);
    $.__views.contentModal = Ti.UI.createView({
        backgroundColor: "transparent",
        height: "60%",
        width: "90%",
        id: "contentModal"
    });
    $.__views.modal.add($.__views.contentModal);
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        borderRadius: 5,
        borderColor: "#78797A",
        borderWidth: 1,
        id: "container"
    });
    $.__views.contentModal.add($.__views.container);
    $.__views.reportTitle = Ti.UI.createView({
        top: "0%",
        width: "100%",
        height: "18%",
        id: "reportTitle"
    });
    $.__views.container.add($.__views.reportTitle);
    $.__views.title = Ti.UI.createLabel({
        color: "#299ac6",
        font: {
            fontSize: "18dp"
        },
        left: "5%",
        text: "Report this",
        id: "title"
    });
    $.__views.reportTitle.add($.__views.title);
    $.__views.border = Ti.UI.createView({
        bottom: "0%",
        borderColor: "#299ac6",
        borderWidth: 1,
        id: "border"
    });
    $.__views.reportTitle.add($.__views.border);
    $.__views.pickReport = Ti.UI.createPicker({
        top: "25%",
        width: "90%",
        id: "pickReport"
    });
    $.__views.container.add($.__views.pickReport);
    var __alloyId66 = [];
    $.__views.__alloyId67 = Ti.UI.createPickerRow({
        value: "Select a predefined report",
        title: "Select a predefined report",
        id: "__alloyId67"
    });
    __alloyId66.push($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createPickerRow({
        value: "Spamming / Advertisement Profanity / Inappropriate content. Abusive.",
        title: "Spamming / Advertisement Profanity / Inappropriate content. Abusive.",
        id: "__alloyId68"
    });
    __alloyId66.push($.__views.__alloyId68);
    $.__views.pickReport.add(__alloyId66);
    $.__views.description = Ti.UI.createTextArea({
        top: "45%",
        width: "90%",
        height: "35%",
        color: "#c1c1c1",
        borderColor: "#c1c1c1",
        paddingLeft: 5,
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        font: {
            fontSize: "14dp"
        },
        id: "description",
        textAlign: "left",
        value: "Description"
    });
    $.__views.container.add($.__views.description);
    $.__views.reportFoot = Ti.UI.createView({
        bottom: "0%",
        width: "100%",
        height: "15%",
        borderColor: "#c1c1c1",
        borderWidth: 1,
        id: "reportFoot"
    });
    $.__views.container.add($.__views.reportFoot);
    $.__views.bottomModal = Ti.UI.createView({
        bottom: "5%",
        left: "20%",
        width: "29%",
        height: "100%",
        id: "bottomModal"
    });
    $.__views.reportFoot.add($.__views.bottomModal);
    $.__views.textBottom = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "75%",
        bottom: "8%",
        width: "80%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        text: "Send",
        id: "textBottom"
    });
    $.__views.bottomModal.add($.__views.textBottom);
    $.__views.bottomModalCancel = Ti.UI.createView({
        bottom: "5%",
        right: "20%",
        width: "29%",
        height: "100%",
        id: "bottomModalCancel"
    });
    $.__views.reportFoot.add($.__views.bottomModalCancel);
    $.__views.textBottom = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "75%",
        bottom: "8%",
        width: "80%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        text: "Cancel",
        id: "textBottom"
    });
    $.__views.bottomModalCancel.add($.__views.textBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.bottomModal.addEventListener("click", function() {
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        var band = 0;
        "" != $.description.value ? filter.test($.description.value) ? band += 1 : alert("Please enter a valid video description") : alert("Video description is required");
        "" != $.videoName.value ? filter.test($.videoName.value) ? band += 1 : alert("Please enter a valid video name") : alert("Video name is required");
        if (2 == band) {
            var args = {
                event_id: 0,
                live_video: 1,
                title: $.videoName.value,
                description: $.description.value
            };
            var win = Alloy.createController("camera", args).getView();
            win.fullscreen = true;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
            $.modal.close();
        }
    });
    $.description._hintText = $.description.value;
    $.description.addEventListener("focus", function(e) {
        if (e.source.value == e.source._hintText) {
            e.source.value = "";
            e.source.color = "#336699";
        }
    });
    $.description.addEventListener("blur", function(e) {
        if ("" == e.source.value) {
            e.source.color = "#c1c1c1";
            e.source.value = e.source._hintText;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;