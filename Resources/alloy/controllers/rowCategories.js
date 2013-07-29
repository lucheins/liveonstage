function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowCategories = Ti.UI.createTableViewRow({
        height: "55dp",
        touchEnabled: true,
        hasChild: false,
        id: "rowCategories"
    });
    $.__views.rowCategories && $.addTopLevelView($.__views.rowCategories);
    $.__views.title = Ti.UI.createLabel({
        left: "60dp",
        height: "55dp",
        width: "230dp",
        color: "black",
        font: {
            fontSize: "16dp"
        },
        id: "title"
    });
    $.__views.rowCategories.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.name || "";
    $.title.link = args.link;
    $.rowCategories.backgroundColor = args.isOdd ? "#f2f2f2" : "#ffffff";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;