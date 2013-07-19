function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowMore = Ti.UI.createTableViewRow({
        id: "rowMore",
        name: "rowMore"
    });
    $.__views.rowMore && $.addTopLevelView($.__views.rowMore);
    $.__views.title = Ti.UI.createLabel({
        text: "More",
        id: "title"
    });
    $.__views.rowMore.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;