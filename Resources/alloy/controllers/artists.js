function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.artists = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Artists",
        id: "artists"
    });
    $.__views.artists && $.addTopLevelView($.__views.artists);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "I am Artists",
        id: "__alloyId0"
    });
    $.__views.artists.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;