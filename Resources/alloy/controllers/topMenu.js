function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.topNav = Ti.UI.createScrollView({
        height: "7%",
        top: "0%",
        width: "100%",
        left: "0%",
        id: "topNav",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.topNav && $.addTopLevelView($.__views.topNav);
    $.__views.NavContainer = Ti.UI.createView({
        width: 500,
        id: "NavContainer"
    });
    $.__views.topNav.add($.__views.NavContainer);
    $.__views.categories = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "0%",
        id: "categories"
    });
    $.__views.NavContainer.add($.__views.categories);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Categories",
        id: "__alloyId10"
    });
    $.__views.categories.add($.__views.__alloyId10);
    $.__views.videos = Ti.UI.createView({
        height: "100%",
        bottom: "0%",
        width: "20%",
        left: "20%",
        id: "videos"
    });
    $.__views.NavContainer.add($.__views.videos);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Live",
        id: "__alloyId11"
    });
    $.__views.videos.add($.__views.__alloyId11);
    $.__views.campaigns = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "40%",
        id: "campaigns"
    });
    $.__views.NavContainer.add($.__views.campaigns);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Campaigns",
        id: "__alloyId12"
    });
    $.__views.campaigns.add($.__views.__alloyId12);
    $.__views.upcoming = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "60%",
        id: "upcoming"
    });
    $.__views.NavContainer.add($.__views.upcoming);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Upcoming",
        id: "__alloyId13"
    });
    $.__views.upcoming.add($.__views.__alloyId13);
    $.__views.artists = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "80%",
        id: "artists"
    });
    $.__views.NavContainer.add($.__views.artists);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Artists",
        id: "__alloyId14"
    });
    $.__views.artists.add($.__views.__alloyId14);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.campaigns.addEventListener("click", function() {
        $.scrollableView.currentPage = 2;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;