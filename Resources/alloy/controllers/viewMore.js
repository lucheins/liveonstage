function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#f2f2f2",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.text = Ti.UI.createLabel({
        textAlign: "center",
        font: {
            fontSize: 14
        },
        height: "100%",
        id: "text"
    });
    $.__views.container.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var height = 360;
    $.container.height = "30dp";
    $.container.top = height * args.row + "dp";
    $.text.text = args.text;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;