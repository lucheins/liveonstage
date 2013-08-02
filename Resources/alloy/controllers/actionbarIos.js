function Controller() {
    function closeView() {
        if (args.vp) {
            args.vp.hide();
            args.vp.release();
            args.vp = null;
        }
        args.ventana.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Navigation = Ti.UI.createView({
        height: "9%",
        top: "0%",
        backgroundColor: "#f2f2f2",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.Navigation && $.addTopLevelView($.__views.Navigation);
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
        id: "current"
    });
    $.__views.Navigation.add($.__views.current);
    $.__views.__alloyId13 = Ti.UI.createView({
        height: "2%",
        backgroundColor: "#c6c6c6",
        width: "100%",
        bottom: "0%",
        id: "__alloyId13"
    });
    $.__views.Navigation.add($.__views.__alloyId13);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var backArrow = Ti.UI.createLabel({
        color: "Gray",
        text: "◃"
    });
    $.current.text = args.title;
    $.backArrow.add(backArrow);
    __defers["$.__views.actionIos!click!closeView"] && $.__views.actionIos.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;